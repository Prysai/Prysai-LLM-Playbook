"""Build frozen, randomized input packets for the Shift Handoff candidate pilot.

This tool prepares prompts only. It never calls a model, times a run, scores an
artifact, or produces an effectiveness result. The output is deliberately
written to a new directory so a later model round can retain the exact prompt,
randomization order, input hash, and candidate SHA that it actually used.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import random
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FIXTURE_PATH = ROOT / "evals" / "candidates" / "shift-handoff-v1" / "fixture.json"
LEGACY_PACKET_GENERATOR_REVISION = "shift-handoff-run-packets-v1"
PACKET_GENERATOR_REVISION = "shift-handoff-run-packets-v2"
PROMPT_HASH_SCOPE = "sha256:utf-8-bytes:lf-newlines"
CONDITIONS = ("baseline", "shift_handoff")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
PACKET_ID_RE = re.compile(r"^SHP-[BH]-\d{2}-R\d+$")


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.name} must contain a JSON object")
    return value


def sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def validate_fixture(fixture: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if fixture.get("fixture_id") != "shift-handoff-v1":
        errors.append("fixture_id must be shift-handoff-v1")
    if fixture.get("status") != "candidate" or fixture.get("run_evidence_status") != "not_run":
        errors.append("fixture must retain candidate/not_run status")
    if fixture.get("packet_generator_revision") != PACKET_GENERATOR_REVISION:
        errors.append("fixture packet_generator_revision is missing or drifted")
    if set(fixture.get("allowed_conditions", [])) != set(CONDITIONS):
        errors.append("fixture must define baseline and shift_handoff conditions")

    contract = fixture.get("condition_prompt_contract")
    if not isinstance(contract, dict):
        errors.append("fixture must define a condition_prompt_contract")
    else:
        shared = contract.get("shared")
        if not isinstance(shared, list) or len(shared) != 4 or not all(isinstance(item, str) and item for item in shared):
            errors.append("condition_prompt_contract.shared must contain four non-empty common instructions")
        for condition, expected_layout in (("baseline", "conventional_brief"), ("shift_handoff", "stable_current_cards")):
            specification = contract.get(condition)
            if not isinstance(specification, dict):
                errors.append(f"condition_prompt_contract.{condition} must be an object")
                continue
            if specification.get("layout") != expected_layout:
                errors.append(f"condition_prompt_contract.{condition}.layout must be {expected_layout}")
            if not isinstance(specification.get("purpose"), str) or not specification["purpose"].strip():
                errors.append(f"condition_prompt_contract.{condition}.purpose must be non-empty")

    tasks = fixture.get("tasks")
    if not isinstance(tasks, list) or len(tasks) != 3:
        errors.append("fixture must contain exactly three tasks")
    else:
        task_ids: set[str] = set()
        for task in tasks:
            if not isinstance(task, dict):
                errors.append("fixture tasks must be objects")
                continue
            task_id = task.get("id")
            if not isinstance(task_id, str) or not task_id:
                errors.append("fixture task is missing id")
            elif task_id in task_ids:
                errors.append(f"fixture has duplicate task id {task_id}")
            else:
                task_ids.add(task_id)
            for field in ("stable_criteria", "current_item", "expected_boundary", "required_receipt_fields"):
                if not task.get(field):
                    errors.append(f"fixture task {task_id or '<unknown>'} is missing {field}")
    return errors


def rendered_list(values: list[str]) -> str:
    return "\n".join(f"- {value}" for value in values)


def receipt_fields(task: dict[str, Any]) -> str:
    return ", ".join(f"`{field}`" for field in task["required_receipt_fields"])


def render_prompt(fixture: dict[str, Any], task: dict[str, Any], condition: str) -> str:
    contract = fixture["condition_prompt_contract"]
    shared = rendered_list(contract["shared"])
    if condition == "baseline":
        body = f"""This is a conventional internal handoff brief. Keep the supplied facts in one working brief; do not use a Stable Card or Current Card heading.

Recurring criteria:
{rendered_list(task['stable_criteria'])}

Current situation:
{task['current_item']}

Expected boundary:
{task['expected_boundary']}
"""
    elif condition == "shift_handoff":
        body = f"""Use the Shift Handoff method. Keep reusable criteria and today's changing item visibly separate.

Stable Card — recurring criteria:
{rendered_list(task['stable_criteria'])}

Current Card — today only:
{task['current_item']}

Authority and stop boundary:
{task['expected_boundary']}
"""
    else:
        raise ValueError(f"unsupported condition: {condition}")

    return f"""# Shift Handoff candidate pilot input

