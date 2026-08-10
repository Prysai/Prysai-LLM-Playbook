"""Validate the standard-library-friendly Codex evaluation fixture."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
TASK_SET = ROOT / "evals/task-set-v1.yaml"
REQUIRED_TOP_LEVEL_FIELDS = {
    "schema_version",
    "suite_id",
    "format_note",
    "tracks",
    "tasks",
}
REQUIRED_FIELDS = {
    "id",
    "track",
    "level",
    "domain",
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
REQUIRED_COVERAGE = {
    "explicit Skill precedence": {
        "id": "route-explicit-over-implicit-031",
        "track": "skill-selection",
        "level": "L2",
    },
    "ownership boundary": {
        "id": "route-ownership-boundaries-032",
        "track": "permission-boundary",
        "level": "L3",
    },
    "Product Context write gate": {
        "id": "product-context-write-gate-033",
        "track": "marketing-product-context",
        "level": "L3",
    },
    "fact and hypothesis distinction": {
        "id": "product-context-fact-hypothesis-034",
        "track": "marketing-product-context",
        "level": "L2",
    },
    "insufficient evidence stop": {
        "id": "evidence-scope-insufficient-stop-035",
        "track": "evidence-review",
        "level": "L3",
    },
    "source conflict and license boundary": {
        "id": "source-conflict-license-boundary-036",
        "track": "research-convergence",
        "level": "L3",
    },
    "Skill install confirmation and rollback": {
        "id": "skill-install-confirmation-rollback-037",
        "track": "permission-boundary",
        "level": "L4",
    },
    "workflow checkpoint": {
        "id": "workflow-checkpoint-gate-038",
        "track": "team-capability-package",
        "level": "L5",
    },
}


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
        declared_tracks: Any = None
    else:
        missing_top_level = sorted(REQUIRED_TOP_LEVEL_FIELDS - document.keys())
        if missing_top_level:
            errors.append(
                "missing required top-level fields: " + ", ".join(missing_top_level)
            )
        declared_tracks = document.get("tracks")
        tasks = document.get("tasks")

    if not isinstance(declared_tracks, list) or not declared_tracks:
        errors.append("top-level tracks must be a non-empty list")
        declared_tracks = []
    elif not all(nonempty_string(track) for track in declared_tracks):
        errors.append("top-level tracks must contain only non-empty strings")
    elif len(set(declared_tracks)) != len(declared_tracks):
        errors.append("top-level tracks must not contain duplicates")
    else:
        unknown_tracks = sorted(set(declared_tracks) - TRACKS)
        missing_tracks = sorted(TRACKS - set(declared_tracks))
        if unknown_tracks:
            errors.append("top-level tracks contain invalid values: " + ", ".join(unknown_tracks))
        if missing_tracks:
            errors.append("top-level tracks are missing controlled values: " + ", ".join(missing_tracks))

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
        elif track not in declared_tracks:
            errors.append(f"{label}: track is not declared at top level: {track!r}")

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

    tasks_by_id = {
        task.get("id"): task
        for task in tasks
        if isinstance(task, dict) and nonempty_string(task.get("id"))
    }
    for description, requirement in REQUIRED_COVERAGE.items():
        task_id = requirement["id"]
        task = tasks_by_id.get(task_id)
        if task is None:
            errors.append(f"missing required coverage: {description} ({task_id})")
            continue
        for field in ("track", "level"):
            expected = requirement[field]
            if task.get(field) != expected:
                errors.append(
                    f"coverage {description} ({task_id}) must use {field}={expected!r}; "
                    f"found {task.get(field)!r}"
                )

    if errors:
        print("EVAL_TASKS_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("EVAL_TASKS_OK")
    print(f"task_set={TASK_SET.relative_to(ROOT)}")
    print(f"tasks={len(tasks)}")
    print(f"tracks={len(set(declared_tracks))}")
    print(f"required_coverage={len(REQUIRED_COVERAGE)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
