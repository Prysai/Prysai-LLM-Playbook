"""Keep the six Universal Foundations routes structurally equivalent.

The routes are localized explanations of one lesson sequence. This checker
rejects silent extra sections and missing core links, but does not assess
translation quality, cultural fit, or learner outcomes.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")
HEADING_RE = re.compile(r"^##\s+.+$", re.MULTILINE)
CORE_STEMS = (
    "03-task-protocol",
    "09-verification-and-recovery",
    "10-planning-and-slicing",
    "13-action-boundaries",
)


def route_errors(text: str, locale: str) -> list[str]:
    """Return errors for one localized foundations route."""
    headings = HEADING_RE.findall(text)
    if len(headings) != 4:
        return [f"expected four second-level sections, found {len(headings)}"]
    expected = [f"../chapters/{stem}-{locale}.md#core-" for stem in CORE_STEMS]
    positions = [text.find(value) for value in expected]
    if any(position < 0 for position in positions):
        return ["missing one or more same-locale core-unit links"]
    if positions != sorted(positions):
        return ["core-unit links must remain in canonical order"]
    return []


def main() -> int:
    errors: list[str] = []
    for locale in LOCALES:
        path = ROOT / "book" / "routes" / f"universal-core-foundations-{locale}.md"
        if not path.is_file():
            errors.append(f"missing foundations route: {path.relative_to(ROOT)}")
            continue
        for error in route_errors(path.read_text(encoding="utf-8"), locale):
            errors.append(f"{path.relative_to(ROOT)}: {error}")
    if errors:
        print("FOUNDATION_ROUTE_STRUCTURE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"FOUNDATION_ROUTE_STRUCTURE_OK locales={','.join(LOCALES)} sections=4 core_units=4")
    print("evidence_boundary=route-structure-not-translation-quality-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
