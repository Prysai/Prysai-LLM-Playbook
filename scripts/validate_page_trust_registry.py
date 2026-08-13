"""Validate the bounded page-level trust and provenance pilot."""

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
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
CONTENT_ID_RE = re.compile(r"<!--\s*content_id:\s*([^|\s]+)")
STATUSES = {"draft", "candidate", "verified", "production-ready"}
FACT_RISKS = {"stable_concept", "volatile_product", "mixed"}


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


def validate_document(registry: dict[str, Any], content_status: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if registry.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    generated_at = parse_date(registry.get("generated_at"), "generated_at", errors)
    if registry.get("status") != "candidate":
        errors.append("status must remain candidate while coverage.kind is pilot")
    coverage = registry.get("coverage")
    if not isinstance(coverage, dict):
        errors.append("coverage must be an object")
        coverage = {}
    if coverage.get("kind") != "pilot":
        errors.append("coverage.kind must be pilot")
    if coverage.get("canonical_english_chapters") != 22:
        errors.append("coverage.canonical_english_chapters must be 22")
    require_text(coverage, "claim_boundary", "coverage", errors)

    records = registry.get("records")
    if not isinstance(records, list) or not records:
        errors.append("records must be a non-empty list")
        return errors
    if coverage.get("registered_pages") != len(records):
        errors.append("coverage.registered_pages must equal the record count")

    canonical_statuses = chapter_status_by_path(content_status)
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
            errors.append(f"{label}: canonical_locale must be en for this pilot")
        if record.get("content_status") not in STATUSES:
            errors.append(f"{label}: content_status is not controlled")
        if record.get("fact_risk") not in FACT_RISKS:
            errors.append(f"{label}: fact_risk is not controlled")
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
        for source_index, source in enumerate(sources, start=1):
            source_label = f"{label}.sources[{source_index}]"
            if not isinstance(source, dict):
                errors.append(f"{source_label} must be an object")
                continue
            url = require_text(source, "url", source_label, errors)
            for key in ("role", "license_boundary"):
                require_text(source, key, source_label, errors)
            parse_date(source.get("accessed_at"), f"{source_label}.accessed_at", errors)
            if url:
                parsed = urlparse(url)
                if parsed.scheme != "https" or not parsed.netloc:
                    errors.append(f"{source_label}: url must be an absolute HTTPS URL")
                if parsed.netloc == "github.com" and "/blob/" in parsed.path:
                    revision = parsed.path.split("/blob/", 1)[1].split("/", 1)[0]
                    if not re.fullmatch(r"[0-9a-f]{40}", revision):
                        errors.append(f"{source_label}: GitHub blob URL must pin a 40-character commit")
    return errors


def main() -> int:
    try:
        registry = load_object(REGISTRY)
        content_status = load_object(CONTENT_STATUS)
        errors = validate_document(registry, content_status)
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
