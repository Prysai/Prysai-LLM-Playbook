"""Validate deterministic behavior fixtures for Evidence Review v0.3.0.

This gate derives narrow learning statuses from raw evidence facts and checks
the declared status of separately preserved runs. It does not execute a model.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "evals/candidates/evidence-review-v1/fixture.json"
VALID_RUN = ROOT / "evals/candidates/evidence-review-v1/runs/2026-08-13-method-loaded-handoff.md"
INVALID_CONTROL = ROOT / "evals/candidates/evidence-review-v1/runs/2026-08-13-invalid-no-method-control.md"
REQUIRED_KINDS = {"positive", "boundary", "failure", "transfer", "fresh-context"}
INFLATED_STATUSES = {"mastered", "fluent", "expert", "improved"}
RUBRIC_KEYS = {"four_turns", "identity", "reservation", "breakfast_question", "understandable"}


def load_fixture() -> dict[str, Any]:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


def field_is_present(field: str, value: Any) -> bool:
    """Apply packet semantics instead of treating every empty collection alike."""

    if field == "hint_ledger":
        return isinstance(value, list)
    if field == "allowed_aids":
        return isinstance(value, list) and bool(value) and all(
            isinstance(item, str) and item.strip() for item in value
        )
    if field == "changed_case_task":
        return isinstance(value, dict) and isinstance(value.get("id"), str) and bool(value["id"].strip())
    if field == "scorer":
        return (
            isinstance(value, dict)
            and isinstance(value.get("id"), str)
            and value.get("role") in {"independent_scorer", "coach", "model_self_score"}
            and isinstance(value.get("independent_from_coach"), bool)
        )
    if field == "rubric_scores":
        return (
            isinstance(value, dict)
            and set(value) == RUBRIC_KEYS
            and all(score in {0, 1} for score in value.values())
        )
    if field == "threshold":
        return isinstance(value, int) and 1 <= value <= len(RUBRIC_KEYS)
    if isinstance(value, str):
        return bool(value.strip())
    return value is not None


def evaluate_case(case: dict[str, Any], required_fields: list[str]) -> dict[str, Any]:
    if case.get("intent") == "coaching":
        return {
            "disposition": "handoff",
            "claim_status": None,
            "learning_status": None,
            "rejected_status": None,
            "handoff": "prysai-learning-coach",
            "missing_fields": [],
        }

    packet = case.get("packet") if isinstance(case.get("packet"), dict) else {}
    missing = sorted(
        field for field in required_fields
        if not field_is_present(field, packet.get(field))
    )
    requested = case.get("requested_status")
    rejected = requested if requested in INFLATED_STATUSES else None
    if missing:
        return {
            "disposition": "review",
            "claim_status": "unknown",
            "learning_status": None,
            "rejected_status": rejected,
            "handoff": None,
            "missing_fields": missing,
        }

    scorer = packet["scorer"]
    if not scorer["independent_from_coach"] or scorer["role"] != "independent_scorer":
        return {
            "disposition": "review",
            "claim_status": "unknown",
            "learning_status": None,
            "rejected_status": rejected,
            "handoff": None,
            "missing_fields": ["independent_scorer"],
        }

    fixed_task_passed = sum(packet["rubric_scores"].values()) >= packet["threshold"]
    changed_case = packet["changed_case_task"]
    changed_scores = changed_case.get("rubric_scores")
    changed_case_passed = (
        changed_case.get("unseen") is True
        and isinstance(changed_case.get("attempt"), str)
        and bool(changed_case["attempt"].strip())
        and isinstance(changed_scores, dict)
        and set(changed_scores) == {"party_size", "time", "reservation", "ambiguity_question", "understandable"}
        and all(score in {0, 1} for score in changed_scores.values())
        and sum(changed_scores.values()) >= packet["threshold"]
    )

    learning_status: str | None = None
    if packet.get("delayed_unseen_passed") and packet.get("delay"):
        learning_status = f"retained_at_{packet['delay']}"
    elif changed_case_passed and packet.get("variation"):
        learning_status = f"transferred_to_{packet['variation']}"
    elif fixed_task_passed:
        learning_status = "demonstrated_on_this_task"
    elif packet.get("learner_correction"):
        learning_status = "practised"

    exact = requested is None or requested == learning_status
    return {
        "disposition": "review",
        "claim_status": "verified" if learning_status and exact else "partially-verified" if learning_status else "unknown",
        "learning_status": learning_status,
        "rejected_status": rejected,
        "handoff": None,
        "missing_fields": [],
    }


def validate_document(document: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if document.get("schema_version") != "1": errors.append("schema_version must be '1'")
    if document.get("candidate_id") != "evidence-review-v1": errors.append("candidate_id mismatch")
    if document.get("skill_id") != "prysai-evidence-review": errors.append("skill_id mismatch")
    if document.get("skill_version") != "0.3.0": errors.append("skill_version must be 0.3.0")
    if document.get("status") != "candidate": errors.append("fixture status must remain candidate")
    if document.get("deterministic_check_status") != "policy_mapping_pass": errors.append("deterministic check must be labelled policy_mapping_pass")
    if document.get("runtime_evidence_status") != "observed_single_turn": errors.append("runtime_evidence_status must match the preserved method-loaded blind run")
    boundary = document.get("claim_boundary")
    if not isinstance(boundary, str) or "does not prove" not in boundary: errors.append("claim_boundary must reject broad runtime proof")
    required_fields = document.get("required_packet_fields")
    if not isinstance(required_fields, list) or set(required_fields) != {
        "fixture_revision", "allowed_aids", "baseline_attempt", "hint_ledger",
        "learner_correction", "changed_case_task", "scorer", "rubric_scores", "threshold"
    }: errors.append("required_packet_fields mismatch")
    fixtures = document.get("fixtures")
    if not isinstance(fixtures, list): return errors + ["fixtures must be a list"]
    kinds = {case.get("kind") for case in fixtures if isinstance(case, dict)}
    if kinds != REQUIRED_KINDS: errors.append(f"fixture kinds mismatch: {sorted(str(item) for item in kinds)}")
    ids: set[str] = set()
    for case in fixtures:
        if not isinstance(case, dict): errors.append("fixture must be an object"); continue
        case_id = case.get("id")
        if not isinstance(case_id, str) or not case_id or case_id in ids: errors.append(f"fixture id must be unique: {case_id}"); continue
        ids.add(case_id)
        if not isinstance(case.get("request"), str) or not case["request"].strip(): errors.append(f"{case_id}: request missing")
        expected = case.get("expected")
        if not isinstance(expected, dict): errors.append(f"{case_id}: expected result missing"); continue
        actual = evaluate_case(case, required_fields if isinstance(required_fields, list) else [])
        if actual != expected: errors.append(f"{case_id}: expected {expected!r}, derived {actual!r}")
    return errors


def validate_run_records() -> list[str]:
    errors: list[str] = []
    requirements = {
        VALID_RUN: [
            "observed_single_turn",
            "Repository access:** none",
            "Expected result disclosed:** no",
            "Learning Coach rather than Evidence Review",
            "does not establish automatic Skill",
        ],
        INVALID_CONTROL: [
            "invalid as a Skill behavior run",
            "not the Evidence Review method",
            "This control began coaching",
            "does not test Evidence Review",
        ],
    }
    for path, needles in requirements.items():
        if not path.is_file():
            errors.append(f"missing preserved run: {path.relative_to(ROOT).as_posix()}")
            continue
        text = path.read_text(encoding="utf-8")
        for needle in needles:
            if needle not in text:
                errors.append(f"{path.relative_to(ROOT).as_posix()}: missing run boundary: {needle}")
    return errors


def main() -> int:
    try:
        document = load_fixture()
        errors = validate_document(document) + validate_run_records()
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        errors = [f"fixture input error: {exc}"]
        document = {"fixtures": []}
    if errors:
        print("EVIDENCE_REVIEW_CANDIDATE_FAILED")
        for error in errors: print(f"- {error}")
        return 1
    print(f"EVIDENCE_REVIEW_CANDIDATE_OK fixtures={len(document['fixtures'])} status=candidate")
    print("deterministic_check=policy_mapping_pass")
    print("coverage=positive,boundary,failure,transfer,fresh-context")
    print("runtime_evidence=observed_single_turn")
    print("evidence_boundary=one-method-loaded-handoff-not-trigger-reliability")
    return 0


if __name__ == "__main__":
    sys.exit(main())
