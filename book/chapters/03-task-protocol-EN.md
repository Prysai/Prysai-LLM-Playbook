<!-- content_id: chapter-03-task-protocol | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-10 -->

# Chapter 3: Turn a wish into a task protocol

![Teaching board: move from a request through scope, action, checking, and a bounded handoff](../../assets/teaching/task-to-evidence-red-black.svg)

## The problem this chapter solves

“Make the homepage better.” “Research this.” “Use the best Skill.” “Deploy
the fix.” These requests sound clear until somebody has to decide which files
to read, which actions are allowed, what counts as success, and when to stop.

When those decisions remain implicit, an Agent has to fill the gaps with
assumptions. That creates a familiar kind of failure: the output is polished,
but it changes the wrong surface; the research has links, but not the sources
that own the claims; the build passes, but the running page was never checked;
or a validation request quietly expands into an install, an external call, or
another round of edits.

This chapter treats a serious prompt as a small task protocol. A protocol does
not prescribe hidden reasoning or every keystroke. It makes the observable
contract explicit: goal, context, inputs, constraints, allowed actions,
acceptance evidence, stop conditions, recovery, and delivery.

The central rule is:

> Add detail when it removes a decision that could change scope, risk,
> acceptance, or evidence. Remove detail when it only makes the request sound
> more authoritative.

## Learning objectives

After this chapter, you should be able to:

- turn a vague request into a bounded protocol another person can execute;
- distinguish useful context from untrusted material that merely looks like an
  instruction;
- write acceptance as a claim-to-evidence table rather than “make it good”;
- separate read, edit, run, commit, push, publish, and external-service
  actions;
- define a stop condition for missing input, unclear authority, repeated
  failure, and evidence gaps; and
- hand the protocol to another Agent or teammate without losing ownership,
  scope, or unresolved questions.

## What the sources actually support

The official prompt and Codex guidance used for this chapter converge on a
small set of practical ideas: state the desired result, provide relevant
context, specify the output and boundaries, point to the relevant code or
reproduction steps, and say how the change will be checked. The same sources
also recommend examples, task decomposition, iteration, and evaluation for
work that must remain reliable over time.

Those are source-backed recommendations, not a guarantee that a model will
follow an implicit rule. The eight-part protocol below is this project's
original operational synthesis. It adds explicit stop, recovery, and evidence
fields because a generated answer and a verified work product are different
claims.

See the [official Codex fact baseline](../../docs/research/chapter-03-official-baseline-2026-08-10.md)
and the [real-work prompt pattern research](../../docs/research/prompt-patterns-for-real-work-2026-08-10.md)
for source-by-source scope and access dates.

## The eight-part protocol

```text
goal → context → inputs → constraints → allowed actions → acceptance
     → failure and stop → delivery
```

### 1. Goal: name the result

State what should be changed, researched, or delivered, who needs it, and why
now. Prefer a result that can be inspected over a verb that leaves the scope
open.

Weak:

```text
Improve the project homepage.
```

Stronger:

```text
Create an English-first repository front door that lets a new reader choose
one of four routes, understand where the source of truth lives, open the first
safe task, and see which claims remain candidate or unverified.
```

The stronger version still leaves implementation choices open. It does not
pretend that “professional” is an acceptance test.

### 2. Context: explain the decision environment

Context is the information that can change a decision: audience, current
behavior, project rules, previous decisions, relevant history, version range,
or the reason a failure matters. Keep it separate from the task instruction.

Use labels such as `project rule`, `source fact`, `user report`, `hypothesis`,
and `example data`. A file, web page, tool result, or issue may contain text
that looks like an instruction. Treat it as data until the protocol explicitly
adopts it and the authority is clear.

### 3. Inputs: name what may be read

List exact paths, URLs, data sets, commits, logs, screenshots, or versions.
Also list known gaps. “Read the repository” is rarely a useful boundary; name
the folders or files that control the decision.

For a research task, specify source priority and date range. For a code task,
specify the entry point and reproduction. For a document task, specify the
canonical source and translation state. If the missing input could change the
scope or risk, the protocol must stop rather than infer it.

### 4. Constraints: state what must not happen

Constraints should be mechanically checkable:

- only modify `site/index.html` and `site/app.js`;
- do not add dependencies;
- do not read secrets or `.env` files;
- do not change database, production, permissions, or external services;
- preserve the existing locale identity and status vocabulary; or
- keep the result compatible with a named runtime or release.

“Be careful,” “make it premium,” and “use best practices” may be useful goals,
but they are not sufficient constraints. Convert them into observable
properties or keep them as design intent rather than pretending they can pass
an automated check.

