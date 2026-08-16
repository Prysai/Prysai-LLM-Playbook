# A cited answer is not a retrieval-scope receipt

**Accessed:** 2026-08-15 (America/Los_Angeles)

**Status:** candidate research record / `not_run`

**Owner:** research-systems-maintainer
**Next review:** 2026-09-15, or before this gap is turned into a learner card,
Skill requirement, named-product claim, or evaluation criterion.

## Research question

What small, beginner-relevant problem remains after a reader has written a
source plan and checked an individual citation: can the reader tell whether
the *set of retrieved sources* actually followed the requested language,
region, date, source-type, or domain constraints?

This is a question about the evidence needed to describe one research sample.
It is not a test of any search product, a claim that a model ignores a given
instruction, or a recommendation to use a particular API, provider, or model.

## Existing-material check and narrow delta

The Playbook already has substantial, non-duplicative foundations:

- Route C1 in
  [`book/communication-clinic-EN.md`](../../book/communication-clinic-EN.md)
  asks a learner to define inclusion, exclusion, freshness, material claims,
  and source class before retrieval.
- Route C2 asks for source owner, exact location, access date, direct support,
  scope, conflict, and unknowns; its six-message route requires an opened
  source record.
- Chapter 15 asks researchers to log source scope, language, geographic and
  account context, query terms, hits, and exclusions.

Those controls prevent many failures. The narrow remaining gap is different:
none of these beginner-facing routes currently requires a **retrieval-scope
receipt** that records, for *each returned source*, whether it met the frozen
selection rule before a claim is synthesized. A valid citation can be genuine
yet still be insufficient evidence that the research sample was English-only,
primary-only, current to a stated cutoff, or limited to an intended region.

`retrieval-scope receipt` is an original project term in this record. It means
a small, inspectable list of the declared selection rules, the available trace
of consulted sources, and an `included`, `excluded`, or `unknown` disposition
for each source. It is not an assertion that a search system exposes every
retrieval event, that a source is authoritative, or that the resulting answer
is correct.

## Evidence classes

| Class | Meaning here | Does not establish |
| --- | --- | --- |
| `official fact` | A product owner documents one product's web-search controls or trace fields. | The behavior of ChatGPT, Codex, Claude Code, Grok, another provider, or this project. |
| `public user report` | An author describes a problem in the original public forum thread. | Prevalence, reproduction, root cause, present behavior, or a verified remedy. |
| `project inference` | A deliberately limited teaching design based on the evidence and current material audit. | That a learner, model, or workflow follows it successfully. |
| `not_run` | No query, model run, API request, learner session, or independent review was performed for this record. | Any accuracy, completeness, safety, learning, or efficiency outcome. |

## Direct evidence

### 1. A stated source-language preference is not evidence that every result followed it

One OpenAI Community author reported repeatedly asking ChatGPT to search only
English-language sources, but described receiving Czech sources in new
conversations instead. The author stated that the problem persisted after
multiple attempts to correct the preference [U1]. This is a direct report of
one user's experience and need; it does not establish a current ChatGPT bug,
the product's defaults, the cause of the behavior, or its frequency.

The relevant beginner failure is therefore not “the system is known to ignore
language preferences.” It is: **a sentence saying that a preference was set is
weaker evidence than checking the actual returned sources against that
preference.** The same reasoning applies to region, domain, source type, and
date constraints.

### 2. Visible links may not describe the full consulted-source set

Another OpenAI Community author asked whether URLs returned as annotations in
an API response were necessarily the sources used to form the answer, and
asked how to obtain the same citations visible in the browser product [U2].
This is a question and reported uncertainty from one original thread, not an
official account of API behavior.

OpenAI's current Web search API documentation distinguishes inline citations
from a `sources` field: it says inline citations show only the most relevant
references, while `sources` returns the complete list of URLs consulted when
forming a response [O1]. The same documentation describes domain filtering
and approximate user-location controls for the specified API surface [O1].
These are volatile, API-specific facts. They do not say that ordinary ChatGPT
search exposes the same trace, that any source-language preference persists,
or that a complete consulted-URL list proves an answer is accurate.

## Project inference: check selection conformance before claim support

When a research request includes material selection rules, the first evidence
question after retrieval should be: **what trace is available, and which
returned sources conform to the frozen rules?** Do this before treating any
answer as a sample from the requested scope.

For a low-risk, read-only practice, a future learner artifact could use this
original schema:

