"""Focused fixtures for localized teaching-contract audit classifications."""

from __future__ import annotations

import audit_localized_learning_contract as audit


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    complete = """
## The problem this chapter solves
## Learning objectives
## A real-world entry point
## Experiment
### Setup
### Task
### Evidence
### Failure boundary
### Reflection
## Transfer task
## Acceptance checklist
## Sources and update boundary
"""
    missing_objective = complete.replace("## Learning objectives\n", "")
    require(audit.chapter_missing(complete) == [], "complete chapter contract was rejected")
    require(audit.chapter_missing(missing_objective) == ["objective"], "missing objective was not reported")
    require(audit.headings(complete) == 12, "heading counter changed unexpectedly")
    print("LOCALIZED_LEARNING_CONTRACT_TESTS_OK fixtures=3")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
