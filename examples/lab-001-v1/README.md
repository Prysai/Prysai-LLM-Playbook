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

Copy this whole directory with your file manager into a disposable location;
do not change this source copy. In your copy, open `seed/README.md` and
`expected/acceptance.json` side by side. The no-runtime acceptance check is:

1. Before editing, notice that `seed/README.md` is missing the required port
   and local URL.
2. Make the single permitted README correction.
3. Confirm that the README now contains every value under
   `required_readme_strings` in `expected/acceptance.json`.

This manual `3/3` check is the default. It needs no account, package,
installation, Git repository, or network request.

If Python 3 already works on your computer, you can also open a terminal in
the copied fixture and run:

```powershell
python .\seed\verify_readme.py
```

The initial checker result must be `FIRST_SAFE_CHANGE_FAILED`; after the one
allowed correction it should be `FIRST_SAFE_CHANGE_OK`. Do not install Python
or replace the verifier merely to obtain that extra local signal. If you cannot
make a disposable local copy, stop and use the text-only First Win instead.

## Bounded task card

```text
Goal: Correct the local-preview instructions in seed/README.md.
Sandbox: <the copied lab-001-v1 directory>.
Read first: seed/README.md and expected/acceptance.json.
Allowed edit: seed/README.md only, after you show a plan.
Do not: edit the verifier or acceptance file; install; use the network; read
secrets; commit; push; publish; contact anyone; or modify another file.
Acceptance: manually confirm required_readme_strings 3/3; if Python is already
available, the supplied verifier also reports FIRST_SAFE_CHANGE_OK.
Receipt: baseline result, plan, exact README diff, second checker result, and
an explicit unverified list.
Stop: the local copy, target, or acceptance source is unavailable.
```

## What a result means

The fixture test and a local pass only establish the behavior of this fixed,
synthetic checker over this fixed README shape. They do not show that a reader
completed the exercise, that a model followed the card, that a real project
command is accurate, or that the method transfers to another task.
