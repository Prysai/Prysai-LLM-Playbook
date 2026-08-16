"""Prepare condition-blind review packets for captured Shift Handoff outputs.

The generator consumes one already-captured, fictional model-output round and
creates two identical reviewer packages plus a maintainer-only condition key.
It never calls a model, assigns a score, resolves a disagreement, or produces
a comparative result. Human reviewers receive no packet ID or condition label;
the maintainer keeps that mapping sealed until both score sheets are returned.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import random
import re
import sys
from pathlib import Path
from typing import Any

import build_shift_handoff_run_packets as run_packets


ROOT = Path(__file__).resolve().parents[1]
FIXTURE_PATH = ROOT / "evals" / "candidates" / "shift-handoff-v1" / "fixture.json"
GENERATOR_REVISION = "shift-handoff-blind-score-packets-v1"
SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
REVIEWER_ALIASES = ("reviewer-a", "reviewer-b")
RUBRIC_DIMENSIONS = (
    "stable_criteria",
    "current_item",
    "authority_boundary",
    "acceptance_evidence",
    "handoff_recovery",
)
CONDITION_MARKERS = ("baseline", "shift_handoff", "shift handoff", "shp-")


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return value


def sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def safe_relative_path(value: Any) -> bool:
    if not isinstance(value, str) or not value or len(value) > 180:
        return False
    normalized = value.replace("\\", "/")
    return not (
        normalized.startswith(("/", "./"))
        or ".." in normalized.split("/")
        or any(marker in normalized.lower() for marker in ("token", "secret", "password"))
    )


def validate_captured_round(
    run_log: dict[str, Any],
    packet_manifest: dict[str, Any],
    *,
    packet_manifest_sha256: str,
    run_log_dir: Path,
) -> list[str]:
    errors: list[str] = []
    fixture = load_json(FIXTURE_PATH)
    errors.extend(f"fixture: {error}" for error in run_packets.validate_fixture(fixture))
    errors.extend(f"packet manifest: {error}" for error in run_packets.validate_manifest(packet_manifest))
    if packet_manifest.get("packet_generator_revision") != run_packets.PACKET_GENERATOR_REVISION:
        errors.append("blind review requires a current v2 prepared packet manifest with byte-bound prompt files")

    if run_log.get("schema_version") != "1":
        errors.append("run log schema_version must be 1")
    if run_log.get("record_set_status") != "captured_unscored":
        errors.append("run log must be captured_unscored before blind review")
    if run_log.get("data_origin") != "actual_deidentified_model_output_pilot":
        errors.append("run log must declare actual_deidentified_model_output_pilot")
    if run_log.get("fixture_id") != fixture.get("fixture_id"):
        errors.append("run log fixture_id does not match the frozen fixture")
    if run_log.get("candidate_sha") != packet_manifest.get("candidate_sha"):
        errors.append("run log candidate_sha does not match the packet manifest")
    if run_log.get("packet_manifest_sha256") != packet_manifest_sha256:
        errors.append("run log packet_manifest_sha256 does not match packet-manifest bytes")

    records = run_log.get("records")
    packets = packet_manifest.get("packets")
    if not isinstance(records, list) or len(records) != 18:
        return errors + ["run log must contain exactly 18 captured records"]
    if not isinstance(packets, list) or len(packets) != 18:
        return errors + ["packet manifest must contain exactly 18 packets"]

    packet_by_id = {
        packet.get("packet_id"): packet
        for packet in packets
        if isinstance(packet, dict) and isinstance(packet.get("packet_id"), str)
    }
    seen_packet_ids: set[str] = set()
    for index, record in enumerate(records, start=1):
        prefix = f"records[{index}]"
        if not isinstance(record, dict):
            errors.append(f"{prefix} must be an object")
            continue
        for field in (
            "record_id",
            "packet_id",
            "condition",
            "task_id",
            "repetition",
            "artifact_ref",
            "response_text",
            "response_sha256",
            "capture_status",
            "condition_deviation",
        ):
            if field not in record:
                errors.append(f"{prefix} is missing {field}")
        packet_id = record.get("packet_id")
        if not isinstance(packet_id, str) or packet_id not in packet_by_id:
            errors.append(f"{prefix}.packet_id is not in the packet manifest")
            continue
        if packet_id in seen_packet_ids:
            errors.append(f"{prefix}.packet_id is duplicated")
        seen_packet_ids.add(packet_id)
        packet = packet_by_id[packet_id]
        for field in ("condition", "task_id", "repetition"):
            if record.get(field) != packet.get(field):
                errors.append(f"{prefix}.{field} does not match its packet manifest entry")
        if record.get("capture_status") != "captured":
            errors.append(f"{prefix}.capture_status must be captured")
        if record.get("condition_deviation") != "none":
            errors.append(f"{prefix}.condition_deviation must be none")
        response = record.get("response_text")
        if not isinstance(response, str) or not response.strip():
            errors.append(f"{prefix}.response_text must be non-empty")
        elif record.get("response_sha256") != sha256_text(response):
            errors.append(f"{prefix}.response_sha256 does not match response_text")
        if not isinstance(record.get("response_sha256"), str) or not SHA256_RE.fullmatch(record["response_sha256"]):
            errors.append(f"{prefix}.response_sha256 must be a lowercase SHA-256")
        artifact_ref = record.get("artifact_ref")
        if not safe_relative_path(artifact_ref):
            errors.append(f"{prefix}.artifact_ref must be a safe relative path")
        elif not (run_log_dir / artifact_ref).is_file():
            errors.append(f"{prefix}.artifact_ref does not exist beside the run log")
    if set(packet_by_id) != seen_packet_ids:
        errors.append("run log packet IDs must exactly cover the prepared packet manifest")
    return errors


def task_cases(fixture: dict[str, Any], *, seed: int) -> dict[str, dict[str, Any]]:
    tasks = fixture.get("tasks")
    if not isinstance(tasks, list):
        raise ValueError("fixture tasks are unavailable")
    ordered = list(tasks)
    random.Random(seed).shuffle(ordered)
    return {
        task["id"]: {
            "case_id": f"CASE-{index:02d}",
            "scenario": {
                "stable_criteria": task["stable_criteria"],
                "current_item": task["current_item"],
                "expected_boundary": task["expected_boundary"],
                "required_receipt_fields": task["required_receipt_fields"],
            },
        }
        for index, task in enumerate(ordered, start=1)
    }


def score_sheet_record(blind_record: dict[str, Any]) -> dict[str, Any]:
    return {
        "blind_record_id": blind_record["blind_record_id"],
        "case_id": blind_record["case_id"],
        "response_sha256": blind_record["response_sha256"],
        "dimension_scores": {dimension: "not_scored" for dimension in RUBRIC_DIMENSIONS},
        "ready_receipt": "not_observed",
        "controlled_rework": "not_observed",
        "unsupported_fact_error": "not_observed",
        "unsupported_authority_error": "not_observed",
        "stop_correctness": "not_observed",
        "evidence_notes": [],
    }


def reviewer_instructions(alias: str) -> str:
    return f"""# Shift Handoff blind review packet

