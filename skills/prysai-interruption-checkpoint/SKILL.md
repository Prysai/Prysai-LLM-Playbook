---
name: prysai-interruption-checkpoint
description: Preserve observable task state after an interrupted LLM-assisted task and choose one safe next decision. Use when a model is unavailable, a task times out, a session is lost, a tool is missing, or a handoff disconnects before acceptance evidence is visible. Do not use to retry, diagnose a preserved interaction, audit an existing claim, or infer platform behavior.
---

# Interruption Checkpoint

Own the first safe minute after an interruption. Preserve what can be seen,
keep what cannot be seen as `unknown`, and stop before a new action turns an
unclear task into an unreviewable story.

## Route only the interruption seam

Use this Skill when a task may be partial and a visible interruption leaves
the next step unclear. Examples include an unavailable-model message, timeout,
lost session, missing tool, or disconnected handoff.

Yield instead when:

- a preserved request, reply, and expected outcome need a communication repair:
  use Communication Failure Triage;
- a completion, reliability, or release claim needs an evidence audit: use
  Evidence Review;
- a current named-platform fact needs a source check: use Source Investigator;
- a new or changed task needs its action and permission contract: use Task
  Protocol.

Do not diagnose a provider, infer a root cause, compare models, explain an
account state, or create a general recovery procedure from one interruption.

## Preserve the minimum evidence packet

Collect only what the requester can already observe:

1. `goal` — the intended outcome in one sentence;
2. `observed_event` — what visibly interrupted the task, without a cause;
3. `last_inspectable_artifact` — a diff, test result, file view, note, or
   `none_observed`;
4. `acceptance_evidence` — the check that would establish completion, or
   `unknown`; and
5. `external_actions` — everything already sent, changed, uploaded, spent,
   committed, or published, or `not_observed`.

Never fill a missing field with a plausible account. Do not request secrets,
tokens, passwords, cookies, private logs, account screenshots, or unrelated
task context.

## Classify without completing the story

Use one state only:

- `complete` only when the stated acceptance evidence is already inspectable;
- `partial` when an inspectable artifact exists but does not establish the
  stated acceptance check; or
- `unknown` when the artifact, its meaning, or the acceptance evidence is
  absent.

An interruption message is neither a diagnosis nor task evidence. A new
prompt does not inherit completion proof from an earlier task.

## Choose one bounded next decision

Default to `hold` at `R0`: preserve the receipt and take no action.

Offer `inspect_local` at `R1` only when the requester names one local,
reversible inspection target, the exact observation sought, and the fact that
the inspection cannot prove the earlier task complete by itself. This Skill
records that decision; it does not run the inspection.

For a fresh task, retry, tool use, model switch, setting change, account
inspection, network request, upload, spend, commit, push, publish, or deploy,
stop and hand off to Task Protocol. Require a separately scoped permission,
checkpoint, rollback, and acceptance check there.

## Stop conditions

Return `blocked` when the goal, last inspectable artifact, acceptance meaning,
or authority for the next external action is missing. Never:

- retry automatically or send “continue from where you left off”;
- switch a model, account, plan, setting, or provider;
- treat a source report as the cause of the interruption;
- inspect an account or external service; or
- call the task complete from a partial artifact or reassuring reply.

## Deliver the checkpoint receipt

Return exactly:

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

Accept the receipt only when it preserves `unknown` explicitly, separates the
interruption from completion, names no unapproved external action, and assigns
at most one next decision. This is a candidate method, not evidence that a
task can be recovered, a service is available, or a learner can use it well.

## Maintenance record

- `source`: original Prysai Lab method derived from the source-bounded interruption checkpoint case, task protocol, and evidence-review boundaries
- `license`: original rewrite; public capacity report and API documentation remain reference-only under `docs/sources/asset-register.md`
- `owner`: reliability-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
