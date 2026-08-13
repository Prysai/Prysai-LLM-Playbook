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

The index contains 18 lab identities. All 18 are currently `draft` with
learner `run_status: not_run`, and all 18 have canonical English source files.
One of 18 Labs (Lab 013) has an accepted deterministic maintainer reference
run. Zero of 18 have a recorded learner run, and zero of 18 have a recorded
transfer run. A maintainer packet is implementation evidence, not a learning
outcome.

## Lab map

| Lab | Capability | Exercise level | First used in path | English entry |
|---|---|---:|---:|---|
| 001 | First safe task | L1 | L1 primary | [Open](lab-001-first-safe-task-EN.md) |
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
this repository. Lab 013 separately records one accepted
`reference_run_status: completed`; its learner and transfer statuses remain
`not_run`. The public site may link to a Lab or a maintainer packet, but neither
link is a learning outcome or runtime guarantee.
