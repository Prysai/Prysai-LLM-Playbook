"""Fixtures for the homepage Reader fragment validator."""

from __future__ import annotations

import tempfile
from pathlib import Path

import validate_homepage_reader_fragments as validator


ROOT = validator.ROOT


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def homepage_with(href: str, directory: Path) -> Path:
    homepage = directory / "index.html"
    homepage.write_text(f'<a href="{href}">route</a>\n', encoding="utf-8")
    return homepage


def main() -> int:
    require(
        validator.validate_homepage_fragments() == [],
        "the checked-in homepage contains an invalid Reader fragment",
    )
    require(
        validator.validate_book_fragments() == [],
        "a reader-facing Markdown fragment is not rendered by its source",
    )

    with tempfile.TemporaryDirectory(dir=ROOT) as temporary:
        directory = Path(temporary)
        source = directory / "anchors.md"
        source.write_text(
            "# Anchor fixture\n\n<span id=\"known-anchor\"></span>\n",
            encoding="utf-8",
        )
        target = source.relative_to(ROOT).as_posix().replace("/", "%2F")
        homepage = homepage_with(
            f"reader.html?path={target}&amp;lang=en#known-anchor",
            directory,
        )
        require(
            validator.validate_homepage_fragments(homepage) == [],
            "an explicit span anchor was rejected",
        )

        source.write_text(
            "# Route B — one observable non-language skill\n",
            encoding="utf-8",
        )
        homepage = homepage_with(
            f"reader.html?path={target}&amp;lang=en#route-b-one-observable-non-language-skill",
            directory,
        )
        require(
            validator.validate_homepage_fragments(homepage) == [],
            "a Reader-generated heading slug was rejected",
        )

        source.write_text("# Repeat\n\n# Repeat\n", encoding="utf-8")
        homepage = homepage_with(
            f"reader.html?path={target}&amp;lang=en#repeat-2",
            directory,
        )
        require(
            validator.validate_homepage_fragments(homepage) == [],
            "duplicate heading slugs did not receive the Reader suffix",
        )

        homepage = homepage_with(
            f"reader.html?path={target}&amp;lang=en#missing-fragment",
            directory,
        )
        errors = validator.validate_homepage_fragments(homepage)
        require(len(errors) == 1 and "missing-fragment" in errors[0], "a missing fragment was accepted")

        homepage = homepage_with(
            "reader.html?path=missing%2Fsource.md&amp;lang=en#repeat-2",
            directory,
        )
        errors = validator.validate_homepage_fragments(homepage)
        require(len(errors) == 1 and "does not exist" in errors[0], "a missing source was accepted")

        homepage = homepage_with(
            f"reader.html?path={target}&amp;lang=en#route-b--one-observable-non-language-skill",
            directory,
        )
        errors = validator.validate_homepage_fragments(homepage)
        require(
            len(errors) == 1 and "route-b--one" in errors[0],
            "the retired double-hyphen Route B fragment was accepted",
        )

        homepage = homepage_with(
            f"reader.html?path={target}&amp;lang=en#repeat%2D2",
            directory,
        )
        require(
            validator.validate_homepage_fragments(homepage) == [],
            "URL-encoded fragments or HTML entities were not decoded",
        )

        source.write_text(
            "# Primera tarea en ChatGPT\n\n[Jump](#chatgpt-first-task)\n",
            encoding="utf-8",
        )
        errors, checked = validator._validate_markdown_file(source, directory)
        require(checked == 1 and errors, "a localized heading silently accepted an English fragment")
        source.write_text(
            '<span id="chatgpt-first-task"></span>\n\n'
            "# Primera tarea en ChatGPT\n\n[Jump](#chatgpt-first-task)\n",
            encoding="utf-8",
        )
        errors, checked = validator._validate_markdown_file(source, directory)
        require(checked == 1 and not errors, "an explicit stable fragment was rejected")

        source.write_text(
            '<span id="chatgpt-first-task"></span>\n'
            '<span id="chatgpt-first-task"></span>\n'
            "# Primera tarea en ChatGPT\n\n[Jump](#chatgpt-first-task)\n",
            encoding="utf-8",
        )
        errors, checked = validator._validate_markdown_file(source, directory)
        require(
            checked == 1 and any("duplicate authored IDs" in error for error in errors),
            "duplicate authored Reader IDs were accepted",
        )

    print("HOMEPAGE_READER_FRAGMENT_TESTS_OK fixtures=10")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
