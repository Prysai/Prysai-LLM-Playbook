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
FORBIDDEN_BEGINNER_TERMS = ("git", "file path", "absolute path", "diff", "command", "terminal")
LIVE_COPY_GUARD_MARKER = "// Final naming guard for the public no-setup exercise."
STALE_DURATION_PATTERNS = (
    "15-minute",
    "15 minutes",
    "fifteen-minute",
    "fifteen minutes",
    "15 minutos",
    "quince minutos",
    "quinze",
    "15分",
    "15분",
    "15 Minuten",
    "fünfzehn",
    "十五分钟",
    "15分钟",
    "15 分钟",
)


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
    if contract.get("schema_version") != "4":
        errors.append("schema_version must be '4'")
    if contract.get("status") != "candidate":
        errors.append("status must remain candidate until learner and transfer evidence exist")
    if contract.get("duration") != "5 minutes" or contract.get("platform") != "universal chat":
        errors.append("first prompt practice must remain a five-minute universal-chat exercise")

    input_text = contract.get("input_text")
    prompt = contract.get("prompt")
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
    for phrase in ("Keep every fact exactly the same", "Do not add", "Return only the rewritten message"):
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
    teaching_point = contract.get("teaching_point")
    if not isinstance(teaching_point, str) or "missing details" not in teaching_point:
        errors.append("teaching_point must explain why the exercise demonstrates an LLM limit")
    boundary = contract.get("evidence_boundary")
    if not isinstance(boundary, str) or "does not prove learning" not in boundary or "not_run" not in boundary:
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

    if check_surfaces and prompt:
        for target in MARKDOWN_TARGETS:
            block = extract(target.read_text(encoding="utf-8"), START, END)
            if block is None:
                errors.append(f"{target.relative_to(ROOT)} must contain exactly one starter block")
            elif fenced_values(block)[:1] != [prompt]:
                errors.append(f"{target.relative_to(ROOT)} first-prompt practice differs from canonical contract")
        site = SITE_TARGET.read_text(encoding="utf-8")
        site_block = extract(site, SITE_START, SITE_END)
        if site_block is None:
            errors.append("site/index.html must contain exactly one starter block")
        else:
            match = re.search(r'<pre[^>]*data-starter-prompt[^>]*>\s*<code[^>]*>(.*?)</code>\s*</pre>', site_block, re.DOTALL)
            projected = html.unescape(match.group(1)).replace("\r\n", "\n") if match else None
            if projected != prompt:
                errors.append("site first-prompt practice differs from canonical contract")
            for required in ("data-copy-starter", 'aria-live="polite"'):
                if required not in site_block:
                    errors.append(f"site starter block is missing {required}")
            if site_block.count("data-human-check") != 3:
                errors.append("site starter block must project exactly three human checks")
            for forbidden in ("data-first-win-check", "data-first-win-receipt", "data-copy-rescue"):
                if forbidden in site_block:
                    errors.append(f"site starter block must not expose a lab-style record: {forbidden}")
        app = (ROOT / "site/app.js").read_text(encoding="utf-8")
        for required in ("data-copy-starter", "navigator.clipboard.writeText", "starterCopied", "starterCopyFailed"):
            if required not in app:
                errors.append(f"site/app.js must implement {required}")
        for forbidden in ("renderFirstWinRecord", "judgment_state:", "first_nonpass"):
            if forbidden in app:
                errors.append(f"site/app.js must not implement a machine-style self-record: {forbidden}")
        if LIVE_COPY_GUARD_MARKER not in app:
            errors.append("site/app.js must contain the five-minute live-copy guard")
        else:
            live_copy = app.split(LIVE_COPY_GUARD_MARKER, 1)[1].split("initializeSearch();", 1)[0]
            required_live_copy = (
                "Five-minute prompt practice",
                "5 分钟提示词练习",
                "Práctica de prompt de cinco minutos",
                "5分間のプロンプト練習",
                "5분 프롬프트 연습",
                "Fünf-Minuten-Prompt-Übung",
                "5 分鐘提示詞練習",
                "Pratique de prompt en cinq minutes",
            )
            for phrase in required_live_copy:
                if phrase not in live_copy:
                    errors.append(f"site/app.js live-copy guard is missing: {phrase}")
            for phrase in ("15-minute", "15 minutos", "15分", "15분", "15 Minuten"):
                if phrase in live_copy:
                    errors.append(f"site/app.js live-copy guard still exposes the old duration: {phrase}")
        for phrase in STALE_DURATION_PATTERNS:
            if phrase.casefold() in app.casefold():
                errors.append(f"site/app.js contains a stale public-practice duration: {phrase}")
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
    print("STARTER_TASK_CONTRACT_OK schema=4 duration=5m checks=3 purpose=llm-limit status=candidate")
    return 0


if __name__ == "__main__":
    sys.exit(main())
