"""Check relative Markdown links in the Codex learning workspace."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
IGNORED_PARTS = {".git", ".work", "node_modules"}


def main() -> int:
    missing: list[str] = []
    checked = 0
    for markdown in ROOT.rglob("*.md"):
        if any(part in IGNORED_PARTS for part in markdown.relative_to(ROOT).parts):
            continue
        text = markdown.read_text(encoding="utf-8")
        for target in LINK_RE.findall(text):
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target_path = target.split("#", 1)[0].strip().strip("<>")
            if not target_path:
                continue
            checked += 1
            resolved = (markdown.parent / target_path).resolve()
            try:
                resolved.relative_to(ROOT.resolve())
            except ValueError:
                missing.append(f"{markdown.relative_to(ROOT)} -> outside workspace: {target}")
                continue
            if not resolved.exists():
                missing.append(f"{markdown.relative_to(ROOT)} -> missing: {target}")

    if missing:
        print("LOCAL_LINKS_FAILED")
        for item in missing:
            print(f"- {item}")
        return 1

    print(f"LOCAL_LINKS_OK checked={checked}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
