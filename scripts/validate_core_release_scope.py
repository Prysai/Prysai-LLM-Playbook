"""Validate the beginner-core product contract and scope-freeze inventory.

This is a structural gate. It verifies ownership, route classes, and the five
declared outcomes; it does not prove that a learner can complete the route.
"""

from __future__ import annotations

import copy
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "docs/product/core-course-contract.md"
SCOPE = ROOT / "docs/governance/core-release-scope.md"
INVENTORY = ROOT / "docs/governance/core-content-inventory.yaml"

EXPECTED_OUTCOMES = {"explain", "initiate", "identify", "repair", "transfer"}
EXPECTED_CLASSES = {"core", "advanced", "reference", "experimental"}
REQUIRED_CONTRACT_MARKERS = (
    "## 五项核心结果",
    "## 核心路线边界",
    "## 允许的第一轮实践",
    "## 明确不属于核心课程",
    "`candidate`",
    "`not_run`",
)
REQUIRED_SCOPE_MARKERS = (
    "## 默认规则",
    "## 暂停新增",
    "## 仍然允许的维护",
    "## 解冻条件",
    "## 停止条件",
)


def load_inventory() -> dict[str, Any]:
    value = json.loads(INVENTORY.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("core content inventory must be an object")
    return value


def validate_inventory(document: dict[str, Any], *, root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    if document.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if document.get("status") != "candidate":
        errors.append("status must remain candidate")
    classes = document.get("classes")
    if set(classes or []) != EXPECTED_CLASSES:
        errors.append("classes must be core, advanced, reference, and experimental")

    units = document.get("core_units")
    if not isinstance(units, list) or len(units) != 5:
        errors.append("core_units must contain exactly five units")
        units = units if isinstance(units, list) else []
    ids: set[str] = set()
    outcomes: set[str] = set()
    classified_paths: dict[str, str] = {}
    for index, unit in enumerate(units, start=1):
        label = f"core_units[{index}]"
        if not isinstance(unit, dict):
            errors.append(f"{label} must be an object")
            continue
        unit_id = unit.get("id")
        if not isinstance(unit_id, str) or not unit_id.startswith("core-"):
            errors.append(f"{label}.id must start with core-")
        elif unit_id in ids:
            errors.append(f"duplicate core unit id: {unit_id}")
        else:
            ids.add(unit_id)
        if unit.get("class") != "core":
            errors.append(f"{label}.class must be core")
        outcome = unit.get("outcome")
        if outcome not in EXPECTED_OUTCOMES:
            errors.append(f"{label}.outcome is not one of the five outcomes")
        else:
            outcomes.add(outcome)
        if unit.get("status") != "candidate":
            errors.append(f"{label}.status must remain candidate")
        if not isinstance(unit.get("learner_artifact"), str) or not unit["learner_artifact"].strip():
            errors.append(f"{label}.learner_artifact must be non-empty")
        paths = unit.get("source_paths")
        if not isinstance(paths, list) or not paths:
            errors.append(f"{label}.source_paths must be non-empty")
            continue
        for path_value in paths:
            if not isinstance(path_value, str) or not path_value.strip():
                errors.append(f"{label}.source_paths contains an empty path")
            elif not (root / path_value).exists():
                errors.append(f"{label}.source path is missing: {path_value}")
            if isinstance(path_value, str) and path_value.strip():
                owner = classified_paths.get(path_value)
                if owner and owner != label:
                    errors.append(f"source path has multiple primary owners: {path_value} ({owner}, {label})")
                else:
                    classified_paths[path_value] = label
    if outcomes != EXPECTED_OUTCOMES:
        errors.append("core units must cover explain, initiate, identify, repair, and transfer exactly")

    for section in ("advanced", "reference", "experimental"):
        values = document.get(section)
        if not isinstance(values, list) or not values:
            errors.append(f"{section} must retain at least one classified item")
        for item_index, item in enumerate(values if isinstance(values, list) else [], start=1):
            if not isinstance(item, dict):
                continue
            paths = item.get("source_paths")
            if not isinstance(paths, list):
                continue
            owner_label = f"{section}[{item_index}]"
            for path_value in paths:
                if not isinstance(path_value, str) or not path_value.strip():
                    continue
                owner = classified_paths.get(path_value)
                if owner and owner != owner_label:
                    errors.append(f"source path has multiple primary owners: {path_value} ({owner}, {owner_label})")
                else:
                    classified_paths[path_value] = owner_label
    return errors


def validate_contract_text(*, contract_text: str, scope_text: str) -> list[str]:
    errors: list[str] = []
    for marker in REQUIRED_CONTRACT_MARKERS:
        if marker not in contract_text:
            errors.append(f"core contract is missing {marker}")
    for marker in REQUIRED_SCOPE_MARKERS:
        if marker not in scope_text:
            errors.append(f"scope freeze is missing {marker}")
    return errors


def main() -> int:
    errors: list[str] = []
    try:
        inventory = load_inventory()
        errors.extend(validate_inventory(inventory))
        errors.extend(
            validate_contract_text(
                contract_text=CONTRACT.read_text(encoding="utf-8"),
                scope_text=SCOPE.read_text(encoding="utf-8"),
            )
        )
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors.append(str(exc))
    if errors:
        print("CORE_RELEASE_SCOPE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("CORE_RELEASE_SCOPE_OK units=5 classes=4 status=candidate")
    return 0


if __name__ == "__main__":
    sys.exit(main())
