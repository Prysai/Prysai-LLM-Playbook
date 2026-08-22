"""Regression fixtures for the locale validator's reader-entry matcher."""

from __future__ import annotations

import validate_localization as validator


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    require(validator.README_RE.fullmatch("README-FR.md"), "French root README was not recognized")
    require(validator.README_RE.fullmatch("book/README-ZHTW.md"), "Traditional Chinese book README was not recognized")
    require(
        validator.LOCALIZED_ENTRY_RE.fullmatch("book/preface-FR.md"),
        "French preface was not recognized as a localized entry page",
    )
    require(
        validator.LOCALIZED_ENTRY_RE.fullmatch("book/table-of-contents-ZHTW.md"),
        "Traditional Chinese table of contents was not recognized as a localized entry page",
    )
    require(
        validator.LOCALIZED_ENTRY_RE.fullmatch("book/preface-EN.md"),
        "English preface should be recognized by the shared entry matcher",
    )
    print("LOCALIZATION_VALIDATOR_TESTS_OK fixtures=5")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
