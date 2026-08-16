---
name: prysai-shift-handoff
description: >
  Prepare one current-work brief for a recurring LLM collaboration by keeping
  reusable criteria, the changing item, authority, and acceptance evidence
  distinct. Use when yesterday's context or an earlier example could be
  mistaken for today's work. Do not use to create a product context, design a
  full task protocol, recover an interrupted task, audit a completed claim, or
  execute an action.
---

# Shift Handoff

Prepare the smallest brief that makes one changing work item visible without
pretending that a prior chat turn, example, permission, or result still applies.
This Skill prepares a handoff; it does not send a prompt, inspect a system, or
perform the work.

## Own only the recurring-work seam

Use this Skill when a repeated text workflow already has durable criteria but
one item changes: for example, classify today's feedback note under an approved
taxonomy, review this week's short update against stable house style, or turn
one new source record into a fixed output shape.

Yield instead when:

- the reusable product, audience, positioning, or measurement context itself
  needs a versioned decision: use Product Context;
- the outcome, scope, authority, or acceptance for this task is still unclear:
  use Task Protocol;
- a prior task stopped before its evidence was visible: use Interruption
  Checkpoint;
- a request, reply, and expected result already exist and need a controlled
  repair: use Communication Failure Triage;
- the changing item is a current fact that needs a source check: use Source
  Investigator; or
- the work includes a file, dataset, tool, account, network request, shared
  system, or external action: hand off to Task Protocol before preparing a
  current-item brief.

Do not turn one repeated-chat pattern into a claim about memory, context-window
behavior, cost, persistence, automation, or a named product configuration.

## Require a stable card and a current card

Collect only the following visible inputs. Mark an absent field `missing`; do
not retrieve it from another chat turn or infer it from an earlier example.

**Stable card** — reusable within a named work stream:

1. `work_stream` — the recurring job in plain language;
2. `criteria_revision` — a version, date, or immutable reference to the rules;
3. `allowed_inputs` — material that may be used for every item;
4. `forbidden_assumptions` — facts, sources, permissions, or previous outputs
   that must not be inherited; and
5. `response_shape` — the required form of the result.

**Current card** — true only for this one item:

1. `item_id` — a non-sensitive local label;
2. `item_input` — the supplied current text or a minimal safe summary;
3. `item_change` — what is new or different today;
4. `task_request` — the one result requested now;
5. `acceptance_evidence` — the visible rule or artifact that will check it; and
6. `authority_and_risk` — `R0` text-only preparation, or `handoff_required`.

Reject a brief when the item contains a secret, private record, unlicensed
source text, unsupported factual claim, or an unapproved action. Do not ask for
unnecessary prior conversation history.

## Compare before writing

1. Identify every field that belongs to the stable card and every field that
   belongs only to the current item.
2. Preserve an earlier example only as a labelled reference. It is not a fact
   about the current item and is never an acceptance result.
3. Mark any current fact, permission, source, deadline, destination, or
   acceptance check that was not supplied again as `missing` or `not_authorized`.
4. Stop if the current item changes the stable criteria. Do not silently amend
   the reusable card; hand off to its owner or to Product Context/Task Protocol
   as appropriate.
5. Return a ready-to-copy brief only for `R0`, supplied-text work. The later
   action still needs its own boundary and evidence.

## Return one handoff receipt

Return exactly:

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

Use `ready_for_text_only_current_item` only when the stable and current cards,
request, response shape, acceptance evidence, and R0 boundary are all visible.
The receipt is a context boundary, not evidence that a model retained rules,
understood the item, generated a correct answer, or completed the next task.

## Failure checks

Stop or hand off when:

- a requester says "use the same rules as last time" but cannot name the
  criteria revision or current acceptance check;
- an old example silently becomes today's source or truth;
- a current item includes files, credentials, private material, browsing,
  publication, spending, account changes, or another external effect;
- the current item changes the stable rubric, permission, destination, or
  output contract; or
- a response is already being treated as complete. Use Evidence Review rather
  than relabeling it as a handoff.

## Maintenance record

- `source`: original Prysai Lab method derived from the source-bounded recurring-item research record, Task Protocol, Product Context, and Interruption Checkpoint boundaries
- `license`: original rewrite; official guidance and public reports remain reference-only under `docs/sources/asset-register.md`
- `owner`: workflow-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
