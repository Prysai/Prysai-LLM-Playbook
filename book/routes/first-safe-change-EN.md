<!-- content_id: first-safe-change-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-14 -->

# First Safe Change — an offline fixture before Lab 001

**Status:** `candidate` supplemental route. **Learner run:** `not_run`.

This is the default novice sandbox between Chapter 2 and Lab 001. It gives you
one deliberately incomplete README, one permitted local edit, and one narrow
checker before you work in a project of your own. It is not Chapter 23, a new
Skill, a Git exercise, or evidence that a model completed anything.

If this is your first time opening a project folder or running a checker, that
is exactly why this route exists. You do not need to install anything, create
an account, or risk a real project to learn the first loop. We will keep the
target small enough that you can see every relevant file and decide whether the
check actually answers the question.

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

Use the project-owned [First Safe Change fixture](../../examples/lab-001-v1/README-EN.md)
when you do not already have a disposable local project. Copy the entire
fixture into `.work/` or another throwaway directory, so its seeded mistake
remains available for the next reader.

## Action

First make a private working copy. In your file manager, copy the entire
`examples/lab-001-v1` folder to a throwaway location and call the copy
`first-safe-change`. Do not edit the repository's original fixture: its seeded
mistake is the starting point for the next reader.

Then choose one of two checks:

1. **No-runtime check (the default).** Open `seed/README.md` and
   `expected/acceptance.json` in the copied folder. Before editing, the README
   is missing two required preview details. After the one permitted README
   edit, check that the README visibly contains all three strings named under
   `required_readme_strings` in the acceptance file.
2. **Optional local checker.** Use this only when Python 3 already works on
   your computer. Open a terminal in the copied folder and run:

```powershell
python .\seed\verify_readme.py
```

The first optional checker result should be `FIRST_SAFE_CHANGE_FAILED`: that
is the intentional starting state, not a broken installation. Then use the
task card in the fixture README to inspect `seed/README.md`, propose the
smallest change, and edit **only** that README after you approve the plan.
Repeat the same manual check or optional local command. A passing optional
local result is `FIRST_SAFE_CHANGE_OK`.

If Python is unavailable, do not install a runtime or substitute another
command just for this route. Use the no-runtime check and record
`check: manual required_readme_strings 3/3`. If you cannot make a disposable
local copy at all, stop and use the text-only First Win instead; do not pretend
that a GitHub web view is a local sandbox.

## Web-coding bridge: one visible change in a real browser

If your next goal is web coding, do not begin with “build a complete website.”
Use the project-owned [Product Context sandbox](../../examples/skill-sandbox/product-context-real-estate/README-EN.md)
as a disposable static page. It contains fictional copy only and has no live
listing, form, analytics, API, or external image.

1. Copy the entire `examples/skill-sandbox/product-context-real-estate`
   directory into a temporary location. Read its README and `index.html`.
2. Change **only** `index.html`: replace one visible sentence with a sentence
   you write for the same fictional audience. Do not change the CSS, add a
   framework, fetch an image, or add a form.
3. If Python 3 is already available, run the documented local server from the
   copied directory:

```powershell
python -m http.server 4182
```

Open `http://127.0.0.1:4182/` in a browser. Check the title, changed sentence,
unchanged heading, link targets, console, and a 390px-wide viewport. Stop if
the command, target file, or browser result is unclear; do not install a
runtime just for this exercise.

Keep a short receipt:

```text
sandbox: <copied directory>
allowed_change: index.html only
url: http://127.0.0.1:4182/
browser_check: changed sentence once; heading and links preserved; console observed
diff: <reviewed diff>
unverified: deployment, accessibility review, other browsers, user acceptance
```

This proves one local rendered state at one viewport. It does not prove a
production build, responsive quality beyond the checked viewport, accessibility
conformance, security, performance, or a useful product. For the full
engineering lifecycle, continue to [Chapter 16](../chapters/16-engineering-track-EN.md).

## Evidence

Keep only a modest receipt:

```text
sandbox: <working-copy path>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <reviewed README diff>
check: manual required_readme_strings 3/3 | FIRST_SAFE_CHANGE_OK
external_actions: none
unverified:
  - learner completion
  - model behavior
  - transfer
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
