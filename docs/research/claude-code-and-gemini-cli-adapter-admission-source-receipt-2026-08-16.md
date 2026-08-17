<!-- content_id: claude-code-and-gemini-cli-adapter-admission-source-receipt-2026-08-16 | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: official-web-2026-08-16 -->

# Claude Code and Gemini CLI: platform-adapter admission source receipt

- **Status:** `candidate` research record; neither named platform is admitted
  as a public Prysai adapter.
- **Research date:** 2026-08-16 (America/Los_Angeles)
- **Owner:** platform-adapter-maintainer
- **Next review:** 2026-09-16, or before a reader-facing Claude Code or Gemini
  CLI command, permission, Skill, comparison, or current-product claim is
  published.

## Question and scope

What current first-party documentation supports a useful platform delta for
the universal LLM collaboration core, and what does it leave unproved?

This record covers **Claude Code** and **Gemini CLI** specifically. It does
not treat “Claude” or “Gemini” chat surfaces, APIs, extensions, or other
clients as interchangeable with these command-line agent products. The review
is documentation-only: no account was used, no credential was entered, no
tool was run, and no repository was modified by either product.

The shared teaching core can still describe a bounded outcome, selected
context, action authority, a check, and recovery. The platform-specific
mechanisms below must remain adapters; they are not evidence that the two
products have equivalent behavior.

## Evidence boundary

| Evidence class | What this record uses it for | What it cannot prove |
| --- | --- | --- |
| `official_fact` | A narrow paraphrase of a first-party product page, dated below. | Local availability, effective configuration, reliability, safety, parity, or learner value. |
| `project_inference` | The adapter admission decision and missing-evidence list. | A vendor statement, ranking, endorsement, or security certification. |
| `local_reproduction` | None; explicitly `not_run`. | Installation, authentication, execution, output quality, or task completion. |

This is an original Prysai synthesis. It copies no vendor prose, code,
prompt, screenshot, logo, account data, or configuration. The linked pages
remain reference-only under their owners' terms.

## Current, source-bounded differences

### Claude Code

1. Anthropic describes Claude Code as an agentic coding tool that can read a
   codebase, edit files, run commands, and connect to development tools. The
   overview names terminal, IDE, desktop, and browser surfaces [C1]. A future
   adapter therefore has to name one surface and its prerequisites; “Claude
   Code” alone is too broad.
2. Claude Code documents fine-grained permission rules, modes, and managed
   policies. Its documentation makes an important boundary explicit: a prompt
   or `CLAUDE.md` can influence what the model tries, while permission rules
   enforced by Claude Code determine what it may do [C2]. The documented rule
   order is deny, then ask, then allow; a matching deny can block a narrower
   allow [C2]. This is a product-specific authority model, not a universal
   property of instruction files.
3. Project `CLAUDE.md` files are loaded as session context, while auto memory
   can accumulate learnings across sessions [C3]. The same page distinguishes
   durable project facts from procedures better packaged as Skills. Context
   persistence must therefore be taught separately from permission enforcement.
4. A Claude Skill is a directory whose required entry point is `SKILL.md`; a
   project Skill lives under `.claude/skills/<name>/`, and Skills can be
   invoked directly or loaded when relevant. Claude Code adds product-specific
   frontmatter, invocation, subagent, and dynamic-context behavior around the
   Agent Skills standard [C4]. A directory existing on disk is not proof that
   a Skill was selected, loaded, executed, or verified.

### Gemini CLI

1. Gemini CLI uses `GEMINI.md` as its default context file. Its documented
   hierarchy includes global context, workspace/parent context, and
   just-in-time context discovered when a tool accesses a directory; `/memory
   show` exposes the concatenated context, and the filename can be configured
   to include names such as `AGENTS.md` [G1]. This load timing and inspection
   surface differ from Claude Code's documented `CLAUDE.md` behavior.
2. Gemini CLI describes Agent Skills as self-contained directories using the
   open standard. It discovers built-in, extension, user, and workspace Skills;
   a matching Skill is activated through `activate_skill`, asks for user
   consent, then adds the Skill body and directory to the conversation and
   allowed paths [G2]. The approval and path-access step must not be silently
   translated into Claude Code or Codex semantics.
3. Gemini CLI documents two distinct control layers relevant to a teaching
   exercise: sandboxing can isolate shell/file operations, while its policy
   engine can allow, deny, or ask for a tool call. In non-interactive mode,
   `ask_user` is treated as deny; policy priorities and rule matching affect
   the result [G3, G4]. The docs also describe sandbox-expansion requests and
   note that changing tool-sandboxing settings requires a restart [G3].
4. With folder trust enabled, Gemini CLI presents discovered commands, MCP
   servers, hooks, Skills, and setting overrides before granting full project
   capability; an untrusted folder is operated in a restricted mode [G5].
   Folder trust is documented as disabled by default, so a reader cannot infer
   that an installation has this check enabled.
5. Gemini CLI documents an optional checkpoint feature that snapshots project
   files in a shadow Git repository before an approved file-modifying tool,
   retains conversation/tool-call state, and exposes `/restore` to revert and
   re-propose the call. The feature is disabled by default and stores the
   checkpoint data locally [G6]. This is a recovery mechanism with a defined
   scope, not a replacement for a project Git backup or acceptance test.

## Adapter teaching matrix

