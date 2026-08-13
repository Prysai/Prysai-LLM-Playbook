"""Run the fully offline, deterministic Lab 008 maintainer fixture."""

from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "examples/lab-008-v1"
VALIDATOR = ROOT / "scripts/validate_lab_008_brief.py"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def manifest(root: Path) -> dict[str, str]:
    return {
        path.relative_to(root).as_posix(): digest(path)
        for path in sorted(root.rglob("*"))
        if path.is_file()
    }


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def initial_brief() -> dict[str, object]:
    return {
        "schema_version": "1",
        "question_id": "Q-ORION-WINDOW",
        "conclusion_strength": "definitive",
        "conclusion": "All Orion releases require a 30-minute window and can achieve zero downtime.",
        "source_count_confidence": True,
        "claims": [
            {"claim_id": "C-WINDOW", "text": "All Orion releases require 30 minutes.", "status": "supported", "supported_by": ["S-CURRENT", "S-INACCESSIBLE"]},
            {"claim_id": "C-GENERALIZATION", "text": "The duration applies to every release.", "status": "supported", "supported_by": ["S-FABRICATED"]},
        ],
        "conflicts": [],
        "unknowns": [],
        "limitations": [],
        "stop_receipt": {},
    }


def corrected_brief() -> dict[str, object]:
    return {
        "schema_version": "1",
        "question_id": "Q-ORION-WINDOW",
        "conclusion_strength": "bounded",
        "conclusion": "For the synthetic Orion release 4.2 only, plan a 30-minute maintenance window; the supplied packet does not establish zero downtime or a rule for other releases.",
        "source_count_confidence": False,
        "confidence_basis": "One current authoritative record directly supports the scoped decision; source quantity does not raise confidence.",
        "claims": [
            {"claim_id": "C-WINDOW", "text": "Release 4.2 has a 30-minute planned maintenance window.", "status": "supported", "supported_by": ["S-CURRENT"], "precise_location": "S-CURRENT section maintenance-window"},
            {"claim_id": "C-GENERALIZATION", "text": "The same duration applies to other Orion releases.", "status": "unknown", "supported_by": [], "reason": "The current record is scoped to release 4.2."},
        ],
        "conflicts": [
            {"conflict_id": "D-WINDOW", "claim": "Required window duration for release 4.2", "sources": ["S-CURRENT", "S-STALE"], "disagreement": "The current record says 30 minutes; the superseded record says 60 minutes for the same release.", "resolution_basis": "Preserve the disagreement; use S-CURRENT because it is the current, scope-matched release record. Do not silently erase the superseded instruction."}
        ],
        "unknowns": [
            {"unknown_id": "U-ZERO-DOWNTIME", "reason": "The inaccessible record supplies no inspectable statement.", "next_check": "Obtain the actual memo from an authorized source, then verify its scope."},
            {"unknown_id": "U-OTHER-RELEASES", "reason": "No current source covers other releases.", "next_check": "Inspect the release-specific authoritative record before planning another release."},
        ],
        "rejected_candidates": [
            {"source_id": "S-INACCESSIBLE", "reason": "No artifact or statement is available; metadata cannot support the claim."},
            {"source_id": "S-FABRICATED", "reason": "No source artifact exists; the citation candidate is fabricated."},
        ],
        "limitations": [
            "This is a synthetic fixture, not evidence about a real service.",
            "The supported conclusion applies only to Orion release 4.2.",
            "The inaccessible record and fabricated candidate provide no support.",
            "No runtime maintenance operation, learner run, transfer run, or production validation occurred.",
        ],
        "stop_receipt": {
            "checked_source_ids": ["S-CURRENT", "S-STALE", "S-INACCESSIBLE", "S-FABRICATED"],
            "reason": "fixed_source_budget_exhausted",
            "decision": "Use 30 minutes for the synthetic release 4.2 exercise only.",
            "unresolved": ["U-ZERO-DOWNTIME", "U-OTHER-RELEASES"],
            "next_check": "Acquire an inspectable, scope-matched authoritative record before widening the conclusion.",
            "side_effects": "None outside the explicit output directory.",
        },
    }


