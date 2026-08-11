<!-- content_id: chapter-09-verification-and-recovery | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 9: Verification, Doubt, and Recovery

**Status:** `candidate`. **Experiment status:** `not_run`. This chapter teaches
how to match completion claims with evidence and how to recover when a workflow
becomes uncertain. Its public reports and examples are teaching inputs, not
local reproductions, official root-cause findings, customer work, or production
evidence.

## The problem this chapter solves

An Agent can produce a convincing completion summary for a result that is
wrong, out of scope, never executed, or checked in the wrong environment. The
reliable response is not blind trust or permanent suspicion. It is to split the
summary into claims and assign each claim the smallest evidence that could
support it at the stated scope.

![Teaching card: stop at the first missing proof and recover with one safe check](../../assets/teaching/evidence-recovery-ladder.svg)

> This is a project-owned teaching card. It explains a review method; it does
> not prove that a Skill, Agent, tool, or external service executed anything.

## Learning objectives

By the end of this chapter, you should be able to:

- break a completion summary into separate claims and choose the smallest
  sufficient evidence for each one;
- distinguish `error`, `unverified`, `unknown`, `partial`, `not_observed`, and
  `verified`;
- identify the last confirmed stage and the first unsupported stage in a
  capability chain;
- preserve state, narrow the scope, add one useful check, or stop clearly when
  a run fails; and
- write a delivery note that reports completed work, remaining gaps, and the
  next safe check without overclaiming.

## A real-world entry point: recovering control is not proving the result

The project's [Codex field research](../../docs/research/field-problems-codex.md)
records reports about capacity interruptions, commands that remain in `Working`,
and verification that expands into a persistent reinstall. The later
[follow-up research](../../docs/research/field-problems-follow-up-2026-08-10.md)
adds reports about a session that is available while its target tool is not
registered, and a long request that eventually errors and retries.

These reports are useful because they expose observable breaks in a workflow.
They do not establish a universal service cause, a fix for every account, or a
local reproduction. Use them to practise the distinction between recovering
control of a run and proving that the intended result is correct.

| Reported symptom | What the report supports | What it does **not** prove | First safe response |
|---|---|---|---|
| A selected model becomes unavailable and the task stops | One reporter observed a capacity error and an interrupted task | Queue semantics, service-side cause, or behavior for every account and release | Freeze later prompts; inspect the diff, logs, and last accepted checkpoint before retrying |
| A formatter or validation task remains in `Working` | The reporter observed no completion signal during that run | A universal deadlock, the exact child process, or the root cause | Set a bounded wait; capture output and process state; interrupt only under the recovery rule |
| A session is available but an expected tool is missing | The reported session and tool inventory did not match the task's expectation | That every provider or version exposes the same tool set | Record the actual tool list; stop before file, browser, or external-service actions |
| Verification turns into a force reinstall | A request to check a result can be interpreted as permission to alter a persistent environment | That reinstall is always wrong, or that the report covers every Agent | Separate source changes, tests, installation, restart, deployment, and live verification |

The lesson is not “never retry” or “never install”. The lesson is to make the
next action depend on evidence and authority rather than on elapsed time or the
confidence of a status label.

## 1. Match claims to evidence

Start with the sentence you want to say. Then ask what a second person would
need to inspect before accepting that exact sentence at the declared scope.

| Claim | Minimum evidence for the stated scope | What remains outside the claim |
|---|---|---|
| A file changed | A diff, named path, or hash | That the change is correct or complete |
| A check passed | The exact command, working directory, exit code, and relevant output | That another environment will behave the same way |
| The application runs | An actual start plus a named critical-path observation | Visual quality, security, user value, or production readiness |
| The page looks correct | A rendered browser or screenshot review at a recorded viewport | Accessibility, all breakpoints, backend behavior, or conversion |
| A fact comes from an official source | An authoritative URL, access date, scope, and review owner | That the current account or runtime has the same capability |
| No secret was exposed | A scoped change scan, environment check, and boundary statement | That an unknown external system never received a secret |
| The result helps users | A defined sample, task, and user-acceptance record | General market success or future outcomes |
| The result is ready for production | Required quality, security, maintenance, release, and rollback gates | Any untested environment or unowned future change |

