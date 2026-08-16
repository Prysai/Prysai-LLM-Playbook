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
SOURCE_CHECK_BOARD = ROOT / "assets/teaching/source-check-before-belief-red-black.svg"
RESEARCH_RECORD_BOARD = ROOT / "assets/teaching/research-question-to-source-record-red-black.svg"

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
        "mode: typed_rehearsal",
        "Do not use this record as a speaking, pronunciation",
    ],
    CLINIC: [
        'id="practice-route-chooser"',
        "Start here — choose one small route",
        "Open Card A1: fictional hotel check-in",
        "Open Card B1: define and make your own first attempt",
        "Open Card C1: turn a topic into a checkable question",
        "Open Card D1: find the missing source record",
        "Open Card E1: make a user-declared continuity receipt",
        "Already have a reply that missed the task?",
        "Each card is a candidate",
        "not evidence that it works for every learner or model.",
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
        'id="card-e1-user-declared-continuity-receipt"',
        "Card E1 — make a continuity receipt before a fresh turn",
        "user-declared continuity receipt for a fresh text-only turn",
        "Still active:",
        "Superseded or rejected:",
        "Unknown or unresolved:",
        "One next permitted action:",
        "Do not claim that you remember, forgot, cleared, or repaired any earlier conversation.",
        "does not establish continuity, correctness, privacy, safety, memory control",
        "user-declared context continuity source receipt",
        "No cross-model run evidence exists; product-specific actions require a sourced adapter.",
        "Beginner Practice Pack: Spanish practice, research, and first attempts",
        "Card A1",
        "Card A2",
        "Card B1",
        "Card B2",
        'id="six-short-work-update-messages"',
        "Six short messages for a work-update practice loop",
        "not a promise that an LLM can assess writing",
        "Freeze a fictional update brief",
        "Change one condition, not the whole task",
        "transferred_to_manager_audience",
        "Card C1",
        "Card C2",
        "Model should",
        "Common failure",
        "Evidence to keep",
        "Status and receipt boundary",
        "hotel check-in",
        "train station",
        "Keep the evidence surface honest",
        "mode: typed_rehearsal",
        "does not observe speech, listening, pronunciation, pace,",
        "ai-assisted-language-practice-boundaries-2026-08-14.md",
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
        "Boundary Card — before you share, search, or act",
        "Decide what stays out before you paste",
        "input status: [authorized instruction | external data | unknown]",
        "egress: [nothing leaves | minimum permitted fields -> named destination -> owner]",
        "Capability is not authority.",
        "cross-platform Boundary Card source receipt",
        "Five-minute synthetic safety decision",
        "CONFIDENTIAL_PLACEHOLDER",
        "external data / synthetic note only",
        "allowed effect: extract the stated deadline into a scratch note",
        "egress: nothing leaves",
        "external actions: not_run",
        "demonstrated_on_this_task",
        "not demonstrated",
        "prompt-injection resistance",
        "general safety competence",
        'id="source-check-route"',
        "Source check — when an answer looks cited",
        "Card D1 — source-record check",
        "source_record_present or unverified — source record missing",
        "source-shaped-answers-and-beginner-checks-2026-08-14.md",
        "Do not decide whether the claim is true.",
        'id="six-short-research-messages"',
        "Six short messages for one research check",
        "not a promise that an LLM can search correctly",
        "Authorize one narrow public lookup, or stop",
        "A link or citation marker without an opened matching passage is",
        "Do not call the research exhaustive",
        "research-question-to-source-record-red-black.svg",
        "universal-first-turn-prompt-contract-2026-08-13.md",
        "cross-platform-learner-needs-and-prompt-patterns-2026-08-13.md",
        'id="retrieval-scope-receipt"',
        "Card C3 — check whether a supplied source list follows the rule",
        "available trace: supplied list only",
        "scope_checked_for_supplied_list | partial_trace | blocked",
        "does not establish web-research ability, source quality, product behavior",
        "retrieval-scope-receipt-source-selection-constraints-2026-08-15.md",
        'id="share-check"',
        "Share Check — before an answer or conversation leaves your screen",
        "Do not create a link, send a message, ask for private text, or recommend a product.",
        "sensitive or unnecessary detail present: no | yes | unknown",
        "decision: draft a smaller excerpt | stop",
        "does not configure any product, create a link,",
        "shared-link audience and snapshot source receipt",
        "not evidence that a real recipient, model, product, link,",
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
        "everyday-prompt-steps",
        "Copy the card exactly as written.",
        "fictional typed hotel check-in",
        "Do not add a real name, booking, passport, or payment detail.",
        "Run one four-minute typed Spanish hotel check-in",
        "spoken conversation, pronunciation, listening",
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
    "[Open Card A1: fictional hotel check-in](#card-a1-hotel-baseline-and-correction)",
    "[Open Card B1: define and make your own first attempt](#card-b1-define-and-attempt-the-performance)",
    "[Open Card C1: turn a topic into a checkable question](#card-c1-decision-question-and-source-plan)",
    "[Open Card D1: find the missing source record](#card-d1-source-record-check)",
    "[Open Card E1: make a user-declared continuity receipt](#card-e1-user-declared-continuity-receipt)",
)

