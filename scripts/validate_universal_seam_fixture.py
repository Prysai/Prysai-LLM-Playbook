"""Validate the original, offline Universal Seam Fixture contract."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "examples/universal-seam-v1/cases.json"
ACCEPTANCE = ROOT / "examples/universal-seam-v1/expected/acceptance.json"


def load(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def as_non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate(fixture: dict[str, Any], acceptance: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if fixture.get("schema_version") != "1" or acceptance.get("schema_version") != "1":
        errors.append("fixture and acceptance schema_version must be '1'")
    if fixture.get("fixture_id") != "universal-seam-v1" or acceptance.get("fixture_id") != "universal-seam-v1":
        errors.append("fixture and acceptance must identify universal-seam-v1")

    expected_ids = acceptance.get("required_case_ids")
    required_fields = acceptance.get("required_fields")
    vocabulary = acceptance.get("required_status_vocabulary")
    cases = fixture.get("cases")
    if not isinstance(expected_ids, list) or not all(as_non_empty_string(item) for item in expected_ids):
        errors.append("acceptance required_case_ids must be a non-empty string list")
        expected_ids = []
    if not isinstance(required_fields, list) or not all(as_non_empty_string(item) for item in required_fields):
        errors.append("acceptance required_fields must be a non-empty string list")
        required_fields = []
    if not isinstance(vocabulary, list) or vocabulary != ["verified_in_fixture", "blocked", "not_run", "inferred"]:
        errors.append("acceptance status vocabulary must preserve the four fixture states in order")
        vocabulary = []
    if fixture.get("status_vocabulary") != vocabulary:
        errors.append("fixture status_vocabulary must exactly match acceptance")
    if not isinstance(cases, list):
        errors.append("fixture cases must be a list")
        cases = []

    observed_ids: list[str] = []
    statuses = acceptance.get("expected_statuses")
    if not isinstance(statuses, dict):
        errors.append("acceptance expected_statuses must be an object")
        statuses = {}
    for index, case in enumerate(cases, start=1):
        label = f"case {index}"
        if not isinstance(case, dict):
            errors.append(f"{label} must be an object")
            continue
        case_id = case.get("id")
        if not as_non_empty_string(case_id):
            errors.append(f"{label} id must be non-empty")
            continue
        observed_ids.append(case_id)
        for field in required_fields:
            value = case.get(field)
            if field == "observed_state":
                valid = isinstance(value, dict) and bool(value)
            elif field == "fixture_evidence":
                valid = isinstance(value, list) and len(value) >= 2 and all(as_non_empty_string(item) for item in value)
            else:
                valid = as_non_empty_string(value)
            if not valid:
                errors.append(f"{case_id}: {field} must be observable and non-empty")
        if case.get("expected_status") not in vocabulary:
            errors.append(f"{case_id}: expected_status must use fixture vocabulary")
        elif statuses.get(case_id) != case.get("expected_status"):
            errors.append(f"{case_id}: expected_status does not match acceptance")
        if "do not" not in str(case.get("smallest_safe_check", "")).lower():
            errors.append(f"{case_id}: smallest_safe_check must explicitly keep the action bounded")
        if case.get("expected_status") == "not_run" and "receipt" not in str(case.get("stop_condition", "")).lower():
            errors.append(f"{case_id}: not_run case must stop on the missing receipt")
        if case.get("expected_status") == "inferred" and "adapter" not in str(case.get("platform_adapter", "")).lower():
            errors.append(f"{case_id}: inferred case must require a future adapter for live diagnosis")

    if observed_ids != expected_ids:
        errors.append(f"case IDs must remain ordered and fixed: {expected_ids}")
    if len(observed_ids) != len(set(observed_ids)):
        errors.append("case IDs must be unique")
    if set(statuses) != set(expected_ids):
        errors.append("acceptance expected_statuses must cover every required case exactly")

    boundary = fixture.get("evidence_boundary")
    if not as_non_empty_string(boundary):
        errors.append("fixture evidence_boundary must be non-empty")
        boundary = ""
    for fragment in acceptance.get("required_boundary_fragments", []):
        if fragment not in boundary.lower():
            errors.append(f"evidence_boundary is missing required limit: {fragment}")
    lowered = json.dumps(fixture, ensure_ascii=False).lower()
    for fragment in acceptance.get("forbidden_claim_fragments", []):
        if fragment in lowered:
            errors.append(f"fixture contains forbidden broad claim: {fragment}")
    return errors


def main() -> int:
    try:
        errors = validate(load(FIXTURE), load(ACCEPTANCE))
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors = [str(exc)]
    if errors:
        print("UNIVERSAL_SEAM_FIXTURE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("UNIVERSAL_SEAM_FIXTURE_OK cases=4 statuses=4 network=not_used model=not_used")
    print("evidence_boundary=fixed-fictional-records; not-platform-or-learner-proof")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
