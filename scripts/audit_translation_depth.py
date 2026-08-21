"""Report structural and approximate depth differences across course locales.

This is a transparency report, not a translation-quality score. Character and
heading counts can reveal a likely content gap, but they cannot establish that
two languages are semantically equivalent, culturally appropriate, reviewed,
or effective for learners.
"""

from __future__ import annotations

import json
import re
import sys
import argparse
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "docs/governance/locale-matrix.yaml"
LOCALES = ("ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")
HEADING_RE = re.compile(r"^#{2,3}\s+\S", re.MULTILINE)
TEXT_RE = re.compile(r"<!--.*?-->|```.*?```|`[^`]*`|\[[^\]]*\]\([^)]*\)", re.DOTALL)
WHITESPACE_RE = re.compile(r"\s+")


def reader_text(path: Path) -> str:
    """Remove implementation-heavy Markdown portions for a stable rough signal."""
    raw = path.read_text(encoding="utf-8")
    return WHITESPACE_RE.sub(" ", TEXT_RE.sub(" ", raw)).strip()


def heading_count(path: Path) -> int:
    raw = path.read_text(encoding="utf-8")
    without_code = re.sub(r"```.*?```", "", raw, flags=re.DOTALL)
    return len(HEADING_RE.findall(without_code))


def load_matrix() -> dict[str, Any]:
    try:
        return json.loads(MATRIX_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise SystemExit(f"TRANSLATION_DEPTH_AUDIT_FAILED matrix: {error}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", action="store_true", help="print every localized unit")
    args = parser.parse_args()
    matrix = load_matrix()
    rows: list[tuple[str, str, int, int, str, int, int, float]] = []
    errors: list[str] = []

    for item in matrix.get("content", []):
        if not isinstance(item, dict) or item.get("kind") not in {"chapter", "lab"}:
            continue
        content_id = item.get("content_id", "unknown")
        records = item.get("locales", {})
        en = records.get("EN", {}) if isinstance(records, dict) else {}
        en_path = ROOT / str(en.get("path", ""))
        if not en_path.is_file():
            errors.append(f"{content_id}: EN source is missing")
            continue
        en_text = reader_text(en_path)
        en_length = len(en_text)
        en_headings = heading_count(en_path)
        if not en_length:
            errors.append(f"{content_id}: EN source has no reader text")
            continue

        for locale in LOCALES:
            record = records.get(locale, {}) if isinstance(records, dict) else {}
            localized_path = ROOT / str(record.get("path", ""))
            if not localized_path.is_file():
                errors.append(f"{content_id}.{locale}: localized file is missing")
                continue
            localized_text = reader_text(localized_path)
            rows.append(
                (
                    str(content_id),
                    locale,
                    en_length,
                    en_headings,
                    localized_path.relative_to(ROOT).as_posix(),
                    len(localized_text),
                    heading_count(localized_path),
                    len(localized_text) / en_length,
                )
            )

    if errors:
        print("TRANSLATION_DEPTH_AUDIT_FAILED")
        print("\n".join(errors))
        return 1

    print("TRANSLATION_DEPTH_AUDIT")
    print("This is an approximate depth signal only; it is not language review or learner evidence.")
    low_depth = [
        row
        for row in rows
        if row[-1] < 0.35 or (row[3] >= 3 and row[-2] < max(2, row[3] // 3))
    ]
    print(f"TRANSLATION_DEPTH_AUDIT_OK units={len(rows)} attention_items={len(low_depth)}")
    if args.verbose:
        print("id | locale | source chars/headings | localized chars/headings | ratio | path")
        for content_id, locale, source_chars, source_headings, path, chars, headings, ratio in rows:
            print(
                f"{content_id} | {locale} | {source_chars}/{source_headings} | "
                f"{chars}/{headings} | {ratio:.2f} | {path}"
            )
    if low_depth:
        print("ATTENTION: investigate these entries; do not infer poor translation quality from this signal alone.")
        for content_id, locale, _, _, path, _, _, ratio in low_depth:
            print(f"- {content_id}.{locale} ratio={ratio:.2f} path={path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
