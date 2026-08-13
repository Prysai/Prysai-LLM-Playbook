# Universal LLM Practice Curriculum Architecture

**Date:** 2026-08-12  
**Status:** proposal / not approved for migration  
**Scope:** information architecture, curriculum architecture, and migration
strategy  
**Decision owner:** project owner  

## Executive position

The project can serve a larger market without becoming a generic prompt
collection. The strongest direction is a **universal practice core with a deep
Codex reference track**, followed by narrower, evidence-labelled adapters for
other models and platforms.

The universal core should teach the durable collaboration loop:

```text
frame the outcome -> select context -> bound authority -> run a small action
-> inspect evidence -> repair or stop -> deliver with honest limits -> retain the method
```

Codex should remain the deepest implementation of that loop because the current
repository already contains Codex-specific chapters, labs, Skills, research,
evaluation fixtures, and governance. A broader title must not imply equal
coverage of ChatGPT, Claude, Gemini, Copilot, or any future platform until each
adapter has its own source record, runnable practice, failure case, and review
evidence.

This is a curriculum expansion, not permission to rename the project now. The
existing 22-chapter route, links, content identities, locale contracts, and
public URLs remain authoritative until an approved ADR and a verified migration
replace them.

## The product promise

The revised product should make one promise to different kinds of readers:

> Learn to turn an intention into a bounded, observable, and verifiable piece
> of work with an LLM; then transfer that method to a specific platform and
> domain without mistaking fluent output for completion.

It should answer four reader questions:

1. **Beginner:** What should I say, provide, and check to get one useful result?
2. **Practitioner:** How do I make the result repeatable across larger tasks and
   different platforms?
3. **Advanced practitioner:** How do I design context, tools, evaluations,
   failure recovery, and multi-step systems?
4. **Leader or reviewer:** How do I govern quality, permissions, sources,
   adoption, and change without trusting unsupported claims?

The project is not a model catalogue, a list of magic prompts, an API reference,
or a claim that all platforms behave identically. The transferable lifecycle is
similar; product capabilities, context handling, permissions, tool semantics,
and evidence surfaces are not.

## Architecture: one corpus, three navigation dimensions

Readers should not have to choose between a beginner book and a separate expert
book. A single content graph should support three orthogonal routes:

```text
                         CAPABILITY DEPTH
                  first result -> reliable work -> systems
                                  |
UNIVERSAL CORE -------------------+------------------- shared method
                                  |
PLATFORM TRACKS       Codex | ChatGPT | Claude | Gemini | future adapters
                                  |
TASK ROUTES       research | software | writing | design | data | operations
```

Each item has one canonical teaching owner. Routes are curated sequences of
references to those items, not copied prose. A task route may combine three
core units, one Codex adapter, two labs, and a field case without duplicating
their explanations.

### Dimension 1: capability ladder

Retain L0-L6 as stable IDs during migration, but rename their reader-facing
meaning so it is platform-neutral. The exact names require later editorial
review.

| Level | Reader outcome | Minimum evidence |
|---|---|---|
| L0 — Observe | Separate a model response, a platform action, and a verified result | Annotated claim/evidence card with one rejected inference |
| L1 — Complete | Finish one reversible, low-risk task | Before state, output or diff, focused check, unverified list |
| L2 — Direct | Turn a vague wish into an executable collaboration contract | Goal, inputs, constraints, authority, acceptance, stop conditions |
| L3 — Orchestrate | Run a multi-step workflow with checkpoints and recovery | Execution trace, intermediate decisions, failure branch, delivery evidence |
| L4 — Extend | Select or build reusable tools, Skills, templates, or adapters | Capability contract, comparison run, dependencies, rollback |
| L5 — Evaluate | Design bounded agentic behavior and test it across cases | Fixed task set, scored runs, error analysis, stopping evidence |
| L6 — Govern | Maintain a team capability system | Ownership, source policy, permissions, release evidence, update record |

