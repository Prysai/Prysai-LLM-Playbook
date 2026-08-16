<!-- content_id: lab-001-first-safe-task | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-13 -->

---
id: lab-001-first-safe-task
title: "Make the first request usable"
level: L1
domain: general
goal: "Observe how a clearer request changes an inspectable result, then practise inspect-before-edit, least authority, diff review, focused verification, and honest recovery"
setup: "Part A needs any LLM workbench and fictional or non-sensitive notes. Part B needs a disposable or non-production Git project with a README and a real local run-script source; no secrets, customer data, production files, or external writes"
task: "Run one fixed-input prompt comparison without external actions; then, only if a safe project is available, ask Codex to inspect first, wait for confirmation, edit README.md only, and record the actual diff and focused check"
evidence:
  - "Two saved replies from the same fixed input: a vague request and a structured request, plus the learner's checks for factual coverage, requested format, revision turns, and unknowns"
  - "A task card with goal, inputs, allowed actions, forbidden actions, acceptance, stop condition, and delivery format"
  - "The pre-edit baseline, Codex's plan, the actual diff, and the command source used for verification"
  - "A run record that separates actions done, actions not done, verification result, unknowns, and next check"
failure_variant: "Make the script name disagree with the README, interrupt a read-only check with incomplete output, or make the allowed path unavailable; observe whether the learner stops, preserves state, and avoids expanding authority"
reflection: "Which confirmation point reduced risk most, what did the diff prove, and what remained unverified after the check?"
status: draft
last_verified: "not run"
transfer_task: "Reuse the same protocol for a fixed-source research brief or a static copy edit without allowing external writes"
transfer_domain: "research, engineering, content, design, or marketing"
transfer_evidence: "Save both protocols, the changed evidence fields, one failure record, and the explicit unverified list"
transfer_limitations: "This lab teaches a low-risk local boundary; it does not prove account authority, production safety, external publishing, or runtime behavior of every Codex surface"
---

# Lab 001: Make the first request usable

## Start with the result you want to feel

First compare two requests in any LLM workbench. Then, only if you have a safe
project, use the same method for one README change with Codex.

This is not a test of whether you can edit a README. It is the first practical
lesson in using an LLM workbench well: give the same small input two different
requests, then inspect whether the second request gives you a result that is
easier to use, check, and revise.

Part A works in a normal text chat or workbench. You may use GPT, Grok,
Gemini, Kimi, Codex, or another model that is available to you. Do not treat
the result as a ranking of models: keep the same model, input, and task for
both rounds. Part B is the optional Codex/workspace version of the same idea.
It teaches what changes once an answer can affect a real file.

## Part A — a ten-minute prompt comparison

### Why do this first?

Typing more words is not the point. A useful request lets you check whether the
answer used the right material, followed the required shape, exposed what it
did not know, and reduced the next revision you need to make. Those are things
you can see immediately, before you grant file, terminal, browser, or network
access.

### Use one fixed, harmless input

Use your own non-sensitive notes, or copy this fictional update into a new
conversation:

```text
Monday: fixed a typo in the onboarding note.
Tuesday: drafted the release checklist; it still needs reviewer approval.
Wednesday: local formatting check was not run because the command is unknown.
Next: ask Maya which check is required before release.
```

Run both requests in separate fresh conversations if you can. Do not change
the notes between rounds.

**Round A — vague request**

```text
Turn these notes into a good project update.
```

**Round B — a checkable request**

```text
Task: turn the notes below into a project update.
Audience: a teammate who needs to decide the next action.
Use only: the supplied notes.
Must include: completed work, work still awaiting approval, one explicitly
unverified item, and the next owner/action.
Do not invent: a test result, approval, date, or cause that is absent.
Format: four bullets headed Done, Waiting, Unknown, and Next.
Before drafting: list any missing fact that would change the update.

Notes:
<paste the same notes here>
```

### Inspect, do not merely prefer

Save both replies and compare them with this small receipt. A number is only
your observation for this one run; it is not proof that a prompt pattern or
model is universally more efficient.

| Check | Round A | Round B |
| --- | --- | --- |
| All four source facts retained (0–4) |  |  |
| Required four-part format present (yes/no) |  |  |
| An unknown is named rather than invented (yes/no) |  |  |
| Extra revision turns before you would use it |  |  |
| Time you actually recorded (optional) |  |  |

If Round B is not better, keep that result. Check whether you accidentally
changed the input, model, conversation history, or acceptance rule before
rewriting the conclusion. The useful lesson is not “this magic prompt always
wins.” It is that a task, source boundary, output shape, and check give you
something concrete to improve.

## Part B — take the same discipline into a workspace

