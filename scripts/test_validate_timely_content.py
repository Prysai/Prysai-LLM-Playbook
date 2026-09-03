"""Focused fixtures for the source-first timely-content validator."""

from __future__ import annotations

import re
import tempfile
from pathlib import Path

import validate_timely_content as timely


CONTENT_ID = "grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02"
NOTE_PATH = "docs/research/fixture.md"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def fixture_matrix(policy: str = "source-first", kind: str = "field-note") -> str:
    return (
        '{\n'
        '  "schema_version": "1",\n'
        '  "reader_content": [{\n'
        f'    "content_id": "{CONTENT_ID}",\n'
        f'    "kind": "{kind}",\n'
        f'    "path": "{NOTE_PATH}",\n'
        '    "content_status": "candidate",\n'
        f'    "translation_policy": "{policy}",\n'
        '    "localized_paths": {}\n'
        '  }]\n'
        '}\n'
    )


def run_fixture(note: str, policy: str = "source-first", kind: str = "field-note") -> list[str]:
    with tempfile.TemporaryDirectory(prefix="prysai-timely-content-") as directory:
        root = Path(directory)
        matrix_path = root / "docs/governance/locale-matrix.yaml"
        note_path = root / NOTE_PATH
        matrix_path.parent.mkdir(parents=True)
        note_path.parent.mkdir(parents=True)
        matrix_path.write_text(fixture_matrix(policy, kind), encoding="utf-8")
        note_path.write_text(note, encoding="utf-8")
        return timely.validate_repository(root)


def remove_section(note: str, heading: str) -> str:
    pattern = rf"(?ms)^##\s+{re.escape(heading)}\s*$.*?(?=^##\s+|\Z)"
    return re.sub(pattern, "", note)


def remove_bullet(note: str, label: str) -> str:
    pattern = rf"(?ms)^-\s+`{re.escape(label)}`:.*?(?=^-\s+`|^##\s+|\Z)"
    return re.sub(pattern, "", note)


def main() -> int:
    note = (timely.ROOT / "docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md").read_text(encoding="utf-8")
    valid_errors = run_fixture(note)
    require(not valid_errors, f"valid source-first field note was rejected: {valid_errors}")

    cases = {
        "reader question": remove_section(note, "The practical question"),
        "why now": remove_section(note, "Why this is timely"),
        "source table": remove_section(note, "What the official sources support"),
        "fact status": note.replace(" | Fact status |", " | Status |", 1),
        "limitation": note.replace(" | Limitation |", " | Notes |", 1),
        "low-risk action": remove_section(note, "A safe first observation"),
        "failure handling": remove_section(note, "Failure and contradiction cases"),
        "next review": remove_bullet(note, "next_review").replace(
            "> **Next review:** `2026-09-09`\n", ""
        ),
        "rollback_projection": remove_bullet(note, "rollback_projection"),
    }
    for name, altered in cases.items():
        errors = run_fixture(altered)
        require(
            any(name.casefold() in error.casefold() for error in errors),
            f"missing {name} was accepted: {errors}",
        )

    require(
        not run_fixture(note, policy="reference-only"),
        "non-source-first field note was incorrectly included",
    )
    require(
        not run_fixture(note, kind="chapter"),
        "non-field-note content was incorrectly included",
    )

    print(f"TIMELY_CONTENT_TESTS_OK fixtures={len(cases) + 3}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
