"""Validate the governed contract for source-first timely field notes."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path, PurePosixPath
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MATRIX_FILE = ROOT / "docs/governance/locale-matrix.yaml"
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
EVIDENCE_CLASSES = {
    "official_fact",
    "reported_experience",
    "project_inference",
    "not_observed",
}
FACT_STATUSES = {
    "current",
    "stale",
    "disputed",
    "removed",
    "unverified",
    "candidate",
}

REQUIRED_LABELS = (
    "source_type",
    "source_record",
    "source_license_or_usage_boundary",
    "adaptation_decision",
    "personal_data_removed",
    "private_material_removed",
    "long_quotation_or_asset_reused",
    "asset_register_entry",
    "locale_matrix_entry",
    "source_locale",
    "translation_policy",
    "translation_state",
    "overview_target",
    "generated_outputs",
    "entry_design",
    "rollback_projection",
    "review_trigger",
    "stale_action",
    "reviewer_role",
    "validation_commands",
    "runtime_or_browser_evidence",
    "release_commit",
    "rollback_target",
    "unverified_boundary",
)


def load_matrix(path: Path) -> dict[str, Any]:
    """Load the repository's JSON-compatible YAML governance document."""

    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("locale matrix must contain an object")
    return value


def source_first_field_notes(matrix: dict[str, Any]) -> list[dict[str, Any]]:
    """Return only explicitly opted-in field notes.

    Other content is intentionally outside this validator's scope. A source-
    first policy is the admission signal that a dated field note accepts this
    stricter contract before it is exposed through the Reader.
    """

    records = matrix.get("reader_content", [])
    if not isinstance(records, list):
        return []
    return [
        record
        for record in records
        if isinstance(record, dict)
        and record.get("kind") == "field-note"
        and record.get("translation_policy") == "source-first"
    ]


def sections(text: str) -> dict[str, str]:
    matches = list(re.finditer(r"(?m)^##\s+(.+?)\s*$", text))
    result: dict[str, str] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        result[match.group(1).strip().casefold()] = text[match.end() : end].strip()
    return result


def parse_date(value: str) -> date | None:
    if not DATE_RE.fullmatch(value):
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None


def metadata_value(text: str, label: str) -> str | None:
    match = re.search(
        rf"(?m)^>\s+\*\*{re.escape(label)}:\*\*\s*`([^`]+)`",
        text,
    )
    return match.group(1).strip() if match else None


def labeled_line(text: str, label: str) -> str | None:
    match = re.search(
        rf"(?m)^-\s+`{re.escape(label)}`:\s*(\S.*)?$",
        text,
    )
    if not match:
        return None
    return (match.group(1) or "").strip()


def table_cells(line: str) -> list[str]:
    stripped = line.strip()
    if not stripped.startswith("|") or "|" not in stripped[1:]:
        return []
    return [cell.strip() for cell in stripped.strip("|").split("|")]


def normalized_header(value: str) -> str:
    """Normalize the small Markdown formatting variations allowed in headers."""

    return re.sub(r"[`*_]", "", value).strip().casefold()


def validate_source_table(body: str, label: str, errors: list[str]) -> None:
    rows = [table_cells(line) for line in body.splitlines()]
    rows = [row for row in rows if row]
    if len(rows) < 3:
        errors.append(f"{label}: source table must include a header, separator, and claim")
        return

    header_names = [normalized_header(cell) for cell in rows[0]]
    headers = set(header_names)
    required_headers = {
        "claim",
        "evidence class",
        "source owner and url",
        "accessed",
        "applies to",
        "limitation",
        "fact status",
        "next review",
    }
    missing_headers = sorted(required_headers - headers)
    if missing_headers:
        errors.append(f"{label}: source table is missing columns: {', '.join(missing_headers)}")

    data_rows = [
        row
        for row in rows[1:]
        if not all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in row)
    ]
    if not data_rows:
        errors.append(f"{label}: source table must contain at least one claim row")
        return
    if "https://" not in body:
        errors.append(f"{label}: source table must include an authoritative URL")

    expected_width = len(rows[0])
    for index, row in enumerate(data_rows, start=1):
        row_label = f"{label} row {index}"
        if len(row) != expected_width:
            errors.append(f"{row_label}: column count does not match the header")
            continue
        if any(not cell for cell in row):
            errors.append(f"{row_label}: claim, source, scope, limitation, and status cells must be non-empty")
        evidence_index = next((i for i, value in enumerate(header_names) if value == "evidence class"), None)
        if evidence_index is not None and row[evidence_index].strip("`").strip() not in EVIDENCE_CLASSES:
            errors.append(f"{row_label}: evidence class is not recognized")
        status_index = next((i for i, value in enumerate(header_names) if value == "fact status"), None)
        if status_index is not None and row[status_index].strip("`").strip() not in FACT_STATUSES:
            errors.append(f"{row_label}: fact status is not recognized")
        for header in ("accessed", "next review"):
            column_index = next((i for i, value in enumerate(header_names) if value == header), None)
            if column_index is not None and parse_date(row[column_index]) is None:
                errors.append(f"{row_label}: {header} must use YYYY-MM-DD")


