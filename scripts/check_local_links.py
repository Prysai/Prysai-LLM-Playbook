"""Check relative Markdown links in the Codex learning workspace."""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
IGNORED_PARTS = {".git", ".work", "node_modules", "tmp", "_site", ".codex-temp", ".pytest_cache"}
IGNORED_TRANSIENT_PREFIXES = ("._site-build-", "._site-previous")


def ignored_directory(name: str) -> bool:
    return name in IGNORED_PARTS or name.startswith(IGNORED_TRANSIENT_PREFIXES)


def main(root: Path | str | None = None) -> int:
    """Check links below ``root``; default to the repository workspace."""

    scan_root = Path(root).resolve() if root is not None else ROOT.resolve()
    missing: list[str] = []
    checked = 0
    for directory, subdirectories, filenames in os.walk(scan_root):
        subdirectories[:] = sorted(
            name for name in subdirectories if not ignored_directory(name)
        )
        for filename in sorted(filenames):
            if not filename.endswith(".md"):
                continue
            markdown = Path(directory) / filename
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
                    resolved.relative_to(scan_root)
                except ValueError:
                    missing.append(f"{markdown.relative_to(scan_root)} -> outside workspace: {target}")
                    continue
                if not resolved.exists():
                    missing.append(f"{markdown.relative_to(scan_root)} -> missing: {target}")

    if missing:
        print("LOCAL_LINKS_FAILED")
        for item in missing:
            print(f"- {item}")
        return 1

    print(f"LOCAL_LINKS_OK checked={checked}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
