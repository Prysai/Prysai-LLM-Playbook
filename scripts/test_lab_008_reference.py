"""Exercise Lab 008 reference-run behavior at its command-line seams."""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import validate_lab_008_brief as brief_validator


ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "scripts/run_lab_008_reference.py"
VALIDATOR = ROOT / "scripts/validate_lab_008_brief.py"


def run(*arguments: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, *arguments],
        cwd=ROOT,
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
        check=False,
    )


def validate(packet: Path) -> subprocess.CompletedProcess[str]:
    return run(str(VALIDATOR), "--packet", str(packet))


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    failures: list[str] = []
    work_root = ROOT / ".work"
    work_root.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="lab008-tests-", dir=work_root) as temp_name:
        temp = Path(temp_name)
        base = temp / "valid"
        generated = run(str(RUNNER), "--output-dir", str(base))
        checked = validate(base) if generated.returncode == 0 else generated
        if generated.returncode != 0 or checked.returncode != 0:
            failures.append("valid generated packet failed")
        existing = run(str(RUNNER), "--output-dir", str(base))
        if existing.returncode == 0 or "must not already exist" not in existing.stdout:
            failures.append("runner overwrote an existing evidence directory")
        repeat = temp / "repeat"
        repeated = run(str(RUNNER), "--output-dir", str(repeat))
        if repeated.returncode != 0:
            failures.append("repeat generation failed")
        else:
            base_files = {
                path.relative_to(base).as_posix(): path.read_bytes()
                for path in sorted(base.rglob("*")) if path.is_file()
            }
            repeat_files = {
                path.relative_to(repeat).as_posix(): path.read_bytes()
                for path in sorted(repeat.rglob("*")) if path.is_file()
            }
            if base_files != repeat_files:
                failures.append("repeat generation was not byte-for-byte deterministic")

        outside = temp.parent.parent / "lab008-path-escape"
        escaped = run(str(RUNNER), "--output-dir", str(outside))
        if escaped.returncode == 0 or outside.exists():
            failures.append("runner accepted an output outside repository .work")

        mutations = {
            "no-conclusion-downgrade": ("conclusion was not downgraded to bounded", lambda root, brief, record: brief.update(
                {"conclusion_strength": "definitive"}
            )),
            "fabricated-support": ("ineligible source used as support", lambda root, brief, record: brief["claims"][0][
                "supported_by"
            ].append("S-FABRICATED")),
            "inaccessible-support": ("ineligible source used as support", lambda root, brief, record: brief["claims"][0][
                "supported_by"
            ].append("S-INACCESSIBLE")),
            "source-count-confidence": ("confidence must not be derived from source count", lambda root, brief, record: brief.update(
                {"source_count_confidence": True}
            )),
            "missing-conflict": ("required conflict record missing", lambda root, brief, record: brief.update({"conflicts": []})),
            "missing-limitations": ("limitations are missing or incomplete", lambda root, brief, record: brief.update({"limitations": []})),
            "zero-downtime-overclaim": ("conclusion does not match the bounded evidence decision", lambda root, brief, record: brief.update(
                {"conclusion": "For synthetic Orion release 4.2, a 30-minute window achieves zero downtime."}
            )),
            "claim-text-drift": ("claim text drift: C-WINDOW", lambda root, brief, record: brief["claims"][0].update(
                {"text": "Release 4.2 has a zero-downtime 30-minute window."}
            )),
            "artifact-path-escape": ("artifact path escaped packet", lambda root, brief, record: record["artifacts"].update(
                {"corrected_brief": "../outside.json"}
            )),
        }
        for name, (expected_error, mutate) in mutations.items():
            case = temp / name
            shutil.copytree(base, case)
            record_path = case / "run-record.json"
            record = json.loads(record_path.read_text(encoding="utf-8"))
            brief_path = case / record["artifacts"]["corrected_brief"]
            brief = json.loads(brief_path.read_text(encoding="utf-8"))
            mutate(case, brief, record)
            write_json(brief_path, brief)
            write_json(record_path, record)
            result = validate(case)
            if result.returncode == 0:
                failures.append(f"invalid packet passed: {name}")
            elif expected_error not in result.stdout:
                failures.append(f"invalid packet missed expected diagnosis: {name}")

        acceptance = json.loads((ROOT / "examples/lab-008-v1/expected/acceptance.json").read_text(encoding="utf-8"))
        sources = {
            json.loads(path.read_text(encoding="utf-8"))["source_id"]: json.loads(path.read_text(encoding="utf-8"))
            for path in sorted((ROOT / "examples/lab-008-v1/sources").glob("*.json"))
        }
        sources["S-CURRENT"]["statement"] = "Plan a 45-minute maintenance window for Orion release 4.2."
        if "frozen source statement drift: S-CURRENT" not in brief_validator.validate_sources(sources, acceptance):
            failures.append("source statement drift was not rejected")

    if failures:
        print("LAB_008_REFERENCE_TESTS_FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1
    print("LAB_008_REFERENCE_TESTS_OK positive=2 negative=12 deterministic=byte-for-byte")
    return 0


if __name__ == "__main__":
    sys.exit(main())
