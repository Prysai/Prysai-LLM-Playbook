# LLM Foundation Core v1 pilot run sheet

**Status:** `candidate` · operational aid only · no participant data is stored
in this repository.

Use this run sheet with the [learner observation protocol](core-course-pilot-v1.md),
[rubric](core-course-rubric-v1.md), and [blank public result shape](core-course-pilot-blank-results-v1.md).
It turns the fixed protocol into a session checklist. It does not authorize
recruitment, consent collection, publication, or a status promotion. Any real
session requires separate local authorization and controlled storage outside
the repository.

## 0. Do not start until the study boundary is ready

The pilot authorizer must confirm each item before contacting a participant:

- The round has a label, a named route revision, a full candidate SHA, a
  protocol revision, a fixture revision, a rubric revision, and a planned
  retention end date.
- A privacy owner, moderator, independent scorer, and deletion owner have been
  assigned as non-identifying role aliases. The moderator and independent
  scorer are different people.
- The local controlled packet location exists outside the repository and has a
  deletion procedure. It is not a Git worktree, cloud-shared folder, public
  issue, pull request, or chat transcript.
- The consent and withdrawal wording has been approved locally. Participation
  is voluntary and is not tied to employment, grades, access, or evaluation.
- The intended cohort is limited to consenting adults who answer `yes` to the
  protocol screening question. Do not retain product names, employer details,
  or explanations for the screening answer.

If any item is missing, record `round_not_started` locally and stop. Do not
solve a missing authorization or privacy control during a session.

## 1. Freeze the session packet

Complete this record before showing the route. Keep the completed record in the
controlled local packet, never in the repository:

```text
round_label:
session_alias:
candidate_sha: <full 40-character SHA>
route_path: book/routes/llm-foundation-core-v1-EN.md
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
started_at:
ended_at:
condition_deviation: none
stop_code: none
withdrawal: no
```

The moderator checks that the route, fixture, and rubric all resolve to the
same frozen revision. Use a text-only model surface. Do not require a paid
plan, browser access, files, uploads, tools, account changes, or external
actions. If the surface cannot preserve those conditions, set
`condition_deviation`, do not pool the session with eligible observations, and
tell the independent scorer before scoring.

## 2. Keep the information boundary visible

At every stage, follow this sequence:

1. Show only the current task, the supplied fictional material, and the safety
   boundary.
2. Ask the participant to make the current attempt before showing an answer,
   rubric anchor, failure label, or repair.
3. Preserve the first artifact before clarification, correction, or feedback.
4. Record the help code immediately: `none`, `clarification`,
   `navigation_only`, `cue`, `worked_fragment`, `reopen_route`, or
   `other_recorded` with a short non-identifying note.
5. Never turn a polished final answer into evidence that the participant
   checked the first answer.

The moderator may clarify what the task asks. The moderator must not supply a
complete prompt, answer, failure classification, source quote, or repair before
the relevant attempt.

## 3. Run the baseline and guided route

Use one local packet per session. Complete the fields before moving to the next
unit:

| Stage | Capture before feedback | Minimum boundary check |
| --- | --- | --- |
| Baseline explanation | Own-words explanation of an LLM, what a product adds, and one reason to verify | No rubric anchor or worked answer was shown; baseline is frozen before teaching |
| `explain` | Explanation card, three-observation note, and two model/product/tool boundary decisions | Generated text is not proof; a tool receipt is not authorization |
| `initiate` | Goal, material, constraints, response shape, stop line, first request, first response, and unknowns | No private material or external side effect |
| `identify` | Four failure labels with exact supplied quotes and an unknown boundary | Do not call an unknown an error or generalize from one response |
| `repair` | `PASS` / `FAIL` / `UNSURE` table, minimum before/after difference, and one limit | No new fact, hidden source, broad rewrite, or external action |
| `transfer` | Unseen-task receipt, first attempt, checks, repair or `no_correction_needed`, help, and limit | No complete prompt or answer leak before the attempt |

