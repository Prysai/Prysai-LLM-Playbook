"""Boundary fixtures for external URL policy and classification."""

from __future__ import annotations

import copy
import io
import urllib.request

import audit_external_urls as audit


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    policy = audit.load_object(audit.POLICY_PATH)
    require(audit.validate_policy(policy) == [], "valid policy was rejected")
    require(audit.classify(200, None, False, [[200, 399]]) == "reachable", "200 was not reachable")
    require(audit.classify(404, None, False, [[200, 399]]) == "not_found", "404 was misclassified")
    require(audit.classify(429, None, False, [[200, 399]]) == "rate_limited", "429 was misclassified")
    require(audit.classify(503, None, False, [[200, 399]]) == "server_error", "503 was misclassified")
    require(audit.classify(None, "timeout", False, [[200, 399]]) == "timeout", "timeout was misclassified")
    require(audit.classify(200, None, True, [[200, 399]]) == "redirected_outside_policy", "external redirect was accepted")
    handler = audit.PolicyRedirectHandler(policy)
    request = urllib.request.Request("https://learn.chatgpt.com/docs/models.md")
    try:
        handler.redirect_request(request, io.BytesIO(), 302, "Found", {}, "https://example.com/redirected")
    except audit.RedirectOutsidePolicy:
        pass
    else:
        raise AssertionError("redirect outside the host allowlist was followed")
    invalid = copy.deepcopy(policy)
    invalid["allowed_schemes"] = ["http"]
    require(any("allowed_schemes" in error for error in audit.validate_policy(invalid)), "insecure scheme was accepted")
    targets = audit.collect_targets(policy)
    require(len(targets) == 10, "fact URLs were not deduplicated")
    require(sum(len(target["claim_ids"]) for target in targets) == 24, "claim mappings were lost")
    print("EXTERNAL_URL_AUDIT_TESTS_OK fixtures=10 urls=10 claims=24")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
