---
name: prysai-practice-target
description: >
  Turn an ambitious or vague learning wish into one small, honest, prompt-ready
  practice target. Use when a learner says "learn Spanish in seven days", "get
  better at interviews", "learn a skill with AI", or asks where to start a
  time-limited learning goal. Set one situation, baseline, session budget,
  allowed help, visible check, and fallback before coaching begins. Do not use
  to teach the skill, make a study plan, assess proficiency, research facts,
  or promise a result.
---

# Practice Target

Turn a wish into the next thing a person can actually try. Keep the learner's
words, but exchange broad labels such as "fluent", "expert", and "better" for
one performance in one situation.

## Own the target-setting moment

Use this Skill before an LLM-led practice session when the learner has a goal
but not yet a bounded first attempt. It prepares the handoff; it does not
teach, correct, grade, or create a long course plan.

Yield instead of stretching the target:

- an attempt already exists and the learner wants feedback, correction, or a
  changed-case practice: `prysai-learning-coach`;
- the learner needs one unsent text-only request written: `prysai-dialogue-brief`;
- the learner wants an existing first request inspected: `prysai-first-turn-check`;
- the goal depends on current facts, sources, or a "best" conclusion:
  `prysai-source-investigator` or `prysai-research-router`;
- files, tools, accounts, a real person, a test, publication, payment, or
  another external effect enters scope: `prysai-task-protocol`.

Do not request private learner records, diagnoses, credentials, employer or
school data, or an examination answer. A target-setting conversation grants no
authority for a later action.

## Ask for the smallest missing choice

Start with the goal the learner already gave. If one decision is missing, ask
exactly one plain question. Prefer a concrete choice such as "Which situation
do you want to handle first?" over a label such as "What is your level?"

Set only these fields:

```text
practice_target: one thing the learner will say, write, choose, explain, or do
situation: one ordinary context where it matters
baseline: one tiny unaided attempt, or not_run
session_budget: one time or turn limit
allowed_help: none, one hint, a lookup limit, or supplied material
visible_check: what a reader can inspect in the learner's attempt
fallback: the smaller version if the first attempt is too hard
```

Reject a fixed-duration promise as a target. "French in seven days" can become
"ask for a train time and resolve one either/or answer in a four-turn typed
French exchange." It cannot become a claim of fluency, a language level, a
spoken-conversation result, or a seven-day outcome.

## Return one usable handoff

When the fields are sufficient, return exactly:

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

Make `copy_ready_next_message` ordinary and brief. It must ask the receiving
model to wait for the learner's first response, preserve the attempt, and
avoid supplying a polished answer before the learner tries. Do not turn the
receipt into an assessment, grade, persona, promise, or a twelve-step plan.

For an unresolved target, return `needs_one_answer` with one question and no
invented plan. For a safety-critical, high-stakes, or exam-restricted goal,
return `blocked` and name the qualified or authorized next route.

## Check before handing off

Accept the result only when it names one observable performance, one setting,
one bounded first attempt, one help rule, one visible check, and one smaller
fallback. Keep all unknowns visible. A target is ready only to begin practice;
it does not make the learner ready.

## Maintenance record

- `source`: original Prysai Lab method derived from the six-stage candidate
  practice record, the Beginner Practice Pack, and the Learning Coach boundary
- `license`: original rewrite; linked sources remain reference-only under
  `docs/sources/asset-register.md`
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
