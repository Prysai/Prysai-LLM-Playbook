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
`decision_to_support`, and `canonical_location`. Also require a
`decision_owner`, `context_version`, and `version_baseline`; the Skill's own
maintenance version is not a product-context version. Inspect the existing
context, its current version or hash, and its changelog before proposing a
change. Mark absent customer evidence, metrics, testimonials, competitive
facts, and preferences as `hypothesis` or `unknown`; ask focused questions for
high-impact gaps.

Default to a non-authoritative draft or proposed diff. A request to explain,
review, or polish an existing context does not authorize rebuilding or writing
the canonical file. Before writing a canonical context, require exact target
path, current version/hash, changed-field scope, privacy classification and PII
decision, owner, reversible backup or rollback target, and explicit
confirmation immediately before the write. The confirmation must name the
target and action; a login, token, prior approval, or "all access" statement is
not sufficient. If any field is missing, return `blocked` with `blocked_on`
instead of writing or creating a changelog entry. Never overwrite an existing
context when the target, baseline, or write scope cannot be matched.

## Capture and version

Capture one-liner, category, type, goal, target users and decision-makers,
jobs-to-be-done, anti-personas, problems, alternatives, objections,
differentiation, proof points, customer language, words to use/avoid,
glossary, tone, constraints, conversion action, and measurement decisions.
For each material change increment the version and add a dated changelog entry.
Tell downstream work which location and version are authoritative.

The changelog entry must identify the prior version, new version, changed
claims, evidence used, decision owner, affected downstream artifacts, target
path, and rollback target. A draft context is not authoritative until the owner
accepts that entry. Keep a proposal, a confirmed write, and a published change
as separate states; completion of one does not imply the next.

## Downstream design handoff

Product Context constrains downstream design; it does not choose a visual style
by taste, generate a finished interface, or verify visual quality. When the
downstream artifact is a web page, application, presentation, report, or other
visual deliverable, provide a `design_handoff` that states:

- the real user task and the decision the artifact must support;
- the required information hierarchy and minimum useful information density;
- familiar industry patterns that users can recognise without explanation;
- required trust signals, sources, disclosures, ownership, and contact details;
- which photography, inventory, data, customer language, testimonials, and
  approved brand assets actually exist;
- prohibited visual or copy patterns that would fabricate evidence or imply
  unsupported authority; and
- target viewports, accessibility conditions, review owner, and acceptance
  checks for the rendered artifact.

If real photography, inventory, customer language, testimonials, or an approved
brand system is absent, do not fill the gap with lifestyle copy, synthetic
listings, decorative property illustrations, oversized editorial serif type,
soft gradient blobs, floating cards, or excessive rounding. Prefer a buyer
guide, service explanation, checklist, comparison, or decision tool whose
usefulness does not depend on invented evidence. A visually polished artifact
remains unverified until it has been rendered and reviewed under the stated
conditions.

## Risk, side effects, and confirmation

Drafting from supplied sources is `R0` or `R1`. Writing the canonical file is
`R1` only when the exact local target, baseline, backup, privacy decision,
rollback target, owner, and immediate confirmation are recorded. Publishing,
changing a live site, collecting personal data, sending messages, or altering
analytics is `R2` or higher and requires a separate Task Protocol or Workflow
Orchestrator handoff with exact target, scope, owner, and confirmation. Keep
personally identifying information out unless necessary and authorized; do not
copy raw customer records into a context merely because they were supplied.

## Hard stops

Stop with `blocked` if the product identity, decision owner, canonical
location, evidence provenance, privacy boundary, version baseline, current
target state, backup, rollback target, or write confirmation is unclear. Also
stop if a proposed change would overwrite an unreviewed decision, expose PII,
or exceed the requested field scope. Never turn an assumption into proof, a
draft into a customer claim, or a context update into permission to publish.

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
10. `design_handoff`
11. `risk_and_permissions` — include `risk`, `action_state` (`draft_only`,
    `write_blocked`, `write_confirmed`, or `handoff_required`), exact target,
    privacy decision, owner, confirmation, backup/rollback, and stop conditions
12. `content_status`

## Evidence and status mapping

Label each statement `observed`, `attributed`, `hypothesis`, `decision`, or
`unknown`. Verify a proposed context by checking every material claim against
its cited source, comparing the proposed fields with the current baseline,
checking the privacy classification and changed-field scope, and confirming
that the acceptance owner can inspect the diff. This verifies the proposal,
not customer impact or downstream execution. Use `draft` before source and
ownership review, `candidate` when a versioned context exists but fresh
stakeholder or source checks are absent, `verified` when the declared evidence
and owner review pass, and `production-ready` only when privacy, publication,
maintenance, and rollback gates pass. Context verification does not verify
downstream claims.

## Maintenance record

- `source`: `docs/charter.md`; `CONTEXT.md`; `docs/quality/skill-quality-standard.md`
- `license`: original rewrite; supplied customer or external material remains governed by its source permission
- `owner`: product-context maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
