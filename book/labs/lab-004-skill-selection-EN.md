<!-- content_id: lab-004-skill-selection | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-004-skill-selection
title: "Choose the smallest useful capability"
level: L4
domain: general
goal: "Select a Skill or tool by task fit, risk, license, and verification cost"
setup: "One low-risk local task and fixed-revision capability candidates"
task: "Compare protocol-only, protocol-plus-Skill, and protocol-plus-Skill-plus-tool approaches without installing or authenticating"
evidence:
  - "Three approach records with task fit, dependencies, permissions, and verification cost"
  - "Candidate source, revision, license, nested-asset, and rollback notes"
  - "One recommendation-only decision and one blocked decision"
failure_variant: "Use a visible candidate with unclear license or rollback, then add irrelevant capabilities to a simple task"
reflection: "Which capability earned its place, which dependency created the most maintenance cost, and what could be removed?"
status: draft
last_verified: "Not run"
transfer_task: "Repeat the comparison for a low-risk research or content task"
transfer_domain: "research, engineering, marketing, or documentation"
transfer_evidence: "Keep the task gap, comparison table, adoption records, and reviewer comments"
transfer_limitations: "A recommendation-only comparison does not prove installation, runtime behavior, or long-term maintenance value"
---

# Lab 004: Choose the smallest useful capability

## Learning objective

Choose capabilities because they close a specific task gap, not because they
are popular, numerous, or easy to install.

## Setup

Use one low-risk local task and compare three approaches:

1. a written task protocol only;
2. the protocol plus one relevant Skill;
3. the protocol, Skill, and one external tool or connector.

Use fixed candidate revisions. Record source, license, dependencies, target
installation scope, permissions, side effects, owner, review date, and rollback.
Do not install or authenticate unless a later task explicitly authorizes it.

## Decision record

For each candidate create a short adoption record:

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

The default decision in this lab is `recommendation-only` or `blocked`.
Discovery, installation, loading, invocation, behavioral effect, and verified
result are different states and must be recorded separately.

## Failure case

Choose a candidate whose folder exists but whose license, nested assets, fixed
revision, or rollback procedure is unclear. The correct decision is `blocked`.
Availability is not permission, and installation is not behavioral validation.

Then add several irrelevant capabilities to a simple text task. Reject any
capability whose permission, dependency, or verification cost exceeds the
specific value it adds.

## Acceptance checklist

- [ ] The task gap is written before candidates are compared.
- [ ] At least one candidate is rejected with a concrete reason.
- [ ] License and nested-asset uncertainty are visible.
- [ ] Permissions and external side effects are no broader than the task.
- [ ] Installation and behavior are not treated as the same state.
- [ ] A maintainer can execute the rollback description without chat history.

## Evidence to keep

Keep the unchanged task input, three approach records, candidate revision
identifiers, license notes, decision table, and reviewer comments. This lab is
not evidence that any external Skill was installed or validated.

## Reflection and transfer

Repeat the comparison for a research or content task. What new dependency
created the most maintenance cost? What could be removed without reducing the
quality of the final evidence?
