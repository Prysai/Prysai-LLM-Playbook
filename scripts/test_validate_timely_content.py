"""Focused fixtures for the source-first timely-content validator."""

from __future__ import annotations

import re
import tempfile
from datetime import date
from pathlib import Path

import validate_timely_content as timely


CONTENT_ID = "grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02"
NOTE_PATH = "docs/research/fixture-2026-09-02.md"
AS_OF = date(2026, 9, 3)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def fixture_matrix(
    policy: str = "source-first",
    admission_profile: str | None = "timely-source-first",
    kind: str = "field-note",
    path: str = NOTE_PATH,
    content_status: str = "candidate",
) -> str:
    fields = [
        '    "content_id": "{CONTENT_ID}"',
        '    "kind": "{kind}"',
        '    "path": "{path}"',
        '    "content_status": "{content_status}"',
    ]
    if admission_profile is not None:
        fields.append('    "admission_profile": "{admission_profile}"')
    if policy is not None:
        fields.append('    "translation_policy": "{policy}"')
    fields.append('    "localized_paths": {{}}')
    return (
        "{\n"
        '  "schema_version": "1",\n'
        '  "reader_content": [{\n'
        + ",\n".join(fields).format(
            CONTENT_ID=CONTENT_ID,
            kind=kind,
            path=path,
            content_status=content_status,
            admission_profile=admission_profile,
            policy=policy,
        )
        + "\n  }]\n}\n"
    )


def run_fixture(
    note: str,
    policy: str = "source-first",
    admission_profile: str | None = "timely-source-first",
    kind: str = "field-note",
    path: str = NOTE_PATH,
    content_status: str = "candidate",
    fixture_path: str = NOTE_PATH,
    as_of: date = AS_OF,
) -> list[str]:
    return run_raw_matrix(
        note,
        fixture_matrix(policy, admission_profile, kind, path, content_status),
        fixture_path=fixture_path,
        as_of=as_of,
    )


def run_raw_matrix(
    note: str,
    matrix_text: str,
    fixture_path: str = NOTE_PATH,
    as_of: date = AS_OF,
) -> list[str]:
    with tempfile.TemporaryDirectory(prefix="prysai-timely-content-") as directory:
        root = Path(directory)
        matrix_path = root / "docs/governance/locale-matrix.yaml"
        note_path = root / fixture_path
        matrix_path.parent.mkdir(parents=True)
        note_path.parent.mkdir(parents=True)
        matrix_path.write_text(matrix_text, encoding="utf-8")
        note_path.write_text(
            note.replace(
                "docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md",
                fixture_path,
            ),
            encoding="utf-8",
        )
        return timely.validate_repository(root, as_of=as_of)


def remove_section(note: str, heading: str) -> str:
    pattern = rf"(?ms)^##\s+{re.escape(heading)}\s*$.*?(?=^##\s+|\Z)"
    return re.sub(pattern, "", note)


def remove_bullet(note: str, label: str) -> str:
    pattern = rf"(?ms)^-\s+`{re.escape(label)}`:.*?(?=^-\s+`|^##\s+|\Z)"
    return re.sub(pattern, "", note)


def duplicate_source_table_last_column(note: str) -> str:
    """Add a second Next review column while keeping every row rectangular."""

    pattern = r"(?ms)^(##\s+What the evidence supports\s*$)(.*?)(?=^##\s+|\Z)"

    def mutate(match: re.Match[str]) -> str:
        lines = match.group(2).splitlines()
        table_indexes = [index for index, line in enumerate(lines) if timely.table_cells(line)]
        require(len(table_indexes) >= 3, "source table fixture is unexpectedly incomplete")
        for index in table_indexes:
            cells = timely.table_cells(lines[index])
            cells.append(cells[-1])
            lines[index] = "| " + " | ".join(cells) + " |"
        return match.group(1) + "\n" + "\n".join(lines) + ("\n" if match.group(2).endswith("\n") else "")

    return re.sub(pattern, mutate, note, count=1)


