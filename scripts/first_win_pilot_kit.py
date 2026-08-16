"""Build or validate a commit-bound, local-only First Win pilot kit.

The kit is preparation for a separately authorized study. It never recruits,
contacts participants, submits data, or changes learner-evidence status.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
CONTRACT_PATH = ROOT / "docs/governance/first-win-pilot-kit.yaml"
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
SAFE_LABEL_RE = re.compile(r"^[a-z0-9][a-z0-9._-]{1,63}$")


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def relative_path(value: str) -> Path:
    candidate = Path(value.replace("\\", "/"))
    if candidate.is_absolute() or ".." in candidate.parts:
        raise ValueError(f"path must stay inside the repository: {value}")
    return candidate


def git_bytes(candidate_sha: str, relative: str) -> bytes:
    completed = subprocess.run(
        ["git", "show", f"{candidate_sha}:{relative}"],
        cwd=ROOT,
        capture_output=True,
        check=False,
    )
    if completed.returncode:
        detail = completed.stderr.decode("utf-8", errors="replace").strip()
        raise ValueError(f"candidate {candidate_sha} does not contain {relative}: {detail}")
    return completed.stdout


def candidate_exists(candidate_sha: str) -> bool:
    completed = subprocess.run(
        ["git", "cat-file", "-e", f"{candidate_sha}^{{commit}}"],
        cwd=ROOT,
        capture_output=True,
        check=False,
    )
    return completed.returncode == 0


def sha256(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def normalized_text(value: str) -> str:
    without_block_quotes = re.sub(r"(?m)^\s*>\s?", "", value)
    return " ".join(without_block_quotes.split())


def require_strings(text: str, values: list[str], label: str, errors: list[str]) -> None:
    normalized = normalized_text(text)
    for value in values:
        if not isinstance(value, str) or not value or normalized_text(value) not in normalized:
            errors.append(f"{label} is missing required text: {value!r}")


def validate_contract(contract: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if contract.get("schema_version") != "1":
        errors.append("schema_version must be '1'")
    if contract.get("status") != "candidate":
        errors.append("pilot kit must remain candidate until participant evidence is separately reviewed")
    for key in ("owner", "quality_finding", "contract_path", "protocol_path", "starter_contract_path"):
        if not isinstance(contract.get(key), str) or not contract[key].strip():
            errors.append(f"{key} must be a non-empty string")
    if contract.get("quality_finding") != "Q-013":
        errors.append("quality_finding must remain Q-013")

    paths = [contract.get("contract_path"), contract.get("protocol_path"), contract.get("starter_contract_path")]
    surface = contract.get("public_surface")
    if not isinstance(surface, dict):
        errors.append("public_surface must be an object")
        surface = {}
    entry_path = surface.get("entry_path")
    source_paths = surface.get("source_paths")
    if not isinstance(entry_path, str) or not entry_path:
        errors.append("public_surface.entry_path must be a non-empty string")
    else:
        paths.append(entry_path)
    if not isinstance(source_paths, list) or len(source_paths) < 3 or any(not isinstance(item, str) or not item for item in source_paths):
        errors.append("public_surface.source_paths must list the HTML, script, and style sources")
    else:
        paths.extend(source_paths)
    for value in paths:
        if isinstance(value, str) and value:
            try:
                relative = relative_path(value)
            except ValueError as exc:
                errors.append(str(exc))
            else:
                if not (ROOT / relative).is_file():
                    errors.append(f"contract source does not exist: {value}")

    expected_paths = {
        "README.md", "manifest.json", "participant/worksheet.md", "moderator/runbook.md",
        "moderator/scorer-key.md", "records/session-record.csv", "records/scoring-sheet.csv",
        "aggregate/aggregate-review.md",
    }
    package_paths = contract.get("package_paths")
    if not isinstance(package_paths, list) or set(package_paths) != expected_paths:
        errors.append("package_paths must declare the complete fixed pilot-package layout")

    for key in ("protocol_anchors", "participant_boundary", "do_not_collect", "session_record_fields", "scoring_sheet_fields", "allowed_help_codes", "allowed_recovery_values"):
        value = contract.get(key)
        if not isinstance(value, list) or not value or any(not isinstance(item, str) or not item.strip() for item in value):
            errors.append(f"{key} must be a non-empty list of non-empty strings")
    if set(contract.get("allowed_help_codes", [])) != {"none", "reopen_first_win", "copy_text", "moderator_clarification", "other_recorded"}:
        errors.append("allowed_help_codes must preserve the v2 protocol vocabulary")
    if set(contract.get("allowed_recovery_values", [])) != {"independent", "seeded", "not_observable_no_failure", "not_attempted", "stopped"}:
        errors.append("allowed_recovery_values must preserve the v2 protocol vocabulary")

    stimuli = contract.get("fixed_stimuli")
    if not isinstance(stimuli, dict):
        errors.append("fixed_stimuli must be an object")
    else:
        expected = {"baseline_source", "baseline_defective_answer", "baseline_findings", "seeded_defective_answer", "immediate_source", "delayed_source"}
        if set(stimuli) != expected:
            errors.append("fixed_stimuli must use the complete v2 phase set")
        elif not isinstance(stimuli.get("baseline_findings"), list) or len(stimuli["baseline_findings"]) != 3:
            errors.append("fixed_stimuli.baseline_findings must contain exactly three scored findings")
        elif any(not isinstance(value, str) or not value for value in stimuli.values() if not isinstance(value, list)):
            errors.append("fixed_stimuli text values must be non-empty strings")
    return errors


def validate_candidate_sources(contract: dict[str, Any], candidate_sha: str) -> tuple[dict[str, Any], dict[str, bytes], dict[str, Any]]:
    if not SHA_RE.fullmatch(candidate_sha) or not candidate_exists(candidate_sha):
        raise ValueError("candidate_sha must name an existing full lowercase commit SHA")
    contract_bytes = git_bytes(candidate_sha, contract["contract_path"])
    try:
        candidate_contract = json.loads(contract_bytes.decode("utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"candidate pilot-kit contract is not valid JSON: {exc}") from exc
    if candidate_contract != contract:
        raise ValueError("candidate pilot-kit contract does not match the checked-in contract; use the matching tool version or choose a matching commit")
    source_paths = [contract["contract_path"], contract["protocol_path"], contract["starter_contract_path"], *contract["public_surface"]["source_paths"]]
    source_bytes = {path: git_bytes(candidate_sha, path) for path in source_paths}
    protocol = source_bytes[contract["protocol_path"]].decode("utf-8")
    require_errors: list[str] = []
    require_strings(protocol, contract["protocol_anchors"], "candidate protocol", require_errors)
    stimuli = contract["fixed_stimuli"]
    require_strings(
        protocol,
        [stimuli["baseline_source"], stimuli["baseline_defective_answer"], stimuli["seeded_defective_answer"], stimuli["immediate_source"], stimuli["delayed_source"]],
        "candidate protocol",
        require_errors,
    )
    for finding in stimuli["baseline_findings"]:
        if finding.split(" was ", 1)[0].split(" was", 1)[0] not in protocol:
            require_errors.append(f"candidate protocol does not retain a baseline finding: {finding!r}")
    if require_errors:
        raise ValueError("; ".join(require_errors))

    try:
        starter = json.loads(source_bytes[contract["starter_contract_path"]].decode("utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"candidate starter contract is not valid JSON: {exc}") from exc
    if not isinstance(starter, dict) or starter.get("schema_version") != "3" or starter.get("status") != "candidate":
        raise ValueError("candidate starter contract must remain schema 3 and candidate")
    for key in ("input_text", "prompt", "rescue_prompt", "human_checks", "evidence_boundary"):
        if not starter.get(key):
            raise ValueError(f"candidate starter contract is missing {key}")
    return candidate_contract, source_bytes, starter


def safe_label(value: object, label: str) -> str:
    if not isinstance(value, str) or not SAFE_LABEL_RE.fullmatch(value):
        raise ValueError(f"{label} must be a 2–64 character role alias using lowercase letters, digits, dot, underscore, or hyphen")
    return value


def require_distinct_scoring_roles(roles: dict[str, object]) -> None:
    moderator = safe_label(roles.get("moderator"), "moderator")
    independent_scorer = safe_label(roles.get("independent_scorer"), "independent_scorer")
    if moderator == independent_scorer:
        raise ValueError("moderator and independent_scorer must use distinct role aliases so scores can be independent")


def safe_entry_url(value: object) -> str:
    if not isinstance(value, str):
        raise ValueError("entry_url must be an http(s) URL without credentials, query text, or fragment")
    parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc or parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ValueError("entry_url must be an http(s) URL without credentials, query text, or fragment")
    return value


def safe_output_path(value: str) -> Path:
    output = Path(value).resolve()
    try:
        relative = output.relative_to(ROOT)
    except ValueError:
        return output
    if not relative.parts or relative.parts[0] not in {".work", "tmp", "output"}:
        raise ValueError("output_dir inside this repository must be under ignored .work/, tmp/, or output/")
    return output


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def render_participant_worksheet(contract: dict[str, Any], starter: dict[str, Any]) -> str:
    stimuli = contract["fixed_stimuli"]
    consent = "\n".join(f"- {line}" for line in contract["participant_boundary"])
    checks = "\n".join(f"{index}. {value}" for index, value in enumerate(starter["human_checks"], start=1))
    return f"""# First Win pilot — participant worksheet

