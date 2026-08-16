"""Standard-library discovery test for the reader-entry textbook contract."""

from __future__ import annotations

import subprocess
import sys
import unittest
import importlib.util
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "scripts" / "validate_textbook_entry_path.py"
SPEC = importlib.util.spec_from_file_location("validate_textbook_entry_path", MODULE_PATH)
assert SPEC and SPEC.loader
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


class TextbookEntryPathTests(unittest.TestCase):
    def test_all_locale_entries_keep_the_textbook_path(self) -> None:
        result = subprocess.run(
            [sys.executable, "scripts/validate_textbook_entry_path.py"],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("TEXTBOOK_ENTRY_PATH_OK", result.stdout)

    def test_localized_start_list_rejects_a_repeated_visible_number(self) -> None:
        text = """## Empieza aquí

1. [Lección 0](lesson.md)
2. [Capítulo 1](one.md)
3. [Capítulo 2](two.md)
3. [Capítulo 3](three.md)

## Disponibilidad
"""
        errors = VALIDATOR.visible_start_number_errors(text, "ES")
        self.assertEqual(
            errors,
            ["start-list numbers must be sequential: found [1, 2, 3, 3], expected [1, 2, 3, 4]"],
        )


if __name__ == "__main__":
    unittest.main()
