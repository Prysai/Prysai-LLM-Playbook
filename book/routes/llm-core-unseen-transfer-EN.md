<!-- content_id: llm-core-unseen-transfer | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-17 -->

# Repeat the method on an unseen task

**Unit:** `core-unseen-transfer`
**Status:** `candidate`. **Run status:** `not_run`.
**Time:** about 25 minutes. **Prerequisite:** [Check, repair, and state limits](llm-core-check-repair-EN.md).

## What changes here

This task changes the setting and wording. You will not receive a complete
prompt or a model answer. The target is a narrow observation: can you repeat
the method on a different fictional notice while keeping help and unknowns
visible? One attempt cannot prove durable learning, mastery, or retention.

## The unseen notice

Read this once, then write your own task card before opening a model:

> The neighborhood library's quiet room is available Wednesday from 09:00 to
> 11:00. Visitors should bring a library card. The reservation confirmation
> will arrive later.

Do not add a room number, contact, booking status, or policy that the notice
does not contain. Do not use private library information or make a real
reservation.

## Your independent attempt

Without copying a previous prompt, decide and record:

1. the observable result you want;
2. the exact material the model may use;
3. the constraints and forbidden additions;
4. the response shape; and
5. the stop condition for browsing, sending, or booking.

Send your own bounded request to a text-only chat, preserve the first response,
and check every claim against the notice. If you ask for a cue, record the cue
before continuing. Do not request or view a complete answer before your first
attempt.

## Receipt fields

Keep a small, de-identified receipt with these headings:

```text
Unseen task and material:
My task card:
First request:
First response:
Checks (PASS / FAIL / UNSURE):
Minimum correction, if any:
Help used:
What remains unknown:
Limit of this observation:
```

The receipt should show the method, not just a polished final paragraph. If the
first response is correct, still include an independent check. If no repair is
needed, write `no change` and explain why.

## Stop and downgrade

Stop the exercise and record `blocked` or `not_observed` when:

- the notice is missing, changed after the attempt, or cannot be compared;
- a model answer was shown before your first request;
- the task becomes a real booking, message, upload, or account action;
- private data or credentials would be required; or
- the response cannot be separated from the help you received.

These are data-quality boundaries, not a punishment. A missing record is not a
zero and is not evidence of success.

## Unit completion check

An attempted receipt includes an unseen task, the first request and response,
claim checks, any minimum correction, help disclosure, and a limitation.

- `0` — the example was exposed, the task is a near-copy, or the receipt calls
  one success mastery or retention;
- `1` — a changed task is attempted with substantial help but one method step
  or boundary is missing; and
- `2` — you independently repeat define -> attempt -> check -> repair -> limit,
  disclose help, and avoid claims beyond this task.

The route remains `candidate / not_run`; the score is not a course-completion
certificate. A future learner observation must use the fixed rubric, preserve
withdrawals and disagreements, and keep the conditions visible.

## Sources and limits

This is original Prysai teaching material. The notice, task, and receipt fields
are fictional and offline. No external prompt, response, learner record, model
output, account data, or private library information is copied. The exercise
does not establish learning, retention, transfer, model behavior, or
cross-platform equivalence.
