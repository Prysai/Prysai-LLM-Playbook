# Product Context draft: Harbor & Key Realty

> `candidate` · non-authoritative · synthetic exercise · 2026-08-12

This file applies the project's Product Context structure to
[`brief.md`](brief.md). It is not a canonical context, has no customer or market
authority, and must not be used to publish a real-estate claim.

## 1. context_scope_and_owner

- **Product/project:** Harbor & Key Realty, a fictional independent residential brokerage.
- **Current goal:** Test a decision-support hierarchy for a static first-time
  buyer guide without presenting a fictional property or service as real.
- **Decision owner:** Fictional marketing lead for this exercise.
- **Scope:** Guide structure, decision sequence, questions, withheld CTA, and
  proof boundaries only.
- **Out of scope:** Brand approval, live listings, SEO, analytics, lead capture,
  paid media, market claims, financial or legal advice, and customer research.

## 2. authoritative_version_and_location

- **Context version:** `0.2.0-draft`
- **Version baseline:** `0.1.0-draft`, rejected after visual review because its
  downstream handoff allowed generic AI-associated visual patterns.
- **Canonical location:** None. This draft is deliberately not authoritative.
- **Downstream artifact:** `index.html` and `styles.css` in this disposable sandbox.

## 3. observed_facts

The only observed facts are properties of the supplied brief and repository:

- The exercise asks for a buyer-first message hierarchy.
- The requested first action should be low pressure.
- Customer interviews, analytics, testimonials, inventory, real photography,
  contact ownership, and an approved brand system are absent.
- Unsupported superiority, pricing, trust, speed, and market claims are forbidden.
- The first visual implementation was rejected by its reviewer as visibly
  generic and AI-designed.

## 4. hypotheses_and_unknowns

| Statement | Label | Why it stays bounded |
|---|---|---|
| First-time buyers may benefit from a clearer process explanation | hypothesis | No interview or behavioural evidence was supplied |
| A preparation guide is safer than a fictional listing page | decision | It provides utility without inventing inventory or demand |
| The fictional brokerage has live listings or a contact service | unknown | No inventory, organisation, or contact source exists |
| The guide will improve enquiries or buyer decisions | unknown | No experiment, baseline, or analytics exists |

## 5. audience_and_jobs

- **Audience:** Fictional first-time buyers with process uncertainty.
- **Job to be done:** Prepare a buyer to identify unknowns, ask inspectable
  questions, and understand provisional stages before viewing.
- **Anti-persona for this draft:** A user seeking verified live inventory,
  mortgage advice, legal advice, valuation, or a guaranteed outcome.

## 6. positioning_and_message_constraints

- **Working one-liner:** A synthetic first-time buyer guide that makes the
  buying sequence, evidence requests, and stop conditions inspectable.
- **Message order:** orient → prepare → explain the sequence → provide questions
  → state the evidence boundary.
- **Words to use:** prepare, inspect, source, date, owner, checkpoint, unknown.
- **Words to avoid:** guaranteed, fastest, cheapest, trusted by everyone, best,
  exclusive, proven, dream home, calmer life, and unqualified market statistics.
- **Tone:** direct, specific, institutional, and transparent about limitations.

## 7. proof_points_and_evidence_gaps

- **Available proof:** The rendered page, source files, viewport measurements,
  browser logs, and saved screenshots can show that the guide is inspectable.
- **Evidence gap:** There is no proof of audience preference, business
  performance, property availability, legal applicability, or conversion impact.
- **Required before real use:** jurisdiction review, owner approval, verified
  service and contact details, approved brand/legal copy, privacy decision, and
  a measured user test.

## 8. changelog_entry

- **Prior version:** `0.1.0-draft`
- **New version:** `0.2.0-draft`
- **Changed claims:** none; the downstream artifact and constraints were remediated.
- **Reason:** Reviewer rejected the previous lifestyle landing page because
  oversized serif type, earth tones, an abstract house illustration, a fictional
  listing card, and mood-led copy looked like generic AI design.
- **Evidence used:** [`brief.md`](brief.md), the rejected render, and reviewer feedback.
- **Affected artifact:** local static teaching page and screenshots only.
- **Rollback target:** repository history; no canonical product file is changed.

## 9. downstream_handoff

- Build only a static, informational buyer guide.
- Preserve the process explanation, question prompts, stop rule, and synthetic label.
- Withhold contact actions because no real owner, service authority, or privacy
  notice exists.
- Do not add forms, analytics, network calls, real property data, or invented proof.
- Review the page against the context and design handoffs before reuse.

## 10. design_handoff

- **Artifact job:** Help a fictional first-time buyer prepare questions and
  distinguish confirmed facts from assumptions before a viewing.
- **Required hierarchy:** synthetic-case warning → user decision → guide index →
  preparation checklist → buying sequence → inspectable questions → evidence boundary.
- **Minimum information density:** include actionable preparation prompts, a
  staged sequence, evidence requests, and stop conditions. A slogan-led landing
  page does not satisfy the job.
- **Familiar pattern:** an institutional buyer guide or public-service explainer,
  not a property listing, luxury brokerage campaign, or design portfolio piece.
- **Required trust signals:** visible synthetic status, date, scope, evidence
  limitations, no-advice boundary, and reason the contact action is withheld.
- **Available assets:** project-owned copy and HTML/CSS only. No real photography,
  inventory, testimonials, customer language, agent identity, contact channel,
  market data, or approved brand system exists.
- **Prohibited patterns:** lifestyle slogans, synthetic listings, decorative home
  illustrations, oversized editorial serif type, earth-tone lifestyle palettes,
  soft gradients, floating cards, excessive rounding, testimonials, statistics,
  urgency, or a functioning lead form.
- **Visual system:** project-aligned near-black, paper white, and signal red;
  system sans; hard edges; thin rules; tables; restrained institutional density.
- **Review conditions:** render at 1440 × 1100 and 390 × 844; confirm document
  width matches viewport, no console/page errors occur, all boundaries remain
  legible, and the mobile sequence does not require horizontal scrolling.
- **Acceptance owner:** curriculum maintainer. The visual remains `candidate`
  until the recorded screenshots are inspected after the remediation.

## 11. risk_and_permissions

- **Risk:** `R0` / `R1` teaching artifact; no external side effect.
- **Action state:** `draft_only`
- **Exact target:** `examples/skill-sandbox/product-context-real-estate/`
- **Privacy decision:** no personal data; no customer or agent identity is represented.
- **Confirmation:** not applicable because no canonical context write is requested.
- **Backup/rollback:** repository history; remove the sandbox if rejected.
- **Stop conditions:** real listings, customer data, publication, analytics, lead
  capture, advice, or unsupported claims require a new task protocol.

## 12. content_status

`candidate` for this teaching slice. The Product Context Skill runtime was not
invoked as an independent live run. The hand-authored page demonstrates how a
documented context and design handoff can constrain implementation; screenshots
prove only the recorded local render, not automatic Skill execution or impact.
