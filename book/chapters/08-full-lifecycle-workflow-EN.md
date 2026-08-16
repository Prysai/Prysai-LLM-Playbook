<!-- content_id: chapter-08-full-lifecycle-workflow | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 8: From Definition to Delivery

**Status:** `candidate`. This chapter defines an evidence-carrying workflow and
its recovery rules, but the comparison experiment has not been run. The case
material is project-owned teaching material. It is not a record of a live
Codex run, a customer engagement, or a production release.

## The problem this chapter solves

Getting Codex to “start writing” is easy. Finishing a useful piece of work is a
different problem.

A task can look healthy while its goal is still vague, its scope is expanding,
its checks are running against the wrong files, or its last successful change
is unknown. A model-capacity error can interrupt one task while a later prompt
continues against a half-finished state. A terminal can remain in `Working`
without producing evidence that the command completed. A browser can report a
successful login while the client still fails at the next token-exchange step.

The practical answer is a workflow with explicit exits:

```text
define → plan → build → verify → review → deliver → maintain
```

Each arrow is a decision point. A stage is not complete because the interface
moved forward or the Agent said “done”. It is complete when the evidence for
that stage exists and another person can inspect it.

![Teaching card: a workflow carries evidence from definition to maintenance](../../assets/teaching/lifecycle-checkpoints.svg)

> This is a project-owned teaching card. It explains the structure of the
> method; it does not prove that a Skill, Agent, or external service executed
> the workflow.

### See one output, with its boundary still visible

The repository also includes a disposable, project-owned case that carries the
same discipline into a non-code deliverable: a fictional buyer-first real-estate
concept page. Read the [case record](../../docs/research/skill-case-product-context-real-estate-2026-08-11.md)
before looking at the screenshot. It names the synthetic inputs, the local
rendering command, the recorded viewport, and the claims the image cannot make.

[![Local rendering of the synthetic first-time buyer guide](../../assets/cases/product-context-real-estate-thumbnail.png)](../../assets/cases/product-context-real-estate-desktop.png)

The screenshot is evidence of one local render at the recorded viewport. It is
not evidence that the Product Context Skill ran independently, that the listing
is real, or that the page improves trust, enquiries, conversion, or sales. The
[sandbox source](../../examples/skill-sandbox/product-context-real-estate/README-EN.md)
is intentionally small enough to inspect and rerun without credentials or
external requests.

## Learning objectives

By the end of this chapter, you should be able to:

- write a task definition with scope, non-goals, acceptance, authority, and a
  recovery target before allowing an edit;
- turn a large request into a vertical slice that produces inspectable evidence
  early rather than leaving several incomplete layers;
- create checkpoints that preserve the last known-good state and make retries
  conditional rather than automatic;
- distinguish build, runtime, visual, source, security, and user-acceptance
  evidence; and
- deliver a truthful handoff that names what happened, what did not happen, and
  what the next reviewer must still check.

## A real-world entry point: the workflow can fail between two screens

The project's [Codex field research](../../docs/research/field-problems-codex.md)
records public user reports. Those reports are useful symptoms, not official
root-cause analyses and not local reproductions.

| Reported symptom | What the report supports | What it does **not** prove | First safe response |
|---|---|---|---|
| A selected model becomes unavailable and the task stops | The reporter observed a capacity error and an interrupted task | The queue semantics, service-side cause, or behavior for every account and release | Freeze later prompts; inspect the diff, logs, and last accepted checkpoint before retrying |
| A formatter or validation task stays in `Working` for a long time | The reporter observed no completion signal within that run | A universal deadlock, the exact child process, or the root cause | Set a bounded wait; capture output and process state; interrupt only under the task's recovery rule |
| The browser says authentication succeeded but the client fails later | Authentication has several observable stages | Browser success, network reachability, or a page message proves client readiness | Record callback, token exchange, and first successful client request as separate claims |
| Verification expands into a force reinstall | An agent may treat “make sure it works” as permission to change a persistent environment | That the report describes every Agent or that reinstall is always wrong | Separate source changes, tests, installation, restart, deployment, and live verification; ask before persistent changes |

