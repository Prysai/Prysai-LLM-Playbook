"""Exercise gold-content admission through its CLI boundary."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from copy import deepcopy
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "scripts/fixtures/gold-content-admission"
VALIDATOR = ROOT / "scripts/validate_gold_content_admission.py"


def assign_path(record: dict[str, Any], dotted: str, value: Any) -> None:
    target = record
    parts = dotted.split(".")
    for part in parts[:-1]:
        target = target[part]
    target[parts[-1]] = value


def materialize(fixture: dict[str, Any]) -> dict[str, Any]:
    base_name = fixture.get("extends")
    if not base_name:
        return fixture
    record = json.loads((FIXTURES / base_name).read_text(encoding="utf-8"))
    record = deepcopy(record)
    for dotted, value in fixture.get("mutations", {}).items():
        assign_path(record, dotted, value)
    for field in fixture.get("remove", []):
        record.pop(field, None)
    return record


def run_record(record: dict[str, Any]) -> subprocess.CompletedProcess[str]:
    with tempfile.TemporaryDirectory(prefix="gold-content-") as temp_dir:
        path = Path(temp_dir) / "record.json"
        path.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
        return subprocess.run(
            [sys.executable, str(VALIDATOR), "--record", str(path)],
            cwd=ROOT,
            text=True,
            encoding="utf-8",
            errors="replace",
            capture_output=True,
            check=False,
        )


def main() -> int:
    failures: list[str] = []
    valid = json.loads((FIXTURES / "valid-lab.json").read_text(encoding="utf-8"))
    completed = run_record(valid)
    if completed.returncode != 0 or "GOLD_CONTENT_ADMISSION_OK" not in completed.stdout:
        failures.append(f"valid fixture was rejected: {completed.stdout}{completed.stderr}")

    negative_count = 0
    for path in sorted(FIXTURES.glob("reject-*.json")):
        fixture = json.loads(path.read_text(encoding="utf-8"))
        completed = run_record(materialize(fixture))
        negative_count += 1
        expected = fixture["expected"]
        if completed.returncode == 0:
            failures.append(f"{path.name}: invalid fixture passed")
        if expected not in completed.stdout:
            failures.append(f"{path.name}: missing diagnostic {expected!r}: {completed.stdout}")

    if failures:
        print("GOLD_CONTENT_ADMISSION_FIXTURES_FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1
    print(f"GOLD_CONTENT_ADMISSION_FIXTURES_OK positive=1 negative={negative_count}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
