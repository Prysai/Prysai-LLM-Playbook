"""Validate the minimum structural contract of the Codex learning project."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = (
    "LICENSE",
    "AGENTS.md",
    "CONTRIBUTING.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/ISSUE_TEMPLATE/correction.yml",
    ".github/ISSUE_TEMPLATE/change-proposal.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/workflows/external-links.yml",
    "CONTEXT.md",
    "README.md",
    "docs/charter.md",
    "docs/book-architecture.md",
    "docs/integration-map.md",
    "docs/learning-model.md",
    "docs/governance/learning-path.yaml",
    "docs/content-matrix.md",
    "docs/roadmap.md",
    "docs/research/openai-codex-baseline.md",
    "docs/sources/asset-register.md",
    "docs/sources/licensing.md",
    "docs/sources/archive-audit-2026-08-09.json",
    "docs/governance/content-lifecycle.md",
    "docs/governance/update-map.md",
    "docs/governance/update-registry.yaml",
    "docs/governance/fact-impact-registry.yaml",
    "docs/governance/external-url-audit.yaml",
    "docs/governance/content-status.yaml",
    "docs/governance/quality-register.yaml",
    "docs/governance/first-win-pilot-kit.yaml",
    "docs/governance/release-evidence.yaml",
    "docs/templates/update-record.md",
    "docs/templates/field-case.md",
    "docs/research/workbuddyguide-structure-study-2026-08-10.md",
    "docs/research/book-navigation-architecture-study-2026-08-11.md",
    "docs/research/tutorial-value-and-knowledge-base-benchmark-2026-08-11.md",
    "docs/research/field-problems-deep-dive-2026-08-11.md",
    "docs/research/field-guide-content-and-visual-gap-audit-2026-08-11.md",
    "docs/project-map-EN.md",
    "docs/governance/project-structure.yaml",
    "docs/adr/0011-reading-product-and-field-case-layer.md",
    "docs/adr/0013-single-book-navigation-source.md",
    "docs/adr/0014-canonical-project-directory-map.md",
    "docs/governance/book-navigation.yaml",
    "docs/governance/lab-navigation.yaml",
    "docs/governance/core-unit-map.yaml",
    "book/routes/universal-core-foundations-EN.md",
    "docs/governance/contribution-model.md",
    "docs/quality/skill-quality-standard.md",
    "docs/quality/evaluation-framework.md",
    "docs/quality/quality-register.md",
    "docs/quality/public-beta-feedback-contract-v1.md",
    "docs/quality/review-lab-navigation-and-locale-integrity-2026-08-13.md",
    "docs/adr/0020-machine-readable-quality-register.md",
    "docs/adr/0021-commit-bound-release-evidence.md",
    "docs/adr/0022-staged-authoritative-url-audit.md",
    "docs/adr/0030-lazy-search-and-browser-smoke.md",
    "docs/quality/first-win-pilot-protocol-v2.md",
    "book/table-of-contents.md",
    "book/labs/README.md",
    "site/index.html",
    "site/app.js",
    "site/styles.css",
    "package.json",
    "package-lock.json",
    "scripts/browser_smoke.mjs",
    "scripts/test_build_pages_artifact.py",
    "scripts/serve_pages_candidate.py",
    "scripts/test_serve_pages_candidate.py",
    "scripts/validate_content_status.py",
    "scripts/build_quality_register.py",
    "scripts/build_release_evidence.py",
    "scripts/test_release_evidence.py",
    "scripts/validate_github_templates.py",
    "scripts/test_validate_github_templates.py",
    "scripts/validate_learning_path.py",
    "scripts/validate_fact_impact_registry.py",
    "scripts/audit_external_urls.py",
    "scripts/test_external_url_audit.py",
    "scripts/build_book_navigation.py",
    "scripts/build_book_title_map.py",
    "scripts/build_pages_artifact.py",
    "scripts/validate_book_navigation.py",
    "scripts/test_book_navigation_titles.py",
    "scripts/test_book_title_map.py",
    "scripts/build_lab_navigation.py",
    "scripts/validate_lab_navigation.py",
    "scripts/test_lab_navigation.py",
    "scripts/test_reader_lab_navigation.py",
    "scripts/validate_core_unit_map.py",
    "scripts/test_core_unit_map.py",
    "scripts/validate_learning_practice_candidate.py",
    "scripts/first_win_pilot_kit.py",
    "scripts/test_first_win_pilot_kit.py",
    "scripts/validate_evidence_review_candidate.py",
    "scripts/test_evidence_review_candidate.py",
    "scripts/validate_project_structure.py",
    "scripts/validate_content_completeness.py",
)


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED:
        if not (ROOT / relative).is_file():
            errors.append(f"missing required file: {relative}")

    skill_dirs = sorted(path.parent for path in (ROOT / "skills").glob("*/SKILL.md"))
    if not skill_dirs:
        errors.append("no Field Guide skills found")

    chapter_files = sorted((ROOT / "book/chapters").glob("*.md"))
    if len(chapter_files) < 12:
        errors.append("fewer than 12 book chapter files found")
    lab_files = sorted((ROOT / "book/labs").glob("lab-*.md"))
    if len(lab_files) < 6:
        errors.append("fewer than 6 lab files found")

    for skill_dir in skill_dirs:
        skill_path = skill_dir / "SKILL.md"
        skill_label = skill_dir.relative_to(ROOT).as_posix()
        text = skill_path.read_text(encoding="utf-8")
        if not text.startswith("---\n"):
            errors.append(f"{skill_label}: frontmatter must start with ---")
        name_match = re.search(
            r"(?m)^name:\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*$", text
        )
        if not name_match:
            errors.append(f"{skill_label}: skill name is missing or invalid")
        elif name_match.group(1) != skill_dir.name:
            errors.append(
                f"{skill_label}: frontmatter name does not match directory"
            )
        if not re.search(r"(?m)^description:\s*", text):
            errors.append(f"{skill_label}: skill description is missing")

        yaml_path = skill_dir / "agents/openai.yaml"
        if not yaml_path.is_file():
            errors.append(f"{skill_label}: missing agents/openai.yaml")
            continue
        yaml_text = yaml_path.read_text(encoding="utf-8")
        for key in ("display_name", "short_description", "default_prompt"):
            if not re.search(rf"(?m)^\s+{key}:\s*['\"]?.+", yaml_text):
                errors.append(f"{skill_label}: openai.yaml is missing {key}")
        expected_mention = f"${skill_dir.name}"
        if expected_mention not in yaml_text:
            errors.append(
                f"{skill_label}: default_prompt must mention {expected_mention}"
            )

    if errors:
        print("VALIDATION_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"VALIDATION_OK root={ROOT}")
    print(f"required_files={len(REQUIRED)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