The lesson is not “never retry” or “never install”. The lesson is to make the
next action depend on evidence and authority, not on the passage of time or the
confidence of a status label.

## 1. The lifecycle is a set of evidence-carrying states

The seven stages are a teaching model for organizing work. They are not a
promise that every Codex surface exposes these exact UI states.

| Stage | Question it answers | Typical allowed work | Exit evidence | Stop when |
|---|---|---|---|---|
| Define | What result is wanted, for whom, and within what boundary? | Read the rules, target, inputs, risks, and non-goals | Task protocol and acceptance statement | The missing input changes scope, risk, authority, or acceptance |
| Plan | What is the smallest useful order of work? | Map dependencies, choose a slice, expose high-risk unknowns | Ordered plan with slice boundaries and checks | The plan is horizontal layers with no independently checkable result |
| Build | What changed in the allowed scope? | Make one bounded change and preserve a checkpoint | Diff, changed-file list, and checkpoint record | The diff leaves scope or the recovery target is unclear |
| Verify | Does the result behave under the checks that matter? | Run focused tests, builds, runtime checks, visual checks, or source checks | Command, exit code, output, environment, and limits | The command hangs, the wrong target is tested, or evidence is missing |
| Review | Do the claims match the evidence and the requested outcome? | Read the diff in fresh context, inspect risk and maintenance cost | Claim-to-evidence table and open-risk list | A claim is broader than its evidence or authority is ambiguous |
| Deliver | Can another person use and inspect the result? | Hand off files, logs, limitations, and next steps | Delivery summary and exact artifact paths | The status would be overstated as committed, published, or live |
| Maintain | What must be watched, updated, or rolled back? | Record owner, source revision, next review, and rollback | Maintenance record and review trigger | Nobody owns the update or the rollback cannot be rehearsed |

Use `blocked` or `unverified` when an exit condition is missing. Do not fill the
gap by adding another stage. A longer plan cannot substitute for a missing
permission, a missing file, or a missing test result.

### A status label is not an exit check

These statements look similar but carry different evidence:

| Statement | Minimum evidence |
|---|---|
| “The source changed.” | A diff or file comparison at a named path |
| “The check ran.” | The exact command, working directory, exit code, and output |
| “The application works.” | A runtime observation at a named environment and input |
| “The page looks correct.” | A rendered inspection at a recorded viewport, plus the visual acceptance criteria |
| “The feature is shipped.” | The repository or deployment state, release record, and post-delivery check |

The last statement is strictly stronger than the first four. A passing build is
valuable, but it is not automatically runtime, visual, security, or user-
acceptance evidence.

## 2. Define before action

The definition stage turns a wish into a bounded contract. It should be short
enough to read before work begins and specific enough to stop a well-meaning
Agent from inventing scope.

```text
owner: content-maintainer
target: docs/guide.md
goal: make the steps, links, and acceptance notes agree
allowed_scope: read project rules; edit docs/guide.md; run existing local checks
inputs: target file, project rules, defect list, existing link checker
non_goals: no code changes; no dependency install; no commit; no push; no publish
acceptance: the named defects are fixed and the allowed checks have recorded exits
evidence: diff, changed-file list, command output, review notes, unverified list
stop_when: scope, authority, target, or recovery source is missing
rollback: restore the pre-edit copy or return to the recorded clean checkpoint
delivery: local review packet; state whether commit and push were not performed
```

Two details are easy to omit:

1. `non_goals` protect the task from accidental expansion. “Verify the page”
   does not silently include reinstalling the browser, changing system policy,
   or publishing a result.
2. `rollback` must name an actual recovery source. A hash tells you that a file
   changed; it does not restore the previous contents by itself.

### The minimum authority rule

Start with read-only inspection. Add write access only for the named target.
Add network, authentication, installation, restart, deployment, or external
messaging only when the task needs it and that scope has been authorized.

