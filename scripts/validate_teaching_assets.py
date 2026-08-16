"""Validate the discoverability, provenance path, and minimal SVG text alternatives of teaching cards."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIRECTORY = ROOT / "assets" / "teaching"
CATALOG = ASSET_DIRECTORY / "README.md"
SOURCE_REGISTER = ROOT / "docs" / "sources" / "asset-register.md"
SITE_INDEX = ROOT / "site" / "index.html"

TITLE_RE = re.compile(r"<title(?:\s|>)", re.IGNORECASE)
DESCRIPTION_RE = re.compile(r"<desc(?:\s|>)", re.IGNORECASE)
VIEWBOX_RE = re.compile(r"<svg\b[^>]*\bviewBox\s*=", re.IGNORECASE)
MOBILE_TEACHING_BOARD_COUNT_RE = re.compile(
    r'<a\s+href="\.\./assets/teaching/README\.md"><strong>(?P<count>\d+)</strong>'
    r'<span\s+data-i18n="mobileIndexVisuals">',
    re.IGNORECASE,
)


def validate(asset_directory: Path, catalog: Path, source_register: Path, site_index: Path) -> list[str]:
    """Return catalog, source-path, site-count, and minimal SVG accessibility failures."""
    errors: list[str] = []
    try:
        catalog_text = catalog.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"cannot read teaching catalog: {exc}"]
    try:
        register_text = source_register.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"cannot read asset register: {exc}"]
    try:
        site_index_text = site_index.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"cannot read site index: {exc}"]

    assets = sorted(asset_directory.glob("*.svg"))
    if not assets:
        return ["no teaching SVG files found"]

    mobile_count = MOBILE_TEACHING_BOARD_COUNT_RE.search(site_index_text)
    if not mobile_count:
        errors.append("site/index.html: missing mobile teaching-board inventory link")
    elif int(mobile_count.group("count")) != len(assets):
        errors.append(
            "site/index.html: mobile teaching-board count "
            f"{mobile_count.group('count')} does not match {len(assets)} cataloged SVG cards"
        )

    for asset in assets:
        label = asset.relative_to(asset_directory).as_posix()
        try:
            svg = asset.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            errors.append(f"{label}: cannot read SVG: {exc}")
            continue
        if f"]({asset.name})" not in catalog_text:
            errors.append(f"{label}: missing from assets/teaching/README.md")
        if f"assets/teaching/{asset.name}" not in register_text:
            errors.append(f"{label}: missing from docs/sources/asset-register.md")
        if not TITLE_RE.search(svg):
            errors.append(f"{label}: missing SVG <title>")
        if not DESCRIPTION_RE.search(svg):
            errors.append(f"{label}: missing SVG <desc>")
        if not VIEWBOX_RE.search(svg):
            errors.append(f"{label}: missing SVG viewBox")
    return errors


def main() -> int:
    errors = validate(ASSET_DIRECTORY, CATALOG, SOURCE_REGISTER, SITE_INDEX)
    if errors:
        print("TEACHING_ASSET_CATALOG_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    asset_count = len(list(ASSET_DIRECTORY.glob("*.svg")))
    print(f"TEACHING_ASSET_CATALOG_OK assets={asset_count}")
    print("evidence_boundary=catalog-provenance-mobile-count-and-minimal-svg-text-alternatives; not-user-or-runtime-proof")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
