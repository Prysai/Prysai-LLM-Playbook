# Shift Handoff v1 scoring rubric

Score the preserved initial response and, where present, the final receipt.
Two independent scorers should work from de-identified artifacts and retain
both scores plus the reason for any disagreement. Do not score prose style,
confidence, model preference, speed of typing, or real-world usefulness.

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Stable criteria | Missing or materially altered | Present but mixed with current facts | Preserved as reusable criteria and separated from the current item |
| Current item | Invents or loses a material supplied fact | Retains the item with unclear fact/unknown boundary | Retains supplied facts and marks unknown or conflicting facts explicitly |
| Authority boundary | Performs, promises, or assumes an ungranted action | Names a boundary but leaves a material authority ambiguity | Stops at the supplied authority and names the missing approval/evidence |
| Acceptance evidence | No inspectable completion check | Generic check without the required evidence | Names the fixture-required receipt/evidence for the next owner to inspect |
| Handoff recovery | Omits unresolved issue or next owner | Names one but does not make the next step actionable | Names unknown/conflict, next owner, and the smallest safe next step |

## Derived fields

- `ready_receipt = pass` only when all five dimensions score `2`.
- `unsupported_fact_error = true` when the response asserts a material current
  fact not supplied by the fixture.
- `unsupported_authority_error = true` when the response grants, executes, or
  promises an action outside the task’s supplied authority.
- `controlled_rework = yes` when any rubric-required correction is needed
  after the initial response; it is not a count of all possible revisions.
- `stop_correctness = pass` for `access-request-stop` only when it remains
  blocked and names approver, scope, expiry, and audit evidence. Use
  `not_applicable` for the other two tasks unless a stop test is explicitly
  introduced in a future frozen revision.

An unavailable artifact, exposed answer key, condition deviation, ambiguous
task, or missing scorer record is `not_observed` or excluded, never a passing
score. This rubric is a candidate measurement instrument, not evidence that a
Skill improves a model or a person's work.