**Status:** candidate study material. Complete this worksheet only in an
authorized, voluntary pilot. It is not a test of your ability, and it does not
measure course effectiveness.

## Before we begin

{consent}

Use fictional text only. Do not open files, browse, use tools, use an account
feature, or perform an external action. You can stop at any time.

## Part 0 — public surface observation

Starting from the study entry, without help, find the recommended local Codex
path, the optional First Win warm-up, the candidate boundary, and the three
checks. Do not open the comparison example yet. Tell the moderator when you
have found each item or when you want to stop.

## Part 1 — unaided baseline

Mark every source-fidelity problem you see, then write one corrected message.
Do not ask for a hint.

**Source**

> {stimuli["baseline_source"]}

**Message to inspect**

> {stimuli["baseline_defective_answer"]}

## Part 2 — First Win method

The moderator now opens the commit-bound First Win source. Use its fictional
workshop message and the following fixed prompt. Preserve the first model
answer before making any repair. For every check, record `PASS`, `FAIL`, or
`UNSURE` and the exact words that support your judgment. Lock all three
judgments before viewing the illustrative comparison.

```text
{starter["prompt"]}
```

Checks to complete before comparison:

{checks}

If a check is `FAIL` or `UNSURE`, use this bounded rescue prompt:

```text
{starter["rescue_prompt"]}
```