```text
question and decision:
selection rules: source class | language | region/jurisdiction | date cutoff |
  permitted or blocked domains | exclusions
available trace: full consulted-source list | visible citations only |
  user-supplied list | no trace

source | owner | URL | observed language | observed region/scope |
publication/revision date | rule disposition: included / excluded / unknown |
reason and location of check

coverage status: complete only for the available trace; otherwise partial or unknown
stop: do not claim that the requested source set was used when the trace or
  a decision-critical attribute is missing
```

The `available trace` field is essential. If the surface shows only a few
citations, the receipt may truthfully evaluate only those citations. It must
not upgrade that partial view into “all retrieved sources followed the rule.”
If the source's language, geographic applicability, publication/revision date,
or ownership cannot be checked, preserve `unknown`; do not infer it from a
title, a model label, a browser locale, or a URL suffix alone.

This complements, rather than replaces, the existing source plan, claim
ledger, citation check, and conflict record. A source can be `included` for
selection conformance but still be weak, outdated, irrelevant to a particular
claim, inaccessible, unsafe to share, or unsuitable for a consequential
decision. Conversely, an `excluded` source may be a useful lead for a later,
separately scoped search; exclusion is not proof that it is false or low
quality.

## Smallest safe teaching implication

Do not add a new browsing requirement, API dependency, or platform-specific
claim from this receipt alone. A synthetic fixture with three fictional public
pages is enough to practise the distinction:

1. freeze a rule such as “English, primary-owner pages published or revised
   after [date]”;
2. give the learner only the fictional source list and scoped metadata;
3. require `included`, `excluded`, or `unknown` for each page; and
4. stop before factual synthesis when the available list is partial or a
   decision-critical attribute is missing.

The acceptance artifact would be the frozen rule, the supplied-list boundary,
one disposition per source, and a stop reason. It would show only that the
fixed fictional items were labeled under the rule. It would not demonstrate
web-research ability, source quality judgment, product behavior, or learning
transfer.

## Explicit non-claims

This source receipt does **not** establish that:

- ChatGPT, the OpenAI API, Codex, Claude Code, Grok, or any other LLM product
  currently ignores language, region, domain, date, or source-type requests;
- a full consulted-source list is available, complete, stable, or suitable for
  audit on any particular product surface;
- the listed sources were read correctly, support the answer, are primary,
  current, unbiased, legal to reuse, or appropriate for the decision;
- source constraints eliminate hallucination, prompt injection, selection
  bias, privacy risk, or unsafe action;
- a learner can create, interpret, or act on this receipt after reading it;
- this record supplies a model run, API reproduction, learner observation,
  independent review, security assessment, learning outcome, efficiency
  result, public-release decision, or production-readiness evidence.

## Source ledger and reuse boundary

| ID | Evidence class | Original source | Accessed | Scoped support and limit |
| --- | --- | --- | --- | --- |
| O1 | official fact | [OpenAI API documentation: Web search](https://developers.openai.com/api/docs/guides/tools-web-search) | 2026-08-15 | The documented Responses API surface distinguishes inline citations from the complete `sources` list and documents domain/location controls. It does not establish behavior for another OpenAI surface or provider, a user preference, or an outcome. |
| U1 | public user report | [OpenAI Community: “ChatGPT ignores search preference for English sources”](https://community.openai.com/t/chatgpt-ignores-search-preference-for-english-sources/1133146) | 2026-08-15 | One author reported that an English-source preference did not persist as expected and that Czech sources appeared. It is not reproduced, generalized, or treated as official fact. |
| U2 | public user report | [OpenAI Community: “Getting the real sources from API”](https://community.openai.com/t/getting-the-real-sources-from-api/1147905) | 2026-08-15 | One author asked whether annotations represented the sources used and how to obtain browser-visible citations. It records uncertainty, not a product-behavior conclusion. |

This is original Prysai Lab analysis and teaching-schema wording. It links to
the sources without copying forum text, source code, product assets, prompts,
screenshots, personal data, credentials, or external configuration. The
sources remain under their owners' terms. It now informs the project-owned,
fictional [Card C3 source-set scope check](../../book/communication-clinic-EN.md#retrieval-scope-receipt).
That card adds no browsing requirement, API dependency, new Skill, platform
claim, or outcome claim.

## Review trigger

Review this record before changing the learner-facing source-set scope card,
asserting a product's source-trace behavior, citing a feature-specific control,
or interpreting any learner, model, or search result. Recheck O1 when its
documented source-trace, filtering, or location behavior changes; keep U1 and
U2 as dated user reports rather than evergreen product facts.
