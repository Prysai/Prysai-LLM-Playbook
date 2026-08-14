# Lab 001 v1 — First Safe Change fixture

This is a small, synthetic starting point for [Lab 001](../../book/labs/lab-001-first-safe-task-EN.md).
It contains no real project, Git history, credentials, network request,
installation step, account, model call, or external side effect.

## What you will change

`seed/README.md` contains one deliberate mistake in the local-preview command.
Copy this **entire** directory to a disposable location first. In the copy,
inspect the README and then change only `seed/README.md`. Do not edit
`verify_readme.py` or `expected/acceptance.json`.

The intended correction is discoverable from the acceptance contract: the
preview command must name port `8080`, and the README must name the local URL.
The exercise is not to guess a command from a model response; it is to compare
the README with the fixed local acceptance source.

## Run it

From the repository root on Windows:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
Copy-Item -Recurse examples\lab-001-v1 .work\first-safe-change
& $py .work\first-safe-change\seed\verify_readme.py
```

The initial result must be `FIRST_SAFE_CHANGE_FAILED`. That failure is
intentional. After reviewing the README and acceptance contract, make the
single permitted README correction in the working copy and run the same command
again. The expected local result is `FIRST_SAFE_CHANGE_OK`.

If Python is unavailable, mark the attempt `blocked: Python unavailable`. Do
not install a runtime or replace the verifier merely to complete this exercise.

## Bounded task card

```text
Goal: Correct the local-preview instructions in seed/README.md.
Sandbox: <the copied lab-001-v1 directory>.
Read first: seed/README.md and expected/acceptance.json.
Allowed edit: seed/README.md only, after you show a plan.
Do not: edit the verifier or acceptance file; install; use the network; read
secrets; commit; push; publish; contact anyone; or modify another file.
Acceptance: the supplied verifier reports FIRST_SAFE_CHANGE_OK.
Receipt: baseline result, plan, exact README diff, second checker result, and
an explicit unverified list.
Stop: the target, acceptance source, or local Python command is unavailable.
```

## What a result means

The fixture test and a local pass only establish the behavior of this fixed,
synthetic checker over this fixed README shape. They do not show that a reader
completed the exercise, that a model followed the card, that a real project
command is accurate, or that the method transfers to another task.
