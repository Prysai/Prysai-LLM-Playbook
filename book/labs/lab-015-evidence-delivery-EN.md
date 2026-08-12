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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a href="lab-014-resume-reconciliation-EN.md">← Previous<br><strong>Lab 014 · Resume reconciliation</strong></a></td>
    <td align="right"><a href="lab-016-side-effect-boundary-EN.md">Next →<br><strong>Lab 016 · Side-effect boundary</strong></a></td>
  </tr></table>
</nav>
<!-- chapter-navigation:end -->
