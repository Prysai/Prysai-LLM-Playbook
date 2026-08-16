"""Validate canonical ownership for transferable LLM collaboration units."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MAP_PATH = ROOT / "docs/governance/core-unit-map.yaml"
NAV_PATH = ROOT / "docs/governance/book-navigation.yaml"
ROUTE_LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
PLATFORM_TERMS = re.compile(
    r"\b(?:Codex|Claude(?: Code)?|Grok|Gemini|ChatGPT)\b", re.IGNORECASE
)


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def anchor_marker(anchor: str) -> str:
    return f'<a id="{anchor}"></a>'


def extract_range(text: str, start: str, end: str) -> str | None:
    start_marker = anchor_marker(start)
    end_marker = anchor_marker(end)
    if text.count(start_marker) != 1 or text.count(end_marker) != 1:
        return None
    start_index = text.index(start_marker) + len(start_marker)
    end_index = text.index(end_marker)
    if start_index >= end_index:
        return None
    return text[start_index:end_index]


def route_projection_errors(text: str) -> list[str]:
    """Keep the route's owned first task compact without erasing it.

    The route is intentionally more than a link list: a first-time reader needs
    the complete offline prompt and its three checks in the same place. This
    limit rejects copied chapter-scale prose, while keeping that usable task.
    """
    fenced_words = sum(len(block.split()) for block in re.findall(r"```.*?```", text, re.DOTALL))
    if fenced_words > 120 or len(text.split()) > 900:
        return ["route must remain a bounded first-task projection, not copied chapter prose"]
    return []


def has_cycle(edges: dict[str, list[str]]) -> bool:
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(node: str) -> bool:
        if node in visiting:
            return True
        if node in visited:
            return False
        visiting.add(node)
        for dependency in edges.get(node, []):
            if visit(dependency):
                return True
        visiting.remove(node)
        visited.add(node)
        return False

    return any(visit(node) for node in edges)


def validate_document(document: dict[str, Any], *, root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    if document.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if document.get("status") != "candidate":
        errors.append("status must remain candidate")
    route_value = document.get("route_path")
    route_path = root / str(route_value or "")
    if not route_path.is_file():
        errors.append(f"route_path does not exist: {route_value}")
    units = document.get("units")
    if not isinstance(units, list) or not units:
        return errors + ["units must be a non-empty list"]

    navigation = load_object(NAV_PATH)
    canonical_paths = {
        str(item.get("english_path"))
        for item in navigation.get("chapters", [])
        if item.get("english_path")
    }
    ids: set[str] = set()
    owners: set[str] = set()
    edges: dict[str, list[str]] = {}
    expected_links: set[str] = set()
    for index, unit in enumerate(units, start=1):
        label = f"units[{index}]"
        if not isinstance(unit, dict):
            errors.append(f"{label} must be an object")
            continue
        unit_id = unit.get("id")
        owner = unit.get("owner_path")
        if not isinstance(unit_id, str) or not re.fullmatch(r"core-[a-z0-9-]+", unit_id):
            errors.append(f"{label}.id must be a core-* identifier")
            continue
        if unit_id in ids:
            errors.append(f"duplicate unit id: {unit_id}")
        ids.add(unit_id)
        if not isinstance(owner, str) or owner not in canonical_paths:
            errors.append(f"{unit_id}: owner_path must be a canonical English chapter")
            continue
        if owner in owners:
            errors.append(f"duplicate owner_path: {owner}")
        owners.add(owner)
        start = unit.get("start_anchor")
        end = unit.get("end_anchor")
        if not isinstance(start, str) or not isinstance(end, str):
            errors.append(f"{unit_id}: start_anchor and end_anchor are required")
            continue
        owner_text = (root / owner).read_text(encoding="utf-8")
        teaching_range = extract_range(owner_text, start, end)
        if teaching_range is None:
            errors.append(f"{unit_id}: owner needs one ordered start and end anchor")
        elif PLATFORM_TERMS.search(teaching_range):
            errors.append(f"{unit_id}: platform fact or named product leaked into universal range")
        consumers = unit.get("consumer_paths")
        if not isinstance(consumers, list) or not consumers:
            errors.append(f"{unit_id}: consumer_paths must be a non-empty list")
        else:
            for consumer in consumers:
                if not isinstance(consumer, str) or not (root / consumer).is_file():
                    errors.append(f"{unit_id}: invalid consumer path: {consumer}")
                elif consumer == owner:
                    errors.append(f"{unit_id}: owner cannot also be a consumer")
        dependencies = unit.get("depends_on")
        if not isinstance(dependencies, list) or not all(isinstance(item, str) for item in dependencies):
            errors.append(f"{unit_id}: depends_on must be a string list")
            dependencies = []
        edges[unit_id] = dependencies
        if unit.get("platform_scope") != "universal":
            errors.append(f"{unit_id}: platform_scope must be universal")
        excluded = unit.get("excluded_ranges")
        if not isinstance(excluded, list) or not excluded:
            errors.append(f"{unit_id}: excluded_ranges must name what is outside the core")
        expected_links.add(f"../chapters/{Path(owner).name}#{start}")

    for unit_id, dependencies in edges.items():
        for dependency in dependencies:
            if dependency not in ids:
                errors.append(f"{unit_id}: unknown dependency {dependency}")
    if has_cycle(edges):
        errors.append("core unit dependency graph contains a cycle")

    if route_path.is_file():
        route_text = route_path.read_text(encoding="utf-8")
        route_links = set(ROUTE_LINK_RE.findall(route_text))
        missing_links = expected_links - route_links
        if missing_links:
            errors.append("route is missing canonical unit links: " + ", ".join(sorted(missing_links)))
        errors.extend(route_projection_errors(route_text))
    return errors


def main() -> int:
    try:
        document = load_object(MAP_PATH)
        errors = validate_document(document)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors = [str(exc)]
    if errors:
        print("CORE_UNIT_MAP_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("CORE_UNIT_MAP_OK units=4 status=candidate run_status=not_run")
    return 0


if __name__ == "__main__":
    sys.exit(main())
