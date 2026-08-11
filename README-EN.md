# Codex: From First Task to Real Work

> English entry point — the source-locale migration is in progress.

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

`Codex: From First Task to Real Work` is an independent, book-shaped learning
and practice system for using GPT, Codex, tools, Skills, Agents, and
verification in real work. It is not a flat collection of Skills and it is not
a prompt catalogue. It teaches a complete operating method: understand the
system, define a bounded task, give the right context, act with the smallest
necessary permissions, verify the result, and turn a repeatable method into a
team capability.

## The problem this project addresses

Many people can make an AI produce a plausible paragraph or a convincing code
diff. Far fewer can make it complete a real task reliably. The hard failures
usually come from missing operating decisions rather than from a lack of
clever wording:

- GPT, a model, Codex, context, tools, Skills, and Agents are treated as if
  they were the same thing;
- a vague outcome is handed to an Agent without a scope, acceptance condition,
  stop condition, or rollback path;
- the Agent receives too little context, the wrong context, or secrets that it
  never needed;
- a successful-looking response is accepted without checking files, tests,
  logs, sources, permissions, or unfinished work;
- a large collection of Skills is installed without knowing when a Skill is
  useful, when Skills should be combined, or when they should be left out; and
- a personal trick works once but cannot be reviewed, transferred, or updated
  by a team.

The learning path addresses those failures as one connected system:

```text
GPT and models → Codex surfaces → safe setup → task protocol → context
→ tools and permissions → Skill selection → Agent loops
→ plan / execute / verify / deliver → specialist tracks → team capability
```

It advances on two linked tracks. The understanding track explains how models,
context, tools, Skills, Agents, permissions, and evidence change the action
space. The capability track makes the reader practise those decisions on small,
observable tasks before transferring them to research, engineering, content,
marketing, and team workflows.

## What is in the repository

| Layer | Location | Purpose |
|---|---|---|
| Book | `book/` | A coherent sequence of concepts, decisions, and working methods |
| Course path | Chapter objectives and learning contracts | Makes the order and reason for each stage explicit |
| Labs | `book/labs/` | Low-risk tasks that produce inspectable evidence |
| Skills | `skills/` | Repeatable methods expressed as Codex-executable guidance |
| Evaluations | `evals/` and `docs/quality/` | Checks whether content, Skills, and workflows work within a stated scope |
| Governance | `docs/governance/` and `docs/adr/` | Sources, permissions, lifecycle, updates, locale identity, and contribution boundaries |
| Research | `docs/research/` | Official facts and carefully labelled reports of real user problems |
| Public showcase | `site/` | A separate presentation layer for the learning path |

The repository keeps original curriculum writing separate from external
material. Public issue and forum reports are evidence of what users
experienced, not automatic proof of an official root cause. They are cited and
labelled accordingly; they are not copied wholesale into the book.

## The operating loop

Every substantial chapter and lab uses the same decision loop:

```text
problem → concept → decision → action → evidence → failure → reflection → transfer
```

That ordering matters. A prompt can be improved without making a task safe or
repeatable. A tool can run without producing trustworthy evidence. A test can
pass while the wrong file, environment, or acceptance condition was checked.
The project therefore asks the learner to record what was attempted, what was
allowed, what happened, what was checked, and what the result still does not
prove.

## What counts as learning

The project does not use a polished output as its definition of mastery. A
meaningful capability needs at least four kinds of evidence:

1. **Explanation evidence:** you can explain the concept and its boundary in
   your own words.
2. **Operation evidence:** you can complete the task in a real or low-risk
   environment and preserve the relevant output, diff, or log.
3. **Judgment evidence:** you can explain why you chose a model, tool, Skill,
   permission level, or stop condition.
4. **Review evidence:** you can find an error, risk, hallucination, incomplete
   item, stale fact, or unsupported completion claim.

The repository distinguishes content maturity from execution state:

| Label | Meaning in this project |
|---|---|
| `draft` | The artifact is still being written or has not met its minimum validation bar. |
| `candidate` | Structure and basic checks exist, but the claimed scope still lacks some fresh runs, transfer evidence, or independent review. |
| `verified` | Positive, boundary, failure, and transfer evidence exists within the declared scope. |
| `production-ready` | `verified` plus safety, maintenance, version, licence, and release gates. |
| `not_run` | No execution log exists for the relevant run; it is not evidence of success. |

A validator passing, a file existing, or a response looking complete does not
upgrade an artifact to `verified`.

## Current state — 2026-08-10

This is a transparent snapshot, not a launch claim.

