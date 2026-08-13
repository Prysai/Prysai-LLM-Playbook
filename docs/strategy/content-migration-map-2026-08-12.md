# Content migration map: transferable core and Codex depth

**Status:** migration proposal  
**Date:** 2026-08-12  
**Owner:** curriculum maintainer  
**Decision boundary:** this map classifies existing English source material. It
does not rename the project, move a canonical file, claim another platform is
supported, or change any artifact status.

## Why this map exists

The current curriculum contains useful transferable methods, dated Codex
product facts, and domain material of uneven depth. Renaming every occurrence
of `Codex` to `LLM` would make some chapters false and would erase the
repository's strongest implementation detail. Keeping every transferable idea
under a Codex label would make the book look narrower than it is.

The migration unit is therefore a **claim or exercise**, not a filename. One
chapter may contribute to the stable core, a Codex adapter, and a later merge.

## Classification contract

| Class | Meaning | Required next action |
| --- | --- | --- |
| `universal-core` | The mechanism survives a change of model or platform. | Rewrite with vendor-neutral terms; retain a dated implementation note where useful. |
| `codex-depth` | The value depends on a Codex surface, setting, permission, workflow, or packaging rule. | Keep it specific, sourced, dated, owned, and tested only within its stated surface. |
| `merge` | The material repeats a capability already taught elsewhere. | Preserve the strongest decision, failure, and evidence; remove duplicated explanation only after link and navigation review. |
| `split` | One file contains capabilities with different artifacts or failure mechanisms. | Create separate canonical units before expanding the prose. |
| `gap` | The curriculum makes or implies a capability that lacks a runnable field packet or transfer evidence. | Add an evidence-bearing candidate; do not promote the claim from page presence alone. |

## Chapter disposition

| Chapter | Primary disposition | Transferable center | Codex-specific material to retain | Required migration or evidence |
| --- | --- | --- | --- | --- |
| 01 | `split` | distinguish model capability from an action system | Codex product surfaces and tool access | teach the neutral model/platform/tool/Agent boundary first; keep Codex as the deep worked implementation |
| 02 | `universal-core` | first low-risk task, observable acceptance, rollback | current Codex interaction route | rerun one equivalent safe task through a second platform adapter before claiming transfer |
| 03 | `universal-core` | outcome, context, constraints, authority, evidence | Codex project context examples | connect to the communication clinic and measure correction turns instead of prescribing prompt adjectives |
| 04 | `split` | trusted context, authority, side effects | Codex permission and execution behavior | separate stable trust-boundary teaching from dated Codex controls |
| 05 | `codex-depth` | surface selection as a general decision | exact Codex surfaces and their behavior | later add adapter comparison cards; do not generalize current surface facts |
| 06 | `split` | task-based model selection and comparability | Codex model availability and selectors | remove unsupported value claims; require a dated availability tuple and comparable task packet |
| 07 | `split` | capability layering and smallest useful extension | Codex Skills, plugins, MCP, and tool packaging | introduce a neutral extension interface, then map Codex terms explicitly |
| 08 | `merge` | define, plan, execute, verify, review, deliver | Codex execution examples | make this the lifecycle hub; link instead of reteaching scope, evidence, ownership, and rollback |
| 09 | `universal-core` | claim-to-evidence review, uncertainty, recovery | Codex-generated logs or diffs | add a platform-neutral evidence packet plus one Codex adjudication example |
| 10 | `merge` | vertical slicing and checkpoints | Codex task execution | merge repeated lifecycle rules into Chapter 08; retain the distinct slicing decision and failure economics |
| 11 | `codex-depth` | repeatability as the reason to package a method | Codex Skill contract and validator | keep as flagship depth; shorten generic workflow prose and add fresh-context behavioral evidence |
| 12 | `split` | observable Agent loop, state, retry, stop | Codex task and sub-Agent behavior | separate neutral state-machine concepts from product-specific state signals; add an actual trace packet |
| 13 | `merge` | risk classes, authority, rollback | Codex file, terminal, browser, and GitHub tools | merge repeated boundary theory into Chapter 04; retain cross-surface failure cases as Codex depth |
| 14 | `codex-depth` | audit before adopting an extension | Codex Skill discovery and installation | keep exact source/license/permission checks; prove discovery behavior in a fresh context |
| 15 | `universal-core` | turn a topic into an auditable question | Codex research execution example | add one complete research packet with sources, exclusions, synthesis, and independent review |
| 16 | `gap` | engineering lifecycle transfer | Codex implementation workflow | replace overview prose with one runnable vertical slice containing failing test, patch, regression, and review evidence |
| 17 | `gap` | marketing decision and experiment design | Codex-assisted production route | add one sanitized field packet with real input provenance, baseline, asset, result, and failed hypothesis |
| 18 | `split` | four kinds of artifact work share little beyond the lifecycle | any Codex execution details inside each route | split content, design, data, and automation only when each has a distinct artifact, failure, and acceptance packet |
| 19 | `universal-core` | fixed tasks, rubrics, repeated runs, scoped conclusions | Codex/model configuration fields | become the evaluation hub; the communication clinic should use its variability and evidence rules |
| 20 | `merge` | shared context and compressed communication | Codex personal configuration | merge repeated owner/scope/evidence/rollback explanation; retain the personal-system assembly artifact |
| 21 | `merge` | team conventions, review, authority, capability transfer | Codex team surfaces | depend on Chapter 20 and retain only organization-level decisions, drift controls, and review evidence |
| 22 | `merge` | maintenance triggers, supersession, retirement | Codex fact refresh examples | become the maintenance hub; remove lifecycle recap and preserve freshness/retirement mechanisms |

