---
name: prysai-workflow-orchestrator
description: >
  Orchestrate complex Codex work across definition, task protocol, planning,
  incremental execution, verification, review, delivery, and maintenance. Use
  when a request spans multiple steps, files, tools, domains, or checkpoints,
  or asks for an end-to-end delivery. Do not use for a single bounded action,
  a learning explanation, a standalone evidence audit, or a one-time research
  question.
---

# Workflow Orchestrator

Maintain a finite, auditable lifecycle. This Skill coordinates stages; it does
not grant permissions, replace domain judgment, or claim completion for a
stage it did not verify.

## Trigger boundary and handoff

Take ownership when work has at least two dependent stages or needs checkpoints,
recovery, multiple artifacts, or cross-domain coordination.

Yield when:

- an explicit `$skill` is named for a bounded subtask; record it as a stage and
  preserve its scope;
- the request is a single unclear action: Task Protocol first;
- the request is only teaching: Codex Coach;
- the request is only reviewing evidence: Evidence Review;
- the request is only source discovery/synthesis: Research Router;
- the request is only choosing Skills: Skill Selector;
- the request is only creating shared positioning context: Product Context.

The only permitted internal handoff loop is `orchestrator -> task protocol ->
one domain route -> evidence review -> orchestrator checkpoint`. Do not call the
orchestrator from a stage, and do not restart a completed stage without a new
finding or changed scope.

## Required inputs and missing-input behavior

Require `outcome`, `non_goals`, `stages`, `dependencies`, `allowed_actions`,
`acceptance_evidence`, `checkpoints`, `rollback`, and `owner`. If stages or
dependencies are unclear, return a proposed plan with `blocked_on` fields. The
contract must also name a `decision_owner`, an exact `delivery_target`, and the
meaning of any `commit` step: local commit, push, pull request, or publication
are different actions with different confirmation gates. Ask only the smallest
question that changes the route or risk.

Before a stage can be marked `in-progress`, record these fields for that stage:

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

Missing `delivery_target`, owner, acceptance evidence, or rollback is an
execution block, not permission to guess a target.

## Lifecycle and checkpoints

1. Define outcome, users, non-goals, risks, and acceptance.
2. Create or validate the task protocol once.
3. Slice work into reversible vertical stages with an owner and evidence.
4. Execute one stage at a time and preserve diffs, logs, and run IDs.
5. Verify each claim with the appropriate test, runtime, browser, source,
   security, visual, or human evidence.
6. Review scope, assumptions, maintainability, and failure paths.
7. Deliver completed, incomplete, inferred, blocked, and next-step items.
8. Record maintenance, source refresh, migration, and rollback notes.

The delivery target is part of the stage graph, not an afterthought. A local
commit, a push to a shared branch, a pull request, and a public release must be
listed as separate stages when more than one is requested.

## Risk, side effects, and confirmation

Classify each stage `R0` read-only, `R1` reversible local, `R2` shared or
external, or `R3` production, irreversible, secret-bearing, or broad access.
Pause immediately before a permission expansion, secret access, external
message, commit/push/publication, production change, or irreversible action.
The user must confirm the exact stage, target, and side effect; orchestration
does not inherit approval from an earlier unrelated stage.

## Hard stops and recovery

Stop with `blocked` for unresolved ownership, missing acceptance, unsafe target,
conflicting instructions, failed rollback, lost evidence, or repeated failure
without a new hypothesis. Preserve the failure, narrow scope, make one
evidence-backed change, and rerun only the relevant check. Never broaden
permissions or retry indefinitely.

## Fixed output

Return exactly:

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## Evidence and status mapping

Use stage statuses `not-started`, `in-progress`, `blocked`, `verified`, or
`accepted`. Use overall `practice` for exploration, `candidate` when the
workflow is structured and basic checks pass, `verified` when every declared
stage and boundary case has evidence, and `production-ready` only after
release, security, ownership, maintenance, and rollback gates pass.

## Maintenance record

- `source`: `docs/book-architecture.md`; `docs/charter.md`; `docs/quality/skill-quality-standard.md`
- `license`: original rewrite; external material remains reference-only under `docs/sources/asset-register.md`
- `owner`: workflow-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
