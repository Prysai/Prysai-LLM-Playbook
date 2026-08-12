<!-- content_id: lab-009-engineering-lifecycle | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-009-engineering-lifecycle
title: "Compare direct implementation with a full engineering lifecycle"
level: L3
domain: engineering
goal: "Measure where definition, planning, verification, review, and delivery reduce rework without pretending that a tiny benchmark proves universal superiority"
setup: "A disposable local repository, three frozen low-risk tasks, one baseline revision, fixed tooling, and no production or external side effects"
task: "Run the same three tasks through direct and lifecycle workflows, preserve first attempts, classify condition drift, and compare evidence quality and rework"
evidence:
  - "Frozen task fixtures, input hashes, baseline revision, environment, model, tools, permissions, and run order"
  - "Raw outputs, diffs, checks, event timestamps, first-pass status, rework, elapsed time, and error category for six runs"
  - "A comparison that marks drifted runs not_comparable and identifies the most valuable checkpoint"
failure_variant: "Introduce one timeout, permission block, changed input, tool-version drift, or unknown side effect and reconcile it without rewriting the initial run"
reflection: "Which definition or checkpoint prevented rework, which comparison is invalid, and is the evidence sufficient to justify a larger evaluation?"
status: draft
last_verified: "not run"
transfer_task: "Apply the lifecycle checkpoints to a different reversible engineering or data-transformation task"
transfer_domain: "software engineering, data processing, or automation maintenance"
transfer_evidence: "Keep baselines, run records, diffs, checks, review findings, delivery notes, unknowns, and rollback points"
transfer_limitations: "Three small tasks cannot establish general cost, quality, or model rankings, and local checks do not prove deployment or user acceptance"
---

# Lab 009: Compare direct implementation with a full engineering lifecycle

## Learning objective

Test a narrow claim: whether explicit definition, planning, verification,
review, and delivery improve three fixed tasks under one controlled setup. This
is an engineering smoke test, not a leaderboard.

## Setup

Create a disposable repository with a committed baseline. Freeze three small
tasks and their acceptance checks. Use the same environment, model, tools,
permissions, network condition, and time budget for both workflows. If the
model changes, hold the workflow constant; if the workflow changes, hold the
model constant.

Candidate A receives the frozen goal, input, and acceptance rule. Candidate B
uses a written task protocol and the stages `define`, `plan`, `build`, `verify`,
`review`, and `deliver`. Restore the baseline before every task. Fix the order
in advance and report order bias as a limitation.

## Task and experiment

Use three harmless fixtures:

1. extract three named fields from a short synthetic delivery record;
2. render the record as Markdown while separating completed and unverified work;
3. review the unsupported claim “the code exists and builds, therefore the
   feature is verified.”

Run A across all tasks, then B across all tasks. Allow at most one controlled
rework per run. Preserve the initial result even when rework succeeds.

Record at least:

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

Never estimate missing time or cost. Use `unavailable`. A reworked pass does not
become a first-pass success.

## Evidence to keep

Keep the six initial outputs, any controlled rework as new attempts, all diffs,
commands, exit codes, check output, review notes, delivery summaries, and a
2-by-3 comparison table. State whether the smoke test supports `expand`,
`do_not_expand`, or `insufficient_evidence`.

## Failure case

Cause one run to encounter a timeout threshold, permission block, changed input
hash, changed tool version, or locally simulated unknown write result. Record
the last confirmed event, inspect the target before retrying, preserve the
interrupted attempt, and mark the comparison `not_comparable` if the frozen
conditions changed. A later success cannot repair comparability retroactively.

## Acceptance checklist

- [ ] Both workflows used the same frozen tasks and restored baseline.
- [ ] Six initial attempts and any rework remain separately inspectable.
- [ ] First-pass, elapsed time, rework, error class, and validation use actual values.
- [ ] At least one failure branch records reconciliation or `not_comparable` honestly.
- [ ] Build success is not presented as runtime, deployment, or user verification.
- [ ] The conclusion stays within the three-task smoke-test scope.

## Reflection and transfer

Which lifecycle stage caught the earliest consequential problem? Which stage
added ceremony without changing the result? Transfer only the useful
checkpoints to another reversible task, and state why that task is or is not
comparable.