The ladder measures demonstrated capability, not how many pages a reader has
opened. Advanced readers may challenge an earlier gate immediately; beginners
receive a guided path and vocabulary on demand.

### Dimension 2: platform tracks

Platform tracks explain only the delta between the universal method and a
specific product. Every platform page must use the same adapter contract:

| Adapter field | Required question |
|---|---|
| `surface` | Where does the reader perform the task: chat, desktop, CLI, IDE, web, API, or another surface? |
| `context_injection` | How are files, project rules, conversation state, retrieval, and user artifacts made available? |
| `actions` | What can the platform actually observe or change? |
| `authority` | What permission, confirmation, sandbox, account, or billing boundary applies? |
| `persistence` | What survives a turn, session, task, or project? |
| `control_loop` | What planning, tool use, feedback, retries, or delegation can the reader observe? |
| `verification_surface` | Which diffs, logs, citations, previews, tests, traces, or external state can be inspected? |
| `failure_modes` | What platform-specific misunderstandings or unsafe defaults recur? |
| `volatile_facts` | Which claims need official sources, access dates, scope, owner, and next review? |
| `transfer_lab` | Can the same task be run and compared without pretending the platforms are equivalent? |

Recommended initial status:

| Track | Intended depth | Honest status at migration start |
|---|---|---|
| Codex | Full reference track: interfaces, files, terminal, browser, Git, Skills, Agents, verification, team use | Candidate corpus; runtime evidence gaps remain |
| Model-agnostic chat | Foundational communication and review behaviors requiring no external action | New candidate core derived from reviewed material |
| Other named platforms | Small adapter pages only after official-source and runtime records exist | Planned, not implied by a broader name |
| APIs and custom agents | Advanced adapter family tied to evaluation and operations | Planned; separate from end-user product claims |

This preserves a reason to choose the project over broad AI primers: Codex is
the reference implementation in which the whole method can be observed against
real files and workflows.

### Dimension 3: task and domain routes

Task routes answer “I need to do something now.” They are generated playlists,
not new books.

| Route | First useful outcome | Advanced extension | Evidence that matters |
|---|---|---|---|
| Ask and decide | Turn a vague question into a decision-ready answer | Assumption testing and multi-source disagreement | Stated criteria, sources, uncertainties, decision record |
| Research | Produce a bounded source-backed brief | Reproducible collection and claim audits | Source quality, citation fit, dates, missing evidence |
| Software work | Make one reversible project change | Repository-scale planning, tests, release, migration | Diff, commands, test scope, runtime state, rollback |
| Writing and documentation | Revise one real document for an audience | Structured documentation systems and editorial QA | Source text, change rationale, factual checks, reviewer evidence |
| Design and visual work | Produce and inspect one purposeful artifact | Design systems, responsive behavior, accessibility | Rendered views, viewport, asset provenance, human review |
| Data and analysis | Answer one question from a fixed input | Repeatable pipelines and sensitivity analysis | Input lineage, transformations, formulas/code, result checks |
| Operations and automation | Automate one bounded repetitive step | Scheduled and agentic workflows with observability | Permissions, dry run, logs, idempotence, recovery |
| Team adoption | Share one reusable working agreement | Evaluation, governance, maintenance, release decisions | Ownership, review, audit trail, incident and update process |

Every route should expose a risk filter before a platform filter. A beginner
with a production credential needs a safer route, not merely simpler prose.

## Common core curriculum

The common core should be the only owner of durable cross-platform principles.
It should be compact enough to complete, but deep enough to revisit.

### Core 0 — Know what happened

- Distinguish generation, retrieval, tool action, external effect, and
  verification.
- Learn the vocabulary only after observing a concrete interaction.
- Reject access, execution, freshness, and correctness claims unsupported by
  visible evidence.

### Core 1 — Define the result

- Convert “help me with this” into a result, audience, scope, and definition of
  done.
