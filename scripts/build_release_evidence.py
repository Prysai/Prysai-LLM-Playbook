"""Run release gates and write a commit-bound evidence packet."""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT_PATH = ROOT / "docs/governance/release-evidence.yaml"
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
MATURITY = ("draft", "candidate", "verified", "production-ready")
VERIFIED_BLOCKING_SEVERITIES = {"P0", "P1"}
PRODUCTION_READY_BLOCKING_SEVERITIES = {"P0", "P1", "P2"}


def node_executable() -> str:
    configured = os.environ.get("NODE")
    if configured:
        return configured
    bundled = Path.home() / ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe"
    return str(bundled) if bundled.is_file() else "node"
REQUIRED_COMMANDS = {
    "browser-smoke": ("{node}", "scripts/browser_smoke.mjs"),
    "skill-registry": ("{python}", "scripts/validate_skill_registry.py"),
    "skill-registry-fixtures": ("{python}", "scripts/test_skill_registry.py"),
    "learning-practice-candidate": ("{python}", "scripts/validate_learning_practice_candidate.py"),
    "evidence-review-candidate": ("{python}", "scripts/validate_evidence_review_candidate.py"),
    "evidence-review-candidate-fixtures": ("{python}", "scripts/test_evidence_review_candidate.py"),
    "lab-navigation": ("{python}", "scripts/validate_lab_navigation.py"),
    "lab-navigation-fixtures": ("{python}", "scripts/test_lab_navigation.py"),
    "reader-lab-navigation-fixtures": ("{python}", "scripts/test_reader_lab_navigation.py"),
    "lab-navigation-output": ("{python}", "scripts/build_lab_navigation.py", "--check"),
    "github-template-fixtures": ("{python}", "scripts/test_validate_github_templates.py"),
}


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def validate_contract(contract: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    for key in ("owner", "release_version", "rollback_target", "rollback_reason"):
        if not isinstance(contract.get(key), str) or not contract[key].strip():
            errors.append(f"{key} must be a non-empty string")
    for key in ("status_source", "quality_source", "readiness_source"):
        value = contract.get(key)
        if not isinstance(value, str) or not (ROOT / value).is_file():
            errors.append(f"{key} must name an existing file")
    freshness = contract.get("freshness_sources")
    if not isinstance(freshness, list) or not freshness:
        errors.append("freshness_sources must be a non-empty list")
    else:
        for path in freshness:
            if not isinstance(path, str) or not (ROOT / path).is_file():
                errors.append(f"freshness source is missing: {path}")
    blind_spots = contract.get("known_blind_spots")
    if not isinstance(blind_spots, list) or not blind_spots or any(not isinstance(item, str) or not item.strip() for item in blind_spots):
        errors.append("known_blind_spots must contain non-empty strings")
    dimensions = contract.get("dimensions")
    if not isinstance(dimensions, list) or not dimensions:
        errors.append("dimensions must be a non-empty list")
        return errors
    dimension_ids: set[str] = set()
    command_ids: set[str] = set()
    command_signatures: set[tuple[str, ...]] = set()
    for index, dimension in enumerate(dimensions, start=1):
        label = f"dimensions[{index}]"
        if not isinstance(dimension, dict):
            errors.append(f"{label} must be an object")
            continue
        dimension_id = dimension.get("id")
        if not isinstance(dimension_id, str) or not ID_RE.fullmatch(dimension_id):
            errors.append(f"{label}.id must be kebab-case")
        elif dimension_id in dimension_ids:
            errors.append(f"duplicate dimension id: {dimension_id}")
        else:
            dimension_ids.add(dimension_id)
        for key in ("label", "scope"):
            if not isinstance(dimension.get(key), str) or not dimension[key].strip():
                errors.append(f"{label}.{key} must be a non-empty string")
        commands = dimension.get("commands")
        if not isinstance(commands, list) or not commands:
            errors.append(f"{label}.commands must be non-empty")
            continue
        for command_index, command in enumerate(commands, start=1):
            command_label = f"{label}.commands[{command_index}]"
            if not isinstance(command, dict):
                errors.append(f"{command_label} must be an object")
                continue
            command_id = command.get("id")
            if not isinstance(command_id, str) or not ID_RE.fullmatch(command_id):
                errors.append(f"{command_label}.id must be kebab-case")
            elif command_id in command_ids:
                errors.append(f"duplicate command id: {command_id}")
            else:
                command_ids.add(command_id)
            argv = command.get("argv")
            if not isinstance(argv, list) or not argv or any(not isinstance(value, str) or not value for value in argv):
                errors.append(f"{command_label}.argv must contain non-empty strings")
            elif argv[0] not in {"{python}", "{node}"}:
                errors.append(f"{command_label}.argv must start with {{python}} or {{node}}")
            elif len(argv) < 2 or (argv[0] in {"{python}", "{node}"} and not argv[1].startswith("-") and not (ROOT / argv[1]).is_file()):
                errors.append(f"{command_label} references a missing script")
            else:
                signature = tuple(argv)
                if signature in command_signatures:
                    errors.append(f"{command_label} duplicates an existing command")
                command_signatures.add(signature)
    missing_required = sorted(set(REQUIRED_COMMANDS) - command_ids)
    if missing_required:
        errors.append(
            "release evidence is missing required command ids: "
            + ", ".join(missing_required)
        )
    for command_id, required_argv in REQUIRED_COMMANDS.items():
        actual = next(
            (
                tuple(command.get("argv", []))
                for dimension in contract.get("dimensions", [])
                for command in dimension.get("commands", [])
                if command.get("id") == command_id
            ),
            None,
        )
        if actual is not None and actual != required_argv:
            errors.append(
                f"required command {command_id} must use argv {list(required_argv)}"
            )
    return errors


def collect_dates(value: Any, source: str, trail: str = "") -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    if isinstance(value, dict):
        for key, child in value.items():
            child_trail = f"{trail}.{key}" if trail else key
            if key in {"next_review", "reviewed_at", "last_reviewed", "checked_at", "generated_at"} and isinstance(child, str):
                if child.strip():
                    records.append({"source": source, "field": child_trail, "date": child})
            records.extend(collect_dates(child, source, child_trail))
    elif isinstance(value, list):
        for index, child in enumerate(value):
            records.extend(collect_dates(child, source, f"{trail}[{index}]"))
    return records


def freshness_report(contract: dict[str, Any], generated_day: date) -> dict[str, Any]:
    records: list[dict[str, str]] = []
    invalid: list[dict[str, str]] = []
    overdue: list[dict[str, str]] = []
    for source in contract["freshness_sources"]:
        for record in collect_dates(load_object(ROOT / source), source):
            try:
                parsed = date.fromisoformat(record["date"])
            except ValueError:
                invalid.append(record)
                continue
            if record["field"].endswith("next_review") and parsed < generated_day:
                overdue.append(record)
            records.append(record)
    return {"date_fields_checked": len(records), "overdue": overdue, "invalid": invalid}


def validate_release_policy(quality: dict[str, Any]) -> list[str]:
    policy = quality.get("release_policy", {})
    errors: list[str] = []
    if set(policy.get("verified_blocking_severities", [])) != VERIFIED_BLOCKING_SEVERITIES:
        errors.append("verified blocking severities must remain P0 and P1")
    if set(policy.get("production_ready_blocking_severities", [])) != PRODUCTION_READY_BLOCKING_SEVERITIES:
        errors.append("production-ready blocking severities must remain P0, P1, and P2")
    return errors


def run_gates(contract: dict[str, Any], output_dir: Path) -> list[dict[str, Any]]:
    logs_dir = output_dir / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    dimensions: list[dict[str, Any]] = []
    for dimension in contract["dimensions"]:
        command_results: list[dict[str, Any]] = []
        for command in dimension["commands"]:
            argv = [
                sys.executable if value == "{python}"
                else node_executable() if value == "{node}"
                else value.replace("{evidence_dir}", str(output_dir))
                for value in command["argv"]
            ]
            completed = subprocess.run(argv, cwd=ROOT, text=True, encoding="utf-8", errors="replace", capture_output=True, check=False)
            log_path = logs_dir / f"{command['id']}.log"
            log_path.write_text(
                f"COMMAND: {' '.join(command['argv'])}\nEXIT_CODE: {completed.returncode}\n\nSTDOUT\n{completed.stdout}\nSTDERR\n{completed.stderr}",
                encoding="utf-8",
            )
            command_results.append({
                "id": command["id"],
                "argv": command["argv"],
                "status": "passed" if completed.returncode == 0 else "failed",
                "exit_code": completed.returncode,
                "log": str(log_path.relative_to(output_dir)).replace("\\", "/"),
            })
        dimensions.append({
            "id": dimension["id"],
            "label": dimension["label"],
            "scope": dimension["scope"],
            "status": "passed" if all(item["status"] == "passed" for item in command_results) else "failed",
            "commands": command_results,
        })
    return dimensions


def derive_decision(
    project_status: str,
    dimensions: list[dict[str, Any]],
    freshness: dict[str, Any],
    verified_blockers: list[str] | None = None,
    production_ready_blockers: list[str] | None = None,
) -> str:
    if any(dimension["status"] != "passed" for dimension in dimensions):
        return "blocked"
    if project_status == "verified" and verified_blockers:
        return "blocked"
    if project_status == "production-ready" and production_ready_blockers:
        return "blocked"
    if project_status in {"verified", "production-ready"} and (freshness["overdue"] or freshness["invalid"]):
        return "blocked"
    return project_status


def render_markdown(packet: dict[str, Any]) -> str:
    lines = [
        "# Release evidence packet",
        "",
        f"- Candidate SHA: `{packet['candidate_sha']}`",
        f"- Repository: `{packet['repository']}`",
        f"- Generated at: `{packet['generated_at']}`",
        f"- Declared maturity: `{packet['declared_maturity']}`",
        f"- Derived decision: `{packet['decision']}`",
        f"- Release version: `{packet['release_version']}`",
        f"- Rollback target: `{packet['rollback_target']}`",
        f"- Workflow run: {packet['workflow_run_url'] or 'local / not supplied'}",
        "",
        "A passing packet proves only the named commands ran successfully for the candidate SHA. It does not resolve open quality findings or prove runtime, learner, translation, deployment, accessibility, or user outcomes.",
        "",
        "## Gate matrix",
        "",
        "| Dimension | Scope | Result | Commands |",
        "|---|---|---|---:|",
    ]
    for dimension in packet["dimensions"]:
        lines.append(f"| {dimension['label']} | {dimension['scope']} | `{dimension['status']}` | {len(dimension['commands'])} |")
    lines.extend(["", "## Active quality findings", ""])
    if packet["active_quality_findings"]:
        lines.extend(
            f"- `{item['id']}` {item['severity']} / {item['status']}: {item['finding']}"
            for item in packet["active_quality_findings"]
        )
    else:
        lines.append("- None recorded.")
    lines.extend(["", "## Source freshness", ""])
    lines.append(f"- Date fields checked: `{packet['freshness']['date_fields_checked']}`")
    lines.append(f"- Overdue next-review fields: `{len(packet['freshness']['overdue'])}`")
    lines.append(f"- Invalid date fields: `{len(packet['freshness']['invalid'])}`")
    lines.extend(["", "## Known blind spots", ""])
    lines.extend(f"- {item}" for item in packet["known_blind_spots"])
    lines.extend(["", "## Rollback boundary", "", packet["rollback_reason"], ""])
    lines.extend([
        "## Operational release readiness",
        "",
        f"- Decision: `{packet['release_readiness']['decision']}`",
        f"- Missing dimensions: `{len(packet['release_readiness']['blockers'])}`",
    ])
    lines.extend(f"- `{item}`" for item in packet["release_readiness"]["blockers"])
    lines.extend([
        "",
        "A `not_ready` record can pass its validator: that means the absence is represented honestly, not that a release is ready.",
        "",
    ])
    return "\n".join(lines)


def build_packet(contract: dict[str, Any], args: argparse.Namespace) -> tuple[dict[str, Any], int]:
    generated = datetime.fromisoformat(args.generated_at.replace("Z", "+00:00"))
    status = load_object(ROOT / contract["status_source"])
    quality = load_object(ROOT / contract["quality_source"])
    readiness = load_object(ROOT / contract["readiness_source"])
    project_status = status.get("project", {}).get("status")
    if project_status not in MATURITY:
        raise ValueError("project maturity is not controlled")
    output_dir = Path(args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    dimensions = run_gates(contract, output_dir)
    policy_errors = validate_release_policy(quality)
    if policy_errors:
        raise ValueError("; ".join(policy_errors))
    active_statuses = set(quality["release_policy"]["active_statuses"])
    active = [item for item in quality["items"] if item["status"] in active_statuses]
    verified_blockers = [
        item["id"]
        for item in active
        if item["severity"] in VERIFIED_BLOCKING_SEVERITIES
    ]
    production_ready_blockers = [
        item["id"]
        for item in active
        if item["severity"] in PRODUCTION_READY_BLOCKING_SEVERITIES
    ]
    freshness = freshness_report(contract, generated.date())
    packet = {
        "schema_version": "1",
        "candidate_sha": args.candidate_sha,
        "repository": args.repository,
        "generated_at": generated.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
        "workflow_run_url": args.workflow_run_url,
        "release_version": contract["release_version"],
        "rollback_target": contract["rollback_target"],
        "rollback_reason": contract["rollback_reason"],
        "declared_maturity": project_status,
        "decision": derive_decision(
            project_status,
            dimensions,
            freshness,
            verified_blockers,
            production_ready_blockers,
        ),
        "dimensions": dimensions,
        "active_quality_findings": active,
        "verified_blockers": verified_blockers,
        "production_ready_blockers": production_ready_blockers,
        "freshness": freshness,
        "known_blind_spots": contract["known_blind_spots"],
        "release_readiness": {
            "decision": readiness.get("decision"),
            "blockers": [
                key
                for key, expected in (
                    ("version", "declared"),
                    ("changelog", "current"),
                    ("release_tag", "reviewed"),
                    ("release_evidence", "reviewed"),
                    ("rollback", "rehearsed"),
                    ("maintenance", "reviewed"),
                )
                if readiness.get(key, {}).get("status") != expected
            ],
        },
    }
    (output_dir / "release-evidence.json").write_text(json.dumps(packet, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "release-evidence.md").write_text(render_markdown(packet), encoding="utf-8")
    failed = packet["decision"] == "blocked"
    return packet, 1 if failed else 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Validate the checked-in evidence contract without running gates.")
    parser.add_argument("--output-dir", default=".work/release-evidence")
    parser.add_argument("--candidate-sha", default=os.environ.get("GITHUB_SHA", ""))
    parser.add_argument("--generated-at", default=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))
    parser.add_argument("--repository", default=os.environ.get("GITHUB_REPOSITORY", "local-worktree"))
    parser.add_argument("--workflow-run-url", default="")
    args = parser.parse_args()
    try:
        contract = load_object(CONTRACT_PATH)
        errors = validate_contract(contract)
        if errors:
            print("RELEASE_EVIDENCE_FAILED")
            for error in errors:
                print(f"- {error}")
            return 1
        if args.check:
            print(f"RELEASE_EVIDENCE_CONTRACT_OK dimensions={len(contract['dimensions'])} commands={sum(len(item['commands']) for item in contract['dimensions'])}")
            return 0
        if not SHA_RE.fullmatch(args.candidate_sha):
            print("RELEASE_EVIDENCE_FAILED")
            print("- candidate_sha must be the full 40-character lowercase commit SHA")
            return 1
        packet, exit_code = build_packet(contract, args)
        print(f"RELEASE_EVIDENCE_{'OK' if exit_code == 0 else 'FAILED'} decision={packet['decision']} sha={packet['candidate_sha']}")
        print(f"output={Path(args.output_dir).resolve()}")
        return exit_code
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("RELEASE_EVIDENCE_FAILED")
        print(f"- {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
