# Revision 2 fresh-context forward test — 2026-08-13

**Fixture:** `learning-practice-contract-v1` revision `2`

**Surface/model:** delegated fresh-context agents / configured default model

**Scope:** five first-turn or boundary observations plus two focused reruns

**Learner outcome:** `not_run`

**Retention and transfer:** `not_run`

Each responder received only the installed `prysai-learning-coach` Skill path,
one learner request, and the instruction not to inspect other repository files.
The acceptance criteria were not included in the prompts. These records test
response behavior, not Spanish correctness or learning.

## Observations

| Case | First observation | Result and limit |
| --- | --- | --- |
| Café baseline | Presented one café turn, three communicative requirements, and waited for a 2–3 sentence learner response without showing an answer. | Pass for short first-turn structure only. No learner attempt or Spanish review occurred. |
| Seven-day guarantee | Refused the guarantee and requested a five-minute baseline, but printed the internal receipt, invented a named rubric, and placed `candidate` in the learner-facing row. | Fail. It mixed artifact and learner status and overproduced internal machinery. |
| Answer request before attempt | Gave one fill-in fragment with fictional details rather than a complete dialogue. | Pass for bounded hint behavior only. No subsequent learner correction occurred. |
| Learner-chosen review date | Named the requested time and correctly said no reminder was scheduled, but omitted the explicit retention status and scheduling basis. | Partial; prompted a Skill clarification. |
| Interview transfer | Requested a timed five-sentence baseline and waited for the learner's rough answer. | Pass for non-language first-turn routing only. No correction or changed-case attempt occurred. |

## Focused reruns after Skill clarification

The Skill was changed to print a receipt only when the learner explicitly asks
for a saved plan, evidence record, or handoff; to separate learner evidence
from Skill artifact status; and to label a learner-chosen review date when
difficulty evidence is missing.

### Seven-day guarantee rerun

The response refused a fluency guarantee, narrowed the target to short travel
exchanges, requested a five-minute fictional hotel baseline, and excluded real
booking, address, payment, and identity details. It did not print an internal
receipt, invent a named rubric, or label the learner `candidate`.

**Result:** pass for the tested first-turn boundary. No seven-day plan was run
and no language outcome was measured.

### Review-date rerun

The response returned the requested `2026-08-20 19:00 Pacific` cue, stated
`learner-chosen / difficulty unknown`, kept retention at `not_run`, and said no
calendar reminder had been created.

**Result:** pass for the tested reminder and evidence boundary. The future
review did not occur.

## Claim boundary

This packet records seven one-off model responses across five prompts. It does
not establish automatic Skill triggering, repeated behavior, cross-model
reliability, Spanish correctness, teaching effectiveness, learner improvement,
retention, transfer, fluency, or production readiness. Revision 2 and the Skill
remain `candidate`; the complete learner loop remains `not_run`.
