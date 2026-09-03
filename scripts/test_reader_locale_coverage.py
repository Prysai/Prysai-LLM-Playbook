"""Regression tests for the full Reader locale coverage audit."""

from __future__ import annotations

import copy
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
        self.assertEqual(report["manifest_content_count"], 104)
        timely_note = "grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02"
        self.assertEqual(
            coverage.load_manifest()["contents"][timely_note]["translation_policy"],
            "source-first",
        )
        self.assertEqual(report["not_started_counts"]["en"], 0)
        self.assertEqual(report["deferred_not_started_counts"]["en"], 0)
        for locale in report["locales"]:
            self.assertEqual(report["blocking_not_started_counts"][locale], 0)
            if locale != "en":
                self.assertEqual(report["not_started"][locale], [timely_note])
                self.assertEqual(report["deferred_not_started"][locale], [timely_note])
        self.assertTrue(
            all(
                report["status_counts"][locale].get("in-progress", 0) > 0
                for locale in report["locales"]
                if locale != "en"
            )
        )

    def test_audit_keeps_course_and_reader_counts_separate(self) -> None:
        report = coverage.audit(coverage.load_manifest())
        self.assertEqual(report["kind_counts"]["chapter"], 22)
        self.assertEqual(report["kind_counts"]["lab"], 18)
        self.assertEqual(report["kind_counts"]["skill"], 26)
        self.assertEqual(report["kind_counts"]["field-note"], 14)

    def test_not_started_course_content_remains_blocking(self) -> None:
        manifest = copy.deepcopy(coverage.load_manifest())
        content_id = "chapter-01-gpt-and-codex"
        record = manifest["contents"][content_id]["locales"]["fr"]
        record["exists"] = False
        record["translation_status"] = "not-started"

        report = coverage.audit(manifest)

        self.assertIn(content_id, report["blocking_not_started"]["fr"])
        self.assertNotIn(content_id, report["deferred_not_started"]["fr"])

    def test_undeclared_field_note_deferral_remains_blocking(self) -> None:
        manifest = copy.deepcopy(coverage.load_manifest())
        content_id = "grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02"
        del manifest["contents"][content_id]["translation_policy"]

        report = coverage.audit(manifest)

        self.assertIn(content_id, report["blocking_not_started"]["zh"])
        self.assertNotIn(content_id, report["deferred_not_started"]["zh"])


if __name__ == "__main__":
    unittest.main()
