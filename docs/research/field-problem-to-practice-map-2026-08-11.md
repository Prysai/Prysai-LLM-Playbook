# Field problem to practice map — 2026-08-11

## Purpose

The repository already keeps public reports and official fact records, but a
reader should not have to search the research directory to find the practical
response. This map is the bridge from a reported symptom to a chapter, lab,
and first safe action. It does not claim that the reports are local
reproductions or universal product behavior.

## Evidence classes

- **Official fact:** a first-party product or protocol source owns the claim.
- **User report:** a public issue, forum post, or discussion records what one
  person observed in a declared context.
- **Project method:** an original procedure written here to make the next check
  safer and more observable.
- **Local evidence:** this repository has actually run the stated command or
  rendered the stated artifact. A plan or report is not local evidence.

## Start here when the work goes wrong

| Reported problem | First question | Smallest safe action | Main chapter | Practice |
|---|---|---|---|---|
| The agent resumes an older task after compaction or a rate limit | What was the last confirmed task pointer and side effect? | Re-read the checkpoint, target path, diff, and current branch before prompting again | [Chapter 10](../../book/chapters/10-planning-and-slicing-EN.md), [Chapter 12](../../book/chapters/12-agent-loop-and-stop-EN.md) | [Lab 014](../../book/labs/lab-014-resume-reconciliation-EN.md) |
| A verification command ran but the evidence is hidden or incomplete | Which exact claim did the command cover, and where is its output? | Re-run one focused check with working directory, exit code, and output captured | [Chapter 9](../../book/chapters/09-verification-and-recovery-EN.md) | [Lab 015](../../book/labs/lab-015-evidence-delivery-EN.md) |
| “Verify” starts installing, restarting, or changing a persistent environment | Is the next action inside the original task and rollback plan? | Stop before the side effect; split source, test, install, deploy, and live verification | [Chapter 13](../../book/chapters/13-action-boundaries-EN.md) | [Lab 016](../../book/labs/lab-016-side-effect-boundary-EN.md) |
| The worktree label and actual checkout disagree | Which path, branch, and repository did the command touch? | Record `Get-Location`/`git rev-parse` evidence and inspect the diff before editing | [Chapter 5](../../book/chapters/05-choose-the-codex-surface-EN.md), [Chapter 13](../../book/chapters/13-action-boundaries-EN.md) | [Lab 014](../../book/labs/lab-014-resume-reconciliation-EN.md) |
| A Skill is present but not discoverable, or explicit invocation differs from the list | What did the current session actually discover and load? | Test implicit listing and explicit resolution separately in a disposable scope | [Chapter 7](../../book/chapters/07-skills-plugins-and-tools-EN.md), [Chapter 14](../../book/chapters/14-discover-and-audit-skills-EN.md) | [Lab 017](../../book/labs/lab-017-skill-discovery-audit-EN.md) |
| An MCP server says connected but a call hangs or approval is unclear | At which capability stage did the chain stop? | Record visibility, discovery, target read, call result, and external read-back separately | [Chapter 7](../../book/chapters/07-skills-plugins-and-tools-EN.md), [Chapter 12](../../book/chapters/12-agent-loop-and-stop-EN.md) | [Lab 017](../../book/labs/lab-017-skill-discovery-audit-EN.md) |
| Shell networking works while browser/MCP networking fails | Which surface and network stage actually failed? | Build a surface matrix; do not widen permissions because another surface worked | [Chapter 5](../../book/chapters/05-choose-the-codex-surface-EN.md), [Chapter 13](../../book/chapters/13-action-boundaries-EN.md) | [Lab 016](../../book/labs/lab-016-side-effect-boundary-EN.md) |
| Windows output looks like gibberish or a client cannot spawn the CLI | Is this a display/launcher boundary or a task failure? | Preserve raw exit/error evidence and compare the smallest alternate surface | [Chapter 5](../../book/chapters/05-choose-the-codex-surface-EN.md), [Chapter 9](../../book/chapters/09-verification-and-recovery-EN.md) | [Lab 015](../../book/labs/lab-015-evidence-delivery-EN.md) |

## Reusable first-response envelope

Copy this into a task before attempting recovery:

```text
Observed symptom:
Last confirmed stage:
Current task pointer:
Exact target path / repository / branch:
Last known side effect:
What is only reported or hypothesized:
One read-only check:
Allowed next action:
Forbidden action:
Retry budget:
Evidence to save:
Stop condition:
```

This is a project method derived from the field-case records, not a vendor
command or a claim about hidden model reasoning.

## Source records

- [Field problems and prompt patterns — P2](field-problems-and-prompt-patterns-p2-2026-08-11.md)
- [Field problems deep dive — P2](field-problems-deep-dive-p2-2026-08-11.md)
- [Field problems index](field-problems-index-2026-08-10.md)
- [Official Codex fact cards](codex-official-fact-cards-2026-08-10.md)

Access dates and individual URLs remain in those records. The map is an
index and teaching aid; it is not a replacement for the source boundary.
