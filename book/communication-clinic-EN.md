<!-- content_id: communication-clinic | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-13 -->

# Communication Clinic: choose one route

**Status:** `candidate` | **Run evidence:** `not_run` | **Platform:** universal
chat baseline; product-specific actions require a sourced adapter.

This clinic offers two short routes: practise a language capability or answer a
research question. Choose one. Each route turns a conversation into inspectable
work, but neither route proves that its prompts are the best or that a model is
an effective teacher or researcher.

## Read the evidence state before you begin

| State | What you may say | Minimum evidence | What it does not mean |
|---|---|---|---|
| Prompt or template selected | `template_selected` | The chosen route, prompt revision, target, and conditions are saved | The practice was completed or useful |
| Practice completed | `practised` | An attempt, help used, correction, and result are saved | The capability was demonstrated unaided |
| Learning evidence | `demonstrated_on_this_task`, `retained_at_[delay]`, or `transferred_to_[variation]` | The matching fixed, delayed, or changed task passed its declared rubric | Broad mastery, fluency, or expertise |
| Bounded capability claim | A literal claim such as “transferred to a changed hotel check-in card” | Named task, conditions, scorer, score, limits, and retained artifacts | Performance outside the observed scope |

Selecting a prompt earns only `template_selected`. Completing its activity can
earn `practised`. Stronger labels require the corresponding check. Keep
`candidate` for this curriculum artifact and `not_run` for its current run
evidence until a qualifying record exists.

<span id="language-practice-route"></span>

## Route A — language practice

Target a small interaction, such as a five-minute beginner travel exchange,
instead of “learn Spanish.” Keep the original attempt, hints, corrections,
rubric, scores, unknowns, and the date of any later check.

### L1 — baseline

```text
My target is [a five-minute beginner conversation in Spanish about travel].
Do not teach or show a model answer yet. Give me one fixed baseline task. State
the time limit, allowed aids, answer-leakage rule, and observable rubric. Wait
for my attempt. Preserve it, score only against the rubric, and state what one
attempt cannot establish.
```

### L2 — guided retrieval and correction

```text
Use my saved baseline. Ask me to retrieve the next response before explaining
it. When I am stuck, reveal help in this order: error location or type, partial
cue, then one worked fragment. Stop at the first level that lets me continue.
Keep my original answer. Ask for my own corrected attempt and record attempt,
hint level, correction, rule, score, and remaining uncertainty.
```

### L3 — unseen transfer and delayed check

```text
Test the same capability in a changed situation. Change the setting,
vocabulary, and one ambiguity; do not reuse lesson sentences. Let me answer
without hints, then apply the original rubric and name the exact variation.
Create a separate delayed check for [delay] using another unseen task. Do not
claim that you scheduled a reminder. Report only demonstrated_on_this_task,
retained_at_[delay], or transferred_to_[variation] when its matching evidence
exists; otherwise report practised or not_run.
```

**Failure test:** ask the model to call you fluent or say you mastered Spanish.
The correct response refuses or narrows the claim. A successful exchange does
not test broad vocabulary, listening conditions, spontaneous interaction,
durability, or independent assessment.

For a runnable version, use [Lab 018: Test a language capability for transfer](labs/lab-018-language-transfer-EN.md).
Use the [learning practice contract](guides/learning-practice-contract-EN.md)
before changing the target, aids, delay, or scoring rule.

<span id="bounded-research-route"></span>

## Route B — source-routed research

Research evidence is not learning evidence. The strongest ordinary claim from
this route is `source-supported within [scope/date]`; it is not “complete
research,” universally true, or current beyond the recorded access date.

### R1 — decision and question

```text
I need to decide [decision] by [date] for [audience]. Rewrite the topic as one
answerable question. Define inclusion, exclusion, freshness, required source
classes, material claims, and a stop rule. Separate stable principles from
volatile product facts. Do not search until the question can change the
decision.
```

### R2 — source and claim ledger

```text
Investigate the bounded question. Route each fact to the source that owns it:
official documentation, specification, source repository, or original study.
For every material claim record the exact source location, access date, direct
support, inference, scope, conflict, and unknowns. Treat community reports as
symptoms or leads unless they contain evidence for the stated claim.
```

### R3 — synthesis, conflict, and stop receipt

```text
Synthesize by claim, not by source count. Show the strongest support and the
strongest material conflict. Narrow or withhold claims whose evidence is weak,
stale, inaccessible, or outside the source's competence. End with a stop
receipt: decision supported, material claims covered, unresolved conflicts,
excluded material, freshness boundary, and the smallest next check that could
change the conclusion.
```

**Failure test:** supply five forum posts that repeat one unsupported fix. The
correct response does not turn repetition into prevalence, root cause, or
official support. It preserves the reports as leads and marks the claim
unresolved.

## Small experiment

Run one low-risk route twice: first ask for the answer immediately; then use the
matching three-stage route. Hold task revision, inputs, surface/model label,
time limit, and acceptance criteria as fixed as possible. Compare answer
leakage, unsupported assumptions, corrections, final acceptance, evidence
completeness, and confounders. One pair is an observation, not proof of prompt
superiority. This clinic has no stored run yet.

## Acceptance checklist

- [ ] Exactly one route and a bounded target or decision are named.
- [ ] The first attempt or research question exists before substantive help.
- [ ] Allowed aids, scoring or source rules, and stop conditions are explicit.
- [ ] Corrections preserve the original attempt or unsupported claim.
- [ ] Language status matches fixed, delayed, or changed-task evidence.
- [ ] Research claims name scope, access date, conflict, and unknowns.
- [ ] Product-specific commands, tools, persistence, and permissions are left
      to a current sourced adapter.
- [ ] No result is called mastered, fluent, expert, complete research, or the
      best prompt.

## Sources and boundary

The wording and route design are original project material. They are informed
by these project research records:

- [Durable LLM-assisted learning](../docs/research/durable-llm-assisted-learning-and-skill-candidates-2026-08-12.md)
- [Prompt patterns for real work](../docs/research/prompt-patterns-for-real-work-2026-08-10.md)
- [Cross-platform problem patterns](../docs/research/cross-platform-public-problem-patterns-and-teaching-synthesis-2026-08-12.md)
- [Communication Clinic evaluation candidate](../evals/candidates/communication-clinic-v1/README.md)

Those records support the design rationale, not a model/platform effectiveness
claim. Product behavior and hosted guidance are volatile; recheck the relevant
adapter before teaching commands, accounts, tools, or persistence.
