"""Keep every reader-facing locale entry on the textbook-first path.

This is a structural safeguard. It checks the order and labels of entry links;
it does not assess translation quality, learner outcomes, or model behavior.
"""

from __future__ import annotations

import re
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

START_HERE_HEADING = {
    "ES": "## Empieza aquí",
    "JA": "## まずここから",
    "KO": "## 여기서 시작하세요",
    "DE": "## Hier beginnen",
}


def english_root_route_number_errors(text: str) -> list[str]:
    """Reject a duplicated visible step in GitHub's compact English entry.

    ``README.md`` is the first page most repository visitors see.  Its guided
    route ends immediately before the optional-routes disclosure.  Keeping the
    check to that bounded section avoids interpreting numbered examples later
    in the README as route steps.
    """
    start_marker = "## Start here — read it like a book"
    end_marker = "<details>\n<summary>Other routes"
    start = text.find(start_marker)
    end = text.find(end_marker, start)
    if start < 0 or end < 0:
        return ["missing bounded English root route section"]
    section = text[start:end]
    numbers = [int(value) for value in re.findall(r"^\s*(\d+)\.\s+\[", section, flags=re.MULTILINE)]
    expected = list(range(1, 6))
    if numbers != expected:
        return [f"English root route must show steps {expected} exactly once: found {numbers}"]
    return []


def visible_start_number_errors(text: str, locale: str) -> list[str]:
    """Return visible-numbering errors for a localized ``Start here`` list.

    Markdown accepts repeated list numbers, but readers see the source on GitHub
    and can reasonably treat a duplicate number as a broken route.  This helper
    deliberately checks only the introductory list in the four localized books
    that use explicit ordered-list numbers.  It is a navigation check, not a
    translation-quality assessment.
    """
    heading = START_HERE_HEADING.get(locale)
    if heading is None:
        return []
    start = text.find(heading)
    if start < 0:
        return ["missing localized start heading"]
    section = text[start + len(heading):]
    next_heading = re.search(r"^##\s+", section, flags=re.MULTILINE)
    if next_heading:
        section = section[:next_heading.start()]
    numbers = [int(value) for value in re.findall(r"^\s*(\d+)\.\s+\[", section, flags=re.MULTILINE)]
    if len(numbers) < 3:
        return ["start list must contain at least Chapter 0, Chapter 1, and Chapter 2"]
    expected = list(range(1, len(numbers) + 1))
    if numbers != expected:
        return [f"start-list numbers must be sequential: found {numbers}, expected {expected}"]
    return []


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
    root_readme = ROOT / "README.md"
    if not root_readme.is_file():
        errors.append("missing GitHub root README")
    else:
        for error in english_root_route_number_errors(root_readme.read_text(encoding="utf-8")):
            errors.append(f"README.md: {error}")
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
                errors.append(f"{path.relative_to(ROOT)}: missing same-locale Chapter 0, Chapter 1, or Chapter 2 link")
            elif positions != sorted(positions):
                errors.append(f"{path.relative_to(ROOT)}: textbook links must appear Chapter 0, Chapter 1, Chapter 2")
            if kind != "toc":
                marker = OPTIONAL_MARKERS[locale]
                if marker not in text:
                    errors.append(f"{path.relative_to(ROOT)}: missing optional-practice boundary {marker!r}")
            else:
                for error in visible_start_number_errors(text, locale):
                    errors.append(f"{path.relative_to(ROOT)}: {error}")
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
