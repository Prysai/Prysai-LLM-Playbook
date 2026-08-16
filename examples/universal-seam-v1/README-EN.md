# Universal Seam Fixture v1

This small, fictional offline exercise supports the first universal-core route.
Its rule is simple: a visible reply, branch label, tool-shaped block, or parser
success does **not** by itself prove the requested task, target, action, or
structured state.

There is no account, model call, network request, credential, real repository,
file change, command, commit, push, publication, or external side effect. The
records are original project material, not vendor logs.

## Your task

For every record in `cases.json`, name the exact mismatch and write the
smallest safe check. Keep the supplied status narrow:

| Status | Meaning in this fixed fixture |
| --- | --- |
| `verified_in_fixture` | Supplied local values directly establish the named mismatch. |
| `blocked` | Target or authority evidence conflicts; the next action must stop. |
| `not_run` | No execution receipt is supplied; no action is demonstrated. |
| `inferred` | A discrepancy exists, but a live diagnosis needs a platform adapter. |

Run from the repository root:

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_universal_seam_fixture.py
& $py scripts\test_universal_seam_fixture.py
```

The commands check a fixed contract and its boundary tests. Neither contacts a
model or service.

## Bounded record card

```text
Task: Classify one seam in a supplied fictional record.
Read first: cases.json and expected/acceptance.json.
Allowed: Compare fixed values and write a local decision note.
Do not: use a network, account, secret, real repository, live tool, command,
commit, push, or publication target.
Acceptance: Name the mismatch, unsupported inference, smallest safe check,
stop condition, and supplied narrow status.
Receipt: Case ID, observed fields, decision, unverified list, and whether a
future platform adapter is required.
Stop: A live product behavior, permission, schema, or external state is needed.
```

## What a pass cannot show

A pass only shows that fixed fictional records match their acceptance contract.
It does not prove an external issue, platform behavior, executed action,
learner transfer, safety, portability, or release readiness.