def main() -> int:
    note = (timely.ROOT / "docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md").read_text(encoding="utf-8")
    valid_errors = run_fixture(note)
    require(not valid_errors, f"valid source-first field note was rejected: {valid_errors}")

    cases = {
        "reader question": remove_section(note, "The practical question"),
        "why now": remove_section(note, "Why this is timely"),
        "source table": remove_section(note, "What the evidence supports"),
        "separator row": note.replace(
            "| --- | --- | --- | --- | --- | --- | --- | --- |",
            "| Claim | Evidence class | Source URL and owner | Accessed | Applies to | Limitation | Fact status | Next review |",
            1,
        ),
        "fact status": note.replace(" | Fact status |", " | Status |", 1),
        "limitation": note.replace(" | Limitation |", " | Notes |", 1),
        "low-risk action": remove_section(note, "Safe reader action and limits"),
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

    legacy_source_heading = note.replace(
        "## What the evidence supports",
        "## What the official sources support",
        1,
    )
    require(
        any("source table" in error for error in run_fixture(legacy_source_heading)),
        "the source table's mixed evidence classes were allowed to use the misleading official-only heading",
    )

    for field in timely.REQUIRED_LABELS:
        errors = run_fixture(remove_bullet(note, field))
        require(
            any(field.casefold() in error.casefold() for error in errors),
            f"missing required field {field} was accepted: {errors}",
        )

    misordered = note.replace(
        "## The practical question",
        "## TEMPORARY PRACTICAL QUESTION",
        1,
    ).replace(
        "## Why this is timely",
        "## The practical question",
        1,
    ).replace(
        "## TEMPORARY PRACTICAL QUESTION",
        "## Why this is timely",
        1,
    )
    require(
        any("sections must follow" in error for error in run_fixture(misordered)),
        "misordered sections were accepted",
    )

    no_source_url = note.replace(
        "xAI/SpaceXAI, [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot)",
        "xAI/SpaceXAI, Introducing Grok Bot",
        1,
    )
    require(
        any("source URL and owner" in error for error in run_fixture(no_source_url)),
        "a source row without a URL was accepted",
    )
    no_source_owner = note.replace(
        "xAI/SpaceXAI, [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot)",
        "[Introducing Grok Bot](https://x.ai/news/introducing-grok-bot)",
        1,
    )
    require(
        any("source owner" in error for error in run_fixture(no_source_owner)),
        "a source row without an owner was accepted",
    )
    private_official_source = note.replace(
        "xAI/SpaceXAI, [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot)",
        "User-provided private material",
        1,
    )
    require(
        any("source URL and owner" in error for error in run_fixture(private_official_source)),
        "an official fact with only a private user source was accepted",
    )
    formatted_header = note.replace(" | Fact status |", " | **Fact status** |", 1).replace(
        " | `current` |", " | `not-a-status` |", 1
    )
    require(
        any("fact status is not recognized" in error for error in run_fixture(formatted_header)),
        "formatted fact-status header bypassed row validation",
    )
    review_date_too_old = note.replace(
        "> **Last reviewed:** `2026-09-03`",
        "> **Last reviewed:** `2026-09-02`",
        1,
    )
    require(
        any("accessed date" in error for error in run_fixture(review_date_too_old)),
        "a note reviewed before one of its claims was accepted",
    )
    claim_review_date_too_early = note.replace(
        " | 2026-09-09 |",
        " | 2026-09-08 |",
        1,
    )
    require(
        any("note Next review" in error for error in run_fixture(claim_review_date_too_early)),
        "an earlier claim review deadline than the note deadline was accepted",
    )
    duplicate_next_review = duplicate_source_table_last_column(note)
    require(
        any("headers must be unique" in error for error in run_fixture(duplicate_next_review)),
        "a duplicate Next review column was accepted and could hide the effective freshness deadline",
    )
    require(
        any(
            "current claim is due for review" in error
            for error in run_fixture(note, as_of=date(2026, 9, 9))
        ),
        "a current claim due on the as-of date was accepted",
    )
    require(
        timely.parse_as_of("2026-09-03") == AS_OF,
        "a valid --as-of date was not parsed",
    )
    try:
        timely.parse_as_of("2026-02-30")
    except Exception as exc:
        require(
            "real YYYY-MM-DD date" in str(exc),
            f"invalid --as-of date returned the wrong error: {exc}",
        )
    else:
        raise AssertionError("an invalid --as-of date was accepted")

    require(
        any("translation policy" in error for error in run_fixture(note, policy="reference-only")),
        "non-source-first field note was accepted",
    )
    require(
        any("translation policy" in error for error in run_fixture(note, policy="not-source-first")),
        "a policy containing source-first as a substring was accepted",
    )
    require(
        any("admission_profile" in error for error in run_fixture(note, admission_profile=None)),
        "field note without an admission profile was accepted",
    )
    require(
        any("reader_content must be a list" in error for error in run_raw_matrix(note, '{"reader_content": {}}\n')),
        "a locale matrix with a non-list reader_content value was accepted",
    )
    require(
        any("entries must be objects" in error for error in run_raw_matrix(note, '{"reader_content": [null]}\n')),
        "a locale matrix with a non-object reader_content entry was accepted",
    )
    require(
        not run_fixture(note, kind="chapter"),
        "non-field-note content was incorrectly included",
    )
    require(
        any("repository-relative" in error for error in run_fixture(note, path="../docs/research/fixture.md")),
        "path traversal was incorrectly accepted",
    )
    require(
        any("under docs/research" in error for error in run_fixture(note, path="docs/quality/fixture.md")),
        "a field note outside docs/research was accepted",
    )
    require(
        any(
            "same date" in error
            for error in run_fixture(
                note,
                path="docs/research/fixture-2026-09-03.md",
                fixture_path="docs/research/fixture-2026-09-03.md",
            )
        ),
        "a field note with mismatched identity dates was accepted",
    )

    for status in ("verified", "removed"):
        require(
            any("remain candidate" in error for error in run_fixture(note, content_status=status)),
            f"timely field note with {status} status was accepted",
        )

    legacy_note = "# Historical research record\n\nPre-policy research record.\n"
    require(
        not run_fixture(
            legacy_note,
            policy=None,
            admission_profile="research-record",
        ),
        "historical research record was rejected by the legacy profile",
    )
    require(
        any("must not use source-first" in error for error in run_fixture(
            legacy_note,
            policy="source-first",
            admission_profile="research-record",
        )),
        "legacy research record accepted a source-first translation policy",
    )

    print(f"TIMELY_CONTENT_TESTS_OK fixtures={len(cases) + len(timely.REQUIRED_LABELS) + 18}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
