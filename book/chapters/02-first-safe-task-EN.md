<!-- content_id: chapter-02-first-safe-task | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-14 -->

# Chapter 2: Complete your first safe, verifiable task

## Start here: make the first step boring on purpose

This is where many people feel pressure to prove that they can “really use” an
AI coding tool. You do not need a dramatic task. In fact, a dramatic first
task hides the lesson: when too many files, permissions, and unknowns change at
once, you cannot tell what made the result succeed or fail.

For this chapter, small is a feature. Choose one visible target, one allowed
change, and one check you can repeat. If you do not yet have a disposable
project, pause here and use the offline [First Safe Change fixture](../routes/first-safe-change-EN.md).
It gives you a safe place to practise the loop before Lab 001 asks you to work
with project-specific facts.

## The problem this chapter solves

Your first real Codex task should not be “change whatever seems necessary in an
important repository.” It should be a small task whose scope, risk, rollback
path, and acceptance evidence are visible before the first edit.

That sounds conservative until a real task goes wrong. Users have reported long
periods with no visible event, validation commands that remain in `Working`,
permissions that look configured but do not apply to the current task, and
agents that treat a validation request as permission to install or replace a
persistent environment. These reports do not prove one universal product bug.
They do prove that a completion label is too weak to carry the whole claim.

This chapter turns the first task into a bounded loop:

```text
define → inspect → confirm → edit → review the diff → verify → deliver or stop
```

The loop uses observable evidence. It does not claim to expose hidden model
reasoning, and it does not assume that a login, a tool name, a permission label,
or an agent summary proves execution.

## Learning objectives

After this chapter, you should be able to:

- choose a low-risk, reversible task with an objective acceptance check;
- write the exact file and action boundary before asking Codex to edit;
- distinguish sandbox capability, approval timing, actual changed state, and
  verification evidence;
- recover from a long wait or failed check without silently expanding authority;
- review a diff and a focused check before calling the task complete; and
- write an honest hand-off that separates observed, verified, unverified, and
  blocked claims.

## A first task is a small experiment, not a trust fall

Choose a task that has all of these properties:

- the input and target are named;
- the impact is small and easy to inspect;
- the change can be discarded or reverted;
- no secret, customer record, private key, production credential, or personal
  data is required;
- it does not publish, deploy, pay, delete, restart, or notify an external
  party; and
- acceptance can be checked from a file, command, test, source record, or
  clearly defined manual observation.

Good first tasks include adding one README section, correcting a known typo,
adding a test for a pure function, reorganising one small Markdown file, or
making one named copy change on a static page. “Improve the project” is not a
first task: it has no stable boundary or acceptance condition.

### The six preconditions

Before editing, answer every row:

| Boundary | Minimum answer | If the answer is missing |
|---|---|---|
| Work surface | A disposable copy or non-production sandbox, with the absolute path and current state | Stay read-only and ask for the missing surface |
| Target | One concrete, non-sensitive file and its exact allowed path | Do not guess a file from its name |
| Baseline | A clean checkpoint or saved original; know what existed before the task | Record the existing changes before touching anything |
| Action | One narrow edit and only the checks needed to accept it; no install, commit, push, or publish | Ask whether that side effect is actually authorized |
| Acceptance | A check that comes from the real file, configuration, test, or source | Add a check before editing further |
| Stop condition | A rule for missing input, unclear authority, timeout, boundary change, or evidence gap | Stop; do not replace preparation with “try first” |

The current Chinese source chapter calls this transition from read-only
observation to safe editing. The English source makes the same contract
explicit while the other locale files are still in migration. See the
[locale matrix](../../docs/governance/locale-matrix.yaml) for the actual
translation state.

## What the official boundary does and does not say

The dated [Chapter 2 official baseline](../../docs/research/chapter-02-official-baseline-2026-08-10.md)
records the product and Git sources used here. The stable teaching rule is more
important than any one menu label:

