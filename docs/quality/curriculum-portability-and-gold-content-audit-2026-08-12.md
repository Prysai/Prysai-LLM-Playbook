# Curriculum portability and gold-content audit

**Audit date:** 2026-08-12  
**Scope:** 22 canonical English chapters, 17 canonical English labs, seven
project Skills, the L0-L6 learning-path contract, and the content matrix  
**Requested direction:** a practical, cross-model and cross-platform guide to
working with large language models, with a deep Codex implementation track  
**Audit status:** static curriculum audit; no learner study or model run was
performed

## Executive judgment

The repository has the beginnings of a defensible cross-platform method, but
it is not yet that product. Its strongest material is not the Codex catalogue.
It is the recurring operational discipline around task definition, context,
authority, side effects, evidence, recovery, and handoff. Those mechanisms are
portable to ChatGPT, Claude, Gemini, Copilot, local models, coding agents, and
future platforms. Codex should become the best-developed adapter and field
track, not the name of every universal concept.

The current corpus is large enough to look complete and too immature to make
that impression safe. The 22 chapters contain about 71,990 whitespace-delimited
words and the 17 labs about 16,361. All chapters are recorded as `candidate`,
but they range from about 1,842 to 7,358 words, while every lab remains
`draft` / `not_run`. The 39 evaluation fixtures are also `not_run` and have only
static structural review. This means the repository has substantial authored
material, but no evidence yet that a beginner can learn the method, that an
expert gains a measurable advantage, or that the exercises work as written.

The severe conclusion is:

1. **The portable core is valuable but buried.** Chapters 3, 4, 8-10, 12, 13,
   15, 19, 21, and 22 contain the strongest reusable method.
2. **The Codex identity is over-applied.** Chapters 1, 5-7, 11, 14, and 20 mix
   product-specific nouns with principles that should have a neutral home.
3. **The beginner route is cognitively expensive.** It asks a newcomer to
   absorb governance vocabulary before repeatedly experiencing a simple
   prompt-context-output-check loop.
4. **The advanced route is concept-heavy and field-light.** It describes
   rigorous records, but offers too few completed, reviewer-owned case packets
   demonstrating cost, disagreement, regressions, incidents, partial side
   effects, and cross-platform differences.
5. **Repetition is being used as reinforcement without enough changed
   decisions.** Scope, evidence, permissions, rollback, and status recur in
   many chapters. Repetition becomes padding when the later occurrence does
   not add a new artifact, adversarial condition, or decision threshold.
6. **Prompt advice is safer than typical prompt folklore, but still too
   template-centric.** The guide correctly rejects magic wording, yet the task
   protocol can still read like a universal form. It needs controlled ablation:
   which fields change outcomes for which task class, and when the form costs
   more than it saves.
7. **The current maturity labels describe files, not learning.** `candidate`
   is defensible only as authored-content maturity. It must never be read as
   evidence of learner effectiveness, cross-model portability, or runtime
   reliability.

The appropriate product move is therefore **not a global search-and-replace
from Codex to LLM**. That would erase useful implementation detail and create
generic AI prose. Build a stable universal core, then maintain explicit
platform adapters and evidence-bearing field tracks. Codex should remain the
reference implementation because this repository already has the deepest
source work and operational examples for it.

## Audit method and evidence boundary

Each unit was judged on five questions:

- **Portability:** does the mechanism survive a change of model, provider, UI,
  or tool host?
- **Audience:** is the current treatment genuinely useful to a beginner, an
  experienced practitioner, or both?
- **Practical outcome:** what inspectable artifact or changed behavior should
  the learner produce?
- **Distinctive value:** does the unit add a decision or field mechanism, or
  repeat familiar governance language?
- **Evidence maturity:** is there a completed run, failure branch, transfer
  run, and independent review, or only authored/static structure?

Classification vocabulary used below:

- **Universal core (U):** keep the stable mechanism platform-neutral.
- **Codex track (C):** preserve implementation detail under a Codex adapter or
  field track with dated first-party sources.
- **Platform adapter candidate (A):** define a neutral contract and provide
  provider/surface-specific implementations beneath it.
- **Merge candidate (M):** retain the useful mechanism, but consolidate
  repeated prose or move it into a shared record.
- **Gap (G):** a required gold-content unit is absent or materially
  underpowered.

This is a static audit. File presence, word count, schema validation, and prose
inspection do not prove runtime behavior or learning effectiveness. External
repositories and tutorials may inform later research, but no external wording,
images, code, or Skill instructions should enter the curriculum without a
recorded source and license decision in the asset register.

## Product architecture recommended

The current one-dimensional book should become a layered curriculum with
separate stable and volatile contracts:

