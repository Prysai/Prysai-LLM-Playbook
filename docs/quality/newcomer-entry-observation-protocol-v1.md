# Newcomer entry observation protocol v1

**Status:** candidate protocol. No recruitment, participant run, or result is
recorded.

## Decision this observation can inform

Can an adult who has not previously sent a prompt to a generative chat model
identify the right first route, reach the no-setup check, and make one
low-risk, text-only attempt without adding private material or unintended
authority?

This is an entry-usability observation, not an effectiveness study. It can
inform the labels, route order, and stop language for this exact candidate
revision. It cannot establish learning, retention, transfer, model quality,
market demand, safety effectiveness, or that the full curriculum works for
beginners.

## Who counts as a newcomer

Recruit 5–8 consenting adults who answer **no** to this screening question:

> Before today, have you sent a prompt to a generative chat model?

Record only `no`, `yes`, or `unsure`; do not collect a product name, account
name, employer, education record, or an explanation. `yes` and `unsure` are
not newcomer observations. They may be used in a separately labelled,
experienced-reader observation, never pooled with the newcomer result.

Do not recruit minors, direct reports, students whose grade could be affected,
or anyone for whom declining could carry a penalty.

## Fixed entry conditions

Before the first session, name the following without using personal names:

- one immutable candidate commit SHA and entry URL;
- a moderator, privacy owner, and independent reviewer role;
- browser, viewport, locale, and the available chat-model surface;
- a retention end date and deletion owner; and
- the fictional source message and prompt revision.

Keep the page revision, route labels, fictional source, and observation form
fixed for the round. If any of them changes, stop and start a new round. The
existing [First Win pilot protocol v2](first-win-pilot-protocol-v2.md) remains
the separate, deeper source-fidelity study for experienced chat-model users.

## Session flow

### 1. Choose a route without help

Open the candidate entry page. Do not explain Codex, the warm-up, or the
fixture. Ask only:

> You have no project, no code to edit, and want one safe first try. What
> would you open next, and why?

Record the first route selected and whether the participant reaches the
no-setup LLM check. A correct choice is the text-only no-setup route. A
participant may stop rather than choose; record that as `stopped_by_reader`,
not as a wrong answer.

### 2. Make one bounded attempt

Show the fixed fictional source already used by the public no-setup check:

> Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me
> if you cannot come.

The participant may use a chat-model account they control, or may stop if no
such surface is safely available. They copy the supplied text-only prompt
without adding files, browser access, extensions, credentials, personal facts,
or external actions. The moderator may explain how to close the page or stop;
they may not tell the participant which route or answer to choose.

### 3. Record the boundary check

Ask the participant to mark whether the reply preserves the time and draft,
keeps the reply request, and avoids added details. Do not collect the model
reply, account identifier, screenshot, conversation history, or clipboard
contents. Record only the three marks, elapsed time, help used, and whether
the participant chose to stop.

### 4. Short reflection

Ask two neutral questions:

1. What did this exercise ask you to check yourself?
2. What would make you stop before sending another request?

Store a short sanitized note only when it contains no personal, account, or
workplace information. Otherwise record `reflection_not_retained`.

## Minimal record

Use one de-identified row per session:

```text
session_code | newcomer_screen | candidate_sha | entry_route_first_selected
no_setup_reached | attempt_started | attempt_completed | time_seconds
check_time_and_draft | check_reply_request | check_no_added_details
help_used | stopped_by_reader | safety_stop | retained_reflection_note
reviewer_route_assessment | reviewer_disagreement
```

Allowed `help_used` values are `none`, `navigation_only`,
`stop_or_close_help`, and `other_recorded`. Do not infer skill from elapsed
time or from a correct model answer. The reviewer assesses only whether the
first selected route fits the stated condition; the marks are a record of the
participant's judgment, not proof that it was correct.

## Stop and privacy rules

Stop immediately if a participant enters private, employer, health, financial,
or account material; believes the session is an assessment; asks the moderator
to choose a real-world action; or experiences distress. Remove the material
from view and record only `safety_stop` plus a non-identifying reason code.

Do not retain a screen recording, model transcript, email address, IP address,
account name, private prompt, or raw chat output. The privacy owner deletes
the de-identified observation records at the declared retention end unless a
new, separately authorized retention decision is recorded before that date.

## What to report

Publish at most a de-identified aggregate: screened, eligible, started,
completed, stopped, route-selection distribution, no-setup-reached count,
help-used count, safety-stop count, and reviewer disagreements. For 5–8
participants, report counts and notes about instrument changes only; do not
calculate significance or claim a completion rate for a broader population.

## Evidence boundary

Writing, validating, or running this protocol does not close Q-001, Q-002, or
Q-013 by itself. A run can show only whether the named entry experience was
observable for this small, fixed cohort and candidate revision. Any curriculum,
Skill, safety, platform, learner, or release claim remains at its separately
recorded status.
