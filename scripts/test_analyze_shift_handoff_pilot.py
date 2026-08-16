"""Regression tests for the Shift Handoff pilot analyzer's evidence boundary.

The rows below are in-memory test values, not pilot records. They exercise the
schema and aggregate math inside a temporary directory and must never be cited
as a study result, even though one test deliberately uses the required
``actual_deidentified_pilot`` label to verify that schema branch.
"""

from __future__ import annotations

import copy
import hashlib
import json
import tempfile
from pathlib import Path

import analyze_shift_handoff_pilot as pilot
import build_shift_handoff_run_packets as packet_builder


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def prepared_manifest() -> tuple[dict, str]:
    fixture = packet_builder.load_json(packet_builder.FIXTURE_PATH)
    manifest = {
        "schema_version": "1",
        "status": "not_run",
        "fixture_id": "shift-handoff-v1",
        "packet_generator_revision": packet_builder.PACKET_GENERATOR_REVISION,
        "prompt_hash_scope": packet_builder.PROMPT_HASH_SCOPE,
        "candidate_sha": "a" * 40,
        "fixture_sha256": "b" * 64,
        "randomization_seed": 17,
        "repetitions_per_task_condition": 3,
        "packets": packet_builder.build_run_order(fixture, seed=17, repetitions=3),
        "evidence_boundary": "Synthetic prompt preparation only.",
    }
    raw = json.dumps(manifest, indent=2) + "\n"
    return manifest, hashlib.sha256(raw.encode("utf-8")).hexdigest()


def observed_document(manifest: dict, manifest_sha256: str) -> dict:
    baseline_packet = next(packet for packet in manifest["packets"] if packet["condition"] == "baseline" and packet["task_id"] == "weekly-release-brief")
    handoff_packet = next(packet for packet in manifest["packets"] if packet["condition"] == "shift_handoff" and packet["task_id"] == "weekly-release-brief")
    return {
        "schema_version": "1",
        "fixture_id": "shift-handoff-v1",
        "record_set_status": "observed",
        "data_origin": "actual_deidentified_pilot",
        "protocol_revision": "shift-handoff-pilot-v1",
        "candidate_sha": "a" * 40,
        "packet_manifest_sha256": manifest_sha256,
        "run_set_conditions": {
            "model_surface": "test-surface",
            "model_identifier": "test-model",
            "visible_settings": "fixed-defaults",
            "tool_state": "no_tools",
            "locale": "en",
            "scorer_a": "scorer-alpha",
            "scorer_b": "scorer-beta"
        },
        "records": [
            {
                "record_id": "BASE-001",
                "session_code": "SH-A001",
                "packet_id": baseline_packet["packet_id"],
                "condition": "baseline",
                "task_id": "weekly-release-brief",
                "repetition": baseline_packet["repetition"],
                "timestamp_start": "2026-08-15T10:00:00+00:00",
                "timestamp_end": "2026-08-15T10:01:00+00:00",
                "clarification_turns": 2,
                "ready_receipt": "fail",
                "controlled_rework": "yes",
                "unsupported_fact_error": True,
                "unsupported_authority_error": False,
                "stop_correctness": "not_applicable",
                "artifact_ref": "artifacts/BASE-001.json",
                "scorer_a": "scorer-alpha",
                "scorer_b": "scorer-beta",
                "condition_deviation": "none"
            },
            {
                "record_id": "SHIFT-001",
                "session_code": "SH-A002",
                "packet_id": handoff_packet["packet_id"],
                "condition": "shift_handoff",
                "task_id": "weekly-release-brief",
                "repetition": handoff_packet["repetition"],
                "timestamp_start": "2026-08-15T10:02:00+00:00",
                "timestamp_end": "2026-08-15T10:02:42+00:00",
                "clarification_turns": 0,
                "ready_receipt": "pass",
                "controlled_rework": "no",
                "unsupported_fact_error": False,
                "unsupported_authority_error": False,
                "stop_correctness": "not_applicable",
                "artifact_ref": "artifacts/SHIFT-001.json",
                "scorer_a": "scorer-alpha",
                "scorer_b": "scorer-beta",
                "condition_deviation": "none"
            }
        ]
    }


