"""Validate declared Skill-routing policy fixtures, not model trigger accuracy."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CONTRACT_PATH = ROOT / "docs/governance/skill-routing-contract.yaml"
SKILL_RE = re.compile(r"^prysai-[a-z0-9]+(?:-[a-z0-9]+)*$")


def load_contract(path: Path = CONTRACT_PATH) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("routing contract must contain an object")
    return value


def maps(contract: dict[str, Any]) -> tuple[dict[str, str], dict[str, set[str]]]:
    owners: dict[str, str] = {}
    handoffs: dict[str, set[str]] = {}
    for skill in contract.get("skills", []):
        owners[skill.get("intent", "")] = skill.get("id", "")
        handoffs[skill.get("id", "")] = set(skill.get("allowed_handoffs", []))
    return owners, handoffs


def has_cycle(graph: dict[str, set[str]]) -> bool:
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(node: str) -> bool:
        if node in visiting:
            return True
        if node in visited:
            return False
        visiting.add(node)
        for target in graph.get(node, set()):
            if visit(target):
                return True
        visiting.remove(node)
        visited.add(node)
        return False

    return any(visit(node) for node in graph)


def evaluate_fixture(contract: dict[str, Any], fixture: dict[str, Any]) -> dict[str, Any]:
    owners, handoffs = maps(contract)
    signals = fixture.get("signals", {})
    intents = signals.get("intents", [])
    explicit = signals.get("explicit_skill", "")
    safety = signals.get("safety_block", "")
    policy = signals.get("mixed_policy", "")
    inferred = owners.get(intents[0], "") if intents else ""
    selected = explicit or inferred
    if safety:
        return {"disposition": "blocked", "owner": selected, "handoffs": [], "segments": []}
    if explicit:
        return {"disposition": "route", "owner": explicit, "handoffs": [], "segments": []}
    if len(intents) == 1:
        return {"disposition": "route", "owner": inferred, "handoffs": [], "segments": []}
    if policy == "split":
        return {"disposition": "split", "owner": "", "handoffs": [], "segments": [{"intent": intent, "owner": owners.get(intent, "")} for intent in intents]}
    if policy == "coordinator":
        coordinator = owners.get("multi_stage_delivery", "")
        downstream = [owners.get(intent, "") for intent in intents if owners.get(intent, "") != coordinator]
        return {"disposition": "route", "owner": coordinator, "handoffs": downstream, "segments": []}
    if policy == "single_owner_handoff":
        downstream = [owners.get(intent, "") for intent in intents[1:]]
        return {"disposition": "route", "owner": inferred, "handoffs": downstream, "segments": []}
    if policy == "single_owner":
        return {"disposition": "route", "owner": inferred, "handoffs": [], "segments": []}
    return {"disposition": "invalid", "owner": "", "handoffs": [], "segments": []}


def evaluate_content_route(contract: dict[str, Any], fixture: dict[str, Any]) -> dict[str, str]:
    signals = fixture.get("signals", {})
    need = signals.get("content_need", "")
    platform = signals.get("platform", "")
    adapters = {
        item.get("id", ""): item.get("status", "")
        for item in contract.get("curriculum_routing", {}).get("platform_adapters", [])
    }
    if need == "transferable_workflow":
        return {"layer": "transferable_core", "platform": "", "claim_disposition": "allow"}
    if need == "platform_delta":
        disposition = "allow" if adapters.get(platform) == "candidate" else "source_required"
        return {"layer": "platform_adapter", "platform": platform, "claim_disposition": disposition}
    if need == "bounded_application":
        return {"layer": "application_playbook", "platform": platform, "claim_disposition": "allow"}
    if need == "cross_platform_equivalence":
        disposition = "allow" if signals.get("compatibility_evidence") else "reject_unsupported_equivalence"
        return {"layer": "platform_adapter", "platform": platform, "claim_disposition": disposition}
    return {"layer": "", "platform": platform, "claim_disposition": "invalid"}


def validate_contract(contract: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "1": errors.append("schema_version must be '1'")
    if contract.get("status") != "candidate": errors.append("routing contract must remain candidate")
    if contract.get("precedence") != ["safety", "explicit_skill", "single_primary_intent", "mixed_intent_split_or_coordinator"]:
        errors.append("precedence must keep safety above explicit Skill and implicit routing")
    curriculum = contract.get("curriculum_routing", {})
    layer_ids = [item.get("id") for item in curriculum.get("layers", [])]
    if layer_ids != ["transferable_core", "platform_adapter", "application_playbook"]:
        errors.append("curriculum routing must preserve core, adapter, and playbook layers")
    adapters = curriculum.get("platform_adapters", [])
    adapter_status = {item.get("id"): item.get("status") for item in adapters}
    if adapter_status != {"codex": "candidate", "claude-code": "proposed", "grok": "proposed"}:
        errors.append("platform adapter registry must keep Codex candidate and Claude Code/Grok proposed")
    if "Never infer" not in curriculum.get("equivalence_rule", ""):
        errors.append("curriculum routing must prohibit inferred platform equivalence")
    skills = contract.get("skills", [])
    if not isinstance(skills, list) or not skills: errors.append("skills must contain a non-empty record list"); skills = []
    skill_ids: set[str] = set(); intents: set[str] = set(); graph: dict[str, set[str]] = {}
    for skill in skills:
        sid = skill.get("id"); intent = skill.get("intent"); path = skill.get("skill_path")
        if not isinstance(sid, str) or not SKILL_RE.fullmatch(sid): errors.append(f"invalid skill id: {sid}"); continue
        if sid in skill_ids: errors.append(f"duplicate skill id: {sid}")
        skill_ids.add(sid)
        if not isinstance(intent, str) or not intent or intent in intents: errors.append(f"intent must have one owner: {intent}")
        intents.add(intent)
        if path != f"skills/{sid}/SKILL.md" or not (ROOT / path).is_file(): errors.append(f"{sid}: missing canonical SKILL.md")
        targets = skill.get("allowed_handoffs", [])
        if not isinstance(targets, list) or len(targets) != len(set(targets)): errors.append(f"{sid}: handoffs must be a unique list"); targets=[]
        if sid in targets: errors.append(f"{sid}: self handoff is forbidden")
        graph[sid] = set(targets)
    for source, targets in graph.items():
        for target in targets:
            if target not in skill_ids: errors.append(f"{source}: unknown handoff target {target}")
    if has_cycle(graph): errors.append("allowed handoff graph must be acyclic")

    fixtures = contract.get("fixtures", [])
    seen: set[str] = set(); single: set[str] = set(); neighbors: set[str] = set()
    explicit_owners: set[str] = set(); safety_owners: set[str] = set(); mixed_owners: set[str] = set()
    boundary_owners: dict[str, str] = {}
    content_needs: set[str] = set(); fixture_platforms: set[str] = set()
    kinds: set[str] = set()
    for fixture in fixtures:
        fid = fixture.get("id"); kind = fixture.get("kind"); kinds.add(kind)
        if not isinstance(fid, str) or not fid or fid in seen: errors.append(f"fixture id must be unique: {fid}"); continue
        seen.add(fid)
        signals = fixture.get("signals", {}); declared = signals.get("intents", [])
        for intent in declared:
            if intent not in intents: errors.append(f"{fid}: unknown declared intent {intent}")
        if kind == "single" and len(declared) == 1: single.add(declared[0])
        if kind == "near_neighbor" and len(declared) == 1: neighbors.add(declared[0])
        explicit = signals.get("explicit_skill", "")
        if explicit and explicit not in skill_ids: errors.append(f"{fid}: unknown explicit Skill {explicit}")
        if kind == "explicit" and explicit: explicit_owners.add(explicit)
        actual = evaluate_fixture(contract, fixture); expected = fixture.get("expected")
        if actual != expected: errors.append(f"{fid}: expected {expected}, policy derives {actual}")
        if kind == "curriculum_route":
            need = signals.get("content_need", "")
            content_needs.add(need)
            fixture_platforms.update(part for part in signals.get("platform", "").split(",") if part)
            unknown_platforms = fixture_platforms - set(adapter_status)
            if unknown_platforms: errors.append(f"{fid}: unknown platform adapter {sorted(unknown_platforms)}")
            content_actual = evaluate_content_route(contract, fixture)
            content_expected = fixture.get("expected_content_route")
            if content_actual != content_expected:
                errors.append(f"{fid}: expected content route {content_expected}, policy derives {content_actual}")
        owner = actual.get("owner", "")
        if kind == "safety" and owner: safety_owners.add(owner)
        if kind == "mixed" and owner: mixed_owners.add(owner)
        if kind == "boundary": boundary_owners[str(fid)] = owner
        handoff_list = actual.get("handoffs", [])
        if len(handoff_list) != len(set(handoff_list)): errors.append(f"{fid}: duplicate handoff owner")
        if owner and owner in handoff_list: errors.append(f"{fid}: owner cannot hand off to itself")
        if owner and any(target not in graph.get(owner, set()) for target in handoff_list): errors.append(f"{fid}: handoff is outside allowed graph")
        segment_owners = [segment.get("owner") for segment in actual.get("segments", [])]
        if len(segment_owners) != len(set(segment_owners)): errors.append(f"{fid}: split cannot assign duplicate owners")
    if single != intents: errors.append(f"single fixtures must cover all intents: missing={sorted(intents-single)}")
    if neighbors != intents: errors.append(f"near-neighbor fixtures must cover all intents: missing={sorted(intents-neighbors)}")
    for required in ("mixed", "explicit", "safety"):
        if required not in kinds: errors.append(f"fixtures need kind: {required}")
    for new_skill in ("prysai-dialogue-brief", "prysai-first-turn-check", "prysai-field-signal-curator", "prysai-platform-adapter-review", "prysai-communication-failure-triage", "prysai-prompt-card-editor"):
        if new_skill not in explicit_owners: errors.append(f"new Skill needs explicit fixture: {new_skill}")
        if new_skill not in safety_owners: errors.append(f"new Skill needs safety fixture: {new_skill}")
        if new_skill != "prysai-dialogue-brief" and new_skill not in mixed_owners: errors.append(f"new Skill needs mixed-owner fixture: {new_skill}")
    expected_boundaries = {
        "boundary-dialogue-brief-local-repository": "prysai-task-protocol",
        "boundary-dialogue-brief-current-rules": "prysai-source-investigator",
        "boundary-prompt-card-editor-personal-first-turn": "prysai-dialogue-brief",
    }
    if boundary_owners != expected_boundaries:
        errors.append(f"boundary fixtures must preserve personal, file, and current-fact ownership: {boundary_owners}")
    if content_needs != {"transferable_workflow", "platform_delta", "bounded_application", "cross_platform_equivalence"}:
        errors.append("curriculum fixtures must cover core, adapter, playbook, and equivalence boundaries")
    if fixture_platforms != set(adapter_status):
        errors.append(f"curriculum fixtures must name every adapter: missing={sorted(set(adapter_status)-fixture_platforms)}")
    return errors


def main() -> int:
    try: errors = validate_contract(load_contract())
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc: errors=[str(exc)]
    if errors:
        print("SKILL_ROUTING_CONTRACT_FAILED")
        for error in errors: print(f"- {error}")
        return 1
    contract=load_contract()
    single_count = sum(1 for fixture in contract["fixtures"] if fixture.get("kind") == "single")
    neighbor_count = sum(1 for fixture in contract["fixtures"] if fixture.get("kind") == "near_neighbor")
    curriculum_count = sum(1 for fixture in contract["fixtures"] if fixture.get("kind") == "curriculum_route")
    print(f"SKILL_ROUTING_CONTRACT_OK skills={len(contract['skills'])} fixtures={len(contract['fixtures'])} single={single_count} neighbors={neighbor_count} curriculum_routes={curriculum_count} status=candidate")
    print("evidence_boundary=declared-policy-and-curriculum-route-consistency; not model routing accuracy or cross-platform equivalence")
    return 0


if __name__ == "__main__": sys.exit(main())
