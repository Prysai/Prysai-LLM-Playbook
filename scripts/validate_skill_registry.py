"""Validate the canonical Skill provenance registry and its projections."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
REGISTRY_PATH = Path("docs/governance/skill-registry.yaml")
STATUS_PATH = Path("docs/governance/content-status.yaml")
ASSET_PATH = Path("docs/sources/asset-register.md")
HUMAN_PATH = Path("docs/skill-registry.md")
ROUTING_PATH = Path("docs/governance/skill-routing-contract.yaml")
ROUTING_MATRIX_PATH = Path("docs/quality/skill-routing-matrix.md")
FRONTDOOR_SKILL_COUNT_PATTERNS = {
    "README.md": re.compile(
        r"\|\s*Skills\s*\|\s*(?P<count>\d+)\s+project-owned\s+`candidate`\s+Skills\s*\|"
    ),
    "README-EN.md": re.compile(
        r"\|\s*Skills\s*\|\s*(?P<count>\d+)\s+project\s+Skills\s+·\s+`candidate`\s*\|"
    ),
}
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
SOURCE_ID_RE = re.compile(r"^S\d+$")
MAINTENANCE_RE = re.compile(r"(?ms)^## Maintenance record\s*$\n(.*?)(?=^## |\Z)")


def load_object(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path} must contain an object")
    return value


def parse_maintenance(text: str) -> dict[str, str]:
    match = MAINTENANCE_RE.search(text)
    if not match:
        return {}
    values: dict[str, str] = {}
    current = ""
    for line in match.group(1).splitlines():
        item = re.match(r"^- `([^`]+)`:\s*(.*)$", line)
        if item:
            current = item.group(1)
            values[current] = item.group(2).strip().strip("`")
        elif current and line.startswith("  "):
            values[current] += " " + line.strip()
    return values


def parse_frontmatter_name(text: str) -> str:
    match = re.search(r"(?m)^name:\s*([^\r\n]+)$", text)
    return match.group(1).strip().strip("'\"") if match else ""


def parse_display_name(text: str) -> str:
    match = re.search(r"(?m)^\s*display_name:\s*['\"]?([^'\"\r\n]+)", text)
    return match.group(1).strip() if match else ""


def normalize_visible_value(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "").replace("`", "")).strip()


def asset_ids(text: str) -> set[str]:
    return set(re.findall(r"(?m)^\| (S\d+) \|", text))


def frontdoor_skill_count_errors(
    expected_count: int, documents: dict[str, str]
) -> list[str]:
    errors: list[str] = []
    for path, pattern in FRONTDOOR_SKILL_COUNT_PATTERNS.items():
        text = documents.get(path, "")
        match = pattern.search(text)
        if not match:
            errors.append(f"{path}: missing current project Skill count reference")
        elif int(match.group("count")) != expected_count:
            errors.append(
                f"{path}: project Skill count must be {expected_count}, "
                f"not {match.group('count')}"
            )
    return errors


def validate(root: Path, registry: dict[str, Any] | None = None) -> list[str]:
    errors: list[str] = []
    registry = registry or load_object(root / REGISTRY_PATH)
    if registry.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    for key in ("owner", "reviewed_at", "next_review"):
        if not isinstance(registry.get(key), str) or not registry[key].strip():
            errors.append(f"{key} must be a non-empty string")
    for key in ("reviewed_at", "next_review"):
        try:
            date.fromisoformat(str(registry.get(key, "")))
        except ValueError:
            errors.append(f"{key} must be an ISO date")
    statuses = registry.get("status_vocabulary")
    if statuses != ["draft", "candidate", "verified", "production-ready"]:
        errors.append("status_vocabulary must use the project maturity order")

    records = registry.get("records")
    if not isinstance(records, list) or not records:
        return errors + ["records must be a non-empty list"]
    status = load_object(root / STATUS_PATH)
    status_items = status.get("skills", {}).get("items", [])
    status_map = {item.get("id"): item for item in status_items if isinstance(item, dict)}
    directories = {path.parent.name for path in (root / "skills").glob("*/SKILL.md")}
    sources = asset_ids((root / ASSET_PATH).read_text(encoding="utf-8"))
    seen: dict[str, set[str]] = {key: set() for key in ("id", "path", "public_name")}

    for index, record in enumerate(records, start=1):
        label = f"records[{index}]"
        if not isinstance(record, dict):
            errors.append(f"{label} must be an object")
            continue
        for key in ("id", "path", "public_name", "purpose", "learning_path", "source_summary", "owner", "version", "review_date", "status", "primary_validation"):
            if not isinstance(record.get(key), str) or not record[key].strip():
                errors.append(f"{label}.{key} must be a non-empty string")
        skill_id = record.get("id", "")
        for key in seen:
            value = record.get(key)
            if isinstance(value, str):
                if value in seen[key]:
                    errors.append(f"duplicate {key}: {value}")
                seen[key].add(value)
        if not isinstance(skill_id, str) or not ID_RE.fullmatch(skill_id):
            errors.append(f"{label}.id must be kebab-case")
        if record.get("path") != f"skills/{skill_id}":
            errors.append(f"{skill_id}: path must equal skills/<id>")
        if not SEMVER_RE.fullmatch(str(record.get("version", ""))):
            errors.append(f"{skill_id}: version must be SemVer")
        try:
            date.fromisoformat(str(record.get("review_date", "")))
        except ValueError:
            errors.append(f"{skill_id}: review_date must be an ISO date")
        if record.get("status") not in statuses:
            errors.append(f"{skill_id}: invalid status")
        origin = record.get("origin")
        upstream = record.get("upstream_url")
        if origin not in {"original", "adapted", "vendored"}:
            errors.append(f"{skill_id}: origin must be original, adapted, or vendored")
        elif origin == "original" and upstream is not None:
            errors.append(f"{skill_id}: original Skill must not declare upstream_url")
        elif origin in {"adapted", "vendored"} and (not isinstance(upstream, str) or not upstream.startswith("https://")):
            errors.append(f"{skill_id}: {origin} Skill requires a canonical HTTPS upstream_url")
        license_record = record.get("license")
        if not isinstance(license_record, dict):
            errors.append(f"{skill_id}: license must be an object")
        else:
            if license_record.get("expression") not in {"CC-BY-NC-4.0"}:
                errors.append(f"{skill_id}: unknown or unsupported license expression")
            if not isinstance(license_record.get("boundary"), str) or not license_record["boundary"].strip():
                errors.append(f"{skill_id}: license boundary is required")
        source_ids = record.get("asset_source_ids")
        if not isinstance(source_ids, list) or not source_ids:
            errors.append(f"{skill_id}: asset_source_ids must be non-empty")
        else:
            if len(source_ids) != len(set(source_ids)):
                errors.append(f"{skill_id}: duplicate asset source id")
            for source_id in source_ids:
                if not isinstance(source_id, str) or not SOURCE_ID_RE.fullmatch(source_id) or source_id not in sources:
                    errors.append(f"{skill_id}: unresolved asset source id {source_id}")

        skill_path = root / "skills" / str(skill_id) / "SKILL.md"
        ui_path = root / "skills" / str(skill_id) / "agents" / "openai.yaml"
        if not skill_path.is_file():
            errors.append(f"{skill_id}: registered Skill directory is missing")
            continue
        text = skill_path.read_text(encoding="utf-8")
        if parse_frontmatter_name(text) != skill_id:
            errors.append(f"{skill_id}: frontmatter name differs from registry id")
        if not ui_path.is_file() or parse_display_name(ui_path.read_text(encoding="utf-8")) != record.get("public_name"):
            errors.append(f"{skill_id}: public_name differs from agents/openai.yaml")
        maintenance = parse_maintenance(text)
        expected = {
            "source": record.get("source_summary"),
            "license": license_record.get("boundary") if isinstance(license_record, dict) else None,
            "owner": record.get("owner"), "version": record.get("version"),
            "review_date": record.get("review_date"), "content_status": record.get("status"),
        }
        for key, value in expected.items():
            if normalize_visible_value(maintenance.get(key)) != normalize_visible_value(value):
                errors.append(f"{skill_id}: maintenance {key} differs from registry")
        item = status_map.get(skill_id)
        if not item:
            errors.append(f"{skill_id}: missing from content-status skills.items")
        elif item.get("path") != record.get("path") or item.get("status") != record.get("status"):
            errors.append(f"{skill_id}: content-status path or status differs from registry")

    registry_ids = seen["id"]
    for missing in sorted(directories - registry_ids):
        errors.append(f"unregistered Skill directory: {missing}")
    for orphan in sorted(registry_ids - directories):
        errors.append(f"orphan registry record: {orphan}")
    for missing in sorted(set(status_map) - registry_ids):
        errors.append(f"content-status Skill missing from registry: {missing}")

    routing = load_object(root / ROUTING_PATH)
    routing_ids = {
        item.get("id") for item in routing.get("skills", []) if isinstance(item, dict)
    }
    for missing in sorted(registry_ids - routing_ids):
        errors.append(f"registry Skill missing from routing contract: {missing}")
    for orphan in sorted(routing_ids - registry_ids):
        errors.append(f"routing contract Skill missing from registry: {orphan}")

    matrix = (root / ROUTING_MATRIX_PATH).read_text(encoding="utf-8")
    matrix_ids = set(re.findall(r"(?m)^\| `([^`]+)` / ", matrix))
    for missing in sorted(registry_ids - matrix_ids):
        errors.append(f"registry Skill missing from routing matrix: {missing}")
    for orphan in sorted(matrix_ids - registry_ids):
        errors.append(f"routing matrix Skill missing from registry: {orphan}")
    normalized_matrix = re.sub(r"\s+", " ", matrix)
    expected_matrix_count = f"and the {len(registry_ids)} registered Skill files."
    if expected_matrix_count not in normalized_matrix:
        errors.append(
            "routing matrix must state the current registered Skill count: "
            f"{expected_matrix_count}"
        )
    frontdoor_documents = {
        path: (root / path).read_text(encoding="utf-8")
        for path in FRONTDOOR_SKILL_COUNT_PATTERNS
        if (root / path).is_file()
    }
    errors.extend(frontdoor_skill_count_errors(len(registry_ids), frontdoor_documents))
    return errors


def render(registry: dict[str, Any]) -> str:
    lines = [
        "# Project Skill registry", "",
        "> Generated from `docs/governance/skill-registry.yaml`. Do not edit this table by hand.", "",
        "This registry contains project-maintained Skills, not a bulk copy of external repositories. Original Skills are listed first. An external Skill must name its canonical target URL, source record, and license boundary before admission.", "",
        "| Install ID | Public name | Origin | Purpose | Path | Version | Owner | Review | Status | Source |",
        "|---|---|---|---|---|---|---|---|---|---|",
    ]
    origin_order = {"original": 0, "adapted": 1, "vendored": 2}
    records = sorted(registry["records"], key=lambda item: (origin_order[item["origin"]], item["public_name"].lower()))
    for item in records:
        origin = "Original" if item["origin"] == "original" else f"[{item['origin'].title()}]({item['upstream_url']})"
        source_ids = ", ".join(f"`{value}`" for value in item["asset_source_ids"])
        cells = [f"`{item['id']}`", item["public_name"], origin, item["purpose"], f"`{item['path']}`", f"`{item['version']}`", item["owner"], item["review_date"], item["status"], source_ids]
        lines.append("| " + " | ".join(value.replace("|", "\\|") for value in cells) + " |")
    lines.extend(["", "## Status boundary", "", "All current records are `candidate`. Structural, registry, and static checks do not prove automatic triggering, runtime effectiveness, cross-model behavior, learner outcomes, transfer, or production readiness.", "", "The machine registry is authoritative for provenance and maintenance metadata. `content-status.yaml` remains authoritative for runtime and maturity projections.", ""])
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="refresh the human-readable projection")
    args = parser.parse_args()
    registry = load_object(ROOT / REGISTRY_PATH)
    errors = validate(ROOT, registry)
    rendered = render(registry)
    if args.write:
        (ROOT / HUMAN_PATH).write_text(rendered, encoding="utf-8")
    elif not (ROOT / HUMAN_PATH).is_file() or (ROOT / HUMAN_PATH).read_text(encoding="utf-8") != rendered:
        errors.append("docs/skill-registry.md is stale; run validate_skill_registry.py --write")
    if errors:
        print("SKILL_REGISTRY_VALIDATION_FAILED")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print(f"SKILL_REGISTRY_VALIDATION_OK records={len(registry['records'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
