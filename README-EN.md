<!-- content_id: project-readme | locale: EN | language: en | default_locale: EN | translation_status: source | canonical_source: README-EN.md -->

<p align="center">
  <img src="assets/readme/codex-field-guide-header.svg" alt="Codex: From First Task to Real Work — from problem to evidence" width="100%">
</p>

# Codex: From First Task to Real Work

> An English-first, evidence-led field guide for turning GPT and Codex from a
> clever answer generator into a dependable way to do real work.

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

> **Project status:** `candidate` · **Default locale:** English · **Scope:**
> book, labs, Skills, research, evaluation, and team practice

## The short version

This repository is a book-shaped learning and practice system for GPT,
Codex, models, context, tools, Skills, Agents, verification, and team
adoption. It is designed for people who need useful results under real
constraints: incomplete requirements, unfamiliar repositories, changing
products, limited permissions, deadlines, and outputs that can look finished
before they are actually checked.

The central promise is simple:

> Do not stop at a plausible output. Define the task, choose the smallest
> useful capability, act within a visible boundary, preserve the evidence, and
> say exactly what remains unverified.

This is an independent curriculum and field guide. It is not OpenAI's
official documentation, an official Codex product page, or a catalogue of
copied prompts and Skills.

## Start with a real outcome

| What you need now | Start here | Leave with |
|---|---|---|
| Understand what GPT, Codex, tools, Skills, and Agents actually are | [Chapter 1 — Understand GPT before Codex](book/chapters/01-gpt-and-codex-EN.md) + [Lab 011](book/labs/lab-011-gpt-codex-boundaries-EN.md) | A usable mental model and a list of claims you refuse to infer without evidence |
| Complete a first task safely | [Chapter 2 EN source](book/chapters/02-first-safe-task-EN.md) + [Lab 001 EN source](book/labs/lab-001-first-safe-task-EN.md) | One small, reversible diff, a focused check, and an explicit unverified list |
| Turn a vague request into something an Agent can execute | [Chapter 3 — task protocol](book/chapters/03-task-protocol-EN.md) + [Lab 002](book/labs/lab-002-task-protocol-EN.md) | Goal, context, constraints, acceptance, stop conditions, and failure handling |
| Stop trusting “done” too early | [Verification and recovery — English migration pending](book/chapters/09-verification-and-recovery.md) + [Lab 003 — English migration pending — current source](book/labs/lab-003-evidence-review.md) | A claim-to-evidence review that catches wrong files, missing tests, and scope gaps |
| Choose or design a Skill | [Skill registry](docs/skill-registry.md) + [Skill quality standard](docs/quality/skill-quality-standard.md) | A bounded Skill contract with triggers, exclusions, dependencies, rollback, and tests |
| Learn from failures people actually report | [Real-world problem index](docs/research/field-problems-index-2026-08-10.md) | A symptom, a safe first check, a narrower fallback, and an honest evidence level |
| Turn a personal method into team capability | [Team capability system — English migration pending](book/chapters/21-team-capability-system.md) + [Contribution model](docs/governance/contribution-model.md) | Ownership, sources, permissions, evaluation, maintenance, and rollback |

The most useful first slice is deliberately small: read Chapter 2, run Lab
001 in a sandbox, keep the diff and command output, then write down what the
run did not prove. That 30-minute exercise teaches more than collecting a
large prompt library.

## Three ways in

| You want to… | Use this entry | What it is for |
|---|---|---|
| Browse the learning experience | [`site/index.html`](site/index.html) + [`site/README.md`](site/README.md) | The visual showcase; the companion README explains local serving and verification |
| Read the book as a source-locale guide | [`book/README-EN.md`](book/README-EN.md) + [`book/table-of-contents-EN.md`](book/table-of-contents-EN.md) | The book contract, full route, chapter status, experiments, and research links |
| Inspect how the project is maintained | [`docs/governance/`](docs/governance/) + [`scripts/`](scripts/) | Canonical status, locale identity, update rules, and repeatable checks |

## See the method produce an artifact

The visual layer is part of the lesson, but it never replaces evidence. Start
with two teaching cards, then follow one concept case from
brief to context draft to a locally rendered page:

| Visual entry | What it demonstrates | Evidence boundary |
|---|---|---|
| [Model choice is a test](assets/teaching/model-choice-is-a-test.svg) | Compare a task, working condition, smoke test, and bounded decision | It does not establish a universal model ranking, cost, speed, stability, or account-wide availability |
| [Skill to observable output](assets/teaching/skill-to-observable-output.svg) | Trigger → input → method → inspectable artifact → four-case evaluation | A polished artifact is not proof that a Skill ran or that the method works everywhere |
| [Real-estate concept case](docs/research/skill-case-product-context-real-estate-2026-08-11.md) | Product Context draft → static landing page → browser screenshot | Project-owned example; no customer, market, inventory, conversion, or runtime claim |

