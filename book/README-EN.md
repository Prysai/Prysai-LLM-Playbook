# Prysai LLM Playbook: Book Guide

> English source-locale entry point. All 22 chapter identities now have
> authored `-EN` sources, as do all 18 labs. No lab or reader route is claimed
> as runtime-verified until its evidence record exists.

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

This directory contains the original main-line book for the `Prysai LLM
Playbook`. Its stable collaboration method is intended to transfer
across language-model tools; Codex is the deepest current worked track, not a
claim that every platform behaves identically. The book is arranged around the
learner's growth, not assembled as a collection of unrelated external
projects. It explains the ideas, then makes the reader exercise the decisions
that make those ideas reliable in real work.

## Before you choose a chapter

You do not need to understand the entire LLM landscape before starting. Pick
the problem closest to your current situation, and let the later chapters fill
in the vocabulary when it becomes useful. If you have never made a safe local
change, take the Codex path from Chapter 1. If you do not have a disposable
project, use **First Safe Change** before Lab 001. If your task is not about
Codex, begin with the [Universal LLM first-task route](routes/universal-core-foundations-EN.md):
one fictional, text-only rewrite with a visible check and stop point. Then
stop at its stated boundary until a source-backed platform adapter exists.

The aim is not to make you sound fluent in product names. It is to help you
make one decision you can explain, inspect, and improve.

## The contract for every chapter

Before a chapter belongs in the main learning path, it should make all of the
following visible:

- a learning objective;
- the concepts needed to make the decision;
- a smallest useful experiment;
- an intentional failure or boundary case;
- a transfer task in another context;
- acceptance evidence a reader can actually inspect;
- current facts with their sources and review scope; and
- a maturity and update status that does not overstate the evidence.

The minimum content bar is defined by the
[evaluation framework](../docs/quality/evaluation-framework.md). A chapter
outline, a passing structural checker, or a good-looking generated answer is
not enough to call the chapter verified.

## Current reading state

The repository currently contains 22 structured chapters. Their recorded
content status is `candidate`. Chapters 19–22 have drafts, but their status is
still “draft written, fresh pretest pending.” That distinction is deliberate:
the files exist, yet the required execution and review evidence is not complete.

The evaluation fixture set contains 39 fixed tasks across 16 tracks. It is
`candidate`, its run status is `not_run`, and its review is static-structure-only
until model execution logs exist. The lab collection contains 18 labs, each
currently `draft` with `run_status: not_run`.

## Where to enter the book

