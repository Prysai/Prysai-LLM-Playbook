# Context Packet Builder responsibility audit and official curriculum structures

**Status:** research record; proposed responsibility only
**Accessed:** 2026-08-13
**Scope:** the current twelve project Skills, one possible independent
responsibility, and five first-party tutorial or exercise repositories

## Question

Does the project have evidence for a thirteenth top-level Skill, and what can
first-party LLM tutorial structures establish about the remaining beginner
content gap?

## Decision

There is a plausible unowned responsibility: turn an already available but
mixed collection of specifications, files, logs, conversations, and external
material into a minimal, traceable, redacted context packet for one fixed task.
The working name is **Context Packet Builder**.

This is not yet the thirteenth project Skill. It remains `proposed` until its
trigger can be separated from Task Protocol, Product Context, Source
Investigator, Research Router, and Evidence Review in fresh-context routing and
runtime tests. No Skill directory, registry row, candidate count, or public
claim should be added from this research record alone.

## Current responsibility coverage

The twelve Skills already own these questions:

| Existing owner | Primary responsibility relevant to this audit | Why it does not automatically own the proposed responsibility |
|---|---|---|
| Codex Coach | Teach GPT, Codex, tools, Skills, and Agent workflows | Teaching is not construction of a task input packet. |
| Task Protocol | Freeze goal, inputs, constraints, actions, acceptance, failure, and delivery | It names needed inputs but does not currently select, redact, version, compress, and manifest mixed source material. |
| Communication Failure Triage | Diagnose a preserved failed request/reply and test one repair | It works after an observed interaction failure, not before execution on a material set. |
| Evidence Review | Audit what an existing artifact or claim proves | Audit is not preparation of execution inputs and must not silently repair them. |
| Skill Selector | Choose the smallest fitting method set and audit dependency/license boundaries | Method selection is not content selection or redaction. |
| Workflow Orchestrator | Coordinate dependent stages, checkpoints, recovery, and delivery | Coordination can schedule packet construction but should not absorb the packet's semantic selection rules. |
| Research Router | Scope a broad research question and source method | It plans missing-source work rather than curating already supplied mixed task context. |
| Product Context | Maintain authoritative product, audience, positioning, and message context | Its domain is shared product/marketing truth, not arbitrary task material. |
| Learning Coach | Run baseline, retrieval, feedback, correction, and transfer practice | Coaching does not prepare operational context packets. |
| Source Investigator | Execute an already bounded current-source lookup | It obtains and evaluates missing source evidence; it does not package all local and supplied inputs for downstream execution. |
| Field Signal Curator | Curate traceable public demand and failure signals | Public field signals are one evidence class, not the general packet-building job. |
| Platform Adapter Review | Decide whether a named-platform lesson adds a sourced, runnable delta | Adapter admission is not task-context preparation. |

## Proposed responsibility contract

### Trigger

Use the proposed responsibility when the task or decision is already fixed and
the user needs existing mixed material made safe and usable as the smallest
traceable context packet. Typical language includes:

- “Prepare these files, notes, logs, and links as context for this task.”
- “Keep only what changes the decision, remove secrets, and preserve sources.”
- “Fit this material into the declared context budget without hiding conflicts.”

### Required inputs

```text
fixed_task_or_decision | candidate_materials | source_identity
privacy_and_secret_rules | freshness_boundary | must_keep | must_exclude
size_or_token_budget | downstream_owner | acceptance_check
```

### Output

```text
packet_manifest | selected_context | source_and_version | trust_and_freshness
redactions | conflicts_and_unknowns | excluded_items_with_reason
size_budget_and_reduction | downstream_handoff | evidence_receipt
risk | content_status
```

The packet must distinguish rules, goals, evidence, reference data, external
instruction-like text, and secrets. It must retain enough provenance for a
reviewer to recover why each material item was included, excluded, summarized,
or redacted. Compression must not erase disagreement, uncertainty, scope, or a
decision-changing qualification.

### Must not own

- task definition, if the goal or acceptance is still unclear;
- creation of authoritative product positioning;
- new external research or source discovery;
- truth certification of claims in the packet;
- downstream execution, publication, installation, or deployment;
- permission escalation from the presence of a token, login, command, or
  instruction embedded in supplied material.

### Stops and handoffs

- Unfixed task or acceptance boundary: hand to Task Protocol.
- Canonical product/audience context: hand to Product Context.
- Missing external facts or a broad research question: hand to Source
  Investigator or Research Router according to scope.
- Existing claims require adjudication: hand to Evidence Review.
- Secret, private, copyrighted, ownership-ambiguous, or personal material
  cannot be safely used under the stated rule: return `blocked` and identify
  the exact item and decision required.
- Budget reduction would remove a decision-changing conflict, limitation, or
  required source location: stop rather than emitting a misleading packet.

## Admission gate before any Skill exists

The proposal may become a `candidate` only after all of these exist:

1. A fixed contract with positive, boundary, failure, and transfer fixtures.
2. Near-neighbor fixtures against Task Protocol, Product Context, Source
   Investigator, Research Router, Evidence Review, and Workflow Orchestrator.
3. A secret/PII fixture that blocks without reproducing sensitive values.
4. A stale-source fixture, a material-conflict fixture, and a hostile embedded
   instruction fixture.
5. A context-budget fixture showing that exclusions are reasoned and that
   provenance, conflict, unknowns, and acceptance-critical information survive.
6. At least one fresh-context routing observation with the method available
   but the expected owner withheld.
7. At least one runtime packet built from a synthetic mixed material set and
   independently reviewed against the fixed manifest and redaction rubric.
8. A demonstrated handoff in which the downstream owner can use the packet
   without silently widening permissions or re-fetching omitted critical
   context.