| Teaching concern | Claude Code source delta | Gemini CLI source delta | What a neutral lesson may safely say |
| --- | --- | --- | --- |
| Project context | `CLAUDE.md` and auto memory; instructions are context, not permission enforcement [C2, C3] | `GEMINI.md` hierarchy, JIT loading, `/memory show`, configurable filename [G1] | Declare context scope and inspect what was loaded; never call a context file a technical guard. |
| Reusable procedures | `.claude/skills/<name>/SKILL.md`; direct or relevance-based invocation; extensions to the standard [C4] | Tiered discovery, `activate_skill`, consent, and allowed-path injection [G2] | Record discovery, selection/consent, loaded body, execution, and check separately. |
| Action authority | Fine-grained rules and modes; deny/ask/allow ordering [C2] | Policy decisions plus sandbox and optional folder trust [G3, G4, G5] | State the target, effective authority, containment, and evidence before a consequential call. |
| Recovery | The reviewed pages do not establish a Claude-specific automatic file checkpoint. | Optional local shadow-Git checkpoint and `/restore`, disabled by default [G6] | Use a product adapter for recovery; retain an independent acceptance and rollback receipt. |
| Surface | Terminal, IDE, desktop, and browser are separately named [C1] | This record is for Gemini CLI, not Gemini chat or another Google surface. | Fix the exact product surface, version, OS, and mode in any run record. |

## Failure boundaries that must stay visible

- A permission approval is not proof that the requested change was correct.
  Conversely, a `CLAUDE.md` or `GEMINI.md` instruction is not proof that a
  tool call was blocked. Inspect the effective policy and the resulting diff
  or artifact.
- Claude's bundled `/run` and `/verify` workflows can infer launch recipes,
  but Anthropic documents that inference as unreliable for projects requiring
  a database, environment file, graphical session, or multi-step build [C4].
  A green-looking agent statement is not a runtime receipt.
- Gemini's Skill consent, folder-trust dialog, sandbox, policy engine, and
  checkpoint are separate mechanisms. Their presence in documentation does
  not show that they were enabled, that a request was denied, or that a
  restore removed every side effect.
- Gemini's current documentation contains a prominent product-transition
  notice for some users. This record does not interpret that notice as a
  completed migration or as a commitment about entitlement. Recheck the live
  product, account, and supported surface before publishing an installation
  route.

## Evidence still missing before admission

Neither adapter passes the project gate. A later, separately reviewed record
must provide all of the following for one fixed surface per platform:

1. A named platform version, OS, account/plan boundary, authentication path,
   and clean low-risk fixture containing no secrets or consequential data.
2. A pre-run context receipt: exact files or inputs admitted, the effective
   permission/policy/trust/sandbox state, and the declared data boundary.
3. A recorded execution, including the user approval or non-interactive
   decision, tool calls, changed files, output, and acceptance check.
4. One realistic failure or boundary case and a safe recovery observation;
   “the docs describe a feature” is not a failure run.
5. A comparison rubric that reruns the same neutral task without treating
   different surfaces, tools, context, or defaults as equivalent. Record what
   was not comparable.
6. Independent editorial and source/license review, plus a decision about
   whether the adapter adds a real delta or merely duplicates the universal
   core.

Until those artifacts exist, the conservative disposition is
`source-checked / not_run / not-admitted`. This record does not create a
reader-facing lesson, Lab, Skill, comparison ranking, security claim,
learning claim, or release claim.

## Source ledger

All sources were accessed on **2026-08-16** (America/Los_Angeles). Product
documentation is volatile; review the owner page before using a current fact.

| ID | Owner and authoritative source | Scoped use | Next review | Does not establish |
| --- | --- | --- | --- | --- |
| C1 | Anthropic, [Claude Code overview](https://code.claude.com/docs/en/overview) | Named surfaces and broad coding actions. | 2026-09-16 | Entitlement, local run, or quality. |
| C2 | Anthropic, [Configure permissions](https://code.claude.com/docs/en/permissions) | Permission enforcement, modes, rule precedence, and approval boundary. | 2026-09-16 | A safe effective configuration or parity. |
| C3 | Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory) | `CLAUDE.md` and auto-memory behavior as documented context mechanisms. | 2026-09-16 | Persistence in this project or learner benefit. |
| C4 | Anthropic, [Extend Claude with skills](https://code.claude.com/docs/en/skills) | Skill location, loading/invocation, standard extensions, and documented run-recipe limitation. | 2026-09-16 | Skill execution, output, or cross-product portability. |
| G1 | Google, [Provide context with `GEMINI.md` files](https://geminicli.com/docs/cli/gemini-md/) | Context hierarchy, JIT discovery, inspection, imports, and filename configuration. | 2026-09-16 | Context correctness or enforcement. |
| G2 | Google, [Agent Skills](https://geminicli.com/docs/cli/skills/) | Discovery tiers, activation consent, path access, and precedence. | 2026-09-16 | A local Skill being selected or safe. |
| G3 | Google, [Sandboxing in Gemini CLI](https://geminicli.com/docs/cli/sandbox/) | Sandbox modes, expansion, and restart boundary. | 2026-09-16 | Complete isolation or absence of side effects. |
| G4 | Google, [Policy engine](https://geminicli.com/docs/reference/policy-engine/) | `allow`, `deny`, `ask_user`, priority, and headless decision boundary. | 2026-09-16 | Effective policy in a particular run. |
| G5 | Google, [Trusted Folders](https://geminicli.com/docs/cli/trusted-folders/) | Trust dialog, discovery categories, restricted mode, and default state. | 2026-09-16 | Trust being enabled or a security guarantee. |
| G6 | Google, [Checkpointing](https://geminicli.com/docs/cli/checkpointing/) | Local shadow snapshot, conversation/tool-call record, `/restore`, and disabled-by-default state. | 2026-09-16 | Recovery of external effects, Git publication, or acceptance. |