```text
Practical LLM Collaboration Guide
|
+-- Start here
|   +-- 30-minute first result
|   +-- first failure and correction
|   +-- choose a task path
|
+-- Universal core
|   +-- task and acceptance
|   +-- context and trust
|   +-- conversation and iteration
|   +-- tool/side-effect boundaries
|   +-- verification and recovery
|   +-- evaluation and handoff
|
+-- Platform adapters
|   +-- Codex (reference implementation; deepest track)
|   +-- ChatGPT / general chat surface
|   +-- Claude / coding-agent surface
|   +-- Gemini / workspace surface
|   +-- local or API-hosted model
|
+-- Field tracks
|   +-- engineering
|   +-- research
|   +-- writing and content
|   +-- product and marketing
|   +-- data and documents
|
+-- Advanced systems
    +-- model/workflow evaluation
    +-- reusable methods and Skills
    +-- team governance
    +-- incidents, regression, and retirement
```

The universal layer must not make product claims. An adapter must declare its
provider, surface, account/workspace scope, tool and permission model, source
URLs, access date, owner, and next review. A field case must declare its fixed
input, environment, raw evidence, failure state, recovery, license boundary,
and what the case does not prove.

### Two reader contracts, not one compromise reader

The beginner and expert should share concepts but not be forced through the
same density.

| Reader | Required experience | Appropriate output | What to avoid |
|---|---|---|---|
| Beginner | get one visible result, compare weak and improved requests, correct one failure, learn when to stop | a one-page task card, output, check, and reflection | seven-level governance language before a first success; long provider taxonomy; Skill authoring |
| Practitioner | run a complete task across one chosen platform, preserve context and evidence, recover from a real failure | run packet with baseline, actions, diff/output, checks, unknowns, and handoff | generic prompt lists without task-class boundaries |
| Advanced / team lead | compare workflows, manage permissions and partial effects, calibrate reviewers, detect regressions, migrate methods | evaluation pack, incident record, capability package, rollback or retirement decision | treating a static template or validator as behavioral proof |

## Chapter-by-chapter disposition

Evidence maturity below is deliberately strict. `C / static` means the source
is registered as candidate and structurally reviewed; it does not mean its
experiment was run or its pedagogy validated.

