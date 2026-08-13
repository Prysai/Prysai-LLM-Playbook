"""Validate and render the current quality register from one machine source."""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/governance/quality-register.yaml"
STATUS_SOURCE = ROOT / "docs/governance/content-status.yaml"
OUTPUT = ROOT / "docs/quality/quality-register.md"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ID_RE = re.compile(r"^Q-[0-9]{3}$")
MATURITY_ORDER = {"draft": 0, "candidate": 1, "verified": 2, "production-ready": 3}


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def validate(register: dict[str, Any], content_status: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if register.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if not isinstance(register.get("reviewed_at"), str) or not DATE_RE.fullmatch(register["reviewed_at"]):
        errors.append("reviewed_at must use YYYY-MM-DD")
    if not isinstance(register.get("owner"), str) or not register["owner"].strip():
        errors.append("owner must be a non-empty string")

    statuses = register.get("status_vocabulary")
    severities = register.get("severity_vocabulary")
    if statuses != ["open", "in_progress", "resolved"]:
        errors.append("status_vocabulary must be open, in_progress, resolved")
        statuses = []
    if severities != ["P0", "P1", "P2"]:
        errors.append("severity_vocabulary must be P0, P1, P2")
        severities = []

    policy = register.get("release_policy")
    if not isinstance(policy, dict):
        errors.append("release_policy must be an object")
        policy = {}
    active_statuses = policy.get("active_statuses")
    if active_statuses != ["open", "in_progress"]:
        errors.append("release_policy.active_statuses must be open, in_progress")
        active_statuses = []
    for key in ("verified_blocking_severities", "production_ready_blocking_severities"):
        values = policy.get(key)
        if not isinstance(values, list) or not values or any(value not in severities for value in values):
            errors.append(f"release_policy.{key} must contain controlled severities")
    if policy.get("content_status_source") != "docs/governance/content-status.yaml":
        errors.append("release_policy.content_status_source must name the canonical status source")

    items = register.get("items")
    if not isinstance(items, list) or not items:
        errors.append("items must be a non-empty list")
        items = []
    ids: set[str] = set()
    references: list[tuple[str, str]] = []
    previous_number = 0
    for index, item in enumerate(items, start=1):
        label = f"items[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label} must be an object")
            continue
        item_id = item.get("id")
        if not isinstance(item_id, str) or not ID_RE.fullmatch(item_id):
            errors.append(f"{label}.id must match Q-NNN")
        else:
            number = int(item_id[2:])
            if item_id in ids:
                errors.append(f"{label}.id is duplicated: {item_id}")
            if number <= previous_number:
                errors.append(f"{label}.id must be in ascending numeric order")
            previous_number = number
            ids.add(item_id)
        if item.get("severity") not in severities:
            errors.append(f"{label}.severity is not controlled")
        if item.get("status") not in statuses:
            errors.append(f"{label}.status is not controlled")
        for key in ("owner", "area", "finding", "required_evidence"):
            if not isinstance(item.get(key), str) or not item[key].strip():
                errors.append(f"{label}.{key} must be a non-empty string")
        for key in ("opened_at", "next_review"):
            value = item.get(key)
            if not isinstance(value, str) or not DATE_RE.fullmatch(value):
                errors.append(f"{label}.{key} must use YYYY-MM-DD")
            else:
                try:
                    date.fromisoformat(value)
                except ValueError:
                    errors.append(f"{label}.{key} must be a real calendar date")
        if (
            isinstance(item.get("opened_at"), str)
            and isinstance(item.get("next_review"), str)
            and DATE_RE.fullmatch(item["opened_at"])
            and DATE_RE.fullmatch(item["next_review"])
            and item["next_review"] < item["opened_at"]
        ):
            errors.append(f"{label}.next_review cannot be before opened_at")
        superseded_by = item.get("superseded_by")
        if not isinstance(superseded_by, str):
            errors.append(f"{label}.superseded_by must be a string")
        elif superseded_by:
            references.append((label, superseded_by))
        paths = item.get("evidence_paths")
        if not isinstance(paths, list) or not paths:
            errors.append(f"{label}.evidence_paths must be non-empty")
        else:
            for path in paths:
                if not isinstance(path, str) or not (ROOT / path).exists():
                    errors.append(f"{label}.evidence_paths is missing: {path}")
        resolution = item.get("resolution_scope")
        if not isinstance(resolution, str):
            errors.append(f"{label}.resolution_scope must be a string")
        elif item.get("status") == "resolved" and not resolution.strip():
            errors.append(f"{label}.resolved item requires resolution_scope")

    for label, superseded_by in references:
        if not ID_RE.fullmatch(superseded_by):
            errors.append(f"{label}.superseded_by must be empty or match Q-NNN")
        elif superseded_by not in ids:
            errors.append(f"{label}.superseded_by references an unknown item: {superseded_by}")

    project = content_status.get("project")
    project_status = project.get("status") if isinstance(project, dict) else None
    if project_status not in MATURITY_ORDER:
        errors.append("content status project.status is not controlled")
    else:
        active = [item for item in items if isinstance(item, dict) and item.get("status") in active_statuses]
        verified_blockers = [item for item in active if item.get("severity") in policy.get("verified_blocking_severities", [])]
        production_blockers = [item for item in active if item.get("severity") in policy.get("production_ready_blocking_severities", [])]
        if MATURITY_ORDER[project_status] >= MATURITY_ORDER["verified"] and verified_blockers:
            errors.append("project cannot claim verified while active P0/P1 quality blockers exist")
        if project_status == "production-ready" and production_blockers:
            errors.append("project cannot claim production-ready while any active quality blocker exists")
    return errors


