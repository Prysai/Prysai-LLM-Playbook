"""Focused fixtures for the community test-material receipt validator."""

from __future__ import annotations

import copy
import json
import tempfile
from pathlib import Path

import validate_contributed_test_material as material


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def valid_receipt() -> dict[str, object]:
    return {
        "schema_version": "1",
        "contribution_id": "CE-20260815-safe-fixture",
        "contribution_kind": "synthetic_fixture",
        "status": "submitted_unreviewed",
        "fixture_id": "safe-fixture-v1",
        "base_commit": "a" * 40,
        "scope": "fictional_text_only",
        "authorship": "original",
        "license_boundary": "CC-BY-4.0-project-owned-fictional-content",
        "review_route": "fast_material_review",
        "test_material_paths": ["evals/contributions/CE-20260815-safe-fixture/fixture.json"],
        "validation_commands": ["python scripts/validate_contributed_test_material.py"],
        "privacy": {
            "raw_personal_data_committed": False,
            "raw_learner_work_committed": False,
            "raw_model_output_committed": False,
            "credentials_committed": False,
        },
        "claim_boundary": material.CLAIM_BOUNDARY,
    }


def main() -> int:
    fixtures = 0
    receipt = valid_receipt()
    require(not material.validate_receipt(receipt, "valid"), "valid material receipt was rejected")
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["base_commit"] = "not-a-sha"
    require(any("base_commit" in error for error in material.validate_receipt(altered, "bad-sha")), "invalid commit SHA was accepted")
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["contribution_kind"] = "validator"
    require(
        any("contribution_kind" in error for error in material.validate_receipt(altered, "validator")),
        "executable validator was accepted on the fast route",
    )
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["privacy"]["raw_model_output_committed"] = True  # type: ignore[index]
    require(any("raw_model_output_committed" in error for error in material.validate_receipt(altered, "raw-output")), "raw output declaration was accepted")
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["raw_prompt"] = "do not store this"
    require(any("forbidden raw-evidence" in error for error in material.validate_receipt(altered, "raw-prompt")), "raw prompt field was accepted")
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["claim_boundary"] = "This proves IQ increased."
    require(any("claim_boundary" in error for error in material.validate_receipt(altered, "overclaim")), "overclaim was accepted")
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["participant_context"] = "unapproved hidden field"
    require(any("unsupported v1 field" in error for error in material.validate_receipt(altered, "unknown-field")), "unknown receipt field was accepted")
    fixtures += 1
    altered = copy.deepcopy(receipt)
    altered["validation_commands"] = ["python scripts/validate_contributed_test_material.py", "curl https://example.test"]
    require(any("network or model command" in error for error in material.validate_receipt(altered, "network-command")), "network command was accepted")
    fixtures += 1
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory)
        receipt_path = root / "evals" / "contributions" / receipt["contribution_id"] / "contribution.json"
        fixture_path = receipt_path.parent / "fixture.json"
        fixture_path.parent.mkdir(parents=True)
        fixture_path.write_text(json.dumps({"task": "fictional"}), encoding="utf-8")
        receipt_path.write_text(json.dumps(receipt), encoding="utf-8")
        require(
            not material.validate_receipt_artifacts(receipt, receipt_path, root),
            "declared local fictional material was rejected",
        )
        fixtures += 1
        extra_path = receipt_path.parent / "unlisted.txt"
        extra_path.write_text("must be listed", encoding="utf-8")
        require(
            any("leaves material unlisted" in error for error in material.validate_receipt_artifacts(receipt, receipt_path, root)),
            "unlisted material was accepted",
        )
        fixtures += 1
        extra_path.unlink()
        altered = copy.deepcopy(receipt)
        altered["test_material_paths"] = ["docs/outside-fixture.json"]
        require(
            any("must stay inside" in error for error in material.validate_receipt_artifacts(altered, receipt_path, root)),
            "out-of-folder material path was accepted",
        )
        fixtures += 1
        altered = copy.deepcopy(receipt)
        altered["test_material_paths"] = [f"evals/contributions/{receipt['contribution_id']}/contribution.json"]
        require(
            any("must not list contribution.json" in error for error in material.validate_receipt_artifacts(altered, receipt_path, root)),
            "receipt file was accepted as test material",
        )
        fixtures += 1
        fixture_path.write_bytes(b"\xff")
        require(
            any("must be UTF-8 text" in error for error in material.validate_receipt_artifacts(receipt, receipt_path, root)),
            "non-UTF-8 material was accepted",
        )
        fixtures += 1
        fixture_path.write_text(json.dumps({"task": "fictional"}), encoding="utf-8")
        (root / "evals" / "contributions" / "contribution-receipt-template.json").write_text("{}\n", encoding="utf-8")
        changed_paths = root / "changed-paths.txt"
        changed_paths.write_text(f"evals/contributions/{receipt['contribution_id']}/fixture.json\n", encoding="utf-8")
        require(
            material.main(["--repository-root", str(root), "--changed-paths-file", str(changed_paths)]) == 0,
            "trusted validator could not validate a separate untrusted material tree",
        )
        fixtures += 1
        executable_path = receipt_path.parent / "validator.py"
        executable_path.write_text("print('not allowed on the fast route')\n", encoding="utf-8")
        altered = copy.deepcopy(receipt)
        altered["test_material_paths"].append(f"evals/contributions/{receipt['contribution_id']}/validator.py")  # type: ignore[index]
        require(
            any("text suffix" in error for error in material.validate_receipt_artifacts(altered, receipt_path, root)),
            "Python material was accepted on the fast route",
        )
        fixtures += 1
        executable_path.unlink()
        (root / "evals" / "contributions" / "orphan.py").write_text("print('not allowed')\n", encoding="utf-8")
        _contributions, _receipts, layout_errors = material.validate_contribution_layout(root)
        require(any("not an allowed top-level contribution file" in error for error in layout_errors), "orphan contribution material was accepted")
        fixtures += 1
        require(
            not material.validate_fast_route_changed_paths([f"evals/contributions/{receipt['contribution_id']}/fixture.json"]),
            "one contribution-folder change was rejected from the fast route",
        )
        fixtures += 1
        require(
            any(
                "out-of-scope path" in error
                for error in material.validate_fast_route_changed_paths([
                    f"evals/contributions/{receipt['contribution_id']}/fixture.json",
                    "scripts/validate_contributed_test_material.py",
                ])
            ),
            "mixed-scope fast-route change was accepted",
        )
        fixtures += 1
        require(
            any(
                "exactly one contribution folder" in error
                for error in material.validate_fast_route_changed_paths([
                    f"evals/contributions/{receipt['contribution_id']}/fixture.json",
                    "evals/contributions/CE-20260815-other-fixture/fixture.json",
                ])
            ),
            "multiple contribution folders were accepted",
        )
        fixtures += 1
    print(f"CONTRIBUTED_TEST_MATERIAL_TESTS_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
