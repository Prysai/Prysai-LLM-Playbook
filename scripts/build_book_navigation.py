"""Generate deterministic chapter footers from the canonical book order."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
NAV_PATH = ROOT / "docs/governance/book-navigation.yaml"
START = "<!-- chapter-navigation:start -->"
END = "<!-- chapter-navigation:end -->"
BLOCK_RE = re.compile(
    rf"{re.escape(START)}.*?{re.escape(END)}", re.DOTALL
)


def load_navigation() -> dict[str, Any]:
    try:
        document = json.loads(NAV_PATH.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot parse {NAV_PATH.relative_to(ROOT)}: {exc}") from exc
    if not isinstance(document, dict) or not isinstance(document.get("chapters"), list):
        raise ValueError("navigation source must contain a chapters list")
    return document


def path_for(item: dict[str, Any], locale: str) -> str:
    if locale == "EN" and item.get("english_path"):
        return str(item["english_path"])
    return str(item["legacy_path"])


def title_for(item: dict[str, Any], locale: str) -> str:
    return str(item["title_en"] if locale == "EN" else item["title_zh"])


def relative_href(source: Path, target: Path) -> str:
    return Path(os.path.relpath(target, source.parent)).as_posix()


def link_markup(
    item: dict[str, Any],
    locale: str,
    source: Path,
    direction: str,
) -> str:
    target = ROOT / path_for(item, locale)
    href = relative_href(source, target)
    number = int(item["number"])
    title = title_for(item, locale)
    pending = locale == "EN" and not item.get("english_path")
    if locale == "EN":
        prefix = "Previous chapter" if direction == "previous" else "Next chapter"
        label = f"{prefix}: Chapter {number} · {title}"
        if pending:
            label += " · migration pending"
        visible_prefix = "← Previous" if direction == "previous" else "Next →"
    else:
        prefix = "上一章" if direction == "previous" else "下一章"
        label = f"{prefix}：第 {number} 章 · {title}"
        visible_prefix = "← 上一章" if direction == "previous" else "下一章 →"
        if pending:
            label += " · 迁移待定"
    visible_title = (
        f"Chapter {number} · {title}"
        if locale == "EN"
        else f"第 {number} 章 · {title}"
    )
    if pending and locale == "EN":
        visible_title += " · migration pending"
    return (
        f'<a data-chapter-nav="{direction}" href="{href}" '
        f'aria-label="{label}">{visible_prefix}<br><strong>'
        f"{visible_title}</strong></a>"
    )


def build_block(index: int, entries: list[dict[str, Any]], locale: str, source: Path) -> str:
    previous = entries[index - 1] if index > 0 else None
    following = entries[index + 1] if index + 1 < len(entries) else None
    aria_label = "Chapter navigation" if locale == "EN" else "章节导航"
    previous_cell = (
        f'<td align="left">{link_markup(previous, locale, source, "previous")}</td>'
        if previous else '<td align="left"></td>'
    )
    next_cell = (
        f'<td align="right">{link_markup(following, locale, source, "next")}</td>'
        if following else '<td align="right"></td>'
    )
    return "\n".join(
        [
            START,
            "<hr>",
            f'<nav aria-label="{aria_label}">',
            '  <table role="presentation" width="100%">',
            "    <tr>",
            f"      {previous_cell}",
            f"      {next_cell}",
            "    </tr>",
            "  </table>",
            "</nav>",
            END,
        ]
    )


def replace_block(text: str, block: str) -> str:
    if BLOCK_RE.search(text):
        return BLOCK_RE.sub(block, text, count=1)
    return text.rstrip() + "\n\n" + block + "\n"


def expected_files(document: dict[str, Any]) -> list[tuple[Path, int, str]]:
    entries = document["chapters"]
    targets: list[tuple[Path, int, str]] = []
    for index, item in enumerate(entries):
        targets.append((ROOT / str(item["legacy_path"]), index, "ZH"))
        if item.get("english_path"):
            targets.append((ROOT / str(item["english_path"]), index, "EN"))
    return targets


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail when generated files are stale")
    args = parser.parse_args()
    try:
        document = load_navigation()
    except ValueError as exc:
        print("BOOK_NAVIGATION_FAILED")
        print(f"- {exc}")
        return 1

    entries = document["chapters"]
    stale: list[str] = []
    changed = 0
    for target, index, locale in expected_files(document):
        if not target.is_file():
            stale.append(f"missing target: {target.relative_to(ROOT)}")
            continue
        expected = replace_block(
            target.read_text(encoding="utf-8"),
            build_block(index, entries, locale, target),
        )
        actual = target.read_text(encoding="utf-8")
        if actual != expected:
            stale.append(f"stale navigation: {target.relative_to(ROOT)}")
            if not args.check:
                target.write_text(expected, encoding="utf-8", newline="\n")
                changed += 1

    if stale and args.check:
        print("BOOK_NAVIGATION_FAILED")
        for item in stale:
            print(f"- {item}")
        return 1
    if stale and not args.check:
        print(f"BOOK_NAVIGATION_GENERATED files={changed}")
    else:
        print(f"BOOK_NAVIGATION_OK files={len(expected_files(document))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