| Chapter | Classification | Audience fit | Real practical outcome | Severe finding and required disposition | Evidence maturity |
|---|---|---|---|---|---|
| 01 GPT and Codex | U + A + C | beginner, but currently dense | boundary ledger separating model generation, host action, tool result, and verification | Split into a short neutral “model, host, tool, agent” primer and a dated Codex adapter. The sampling/context mechanism is portable; Codex product claims are not. The present 2,801-word entry delays the first useful win. | C / static; Lab 011 not run |
| 02 First safe task | U + C | strongest beginner candidate | one reversible edit plus diff, focused check, and unverified list | Keep as the canonical first action, but provide equivalent chat-only and file-tool variants. Much of the permission detail belongs in the later boundary chapter. A beginner needs a successful loop before a full safety taxonomy. | C / static; Lab 001 not run |
| 03 Task protocol | U | beginner-practitioner | executable task contract with goal, inputs, constraints, acceptance, stop, and delivery | This is central gold content. Prove which fields matter through request ablation rather than presenting the full form as universally optimal. Merge its repeated permission/evidence explanations into referenced core records. | C / static; Lab 002 not run |
| 04 Context, permissions, and Agent | U + A + M | practitioner; too abstract for first-time users | context-admission table and least-authority card | Split context engineering from host permission models. Trust/freshness/minimization are universal; sandbox, approval, and persistence semantics are adapters. Merge repeated authorization distinctions with Chapter 13. | C / static; no dedicated run |
| 05 Choose the Codex surface | C + A | Codex practitioner | surface decision with rejected choices and access probes | Preserve as Codex reference documentation, not universal core. Generalize only the adapter contract: state locality, persistence, tools, identity, network, secrets, recovery, and evidence. Add real account/surface comparison records; prose cannot establish current availability. | C / static; chapter experiment not independently registered/run |
| 06 Model selection | U + A | practitioner-advanced | frozen three-task comparison and bounded model decision | Strong premise, underpowered evidence. Separate model capability from provider/surface availability. Add cost, latency, context, repetitions, variance, and quality floor. One smoke comparison cannot support a global “best model” claim. | C / static; comparison not run; related claim disputed |
| 07 Skills, Plugins, and tools | U + A + M | practitioner | smallest-capability decision and staged capability proof | The method/connection/execution/distribution distinction is portable. Product nouns and discovery mechanics need adapters. Merge adoption-state repetition with Chapter 14; keep this chapter about composition, not a second audit chapter. | C / static; Lab 004 not run |
| 08 Full lifecycle workflow | U + M | practitioner | end-to-end run packet from baseline to handoff | Central but repetitive. It should be the canonical lifecycle spine and consume shared task, action, evidence, and recovery records. Chapters 9, 10, 13, and 16 should add specialist decisions rather than restate the lifecycle. | C / static; Lab 013 not run |
| 09 Verification and recovery | U | beginner-practitioner | claim-to-evidence table and first-broken-boundary diagnosis | Keep as gold core. Add a compact symptom-to-first-check decision tree and actual failed-run packets. The chapter correctly resists overclaiming but repeats status vocabulary more than it demonstrates adjudication. | C / static; Labs 003/015 not run |
| 10 Planning and slicing | U + M | practitioner-advanced | evidence-bearing vertical slice and interruption-safe checkpoint | Keep planning mechanisms; merge generic scope, authority, and handoff fields with the shared task record. Add comparative evidence showing when planning overhead is justified and when a cheap probe should replace a plan. | C / static; no independently run chapter experiment |
| 11 Designing a Skill | U + C + A | advanced; not beginner core | bounded reusable method plus four-case behavior suite | At 7,358 words this dominates the curriculum before its own behavior is proven. Generalize to “package a reusable agent method”; keep Codex Skill format in the adapter. Remove the synthetic real-estate case unless it demonstrates a unique failure; its visual style has already failed the user’s authenticity test. | C / static; Lab 005 not run; Skill runtime coverage incomplete |
| 12 Agent loop and stop | U + M | advanced | state ledger, event timeline, retry budget, stop decision, handoff | Valuable but bloated at 7,208 words. Consolidate common state and recovery primitives with Chapters 8-10. Keep unique content: reconciliation, idempotency, unknown state, and incident handoff. Do not imply access to hidden chain-of-thought. | C / static; Lab 006 not run |
| 13 Action boundaries | U + A + M | practitioner | side-effect ledger and exact-target action card | Keep the action-class model universally; move GitHub/browser/terminal mechanics to adapters. Merge the authentication/capability/authorization/confirmation distinction with Chapter 4. Add partial-side-effect and duplicate-submission evidence, not more warning prose. | C / static; Labs 007/016 not run |
| 14 Discover and audit Skills | U + A + M | advanced | staged adoption audit with source, license, dependency, behavior, and rollback records | Valuable as supply-chain/adoption content, but overlaps Chapters 7 and 11. Reframe around external agent packages generally; use format-specific adapters. A repository URL and license signal are not behavior evidence. | C / static; Lab 017 not run |
| 15 Research track | U | practitioner-advanced | research brief, claim/source table, conflict log, and scoped conclusion | One of the strongest field tracks. Add a completed cross-model research case and a citation-forensics case. Current breadth risks becoming a checklist; demonstrate trade-offs under inaccessible and conflicting sources. | C / static; Lab 008 not run |
| 16 Engineering track | U + A + G | practitioner | comparable direct-vs-lifecycle runs with runtime and regression evidence | Only 1,842 words and too shallow for an engineering flagship. It repeats lifecycle doctrine but omits dependency diagnosis, code review disagreement, integration, CI, deployment boundaries, rollback rehearsal, and maintenance cost. Expand via real case packets, not generic advice. | C / static; Lab 009 not run |
| 17 Marketing track | U + G | practitioner | versioned product context and decision-linked experiment | Too thin to justify a full “track.” Product context is useful, but marketing requires audience evidence, claim substantiation, channel constraints, measurement design, attribution uncertainty, and publication review. Either deepen with real artifacts or merge into a product-context field unit. | C / static; Lab 010 not run; synthetic case only |
| 18 Content, design, data, automation | M + G | unclear; four audiences compressed together | deliverable-specific acceptance and reversible automation record | This is a bucket, not a coherent track. Split into at least writing/content, visual/document, and data/automation field units. Current advice is generic and supplies no credible document, spreadsheet, presentation, dataset, or automation case packet. | C / static; no dedicated lab or run |
| 19 Evaluate models and workflows | U | advanced | frozen task set, comparable runs, rubric, decision, and limits | Essential gold core. Add repetitions, blind scoring, calibration examples, disagreement/adjudication, statistical caution, budget, and regression use. Do not infer cross-model portability from the currently unrun fixtures. | C / static; 39 fixtures not run |
| 20 Personal Codex work system | U + C + M | practitioner | smallest personal work package and maintenance trigger | Rename to personal AI work system in core; keep Codex configuration examples in the adapter. It repeats task/Skill/evidence assets without demonstrating actual longitudinal benefit. Merge its manifest with Chapters 21-22. | C / static; no longitudinal run |
| 21 Team capability system | U + M | advanced/team lead | versioned team capability package with owner, permissions, review, and rollback | Keep the team decision layer, but consume one shared capability manifest. Add independent reproduction, reviewer disagreement, incident ownership, adoption telemetry, and retirement evidence. “Team-readable” is not “team-adopted.” | C / static; Lab 012 not run |
| 22 Continuous update | U + A + M | advanced/maintainer | impact record and retain/update/block/retire decision | Keep the maintenance mechanism; merge manifest fields with Chapters 20-21. Add one real volatile platform change and a before/after regression packet. A hypothetical change cannot prove future-proofing. | C / static; no regression run |

### Chapter consolidation decisions

The following are not requests to delete useful content. They are requests to
stop making readers re-learn the same record under different chapter names.

