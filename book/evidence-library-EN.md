<!-- content_id: reader-evidence-library | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-16 -->

# Evidence and terminology library

This page keeps the learning route readable while preserving its evidence
boundary. Course pages link here instead of sending a reader into a technical
research or governance record written for maintainers.

It is a guide to evidence, not a substitute for the underlying record. A
source note can establish only the scope stated in that note; it cannot prove
learner outcomes, current product behavior, model quality, or general safety.

<a id="core-terms"></a>

## Core terms

The stable distinction is: a **model** generates output; a **tool** can observe
or change an external system; a **Skill** is a reusable method with inputs,
stops, and checks; an **Agent** is an observable multi-step loop; **evidence**
is material another person can inspect. A named platform is not automatically
equivalent to another platform.

For the complete maintained terminology record, use the source identifier
`CONTEXT.md`. Product names, menus, defaults, prices, limits, and permissions
are volatile facts and need a dated official source before use.

<a id="source-notes"></a>

## Source notes

The course uses four kinds of evidence. Read the label before relying on one:

| Label | What it can support | What it cannot support |
| --- | --- | --- |
| Official baseline | A dated product fact within its stated scope | A promise about every account or future version |
| Public field report | A reported user problem or workaround | A confirmed root cause or local reproduction |
| Fixed fixture | A narrow local contract | Model, learner, or production behavior |
| Project method | A proposed procedure and its stated boundary | Independent effectiveness or adoption |

Technical source identifiers include `openai-codex-baseline.md`,
`field-problems-codex.md`, `prompt-patterns-for-real-work-2026-08-10.md`, and
`llm-mechanism-deep-dive-2026-08-10.md`. They are maintained evidence records,
not extra course chapters.

<a id="method-and-status"></a>

## Method and status

The durable learning loop is: define the task → select only needed context →
set an action boundary → do the smallest reversible action → inspect evidence
→ recover or hand off. A green check validates only the check's contract.

`draft` means material or evidence is unfinished. `candidate` means structure
and basic checks exist but the stated claim still lacks sufficient fresh
evidence. `verified` and `production-ready` require the stronger evidence named
by the project’s technical release records.

## How to use a source without getting lost

1. State the decision you need to make.
2. Read the source label and date.
3. Record the exact fact, report, or unknown you used.
4. Stop when the decision needs a live platform observation or new authority.

Return to your chapter after recording the result. Do not promote an old source
note into a current product fact without checking its primary source again.
