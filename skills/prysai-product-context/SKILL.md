---
name: prysai-product-context
description: >
  Create or update a versioned product and marketing context before positioning,
  content, SEO, conversion, launch, analytics, or sales work. Use when shared
  product understanding is missing or audience, positioning, brand voice, or
  product context is requested. Do not use to invent customer evidence, replace
  research, or execute downstream marketing changes.
---

# Product Context

Create a compact, canonical context that downstream work can reuse. Separate
observed facts, attributed customer language, decisions, and hypotheses.

## Trigger boundary and handoff

Take ownership when the missing artifact is shared product, audience,
positioning, message, brand, conversion, or measurement context.

Yield when:

- an explicit `$skill` is named; honor it and provide context only if requested;
- external fact-finding is needed: Research Router;
- an existing context's claims need auditing: Evidence Review;
- the request is to execute content or launch changes: Task Protocol or
  Workflow Orchestrator;
- the request is only to learn positioning method: Codex Coach.

Do not become the marketing executor, analytics system, or customer-research
substitute. Do not call Product Context again for a downstream deliverable
unless a material context gap is discovered.

## Required inputs and missing-input behavior

Require `product_or_project`, `current_goal`, `known_audience`, `available_sources`,
`decision_to_support`, and `canonical_location`. Inspect existing context and
changelog first. Mark absent customer evidence, metrics, testimonials,
competitive facts, and preferences as `hypothesis` or `unknown`; ask focused
questions for high-impact gaps. Do not write a canonical context without an
owner and version.

## Capture and version

Capture one-liner, category, type, goal, target users and decision-makers,
jobs-to-be-done, anti-personas, problems, alternatives, objections,
differentiation, proof points, customer language, words to use/avoid,
glossary, tone, constraints, conversion action, and measurement decisions.
For each material change increment the version and add a dated changelog entry.
Tell downstream work which location and version are authoritative.

## Risk, side effects, and confirmation

Drafting from supplied sources is `R0` or `R1`. Writing the canonical file is
`R1` if local and reversible; publishing, changing a live site, collecting
personal data, sending messages, or altering analytics is `R2` or higher and
requires explicit target, scope, and confirmation. Keep personally identifying
information out unless necessary and authorized.

## Hard stops

Stop with `blocked` if the product identity, decision owner, canonical
location, evidence provenance, privacy boundary, or version baseline is
unclear. Never turn an assumption into proof, a draft into a customer claim,
or a context update into permission to publish.

## Fixed output

Return exactly:

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `risk_and_permissions`
11. `content_status`

## Evidence and status mapping

Label each statement `observed`, `attributed`, `hypothesis`, `decision`, or
`unknown`. Use `draft` before source and ownership review, `candidate` when a
versioned context exists but fresh stakeholder or source checks are absent,
`verified` when the declared evidence and owner review pass, and
`production-ready` only when privacy, publication, maintenance, and rollback
gates pass. Context verification does not verify downstream claims.

## Maintenance record

- `source`: `docs/charter.md`; `CONTEXT.md`; `docs/quality/skill-quality-standard.md`
- `license`: original rewrite; supplied customer or external material remains governed by its source permission
- `owner`: product-context maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
