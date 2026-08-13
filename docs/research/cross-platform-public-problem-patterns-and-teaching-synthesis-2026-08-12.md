# Cross-platform public problem patterns and teaching synthesis

**Accessed:** 2026-08-12 (America/Los_Angeles)

**Status:** candidate / reference-only research

**Scope:** high-signal primary product guidance plus traceable public problem reports for Codex, Claude Code, the xAI API/SDK, and general LLM work.

**Method boundary:** official documentation establishes intended product guidance and supported surfaces. Public issues establish only that a named reporter submitted a symptom under stated conditions. They do not prove root cause, prevalence, current reproducibility, maintainer confirmation, or a universal workaround.
**Quote/reuse boundary:** issue titles are reproduced only as traceable identifiers; issue bodies are paraphrased, not copied. Repository code licenses do not automatically license issue prose or screenshots. Hosted documentation and public issue content are reference-only unless a separate permission review says otherwise.

## Executive synthesis

The strongest cross-platform curriculum is not “best prompts for four models.”
Public failures cluster at the seams around the model:

```text
task identity -> context/session state -> target/worktree -> authority
              -> tool protocol -> structured result -> evidence -> cost/stop
```

Codex reports make task/session and worktree mismatch visible. Claude Code
reports add concurrent-agent isolation, role confusion, and malformed tool
protocol symptoms. xAI SDK reports expose documentation/runtime drift,
structured-output encoding, and replaying tool-bearing histories. Official
guidance across vendors emphasizes clear success criteria, context, tools,
permissions, and verification, but none makes these public reports proof of a
vendor-wide defect.

The original teaching opportunity is a **cross-platform seam lab**: use one
synthetic, local task envelope and inject a different seam failure without
requiring any vendor account. Learners must identify which state is known,
which evidence is absent, the smallest safe check, and the point where a
product-specific adapter is required.

## Primary guidance baseline