def main() -> int:
    fixture = pilot.load_json(pilot.FIXTURE_PATH)
    require(not pilot.validate_fixture(fixture), "checked-in Shift Handoff fixture is invalid")

    template = pilot.load_json(pilot.TEMPLATE_PATH)
    require(not pilot.validate_record_set(template, fixture), "zero-record template is invalid")
    not_run = pilot.build_aggregate(template)
    require(not_run["study_status"] == "not_run", "zero records were promoted")
    require("No actual de-identified pilot records" in pilot.aggregate_markdown(not_run), "not_run aggregate implies a result")
    require("NO PILOT RECORDS" in pilot.aggregate_svg(not_run), "not_run chart shows invented data")

    manifest, manifest_sha256 = prepared_manifest()
    require(not packet_builder.validate_manifest(manifest), "prepared manifest is invalid")
    observed = observed_document(manifest, manifest_sha256)

    polluted_not_run = copy.deepcopy(template)
    polluted_not_run["records"] = [observed["records"][0]]
    require(any("must not contain observations" in error for error in pilot.validate_record_set(polluted_not_run, fixture)), "not_run set accepted a record")

    require(any("requires the prepared packet manifest" in error for error in pilot.validate_record_set(observed, fixture)), "unbound observation was accepted")
    require(not pilot.validate_record_set(observed, fixture, manifest, manifest_sha256), "valid de-identified observation was rejected")
    aggregate = pilot.build_aggregate(observed)
    require(aggregate["study_status"] == "candidate_observation", "observed records received an unsupported status")
    require(aggregate["results"]["shift_handoff"]["ready_receipt"]["rate_percent"] == 100.0, "ready-receipt rate was not calculated")
    markdown = pilot.aggregate_markdown(aggregate)
    require("not establish a causal" in markdown, "candidate observation lost its claim boundary")

    partial = copy.deepcopy(observed)
    partial["records"] = [partial["records"][0]]
    require(not pilot.validate_record_set(partial, fixture, manifest, manifest_sha256), "valid partial pilot record was rejected")
    require("not observed" in pilot.aggregate_markdown(pilot.build_aggregate(partial)), "partial pilot report invented a missing condition result")

    synthetic = copy.deepcopy(observed)
    synthetic["data_origin"] = "synthetic_test_only"
    require(any("actual_deidentified_pilot" in error for error in pilot.validate_record_set(synthetic, fixture, manifest, manifest_sha256)), "synthetic data was accepted as pilot evidence")

    deviating = copy.deepcopy(observed)
    deviating["records"][0]["condition_deviation"] = "model-setting-changed"
    require(any("condition_deviation" in error for error in pilot.validate_record_set(deviating, fixture, manifest, manifest_sha256)), "condition-deviating record was accepted")

    unsafe_artifact = copy.deepcopy(observed)
    unsafe_artifact["records"][0]["artifact_ref"] = "https://example.test/?token=private"
    require(any("artifact_ref" in error for error in pilot.validate_record_set(unsafe_artifact, fixture, manifest, manifest_sha256)), "unsafe artifact reference was accepted")

    bad_time = copy.deepcopy(observed)
    bad_time["records"][0]["timestamp_end"] = "2026-08-15T09:59:59+00:00"
    require(any("positive duration" in error for error in pilot.validate_record_set(bad_time, fixture, manifest, manifest_sha256)), "negative duration was accepted")

    with tempfile.TemporaryDirectory(prefix="prysai-shift-handoff-analysis-") as temporary:
        output = Path(temporary) / "aggregate"
        pilot.write_outputs(output, aggregate)
        require((output / "aggregate.json").is_file(), "aggregate JSON was not written")
        require((output / "aggregate.md").is_file(), "aggregate Markdown was not written")
        require((output / "aggregate.svg").is_file(), "aggregate SVG was not written")
        generated = json.loads((output / "aggregate.json").read_text(encoding="utf-8"))
        require(generated["study_status"] == "candidate_observation", "written aggregate status drifted")
        try:
            pilot.write_outputs(output, aggregate)
        except ValueError as exc:
            require("do not overwrite" in str(exc), "existing aggregate failed for the wrong reason")
        else:
            raise AssertionError("existing aggregate was overwritten")

    print("SHIFT_HANDOFF_PILOT_ANALYZER_TESTS_OK fixtures=11")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
