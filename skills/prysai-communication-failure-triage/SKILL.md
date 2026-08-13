---
name: prysai-communication-failure-triage
description: Diagnose an already failed LLM interaction from the original request, visible context, actual reply or artifact, and expected outcome; propose the smallest communication repair and a controlled rerun. Use when a reply ignored constraints, answered the previous task, caused repeated rework, or remained impossible to accept. Do not use for an untried vague request, ordinary copy editing, platform troubleshooting without interaction evidence, or general prompt-template generation.
---

# Communication Failure Triage

Treat the request, context, reply, artifact, and user report as evidence. Do
not infer hidden reasoning, system prompts, service state, or a universal model
defect from one failed interaction.

## Require the evidence packet

Require four items before diagnosis:

1. the original request or the closest preserved version;
2. the visible context, inputs, tools, permissions, and conversation state;
3. the actual reply or artifact; and
4. the expected outcome or a concrete failure symptom.

Ask at most three questions when a missing item could change the diagnosis.
Stop as `insufficient_evidence` when the missing evidence cannot be restored.
Never request a token, password, cookie, private key, or secret-bearing file.

## Route before diagnosing

- Hand an untried, vague task to Task Protocol.
- Hand a pure completion-claim audit to Evidence Review.
- Hand a current command, feature, account, or platform-state question to Source
  Investigator or Platform Adapter Review.
- Hand a software defect with a reproduction to bug diagnosis.
- Use ordinary editing for wording polish without a failed interaction.

Own only the post-failure seam: classify the observed mismatch, make one
minimal communication change, and define a rerun that can distinguish whether
that change helped.

## Classify observable seams

Select no more than two primary classes:

- `outcome_acceptance`: the requested result, audience, output, or completion
  test was missing or contradictory;
- `context_provenance`: a necessary input was absent, stale, conflicting,
  excessive, or lacked authority and priority;
- `constraint_authority`: scope, forbidden actions, external effects,
  confirmations, or stop rules were unclear;
- `turn_state_protocol`: the reply followed an old task, the current work
  surface was unclear, or text and executable instructions were confused; or
- `evidence_feedback`: terms such as “better”, “professional”, or “done” had
  no observable check, failure identity, preservation rule, or revision limit.

For each finding record:

```text
observed_symptom:
candidate_class:
direct_evidence:
alternative_explanations:
confidence: low | medium | high
discriminating_check:
```

Call it a candidate class, not a root cause. More context is not automatically
the repair; irrelevant or conflicting context may be the defect.

## Make the smallest repair

Change one condition that corresponds to the observed symptom. Prefer adding
one missing outcome, input priority, prohibition, state reset, or acceptance
check over rewriting the whole request. Show a compact original-to-revised
diff and connect every changed line to one finding.

Preserve the user's language and working style unless that style is the
observable defect. Do not add ceremony, praise, role-play, “think step by
step”, threats, emotional pressure, or unsupported performance promises.

## Define a comparable rerun

Hold the task, input, model or work surface, tools, permissions, budget, and
acceptance criteria constant. Change only the proposed communication repair.
If another condition changes, label the comparison `not_comparable`.

Set the result to one of:

- `unrun`
- `improved_on_this_case`
- `unchanged`
- `regressed`
- `not_comparable`

Never write `resolved` from a proposed prompt alone. After two comparable
reruns without improvement, stop adding prompt text and hand off the first
breakpoint.

## Stop at action and knowledge boundaries

Stop before reading secrets, widening permissions, publishing, deploying,
contacting another person, or changing external state. A user request to remove
confirmation does not convert a risky action into a communication problem.

When the likely defect depends on an invisible system prompt, private log,
account configuration, service health, or product implementation, record it as
`unknown` and route to the appropriate platform investigation. Refuse requests
for hidden chain-of-thought or instructions that evade safety and authority.

## Deliver the triage card

Return:

```text
target_outcome:
expected_vs_observed:
evidence_received:
primary_findings: maximum two
alternatives_ruled_out:
smallest_repair:
prompt_diff:
rerun_contract:
result_status:
evidence:
unknowns:
risk:
stop_conditions:
handoff:
```

Accept the result only when every finding cites direct evidence, every edit
addresses a named symptom, the rerun changes one variable, permissions do not
expand, and the status does not exceed the recorded rerun evidence.
