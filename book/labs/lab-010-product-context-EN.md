<!-- content_id: lab-010-product-context | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

---
id: lab-010-product-context
title: "Build shared product context that survives two tasks"
level: L3
domain: marketing
goal: "Create a small versioned product record that reduces repeated explanation while keeping facts, assumptions, positioning choices, and missing evidence distinct"
setup: "A fictional or sanitized product, two low-risk marketing tasks, and a version-controlled product-context file with no live campaign connections"
task: "Build minimum context, use it for a product explanation and measurement plan, change one positioning decision, and inspect the resulting output differences"
evidence:
  - "Two versions of the product context with field provenance, confidence, owner, and review date"
  - "A product explanation and measurement plan that cite the fields they used and list assumptions"
  - "The positioning decision diff, downstream output diff, metric rationale, and unresolved evidence gaps"
failure_variant: "Remove the audience or target action and verify that the workflow requests missing context instead of inventing a segment, quote, or metric"
reflection: "Which fields were reused, which change altered a real decision, and where did polished language hide weak evidence?"
status: draft
last_verified: "not run"
transfer_task: "Move the same minimum-context contract to a sanitized engineering tool, research service, or internal content project"
transfer_domain: "product engineering, research services, content, or marketing"
transfer_evidence: "Keep context revisions, provenance, assumptions, two task outputs, diffs, metric limitations, and missing-field behavior"
transfer_limitations: "Shared context reduces repetition but does not establish factual truth, genuine customer language, market response, attribution, or strategic approval"
---

# Lab 010: Build shared product context that survives two tasks

## Learning objective

Create one small source of product truth that two different tasks can reuse.
The goal is consistency with visible uncertainty, not a large brand document or
a smoother way to repeat unsupported positioning.

## Setup

Use a fictional product or sanitized public information. Do not include a
customer list, private research, internal revenue, unpublished strategy, or
personal data. The exercise must not connect to email, advertising, analytics,
CRM, publishing, or live website systems.

Create `product-context-v1.md` with these fields:

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

For every field add `source`, `status: fact | assumption | decision | unknown`,
`confidence`, `owner`, and `next_review`. Empty evidence stays empty; do not
convert an assumption into a customer quote.

## Task and experiment

Use the same context for two tasks:

1. write a concise product explanation for the named audience;
2. design a measurement plan for one real decision, such as whether readers
   understand the product well enough to choose the next step.

Both outputs must list the context fields used, assumptions made, and facts that
still require validation. For each metric record the target action, data source,
observation window, decision rule, and limitation. A proposed metric is a plan,
not a measured result.

Now change one positioning decision, increment the context version, state the
reason, and regenerate both outputs. Compare the context diff and output diff.
Identify which changes are required by the decision and which are merely prose
variation.

## Evidence to keep

Keep both context versions, field provenance, change reason, both task outputs
for both versions, diffs, metric map, and unresolved fields. A shorter prompt is
not sufficient evidence; show which repeated facts no longer had to be restated
and whether the second task used them correctly.

## Failure case

Remove either `audience` or `target_action`, then request both outputs again.
The correct behavior is to identify the missing decision, narrow the output, or
ask for it. Inventing a segment, customer quotation, conversion event, or market
result fails the lab even if the prose sounds plausible.

## Acceptance checklist

- [ ] Facts, assumptions, decisions, and unknowns are visibly distinct.
- [ ] Every material field has provenance, owner, and review status.
- [ ] Both tasks reuse one context revision and name the fields used.
- [ ] The positioning update has a reason and inspectable downstream diff.
- [ ] Metrics map to a decision and are not described as observed results.
- [ ] No live publishing, outreach, tracking, spending, or private-data use occurred.

## Reflection and transfer

Which fields actually reduced repeated explanation? Which field created the
largest downstream decision change? Transfer the context to a different domain
and remove marketing-only language; record what survives and what requires a
new owner or evidence source.

