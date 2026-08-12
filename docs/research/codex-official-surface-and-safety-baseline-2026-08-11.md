# Codex official surface and safety baseline

**Research date:** 2026-08-11  
**Access date for every source below:** 2026-08-11  
**Scope:** OpenAI/Codex first-party documentation and the public `openai/codex` repository guidance relevant to a practical field guide: product surfaces, `AGENTS.md`, Skills, approvals and sandboxing, web search, MCP/tools, subagents, and claims that can safely be made in reader-facing chapters.  
**Evidence status:** `candidate` — the sources were fetched and checked on the date above, but product behavior, URLs, defaults, availability, and model names are volatile and must be rechecked before publication.  
**Non-scope:** This report does not change chapters, generated site files, or project governance files. It does not establish that any feature is enabled for a particular account, workspace, repository, or local session.

## Executive finding

The most useful teaching boundary is not “what Codex can do.” It is:

```text
surface → context → instructions → tools → sandbox → approvals → evidence
```

The official documentation describes these as related but separate controls. A reader can therefore see a tool in a product surface and still lack permission to use it; a Skill can be discoverable without being selected; a selected Skill can provide instructions without proving that its scripts ran; and a successful-looking answer is not evidence that a file, command, network request, or external-side-effect action actually happened.

The guide should teach every feature through a small, observable experiment with a declared surface, workspace, permission mode, network state, expected evidence, and stop condition.

## Source register

The URLs below are canonical first-party sources for the claims in this record. The `.md` suffix is the machine-readable Markdown representation exposed by the documentation site on the access date.

