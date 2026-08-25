"""Regression fixtures for the post-publish public-site comparison."""

from __future__ import annotations

import functools
import json
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from tempfile import TemporaryDirectory

from check_deployed_site import DeploymentCheckError, check_deployed_site, deployment_paths, normalize_base_url


LOCALES = ["en", "zh", "es", "ja", "ko", "de", "zh-tw", "fr"]


class QuietHandler(SimpleHTTPRequestHandler):
    """Keep the fixture output focused on the assertion result."""

    def log_message(self, format: str, *args: object) -> None:  # noqa: A002
        return


def make_artifact(root: Path, marker: str) -> Path:
    artifact = root / f"artifact-{marker}"
    (artifact / "site").mkdir(parents=True)
    (artifact / "site" / "seo-config.json").write_text(json.dumps({"locales": LOCALES}), encoding="utf-8")
    paths = [
        "index.html", "visuals.html", "robots.txt", "sitemap.xml", "sitemap_index.xml",
        "site/index.html", "site/reader.html", "site/styles.css", "site/reader.css",
        "site/app.js", "site/reader.js", "site/locale-manifest.js",
        "site/learning-path-data.js", "site/goal-templates.js", "site/traditional-chinese.js", "site/search-index.js",
        "site/seo-config.json", "site/visuals.html", "site/visuals.css", "site/visuals.js",
        "site/visual.html", "site/visual-viewer.css", "site/visual-viewer.js",
        *(f"{locale}.html" for locale in LOCALES if locale != "en"),
    ]
    for relative_path in paths:
        if relative_path == "site/seo-config.json":
            continue
        path = artifact / relative_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(f"{relative_path}\n{marker}\n", encoding="utf-8")
    return artifact


def main() -> int:
    with TemporaryDirectory(prefix="deployed-site-check-") as temporary:
        root = Path(temporary)
        expected = make_artifact(root, "expected")
        served = make_artifact(root, "served")

        def start_server() -> tuple[ThreadingHTTPServer, threading.Thread, str]:
            handler = functools.partial(QuietHandler, directory=str(served))
            instance = ThreadingHTTPServer(("127.0.0.1", 0), handler)
            worker = threading.Thread(target=instance.serve_forever, daemon=True)
            worker.start()
            return instance, worker, f"http://127.0.0.1:{instance.server_port}/"

        server, thread, base = start_server()
        try:
            attempts, errors = check_deployed_site(expected, base, attempts=1, delay_seconds=0)
            if attempts != 1 or not errors or not any("bytes differ" in error for error in errors):
                raise AssertionError("stale bytes were not reported")

            # A bounded retry must be able to observe propagation completing.
            def propagate(_delay: float) -> None:
                for relative_path in deployment_paths(expected):
                    path = served / relative_path
                    path.write_bytes((expected / relative_path).read_bytes())

            attempts, errors = check_deployed_site(
                expected,
                base,
                attempts=2,
                delay_seconds=0,
                cache_buster="fixture",
                sleep=propagate,
            )
            if attempts != 2 or errors:
                raise AssertionError(f"bounded propagation retry failed: {errors}")

            attempts, errors = check_deployed_site(expected, base, attempts=1, delay_seconds=0, cache_buster="fixture")
            if attempts != 1 or errors:
                raise AssertionError(f"matching artifact was rejected: {errors}")

            # Stop the server before removing a file. Windows keeps a served
            # file handle open for a short time and otherwise makes this
            # negative fixture nondeterministic.
            server.shutdown()
            thread.join(timeout=3)
            server.server_close()
            (served / "fr.html").unlink()
            server, thread, base = start_server()
            attempts, errors = check_deployed_site(expected, base, attempts=1, delay_seconds=0)
            if not any("fr.html: HTTP 404" in error for error in errors):
                raise AssertionError("missing localized entry was not reported")
        finally:
            server.shutdown()
            thread.join(timeout=3)
            server.server_close()

        if normalize_base_url("https://example.test/docs") != "https://example.test/docs/":
            raise AssertionError("base URL normalization changed the path")
        try:
            normalize_base_url("/relative")
        except DeploymentCheckError:
            pass
        else:
            raise AssertionError("relative base URL was accepted")

    print("DEPLOYED_SITE_CHECK_TESTS_OK stale=detected matching=accepted missing-locale=detected bounded=1")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