| Repeated cluster | Canonical home | Later chapters must add |
|---|---|---|
| goal, scope, inputs, non-goals, acceptance, stop | Chapter 3 task contract | a domain-specific field or changed decision threshold |
| baseline, stages, checkpoints, rollback, handoff | Chapter 8 lifecycle record | planning comparison (10), runtime/dependency release evidence (16), team ownership (21) |
| claim, evidence, status, unknown, next check | Chapter 9 evidence ledger | reviewer calibration (19), incident impact (12/21), regression delta (22) |
| authentication, capability, authorization, confirmation | Chapter 4 neutral authority model | concrete host adapters and action-specific examples in 5/13 |
| method package, trigger, dependency, license, test | Chapter 11 reusable-method contract | external adoption and supply-chain decision in 14; composition decision in 7 |
| version, owner, review, impact, rollback | one capability manifest used by 20-22 | personal use history, team approval, and change/retirement decision respectively |

## Lab-by-lab disposition

All 17 labs are `draft` and `not_run`; that fact dominates every individual
quality judgment. Shortness is not itself a defect, but several 568-798 word
labs are specifications for a lab rather than demonstrated learning
experiences. Until a fixed fixture, raw run, intentional failure, recovery, and
independent review exist, none should be described as proven instruction.

| Lab | Classification | Audience fit | Required learner artifact | Severe finding and migration | Evidence maturity |
|---|---|---|---|---|---|
| 001 Safe README task | U + C | beginner | pre-edit observation, one-file diff, focused check, unknowns | Promote as canonical first tool-using lab; add chat-only counterpart and complete golden/failed run packets. README edits are low stakes but overused and not representative of richer work. | draft / not_run |
| 002 Task protocol | U | beginner-practitioner | three request versions plus independent comparison | Strong controlled shape. Add ablation scoring so it tests which fields help rather than rewarding the longest prompt. | draft / not_run |
| 003 Evidence review | U + M | practitioner | claim adjudication table | Useful but only 570 words; merge fixture vocabulary with Lab 015 and make 003 the full audit, while 015 becomes concise delivery from that audit. | draft / not_run |
| 004 Skill selection | U + A | practitioner | capability comparison and exclusion record | Generalize from Skills to methods/tools/connectors, then add adapter-specific discovery. Popularity/license checks alone cannot establish usefulness. | draft / not_run |
| 005 Design a Skill | U + C + A | advanced | method package and four-case fixtures | Split neutral reusable-method design from Codex Skill packaging. Structural validation is insufficient; fresh-context behavior is mandatory. | draft / not_run |
| 006 Agent stop conditions | U | advanced | events, run record, and incident handoff | One of the better specified labs. Run all five branches, include unknown partial effect, and have a second reviewer decide whether retry is allowed. | draft / not_run |
| 007 Action boundaries | U + A | practitioner | staged action and evidence matrix across three targets | Detailed but heavy. Preserve as an adapter comparison; add an actual mistaken-target fixture and prove no write occurs before reconciliation. | draft / not_run |
| 008 Research question | U | practitioner | research brief and evidence table | Too small and checklist-like. Add conflicting and inaccessible sources, a false citation, and a reviewer-owned conclusion downgrade. | draft / not_run |
| 009 Engineering lifecycle | U | practitioner | two comparable runs and rework record | High potential, currently too short. Needs executable fixture, exact environment, regression test, invalid input, raw logs, and blinded comparison. | draft / not_run |
| 010 Product context | U | practitioner/team | versioned context used by two tasks | Good transfer test, but synthetic-only evidence. Add change-impact contradiction and measurable decision change; do not claim marketing effectiveness. | draft / not_run |
| 011 GPT/Codex boundaries | U + C | beginner | boundary ledger and corrected completion claim | Split neutral layers from Codex-specific examples. At 1,760 words it is too demanding as L0; create a 15-minute core and optional mechanism extension. | draft / not_run |
| 012 Team migration | U | advanced/team | capability package independently reproduced or rejected | Only 582 words for a terminal-level lab. It lacks adoption, reviewer disagreement, incident, version upgrade, and rollback rehearsal. Deepen substantially. | draft / not_run |
| 013 Complete vertical slice | U | practitioner | baseline hash, protocol, checkpoint, diff, validation, failure, rollback, handoff | This should be the flagship proof but is only 651 words and not run. Provide a real disposable repository and complete reference packet. | draft / not_run |
| 014 Resume reconciliation | U + A | practitioner-advanced | last-known-good/current-state reconciliation | Strong field mechanism. Run across at least two hosts/surfaces; include wrong branch, changed file, unknown prior external action, and clean stop. | draft / not_run |
| 015 Evidence delivery | U + M | beginner-practitioner | concise evidence-bounded handoff | Keep as a downstream use of Lab 003, not a second evidence taxonomy. Test whether a reader can independently reproduce the claim from the handoff. | draft / not_run |
| 016 Side-effect boundary | U + A | practitioner | side-effect ledger and approved/non-approved endpoint | Add partial success, duplicate retry, compensating action, and non-retryable action. Static classification alone is too easy. | draft / not_run |
| 017 Skill discovery audit | U + C + A | advanced | discovery/loading/behavior/license/adoption stage record | Important and rightly separates states. Needs real fixed-revision candidates and isolated runtime tests; existence and validator success must remain insufficient. | draft / not_run |