### 5. Allowed actions: separate capability from authorization

A tool being available does not authorize every action it can take. Write the
action levels explicitly:

| Level | Typical action | Evidence before moving on |
|---|---|---|
| A0 | Read status, paths, source, or logs | Scope and current state recorded |
| A1 | Draft a plan or edit proposal | Target files and acceptance named |
| A2 | Make a bounded local edit | Diff remains inside the approved set |
| A3 | Run a focused check | Command came from the project or was approved |
| A4 | Commit or push | User-authorized destination and review evidence |
| A5 | Publish, deploy, notify, pay, delete, or change external state | Explicit approval, rollback, and post-action check |

A protocol may authorize A0–A2 while leaving A3 for confirmation. It may
authorize a focused test but not an install. Never use a broad phrase such as
“do whatever is needed” to hide a permission change.

### 6. Acceptance: map every claim to evidence

Write the claim first, then name the material that would support it:

| Claim | Required evidence | What it does not prove |
|---|---|---|
| The intended files changed | `git diff --name-only` and the diff | Runtime behavior or user approval |
| The check passed | The exact command and exit/output | That the check covers every requirement |
| The page is reachable | A local or deployed URL and a browser observation | All browsers, caches, or authenticated paths |
| The research is current | First-party URL, access date, scope, and next review | That a forum report is an official root cause |
| The task is complete | A claim-evidence table with no unsupported required claim | Work outside the declared scope |

If a claim has no affordable evidence, narrow the claim. “The local build
passed” is often valid; “the feature works for all users” usually requires a
larger test and a declared environment.

### 7. Failure and stop: define the escape hatch

A reliable protocol says when not to continue. Stop and report when:

- the target, current state, or authority is unclear;
- a missing input could change scope, risk, or acceptance;
- a proposed action crosses the approved file, network, account, or data
  boundary;
- output has been silent long enough that the next retry could duplicate a
  side effect;
- two attempts fail for the same untested reason; or
- the evidence supports only a narrower claim than the requested delivery.

Recovery is not “try again with a louder prompt.” Save the first error, reduce
the scope, change one hypothesis or check, and record what the previous attempt
already changed. Before retrying a long or externally visible action, inspect
the current state and diff so a retry does not duplicate the first side effect.

### 8. Delivery: leave a usable hand-off

Require a final record with:

- completed claims and their evidence;
- files, URLs, commands, or records changed;
- actions deliberately not taken;
- unresolved questions, risks, and unverified scope;
- the exact next smallest check; and
- an owner or review date for volatile facts.

The hand-off is part of the product. Without it, the next person has to
reconstruct the protocol from chat history and may repeat a failed action.

## The protocol is a dependency graph

The fields are not a checklist of equally independent adjectives:

```text
goal ───────────────→ acceptance ───────→ stop
  │                      │                 ↑
  ├── requires ─────→ inputs               │
  ├── constrained by → constraints          │
  │                      │                 │
  └── shapes ────────→ allowed actions ─→ recovery
                                             │
context ──> trust and relevance ────────────┘
                         ↓
                      delivery evidence
```

If the goal changes, acceptance changes with it. If a new input changes risk,
the allowed action and stop condition must be revisited. Adding “please be
careful” does not repair a missing dependency.

## Smallest useful protocol

For a low-risk local edit, this is often enough:

```text
Goal: Change <one named file> so that <observable result>.
Read first: <exact files or source of truth>.
Allowed: inspect, then edit <named path> only; run <focused check>.
Do not: install, access secrets or network, commit, push, publish, or touch
production.
Acceptance: <specific diff> and <specific check output>.
Stop: if the path, command, permission, or evidence is unclear.
Delivery: changed files, check result, actions not taken, and unverified items.
```

The protocol can be short because the risk is narrow, not because the missing
fields are harmless.

## High-risk protocol extension

For production, external services, customer data, or irreversible actions,
add a pre-action checkpoint:

```text
Pre-action checkpoint:
- target environment and account:
- current version and backup location:
- exact external side effect:
- approval owner and timestamp:
- rollback target and recovery test:
- post-action URL/log/metric check:
```

Do not let a Skill, a copied runbook, or a successful local build silently
fill these fields. They require current environment evidence and the authority
of the person responsible for the external state.

## Three prompts are better than one oversized prompt

Use staged prompts when the task is uncertain:

1. **Observe:** list relevant files, current state, missing inputs, and risks;
2. **Propose:** write the smallest plan, changed-file set, acceptance claims,
   and stop conditions;
