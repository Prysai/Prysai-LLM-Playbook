<!-- content_id: first-safe-change-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-13 -->

# First Safe Change — an offline fixture before Lab 001

**Status:** `candidate` supplemental route. **Learner run:** `not_run`.

This is the default novice sandbox between Chapter 2 and Lab 001. It gives you
one deliberately incomplete README, one permitted local edit, and one narrow
checker before you work in a project of your own. It is not Chapter 23, a new
Skill, a Git exercise, or evidence that a model completed anything.

## Problem

Lab 001 asks for a disposable project, a real command source, and a bounded
README change. Those are good production-facing constraints, but they can make
the first practical step feel circular: a new reader may not yet have a safe
project or know which command source to trust.

## Concept

A fixture separates *practising the method* from *finding a suitable project*.
It is synthetic, local, and disposable. The only intended content change is a
README correction; the checker reads that file and reports a small result.
That makes the acceptance condition visible without requiring an account,
network access, installation, Git, commit, push, publication, or personal data.

## Decision

Use the project-owned [First Safe Change fixture](../../examples/lab-001-v1/README.md)
when you do not already have a disposable local project. Copy the entire
fixture into `.work/` or another throwaway directory, so its seeded mistake
remains available for the next reader.

## Action

From the repository root, make a private working copy and observe the seeded
failure first:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
Copy-Item -Recurse examples\lab-001-v1 .work\first-safe-change
& $py .work\first-safe-change\seed\verify_readme.py
```

The first command result should be `FIRST_SAFE_CHANGE_FAILED`: that is the
intentional starting state, not a broken installation. Then use the task card
in the fixture README to inspect `seed/README.md`, propose the smallest change,
and edit **only** that README after you approve the plan. Re-run the same
checker. A passing local result is `FIRST_SAFE_CHANGE_OK`.

If Python is unavailable, do not substitute another command or install a
runtime just for this route. Record `blocked: Python unavailable`, keep the
seeded README unchanged, and read the acceptance file manually. That is an
honest stop, not an incomplete pass.

## Evidence

Keep only a modest receipt:

```text
sandbox: <working-copy path>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <reviewed README diff>
check: FIRST_SAFE_CHANGE_OK | blocked: Python unavailable
external_actions: none
unverified: learner completion, model behavior, and transfer
```

The checker can establish only that this fixed synthetic README matches the
fixture's declared strings at one local moment. A pass is not a Git result,
browser result, account-permission result, security review, or learning result.

## Failure and boundary case

Do not edit the checker, the acceptance file, or a different path to obtain a
pass. If the proposed fix requires an install, network request, secret,
account, repository operation, or a second file, stop. Those actions belong to
a new decision, not to this fixture.

## Reflection

1. Which part of the acceptance condition was observable before any edit?
2. What does the final diff prove that a confident completion message does not?
3. Which real-project fact will you need to establish before repeating this
   pattern in Lab 001?

## Continue

Continue with [Lab 001 — Make one safe README change](../labs/lab-001-first-safe-task-EN.md).
Its default novice setup now points back to this fixture, then adds the
project-specific source, sandbox-identity, and recovery checks that a real
local task needs.

## Status and limits

This route is `candidate` and `not_run` as a learner route. Its committed test
checks fixture shape and the checker's declared pass/fail behavior; it does not
observe a learner, invoke Codex or another model, compare products, establish
transfer, or validate a real project command.
