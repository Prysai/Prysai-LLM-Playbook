<!-- content_id: lab-003-evidence-review | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-003-evidence-review
title: "Audit a completion claim"
level: L3
domain: general
goal: "Separate claims, direct evidence, inference, and missing verification"
setup: "Three sanitized delivery summaries with an answer key kept outside the learner context"
task: "Map every material claim to its scope, required evidence, actual evidence, status, and smallest next check"
evidence:
  - "The three fixed input summaries and answer key"
  - "A completed claim-to-evidence table"
  - "Reviewer notes and an explicit unverified list"
failure_variant: "Insert an unsupported all-tests-passed claim and an all-devices claim supported by one browser"
reflection: "Which evidence proved existence, correctness, or readiness, and which claim weakened after its scope was written?"
status: draft
last_verified: "Not run"
transfer_task: "Apply the audit table to a small engineering, research, or publication delivery"
transfer_domain: "engineering, research, or content delivery"
transfer_evidence: "Keep the scoped claims, direct evidence, gaps, reviewer notes, and final status"
transfer_limitations: "A static audit cannot prove that referenced artifacts are authentic or complete outside the inspected scope"
---

# Lab 003: Audit a completion claim

## Learning objective

Decide whether a result is complete without trusting tone, confidence, or visual polish.

## Setup

Prepare three sanitized delivery summaries: one supported by direct evidence,
one partially complete but described as finished, and one polished summary with
no verification record. Keep the answer key outside the learner context.

Allowed actions are read-only inspection and requests for narrower evidence.
Do not edit the summaries, invent missing output, contact external services, or
use production logs.

## Task and experiment

For every material claim, record:

| Claim | Scope | Required evidence | Evidence found | Status | Smallest next check |
|---|---|---|---|---|---|
| Example | file, environment, version, date | diff and focused check | exact path or `none` | verified / partial / inferred / blocked / unknown | one bounded action |

Distinguish these questions:

1. Does an artifact exist?
2. Is the artifact correct within the stated scope?
3. Is it ready for the intended reader or environment?

Each question needs separate evidence. A diff proves a change, not correctness.
A passing unit test proves its covered behavior, not deployment or user acceptance.

## Failure case

Insert the sentence “all tests passed” without command output, test names, date,
environment, or exit code. The correct response is to downgrade the claim and
request evidence. Do not infer that confident wording represents a real run.

Repeat with evidence from one browser while the claim says “works on every
device.” Narrow the claim or require additional device evidence.

## Acceptance checklist

- [ ] Every important claim has an explicit scope.
- [ ] Direct evidence and inference are in separate columns.
- [ ] Unsupported claims are not marked verified.
- [ ] The next check is smaller than rerunning the entire project.
- [ ] Secrets, customer data, and private logs were excluded.
- [ ] The final handoff lists what remains unverified.

## Evidence to keep

Keep the three input summaries, completed audit table, answer-key comparison,
reviewer notes, and final status. Until a learner run and independent review are
recorded, this lab remains `draft / not_run`.

## Reflection and transfer

Apply the table to a small engineering delivery, research conclusion, or
publication draft. Which evidence proves existence, correctness, and readiness?
Which claim became weaker after its scope was written precisely?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-EN.md" aria-label="Previous Lab: Lab 002 · Turn one wish into a task protocol">← Previous<br><strong>Lab 002 · Turn one wish into a task protocol</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-004-skill-selection-EN.md" aria-label="Next Lab: Lab 004 · Choose the smallest useful capability">Next →<br><strong>Lab 004 · Choose the smallest useful capability</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
