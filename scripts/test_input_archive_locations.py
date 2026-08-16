"""Regression checks for portable local source-archive discovery."""

from __future__ import annotations

import os
from pathlib import Path
from unittest.mock import patch

import input_archive_locations as locations


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    explicit_paths, explicit_dir, explicit_source = locations.archive_paths(
        "E:/project-inputs"
    )
    require(explicit_dir == Path("E:/project-inputs"), "explicit archive directory changed")
    require(explicit_source == "command_line", "explicit archive directory lost precedence")
    require(
        explicit_paths["S01"]
        == Path("E:/project-inputs/codex-orange-book-main.zip"),
        "S01 filename changed",
    )
    require(
        set(explicit_paths) == {"S01", "S02", "S03", "S04", "S05", "S06"},
        "source ID set changed",
    )

    with patch.dict(os.environ, {locations.ENVIRONMENT_VARIABLE: "F:/shared-inputs"}, clear=False):
        environment_paths, environment_dir, environment_source = locations.archive_paths()
    require(environment_dir == Path("F:/shared-inputs"), "environment archive directory ignored")
    require(environment_source == "environment", "environment source was not recorded")
    require(
        environment_paths["S06"]
        == Path("F:/shared-inputs/awesome-codex-skills-master.zip"),
        "S06 filename changed",
    )

    with patch.dict(os.environ, {locations.ENVIRONMENT_VARIABLE: ""}, clear=False):
        unconfigured_paths, default_dir, default_source = locations.archive_paths()
    require(default_dir is None, "archive directory must require explicit configuration")
    require(default_source == "not_configured", "missing configuration was not recorded")
    require(
        all(path is None for path in unconfigured_paths.values()),
        "unconfigured archives must not imply a local path",
    )
    require("--archive-dir" in locations.archive_location_hint(), "portable command hint is missing")

    print("INPUT_ARCHIVE_LOCATIONS_TESTS_OK cases=4")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
