<!-- content_id: chapter-05-choose-the-codex-surface | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 5: Choose the Right Codex Surface

**Status:** `candidate`. This chapter has a structured decision method and
source-backed product boundaries, but it has not passed an independent learner
pretest. No account-level capability, Cloud run, or model comparison should be
inferred from this chapter.

## The problem this chapter solves

The same goal can begin in a desktop app, CLI, IDE extension, or web flow. It
may run locally, in a Git worktree, or in a Cloud environment. Those are
different decisions.

People often collapse several stages into one sentence:

~~~
“The browser login worked, the model is in the picker, and setup finished, so
the task is ready.”
~~~

That sentence can be false in several independent ways. The target repository
may not be readable. The selected model may not be available on that surface.
The terminal, browser, connector, or filesystem tool may be missing. A Cloud
setup script may have network access while the later agent stage does not. A
worktree label may be visible while the shell or IDE still points at another
checkout.

This chapter teaches a more useful order:

~~~
choose the work surface
→ choose the entry point
→ verify the target and account boundary
→ verify the model and tools
→ perform the smallest action
→ review evidence before delivery
~~~

The word *surface* means where the work executes and where its changes land.
The word *entry point* means how a person starts and reviews that work. CLI,
IDE, desktop, and web are not interchangeable names for Local, Worktree, and
Cloud.

## Learning objectives

By the end of this chapter, you should be able to:

- choose among `Local`, `Worktree`, and `Cloud` using context, data boundary,
  side effects, evidence, and recovery requirements;
- distinguish a work surface from a desktop, CLI, IDE, or web entry point;
- test target-resource access, model availability, and tool availability as
  separate claims;
- record Cloud `setup` and `agent` evidence separately, including network and
  secret lifetime;
- produce a `surface-decision.md` that records rejected and unobserved options,
  not only the option you preferred; and
- stop safely when the next proof would require broader authority than the
  task warrants.

## A real-world entry point: the stage is the clue

The project’s field research collects public user reports from GitHub Issues,
Stack Exchange, and other public discussions. These are reports of symptoms,
not local reproductions, official root causes, or guaranteed fixes. Their value
is diagnostic: they show which claims users commonly confuse.

| Public report category | What the reporter observed | The claim it does **not** prove | First safe check |
|---|---|---|---|
| OAuth succeeds, token exchange fails | A browser authorization page completes, but the client cannot finish the exchange | That the CLI session, target host, or repository is usable | Record authorization, callback, exchange, and first harmless resource read as four separate stages |
| A custom provider exposes only one tool | Configuration is accepted, but shell, files, or browser tools are absent from the session | That the model or provider can perform the missing action | Save the actual tool inventory; test registration and invocation separately |
| Worktree and checkout disagree | The UI says Worktree, while shell `cwd`, IDE root, patch target, and Git metadata disagree | That isolation has been established for the process making the edit | Read back the absolute path, `.git` shape, workspace root, and `git status`; stop writing if they disagree |
| Cloud setup appears successful, but the task cannot use a secret or network | Dependencies install or a setup marker appears, then the agent stage cannot reach the service | That setup network access, secrets, and agent network access are the same capability | Record setup logs, agent logs, network phase, secret lifetime, and result diff independently |
| GitHub or another host is blocked by an allowlist | A request fails under a proxy, sandbox, or enterprise network policy | That expanding to full network access is the right or approved fix | Separate sandbox policy, proxy allowlist, DNS/TLS, and enterprise firewall hypotheses before requesting a narrow change |

Read the [field-problem index](../../docs/research/field-problems-index-2026-08-10.md),
[surface research](../../docs/research/field-problems-surface-2026-08-10.md), and
[forum research](../../docs/research/field-problems-forums-2026-08-10.md) for
the original links and dates. The research record is intentionally explicit
about what this project did not reproduce.

## 1. The three layers people confuse

### Work surface: where execution and changes happen

