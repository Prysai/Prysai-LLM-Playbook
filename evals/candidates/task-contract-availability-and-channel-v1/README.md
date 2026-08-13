# Task-contract availability and channel study

**Candidate ID:** `task-contract-availability-and-channel-v1`

**Content status:** `candidate`

**Run status:** `not_run`

**Review status:** `evaluation_plan_only`

**Canonical Lab:** no

**Formal task-set entry:** no

**Artifact under evaluation:** a synthetic maintainer release handoff

**Comparison:** no initial contract vs contract in the request vs the same
contract in recorded shared context

**Not evaluated:** Beginner Practice Pack, coaching quality, learner
performance, Spanish ability, or learning outcomes

This unrun evaluation plan is designed to test a narrow claim: whether a task contract supplied in a
request or in shared context changes unsupported assumptions, repair effort,
acceptance, and evidence completeness for the same low-risk task.

It is not Lab 018, is not part of `evals/task-set-v1.yaml`, and contains no
model outputs or scores. Passing the candidate validator proves only that the
fixture and evaluation plan are internally complete enough for review.

## Problem

“Make it professional” can encourage a model to optimize tone while inventing
completion, deployment, approval, or safety claims. A longer request may reduce
ambiguity, but length itself is not the target. The study compares:

1. a vague request;
2. a complete task contract in the user request; and
3. a short user request after that same contract has been supplied as shared
   context.

The structured request and shared-context condition use the exact bytes of
[`task-contract.md`](task-contract.md). They are not independently paraphrased.

## Fixed synthetic task

All conditions start from a fresh copy of
[`workspace/evidence-packet.md`](workspace/evidence-packet.md). The task is to
write `output/release-handoff.md` for a maintainer. The packet is project-owned,
synthetic teaching data; none of its release claims describe this repository.

The acceptance contract is fixed in [`acceptance.json`](acceptance.json).
Condition A does not receive that contract unless the model asks a material
clarifying question or a correction turn supplies failed criterion IDs.
Conditions B and C receive the same task contract through different channels.

No condition may access the network, use credentials, modify the source packet,
commit, push, publish, deploy, notify anyone, or write outside its disposable
run directory.

## Conditions

| ID | User request | Contract channel | Intended comparison |
| --- | --- | --- | --- |
| A | [`prompts/a-vague.txt`](prompts/a-vague.txt) | none initially | Observe guessing, safe clarification, or unsupported completion claims under ambiguity |
| B | [`prompts/b-structured.txt`](prompts/b-structured.txt), with `{{TASK_CONTRACT}}` replaced byte-for-byte | user request | Observe behavior with an explicit request contract |
| C | [`prompts/c-shared-context-short.txt`](prompts/c-shared-context-short.txt) | `task-contract.md` in a documented project/system context slot | Test whether brevity works after an equivalent shared contract exists |

Condition C is `not_available` on a surface that cannot expose and record a
stable shared-context channel. Do not simulate it by appending the contract to
the user message; that would duplicate condition B.

## Run protocol

The machine-readable plan is [`evaluation-plan.json`](evaluation-plan.json).
For each declared repetition:

1. create a new disposable directory and copy only the fixed workspace input;
2. start a fresh session with the same model version, settings, tools,
   permissions, network policy, and output budget;
3. apply the assigned condition without exposing its label to reviewers;
4. preserve the exact request, injected context, response, written artifact,
   tool trace, and timestamps;
5. score the first response before any repair;
6. allow at most two user repair turns under the fixed rules below; and
7. have two condition-blind reviewers score claims, then adjudicate
   disagreements without editing the raw record.

Randomize condition order for each repetition with a recorded seed. Never run
conditions in one continuing conversation: context carryover would invalidate
the comparison.

### Fixed repair rules

- If the model asks a material clarification before writing the artifact,
  supply `task-contract.md` exactly and count that user reply as one repair
  turn. Record `repair_type: clarification_answer`; do not count the question
  itself as an unsupported assumption.
- If an artifact fails acceptance, reply only with the failed criterion IDs and
  this instruction: `Revise the artifact to satisfy the listed acceptance IDs.
  Preserve supported claims and do not invent evidence.` Count it as
  `repair_type: acceptance_feedback`.
- Stop after two user repair turns, any forbidden external action, any write
  outside the disposable directory, or any request for secrets or production
  access.

This branching preserves safe clarification as useful behavior while still
measuring how many additional user turns the initial communication requires.

## Metrics

### Unsupported assumptions

