"""Guard the eight-language first path against silent teaching-contract loss.

This is deliberately narrower than a translation review. It verifies that the
five reader-visible starting units retain the same observable learning loop and
that a localized unit does not link a reader back to a differently localized
course file. Native-language review remains required for meaning and quality.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import validate_learning_contract as contract


ROOT = Path(__file__).resolve().parents[1]
MATRIX = ROOT / "docs/governance/locale-matrix.yaml"
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")
FIRST_PATH_IDS = (
    "llm-fundamentals-guide",
    "chapter-01-gpt-and-codex",
    "chapter-02-first-safe-task",
    "lab-011-gpt-codex-boundaries",
    "lab-001-first-safe-task",
)
LESSON_ZERO_ID = "llm-fundamentals-guide"
MARKDOWN_LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
LOCALIZED_TARGET_RE = re.compile(r"-(EN|ZH|ES|JA|KO|DE|ZHTW|FR)\.md$")


def load_records() -> dict[str, dict]:
    data = json.loads(MATRIX.read_text(encoding="utf-8"))
    records = {
        str(item.get("content_id")): item
        for item in data.get("content", [])
        if isinstance(item, dict)
    }
    missing = [item_id for item_id in FIRST_PATH_IDS if item_id not in records]
    if missing:
        raise ValueError("first-path IDs are missing from locale matrix: " + ", ".join(missing))
    return records


def contract_gaps(kind: str, text: str) -> list[str]:
    if kind == "lab":
        metadata, body = contract.metadata_block(text)
        if metadata is None:
            return ["frontmatter"]
        values = {
            match.group(1): (match.group(2) or "").strip()
            for match in contract.LAB_KEY_RE.finditer(metadata)
        }
        missing = [
            key
            for key in contract.LAB_REQUIRED_KEYS
            if not contract.value_is_nonempty(values.get(key))
        ]
        if not re.search(r"(?m)^##\s+", body):
            missing.append("instructional_body")
        return missing
    return [name for name, pattern in contract.CHAPTER_CONTRACT.items() if not pattern.search(text)]


def lesson_zero_gaps(text: str) -> list[str]:
    """Check the introductory lesson's own small, reader-first contract.

    Lesson 0 is not a numbered chapter and should not acquire artificial
    chapter headings merely to satisfy a validator. It must still teach an
    honest capability boundary, offer an observable check, and point to the
    next course unit.
    """

    checks = {
        "definition": re.compile(r"(?mi)^##\s+0\.1\s+"),
        "capability_boundary": re.compile(
            r"(?i)(what LLMs cannot|LLM 做不到|LLM 自己无法建立什么|LLM 自己無法建立什麼|LLM.{0,8}(不能|無法|做不到)|"
            r"LLMだけでは確立できないこと|LLM만으로 확립할 수 없는 것|Was LLMs allein nicht feststellen können|"
            r"LLM.{0,4}できない|LLM이 할 수 없는|LLMs nicht können|LLM no pueden|les LLM ne peuvent pas)"
        ),
        "observable_check": re.compile(
            r"(?i)(five-minute boundary check|五分钟边界检查|五分鐘邊界檢查|5分の境界チェック|5분 경계 점검|Comprobación de límites en cinco minutos|Fünf-Minuten-Grenzcheck|Vérification des limites en cinq minutes)"
        ),
        "sources_boundary": re.compile(
            r"(?i)(sources and boundary|资料来源与边界|来源与边界|來源與邊界|情報源とその限界|情報源と境界|"
            r"출처와 경계|Fuentes y alcance|Fuentes y límites|Quellen und Grenzen|Quellen und Grenzen|sources et limites)"
        ),
        "next_unit": re.compile(r"(?i)(chapter.?1|第.?1.?章|第1章|1장|Kapitel.?1|Capítulo.?1|Chapitre.?1)"),
    }
    return [name for name, pattern in checks.items() if not pattern.search(text)]


def wrong_locale_links(path: Path, locale: str) -> list[str]:
    wrong: list[str] = []
    for target in MARKDOWN_LINK_RE.findall(path.read_text(encoding="utf-8")):
        target = target.split("#", 1)[0].strip().strip("<>")
        if not target or target.startswith(("https://", "http://", "mailto:", "#")):
            continue
        suffix = LOCALIZED_TARGET_RE.search(target)
        if suffix and suffix.group(1) != locale:
            wrong.append(target)
    return wrong


def audit(records: dict[str, dict]) -> tuple[list[str], int]:
    errors: list[str] = []
    checked = 0
    for item_id in FIRST_PATH_IDS:
        item = records[item_id]
        kind = str(item.get("kind"))
        locales = item.get("locales", {})
        for locale in LOCALES:
            record = locales.get(locale, {}) if isinstance(locales, dict) else {}
            path = ROOT / str(record.get("path", ""))
            label = f"{item_id}.{locale}"
            if not path.is_file():
                errors.append(f"{label}: missing source file")
                continue
            source = path.read_text(encoding="utf-8")
            gaps = lesson_zero_gaps(source) if item_id == LESSON_ZERO_ID else contract_gaps(kind, source)
            if gaps:
                errors.append(f"{label}: missing teaching-contract items: {', '.join(gaps)}")
            mismatches = wrong_locale_links(path, locale)
            if mismatches:
                errors.append(f"{label}: links to a different course locale: {', '.join(mismatches)}")
            checked += 1
    return errors, checked


def main() -> int:
    try:
        errors, checked = audit(load_records())
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as error:
        print("FIRST_PATH_LOCALIZATION_AUDIT_FAILED")
        print(f"- {error}")
        return 1
    if errors:
        print("FIRST_PATH_LOCALIZATION_AUDIT_FAILED")
        print(*(f"- {error}" for error in errors), sep="\n")
        return 1
    print(f"FIRST_PATH_LOCALIZATION_AUDIT_OK units={checked}")
    print("scope=teaching-contract-and-link-locality-only; not native-language review or learner evidence")
    return 0


if __name__ == "__main__":
    sys.exit(main())

