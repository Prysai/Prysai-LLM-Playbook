"""Validate the discoverability, provenance path, and minimal SVG text alternatives of teaching cards."""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIRECTORY = ROOT / "assets" / "teaching"
CATALOG = ASSET_DIRECTORY / "README.md"
SOURCE_REGISTER = ROOT / "docs" / "sources" / "asset-register.md"
SITE_INDEX = ROOT / "site" / "index.html"
VISUAL_MATRIX = ROOT / "docs" / "governance" / "visual-locale-matrix.yaml"
EXPECTED_VISUAL_LOCALES = ["en", "zh", "es", "ja", "ko", "de", "zh-tw", "fr"]
LOCALIZED_README_VISUAL = "foundation-first-visit-route-red-black.svg"
LOCALIZED_READMES = {
    "zh": "README-ZH.md",
    "es": "README-ES.md",
    "ja": "README-JA.md",
    "ko": "README-KO.md",
    "de": "README-DE.md",
    "zh-tw": "README-ZHTW.md",
    "fr": "README-FR.md",
}
LOCALE_SUFFIXES = {
    "ZH": "zh",
    "ES": "es",
    "JA": "ja",
    "KO": "ko",
    "DE": "de",
    "ZHTW": "zh-tw",
    "FR": "fr",
}
STABLE_VISUAL_TEXT = {
    "LLM", "Codex", "Skill", "Agent", "PRYSAI LAB", "diff", "log", "candidate",
    "blocked", "unknown", "TOKEN", "CONTEXT", "WINDOW", "PROMPT", "RESPONSE",
    "TOOL / AGENT", "MATERIAL", "02 / MATERIAL", "04 / DIRECTION",
}

TITLE_RE = re.compile(r"<title(?:\s|>)", re.IGNORECASE)
DESCRIPTION_RE = re.compile(r"<desc(?:\s|>)", re.IGNORECASE)
VIEWBOX_RE = re.compile(r"<svg\b[^>]*\bviewBox\s*=", re.IGNORECASE)
VIEWBOX_VALUE_RE = re.compile(r'<svg\b[^>]*\bviewBox\s*=\s*"([^"]+)"', re.IGNORECASE)
TEXT_NODE_RE = re.compile(r"<text\b[^>]*>(.*?)</text>", re.IGNORECASE | re.DOTALL)
MOBILE_TEACHING_BOARD_COUNT_RE = re.compile(
    r'<a\s+href="\.\./assets/teaching/README\.md"><strong>(?P<count>\d+)</strong>'
    r'<span\s+data-i18n="mobileIndexVisuals">',
    re.IGNORECASE,
)


def _svg_nodes(svg: str) -> tuple[str, list[str]]:
    viewbox = VIEWBOX_VALUE_RE.search(svg)
    nodes = [re.sub(r"\s+", " ", value).strip() for value in TEXT_NODE_RE.findall(svg)]
    return (viewbox.group(1) if viewbox else "", nodes)


def _matrix_values(matrix_text: str) -> tuple[list[str], list[str], int]:
    locales_match = re.search(r"^locales:\s*\n((?:^  - .+\n?)+)", matrix_text, re.MULTILINE)
    assets_match = re.search(r"^  assets:\s*\n((?:^    - .+\n?)+)", matrix_text, re.MULTILINE)
    variants_match = re.search(r"^  locale_variants:\s*(\d+)\s*$", matrix_text, re.MULTILINE)
    locales = re.findall(r"^  -\s+([^\s#]+)", locales_match.group(1), re.MULTILINE) if locales_match else []
    localized = re.findall(r"^    -\s+([^\s#]+)", assets_match.group(1), re.MULTILINE) if assets_match else []
    variants = int(variants_match.group(1)) if variants_match else 0
    return locales, localized, variants


