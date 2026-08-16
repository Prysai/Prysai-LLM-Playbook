"""Regression tests for frozen Shift Handoff candidate prompt packets.

The temporary packets in this test are synthetic input preparation only. They
are not model runs, scorer records, or evidence that either condition helps.
"""

from __future__ import annotations

import copy
import json
import tempfile
from pathlib import Path

import build_shift_handoff_run_packets as packets


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    fixture = packets.load_json(packets.FIXTURE_PATH)
    require(not packets.validate_fixture(fixture), "checked-in fixture prompt contract is invalid")
    baseline = packets.render_prompt(fixture, fixture["tasks"][0], "baseline")
    handoff = packets.render_prompt(fixture, fixture["tasks"][0], "shift_handoff")
    for required_fact in (fixture["tasks"][0]["current_item"], fixture["tasks"][0]["expected_boundary"]):
        require(required_fact in baseline and required_fact in handoff, "conditions lost a shared task fact")
    require("\nStable Card —" not in baseline and "\nStable Card —" in handoff, "condition layout is not distinct")
    require("https://" not in baseline + handoff and "token=" not in (baseline + handoff).lower(), "fictional prompt leaked a network or secret marker")

    ordered_once = packets.build_run_order(fixture, seed=17, repetitions=3)
    ordered_twice = packets.build_run_order(fixture, seed=17, repetitions=3)
    require(ordered_once == ordered_twice, "same seed did not produce deterministic packet order")
    require(len(ordered_once) == 18, "run order must have eighteen packets")
    require(sum(packet["condition"] == "baseline" for packet in ordered_once) == 9, "baseline count drifted")
    require(sum(packet["condition"] == "shift_handoff" for packet in ordered_once) == 9, "handoff count drifted")
    require([packet["run_order"] for packet in ordered_once] == list(range(1, 19)), "run order is not contiguous")

    with tempfile.TemporaryDirectory(prefix="prysai-shift-handoff-packets-") as temporary:
        output = Path(temporary) / "packets"
        manifest_path = packets.write_packets(output, fixture, candidate_sha="a" * 40, seed=17, repetitions=3)
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        require(not packets.validate_manifest(manifest), "written manifest is invalid")
        require(manifest["packet_generator_revision"] == packets.PACKET_GENERATOR_REVISION, "written manifest did not use the current generator revision")
        require(manifest["prompt_hash_scope"] == packets.PROMPT_HASH_SCOPE, "written manifest did not declare byte-hash scope")
        for packet in manifest["packets"]:
            prompt_bytes = (output / packet["prompt_path"]).read_bytes()
            require(b"\r\n" not in prompt_bytes, "prepared prompt used platform-converted newlines")
            require(packets.sha256_bytes(prompt_bytes) == packet["prompt_sha256"], "manifest prompt byte hash mismatch")
        try:
            packets.write_packets(output, fixture, candidate_sha="a" * 40, seed=17, repetitions=3)
        except ValueError as exc:
            require("do not overwrite" in str(exc), "existing output rejected for wrong reason")
        else:
            raise AssertionError("prepared packet was overwritten")

    malformed = copy.deepcopy(fixture)
    malformed["condition_prompt_contract"]["baseline"]["layout"] = "stable_current_cards"
    require(any("baseline.layout" in error for error in packets.validate_fixture(malformed)), "drifted baseline contract was accepted")
    try:
        packets.build_run_order(fixture, seed=17, repetitions=2)
    except ValueError as exc:
        require("exactly 3" in str(exc), "wrong repetition error")
    else:
        raise AssertionError("non-frozen repetition count was accepted")

    print("SHIFT_HANDOFF_RUN_PACKET_TESTS_OK packets=18 negative_fixtures=3")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
