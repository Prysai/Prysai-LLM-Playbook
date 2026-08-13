<!-- content_id: chapter-10-planning-and-slicing | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 10: Planning and vertical slicing

**Status:** `candidate`. **Experiment status:** `not_run`. This chapter is an
original English source chapter. Its experiment is a low-risk exercise that
the reader can run locally; the project has not run it as part of this edit.

## The problem this chapter solves

“Build the whole feature,” “finish the website,” and “make the workflow
production-ready” sound like goals, but they are not yet workable plans. Each
one hides several kinds of uncertainty:

- what a user should be able to observe first;
- which assumption must be true before the next action is useful;
- which files, services, or people are inside the allowed boundary;
- how to tell a partial result from a usable result; and
- what should happen when a command stalls, a model becomes unavailable, or
  the request changes halfway through.

An Agent can produce a long plan that looks organised while postponing the
first meaningful evidence until the end. It can also complete a technically
small task that has no usable hand-off: the files changed, but nobody knows
what to run, what remains unproven, or whether a retry would repeat a side
effect.

The useful unit of work is therefore not a line in a to-do list. It is a
bounded, observable delivery slice: a small change that produces a result,
records its evidence, declares its limits, and leaves a safe interface for the
next slice.

![Teaching card: lifecycle checkpoints turn a large goal into evidence-bearing exits](../../assets/teaching/lifecycle-checkpoints.svg)

> This is a project-owned teaching card. It illustrates a planning method; it
> is not evidence that an Agent, Skill, command, or external service ran.

## Learning objectives

By the end of this chapter, you should be able to:

- turn a vague outcome into three to seven delivery slices with explicit
  dependencies;
- distinguish a horizontal technical plan, a vertical slice, and a cheap
  discovery probe;
- write a slice card with an outcome, inputs, allowed actions, non-goals,
  evidence, change budget, stop condition, and hand-off interface;
- place checkpoints before irreversible work and preserve enough state to
  recover after interruption or context loss;
- design a retry that is narrow and idempotent instead of blindly continuing
  against a half-finished result; and
- hand another person an honest record of what is done, what is blocked, and
  what the available evidence still cannot prove.

## A real-world entry point: the plan must survive interruption

The project's field reports contain several useful warnings about long,
multi-step Agent work. A public Codex issue describes a capacity error during a
task and uncertainty about what a later continuation might do to an unfinished
working tree. Another report describes a formatting or validation command that
stays in `Working` for a long time without a completion signal. A Hacker News
discussion describes the broader need to externalise plans, TODOs, and state
when a complex task outgrows one conversation.

These are reports, not universal product diagnoses. They do not prove a queue
semantics, a root cause, a fix for every account, or a guarantee about a
particular release. They are valuable here because they expose the planning
question that remains valid even when the cause is unknown: can a person tell
what was last confirmed before deciding whether to continue?

| Reported symptom | What the evidence supports | What it does not prove | Planning response |
|---|---|---|---|
| A model becomes unavailable during a long task | A reporter observed an interrupted run and an uncertain partial state | The service-side cause, queue behaviour, or behaviour for every account | Freeze new instructions; inspect the worktree, last output, and checkpoint before retrying one slice |
| A formatter or validation command remains in `Working` | A reporter observed no useful completion signal in that run | A universal deadlock or the exact child process at fault | Set a bounded no-progress threshold and save stdout, stderr, exit code, and changed files |
| A complex task needs visible TODOs or plans | A community discussion reports that external state can make long work easier to follow | That a visible plan improves every model or task | Require a decision summary, diff, check result, and next action; do not treat a spinner as delivery evidence |

The distinction matters. A plan is not a promise that the Agent will finish. It
is a control surface that lets a person pause, inspect, and make the next
decision without guessing.

<a id="core-evidence-bearing-slice"></a>

## The mechanism: from outcome to evidence-bearing slices

### 1. Name the result before naming the work

Start with a sentence a user, reviewer, or downstream system could observe:

> A new contributor can read one page, run one local check without network
> access, and see a clear pass or fail result.

That sentence is stronger than “build the documentation pipeline.” It gives the
plan something to protect. Rewrite it as a result card:

```text
Outcome: what someone can now do or inspect
Inputs: files, data, assumptions, and preconditions
Allowed actions: the exact surface and mutation types permitted
Non-goals: attractive work that is deliberately postponed
Evidence: the file, diff, command output, test, screenshot, or review record
Risk: secrets, external calls, persistence, deletion, or irreversible change
```

