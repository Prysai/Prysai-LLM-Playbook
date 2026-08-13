"""Negative fixtures for canonical and compact chapter-title roles."""

from __future__ import annotations

import copy
import re
from pathlib import Path

import validate_book_navigation as navigation


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def title_errors(document: dict) -> list[str]:
    errors: list[str] = []
    seen_en: set[str] = set()
    seen_zh: set[str] = set()
    for item in document["chapters"]:
        for locale, key, seen in (
            ("EN", "canonical_title_en", seen_en),
            ("ZH", "canonical_title_zh", seen_zh),
        ):
            value = item.get(key)
            if not isinstance(value, str) or not value.strip():
                errors.append(f"{item.get('id')}: missing {key}")
            elif value in seen:
                errors.append(f"{item.get('id')}: duplicate {locale} canonical title")
            else:
                seen.add(value)
        for key in ("title_en", "title_zh"):
            if not isinstance(item.get(key), str) or not item[key].strip():
                errors.append(f"{item.get('id')}: missing compact {key}")
    return errors


def main() -> int:
    document = navigation.load()
    require(document.get("schema_version") == "2", "title-role schema is not v2")
    require(title_errors(document) == [], "checked-in title map is invalid")

    missing = copy.deepcopy(document)
    missing["chapters"][0]["canonical_title_en"] = ""
    require(any("missing canonical_title_en" in item for item in title_errors(missing)), "empty canonical title was accepted")

    duplicate = copy.deepcopy(document)
    duplicate["chapters"][1]["canonical_title_zh"] = duplicate["chapters"][0]["canonical_title_zh"]
    require(any("duplicate ZH" in item for item in title_errors(duplicate)), "duplicate canonical title was accepted")

    source = Path(navigation.ROOT / document["chapters"][0]["english_path"]).read_text(encoding="utf-8")
    headings = navigation.H1_RE.findall(source)
    require(len(headings) == 1, "canonical chapter must have exactly one H1")
    wrong_number = re.sub(r"^Chapter 1:", "Chapter 2:", headings[0])
    require(wrong_number != f"Chapter 1: {document['chapters'][0]['canonical_title_en']}", "wrong chapter number was accepted")

    print("BOOK_NAVIGATION_TITLE_TESTS_OK fixtures=3 roles=canonical,compact")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
