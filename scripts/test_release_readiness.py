"""Negative fixtures for release-readiness semantics."""

from __future__ import annotations

import copy

import validate_release_readiness as readiness


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    contract = readiness.load_contract()
    require(not readiness.validate_contract(contract), "checked-in not_ready contract is invalid")
    require("release_evidence" in readiness.readiness_blockers(contract), "candidate evidence blocker was not reported")
    require("rollback" in readiness.readiness_blockers(contract), "rollback rehearsal blocker was not reported")
    require(contract["release_tag"]["status"] == "reviewed", "public alpha tag review was not recorded")
    require(contract["version"]["status"] == "declared", "candidate version was not declared")
    require(contract["changelog"]["status"] == "current", "candidate changelog was not recorded")

    false_ready = copy.deepcopy(contract)
    false_ready["decision"] = "ready"
    false_ready_errors = readiness.validate_contract(false_ready, inspect_git=False)
    require(not any("ready decision requires release_tag" in error for error in false_ready_errors), "reviewed alpha tag was treated as missing")
    require(any("ready decision requires release_evidence" in error for error in false_ready_errors), "ready accepted without release evidence")
    require(any("ready decision requires rollback" in error for error in false_ready_errors), "ready accepted without rollback")
    require(any("cannot retain known_gaps" in error for error in false_ready_errors), "ready accepted known gaps")

    undeclared_version = copy.deepcopy(false_ready)
    undeclared_version["version"] = {"status": "pending", "value": ""}
    undeclared_version_errors = readiness.validate_contract(
        undeclared_version,
        inspect_git=False,
    )
    require(
        any("ready decision requires version" in error for error in undeclared_version_errors),
        "ready accepted an undeclared version",
    )

    invented_tag = copy.deepcopy(contract)
    invented_tag["release_tag"] = {
        "status": "reviewed",
        "name": "v9.9.9",
        "commit_sha": "a" * 40,
        "reviewed_by": "fixture-reviewer",
        "reviewed_at": "2026-08-12",
    }
    invented_tag_errors = readiness.validate_contract(invented_tag, inspect_git=True)
    require(any("does not exist" in error for error in invented_tag_errors), "invented reviewed tag was accepted")

    fake_rehearsal = copy.deepcopy(contract)
    fake_rehearsal["rollback"] = {
        "status": "rehearsed",
        "target": "v0.0.0",
        "rehearsal_record": "docs/governance/missing-rollback-record.md",
        "rehearsed_at": "2026-08-12",
        "reviewed_by": "fixture-reviewer",
    }
    rehearsal_errors = readiness.validate_contract(fake_rehearsal, inspect_git=False)
    require(any("rehearsal_record" in error for error in rehearsal_errors), "missing rehearsal record was accepted")

    mismatch = copy.deepcopy(contract)
    mismatch["decision"] = "ready"
    mismatch["known_gaps"] = []
    mismatch["version"] = {"status": "declared", "value": "1.0.0"}
    mismatch["changelog"] = {"status": "current", "path": "docs/release-checklist.md"}
    mismatch["release_tag"] = {
        "status": "reviewed", "name": "v1.0.0", "commit_sha": "a" * 40,
        "reviewed_by": "fixture-reviewer", "reviewed_at": "2026-08-12",
    }
    mismatch["release_evidence"] = {
        "status": "reviewed", "candidate_sha": "b" * 40,
        "workflow_run_url": "https://github.com/example/example/actions/runs/1",
    }
    mismatch["rollback"] = {
        "status": "rehearsed", "target": "v0.9.0",
        "rehearsal_record": "docs/release-checklist.md",
        "rehearsed_at": "2026-08-12", "reviewed_by": "fixture-reviewer",
    }
    mismatch["maintenance"]["status"] = "reviewed"
    mismatch_errors = readiness.validate_contract(mismatch, inspect_git=False)
    require(any("same commit" in error for error in mismatch_errors), "tag/evidence SHA mismatch was accepted")

    print("RELEASE_READINESS_TESTS_OK fixtures=6")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