If the first answer has no observable failure, record
`not_observable_no_failure`; the moderator will then use the separate seeded
message. A completed attempt still does not prove learning, transfer, general
writing ability, model superiority, Codex behavior, or platform reliability.

## Part 3 — immediate unseen transfer

Write a short instruction for a chat model, inspect its first answer, and make
the smallest correction needed. Keep the instruction, first answer, marked
findings, final answer, and before/after difference for scoring.

> {stimuli["immediate_source"]}

## Part 4 — delayed unseen transfer

If you return after 48–72 hours, repeat the same process without reopening this
worksheet's prior prompt, checks, example, or rescue text.

> {stimuli["delayed_source"]}
"""


def render_moderator_runbook(contract: dict[str, Any], starter: dict[str, Any]) -> str:
    stimuli = contract["fixed_stimuli"]
    return f"""# First Win pilot — moderator runbook

Keep this folder separate from the participant worksheet. The score key must
not be visible to participants. This package prepares an authorized study; it
does not recruit participants or establish any learner outcome.

## Before the first session

1. Read `manifest.json`; verify every source digest matches the candidate
   commit and record any condition deviation before a session begins.
2. Confirm the named pilot authorizer, privacy owner, retention end, deletion
   owner, moderator alias, and independent scorer alias in the manifest.
3. Read the participant boundary verbatim. Do not collect contact details,
   raw chat histories, account data, private files, employer material, health
   or financial information, screen recordings, secrets, or personal data.
4. Keep the public-surface observation separate and unscored. Do not direct a
   participant to a route or reveal the answer, prompt, checks, rescue text,
   or score key during that observation.
5. Use only the named entry source, fixed fictional material, locale, model
   surface, and viewport. Stop the round rather than silently changing them.

## Session order

1. Run the unaided baseline with the participant worksheet. Do not disclose
   that it has three findings.
2. Run Part 2 from the candidate-bound First Win source. Preserve the first
   answer before repair. If a comparison is exposed early, record
   `example_exposed`, exclude the scored Phase 2 comparison, and keep any
   other permitted observations separately.
3. If no model failure is observable, record `not_observable_no_failure`, then
   use this seeded message for the recovery branch:

   > {stimuli["seeded_defective_answer"]}

4. Run the immediate unseen transfer. Do not copy the workshop prompt into it.
5. Schedule delayed transfer for 48–72 hours. Do not replace a missing return
   with the last score.

## Stop and deletion boundary

