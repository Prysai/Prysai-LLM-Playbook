"""Mutation checks for the Evidence Review policy simulation."""

from __future__ import annotations

import copy

import validate_evidence_review_candidate as evidence_review


def require(value: bool, message: str) -> None:
    if not value:
        raise AssertionError(message)


def case(document: dict, case_id: str) -> dict:
    return next(item for item in document["fixtures"] if item["id"] == case_id)


def rejected(document: dict, case_id: str) -> bool:
    return any(case_id in error for error in evidence_review.validate_document(document))


def main() -> int:
    base = evidence_review.load_fixture()
    require(not evidence_review.validate_document(base), "checked-in fixture is invalid")
    require(
        evidence_review.evaluate_case(case(base, "complete-fixed-task-policy-input"))["would_support_status"]
        == "demonstrated_on_this_task",
        "fixed-task policy output changed",
    )
    require(
        evidence_review.evaluate_case(case(base, "boolean-retention-assertion-is-insufficient"))["would_support_status"]
        is None,
        "Boolean retention assertion produced a status",
    )

    mismatched_transfer = copy.deepcopy(case(base, "complete-transfer-policy-input"))
    mismatched_transfer["requested_status"] = "transferred_to_train_booking"
    transfer_output = evidence_review.evaluate_case(mismatched_transfer)
    require(
        transfer_output["would_support_status"] == "transferred_to_restaurant_booking"
        and transfer_output["would_reject_status"] == "transferred_to_train_booking",
        "mismatched transfer scope was not rejected",
    )

    mismatched_retention = copy.deepcopy(case(base, "boolean-retention-assertion-is-insufficient"))
    mismatched_retention["packet"]["delayed_task_record"] = {
        "result": "pass",
        "unseen_recorded": True,
        "material_delta_recorded": True,
        "variation": "restaurant_booking",
        "rubric_revision": "restaurant-rubric-r1",
        "evidence_ref": "fixture://delayed-score/1",
        "delay": "7d",
    }
    mismatched_retention["requested_status"] = "retained_at_30d"
    retention_output = evidence_review.evaluate_case(mismatched_retention)
    require(
        retention_output["would_support_status"] == "retained_at_7d"
        and retention_output["would_reject_status"] == "retained_at_30d",
        "mismatched retention scope was not rejected",
    )

    mutations: list[tuple[str, dict, str]] = []

    inflated = copy.deepcopy(base)
    case(inflated, "single-pass-would-not-support-fluency")["expected_policy_output"]["would_support_status"] = "fluent"
    mutations.append(("inflated fluency", inflated, "single-pass-would-not-support-fluency"))

    incomplete = copy.deepcopy(base)
    case(incomplete, "incomplete-packet-policy-input")["expected_policy_output"]["would_support_status"] = "improved"
    mutations.append(("incomplete support", incomplete, "incomplete-packet-policy-input"))

    missing_aids = copy.deepcopy(base)
    case(missing_aids, "complete-fixed-task-policy-input")["packet"]["allowed_aids"] = []
    mutations.append(("missing aids declaration", missing_aids, "complete-fixed-task-policy-input"))

    near_copy = copy.deepcopy(base)
    case(near_copy, "complete-transfer-policy-input")["packet"]["changed_task_record"]["unseen_recorded"] = False
    mutations.append(("seen transfer", near_copy, "complete-transfer-policy-input"))

    unsupported_scorer = copy.deepcopy(base)
    case(unsupported_scorer, "complete-fixed-task-policy-input")["packet"]["scorer_record"]["independence_evidence_ref"] = None
    mutations.append(("unsupported scorer independence", unsupported_scorer, "complete-fixed-task-policy-input"))

    retention_boolean = copy.deepcopy(base)
    retention = case(retention_boolean, "boolean-retention-assertion-is-insufficient")
    retention["expected_policy_output"]["would_support_status"] = "retained_at_7d"
    mutations.append(("boolean retention", retention_boolean, "boolean-retention-assertion-is-insufficient"))

    coaching = copy.deepcopy(base)
    case(coaching, "fresh-context-coaching-handoff")["expected_policy_output"]["disposition"] = "review"
    mutations.append(("coaching retained", coaching, "fresh-context-coaching-handoff"))

    for label, document, case_id in mutations:
        require(rejected(document, case_id), f"mutation accepted: {label}")

    promoted = copy.deepcopy(base)
    promoted["runtime_evidence_status"] = "passed"
    promoted["learner_outcome_evidence"] = "verified"
    require(len(evidence_review.validate_document(promoted)) >= 2, "invented records were promoted")

    forbidden_key = copy.deepcopy(base)
    case(forbidden_key, "complete-fixed-task-policy-input")["expected_policy_output"]["claim_status"] = "verified"
    require(any("learner-facing result keys" in error for error in evidence_review.validate_document(forbidden_key)), "learner-facing verified key was accepted")

    asserted_boolean = copy.deepcopy(base)
    case(asserted_boolean, "complete-fixed-task-policy-input")["packet"]["fixed_task_passed"] = True
    require(not evidence_review.validate_document(asserted_boolean), "irrelevant asserted Boolean changed policy output")

    print("EVIDENCE_REVIEW_CANDIDATE_TESTS_OK mutation_checks=10")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
