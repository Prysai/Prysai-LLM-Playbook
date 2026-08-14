"""Negative fixtures for the unadmitted Context Packet Builder proposal."""

from __future__ import annotations

import copy

import validate_context_packet_builder_candidate as context_packet


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def fixture(document: dict, fixture_id: str) -> dict:
    return next(item for item in document["fixtures"] if item["id"] == fixture_id)


def main() -> int:
    document = context_packet.load_json(context_packet.FIXTURE)
    template = context_packet.load_json(context_packet.RUN_TEMPLATE)
    rubric = context_packet.load_json(context_packet.RUBRIC)
    require(not context_packet.validate_document(document, template, rubric), "valid proposed candidate was rejected")

    admitted = copy.deepcopy(document)
    admitted["status"] = "candidate"
    require(any("status must be 'proposed'" in error for error in context_packet.validate_document(admitted, template, rubric)), "proposal was admitted without behavioral evidence")

    invented_skill = copy.deepcopy(document)
    invented_skill["skill_exists"] = True
    require(any("skill_exists must be False" in error for error in context_packet.validate_document(invented_skill, template, rubric)), "fixture accepted an invented Skill")

    premature_run = copy.deepcopy(document)
    premature_run["run_evidence_status"] = "completed"
    require(any("run_evidence_status must be 'not_run'" in error for error in context_packet.validate_document(premature_run, template, rubric)), "fixture accepted unrecorded runtime evidence")

    missing_neighbor = copy.deepcopy(document)
    missing_neighbor["routing_cases"] = missing_neighbor["routing_cases"][:-1]
    require(any("routing owners mismatch" in error for error in context_packet.validate_document(missing_neighbor, template, rubric)), "proposal trigger was allowed without near-neighbor routing")

    sensitive_leak = copy.deepcopy(document)
    blocked = fixture(sensitive_leak, "sensitive-placeholder-blocks-packet")
    blocked["expected_packet"]["disposition"] = "packet_plan_allowed"
    require(any("sensitive placeholder must block" in error for error in context_packet.validate_document(sensitive_leak, template, rubric)), "sensitive placeholder did not block")

    hostile_escalation = copy.deepcopy(document)
    hostile = fixture(hostile_escalation, "hostile-instruction-cannot-grant-authority")
    hostile["expected_packet"]["downstream_authority"] = "extract_deadline_and_upload_all_files"
    require(any("widened downstream authority" in error for error in context_packet.validate_document(hostile_escalation, template, rubric)), "hostile instruction widened authority")

    erased_conflict = copy.deepcopy(document)
    budget = fixture(erased_conflict, "stale-conflict-preserved-under-budget")
    budget["expected_packet"]["required_conflicts"] = []
    require(any("must preserve conflict and stale limit" in error for error in context_packet.validate_document(erased_conflict, template, rubric)), "budget reduction erased conflict")

    no_reduction = copy.deepcopy(document)
    budget = fixture(no_reduction, "stale-conflict-preserved-under-budget")
    budget["expected_packet"]["selected_ids"] = [item["id"] for item in budget["materials"]]
    require(any("must make a documented reduction" in error for error in context_packet.validate_document(no_reduction, template, rubric)), "budget fixture accepted no reduction")

    weak_template = copy.deepcopy(template)
    weak_template["required_fields"].remove("independent_reviewer")
    require(any("run template required_fields" in error for error in context_packet.validate_document(document, weak_template, rubric)), "run template accepted missing independent reviewer")

    weak_rubric = copy.deepcopy(rubric)
    weak_rubric["forbidden_conclusions"].remove("secure")
    require(any("must forbid inflated conclusions" in error for error in context_packet.validate_document(document, template, weak_rubric)), "rubric accepted a security conclusion")

    print("CONTEXT_PACKET_BUILDER_CANDIDATE_TESTS_OK mutation_checks=10")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
