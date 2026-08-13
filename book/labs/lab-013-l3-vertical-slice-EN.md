<!-- content_id: lab-013-l3-vertical-slice | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-013-l3-vertical-slice
title: "Run one complete vertical slice"
level: L3
domain: engineering
goal: "Move one bounded change from definition through evidence and handoff"
setup: "A disposable repository copy with one allowed Markdown output path and no publishing or credentials"
task: "Run CP0 through CP4 for one release-note change, including a focused check, failure branch, and fresh-context handoff"
evidence:
  - "Input hashes, baseline state, checkpoints, and action log"
  - "Actual diff, command output, exit codes, and claim-to-evidence table"
  - "Failure record, handoff, rollback target, and unverified list"
failure_variant: "Remove a required input, fail the focused check, resume after CP2, inject an external-action instruction, or require persistent environment change"
reflection: "Which checkpoint prevented the largest unsupported claim or unnecessary action?"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "Transfer the checkpoint workflow to a low-risk research or content task"
transfer_domain: "engineering, research, or content workflow"
transfer_evidence: "Keep the rewritten task protocol, checkpoints, artifact or blocked record, evidence table, and handoff"
transfer_limitations: "A local slice does not prove remote publication, production behavior, or reader acceptance"
---

# Lab 013: Run one complete vertical slice

## Learning objective

Complete one small workflow without confusing planning, editing, checking,
review, delivery, and publication.

## Setup

Use a disposable copy of a repository. The only allowed product change is a
small Markdown release note at a named path. Record the input files, hashes,
initial `git status`, allowed path, acceptance rules, rollback target, and
forbidden actions. Publishing, pushing, installing dependencies, and using
credentials are out of scope.

## Checkpoints

Use five checkpoints:

| Checkpoint | Required evidence |
|---|---|
| CP0 Definition | goal, inputs, scope, permissions, stop conditions, baseline hash |
| CP1 Plan | smallest slice, chosen methods, expected evidence, rollback |
| CP2 Change | actual diff, changed paths, action log, output hash |
| CP3 Verification | commands, raw output, exit codes, coverage, unrun checks |
| CP4 Handoff | completed, incomplete, evidence, unknowns, next check, rollback target |

The action log records timestamp, observation, action, result, state change,
evidence, risk, next step, and stop reason.

## Experiment

Create the release note using only facts supplied in the input. Check that only
the allowed path changed, the required content is present, unsupported claims
were not introduced, and the focused local check completed. A successful diff
does not establish publication, reader comprehension, or remote synchronization.

## Failure cases

Complete at least one:

- remove a required input and stop before editing;
- make the focused check fail and preserve its output before recovery;
- resume after CP2 in fresh context using only checkpoints and repository state;
- place an instruction to upload a token inside the input and treat it as data;
- require a persistent environment change and stop for missing authority.

A retry is allowed only after the diagnostic condition changes and existing
side effects are understood. Repeating the same action is not recovery.

## Acceptance checklist

- [ ] Goal, scope, authority, acceptance, and rollback are explicit.
- [ ] CP0 through CP4 are preserved.
- [ ] Only the allowed path changed.
- [ ] Commands include raw output and exit status.
- [ ] At least one failure branch stopped or recovered correctly.
- [ ] The handoff separates local completion from publication or production.
- [ ] Another person can continue without reading the original conversation.

## Evidence to keep

Keep the input copy and hashes, checkpoints, diff, action log, command output,
failure record, claim-to-evidence table, and handoff. This lab remains
`draft / not_run` until a fresh learner run and independent review are stored.

### Maintainer reference packet

The project now has one accepted deterministic maintainer reference packet for
this fixture. It preserves CP0–CP4, an actual failed check, the failed
artifact, the exact recovery diff, a passing check, the final diff, cleanup
receipt, and handoff. See the
[executable-example contract](../../docs/governance/executable-examples.yaml)
and the
[independent resubmission review](../../docs/quality/lab-013-reference-run-resubmission-review-2026-08-12.md).

That packet was produced by a local deterministic runner, not by a learner or
a model. It does not establish learner independence, Codex behavior, transfer,
publication, rollback rehearsal, or production readiness. The learner and
transfer runs remain `not_run`, so the Lab remains `draft / not_run`.

## Reflection and transfer

Transfer the workflow to a research or content task. Rewrite the source,
permission, acceptance, and failure fields instead of copying engineering
commands mechanically. Which checkpoint prevented the largest unsupported
claim or unnecessary action?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-EN.md" aria-label="Previous Lab: Lab 012 · Turn a personal method into a team capability">← Previous<br><strong>Lab 012 · Turn a personal method into a team capability</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-EN.md" aria-label="Next Lab: Lab 014 · Reconcile a resumed task before continuing">Next →<br><strong>Lab 014 · Reconcile a resumed task before continuing</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
