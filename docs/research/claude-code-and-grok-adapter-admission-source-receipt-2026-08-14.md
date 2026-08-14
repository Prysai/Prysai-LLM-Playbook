<!-- content_id: claude-code-and-grok-adapter-admission-source-receipt-2026-08-14 | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: official-web-2026-08-14 -->

# Claude Code and Grok: platform-adapter admission source receipt

- **Record label:** 2026-08-14
- **Status:** `candidate` research record; neither named platform has a public
  curriculum adapter in this project.
- **Owner:** platform-adapter-maintainer
- **Next review:** 2026-09-14, or before a Claude Code or Grok lesson, Lab,
  Skill, comparison, permission claim, or product-specific task is proposed.

## Question and scope

Do the currently available first-party documents provide enough evidence to
admit a Claude Code or xAI Grok adapter to the public curriculum?

No. This receipt is a **pre-admission source check** only. It records a small
set of current official facts so a future maintainer can decide what needs to
be run and reviewed. It does not create a runnable adapter, a course lesson,
a Lab, a platform comparison, or an equivalence claim.

The review is limited to:

- Anthropic documentation for the Claude Code overview and permissions;
- xAI documentation for the Grok API quickstart and Grok Build overview; and
- the platform-specific delta fields required by ADR-0025.

It does not review plan eligibility, pricing, regional availability, model
quality, security, privacy, support commitments, enterprise controls, product
terms, or every available surface. Those are separate volatile questions.

## Evidence class and rights boundary

| Evidence class | Use in this receipt | It does not establish |
| --- | --- | --- |
| official fact | A narrow statement limited to the first-party page that publishes it. | A behavior guarantee, parity with another platform, or a safe learner workflow. |
| local reproduction | None; `not_run`. | Installation, authentication, tool behavior, approval behavior, output quality, or task completion. |
| project inference | The admission recommendation and missing-evidence list. | A vendor fact, endorsement, or product ranking. |
| not-established claim | A desired claim for which this review has no direct evidence. | Permission to promote a platform into the curriculum. |

This is an original Prysai Lab synthesis. It copies no external prose, code,
prompt, command, screenshot, logo, account data, or configuration. The linked
vendor documentation remains **reference-only** under its owners' terms; this
receipt makes no adaptation or asset-distribution decision.

## Official-fact claim ledger

All pages below were accessed on **2026-08-14** (America/Los_Angeles). They are
volatile, product-scoped documentation and must be checked again before a
reader-facing product claim is made.

| ID | Platform and official source | Narrow official fact retained | Scope and limit |
| --- | --- | --- | --- |
| C1 | Anthropic, [Claude Code overview][C1] | Anthropic describes Claude Code as an agentic coding tool that can read a codebase, edit files, run commands, and integrate with development tools; the page lists terminal, IDE, desktop app, and browser availability. | Describes Anthropic's documented Claude Code surfaces. It does not prove access on a particular account, successful execution, or behavior in this project. |
| C2 | Anthropic, [Configure permissions][C2] | Anthropic documents fine-grained permission rules, modes, and managed policies; its table distinguishes read-only access, shell execution, and file modification, with approval behavior described for that product. | Product documentation, not a safety certification or a guarantee that a future configuration is least-privilege. It does not establish the project's current permissions, a learner's understanding, or comparable controls elsewhere. |
| G1 | xAI, [xAI API quickstart][G1] | xAI documents an account-and-API-key route for making a first API request. | Documents one xAI API onboarding path. It does not establish that this repository may use an account, key, billing, a particular model, or a production workload. |
| G2 | xAI, [Grok Build overview][G2] | xAI describes Grok Build as a coding agent with an interactive terminal UI, headless scripting or bot use, and Agent Client Protocol integration. | Describes a named xAI product surface. It does not demonstrate local installation, authentication, tool authority, session behavior, or task success. |

## Adapter-contract snapshot

`unknown` means no project run or sufficiently scoped source was reviewed for
the field. It is not a negative statement about either product.

| Required adapter field | Claude Code evidence status | Grok evidence status | Admission implication |
| --- | --- | --- | --- |
| surface | `official-source-present`: overview lists several surfaces. | `official-source-present`: Grok Build lists TUI, headless, and ACP routes. | Choose one fixed surface; broad product names are not an adapter. |
| context injection | `unknown`: not reviewed in this receipt. | `unknown`: not reviewed in this receipt. | A future record must document exactly what enters the task. |
| actions | `official-source-present`: overview names reading, editing, and command execution. | `unknown`: the reviewed overview does not establish a task-specific action set. | A fixed task must state what may be observed or changed. |
| authority | `official-source-present`: permissions documentation describes product-level approval controls. | `unknown`: no Grok permission or approval document was reviewed here. | Do not infer comparable consent, sandboxing, or policy controls. |
| persistence | `unknown`: not reviewed in this receipt. | `unknown`: not reviewed in this receipt. | A future adapter must record what survives a task or session. |
| control loop | `unknown`: the overview is not a run record. | `unknown`: product description is not an observed loop. | A future run must capture observable steps, feedback, and stop conditions. |
| verification surface | `unknown`: not reviewed in this receipt. | `unknown`: not reviewed in this receipt. | Define evidence before any instructional task is attempted. |
| failure mode and recovery | `not_run`; no project observation. | `not_run`; no project observation. | Each candidate needs one realistic boundary case and recovery path. |
| transfer Lab | `not_run`; none exists. | `not_run`; none exists. | Neither platform passes ADR-0025's low-risk-run requirement. |

