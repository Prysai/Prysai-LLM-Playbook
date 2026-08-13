"""Validate the machine-readable gold-content admission contract and records."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
CONTRACT_PATH = ROOT / "docs/governance/gold-content-admission.yaml"
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path} must contain an object")
    return value


def non_empty(value: Any) -> bool:
    if isinstance(value, str):
        return bool(value.strip())
    if isinstance(value, list):
        return bool(value) and all(non_empty(item) for item in value)
    return value is not None


def valid_date(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def validate_contract(contract: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    for field in ("status", "owner", "purpose", "admission_rule", "claim_boundary"):
        if not non_empty(contract.get(field)):
            errors.append(f"contract field {field} must be non-empty")
    for field in ("reviewed_at", "next_review"):
        if not valid_date(contract.get(field)):
            errors.append(f"contract field {field} must use YYYY-MM-DD")

    list_fields = (
        "record_statuses",
        "families",
        "audiences",
        "platform_scopes",
        "required_record_fields",
    )
    for field in list_fields:
        values = contract.get(field)
        if not isinstance(values, list) or not values or any(not non_empty(item) for item in values):
            errors.append(f"contract field {field} must be a non-empty list")
        elif len(values) != len(set(values)):
            errors.append(f"contract field {field} contains duplicates")

    family_requirements = contract.get("family_requirements")
    if not isinstance(family_requirements, dict):
        errors.append("family_requirements must be an object")
        family_requirements = {}
    families = contract.get("families", [])
    if set(family_requirements) != set(families):
        errors.append("family_requirements must cover every family exactly")
    for family, fields in family_requirements.items():
        if not isinstance(fields, list) or not fields or any(not non_empty(item) for item in fields):
            errors.append(f"family_requirements.{family} must be a non-empty list")

    hard_gates = contract.get("hard_gates")
    gate_ids: list[str] = []
    if not isinstance(hard_gates, list) or not hard_gates:
        errors.append("hard_gates must be a non-empty list")
    else:
        for index, gate in enumerate(hard_gates, start=1):
            if not isinstance(gate, dict):
                errors.append(f"hard_gates[{index}] must be an object")
                continue
            gate_id = gate.get("id")
            if not isinstance(gate_id, str) or not ID_RE.fullmatch(gate_id):
                errors.append(f"hard_gates[{index}].id must be kebab-case")
            else:
                gate_ids.append(gate_id)
            for field in ("question", "reject_when"):
                if not non_empty(gate.get(field)):
                    errors.append(f"hard_gates[{index}].{field} must be non-empty")
    if len(gate_ids) != len(set(gate_ids)):
        errors.append("hard gate ids must be unique")

    policy = contract.get("score_policy")
    if not isinstance(policy, dict):
        errors.append("score_policy must be an object")
    else:
        minimum = policy.get("minimum_total")
        lower = policy.get("minimum_each")
        upper = policy.get("maximum_each")
        if not all(isinstance(value, int) for value in (minimum, lower, upper)):
            errors.append("score policy bounds must be integers")
        elif lower < 0 or upper <= lower or minimum <= 0:
            errors.append("score policy bounds are invalid")
        dimensions = policy.get("dimensions")
        dimension_ids: list[str] = []
        if not isinstance(dimensions, list) or not dimensions:
            errors.append("score dimensions must be a non-empty list")
        else:
            for index, dimension in enumerate(dimensions, start=1):
                if not isinstance(dimension, dict):
                    errors.append(f"score dimension {index} must be an object")
                    continue
                dimension_id = dimension.get("id")
                if not isinstance(dimension_id, str) or not ID_RE.fullmatch(dimension_id):
                    errors.append(f"score dimension {index} id must be kebab-case")
                else:
                    dimension_ids.append(dimension_id)
                if not non_empty(dimension.get("question")):
                    errors.append(f"score dimension {index} question must be non-empty")
            if len(dimension_ids) != len(set(dimension_ids)):
                errors.append("score dimension ids must be unique")
            if isinstance(minimum, int) and isinstance(upper, int) and minimum > len(dimensions) * upper:
                errors.append("minimum_total exceeds the maximum possible score")

    admissions = contract.get("admissions")
    if not isinstance(admissions, list):
        errors.append("admissions must be a list")
    return errors


def validate_record(record: dict[str, Any], contract: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    required = contract["required_record_fields"]
    for field in required:
        if field not in record:
            errors.append(f"missing required field: {field}")
        elif not non_empty(record[field]):
            errors.append(f"required field {field} must be non-empty")

    content_id = record.get("content_id")
    if isinstance(content_id, str) and not ID_RE.fullmatch(content_id):
        errors.append("content_id must be kebab-case")
    family = record.get("family")
    if family not in contract["families"]:
        errors.append(f"family must be one of: {', '.join(contract['families'])}")
    status = record.get("status")
    if status not in contract["record_statuses"]:
        errors.append(f"status must be one of: {', '.join(contract['record_statuses'])}")
    platform_scope = record.get("platform_scope")
    if platform_scope not in contract["platform_scopes"]:
        errors.append(f"platform_scope must be one of: {', '.join(contract['platform_scopes'])}")
    audiences = record.get("audiences")
    if isinstance(audiences, list):
        unknown = sorted(set(audiences) - set(contract["audiences"]))
        if unknown:
            errors.append(f"unknown audiences: {', '.join(unknown)}")
    for field in ("reviewed_at", "next_review"):
        if field in record and not valid_date(record[field]):
            errors.append(f"{field} must use YYYY-MM-DD")

    if family in contract["family_requirements"]:
        for field in contract["family_requirements"][family]:
            if not non_empty(record.get(field)):
                errors.append(f"family field {field} must be non-empty")

    if platform_scope == "platform-specific" and not non_empty(record.get("platform_delta")):
        errors.append("platform-specific records require a non-empty platform_delta")
    if family == "platform-adapter":
        urls = record.get("authoritative_urls")
        if isinstance(urls, list):
            for url in urls:
                parsed = urlparse(url) if isinstance(url, str) else None
                if parsed is None or parsed.scheme != "https" or not parsed.netloc:
                    errors.append(f"authoritative URL must use HTTPS: {url}")

    gates = record.get("hard_gates")
    expected_gate_ids = [item["id"] for item in contract["hard_gates"]]
    if isinstance(gates, dict):
        missing = sorted(set(expected_gate_ids) - set(gates))
        extra = sorted(set(gates) - set(expected_gate_ids))
        for gate_id in missing:
            errors.append(f"missing hard gate: {gate_id}")
        for gate_id in extra:
            errors.append(f"unknown hard gate: {gate_id}")
        for gate_id in expected_gate_ids:
            review = gates.get(gate_id)
            if not isinstance(review, dict):
                errors.append(f"hard gate {gate_id} must contain result and evidence")
                continue
            result = review.get("result")
            if result not in {"pass", "fail", "not-reviewed"}:
                errors.append(f"hard gate {gate_id} has invalid result: {result}")
            if not non_empty(review.get("evidence")):
                errors.append(f"hard gate {gate_id} must include an evidence note")
            if status == "admitted-candidate" and result != "pass":
                errors.append(f"hard gate {gate_id} must pass")

    scores = record.get("scores")
    policy = contract["score_policy"]
    expected_dimensions = [item["id"] for item in policy["dimensions"]]
    if isinstance(scores, dict):
        missing = sorted(set(expected_dimensions) - set(scores))
        extra = sorted(set(scores) - set(expected_dimensions))
        for dimension_id in missing:
            errors.append(f"missing score: {dimension_id}")
        for dimension_id in extra:
            errors.append(f"unknown score: {dimension_id}")
        total = 0
        score_shape_valid = not missing and not extra
        for dimension_id in expected_dimensions:
            score = scores.get(dimension_id)
            if not isinstance(score, dict):
                errors.append(f"score {dimension_id} must contain value and rationale")
                score_shape_valid = False
                continue
            value = score.get("value")
            if not isinstance(value, int) or isinstance(value, bool):
                errors.append(f"score {dimension_id} value must be an integer")
                score_shape_valid = False
                continue
            if not non_empty(score.get("rationale")):
                errors.append(f"score {dimension_id} must include a rationale")
                score_shape_valid = False
            if value < policy["minimum_each"] or value > policy["maximum_each"]:
                errors.append(
                    f"score {dimension_id} must be between {policy['minimum_each']} and {policy['maximum_each']}"
                )
                score_shape_valid = False
            total += value
        if status == "admitted-candidate" and score_shape_valid and total < policy["minimum_total"]:
            errors.append(f"score total {total} is below admission threshold {policy['minimum_total']}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--record", help="Validate one proposed admission record instead of checked-in admissions.")
    args = parser.parse_args()
    try:
        contract = load_object(CONTRACT_PATH)
        errors = validate_contract(contract)
        records: list[dict[str, Any]]
        label: str
        if args.record:
            records = [load_object(Path(args.record))]
            label = args.record
        else:
            records = contract.get("admissions", []) if isinstance(contract.get("admissions"), list) else []
            label = str(CONTRACT_PATH.relative_to(ROOT))
        seen: set[str] = set()
        for index, record in enumerate(records, start=1):
            if not isinstance(record, dict):
                errors.append(f"record {index} must be an object")
                continue
            content_id = record.get("content_id")
            if isinstance(content_id, str) and content_id in seen:
                errors.append(f"duplicate admission content_id: {content_id}")
            elif isinstance(content_id, str):
                seen.add(content_id)
            errors.extend(validate_record(record, contract))
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("GOLD_CONTENT_ADMISSION_FAILED")
        print(f"- {exc}")
        return 1

    if errors:
        print("GOLD_CONTENT_ADMISSION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        "GOLD_CONTENT_ADMISSION_OK "
        f"source={label} records={len(records)} "
        f"hard_gates={len(contract['hard_gates'])} "
        f"score_dimensions={len(contract['score_policy']['dimensions'])}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