The official environment documentation describes three Codex chat work
surfaces:

| Surface | Where the task runs | What it is useful for | What it does not prove |
|---|---|---|---|
| `Local` | The current project directory on the user’s machine | Fast inspection, small local edits, and work that must remain in the current checkout | That the current directory is safe, clean, or the correct target |
| `Worktree` | A separate Git worktree on the user’s machine | Isolating a change from the main checkout and reviewing a focused diff | That every process has switched to the same worktree, or that network and account permissions changed |
| `Cloud` | A configured remote environment | Longer or parallel work where a remote isolated runtime and repository checkout are appropriate | That the account, repository, tools, network, secrets, or final diff are available in this run |

`Local` and `Worktree` are still local execution. A Worktree is a Git
isolation mechanism, not a universal security boundary. A Cloud environment is
an execution boundary, not proof that its setup, agent runtime, or external
connections are ready.

### Entry point: how a person starts and reviews

An entry point changes the interaction pattern, not automatically the
execution boundary:

| Entry point | Strength | Typical review evidence |
|---|---|---|
| Desktop app | Visible task state, environment selection, and interactive review | Environment label, task events, summary, diff, and manual confirmation |
| CLI | Explicit paths, commands, scripts, and repeatable local work | `cwd`, command output, exit code, Git status, diff, and saved logs |
| IDE extension | Nearby editor context, selected files, and an in-editor diff | Workspace root, selected context, patch, and focused diff |
| Web / Cloud flow | Remote setup, longer execution, and handoff-style review | Repository/branch, setup evidence, agent evidence, summary, and diff |

For example, a CLI can run in a Local checkout or a Worktree. An IDE can be
attached to a Worktree while a separate shell remains in the original
checkout. “I used the CLI” is therefore not a sufficient answer to “where did
the edit happen?”

## 2. Capability is a chain, not a login badge

Treat availability as a sequence of claims:

~~~
official product support
→ current account / workspace / organization authorization
→ target resource is readable
→ candidate model is available on this surface
→ required tool is registered
→ required tool is callable in this phase
→ concrete action completes
→ result is verified
~~~

Each arrow needs its own evidence. An upstream success does not substitute for
a downstream check.

| Observation | It can support | It cannot support by itself |
|---|---|---|
| Browser authorization page completed | An authorization page reached a success state | Token exchange, target-host access, or repository access |
| Model appears in a picker | The model is visible at selection time | Its availability on another surface, tool access, or task quality |
| A directory is writable | A write probe succeeded for that path and time | Correct repository targeting, remote authorization, or safe delivery |
| A tool name appears | A capability was advertised or registered | That the tool can run, has the required credentials, or may perform the desired side effect |
| Cloud setup installed a dependency | Setup reached that dependency step | Agent-stage network, secret access, task completion, or a verified diff |
| UI says `Completed` | A product state was displayed | Review, test success, deployment, push, or user acceptance |

When a chain breaks, name the broken stage. Do not make the claim stronger by
changing the subject from “this task” to “the product supports this in
general.”

## 3. Choose the surface with five gates

Evaluate candidate surfaces in this order. The order matters because it stops a
convenient entry point or preferred model from driving an unsafe environment
choice.

### Gate 1: Context

Can the surface read the exact project rules, target files, version, and
acceptance inputs required by the task? If the answer is unknown, do not infer
it from a repository name or a successful login.

### Gate 2: Data boundary and isolation

Should data remain on the current machine, in a disposable worktree, or in an
approved remote environment? Does the task contain secrets, customer data,
private source, or uncommitted work that must not cross a boundary? A remote
surface must earn its data transfer; a local surface must still have a
recoverable baseline.

### Gate 3: Action and side effect

Is the task read-only, a local edit, a branch change, a repository push, an
external API call, or a production action? Select the smallest surface that
supports the required action. Do not grant network or remote write access just
because it makes a diagnostic easier.

