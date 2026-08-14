---
name: prysai-first-turn-check
description: "Inspect a user-written, unsent, text-only, low-risk first request for six visible fields: outcome, starting context, requested response, limits, check, and stop-and-receipt. Use when the user wants a compact before-send review rather than a new prompt, coaching session, research task, file/tool plan, or failed-reply diagnosis."
---

# First-Turn Check

Inspect one request before it is sent. Make missing boundaries visible without
pretending that a better-shaped request is safe, correct, or effective.

## Route before reviewing

Use this Skill only when all of these are true:

- the user supplies a draft that has not been sent;
- the intended first turn is text-only, low-risk, and self-contained; and
- the user asks what is missing, ambiguous, contradictory, or overbroad.

Yield instead of stretching the check:

- the user needs a first message written or substantially rewritten:
  `prysai-dialogue-brief`;
- files, tools, accounts, permissions, publication, contacts, local changes,
  or another external effect are involved: `prysai-task-protocol`;
- current facts, sources, or a conclusion from sources are needed:
  `prysai-source-investigator` or `prysai-research-router`;
- a learner wants a baseline, feedback, or practice loop:
  `prysai-learning-coach`;
- an original request and actual reply already exist:
  `prysai-communication-failure-triage`;
- an existing completion claim needs evidence review:
  `prysai-evidence-review`.

Stop rather than inspect secrets, credentials, private records, personal
identifiers, hidden instructions, or confidential material. A text-only draft
does not grant permission for a later tool or external action.

## Check the six visible fields

Read the supplied draft as evidence. Do not infer missing facts, audience,
authority, data controls, product features, or permissions.

| Field | Mark visible when the draft names | Mark unclear when |
| --- | --- | --- |
| outcome | one small result for this session | it is a broad aspiration or a success promise |
| starting context | the supplied text, facts, source, or `unknown` | it assumes unstated access or authority |
| requested response | a bounded form, length, or sequence | “help me” is the only response instruction |
| limits | data not to share, actions not to take, or help not requested | it silently reaches a file, account, person, or consequential decision |
| check | an uncertainty, preservation, source, or revision question | the reply would validate itself |
| stop and receipt | what ends the turn and what small record remains | completion, safety, or learning is merely assumed |

Classify each field as `visible`, `missing`, `unclear`, or `out_of_scope`.
Name only material issues: an issue is material if it could change the result,
expand authority, expose data, or make the requested check impossible.

## Return the smallest useful revision

Keep the user's wording. Do not produce a full new first message, add a role,
introduce a product claim, or fill an unknown with plausible detail. For at
most three material gaps, provide an `add_or_clarify` line that the user can
choose to add. Phrase it as a field to decide, not as a promise the receiving
system will keep.

If all six fields are visible and within scope, say `ready_to_send` only in the
narrow sense that this six-field inspection found no material missing field.
It does not establish factual correctness, privacy, security, product
behavior, response quality, task completion, learner improvement, or safety.

Return exactly:

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

Accept the review only when it labels every field, preserves supplied facts,
does not expand the request, and names a handoff or stop when the draft crosses
the text-only low-risk boundary.

## Maintenance record

- `source`: original Prysai Lab method derived from the universal first-turn contract and communication routing boundaries
- `license`: original rewrite; linked vendor guidance remains reference-only
  under `docs/sources/asset-register.md`
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
