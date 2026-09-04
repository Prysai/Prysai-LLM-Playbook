"""Build the public site's locale/content identity manifest."""

from __future__ import annotations

import argparse
import json
import re
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
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")
LOCALE_KEYS = ("en", "zh", "es", "ja", "ko", "de", "zh-tw", "fr")
ROUTED_STATUS_SECTIONS = ("chapters", "labs")
RENDERABLE_TRANSLATION_STATUSES = {
    "source",
    "candidate",
    "in-progress",
    "verified",
    "production-ready",
}
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


def markdown_h1_title(path: str) -> str | None:
    """Return the first Markdown H1 for an existing localized source.

    Canonical Lab order and English labels remain in lab-navigation.yaml.
    A localized Lab's display label instead belongs to its own Markdown source,
    so an English-only navigation contract never has to carry translated text.
    """

    source = ROOT / path
    if not source.is_file():
        return None
    match = re.search(r"(?m)^#\s+(.+?)\s*$", source.read_text(encoding="utf-8"))
    return match.group(1).strip() if match else None


EXPLICIT_ANCHOR_RE = re.compile(
    r'<(?:a|span)\s+id="([a-z][a-z0-9-]*)"\s*></(?:a|span)>',
    re.IGNORECASE,
)


def explicit_anchors(path: str) -> list[str]:
    """Return authored Reader anchors that are safe deep-link contracts.

    A localized file can exist while containing only a subset of an English
    supplemental guide. Record explicit anchors, rather than guessing from a
    filename or a translated heading, so the public site never promises a
    precise local destination that the Reader cannot render.
    """

    source = ROOT / path
    if not source.is_file():
        return []
    return sorted(set(EXPLICIT_ANCHOR_RE.findall(source.read_text(encoding="utf-8"))))


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
            "coverage": record.get("coverage"),
            "source_revision": record.get("source_revision"),
            "explicit_anchors": explicit_anchors(path),
        }
        if item.get("kind") == "lab":
            title = markdown_h1_title(path)
            if title:
                localized[url_token]["title"] = title
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


def neutral_content(
    content_id: str,
    kind: str,
    path: str,
    status: str,
    path_index: dict[str, str],
    source_revision: str,
    locale_records: dict[str, Any],
    localized_paths: dict[str, str] | None = None,
) -> dict[str, Any]:
    """Build one source identity with explicit same-locale projections.

    A newer English route can point at an already governed localized page
    while its own translation is still being authored.  The projection is
    explicit and same-locale; it is never an English fallback and does not
    take ownership of the projected path in ``path_index``.  For neutral
    Reader records without an authored projection, reserve a locale-specific
    sibling path so an unavailable translation cannot be mistaken for the
    English source.  Skills use ``SKILL-<LOCALE>.md`` because the runtime
    contract must keep ``SKILL.md`` unchanged.
    """

    source_path = normalize(path)
    localized = {}
    localized_paths = localized_paths or {}
    for suffix in LOCALES:
        token = next(record["url_token"] for key, record in locale_records.items() if key == suffix)
        if suffix == "EN":
            projected_path = source_path
        elif suffix in localized_paths:
            projected_path = normalize(localized_paths[suffix])
        elif kind == "skill" and source_path.endswith("/SKILL.md"):
            projected_path = f"{source_path[:-len('SKILL.md')]}SKILL-{suffix}.md"
        elif source_path.endswith(".md"):
            projected_path = f"{source_path[:-3]}-{suffix}.md"
        else:
            projected_path = f"{source_path}-{suffix}"
        projected_exists = (ROOT / projected_path).is_file()
        localized[token] = {
            "path": projected_path,
            "exists": projected_exists,
            "content_status": status,
            "translation_status": "source" if suffix == "EN" else "candidate" if projected_path != source_path and projected_exists else "not-started",
            "source_revision": source_revision,
        }
        if suffix != "EN" and not projected_exists:
            localized[token]["translated_from"] = "EN"
            localized[token]["reason"] = "A locale-specific Reader file is not authored yet; the English runtime source remains locale-neutral."
        if projected_path != source_path and projected_exists:
            localized[token]["coverage"] = "projected-existing-page"
    add_path_index(path_index, source_path, content_id)
    for record in localized.values():
        projected_path = record.get("path")
        if projected_path != source_path and projected_path not in path_index:
            add_path_index(path_index, projected_path, content_id)
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
        legacy_path = item.get("legacy_path")
        if legacy_path:
            legacy_path = normalize(str(legacy_path))
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
                **{f"title_{key}": title["display"][key] for key in LOCALE_KEYS},
                **{f"canonical_title_{key}": title["canonical"][key] for key in LOCALE_KEYS},
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
        record = {
            "id": item["id"],
            "number": item["number"],
            "title": item["title"],
            "path": path,
            "content_id": content_id,
        }
        labs.append(record)
    return {
        "sequence_boundary": navigation.get("policy", {}).get("sequence_boundary"),
        "labs": labs,
    }


