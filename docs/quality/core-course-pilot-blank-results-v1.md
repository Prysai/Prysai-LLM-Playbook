# LLM Foundation Core v1 blank results

**Status:** `candidate` · `blank` · no recruitment, session, or learner result
is recorded.

This file defines the public shape of a future de-identified aggregate for
[the core-course learner observation protocol](core-course-pilot-v1.md). It is
not a consent form, recruitment notice, score, or claim that the course has
been run.

## Freeze record

Complete these fields locally before an authorized round. Do not commit
participant data or personal names.

```text
round_label:
candidate_sha: <full 40-character SHA>
entry_url:
locale:
browser_os_viewport:
model_surface:
protocol_revision: core-course-pilot-v1
fixture_revision: 2
rubric_revision: core-course-rubric-v1
pilot_authorizer:
privacy_owner:
moderator:
independent_scorer:
deletion_owner:
retention_end: <YYYY-MM-DD>
```

## Public aggregate shape

```text
screened:
eligible:
started:
guided_route_completed:
immediate_transfer_completed:
delayed_transfer_returned:
dropped_or_stopped:
withdrawn:
safety_stops:
condition_deviations:
help_none:
help_used:
not_observed:
scorer_disagreements:
explain_scores:
initiate_scores:
identify_scores:
repair_scores:
transfer_scores:
immediate_transfer_scores:
delayed_transfer_scores:
instrument_changes:
limitations:
```

Use counts and descriptive distributions only for a 5–8 participant round.
Preserve missing and delayed records as missing; do not convert them into zero
or success. Keep both reviewer scores and disagreement reasons in the local
controlled packet, not in this public shape. Before publication, the privacy
owner must suppress or combine any cell that could reasonably identify a
participant, including a single-person score or help category; if suppression
would make the aggregate misleading, publish the limitation and omit that
breakdown.

## Evidence boundary

An empty template proves only that the intended fields are inspectable. A
future authorized run can support an observation bounded to the named commit,
route, surface, cohort, and rubric. It cannot by itself establish that the
course works for beginners generally, improves learning, produces retention,
transfers across domains or platforms, improves model quality, or is
production-ready. Until a reviewed run exists, the course remains
`candidate / not_run`.
