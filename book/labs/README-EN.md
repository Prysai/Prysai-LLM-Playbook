<!-- content_id: book-labs-readme | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook: Lab Index

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
<!-- language-switcher:end -->

Labs are where you test whether a way of asking an LLM helps you do real work
more clearly. They are not a separate course in paperwork, and they are not a
claim that every exercise needs Codex Cloud or code. Each lab starts from a
visible question—can this answer retain the facts, follow the requested shape,
show its unknowns, or leave a reviewable change?—then makes the evidence and
failure case explicit.

Start with [Lab 001](lab-001-first-safe-task-EN.md) if you want to feel the
difference between a vague and a checkable request in any LLM workbench. Its
workspace half is optional until you have a disposable project. Use the later
Labs when you need the same discipline for files, tools, research, Skills, or
team work. A lab marked `draft` is a teaching contract; it is not proof that
the exercise has been freshly run in every Codex surface.

## Choose by the result you want today

Do not begin at Lab 001 merely because it has the smallest number. Begin with
the smallest outcome that matches your situation. Each choice below has a
visible result; none requires you to trust a model because it sounds confident.

| If you want to… | Start here | What you should be able to see before you stop |
| --- | --- | --- |
| Notice whether a clearer request helps, without code or a project folder | [Lab 001, Part A](lab-001-first-safe-task-EN.md#part-a--a-ten-minute-prompt-comparison) | Two replies to the same harmless notes and a small comparison receipt |
| Understand what GPT, a workbench, a tool, and an Agent each do | [Lab 011](lab-011-gpt-codex-boundaries-EN.md) | A boundary map that separates a proposed action from an executed and checked action |
| Turn “help me with this” into a request another person could check | [Lab 002](lab-002-task-protocol-EN.md) | One task card with a goal, source boundary, allowed action, acceptance, and stop condition |
| Check a fixed-source research answer without pretending it is complete | [Lab 008](lab-008-research-question-EN.md) | A source list, a bounded claim, and an explicit unknowns list |
| Make a small local file change | [First Safe Change](../routes/first-safe-change-EN.md), then [Lab 001, Part B](lab-001-first-safe-task-EN.md#part-b--take-the-same-discipline-into-a-workspace) | One reviewed README diff and a focused local check in a disposable copy |

If you only have a chat window today, the first row is enough. Do not install
tools, create an account, or use a real project merely to keep up with the
catalogue. Move to a workspace exercise only when you can name a disposable
folder, one permitted target, and the evidence you will keep.

## Current state

The index contains 18 lab identities. All 18 are currently `draft` with
learner `run_status: not_run`, and all 18 have canonical English source files.
Two of 18 Labs (Labs 008 and 013) have accepted deterministic maintainer reference
runs. Zero of 18 have a recorded learner run, and zero of 18 have a recorded
transfer run. A maintainer packet is implementation evidence, not a learning
outcome.

## Lab map

| Lab | Capability | Exercise level | First used in path | English entry |
|---|---|---:|---:|---|
| 001 | Make the first request usable | L1 | L1 primary | [Open](lab-001-first-safe-task-EN.md) |
| 002 | Task protocol | L2 | L2 primary | [Open](lab-002-task-protocol-EN.md) |
| 003 | Evidence review | L3 | L3 supporting | [Open](lab-003-evidence-review-EN.md) |
| 004 | Skill selection | L4 | L4 primary | [Open](lab-004-skill-selection-EN.md) |
| 005 | Skill design | L4 | L4 supporting | [Open](lab-005-design-a-skill-EN.md) |
| 006 | Agent stop conditions | L5 | L5 primary | [Open](lab-006-agent-stop-conditions-EN.md) |
| 007 | Action boundaries | L3 | L3 supporting | [Open](lab-007-action-boundaries-EN.md) |
| 008 | Research question | L3 | L4 supporting | [Open](lab-008-research-question-EN.md) |
| 009 | Engineering lifecycle | L3 | L3 supporting | [Open](lab-009-engineering-lifecycle-EN.md) |
| 010 | Shared product context | L3 | L6 supporting | [Open](lab-010-product-context-EN.md) |
| 011 | GPT and Codex boundaries | L0 | L0 primary | [Open](lab-011-gpt-codex-boundaries-EN.md) |
| 012 | Team capability migration | L6 | L6 primary | [Open](lab-012-team-capability-migration-EN.md) |
| 013 | Auditable vertical slice | L3 | L3 primary | [Open](lab-013-l3-vertical-slice-EN.md) |
| 014 | Resume reconciliation | L3 | L3 supporting | [Open](lab-014-resume-reconciliation-EN.md) |
| 015 | Evidence delivery | L5 | L5 supporting | [Open](lab-015-evidence-delivery-EN.md) |
| 016 | Side-effect boundary | L3 | L3 supporting | [Open](lab-016-side-effect-boundary-EN.md) |
| 017 | Skill discovery audit | L4 | L4 supporting | [Open](lab-017-skill-discovery-audit-EN.md) |
| 018 | Language transfer under a fixed practice contract | L2 | L2 optional supporting | [Open](lab-018-language-transfer-EN.md) |

Lab numbers are stable catalog identities. The adjacent links at the end of a
Lab browse this catalog by number; they are not prerequisites or a claim that
the next numbered Lab belongs to the next learning level. Use the
[learning path](../../docs/governance/learning-path.yaml) for level placement
and progression evidence.

## How to run a lab safely

1. Use a disposable folder, a fixed input revision, and no real credentials.
2. Read the lab's permission and side-effect boundary before acting.
3. Record the baseline, commands, outputs, diff, failure branch, and unknowns.
4. Stop when a target, authority, source, or rollback path is not observable.
5. Complete the transfer task only after the original exercise is recorded.

The lab contract is supported by the
[learning path](../../docs/governance/learning-path.yaml), the
[content status source](../../docs/governance/content-status.yaml), and the
[evaluation framework](../../docs/quality/evaluation-framework.md). The
[project map](../../docs/project-map-EN.md) explains how lab files relate to
chapters, Skills, research, and generated pages.

## Status boundary

`draft` means that the exercise still needs the project's declared evidence
before it can be called `candidate`, `verified`, or `production-ready`.
`run_status: not_run` means there is no recorded learner execution result in
this repository. Labs 008 and 013 separately record accepted
`reference_run_status: completed` packets; their learner and transfer statuses remain
`not_run`. The public site may link to a Lab or a maintainer packet, but neither
link is a learning outcome or runtime guarantee.