### Gate 4: Evidence

Can another person inspect the evidence that corresponds to the claim? Examples
include a path echo, target read, tool inventory, command output, diff, test
result, Cloud log, or human approval. A surface that makes the action possible
but leaves no reviewable evidence is a poor choice for a high-risk task.

### Gate 5: Recovery

If authentication fails, the network disappears, a dependency is missing, or
the Agent makes a partial change, can you keep the state and resume from a
known checkpoint? If not, reject the surface or reduce the task to a
read-only probe.

### A practical selection table

| Task shape | Likely candidate | Why | Required proof before action |
|---|---|---|---|
| Read public documentation and produce a local note | `Local` | No remote write or special isolation is necessary | Correct checkout, source list, and output path |
| Edit a shared repository while protecting current uncommitted work | `Worktree` | A separate Git tree makes the baseline and diff easier to isolate | Worktree path, branch/commit, `.git` shape, and Git status |
| Run a long, parallel change against an approved repository | `Cloud` | Remote isolation and handoff may fit the task | Connected repository, environment, setup/agent phase, logs, and final diff |
| Send customer data to an external connector | No automatic choice | Data owner, destination, authorization, and retention need explicit review | Exact payload, target account, approval, rollback/compensation, and tool evidence |
| Diagnose a missing tool or inaccessible path | Read-only current surface first | It preserves the failure boundary and avoids expanding authority | Tool inventory, absolute path, configuration source, and error output |

The table provides candidates, not automatic permission. A task can be
`blocked` even when a surface is normally appropriate.

## 4. Write the decision card before acting

For a task above a read-only explanation, create `surface-decision.md`. Keep
the rejected cards: they record why a plausible option was not selected.

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:

model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | concrete action
setup_evidence:
agent_action: not_applicable | concrete action
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:

recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

Use `not_observed` when the task was not run or the evidence was not collected.
Do not turn missing evidence into `yes` or `no` merely to complete the form.

## 5. Cloud has a setup phase and an agent phase

The official Cloud documentation treats setup and agent execution as different
parts of the lifecycle. Setup may install dependencies with network access.
After setup, the agent phase is normally offline unless the environment is
configured otherwise. Secrets configured for the environment may be available
to setup and removed before the agent phase.

Record these fields separately:

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

“The setup script installed the package” is evidence about setup. It is not
evidence that the agent can reach the package’s service. “The secret exists in
the environment settings” is not evidence that the task runtime can read it.
The safe default is to pause external calls until the current phase and data
path are demonstrated.

## 6. Small observable experiment: the same task, three cards

**Experiment status:** `not_run`. The protocol below is an exercise design, not
a record that this repository has run Local, Worktree, or Cloud.

### Setup

Prepare a disposable Markdown file, a short acceptance checklist, and a
temporary Git repository with no remote. Use no secrets, private data, external
messages, installation, publication, push, or production target.

### Task

The fixed task is:

> Read `brief.md`, make one named wording change in `draft.md`, run one
> read-only format check, and report the diff. Do not change any other file.

### Procedure

1. Fill Local, Worktree, and Cloud cards before running the task.
2. Apply the five gates to every card.
3. For each candidate, record the absolute path, target read, tool inventory,
   model visibility, and allowed side effects.
4. Select at most one card with enough evidence for the harmless edit. Mark
   other cards `rejected`, `blocked`, or `not_observed` with a reason.
5. Save the diff, check output, run-id, and the exact surface/entry used.
6. If the path, tool, target, or phase evidence changes, stop and preserve the
   checkpoint instead of widening authority.

### Minimum evidence

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

A passing record shows more than a changed file. It shows why one surface was
selected, why another was rejected, and which evidence supports the final
claim. If Cloud was not run, its card must say `not_observed`.

### Evidence

Save the decision cards, absolute paths, target-read result, tool inventory,
model visibility, phase statuses, diff, check output, and reviewer record. Keep
missing observations as `not_observed` rather than filling them from a UI label.

