<!-- content_id: learning-practice-contract | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-13 -->

# Learning Practice Contract

**Status:** `draft` | **Run evidence:** `not_run` | **Platform:** universal
text-chat baseline; product-specific behavior requires a sourced adapter.

## Problem

A polished answer can hide answer leakage. A completed lesson can hide cue
dependence. One high score can hide test familiarity. If the target, aids,
tasks, rubric, and artifacts change during practice, neither learner nor
reviewer can tell what was demonstrated.

## Concept

A learning practice contract fixes the capability and evidence rules before
coaching begins. It separates formative help from outcome evidence:

```text
baseline -> retrieval -> graduated help -> learner correction
         -> changed immediate check -> delayed check -> unseen transfer
```

The model may ask questions, provide graduated hints, explain errors, and
organize evidence. Its encouragement and self-score are not independent proof
of learning.

## Decision

Write the contract at observable resolution:

```text
Given [input/context], the learner will [observable action]
within [time], using [allowed aids], to [rubric threshold].
```

Do not use “understand,” “know,” “learn,” or “master” as the acceptance rule.
Fix these fields before the baseline:

| Field | Required decision |
|---|---|
| Target capability | Observable action, conditions, time, quality threshold |
| Allowed aids | Named references, tools, dictionaries, notes, or none |
| Answer leakage | What the coach may reveal, in what order, and when |
| Baseline | Fixed task revision, instructions, time, aids, rubric |
| Attempts | Save original, corrected, immediate, delayed, and transfer attempts |
| Correction ledger | Error, hint level, learner correction, rule, unresolved item |
| Immediate changed case | Same capability, materially changed surface details |
| Delayed check | Stated delay, no immediate rehearsal, new task |
| Unseen transfer | New variation material to the capability, not a near-copy |
| Scorer | Fixed rubric; deterministic or independent review where appropriate |

Use only these calibrated status forms:

- `template_selected`: the contract or prompt was selected and saved.
- `practised`: an exercise and its help/correction record were completed.
- `demonstrated_on_this_task`: the fixed check met its rubric under recorded
  conditions.
- `retained_at_[delay]`: the delayed check met its rubric after the named delay.
- `transferred_to_[variation]`: an unseen changed task met its rubric.

None implies broad mastery, fluency, expertise, permanent retention, or likely
performance under untested conditions. Apply each label independently: passing
a transfer task today does not create delayed-retention evidence.

## Action

1. Write the target, conditions, exclusions, aids, leakage policy, and rubric.
2. Give the fixed baseline before examples, explanations, choices, or hints.
3. Preserve the baseline. Ask for retrieval before help.
4. Escalate help one step at a time: locate the error, give a partial cue, then
   show one worked fragment. Record the highest help level used.
5. Require a learner-authored correction; do not silently replace the answer.
6. Run an immediate task that changes surface details while preserving the
   capability and rubric.
7. Prepare—but do not claim to schedule—a delayed check and a distinct unseen
   transfer task. Record their revisions before use when possible.
8. Score each artifact against the fixed rubric. Record disagreement and
   unknowns instead of averaging them away.
9. Issue only the narrowest status supported by the saved evidence.

The required exercise is low-risk and reversible: use synthetic or public
material in a disposable local record. Do not use credentials, private data,
real customer work, external contact, production systems, purchases,
publication, or destructive actions. If a task requires any of these, stop and
create a separately authorized protocol.

## Evidence

Keep one packet:

```text
contract_revision | task_revisions | date | surface/model label
target | conditions | allowed_aids | leakage_policy | rubric | scorer
baseline_attempt | hints_used | correction_ledger | corrected_attempt
immediate_changed_attempt | delayed_attempt | transfer_attempt
scores | scorer_disagreement | unknowns | status_claim | claim_limit
```

An immediate corrected answer supports practice, not retention. A passed fixed
check can support `demonstrated_on_this_task`. A delayed pass can support
`retained_at_[delay]`. An unseen changed-case pass can support
`transferred_to_[variation]`. Missing evidence stays `not_run` or unclaimed.

## Failure

Run these boundary cases deliberately:

- Ask for the ideal answer before the baseline. The coach must preserve the
  no-leakage rule or mark the baseline contaminated.
- Repeat a lesson sentence as the “transfer” task. The reviewer must reject it
  as a near-copy and require a materially changed case.
- Ask the same model that taught the lesson to declare mastery. It must refuse
  or narrow the claim and disclose scorer dependence.
- Miss the delayed date. Record `not_run`; do not backfill retention from the
  immediate result.

## Reflection

Which result depended most on hints? Which task variation was genuinely new?
What would an independent scorer dispute? What is the smallest later check that
could strengthen—or falsify—the current claim?

## Acceptance checklist

- [ ] The target is an observable action with conditions and threshold.
- [ ] Allowed aids and answer-leakage rules are fixed before the baseline.
- [ ] Original attempts, hints, corrections, scores, and unknowns are retained.
- [ ] The immediate task changes the case without changing the capability.
- [ ] Delayed and unseen-transfer tasks are distinct and use the declared rubric.
- [ ] The scorer and any dependence or disagreement are visible.
- [ ] Status vocabulary matches the exact available evidence.
- [ ] No status implies broad mastery, fluency, or expertise.
- [ ] The required path has no secrets, external side effects, or production use.

## Sources and maintenance

- [Durable LLM-assisted learning](../../docs/research/durable-llm-assisted-learning-and-skill-candidates-2026-08-12.md) — candidate synthesis of retrieval, feedback, spacing, retention, transfer, and claim boundaries; accessed 2026-08-12.
- [Project terminology](../../CONTEXT.md) — stable distinctions among models, tools, Skills, Agents, evidence, and learning paths.
- [Communication Clinic](../communication-clinic-EN.md) — reader-facing language and research routes that apply this contract.

The guide is original project material. The research record links the IES
practice guide and scholarly sources and states what they do not prove. Recheck
hosted product guidance before adding platform-specific actions. This draft has
no learner run, delayed check, transfer result, or independent scoring record.
