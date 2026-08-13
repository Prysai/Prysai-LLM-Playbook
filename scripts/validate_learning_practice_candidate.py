"""Validate the static learning-practice vertical-slice contract.

This gate checks declared controls and cross-file routing. It does not execute a
model or learner session and cannot establish learning, retention, or transfer.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GUIDE = ROOT / "book/guides/learning-practice-contract-EN.md"
LAB = ROOT / "book/labs/lab-018-language-transfer-EN.md"
CLINIC = ROOT / "book/communication-clinic-EN.md"
SKILL = ROOT / "skills/prysai-learning-coach/SKILL.md"
FIXTURE = ROOT / "evals/candidates/learning-practice-contract-v1/fixture.json"
FIRST_TURN_RUN = ROOT / "evals/candidates/learning-practice-contract-v1/runs/2026-08-13-baseline-first-turn.md"
SITE = ROOT / "site/index.html"

TEXT_REQUIREMENTS = {
    GUIDE: [
        "before the baseline",
        "retrieval before help",
        "unseen transfer",
        "delayed check",
        "demonstrated_on_this_task",
    ],
    LAB: [
        "answer-leakage",
        "do not reuse",
        "meaning-blocking",
        "retention",
        "not_run",
    ],
    CLINIC: [
        'id="first-practice-intake"',
        "first-practice intake",
        "Ask one question at a time",
        "Return exactly one route: A language exchange",
        "C a source-supported research decision.",
        "exact_status: template_selected",
        "This is a selector, not a",
        "diagnosis, course recommender, study plan, or fourth prompt catalogue.",
        "Do not generate a ranking.",
        'id="language-practice-route"',
        'id="general-skill-practice-route"',
        'id="bounded-research-route"',
        "Beginner Practice Pack v1",
        "Card A1",
        "Card A2",
        "Card B1",
        "Card B2",
        "Card C1",
        "Card C2",
        "Model should",
        "Common failure",
        "Evidence to keep",
        "Status and receipt boundary",
        "hotel check-in",
        "train station",
        "template_selected",
        "source-supported within",
        "beginner-practice-loop-red-black.svg",
        "route | prompt_card_revisions",
    ],
    SKILL: [
        "fixture_revision",
        "allowed_aids",
        "transfer_delta",
        "next_review_at",
        "Source Investigator",
        "Research Router",
        "version`: `0.3.0",
    ],
    SITE: [
        "communication-clinic-EN.md#first-practice-intake",
        "communication-clinic-EN.md#language-practice-route",
        "communication-clinic-EN.md#general-skill-practice-route",
        "communication-clinic-EN.md#bounded-research-route",
        "candidate · not_run",
    ],
    FIRST_TURN_RUN: [
        "observed_single_turn",
        "Full contract run:** `not_run`",
        "Preserved model response",
        "No learner",
        "does not establish",
    ],
}

FIXTURE_FIELDS = {
    "candidate_id",
    "status",
    "run_evidence_status",
    "fixture_revision",
    "platform_scope",
    "target_performance",
    "allowed_aids",
    "process_acceptance",
    "failure_fixtures",
    "required_run_fields",
    "claim_boundary",
}


def main() -> int:
    errors: list[str] = []
    for path, needles in TEXT_REQUIREMENTS.items():
        if not path.is_file():
            errors.append(f"missing file: {path.relative_to(ROOT)}")
            continue
        text = path.read_text(encoding="utf-8")
        for needle in needles:
            if needle.lower() not in text.lower():
                errors.append(f"{path.relative_to(ROOT)}: missing contract text {needle!r}")

    if FIXTURE.is_file():
        try:
            data = json.loads(FIXTURE.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError) as exc:
            errors.append(f"fixture is not valid JSON: {exc}")
        else:
            missing = sorted(FIXTURE_FIELDS - data.keys())
            if missing:
                errors.append("fixture missing fields: " + ", ".join(missing))
            if data.get("run_evidence_status") != "not_run":
                errors.append("fixture run_evidence_status must remain not_run without run records")
            required_failures = {
                "answer_leakage_before_baseline",
                "near_copy_labeled_as_transfer",
                "single_success_labeled_as_fluent",
                "same_session_labeled_as_retained",
            }
            missing_failures = required_failures - set(data.get("failure_fixtures", []))
            if missing_failures:
                errors.append("fixture missing failure controls: " + ", ".join(sorted(missing_failures)))

    if errors:
        print("LEARNING_PRACTICE_CANDIDATE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("LEARNING_PRACTICE_CANDIDATE_OK")
    print("scope=static-contract-and-routing")
    print("run_evidence=not_run")
    print("evidence_boundary=not-model-behavior-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
