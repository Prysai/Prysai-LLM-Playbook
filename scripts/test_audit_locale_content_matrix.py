"""Fixtures for the governed locale content matrix audit."""

from __future__ import annotations

import audit_locale_content_matrix as audit


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    sample = """<!-- content_id: sample | locale: FR | language: fr -->
# Exemple
<span id="route-a"></span>
<!-- chapter-navigation:start -->
"""
    path_record = audit.file_record("README.md", "sample", "FR", check_identity=False)
    require(path_record["identity_ok"], "identity opt-out should be explicit for entry pages")
    require(audit.ANCHOR.search(sample), "authored anchor fixture no longer matches")

    # The production matrix contains seven route-complete subset records and
    # one partial chapter. The audit must keep those visible instead of
    # treating all existing files as full translations.
    result = audit.audit()
    issues = {(item["content_id"], item["locale"], item["kind"]) for item in result["issues"]}
    require(
        ("communication-clinic", "ZH", "incomplete-coverage") in issues,
        "starter-card subset disappeared from the audit",
    )
    require(
        ("chapter-12-agent-loop-and-stop", "ZH", "incomplete-coverage") in issues,
        "partial chapter disappeared from the audit",
    )
    require(
        not any(item["kind"] == "missing-reader-alias" for item in result["issues"]),
        "neutral research records were misclassified as missing localized aliases",
    )
    require(
        not any(item["kind"] == "duplicate-authored-anchor" for item in result["issues"]),
        "a localized Reader document contains a duplicate authored anchor",
    )
    require(result["summary"]["EN"]["full"] == 56, "English source coverage changed unexpectedly")
    require(result["summary"]["FR"]["full"] == 55, "French governed coverage changed unexpectedly")
    print("LOCALE_CONTENT_MATRIX_AUDIT_TESTS_OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
