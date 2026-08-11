"""Validate the single current-state contract for the learning workspace."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
STATUS_PATH = ROOT / "docs/governance/content-status.yaml"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ARTIFACT_STATUSES = {"draft", "candidate", "verified", "production-ready"}
RUN_STATUSES = {"not_run", "running", "completed"}
BROWSER_REVIEW_STATUSES = {"pending", "completed"}
RUNTIME_LOCALES = ["en", "zh"]
REPOSITORY_LOCALES = ["en", "zh", "es", "ja", "ko", "de"]
LOCALE_MIGRATION_STATUSES = {"migration", "release"}


def load_document() -> dict[str, Any]:
    """Read the JSON-compatible YAML file without adding a runtime dependency."""
    try:
        value = json.loads(STATUS_PATH.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot parse {STATUS_PATH.relative_to(ROOT)}: {exc}") from exc
    if not isinstance(value, dict):
        raise ValueError("top-level document must be an object")
    return value


def require_text(mapping: dict[str, Any], key: str, label: str, errors: list[str]) -> str | None:
    value = mapping.get(key)
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{label}: {key} must be a non-empty string")
        return None
    return value


def require_date(mapping: dict[str, Any], key: str, label: str, errors: list[str]) -> None:
    value = require_text(mapping, key, label, errors)
    if value is not None and not DATE_RE.fullmatch(value):
        errors.append(f"{label}: {key} must use YYYY-MM-DD")


def require_status(mapping: dict[str, Any], key: str, label: str, errors: list[str]) -> None:
    value = require_text(mapping, key, label, errors)
    if value is not None and value not in ARTIFACT_STATUSES:
        errors.append(f"{label}: {key} must be one of {sorted(ARTIFACT_STATUSES)}")


def validate_path_list(mapping: dict[str, Any], key: str, label: str, errors: list[str]) -> None:
    values = mapping.get(key)
    if not isinstance(values, list) or not values or not all(isinstance(value, str) and value.strip() for value in values):
        errors.append(f"{label}: {key} must be a non-empty list of paths")
        return
    for value in values:
        if not (ROOT / value).exists():
            errors.append(f"{label}: {key} path does not exist: {value}")


def validate_items(
    document: dict[str, Any],
    section_name: str,
    expected_count: int,
    path_prefix: str,
    errors: list[str],
    *,
    require_run_status: bool = False,
) -> None:
    section = document.get(section_name)
    label = section_name
    if not isinstance(section, dict):
        errors.append(f"{label}: section must be an object")
        return
    count = section.get("count")
    if count != expected_count:
        errors.append(f"{label}: count must be {expected_count}, found {count!r}")
    require_status(section, "status", label, errors)
    require_text(section, "owner", label, errors)
    require_date(section, "last_reviewed", label, errors)
    require_date(section, "next_review", label, errors)
    validate_path_list(section, "evidence", label, errors)
    items = section.get("items")
    if not isinstance(items, list) or len(items) != expected_count:
        errors.append(f"{label}: items must contain exactly {expected_count} records")
        return
    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    for index, item in enumerate(items, start=1):
        item_label = f"{label}.items[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{item_label}: item must be an object")
            continue
        item_id = require_text(item, "id", item_label, errors)
        item_path = require_text(item, "path", item_label, errors)
        require_status(item, "status", item_label, errors)
        if item_id is not None and item_id in seen_ids:
            errors.append(f"{item_label}: duplicate id {item_id}")
        if item_id is not None:
            seen_ids.add(item_id)
        if item_path is not None:
            if item_path in seen_paths:
                errors.append(f"{item_label}: duplicate path {item_path}")
            seen_paths.add(item_path)
            target = ROOT / item_path
            if not target.exists():
                errors.append(f"{item_label}: path does not exist: {item_path}")
            if not item_path.startswith(path_prefix):
                errors.append(f"{item_label}: path must start with {path_prefix}")
        if require_run_status:
            run_status = require_text(item, "run_status", item_label, errors)
            if run_status is not None and run_status not in RUN_STATUSES:
                errors.append(f"{item_label}: run_status must be one of {sorted(RUN_STATUSES)}")


def main() -> int:
    errors: list[str] = []
    try:
        document = load_document()
    except ValueError as exc:
        print("CONTENT_STATUS_FAILED")
        print(f"- {exc}")
        return 1

    if document.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    for key in ("generated_at", "description"):
        require_text(document, key, "root", errors)
    require_date(document, "generated_at", "root", errors)

    vocabulary = document.get("status_vocabulary")
    if not isinstance(vocabulary, dict):
        errors.append("status_vocabulary must be an object")
    else:
        declared_artifacts = vocabulary.get("artifact_status")
        if not isinstance(declared_artifacts, list) or set(declared_artifacts) != ARTIFACT_STATUSES:
            errors.append("status_vocabulary.artifact_status must list the controlled artifact statuses")
        declared_facts = vocabulary.get("fact_status")
        if declared_facts != ["current", "stale", "disputed", "removed"]:
            errors.append("status_vocabulary.fact_status must list the controlled fact statuses")

    project = document.get("project")
    if not isinstance(project, dict):
        errors.append("project must be an object")
    else:
        require_status(project, "status", "project", errors)
        require_text(project, "owner", "project", errors)
        require_date(project, "last_reviewed", "project", errors)
        require_date(project, "next_review", "project", errors)
        validate_path_list(project, "evidence", "project", errors)

    validate_items(document, "chapters", 22, "book/chapters/", errors)
    validate_items(document, "labs", 13, "book/labs/", errors, require_run_status=True)
    validate_items(document, "skills", 7, "skills/", errors)

    learning_path = document.get("learning_path")
    if not isinstance(learning_path, dict):
        errors.append("learning_path: section must be an object")
    else:
        if learning_path.get("count") != 7:
            errors.append(f"learning_path: count must be 7, found {learning_path.get('count')!r}")
        require_status(learning_path, "status", "learning_path", errors)
        require_text(learning_path, "owner", "learning_path", errors)
        require_date(learning_path, "last_reviewed", "learning_path", errors)
        require_date(learning_path, "next_review", "learning_path", errors)
        validate_path_list(learning_path, "evidence", "learning_path", errors)
        path = require_text(learning_path, "path", "learning_path", errors)
        if path is not None and not (ROOT / path).is_file():
            errors.append(f"learning_path: path does not exist: {path}")

    evaluations = document.get("evaluations")
    if not isinstance(evaluations, dict):
        errors.append("evaluations: section must be an object")
    else:
        for key in ("task_count", "track_count"):
            if not isinstance(evaluations.get(key), int) or evaluations[key] <= 0:
                errors.append(f"evaluations: {key} must be a positive integer")
        require_status(evaluations, "fixture_status", "evaluations", errors)
        require_text(evaluations, "run_status", "evaluations", errors)
        require_text(evaluations, "review_status", "evaluations", errors)
        require_text(evaluations, "owner", "evaluations", errors)
        require_date(evaluations, "last_reviewed", "evaluations", errors)
        require_date(evaluations, "next_review", "evaluations", errors)
        validate_path_list(evaluations, "evidence", "evaluations", errors)
        if evaluations.get("run_status") != "not_run":
            errors.append("evaluations: run_status must remain not_run until run logs exist")

    site = document.get("public_site")
    if not isinstance(site, dict):
        errors.append("public_site: section must be an object")
    else:
        require_status(site, "status", "public_site", errors)
        if site.get("language_default") != "en":
            errors.append("public_site: language_default must be en")
        if site.get("language_options") != RUNTIME_LOCALES:
            errors.append("public_site: language_options must be ['en', 'zh'] for the current runtime UI")
        repository_locales = site.get("repository_content_locales")
        if repository_locales != REPOSITORY_LOCALES:
            errors.append(
                "public_site: repository_content_locales must be "
                "['en', 'zh', 'es', 'ja', 'ko', 'de']"
            )
        locale_status = require_text(site, "repository_locale_status", "public_site", errors)
        if locale_status is not None and locale_status not in LOCALE_MIGRATION_STATUSES:
            errors.append(
                f"public_site: repository_locale_status must be one of {sorted(LOCALE_MIGRATION_STATUSES)}"
            )
        locale_matrix = require_text(site, "locale_matrix", "public_site", errors)
        if locale_matrix is not None and not (ROOT / locale_matrix).is_file():
            errors.append(f"public_site: locale_matrix path does not exist: {locale_matrix}")
        browser_review = require_text(site, "browser_review", "public_site", errors)
        if browser_review is not None and browser_review not in BROWSER_REVIEW_STATUSES:
            errors.append(
                f"public_site: browser_review must be one of {sorted(BROWSER_REVIEW_STATUSES)}"
            )
        require_text(site, "owner", "public_site", errors)
        require_date(site, "last_reviewed", "public_site", errors)
        require_date(site, "next_review", "public_site", errors)
        validate_path_list(site, "evidence", "public_site", errors)
        site_path = require_text(site, "path", "public_site", errors)
        if site_path is not None and not (ROOT / site_path).is_dir():
            errors.append(f"public_site: path does not exist: {site_path}")

    sources = document.get("sources_and_licenses")
    if not isinstance(sources, dict):
        errors.append("sources_and_licenses: section must be an object")
    else:
        require_status(sources, "status", "sources_and_licenses", errors)
        require_text(sources, "license_review", "sources_and_licenses", errors)
        require_text(sources, "owner", "sources_and_licenses", errors)
        require_date(sources, "last_reviewed", "sources_and_licenses", errors)
        require_date(sources, "next_review", "sources_and_licenses", errors)
        validate_path_list(sources, "evidence", "sources_and_licenses", errors)
        if sources.get("archive_count") != 6:
            errors.append("sources_and_licenses: archive_count must be 6")

    if errors:
        print("CONTENT_STATUS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("CONTENT_STATUS_OK")
    print("chapters=22 labs=13 skills=7 learning_levels=7 evaluations=39 tracks=16")
    print(f"public_site=en-default,zh-toggle,browser_review={document['public_site']['browser_review']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
