<!-- content_id: claude-code-from-source-repository-audit-2026-08-16 | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: local-untrusted-material-2026-08-16 -->

# `claude-code-from-source`: external repository audit and teaching boundary

**Status:** `candidate` research record; no book, Lab, Skill, adapter, or
project status claim is changed by this note.

**Audit date:** 2026-08-16 (America/Los_Angeles)  
**Local material inspected:** user-provided local material (path intentionally omitted)
**Public project links:** [GitHub repository](https://github.com/alejandrobalderas/claude-code-from-source), [project site](https://claude-code-from-source.com)  
**Owner:** research-maintainer  
**Next review:** 2026-09-16, or before any external wording, image, code,
prompt, or platform-specific claim from this material is used.

## Why this is a research-only input

The local directory is not a Git checkout at the inspected path (there is no
`.git` metadata), and it contains no top-level `LICENSE`, `COPYING`, `NOTICE`,
or `ATTRIBUTION` file. Its `README.md` and `CLAUDE.md` describe an independent
technical book about Anthropic's Claude Code, claim that the book contains no
Claude Code source, and say its code examples are original pseudocode. The
same material also says the analysis began from npm source maps and calls them
“leaked”; those provenance and rights assertions are claims made by the
external repository, not facts independently established by this audit.

Until a file-level license and provenance review exists, the repository is
**reference-only**. Do not copy its prose, pseudocode, diagrams, images,
prompts, names, visual treatment, or generated artifacts. A public GitHub URL,
the repository's disclaimer, or a site being reachable is not a license grant.

## What the repository teaches (observed structure, not endorsement)

The external book is organized as 18 chapters in seven parts. Its recurring
teaching shape is:

1. explain one architectural subsystem;
2. show a lifecycle or data-flow model, often as a diagram;
3. end with an **Apply This** section that extracts reusable design patterns.

The topics move from agent architecture and startup/state, through model
streaming and tool execution, to concurrency, sub-agents, coordination,
memory, Skills/hooks, terminal interaction, MCP, remote execution, and
performance. The README also exposes a short list of headline patterns, which
gives a reader a way to sample the book before committing to all chapters.

This is a coherent **agent-builder architecture study**, not a beginner guide
to using an LLM, a validated Claude Code adapter, or evidence of the product's
current runtime. Several chapters make implementation-level claims about
internal names, counts, defaults, token caps, performance percentages, and
security behavior. Those claims need an authoritative source and date before
Prysai could repeat even a paraphrased version.

## Stable concepts worth rewriting independently

These are **concept candidates**, not approved Prysai content. They are stated
at a deliberately higher level so they can be rewritten from first principles
and tested against the universal-core contract.

| Concept candidate | Safe Prysai rewrite direction | Evidence or teaching check still needed |
| --- | --- | --- |
| A model-driven workflow is a loop | Teach `request → proposed action → authority check → observation → next decision → stop` as a platform-neutral workflow. | A small, low-risk fixture that records each state; no assumption that every product exposes the same loop. |
| Tools need explicit contracts | Ask learners to specify input schema, side-effect class, authorization, output, error, and acceptance evidence for a tool. | A fixture covering malformed input, denied action, partial result, and recovery. |
| Read and write work need different concurrency treatment | Explain that independent reads may sometimes be parallelized while writes and state-changing steps require ordering and conflict review. | A deterministic test with dependency/ordering assertions; do not import a vendor's partition algorithm or performance claim. |
| Context is a managed budget | Teach staged context admission, minimization, compression, and an explicit “what was omitted?” receipt. | Measure only the local fixture's context size and behavior; no universal token or quality claim. |
| Reusable procedure and persistent project facts differ | Keep stable facts in an instruction/context layer and multi-step procedures in a reusable package with its own acceptance check. | Compare only documented behavior of the chosen adapter; retain source and license records. |
| Authority, capability, and verification are separate | Require a pre-action receipt naming target, allowed scope, approval path, containment, result, and rollback. | A denied-action and mistaken-target case; a prompt or context file is not a technical control. |
| Recovery is part of the workflow | Give every consequential action a checkpoint, diff, or restore path and a post-action acceptance test. | Test whether the selected platform's recovery covers local files only or also external effects. |
| UI responsiveness has a systems cost | For a streaming interface, discuss incremental rendering, cancellation, backpressure, and bounded output as design questions. | Browser/terminal rendering measurements from Prysai-owned code; do not reuse the external site's visual assets. |
| Performance claims need a workload | Teach readers to report startup, latency, context size, cost, and correctness separately under a frozen fixture. | Benchmark protocol, environment, repetitions, and failure accounting; never inherit the repository's percentages or token values without source. |

## Concepts to quarantine or reject for Prysai

- **Internal Claude Code facts presented as universal facts.** Names such as
  internal files, hook counts, permission modes, model choices, token caps,
  source-cache behavior, or implementation defaults are volatile and
  product-specific. They cannot be transferred to GPT, Codex, Gemini, Grok,
  or another LLM surface by analogy.
- **Unverified “source-map internals.”** The local repository is not an
  authoritative Anthropic source release. Do not use it as proof of current
  Claude Code behavior, security, privacy, cost, performance, or entitlement.
- **Security conclusions from architecture description.** A claimed snapshot,
  hook gate, sandbox, permission resolver, or fail-closed default is not a
  security assessment. It requires a versioned first-party source, local run,
  boundary case, and independent review.
- **Capability or learning inflation.** Multiple agents, cache savings,
  fluent outputs, or a polished diagram do not show correctness, productivity,
  learner transfer, or mastery.
- **Brand and presentation assets.** The README references a parody “NO'REILLY”
  cover and uses a crab illustration. No image, logo, font, title treatment,
  or O'Reilly-associated expression should enter Prysai without a separate
  rights review.

## Official Claude Code sources to use for current product facts

Where a future Prysai adapter needs current Claude Code behavior, use the
first-party documentation below rather than this external reverse-engineering
study. Each source is still volatile and must be rechecked at adapter review:

- [Claude Code overview](https://code.claude.com/docs/en/overview) — named
  product surfaces and broad documented actions.
- [Configure permissions](https://code.claude.com/docs/en/permissions) —
  permission rules, modes, approval, and managed-policy boundaries.
- [How Claude remembers your project](https://code.claude.com/docs/en/memory) —
  `CLAUDE.md`, rules, and auto-memory context behavior.
- [Extend Claude with skills](https://code.claude.com/docs/en/skills) — Skill
  discovery, locations, invocation, frontmatter, and product extensions.
- [MCP](https://code.claude.com/docs/en/mcp) — current MCP configuration and
  tool-boundary documentation when a specific integration is in scope.

The official pages establish documented product behavior and terminology only;
they do not replace a local execution record, a failure observation, a learner
test, or an adapter admission decision. See the project-owned [Claude Code and
Gemini CLI adapter admission receipt](claude-code-and-gemini-cli-adapter-admission-source-receipt-2026-08-16.md)
for the current non-admission boundary.

## Source and license ledger

| Material | Accessed | Evidence class | Rights / use decision |
| --- | --- | --- | --- |
| Local external repository README, CLAUDE.md, 18 Markdown chapters, prompts, and Astro/React source | 2026-08-16 | `local_external_material`; untrusted, not a Git checkout at the inspected path | No license file found. Reference-only; no copying or vendoring. |
| [GitHub repository](https://github.com/alejandrobalderas/claude-code-from-source) | 2026-08-16 | public repository page; owner/published claims | URL and title may be cited as a research pointer; page content, issues, assets, and code remain rights-uncertain. |
| [Project site](https://claude-code-from-source.com) | 2026-08-16 | reachable public site | Reference-only. Reachability does not establish authorship, license, accuracy, or permission to reuse. |
| Anthropic official pages listed above | 2026-08-16 | `official_fact` for the narrow current facts those pages publish | Link and paraphrase only; owner terms and volatile facts remain separate from Prysai assets. |

## Stop receipt and limits

This audit stopped after inspecting the local README, project instructions,
file inventory, package metadata, all 18 chapter headings and word counts,
selected chapters for recurring claims, the absence of a repository-level
license file, and the public GitHub/site entry points. It did not download
source maps, inspect the original npm package, run the external web app, test
the diagrams, validate any internal Claude Code claim, or contact the author.

The audit therefore supports only a **structure and concept intake decision**:
Prysai may use the stable abstractions as inspiration for an original,
source-backed, platform-neutral lesson after its own design and evidence
review. It does not support copying, an official Claude Code guide, a security
claim, a performance claim, cross-platform parity, learner benefit, or release
readiness.
