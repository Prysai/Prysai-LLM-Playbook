"""Aggregate de-identified Shift Handoff pilot records without inventing an outcome.

The checked-in template intentionally has no records. This program writes a
``not_run`` aggregate for that template and refuses incomplete, synthetic,
condition-deviating, or privacy-unsafe observations. It reports descriptive
fixture-level observations only; it never upgrades the project or infers an IQ,
learning, safety, productivity, or cross-model effect.

The ``data_origin`` field is a reporter attestation, not cryptographic proof
that a record came from an authorized study. Independent review of the raw
de-identified artifacts remains required before publication.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import statistics
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

import build_shift_handoff_run_packets as packet_builder


ROOT = Path(__file__).resolve().parents[1]
FIXTURE_PATH = ROOT / "evals" / "candidates" / "shift-handoff-v1" / "fixture.json"
TEMPLATE_PATH = ROOT / "evals" / "candidates" / "shift-handoff-v1" / "run-record-template.json"

SHA_RE = re.compile(r"^[0-9a-f]{40}$")
SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
ID_RE = re.compile(r"^[A-Z0-9][A-Z0-9_-]{2,63}$")
SESSION_RE = re.compile(r"^SH-[A-Z0-9]{4,24}$")
LABEL_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9 ._/-]{0,120}$")

RECEIPT_VALUES = {"pass", "fail", "blocked", "not_observed"}
REWORK_VALUES = {"yes", "no", "not_observed"}
STOP_VALUES = {"pass", "fail", "not_applicable", "not_observed"}
REQUIRED_RECORD_FIELDS = (
    "record_id",
    "session_code",
    "packet_id",
    "condition",
    "task_id",
    "repetition",
    "timestamp_start",
    "timestamp_end",
    "clarification_turns",
    "ready_receipt",
    "controlled_rework",
    "unsupported_fact_error",
    "unsupported_authority_error",
    "stop_correctness",
    "artifact_ref",
    "scorer_a",
    "scorer_b",
    "condition_deviation",
)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def label_is_safe(value: Any) -> bool:
    return isinstance(value, str) and bool(LABEL_RE.fullmatch(value))


def parse_timestamp(value: Any) -> datetime:
    if not isinstance(value, str):
        raise ValueError("timestamp must be an ISO-8601 string with an explicit timezone")
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("timestamp must include an explicit timezone")
    return parsed


def valid_artifact_ref(value: Any) -> bool:
    if not isinstance(value, str) or not value or len(value) > 180:
        return False
    normalized = value.replace("\\", "/")
    if normalized.startswith(("/", "./", "http:", "https:")) or ".." in normalized.split("/"):
        return False
    return not any(marker in normalized for marker in ("?", "#", "@", ":", "token", "secret", "password"))


def fixture_task_ids(fixture: dict[str, Any]) -> set[str]:
    tasks = fixture.get("tasks")
    if not isinstance(tasks, list) or not tasks:
        return set()
    return {
        task.get("id")
        for task in tasks
        if isinstance(task, dict) and isinstance(task.get("id"), str) and task["id"]
    }


def validate_fixture(fixture: Any) -> list[str]:
    errors: list[str] = []
    if not isinstance(fixture, dict):
        return ["fixture must be an object"]
    if fixture.get("fixture_id") != "shift-handoff-v1":
        errors.append("fixture_id must be shift-handoff-v1")
    if fixture.get("status") != "candidate" or fixture.get("run_evidence_status") != "not_run":
        errors.append("fixture must retain candidate/not_run status")
    if set(fixture.get("allowed_conditions", [])) != {"baseline", "shift_handoff"}:
        errors.append("fixture must define baseline and shift_handoff conditions")
    task_ids = fixture_task_ids(fixture)
    if len(task_ids) != 3:
        errors.append("fixture must define three unique task IDs")
    for task in fixture.get("tasks", []):
        if not isinstance(task, dict):
            errors.append("fixture tasks must be objects")
            continue
        for field in ("stable_criteria", "current_item", "expected_boundary", "required_receipt_fields"):
            if not task.get(field):
                errors.append(f"fixture task {task.get('id', '<unknown>')} is missing {field}")
    return errors


def validate_record(
    record: Any,
    task_ids: set[str],
    index: int,
    packet_by_id: dict[str, dict[str, Any]] | None = None,
) -> list[str]:
    prefix = f"records[{index}]"
    if not isinstance(record, dict):
        return [f"{prefix} must be an object"]
    errors = [f"{prefix} is missing {field}" for field in REQUIRED_RECORD_FIELDS if field not in record]
    if errors:
        return errors
    if not isinstance(record["record_id"], str) or not ID_RE.fullmatch(record["record_id"]):
        errors.append(f"{prefix}.record_id must be an uppercase de-identified ID")
    if not isinstance(record["session_code"], str) or not SESSION_RE.fullmatch(record["session_code"]):
        errors.append(f"{prefix}.session_code must use the SH- de-identified format")
    if record["condition"] not in {"baseline", "shift_handoff"}:
        errors.append(f"{prefix}.condition must be baseline or shift_handoff")
    if record["task_id"] not in task_ids:
        errors.append(f"{prefix}.task_id is not in the frozen fixture")
    if not isinstance(record["packet_id"], str) or not packet_builder.PACKET_ID_RE.fullmatch(record["packet_id"]):
        errors.append(f"{prefix}.packet_id must use the frozen SHP-B/H-XX-RX form")
    if record["repetition"] not in {1, 2, 3}:
        errors.append(f"{prefix}.repetition must be 1, 2, or 3")
    if packet_by_id is not None and isinstance(record["packet_id"], str):
        packet = packet_by_id.get(record["packet_id"])
        if packet is None:
            errors.append(f"{prefix}.packet_id is not present in the prepared packet manifest")
        else:
            for field in ("condition", "task_id", "repetition"):
                if record[field] != packet[field]:
                    errors.append(f"{prefix}.{field} does not match prepared packet {record['packet_id']}")
    try:
        start = parse_timestamp(record["timestamp_start"])
        end = parse_timestamp(record["timestamp_end"])
        if end <= start:
            errors.append(f"{prefix} timestamps must have a positive duration")
        elif (end - start).total_seconds() > 3600:
            errors.append(f"{prefix} duration exceeds one hour; split or investigate the run")
    except ValueError as exc:
        errors.append(f"{prefix}: {exc}")
    if not isinstance(record["clarification_turns"], int) or isinstance(record["clarification_turns"], bool) or record["clarification_turns"] < 0:
        errors.append(f"{prefix}.clarification_turns must be a non-negative integer")
    if record["ready_receipt"] not in RECEIPT_VALUES:
        errors.append(f"{prefix}.ready_receipt is invalid")
    if record["controlled_rework"] not in REWORK_VALUES:
        errors.append(f"{prefix}.controlled_rework is invalid")
    if record["stop_correctness"] not in STOP_VALUES:
        errors.append(f"{prefix}.stop_correctness is invalid")
    for field in ("unsupported_fact_error", "unsupported_authority_error"):
        if not isinstance(record[field], bool):
            errors.append(f"{prefix}.{field} must be boolean")
    if not valid_artifact_ref(record["artifact_ref"]):
        errors.append(f"{prefix}.artifact_ref must be a safe relative de-identified reference")
    for field in ("scorer_a", "scorer_b"):
        if not label_is_safe(record[field]):
            errors.append(f"{prefix}.{field} must be a safe role alias")
    if record["scorer_a"] == record["scorer_b"]:
        errors.append(f"{prefix} requires two distinct scorer aliases")
    if record["condition_deviation"] != "none":
        errors.append(f"{prefix}.condition_deviation must be none for comparative aggregation")
    return errors


def validate_record_set(
    document: Any,
    fixture: dict[str, Any],
    packet_manifest: dict[str, Any] | None = None,
    packet_manifest_sha256: str | None = None,
) -> list[str]:
    if not isinstance(document, dict):
        return ["record set must be a JSON object"]
    errors: list[str] = []
    if document.get("schema_version") != "1":
        errors.append("record set schema_version must be 1")
    if document.get("fixture_id") != fixture.get("fixture_id"):
        errors.append("record set fixture_id does not match the frozen fixture")
    status = document.get("record_set_status")
    if status not in {"not_run", "observed"}:
        errors.append("record_set_status must be not_run or observed")
    records = document.get("records")
    if not isinstance(records, list):
        errors.append("record set records must be a list")
        return errors
    if status == "not_run":
        if records:
            errors.append("not_run record set must not contain observations")
        if document.get("candidate_sha") not in {None, ""}:
            errors.append("not_run record set must not carry a candidate SHA")
        if document.get("packet_manifest_sha256") not in {None, ""}:
            errors.append("not_run record set must not carry a prepared packet manifest hash")
        return errors

    if document.get("data_origin") != "actual_deidentified_pilot":
        errors.append("observed record set must declare actual_deidentified_pilot; synthetic data is not study evidence")
    candidate_sha = document.get("candidate_sha")
    if not isinstance(candidate_sha, str) or not SHA_RE.fullmatch(candidate_sha):
        errors.append("observed record set must bind one lowercase 40-character candidate SHA")
    declared_manifest_sha = document.get("packet_manifest_sha256")
    if not isinstance(declared_manifest_sha, str) or not SHA256_RE.fullmatch(declared_manifest_sha):
        errors.append("observed record set must bind one lowercase 64-character prepared packet manifest SHA-256")
    if packet_manifest is None or packet_manifest_sha256 is None:
        errors.append("observed record set requires the prepared packet manifest and its SHA-256")
        packet_by_id: dict[str, dict[str, Any]] | None = None
    else:
        manifest_errors = packet_builder.validate_manifest(packet_manifest)
        errors.extend(f"packet manifest: {error}" for error in manifest_errors)
        if candidate_sha != packet_manifest.get("candidate_sha"):
            errors.append("observed record set candidate SHA does not match the prepared packet manifest")
        if declared_manifest_sha != packet_manifest_sha256:
            errors.append("observed record set packet manifest SHA-256 does not match the supplied manifest")
        packets = packet_manifest.get("packets", [])
        packet_by_id = {
            packet["packet_id"]: packet
            for packet in packets
            if isinstance(packet, dict) and isinstance(packet.get("packet_id"), str)
        }
    conditions = document.get("run_set_conditions")
    if not isinstance(conditions, dict):
        errors.append("observed record set must include run_set_conditions")
    else:
        for field in ("model_surface", "model_identifier", "visible_settings", "tool_state", "locale", "scorer_a", "scorer_b"):
            if not label_is_safe(conditions.get(field)):
                errors.append(f"run_set_conditions.{field} must be a safe non-empty label")
        if conditions.get("tool_state") != "no_tools":
            errors.append("run_set_conditions.tool_state must be no_tools for this offline fixture")
        if conditions.get("scorer_a") == conditions.get("scorer_b"):
            errors.append("run_set_conditions requires two distinct scorer aliases")
    if not records:
        errors.append("observed record set must contain at least one record")
        return errors
    task_ids = fixture_task_ids(fixture)
    record_ids: set[str] = set()
    artifact_refs: set[str] = set()
    packet_ids: set[str] = set()
    for index, record in enumerate(records):
        errors.extend(validate_record(record, task_ids, index, packet_by_id))
        if isinstance(record, dict):
            record_id = record.get("record_id")
            if isinstance(record_id, str):
                if record_id in record_ids:
                    errors.append(f"records has duplicate record_id: {record_id}")
                record_ids.add(record_id)
            artifact_ref = record.get("artifact_ref")
            if isinstance(artifact_ref, str):
                if artifact_ref in artifact_refs:
                    errors.append(f"records has duplicate artifact_ref: {artifact_ref}")
                artifact_refs.add(artifact_ref)
            packet_id = record.get("packet_id")
            if isinstance(packet_id, str):
                if packet_id in packet_ids:
                    errors.append(f"records has duplicate packet_id: {packet_id}")
                packet_ids.add(packet_id)
    return errors


def duration_seconds(record: dict[str, Any]) -> float:
    return (parse_timestamp(record["timestamp_end"]) - parse_timestamp(record["timestamp_start"])).total_seconds()


def observed_rate(records: list[dict[str, Any]], field: str, positive: Any, unavailable: set[Any]) -> dict[str, int | float | None]:
    observed = [record for record in records if record[field] not in unavailable]
    positives = sum(record[field] == positive for record in observed)
    return {
        "observed": len(observed),
        "positive": positives,
        "rate_percent": round(100 * positives / len(observed), 1) if observed else None,
    }


def condition_summary(records: list[dict[str, Any]]) -> dict[str, Any]:
    durations = [duration_seconds(record) for record in records]
    clarification_turns = [record["clarification_turns"] for record in records]
    return {
        "records": len(records),
        "ready_receipt": observed_rate(records, "ready_receipt", "pass", {"not_observed"}),
        "median_elapsed_seconds": round(statistics.median(durations), 2) if durations else None,
        "median_clarification_turns": statistics.median(clarification_turns) if clarification_turns else None,
        "controlled_rework": observed_rate(records, "controlled_rework", "yes", {"not_observed"}),
        "unsupported_fact_error": observed_rate(records, "unsupported_fact_error", True, set()),
        "unsupported_authority_error": observed_rate(records, "unsupported_authority_error", True, set()),
        "stop_correctness": observed_rate(records, "stop_correctness", "pass", {"not_applicable", "not_observed"}),
    }


def build_aggregate(document: dict[str, Any]) -> dict[str, Any]:
    if document["record_set_status"] == "not_run":
        return {
            "schema_version": "1",
            "fixture_id": document["fixture_id"],
            "study_status": "not_run",
            "record_count": 0,
            "results": None,
            "claim_boundary": "No pilot records exist. No percentage, benefit, efficiency, learning, IQ, security, or model-quality claim is available.",
        }
    records = document["records"]
    baseline = [record for record in records if record["condition"] == "baseline"]
    shift_handoff = [record for record in records if record["condition"] == "shift_handoff"]
    return {
        "schema_version": "1",
        "fixture_id": document["fixture_id"],
        "study_status": "candidate_observation",
        "candidate_sha": document["candidate_sha"],
        "packet_manifest_sha256": document["packet_manifest_sha256"],
        "protocol_revision": document.get("protocol_revision"),
        "run_set_conditions": document["run_set_conditions"],
        "record_count": len(records),
        "results": {
            "baseline": condition_summary(baseline),
            "shift_handoff": condition_summary(shift_handoff),
        },
        "claim_boundary": "Descriptive observations from fixed fictional tasks only. They do not establish a causal efficiency, productivity, learning, IQ, safety, accuracy, or cross-model effect.",
    }


def summary_cell(rate: dict[str, Any]) -> str:
    if not rate["observed"]:
        return "not observed"
    return f"{rate['positive']}/{rate['observed']} ({rate['rate_percent']:.1f}%)"


def scalar_cell(value: int | float | None, decimals: int = 0) -> str:
    if value is None:
        return "not observed"
    if decimals:
        return f"{value:.{decimals}f}"
    return str(value)


def aggregate_markdown(aggregate: dict[str, Any]) -> str:
    if aggregate["study_status"] == "not_run":
        return """# Shift Handoff pilot aggregate\n\n**Status:** `not_run`\n\nNo actual de-identified pilot records were supplied. No rates, timing claims,\nbenefit percentage, efficiency result, learner outcome, security result, model\nquality result, or IQ claim is available.\n\nThis file was generated by `scripts/analyze_shift_handoff_pilot.py`; it is a\nnegative evidence record, not an empty success report.\n"""
    results = aggregate["results"]
    assert isinstance(results, dict)
    rows: list[str] = []
    for label in ("baseline", "shift_handoff"):
        values = results[label]
        rows.append(
            "| {label} | {records} | {receipt} | {elapsed} | {turns} | {rework} | {fact} | {authority} | {stop} |".format(
                label=label.replace("_", " "),
                records=values["records"],
                receipt=summary_cell(values["ready_receipt"]),
                elapsed=scalar_cell(values["median_elapsed_seconds"], 2),
                turns=scalar_cell(values["median_clarification_turns"]),
                rework=summary_cell(values["controlled_rework"]),
                fact=summary_cell(values["unsupported_fact_error"]),
                authority=summary_cell(values["unsupported_authority_error"]),
                stop=summary_cell(values["stop_correctness"]),
            )
        )
    return f"""# Shift Handoff pilot aggregate\n\n**Status:** `candidate_observation`  \n**Fixture:** `{aggregate['fixture_id']}`  \n**Candidate SHA:** `{aggregate['candidate_sha']}`  \n**Prepared packet manifest SHA-256:** `{aggregate['packet_manifest_sha256']}`  \n**Protocol:** `{aggregate['protocol_revision']}`\n\n![Observed ready-receipt rate by condition](aggregate.svg)\n\n| Condition | Records | Ready receipt | Median elapsed seconds | Median clarification turns | Controlled rework | Unsupported fact error | Unsupported authority error | Stop correctness |\n| --- | ---: | --- | ---: | ---: | --- | --- | --- | --- |\n{chr(10).join(rows)}\n\n## Interpretation boundary\n\n{aggregate['claim_boundary']} The summary excludes `not_observed` and\n`not_applicable` values from the relevant denominators; missing data is not\nconverted to a failure or a success. Preserve every included and excluded raw\nrecord, scorer disagreement, artifact reference, condition deviation, prepared\npacket manifest, and the fixed run-set conditions alongside this aggregate.\n"""


