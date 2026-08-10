# Skill routing matrix

**Version:** `0.3.0`
**Review date:** `2026-09-09`  
**Status:** `candidate`

This matrix is the routing contract for the seven project Skills. It defines
responsibility and handoff; it does not grant tool access or replace project
rules.

## Precedence rules

1. An explicit `$skill-name` request has priority over implicit trigger
   matching. The named Skill must either act within its boundary or explain a
   safety block; another Skill must not silently replace it.
2. Project rules, user constraints, and permission gates outrank every Skill.
3. If no Skill is explicit, choose the narrowest Skill whose primary question
   matches the task. Do not load all seven by default.
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
|---|---|---|---|---|
| `prysai-codex-coach` / Codex Coach | “How do I learn or practice this?” | learning level, explanation, experiment, reflection, transfer | explicit Skill; Task Protocol; Evidence Review; Research Router; Skill Selector; Workflow Orchestrator; Product Context | execution, installation, source synthesis, product claims |
| `prysai-task-protocol` / Task Protocol | “What exactly is the bounded task?” | goal, inputs, constraints, actions, acceptance, failure, delivery | explicit Skill; Workflow Orchestrator after readiness; domain route for unresolved method | execution, evidence audit, method selection |
| `prysai-evidence-review` / Evidence Review | “What does the evidence actually prove?” | claim table, coverage, freshness, status, next check | explicit non-audit Skill; Research Router for new research | repair, execution, invented proof |
| `prysai-skill-selector` / Skill Selector | “Which smallest Skill set fits?” | fit, overlap, dependencies, license, permissions, smoke test, rollback | explicit Skill; Task Protocol for unclear task; Workflow Orchestrator for settled execution | general teaching, task execution, correctness certification |
| `prysai-workflow-orchestrator` / Workflow Orchestrator | “How do dependent stages reach delivery?” | stage graph, checkpoints, recovery, handoffs, delivery status | explicit bounded Skill for a stage; Task Protocol for initial contract | domain method details, permission granting, evidence invention |
| `prysai-research-router` / Research Router | “What question and sources support this?” | scope, search method, extraction, citations, conflicts, limitations | explicit Skill; Evidence Review for auditing an existing report | unsupported conclusions, generic execution, product context ownership |
| `prysai-product-context` / Product Context | “What shared product and audience context is authoritative?” | versioned facts, hypotheses, audience, positioning, message constraints, changelog | explicit Skill; Research Router for external fact-finding; Evidence Review for audit | customer research, campaign execution, publication |

## Allowed handoff graph

The default graph is finite:

```text
user
 ├─ learning/practice ──> Codex Coach
 ├─ unclear task ───────> Task Protocol
 ├─ existing claim ─────> Evidence Review
 ├─ skill decision ─────> Skill Selector
 ├─ research question ──> Research Router
 ├─ product context ────> Product Context
 └─ multi-stage work ───> Workflow Orchestrator

Workflow Orchestrator
 └─> Task Protocol (once)
      └─> one domain route: Research Router | Product Context | Skill Selector
           └─> Evidence Review (when a claim or artifact is ready to audit)
                └─> Orchestrator checkpoint and delivery
```

The graph forbids `Coach → Coach`, `Selector → Selector`,
`Evidence Review → Evidence Review`, `Research Router → Research Router`,
`Product Context → Product Context`, and any domain Skill starting its own
orchestration loop. A changed requirement is a new route, not an implicit loop.

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

## Source and maintenance boundary

- **Source:** `CONTEXT.md`, `docs/charter.md`, `docs/book-architecture.md`,
  `docs/quality/skill-quality-standard.md`, and the seven Skill files.
- **License:** original project rewrite. External skill repositories and
  supplied archives remain reference-only unless the asset register records a
  compatible license and attribution.
- **Owner:** capability-routing maintainer.
- **Version:** `0.2.0`.
- **Next review:** `2026-09-09`.

The 2026-08-09 official facts refresh for chapters 4–7 is recorded at
`docs/research/openai-codex-facts-refresh-2026-08-09.md`; its integration review
is `docs/quality/review-codex-facts-refresh-2026-08-10.md`.

Do not put organization branding in public Skill display names or descriptions.
Installation compatibility names may remain where required by the registry.
