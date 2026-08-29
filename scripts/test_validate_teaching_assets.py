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


def test_localized_maturity_text_fit() -> None:
    """Only the affected Spanish, German, and French ladder lines get fit constraints."""
    import build_localized_visual_assets as builder

    asset = "evidence-maturity-ladder-red-black.svg"
    fixture = "<svg>" + "".join(f"<text>{index}</text>" for index in range(1, 32)) + "</svg>"
    fitted = builder.constrain_localized_text(fixture, asset, "de")
    require('textLength="762"' in fitted, "node 4 lost its fixed-card width")
    require('textLength="648"' in fitted, "node 27 lost its fixed-card width")
    require('lengthAdjust="spacingAndGlyphs"' in fitted, "localized fitting lost its SVG fit mode")
    french = builder.constrain_localized_text(fixture, asset, "fr")
    require('textLength="762"' in french, "French node 4 lost its fixed-card width")
    require('textLength="648"' not in french, "French ladder received an unrelated German fit constraint")
    require('textLength="762"' in fitted, "German node 4 lost its fixed-card width")
    spanish = builder.constrain_localized_text(fixture, asset, "es")
    require('textLength="762"' in spanish, "Spanish node 4 lost its fixed-card width")
    require('textLength="648"' not in spanish, "Spanish ladder received an unrelated German fit constraint")
    japanese = builder.constrain_localized_text(fixture, asset, "ja")
    require("textLength=" not in japanese, "unaffected locale received a fit constraint")
    require("textLength=" not in builder.constrain_localized_text(fixture, asset, "en"), "English source was unexpectedly constrained")


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


def write_localized_readmes(root: Path, *, visual_path: str, use_english_source: bool = False) -> None:
    """Create the seven translated front doors used by the README visual gate."""
    readme_names = {
        "zh": "README-ZH.md",
        "es": "README-ES.md",
        "ja": "README-JA.md",
        "ko": "README-KO.md",
        "de": "README-DE.md",
        "zh-tw": "README-ZHTW.md",
        "fr": "README-FR.md",
    }
    for locale, filename in readme_names.items():
        readme = root / filename
        target = "assets/teaching/foundation-first-visit-route-red-black.svg" if use_english_source else visual_path.format(locale=locale)
        readme.write_text(f"![First visit route]({target})\n", encoding="utf-8")


def main() -> int:
    test_localized_maturity_text_fit()
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

        write_localized_readmes(
            matrix_root,
            visual_path="assets/teaching/locales/{locale}/foundation-first-visit-route-red-black.svg",
        )
        require(
            not assets.validate_localized_readme_visuals(
                matrix_root,
                {"foundation-first-visit-route-red-black.svg"},
            ),
            "locale-specific README visuals were rejected",
        )
        write_localized_readmes(
            matrix_root,
            visual_path="assets/teaching/locales/{locale}/foundation-first-visit-route-red-black.svg",
            use_english_source=True,
        )
        errors = assets.validate_localized_readme_visuals(
            matrix_root,
            {"foundation-first-visit-route-red-black.svg"},
        )
        require(
            any("uses the English source visual directly" in error for error in errors),
            "English source visual in translated README was accepted",
        )

        markdown_root = matrix_root / "book" / "chapters"
        markdown_root.mkdir(parents=True)
        (markdown_root / "example-ZH.md").write_text(
            "![Card](../../assets/teaching/locales/zh/card.svg)\n",
            encoding="utf-8",
        )
        require(
            not assets.validate_localized_markdown_visuals(matrix_root, {"card.svg"}),
            "locale-specific Markdown visual was rejected",
        )
        (markdown_root / "example-ZH.md").write_text(
            "![Card](../../assets/teaching/card.svg)\n",
            encoding="utf-8",
        )
        errors = assets.validate_localized_markdown_visuals(matrix_root, {"card.svg"})
        require(
            any("uses English source" in error for error in errors),
            "English source visual in translated Markdown was accepted",
        )

    print("TEACHING_ASSET_CATALOG_TESTS_OK fixtures=8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
