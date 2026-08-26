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
            [sys.executable, "-X", "utf8", "scripts/validate_textbook_entry_path.py"],
            cwd=ROOT,
            text=True,
            capture_output=True,
            encoding="utf-8",
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("TEXTBOOK_ENTRY_PATH_OK", result.stdout)

    def test_localized_start_list_rejects_a_repeated_visible_number(self) -> None:
        text = """## Empieza aquí

1. [Núcleo](core.md)
2. [Conceptos](concepts.md)
3. [Primera petición](request.md)
3. [Transferencia](transfer.md)

## Disponibilidad
"""
        errors = VALIDATOR.visible_start_number_errors(text, "ES")
        self.assertEqual(
            errors,
            ["start-list numbers must be sequential: found [1, 2, 3, 3], expected [1, 2, 3, 4]"],
        )

    def test_english_root_route_rejects_repeated_steps(self) -> None:
        text = """## Start here — read it like a book

1. [Foundation core](core.md)
2. [Concepts](concepts.md)
3. [First request](request.md)
2. [Chapter 1 again](one.md)

<details>
<summary>Other routes
"""
        self.assertEqual(
            VALIDATOR.english_root_route_number_errors(text),
            ["English root route must show steps [1, 2, 3] exactly once: found [1, 2, 3, 2]"],
        )


if __name__ == "__main__":
    unittest.main()
