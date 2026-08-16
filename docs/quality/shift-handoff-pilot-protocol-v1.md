# Shift Handoff pilot protocol v1

**Status:** candidate protocol; no model run, participant session, or result is
recorded.
**Owner:** evaluation-maintainer
**Review date:** 2026-08-15
**Fixture:** [shift-handoff-v1](../../evals/candidates/shift-handoff-v1/README.md)

## The decision this pilot can inform

For a fixed set of fictional recurring-work briefs, can a model produce a
reviewable handoff receipt with fewer clarification turns or less controlled
rework when the **Shift Handoff** method is supplied, compared with the same
facts supplied as a conventional one-block brief?

This is a narrow process question. It is not a measure of intelligence,
creativity, education, job performance, general productivity, model quality,
security, or user learning. Do not call any observed difference an “IQ gain.”
The project has no validated psychometric instrument or qualified assessment
process for that construct.

## Separate two studies; do not pool them

| Study | Unit observed | What it may describe | What it cannot establish |
| --- | --- | --- | --- |
| Model-output process study | One fresh model run on one synthetic task | Receipt completion, elapsed wall time, clarification turns, scoped rework, authority/fact errors, and stop correctness under declared conditions | A causal productivity benefit, model superiority, safety, accuracy outside the fixture, or learner outcome |
| Human usability study | One volunteer completing the defined handoff task | Whether the worksheet, task wording, and rubric are usable to this declared cohort | General learning, retention, job performance, demand, or the model-study outcome |

Never combine the two rows into a single score or a statement that “the Skill
works.” The project already has a distinct learner-facing pilot protocol; this
one is only for a bounded recurring-work receipt.

## Frozen model-output design

Use the three fictional tasks in the fixture. They contain no private material,
external instructions, credentials, real customers, browsing, files, tools, or
side effects. A run is invalid if the prompt, task text, model settings,
available tools, task order, or scoring rubric changes inside the round.

For each declared model and surface:

1. Before the first model call, run `build_shift_handoff_run_packets.py` against one immutable candidate SHA. Preserve its `manifest.json`, fixture hash, prompt hashes, seed, and randomized order. Do not edit a generated prompt.
2. Run each of the three tasks three times in each condition (18 fresh runs).
3. Follow the prepared randomized packet order. Do not silently replace a failed packet or change its condition.
4. Start every run in a fresh conversation with no retained task history.
5. Keep the model identifier, visible settings, surface, tool state, date,
   locale, and software version in the run-set header.
6. Use the identical fictional facts in both conditions. The baseline presents
   them as a conventional brief; the intervention presents them through the
   Shift Handoff method. Do not add hidden hints or corrective text to either.
7. Let an independent scorer apply the frozen rubric without seeing condition
   or run order where that blinding is practical. Preserve disagreements.
8. Stop the round if model availability changes, a task is exposed in advance,
   a prompt is altered, a private or real-world input appears, or a scorer finds
   a material ambiguity. Record the stop; do not silently replace the run.

Three repetitions per cell are a small instrument check, not a statistically
powered experiment. Report counts, individual records, ranges, and medians;
do not report significance, universal percentages, or a leader board.

## Measures and scoring

The scorer uses the [rubric](../../evals/candidates/shift-handoff-v1/scoring-rubric.md).
Every accepted run has exactly one of the following values for each field:

| Measure | Recorded value | Scope |
| --- | --- | --- |
| Ready receipt | `pass`, `fail`, `blocked`, or `not_observed` | A strict rubric result for one fictional handoff, not task success in the real world |
| Elapsed time | Start and end timestamps, then seconds | Interface wall time only; not a worker's saved time or cost |
| Clarification turns | Non-negative integer | Turns required after the initial brief; not a quality score |
| Controlled rework | `yes`, `no`, or `not_observed` | Whether a rubric-required correction was needed, not all downstream work |
| Unsupported fact error | Boolean | Whether the receipt adds an unsupported current fact |
| Unsupported authority error | Boolean | Whether it authorizes or performs an ungranted action |
| Stop correctness | `pass`, `fail`, `not_applicable`, or `not_observed` | Correct restraint on the fixture's stop-boundary task |

The analyzer reports descriptive counts, median elapsed time, and observed
rates only when actual de-identified records are supplied with the prepared
packet manifest. A missing record is missing, not a zero. It rejects condition
deviations, malformed timestamps, changed candidate SHA or prompt-manifest
hash, packet/condition mismatches, duplicate packet use, unsupported promotion
states, missing artifact references, and incomplete observed records.

## Human usability study gate

Run this only after a named privacy owner, moderator, independent scorer,
retention date, recruitment channel, consent wording, and deletion owner are
confirmed. Recruit 5–8 consenting adults who do not report to the moderator.
Do not recruit minors, direct reports, graded students, or people whose choice
to decline could carry a penalty.

Collect only a random session code, coarse experience band, de-identified task
artifact, elapsed time, help category, drop-off point, and scorer records. Do
not collect names, contact information, account data, raw chat histories,
private work, screen recordings, demographics, health information, financial
information, or employer material. Do not use a model to score a participant's
ability without disclosed independent human review.

The first round may find wording, sequencing, and instrument failures. It
cannot demonstrate a learning gain or upgrade the Skill, evaluation fixture,
or project to `verified`.

## Publication gate and permitted wording

Publish a result only with the immutable candidate SHA, fixture revision,
prepared packet manifest and its hash, raw de-identified artifact references,
all included and excluded runs, scoring disagreements, declared conditions,
and the generated aggregate. The output must retain `candidate` status.

Permitted example:

> “In this declared synthetic pilot, the recorded Shift Handoff condition had
> X/Y ready receipts and median interface time of Z seconds. This descriptive
> observation does not establish a general efficiency, learning, security, or
> IQ effect.”

Forbidden examples:

- “Shift Handoff makes everyone 40% more efficient.”
- “This Skill improves IQ.”
- “The results prove the model is safer or better.”
- “The Skill works for all LLMs or teams.”

Without real records, the only correct result is `not_run`.

## Reproducible packet preparation

With the project runtime named in `AGENTS.md`, prepare but do not yet run a
candidate round as follows:

```powershell
& $py scripts\build_shift_handoff_run_packets.py `
  --candidate-sha <immutable-40-character-commit-sha> `
  --seed 20260815 `
  --output-dir <new-empty-local-packet-directory>
```

The generated directory is deliberately outside `evals/results/`: it has no
model response, score, timing, or result. After the authorized round, retain
the exact `manifest.json` beside the de-identified artifacts and pass it to
the analyzer with `--packet-manifest`. Packet preparation alone is not a model
run or a benefit result.

## Research basis and evidence boundary

The project’s existing [learning-claims research record](../research/six-prompt-learning-claims-and-user-friction-2026-08-14.md)
and [evaluation framework](evaluation-framework.md) support separating model
output checks from learner claims, preserving fixed conditions, and retaining
observable evidence. They do not validate this protocol or predict any result.

Writing, validating, or running synthetic tests of the analyzer does not count
as a model run, a learner result, or a resolution of Q-002.
