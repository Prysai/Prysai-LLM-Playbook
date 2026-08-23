"""Audit every Reader content identity and its explicit locale state.

The course matrix covers chapters and Labs, but the public Reader also exposes
Skills, research notes, practice packs, and quality records.  This audit keeps
those two surfaces distinct.  It reports missing or not-started locale routes
without treating a generated manifest as proof of translation quality.
"""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "site/locale-manifest.js"
MARKER = "window.CODEX_LOCALE_MANIFEST ="


def load_manifest() -> dict[str, Any]:
    text = MANIFEST.read_text(encoding="utf-8")
    if MARKER not in text:
        raise ValueError("locale manifest assignment marker is missing")
    payload = text.split(MARKER, 1)[1].strip().rstrip(";")
    value = json.loads(payload)
    if not isinstance(value, dict):
        raise ValueError("locale manifest must contain an object")
    return value


def audit(manifest: dict[str, Any]) -> dict[str, Any]:
    locales = manifest.get("locales")
    contents = manifest.get("contents")
    if not isinstance(locales, dict) or not locales:
        raise ValueError("locale manifest has no locale records")
    if not isinstance(contents, dict) or not contents:
        raise ValueError("locale manifest has no Reader content identities")

    locale_tokens = list(locales)
    missing_records: list[dict[str, str]] = []
    missing_files: list[dict[str, str]] = []
    status_counts: dict[str, Counter[str]] = {
        locale: Counter() for locale in locale_tokens
    }
    kind_counts: Counter[str] = Counter()

    for content_id, content in contents.items():
        if not isinstance(content, dict):
            raise ValueError(f"content identity {content_id!r} is not an object")
        kind = str(content.get("kind", "unknown"))
        kind_counts[kind] += 1
        records = content.get("locales")
        if not isinstance(records, dict):
            raise ValueError(f"{content_id}: locale records are missing")
        for locale in locale_tokens:
            record = records.get(locale)
            if not isinstance(record, dict):
                missing_records.append({"content_id": str(content_id), "locale": locale})
                continue
            status = str(record.get("translation_status", "missing-status"))
            status_counts[locale][status] += 1
            if not record.get("exists") and status != "not-started":
                missing_files.append(
                    {"content_id": str(content_id), "locale": locale, "path": str(record.get("path", ""))}
                )

    not_started = {
        locale: [
            str(content_id)
            for content_id, content in contents.items()
            if isinstance(content, dict)
            and isinstance(content.get("locales"), dict)
            and isinstance(content["locales"].get(locale), dict)
            and content["locales"][locale].get("translation_status") == "not-started"
        ]
        for locale in locale_tokens
    }
    return {
        "schema_version": "1",
        "manifest_content_count": len(contents),
        "kind_counts": dict(sorted(kind_counts.items())),
        "locales": locale_tokens,
        "status_counts": {
            locale: dict(sorted(counts.items()))
            for locale, counts in status_counts.items()
        },
        "not_started_counts": {locale: len(items) for locale, items in not_started.items()},
        "not_started": not_started,
        "missing_locale_records": missing_records,
        "missing_files": missing_files,
        "interpretation_boundary": (
            "Manifest coverage proves an explicit route/state record only; it does not prove "
            "translation quality, native review, learner outcomes, or runtime execution."
        ),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="emit machine-readable output")
    parser.add_argument(
        "--fail-on-invalid",
        action="store_true",
        help="return non-zero when a locale record or existing route is invalid",
    )
    parser.add_argument(
        "--fail-on-not-started",
        action="store_true",
        help="return non-zero when any content identity is explicitly not-started",
    )
    args = parser.parse_args()
    try:
        report = audit(load_manifest())
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print(f"READER_LOCALE_COVERAGE_FAILED: {exc}")
        return 1

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(
            "READER_LOCALE_COVERAGE "
            f"content={report['manifest_content_count']} "
            f"locales={len(report['locales'])}"
        )
        for locale in report["locales"]:
            print(
                f"- {locale}: statuses={report['status_counts'][locale]} "
                f"not_started={report['not_started_counts'][locale]}"
            )
        if report["missing_locale_records"]:
            print(f"missing_locale_records={len(report['missing_locale_records'])}")
        if report["missing_files"]:
            print(f"missing_files={len(report['missing_files'])}")
        print(f"boundary={report['interpretation_boundary']}")

    invalid = bool(report["missing_locale_records"] or report["missing_files"])
    incomplete = any(report["not_started_counts"].values())
    if (args.fail_on_invalid and invalid) or (args.fail_on_not_started and incomplete):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
