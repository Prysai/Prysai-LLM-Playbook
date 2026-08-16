# Adversarial addendum: model-output integrity and beginner value — 2026-08-15

**Status:** review record only; no promotion, release authorization, or quality
item closure.
**Scope:** the historical Shift Handoff v1 output collection, its v2 corrective
change, the current original-Skill registry, and a local responsive review of
the collection-status chart.
**Owner:** quality-maintainer

## Why this addendum exists

The earlier [current adversarial review](adversarial-current-state-and-visual-review-2026-08-15.md)
correctly warned that structural checks are not a model result. After that
review, one anonymous-web collection captured 18 de-identified responses. A
byte-level review then found that the historical v1 prompt hashes did not bind
the Windows-serialized input files. The record must not be silently upgraded
because model text now exists.

This addendum supersedes only the earlier statement that no model output had
been collected. It does not supersede the earlier review's learner, release,
translation, discovery, or adoption findings.

## Evidence inspected

| Evidence | Direct observation | Does not establish |
| --- | --- | --- |
| [v1 captured-output record](../../evals/results/shift-handoff-pilot-chatgpt-anonymous-2026-08-15/README.md) | 18 pre-specified fictional packets, in randomized order, produced retained text outputs: 9 per declared condition. The visible label was `ChatGPT`; no version identifier was exposed. | Random sampling, a stable model identity, correct input bytes, output quality, a comparative result, efficiency, safety, learning, or IQ. |
| [v1 input-integrity review](../../evals/results/shift-handoff-pilot-chatgpt-anonymous-2026-08-15/input-integrity-review.md) | All 18 declared v1 prompt hashes mismatched the locally retained Windows prepared-file bytes because line endings were converted after hash calculation. | That a semantic prompt difference occurred; it instead blocks the required byte-exact evidence claim. |
| [v2 packet builder](../../scripts/build_shift_handoff_run_packets.py) and tests | New packets explicitly serialize UTF-8 with LF newlines and regression tests hash raw bytes. Blind review rejects v1. | That a v2 packet was frozen before collection, sent to a model, reviewed by people, or useful. |
| [Skill registry](../skill-registry.md) | 22 entries are declared original Prysai Lab methods. Their registry routes a first text-only request, practice target, source check, and recovery without copying an upstream Skill. | Automatic triggering, method effectiveness, or that a novice can pick the right route. |
| Local chart render | The revised capture-status SVG had no document-level horizontal overflow at 1280px or 390px. At 390px it shows a shortened, legible capture summary rather than a shrunken desktop board. | Reader comprehension, accessibility certification, or an effect result. |

## Worst-case review lenses

The labels below are critical lenses, not a review, employment statement,
endorsement, or finding by a university professor, scientist, Microsoft, Meta,
Kugou, or any named organization.

| Severity | Lens | Strongest failure interpretation | Current evidence | Repair before a stronger claim |
| --- | --- | --- | --- | --- |
| P0 | University educator / learning scientist | A polished six-message practice route lets a learner imitate a model response without showing an unaided attempt, delayed recall, or changed-task transfer. | `Q-001` and `Q-013` remain open. No learner artifact, completion/drop-off record, independent score, delayed task, or transfer result exists. | Run the declared privacy-bounded newcomer and experienced-reader instruments with independent scoring. Keep failures and drop-off, not just completions. |
| P0 | Evaluation scientist / reliability engineer | The project treated an output collection as a benchmark, then repaired its input record after seeing responses. | The v1 run has real retained outputs but failed its prompt-byte binding. It is deliberately ineligible for blind comparative scoring and aggregation. | Collect a new v2 round only after an immutable candidate and pre-collection freeze record exist; retain exact packets, model-surface record, exclusions, and independent scores. |
| P1 | Microsoft/Meta-like platform engineer | A user reads `ChatGPT` and assumes a stable model, settings, memory state, tool policy, data path, or equivalence with Claude, Grok, Codex, or another surface. | The anonymous web surface exposed only a label; the collection says no tools were selected, but cannot prove future platform behavior or a model snapshot. | Keep the transferable text-only core separate. Named adapters need current first-party facts, a bounded run, a failure case, owner, and review date. |
| P1 | Consumer learning-product editor | Twenty-two candidate Skills and a long practice pack make the first action harder, even when each component is individually bounded. | The registry has good provenance, but there is no observation showing that a novice can choose between Dialogue Brief, Practice Target, Source Investigator, and Recovery. | Test the first-route labels with the declared newcomer protocol. Improve wording only from observed confusion; do not add a near-duplicate Skill just to increase catalogue size. |
| P1 | Public-interest safety reviewer | A beginner interprets a neat source plan or fluent language correction as a verified fact, assessment, or safe authorization. | Cards visibly say `candidate` and name stops, but no user study shows readers keep the limit under pressure. | Preserve the text-only, fictional-first scope and test whether participants can state the stop before any live-data or high-stakes route is offered. |
| P2 | Visual-information reviewer | A hard-edged chart creates the impression that capture counts are performance counts. | The chart explicitly says `UNSCORED` and `NOT A BENEFIT RESULT`, but visual emphasis can still be read too quickly. | Keep the chart beside its written limitation, use it only as capture completeness, and do not use it in promotional performance claims. |

## Skill decision

No additional Skill is admitted from this review. The current directory already
contains separate owners for the stated beginner seams: first request,
before-send inspection, target setting, practice feedback, source work, and
failed-response recovery. Adding a vague "AI learning" or "better prompt"
Skill would overlap those contracts and make the least-prepared reader choose
among more labels.

The right admission test remains: a proposed Skill must own a distinct
decision, have a clear non-trigger, preserve source and license boundaries,
produce an observable low-risk artifact, include a failure case, name a
maintainer, and state what fresh-context or learner evidence remains missing.

## Current claim boundary

The project may now say that it has:

- original, candidate Skill contracts with a declared provenance rule;
- copy-ready, low-risk, text-only practice candidates for language, rewriting,
  research planning, and recovery; and
- one retained but ineligible v1 model-output collection plus a v2 integrity
  repair.

It may not say that any Skill, prompt card, or six-message sequence improves
efficiency, accuracy, safety, fluency, research quality, productivity, IQ,
retention, transfer, or adoption. It may not claim compatibility across all
LLMs or a review by any named organization.
