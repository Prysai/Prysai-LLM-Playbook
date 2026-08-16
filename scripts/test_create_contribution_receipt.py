"""Focused tests for the offline community contribution scaffold."""

from __future__ import annotations

import json
import tempfile
from pathlib import Path

import create_contribution_receipt as scaffold
import validate_contributed_test_material as material


BASE_COMMIT = "a" * 40


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    fixtures = 0
    with tempfile.TemporaryDirectory(prefix="prysai-contribution-scaffold-") as directory:
        root = Path(directory)
        for kind in scaffold.KINDS:
            contribution_id = f"CE-20260815-{kind.replace('_', '-')}-sample"
            target = scaffold.create_scaffold(root, contribution_id, kind, f"{kind.replace('_', '-')}-fixture", BASE_COMMIT)
            receipt_path = target / "contribution.json"
            receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
            require(not material.validate_receipt(receipt, receipt_path.as_posix()), f"{kind} scaffold receipt is invalid")
            require(not material.validate_receipt_artifacts(receipt, receipt_path, root), f"{kind} scaffold material is invalid")
            fixtures += 1

        try:
            scaffold.create_scaffold(root, "CE-20260815-synthetic-fixture-sample", "synthetic_fixture", "synthetic-fixture", BASE_COMMIT)
        except FileExistsError:
            fixtures += 1
        else:
            raise AssertionError("scaffold overwrote an existing contribution directory")

        try:
            scaffold.create_scaffold(root, "invalid", "synthetic_fixture", "synthetic-fixture", BASE_COMMIT)
        except ValueError as exc:
            require("contribution_id" in str(exc), "invalid ID failed for the wrong reason")
            fixtures += 1
        else:
            raise AssertionError("scaffold accepted an invalid contribution ID")

        parsed = scaffold.parse_args([
            "--id", "CE-20260815-output-root-sample",
            "--kind", "protocol",
            "--fixture-id", "output-root-fixture",
            "--base-commit", BASE_COMMIT,
            "--output-root", str(root),
        ])
        require(parsed.output_root == str(root), "optional scratch output root was not parsed")
        fixtures += 1

    print(f"CONTRIBUTION_SCAFFOLD_TESTS_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
