"""Discovery entry point for the seven-locale foundation-route contract."""

from __future__ import annotations

import importlib.util
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "scripts" / "validate_foundation_route_structure.py"
SPEC = importlib.util.spec_from_file_location("validate_foundation_route_structure", MODULE_PATH)
assert SPEC and SPEC.loader
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


class FoundationRouteStructureTests(unittest.TestCase):
    def test_all_localized_routes_match_the_foundation_sequence(self) -> None:
        result = subprocess.run(
            [sys.executable, "scripts/validate_foundation_route_structure.py"],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("FOUNDATION_ROUTE_STRUCTURE_OK", result.stdout)

    def test_rejects_an_extra_off_route_section(self) -> None:
        text = "\n".join(
            [
                "## One",
                "## Two",
                "## Three",
                "## Four",
                "## Unrelated detour",
                "../chapters/03-task-protocol-ES.md#core-task-contract",
                "../chapters/09-verification-and-recovery-ES.md#core-evidence-recovery",
                "../chapters/10-planning-and-slicing-ES.md#core-evidence-bearing-slice",
                "../chapters/13-action-boundaries-ES.md#core-action-boundary",
            ]
        )
        self.assertEqual(
            VALIDATOR.route_errors(text, "ES"),
            ["expected four second-level sections, found 5"],
        )


if __name__ == "__main__":
    unittest.main()
