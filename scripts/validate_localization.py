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
README_RE = re.compile(r"^(?:README|book/README)(?:-(EN|ZH|ES|JA|KO|DE))?\.md$")
ROOT_EN_README = "README.md"
LANGUAGE_SWITCHER_START = "<!-- language-switcher:start -->"
LANGUAGE_SWITCHER_END = "<!-- language-switcher:end -->"
MIGRATION_NOTICE_RE = re.compile(
    r"(?:migration|migraci[oó]n|移行|迁移|이관|[Mm]igration|[Üü]bersetzung|Übersetzungsstatus)"
)
TOC_LAB_LINK_RE = re.compile(r"\bLab\s*[- ]?0*(\d{1,3})\b", re.IGNORECASE)
TOC_CHAPTER_LINK_RE = re.compile(
    r"(?:chapter|cap[ií]tulo|kapitel)\s*(\d{1,2})|第\s*(\d{1,2})\s*章|(\d{1,2})\s*장",
    re.IGNORECASE,
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
            if directory not in {".git", ".work", ".codex-temp", "tmp", "_site", ".pytest_cache"}
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
    legacy_path_to_identity: dict[str, str] = {}
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
        legacy_paths = item.get("legacy_paths", [])
        if not isinstance(legacy_paths, list) or not all(isinstance(value, str) for value in legacy_paths):
            errors.append(f"{label}.legacy_paths must be a list of strings")
            legacy_paths = []
        for legacy_path in legacy_paths:
            normalized_legacy = legacy_path.replace("\\", "/")
            if normalized_legacy in legacy_path_to_identity:
                errors.append(f"duplicate legacy matrix path: {normalized_legacy}")
            else:
                legacy_path_to_identity[normalized_legacy] = str(content_id)
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
    readme_files: list[Path] = []
    for path in iter_workspace_files():
        path_string = relative(path)
        if README_RE.search(path_string):
            readme_files.append(path)
        # Governance and research documents live under declared neutral paths.
        # A neutral document may use an explicit language suffix for its
        # authoring language without becoming a translated content identity.
        if LOCALE_FILE_RE.search(path_string) and not path_is_neutral(path_string, neutral_prefixes):
            localized_files.append(path)
            if path_string not in matrix_paths:
                errors.append(f"localized file is missing from matrix: {path_string}")

    files_to_check = list(dict.fromkeys(localized_files + readme_files))
    for path in files_to_check:
        path_string = relative(path)
        suffix_match = SUFFIX_RE.search(path_string)
        locale = suffix_match.group(1) if suffix_match else None
        # GitHub renders the unsuffixed root README as the repository's
        # default page. It is a deliberate English facade, while README-EN.md
        # remains the suffixed canonical source. Keep this exception explicit
        # so normal English reader links are validated as same-locale links.
        if path_string == ROOT_EN_README:
            locale = "EN"
        text = path.read_text(encoding="utf-8")
        switcher_start = text.find(LANGUAGE_SWITCHER_START)
        switcher_end = text.find(LANGUAGE_SWITCHER_END, switcher_start + len(LANGUAGE_SWITCHER_START)) if switcher_start >= 0 else -1
        is_readme = README_RE.search(path_string) is not None
        if is_readme and (switcher_start < 0 or switcher_end < 0 or switcher_end < switcher_start):
            errors.append(f"{path_string} is missing a complete language switcher block")
        source_identity = path_to_identity.get(path_string)
        source_content_id = source_identity[0] if source_identity else legacy_path_to_identity.get(path_string)
        is_localized_toc = path_string.startswith("book/table-of-contents-") and locale not in {None, "EN"}
        switcher_locale_counts = {registered_locale: 0 for registered_locale in LOCALES}
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
                target_content_id, target_locale = path_to_identity[target_relative]
                if is_localized_toc:
                    lab_match = TOC_LAB_LINK_RE.search(link_label)
                    chapter_match = TOC_CHAPTER_LINK_RE.search(link_label)
                    if lab_match and not target_content_id.startswith(f"lab-{int(lab_match.group(1)):03d}-"):
                        errors.append(
                            f"{path_string} labels Lab {int(lab_match.group(1)):03d} but links to {target_content_id}"
                        )
                    if chapter_match:
                        chapter_number = next(group for group in chapter_match.groups() if group is not None)
                        if not target_content_id.startswith(f"chapter-{int(chapter_number):02d}-"):
                            errors.append(
                                f"{path_string} labels chapter {int(chapter_number):02d} but links to {target_content_id}"
                            )
                in_switcher = switcher_start >= 0 and switcher_end >= 0 and switcher_start < link_match.start() < switcher_end
                if in_switcher and is_readme:
                    switcher_locale_counts[target_locale] += 1
                    if source_content_id and target_content_id != source_content_id:
                        errors.append(
                            f"{path_string} language switcher changes content identity: {target_relative}"
                        )
                if locale is not None and target_locale != locale:
                    if not in_switcher:
                        errors.append(f"{path_string} links across locale outside language switcher: {target_relative}")
                elif locale is None and not in_switcher:
                    errors.append(f"{path_string} links to a locale-specific file outside language switcher: {target_relative}")
            elif target_relative.endswith(".md") and not path_is_neutral(target_relative, neutral_prefixes):
                legacy = any(target_relative == legacy_path for item in contents for legacy_path in item.get("legacy_paths", []) if isinstance(item, dict))
                if legacy and matrix.get("mode") == "release":
                    errors.append(f"{path_string} links to unsuffixed legacy content: {target_relative}")
                elif legacy and not MIGRATION_NOTICE_RE.search(link_label):
                    errors.append(
                        f"{path_string} links to legacy content without an explicit migration notice: {target_relative}"
                    )
        if is_readme and switcher_start >= 0 and switcher_end >= 0 and switcher_end > switcher_start:
            missing_locales = {locale for locale, count in switcher_locale_counts.items() if count == 0}
            duplicate_locales = {locale for locale, count in switcher_locale_counts.items() if count > 1}
            if missing_locales:
                errors.append(
                    f"{path_string} language switcher is missing locales: {', '.join(sorted(missing_locales))}"
                )
            if duplicate_locales:
                errors.append(
                    f"{path_string} language switcher repeats locales: {', '.join(sorted(duplicate_locales))}"
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
