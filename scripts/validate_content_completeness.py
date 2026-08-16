"""Validate cross-file identity and reader-entry completeness.

This gate checks that the status registry, locale matrix, chapter navigation,
canonical English sources, and public reader entries describe the same
content. It deliberately does not claim that a lab ran, a translation was
reviewed, or a reader learned the material.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
STATUS_FILE = ROOT / "docs/governance/content-status.yaml"
MATRIX_FILE = ROOT / "docs/governance/locale-matrix.yaml"
NAVIGATION_FILE = ROOT / "docs/governance/book-navigation.yaml"

GENERATED_OUTPUTS = {
    "site/learning-path-data.js": "scripts/build_learning_path_site.py",
    "site/locale-manifest.js": "scripts/build_site_locale_manifest.py",
    "site/search-index.js": "scripts/build_site_search_index.py",
    "book/title-map.json": "scripts/build_book_title_map.py",
}

READER_ENTRY_EXPECTATIONS = {
    "README-EN.md": ("book/chapters/21-team-capability-system-EN.md",),
    "book/README-EN.md": (
        "chapters/12-agent-loop-and-stop-EN.md",
        "labs/lab-006-agent-stop-conditions-EN.md",
    ),
    "book/table-of-contents-EN.md": (
        "chapters/12-agent-loop-and-stop-EN.md",
        "labs/lab-006-agent-stop-conditions-EN.md",
    ),
    "docs/content-matrix.md": (
        "../book/chapters/12-agent-loop-and-stop-EN.md",
        "../book/labs/lab-006-agent-stop-conditions-EN.md",
    ),
    "docs/governance/fact-impact-registry.yaml": (
        "book/chapters/12-agent-loop-and-stop-EN.md",
        "book/labs/lab-006-agent-stop-conditions-EN.md",
    ),
    "site/index.html": (
        "../book/chapters/12-agent-loop-and-stop-EN.md",
        "../book/labs/lab-006-agent-stop-conditions-EN.md",
    ),
    "site/app.js": (
        "../book/chapters/12-agent-loop-and-stop-EN.md",
        "../book/labs/lab-006-agent-stop-conditions-EN.md",
    ),
}

REQUIRED_IDENTITIES = {
    "chapter-12": "chapter-12-agent-loop-and-stop",
    "lab-006": "lab-006-agent-stop-conditions",
}

CONTENT_ID_RE = re.compile(r"content_id:\s*([A-Za-z0-9][A-Za-z0-9_-]*)")


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize(path: str) -> str:
    return path.replace("\\", "/").lstrip("./")


def relative(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def item_list(document: dict[str, Any], section: str, errors: list[str]) -> list[dict[str, Any]]:
    value = document.get(section, {}).get("items")
    if not isinstance(value, list):
        errors.append(f"content-status.{section}.items must be a list")
        return []
    return [item for item in value if isinstance(item, dict)]


def source_content_id(path: Path) -> str | None:
    try:
        text = path.read_text(encoding="utf-8")[:1200]
    except (OSError, UnicodeError):
        return None
    match = CONTENT_ID_RE.search(text)
    return match.group(1) if match else None


def build_matrix_indexes(
    matrix: dict[str, Any], errors: list[str]
) -> tuple[dict[str, dict[str, Any]], dict[str, dict[str, Any]]]:
    by_path: dict[str, dict[str, Any]] = {}
    by_id: dict[str, dict[str, Any]] = {}
    content = matrix.get("content")
    if not isinstance(content, list):
        errors.append("locale-matrix.content must be a list")
        return by_path, by_id

    for index, item in enumerate(content, start=1):
        if not isinstance(item, dict):
            errors.append(f"locale-matrix.content[{index}] must be an object")
            continue
        content_id = item.get("content_id")
        if not isinstance(content_id, str) or not content_id.strip():
            errors.append(f"locale-matrix.content[{index}].content_id must be non-empty")
            continue
        if content_id in by_id:
            errors.append(f"locale-matrix has duplicate content_id: {content_id}")
            continue
        by_id[content_id] = item
        locales = item.get("locales")
        if not isinstance(locales, dict) or not isinstance(locales.get("EN"), dict):
            errors.append(f"{content_id}: EN locale record is missing")
            continue
        en_path = locales["EN"].get("path")
        if not isinstance(en_path, str) or not en_path.strip():
            errors.append(f"{content_id}: EN path is missing")
            continue
        paths = [en_path, *item.get("legacy_paths", [])]
        for path in paths:
            if not isinstance(path, str) or not path.strip():
                errors.append(f"{content_id}: locale path must be a non-empty string")
                continue
            key = normalize(path)
            existing = by_path.get(key)
            if existing and existing.get("content_id") != content_id:
                errors.append(f"locale path belongs to multiple identities: {path}")
            else:
                by_path[key] = item
    return by_path, by_id


def check_status_registry(
    status: dict[str, Any],
    matrix_by_path: dict[str, dict[str, Any]],
    errors: list[str],
    warnings: list[str],
) -> dict[str, dict[str, Any]]:
    status_by_id: dict[str, dict[str, Any]] = {}
    expected_counts = {"chapters": 22, "labs": 18}
    for section, expected_count in expected_counts.items():
        items = item_list(status, section, errors)
        declared_count = status.get(section, {}).get("count")
        if declared_count != expected_count or len(items) != expected_count:
            errors.append(
                f"content-status.{section}: expected {expected_count} items and count, "
                f"found count={declared_count}, items={len(items)}"
            )
        for item in items:
            item_id = item.get("id")
            path_value = item.get("path")
            if not isinstance(item_id, str) or not item_id.strip():
                errors.append(f"content-status.{section}: item id must be non-empty")
                continue
            if item_id in status_by_id:
                errors.append(f"content-status has duplicate id: {item_id}")
            status_by_id[item_id] = item
            if not isinstance(path_value, str) or not path_value.strip():
                errors.append(f"{item_id}: path must be non-empty")
                continue
            path = ROOT / normalize(path_value)
            if not path.is_file():
                errors.append(f"{item_id}: registered path does not exist: {path_value}")
                continue
            matrix_item = matrix_by_path.get(normalize(path_value))
            if matrix_item is None:
                warnings.append(
                    f"{item_id}: source path is not the matrix EN path; migration remains pending: {path_value}"
                )
                continue
            expected_kind = "chapter" if section == "chapters" else "lab"
            if matrix_item.get("kind") != expected_kind:
                errors.append(
                    f"{item_id}: matrix kind is {matrix_item.get('kind')!r}, expected {expected_kind!r}"
                )
            en_record = matrix_item.get("locales", {}).get("EN", {})
            en_path = normalize(str(en_record.get("path", "")))
            if normalize(path_value) != en_path:
                warnings.append(
                    f"{item_id}: registered path uses a legacy source; English path is {en_path}"
                )
                continue
            content_id = source_content_id(path)
            if content_id != matrix_item.get("content_id"):
                errors.append(
                    f"{item_id}: source content_id {content_id!r} does not match "
                    f"locale-matrix identity {matrix_item.get('content_id')!r}"
                )
    return status_by_id


def check_navigation(
    navigation: dict[str, Any], matrix_by_path: dict[str, dict[str, Any]], errors: list[str]
) -> None:
    chapters = navigation.get("chapters")
    if not isinstance(chapters, list) or len(chapters) != 22:
        errors.append("book-navigation.chapters must contain all 22 chapters")
        return
    numbers: list[int] = []
    ids: set[str] = set()
    for item in chapters:
        if not isinstance(item, dict):
            errors.append("book-navigation chapter entries must be objects")
            continue
        number = item.get("number")
        item_id = item.get("id")
        english_path = item.get("english_path")
        legacy_path = item.get("legacy_path")
        if isinstance(number, int):
            numbers.append(number)
        if isinstance(item_id, str):
            if item_id in ids:
                errors.append(f"book-navigation has duplicate chapter id: {item_id}")
            ids.add(item_id)
        if not isinstance(english_path, str) or not english_path.endswith("-EN.md"):
            errors.append(f"{item_id}: English navigation path must use -EN.md")
        else:
            path = ROOT / normalize(english_path)
            if not path.is_file():
                errors.append(f"{item_id}: English navigation path is missing: {english_path}")
            elif normalize(english_path) not in matrix_by_path:
                errors.append(f"{item_id}: English navigation path is not in locale matrix: {english_path}")
        if legacy_path is not None:
            if not isinstance(legacy_path, str) or not legacy_path.strip():
                errors.append(f"{item_id}: legacy navigation path must be a non-empty string")
            elif not (ROOT / normalize(legacy_path)).is_file():
                errors.append(f"{item_id}: legacy navigation path is missing: {legacy_path}")
    if numbers != list(range(1, 23)):
        errors.append("book-navigation chapter numbers must be 1 through 22 in order")


def check_reader_entries(errors: list[str]) -> None:
    for relative_path, expected_paths in READER_ENTRY_EXPECTATIONS.items():
        path = ROOT / relative_path
        if not path.is_file():
            errors.append(f"reader entry is missing: {relative_path}")
            continue
        text = path.read_text(encoding="utf-8")
        for expected in expected_paths:
            if expected not in text:
                errors.append(f"{relative_path}: missing canonical entry {expected}")


def check_generated_outputs(errors: list[str]) -> None:
    for relative_path, generator in GENERATED_OUTPUTS.items():
        path = ROOT / relative_path
        if not path.is_file():
            errors.append(f"generated output is missing: {relative_path} (run {generator})")
            continue
        marker = f"Generated by {generator}"
        if marker not in path.read_text(encoding="utf-8"):
            errors.append(f"{relative_path}: generator marker is missing")


def check_public_count_claims(status: dict[str, Any], errors: list[str]) -> None:
    """Keep manually authored front-door counts aligned with governance data."""
    lab_count = status.get("labs", {}).get("count")
    skill_count = status.get("skills", {}).get("count")
    if not isinstance(lab_count, int) or not isinstance(skill_count, int):
        errors.append("content-status labs and skills counts must be integers")
        return
    expected = f"| Labs | {lab_count} labs"
    exact_expectations = {
        "README.md": expected,
        "README-EN.md": expected,
        "README-DE.md": f"{lab_count} Labs `draft`",
        "book/preface-EN.md": f"{lab_count} labs as `draft`",
        "book/README-DE.md": f"{lab_count} praktische Labs",
        "book/preface-DE.md": f"{lab_count} Labs `draft`",
        "site/app.js": f"ledgerLabs: 'Labs · {lab_count}'",
    }
    for relative_path, claim in exact_expectations.items():
        path = ROOT / relative_path
        if not path.is_file() or claim not in path.read_text(encoding="utf-8"):
            errors.append(f"{relative_path}: public lab count must match {lab_count}")

    site_lab_expectations = {
        "site/index.html": (
            f"{lab_count} labs · 2 maintainer references · 0 learner runs",
            f"<strong>{lab_count}</strong><span data-i18n=\"mobileIndexLabs\">labs</span>",
            f"Labs · {lab_count}",
        ),
        "site/app.js": (
            f"fileLabsBody: '{lab_count} labs; current status: draft; run status: not_run.'",
            f"fileLabsBody: '{lab_count} \\u4e2a\\u5b9e\\u9a8c",
            f"ledgerLabs: 'Labs · {lab_count}'",
            f"ledgerLabs: '\\u5b9e\\u9a8c \\u00b7 {lab_count}'",
            f"repositoryLabs: '{lab_count} labs · 2 maintainer references · 0 learner runs'",
            f"repositoryLabs: '{lab_count} 个实验 · 2 个维护者参考运行 · 0 个学习者运行'",
        ),
    }
    for relative_path, claims in site_lab_expectations.items():
        path = ROOT / relative_path
        text = path.read_text(encoding="utf-8") if path.is_file() else ""
        for claim in claims:
            if claim not in text:
                errors.append(f"{relative_path}: site lab count must match {lab_count}")
                break

    skill_expectations = {
        "site/index.html": (
            f"{skill_count} reusable Skills · candidate",
            f"<strong>{skill_count}</strong><span data-i18n=\"mobileIndexSkills\">Skills</span>",
            f"Skills · {skill_count}",
        ),
        "site/app.js": (
            f"{skill_count} project Skills with triggers, boundaries, and evidence contracts.",
            f"ledgerSkills: 'Skills · {skill_count}'",
            f"{skill_count} \\u4e2a\\u9879\\u76ee Skill",
            f"ledgerSkills: 'Skill \\u00b7 {skill_count}'",
            f"{skill_count} 个可复用 Skill · candidate",
        ),
    }
    for relative_path, claims in skill_expectations.items():
        path = ROOT / relative_path
        text = path.read_text(encoding="utf-8") if path.is_file() else ""
        for claim in claims:
            if claim not in text:
                errors.append(f"{relative_path}: public Skill count must match {skill_count}")
                break


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    try:
        status = load_json(STATUS_FILE)
        matrix = load_json(MATRIX_FILE)
        navigation = load_json(NAVIGATION_FILE)
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print("CONTENT_COMPLETENESS_FAILED")
        print(f"- cannot parse governance input: {exc}")
        return 1

    if not isinstance(status, dict) or not isinstance(matrix, dict) or not isinstance(navigation, dict):
        print("CONTENT_COMPLETENESS_FAILED")
        print("- governance inputs must be JSON-compatible objects")
        return 1

    matrix_by_path, matrix_by_id = build_matrix_indexes(matrix, errors)
    status_by_id = check_status_registry(status, matrix_by_path, errors, warnings)
    check_navigation(navigation, matrix_by_path, errors)
    check_reader_entries(errors)
    check_generated_outputs(errors)
    check_public_count_claims(status, errors)

    for status_id, expected_identity in REQUIRED_IDENTITIES.items():
        item = status_by_id.get(status_id)
        if not item:
            errors.append(f"required stable identity is missing from content-status: {status_id}")
            continue
        matrix_item = matrix_by_path.get(normalize(str(item.get("path", ""))))
        if matrix_item is None:
            matrix_item = next(
                (
                    candidate
                    for candidate in matrix_by_id.values()
                    if candidate.get("content_id") == expected_identity
                ),
                None,
            )
        if not matrix_item or matrix_item.get("content_id") != expected_identity:
            errors.append(
                f"{status_id}: expected locale-matrix identity {expected_identity}, "
                f"found {matrix_item.get('content_id') if matrix_item else None}"
            )

    if errors:
        print("CONTENT_COMPLETENESS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("CONTENT_COMPLETENESS_OK")
    print(f"canonical_chapters=22 navigation=22 generated_outputs={len(GENERATED_OUTPUTS)}")
    if warnings:
        print(f"migration_warnings={len(warnings)}")
        for warning in warnings:
            print(f"- warning: {warning}")
    else:
        print("migration_warnings=0")
    print("evidence_boundary=identity-and-entry-consistency; not runtime-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
