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

    # The production matrix records complete structural/content-contract
    # coverage separately from translation quality and learner evidence.
    result = audit.audit()
    issues = {(item["content_id"], item["locale"], item["kind"]) for item in result["issues"]}
    require(
        not any(item["content_id"] == "communication-clinic" and item["kind"] == "incomplete-coverage" for item in result["issues"]),
        "complete application pack was regressed to subset coverage",
    )
    require(
        not ("chapter-12-agent-loop-and-stop", "ZH", "incomplete-coverage") in issues,
        "complete Simplified Chinese Chapter 12 was regressed to partial coverage",
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
    require(result["summary"]["ZH"]["full"] == 56, "Simplified Chinese governed coverage changed unexpectedly")
    require(result["summary"]["FR"]["full"] == 56, "French governed coverage changed unexpectedly")
    print("LOCALE_CONTENT_MATRIX_AUDIT_TESTS_OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
