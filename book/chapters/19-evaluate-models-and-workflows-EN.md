<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

# Chapter 19: Evaluate Models and Workflows — From Impressions to Evidence

> `content_status: candidate`
> `experiment_status: draft / not run`
>
> This chapter provides an executable evaluation method. The repository’s model-evaluation fixtures do not contain model run logs, so this chapter must not be read as proof that one model is best.

## The problem this chapter solves

“This model is smarter,” “this skill is more reliable,” and “the task finished quickly” may be observations, but none is enough to support a selection. Model, prompt, context, tools, permissions, task difficulty, and human review all affect the result. If one condition changes, the comparison may no longer answer the original question.

The unit of evaluation is therefore not a polished answer. It is a fixed input, an observable action, an acceptance rule, an evidence package, and a stated scope.

## A real-world entry point

FP-08 (a model/provider configuration mismatch), FP-09 (capacity or queue interruption), FP-10 (a validation command remaining in Working), and [FUP-05 (an error after a long period without events followed by an automatic retry)](../../docs/research/field-problems-follow-up-2026-08-10.md) come from public user reports. They are not official root-cause findings, local reproductions, or conclusions about every account.

They establish four boundaries:

- successful configuration is not task completion;
- task completion is not sufficient evidence;
- a successful retry must not rewrite the first attempt;
- a stopped or changed condition may make a run incomparable.

## Learning objectives

After completing this chapter, you should be able to:

- turn “which model is better?” into a bounded decision question;
- build a versioned task set containing normal, boundary, failure, and transfer tasks;
- record a reproducible comparison with a run ID, logs, scores, and evidence completeness;
- distinguish first-pass success, final success, rework, elapsed time, cost, risk, and safe stopping;
- write a decision card with scope, unknowns, and a next review date.

## Concept: evaluation objects and evidence levels

Model, skill, workflow, and permission selection are four different decisions. They can share a record format, but their conclusions cannot be silently combined.

| Decision object | Question | Minimum evidence |
|---|---|---|
| Default model | Which candidate meets quality and safety gates on the specified task set? | Fixed tasks, repeated runs, scoring, and error categories |
| Skill | Does the method reduce omissions or rework for the same input? | Baseline/candidate difference and skill-trigger record |
| Workflow | Does planning and verification justify its added cost? | Stage log, diff, verification, and rework record |
| Permission | Does the new action space produce a measurable, authorized benefit? | Permission table, side-effect evidence, and recovery cost |

## Concrete evidence table

| Evidence item | Required artifact | What it supports | What it does not support |
|---|---|---|---|
| Frozen task set | Versioned task text, input fixture, schema, acceptance rules, and hashes | That candidates faced the same declared work | That the task set represents every real workload |
| Condition snapshot | Surface, model/workflow IDs, versions, tools, network, permissions, and time budget | Whether a run matched the comparison conditions | A general benchmark claim beyond that scope |
| Run record | Unique `run_id`, timestamps, event timeline, output, diff, validation, and status | What happened in one attempt | That an absent log was successful |
| Human review | Reviewer, rubric, score, and unresolved items | How the output was judged | Objective truth when the rubric is weak or unreviewed |
| Comparability field | `comparable` or `not_comparable` plus reason | Whether a result may enter the comparison | A way to fill missing evidence with a retry or another candidate |
| Decision card | Action, scope, errors, unknowns, and next review | What the evidence justifies now | A claim that an unrun evaluation proved a winner |

## Decision: fill the card before designing the evaluation

Before running anything, complete a card. Candidates must be actual candidates. A candidate that cannot be run is `not_run`; do not fill the gap with a prediction.

```yaml
decision_id: "DEC-19-001"
decision_object: "model | skill | workflow | permission"
question: "For which bounded tasks does one candidate meet the stated gates?"
decision_owner: "Named evaluation owner before the run"
candidates:
  - id: "baseline"
    description: "Fixed goal and input only"
  - id: "candidate"
    description: "Task protocol, minimum context, and verification"
task_set: "three-task-smoke-v1"
task_set_version: "v1"
minimum_quality: "Required fields present, input unchanged, validation exit code 0"
red_lines:
  - "No secret disclosure"
  - "No unauthorized external write"
  - "No missing evidence described as complete"
acceptable_cost: "Time and cost ceiling written before the run"
log_location: "evals/results/; not_run when no run exists"
decision_action: "adopt | retain_baseline | continue_test | reject | blocked"
scope: "This task set, surface, date, and permission condition only"
unknowns: []
next_review: "YYYY-MM-DD"
```

Breaking a red line is `reject` or `blocked`. Missing the minimum quality cannot be compensated for by lower cost. `adopt` is permitted only when repeated results are sufficiently stable within the stated scope. Missing evidence means `continue_test`, not “best value.”

## Action: freeze the task set and comparison conditions

A reusable task set should include normal work, missing input or conflicting constraints, a failure case, a transfer case, and at least one task requiring human judgment. Each task needs a stable ID, version, input context, permitted actions, expected evidence, prohibited behavior, and pass criteria.

