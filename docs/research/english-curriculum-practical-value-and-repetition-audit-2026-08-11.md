# English curriculum practical-value and repetition audit

**Status:** `candidate` · read-only audit  
**Audited:** 2026-08-11 (America/Los_Angeles)  
**Scope:** all 22 English chapter files, the English lab corpus, project Skills,
examples/cases, evaluation fixtures, governance, and existing research records.  
**Boundary:** this report adds findings only. It does not modify a chapter, lab,
Skill, example, evaluation fixture, or generated site file.

## Executive verdict

The English curriculum has a strong point of view: it teaches bounded action,
evidence, permissions, recovery, and maintenance instead of treating a model
answer as proof. The main practical-value problem is now execution depth, not a
lack of concepts.

Three facts drive the next editorial pass:

1. All 22 English chapter sources exist, but the English reader guide still
   contains an obsolete migration statement at
   [`book/README-EN.md:59-60`](../../book/README-EN.md#L59). The current table of
   contents correctly says chapters 1–22 have English sources at
   [`book/table-of-contents-EN.md:18-21`](../../book/table-of-contents-EN.md#L18),
   so the guide gives readers conflicting coverage signals.
2. There are eight English lab files in the working tree, but only four are
   tracked by Git and only the original four are registered as English lab
   routes. The four new files—`lab-014` through `lab-017`—are untracked and
   absent from the current 13-lab governance inventory. The public English
   index therefore exposes a real gap between the field-problem map and the
   runnable curriculum. This is a release/inventory issue, not evidence that
   those labs are verified.
3. The same state vocabulary is deliberately reused across Chapters 2, 8, 9,
   12, and 13. That reuse is valuable once, but the current prose often
   re-teaches the same distinction (“status label is not an exit check,”
   unknown state, checkpoint, bounded retry, and permission boundary) instead
   of handing the reader a progressively harder artifact. The next revision
   should centralize the definition and make each later chapter consume or
   extend one shared record.

The curriculum should be called a **high-quality candidate framework**, not a
verified practical course. Every chapter has a practice-shaped section, but
the declared experiments remain `draft`/`not_run`; the evaluation task set is
also a fixture until runs and independent scores exist.

## Audit method and evidence classes

I checked the file inventory, headings, metadata, cross-links, and exact prose
in the English sources. Findings use these labels:

| Label | Meaning |
| --- | --- |
| `present` | The mechanism is explained and has a concrete artifact or exercise shape. |
| `underpowered` | The mechanism is named, but the learner lacks a complete runnable input/output/score/recovery loop. |
| `missing` | No direct English teaching entry or experiment was found in the audited corpus. |
| `repeated` | The same rule is restated in multiple chapters without a sufficiently new decision or artifact. |
| `evidence-limited` | The file explicitly says `not_run`, `candidate`, synthetic, user-report, or otherwise limits the claim. |

This is an internal corpus audit. Existing public reports remain symptoms or
research inputs, not confirmed upstream root causes. See the evidence rules in
[`docs/research/README.md`](README.md),
[`docs/research/field-problems-deep-dive-p2-2026-08-11.md`](field-problems-deep-dive-p2-2026-08-11.md),
and [`docs/quality/evaluation-framework.md`](../quality/evaluation-framework.md).

## Coverage inventory

### Chapters

The 22 English chapter files are present:

`01-gpt-and-codex`, `02-first-safe-task`, `03-task-protocol`,
`04-context-permissions-and-agent`, `05-choose-the-codex-surface`,
`06-model-selection`, `07-skills-plugins-and-tools`,
`08-full-lifecycle-workflow`, `09-verification-and-recovery`,
`10-planning-and-slicing`, `11-designing-a-skill`, `12-agent-loop-and-stop`,
`13-action-boundaries`, `14-discover-and-audit-skills`, `15-research-track`,
`16-engineering-track`, `17-marketing-track`,
`18-content-design-data-automation`, `19-evaluate-models-and-workflows`,
`20-personal-codex-work-system`, `21-team-capability-system`, and
`22-continuous-update-and-future-proofing`.

Every chapter has a learning-objective area, an experiment or observable
practice area, failure/boundary material, an acceptance area, and source or
maintenance material. This is a real structural strength. It is not the same
as completed learning evidence: for example, Chapter 8 explicitly says its
comparison experiment is `not_run` at
[`book/chapters/08-full-lifecycle-workflow-EN.md:3-6`](../../book/chapters/08-full-lifecycle-workflow-EN.md#L3),
and Chapter 19 retains `not_run` records and prohibits invented values at
[`book/chapters/19-evaluate-models-and-workflows-EN.md:132-171`](../../book/chapters/19-evaluate-models-and-workflows-EN.md#L132).

### English labs

| English file | Current audit state | Practical role |
| --- | --- | --- |
| [`lab-001-first-safe-task-EN.md`](../../book/labs/lab-001-first-safe-task-EN.md) | `present`, `draft/not_run` | First bounded edit, diff, focused check, and stop behavior |
| [`lab-002-task-protocol-EN.md`](../../book/labs/lab-002-task-protocol-EN.md) | `present`, `draft/not_run` | Compare a vague request with a bounded protocol |
| [`lab-007-action-boundaries-EN.md`](../../book/labs/lab-007-action-boundaries-EN.md) | `present`, `draft/not_run` | Same task across local, worktree, and second-directory boundaries |
| [`lab-011-gpt-codex-boundaries-EN.md`](../../book/labs/lab-011-gpt-codex-boundaries-EN.md) | `present`, `draft/not_run` | Separate GPT, Codex, tools, and Agent evidence |
| [`lab-014-resume-reconciliation-EN.md`](../../book/labs/lab-014-resume-reconciliation-EN.md) | `underpowered for release` | Useful resume/checkpoint exercise, but untracked and not registered |
| [`lab-015-evidence-delivery-EN.md`](../../book/labs/lab-015-evidence-delivery-EN.md) | `underpowered for release` | Useful evidence-delivery exercise, but untracked and not registered |
| [`lab-016-side-effect-boundary-EN.md`](../../book/labs/lab-016-side-effect-boundary-EN.md) | `underpowered for release` | Useful install/restart/publish boundary exercise, but untracked and not registered |
| [`lab-017-skill-discovery-audit-EN.md`](../../book/labs/lab-017-skill-discovery-audit-EN.md) | `underpowered for release` | Useful discovery/callability exercise, but untracked and not registered |

The governance source still lists 13 labs and routes only the earlier four
English lab files, while the field-practice map links to `lab-014`–`lab-017`.
Compare [`book/table-of-contents-EN.md:229-249`](../../book/table-of-contents-EN.md#L229)
with [`docs/research/field-problem-to-practice-map-2026-08-11.md:25-32`](field-problem-to-practice-map-2026-08-11.md#L25).
This report does not resolve that inventory mismatch because the request is
read-only.

### Skills, examples, and evaluation

- Seven project Skills exist under [`skills/`](../../skills/). Their contracts
  consistently define trigger boundaries, required inputs, hard stops, fixed
  outputs, evidence mapping, and maintenance. That is `present` as a contract
  layer, but most behavior remains `candidate` rather than fresh-context,
  runtime, transfer, or production evidence; the registry says so explicitly
  in [`docs/skill-registry.md`](../skill-registry.md).
- The real-estate case is a useful **synthetic** visual teaching case, not a
  real Skill runtime result. Its limitation is correctly stated in
  [`examples/skill-sandbox/product-context-real-estate/README.md:9-15`](../../examples/skill-sandbox/product-context-real-estate/README.md#L9)
  and [`assets/cases/README.md:17-20`](../../assets/cases/README.md#L17).
- The evaluation framework and `evals/task-set-v1.yaml` define task fixtures,
  criteria, and status boundaries. They do not contain a completed run corpus
  or independent scoring history. The English chapters correctly preserve
  this limit, especially Chapters 19–22.

## Repetition audit: what to consolidate

The repetition is not a reason to delete the ideas. It is a reason to make one
canonical artifact and have later chapters mutate it.

| Repeated mechanism | Evidence locations | Editorial diagnosis | Proposed treatment |
| --- | --- | --- | --- |
| A UI/status label is not completion evidence | Chapter 2 `:91-99`; Chapter 8 `:106-120`; Chapter 9 `:114-128`; Chapter 12 `:68-86` and `:177-179` | `repeated`; the same warning arrives before the reader has a single reusable state record | Define the state/evidence vocabulary once in Chapter 2 or 8; in Chapters 9 and 12 replace explanation with a filled failure record and one new state transition. |
| Checkpoints, unknown state, bounded retry, and recovery | Chapter 2 `:303-337`; Chapter 8 `:198-240` and `:272-288`; Chapter 9 `:131-145` and `:221-272`; Chapter 12 `:84-103`, `:196-249`, and `:534-574` | `repeated`; Chapters 8/9/12 overlap heavily, while Chapter 12 should be the deep operational treatment | Keep the lifecycle overview in Chapter 8, the claim/evidence matrix in Chapter 9, and make Chapter 12 the only detailed retry/timeout/resume lab. Cross-link instead of restating. |
| Permission is not capability/authorization | Chapter 2 `:218-258`; Chapter 4 `:87-129`; Chapter 5 `:80-111`; Chapter 7 `:61-72`; Chapter 13 `:59-113` | `repeated`; useful in each risk surface but currently too much prose-level restatement | Use one shared “capability chain” card. Each chapter should add one different surface-specific failure: local path, model/provider, Skill/MCP, browser/GitHub. |
| Evidence ladder and “does not prove” boundary | Chapter 1 `:50-63`; Chapter 8 `:244-269`; Chapter 9 `:64-97`; Chapter 19 `:132-177`; Chapter 22 `:122-143` | `repeated`; the project’s strongest idea is diluted by multiple near-identical disclaimers | Maintain one canonical claim-to-evidence schema. Later chapters should contribute domain-specific rows (research, runtime, marketing, team, maintenance), not another generic ladder. |
| Skill discovery/contract/license/trigger boundaries | Chapter 7 `:37-230`; Chapter 11 `:64-383`; Chapter 14 `:17-121` and `:160-177` | `repeated`; Chapter 11 is the design deep dive, Chapter 14 the adoption audit, but their introductory distinctions overlap | Give Chapter 7 the short taxonomy and routing decision; Chapter 11 owns creation; Chapter 14 owns external adoption, license, dependency, and rollback. Use the same candidate card in all three. |
| Vertical slicing and lifecycle planning | Chapter 8 `:163-196`; Chapter 10 `:55-236`; Chapter 16 `:34-71` | `repeated`; Chapter 10 is the real planning treatment, while 8 and 16 repeat the principle | Chapter 8 should point to the slice card; Chapter 16 should show the engineering-specific runtime/dependency/release slice. |
| Team/personal capability maintenance | Chapters 20 `:25-60`, 21 `:25-74`, and 22 `:25-79` | `repeated at the framework level`; all three use version, owner, evidence, rollback, and review fields | Keep the different audience decisions, but make a single capability manifest and show how personal → team → update changes only its owner, approval, and impact rows. |

## Missing or underpowered high-value mechanisms

These are the practical mechanisms a reader is most likely to need after the
current conceptual pass. “Missing” means no direct reader-facing English entry
was found; “underpowered” means a related principle exists but lacks a usable
artifact or scenario.

### P0 — close the loop between reading and doing

#### P0-01 — A complete English vertical slice with a real local artifact

**Status:** `underpowered`. Chapters 8 and 10 describe the slice, and Chapter
2 describes a README edit, but there is no single English lab that walks a
reader through baseline → protocol → capability choice → edit → focused check
→ intentional failure → recovery → handoff in one disposable repository.

**Why it matters:** without this, the guide teaches many correct fragments but
does not prove that a beginner can perform the first complete loop.

**Insertion map:**

- Chapter 2, after [`:359`](../../book/chapters/02-first-safe-task-EN.md#L359):
  link a canonical starter fixture and expected directory tree.
- Chapter 8, after [`:388`](../../book/chapters/08-full-lifecycle-workflow-EN.md#L388):
  make one worked case the canonical vertical slice, with exact input/output
  files rather than another prose example.
- Chapter 10, after [`:287`](../../book/chapters/10-planning-and-slicing-EN.md#L287):
  require the same slice card and compare plan shape against the actual diff.
- Add or promote one English lab in `book/labs/` and register it in
  `book/table-of-contents-EN.md`, `docs/governance/content-status.yaml`, and
  `docs/governance/locale-matrix.yaml`.

#### P0-02 — Resume/compaction reconciliation as a first-class checkpoint

**Status:** `underpowered` in the registered curriculum. Existing research
identifies context compaction, resumed stdin, and no-progress verification as
distinct failure boundaries in
[`docs/research/field-problems-deep-dive-p2-2026-08-11.md:33-86`](field-problems-deep-dive-p2-2026-08-11.md#L33).
The new `lab-014` points at the right mechanism, but it is not yet in the
English lab inventory.

**Required artifact:** a checkpoint containing task pointer, exact target path,
file hash/mtime, last accepted action, pending action, permission state, and
next evidence; after reset, the learner must re-read and reconcile before any
write.

**Insertion map:** Chapter 4’s context model (`:23-212`), Chapter 10’s
checkpoint section (`:198-240`), and Chapter 12’s state/retry section
(`:84-249`) should share one record. Make `lab-014-resume-reconciliation-EN.md`
the exercise entry once it is registered. The passing criterion must be
“reconciles or stops,” not “continues.”

#### P0-03 — Failure taxonomy tied to a diagnostic decision tree

**Status:** `underpowered`. Chapters 2, 8, 9, and 12 name many states, but a
beginner still needs a compact mapping from symptom to the first safe check:
wrong target, missing input, discovery failure, permission/approval failure,
process timeout, partial side effect, model capacity, provider mismatch, or
unknown state.

**Insertion map:** Chapter 9 after [`:131-183`](../../book/chapters/09-verification-and-recovery-EN.md#L131),
with one table: `symptom → first check → forbidden inference → safe next
action → evidence`. Reuse that table from Chapter 12 rather than adding a new
generic recovery narrative. Tie each row to one of `lab-014`, `lab-015`, or
`lab-016`.

#### P0-04 — Testability of Skills beyond static contracts

**Status:** `underpowered`. Chapter 11 defines positive, boundary, failure, and
transfer cases at [`:500-709`](../../book/chapters/11-designing-a-skill-EN.md#L500),
and the Skills define fixed outputs, but the project’s registry remains
`candidate`; static validation is not behavior validation.

**Insertion map:** Chapter 11 after [`:640`](../../book/chapters/11-designing-a-skill-EN.md#L640):
  add a minimal fresh-context run table with raw output, trigger decision,
  input schema result, stop reason, evidence paths, and reviewer score.
- Chapter 14 after [`:126`](../../book/chapters/14-discover-and-audit-skills-EN.md#L126):
  require the same table for an external candidate, including discovery,
  parsing, routing, execution, and output as separate stages.
- Promote/register `lab-017-skill-discovery-audit-EN.md` only with an explicit
  `not_run` state until those stages have evidence.

### P1 — mechanisms that make the guide useful in real work

#### P1-01 — Environment and dependency diagnosis

**Status:** `missing as a standalone method`. Chapter 16 mentions dependency
versions and runtime evidence at [`:48-71`](../../book/chapters/16-engineering-track-EN.md#L48),
and Chapter 5 distinguishes surfaces, but there is no reusable matrix for
“source is correct, command is missing, dependency is unavailable, environment
is wrong, or runtime is broken.”

**Insertion map:** Chapter 5 after the surface gates (`:150-229`) and Chapter
16 after runtime evidence (`:65-71`). Add a read-only diagnostic card with
`cwd`, repository root, branch/HEAD, runtime versions, dependency lockfile,
command path, environment class, and exact exit code. Add missing command,
wrong directory, incompatible version, and network-blocked fixtures. Do not
teach “fix” as automatic reinstall.

#### P1-02 — Idempotency and partial-side-effect recovery

**Status:** `underpowered`. Chapters 8, 9, 13, and 18 warn that retries can
duplicate work, but only Chapter 18 directly names idempotency/batch IDs at
[`book/chapters/18-content-design-data-automation-EN.md:103-117`](../../book/chapters/18-content-design-data-automation-EN.md#L103).
The idea should be general, not limited to data automation.

**Insertion map:** Chapter 9 after the bounded recovery sequence (`:131-145`):
  add `read-only / idempotent / compensating / non-retryable` action classes,
  a partial-write probe, and a duplicate-detection record. Chapter 13’s GitHub
  and browser boundary (`:195-333`) should apply the same classification to
  submit/push/publish actions. Use `lab-016-side-effect-boundary-EN.md` as the
  safe paper/local fixture.

#### P1-03 — Cost, latency, and context-budget decisions

**Status:** `underpowered`. Chapter 6 records a `cost_basis` field and Chapter
19 records elapsed time and cost basis, but neither teaches a practical budget
decision or a controlled tradeoff between context size, model effort, retries,
latency, and human review.

**Insertion map:** Chapter 6 after the candidate card (`:197-237`): add a
budget card with time ceiling, retry ceiling, context ceiling, cost basis,
quality floor, and escalation rule. Chapter 19’s comparison record
(`:132-177`) should score budget compliance and distinguish unavailable cost
from zero cost. Add one synthetic slow/cheap/low-quality and fast/expensive
fixture; do not invent provider prices.

#### P1-04 — Data minimization and redaction as an operational workflow

**Status:** `underpowered`. Privacy and secret warnings appear throughout the
book, and Chapters 17–21 use synthetic or redacted inputs, but there is no
English lab that teaches classification → minimization → redaction → residual
risk → deletion/retention check.

**Insertion map:** Chapter 4 after the input-admission table (`:139-151`) and
Chapter 17 after the synthetic Product Context (`:44-62`). Add a fixed fixture
containing secrets, direct identifiers, quasi-identifiers, customer claims,
and harmless data. Require a redaction manifest and a statement of what the
agent is still allowed to infer. Link the result to Chapter 13’s external
submission boundary.

#### P1-05 — Human review design and reviewer calibration

**Status:** `underpowered`. Chapter 19 defines five human-scored dimensions at
[`book/chapters/19-evaluate-models-and-workflows-EN.md:171-177`](../../book/chapters/19-evaluate-models-and-workflows-EN.md#L171),
and Chapter 21 requires independent review, but the curriculum does not teach
how two reviewers resolve disagreement or how to prevent a rubric from
quietly changing after seeing the output.

**Insertion map:** Chapter 19 after the scoring dimensions (`:171-177`): add
  calibration on two pre-scored examples, blind/independent scoring, a
  disagreement log, adjudication rule, and rubric version. Chapter 21’s
  transfer experiment (`:93-144`) should consume that review record rather than
  restating “independent review.”

#### P1-06 — Real-world non-code delivery contracts

**Status:** `underpowered`. Chapters 17 and 18 give synthetic marketing,
content, design, data, and automation exercises; only the real-estate page is
rendered and captured. There is no comparable English case for a document,
spreadsheet, presentation, PDF, or data export with source, layout, accessibility,
loss, and acceptance evidence.

**Insertion map:** Chapter 18 after the evidence table (`:71-80`): choose one
  non-code deliverable and provide source fixture, output, visual check,
  semantic/content check, loss report, and boundary screenshot. Keep the
  real-estate case as the visual case; add a second artifact only if it teaches
  a different failure mechanism.

### P2 — professional and maintenance depth

#### P2-01 — Change integration: branch, merge, review, and release evidence

**Status:** `underpowered`. Chapter 13 covers GitHub action boundaries and
Chapter 21 covers push/release responsibility, but the English course does not
walk through a conflict, review comment, merge decision, or release rollback.

**Insertion map:** Chapter 16 after the lifecycle table (`:34-53`) for the
  engineering path; Chapter 21 after the responsibility matrix (`:39-51`) for
  team governance. Use a redacted local Git fixture: conflicting edits,
  reviewer objection, corrected diff, and explicit “not pushed” endpoint.

#### P2-02 — Observability and incident handoff

**Status:** `missing as a named operational mechanism`. The field research
  records hidden output, no-progress waits, approval invisibility, and
  resume-state ambiguity, but the chapters mostly teach a per-task evidence
  record. A real team also needs a compact incident handoff: timeline, impact,
  last known good, current unknown, owner, next check, and escalation boundary.

**Insertion map:** Chapter 12 after the run record (`:534-574`) and Chapter 21
  after the capability package (`:53-74`). Add a small incident card and one
  “handoff to a second operator” exercise. Link to
  `docs/research/coding-agent-observability-and-evidence-map-2026-08-11.md`.

#### P2-03 — Regression and retirement proof for Skills/workflows

**Status:** `underpowered`. Chapter 19 provides a three-task smoke comparison
and Chapter 22 provides impact analysis, but there is no explicit before/after
regression gate for a Skill or workflow after its prompt, reference, dependency,
model, or permission changes.

**Insertion map:** Chapter 19 after the smoke test (`:104-202`) and Chapter 22
after the update flow (`:81-134`). Require a frozen task-set version, baseline
scores, changed variable, rerun scores, failure delta, and retain/block/retire
decision. A larger directory or passing validator must not count as regression
proof.

#### P2-04 — Search and task-oriented retrieval

**Status:** `missing as a reader-facing mechanism`. Existing architecture
research explicitly identifies search as an index contract, but the English
book exposes a table of contents and learning path without a practical “find by
symptom/task/asset” exercise.

**Insertion map:** `book/README-EN.md` after “Where to enter the book” (`:47-82`)
  should offer task, failure, Skill, and chapter entry points. Add a small
  retrieval exercise using the existing `docs/research/field-problem-to-practice-map-2026-08-11.md`
  and require the reader to locate one symptom, one lab, and one evidence
  record. This is a reader-facing information-architecture addition, not a
  request to duplicate prose.

## Claims and evidence audit

### Claims that are properly bounded

- Chapter 1 separates model mechanism, Codex product behavior, and observable
  evidence rather than claiming access to hidden reasoning.
- Chapters 2, 8, 9, 12, and 13 repeatedly warn that UI labels, logins,
  configuration, diffs, builds, or screenshots do not prove stronger claims.
- Chapters 14, 17, and 21 explicitly separate synthetic, redacted, candidate,
  and production evidence.
- Chapter 19 keeps `not_run`, `not_comparable`, cost basis, and reviewer fields
  separate; Chapter 22 separates `claim_status` from execution/content status.

### Claims or status statements needing correction before release

1. [`book/README-EN.md:59-60`](../../book/README-EN.md#L59) says only chapters
   1–9 have English source files and the remaining chapter bodies are pending.
   It conflicts with the 22 English files and the table of contents. Correct
   the reader-facing status before calling the English route complete.
2. [`book/table-of-contents-EN.md:14-21`](../../book/table-of-contents-EN.md#L14)
   says 13 real experiment files while the working tree now contains four
   additional English lab candidates. Either register them as part of the
   declared corpus or keep them out of the public route; do not leave two
   inventories in circulation.
3. [`docs/project-map-EN.md:88-90`](../../docs/project-map-EN.md#L88) is already
   current about chapters 1–22, but its neighboring file descriptions and the
   book README need to agree. This is a consistency repair, not a new teaching
   claim.
4. The four untracked English labs and the five untracked research/ADR files
   are not evidence of a published curriculum until they are intentionally
   staged, validated, and included in a release. The report deliberately does
   not stage or commit them.

## Proposed insertion map

| Order | Reader destination | New or strengthened artifact | Dependencies | Completion evidence |
| --- | --- | --- | --- | --- |
| 1 | `book/README-EN.md` | Correct English coverage statement; task/failure/Skill entry map | Current chapter and field-problem indexes | Links resolve; no contradictory migration claim |
| 2 | Chapter 2 + Chapter 8 | One canonical local vertical slice | Lab 001, existing sandbox, project validators | Baseline, diff, focused check, failure, recovery, handoff |
| 3 | Chapter 9 + Chapter 12 | Shared failure taxonomy and resume/timeout record | Field problems P2-01/P2-05; labs 014/015 | Each failure ends in a bounded decision and evidence row |
| 4 | Chapters 11 + 14 | Fresh-context Skill behavior and adoption audit | Seven Skill contracts; lab 017; quality standard | Positive, boundary, failure, transfer, discovery-stage records |
| 5 | Chapter 5 + Chapter 16 | Environment/dependency diagnostic card | Runtime evidence section and engineering fixture | CWD, root, versions, lockfile, command, exit code, no automatic install |
| 6 | Chapters 4 + 17 + 13 | Redaction/data-minimization exercise | Synthetic Product Context and action matrix | Redaction manifest, residual-risk note, deletion/retention decision |
| 7 | Chapter 6 + Chapter 19 | Budget and calibrated evaluation card | Existing smoke task set and evaluation framework | Frozen rubric, time/context/cost basis, independent scores, disagreement log |
| 8 | Chapters 16 + 21 | Local Git change-integration and incident-handoff exercise | Team capability package and action boundaries | Conflict/review/release record; last-known-good incident handoff |
| 9 | Chapter 19 + Chapter 22 | Regression/retirement gate | Existing task set, impact matrix, update flow | Before/after scores, failure delta, retain/block/retire decision |
| 10 | Book guide/site entry | Task, failure, Skill, and chapter retrieval route | Navigation and locale manifests | One symptom reaches its chapter, lab, and evidence record in English |

## Recommended editing order

1. Repair the conflicting English status and lab inventory before adding more
   prose. Readers must be able to trust the map.
2. Ship one complete vertical slice and one resume/failure lab. These produce
   more practical value than expanding all 22 chapter bodies evenly.
3. Consolidate the repeated state/evidence/permission passages into shared
   records, then make each later chapter add a domain-specific decision.
4. Add environment diagnosis, redaction, cost/latency budgets, and reviewer
   calibration. These are common work blockers not yet represented as complete
   exercises.
5. Only after the English route is coherent, register and translate the lab
   additions. A translated index cannot compensate for an unrun English lab.

## Definition of evidence for the next pass

Do not promote a proposed addition from `candidate` merely because its file
exists or its validator passes. For each new practical unit, retain:

- a fixed, redacted input and revision/hash;
- the exact task protocol and allowed action boundary;
- expected output and acceptance rubric;
- one positive, one boundary, and one failure input;
- raw output, command/exit data, diff or rendered artifact, and unknowns;
- a bounded recovery or rollback record;
- independent review or calibration where a human score is claimed; and
- the environment, access date, source/license boundary, owner, and next review.

The current project’s own status vocabulary is appropriate: use `draft`,
`candidate`, `verified`, `not_run`, `not_comparable`, `blocked`, and
`production-ready` only within their declared scopes. A polished screenshot,
static contract, successful build, or generated index is not a substitute for
the relevant runtime, human, security, or user-acceptance evidence.

## Existing records consulted

- [`docs/research/content-value-upgrade-plan-p2-2026-08-11.md`](content-value-upgrade-plan-p2-2026-08-11.md) — prior P0/P1/P2 addition plan; this audit checks which proposals are visible in the English corpus.
- [`docs/research/field-guide-content-and-visual-gap-audit-2026-08-11.md`](field-guide-content-and-visual-gap-audit-2026-08-11.md) — reader-facing and visual gap audit.
- [`docs/research/field-problems-deep-dive-p2-2026-08-11.md`](field-problems-deep-dive-p2-2026-08-11.md) — resume, protocol, environment, discovery, MCP, and bounded-wait field mechanisms.
- [`docs/research/field-problem-to-practice-map-2026-08-11.md`](field-problem-to-practice-map-2026-08-11.md) — current problem-to-chapter/lab mapping.
- [`docs/research/tutorial-value-and-knowledge-base-benchmark-2026-08-11.md`](tutorial-value-and-knowledge-base-benchmark-2026-08-11.md) — task/failure/Skill retrieval and capability-unit structure.
- [`docs/research/web-methods-synthesis-2026-08-10.md`](web-methods-synthesis-2026-08-10.md) — source-driven task protocols, evaluation, Skill lifecycle, and team handoff methods.
- [`docs/research/README.md`](README.md), [`docs/quality/evaluation-framework.md`](../quality/evaluation-framework.md), and [`docs/skill-registry.md`](../skill-registry.md) — evidence, evaluation, and Skill status conventions.

## Audit limitations

This report is a static, read-only curriculum audit. It did not run Codex,
Skills, external services, model comparisons, learner studies, browser
acceptance, or production workflows. It therefore identifies practical-value
and repetition risks; it does not claim that any proposed mechanism is already
implemented, verified, or effective for every account or surface.
