"""Negative fixtures for executable-example maturity claims."""

from __future__ import annotations

import copy
import json
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/governance/executable-examples.yaml"
VALIDATOR = ROOT / "scripts/validate_executable_examples.py"


def main() -> int:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    cases = []
    missing_source = copy.deepcopy(data); missing_source["records"][0]["source_path"] = "examples/missing"; cases.append(missing_source)
    overclaim = copy.deepcopy(data); overclaim["records"][0]["verification_classes"].append("human_reviewed"); cases.append(overclaim)
    no_assert = copy.deepcopy(data); no_assert["records"][0]["verification_classes"].remove("asserted"); cases.append(no_assert)
    no_limits = copy.deepcopy(data); no_limits["records"][0]["known_blind_spots"] = []; cases.append(no_limits)
    bad_digest = copy.deepcopy(data); bad_digest["records"][0]["replay"]["fixture_manifest_sha256"] = "0" * 64; cases.append(bad_digest)
    second_bad_digest = copy.deepcopy(data); second_bad_digest["records"][1]["replay"]["fixture_manifest_sha256"] = "0" * 64; cases.append(second_bad_digest)
    missing_runner = copy.deepcopy(data); missing_runner["records"][0]["replay"]["runner_argv"][1] = "scripts/missing.py"; cases.append(missing_runner)
    fixture_drift = copy.deepcopy(data); fixture_drift["records"][0]["negative_fixtures"] = ["invented-fixture"]; cases.append(fixture_drift)
    unsafe_output = copy.deepcopy(data); unsafe_output["records"][0]["replay"]["output_subdir"] = "../escape"; cases.append(unsafe_output)
    packet_drift = copy.deepcopy(data); packet_drift["records"][0]["replay"]["packet_attestation_sha256"] = "0" * 64; cases.append(packet_drift)
    failures = []
    with tempfile.TemporaryDirectory(prefix="example-manifest-") as temp:
        for index, case in enumerate(cases, start=1):
            fixture = Path(temp) / f"manifest-{index}.json"
            fixture.write_text(json.dumps(case, indent=2) + "\n", encoding="utf-8")
            completed = subprocess.run(
                [sys.executable, str(VALIDATOR), "--manifest", str(fixture)],
                cwd=ROOT,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if completed.returncode == 0: failures.append(f"invalid fixture passed: {index}")
    if failures:
        print("EXECUTABLE_EXAMPLE_FIXTURES_FAILED")
        for failure in failures: print(f"- {failure}")
        return 1
    print("EXECUTABLE_EXAMPLE_FIXTURES_OK negative=10")
    return 0


if __name__ == "__main__":
    sys.exit(main())
