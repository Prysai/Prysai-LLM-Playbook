# LLM Foundation Core v1 learner observation protocol

**Status:** `candidate` · `protocol_only` · no recruitment or participant result
is recorded.

This protocol prepares a small, fixed-revision observation of the five-unit
LLM Foundation Core route. It is designed to answer a narrow question:

> Can an experienced beginner use the route to define a bounded text task,
> inspect the first response, repair a visible mismatch, and repeat the method
> on a changed task while keeping unknowns and help visible?

It is not an effectiveness trial, certification, model comparison, or proof of
retention. The public repository contains only this protocol and an empty
result shape. Participant records, raw conversations, screenshots, account
identifiers, and private material stay outside the repository.

## Fixed scope

Use one immutable candidate commit and one exact route revision for a round.
The protocol covers the five outcomes in order:

1. `explain` — distinguish generated text from a model, product, tool, or
   Agent and state why a fluent answer still needs a check;
2. `initiate` — write a bounded request with goal, material, constraints,
   response shape, and a stop line;
3. `identify` — identify a visible mismatch with supplied evidence;
4. `repair` — mark `PASS` / `FAIL` / `UNSURE`, make the smallest correction,
   and name one limit; and
5. `transfer` — repeat the method on an unseen task without a complete prompt
   or answer being supplied.

The canonical route, fixture revision, and scoring anchors remain the sources
of truth:

- [Foundation Core route](../../book/routes/llm-foundation-core-v1-EN.md)
- [Core course contract](../governance/core-course.yaml)
- [Core rubric](core-course-rubric-v1.md)
- [Core candidate fixture](../../evals/candidates/core-course-v1/README.md)

For an authorized session, use the [pilot run sheet](core-course-pilot-run-sheet-v1.md)
to apply the protocol in order. The run sheet is an operational aid; it does
not change the route, rubric, fixture, cohort boundary, or evidence claim.

Do not change the route, task order, fictional notices, rubric, model surface,
or visible page during a round. If a condition changes, stop that round and
start a new labelled revision.

## Cohort and roles

Recruit **5–8 consenting adults** who answer `yes` to this screening question:

> Before today, have you sent at least one prompt to a generative chat model?

This is an experienced-beginner cohort, not a sample of the general public.
Do not recruit minors, direct reports, students whose grade could be affected,
or anyone for whom declining could carry a penalty. Record only `yes`, `no`, or
`unsure`; do not retain product names, employer details, or explanations.

Before collection, assign non-identifying role aliases for a pilot authorizer,
privacy owner, moderator, independent scorer, and deletion owner. The
moderator and independent scorer must be different people. The role aliases
and retention date are local study metadata, not participant identifiers.

## Conditions to freeze

Record these fields before the first session:

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

Use a text-only model surface controlled by the participant or supplied by the
study. Do not require a paid plan, private files, browser access, tools,
uploads, account changes, or external actions. If the selected surface cannot
preserve the fixed conditions, mark the session `condition_deviation` and do
not pool it with eligible observations.

## Session flow

### 1. Baseline explanation

Before showing the route's explanation, ask the participant to explain in their
own words what a language model is, what a chat product adds, and why a fluent
answer may still need checking. Show no rubric anchor or worked answer. Record
the explanation card and one reason to verify. Do not correct it before the
baseline record is frozen.

### 2. Guided five-unit route

Give the participant the fixed route and fictional material. They may ask
clarifying questions about the task, but do not provide a complete answer,
failure label, or repair before the relevant attempt. Preserve the artifact at
each unit:

| Unit | Participant artifact | Required boundary |
|---|---|---|
| `explain` | explanation card, observation note, two boundary decisions | generated text is not proof; a tool receipt is not authorization |
| `initiate` | task card, exact request, first response, unknowns | no private material or external side effect |
| `identify` | four failure labels with source quotes | unknowns are not silently converted into errors |
| `repair` | check table, minimum diff, limit statement | no new fact or broad rewrite |
| `transfer` | unseen-task receipt and help disclosure | no complete prompt or answer leak before attempt |

Record the first response before any correction. A correct first response does
not prove that the participant checked it; score the participant's evidence,
not the model's fluency.

### 3. Immediate unseen transfer

After the guided route, use this changed fictional notice without showing the
previous answer or copying the earlier prompt:

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us
> if the time no longer works.

Ask the participant to define a bounded request, preserve the first response,
check every claim, make a minimum repair if needed, and state what remains
unknown. Record any cue, clarification, or reopened route. If no repair is
needed, record `no_correction_needed`; do not infer that checking occurred from
the final text alone.

### 4. Delayed transfer

Return after **7 ± 1 days** with no original prompt, answer, rubric anchor, or
rescue text visible. Use a different domain:

> Applications close Thursday at noon. Attach one work sample. Contact the
> programme office if the form does not open.

Use the same receipt fields as immediate transfer. Record non-return as
`not_returned`; never replace missing delayed data with the last observed score.
The delayed task is a retention/transfer observation for this cohort and
revision only, not proof of durable learning.

## Help and stopping rules

Allowed help codes are `none`, `clarification`, `navigation_only`, `cue`,
`worked_fragment`, and `reopen_route`. If another kind of help occurs, record
`other_recorded` only with a short, non-identifying description in the local
packet; never use it as a catch-all for missing help information. Record the
exact level of help before scoring. Once a worked fragment is shown, the
affected outcome cannot be called independent on that artifact.

Stop immediately if the participant enters private, employer, health,
financial, credential, or account material; requests an external action; thinks
the session is an employment or academic assessment; or experiences distress.
Remove the material from view and retain only a non-identifying safety-stop
code. A stopped or withdrawn artifact is `not_observed`, not a zero.

Stop the round and revise the instrument if two participants interpret the
task incompatibly, the answer key is ambiguous, the surface cannot hold the
fixed conditions, or privacy/consent requirements are not met.

## Scoring and review

Score each artifact with the existing 0–2 rubric. Two reviewers independently
score each outcome whenever feasible. Keep both scores, the evidence note,
help disclosure, disagreement reason, and any adjudication. Report raw
agreement and disagreements by outcome; do not hide disagreement behind an
average. Reviewers score the participant artifact, not writing polish,
confidence, model quality, or elapsed time.

For 5–8 participants, publish descriptive counts and distributions only. Do
not calculate statistical significance, claim a completion rate for a broader
population, or promote the course from `candidate / not_run` based on this
protocol.

## Public result boundary

The public aggregate may contain only de-identified counts, return/completion
counts, help and stopping codes, score distributions, scorer disagreements,
condition deviations, instrument changes, and limitations after privacy-owner
and independent-review approval. Keep raw requests, model outputs, screenshots,
account data, participant codes, and private notes in local controlled storage
until deletion.

Running this protocol could support a bounded observation for the named route,
surface, cohort, and revision. It cannot establish general learner success,
retention, model quality, safety, productivity, platform equivalence,
translation quality, or production readiness. Until an authorized run exists,
the core course remains `candidate / not_run` and all learner, transfer, and
retention evidence remains `not_run`.
