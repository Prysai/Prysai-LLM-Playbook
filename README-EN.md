<!-- content_id: project-readme | locale: EN | language: en | default_locale: EN | translation_status: source | canonical_source: README-EN.md -->

<p align="center">
  <img src="assets/readme/prysai-llm-playbook-header.svg" alt="Prysai LLM Playbook: from first task to reliable work" width="100%">
</p>

# Prysai LLM Playbook — From First Task to Reliable Work

License: curriculum text and teaching assets are CC BY 4.0; scripts and
tooling are Apache-2.0, unless a file states otherwise. See [`LICENSE`](LICENSE),
[`LICENSE-CODE`](LICENSE-CODE), and the [licensing boundary](docs/sources/licensing.md).

> First understand what an LLM can and cannot support. Then practise one small
> result, check it, and only afterwards choose a Codex or other platform track.

## A quick welcome

Perhaps you have heard people mention Codex, Claude Code, Agents, or Skills
and wondered which one you are supposed to learn first. You are in the right
place. We will not start with a product contest or a long feature list. We
will start with one small question, make one bounded attempt, and keep enough
evidence to tell what happened. You do not need to memorise a product
catalogue before beginning.

> **Release decision:** `candidate` only. Static checks pass, but learner and
> transfer runs, repeated evaluations, and independent review
> evidence are still pending; two isolated first-turn observations are recorded.
> This is a development candidate, not a finished course.

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md)
<!-- language-switcher:end -->

## Start with the foundation

1. [LLM Foundation Core v1](book/routes/llm-foundation-core-v1-EN.md)
2. [LLM concepts](book/guides/llm-fundamentals-EN.md)
3. [First bounded request](book/routes/llm-core-first-generation-EN.md)

