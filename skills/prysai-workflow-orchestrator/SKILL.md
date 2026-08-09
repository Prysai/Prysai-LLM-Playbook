---
name: prysai-workflow-orchestrator
description: >
  Route a complex Codex task through definition, task protocol, planning,
  incremental execution, verification, review, delivery, and maintenance. Use
  when a request spans multiple steps, files, tools, domains, or decisions; when
  the user asks to build something end to end; or when the task needs explicit
  checkpoints, recovery, and evidence. Do not skip definition or verification
  merely because implementation seems obvious.
---

# Workflow Orchestrator

Use this skill to keep a complex task in a working, auditable state. It is a
router and checkpoint discipline, not permission to take every possible action.

## Route the lifecycle

1. **Define** the outcome, users, non-goals, risks, and acceptance criteria.
2. **Protocol** the task with inputs, constraints, allowed actions, failures, and
   delivery format. Use `$prysai-task-protocol` when needed.
3. **Plan** dependencies and small vertical slices. Identify high-risk unknowns
   early and create checkpoints.
4. **Execute** one slice at a time, preserving observable diffs and respecting
   project rules and authorization.
5. **Verify** with evidence appropriate to the claim: tests, build, runtime,
   browser, visual, source, security, or human acceptance.
6. **Review** scope, assumptions, maintainability, failure paths, and evidence.
7. **Deliver** completed, incomplete, inferred, blocked, and next-step items.
8. **Maintain** update sources, project context, known limitations, and rollback
   or migration notes.

## Checkpoint rules

Pause before an irreversible action, external message, production change,
permission expansion, secret access, or unresolved requirement conflict. After
two or three slices, reassess whether the original plan still matches the
observed project.

## Recovery rules

When something fails, preserve the error and state, classify the failure, narrow
the scope, make one evidence-backed change, and re-run the relevant check. Do
not respond to uncertainty with unlimited retries or broader permissions.

## Delivery contract

End with:

- outcome and scope;
- files or systems changed;
- commands/actions actually performed;
- verification evidence;
- known limitations and unverified claims;
- rollback or follow-up;
- status: `practice`, `candidate`, `verified`, or `production-ready`.
