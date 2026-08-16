<!-- content_id: communication-clinic | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-16 -->

# Beginner Practice Pack: first prompts for real work

**Status:** `candidate` · **Learner evidence:** `not_run` · **Designed for:**
low-risk, text-only chat. No cross-model run evidence exists; product-specific
actions require a sourced adapter.

This pack is the same six starter cards in every supported language: English,
简体中文, Español, 日本語, 한국어, Deutsch. Pick the card closest to what you
need **today**, try it yourself first, then let the model help with only one
bounded problem.

Need a full six-message practice loop instead? Open the
[six-message Spanish practice loop](spanish-practice-loop-EN.md), the
[truthful work-update loop](work-update-practice-loop-EN.md), or the
[bounded research-check loop](research-check-practice-loop-EN.md).

> Only use fictional, public, or authorized text. Do not paste passwords,
> tokens, private chats, customer records, unpublished files, or production
> content.

<span id="first-practice-intake"></span>

## Start here — choose the lane

Do not start with a Skill or a feature list. Start with one small question:
**Can I judge the reply only against text or facts I have supplied?** Then
ask: **Does it need a current external fact, or would it change anything
outside this conversation?**

| If your request sounds like this | Choose this lane | First safe move |
| --- | --- | --- |
| "Make this supplied paragraph friendlier. Do not add facts." | Text-only draft | Use [Dialogue Brief](../skills/prysai-dialogue-brief/SKILL.md) for a new message, or [First-Turn Check](../skills/prysai-first-turn-check/SKILL.md) for an unsent draft. |
| "Is this product rule still current?" | One bounded current fact | Use [Source Investigator](../skills/prysai-source-investigator/SKILL.md); freeze one claim, a date boundary, and the source owner. |
| "Compare several options and tell me what the evidence says." | Multi-source research | Use [Research Router](../skills/prysai-research-router/SKILL.md); first define the decision, candidates, and acceptable evidence. |
| "Confirm the policy, then update the public help page." | External action or change | Use [Task Protocol](../skills/prysai-task-protocol/SKILL.md) first. A citation is not permission to publish. |

Before a practice session, use the [Practice Target Skill](../skills/prysai-practice-target/SKILL.md)
when you have a wish but not yet a first action: it keeps your own words, then
asks for one situation, one observable move, one short first try, a help limit,
a visible check, and a smaller fallback. It does not teach, grade, or promise a
result.

If a reply has already missed the task, use the
[communication failure triage skill](../skills/prysai-communication-failure-triage/SKILL.md)
or read [Chapter 9: Verification, doubt, and recovery](chapters/09-verification-and-recovery-EN.md).
Before outside material, a local file, a tool, or an action is involved, read
[Chapter 13: Action boundaries](chapters/13-action-boundaries-EN.md) or the
[First Safe Change route](routes/first-safe-change-EN.md).

## A. Language practice

<span id="language-practice-route"></span>
<span id="six-short-spanish-messages"></span>

The target is a small **typed** exchange, not "learn a language." The model
practises one function with you: you write first, the model corrects at most
one meaning-blocking error, and a changed case is tested later. Use fictional
details only. A completed exchange is a recorded attempt—not fluency, a
language level, or proof that the model's feedback was correct.

### 1. Spanish: try first, then ask for one correction

**Expect:** your own sentence is preserved, then you receive one bounded,
checkable correction. Do not let the model complete the dialogue for you.

```text
I want to rehearse one simple Spanish hotel check-in with fictional details.
Help me choose one observable four-turn typed target, one help limit, one
self-check, and one smaller fallback. Do not write a dialogue, teach, assess
my level, or promise fluency. Ask one question only if a decision is missing.
```

Then run it:

```text
Run the fictional Spanish hotel check-in we agreed. You are the receptionist
and ask one short present-tense question at a time. Wait for my answer before
continuing. Do not translate, give me a model answer, or invent personal,
booking, passport, contact, or payment details. Preserve my first attempt.
Before turn one, show this fixed rubric: four learner turns; name and
two-night stay communicated; requested service communicated; one ambiguity
resolved; Spanish understandable enough to continue. Correct only the first
meaning-blocking error: name the error type, give a partial cue, then one
worked fragment only if I still cannot continue. Ask me to correct it.
Keep both attempts and do not call one successful exchange fluency, spoken
conversation, or listening/pronunciation evidence.
```

- **Model should:** fix conditions before teaching, wait, preserve the
  attempt, disclose the hint, and request a learner-authored correction.
- **Common failure:** supplying a polished dialogue first contaminates the
  baseline. If this happens, save the leaked text, mark the baseline
  `contaminated`, and restart with changed fictional details.
- **Evidence to keep:** card revision, `mode: typed_rehearsal`, time,
  allowed aids, original attempt, rubric, hint, corrected attempt, score,
  scorer, model/surface label if known, and unknowns.
