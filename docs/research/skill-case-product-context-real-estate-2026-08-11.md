# Skill case: Product Context → first-time buyer guide

> `candidate` · local teaching case · remediated 2026-08-12

This case makes one Skill boundary observable and records a visual failure
instead of presenting the first polished render as success.

## Case identity

- **Case ID:** `skill-case-product-context-real-estate-2026-08-11`
- **Problem:** How can Product Context constrain a useful downstream artifact
  when real inventory, photography, customer language, brand assets, and contact
  authority are absent?
- **Audience:** Learners at L3–L4 who are learning to design, select, or review a Skill.
- **Related Skill:** [`prysai-product-context` v0.3.0](../../skills/prysai-product-context/SKILL.md)
- **Related chapter:** [Chapter 17 — Marketing](../../book/chapters/17-marketing-track-EN.md)
- **Related lab:** [Lab 010 — Shared Product Context](../../book/labs/lab-010-product-context-EN.md)
- **Status:** `candidate`

## Source and license boundary

- **Source type:** project-owned synthetic brief.
- **Input:** [`brief.md`](../../examples/skill-sandbox/product-context-real-estate/brief.md)
- **Context draft:** [`context-draft.md`](../../examples/skill-sandbox/product-context-real-estate/context-draft.md)
- **Source URL:** none; no external source populated the example.
- **Assets:** original HTML, CSS, copy, capture script, and screenshots. No
  external image, font, icon, code snippet, CDN, or remote request is used.
- **Usage boundary:** the case may demonstrate context, design handoff, failure
  review, and rendering evidence. It must not be presented as a real brokerage,
  listing, advisory service, legal sequence, customer result, or conversion benchmark.

## Synthetic input and legitimate Skill boundary

The brief supplies a fictional residential brokerage and a first-time buyer
audience. It supplies no interviews, analytics, testimonials, live inventory,
approved brand system, real photography, market data, contact owner, privacy
notice, or jurisdiction-specific process authority.

The Product Context Skill can structure observed facts, hypotheses, decisions,
evidence gaps, and downstream constraints. It does not perform customer
research, choose a visual style by taste, generate a verified interface, approve
legal or financial content, publish a page, or collect leads.

## Rejected first implementation

The first page was a lifestyle brokerage landing page. It used:

- a large editorial serif and italic headline;
- muted earth tones;
- an abstract house illustration;
- a rounded fictional listing card;
- mood-led copy such as “A calmer way to move home”; and
- a portfolio-like layout with little practical buyer information.

The reviewer rejected it because the combination looked generically AI-designed.
The failure was not treated as a CSS preference. It exposed a contract defect:
the Skill's `downstream_handoff` did not say what a visual artifact must contain
or prohibit when real evidence and brand assets are missing.

## Remediation

The Skill was updated from `0.2.0` to `0.3.0` with a required
`design_handoff`. The handoff now names the user task, minimum information
density, familiar industry pattern, trust signals, available assets, prohibited
fabrication patterns, viewports, accessibility conditions, and review owner.

The downstream artifact was rebuilt as a first-time buyer guide rather than a
fictional property page. It contains:

- a prominent synthetic-case and no-advice boundary;
- a guide index;
- a preparation checklist and stop rule;
- a six-stage sequence with evidence requests and assumptions to avoid;
- questions organised by property, process, cost, and conflict; and
- a disabled contact action explaining the missing owner and privacy authority.

The visual system uses project-aligned near-black, paper white, and signal red,
system sans type, hard edges, rules, and tables. It contains no photograph,
illustration, testimonial, listing, gradient blob, floating card, rounded panel,
or lifestyle slogan.

## Local rendering evidence

- **Server:** bundled Python static server at port `4182`.
- **URL:** `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`
- **Capture:** [`scripts/capture_case_screenshots.mjs`](../../scripts/capture_case_screenshots.mjs)
  using bundled `playwright-core` and local Microsoft Edge.
- **Desktop:** 1440×1100 viewport; document width 1440; document height 3861.
- **Mobile:** 390×844 viewport; document width 390; document height 6063.
- **Screenshots:** [`desktop`](../../assets/cases/product-context-real-estate-desktop.png)
  and [`mobile`](../../assets/cases/product-context-real-estate-mobile.png).
- **Browser result:** zero console errors and zero page errors for both captures;
  document width matched each viewport, so no horizontal overflow was observed.
- **Visual review:** both final screenshots were inspected after capture. The
  mobile layout reflows the guide, sequence, questions, and evidence section
  instead of shrinking the desktop grid.
- **Evidence class:** `directly_observed` for local DOM, logs, dimensions, and
  screenshots; not evidence of Skill runtime execution or user impact.

## Runtime and status boundary

The Skill was not run as an independent live invocation. The context draft and
page are project-owned implementations of its documented contract. The capture
proves that the implementation renders under the stated conditions; it does not
prove autonomous generation, legal correctness, full accessibility, customer
preference, advice quality, enquiries, or sales.

## Acceptance and failure variants

The remediated case passes this candidate review when:

1. the synthetic and no-advice boundary is visible before the guide content;
2. the artifact provides decision support without invented inventory or proof;
3. the contact action remains withheld and the reason is stated;
4. the recorded viewports have no horizontal overflow or browser errors; and
5. a reviewer inspects both captures instead of accepting source code alone.

Failure variants include removing the synthetic label, adding a plausible
listing, enabling a contact form without an owner/privacy notice, turning
jurisdiction-dependent stages into universal advice, or replacing useful guide
content with lifestyle atmosphere.

## Claims and non-claims

### This case can claim

- A synthetic brief was turned into a versioned context and design handoff.
- Reviewer rejection changed both the Skill contract and the downstream artifact.
- A static buyer guide was rendered in Edge at the recorded desktop and mobile viewports.
- The saved screenshots and logs make the rendering and boundary claims inspectable.

### This case must not claim

- The Product Context Skill automatically generated the page.
- Harbor & Key is a real organisation or service.
- The buying sequence applies unchanged in a particular jurisdiction.
- Buyers prefer, trust, or benefit from the guide.
- The artifact is legally approved, fully accessible, or production-ready.

## Privacy, secrets, and maintenance

- **Personal data:** none.
- **Secrets:** none; no token, password, key, cookie, `.env`, or login data.
- **Private paths in reader content:** none; capture implementation paths remain
  in the repository script, not the page.
- **Copyrighted external material:** none.
- **Next review:** 2026-11-09, or earlier if the Skill contract, visual system,
  case boundary, or screenshot evidence changes.
- **Owner:** curriculum maintainer.