def _validate_visual_matrix(asset_directory: Path, matrix: Path) -> list[str]:
    errors: list[str] = []
    try:
        matrix_text = matrix.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"cannot read visual locale matrix: {exc}"]
    locales, localized, variants = _matrix_values(matrix_text)
    expected_locales = EXPECTED_VISUAL_LOCALES
    if locales != expected_locales:
        errors.append(f"visual locale matrix: expected locales {expected_locales}, got {locales}")
    source_assets = {asset.name for asset in asset_directory.glob("*.svg")}
    unknown = sorted(set(localized) - source_assets)
    if unknown:
        errors.append(f"visual locale matrix: unknown localized assets {unknown}")
    if variants != len(expected_locales) - 1:
        errors.append(f"visual locale matrix: locale_variants must be {len(expected_locales) - 1}, got {variants}")
    expected_fallback = len(source_assets) - len(set(localized))
    fallback_match = re.search(r"^  asset_count:\s*(\d+)\s*$", matrix_text, re.MULTILINE)
    if not fallback_match or int(fallback_match.group(1)) != expected_fallback:
        actual = fallback_match.group(1) if fallback_match else "missing"
        errors.append(f"visual locale matrix: fallback asset_count {actual} does not match {expected_fallback}")
    for asset_name in localized:
        source_path = asset_directory / asset_name
        source_svg = source_path.read_text(encoding="utf-8")
        source_viewbox, source_nodes = _svg_nodes(source_svg)
        for locale in locales[1:]:
            variant = asset_directory / "locales" / locale / asset_name
            if not variant.is_file():
                errors.append(f"{asset_name} / {locale}: missing localized SVG")
                continue
            variant_svg = variant.read_text(encoding="utf-8")
            viewbox, nodes = _svg_nodes(variant_svg)
            if viewbox != source_viewbox:
                errors.append(f"{asset_name} / {locale}: viewBox differs from source")
            if len(nodes) != len(source_nodes):
                errors.append(f"{asset_name} / {locale}: text-node count differs from source")
            for index, (source_node, variant_node) in enumerate(zip(source_nodes, nodes), 1):
                if not variant_node:
                    errors.append(f"{asset_name} / {locale}: text node {index} is empty")
                if variant_node == source_node and not (
                    source_node.isdigit() or re.match(r"^\d{2}\s*/", source_node)
                    or source_node in STABLE_VISUAL_TEXT
                ):
                    errors.append(f"{asset_name} / {locale}: text node {index} remains unchanged English")
    return errors


def validate_localized_readme_visuals(
    root: Path, localized_assets: set[str] | None = None
) -> list[str]:
    """Require the localized first-visit board in every translated root README.

    GitHub renders these Markdown files without the Reader's JavaScript locale
    resolver.  The entry visual therefore needs an explicit locale path in the
    source Markdown; otherwise a reader opening ``README-ZH.md`` still sees an
    English SVG even though the Reader itself can resolve a localized variant.
    The check is intentionally limited to one high-value orientation board so
    the README remains a route, not an image catalogue.
    """
    root = root.resolve()
    if localized_assets is not None and LOCALIZED_README_VISUAL not in localized_assets:
        return []

    errors: list[str] = []
    for locale, filename in LOCALIZED_READMES.items():
        readme = root / filename
        label = readme.relative_to(root).as_posix()
        if not readme.is_file():
            errors.append(f"{label}: missing localized README for visual entry")
            continue
        try:
            text = readme.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            errors.append(f"{label}: cannot read localized README: {exc}")
            continue

        expected_path = f"assets/teaching/locales/{locale}/{LOCALIZED_README_VISUAL}"
        source_path = f"assets/teaching/{LOCALIZED_README_VISUAL}"
        if re.search(
            rf"!\[[^\]]*\]\({re.escape(source_path)}(?:#[^)]*)?\)", text
        ):
            errors.append(
                f"{label}: translated README uses the English source visual directly"
            )
        image_pattern = re.compile(
            rf"!\[(?P<alt>[^\]]+)\]\({re.escape(expected_path)}(?:#[^)]*)?\)"
        )
        match = image_pattern.search(text)
        if not match:
            errors.append(
                f"{label}: missing locale-specific visual path {expected_path}"
            )
            continue
        if not match.group("alt").strip():
            errors.append(f"{label}: localized visual has empty alt text")

    return errors


