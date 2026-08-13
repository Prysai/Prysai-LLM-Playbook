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
    failures = []
    with tempfile.TemporaryDirectory(prefix="example-manifest-") as temp:
        original = MANIFEST.read_text(encoding="utf-8")
        try:
            for index, case in enumerate(cases, start=1):
                MANIFEST.write_text(json.dumps(case, indent=2) + "\n", encoding="utf-8")
                completed = subprocess.run([sys.executable, str(VALIDATOR)], cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace")
                if completed.returncode == 0: failures.append(f"invalid fixture passed: {index}")
        finally:
            MANIFEST.write_text(original, encoding="utf-8")
    if failures:
        print("EXECUTABLE_EXAMPLE_FIXTURES_FAILED")
        for failure in failures: print(f"- {failure}")
        return 1
    print("EXECUTABLE_EXAMPLE_FIXTURES_OK negative=4")
    return 0


if __name__ == "__main__":
    sys.exit(main())