Stop immediately for private material, distress, a belief that this is an
employment or academic evaluation, or any requested external action. Remove
unsafe material from notes, retain only a non-sensitive safety-stop record if
needed, and follow the recorded deletion process. The first round is instrument
debugging; do not make effectiveness or demand claims from it.
"""


def render_scorer_key(contract: dict[str, Any]) -> str:
    stimuli = contract["fixed_stimuli"]
    findings = "\n".join(f"{index}. {value}" for index, value in enumerate(stimuli["baseline_findings"], start=1))
    return f"""# First Win pilot — moderator and scorer key

**Do not show this file to participants.** Score baseline and transfer
artifacts without knowing phase when possible. Preserve both independent
scores and every disagreement; do not average disagreement away.

## Baseline answer key

{findings}

## Dimension rubric

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Required facts | two or more missing or changed | one missing or changed | all preserved |
| Unsupported facts | two or more additions | one addition | none |
| Requested action | absent or materially changed | present but ambiguous | preserved clearly |
| Correction scope | introduces a new defect | fixes target plus unnecessary change | smallest sufficient correction |

This rubric describes fixed fictional artifacts only. It does not rate a
participant, establish independent ability, or demonstrate learning,
retention, transfer, safety, or model performance.
"""


def render_aggregate_template() -> str:
    return """# First Win pilot — de-identified aggregate review

**Status:** blank template. Do not publish or mark this record as a result
until an authorized round is complete and independently reviewed.

## Fixed conditions

- Candidate SHA:
- Package manifest digest:
- Entry source and locale:
- Model surface and visible settings:
- Browser/OS/viewport:
- Recruitment channel and exclusion rule:
- Retention end and deletion owner:
- Deviations from fixed conditions:

## Counts

| Measure | Count | Notes |
| --- | ---: | --- |
| invited |  |  |
| recruited |  |  |
| excluded before session |  |  |
| started |  |  |
| completed public-surface observation |  |  |
| completed baseline |  |  |
| completed First Win phase |  |  |
| completed immediate transfer |  |  |
| returned for delayed transfer |  |  |
| safety-stopped |  |  |
| dropped or blocked |  |  |

## Descriptive observations only

- Public-surface route distinction:
- First drop-off points:
- Help used:
- Example-exposure deviations:
- Independent and seeded recovery counts:
- `not_observable_no_failure` counts:
- Baseline/immediate/delayed score distributions:
- Phase 2 completion-time distribution and count at or below 15 minutes:
- Scorer disagreements by dimension:
- Critical incidents and deletion record:
- Instrument changes proposed for a new round:

## Independent review

- Reviewer alias:
- Review date:
- Agreements and disagreements retained:
- Scope-limited conclusion:

## Boundary

For a 5–8 participant instrument-debugging round, report descriptive counts
and distributions only. This record cannot establish statistical significance,
learning effectiveness, retention, transfer, demand, satisfaction, public
readiness, or a verified project status.
"""


def build_package(contract: dict[str, Any], args: argparse.Namespace) -> Path:
    candidate_contract, source_bytes, starter = validate_candidate_sources(contract, args.candidate_sha)
    output = safe_output_path(args.output_dir)
    if output.exists() and any(output.iterdir()):
        raise ValueError("output_dir must not already contain files; do not overwrite pilot records")
    roles = {
        "pilot_authorizer": args.pilot_authorizer,
        "privacy_owner": args.privacy_owner,
        "moderator": args.moderator,
        "independent_scorer": args.independent_scorer,
        "deletion_owner": args.deletion_owner,
    }
    for value, label in (
        (roles["pilot_authorizer"], "pilot_authorizer"),
        (roles["privacy_owner"], "privacy_owner"),
        (roles["moderator"], "moderator"),
        (roles["independent_scorer"], "independent_scorer"),
        (roles["deletion_owner"], "deletion_owner"),
        (args.recruitment_channel, "recruitment_channel"),
        (args.locale, "locale"),
        (args.model_surface, "model_surface"),
        (args.browser_os_viewport, "browser_os_viewport"),
    ):
        safe_label(value, label)
    require_distinct_scoring_roles(roles)
    if not DATE_RE.fullmatch(args.retention_end) or date.fromisoformat(args.retention_end) < date.today():
        raise ValueError("retention_end must be today or a future YYYY-MM-DD date")
    entry_url = safe_entry_url(args.entry_url) if args.entry_url else ""
    source_manifest = [
        {"path": path, "sha256": sha256(value), "bytes": len(value)}
        for path, value in sorted(source_bytes.items())
    ]
    manifest = {
        "schema_version": "1",
        "status": "candidate",
        "pilot_state": "prepared_no_recruitment_or_participant_run_recorded",
        "candidate_sha": args.candidate_sha,
        "quality_finding": candidate_contract["quality_finding"],
        "entry_path": contract["public_surface"]["entry_path"],
        "entry_url": entry_url or None,
        "roles": roles,
        "conditions": {
            "recruitment_channel": args.recruitment_channel,
            "locale": args.locale,
            "model_surface": args.model_surface,
            "browser_os_viewport": args.browser_os_viewport,
            "retention_end": args.retention_end,
        },
        "source_files": source_manifest,
        "do_not_collect": candidate_contract["do_not_collect"],
        "package_paths": candidate_contract["package_paths"],
        "evidence_boundary": "This prepared local package is not a recruitment record, participant run, aggregate result, learner outcome, or release decision.",
    }
    write_text(output / "README.md", f"""# First Win pilot package

