"""Regression fixtures for teaching-card catalog validation."""

from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory

import validate_teaching_assets as assets


SVG = """<svg viewBox=\"0 0 1600 900\"><title>Card title</title><desc>Card description</desc></svg>"""
SITE_INDEX = (
    '<a href="../assets/teaching/README.md"><strong>{count}</strong>'
    '<span data-i18n="mobileIndexVisuals">teaching boards</span></a>\n'
)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def write_fixture(root: Path, *, catalog: str, register: str, site_count: int = 1, svg: str = SVG) -> tuple[Path, Path, Path, Path]:
    teaching = root / "assets" / "teaching"
    teaching.mkdir(parents=True)
    (teaching / "card.svg").write_text(svg, encoding="utf-8")
    catalog_path = teaching / "README.md"
    catalog_path.write_text(catalog, encoding="utf-8")
    register_path = root / "docs" / "sources" / "asset-register.md"
    register_path.parent.mkdir(parents=True)
    register_path.write_text(register, encoding="utf-8")
    site_index = root / "site" / "index.html"
    site_index.parent.mkdir()
    site_index.write_text(SITE_INDEX.format(count=site_count), encoding="utf-8")
    return teaching, catalog_path, register_path, site_index


def main() -> int:
    with TemporaryDirectory(prefix="prysai-teaching-asset-fixture-") as temporary:
        root = Path(temporary)
        teaching, catalog, register, site_index = write_fixture(
            root,
            catalog="- [Card](card.svg)\n",
            register="| S1 | `assets/teaching/card.svg` | original |\n",
        )
        require(not assets.validate(teaching, catalog, register, site_index), "valid teaching card was rejected")

        teaching, catalog, register, site_index = write_fixture(
            root / "missing-catalog",
            catalog="- [Other](other.svg)\n",
            register="| S1 | `assets/teaching/card.svg` | original |\n",
        )
        errors = assets.validate(teaching, catalog, register, site_index)
        require(any("missing from assets/teaching/README.md" in error for error in errors), "missing catalog card was accepted")

        teaching, catalog, register, site_index = write_fixture(
            root / "missing-register",
            catalog="- [Card](card.svg)\n",
            register="| S1 | `assets/teaching/other.svg` | original |\n",
        )
        errors = assets.validate(teaching, catalog, register, site_index)
        require(any("missing from docs/sources/asset-register.md" in error for error in errors), "missing source record was accepted")

        teaching, catalog, register, site_index = write_fixture(
            root / "missing-description",
            catalog="- [Card](card.svg)\n",
            register="| S1 | `assets/teaching/card.svg` | original |\n",
            svg="<svg viewBox=\"0 0 1600 900\"><title>Card title</title></svg>",
        )
        errors = assets.validate(teaching, catalog, register, site_index)
        require(any("missing SVG <desc>" in error for error in errors), "missing SVG description was accepted")

        teaching, catalog, register, site_index = write_fixture(
            root / "stale-mobile-count",
            catalog="- [Card](card.svg)\n",
            register="| S1 | `assets/teaching/card.svg` | original |\n",
            site_count=16,
        )
        errors = assets.validate(teaching, catalog, register, site_index)
        require(any("mobile teaching-board count 16 does not match 1" in error for error in errors), "stale mobile count was accepted")

        matrix_root = root / "matrix"
        teaching, catalog, register, site_index = write_fixture(
            matrix_root,
            catalog="- [Card](card.svg)\n",
            register="| S1 | `assets/teaching/card.svg` | original |\n",
        )
        for locale in assets.EXPECTED_VISUAL_LOCALES[1:]:
            variant_dir = teaching / "locales" / locale
            variant_dir.mkdir(parents=True)
            (variant_dir / "card.svg").write_text(SVG, encoding="utf-8")
        matrix = matrix_root / "docs" / "governance" / "visual-locale-matrix.yaml"
        matrix.parent.mkdir(parents=True)
        matrix.write_text(
            """locales:\n  - en\n  - zh\n  - es\n  - ja\n  - ko\n  - de\n  - zh-tw\n  - fr\nlocalized:\n  assets:\n    - card.svg\n  locale_variants: 7\nfallback:\n  asset_count: 0\n""",
            encoding="utf-8",
        )
        errors = assets.validate(teaching, catalog, register, site_index, matrix)
        require(not errors, f"valid visual locale matrix was rejected: {errors}")

    print("TEACHING_ASSET_CATALOG_TESTS_OK fixtures=6")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