Do not delete a task because a candidate performs poorly. If the task is flawed, create a new task-set version and record why.

Freeze these conditions before comparison:

- task text, redacted input, and context version;
- model ID, reasoning settings, product entry point, and surface;
- tool set, network condition, permissions, and time budget;
- repetition count, output format, scoring rubric, and reviewer;
- baseline and candidate file hashes and recovery method.

Any change belongs in the log. Otherwise “the model improved” may only mean that it received more files, broader permissions, or more time.

## Experiment: a three-task comparability smoke test

This is a low-risk, offline, reproducible smoke experiment. It answers only whether a larger evaluation is worth running. It does not prove that a model or workflow is generally better.

### Setup

In a temporary copy, create the fixed task set `three-task-smoke-v1`. Choose one comparison variable: when comparing models, fix the workflow; when comparing workflows, fix the model. Do not change both in the same round.

The inputs below are **synthetic evaluation fixtures**, not production records, customer data, benchmark results, or model run results:

| `task_id` | Fixed synthetic input and action | First-pass acceptance rule |
|---|---|---|
| `extract-01` | From “build exit code 0; mobile 390px checked; user acceptance not run,” extract `claim`, `status`, and `evidence` | Exactly three rows; the first two are `verified`; user acceptance is `unverified`; add no facts |
| `markdown-02` | Convert the same input into Markdown with only “Completed” and “Unverified” level-two headings | Correct headings and fact classification; preserve unknowns; add no claims |
| `gap-review-03` | Review “The feature is complete because the code exists and the build passes” | Identify missing runtime and user-effect evidence; do not downgrade build evidence or claim verification |

Freeze the three task texts, inputs, output schema, acceptance table, and SHA-256 hashes as `task_set_version: v1`. Both candidates use the same surface, context, tools, permissions, network condition, time budget, and reviewer. If the surface is the comparison variable, fix the model and workflow instead. Run each candidate once per task, with at most one pre-declared controlled rework. Do not use production data, real secrets, network writes, commits, pushes, or publication.

### Task

1. **Candidate A:** Record the actual model and workflow. For a workflow comparison, provide only the fixed task and input.
2. **Candidate B:** Record the actual model and workflow. For a workflow comparison, add the task protocol, minimum context, acceptance rules, and evidence rules.
3. Run A in the fixed task order, then B in the same order. The order may introduce bias; record that limitation. Randomize or cross the order in a larger evaluation.
4. Give every candidate × task a unique `run_id`, such as `19-three-task-smoke-v1-B-extract-01`. Keep a controlled rework as a new `attempt_id` under the same run ID; never overwrite the initial output.
5. If a capacity error, permission block, input-hash change, tool-version change, or other frozen-condition change occurs, preserve the event and mark the row `not_comparable`. Do not fill it with an empty value, a successful retry, or the other candidate’s result.

### Evidence

Each run should have a record like this. When no run has occurred, retain `not_run` rather than invented values:

```yaml
run_id: "19-three-task-smoke-v1-B-extract-01"
attempt_id: "initial"
decision_id: "DEC-19-001"
task_set: "three-task-smoke-v1"
task_id: "extract-01 | markdown-02 | gap-review-03"
candidate_id: "A | B"
surface: "Actual surface and version"
model: "Actual model ID; not_run if not run"
workflow: "Actual workflow ID/version; not_run if not run"
started_at: "YYYY-MM-DDThh:mm:ssZ or not_run"
ended_at: "YYYY-MM-DDThh:mm:ssZ or not_run"
input_hash: "sha256:... or not_run"
context_version: "v1"
permissions: "Read-only temporary copy"
tool_set_and_versions: "Actual tools and versions; not_run if not run"
network_condition: "Offline"
time_budget: "Frozen ceiling"
conditions_match: true
timeline:
  - at: "YYYY-MM-DDThh:mm:ssZ"
    event: "request_started | first_output | tool_started | tool_ended | no_event_threshold | retry_started | completed | failed"
cost_value: "Actual value or unavailable; never estimate"
cost_basis: "API bill | input/output tokens | subscription proxy | unavailable"
diff: "File names, line count, or no-change"
validation: "Command, exit code, and key output"
reviewer: "Independent reviewer or not_assigned"
first_pass: true
rework_count: 0
score: 0
evidence_completeness: "0/6"
error_category: "none | goal | context | capability | capacity | timeout | permission | implementation | fact | verification | delivery | condition_drift"
comparability: "comparable | not_comparable"
not_comparable_reason: "none or the changed condition"
status: "pass | fail | not_comparable | not_run"
```

Use five human-scored dimensions, each from 0–2: factual correctness, field completeness, scope compliance, evidence correspondence, and safe stopping. A passing score is at least 8/10, with scope compliance and safe stopping each at least 1. `first_pass` is true only when the initial attempt meets the frozen gate without revision. A retry or controlled rework that later passes remains `first_pass: false`.

`rework_count` counts revisions after the initial submission that were required to meet the original acceptance rule. A changed condition creates a new run or `not_comparable`; it is not ordinary rework. Evidence completeness counts six required materials: fixed input, output, diff, validation output, score, and unverified items. Missing one lowers completeness; personal confidence cannot replace it.

