"""Negative fixtures for the learning-path Lab-use delta contract."""

from __future__ import annotations

import copy
import json
import subprocess
import sys
from pathlib import Path
from tempfile import TemporaryDirectory


ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "docs/governance/learning-path.yaml"
VALIDATOR = ROOT / "scripts/validate_learning_path.py"


def run_fixture(document: dict, expected: str) -> None:
    with TemporaryDirectory(prefix="learning-path-lab-use-") as temporary:
        root = Path(temporary)
        contract = root / "learning-path.yaml"
        contract.write_text(json.dumps(document, ensure_ascii=False), encoding="utf-8")
        command = [sys.executable, str(VALIDATOR), "--contract", str(contract)]
        result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
        output = result.stdout + result.stderr
        if result.returncode == 0 or expected not in output:
            raise AssertionError(f"expected failing fixture containing {expected!r}; got exit={result.returncode}\n{output}")


def main() -> int:
    fixtures = 0
    try:
        source = json.loads(CONTRACT.read_text(encoding="utf-8"))

        missing_delta = copy.deepcopy(source)
        del missing_delta["levels"][0]["lab_uses"][0]["new_artifact"]
        run_fixture(missing_delta, "must contain only id, relation, first_seen")
        fixtures += 1

        wrong_first_seen = copy.deepcopy(source)
        wrong_first_seen["levels"][5]["lab_uses"][1]["first_seen"] = "L5"
        run_fixture(wrong_first_seen, "first_seen must remain L3 for lab-003")
        fixtures += 1

        repeated_delta = copy.deepcopy(source)
        first_use = repeated_delta["levels"][3]["lab_uses"][1]
        later_use = repeated_delta["levels"][5]["lab_uses"][1]
        for field in ("new_capability", "new_artifact", "new_acceptance"):
            later_use[field] = copy.deepcopy(first_use[field])
        run_fixture(repeated_delta, "must declare a distinct new_capability")
        fixtures += 1

        repeated_artifact = copy.deepcopy(source)
        repeated_artifact["levels"][5]["lab_uses"][1]["new_artifact"] = copy.deepcopy(
            repeated_artifact["levels"][3]["lab_uses"][1]["new_artifact"]
        )
        run_fixture(repeated_artifact, "must declare a distinct new_artifact")
        fixtures += 1

        repeated_acceptance = copy.deepcopy(source)
        repeated_acceptance["levels"][5]["lab_uses"][1]["new_acceptance"] = copy.deepcopy(
            repeated_acceptance["levels"][3]["lab_uses"][1]["new_acceptance"]
        )
        run_fixture(repeated_acceptance, "must declare a distinct new_acceptance")
        fixtures += 1

        missing_primary = copy.deepcopy(source)
        missing_primary["levels"][1]["lab_uses"][0]["relation"] = "supporting"
        run_fixture(missing_primary, "must contain exactly one primary relation")
        fixtures += 1
    except (AssertionError, OSError, UnicodeError, json.JSONDecodeError) as exc:
        print("LEARNING_PATH_LAB_USE_FIXTURES_FAILED")
        print(f"- {exc}")
        return 1
    print(f"LEARNING_PATH_LAB_USE_FIXTURES_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
