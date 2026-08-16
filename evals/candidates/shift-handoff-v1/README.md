# Shift Handoff v1 candidate fixture

**Status:** `candidate / not_run`  
**Method:** [Shift Handoff Skill](../../../skills/prysai-shift-handoff/SKILL.md)  
**Protocol:** [Shift Handoff pilot protocol v1](../../../docs/quality/shift-handoff-pilot-protocol-v1.md)

This is an original, offline, fictional fixture for checking a narrowly defined
recurring-work handoff receipt. It is deliberately outside the formal
`task-set-v1.yaml` count and the canonical Lab count.

The fixture compares two equally fact-bounded presentations:

- `baseline`: the stable criteria and today’s item appear in one conventional
  brief;
- `shift_handoff`: the same facts are separated into stable criteria, today’s
  item, authority, acceptance evidence, unknowns, and next owner.

It does not run a model, imply automatic Skill triggering, test an actual work
system, access any external service, or collect user data. It cannot establish
efficiency, productivity, IQ, learning, safety, accuracy, or cross-model
behavior.

## Files

- [fixture.json](fixture.json) — frozen fictional tasks, condition rules, and the two exact prompt layouts.
- [scoring-rubric.md](scoring-rubric.md) — independent-scorer dimensions.
- [run-record-template.json](run-record-template.json) — de-identified raw
  record shape. It intentionally contains zero results.
- [scripts/build_shift_handoff_run_packets.py](../../../scripts/build_shift_handoff_run_packets.py) — prepares the randomized 18-prompt manifest for one immutable candidate commit. It writes inputs only; it never calls a model.

Before an authorized round, use the packet builder with a recorded commit SHA,
new empty output directory, and seed. It creates three repetitions for each
task-condition pair, randomizes their run order, and hashes every prompt. Use
[scripts/analyze_shift_handoff_pilot.py](../../../scripts/analyze_shift_handoff_pilot.py)
only after an authorized round has actual de-identified records and the exact
prepared `manifest.json`. The analyzer writes `not_run` for the checked-in
template and refuses to calculate a benefit from missing, condition-deviating,
or unbound records.

## Fixture boundary

Every task is invented and self-contained. A rubric pass means only that a
specific response met the specified receipt contract for that task. It does
not prove the response is correct in a real organization, that an action is
authorized, or that a person can use the method independently.