def aggregate_svg(aggregate: dict[str, Any]) -> str:
    if aggregate["study_status"] == "not_run":
        return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" role="img" aria-labelledby="title desc">
  <title id="title">Shift Handoff pilot has no observed records</title>
  <desc id="desc">A plain evidence-status panel states that no de-identified pilot records are available and no performance, efficiency, learning, IQ, security, or model-quality conclusion may be drawn.</desc>
  <rect width="1200" height="600" fill="#f6f6f2"/>
  <rect x="56" y="48" width="1088" height="10" fill="#161616"/>
  <text x="56" y="114" fill="#d71920" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="3">SHIFT HANDOFF / PILOT EVIDENCE</text>
  <text x="56" y="210" fill="#161616" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="900" letter-spacing="-3">NO PILOT RECORDS YET.</text>
  <text x="58" y="266" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="20">status: not_run / there is no benefit percentage to chart</text>
  <rect x="56" y="366" width="1088" height="118" fill="#161616"/>
  <text x="84" y="412" fill="#d71920" font-family="Consolas, 'Courier New', monospace" font-size="17" font-weight="700">CLAIM LIMIT</text>
  <text x="84" y="452" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700">NO EFFICIENCY, LEARNING, IQ, SECURITY, OR MODEL-QUALITY CLAIM IS AVAILABLE.</text>
  <text x="56" y="542" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="14">GENERATED FROM A ZERO-RECORD TEMPLATE / ADD ONLY AUTHORIZED, DE-IDENTIFIED OBSERVATIONS</text>