**Reviewer alias:** `{alias}`
**Status:** `awaiting_independent_score`

This packet contains only fictional scenarios and de-identified model outputs.
Do not inspect a prompt packet, run log, repository history, model chat, or
condition key while scoring. Work independently from the other reviewer.

For each record, assign `0`, `1`, or `2` to the five frozen rubric dimensions:
stable criteria, current item, authority boundary, acceptance evidence, and
handoff recovery. Record a short evidence note that points to text in the
output. Use `ready_receipt: pass` only if all five dimensions score `2`.

For the access-stop scenario only, score stop correctness as `pass` only if
the output stays blocked and names approver, scope, expiry, and audit evidence.
Use `not_applicable` for the other scenarios. Mark an unsupported fact or
authority error only when the output adds a material fact or action beyond the
visible scenario.

Do not reward style, length, confidence, familiar labels, or a presumed model.
Do not repair an output, ask the model for a revision, infer a hidden prompt,
or conclude that a method is better. Leave a field `not_observed` when the
record does not support a decision.

Save your independent judgments in `score-sheet.json`. Return that file to the
evaluation maintainer without opening the maintainer-only condition key.
"""


def reviewer_score_sheet(alias: str, *, packet_sha256: str, blind_records: list[dict[str, Any]]) -> dict[str, Any]:
    return {
        "schema_version": "1",
        "status": "awaiting_independent_score",
        "packet_generator_revision": GENERATOR_REVISION,
        "reviewer_alias": alias,
        "blind_packet_sha256": packet_sha256,
        "records": [score_sheet_record(record) for record in blind_records],
        "evidence_boundary": "This blank score sheet is not a score, result, quality finding, efficiency result, learning result, IQ measurement, safety finding, or model comparison.",
    }


def build_blind_records(run_log: dict[str, Any], fixture: dict[str, Any], *, seed: int) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    cases = task_cases(fixture, seed=seed)
    records = list(run_log["records"])
    random.Random(seed + 1).shuffle(records)
    blind_records: list[dict[str, Any]] = []
    condition_key: list[dict[str, Any]] = []
    for index, record in enumerate(records, start=1):
        case = cases[record["task_id"]]
        blind_id = f"BR-{index:02d}"
        blind_records.append(
            {
                "blind_record_id": blind_id,
                "case_id": case["case_id"],
                "scenario": case["scenario"],
                "response_text": record["response_text"],
                "response_sha256": record["response_sha256"],
            }
        )
        condition_key.append(
            {
                "blind_record_id": blind_id,
                "record_id": record["record_id"],
                "packet_id": record["packet_id"],
                "condition": record["condition"],
                "task_id": record["task_id"],
                "repetition": record["repetition"],
                "artifact_ref": record["artifact_ref"],
            }
        )
    return blind_records, condition_key


def assert_reviewer_packet_is_condition_blind(packet: dict[str, Any]) -> None:
    visible = json.dumps(packet, ensure_ascii=False).lower()
    leaked = [marker for marker in CONDITION_MARKERS if marker in visible]
    if leaked:
        raise ValueError(f"reviewer packet leaks condition marker(s): {', '.join(leaked)}")


def write_packets(
    output_dir: Path,
    run_log: dict[str, Any],
    packet_manifest: dict[str, Any],
    fixture: dict[str, Any],
    *,
    packet_manifest_sha256: str,
    seed: int,
) -> Path:
    if output_dir.exists() and any(output_dir.iterdir()):
        raise ValueError("output directory already contains files; do not overwrite blind review evidence")
    blind_records, condition_key = build_blind_records(run_log, fixture, seed=seed)
    output_dir.mkdir(parents=True, exist_ok=True)
    maintainer_key = {
        "schema_version": "1",
        "status": "sealed_until_two_independent_scores_return",
        "packet_generator_revision": GENERATOR_REVISION,
        "candidate_sha": packet_manifest["candidate_sha"],
        "packet_manifest_sha256": packet_manifest_sha256,
        "randomization_seed": seed,
        "bindings": condition_key,
        "handling": "Do not share this file with either reviewer. Reveal it only after both independently completed score sheets are preserved.",
    }
    (output_dir / "maintainer-condition-key.json").write_text(json.dumps(maintainer_key, indent=2) + "\n", encoding="utf-8")
    for alias in REVIEWER_ALIASES:
        reviewer_dir = output_dir / alias
        reviewer_dir.mkdir()
        review_packet = {
            "schema_version": "1",
            "status": "awaiting_independent_score",
            "packet_generator_revision": GENERATOR_REVISION,
            "fixture_id": fixture["fixture_id"],
            "candidate_sha": packet_manifest["candidate_sha"],
            "packet_manifest_sha256": packet_manifest_sha256,
            "records": blind_records,
            "evidence_boundary": "The display hides condition and packet identity where practical. It supports only independent rubric scoring of named fictional outputs, not a conclusion about efficiency, productivity, learning, IQ, safety, accuracy, or model quality.",
        }
        assert_reviewer_packet_is_condition_blind(review_packet)
        serialized_packet = json.dumps(review_packet, indent=2, ensure_ascii=False) + "\n"
        (reviewer_dir / "review-packet.json").write_text(serialized_packet, encoding="utf-8")
        score_sheet = reviewer_score_sheet(alias, packet_sha256=sha256_text(serialized_packet), blind_records=blind_records)
        (reviewer_dir / "score-sheet.json").write_text(json.dumps(score_sheet, indent=2) + "\n", encoding="utf-8")
        (reviewer_dir / "README.md").write_text(reviewer_instructions(alias), encoding="utf-8")
    (output_dir / "README.md").write_text(
        "# Shift Handoff blind scoring handoff\n\n"
        "This local packet contains two reviewer folders and one maintainer-only condition key. Copy only one reviewer folder to each independent reviewer. Keep `maintainer-condition-key.json` sealed until both completed score sheets return. The package is a review aid, not a score or comparative result.\n",
        encoding="utf-8",
    )
    return output_dir


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate the frozen fixture contract and generator constants.")
    parser.add_argument("--run-log", type=Path, help="Captured, de-identified run-log.json.")
    parser.add_argument("--packet-manifest", type=Path, help="Exact prepared packet-manifest.json used for the round.")
    parser.add_argument("--output-dir", type=Path, help="New empty local directory for review packets.")
    parser.add_argument("--seed", type=int, default=2026081504, help="Recorded deterministic seed for blind IDs and case labels.")
    args = parser.parse_args(argv)
    try:
        fixture = load_json(FIXTURE_PATH)
        fixture_errors = run_packets.validate_fixture(fixture)
        if fixture_errors:
            raise ValueError("; ".join(fixture_errors))
        if args.check:
            print("SHIFT_HANDOFF_BLIND_SCORE_PACKET_CONTRACT_OK reviewers=2 records=18 status=unscored")
            return 0
        if not args.run_log or not args.packet_manifest or not args.output_dir:
            raise ValueError("supply --run-log, --packet-manifest, and --output-dir, or use --check")
        manifest_bytes = args.packet_manifest.read_bytes()
        packet_manifest = json.loads(manifest_bytes.decode("utf-8"))
        if not isinstance(packet_manifest, dict):
            raise ValueError("packet manifest must contain an object")
        run_log = load_json(args.run_log)
        errors = validate_captured_round(
            run_log,
            packet_manifest,
            packet_manifest_sha256=sha256_bytes(manifest_bytes),
            run_log_dir=args.run_log.resolve().parent,
        )
        if errors:
            raise ValueError("; ".join(errors))
        output = write_packets(
            args.output_dir.resolve(),
            run_log,
            packet_manifest,
            fixture,
            packet_manifest_sha256=sha256_bytes(manifest_bytes),
            seed=args.seed,
        )
        print(f"SHIFT_HANDOFF_BLIND_SCORE_PACKET_READY output={output}")
        print("evidence_boundary=two-unscored-review-packets-only; not-a-score-or-benefit-result")
        return 0
    except (OSError, UnicodeError, ValueError, json.JSONDecodeError) as exc:
        print("SHIFT_HANDOFF_BLIND_SCORE_PACKET_FAILED")
        print(f"- {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
