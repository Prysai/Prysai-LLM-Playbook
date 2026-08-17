"""Negative and boundary fixtures for the release-evidence gate."""

from __future__ import annotations

import copy
import subprocess
import tempfile
from pathlib import Path

import build_release_evidence as evidence


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def git_fixture(head: str, status: str = ""):
    def run(argv: list[str], **_: object) -> subprocess.CompletedProcess[str]:
        if argv == ["git", "rev-parse", "HEAD"]:
            return subprocess.CompletedProcess(argv, 0, stdout=f"{head}\n", stderr="")
        if argv == ["git", "status", "--porcelain", "--untracked-files=all"]:
            return subprocess.CompletedProcess(argv, 0, stdout=status, stderr="")
        raise AssertionError(f"unexpected git command: {argv}")

    return run


def main() -> int:
    contract = evidence.load_object(evidence.CONTRACT_PATH)
    candidate_sha = "a" * 40
    require(
        not evidence.validate_candidate_checkout(candidate_sha, git_fixture(candidate_sha)),
        "clean matching checkout was rejected",
    )
    require(
        any("must equal" in error for error in evidence.validate_candidate_checkout(candidate_sha, git_fixture("b" * 40))),
        "candidate SHA mismatch was accepted",
    )
    require(
        any("working tree must be clean" in error for error in evidence.validate_candidate_checkout(candidate_sha, git_fixture(candidate_sha, " M README.md\n"))),
        "dirty checkout was accepted as commit-bound evidence",
    )

    duplicate = copy.deepcopy(contract)
    duplicate["dimensions"][0]["commands"].append(copy.deepcopy(duplicate["dimensions"][0]["commands"][0]))
    duplicate_errors = evidence.validate_contract(duplicate)
    require(any("duplicate command id" in error for error in duplicate_errors), "duplicate command id was accepted")
    require(any("duplicates an existing command" in error for error in duplicate_errors), "duplicate command argv was accepted")

    for required_id in evidence.REQUIRED_COMMANDS:
        omitted_required = copy.deepcopy(contract)
        for dimension in omitted_required["dimensions"]:
            dimension["commands"] = [command for command in dimension["commands"] if command["id"] != required_id]
        omission_errors = evidence.validate_contract(omitted_required)
        require(any(required_id in error for error in omission_errors), f"omitting required gate {required_id} was accepted")

        substituted_required = copy.deepcopy(contract)
        for dimension in substituted_required["dimensions"]:
            for command in dimension["commands"]:
                if command["id"] == required_id:
                    command["argv"] = ["{python}", "scripts/validate_project.py"]
        substitution_errors = evidence.validate_contract(substituted_required)
        require(any(required_id in error and "must use argv" in error for error in substitution_errors), f"substituting required gate {required_id} argv was accepted")

    failed_contract = copy.deepcopy(contract)
    failed_contract["dimensions"] = [{
        "id": "failure-fixture",
        "label": "Failure fixture",
        "scope": "Intentional invalid argument proves a failing command is recorded.",
        "commands": [{
            "id": "intentional-failure",
            "argv": ["{python}", "scripts/build_quality_register.py", "--intentional-invalid-option"],
        }],
    }]
    with tempfile.TemporaryDirectory(prefix="prysai-release-evidence-fixture-") as temp_dir:
        dimensions = evidence.run_gates(failed_contract, Path(temp_dir))
        require(dimensions[0]["status"] == "failed", "failing command did not fail its dimension")
        require(dimensions[0]["commands"][0]["exit_code"] != 0, "failing command returned zero")
        require((Path(temp_dir) / dimensions[0]["commands"][0]["log"]).is_file(), "failure log was not preserved")
        require(evidence.derive_decision("candidate", dimensions, {"overdue": [], "invalid": []}) == "blocked", "failed gate did not block")

    placeholder_contract = copy.deepcopy(contract)
    placeholder_contract["dimensions"] = [{
        "id": "placeholder-fixture", "label": "Placeholder fixture",
        "scope": "The evidence directory is resolved without shell interpolation.",
        "commands": [{
            "id": "placeholder-check", "argv": ["{python}", "scripts/build_release_evidence.py", "--check"],
        }],
    }]
    with tempfile.TemporaryDirectory(prefix="prysai-evidence-placeholder-") as temp_dir:
        dimensions = evidence.run_gates(placeholder_contract, Path(temp_dir))
        require(dimensions[0]["status"] == "passed", "placeholder-compatible command failed")

    node_contract = copy.deepcopy(contract)
    node_contract["dimensions"] = [{
        "id": "node-fixture", "label": "Node fixture",
        "scope": "The browser gate resolves the declared Node runtime without shell interpolation.",
        "commands": [{
            "id": "node-version", "argv": ["{node}", "--version"],
        }],
    }]
    with tempfile.TemporaryDirectory(prefix="prysai-node-evidence-fixture-") as temp_dir:
        dimensions = evidence.run_gates(node_contract, Path(temp_dir))
        require(dimensions[0]["status"] == "passed", "Node placeholder did not resolve")

    embedded_placeholder = copy.deepcopy(contract)
    embedded_placeholder["dimensions"] = [{
        "id": "embedded-placeholder-fixture", "label": "Embedded placeholder fixture",
        "scope": "An evidence-directory placeholder embedded in a child path is expanded without a shell.",
        "commands": [{
            "id": "embedded-placeholder-check",
            "argv": ["{python}", "scripts/run_lab_013_reference.py", "--output-dir", "{evidence_dir}/examples/lab-013-reference"],
        }],
    }]
    repository_work = evidence.ROOT / ".work" / "release-evidence-placeholder-fixture"
    dimensions = evidence.run_gates(embedded_placeholder, repository_work)
    require(dimensions[0]["status"] == "passed", "embedded evidence-directory placeholder was not expanded")
    require((repository_work / "examples/lab-013-reference/run-record.json").is_file(), "embedded placeholder output is missing")

    passed_dimensions = [{"status": "passed"}]
    require(evidence.derive_decision("candidate", passed_dimensions, {"overdue": [], "invalid": []}) == "candidate", "static gates upgraded candidate")
    require(evidence.derive_decision("verified", passed_dimensions, {"overdue": [], "invalid": []}, ["Q-P0"], ["Q-P0"]) == "blocked", "active verified blocker allowed verified maturity")
    require(evidence.derive_decision("production-ready", passed_dimensions, {"overdue": [], "invalid": []}, [], ["Q-P2"]) == "blocked", "active production blocker allowed production-ready maturity")
    require(evidence.derive_decision("candidate", passed_dimensions, {"overdue": [], "invalid": []}, ["Q-P0"], ["Q-P0"]) == "candidate", "active findings incorrectly blocked honest candidate maturity")

    quality = evidence.load_object(evidence.ROOT / contract["quality_source"])
    weakened = copy.deepcopy(quality)
    weakened["release_policy"]["verified_blocking_severities"] = ["P1"]
    require(any("verified blocking" in error for error in evidence.validate_release_policy(weakened)), "weakened verified policy was not rejected")
    weakened = copy.deepcopy(quality)
    weakened["release_policy"]["production_ready_blocking_severities"] = ["P0", "P1"]
    require(any("production-ready blocking" in error for error in evidence.validate_release_policy(weakened)), "weakened production policy was not rejected")
    require(evidence.derive_decision("verified", passed_dimensions, {"overdue": [{"field": "next_review"}], "invalid": []}) == "blocked", "overdue source did not block verified")
    require(evidence.derive_decision("production-ready", passed_dimensions, {"overdue": [], "invalid": [{"field": "next_review"}]}) == "blocked", "invalid date did not block production-ready")

    empty_optional_date = {"release_tag": {"status": "absent", "reviewed_at": ""}}
    require(evidence.collect_dates(empty_optional_date, "fixture") == [], "an absent optional artifact produced an invalid empty date")
    invalid_present_date = {"release_tag": {"status": "reviewed", "reviewed_at": "not-a-date"}}
    invalid_records = evidence.collect_dates(invalid_present_date, "fixture")
    require(len(invalid_records) == 1 and invalid_records[0]["date"] == "not-a-date", "a present invalid date was hidden")

    rendered_packet = {
        "candidate_sha": "a" * 40, "repository": "example/example",
        "generated_at": "2026-08-12T00:00:00Z", "declared_maturity": "candidate",
        "decision": "candidate", "release_version": "unreleased",
        "rollback_target": "unavailable", "workflow_run_url": "",
        "dimensions": [], "active_quality_findings": [],
        "freshness": {"date_fields_checked": 0, "overdue": [], "invalid": []},
        "known_blind_spots": [], "rollback_reason": "No release target.",
        "release_readiness": {"decision": "not_ready", "blockers": ["version", "rollback"]},
    }
    rendered = evidence.render_markdown(rendered_packet)
    require("Decision: `not_ready`" in rendered, "readiness decision missing from packet summary")
    require("`rollback`" in rendered, "readiness blocker missing from packet summary")

    print("RELEASE_EVIDENCE_TESTS_OK fixtures=27")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
