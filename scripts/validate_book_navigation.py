"""Validate the canonical chapter order and generated footer boundaries."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
NAV_PATH = ROOT / "docs/governance/book-navigation.yaml"
START = "<!-- chapter-navigation:start -->"
END = "<!-- chapter-navigation:end -->"
BLOCK_RE = re.compile(rf"{re.escape(START)}(.*?){re.escape(END)}", re.DOTALL)
LINK_RE = re.compile(r'<a[^>]+data-chapter-nav="([^"]+)"[^>]+href="([^"]+)"', re.IGNORECASE)
H1_RE = re.compile(r"(?m)^#\s+(.+?)\s*$")
EN_H1_RE = re.compile(r"^Chapter\s+(\d+):\s+(.+)$")
ZH_H1_RE = re.compile(r"^第([一二三四五六七八九十]+)章：(.+)$")
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")


def fail(errors: list[str]) -> int:
    print("BOOK_NAVIGATION_FAILED")
    for error in errors:
        print(f"- {error}")
    return 1


def load() -> dict[str, Any]:
    value = json.loads(NAV_PATH.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("navigation source must be an object")
    return value


def check_target(
    errors: list[str],
    entries: list[dict[str, Any]],
    current_source: Path,
    target_index: int,
    locale: str,
    relative: str,
) -> None:
    item = entries[target_index]
    path_key = "english_path" if item.get("english_path") else "legacy_path"
    expected_path = str(item[path_key])
    if path_key == "english_path" and locale != "EN":
        expected_path = expected_path.replace("-EN.md", f"-{locale}.md")
    target = ROOT / expected_path
    if not target.is_file():
        errors.append(f"{path_key} does not exist: {expected_path}")
    resolved = (current_source.parent / relative.split("#", 1)[0]).resolve()
    if resolved != target.resolve():
        errors.append(
            f"{current_source.relative_to(ROOT)}: {relative!r} resolves to "
            f"{resolved.relative_to(ROOT) if resolved.is_relative_to(ROOT) else resolved}, expected {expected_path}"
        )


def locale_target_exists(item: dict[str, Any], locale: str) -> bool:
    english_path = item.get("english_path")
    if english_path:
        path = str(english_path)
        if locale != "EN":
            path = path.replace("-EN.md", f"-{locale}.md")
        return (ROOT / path).is_file()
    legacy_path = item.get("legacy_path")
    return bool(legacy_path and locale == "ZH" and (ROOT / str(legacy_path)).is_file())


def main() -> int:
    errors: list[str] = []
    try:
        document = load()
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        return fail([f"cannot parse {NAV_PATH.relative_to(ROOT)}: {exc}"])

    if document.get("schema_version") != "2":
        errors.append("schema_version must be '2'")
    entries = document.get("chapters")
    if not isinstance(entries, list) or len(entries) != 22:
        return fail(["chapters must contain exactly 22 entries"])
    numbers = [item.get("number") for item in entries if isinstance(item, dict)]
    if numbers != list(range(1, 23)):
        errors.append(f"chapter numbers must be 1..22 in order, found {numbers}")
    ids = [item.get("id") for item in entries if isinstance(item, dict)]
    if len(set(ids)) != len(ids):
        errors.append("chapter IDs must be unique")
    for item in entries:
        if not isinstance(item, dict):
            errors.append("each chapter must be an object")
            continue
        for key in ("id", "number", "part", "title_en", "title_zh", "canonical_title_en", "canonical_title_zh", "english_status", "status"):
            if key not in item:
                errors.append(f"chapter {item.get('number', '?')}: missing {key}")
        english_path = item.get("english_path")
        if english_path:
            if not str(english_path).endswith("-EN.md"):
                errors.append(f"English path must end in -EN.md: {english_path}")
            if not (ROOT / str(english_path)).is_file():
                errors.append(f"English chapter path does not exist: {english_path}")
            else:
                headings = H1_RE.findall((ROOT / str(english_path)).read_text(encoding="utf-8"))
                expected = f"Chapter {item['number']}: {item.get('canonical_title_en')}"
                if headings != [expected]:
                    errors.append(f"{english_path}: H1 must exactly equal {expected!r}")
            if item.get("english_status") != "source":
                errors.append(f"chapter {item.get('number')}: English source must be marked source")
        elif item.get("english_status") != "migration_pending":
            errors.append(f"chapter {item.get('number')}: missing English source must be migration_pending")

    for index, item in enumerate(entries):
        if not isinstance(item, dict):
            continue
        targets: list[tuple[Path, str]] = []
        if item.get("english_path"):
            english_target = ROOT / str(item["english_path"])
            targets.append((english_target, "EN"))
            for locale in LOCALES[1:]:
                localized_target = ROOT / str(item["english_path"]).replace("-EN.md", f"-{locale}.md")
                if localized_target.is_file():
                    targets.append((localized_target, locale))
        elif item.get("legacy_path"):
            targets.append((ROOT / str(item["legacy_path"]), "ZH"))
        for source, locale in targets:
            text = source.read_text(encoding="utf-8") if source.is_file() else ""
            blocks = BLOCK_RE.findall(text)
            label = source.relative_to(ROOT)
            if len(blocks) != 1:
                errors.append(f"{label}: expected exactly one generated navigation block, found {len(blocks)}")
                continue
            links = LINK_RE.findall(blocks[0])
            kinds = [kind for kind, _ in links]
            expected_kinds = []
            if index > 0 and locale_target_exists(entries[index - 1], locale):
                expected_kinds.insert(0, "previous")
            if index + 1 < len(entries) and locale_target_exists(entries[index + 1], locale):
                expected_kinds.append("next")
            if sorted(kinds) != sorted(expected_kinds):
                errors.append(f"{label}: expected navigation links {expected_kinds}, found {kinds}")
            if locale == "EN" and index + 1 < len(entries) and not entries[index + 1].get("english_path"):
                if "migration pending" not in blocks[0]:
                    errors.append(f"{label}: English link to the untranslated next chapter needs migration pending")
            for kind, href in links:
                if kind == "previous" and index > 0 and locale_target_exists(entries[index - 1], locale):
                    check_target(errors, entries, source, index - 1, locale, href)
                elif kind == "next" and index + 1 < len(entries) and locale_target_exists(entries[index + 1], locale):
                    check_target(errors, entries, source, index + 1, locale, href)

    if errors:
        return fail(errors)
    print(f"BOOK_NAVIGATION_OK chapters=22 locales={','.join(LOCALES)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
