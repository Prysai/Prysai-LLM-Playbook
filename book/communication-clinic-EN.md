<!-- content_id: communication-clinic | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-13 -->

# Beginner Practice Pack v1

**Curriculum status:** `candidate` | **Complete learner runs:** none |
**Learner-outcome evidence:** none | **Platform:** universal text chat;
product-specific actions require a sourced adapter.

Choose one route: a Spanish travel exchange, another observable skill, or a
source-supported research decision. Use its two cards in order. These original
cards turn conversation into inspectable work; they do not prove that a prompt
is best or that a model is an effective teacher or researcher.

![Attempt, correct, vary, and receipt practice loop](../assets/teaching/beginner-practice-loop-red-black.svg)

<span id="first-practice-intake"></span>

## Before a route — first-practice intake

**Learning objective:** turn a broad wish into one small, inspectable first
attempt, then choose exactly one existing route. This is a selector, not a
diagnosis, course recommender, study plan, or fourth prompt catalogue.

### Problem

"Learn Spanish in seven days," "get better at interviews," and "find the
best AI course" are wishes, not yet tasks. A model can make any of them sound
busy while skipping the decisions that make a first attempt comparable: what
the person will do, what they can already do without help, what is in scope,
what help is permitted, and what another person could inspect.

### Decision

Ask one question at a time, only until a safe first attempt is possible. Keep
at most three route choices visible; this guide returns one of A, B, or C.
Stop and ask a person to choose if a missing decision changes risk, scope, or
the acceptance check. Do not fill an unknown with an impressive assumption.

| Decide only if still unknown | Plain question | Keep in the receipt |
| --- | --- | --- |
| Performance | What do you want to be able to do, not merely know about? | One observable action |
| Starting point | Try one tiny example without help. What happened? | Baseline attempt or `not_run` |
| Session scope | Which one situation or subskill matters first? | One-session boundary |
| Difficulty or prerequisites | What words, tools, or moves are already comfortable? | Allowed material and new-material limit |
| Evidence | What could another person inspect when you finish? | Artifact and pass condition |
| Help | Should the first help be a question, hint, example, or review? | Help mode and answer-leakage rule |
| Recovery | If this is too hard or a source cannot be checked, what is smaller? | Fallback and stop rule |

### Action — copy only the contract, not a promise

```text
Help me choose one first practice route. Ask one question at a time and stop
as soon as a safe, checkable attempt is possible.

Find only what is needed: one observable performance, one unassisted starting
attempt, one situation, allowed material or prerequisites, an inspectable
result, a help policy, and a smaller fallback.

Return exactly one route: A language exchange, B another observable skill, or
C a source-supported research decision. Then write a small task contract and
a receipt. Do not make a study plan, rank courses, promise speed or mastery,
or supply the answer before my first attempt.

For a language route, replace "beginner" with known vocabulary or grammar, a
new-item limit, a turn or sentence limit, and a comprehension check. For a
research route, name the decision and the owner of the first material claim;
do not call anything "best" before the criteria and sources are inspectable.
```

The returned receipt should have this narrow shape:

```text
route | observable_target_or_decision | baseline | one_session_scope
allowed_material_or_prerequisites | evidence_and_pass_condition | help_policy
fallback | exact_status: template_selected | claim_limit: not_run
```

Selecting the contract supports only `template_selected`; it does not show
that a model, route, or person performed well.

### Two synthetic reductions

**Failure case: "I will learn Spanish in seven days."** Do not turn this into
a seven-day syllabus. Ask for one situation and a baseline. A possible intake
result is Route A: a four-turn hotel check-in, using an agreed known-word list,
at most three new items, one comprehension question, and no model answer
before the first reply. The receipt remains `template_selected` until the
attempt exists. It does not establish a level, retention, or fluency.

**Failure case: "Research the best AI course."** Do not generate a ranking.
Ask what decision the research must change, for whom, by when, and which
criterion is material. A possible intake result is Route C: decide whether a
named course's published prerequisite and syllabus meet one learner's first
week need; record the course owner's page as the first source to inspect and
one fallback if it cannot be opened. This creates a research plan, not a
recommendation or a source-supported conclusion.

### Small experiment and reflection

