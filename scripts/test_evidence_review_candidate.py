"""Negative fixtures for the Evidence Review candidate policy."""

from __future__ import annotations

import copy

import validate_evidence_review_candidate as evidence_review


def require(value: bool, message: str) -> None:
    if not value:
        raise AssertionError(message)


def case(document: dict, case_id: str) -> dict:
    return next(item for item in document["fixtures"] if item["id"] == case_id)


def main() -> int:
    base = evidence_review.load_fixture()
    require(not evidence_review.validate_document(base), "checked-in fixture is invalid")

    inflated = copy.deepcopy(base)
    case(inflated, "boundary-single-pass-is-not-fluency")["expected"]["learning_status"] = "fluent"
    require(any("boundary-single-pass" in error for error in evidence_review.validate_document(inflated)), "fluency inflation was accepted")

    incomplete = copy.deepcopy(base)
    case(incomplete, "failure-incomplete-packet")["expected"]["claim_status"] = "verified"
    require(any("failure-incomplete" in error for error in evidence_review.validate_document(incomplete)), "incomplete packet was verified")

    empty_hints = copy.deepcopy(base)
    require(
        not evidence_review.validate_document(empty_hints),
        "an empty but declared hint ledger was treated as missing",
    )

    missing_aids = copy.deepcopy(base)
    positive = case(missing_aids, "positive-fixed-task-pass")
    positive["packet"]["allowed_aids"] = []
    require(
        any("positive-fixed-task-pass" in error for error in evidence_review.validate_document(missing_aids)),
        "an empty allowed-aids declaration was accepted",
    )

    near_copy = copy.deepcopy(base)
    transfer = case(near_copy, "transfer-unseen-restaurant-pass")
    transfer["packet"]["changed_case_task"]["unseen"] = False
    require(any("transfer-unseen" in error for error in evidence_review.validate_document(near_copy)), "seen variation was accepted as transfer")

    self_score = copy.deepcopy(base)
    positive = case(self_score, "positive-fixed-task-pass")
    positive["packet"]["scorer"] = {"id": "same-model", "role": "model_self_score", "independent_from_coach": False}
    require(any("positive-fixed-task-pass" in error for error in evidence_review.validate_document(self_score)), "model self-score was accepted as independent evidence")

    asserted_boolean = copy.deepcopy(base)
    positive = case(asserted_boolean, "positive-fixed-task-pass")
    positive["packet"]["fixed_task_passed"] = True
    positive["packet"]["rubric_scores"]["understandable"] = 0
    positive["packet"]["rubric_scores"]["breakfast_question"] = 0
    require(any("positive-fixed-task-pass" in error for error in evidence_review.validate_document(asserted_boolean)), "asserted pass overrode rubric scores")

    coaching = copy.deepcopy(base)
    case(coaching, "fresh-context-coaching-handoff")["expected"]["disposition"] = "review"
    require(any("fresh-context" in error for error in evidence_review.validate_document(coaching)), "coaching request was retained by Evidence Review")

    promoted = copy.deepcopy(base)
    promoted["runtime_evidence_status"] = "passed"
    promoted["status"] = "verified"
    errors = evidence_review.validate_document(promoted)
    require(any("preserved method-loaded blind run" in error for error in errors) and any("candidate" in error for error in errors), "single-turn runtime was promoted")

    print("EVIDENCE_REVIEW_CANDIDATE_TESTS_OK fixtures=9")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