Once an answer can change a file, “looks useful” is no longer enough. This
second part adds a narrow editable target, an inspect-before-edit step, a diff,
and a focused check. It is the Codex practice track, not the definition of the
whole Playbook.

## What this workspace exercise is for

This workspace exercise is the L1 bridge from Chapter 1's static boundary map
to a real but controlled file change. It is not a deployment test, a connector
test, or a proof that your current Codex permission label is effective
everywhere.

The required run must stay within a disposable or non-production project. Do
not paste credentials, tokens, cookies, private keys, `.env` files, customer
records, or production configuration into the task.

## Setup

1. If you do not already have a disposable project, start with the
   [First Safe Change fixture](../routes/first-safe-change-EN.md). It is the
   default novice sandbox and needs no Git, account, install, or network.
   Otherwise choose a disposable Git project or a copy that you can discard.
2. Record the absolute path and, when this is a Git project, the current
   `git status`. For the fixture, record `not a Git sandbox` rather than
   inventing a repository identity.
3. Save the original `README.md` or create a clean checkpoint.
4. Identify the real file that defines local run commands. Do not invent a
   command from memory or from a search result.
5. Write down the only permitted edit: `README.md`.
6. Confirm that no install, network call, commit, push, publish, external
   message, secret read, or production action is part of this run.

If any item is unclear, stop and mark the lab `blocked`; do not “try first.”

Create a run ID such as `lab001-readme-2026-08-10-a`. The ID identifies the
record; it is not evidence by itself.

## Four answers before the first action

### Problem

A project folder, a permission label, or a confident completion message can
look like a safe starting point without identifying the file that may change
or the evidence that will be saved. In this lab, do not let any of those
signals substitute for a bounded task.

### Concept

This is a written boundary check, not a product-capability test. A file task
needs four independently clear answers: its effective local sandbox, its one
editable target, its allowed actions, and its receipt. A blank or `unknown`
answer is a stop signal, not something to fill in by guessing.

### Decision and action

Before you send the task, write these four lines in the run record. The fixture
is the only default path that may use `not a Git sandbox`; a real project still
needs its observed Git identity.

| Question | Record | Continue only when | Stop when |
| --- | --- | --- | --- |
| Where will this run? | Declared sandbox, observed current directory, and either repository root plus branch/`HEAD` **or** `not a Git sandbox` for the First Safe Change fixture. | The observed directory is inside the declared sandbox, and every applicable identity describes the same local checkout. | Any required identifier is missing, ambiguous, outside the sandbox, or disagrees with the others. |
| What may change? | `README.md` only. | The target is one existing file in that sandbox. | The task needs another path or the target cannot be identified. |
| What is allowed? | Inspect, report a plan, then edit only after approval; keep the exclusions from Setup. | The action is reversible and needs no new authority. | It needs credentials, an install, network access, a commit, push, publish, deletion, or another external write. |
| What is the receipt? | Baseline, exact diff, command source, focused-check output, and explicit unknowns. | You can inspect and retain each item after the action. | The result would only be a status statement or an unreviewable response. |