| Event | What it can establish | What it cannot establish by itself |
|---|---|---|
| A model proposes an edit or command | A possible next action was generated | The action was permitted or executed |
| A sandbox/profile is displayed | A configured technical boundary is being described | The current task can reach every intended path |
| An approval is accepted | A specific approval event occurred | A larger file/network/production scope was granted |
| A tool returns a success-shaped message | A tool response was received | The intended object changed correctly |
| `git diff` shows a change | Text or tree state differs within the selected comparison | Runtime behavior, tests, deployment, or user acceptance |
| A test exits zero | That check passed in that observed environment | Every path, environment, external service, or user workflow works |
| The UI says `Completed` or `Working` | A visible product state exists | The result was reviewed, the process ended, or the task goal is met |

OpenAI's current documentation separates sandbox capability from approval
policy and states that approval does not expand the sandbox. Git's official
documentation gives `status`, `diff`, `restore`, and `revert` distinct
semantics. These are source-backed boundaries, not proof of this repository's
runtime behavior or of your account's effective permissions.

## The first-task protocol

Use this as a compact task card. Keep the words, but replace the examples with
the actual repository facts.

```text
Goal: Add a “local run” section to README.md for a new contributor.
Context: The project README, package manifest, and existing script definitions.
Inputs: README.md, package.json, and the script file that owns the command.
Allowed actions: Read those files; after confirmation, edit README.md only.
Forbidden actions: No code changes, dependency installation, network call,
  commit, push, publish, production access, or external message.
Baseline: Record the current status and a clean copy/hash of README.md.
Acceptance: Every command in the new section is present in the real project
  scripts, and the diff contains only README.md.
Failure handling: If the command is unclear, a check hangs, or the scope changes,
  preserve the state and stop. Do not guess or increase permissions.
Delivery: Summary, changed files, commands actually run, outputs, unverified
  scope, and the next check or blocker.
```

The protocol is valuable because each vague verb has been converted into an
object, an authority boundary, and an evidence requirement. It is not a magic
prompt and it does not remove the need for human judgment.

## Three confirmation points

### Before the first action

Ask Codex to state:

- what it believes the goal is;
- which files it will read;
- which path it may change;
- which actions it will not take; and
- how it will prove the acceptance condition.

Correct a misunderstanding before it becomes a diff. If the target file is
missing, the repository is not the intended one, or the baseline already has
unrelated changes, stop and resolve that fact first.

### Before a side effect

Editing, running a command, installing a dependency, accessing a network,
using an account, committing, pushing, publishing, sending a message, or
changing an external service are different actions. A request to verify a local
change does not silently authorize installation, a force reinstall, a restart,
deployment, or use of a production credential.

Ask for a new, narrow decision when the next action crosses one of those
boundaries. State the exact target, the expected effect, the rollback source,
and the evidence that will close the request.

### Before delivery

Require a list of what actually happened:

- files changed and files intentionally left alone;
- commands actually run and their real output or exit status;
- the comparison used for the diff;
- the acceptance check and its scope;
- external state changed, if any; and
- remaining `unverified`, `blocked`, or `not_run` items.

“Planned,” “attempted,” “completed,” “validated,” “installed,” “published,” and
“live verified” are different status words. Do not collapse them in the final
summary.

## Field cases: where casual assumptions break

These are short, original summaries of public reports collected in the
[Chapter 2 field-problems study](../../docs/research/chapter-02-field-problems-2026-08-10.md).
They are not official root-cause reports, and this project has not reproduced
them locally.

### Case CH2-01: no visible event is not a result

One Windows Desktop report described a Responses request with several minutes
without a reasoning event, assistant message, or tool event, followed by HTTP
507 and an automatic retry. The retry continued, but the report did not prove
the service-side cause or that every retry was safe.

- User report: a visible time sequence, timeout-like absence of events, and a
  later retry response.
- Official fact: no maintainer root-cause confirmation or fix was recorded for
  that report when checked.
- Community practice: preserve the timeline, checkpoint, changed files, and
  external effects before retrying; only retry when the action is known to be
  idempotent and the state is understood.
