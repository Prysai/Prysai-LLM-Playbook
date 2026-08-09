"""Validate the standard-library-friendly Codex Field Guide evaluation fixture."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
TASK_SET = ROOT / "evals/task-set-v1.yaml"
REQUIRED_FIELDS = {
    "id",
    "track",
    "input",
    "context",
    "allowed_actions",
    "expected_evidence",
    "forbidden_behaviors",
    "acceptance_criteria",
}
TRACKS = {
    "concept-explanation",
    "task-protocol",
    "skill-selection",
    "context-check",
    "permission-boundary",
    "evidence-review",
    "research-convergence",
    "engineering-planning",
    "marketing-product-context",
    "content-data-conversion",
    "missing-input",
    "conflicting-requirements",
    "repeated-failure",
    "stop-behavior",
    "team-capability-package",
}
LEVELS = {f"L{number}" for number in range(7)}
DOMAINS = {"general", "engineering", "research", "marketing", "team"}


def nonempty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def nonempty_string_list(value: Any) -> bool:
    return (
        isinstance(value, list)
        and bool(value)
        and all(nonempty_string(item) for item in value)
    )


def main() -> int:
    errors: list[str] = []
    if not TASK_SET.is_file():
        print(f"EVAL_TASKS_FAILED\n- missing file: {TASK_SET.relative_to(ROOT)}")
        return 1

    try:
        document = json.loads(TASK_SET.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print("EVAL_TASKS_FAILED")
        print(f"- task set must be valid YAML-compatible JSON: {exc}")
        return 1

    if not isinstance(document, dict):
        errors.append("top-level document must be an object")
        tasks: Any = None
    else:
        tasks = document.get("tasks")

    if not isinstance(tasks, list):
        errors.append("top-level tasks must be a list")
        tasks = []
    elif len(tasks) < 20:
        errors.append(f"fewer than 20 tasks found: {len(tasks)}")

    ids: set[str] = set()
    for index, task in enumerate(tasks, start=1):
        label = f"tasks[{index}]"
        if not isinstance(task, dict):
            errors.append(f"{label}: task must be an object")
            continue

        missing = sorted(REQUIRED_FIELDS - task.keys())
        if missing:
            errors.append(f"{label}: missing required fields: {', '.join(missing)}")

        task_id = task.get("id")
        if not nonempty_string(task_id):
            errors.append(f"{label}: id must be a non-empty string")
        elif task_id in ids:
            errors.append(f"{label}: duplicate id: {task_id}")
        else:
            ids.add(task_id)

        track = task.get("track")
        if track not in TRACKS:
            errors.append(f"{label}: invalid track: {track!r}")

        level = task.get("level")
        if level not in LEVELS:
            errors.append(f"{label}: invalid level: {level!r}")

        domain = task.get("domain")
        if domain not in DOMAINS:
            errors.append(f"{label}: invalid domain: {domain!r}")

        for field in ("input", "context"):
            if not nonempty_string(task.get(field)):
                errors.append(f"{label}: {field} must be a non-empty string")

        for field in (
            "allowed_actions",
            "expected_evidence",
            "forbidden_behaviors",
            "acceptance_criteria",
        ):
            if not nonempty_string_list(task.get(field)):
                errors.append(
                    f"{label}: {field} must be a non-empty list of non-empty strings"
                )

    if errors:
        print("EVAL_TASKS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("EVAL_TASKS_OK")
    print(f"task_set={TASK_SET.relative_to(ROOT)}")
    print(f"tasks={len(tasks)}")
    print(f"tracks={len({task['track'] for task in tasks})}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
