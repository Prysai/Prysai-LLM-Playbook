"""Validate Atlas Skill frontmatter and UI metadata in CI."""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
ALLOWED_FRONTMATTER = {"name", "description", "license", "allowed-tools", "metadata"}
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def validate(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    skill_path = skill_dir / "SKILL.md"
    text = skill_path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return [f"{skill_dir.name}: frontmatter must start with ---"]

    match = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return [f"{skill_dir.name}: invalid frontmatter delimiters"]
    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError as error:
        return [f"{skill_dir.name}: invalid YAML: {error}"]
    if not isinstance(frontmatter, dict):
        return [f"{skill_dir.name}: frontmatter must be a mapping"]

    unexpected = set(frontmatter) - ALLOWED_FRONTMATTER
    if unexpected:
        errors.append(f"{skill_dir.name}: unexpected frontmatter keys: {sorted(unexpected)}")
    name = str(frontmatter.get("name", "")).strip()
    if name != skill_dir.name or not NAME_RE.fullmatch(name):
        errors.append(f"{skill_dir.name}: frontmatter name does not match normalized directory name")
    description = frontmatter.get("description")
    if not isinstance(description, str) or not description.strip():
        errors.append(f"{skill_dir.name}: description is missing or not a string")
    elif len(description.strip()) > 1024 or "<" in description or ">" in description:
        errors.append(f"{skill_dir.name}: description violates length or character limits")

    yaml_path = skill_dir / "agents/openai.yaml"
    if not yaml_path.is_file():
        errors.append(f"{skill_dir.name}: missing agents/openai.yaml")
    else:
        ui_text = yaml_path.read_text(encoding="utf-8")
        for key in ("display_name", "short_description", "default_prompt"):
            if not re.search(rf"(?m)^\s+{re.escape(key)}:\s*['\"]?.+", ui_text):
                errors.append(f"{skill_dir.name}: openai.yaml is missing {key}")
        if f"${skill_dir.name}" not in ui_text:
            errors.append(f"{skill_dir.name}: default_prompt must mention ${skill_dir.name}")
    return errors


def main() -> int:
    errors: list[str] = []
    skill_dirs = sorted(path.parent for path in (ROOT / "skills").glob("*/SKILL.md"))
    for skill_dir in skill_dirs:
        errors.extend(validate(skill_dir))
    if errors:
        print("SKILLS_VALIDATION_FAILED")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print(f"SKILLS_VALIDATION_OK skills={len(skill_dirs)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
