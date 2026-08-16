"""Standard-library discovery test for the reader-entry textbook contract."""

from __future__ import annotations

import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


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


if __name__ == "__main__":
    unittest.main()