For each stage, append one of these local outcomes: `observed`,
`not_observed`, `condition_deviation`, `stopped`, or `withdrawn`. A missing or
withdrawn artifact is not a zero.

## 4. Run the immediate transfer

After the guided route, hide all prior answers, prompts, rubric anchors, and
rescue text. Show only this changed fictional notice:

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us
> if the time no longer works.

Ask the participant to define a bounded request, preserve the first response,
check every claim, make a minimum repair if needed, and state what remains
unknown. Record the exact help level and whether the participant reopened the
route. If no repair is needed, record `no_correction_needed` and the evidence
for that decision. Do not infer checking from the final wording alone.

## 5. Schedule and run the delayed transfer

Before closing the first session, record a local return window of **7 ± 1
days** using only the session alias. Do not store a name or contact detail in
the repository. At the return session:

- show no original prompt, answer, rubric anchor, or rescue text;
- use a different domain and the exact notice below;
- record the first attempt, claim checks, repair or `no_correction_needed`,
  help, and limit using the same receipt fields; and
- record `not_returned` when the participant does not return. Never replace
  missing delayed data with the last observed score.

> Applications close Thursday at noon. Attach one work sample. Contact the
> programme office if the form does not open.

The delayed observation is bounded to this cohort and revision. It is not proof
of durable learning or general retention.

## 6. Stop safely and preserve the reason

Stop the session immediately if the participant provides private, employer,
health, financial, credential, or account material; requests an external
action; believes the session is an employment or academic assessment; or shows
distress. Remove the material from view and retain only a non-identifying stop
code such as `private_material`, `external_action`, `assessment_misunderstanding`,
or `distress`.

Stop the round, rather than improvising, if two participants interpret the task
in incompatible ways, the answer key is ambiguous, the surface cannot hold the
fixed conditions, or a privacy/consent requirement fails. Mark affected
artifacts `not_observed` or `condition_deviation` and notify the pilot
authorizer.

## 7. Seal and score the packet

After the session, the moderator seals the local packet before any scoring
discussion. The independent scorer receives a de-identified copy containing the
artifact, stage, condition record, and help disclosure, but not unnecessary
participant details.

Each reviewer records independently:

- one `0`–`2` score for each named outcome;
- the smallest evidence note that supports the score;
- the help code and whether the artifact was independent;
- `not_observed`, `condition_deviation`, or `withdrawn` where applicable; and
- a limitation that the artifact cannot establish.

Keep both score sheets. If scores differ, retain both values, the disagreement
reason, and any adjudication. Do not hide disagreement behind an average, and
do not score writing polish, confidence, model quality, or elapsed time.

## 8. Close, aggregate, and delete

Before any public aggregate is prepared, the privacy owner verifies that it
contains only de-identified counts and descriptive distributions for the named
round. Suppress or combine small cells, including a single-person score or help
category, when they could identify a participant. The independent reviewer
confirms the evidence boundary and limitations.

The public repository may receive only the approved aggregate shape or a
separate dated result record. Never commit raw requests, model outputs,
screenshots, identifiers, consent records, participant codes, or private notes.
At `retention_end`, the deletion owner deletes the controlled raw packet and
records a local deletion confirmation. If deletion cannot be confirmed, do not
publish a completion claim.

## Session close checklist

- [ ] Every frozen condition is filled or a deviation is recorded.
- [ ] The first artifact was preserved before feedback at every observed stage.
- [ ] Help, stopping, withdrawal, and missing-artifact states are explicit.
- [ ] Immediate and delayed transfer are not confused with guided completion.
- [ ] Two independent score sheets and disagreements are retained locally.
- [ ] No participant data or local path entered the repository or PR.
- [ ] The result remains bounded to the named route, surface, cohort, and
      revision.
- [ ] No status is promoted from `candidate / not_run` without the required
      evidence and review.

This run sheet establishes operational readiness for an authorized observation
only. It does not establish recruitment, learner completion, learning,
retention, transfer, model quality, safety, translation quality, or production
readiness.