3. **Act:** execute only the approved plan and return evidence against each
   claim.

This makes a plan inspectable before the edit and makes it easier to identify
which stage introduced a bad assumption. It does not remove the need to review
the actual result.

## Six starter prompts that form a learning loop

These are not magic wording. They are six small contracts that make the model
wait for your attempt, diagnose one problem at a time, and separate practice
from evidence. The example uses Spanish, but the bracketed fields work for a
language, software concept, interview skill, writing technique, or other
bounded capability.

### 1. Find the real starting point

```text
I want to learn [hold a five-minute beginner conversation in Spanish].
Do not teach yet. Give me one short baseline task that tests that exact ability.
State the rules, allowed help, time limit, and scoring criteria before I start.
Wait for my answer. Then record what I could do, what blocked meaning, and what
you still cannot infer from one attempt.
```

Use this before lessons. A self-reported level such as “beginner” is less useful
than an observed attempt.

### 2. Make me retrieve before you reveal

```text
Teach me one small unit needed for [ordering food in Spanish]. Keep the opening
explanation under 120 words. Then ask me to produce an answer from memory.
Do not show the final answer before I try. If I get stuck, give one hint at a
time: first the kind of error, then a partial cue, then a worked fragment.
After feedback, require me to answer again in my own words.
```

The critical instruction is not the word count. It is “wait for my attempt.”

### 3. Correct the first consequential error

```text
Act as a precise practice partner, not a cheerleader. For each answer I give:
1. say briefly what communicated successfully;
2. identify the first error that changes meaning or blocks the target skill;
3. explain the rule in plain language;
4. ask me for a corrected attempt;
5. keep an error ledger with attempt, correction, rule, and next variation.
Do not rewrite everything for me, and do not correct minor style while a
meaning-blocking error remains.
```

This prevents a fluent rewrite from replacing learning.

### 4. Test transfer with a changed situation

```text
I just practised [ordering a meal in Spanish]. Give me a new scenario that uses
the same underlying skill but changes the setting, vocabulary, and one source
of ambiguity. Do not reuse the sentences from the lesson. Let me respond first.
Score my answer against the same criteria, show which help I used, and label the
result only as demonstrated on this transfer task, not mastered.
```

A near-copy tests recognition. A changed situation begins to test transfer.

### 5. Build the next review from evidence

```text
Using only the attempts and error ledger in this conversation, create my next
15-minute review. Start with unaided recall, revisit the two errors that still
matter, include one mixed example, and end with one unseen task. Do not claim
you scheduled a reminder. Give me a review cue I can save, the date I should
try it, and the evidence I should bring back.
```

The model can prepare a cue; it cannot truthfully claim that you retained the
skill or that an external reminder exists unless there is evidence for it.

### 6. Research before believing a learning claim

```text
Investigate this claim: [six prompts can make anyone fluent in seven days].
First define the exact capability the claim would need to prove. Prefer primary
research and official source-owner material. For every important conclusion,
record the source, date, population or product scope, direct support, and what
it does not establish. Search once for contrary evidence. Separate facts,
inferences, anecdotes, and unknowns. Stop when further sources no longer change
the decision. End with the narrowest truthful rewrite of the claim.
```

Use this pattern for health, finance, product features, news, statistics, and
other claims where a confident answer without a traceable source is not enough.

### What to save

Keep the baseline, first attempts, hints used, corrected attempts, error
ledger, delayed review, unseen task, and scoring criteria. One smooth session
supports “practised today.” It does not establish fluency, durable retention,
or transfer. The full candidate method and source boundary are recorded in the
[durable LLM-assisted learning research](../../docs/research/durable-llm-assisted-learning-and-skill-candidates-2026-08-12.md).

## Real-world failure patterns

The field reports collected for this project show why these fields matter:

- a long wait or automatic retry can make an Agent appear active without
  proving that the latest instruction arrived or that the external action did
  not happen twice;
- a configuration file can contain a permission setting while the current
  surface, working directory, or persistent runtime policy behaves differently;
- a successful browser login or visible tool name does not prove that the
  target account, organization, repository, or connector is authorized; and
- a community workaround may fit one version and platform while being unsafe
  or invalid on another.

These are user reports and community observations, not universal product root
causes. Use the [field-problem index](../../docs/research/field-problems-index-2026-08-10.md)
and the [coding-agent case report](../../docs/research/field-problems-coding-agents-2026-08-10.md)
to teach the response pattern: record the symptom and environment, perform the
smallest safe check, stop at the boundary, and claim only what the evidence
supports.

## Multiple Agents: hand-off is another protocol

