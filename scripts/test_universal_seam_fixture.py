"""Exercise Universal Seam Fixture rejection at its data-contract boundary."""

from __future__ import annotations

import copy

import validate_universal_seam_fixture as fixture


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    cases = fixture.load(fixture.FIXTURE)
    acceptance = fixture.load(fixture.ACCEPTANCE)
    require(not fixture.validate(cases, acceptance), "checked-in fixture is invalid")

    missing_case = copy.deepcopy(cases)
    missing_case["cases"].pop()
    require(any("case IDs" in item for item in fixture.validate(missing_case, acceptance)), "missing case was accepted")

    widened_status = copy.deepcopy(cases)
    widened_status["cases"][2]["expected_status"] = "verified_in_fixture"
    require(any("does not match acceptance" in item for item in fixture.validate(widened_status, acceptance)), "widened not_run status was accepted")

    weak_stop = copy.deepcopy(cases)
    weak_stop["cases"][2]["stop_condition"] = "No evidence exists."
    require(any("missing receipt" in item for item in fixture.validate(weak_stop, acceptance)), "not_run case without receipt stop was accepted")

    overclaim = copy.deepcopy(cases)
    overclaim["evidence_boundary"] += " It is production-ready."
    require(any("forbidden broad claim" in item for item in fixture.validate(overclaim, acceptance)), "production claim was accepted")

    print("UNIVERSAL_SEAM_FIXTURE_TESTS_OK positive=1 negative=4")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