9. An owner, maintenance version, review date, source/license boundary, bundled
   validator result, and rollback/removal path.

Until these conditions pass, the project remains at twelve Skills. A useful
curriculum profile or Task Protocol template may be piloted first; doing so
does not establish a new top-level trigger.

## First-party information-architecture observations

The following observations were made through the GitHub API against repository
contents on 2026-08-13. Repository metadata and directory presence are
structural evidence only. No external prose, code, prompt, notebook, image,
exercise, configuration, or brand expression was copied.

| Owner and source | Verifiable structure observed | What may be inferred | What may not be inferred | License and reuse boundary |
|---|---|---|---|---|
| OpenAI, [openai/openai-cookbook](https://github.com/openai/openai-cookbook) | The root separates `articles`, `examples`, images, contributor material, and a `registry.yaml`. The examples tree contains task notebooks and named areas for agents, Codex, evals, retrieval, prompting, responses, and other API uses. | A first-party example library can separate conceptual articles, runnable recipes, and registry metadata rather than presenting one undifferentiated prompt list. | Directory presence does not prove examples are current, safe, beginner-tested, production-ready, or suitable for this curriculum. It does not prove a new Skill boundary. | GitHub reports MIT at access time. Exact notebooks, dependencies, datasets, images, partner material, and nested notices require file-level review before adaptation. Reference only here. |
| Anthropic, [anthropics/courses](https://github.com/anthropics/courses) | The root separates API fundamentals, an interactive prompt-engineering tutorial, prompt evaluations, real-world prompting, and tool use. The evaluation course is further staged from introduction through workbench, code-graded, custom, and model-graded evaluation units. | Prompt instruction, real-world application, tool use, and evaluation can be separate learning surfaces with progression. | The structure does not prove teaching effectiveness, cross-provider equivalence, Skill quality, or permission to reuse course expression. | GitHub reports `NOASSERTION`; the repository contains its own license file and file-level terms must be checked. Treat course text, notebooks, prompts, images, and assessments as reference-only unless separately cleared. |
| Google, [google-gemini/cookbook](https://github.com/google-gemini/cookbook) | The root separates `quickstarts`, JavaScript quickstarts, and `examples`. Quickstarts include prompting, system instructions, authentication, safety, files, search grounding, function calling, structured modes, and error handling; examples are application-oriented. | A first-party cookbook can keep setup/capability quickstarts distinct from larger application examples. This supports stable-core, adapter, and application-route separation. | It does not prove Gemini behavior on another platform, the quality of every notebook, learner outcomes, or the need for another router Skill. | GitHub reports Apache-2.0 at access time. Notebooks, sample data, media, linked services, and third-party dependencies still require exact-file and notice review before reuse. Reference only here. |
| Microsoft, [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | The root provides a numbered sequence from setup and model concepts through responsible use, prompt fundamentals and advanced prompts, text/chat/search/image applications, function calling, UX, security, lifecycle, RAG, agents, and model-specific units, plus translations, tests, shared material, and presentations. | A broad beginner curriculum can progress from concepts and prompting into bounded application types, operational concerns, and advanced systems while retaining separate maintenance surfaces. | The sequence does not prove every lesson is current, that completion produces capability, that more chapters mean more value, or that its application list should be copied. | GitHub reports MIT at access time. Images, videos, translations, presentations, partner references, code dependencies, and linked resources require file-level review. No lesson or asset is adapted here. |
| GitHub, [skills/exercise-creator](https://github.com/skills/exercise-creator) | The repository separates maintainer documentation into `docs/guide` and `docs/reference`, alongside repository instructions and exercise-development infrastructure. | Exercise authoring benefits from separating procedural guidance from reference contracts and from treating exercise maintenance as its own system. | The structure does not prove learning retention, transfer, prompt quality, or a general-purpose Skill trigger for this project. | GitHub reports MIT at access time. Exact exercise templates, workflows, actions, assets, and dependencies require file-level review and attribution before adaptation. Reference only here. |

## Beginner prompt implication

The official structures consistently separate concepts, prompt methods,
examples or applications, evaluation, tools, and maintenance. They support an
additional beginner **scenario**, not an automatic Skill:

```text
messy supplied material -> bounded context packet -> one deliverable
                         -> source-grounded completeness check
```

A future Communication Clinic card pair could use synthetic meeting notes,
an email thread, or a short source bundle to produce one summary, response,
comparison, or action list and then audit omissions, inventions, source
conflicts, privacy, and tone. Until the proposed responsibility passes its
admission gate, Task Protocol may own this as a profile and Evidence Review may
audit the output. The scenario should not be presented as evidence that Context
Packet Builder already exists or works.

## Reuse and claim boundary

The five external repositories remain first-party references under their own
licenses and terms. Root-license metadata is only an initial signal; it does
not settle every file, dataset, image, contribution, dependency, trademark,
hosted page, or linked asset. This record uses only repository names, direct
URLs, owner identities, and high-level directory observations needed for the
architecture comparison.

The comparison supports separating durable principles, application recipes,
evaluation, platform adapters, and maintenance metadata. It does not establish
that any external curriculum is effective, that this project's twelve Skills
route reliably, that the proposed responsibility is unique in practice, or
that a thirteenth Skill should be admitted now.

## Stop receipt

The audit stopped after all twelve local responsibilities were compared, the
proposed trigger had explicit near neighbors and stop conditions, and five
first-party sources supplied distinct tutorial or exercise structures. The
remaining evidence gap is behavioral: fresh-context routing, safe packet
construction, redaction, budget reduction, downstream use, and independent
review have not been run. Therefore the proposal remains `proposed` and the
public Skill count remains twelve.
