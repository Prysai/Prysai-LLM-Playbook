#!/usr/bin/env python3
"""Validate the skill's local references and forward-case specification."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
CASES = ROOT / "tests" / "forward_cases.json"

ALLOWED_MODES = {"rewrite", "keep", "audit", "provenance"}
REQUIRED_FIELDS = {
    "id",
    "locale",
    "surface",
    "mode",
    "focus",
    "input",
    "recommended_revision",
    "must_preserve",
    "must_remove",
    "must_not_introduce",
    "rationale",
}
REQUIRED_FOCUS = {
    "taiwan_locale",
    "semantics",
    "protected_content",
    "false_positive",
    "surface_fit",
    "punctuation",
    "markup",
    "prompt_boundary",
    "long_form",
    "provenance",
    "snapshot",
    "experiment",
    "decision_boundary",
}
REQUIRED_LOCALE_HEADINGS = {
    "## 何時套用",
    "## 編輯順序",
    "## 字形與標點",
    "## 地區詞彙",
    "## 場景與語氣",
    "## 誤判防護",
    "## 交付前檢查",
}
REQUIRED_PROVENANCE_URLS = {
    "https://deepmind.google/models/synthid/",
    "https://github.com/google-deepmind/synthid-text",
    "https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification",
    "https://docs.sigstore.dev/cosign/signing/signing_with_blobs/",
}


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def validate_frontmatter(text: str, errors: list[str]) -> None:
    if not text.startswith("---\n"):
        fail("SKILL.md must begin with YAML frontmatter", errors)
        return
    try:
        frontmatter = text.split("---\n", 2)[1]
    except IndexError:
        fail("SKILL.md frontmatter is not closed", errors)
        return
    keys = {
        line.split(":", 1)[0].strip()
        for line in frontmatter.splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    }
    if keys != {"name", "description"}:
        fail(f"SKILL.md frontmatter keys are {sorted(keys)}, expected name and description", errors)


def validate_local_links(errors: list[str]) -> None:
    link_pattern = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
    for document in ROOT.rglob("*.md"):
        text = document.read_text(encoding="utf-8")
        for target in link_pattern.findall(text):
            if target.startswith(("http://", "https://", "#")):
                continue
            path_text = target.split("#", 1)[0]
            resolved = (document.parent / path_text).resolve()
            if not resolved.exists():
                fail(f"{document.relative_to(ROOT)} links to missing {target}", errors)


def validate_locale_pack(errors: list[str]) -> None:
    path = ROOT / "references" / "locales" / "zh-Hant-TW.md"
    if not path.exists():
        fail("missing references/locales/zh-Hant-TW.md", errors)
        return
    text = path.read_text(encoding="utf-8")
    missing = sorted(REQUIRED_LOCALE_HEADINGS - set(text.splitlines()))
    if missing:
        fail(f"zh-Hant-TW locale pack is missing headings: {missing}", errors)
    if text.count("|") < 40:
        fail("zh-Hant-TW terminology table is unexpectedly small", errors)


def validate_provenance(errors: list[str]) -> None:
    path = ROOT / "references" / "provenance.md"
    if not path.exists():
        fail("missing references/provenance.md", errors)
        return
    text = path.read_text(encoding="utf-8")
    normalized = " ".join(text.split())
    for url in sorted(REQUIRED_PROVENANCE_URLS):
        if url not in text:
            fail(f"provenance.md is missing primary reference {url}", errors)
    required_boundaries = [
        "not an arbitrary text payload",
        "never as an authentication system",
        "does not prove that the prose was written without tools",
    ]
    for phrase in required_boundaries:
        if phrase not in normalized:
            fail(f"provenance.md is missing boundary statement: {phrase}", errors)


def validate_cases(errors: list[str]) -> tuple[int, int, int]:
    try:
        payload = json.loads(CASES.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"cannot load forward cases: {exc}", errors)
        return 0, 0, 0

    if payload.get("version") != 1:
        fail("forward case version must be 1", errors)
    cases = payload.get("cases")
    if not isinstance(cases, list):
        fail("forward cases must be a list", errors)
        return 0, 0, 0
    if len(cases) < 24:
        fail(f"expected at least 24 forward cases, found {len(cases)}", errors)

    ids: set[str] = set()
    focus_seen: set[str] = set()
    keep_count = 0
    change_count = 0
    taiwan_count = 0
    long_count = 0

    for index, case in enumerate(cases):
        label = case.get("id", f"case[{index}]") if isinstance(case, dict) else f"case[{index}]"
        if not isinstance(case, dict):
            fail(f"{label} must be an object", errors)
            continue
        missing = REQUIRED_FIELDS - case.keys()
        if missing:
            fail(f"{label} missing fields: {sorted(missing)}", errors)
            continue
        if label in ids:
            fail(f"duplicate case id: {label}", errors)
        ids.add(label)
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", label):
            fail(f"invalid case id: {label}", errors)

        mode = case["mode"]
        if mode not in ALLOWED_MODES:
            fail(f"{label} has unsupported mode {mode}", errors)
        if mode == "keep":
            keep_count += 1
            if case["recommended_revision"] != case["input"]:
                fail(f"{label} is keep mode but changes the input", errors)
        else:
            change_count += 1

        if case["locale"] == "zh-Hant-TW":
            taiwan_count += 1
        if "long_form" in case["focus"]:
            long_count += 1
            if len(case["input"]) < 300:
                fail(f"{label} long-form input is too short", errors)

        if not isinstance(case["focus"], list) or not case["focus"]:
            fail(f"{label} focus must be a non-empty list", errors)
            continue
        focus_seen.update(case["focus"])

        for field in ("must_preserve", "must_remove", "must_not_introduce"):
            if not isinstance(case[field], list) or not all(isinstance(x, str) and x for x in case[field]):
                fail(f"{label} {field} must be a list of non-empty strings", errors)

        source = case["input"]
        result = case["recommended_revision"]
        for token in case["must_preserve"]:
            if token not in source:
                fail(f"{label} preserve token absent from input: {token!r}", errors)
            if token not in result:
                fail(f"{label} preserve token absent from recommendation: {token!r}", errors)
        for token in case["must_remove"]:
            if token not in source:
                fail(f"{label} removal token absent from input: {token!r}", errors)
            if token in result:
                fail(f"{label} removal token remains in recommendation: {token!r}", errors)
        for token in case["must_not_introduce"]:
            if token in result:
                fail(f"{label} prohibited drift appears in recommendation: {token!r}", errors)

    missing_focus = sorted(REQUIRED_FOCUS - focus_seen)
    if missing_focus:
        fail(f"forward cases do not cover focus areas: {missing_focus}", errors)
    if keep_count < 8:
        fail(f"expected at least 8 keep cases, found {keep_count}", errors)
    if change_count < 12:
        fail(f"expected at least 12 change/advice cases, found {change_count}", errors)
    if taiwan_count < 20:
        fail(f"expected at least 20 zh-Hant-TW cases, found {taiwan_count}", errors)
    if long_count < 1:
        fail("expected at least one long-form case", errors)

    return len(cases), keep_count, change_count


def main() -> int:
    errors: list[str] = []
    skill_text = SKILL.read_text(encoding="utf-8")
    validate_frontmatter(skill_text, errors)
    if len(skill_text.splitlines()) > 500:
        fail("SKILL.md exceeds 500 lines", errors)
    validate_local_links(errors)
    validate_locale_pack(errors)
    validate_provenance(errors)
    total, keep_count, change_count = validate_cases(errors)

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Validation passed: "
        f"{total} forward cases ({keep_count} keep, {change_count} change/advice), "
        "zh-Hant-TW locale pack, provenance boundaries, and local links."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
