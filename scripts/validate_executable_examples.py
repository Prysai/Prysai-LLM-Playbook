"""Validate registered executable-example claims and paths."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
import tempfile
from pathlib import Path, PurePosixPath


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/governance/executable-examples.yaml"
RELEASE_CONTRACT = ROOT / "docs/governance/release-evidence.yaml"


def tree_digest(root: Path) -> str:
    files = {
        path.relative_to(root).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
        for path in sorted(root.rglob("*"))
        if path.is_file()
    }
    payload = json.dumps(files, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def release_commands() -> set[tuple[str, ...]]:
    data = json.loads(RELEASE_CONTRACT.read_text(encoding="utf-8"))
    return {
        tuple(command["argv"])
        for dimension in data.get("dimensions", [])
        for command in dimension.get("commands", [])
        if isinstance(command, dict) and isinstance(command.get("argv"), list)
    }


def validate_argv(rid: str, field: str, value: object) -> tuple[str, ...] | None:
    if not isinstance(value, list) or len(value) < 2 or any(not isinstance(item, str) or not item for item in value):
        return None
    argv = tuple(value)
    if argv[0] != "{python}" or not (ROOT / argv[1]).is_file():
        return None
    return argv


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", default=str(MANIFEST))
    args = parser.parse_args()
    manifest_path = Path(args.manifest).resolve()
    errors: list[str] = []
    try:
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"EXECUTABLE_EXAMPLES_FAILED\n- {exc}")
        return 2
    allowed = set(data.get("verification_classes", []))
    registered_release_commands = release_commands()
    records = data.get("records", [])
    if not allowed or not isinstance(records, list) or not records:
        errors.append("manifest needs classes and records")
    seen: set[str] = set()
    for record in records:
        rid = record.get("id")
        if not isinstance(rid, str) or not rid: errors.append("record id missing"); continue
        if rid in seen: errors.append(f"duplicate record id: {rid}")
        seen.add(rid)
        source = record.get("source_path")
        if not isinstance(source, str) or not (ROOT / source).exists(): errors.append(f"{rid}: source missing")
        for projection in record.get("projections", []):
            if not (ROOT / projection).is_file(): errors.append(f"{rid}: projection missing: {projection}")
        classes = set(record.get("verification_classes", []))
        if not classes or not classes <= allowed: errors.append(f"{rid}: invalid verification classes")
        if "human_reviewed" in classes and record.get("learner_run_status") == "not_run": errors.append(f"{rid}: human review overclaims learner evidence")
        if record.get("run_status") == "completed_reference_run":
            required = {"executed", "asserted"}
            if not required <= classes: errors.append(f"{rid}: completed reference run needs executed and asserted")
            negative_fixtures = record.get("negative_fixtures")
            if not isinstance(negative_fixtures, list) or not negative_fixtures or len(set(negative_fixtures)) != len(negative_fixtures):
                errors.append(f"{rid}: negative fixtures missing or duplicated")
            replay = record.get("replay")
            if not isinstance(replay, dict):
                errors.append(f"{rid}: replay contract missing")
            else:
                source_root = (ROOT / str(source)).resolve()
                expected_digest = replay.get("fixture_manifest_sha256")
                if not isinstance(expected_digest, str) or len(expected_digest) != 64 or tree_digest(source_root) != expected_digest:
                    errors.append(f"{rid}: fixture manifest digest mismatch")
                output_subdir = replay.get("output_subdir")
                relative_output = PurePosixPath(output_subdir) if isinstance(output_subdir, str) else None
                if relative_output is None or relative_output.is_absolute() or ".." in relative_output.parts or not relative_output.parts:
                    errors.append(f"{rid}: output_subdir must be a safe relative path")
                    relative_output = None
                runner = validate_argv(rid, "runner_argv", replay.get("runner_argv"))
                validator = validate_argv(rid, "validator_argv", replay.get("validator_argv"))
                fixture_test = validate_argv(rid, "fixture_test_argv", replay.get("fixture_test_argv"))
                for field, argv in (("runner_argv", runner), ("validator_argv", validator), ("fixture_test_argv", fixture_test)):
                    if argv is None:
                        errors.append(f"{rid}: {field} is invalid or references a missing script")
                if relative_output and runner and validator and fixture_test:
                    release_output = "{evidence_dir}/" + relative_output.as_posix()
                    expected_release = {
                        tuple(release_output if item == "{output_dir}" else item for item in runner),
                        tuple(release_output if item == "{output_dir}" else item for item in validator),
                        fixture_test,
                    }
                    missing = expected_release - registered_release_commands
                    if missing:
                        errors.append(f"{rid}: replay commands are not all registered in release evidence")
                    listed = subprocess.run(
                        [sys.executable, str(ROOT / fixture_test[1]), "--list-fixtures"],
                        cwd=ROOT,
                        text=True,
                        encoding="utf-8",
                        errors="replace",
                        capture_output=True,
                        check=False,
                    )
                    try:
                        observed_fixtures = json.loads(listed.stdout) if listed.returncode == 0 else None
                    except json.JSONDecodeError:
                        observed_fixtures = None
                    if observed_fixtures != negative_fixtures:
                        errors.append(f"{rid}: declared negative fixtures do not match the test inventory")
                    expected_attestation = replay.get("packet_attestation_sha256")
                    if not isinstance(expected_attestation, str) or len(expected_attestation) != 64:
                        errors.append(f"{rid}: packet attestation digest missing")
                    else:
                        work_root = ROOT / ".work"
                        work_root.mkdir(exist_ok=True)
                        with tempfile.TemporaryDirectory(prefix="executable-example-replay-", dir=work_root) as temp:
                            output_dir = Path(temp) / relative_output.name
                            def resolved(argv: tuple[str, ...], attest: bool = False) -> list[str]:
                                values = [sys.executable if item == "{python}" else str(output_dir) if item == "{output_dir}" else item for item in argv]
                                return values + (["--attest"] if attest else [])
                            generated = subprocess.run(resolved(runner), cwd=ROOT, text=True, encoding="utf-8", errors="replace", capture_output=True, check=False)
                            checked = subprocess.run(resolved(validator, attest=True), cwd=ROOT, text=True, encoding="utf-8", errors="replace", capture_output=True, check=False) if generated.returncode == 0 else generated
                            match = next((line.split("sha256=", 1)[1] for line in checked.stdout.splitlines() if "_PACKET_ATTESTATION sha256=" in line), None)
                            if generated.returncode != 0 or checked.returncode != 0 or match != expected_attestation:
                                errors.append(f"{rid}: reconstructed packet attestation mismatch")
        environment = record.get("environment", {})
        for field in ("toolchain", "platform", "network", "permissions"):
            if not isinstance(environment.get(field), str) or not environment[field]: errors.append(f"{rid}: environment.{field} missing")
        if not record.get("known_blind_spots"): errors.append(f"{rid}: blind spots missing")
    if errors:
        print("EXECUTABLE_EXAMPLES_FAILED")
        for error in errors: print(f"- {error}")
        return 1
    reference_runs = sum(record.get("run_status") == "completed_reference_run" for record in records)
    learner_runs = sum(record.get("learner_run_status") != "not_run" for record in records)
    print(f"EXECUTABLE_EXAMPLES_OK records={len(records)} classes={len(allowed)} reference_runs={reference_runs} learner_runs={learner_runs}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
