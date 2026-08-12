<!-- content_id: lab-005-design-a-skill | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-005-design-a-skill
title: "Turn a repeated method into a narrow Skill"
level: L4
domain: general
goal: "Decide whether a repeated workflow deserves a Skill and test that the Skill narrows work instead of triggering everywhere"
setup: "A low-risk workflow completed at least twice, a separate practice directory, four sanitized fixtures, and the official Skill validator"
task: "Extract the stable decisions, write the smallest useful Skill, test positive, boundary, failure, and transfer cases, then produce an adoption decision without installing it"
evidence:
  - "The source workflow records and a stable-versus-incidental decision table"
  - "The candidate Skill, source and license record, validator output, and four behavior-test records"
  - "A skill-adoption-decision.md with owner, permission boundary, rollback, unresolved risks, and recommendation"
failure_variant: "Hard-code a project-specific detail or include material with unclear permission and confirm that the adoption decision becomes blocked"
reflection: "Which decisions were stable enough to encode, what should remain project context, and did the Skill reduce omissions without broadening its trigger?"
status: draft
last_verified: "not run"
transfer_task: "Apply the same extraction and behavior-test method to a repeated workflow in a different domain"
transfer_domain: "research, engineering, marketing, or content review"
transfer_evidence: "Keep the workflow comparison, candidate revision, validator result, four behavior tests, and adoption decision"
transfer_limitations: "Structural validation and one fresh-context trial do not prove production reliability, team adoption, long-term maintenance, or license approval"
---

# Lab 005: Turn a repeated method into a narrow Skill

## Learning objective

Build a reusable instruction package only when the repeated work has a stable
decision pattern. A Skill is not a storage place for one successful answer, a
project-specific checklist, or every fact known about a domain.

## Setup

Choose a harmless workflow that has been completed at least twice. Preserve the
two run records. Use sanitized inputs and a practice directory outside the
discoverable Skill root. Do not use credentials, production data, unpublished
customer material, or an external source whose reuse terms are unclear.

Create `extraction.md` with four columns:

| Observed step | Stable decision | Project-specific detail | Evidence from both runs |
|---|---|---|---|

Only the stable decisions are candidates for the Skill. Keep filenames,
customer details, temporary workarounds, and one-off targets in project context.

## Task and experiment

Write the smallest candidate that contains:

- a description precise enough to trigger on relevant requests and yield on
  adjacent requests;
- inputs, allowed actions, permission limits, secret handling, output, and
  acceptance criteria;
- a short core workflow, with detailed references or scripts separated when
  they are needed only conditionally;
- one positive example, one boundary example, and one failure example;
- source, license, owner, version, and next-review information.

Run the official validator. Then start a fresh context and test four fixed
fixtures: positive, boundary, failure, and cross-domain transfer. Record whether
the candidate was found, loaded, selected, followed, and behaviorally verified.
Those are five different states; one does not prove the next.

Finish with `skill-adoption-decision.md`:

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

This lab stops at an adoption recommendation. Installation changes shared
state and requires separate authorization.

## Evidence to keep

Keep both source workflow records, `extraction.md`, the complete candidate
directory, its revision or hash, validator output, all four fixture inputs and
outputs, fresh-context notes, and the adoption decision. Record a failed test
as a failed test; do not overwrite it with a later corrected run.

## Failure case

First hard-code a real project filename or customer-specific rule. Run the
transfer fixture and verify that the candidate either misfires or produces an
irrelevant instruction. Remove the incidental detail and rerun under a new
attempt ID.

Next add a short external fragment with no clear license or permission record.
Even if validation passes, the correct adoption decision is `blocked`. A valid
file structure does not settle provenance.

## Acceptance checklist

- [ ] Two prior runs support every encoded stable decision.
- [ ] Trigger and non-trigger conditions are both tested.
- [ ] Positive, boundary, failure, and transfer fixtures retain raw results.
- [ ] Sources and reuse permissions are recorded.
- [ ] Installation, secrets, publishing, and external side effects did not occur.
- [ ] The decision states what remains unverified and who owns the next review.

## Reflection and transfer

Apply the method to a workflow in another domain. Which parts survived the
move? Which parts belonged in project context instead? Did the candidate reduce
a repeated omission, or did it merely make the instructions longer?

