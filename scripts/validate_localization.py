"""Validate the locale matrix and same-language links in migration or release mode."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "docs/governance/locale-matrix.yaml"
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE")
TRANSLATION_STATUSES = {"source", "not-started", "in-progress", "candidate", "verified", "stale"}
CONTENT_STATUSES = {"draft", "candidate", "verified", "production-ready"}
SUFFIX_RE = re.compile(r"-(EN|ZH|ES|JA|KO|DE)(\.[^/]+)$")
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
LOCALE_FILE_RE = re.compile(r"-(EN|ZH|ES|JA|KO|DE)\.[^/]+$")
MIGRATION_NOTICE_RE = re.compile(
    r"(?:migration|migraci[oó]n|移行|迁移|이관|[Mm]igration|[Üü]bersetzung|Übersetzungsstatus)"
)


def load_matrix() -> dict[str, Any]:
    value = json.loads(MATRIX_PATH.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("matrix must be a JSON-compatible object")
    return value


def relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def path_is_neutral(path: str, neutral_prefixes: list[str]) -> bool:
    normalized = path.replace("\\", "/").lstrip("./")
    return any(normalized == prefix.rstrip("/") or normalized.startswith(prefix) for prefix in neutral_prefixes)


def iter_workspace_files() -> list[Path]:
    """Walk the project while pruning machine-local work directories early."""

    files: list[Path] = []
    for current_root, directories, filenames in os.walk(ROOT):
        directories[:] = [
            directory
            for directory in directories
            if directory not in {".git", ".work", "tmp"}
        ]
        files.extend(Path(current_root) / filename for filename in filenames)
    return files


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--release", action="store_true", help="require every matrix locale to be a real reviewed file")
    args = parser.parse_args()
    errors: list[str] = []
    try:
        matrix = load_matrix()
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("LOCALIZATION_FAILED")
        print(f"- cannot parse {MATRIX_PATH.relative_to(ROOT)}: {exc}")
        return 1

    if matrix.get("default_locale") != "EN":
        errors.append("default_locale must be EN")
    if matrix.get("mode") not in {"migration", "release"}:
        errors.append("mode must be migration or release")
    declared_locales = matrix.get("locales")
    if not isinstance(declared_locales, dict) or set(declared_locales) != set(LOCALES):
        errors.append(f"locales must contain exactly {', '.join(LOCALES)}")
        declared_locales = {}
    for locale in LOCALES:
        record = declared_locales.get(locale, {})
        if not isinstance(record, dict):
            errors.append(f"locales.{locale} must be an object")
            continue
        if record.get("suffix") != locale:
            errors.append(f"locales.{locale}.suffix must be {locale}")
        if not isinstance(record.get("url_token"), str) or not record.get("url_token"):
            errors.append(f"locales.{locale}.url_token must be non-empty")
        if not isinstance(record.get("html_lang"), str) or not record.get("html_lang"):
            errors.append(f"locales.{locale}.html_lang must be non-empty")

    contents = matrix.get("content")
    if not isinstance(contents, list) or not contents:
        errors.append("content must be a non-empty list")
        contents = []

    path_to_identity: dict[str, tuple[str, str]] = {}
    matrix_paths: set[str] = set()
    for index, item in enumerate(contents, start=1):
        label = f"content[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label} must be an object")
            continue
        content_id = item.get("content_id")
        if not isinstance(content_id, str) or not content_id.strip():
            errors.append(f"{label}.content_id must be non-empty")
            content_id = f"#{index}"
        stem = item.get("stem")
        if not isinstance(stem, str) or not stem.strip():
            errors.append(f"{label}.stem must be non-empty")
        locales = item.get("locales")
        if not isinstance(locales, dict) or set(locales) != set(LOCALES):
            errors.append(f"{label} ({content_id}) must declare all six locales")
            locales = {}
        for locale in LOCALES:
            record = locales.get(locale, {})
            entry_label = f"{label}.{content_id}.{locale}"
            if not isinstance(record, dict):
                errors.append(f"{entry_label} must be an object")
                continue
            path = record.get("path")
            if not isinstance(path, str) or not path.strip():
                errors.append(f"{entry_label}.path must be non-empty")
                continue
            normalized = path.replace("\\", "/")
            matrix_paths.add(normalized)
            match = SUFFIX_RE.search(normalized)
            if not match or match.group(1) != locale:
                errors.append(f"{entry_label}.path must end with -{locale}")
            if isinstance(stem, str) and not normalized.startswith(stem + "-"):
                errors.append(f"{entry_label}.path must use stem {stem}")
            if normalized in path_to_identity:
                errors.append(f"duplicate matrix path: {normalized}")
            else:
                path_to_identity[normalized] = (str(content_id), locale)
            content_status = record.get("content_status")
            if content_status not in CONTENT_STATUSES:
                errors.append(f"{entry_label}.content_status is invalid: {content_status!r}")
            translation_status = record.get("translation_status")
            if translation_status not in TRANSLATION_STATUSES:
                errors.append(f"{entry_label}.translation_status is invalid: {translation_status!r}")
            if locale == "EN" and translation_status != "source":
                errors.append(f"{entry_label} must use translation_status=source")
            if locale != "EN" and translation_status != "source":
                if record.get("translated_from") != "EN":
                    errors.append(f"{entry_label} must declare translated_from=EN")
                if not isinstance(record.get("source_revision"), str) or not record.get("source_revision"):
                    errors.append(f"{entry_label} must declare source_revision")
                if translation_status in {"not-started", "in-progress", "stale"} and not record.get("reason"):
                    errors.append(f"{entry_label} must explain {translation_status}")
            exists = (ROOT / normalized).is_file()
            if exists and not (ROOT / normalized).read_text(encoding="utf-8"):
                errors.append(f"{entry_label} is empty")
            if args.release or matrix.get("mode") == "release":
                if not exists:
                    errors.append(f"{entry_label} is missing in release mode")
                if translation_status in {"not-started", "in-progress", "stale"}:
                    errors.append(f"{entry_label} is not release-ready: {translation_status}")

    neutral_prefixes = matrix.get("locale_neutral_paths", [])
    if not isinstance(neutral_prefixes, list) or not all(isinstance(value, str) for value in neutral_prefixes):
        errors.append("locale_neutral_paths must be a list of strings")
        neutral_prefixes = []

    localized_files: list[Path] = []
    for path in iter_workspace_files():
        if LOCALE_FILE_RE.search(relative(path)):
            localized_files.append(path)
            if relative(path) not in matrix_paths:
                errors.append(f"localized file is missing from matrix: {relative(path)}")

    for path in localized_files:
        path_string = relative(path)
        locale = SUFFIX_RE.search(path_string).group(1)  # type: ignore[union-attr]
        text = path.read_text(encoding="utf-8")
        for link_match in LINK_RE.finditer(text):
            link_label = link_match.group(0).split("](", 1)[0].lstrip("[")
            target = link_match.group(1)
            target = target.split("#", 1)[0].strip().strip("<>")
            if not target or target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            resolved = (path.parent / target).resolve()
            try:
                target_relative = relative(resolved)
            except ValueError:
                errors.append(f"{path_string} links outside workspace: {target}")
                continue
            if target_relative in path_to_identity:
                target_locale = path_to_identity[target_relative][1]
                if target_locale != locale:
                    errors.append(f"{path_string} links across locale: {target_relative}")
            elif target_relative.endswith(".md") and not path_is_neutral(target_relative, neutral_prefixes):
                legacy = any(target_relative == legacy_path for item in contents for legacy_path in item.get("legacy_paths", []) if isinstance(item, dict))
                if legacy and matrix.get("mode") == "release":
                    errors.append(f"{path_string} links to unsuffixed legacy content: {target_relative}")
                elif legacy and not MIGRATION_NOTICE_RE.search(link_label):
                    errors.append(
                        f"{path_string} links to legacy content without an explicit migration notice: {target_relative}"
                    )

    counts = {locale: 0 for locale in LOCALES}
    for path in localized_files:
        match = SUFFIX_RE.search(relative(path))
        if match:
            counts[match.group(1)] += 1
    if errors:
        print("LOCALIZATION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"LOCALIZATION_OK mode={'release' if args.release else matrix.get('mode')} content_ids={len(contents)}")
    print("files=" + ",".join(f"{locale}:{counts[locale]}" for locale in LOCALES))
    print(f"registered_paths={len(matrix_paths)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
