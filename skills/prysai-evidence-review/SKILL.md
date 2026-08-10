---
name: prysai-evidence-review
description: >
  Audit Codex, Agent, research, marketing, browser, deployment, skill, or
  task-completion claims against observable evidence. Use when a result may be
  polished but incomplete, when status must be separated into verified,
  inferred, blocked, or unknown, or when a smallest next check is needed. Do
  not use to execute the missing check or to replace a source-research workflow.
---

# Evidence Review

Audit claims against evidence that another person can inspect. The absence of
evidence is not proof of failure; label the claim precisely and state the next
check.

## Trigger boundary and handoff

Take ownership when the input contains a completion claim, result, diff, test,
source-backed statement, screenshot, log, deployment report, or evaluation.

Yield when:

- an explicit `$skill` is named; review only if that explicit request is an
  audit request, while still enforcing safety;
- the user wants missing research performed: Research Router;
- the user wants an unclear task executed: Task Protocol;
- the user wants a multi-stage workflow run: Workflow Orchestrator;
- the user wants a lesson or practice exercise: Codex Coach.

Do not silently repair the artifact under review. A repair is a new task and
must be routed separately.

## Required inputs and missing-input behavior

Require `claims`, `scope`, `evidence`, `time_or_version`, and `acceptance_rule`.
For each claim also record `owner` when the result is shared or externally
published, and distinguish `not_observed` from `failed`. If a claim is missing,
request it. If evidence is missing, return an `unknown` or `blocked` assessment
and identify the smallest safe check; do not fill the gap with plausibility,
memory, or a claim copied from the artifact.

## Review method

For every claim record scope, evidence type, freshness, provenance, coverage,
and the next check. Ask whether the source is stale, generated, mocked,
wrong-target, or too narrow. Match the check to the claim: a diff for a file
change, command output for a build, runtime observation for runtime behavior,
rendered output for visual claims, authoritative URL plus date for volatile
facts, and a defined sample plus method for preference claims. A verified claim
is scoped to the evidence; do not upgrade a narrow result to a broad statement.

## Risk, side effects, and confirmation

Default risk is `R0` because review is read-only. Re-running a local check is
`R1`; network retrieval, account access, production inspection, or modifying
the artifact is `R2` or higher and requires explicit scope and confirmation.
Do not expose secrets in evidence; redact them while preserving enough context
to identify the check.

## Hard stops

Stop with `blocked` if the claimed scope or target is ambiguous, provenance is
unavailable, the evidence is inaccessible, a requested check would require
unauthorized access, or the user asks to label an unverified result as
verified. Never treat an artifact's own completion statement as proof.

## Fixed output

Return exactly:

1. `review_scope`
2. `claim_table` with `claim`, `scope`, `evidence`, `freshness`, `status`, and `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## Evidence and status mapping

Use claim status `verified`, `partially-verified`, `inferred`, `blocked`, or
`unknown`. Map the artifact status to `practice` when it is exploratory,
`candidate` when structure and basic checks pass, `verified` when normal,
boundary, failure, and transfer evidence cover the stated scope, and
`production-ready` only when safety, maintenance, ownership, versioning,
rollback, and release gates also pass.

## Maintenance record

- `source`: `docs/quality/skill-quality-standard.md`; `docs/book-architecture.md`; `docs/quality/evaluation-framework.md`
- `license`: original rewrite; external material remains reference-only under `docs/sources/asset-register.md`
- `owner`: evidence-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
