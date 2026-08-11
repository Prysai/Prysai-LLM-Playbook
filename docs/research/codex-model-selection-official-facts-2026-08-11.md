# Codex model selection: official facts and field symptoms

**Checked:** 2026-08-11  
**Status:** `candidate`  
**Purpose:** Provide a dated source record for Chapter 6. This file separates
first-party product descriptions from account-level observations, community
reports, and the Field Guide's own decision method.

## Evidence boundary

The official pages below describe product behavior and current documentation at
the time of access. They do not prove that a particular account, workspace,
organization, region, surface, provider, or session exposes the same options.
The public GitHub and Stack Exchange records are user-reported symptoms. They
are useful for designing checks, but they are not official root-cause analyses,
service guarantees, or local reproductions by this project.

No token, cookie, private path, customer data, or third-party code was copied
into this record. No command from a community report was executed as part of
this research.

## First-party sources

| Source | Accessed | What it supports | Scope and limits | Next review |
|---|---:|---|---|---:|
| [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | Model positioning, reasoning-effort guidance, local default configuration, Cloud model-selection boundary, and deprecation notices | Official documentation only; availability still needs an account/surface check, and the page's positioning is not an independent benchmark | 2026-09-11 |
| [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | CLI is a local repository workflow and exposes choices such as model, reasoning effort, permissions, and commands | Describes the CLI product; it does not prove that this checkout or this session has a particular model or permission | 2026-09-11 |
| [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | Cloud environments, setup, logs, review, and the distinction between a configured remote environment and a reviewed result | Environment setup and task completion remain separate claims; account, repository, network, secret, and agent-stage access need separate evidence | 2026-09-11 |
| [OpenAI API models](https://developers.openai.com/api/docs/models) | 2026-08-11 | A separate first-party reference for API model availability | API availability is not the same as ChatGPT-authenticated Codex availability or a desktop/CLI picker result | 2026-09-11 |

## Official fact cards

### MS-OF-01 — Model names communicate product positioning, not task results

At the time of access, the official Codex models page describes three GPT-5.6
choices: Sol for complex, open-ended work that benefits from analysis and
polish; Terra as an everyday workhorse; and Luna for clear, repeatable,
high-volume tasks such as extraction, classification, transformation, and
structured summaries.

This supports a starting hypothesis about fit. It does **not** support the
claims that one model is universally best, that Luna is the most cost-effective
for this repository, or that a model will be available in a particular account.

- **Source:** https://learn.chatgpt.com/docs/models.md
- **Accessed:** 2026-08-11
- **Applies to:** The product descriptions on the official Codex models page.
- **Owner:** `facts-maintainer`
- **Next review:** 2026-09-11
- **Evidence class:** `official_product_positioning`

### MS-OF-02 — Reasoning effort is a separate experimental variable

The official page recommends starting with the default reasoning effort and
raising it when a task needs more planning, analysis, or checking. It also says
that higher effort can take longer and use more tokens. Max gives the selected
model more time on one task; Ultra uses subagents for separable complex work.

For a comparison, model ID and reasoning effort must be recorded separately. A
run at a different effort is a different configuration, not a clean model-only
comparison. The official guidance also does not establish the effort that will
pass any Field Guide task set.

- **Source:** https://learn.chatgpt.com/docs/models.md
- **Accessed:** 2026-08-11
- **Applies to:** The official ChatGPT/Codex model-selection guidance; exact
  controls vary by entry point and current rollout.
- **Owner:** `facts-maintainer`
- **Next review:** 2026-09-11
- **Evidence class:** `official_product_guidance`

### MS-OF-03 — Local defaults and Cloud selection are different boundaries

The official page says that the ChatGPT desktop app, Codex CLI, and IDE
extension share a `config.toml`-based local default-model setting. It also says
that the default model for Codex Cloud chats cannot currently be changed in the
same way. A configuration value is evidence about a setting, not proof that a
session selected the model, that the provider accepted the pair, or that a
task completed with it.

- **Source:** https://learn.chatgpt.com/docs/models.md
- **Accessed:** 2026-08-11
- **Applies to:** The documented local and Cloud configuration paths; the
  current account, workspace, provider, and runtime still require observation.
- **Owner:** `facts-maintainer`
- **Next review:** 2026-09-11
- **Evidence class:** `official_product_boundary`

### MS-OF-04 — API model availability is a separate surface

The first-party API models page is a useful reference for API model IDs and
availability. It cannot be used as evidence that a ChatGPT-authenticated Codex
desktop, CLI, IDE, or Cloud session exposes the same model. A comparison must
record the actual entry point, provider, account scope, and observed model
selection state.

- **Source:** https://developers.openai.com/api/docs/models
- **Accessed:** 2026-08-11
- **Applies to:** OpenAI API access and its documented model catalog.
- **Owner:** `facts-maintainer`
- **Next review:** 2026-09-11
- **Evidence class:** `official_surface_boundary`

### MS-OF-05 — Deprecation notices are migration inputs, not benchmark results

The official page contains time-sensitive notices about Codex model retirement
and replacement in saved configurations. Such notices belong in a maintenance
check: inspect configuration, custom agents, scheduled tasks, and explicit
`codex exec --model` references after reading the current page. A replacement
notice does not prove that the replacement has the same behavior, cost,
latency, or task-level quality.

- **Source:** https://learn.chatgpt.com/docs/models.md
- **Accessed:** 2026-08-11
- **Applies to:** The page's current ChatGPT-authenticated Codex deprecation
  notice; API-key authentication is described separately by the page.
- **Owner:** `facts-maintainer`
- **Next review:** 2026-09-11
- **Evidence class:** `volatile_maintenance_fact`

## Public field symptoms

These are retained as symptoms and decision triggers. The Field Guide did not
reproduce them locally and did not treat issue comments or community theories
as official diagnoses.

### MS-FP-01 — A picker can leave a model/provider pair inconsistent

- **Report:** [openai/codex#27695](https://github.com/openai/codex/issues/27695)
- **Observed by reporter:** A VS Code picker changed `model` while a custom
  `model_provider` remained in configuration, producing a model/provider pair
  the reporter considered invalid.
- **Recorded environment:** VS Code extension 26.602.71036; Linux; custom
  provider; the issue's sensitive bearer token was not copied.
- **Safe teaching response:** Read back both fields, provider endpoint, and the
  effective configuration before running a task. If they disagree, stop and
  correct or revert the pair under an explicit change boundary. Do not paste a
  live token into an example.
- **Evidence status:** User report; no local reproduction and no maintainer
  confirmation recorded in the project source note.

### MS-FP-02 — Capacity failure can cut across a task checkpoint

- **Report:** [openai/codex#33865](https://github.com/openai/codex/issues/33865)
- **Observed by reporter:** A selected model returned an at-capacity message;
  comments described continuing or queued prompts around unfinished work.
- **Recorded environment:** Windows 11; Codex CLI; plan and model details as
  reported by the issue author and commenters.
- **Safe teaching response:** Preserve the last diff, command output, test
  result, and task checkpoint before retrying. Re-open or continue only after
  deciding whether the working state is complete, partial, or unknown. A retry
  is not proof that the first run completed, and a community workaround is not
  an official fix.
- **Evidence status:** User reports and comments; no local reproduction,
  server-side evidence, or maintainer-confirmed root cause in the project note.

### MS-FP-03 — A long-running command can look like progress without proof

- **Report:** [openai/codex#34325](https://github.com/openai/codex/issues/34325)
- **Observed by reporter:** A Windows CLI formatting or analysis task stayed
  in `Working` for a long period without a completion result.
- **Recorded environment:** Codex CLI 0.144.6; Windows 10/11; Windows
  Terminal; formatter/command details were not independently reduced to a
  minimal reproduction.
- **Safe teaching response:** Define an output and timeout boundary; interrupt
  when the stop rule is met; then inspect the worktree and rerun only the
  smallest necessary check. `Ctrl+C`, `Esc`, or a new conversation restores
  control but does not establish verification.
- **Evidence status:** User report; no local reproduction and no official root
  cause recorded in the project source note.

## What Chapter 6 may safely teach

1. Choose a task class, risk boundary, surface, and provider before choosing a
   model.
2. Treat model ID, provider, reasoning effort, context, tools, permissions,
   task version, and acceptance rubric as comparison inputs.
3. Verify model availability in the actual surface and account; a model card,
   picker label, config entry, or API catalog is only one layer of evidence.
4. Keep capacity and long-wait failures as preserved, typed records instead of
   silently retrying until a favorable result appears.
5. Report only task-set-scoped observations such as `worth expanding`, `do not
   expand yet`, or `insufficient evidence` until repeated independent evidence
   supports a wider claim.

## What the sources do not establish

- No source here proves a universal model ranking.
- No source here proves the Field Guide's first-pass rate, latency, cost,
  stability, or value-for-money for any model.
- No source here proves that a login, config entry, picker option, API model
  page, or Cloud environment can read this repository or invoke a tool.
- No community report here proves a root cause or a guaranteed workaround.
- The project's `three-task-smoke-v1` protocol remains `not_run`.

## License and reuse boundary

This is an original research summary with links to public first-party and
community pages. It does not copy long passages, screenshots, issue logs,
credentials, code, or Skill instructions. Community reports are
`reference-only`; official pages are cited for volatile facts and product
boundaries. The source and distribution decision is recorded in
[`docs/sources/asset-register.md`](../sources/asset-register.md).
