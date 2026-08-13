# First-task reader pilot protocol v1

**Status:** candidate protocol; no recruitment or participant result is recorded.

## Decision this pilot can inform

Can a target reader, in one controlled session, locate the candidate status,
find the first safe task, and assemble a bounded task contract without being
misled about what the guide has verified?

This is a usability and activation study design. It cannot establish learning
effectiveness, retention, transfer, demand, satisfaction, market size,
cross-platform equivalence, or product popularity.

## Preconditions and authority

Run only after the maintainer has chosen a recruitment channel, confirmed the
applicable privacy and research-ethics requirements, and named an independent
reviewer. Do not recruit through a compulsory class, management relationship,
or channel where declining could carry a penalty. Do not enroll minors or
collect health, financial, identity, account, employer, repository, or other
sensitive information.

The repository is currently private and has no public Pages deployment. A
private issue form and this protocol are preparation for feedback, not evidence
of a public program or an invitation that anyone can currently use.

## Participants and sampling boundary

Recruit 5–8 adults who match at least one intended starting segment:

- people who know of chat-based AI but have not used a coding-agent workflow;
- creators or independent developers who need one bounded, reversible task; or
- engineers/researchers who can explain why a task needs evidence and a stop
  condition.

Record only a coarse self-described segment, participation date, and session
code. Do not claim the sample represents all users. Keep every completed,
abandoned, and excluded session in the aggregate record; do not report only
successful sessions.

## Consent and data minimization

Before beginning, state in plain language:

> Participation is voluntary. This is a test of a candidate guide, not a test
> of you. Do not share secrets, private files, account details, work material,
> or personal information. We will retain only a de-identified observation
> summary and aggregate outcomes. You may stop without explanation.

Do not record the screen, chat transcript, voice, email, or raw task text by
default. A participant may ask to remove their session code before aggregation.
Delete moderator notes containing a direct identifier immediately after the
de-identified aggregate is checked. Retain the aggregate review only for the
declared release-review window; record its deletion date or a justified renewal.

## Fixed session conditions

For each session, preserve the following in the aggregate review record:

```text
session_code | date | coarse segment | repository commit or immutable artifact
entry URL or local path | locale | browser/OS | viewport | moderator
task revision | elapsed time | completion state | drop-off point
observed confusion | safe evidence reference | critical incident | unknowns
```

Use one named candidate commit or immutable local artifact for the complete
round. Do not silently change copy, route order, prompts, or scoring during a
round. If a change is necessary, stop the round, record why, and begin a new
revision.

## Moderator script and tasks

The moderator reads the same neutral introduction and does not teach the guide
or supply the answer. Clarifying the task wording is allowed; directing a
participant to a route, explaining terminology, or completing the task is not.

1. **Orientation (90 seconds).** From the home page, find the first safe task
   and explain what `candidate` means here. Record whether both are found
   without direction.
2. **First-task activation (up to 20 minutes).** Given a disposable local file
   or harmless fictional task, use the guide to write a task contract with a
   goal, minimum context, allowed actions, acceptance evidence, and a stop
   condition. The participant must select a reversible first action; no tool,
   account, network request, purchase, publication, or production system is
   involved.
3. **Evidence boundary (up to 5 minutes).** Ask what would still be unverified
   after a plausible answer or saved prompt. Record the participant's words,
   summarized without personal content.
4. **Exit (up to 5 minutes).** Ask which exact page, term, route, or visual
   made progress harder. Capture a drop-off even when the session ends early.

## Observable classifications

Use these labels rather than an unqualified success rate:

| Classification | Required observation |
|---|---|
| `orientation_completed` | Located the first safe task and accurately distinguished `candidate` from `verified` without direction. |
| `task_contract_completed` | Wrote all five required contract fields for the supplied low-risk task. |
| `safe_first_action_selected` | Named a reversible first action and a stop condition; no external action was performed. |
| `evidence_boundary_explained` | Identified at least one claim that a polished response would not prove. |
| `dropped_or_blocked` | Did not complete a stage; record the first observed point and reason if volunteered. |

These classifications describe this exact task and artifact. They do not prove
independent ability after the session or a curriculum effect.

## Review, disagreement, and stopping rules

An independent reviewer receives the de-identified aggregate record and the
task/rubric, not participant identities or moderator interpretations. The
reviewer checks every classification and flags discrepancies. If moderator and
reviewer differ, preserve both labels, explain the disagreement, and do not
collapse it into a positive conclusion.

Stop the round immediately if a participant attempts to reveal private material,
experiences distress, believes the task is an employment or performance test,
or a task would require an external side effect. Remove the material from notes,
record only the safety stop, and do not continue that session.

After 5–8 sessions, publish one de-identified aggregate review that includes:

- the fixed revision and conditions;
- recruitment and exclusion counts;
- every completion, drop-off, critical incident, and disagreement;
- wording or route changes considered, with a reason not to infer effectiveness;
- the independent review outcome and remaining limitations.

No result closes Q-001 learner-evidence gaps or proves a public launch. The
aggregate may inform the narrower Q-013 first-task usability finding only.

## Field-report relationship

Use the [Field Report issue form](../../.github/ISSUE_TEMPLATE/field-report.yml)
for an unsolicited, sanitized observation. Treat it as hypothesis generation:
convert it into a sourced [field case](../templates/field-case.md) only after
license, privacy, evidence, safe-check, and teaching-boundary review.