### Missing lab portfolio controls

The lab set also needs portfolio-level discipline:

- **Too many paper audits, too few outcomes.** Several labs primarily produce
  cards, tables, or YAML. Those artifacts are useful controls, but a practical
  guide must pair them with visible work products: revised document, working
  program, research answer, evaluated campaign brief, transformed dataset, or
  published-withheld release candidate.
- **README bias.** README changes are safe fixtures, not representative proof
  of engineering, research, document, data, and team work.
- **No learner timings.** A lab index should publish estimated beginner and
  experienced completion time based on observed runs, not author estimates
  disguised as facts.
- **No reference output boundary.** Each lab needs a golden artifact plus at
  least one acceptable alternative; otherwise learners may imitate wording
  rather than satisfy a contract.
- **No transfer evidence.** A transfer prompt exists in many files, but no
  recorded transfer execution proves that the mechanism survives a new domain.
- **No anti-folklore ablation.** At least three labs should hold the task fixed
  while removing or changing one context/protocol element, with blinded
  scoring. This would turn prompt advice into evidence rather than taste.

## Skill portfolio disposition

The seven Skills should not all remain branded as Codex concepts. Their
contracts are mostly portable; their installation format and runtime behavior
are platform-specific. Three of seven have only a basic fresh-context pretest,
and four have static contract review only. Structural validator success proves
package shape, not routing quality, task success, portability, or safety in a
live host.

| Skill | Classification | Portable responsibility | Main defect and disposition | Evidence maturity |
|---|---|---|---|---|
| Codex Coach | U + C + A | route learning goal to explanation, experiment, reflection, and transfer | Rename neutral role to Collaboration Coach; Codex Coach becomes an adapter persona. Current routing depends on the Codex curriculum and lacks runtime pretest. | candidate; static contract review; runtime pending |
| Task Protocol | U | convert a wish into a bounded executable task | Strongest portable Skill. Test against short chat, research, coding, document, and external-action tasks; measure over-specification and clarification quality. | candidate; basic pretest only |
| Evidence Review | U | adjudicate claims against evidence and scope | Strong portable gate. It needs adversarial polished-but-unsupported outputs, cross-domain transfer, and independent reviewer agreement. | candidate; basic pretest only |
| Skill Selector | U + A | choose the smallest useful method/tool package | Generalize public concept to Capability Selector; retain Skill-specific rules in adapters. Test omission errors, unnecessary-tool rejection, and license/permission conflicts. | candidate; basic pretest only |
| Workflow Orchestrator | U | coordinate stages, checkpoints, handoffs, and delivery state | Potentially high value but dangerously broad. Demonstrate finite routing, no recursive ownership, partial-stage recovery, and exact delivery target across hosts. | candidate; static contract review; runtime pending |
| Research Router | U | narrow questions, plan sources, extract claims, record conflicts | Strong cross-platform responsibility. It needs live/frozen-source comparison, citation audit, inaccessible-source behavior, and scope downgrade evidence. | candidate; static contract review; runtime pending |
| Product Context | U | maintain authoritative facts, hypotheses, audience, positioning, and change impact | Useful but currently narrower than its implied authority. It must not replace customer research. Test conflicting owners, stale facts, two-task consumption, and write gates. | candidate; static review blocked; runtime pending |

Recommended packaging:

```text
methods/                     # platform-neutral contracts and fixtures
  task-protocol/
  evidence-review/
  workflow-orchestrator/
  research-router/
  product-context/

adapters/codex/              # Codex Skill packages and dated host behavior
adapters/<platform>/         # only after primary-source and runtime evidence
```

Do not create adapter packages merely to increase platform count. A new
adapter earns a place only when it has a distinct host contract, first-party
sources, a maintainer, fixed fixtures, behavioral runs, and a refresh policy.

## Learning path and matrix audit

### What the L0-L6 contract gets right

- It defines progression through observable capability rather than chapter
  completion alone.
- It separates explain, operate, judge, and review evidence.
- It records blocked conditions and refuses to treat login, file presence, or
  tool names as execution proof.
- Recent `lab_uses` fields explicitly state new capability, artifact, and
  acceptance deltas, which is the right direction for resolving repeated-lab
  ambiguity.

### What must change for the expanded direction

1. **Levels mix complexity, role, and product feature depth.** L0-L3 are a
   reasonable general progression. L4 suddenly centers Skills, L5 mixes Agent
   loop design with evidence review, and L6 becomes team governance. An expert
   writer or researcher may need advanced evaluation without ever designing a
   Skill. These are tracks, not universal levels.
2. **A single prerequisite chain blocks legitimate entry.** The current path
   implies that all readers should traverse Codex surface and Skill material
   before advanced evaluation/team work. Replace this with a small shared core
   and independently gated field/advanced tracks.
3. **Candidate level is not learner evidence.** The path is structurally
   candidate while its labs and evaluations are unrun. Public UI must show
   “curriculum contract candidate” and “learner evidence unavailable” as
   separate states.