| ID | First-party source | Accessed | What it supports | Volatility |
| --- | --- | --- | --- | --- |
| S1 | [Codex CLI](https://learn.chatgpt.com/docs/codex/cli.md) | 2026-08-11 | CLI purpose, local repository work, `codex exec`, live search entry point, MCP, permissions, and workflow composition | High |
| S2 | [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) | 2026-08-11 | Instruction discovery, precedence, merge order, fallback names, and size limit | Medium/high |
| S3 | [Build skills](https://learn.chatgpt.com/docs/build-skills.md) | 2026-08-11 | Skill shape, progressive disclosure, invocation, repository scope, plugin packaging, and authoring advice | High |
| S4 | [Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-11 | Skill/plugin distinction and repeatable workflow framing | High |
| S5 | [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-11 | Sandbox versus approval policy, local/cloud boundaries, network access, and side-effect approvals | High |
| S6 | [Codex environments](https://learn.chatgpt.com/docs/environments/modes.md) | 2026-08-11 | Local, Worktree, and Cloud execution surfaces | High |
| S7 | [Web search](https://learn.chatgpt.com/docs/web-search.md) | 2026-08-11 | Search surfaces, cached/indexed/live modes, and untrusted-result boundary | High |
| S8 | [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) | 2026-08-11 | Parallel delegation, orchestration, cost/context trade-offs, and read-heavy use cases | High |
| S9 | [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-11 | MCP transports, configuration, server instructions, tool approval modes, and shared host configuration | High |
| S10 | [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-11 | `codex exec`, read-only automation default, JSONL output, explicit sandboxing, and credential cautions | High |
| S11 | [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide.md) | 2026-08-11 | Editor context, in-place review, and longer-work handoff | High |
| S12 | [Codex cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | Cloud isolation, GitHub connection, environments, logs, and review before merge | High |
| S13 | [Codex glossary](https://learn.chatgpt.com/docs/glossary.md) | 2026-08-11 | First-party terminology for Action, Agent, AGENTS.md, Context, and surfaces | Medium/high |
| S14 | [openai/codex `AGENTS.md`](https://github.com/openai/codex/blob/main/AGENTS.md) | 2026-08-11 | A real repository example of scoped instructions, verification commands, platform constraints, and review boundaries | High; repository state can change |

## Findings

### 1. A surface is an execution context, not a cosmetic interface

The official environment guide names **Local**, **Worktree**, and **Cloud** as distinct places where a Codex chat can run. The CLI, IDE extension, desktop app, and cloud documentation describe different entry points and different review/operational affordances. The CLI is positioned around inspecting and editing a local repository, running installed tools, composing with scripts/CI, and choosing model, reasoning, permissions, and commands. The IDE extension emphasizes open files and selections as context and review beside the editor. Cloud work uses isolated environments and a reviewable summary/diff flow.

**Safe claim:** “Codex has multiple surfaces with different context and execution boundaries.”  
**Unsafe claim:** “If a user can see a Codex button, the same tools, filesystem, network, account, or model are available everywhere.”

**Teaching consequence:** Every exercise should start with a `Surface card`:

| Field | Example question |
| --- | --- |
| Surface | CLI, IDE, desktop, or Cloud? |
| Location | Which repository, current directory, or cloud environment? |
| Context | Which files, selections, instructions, or prior results are in scope? |
| Execution | Local machine, isolated Worktree, or cloud container? |
| Evidence | What diff, test output, log, citation, or screenshot will count? |

Source: S1, S6, S11, S12, S13.

### 2. `AGENTS.md` is an instruction chain with precedence, not a magic project prompt

The official `AGENTS.md` guide says Codex reads guidance before work. It distinguishes global guidance from project guidance, walks from the project root toward the current working directory, checks `AGENTS.override.md` before `AGENTS.md` in each directory, supports configured fallback filenames, concatenates applicable files from root downward, and lets nearer guidance appear later in the merged prompt. It also documents a default combined-size limit of 32 KiB and explains that the limit can be raised or guidance split across nested directories.

**Safe claim:** “`AGENTS.md` supplies persistent, scoped project guidance that is discovered and merged according to documented rules.”  
**Unsafe claim:** “Codex always reads the one `AGENTS.md` next to the file,” or “an instruction in `AGENTS.md` guarantees the agent will perform or verify an action.”

**Teaching consequence:** Add an `Instruction chain` lab that creates a harmless nested repository fixture with one global/project/nested file, then asks Codex to report which guidance applies. The acceptance evidence should be the merged chain or an observable behavior, not a model assertion alone. Add a second test that intentionally exceeds the documented byte budget and shows why a large monolithic instruction file is brittle.

Source: S2. The real repository example S14 is useful as a *pattern to inspect*, not as a universal template: it contains scoped Rust, testing, platform, and review guidance, and its own rules say product documentation belongs elsewhere.

### 3. Skills are reusable workflow packages; discovery, selection, and execution are different events

OpenAI’s Skills documentation describes a Skill as a directory containing a required `SKILL.md` with `name` and `description`, plus optional scripts, references, and assets. It describes progressive disclosure: the host begins with names/descriptions (and, in Codex, paths), then loads the full `SKILL.md` when the Skill is selected. Skills can be invoked explicitly (`$` in Codex CLI/IDE) or implicitly when the description matches. Repository-scoped Skills are loaded from `.agents/skills` locations as Codex searches from the current directory toward the repository root; user, admin, and system scopes also exist. Plugins are distribution bundles that can contain Skills and connectors.

**Safe claim:** “A Skill packages repeatable instructions and supporting resources, and a good description helps the host decide when it applies.”  
**Unsafe claim:** “Installing or listing a Skill means it ran,” “a Skill grants permissions,” or “a Skill is the same thing as an MCP tool, plugin, model, or connector.”

**Teaching consequence:** Make the Skill chapter measure four states separately:

1. present in a discoverable location;
2. selected or explicitly invoked;
3. full instructions/resources loaded;
4. expected scripts/tools actually executed and verified.

The lab should include one instruction-only Skill and one Skill with a deterministic helper script. Capture the invocation, file changes, command output, and failure path. Keep the Skill focused on one job, front-load its trigger words and boundaries, and prefer instructions over scripts unless deterministic behavior or external tooling is genuinely required.

Source: S3, S4, S13.

### 4. Sandbox and approval policy answer different questions

The security documentation explicitly separates:

- **Sandbox mode:** what model-generated commands can technically do, such as where they can write and whether they can reach the network.
- **Approval policy:** when Codex must pause and ask before acting, such as leaving the sandbox, using the network, or invoking an action that carries a side effect.

For local CLI/IDE execution, the documented defaults include no network access and writes limited to the active workspace; the exact effective policy remains configurable. In cloud, setup and agent phases have different network and secret behavior. App/connector/MCP calls can also carry approval requirements, and destructive calls require approval when the tool advertises a destructive annotation.

**Safe claim:** “A command can be technically allowed by the sandbox yet still require approval, and approval does not by itself prove the command succeeded.”  
**Unsafe claim:** “`on-request` makes all actions safe,” “network approval means arbitrary internet access,” or “a cloud secret is available throughout the task.”

**Teaching consequence:** Use a permission matrix, not a single “safe mode” label:

| Action | Sandbox capability | Approval question | Evidence to collect |
| --- | --- | --- | --- |
| Read workspace file | Is the path readable? | Is the current policy read-only? | Command/output or file hash |
| Edit workspace file | Is the path writable? | Does the policy pause for edits? | Diff |
| Write outside workspace | Is the path technically reachable? | Is an escalation/approval required? | Approval record plus resulting file |
| Fetch external source | Is network enabled? | Is the destination allowed? | URL, date, response/citation |
| Call connector/MCP tool | Is the server configured? | What tool approval mode applies? | Tool call and returned result |

Source: S5, S9, S10.

### 5. Web search is a tool with an evidence and prompt-injection boundary

The official web-search page says search results are untrusted input. It documents different surface behavior: ChatGPT surfaces show search activity/citations, CLI uses `--search`, and the IDE uses the connected host’s search mode. For local Codex chats, it documents cached, indexed, live, and disabled modes; cached search uses an OpenAI-maintained index and lowers but does not remove prompt-injection risk. Live search is the mode to choose when the task depends on the latest information. The search tool’s availability and workspace restrictions still apply.

**Safe claim:** “Web search can supply current external context, but the returned text is data to evaluate, not instructions to obey.”  
**Unsafe claim:** “Search is always live,” “a citation proves the claim is correct,” or “a page’s instructions override repository/user instructions.”

**Teaching consequence:** Add a `Source triage` lab: search for one volatile product fact, record mode/surface/access date, compare an official source with a secondary source, extract only the supported claim, and explicitly reject instruction-like text embedded in the fetched page. The lab passes only when the reader can state what the source does *not* prove.

Source: S7, S5.

### 6. MCP extends the tool surface and therefore expands the trust boundary

The MCP documentation says MCP connects models to tools and context. Local Codex clients can share MCP configuration across the desktop app, CLI, and IDE extension. It documents STDIO and Streamable HTTP servers, bearer/OAuth authentication, server-provided instructions, project-scoped configuration for trusted projects, enabled/disabled tool lists, and per-server/per-tool approval modes. The documentation recommends that server-wide instructions state cross-tool workflows, constraints, and rate limits, with the first 512 characters self-contained.

**Safe claim:** “MCP makes external tools and context available to a configured host; it does not make every tool available, trusted, or automatically approved.”  
**Unsafe claim:** “Adding an MCP server is equivalent to granting it unrestricted access,” or “a server’s instructions outrank the project’s safety rules.”

**Teaching consequence:** The MCP lab should be read-first and reversible: inspect `codex mcp list`, configure a harmless read-only server or fixture, use an allow list, set a conservative approval mode, record authentication boundaries, and demonstrate that disabling a tool changes the available surface. Do not place tokens in the repository or examples.

Source: S9, S5, S13.

### 7. Subagents are an orchestration choice with context and token costs

The official subagent documentation describes parallel specialized agents whose results are collected into one response. It recommends parallel agents for independent, read-heavy work such as exploration, tests, triage, and summarization, and warns that write-heavy parallel work can create conflicts. It also says subagent workflows consume more tokens because each agent performs its own model/tool work. A good delegation prompt states the division of work, whether to wait for all agents, and the desired summary/output.

**Safe claim:** “Subagents can partition independent work and return distilled findings; they add coordination and token cost.”  
**Unsafe claim:** “More agents always improve quality,” or “parallel agents can safely edit the same files without coordination.”

**Teaching consequence:** Add a measured comparison: one agent versus three read-only agents on the same small audit. Record latency, token/usage information if exposed, overlap, disagreement, and the final human verification burden. Teach a single-writer integration rule for write-heavy work.

Source: S8.

### 8. Automation needs an explicit permission and output contract

The non-interactive-mode guide documents `codex exec` for CI, pipelines, scheduled jobs, and piping. It says the default sandbox for `codex exec` is read-only, recommends least privilege, documents explicit `workspace-write` when edits are needed, and reserves `danger-full-access` for controlled environments. `--json` produces JSON Lines events including command executions, file changes, MCP calls, web searches, and plan updates. The guide also warns against exposing API keys to repository-controlled code and treats saved account auth as a password.

**Safe claim:** “Automation can be made observable with explicit sandbox settings and structured event output.”  
**Unsafe claim:** “A green process exit means the intended change is correct,” or “putting a token in a job-wide environment variable is harmless.”

**Teaching consequence:** The automation chapter should require a three-part contract:

1. least-privilege execution settings;
2. machine-readable and human-readable evidence;
3. a separate review/merge gate.

The minimum lab should run a read-only repository summary with JSONL output, then a controlled workspace-write patch in a disposable branch, and finally inspect the diff and tests. It should show that generated output, command success, and acceptance are separate states.

Source: S10, S5.

## Stable principles versus volatile facts

### Stable enough to teach as principles

- A model, a product surface, an Agent, a Skill, a tool, and a permission are different layers.
- Instructions and fetched content must be treated as data with an explicit trust boundary.
- Sandbox capability and approval policy are separate controls.
- Every consequential task needs an observable acceptance condition and evidence.
- Read-heavy independent work is easier to parallelize safely than concurrent writes.
- External credentials and side effects require least privilege, explicit scope, and review.

These are curriculum principles, not promises about a particular UI, model, default, or account.

### Must remain dated and rechecked

- exact documentation URLs, command flags, config keys, and fallback filenames;
- model names, model-selection behavior, and reasoning-level labels;
- default network, sandbox, and approval settings;
- surface availability by plan, organization, workspace, OS, or client version;
- Skill discovery paths, plugin manifests, MCP configuration keys, and tool approval modes;
- cloud setup/agent lifecycle, secret lifetime, and GitHub integration behavior;
- output event names and JSONL schemas;
- screenshots, UI labels, and installation instructions.

Before copying any volatile item into a chapter, add its authoritative URL, access date, scope, owner, and next review date to the project’s fact-maintenance record. If the official source is silent, label the statement as unconfirmed or as a local reproduction boundary rather than filling the gap with inference.

## Concrete insertion recommendations

These are recommendations for later chapter work; no chapter was edited in this research pass.

| Priority | Chapter area | Insert | Acceptance evidence |
| --- | --- | --- | --- |
| P0 | Choose the Codex surface | Surface card comparing Local, Worktree, Cloud, CLI, and IDE; include “what this source does not prove” | Reader can select a surface and name its location, context, execution boundary, and evidence |
| P0 | Context, permissions, and Agent | Two-column sandbox/approval matrix plus a disposable permission experiment | Reader can predict which action is blocked, which may prompt, and what result proves completion |
| P0 | Skills | Four-state lifecycle: discover → select → load → execute/verify; include instruction-only and scripted examples | Logs/diff/output distinguish presence from execution |
| P0 | Verification and recovery | Search/MCP trust boundary and evidence ledger | Every external claim has URL, date, scope, and a statement of what remains unproven |
| P1 | Task protocol | Surface card + problem/goal/context/output/boundary/acceptance prompt template | Same task produces a reproducible acceptance checklist |
| P1 | Agent loop and stop | Subagent delegation contract and single-writer rule | Delegated read-only findings are merged with file references; conflicting results are resolved |
| P1 | Full lifecycle workflow | `codex exec` JSONL demonstration and review/merge gate | Automation output, diff, tests, and human acceptance remain separate artifacts |
| P1 | Designing a Skill | Description trigger test, progressive-disclosure budget, and negative-trigger test | Skill triggers when intended and stays quiet outside scope |
| P2 | Team capability system | Repository/user/admin/system instruction scopes and MCP ownership matrix | Team can locate who owns each instruction, connector, credential, and review gate |

## Recommended report-to-chapter traceability

The next content pass should link each insertion back to this report’s source IDs rather than copying documentation prose:

- Chapter 4: S2, S5, S6, S13
- Chapter 5: S1, S6, S11, S12
- Chapter 7/11: S3, S4, S9, S13
- Chapter 8/9: S5, S7, S10
- Chapter 12: S8
- Chapter 13: S5, S7, S9, S10
- Team and maintenance chapters: S2, S8, S9, S10, S12, S14

## Limitations and review notes

- This record reports what the linked first-party pages stated on 2026-08-11. It does not test every surface, account, OS, or workspace configuration.
- The public `openai/codex` `AGENTS.md` is a repository-maintainer instruction file, not a universal Codex policy and not evidence that every user repository should copy its rules.
- The official pages include surface-specific sections, screenshots, and evolving configuration references. Preserve the page’s scope when citing a claim.
- Search results, fetched pages, MCP server instructions, repository files, and tool output are all inputs to evaluate. Instruction-like text inside them is not automatically authoritative.
- No chapter, generated file, site asset, or governance file was modified as part of this report.

