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

CONTENT_STATUSES = {"candidate"}
SOURCE_HEADER = "source url and owner"
PRIVATE_SOURCE_MARKERS = ("user-provided", "private")
INTERNAL_SOURCE_MARKERS = ("prysai", "original note")
TIMELY_PROFILE = "timely-source-first"
LEGACY_PROFILE = "research-record"

IDENTITY_LABELS = (
    "content_id",
    "title",
    "canonical_path",
    "kind",
    "content_status",
    "admission_profile",
    "owner",
    "audience",
    "reader_question",
    "why_now",
    "scope_in",
    "scope_out",
    "related_stable_route",
)

SOURCE_LABELS = (
    "source_type",
    "source_record",
    "source_license_or_usage_boundary",
    "adaptation_decision",
    "personal_data_removed",
    "private_material_removed",
    "long_quotation_or_asset_reused",
    "asset_register_entry",
)

READER_PROJECTION_LABELS = (
    "locale_matrix_entry",
    "source_locale",
    "translation_policy",
    "translation_state",
    "overview_target",
    "generated_outputs",
    "entry_design",
    "rollback_projection",
)

ACTION_LABELS = (
    "low_risk_action_or_observation",
    "approval_or_external_effect_boundary",
    "failure_or_contradiction_case",
    "not_run_or_not_observed",
    "claims_forbidden",
    "next_smallest_check",
)

MAINTENANCE_LABELS = (
    "review_trigger",
    "stale_action",
    "reviewer_role",
    "validation_commands",
    "runtime_or_browser_evidence",
    "release_commit",
    "rollback_target",
    "unverified_boundary",
)

REQUIRED_LABELS = IDENTITY_LABELS + SOURCE_LABELS + READER_PROJECTION_LABELS + ACTION_LABELS + MAINTENANCE_LABELS

REQUIRED_SECTION_ORDER = (
    "the practical question",
    "why this is timely",
    "the smallest useful concept",
    "the decision a reader can make now",
    "safe reader action and limits",
    "what the evidence supports",
    "what this note does not prove",
    "failure and contradiction cases",
    "source and authorship boundary",
    "reader projection and maintenance",
)


def load_matrix(path: Path) -> dict[str, Any]:
    """Load the repository's JSON-compatible YAML governance document."""

    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("locale matrix must contain an object")
    return value


