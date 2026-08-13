# Cross-platform coding-agent teaching invariants: Codex, Claude Code, and Grok Build

**Status:** candidate research record; no curriculum, site, status, or product
claim is changed by this record.

**Research date:** 2026-08-13  
**Access date for every source below:** 2026-08-13  
**Owner:** Prysai Lab curriculum maintenance  
**Next review:** before a platform adapter is introduced into a reader-facing
learning path, or by 2026-11-13, whichever comes first.

## Question

Which teaching principles can safely be shared across Codex, Claude Code, and
Grok Build without implying that their instructions, tools, permissions, Skills,
workflows, defaults, or results are equivalent?

## Decision

Teach one platform-neutral collaboration loop, then make each product-specific
mechanism an adapter with its own source and observable evidence:

```text
bounded outcome -> selected context -> scoped instructions -> declared tools
-> least privilege -> observable check -> review / recovery receipt
```

The shared loop is a teaching design, not a statement that the three products
share an implementation, a security model, a file format, a default, an API, a
model, or an outcome. A platform adapter is required before a reader follows a
specific command, configuration path, permission label, Skill location, or
verification flow.

## Scope and method

- Sources are official first-party documentation only: OpenAI documentation for
  Codex, Anthropic documentation for Claude Code, and xAI documentation for
  Grok Build and its API.
- Product documentation is volatile. This record captures what those sources
  supported on the access date; it does not establish availability for an
  account, organization, operating system, region, repository, or version.
- No product was installed, configured, or run for this record. A documentation
  claim is not a local reproduction, a safety assessment, or learner evidence.
- This record deliberately uses **Grok Build** when citing xAI's coding-agent
  documentation. It does not infer that every Grok chat surface has the same
  capabilities as the CLI or API.

## Source register

