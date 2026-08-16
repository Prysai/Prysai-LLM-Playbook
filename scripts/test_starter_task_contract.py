"""Negative fixtures for the no-Git First Win contract."""

from __future__ import annotations

import copy

import validate_starter_task_contract as starter


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    contract = starter.load_contract()
    require(not starter.validate_contract(contract), "checked-in starter contract is invalid")

    missing_input = copy.deepcopy(contract)
    missing_input["prompt"] = missing_input["prompt"].replace(missing_input["input_text"], "[paste text here]")
    require(any("embed" in item for item in starter.validate_contract(missing_input, check_surfaces=False)), "unfilled input was accepted")

    git_required = copy.deepcopy(contract)
    git_required["prompt"] += "\nRun git status in the terminal."
    require(any("infrastructure" in item for item in starter.validate_contract(git_required, check_surfaces=False)), "Git prerequisite was accepted")

    weak_checks = copy.deepcopy(contract)
    weak_checks["human_checks"] = weak_checks["human_checks"][:2]
    require(any("exactly three" in item for item in starter.validate_contract(weak_checks, check_surfaces=False)), "two-check exercise was accepted")

    missing_teaching_point = copy.deepcopy(contract)
    missing_teaching_point["teaching_point"] = "Prompts are useful."
    require(any("LLM limit" in item for item in starter.validate_contract(missing_teaching_point, check_surfaces=False)), "missing LLM teaching point was accepted")

    false_evidence = copy.deepcopy(contract)
    false_evidence["evidence_boundary"] = "This proves the learner can write clearly."
    require(any("learning claims" in item for item in starter.validate_contract(false_evidence, check_surfaces=False)), "learning claim was accepted")

    promoted = copy.deepcopy(contract)
    promoted["status"] = "verified"
    require(any("candidate" in item for item in starter.validate_contract(promoted, check_surfaces=False)), "unrun exercise was promoted")

    print("STARTER_TASK_CONTRACT_TESTS_OK fixtures=6")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
