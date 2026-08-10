"""Validate the machine-readable impact map for volatile Codex facts."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "docs/governance/fact-impact-registry.yaml"
EVAL_TASK_SET = ROOT / "evals/task-set-v1.yaml"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
CLAIM_HEADING_RE = re.compile(r"(?m)^###[ \t]+((?:OF|UF|LB)-[0-9]+)[^\r\n]*$")
CHAPTER_REF_RE = re.compile(r"第\s*(\d+)\s*章")
FIELD_RE = re.compile(r"(?m)^([a-z_]+):\s*\"([^\"]*)\"\s*$")
RECHECK_LEVELS = {"source-only", "static-review", "fresh-context", "runtime"}
CLAIM_STATUSES = {"current", "stale", "disputed", "removed"}


def parse_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def parse_task_ids(path: Path, errors: list[str]) -> set[str]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        errors.append(f"cannot parse {path.relative_to(ROOT)}: {exc}")
        return set()
    if not isinstance(value, dict) or not isinstance(value.get("tasks"), list):
        errors.append(f"{path.relative_to(ROOT)} must contain a tasks list")
        return set()
    task_ids: set[str] = set()
    for index, task in enumerate(value["tasks"], start=1):
        if not isinstance(task, dict) or not isinstance(task.get("id"), str):
            errors.append(f"{path.relative_to(ROOT)} tasks[{index}] must have a string id")
            continue
        task_ids.add(task["id"])
    return task_ids


def extract_claims(path: Path) -> dict[str, dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    matches = list(CLAIM_HEADING_RE.finditer(text))
    claims: dict[str, dict[str, Any]] = {}
    for index, match in enumerate(matches):
        claim_id = match.group(1)
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        block = text[match.end() : end]
        fields = {key: value for key, value in FIELD_RE.findall(block)}
        refs_match = re.search(r"(?m)^chapter_refs:\s*\[(.*?)\]\s*$", block)
        chapter_refs = CHAPTER_REF_RE.findall(refs_match.group(1)) if refs_match else []
        claims[claim_id] = {
            "claim_id": claim_id,
            "block": block,
            "fields": fields,
            "chapter_refs": chapter_refs,
        }
    return claims


def existing_path(relative: Any, label: str, errors: list[str]) -> None:
    if not isinstance(relative, str) or not relative.strip():
        errors.append(f"{label}: path must be a non-empty string")
        return
    if not (ROOT / relative).exists():
        errors.append(f"{label}: path does not exist: {relative}")


def validate_path_list(
    value: Any, label: str, errors: list[str], *, minimum: int = 1
) -> None:
    if not isinstance(value, list) or len(value) < minimum:
        errors.append(f"{label} must contain at least {minimum} paths")
        return
    if not all(isinstance(item, str) and item.strip() for item in value):
        errors.append(f"{label} must contain only non-empty path strings")
        return
    for index, item in enumerate(value, start=1):
        existing_path(item, f"{label}[{index}]", errors)


def validate_task_list(
    value: Any, label: str, task_ids: set[str], errors: list[str]
) -> None:
    if not isinstance(value, list) or not value:
        errors.append(f"{label} must be a non-empty list")
        return
    if not all(isinstance(item, str) and item.strip() for item in value):
        errors.append(f"{label} must contain only non-empty strings")
        return
    for task_id in value:
        if task_id not in task_ids:
            errors.append(f"{label} references unknown evaluation task: {task_id}")


def main() -> int:
    errors: list[str] = []
    try:
        registry = parse_json(REGISTRY)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("FACT_IMPACT_REGISTRY_FAILED")
        print(f"- cannot parse {REGISTRY.relative_to(ROOT)}: {exc}")
        return 1

    if registry.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    generated_at = registry.get("generated_at")
    if not isinstance(generated_at, str) or not DATE_RE.fullmatch(generated_at):
        errors.append("generated_at must use YYYY-MM-DD")
        generated_date = None
    else:
        generated_date = date.fromisoformat(generated_at)

    source_records = registry.get("source_records")
    if not isinstance(source_records, list) or not source_records:
        errors.append("source_records must be a non-empty list")
        source_records = []

    source_by_id: dict[str, dict[str, Any]] = {}
    canonical_sources: list[dict[str, Any]] = []
    for index, source in enumerate(source_records, start=1):
        label = f"source_records[{index}]"
        if not isinstance(source, dict):
            errors.append(f"{label}: record must be an object")
            continue
        source_id = source.get("id")
        if not isinstance(source_id, str) or not source_id:
            errors.append(f"{label}: id must be a non-empty string")
            continue
        if source_id in source_by_id:
            errors.append(f"{label}: duplicate id {source_id}")
        source_by_id[source_id] = source
        path = source.get("path")
        existing_path(path, f"{label}.path", errors)
        for date_field in ("checked_at", "next_review"):
            if source.get(date_field) and not DATE_RE.fullmatch(str(source[date_field])):
                errors.append(f"{label}: {date_field} must use YYYY-MM-DD")
        if source.get("next_review") and not DATE_RE.fullmatch(str(source["next_review"])):
            errors.append(f"{label}: next_review must use YYYY-MM-DD")
        if source.get("canonical_claim_inventory") is True:
            canonical_sources.append(source)

    if len(canonical_sources) != 1:
        errors.append("exactly one source record must be canonical_claim_inventory")
        canonical_claims: dict[str, dict[str, Any]] = {}
    else:
        canonical_path = ROOT / str(canonical_sources[0].get("path", ""))
        if canonical_path.is_file():
            try:
                canonical_claims = extract_claims(canonical_path)
            except (OSError, UnicodeError) as exc:
                errors.append(f"cannot read canonical source: {exc}")
                canonical_claims = {}
        else:
            canonical_claims = {}

    impact_groups = registry.get("impact_groups")
    if not isinstance(impact_groups, list) or not impact_groups:
        errors.append("impact_groups must be a non-empty list")
        impact_groups = []
    task_ids = parse_task_ids(EVAL_TASK_SET, errors)
    groups_by_id: dict[str, dict[str, Any]] = {}
    for index, group in enumerate(impact_groups, start=1):
        label = f"impact_groups[{index}]"
        if not isinstance(group, dict):
            errors.append(f"{label}: record must be an object")
            continue
        group_id = group.get("id")
        if not isinstance(group_id, str) or not group_id:
            errors.append(f"{label}: id must be a non-empty string")
            continue
        if group_id in groups_by_id:
            errors.append(f"{label}: duplicate id {group_id}")
        groups_by_id[group_id] = group
        validate_path_list(group.get("affected_artifacts"), f"{label}.affected_artifacts", errors, minimum=2)
        validate_path_list(group.get("affected_labs"), f"{label}.affected_labs", errors)
        validate_path_list(group.get("affected_skills"), f"{label}.affected_skills", errors)
        validate_path_list(group.get("affected_site_paths"), f"{label}.affected_site_paths", errors)
        validate_task_list(group.get("affected_evaluation_tasks"), f"{label}.affected_evaluation_tasks", task_ids, errors)
        checks = group.get("required_checks")
        if not isinstance(checks, list) or not checks or not all(isinstance(item, str) and item for item in checks):
            errors.append(f"{label}: required_checks must be a non-empty list of strings")
        if group.get("recheck_level") not in RECHECK_LEVELS:
            errors.append(f"{label}: recheck_level must be one of {sorted(RECHECK_LEVELS)}")

    claims = registry.get("claims")
    if not isinstance(claims, list) or not claims:
        errors.append("claims must be a non-empty list")
        claims = []

    registry_claim_ids: set[str] = set()
    for index, record in enumerate(claims, start=1):
        label = f"claims[{index}]"
        if not isinstance(record, dict):
            errors.append(f"{label}: record must be an object")
            continue
        claim_id = record.get("claim_id")
        if not isinstance(claim_id, str) or not claim_id:
            errors.append(f"{label}: claim_id must be a non-empty string")
            continue
        if claim_id in registry_claim_ids:
            errors.append(f"{label}: duplicate claim_id {claim_id}")
        registry_claim_ids.add(claim_id)
        if claim_id not in canonical_claims:
            errors.append(f"{label}: claim_id not found in canonical source: {claim_id}")
        if record.get("fact_type") not in {"official_fact", "unconfirmed", "local_unreproduced_boundary"}:
            errors.append(f"{label}: fact_type is not a controlled value")
        source_id = record.get("source_record")
        if source_id not in source_by_id:
            errors.append(f"{label}: unknown source_record: {source_id}")
        if record.get("source_anchor") != claim_id:
            errors.append(f"{label}: source_anchor must equal claim_id")
        if not isinstance(record.get("official_url"), str) or not record["official_url"].startswith("https://"):
            errors.append(f"{label}: official_url must be an HTTPS URL")
        for date_field in ("checked_at", "next_review"):
            if not isinstance(record.get(date_field), str) or not DATE_RE.fullmatch(record[date_field]):
                errors.append(f"{label}: {date_field} must use YYYY-MM-DD")
        if record.get("claim_status") not in CLAIM_STATUSES:
            errors.append(f"{label}: claim_status is not a controlled value")
        if record.get("recheck_level") not in RECHECK_LEVELS:
            errors.append(f"{label}: recheck_level must be one of {sorted(RECHECK_LEVELS)}")
        validate_path_list(record.get("affected_chapters"), f"{label}.affected_chapters", errors)
        validate_path_list(record.get("affected_labs"), f"{label}.affected_labs", errors)
        validate_path_list(record.get("affected_skills"), f"{label}.affected_skills", errors)
        validate_task_list(record.get("affected_evaluation_tasks"), f"{label}.affected_evaluation_tasks", task_ids, errors)
        validate_path_list(record.get("affected_site_paths"), f"{label}.affected_site_paths", errors)
        impact_group_ids = record.get("impact_groups")
        if not isinstance(impact_group_ids, list) or not impact_group_ids:
            errors.append(f"{label}: impact_groups must be a non-empty list")
            impact_group_ids = []
        groups = []
        for group_id in impact_group_ids:
            group = groups_by_id.get(group_id)
            if group is None:
                errors.append(f"{label}: unknown impact_group: {group_id}")
            else:
                groups.append(group)
        review_record = record.get("review_record")
        existing_path(review_record, f"{label}.review_record", errors)
        if not groups or claim_id not in canonical_claims:
            continue
        source_fields = canonical_claims[claim_id]["fields"]
        if record.get("fact_type") != source_fields.get("evidence_class"):
            errors.append(f"{label}: fact_type does not match canonical evidence_class")
        if record.get("official_url") != source_fields.get("official_url"):
            errors.append(f"{label}: official_url does not match canonical source")
        if record.get("checked_at") != source_fields.get("checked_at"):
            errors.append(f"{label}: checked_at does not match canonical source")
        if record.get("claim_status") != source_fields.get("claim_status"):
            errors.append(f"{label}: claim_status does not match canonical source")
        source_next_review = source_fields.get("next_review")
        if record.get("next_review") != source_next_review:
            errors.append(f"{label}: next_review does not match canonical source")
        if generated_date and source_next_review and DATE_RE.fullmatch(source_next_review):
            if date.fromisoformat(source_next_review) <= generated_date:
                errors.append(f"{label}: next_review is not after generated_at")
        chapter_refs = canonical_claims[claim_id]["chapter_refs"]
        artifacts = [
            artifact
            for group in groups
            for artifact in group.get("affected_artifacts", [])
        ]
        for chapter_number in chapter_refs:
            prefix = f"book/chapters/{int(chapter_number):02d}-"
            if not any(isinstance(path, str) and path.startswith(prefix) for path in artifacts):
                errors.append(f"{label}: impact group misses chapter reference 第{chapter_number}章")
        affected_chapters = record.get("affected_chapters", [])
        for chapter_number in chapter_refs:
            chapter_path = next(
                (path for path in affected_chapters if isinstance(path, str) and path.startswith(f"book/chapters/{int(chapter_number):02d}-")),
                None,
            )
            if chapter_path is None:
                errors.append(f"{label}: affected_chapters misses chapter reference 第{chapter_number}章")

    missing_claims = set(canonical_claims) - registry_claim_ids
    for claim_id in sorted(missing_claims):
        errors.append(f"canonical source claim is missing from registry: {claim_id}")
    extra_claims = registry_claim_ids - set(canonical_claims)
    for claim_id in sorted(extra_claims):
        errors.append(f"registry claim is missing from canonical source: {claim_id}")

    if errors:
        print("FACT_IMPACT_REGISTRY_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "FACT_IMPACT_REGISTRY_OK "
        f"claims={len(registry_claim_ids)} sources={len(source_by_id)} groups={len(groups_by_id)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