## 7. Failure patterns and safe downgrades

| Failure | Correct interpretation | Safe downgrade |
|---|---|---|
| Login success, target read fails | Identity and resource access are different stages | Stop at target-read evidence; keep the task `blocked` |
| Model visible, tool missing | Model selection and tool registration are different stages | Continue with a text-only plan or a known supported surface; do not expand permissions blindly |
| Worktree selected, paths disagree | Isolation metadata and process working directory are misaligned | Stop writes; echo paths, inspect Git state, and obtain human confirmation |
| Cloud setup passed, agent failed | Setup evidence does not cover agent evidence | Keep setup as `passed`, agent as `failed`/`not_observed`, and task as `blocked` |
| Network request blocked | The cause may be sandbox, proxy, DNS/TLS, or enterprise policy | Narrow the request and preserve the error; do not switch to unrestricted network access just to retry |
| Long wait with no new event | There is not enough evidence to call the task progressing or complete | Stop/cancel according to the surface policy and keep the last checkpoint |

These are diagnostic states, not universal product bug diagnoses. A community
workaround is a hypothesis until the relevant official behavior and current
runtime are checked.

## Reflection

Answer these questions from the decision cards and evidence, not from memory:

- Which gate changed the selection: context, data boundary, action, evidence,
  or recovery?
- Which upstream success was most tempting to overclaim?
- Did the selected entry point help execution, review, or both?
- What single additional observation would distinguish a wrong surface from a
  missing account permission or missing tool?
- If the task had private customer data, what would change in the data boundary
  and approval record?

## Transfer task

Transfer the method to a research task that uses a browser for public sources,
a local shell for redacted evidence, and an isolated environment for sensitive
files. Refill the cards. Do not copy the surface choice from this chapter into
the new task.

## Acceptance checklist

You are ready to move on when you can:

- explain the difference between `Local`, `Worktree`, and `Cloud`;
- explain why desktop, CLI, IDE, and web are entry points rather than the same
  category as work surfaces;
- produce three cards with a selected option and explicit rejected/unobserved
  reasons;
- separate account authorization, resource readability, model visibility,
  tool registration, tool invocation, action completion, and result review;
- record Cloud setup and agent evidence, network phase, and secret lifetime
  separately; and
- stop or downgrade when the next proof would require broader authority than
  the task contract allows.

## Sources and update boundary

The decision method is a stable teaching method. Product surfaces, model
matrices, permission modes, Cloud lifecycle details, tool availability, and
entry-point support are volatile. Use the dated source records before making a
current product claim.

| Volatile fact | First-party source | Accessed | Scope boundary |
|---|---|---|---|
| Codex chat work surfaces include Local, Worktree, and Cloud | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | Official environment description; does not prove this account or task can use each surface |
| Cloud setup and agent are separate phases | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | Official Cloud lifecycle; does not prove a Cloud task ran here |
| Setup networking, agent networking, and secret lifetime have separate boundaries | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | Official configuration guidance; organization policy and runtime evidence still matter |
| Local permission and approval layers are distinct | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | Official security model; does not prove the current session’s effective configuration |
| CLI, IDE, Cloud, and model support differ by surface | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | Official product pages; account, workspace, rollout, and version can change availability |

The [official fact cards](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)
provide the project’s dated summaries and limits. The [field-problem research](../../docs/research/field-problems-codex.md)
and related surface/forum records
provide public user reports. None of those records is a substitute for a
current account-level or runtime observation.

## Chapter evidence boundary

This chapter is a `candidate` content artifact. Its exercise is `not_run`.
The repository has not created a Cloud environment, run the three-card task,
validated a model matrix, or reproduced every public report as part of this
chapter. A future verification pass must save the run-id, environment, exact
inputs, tool inventory, diff, check output, and reviewer before changing those
claims.