If the outcome cannot be observed without every future feature, first design a
smaller outcome. “The API, UI, migrations, analytics, and deployment are all
complete” is a release milestone, not a first slice.

### 2. Draw dependencies as facts, not as a wish list

A dependency means “this must be true before the next action can produce a
meaningful result.” It is not merely “this item appears earlier in the ticket.”

For each proposed item, ask four questions:

1. **Depends on:** What exact state or evidence must already exist?
2. **Provides to:** What file, field, command result, or decision does it give
   to the next slice?
3. **Blocked by:** What missing input cannot be safely guessed?
4. **Dependency check:** What is the cheapest read-only check that proves the
   prerequisite is present?

This changes a vague sequence such as “database → API → UI → deployment” into
something inspectable:

```text
Slice A: a fixed sample record can be read locally
  provides: sample data shape and a passing read check
Slice B: one read-only endpoint returns that record
  depends_on: A; provides: observable API response
Slice C: one screen renders the endpoint response
  depends_on: B; provides: user-visible path
Slice D: the path is checked in a disposable build
  depends_on: C; provides: build output and reviewable diff
```

The arrows describe evidence and interfaces, not hidden Agent memory. If a
dependency is not checked, label it `assumed` rather than quietly treating it
as true.

### 3. Choose the right shape of plan

Three plan shapes are useful, but they answer different questions:

| Plan shape | What it is good for | Typical failure | Use it when |
|---|---|---|---|
| Horizontal | Showing all technical layers, ownership, or release prerequisites | The first real user result is postponed until many layers are finished | You need a capacity map or an ownership review |
| File/order based | Locating edits and keeping a small change easy to review | The plan follows repository order instead of user value | The change is already understood and genuinely local |
| Vertical | Proving one thin path from input to observable result | The first slice is made too broad and quietly becomes “the whole feature” | You need early feedback, a reversible experiment, or a hand-off |

<mark class="highlight-text highlight-cyan">A vertical slice is not “a small piece of the backend.”</mark> It crosses only the
minimum boundaries needed to demonstrate one outcome. It may touch a document,
a script, and a test, but it should leave out unrelated polish, extra roles,
production data, and future abstractions.

Use a **probe** instead when the main question is still unknown. A probe is a
cheap read-only or reversible investigation, such as checking whether a
dependency exists, rendering one sample, or confirming that a harmless tool
call can reach its intended surface. Do not pretend a probe is product work.
Its output should be a decision: continue, narrow, or stop.

### 4. Use a slice card, not a pile of tasks

Copy this compact schema into a task record:

```text
slice_id: S-01
outcome: one observable user or team result
depends_on: exact state, file, or evidence required first
provides_to: the next slice's input or decision
inputs: named files, fixtures, versions, and assumptions
allowed_actions: paths and action classes permitted in this slice
non_goals: what will not be changed, installed, published, or inferred
change_budget: expected files, commands, and external effects
acceptance_evidence: the exact proof required to call this slice passed
failure_signal: what a failed or stalled run will look like
stop_condition: when to preserve state and ask for a decision
recovery: the one smallest safe retry or rollback path
handoff: status, evidence paths, remaining risk, and next action
```

The fields prevent a common substitution: replacing “a person can do X” with
“the Agent edited files Y and Z.” Files are implementation evidence. They are
not automatically delivery evidence.

### 5. Set a change budget and a checkpoint

Before execution, estimate a deliberately narrow budget:

- files that may change;
- commands that may run;
- maximum retry count or no-progress interval;
- whether network, credentials, installation, or persistent state is allowed;
- the human confirmation required before an irreversible action; and
- the artifact that will be saved if the slice stops.

The budget is not a prediction of token usage. It is a boundary for side
effects. If the slice requires a file outside the budget, a new dependency, a
production credential, or a different repository, stop and update the plan.
“It was needed for verification” does not silently grant installation or
deployment authority.

At each checkpoint record at least:

```text
goal and current slice:
completed actions and evidence:
worktree / branch / target path:
files changed and baseline comparison:
last command, output, and exit status:
permission and external-effect state:
open assumptions or blockers:
next single action:
```

The checkpoint must live outside the Agent's short-term conversation state. A
small Markdown file, issue note, or approved task record is enough. Do not put
secrets, cookies, tokens, or private credentials in it.

### 6. Decide whether a slice is actually small enough

