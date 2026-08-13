# ADR-0025: Use a universal core, Codex flagship track, and gated platform adapters

## Status

Accepted

## Date

2026-08-12

## Context

The project currently teaches a durable method for defining, executing,
checking, and maintaining work, but presents that method primarily through
Codex. The intended audience is broader than one experience level: a beginner
needs a safe first result and plain language, while an advanced practitioner
needs mechanisms, trade-offs, evaluation, failure recovery, and organizational
controls. The same readers may also use ChatGPT, Claude, Gemini, Copilot, APIs,
or future platforms.

Broadening the curriculum creates two opposing risks. Keeping every principle
under a Codex-only frame limits transfer and makes reusable collaboration
methods look product-specific. Recasting the repository as a generic AI guide
would discard its strongest differentiation: a deep, inspectable Codex track
connected to real files, tools, Skills, Agents, Labs, evaluation fixtures, and
evidence boundaries.

Platform workflows share a broad lifecycle, but they do not share identical
context injection, tools, permissions, persistence, action semantics,
verification surfaces, or failure modes. A renamed or expanded front door
could therefore imply coverage that the repository has not built, run, or
reviewed. The existing 17 Labs remain `draft / not_run`, the 39 evaluation
fixtures remain `not_run / static_structure_only`, and the current release
decision remains `candidate`.

The accepted strategy input is
`docs/strategy/universal-llm-practice-curriculum-architecture-2026-08-12.md`.
Its naming options are decision candidates, not an authorization to rename.

## Decision

1. Make a **stable universal LLM collaboration core** the sole teaching owner
   of principles that transfer across platforms. The core covers outcome
   framing, context selection, collaboration protocols, authority and side
   effects, evidence, recovery, reuse, evaluation, and governance.
2. Keep **Codex as the deepest flagship platform track**. Codex remains the
   first complete implementation of the core method and retains dedicated
   treatment of its surfaces, project context, files, terminal, browser, Git,
   Skills, Agents, verification, and team use.
3. Add another named model or platform only as an **evidence-gated adapter**.
   An adapter teaches the delta from the universal core; it does not copy the
   core or imply that platforms behave identically.
4. Require every adapter to declare its surface, context injection, available
   actions, authority, persistence, observable control loop, verification
   surface, failure modes, volatile facts, and transfer Lab. It also needs an
   owner, authoritative sources with review dates, a real run record, a
   boundary or failure case, and an explicit evidence limit before it can be
   promoted beyond `draft`.
5. Serve beginners and advanced practitioners from the same canonical content
   graph. Use progressive disclosure and curated routes rather than separate
   copies: a smallest safe action, minimum explanation, reliable workflow, and
   deeper mechanism or evaluation should converge on the same acceptance
   evidence.
6. Organize discovery along three independent dimensions: capability depth,
   platform track, and real task or domain route. Routes reference canonical
   units and cannot become a second source of teaching prose.
7. Preserve the current L0-L6 identifiers, content identities, filenames,
   locale rules, URLs, and public project identity until an explicit migration
   contract replaces them. Logical projection and metadata precede physical
   moves.
8. Do **not** approve an immediate project or repository rename. Do **not**
   claim that the curriculum is cross-platform-complete, that named adapters
   exist, or that all platforms provide equivalent behavior.

## Platform-adapter admission gate

A named platform adapter can enter the public curriculum only when all of the
following exist:

- a reader problem and capability delta not already owned by the universal
  core or Codex track;
- an adapter record covering the required platform fields;
- authoritative sources, access date, claim scope, owner, and next review for
  every volatile fact;
- one fixed, low-risk task with declared inputs, permissions, acceptance, and
  cleanup;
- a recorded execution from the named platform or surface;
- one realistic boundary or failure observation and a recovery path;
- claim-to-evidence mapping that states what the run does not prove;
- source and asset license decisions;
- relevant structural, link, content, and evaluation checks; and
- editorial review that the adapter adds a platform delta instead of generic
  product description or duplicated prompting advice.

A placeholder, official-feature summary, copied prompt collection, product
name, successful login, or HTTP response does not pass this gate. An adapter
that loses its owner or freshness becomes stale or is removed from current
routes; historical records remain available with their status.