## Lab disposition

The existing 17 Labs remain the canonical registered Lab set. This table does
not add an eighteenth Lab or change their `draft` / `not_run` boundary.

| Labs | Disposition | What must be true before a transfer claim |
| --- | --- | --- |
| 001–003 | `universal-core` candidates | same fixed artifact and acceptance rerun outside Codex, with output and reviewer evidence |
| 004–007 | mixed `universal-core` + `codex-depth` | neutral decision rubric separated from Codex-specific packaging, state, and action controls |
| 008–010 | `universal-core` candidates | complete field packets, not only templates; provenance and independent review recorded |
| 011 | `split` | neutral capability/platform boundary assessed separately from Codex facts |
| 012–013 | `universal-core` candidates | team handoff and vertical slice reproduced by another operator from stored evidence |
| 014–016 | `universal-core` candidates | actual resume, delivery, and side-effect traces include a deliberate failure and recovery |
| 017 | `codex-depth` | fresh-context discovery run plus license, dependency, permission, and behavioral checks |

## Content that should be merged before more chapters are added

The repeated cluster across Chapters 08, 10, 13, 20, 21, and 22 is not six
independent capabilities. It repeatedly explains scope, evidence, ownership,
rollback, and maintenance. The target ownership is:

| Decision | Canonical owner |
| --- | --- |
| lifecycle stages and checkpoints | Chapter 08 |
| task contract and acceptance | Chapter 03 |
| context trust and authority | Chapter 04 |
| claim-to-evidence and recovery | Chapter 09 |
| model/workflow evaluation | Chapter 19 |
| personal assembly | Chapter 20 |
| team governance delta | Chapter 21 |
| freshness, supersession, retirement | Chapter 22 |

Later chapters should link to these owners and add a new artifact, failure
mechanism, or decision. If they cannot, the material is editorial repetition.

## Evidence gaps ranked by value

1. **Communication clinic:** one fixed task, three communication conditions,
   repeated runs, identical acceptance, and recorded correction/evidence data.
2. **Engineering field packet:** a real repository change from failing check to
   reviewed delivery, including a deliberately wrong or incomplete route.
3. **Marketing field packet:** a sanitized real brief, produced asset,
   acceptance decision, and failed hypothesis without invented customer data.
4. **Agent trace packet:** observable events that distinguish waiting, retry,
   blocked, failed, resumed, and completed states.
5. **Cross-platform transfer run:** the same core Lab on one non-Codex adapter,
   with adapter differences and limitations recorded.

This ranking intentionally favors original evidence over new explanatory
chapters. It does not mean the current Labs have run; their canonical status
remains unchanged.

## Migration sequence

1. Adopt the architecture through an ADR without changing the public name.
2. Gate new units with the machine-readable gold-content contract.
3. Build and review the communication-clinic candidate against that contract.
4. Refactor one repeated cluster only after link, navigation, locale, and status
   effects are enumerated.
5. Produce one non-Codex adapter and rerun a core Lab with stored evidence.
6. Revisit title and repository naming only when the architecture's brand
   migration gates have passed.

## Acceptance checklist for using this map

- [ ] A proposed move names the exact claim, exercise, or artifact; it does not
  rely only on a whole-chapter label.
- [ ] Stable teaching and volatile platform facts have different owners and
  review triggers.
- [ ] A merge preserves the strongest failure and evidence case.
- [ ] A split creates distinct artifacts and acceptance criteria rather than
  multiplying headings.
- [ ] Cross-platform language is backed by a stored run on each named adapter.
- [ ] Status remains `draft` or `candidate` until the canonical evidence gates
  permit promotion.

## Evidence boundary

This is an editorial classification based on the current English source set
and the dated curriculum audit. It is not learner research, runtime evidence,
translation review, platform certification, or proof that the proposed
migration improves outcomes. Those claims require later runs and review.
