<!-- content_id: chapter-16-engineering-track | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 16: Engineering Track — From Idea to Reliable Software

> **Status:** `candidate`  
> **Experiment status:** `draft / not_run`  
> This chapter teaches an engineering lifecycle. The field reports below are user reports or analysis, not local reproductions or root-cause confirmation for every version.

## The problem this chapter solves

Engineering tasks tempt an Agent to start coding before the requirements, architectural trade-offs, test design, runtime observation, and rollback plan are clear. A patch can compile and all unit tests can pass without the user path working, error handling being sound, dependency versions matching, deployment being safe, or production being recoverable.

This chapter treats an engineering Skill as an evidence-bearing lifecycle. Every stage has entry conditions, a smallest useful slice, failure paths, and exit evidence. When validation stalls or fails, diagnose before adding code or expanding permissions.

## Learning objectives

By the end of this chapter, you should be able to:

1. State the scope, entry conditions, exit conditions, risks, and stop conditions for an engineering task.
2. Put official-documentation checks, incremental implementation, tests, debugging, runtime checks, review, release, and rollback into one workflow.
3. Distinguish a successful build, passing unit tests, passing integration tests, correct runtime behavior, user acceptance, and production readiness.
4. Recognize long-running commands, half-finished work, unauthorized environment replacement, secret exposure, and non-reversible changes, while preserving recovery evidence.

## Real-world reports: changing code is not completing the work

- **FP-09:** A model-capacity error was reported to interrupt a task, while queued requests could attach to a partially completed state. Before retrying, inspect the worktree, diff, tests, and completion point; do not append new instructions to an unknown state.
- **FP-10:** A Windows CLI formatting or validation command was reported to remain in Working without a clear error. Give commands an output boundary or timeout, and separate “the command started” from “validation passed.”
- **FP-11:** An Agent was reported to expand source verification into a persistent-environment force reinstall. Installation, publication, deployment, restart, and live verification need separate authorization states.

These are user reports or analyses from field research, not local reproductions and not root-cause confirmation for all versions. Use the current repository and current runtime evidence for an actual engineering decision.

## Core concepts and decisions

### 1. The engineering lifecycle

```text
Problem definition → specification and acceptance → plan and slices
                   → incremental implementation → static checks/tests
                   → runtime verification → review/simplification
                   → release/rollback → maintenance/regression
```

State the entry condition and the smallest exit evidence for each stage:

| Stage | Entry condition | Minimum exit evidence |
|---|---|---|
| Definition | A user/system problem and scope exist | A problem statement that another person can repeat |
| Specification | Boundaries, inputs, outputs, and errors are known | Acceptance criteria and non-goals |
| Planning | Dependencies and risks are identified | Independently verifiable slices |
| Implementation | The current slice and baseline are confirmed | A small, explainable diff and update record |
| Testing | Behavior and failure paths can be exercised | Commands, results, and an explanation of failures |
| Runtime verification | A startable environment and representative data exist | Logs, screenshot/response, version, and environment |
| Release | The change is reviewed and rollback is available | Release record, monitoring, and rollback rehearsal |

### 2. Specification comes before implementation

A good engineering task states the user action, input constraints, success output, error output, boundary behavior, non-goals, performance/security constraints, observable signals, and acceptance method. If the request is only “add an export feature,” clarify the format, data range, permission, partial-file behavior, overwrite policy, and final acceptance. Do not let a Skill replace a decision with a default.

### 3. Source-driven, doubt-driven, incremental

- **Source-driven:** Treat official documentation, type definitions, current code, or a reproducible result as the authority for framework, API, library, and version behavior. Blogs and model memory are leads.
- **Doubt-driven:** Check claims that types and unit tests cannot prove, including real network, database, browser, permission, concurrency, time-zone, and deployment behavior.
- **Incremental:** Change one explainable slice at a time and preserve a diff and rollback point. Do not stack fixes on an unknown failure state.

### 4. Runtime evidence has its own level

Build evidence says that code can be built. Test evidence says that specified assertions passed. Runtime evidence also needs the start command, dependency versions, whether environment variables are test values, real inputs, responses or screens, logs, and error paths. Production readiness additionally needs security, performance, migration, monitoring, rollback, and user-acceptance evidence. These categories cannot impersonate one another.

### 5. Stop conditions and permission boundaries

No output until a timeout, an unavailable test dependency, an unknown worktree change, a request for real credentials, a persistent-environment modification, or a request to publish, deploy, or restart are all signals to stop and check scope. If validation requires package installation or runtime replacement, obtain explicit authorization first and record the artifact, target path, impact, and rollback. Without authorization, use an isolated environment, test account, or static check.

## Observable experiment: compare direct implementation with a full lifecycle

### Setup

Choose a low-risk feature, such as deduplicating a local text list and writing JSON. Prepare a baseline project, five normal records, empty input, duplicate input, and invalid-encoding or missing-field input. Fix the runtime version, ensure there are no real secrets or external writes, and set a short command timeout and output directory.

### Task

