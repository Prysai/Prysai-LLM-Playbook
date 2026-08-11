# Skill case: Product Context → real-estate concept page

> `candidate` · local teaching case · collected 2026-08-11

This case makes one Skill's boundary observable without pretending that a
static mockup is customer research or a live marketing result.

## Case identity

- **Case ID:** `skill-case-product-context-real-estate-2026-08-11`
- **Problem:** How can a Product Context method shape a realistic downstream
  page while keeping synthetic assumptions separate from evidence?
- **Audience:** Learners at L3–L4 who are learning to design, select, or review
  a Skill.
- **Related Skill:** [`prysai-product-context`](../../skills/prysai-product-context/SKILL.md)
- **Related chapter:** [Chapter 17 — Marketing](../../book/chapters/17-marketing-track.md)
- **Related lab:** [Lab 010 — Shared Product Context](../../book/labs/lab-010-product-context.md)
- **Status:** `candidate`

## Source and license boundary

- **Source type:** project-owned synthetic brief.
- **Input:** [`brief.md`](../../examples/skill-sandbox/product-context-real-estate/brief.md)
- **Context draft:** [`context-draft.md`](../../examples/skill-sandbox/product-context-real-estate/context-draft.md)
- **Source URL:** none; no external source was used to populate the example.
- **Asset decision:** the HTML, CSS, inline SVG, and screenshot are original
  project artifacts created for this case. The page uses no external image,
  font, icon, code snippet, CDN, or remote request.
- **Usage boundary:** this case may demonstrate structure and evidence
  discipline inside this repository. It must not be presented as a real
  brokerage, listing, testimonial, market claim, or conversion benchmark.

## Synthetic input

The brief describes a fictional residential brokerage, a fictional audience of
first-time buyers, and a decision about message order and a low-pressure next
action. It explicitly supplies no customer interviews, analytics, testimonials,
live inventory, approved brand system, or market data.

## Skill boundary

The Product Context Skill is used here as a method to structure supplied
context. Its legitimate output is a bounded, non-authoritative draft containing
facts, hypotheses, decisions, evidence gaps, and downstream constraints.

It does not:

- perform customer research;
- prove that first-time buyers prefer the message;
- create or verify real property inventory;
- approve legal, brand, SEO, analytics, or conversion copy;
- publish a live page or collect leads; or
- turn the following static implementation into proof of business impact.

## What was implemented

The disposable sandbox contains three explicit layers:

```text
brief.md → context-draft.md → index.html + styles.css
```

The page includes a concept-page status label, a sample property card,
calm process language, a low-pressure action, and a visible “what this proves /
what it cannot prove” panel. Property attributes such as bedrooms, bathrooms,
area, and address are deliberately labelled as an illustrative example.

## Local rendering evidence

- **Server:** bundled Python static server, `python -m http.server 4174`
- **URL:** `http://127.0.0.1:4174/examples/skill-sandbox/product-context-real-estate/`
- **Viewport:** `1440 × 1100` CSS pixels
- **Expected external requests:** none
- **Screenshot artifact:** [`assets/cases/product-context-real-estate-desktop.png`](../../assets/cases/product-context-real-estate-desktop.png)
- **Evidence class:** `directly_observed` for local DOM/render state and saved
  screenshot; not evidence of Skill runtime execution or customer impact.

## Runtime status

The `prysai-product-context` Skill runtime was **not run as an independent live
Skill invocation** for this case. The context draft and static page are
project-owned implementations based on the Skill's documented contract. The
screenshot therefore documents only the local page at the recorded viewport.

## Minimal safe check

1. Read the brief and confirm that all facts are synthetic.
2. Read the context draft and verify every claim is labelled as observed,
   decision, hypothesis, or unknown.
3. Serve the directory locally with no network dependency.
4. Inspect the page title, synthetic status label, no-external-resource policy,
   and responsive layout.
5. Save the screenshot and record the viewport.

Stop if a request introduces real property data, personal information, lead
capture, analytics, external publication, or unsupported superiority claims.

## Acceptance and failure variant

The positive case passes when the page makes its audience, job, process, and
example-data boundary visible. The intentional failure variant is to remove the
`CONCEPT LISTING` and `CONCEPT PAGE / NO LIVE LISTINGS` labels: that version must be rejected
because a plausible listing card would be easy to misread as live inventory.

The transfer task is to apply the same context method to a fictional software
landing page, keeping the distinction between product facts, hypotheses, and
rendered output.

## Claims and non-claims

### This case can claim

- A synthetic brief was turned into a versioned draft structure.
- A static page was created from that draft.
- The page was locally rendered and captured at the recorded viewport.
- The screenshot and source files make the example-data boundary inspectable.

### This case must not claim

- The Product Context Skill automatically generated the page.
- Harbor & Key Realty is a real business or the listing is real.
- Buyers prefer this message or will convert because of it.
- The design is legally approved, accessible in every context, or production-ready.
- The page improves sales, enquiries, trust, speed, or price outcomes.

## Privacy, secrets, and maintenance

- **Personal data removed:** yes; no person is represented.
- **Secrets removed:** yes; no token, password, API key, private key, Cookie,
  `.env`, or login data is present.
- **Private paths removed:** yes; repository links are relative and the page has
  no local machine path.
- **Copyrighted material copied:** no; all page content and visuals are original
  for this project.
- **Next review:** 2026-11-09, or earlier if the Skill contract, case boundary,
  or screenshot evidence changes.
- **Owner:** curriculum maintainer.