Try the intake on one broad wish. Compare the original wish with the final
receipt: can another person identify one route, a bounded attempt, what help
is allowed, and what would count as evidence? If not, ask one more question
or stop as `blocked`; do not manufacture a route. Record whether the issue was
scope, prerequisite, evidence, help policy, or an unresolved decision. This
is a local observation, not evidence that the intake improves learning.

### Acceptance checklist

- [ ] The intake returned one existing route, not a new collection of advice.
- [ ] It records one observable action or decision and one-session boundary.
- [ ] A baseline, allowed material, help policy, and fallback are explicit or
      marked `not_run` / `unknown`.
- [ ] Language difficulty is inspectable; the word `beginner` is not the only
      control.
- [ ] Research has a decision, a material claim owner, and no unsupported
      "best" conclusion.
- [ ] The receipt says `template_selected` and `not_run` until an attempt or
      source check actually exists.

## Read the evidence state first

| State | Minimum evidence | What it does not mean |
|---|---|---|
| `template_selected` | Card revision, target, and conditions saved | Practice completed or useful |
| `practised` | Attempt, help, correction, and result saved | Independent performance |
| `demonstrated_on_this_task` | Fixed task passed its declared rubric | Retention, transfer, or mastery |
| `retained_at_[delay]` | Delayed task passed under recorded conditions | Permanent retention |
| `transferred_to_[variation]` | Unseen changed task passed its rubric | Broad fluency or expertise |
| `source-supported within [scope/date]` | Claim-level sources, dates, scope, and conflict | Complete or permanently current research |

Selecting a card earns only `template_selected`. Keep this curriculum artifact
`candidate` and its run evidence `not_run` until a qualifying record exists.

<span id="language-practice-route"></span>

## Route A — beginner Spanish travel exchange

The target is four **learner turns**, not “learn Spanish.” The receptionist
starts each turn with one short question or reply; the learner responds four
times. Card A1 uses a hotel check-in. Card A2 changes the setting to a train
station while keeping the capability—supply details and resolve one
ambiguity—stable. Use fictional details only.

### Card A1 — hotel baseline and correction

```text
Run one four-minute Spanish hotel check-in with exactly four learner turns.
You are the receptionist and speak first. Use only short present-tense
questions. I will answer once after each question.

Fictional guest card: Ana Torres; two nights; single room; breakfast included;
ask whether breakfast starts at 7:00 or 7:30. I may use the card and look up at
most three single words. Introduce no more than three words not used in my
answers, and ask one either/or comprehension question. Do not request or accept
a real name, booking number, passport, address, contact, or payment detail.

Before turn one, show this fixed rubric: four learner turns; name and two-night
stay communicated; single room and breakfast communicated; 7:00/7:30 ambiguity
resolved; Spanish understandable enough to continue. Do not teach, translate,
or show a model answer before I reply. Preserve my first attempt and record
lookups. Correct only the first meaning-blocking error: name the error type,
then give a partial cue, then one worked fragment only if I still cannot
continue. Ask me to correct it. If the worked fragment is still insufficient,
reduce the exchange to one missing information item and stop adding new
material. Keep both attempts and do not call one successful exchange fluency.
```

- **Model should:** fix conditions before teaching, wait, preserve the attempt,
  disclose the hint, and request a learner-authored correction.
- **Common failure:** supplying a polished dialogue first contaminates the
  baseline; rewriting the answer for the learner is not learner correction.
  If this happens, save the leaked text, mark the baseline `contaminated`, and
  restart with changed fictional details instead of scoring it as unaided.
- **Evidence to keep:** card revision, time, allowed aids, original attempt,
  rubric, hint, corrected attempt, score, scorer, and unknowns.
- **Status and receipt boundary:** selecting the card is `template_selected`;
  completing the coached exchange is at most `practised`. Use
  `demonstrated_on_this_task` only if the fixed task meets its rubric. A model's
  own score is not independent evidence.

### Card A2 — unseen train-station transfer and delayed check