4. **The content matrix is stale in shape.** It says 14 mappings while the
   state source has 17 labs, and Labs 014-017 remain outside independent matrix
   rows. A matrix that explains integration cannot leave the newest field
   mechanisms as a footnote.
5. **Matrix rows are topic bundles rather than testable units.** M12 spans four
   chapters and two labs; M13 spans four chapters and three Skills. Such rows
   are useful for editorial provenance but too broad for learning acceptance.
6. **Status vocabulary is applied at the wrong granularity.** A chapter can be
   editorially candidate while its facts are current/disputed and its lab is
   not run. Those statuses must remain visible together, not collapse into a
   green-looking unit.
7. **The Chinese matrix is not a neutral canonical curriculum source.** The
   project correctly treats English as canonical, but architecture and matrix
   governance are predominantly Chinese and show encoding corruption in the
   inspected terminal output. Before a broader international product claim,
   governance sources need an encoding check and an English canonical or
   intentionally bilingual maintenance contract.

### Proposed progression model

Use four universal milestones and elective mastery badges instead of forcing
every reader through seven roles:

| Universal milestone | Proof required |
|---|---|
| Foundation | distinguish model, host, tool, context, action, and evidence; correct one unsupported inference |
| Effective collaborator | improve one fixed task through goal, context, constraints, examples where useful, and acceptance; preserve output and comparison |
| Reliable operator | complete a reversible task, verify scoped claims, diagnose a failure, and stop before an unauthorized side effect |
| Workflow owner | run an evidence-bearing vertical slice, recover or hand off after interruption, and transfer the method to a second task class |

Elective badges should include Model/Workflow Evaluator, Codex Operator,
Engineering Agent Workflow, Research with LLMs, Content and Document Workflow,
Data/Automation Workflow, Reusable Method Builder, and Team Capability Owner.
Each badge needs its own prerequisite and evidence packet; Skill design should
not be a prerequisite for unrelated expert use.

## Padding, repetition, and folklore findings

### Material that risks becoming padding

- Repeated declarations that a build, login, UI label, file, or configuration
  is not proof are valid, but after Chapter 9 later chapters should link to the
  evidence ledger and add a new failure mechanism.
- Chapters 8, 10, 16, 20, 21, and 22 repeatedly enumerate scope, owner,
  version, evidence, rollback, and handoff. A shared manifest would make the
  differences visible instead of rewarding list length.
- Chapters 11 and 12 are each more than 7,000 words while several field tracks
  are under 2,200. This overweights internal agent-system design relative to
  reader outcomes.
- The four-domain Chapter 18 promises breadth without enough domain truth. A
  generic capability table across content, design, data, and automation is not
  “gold” unless each decision is backed by a distinct artifact and failure.
- Synthetic cases are useful for safety, but a synthetic brief plus a polished
  output does not become a real-world result. Label them as fixtures and add
  redacted, licensed, independently reviewed cases where possible.

### Prompt folklore that must be explicitly rejected or tested

The project should make these anti-claims part of the curriculum:

- there is no universal magic prompt, role phrase, politeness style, or
  delimiter that guarantees correctness;
- a longer prompt is not inherently better; irrelevant context can degrade
  performance and increase review cost;
- “think step by step” is not a substitute for observable intermediate
  artifacts, tests, or source evidence, and the guide must not require hidden
  reasoning disclosure;
- model temperature, reasoning effort, or provider labels do not override task
  definition and acceptance;
- examples can anchor format and behavior, but one example can also bias the
  answer or hide alternative valid outputs;
- asking an LLM to critique itself is not independent review;
- confident language, citations, screenshots, and successful tool calls do not
  prove semantic correctness or external state.

Every communication recommendation should be tagged as one of:

1. a stable interaction principle;
2. a task-class hypothesis requiring an experiment;
3. a platform-specific current fact requiring a source and date; or
4. a field observation with limited reproduction status.

## Migration map

### Phase 0: freeze claims before renaming

- Do not rename the repository or replace terms until an ADR defines the new
  product boundary, canonical terms, stable core, adapter contract, URL and
  compatibility policy.
- Preserve all current Codex source records and fact-impact mappings. A broader
  product claim increases maintenance work; it does not make volatile facts
  universal.
- Record the proposed name as a candidate until audience and discoverability
  research exists. Avoid grand claims such as “complete LLM guide” or
  “works with every model.”

### Phase 1: extract the universal spine

| Current source | New universal unit | Codex material retained as |
|---|---|---|
| Chapters 1 and 4 | model-host-tool-agent and context-trust foundations | Codex host/action examples |
| Chapters 2 and 3 | first result and effective task communication | Codex file-edit run |
| Chapters 8-10, 12-13 | reliable workflow, action boundary, evidence, recovery, handoff | Local/Worktree/Cloud and GitHub action cards |
| Chapters 6 and 19 | model/workflow choice and evaluation | Codex model/provider availability adapter |
| Chapters 20-22 | personal/team capability lifecycle | Codex configuration and Skill examples |