Delegation does not remove the main Agent's responsibility. Give each worker a
disjoint job and a fixed response shape:

```text
Role: inspect the locale matrix; do not edit source files.
Inputs: <two named files>.
Output: findings, evidence paths, blockers, and one recommended next check.
Forbidden: edits, external messages, credentials, and conclusions outside the
declared files.
```

The coordinator should merge facts only after checking each worker's source,
scope, and evidence. A summary from another Agent is a lead, not a verified
claim. If two workers disagree, preserve both reports and resolve the conflict
against the source of truth.

## Experiment: three fixed versions of one request

### Setup

Use the companion [Lab 002](../labs/lab-002-task-protocol-EN.md) with a
disposable project. Keep the underlying wish fixed and create three versions:

- `v1`: only the wish;
- `v2`: the wish plus goal, audience, allowed inputs, and forbidden actions;
- `v3`: the same request plus acceptance, stop, failure recovery, and delivery.

### Task

Ask Codex for clarification and a protocol draft only. Do not let this
experiment edit, install, commit, push, publish, or contact an external
service. Compare the questions asked, assumptions made, allowed actions, and
evidence requested. If no Codex run occurs, label the record a static protocol
review; do not call it execution evidence.

## Intentional failure variant

Give the Agent a request that says “make it look professional” and “fix any
issues you find,” but omits target files, acceptance, permission, and stop
conditions. A passing response must identify the missing decisions or keep the
work at a read-only proposal. It fails if it invents a target, installs a
dependency, expands the edit set, or reports completion without evidence.

Then replace vague words with observable criteria, such as:

- “the English README has a visible locale switcher with six registered
  entries”; and
- “the local link check reports zero broken repository links.”

The criteria still need the project's actual validator and review scope. They
are examples of testable language, not proof that the checks have run.

### Reflection

Record which missing field caused the largest change in scope, risk, or
acceptance. Note whether the protocol could be handed to another person without
guessing, and identify one claim that still needs runtime evidence.

## Acceptance checklist

- [ ] The goal names a result, audience, and scope.
- [ ] Context distinguishes project rules, facts, reports, hypotheses, and
      example data.
- [ ] Inputs identify exact files, sources, versions, and known gaps.
- [ ] Constraints include forbidden files, secrets, dependencies, and external
      side effects.
- [ ] Allowed actions separate read, draft, edit, run, commit, push, and
      publish.
- [ ] Each required claim has a matching evidence carrier.
- [ ] Stop conditions cover missing authority, changed scope, repeated failure,
      silence, and unsupported claims.
- [ ] Recovery preserves the first error and checks state before retrying.
- [ ] Delivery lists actions taken, actions not taken, evidence, unknowns, and
      the next smallest check.
- [ ] A second person or Agent could execute the protocol without guessing.

## Transfer exercise

Rewrite one request in each of these domains:

1. **Engineering:** repair a reproducible regression without changing the
   public API;
2. **Research:** answer a current question with first-party sources and a
   disagreement table;
3. **Content:** update a localized README while preserving same-locale links;
4. **Release:** publish one bounded change with a backup, rollback target, and
   live post-action check; and
5. **Agent collaboration:** delegate a read-only audit to two workers with
   disjoint files and a coordinator evidence table.

For each, mark which fields are reusable and which must be replaced by domain
specific evidence. A protocol that reads well but cannot tell a teammate where
to stop is not complete.

## Sources and review boundary

Stable method in this chapter is an original synthesis. Product behavior,
permission names, interface controls, command syntax, model names, and external
service behavior are volatile. Recheck the linked first-party sources before
using them in a current task.

- [OpenAI/Codex official fact baseline](../../docs/research/chapter-03-official-baseline-2026-08-10.md)
- [Prompt patterns for real work](../../docs/research/prompt-patterns-for-real-work-2026-08-10.md)
- [Coding-agent field cases](../../docs/research/field-problems-coding-agents-2026-08-10.md)
- [Real-world problem index](../../docs/research/field-problems-index-2026-08-10.md)

**Status:** `candidate` — the chapter structure and source records exist; the
companion lab and independent reader run are still `draft`/`not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="02-first-safe-task-EN.md" aria-label="Previous chapter: Chapter 2 · Complete a first safe, verifiable task">← Previous<br><strong>Chapter 2 · Complete a first safe, verifiable task</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="04-context-permissions-and-agent-EN.md" aria-label="Next chapter: Chapter 4 · Context, permissions, and the Agent action boundary">Next →<br><strong>Chapter 4 · Context, permissions, and the Agent action boundary</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
