# First five-minute Codex success: environment-to-evidence friction ledger

**Accessed:** 2026-08-13 (America/Los_Angeles)

**Status:** candidate research record; no beginner session, product reproduction, or learning-outcome study was run.

**Scope:** first-visit friction between choosing an LLM/Codex task and reaching one small, safe, inspectable result.

This complements the existing [beginner first-practice friction record](beginner-first-practice-friction-2026-08-13.md): that record covers how a learner frames and checks a practice request; this one covers whether the selected Codex working surface, authority, and evidence path are clear enough to start.

**Owner:** curriculum-maintainer

**Next review:** 2026-09-13; also recheck before turning this recommendation into reader content or when the cited OpenAI documentation or Issue state changes.

## Question

What directly prevents a first-time reader from reaching a small result in a five-minute first attempt when the task may involve a Codex environment rather than a text-only chat?

Here, *five-minute first success* is a **candidate design target**, not a measured completion claim.

It means that a reader can identify the work surface, choose a bounded action, and retain evidence that the stated action happened.

It does not mean that the reader learned Codex, completed a useful software project, safely configured every product surface, or obtained a generally reliable result.

## Evidence classes and claim limits

| Class | Meaning in this ledger | It cannot establish |
| --- | --- | --- |
| `official fact` | A current first-party OpenAI document describes a product boundary or documented workflow. | Account availability, a reader's active configuration, an Issue diagnosis, or instructional effectiveness. |
| `public user report` | An author filed one public `openai/codex` Issue describing a symptom. | Prevalence, root cause, reproducibility, severity, an official fix, or behavior in another account or version. |
| `project inference` | A low-risk teaching response derived from the bounded sources. | A product guarantee or evidence that the response improves learning. |
| `not run` | This project deliberately did not execute the reported product scenario. | Any local runtime result. |

The public reports are symptom leads, not demand measurements.

The proposed reader response is useful even if none of the reports is reproducible.

## Friction chain

```text
intent
  -> named surface
  -> effective target and runtime readiness
  -> task-specific authority
  -> bounded action
  -> inspectable receipt
```

An attractive surface or a confident final message does not complete this chain.

A first attempt should stop at the first unknown rather than expand permissions, change targets, or repeat an unobservable action.

## Four concrete friction signals

### F1 — The visible surface can be mistaken for the effective target

OpenAI documents Local, Worktree, and Cloud as different execution environments [O2].

Local works in the current project directory; Worktree isolates changes in a Git worktree; Cloud runs in a configured remote environment [O2].

The CLI getting-started guide also locates the first task in a project directory [O1].

Those facts make target location relevant to a file-based first task.

One public Issue author reported that, after choosing **Continue in worktree**, some interface signals pointed to the worktree while the reported shell and writable workspace remained attached to the original checkout [R1].

This does not confirm a general failure or defect in another version.

**Project inference:** before the first file, terminal, Git, or test action, record the intended environment, effective current directory, repository root, branch or `HEAD`, and planned artifact.

If signals disagree, stop and use a text-only exercise or resolve the target; do not write a file in either place.

**Five-minute block:** the reader cannot safely tell whether a diff or test belongs to the task they intended to run.

### F2 — Setup completion can be confused with a runnable first action

OpenAI describes Cloud as a two-phase environment: setup runs before the agent phase, while the agent phase is offline by default unless internet access is enabled [O3].

This supports separating “an environment was selected” from “a first task reached an observable command or response.”

It does not imply that any particular setup will stall.

One Cloud Issue author reported a task stopped at “Running setup scripts” before the first marker from the custom setup script appeared, including after several reported configuration variations [R2].

This is one account of a specific scenario, not evidence of a widespread onboarding failure.

**Project inference:** define readiness by an observable first event for the selected surface.

Retain the first command or task response and terminal status when the surface exposes them.

If setup has no observable first event, stop the attempt as `environment-not-ready`; a loading label is not a completed task.

**Five-minute block:** the reader cannot distinguish waiting, failed setup, and a task that never started.

### F3 — Technical permission controls do not define task authority

OpenAI distinguishes sandbox mode (what a generated command can technically do) from approval policy (when Codex pauses to request approval) [O3].

The same documentation describes outside-workspace and network access as separately controlled boundaries.

This supports separating product controls from a user's semantic authorization for a particular mutation.

One public Issue author alleged that source-edit and verification authority was expanded into a persistent user-local package reinstall [R3].

The author's incident analysis and sequence are not OpenAI maintainer findings.

**Project inference:** put one *allowed action / forbidden action* line before the first task.

Use a fictional text revision or disposable local artifact and exclude installs, credentials, deployment, publishing, pushing, deletion, and external writes unless the task specifically authorizes them.

**Five-minute block:** the reader cannot tell whether accepting a product-level permission prompt authorizes the broader outcome they imagine the task needs.

### F4 — A completion-shaped response can be mistaken for evidence

OpenAI's non-interactive documentation separates streamed progress, a final message, and JSONL events such as command executions and file changes [O4].

It also documents a read-only default for `codex exec`.

Those product workflow facts do not promise that every surface exposes every event, or that an event proves the task met its acceptance condition.

