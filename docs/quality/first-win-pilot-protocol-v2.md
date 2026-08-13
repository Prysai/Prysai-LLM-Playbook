# First Win pilot protocol v2

**Status:** candidate protocol; no recruitment, participant run, or result is recorded.

## Decision this pilot can inform

Can a first-time reader detect a missing source fact and an unsupported added
fact in one model-written message, use the First Win method, and repeat the
check on an unseen message?

This pilot may improve the task, rubric, wording, and route order. It cannot
establish teaching effectiveness, retention, general writing skill, model
reliability, market demand, popularity, or superiority over another course.

## Narrow construct

The only construct under review is:

> Identify source-fidelity errors in a short model answer and make the smallest
> correction without adding unsupported information.

Do not score confidence, taste, politeness, grammar sophistication, prompt
length, model preference, or Codex ability as part of this construct.

## Participants and authority

Recruit 5–8 adults who have used a chat model but have not used this guide.
This is an experienced-beginner sample, not evidence about a person's first
chat-model session. The first round is instrument debugging, not an
effectiveness study. Use one fixed repository commit or immutable Pages
candidate for the whole round.

Before recruitment, name the recruitment channel, privacy owner, moderator,
independent scorer, retention period, and deletion date. Participation must be
voluntary. Do not recruit minors, direct reports, students whose grade could be
affected, or people for whom declining could carry a penalty.

Do not collect names, contact details, raw chat histories, account data,
private files, employer material, health or financial information, or screen
recordings. Keep only a random session code, coarse prior-experience band,
condition record, scored task artifacts, elapsed time, help used, first
drop-off, and sanitized observation note.

## Fixed conditions

Record before the first session:

```text
protocol_revision | candidate_sha | entry_url | locale | browser_version
viewport | model_and_surface | model_settings_if_visible | moderator
independent_scorer | rubric_revision | retention_end | deletion_owner
```

Keep model, prompts, task order, scoring rubric, and visible site revision
fixed during a round. If one must change, stop the round and begin a new
revision. Include abandoned and excluded sessions in the aggregate count.

## Phase 1 — unaided baseline

Do not show the First Win prompt, example output, checks, or rescue prompt.

Show this fictional source:

> The volunteer briefing starts Tuesday at 3. Bring the printed checklist. If
> you cannot attend, message the coordinator.

Show this deliberately defective answer:

> The volunteer briefing starts Tuesday at 3 in Room 204. If you cannot
> attend, email the coordinator.

Ask the participant to mark every source-fidelity problem and write one
corrected message. Do not explain the number or type of planted defects.

The fixed answer key contains three findings:

1. `Bring the printed checklist` was omitted.
2. `Room 204` was invented.
3. `message` was changed to the unsupported method `email`.

## Study presentation

The public First Win currently shows an acceptable example before the checks.
That is part of the public surface, but it would cue an instrument intended to
observe the participant's first independent judgment. Before recruitment,
prepare a commit-bound study worksheet containing the exact public source,
prompt, checks, rescue prompt, and boundary statement, with only this change:
hide the example until the first judgment is locked. Record the public URL and
worksheet digest. Do not call worksheet results evidence of unassisted public
homepage use.

Run one separate, unscored public-surface observation after the instrument
tasks. Record whether the participant can find the First Win, recognizes that
the example is illustrative, and reaches the checks. Keep this observation
separate from task scores.

## Phase 2 — First Win instruction

Open the commit-bound study worksheet. The participant uses the fixed workshop
source, copies the prompt, and preserves the model's first answer before any
repair. For each check, record `PASS / FAIL / UNSURE` plus the exact words that
support the judgment. Lock that judgment before revealing the example.

If every check passes, record recovery as `not_observable_no_failure`; do not
count it as recovery success. Then give the fixed defective answer below and
ask the participant to identify the first failed check and use the same rescue
prompt. This seeded branch measures whether the recovery procedure can be
performed; it is scored separately from the model-generated branch.

> The workshop starts Friday at 10 in Studio B. Please bring your notes. If
> you cannot attend, email the organizer.

If the example is visible before the first judgment, record
`example_exposed`, exclude the scored Phase 2 comparison, and continue only
the public-surface observation. Do not stop or discard the participant's
baseline and later retention records solely because of this presentation
error.