### Phase 2: create the Codex reference track

Move Chapters 5, Codex-specific portions of 1, 6, 7, 11, 14, and 20 into a
coherent track:

1. choose a Codex surface;
2. confirm account/workspace/model/tool availability;
3. perform local and worktree tasks;
4. use Skills, plugins/connectors, and external tools;
5. handle permissions, network, secrets, GitHub, and recovery;
6. design and evaluate a Codex Skill;
7. maintain the adapter against official facts.

Each unit must bind to first-party facts and carry a tested environment scope.

### Phase 3: replace thin tracks with field cases

- Keep Research as a full track and add completed evidence packets.
- Deepen Engineering with environment diagnosis, integration, review, CI,
  runtime, deployment, and rollback cases.
- Merge current Marketing into a Product and Marketing collaboration track
  only after audience research, claims, measurement, and review are present.
- Split Chapter 18 into Writing/Content, Visual/Document, and Data/Automation.
  A track exists only when it has at least one complete case and a distinct
  failure mechanism.

### Phase 4: validate portability rather than declaring it

For three fixed task classes—chat-only synthesis, local file/code work, and
tool-mediated external work—run the same neutral contract on at least two
platforms. Record adapter changes, unsupported features, context differences,
permission behavior, output, cost basis, latency, failures, and reviewer
scores. The goal is not to crown a winner. It is to discover which parts are
portable and which belong in adapters.

### Phase 5: rebuild navigation around intent

The public front door should offer:

- “I am new: get one reliable result”;
- “I already use AI: make my requests and checks better”;
- “I use Codex: open the deep Codex track”;
- “I need a field workflow: engineering, research, content, product, data”;
- “I lead a team: evaluation, governance, incidents, updates.”

The chapter number should not be the primary retrieval key. Task, symptom,
artifact, platform, and maturity must all be searchable facets.

## Prioritized missing gold units

These additions are ordered by practical value, not by word-count growth.

### P0: required before broader positioning

1. **Communicate for results: controlled request ablation.** One fixed task,
   five request versions, blinded scoring, and a conclusion about which added
   information helped. This directly answers how simple communication can
   produce more accurate replies without promoting magic prompts.
2. **Canonical beginner run.** A 30-45 minute path from weak request to visible
   output, focused verification, one failure, correction, and honest handoff.
   Provide chat-only and Codex file-task variants.
3. **Complete vertical-slice case packet.** Turn Lab 013 into an executable
   fixture with baseline, protocol, actions, diff/output, logs, intentional
   failure, recovery, transfer, and independent review.
4. **Cross-platform adapter contract and two-platform pilot.** Prove what stays
   stable and what changes; do not launch four empty platform directories.
5. **Failure diagnosis field guide.** Symptom -> first safe check -> forbidden
   inference -> evidence -> continue/ask/recover/stop, linked to real case
   packets.
6. **Lab and evaluation execution baseline.** Run representative L0,
   beginner, workflow-owner, and team/evaluation units before expanding the
   maturity claim. This is already required by quality defects Q-001/Q-002.

### P1: required for expert credibility

7. **Context engineering by task class.** Relevance, trust, freshness,
   compression, examples, conflicts, context loss, and a measured context
   ablation.
8. **Environment and dependency diagnosis.** Wrong root, missing command,
   incompatible runtime, lockfile drift, network restriction, and the rule
   that diagnosis does not authorize reinstalling or replacing an environment.
9. **Cost-latency-quality budget.** Fixed task, repetitions, time and cost
   basis, review cost, escalation rule, and `not_comparable` handling without
   invented provider pricing.
10. **Reviewer calibration and disagreement.** Frozen rubric, pre-scored
    examples, independent scoring, disagreement log, adjudication, and rubric
    version.
11. **Partial side effects and idempotent recovery.** Duplicate submit, unknown
    external state, compensating action, non-retryable action, and read-back.
12. **Data minimization and redaction workflow.** Classification,
    minimization, redaction manifest, residual inference risk, retention, and
    external-submission decision.
13. **Prompt injection and untrusted artifacts.** Treat repository files,
    websites, emails, tool output, and retrieved documents as data; demonstrate
    a contained attack and a safe stop without exposing secrets.
14. **Long-horizon work and context recovery.** Checkpoint, compaction/resume,
    branch/target reconciliation, changed requirements, and second-operator
    handoff.

### P2: breadth that earns its maintenance cost

15. **Real engineering integration case.** Issue/spec, source check, test-first
    or incremental change, review objection, conflict, CI, runtime, and local
    release/rollback boundary.
16. **Research case with source conflict.** Official and community evidence,
    inaccessible source, false citation, dated cutoff, claim downgrade, and
    reviewer audit.
17. **Writing/content case.** Audience and source packet, draft, factual and
    structural edit, unsupported-claim removal, accessibility/readability
    review, and final limitations.
18. **Document/data artifact case.** A spreadsheet, PDF, presentation, or data
    export with semantic checks, rendered checks, loss report, and reproducible
    transformation. Add only one case at first and make it excellent.
