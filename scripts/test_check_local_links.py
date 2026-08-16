"""Regression fixtures for local-link scanning boundaries."""

from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory

import check_local_links as links


def write_broken_markdown(directory: Path) -> None:
    (directory / "broken.md").write_text("[broken](missing.md)\n", encoding="utf-8")


def main() -> int:
    for prefix in ("._site-build-link-fixture-", "._site-previous-link-fixture-"):
        with TemporaryDirectory(prefix=prefix, dir=links.ROOT) as temporary:
            write_broken_markdown(Path(temporary))
            if links.main() != 0:
                raise AssertionError(f"transient Pages directory was scanned: {prefix}")
    print("LOCAL_LINKS_TESTS_OK fixtures=2")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