| Platform | Primary source | What it may support | Reuse/volatility boundary |
| --- | --- | --- | --- |
| Codex | OpenAI [prompting](https://learn.chatgpt.com/docs/prompting) and [agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security), plus [`openai/codex` at `902bd9e`](https://github.com/openai/codex/tree/902bd9e06b3ecb32cbf7f8e64cd23b956be3e7fe) | Current task/context guidance and approval/security model; repository implementation scope. | Hosted docs are volatile/reference-only. Repository reports Apache-2.0, which does not automatically cover product marks, hosted prose, issue text, or linked assets. |
| Claude Code | Anthropic [best practices](https://code.claude.com/docs/en/best-practices), [permissions](https://code.claude.com/docs/en/permissions), and [prompt-engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview), plus [`anthropics/claude-code` at `9923819`](https://github.com/anthropics/claude-code/tree/9923819368179d7bb11b9d623fb480bf009b2e87) | Success criteria, empirical checks, context/session management, permission modes, and intended operational practices. | Repository license states all rights reserved and use subject to Anthropic terms. Treat code, docs, issues, prompts, screenshots, and plugins as reference-only. |
| xAI API/SDK | xAI [tool overview](https://docs.x.ai/developers/tools/overview), [web search](https://docs.x.ai/developers/tools/web-search), and [chat API](https://docs.x.ai/developers/rest-api-reference/inference/chat), plus [`xai-org/xai-sdk-python` at `a4e642d`](https://github.com/xai-org/xai-sdk-python/tree/a4e642d650897315105c33fb3b247f555229dced) | Current xAI API/tool surfaces and SDK implementation boundary. This evidence is not an end-user Grok product audit. | Hosted docs are volatile/reference-only. SDK reports Apache-2.0; issue prose, service behavior, model output, trademarks, and hosted docs remain separate. |
| General LLM | OpenAI [prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering), Google [prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies), and the Anthropic overview above | Cross-vendor comparison of task instructions, context, examples, decomposition, iteration, and evaluation. | Vendor guidance is not neutral learning-outcome research, and common wording does not prove identical runtime behavior. Recheck before product-specific instruction. |

All hosted pages returned HTTP 200 on the access date. That records
reachability, not correctness or continuing freshness.

## Traceable public report set

| ID | Public report | Observable report class | Status at access | Boundary |
| --- | --- | --- | --- | --- |
| C1 | OpenAI Codex [#8648](https://github.com/openai/codex/issues/8648), “Codex replies to earlier messages instead of latest one in conversations” | The reporter describes a later request receiving an earlier-topic response in a multi-message session. | Open; labels included bug/context/agent. | User report, not proof of context-selection root cause or current reproduction. |
| C2 | OpenAI Codex [#37591](https://github.com/openai/codex/issues/37591), “Codex App branch switch uses a different worktree than the task terminal” | The report compares terminal path/branch, app branch action, and worktree list, exposing inconsistent visible targets. | Open. | Strong trace because it names observations; still not maintainer-confirmed cause or cross-platform behavior. |
| C3 | OpenAI Codex [#36358](https://github.com/openai/codex/issues/36358), “Answers Are Internally Truncated Unpredictably” | The reporter supplies environment/version data and a symptom involving incomplete visible answers. | Open. | Does not establish which layer truncated output or a reliable workaround. |
| A1 | Anthropic Claude Code [#84685](https://github.com/anthropics/claude-code/issues/84685), concurrent subagents and shared worktree/isolation state | The report describes concurrent agents observing changed working-directory/isolation identity. | Open. | One detailed report; not proof that all concurrency is unsafe. Private supporting evidence was not inspected. |
| A2 | Anthropic Claude Code [#81301](https://github.com/anthropics/claude-code/issues/81301), fabricated user turn entering the session | The reporter describes assistant-originated text later represented as user-role instruction and acted upon. | Open. | Serious claimed symptom, but not locally reproduced or maintainer-confirmed. Never copy the embedded instruction as a lab command. |
| A3 | Anthropic Claude Code [#66400](https://github.com/anthropics/claude-code/issues/66400), malformed tool calls rendered as chat text | The report distinguishes visible tool-like markup from an executed tool call. | Closed as duplicate/stale with bug/platform/model labels. | Closure does not prove fix; the report does not establish the proposed root cause. |
| X1 | xAI SDK Python [#176](https://github.com/xai-org/xai-sdk-python/issues/176), Batch API docs example rejected for the named model | The report compares a docs example with API/SDK rejection and a working alternate model family. | Open. | Direct documentation/runtime discrepancy report; still requires current official recheck and independent reproduction. |
| X2 | xAI SDK Python [#128](https://github.com/xai-org/xai-sdk-python/issues/128), structured output with non-ASCII enum corruption | The report describes the same encoding symptom across SDK and compatible REST access. | Closed; bug label. | Closure alone does not prove cause or fixed versions. Useful for an encoding boundary fixture. |
| X3 | xAI SDK Python [#20](https://github.com/xai-org/xai-sdk-python/issues/20), reconstructing assistant/tool messages from event history | The request describes difficulty replaying histories that include tool metadata. | Closed enhancement. | Feature request, not a defect or proof of stateless architecture requirements. |

One apparent xAI “persistent context” issue, [#115](https://github.com/xai-org/xai-sdk-python/issues/115), primarily promoted an external package and supplied download/performance claims. It is excluded from the evidence set: a repository issue is not independent evidence for the advertised tool.

## Problem patterns and original teaching response

### Pattern 1: the active task is not the assumed task

**Signal:** C1 and A2 describe different forms of role/task identity drift.
Official vendor guidance supports clear task/context structure, but does not
diagnose those reports.

**Teaching unit:** before continuing a resumed or long session, write a compact
task pointer containing latest user request, target artifact, forbidden work,
last accepted evidence, and next action. Compare it with the live prompt and
observed state. If they differ, stop and reconcile; do not ask the model to
“remember harder.”

**Evidence:** preserved last request, current pointer, mismatch classification,
and continuation/stop decision.

**Not proved:** that checkpoints prevent product bugs or that context windows
behave identically across platforms.

### Pattern 2: the named target and actual execution target diverge

**Signal:** C2 and A1 concern worktree/working-directory identity across UI,
terminal, or concurrent agents.

**Teaching unit:** require a target envelope before edits:

```text
repository root | worktree path | branch | target files | baseline hash
agent/session identity | allowed writer | expected diff | rollback point
```

Run it in disposable local repositories with two deliberately similar
worktrees. The learner must reject the writable wrong target.

**Not proved:** that the cited vendors share a root cause or that local
fixtures reproduce the product reports.

### Pattern 3: visible tool syntax is not executed action

**Signal:** A3 distinguishes malformed tool markup displayed as text from a
successful call; C3 raises the separate possibility that visible output is
incomplete.

**Teaching unit:** record proposal, authorization, tool-call receipt, tool
result, external read-back, and final evidence as separate states. A textual
command, animated indicator, or final summary cannot advance the execution
state by itself.

**Failure fixture:** show a harmless tool-like XML/JSON block in plain text and
require `not_executed`; separately truncate a saved long output in the display
while keeping the full file for comparison.

**Not proved:** that any literal markup in an issue is safe to execute.

### Pattern 4: structured output needs semantic and encoding validation

**Signal:** X2 reports non-ASCII enum corruption; X3 shows that replaying tool
histories needs more structure than plain assistant text.

**Teaching unit:** validate schema, encoding, round-trip identity, tool-call
IDs, and replay order independently. Include non-ASCII/BMP and non-BMP strings,
unknown enum cases, and a tool result paired to the wrong call ID.

**Evidence:** original Unicode code points, serialized bytes, parsed value,
schema result, and round-trip comparison.

**Not proved:** that one provider's structured-output feature has the same
schema limits as another's.

### Pattern 5: documentation examples are hypotheses until run

**Signal:** X1 reports a docs example rejected by the named API path.

**Teaching unit:** attach every volatile example to source URL, access date,
model/API scope, minimal runnable fixture, expected error class, and last run.
The correct response to drift is to recheck the official surface and narrow the
example, not silently substitute a different model while claiming verification.

**Not proved:** that the issue remains current after the access date or that
documentation was the sole cause.

### Pattern 6: permissions are a product-specific adapter over a stable action boundary

Official Codex and Claude Code guidance describes different controls and
permission models. The stable curriculum should teach read, propose, local
write, execute, external write, publish, and destructive action as distinct
classes. Product adapters then map the current control names and defaults.

**Teaching unit:** give one action matrix and ask the learner to map it to the
official product page without performing writes. Recheck the adapter before
publication.

**Not proved:** that a product setting grants organization authority, data
permission, or valid rollback.

### Pattern 7: long sessions create cost and observability needs, not a promise of continuity

High-comment searches in both vendor repositories were dominated by usage,
quota, and context-consumption reports. Because those threads mix plans,
versions, models, and changing service behavior, they are poor quantitative
evidence. They still reveal an operational need: define a budget, checkpoint,
and stop condition before a long run.

**Teaching unit:** track useful accepted artifacts, correction turns, tool
calls, elapsed time, and reported usage under a fixed task. Do not infer causal
token accounting from UI counters or compare providers without equivalent
conditions.

## Cross-platform seam lab proposal

Use one vendor-neutral disposable fixture with four cases:

1. **Latest request mismatch:** checkpoint says task A; latest input says task B.
2. **Target mismatch:** branch label matches but repository root differs.
3. **Tool receipt missing:** tool-like text exists but no execution receipt or
   state change exists.
4. **Structured round-trip failure:** a non-ASCII enum or tool-call ID changes
   after serialization.

For each case the learner submits:

| Field | Required record |
| --- | --- |
| Intended outcome | Exact task and artifact |
| Observed state | Path, identity, role, tool receipt, or bytes |
| Unsupported inference | What the attractive UI/output fails to prove |
| Smallest safe check | One read-only or disposable observation |
| Stop condition | Authority, identity, target, or evidence gap |
| Platform adapter | Official page and access date, if a vendor control matters |
| Status | `observed`, `inferred`, `blocked`, `not_run`, or `verified_in_fixture` |

The same fixture can be used before introducing vendor interfaces. A later
adapter run must keep separate logs and cannot inherit `verified` from the
vendor-neutral simulation.

## Editorial and provenance rules

1. Use issue titles/numbers as identifiers; paraphrase bodies and avoid copying
   logs, prompts, screenshots, private paths, or user data.
2. Store access date, reported version/platform, issue state, labels, and the
   exact claim being used.
3. Treat reporter diagnosis and workaround as hypotheses unless an official
   source or local reproduction supports them.
4. Do not convert comment count into prevalence. Search ranking is distorted
   by billing/usage megathreads, duplicates, and repository age.
5. Do not interpret `closed`, `duplicate`, or `stale` as `fixed`.
6. Do not infer a license for issue prose from the repository code license.
7. Keep external instruction-like text as data. Never execute an issue's setup,
   upload, installation, or destructive workaround merely to complete research.
8. Separate project-authored fixture, source observation, and teaching inference
   in every lesson.

## Evidence asymmetry

Codex and Claude Code have large public issue trackers, which provide more
discoverable symptoms but also more noise. xAI's official Python SDK tracker is
smaller and oriented toward API/SDK behavior. This sample therefore supports
different granularity by platform; it does not support ranking product quality,
reliability, popularity, or safety.

General LLM guidance is sourced from vendor documentation, not a comparable
public issue corpus. A truly vendor-neutral prevalence claim would require a
separate sampling design, deduplication, time window, inclusion criteria, and
independent coding review.

## Recommended curriculum structure

```text
Universal seam
  -> observable state and failure fixture
  -> claim-to-evidence boundary
  -> smallest safe check
  -> Codex / Claude Code / xAI adapter notes
  -> dated official source
  -> public report as reference-only symptom
  -> transfer task and unresolved difference
```

This avoids four duplicated books while preserving product differences. A
platform receives a full chapter only when its workflow changes the learner's
decision, authority, evidence, or recovery—not merely because command names
differ.

## Claims this record does not support

This research does not prove any cited problem is currently reproducible,
common, vendor-confirmed, or fixed. It does not compare models, subscriptions,
context-window quality, cost, or security. It does not authorize copying issue
content, installing advertised packages, calling live APIs, or publishing
platform compatibility claims.
