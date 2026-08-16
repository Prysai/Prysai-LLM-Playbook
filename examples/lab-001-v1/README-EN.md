# Lab 001 v1 — First Safe Change fixture

This small synthetic fixture supports [Lab 001](../../book/labs/lab-001-first-safe-task-EN.md). It has no real project, Git history, credential, network request, installation, account, model call, or external side effect.

## What you change

Copy this **entire** directory to a disposable location. In the copy, inspect `seed/README.md` and change only that file. Do not edit `verify_readme.py` or `expected/acceptance.json`.

The acceptance contract reveals the correction: the preview command must name port `8080`, and the README must name the local URL. Compare fixed local evidence; do not guess from a model response.

## Run it

Open `seed/README.md` and `expected/acceptance.json` side by side in the copy.

1. Notice the README lacks the required port and local URL.
2. Make the one permitted README correction.
3. Confirm all `required_readme_strings` are present: manual check `3/3`.

If Python 3 is already available, optionally run `python .\seed\verify_readme.py`. The first result is `FIRST_SAFE_CHANGE_FAILED`; after the allowed correction it should be `FIRST_SAFE_CHANGE_OK`. Do not install Python just for this signal.

## Bounded task card

```text
Goal: Correct local-preview instructions in seed/README.md.
Read first: seed/README.md and expected/acceptance.json.
Allowed edit: seed/README.md only, after showing a plan.
Do not: edit the verifier or acceptance file; install; use network; read secrets; commit; push; or publish.
Receipt: baseline, plan, exact diff, second result, and unverified list.
Stop: local copy, target, or acceptance source is unavailable.
```

A pass covers only this fixed synthetic checker. It does not prove learner completion, model behavior, a real project command, or transfer.
