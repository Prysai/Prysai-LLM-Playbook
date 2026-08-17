<!-- content_id: llm-core-check-repair | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-17 -->

# Check, repair, and state limits

**Unit:** `core-check-repair`
**Status:** `candidate`. **Run status:** `not_run`.
**Time:** about 20 minutes. **Prerequisite:** [Recognize visible LLM failures](llm-core-visible-failures-EN.md).

## The result you should keep

You will compare a response with a supplied notice, mark each claim
`PASS`, `FAIL`, or `UNSURE`, make the smallest safe correction, and write one
limitation. The aim is not to make the prose prettier. The aim is to remove an
unsupported claim without adding a new one.

## Freeze the notice and response

Use these fictional records exactly:

**Notice**

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room number will be confirmed later.

**Response to check**

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> meeting is in Room 4.

Do not search for a room number. The notice intentionally leaves it unknown.

## Mark each claim

Write one row per claim. A status is about the evidence in this fixture, not a
general rating of a model.

| Claim | Status | Evidence or reason |
|---|---|---|
| Tuesday at 18:00 | `PASS` | Quote the matching notice text. |
| Bring a notebook | `PASS` | Quote the matching notice text. |
| The meeting is in Room 4 | `FAIL` | No room number appears in the notice. |
| The room number is known | `UNSURE` | The notice says it will be confirmed later. |

Use `PASS` only when the supplied material supports the claim. Use `FAIL` when
the claim conflicts with or adds to the supplied material. Use `UNSURE` when
the material does not decide the question. Do not turn `UNSURE` into `FAIL`
just because a claim sounds unlikely.

## Make the minimum repair

Record the exact difference:

```text
Before: The meeting is in Room 4.
After:  The room number will be confirmed later.
Reason: The notice contains the second sentence and no room number.
```

Do not rewrite the time, audience, or notebook sentence. Do not add a contact,
fee, promise, or source. If the repair would require a new fact, stop and leave
the claim `UNSURE`.

## Write the limit

End the receipt with one sentence such as:

> This check establishes only that this response adds an unsupported room
> number relative to this fictional notice; it does not establish how often a
> model makes this error or whether the notice is true outside the exercise.

The limit is part of the result. A repaired sentence is not the same as a
verified real-world event.

## Unit completion check

An attempted receipt contains:

- the four claim rows and their `PASS` / `FAIL` / `UNSURE` statuses;
- the exact before/after difference;
- the supplied evidence for the first failed claim; and
- one limitation sentence.

Score it as follows:

- `0` — it rewrites broadly, adds a new unsupported fact, or says `verified`
  without a check;
- `1` — it marks a mismatch but changes too much or omits the remaining
  unknown; and
- `2` — it preserves the check statuses, makes the minimum correction, shows
  the difference, and states a limitation.

The next unit removes the complete example and asks you to repeat the method on
an unseen fictional notice.

## Optional deeper material and boundary

[Chapter 9: Verification, doubt, and recovery](../chapters/09-verification-and-recovery-EN.md)
and [Lab 003: Evidence review](../labs/lab-003-evidence-review-EN.md) cover
larger claim sets, recovery order, and hand-offs. They are not required for
this first check and remain `candidate`/`draft` with `not_run` evidence.

This route is original Prysai teaching material. No external prompt, response,
source text, user record, or model output is copied. It does not prove factual
accuracy, model reliability, learner improvement, safety, or transfer.
