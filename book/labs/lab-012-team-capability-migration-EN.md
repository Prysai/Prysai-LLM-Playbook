<!-- content_id: lab-012-team-capability-migration | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-012-team-capability-migration
title: "Turn a personal method into a team capability"
level: L6
domain: team
goal: "Package a method so two people can reproduce, review, update, and roll it back"
setup: "A fictional weekly-report task, two anonymous learner roles, and no real organization systems"
task: "Create v0.1, run two fresh-context reproductions, change one requirement in v0.2, and review impact and rollback"
evidence:
  - "Two capability package versions with ownership, permissions, and acceptance"
  - "Two independent run records with input hashes, outputs, and scores"
  - "Version diff, impact matrix, rollback result, and unverified list"
failure_variant: "Remove owner, input source, permission boundary, or acceptance rule, or change the audience without changing acceptance"
reflection: "Which knowledge was held only in one person's memory, and what would make the package unsafe to inherit?"
status: draft
last_verified: "Not run"
transfer_task: "Apply the package format to a low-risk engineering, research, or content workflow"
transfer_domain: "team engineering, research, or content operations"
transfer_evidence: "Keep package versions, permission matrix, independent runs, diff, impact, rollback, and reviewer notes"
transfer_limitations: "A static simulation does not prove real account access, production integration, or organizational adoption"
---

# Lab 012: Turn a personal method into a team capability

## Learning objective

Replace private intuition and chat history with a versioned contract another
person can execute safely.

## Setup

Use a fictional weekly-report task and two anonymous learner roles. Do not use
real organization accounts, names, customer data, internal metrics, shared
systems, or production repositories.

Create capability package `v0.1` with:

- purpose and non-goals;
- owner and review cadence;
- input and output schemas;
- permission matrix and forbidden actions;
- procedure, stop conditions, and failure handling;
- positive, boundary, failure, and transfer checks;
- rollback target and deprecation rule.

## Independent reproduction

Learners A and B receive the same package in fresh contexts. Neither may use the
author's chat history. Each records input hash, run ID, decisions, output,
uncertainties, and score. Compare the runs without silently reconciling them.

Create `v0.2` by changing one real requirement. Record the diff, affected
consumers, migration decision, compatibility claim, and rollback check.

## Failure case

Remove one of the following: owner, input source, permission boundary, or
acceptance rule. The correct outcome is to stop migration and record the
missing contract. A team package that only its author can repair has failed.

Repeat with a `v0.2` audience change but unchanged acceptance criteria. The
reviewer must reject the compatibility claim or require new evidence.

## Acceptance checklist

- [ ] Two people reproduced the task from fresh context.
- [ ] Inputs, outputs, permissions, and ownership are explicit.
- [ ] Differences between the two runs are explained, not averaged away.
- [ ] The version change has an impact and rollback record.
- [ ] A missing contract field causes a safe stop.
- [ ] No real account, production system, or confidential input was used.
- [ ] An independent reviewer can identify the next owner and next check.

## Evidence to keep

Keep both package versions, hashes, permission matrix, two independent run
records, scoring notes, diff, impact matrix, rollback result, and unverified
items. Until those records exist, L6 capability remains unproven.

## Reflection and transfer

Apply the package format to a low-risk engineering, research, or content
workflow. Which part was previously held only in one person's memory? What
would make the package unsafe to inherit six months later?