def validate_note(record: dict[str, Any], path: Path, text: str) -> list[str]:
    errors: list[str] = []
    label = str(record.get("content_id") or path.as_posix())

    if record.get("kind") != "field-note":
        return errors
    if record.get("translation_policy") != "source-first":
        return errors

    title = re.search(r"(?m)^#\s+(.+?)\s*$", text)
    if not title or not title.group(1).strip():
        errors.append(f"{label}: missing Markdown title")

    content_status = metadata_value(text, "Content status")
    if content_status is None:
        errors.append(f"{label}: missing Content status")
    elif content_status not in {"candidate", "verified", "removed"}:
        errors.append(f"{label}: unsupported Content status {content_status!r}")
    elif isinstance(record.get("content_status"), str) and content_status != record["content_status"]:
        errors.append(f"{label}: Content status disagrees with locale matrix")

    fact_status = metadata_value(text, "Fact status")
    if fact_status is None:
        errors.append(f"{label}: missing Fact status")
    elif fact_status.split()[0] not in FACT_STATUSES:
        errors.append(f"{label}: unsupported Fact status {fact_status!r}")

    last_reviewed = metadata_value(text, "Last reviewed")
    next_review = metadata_value(text, "Next review")
    parsed_last = parse_date(last_reviewed or "")
    parsed_next = parse_date(next_review or "")
    if parsed_last is None:
        errors.append(f"{label}: Last reviewed must use YYYY-MM-DD")
    if parsed_next is None:
        errors.append(f"{label}: missing or invalid Next review")
    if parsed_last and parsed_next and parsed_next < parsed_last:
        errors.append(f"{label}: Next review must not precede Last reviewed")

    owner = metadata_value(text, "Owner")
    if not owner:
        errors.append(f"{label}: missing Owner")

    note_sections = sections(text)
    section_aliases = {
        "reader question": ("the practical question",),
        "why now": ("why this is timely",),
        "decision": ("the decision a reader can make now",),
        "low-risk action": ("a safe first observation", "safe reader action and limits"),
        "limits": ("what this note does not prove",),
        "failure handling": ("failure and contradiction cases",),
        "source boundary": ("source and authorship boundary",),
        "reader maintenance": ("reader projection and maintenance",),
    }
    for requirement, aliases in section_aliases.items():
        body = next((note_sections.get(alias) for alias in aliases if note_sections.get(alias)), None)
        if not body:
            errors.append(f"{label}: missing {requirement} section")
            continue
        if requirement == "reader question" and "?" not in body:
            errors.append(f"{label}: reader question section must contain a question")
        if requirement == "low-risk action":
            if not re.search(r"low-risk|reversible|read-only|safe", body, re.IGNORECASE):
                errors.append(f"{label}: low-risk action is not explicit")
            for marker in ("Goal:", "Allowed action:", "Evidence:", "Approval boundary:", "Stop condition:"):
                if marker not in body:
                    errors.append(f"{label}: low-risk action is missing {marker}")
        if requirement == "failure handling" and not re.search(
            r"stop|blocked|unavailable|contradict|unsupported|missing|does not|unverified",
            body,
            re.IGNORECASE,
        ):
            errors.append(f"{label}: failure handling must name a stop or contradiction case")

    source_section = note_sections.get("what the official sources support")
    if not source_section:
        errors.append(f"{label}: missing source table")
    else:
        validate_source_table(source_section, label, errors)

    for required_label in REQUIRED_LABELS:
        value = labeled_line(text, required_label)
        if value is None:
            errors.append(f"{label}: missing {required_label}")
        elif not value:
            errors.append(f"{label}: {required_label} must not be empty")

    policy_line = labeled_line(text, "translation_policy")
    if not policy_line or "source-first" not in policy_line:
        errors.append(f"{label}: translation_policy must declare source-first")
    if "scripts/validate_timely_content.py" not in text:
        errors.append(f"{label}: validation_commands must include scripts/validate_timely_content.py")
    if isinstance(record.get("content_id"), str) and record["content_id"] not in text:
        errors.append(f"{label}: locale_matrix_entry must name the content id")
    return errors


def validate_repository(root: Path = ROOT) -> list[str]:
    matrix_path = root / "docs/governance/locale-matrix.yaml"
    try:
        matrix = load_matrix(matrix_path)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        return [f"cannot parse {matrix_path.relative_to(root)}: {exc}"]

    errors: list[str] = []
    records = source_first_field_notes(matrix)
    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    for index, record in enumerate(records, start=1):
        label = f"source-first field-note {index}"
        content_id = record.get("content_id")
        path_text = record.get("path")
        if not isinstance(content_id, str) or not content_id.strip():
            errors.append(f"{label}: content_id must be non-empty")
            continue
        if content_id in seen_ids:
            errors.append(f"{label}: duplicate content_id {content_id}")
        seen_ids.add(content_id)
        if not isinstance(path_text, str) or not path_text.strip():
            errors.append(f"{content_id}: path must be non-empty")
            continue
        normalized = path_text.replace("\\", "/")
        if normalized.startswith("./"):
            normalized = normalized[2:]
        path_parts = PurePosixPath(normalized).parts
        if (
            not normalized
            or normalized.startswith("/")
            or re.match(r"^[A-Za-z]:", normalized)
            or ".." in path_parts
        ):
            errors.append(f"{content_id}: field-note path must be repository-relative: {path_text}")
            continue
        if normalized in seen_paths:
            errors.append(f"{content_id}: duplicate path {normalized}")
        seen_paths.add(normalized)
        path = root / normalized
        try:
            path.resolve().relative_to(root.resolve())
        except ValueError:
            errors.append(f"{content_id}: field-note path must stay inside the repository: {normalized}")
            continue
        if not path.is_file():
            errors.append(f"{content_id}: field-note path does not exist: {normalized}")
            continue
        errors.extend(validate_note(record, path, path.read_text(encoding="utf-8")))
    return errors


def main() -> int:
    errors = validate_repository()
    if errors:
        print("TIMELY_CONTENT_VALIDATION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    try:
        records = source_first_field_notes(load_matrix(MATRIX_FILE))
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print("TIMELY_CONTENT_VALIDATION_FAILED")
        print(f"- cannot parse {MATRIX_FILE.relative_to(ROOT)}: {exc}")
        return 1
    print(f"TIMELY_CONTENT_VALIDATION_OK source_first_field_notes={len(records)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