### Before Lab 013: write a claim-to-evidence table

Before entering [Lab 013: the auditable vertical slice](../labs/lab-013-l3-vertical-slice.md),
split “done” into checkable rows. Each row may be supported only by evidence
that falls within its declared scope:

```text
assertion: what exactly am I claiming?
scope: file, command, run, version, or environment covered by the claim
evidence: path, command output, log, screenshot, source, or review record
status: verified / partial / unverified / blocked / not_run
gap_or_next_check: what is missing and the smallest way to add evidence
```

Do not use one diff to prove that tests passed. Do not use a signed-in page to
prove that a token exchange or external action succeeded. If the evidence is
missing, label the row `unverified`, `blocked`, or `not_run` as appropriate,
preserve the gap, and enter the recovery flow.

## 2. Use doubt to choose the next check

For an important decision, write one short claim and temporarily remove it from
your own reasoning. Ask:

- Which premise has no evidence?
- Which boundary condition is not covered?
- Could this result come from a mock, cache, stale file, or wrong environment?
- If the claim is false, where would it first become visible?
- What is the smallest additional check that could change the decision?

The goal is not endless suspicion. It is to make an expensive mistake cheap to
find before delivery. A good check changes one relevant condition, produces an
observable result, and has a stop rule.

### A status label is not an exit check

These statements sound similar but require different evidence:

| Statement | Minimum evidence |
|---|---|
| “The source changed.” | A diff or file comparison at a named path |
| “The check ran.” | Exact command, working directory, exit code, and output |
| “The application works.” | Runtime observation at a named environment and input |
| “The page looks correct.” | Rendered inspection at a recorded viewport and visual criteria |
| “The feature shipped.” | Repository or deployment state, release record, and post-delivery check |

The last statement is strictly stronger than the first four. A passing build is
valuable, but it is not automatically runtime, visual, security, or
user-acceptance evidence.

## 3. Recover in a bounded order

When something fails or becomes unclear, use this order:

1. preserve the specific error and the current state;
2. classify the likely boundary: input, understanding, environment,
   implementation, capability, permission, or verification;
3. narrow the scope and reproduce the smallest observable break;
4. make one minimal repair or add one targeted check;
5. re-run the affected path and record the new evidence;
6. if the failure is still unclear, stop and deliver a precise blocking note;
7. expand permission, scope, or retry budget only when the evidence supports
   that change.

Do not use “run it again”, “give it more access”, or “ask the model to think
harder” as a substitute for diagnosis.

### The capability chain: every success layer needs its own proof

Public reports repeatedly describe a misleading sequence: a tool name appears
in a list, a page can be read, or a provider accepts configuration, while the
actual discovery call, click, or higher-level capability still fails. A visible
tool name proves only that the name is visible. It does not prove registration,
discoverability, execution, or a successful side effect.

For example, public reports describe a visible Computer Use and `node_repl`
surface whose read-only `list_apps()` or `list_windows()` call hits `spawn EPERM`;
a browser popup and DOM are readable while a click times out; and a custom
provider accepts configuration without necessarily exposing the expected
multi-agent capability. These are 2026-08-10 user reports, not local
reproductions or official root-cause findings. See the
[web field research](../../docs/research/web-field-problems-2026-08-10.md),
especially WF-08—WF-11.

Break the capability into observable claims:

```text
tool or Skill is visible
  → a read-only discovery call can run
  → the target state can be read
  → the target action returns success
  → the expected external state change is confirmed
```

Each step needs its own evidence. Reading the DOM does not prove a click
succeeded. Parsed configuration does not prove that the backend capability is
available. One successful launch does not prove the next window, version, or
account has the same capability.

A truthful handoff may therefore say “read-only inspection verified; submit
unverified” or “single-agent path verified; multi-agent path unverified”. That
is more useful than “the tool works”.

### Breakpoint card: stop at the first unsupported layer

Do not begin a diagnosis by guessing the root cause. Find the last assertion
that passed and the first assertion that failed or was not observed. Save a
record like this for one run:

