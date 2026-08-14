"""Read one synthetic README against the adjacent First Safe Change contract."""

from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
README = Path(__file__).with_name("README.md")
ACCEPTANCE = ROOT / "expected" / "acceptance.json"


def main() -> int:
    try:
        contract = json.loads(ACCEPTANCE.read_text(encoding="utf-8"))
        readme = README.read_text(encoding="utf-8")
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print("FIRST_SAFE_CHANGE_FAILED")
        print(f"- fixture input unavailable: {exc}")
        return 2

    checks = contract.get("required_readme_strings")
    if not isinstance(checks, dict) or not checks:
        print("FIRST_SAFE_CHANGE_FAILED")
        print("- acceptance contract has no required README strings")
        return 2

    missing = [check_id for check_id, expected in checks.items() if not isinstance(expected, str) or expected not in readme]
    if missing:
        print("FIRST_SAFE_CHANGE_FAILED")
        print("- missing: " + ", ".join(missing))
        print("- allowed_change: seed/README.md only")
        return 1

    print("FIRST_SAFE_CHANGE_OK")
    print("- checked: seed/README.md")
    print("- fixture_scope: local synthetic README strings only")
    print("- not_proved: learner completion, model behavior, real-project correctness, transfer")
    return 0


if __name__ == "__main__":
    sys.exit(main())