def build_localization_coverage(contents: dict[str, dict[str, Any]]) -> dict[str, dict[str, int]]:
    """Summarize actual course-unit availability without calling it completion.

    The selector needs a small, factual distinction between a registered
    locale, a readable translation slice, and a full course. Count only
    chapters and Labs: project entry pages and neutral research/Skill content
    would otherwise make a partial course look more complete than it is.
    """

    course_records = [
        content
        for content in contents.values()
        if content.get("kind") in {"chapter", "lab"}
    ]
    coverage: dict[str, dict[str, int]] = {}
    locale_config = load_json(MATRIX_FILE)["locales"]
    for suffix in LOCALES:
        token = locale_config[suffix]["url_token"]
        records_for_locale = [content["locales"][token] for content in course_records]
        available = [
            record
            for record in records_for_locale
            if record.get("exists")
            and record.get("translation_status") in RENDERABLE_TRANSLATION_STATUSES
        ]
        coverage[token] = {
            "total_units": len(course_records),
            "available_units": len(available),
            "source_units": sum(
                1 for record in available if record.get("translation_status") == "source"
            ),
            "candidate_translation_units": sum(
                1
                for record in available
                if record.get("translation_status") in {"candidate", "in-progress"}
            ),
            "reviewed_translation_units": sum(
                1
                for record in available
                if record.get("translation_status") in {"verified", "production-ready"}
            ),
        }
    return coverage


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
        localized_paths = item.get("localized_paths", {})
        if not isinstance(localized_paths, dict):
            raise ValueError(f"localized_paths for {content_id} must be an object")
        translation_policy = item.get("translation_policy")
        if translation_policy not in {None, "source-first"}:
            raise ValueError(f"unsupported translation_policy for {content_id}: {translation_policy}")
        if translation_policy == "source-first" and item.get("kind") != "field-note":
            raise ValueError(f"source-first translation_policy is limited to field-note content: {content_id}")
        contents[content_id] = neutral_content(
            content_id,
            str(item["kind"]),
            str(item["path"]),
            str(item["content_status"]),
            path_index,
            "locale-matrix",
            locale_records,
            localized_paths=localized_paths,
        )
        if translation_policy:
            contents[content_id]["translation_policy"] = translation_policy

    status_skills = {str(item["id"]): item for item in status.get("skills", {}).get("items", [])}
    registry_skills = {str(item["id"]): item for item in skill_registry.get("records", [])}
    if set(status_skills) != set(registry_skills):
        raise ValueError("Skill registry and content status IDs must match")
    for content_id, item in registry_skills.items():
        path = f"{normalize(str(item['path']))}/SKILL.md"
        contents[content_id] = neutral_content(content_id, "skill", path, str(status_skills[content_id]["status"]), path_index, "skill-registry", locale_records)

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
        "localization_coverage": build_localization_coverage(contents),
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

    OUTPUT_FILE.write_text(expected, encoding="utf-8", newline="\n")
    print(f"SITE_LOCALE_MANIFEST_BUILT output={OUTPUT_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
