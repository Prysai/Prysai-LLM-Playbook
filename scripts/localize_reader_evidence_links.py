"""Keep localized reader pages inside the selected language route.

Technical records under ``docs/`` and the root terminology file remain the
canonical maintenance evidence. A course reader, however, should first reach
the matching localized evidence library rather than silently switching to an
English technical record. This script performs only that mechanical link
rewrite; it does not translate or alter evidence claims.
"""

from __future__ import annotations

import argparse
import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCALES = ("ZH", "ES", "JA", "KO", "DE", "ZHTW")
LINK = re.compile(r"(\]\()([^\)#]+\.md)(#[^\)]*)?(\))")


def category(target: Path) -> str:
    relative = target.relative_to(ROOT).as_posix()
    if relative == "CONTEXT.md":
        return "core-terms"
    if relative.startswith(("docs/research/", "docs/sources/", "docs/templates/")):
        return "source-notes"
    return "method-and-status"


def replacement(match: re.Match[str], source: Path, locale: str) -> str:
    target_text = match.group(2)
    target = (source.parent / target_text).resolve()
    try:
        relative = target.relative_to(ROOT).as_posix()
    except ValueError:
        return match.group(0)
    if relative != "CONTEXT.md" and not relative.startswith("docs/"):
        return match.group(0)
    library = ROOT / "book" / f"evidence-library-{locale}.md"
    local_target = os.path.relpath(library, source.parent).replace("\\", "/")
    return f"{match.group(1)}{local_target}#{category(target)}{match.group(4)}"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if a localized reader page still links directly to technical records")
    args = parser.parse_args()
    paths = [*ROOT.glob("README-*.md"), *ROOT.glob("book/**/*.md")]
    changed: list[Path] = []
    for path in paths:
        match = re.search(r"-(ZH|ES|JA|KO|DE|ZHTW)\.md$", path.name)
        if not match:
            continue
        locale = match.group(1)
        text = path.read_text(encoding="utf-8")
        updated = LINK.sub(lambda item: replacement(item, path, locale), text)
        if updated != text:
            changed.append(path)
            if not args.check:
                path.write_text(updated, encoding="utf-8", newline="\n")
    if args.check and changed:
        print("LOCALIZED_EVIDENCE_LINKS_BLOCKED")
        for path in changed:
            print(f"- {path.relative_to(ROOT)}")
        return 1
    print(f"LOCALIZED_EVIDENCE_LINKS_OK files={len(paths)} rewrites_needed={len(changed)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
