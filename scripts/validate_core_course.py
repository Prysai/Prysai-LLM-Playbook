"""Validate the static LLM Foundation Core v1 course contract.

The contract gate checks route identity, order, scope, learner artifacts, and
synthetic fixture coverage. It never executes a model or treats a static pass
as evidence of learning, transfer, or release readiness.
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
COURSE_PATH = ROOT / "docs/governance/core-course.yaml"
RUBRIC_PATH = ROOT / "evals/candidates/core-course-v1/scoring-rubric.json"
FIXTURE_PATH = ROOT / "evals/candidates/core-course-v1/fixture.json"
RUN_RECORD_TEMPLATE_PATH = ROOT / "evals/candidates/core-course-v1/run-record-template.json"
INVENTORY_PATH = ROOT / "docs/governance/core-content-inventory.yaml"

EXPECTED_OUTCOMES = ["explain", "initiate", "identify", "repair", "transfer"]
EXPECTED_CASE_TYPES = {"correct", "boundary", "failure"}
EXPECTED_RUN_RECORD_FIELDS = {
    "candidate_id",
    "fixture_revision",
    "run_status",
    "model_and_surface",
    "task_and_context",
    "allowed_aids",
    "first_artifact",
    "rubric_scores",
    "help_disclosure",
    "reviewers",
    "disagreements",
    "claim_status",
    "limits",
}
UNIT_ID_RE = re.compile(r"^core-[a-z0-9-]+$")


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def existing_file(path_value: Any, *, root: Path) -> bool:
    return non_empty_string(path_value) and (root / str(path_value)).is_file()


def core_source_paths(root: Path) -> set[str]:
    inventory = load_json(root / "docs/governance/core-content-inventory.yaml")
    paths: set[str] = set()
    for unit in inventory.get("core_units", []):
        if isinstance(unit, dict):
            paths.update(
                value
                for value in unit.get("source_paths", [])
                if isinstance(value, str)
            )
    return paths


def validate_course(document: dict[str, Any], *, root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    if document.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if document.get("course_id") != "llm-foundation-core-v1":
        errors.append("course_id must be llm-foundation-core-v1")
    if document.get("status") != "candidate":
        errors.append("status must remain candidate")
    if document.get("run_status") != "not_run":
        errors.append("run_status must remain not_run")
    if not non_empty_string(document.get("claim_boundary")):
        errors.append("claim_boundary must be non-empty")

    route_value = document.get("route_path")
    route_path = root / str(route_value or "")
    if not route_path.is_file():
        errors.append(f"route_path does not exist: {route_value}")
        route_text = ""
    else:
        route_text = route_path.read_text(encoding="utf-8")

    outcomes = document.get("outcomes")
    if outcomes != EXPECTED_OUTCOMES:
        errors.append("outcomes must be the five ordered core outcomes")

    entry = document.get("entry")
    if not isinstance(entry, dict):
        errors.append("entry must be an object")
        entry = {}
    if entry.get("id") != "core-first-success":
        errors.append("entry.id must be core-first-success")
    if entry.get("path") != route_value:
        errors.append("entry.path must equal route_path")
    if not existing_file(entry.get("path"), root=root):
        errors.append("entry.path must point to an existing file")
    if not isinstance(entry.get("estimated_minutes"), int) or entry["estimated_minutes"] <= 0:
        errors.append("entry.estimated_minutes must be a positive integer")
    if not non_empty_string(entry.get("learner_artifact")):
        errors.append("entry.learner_artifact must be non-empty")
    if not isinstance(entry.get("stop_if"), list) or not entry["stop_if"]:
        errors.append("entry.stop_if must be a non-empty list")
    if "core-first-success" not in route_text:
        errors.append("route must expose the core-first-success entry marker")

    units = document.get("units")
    if not isinstance(units, list) or len(units) != 5:
        errors.append("units must contain exactly five ordered units")
        units = units if isinstance(units, list) else []

    try:
        allowed_core_sources = core_source_paths(root)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors.append(f"cannot load core content inventory: {exc}")
        allowed_core_sources = set()

    seen_ids: set[str] = set()
    seen_sequences: set[int] = set()
    seen_outcomes: set[str] = set()
    seen_content_paths: set[str] = set()
    previous_id: str | None = None
    marker_positions: list[int] = []
    total_minutes = int(entry.get("estimated_minutes", 0) or 0)

    for index, unit in enumerate(units, start=1):
        label = f"units[{index}]"
        if not isinstance(unit, dict):
            errors.append(f"{label} must be an object")
            continue

        unit_id = unit.get("id")
        if not isinstance(unit_id, str) or not UNIT_ID_RE.fullmatch(unit_id):
            errors.append(f"{label}.id must be a core-* identifier")
            unit_id = f"invalid-{index}"
        elif unit_id in seen_ids:
            errors.append(f"duplicate unit id: {unit_id}")
        seen_ids.add(unit_id)

        sequence = unit.get("sequence")
        if not isinstance(sequence, int) or sequence != index:
            errors.append(f"{unit_id}: sequence must be {index}")
        elif sequence in seen_sequences:
            errors.append(f"{unit_id}: sequence is duplicated")
        else:
            seen_sequences.add(sequence)

        outcome = unit.get("outcome")
        expected_outcome = EXPECTED_OUTCOMES[index - 1] if index <= len(EXPECTED_OUTCOMES) else None
        if outcome != expected_outcome:
            errors.append(f"{unit_id}: outcome must be {expected_outcome}")
        if isinstance(outcome, str):
            if outcome in seen_outcomes:
                errors.append(f"{unit_id}: outcome is duplicated")
            seen_outcomes.add(outcome)

        if unit.get("scope_class") != "core":
            errors.append(f"{unit_id}: scope_class must be core")
        if unit.get("status") != "candidate":
            errors.append(f"{unit_id}: status must remain candidate")
        if unit.get("run_status") != "not_run":
            errors.append(f"{unit_id}: run_status must remain not_run")

        minutes = unit.get("estimated_minutes")
        if not isinstance(minutes, int) or minutes <= 0:
            errors.append(f"{unit_id}: estimated_minutes must be a positive integer")
        else:
            total_minutes += minutes

        dependencies = unit.get("depends_on")
        expected_dependencies = [] if previous_id is None else [previous_id]
        if dependencies != expected_dependencies:
            errors.append(f"{unit_id}: depends_on must point to the immediately preceding unit")
        previous_id = unit_id

        concepts = unit.get("new_concepts")
        if not isinstance(concepts, list) or not (1 <= len(concepts) <= 3) or not all(non_empty_string(item) for item in concepts):
            errors.append(f"{unit_id}: new_concepts must contain at most three non-empty items")

        content_paths = unit.get("content_paths")
        if not isinstance(content_paths, list) or not content_paths:
            errors.append(f"{unit_id}: content_paths must be a non-empty list")
            content_paths = []
        for content_path in content_paths:
            if not existing_file(content_path, root=root):
                errors.append(f"{unit_id}: content path is missing: {content_path}")
            elif content_path not in allowed_core_sources:
                errors.append(f"{unit_id}: content path is not registered as core: {content_path}")
            if content_path in seen_content_paths:
                errors.append(f"{unit_id}: content path has another owner: {content_path}")
            seen_content_paths.add(content_path)

        marker = unit.get("route_marker")
        if not non_empty_string(marker):
            errors.append(f"{unit_id}: route marker must be non-empty")
        else:
            marker_token = f'id="{marker}"'
            position = route_text.find(marker_token)
            if position < 0:
                errors.append(f"{unit_id}: route marker is missing: {marker}")
            else:
                marker_positions.append(position)

        for field in ("title", "learner_artifact", "operation", "failure_boundary"):
            if not non_empty_string(unit.get(field)):
                errors.append(f"{unit_id}: {field} must be non-empty")
        evidence = unit.get("evidence_requirements")
        if not isinstance(evidence, list) or not evidence or not all(non_empty_string(item) for item in evidence):
            errors.append(f"{unit_id}: evidence_requirements must be a non-empty string list")

        if content_paths and route_path.is_file():
            first_content = Path(str(content_paths[0]))
            relative_link = Path(
                os.path.relpath(root / first_content, route_path.parent)
            ).as_posix()
            if relative_link not in route_text:
                errors.append(f"{unit_id}: route is missing content link {relative_link}")

    if marker_positions != sorted(marker_positions):
        errors.append("unit route markers must remain in sequence")
    if seen_outcomes != set(EXPECTED_OUTCOMES):
        errors.append("units must cover each core outcome exactly once")
    if not 90 <= total_minutes <= 120:
        errors.append("entry plus units must estimate between 90 and 120 minutes")
    return errors


def validate_rubric(document: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if document.get("schema_version") != "1":
        errors.append("rubric schema_version must be '1'")
    if document.get("candidate_id") != "core-course-v1":
        errors.append("rubric candidate_id must be core-course-v1")
    if document.get("status") != "candidate":
        errors.append("rubric status must remain candidate")
    if document.get("run_status") != "not_run":
        errors.append("rubric run_status must remain not_run")
    if document.get("score_values") != [0, 1, 2]:
        errors.append("rubric score_values must be [0, 1, 2]")
    outcomes = document.get("outcomes")
    if not isinstance(outcomes, list) or [item.get("id") for item in outcomes if isinstance(item, dict)] != EXPECTED_OUTCOMES:
        errors.append("rubric outcomes must cover the five ordered outcomes")
    for index, item in enumerate(outcomes if isinstance(outcomes, list) else [], start=1):
        if not isinstance(item, dict):
            errors.append(f"rubric outcomes[{index}] must be an object")
            continue
        anchors = item.get("anchors")
        if not isinstance(anchors, dict) or set(anchors) != {"0", "1", "2"} or not all(non_empty_string(value) for value in anchors.values()):
            errors.append(f"rubric outcomes[{index}] must have non-empty 0/1/2 anchors")
        if not non_empty_string(item.get("artifact")):
            errors.append(f"rubric outcomes[{index}].artifact must be non-empty")
    if not isinstance(document.get("review_outcomes"), list) or not document["review_outcomes"]:
        errors.append("rubric review_outcomes must be non-empty")
    forbidden = document.get("forbidden_conclusions")
    required_forbidden = {"learned", "mastered", "fluent", "retained", "production_ready"}
    if not isinstance(forbidden, list) or not required_forbidden.issubset(set(forbidden)):
        errors.append("rubric forbidden_conclusions is missing claim boundaries")
    return errors


def validate_fixture(document: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if document.get("schema_version") != "1":
        errors.append("fixture schema_version must be '1'")
    if document.get("candidate_id") != "core-course-v1":
        errors.append("fixture candidate_id must be core-course-v1")
    if document.get("status") != "candidate":
        errors.append("fixture status must remain candidate")
    if document.get("run_status") != "not_run":
        errors.append("fixture run_status must remain not_run")
    for field in ("fixture_revision", "platform_scope", "source_boundary", "claim_boundary"):
        if not non_empty_string(document.get(field)):
            errors.append(f"fixture {field} must be non-empty")
    cases = document.get("cases")
    if not isinstance(cases, list) or len(cases) < len(EXPECTED_OUTCOMES):
        errors.append("fixture cases must contain at least one case per outcome")
        cases = cases if isinstance(cases, list) else []
    ids: set[str] = set()
    case_types: set[str] = set()
    covered_outcomes: set[str] = set()
    for index, case in enumerate(cases, start=1):
        label = f"cases[{index}]"
        if not isinstance(case, dict):
            errors.append(f"{label} must be an object")
            continue
        case_id = case.get("id")
        if not non_empty_string(case_id):
            errors.append(f"{label}.id must be non-empty")
        elif case_id in ids:
            errors.append(f"duplicate fixture case id: {case_id}")
        else:
            ids.add(case_id)
        outcome = case.get("outcome")
        if outcome not in EXPECTED_OUTCOMES:
            errors.append(f"{label}.outcome is not a core outcome")
        else:
            covered_outcomes.add(outcome)
        case_type = case.get("case_type")
        if case_type not in EXPECTED_CASE_TYPES:
            errors.append(f"{label}.case_type must be correct, boundary, or failure")
        else:
            case_types.add(case_type)
        for field in ("prompt", "learner_artifact", "forbidden_conclusion"):
            if not non_empty_string(case.get(field)):
                errors.append(f"{label}.{field} must be non-empty")
        observations = case.get("expected_observations")
        if not isinstance(observations, list) or not observations or not all(non_empty_string(item) for item in observations):
            errors.append(f"{label}.expected_observations must be a non-empty string list")
    if covered_outcomes != set(EXPECTED_OUTCOMES):
        errors.append("fixture cases must cover all five outcomes")
    if case_types != EXPECTED_CASE_TYPES:
        errors.append("fixture cases must include correct, boundary, and failure types")
    required_fields = document.get("required_run_fields")
    required = {"fixture_revision", "first_artifact", "rubric_scores", "reviewers", "disagreements", "limits"}
    if not isinstance(required_fields, list) or not required.issubset(set(required_fields)):
        errors.append("fixture required_run_fields is incomplete")
    return errors


def validate_run_record_template(
    document: dict[str, Any], fixture: dict[str, Any]
) -> list[str]:
    """Validate the blank record that a future authorized run would fill.

    The template is deliberately checked separately from the synthetic fixture:
    a fixture can describe the fields a run needs while a malformed template
    silently omits them or carries accidental result data.
    """

    errors: list[str] = []
    if document.get("candidate_id") != "core-course-v1":
        errors.append("run record candidate_id must be core-course-v1")
    if document.get("candidate_id") != fixture.get("candidate_id"):
        errors.append("run record candidate_id must match fixture candidate_id")
    if document.get("fixture_revision") != fixture.get("fixture_revision"):
        errors.append("run record fixture_revision must match fixture fixture_revision")
    if document.get("run_status") != "not_run":
        errors.append("run record run_status must remain not_run")

    missing_fields = EXPECTED_RUN_RECORD_FIELDS.difference(document)
    if missing_fields:
        errors.append(
            "run record is missing fields: " + ", ".join(sorted(missing_fields))
        )

    required_fields = fixture.get("required_run_fields")
    if isinstance(required_fields, list):
        missing_required = {
            field for field in required_fields if isinstance(field, str) and field not in document
        }
        if missing_required:
            errors.append(
                "run record is missing fixture required fields: "
                + ", ".join(sorted(missing_required))
            )

    rubric_scores = document.get("rubric_scores")
    if not isinstance(rubric_scores, dict):
        errors.append("run record rubric_scores must be an object")
    else:
        if set(rubric_scores) != set(EXPECTED_OUTCOMES):
            errors.append("run record rubric_scores must cover the five outcomes exactly")
        if any(value is not None for value in rubric_scores.values()):
            errors.append("blank run record rubric_scores must contain only null values")

    blank_strings = (
        "model_and_surface",
        "task_and_context",
        "first_artifact",
        "help_disclosure",
        "limits",
    )
    for field in blank_strings:
        if document.get(field) != "":
            errors.append(f"blank run record {field} must be an empty string")

    blank_lists = ("allowed_aids", "reviewers", "disagreements")
    for field in blank_lists:
        if document.get(field) != []:
            errors.append(f"blank run record {field} must be an empty list")
    if document.get("claim_status") != "not_observed":
        errors.append("blank run record claim_status must be not_observed")
    return errors


def main() -> int:
    errors: list[str] = []
    try:
        course = load_json(COURSE_PATH)
        rubric = load_json(RUBRIC_PATH)
        fixture = load_json(FIXTURE_PATH)
        run_record_template = load_json(RUN_RECORD_TEMPLATE_PATH)
        errors.extend(validate_course(course))
        errors.extend(validate_rubric(rubric))
        errors.extend(validate_fixture(fixture))
        errors.extend(validate_run_record_template(run_record_template, fixture))
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors.append(str(exc))
    if errors:
        print("CORE_COURSE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("CORE_COURSE_OK units=5 outcomes=5 status=candidate run_status=not_run")
    print("evidence_boundary=static-contract-only")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