- [Universal LLM first-task route](routes/universal-core-foundations-EN.md) — begin with one fictional, text-only rewrite; then learn four transferable foundations. `candidate / not_run`; it does not establish cross-platform behavior or learner outcomes.
- [First Safe Change](routes/first-safe-change-EN.md) — optional offline bridge from Chapter 2 to Lab 001; candidate fixture route · learner run `not_run`
- [Preface: This Is Not a Prompt Catalogue](preface-EN.md)
- [English book table of contents](table-of-contents-EN.md)
- [Beginner Practice Pack: turn a broad wish into one practical route for learning, research, decisions, or creation](communication-clinic-EN.md#first-practice-intake) — supplemental candidate; complete learner run `not_run`; an intake, templates, and evidence contracts exist
- [Six short Spanish practice messages](communication-clinic-EN.md#six-short-spanish-messages) — immediate text-only entry; six original prompts for one fictional four-turn typed exchange, not a fluency or retention claim
- [Six short research messages](communication-clinic-EN.md#six-short-research-messages) — immediate text-only entry; six original prompts for a source-supported decision check, not a browsing or research-completion claim
- [Source-set scope check](communication-clinic-EN.md#retrieval-scope-receipt) — immediate text-only entry; three original prompts that label a supplied fictional source list against an explicit rule, not a complete-retrieval or source-quality claim
- [Share Check](communication-clinic-EN.md#share-check) — immediate text-only entry; three original prompts that choose a smaller fictional item to share or stop before any link, upload, or message is created
- [Project map — where chapters, labs, Skills, research, and checks live](../docs/project-map-EN.md)
- [Canonical chapter navigation source](../docs/governance/book-navigation.yaml)
- [Evaluation framework — locale-neutral governance](../docs/quality/evaluation-framework.md)
- [Luna model evaluation — locale-neutral research](../docs/model-evaluation-luna.md)
- [OpenAI/Codex baseline research — locale-neutral research](../docs/research/openai-codex-baseline.md)
- [Real-user problem research index — locale-neutral research](../docs/research/field-problems-index-2026-08-10.md)

The English table-of-contents entry now exists as `table-of-contents-EN.md`.
English chapter sources cover Chapters 1–22, and all 18 labs have canonical
English sources. Their `draft / not_run` status remains unchanged.

The current canonical examples are [Chapter 12](chapters/12-agent-loop-and-stop-EN.md)
and [Lab 006](labs/lab-006-agent-stop-conditions-EN.md), which show the
state, stop-condition, recovery, and handoff model used by the later learning
path.

## The learning path

The book develops two abilities at the same time.

**Understand the system.** Start with GPT and models. Then examine how Codex
connects a model to a project, files, a terminal, a browser, GitHub, and
external services. The later chapters make context, tools, Skills, Plugins,
Connectors, MCP, Agents, and permissions concrete rather than interchangeable
labels.

**Operate the system.** Begin with a bounded, low-risk task. Practise stating
the task, selecting context, planning, executing, verifying, reviewing, and
delivering. Then choose or design Skills, compare models and workflows, build a
personal operating system, and turn a proven method into a team-readable
capability package.

The two tracks are intentionally coupled. Theory without a run becomes
vocabulary. Tool use without boundary awareness turns an accidental success
into an unreliable habit.

## The chapter loop

Each chapter follows a repeatable sequence:

```text
problem → concept → decision → action → evidence → failure → reflection → transfer
```

The “experiment” in a chapter is a task for the reader, not a promise that the
author has run every possible environment. It may ask for a result, diff, log,
source record, screenshot, or retrospective. The requested evidence is part of
the lesson: it teaches the reader how to tell “the output looks finished” from
“the claimed work was actually checked.”

## How the book uses real problems

The research layer collects public reports and community experience around
authentication, provider configuration, worktrees, cloud surfaces, network
allowlists, updater behaviour, and other Codex workflows. These cases are used
to sharpen a decision boundary or failure exercise. A report is not silently
rewritten as an official root cause, and a community workaround is not
presented as a supported product fix. Each case keeps its source, date, evidence
level, and local-reproduction status visible.

That makes the book useful in the way a practical playbook should be useful: it gives
the reader a symptom to recognise, a safe first check, a narrower fallback, and
a clear statement of what remains unknown.

## What a reader must be able to show

To claim that a capability has been learned, the reader should be able to:

1. explain the concept and its boundary without copying a definition;
2. complete the task in a real or low-risk environment;
3. justify the selected model, tool, Skill, permission, and stop condition; and
4. detect an error, risk, hallucination, incomplete item, or stale fact.

The book's evidence model is expanded in the
[learning model](../docs/learning-model.md) and the
[evaluation framework](../docs/quality/evaluation-framework.md). Missing run
logs keep an item at `draft`, `candidate`, or `not_run` as appropriate; they do
not become proof by implication.

## Locale policy for this book

English is the default public locale and the first development priority. Every
localized reader-facing file, including an English source file, uses an
uppercase suffix such as `-EN`, `-ZH`, `-ES`, `-JA`, `-KO`, or `-DE`. The stable
chapter identity stays the same across translations.

When a translated target exists, links stay in the reader's current locale.
Governance files, source registers, validators, and ADRs are intentionally
locale-neutral. During the migration, a legacy unsuffixed content link is only
used when it is explicitly marked as migration pending, as above. See the
[locale-suffixed content decision](../docs/adr/0010-locale-suffixed-content.md)
for the canonical matrix and translation-status rules.

The English entry files are therefore real source-locale files, but they do not
make the existing Simplified Chinese chapter body look fully bilingual. The
translation matrix, coverage, source revision, reviewer, and stale reason must
remain explicit as the corpus is migrated.

## A practical starting sequence

1. Read the [English preface](preface-EN.md) to understand the operating model.
2. Use the [English table of contents](table-of-contents-EN.md)
   to choose a chapter; migration notices identify any source that is still
   pending.
3. At the end of a chapter, use the generated **Previous chapter** or **Next
   chapter** link. The first chapter has only a next link, middle chapters have
   both, and the last chapter has only a previous link.
4. Read the chapter's boundary and evidence requirements before touching a
   tool, external service, or credential.
5. Run only the smallest reversible experiment that the chapter defines.
6. Preserve the result, differences, logs, sources, and reflection before
   deciding whether the method transfers.

The point of the sequence is not to finish pages quickly. It is to leave a
trail another person can inspect, reproduce within the declared scope, and
update when the product or environment changes.
