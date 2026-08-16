"""Report whether every public course route remains inside its selected locale.

This is a pre-release audit, not a translation-quality or learner-outcome test.
It checks 22 chapters and 18 Labs registered in the locale matrix. A release is
blocked when a localized source links its generated previous/next navigation to
another locale or when a registered existing file lacks the identity, declared
document language, or reader-facing title needed for a reviewer to compare it
with the canonical source.
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
IDENTITY = re.compile(
    r"<!--\s*content_id:\s*([^|\s]+)\s*\|\s*locale:\s*([A-Z]{2})\s*"
    r"\|\s*language:\s*([^|\s]+)",
    re.IGNORECASE,
)
FRONT_MATTER = re.compile(r"^\s*(?:<!--.*?-->\s*)?---\s*\n(.*?)\n---", re.DOTALL)
FRONT_MATTER_ID = re.compile(r"^id:\s*([^\s]+)\s*$", re.MULTILINE)
FRONT_MATTER_TITLE = re.compile(r'^title:\s*["\']?(.+?)["\']?\s*$', re.MULTILINE)
H1 = re.compile(r"^#\s+(\S.*)$", re.MULTILINE)
LANGUAGE_SWITCHER = re.compile(
    r"<!--\s*language-switcher:start\s*-->.*?<!--\s*language-switcher:end\s*-->",
    re.DOTALL,
)


def check_reader_links(path: Path, locale: str, problems: list[str]) -> None:
    """Reject a locale entry that routes readers into another reader locale.

    Chapters and Labs are the canonical course units, but a reader can also
    begin in a route or the Beginner Practice Pack.  Those front doors need
    the same locale guarantee: a local link into reader material may not
    quietly change language.
    """
    text = path.read_text(encoding="utf-8")
    for link_match in MARKDOWN_LINK.finditer(text):
        # A language switcher is an explicit, reader-chosen locale change, not
        # a silent fallback. Every other local reader link must preserve the
        # active locale.
        if any(block.start() <= link_match.start() < block.end() for block in LANGUAGE_SWITCHER.finditer(text)):
            continue
        target = link_match.group(1)
        if target.startswith(("http://", "https://", "mailto:")):
            continue
        target_path = (path.parent / target).resolve()
        try:
            target_relative = target_path.relative_to(ROOT)
        except ValueError:
            continue
        if not target_relative.parts or target_relative.parts[0] != "book":
            continue
        if not target_path.is_file():
            problems.append(
                f"{path.relative_to(ROOT)}: reader link targets a missing local file {target}"
            )
            continue
        suffix = target_path.stem.rsplit("-", 1)[-1].upper()
        if suffix in LOCALES and suffix != locale:
            problems.append(
                f"{path.relative_to(ROOT)}: cross-locale reader link {target} "
                f"(expected a -{locale}.md target)"
            )


def check_reader_identity(
    path: Path,
    content_id: str,
    locale: str,
    expected_language: str,
    problems: list[str],
) -> None:
    """Verify the source metadata that makes a localized page reviewable.

    A same-locale link is not sufficient if the file itself was copied from the
    wrong unit or declares a different document language.  This also requires
    a non-empty reader-facing title. It remains a structural guard: it cannot
    assess fluency, semantic title equivalence, or translation quality.
    """

    text = path.read_text(encoding="utf-8")
    display_path = path.relative_to(ROOT)
    identity = IDENTITY.search(text)
    if not identity:
        problems.append(f"{display_path}: missing content identity with locale and language")
    else:
        actual_id, actual_locale, actual_language = identity.groups()
        if actual_id != content_id or actual_locale.upper() != locale:
            problems.append(f"{display_path}: content identity must be {content_id} / {locale}")
        if actual_language != expected_language:
            problems.append(
                f"{display_path}: content identity language must be {expected_language}, got {actual_language}"
            )

    front_matter = FRONT_MATTER.search(text)
    # Chapters predate the Lab front-matter contract, so the reader-facing H1
    # is their title source.  When a file does opt into front matter, however,
    # its ID and title must be usable rather than stale copied metadata.
    if front_matter:
        metadata = front_matter.group(1)
        metadata_id = FRONT_MATTER_ID.search(metadata)
        if not metadata_id or metadata_id.group(1) != content_id:
            problems.append(f"{display_path}: front-matter id must be {content_id}")
        metadata_title = FRONT_MATTER_TITLE.search(metadata)
        if not metadata_title or not metadata_title.group(1).strip():
            problems.append(f"{display_path}: front matter is missing a non-empty title")
    h1 = H1.search(text)
    if not h1:
        problems.append(f"{display_path}: missing reader-facing H1 title")


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
            expected_language = matrix["locales"][locale]["html_lang"]
            check_reader_identity(path, content_id, locale, expected_language, problems)
            check_reader_links(path, locale, problems)

    # The learner begins at these entry documents, not only inside a chapter or
    # Lab. Include every existing locale-specific front door so the audit
    # covers the complete published route tree.
    for locale in LOCALES:
        entry_paths = (
            ROOT / f"README-{locale}.md",
            ROOT / f"book/preface-{locale}.md",
            ROOT / f"book/README-{locale}.md",
            ROOT / f"book/table-of-contents-{locale}.md",
            ROOT / f"book/routes/first-safe-change-{locale}.md",
            ROOT / f"book/routes/universal-core-foundations-{locale}.md",
            ROOT / f"book/communication-clinic-{locale}.md",
            ROOT / f"book/labs/README-{locale}.md",
        )
        for path in entry_paths:
            if path.is_file():
                check_reader_links(path, locale, problems)

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
