"""Validate the single machine-readable L0-L6 learning path contract."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
PATH_FILE = ROOT / "docs/governance/learning-path.yaml"
STATUS_FILE = ROOT / "docs/governance/content-status.yaml"
EVAL_FILE = ROOT / "evals/task-set-v1.yaml"
LEVELS = [f"L{i}" for i in range(7)]
ARTIFACT_STATUSES = {"draft", "candidate", "verified", "production-ready"}
RELATIONS = {"primary", "supporting", "prerequisite", "transfer", "reference"}
EVALUATION_TYPES = {"positive", "boundary", "failure", "transfer"}


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def nonempty(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def bilingual(value: Any) -> bool:
    return isinstance(value, dict) and nonempty(value.get("en")) and nonempty(value.get("zh"))


def ids_from_status(document: dict[str, Any], section_name: str) -> set[str]:
    section = document.get(section_name, {})
    return {item.get("id") for item in section.get("items", []) if isinstance(item, dict)}


def find_cycle(graph: dict[str, list[str]]) -> list[str] | None:
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []

    def visit(node: str) -> list[str] | None:
        if node in visiting:
            start = stack.index(node)
            return stack[start:] + [node]
        if node in visited:
            return None
        visiting.add(node)
        stack.append(node)
        for dependency in graph.get(node, []):
            cycle = visit(dependency)
            if cycle:
                return cycle
        stack.pop()
        visiting.remove(node)
        visited.add(node)
        return None

    for node in graph:
        cycle = visit(node)
        if cycle:
            return cycle
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--contract", type=Path, default=PATH_FILE, help=argparse.SUPPRESS)
    args = parser.parse_args()
    errors: list[str] = []
    try:
        path = load_json(args.contract)
        status = load_json(STATUS_FILE)
        evaluations = load_json(EVAL_FILE)
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print("LEARNING_PATH_FAILED")
        print(f"- cannot parse learning-path inputs: {exc}")
        return 1

    if not isinstance(path, dict):
        errors.append("root: learning path must be an object")
        path = {}
    if path.get("schema_version") != "2":
        errors.append("root: schema_version must be '2'")
    if path.get("status") not in ARTIFACT_STATUSES:
        errors.append("root: status must use the controlled artifact vocabulary")
    if path.get("relation_vocabulary") != ["primary", "supporting", "prerequisite", "transfer", "reference"]:
        errors.append("root: relation_vocabulary must use primary, supporting, prerequisite, transfer, reference")
    for field in ("description", "owner", "last_reviewed", "next_review"):
        if not nonempty(path.get(field)):
            errors.append(f"root: {field} must be non-empty")
    evidence = path.get("evidence")
    if not isinstance(evidence, list) or not evidence:
        errors.append("root: evidence must be a non-empty list")
    else:
        for evidence_path in evidence:
            if not isinstance(evidence_path, str) or not (ROOT / evidence_path).exists():
                errors.append(f"root: evidence path does not exist: {evidence_path}")

    levels = path.get("levels")
    if not isinstance(levels, list) or [item.get("id") for item in levels if isinstance(item, dict)] != LEVELS:
        errors.append("levels: must contain L0 through L6 exactly once and in order")
        levels = []

    chapter_ids = ids_from_status(status, "chapters")
    lab_ids = ids_from_status(status, "labs")
    skill_ids = ids_from_status(status, "skills")
    task_rows = evaluations.get("tasks", []) if isinstance(evaluations, dict) else []
    task_ids = {item.get("id") for item in task_rows if isinstance(item, dict)}
    task_levels = {item.get("id"): item.get("level") for item in task_rows if isinstance(item, dict)}

    chapter_primary: dict[str, str] = {}
    lab_first_level: dict[str, str] = {}
    lab_use_deltas: dict[str, dict[str, set[str]]] = {}
    lab_use_count = 0
    task_owner: dict[str, str] = {}
    graph: dict[str, list[str]] = {}
    all_labs: set[str] = set()

    for index, item in enumerate(levels, start=1):
        label = f"levels[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{label}: must be an object")
            continue
        level = item.get("id")
        if not bilingual(item.get("name")) or not bilingual(item.get("short")) or not bilingual(item.get("headline")) or not bilingual(item.get("capability")):
            errors.append(f"{label}: name, short, headline, and capability must have en and zh text")
        if item.get("status") not in ARTIFACT_STATUSES:
            errors.append(f"{label}: status must use the controlled artifact vocabulary")
        prerequisites = item.get("prerequisites")
        if not isinstance(prerequisites, list) or not all(isinstance(value, str) for value in prerequisites):
            errors.append(f"{label}: prerequisites must be a list of level IDs")
            prerequisites = []
        graph[level] = prerequisites
        expected_prerequisite = [] if level == "L0" else [f"L{int(level[1:]) - 1}"]
        if prerequisites != expected_prerequisite:
            errors.append(f"{label}: prerequisites must be {expected_prerequisite}")
        for dependency in prerequisites:
            if dependency not in LEVELS:
                errors.append(f"{label}: unknown prerequisite {dependency}")

        for field in ("primary_chapters", "lab_uses", "supporting_skills", "evaluation_tasks", "evaluation_types"):
            value = item.get(field)
            if not isinstance(value, list) or not value:
                errors.append(f"{label}: {field} must be a non-empty list")

        primary_chapters = item.get("primary_chapters", [])
        if isinstance(primary_chapters, list):
            for chapter_id in primary_chapters:
                if chapter_id not in chapter_ids:
                    errors.append(f"{label}: unknown chapter {chapter_id}")
                elif chapter_id in chapter_primary:
                    errors.append(f"chapter {chapter_id}: primary owner repeated by {chapter_primary[chapter_id]} and {level}")
                else:
                    chapter_primary[chapter_id] = level

        if "primary_labs" in item or "supporting_labs" in item:
            errors.append(f"{label}: legacy primary_labs/supporting_labs fields are not allowed; use lab_uses")
        lab_uses = item.get("lab_uses", [])
        level_lab_ids: set[str] = set()
        primary_count = 0
        if isinstance(lab_uses, list):
            for use_index, use in enumerate(lab_uses, start=1):
                use_label = f"{label}.lab_uses[{use_index}]"
                lab_use_count += 1
                if not isinstance(use, dict):
                    errors.append(f"{use_label}: must be an object")
                    continue
                if set(use) != {"id", "relation", "first_seen", "new_capability", "new_artifact", "new_acceptance"}:
                    errors.append(f"{use_label}: must contain only id, relation, first_seen, new_capability, new_artifact, and new_acceptance")
                lab_id = use.get("id")
                relation = use.get("relation")
                first_seen = use.get("first_seen")
                if lab_id in level_lab_ids:
                    errors.append(f"{use_label}: lab {lab_id} is repeated within {level}")
                level_lab_ids.add(lab_id)
                if lab_id not in lab_ids:
                    errors.append(f"{use_label}: unknown lab {lab_id}")
                else:
                    all_labs.add(lab_id)
                if relation not in {"primary", "supporting"}:
                    errors.append(f"{use_label}: relation must be primary or supporting")
                if relation == "primary":
                    primary_count += 1
                for delta_field in ("new_capability", "new_artifact", "new_acceptance"):
                    if not bilingual(use.get(delta_field)):
                        errors.append(f"{use_label}: {delta_field} must have non-empty en and zh text")
                if lab_id in lab_ids:
                    if lab_id not in lab_first_level:
                        lab_first_level[lab_id] = level
                    if first_seen != lab_first_level[lab_id]:
                        errors.append(f"{use_label}: first_seen must remain {lab_first_level[lab_id]} for {lab_id}")
                    prior_deltas = lab_use_deltas.setdefault(lab_id, {
                        "new_capability": set(), "new_artifact": set(), "new_acceptance": set()
                    })
                    for delta_field in ("new_capability", "new_artifact", "new_acceptance"):
                        delta_value = (use.get(delta_field) or {}).get("en", "").strip() if isinstance(use.get(delta_field), dict) else ""
                        if delta_value in prior_deltas[delta_field]:
                            errors.append(f"{use_label}: repeated use of {lab_id} must declare a distinct {delta_field}")
                        prior_deltas[delta_field].add(delta_value)
        if primary_count != 1:
            errors.append(f"{label}: lab_uses must contain exactly one primary relation; found {primary_count}")

        for skill_id in item.get("supporting_skills", []):
            if skill_id not in skill_ids:
                errors.append(f"{label}: unknown Skill {skill_id}")

        for task_id in item.get("evaluation_tasks", []):
            if task_id not in task_ids:
                errors.append(f"{label}: unknown evaluation task {task_id}")
            elif task_id in task_owner:
                errors.append(f"evaluation task {task_id}: repeated by {task_owner[task_id]} and {level}")
            else:
                task_owner[task_id] = level
                if task_levels.get(task_id) != level:
                    errors.append(f"evaluation task {task_id}: contract level {level} disagrees with fixture level {task_levels.get(task_id)}")

        evaluation_types = item.get("evaluation_types", [])
        if isinstance(evaluation_types, list):
            for evaluation_type in evaluation_types:
                if evaluation_type not in EVALUATION_TYPES:
                    errors.append(f"{label}: unknown evaluation type {evaluation_type}")

        evidence_gate = item.get("evidence_gate")
        if not isinstance(evidence_gate, dict) or set(evidence_gate) != {"explain", "operate", "judge", "review"}:
            errors.append(f"{label}: evidence_gate must contain explain, operate, judge, and review")
        else:
            for evidence_name, evidence_value in evidence_gate.items():
                if not bilingual(evidence_value):
                    errors.append(f"{label}: evidence_gate.{evidence_name} must have en and zh text")
        for field in ("graduation_gate", "blocked_when"):
            if not bilingual(item.get(field)):
                errors.append(f"{label}: {field} must have en and zh text")
        if level == "L6":
            if item.get("next_level") is not None:
                errors.append("levels[L6]: next_level must be null")
        elif item.get("next_level") != f"L{int(level[1:]) + 1}":
            errors.append(f"{label}: next_level must point to the next level")

    if len(chapter_primary) != len(chapter_ids):
        missing = sorted(chapter_ids - chapter_primary.keys())
        errors.append(f"chapters: every registered chapter needs one primary level; missing {missing}")
    if not lab_ids.issubset(all_labs):
        errors.append(f"labs: every registered lab must be primary or supporting; missing {sorted(lab_ids - all_labs)}")
    if len(task_owner) != len(task_ids):
        errors.append(f"evaluations: every fixture needs one level owner; missing {sorted(task_ids - task_owner.keys())}")

    cycle = find_cycle(graph)
    if cycle:
        errors.append(f"levels: prerequisite cycle detected: {' -> '.join(cycle)}")

    if errors:
        print("LEARNING_PATH_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("LEARNING_PATH_OK")
    reused_labs = sum(1 for deltas in lab_use_deltas.values() if len(deltas["new_capability"]) > 1)
    print(f"levels={len(levels)} chapters={len(chapter_primary)} labs={len(lab_ids)} lab_uses={lab_use_count} reused_labs={reused_labs} skills={len(skill_ids)} evaluations={len(task_owner)}")
    print("lab_uses=relation, first_seen, new_capability, new_artifact, new_acceptance; statuses remain independent from runtime mastery evidence")
    return 0


if __name__ == "__main__":
    sys.exit(main())
