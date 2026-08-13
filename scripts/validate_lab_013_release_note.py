"""Validate the frozen Lab 013 release-note artifact."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--product-root", required=True)
    parser.add_argument("--fixture", default="examples/lab-013-v1")
    args = parser.parse_args()
    fixture = Path(args.fixture).resolve()
    product = Path(args.product_root).resolve()
    target = product / "release-notes" / "next.md"
    errors: list[str] = []
    try:
        ledger = json.loads((fixture / "inputs/shipped-changes.json").read_text(encoding="utf-8"))
        schema = json.loads((fixture / "inputs/release-note.schema.json").read_text(encoding="utf-8"))
        text = target.read_text(encoding="utf-8")
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print("LAB_013_RELEASE_NOTE_FAILED")
        print(f"- input error: {exc}")
        return 2
    for heading in schema["required_headings"]:
        if text.count(heading) != 1:
            errors.append(f"heading must appear once: {heading}")
    for phrase in schema["required_phrases"]:
        if phrase not in text:
            errors.append(f"missing required phrase: {phrase}")
    for phrase in schema["forbidden_phrases"]:
        if phrase.lower() in text.lower():
            errors.append(f"forbidden phrase: {phrase}")
    for change in ledger["changes"]:
        if change["id"] not in text:
            errors.append(f"missing change id: {change['id']}")
        if change["summary"] not in text:
            errors.append(f"missing ledger summary: {change['id']}")
        if change["evidence"] not in text:
            errors.append(f"missing evidence id: {change['evidence']}")
    if errors:
        print("LAB_013_RELEASE_NOTE_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("LAB_013_RELEASE_NOTE_OK changes=2 publication=not_run")
    return 0


if __name__ == "__main__":
    sys.exit(main())
