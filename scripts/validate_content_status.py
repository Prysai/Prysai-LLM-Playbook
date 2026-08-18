"""Validate the single current-state contract for the learning workspace."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
STATUS_PATH = ROOT / "docs/governance/content-status.yaml"
EVALUATION_TASK_SET_PATH = ROOT / "evals/task-set-v1.yaml"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ARTIFACT_STATUSES = {"draft", "candidate", "verified", "production-ready"}
RUN_STATUSES = {"not_run", "running", "completed"}
RUN_PROJECTION_STATUSES = {"not_run", "partial", "completed"}
BROWSER_REVIEW_STATUSES = {"pending", "completed"}
REPOSITORY_LOCALES = ["en", "zh", "es", "ja", "ko", "de", "zh-tw"]
LOCALE_MIGRATION_STATUSES = {"migration", "release"}
LICENSE_REVIEW_STATUSES = {
    "file_level_release_boundaries_reviewed",
}
FORBIDDEN_LEGACY_LICENSE_REVIEW = "repository_mit_third_party_scope_recorded"


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
            for key in ("reference_run_status", "learner_run_status", "transfer_run_status"):
                projection = require_text(item, key, item_label, errors)
                if projection is not None and projection not in RUN_PROJECTION_STATUSES:
                    errors.append(f"{item_label}: {key} must be one of {sorted(RUN_PROJECTION_STATUSES)}")
            if run_status is not None and item.get("learner_run_status") != run_status:
                errors.append(f"{item_label}: legacy run_status must equal learner_run_status")
            if item.get("transfer_run_status") != "not_run" and item.get("learner_run_status") != "completed":
                errors.append(f"{item_label}: transfer evidence requires a completed learner run")


def derive_projection(items: list[dict[str, Any]], key: str) -> str:
    values = [item.get(key) for item in items]
    if values and all(value == "completed" for value in values):
        return "completed"
    if any(value in {"partial", "completed"} for value in values):
        return "partial"
    return "not_run"


def registered_run_labs(labs: dict[str, Any], errors: list[str]) -> dict[str, set[str]]:
    path = labs.get("run_projection_source")
    if not isinstance(path, str) or not path.strip() or not (ROOT / path).is_file():
        errors.append("labs: run_projection_source must name an existing executable-example registry")
        return {"reference_run_status": set(), "learner_run_status": set(), "transfer_run_status": set()}
    try:
        registry = json.loads((ROOT / path).read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        errors.append(f"labs: cannot parse run_projection_source: {exc}")
        return {"reference_run_status": set(), "learner_run_status": set(), "transfer_run_status": set()}
    lab_ids_by_path = {
        item.get("path"): item.get("id") for item in labs.get("items", []) if isinstance(item, dict)
    }
    registered = {"reference_run_status": set(), "learner_run_status": set(), "transfer_run_status": set()}
    for record in registry.get("records", []):
        if not isinstance(record, dict):
            continue
        completed_keys: list[str] = []
        if record.get("run_status") == "completed_reference_run":
            completed_keys.append("reference_run_status")
        if record.get("learner_run_status") == "completed":
            completed_keys.append("learner_run_status")
        if record.get("transfer_status") == "completed":
            completed_keys.append("transfer_run_status")
        for projection in record.get("projections", []):
            if projection in lab_ids_by_path:
                for key in completed_keys:
                    registered[key].add(lab_ids_by_path[projection])
    return registered


def validate_lab_projections(document: dict[str, Any], errors: list[str]) -> None:
    labs = document.get("labs")
    if not isinstance(labs, dict) or not isinstance(labs.get("items"), list):
        return
    items = labs["items"]
    registered = registered_run_labs(labs, errors)
    for key in ("reference_run_status", "learner_run_status", "transfer_run_status"):
        declared_completed = {item.get("id") for item in items if item.get(key) == "completed"}
        if declared_completed != registered[key]:
            errors.append(
                f"labs: completed {key} projections must exactly match registered evidence "
                f"(declared={sorted(declared_completed)}, registered={sorted(registered[key])})"
            )
    for key in ("reference_run_status", "learner_run_status", "transfer_run_status"):
        projection = require_text(labs, key, "labs", errors)
        if projection is not None and projection not in RUN_PROJECTION_STATUSES:
            errors.append(f"labs: {key} must be one of {sorted(RUN_PROJECTION_STATUSES)}")
        derived = derive_projection(items, key)
        if projection is not None and projection != derived:
            errors.append(f"labs: {key} must equal derived item projection {derived}")
    if labs.get("run_status") != labs.get("learner_run_status"):
        errors.append("labs: legacy run_status must equal learner_run_status")
    # A maintainer reference proves only that the exercise and checks can run.
    # It cannot promote learner or transfer evidence, artifact maturity, or project maturity.
    if (
        labs.get("learner_run_status") == "not_run"
        and any(item.get("learner_run_status") != "not_run" for item in items)
    ):
        errors.append("labs: learner projection contradicts item learner evidence")


def validate_document(document: dict[str, Any]) -> list[str]:
    errors: list[str] = []
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
        declared_run_projections = vocabulary.get("run_projection_status")
        if not isinstance(declared_run_projections, list) or set(declared_run_projections) != RUN_PROJECTION_STATUSES:
            errors.append("status_vocabulary.run_projection_status must list the controlled projection statuses")
        semantics = vocabulary.get("legacy_run_status_semantics")
        if not isinstance(semantics, str) or "learner_run_status" not in semantics or "never" not in semantics:
            errors.append("status_vocabulary must define run_status as a learner-only compatibility alias")

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
    validate_items(document, "labs", 18, "book/labs/", errors, require_run_status=True)
    validate_lab_projections(document, errors)
    skill_count = len(list((ROOT / "skills").glob("*/SKILL.md")))
    validate_items(document, "skills", skill_count, "skills/", errors)

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
        task_set_path = ROOT / evaluations.get("path", "") if isinstance(evaluations.get("path"), str) else None
        if task_set_path != EVALUATION_TASK_SET_PATH:
            errors.append("evaluations: path must be evals/task-set-v1.yaml")
        else:
            try:
                task_set = json.loads(EVALUATION_TASK_SET_PATH.read_text(encoding="utf-8"))
            except (OSError, UnicodeError, json.JSONDecodeError) as exc:
                errors.append(f"evaluations: cannot parse task set: {exc}")
            else:
                task_rows = task_set.get("tasks") if isinstance(task_set, dict) else None
                tracks = task_set.get("tracks") if isinstance(task_set, dict) else None
                if not isinstance(task_rows, list):
                    errors.append("evaluations: task set tasks must be a list")
                elif evaluations.get("task_count") != len(task_rows):
                    errors.append(
                        "evaluations: task_count must equal the task set count "
                        f"{len(task_rows)}, found {evaluations.get('task_count')!r}"
                    )
                if not isinstance(tracks, list):
                    errors.append("evaluations: task set tracks must be a list")
                elif evaluations.get("track_count") != len(tracks):
                    errors.append(
                        "evaluations: track_count must equal the task set track count "
                        f"{len(tracks)}, found {evaluations.get('track_count')!r}"
                    )

    site = document.get("public_site")
    if not isinstance(site, dict):
        errors.append("public_site: section must be an object")
    else:
        require_status(site, "status", "public_site", errors)
        if site.get("language_default") != "en":
            errors.append("public_site: language_default must be en")
        if site.get("language_options") != REPOSITORY_LOCALES:
            errors.append(
                "public_site: language_options must match REPOSITORY_LOCALES for the public route menu"
            )
        if site.get("ui_language_options") != REPOSITORY_LOCALES:
            errors.append(
                "public_site: ui_language_options must match REPOSITORY_LOCALES when all UI dictionaries ship"
            )
        repository_locales = site.get("repository_content_locales")
        if repository_locales != REPOSITORY_LOCALES:
            errors.append(
                "public_site: repository_content_locales must match REPOSITORY_LOCALES"
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
        license_review = require_text(sources, "license_review", "sources_and_licenses", errors)
        if license_review == FORBIDDEN_LEGACY_LICENSE_REVIEW:
            errors.append("sources_and_licenses: legacy MIT review value is forbidden because the repository uses an explicit content/code license split")
        elif license_review is not None and license_review not in LICENSE_REVIEW_STATUSES:
            errors.append(
                "sources_and_licenses: license_review must be one of "
                f"{sorted(LICENSE_REVIEW_STATUSES)}"
            )
        require_text(sources, "owner", "sources_and_licenses", errors)
        require_date(sources, "last_reviewed", "sources_and_licenses", errors)
        require_date(sources, "next_review", "sources_and_licenses", errors)
        validate_path_list(sources, "evidence", "sources_and_licenses", errors)
        if sources.get("archive_count") != 6:
            errors.append("sources_and_licenses: archive_count must be 6")

    return errors


def main() -> int:
    try:
        document = load_document()
        errors = validate_document(document)
    except ValueError as exc:
        errors = [str(exc)]
        document = {}
    if errors:
        print("CONTENT_STATUS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("CONTENT_STATUS_OK")
    print(
        "chapters=22 labs=18 "
        f"skills={document['skills']['count']} learning_levels=7 "
        f"evaluations={document['evaluations']['task_count']} "
        f"tracks={document['evaluations']['track_count']}"
    )
    ui_dicts = ",".join(document["public_site"]["ui_language_options"])
    print(
        "public_site=7-route-locales,"
        f"ui-dictionaries={ui_dicts},"
        f"repository_locale_status={document['public_site']['repository_locale_status']},"
        f"browser_review={document['public_site']['browser_review']}"
    )
    print(
        "lab_runs="
        f"reference:{document['labs']['reference_run_status']},"
        f"learner:{document['labs']['learner_run_status']},"
        f"transfer:{document['labs']['transfer_run_status']},"
        "legacy_run_status=learner"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
