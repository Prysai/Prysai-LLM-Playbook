# Teaching cards

This directory contains original SVG cards that make a mechanism easier to
see before the reader works through the prose.

## Current cards

- [Smallest safe LLM loop](foundation-route-map-red-black.svg)
- [Model choice is a test](model-choice-is-a-test.svg)
- [Skill to observable output](skill-to-observable-output.svg)
- [Lifecycle checkpoints](lifecycle-checkpoints.svg)
- [Evidence and recovery ladder](evidence-recovery-ladder.svg)
- [Request to evidence](task-to-evidence-red-black.svg)
- [Four evidence lenses](four-evidence-lenses-red-black.svg)
- [Field signal to safe degradation](field-signal-to-safe-degradation-red-black.svg)
- [Beginner practice loop](beginner-practice-loop-red-black.svg)
- [Failed-interaction recovery](failed-interaction-recovery-red-black.svg)
- [Boundary Card: input, egress, effect, evidence, and stop](conversation-safety-card-red-black.svg)
- [Beginner safety stop card](beginner-safety-stop-card.svg)
- [Public-interest safety research](public-interest-safety-research-red-black.svg)
- [Source check before belief](source-check-before-belief-red-black.svg)
- [Practice target to first attempt](practice-target-to-first-attempt-red-black.svg)
- [Research question to source record](research-question-to-source-record-red-black.svg)
- [First-turn contract](first-turn-contract-card.svg)
- [Agent handoff receipt checkpoints](agent-handoff-receipt-checkpoints-red-black.svg)
- [Interruption checkpoint](interruption-checkpoint-card-red-black.svg)
- [Universal seams](universal-seams-red-black.svg)
- [Project evidence snapshot](project-evidence-snapshot-red-black.svg)
- [From understanding to transfer](understanding-to-transfer-red-black.svg)
- [Six LLM terms to one checked result](llm-six-terms-to-one-check.svg)
- [Observable action boundary](observable-action-boundary-red-black.svg)
- [Prompt contract: six fields](prompt-contract-six-fields-red-black.svg)
- [Reliable LLM work loop](reliable-llm-work-loop-red-black.svg)
- [Side-effect boundary decision map](side-effect-boundary-decision-map.svg)
- [Claim to evidence audit](claim-to-evidence-audit-red-black.svg)
- [Evidence to decision and stop](evidence-to-decision-stop-map-red-black.svg)
- [Recovery decision tree](recovery-decision-tree-red-black.svg)
- [Reader page anatomy](reader-page-anatomy-red-black.svg)
- [Reader page-to-practice reading loop](reader-page-reading-loop-red-black.svg)
- [Reader route compass](reader-route-compass-red-black.svg)
- [LLM Foundation Core path](llm-foundation-core-path-red-black.svg)
- [First visit route to one checked LLM task](foundation-first-visit-route-red-black.svg)
- [Playbook learning journey](playbook-learning-journey-red-black.svg)

The cards are visual explanations, not benchmark results. Their scope,
ownership, and reuse boundary are recorded in the
[asset register](../../docs/sources/asset-register.md).

Dense boards belong in full-width reader material. A card preview must retain
one legible thesis and one clear action at its rendered size; otherwise link to
the full board instead of shrinking the whole lesson into a thumbnail.

Run `python scripts/validate_teaching_assets.py` before adding or renaming a
card. It checks the catalog, source-register path, public mobile inventory
count, and minimal SVG text alternatives; it does not assess comprehension,
visual quality, or runtime behavior.

## Reader presentation contract

The Reader pairs each selected board with a localized thesis, caption, concise
alternative text, and a link to the original SVG. On narrow screens the board
is kept within the viewport and the surrounding text remains the baseline
explanation. The Reader's heading-derived concept map is a separate navigation
enhancement: its ordered list works without relying on a canvas, Mermaid, a
remote script, or a pointer gesture.
