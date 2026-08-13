"""Negative and boundary fixtures for the release-evidence gate."""

from __future__ import annotations

import copy
import tempfile
from pathlib import Path

import build_release_evidence as evidence


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    contract = evidence.load_object(evidence.CONTRACT_PATH)

    duplicate = copy.deepcopy(contract)
    duplicate["dimensions"][0]["commands"].append(copy.deepcopy(duplicate["dimensions"][0]["commands"][0]))
    duplicate_errors = evidence.validate_contract(duplicate)
    require(any("duplicate command id" in error for error in duplicate_errors), "duplicate command id was accepted")
    require(any("duplicates an existing command" in error for error in duplicate_errors), "duplicate command argv was accepted")

    failed_contract = copy.deepcopy(contract)
    failed_contract["dimensions"] = [{
        "id": "failure-fixture",
        "label": "Failure fixture",
        "scope": "Intentional invalid argument proves a failing command is recorded.",
        "commands": [{
            "id": "intentional-failure",
            "argv": ["{python}", "scripts/build_quality_register.py", "--intentional-invalid-option"],
        }],
    }]
    with tempfile.TemporaryDirectory(prefix="prysai-release-evidence-fixture-") as temp_dir:
        dimensions = evidence.run_gates(failed_contract, Path(temp_dir))
        require(dimensions[0]["status"] == "failed", "failing command did not fail its dimension")
        require(dimensions[0]["commands"][0]["exit_code"] != 0, "failing command returned zero")
        require((Path(temp_dir) / dimensions[0]["commands"][0]["log"]).is_file(), "failure log was not preserved")
        require(evidence.derive_decision("candidate", dimensions, {"overdue": [], "invalid": []}) == "blocked", "failed gate did not block")

    passed_dimensions = [{"status": "passed"}]
    require(evidence.derive_decision("candidate", passed_dimensions, {"overdue": [], "invalid": []}) == "candidate", "static gates upgraded candidate")
    require(evidence.derive_decision("verified", passed_dimensions, {"overdue": [{"field": "next_review"}], "invalid": []}) == "blocked", "overdue source did not block verified")
    require(evidence.derive_decision("production-ready", passed_dimensions, {"overdue": [], "invalid": [{"field": "next_review"}]}) == "blocked", "invalid date did not block production-ready")

    print("RELEASE_EVIDENCE_TESTS_OK fixtures=6")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
