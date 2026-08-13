"""Audit authoritative fact URLs and produce a scoped reachability report."""

from __future__ import annotations

import argparse
import json
import socket
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
POLICY_PATH = ROOT / "docs/governance/external-url-audit.yaml"


class RedirectOutsidePolicy(Exception):
    def __init__(self, url: str) -> None:
        super().__init__(url)
        self.url = url


class PolicyRedirectHandler(urllib.request.HTTPRedirectHandler):
    def __init__(self, policy: dict[str, Any]) -> None:
        super().__init__()
        self.allowed_schemes = set(policy["allowed_schemes"])
        self.allowed_hosts = set(policy["allowed_hosts"])

    def redirect_request(self, req: Any, fp: Any, code: int, msg: str, headers: Any, newurl: str) -> Any:
        parsed = urllib.parse.urlparse(newurl)
        if parsed.scheme not in self.allowed_schemes or parsed.hostname not in self.allowed_hosts:
            raise RedirectOutsidePolicy(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def validate_policy(policy: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if policy.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if policy.get("mode") not in {"report_only", "blocking"}:
        errors.append("mode must be report_only or blocking")
    for key in ("owner", "url_field", "claim_id_field", "reviewed_at", "next_review"):
        if not isinstance(policy.get(key), str) or not policy[key].strip():
            errors.append(f"{key} must be a non-empty string")
    source = policy.get("registry_source")
    if not isinstance(source, str) or not (ROOT / source).is_file():
        errors.append("registry_source must name an existing file")
    request = policy.get("request")
    if not isinstance(request, dict):
        errors.append("request must be an object")
        request = {}
    timeout = request.get("timeout_seconds")
    attempts = request.get("attempts")
    if not isinstance(timeout, int) or not 1 <= timeout <= 60:
        errors.append("request.timeout_seconds must be 1-60")
    if not isinstance(attempts, int) or not 1 <= attempts <= 3:
        errors.append("request.attempts must be 1-3")
    if not isinstance(request.get("user_agent"), str) or not request["user_agent"].strip():
        errors.append("request.user_agent must be non-empty")
    fallbacks = request.get("get_fallback_statuses")
    if not isinstance(fallbacks, list) or any(not isinstance(status, int) or not 100 <= status <= 599 for status in fallbacks):
        errors.append("request.get_fallback_statuses must contain HTTP status integers")
    schemes = policy.get("allowed_schemes")
    hosts = policy.get("allowed_hosts")
    if not isinstance(schemes, list) or not schemes or any(value not in {"https"} for value in schemes):
        errors.append("allowed_schemes must contain https")
    if not isinstance(hosts, list) or not hosts or any(not isinstance(value, str) or not value for value in hosts):
        errors.append("allowed_hosts must contain non-empty host names")
    ranges = policy.get("success_status_ranges")
    if not isinstance(ranges, list) or not ranges:
        errors.append("success_status_ranges must be non-empty")
    else:
        for index, value in enumerate(ranges, start=1):
            if not isinstance(value, list) or len(value) != 2 or any(not isinstance(status, int) for status in value) or value[0] > value[1]:
                errors.append(f"success_status_ranges[{index}] must be [minimum, maximum]")
    blind_spots = policy.get("known_blind_spots")
    if not isinstance(blind_spots, list) or not blind_spots or any(not isinstance(value, str) or not value.strip() for value in blind_spots):
        errors.append("known_blind_spots must contain non-empty strings")
    return errors


def collect_targets(policy: dict[str, Any]) -> list[dict[str, Any]]:
    registry = load_object(ROOT / policy["registry_source"])
    claims = registry.get("claims")
    if not isinstance(claims, list):
        raise ValueError("fact registry must contain a claims list")
    by_url: dict[str, list[str]] = defaultdict(list)
    for index, claim in enumerate(claims, start=1):
        if not isinstance(claim, dict):
            raise ValueError(f"claims[{index}] must be an object")
        url = claim.get(policy["url_field"])
        claim_id = claim.get(policy["claim_id_field"])
        if not isinstance(url, str) or not isinstance(claim_id, str):
            raise ValueError(f"claims[{index}] is missing URL or claim ID")
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme not in policy["allowed_schemes"]:
            raise ValueError(f"unsupported URL scheme for {claim_id}: {url}")
        if parsed.hostname not in policy["allowed_hosts"]:
            raise ValueError(f"unsupported URL host for {claim_id}: {url}")
        by_url[url].append(claim_id)
    return [{"url": url, "claim_ids": sorted(ids)} for url, ids in sorted(by_url.items())]


def in_success_range(status: int, ranges: list[list[int]]) -> bool:
    return any(minimum <= status <= maximum for minimum, maximum in ranges)


def classify(status: int | None, error_kind: str | None, redirected_outside_policy: bool, ranges: list[list[int]]) -> str:
    if redirected_outside_policy:
        return "redirected_outside_policy"
    if error_kind:
        return error_kind
    if status is None:
        return "network_error"
    if in_success_range(status, ranges):
        return "reachable"
    if status in {404, 410}:
        return "not_found"
    if status in {401, 403}:
        return "restricted"
    if status == 429:
        return "rate_limited"
    if 500 <= status <= 599:
        return "server_error"
    return "unexpected_status"


def request_once(url: str, method: str, policy: dict[str, Any]) -> dict[str, Any]:
    headers = {"User-Agent": policy["request"]["user_agent"], "Accept": "text/html,application/xhtml+xml,*/*;q=0.1"}
    if method == "GET":
        headers["Range"] = "bytes=0-1023"
    request = urllib.request.Request(url, headers=headers, method=method)
    opener = urllib.request.build_opener(PolicyRedirectHandler(policy))
    started = time.monotonic()
    try:
        with opener.open(request, timeout=policy["request"]["timeout_seconds"]) as response:
            status = response.status
            final_url = response.geturl()
            if method == "GET":
                response.read(1024)
            return {"status": status, "final_url": final_url, "error_kind": None, "error": "", "elapsed_ms": round((time.monotonic() - started) * 1000)}
    except urllib.error.HTTPError as exc:
        return {"status": exc.code, "final_url": exc.geturl(), "error_kind": None, "error": str(exc.reason), "elapsed_ms": round((time.monotonic() - started) * 1000)}
    except RedirectOutsidePolicy as exc:
        return {"status": None, "final_url": exc.url, "error_kind": "redirected_outside_policy", "error": "redirect target is outside the allowlist", "elapsed_ms": round((time.monotonic() - started) * 1000)}
    except urllib.error.URLError as exc:
        reason = exc.reason
        kind = "timeout" if isinstance(reason, (TimeoutError, socket.timeout)) else "network_error"
        return {"status": None, "final_url": url, "error_kind": kind, "error": str(reason), "elapsed_ms": round((time.monotonic() - started) * 1000)}
    except (TimeoutError, socket.timeout) as exc:
        return {"status": None, "final_url": url, "error_kind": "timeout", "error": str(exc), "elapsed_ms": round((time.monotonic() - started) * 1000)}


def audit_target(target: dict[str, Any], policy: dict[str, Any]) -> dict[str, Any]:
    attempts: list[dict[str, Any]] = []
    methods = ["HEAD"] if policy["request"].get("head_first") is True else ["GET"]
    for attempt_number in range(1, policy["request"]["attempts"] + 1):
        result = request_once(target["url"], methods[-1], policy)
        result.update({"attempt": attempt_number, "method": methods[-1]})
        attempts.append(result)
        if result["status"] in policy["request"]["get_fallback_statuses"] and methods[-1] == "HEAD":
            methods.append("GET")
            result = request_once(target["url"], "GET", policy)
            result.update({"attempt": attempt_number, "method": "GET"})
            attempts.append(result)
        final_host = urllib.parse.urlparse(result["final_url"]).hostname
        outside = final_host not in policy["allowed_hosts"]
        category = classify(result["status"], result["error_kind"], outside, policy["success_status_ranges"])
        if category == "reachable":
            break
    final = attempts[-1]
    final_host = urllib.parse.urlparse(final["final_url"]).hostname
    category = classify(final["status"], final["error_kind"], final_host not in policy["allowed_hosts"], policy["success_status_ranges"])
    return {
        "url": target["url"],
        "claim_ids": target["claim_ids"],
        "category": category,
        "status": final["status"],
        "final_url": final["final_url"],
        "redirected": final["final_url"] != target["url"],
        "observed_success_at": None,
        "attempts": attempts,
    }


def render_markdown(report: dict[str, Any]) -> str:
    lines = [
        "# External authoritative URL audit",
        "",
        f"- Observed at: `{report['observed_at']}`",
        f"- Mode: `{report['mode']}`",
        f"- Unique URLs: `{report['summary']['total']}`",
        f"- Reachable: `{report['summary'].get('reachable', 0)}`",
        f"- Findings: `{report['summary']['findings']}`",
        "",
        "Reachability is transport evidence only. It does not prove that the page still supports the recorded claim.",
        "",
        "| URL | Claims | Result | HTTP | Final URL |",
        "|---|---|---|---:|---|",
    ]
    for item in report["results"]:
        claims = ", ".join(f"`{claim_id}`" for claim_id in item["claim_ids"])
        status = item["status"] if item["status"] is not None else "—"
        lines.append(f"| {item['url']} | {claims} | `{item['category']}` | {status} | {item['final_url']} |")
    lines.extend(["", "## Known blind spots", ""])
    lines.extend(f"- {item}" for item in report["known_blind_spots"])
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--output-dir", default=".work/external-url-audit")
    parser.add_argument("--observed-at", default=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))
    parser.add_argument("--strict", action="store_true")
    args = parser.parse_args()
    try:
        policy = load_object(POLICY_PATH)
        errors = validate_policy(policy)
        if errors:
            print("EXTERNAL_URL_AUDIT_FAILED")
            for error in errors:
                print(f"- {error}")
            return 1
        targets = collect_targets(policy)
        if args.check:
            print(f"EXTERNAL_URL_AUDIT_CONTRACT_OK mode={policy['mode']} urls={len(targets)}")
            return 0
        observed = datetime.fromisoformat(args.observed_at.replace("Z", "+00:00")).astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        results = [audit_target(target, policy) for target in targets]
        for result in results:
            if result["category"] == "reachable":
                result["observed_success_at"] = observed
        counts: dict[str, int] = defaultdict(int)
        for result in results:
            counts[result["category"]] += 1
        report = {
            "schema_version": "1",
            "observed_at": observed,
            "mode": policy["mode"],
            "registry_source": policy["registry_source"],
            "summary": {"total": len(results), **dict(sorted(counts.items())), "findings": sum(value for key, value in counts.items() if key != "reachable")},
            "results": results,
            "known_blind_spots": policy["known_blind_spots"],
        }
        output_dir = Path(args.output_dir).resolve()
        output_dir.mkdir(parents=True, exist_ok=True)
        (output_dir / "external-url-audit.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        (output_dir / "external-url-audit.md").write_text(render_markdown(report), encoding="utf-8")
        findings = report["summary"]["findings"]
        print(f"EXTERNAL_URL_AUDIT_OK mode={policy['mode']} urls={len(results)} findings={findings}")
        print(f"output={output_dir}")
        if findings and (args.strict or policy["mode"] == "blocking"):
            return 1
        return 0
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("EXTERNAL_URL_AUDIT_FAILED")
        print(f"- {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