```yaml
run_id: "unique run identifier"
surface: "actual work surface and version"
expected_capability: "smallest capability required for this run"
chain:
  - stage: "entry/session available"
    observation: "observable event or error"
    status: "passed | failed | not_observed"
  - stage: "tool registered and discoverable"
    observation: "tool list or read-only discovery result"
    status: "passed | failed | not_observed"
  - stage: "target state readable"
    observation: "read-only target, account, path, or window evidence"
    status: "passed | failed | not_observed"
  - stage: "target action returned"
    observation: "result, exit code, or error category"
    status: "passed | failed | not_observed"
  - stage: "expected side effect confirmed"
    observation: "target state, diff, or read-back result"
    status: "passed | failed | not_observed"
last_confirmed_stage: "last passed stage"
first_breakpoint: "first failed or not_observed stage"
safe_next_check: "smallest check that changes one condition"
stop_condition: "when to stop without expanding authority or side effects"
```

If the tool name is visible but read-only discovery fails, the breakpoint is at
“tool registered and discoverable”. If the action returns success but the target
state does not change, the breakpoint is at “expected side effect confirmed”.
Do not cross the breakpoint into a higher-risk action, and do not backfill an
earlier proof with a later lucky success.

### Long waits with no events: record the timeline first

“The interface still says `Working`” is one observation, not a root cause. For
a long request, record at least:

```text
request_started_at
first_event_at
each tool or network event
last_event_at
interrupt or error time
automatic retry start time
final state
```

When the pre-agreed no-event threshold is reached:

1. mark the state `no_event_observed`; do not rewrite it as a root cause or as a
   healthy task;
2. use already-authorized means to regain control, then inspect the process,
   worktree, target state, and last checkpoint;
3. if the first request may have produced a side effect, stop as `unverified`
   or `blocked`;
4. permit one limited retry only when the action is idempotent, the state has
   been rechecked, and the retry rule was declared before the run or one
   condition has explicitly changed; and
5. record a client-side automatic retry as a separate event. A successful
   second attempt proves only the second attempt; it cannot rewrite the first
   no-event attempt as an initial pass.

HTTP status, a long context, network waiting, model inference, or an upstream
service problem can be hypotheses to test. Without official confirmation or a
local reproduction, they are not established root causes.

## 4. Separate recovery status from completion status

Use status words that describe the evidence you actually have:

- `practice`: a learning run; do not reuse it as production evidence;
- `candidate`: promising structure or output, but incomplete evaluation or
  source review remains;
- `verified`: evidence exists within the declared scope, version, and task set;
- `production-ready`: required quality, security, rollback, maintenance, and
  release gates have passed.

Observation states are different from completion states. `not_observed` means
that an expected event was not seen; it is not a root-cause diagnosis. `not_run`
means the planned experiment has not been executed; it is not a pass or a fail.
`partial`, `unverified`, and `blocked` describe the narrowest evidence gap you
can currently support.

Recovery can restore control without upgrading the completion status. For
example, interrupting a hung process and preserving the diff may produce a
useful `candidate` handoff, while the requested runtime result remains
`unverified`.

## Experiment: audit a completion claim

**Experiment status:** `not_run`.

### Setup

Prepare a redacted completion summary, a diff, test output, source links, and
one intentionally missing piece of evidence. Do not connect to a production
service or modify an external system. Split each completion sentence into an
independent claim and decide the allowed status words before reviewing it.

### Task

Use [Lab 003](../labs/lab-003-evidence-review.md) to turn the summary into a
claim table. Write the scope, evidence, status, and next check for every row.
Then deliberately add an unsupported sentence such as “all tests passed” and
observe whether the review rejects it rather than accepting the summary's tone.

### Evidence

Save the claim table, each claim's evidence path, the gap category, the review
decision, and the recovery or supplementation plan. Include at least one fact
claim, one runtime claim, and one user-effect claim. Show why one weak piece of
evidence cannot stand in for all three.

### Reflection

Explain which claim was easiest to hide inside a polished summary, which small
check reduced the most risk, and why `unverified` does not mean `wrong`. Rewrite
one sentence from the next delivery note so its status matches its evidence.

