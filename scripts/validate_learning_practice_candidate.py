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
RECOVERY_SKILL = ROOT / "skills/prysai-communication-failure-triage/SKILL.md"
FIXTURE = ROOT / "evals/candidates/learning-practice-contract-v1/fixture.json"
FIRST_TURN_RUN = ROOT / "evals/candidates/learning-practice-contract-v1/runs/2026-08-13-baseline-first-turn.md"
SITE = ROOT / "site/index.html"
PRACTICE_BOARD = ROOT / "assets/teaching/beginner-practice-loop-red-black.svg"

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
        'id="practice-route-chooser"',
        "Choose one short route",
        "Start Card A1: four-turn hotel check-in",
        "Start Card B1: define and attempt the performance",
        "Start Card C1: decision, question, and source plan",
        "Already have a reply that missed the task?",
        "Each route is a candidate template; selecting it is not",
        "evidence that it works for a learner or a model.",
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
        'id="recovery-route"',
        "Recovery card 1",
        "Recovery card 2",
        "original request, visible context, actual reply",
        "improved_on_this_case | unchanged | regressed | not_comparable",
        "failed-interaction-recovery-red-black.svg",
        "Communication Failure Triage Skill",
        "after two comparable reruns without improvement",
        "Five-minute synthetic safety decision",
        "CONFIDENTIAL_PLACEHOLDER",
        "synthetic note only",
        "allowed action: extract the stated deadline",
        "external actions: not_run",
        "demonstrated_on_this_task",
        "not demonstrated",
        "prompt-injection resistance",
        "general safety competence",
    ],
    SKILL: [
        "fixture_revision",
        "allowed_aids",
        "transfer_delta",
        "next_review_at",
        "Source Investigator",
        "Research Router",
        "project heuristics",
        "Never label a learner",
        "version`: `0.4.0",
    ],
    RECOVERY_SKILL: [
        "Require four items before diagnosis",
        "Change only the proposed communication repair",
        "Never write `resolved`",
        "After two comparable",
        "reruns without improvement",
    ],
    SITE: [
        "communication-clinic-EN.md#first-practice-intake",
        "communication-clinic-EN.md#language-practice-route",
        "communication-clinic-EN.md#general-skill-practice-route",
        "communication-clinic-EN.md#bounded-research-route",
        "communication-clinic-EN.md#recovery-route",
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

ROUTE_CHOOSER_TARGETS = (
    "[Start Card A1: four-turn hotel check-in](#language-practice-route)",
    "[Start Card B1: define and attempt the performance](#general-skill-practice-route)",
    "[Start Card C1: decision, question, and source plan](#bounded-research-route)",
    "[recovery route](#recovery-route)",
)

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

    if CLINIC.is_file():
        clinic_text = CLINIC.read_text(encoding="utf-8")
        chooser_index = clinic_text.find('<span id="practice-route-chooser"></span>')
        intake_index = clinic_text.find('<span id="first-practice-intake"></span>')
        route_indices = [clinic_text.find(target) for target in ROUTE_CHOOSER_TARGETS]
        if chooser_index < 0 or intake_index < 0 or chooser_index >= intake_index:
            errors.append("communication-clinic: route chooser must appear before the first-practice intake")
        if any(index < 0 for index in route_indices):
            errors.append("communication-clinic: route chooser targets are incomplete")
        elif chooser_index >= min(route_indices):
            errors.append("communication-clinic: route chooser targets must follow the chooser heading")

    if PRACTICE_BOARD.is_file():
        board_text = PRACTICE_BOARD.read_text(encoding="utf-8")
        if "PRYSAI LAB / ORIGINAL TEACHING BOARD / INSPECT THE RECEIPT" not in board_text:
            errors.append("beginner practice board is missing its stable provenance footer")
        if "CANDIDATE / 2026-08-13" in board_text:
            errors.append("beginner practice board freezes mutable candidate/date status in pixels")
    else:
        errors.append(f"missing file: {PRACTICE_BOARD.relative_to(ROOT)}")

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
