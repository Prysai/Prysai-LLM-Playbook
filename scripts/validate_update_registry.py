"""Validate the fixed maintenance registry without adding a runtime dependency."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "docs/governance/update-registry.yaml"
REQUIRED_KEYS = {
    "area",
    "canonical_paths",
    "owner",
    "triggers",
    "required_inputs",
    "validation_commands",
    "status_fields",
    "next_review",
}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def main() -> int:
    errors: list[str] = []
    try:
        data = json.loads(REGISTRY.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"VALIDATION_FAILED\n- cannot parse {REGISTRY.relative_to(ROOT)}: {exc}")
        return 1

    if data.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    areas = data.get("areas")
    if not isinstance(areas, list) or not areas:
        errors.append("areas must be a non-empty list")
        areas = []

    seen: set[str] = set()
    for index, record in enumerate(areas, start=1):
        if not isinstance(record, dict):
            errors.append(f"area {index}: record must be an object")
            continue
        missing = REQUIRED_KEYS - record.keys()
        for key in sorted(missing):
            errors.append(f"area {index}: missing {key}")
        name = record.get("area")
        if not isinstance(name, str) or not name:
            errors.append(f"area {index}: area must be a non-empty string")
        elif name in seen:
            errors.append(f"area {index}: duplicate area {name}")
        else:
            seen.add(name)
        for key in ("canonical_paths", "triggers", "required_inputs", "validation_commands", "status_fields"):
            value = record.get(key)
            if not isinstance(value, list) or not value or not all(isinstance(item, str) and item for item in value):
                errors.append(f"area {index}: {key} must be a non-empty list of strings")
        for path_text in record.get("canonical_paths", []):
            target = ROOT / path_text
            if not target.exists():
                errors.append(f"area {index}: canonical path does not exist: {path_text}")
        next_review = record.get("next_review")
        if not isinstance(next_review, str) or not DATE_RE.fullmatch(next_review):
            errors.append(f"area {index}: next_review must use YYYY-MM-DD")

    required_areas = {
        "official-facts",
        "learning-path",
        "chapters",
        "labs",
        "skills",
        "evaluations",
        "sources-and-licenses",
        "book-navigation",
        "public-site",
        "content-status",
        "release-and-rollback",
    }
    missing_areas = required_areas - seen
    for name in sorted(missing_areas):
        errors.append(f"missing required area: {name}")

    if errors:
        print("VALIDATION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"VALIDATION_OK registry={REGISTRY.relative_to(ROOT)} areas={len(areas)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
