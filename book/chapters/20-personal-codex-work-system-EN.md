# Chapter 20: Build a Personal Codex Work System

> `content_status: candidate`
> `experiment_status: draft / not_run`
> This chapter presents a transferable method. It does not treat a product's memory, automatic loading, or entry-point behavior as a permanent premise.

## The problem this chapter solves

Many people reopen Codex and re-explain the project, goal, terminology, constraints, and acceptance criteria from scratch. The result is inconsistent context, decisions that cannot be traced, stale commands that keep being reused, and useful experience that cannot be carried into the next task. A more serious risk is treating a personal convenience record as a memory store and putting tokens, passwords, cookies, customer text, or unconfirmed conclusions into it.

## A real-world problem entry

FP-10, where a validation or formatting command may appear to stall, and FP-11, where validation is described as expanding into an unauthorized persistent environment change, are reports in public user-problem research. They are not local reproductions or universal root-cause findings. This chapter uses them to ask whether a personal work system exposes stale commands, records a stopping point, and prevents scope from expanding without authorization.

## Learning objectives

By the end of this chapter, you should be able to:

- distinguish project rules, task context, current state, reusable templates, and reflection records;
- build a small, cleanable, traceable personal work package for recurring work;
- compare a system-assisted path with a baseline using fixed inputs, hashes, run logs, and evidence completeness;
- decide when to keep a task protocol, create a Skill candidate, continue observing, or block the work;
- detect stale context and transfer useful practice to another person without storing secrets.

## Concept: five assets with five different jobs

| Asset | Question it answers | Lifecycle | Keep out |
|---|---|---|---|
| Project rules | What must this project consistently obey? | Versioned, intentionally changed, periodically reviewed | Temporary guesses and personal secrets |
| Task context | What must be done this time? | Created for the task and archived afterwards | Unrelated history |
| Current state | What has been read, changed, verified, or blocked? | Updated at each checkpoint | Plans presented as results |
| Template | How should a similar task start and be delivered? | Extracted after repeated practice | Unverified permanent conclusions |
| Reflection record | What worked, what failed, and what should change next time? | Keep only transferable lessons | Tokens, passwords, cookies, customer text, or unnecessary personal data |

More context is not automatically better. Relevance, trustworthiness, sensitivity, and freshness matter more than length.

## Decision: create a Skill or keep a task protocol?

Complete this decision card before creating a reusable asset. Repetition alone is not sufficient.

| Observation | Decision | Required evidence |
|---|---|---|
| The request is one-off, or the input and output are still changing | Keep a task protocol | One task's input, constraints, decisions, and delivery record |
| Inputs, decision points, and outputs are stable, with both positive and failure examples | Create a Skill candidate | At least three runs, a failure set, and a transfer task |
| The method is useful but its trigger boundary or side effects are unclear | Continue observing or block | A gap record, risk statement, and pending validation item |
| Secrets, external writes, or production release are involved and authorization or rollback is unclear | Block | Permission matrix, human approval point, and rollback plan |

At minimum, record `decision_id`, recurring task, candidate asset, stable inputs, failure types, evidence location, owner, `next_review`, and `decision_action`. One accidental success must not become the rationale for a Skill.

## Action: assemble the smallest personal work package

Start with five records: a project map, task protocol, state log, evidence index, and reflection record. At startup, inspect the rules, branch, current state, and permissions. During execution, carry only necessary context. At delivery, separate work actually verified from work still open. During reflection, extract rules that another person could understand and test.

A useful delivery record includes:

- completed items and changed files;
- commands, tests, or inspections that actually ran, with results and exit codes where applicable;
- items not verified, blocked, or outside the authorized scope;
- risks and a concrete recovery method;
- the next review or decision owner.

Whether a product remembers anything, which files it loads, and how an entry point behaves are volatile product facts. Check the current first-party documentation and the actual authorized surface; do not turn personal habit into a product guarantee.

## Experiment: establish a personal work system

This is an offline comparison in a disposable copy. It must not connect to production, send messages, publish, read real secrets, or make external writes.

### Setup

Create a temporary copy and baseline named `personal-system-triage-v1`. Use this fixed, redacted input:

```text
Items to triage:
1. “A button overflows on a narrow screen.” A screenshot exists; no fix has been made.
2. “The build passes.” There is only a command exit code; no user acceptance exists.
3. “Authentication fails.” The version, entry point, and error log are missing.
4. “The copy needs an update.” The audience and source are missing.
```

Use this fixed task text:

> Classify the four items as “needs more input,” “ready for execution,” or “requires human confirmation.” Do not invent missing versions, permissions, or user acceptance. For every item, write the next step and the evidence required.

Before either path runs, save the input hash and the hash of the clean temporary copy. Create blank records named `project-map`, `task-protocol`, `state-log`, `evidence-index`, and `reflection`. Do not put tokens, passwords, cookies, customer text, or unnecessary personal data into them.

### Task

