# Five repeated local verification runs

**Status:** candidate engineering observation
**Recorded:** 2026-08-15 (America/Los_Angeles)
**Data:** [machine-readable run timings](verification-stability-2026-08-15.json) · [chart](verification-stability-2026-08-15.svg)

## What was actually observed

Seven local repository checks were run sequentially five times in the current
Windows worktree. Every recorded run exited successfully. The chart below
shows the median duration of each check; the table preserves all five raw
timings so that the summary can be checked rather than trusted.

![Median duration for five repeated local verification runs](verification-stability-2026-08-15.svg)

On a phone, use the table below for the exact values. The Reader presents this
dense chart as a named link so that it can be opened at full size rather than
being mistaken for a readable mobile graphic.

| Check | Passes | Raw timings (ms) | Median (ms) | Mean (ms) |
| --- | ---: | --- | ---: | ---: |
| Project baseline | 5 / 5 | 48.9, 38.3, 36.1, 34.4, 35.1 | 36.1 | 38.6 |
| Project structure | 5 / 5 | 43.2, 42.3, 40.5, 39.1, 39.5 | 40.5 | 40.9 |
| Content completeness | 5 / 5 | 49.4, 47.5, 46.9, 47.0, 44.7 | 47.0 | 47.1 |
| English learning contract | 5 / 5 | 86.8, 83.8, 84.5, 83.1, 83.9 | 83.9 | 84.4 |
| Skill registry | 5 / 5 | 49.7, 47.4, 47.6, 48.2, 47.4 | 47.6 | 48.1 |
| Skill routing contract | 5 / 5 | 34.2, 35.2, 35.4, 34.0, 34.3 | 34.3 | 34.6 |
| Local Markdown links | 5 / 5 | 498.1, 496.1, 474.8, 473.9, 484.5 | 484.5 | 485.5 |

The command names and raw records are in the adjacent JSON file. The runs used
the bundled workspace Python runtime, required no network access, and were
observed only in this local Windows environment. They have not been repeated
on a clean checkout, another operating system, or CI runner.

## What this does and does not say

This is useful engineering evidence: the seven named checks were stable across
five back-to-back local runs, and the link audit was the slowest check in this
small sample. It is not a benchmark of the book, a model, or a Skill.

In particular, these numbers do **not** show that a reader learns faster, that
any Skill improves productivity, that a model is safer or more accurate, or
that anyone's IQ has changed. IQ is not an operational project metric here:
the repository has no validated psychometric instrument, qualified assessor,
or ethical basis for making that claim.

The separate [Shift Handoff pilot protocol](shift-handoff-pilot-protocol-v1.md)
defines what would be needed to observe a much narrower process outcome. Its
initial status remains `candidate / not_run` until authorized, de-identified
run records exist and an independent scorer has reviewed them.

## Reproduce the engineering observation

Use the project runtime documented in [AGENTS.md](../../AGENTS.md), run the
seven commands listed in the JSON file five times in the same order, and keep
the complete output, exit code, commit identity, operating system, runtime,
and local worktree state with the timings. Do not compare these timings across
machines as a productivity score. A clean-checkout or CI comparison would be a
new observation, not a continuation of this one.

## Evidence boundary

The observation is limited to the named static/structural checks. Passing them
does not establish learner comprehension, runtime Skill behavior, automated
triggering, source semantics, translation quality, browser behavior,
deployment, security, usefulness, or release readiness.
