# Experiment B — First-request contract

**Status:** `candidate`  
**Run status:** `not_run`  
**Primary outcome:** `initiate`

## Question

Before asking for a polished answer, can the learner make the task observable
by stating the goal, supplied material, constraints, response shape, and stop
condition?

The experiment observes request design, not whether a particular model follows
the request. A model response may be omitted entirely; a bounded request is the
primary artifact.

## Fixed task

Give the learner only this fictional source:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room number will be confirmed later.

Ask:

> Write one request for a text chat that turns this notice into a short message
> for a new member. The message must preserve the stated facts and must not
> invent a room number. You may ask for a check, but do not send, publish,
> browse, or use a file.

Do not show the example request in the course before the first artifact is
locked. Do not require a named vendor, account, model, tool, or paid feature.

## Procedure

1. Read the task and source aloud or present them in a fixed worksheet.
2. Ask the learner to write the first request without a template. Record it
   before answering questions.
3. If a clarification is requested, answer only the literal task question and
   record the help. Do not suggest missing fields.
4. Ask the learner to label where the request states each contract field:
   `goal`, `material`, `constraints`, `response_shape`, and `stop`.
5. If a text model is safely available, let the learner send only the recorded
   request and retain the first response. Otherwise use the offline fixture
   below and record `no_model_surface`.
6. Ask the learner to identify one thing the first response must be checked
   against the source. Do not repair the response for them.

## Offline response fixture

If no model surface is available, show this fixed response after the request is
locked:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room is 4.

Ask only which claim needs checking and what the source actually says. This
keeps the experiment runnable without an account or external request.

## Required record

```text
candidate_sha | task_revision | first_request | field_map
model_and_surface | first_response_or_no_model_surface | first_check
help_used | stop_decision | reviewer_1 | reviewer_2
disagreement | claim_status | limits
```

Do not store an account name, private conversation, personal source material,
or a transcript beyond the fixed fictional record. A participant may decline
the model step; the request artifact remains usable and the model field is
`not_available`.

## Acceptance notes for reviewers

- A complete field map identifies all five fields, even if the request is
  short.
- `material` must point to the supplied notice, not to imagined facts or a
  private file.
- `constraints` must preserve facts and prohibit an invented room number.
- `response_shape` must describe what the answer should look like; a vague
  “help me” is not a shape.
- `stop` must prevent browsing, sending, publishing, file use, or another
  external action for this task.
- A polished request with no field map is partial evidence, not independent
  proof of the contract.

These notes are for scoring after the first attempt; do not show them during
the task.

## Stop rules

Stop if the learner pastes private material, requests a real-world action,
introduces a tool or account, or cannot keep the fictional source fixed. Mark
the attempt `not_observed` when the required artifact cannot be compared.

## Interpretation boundary

A future run can show only whether this learner made this named fictional task
observable under the recorded conditions. It cannot prove prompt effectiveness,
model compliance, task success, long-term learning, or cross-platform behavior.
