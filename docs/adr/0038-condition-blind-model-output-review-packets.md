# ADR-0038: prepare condition-blind model-output review packets

## Status

Accepted.

## Date

2026-08-15

## Context

The Shift Handoff candidate pilot has one collection record with 18
pre-specified fictional prompts and retained response artifacts. Raw output
alone does not support a comparative claim: an evaluator can see the
condition, packet order, and expected layout, then unconsciously score style
or method identity rather than the visible receipt.

The historical v1 packet directory later failed a byte-binding review because
Windows newline conversion changed the prepared files after their hashes were
calculated. ADR-0039 now prevents that legacy collection from entering this
blind-review workflow. This decision remains the design for a future eligible
v2 packet only.

The project needs a practical handoff for two independent reviewers without
pretending that a model, an automated checker, or the maintenance author is an
independent human scorer.

## Decision

1. Generate two identical reviewer folders from one captured run log and its
   byte-bound prepared packet manifest.
2. Give reviewers randomized blind IDs, fictional scenario facts, frozen
   rubric fields, and response text only.
3. Keep original packet IDs, conditions, run order, and artifact mapping in a
   maintainer-only key. Reveal it only after both score sheets return.
4. Reject malformed response hashes, absent response artifacts, condition
   deviations, incomplete coverage, a changed manifest hash, non-empty output
   targets, and literal condition markers in reviewer-visible metadata.
5. Keep scoring, disagreement resolution, and aggregate generation separate.

## Alternatives considered

### Ask the model to score its own outputs

Rejected. That is not independent human scoring and would not resolve the
evaluation protocol's core review limitation.

### Share full prompt packets with each reviewer

Rejected. It removes even practical condition blinding and makes a style-based
judgment more likely.

### Automatically redact every structural clue from responses

Rejected. It would alter the evidence being scored. The generator hides known
metadata but preserves original output text and states this residual limit.

## Consequences

- The project can hand off a future v2 byte-bound output round for review
  without changing the prompts or responses.
- The historical v1 output collection remains preserved but cannot enter the
  comparative review path.
- Completion still requires named independent reviewers, preserved scores,
  disagreement handling, and a documented final-record procedure.
- The generated packets are local review material, not a public benchmark,
  score, release artifact, or proof that the method is better.

## Evidence boundary

Passing the generator and its negative tests proves that the declared packet
format protects its own input bindings and hides the named metadata. It does
not prove reviewers are independent, blinding is complete, the rubric is
reliable, a response is correct, or either condition improves any real work.
