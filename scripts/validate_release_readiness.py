"""Validate release readiness without manufacturing release evidence."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT_PATH = ROOT / "docs/governance/release-readiness.yaml"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
VERSION_RE = re.compile(r"^v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$")


def load_contract(path: Path = CONTRACT_PATH) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("release readiness must contain an object")
    return value


def non_empty(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def valid_date(value: Any) -> bool:
    if not isinstance(value, str) or not DATE_RE.fullmatch(value):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def tag_target(name: str) -> str | None:
    completed = subprocess.run(
        ["git", "rev-parse", f"refs/tags/{name}^{{commit}}"],
        cwd=ROOT,
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
        check=False,
    )
    target = completed.stdout.strip()
    return target if completed.returncode == 0 and SHA_RE.fullmatch(target) else None


def validate_contract(contract: dict[str, Any], *, inspect_git: bool = True) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if not non_empty(contract.get("owner")):
        errors.append("owner must be a non-empty string")
    if contract.get("decision") not in {"not_ready", "ready"}:
        errors.append("decision must be not_ready or ready")
    for key in ("reviewed_at", "next_review"):
        if not valid_date(contract.get(key)):
            errors.append(f"{key} must be a real YYYY-MM-DD date")

    version = contract.get("version", {})
    if version.get("status") not in {"pending", "declared"}:
        errors.append("version.status must be pending or declared")
    if version.get("status") == "declared" and not (
        non_empty(version.get("value")) and VERSION_RE.fullmatch(version["value"])
    ):
        errors.append("a declared version must use a semantic release value")

    changelog = contract.get("changelog", {})
    if changelog.get("status") not in {"absent", "current"}:
        errors.append("changelog.status must be absent or current")
    if changelog.get("status") == "current":
        path = changelog.get("path")
        if not non_empty(path) or not (ROOT / path).is_file():
            errors.append("a current changelog must name an existing file")

    release_tag = contract.get("release_tag", {})
    if release_tag.get("status") not in {"absent", "reviewed"}:
        errors.append("release_tag.status must be absent or reviewed")
    if release_tag.get("status") == "reviewed":
        for key in ("name", "commit_sha", "reviewed_by"):
            if not non_empty(release_tag.get(key)):
                errors.append(f"a reviewed release tag requires release_tag.{key}")
        if not valid_date(release_tag.get("reviewed_at")):
            errors.append("a reviewed release tag requires a real reviewed_at date")
        if non_empty(release_tag.get("commit_sha")) and not SHA_RE.fullmatch(release_tag["commit_sha"]):
            errors.append("release_tag.commit_sha must be a full lowercase commit SHA")
        if inspect_git and non_empty(release_tag.get("name")):
            actual = tag_target(release_tag["name"])
            if actual is None:
                errors.append("the reviewed release tag does not exist in this Git checkout")
            elif actual != release_tag.get("commit_sha"):
                errors.append("the reviewed release tag does not resolve to release_tag.commit_sha")

    evidence = contract.get("release_evidence", {})
    if evidence.get("status") not in {"candidate_only", "reviewed"}:
        errors.append("release_evidence.status must be candidate_only or reviewed")
    if evidence.get("status") == "reviewed":
        if not (non_empty(evidence.get("candidate_sha")) and SHA_RE.fullmatch(evidence["candidate_sha"])):
            errors.append("reviewed release evidence requires a full candidate_sha")
        if not non_empty(evidence.get("workflow_run_url")):
            errors.append("reviewed release evidence requires workflow_run_url")

    rollback = contract.get("rollback", {})
    if rollback.get("status") not in {"unavailable", "rehearsed"}:
        errors.append("rollback.status must be unavailable or rehearsed")
    if rollback.get("status") == "rehearsed":
        for key in ("target", "rehearsal_record", "reviewed_by"):
            if not non_empty(rollback.get(key)):
                errors.append(f"a rehearsed rollback requires rollback.{key}")
        if not valid_date(rollback.get("rehearsed_at")):
            errors.append("a rehearsed rollback requires a real rehearsed_at date")
        path = rollback.get("rehearsal_record")
        if non_empty(path) and not (ROOT / path).is_file():
            errors.append("rollback.rehearsal_record must name an existing file")

    maintenance = contract.get("maintenance", {})
    if maintenance.get("status") not in {"candidate", "reviewed"}:
        errors.append("maintenance.status must be candidate or reviewed")
    for key in ("policy_path", "roadmap_path"):
        path = maintenance.get(key)
        if not non_empty(path) or not (ROOT / path).is_file():
            errors.append(f"maintenance.{key} must name an existing file")

    known_gaps = contract.get("known_gaps")
    if not isinstance(known_gaps, list) or not known_gaps or any(not non_empty(item) for item in known_gaps):
        errors.append("known_gaps must contain non-empty strings")

    ready_requirements = {
        "version": version.get("status") == "declared",
        "changelog": changelog.get("status") == "current",
        "release_tag": release_tag.get("status") == "reviewed",
        "release_evidence": evidence.get("status") == "reviewed",
        "rollback": rollback.get("status") == "rehearsed",
        "maintenance": maintenance.get("status") == "reviewed",
    }
    if contract.get("decision") == "ready":
        for name, satisfied in ready_requirements.items():
            if not satisfied:
                errors.append(f"ready decision requires {name} evidence")
        if known_gaps:
            errors.append("ready decision cannot retain known_gaps")
        tag_sha = release_tag.get("commit_sha")
        evidence_sha = evidence.get("candidate_sha")
        if non_empty(tag_sha) and non_empty(evidence_sha) and tag_sha != evidence_sha:
            errors.append("release tag and reviewed evidence must identify the same commit")
        version_value = version.get("value", "")
        tag_name = release_tag.get("name", "")
        if non_empty(version_value) and non_empty(tag_name) and tag_name not in {version_value, f"v{version_value}"}:
            errors.append("release tag name must match the declared version")
    else:
        if all(ready_requirements.values()) and not known_gaps:
            errors.append("all readiness evidence exists but decision remains not_ready")
    return errors


def readiness_blockers(contract: dict[str, Any]) -> list[str]:
    if contract.get("decision") == "ready":
        return []
    names = []
    for key, status, expected in (
        ("version", contract.get("version", {}).get("status"), "declared"),
        ("changelog", contract.get("changelog", {}).get("status"), "current"),
        ("release_tag", contract.get("release_tag", {}).get("status"), "reviewed"),
        ("release_evidence", contract.get("release_evidence", {}).get("status"), "reviewed"),
        ("rollback", contract.get("rollback", {}).get("status"), "rehearsed"),
        ("maintenance", contract.get("maintenance", {}).get("status"), "reviewed"),
    ):
        if status != expected:
            names.append(key)
    return names


def main() -> int:
    try:
        contract = load_contract()
        errors = validate_contract(contract)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors = [str(exc)]
        contract = {}
    if errors:
        print("RELEASE_READINESS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    blockers = readiness_blockers(contract)
    print(
        f"RELEASE_READINESS_OK decision={contract['decision']} "
        f"blockers={len(blockers)} ({','.join(blockers) or 'none'})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
