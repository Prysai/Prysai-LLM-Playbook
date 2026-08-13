"""Validate the canonical project directory map."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
STRUCTURE_PATH = ROOT / "docs/governance/project-structure.yaml"


def load_structure() -> dict[str, Any]:
    value = json.loads(STRUCTURE_PATH.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("project structure must be an object")
    return value


def path_exists(path_value: str, *, allow_directory: bool = False) -> bool:
    normalized = path_value.replace("\\", "/")
    if "*" in normalized:
        return bool(list(ROOT.glob(normalized)))
    target = ROOT / normalized
    return target.is_file() or (allow_directory and target.is_dir())


def validate_file(errors: list[str], value: Any, label: str) -> None:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label} must be a non-empty file path")
        return
    if not path_exists(value):
        errors.append(f"{label} is missing: {value}")


def validate_directory(errors: list[str], value: Any, label: str) -> None:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label} must be a non-empty directory path")
        return
    if not (ROOT / value.replace("\\", "/")).is_dir():
        errors.append(f"{label} is missing: {value}")


def validate_path_reference(
    errors: list[str], value: Any, label: str, *, allow_directory: bool = False
) -> None:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label} must be a non-empty path")
        return
    if not path_exists(value, allow_directory=allow_directory):
        errors.append(f"{label} is missing: {value}")


def validate_file_list(
    errors: list[str], values: Any, label: str, *, allow_directory: bool = False
) -> None:
    if not isinstance(values, list):
        errors.append(f"{label} must be a list")
        return
    for index, value in enumerate(values, start=1):
        validate_path_reference(
            errors,
            value,
            f"{label}[{index}]",
            allow_directory=allow_directory,
        )


def validate_adr_identity(errors: list[str]) -> None:
    adr_dir = ROOT / "docs/adr"
    index_text = (adr_dir / "README.md").read_text(encoding="utf-8")
    seen: dict[str, str] = {}
    for path in sorted(adr_dir.glob("[0-9][0-9][0-9][0-9]-*.md")):
        file_id = path.name[:4]
        first_line = path.read_text(encoding="utf-8").splitlines()[0]
        title_match = re.match(r"^# ADR[- ](\d{4})", first_line)
        if not title_match:
            errors.append(f"ADR title does not declare its identity: {path.relative_to(ROOT)}")
        elif title_match.group(1) != file_id:
            errors.append(
                f"ADR title identity {title_match.group(1)} does not match filename {file_id}: "
                f"{path.relative_to(ROOT)}"
            )
        if file_id in seen:
            errors.append(f"duplicate ADR identity {file_id}: {seen[file_id]} and {path.name}")
        else:
            seen[file_id] = path.name
        if f"({path.name})" not in index_text:
            errors.append(f"ADR index is missing {path.name}")


def main() -> int:
    errors: list[str] = []
    try:
        structure = load_structure()
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("PROJECT_STRUCTURE_FAILED")
        print(f"- cannot parse {STRUCTURE_PATH.relative_to(ROOT)}: {exc}")
        return 1

    if structure.get("schema_version") != "1":
        errors.append("schema_version must be '1'")

    excluded = structure.get("excluded_workdirs", [])
    if not isinstance(excluded, list) or not all(isinstance(item, str) for item in excluded):
        errors.append("excluded_workdirs must be a list of strings")
        excluded = []

    top_level = structure.get("top_level")
    if not isinstance(top_level, list) or not top_level:
        errors.append("top_level must be a non-empty list")
        top_level = []
    subdirectories = structure.get("subdirectories")
    if not isinstance(subdirectories, list):
        errors.append("subdirectories must be a list")
        subdirectories = []
    root_entries = structure.get("root_entries")
    if not isinstance(root_entries, list) or not root_entries:
        errors.append("root_entries must be a non-empty list")
        root_entries = []
    generated_outputs = structure.get("generated_outputs")
    if not isinstance(generated_outputs, list):
        errors.append("generated_outputs must be a list")
        generated_outputs = []

    validate_adr_identity(errors)

    actual_top_level = {
        path.name
        for path in ROOT.iterdir()
        if path.is_dir() and path.name not in set(excluded)
    }
    declared_top_level: set[str] = set()

    for index, item in enumerate(top_level, start=1):
        label = f"top_level[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label} must be an object")
            continue
        path = item.get("path")
        if not isinstance(path, str) or not path.strip():
            errors.append(f"{label}.path must be non-empty")
            continue
        if path in declared_top_level:
            errors.append(f"duplicate top-level directory: {path}")
        declared_top_level.add(path)
        validate_directory(errors, path, f"{label}.path")
        validate_file(errors, item.get("entry"), f"{label}.entry")
        validate_file(errors, item.get("first_read"), f"{label}.first_read")
        validate_file_list(
            errors,
            item.get("canonical_sources"),
            f"{label}.canonical_sources",
            allow_directory=True,
        )
        validate_file_list(errors, item.get("generated_outputs"), f"{label}.generated_outputs")

    for missing in sorted(actual_top_level - declared_top_level):
        errors.append(f"top-level directory is not mapped: {missing}")
    for extra in sorted(declared_top_level - actual_top_level):
        errors.append(f"mapped top-level directory is not present: {extra}")

    for index, item in enumerate(subdirectories, start=1):
        label = f"subdirectories[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label} must be an object")
            continue
        path = item.get("path")
        validate_directory(errors, path, f"{label}.path")
        entry = item.get("entry")
        validate_file(errors, entry, f"{label}.entry")
        if isinstance(path, str) and isinstance(entry, str):
            prefix = path.replace("\\", "/").rstrip("/") + "/"
            if not entry.replace("\\", "/").startswith(prefix):
                errors.append(f"{label}.entry must be inside {path}: {entry}")

    mapped_files: set[str] = set()
    for index, item in enumerate(root_entries, start=1):
        label = f"root_entries[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label} must be an object")
            continue
        path = item.get("path")
        validate_file(errors, path, f"{label}.path")
        if isinstance(path, str):
            if path in mapped_files:
                errors.append(f"duplicate mapped file: {path}")
            mapped_files.add(path)
        validate_file(errors, item.get("canonical_source"), f"{label}.canonical_source")

    for index, item in enumerate(generated_outputs, start=1):
        label = f"generated_outputs[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label} must be an object")
            continue
        validate_file(errors, item.get("path"), f"{label}.path")
        validate_file_list(
            errors,
            item.get("source"),
            f"{label}.source",
            allow_directory=True,
        )
        for key in ("owner", "surface", "edit_rule"):
            if not isinstance(item.get(key), str) or not item[key].strip():
                errors.append(f"{label}.{key} must be non-empty")

    if errors:
        print("PROJECT_STRUCTURE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"PROJECT_STRUCTURE_OK top_level={len(top_level)} subdirectories={len(subdirectories)}")
    print(f"root_entries={len(root_entries)} generated_outputs={len(generated_outputs)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
