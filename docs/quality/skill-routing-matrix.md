# Skill routing matrix

**Version:** `0.8.0`
**Review date:** `2026-09-12`
**Status:** `candidate`

This matrix is the human-readable projection of the routing contract for the
twenty-three project Skills. It defines responsibility and handoff; it does not
grant tool access or replace project rules. The machine-readable source is
[`../governance/skill-routing-contract.yaml`](../governance/skill-routing-contract.yaml),
whose fixtures test declared policy consistency, not trigger accuracy.

This matrix covers the routing contract and the 23 registered Skill files.

## Precedence rules

1. An explicit `$skill-name` request has priority over implicit trigger
   matching. The named Skill must either act within its boundary or explain a
   safety block; another Skill must not silently replace it.
2. Project rules, user constraints, and permission gates outrank every Skill.
3. If no Skill is explicit, choose the narrowest Skill whose primary question
matches the task. Do not load every Skill by default.
4. A Skill may hand off only to a named downstream responsibility in the table.
   Handoffs transfer control; they are not recursive co-ownership.
5. Evidence Review is an audit gate, not a universal preamble. It reviews an
   existing claim or artifact and does not perform the missing work.
6. Workflow Orchestrator is the only lifecycle coordinator. Other Skills may
   provide one stage but must not start a second orchestration loop.
7. Task Protocol defines execution boundaries. It does not choose domain
   methods or authorize external side effects.
8. Product facts must point to a dated source record with an evidence class.
   A source refresh can narrow or update a claim, but it cannot prove current
   account access, runtime behavior, or external side effects.

## Responsibility matrix