**New here?** [Open the guided reading site](https://docs.prysai.com/llm-playbook/) for the five-unit LLM foundation route. You do not need Codex, Git, a terminal, or a private file to begin. This repository remains the auditable source.

[Start the LLM foundation core](#llm-foundation-core) · [Try the optional no-setup practice](#optional-15-minute-warm-up-no-git-required) · [Open the optional Codex boundary chapter](book/chapters/01-gpt-and-codex-EN.md)

The Spanish, work-update, and research cards are **optional application practice** after the textbook path; they are not the first lesson.

README language links switch repository entry files. The interactive showcase is
a local contributor preview; follow [`site/README.md`](site/README.md) to serve
it. It uses `?lang=` routes and may show an explicit fallback when a translation
is not available.

### Actual course-language coverage

This table counts only the 22 chapters and 18 Labs. It separates a readable
translation slice from a complete course and does not measure translation
quality, learner outcomes, or release readiness.

| Locale | Readable course units | Current boundary |
|---|---:|---|
| English | 40 / 40 | Canonical source language. |
| Simplified Chinese | 40 / 40 | 22 chapters and 18 Labs have same-locale candidate files; the supplemental LLM foundation guide is stale after the 2026-08-17 English revision and is withheld from the sitemap until retranslation and review. |
| Spanish | 40 / 40 | 22 chapters and 18 Labs have same-locale candidate files; the supplemental LLM foundation guide is stale after the 2026-08-17 English revision and is withheld from the sitemap until retranslation and review. |
| Japanese | 40 / 40 | 22 chapters and 18 Labs have same-locale candidate files; the supplemental LLM foundation guide is stale after the 2026-08-17 English revision and is withheld from the sitemap until retranslation and review. |
| Korean | 40 / 40 | 22 chapters and 18 Labs have same-locale candidate files; the supplemental LLM foundation guide is stale after the 2026-08-17 English revision and is withheld from the sitemap until retranslation and review. |
| German | 40 / 40 | 22 chapters and 18 Labs have same-locale candidate files; the supplemental LLM foundation guide is stale after the 2026-08-17 English revision and is withheld from the sitemap until retranslation and review. |
| Traditional Chinese | 40 / 40 | 22 chapters and 18 Labs have same-locale candidate files; independent Traditional Chinese language review is still pending. |

Seven locale choices provide a complete **file path** for the 22 chapters and 18
Labs. The revised foundation guide is deliberately marked stale in the six
non-English locales until it is retranslated. That structural coverage is not six independently reviewed, culturally adapted, or
learner-validated courses. Supplemental
reader material still has its own coverage and review status; the reader
exposes the same `available / 40` course-unit count in its language selector.

> **Project status:** `candidate` · **Default locale:** English · **Scope:**
> book, labs, Skills, research, evaluation, and team practice

## The short version

This repository is a book-shaped learning and practice system with one default
layer and several later layers. The default is a small LLM foundation core for
people who need to understand context, request shape, failure, checking, and
limits before they touch tools. The Codex boundary chapter and the later Skills,
Agents, professional, and team material remain available as optional follow-on
routes after that foundation.

**Current guided scope:** the LLM foundation core. The Codex Practice Track,
platform adapters, application cards, and professional material are optional
follow-on layers. The repository still does not claim that every platform
behaves the same or that any prompt guarantees an outcome: product-specific
commands, authority, persistence, and failure modes belong in evidence-gated
adapters with first-party sources.

[Open the universal-core route](book/routes/universal-core-foundations-EN.md)
to study four extracted units, then use its fictional four-seam fixture to
practise task, target, receipt, and structured-state checks before choosing an
adapter. Adapter routes are `candidate / not_run`: the structure exists, the
learner and cross-platform runs are still missing.

The central promise is simple:

> <mark>Do not stop at a plausible output.</mark> Define the task, choose the
> smallest useful capability, act within a visible boundary, preserve the
> evidence, and say exactly what remains unverified.

This is an independent curriculum and practical playbook. It is not OpenAI's
official documentation, an official Codex product page, or a catalogue of
copied prompts and Skills.

## LLM foundation core

The core route is the only default starting path. It has five units:

1. explain what an LLM is and is not;
2. write a small request with goal, context, limits, and output shape;
3. identify omission, invention, forced ambiguity, and overconfidence;
4. check and minimally repair an answer while stating one limit; and
5. repeat the method on an unseen task without a complete prompt template.

Each unit must leave a learner-authored artifact. A copied prompt, a polished
model answer, or a green structural check is not proof of learning. See the
[core course contract](docs/product/core-course-contract.md),
[scope freeze](docs/governance/core-release-scope.md), and
[core content inventory](docs/governance/core-content-inventory.yaml) for the
current boundary. The route is `candidate`; learner completion, transfer, and
long-term retention are `not_run`.

## The textbook path — read it in order

This project is also a book, but the complete catalogue is not the beginner
path. The five-unit LLM Foundation Core is the one default route; platform,
tool, Skill, and application chapters are follow-on choices.

1. [LLM Foundation Core v1](book/routes/llm-foundation-core-v1-EN.md) — explain
   the model boundary, make one bounded request, identify a visible failure,
   repair it, and transfer the method.
2. [Unit 1 — LLM concepts](book/guides/llm-fundamentals-EN.md) — learn LLMs,
   tokens, context, context windows, prompts, instruction layers, tools, MCP,
   Agents, and Skills without treating any of them as proof of access or truth.
3. [Unit 2 — first bounded request](book/routes/llm-core-first-generation-EN.md)
   — make the goal, material, constraints, response shape, evidence, and stop
   line explicit.
4. Continue through [visible failures](book/routes/llm-core-visible-failures-EN.md),
   [check and repair](book/routes/llm-core-check-repair-EN.md), and
   [unseen transfer](book/routes/llm-core-unseen-transfer-EN.md).

Only after the core should you open the optional
[GPT/Codex boundary chapter](book/chapters/01-gpt-and-codex-EN.md), a Skill,
an Agent route, or a product-specific guide. If you have a disposable project,
the [First Safe Change fixture](book/routes/first-safe-change-EN.md) and
[Lab 001](book/labs/lab-001-first-safe-task-EN.md) provide the later local
practice boundary; neither is a substitute for the foundation.

The core and fixture remain `candidate / not_run`, and Labs remain
`draft / not_run`. These labels describe the evidence state; they do not claim
that a beginner can complete the route, learn it, or transfer it elsewhere.
Stop rather than improvise if the target, source, authority, acceptance check,
or no-side-effect boundary is missing.

## Start with a real outcome

| What you need now | Start here | Leave with |
|---|---|---|
| No project or coding background yet | [Five-minute LLM prompt practice](#optional-15-minute-warm-up-no-git-required) | One fictional message, three plain-language questions, and a visible example; use any chat model, no files, tools, account connection, or private data |
| Make a first reversible local change after the core | [GPT/Codex boundary chapter](book/chapters/01-gpt-and-codex-EN.md) → [First Safe Change](book/routes/first-safe-change-EN.md) | Needs a disposable project; leaves with one bounded task card, a small diff, a focused check, and an explicit unverified list |
| Need a safe local file before using a project | [First Safe Change fixture](book/routes/first-safe-change-EN.md) | One seeded README failure, one permitted README edit, and one local acceptance result; candidate · learner run `not_run` |
| See why prompts need checking | [Five-minute LLM prompt practice](#optional-15-minute-warm-up-no-git-required) | One fictional message, three plain-language questions, and a visible example; optional, not the local Codex path |
| Turn a vague request into something an Agent can execute | [Chapter 3 — task protocol](book/chapters/03-task-protocol-EN.md) + [Lab 002](book/labs/lab-002-task-protocol-EN.md) | Goal, context, constraints, acceptance, stop conditions, and failure handling |
| Turn a broad learning or research wish into a first attempt | [Beginner Practice Pack intake](book/communication-clinic-EN.md#first-practice-intake) | Ask one decision at a time, select one existing route, and leave with a bounded receipt; supplemental candidate · complete learner run `not_run` |
| Assess an AI idea that could affect other people | [Public-interest safety inquiry](book/communication-clinic-EN.md#public-interest-safety-route) | A fixed fictional case for decision ownership, affected people, input limits, recourse, evidence, and a stop receipt; candidate · `not_run` |
| Recover when the model answered the wrong task | [Post-failure recovery route](book/communication-clinic-EN.md#recovery-route) + [Communication Failure Triage Skill](skills/prysai-communication-failure-triage/SKILL.md) | Preserve the miss, change one communication condition, and record a comparable rerun without claiming a universal fix |
| Stop trusting “done” too early | [Chapter 9 — Verification, doubt, and recovery](book/chapters/09-verification-and-recovery-EN.md) + [Lab 003](book/labs/lab-003-evidence-review-EN.md) | A claim-to-evidence review that catches wrong files, missing tests, and scope gaps |
| Choose or design a Skill | [Skill registry](docs/skill-registry.md) + [Skill quality standard](docs/quality/skill-quality-standard.md) | A bounded Skill contract with triggers, exclusions, dependencies, rollback, and tests |
| Learn from failures people actually report | [Real-world problem index](docs/research/field-problems-index-2026-08-10.md) | A symptom, a safe first check, a narrower fallback, and an honest evidence level |
| Turn a personal method into team capability | [Chapter 21 — team capability system](book/chapters/21-team-capability-system-EN.md) + [Contribution model](docs/governance/contribution-model.md) | Ownership, sources, permissions, evaluation, maintenance, and rollback |

### If you already know your goal, do not take the intake

Choose **one** text-only starter card below. They are original candidate cards
for one low-risk attempt; they do not promise a result from a particular model
or product. Do not combine them, add private material, or turn a card into a
tool, browser, account, or external action without first setting a new boundary.

| I want to… | Start with this card | The card can help you make visible | It does not establish |
|---|---|---|---|
| complete a short typed Spanish exchange | [Six short Spanish practice messages](book/communication-clinic-EN.md#six-short-spanish-messages) | One fictional four-turn typed attempt, disclosed help, a learner revision, and an optional changed-case route. | Spoken conversation, pronunciation, listening ability, fluency, a language level, correct real-world wording, retention, or transfer. |
| complete a short typed French exchange | [Six short French practice messages](book/french-practice-loop-EN.md) | One fictional four-turn typed attempt, disclosed help, a learner revision, and an optional changed-case route. | Spoken conversation, pronunciation, listening ability, fluency, a language level, correct real-world wording, retention, or transfer. |
| practise one skill for a real situation | [Card B1 plus six short work-update messages](book/communication-clinic-EN.md#six-short-work-update-messages) | One small performance, allowed aids, visible criteria, a learner-authored revision, and a changed-audience attempt. | Improvement, job readiness, independent performance, or mastery. |
| prepare a reliable research check | [Six short research messages](book/communication-clinic-EN.md#six-short-research-messages) | One decision question, material-claim owners, an inspectable source record, and a stop rule before a conclusion. | Browsing, source access, citation validity, a recommendation, or complete research. |
| check an answer that looks cited | [Card D1 — source-record check](book/communication-clinic-EN.md#source-check-route) | One fictional claim, visible missing source fields, and a permitted next check or stop. | That a claim is true or false, that a source is valid, or that research is complete. |
| check whether a visible source list followed my rule | [Card C3 — source-set scope check](book/communication-clinic-EN.md#retrieval-scope-receipt) | A stated source-selection rule, a supplied-list boundary, one disposition per fictional source, and a stop reason. | Complete retrieval, source quality, a factual conclusion, product behavior, or research completion. |
| decide whether to share an AI answer or conversation | [Share Check](book/communication-clinic-EN.md#share-check) | A fictional item choice, audience boundary, smaller-excerpt decision, and stop condition before any link or message is created. | That a real recipient, product, link, or organization handles sharing safely. |

Each card has a fuller boundary, failure case, receipt, and follow-up below its
anchor. If you do not yet know which one fits, use the [Beginner Practice Pack
intake](book/communication-clinic-EN.md#first-practice-intake) instead; it
asks one question at a time and returns only one route.

The candidate first slice is deliberately small: complete the five core units,
keep the explanation card and first response, then choose one optional platform
route only when its authority, sources, and acceptance check are visible. Keep
the diff or response receipt and write down what the run did not prove. Its
time, completion, and learning effects have not been measured.

<!-- starter-task-contract:start -->

<a id="optional-15-minute-warm-up-no-git-required"></a>

## A five-minute LLM prompt practice — no setup required

This is not a Codex lab. It is a short way to see one important LLM behavior:
the model can make wording sound helpful while also adding details it was never
given. Use any chat model; no files, account connection, or technical setup is
needed.

```text
Please rewrite the message below so it is clear and friendly.

Keep every fact exactly the same. Do not add a date, place, reason, contact detail, or any other information that is not in the original.

Original message:
"The workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come."

Return only the rewritten message.
```

Now read the answer and ask three ordinary questions:

1. Does it still say **Friday at 10**?
2. Does it still ask people to **bring the draft** and **reply if they cannot come**?
3. Did it avoid adding a date, place, reason, or contact detail?

<details>
<summary>One acceptable result</summary>

One acceptable result is: “The workshop starts Friday at 10. Please bring your
draft. If you cannot attend, please reply.” Different wording is fine. The
facts and requested action are what matter.
</details>

Why this matters: an LLM predicts useful-sounding text. It does not
automatically know that missing details must remain unknown. A clear prompt and
a quick human check make that limit visible. This small illustration does not
prove learning, transfer, general writing ability, or model superiority.
Return to the [LLM Foundation Core](book/routes/llm-foundation-core-v1-EN.md)
before a platform task; the [Beginner Practice Pack](book/communication-clinic-EN.md#first-practice-intake)
is a separate supplemental route for language, research, or a small work task.

<!-- starter-task-contract:end -->

## Three ways in

| You want to… | Use this entry | What it is for |
|---|---|---|
| Run a local contributor preview | [`site/README.md`](site/README.md) | The showcase and dependency-free Reader are local contributor tools; the companion README explains local serving, Pages packaging, and verification |
| Read the book as a source-locale guide | [`book/README-EN.md`](book/README-EN.md) + [`book/table-of-contents-EN.md`](book/table-of-contents-EN.md) | The book contract, full route, chapter status, experiments, and research links |
| Inspect how the project is maintained | [`docs/governance/`](docs/governance/) + [`scripts/`](scripts/) | Canonical status, locale identity, update rules, and repeatable checks |
| Find a file quickly | [`Project map`](docs/project-map-EN.md) | Directory responsibilities, chapter order, generated files, and where each change starts |

The map is backed by the [canonical project structure contract](docs/governance/project-structure.yaml)
and short landing pages inside the major directories. Use the contract when
you are changing ownership, adding a directory, or deciding whether a file is
source or generated.

The Reader opens the LLM Foundation Core when entered without a path. It is a dependency-free
reading view over the Markdown sources, with a chapter list, current-page
outline, and previous/next controls. The public reading site is reachable at
[docs.prysai.com/llm-playbook](https://docs.prysai.com/llm-playbook/).
A successful artifact build or a reachable URL still does not prove search
indexing, reader acceptance, or release readiness.

## See the method produce an artifact

The visual layer is part of the lesson, but it never replaces evidence. Start
with two teaching cards, then follow one concept case from brief to context
draft to a locally rendered page. The images below are project-owned teaching
assets; the case is explicitly synthetic.

![From request to evidence](assets/teaching/task-to-evidence-red-black.svg)

[![Synthetic first-time buyer guide produced from a bounded Product Context handoff](assets/cases/product-context-real-estate-thumbnail.png)](assets/cases/product-context-real-estate-desktop.png)

Open the [teaching asset index](assets/teaching/README.md) for the model-choice,
Skill-output, evidence-lens, field-signal, and beginner-practice boards. They are
linked instead of stacked here because their small evidence labels must remain
readable at the intended viewing size.

The [real-estate sandbox](examples/skill-sandbox/product-context-real-estate/README-EN.md)
is a real local HTML/CSS result, captured at both desktop and 390px mobile
viewports. The screenshots prove rendering only; they do not pretend that the
Skill ran autonomously or that a fictional page has market impact.

Local concept rendering only; not a customer, market, inventory, conversion,
or production claim.

| Visual entry | What it demonstrates | Evidence boundary |
|---|---|---|
| [Model choice is a test](assets/teaching/model-choice-is-a-test.svg) | Compare a task, working condition, smoke test, and bounded decision | It does not establish a universal model ranking, cost, speed, stability, or account-wide availability |
| [Skill to observable output](assets/teaching/skill-to-observable-output.svg) | Trigger → input → method → inspectable artifact → four-case evaluation | A polished artifact is not proof that a Skill ran or that the method works everywhere |
| [Evidence and recovery ladder](assets/teaching/evidence-recovery-ladder.svg) | Claim strength, missing proof, and the smallest safe recovery action | A teaching model; it does not establish runtime, user acceptance, or production readiness |
| [Field signal to safe degradation](assets/teaching/field-signal-to-safe-degradation-red-black.svg) | Three dated public reports mapped to unsupported inferences and the smallest safe response | Snapshot accessed 2026-08-12; no local reproduction or public maintainer root-cause confirmation. See [S43 research record](docs/research/codex-field-cases-current-review-2026-08-12.md) for time-bounded issue metadata. |
| [Real-estate guide case](docs/research/skill-case-product-context-real-estate-2026-08-11.md) | Product Context draft → design handoff → static buyer guide → browser screenshots | Project-owned example; no customer, market, inventory, conversion, advice, or runtime claim |

The case is intentionally concrete: a fictional first-time buyer guide with a
visible synthetic-case warning, preparation checks, a six-stage decision table,
question prompts, and a contact action withheld because no real owner or privacy
authority exists. An earlier lifestyle landing page was rejected during review
for generic AI-associated visual patterns; the Skill contract and artifact were
then remediated together. The Product Context Skill was not run as an independent
live invocation, and the screenshots document local rendering only.

## Why this project exists

Many AI guides teach a command, a feature, or a prompt. Real work fails at the
seams between them:

- a model is mistaken for the product surface that hosts it;
- a Skill, tool, connector, or login name is treated as proof of access;
- a vague wish is given to an Agent without inputs, authority, acceptance, or
  a stop condition;
- too much context hides the important constraint, or untrusted text is
  allowed to act like project policy;
- an output is accepted without checking the actual file, test, source,
  browser state, permissions, or remaining work;
- a Skill is selected because it is popular or large rather than because its
  scope, license, dependencies, and verification cost fit the task; and
- a one-person trick is never turned into a versioned, reviewable team method.

This guide treats those failures as one connected operating problem. It does
not promise that a better sentence makes an unsafe workflow reliable.

## The mental model behind the book

The project explains the system at two levels: what can be observed and what
must not be guessed. A model generates from its available context; Codex adds
a work surface; tools expand what can be observed or changed; Skills provide
repeatable methods; an Agent loop coordinates multiple steps; evidence lets
another person inspect the completion claim.

| Layer | What it contributes | What it does not prove by itself |
|---|---|---|
| GPT / model | Generation and interpretation under a given context | File access, tool access, correctness, or completion |
| Codex surface | A product environment for project-aware work | That every tool, permission, or integration is enabled |
| Context | The goals, files, rules, sources, and feedback available to the task | That every supplied instruction is trustworthy or current |
| Tools | The ability to inspect or change files, terminals, browsers, Git, or services | That an action was necessary, safe, or successful |
| Skill | A reusable method with triggers, boundaries, and checks | A substitute for judgment, permissions, or licensing review |
| Agent | A bounded loop of observation, planning, action, feedback, retry, and stop | Hidden reasoning, unlimited authority, or reliable self-verification |
| Evidence | The material that supports a particular claim within a stated scope | Proof outside that scope or proof that was never collected |

The stable learning loop is:

```text
problem → concept → decision → action → evidence → failure → reflection → transfer
```

The practical Agent loop is:

```text
understand the context → choose an action → check the result →
recover, stop, or continue with a new checkpoint
```

The book teaches both loops together. One explains the mechanism; the other
turns it into work that can be inspected.

## The learning path

The path has seven levels. Each level asks for explanation, operation,
judgment, and review evidence. The labels describe the current evidence
state, not a marketing promise.

| Level | Capability | Primary route |
|---|---|---|
| **L0 · Observer** | Explain LLMs, tokens, context, prompts, tools, Skills, and Agents before attributing an outcome | [LLM Foundation Core](book/routes/llm-foundation-core-v1-EN.md) · [Unit 1](book/guides/llm-fundamentals-EN.md) |
| **L1 · Safe user** | Make one bounded request, inspect the response, and distinguish a correction from proof | [Core Unit 2](book/routes/llm-core-first-generation-EN.md) · [Core Unit 4](book/routes/llm-core-check-repair-EN.md) |
| **L2 · Task designer** | Turn a wish into a protocol with relevant context, least authority, acceptance, and failure handling | [Chapter 3](book/chapters/03-task-protocol-EN.md) · [Lab 002](book/labs/lab-002-task-protocol-EN.md) |
| **L3 · Workflow designer** | Run a complete workflow with stages, checkpoints, recovery, and delivery evidence | [Chapters 7–13 — English sources](book/table-of-contents-EN.md) · [Lab 013](book/labs/lab-013-l3-vertical-slice-EN.md) |
| **L4 · Capability builder** | Select, compose, install, and improve Skills and tools by fit, risk, license, and verification cost | [Chapters 11 and 14–18 — English sources](book/table-of-contents-EN.md) · [Skill registry](docs/skill-registry.md) |
| **L5 · Evidence reviewer** | Test completion claims with positive, boundary, failure, and transfer cases | [Chapter 19 — English source](book/chapters/19-evaluate-models-and-workflows-EN.md) · [Evaluation framework](docs/quality/evaluation-framework.md) |
| **L6 · Team coach** | Turn a personal method into a versioned team capability with ownership and rollback | [Chapters 20–22 — English sources](book/table-of-contents-EN.md) · [Contribution model](docs/governance/contribution-model.md) |

All 22 chapters and all 18 labs now have canonical `-EN` sources. The English
source path is complete; that does not supply runtime or independent-review
evidence for the labs.

## What a chapter, lab, or Skill must contain

The repository is built as a learning product, not a pile of pages. Before an
artifact can move through the maturity states, its contract should be visible.

### A chapter

- the real problem and learning objective;
- the smallest concept set needed to make a decision;
- a concrete action and a small experiment;
- an intentional failure or boundary case;
- acceptance evidence a reader can inspect;
- a transfer task in another domain;
- volatile facts with an authoritative source, access date, scope, owner, and
  next review; and
- an honest `draft`, `candidate`, `verified`, or `production-ready` status.

### A lab

- low-risk setup and a reversible starting point;
- explicit inputs, permissions, secrets, and external side effects;
- observable output such as a diff, log, screenshot, source record, or test;
- a failure variant and a stop condition; and
- a reflection that records what the run still cannot prove.

### A Skill

- trigger conditions and exclusions;
- input and output contract;
- decision points and dependencies;
- permission and licensing boundaries;
- failure handling, rollback, and maintenance owner; and
- positive, boundary, failure, and transfer evaluation cases.

## Evidence is part of the lesson

The project does not use “the response looked good” as a completion standard.
A meaningful capability needs four kinds of evidence:

| Evidence | Reader must be able to show |
|---|---|
| **Explanation** | The concept and its boundary in their own words |
| **Operation** | A real or low-risk run with the relevant artifact, diff, or log |
| **Judgment** | Why this model, tool, Skill, permission, and stop condition fit |
| **Review** | An error, risk, hallucination, stale fact, incomplete item, or unsupported claim they found |

Status vocabulary is deliberately conservative:

| Status | Meaning |
|---|---|
| `draft` | Still being written or below the minimum validation bar |
| `candidate` | Structure and basic checks exist; fresh execution or independent review is incomplete |
| `verified` | Positive, boundary, failure, and transfer evidence exists within the declared scope |
| `production-ready` | Verified plus safety, maintenance, version, license, and release gates |
| `not_run` | No execution log exists; it is not evidence of success |

## Repository map

The root README is the front door. The following layers are the actual
learning system behind it.

For the short answer to “where is the file I need?”, use the
[project map](docs/project-map-EN.md). It explains directory responsibilities,
the canonical chapter order, generated files, and the correct starting point
for common changes.

| Layer | Location | Stores | Why it matters |
|---|---|---|---|
| **Book** | [`book/`](book/) | Preface, chapters, table of contents, and labs | The coherent learning route |
| **Chapter order** | [`docs/governance/book-navigation.yaml`](docs/governance/book-navigation.yaml) | One ordered record for all 22 chapters and locale paths | Keeps chapter footers and future navigation adapters consistent |
| **English book entry** | [`book/README-EN.md`](book/README-EN.md) | Book contract, reading state, and locale policy | The book-level starting point |
| **Labs** | [`book/labs/`](book/labs/) | Low-risk, observable practice tasks | Turns concepts into inspectable action |
| **Skills** | [`skills/`](skills/) | Project-owned reusable methods | Encodes a method only after its boundaries are understood |
| **Skill registry** | [`docs/skill-registry.md`](docs/skill-registry.md) | Skill roles, triggers, and current status | Makes capability selection discoverable |
| **Evaluation** | [`evals/`](evals/) and [`docs/quality/`](docs/quality/) | Fixed tasks, quality standards, and review records | Tests whether the curriculum and Skills work |
| **Governance** | [`docs/governance/`](docs/governance/) and [`docs/adr/`](docs/adr/) | Ownership, sources, status, locale identity, updates, and decisions | Keeps a changing system maintainable |
| **Research** | [`docs/research/`](docs/research/) | Official fact cards and real-world problem reports | Connects stable principles to current reality |
| **Visual showcase** | [`site/`](site/) | A candidate visual learning-path surface | Gives readers a browsable overview at [docs.prysai.com/llm-playbook](https://docs.prysai.com/llm-playbook/); reader acceptance and rollback evidence remain pending |
| **Checks** | [`scripts/`](scripts/) | Link, localization, status, content, and archive validators | Converts project rules into repeatable evidence |

The visual showcase and the repository are complementary: the public site
helps a reader choose a route; the repository keeps source, evidence, history,
and governance visible. Public access does not change the curriculum's
`candidate` status or establish search indexing, learner outcomes, or rollback
readiness.

## Real-world problems, handled honestly

The research layer looks at the problems people report in GitHub Issues,
Stack Overflow, Reddit, and other public discussions, then compares those
reports with first-party documentation and local checks where possible. It
does not turn a forum answer into an official root cause.

Each case is classified as one or more of:

1. **Official fact** — owned by a first-party documentation source;
2. **User report** — what a person publicly observed;
3. **Community suggestion** — a workaround or hypothesis from discussion;
4. **Local reproduction** — what this project actually ran in a declared
   environment; or
5. **Project inference** — an original conclusion that remains bounded by the
   available evidence.

Start with the [real-world problem index](docs/research/field-problems-index-2026-08-10.md),
the [Codex problem research](docs/research/field-problems-codex.md), and the
[coding-agent field cases](docs/research/field-problems-coding-agents-2026-08-10.md).
For one current, fully bounded slice, open the
[three-case live review](docs/research/codex-field-cases-current-review-2026-08-12.md)
and its worktree, hidden-output, and scope-expansion case cards. They preserve
the distinction between a user report, an official product boundary, a project
teaching inference, and a scenario not reproduced locally.
For task design, read [prompt patterns for real work](docs/research/prompt-patterns-for-real-work-2026-08-10.md)
and the [official Codex fact cards](docs/research/codex-official-fact-cards-2026-08-10.md).
The [README front-door benchmark](docs/research/README-front-door-benchmark-2026-08-10.md)
and [multilingual architecture review](docs/research/multilingual-architecture-round2-2026-08-10.md)
explain the separation between the GitHub facade, the reading site, source files,
and translation status. The [source and license register](docs/sources/asset-register.md)
records what can be used as research, what can be adapted, and what must not be copied.

## Current state

This is a transparent snapshot as of **2026-08-16**. Counts describe the
repository; they do not describe learning outcomes.

| Area | Current state | What the state means |
|---|---|---|
| Project | `candidate` | The product skeleton and core contracts exist; broad independent evidence is still being built |
| Chapters | 22 structured chapters · `candidate` | Canonical English sources exist, but runtime exercises and broad independent review remain incomplete |
| Labs | 18 labs · `draft` · `run_status: not_run` | The contracts exist; the repository does not claim that every lab has been freshly executed |
| Skills | 25 project Skills · `candidate` | Structural checks pass; fresh-context evidence is partial and remains visible in the registry |
| Evaluation fixtures | 40 fixtures · `candidate` · `not_run` | The task set is defined; model execution logs are not being implied |
| Public showcase | `candidate`, publicly reachable | Six localized entry URLs are deployed; indexing, reader acceptance, deployment evidence, and rollback remain unproven |
| Locale rollout | EN source plus five candidate translations in progress | Every locale has 40 / 40 chapter-and-Lab files and same-locale routes; independent language review and supplemental-material coverage remain incomplete |

The [current status source](docs/governance/content-status.yaml) is authoritative
for evidence-backed maturity. The [current-state review](docs/quality/current-state-review-2026-08-09.md)
explains the gaps behind the labels.

The [current quality register](docs/quality/quality-register.md) is generated
from a machine-readable defect source. Active P0/P1 items block `verified`, and
any active item blocks `production-ready`; CI checks that this release claim
continues to match the ledger.

The quality workflow uploads a commit-bound release evidence packet with the
exact SHA, named gate dimensions, command logs, active blockers, freshness,
rollback boundary, and known blind spots. It remains a workflow artifact
because a checked-in file cannot truthfully contain the SHA of its own commit.

A separate scheduled audit checks the allowlisted first-party URLs behind the
fact registry. It reports categorized transport findings without pretending
that HTTP reachability is a semantic source review.

## English first, with explicit language identity

English is the default public language and the first development priority.
Every reader-facing localized file, including an English source, carries an
explicit suffix: `-EN`, `-ZH`, `-ES`, `-JA`, `-KO`, or `-DE`.

| Reader entry | Role | Current truth |
|---|---|---|
| `README.md` | GitHub's default English facade | English content, marked `EN`, with the same language switcher |
| `README-EN.md` | Canonical English source | Source file for the project entry |
| `README-ZH.md` | Simplified Chinese entry | Translation slice; independent language review pending |
| `README-ES.md` | Spanish entry | Translation slice; independent language review pending |
| `README-JA.md` | Japanese entry | Translation slice; independent language review pending |
| `README-KO.md` | Korean entry | Translation slice; independent language review pending |
| `README-DE.md` | German entry | Translation slice; independent language review pending |

`README.md` is intentionally English because GitHub uses it as the default
repository face. It is not a second independent English translation:
`README-EN.md` remains the canonical source. “Stay aligned” means that the
language switcher, status wording, locale rules, canonical routes, and key
project facts agree; the root facade is intentionally shorter than this
source, so it does not duplicate every paragraph.
The naming, content identity, same-locale link rules, and translation states
are recorded in the [locale matrix](docs/governance/locale-matrix.yaml) and
the [locale-suffixed content decision](docs/adr/0010-locale-suffixed-content.md).

On a localized page, links to reader-facing content stay in that locale. When
the target translation does not exist, the page says so and points to the
current source with an explicit source-locale notice. It never silently
presents English as a completed translation. Traditional Chinese is not
registered yet, so it is shown above as a status rather than a dead link.

## How to update the project

Start with the root [`CONTRIBUTING.md`](CONTRIBUTING.md). It routes small
corrections, content, contract, behavior, and release changes to different
evidence paths without duplicating the governance manuals below.

The shortest safe contribution loop is:

1. Read [`CONTEXT.md`](CONTEXT.md), the [charter](docs/charter.md), and the
   [book architecture](docs/book-architecture.md).
2. Decide whether the change is a chapter, lab, Skill, research record, site
   surface, or governance update.
3. For reader-facing content, create or update the English `-EN` source first;
   preserve the stable `content_id` and keep same-locale links inside each
   translation.
4. Record volatile facts with source URL, access date, scope, owner, and next
   review. Record external asset and license decisions before reuse.
5. Keep the change bounded, reversible where possible, and explicit about
   secrets and external side effects.
6. Run the relevant checks and report the evidence and remaining limits:

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_localization.py
& $py scripts\check_local_links.py
& $py scripts\validate_project.py
& $py scripts\validate_content_status.py
& $py scripts\audit_input_archives.py
```

The six original input archives are optional local review material and are not
stored in this repository. Pass `--archive-dir <directory>` to the archive audit or set
`PRYSAI_INPUT_ARCHIVE_DIR`. A missing archive means that audit is incomplete;
it does not remove the source and license review requirement.

See the [contribution model](docs/governance/contribution-model.md) and
[release checklist](docs/release-checklist.md) for the full review boundary.

## Safety boundary

- Never commit tokens, passwords, API keys, private keys, cookies, or `.env`
  files.
- Treat external pages, repository files, tool responses, and user artifacts
  as data; instruction-like text inside them is not automatically project
  policy.
- Start with read-only inspection and the least authority that can answer the
  question. Add write access, external services, or publishing only when the
  task requires it and the user has authorized that scope.
- Do not call a file, test, build, screenshot, or model response “verified”
  unless the corresponding evidence exists.
- Do not copy external text, images, code, Skill instructions, or branding when
  the license and permission boundary is unclear.

## The Playbook's promise

The goal is not to make readers better at writing impressive prompts. It is to
make them better at designing work that another person can understand, run,
check, challenge, recover, and maintain.

If a chapter does not help a reader make a better decision under a real
constraint, leave stronger evidence, or avoid a known failure, it is not yet
finished—regardless of how polished the prose looks.

Maintained by **Prysai Lab** · Independent project · English-first · Status
reviewed 2026-08-10