A slice is probably too large when its title contains more than one independent
user outcome, mixes implementation with migration and release, needs several
different acceptance authorities, or can fail in multiple layers without a
first breakpoint. Split it when the first useful evidence would arrive only at
the end.

A slice is probably too small when it creates an isolated file that cannot be
read, run, reviewed, or connected to any observable behaviour, or when it is
only a private refactor required by a later slice. Merge it with the nearest
observable slice unless the refactor is itself a deliberate probe.

The practical test is:

> Can a reviewer who was not in the conversation inspect the artifact and
> answer “what changed, how was it checked, what is not proven, and what can I
> safely do next?”

If not, the slice needs a better interface or a smaller outcome.

<a id="core-evidence-bearing-slice-end"></a>

## A reusable planning prompt

Use the following as a starting protocol. Replace the example values; do not
paste it unchanged into a production task.

```text
Goal
Deliver one vertical slice: [observable result for a named user or reviewer].

Context and inputs
- Repository/workspace: [absolute path or approved surface]
- Relevant files and fixtures: [exact paths]
- Baseline: [branch/commit/hash/status or saved copy]
- Known assumptions: [facts not yet confirmed]

Scope contract
- Allowed actions: [read/edit/run/check, with exact paths]
- Change budget: [files, commands, retry/time limit]
- Non-goals: [features, installs, network calls, deploys, or cleanup excluded]
- Human confirmation required before: [irreversible or external actions]

Slice design
- depends_on: [precondition and its cheap check]
- provides_to: [next slice's exact input]
- acceptance_evidence: [diff, command output, test, render, or review record]
- failure_signal: [observable error, missing output, timeout, or scope drift]

Execution rules
1. Inspect the baseline and report any existing changes before editing.
2. Write a slice card and checkpoint before the first mutation.
3. Take the smallest action that can produce the stated evidence.
4. After each action, report the changed state; do not infer success from a
   spinner, token count, or your own completion summary.
5. If a dependency is missing, the target path disagrees, the command has no
   useful event for [time limit], or the budget is exceeded, stop and preserve
   the checkpoint. Do not install, publish, delete, or broaden permissions.
6. On recovery, re-read the target, compare the baseline and diff, and retry
   only one idempotent action with one changed variable.

Delivery
Return: status (passed / blocked / unverified), changed files, exact evidence,
failed attempts, remaining unknowns, rollback or recovery path, and the next
single action. Do not call the slice complete if its acceptance evidence is
missing.
```

The prompt does not make an Agent reliable by itself. Its value is that it
turns a conversational request into a contract that another person can audit.

## Small experiment: three plans, one safe slice

This experiment compares planning shapes without network access, installation,
credentials, commits, pushes, deployment, or production data. Use a temporary
directory, not a working tree containing someone else's changes.

### Setup

Create a temporary folder containing a `README.md` with only:

```markdown
## Slice Lab

Starting point. The page does not yet explain what changed or how to check it.
```

The acceptance target is deliberately small: a reader must be able to see a
`What changed` section and a `How to verify` section. The local check is a
read-only search. On PowerShell:

```powershell
$text = Get-Content -Raw README.md
$required = '# Slice Lab', '## What changed', '## How to verify'
$missing = $required | Where-Object { $text -notmatch [regex]::Escape($_) }
if ($missing) { $missing | ForEach-Object { "MISSING: $_" }; exit 1 }
'PASS: required headings found'; exit 0
```

On another shell, use an equivalent no-network check that returns a non-zero
status when either heading is absent. Record the command you actually use.

### Task

Write three plans for the same goal, each with no more than seven items:

1. a horizontal plan divided into writing, tooling, review, and release;
2. a file-order plan that follows the order in which files would be touched;
3. a vertical plan that makes the smallest readable and checkable page first.

Every item must have a result, dependency, evidence, and stop condition. Then
execute only the first item of the vertical plan by adding the two headings and
one truthful sentence under each. Do not add styling, links, a build system, or
future sections.

Before and after the edit, record the target path and the diff. Run the local
check once. Your evidence record should let a stranger answer:

- What was the baseline?
- Which plan produced the first observable result sooner?
- Which files changed?
- What exact command ran, and what was its exit status?
- What remains deliberately out of scope?

### Expected evidence

Save a small `slice-record.md` in the temporary folder (or an equivalent
approved note) containing:

