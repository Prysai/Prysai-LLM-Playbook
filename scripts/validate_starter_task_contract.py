"""Validate the canonical copy-now prompt and its reader projections."""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "docs/governance/starter-task-contract.yaml"
MARKDOWN_TARGETS = [ROOT / "README.md", ROOT / "README-EN.md", ROOT / "book/chapters/03-task-protocol-EN.md"]
SITE_TARGET = ROOT / "site/index.html"
START = "<!-- starter-task-contract:start -->"
END = "<!-- starter-task-contract:end -->"
SITE_START = "<!-- starter-task-contract-site:start -->"
SITE_END = "<!-- starter-task-contract-site:end -->"


def load_contract(path: Path = CONTRACT) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("starter contract must contain an object")
    return value


def extract(text: str, start: str, end: str) -> str | None:
    if text.count(start) != 1 or text.count(end) != 1:
        return None
    return text.split(start, 1)[1].split(end, 1)[0]


def fenced_prompt(block: str) -> str | None:
    match = re.search(r"```text\s*\n(.*?)\n```", block, re.DOTALL)
    return match.group(1).replace("\r\n", "\n") if match else None


def validate_contract(contract: dict[str, Any], *, check_surfaces: bool = True) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if contract.get("status") != "candidate":
        errors.append("status must remain candidate until runtime and learner evidence exist")
    prompt = contract.get("prompt")
    if not isinstance(prompt, str) or not prompt.strip():
        errors.append("prompt must be a non-empty string")
        prompt = ""
    for phrase in contract.get("required_phases", []):
        if phrase not in prompt:
            errors.append(f"prompt is missing required phase: {phrase}")
    for phrase in contract.get("required_boundaries", []):
        if phrase not in prompt:
            errors.append(f"prompt is missing required boundary: {phrase}")
    if "do not edit" not in prompt or "wait for my approval" not in prompt:
        errors.append("first response must remain observation-only and approval-gated")
    if not isinstance(contract.get("evidence_boundary"), str) or "proves no action" not in contract["evidence_boundary"]:
        errors.append("evidence_boundary must reject copy/send as action evidence")
    progression = contract.get("progression")
    if not isinstance(progression, dict):
        errors.append("progression must be an object")
    else:
        for key in ("beginner_next", "practice_next", "evidence_next"):
            target = progression.get(key)
            path = target.split("#", 1)[0] if isinstance(target, str) else ""
            if not path or not (ROOT / path).is_file():
                errors.append(f"progression.{key} must name an existing reader file")
    if check_surfaces and prompt:
        for target in MARKDOWN_TARGETS:
            block = extract(target.read_text(encoding="utf-8"), START, END)
            if block is None:
                errors.append(f"{target.relative_to(ROOT)} must contain exactly one starter block")
            elif fenced_prompt(block) != prompt:
                errors.append(f"{target.relative_to(ROOT)} starter prompt differs from canonical prompt")
        site = SITE_TARGET.read_text(encoding="utf-8")
        site_block = extract(site, SITE_START, SITE_END)
        if site_block is None:
            errors.append("site/index.html must contain exactly one starter prompt block")
        else:
            match = re.search(r'<pre[^>]*data-starter-prompt[^>]*><code>(.*?)</code></pre>', site_block, re.DOTALL)
            projected = html.unescape(match.group(1)).replace("\r\n", "\n") if match else None
            if projected != prompt:
                errors.append("site/index.html starter prompt differs from canonical prompt")
            if "data-copy-starter" not in site_block or "aria-live=\"polite\"" not in site_block:
                errors.append("site starter block needs a copy control and accessible status")
        app = (ROOT / "site/app.js").read_text(encoding="utf-8")
        if "data-copy-starter" not in app or "navigator.clipboard.writeText" not in app:
            errors.append("site/app.js must implement starter prompt copying")
    return errors


def main() -> int:
    try:
        contract = load_contract()
        errors = validate_contract(contract)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        errors = [str(exc)]
    if errors:
        print("STARTER_TASK_CONTRACT_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print("STARTER_TASK_CONTRACT_OK projections=4 phases=5 boundaries=9 copy_control=present status=candidate")
    return 0


if __name__ == "__main__":
    sys.exit(main())
