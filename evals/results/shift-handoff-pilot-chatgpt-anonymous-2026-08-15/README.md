# Shift Handoff pilot — captured outputs, awaiting score

**Status:** `captured_unscored`  
**Date:** 2026-08-15  
**Fixture:** `shift-handoff-v1`  
**Candidate SHA:** `a99d0adae1b8211bd9a1870fc7fc02c021790046`

This evidence packet preserves one authorized model-output collection round. It
contains only fixed fictional project prompts and de-identified model text. It
does not contain private work, files, browsing, tools, credentials, real
customers, or external actions.

## What was captured

- 18 pre-specified packets, executed in randomized order, each returned one
  response: 9 `baseline` and 9 `shift_handoff`. The randomized order is not a
  random sample of tasks, models, users, or real work.
- The visible anonymous-web model label was `ChatGPT`. A precise model
  identifier/version was not exposed by the interface.
- The interface was Chinese-language; no tools were selected or invoked.
- Median web interface elapsed time was 9 seconds in each condition. This is
  only a response-collection timing observation, not user time, saved time,
  cost, or productivity.

![Capture status](capture-summary.svg)

## Files

- [packet-manifest.json](packet-manifest.json) preserves the candidate SHA,
  declared prompt hashes, randomized order, and seed. Its historical v1
  prompt-byte binding failed an after-the-fact integrity review; see
  [input-integrity-review.md](input-integrity-review.md).
- [run-log.json](run-log.json) preserves the de-identified text outputs,
  response hashes, timing, and three zero-submission preflight exclusions.

## What this does not show

The responses have not been independently human-scored against the frozen
rubric. No ready-receipt rate, rework rate, unsupported-fact rate,
unsupported-authority rate, stop-correctness score, or benefit comparison is
available. The round cannot support a claim about efficiency, productivity,
learning, IQ, safety, accuracy, model quality, or general use.

The historical v1 prompt file hashes do not bind the prepared Windows files at
the byte level. The log remains a record that 18 de-identified outputs were
captured, but the round is ineligible for comparative scoring or aggregate
analysis. Do not share its earlier local blind-review packets as a route to a
result.

Two independent human scorers must score the raw outputs while retaining
disagreements before the project runs
`scripts/analyze_shift_handoff_pilot.py`. Until then, this packet is evidence
of output collection only.
