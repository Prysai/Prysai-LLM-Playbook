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
NAVIGATION_FILE = ROOT / "docs/governance/book-navigation.yaml"
TITLE_MAP_FILE = ROOT / "book/title-map.json"
LAB_NAVIGATION_FILE = ROOT / "docs/governance/lab-navigation.yaml"
SKILL_REGISTRY_FILE = ROOT / "docs/governance/skill-registry.yaml"
OUTPUT_FILE = ROOT / "site/locale-manifest.js"
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE")
ROUTED_STATUS_SECTIONS = ("chapters", "labs")
READER_PRESENTATION = {
    "chapter": ("chapter", "index.html"),
    "lab": ("lab", "index.html#labs"),
    "skill": ("skill", "index.html#skills"),
    "field-note": ("field-note", "index.html#field-research"),
}


def reader_presentation(kind: str | None) -> tuple[str, str]:
    """Map governed content kinds to the Reader's small presentation vocabulary."""

    return READER_PRESENTATION.get(str(kind), ("project-document", "index.html"))


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
    kind = item.get("kind")
    reader_type, overview_target = reader_presentation(kind)
    return {
        "kind": kind,
        "reader_type": reader_type,
        "overview_target": overview_target,
        "stem": item.get("stem"),
        "source_locale": str(item.get("source_locale", "EN")).lower(),
        "legacy_paths": legacy_paths,
        "locales": localized,
    }


def neutral_content(content_id: str, kind: str, path: str, status: str, path_index: dict[str, str], source_revision: str) -> dict[str, Any]:
    """Build one English source identity with explicit fallback records."""

    source_path = normalize(path)
    localized = {}
    for suffix in LOCALES:
        token = suffix.lower()
        localized[token] = {
            "path": source_path,
            "exists": (ROOT / source_path).is_file(),
            "content_status": status,
            "translation_status": "source" if suffix == "EN" else "not-started",
            "source_revision": source_revision,
        }
    add_path_index(path_index, source_path, content_id)
    reader_type, overview_target = reader_presentation(kind)
    return {"kind": kind, "reader_type": reader_type, "overview_target": overview_target, "stem": stem_from_path(source_path), "source_locale": "en", "legacy_paths": [], "locales": localized}


def status_content(
    item: dict[str, Any],
    kind: str,
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
    reader_type, overview_target = reader_presentation(kind)
    return content_id, {
        "kind": kind,
        "reader_type": reader_type,
        "overview_target": overview_target,
        "stem": stem,
        "source_locale": "en" if has_english_source else "zh",
        "legacy_paths": legacy_paths,
        "locales": localized,
    }


def build_navigation_payload(
    navigation: dict[str, Any],
    path_index: dict[str, str],
    title_records: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    """Project the canonical chapter order into the reader manifest.

    The navigation contract remains the source of truth. The public reader
    receives only the stable labels, order, paths, and content identities it
    needs to render a sidebar and adjacent-chapter controls.
    """

    chapters: list[dict[str, Any]] = []
    for item in navigation.get("chapters", []):
        if not isinstance(item, dict):
            raise ValueError("book navigation chapters must contain objects")
        legacy_path = normalize(str(item["legacy_path"]))
        english_path = item.get("english_path")
        if english_path:
            english_path = normalize(str(english_path))
        content_id = path_index.get(english_path or legacy_path) or path_index.get(legacy_path)
        if not content_id:
            raise ValueError(
                f"book navigation chapter is not indexed: {item.get('id')}"
            )
        title = title_records.get(str(item["id"]))
        if not title:
            raise ValueError(f"book title map is missing chapter: {item['id']}")
        chapters.append(
            {
                "id": item["id"],
                "number": item["number"],
                "part": item["part"],
                "title_en": title["display"]["en"],
                "title_zh": title["display"]["zh"],
                "canonical_title_en": title["canonical"]["en"],
                "canonical_title_zh": title["canonical"]["zh"],
                "english_path": english_path,
                "legacy_path": legacy_path,
                "english_status": item.get("english_status"),
                "status": item.get("status"),
                "content_id": content_id,
            }
        )
    return {
        "parts": navigation.get("parts", []),
        "chapters": chapters,
    }


def build_lab_navigation_payload(
    navigation: dict[str, Any],
    path_index: dict[str, str],
) -> dict[str, Any]:
    """Project Lab browsing order without importing progression semantics."""

    labs: list[dict[str, Any]] = []
    for item in navigation.get("labs", []):
        if not isinstance(item, dict):
            raise ValueError("Lab navigation entries must contain objects")
        path = normalize(str(item["path"]))
        content_id = path_index.get(path)
        if not content_id:
            raise ValueError(f"Lab navigation entry is not indexed: {item.get('id')}")
        labs.append(
            {
                "id": item["id"],
                "number": item["number"],
                "title": item["title"],
                "path": path,
                "content_id": content_id,
            }
        )
    return {
        "sequence_boundary": navigation.get("policy", {}).get("sequence_boundary"),
        "labs": labs,
    }


def build_manifest() -> dict[str, Any]:
    import build_book_title_map  # pylint: disable=import-outside-toplevel

    matrix = load_json(MATRIX_FILE)
    status = load_json(STATUS_FILE)
    navigation = load_json(NAVIGATION_FILE)
    title_map = build_book_title_map.load_title_map(TITLE_MAP_FILE)
    build_book_title_map.assert_current_title_map(title_map, navigation)
    title_records = build_book_title_map.records_by_id(title_map)
    lab_navigation = load_json(LAB_NAVIGATION_FILE)
    skill_registry = load_json(SKILL_REGISTRY_FILE)
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

    for item in matrix.get("reader_content", []):
        content_id = str(item["content_id"])
        if content_id in contents:
            raise ValueError(f"duplicate reader content identity: {content_id}")
        contents[content_id] = neutral_content(content_id, str(item["kind"]), str(item["path"]), str(item["content_status"]), path_index, "locale-matrix")

    status_skills = {str(item["id"]): item for item in status.get("skills", {}).get("items", [])}
    registry_skills = {str(item["id"]): item for item in skill_registry.get("records", [])}
    if set(status_skills) != set(registry_skills):
        raise ValueError("Skill registry and content status IDs must match")
    for content_id, item in registry_skills.items():
        path = f"{normalize(str(item['path']))}/SKILL.md"
        contents[content_id] = neutral_content(content_id, "skill", path, str(status_skills[content_id]["status"]), path_index, "skill-registry")

    aliases: dict[str, str] = {}
    for section in ROUTED_STATUS_SECTIONS:
        for item in status.get(section, {}).get("items", []):
            if not isinstance(item, dict) or not isinstance(item.get("id"), str):
                continue
            path = normalize(str(item.get("path", "")))
            content_id = path_index.get(path)
            if not content_id:
                content_id, contents[content_id] = status_content(item, "chapter" if section == "chapters" else "lab", locale_records, path_index)
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
            "docs/governance/book-navigation.yaml",
            "book/title-map.json",
            "docs/governance/lab-navigation.yaml",
            "docs/governance/skill-registry.yaml",
        ],
        "default_locale": "en",
        "locales": locales,
        "contents": contents,
        "aliases": aliases,
        "path_index": path_index,
        "routed_status_counts": routed_counts,
        "book_navigation": build_navigation_payload(navigation, path_index, title_records),
        "lab_navigation": build_lab_navigation_payload(lab_navigation, path_index),
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
    except (OSError, UnicodeError, KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
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

    OUTPUT_FILE.write_text(expected, encoding="utf-8")
    print(f"SITE_LOCALE_MANIFEST_BUILT output={OUTPUT_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