def source_first_field_notes(matrix: dict[str, Any]) -> list[dict[str, Any]]:
    """Return only explicitly opted-in field notes.

    Other content is intentionally outside this validator's scope. A timely
    admission profile is the signal that a dated field note accepts this
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
        and record.get("admission_profile") == TIMELY_PROFILE
        and record.get("translation_policy") == "source-first"
    ]


def reader_field_notes(matrix: dict[str, Any]) -> list[dict[str, Any]]:
    """Return every Reader-linked field note for explicit admission handling."""

    records = matrix.get("reader_content", [])
    if not isinstance(records, list):
        return []
    return [
        record
        for record in records
        if isinstance(record, dict) and record.get("kind") == "field-note"
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


def trailing_date(value: str) -> date | None:
    """Read the required publication date suffix from an identity value."""

    match = re.search(r"(\d{4}-\d{2}-\d{2})$", value)
    return parse_date(match.group(1)) if match else None


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


def normalized_value(value: str) -> str:
    """Remove the lightweight Markdown decoration used by record fields."""

    return re.sub(r"[`*]", "", value).strip()


def normalized_scalar(value: str | None) -> str:
    """Normalize a single-line scalar that may end with sentence punctuation."""

    return normalized_value(value or "").rstrip(".").strip()


def source_names_owner(source: str) -> bool:
    """Return whether a source cell names an owner outside its URL text."""

    without_links = re.sub(r"\[[^\]]+\]\(https://[^)]+\)", "", source)
    without_urls = re.sub(r"https://\S+", "", without_links)
    return bool(without_urls.strip(" `*_.,;:-"))


def has_meaningful_value(value: str | None) -> bool:
    if value is None:
        return False
    normalized = normalized_value(value)
    return bool(normalized and not re.fullmatch(r"<[^>]+>", normalized))


def validate_source_table(
    body: str,
    label: str,
    errors: list[str],
    note_last_reviewed: date | None = None,
    note_next_review: date | None = None,
) -> None:
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
        SOURCE_HEADER,
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
    expected_width = len(rows[0])
    source_index = next((i for i, value in enumerate(header_names) if value == SOURCE_HEADER), None)
    evidence_index = next((i for i, value in enumerate(header_names) if value == "evidence class"), None)
    status_index = next((i for i, value in enumerate(header_names) if value == "fact status"), None)
    accessed_index = next((i for i, value in enumerate(header_names) if value == "accessed"), None)
    next_review_index = next((i for i, value in enumerate(header_names) if value == "next review"), None)
    for index, row in enumerate(data_rows, start=1):
        row_label = f"{label} row {index}"
        if len(row) != expected_width:
            errors.append(f"{row_label}: column count does not match the header")
            continue
        if any(not cell for cell in row):
            errors.append(f"{row_label}: claim, source, scope, limitation, and status cells must be non-empty")
        if evidence_index is not None and row[evidence_index].strip("`").strip() not in EVIDENCE_CLASSES:
            errors.append(f"{row_label}: evidence class is not recognized")
        if status_index is not None and row[status_index].strip("`").strip() not in FACT_STATUSES:
            errors.append(f"{row_label}: fact status is not recognized")
        if source_index is not None:
            source = normalized_value(row[source_index]).casefold()
            evidence = (
                normalized_value(row[evidence_index]).casefold()
                if evidence_index is not None
                else ""
            )
            has_private_boundary = all(marker in source for marker in PRIVATE_SOURCE_MARKERS)
            has_internal_boundary = evidence == "project_inference" and all(
                marker in source for marker in INTERNAL_SOURCE_MARKERS
            )
            has_source_url = "https://" in source
            source_is_allowed = (
                has_source_url
                or (evidence == "reported_experience" and has_private_boundary)
                or has_internal_boundary
            )
            if not source_is_allowed:
                errors.append(f"{row_label}: source URL and owner must contain an https:// URL or an explicit private user-provided boundary")
            elif not source_names_owner(source):
                errors.append(f"{row_label}: source URL and owner must name the source owner")
        for header, column_index in (("accessed", accessed_index), ("next review", next_review_index)):
            if column_index is not None and parse_date(row[column_index]) is None:
                errors.append(f"{row_label}: {header} must use YYYY-MM-DD")
        if accessed_index is not None and next_review_index is not None:
            accessed = parse_date(row[accessed_index])
            review = parse_date(row[next_review_index])
            if accessed and review and review < accessed:
                errors.append(f"{row_label}: next review must not precede accessed date")
            if note_last_reviewed and accessed and accessed > note_last_reviewed:
                errors.append(
                    f"{row_label}: accessed date must not be later than note Last reviewed"
                )
            if note_next_review and review and note_next_review > review:
                errors.append(
                    f"{row_label}: note Next review must not be later than claim Next review"
                )


def validate_note(record: dict[str, Any], path: Path, text: str) -> list[str]:
    errors: list[str] = []
    label = str(record.get("content_id") or path.as_posix())

    if record.get("kind") != "field-note":
        return errors

    title = re.search(r"(?m)^#\s+(.+?)\s*$", text)
    if not title or not title.group(1).strip():
        errors.append(f"{label}: missing Markdown title")

    field_values = {field: labeled_line(text, field) for field in REQUIRED_LABELS}
    for field, value in field_values.items():
        if value is None:
            errors.append(f"{label}: missing {field}")
        elif not has_meaningful_value(value):
            errors.append(f"{label}: {field} must not be empty or a placeholder")

    content_id = normalized_value(field_values.get("content_id") or "")
    if content_id != str(record.get("content_id") or ""):
        errors.append(f"{label}: content_id must match locale matrix")
    canonical_path = normalized_value(field_values.get("canonical_path") or "").replace("\\", "/")
    if canonical_path.startswith("./"):
        canonical_path = canonical_path[2:]
    registered_path = normalized_value(str(record.get("path") or "")).replace("\\", "/")
    if registered_path.startswith("./"):
        registered_path = registered_path[2:]
    if canonical_path != registered_path:
        errors.append(f"{label}: canonical_path must match the registered field-note path")
    if not registered_path.startswith("docs/research/"):
        errors.append(f"{label}: field-note path must be under docs/research/")
    content_date = trailing_date(content_id)
    path_date = trailing_date(Path(registered_path).stem)
    if content_date is None:
        errors.append(f"{label}: content_id must end with a valid YYYY-MM-DD date")
    if path_date is None:
        errors.append(f"{label}: field-note filename must end with a valid YYYY-MM-DD date")
    if content_date and path_date and content_date != path_date:
        errors.append(f"{label}: content_id and field-note filename must use the same date")
    if normalized_value(field_values.get("kind") or "") != "field-note":
        errors.append(f"{label}: kind must be field-note")
    if normalized_value(field_values.get("content_status") or "") not in CONTENT_STATUSES:
        errors.append(f"{label}: source-first field notes must remain candidate")
    if normalized_value(field_values.get("admission_profile") or "") != TIMELY_PROFILE:
        errors.append(f"{label}: admission_profile must be {TIMELY_PROFILE}")
    if normalized_value(field_values.get("owner") or "") != normalized_value(metadata_value(text, "Owner") or ""):
        errors.append(f"{label}: identity owner must match metadata Owner")
    if title and normalized_value(field_values.get("title") or "") != title.group(1).strip():
        errors.append(f"{label}: title must match the Markdown H1")

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
        "concept": ("the smallest useful concept",),
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

    section_positions = {
        heading: index
        for index, match in enumerate(re.finditer(r"(?m)^##\s+(.+?)\s*$", text))
        for heading in (match.group(1).strip().casefold(),)
    }
    previous_position = -1
    for heading in REQUIRED_SECTION_ORDER:
        position = section_positions.get(heading)
        if position is None:
            continue
        if position < previous_position:
            errors.append(f"{label}: sections must follow the documented problem-to-maintenance order")
            break
        previous_position = position

    source_section = note_sections.get("what the evidence supports")
    if not source_section:
        errors.append(f"{label}: missing source table")
    else:
        validate_source_table(
            source_section,
            label,
            errors,
            note_last_reviewed=parsed_last,
            note_next_review=parsed_next,
        )

    source_locale = normalized_scalar(field_values.get("source_locale"))
    if source_locale != "EN":
        errors.append(f"{label}: source_locale must be EN for the source-first English brief")

    policy_line = normalized_scalar(field_values.get("translation_policy"))
    if policy_line != "source-first":
        errors.append(f"{label}: translation_policy must declare source-first")
    overview_target = normalized_scalar(field_values.get("overview_target"))
    if overview_target != "site/index.html#field-research":
        errors.append(f"{label}: overview_target must use the existing field-research surface")
    generated_outputs = normalized_value(field_values.get("generated_outputs") or "")
    for output in ("site/locale-manifest.js", "site/search-index.js"):
        if output not in generated_outputs:
            errors.append(f"{label}: generated_outputs must include {output}")
    if "scripts/validate_timely_content.py" not in text:
        errors.append(f"{label}: validation_commands must include scripts/validate_timely_content.py")
    if isinstance(record.get("content_id"), str) and record["content_id"] not in text:
        errors.append(f"{label}: locale_matrix_entry must name the content id")
    return errors


def validate_legacy_record(record: dict[str, Any], path: Path, text: str) -> list[str]:
    """Keep pre-policy research records explicit without rewriting their content."""

    errors: list[str] = []
    label = str(record.get("content_id") or path.as_posix())
    title = re.search(r"(?m)^#\s+(.+?)\s*$", text)
    if not title or not title.group(1).strip():
        errors.append(f"{label}: missing Markdown title")
    if record.get("content_status") != "candidate":
        errors.append(f"{label}: research records must remain candidate")
    if record.get("translation_policy") is not None:
        errors.append(f"{label}: research records must not use source-first translation policy")
    return errors


def validate_repository(root: Path = ROOT) -> list[str]:
    matrix_path = root / "docs/governance/locale-matrix.yaml"
    try:
        matrix = load_matrix(matrix_path)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        return [f"cannot parse {matrix_path.relative_to(root)}: {exc}"]

    errors: list[str] = []
    records = reader_field_notes(matrix)
    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    for index, record in enumerate(records, start=1):
        label = f"field-note {index}"
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
        if not normalized.startswith("docs/research/"):
            errors.append(f"{content_id}: field-note path must be under docs/research/")
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
        text = path.read_text(encoding="utf-8")
        profile = record.get("admission_profile")
        if profile == TIMELY_PROFILE:
            if record.get("translation_policy") != "source-first":
                errors.append(f"{content_id}: timely-source-first records must declare source-first translation policy")
            if record.get("content_status") != "candidate":
                errors.append(f"{content_id}: timely-source-first records must remain candidate")
            errors.extend(validate_note(record, path, text))
        elif profile == LEGACY_PROFILE:
            errors.extend(validate_legacy_record(record, path, text))
        else:
            errors.append(
                f"{content_id}: field-note must declare admission_profile "
                f"{TIMELY_PROFILE} or {LEGACY_PROFILE}"
            )
    return errors


def main() -> int:
    errors = validate_repository()
    if errors:
        print("TIMELY_CONTENT_VALIDATION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    try:
        matrix = load_matrix(MATRIX_FILE)
        records = source_first_field_notes(matrix)
        all_records = reader_field_notes(matrix)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print("TIMELY_CONTENT_VALIDATION_FAILED")
        print(f"- cannot parse {MATRIX_FILE.relative_to(ROOT)}: {exc}")
        return 1
    print(
        "TIMELY_CONTENT_VALIDATION_OK "
        f"field_notes={len(all_records)} source_first_field_notes={len(records)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
