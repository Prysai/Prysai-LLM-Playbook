"""Exercise Lab 013 packet rejection at the CLI boundary."""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
import argparse
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "scripts/run_lab_013_reference.py"
VALIDATOR = ROOT / "scripts/validate_lab_013_reference.py"
NEGATIVE_FIXTURES = [
    "artifact-hash",
    "attempt-exit",
    "learner-overclaim",
    "path-escape",
    "cleanup-overclaim",
]


def validate(path: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run([sys.executable, str(VALIDATOR), "--packet", str(path)], cwd=ROOT, text=True, encoding="utf-8", errors="replace", capture_output=True, check=False)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--list-fixtures", action="store_true")
    args = parser.parse_args()
    failures: list[str] = []
    work_root = ROOT / ".work"
    work_root.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="lab013-tests-", dir=work_root) as temp:
        base = Path(temp) / "base"
        run = subprocess.run([sys.executable, str(RUNNER), "--output-dir", str(base)], cwd=ROOT, text=True, encoding="utf-8", errors="replace", capture_output=True, check=False)
        if run.returncode or validate(base).returncode: failures.append("valid generated packet failed")
        mutations = {
            "artifact-hash": lambda root, rec: (root / "artifacts/release-note.md").write_text("tampered\n", encoding="utf-8"),
            "attempt-exit": lambda root, rec: rec["attempts"][0].update({"exit_code": 0}),
            "learner-overclaim": lambda root, rec: next(item for item in rec["claims"] if item["id"] == "learner-run-not-observed").update({"status": "supported"}),
            "path-escape": lambda root, rec: rec.update({"changed_product_paths": ["README.md", "release-notes/next.md"]}),
            "cleanup-overclaim": lambda root, rec: rec["cleanup"].update({"status": "passed", "target_id": "wrong-target"}),
        }
        for name, mutate in mutations.items():
            case = Path(temp) / name
            shutil.copytree(base, case)
            record_path = case / "run-record.json"
            record = json.loads(record_path.read_text(encoding="utf-8"))
            mutate(case, record)
            record_path.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
            if validate(case).returncode == 0: failures.append(f"invalid packet passed: {name}")
    if failures:
        print("LAB_013_REFERENCE_FIXTURES_FAILED")
        for failure in failures: print(f"- {failure}")
        return 1
    if args.list_fixtures:
        print(json.dumps(NEGATIVE_FIXTURES))
        return 0
    print(f"LAB_013_REFERENCE_FIXTURES_OK positive=1 negative={len(NEGATIVE_FIXTURES)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