Choose one cost basis before comparing. An API may provide an actual bill or input/output tokens. If a subscription surface does not expose an amount, use a clearly named proxy and write the monetary value as `unavailable`. Do not combine incompatible cost bases or claim that one candidate is cheaper on that basis. Report elapsed time from `request_started` to the final state, with first-event wait, tool time, and rework time separately when available.

At the end, create a two-candidate × three-task `smoke-comparison` table and a decision card for each candidate. Include run ID, surface, model, workflow, condition version, first pass, rework, elapsed time, cost value and basis, error category, comparability, score, and raw-log index. If the six initial records are incomplete or a task has no comparable A/B pair, the only honest actions are `continue_test`, `blocked`, or `not_run`. Even a passing smoke test supports only “worth expanding” or “do not expand yet.”

### Failure variant

During B’s `markdown-02` run, deliberately introduce a capacity error, permission block, input change, or tool-version change. Correct behavior is to stop that run, preserve the event timeline and interruption evidence, mark it `not_comparable`, and state whether to rerun under the original condition or stop. Do not use a successful automatic retry, an empty value, or A’s result to fill the row.

Other boundary cases include a validation command with no events for too long, output containing facts absent from the input, and a candidate improving only one task class. These examples and their related issues must not be rewritten as official root causes.

### Reflection

- What additional setup cost did the candidate workflow introduce, and what risk did it reduce?
- Which artifact directly supports the decision, and which is only an observation?
- Which variable could have confounded the comparison?
- Is the failure a goal, context, fact, permission, verification, or delivery failure? Why?
- Which tasks are covered by this result, and which tasks are outside its scope?
- What single condition will the next round change, and who will review it?

## Boundaries and common mistakes

- One demonstration cannot establish general performance, cost, or “best value.”
- Low elapsed time cannot compensate for unauthorized action, fabricated evidence, or high rework.
- An official model description is not this project’s measurement result.
- A schema check proves that the fixture is well-formed; it does not prove that a model ran or that a learner mastered the method.
- When a condition changes, create a new decision-card version or mark the run incomparable. Do not continue using the old conclusion unchanged.

## Transfer exercise

Apply the same record structure to a research question, marketing experiment, or team skill choice. Keep the run ID, input hash, score, and decision card. State which metrics transfer, which must change for the domain’s risks, and at least one conclusion that cannot transfer.

## Acceptance checklist

- [ ] I can express a model preference as a decision card with candidates, gates, red lines, and an action.
- [ ] My task set has a version, fixed inputs, normal cases, boundary cases, failure cases, and a transfer case.
- [ ] Each fixed task has a frozen input, acceptance rule, and initial A/B run—or is explicitly marked `not_run`.
- [ ] Every run has a unique ID, surface, model/workflow, conditions, timeline, diff, validation, score, and status.
- [ ] I can calculate evidence completeness and distinguish first pass, rework, and final pass.
- [ ] I record one cost basis and error category, and I do not let a retry overwrite the initial attempt.
- [ ] I can detect a changed condition and stop an incomparable experiment.
- [ ] I can state the conclusion’s scope, unknowns, and next review date.
- [ ] I have not described an unrun model evaluation or benchmark as a verified result.

## Sources and maintenance boundary

This chapter treats model positioning, model IDs, availability, entry points, and account scope as volatile facts. `content_status` and `claim_status` are different fields. The records below describe source boundaries as of their check date; they do not replace a reader’s review in the actual account.

```yaml
- claim: "Official model documentation may change the positioning or availability of a model by entry point, account, or version"
  source: "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
  checked_at: "2026-08-09"
  applies_to: "The account, API entry point, and version range stated by that page"
  owner: "Model-evaluation maintainer"
  next_review: "2026-11-09"
  claim_status: "current at check date"
- claim: "Codex model and surface guidance should be taken from the current official model guide"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "The Codex/ChatGPT surfaces stated by the official guide; not undeclared accounts"
  owner: "Content maintainer"
  next_review: "2026-11-09"
  claim_status: "current at check date"
```

`evals/task-set-v1.yaml` and `docs/model-evaluation-luna.md` remain `draft / not run` in the current project record. This chapter’s method is `candidate`; it contains no benchmark number and no model-run result.

The maintenance owner must recheck official model pages, the task-set version, evaluation fixtures, account scope, cost basis, and runtime surface when any of them changes, and no later than 2026-11-09. A result becomes `verified` only when the stated run logs, independent review, comparability checks, and evidence package exist. It becomes `production-ready` only after the relevant operational, security, permission, rollback, and user-acceptance checks also exist.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-EN.md" aria-label="Previous chapter: Chapter 18 · Content, design, data, and automation track">← Previous<br><strong>Chapter 18 · Content, design, data, and automation track</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-EN.md" aria-label="Next chapter: Chapter 20 · Build a personal Codex work system">Next →<br><strong>Chapter 20 · Build a personal Codex work system</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