1. **Direct-implementation round:** give the Agent only the goal. Record whether it clarifies the specification, which files it changes, which commands it runs, and whether it handles invalid input.
2. **Lifecycle round:** first request the problem statement, acceptance criteria, non-goals, slice plan, and test matrix. Implement incrementally and inspect the diff after each step.
3. Run static checks, unit tests, a real local execution, empty input, and invalid-input tests in both rounds. Record when each issue is found.
4. Simulate an interruption or capacity error. Stop first; inspect the worktree, recent diff, logs, and test state; then choose whether to continue, roll back, or create a new checkpoint.
5. Do not force-reinstall, write to production, deploy, or restart. If the Agent proposes any of these, record it as outside authorization.

### Evidence

Keep both task contracts, diffs, test matrices, commands and exit statuses, runtime inputs/outputs, error logs, the stage where each problem was found, rollback points, and final acceptance records. Mark at least four distinct states: build succeeded, tests passed, runtime behaved correctly, and user/release acceptance. Evidence should answer which version, in which environment, with which input, produced which result.

### Failure variant

Let a formatter enter a long no-output state, or make the test depend on a service that does not exist. The correct response is to stop and regain control, inspect the worktree and process state, and mark validation incomplete. Do not wait and then claim success or escalate to an environment reinstall. Next, leave the previous slice half-finished and append an unrelated request. The correct response is to create a checkpoint first, not apply the new request directly to an unknown state.

### Reflection

Answer:

- What evidence did the full lifecycle preserve that direct implementation did not, and which issues surfaced earlier?
- Which runtime evidence could not be replaced by unit tests?
- When would you roll back, and when would you continue diagnosis?
- If persistent installation were required for validation, what new authorization, impact, and rollback record would be needed?

## Failure and boundary cases

- **Looking only at green tests:** tests may not start the real service, load the real build artifact, or cover permissions, browsers, or mobile paths. Add integration, end-to-end, or human runtime evidence.
- **A successful build with a failed runtime:** inspect the startup entry point, environment variables, dependency versions, static assets, routes, database migrations, and logs. Do not call compilation runtime verification.
- **A command hangs:** following FP-10, set a timeout, output boundary, and interrupt path. After interruption, recheck the worktree, residual processes, and validation status.
- **Model-capacity or session interruption:** following FP-09, review the diff and completion point, then continue from a clean checkpoint. Do not assume a queued task knows the current state.
- **Validation expands into environment replacement:** following FP-11, distinguish `source modified`, `validated`, `installed`, `published`, `deployed`, `restarted`, and `live verified`, and authorize them separately.
- **An external dependency is inaccessible:** record the unverified item and use a test double or sandbox. “The command ran” is not evidence from the external system.
- **Rollback is unavailable:** without a recoverable artifact, database backup, migration reverse operation, or configuration snapshot, production release should stop at `candidate`.

## Transfer exercise

Choose an existing engineering task and rewrite it as a one-page task contract: problem, scope, acceptance, non-goals, permissions, risks, slices, test matrix, runtime verification, and rollback. Then:

1. Write a check for normal, empty, invalid, timeout, and insufficient-permission inputs.
2. Ask the Agent to implement only the first slice and preserve diff and command evidence.
3. Perform one real local or sandbox startup check and record version, input, logs, and result.
4. Ask a colleague to classify the evidence as `draft`, `candidate`, `verified`, or `production-ready`, then correct any overclaim.

## Acceptance checklist

- [ ] I wrote scope, non-goals, entry conditions, exit conditions, and stop conditions for the engineering task.
- [ ] I split the task into incrementally runnable and reversible slices.
- [ ] I can distinguish build success, test success, correct runtime behavior, user acceptance, and production readiness.
- [ ] I used official documentation or current code to check important framework/API claims.
- [ ] I covered normal, boundary, failure, permission, and timeout paths.
- [ ] I kept diffs, commands, exit statuses, logs, runtime environment, and final output evidence.
- [ ] I can explain the recovery and permission boundary for FP-09, FP-10, or FP-11.
- [ ] I did not install, force-reinstall, publish, deploy, or restart without authorization.

## Sources and update boundary

- Real-world problem entry: [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-09, FP-10, and FP-11; record status `candidate`, access/curation date 2026-08-09, owner Field Guide maintainers.
- Engineering method and external assets: [`docs/sources/asset-register.md`](../../docs/sources/asset-register.md), S05 as a domain reference. This chapter is an original process rewrite and does not copy external Skill text.
- Volatile framework/API/version facts: check the relevant project’s official documentation and the [OpenAI Codex repository](https://github.com/openai/codex). Record the URL, version, access date, and verification scope in the engineering record.
- Update owner: Engineering-track maintainer. Review whenever runtime, dependencies, release process, or permission policy changes, and no later than 2026-11-09. Chapter status is `candidate`; an engineering delivery should be called `verified` or `production-ready` only when runtime, failure-recovery, and release-rollback evidence is complete.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-EN.md" aria-label="Previous chapter: Chapter 15 · Research track: from question to auditable knowledge">← Previous<br><strong>Chapter 15 · Research track: from question to auditable knowledge</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-EN.md" aria-label="Next chapter: Chapter 17 · Marketing track: from product understanding to growth experiments">Next →<br><strong>Chapter 17 · Marketing track: from product understanding to growth experiments</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
