"""Create a narrow, fictional community test-material contribution scaffold.

The scaffold is deliberately local and offline. It writes no study result,
invokes no model, and does not make a contribution eligible for automatic
merge. Contributors must replace every placeholder before opening a PR.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTRIBUTIONS = ROOT / "evals" / "contributions"
ID_RE = re.compile(r"^CE-\d{8}-[a-z0-9][a-z0-9-]{2,48}$")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
FIXTURE_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,80}$")
KINDS = ("synthetic_fixture", "protocol")
CLAIM_BOUNDARY = (
    "This submission contains fictional test material only; it does not establish "
    "model quality, learning, efficiency, safety, productivity, or IQ."
)


def material_templates(kind: str, fixture_id: str) -> dict[str, str]:
    """Return editable, fictional placeholder files for one declared kind."""
    if kind == "synthetic_fixture":
        return {
            "fixture.json": json.dumps(
                {
                    "fixture_id": fixture_id,
                    "purpose": "Replace with the narrow behavior this fictional fixture checks.",
                    "cases": [
                        {
                            "id": "positive-minimal-case",
                            "case_type": "positive",
                            "input": "Replace with a fictional, low-risk input.",
                            "expected_evidence": "Replace with an observable expected result.",
                        },
                        {
                            "id": "boundary-missing-evidence-case",
                            "case_type": "boundary_or_failure",
                            "input": "Replace with a fictional missing or conflicting input.",
                            "expected_evidence": "Replace with the safe stop, question, or rejection expected.",
                        },
                    ],
                    "limits": [
                        "Replace with what this fixture does not measure.",
                    ],
                },
                indent=2,
            )
            + "\n"
        }
    return {
        "protocol.md": f"""# {fixture_id}: fictional test protocol\n\nReplace every placeholder with original fictional material. This protocol must not\ncollect learners, call a model, use private data, or claim an outcome.\n\n## Positive scenario\n\n- Input: Replace with a fictional low-risk input.\n- Expected observable evidence: Replace with a bounded acceptance condition.\n\n## Boundary or failure scenario\n\n- Input: Replace with a fictional missing, conflicting, or unsafe input.\n- Expected safe result: Replace with a stop condition, question, or rejection.\n\n## Limits\n\nReplace this sentence with what the protocol does not test.\n"""
    }


def create_scaffold(root: Path, contribution_id: str, kind: str, fixture_id: str, base_commit: str) -> Path:
    if not ID_RE.fullmatch(contribution_id):
        raise ValueError("contribution_id must use CE-YYYYMMDD-kebab-case")
    if kind not in KINDS:
        raise ValueError(f"kind must be one of {', '.join(KINDS)}")
    if not FIXTURE_ID_RE.fullmatch(fixture_id):
        raise ValueError("fixture_id must use lowercase kebab-case and be at least three characters")
    if not SHA_RE.fullmatch(base_commit):
        raise ValueError("base_commit must be a lowercase 40-character commit SHA")

    directory = root / "evals" / "contributions" / contribution_id
    if directory.exists():
        raise FileExistsError(f"refusing to overwrite existing contribution directory: {directory}")

    templates = material_templates(kind, fixture_id)
    material_paths = [f"evals/contributions/{contribution_id}/{name}" for name in templates]
    validation_commands = ["python scripts/validate_contributed_test_material.py"]
    receipt = {
        "schema_version": "1",
        "contribution_id": contribution_id,
        "contribution_kind": kind,
        "status": "submitted_unreviewed",
        "fixture_id": fixture_id,
        "base_commit": base_commit,
        "scope": "fictional_text_only",
        "authorship": "original",
        "license_boundary": "CC-BY-NC-4.0-current-repository-default",
        "review_route": "fast_material_review",
        "test_material_paths": material_paths,
        "validation_commands": validation_commands,
        "privacy": {
            "raw_personal_data_committed": False,
            "raw_learner_work_committed": False,
            "raw_model_output_committed": False,
            "credentials_committed": False,
        },
        "claim_boundary": CLAIM_BOUNDARY,
    }

    directory.mkdir(parents=True)
    (directory / "contribution.json").write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    for name, content in templates.items():
        (directory / name).write_text(content, encoding="utf-8")
    return directory


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--id", required=True, dest="contribution_id", help="CE-YYYYMMDD-kebab-case folder and receipt identifier")
    parser.add_argument("--kind", required=True, choices=KINDS, help="fictional material type")
    parser.add_argument("--fixture-id", required=True, help="lowercase kebab-case identifier for the material")
    parser.add_argument("--base-commit", required=True, help="lowercase 40-character commit SHA used as the declared baseline")
    parser.add_argument(
        "--output-root",
        help="optional empty scratch checkout root; defaults to the repository root and still creates evals/contributions/<id>",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        output_root = Path(args.output_root).resolve() if args.output_root else ROOT
        directory = create_scaffold(output_root, args.contribution_id, args.kind, args.fixture_id, args.base_commit)
    except (OSError, ValueError) as exc:
        print(f"CONTRIBUTION_SCAFFOLD_FAILED: {exc}")
        return 1
    display_directory = directory.relative_to(output_root).as_posix()
    print(f"CONTRIBUTION_SCAFFOLD_CREATED directory={display_directory} kind={args.kind}")
    print("next_step=replace_placeholders_then_run_the_declared_offline_checks")
    return 0


if __name__ == "__main__":
    sys.exit(main())
