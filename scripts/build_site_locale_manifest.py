"""Build the public site's locale/content identity manifest."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MATRIX_FILE = ROOT / "docs/governance/locale-matrix.yaml"
STATUS_FILE = ROOT / "docs/governance/content-status.yaml"
OUTPUT_FILE = ROOT / "site/locale-manifest.js"
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE")
ROUTED_STATUS_SECTIONS = ("chapters", "labs")


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize(path: str) -> str:
    return path.replace("\\", "/").lstrip("./")


def stem_from_path(path: str) -> str:
    normalized = normalize(path)
    stem = normalized[:-3] if normalized.endswith(".md") else normalized
    for suffix in LOCALES:
        marker = f"-{suffix}"
        if stem.endswith(marker):
            return stem[: -len(marker)]
    return stem


def add_path_index(path_index: dict[str, str], path: str, content_id: str) -> None:
    existing = path_index.get(path)
    if existing and existing != content_id:
        raise ValueError(f"path belongs to multiple content identities: {path}")
    path_index[path] = content_id


def matrix_content(
    item: dict[str, Any],
    locale_records: dict[str, Any],
    path_index: dict[str, str],
) -> dict[str, Any]:
    content_id = item["content_id"]
    localized: dict[str, Any] = {}
    for suffix in LOCALES:
        record = item["locales"][suffix]
        path = normalize(record["path"])
        url_token = locale_records[suffix]["url_token"]
        localized[url_token] = {
            "path": path,
            "exists": (ROOT / path).is_file(),
            "content_status": record.get("content_status"),
            "translation_status": record.get("translation_status"),
            "source_revision": record.get("source_revision"),
        }
        add_path_index(path_index, path, content_id)
    legacy_paths = [normalize(path) for path in item.get("legacy_paths", [])]
    for path in legacy_paths:
        add_path_index(path_index, path, content_id)
    return {
        "kind": item.get("kind"),
        "stem": item.get("stem"),
        "legacy_paths": legacy_paths,
        "locales": localized,
    }


def status_content(
    item: dict[str, Any],
    locale_records: dict[str, Any],
    path_index: dict[str, str],
) -> tuple[str, dict[str, Any]]:
    """Build a route identity for a chapter/lab not yet in the locale matrix."""

    content_id = str(item["id"])
    source_path = normalize(str(item["path"]))
    stem = stem_from_path(source_path)
    has_english_source = source_path.endswith("-EN.md")
    legacy_paths = [] if has_english_source else [source_path]
    localized: dict[str, Any] = {}
    for suffix in LOCALES:
        url_token = locale_records[suffix]["url_token"]
        path = source_path if suffix == "EN" else f"{stem}-{suffix}.md"
        localized[url_token] = {
            "path": path,
            "exists": (ROOT / path).is_file(),
            "content_status": item.get("status"),
            "translation_status": "source" if suffix == "EN" and has_english_source else "migration-pending" if suffix == "EN" else "in-progress",
            "source_revision": "content-status",
        }
        add_path_index(path_index, path, content_id)
    for path in legacy_paths:
        add_path_index(path_index, path, content_id)
    return content_id, {
        "kind": "chapter" if str(item["id"]).startswith("chapter-") else "lab",
        "stem": stem,
        "legacy_paths": legacy_paths,
        "locales": localized,
    }


def build_manifest() -> dict[str, Any]:
    matrix = load_json(MATRIX_FILE)
    status = load_json(STATUS_FILE)
    locale_records = matrix["locales"]
    locales: dict[str, Any] = {}
    for suffix in LOCALES:
        record = locale_records[suffix]
        locales[record["url_token"]] = {
            "suffix": suffix,
            "url_token": record["url_token"],
            "html_lang": record["html_lang"],
            "display_name": record["display_name"],
        }

    contents: dict[str, Any] = {}
    path_index: dict[str, str] = {}
    for item in matrix["content"]:
        content_id = item["content_id"]
        contents[content_id] = matrix_content(item, locale_records, path_index)

    aliases: dict[str, str] = {}
    for section in ROUTED_STATUS_SECTIONS:
        for item in status.get(section, {}).get("items", []):
            if not isinstance(item, dict) or not isinstance(item.get("id"), str):
                continue
            path = normalize(str(item.get("path", "")))
            content_id = path_index.get(path)
            if not content_id:
                content_id, contents[content_id] = status_content(item, locale_records, path_index)
            aliases[item["id"]] = content_id

    routed_counts = {
        section: len(status.get(section, {}).get("items", []))
        for section in ROUTED_STATUS_SECTIONS
    }

    return {
        "schema_version": "1",
        "source": [
            "docs/governance/locale-matrix.yaml",
            "docs/governance/content-status.yaml",
        ],
        "default_locale": "en",
        "locales": locales,
        "contents": contents,
        "aliases": aliases,
        "path_index": path_index,
        "routed_status_counts": routed_counts,
    }


def render(manifest: dict[str, Any]) -> str:
    body = json.dumps(manifest, ensure_ascii=False, indent=2)
    return "/* Generated by scripts/build_site_locale_manifest.py. Do not edit by hand. */\n" f"window.CODEX_LOCALE_MANIFEST = {body};\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify the generated file without writing it")
    args = parser.parse_args()
    try:
        expected = render(build_manifest())
    except (OSError, UnicodeError, KeyError, TypeError, json.JSONDecodeError) as exc:
        print("SITE_LOCALE_MANIFEST_FAILED")
        print(f"- {exc}")
        return 1

    if args.check:
        if not OUTPUT_FILE.is_file() or OUTPUT_FILE.read_text(encoding="utf-8") != expected:
            print("SITE_LOCALE_MANIFEST_FAILED")
            print(f"- generated output is stale or missing: {OUTPUT_FILE.relative_to(ROOT)}")
            print("- run: python scripts/build_site_locale_manifest.py")
            return 1
        print(f"SITE_LOCALE_MANIFEST_OK locales={len(build_manifest()['locales'])}")
        return 0

    OUTPUT_FILE.write_text(expected, encoding="utf-8", newline="\n")
    print(f"SITE_LOCALE_MANIFEST_BUILT output={OUTPUT_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
