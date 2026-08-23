"""Audit every governed reader content unit across every registered locale.

This is a release-readiness signal, not a translation-quality score.  It keeps
the distinction between a file that exists, a starter-card subset, and a
reviewed full translation visible.  Reader aliases are reported separately
because their local projection may intentionally point at another canonical
content unit.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MATRIX = ROOT / "docs/governance/locale-matrix.yaml"
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")
IDENTITY = re.compile(
    r"<!--\s*content_id:\s*([^|\s]+)\s*\|\s*locale:\s*([A-Z]{2,4})\s*"
    r"\|\s*language:\s*([^|\s]+)",
    re.IGNORECASE,
)
ANCHOR = re.compile(r'<(?:a|span)\s+id="([a-z][a-z0-9-]*)"', re.IGNORECASE)
REQUIRED_COMMUNICATION_ANCHORS = {
    "practice-route-chooser",
    "request-escalation",
    "first-practice-intake",
    "four-line-safety-card",
    "share-check",
    "public-interest-safety-route",
    "language-practice-route",
    "general-skill-practice-route",
    "bounded-research-route",
    "source-check-route",
    "recovery-route",
    "card-e1-user-declared-continuity-receipt",
}


def load_matrix() -> dict[str, Any]:
    value = json.loads(MATRIX.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("locale matrix must be an object")
    return value


def normalize(path: str) -> str:
    return path.replace("\\", "/").lstrip("./")


def file_record(path_text: str, content_id: str, locale: str, *, check_identity: bool = True) -> dict[str, Any]:
    path = normalize(path_text)
    source = ROOT / path
    result: dict[str, Any] = {
        "path": path,
        "exists": source.is_file(),
        "content_id": content_id,
        "locale": locale,
        "identity_ok": False,
        "anchors": [],
        "duplicate_anchors": [],
        "embedded_navigation": False,
        "lines": 0,
        "chars": 0,
    }
    if not source.is_file():
        return result
    text = source.read_text(encoding="utf-8")
    result["lines"] = len(text.splitlines())
    result["chars"] = len(text)
    match = IDENTITY.search(text)
    # README/preface records are public entry documents and intentionally use
    # their own front-matter identity.  Course units and supplemental guides
    # carry the governed content_id marker and are checked strictly.
    result["identity_ok"] = not check_identity or bool(match and match.group(1) == content_id and match.group(2).upper() == locale)
    authored_anchors = ANCHOR.findall(text)
    result["anchors"] = sorted(set(authored_anchors))
    result["duplicate_anchors"] = sorted(anchor for anchor, count in Counter(authored_anchors).items() if count > 1)
    result["embedded_navigation"] = "<!-- chapter-navigation:start -->" in text or "<!-- lab-navigation:start -->" in text
    return result


def audit() -> dict[str, Any]:
    matrix = load_matrix()
    locale_records = matrix.get("locales", {})
    if set(locale_records) != set(LOCALES):
        raise ValueError("locale matrix does not declare exactly the eight supported locales")

    units: list[dict[str, Any]] = []
    issues: list[dict[str, Any]] = []
    for item in matrix.get("content", []):
        content_id = str(item["content_id"])
        unit = {"content_id": content_id, "kind": item.get("kind"), "locales": {}}
        for locale in LOCALES:
            declared = item.get("locales", {}).get(locale, {})
            if not isinstance(declared, dict):
                declared = {}
            record = file_record(
                str(declared.get("path", "")),
                content_id,
                locale,
                check_identity=item.get("kind") not in {"project-entry", "book-entry", "book-preface"},
            )
            record.update(
                {
                    "coverage": declared.get("coverage"),
                    "content_status": declared.get("content_status"),
                    "translation_status": declared.get("translation_status"),
                    "source_revision": declared.get("source_revision"),
                }
            )
            unit["locales"][locale] = record
            if not record["exists"]:
                issues.append({"content_id": content_id, "locale": locale, "kind": "missing-file", "path": record["path"]})
            elif not record["identity_ok"]:
                issues.append({"content_id": content_id, "locale": locale, "kind": "identity-mismatch", "path": record["path"]})
            if record["duplicate_anchors"]:
                issues.append(
                    {
                        "content_id": content_id,
                        "locale": locale,
                        "kind": "duplicate-authored-anchor",
                        "duplicates": record["duplicate_anchors"],
                        "path": record["path"],
                    }
                )
            if locale != "EN" and record["coverage"] != "full":
                issues.append(
                    {
                        "content_id": content_id,
                        "locale": locale,
                        "kind": "incomplete-coverage",
                        "coverage": record["coverage"],
                        "path": record["path"],
                    }
                )
            if content_id == "communication-clinic" and locale != "EN":
                missing_anchors = sorted(REQUIRED_COMMUNICATION_ANCHORS - set(record["anchors"]))
                if missing_anchors:
                    issues.append(
                        {
                            "content_id": content_id,
                            "locale": locale,
                            "kind": "missing-required-anchor",
                            "missing": missing_anchors,
                            "path": record["path"],
                        }
                    )
        units.append(unit)

    aliases: list[dict[str, Any]] = []
    for item in matrix.get("reader_content", []):
        content_id = str(item["content_id"])
        alias = {"content_id": content_id, "kind": item.get("kind"), "source_path": normalize(str(item.get("path", ""))), "locales": {}}
        paths = item.get("localized_paths", {})
        # Neutral research/governance records deliberately have no localized
        # reader projection.  They are not missing seven translations; only
        # aliases with an explicit localized_paths map participate here.
        has_projection = isinstance(paths, dict) and bool(paths)
        for locale in LOCALES:
            path = alias["source_path"] if locale == "EN" else normalize(str(paths.get(locale, ""))) if has_projection else ""
            record = file_record(path, content_id, locale, check_identity=False)
            record["projected_from"] = alias["source_path"] if locale != "EN" and path else None
            alias["locales"][locale] = record
            if has_projection and not record["exists"]:
                issues.append({"content_id": content_id, "locale": locale, "kind": "missing-reader-alias", "path": path})
        aliases.append(alias)

    summary = {
        locale: {
            "content_units": len(units),
            "full": sum(1 for unit in units if unit["locales"][locale]["coverage"] == "full"),
            "partial_or_subset": sum(1 for unit in units if unit["locales"][locale]["coverage"] not in {"full", None}),
            "missing": sum(1 for unit in units if not unit["locales"][locale]["exists"]),
            "aliases_present": sum(1 for alias in aliases if alias["locales"][locale]["exists"]),
        }
        for locale in LOCALES
    }
    return {
        "scope": "56 locale-matrix content units plus 21 reader aliases",
        "claim_boundary": "path, identity, declared coverage, status and authored anchors only; not translation quality or learner evidence",
        "locales": list(LOCALES),
        "summary": summary,
        "units": units,
        "reader_aliases": aliases,
        "issues": issues,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true", help="emit the complete audit as JSON")
    parser.add_argument("--fail-on-incomplete", action="store_true", help="return non-zero when any file or declared full coverage is incomplete")
    args = parser.parse_args()
    try:
        result = audit()
    except (OSError, UnicodeError, json.JSONDecodeError, KeyError, TypeError, ValueError) as exc:
        print(f"LOCALE_CONTENT_MATRIX_AUDIT_FAILED: {exc}")
        return 1
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print("LOCALE_CONTENT_MATRIX_AUDIT")
        print(result["scope"])
        print(result["claim_boundary"])
        for locale, summary in result["summary"].items():
            print(f"{locale}: full={summary['full']}/{summary['content_units']} subset_or_partial={summary['partial_or_subset']} missing={summary['missing']} aliases={summary['aliases_present']}")
        print(f"issues={len(result['issues'])}")
        for issue in result["issues"]:
            print("- " + json.dumps(issue, ensure_ascii=False, sort_keys=True))
    if args.fail_on_incomplete and result["issues"]:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
