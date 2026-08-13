"""Validate a Lab 008 brief or a complete deterministic evidence packet."""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path, PurePosixPath


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "examples/lab-008-v1"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def packet_attestation(packet_root: Path) -> str:
    record = load_json(packet_root / "run-record.json")
    if not isinstance(record, dict):
        raise ValueError("run record must be an object")
    stable = {
        "fixture_version": record.get("fixture_version"),
        "input_manifest_sha256": record.get("input_manifest_sha256"),
        "attempts": record.get("attempts"),
        "artifact_hashes": record.get("artifact_hashes"),
        "claims": record.get("claims"),
        "evidence_limit": record.get("evidence_limit"),
    }
    return hashlib.sha256(json.dumps(stable, sort_keys=True, separators=(",", ":")).encode("utf-8")).hexdigest()


def load_json(path: Path) -> object:
    return json.loads(path.read_text(encoding="utf-8"))


def safe_artifact(root: Path, value: object) -> Path | None:
    if not isinstance(value, str):
        return None
    relative = PurePosixPath(value)
    if relative.is_absolute() or not relative.parts or ".." in relative.parts:
        return None
    candidate = (root / Path(*relative.parts)).resolve()
    return candidate if root == candidate or root in candidate.parents else None


def validate_brief(brief: dict[str, object], acceptance: dict[str, object]) -> list[str]:
    errors: list[str] = []
    if brief.get("question_id") != acceptance["question_id"]:
        errors.append("question scope drift")
    if brief.get("conclusion_strength") != acceptance["required_conclusion_strength"]:
        errors.append("conclusion was not downgraded to bounded")
    conclusion = brief.get("conclusion")
    if conclusion != acceptance["required_conclusion"]:
        errors.append("conclusion does not match the bounded evidence decision")
    if brief.get("source_count_confidence") is not False:
        errors.append("confidence must not be derived from source count")

    claims_value = brief.get("claims", [])
    claims = {item.get("claim_id"): item for item in claims_value if isinstance(item, dict)}
    if set(claims) != set(acceptance["required_claim_ids"]):
        errors.append("claim ledger coverage drift")
    required_claim_text = acceptance["required_claim_text"]
    for claim_id, expected_text in required_claim_text.items():
        if claims.get(claim_id, {}).get("text") != expected_text:
            errors.append(f"claim text drift: {claim_id}")
    forbidden = set(acceptance["forbidden_support_ids"])
    for claim_id, claim in claims.items():
        support = claim.get("supported_by", [])
        if not isinstance(support, list):
            errors.append(f"support list malformed: {claim_id}")
            continue
        rejected = forbidden.intersection(support)
        if rejected:
            errors.append(f"ineligible source used as support: {claim_id}: {sorted(rejected)}")
    window = claims.get("C-WINDOW", {})
    if window.get("status") != "supported" or window.get("supported_by") != ["S-CURRENT"]:
        errors.append("window claim must rely only on the current authoritative source")
    generalization = claims.get("C-GENERALIZATION", {})
    if generalization.get("status") != "unknown" or generalization.get("supported_by") != []:
        errors.append("cross-release generalization must remain unknown")

    conflicts = brief.get("conflicts", [])
    conflict = next(
        (item for item in conflicts if isinstance(item, dict) and item.get("conflict_id") == acceptance["required_conflict_id"]),
        None,
    )
    if not conflict:
        errors.append("required conflict record missing")
    elif set(conflict.get("sources", [])) != {"S-CURRENT", "S-STALE"} or not conflict.get("resolution_basis"):
        errors.append("conflict record does not preserve both sources and resolution basis")

    unknowns = brief.get("unknowns", [])
    unknown_ids = {item.get("unknown_id") for item in unknowns if isinstance(item, dict)}
    if unknown_ids != set(acceptance["required_unknown_ids"]):
        errors.append("unknown ledger coverage drift")
    limitations = brief.get("limitations", [])
    if not isinstance(limitations, list) or len(limitations) < 3:
        errors.append("limitations are missing or incomplete")
    else:
        joined = " ".join(str(item).lower() for item in limitations)
        for required in ("synthetic", "release 4.2", "inaccessible"):
            if required not in joined:
                errors.append(f"limitation missing: {required}")
    stop = brief.get("stop_receipt", {})
    if not isinstance(stop, dict) or stop.get("reason") != "fixed_source_budget_exhausted" or not stop.get("next_check"):
        errors.append("stop receipt missing or incomplete")
    return errors


def validate_sources(by_id: dict[str, dict[str, object]], acceptance: dict[str, object]) -> list[str]:
    errors: list[str] = []
    if set(by_id) != set(acceptance["required_source_ids"]):
        errors.append("source packet coverage drift")
    for source_id, expected_statement in acceptance["required_source_statements"].items():
        if by_id.get(source_id, {}).get("statement") != expected_statement:
            errors.append(f"frozen source statement drift: {source_id}")
    current = by_id.get("S-CURRENT", {})
    stale = by_id.get("S-STALE", {})
    if current.get("scope") != stale.get("scope"):
        errors.append("declared conflict is not scope-matched")
    if current.get("statement") == stale.get("statement"):
        errors.append("declared conflict has no statement disagreement")
    if current.get("eligible_for_support") is not True or any(
        by_id.get(source_id, {}).get("eligible_for_support") is not False
        for source_id in acceptance["forbidden_support_ids"]
    ):
        errors.append("source eligibility drift")
    return errors