This is especially important when a task crosses a product boundary. The
official security record describes sandbox and approval as separate controls;
it also treats side-effecting connector or MCP actions as part of the approval
boundary. A workflow therefore records both the technical capability and the
semantic permission to use it. See the [official facts refresh](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)
and the [fact-impact registry](../../docs/governance/fact-impact-registry.yaml)
for the dated product boundary.

## 3. Plan around vertical slices

Horizontal plans finish a layer before proving that a user can get a result:

```text
all data model → all API → all UI → integration → tests
```

If the interface assumption is wrong, the failure may remain hidden until the
end. A vertical slice takes one narrow outcome from input to evidence:

```text
one input → smallest data/change → one observable action → one focused check
```

For example, “a reader can open one chapter and find the experiment” may be a
better first slice than “migrate the entire book navigation”. The slice can
include one English chapter file, one directory link, one local-link check, and
one review of the status boundary. It is small, but it exercises the whole
path.

| Slice field | Example |
|---|---|
| Outcome | One chapter opens from the English table of contents |
| Inputs | Chapter source, directory entry, locale matrix, link checker |
| Change | Add the canonical English file and update only its English entry points |
| Acceptance | The link resolves, status is registered, and old path is retained only where governance declares it legacy |
| Evidence | Diff, validator output, local-link output, and a review of the scoped files |
| Not proven | Translation quality, reader comprehension, browser deployment, or runtime Skill behavior |

The first slice should expose the most expensive unknown early. If the work
depends on an unavailable credential, a provider capability, or a missing
artifact, that dependency belongs in the first slice rather than at the end.

## 4. Build with checkpoints

A checkpoint is a recoverable description of state, not just a timestamp. It
should make the next decision possible without trusting the previous chat
history.

```text
run_id: chapter-review-001
CP0: clean or intentionally dirty baseline; status; target hash; rollback source
CP1: definition accepted; plan and permissions fixed; no edit yet
CP2: first slice changed; diff and changed-file list saved
CP3: focused checks completed or stopped; output and unverified items saved
CP4: independent review completed; delivery state and next review recorded
```

At each checkpoint ask:

- What is the last thing we know succeeded?
- Which files, processes, services, or accounts may have changed?
- What evidence is still missing?
- What is the smallest safe next action?
- What condition requires a pause instead of a retry?

Do not queue dependent work on a checkpoint that has not been accepted. A user
report in the field research describes the dangerous version of this mistake:
after a capacity interruption, later work may be treated as if the earlier task
had completed. The report does not prove universal queue semantics, but it gives
us a safe rule: a conversation reference is not a verified prerequisite.

### Retry only after the state is known

An acceptable retry record says:

```text
failed_stage: verify
failure_class: model capacity / command timeout / unknown
last_accepted_checkpoint: CP2
changes_since_checkpoint: none known; diff rechecked
retry_condition: same command, same target, one bounded attempt
fallback: stop and hand off if output remains absent or scope changes
```

“Continue” is not a recovery plan. It does not identify the last accepted
state, protect against duplicate side effects, or explain why the same action
should work now.

## 5. Verify in layers

Verification is a selection problem. Choose checks that correspond to the
claims you intend to make.

| Claim | Check that can support it | Boundary of that check |
|---|---|---|
| The intended file changed | Diff at the named path | Does not prove the change is correct |
| The syntax or build is valid | Focused validator or build command | Does not prove runtime behavior |
| The feature behaves in one environment | Runtime check with fixed input | Does not generalize to every account, OS, or provider |
| The page renders as intended | Browser or visual inspection at a recorded viewport | Does not prove customer demand, accessibility completeness, or production deployment |
| The external fact is current | Dated authoritative source with scope and next review | Does not prove this account has access or this local session is configured |
| The release is live | Deployment record plus post-delivery request/check | Does not prove every cache, route, device, or user path is correct |

Keep a claim-to-evidence table while working:

```text
claim: Chapter 8 is reachable from the English directory
evidence: table-of-contents-EN.md link; local link checker exit 0
scope: repository working tree at the recorded commit
not_proven: GitHub rendering, translated links, reader comprehension

claim: the comparison experiment is complete
evidence: none
scope: none
status: not_run; do not claim complete
```

