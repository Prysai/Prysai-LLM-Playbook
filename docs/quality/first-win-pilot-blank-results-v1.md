# First Win pilot blank results v1

**Status:** `candidate` · `blank` · no recruitment or participant result is
recorded.

This file is a public, data-free result shape for the [First Win pilot
protocol v2](first-win-pilot-protocol-v2.md). It makes the planned evidence
visible before a round starts; it is not a consent form, a recruitment notice,
or a score. The commit-bound [pilot-kit contract](../governance/first-win-pilot-kit.yaml)
and `scripts/first_win_pilot_kit.py` remain the canonical sources for the
private moderator worksheet, scorer key, blank CSV records, and aggregate
package.

## Freeze before collection

Complete these fields with non-identifying labels before any authorized session:

```text
round_label:
candidate_sha: <full 40-character SHA>
entry_url:
locale:
browser_os_viewport:
model_surface:
protocol_revision: first-win-pilot-v2
rubric_revision:
pilot_authorizer:
privacy_owner:
moderator:
independent_scorer:
deletion_owner:
retention_end: <YYYY-MM-DD>
recruitment_channel:
```

Do not put names, contact details, account identifiers, raw prompts, chat
transcripts, screenshots, private files, or credentials in this file or in a
public pull request. A role alias is not a person identifier.

## De-identified session rows

Keep the rows in the local kit, not in the repository. This header shows the
minimum public shape and intentionally contains no example participant data:

```text
session_code,phase,timer_start,timer_end,completed,first_answer,participant_instruction,marked_findings,check_1,check_2,check_3,help_code,recovery_branch,final_answer,before_after_diff,drop_off,example_exposed,scorer_a_dimensions,scorer_b_dimensions,disagreement
```

Use one row for each recorded phase. Preserve abandoned, excluded, stopped, and
`not_observable_no_failure` states; absence is not a zero and a polished first
answer is not evidence that a check occurred.

## Aggregate review shape

Publish only counts or sanitized notes after the privacy owner and independent
reviewer have checked the packet:

```text
screened:
eligible:
started:
phase_1_completed:
phase_2_completed:
phase_3_completed:
phase_4_returned:
dropped_or_stopped:
excluded:
safety_stops:
example_exposed:
help_none:
help_used:
independent_recovery:
seeded_recovery:
not_observable_no_failure:
scorer_disagreements:
instrument_changes:
limitations:
```

For a first 5–8 person round, report descriptive counts and distributions only.
Keep both independent scores and disagreement reasons in the retained local
packet. Do not calculate significance, replace missing delayed records, or use
the aggregate to claim course effectiveness, retention, transfer, model
quality, productivity, or production readiness.

## Boundary

An empty template proves only that the planned fields are inspectable. A future
authorized round can support a task- and condition-bounded usability observation
for its frozen revision. It cannot promote the First Win route or close Q-001,
Q-002, or Q-013 without the protocol's required records and independent review.
