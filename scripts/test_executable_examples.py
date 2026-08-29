"""Negative fixtures for executable-example maturity claims."""

from __future__ import annotations

import argparse
import copy
import json
import os
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/governance/executable-examples.yaml"
VALIDATOR = ROOT / "scripts/validate_executable_examples.py"
MAX_JOBS = 16


def default_jobs() -> int:
    """Use a small bounded fan-out for independent negative fixtures."""

    return max(1, min(4, os.cpu_count() or 1))


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run executable-example negative fixtures."
    )
    parser.add_argument(
        "--jobs",
        type=int,
        default=default_jobs(),
        help=(
            "maximum number of negative fixtures to validate concurrently "
            f"(default: %(default)s, maximum: {MAX_JOBS})"
        ),
    )
    args = parser.parse_args(argv)
    if not 1 <= args.jobs <= MAX_JOBS:
        parser.error(f"--jobs must be between 1 and {MAX_JOBS}")
    return args


def run_case(index: int, case: dict, temp: str) -> str | None:
    """Validate one isolated manifest and return a stable failure message."""

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
    if completed.returncode == 0:
        return f"invalid fixture passed: {index}"
    return None


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))

    def record_case(index: int, mutate) -> dict:
        """Build a minimal manifest for one negative record.

        Negative fixtures only need the record whose contract is being
        mutated. Keeping unrelated valid records out of the fixture prevents
        every subprocess from replaying an expensive reference packet that
        cannot affect the expected failure.
        """

        case = copy.deepcopy(data)
        record = case["records"][index]
        case["records"] = [record]
        mutate(record)
        return case

    cases = []
    cases.extend(
        [
            record_case(0, lambda record: record.__setitem__("source_path", "examples/missing")),
            record_case(0, lambda record: record["verification_classes"].append("human_reviewed")),
            record_case(0, lambda record: record["verification_classes"].remove("asserted")),
            record_case(0, lambda record: record.__setitem__("known_blind_spots", [])),
            record_case(0, lambda record: record["replay"].__setitem__("fixture_manifest_sha256", "0" * 64)),
            record_case(1, lambda record: record["replay"].__setitem__("fixture_manifest_sha256", "0" * 64)),
            record_case(0, lambda record: record["replay"]["runner_argv"].__setitem__(1, "scripts/missing.py")),
            record_case(0, lambda record: record.__setitem__("negative_fixtures", ["invented-fixture"])),
            record_case(0, lambda record: record["replay"].__setitem__("output_subdir", "../escape")),
            record_case(0, lambda record: record["replay"].__setitem__("packet_attestation_sha256", "0" * 64)),
        ]
    )
    failures: list[str] = []
    with tempfile.TemporaryDirectory(prefix="example-manifest-") as temp:
        if args.jobs == 1:
            results = [run_case(index, case, temp) for index, case in enumerate(cases, start=1)]
        else:
            with ThreadPoolExecutor(max_workers=min(args.jobs, len(cases))) as pool:
                results = list(
                    pool.map(
                        lambda item: run_case(item[0], item[1], temp),
                        enumerate(cases, start=1),
                    )
                )
        failures.extend(result for result in results if result is not None)
    if failures:
        print("EXECUTABLE_EXAMPLE_FIXTURES_FAILED")
        for failure in failures: print(f"- {failure}")
        return 1
    print(f"EXECUTABLE_EXAMPLE_FIXTURES_OK negative={len(cases)} jobs={args.jobs}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