The case is intentionally concrete: a fictional buyer-first brokerage page with
a sample property card, a visible `CONCEPT PAGE / NO LIVE LISTINGS` label, and a panel
that says what the screenshot can and cannot prove. The Product Context Skill
was not run as an independent live invocation; the page is a project-owned
implementation based on the Skill contract, and the screenshot documents its
local rendering only.

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
| **L0 · Observer** | Separate GPT, models, Codex, context, tools, Skills, and Agents before attributing an outcome | [Chapter 1](book/chapters/01-gpt-and-codex-EN.md) · [Lab 011](book/labs/lab-011-gpt-codex-boundaries-EN.md) |
| **L1 · Safe user** | Complete a reversible, observable task and distinguish a diff from proof | [Chapter 2 EN source](book/chapters/02-first-safe-task-EN.md) · [Lab 001 EN source](book/labs/lab-001-first-safe-task-EN.md) |
| **L2 · Task designer** | Turn a wish into a protocol with relevant context, least authority, acceptance, and failure handling | [Chapter 3](book/chapters/03-task-protocol-EN.md) · [Lab 002](book/labs/lab-002-task-protocol-EN.md) |
| **L3 · Workflow designer** | Run a complete workflow with stages, checkpoints, recovery, and delivery evidence | [Chapters 7–13 — Chapter 7 EN source; Chapters 8–13 migration pending](book/table-of-contents-EN.md) · [Lab 013 — English migration pending — current source](book/labs/lab-013-l3-vertical-slice.md) |
| **L4 · Capability builder** | Select, compose, install, and improve Skills and tools by fit, risk, license, and verification cost | [Skill registry](docs/skill-registry.md) · [Chapter 11 — migration pending](book/chapters/11-designing-a-skill.md) |
| **L5 · Evidence reviewer** | Test completion claims with positive, boundary, failure, and transfer cases | [Evaluation framework](docs/quality/evaluation-framework.md) · [Chapter 19 — migration pending](book/chapters/19-evaluate-models-and-workflows.md) |
| **L6 · Team coach** | Turn a personal method into a versioned team capability with ownership and rollback | [Chapter 20–22 — migration pending](book/table-of-contents-EN.md) · [Contribution model](docs/governance/contribution-model.md) |

“Migration pending” remains explicit wherever an English source has not yet
 been authored. Chapters 1–7 and Labs 001–002, 007, and 011 now have canonical
`-EN` sources; the remaining unsuffixed links in this README are deliberately
labelled as migration paths until their English files exist.

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

| Layer | Location | Stores | Why it matters |
|---|---|---|---|
| **Book** | [`book/`](book/) | Preface, chapters, table of contents, and labs | The coherent learning route |
| **English book entry** | [`book/README-EN.md`](book/README-EN.md) | Book contract, reading state, and locale policy | The book-level starting point |
| **Labs** | [`book/labs/`](book/labs/) | Low-risk, observable practice tasks | Turns concepts into inspectable action |
| **Skills** | [`skills/`](skills/) | Project-owned reusable methods | Encodes a method only after its boundaries are understood |
| **Skill registry** | [`docs/skill-registry.md`](docs/skill-registry.md) | Skill roles, triggers, and current status | Makes capability selection discoverable |
| **Evaluation** | [`evals/`](evals/) and [`docs/quality/`](docs/quality/) | Fixed tasks, quality standards, and review records | Tests whether the curriculum and Skills work |
| **Governance** | [`docs/governance/`](docs/governance/) and [`docs/adr/`](docs/adr/) | Ownership, sources, status, locale identity, updates, and decisions | Keeps a changing system maintainable |
| **Research** | [`docs/research/`](docs/research/) | Official fact cards and real-world problem reports | Connects stable principles to current reality |
| **Public showcase** | [`site/`](site/) | A separate visual learning-path surface | Gives readers a browsable overview |
| **Checks** | [`scripts/`](scripts/) | Link, localization, status, content, and archive validators | Converts project rules into repeatable evidence |

The public showcase and the repository are complementary: the site helps a
reader choose a route; the repository keeps the source, evidence, history,
and governance visible.

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
For task design, read [prompt patterns for real work](docs/research/prompt-patterns-for-real-work-2026-08-10.md)
and the [official Codex fact cards](docs/research/codex-official-fact-cards-2026-08-10.md).
The [README front-door benchmark](docs/research/README-front-door-benchmark-2026-08-10.md)
and [multilingual architecture review](docs/research/multilingual-architecture-round2-2026-08-10.md)
explain the separation between the GitHub facade, the reading site, source files,
and translation status. The [source and license register](docs/sources/asset-register.md)
records what can be used as research, what can be adapted, and what must not be copied.

## Current state

This is a transparent snapshot as of **2026-08-10**. Counts describe the
repository; they do not describe learning outcomes.

| Area | Current state | What the state means |
|---|---|---|
| Project | `candidate` | The product skeleton and core contracts exist; broad independent evidence is still being built |
| Chapters | 22 structured chapters · `candidate` | The corpus is substantial, but most chapter bodies still need English source migration and fresh review |
| Labs | 13 labs · `draft` · `run_status: not_run` | The contracts exist; the repository does not claim that every lab has been freshly executed |
| Skills | 7 project Skills · `candidate` | Structural checks pass; fresh-context evidence is partial and remains visible in the registry |
| Evaluation fixtures | 39 fixtures · `candidate` · `not_run` | The task set is defined; model execution logs are not being implied |
| Public showcase | `candidate` | English default and Chinese runtime toggle are implemented; broader visual and locale coverage remains work |
| Locale rollout | EN source plus five translation entries in progress | Six entry locales are registered; the whole book is not yet six-language complete |

The [current status source](docs/governance/content-status.yaml) is authoritative
for evidence-backed maturity. The [current-state review](docs/quality/current-state-review-2026-08-09.md)
explains the gaps behind the labels.

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
current source with an explicit migration notice. It never silently presents
English as a completed translation. Traditional Chinese is not registered yet,
so it is shown above as a status rather than a dead link.

## How to update the project

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
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_localization.py
& $py scripts\check_local_links.py
& $py scripts\validate_project.py
& $py scripts\validate_content_status.py
& $py scripts\audit_input_archives.py
```

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

## The promise of this field guide

The goal is not to make readers better at writing impressive prompts. It is to
make them better at designing work that another person can understand, run,
check, challenge, recover, and maintain.

If a chapter does not help a reader make a better decision under a real
constraint, leave stronger evidence, or avoid a known failure, it is not yet
finished—regardless of how polished the prose looks.

Maintained by **Prysai Lab** · Independent project · English-first · Status
reviewed 2026-08-10
