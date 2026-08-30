"""Check the offline three-task smoke fixture and its deterministic validator."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURE_ROOT = ROOT / "evals/candidates/three-task-smoke-v1"
FIXTURE_PATH = FIXTURE_ROOT / "fixture.json"


def load_validator():
    spec = importlib.util.spec_from_file_location("three_task_smoke_validator", FIXTURE_ROOT / "validate_submission.py")
    if spec is None or spec.loader is None:
        raise RuntimeError("cannot load three-task smoke validator")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def canonical_fixture_bytes(path: Path) -> bytes:
    """Hash text fixtures independently of the checkout's newline style."""

    return path.read_bytes().replace(b"\r\n", b"\n").replace(b"\r", b"\n")


def main() -> int:
    fixture = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))
    assert fixture["task_set_id"] == "three-task-smoke-v1"
    assert fixture["version"] == "v1"
    assert fixture["status"] == "candidate"
    assert fixture["run_evidence_status"] == "not_run"
    assert [task["id"] for task in fixture["tasks"]] == ["extract-01", "markdown-02", "gap-review-03"]

    validator = load_validator()
    with tempfile.TemporaryDirectory() as temporary:
        temporary_path = Path(temporary)
        for task in fixture["tasks"]:
            input_path = FIXTURE_ROOT / task["input_path"]
            expected_path = FIXTURE_ROOT / task["expected_path"]
            assert input_path.is_file()
            assert expected_path.is_file()
            assert hashlib.sha256(canonical_fixture_bytes(input_path)).hexdigest() == task["input_sha256"]
            submission = temporary_path / expected_path.name
            submission.write_bytes(expected_path.read_bytes())
            ok, detail = validator.validate(task["id"], submission)
            assert ok, detail

        invalid_submission = temporary_path / "invalid.json"
        invalid_submission.write_text('{"claim": "feature is live"}\n', encoding="utf-8")
        ok, _ = validator.validate("gap-review-03", invalid_submission)
        assert not ok

    print("THREE_TASK_SMOKE_FIXTURE_OK")
    print("tasks=3 run_evidence=not_run")
    print("evidence_boundary=fixture-contract-only; not-model-performance-or-learning-proof")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