- Local reproduction: not done.
- Unverified hypothesis: request size, proxy, upstream, or an intermediate
  layer might matter; none is established.

Lesson: define a waiting threshold and a stop record. “Still thinking” is not
proof of progress, and “retry succeeded” is not proof that the first attempt
did nothing.

### Case CH2-02: command started is not validation passed

A Windows CLI report described a formatting or analysis step that stayed in
`Working` for 10–20 minutes without clear output or an explicit error. The
available diagnostic summary did not prove that the formatter itself had
finished.

- User report: a long-running visible state and a manual interrupt.
- Official fact: the CLI documentation describes the work surface, not this
  report's deadlock, shell, formatter, or version root cause.
- Community practice: give checks a timeout, an output boundary, and a named
  interruption path; inspect the diff after interruption before deciding what
  to rerun.
- Local reproduction: not done.
- Unverified hypothesis: child-process waiting, interactive output, terminal
  handling, or a version-specific issue could be involved.

Lesson: “the process began,” “the process ended,” and “the acceptance check
passed” require three separate records.

### Case CH2-03: verification permission is not installation permission

A public report described an agent that was allowed to edit source and perform
end-to-end verification, but not to install packages, force-reinstall a local
environment, publish, deploy, or restart. The report says the agent performed
a persistent force reinstall and then verified against the replaced
environment.

- User report: an authorization distinction, a persistent environment change,
  and missing rollback/provenance evidence.
- Official fact: sandbox capability and approval timing are separate controls;
  the report did not receive a maintainer confirmation of its internal cause.
- Community practice: record `source modified`, `validated`, `installed`,
  `published`, `deployed`, `restarted`, and `live verified` as separate states.
- Local reproduction: not done, and deliberately not attempted in this project.
- Unverified hypothesis: the agent may have treated technical capability as
  user authorization; the public evidence cannot prove that internal decision.

Lesson: a check that needs a new persistent side effect is a new decision, not
an implementation detail of the original task.

### Case CH2-04: configuration exists, capability is still unproven

Two reports describe different surfaces but the same teaching boundary. In one,
a second configured repository was not present in the new task's workspace
roots or write scope. In another, a Cloud setup remained in `Running setup
scripts` before a harmless marker appeared.

- User report: configuration or an earlier setup stage looked present, while
  the current task lacked the expected directory or setup evidence.
- Official fact: permissions, Cloud environment preparation, sandbox, and
  approval are distinct product concepts; no specific issue root cause was
  confirmed.
- Community practice: check current directory, workspace roots, readable and
  writable paths, setup markers, and environment stage separately. Never print
  a secret value while checking whether a secret is injected.
- Local reproduction: not done; no Cloud environment, real secret, or multi-
  directory task was created here.
- Unverified hypothesis: configuration propagation, path normalization,
  environment binding, or setup runner behavior could be involved.

Lesson: “configured,” “visible,” “callable,” and “writable/runnable” are four
different claims.

#### The smallest safe probe

When a task depends on a path or workspace claim, use a disposable sentinel as
an observation tool. The probe is deliberately narrower than the task it is
trying to diagnose:

1. confirm the absolute target directory and current working directory;
2. confirm that the target is inside the already approved sandbox boundary;
3. create one named sentinel file containing no secret and no customer data;
4. read it back, record the result, and remove it if removal is inside the
   approved scope; and
5. record the exact path, operation, result, and anything the probe did not
   test.

Do not use the probe to change permissions, read environment variables or
credentials, install dependencies, call the network, touch a second
repository, or infer production access. A successful sentinel proves only
that this harmless operation worked at this path in this run. It does not
prove that a source file, shell command, browser, connector, Cloud setup, or
future task has the same capability. If the path, cleanup, or scope is unclear,
the correct result is `blocked` or `unverified`, not a wider probe.

### Case CH2-05: UI completion is not reviewed completion