```text
Use my saved hotel record, but do not reuse its sentences. Run exactly four
learner turns at a train station: I need a one-way ticket to Toledo tomorrow
morning and must resolve whether the train leaves at 8:15 or 8:50. Keep the
same five scoring dimensions—turns completed, traveller detail, requested
service, ambiguity resolved, understandable Spanish—allow no hints, preserve
my attempt, and name the changed variation.

Then create a review cue for seven days from today unless I provide another
date. Do not reveal the later task and do not claim that you scheduled a
reminder. Seven days is a project default, not an optimal interval or a
guarantee. Report retention only after the dated attempt exists; until then
record `not_run`.
```

- **Model should:** change setting, vocabulary, and ambiguity while keeping the
  underlying exchange and scoring dimensions stable.
- **Common failure:** a near-copy of the hotel dialogue is rehearsal, not
  transfer; a same-session result is not retention.
- **Evidence to keep:** train-task revision, proof it was unrevealed, aids,
  attempt, rubric score, scorer, exact variation, planned delay, and the later
  task only when it actually runs.
- **Status and receipt boundary:** a passing train attempt may support
  `transferred_to_train-station-information-exchange`. Keep the delayed result
  `not_run` until its dated attempt exists; only then may it support
  `retained_at_[delay]`. Neither status means broad fluency.

For the fuller fixture, use [Lab 018](labs/lab-018-language-transfer-EN.md) and
the [learning practice contract](guides/learning-practice-contract-EN.md).
The directly related [coaching-process evaluation candidate](../evals/candidates/learning-practice-contract-v1/README.md)
contains an unrun plan and limited process observations, not learner outcomes.

<span id="general-skill-practice-route"></span>

## Route B — one observable non-language skill

Choose a performance another person can inspect: explain a concept without
notes, answer one interview question, or revise one paragraph for a named
audience. “Understand the topic” is not observable.

### Card B1 — define and attempt the performance

```text
I want to practise [observable performance] for [real situation]. Before
teaching, turn it into one task I can complete in [time] with [allowed aids].
Give three to five observable scoring criteria and one explicit stop condition.
If essential factual input is missing, provide only the minimum input, then
wait for my attempt. Preserve my work and ask for my reasoning before judging
a correct-looking answer.
```

- **Model should:** replace vague learning language with an action, conditions,
  aids, time, rubric, and stop condition, then let the learner perform it.
- **Common failure:** a long lesson or model artifact makes recognition look
  like independent production.
- **Evidence to keep:** target, situation, task revision, aids, rubric, first
  attempt, reasoning, time used, and unresolved factual inputs.
- **Status and receipt boundary:** a ready but untried task remains
  `template_selected`; one attempt is `practised`, not
  improvement, readiness, or mastery.

### Card B2 — repair one error and test a changed case

```text
Use my saved attempt and rubric. Name what worked and the first consequential
error. Give one hint without replacing my work, ask me to produce a corrected
attempt, and score it against the unchanged criteria. Then change the audience,
input, or constraint while keeping the underlying skill fixed and ask for one
unassisted transfer attempt. Record help used and state the narrowest result
the evidence supports.
```

- **Model should:** diagnose one material condition, request the learner's
  correction, and vary the surface rather than changing the target skill.
- **Common failure:** silently polishing removes learner work; changing both
  skill and rubric makes the comparison uninterpretable.
- **Evidence to keep:** original, hint, learner correction, unchanged rubric,
  changed-case delta, unassisted attempt, score, scorer, and remaining error.
- **Status and receipt boundary:** correction supports at most `practised`;
  passing the fixed task may support `demonstrated_on_this_task`, and a passing
  unseen variation may support only `transferred_to_[variation]`.

<span id="bounded-research-route"></span>

## Route C — one source-supported research decision

Research evidence is not learning evidence. The strongest ordinary claim is
`source-supported within [scope/date]`, not “complete research,” universal
truth, or freshness beyond the recorded access date.

### Card C1 — decision, question, and source plan

```text
I need to decide [decision] by [date] for [audience]. Rewrite the topic as one
answerable question. Define inclusion, exclusion, freshness, material claims,
the source class that owns each claim, and a stop rule. Separate stable
principles from volatile product facts. Do not search until the question could
change the decision. If the topic is still broad, stop with a Research Router
plan; if it is settled, hand the lookup to Source Investigator.
```

- **Model should:** bind research to a decision and route each material claim
  to an appropriate primary or official source class before retrieval.
