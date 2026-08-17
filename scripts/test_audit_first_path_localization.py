"""Fixtures for the first-path localization guard."""

from __future__ import annotations

from pathlib import Path

import audit_first_path_localization as audit


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
    require(audit.contract_gaps("chapter", complete) == [], "complete chapter contract was rejected")
    require(audit.contract_gaps("chapter", complete.replace("## Learning objectives\n", "")) == ["objective"], "missing chapter objective was accepted")
    lesson_zero = """
## 0.1 One sentence
## What LLMs cannot do
### A five-minute boundary check
## 0.8 Sources and boundary
Continue with Chapter 1.
"""
    require(audit.lesson_zero_gaps(lesson_zero) == [], "complete Lesson 0 contract was rejected")
    require("next_unit" in audit.lesson_zero_gaps(lesson_zero.replace("Chapter 1", "the next chapter")), "missing Lesson 0 next unit was accepted")
    fixture = Path(audit.ROOT / ".work" / "first-path-locale-fixture-ZH.md")
    fixture.parent.mkdir(exist_ok=True)
    fixture.write_text("[English](chapter-01-gpt-and-codex-EN.md)\n", encoding="utf-8")
    try:
        require(audit.wrong_locale_links(fixture, "ZH") == ["chapter-01-gpt-and-codex-EN.md"], "cross-locale course link was accepted")
    finally:
        fixture.unlink(missing_ok=True)
    print("FIRST_PATH_LOCALIZATION_AUDIT_TESTS_OK fixtures=5")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
