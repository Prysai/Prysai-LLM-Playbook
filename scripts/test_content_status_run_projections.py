"""Negative fixtures for independent Lab run-status projections."""

from __future__ import annotations

import copy

import validate_content_status as status


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    document = status.load_document()
    require(not status.validate_document(document), "checked-in content status is invalid")

    promoted_learner = copy.deepcopy(document)
    promoted_learner["labs"]["learner_run_status"] = "partial"
    promoted_errors = status.validate_document(promoted_learner)
    require(any("learner_run_status must equal derived" in error for error in promoted_errors), "reference run promoted learner projection")

    legacy_drift = copy.deepcopy(document)
    legacy_drift["labs"]["run_status"] = "completed"
    legacy_errors = status.validate_document(legacy_drift)
    require(any("legacy run_status must equal learner_run_status" in error for error in legacy_errors), "legacy alias drift was accepted")

    transfer_without_learner = copy.deepcopy(document)
    lab = transfer_without_learner["labs"]["items"][12]
    lab["transfer_run_status"] = "completed"
    transfer_without_learner["labs"]["transfer_run_status"] = "partial"
    transfer_errors = status.validate_document(transfer_without_learner)
    require(any("transfer evidence requires a completed learner run" in error for error in transfer_errors), "transfer without learner run was accepted")

    false_reference_aggregate = copy.deepcopy(document)
    false_reference_aggregate["labs"]["reference_run_status"] = "completed"
    reference_errors = status.validate_document(false_reference_aggregate)
    require(any("reference_run_status must equal derived item projection partial" in error for error in reference_errors), "one reference run was projected as full corpus completion")

    item_alias_drift = copy.deepcopy(document)
    item_alias_drift["labs"]["items"][0]["run_status"] = "completed"
    item_errors = status.validate_document(item_alias_drift)
    require(any("legacy run_status must equal learner_run_status" in error for error in item_errors), "item legacy alias drift was accepted")

    invented_reference = copy.deepcopy(document)
    invented_reference["labs"]["items"][0]["reference_run_status"] = "completed"
    invented_errors = status.validate_document(invented_reference)
    require(any("reference_run_status projections must exactly match registered" in error for error in invented_errors), "unregistered reference completion was accepted")

    invented_learner = copy.deepcopy(document)
    invented_learner["labs"]["items"][0]["learner_run_status"] = "completed"
    invented_learner["labs"]["items"][0]["run_status"] = "completed"
    invented_learner["labs"]["learner_run_status"] = "partial"
    invented_learner["labs"]["run_status"] = "partial"
    learner_errors = status.validate_document(invented_learner)
    require(any("learner_run_status projections must exactly match registered" in error for error in learner_errors), "unregistered learner completion was accepted")

    stale_evaluation_count = copy.deepcopy(document)
    stale_evaluation_count["evaluations"]["task_count"] = 39
    evaluation_errors = status.validate_document(stale_evaluation_count)
    require(any("task_count must equal the task set count" in error for error in evaluation_errors), "stale evaluation task count was accepted")

    print("CONTENT_STATUS_RUN_PROJECTION_TESTS_OK fixtures=8 reference=partial learner=not_run transfer=not_run")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