- **Common failure:** searching before defining scope creates a link collection
  that cannot answer the decision.
- **Evidence to keep:** original topic, scoped question, decision owner,
  inclusions, exclusions, freshness, claim-owner map, plan, and stop rule.
- **Status and receipt boundary:** this card creates a `research_plan`; it does
  not support a factual conclusion. Missing scope remains `draft` or `blocked`.

### Card C2 — claim ledger, conflict, and stop receipt

```text
Investigate the bounded question through the source-owner plan. For each
material claim record the exact source location, access date, direct support,
inference, applicable scope, material conflict, unknown, and reuse boundary.
Check who published unfamiliar pages and what independent sources say. Treat
forum posts as demand or failure signals unless their evidence supports the
claim. Synthesize by claim, not source count, and end with a stop receipt naming
coverage, unresolved conflicts, exclusions, freshness, and the smallest next
check that could change the decision.
```

- **Model should:** inspect sources in context, distinguish support from
  inference, seek disagreement, narrow weak claims, and stop deliberately.
- **Common failure:** repeated posts do not establish prevalence, root cause,
  official behavior, or effectiveness; a URL without an inspected passage is
  not claim evidence.
- **Evidence to keep:** searches run, claim ledger, precise source locations,
  access dates, conflicts, inaccessible sources, synthesis revision, and stop
  receipt.
- **Status and receipt boundary:** use `source-supported within [scope/date]`
  only for claims with matching evidence. Unsupported claims remain `unknown`,
  `disputed`, or `out_of_scope`; never report exhaustive research.

## Small experiment

Run one low-risk route twice: first ask for the answer immediately; then use
the matching two-card route. Hold task revision, inputs, surface/model label,
time limit, and acceptance criteria as fixed as possible. Compare answer
leakage, assumptions, corrections, final acceptance, evidence completeness,
and confounders. One pair is an observation, not proof of prompt superiority.
This practice pack has no complete stored learner run yet.
This comparison has not been run as a practice-pack evaluation. Results from
the separate release-handoff request study cannot substitute for learner data.

## Copy-ready practice receipt

Keep the receipt short enough to compare two runs. Leave unavailable fields
`not_run` or `unknown`; do not let the model fill gaps with plausible prose.

```text
route | prompt_card_revisions | target_or_decision | conditions | allowed_aids
baseline_or_question | correction_or_claim_ledger | changed_or_conflict_check
scorer_and_threshold | evidence | unknowns | exact_status | claim_limit
next_review | stop_reason
```

## Acceptance checklist

- [ ] Exactly one of the three routes and one bounded target or decision are named.
- [ ] The first attempt or research question exists before substantive help.
- [ ] Allowed aids, scoring or source rules, and stop conditions are explicit.
- [ ] Corrections preserve the original attempt or unsupported claim.
- [ ] Learning status matches fixed, delayed, or changed-task evidence.
- [ ] Research claims name scope, access date, conflict, and unknowns.
- [ ] Product commands, tools, persistence, and permissions remain in a current adapter.
- [ ] No result is called mastered, fluent, expert, complete research, or best prompt.

## Sources and boundary

The cards and fixtures are original project material. Their rationale is
recorded in:

No evaluation results for the Beginner Practice Pack are stored here. The
records below explain its design or demonstrate separate evaluation methods.

- [Beginner Practice Pack primary-source boundary](../docs/research/beginner-practice-pack-sources-2026-08-13.md)
- [Beginner first-practice friction](../docs/research/beginner-first-practice-friction-2026-08-13.md)
- [Durable language learning and bounded research](../docs/research/durable-language-learning-and-bounded-research-2026-08-13.md)
- [Prompt patterns for real work](../docs/research/prompt-patterns-for-real-work-2026-08-10.md)
- **Separate evaluation-method example:** [Task-contract availability and channel study](../evals/candidates/task-contract-availability-and-channel-v1/README.md) — compares three ways of supplying a task contract for a synthetic maintainer handoff. It does not test these practice cards, coaching, or learner outcomes.

Those records support design rationale, not prompt, model, platform, research,
or learning effectiveness. Recheck volatile product guidance before teaching
commands, accounts, tools, or persistence.