ROUTE_CARD_TARGETS = (
    ("#card-a1-hotel-baseline-and-correction", "### Card A1 — hotel baseline and correction"),
    ("#card-b1-define-and-attempt-the-performance", "### Card B1 — define and attempt the performance"),
    ("#card-c1-decision-question-and-source-plan", "### Card C1 — decision, question, and source plan"),
    ("#card-d1-source-record-check", "### Card D1 — source-record check"),
    ("#card-e1-user-declared-continuity-receipt", "### Card E1 — make a continuity receipt before a fresh turn"),
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
        # Markdown prose is routinely rewrapped during editing. Compare the
        # contract semantically, rather than treating a harmless line break as
        # missing teaching content.
        text = " ".join(path.read_text(encoding="utf-8").split())
        for needle in needles:
            normalized_needle = " ".join(needle.split())
            if normalized_needle.lower() not in text.lower():
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
        for card_anchor, card_heading in ROUTE_CARD_TARGETS:
            anchor_index = clinic_text.find(card_anchor)
            heading_index = clinic_text.find(card_heading)
            if anchor_index < 0 or heading_index < 0 or anchor_index >= heading_index:
                errors.append(f"communication-clinic: route target for {card_heading} is missing or out of order")

    if PRACTICE_BOARD.is_file():
        board_text = PRACTICE_BOARD.read_text(encoding="utf-8")
        if "PRYSAI LAB / ORIGINAL TEACHING BOARD / INSPECT THE RECEIPT" not in board_text:
            errors.append("beginner practice board is missing its stable provenance footer")
        if "CANDIDATE / 2026-08-13" in board_text:
            errors.append("beginner practice board freezes mutable candidate/date status in pixels")
    else:
        errors.append(f"missing file: {PRACTICE_BOARD.relative_to(ROOT)}")

    if SOURCE_CHECK_BOARD.is_file():
        board_text = SOURCE_CHECK_BOARD.read_text(encoding="utf-8")
        required_board_text = (
            "A citation is a pointer. Evidence is a record.",
            "STATUS: UNVERIFIED",
            "PRYSAI LAB / ORIGINAL TEACHING BOARD / CHECK THE RECORD",
        )
        for needle in required_board_text:
            if needle not in board_text:
                errors.append(f"source-check board is missing required text {needle!r}")
    else:
        errors.append(f"missing file: {SOURCE_CHECK_BOARD.relative_to(ROOT)}")

    if RESEARCH_RECORD_BOARD.is_file():
        board_text = RESEARCH_RECORD_BOARD.read_text(encoding="utf-8")
        required_board_text = (
            "DO NOT SEARCH A TOPIC.",
            "CHECK A DECISION.",
            "A LINK IS A LEAD.",
            "AN OPENED, MATCHED SOURCE CAN SUPPORT A CLAIM.",
            "PRYSAI LAB / ORIGINAL TEACHING BOARD / INSPECT THE SOURCE RECORD",
        )
        for needle in required_board_text:
            if needle not in board_text:
                errors.append(f"research-record board is missing required text {needle!r}")
    else:
        errors.append(f"missing file: {RESEARCH_RECORD_BOARD.relative_to(ROOT)}")

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
