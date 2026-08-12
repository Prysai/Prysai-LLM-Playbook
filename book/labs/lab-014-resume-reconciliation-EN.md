<!-- content_id: lab-014-resume-reconciliation | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

---
id: lab-014-resume-reconciliation
title: "Reconcile a resumed task before continuing"
level: L3
domain: general
goal: "Reconcile the task pointer, target, branch, permissions, and side-effect state before continuing"
setup: "A disposable local folder or repository with a checkpoint and two text files; no credentials, network access, production files, or irreversible commands"
task: "Record the live state, compare it with the checkpoint, classify each field, and continue only when the goal, target, permission, and side-effect state agree"
evidence:
  - "The checkpoint, live observations, commands, outputs, diff, classification table, and continuation decision"
  - "A clear record of matched, changed, and not_observed fields"
failure_variant: "Make the task name match while the repository root or target file differs; stop before editing and identify the first unreconciled field"
reflection: "Which field was easiest to assume, and which observation changed the decision to continue or stop?"
status: draft
last_verified: "not run"
transfer_task: "Apply the reconciliation envelope to a browser or MCP session without making a remote write"
transfer_domain: "browser operations, research, engineering, or content hand-off"
transfer_evidence: "Save the previous request, target, approval state, observed remote-state risk, and the new checkpoint"
transfer_limitations: "The disposable fixture does not prove continuity of a real account, remote resource, or resumed production task"
---

# Lab 014: Reconcile a resumed task before continuing

**Status:** `draft` · **Run status:** `not_run`

## Why this lab exists

Public field reports describe agents returning to an older task after context
compaction, capacity interruption, or resume. A new prompt can make the run
look active while the task pointer, worktree, or side-effect state remains
uncertain. This lab teaches reconciliation before continuation.

## Setup

Use a disposable copy of a small repository or a folder containing two text
files. Create a checkpoint that names the goal, target path, branch, last
completed action, pending action, permission state, and evidence. Simulate an
interruption by starting a second task or replacing the checkpoint with an
older copy. Do not use credentials, network access, production files, or
irreversible commands.

## Task

1. Record the current working directory, repository root, branch, target file,
   file hash or modification time, and current diff.
2. Compare those observations with the checkpoint.
3. Classify each field as `matched`, `changed`, or `not_observed`.
4. Continue only if the goal, target, permission, and side-effect state are
   reconciled. Otherwise create a new checkpoint and stop.

## Evidence

Save the checkpoint, commands and outputs, diff, classification table, and a
short decision. A successful practice record proves only that the reconciliation
procedure was followed in the disposable fixture.

## Failure variant

Make the visible task name match while the repository root or target file is
different. The correct result is to stop before editing and identify the first
unreconciled field. Do not fix the wrong checkout merely because it is writable.

## Transfer

Apply the envelope to a browser or MCP session: identify the last confirmed
request, target account/resource, approval state, and whether a previous call
could have changed remote state.

## Acceptance checklist

- [ ] I captured the actual path, repository, branch, target, and diff.
- [ ] I compared the live state with a named checkpoint.
- [ ] I separated changed from not observed.
- [ ] I stopped when target or side-effect state was uncertain.
- [ ] I did not call a resumed prompt proof of continuity.

## Reflection

Write down which field was easiest to assume, which observation changed the decision, and what remains `not_observed`.

## Sources

- [Field problems and prompt patterns — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-01 through FP2-04 and FP2-08.
- [Chapter 10: Planning and vertical slices](../chapters/10-planning-and-slicing-EN.md).
- [Chapter 12: The Agent loop, state, and stop conditions](../chapters/12-agent-loop-and-stop-EN.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a href="lab-013-l3-vertical-slice-EN.md">← Previous<br><strong>Lab 013 · Auditable vertical slice</strong></a></td>
    <td align="right"><a href="lab-015-evidence-delivery-EN.md">Next →<br><strong>Lab 015 · Evidence delivery</strong></a></td>
  </tr></table>
</nav>
<!-- chapter-navigation:end -->
