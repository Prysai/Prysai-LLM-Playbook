# Product Context draft: Harbor & Key Realty

> `candidate` · non-authoritative · synthetic exercise · 2026-08-11

This file is the output of applying the project's Product Context structure to
[`brief.md`](brief.md). It is not a canonical context, has no customer or
market authority, and must not be used to publish a real estate claim.

## 1. context_scope_and_owner

- **Product/project:** Harbor & Key Realty, a fictional independent residential brokerage.
- **Current goal:** Test a buyer-first message hierarchy for a static concept page.
- **Decision owner:** Fictional marketing lead for this exercise.
- **Scope:** Page structure, message order, safe CTA, and proof boundaries only.
- **Out of scope:** Brand approval, live listings, SEO, analytics, lead capture,
  paid media, market claims, and customer research.

## 2. authoritative_version_and_location

- **Context version:** `0.1.0-draft`
- **Version baseline:** No prior context exists; baseline is the synthetic brief.
- **Canonical location:** None. This draft is deliberately not authoritative.
- **Downstream artifact:** `index.html` and `styles.css` in this disposable sandbox.

## 3. observed_facts

The only observed facts are properties of the supplied brief:

- The exercise asks for a buyer-first message hierarchy.
- The requested first action should be low pressure.
- Customer interviews, analytics, testimonials, inventory, and an approved brand
  system are absent.
- Unsupported superiority, pricing, trust, speed, and market claims are forbidden.

## 4. hypotheses_and_unknowns

| Statement | Label | Why it stays bounded |
|---|---|---|
| First-time buyers may prefer a clearer process explanation | hypothesis | No interview or behavioural evidence was supplied |
| A process overview may be a safer first CTA than “sell now” language | decision + hypothesis | It is a design choice to test, not a conversion result |
| The fictional brokerage has live listings | unknown | No inventory source exists |
| The message will improve enquiries or conversion | unknown | No experiment, baseline, or analytics exists |

## 5. audience_and_jobs

- **Audience:** Fictional first-time buyers with process uncertainty.
- **Job to be done:** Understand the next step and decide whether a low-pressure
  conversation is appropriate.
- **Anti-persona for this draft:** A user seeking verified live inventory,
  mortgage advice, legal advice, valuation, or a guaranteed outcome.

## 6. positioning_and_message_constraints

- **Working one-liner:** A fictional buyer-first brokerage concept that explains
  the path before asking for a conversation.
- **Message order:** orient → explain the process → show an illustrative example
  → offer a low-pressure next step.
- **Words to use:** clear, considered, conversation, process, example.
- **Words to avoid:** guaranteed, fastest, cheapest, trusted by everyone, best,
  exclusive, proven, and any unqualified market statistic.
- **Tone:** calm, specific, and transparent about what is illustrative.

## 7. proof_points_and_evidence_gaps

- **Available proof:** The rendered page, the source files, and the fixed local
  screenshot show that the concept can be inspected.
- **Evidence gap:** There is no proof of audience preference, business
  performance, property availability, legal compliance, or conversion impact.
- **Required before real use:** owner review, approved brand and legal copy,
  verified inventory source, privacy/analytics decision, and a measured test.

## 8. changelog_entry

- **Prior version:** none
- **New version:** `0.1.0-draft`
- **Changed claims:** none; this is a proposed teaching context.
- **Evidence used:** [`brief.md`](brief.md) only.
- **Affected artifact:** local static concept page only.
- **Rollback target:** remove the sandbox directory; no canonical product file is changed.

## 9. downstream_handoff

- Build only a static, illustrative landing page.
- Preserve the process explanation and the synthetic-data label.
- Do not add forms, analytics, network calls, or real property data.
- Review the page against the context boundaries before any hypothetical reuse.

## 10. risk_and_permissions

- **Risk:** `R0` / `R1` teaching artifact; no external side effect.
- **Action state:** `draft_only`
- **Exact target:** `examples/skill-sandbox/product-context-real-estate/`
- **Privacy decision:** no personal data; no customer or agent identity is represented.
- **Confirmation:** not applicable because no canonical context write is requested.
- **Backup/rollback:** disposable directory; delete or move it after inspection.
- **Stop conditions:** a request for real listings, customer data, publication,
  analytics, lead capture, or unsupported claims requires a new task protocol.

## 11. content_status

`candidate` for this teaching slice; the Product Context Skill runtime was not
invoked as an independent live run in this case. The page is a hand-authored
static implementation based on the draft, so the screenshot proves rendering,
not automatic Skill execution.