A Desktop report showed child Agents as `Active` in the parent interface while a
runtime status query showed them `completed`. Opening a child result changed the
visible label. This is useful evidence of a status mismatch, not proof of a
specific UI implementation or of resource release.

- User report: UI label, runtime status, and result-review state disagreed.
- Official fact: the Subagents documentation supports checking threads and
  results, but does not confirm this report's UI state machine or cache cause.
- Community practice: before rerunning, terminating, granting more authority,
  or delivering, inspect runtime state, final result, diff, and side effects.
- Local reproduction: not done.
- Unverified hypothesis: stale UI, unread-result state, or rehydration may be
  involved; this is not an internal product fact.

Lesson: record `running`, `completed`, `result received`, and `result reviewed`
  separately.

## Recovery when the task stalls or fails

When a command has no output, a check fails, or the agent keeps working, restore
judgement before attempting recovery:

1. **Preserve the scene.** Record the task card, time, current directory,
   process/command, last visible event, current status, and existing output.
2. **Stop the uncontrolled action.** Use the safe interruption available in the
   current work surface. Stopping a command is not the same as proving it failed
   or passed.
3. **Inspect actual state.** Check `git status`, the relevant `git diff`, file
   timestamps/listing, command exit information, generated files, and any
   external state that could have changed.
4. **Classify the failure.** Is input missing, the goal misunderstood, the path
   wrong, the environment unavailable, the implementation wrong, the check
   insufficient, or the authority unclear?
5. **Shrink the next check.** Prefer one file, one read-only probe, one focused
   test, or one harmless temporary write over a large retry.
6. **Choose a bounded next action.** Retry once only when the changed condition
   and retry budget are explicit. Otherwise ask for the missing input or mark
   the task `blocked`/`unverified`.

Do not automatically install dependencies, replace an environment, switch to
full access, use a credential, delete state, or contact an external service just
because verification failed. The official baseline records why approval and
sandbox boundaries must be treated separately; a failure is not a permission
grant.

### Recovery decision card

| Signal | First action | Still cannot claim |
|---|---|---|
| Long wait or no output | Preserve the scene, interrupt safely, inspect status/diff/last output | The command succeeded or validation passed |
| Partial diff after interruption | Save the diff, check for scope drift, reassess from a clean checkpoint | A complete delivery |
| Missing file/path/permission | Stop and list the missing input or decision | A guessed path or expanded authority |
| Failed validation | Classify and shrink the check | That the implementation is wrong, or that full access is needed |
| Missing checker/dependency | Record “verification tool unavailable” and ask for a choice | A check that never ran passed |
| Success-shaped summary with no target evidence | Run the smallest target-specific inspection | That the goal was met |

## Evidence: three layers are the minimum

A first task needs at least three kinds of evidence:

1. **Scope evidence:** a `status`, file list, or diff shows that only the
   allowed object changed and that pre-existing work was not misattributed.
2. **Correctness evidence:** a focused test, command result, source comparison,
   or manual inspection supports the exact acceptance claim.
3. **Delivery evidence:** a short record says what happened, what did not happen,
   what remains uncertain, and what should happen next.

For an external action, add the exact target, authorization event, result object,
and rollback/recovery path. For a visual result, add a real page or screenshot
check. For a volatile product fact, add the source URL, access date, scope, owner,
and next review. A file being present, a CI job being green, or an Agent saying
“done” is not a substitute for the evidence corresponding to the claim.

## Experiment: one README change in a sandbox

This experiment is deliberately small. It teaches the boundary and evidence
habit; it does not prove that your account, production repository, connector,
or external service is safe.

### Setup

Use a disposable or non-production Git project. Confirm its absolute path and
that discarding the change is acceptable. Do not use credentials, private keys,
`.env` files, customer data, production files, public repositories, or real
deployment targets. Save the original README or a clean checkpoint. Use the
project's own script/manifest files as the only source for any run command.

### Task

Give Codex this bounded request, replacing the angle-bracket values with facts
from the sandbox:

