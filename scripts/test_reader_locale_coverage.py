"""Regression tests for the full Reader locale coverage audit."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import audit_reader_locale_coverage as coverage  # noqa: E402


class ReaderLocaleCoverageTests(unittest.TestCase):
    def test_current_manifest_has_explicit_records_for_every_locale(self) -> None:
        report = coverage.audit(coverage.load_manifest())
        self.assertEqual(report["missing_locale_records"], [])
        self.assertEqual(report["missing_files"], [])
        self.assertEqual(report["manifest_content_count"], 103)
        self.assertEqual(report["not_started_counts"]["en"], 0)
        self.assertGreater(report["not_started_counts"]["zh"], 0)

    def test_audit_keeps_course_and_reader_counts_separate(self) -> None:
        report = coverage.audit(coverage.load_manifest())
        self.assertEqual(report["kind_counts"]["chapter"], 22)
        self.assertEqual(report["kind_counts"]["lab"], 18)
        self.assertEqual(report["kind_counts"]["skill"], 26)
        self.assertEqual(report["kind_counts"]["field-note"], 13)


if __name__ == "__main__":
    unittest.main()
