<!-- content_id: book-table-of-contents | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: dd08a68 -->

# Codex: From First Task to Real Work — Table of Contents v0.2

> English source-locale directory page. This migration slice is based on the
> existing unsuffixed `book/table-of-contents.md`. It keeps all 22 chapters,
> 13 experiments, maturity boundaries, and real-user problem research
> entrances visible without claiming that the chapter or lab corpus is already
> translated or runtime-verified.

## Migration state and link policy

- Page `content_status`: `candidate`; source revision: `dd08a68`.
- The directory contains 22 chapter records and 13 real experiment files.
- Chapters are `candidate`. Labs are `draft` with `run_status: not_run`.
- Chapter 6 has `claim_status: disputed`; Chapter 22 has
  `claim_status: current | disputed`.
- Existing English entry pages use their `-EN` files. Chapters 1–5 and Labs
  001, 002, 007, and 011 now have canonical `-EN` source files. The remaining
  chapters and labs do not yet have locale-suffixed English variants, so their
  links are explicitly marked `migration pending — current source path`.
  Shared governance, evaluation, and research documents are marked
  `locale-neutral`.
- No link on this page silently falls back to another locale. A migration
  notice is part of every link whose localized target does not yet exist.

## Start here

- [Project entry — EN](../README-EN.md)
- [Book guide — EN](README-EN.md)
- [Preface — EN](preface-EN.md)
- [Learning path contract — locale-neutral](../docs/governance/learning-path.yaml)
- [Locale matrix — locale-neutral](../docs/governance/locale-matrix.yaml)

## Part I: From understanding GPT to the first safe use

### Chapter 1 — Understand GPT before understanding how Codex works

How models generate from context; how Codex connects a model to a work
environment; and how context, tools, Skills, permissions, and an observable
Agent loop affect the result. **content_status:** `candidate`

- Chapter: [Chapter 1 — EN source](chapters/01-gpt-and-codex-EN.md)
- Experiment: [Lab 011 — EN source](labs/lab-011-gpt-codex-boundaries-EN.md)

### Chapter 2 — Complete a first safe, verifiable task

Choose a low-risk task, write a first-task protocol, set confirmation points,
and leave delivery evidence. **content_status:** `candidate`

- Chapter: [Chapter 2 EN source](chapters/02-first-safe-task-EN.md)
- Experiment: [lab-001 EN source](labs/lab-001-first-safe-task-EN.md)

### Chapter 3 — Turn a wish into a task protocol

Define the goal, background, inputs, constraints, allowed actions, acceptance,
failure handling, and delivery format. **content_status:** `candidate`

- Chapter: [Chapter 3 — EN source](chapters/03-task-protocol-EN.md)
- Experiment: [Lab 002 — EN source](labs/lab-002-task-protocol-EN.md)

### Chapter 4 — Context, permissions, and the Agent action boundary

Context layers, trust boundaries, sandboxing, approvals, external side
effects, and observable behavior. **content_status:** `candidate`

- Chapter: [Chapter 4 — EN source](chapters/04-context-permissions-and-agent-EN.md)
- Experiment: [Lab 007 — EN source](labs/lab-007-action-boundaries-EN.md)

### Chapter 5 — Choose the right Codex surface

How to choose among Local, Worktree, and Cloud, then select the desktop app,
CLI, IDE, or web entry point for a task. **content_status:** `candidate`

- Chapter: [Chapter 5 — EN source](chapters/05-choose-the-codex-surface-EN.md)
- Experiment: [Lab 007 — EN source](labs/lab-007-action-boundaries-EN.md)

### Chapter 6 — Model selection is not model worship

Compare models with a task set, cost, speed, stability, and verification;
test assumptions about model positioning. **content_status:** `candidate` ·
related volatile claim: `claim_status: disputed`

- Chapter: [migration pending — current source path](chapters/06-model-selection.md)
- Research: [OpenAI/Codex baseline — locale-neutral research](../docs/research/openai-codex-baseline.md)

## Part II: From user to workflow designer

### Chapter 7 — How Skills, Plugins, MCP, and tools divide the work

Understand the method, connection, execution, and distribution layers; choose
the smallest effective capability combination. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/07-skills-plugins-and-tools.md)
- Experiment: [lab-004 — migration pending — current source path](labs/lab-004-skill-selection.md)

### Chapter 8 — The complete lifecycle from definition to delivery