- Separate a desired outcome from a requested method.
- Name missing decisions rather than allowing the model to silently invent
  them.

### Core 2 — Give useful context

- Select the smallest sufficient context by relevance, trust, sensitivity, and
  freshness.
- Explain examples, counterexamples, source hierarchy, and project rules.
- Diagnose both context starvation and context overload.

### Core 3 — Design the collaboration contract

- Use a flexible protocol: outcome, background, inputs, constraints, allowed
  actions, acceptance, stop conditions, recovery, and delivery.
- Teach dialogue patterns rather than incantations: restate, inspect, propose,
  execute, critique, reconcile, and hand off.
- Match interaction length to uncertainty and risk.

### Core 4 — Control action and side effects

- Distinguish advice from execution and read-only inspection from mutation.
- Apply least authority, confirmation boundaries, reversibility, and explicit
  external side effects.
- Treat files, webpages, tool results, and user artifacts as data rather than
  automatically trusted instructions.

### Core 5 — Verify the result

- Decompose completion into factual, functional, visual, safety, completeness,
  and user-acceptance claims.
- Match each claim to evidence of the same scope.
- Understand why fluent prose, a green narrow test, HTTP 200, or a screenshot
  cannot prove broader completion.

### Core 6 — Recover and improve

- Preserve the symptom and first failed attempt.
- Distinguish missing input, wrong assumption, capability mismatch, execution
  failure, and verification failure.
- Retry with changed evidence or changed constraints, not blind repetition.

### Core 7 — Make the method reusable

- Turn a successful interaction into a checklist, template, Skill, evaluation,
  or team rule only after identifying its valid scope.
- Compare across tasks and platforms with fixed inputs and explicit rubrics.
- Assign owners and review dates to volatile or operational knowledge.

## Progressive disclosure for beginners and experts

Each substantial unit should serve both audiences without forcing either to
read the wrong amount. Use four layers in this order:

1. **Do now:** a two-to-five-minute action with a concrete output and a safe
   boundary.
2. **Understand:** the minimum concept and one visual that explains a decision.
3. **Work reliably:** a realistic workflow, failure branch, checks, and handoff.
4. **Go deeper:** mechanism, trade-offs, evaluation, transfer, sources, and
   organizational implications.

Beginner aids must not remove important constraints. Expert depth must not be
synonymous with more terminology. Both paths converge on the same acceptance
gate.

Reader entry presets can be offered without creating separate copies:

| Preset | Starts with | Skips only when challenged |
|---|---|---|
| First useful result | Core 0-3 + one low-risk task | No prerequisites assumed |
| Make my results reliable | Diagnostic challenge, then Core 3-6 | Concepts already demonstrated |
| Build an AI work system | Core 4-7 + Codex deep track | Basic interaction mechanics |
| Review or lead a team | Evidence challenge + L5-L6 | Low-risk personal tutorials |

## Content-unit contract

Every chapter, lab, field case, platform adapter, and task recipe should share a
machine-readable identity while retaining family-specific fields.

```yaml
content_id: stable-and-platform-neutral-where-possible
family: concept | chapter | lab | field_case | platform_adapter | task_route | reference
locale: EN
status: draft | candidate | verified | production-ready
audiences: [beginner, practitioner, advanced, leader]
capability_levels: [L2, L3]
core_concepts: [context-selection, collaboration-contract]
platforms: [universal, codex]
domains: [research]
risk: low | medium | high
prerequisites: []
timebox: 20m
outcome: one observable learner result
inputs: []
allowed_actions: []
external_side_effects: []
artifact: one inspectable learner artifact
acceptance: []
failure_case: one intentional or observed boundary
recovery: []
transfer: one materially different task or platform
evidence_types: [explain, operate, judge, review]
sources: []
reviewed_at: YYYY-MM-DD
next_review: YYYY-MM-DD
owner: curriculum-maintainer
```

Family requirements extend the base contract:

- A **chapter** owns one capability change, not a product tour.
- A **lab** has fixed inputs, a safe environment, expected observations,
  cleanup, and run evidence.
- A **field case** separates user report, official boundary, project inference,
  local reproduction, and unresolved facts.
- A **platform adapter** contains only platform deltas and volatile facts.
- A **task route** references canonical units and states why each is in the
  sequence.
- A **reference** optimizes lookup and cannot substitute for a learning unit.

## Gold-content admission rubric

Growth should be measured by validated capability coverage and reusable field
evidence, not word count, chapter count, or platform count.

### Hard rejection gates

Reject or quarantine a proposed unit when any of the following is true:

- It restates existing advice without a new decision, failure, artifact, or
  transfer.
- It presents a “perfect prompt” without explaining required inputs,
  uncertainty, or verification.
- It invents a success story, metric, customer, runtime, or screenshot context.
- Its sources, asset permissions, or copied wording are unclear.
- A volatile platform claim lacks an authoritative URL, access date, scope,
  owner, and next review.
- It adds a platform name but no platform-specific difference.
- Its acceptance criterion is subjective polish alone.
- It cannot state what a passing example still fails to prove.

### Weighted admission score

Score each dimension from 0 to 4. Admit to the main curriculum only at **24/32
or higher**, with no zero and all hard gates passed. Items below the threshold
may remain research notes or drafts; they do not expand public completeness
claims.

| Dimension | Weight question |
|---|---|
| Real demand | Is the problem observed in a credible field source, learner study, support pattern, or repeated project practice? |
| Consequential decision | Does the unit help the reader make a choice that changes quality, safety, cost, or speed? |
| Novel increment | Does it add a capability, failure class, comparison, or transfer not already owned elsewhere? |
| Actionability | Can the reader produce a bounded artifact rather than merely agree with advice? |
| Evidence strength | Are the claims supported at the scope asserted, with evidence limits visible? |
| Failure value | Does a realistic failure or boundary teach diagnosis and recovery? |
| Transfer value | Can the method move to another task or platform, with the invariant and delta named? |
| Maintenance fitness | Is ownership clear, duplication low, and volatile content isolated? |

### Density tests before expansion

Before adding a new unit, the author must answer:

1. Which exact reader failure does this prevent?
2. What can the reader do afterward that the existing corpus does not prove?
3. What observable artifact demonstrates that change?
4. Which existing unit should be linked, shortened, merged, or superseded?
5. What evidence would cause this advice to be changed or removed?

This makes “larger” mean more high-value coverage, not more pages.

## Progression and evidence model

Keep the existing four evidence families and add explicit transfer and
retention decisions:

| Gate | Question | Example evidence |
|---|---|---|
| Explain | Can the learner state the mechanism and boundary in their own words? | Contrast card, annotated trace, short oral or written explanation |
| Operate | Can the learner complete the task in the declared environment? | Diff, artifact, run log, screenshot with provenance |
| Judge | Can the learner choose between plausible options? | Decision record with criteria and trade-offs |
| Review | Can the learner detect unsupported, unsafe, stale, or incomplete work? | Claim-to-evidence audit and corrected completion statement |
| Transfer | Can the learner apply the invariant to a materially different task or platform? | Second run plus a named invariant/delta comparison |
| Retain | Can the learner repeat the capability later without copying the worked answer? | Delayed challenge or fresh-context rerun |

Progress states should remain distinct:

```text
introduced -> practiced -> demonstrated -> transferred -> retained
```

These are learner states, not document maturity states. A `verified` document
does not prove a learner has demonstrated a capability; a completed lab file
does not prove the lab was run. The learning-path contract should eventually
map both dimensions without merging their vocabularies.

For cross-platform comparisons, hold the task, inputs, acceptance criteria, and
review rubric constant. Record platform configuration and actual actions. Do
not rank platforms from one anecdotal output.

## Proposed information architecture

