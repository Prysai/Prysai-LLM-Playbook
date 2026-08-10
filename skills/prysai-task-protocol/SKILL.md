---
name: prysai-task-protocol
description: >
  Turn an underspecified request into a bounded Codex task protocol covering
  outcome, context, inputs, constraints, allowed actions, acceptance evidence,
  failure handling, and delivery. Use when a request is vague, high-rework,
  permission-sensitive, or has external side effects. Do not use as the
  primary route for learning, evidence auditing, research synthesis, product
  context, skill selection, or multi-stage orchestration after the contract is
  already clear.
---

# Task Protocol

Create the smallest contract that makes one task executable and auditable.
This Skill defines the boundary; it does not execute the task.

## Trigger boundary and handoff

Take ownership for vague verbs such as "improve", "build", "research", or
"connect", and whenever scope, authority, acceptance, or side effects are
unclear.

Yield when:

- an explicit `$skill` is named; preserve that route and add only mandatory
  safety questions;
- a complete protocol is already supplied and the user wants execution: hand
  off to Workflow Orchestrator or the relevant domain route;
- the user is asking whether an existing result is true: Evidence Review;
- the unresolved work is source discovery: Research Router;
- the unresolved work is product positioning: Product Context;
- the unresolved work is Skill choice or installation: Skill Selector.

Never call itself again. It may list a handoff, but it does not recursively
rebuild a protocol after another Skill returns unless the user changes scope.

## Required inputs and missing-input behavior

Collect `goal`, `background`, `inputs`, `constraints`, `allowed_actions`,
`acceptance_evidence`, `failure_handling`, and `delivery_format`. Also classify
`risk` as `R0`, `R1`, `R2`, or `R3`, and record `owner`, `checkpoint`,
`rollback`, and `confirmation` when the task can change shared or external
state. Mark unknowns as `missing`, not as assumptions. Inspect a local,
low-risk input before asking about it; ask only questions that change scope,
risk, implementation choice, or acceptance. For an external, secret-bearing,
production, irreversible, or ownership-sensitive gap, return `blocked on
<field>` and do not execute.

Apply this minimum risk gate before declaring the protocol ready:

| Risk | Required contract | Default action |
|---|---|---|
| `R0` | exact read scope, inputs, acceptance check, and no-write boundary | explanation or read-only inspection only |
| `R1` | exact local target, allowed write/command set, checkpoint, rollback target, and reversible acceptance check | local reversible action only |
| `R2` | exact shared/external target, data exposure, owner, action-level confirmation, checkpoint, rollback, and evidence owner | blocked until the named confirmation is recorded |
| `R3` | all `R2` fields plus narrow purpose, independent check, and explicit confirmation immediately before the irreversible, production, secret-bearing, or broad action | hard stop; do not execute from this protocol alone |

Represent `read`, `edit`, `run`, `network`, `commit`, `push`, `publish`,
`deploy`, `restart`, and `secret` access as separate action records with
`allowed`, `not_allowed`, or `confirmation_required` state. A broad permission,
token, login, or prior approval does not authorize an unlisted action. If the
user asks for multiple actions, split them into stages with separate risk,
target, confirmation, checkpoint, rollback, and acceptance evidence.

## Build order

1. State the outcome and beneficiary.
2. Bound files, systems, accounts, versions, and time period.
3. Separate allowed reads, writes, commands, network calls, commits, pushes,
   and publications; do not put them under one undifferentiated permission.
4. Assign the risk level and define the exact target, owner, confirmation point,
   checkpoint, rollback and observable acceptance evidence.
5. Mark assumptions, unknowns, and the next handoff.

For every acceptance claim, name the observable artifact or command output that
would prove it and the boundary it cannot prove. A protocol is not execution
evidence. Do not mark an action complete because it was requested, planned,
started, or returned plausible text.

## Risk, side effects, and confirmation

Classify `R0` explanation/read-only, `R1` reversible local change, `R2`
external service or shared-repository change, and `R3` production,
irreversible, secret-bearing, or broad-permission action. A protocol may
describe a side effect, but execution requires explicit authorization scoped to
the exact target and action. Confirmation for "all permissions" is not a
substitute for a narrow target. Never include secrets in the protocol. For
`R2`/`R3`, confirmation must occur after the target and action are fixed, not
before. Do not treat a successful build, login, or dry run as confirmation of a
later write, push, publication, deployment, or restart.

## Hard stops

Return `blocked` when the beneficiary or outcome is missing, ownership is
unclear, acceptance cannot be observed, a secret would be exposed, a target is
ambiguous, an irreversible action lacks confirmation, or a project rule and
user request conflict. Preserve the failed condition and stop reason. A retry is
permitted only when one stated condition changes and the new check is named;
otherwise return `blocked` or `unverified` rather than retrying indefinitely.
Do not convert a missing field into a guessed default when it changes risk or
scope.

## Fixed output

Return exactly:

1. `protocol_status` (`ready_to_execute` or `blocked_on`)
2. `goal`
3. `background`
4. `inputs_and_unknowns`
5. `constraints`
6. `allowed_actions_and_permissions` — separate action records with action
   state, target, risk, data exposure, and confirmation requirement
7. `acceptance_evidence`
8. `failure_handling`
9. `delivery_format`
10. `handoff`
11. `risk`
12. `owner_and_confirmation` — exact decision owner, confirmation point, and
    unconfirmed actions
13. `checkpoint_and_rollback` — observable artifact, restore target, and
    recovery decision
14. `content_status`

## Evidence and status mapping

The protocol itself is `draft` until all fields are present, `candidate` when
the contract passes a local completeness check but has not been exercised,
`verified` only after the stated acceptance evidence is observed, and
`production-ready` only after production, rollback, maintenance, and ownership
gates pass. Verify the protocol by checking required fields against the risk
gate, comparing each action with the exact target and permission state, and
tracing every acceptance claim to an observable check. For `R2` and `R3`, verify
the confirmation point, checkpoint, rollback, and data-exposure record
separately. Do not mark the task complete from protocol readiness.

## Maintenance record

- `source`: `CONTEXT.md`; `docs/charter.md`; `docs/quality/skill-quality-standard.md`
- `license`: original rewrite; external material remains reference-only under `docs/sources/asset-register.md`
- `owner`: task-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