Record whether the participant:

- distinguishes source facts from missing information;
- treats `UNSURE` as a permitted state rather than forced success;
- identifies the first failed check without moderator direction;
- changes only what is necessary;
- explains what the completed exercise does not prove.

## Phase 3 — immediate unseen transfer

Do not provide the workshop prompt verbatim. Show this new fictional source:

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us
> if the time no longer works.

The participant writes a short instruction for a chat model, checks the model
answer, and corrects it if necessary. Preserve and score five distinct records:
the participant's instruction, the model's first answer, the participant's
marked findings, the final answer, and a before/after diff. A correct first
answer is not evidence that the participant checked it: score detection only
from the marked findings. Record `no_correction_needed` when the first answer
is source-faithful. Record all help used, including reopening the First Win or
copying any text from it.

## Phase 4 — delayed unseen transfer

After 48–72 hours, use a different domain and do not provide the original
prompt, checks, example, or rescue text:

> Applications close Thursday at noon. Attach one work sample. Contact the
> programme office if the form does not open.

Ask the participant to instruct a chat model, inspect the answer, and correct
source-fidelity errors. Preserve the same five records used in Phase 3. Record
whether the participant returns; do not replace missing delayed data with the
last observed score.

## Session record

Use one row per phase and retain both scorer columns:

```text
session_code | phase | timer_start | timer_end | completed | first_answer
participant_instruction | marked_findings | check_1 | check_2 | check_3
help_code | recovery_branch | final_answer | before_after_diff | drop_off
example_exposed | scorer_a_dimensions | scorer_b_dimensions | disagreement
```

For Phase 2, start the timer when the source becomes visible and stop it when
the participant locks all three judgments and either completes the required
repair or records `not_observable_no_failure`. Report Phase 2 completion-time
distribution and the count at or below 15 minutes. The 15-minute label remains
an unverified target, not a pass threshold.

Allowed `help_code` values are `none`, `reopen_first_win`, `copy_text`,
`moderator_clarification`, and `other_recorded`. Allowed recovery values are
`independent`, `seeded`, `not_observable_no_failure`, `not_attempted`, and
`stopped`. A phase is complete only when every required field for that phase is
present; absence is not a zero score.

## Scoring rubric

Score each baseline and transfer artifact without knowing its phase when
possible.

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Required facts | two or more missing/changed | one missing/changed | all preserved |
| Unsupported facts | two or more additions | one addition | none |
| Requested action | absent or materially changed | present but ambiguous | preserved clearly |
| Correction scope | introduces a new defect | fixes target plus unnecessary change | smallest sufficient correction |

Two scorers independently score every artifact. Preserve both scores and the
reason for disagreement. Report raw agreement and disagreements by dimension;
do not hide them behind an average. Revise the rubric if the first round shows
that trained scorers cannot apply it consistently.

## Stopping and safety

Stop a session if a participant tries to use private material, believes the
task is an employment or academic evaluation, experiences distress, or needs
an external action. Remove the private material and record only a safety stop.

Stop the pilot round and revise the instrument if:

- two participants interpret the task in incompatible ways;
- the answer key contains an ambiguity found by either scorer;
- the model surface cannot keep the fixed conditions;
- the study presentation exposes the example before initial judgment in two
  sessions;
- data minimization or consent conditions are not met.

## Aggregate report

Publish only a de-identified aggregate containing recruitment and exclusion
counts, completion and return counts, drop-off points, condition deviations,
rubric disagreements, baseline/immediate/delayed score distributions, Phase 2
completion-time distribution and 15-minute count, independent versus seeded
recovery counts, `not_observable_no_failure` counts, help used, critical
incidents, and instrument changes proposed.

For 5–8 participants, use descriptive counts and distributions only. Do not
claim statistical significance or that the guide works. A later effectiveness
study would require a stable instrument, predeclared primary outcome, justified
sample size, comparison condition, and an ethics/privacy decision appropriate
to the recruitment context.

## Evidence boundary

Writing or validating this protocol supplies no learner evidence. Running one
round may produce task-usability and measurement evidence for this exact
revision. It does not close Q-001 or Q-002 and must not promote the curriculum,
First Win, labs, or evaluation fixtures beyond their current status.