This is a target model, not a command to move files immediately:

```text
book/
  core/                 # universal capability spine
  platforms/
    codex/              # deepest maintained implementation track
    <future-adapter>/   # only after admission and evidence gates
  routes/               # generated reader playlists by intent/task
  labs/                 # reusable practice, tagged by core/platform/domain
  cases/                # field evidence, outside formal chapter sequence
  reference/            # glossary and lookup material
docs/
  governance/           # identities, paths, status, facts, ownership
  research/             # dated official and field research
  strategy/             # proposals such as this one
evals/                  # capability and adapter evaluations
site/                   # projections of the same contracts
```

The public home page should offer four honest doors:

- **Get one useful result** — beginner, low-risk, common-core quick start.
- **Improve how I work with AI** — communication, context, verification, and
  recovery.
- **Use a specific platform** — Codex first; other adapters only when real.
- **Solve a real task** — domain routes with risk and evidence labels.

Advanced navigation remains visible through **Build systems** and **Lead a
team**, but should not compete with the first action on the opening screen.

## Naming options and decision criteria

No name is selected by this proposal. A rename has repository, URL, brand,
scope-claim, translation, and compatibility consequences and therefore needs a
separate owner decision and ADR.

| Naming direction | Example working option | Strength | Main risk |
|---|---|---|---|
| Outcome-led | **AI for Real Work** | Broad, clear outcome, accessible to beginners | “AI” is very broad and may imply modalities or products not covered |
| Method-led | **The LLM Practice System** | Signals rigor and reusable practice | Technical acronym creates an entry barrier and sounds institutional |
| Collaboration-led | **Working Well with AI** | Human, communication-focused, platform-neutral | May understate tools, agents, evaluation, and engineering depth |
| Evidence-led | **Verified AI Workflows** | Differentiates on reliability and professional use | Can overpromise verification before labs and evaluations run |
| Branded umbrella | **Prysai: From First Prompt to Real Work** | Ownable umbrella and continuity with the current subtitle | “Prompt” may narrow the method to prompting; brand recognition must be built |
| Preserve current | **Codex: From First Task to Real Work** with a universal-core subtitle | Retains identity, links, and clear deepest track | Broader market may still assume Codex-only content |

Any final candidate must be tested against these criteria:

1. A stranger can tell it is a learning and practice system, not an AI product,
   SDK, prompt dump, or official vendor documentation.
2. It welcomes beginners without implying that expert material is absent.
3. It supports platform expansion without falsely implying equal coverage.
4. It can coexist with “Codex” as the flagship/deep reference track.
5. It does not depend on a model version, interface, pricing plan, or other
   volatile fact.
6. The repository slug, target organization, major search results, domains,
   packages, social names, and relevant trademark risks receive a fresh check.
7. English and Chinese readers can understand and translate the promise without
   a misleading scope shift.
8. Existing citations, redirects, badges, clone URLs, Skills, and source links
   have a documented compatibility plan.
9. The name remains honest while the project is still `candidate` and the
   non-Codex adapters are merely planned.

The decision should use short comprehension tests with both novice and advanced
readers, not maintainer preference alone.

## Migration phases

### Phase 0 — Measure and decide

- Freeze no files and rename nothing.
- Inventory every chapter by universal principle, Codex-specific delta, domain,
  level, duplicate concept, volatile fact, and current evidence.
- Interview or test at least a small novice and advanced reader set using the
  current entry points.
- Decide product scope and name separately; record the result in an ADR.
- Define migration acceptance and rollback before changing public identity.

**Exit evidence:** reviewed inventory, reader entry findings, approved scope
ADR, name decision or explicit deferral, path migration map.

### Phase 1 — Extract the universal spine without moving URLs

- Mark universal and Codex-specific sections in the existing 22 chapters.
- Consolidate repeated principles into canonical core units.
- Add core concept IDs and adapter references to governance data.
- Preserve all current content IDs, filenames, routes, and chapter numbers.
- Run structural, content, localization, link, and learning-contract checks.