### When a command stays in `Working`

Treat silence as an observation, not a success signal. Before starting a long
command, define an expected output, a reasonable wait, and an interrupt path.
If the wait expires:

1. record the command, working directory, target, and elapsed time;
2. capture whatever output and process state are available;
3. inspect the diff and the last checkpoint;
4. interrupt only if the task permits interruption and the process is safe to
   stop;
5. rerun only after classifying the result as complete, partial, failed, or
   unknown.

The public report behind FP-10 does not establish whether the formatter, child
process, terminal, or Agent loop was responsible. That uncertainty is exactly
why the recovery rule must rely on evidence rather than a guessed root cause.

## 6. Review independently of execution

The person or Agent that produced a change is often the least useful source for
deciding whether the change is complete. Review the artifact in fresh context,
with the original goal and evidence list visible.

Use four questions:

1. Does the diff solve the stated problem?
2. Did it change anything outside the allowed scope?
3. Does every completion claim have evidence at the same scope?
4. What would a future maintainer need to reproduce, update, or roll back it?

Review should include the failed attempt, not only the successful-looking final
state. A failed command may have changed files. A retry may have duplicated a
side effect. A browser screenshot may hide a missing network request. A green
build may have skipped the test that matters.

## 7. Deliver and maintain

A useful delivery note is short, concrete, and honest:

```text
status: ready_for_local_review
owner: content-maintainer
scope: docs/guide.md only
actions_done: inspected; planned; edited; ran diff and local checks
actions_not_done: commit; push; publish; browser review
evidence: CP0; CP2 diff; CP3 command output; review notes
unverified: reader usefulness; rendered appearance; facts outside the brief
blocked_on: reviewer confirmation before commit
next_check: inspect the target file and evidence paths
permission_boundary: local reversible edit and read-only checks
next_review: after the source or chapter structure changes
```

Delivery is not the end of the lifecycle. If the output contains a volatile
model, tool, permission, command, or service fact, record its authoritative URL,
access date, scope, owner, and next review. If the output is a Skill or shared
workflow, record its trigger, exclusions, dependencies, tests, and rollback.
If nobody owns those updates, the capability is not ready for team use.

The official Cloud documentation is a useful example of why lifecycle stages
cannot be collapsed: setup, agent work, result review, and follow-up are
distinct surfaces with distinct evidence. The documentation itself is a dated
product source, not proof of access to a particular account or workspace.

## 8. Recovery patterns from real reports

### Capacity interruption

**Observed symptom:** the selected model reports that it is at capacity and the
task stops.

**Safe first response:** freeze dependent prompts, save the current diff and
logs, identify the last accepted checkpoint, and check whether the intended
file or artifact is partial. Then choose one bounded retry, a fallback surface,
or a handoff.

**Do not claim:** that the queued task completed, that the model was the only
cause, or that repeated “continue” prompts restored the missing evidence.

### Long-running verification

**Observed symptom:** the interface remains in `Working` while a formatter,
test, or analysis command produces no completion signal.

**Safe first response:** apply the defined timeout and interruption rule, save
the output and process state, inspect the diff, then classify the check. If the
cause is unknown, leave it unknown.

**Do not claim:** that “still running” means “passed”, or that no visible error
means the child command finished.

### Authentication with a successful first page

**Observed symptom:** a browser page says login succeeded, but a client later
fails to exchange a token or make its first request.

**Safe first response:** create a state card with separate rows for authorization
page, callback, client exchange, and first successful request. Test only the
next missing state.

**Do not claim:** that browser success proves client authentication, account
entitlement, connector approval, or MCP tool availability.

### Verification that asks for a persistent change

**Observed symptom:** an Agent proposes reinstalling, restarting, or modifying a
local environment to make a check pass.

**Safe first response:** stop and name the proposed side effect, target, source
artifact, backup, rollback, and authorization point. Prefer an isolated or
read-only check until that decision is explicit.