```text
baseline: README.md before the edit
chosen_plan: vertical
changed_files: README.md only
check: [exact command]
result: [exact output and exit status]
acceptance: passed / failed / not_observed
not_proven: styling, build, deployment, user acceptance
next_slice: [one bounded next action]
```

The expected artifact is not “a beautiful README.” It is a small, reviewable
change plus enough evidence to decide whether the next slice is safe.

## Intentional failure: make the breakpoint visible

Now create one controlled failure. Remove `## How to verify` from `README.md`,
or change the check to read a path that does not exist. Run the check once and
save the non-zero output. Do not add a dependency, change permissions, or
rewrite the whole page to make the error disappear.

The observable signal should be one of these:

- `MISSING: ## How to verify` with a non-zero exit status; or
- a clear file-not-found error for the wrong target path.

Classify the failure before recovering:

| Signal | Classification | First recovery |
|---|---|---|
| A required heading is missing | Content acceptance failure | Restore only the missing heading, then rerun the same check |
| The check points at the wrong file | Test/input failure | Re-read the target path and correct the check only if the slice contract allows it |
| No output arrives within the chosen threshold | Unknown execution state | Stop waiting; preserve the command, time, process state, and diff |
| The fix needs an install, network call, or broader path | Scope/authority failure | Stop and request a new decision; do not “repair” the environment silently |

After recovery, write what changed and what the failure did **not** prove. A
failed check proves that this check did not pass for this input. It does not
prove that the whole repository is broken, that the Agent is broken, or that a
larger rewrite is justified.

## Recovery and stop conditions for real work

When a long task is interrupted, do not send an unconditional “continue.” Use
this sequence:

1. **Freeze new side effects.** Do not queue another write, external request,
   install, delete, or deploy while the state is unclear.
2. **Inspect the last known state.** Read the checkpoint, `git status`, the
   relevant diff, the last command output, and the actual target path.
3. **Classify the breakpoint.** Mark it as missing input, scope drift,
   validation failure, infrastructure/timeout, permission, or unknown.
4. **Choose one bounded action.** Prefer a read-only probe or an idempotent
   retry against the smallest slice. Change one variable only.
5. **Update the checkpoint.** Record the new evidence and whether the next
   slice is still valid.
6. **Stop or hand off.** If the cause remains unknown, the retry budget is
   exhausted, or the target has changed, deliver a blocked hand-off rather
   than stacking more edits.

Use rollback only when the partial state is unsafe, misleading, or too costly
to carry forward. Preserve the failure evidence before rolling back, and do
not discard pre-existing user changes merely to obtain a clean-looking tree.
When a partial artifact is safe and informative, keep it and mark it
`partial` or `unverified`.

The stop rule can be stated plainly:

> No new evidence, no new authority, or no stable target means no automatic
> continuation.

This rule is especially important after context compaction, model-capacity
errors, a long-running command, a changed worktree, or a prompt that now asks
for a different outcome. The conversation summary may preserve intent without
preserving the exact file state, process state, or external side effects.

## Expected artifact: a hand-off another person can run

A complete slice leaves these artifacts, even when the result is blocked:

1. **Slice card:** outcome, dependencies, scope, evidence, budget, and stop
   conditions.
2. **Checkpoint:** the last confirmed state, target identity, changed files,
   command result, and next action.
3. **Implementation diff or explicit no-change record:** what actually moved.
4. **Verification record:** exact command, environment, exit status, output,
   and the scope of the check.
5. **Failure record:** failed input, observable signal, attempted recovery, and
   why another retry was or was not safe.
6. **Handoff note:**

   ```text
   status: passed / partial / blocked / unverified
   done: [claims supported by evidence]
   changed: [exact paths or none]
   evidence: [links or artifact paths]
   not_proven: [runtime, external, visual, security, or user claims absent]
   risks: [remaining side effects or assumptions]
   next: [one bounded action]
   owner: [person or team]
   ```

The hand-off is part of the slice, not paperwork added after the “real work.”
Without it, the next person must reconstruct state from a long transcript and
may repeat an action that already happened.

## Reflection

Before you leave this chapter, write down one current task that is still too
large to hand to another person. Which first slice would produce the earliest
meaningful evidence? Which action, input, or decision must remain explicitly
out of scope? If the task were interrupted after that slice, what record would
let someone resume without guessing?

## Transfer task

Choose one real but low-risk task from another domain and produce three to seven
slice cards:

- **Engineering:** add one read-only endpoint and one screen that renders a
  fixed fixture. Exclude authentication, analytics, and deployment from the
  first slice.
