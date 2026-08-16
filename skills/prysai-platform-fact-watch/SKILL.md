---
name: prysai-platform-fact-watch
description: >
  Maintain current, named-platform teaching claims after a vendor document,
  product surface, permission, model, account path, or link may have changed.
  Use when a curriculum maintainer needs to identify affected chapters, Labs,
  Skills, routes, and temporary reader-facing limits for Codex, Claude Code,
  Grok, ChatGPT, Gemini, Copilot, or another named LLM platform. Do not use to
  retrieve facts, admit a new adapter, execute a platform, or compare models.
---

# Platform Fact Watch

Turn “this platform may have changed” into a small maintenance decision. This
Skill inventories existing claims and their blast radius. It does not browse,
run a product, make a release, or replace a source review.

## Start with a claim card

Require one named platform, one source-backed claim or claim ID, its current
reader-facing location, source owner and URL, last check date, scope, owner,
next review, and the reason for review. Treat a missing field as `unreviewed`,
not as a harmless blank.

Keep the claim narrow. “Claude Code has a permission mode” and “Grok Build has
an API route” are separate cards. Do not use a platform name, a feature label,
or an HTTP response as a substitute for a claim.

## Classify the change signal

Choose one status without inferring current product behavior:

- `review_due`: the scheduled review date has arrived or the source has not
  been checked at the declared interval;
- `source_changed`: a dated first-party source review reports a material
  difference from the recorded claim;
- `source_unavailable`: the cited source cannot presently support the claim;
- `scope_changed`: the claim may no longer apply to the named surface, account,
  region, version, or permission boundary;
- `no_change_recorded`: a dated first-party review found the same scoped claim;
- `unreviewed`: no suitable first-party review is available.

Do not choose `no_change_recorded` from memory, a redirected URL, a search
snippet, a community post, or a successful sign-in. A source check confirms a
statement only within its recorded date and scope.

## Map the affected teaching surface

List each affected canonical unit and label its role:

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

Stable-core principles such as explicit authority, evidence, recovery, and
least side effect normally remain usable. A product command, UI path,
permission default, price, entitlement, integration, or model availability is
an adapter fact and needs source review. Do not turn a source change into a
claim that the whole course is broken.

## Choose the smallest safe action

- `no_change_recorded`: keep the scoped wording and update only the review
  receipt; do not claim broader durability.
- `review_due` or `unreviewed`: retain the universal core, mark the named step
  for review, and hand off the current fact to
  `prysai-source-investigator`.
- `source_changed`, `source_unavailable`, or `scope_changed`: pause or remove
  the named instructional step until a source review establishes replacement
  wording. Preserve the prior record as historical evidence.
- if the change calls the adapter’s source, run, authority, or failure record
  into question: hand off the admission decision to
  `prysai-platform-adapter-review`.
- if a public claim, generated page, or release note already states the old
  fact: hand off the artifact packet to `prysai-evidence-review` before
  publishing a correction.

Never silently rewrite a product procedure from memory. Do not classify an
adapter as admitted, safe, equivalent, or production-ready from a freshness
receipt.

## Return a maintenance receipt

Return exactly one record containing the claim card, change status, affected
units, reader risk, safe interim text, source-review handoff, any adapter or
claim-audit handoff, owner, next review, and unknowns.

End with this limit: `This receipt manages the freshness boundary of one named
platform claim. It does not prove current product behavior, account access,
permission safety, runtime success, adapter admission, model quality, learner
outcome, or cross-platform equivalence.`

## Maintenance record

- `source`: original Prysai Lab maintenance method derived from ADR-0025, the
  content lifecycle, the fact-impact registry, and the source-bounded adapter
  admission record
- `license`: original rewrite; first-party platform documentation and public
  reports remain reference-only under `docs/sources/asset-register.md`
- `owner`: facts-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
