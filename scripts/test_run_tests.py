"""Regression fixtures for the bounded unified test runner."""

from __future__ import annotations

import sys
from contextlib import redirect_stderr
from io import StringIO

import run_tests


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def python_command(source: str) -> tuple[str, ...]:
    return (sys.executable, "-c", source)


def main() -> int:
    default = run_tests.parse_args([]).jobs
    require(1 <= default <= 4, "default worker count escaped the safe bound")
    require(run_tests.parse_args(["--jobs", "1"]).jobs == 1, "serial mode was not selectable")
    parser_output = StringIO()
    try:
        with redirect_stderr(parser_output):
            run_tests.parse_args(["--jobs", "0"])
    except SystemExit as exc:
        require(exc.code == 2, "invalid worker count returned the wrong parser status")
        require("between 1 and" in parser_output.getvalue(), "invalid worker bound was not explained")
    else:
        raise AssertionError("zero workers were accepted")
    excessive_output = StringIO()
    try:
        with redirect_stderr(excessive_output):
            run_tests.parse_args(["--jobs", str(run_tests.MAX_JOBS + 1)])
    except SystemExit as exc:
        require(exc.code == 2, "excessive worker count returned the wrong parser status")
        require("between 1 and" in excessive_output.getvalue(), "excessive worker bound was not explained")
    else:
        raise AssertionError("unbounded worker count was accepted")

    environment = run_tests.child_environment()
    callbacks: list[str] = []
    commands = [
        (python_command("import time; time.sleep(0.08); print('slow')"), "slow"),
        (python_command("print('fast')"), "fast"),
    ]
    starts: list[str] = []
    results = run_tests.run_suite(
        commands,
        environment,
        jobs=2,
        on_result=lambda result: callbacks.append(result.label),
        on_start=starts.append,
    )
    require(starts == ["slow", "fast"], "parallel start callback did not follow declaration order")
    require([result.label for result in results] == ["slow", "fast"], "parallel results lost declaration order")
    require(set(callbacks) == {"slow", "fast"}, "parallel completion callback omitted a result")
    require(all(result.passed for result in results), "valid parallel fixture failed")
    require("slow" in results[0].output and "fast" in results[1].output, "child output was not captured")

    failed = run_tests.run_suite(
        [(python_command("import sys; print('expected failure'); sys.exit(3)"), "failure")],
        environment,
        jobs=1,
    )[0]
    require(not failed.passed and failed.exit_code == 3, "child failure was not preserved")
    require("expected failure" in failed.output, "failed child output was lost")
    try:
        run_tests.run_suite([], environment, jobs=run_tests.MAX_JOBS + 1)
    except ValueError as exc:
        require("between 1 and" in str(exc), "direct runner API did not enforce worker bound")
    else:
        raise AssertionError("direct runner API accepted an unbounded worker count")

    print("RUN_TESTS_RUNNER_TESTS_OK fixtures=6 parallel=2 serial=1")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