| Skill | Primary question | Owns | Must yield to | Must not own |
| `prysai-adversarial-project-review` / Adversarial Project Review | "What is the strongest evidence-based case that this LLM learning product could fail its reader or release decision?" | six-lens project review, merged root risks, ranked repair agenda, evidence boundary, and release-decision effect | Evidence Review for one claim; Field Signal Curator for public problems; Research Router / Source Investigator for missing research; Task Protocol for a repair | speaking for a professor, scientist, company, or employee; invented defects or endorsements; source collection; execution; readiness certification |
| `prysai-platform-observation-record` / Platform Observation Record | "What can I visibly record about one named LLM platform surface without claiming more than I observed?" | one user-authorized, visible, low-risk observation receipt with exact surface, time, observed labels, unknowns, and no capability inference | Platform Fact Watch for freshness maintenance; Platform Adapter Review for curriculum admission; LLM Comparison Protocol for a bounded comparison; Evidence Review for a claim; Task Protocol for any action boundary | browsing beyond the supplied or visible surface, login, installation, billing, model execution, safety certification, product parity, availability claims, or publication |
|---|---|---|---|---|
| `prysai-prompt-card-editor` / Prompt Card Editor | "How do I turn an authorized, project-owned prompt idea into one reusable teaching card?" | one R0, text-only card with a learner job, non-fit boundary, copy-ready request, self-check, recovery route, source boundary, and candidate receipt | Dialogue Brief for one person's new first message; First-Turn Check for inspecting an existing draft; Learning Coach for performance practice; Research Router / Source Investigator for research; Communication Failure Triage for a preserved failure; Task Protocol for tools, files, authority, or effects | generic prompt collection, personal drafting, execution, external-text reuse with unknown permission, publication, model-run claims, or outcome guarantees |
| `prysai-request-escalation` / Request Escalation | "Which smallest lane should this request enter before we draft, look up facts, research, or act?" | a four-route, no-action receipt for text-only drafting, one current fact, multi-source research, or a proposed external change | Dialogue Brief / First-Turn Check for supplied text; Source Investigator for one current fact; Research Router for multi-source research; Task Protocol for an external action; Task Protocol plus Source Investigator for a mixed fact-and-action request | final drafting, source retrieval, research execution, task planning, authorization, action, or a safety/completion guarantee |
| `prysai-dialogue-brief` / Dialogue Brief | “How do I write one clear first message before I have sent it?” | one text-only, low-risk first-turn brief with outcome, safe inputs, acceptance check, and stop boundary | Learning Coach for practice; Codex Coach for Codex learning; Task Protocol for files, tools, authority, or effects; Source Investigator / Research Router for factual research; Communication Failure Triage for a preserved failed reply | teaching, research, execution, tool use, source claims, failure diagnosis, or a generic prompt catalogue |
| `prysai-first-turn-check` / First-Turn Check | “Before I send this draft, which material first-turn boundaries are missing or unclear?” | six-field inspection of an unsent, text-only, low-risk user draft; at most three material add-or-clarify lines | Dialogue Brief for a new message; Task Protocol for files, tools, permissions, or effects; Source Investigator / Research Router for sources; Learning Coach for practice; Communication Failure Triage for an actual failed reply | drafting a replacement request, execution, product or security certification, research, coaching, or a generic prompt catalogue |
| `prysai-codex-coach` / Codex Coach | “How do I learn GPT, Codex, tools, Skills, or Agent workflows?” | Codex-domain learning level, explanation, experiment, reflection, transfer | Learning Coach for non-Codex performance; explicit Skill; Task Protocol; Evidence Review; Research Router; Skill Selector; Workflow Orchestrator; Product Context | general tutoring, execution, installation, source synthesis, product claims |
| `prysai-communication-failure-triage` / Communication Failure Triage | “Why did this preserved request and reply fail, and what is the smallest comparable repair?” | post-failure evidence packet, candidate classification, one-variable prompt repair, comparable rerun contract | Task Protocol for an untried vague task; Evidence Review for a claim audit; Source Investigator for current platform facts | hidden-reasoning claims, fresh task definition, platform diagnosis, permission expansion, generic prompt catalogues |
| `prysai-interruption-checkpoint` / Interruption Checkpoint | “The task stopped. What can I safely preserve before I retry or switch anything?” | the first-minute receipt: goal, visible event, last inspectable artifact, acceptance evidence, `complete`/`partial`/`unknown` state, and one bounded next decision | Task Protocol for any retry or external action; Communication Failure Triage for a preserved failed interaction; Evidence Review for a completion claim; Source Investigator for a current platform fact | automatic retry, provider diagnosis, model/account switch, account inspection, external action, or treating an interruption as completion |
| `prysai-shift-handoff` / Shift Handoff | “Which reusable rules apply to this one new item, and what must not be inherited from an earlier exchange?” | one R0 current-item brief that separates stable criteria, the supplied item, current authority, acceptance evidence, unknowns, and the next owner | Product Context when durable criteria change; Task Protocol for files, tools, accounts, actions, or missing task authority; Interruption Checkpoint for a stopped task; Communication Failure Triage for a preserved failed reply; Source Investigator for a current fact; Evidence Review for a completion claim | execution, product-context changes, recovery, source retrieval, inherited permissions, claims about model memory, or treating a handoff as correct work |
| `prysai-task-protocol` / Task Protocol | “What exactly is the bounded task?” | goal, inputs, constraints, actions, acceptance, failure, delivery | explicit Skill; Workflow Orchestrator after readiness; domain route for unresolved method | execution, evidence audit, method selection |
| `prysai-evidence-review` / Evidence Review | “What does the evidence actually prove?” | claim table, coverage, freshness, status, next check | explicit non-audit Skill; Research Router for new research | repair, execution, invented proof |
| `prysai-skill-selector` / Skill Selector | “Which smallest Skill set fits?” | fit, overlap, dependencies, license, permissions, smoke test, rollback | explicit Skill; Task Protocol for unclear task; Workflow Orchestrator for settled execution | general teaching, task execution, correctness certification |
| `prysai-workflow-orchestrator` / Workflow Orchestrator | “How do dependent stages reach delivery?” | stage graph, checkpoints, recovery, handoffs, delivery status | explicit bounded Skill for a stage; Task Protocol for initial contract | domain method details, permission granting, evidence invention |
| `prysai-research-router` / Research Router | “How should this broad research question be scoped and routed?” | topic decomposition, research design, source plan, extraction and review method | Source Investigator for a settled current lookup; explicit Skill; Evidence Review for auditing an existing report | narrow lookup execution, unsupported conclusions, generic execution, product context ownership |
| `prysai-product-context` / Product Context | “What shared product and audience context is authoritative?” | versioned facts, hypotheses, audience, positioning, message constraints, changelog | explicit Skill; Research Router for external fact-finding; Evidence Review for audit | customer research, campaign execution, publication |
| `prysai-learning-coach` / Learning Coach | “How do I practise this non-Codex skill until I can perform it?” | baseline, retrieval attempt, feedback, correction, transfer, review cue | Codex Coach for GPT/Codex learning; Source Investigator for disputed facts; Evidence Review for mastery claims | Codex curriculum, guaranteed timelines, assessed-work substitution, medical diagnosis |
| `prysai-practice-target` / Practice Target | “What is one honest first thing I can practise instead of a vague or time-boxed learning promise?” | one situation, observable target, baseline, session budget, allowed help, visible check, smaller fallback, and a copy-ready first-practice message | Learning Coach once a practice attempt is ready; Dialogue Brief / First-Turn Check for a text-only request; Source Investigator / Research Router for factual goals; Task Protocol for tools, accounts, assessment, or outside effects | teaching, correcting, grading, proficiency labels, study-plan promises, current-fact research, sensitive data collection, or external submission |
| `prysai-source-investigator` / Source Investigator | “Which current sources answer this already-bounded decision?” | narrow lookup execution, source hierarchy, claim ledger when needed, conflicts, freshness, stopping receipt | Research Router for broad scoping or literature-review design; Evidence Review for an existing packet; Product Context for owned product facts | broad research planning, generic tutoring, side effects, outcome claims |
| `prysai-field-signal-curator` / Field Signal Curator | “Which real public problems and demands are visible without overstating them?” | traceable symptom records, deduplication, evidence class, privacy and instruction boundaries, teaching-gap proposals | Research Router for a broader study; Source Investigator for current product facts; Evidence Review for an existing synthesis | prevalence, root cause, private-community access, copied issue prose, universal workaround claims |
| `prysai-platform-adapter-review` / Platform Adapter Review | “Does this named-platform lesson add a sourced, runnable delta from the universal core?” | adapter admission decision, platform delta, official-source coverage, run/failure/evidence gate, maintenance boundary | Source Investigator for missing current facts; Evidence Review for an existing adapter packet | generic core teaching, unsupported equivalence, feature-list promotion, platform execution |
| `prysai-llm-comparison-protocol` / LLM Comparison Protocol | “How do I make one fair two-candidate LLM or workflow decision without inventing a leaderboard?” | frozen-variable comparison receipt, task-set boundary, run-record fields, not-comparable classification, and task-scoped expansion decision | Platform Adapter Review for named-platform deltas; Source Investigator for current facts; Evidence Review for completed-claim audits | runtime execution, price lookup, platform admission, general rankings, model-performance claims, or publication |

