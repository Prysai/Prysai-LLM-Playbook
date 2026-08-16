<!-- content_id: lab-002-task-protocol | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-10 -->

---
id: lab-002-task-protocol
title: "Turn one vague request into a bounded, evidence-led protocol"
level: L2
domain: general
goal: "Practice turning an underspecified wish into goal, context, inputs, constraints, allowed actions, acceptance, stop, recovery, and delivery"
setup: "A disposable or non-production project and a low-risk README, research, content, or small UI request; no secrets, customer data, production state, or external writes"
task: "Run three fixed protocol-drafting rounds without allowing Codex to edit or execute state-changing actions"
evidence:
  - "The unchanged one-sentence wish and three run IDs"
  - "Clarification questions and protocol drafts for v1, v2, and v3"
  - "A comparison table showing assumptions, allowed actions, stop conditions, and evidence gained"
failure_variant: "Omit a scope-changing input, leave vague words such as 'professional' or 'best', or authorize 'fix anything necessary' without a file boundary"
reflection: "Which question reduced the most risk? Which added detail only made the prompt longer? What claim still lacks evidence?"
status: draft
last_verified: "not run"
transfer_task: "Apply the same protocol to a research brief, a code regression, a localized README edit, and a release plan"
transfer_domain: "research, engineering, content, release, or team collaboration"
transfer_evidence: "Save the five protocols, changed fields, one failure record, and an independent boundary-review result"
transfer_limitations: "A clear protocol does not prove that inputs are true, permissions are effective, or the final work is correct; those require separate evidence"
---

# Lab 002: Turn one wish into a task protocol

## Purpose and safety boundary

This lab makes Chapter 3 observable. It tests whether more precise task
information changes the questions, assumptions, action boundary, and evidence
plan—not whether a longer prompt produces a prettier answer.

Use a disposable project or a non-production copy. Do not paste tokens,
cookies, private keys, `.env` files, customer records, or private service data.
Do not install dependencies, access the network, edit files, run state-changing
commands, commit, push, publish, notify anyone, or call external services.

If the target, authority, or evidence boundary is unclear, mark the round
`blocked` and keep it at a protocol draft.

## Fixed input

Choose one wish and keep its wording unchanged in all three rounds. For
example:

```text
Help me make this project's homepage better.
```

The example is intentionally incomplete. You may use an equivalent low-risk
wish, but do not silently change the underlying task between rounds.

Create separate run IDs, for example:

```text
lab002-protocol-2026-08-10-v1
lab002-protocol-2026-08-10-v2
lab002-protocol-2026-08-10-v3
```

A run ID identifies a record. It is not proof that Codex ran.

## Three rounds

### v1 — wish only

Give Codex the one-sentence wish and ask for clarification questions and a
protocol draft only. It must not edit, run commands, install, commit, push,
publish, or contact an external system.

Record:

- which target it guessed or refused to guess;
- which questions it asked;
- which assumptions it exposed;
- which actions it proposed; and
- which evidence it would need to call the task complete.

### v2 — goal and boundary

Keep the wish unchanged and add only:

- the audience and desired observable result;
- the exact files or sources it may read;
- the files it may edit, if any;
- forbidden actions and external side effects; and
- the fact that this round is still planning only.

Compare which v1 questions disappear and which new questions remain. Do not
let the extra context authorize an edit.

### v3 — acceptance and recovery

Keep v1 and v2 fixed, then add:

- acceptance claims and the evidence for each;
- stop conditions for missing input, permission, silence, repeated failure,
  and scope expansion;
- the recovery action after a failed check; and
- the required delivery record, including actions not taken and unverified
  items.

Ask Codex to return the protocol and unresolved questions only. If it performs
an edit or state-changing command, stop the run, preserve the output, and
record the scope violation as the failure evidence.

## Evidence record

Use one row per round:

```text
run_id | newly supplied fields | ambiguity removed | assumptions exposed |
allowed actions | stop point | required evidence | actual side effect
```

Then write a claim-evidence table:

```text
claim | evidence that would support it | evidence actually collected | status
```

Use only these statuses unless the project has a documented alternative:

- `observed`: the output or behavior was directly seen;
- `verified`: the declared evidence supports the claim within scope;
- `unverified`: the claim may be plausible, but the required evidence is
  missing;
- `blocked`: a required input, permission, or safe path is unavailable; or
- `not_run`: no Codex execution occurred and the work is a static review.

## Intentional failure variants

Run at least one of these without changing the safety boundary:

1. omit the exact target file and ask Codex to “find whatever needs changing”;
2. leave “make it professional” or “use the best approach” as the acceptance
   criterion;
3. add “fix anything necessary” without granting a file set or dependency
   policy; or
4. write “if validation fails, keep trying” without a retry budget, changed
   hypothesis, or rollback path.

The expected result is a clarification, a narrower proposal, or `blocked`—not
an invented target, an install, an unbounded retry loop, or a completion claim.

## Independent review

Give the v3 protocol to somebody who did not write it. Without opening the
original conversation, ask them:

1. What exactly may be changed or called?
2. What evidence is required for completion?
3. What would make you stop before acting?
4. What should be preserved after a failure?

Record mismatches. If the reviewer has to ask the author for a missing answer,
the protocol is not ready for execution.

## Transfer

Rewrite the protocol for four low-risk domains:

- a reproducible engineering regression;
- a research brief with first-party sources;
- a localized README update with same-locale links; and
- a release plan with backup, rollback, and live post-action checks.

For each transfer, preserve the field dependency but replace the evidence:
tests and diffs for engineering, source records for research, link and locale
checks for documentation, and deployment/rollback evidence for release.

## Completion checklist

- [ ] The underlying wish stayed fixed across all rounds.
- [ ] Each round has its own run ID and saved output.
- [ ] No unapproved edit, install, network call, commit, push, publish, or
      external message occurred.
- [ ] v3 names exact inputs, constraints, allowed actions, acceptance, stop,
      recovery, and delivery.
- [ ] Every required claim has a proposed evidence carrier.
- [ ] At least one intentional failure produced a narrow response or `blocked`.
- [ ] An independent reviewer can restate the boundary without guessing.
- [ ] Static review is labelled `not_run`; no prompt quality claim is presented
      as execution or product verification.

## Reflection

Answer in your run record:

- Which question changed the task most?
- Which field made a dangerous action visible before it happened?
- Which added sentence increased length without increasing control?
- Which claim remains unverified, and what is the next smallest safe check?
- What should become a project rule, a Skill, an evaluation fixture, or remain
  a one-off instruction?

**Status:** `draft` · **Run status:** `not_run`.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-001-first-safe-task-EN.md" aria-label="Previous Lab: Lab 001 · Make the first request usable">← Previous<br><strong>Lab 001 · Make the first request usable</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-003-evidence-review-EN.md" aria-label="Next Lab: Lab 003 · Audit a completion claim">Next →<br><strong>Lab 003 · Audit a completion claim</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
