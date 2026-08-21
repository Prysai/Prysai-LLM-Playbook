"""Audit whether localized course files retain the visible teaching contract.

This is a structural release-audit signal.  It distinguishes a missing
teaching-contract element from a short or condensed translation, but it does
not judge meaning, language quality, cultural fit, or learner outcomes.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import validate_learning_contract as contract


ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "docs/governance/locale-matrix.yaml"
LOCALES = ("ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")
HEADING_RE = re.compile(r"^#{2,3}\s+\S", re.MULTILINE)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def chapter_missing(text: str) -> list[str]:
    return [name for name, pattern in contract.CHAPTER_CONTRACT.items() if not pattern.search(text)]


def lab_missing(text: str) -> list[str]:
    metadata, body = contract.metadata_block(text)
    if metadata is None:
        return ["frontmatter"]
    values = {match.group(1): (match.group(2) or "").strip() for match in contract.LAB_KEY_RE.finditer(metadata)}
    missing = [key for key in contract.LAB_REQUIRED_KEYS if not contract.value_is_nonempty(values.get(key))]
    if not re.search(r"(?m)^##\s+", body):
        missing.append("instructional_body")
    return missing


def headings(text: str) -> int:
    return len(HEADING_RE.findall(re.sub(r"```.*?```", "", text, flags=re.DOTALL)))


def audit_rows(matrix: dict) -> tuple[list[str], list[str], int]:
    errors: list[str] = []
    attention: list[str] = []
    checked = 0
    for item in matrix.get("content", []):
        if not isinstance(item, dict) or item.get("kind") not in {"chapter", "lab"}:
            continue
        item_id = str(item.get("content_id", "unknown"))
        records = item.get("locales", {})
        english = records.get("EN", {}) if isinstance(records, dict) else {}
        english_path = ROOT / str(english.get("path", ""))
        if not english_path.is_file():
            errors.append(f"{item_id}.EN: source file is missing")
            continue
        source = read(english_path)
        source_headings = headings(source)
        for locale in LOCALES:
            record = records.get(locale, {}) if isinstance(records, dict) else {}
            path = ROOT / str(record.get("path", ""))
            label = f"{item_id}.{locale}"
            if not path.is_file():
                errors.append(f"{label}: localized file is missing")
                continue
            localized = read(path)
            missing = chapter_missing(localized) if item.get("kind") == "chapter" else lab_missing(localized)
            if missing:
                errors.append(f"{label}: missing teaching-contract items: {', '.join(missing)}")
            localized_headings = headings(localized)
            if source_headings >= 8 and localized_headings < max(6, int(source_headings * 0.65)):
                attention.append(
                    f"{label}: headings={localized_headings}/{source_headings}; inspect for condensed teaching steps"
                )
            checked += 1
    return errors, attention, checked


def main() -> int:
    try:
        matrix = json.loads(MATRIX_PATH.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        print(f"LOCALIZED_LEARNING_CONTRACT_AUDIT_FAILED\n- cannot read locale matrix: {error}")
        return 1
    errors, attention, checked = audit_rows(matrix)
    if errors:
        print("LOCALIZED_LEARNING_CONTRACT_AUDIT_FAILED")
        print(*(f"- {error}" for error in errors), sep="\n")
        return 1
    print(f"LOCALIZED_LEARNING_CONTRACT_AUDIT_OK units={checked} attention_items={len(attention)}")
    print("scope=structure-only; attention items require editorial or native-language review")
    print(*(f"ATTENTION: {item}" for item in attention), sep="\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