This package is bound to commit `{args.candidate_sha}`. It is local-only and
contains no participant result. Do not commit it, upload it, or share it with a
participant as a whole: `moderator/scorer-key.md` is restricted to the
moderator and independent scorer.

Before a session, verify `manifest.json`, obtain the required authorization,
and use the participant boundary in `participant/worksheet.md`. The generator
does not recruit anyone, collect data, contact a service, or verify that a
pilot has approval.

The package belongs in an ignored local work directory or outside the
repository. Retain only the de-identified, authorized records described by the
protocol; remove unsafe material immediately.
""")
    write_text(output / "manifest.json", json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    write_text(output / "participant/worksheet.md", render_participant_worksheet(contract, starter))
    write_text(output / "moderator/runbook.md", render_moderator_runbook(contract, starter))
    write_text(output / "moderator/scorer-key.md", render_scorer_key(contract))
    write_text(output / "aggregate/aggregate-review.md", render_aggregate_template())
    for path, fields in ((output / "records/session-record.csv", contract["session_record_fields"]), (output / "records/scoring-sheet.csv", contract["scoring_sheet_fields"])):
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("w", encoding="utf-8", newline="") as handle:
            csv.writer(handle).writerow(fields)
    return output


def validate_package(path: Path, contract: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    expected_paths = set(contract["package_paths"])
    actual_paths = {
        file.relative_to(path).as_posix()
        for file in path.rglob("*")
        if file.is_file()
    }
    unexpected_paths = sorted(actual_paths - expected_paths)
    if unexpected_paths:
        errors.append("package must not contain untracked files before a participant run: " + ", ".join(unexpected_paths))
    for relative in contract["package_paths"]:
        if not (path / relative).is_file():
            errors.append(f"package is missing {relative}")
    manifest_path = path / "manifest.json"
    if not manifest_path.is_file():
        return errors
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return [*errors, f"package manifest is not JSON: {exc}"]
    if not isinstance(manifest, dict):
        return [*errors, "package manifest must contain an object"]
    if manifest.get("status") != "candidate" or manifest.get("pilot_state") != "prepared_no_recruitment_or_participant_run_recorded":
        errors.append("package manifest must retain the candidate/prepared evidence boundary")
    candidate_sha = manifest.get("candidate_sha")
    if not isinstance(candidate_sha, str):
        errors.append("package manifest is missing candidate_sha")
    else:
        try:
            _, source_bytes, _ = validate_candidate_sources(contract, candidate_sha)
        except ValueError as exc:
            errors.append(str(exc))
        else:
            expected = {path: sha256(value) for path, value in source_bytes.items()}
            source_files = manifest.get("source_files")
            actual = {item.get("path"): item.get("sha256") for item in source_files if isinstance(item, dict)} if isinstance(source_files, list) else {}
            if actual != expected:
                errors.append("package manifest source digests do not match the candidate commit")
    roles = manifest.get("roles")
    if not isinstance(roles, dict):
        errors.append("manifest.roles must be an object")
        roles = {}
    conditions = manifest.get("conditions")
    if not isinstance(conditions, dict):
        errors.append("manifest.conditions must be an object")
        conditions = {}
    for key in ("pilot_authorizer", "privacy_owner", "moderator", "independent_scorer", "deletion_owner"):
        try:
            safe_label(roles.get(key, ""), f"manifest.roles.{key}")
        except ValueError as exc:
            errors.append(str(exc))
    try:
        require_distinct_scoring_roles(roles)
    except ValueError as exc:
        errors.append(str(exc))
    try:
        safe_label(conditions.get("recruitment_channel", ""), "manifest.conditions.recruitment_channel")
        safe_label(conditions.get("locale", ""), "manifest.conditions.locale")
        safe_label(conditions.get("model_surface", ""), "manifest.conditions.model_surface")
        safe_label(conditions.get("browser_os_viewport", ""), "manifest.conditions.browser_os_viewport")
        retention_end = conditions.get("retention_end", "")
        if not isinstance(retention_end, str) or not DATE_RE.fullmatch(retention_end):
            raise ValueError("manifest.conditions.retention_end must use YYYY-MM-DD")
        if date.fromisoformat(retention_end) < date.today():
            raise ValueError("manifest.conditions.retention_end must be today or a future date")
        entry_url = manifest.get("entry_url")
        if entry_url is not None:
            if not isinstance(entry_url, str):
                raise ValueError("manifest.entry_url must be null or a safe http(s) URL")
            safe_entry_url(entry_url)
    except ValueError as exc:
        errors.append(str(exc))
    participant = (path / "participant/worksheet.md")
    if participant.is_file():
        participant_text = participant.read_text(encoding="utf-8")
        require_strings(participant_text, contract["participant_boundary"], "participant worksheet", errors)
        if "Baseline answer key" in participant_text or "Do not show this file to participants" in participant_text:
            errors.append("participant worksheet exposes moderator-only scoring content")
    scorer = path / "moderator/scorer-key.md"
    if scorer.is_file():
        scorer_text = scorer.read_text(encoding="utf-8")
        require_strings(scorer_text, contract["fixed_stimuli"]["baseline_findings"], "scorer key", errors)
    for relative, expected_header in (("records/session-record.csv", contract["session_record_fields"]), ("records/scoring-sheet.csv", contract["scoring_sheet_fields"])):
        target = path / relative
        if target.is_file():
            with target.open("r", encoding="utf-8", newline="") as handle:
                rows = list(csv.reader(handle))
            if rows != [expected_header]:
                errors.append(f"{relative} must contain only its fixed header before a participant run")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Build a local, commit-bound First Win pilot package.")
    parser.add_argument("--check", action="store_true", help="Validate the checked-in kit contract only.")
    parser.add_argument("--validate-package", metavar="PATH", help="Validate an existing generated local package.")
    parser.add_argument("--candidate-sha", help="Full lowercase commit SHA to bind into the package.")
    parser.add_argument("--output-dir", help="New ignored local directory for the generated package.")
    parser.add_argument("--pilot-authorizer")
    parser.add_argument("--privacy-owner")
    parser.add_argument("--moderator")
    parser.add_argument("--independent-scorer")
    parser.add_argument("--deletion-owner")
    parser.add_argument("--recruitment-channel")
    parser.add_argument("--retention-end")
    parser.add_argument("--locale")
    parser.add_argument("--model-surface")
    parser.add_argument("--browser-os-viewport")
    parser.add_argument("--entry-url", default="")
    args = parser.parse_args()
    try:
        contract = load_json(CONTRACT_PATH)
        errors = validate_contract(contract)
        if errors:
            print("FIRST_WIN_PILOT_KIT_FAILED")
            for error in errors:
                print(f"- {error}")
            return 1
        if args.check:
            print(f"FIRST_WIN_PILOT_KIT_CONTRACT_OK paths={len(contract['package_paths'])} status=candidate")
            return 0
        if args.validate_package:
            errors = validate_package(Path(args.validate_package).resolve(), contract)
            if errors:
                print("FIRST_WIN_PILOT_PACKAGE_FAILED")
                for error in errors:
                    print(f"- {error}")
                return 1
            print("FIRST_WIN_PILOT_PACKAGE_OK evidence=prepared-not-run")
            return 0
        required = ("candidate_sha", "output_dir", "pilot_authorizer", "privacy_owner", "moderator", "independent_scorer", "deletion_owner", "recruitment_channel", "retention_end", "locale", "model_surface", "browser_os_viewport")
        missing = [key for key in required if not getattr(args, key)]
        if missing:
            raise ValueError("missing build arguments: " + ", ".join(missing))
        output = build_package(contract, args)
        errors = validate_package(output, contract)
        if errors:
            raise ValueError("generated package failed validation: " + "; ".join(errors))
        print(f"FIRST_WIN_PILOT_PACKAGE_BUILT output={output} evidence=prepared-not-run")
        return 0
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as exc:
        print("FIRST_WIN_PILOT_KIT_FAILED")
        print(f"- {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