## Deliberate failure and boundary case

Start a small, reversible change in a disposable copy. Before running the
checks, write a handoff that says “done” and “all tests passed”. Then reveal
that the test output was never produced, or that the proposed recovery requires
an install, restart, network call, or write outside the original scope.

The exercise passes only if the learner:

- marks the unsupported claim `unverified` or `not_run`;
- preserves the partial diff, error, scope, and last checkpoint;
- refuses to infer runtime or user acceptance from the diff; and
- chooses one safe check or a clear stop instead of stacking edits or silently
  expanding authority.

Continuing to stack edits behind a polished “done” message is the failure of
this exercise.

## Transfer exercise

Apply the claim table to either a research conclusion or a marketing experiment
report. Include at least one fact claim, one execution claim, and one user-effect
claim. State why these claims cannot share one weak piece of evidence, and name
the smallest follow-up check for the least-supported claim.

## Sources and maintenance boundary

Evidence discipline and the status vocabulary are stable methods. Commands,
entry points, model behavior, provider behavior, and public issue states are
volatile facts. Review concrete operations against the
[evaluation framework](../../docs/quality/evaluation-framework.md),
[official baseline](../../docs/research/openai-codex-baseline.md), and
[web field research](../../docs/research/web-field-problems-2026-08-10.md).

| Fact or boundary | Source | Accessed | Applies to | Owner / next review |
|---|---|---:|---|---|
| Capacity interruption can leave a dependent task's state unclear | [FP-09 / issue #33865](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user report; no local reproduction or universal queue conclusion | `curriculum-maintainer` / 2026-09-09 |
| Long-running verification can leave completion state unclear | [FP-10 / issue #34325](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user report; root cause and release scope remain unknown | `curriculum-maintainer` / 2026-09-09 |
| Authentication, tool availability, execution, and external result are separate claims | [FP-01—FP-02](../../docs/research/field-problems-codex.md) and [WF-08—WF-11](../../docs/research/web-field-problems-2026-08-10.md) | 2026-08-09 / 2026-08-10 | Evidence discipline for reported symptoms; not official repair guidance | `curriculum-maintainer` / 2026-09-09 |
| Verification must not silently expand into installation or persistent environment changes | [FP-11 / issue #37677](../../docs/research/field-problems-codex.md) | 2026-08-09 | Public user report; not an official policy or local reproduction | `curriculum-maintainer` / 2026-09-09 |
| Agent handoff, tool registration, workspace permissions, and retry behavior may fail at different stages | [FUP-01—FUP-05](../../docs/research/field-problems-follow-up-2026-08-10.md) | 2026-08-10 | Public reports; account, version, provider, and local runtime differences remain material | `curriculum-maintainer` / 2026-09-09 |

The chapter uses these reports to teach where evidence breaks. It does not turn
one issue, workaround, label, or community answer into a product guarantee.

## Acceptance checklist

- [ ] I can choose different evidence for a source claim, a test claim, a
      runtime claim, a visual claim, a security claim, and a user-effect claim.
- [ ] I can distinguish an error from an unsupported or simply unknown result.
- [ ] I can locate the last confirmed stage and first breakpoint in a capability
      chain.
- [ ] I can choose a bounded recovery action instead of repeating an unchanged
      failure.
- [ ] I can explain why recovery does not automatically upgrade completion
      status.
- [ ] I can write a delivery note containing completed work, incomplete work,
      unknowns, risks, evidence paths, and the next safe check.
- [ ] I can report that this chapter is `candidate` and that its experiment is
      `not_run` until a run record and review exist.

<!-- chapter-navigation:start -->
<hr>
<nav aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-EN.md" aria-label="Previous chapter: Chapter 8 · The complete lifecycle from definition to delivery">← Previous<br><strong>Chapter 8 · The complete lifecycle from definition to delivery</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing.md" aria-label="Next chapter: Chapter 10 · Planning and vertical slicing · migration pending">Next →<br><strong>Chapter 10 · Planning and vertical slicing · migration pending</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