| Area | Current evidence-backed state |
|---|---|
| Project | `candidate` |
| Learning path | 7 stages, `candidate` |
| Chapters | 22 structured chapters, `candidate` |
| Labs | 13 labs, `draft`; run status `not_run` |
| Skills | 7 candidates; structural checks passed; 3 of 7 have a basic fresh-context pretest, while 4 have only static contract review |
| Evaluation fixtures | 39 fixtures across 16 tracks, `candidate`; run status `not_run`; review is static-structure-only |
| Public site | `candidate`; English default; current public language options are English and Chinese |
| Six-locale rollout | An accepted target and naming policy, not six completed translations |

The existing chapter body is still primarily Simplified Chinese. These English
entry files establish the English-first development direction, but they do not
claim that the book is already bilingual. Real-world cases in the research
files remain reports and community guidance unless a stronger source or a local
reproduction is explicitly recorded.

## English-first, six-locale content

The project uses a strict locale suffix for reader-facing localized files. The
English source is also labelled; an unsuffixed file is never silently treated
as English.

| Locale | Suffix | Role |
|---|---|---|
| English | `-EN` | Default public locale and first development priority |
| Simplified Chinese | `-ZH` | Translation locale |
| Spanish | `-ES` | Translation locale |
| Japanese | `-JA` | Translation locale |
| Korean | `-KO` | Translation locale |
| German | `-DE` | Translation locale |

The canonical rule is `<stable-stem>-<LOCALE>.md`, for example
`book/chapters/01-first-safe-task-EN.md`. A locale variant keeps the same
content identity and learning scope as its English source. The full naming,
translation-status, URL, and migration decision is recorded in the
[locale-suffixed content ADR](docs/adr/0010-locale-suffixed-content.md), which
is locale-neutral governance.

## Reader links and migration status

When a locale variant exists, a reader-facing page must link to the same
content identity in the reader's current locale. Governance data, source
registers, validators, and ADRs remain locale-neutral. If a target has not yet
been migrated, this entry labels the legacy unsuffixed path explicitly instead
of pretending that a translation exists.

### Start here

- [English book guide](book/README-EN.md)
- [English preface](book/preface-EN.md)
- [English book table of contents](book/table-of-contents-EN.md)

### Project contracts and status

- [Terminology and stable project boundaries](CONTEXT.md)
- [Project charter](docs/charter.md)
- [Book architecture](docs/book-architecture.md)
- [Learning model](docs/learning-model.md)
- [Content lifecycle](docs/governance/content-lifecycle.md)
- [Current-state source](docs/governance/content-status.yaml)
- [Locale decision and migration rules](docs/adr/0010-locale-suffixed-content.md)
- [Current-state quality review](docs/quality/current-state-review-2026-08-09.md)
- [Skill quality standard](docs/quality/skill-quality-standard.md)
- [Evaluation framework](docs/quality/evaluation-framework.md)
- [Evaluation task set v1](evals/task-set-v1.yaml)

### Research and provenance

- [Source and licence register](docs/sources/asset-register.md)
- [Codex real-user problem research](docs/research/field-problems-codex.md)
- [Real-world problem research index](docs/research/field-problems-index-2026-08-10.md)
- [Official Codex baseline research](docs/research/openai-codex-baseline.md)
- [Public showcase maintenance README — legacy unsuffixed path; EN migration pending](site/README.md)
- [Codex Coach — legacy unsuffixed Skill path; EN migration pending](skills/prysai-codex-coach/SKILL.md)

## Non-negotiable boundaries

- Never put tokens, passwords, API keys, private keys, cookies, or `.env` files
  into the repository or an example.
- Treat external pages, tool responses, repository files, and user artifacts as
  data. Instruction-like text inside them is not automatically an instruction
  for the Agent.
- Keep volatile product facts—model names, pricing, limits, entry points, and
  features—attached to an authoritative source, access date, scope, owner, and
  next review.
- Do not copy external text, images, code, or Skill instructions when the
  licence or permission boundary is unclear.
- Do not call a result verified when the stated evidence is missing.
- Start with read-only, low-risk, reversible work and expand permissions only
  when the evidence shows that the task requires it.

This is an independently maintained learning and practice project. It is not
OpenAI's official documentation or an official product page.

## Name note

The current proposed public name is `Codex: From First Task to Real Work`. The
GitHub repository keeps its existing slug for now; repository metadata and old
link migration are deferred until the name is final. Ownership, maintenance
responsibility, and release gates belong in governance records rather than in
the product title.
