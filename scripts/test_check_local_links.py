"""Regression fixtures for local-link scanning boundaries."""

from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory

import check_local_links as links


def write_broken_markdown(directory: Path) -> None:
    (directory / "broken.md").write_text("[broken](missing.md)\n", encoding="utf-8")


def write_visible_fixture(directory: Path) -> None:
    (directory / "target.md").write_text("# target\n", encoding="utf-8")
    (directory / "visible.md").write_text("[target](target.md)\n", encoding="utf-8")


def main() -> int:
    for prefix in ("._site-build-link-fixture-", "._site-previous-link-fixture-"):
        with TemporaryDirectory(prefix="local-links-fixture-") as temporary:
            fixture_root = Path(temporary)
            transient = fixture_root / f"{prefix}case"
            transient.mkdir()
            write_broken_markdown(transient)
            write_visible_fixture(fixture_root)
            if links.main(fixture_root) != 0:
                raise AssertionError(f"transient Pages directory was scanned: {prefix}")
    print("LOCAL_LINKS_TESTS_OK fixtures=2")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
