"""Validate a stored Lab 013 reference packet and its evidence."""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "examples/lab-013-v1"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def packet_attestation(packet_root: Path, record: dict[str, object]) -> str:
    artifact_path = Path(str(record.get("artifact", "")))
    artifact_text = ""
    if artifact_path.parts:
        artifact_text = (packet_root / artifact_path).read_text(encoding="utf-8").replace("\r\n", "\n")
    stable = {
        "fixture_version": record.get("fixture_version"),
        "acceptance": json.loads((FIXTURE / "expected/acceptance.json").read_text(encoding="utf-8")),
        "checkpoints": {
            key: {"status": value.get("status"), "decision": value.get("decision")}
            for key, value in record.get("checkpoints", {}).items()
            if isinstance(value, dict)
        },
        "attempts": [
            {"attempt": item.get("attempt"), "exit_code": item.get("exit_code")}
            for item in record.get("attempts", [])
            if isinstance(item, dict)
        ],
        "artifact_text": artifact_text,
        "changed_product_paths": record.get("changed_product_paths"),
        "claims": record.get("claims"),
        "cleanup_status": record.get("cleanup", {}).get("status") if isinstance(record.get("cleanup"), dict) else None,
        "evidence_limit": record.get("evidence_limit"),
    }
    return hashlib.sha256(json.dumps(stable, sort_keys=True, separators=(",", ":")).encode("utf-8")).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--packet", required=True)
    parser.add_argument("--attest", action="store_true")
    args = parser.parse_args()
    packet_root = Path(args.packet).resolve()
    errors: list[str] = []
    try:
        record = json.loads((packet_root / "run-record.json").read_text(encoding="utf-8"))
        acceptance = json.loads((FIXTURE / "expected/acceptance.json").read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"LAB_013_PACKET_FAILED\n- packet input error: {exc}")
        return 2
    if record.get("evidence_class") != "maintainer_reference_run": errors.append("wrong evidence_class")
    if record.get("model") != "not_used" or record.get("provider") != "not_used": errors.append("reference runner must not imply a model run")
    if list(record.get("checkpoints", {})) != acceptance["required_checkpoints"]: errors.append("CP0-CP4 sequence drift")
    attempts = record.get("attempts", [])
    if [item.get("attempt") for item in attempts] != acceptance["required_attempt_sequence"]: errors.append("attempt sequence drift")
    if [item.get("exit_code") for item in attempts] != acceptance["required_check_exit_codes"]: errors.append("failure/recovery exits drift")
    if record.get("changed_product_paths") != acceptance["allowed_product_paths"]: errors.append("changed product path escaped boundary")
    for item in attempts:
        path = packet_root / str(item.get("log", ""))
        if not path.is_file() or f"EXIT_CODE: {item.get('exit_code')}" not in path.read_text(encoding="utf-8"): errors.append(f"attempt log missing or inconsistent: {item.get('attempt')}")
    artifact = packet_root / str(record.get("artifact", ""))
    if not artifact.is_file() or digest(artifact) != record.get("final_artifact_sha256"): errors.append("final artifact hash mismatch")
    diff = packet_root / str(record.get("diff", ""))
    if not diff.is_file() or "release-notes/next.md" not in diff.read_text(encoding="utf-8"): errors.append("diff missing target")
    failed_artifact = packet_root / str(record.get("failed_artifact", ""))
    if not failed_artifact.is_file() or digest(failed_artifact) != record.get("failed_artifact_sha256"): errors.append("failed artifact missing or hash mismatch")
    recovery_diff = packet_root / str(record.get("recovery_diff", ""))
    if not recovery_diff.is_file(): errors.append("recovery diff missing")
    else:
        recovery_text = recovery_diff.read_text(encoding="utf-8")
        additions = [line[1:] for line in recovery_text.splitlines() if line.startswith("+") and not line.startswith("+++")]
        if additions != ["- CHG-102 — Clarify that publication has not run. (EV-102)"]:
            errors.append("bounded recovery changed more than diagnosed CHG-102 row")
    manifest_paths = record.get("product_manifests", [])
    if len(manifest_paths) != 3 or any(not (packet_root / path).is_file() for path in manifest_paths): errors.append("product manifests missing")
    claims = {item.get("id"): item for item in record.get("claims", [])}
    if set(claims) != set(acceptance["required_claims"]): errors.append("claim ledger coverage drift")
    if claims.get("learner-run-not-observed", {}).get("status") != "not_run": errors.append("learner boundary overclaimed")
    if claims.get("transfer-not-run", {}).get("status") != "not_run": errors.append("transfer boundary overclaimed")
    if claims.get("publication-not-run", {}).get("status") != "not_observed": errors.append("publication absence must remain not_observed")
    if record.get("review_status") not in {"pending", "accepted", "rejected", "disputed"}: errors.append("invalid review status")
    if record.get("operator_status") != "passed": errors.append("operator run did not pass")
    cleanup = record.get("cleanup", {})
    receipt_path = packet_root / str(cleanup.get("receipt", ""))
    if cleanup.get("status") != "passed" or not receipt_path.is_file(): errors.append("cleanup not recorded")
    else:
        receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
        if receipt.get("target_id") != cleanup.get("target_id") or receipt.get("existed_before_cleanup") is not True or receipt.get("exists_after_cleanup") is not False:
            errors.append("cleanup receipt inconsistent")
    if errors:
        print("LAB_013_PACKET_FAILED")
        for error in errors: print(f"- {error}")
        return 1
    print("LAB_013_PACKET_OK evidence_class=maintainer_reference_run attempts=2 checkpoints=5 learner_run=not_run")
    if args.attest:
        print(f"LAB_013_PACKET_ATTESTATION sha256={packet_attestation(packet_root, record)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