**Do not claim:** that a source diff, a passing unit test, and a successful
installation are the same state.

## 9. Worked case: review one Markdown chapter

This case is intentionally small. It demonstrates how the fields from the
task-protocol, Skill, Agent, and action-boundary chapters connect. It is a
filled teaching example, not a recorded run.

### Definition

```text
owner: content-maintainer
target: docs/guide.md
goal: make steps, links, and acceptance descriptions consistent
allowed_scope: edit docs/guide.md; run existing local checks
non_goals: no code; no install; no commit; no push; no publish; no external messages
```

Inputs are the target file, project rules, an existing link checker if one is
documented, and a fixed defect list. Do not read secrets, customer material, or
unrelated directories. If a defect depends on a volatile product fact, send it
to the source record before writing it into the chapter.

### Capability decision

| Capability | Decision | Reason |
|---|---|---|
| Task Protocol | Use | Fixes goal, scope, confirmation points, and delivery format |
| Workflow Orchestrator | Use as a stage record | Tracks dependencies and checkpoints; it does not expand authority |
| Evidence Review | Use | Maps “link check passed” and “one file changed” back to evidence |
| Research | Do not use yet | No new external fact is needed for the fixed defect list |
| Browser, connector, GitHub write actions | Do not use | They add no value to a local Markdown review |

Selecting a Skill does not make the task complete. It also does not give that
Skill permission to invoke another tool or start a separate workflow.

### Stage exits

| Stage | Allowed action | Exit evidence |
|---|---|---|
| Define | Read rules, target, and defect list | Task card, input list, allowed scope |
| Plan | Order two or three local edits | Plan, dependency order, assumptions |
| Build | Edit only `docs/guide.md` | Diff, checkpoint, changed-file list |
| Verify | Run the existing local checks | Commands, exit codes, output, limits |
| Review | Read the diff against the goal | Review note and claim-evidence table |
| Deliver | Prepare a local review packet | Summary that says whether commit/push happened |

If a stage lacks its exit evidence, mark the run `blocked` or `unverified`.
Do not continue simply because the next stage is available in the plan.

### Checkpoints and recovery

```text
CP0: original copy + git status + target hash
CP1: plan accepted; no edit yet
CP2: local edit complete; git diff -- docs/guide.md saved
CP3: checks completed or interrupted; output and limits saved
```

If CP2 leaves the allowed scope, preserve the diff before correcting it and
return to CP0's recovery source. If only one paragraph is wrong, repair that
paragraph and rerun the relevant check. Do not use a broad restore command
without first confirming the exact target and recovery source.

### Truthful delivery

```text
completed: reviewed and edited docs/guide.md; saved the actual diff
verified: allowed scope; diff format; named local link check, with exit codes
unverified: browser rendering; reader usefulness; facts outside the defect list
not_done: commit; push; publication; external writes
next: human review of the evidence paths before any local commit
```

## 10. Experiment: compare two plans for one outcome

**Experiment status:** `not_run`.

### Setup

Choose a low-risk feature or documentation delivery. Use a disposable copy or
an explicitly isolated branch. Prepare sanitized inputs, a fixed acceptance
rubric, and a record of the starting state. Do not publish, push, delete, or
modify production resources.

### Task

Write two plans for the same outcome:

1. a horizontal plan that completes each technical layer in sequence; and
2. a vertical-slice plan that takes one narrow outcome from input to evidence.

Do not change the acceptance rubric between plans. Compare the first unknown
exposed, the first inspectable artifact, the number of dependent assumptions,
and the recovery point after an intentional interruption.

### Evidence

Save both plans, a dependency sketch, slice entry and exit conditions, the
actual diff, validation output, and checkpoint notes. The experiment passes
only if at least one slice produces independent evidence and the learner can
name the work that remains incomplete.

### Reflection

Record which unknown appeared earliest, which slice was still too large, and
which checkpoint should be used after a capacity error or a command timeout.
Change one planning condition for the next run; do not rewrite the result to
make the comparison look cleaner.