Definition, planning, building, verification, review, delivery, and
maintenance, with vertical slices that remain verifiable. **content_status:**
`candidate`

- Chapter: [migration pending — current source path](chapters/08-full-lifecycle-workflow.md)
- Primary experiment: [lab-013 — migration pending — current source path](labs/lab-013-l3-vertical-slice.md)
- Supporting experiment: [lab-009 — migration pending — current source path](labs/lab-009-engineering-lifecycle.md)

### Chapter 9 — Verification, doubt, and recovery

Break completion claims into claims and evidence; handle uncertainty, failure,
and recovery. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/09-verification-and-recovery.md)
- Experiment: [lab-003 — migration pending — current source path](labs/lab-003-evidence-review.md)

### Chapter 10 — Planning and vertical slicing

Break a large goal into delivery slices with clear dependencies, runnable
steps, and inspectable checks. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/10-planning-and-slicing.md)
- Experiments: [Lab 002 — EN source](labs/lab-002-task-protocol-EN.md) · [lab-013 — migration pending — current source path](labs/lab-013-l3-vertical-slice.md)

### Chapter 11 — Design a genuinely useful Skill

Trigger boundaries, progressive disclosure, resources, scripts, outputs,
failure examples, evaluation, and versioning. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/11-designing-a-skill.md)
- Experiment: [lab-005 — migration pending — current source path](labs/lab-005-design-a-skill.md)

### Chapter 12 — The Agent loop, state, and stopping conditions

Observation, planning, action, feedback, retry, confirmation, and stopping;
explain behavior without inventing hidden reasoning. **content_status:**
`candidate`

- Chapter: [migration pending — current source path](chapters/12-agent-loop-and-stop.md)
- Experiment: [lab-006 — migration pending — current source path](labs/lab-006-agent-stop-conditions.md)

### Chapter 13 — Action boundaries for files, terminals, browsers, and GitHub

Read-only checks, editing, commands, browsing, commits, pushes, external
messages, and rollback. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/13-action-boundaries.md)
- Experiment: [Lab 007 — EN source](labs/lab-007-action-boundaries-EN.md)

## Part III: Skills, tools, and professional practice

### Chapter 14 — Discover, install, and audit external Skills

Move from an index to a trustworthy capability: source, license,
dependencies, authentication, triggers, and maintenance. **content_status:**
`candidate`

- Chapter: [migration pending — current source path](chapters/14-discover-and-audit-skills.md)
- Experiments: [lab-004 — migration pending — current source path](labs/lab-004-skill-selection.md) · [lab-005 — migration pending — current source path](labs/lab-005-design-a-skill.md)

### Chapter 15 — Research track: from question to auditable knowledge

Narrow the research question; handle sources, citations, method, review,
disclosure, and completeness. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/15-research-track.md)
- Experiment: [lab-008 — migration pending — current source path](labs/lab-008-research-question.md)

### Chapter 16 — Engineering track: from idea to reliable software

Requirements, specifications, planning, incremental implementation, tests,
debugging, review, release, and migration. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/16-engineering-track.md)
- Experiment: [lab-009 — migration pending — current source path](labs/lab-009-engineering-lifecycle.md)

### Chapter 17 — Marketing track: from product understanding to growth experiments

Product context, audience, positioning, content, conversion, measurement, and
attribution. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/17-marketing-track.md)
- Experiment: [lab-010 — migration pending — current source path](labs/lab-010-product-context.md)

### Chapter 18 — Content, design, data, and automation track

Use the external ecosystem by task capability cluster instead of installing
every Skill blindly. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/18-content-design-data-automation.md)
- Experiment: [lab-004 — migration pending — current source path](labs/lab-004-skill-selection.md)

## Part IV: From proficient use to organizational capability

### Chapter 19 — Evaluate models and workflows

Build task sets, repeat experiments, score with human review, and classify
errors. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/19-evaluate-models-and-workflows.md)
- Experiments: [lab-003 — migration pending — current source path](labs/lab-003-evidence-review.md) · [lab-009 — migration pending — current source path](labs/lab-009-engineering-lifecycle.md)
- Evaluation framework: [locale-neutral governance](../docs/quality/evaluation-framework.md)

### Chapter 20 — Build a personal Codex work system

Project context, memory, templates, recurring workflows, and retrospectives.
**content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/20-personal-codex-work-system.md)
- Experiments: [lab-001 EN source](labs/lab-001-first-safe-task-EN.md) · [lab-010 — migration pending — current source path](labs/lab-010-product-context.md)

