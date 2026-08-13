"""Run the deterministic Lab 013 maintainer reference slice."""

from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import os
import platform
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "examples/lab-013-v1"
VALIDATOR = ROOT / "scripts/validate_lab_013_release_note.py"


def now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def manifest(root: Path) -> dict[str, str]:
    return {
        path.relative_to(root).as_posix(): sha256(path)
        for path in sorted(root.rglob("*"))
        if path.is_file()
    }


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def run_check(product: Path, output: Path, attempt: str) -> dict[str, object]:
    command = [sys.executable, str(VALIDATOR), "--product-root", str(product), "--fixture", str(FIXTURE)]
    completed = subprocess.run(command, cwd=ROOT, text=True, encoding="utf-8", errors="replace", capture_output=True, check=False)
    log = output / "logs" / f"{attempt}.log"
    log.write_text(
        f"COMMAND: {{python}} scripts/validate_lab_013_release_note.py --product-root <temporary-product> --fixture examples/lab-013-v1\n"
        f"EXIT_CODE: {completed.returncode}\n\nSTDOUT\n{completed.stdout}\nSTDERR\n{completed.stderr}",
        encoding="utf-8",
    )
    return {"attempt": attempt, "exit_code": completed.returncode, "log": log.relative_to(output).as_posix()}