| `prysai-platform-fact-watch` / Platform Fact Watch | "Which existing named-platform teaching claim may need a freshness review, and what reader-facing surface does it affect?" | one claim card, freshness classification, affected-unit map, reader-risk label, safe interim wording, and explicit source/admission handoffs | Source Investigator for a fresh fact review; Evidence Review for a public claim packet; Platform Adapter Review when a changed fact calls adapter admission into question | fact retrieval, platform execution, product approval, adapter admission, model comparison, equivalence, learner outcomes, or release certification |

## Allowed handoff graph

Narrow responsibilities extend the core methods without turning the catalogue
into a generic prompt library: Dialogue Brief drafts one unsent,
text-only first message; First-Turn Check inspects an existing unsent draft;
Communication Failure Triage owns an already failed interaction; Interruption
Checkpoint owns only the safe receipt before any retry, diagnosis, or recovery;
Shift Handoff owns the small boundary between stable criteria and one supplied
current item, without assuming a previous exchange remains available;
Field Signal
Curator owns public demand and failure-signal records without proving root
cause or prevalence; and Platform Adapter Review decides whether a named-
platform lesson adds a sourced, runnable delta from the universal core.
LLM Comparison Protocol owns a fair, task-scoped decision rather than a
platform lesson or ranking. Practice Target owns the small decision before a
learning session: turn a wish into one observable first attempt, then hand it
to Learning Coach rather than pretending a target is teaching. Request
Escalation gives a beginner one lane before any specialized method begins.
Field Signal Curator may hand off fixed facts to Source
Investigator; Platform Adapter Review may hand off missing current facts to
Source Investigator or an existing packet to Evidence Review. First-Turn Check
may hand the reader's chosen next step to Dialogue Brief, but it never drafts
the replacement itself.

Platform Fact Watch adds the eighth responsibility. It owns the upkeep of one
already-named platform claim: map source drift, affected reader surface, and
safe interim wording. It does not retrieve a fact, run a platform, or admit an
adapter. It may hand a missing fact to Source Investigator, an existing public
claim packet to Evidence Review, or an admission question to Platform Adapter
Review.

## Curriculum layer route

Choose the transferable core when a decision, artifact, failure, and
acceptance remain meaningful across products. Choose a platform adapter only
for a named delta in commands, tools, permissions, runtime, interface,
persistence, or verification surface. Choose an application playbook for a
bounded domain outcome that composes the core with any required adapter.

Codex is `candidate` in this contract; Claude Code and Grok are `proposed`.
Never infer equivalent commands, tools, permissions, runtime, interface, or
behavior from similar labels. Equivalence requires an explicitly scoped
compatibility record and current authoritative evidence for every platform.

The default graph is finite:

```text
user
 ├─ unsure which first lane fits > Request Escalation
 ├─ untried text-only first message ─> Dialogue Brief
 ├─ unsent text-only draft to inspect ─> First-Turn Check
 ├─ GPT/Codex learning ──> Codex Coach
 ├─ interrupted task with unclear state > Interruption Checkpoint
 ├─ recurring work with one new item > Shift Handoff
 ├─ preserved failed reply > Communication Failure Triage
 ├─ unclear task ───────> Task Protocol
 ├─ existing claim ─────> Evidence Review
 ├─ skill decision ─────> Skill Selector
 ├─ broad research design > Research Router
 ├─ product context ────> Product Context
 ├─ non-Codex practice ─> Learning Coach
 ├─ bounded current lookup > Source Investigator
 ├─ public field signals ─> Field Signal Curator
 ├─ platform adapter audit > Platform Adapter Review
 ├─ fair two-candidate comparison > LLM Comparison Protocol
 └─ multi-stage work ───> Workflow Orchestrator

 named-platform fact maintenance > Platform Fact Watch

Workflow Orchestrator
 ├─> Task Protocol (when the contract is unclear)
 └─> Research Router (when broad research design is one declared stage)

Other allowed finite handoffs are declared in the machine contract. A handoff
ends the current owner's responsibility; it does not return control or create
a cycle. Workflow Orchestrator records its own delivery checkpoint after the
downstream artifact is available; that checkpoint is not a graph edge back.
```

The graph forbids `Coach → Coach`, `First-Turn Check → First-Turn Check`, `Selector → Selector`,
`Evidence Review → Evidence Review`, `Research Router → Research Router`,
`Product Context → Product Context`, and any domain Skill starting its own
orchestration loop. A changed requirement is a new route, not an implicit loop.

Prompt Card Editor starts only for a reviewed, authorized shared card. It hands
an individual unsent draft back to Dialogue Brief, an existing draft to
First-Turn Check, a copied or unlicensed prompt to a block, and any factual
lookup to Source Investigator. It cannot run a card, grant an action, or turn
a copied viral prompt into project material.

## Shared input, risk, and status contract

Every Skill must declare its required inputs and return missing inputs instead
of guessing. Use the common risk levels:

| Level | Meaning | Default permission behavior |
|---|---|---|
| `R0` | explanation or read-only reasoning | no external side effect |
| `R1` | reversible local observation or change | exact local scope; preserve recovery |
| `R2` | shared repository, network, account, or external service | explicit target and confirmation |
| `R3` | production, irreversible, secret-bearing, or broad access | hard stop until narrowly confirmed and independently checked |

Before any `R2` or `R3` action, state target, action, data exposure, owner,
rollback, and confirmation point. A Skill cannot infer permission from a token,
login state, prior approval, or a broad “all access” statement.

Every output must expose `risk`, `evidence`, `unknowns`, `handoff`, and one of
the project content statuses: `draft`, `candidate`, `verified`, or
`production-ready`. Volatile claims additionally use `current`, `stale`,
`disputed`, or `removed`; missing proof is `unknown`, not `verified`.

The shared handoff payload is:

```text
owner | confirmation | checkpoint | rollback | evidence | unknowns
next_review | handoff
```

`confirmation` records a human decision point; it is not inferred from login,
token presence, or a broad permission statement. `checkpoint` and `rollback`
must identify an observable artifact or target when the next stage can change
state.

Additional contract fields are required where the route needs them:

- Coach exposes missing learning inputs, `risk`, `confirmation`, and
  `stop_conditions`; a missing exercise field is a learning block, not an
  inferred execution permission.
- Research comparisons freeze candidate set, task-set version, context,
  tools, permissions, budget, success definition, repetitions, scoring,
  logging location, and decision owner.
- Workflow stages expose `input_and_action`, `exit_evidence`, exact
  `delivery_target`, stage owner, checkpoint, rollback, risk, and confirmation.
- Product Context requires `decision_owner`, `context_version`,
  `version_baseline`, and `canonical_location`; its Skill maintenance version
  is not a product-context version.

## Source and maintenance boundary

- **Source:** `CONTEXT.md`, `docs/charter.md`, `docs/book-architecture.md`,
  `docs/quality/skill-quality-standard.md`, and the 22 registered Skill
  files.
- **License:** original project rewrite. External skill repositories and
  supplied archives remain reference-only unless the asset register records a
  compatible license and attribution.
- **Owner:** capability-routing maintainer.
- **Next review:** `2026-09-12`.

The 2026-08-09 official facts refresh for chapters 4–7 is recorded at
`docs/research/openai-codex-facts-refresh-2026-08-09.md`; its integration review
is `docs/quality/review-codex-facts-refresh-2026-08-10.md`.

Do not put organization branding in public Skill display names or descriptions.
Installation compatibility names may remain where required by the registry.
