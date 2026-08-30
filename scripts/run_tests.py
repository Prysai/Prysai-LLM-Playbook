"""Run the repository's regression suites from one entry point.

Focused contract fixtures live beside their validators in ``scripts/test_*.py``.
The small ``tests/`` directory exists for generic discovery tools.  This runner
executes both locations so contributors, CI, and repository scanners do not
need to infer the project's test layout from filenames.

Passing this command establishes only the named repository-contract checks. It
does not establish learner outcomes, translation quality, model behavior,
security outcomes, or release readiness.

The focused fixtures are separate processes, so the runner can overlap their
I/O-bound work without sharing Python state.  Use ``--jobs 1`` when diagnosing
an order-sensitive failure or reproducing a serial CI log.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from pathlib import Path
from time import perf_counter
from typing import Callable, Sequence


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_TESTS = tuple(sorted((ROOT / "scripts").glob("test_*.py")))
MAX_JOBS = 16
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


@dataclass(frozen=True)
class RunResult:
    """Captured result for one independently executed regression process."""

    label: str
    exit_code: int
    output: str
    duration_ms: int

    @property
    def passed(self) -> bool:
        return self.exit_code == 0


CommandSpec = tuple[tuple[str, ...], str]
ResultCallback = Callable[[RunResult], None]
StartCallback = Callable[[str], None]


def default_jobs() -> int:
    """Return a conservative worker count for local machines and CI runners."""

    return max(1, min(4, os.cpu_count() or 1))


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run focused fixtures and unittest discovery for this repository."
    )
    parser.add_argument(
        "--jobs",
        type=int,
        default=default_jobs(),
        help=(
            "maximum number of test processes to overlap "
            f"(default: %(default)s, maximum: {MAX_JOBS})"
        ),
    )
    args = parser.parse_args(argv)
    if not 1 <= args.jobs <= MAX_JOBS:
        parser.error(f"--jobs must be between 1 and {MAX_JOBS}")
    return args


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


def execute(
    command: tuple[str, ...], label: str, environment: dict[str, str]
) -> RunResult:
    started = perf_counter()
    try:
        completed = subprocess.run(
            command,
            cwd=ROOT,
            check=False,
            env=environment,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        output = completed.stdout + completed.stderr
        exit_code = completed.returncode
    except OSError as exc:
        output = f"runner could not start process: {exc}\n"
        exit_code = 1
    duration_ms = int((perf_counter() - started) * 1000)
    return RunResult(label, exit_code, output, duration_ms)


def report(result: RunResult) -> None:
    if result.output:
        sys.stdout.write(result.output)
        if not result.output.endswith("\n"):
            sys.stdout.write("\n")
    status = "TEST_OK" if result.passed else "TEST_FAIL"
    print(
        f"{status} label={result.label} exit_code={result.exit_code} "
        f"duration_ms={result.duration_ms}",
        flush=True,
    )


def run(command: tuple[str, ...], label: str, environment: dict[str, str]) -> bool:
    """Run one command serially, retaining the historical helper contract."""

    print(f"TEST_START label={label}", flush=True)
    result = execute(command, label, environment)
    report(result)
    return result.passed


def run_suite(
    commands: Sequence[CommandSpec],
    environment: dict[str, str],
    jobs: int,
    on_result: ResultCallback | None = None,
    on_start: StartCallback | None = None,
) -> list[RunResult]:
    """Execute command specs with bounded concurrency and stable result order."""

    if not 1 <= jobs <= MAX_JOBS:
        raise ValueError(f"jobs must be between 1 and {MAX_JOBS}")
    results: list[RunResult | None] = [None] * len(commands)
    if jobs == 1:
        for index, (command, label) in enumerate(commands):
            if on_start:
                on_start(label)
            result = execute(command, label, environment)
            results[index] = result
            if on_result:
                on_result(result)
    else:
        with ThreadPoolExecutor(max_workers=jobs, thread_name_prefix="prysai-test") as pool:
            futures = {}
            for index, (command, label) in enumerate(commands):
                if on_start:
                    on_start(label)
                futures[pool.submit(execute, command, label, environment)] = index
            for future in as_completed(futures):
                index = futures[future]
                result = future.result()
                results[index] = result
                if on_result:
                    on_result(result)
    return [result for result in results if result is not None]


def main() -> int:
    args = parse_args()
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

    commands: list[CommandSpec] = [
        (
            (sys.executable, "-X", "utf8", str(test_path)),
            test_path.relative_to(ROOT).as_posix(),
        )
        for test_path in SCRIPT_TESTS
    ]
    commands.append((DISCOVERY_COMMAND, "unittest-discovery"))
    started = perf_counter()
    results = run_suite(
        commands,
        environment,
        args.jobs,
        on_result=report,
        on_start=lambda label: print(f"TEST_START label={label}", flush=True),
    )
    passed = sum(result.passed for result in results)
    failed = len(results) - passed
    elapsed_ms = int((perf_counter() - started) * 1000)

    print(
        "TEST_RUNNER_SUMMARY "
        f"script_tests={len(SCRIPT_TESTS)} passed={passed} failed={failed} "
        f"jobs={args.jobs} elapsed_ms={elapsed_ms}"
    )
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(main())
