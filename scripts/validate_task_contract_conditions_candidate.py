"""Validate the task-contract availability and channel candidate without running a model."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CANDIDATE_ID = "task-contract-availability-and-channel-v1"
CANDIDATE = ROOT / "evals" / "candidates" / CANDIDATE_ID


def load_json(relative: str) -> dict:
    path = CANDIDATE / relative
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise AssertionError(f"{relative}: cannot load JSON: {error}") from error


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> None:
    required = [
        "README.md",
        "workspace/evidence-packet.md",
        "task-contract.md",
        "prompts/a-vague.txt",
        "prompts/b-structured.txt",
        "prompts/c-shared-context-short.txt",
        "acceptance.json",
        "evaluation-plan.json",
        "run-record-template.json",
    ]
    for relative in required:
        path = CANDIDATE / relative
        require(path.is_file() and path.stat().st_size > 0, f"missing or empty: {relative}")

    plan = load_json("evaluation-plan.json")
    acceptance = load_json("acceptance.json")
    record = load_json("run-record-template.json")

    require(plan.get("candidate_id") == CANDIDATE_ID, "wrong plan candidate_id")
    require(acceptance.get("candidate_id") == CANDIDATE_ID, "wrong acceptance candidate_id")
    require(record.get("candidate_id") == CANDIDATE_ID, "wrong run-record candidate_id")
    require(plan.get("content_status") == "candidate", "content_status must remain candidate")
    require(plan.get("run_status") == "not_run", "run_status must remain not_run")
    require(plan.get("review_status") == "evaluation_plan_only", "review status overclaims")
    require(plan.get("canonical_lab") is False, "candidate must not be a canonical Lab")
    require(plan.get("formal_task_set_entry") is False, "candidate must not enter formal task set")

    task = plan.get("task", {})
    require(task.get("synthetic") is True and task.get("risk") == "low", "task boundary missing")
    require(task.get("output_path") == "output/release-handoff.md", "output path drift")

    conditions = plan.get("conditions", [])
    require([item.get("id") for item in conditions] == ["A", "B", "C"], "conditions must be A/B/C")
    by_id = {item["id"]: item for item in conditions}
    require(by_id["A"].get("contract_content_path") is None, "A must not receive initial contract")
    require(
        by_id["B"].get("contract_content_path") == by_id["C"].get("contract_content_path") == "task-contract.md",
        "B and C must use the same contract bytes",
    )
    structured = (CANDIDATE / by_id["B"]["prompt_path"]).read_text(encoding="utf-8")
    require(structured.count("{{TASK_CONTRACT}}") == 1, "B must inject the contract exactly once")
    require(by_id["C"].get("contract_channel") == "recorded_shared_context", "C context channel drift")

    controls = plan.get("controls", {})
    require(controls.get("minimum_repetitions_per_available_condition", 0) >= 5, "need at least five repetitions")
    require(controls.get("maximum_user_repair_turns") == 2, "repair limit must be two")
    require(controls.get("condition_blind_reviewers", 0) >= 2, "need two blind reviewers")
    for key in (
        "fresh_session_per_run",
        "fresh_disposable_workspace_per_run",
        "same_model_version_settings_tools_permissions_and_budget",
        "preserve_all_repetitions",
    ):
        require(controls.get(key) is True, f"control must be true: {key}")

    acceptance_ids = [item.get("id") for item in acceptance.get("acceptance_criteria", [])]
    evidence_ids = [item.get("id") for item in acceptance.get("evidence_completeness", [])]
    require(acceptance_ids == [f"A{number:02d}" for number in range(1, 11)], "acceptance IDs drift")
    require(evidence_ids == [f"E{number:02d}" for number in range(1, 6)], "evidence IDs drift")
    require(record.get("run_status") == "not_run", "record template must remain not_run")
    require(record.get("evidence_completeness", {}).get("total_items") == 5, "record evidence total drift")

    packet = (CANDIDATE / "workspace/evidence-packet.md").read_text(encoding="utf-8")
    require(not re.search(r"https?://", packet, flags=re.IGNORECASE), "synthetic packet must not contain URLs")
    secret_markers = ("api_key", "token=", "password=", "private key", "cookie=")
    require(not any(marker in packet.lower() for marker in secret_markers), "synthetic packet contains secret marker")

    print("TASK_CONTRACT_CONDITIONS_CANDIDATE_OK conditions=3 acceptance=10 evidence=5 run_status=not_run")


if __name__ == "__main__":
    main()
