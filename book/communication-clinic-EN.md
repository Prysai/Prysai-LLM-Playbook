<!-- content_id: communication-clinic | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

# Communication Clinic: useful prompts that teach a method

**Status:** `candidate` · **Run evidence:** `not_run` · **Platform:** universal
chat baseline; product-specific actions require an adapter.

This clinic is for a person who wants a useful result today and a transferable
skill tomorrow. The prompts are deliberately ordinary. They do not ask the
model to become a genius, reveal hidden reasoning, or guarantee mastery. Each
one changes an observable part of the collaboration: the attempt, context,
criteria, evidence, correction, or transfer task.

## The rule behind every prompt

```text
attempt first → diagnose one consequential gap → revise → test a changed case
```

Replace bracketed text. Keep the result, your first attempt, help used,
correction, and final check. A smooth conversation proves only that a smooth
conversation occurred.

## Learn Spanish through six short contracts

Use a real outcome such as “hold a five-minute conversation about travel,” not
the unbounded goal “learn Spanish.”

### 1. Establish the starting point

```text
I want to [hold a five-minute beginner conversation in Spanish about travel].
Do not teach yet. Give me one short baseline task that tests that ability.
State the rules, allowed help, time limit, and scoring criteria. Wait for my
answer. Then record what communicated, what blocked meaning, and what one
attempt cannot establish.
```

### 2. Teach one unit, then make me retrieve it

```text
Teach only the next small unit I need for [asking for directions]. Keep the
opening explanation brief. Ask me to answer from memory before showing a model
answer. If I get stuck, give one hint at a time: error type, partial cue, then
one worked fragment. Require a corrected attempt in my own words.
```

### 3. Correct what changes meaning first

```text
For each answer, say what was understood, then identify the first error that
changes meaning or blocks the target skill. Explain that rule plainly and ask
me to correct it. Keep an error ledger: attempt, correction, rule, next
variation. Do not rewrite the whole answer or polish minor style first.
```

### 4. Simulate a real exchange

```text
Run a [hotel check-in] role-play in Spanish. Use one turn at a time and wait for
me. Do not silently make my answer correct. If meaning breaks, pause the scene,
name the smallest repair, let me retry, then continue. End with the transcript,
help used, and the two errors that matter next.
```

### 5. Test transfer, not sentence memory

```text
Give me a new situation using the same underlying skill, but change the
setting, vocabulary, and one ambiguity. Do not reuse lesson sentences. Let me
respond unaided. Score against the same criteria and label the result only as
demonstrated on this task, not mastered.
```

### 6. Prepare a delayed review

```text
Using only my attempts and error ledger here, create a 15-minute review for
[date]. Start with unaided recall, revisit the two remaining errors, include a
mixed example, and end with one unseen task. Do not claim you scheduled a
reminder. Give me a cue to save and the evidence to bring back.
```

**Failure test:** ask the model to declare you fluent after the session. The
correct response must refuse or narrow the claim. One session lacks delayed
retention, broad vocabulary, spontaneous interaction, listening conditions,
and independent assessment.

## Learn any practical skill

```text
The capability I want is [write a clear one-page project brief]. Give me one
small authentic task, an example input, and five observable criteria. Wait for
my attempt. Diagnose the first decision I made poorly, not every surface flaw.
Teach only what I need for a second attempt, then change the input and test
whether the decision transfers.
```

```text
Here is my current artifact: [paste or attach it]. Separate facts you can see,
assumptions, and missing context. Ask at most three questions whose answers
could change the critique. Then give me the smallest revision exercise. Do not
replace my work with a polished final unless I explicitly ask for that.
```

```text
Build a [two-week] practice plan from my baseline, available [20 minutes a
day], and target [observable performance]. Each session needs retrieval, one
new variation, a check, and a saved artifact. Include a midpoint transfer task
and a delayed final task. Mark assumptions and do not promise a learning rate.
```

## Search and research without collecting confident noise

