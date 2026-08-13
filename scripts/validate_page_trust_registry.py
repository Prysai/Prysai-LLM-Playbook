"""Validate complete page-level trust coverage for canonical English chapters."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "docs/governance/page-trust-registry.yaml"
CONTENT_STATUS = ROOT / "docs/governance/content-status.yaml"
CORE_UNIT_MAP = ROOT / "docs/governance/core-unit-map.yaml"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
CONTENT_ID_RE = re.compile(r"<!--\s*content_id:\s*([^|\s]+)")
STATUSES = {"draft", "candidate", "verified", "production-ready"}
FACT_RISKS = {"stable_concept", "volatile_product", "mixed"}
CURRICULUM_SCOPES = {"universal_core", "platform_adapter", "domain_application", "mixed"}
SOURCE_KINDS = {
    "project_record",
    "authoritative_platform",
    "community_report",
    "independent_reference",
}
EVIDENCE_ROLES = {
    "canonical_provenance",
    "official_fact",
    "field_signal",
    "design_reference",
}


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def chapter_status_by_path(document: dict[str, Any]) -> dict[str, str]:
    return {
        item["path"]: item["status"]
        for item in document.get("chapters", {}).get("items", [])
        if isinstance(item, dict)
        and isinstance(item.get("path"), str)
        and isinstance(item.get("status"), str)
    }


def require_text(record: dict[str, Any], key: str, label: str, errors: list[str]) -> str | None:
    value = record.get(key)
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label}: {key} must be a non-empty string")
        return None
    return value


def parse_date(value: Any, label: str, errors: list[str]) -> date | None:
    if not isinstance(value, str) or not DATE_RE.fullmatch(value):
        errors.append(f"{label} must use YYYY-MM-DD")
        return None
    return date.fromisoformat(value)


def core_ownership_by_path(core_map: dict[str, Any]) -> dict[str, set[str]]:
    ownership: dict[str, set[str]] = {}
    for unit in core_map.get("units", []):
        if not isinstance(unit, dict):
            continue
        owner_path = unit.get("owner_path")
        unit_id = unit.get("id")
        if isinstance(owner_path, str) and isinstance(unit_id, str):
            ownership.setdefault(owner_path, set()).add(unit_id)
    return ownership


def validate_document(
    registry: dict[str, Any],
    content_status: dict[str, Any],
    core_map: dict[str, Any] | None = None,
) -> list[str]:
    errors: list[str] = []
    if core_map is None:
        core_map = load_object(CORE_UNIT_MAP)
    expected_core_ownership = core_ownership_by_path(core_map)
    if registry.get("schema_version") != "2":
        errors.append("schema_version must be '2'")
    generated_at = parse_date(registry.get("generated_at"), "generated_at", errors)
    if registry.get("status") != "candidate":
        errors.append("status must remain candidate; schema coverage is not content verification")
    coverage = registry.get("coverage")
    if not isinstance(coverage, dict):
        errors.append("coverage must be an object")
        coverage = {}
    if coverage.get("kind") != "canonical_english_complete":
        errors.append("coverage.kind must be canonical_english_complete")
    canonical_statuses = chapter_status_by_path(content_status)
    canonical_paths = set(canonical_statuses)
    if coverage.get("canonical_english_chapters") != len(canonical_paths):
        errors.append("coverage.canonical_english_chapters must equal the canonical chapter count")
    if coverage.get("registered_pages") != len(canonical_paths):
        errors.append("coverage.registered_pages must equal the canonical chapter count")
    require_text(coverage, "claim_boundary", "coverage", errors)

    records = registry.get("records")
    if not isinstance(records, list) or not records:
        errors.append("records must be a non-empty list")
        return errors
    if coverage.get("registered_pages") != len(records):
        errors.append("coverage.registered_pages must equal the record count")

    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    for index, record in enumerate(records, start=1):
        label = f"records[{index}]"
        if not isinstance(record, dict):
            errors.append(f"{label} must be an object")
            continue
        content_id = require_text(record, "content_id", label, errors)
        path_value = require_text(record, "canonical_path", label, errors)
        if content_id:
            if content_id in seen_ids:
                errors.append(f"{label}: duplicate content_id {content_id}")
            seen_ids.add(content_id)
        if path_value:
            if path_value in seen_paths:
                errors.append(f"{label}: duplicate canonical_path {path_value}")
            seen_paths.add(path_value)
            if not path_value.startswith("book/chapters/") or not path_value.endswith("-EN.md"):
                errors.append(f"{label}: canonical_path must be an English chapter source")
            target = ROOT / path_value
            if not target.is_file():
                errors.append(f"{label}: canonical_path does not exist: {path_value}")
            else:
                match = CONTENT_ID_RE.search(target.read_text(encoding="utf-8"))
                if not match or match.group(1) != content_id:
                    errors.append(f"{label}: content_id does not match the source identity comment")
            declared_status = record.get("content_status")
            if canonical_statuses.get(path_value) != declared_status:
                errors.append(f"{label}: content_status does not match content-status.yaml")
        if record.get("canonical_locale") != "en":
            errors.append(f"{label}: canonical_locale must be en for canonical English coverage")
        if record.get("content_status") not in STATUSES:
            errors.append(f"{label}: content_status is not controlled")
        if record.get("fact_risk") not in FACT_RISKS:
            errors.append(f"{label}: fact_risk is not controlled")
        curriculum_scope = record.get("curriculum_scope")
        if curriculum_scope not in CURRICULUM_SCOPES:
            errors.append(f"{label}: curriculum_scope is not controlled")
        declared_units = record.get("owned_core_units")
        if declared_units is None:
            declared_unit_set: set[str] = set()
        elif not isinstance(declared_units, list) or not all(
            isinstance(item, str) and item.strip() for item in declared_units
        ) or len(declared_units) != len(set(declared_units)):
            errors.append(f"{label}: owned_core_units must be a unique string list")
            declared_unit_set = set()
        else:
            declared_unit_set = set(declared_units)
        expected_units = expected_core_ownership.get(path_value or "", set())
        if declared_unit_set != expected_units:
            errors.append(
                f"{label}: owned_core_units must exactly match core-unit-map ownership; "
                f"expected={sorted(expected_units)}"
            )
        if expected_units and curriculum_scope == "mixed" and record.get("content_status") in {
            "verified", "production-ready"
        }:
            errors.append(
                f"{label}: a mixed page owning a core range cannot be promoted wholesale"
            )
        platforms = record.get("platforms")
        if not isinstance(platforms, list) or not platforms or not all(
            isinstance(item, str) and item.strip() for item in platforms
        ):
            errors.append(f"{label}: platforms must be a non-empty string list")
            platforms = []
        if curriculum_scope == "universal_core" and platforms != ["universal"]:
            errors.append(f"{label}: universal_core must use only the universal platform")
        if curriculum_scope == "platform_adapter" and not any(
            item != "universal" for item in platforms
        ):
            errors.append(f"{label}: platform_adapter must name a concrete platform")
        concepts = record.get("core_concepts")
        if not isinstance(concepts, list) or not concepts or not all(
            isinstance(item, str) and item.strip() for item in concepts
        ):
            errors.append(f"{label}: core_concepts must be a non-empty string list")
        for key in ("applies_to", "owner", "reuse_boundary"):
            require_text(record, key, label, errors)
        reviewed = parse_date(record.get("reviewed_at"), f"{label}.reviewed_at", errors)
        next_review = parse_date(record.get("next_review"), f"{label}.next_review", errors)
        if reviewed and next_review and next_review <= reviewed:
            errors.append(f"{label}: next_review must be after reviewed_at")
        if generated_at and next_review and next_review <= generated_at:
            errors.append(f"{label}: next_review must be after generated_at")
        limitations = record.get("known_limitations")
        if not isinstance(limitations, list) or not limitations or not all(
            isinstance(item, str) and item.strip() for item in limitations
        ):
            errors.append(f"{label}: known_limitations must be a non-empty string list")
        sources = record.get("sources")
        if not isinstance(sources, list) or not sources:
            errors.append(f"{label}: sources must be a non-empty list")
            continue
        concrete_platforms = {item for item in platforms if item != "universal"}
        authoritative_source_count = 0
        authoritative_platforms: set[str] = set()
        for source_index, source in enumerate(sources, start=1):
            source_label = f"{label}.sources[{source_index}]"
            if not isinstance(source, dict):
                errors.append(f"{source_label} must be an object")
                continue
            kind = source.get("kind")
            if kind not in SOURCE_KINDS:
                errors.append(f"{source_label}: kind is not controlled")
            evidence_role = source.get("evidence_role")
            if evidence_role not in EVIDENCE_ROLES:
                errors.append(f"{source_label}: evidence_role is not controlled")
            for key in ("role", "license_boundary"):
                require_text(source, key, source_label, errors)
            if kind == "project_record":
                path = require_text(source, "path", source_label, errors)
                if "url" in source or "accessed_at" in source:
                    errors.append(f"{source_label}: project_record must use path, not url/accessed_at")
                if path:
                    target = ROOT / path
                    if target.resolve() == ROOT or ROOT not in target.resolve().parents:
                        errors.append(f"{source_label}: path must stay inside the repository")
                    elif not target.is_file():
                        errors.append(f"{source_label}: project record does not exist: {path}")
                if evidence_role != "canonical_provenance":
                    errors.append(f"{source_label}: project_record must be canonical_provenance")
                continue
            url = require_text(source, "url", source_label, errors)
            parse_date(source.get("accessed_at"), f"{source_label}.accessed_at", errors)
            if kind == "authoritative_platform":
                authoritative_source_count += 1
                source_platforms = source.get("platforms")
                source_platform = source.get("platform")
                if isinstance(source_platform, str) and source_platform.strip():
                    source_platforms = [source_platform]
                if isinstance(source_platforms, list) and source_platforms and all(
                    isinstance(item, str) and item.strip() for item in source_platforms
                ):
                    authoritative_platforms.update(source_platforms)
                elif len(concrete_platforms) == 1:
                    authoritative_platforms.update(concrete_platforms)
                else:
                    errors.append(
                        f"{source_label}: multi-platform records require explicit platform or platforms coverage"
                    )
                if evidence_role != "official_fact":
                    errors.append(f"{source_label}: authoritative_platform must be official_fact")
            if kind == "community_report":
                if evidence_role != "field_signal":
                    errors.append(f"{source_label}: community_report must be field_signal")
                if source.get("reproduction_status") not in {"not_run", "partially_reproduced", "reproduced"}:
                    errors.append(f"{source_label}: community_report requires controlled reproduction_status")
                if source.get("root_cause_status") not in {"unknown", "project_hypothesis", "officially_confirmed"}:
                    errors.append(f"{source_label}: community_report requires controlled root_cause_status")
            if url:
                parsed = urlparse(url)
                if parsed.scheme != "https" or not parsed.netloc:
                    errors.append(f"{source_label}: url must be an absolute HTTPS URL")
                if parsed.netloc == "github.com" and "/blob/" in parsed.path:
                    revision = parsed.path.split("/blob/", 1)[1].split("/", 1)[0]
                    if not re.fullmatch(r"[0-9a-f]{40}", revision):
                        errors.append(f"{source_label}: GitHub blob URL must pin a 40-character commit")
        if record.get("fact_risk") in {"volatile_product", "mixed"} and not authoritative_source_count:
            errors.append(f"{label}: volatile_product and mixed records require an authoritative_platform HTTPS source")
        if curriculum_scope == "platform_adapter" and not authoritative_source_count:
            errors.append(f"{label}: platform_adapter requires an authoritative_platform source")
        missing_platform_support = concrete_platforms - authoritative_platforms
        if missing_platform_support:
            errors.append(
                f"{label}: every concrete platform needs a matching authoritative_platform source: "
                f"missing={sorted(missing_platform_support)}"
            )
    missing = sorted(canonical_paths - seen_paths)
    extra = sorted(seen_paths - canonical_paths)
    if missing:
        errors.append("registry is missing canonical chapters: " + ", ".join(missing))
    if extra:
        errors.append("registry contains non-canonical chapter paths: " + ", ".join(extra))
    return errors


def main() -> int:
    try:
        registry = load_object(REGISTRY)
        content_status = load_object(CONTENT_STATUS)
        core_map = load_object(CORE_UNIT_MAP)
        errors = validate_document(registry, content_status, core_map)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors = [str(exc)]
        registry = {"records": []}
    if errors:
        print("PAGE_TRUST_REGISTRY_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        "PAGE_TRUST_REGISTRY_OK "
        f"records={len(registry['records'])} coverage={registry['coverage']['kind']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