def note(include_second: bool) -> str:
    second = "- CHG-102 — Clarify that publication has not run. (EV-102)\n" if include_second else ""
    return (
        "# Candidate release note\n\n"
        "Decision: candidate — do not publish\n\n"
        "## Included changes\n\n"
        "- CHG-101 — Document the local validation command. (EV-101)\n"
        f"{second}\n"
        "## Evidence\n\n"
        "The local fixture validator checks the fixed ledger and this file.\n\n"
        "## Limits\n\n"
        "Publication: not run  \nSecurity review: unknown  \nMaintainer approval: pending\n\n"
        "## Next check\n\n"
        "A separate reviewer should reconcile the packet against the frozen rubric.\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", required=True)
    args = parser.parse_args()
    output = Path(args.output_dir).resolve()
    evidence_root = (ROOT / ".work").resolve()
    if output == evidence_root or evidence_root not in output.parents:
        print("LAB_013_REFERENCE_FAILED")
        print("- output directory must be a specific child of the repository .work directory")
        return 2
    if output.exists():
        shutil.rmtree(output)
    (output / "logs").mkdir(parents=True)
    (output / "artifacts").mkdir()
    started = now()
    run_id = "lab-013-reference-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    action_log: list[dict[str, str]] = []
    temporary = tempfile.TemporaryDirectory(prefix="prysai-lab013-")
    temp = temporary.name
    target_id = hashlib.sha256(temp.encode("utf-8")).hexdigest()[:16]
    existed_before_cleanup = False
    try:
        product = Path(temp) / "product"
        shutil.copytree(FIXTURE / "seed", product)
        baseline = manifest(product)
        fixture_hashes = manifest(FIXTURE)
        target = product / "release-notes/next.md"
        original = target.read_text(encoding="utf-8")
        checkpoints = {
            "CP0": {"status": "passed", "decision": "fixed local scope, authority, baseline, and rollback", "at": now()},
            "CP1": {"status": "passed", "decision": "one allowed output and one deterministic failure", "at": now()},
        }
        action_log.extend([
            {"at": checkpoints["CP0"]["at"], "observation": "frozen fixture and seed copied", "action": "record baseline manifest and authority", "result": "CP0 passed", "state_change": "defined", "risk": "disposable local copy", "next_step": "plan one allowed output"},
            {"at": checkpoints["CP1"]["at"], "observation": "one allowed product path and fixed check", "action": "select deterministic missing-ID failure", "result": "CP1 passed", "state_change": "planned", "risk": "no external action", "next_step": "write intentional failure"},
        ])
        target.write_text(note(False), encoding="utf-8")
        failed_hash = sha256(target)
        (output / "artifacts/failed-release-note.md").write_text(target.read_text(encoding="utf-8"), encoding="utf-8")
        failed_manifest = manifest(product)
        write_json(output / "artifacts/baseline-manifest.json", baseline)
        write_json(output / "artifacts/failed-manifest.json", failed_manifest)
        failed = run_check(product, output, "intentional-failure")
        if failed["exit_code"] == 0:
            print("LAB_013_REFERENCE_FAILED\n- intentional failure unexpectedly passed")
            return 1
        action_log.append({"at": now(), "observation": "CHG-102 intentionally omitted", "action": "run fixed validator", "result": "non-zero preserved", "state_change": "CP3 failed", "risk": "bounded local artifact", "next_step": "add only CHG-102 ledger row"})
        checkpoints["CP2"] = {"status": "passed", "decision": "invalid candidate created within allowed path", "at": now()}
        checkpoints["CP3"] = {"status": "failed_then_recovered", "decision": "missing CHG-102 diagnosed from fixed check", "at": now()}
        target.write_text(note(True), encoding="utf-8")
        recovery_diff = "".join(difflib.unified_diff(
            (output / "artifacts/failed-release-note.md").read_text(encoding="utf-8").splitlines(True),
            target.read_text(encoding="utf-8").splitlines(True),
            fromfile="failed/release-notes/next.md",
            tofile="recovered/release-notes/next.md",
        ))
        (output / "artifacts/recovery.diff").write_text(recovery_diff, encoding="utf-8")
        passing = run_check(product, output, "bounded-recovery")
        if passing["exit_code"] != 0:
            print("LAB_013_REFERENCE_FAILED\n- bounded recovery did not pass")
            return 1
        action_log.append({"at": now(), "observation": "validator named missing CHG-102", "action": "add CHG-102 summary and EV-102 only", "result": "fixed validator passed", "state_change": "CP3 recovered", "risk": "bounded local artifact", "next_step": "independent packet review"})
        final_text = target.read_text(encoding="utf-8")
        diff = "".join(difflib.unified_diff(original.splitlines(True), final_text.splitlines(True), fromfile="seed/release-notes/next.md", tofile="product/release-notes/next.md"))
        (output / "artifacts/release-note.md").write_text(final_text, encoding="utf-8")
        (output / "artifacts/change.diff").write_text(diff, encoding="utf-8")
        recovery_manifest = manifest(product)
        write_json(output / "artifacts/recovery-manifest.json", recovery_manifest)
        changed_paths = [path for path, digest in recovery_manifest.items() if baseline.get(path) != digest]
        checkpoints["CP4"] = {"status": "passed", "decision": "handoff scoped to local fixture; review pending", "at": now()}
        action_log.append({"at": checkpoints["CP4"]["at"], "observation": "final artifact, diff, manifests, and both logs preserved", "action": "prepare bounded handoff", "result": "CP4 passed", "state_change": "review pending", "risk": "no publication action observed", "next_step": "independent packet review"})
        packet = {
            "schema_version": "1",
            "run_id": run_id,
            "lab_id": "lab-013",
            "fixture_version": "lab-013-v1",
            "evidence_class": "maintainer_reference_run",
            "operator_role": "deterministic-project-runner",
            "started_at": started,
            "ended_at": now(),
            "timezone": "UTC",
            "repository_revision": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
            "runtime": {"python": platform.python_version(), "os": platform.system(), "os_release": platform.release()},
            "model": "not_used",
            "provider": "not_used",
            "surface": "standard-library deterministic runner",
            "fixture_hashes": fixture_hashes,
            "baseline_hashes": baseline,
            "allowed_product_paths": ["release-notes/next.md"],
            "forbidden_actions": ["network", "install", "commit", "push", "publish", "message", "secret-read", "production-write"],
            "checkpoints": checkpoints,
            "attempts": [failed, passing],
            "failed_artifact_sha256": failed_hash,
            "failed_artifact": "artifacts/failed-release-note.md",
            "final_artifact_sha256": sha256(output / "artifacts/release-note.md"),
            "changed_product_paths": changed_paths,
            "diff": "artifacts/change.diff",
            "recovery_diff": "artifacts/recovery.diff",
            "product_manifests": ["artifacts/baseline-manifest.json", "artifacts/failed-manifest.json", "artifacts/recovery-manifest.json"],
            "artifact": "artifacts/release-note.md",
            "action_log": "action-log.jsonl",
            "claims": [
                {"id": "artifact-created", "status": "supported", "evidence": "artifacts/release-note.md"},
                {"id": "focused-check-passed", "status": "supported", "evidence": "logs/bounded-recovery.log"},
                {"id": "publication-not-run", "status": "not_observed", "evidence": "forbidden_actions plus complete local action-log.jsonl; absence is bounded to this runner trace"},
                {"id": "learner-run-not-observed", "status": "not_run", "evidence": "evidence_class"},
                {"id": "transfer-not-run", "status": "not_run", "evidence": "evidence_class"}
            ],
            "rollback_target": baseline["release-notes/next.md"],
            "cleanup": {"status": "pending", "target_id": target_id, "receipt": "cleanup-receipt.json"},
            "unknowns": ["learner independence", "transfer", "Codex behavior", "publication", "reader outcome"],
            "smallest_next_check": "independent reviewer reconciles packet against review-rubric.json",
            "operator_status": "passed",
            "review_status": "pending",
            "evidence_limit": "One deterministic maintainer reference run; not learner, model, Codex, transfer, publication, or production evidence."
        }
        write_json(output / "run-record.json", packet)
        with (output / "action-log.jsonl").open("w", encoding="utf-8") as handle:
            for item in action_log:
                handle.write(json.dumps(item, ensure_ascii=False) + "\n")
        existed_before_cleanup = Path(temp).exists()
    finally:
        temporary.cleanup()
    cleanup_receipt = {
        "schema_version": "1",
        "target_id": target_id,
        "target_path_redacted": True,
        "existed_before_cleanup": existed_before_cleanup,
        "exists_after_cleanup": Path(temp).exists(),
        "cleaned_at": now(),
        "scope": "one TemporaryDirectory root created by this run"
    }
    write_json(output / "cleanup-receipt.json", cleanup_receipt)
    record_path = output / "run-record.json"
    packet = json.loads(record_path.read_text(encoding="utf-8"))
    packet["cleanup"]["status"] = "passed" if existed_before_cleanup and not Path(temp).exists() else "failed"
    write_json(record_path, packet)
    if packet["cleanup"]["status"] != "passed":
        print("LAB_013_REFERENCE_FAILED\n- cleanup receipt did not prove target removal")
        return 1
    print(f"LAB_013_REFERENCE_OK run_id={run_id} failure_exit=1 recovery_exit=0 cleanup=passed")
    print(f"output={output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