19. **Team incident and rollback rehearsal.** Timeline, impact, last known good,
    unknown external state, owner, next probe, rollback decision, and
    post-incident change.
20. **Workflow regression and retirement.** Frozen baseline, one changed
    variable, rerun, failure delta, maintenance cost, and retain/block/retire
    decision.

## Gold-content acceptance standard

No new chapter or case should be added merely because the topic is relevant.
A unit earns inclusion only when it satisfies all of the following:

- addresses a named reader problem that is not already solved by an existing
  unit;
- adds a new decision, observable artifact, adversarial condition, or transfer
  requirement;
- contains a fixed, secret-free input and a realistic environment boundary;
- produces a useful work product, not only a governance form;
- records raw output, exact checks, and one intentional or naturally observed
  failure;
- distinguishes model output, host/tool action, external effect, and semantic
  acceptance;
- includes a recovery, rollback, or clean stop;
- states what the evidence does not prove;
- has an independent review when correctness or quality is human-scored;
- records source and license decisions for every external asset;
- identifies stable principles separately from dated platform facts; and
- has an owner and review trigger.

Content should be cut or merged when it only rephrases “be clear,” “provide
context,” “verify the answer,” or “use the right tool” without an experiment,
counterexample, decision boundary, and inspectable artifact.

## Release and claim implications

The expanded direction increases the burden of proof. The project may now say
that it is **planning a cross-model practical collaboration guide with a deep
Codex track**. It may not yet say that it is cross-platform, proven for
beginners, expert-validated, comprehensive, or production-ready.

Minimum evidence before such claims:

| Claim | Required evidence |
|---|---|
| useful to beginners | observed completion of the starter path by learners with defined prior experience, error and assistance records, artifact review, and revision history |
| useful to experts | expert review plus advanced case packets that change a real decision, expose trade-offs, and survive independent reproduction |
| cross-model / cross-platform | fixed neutral tasks executed through documented adapters on more than one platform, with limitations and non-comparable states preserved |
| practical / field-tested | raw runs, artifacts, failures, recoveries, transfer cases, and independent reviews—not authored scenarios alone |
| comprehensive | an explicit scope model and gap register; never inferred from chapter count or word count |

The current truthful overall status remains `candidate`. The lab portfolio is
`draft` / `not_run`; evaluation behavior is `not_run`; Skill behavior ranges
from basic pretest to static contract review. A larger manuscript must not hide
those facts.

## Recommended immediate sequence

1. Approve or reject the layered product architecture through an ADR; do not
   perform a global rename first.
2. Extract a short universal foundation and retain Codex facts in an adapter.
3. Build and run the communication-ablation unit and canonical beginner run.
4. Turn Labs 009 and 013 into complete executable case packets.
5. Run representative labs and evaluations with independent review, updating
   status only within the evidence scope.
6. Consolidate the repeated task, evidence, action, and capability records.
7. Pilot one second platform using the adapter contract.
8. Deepen Engineering and Research before creating additional shallow tracks.
9. Split Chapter 18 only when each replacement has a distinct artifact and
   failure mechanism.
10. Rename and reposition publicly only after the core/adapter boundary and
    migration routes are implemented and validated.

## Sources consulted inside this repository

- `CONTEXT.md`, `docs/charter.md`, and `docs/book-architecture.md` for product
  terms, stable/volatile boundaries, learning evidence, and chapter contract.
- `docs/governance/content-status.yaml` for current chapter, lab, Skill, and
  evaluation maturity.
- `docs/governance/learning-path.yaml` for L0-L6 ownership, lab-use deltas,
  progression gates, and evaluation mapping.
- `docs/content-matrix.md` for source-to-chapter/lab/Skill integration and its
  current 14-mapping boundary.
- All 22 `book/chapters/*-EN.md` canonical English chapter files.
- All 17 `book/labs/lab-*-EN.md` canonical English lab files.
- All seven `skills/*/SKILL.md` contracts plus `docs/quality/skill-routing-matrix.md`
  and `docs/skill-registry.md`.
- `docs/quality/quality-register.md`, especially Q-001, Q-002, Q-005, and
  Q-009.
- `docs/quality/curriculum-depth-review-2026-08-10.md` and
  `docs/research/english-curriculum-practical-value-and-repetition-audit-2026-08-11.md`
  for previous depth, repetition, and missing-mechanism findings.
- Existing benchmark and field-problem research in `docs/research/` as
  editorial context. Those reports are not learner or cross-platform runtime
  evidence.

## Final decision

**Proceed with the broader market direction, but through a core-and-adapter
migration, not a generic-AI rewrite.** The repository already owns a serious
point of view: effective AI collaboration is a bounded, observable,
evidence-bearing work system. That is the universal product. Codex is the
reference implementation where the project can be concrete and current.

The next unit of progress should not be another chapter. It should be a
completed, independently reviewed learning case that proves a reader can obtain
a better result through a small communication change, verify it, encounter a
failure, recover, and transfer the method. Until that evidence exists, more
volume will make the project look larger without making it more trustworthy.
