"""Validate the canonical English Lab order and generated footer links."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
NAV_PATH = ROOT / "docs/governance/lab-navigation.yaml"
START = "<!-- lab-navigation:start -->"
END = "<!-- lab-navigation:end -->"
BLOCK_RE = re.compile(rf"{re.escape(START)}(.*?){re.escape(END)}", re.DOTALL)
LINK_RE = re.compile(r'<a[^>]+data-lab-nav="([^"]+)"[^>]+href="([^"]+)"', re.IGNORECASE)
H1_RE = re.compile(r"(?m)^#\s+([^\r\n]+?)\s*$")


def fail(errors: list[str]) -> int:
    print("LAB_NAVIGATION_FAILED")
    for error in errors:
        print(f"- {error}")
    return 1


def load() -> dict[str, Any]:
    value = json.loads(NAV_PATH.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("navigation source must be an object")
    return value


def main() -> int:
    errors: list[str] = []
    try:
        document = load()
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        return fail([f"cannot parse {NAV_PATH.relative_to(ROOT)}: {exc}"])

    if document.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    entries = document.get("labs")
    if not isinstance(entries, list) or len(entries) != 18:
        return fail(["labs must contain exactly 18 entries"])
    numbers = [item.get("number") for item in entries if isinstance(item, dict)]
    if numbers != list(range(1, 19)):
        errors.append(f"Lab numbers must be 1..18 in order, found {numbers}")
    ids = [item.get("id") for item in entries if isinstance(item, dict)]
    expected_ids = [f"lab-{number:03d}" for number in range(1, 19)]
    if ids != expected_ids:
        errors.append(f"Lab IDs must be lab-001..lab-018 in order, found {ids}")

    registered_paths: set[str] = set()
    for index, item in enumerate(entries):
        if not isinstance(item, dict):
            errors.append(f"labs[{index}] must be an object")
            continue
        if set(item) != {"id", "number", "title", "path"}:
            errors.append(f"{item.get('id', index)} must contain only id, number, title, and path")
        path_value = item.get("path")
        if not isinstance(path_value, str) or not path_value.endswith("-EN.md"):
            errors.append(f"{item.get('id')}: path must identify an English -EN.md source")
            continue
        if path_value in registered_paths:
            errors.append(f"duplicate Lab path: {path_value}")
        registered_paths.add(path_value)
        source = ROOT / path_value
        if not source.is_file():
            errors.append(f"Lab path does not exist: {path_value}")
            continue
        headings = H1_RE.findall(source.read_text(encoding="utf-8"))
        expected_h1 = f"Lab {int(item['number']):03d}: {item.get('title')}"
        if not headings or headings[0] != expected_h1:
            errors.append(f"{path_value}: first H1 must exactly equal {expected_h1!r}")
            continue
        blocks = BLOCK_RE.findall(source.read_text(encoding="utf-8"))
        if len(blocks) != 1:
            errors.append(f"{path_value}: expected exactly one generated Lab navigation block, found {len(blocks)}")
            continue
        links = LINK_RE.findall(blocks[0])
        expected_kinds = (["previous"] if index > 0 else []) + (["next"] if index + 1 < len(entries) else [])
        kinds = [kind for kind, _ in links]
        if kinds != expected_kinds:
            errors.append(f"{path_value}: expected navigation links {expected_kinds}, found {kinds}")
        for kind, href in links:
            target_index = index - 1 if kind == "previous" else index + 1
            if not 0 <= target_index < len(entries):
                errors.append(f"{path_value}: unexpected {kind} link")
                continue
            resolved = (source.parent / href.split("#", 1)[0]).resolve()
            expected = (ROOT / str(entries[target_index]["path"])).resolve()
            if resolved != expected:
                errors.append(f"{path_value}: {kind} link resolves to {resolved}, expected {expected}")

    actual_paths = {path.relative_to(ROOT).as_posix() for path in (ROOT / "book/labs").glob("lab-*-EN.md")}
    missing = sorted(actual_paths - registered_paths)
    extra = sorted(registered_paths - actual_paths)
    if missing:
        errors.append(f"canonical English Labs missing from navigation: {missing}")
    if extra:
        errors.append(f"navigation paths are not canonical English Labs: {extra}")

    if errors:
        return fail(errors)
    print("LAB_NAVIGATION_OK labs=18 locale=EN")
    return 0


if __name__ == "__main__":
    sys.exit(main())
