# Source-shaped LLM answers: a beginner check before belief

**Status:** candidate research record. This is a dated, source-bounded design
record for one fictional, text-only practice card. No learner session, model
run, browsing task, citation verification, product safety test, or source
quality assessment was performed.

## Question

What is the smallest safe first action when a beginner receives an LLM answer
that *looks* sourced but does not expose an inspectable source record?

## Scope and method

This record is deliberately narrower than a research workflow. It does not
tell a reader whether a claim is true. It asks the reader to distinguish a
citation-shaped marker from the record needed to investigate a material claim:
the claim, a source owner, a resolvable location, an access date, and the
supporting material in context.

The resulting teaching response is a fixed fictional exercise. It forbids
browsing, source retrieval, sharing data, and external action. A reader who
needs to establish a current fact must hand off to the existing Source
Investigator and Research Router routes.

## Evidence map

| ID | Evidence class | Source and access | What it supports | What it does not support |
| --- | --- | --- | --- | --- |
| O1 | official guidance | [OpenAI API safety best practices](https://platform.openai.com/docs/guides/safety-best-practices), accessed 2026-08-14 | OpenAI recommends human review of outputs before use, especially in high-stakes domains, and says reviewers should have access to the original material needed to verify an output. | The truth of any particular model answer, an independent audit, a product safety property, or that the Prysai card changes reader behavior. |
| O2 | official technical guidance | [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), accessed 2026-08-14 | NIST identifies confabulation as a generative-AI risk: content can be wrong while appearing plausible or confident. This supports treating generated support statements as candidates for review. | The rate of incorrect citations, the behavior of a named model, or the correctness of a specific source. |
| R1 | public user report | [OpenAI Developer Community report: hallucinated URLs and article titles](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893), accessed 2026-08-13 | One author reported apparently fabricated article titles and URLs in a web-enabled interaction. It is a useful failure signal for a source-record check. | A reproduced incident, root cause, prevalence, current product behavior, or a verified mitigation. |

## Curriculum decision

The project inference is intentionally modest: **a citation marker is not yet
an inspectable source record**. For a material claim, a learner should retain
the claim, source owner, URL or other resolvable location, access date, and
the passage or data that directly supports it. If one of those fields is
missing, the first honest state is `unverified`, not “probably correct.”

This is an editorial and evidence-handling rule derived from O1 and O2. It is
not a formal standard, a legal requirement, a guarantee that a complete record
is correct, or a substitute for qualified review.

## Low-risk teaching implication

Use a fictional answer that has a claim and a bracketed marker but no source
owner, URL, date, or supporting passage. Ask the learner to preserve the
missing fields rather than repair them with a plausible guess. The expected
receipt is:

```text
claim: [quoted from the fictional answer]
source record: missing
status: unverified — source record missing
next allowed check: locate the source owner and the supporting material
stop: do not invent a source, browse, publish, or act on the claim here
```

This produces a small decision artifact. It does not verify a source or a
claim. A real current-fact question begins only after the reader names the
claim and source owner in the Source Investigator route; a multi-source
question begins in the Research Router route.

## Failure and stop boundary

The exercise fails if a learner or model supplies a source, date, passage,
confidence score, or conclusion that the fictional card did not contain. Keep
the fabricated addition as the failure artifact and mark the source record
missing. Do not browse to rescue the example, turn the activity into a claim
about a real policy, or use the result to justify an external action.

Stop if the claim could affect health, law, employment, education, money,
safety, a private person, or a shared system. The card is not the right level
of review for that decision.

## Explicit non-claims

This record and its linked card do not establish:

- that any LLM citation is fabricated or reliable;
- that a complete source record makes a claim correct, current, unbiased, or
  appropriate to a decision;
- that a learner can evaluate sources, detect misinformation, resist prompt
  injection, or conduct research independently;
- product behavior, security, privacy, compliance, learning, retention,
  transfer, public-beta readiness, or production readiness.

## Source and license boundary

All reader-facing explanation, fictional content, receipt fields, and the
linked SVG are original Prysai Lab material. O1 and O2 remain linked,
reference-only source material under their owners' terms. R1 remains an
individual public report and is not copied or presented as an official fact.
The repository asset register records the distribution boundary.

## Review trigger

Review before changing the source-check card's claim, source fields, linked
product guidance, or safety scope; also review if OpenAI or NIST materially
changes the cited guidance, or after the first authorized learner observation.