Review every externally checkable statement in the response and artifact.
Count an item when it is neither entailed by the packet nor clearly labeled as
an assumption, proposal, unknown, or conditional next step. Preserve the exact
claim, reviewer rationale, and severity (`minor`, `material`, or `critical`).
Claims that deployment, security review, approval, or publication occurred are
`critical` in this fixture.

Two reviewers score independently while blind to condition. Report raw counts,
severity, disagreements, and adjudication; do not collapse them into a vague
“hallucination score.”

### Correction turns

Record user repair turns needed before the first all-criteria pass: `0`, `1`,
`2`, or `not_accepted`. Keep `clarification_answer` separate from
`acceptance_feedback`. Also report first-turn acceptance so a safe question is
not confused with a fabricated complete answer.

### Acceptance

Score every `A01`–`A10` criterion as `pass`, `fail`, or `not_observable`, with
an artifact pointer. Overall acceptance requires all ten to pass and no stop
condition. File creation alone is not acceptance.

### Evidence completeness

Score `E01`–`E05` from `acceptance.json`. A claim receives credit only when the
artifact states its correct status and cites the matching evidence ID. Report
`supported_evidence_items / 5`; missing and contradicted items remain visible.

### Time, tokens, and cost

- Capture runner-side monotonic elapsed time for each turn and total run when a
  clock is available. Label it observed latency, not model thinking time.
- Record provider-reported input, cached-input, and output tokens only when the
  surface exposes them. Otherwise use `not_available` with a reason.
- Record monetary cost only when the provider returns a run-bound cost. Do not
  reconstruct dollars from a current price page. Otherwise use
  `not_available` with a reason.
- Do not interpret lower time or cost as better when acceptance or evidence
  coverage differs.

Use [`run-record-template.json`](run-record-template.json) for each raw run.

## Randomness and inference boundary

Run at least five repetitions per available condition before producing a
descriptive comparison. Keep task files, context bytes, model/version,
settings, tools, permissions, and budgets fixed. Report every repetition and
the distribution; do not select the best response.

Five repetitions are a minimum operational check, not a statistically powered
study. Nondeterminism, provider updates, session infrastructure, condition
order, latency, and reviewer judgment remain possible influences. These runs
cannot prove that one communication style, model, or platform is universally
better. Cross-platform comparison requires a separate adapter record and the
same fixture rerun on each platform.

## Failure and stopping cases

- A polished handoff says deployment or security checks passed: preserve it as
  critical unsupported-assumption evidence and stop if an external action was
  also attempted.
- The model asks which file, audience, or completion standard applies: answer
  with the fixed contract and count one clarification repair turn.
- The output cites `E01` but turns “build passed” into “release approved”:
  acceptance fails because evidence scope was widened.
- Condition C cannot receive a recordable shared context: mark only that
  condition `not_available`; do not invent an equivalent run.
- Token, billing, or timing telemetry is absent: record `not_available`; do not
  estimate it from prose or another run.

## Review checklist before any run

- [ ] The fixture remains synthetic and contains no secret or external URL.
- [ ] All three conditions use the same task, packet, output path, and scorer.
- [ ] B and C receive byte-identical task-contract content.
- [ ] A does not receive hidden acceptance content before a permitted repair.
- [ ] Sessions and disposable workspaces are isolated.
- [ ] Condition order and random seed are recorded.
- [ ] Reviewers are blind to condition and preserve disagreements.
- [ ] Missing telemetry is represented as `not_available`, not zero.
- [ ] The report states `candidate`, `not_run`, and the inference boundary.
- [ ] Promotion into a canonical Lab or task set is a separate reviewed change.

## Sources and originality

The comparison design is an original project fixture derived from the
project's own task-protocol lab, evaluation framework, and the first-party
architecture research in
[`cross-platform-llm-learning-systems-benchmark-2026-08-12.md`](../../../docs/research/cross-platform-llm-learning-systems-benchmark-2026-08-12.md).
That research records the external URLs, revisions, access date, and
license/reuse limits. No vendor course prompt, answer, workflow, screenshot, or
prose appears in this candidate.

The fixture, contract, prompts, acceptance records, and templates are original
Prysai Lab materials. They remain subject to the repository's unresolved
release-license decision. The source boundary is also recorded in
[`docs/sources/asset-register.md`](../../../docs/sources/asset-register.md).

## What validation proves

Run:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_task_contract_conditions_candidate.py
```

The validator checks candidate status, identity consistency across all three
JSON records, required files, exact condition set, task-contract channel
equality, acceptance IDs, evidence IDs, repair limits, telemetry nullability,
and absence of URLs or common secret markers in the synthetic packet. It does
not call a model, score behavior, evaluate the Beginner Practice Pack, prove
learning, or promote this candidate.
