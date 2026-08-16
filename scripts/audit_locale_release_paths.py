"""Report whether every public course route remains inside its selected locale.

This is a pre-release audit, not a translation-quality or learner-outcome test.
It checks 22 chapters and 18 Labs registered in the locale matrix. A release is
blocked when a localized source links its generated previous/next navigation to
another locale or when a registered existing file lacks the identity/header
needed for a reviewer to compare it with the canonical source.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MATRIX = ROOT / "docs/governance/locale-matrix.yaml"
COURSE_KINDS = {"chapter", "lab"}
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE")
MARKDOWN_LINK = re.compile(r"(?:href=\"|\]\()([^\"\)#]+\.md)(?:#[^\"\)]*)?", re.IGNORECASE)
IDENTITY = re.compile(r"<!--\s*content_id:\s*([^|\s]+)\s*\|\s*locale:\s*([A-Z]{2})\b", re.IGNORECASE)
H1 = re.compile(r"^#\s+\S", re.MULTILINE)


def check_course_links(path: Path, locale: str, problems: list[str]) -> None:
    """Reject a locale entry that routes readers into another course locale."""
    text = path.read_text(encoding="utf-8")
    for target in MARKDOWN_LINK.findall(text):
        if target.startswith(("http://", "https://", "mailto:")):
            continue
        target_path = (path.parent / target).resolve()
        try:
            target_relative = target_path.relative_to(ROOT)
        except ValueError:
            continue
        if target_relative.parts[:2] not in {("book", "chapters"), ("book", "labs")}:
            continue
        suffix = target_path.stem.rsplit("-", 1)[-1].upper()
        if suffix != locale:
            problems.append(
                f"{path.relative_to(ROOT)}: cross-locale course link {target} "
                f"(expected a -{locale}.md target)"
            )


def main() -> int:
    matrix = json.loads(MATRIX.read_text(encoding="utf-8"))
    problems: list[str] = []
    totals = {locale: {"available": 0, "missing": 0} for locale in LOCALES}
    expected = [item for item in matrix["content"] if item.get("kind") in COURSE_KINDS]
    if len(expected) != 40:
        problems.append(f"expected 40 course units, found {len(expected)}")

    for item in expected:
        for locale, record in item["locales"].items():
            reason = record.get("reason", "").lower()
            if "english fallback" in reason or "use the english source" in reason:
                problems.append(
                    f"{item['content_id']} / {locale}: a missing translation must use a "
                    "same-locale unavailable state, not an English fallback"
                )

    for item in expected:
        content_id = item["content_id"]
        for locale in LOCALES:
            record = item["locales"][locale]
            path = ROOT / record["path"]
            if not path.is_file():
                totals[locale]["missing"] += 1
                continue
            totals[locale]["available"] += 1
            text = path.read_text(encoding="utf-8")
            identity = IDENTITY.search(text)
            if not identity or identity.group(1) != content_id or identity.group(2).upper() != locale:
                problems.append(f"{path.relative_to(ROOT)}: content identity must be {content_id} / {locale}")
            if not H1.search(text):
                problems.append(f"{path.relative_to(ROOT)}: missing reader-facing H1 title")
            check_course_links(path, locale, problems)

    # The learner begins at these entry documents, not only inside a chapter or
    # Lab. Include every existing locale-specific front door so the audit
    # covers the complete published route tree.
    for locale in LOCALES:
        entry_paths = (
            ROOT / f"book/preface-{locale}.md",
            ROOT / f"book/README-{locale}.md",
            ROOT / f"book/table-of-contents-{locale}.md",
            ROOT / f"book/routes/first-safe-change-{locale}.md",
        )
        for path in entry_paths:
            if path.is_file():
                check_course_links(path, locale, problems)

    for locale in LOCALES:
        count = totals[locale]
        print(f"{locale}: available={count['available']}/40 missing={count['missing']}")
    if problems:
        print("LOCALE_RELEASE_PATHS_BLOCKED")
        for problem in problems:
            print(f"- {problem}")
        return 1
    if any(totals[locale]["missing"] for locale in LOCALES):
        print("LOCALE_RELEASE_PATHS_INCOMPLETE")
        print("- Every registered locale needs 40 locally authored and reviewed course units before a full-six-language release.")
        return 1
    print("LOCALE_RELEASE_PATHS_OK units=40 locales=6")
    return 0


if __name__ == "__main__":
    sys.exit(main())
