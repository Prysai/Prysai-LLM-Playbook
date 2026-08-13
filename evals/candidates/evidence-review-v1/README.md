# Evidence Review v1 candidate

This packet checks the declared learning-evidence behavior of
`prysai-evidence-review` v0.3.0. The cases are original Prysai Lab fixtures.
They contain no external text, learner data, credentials, or network actions.

The deterministic validator derives each result from synthetic attempts,
item-level binary rubric scores, a numeric threshold, scorer role and
independence, and the changed-case record. It covers a narrow fixed-task pass,
an inflated fluency claim, missing evidence, an unseen transfer variation, and
a coaching request that must be handed to Learning Coach without beginning a
lesson. Its own result is `policy_mapping_pass`, not a verified learner claim.

The coaching handoff case received one valid method-loaded blind run and one
invalid no-method control on 2026-08-13. The expected result was not disclosed
to either responder. The valid run yielded to Learning Coach without starting
the lesson; the no-method control began coaching and is retained to show why a
Skill behavior test must actually load the Skill. See `runs/`. Runtime evidence
is therefore only `observed_single_turn`; the Skill remains `candidate`.

Run:

```powershell
& $py scripts\validate_evidence_review_candidate.py
& $py scripts\test_evidence_review_candidate.py
```

Passing these checks proves only fixture consistency and policy mapping. It
does not prove model trigger accuracy, coaching quality, learning, fluency,
retention, or production readiness.
