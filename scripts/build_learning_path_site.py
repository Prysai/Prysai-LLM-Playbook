"""Build the public page's learning-path data from the canonical contract."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT_FILE = ROOT / "docs/governance/learning-path.yaml"
STATUS_FILE = ROOT / "docs/governance/content-status.yaml"
CATALOG_FILE = ROOT / "site/content-catalog.json"
OUTPUT_FILE = ROOT / "site/learning-path-data.js"


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def site_href(path: str, section: str) -> str:
    value = path.replace("\\", "/")
    if section == "skills":
        value = f"{value.rstrip('/')}/SKILL.md"
    return f"../{value}"


def indexed_items(status: dict[str, Any], section: str) -> dict[str, dict[str, Any]]:
    return {
        item["id"]: item
        for item in status.get(section, {}).get("items", [])
        if isinstance(item, dict) and isinstance(item.get("id"), str)
    }


LOCALE_KEYS = ("en", "zh", "es", "ja", "ko", "de", "zh-tw")


def localized(value: dict[str, str]) -> dict[str, str]:
    return {key: value[key] for key in LOCALE_KEYS}


def build_asset(
    asset_id: str,
    section: str,
    relation: str,
    status_items: dict[str, dict[str, Any]],
    catalog: dict[str, Any],
) -> dict[str, Any]:
    status_item = status_items.get(asset_id)
    catalog_item = catalog.get(section, {}).get(asset_id)
    if not status_item:
        raise ValueError(f"{section}: contract references unknown asset {asset_id}")
    if not catalog_item or not isinstance(catalog_item.get("name"), dict):
        raise ValueError(f"{section}: catalog is missing bilingual name for {asset_id}")
    name = catalog_item["name"]
    if set(name) != set(LOCALE_KEYS) or not all(isinstance(value, str) and value.strip() for value in name.values()):
        raise ValueError(f"{section}: catalog name for {asset_id} must contain non-empty text for all seven locales")
    result = {
        "id": asset_id,
        "name": localized(name),
        "href": site_href(status_item["path"], section),
        "relation": relation,
    }
    return result


def build_lab_use(
    use: dict[str, Any],
    status_items: dict[str, dict[str, Any]],
    catalog: dict[str, Any],
) -> dict[str, Any]:
    asset = build_asset(use["id"], "labs", use["relation"], status_items, catalog)
    asset.update({
        "firstSeen": use["first_seen"],
        "newCapability": localized(use["new_capability"]),
        "newArtifact": localized(use["new_artifact"]),
        "newAcceptance": localized(use["new_acceptance"]),
    })
    return asset


def build_foundation_route(route: dict[str, Any] | None) -> dict[str, Any] | None:
    """Build the explicit L0 foundation entry without changing chapter ownership.

    Chapters remain the primary owners used by the progression validator. The
    foundation route is a reader-facing prerequisite entry, so it is carried
    separately and can be localized by its content identity at runtime.
    """
    if route is None:
        return None
    if not isinstance(route, dict):
        raise ValueError("foundation_route must be an object")
    route_id = route.get("id")
    route_path = route.get("path")
    route_name = route.get("name")
    if not isinstance(route_id, str) or not route_id.strip():
        raise ValueError("foundation_route.id must be non-empty")
    if not isinstance(route_path, str) or not route_path.strip():
        raise ValueError("foundation_route.path must be non-empty")
    if not isinstance(route_name, dict):
        raise ValueError("foundation_route.name must be an object")
    if set(route_name) != set(LOCALE_KEYS) or not all(isinstance(value, str) and value.strip() for value in route_name.values()):
        raise ValueError("foundation_route.name must contain non-empty text for all seven locales")
    return {
        "id": route_id,
        "content_id": route_id,
        "name": localized(route_name),
        "href": site_href(route_path, "routes"),
        "relation": "primary",
    }


def build_payload() -> dict[str, Any]:
    contract = load_json(CONTRACT_FILE)
    status = load_json(STATUS_FILE)
    catalog = load_json(CATALOG_FILE)
    status_items = {section: indexed_items(status, section) for section in ("chapters", "labs", "skills")}

    for section in ("chapters", "labs", "skills"):
        expected = set(status_items[section])
        actual = set(catalog.get(section, {}))
        if expected != actual:
            missing = sorted(expected - actual)
            extra = sorted(actual - expected)
            raise ValueError(f"{section}: catalog coverage mismatch; missing={missing}, extra={extra}")

    levels: dict[str, Any] = {}
    for level in contract.get("levels", []):
        level_id = level["id"]
        foundation_route = build_foundation_route(level.get("foundation_route"))
        chapters = [build_asset(asset_id, "chapters", "primary", status_items["chapters"], catalog) for asset_id in level["primary_chapters"]]
        labs = [build_lab_use(use, status_items["labs"], catalog) for use in level["lab_uses"]]
        skills = [build_asset(asset_id, "skills", "supporting", status_items["skills"], catalog) for asset_id in level["supporting_skills"]]
        next_chapter = chapters[0]
        next_lab = labs[0]
        levels[level_id] = {
            "id": level_id,
            "name": localized(level["name"]),
            "short": localized(level["short"]),
            "headline": localized(level["headline"]),
            "description": localized(level["capability"]),
            "chapters": chapters,
            "labs": labs,
            "skills": skills,
            "evaluations": level["evaluation_tasks"],
            "evaluationTypes": level["evaluation_types"],
            "gate": {key: localized(value) for key, value in level["evidence_gate"].items()},
            "graduation": localized(level["graduation_gate"]),
            "blocked": localized(level["blocked_when"]),
            "status": level["status"],
            "foundationRoute": foundation_route,
            "next": {"chapter": next_chapter, "lab": next_lab},
        }

    return {
        "schema_version": "1",
        "source": "docs/governance/learning-path.yaml",
        "catalog_source": "site/content-catalog.json",
        "levels": levels,
    }


def render(payload: dict[str, Any]) -> str:
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    return "/* Generated by scripts/build_learning_path_site.py. Do not edit by hand. */\n" f"window.CODEX_LEARNING_PATH = {body};\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify the generated file without writing it")
    args = parser.parse_args()
    try:
        payload = build_payload()
        expected = render(payload)
    except (OSError, TypeError, KeyError, ValueError, json.JSONDecodeError) as exc:
        print("LEARNING_PATH_SITE_FAILED")
        print(f"- {exc}")
        return 1

    if args.check:
        if not OUTPUT_FILE.is_file() or OUTPUT_FILE.read_text(encoding="utf-8") != expected:
            print("LEARNING_PATH_SITE_FAILED")
            print(f"- generated output is stale or missing: {OUTPUT_FILE.relative_to(ROOT)}")
            print("- run: python scripts/build_learning_path_site.py")
            return 1
        print(f"LEARNING_PATH_SITE_OK levels={len(payload['levels'])}")
        return 0

    OUTPUT_FILE.write_text(expected, encoding="utf-8")
    print(f"LEARNING_PATH_SITE_BUILT output={OUTPUT_FILE.relative_to(ROOT)} levels={len(payload['levels'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
