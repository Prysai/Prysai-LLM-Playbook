"""Validate the canonical no-Git First Win and its public projections."""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "docs/governance/starter-task-contract.yaml"
MARKDOWN_TARGETS = [ROOT / "README.md", ROOT / "README-EN.md"]
SITE_TARGET = ROOT / "site/index.html"
START = "<!-- starter-task-contract:start -->"
END = "<!-- starter-task-contract:end -->"
SITE_START = "<!-- starter-task-contract-site:start -->"
SITE_END = "<!-- starter-task-contract-site:end -->"
REQUIRED_RECEIPT_FIELDS = {"attempted", "checked_here", "help_used", "corrected", "not_proven"}
FORBIDDEN_BEGINNER_TERMS = ("git", "file path", "absolute path", "diff", "command", "terminal")


def load_contract(path: Path = CONTRACT) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("starter contract must contain an object")
    return value


def extract(text: str, start: str, end: str) -> str | None:
    if text.count(start) != 1 or text.count(end) != 1:
        return None
    return text.split(start, 1)[1].split(end, 1)[0]


def fenced_values(block: str) -> list[str]:
    return [value.replace("\r\n", "\n") for value in re.findall(r"```text\s*\n(.*?)\n```", block, re.DOTALL)]


def validate_contract(contract: dict[str, Any], *, check_surfaces: bool = True) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "2":
        errors.append("schema_version must be '2'")
    if contract.get("status") != "candidate":
        errors.append("status must remain candidate until learner and transfer evidence exist")
    if contract.get("duration") != "15 minutes" or contract.get("platform") != "universal chat":
        errors.append("first win must remain a 15-minute universal-chat exercise")

    input_text = contract.get("input_text")
    prompt = contract.get("prompt")
    rescue = contract.get("rescue_prompt")
    if not isinstance(input_text, str) or not input_text.strip():
        errors.append("input_text must be a non-empty fictional artifact")
        input_text = ""
    if not isinstance(prompt, str) or not prompt.strip():
        errors.append("prompt must be a non-empty string")
        prompt = ""
    if input_text and input_text not in prompt:
        errors.append("prompt must embed the complete fixed input_text")
    lowered_prompt = prompt.lower()
    for term in FORBIDDEN_BEGINNER_TERMS:
        if term in lowered_prompt:
            errors.append(f"first-win prompt must not require beginner infrastructure: {term}")
    for phrase in ("Preserve every fact", "Do not invent", "Return only the revised message", "reader will check"):
        if phrase not in prompt:
            errors.append(f"prompt is missing its fact-preservation control: {phrase}")

    expected = contract.get("expected_characteristics")
    if not isinstance(expected, list) or len(expected) < 5 or any(not isinstance(item, str) or not item.strip() for item in expected):
        errors.append("expected_characteristics must contain at least five non-empty checks")
    example = contract.get("example_output")
    if not isinstance(example, str) or not example.strip() or any(term in example for term in ("PASS", "FAIL", "UNSURE")):
        errors.append("example_output must show one answer shape without pre-scoring it")
    checks = contract.get("human_checks")
    if not isinstance(checks, list) or len(checks) != 3 or any(not isinstance(item, str) or not item.strip() for item in checks):
        errors.append("human_checks must contain exactly three non-empty checks")
    elif any("PASS / FAIL / UNSURE" not in item for item in checks):
        errors.append("each human check must allow PASS / FAIL / UNSURE")
    if not isinstance(rescue, str) or "first failed or uncertain check" not in rescue or "Do not add any fact" not in rescue:
        errors.append("rescue_prompt must repair only the first failed check without adding facts")

    fields = contract.get("receipt_fields")
    if not isinstance(fields, list) or set(fields) != REQUIRED_RECEIPT_FIELDS:
        errors.append("receipt_fields must declare the five plain-language evidence fields")
    receipt = contract.get("receipt")
    if not isinstance(receipt, dict) or set(receipt) != REQUIRED_RECEIPT_FIELDS:
        errors.append("receipt must implement every declared evidence field")
    boundary = contract.get("evidence_boundary")
    if not isinstance(boundary, str) or "target, not measured" not in boundary or "does not prove learning" not in boundary or "not_run" not in boundary:
        errors.append("evidence_boundary must reject learning claims and preserve not_run status")

    progression = contract.get("progression")
    if not isinstance(progression, dict):
        errors.append("progression must be an object")
    else:
        for key in ("practice_next", "git_next", "recovery_next"):
            target = progression.get(key)
            path = target.split("#", 1)[0] if isinstance(target, str) else ""
            if not path or not (ROOT / path).is_file():
                errors.append(f"progression.{key} must name an existing reader file")

    if check_surfaces and prompt and isinstance(rescue, str):
        for target in MARKDOWN_TARGETS:
            block = extract(target.read_text(encoding="utf-8"), START, END)
            if block is None:
                errors.append(f"{target.relative_to(ROOT)} must contain exactly one starter block")
            elif fenced_values(block)[:2] != [prompt, rescue]:
                errors.append(f"{target.relative_to(ROOT)} first-win prompt or rescue differs from canonical contract")
        site = SITE_TARGET.read_text(encoding="utf-8")
        site_block = extract(site, SITE_START, SITE_END)
        if site_block is None:
            errors.append("site/index.html must contain exactly one starter block")
        else:
            projected = []
            for attribute in ("data-starter-prompt", "data-rescue-prompt"):
                match = re.search(rf'<pre[^>]*{attribute}[^>]*><code>(.*?)</code></pre>', site_block, re.DOTALL)
                projected.append(html.unescape(match.group(1)).replace("\r\n", "\n") if match else None)
            if projected != [prompt, rescue]:
                errors.append("site first-win prompt or rescue differs from canonical contract")
            for required in ("data-copy-starter", "data-copy-rescue", 'aria-live="polite"'):
                if required not in site_block:
                    errors.append(f"site starter block is missing {required}")
            if site_block.count("data-human-check") != 3:
                errors.append("site starter block must project exactly three human checks")
        app = (ROOT / "site/app.js").read_text(encoding="utf-8")
        for required in ("data-copy-starter", "data-copy-rescue", "navigator.clipboard.writeText"):
            if required not in app:
                errors.append(f"site/app.js must implement {required}")
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
    print("STARTER_TASK_CONTRACT_OK schema=2 duration=15m checks=3 rescue=present receipt=5 status=candidate")
    return 0


if __name__ == "__main__":
    sys.exit(main())
