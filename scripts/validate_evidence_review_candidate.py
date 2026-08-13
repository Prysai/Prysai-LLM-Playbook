"""Validate invented policy-mapping records for Evidence Review v0.3.0."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "evals/candidates/evidence-review-v1/fixture.json"
VALID_RUN = ROOT / "evals/candidates/evidence-review-v1/runs/2026-08-13-method-loaded-handoff.md"
INVALID_CONTROL = ROOT / "evals/candidates/evidence-review-v1/runs/2026-08-13-invalid-no-method-control.md"
REQUIRED_KINDS = {"positive", "boundary", "failure", "transfer", "retention-boundary", "fresh-context"}
INFLATED_STATUSES = {"mastered", "fluent", "expert", "improved"}
FORBIDDEN_OUTPUT_KEYS = {"claim_status", "learning_status", "learner_outcome"}


def load_fixture() -> dict[str, Any]:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


def evidence_record(value: Any) -> bool:
    return (
        isinstance(value, dict)
        and value.get("present") is True
        and isinstance(value.get("evidence_ref"), str)
        and value["evidence_ref"].startswith("fixture://")
    )


def correction_record(value: Any) -> bool:
    return (
        evidence_record(value)
        and value.get("learner_authorship_recorded") is True
    )


def scorer_record(value: Any) -> bool:
    return (
        isinstance(value, dict)
        and value.get("role") == "independent_scorer"
        and isinstance(value.get("independence_evidence_ref"), str)
        and value["independence_evidence_ref"].startswith("fixture://")
    )


def scored_task(value: Any) -> bool:
    return (
        isinstance(value, dict)
        and value.get("result") in {"pass", "fail"}
        and isinstance(value.get("rubric_revision"), str)
        and bool(value["rubric_revision"].strip())
        and isinstance(value.get("evidence_ref"), str)
        and value["evidence_ref"].startswith("fixture://")
    )


def changed_task(value: Any) -> bool:
    return (
        scored_task(value)
        and value.get("unseen_recorded") is True
        and value.get("material_delta_recorded") is True
        and isinstance(value.get("variation"), str)
        and bool(value["variation"].strip())
    )


def delayed_task(value: Any) -> bool:
    return (
        changed_task(value)
        and isinstance(value.get("delay"), str)
        and bool(value["delay"].strip())
    )


def evaluate_case(case: dict[str, Any]) -> dict[str, Any]:
    if case.get("intent") == "coaching":
        return {
            "disposition": "handoff",
            "would_support_status": None,
            "would_reject_status": None,
            "handoff": "prysai-learning-coach",
            "missing_fields": [],
        }

    packet = case.get("packet") if isinstance(case.get("packet"), dict) else {}
    checks = {
        "fixture_revision": isinstance(packet.get("fixture_revision"), str) and bool(packet["fixture_revision"].strip()),
        "allowed_aids": isinstance(packet.get("allowed_aids"), list) and bool(packet["allowed_aids"]),
        "baseline_record": evidence_record(packet.get("baseline_record")),
        "hint_record": evidence_record(packet.get("hint_record")),
        "correction_record": correction_record(packet.get("correction_record")),
        "fixed_task_record": scored_task(packet.get("fixed_task_record")),
        "scorer_record": scorer_record(packet.get("scorer_record")),
    }
    missing = sorted(name for name, present in checks.items() if not present)
    requested = case.get("requested_status")
    rejected = requested if requested in INFLATED_STATUSES else None

    if isinstance(requested, str) and requested.startswith("retained_at_"):
        if not delayed_task(packet.get("delayed_task_record")):
            return {
                "disposition": "review",
                "would_support_status": None,
                "would_reject_status": requested,
                "handoff": None,
                "missing_fields": sorted(set(missing + ["delayed_task_record"])),
            }
        delay = packet["delayed_task_record"]["delay"]
        support = f"retained_at_{delay}" if packet["delayed_task_record"]["result"] == "pass" else None
        if support != requested:
            rejected = requested
    elif isinstance(requested, str) and requested.startswith("transferred_to_"):
        if not changed_task(packet.get("changed_task_record")):
            missing.append("changed_task_record")
            support = None
            rejected = requested
        else:
            changed = packet["changed_task_record"]
            support = f"transferred_to_{changed['variation']}" if changed["result"] == "pass" else None
            if support != requested:
                rejected = requested
    else:
        fixed = packet.get("fixed_task_record")
        support = "demonstrated_on_this_task" if scored_task(fixed) and fixed["result"] == "pass" else None

    if missing:
        support = None
    return {
        "disposition": "review",
        "would_support_status": support,
        "would_reject_status": rejected,
        "handoff": None,
        "missing_fields": sorted(set(missing)),
    }


def walk(value: Any):
    if isinstance(value, dict):
        for key, item in value.items():
            yield key, item
            yield from walk(item)
    elif isinstance(value, list):
        for item in value:
            yield from walk(item)


def validate_document(document: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    required_labels = {
        "schema_version": "2",
        "candidate_id": "evidence-review-v1",
        "skill_id": "prysai-evidence-review",
        "skill_version": "0.3.0",
        "status": "candidate",
        "fixture_data_kind": "invented_policy_test_records",
        "learner_participation": "none",
        "learner_run_status": "not_run",
        "learner_outcome_evidence": "none",
        "result_scope": "policy_mapping_only",
        "deterministic_check_status": "policy_mapping_pass",
        "runtime_evidence_status": "editorial_observation_only",
    }
    for key, expected in required_labels.items():
        if document.get(key) != expected:
            errors.append(f"{key} must be {expected!r}")
    boundary = document.get("claim_boundary")
    if not isinstance(boundary, str) or "do not establish learner participation" not in boundary:
        errors.append("claim_boundary must reject learner and runtime conclusions")
    forbidden = [(key, value) for key, value in walk(document) if key in FORBIDDEN_OUTPUT_KEYS]
    if forbidden:
        errors.append(f"learner-facing result keys are forbidden in invented records: {sorted({key for key, _ in forbidden})}")
    fixtures = document.get("fixtures")
    if not isinstance(fixtures, list):
        return errors + ["fixtures must be a list"]
    kinds = {case.get("kind") for case in fixtures if isinstance(case, dict)}
    if kinds != REQUIRED_KINDS:
        errors.append(f"fixture kinds mismatch: {sorted(str(item) for item in kinds)}")
    ids: set[str] = set()
    for case in fixtures:
        if not isinstance(case, dict):
            errors.append("fixture must be an object")
            continue
        case_id = case.get("id")
        if not isinstance(case_id, str) or not case_id or case_id in ids:
            errors.append(f"fixture id must be unique: {case_id}")
            continue
        ids.add(case_id)
        if not isinstance(case.get("request"), str) or not case["request"].strip():
            errors.append(f"{case_id}: request missing")
        expected = case.get("expected_policy_output")
        if not isinstance(expected, dict):
            errors.append(f"{case_id}: expected policy output missing")
            continue
        actual = evaluate_case(case)
        if actual != expected:
            errors.append(f"{case_id}: expected {expected!r}, derived {actual!r}")
    return errors


def validate_run_records() -> list[str]:
    errors: list[str] = []
    requirements = {
        VALID_RUN: ["observed_single_turn", "Repository access:** none", "does not establish automatic Skill"],
        INVALID_CONTROL: ["invalid as a Skill behavior run", "does not test Evidence Review"],
    }
    for path, needles in requirements.items():
        if not path.is_file():
            errors.append(f"missing preserved editorial record: {path.relative_to(ROOT).as_posix()}")
            continue
        text = path.read_text(encoding="utf-8")
        for needle in needles:
            if needle not in text:
                errors.append(f"{path.relative_to(ROOT).as_posix()}: missing editorial boundary: {needle}")
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
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"EVIDENCE_REVIEW_CANDIDATE_OK data=invented_policy_test_records policy_cases={len(document['fixtures'])} learner_run=not_run learner_outcome=none result_scope=policy_mapping_only status=candidate")
    print("deterministic_check=policy_mapping_pass")
    print("learner_run=not_run learner_outcome=none")
    print("runtime_evidence=editorial_observation_only")
    return 0


if __name__ == "__main__":
    sys.exit(main())
