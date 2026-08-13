"""Validate the repository's contributor-facing GitHub templates."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parents[1]
ISSUE_DIR = ROOT / ".github/ISSUE_TEMPLATE"
PR_TEMPLATE = ROOT / ".github/PULL_REQUEST_TEMPLATE.md"
ALLOWED_TYPES = {"markdown", "input", "textarea", "dropdown", "checkboxes"}
REQUIRED_PR_HEADINGS = {
    "## Problem and bounded change",
    "## Change class",
    "## Source, authorship, and license",
    "## Safety and external effects",
    "## Evidence actually produced",
    "## Unverified and out of scope",
    "## Status claim",
    "## Checklist",
}


def load_yaml(path: Path) -> Any:
    if not path.is_absolute():
        path = ROOT / path
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def validate_form(path: Path) -> list[str]:
    errors: list[str] = []
    if not path.is_absolute():
        path = ROOT / path
    data = load_yaml(path)
    label = str(path.relative_to(ROOT))
    if not isinstance(data, dict):
        return [f"{label} must contain an object"]
    for key in ("name", "description", "body"):
        if key not in data:
            errors.append(f"{label} is missing {key}")
    if not isinstance(data.get("name"), str) or not data["name"].strip():
        errors.append(f"{label}.name must be non-empty")
    description = data.get("description")
    if not isinstance(description, str) or not description.strip() or len(description) > 200:
        errors.append(f"{label}.description must contain 1-200 characters")
    body = data.get("body")
    if not isinstance(body, list) or not body:
        errors.append(f"{label}.body must be a non-empty list")
        return errors
    ids: set[str] = set()
    interactive = 0
    for index, item in enumerate(body, start=1):
        item_label = f"{label}.body[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{item_label} must be an object")
            continue
        item_type = item.get("type")
        if item_type not in ALLOWED_TYPES:
            errors.append(f"{item_label}.type is not supported")
            continue
        attributes = item.get("attributes")
        if not isinstance(attributes, dict):
            errors.append(f"{item_label}.attributes must be an object")
            continue
        if item_type == "markdown":
            if not isinstance(attributes.get("value"), str) or not attributes["value"].strip():
                errors.append(f"{item_label}.attributes.value must be non-empty")
            continue
        interactive += 1
        item_id = item.get("id")
        if not isinstance(item_id, str) or not item_id.strip():
            errors.append(f"{item_label}.id must be non-empty")
        elif item_id in ids:
            errors.append(f"{item_label}.id is duplicated: {item_id}")
        else:
            ids.add(item_id)
        if not isinstance(attributes.get("label"), str) or not attributes["label"].strip():
            errors.append(f"{item_label}.attributes.label must be non-empty")
        validations = item.get("validations")
        if item_type != "checkboxes" and (not isinstance(validations, dict) or validations.get("required") is not True):
            errors.append(f"{item_label} must be required")
        if item_type == "dropdown":
            options = attributes.get("options")
            if not isinstance(options, list) or len(options) < 2 or any(not isinstance(option, str) or not option.strip() for option in options):
                errors.append(f"{item_label}.attributes.options must contain at least two strings")
        if item_type == "checkboxes":
            options = attributes.get("options")
            if not isinstance(options, list) or not options:
                errors.append(f"{item_label}.attributes.options must be non-empty")
            else:
                for option_index, option in enumerate(options, start=1):
                    if not isinstance(option, dict) or not isinstance(option.get("label"), str) or not option["label"].strip():
                        errors.append(f"{item_label}.attributes.options[{option_index}] needs a label")
                    elif option.get("required") is not True:
                        errors.append(f"{item_label}.attributes.options[{option_index}] must be required")
    if interactive < 3:
        errors.append(f"{label} must contain at least three interactive fields")
    return errors


def validate_config(path: Path) -> list[str]:
    errors: list[str] = []
    if not path.is_absolute():
        path = ROOT / path
    data = load_yaml(path)
    label = str(path.relative_to(ROOT))
    if not isinstance(data, dict):
        return [f"{label} must contain an object"]
    if data.get("blank_issues_enabled") is not False:
        errors.append(f"{label}.blank_issues_enabled must be false")
    links = data.get("contact_links")
    if not isinstance(links, list) or not links:
        errors.append(f"{label}.contact_links must be non-empty")
    else:
        for index, link in enumerate(links, start=1):
            if not isinstance(link, dict) or any(not isinstance(link.get(key), str) or not link[key].strip() for key in ("name", "url", "about")):
                errors.append(f"{label}.contact_links[{index}] needs name, url, and about")
            elif not link["url"].startswith("https://github.com/Prysai/Codex-Field-Guide/"):
                errors.append(f"{label}.contact_links[{index}] must stay inside the project repository")
    return errors


def validate_pr_template() -> list[str]:
    if not PR_TEMPLATE.is_file():
        return ["missing .github/PULL_REQUEST_TEMPLATE.md"]
    text = PR_TEMPLATE.read_text(encoding="utf-8")
    missing = sorted(REQUIRED_PR_HEADINGS - set(text.splitlines()))
    return [f"pull request template is missing heading: {heading}" for heading in missing]


def main() -> int:
    errors: list[str] = []
    form_paths = sorted(path for path in ISSUE_DIR.glob("*.yml") if path.name != "config.yml")
    if len(form_paths) < 2:
        errors.append("at least two issue forms are required")
    for path in form_paths:
        try:
            errors.extend(validate_form(path))
        except (OSError, UnicodeError, yaml.YAMLError) as exc:
            errors.append(f"cannot parse {path.relative_to(ROOT)}: {exc}")
    try:
        errors.extend(validate_config(ISSUE_DIR / "config.yml"))
    except (OSError, UnicodeError, yaml.YAMLError) as exc:
        errors.append(f"cannot parse .github/ISSUE_TEMPLATE/config.yml: {exc}")
    errors.extend(validate_pr_template())
    if errors:
        print("GITHUB_TEMPLATES_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"GITHUB_TEMPLATES_OK issue_forms={len(form_paths)} pr_headings={len(REQUIRED_PR_HEADINGS)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
