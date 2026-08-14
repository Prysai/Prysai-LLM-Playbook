"""Negative fixtures for deterministic Skill-routing policy."""

from __future__ import annotations
import copy
import validate_skill_routing_contract as routing

def require(value: bool, message: str) -> None:
    if not value: raise AssertionError(message)

def main() -> int:
    base=routing.load_contract(); require(not routing.validate_contract(base), "checked-in contract invalid")
    duplicate=copy.deepcopy(base); duplicate["skills"][1]["intent"]=duplicate["skills"][0]["intent"]
    require(any("one owner" in e for e in routing.validate_contract(duplicate)), "multi-owner intent accepted")
    loop=copy.deepcopy(base)
    # Add a back edge to a checked-in forward edge. Choosing fixed indexes made
    # this fixture silently stop being cyclic when the Skill registry grew.
    source=next(skill for skill in loop["skills"] if skill["allowed_handoffs"])
    target=source["allowed_handoffs"][0]
    target_record=next(skill for skill in loop["skills"] if skill["id"] == target)
    target_record["allowed_handoffs"].append(source["id"])
    require(any("acyclic" in e for e in routing.validate_contract(loop)), "routing loop accepted")
    self_handoff=copy.deepcopy(base); self_handoff["skills"][0]["allowed_handoffs"].append(self_handoff["skills"][0]["id"])
    require(any("self handoff" in e for e in routing.validate_contract(self_handoff)), "self handoff accepted")
    dialogue_learning=copy.deepcopy(base); fixture=next(x for x in dialogue_learning["fixtures"] if x["id"]=="mixed-dialogue-learning"); fixture["expected"]["owner"]="prysai-dialogue-brief"
    require(any("mixed-dialogue-learning" in e for e in routing.validate_contract(dialogue_learning)), "learning request was routed through Dialogue Brief")
    local_repository=copy.deepcopy(base); fixture=next(x for x in local_repository["fixtures"] if x["id"]=="boundary-dialogue-brief-local-repository"); fixture["expected"]["owner"]="prysai-dialogue-brief"
    require(any("boundary-dialogue-brief-local-repository" in e for e in routing.validate_contract(local_repository)), "local repository boundary routed through Dialogue Brief")
    current_rules=copy.deepcopy(base); fixture=next(x for x in current_rules["fixtures"] if x["id"]=="boundary-dialogue-brief-current-rules"); fixture["expected"]["owner"]="prysai-dialogue-brief"
    require(any("boundary-dialogue-brief-current-rules" in e for e in routing.validate_contract(current_rules)), "current-facts boundary routed through Dialogue Brief")
    first_turn_rewrite=copy.deepcopy(base); fixture=next(x for x in first_turn_rewrite["fixtures"] if x["id"]=="explicit-first-turn-check-wins"); fixture["expected"]["owner"]="prysai-dialogue-brief"
    require(any("explicit-first-turn-check-wins" in e for e in routing.validate_contract(first_turn_rewrite)), "First-Turn Check was silently replaced by drafting")
    first_turn_safety=copy.deepcopy(base); fixture=next(x for x in first_turn_safety["fixtures"] if x["id"]=="safety-over-first-turn-check"); fixture["expected"]["disposition"]="route"
    require(any("safety-over-first-turn-check" in e for e in routing.validate_contract(first_turn_safety)), "First-Turn Check bypassed a safety block")
    false_explicit=copy.deepcopy(base); fixture=next(x for x in false_explicit["fixtures"] if x["id"]=="explicit-wins"); fixture["expected"]["owner"]="prysai-research-router"
    require(any("explicit-wins" in e for e in routing.validate_contract(false_explicit)), "implicit route overrode explicit Skill")
    false_safety=copy.deepcopy(base); fixture=next(x for x in false_safety["fixtures"] if x["id"]=="safety-over-explicit"); fixture["expected"]["disposition"]="route"
    require(any("safety-over-explicit" in e for e in routing.validate_contract(false_safety)), "explicit Skill overrode safety")
    duplicate_split=copy.deepcopy(base); fixture=next(x for x in duplicate_split["fixtures"] if x["id"]=="mixed-independent"); fixture["expected"]["segments"][1]["owner"]="prysai-learning-coach"
    require(any("mixed-independent" in e for e in routing.validate_contract(duplicate_split)), "mixed intent assigned duplicate owners")
    promoted=copy.deepcopy(base); promoted["status"]="verified"
    require(any("candidate" in e for e in routing.validate_contract(promoted)), "fixture contract promoted to verified")
    wrong_core=copy.deepcopy(base); fixture=next(x for x in wrong_core["fixtures"] if x["id"]=="curriculum-transferable-core"); fixture["expected_content_route"]["layer"]="platform_adapter"
    require(any("curriculum-transferable-core" in e for e in routing.validate_contract(wrong_core)), "transferable core misrouted to adapter")
    unsupported_equivalence=copy.deepcopy(base); fixture=next(x for x in unsupported_equivalence["fixtures"] if x["id"]=="curriculum-reject-equivalence"); fixture["expected_content_route"]["claim_disposition"]="allow"
    require(any("curriculum-reject-equivalence" in e for e in routing.validate_contract(unsupported_equivalence)), "unsupported platform equivalence accepted")
    unknown_platform=copy.deepcopy(base); fixture=next(x for x in unknown_platform["fixtures"] if x["id"]=="curriculum-codex-adapter"); fixture["signals"]["platform"]="imaginary-platform"; fixture["expected_content_route"]["platform"]="imaginary-platform"; fixture["expected_content_route"]["claim_disposition"]="source_required"
    require(any("unknown platform adapter" in e for e in routing.validate_contract(unknown_platform)), "unknown platform adapter accepted")
    wrong_status=copy.deepcopy(base); wrong_status["curriculum_routing"]["platform_adapters"][1]["status"]="candidate"
    require(any("Claude Code/Grok proposed" in e for e in routing.validate_contract(wrong_status)), "proposed adapter silently promoted")
    print("SKILL_ROUTING_CONTRACT_TESTS_OK fixtures=14")
    return 0
if __name__ == "__main__": raise SystemExit(main())