| ID | Official source | What it supports in this record | Volatility |
| --- | --- | --- | --- |
| O1 | [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) | Codex project guidance discovery, scope, precedence, and size boundary | High |
| O2 | [Build skills](https://learn.chatgpt.com/docs/build-skills.md) | Codex Skill structure, discovery, selection, and progressive disclosure | High |
| O3 | [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | Codex distinction between sandbox capability, approval policy, network, and side effects | High |
| O4 | [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | `codex exec`, least-privilege sandboxing, and JSONL event evidence | High |
| A1 | [How Claude remembers your project](https://code.claude.com/docs/en/memory.md) | `CLAUDE.md`, auto memory, scope, context loading, and the explicit non-enforcement boundary | High |
| A2 | [Choose a permission mode](https://code.claude.com/docs/en/permission-modes.md) | Claude Code action-approval modes and layered permission rules | High |
| A3 | [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) | Claude Code Skills, explicit/automatic invocation, and recorded run/verify recipes | High |
| A4 | [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices.md) | Runnable checks, evidence, visual checks, staged exploration/planning/implementation | High |
| X1 | [AGENTS.md](https://docs.x.ai/build/features/project-rules) | Grok Build project-rule discovery and `grok inspect` as a configuration-discovery check | High |
| X2 | [Permissions](https://docs.x.ai/build/features/permissions) | Grok Build permission modes and allow/deny precedence | High |
| X3 | [Sandbox](https://docs.x.ai/build/features/sandbox) | Grok Build separation of approved calls from filesystem/network containment | High |
| X4 | [Skills, Plugins & Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces) | Grok Build Skill discovery, invocation, plugin boundary, and compatibility claims | High |
| X5 | [Advanced tool usage](https://docs.x.ai/developers/tools/advanced-usage) | xAI server-side versus client-side tool execution and application-controlled continuation | High |
| X6 | [Web search](https://docs.x.ai/developers/tools/web-search) | xAI web-search tool and returned citations | High |

## Claim ledger

Each claim below is intentionally narrow. “Cross-platform” means the teaching
rule remains useful while an adapter changes; it does **not** mean a source says
the products are feature-for-feature equivalent.

### CTI-001 — Context and instructions are inputs to manage, not proof of enforcement

**Claim:** A reusable course can teach readers to declare the task, select only
relevant context, and put stable project guidance in a scoped instruction layer.
It must separately teach that instruction text is not the same thing as a
technical control or a completed action.

**Evidence:** Codex documents discovered and merged `AGENTS.md` guidance (O1).
Claude Code documents project instructions and auto memory as context, and
explicitly says that memory files are not enforced configuration; it directs
readers to a hook when an action must be blocked regardless of model choice
(A1). Grok Build documents project-rule discovery, including `AGENTS.md` and
compatible instruction-file families, and exposes `grok inspect` to show what
it found (X1).

**Implication:** A platform-neutral exercise may ask a learner to identify the
applicable instruction files, state their scope, and verify the discovered
configuration. It must not say “the rule will be obeyed” or use a rule file as
the only protection for sensitive actions.

**Does not establish:** identical precedence, file names, maximum sizes,
autoload timing, memory behavior, hook semantics, or enforcement guarantees.

### CTI-002 — Permission and technical containment are separate decisions

**Claim:** Before asking an agent to act, a course should make the intended
action, allowed scope, approval path, and technical containment visible. An
approval is neither a proof of success nor a substitute for an execution
boundary.

**Evidence:** Codex distinguishes sandbox mode from approval policy (O3) and
documents a read-only default plus explicit sandbox selection for automation
(O4). Claude Code documents modes that determine when it asks before edits,
commands, and network requests, with allow/deny/ask rules layered on top (A2).
Grok Build explicitly distinguishes permissions (whether a tool call may run)
from sandboxing (what an approved process may read, write, or reach) (X2, X3).

**Implication:** A shared permission card should list: action, affected data or
system, authorization decision, containment, evidence, and recovery path. The
card is valid even where a platform has no identically named mode.

**Does not establish:** matching defaults; comparable sandbox strength;
equivalent network restrictions; identical protected paths; that a permissive
mode is safe; or that a prompt, click, or approval produced the intended change.

### CTI-003 — A tool has an owner, an execution location, and a return value

**Claim:** A tool-using workflow should identify who executes each tool call,
where it runs, which data crosses a boundary, and what returned artifact will be
checked.

**Evidence:** Codex treats configured MCP/tools, sandboxing, and approvals as
separate controls (O3, O4). Claude Code documents permission-controlled tools
and project extensions such as Skills (A2, A3). xAI distinguishes server-side
tools that xAI executes automatically from client-side function calls that pause
and return control to the application for execution and continuation (X5).

**Implication:** A course should label a step `model-only`, `host/tool call`,
`application-controlled`, or `external service` rather than calling every step
“the model did it.” It should save the tool result, diff, log, response, or
other checkable artifact appropriate to that step.

**Does not establish:** that every platform exposes MCP, web search, code
execution, a browser, or the same tool schema in every surface; or that a
successful tool response proves a real-world claim is correct.

### CTI-004 — Reusable procedures need a lifecycle, not a popularity claim

**Claim:** A reusable procedure should be taught through four observable states:
present in a discoverable location; selected or invoked; resources/instructions
loaded; and intended work executed and checked.

**Evidence:** Codex documents Skill packages and progressive disclosure from a
description to full `SKILL.md` instructions (O2). Claude Code documents
automatic or direct Skill invocation and distinguishes a reusable Skill body
from work that must still be run or verified (A3). Grok Build documents Skill
discovery and slash invocation; its `allowed-tools` metadata explicitly does not
grant or restrict tools (X4).

**Implication:** The book can use “Skill” as a generic teaching label only when
the reader is given a product adapter. Acceptance criteria must record the
selected Skill, actual commands/tool calls, and result checks—not merely that a
directory exists or a command appeared in a menu.

**Does not establish:** portable frontmatter behavior, shared discovery paths,
automatic invocation, access grants, bundled Skill availability, compatible
plugins, or equivalent outputs. xAI's documented Claude Code compatibility (X4)
is a vendor compatibility statement, not independent proof that a particular
Skill will load, receive the same context, run with the same permissions, or
pass the same verification on both products.

### CTI-005 — Verification must test the claimed outcome, not the agent's confidence

**Claim:** Every consequential task needs a declared acceptance check and
inspectable evidence. A generated answer, an exit status, a citation, a
configuration listing, or an agent assertion can be useful evidence, but none is
automatically sufficient for every claim.

**Evidence:** Codex non-interactive mode can emit JSONL events for commands,
file changes, MCP calls, web searches, and plan updates (O4). Claude Code
recommends a runnable test, build, linter, fixture comparison, or screenshot,
then asks for the actual evidence rather than an assertion of success (A4).
Grok Build's `grok inspect` reports discovered configuration, while its web
search documentation exposes citations in responses (X1, X6).

**Implication:** Teach an evidence ladder: configuration discovery for
configuration claims; command output and diffs for execution claims; tests or
fixtures for behavioral claims; rendered inspection for visual claims; and
authoritative sources plus scope for current external facts. Use a separate
review decision for acceptance.

**Does not establish:** learner mastery, general correctness, security,
production readiness, causal business value, or that a cited page supports every
statement made in a synthesis.

### CTI-006 — Context is a budget and workflow design is a control

**Claim:** A course can teach readers to use narrow context, staged work, and
small reviewable units instead of treating a longer conversation or more agents
as an automatic quality improvement.

**Evidence:** Claude Code states that sessions begin with a context window,
documents what project memory loads, and warns that performance can degrade as
context fills (A1, A4). Codex documents scoped project guidance and separate
automation output events (O1, O4). Grok Build documents sessions, compaction,
and inspection of discovered rules, Skills, plugins, hooks, and MCP servers
(X1, X4).

**Implication:** A cross-platform lab should state the smallest relevant file
set, desired output, stop condition, and check before delegating. Parallel work
should use a single accountable integrator for overlapping writes.

**Does not establish:** identical context-window sizes, compaction algorithms,
subagent behavior, token costs, quality, latency, or the availability of any
agent-team feature.

## Platform adapter matrix

This is a navigation aid, not a feature parity table.

| Teaching concern | Codex adapter | Claude Code adapter | Grok Build adapter | Minimum evidence |
| --- | --- | --- | --- | --- |
| Context and instructions | `AGENTS.md` discovery/merge rules (O1) | `CLAUDE.md`, rules, and auto memory; memory is not enforcement (A1) | `AGENTS.md` and compatible rule discovery; inspect discovered inputs (X1) | Applicable instruction paths, scope, and a configuration/discovery check |
| Tools and permissions | Sandbox and approvals are separate (O3); automation can set an explicit sandbox (O4) | Permission mode plus per-tool rules (A2) | Permissions and sandbox are separate; allow/deny rules exist (X2, X3) | Action boundary, effective policy, tool result, and recovery option |
| Skills and workflows | Skill package and progressive disclosure (O2) | Skills can be invoked or selected; recorded run/verify recipes exist (A3) | Skills/plugins are discovered separately; metadata does not grant tools (X4) | Selected procedure, executed calls, output, and check result |
| Verification | JSONL records agent events in `codex exec` (O4) | Tests/builds/fixtures/screenshots and evidence review (A4) | `grok inspect` for discovered configuration; API search can return citations (X1, X6) | A check matched to the claim, plus retained evidence |

## Explicitly rejected equivalences

The following statements are unsupported by the source set and must not appear
as project claims:

1. “`AGENTS.md`, `CLAUDE.md`, and Grok Build rules are the same feature.” Their
   discovery locations, precedence, size behavior, persistence, and enforcement
   boundary differ or are not established as identical here.
2. “A Skill is portable because each product has a `SKILL.md` concept.” The
   source set documents different discovery, invocation, metadata, and extension
   behavior. A specific artifact needs product-by-product validation.
3. “Approval modes or sandbox names can be translated one-to-one.” The sources
   describe different controls and do not establish equivalent defaults or
   containment.
4. “A tool, citation, web-search result, JSON event, or inspection command
   verifies the final claim.” These artifacts evidence narrower facts and need
   an acceptance rule suited to the claim.
5. “The three platforms have comparable quality, privacy, cost, rate limits,
   reliability, security, context capacity, model behavior, or learner results.”
   This record did not research or test those questions.
6. “Grok Build compatibility with Claude Code proves cross-platform behavior.”
   xAI's compatibility documentation is not a replacement for a local run,
   source review, or acceptance check.

## Curriculum implications for a later, separately reviewed change

1. Keep the existing collaboration core product-neutral: outcome, context,
   instructions, tools, permissions, verification, recovery, and evidence.
2. Add a platform adapter only when it contains a dated official source, target
   surface, prerequisites, permission boundary, observable experiment, failure
   case, acceptance check, owner, and next review date.
3. Place vendor-specific commands, paths, UI labels, and screenshots in adapters
   rather than the durable conceptual chapter.
4. Teach a pre-action receipt before any consequential tool step: what can
   change, what cannot change, where the tool runs, what approval is expected,
   and what evidence will be retained.
5. Do not market the guide as a complete Grok or Claude Code course on the basis
   of this research. This record identifies a safe design boundary; it does not
   create, test, translate, or validate those learning paths.

## Limitations and review triggers

- OpenAI, Anthropic, and xAI can change documentation URLs, product names,
  defaults, capability availability, supported clients, and permission behavior
  without this repository changing.
- This report does not compare licenses, commercial terms, privacy/data
  retention, region availability, accessibility, pricing, security guarantees,
  or model benchmarks.
- Recheck every source before publishing a concrete adapter, especially when a
  reader-facing step could grant a tool, access a network, execute code, write a
  file, use a credential, or affect an external system.
- If an official source is silent on a proposed equivalence, retain the gap as a
  gap. Do not fill it with a forum report, a vendor comparison, a model answer,
  or inference.

