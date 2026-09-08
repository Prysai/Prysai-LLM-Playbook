"""Negative fixtures for the machine-readable LLM foundation course contract."""

from __future__ import annotations

import copy

import validate_core_course as validator


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    course = validator.load_json(validator.COURSE_PATH)
    rubric = validator.load_json(validator.RUBRIC_PATH)
    fixture = validator.load_json(validator.FIXTURE_PATH)
    run_record_template = validator.load_json(validator.RUN_RECORD_TEMPLATE_PATH)

    require(validator.validate_course(course) == [], "valid core course was rejected")
    require(validator.validate_rubric(rubric) == [], "valid rubric was rejected")
    require(validator.validate_fixture(fixture) == [], "valid fixture was rejected")
    require(
        validator.validate_run_record_template(run_record_template, fixture) == [],
        "valid run record template was rejected",
    )

    duplicate_order = copy.deepcopy(course)
    duplicate_order["units"][1]["sequence"] = duplicate_order["units"][0]["sequence"]
    require(
        any("sequence" in error for error in validator.validate_course(duplicate_order)),
        "duplicate unit order was accepted",
    )

    missing_artifact = copy.deepcopy(course)
    missing_artifact["units"][0]["learner_artifact"] = ""
    require(
        any("learner_artifact" in error for error in validator.validate_course(missing_artifact)),
        "missing learner artifact was accepted",
    )

    too_many_concepts = copy.deepcopy(course)
    too_many_concepts["units"][0]["new_concepts"] = ["a", "b", "c", "d"]
    require(
        any("at most three" in error for error in validator.validate_course(too_many_concepts)),
        "four new concepts were accepted",
    )

    advanced_unit = copy.deepcopy(course)
    advanced_unit["units"][0]["scope_class"] = "advanced"
    require(
        any("scope_class" in error for error in validator.validate_course(advanced_unit)),
        "advanced content was accepted in the core route",
    )

    missing_route_link = copy.deepcopy(course)
    missing_route_link["units"][0]["route_marker"] = "missing-marker"
    require(
        any("route marker" in error for error in validator.validate_course(missing_route_link)),
        "missing route marker was accepted",
    )

    missing_case_type = copy.deepcopy(fixture)
    missing_case_type["cases"][0]["case_type"] = "other"
    require(
        any("case_type" in error for error in validator.validate_fixture(missing_case_type)),
        "unsupported fixture case type was accepted",
    )

    wrong_status = copy.deepcopy(fixture)
    wrong_status["run_status"] = "complete"
    require(
        any("run_status" in error for error in validator.validate_fixture(wrong_status)),
        "unrun fixture status was allowed to become complete",
    )

    wrong_record_candidate = copy.deepcopy(run_record_template)
    wrong_record_candidate["candidate_id"] = "other-candidate"
    require(
        any("candidate_id" in error for error in validator.validate_run_record_template(wrong_record_candidate, fixture)),
        "run record candidate mismatch was accepted",
    )

    wrong_record_revision = copy.deepcopy(run_record_template)
    wrong_record_revision["fixture_revision"] = "1"
    require(
        any("fixture_revision" in error for error in validator.validate_run_record_template(wrong_record_revision, fixture)),
        "run record fixture revision mismatch was accepted",
    )

    completed_record = copy.deepcopy(run_record_template)
    completed_record["run_status"] = "complete"
    require(
        any("run_status" in error for error in validator.validate_run_record_template(completed_record, fixture)),
        "blank run record was allowed to claim completion",
    )

    missing_record_field = copy.deepcopy(run_record_template)
    del missing_record_field["limits"]
    require(
        any("missing fields" in error for error in validator.validate_run_record_template(missing_record_field, fixture)),
        "incomplete run record template was accepted",
    )

    scored_blank_record = copy.deepcopy(run_record_template)
    scored_blank_record["rubric_scores"]["transfer"] = 2
    require(
        any("only null" in error for error in validator.validate_run_record_template(scored_blank_record, fixture)),
        "blank run record carried a learner score",
    )

    print("CORE_COURSE_TESTS_OK fixtures=12")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