</svg>\n"""
    results = aggregate["results"]
    assert isinstance(results, dict)
    baseline = results["baseline"]["ready_receipt"]
    shift = results["shift_handoff"]["ready_receipt"]

    def bar(rate: dict[str, Any], y: int, label: str, color: str) -> str:
        percentage = rate["rate_percent"]
        width = 0 if percentage is None else round(760 * percentage / 100)
        value = "not observed" if percentage is None else f"{rate['positive']}/{rate['observed']} ({percentage:.1f}%)"
        return f'''  <text x="64" y="{y - 14}" fill="#161616" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700">{html.escape(label)}</text>
  <rect x="340" y="{y - 36}" width="760" height="32" fill="#e4e4de"/>
  <rect x="340" y="{y - 36}" width="{width}" height="32" fill="{color}"/>
  <text x="1120" y="{y - 12}" fill="#161616" font-family="Consolas, 'Courier New', monospace" font-size="19" text-anchor="end">{html.escape(value)}</text>'''

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" role="img" aria-labelledby="title desc">
  <title id="title">Observed ready-receipt rate in the Shift Handoff candidate pilot</title>
  <desc id="desc">A two-bar chart compares descriptive ready-receipt pass rates for baseline and Shift Handoff conditions in the named fixed fictional pilot. It warns that these are not general efficiency, productivity, learning, IQ, safety, accuracy, or cross-model conclusions.</desc>
  <rect width="1200" height="600" fill="#f6f6f2"/>
  <rect x="56" y="48" width="1088" height="10" fill="#161616"/>
  <text x="56" y="114" fill="#d71920" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="3">SHIFT HANDOFF / FIXED FICTIONAL PILOT</text>
  <text x="56" y="176" fill="#161616" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="900" letter-spacing="-2">OBSERVED READY-RECEIPT RATE</text>
  <text x="58" y="216" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="17">descriptive count only / zero to 100 percent / condition, model, and rubric are recorded beside the raw artifacts</text>
  <text x="340" y="270" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="15">0%</text>
  <text x="720" y="270" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="15" text-anchor="middle">50%</text>
  <text x="1100" y="270" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="15" text-anchor="end">100%</text>
{bar(baseline, 340, 'Baseline', '#161616')}
{bar(shift, 414, 'Shift Handoff', '#d71920')}
  <rect x="56" y="476" width="1088" height="64" fill="#161616"/>
  <text x="84" y="515" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">DESCRIPTIVE FIXTURE OBSERVATION — NOT A GENERAL EFFICIENCY, LEARNING, IQ, SECURITY, OR MODEL-QUALITY CLAIM.</text>
  <text x="56" y="574" fill="#565650" font-family="Consolas, 'Courier New', monospace" font-size="13">GENERATED BY scripts/analyze_shift_handoff_pilot.py / READ THE AGGREGATE AND RAW-RECORD BOUNDARY BEFORE INTERPRETING</text>
</svg>\n'''


def write_outputs(output_dir: Path, aggregate: dict[str, Any]) -> None:
    if output_dir.exists() and any(output_dir.iterdir()):
        raise ValueError("output directory already contains files; do not overwrite prior pilot evidence")
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "aggregate.json").write_text(json.dumps(aggregate, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "aggregate.md").write_text(aggregate_markdown(aggregate), encoding="utf-8")
    (output_dir / "aggregate.svg").write_text(aggregate_svg(aggregate), encoding="utf-8")


def load_packet_manifest(path: Path) -> tuple[dict[str, Any], str]:
    raw = path.read_text(encoding="utf-8")
    manifest = json.loads(raw)
    if not isinstance(manifest, dict):
        raise ValueError("packet manifest must be a JSON object")
    return manifest, hashlib.sha256(raw.encode("utf-8")).hexdigest()


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate the checked-in fixture and zero-record template.")
    parser.add_argument("--records", type=Path, help="Authorized de-identified record-set JSON.")
    parser.add_argument("--packet-manifest", type=Path, help="Frozen manifest.json produced before the observed runs.")
    parser.add_argument("--output-dir", type=Path, help="New empty directory for aggregate JSON, Markdown, and SVG.")
    args = parser.parse_args(argv)
    try:
        fixture = load_json(FIXTURE_PATH)
        fixture_errors = validate_fixture(fixture)
        if fixture_errors:
            raise ValueError("; ".join(fixture_errors))
        if args.check:
            template = load_json(TEMPLATE_PATH)
            template_errors = validate_record_set(template, fixture)
            if template_errors:
                raise ValueError("; ".join(template_errors))
            print("SHIFT_HANDOFF_PILOT_CONTRACT_OK tasks=3 status=candidate-not_run")
            return 0
        if not args.records or not args.output_dir:
            raise ValueError("supply both --records and --output-dir, or use --check")
        document = load_json(args.records)
        packet_manifest = None
        packet_manifest_sha256 = None
        if args.packet_manifest:
            packet_manifest, packet_manifest_sha256 = load_packet_manifest(args.packet_manifest)
        errors = validate_record_set(document, fixture, packet_manifest, packet_manifest_sha256)
        if errors:
            raise ValueError("; ".join(errors))
        aggregate = build_aggregate(document)
        write_outputs(args.output_dir.resolve(), aggregate)
        if aggregate["study_status"] == "not_run":
            print("SHIFT_HANDOFF_PILOT_ANALYSIS_NOT_RUN records=0")
        else:
            print(f"SHIFT_HANDOFF_PILOT_ANALYSIS_CANDIDATE records={aggregate['record_count']}")
        print("evidence_boundary=fixture-level-descriptive-observation; not-efficiency-learning-IQ-security-or-model-quality-proof")
        return 0
    except (OSError, UnicodeError, ValueError, json.JSONDecodeError) as exc:
        print("SHIFT_HANDOFF_PILOT_ANALYSIS_FAILED")
        print(f"- {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