```text
I need to decide [decision] by [date] for [audience]. Before searching, rewrite
this as one answerable question. Define inclusion, exclusion, freshness, and
which sources can own each fact. Show me the search plan and stop rule. Do not
search until the question is narrow enough to change the decision.
```

```text
Investigate [bounded question]. Prefer first-party documents, specifications,
primary research, or source-owner records. For every material claim record:
claim, source, access date, direct support, scope, counterevidence, and what the
source does not prove. Search once for disagreement. Treat forum posts as
symptoms or leads, not official facts.
```

```text
Audit this claim: [claim]. First define the exact result and time horizon it
would need to prove. Separate fact, inference, anecdote, advertisement, and
unknown. Find the strongest direct evidence and strongest contrary evidence.
End with the narrowest truthful rewrite and the evidence still needed.
```

**Failure test:** give the model five forum posts that repeat one unsupported
fix. It must not convert repetition into prevalence, root cause, or official
support.

## Make a better decision

```text
I am choosing between [options] for [decision]. Ask for the constraints that
could reverse the choice. Propose a short weighted rubric and wait for my
approval. Score each option with source-backed facts, mark missing evidence,
run one sensitivity check, and return a recommendation only within the stated
conditions.
```

```text
Here is my preferred decision and evidence: [material]. Build the strongest
case that it fails. Identify assumptions, omitted alternatives, irreversible
costs, and the observation that would change your conclusion. Do not invent a
balanced compromise. End with proceed, test first, or stop, plus the reason.
```

## Create or revise real work

```text
Revise [artifact] for [reader and outcome]. First describe its current voice,
argument, and three highest-impact problems using quoted fragments only where
necessary. Propose edits and explain each decision. Preserve specific language
and useful irregularity; remove generic filler, unsupported confidence, and
repeated conclusions. Return the revision plus a short change ledger.
```

```text
Create [artifact] from [named inputs]. Constraints: [scope, facts, format,
permissions]. Before drafting, list missing inputs that could change the
result. Acceptance: [observable criteria]. After drafting, audit each criterion
and label it pass, partial, or unverified with evidence. Stop before publishing
or contacting anyone.
```

## A ten-minute experiment

Use one real low-risk task twice: first ask for the answer immediately; then
use the matching clinic prompt and make an attempt first. Keep the task, input,
model/surface, time limit, and acceptance criteria fixed. Compare unsupported
assumptions, correction turns, final acceptance, evidence completeness, and how
much of the result you can reproduce without copying.

Five or more repetitions per condition are required before even a descriptive
pattern is worth discussing. This clinic has not run that comparison yet.

## Acceptance checklist

- [ ] The prompt names a real outcome and a bounded input.
- [ ] The learner or worker makes an attempt before receiving a replacement.
- [ ] Feedback prioritizes a consequential decision or error.
- [ ] The next task changes enough to test transfer.
- [ ] The output separates observed evidence, inference, and unknowns.
- [ ] Product-specific actions are deferred to a sourced platform adapter.
- [ ] The completion claim does not exceed the saved evidence.

## Sources and boundary

The prompt wording and organization are original project material. The method
is informed by the project's dated synthesis of official OpenAI, Anthropic,
Google, learning-science, and field-problem sources:

- [Prompt patterns for real work](../docs/research/prompt-patterns-for-real-work-2026-08-10.md)
- [Durable LLM-assisted learning](../docs/research/durable-llm-assisted-learning-and-skill-candidates-2026-08-12.md)
- [Cross-platform problem patterns](../docs/research/cross-platform-public-problem-patterns-and-teaching-synthesis-2026-08-12.md)
- [Communication Clinic evaluation candidate](../evals/candidates/communication-clinic-v1/README.md)

Those records do not prove that these prompts improve outcomes. Product
features, model behavior, and hosted guidance remain volatile; recheck a
platform adapter before teaching commands, permissions, tools, or persistence.