- **Research:** answer one narrow question with a source table, an uncertainty
  column, and a clearly bounded conclusion. Do not call search results a
  verified fact until the source is checked.
- **Marketing:** turn one approved product context into one audience-specific
  draft and one reviewable experiment. Exclude publication and live audience
  data from the first slice.
- **Skill design:** describe one trigger, input schema, allowed actions,
  expected output, failure path, and review date. Do not install or invoke an
  unreviewed external Skill as part of the planning exercise.

For each domain, ask a colleague—or a fresh Agent context—to inspect the cards
without oral explanation. Their job is to identify one hidden assumption and
one missing acceptance signal. Revise the cards, not the reviewer’s memory.

## Acceptance checklist

- [ ] I can state the first user- or reviewer-observable outcome in one sentence.
- [ ] I can separate a horizontal plan, a file-order plan, a vertical slice,
      and a discovery probe.
- [ ] Every slice has `depends_on`, `provides_to`, a dependency check, and a
      named non-goal.
- [ ] Every slice has an evidence rule that is stronger than “the Agent said it
      finished.”
- [ ] I have set a file/action/change budget and a checkpoint before any
      irreversible action.
- [ ] I can recognise when a plan is too large because it postpones the first
      meaningful evidence.
- [ ] I can recognise when a plan is too small because it produces no
      observable behaviour or reviewable interface.
- [ ] I can stop after a timeout, scope change, missing authority, or unknown
      target without automatically stacking edits.
- [ ] I can recover from a partial result by re-reading state and changing one
      variable at a time.
- [ ] I can hand off done, partial, blocked, unverified, not-proven, and next
      without mixing them together.
- [ ] I can explain that this chapter's exercise is `not_run` until a local run
      record and review exist.

## Sources and update boundary

The planning method in this chapter is a project-authored synthesis. The
distinction between a user report, an official product fact, a project
inference, and a local reproduction is deliberate. The public cases below are
inputs for boundary analysis, not copied instructions, official root-cause
findings, or local verification.

| Topic | Source and access date | Evidence boundary | Owner / next review |
|---|---|---|---|
| Task protocols should include goal, context, constraints, acceptance, stop, recovery, and delivery | [Prompt patterns for real work](../../docs/research/prompt-patterns-for-real-work-2026-08-10.md), accessed 2026-08-11 | Project research synthesis; not a vendor-mandated prompt format | `curriculum-maintainer` / 2026-09-11 |
| Capacity interruption and long-running verification can leave state unclear | [Field problems and prompt patterns P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md) and [field-problems deep dive](../../docs/research/field-problems-deep-dive-2026-08-11.md), accessed 2026-08-11 | Public user reports; no universal cause, repair, or local reproduction is claimed | `curriculum-maintainer` / 2026-09-11 |
| External checkpoints, vertical slices, and a complete hand-off are high-value curriculum additions | [Content value upgrade plan P2](../../docs/research/content-value-upgrade-plan-p2-2026-08-11.md), accessed 2026-08-11 | Project planning recommendation; the proposed experiment remains `not_run` | `curriculum-maintainer` / 2026-09-11 |
| Current Codex entry points, permissions, models, command flags, and UI states | [OpenAI Codex baseline](../../docs/research/openai-codex-baseline.md) and [official Codex documentation](https://developers.openai.com/codex/), reviewed 2026-08-11 | Volatile product facts; recheck the official source before copying a command or menu label | `curriculum-maintainer` / 2026-09-11 |

Do not copy text, screenshots, code, or Skill instructions from the linked
reports or external sites. This chapter uses their findings as research input
and records the project-owned planning method in original prose. Commands in
the experiment are deliberately local and no-network; they do not establish
how every Codex surface, operating system, model, or provider behaves.

## Practice the recovery boundary

Use [Lab 014: Reconcile a resumed task before continuing](../labs/lab-014-resume-reconciliation-EN.md)
when a task returns after interruption, context loss, or a change of branch or
permission state. The Lab requires a current-state probe before any resumed
action; it does not treat a prior plan as evidence that the environment is
unchanged.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-EN.md" aria-label="Previous chapter: Chapter 9 · Verification, doubt, and recovery">← Previous<br><strong>Chapter 9 · Verification, doubt, and recovery</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-EN.md" aria-label="Next chapter: Chapter 11 · Design a genuinely useful Skill">Next →<br><strong>Chapter 11 · Design a genuinely useful Skill</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
