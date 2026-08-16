"""Regression tests for the Shift Handoff condition-blind score-packet builder."""

from __future__ import annotations

import copy
import hashlib
import json
import tempfile
from pathlib import Path

import build_shift_handoff_blind_score_packets as blind_packets
import build_shift_handoff_run_packets as run_packets


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def build_captured_log(manifest: dict[str, object], output: Path) -> dict[str, object]:
    response_root = output / "responses"
    response_root.mkdir()
    records = []
    for index, packet in enumerate(manifest["packets"], start=1):
        response = f"fictional concise receipt {index}"
        artifact_ref = f"responses/{index:02d}.json"
        (output / artifact_ref).write_text(json.dumps({"response_text": response}) + "\n", encoding="utf-8")
        records.append(
            {
                "record_id": f"REC-{index:02d}",
                "packet_id": packet["packet_id"],
                "condition": packet["condition"],
                "task_id": packet["task_id"],
                "repetition": packet["repetition"],
                "artifact_ref": artifact_ref,
                "response_text": response,
                "response_sha256": hashlib.sha256(response.encode("utf-8")).hexdigest(),
                "capture_status": "captured",
                "condition_deviation": "none",
            }
        )
    manifest_path = output / "packet-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    manifest_hash = hashlib.sha256(manifest_path.read_bytes()).hexdigest()
    return {
        "schema_version": "1",
        "record_set_status": "captured_unscored",
        "data_origin": "actual_deidentified_model_output_pilot",
        "fixture_id": "shift-handoff-v1",
        "candidate_sha": manifest["candidate_sha"],
        "packet_manifest_sha256": manifest_hash,
        "records": records,
    }


def main() -> int:
    fixture = run_packets.load_json(run_packets.FIXTURE_PATH)
    require(not run_packets.validate_fixture(fixture), "checked-in fixture is invalid")
    with tempfile.TemporaryDirectory(prefix="prysai-shift-handoff-blind-score-") as temporary:
        root = Path(temporary)
        source = root / "source"
        manifest_path = run_packets.write_packets(source / "prepared", fixture, candidate_sha="a" * 40, seed=17, repetitions=3)
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        captured_log = build_captured_log(manifest, source)
        run_log_path = source / "run-log.json"
        run_log_path.write_text(json.dumps(captured_log, indent=2) + "\n", encoding="utf-8")
        packet_manifest_path = source / "packet-manifest.json"
        errors = blind_packets.validate_captured_round(
            captured_log,
            manifest,
            packet_manifest_sha256=hashlib.sha256(packet_manifest_path.read_bytes()).hexdigest(),
            run_log_dir=source,
        )
        require(not errors, f"valid captured log was rejected: {errors}")
        output = blind_packets.write_packets(
            root / "review-packets",
            captured_log,
            manifest,
            fixture,
            packet_manifest_sha256=hashlib.sha256(packet_manifest_path.read_bytes()).hexdigest(),
            seed=19,
        )
        key = json.loads((output / "maintainer-condition-key.json").read_text(encoding="utf-8"))
        require(len(key["bindings"]) == 18, "condition key must retain all eighteen bindings")
        for alias in blind_packets.REVIEWER_ALIASES:
            reviewer_dir = output / alias
            review_packet = json.loads((reviewer_dir / "review-packet.json").read_text(encoding="utf-8"))
            score_sheet = json.loads((reviewer_dir / "score-sheet.json").read_text(encoding="utf-8"))
            require(len(review_packet["records"]) == 18 and len(score_sheet["records"]) == 18, "reviewer packet count drifted")
            blind_packets.assert_reviewer_packet_is_condition_blind(review_packet)
            visible = json.dumps(review_packet).lower()
            require("shp-" not in visible and "baseline" not in visible and "shift_handoff" not in visible, "reviewer packet leaked a condition identity")
            require(all(value == "not_scored" for value in score_sheet["records"][0]["dimension_scores"].values()), "blank sheet must not contain a score")
        try:
            blind_packets.write_packets(output, captured_log, manifest, fixture, packet_manifest_sha256=hashlib.sha256(packet_manifest_path.read_bytes()).hexdigest(), seed=19)
        except ValueError as exc:
            require("do not overwrite" in str(exc), "non-empty output failed for the wrong reason")
        else:
            raise AssertionError("blind review packet was overwritten")

        malformed = copy.deepcopy(captured_log)
        malformed["records"][0]["response_sha256"] = "0" * 64
        errors = blind_packets.validate_captured_round(
            malformed,
            manifest,
            packet_manifest_sha256=hashlib.sha256(packet_manifest_path.read_bytes()).hexdigest(),
            run_log_dir=source,
        )
        require(any("response_sha256" in error for error in errors), "changed response was accepted")

        legacy_manifest = copy.deepcopy(manifest)
        legacy_manifest["packet_generator_revision"] = run_packets.LEGACY_PACKET_GENERATOR_REVISION
        legacy_manifest.pop("prompt_hash_scope")
        legacy_path = source / "legacy-packet-manifest.json"
        legacy_path.write_text(json.dumps(legacy_manifest, indent=2) + "\n", encoding="utf-8")
        legacy_log = copy.deepcopy(captured_log)
        legacy_log["packet_manifest_sha256"] = hashlib.sha256(legacy_path.read_bytes()).hexdigest()
        errors = blind_packets.validate_captured_round(
            legacy_log,
            legacy_manifest,
            packet_manifest_sha256=legacy_log["packet_manifest_sha256"],
            run_log_dir=source,
        )
        require(any("requires a current v2" in error for error in errors), "legacy manifest was accepted for blind review")

    print("SHIFT_HANDOFF_BLIND_SCORE_PACKET_TESTS_OK packets=18 reviewers=2 negative_fixtures=3")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
