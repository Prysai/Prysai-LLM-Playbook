"""Run the repository's regression suites from one entry point.

Focused contract fixtures live beside their validators in ``scripts/test_*.py``.
The small ``tests/`` directory exists for generic discovery tools.  This runner
executes both locations so contributors, CI, and repository scanners do not
need to infer the project's test layout from filenames.

Passing this command establishes only the named repository-contract checks. It
does not establish learner outcomes, translation quality, model behavior,
security outcomes, or release readiness.
"""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_TESTS = tuple(sorted((ROOT / "scripts").glob("test_*.py")))
PY_YAML_VERSION = "6.0.3"
PY_YAML_TARGET = Path(os.environ.get("TEMP", ".")) / "prysai-pyyaml-test"
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


def child_environment() -> dict[str, str]:
    """Provide the temporary YAML dependency required by GitHub-form checks.

    The repository deliberately does not vendor PyYAML. CI installs the pinned
    wheel explicitly; this local runner mirrors that setup only when the
    selected Python interpreter does not already provide it.
    """
    try:
        import yaml  # noqa: F401
    except ModuleNotFoundError:
        if not (PY_YAML_TARGET / "yaml").is_dir():
            PY_YAML_TARGET.mkdir(parents=True, exist_ok=True)
            install = subprocess.run(
                (
                    sys.executable,
                    "-m",
                    "pip",
                    "install",
                    "--disable-pip-version-check",
                    "--only-binary=:all:",
                    f"PyYAML=={PY_YAML_VERSION}",
                    "--target",
                    str(PY_YAML_TARGET),
                ),
                cwd=ROOT,
                check=False,
            )
            if install.returncode:
                raise RuntimeError(
                    "could not prepare the temporary PyYAML dependency; install "
                    f"PyYAML=={PY_YAML_VERSION} into {PY_YAML_TARGET} and rerun"
                )

    environment = os.environ.copy()
    target = str(PY_YAML_TARGET)
    if PY_YAML_TARGET.is_dir():
        environment["PYTHONPATH"] = target + os.pathsep + environment.get("PYTHONPATH", "")
    return environment


def run(command: tuple[str, ...], label: str, environment: dict[str, str]) -> bool:
    print(f"TEST_START label={label}")
    result = subprocess.run(command, cwd=ROOT, check=False, env=environment)
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

    try:
        environment = child_environment()
    except RuntimeError as exc:
        print("TEST_RUNNER_FAILED")
        print(f"- {exc}")
        return 1

    passed = 0
    failed = 0
    for test_path in SCRIPT_TESTS:
        label = test_path.relative_to(ROOT).as_posix()
        if run((sys.executable, "-X", "utf8", str(test_path)), label, environment):
            passed += 1
        else:
            failed += 1

    if run(DISCOVERY_COMMAND, "unittest-discovery", environment):
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
