<!-- content_id: lab-015-evidence-delivery | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

---
id: lab-015-evidence-delivery
title: "Deliver evidence, not a completion sentence"
level: L5
domain: general
goal: "Split completion claims into scoped evidence records and identify the smallest next check"
setup: "A disposable text change, one focused check, one deliberately missing check, and a redacted hand-off; no real service or user data"
task: "Record each source, check, and runtime claim with its scope, command or observation, result, saved output, status, and next check"
evidence:
  - "The claim-to-evidence table, raw command output, diff, and review decision"
  - "An explicit distinction between verified, partial, unverified, blocked, and not_run"
failure_variant: "Remove the output file while leaving the command name in the hand-off; mark the claim unverified or not_run"
reflection: "Which claim was broader than its evidence, and what smaller check would close the gap?"
status: draft
last_verified: "not run"
transfer_task: "Apply the table to a static site and separate source presence, artifact build, browser render, screenshot review, and public reachability"
transfer_domain: "web publishing, documentation, research, or engineering delivery"
transfer_evidence: "Save one row per claim with scope, command or observation, result, output path, and limitation"
transfer_limitations: "A passing source check cannot prove visual runtime, user acceptance, or public URL reachability"
---

# Lab 015: Deliver evidence, not a completion sentence

**Status:** `draft` · **Run status:** `not_run`

## Why this lab exists

A command can run while its output is hidden, truncated, attached to the wrong
working directory, or too weak for the claim being made. This lab turns a
polished “done” statement into a claim-to-evidence record.

## Setup

Create a disposable text change with one focused check and one deliberately
missing check. Prepare a redacted handoff containing three claims: a source
claim, a check claim, and a runtime or user-effect claim. Do not use a real
service or user data.

## Task

For each claim, record:

```text
claim:
scope:
command or observation:
working directory:
exit code / result:
saved output:
status: verified | partial | unverified | blocked | not_run
smallest next check:
```

Then ask a second reviewer—or a fresh session—to reject any claim whose
evidence is absent, broader than its scope, or only inferred from another row.

## Evidence

Save the claim table, raw command output, diff, and review decision. The record
must show why a passing source check cannot prove visual runtime or user
acceptance.

## Failure variant

Remove the output file while leaving the command name in the handoff. The
  correct result is `unverified` or `not_run`, not “probably passed”.

## Field variant: three Windows evidence breaks

Use the three public reports in [Chapter 9](../chapters/09-verification-and-recovery-EN.md)
as reference cases. Do not attempt to reproduce an upstream product issue as
part of this lab. Instead, create harmless local fixtures that model the
evidence boundary:

1. Generate more text than a terminal viewport can show, then save the same
   content to a file and compare what is durable with what is visible.
2. Place BMP and non-BMP characters in a text fixture. Compare an intended
   string with a received string before any tool call; mark the case blocked if
   they differ.
3. Create a disposable Git repository with a deliberately long *ordinary test
   filename* only if the filesystem supports it. Record the path length and
   Git result; do not create or delete Codex internal refs and do not change
   repository configuration.

For each case, add one row to the claim table:

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

The correct conclusion may be `reference-only`, `not_run`, or `blocked`. A
local fixture that models a boundary is not a reproduction of the upstream
issue, and a workaround copied from a public report is not an official fix.

## Transfer

Use the same table for a static website: distinguish source files present,
artifact built, browser rendered, screenshot reviewed, and public URL reachable.

## Acceptance checklist

- [ ] Every completion sentence is split into a claim with a scope.
- [ ] Commands include path, exit code, and saved output.
- [ ] Missing evidence is marked explicitly.
- [ ] A later successful check does not rewrite an earlier unknown attempt.
- [ ] The handoff names the smallest next check and stop condition.

## Reflection

Identify the claim that was broader than its evidence and name the smallest check that would close that gap.

## Sources

- [Field problems and prompt patterns — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-05, FP2-06, and FP2-20.
- [Chapter 9: Verification, doubt, and recovery](../chapters/09-verification-and-recovery-EN.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-EN.md" aria-label="Previous Lab: Lab 014 · Reconcile a resumed task before continuing">← Previous<br><strong>Lab 014 · Reconcile a resumed task before continuing</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-EN.md" aria-label="Next Lab: Lab 016 · Stop at the side-effect boundary">Next →<br><strong>Lab 016 · Stop at the side-effect boundary</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
