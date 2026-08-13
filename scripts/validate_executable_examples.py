"""Validate registered executable-example claims and paths."""

from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/governance/executable-examples.yaml"


def main() -> int:
    errors: list[str] = []
    try:
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"EXECUTABLE_EXAMPLES_FAILED\n- {exc}")
        return 2
    allowed = set(data.get("verification_classes", []))
    records = data.get("records", [])
    if not allowed or not isinstance(records, list) or not records:
        errors.append("manifest needs classes and records")
    seen: set[str] = set()
    for record in records:
        rid = record.get("id")
        if not isinstance(rid, str) or not rid: errors.append("record id missing"); continue
        if rid in seen: errors.append(f"duplicate record id: {rid}")
        seen.add(rid)
        source = record.get("source_path")
        if not isinstance(source, str) or not (ROOT / source).exists(): errors.append(f"{rid}: source missing")
        for projection in record.get("projections", []):
            if not (ROOT / projection).is_file(): errors.append(f"{rid}: projection missing: {projection}")
        classes = set(record.get("verification_classes", []))
        if not classes or not classes <= allowed: errors.append(f"{rid}: invalid verification classes")
        if "human_reviewed" in classes and record.get("learner_run_status") == "not_run": errors.append(f"{rid}: human review overclaims learner evidence")
        if record.get("run_status") == "completed_reference_run":
            required = {"executed", "asserted"}
            if not required <= classes: errors.append(f"{rid}: completed reference run needs executed and asserted")
            if not record.get("negative_fixtures"): errors.append(f"{rid}: negative fixtures missing")
            if not record.get("evidence_path"): errors.append(f"{rid}: evidence path missing")
        environment = record.get("environment", {})
        for field in ("toolchain", "platform", "network", "permissions"):
            if not isinstance(environment.get(field), str) or not environment[field]: errors.append(f"{rid}: environment.{field} missing")
        if not record.get("known_blind_spots"): errors.append(f"{rid}: blind spots missing")
    if errors:
        print("EXECUTABLE_EXAMPLES_FAILED")
        for error in errors: print(f"- {error}")
        return 1
    reference_runs = sum(record.get("run_status") == "completed_reference_run" for record in records)
    learner_runs = sum(record.get("learner_run_status") != "not_run" for record in records)
    print(f"EXECUTABLE_EXAMPLES_OK records={len(records)} classes={len(allowed)} reference_runs={reference_runs} learner_runs={learner_runs}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