def escape_cell(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ")


def render(register: dict[str, Any], content_status: dict[str, Any]) -> str:
    items = register["items"]
    active_statuses = set(register["release_policy"]["active_statuses"])
    active = [item for item in items if item["status"] in active_statuses]
    counts = Counter(item["severity"] for item in active)
    project_status = content_status["project"]["status"]
    lines = [
        "# Current quality register",
        "",
        "<!-- Generated by scripts/build_quality_register.py. Do not edit by hand. -->",
        "",
        "This is the current defect ledger for the curriculum release. Its machine",
        "source is [`docs/governance/quality-register.yaml`](../governance/quality-register.yaml).",
        "Historical review reports remain evidence, but they do not close an item",
        "without a recorded status and evidence path here.",
        "",
        "## Derived release decision",
        "",
        f"- Current project maturity: `{project_status}`.",
        f"- Active blockers: P0 `{counts['P0']}` · P1 `{counts['P1']}` · P2 `{counts['P2']}`.",
        "- Active P0/P1 items block a `verified` claim.",
        "- Any active item blocks a `production-ready` claim.",
        "- A passing register check proves that the claim matches the ledger; it does not resolve the defects.",
        "",
        "## Defect ledger",
        "",
        "| ID | Severity | Owner / review | Area | Current finding | Required evidence to close | Status | Evidence / resolution scope |",
        "|---|---|---|---|---|---|---|---|",
    ]
    for item in items:
        paths = ", ".join(f"`{path}`" for path in item["evidence_paths"])
        scope = item["resolution_scope"] or "No resolution recorded."
        supersession = f" Superseded by `{item['superseded_by']}`." if item["superseded_by"] else ""
        evidence = f"{paths}. {scope}{supersession}"
        lines.append(
            "| " + " | ".join(
                escape_cell(str(value))
                for value in (
                    item["id"], item["severity"],
                    f"{item['owner']}; opened {item['opened_at']}; next {item['next_review']}",
                    item["area"], item["finding"], item["required_evidence"],
                    item["status"], evidence,
                )
            ) + " |"
        )
    lines.extend([
        "",
        "The release decision is therefore `candidate / static checks passed / runtime evidence pending`.",
        "The ledger must be regenerated after changing its machine source.",
        "",
    ])
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        register = load_object(SOURCE)
        content_status = load_object(STATUS_SOURCE)
        errors = validate(register, content_status)
        expected = render(register, content_status)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("QUALITY_REGISTER_FAILED")
        print(f"- {exc}")
        return 1
    if errors:
        print("QUALITY_REGISTER_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    if args.check:
        if not OUTPUT.is_file() or OUTPUT.read_text(encoding="utf-8") != expected:
            print("QUALITY_REGISTER_FAILED")
            print(f"- generated output is stale: {OUTPUT.relative_to(ROOT)}")
            print("- run: python scripts/build_quality_register.py")
            return 1
    else:
        OUTPUT.write_text(expected, encoding="utf-8")
    active = [item for item in register["items"] if item["status"] in register["release_policy"]["active_statuses"]]
    counts = Counter(item["severity"] for item in active)
    verb = "OK" if args.check else "BUILT"
    print(f"QUALITY_REGISTER_{verb} items={len(register['items'])} active_p0={counts['P0']} active_p1={counts['P1']} active_p2={counts['P2']}")
    print(f"project_status={content_status['project']['status']} verified_claim_blocked={bool(counts['P0'] or counts['P1'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