Do not begin the file task until every answer is concrete. If you need a
safe local file before using your own project, use the
[First Safe Change fixture](../routes/first-safe-change-EN.md). If local files
are unavailable entirely, use the public text-only
[First Win](../../site/index.html#first-30) instead. It is a separate,
fictional message-checking exercise and does not require a project folder.

### Evidence, failure, and reflection

Save the four answers with the baseline. For a local Git sandbox, record and
compare the observed current directory, repository root, branch or `HEAD`, and
declared sandbox before editing. For the First Safe Change fixture, record its
copy path and `not a Git sandbox`; do not fabricate Git evidence. If one answer
or identifier changes during the task, stop, update the task card, and ask for
a new narrow decision before continuing. Completing this check only records
that you selected a bounded starting point; it does not prove that Codex can
perform the task, that the task will pass, or that you learned the method.

## Task

Give Codex a bounded request like this, replacing angle-bracket values with
facts from the sandbox:

```text
Run ID: lab001-readme-<date>-<suffix>
Goal: Add one accurate local-start section to <absolute-path>/README.md.
Sandbox: <absolute-path>; the only editable file is README.md.
Read first: README.md, the package/build manifest, and the existing script file.
Allowed edit: README.md only.
Do not: install, access the network, modify code, commit, push, publish, send
messages, read secrets, or use production data.
Receipt: baseline, plan, exact diff, command source, focused-check output, and
an explicit unverified list.
Before editing: report the observed current directory, repository root and
branch or HEAD when applicable (otherwise state `not a Git sandbox`), declared
sandbox, baseline, plan, command source, and acceptance check.
After editing: show the exact diff and run only the focused checks I approved.
If a path, command, permission, or recovery step is unclear, stop and ask.
```

The important part is the contract, not the exact wording. Before any edit,
check that Codex understood the target, baseline, allowed path, forbidden
actions, and proof of acceptance. Correct the plan before allowing the edit.

## Evidence to save

Keep one record with these fields:

```text
run_id:
checkpoint_before:
preflight_sandbox:
preflight_observed_directory:
preflight_repository_root:
preflight_branch_or_head:
preflight_edit_target:
preflight_allowed_actions:
preflight_receipt:
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

A passing record says only `README.md` changed, the new command is supported by
the project's actual script source, no external write occurred, and any
unrun application or unavailable checker is named explicitly.

The evidence must distinguish:

- a plan from an action;
- a proposed command from an executed command;
- a diff from a passing check; and
- an interrupted check from a successful check.

## Safe capability probe

If the task depends on a configured directory or workspace claim, add one
harmless sentinel step before editing:

1. confirm the absolute directory and that it is inside the approved sandbox;
2. write one temporary, non-secret sentinel file at the exact allowed path;
3. read it back and record the result; and
4. remove it only when cleanup is itself inside the approved scope.

The probe must not read credentials, change permissions, install packages,
access the network, touch another repository, or imply that a successful write
proves broader tool or production access. If the path or cleanup boundary is
unclear, record `blocked` or `unverified` and stop. A sentinel is evidence of
one harmless operation in one run, not a general permission test.

## Failure and boundary variant

Use a disposable copy only.

### Variant A: conflicting source of truth

Temporarily change the script name in the copied manifest so it no longer
matches the requested README command. Ask Codex to complete the task. The safe
result is to identify the conflict and stop for clarification. It is not to
choose the command that “looks most likely.”

### Variant B: incomplete verification

Make a harmless read-only check wait or return incomplete output, then stop it
using the safe control available in the current work surface. Record the last
event and inspect the diff and status. The safe result is `stopped` or
`unverified`, not `passed`.

### Variant C: authority boundary

Add a request to install a dependency, read a secret, use the network, or push
the branch. The correct response is a new narrow decision or a blocked record.
Do not widen access just to make the exercise look complete.

### Variant D: capability mismatch

Declare a directory in the task context but make the allowed sentinel path
missing or outside the approved sandbox. The safe result is to report the
mismatch and stop before editing; it is not to search for another path or ask
for broad access.

## Acceptance checklist

- [ ] The task card names one target file and one allowed edit path.
- [ ] The declared sandbox, observed directory, repository root, branch or
      `HEAD`, editable target, allowed actions, and receipt were written
      before the first action.
- [ ] The observed directory is inside the declared sandbox, and the Git root
      and branch or `HEAD` identify the same local checkout.
- [ ] A baseline exists and pre-existing changes are identified.
- [ ] Codex inspected before editing and stated a bounded plan.
- [ ] The actual diff is limited to the allowed file.
- [ ] The verification command came from the project's real configuration.
- [ ] The result includes real output or says `not run`/`stopped` explicitly.
- [ ] Failure variants preserve state and do not expand permissions.
- [ ] The hand-off lists what changed, what did not change, and what remains
      unverified.

## Reflection

Answer these questions in your run record:

1. Which confirmation point prevented the largest possible mistake?
2. What did the diff prove, and what did it not prove?
3. If a check stalled, what was still unknown after interruption?
4. What single field would you add to the task card before repeating it?
5. Which of the four pre-action answers was hardest to make concrete, and did
   it change the task boundary?

## Transfer task

Rewrite the task card for one of these domains:

- a fixed-source research brief;
- a static marketing copy change;
- a content inventory; or
- a design review with a saved screenshot or inspection record.

Keep the goal, inputs, constraints, allowed actions, acceptance, failure
handling, and delivery fields. Add the domain's source, privacy, sampling,
human-review, or visual-evidence boundary.

## Status and limits

This lab is `draft` and `not_run`. Structural validation does not claim that a
learner completed it. The exercise does not prove that a particular account,
model, Skill, tool, connector, or work surface can perform the same task.

Read [Chapter 2](../chapters/02-first-safe-task-EN.md), the
[official baseline](../../docs/research/chapter-02-official-baseline-2026-08-10.md),
the [field-problems study](../../docs/research/chapter-02-field-problems-2026-08-10.md),
and the candidate [first-action friction ledger](../../docs/research/first-five-minute-codex-friction-ledger-2026-08-13.md)
before adapting the lab to a higher-risk task. The ledger supplies scoped
research context; it is not evidence that this lab, a product surface, or a
learner has run successfully.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"></td>
      <td align="right"><a data-lab-nav="next" href="lab-002-task-protocol-EN.md" aria-label="Next Lab: Lab 002 · Turn one wish into a task protocol">Next →<br><strong>Lab 002 · Turn one wish into a task protocol</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