## Observed limits

The reviewed pages are useful only for narrowing future work:

1. The Claude Code overview names broad capabilities but does not supply an
   execution record for this repository, a task-specific permission receipt,
   or a learner result.
2. The Claude Code permission page describes product controls, not a universal
   safety property and not a comparison baseline for Grok, Codex, or another
   platform.
3. The xAI quickstart requires a separate account/API-key path. This project
   did not create an account, provide credentials, make a request, or accept
   billing or external side effects.
4. The Grok Build overview identifies multiple usage modes, but this review
   did not install it, start a session, inspect authority prompts, or exercise
   any tool.
5. No shared, fixed task and rubric were used. The sources therefore cannot
   support a capability ranking, equivalent-command claim, or cross-platform
   learning recommendation.

## What is not verified

This receipt does **not** verify that Claude Code or Grok:

- is available to a particular user, plan, device, country, account, or
  repository;
- can be installed, authenticated, configured, or run in this project;
- receives context, stores sessions, asks for consent, invokes tools, or
  persists permissions in the same way as Codex or each other;
- safely reads, edits, executes, browses, connects, publishes, or changes any
  external resource in a specific setup;
- completes a task correctly, reliably, securely, privately, or at a stated
  cost or latency;
- has a documented failure mode that this project reproduced or recovered
  from; or
- helps a learner, transfers a skill, passes an evaluation, or merits a public
  platform track.

No learner run, model run, API request, account login, local installation,
comparison, independent review, or source-license adaptation was performed.

## Conservative recommendation

**Do not admit either platform adapter.** Keep Claude Code and Grok as named
future adapter candidates only. The official materials are sufficient to
identify possible product deltas, but they do not satisfy the source, run,
failure, transfer-Lab, license-decision, and editorial gates in ADR-0025.

Before either platform appears in public curriculum, appoint a named adapter
owner and create a separate candidate record with:

1. one reader problem that is not already owned by the universal core or Codex
   track;
2. one fixed, low-risk task with declared inputs, account boundary,
   permissions, acceptance evidence, and cleanup;
3. fresh official facts for its actual surface, context, authority,
   persistence, and verification controls;
4. a recorded execution and one boundary or failure observation with a safe
   recovery path;
5. an explicit statement of what the run does not prove; and
6. a source-and-asset license decision plus editorial review for duplication
   and misleading parity claims.

Until those artifacts exist, the accurate status for both candidates is
`source-checked / not_run / not-admitted`.

## Source ledger

| ID | Evidence class | Source owner and URL | Accessed | Scoped use in this receipt | Does not prove |
| --- | --- | --- | --- | --- | --- |
| C1 | official fact | Anthropic, [Claude Code overview][C1] | 2026-08-14 | Product-scoped description of Claude Code surfaces and broad coding actions. | Local availability, task result, permission state, or parity. |
| C2 | official fact | Anthropic, [Configure permissions][C2] | 2026-08-14 | Product-scoped description of Claude Code permission rules and approval behavior. | A secure configuration, a project run, or cross-platform control equivalence. |
| G1 | official fact | xAI, [xAI API quickstart][G1] | 2026-08-14 | Product-scoped API onboarding and first-request documentation. | Credential authorization, account access, billing approval, or a successful API call here. |
| G2 | official fact | xAI, [Grok Build overview][G2] | 2026-08-14 | Product-scoped description of Grok Build usage modes. | Installation, authentication, tool authority, output quality, or a runnable adapter. |
| P1 | project inference | This receipt and ADR-0025 | 2026-08-14 | Conservative decision to retain source-checked candidates but reject admission. | A vendor conclusion, endorsement, or platform ranking. |
| L1 | local reproduction | None; `not_run` | 2026-08-14 | Records the absence of a local, learner, or platform execution. | Any operational or educational result. |

[C1]: https://code.claude.com/docs/en/overview
[C2]: https://code.claude.com/docs/en/permissions
[G1]: https://docs.x.ai/developers/quickstart
[G2]: https://docs.x.ai/build/overview
