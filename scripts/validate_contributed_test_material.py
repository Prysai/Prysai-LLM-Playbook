"""Validate privacy- and claim-bounded community test-material receipts.

This gate accepts only original fictional fixtures and text-only protocols.
It never runs a model, collects evidence, scores a learner, or authorizes a
status promotion.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRIBUTIONS = ROOT / "evals" / "contributions"
RECEIPT_NAME = "contribution.json"
ID_RE = re.compile(r"^CE-\d{8}-[a-z0-9][a-z0-9-]{2,48}$")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
SAFE_PATH_RE = re.compile(r"^[A-Za-z0-9._/-]+$")
ALLOWED_KINDS = {"synthetic_fixture", "protocol"}
REQUIRED_PRIVACY_FIELDS = {
    "raw_personal_data_committed",
    "raw_learner_work_committed",
    "raw_model_output_committed",
    "credentials_committed",
}
FORBIDDEN_KEYS = {
    "raw_prompt",
    "raw_prompts",
    "raw_model_output",
    "raw_model_outputs",
    "raw_learner_work",
    "learner_transcript",
    "chat_transcript",
    "participant_name",
    "participant_email",
    "consent_form",
}
# The fast route never executes material supplied by a pull request. Keep it
# declarative: code and executable validators require the standard review
# route, where their behavior can be reviewed and tested deliberately.
ALLOWED_MATERIAL_SUFFIXES = {".json", ".md", ".txt", ".yaml", ".yml"}
MAX_MATERIAL_BYTES = 100 * 1024
ALLOWED_ROOT_FILES = {"README.md", "contribution-receipt-template.json"}
FORBIDDEN_COMMAND_FRAGMENTS = {
    "anthropic",
    "codex",
    "curl",
    "http://",
    "https://",
    "invoke-webrequest",
    "model",
    "openai",
    "wget",
}
CLAIM_BOUNDARY = (
    "This submission contains fictional test material only; it does not establish "
    "model quality, learning, efficiency, safety, productivity, or IQ."
)


def receipt_label(path: Path, root: Path = ROOT) -> str:
    return path.relative_to(root).as_posix() if path.is_relative_to(root) else str(path)


def walk_keys(value: Any) -> set[str]:
    if isinstance(value, dict):
        keys = {str(key).casefold() for key in value}
        for item in value.values():
            keys.update(walk_keys(item))
        return keys
    if isinstance(value, list):
        keys: set[str] = set()
        for item in value:
            keys.update(walk_keys(item))
        return keys
    return set()


def is_safe_relative_path(value: object) -> bool:
    return (
        isinstance(value, str)
        and bool(SAFE_PATH_RE.fullmatch(value))
        and not value.startswith("/")
        and ".." not in Path(value).parts
    )


def validate_receipt(data: Any, label: str) -> list[str]:
    if not isinstance(data, dict):
        return [f"{label} must contain a JSON object"]
    errors: list[str] = []
    required = {
        "schema_version", "contribution_id", "contribution_kind", "status", "fixture_id",
        "base_commit", "scope", "authorship", "license_boundary", "review_route",
        "test_material_paths", "validation_commands", "privacy", "claim_boundary",
    }
    missing = sorted(required - set(data))
    if missing:
        errors.append(f"{label} missing fields: {', '.join(missing)}")
        return errors
    unexpected = sorted(set(data) - required)
    if unexpected:
        errors.append(f"{label} contains unsupported v1 field(s): {', '.join(unexpected)}")
    if data.get("schema_version") != "1":
        errors.append(f"{label}.schema_version must be '1'")
    if not isinstance(data.get("contribution_id"), str) or not ID_RE.fullmatch(data["contribution_id"]):
        errors.append(f"{label}.contribution_id must use CE-YYYYMMDD-kebab-case")
    if data.get("contribution_kind") not in ALLOWED_KINDS:
        errors.append(f"{label}.contribution_kind must be one of {sorted(ALLOWED_KINDS)}")
    if data.get("status") != "submitted_unreviewed":
        errors.append(f"{label}.status must remain submitted_unreviewed")
    if not isinstance(data.get("fixture_id"), str) or not data["fixture_id"].strip():
        errors.append(f"{label}.fixture_id must be non-empty")
    if not isinstance(data.get("base_commit"), str) or not SHA_RE.fullmatch(data["base_commit"]):
        errors.append(f"{label}.base_commit must be a lowercase 40-character commit SHA")
    if data.get("scope") != "fictional_text_only":
        errors.append(f"{label}.scope must remain fictional_text_only")
    if data.get("authorship") != "original":
        errors.append(f"{label}.authorship must remain original on the fast route")
    if data.get("license_boundary") != "CC-BY-4.0-project-owned-fictional-content":
        errors.append(f"{label}.license_boundary must name the current content license boundary")
    if data.get("review_route") != "fast_material_review":
        errors.append(f"{label}.review_route must remain fast_material_review")
    for field in ("test_material_paths", "validation_commands"):
        values = data.get(field)
        if not isinstance(values, list) or not values or any(not isinstance(value, str) or not value.strip() for value in values):
            errors.append(f"{label}.{field} must be a non-empty list of strings")
    paths = data.get("test_material_paths")
    if isinstance(paths, list):
        if len(set(paths)) != len(paths):
            errors.append(f"{label}.test_material_paths must not contain duplicates")
        for value in paths:
            if not is_safe_relative_path(value):
                errors.append(f"{label}.test_material_paths contains an unsafe relative path")
    commands = data.get("validation_commands")
    if isinstance(commands, list):
        if not any("scripts/validate_contributed_test_material.py" in value for value in commands if isinstance(value, str)):
            errors.append(f"{label}.validation_commands must record the contribution-material validator")
        for value in commands:
            if isinstance(value, str) and any(fragment in value.casefold() for fragment in FORBIDDEN_COMMAND_FRAGMENTS):
                errors.append(f"{label}.validation_commands must not declare a network or model command")
    privacy = data.get("privacy")
    if not isinstance(privacy, dict):
        errors.append(f"{label}.privacy must be an object")
    else:
        missing_privacy = sorted(REQUIRED_PRIVACY_FIELDS - set(privacy))
        if missing_privacy:
            errors.append(f"{label}.privacy missing fields: {', '.join(missing_privacy)}")
        unexpected_privacy = sorted(set(privacy) - REQUIRED_PRIVACY_FIELDS)
        if unexpected_privacy:
            errors.append(f"{label}.privacy contains unsupported field(s): {', '.join(unexpected_privacy)}")
        for field in REQUIRED_PRIVACY_FIELDS:
            if privacy.get(field) is not False:
                errors.append(f"{label}.privacy.{field} must be false")
    if data.get("claim_boundary") != CLAIM_BOUNDARY:
        errors.append(f"{label}.claim_boundary must use the canonical non-claim sentence")
    forbidden = sorted(FORBIDDEN_KEYS & walk_keys(data))
    if forbidden:
        errors.append(f"{label} contains forbidden raw-evidence field(s): {', '.join(forbidden)}")
    return errors


def validate_receipt_artifacts(data: Any, receipt_path: Path, root: Path = ROOT) -> list[str]:
    """Bind a fast-route receipt to its declared, local, text-only files."""
    if not isinstance(data, dict):
        return []
    contribution_id = data.get("contribution_id")
    if not isinstance(contribution_id, str) or receipt_path.parent.name != contribution_id:
        return [f"{receipt_label(receipt_path, root)} must live in a folder named after contribution_id"]

    try:
        contribution_dir = receipt_path.parent.relative_to(root).as_posix()
    except ValueError:
        return [f"{receipt_label(receipt_path, root)} must stay inside the repository root"]
    prefix = f"{contribution_dir}/"
    errors: list[str] = []
    declared = data.get("test_material_paths")
    declared_paths = set(declared) if isinstance(declared, list) and all(isinstance(value, str) for value in declared) else set()

    for value in sorted(declared_paths):
        if not value.startswith(prefix):
            errors.append(f"{receipt_label(receipt_path, root)}.test_material_paths must stay inside {contribution_dir}/")
            continue
        target = root / value
        if target == receipt_path:
            errors.append(f"{receipt_label(receipt_path, root)}.test_material_paths must not list contribution.json as test material")
            continue
        if target.is_symlink():
            errors.append(f"{receipt_label(receipt_path, root)} material must not be a symbolic link: {value}")
            continue
        if not target.is_file():
            errors.append(f"{receipt_label(receipt_path, root)} declares a missing material file: {value}")
            continue
        if target.suffix.casefold() not in ALLOWED_MATERIAL_SUFFIXES:
            errors.append(f"{receipt_label(receipt_path, root)} material must use a text suffix: {value}")
        try:
            data_bytes = target.read_bytes()
        except OSError as exc:
            errors.append(f"cannot read declared material {value}: {exc}")
            continue
        if len(data_bytes) > MAX_MATERIAL_BYTES:
            errors.append(f"{receipt_label(receipt_path, root)} material exceeds {MAX_MATERIAL_BYTES} bytes: {value}")
        if b"\x00" in data_bytes:
            errors.append(f"{receipt_label(receipt_path, root)} material must be text-only: {value}")
        try:
            data_bytes.decode("utf-8")
        except UnicodeDecodeError:
            errors.append(f"{receipt_label(receipt_path, root)} material must be UTF-8 text: {value}")

    actual_paths = {
        path.relative_to(root).as_posix()
        for path in receipt_path.parent.rglob("*")
        if path.is_file() and not path.is_symlink() and path.name != RECEIPT_NAME
    }
    unlisted = sorted(actual_paths - declared_paths)
    if unlisted:
        errors.append(f"{receipt_label(receipt_path, root)} leaves material unlisted: {', '.join(unlisted)}")
    return errors


def validate_fast_route_changed_paths(paths: list[str]) -> list[str]:
    """Require a fast-route PR to modify one receipt folder and nothing else.

    This validation is intentionally applied by the trusted-base workflow. It
    does not execute contribution material. Code and executable validators are
    deliberately outside the fast route.
    """
    if not paths:
        return ["fast material review needs at least one changed path"]
    contribution_ids: set[str] = set()
    errors: list[str] = []
    for path in paths:
        parts = Path(path).parts
        if len(parts) < 4 or parts[0] != "evals" or parts[1] != "contributions" or not ID_RE.fullmatch(parts[2]):
            errors.append(f"fast material review changed an out-of-scope path: {path}")
            continue
        contribution_ids.add(parts[2])
    if len(contribution_ids) != 1:
        errors.append("fast material review must change exactly one contribution folder")
    return errors


def validate_contribution_layout(root: Path = ROOT) -> tuple[Path, list[Path], list[str]]:
    """Reject orphaned or linked files before inspecting individual receipts."""
    contributions = root / "evals" / "contributions"
    if not contributions.is_dir():
        return contributions, [], ["missing evals/contributions"]

    errors: list[str] = []
    receipts: list[Path] = []
    for entry in sorted(contributions.iterdir(), key=lambda path: path.name):
        label = entry.relative_to(root).as_posix()
        if entry.is_symlink():
            errors.append(f"{label} must not be a symbolic link")
            continue
        if entry.is_file():
            if entry.name not in ALLOWED_ROOT_FILES:
                errors.append(f"{label} is not an allowed top-level contribution file")
            continue
        if not entry.is_dir():
            errors.append(f"{label} must be a regular file or contribution folder")
            continue

        receipt = entry / RECEIPT_NAME
        if not receipt.is_file() or receipt.is_symlink():
            errors.append(f"{label} must contain a regular {RECEIPT_NAME}")
            continue
        receipts.append(receipt)
        for path in entry.rglob("*"):
            if path.is_symlink():
                errors.append(f"{path.relative_to(root).as_posix()} must not be a symbolic link")
    return contributions, receipts, errors


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--repository-root",
        type=Path,
        default=ROOT,
        help="repository tree that supplies only untrusted contribution material",
    )
    parser.add_argument(
        "--changed-paths-file",
        type=Path,
        help="optional UTF-8 list of PR-changed paths for fast-route scope validation",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    root = args.repository_root.resolve()
    if not root.is_dir():
        print(f"CONTRIBUTED_TEST_MATERIAL_FAILED\n- repository root does not exist: {root}")
        return 1
    contributions, receipts, errors = validate_contribution_layout(root)
    if args.changed_paths_file:
        try:
            changed_paths = [line.strip() for line in args.changed_paths_file.read_text(encoding="utf-8").splitlines() if line.strip()]
        except (OSError, UnicodeError) as exc:
            errors.append(f"cannot read changed paths file: {exc}")
        else:
            errors.extend(validate_fast_route_changed_paths(changed_paths))
    template = contributions / "contribution-receipt-template.json"
    if not template.is_file():
        errors.append("missing contribution receipt template")
    for path in receipts:
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError) as exc:
            errors.append(f"{receipt_label(path, root)} is not valid UTF-8 JSON: {exc}")
            continue
        errors.extend(validate_receipt(data, receipt_label(path, root)))
        errors.extend(validate_receipt_artifacts(data, path, root))
    if errors:
        print("CONTRIBUTED_TEST_MATERIAL_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"CONTRIBUTED_TEST_MATERIAL_OK receipts={len(receipts)} status=materials-only")
    print("evidence_boundary=not-a-model-run-learner-study-or-status-promotion")
    return 0


if __name__ == "__main__":
    sys.exit(main())
