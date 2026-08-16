"""Run the repository's standard-library regression suites from one entry point.

Focused contract fixtures live beside their validators in ``scripts/test_*.py``.
The small ``tests/`` directory exists for generic discovery tools.  This runner
executes both locations so contributors, CI, and repository scanners do not
need to infer the project's test layout from filenames.

Passing this command establishes only the named repository-contract checks. It
does not establish learner outcomes, translation quality, model behavior,
security outcomes, or release readiness.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_TESTS = tuple(sorted((ROOT / "scripts").glob("test_*.py")))
DISCOVERY_COMMAND = (
    sys.executable,
    "-X",
    "utf8",
    "-m",
    "unittest",
    "discover",
    "-s",
    "tests",
    "-p",
    "test_*.py",
)


def run(command: tuple[str, ...], label: str) -> bool:
    print(f"TEST_START label={label}")
    result = subprocess.run(command, cwd=ROOT, check=False)
    if result.returncode:
        print(f"TEST_FAIL label={label} exit_code={result.returncode}")
        return False
    print(f"TEST_OK label={label}")
    return True


def main() -> int:
    if not SCRIPT_TESTS:
        print("TEST_RUNNER_FAILED")
        print("- no scripts/test_*.py fixtures were found")
        return 1

    passed = 0
    failed = 0
    for test_path in SCRIPT_TESTS:
        label = test_path.relative_to(ROOT).as_posix()
        if run((sys.executable, "-X", "utf8", str(test_path)), label):
            passed += 1
        else:
            failed += 1

    if run(DISCOVERY_COMMAND, "unittest-discovery"):
        passed += 1
    else:
        failed += 1

    print(
        "TEST_RUNNER_SUMMARY "
        f"script_tests={len(SCRIPT_TESTS)} passed={passed} failed={failed}"
    )
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(main())