- **Status boundary:** selecting the card is `template_selected`; a completed
  coached exchange is at most `practised`. A model's own score is not
  independent evidence.

### 2. Spanish: transfer the same ability to a new scene

**Expect:** you practise one capability ("ask for information and resolve an
either/or"), not the previous round's standard answer.

```text
Use my saved hotel record, but do not reuse its sentences. Run exactly four
learner turns at a train station: I need a one-way ticket to Toledo tomorrow
morning and must resolve whether the train leaves at 8:15 or 8:50. Keep the
same five scoring dimensions—turns completed, traveller detail, requested
service, ambiguity resolved, understandable Spanish—allow no hints, preserve
my attempt, and name the changed variation.
```

- **Common failure:** a near-copy of the hotel dialogue is rehearsal, not
  transfer; a same-session result is not retention.
- **Status boundary:** a passing train attempt may support
  `transferred_to_train-station-information-exchange`; it does not mean
  broad fluency. For the fuller fixture, use
  [Lab 018](labs/lab-018-language-transfer-EN.md) and the
  [learning practice contract](guides/learning-practice-contract-EN.md).

## B. Work communication and judgment

<span id="general-skill-practice-route"></span>
<span id="six-short-work-update-messages"></span>

Choose a performance another person can inspect: explain a concept without
notes, answer one interview question, or revise one paragraph for a named
audience. "Understand the topic" is not observable. Use fictional facts only.

### 3. Work update: turn scattered points into a sendable update

**Expect:** the same facts can carry different tones; the model must not
invent progress that was not supplied.

```text
Please turn the following work notes into an update for [colleague / client /
manager].

Raw notes:
- [fact 1]
- [fact 2]
- [still uncertain item]

Requirements:
- First list the facts you can confirm from the raw notes;
- do not add dates, commitments, completion status, or reasons;
- give one version under 120 words and one more formal version;
- end by listing two things I must confirm myself before sending.
```

### 4. Work judgment: ask first, then advise

**Expect:** when a key condition is missing, a good reply exposes the unknown
instead of pretending to know.

```text
I need to make a small decision between [option A] and [option B].
My goal: [goal].
What I know: [facts].
What I do not know: [unknowns].

Do not decide for me. First ask at most three questions that would change the
conclusion; then give me a two-column table of "what the current evidence
supports" and "what still cannot be judged". If a key fact is missing, advise
me to pause instead of guessing.
```

- **Model should:** replace vague learning language with an action, conditions,
  aids, time, rubric, and stop condition, then let you perform it.
- **Common failure:** a long lesson or model artifact makes recognition look
  like independent production.
- **Status boundary:** one attempt is `practised`, not improvement,
  readiness, or mastery. For the six-message work-update loop, open
  [work-update-practice-loop-EN.md](work-update-practice-loop-EN.md).

## C. Research and pre-share checks

<span id="bounded-research-route"></span>
<span id="six-short-research-messages"></span>
<span id="source-check-route"></span>
<span id="retrieval-scope-receipt"></span>

Research evidence is not learning evidence. The strongest ordinary claim is
`source-supported within [scope/date]`, not "complete research," universal
truth, or freshness beyond the recorded access date.

### 5. Research start: shrink a big question into a checkable one

**Expect:** you receive a research plan first, not a complete-looking but
unverifiable conclusion.

```text
I want to investigate this question: [question].
This question will help me decide: [decision].
I only accept these source types: [e.g. official docs, papers, institutional
reports].

Do not answer the question, and do not invent sources.
Please write:
1. one smaller, checkable question;
2. the first material claim to verify;
3. the most likely owner of that claim;
4. a stop rule for when a source cannot be found.
```

### 6. Research check: make a source support one specific sentence

**Expect:** a link existing does not mean it supports your conclusion; the
model's job is to help you prepare the checklist.

```text
I want to check whether the following sentence is supported by the material I
provide.

Claim: [one specific sentence]
Material summary or excerpt: [only public content you are allowed to share]
Source link or citation: [link / reference]

Split the result into three columns:
- what the material directly supports;
- what the material does not say or contradicts;
- what I must open the original source to verify myself.
```

Do not call an unopened link verified, and do not fill in missing facts. For
the six-message research loop, open
[research-check-practice-loop-EN.md](research-check-practice-loop-EN.md).

### 7. Share check: narrow the item and the audience before sending

**Expect:** first separate "what I want to share" from "what I am allowed to
share". This card only helps you decide; it does not upload, send, or publish
anything for you.

<span id="share-check"></span>

```text
I am considering sharing part of an AI answer or chat excerpt.
My purpose: [e.g. ask a colleague to check a phrase].
Possible recipients: [role or group].
What I plan to share: [one-sentence description; do not paste secrets or
private material].
What I will not share: [customer data, passwords, full chat logs, unpublished
files, etc.].

Do not send, upload, or create a link. First give me:
1. the smallest excerpt this purpose needs;
2. the recipient, content, and authorization I must confirm before sending;
3. which unknowns should make me stop rather than share by default.
If I have not named a recipient or authorization, only suggest pausing and
tell me what to add.
```

## Do four steps only — do not overcomplicate the first practice

1. Choose the one card closest to today's need.
2. Write your own short attempt first, or fill in the facts you know.
3. Put the reply next to your original version and check whether it crossed
   your limits.
4. Keep a minimal record: task, original attempt, help used, the version you
   kept, and what is still unknown.

If the model returns a complete answer when you wanted to practise, ask it to
step back to "one hint"; if it invents facts, sources, or promises, stop using
that reply and keep the unverified parts as unknown.

## Practice receipt: keep one conversation

After any card, keep only this small record. It lets you see next time what
you practised, and it stops "I found it useful" from being written as
unfounded evidence.

```text
Task:
My first attempt or known facts:
Help the AI provided (hint / correction / source plan):
The version I kept:
What I checked myself:
Still unknown or disputed:
Status: template_selected | practised | not_run | blocked
```

`practised` only means one recorded attempt exists; it does not mean fluency,
mastery, improved efficiency, or fully verified sources.

## Did this practice count as complete?

Completing a card supports at most one recorded, conditioned attempt. Claiming
"demonstrated on this task" additionally needs a pre-written rubric and a
checkable result; retention or transfer additionally need a delayed and a
changed-case task. None of these cards has Prysai learner runs, independent
scoring, or cross-model comparison evidence.

This is a set of original starter cards; it is not a "magic prompt" list. It
has no cross-model run evidence, and it does not prove efficiency gains,
learning outcomes, model superiority, or identical platform behavior. When
files, tools, browsing, accounts, external publication, or real data enter the
task, stop and move to the sourced platform-specific guidance.

- [ ] I only used fictional, public, or authorized text.
- [ ] I left my own attempt or known facts before receiving a full answer.
- [ ] I checked whether the model added facts, promises, or sources.
- [ ] I know this result cannot prove efficiency, mastery, fluency, or model
      quality.
- [ ] When files, browsing, external actions, or sensitive data were needed,
      I stopped and moved to a bounded process.

## What to read next

- Understand what a model, GPT, and Codex are before choosing a product:
  [Chapter 1](chapters/01-gpt-and-codex-EN.md).
- Turn a prompt card into a task with acceptance criteria:
  [Chapter 3: Turn a wish into a task protocol](chapters/03-task-protocol-EN.md).
- Make one safe, reversible real file change:
  [Lab 001: First safe task](labs/lab-001-first-safe-task-EN.md).
- Make practice produce explainable evidence:
  [Learning Practice Contract](guides/learning-practice-contract-EN.md).
- Practise one full Spanish loop:
  [six-message Spanish practice loop](spanish-practice-loop-EN.md).
- Practise a truthful work update:
  [work-update practice loop](work-update-practice-loop-EN.md).
- Practise one bounded research check:
  [research-check practice loop](research-check-practice-loop-EN.md).

<span id="public-interest-safety-route"></span>
<span id="recovery-route"></span>
<span id="four-line-safety-card"></span>
<span id="card-e1-user-declared-continuity-receipt"></span>

Extended routes from earlier revisions now live in their own sourced homes:

- **Public-interest safety inquiry** (assessing an AI idea that could affect
  people): [public-interest AI safety research](../docs/research/public-interest-ai-safety-research-2026-08-13.md).
- **Recovery after a missed reply** (preserve the miss, rerun one variable,
  record a continuity receipt): [Chapter 9](chapters/09-verification-and-recovery-EN.md),
  [Communication Failure Triage](../skills/prysai-communication-failure-triage/SKILL.md),
  and [Lab 014: Resume reconciliation](labs/lab-014-resume-reconciliation-EN.md).
- **Boundary card before sharing, searching, or acting** (input, egress,
  allowed effect, evidence claim, stop): [Chapter 13](chapters/13-action-boundaries-EN.md)
  and the [First Safe Change route](routes/first-safe-change-EN.md).

## Sources and boundary

These starter cards are Prysai's original practice material. Their design
boundary and source records live in the language-neutral research archive:
[entry-level LLM collaboration for language and research](../docs/research/entry-level-llm-collaboration-for-language-and-research-2026-08-13.md),
[everyday prompt cards source receipt](../docs/research/everyday-prompt-cards-source-receipt-2026-08-14.md),
and [six-prompt learning claims and user friction](../docs/research/six-prompt-learning-claims-and-user-friction-2026-08-14.md).
These records explain the "attempt first, then constrained feedback, then
receipt" candidate design; they do not prove that any prompt, model, or course
works.