1. **Baseline A:** provide only the fixed task and input. Do not use the five personal work-system records.
2. **Candidate B:** use the five records, label the package `personal-system-v1`, and log what was read, changed, verified, not verified, and blocked.
3. Run each path twice. Restore the same input and temporary-copy baseline before every run. Use `run-id` values `20-personal-system-triage-v1-A-01`, `A-02`, `B-01`, and `B-02`.
4. Do not connect, write, publish, or read secrets. If the task requires any of those actions, mark the run `blocked`; do not infer usability from a simulation.

### Evidence gate

Save one record per run:

```yaml
run_id: "20-personal-system-triage-v1-B-01"
task_id: "personal-system-triage-v1"
system_version: "none | personal-system-v1"
input_hash: "sha256:..."
baseline_hash: "sha256:...; restored temporary-copy baseline"
context_files: ["project-map", "task-protocol", "state-log", "evidence-index", "reflection"]
clarification_rounds: 0
actual_changes: "no-change or file/diff summary"
validation: "checks, results, and exit codes; not_run if not executed"
evidence_items: ["input", "classification", "missing-input rationale", "next step", "validation", "unverified note"]
evidence_completeness: "0/6"
rework_count: 0
log_location: "evals/results/; not_run if no run exists"
reviewer: "independent review role; not_assigned if none"
unverified_items: ["actual entry-point behavior", "account-level permissions", "runtime result"]
status: "pass | fail | not_comparable | blocked | not_run"
```

The comparison table must include repeated explanation count, clarification rounds, time to discover missing input, rework count, evidence completeness, classification errors, and actual elapsed time. Evidence completeness is the proportion of six required materials that can be checked. If the baseline or input hashes differ, use `not_comparable`; do not call the difference an improvement.

The candidate path is eligible for an experiment pass only when all four logs are complete, no secret or external side effect occurred, and the classification and stopping rationale meet the acceptance checklist. Even then, the result does not make the Skill `verified`.

### Failure case and boundary

Add one deliberately stale command and one old directory to the project map as static fixture data. Correct behavior is to inspect the current state, mark the records stale, stop reusing the old command, and record the gap in the state log. If the learner copies the stale record, fabricates authentication details, expands permissions, or presents a plan as verification, the experiment fails and the failure log is retained.

### Reflection

Answer these questions in the `reflection` record:

- Which context item actually changed the decision?
- Which record was already stale?
- Which evidence is still missing?
- What explains the difference between the baseline and candidate paths?
- What should be deleted, retained, or updated next time?
- Can the lesson transfer to another domain, and what is its limit?

Update the decision card after answering. “Remember to be careful” is not a transferable rule.

## Boundaries and common mistakes

- An ever-growing context mixes old facts with new goals.
- Personal records are not secret storage and cannot replace permission review.
- “The command started” is not validation completed; “the account was used before” is not proof that the current entry point and scope are correct.
- For a one-off request, a task protocol is usually lighter than a new Skill.
- Without independent reproduction, a failure set, and transfer evidence, a Skill remains `candidate`.
- A configured product feature, a remembered conversation, or a successful build does not by itself prove current runtime behavior, team impact, deployment, or user acceptance.

## Transfer task

Give one stable personal workflow to another member. The second person may use only the project map, task protocol, and evidence index, and must work in a disposable copy without oral supplementation. Save the input hash, run log, diff, acceptance result, and missing-evidence list. Record which implicit knowledge was not written down, then decide which asset to revise.

## Acceptance checklist

- [ ] I can distinguish rules, task context, state, templates, and reflection.
- [ ] My records contain no token, password, cookie, customer text, or unnecessary personal data.
- [ ] I can compare two paths with the same input and baseline.
- [ ] Each run has a `run-id`, log, evidence completeness value, and unverified-items list.
- [ ] I can distinguish creating a Skill, keeping a protocol, observing, and blocking.
- [ ] I can identify a stale command and describe a recovery method.
- [ ] Another person can reproduce the key judgment without oral supplementation.

## Sources and maintenance boundary

The context, evidence, and reflection method is project methodology. Product entry points, Skill invocation and distribution, automatic loading, permission modes, and product features are volatile facts. The following records define the source boundary; they do not prove behavior for every account or runtime.

```yaml
- claim: "Skill invocation and distribution must be checked against the current official Skills and Plugins documentation and the authorized entry point"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "curriculum maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Permission and approval boundaries depend on the operating surface, sandbox, and approval configuration; they cannot be inferred from one session"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and curriculum maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

This chapter deliberately makes no claim that a memory feature exists, automatically saves a particular category of content, or is available in a particular account. If such a claim is added later, it needs a direct source, scope, access date, owner, and review record. Chapter status remains `candidate`; the experiment remains `draft / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-EN.md" aria-label="Previous chapter: Chapter 19 · Evaluate models and workflows">← Previous<br><strong>Chapter 19 · Evaluate models and workflows</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="21-team-capability-system-EN.md" aria-label="Next chapter: Chapter 21 · Build a team capability system">Next →<br><strong>Chapter 21 · Build a team capability system</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
