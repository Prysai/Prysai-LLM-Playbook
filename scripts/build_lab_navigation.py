"""Generate deterministic English Lab footers from the canonical Lab order."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
NAV_PATH = ROOT / "docs/governance/lab-navigation.yaml"
START = "<!-- lab-navigation:start -->"
END = "<!-- lab-navigation:end -->"
BLOCK_RE = re.compile(rf"{re.escape(START)}.*?{re.escape(END)}", re.DOTALL)
LEGACY_BLOCK_RE = re.compile(
    r"<!-- chapter-navigation:start -->\s*<hr>\s*<nav[^>]+aria-label=\"(?:Lab|Chapter) navigation\".*?<!-- chapter-navigation:end -->",
    re.DOTALL,
)


def load_navigation() -> dict[str, Any]:
    try:
        document = json.loads(NAV_PATH.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot parse {NAV_PATH.relative_to(ROOT)}: {exc}") from exc
    if not isinstance(document, dict) or not isinstance(document.get("labs"), list):
        raise ValueError("navigation source must contain a labs list")
    return document


def relative_href(source: Path, target: Path) -> str:
    return Path(os.path.relpath(target, source.parent)).as_posix()


def link_markup(item: dict[str, Any], source: Path, direction: str) -> str:
    target = ROOT / str(item["path"])
    href = relative_href(source, target)
    number = int(item["number"])
    title = str(item["title"])
    prefix = "Previous Lab" if direction == "previous" else "Next Lab"
    visible = "← Previous" if direction == "previous" else "Next →"
    return (
        f'<a data-lab-nav="{direction}" href="{href}" '
        f'aria-label="{prefix}: Lab {number:03d} · {title}">{visible}<br>'
        f'<strong>Lab {number:03d} · {title}</strong></a>'
    )


def build_block(index: int, entries: list[dict[str, Any]], source: Path) -> str:
    previous = entries[index - 1] if index > 0 else None
    following = entries[index + 1] if index + 1 < len(entries) else None
    previous_cell = (
        f'<td align="left">{link_markup(previous, source, "previous")}</td>'
        if previous else '<td align="left"></td>'
    )
    next_cell = (
        f'<td align="right">{link_markup(following, source, "next")}</td>'
        if following else '<td align="right"></td>'
    )
    return "\n".join([
        START,
        "<hr>",
        '<nav class="lab-navigation" aria-label="Lab navigation">',
        '  <table role="presentation" width="100%">',
        "    <tr>",
        f"      {previous_cell}",
        f"      {next_cell}",
        "    </tr>",
        "  </table>",
        "</nav>",
        END,
    ])


def replace_block(text: str, block: str) -> str:
    if BLOCK_RE.search(text):
        return BLOCK_RE.sub(block, text, count=1)
    if LEGACY_BLOCK_RE.search(text):
        return LEGACY_BLOCK_RE.sub(block, text, count=1)
    return text.rstrip() + "\n\n" + block + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail when generated files are stale")
    args = parser.parse_args()
    try:
        document = load_navigation()
    except ValueError as exc:
        print("LAB_NAVIGATION_FAILED")
        print(f"- {exc}")
        return 1

    entries = document["labs"]
    stale: list[str] = []
    changed = 0
    for index, item in enumerate(entries):
        target = ROOT / str(item["path"])
        if not target.is_file():
            stale.append(f"missing target: {target.relative_to(ROOT)}")
            continue
        actual = target.read_text(encoding="utf-8")
        expected = replace_block(actual, build_block(index, entries, target))
        if actual != expected:
            stale.append(f"stale navigation: {target.relative_to(ROOT)}")
            if not args.check:
                target.write_text(expected, encoding="utf-8", newline="\n")
                changed += 1

    if stale and args.check:
        print("LAB_NAVIGATION_FAILED")
        for item in stale:
            print(f"- {item}")
        return 1
    if stale:
        print(f"LAB_NAVIGATION_GENERATED files={changed}")
    else:
        print(f"LAB_NAVIGATION_OK files={len(entries)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