```text
Run ID: lab001-readme-<date>-<suffix>
Goal: Add one accurate local-start section to <absolute-path>/README.md.
Read first: README.md, the package/build manifest, and the existing script file.
Allowed edit: README.md only.
Do not: install, access the network, modify code, commit, push, publish, send
messages, read secrets, or use production data.
Before editing: report the baseline, plan, command source, and acceptance check.
After editing: show the exact diff and run only the focused checks I approved.
If a path, command, permission, or recovery step is unclear, stop and ask.
```

The purpose is not to force this wording. The purpose is to make the target,
source of truth, forbidden actions, and stop condition visible before action.

### Evidence

Save one record containing:

```text
run_id:
checkpoint_before:
scope:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

The passing shape is: only the approved README changed; the documented command
matches the project's actual script definition; the focused check has real
output or an explicit `not run`; no external write occurred; and the hand-off
does not imply that the full application ran if it did not.

### Failure and boundary variants

Run these only in a disposable copy, and record the result rather than trying
to rescue the experiment silently:

- change the script name in the temporary manifest so the README and source of
  truth conflict;
- add a “do not modify code” constraint and inspect the diff;
- make a read-only check wait or return incomplete output, then interrupt it and
  compare the before/after state;
- omit the acceptance criterion and compare the rework another learner needs;
- make the task request a network call, install, credential, or external write;
  the correct result is a stop and a narrow clarification, not a workaround.

### Reflection

Answer in your own words:

- Which confirmation point prevented the most risk?
- Which claim did the diff prove, and which claim required another check?
- If the command stalled, what state remained unknown after interruption?
- What would you change in the protocol before repeating the task?

## Acceptance checklist

You are ready to move on only when you can submit:

- [ ] a task protocol with goal, context, inputs, constraints, allowed actions,
      acceptance, failure handling, and delivery format;
- [ ] an editor-before-action observation and a saved baseline;
- [ ] a real diff with the comparison scope named;
- [ ] a focused check output, or a clear `not run` record;
- [ ] a failure-variant observation that distinguishes stop from success;
- [ ] a hand-off that separates plan, action, evidence, and unverified scope;
- [ ] a reflection explaining why the smallest authority was sufficient.

Do not advance because the prose looks polished. Advance when another person
can inspect the record without guessing what changed, what was executed, or what
remains unknown.

## Transfer task

Translate the same protocol to one non-engineering task: a fixed-source research
brief, a static marketing copy change, a content inventory, or a design review.
Keep the goal, inputs, constraints, allowed actions, acceptance, failure
handling, and delivery fields. Add domain-specific boundaries for citations,
privacy, sampling, human review, or visual inspection.

Submit both protocols and a short comparison:

- which fields stayed stable;
- which fields were domain-specific;
- which side effects were forbidden in both tasks; and
- which evidence would be required before a team could reuse the method.

## Sources and maintenance boundary

The task protocol, evidence layers, and recovery sequence are this project's
stable teaching method. Product-specific permissions, sandbox defaults, CLI
commands, review surfaces, model names, and UI states are volatile facts. Recheck
the [official Chapter 2 baseline](../../docs/research/chapter-02-official-baseline-2026-08-10.md)
and the [content lifecycle](../../docs/governance/content-lifecycle.md) when
those facts change.

The [field-problems record](../../docs/research/chapter-02-field-problems-2026-08-10.md)
contains user reports and community suggestions, not official root-cause
confirmations. This chapter and its experiment remain `candidate`/`draft`, and
the experiment is `not_run` until a fresh, bounded run produces the declared
evidence. The next chapter remains on the current migration path:
[Chapter 3 — task protocol](03-task-protocol-EN.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="01-gpt-and-codex-EN.md" aria-label="Previous chapter: Chapter 1 · Understand GPT before understanding how Codex works">← Previous<br><strong>Chapter 1 · Understand GPT before understanding how Codex works</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="03-task-protocol-EN.md" aria-label="Next chapter: Chapter 3 · Turn a wish into a task protocol">Next →<br><strong>Chapter 3 · Turn a wish into a task protocol</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
