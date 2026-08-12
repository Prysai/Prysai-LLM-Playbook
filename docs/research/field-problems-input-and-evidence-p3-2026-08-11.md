# Field problems: input, visibility, and evidence on Windows

**Research date:** 2026-08-12 (America/Los_Angeles)  
**Status:** `candidate`  
**Scope:** Three public GitHub reports about Codex on Windows.  
**Local reproduction:** None. These records do not claim an upstream diagnosis,
official fix, or local reproduction.

## Why these cases belong in the book

These reports expose three different evidence failures that are easy to merge
into one vague complaint about a terminal or Agent being “stuck”:

| Case | Boundary it teaches | What to preserve |
|---|---|---|
| Scrollback disappears after a long TUI response | Visible output is not durable evidence | Save the response, command output, diff, or hand-off outside the volatile viewport |
| Non-BMP characters disappear during paste | Composer echo is not input integrity | Compare the intended string with the received string before an irreversible action |
| Checkpoint refs exceed the Windows path limit | Agent-internal state is not the same as project state | Separate the working tree, ordinary Git refs, internal checkpoint refs, and remote state |

The useful teaching move is not to promise a workaround. It is to ask which
state is actually proven, capture the smallest safe artifact, and stop before a
recovery action changes the environment.

## Evidence table

| ID | Public report | Accessed | Evidence class | Current state |
|---|---|---:|---|---|
| WIN-P3-01 | [openai/codex#35335](https://github.com/openai/codex/issues/35335) | 2026-08-12 | Public user report | Open; not locally reproduced |
| WIN-P3-02 | [openai/codex#37578](https://github.com/openai/codex/issues/37578) | 2026-08-12 | Public user report | Open; not locally reproduced |
| WIN-P3-03 | [openai/codex#37559](https://github.com/openai/codex/issues/37559) | 2026-08-12 | Public user report | Open; not locally reproduced |

### WIN-P3-01 — Long TUI output is not recoverable from scrollback

The reporter describes Codex CLI `0.145.0` on Windows 10/11 in VS Code and
Windows Terminal. After a response exceeds the visible terminal height, older
content reportedly cannot be recovered through normal terminal scrollback. The
report compares the behavior with other CLI coding tools.

**Safe lesson:** Treat the viewport as presentation, not an evidence store. For
a long explanation or patch review, save the response or regenerate the needed
artifact in a bounded file. Record the terminal, CLI version, prompt class, and
whether the missing content was recoverable. Do not claim that a scrollback
limitation proves data loss inside the Agent or repository.

**Not established:** universal Windows behavior, the exact TUI implementation
cause, a release containing a fix, or a supported non-TUI mode.

### WIN-P3-02 — Paste echo is not input integrity

The reporter describes Codex CLI `0.147.0` on Windows 11, PowerShell 7.4.18,
and Windows Terminal. BMP characters reportedly remain visible while selected
characters above `U+FFFF`, including an emoji and a rare CJK character, disappear
when pasted into the TUI composer. The same characters reportedly work in
PowerShell itself.

**Safe lesson:** Before sending a prompt that contains identifiers, paths,
structured data, or non-BMP characters, compare the intended input with the
received input. If the strings differ, stop and use a safer input channel such
as a file or a deliberately reduced ASCII fixture. A visible composer is not a
cryptographic or transport-level integrity check.

**Not established:** the internal encoding implementation, affected terminals
beyond the reported environment, data loss after submission, or an official
workaround.

### WIN-P3-03 — A long checkpoint ref is not an ordinary project change

The reporter describes the Codex VS Code extension `26.803.41515` on Windows
with Git for Windows `2.55.0.windows.3`. The report says long loose refs under
`refs/codex/turn-diffs/checkpoints` can produce `Filename too long`, `bad ref`,
or invalid all-zero-ref errors during Git operations. It describes closing
Codex before removing the reported checkpoint directory as a temporary recovery
and says the ref can be recreated.

**Safe lesson:** First classify the failure surface. Capture `git status`,
`git show-ref`, `git fsck --full`, `git worktree list`, the repository root, and
the exact ref path in a disposable copy or approved diagnostic scope. Do not
delete `.git` material, change `core.longpaths`, fetch, or repair refs merely
because a UI label says checkpoint. If a cleanup is authorized, close the
producer first, record the target, make a recoverable backup, and verify the
ordinary worktree and remote state separately.

**Not established:** that every Windows checkout is affected, that enabling
`core.longpaths` is a fix, the internal ownership of the ref, or the safest
recovery for a different Git version.

## Transfer protocol

For any terminal, input, or Agent-state complaint, fill this table before
retrying:

```text
surface: CLI | editor | reader | Git | remote
reported_signal:
expected_signal:
received_input_or_output:
durable_artifact:
scope_and_version:
last_confirmed_stage:
first_unknown_stage:
safe_next_check:
stop_before:
```

The project has not run these upstream scenarios. Their status remains
`reference-only` and `unverified`.

## Sources and license boundary

This file contains short original summaries and links only. It does not copy
issue bodies, logs, code, screenshots, credentials, or proposed patches. The
records are reference material for teaching and remain subject to a fresh
review because issue state, versions, and fixes can change.
