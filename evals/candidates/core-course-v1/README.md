# LLM Foundation Core v1 evaluation candidate

**Status:** `candidate`  
**Run status:** `not_run`  
**Scope:** static contract and synthetic scoring fixtures only.

This candidate protects the five-unit beginner route from scope drift. It
contains fixed fictional artifacts for correct, boundary, and failure cases.
No model call, learner record, personal data, or external action is stored.

## What the candidate checks

- the five outcomes remain `explain`, `initiate`, `identify`, `repair`, and
  `transfer`, in that order;
- each unit has one retained learner artifact, one operation, a stop boundary,
  and no more than three newly introduced concepts;
- a first success is available before the five units;
- a unit cannot silently point at `advanced`, `reference`, or `experimental`
  material;
- the scoring set contains correct, boundary, and failure examples.
- three bounded observation protocols cover context change, first-request
  structure, and proposal/authority/execution/evidence boundaries.
- the blank run-record template matches the fixture revision, covers all five
  rubric outcomes, and carries no learner result before an authorized run.

Run the static gate with:

```powershell
python -X utf8 scripts/validate_core_course.py
python -X utf8 scripts/test_core_course.py
```

These commands do not execute a model or learner. `run_status: not_run` must
remain visible until an authorized run records its conditions, artifacts,
reviewers, disagreements, and limits.

## Files

- `fixture.json` — eleven synthetic cases covering all three case types and all five outcomes, including a controlled observation boundary.
- `scoring-rubric.json` — machine-readable scoring anchors and forbidden claims.
- `run-record-template.json` — fields required before a future run can be called
  an observation; the static validator checks its revision, field set, blank
  result state, and five-outcome score shape.
- [`docs/quality/core-course-rubric-v1.md`](../../../docs/quality/core-course-rubric-v1.md) — reviewer-facing prose rubric.
- [`observations/README.md`](observations/README.md) — the three preparation
  protocols and their shared privacy boundary.
- [`observations/context-change-and-unknowns.md`](observations/context-change-and-unknowns.md)
  — change the supplied context and keep unsupported details unknown.
- [`observations/first-request-contract.md`](observations/first-request-contract.md)
  — record goal, material, constraints, response shape, and stop conditions.
- [`observations/tool-boundary-authority-evidence.md`](observations/tool-boundary-authority-evidence.md)
  — separate a proposed action from authority, execution, and read-back proof.

The observation files are preparation material only. They do not contain
participant results and do not change the candidate's `run_status`.

## Claim boundary

Passing this candidate means only that the declared route and its fixtures are
internally consistent. It is not evidence of course effectiveness, model
behavior, learner learning, retention, transfer, or release readiness.
