"""Keep every reader-facing locale entry on the textbook-first path.

This is a structural safeguard. It checks the order and labels of entry links;
it does not assess translation quality, learner outcomes, or model behavior.
"""

from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE")

OPTIONAL_MARKERS = {
    "EN": "optional application practice",
    "ZH": "可选应用练习",
    "ES": "práctica de aplicación opcional",
    "JA": "任意の応用練習",
    "KO": "선택 응용 연습",
    "DE": "optionale Anwendungsübung",
}


def path_for(kind: str, locale: str) -> Path:
    if kind == "project":
        return ROOT / f"README-{locale}.md"
    if kind == "book":
        return ROOT / "book" / f"README-{locale}.md"
    return ROOT / "book" / f"table-of-contents-{locale}.md"


def required_links(locale: str, prefix: str) -> tuple[str, str, str]:
    return (
        f"{prefix}guides/llm-fundamentals-{locale}.md",
        f"{prefix}chapters/01-gpt-and-codex-{locale}.md",
        f"{prefix}chapters/02-first-safe-task-{locale}.md",
    )


def main() -> int:
    errors: list[str] = []
    for locale in LOCALES:
        for kind, prefix in (("project", "book/"), ("book", ""), ("toc", "")):
            path = path_for(kind, locale)
            if not path.is_file():
                errors.append(f"missing {kind} entry: {path.relative_to(ROOT)}")
                continue
            text = path.read_text(encoding="utf-8")
            lesson, chapter_one, chapter_two = required_links(locale, prefix)
            positions = [text.find(value) for value in (lesson, chapter_one, chapter_two)]
            if any(position < 0 for position in positions):
                errors.append(f"{path.relative_to(ROOT)}: missing same-locale Lesson 0, Chapter 1, or Chapter 2 link")
            elif positions != sorted(positions):
                errors.append(f"{path.relative_to(ROOT)}: textbook links must appear Lesson 0, Chapter 1, Chapter 2")
            if kind != "toc":
                marker = OPTIONAL_MARKERS[locale]
                if marker not in text:
                    errors.append(f"{path.relative_to(ROOT)}: missing optional-practice boundary {marker!r}")
    if errors:
        print("TEXTBOOK_ENTRY_PATH_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("TEXTBOOK_ENTRY_PATH_OK")
    print("locales=EN,ZH,ES,JA,KO,DE entries=18")
    print("evidence_boundary=entry-structure-not-translation-quality-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
