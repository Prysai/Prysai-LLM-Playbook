---
name: prysai-dialogue-brief
description: Turn an untried, low-risk request for LLM help into one short, copy-ready first-turn dialogue brief with a stated outcome, audience, supplied inputs, constraints, output shape, acceptance check, and stop boundary. Use when the user has a roughly defined communication goal but needs a clear first message; do not use for coaching, research, a task with files or external effects, or repairing an already failed reply.
---

# Dialogue Brief

Create one small first message that the user can inspect and send. This Skill
owns the seam before a substantive model answer, tool action, research step, or
teaching loop begins. It does not execute the request or judge the answer.

## Route before drafting

Use this Skill only if all of these are true:

- the user has not yet sent the request or received a reply to repair;
- the desired result is a text-only, low-risk first conversation;
- no files, tools, account access, browsing, private records, publication, or
  external action are needed; and
- the user wants help expressing one bounded request, not help practising a
  skill or researching a factual question.

Yield instead of stretching the brief:

- a learner wants a baseline, feedback, correction, or transfer practice:
  `prysai-learning-coach`;
- the request involves Codex concepts, tools, Skills, or Agent behavior:
  `prysai-codex-coach`;
- files, tools, accounts, permissions, external actions, or a real delivery
  target are involved: `prysai-task-protocol`;
- the user needs current facts, sources, or a source-backed conclusion:
  `prysai-source-investigator` or `prysai-research-router`;
- the original request and an unsatisfactory reply already exist:
  `prysai-communication-failure-triage`;
- the user asks whether an existing claim is supported: `prysai-evidence-review`.

Stop rather than requesting secrets, sensitive personal data, unpublished
records, credentials, account state, or private prompts. A request to draft a
brief does not authorize a later action.

## Collect only the first-turn essentials

Collect these fields, using the user's words where possible:

```text
outcome: one observable result from the first reply
audience: who will use or read the result
supplied_inputs: the safe text or facts available for this turn
constraints: facts to preserve, limits, tone, exclusions, or help policy
output_shape: the requested form and length
acceptance_check: what the user will inspect before accepting it
stop_boundary: what must not happen or what missing fact ends the turn
```

If one missing field would materially change the result, return the
`needs_clarification` receipt below with **one** plain clarifying question.
Do not draft a partial brief, collect a biography, invent an audience, fill an
unknown with a plausible detail, or ask several questions merely to make the
brief look thorough. If the observable outcome cannot be named after that one
clarification, return `blocked: outcome_not_observable` and state the smallest
missing decision.

## Draft the first-turn brief

Return a 120–180-word brief followed by a copy-ready first message. Keep the
scope to one turn. Use direct, ordinary language; do not add roles, emotional
pressure, hidden-reasoning requests, performance promises, or generic “be
helpful” filler.

The copy-ready message must contain these labeled elements in natural prose:

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

If the user has not supplied a fact needed for the answer, ask the receiving
model to label that fact `unknown` rather than inventing it. If sources are
needed, request a source plan or stop; do not request a confident factual
answer without evidence.

## Return a compact receipt

If a material field is missing, return exactly:

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

Once the fields are sufficient, return exactly:

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

Accept the output only when it preserves the supplied facts, contains one
observable acceptance check, forbids unstated action or data expansion, and
names a route for work outside the first turn. `ready_to_copy` means only that
the brief is present; it does not establish model behavior, answer quality,
learning, factual correctness, user satisfaction, or completion.

## Maintenance record

- `source`: original Prysai Lab method derived from the communication-clinic,
  task, evidence, and routing contracts
- `license`: original rewrite; external material remains reference-only under
  `docs/sources/asset-register.md`
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
