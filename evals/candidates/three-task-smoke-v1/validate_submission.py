"""Validate one submission against the frozen three-task smoke fixture.

This program is intentionally offline and deterministic. It validates the
fixture's narrow output contract; it does not run a model or score model quality.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
FIXTURE_PATH = ROOT / "fixture.json"


def normalise_markdown(value: str) -> str:
    return "\n".join(line.rstrip() for line in value.replace("\r\n", "\n").split("\n")).strip() + "\n"


def load_fixture() -> dict:
    return json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))


def task_record(task_id: str) -> dict:
    for task in load_fixture().get("tasks", []):
        if task.get("id") == task_id:
            return task
    raise ValueError(f"unknown task: {task_id}")


def validate(task_id: str, submission_path: Path) -> tuple[bool, str]:
    task = task_record(task_id)
    expected_path = ROOT / task["expected_path"]
    submitted = submission_path.read_text(encoding="utf-8")
    expected = expected_path.read_text(encoding="utf-8")

    if task["submission_kind"] in {"json_array", "json_object"}:
        try:
            actual_value = json.loads(submitted)
            expected_value = json.loads(expected)
        except json.JSONDecodeError as exc:
            return False, f"submission is not valid JSON: {exc.msg}"
        expected_type = list if task["submission_kind"] == "json_array" else dict
        if not isinstance(actual_value, expected_type):
            return False, f"submission must be a JSON {expected_type.__name__}"
        if actual_value != expected_value:
            return False, "submission does not match the frozen expected structure and values"
        return True, "JSON submission matches the frozen fixture"

    if task["submission_kind"] == "markdown_exact_normalized":
        if normalise_markdown(submitted) != normalise_markdown(expected):
            return False, "submission does not match the frozen Markdown structure and wording"
        return True, "Markdown submission matches the frozen fixture"

    return False, f"unsupported submission kind: {task['submission_kind']}"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--task", required=True, help="Fixture task ID")
    parser.add_argument("--submission", required=True, type=Path, help="Local candidate answer to validate")
    args = parser.parse_args(argv)

    if not args.submission.is_file():
        print("SMOKE_SUBMISSION_FAILED")
        print(f"- submission file is missing: {args.submission}")
        return 1

    try:
        ok, detail = validate(args.task, args.submission)
    except (OSError, UnicodeError, ValueError, json.JSONDecodeError) as exc:
        print("SMOKE_SUBMISSION_FAILED")
        print(f"- cannot validate submission: {exc}")
        return 1

    if not ok:
        print("SMOKE_SUBMISSION_FAILED")
        print(f"- {detail}")
        return 1

    print("SMOKE_SUBMISSION_OK")
    print(f"task={args.task}")
    print("evidence_boundary=fixture-output-only; not-model-performance-or-learning-proof")
    return 0


if __name__ == "__main__":
    sys.exit(main())
