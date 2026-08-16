"""Resolve the optional local source-archive set without a machine-specific path."""

from __future__ import annotations

import os
from pathlib import Path


ENVIRONMENT_VARIABLE = "PRYSAI_INPUT_ARCHIVE_DIR"
ARCHIVE_FILENAMES = {
    "S01": "codex-orange-book-main.zip",
    "S02": "academic-research-skills-codex-main.zip",
    "S03": "awesome-agent-skills-main.zip",
    "S04": "marketingskills-main.zip",
    "S05": "agent-skills-main.zip",
    "S06": "awesome-codex-skills-master.zip",
}


def resolve_archive_dir(explicit_dir: str | Path | None = None) -> tuple[Path | None, str]:
    """Return an explicitly configured archive directory, if one exists.

    These source archives are optional local audit inputs, not repository
    assets. Requiring an explicit location prevents a maintainer's historical
    drive layout from becoming an undocumented prerequisite for contributors
    or CI.
    """

    if explicit_dir is not None:
        return Path(explicit_dir).expanduser(), "command_line"
    from_environment = os.environ.get(ENVIRONMENT_VARIABLE, "").strip()
    if from_environment:
        return Path(from_environment).expanduser(), "environment"
    return None, "not_configured"


def archive_paths(
    explicit_dir: str | Path | None = None,
) -> tuple[dict[str, Path | None], Path | None, str]:
    """Return the six expected source IDs with no filesystem side effects."""

    directory, source = resolve_archive_dir(explicit_dir)
    paths = {
        source_id: directory / filename if directory is not None else None
        for source_id, filename in ARCHIVE_FILENAMES.items()
    }
    return paths, directory, source


def archive_location_hint() -> str:
    """Return one copyable way to supply archives on another machine."""

    return f"set {ENVIRONMENT_VARIABLE} or pass --archive-dir <directory>"
