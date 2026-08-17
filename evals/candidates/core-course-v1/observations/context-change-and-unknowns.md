# Experiment A — Context change and unknowns

**Status:** `candidate`  
**Run status:** `not_run`  
**Primary outcome:** `identify` and `repair`

## Question

When the supplied context changes, does the learner update only the claims
supported by the new record and leave missing details marked as unknown?

This is a small source-fidelity observation. It is not a test of memory, model
quality, or a claim that the learner will transfer the method to other domains.

## Fixed material

Show Version A before the first attempt:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. The
> room number will be confirmed later.

Show this response without telling the participant which line is wrong:

> The community room is reserved for Tuesday at 18:00. Bring a notebook. Meet
> in Room 4.

After the first classification is recorded, replace the source with Version B:

> The community room is reserved for Wednesday at 18:00. Bring a notebook. The
> room number is still unconfirmed.

Use the same response text for the second classification. Do not let the
participant edit the response before both classifications are recorded.

## Procedure

1. Give the participant Version A and the response. Ask them to mark each
   response claim `PASS`, `FAIL`, or `UNSURE` and quote the source line used.
2. Ask what, if anything, the response establishes about the room number.
3. Record the first artifact before offering a cue. A cue may name the need to
   compare every claim with the supplied source; it may not reveal a label or
   answer.
4. Give Version B and repeat the same questions with no new explanation.
5. Ask for the smallest repair that is safe under Version B and one sentence
   describing what the records still do not establish.

## Required record

```text
candidate_sha | context_revision | first_artifact | changed_context_artifact
claim_statuses_a | claim_statuses_b | source_quotes_a | source_quotes_b
repair_before | repair_after | limit_statement | help_used
reviewer_1 | reviewer_2 | disagreement | claim_status | limits
```

The reviewer stores only the learner's de-identified artifact and the quoted
fictional lines. Do not store a transcript, account identifier, personal
example, or raw chat history.

## Acceptance notes for reviewers

- The learner must notice that the day changed from Tuesday to Wednesday.
- The learner must not treat the room number as known in either version.
- A valid repair must not invent a room number or silently change the time.
- A correct answer without a source quote is incomplete evidence for this
  experiment.
- If Version B is shown before the first artifact, mark the run `invalidated`
  rather than treating the second attempt as independent.

These notes are for scoring after the first attempt; do not show them during
the task.

## Stop rules

Stop if the participant supplies private material, asks to use a real event, or
tries to send or publish the notice. Stop if the source cannot be kept fixed.
Record the reason code and keep the partial artifact as `not_observed`.

## Interpretation boundary

A future run can show only how this named learner, response, context pair, and
rubric behaved under the recorded conditions. It cannot prove retention,
general source-checking ability, model behavior, or cross-platform equivalence.