## Brand migration gate

A broader public name, repository slug, or headline scope can be approved only
through a later ADR after the content makes the claim true. That decision must
have all of the following evidence:

1. an approved target product promise and a named owner;
2. at least one non-Codex adapter that has passed the admission gate and has
   been independently reviewed, rather than a planned directory or outline;
3. a universal-core route and a complete Codex route whose prerequisites,
   content ownership, and evidence status are machine-checkable;
4. novice and advanced reader tests showing that each audience can select an
   appropriate entry and understand the Codex-versus-universal boundary;
5. a refreshed name-conflict, target-owner namespace, domain, package, social,
   and relevant trademark-risk review, without presenting the check as legal
   clearance;
6. an inventory of every affected README, page title, description, header
   asset, locale facade, repository reference, badge, clone URL, Skill name,
   generated artifact, and external link under project control;
7. a compatibility map for stable content IDs, old file paths, public routes,
   anchors, locale counterparts, and Skill invocation names;
8. a tagged pre-migration rollback target and a rehearsed restoration plan;
9. an exact-commit release evidence packet, successful required gates, hosted
   route checks where applicable, and explicit remaining blind spots; and
10. owner approval of the user-facing and operational consequences.

Passing this gate permits a separate rename decision; it does not itself set a
name. A name containing words such as `verified`, `complete`, or equivalent
must also be rejected when its ordinary meaning exceeds the current evidence
and maturity state.

## Alternatives considered

### Keep the entire curriculum Codex-only

Rejected as the long-term architecture. The project already teaches stable
methods that transfer beyond Codex, and readers need to distinguish those
methods from volatile product facts. Codex remains the flagship track rather
than the owner of universal principles.

### Rename now and fill in other platforms later

Rejected. Branding would become an unsupported completion claim, while the
content, runs, sources, compatibility map, learner review, and rollback path do
not yet exist.

### Build equal full books for every platform

Rejected. It multiplies duplicated principles, translation burden, volatile
facts, tests, and review responsibilities. Platform adapters should explain
meaningful differences and refer back to one core.

### Replace Codex with a platform-neutral generic example set

Rejected. Generic examples make the curriculum easier to describe but harder
to inspect and verify. The existing Codex depth is a valuable reference
implementation and should be strengthened, not diluted.

### Publish a comparison table from official feature descriptions

Rejected as an admission mechanism. Feature pages can support volatile facts,
but they do not establish actual behavior, comparable task success, permission
boundaries, failure handling, or learner transfer.

## Consequences

- New cross-platform principles need a platform-neutral canonical owner;
  Codex chapters and task routes reference that owner rather than rewriting it.
- Codex-specific material must identify its actual product delta and volatile
  facts, which makes maintenance more explicit.
- Platform breadth grows more slowly because each adapter requires source,
  runtime, failure, review, and maintenance evidence. This is intentional.
- Beginner and expert routes can expand without splitting the curriculum into
  divergent copies, but content metadata and route generation become more
  important.
- Physical restructuring is deferred. Future migrations must preserve stable
  identity and test representative old root, chapter, Lab, locale, asset,
  anchor, and Skill links.
- The current project name, repository slug, headline scope, status, Labs, and
  evaluations do not change through this ADR.
- A future rename will be operationally expensive: it affects discovery,
  inbound links, localized facades, generated outputs, clone instructions,
  brand assets, and rollback. That cost must be included in the decision.
- The project can describe this architecture as accepted, but cannot describe
  the universal-core extraction, adapter corpus, cross-platform comparisons,
  learner outcomes, or brand migration as completed.

## Evidence boundary

This ADR proves that the architecture and its gates were selected. The strategy
proposal, benchmark research, repository inventory, and current quality ledger
support the rationale. They do not prove that the universal core has been
extracted, that the Codex track has been fully reprojected, that any non-Codex
adapter passed its gate, that readers transferred a capability, that old URLs
survive a migration, or that a broader name is available or approved.

Those claims require their own files, run records, reviews, validators,
compatibility fixtures, and exact-commit release evidence. Until then, the
honest state remains an accepted direction inside a `candidate` project.