**Exit evidence:** no duplicate owner for a core concept; old routes render;
content claims are no stronger; negative fixtures catch missing mappings.

### Phase 2 — Reproject Codex as the flagship platform track

- Move or logically project Codex-only material behind the adapter contract.
- Keep Codex labs and field cases connected to the relevant universal core.
- Make Codex the first complete transfer path rather than an incidental example.
- Record which existing chapters are preserved, split, merged, or superseded.

**Exit evidence:** every Codex-specific claim has an owner/source; the complete
current Codex route still works; the universal route contains no hidden Codex
prerequisite.

### Phase 3 — Add task routes and dual-depth reading

- Generate beginner, practitioner, advanced, and leader presets from canonical
  metadata.
- Add task routes for research and software first because the repository has
  the strongest existing material there.
- Add “do now / understand / work reliably / go deeper” navigation within
  selected units; do not rewrite the whole corpus before testing the pattern.
- Run reader tests and record where readers stop, skip, or misinterpret status.

**Exit evidence:** each route terminates in an artifact and evidence gate;
reader tests show both novice and advanced readers can choose a suitable entry.

### Phase 4 — Admit one non-Codex adapter experimentally

- Select a platform only from demonstrated learner demand and maintainable
  official sources.
- Run one fixed low-risk task through the universal core, Codex, and the new
  adapter.
- Apply the gold-content rubric and adapter contract.
- Publish it as `candidate`; do not advertise a multi-platform guide from a
  skeleton page.

**Exit evidence:** source record, real run log, failure case, comparison rubric,
review owner, update date, and explicit unsupported claims.

### Phase 5 — Change identity only after the content makes it true

- If approved, update display name, descriptions, header asset, metadata, and
  localized facades in one bounded release.
- Rename the repository only with redirects and clone guidance confirmed.
- Preserve a tagged pre-migration release and tested rollback instructions.
- Verify generated artifact, exact commit, GitHub Actions evidence, and hosted
  routes separately.

**Exit evidence:** redirect matrix, exact-SHA release packet, restored-link test,
hosted verification, rollback rehearsal, no stronger maturity claim.

## URL and file compatibility strategy

The migration should prefer **logical projection before physical movement**.
Metadata can expose a universal core and Codex track while the stable files
remain in place. Move files only when the resulting maintenance benefit exceeds
the permanent link cost.

Required compatibility rules:

1. Keep existing `content_id` values stable unless two identities are proven to
   represent different learning contracts.
2. Maintain `docs/governance/content-redirects.yaml` (proposed) for every moved
   reader route: old route, new route, reason, introduced release, owner, and
   removal policy.
3. Generate redirect pages for the public site and compatibility stubs for
   high-value Markdown links when GitHub cannot redirect file paths.
4. Never reuse an old URL for a different concept.
5. Keep locale suffix rules and root `README.md` facade behavior intact until a
   locale ADR explicitly migrates them.
6. Preserve current Skill directory and invocation names independently of the
   marketing name unless a separate compatibility migration is approved.
7. Check relative links, generated HTML routes and anchors, source/edit links,
   images, search records, navigation, and external inbound links represented
   in repository records.
8. Keep Git history; use explicit supersession metadata instead of deleting the
   old teaching record without a trace.
9. Publish a migration guide mapping old chapter numbers to new core, platform,
   and route locations.
10. Treat a repository rename as a release operation with exact-SHA evidence,
    not an editorial search-and-replace.

Compatibility must be tested with a fixture containing representative old root,
chapter, lab, locale, asset, anchor, and Skill links. A link checker over only
new files is insufficient evidence.

## Principal risks and mitigations