def validate_packet(packet_root: Path, acceptance: dict[str, object]) -> list[str]:
    errors: list[str] = []
    work_root = (ROOT / ".work").resolve()
    if packet_root == work_root or work_root not in packet_root.parents:
        return ["packet path must be a specific child of repository .work"]
    try:
        record = load_json(packet_root / "run-record.json")
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        return [f"packet input error: {exc}"]
    if not isinstance(record, dict):
        return ["run record must be an object"]
    if record.get("network") != "not_used" or record.get("credentials") != "not_read":
        errors.append("offline or credential boundary overclaimed")
    source_records = {
        path.stem: load_json(path)
        for path in sorted((FIXTURE / "sources").glob("*.json"))
    }
    by_id = {
        item.get("source_id"): item
        for item in source_records.values()
        if isinstance(item, dict)
    }
    errors.extend(validate_sources(by_id, acceptance))
    attempts = record.get("attempts", [])
    if [item.get("attempt") for item in attempts if isinstance(item, dict)] != acceptance["required_attempts"]:
        errors.append("attempt sequence drift")
    if [item.get("exit_code") for item in attempts if isinstance(item, dict)] != acceptance["required_exit_codes"]:
        errors.append("initial failure and corrected pass were not preserved")

    artifacts = record.get("artifacts", {})
    if not isinstance(artifacts, dict):
        return errors + ["artifact registry missing"]
    resolved: dict[str, Path] = {}
    for name, relative in artifacts.items():
        path = safe_artifact(packet_root, relative)
        if path is None:
            errors.append(f"artifact path escaped packet: {name}")
        elif not path.is_file():
            errors.append(f"artifact missing: {name}")
        else:
            resolved[name] = path
    required_artifacts = {
        "initial_brief", "corrected_brief", "before_after_diff", "claim_ledger",
        "conflict_record", "unknowns", "stop_receipt", "input_hashes",
        "baseline_hashes", "raw_initial_log", "raw_corrected_log", "cleanup_receipt",
    }
    if not required_artifacts.issubset(artifacts):
        errors.append("required artifact registry incomplete")
    hashes = record.get("artifact_hashes", {})
    if not isinstance(hashes, dict):
        errors.append("artifact hash registry missing")
    else:
        for name, path in resolved.items():
            if hashes.get(name) != digest(path):
                errors.append(f"artifact hash mismatch: {name}")
    input_manifest = resolved.get("input_hashes")
    if input_manifest:
        if load_json(input_manifest) != {
            path.relative_to(FIXTURE).as_posix(): digest(path)
            for path in sorted(FIXTURE.rglob("*"))
            if path.is_file()
        }:
            errors.append("input hash manifest does not match the frozen fixture")
    baseline_manifest = resolved.get("baseline_hashes")
    if baseline_manifest and load_json(baseline_manifest) != {}:
        errors.append("baseline workspace was not empty")
    initial = resolved.get("initial_brief")
    if initial:
        initial_value = load_json(initial)
        if not isinstance(initial_value, dict) or not validate_brief(initial_value, acceptance):
            errors.append("initial brief no longer demonstrates an intentional validation failure")
    corrected = resolved.get("corrected_brief")
    if corrected:
        try:
            brief = load_json(corrected)
            if isinstance(brief, dict):
                errors.extend(validate_brief(brief, acceptance))
            else:
                errors.append("corrected brief must be an object")
        except (OSError, UnicodeError, json.JSONDecodeError) as exc:
            errors.append(f"corrected brief input error: {exc}")
    for name, expected_exit in (("raw_initial_log", 1), ("raw_corrected_log", 0)):
        log = resolved.get(name)
        if log and f"EXIT_CODE: {expected_exit}" not in log.read_text(encoding="utf-8"):
            errors.append(f"raw validation log inconsistent: {name}")
    if corrected:
        projections = {
            "claim_ledger": "claims",
            "conflict_record": "conflicts",
            "unknowns": "unknowns",
            "stop_receipt": "stop_receipt",
        }
        corrected_value = load_json(corrected)
        if isinstance(corrected_value, dict):
            for artifact_name, field in projections.items():
                projection = resolved.get(artifact_name)
                if projection and load_json(projection) != corrected_value.get(field):
                    errors.append(f"standalone artifact drift: {artifact_name}")
    cleanup = resolved.get("cleanup_receipt")
    if cleanup:
        receipt = load_json(cleanup)
        if not isinstance(receipt, dict) or receipt.get("existed_before_cleanup") is not True or receipt.get("exists_after_cleanup") is not False:
            errors.append("cleanup receipt inconsistent")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--brief")
    group.add_argument("--packet")
    parser.add_argument("--attest", action="store_true")
    args = parser.parse_args()
    acceptance = load_json(FIXTURE / "expected/acceptance.json")
    if not isinstance(acceptance, dict):
        print("LAB_008_BRIEF_FAILED\n- acceptance record must be an object")
        return 2
    try:
        if args.brief:
            brief = load_json(Path(args.brief))
            errors = validate_brief(brief, acceptance) if isinstance(brief, dict) else ["brief must be an object"]
        else:
            errors = validate_packet(Path(args.packet).resolve(), acceptance)
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"LAB_008_BRIEF_FAILED\n- input error: {exc}")
        return 2
    if errors:
        print("LAB_008_BRIEF_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("LAB_008_BRIEF_OK conclusion=bounded support=S-CURRENT conflicts=1 unknowns=2")
    if args.packet and args.attest:
        print(f"LAB_008_PACKET_ATTESTATION sha256={packet_attestation(Path(args.packet).resolve())}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
