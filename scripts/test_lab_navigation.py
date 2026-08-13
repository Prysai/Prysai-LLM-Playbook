"""Boundary fixtures for generated Lab navigation."""

from __future__ import annotations

from pathlib import Path

import build_lab_navigation as navigation


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    document = navigation.load_navigation()
    entries = document["labs"]
    source = navigation.ROOT / entries[0]["path"]

    first = navigation.build_block(0, entries, source)
    require('data-lab-nav="previous"' not in first, "first Lab received a previous link")
    require('data-lab-nav="next"' in first, "first Lab is missing its next link")

    middle_source = navigation.ROOT / entries[8]["path"]
    middle = navigation.build_block(8, entries, middle_source)
    require('data-lab-nav="previous"' in middle and 'data-lab-nav="next"' in middle, "middle Lab is not bidirectional")

    last_source = navigation.ROOT / entries[-1]["path"]
    last = navigation.build_block(len(entries) - 1, entries, last_source)
    require('data-lab-nav="previous"' in last, "last Lab is missing its previous link")
    require('data-lab-nav="next"' not in last, "last Lab received a next link")

    sample = "# Fixture\n\n" + first + "\n"
    require(navigation.replace_block(sample, first) == sample, "generator is not idempotent")

    legacy = '''# Fixture\n\n<!-- chapter-navigation:start -->\n<hr>\n<nav class="chapter-navigation" aria-label="Lab navigation">old</nav>\n<!-- chapter-navigation:end -->\n'''
    migrated = navigation.replace_block(legacy, first)
    require(navigation.START in migrated and "chapter-navigation:start" not in migrated, "legacy Lab marker was not migrated")

    href = navigation.relative_href(Path("book/labs/a.md"), Path("book/labs/b.md"))
    require(href == "b.md", f"unexpected relative Lab href: {href}")

    print("LAB_NAVIGATION_TESTS_OK fixtures=6")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
