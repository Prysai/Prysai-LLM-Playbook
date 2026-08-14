"""Validate the proposed Context Packet Builder fixture without running a model.

This gate keeps an unadmitted responsibility honest: it verifies only the
structure and declared decision boundaries of original fictional inputs.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CANDIDATE_ID = "context-packet-builder-v1"
CANDIDATE = ROOT / "evals" / "candidates" / CANDIDATE_ID
FIXTURE = CANDIDATE / "fixture.json"
RUN_TEMPLATE = CANDIDATE / "run-record-template.json"
RUBRIC = CANDIDATE / "review-rubric.json"
README = CANDIDATE / "README.md"

REQUIRED_KINDS = {"positive", "boundary", "failure", "budget", "transfer"}
REQUIRED_PACKET_FIELDS = {
    "task_id",
    "authority_envelope",
    "selected_materials",
    "excluded_materials",
    "redactions",
    "conflicts_and_unknowns",
    "budget_receipt",
    "downstream_handoff",
    "evidence_receipt",
}
REQUIRED_ROUTING_OWNERS = {
    "prysai-task-protocol",
    "prysai-product-context",
    "prysai-source-investigator",
    "prysai-research-router",
    "prysai-evidence-review",
    "prysai-workflow-orchestrator",
    "context-packet-builder-proposal",
}
REQUIRED_RUN_FIELDS = {
    "fixture_id",
    "fixture_revision",
    "model_and_surface",
    "model_settings_if_visible",
    "authority_envelope",
    "selected_material_ids",
    "excluded_material_ids_with_reasons",
    "redaction_decisions",
    "conflicts_and_unknowns",
    "budget_receipt",
    "downstream_handoff",
    "stop_or_escalation",
    "raw_output_location_or_not_retained_reason",
    "independent_reviewer",
    "review_result",
    "disagreement",
    "claim_limits",
}
FORBIDDEN_TEXT = ("http://", "https://", "api_key", "token=", "password=", "private key", "cookie=")


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def require_string(value: Any, label: str, errors: list[str]) -> None:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label} must be a non-empty string")


def validate_top_level(document: dict[str, Any], errors: list[str]) -> None:
    expected = {
        "schema_version": "1",
        "candidate_id": CANDIDATE_ID,
        "proposal_name": "Context Packet Builder",
        "status": "proposed",
        "skill_exists": False,
        "skill_admission": "blocked_pending_behavioral_gates",
        "run_evidence_status": "not_run",
        "independent_review_status": "not_run",
        "fresh_context_routing_status": "not_run",
        "downstream_handoff_status": "not_run",
        "fixture_data_kind": "original_fictional_material_only",
    }
    for key, value in expected.items():
        if document.get(key) != value:
            errors.append(f"{key} must be {value!r}")
    required_fields = document.get("required_packet_fields")
    if not isinstance(required_fields, list) or set(required_fields) != REQUIRED_PACKET_FIELDS:
        errors.append("required_packet_fields must contain the declared packet contract exactly")
    boundary = document.get("claim_boundary")
    if not isinstance(boundary, str) or "does not establish model behavior" not in boundary or "production readiness" not in boundary:
        errors.append("claim_boundary must reject model and release conclusions")


def validate_routing(document: dict[str, Any], errors: list[str]) -> None:
    cases = document.get("routing_cases")
    if not isinstance(cases, list):
        errors.append("routing_cases must be a list")
        return
    ids: set[str] = set()
    owners: set[str] = set()
    for case in cases:
        if not isinstance(case, dict):
            errors.append("routing case must be an object")
            continue
        case_id = case.get("id")
        if not isinstance(case_id, str) or not case_id or case_id in ids:
            errors.append(f"routing case id must be unique: {case_id}")
        else:
            ids.add(case_id)
        for key in ("kind", "request", "expected_owner", "reason"):
            require_string(case.get(key), f"routing {case_id}.{key}", errors)
        owner = case.get("expected_owner")
        if isinstance(owner, str):
            owners.add(owner)
    if owners != REQUIRED_ROUTING_OWNERS:
        errors.append(f"routing owners mismatch: {sorted(owners)}")


def validate_fixture_case(case: dict[str, Any], errors: list[str]) -> None:
    case_id = case.get("id", "<unknown>")
    task = case.get("task")
    if not isinstance(task, dict):
        errors.append(f"{case_id}: task must be an object")
        return
    for key in ("id", "goal"):
        require_string(task.get(key), f"{case_id}.task.{key}", errors)
    acceptance = task.get("acceptance")
    if not isinstance(acceptance, list) or not acceptance or any(not isinstance(value, str) or not value.strip() for value in acceptance):
        errors.append(f"{case_id}.task.acceptance must be a non-empty string list")
    envelope = task.get("authority_envelope")
    if not isinstance(envelope, dict):
        errors.append(f"{case_id}.task.authority_envelope must be an object")
    else:
        for key in ("allowed", "forbidden"):
            values = envelope.get(key)
            if not isinstance(values, list) or not values or any(not isinstance(value, str) or not value.strip() for value in values):
                errors.append(f"{case_id}.authority_envelope.{key} must be a non-empty string list")
        require_string(envelope.get("stop"), f"{case_id}.authority_envelope.stop", errors)

    materials = case.get("materials")
    if not isinstance(materials, list) or not materials:
        errors.append(f"{case_id}.materials must be a non-empty list")
        return
    material_ids: set[str] = set()
    material_kinds: set[str] = set()
    for material in materials:
        if not isinstance(material, dict):
            errors.append(f"{case_id}: material must be an object")
            continue
        material_id = material.get("id")
        if not isinstance(material_id, str) or not material_id or material_id in material_ids:
            errors.append(f"{case_id}: material id must be unique: {material_id}")
        else:
            material_ids.add(material_id)
        for key in ("source_identity", "kind", "freshness", "content", "decision_role"):
            require_string(material.get(key), f"{case_id}.{material_id}.{key}", errors)
        source = material.get("source_identity")
        if isinstance(source, str) and not source.startswith("fixture://"):
            errors.append(f"{case_id}.{material_id}: source_identity must use fixture://")
        kind = material.get("kind")
        if isinstance(kind, str):
            material_kinds.add(kind)
        content = material.get("content")
        if isinstance(content, str) and any(token in content.lower() for token in FORBIDDEN_TEXT):
            errors.append(f"{case_id}.{material_id}: fictional fixture must not contain a URL or secret marker")

    expected = case.get("expected_packet")
    if not isinstance(expected, dict):
        errors.append(f"{case_id}.expected_packet must be an object")
        return
    disposition = expected.get("disposition")
    if disposition not in {"packet_plan_allowed", "blocked"}:
        errors.append(f"{case_id}.expected_packet.disposition is invalid")
    for key in ("selected_ids", "excluded_ids", "redacted_ids", "required_conflicts", "required_unknowns"):
        values = expected.get(key)
        if not isinstance(values, list):
            errors.append(f"{case_id}.expected_packet.{key} must be a list")
    selected = expected.get("selected_ids", [])
    excluded = expected.get("excluded_ids", [])
    redacted = expected.get("redacted_ids", [])
    if isinstance(selected, list) and isinstance(excluded, list) and set(selected) & set(excluded):
        errors.append(f"{case_id}: selected and excluded items overlap")
    for value in [*selected, *excluded, *redacted]:
        if value not in material_ids:
            errors.append(f"{case_id}: expected packet references unknown material {value}")
    for key in ("budget_receipt", "downstream_authority"):
        require_string(expected.get(key), f"{case_id}.expected_packet.{key}", errors)

    if "sensitive-placeholder" in material_kinds:
        if disposition != "blocked" or not set(expected.get("excluded_ids", [])):
            errors.append(f"{case_id}: sensitive placeholder must block and be excluded")
    if "external-instruction-like-text" in material_kinds:
        unknowns = expected.get("required_unknowns", [])
        if not any("untrusted data" in value.lower() and "no authority" in value.lower() for value in unknowns if isinstance(value, str)):
            errors.append(f"{case_id}: hostile instruction must be labeled as untrusted data without authority")
        authority = str(expected.get("downstream_authority", "")).lower()
        if any(token in authority for token in ("upload", "send", "browse", "credential")):
            errors.append(f"{case_id}: hostile instruction widened downstream authority")
    if case.get("kind") == "budget":
        conflicts = expected.get("required_conflicts", [])
        unknowns = expected.get("required_unknowns", [])
        if not conflicts or not any("stale" in value.lower() for value in unknowns if isinstance(value, str)):
            errors.append(f"{case_id}: budget fixture must preserve conflict and stale limit")
        if len(expected.get("selected_ids", [])) >= len(materials):
            errors.append(f"{case_id}: budget fixture must make a documented reduction")


def validate_run_template(document: dict[str, Any], errors: list[str]) -> None:
    if document.get("candidate_id") != CANDIDATE_ID:
        errors.append("run template candidate_id drift")
    if document.get("run_status") != "not_run":
        errors.append("run template must remain not_run")
    fields = document.get("required_fields")
    if not isinstance(fields, list) or set(fields) != REQUIRED_RUN_FIELDS:
        errors.append("run template required_fields must preserve the review record contract")
    if document.get("required_statuses") != ["completed", "blocked", "stopped", "not_available"]:
        errors.append("run template must preserve failure-visible statuses")
    if "not a model benchmark" not in str(document.get("claim_limits", "")):
        errors.append("run template must reject benchmark and outcome conclusions")


def validate_rubric(document: dict[str, Any], errors: list[str]) -> None:
    if document.get("candidate_id") != CANDIDATE_ID or document.get("status") != "proposed":
        errors.append("review rubric must remain attached to the proposed candidate")
    dimensions = document.get("dimensions")
    expected = {"task-and-authority", "provenance", "sensitive-boundary", "untrusted-instruction", "conflict-and-freshness", "budget-receipt", "handoff"}
    ids = {item.get("id") for item in dimensions if isinstance(item, dict)} if isinstance(dimensions, list) else set()
    if ids != expected:
        errors.append(f"review rubric dimensions mismatch: {sorted(str(value) for value in ids)}")
    if document.get("review_outcomes") != ["pass_on_this_synthetic_fixture", "partial", "fail", "not_observable"]:
        errors.append("review rubric outcomes drift")
    forbidden = document.get("forbidden_conclusions")
    if not isinstance(forbidden, list) or not {"safe", "secure", "prompt-injection resistant", "automatically routed", "learner proven", "production ready"}.issubset(set(forbidden)):
        errors.append("review rubric must forbid inflated conclusions")


def validate_document(document: dict[str, Any], run_template: dict[str, Any], rubric: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    validate_top_level(document, errors)
    validate_routing(document, errors)
    fixtures = document.get("fixtures")
    if not isinstance(fixtures, list):
        errors.append("fixtures must be a list")
    else:
        ids: set[str] = set()
        kinds: set[str] = set()
        for case in fixtures:
            if not isinstance(case, dict):
                errors.append("fixture must be an object")
                continue
            case_id = case.get("id")
            if not isinstance(case_id, str) or not case_id or case_id in ids:
                errors.append(f"fixture id must be unique: {case_id}")
            else:
                ids.add(case_id)
            kind = case.get("kind")
            if isinstance(kind, str):
                kinds.add(kind)
            validate_fixture_case(case, errors)
        if kinds != REQUIRED_KINDS:
            errors.append(f"fixture kinds mismatch: {sorted(kinds)}")
    validate_run_template(run_template, errors)
    validate_rubric(rubric, errors)
    if not README.is_file():
        errors.append("candidate README is missing")
    else:
        text = README.read_text(encoding="utf-8").replace("**", "")
        for phrase in ("Skill status: no Skill exists", "Model run status: `not_run`", "Independent review status: `not_run`", "security test", "fifteenth Skill"):
            if phrase not in text:
                errors.append(f"candidate README is missing boundary phrase: {phrase}")
    return errors


def main() -> int:
    try:
        document = load_json(FIXTURE)
        run_template = load_json(RUN_TEMPLATE)
        rubric = load_json(RUBRIC)
        errors = validate_document(document, run_template, rubric)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors = [f"candidate input error: {exc}"]
        document = {"fixtures": []}
    if errors:
        print("CONTEXT_PACKET_BUILDER_CANDIDATE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"CONTEXT_PACKET_BUILDER_CANDIDATE_OK fixtures={len(document['fixtures'])} routing=7 status=proposed run_evidence=not_run independent_review=not_run")
    print("scope=fixture-and-admission-integrity; model_behavior=not_run; skill_exists=false")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