def run_validation(brief: Path, log: Path) -> int:
    completed = subprocess.run(
        [sys.executable, str(VALIDATOR), "--brief", str(brief)],
        cwd=ROOT,
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
        check=False,
        env={},
    )
    log.write_text(
        "COMMAND: {python} scripts/validate_lab_008_brief.py --brief <packet-artifact>\n"
        f"EXIT_CODE: {completed.returncode}\n\nSTDOUT\n{completed.stdout}\nSTDERR\n{completed.stderr}",
        encoding="utf-8",
    )
    return completed.returncode


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", required=True)
    args = parser.parse_args()
    output = Path(args.output_dir).resolve()
    work_root = (ROOT / ".work").resolve()
    if output == work_root or work_root not in output.parents:
        print("LAB_008_REFERENCE_FAILED")
        print("- output directory must be a specific child of repository .work")
        return 2
    if output.exists():
        print("LAB_008_REFERENCE_FAILED")
        print("- output directory must not already exist")
        return 2
    artifacts = output / "artifacts"
    logs = output / "logs"
    workspace = output / "workspace"
    artifacts.mkdir(parents=True)
    logs.mkdir()
    workspace.mkdir()

    input_hashes = manifest(FIXTURE)
    write_json(artifacts / "input-hashes.json", input_hashes)
    baseline_hashes = manifest(workspace)
    write_json(artifacts / "baseline-hashes.json", baseline_hashes)

    before = artifacts / "initial-overclaimed-brief.json"
    after = artifacts / "corrected-narrowed-brief.json"
    write_json(before, initial_brief())
    initial_exit = run_validation(before, logs / "initial-overclaim.log")
    if initial_exit == 0:
        print("LAB_008_REFERENCE_FAILED\n- intentional overclaim unexpectedly passed")
        return 1
    write_json(after, corrected_brief())
    corrected_exit = run_validation(after, logs / "narrowed-correction.log")
    if corrected_exit != 0:
        print("LAB_008_REFERENCE_FAILED\n- narrowed correction did not pass")
        return 1

    before_text = before.read_text(encoding="utf-8")
    after_text = after.read_text(encoding="utf-8")
    (artifacts / "before-after.diff").write_text(
        "".join(difflib.unified_diff(before_text.splitlines(True), after_text.splitlines(True), fromfile="initial-overclaimed-brief.json", tofile="corrected-narrowed-brief.json")),
        encoding="utf-8",
    )
    corrected = corrected_brief()
    write_json(artifacts / "claim-ledger.json", corrected["claims"])
    write_json(artifacts / "conflict-record.json", corrected["conflicts"])
    write_json(artifacts / "unknowns.json", corrected["unknowns"])
    write_json(artifacts / "stop-receipt.json", corrected["stop_receipt"])

    existed_before_cleanup = workspace.exists()
    shutil.rmtree(workspace)
    write_json(artifacts / "cleanup-receipt.json", {
        "schema_version": "1",
        "target": "workspace",
        "target_is_packet_child": True,
        "existed_before_cleanup": existed_before_cleanup,
        "exists_after_cleanup": workspace.exists(),
        "scope": "Only the workspace child created by this run was removed."
    })
    registry = {
        "initial_brief": "artifacts/initial-overclaimed-brief.json",
        "corrected_brief": "artifacts/corrected-narrowed-brief.json",
        "before_after_diff": "artifacts/before-after.diff",
        "claim_ledger": "artifacts/claim-ledger.json",
        "conflict_record": "artifacts/conflict-record.json",
        "unknowns": "artifacts/unknowns.json",
        "stop_receipt": "artifacts/stop-receipt.json",
        "input_hashes": "artifacts/input-hashes.json",
        "baseline_hashes": "artifacts/baseline-hashes.json",
        "raw_initial_log": "logs/initial-overclaim.log",
        "raw_corrected_log": "logs/narrowed-correction.log",
        "cleanup_receipt": "artifacts/cleanup-receipt.json",
    }
    hashes = {name: digest(output / path) for name, path in registry.items()}
    run_id = "lab-008-reference-" + hashlib.sha256(json.dumps(input_hashes, sort_keys=True).encode("utf-8")).hexdigest()[:16]
    write_json(output / "run-record.json", {
        "schema_version": "1",
        "run_id": run_id,
        "lab_id": "lab-008",
        "fixture_version": "lab-008-v1",
        "evidence_class": "maintainer_reference_run",
        "execution": "python_standard_library",
        "network": "not_used",
        "credentials": "not_read",
        "external_paths": "not_used",
        "output_boundary": "explicit child of repository .work",
        "attempts": [
            {"attempt": "initial-overclaim", "exit_code": initial_exit, "result": "rejected"},
            {"attempt": "narrowed-correction", "exit_code": corrected_exit, "result": "accepted"},
        ],
        "input_manifest_sha256": digest(artifacts / "input-hashes.json"),
        "baseline_manifest_sha256": digest(artifacts / "baseline-hashes.json"),
        "initial_brief_sha256": digest(before),
        "corrected_brief_sha256": digest(after),
        "artifacts": registry,
        "artifact_hashes": hashes,
        "claims": {
            "reference_fixture_completed": "supported",
            "learner_run": "not_run",
            "transfer_run": "not_run",
            "real_orion_behavior": "not_claimed",
            "production_readiness": "not_claimed"
        },
        "evidence_limit": "One deterministic maintainer reference fixture over synthetic local sources; no learner, model, network, transfer, real-service, or production evidence."
    })
    print(f"LAB_008_REFERENCE_OK run_id={run_id} initial_exit={initial_exit} corrected_exit={corrected_exit} cleanup=passed")
    print(f"output={output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
