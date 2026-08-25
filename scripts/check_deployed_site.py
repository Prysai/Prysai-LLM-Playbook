"""Check that the public Docs host serves the artifact just published.

The Pages workflow builds one bounded artifact and publishes that artifact to
``docs.prysai.com``.  A successful SSH publish does not prove that a CDN or
the web server is already serving the same bytes.  This check compares a
small, route-critical set of files with bounded retries so a stale deployment
fails the workflow instead of being reported as current.

This is deployment-integrity evidence only.  It does not evaluate learning
outcomes, translation quality, uptime, or the behavior of an LLM.
"""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit, urlunsplit
from urllib.request import Request, urlopen


MAX_RESPONSE_BYTES = 20 * 1024 * 1024
DEFAULT_ATTEMPTS = 18
DEFAULT_DELAY_SECONDS = 10.0
CORE_PATHS = (
    "index.html",
    "visuals.html",
    "robots.txt",
    "sitemap.xml",
    "sitemap_index.xml",
    "site/index.html",
    "site/reader.html",
    "site/styles.css",
    "site/reader.css",
    "site/app.js",
    "site/reader.js",
    "site/locale-manifest.js",
    "site/learning-path-data.js",
    "site/goal-templates.js",
    "site/traditional-chinese.js",
    "site/search-index.js",
    "site/seo-config.json",
    "site/visuals.html",
    "site/visuals.css",
    "site/visuals.js",
    "site/visual.html",
    "site/visual-viewer.css",
    "site/visual-viewer.js",
)


class DeploymentCheckError(RuntimeError):
    """Raised when the artifact or public response cannot be compared."""


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()[:16]


def normalize_base_url(value: str) -> str:
    """Require an absolute HTTP(S) base URL and return it with one slash."""

    candidate = value.strip()
    parsed = urlsplit(candidate)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise DeploymentCheckError("--base-url must be an absolute http(s) URL")
    if parsed.query or parsed.fragment:
        raise DeploymentCheckError("--base-url must not contain a query or fragment")
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path.rstrip("/") + "/", "", ""))


def deployment_paths(artifact: Path) -> tuple[str, ...]:
    """Return deterministic route-critical paths, including every locale page."""

    config_path = artifact / "site" / "seo-config.json"
    try:
        config = json.loads(config_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise DeploymentCheckError(f"cannot read {config_path}: {exc}") from exc
    locales = config.get("locales") if isinstance(config, dict) else None
    if not isinstance(locales, list) or not all(isinstance(locale, str) and locale for locale in locales):
        raise DeploymentCheckError("artifact seo-config.json does not define locale pages")
    paths = [*CORE_PATHS, *(f"{locale}.html" for locale in locales if locale != "en")]
    return tuple(dict.fromkeys(paths))


def artifact_bytes(artifact: Path, relative_path: str) -> bytes:
    path = artifact / relative_path
    if not path.is_file():
        raise DeploymentCheckError(f"artifact is missing {relative_path}")
    return path.read_bytes()


def check_once(
    artifact: Path,
    base_url: str,
    paths: tuple[str, ...],
    *,
    cache_buster: str = "",
    timeout_seconds: float = 10.0,
) -> list[str]:
    """Compare one public response for each path and return safe diagnostics."""

    def compare(relative_path: str) -> str | None:
        expected = artifact_bytes(artifact, relative_path)
        url = base_url + relative_path
        if cache_buster:
            separator = "&" if "?" in url else "?"
            url += separator + urlencode({"prysai_deploy_check": cache_buster})
        request = Request(url, headers={"Cache-Control": "no-cache", "User-Agent": "Prysai-deployment-check/1"})
        try:
            with urlopen(request, timeout=timeout_seconds) as response:
                status = int(response.status)
                observed = response.read(MAX_RESPONSE_BYTES + 1)
        except HTTPError as exc:
            return f"{relative_path}: HTTP {exc.code}"
        except (OSError, URLError, TimeoutError) as exc:
            return f"{relative_path}: request failed ({type(exc).__name__})"
        if status < 200 or status >= 300:
            return f"{relative_path}: HTTP {status}"
        elif len(observed) > MAX_RESPONSE_BYTES:
            return f"{relative_path}: response exceeds {MAX_RESPONSE_BYTES} bytes"
        elif observed != expected:
            return (
                f"{relative_path}: bytes differ "
                f"expected_sha256={sha256_bytes(expected)} observed_sha256={sha256_bytes(observed)} "
                f"expected_bytes={len(expected)} observed_bytes={len(observed)}"
            )
        return None

    # Fetch route-critical files concurrently so an unreachable host consumes
    # one request timeout per attempt, not one timeout per file. The ordered
    # map keeps diagnostics deterministic while the worker cap stays small.
    with ThreadPoolExecutor(max_workers=min(8, len(paths))) as pool:
        return [error for error in pool.map(compare, paths) if error is not None]


def check_deployed_site(
    artifact: Path,
    base_url: str,
    *,
    attempts: int = DEFAULT_ATTEMPTS,
    delay_seconds: float = DEFAULT_DELAY_SECONDS,
    cache_buster: str = "",
    timeout_seconds: float = 10.0,
    sleep=time.sleep,
) -> tuple[int, list[str]]:
    """Run the bounded public comparison and return ``(attempts_used, errors)``."""

    artifact = artifact.resolve()
    if not artifact.is_dir():
        raise DeploymentCheckError(f"artifact directory does not exist: {artifact}")
    if not 1 <= attempts <= 60:
        raise DeploymentCheckError("attempts must be between 1 and 60")
    if not 0 <= delay_seconds <= 60:
        raise DeploymentCheckError("delay-seconds must be between 0 and 60")
    if timeout_seconds <= 0 or timeout_seconds > 60:
        raise DeploymentCheckError("timeout-seconds must be greater than 0 and at most 60")
    normalized = normalize_base_url(base_url)
    paths = deployment_paths(artifact)
    last_errors: list[str] = []
    for attempt in range(1, attempts + 1):
        last_errors = check_once(
            artifact,
            normalized,
            paths,
            cache_buster=cache_buster,
            timeout_seconds=timeout_seconds,
        )
        if not last_errors:
            return attempt, []
        if attempt < attempts:
            sleep(delay_seconds)
    return attempts, last_errors


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Compare a published Docs site with a Pages artifact.")
    parser.add_argument("--artifact", type=Path, required=True, help="bounded Pages artifact directory")
    parser.add_argument("--base-url", required=True, help="published site base URL, ending with /")
    parser.add_argument("--attempts", type=int, default=DEFAULT_ATTEMPTS)
    parser.add_argument("--delay-seconds", type=float, default=DEFAULT_DELAY_SECONDS)
    parser.add_argument("--timeout-seconds", type=float, default=10.0)
    parser.add_argument("--cache-buster", default="", help="optional build SHA used to bypass stale caches")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        attempts_used, errors = check_deployed_site(
            args.artifact,
            args.base_url,
            attempts=args.attempts,
            delay_seconds=args.delay_seconds,
            cache_buster=args.cache_buster,
            timeout_seconds=args.timeout_seconds,
        )
    except DeploymentCheckError as exc:
        print(f"DEPLOYED_SITE_CHECK_FAILED\n- {exc}")
        return 2
    if errors:
        print(f"DEPLOYED_SITE_CHECK_FAILED attempts={attempts_used} mismatches={len(errors)}")
        for error in errors:
            print(f"- {error}")
        return 1
    paths = deployment_paths(args.artifact)
    print(f"DEPLOYED_SITE_OK attempts={attempts_used} paths={len(paths)} base={normalize_base_url(args.base_url)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