| Risk | Consequence | Mitigation |
|---|---|---|
| Universal content becomes generic | The project loses its differentiated expertise | Require a consequential decision, artifact, failure, evidence, and transfer for every unit |
| Codex depth is diluted | Existing readers receive less value after expansion | Keep Codex as the flagship full track and test route parity before migration |
| Platform parity is implied too early | Marketing outruns actual coverage | Display adapter status and depth; admit platforms only through the shared contract |
| Beginner simplification removes safety | Easy tutorials encourage dangerous actions | Route by risk first; preserve authority, stop, and recovery boundaries in quick starts |
| Advanced material becomes jargon density | Experts get terminology instead of mechanisms | Require fixed tasks, trade-offs, error analysis, and evaluation evidence |
| Duplicate teaching drifts | Principles disagree across platform and task pages | One canonical core owner; adapters and routes reference it |
| Scope explosion stalls quality work | New chapters hide the existing `not_run` labs and evaluations | Make runtime closure a parallel release blocker; do not count planned adapters as progress |
| Frequent platform change creates stale content | Instructions become misleading | Isolate volatile facts and enforce owner/source/review metadata |
| Rename breaks trust and links | Existing citations, clones, routes, and Skills fail | Defer rename, preserve IDs, create redirect contract, tag and rehearse rollback |
| Visual expansion produces synthetic-looking decoration | The project appears AI-produced and evidence-poor | Admit only visuals that reduce a specific decision load; use diagrams, real captures, and provenance |
| “Verified” becomes a brand slogan | Name implies a guarantee broader than evidence | Keep maturity vocabulary independent of branding; reject names that overclaim current status |
| Volume becomes the success metric | High-value content is buried by padding | Publish capability coverage, rubric score, run state, and field demand instead of word counts |

## What should not change yet

- Do not rename the repository, display name, or existing chapter files from
  this proposal.
- Do not claim multi-platform coverage from a planned adapter architecture.
- Do not rewrite the current quality ledger to make open runtime defects appear
  smaller relative to new scope.
- Do not replace the L0-L6 IDs before every consumer and redirect is known.
- Do not create parallel beginner and expert copies of the same concepts.
- Do not import another project's prose, code, screenshots, diagrams, prompts,
  or brand expression. Structural lessons remain reference-only unless exact
  licensing and attribution decisions are recorded.

## Decision questions for the owner

The following choices should be explicit before implementation:

1. Is the top-level promise universal LLM collaboration, or Codex education
   with transferable principles?
2. Must the public name broaden immediately, or only after one non-Codex adapter
   passes the admission gate?
3. Which first task route matters most to the intended market: software,
   research, writing, or general professional work?
4. What learner evidence is feasible to collect before the first public
   release?
5. Who owns volatile platform adapters and can remove them when maintenance
   stops?

The recommended sequence is to approve the curriculum shape first, prove it by
extracting a small universal slice and Codex delta, and decide the public name
only after readers can see the distinction in real content.

## Basis and evidence boundary

This proposal builds on the repository's existing charter, book architecture,
learning model, machine-readable learning path, quality register, naming
research, and comparative studies of documentation and tutorial architecture.
Those sources already support intent-based entry points, ordered canonical
navigation, separate chapters/labs/cases/research, content identity, explicit
locale fallback, and evidence-scoped release claims.

Relevant internal records:

- `docs/charter.md`
- `docs/book-architecture.md`
- `docs/learning-model.md`
- `docs/governance/learning-path.yaml`
- `docs/governance/quality-register.yaml`
- `docs/research/comparable-tutorial-architecture-study-2026-08-11.md`
- `docs/research/tutorial-value-and-knowledge-base-benchmark-2026-08-11.md`
- `docs/research/documentation-engineering-release-systems-2026-08-12.md`
- `docs/research/project-naming-refresh-2026-08-09.md`

This document is original architecture analysis. It does not establish market
demand, learner success, platform parity, name availability, legal clearance,
completed migration, or production readiness. Each remains unverified until
the corresponding research, implementation, run, review, and release evidence
exists.
