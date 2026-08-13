"""Negative fixtures for the copy-now starter contract."""

from __future__ import annotations

import copy

import validate_starter_task_contract as starter


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    contract = starter.load_contract()
    require(not starter.validate_contract(contract), "checked-in starter contract is invalid")

    no_approval = copy.deepcopy(contract)
    no_approval["prompt"] = no_approval["prompt"].replace("wait for my approval", "continue immediately")
    approval_errors = starter.validate_contract(no_approval, check_surfaces=False)
    require(any("approval" in error for error in approval_errors), "prompt without approval gate was accepted")

    no_side_effect = copy.deepcopy(contract)
    no_side_effect["prompt"] = no_side_effect["prompt"].replace("external side effect", "change")
    side_effect_errors = starter.validate_contract(no_side_effect, check_surfaces=False)
    require(any("external side effect" in error for error in side_effect_errors), "prompt without external-effect boundary was accepted")

    false_evidence = copy.deepcopy(contract)
    false_evidence["evidence_boundary"] = "Sending the prompt proves the workflow succeeded."
    evidence_errors = starter.validate_contract(false_evidence, check_surfaces=False)
    require(any("copy/send" in error for error in evidence_errors), "copying prompt was accepted as action evidence")

    missing_progression = copy.deepcopy(contract)
    missing_progression["progression"]["evidence_next"] = "book/chapters/missing.md"
    progression_errors = starter.validate_contract(missing_progression, check_surfaces=False)
    require(any("evidence_next" in error for error in progression_errors), "missing advanced route was accepted")

    promoted = copy.deepcopy(contract)
    promoted["status"] = "verified"
    promoted_errors = starter.validate_contract(promoted, check_surfaces=False)
    require(any("candidate" in error for error in promoted_errors), "unrun prompt was promoted")

    print("STARTER_TASK_CONTRACT_TESTS_OK fixtures=5")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