### Chapter 21 — Build a team capability system

Shared Skills, `AGENTS.md`, permissions, evaluation, review, contribution, and
versioning. **content_status:** `candidate`

- Chapter: [migration pending — current source path](chapters/21-team-capability-system.md)
- Experiment: [lab-012 — migration pending — current source path](labs/lab-012-team-capability-migration.md)

### Chapter 22 — Continuous update and future-proofing

Identify volatile facts, update sources, migrate models, audit tools, and
remove obsolete capabilities. **content_status:** `candidate` · related
volatile claim: `claim_status: current | disputed`

- Chapter: [migration pending — current source path](chapters/22-continuous-update-and-future-proofing.md)
- Experiments: [lab-008 — migration pending — current source path](labs/lab-008-research-question.md) · [lab-010 — migration pending — current source path](labs/lab-010-product-context.md)

## Experiment index and status boundaries

The repository has 13 real experiment files. Each remains `draft` and
`run_status: not_run`; a directory link is an entry point, not evidence that
the experiment or its learning outcome is verified.

| Experiment | Focus | State | Entry |
|---|---|---|---|
| lab-001 | First safe task | `draft` · `not_run` | [EN source](labs/lab-001-first-safe-task-EN.md) |
| lab-002 | Task protocol | `draft` · `not_run` | [EN source](labs/lab-002-task-protocol-EN.md) |
| lab-003 | Evidence review | `draft` · `not_run` | [migration pending — current source](labs/lab-003-evidence-review.md) |
| lab-004 | Skill selection | `draft` · `not_run` | [migration pending — current source](labs/lab-004-skill-selection.md) |
| lab-005 | Skill design | `draft` · `not_run` | [migration pending — current source](labs/lab-005-design-a-skill.md) |
| lab-006 | Agent stop conditions | `draft` · `not_run` | [migration pending — current source](labs/lab-006-agent-stop-conditions.md) |
| lab-007 | Action boundaries | `draft` · `not_run` | [EN source](labs/lab-007-action-boundaries-EN.md) |
| lab-008 | Research question | `draft` · `not_run` | [migration pending — current source](labs/lab-008-research-question.md) |
| lab-009 | Engineering lifecycle | `draft` · `not_run` | [migration pending — current source](labs/lab-009-engineering-lifecycle.md) |
| lab-010 | Product context | `draft` · `not_run` | [migration pending — current source](labs/lab-010-product-context.md) |
| lab-011 | GPT, Codex, tools, and Agents | `draft` · `not_run` | [Lab 011 — EN source](labs/lab-011-gpt-codex-boundaries-EN.md) |
| lab-012 | Team capability migration | `draft` · `not_run` | [migration pending — current source](labs/lab-012-team-capability-migration.md) |
| lab-013 | Auditable L3 vertical slice | `draft` · `not_run` | [migration pending — current source](labs/lab-013-l3-vertical-slice.md) |

## Evaluation, status, and real-problem research

- [Experiment index — migration pending; current source](labs/README.md): 13 real experiment files, levels, domains, migration focus, and `lab_status`.
- [Content integration matrix — locale-neutral governance](../docs/content-matrix.md): capability mappings and the additional capability introduced when themes repeat.
- [Evaluation framework — locale-neutral governance](../docs/quality/evaluation-framework.md): acceptance gates for content and capability.
- [Learning path contract — locale-neutral governance](../docs/governance/learning-path.yaml): levels, primary experiments, supporting experiments, and progression gates.
- [Codex real-user problem research — locale-neutral research](../docs/research/field-problems-codex.md): public problem entry points without claiming official root causes.
- [Real-problem research index — locale-neutral research](../docs/research/field-problems-index-2026-08-10.md): maps FP, FP-S, FUP, forum findings, and chapter/lab locations.
- [Forums and public-issue research — locale-neutral research](../docs/research/field-problems-forums-2026-08-10.md): reliable Stack Overflow API/pages and GitHub issue summaries.
- [Official baseline research archive — locale-neutral research](../docs/research/openai-codex-baseline.md): source boundary for volatile claims.

The independent primary experiments for L0, L3, and L6 are [Lab 011 — EN source](labs/lab-011-gpt-codex-boundaries-EN.md), [lab-013 — migration pending](labs/lab-013-l3-vertical-slice.md), and [lab-012 — migration pending](labs/lab-012-team-capability-migration.md).