def validate_localized_markdown_visuals(
    root: Path, localized_assets: set[str]
) -> list[str]:
    """Ensure translated Markdown uses an available locale SVG directly.

    The Reader can swap an image at runtime, but GitHub renders Markdown
    without that JavaScript.  Any translated chapter, route, guide, or Lab that
    embeds one of the reviewed boards must therefore point at its own locale
    variant in source.  Boards without a reviewed variant remain an explicit
    English fallback and are intentionally left alone.
    """
    root = root.resolve()
    if not localized_assets:
        return []

    errors: list[str] = []
    suffix_pattern = re.compile(r"-(ZH|ES|JA|KO|DE|ZHTW|FR)\.md$", re.IGNORECASE)
    image_pattern = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
    ignored_directories = {".git", ".work", ".codex-temp", "node_modules", "_site", "tmp", "output", ".pytest_cache"}
    markdown_paths: list[Path] = []
    for current_root, directories, filenames in os.walk(root):
        directories[:] = [directory for directory in directories if directory not in ignored_directories]
        current = Path(current_root)
        markdown_paths.extend(current / filename for filename in filenames if filename.endswith(".md"))
    for path in markdown_paths:
        match = suffix_pattern.search(path.name)
        if not match:
            continue
        locale = LOCALE_SUFFIXES[match.group(1).upper()]
        text = path.read_text(encoding="utf-8")
        for image_match in image_pattern.finditer(text):
            target = image_match.group(1).split("#", 1)[0].split("?", 1)[0].strip().strip("<>")
            if not target or target.startswith(("http://", "https://", "data:")):
                continue
            resolved = (path.parent / target).resolve()
            source_root = (root / "assets" / "teaching").resolve()
            localized_root = (source_root / "locales").resolve()
            try:
                source_relative = resolved.relative_to(source_root)
            except ValueError:
                continue
            parts = source_relative.parts
            if not parts:
                continue
            if parts[0] == "locales":
                if len(parts) < 3:
                    continue
                referenced_locale = parts[1]
                asset = parts[-1]
                expected = (localized_root / locale / asset).resolve()
                if referenced_locale != locale and asset in localized_assets:
                    errors.append(
                        f"{path.relative_to(root).as_posix()}: visual {asset} uses locale {referenced_locale}, expected {locale}"
                    )
                elif asset in localized_assets and resolved != expected:
                    errors.append(
                        f"{path.relative_to(root).as_posix()}: visual {asset} does not resolve to {expected.relative_to(root).as_posix()}"
                    )
                continue
            asset = parts[-1]
            if asset in localized_assets:
                expected = (localized_root / locale / asset).resolve()
                errors.append(
                    f"{path.relative_to(root).as_posix()}: visual {asset} uses English source; expected {expected.relative_to(root).as_posix()}"
                )
    return errors


def validate(asset_directory: Path, catalog: Path, source_register: Path, site_index: Path, matrix: Path | None = None) -> list[str]:
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
    if matrix is not None and matrix.exists():
        errors.extend(_validate_visual_matrix(asset_directory, matrix))
        try:
            matrix_text = matrix.read_text(encoding="utf-8")
            _, localized_assets, _ = _matrix_values(matrix_text)
            repository_root = asset_directory.parent.parent
            if any((repository_root / filename).is_file() for filename in LOCALIZED_READMES.values()):
                errors.extend(
                    validate_localized_readme_visuals(repository_root, set(localized_assets))
                )
                errors.extend(
                    validate_localized_markdown_visuals(repository_root, set(localized_assets))
                )
        except (OSError, UnicodeError):
            # _validate_visual_matrix already reports an unreadable matrix.
            pass
    return errors


def main() -> int:
    errors = validate(ASSET_DIRECTORY, CATALOG, SOURCE_REGISTER, SITE_INDEX, VISUAL_MATRIX)
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
