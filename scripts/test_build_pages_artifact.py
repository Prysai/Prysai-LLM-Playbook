"""Negative fixtures for the bounded Pages artifact builder."""

from __future__ import annotations

import os
from pathlib import Path
from tempfile import TemporaryDirectory

from build_pages_artifact import artifact_secret_findings, source_symlinks


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    with TemporaryDirectory(prefix="pages-artifact-fixtures-") as temporary:
        artifact = Path(temporary) / "artifact"
        artifact.mkdir()
        safe = artifact / "notes.md"
        safe.write_text(
            "A token is a concept. Hash abcdef0123456789 and UUID 123e4567-e89b-12d3-a456-426614174000 are not credentials.\n",
            encoding="utf-8",
        )
        require(not artifact_secret_findings(artifact), "ordinary teaching text was treated as a credential")

        redacted = artifact / "redacted.md"
        redacted.write_text("Example only: ghp_[redacted] and sk-REDACTED are not live credentials.\n", encoding="utf-8")
        require(not artifact_secret_findings(artifact), "redacted examples were treated as credentials")

        for name, value, rule in (
            ("github.md", "ghp_abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH", "github-classic-token"),
            ("provider.md", "sk-ant-abcdefghijklmnopqrstuvwxyz1234567890", "anthropic-api-key"),
            ("key.txt", "-----BEGIN PRIVATE KEY-----", "private-key"),
        ):
            fixture = artifact / name
            fixture.write_text(value, encoding="utf-8")
            findings = artifact_secret_findings(artifact)
            require(any(item == f"{rule}:{name}" for item in findings), f"{rule} was not detected")
            require(all(value not in item for item in findings), f"{rule} finding exposed the credential value")
            fixture.unlink()

        source = Path(temporary) / "source"
        source.mkdir()
        outside = Path(temporary) / "outside.txt"
        outside.write_text("outside", encoding="utf-8")
        link = source / "outside-link.txt"
        try:
            os.symlink(outside, link)
        except OSError:
            # Some Windows configurations restrict symlink creation. Linux CI
            # exercises the negative fixture; the checked-in source still runs
            # the production symlink scan on every platform.
            pass
        else:
            require(source_symlinks([source]) == ["source/outside-link.txt"], "published source symlink was not found")

    print("PAGES_ARTIFACT_TESTS_OK fixtures=5 secret-patterns=3 symlink=guarded")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
