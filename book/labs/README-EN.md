<!-- content_id: book-labs-readme | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Codex: From First Task to Real Work — Lab Index

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文（迁移源）](README.md) | Español（translation pending） | 日本語（translation pending） | 한국어（translation pending） | Deutsch（translation pending）
<!-- language-switcher:end -->

The labs turn the book's decisions into small, observable practice. Every lab
names its setup, allowed scope, evidence, failure variant, transfer task, and
current maturity. A lab marked `draft` is a teaching contract; it is not proof
that the exercise has been freshly run in every Codex surface.

## Current state

The index contains 17 lab files. All 17 are currently `draft` with
`run_status: not_run`. English source files are available for Labs 001, 002,
007, 011, and 014–017. The remaining entries retain their current source path
while the locale matrix records their migration state.

## Lab map

| Lab | Capability | Level | English entry |
|---|---|---:|---|
| 001 | First safe task | L1 | [Open](lab-001-first-safe-task-EN.md) |
| 002 | Task protocol | L2 | [Open](lab-002-task-protocol-EN.md) |
| 003 | Evidence review | L3 | [Current source · migration pending](lab-003-evidence-review.md) |
| 004 | Skill selection | L4 | [Current source · migration pending](lab-004-skill-selection.md) |
| 005 | Skill design | L4 | [Current source · migration pending](lab-005-design-a-skill.md) |
| 006 | Agent stop conditions | L5 | [Current source · migration pending](lab-006-agent-stop-conditions.md) |
| 007 | Action boundaries | L3 | [Open](lab-007-action-boundaries-EN.md) |
| 008 | Research question | L3 | [Current source · migration pending](lab-008-research-question.md) |
| 009 | Engineering lifecycle | L3 | [Current source · migration pending](lab-009-engineering-lifecycle.md) |
| 010 | Shared product context | L3 | [Current source · migration pending](lab-010-product-context.md) |
| 011 | GPT and Codex boundaries | L0 | [Open](lab-011-gpt-codex-boundaries-EN.md) |
| 012 | Team capability migration | L6 | [Current source · migration pending](lab-012-team-capability-migration.md) |
| 013 | Auditable vertical slice | L3 | [Current source · migration pending](lab-013-l3-vertical-slice.md) |
| 014 | Resume reconciliation | L3 | [Open](lab-014-resume-reconciliation-EN.md) |
| 015 | Evidence delivery | L5 | [Open](lab-015-evidence-delivery-EN.md) |
| 016 | Side-effect boundary | L3 | [Open](lab-016-side-effect-boundary-EN.md) |
| 017 | Skill discovery audit | L4 | [Open](lab-017-skill-discovery-audit-EN.md) |

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
`run_status: not_run` means there is no recorded execution result in this
repository. The public site may link to a lab, but that link is not a learning
outcome or runtime guarantee.
