# Coding-agent observability and evidence map

**Research date:** 2026-08-11 (America/Los_Angeles)  
**Status:** `candidate`  
**Scope:** Public reports about repository identity, worktree identity, stale filesystem state, stale agent memory, prompts, verification, and long-running coding-agent workflows.  
**Purpose:** Turn real failure reports into teachable checkpoints and low-risk labs for the Field Guide.  
**Change boundary:** This report is a research record only. It does not modify chapters, generated site files, navigation manifests, or runtime code.

## Executive summary

The most useful lesson from the sources is not a magic prompt. It is an evidence rule:

> Before an agent writes, runs, resumes, or reports success, verify the identity of the surface, the scope of the action, and the artifact that proves the result.

Four recurring failure shapes appear across the public reports:

1. **The selected repository is not necessarily the repository that receives a patch.** An open Codex issue describes `apply` using the process working directory instead of the repository selected with `--cd`, which can patch the wrong checkout ([openai/codex#36514](https://github.com/openai/codex/issues/36514)).
2. **A visible worktree or check panel is not necessarily bound to the active task.** Another Codex report describes the Git/checks inspector showing a different worktree's branch and checks ([openai/codex#38082](https://github.com/openai/codex/issues/38082)).
3. **A successful read can still be a stale read.** A Claude Code Windows report says reads under `%APPDATA%` returned old or missing data without identifying the path as a snapshot ([anthropics/claude-code#83935](https://github.com/anthropics/claude-code/issues/83935)).
4. **A confident answer can be based on memory or the wrong scope rather than current evidence.** A Claude Code report describes stale local Git state, a statistic measured against the wrong table scope, repeated questions, and unsupported speculation ([anthropics/claude-code#85054](https://github.com/anthropics/claude-code/issues/85054)).

These are reports, not prevalence studies or vendor-confirmed root-cause analyses. They are nevertheless excellent curriculum material because they expose observable boundaries. The recommended teaching unit is therefore a **surface identity and evidence ledger**, not a longer prompt:

```text
target surface -> effective path -> selected ref -> action scope -> command result -> artifact -> human check
```

If one link is unknown, the workflow should pause or report `unknown`; it should not silently promote a plausible story to `done`.

## Evidence policy

This note uses the following classes:

| Class | Meaning | What it can support | What it cannot support |
|---|---|---|---|
| `official_fact` | A first-party product or platform document states the behavior or recommendation. | A bounded explanation of a documented workflow or product contract. | The claim that a user's current installation has that behavior or that an issue has that root cause. |
| `public_user_report` | A public issue contains a user's environment, sequence, symptom, or reproduction attempt. | A realistic failure mode and a diagnostic question. | Prevalence, universal behavior, root cause, or a fix. |
| `community_discussion` | A public forum or discussion records experience or advice. | Candidate hypotheses and experiment ideas. | A product guarantee or validated workaround. |
| `project_inference` | This repository converts the evidence into a teaching rule. | A proposed chapter, lab, or checklist. | A claim that the vendor implements the proposed mechanism. |
| `local_reproduction` | This repository actually ran a bounded experiment. | What the experiment observed under its stated environment. | Generalization beyond that fixture and version. |

The four issue cards below are intentionally marked `public_user_report`. A report can be detailed and reproducible-looking while still being only one user's observation. Official guidance is kept in separate cards and is never used to retroactively confirm an issue's root cause.

## Research method and limits

- Retrieved the public issue pages and first-party documentation on 2026-08-11.
- Read the issue titles, public descriptions, expected behavior, reproduction details where present, and visible publication dates.
- Used no credentials, private repositories, private discussions, user data, or vendor support tickets.
- Did not run the affected Codex or Claude Code versions and did not reproduce the reported failures locally.
- Did not copy source text, screenshots, code, Skill instructions, or proprietary assets into this repository. The summaries below are original, bounded paraphrases.
- An issue's current open/closed label is not treated as proof of cause or resolution. A closed issue is not automatically a fixed issue, and an open issue is not automatically a current regression.

## Case map

| ID | Observed problem | Source date | Evidence strength | Primary teaching value |
|---|---|---:|---|---|
| CEM-01 | A patch command can use the wrong repository root | 2026-08-01 | Medium: detailed public report with a concrete two-repository expectation; no local reproduction here | Verify `cwd`, selected root, and changed paths before applying a patch |
| CEM-02 | Git/checks UI can show another worktree's state | 2026-08-11 | Medium: detailed public report with competing-context description; no local reproduction here | Bind every status claim to a task, worktree, branch, and commit |
| CEM-03 | A file read can succeed while returning stale snapshot data | 2026-08-04 | Medium: detailed Windows report with steps, impact, and workaround; no independent reproduction here | Treat freshness and provenance as part of read evidence |
| CEM-04 | An agent can state stale or mis-scoped facts confidently | 2026-08-08 | Low-to-medium: public model-behavior report with one comment and intermittent reproduction | Re-read the authoritative source and show the query scope before asserting status |

## Case cards: public user reports

### CEM-01 — `apply` can target the wrong repository

**Source:** [openai/codex issue #36514](https://github.com/openai/codex/issues/36514)  
**Published/reported:** 2026-08-01 (the page exposes `2026-08-01T18:07:55Z` in its public metadata)  
**Accessed:** 2026-08-11  
**Evidence class:** `public_user_report`  
**Evidence strength:** Medium

The report says that a Codex CLI `apply` path ignored the selected repository root and fell back to the process's current directory. The reporter describes the expected two-repository behavior: invoking the command with repository B selected should apply the task only in repository B. The issue also points to a lower-level path that already accepts an explicit working directory and proposes a focused regression test using two temporary repositories.

**What this evidence supports:** A coding-agent workflow can have a real mismatch between the path the user selected and the path a later patch operation uses. A two-repository fixture is a meaningful test because a single repository cannot reveal cross-root leakage.

**What it does not support:** It does not prove that every Codex version or command path has the bug, that the issue remains unfixed, or that the model chose the wrong file. The report is about command dispatch and repository identity, not model reasoning.

**Teaching rule:** A path mentioned in a prompt, a UI label, or a CLI option is intent. The effective `cwd`, repository top-level, branch, and changed-file list are evidence.

**Low-risk lab:** Create two disposable repositories, place a different sentinel file in each, request a harmless patch in repository B, and record:

```text
requested root
process cwd
git rev-parse --show-toplevel
git branch --show-current
git status --short
changed paths after the patch
```

The lab passes only if the requested root and effective root agree and repository A remains unchanged. It should never use a production checkout or a real secret.

### CEM-02 — The checks inspector can be bound to the wrong worktree

**Source:** [openai/codex issue #38082](https://github.com/openai/codex/issues/38082)  
**Published/reported:** 2026-08-11 (public page metadata)  
**Accessed:** 2026-08-11  
**Evidence class:** `public_user_report`  
**Evidence strength:** Medium

The report describes a task working in a dedicated worktree on branch B while the right-hand Git/checks inspector displayed branch A from the root workspace. The reporter emphasizes that the displayed check URL could be valid for branch A; the problem was contextual binding. A valid CI result attached to another checkout is still the wrong evidence for the active task.

**What this evidence supports:** “The check is green” is incomplete unless the check is bound to the active task's repository, worktree, branch, and commit. A dashboard can show a real result and still mislead the user through context mismatch.

**What it does not support:** It does not prove how the UI implemented the binding, that every worktree transition is affected, or that the issue is present in other clients.

**Teaching rule:** Every verification result needs an identity tuple:

```text
(repository URL or local root, worktree path, branch, commit SHA, check command or CI run)
```

If the tuple is incomplete, label the result `unverified` or `wrong-scope`, not `passed`.

**Low-risk lab:** Make two disposable branches with deliberately different sentinel output. Run the same check in both, then hand a learner a result without its branch name. The learner must reject it until the repository root, worktree, ref, and SHA are recovered. This teaches why a green badge is not a portable proof.

### CEM-03 — A successful read can be stale

**Source:** [anthropics/claude-code issue #83935](https://github.com/anthropics/claude-code/issues/83935)  
**Published/reported:** 2026-08-04 (public page metadata; the issue describes a Windows session and `%APPDATA%`)  
**Accessed:** 2026-08-11  
**Evidence class:** `public_user_report`  
**Evidence strength:** Medium

The report says that a Windows Claude Code session read old content, old timestamps, or a missing file under `%APPDATA%` without warning that the path was a snapshot. It describes a particularly important consequence: a child process launched by the agent could inherit the stale view, and a persistent diagnosis could then be based on the wrong configuration. The report's proposed workaround was to pass values through environment variables rather than rely on files in that path.

**What this evidence supports:** “The command returned data” is not the same as “the command observed the current source of truth.” Freshness, provenance, and path semantics matter for configuration, generated files, and external state.

**What it does not support:** It does not establish the implementation cause, the behavior of every Windows path, or the safety of the workaround in other environments. It also does not prove that a normal repository file is stale.

**Teaching rule:** A read evidence record should include at least:

```text
path
reader/process
observed timestamp or version
freshness expectation
source of truth
independent cross-check
```

For secrets and user settings, do not copy the value into the repository to make the agent see it. Prefer a disposable fixture, an approved environment variable, or a human-provided redacted fact.

**Low-risk lab:** Maintain two copies of a harmless JSON fixture: one live and one intentionally stale. Ask the learner to diagnose a mismatch without revealing which path is which. The acceptance condition is that the learner checks path, timestamp, and digest before changing code. The lab must not use `%APPDATA%`, production settings, or credentials.

### CEM-04 — Confidence does not turn stale or mis-scoped state into fact

**Source:** [anthropics/claude-code issue #85054](https://github.com/anthropics/claude-code/issues/85054)  
**Published/reported:** 2026-08-08 (public page metadata)  
**Accessed:** 2026-08-11  
**Evidence class:** `public_user_report`  
**Evidence strength:** Low-to-medium

The report describes several behaviors in one user's Claude Code session: reporting a repository as current without fetching remote state, measuring a statistic against the whole table rather than the stored procedures used by the relevant screen, asking a question that had already been answered, and appending unsupported speculation after a correct answer. The report says reproduction was intermittent and the page shows one public comment.

**What this evidence supports:** A model can produce a locally coherent explanation from the wrong scope. The failure is not necessarily a syntax error; it can be a correct calculation applied to the wrong dataset, a correct local Git query used for a remote claim, or a plausible conclusion appended after the verified answer.

**What it does not support:** It does not establish prevalence, a universal model defect, or a specific fix. It is not evidence that memory files are always stale or that fetching remote state is always appropriate.

**Teaching rule:** Match the evidence query to the user's claim:

| Claim | Minimum matching evidence |
|---|---|
| “Is this branch up to date?” | A fetch or other explicitly current remote comparison, with timestamp and remote/ref scope |
| “How many rows does this screen affect?” | The actual query/procedure and the same filters used by that screen |
| “Did we already decide this?” | The conversation or decision record, not the model's recollection |
| “Is the fix complete?” | Diff, targeted test output, exit code, and acceptance checklist |

**Low-risk lab:** Give an agent two data scopes that produce different answers: a whole-table count and a UI-filtered count. Require it to name the authoritative query before calculating. Add a second task where the local branch is behind a simulated remote ref. The agent must say `not checked` until the matching evidence is available.

## Official guidance: what the products actually say

These sources are not used to confirm the issue cards. They provide first-party boundaries for designing the curriculum.

### OpenAI — prompt engineering and evaluation

**Source:** [OpenAI API prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering.md)  
**Accessed:** 2026-08-11  
**Evidence class:** `official_fact`  
**Evidence strength:** High for the documented API guidance; not a guarantee about every Codex surface.

The page recommends pinning production applications to specific model snapshots and building tests/evaluation suites to monitor prompt behavior as prompts or model versions change. It also documents the distinction between higher-level instructions and user input and discusses examples and message roles.

**Curriculum consequence:** Teach prompts as versioned inputs to an observable workflow. A prompt that “worked once” is not a regression suite. For a reusable Skill or team workflow, keep a small fixture, expected properties, failure cases, and a record of the model/surface used.

### Anthropic — memory is context, not an enforcement boundary

**Source:** [Claude Code memory](https://code.claude.com/docs/en/memory.md)  
**Accessed:** 2026-08-11  
**Evidence class:** `official_fact`  
**Evidence strength:** High for Claude Code's documented memory model; do not generalize it to Codex.

The page says each Claude Code session begins with a fresh context window and describes `CLAUDE.md` files and auto memory as two ways to carry knowledge across sessions. It explicitly says these are treated as context, not enforced configuration, and points to a `PreToolUse` hook when an action must be blocked regardless of the model's decision. It also recommends concise, specific, verifiable instructions and notes that auto memory is limited to the first 200 lines or 25KB when loaded.

**Curriculum consequence:** The book should distinguish four layers that learners often collapse into one:

```text
remembered context -> instruction -> tool permission -> operating-system enforcement
```

A README, memory file, or Skill can guide behavior; it cannot by itself prove that a file is inaccessible or that a dangerous action is impossible. The same distinction should be explained for Codex without claiming that Claude's exact files or limits apply to Codex.

### GitHub — prompt context, examples, decomposition, and tests

**Source:** [GitHub Docs: Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering.md)  
**Accessed:** 2026-08-11  
**Evidence class:** `official_fact`  
**Evidence strength:** High for the documented Copilot guidance; not a cross-product performance guarantee.

GitHub documents that Copilot uses context such as the current file and chat history. It recommends starting general and becoming specific, giving examples, breaking complex work into smaller tasks, and using unit tests as examples for an implementation.

**Curriculum consequence:** The Field Guide's prompt protocol should require context selection and examples, but the acceptance test must remain outside the prompt. A test can describe the desired behavior; only running the test against the intended checkout supplies execution evidence.

## Cross-case synthesis: the evidence ledger

The reports point to one compact artifact that can be reused across Codex, Claude Code, Copilot-style assistants, and future tools. It is deliberately product-neutral:

| Field | Question | Example value |
|---|---|---|
| `surface` | Which client, CLI, IDE, or cloud runner acted? | `Codex CLI 0.x / PowerShell` |
| `task_id` | Which conversation or run is this? | `run-2026-08-11-004` |
| `root` | Which filesystem root was effective? | `C:\work\fixture-b` |
| `worktree` | Which checkout was active? | `C:\work\fixture-b-wt` |
| `ref` | Which branch and commit were used? | `fix/demo @ abc1234` |
| `scope` | Which files, records, or external resources were in scope? | `src/parser.ts`, fixture rows 1–10 |
| `authorization` | What action was actually authorized? | `edit fixture only; no install/push` |
| `last_read` | What exact source was read and when? | `src/parser.ts`, digest `…`, 14:02Z |
| `command` | What command or tool call ran? | `pytest tests/test_parser.py -q` |
| `result` | What observable result came back? | `exit 0; 8 passed` |
| `artifact` | Where is the evidence? | `artifacts/run-004/test.txt` |
| `human_check` | What still needs a person? | `review diff and scope` |
| `status` | Is the state completed, failed, cancelled, or unknown? | `verified` |

### Stop conditions

The agent or learner should stop and preserve state when any of these are true:

- `root` and `worktree` disagree with the requested target.
- The branch, commit, or check result is missing from a verification claim.
- A read returned data but freshness or source-of-truth is unknown.
- The task resumed after compaction, a client restart, or a worktree transition without a fresh target read.
- A command has no exit code, captured output, timeout, or cancellation result.
- The agent is asked to install, restart, publish, push, or modify a persistent environment merely because verification is inconvenient.
- The result is based on local state while the claim is about remote state.
- The result uses a broader or different data scope than the user's question.

These are teaching recommendations (`project_inference`), not claims that every product implements the same state machine.

## Chapter and lab recommendations

| Landing | Add or strengthen | Evidence basis | Suggested acceptance signal |
|---|---|---|---|
| Chapter 3 — Task protocol | Add an identity block: surface, root, ref, scope, output, stop condition | CEM-01, CEM-02, OpenAI/GitHub prompt guidance | The learner can restate the task without changing its target |
| Chapter 4 — Context and permissions | Separate memory, instructions, approval, tool permission, and OS enforcement | CEM-03, Anthropic memory docs | The learner can name what is advisory and what is enforced |
| Chapter 5 — Choose the surface | Require a surface identity card before using Local, Worktree, IDE, CLI, or Cloud | CEM-02 and existing worktree reports | Surface, path, branch, and task ID agree |
| Chapter 8 — Full lifecycle | Add an evidence ledger and a verification boundary before install/restart/push | All four cases | Every “done” claim links to an artifact and exit state |
| Chapter 9 — Verification and recovery | Teach freshness, scope matching, and `unknown` as a valid terminal state | CEM-03, CEM-04 | A green but wrong-scope result is rejected |
| Chapter 10 — Planning and slicing | Make checkpoints external: target, completed work, next step, assumptions, diff, tests | CEM-01, CEM-04 and official prompt guidance | Resume works from the checkpoint without trusting memory alone |
| Chapter 12 — Agent loop and stop | Add watchdog, no-progress threshold, cancellation, and recovery classification | Existing hang reports plus CEM-02 | Spinner alone never becomes proof of progress |
| Chapter 13 — Action boundaries | Distinguish capability from authorization and persistent side effects | Anthropic memory boundary; existing approval cases | No install/deploy/push occurs without explicit scope |
| Chapter 19 — Evaluate models and workflows | Compare prompt-only, prompt-plus-context, and prompt-plus-evidence-ledger runs | OpenAI evaluation guidance; CEM-04 | Score wrong-scope claims, unsupported certainty, and recovery time |

### Proposed lab bundle

The four case labs can share one disposable fixture repository and one evidence schema:

1. **Two roots:** apply a patch to fixture B and prove fixture A is unchanged.
2. **Two worktrees:** show that a valid check from branch A is not evidence for branch B.
3. **Live versus stale file:** diagnose a harmless stale configuration without moving secrets into the repository.
4. **Wrong scope:** compare whole-table and UI-filtered counts, then require the matching query before answering.

For each lab, record the prompt, environment, root, ref, commands, exit codes, changed files, and final classification. The labs should run offline with fabricated data. They should not connect to production, push branches, install packages globally, or use real credentials.

## A practical prompt protocol derived from the evidence

The following is a teaching template, not a vendor-specific command syntax:

```text
Goal:
  [one observable outcome]

Target identity:
  surface: [client/CLI/IDE/cloud]
  repository or fixture: [absolute path or URL]
  worktree/ref: [path, branch, commit if known]

Allowed scope:
  [files, records, commands, and external systems]

Not allowed:
  [install, delete, deploy, push, secrets, unrelated paths]

Evidence required:
  [diff, test command, exit code, artifact path, timestamp/digest]

Stop if:
  [root/ref/scope/freshness is uncertain, approval is missing, or no progress is observable]

Before claiming done:
  [re-read target, inspect diff, run named check, report failures and unknowns]
```

This template is valuable because it makes the target and evidence explicit. It is not a guarantee that a model, tool, or UI will obey it; the lab and OS boundary still have to enforce the parts that matter.

## Source register

| Source | Date | Class | Use in this report | Review note |
|---|---:|---|---|---|
| [openai/codex#36514](https://github.com/openai/codex/issues/36514) | 2026-08-01 | `public_user_report` | Wrong repository root during `apply` | Recheck issue state and any linked fix before promoting to a chapter |
| [openai/codex#38082](https://github.com/openai/codex/issues/38082) | 2026-08-11 | `public_user_report` | Checks inspector bound to another worktree | New issue; do not infer prevalence or resolution |
| [anthropics/claude-code#83935](https://github.com/anthropics/claude-code/issues/83935) | 2026-08-04 | `public_user_report` | Stale Windows filesystem snapshot | Claude-specific report; do not generalize to Codex |
| [anthropics/claude-code#85054](https://github.com/anthropics/claude-code/issues/85054) | 2026-08-08 | `public_user_report` | Stale/mis-scoped claims and unsupported certainty | Intermittent report with limited public discussion |
| [OpenAI prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering.md) | accessed 2026-08-11 | `official_fact` | Model-version pinning, tests/evaluations, instruction structure | API guidance; verify separately for Codex product surfaces |
| [Claude Code memory](https://code.claude.com/docs/en/memory.md) | accessed 2026-08-11 | `official_fact` | Fresh sessions, persistent context, non-enforcement boundary | Claude Code only; exact limits may change |
| [GitHub Copilot prompt engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering.md) | accessed 2026-08-11 | `official_fact` | Context, examples, decomposition, tests as examples | Copilot guidance; not a performance guarantee across models |

## License and source boundary

The report contains original summaries, tables, and teaching proposals. It does not reproduce issue bodies, screenshots, code, Skill files, or other source assets. The URLs are retained for verification and attribution. Before turning any external example into a public chapter, re-open the source, record its current state and license/usage boundary in the project's source register, and preserve the distinction between report, official fact, reproduction, and inference.

## Next review

Revisit this report by **2026-09-11**, or sooner if any linked issue receives a maintainer explanation, a linked pull request, or a version-specific fix. Do not upgrade an issue card from `public_user_report` to `official_fact` merely because the issue was closed.