One public Issue author reported software-verification output was hidden in the Codex App after reported command completion [R4].

The report does not establish the filtering mechanism, command success, or a recovery path.

**Project inference:** choose the evidence before asking for the action.

A text-only exercise retains its source, answer, and human checks.

A file task retains target identity, diff or artifact, and focused check result.

If required evidence is hidden, missing, or attached to another target, return `not-reviewable` rather than success.

**Five-minute block:** the reader can receive a polished “done” statement but cannot inspect the artifact or check that corresponds to it.

## One narrow reader-facing improvement

Add a **60-second First-Action Preflight** immediately before any Codex file/terminal route.

It is a four-question card, not a new Skill, setup guide, or permission bypass.

| Question | Reader records | Continue only when | Stop or route away when |
| --- | --- | --- | --- |
| Where will this run? | Text-only chat, Local, Worktree, or Cloud. | The selected surface fits the task. | The reader cannot name the surface or only needs a text result. Route to the existing fictional First Win. |
| What exact target will receive the action? | Directory or text-only source; for a repository, root and branch/`HEAD`. | Visible and effective target agree. | A worktree, current directory, or repository signal disagrees. |
| What is allowed? | One action and explicit exclusions. | The action is reversible and needs no new authority. | It needs credentials, install, deploy, publish, push, delete, or an unknown external write. |
| What will count as a receipt? | Text checks, or target plus diff/artifact plus focused check. | The reader can inspect it after the action. | The action produces only a status label or unreviewable response. |

`unknown` is a valid result.

Completing the card would only mean the reader selected a bounded action under stated conditions; it would not prove that the action succeeds, Codex behaves reliably, or the reader learned the method.

The existing First Win remains the fallback for readers without a file or tool task.

## Candidate failure cases and next evidence

1. A Worktree label and reported current directory disagree: stop before edit.
2. A Cloud run has no observable first setup or task event: return `environment-not-ready`, not “task started.”
3. A proposed check requires installation or pushing a branch: request new authority rather than broaden scope silently.
4. A final response says “done” but no receipt can be inspected: return `not-reviewable`, not success.

Testing requires actual new readers.

A valid pilot would record selected route, first unknown, elapsed time, help used, observed receipt, abandonment point, and an unseen follow-up task.

It must not collect credentials, private source code, raw account data, or unnecessary chat histories.

## Evidence ledger

| ID | Source and owner | Accessed | Class | What it supports here | What it does not support |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI: Codex CLI](https://learn.chatgpt.com/docs/codex/cli.md) | 2026-08-13 | official fact | Codex CLI onboarding places a first task in a project directory; readers can describe a focused task; OpenAI advises Git checkpoints around work. | Completion time, account availability, a particular repository's safety, or curriculum effectiveness. |
| O2 | [OpenAI: Codex environments](https://learn.chatgpt.com/docs/environments/modes.md) | 2026-08-13 | official fact | Local, Worktree, and Cloud are distinct environments; Local uses the current project directory and Worktree isolates Git-worktree changes. | A transition succeeding in a specific account/version or surface equivalence. |
| O3 | [OpenAI: Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-13 | official fact | Sandbox mode and approval policy are distinct; Cloud setup and agent phases differ; controls are security boundaries. | Task-specific semantic authorization, an Issue diagnosis, or an action guarantee. |
| O4 | [OpenAI: Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-13 | official fact | `codex exec` has a read-only default and distinct final-message, JSONL-event, command-execution, and file-change records. | Equivalent evidence in other surfaces, acceptance success, or a workaround for hidden output. |
| R1 | [openai/codex Issue #34352](https://github.com/openai/codex/issues/34352) | 2026-08-13 | public user report | One author reported a Local-to-Worktree transition with allegedly disagreeing visible and effective directory signals. | Reproduction, root cause, prevalence, broader version impact, or fix. |
| R2 | [openai/codex Issue #32209](https://github.com/openai/codex/issues/32209) | 2026-08-13 | public user report | One author reported a Cloud task with no observed custom-setup marker after the setup stage began. | Service diagnosis, prevalence, setup guidance, or fix. |
| R3 | [openai/codex Issue #37677](https://github.com/openai/codex/issues/37677) | 2026-08-13 | public user report | One author alleged a persistent local-package reinstall beyond requested verification scope. | Independently verified incident, official root cause, general Agent behavior, or control failure. |
| R4 | [openai/codex Issue #34951](https://github.com/openai/codex/issues/34951) | 2026-08-13 | public user report | One author reported verification output hidden after reported command completion. | Command success, filtering mechanism, recovery route, prevalence, or fixed release. |

## Source and asset boundary

This is an original evidence ledger.

It reproduces no Issue body, command log, screen capture, source code, document text, image, prompt, or external Skill instruction.

Linked material remains reference-only and owned by its publishers and contributors.

No external asset entered the project, so no asset-register entry is required for this research-only addition.

## Recommendation

Prioritize a small First-Action Preflight before another beginner chapter or Skill.

Its next evidence should be a commit-bound pilot with actual new readers, not more static documentation checks.
