<!-- content_id: lab-001-first-safe-task | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-10 -->

---
id: lab-001-first-safe-task
title: "Complete one bounded README change and prove what happened"
level: L1
domain: general
goal: "Practice inspect-before-edit, least authority, diff review, focused verification, and honest recovery"
setup: "A disposable or non-production Git project with a README and a real local run-script source; no secrets, customer data, production files, or external writes"
task: "Ask Codex to inspect first, wait for confirmation, edit README.md only, and record the actual diff and focused check"
evidence:
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

# Lab 001: Make one safe README change

## What this lab is for

This lab is the L1 bridge from Chapter 1's static boundary map to a real but
controlled file change. It is not a deployment test, a connector test, or a
proof that your current Codex permission label is effective everywhere.

The required run must stay within a disposable or non-production project. Do
not paste credentials, tokens, cookies, private keys, `.env` files, customer
records, or production configuration into the task.

## Setup

1. Choose a disposable Git project or a copy that you can discard.
2. Record the absolute path and the current `git status`.
3. Save the original `README.md` or create a clean checkpoint.
4. Identify the real file that defines local run commands. Do not invent a
   command from memory or from a search result.
5. Write down the only permitted edit: `README.md`.
6. Confirm that no install, network call, commit, push, publish, external
   message, secret read, or production action is part of this run.

If any item is unclear, stop and mark the lab `blocked`; do not “try first.”

Create a run ID such as `lab001-readme-2026-08-10-a`. The ID identifies the
record; it is not evidence by itself.

## Task

Give Codex a bounded request like this, replacing angle-bracket values with
facts from the sandbox:

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

The important part is the contract, not the exact wording. Before any edit,
check that Codex understood the target, baseline, allowed path, forbidden
actions, and proof of acceptance. Correct the plan before allowing the edit.

## Evidence to save

Keep one record with these fields:

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
and the [field-problems study](../../docs/research/chapter-02-field-problems-2026-08-10.md)
before adapting the lab to a higher-risk task.

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