{shared}

{body}
Return one concise internal handoff receipt. It must name these fields: {receipt_fields(task)}.
Do not add a public date, choose between conflicting facts, grant access, promise an action, or state that anything outside this receipt has been completed.
"""


def build_run_order(fixture: dict[str, Any], *, seed: int, repetitions: int) -> list[dict[str, Any]]:
    if repetitions != 3:
        raise ValueError("repetitions must be exactly 3 for the frozen v1 protocol")
    entries: list[dict[str, Any]] = []
    for task_index, task in enumerate(fixture["tasks"], start=1):
        for repetition in range(1, repetitions + 1):
            for condition in CONDITIONS:
                code = "B" if condition == "baseline" else "H"
                entries.append(
                    {
                        "packet_id": f"SHP-{code}-{task_index:02d}-R{repetition}",
                        "condition": condition,
                        "task_id": task["id"],
                        "repetition": repetition,
                        "prompt": render_prompt(fixture, task, condition),
                    }
                )
    random.Random(seed).shuffle(entries)
    for index, entry in enumerate(entries, start=1):
        entry["run_order"] = index
        entry["prompt_path"] = f"packets/{index:02d}-{entry['packet_id']}.md"
        entry["prompt_sha256"] = sha256_text(entry.pop("prompt"))
    return entries


def validate_manifest(manifest: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if manifest.get("schema_version") != "1":
        errors.append("manifest schema_version must be 1")
    if manifest.get("status") != "not_run":
        errors.append("manifest status must remain not_run")
    if manifest.get("fixture_id") != "shift-handoff-v1":
        errors.append("manifest fixture_id must be shift-handoff-v1")
    revision = manifest.get("packet_generator_revision")
    if revision not in {LEGACY_PACKET_GENERATOR_REVISION, PACKET_GENERATOR_REVISION}:
        errors.append("manifest packet_generator_revision is unsupported")
    elif revision == PACKET_GENERATOR_REVISION and manifest.get("prompt_hash_scope") != PROMPT_HASH_SCOPE:
        errors.append("v2 manifest prompt_hash_scope must declare UTF-8 LF bytes")
    if not isinstance(manifest.get("candidate_sha"), str) or not SHA_RE.fullmatch(manifest["candidate_sha"]):
        errors.append("manifest candidate_sha must be a lowercase 40-character SHA")
    if not isinstance(manifest.get("randomization_seed"), int):
        errors.append("manifest randomization_seed must be an integer")
    if manifest.get("repetitions_per_task_condition") != 3:
        errors.append("manifest repetitions_per_task_condition must be 3")
    packets = manifest.get("packets")
    if not isinstance(packets, list) or len(packets) != 18:
        errors.append("manifest must contain exactly 18 packets")
        return errors
    seen_ids: set[str] = set()
    expected_order = list(range(1, 19))
    actual_order: list[int] = []
    counts = {condition: 0 for condition in CONDITIONS}
    for packet in packets:
        if not isinstance(packet, dict):
            errors.append("manifest packets must be objects")
            continue
        packet_id = packet.get("packet_id")
        if not isinstance(packet_id, str) or not PACKET_ID_RE.fullmatch(packet_id):
            errors.append("packet_id must use the SHP-B/H-XX-RX form")
        elif packet_id in seen_ids:
            errors.append(f"manifest has duplicate packet_id {packet_id}")
        else:
            seen_ids.add(packet_id)
        condition = packet.get("condition")
        if condition not in CONDITIONS:
            errors.append("packet condition must be baseline or shift_handoff")
        else:
            counts[condition] += 1
        if not isinstance(packet.get("task_id"), str) or not packet["task_id"]:
            errors.append("packet task_id must be non-empty")
        if packet.get("repetition") not in {1, 2, 3}:
            errors.append("packet repetition must be 1, 2, or 3")
        if not isinstance(packet.get("run_order"), int):
            errors.append("packet run_order must be an integer")
        else:
            actual_order.append(packet["run_order"])
        if not isinstance(packet.get("prompt_path"), str) or not packet["prompt_path"].startswith("packets/"):
            errors.append("packet prompt_path must be a packets/ relative path")
        if not isinstance(packet.get("prompt_sha256"), str) or not re.fullmatch(r"[0-9a-f]{64}", packet["prompt_sha256"]):
            errors.append("packet prompt_sha256 must be lowercase SHA-256")
    if actual_order != expected_order:
        errors.append("packet run_order must be exactly 1 through 18")
    if counts != {"baseline": 9, "shift_handoff": 9}:
        errors.append("manifest must contain nine packets for each condition")
    return errors


def write_packets(output_dir: Path, fixture: dict[str, Any], *, candidate_sha: str, seed: int, repetitions: int) -> Path:
    if output_dir.exists() and any(output_dir.iterdir()):
        raise ValueError("output directory already contains files; do not overwrite a prepared run packet")
    if not SHA_RE.fullmatch(candidate_sha):
        raise ValueError("candidate_sha must be a lowercase 40-character commit SHA")
    packets = build_run_order(fixture, seed=seed, repetitions=repetitions)
    output_dir.mkdir(parents=True, exist_ok=True)
    for packet in packets:
        task = next(task for task in fixture["tasks"] if task["id"] == packet["task_id"])
        prompt = render_prompt(fixture, task, packet["condition"])
        if sha256_text(prompt) != packet["prompt_sha256"]:
            raise ValueError(f"prompt hash changed while preparing {packet['packet_id']}")
        path = output_dir / packet["prompt_path"]
        path.parent.mkdir(parents=True, exist_ok=True)
        # The hash is a byte-level binding.  Explicit LF serialization avoids
        # Windows text-mode conversion silently invalidating it after write.
        path.write_text(prompt, encoding="utf-8", newline="\n")
    manifest = {
        "schema_version": "1",
        "status": "not_run",
        "fixture_id": fixture["fixture_id"],
        "packet_generator_revision": PACKET_GENERATOR_REVISION,
        "prompt_hash_scope": PROMPT_HASH_SCOPE,
        "candidate_sha": candidate_sha,
        "fixture_sha256": sha256_text(FIXTURE_PATH.read_text(encoding="utf-8")),
        "randomization_seed": seed,
        "repetitions_per_task_condition": repetitions,
        "packets": packets,
        "evidence_boundary": "Prepared fictional prompts only. This manifest is not a model run, scorer record, timing record, learner observation, efficiency result, productivity result, safety result, or IQ measurement.",
    }
    errors = validate_manifest(manifest)
    if errors:
        raise ValueError("; ".join(errors))
    (output_dir / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    (output_dir / "README.md").write_text(
        "# Shift Handoff candidate run packet\n\n"
        "**Status:** `not_run` — this directory contains frozen fictional inputs only.\n\n"
        "Open prompts in the listed order, use one fresh no-tools session for each, and preserve the complete response under a de-identified artifact reference. Do not alter a prompt, replace a failed run, enter private material, browse, call tools, or perform an external action. Two independent human scorers must score de-identified artifacts before `scripts/analyze_shift_handoff_pilot.py` can summarize them.\n\n"
        "The manifest binds the candidate commit, fixture bytes, randomization seed, packet order, and prompt hashes. It is not evidence that the model or Skill produced any result.\n",
        encoding="utf-8",
    )
    return output_dir / "manifest.json"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate the checked-in frozen fixture and prompt contract.")
    parser.add_argument("--output-dir", type=Path, help="New empty directory for the prepared prompt packet.")
    parser.add_argument("--candidate-sha", help="Immutable lowercase 40-character commit SHA to bind to the packet.")
    parser.add_argument("--seed", type=int, default=20260815, help="Recorded deterministic randomization seed.")
    parser.add_argument("--repetitions", type=int, default=3, help="Frozen v1 repetitions per task-condition pair; must be 3.")
    args = parser.parse_args(argv)
    try:
        fixture = load_json(FIXTURE_PATH)
        errors = validate_fixture(fixture)
        if errors:
            raise ValueError("; ".join(errors))
        if args.check:
            print("SHIFT_HANDOFF_RUN_PACKET_CONTRACT_OK tasks=3 conditions=2 repetitions=3 packets=18 status=not_run")
            return 0
        if not args.output_dir or not args.candidate_sha:
            raise ValueError("supply --output-dir and --candidate-sha, or use --check")
        manifest = write_packets(args.output_dir.resolve(), fixture, candidate_sha=args.candidate_sha, seed=args.seed, repetitions=args.repetitions)
        print(f"SHIFT_HANDOFF_RUN_PACKET_READY manifest={manifest}")
        print("evidence_boundary=prepared-fictional-inputs-only; not-model-run-or-efficiency-IQ-proof")
        return 0
    except (OSError, UnicodeError, ValueError, json.JSONDecodeError) as exc:
        print("SHIFT_HANDOFF_RUN_PACKET_FAILED")
        print(f"- {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