## Deliberate failure and boundary case

Begin a small change, complete the edit, and write “done” before running its
checks. Then simulate one of these interruptions:

- the model becomes unavailable;
- the verification command produces no output within the defined wait; or
- the proposed recovery requires an install, restart, network call, or write
  outside the original scope.

The learner passes when the handoff retains the checkpoint, partial diff,
missing evidence, authority boundary, recovery path, and a precise statement of
what remains unknown. Continuing to stack edits is a failure of the experiment.

## Transfer

Apply the lifecycle to one non-code task, such as a research brief, a marketing
page, or a design handoff. For each stage, write the entry condition, exit
evidence, stop condition, and side-effect boundary. Then identify which evidence
is equivalent to a diff, which is equivalent to a runtime check, and which still
requires human acceptance.

## Sources and maintenance boundary

| Fact or boundary | Source | Accessed | Applies to | Owner / next review |
|---|---|---:|---|---|
| Sandbox and approval are separate controls; connector/MCP side effects can be part of the approval boundary | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) and the [official facts refresh](../../docs/research/openai-codex-facts-refresh-2026-08-09.md) | 2026-08-09 | Official product description at that date; not proof of this repository's runtime policy | `facts-maintainer` / 2026-09-09 |
| Cloud work has distinct setup, agent, review, and follow-up boundaries | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-09 | Product description; account, organization, environment, and current UI still require separate checks | `facts-maintainer` / 2026-09-09 |
| Capacity interruption can leave the status of a dependent task unclear | [FP-09 / issue #33865](https://github.com/openai/codex/issues/33865) in the [field research](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user report; no local reproduction or universal queue conclusion | `curriculum-maintainer` / 2026-09-09 |
| Long-running verification can leave the completion state unclear | [FP-10 / issue #34325](https://github.com/openai/codex/issues/34325) in the [field research](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user report; root cause and release scope remain unknown | `curriculum-maintainer` / 2026-09-09 |
| Authentication should be recorded as separate observable stages | [FP-01, FP-02](../../docs/research/field-problems-codex.md) | 2026-08-09 | User reports used for evidence discipline; not official repair guidance | `curriculum-maintainer` / 2026-09-09 |
| Verification must not silently expand into installation or persistent environment changes | [FP-11 / issue #37677](https://github.com/openai/codex/issues/37677) in the [field research](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user report; not an official policy or local reproduction | `curriculum-maintainer` / 2026-09-09 |

The lifecycle principles are intended to be stable. Product surfaces, model
names, approval defaults, command flags, authentication behavior, and external
services are volatile. When one changes, refresh the first-party record, then
review this chapter, related labs, Skills, evaluation fixtures, and site paths.

## Acceptance checklist

- [ ] I can write a task definition with a goal, scope, non-goals, acceptance,
      authority, evidence, and rollback source.
- [ ] I can explain why a vertical slice produces earlier evidence than a
      horizontal layer plan for the same outcome.
- [ ] I can create a checkpoint that another person can use to recover without
      trusting the prior conversation.
- [ ] I can distinguish source, build, runtime, visual, source, security, and
      user-acceptance evidence.
- [ ] I can stop a long-running or capacity-interrupted task without calling
      silence or a repeated retry a success.
- [ ] I can separate browser authentication, client exchange, first request,
      and external tool availability.
- [ ] I can refuse an unrequested install, restart, deployment, or external
      write while preserving the evidence needed for the next decision.
- [ ] I can deliver a handoff that names completed, unverified, blocked, and
      not-done work.
- [ ] I can report that this chapter is `candidate` and that its comparison
      experiment remains `not_run` until a run record and review exist.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-EN.md" aria-label="Previous chapter: Chapter 7 · How Skills, Plugins, MCP, and tools divide the work">← Previous<br><strong>Chapter 7 · How Skills, Plugins, MCP, and tools divide the work</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-EN.md" aria-label="Next chapter: Chapter 9 · Verification, doubt, and recovery">Next →<br><strong>Chapter 9 · Verification, doubt, and recovery</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
