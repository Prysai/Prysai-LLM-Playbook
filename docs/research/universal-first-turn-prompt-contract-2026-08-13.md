# Universal first-turn prompt contract: a bounded beginner record

**Record label:** 2026-08-13

**Sources accessed:** 2026-08-13 (America/Los_Angeles)

**Status:** candidate research record. No prompt was run, no model was compared,
and no learner, source-quality, retention, transfer, or independent evaluation
was conducted for this record.

**Owner:** curriculum-maintainer

**Next review:** 2026-09-13, or before a card is adapted to a named product,
used in a study, or presented as evidence of a user outcome.

## Scope and question

This record proposes two small, original first-turn prompt cards for beginners:
one five-minute Spanish-practice exchange and one five-minute research-triage
exchange. They use ordinary text fields rather than a named product's syntax,
tool name, account setting, model name, or hidden instruction layer.

**Question:** Which first-turn fields are intelligible across several LLM
products while avoiding a claim that those products, their accounts, their
tools, or their outputs are equivalent?

Here, *universal* means only that a reader can express the same fields in plain
language when moving between products. It does **not** mean that OpenAI,
Anthropic, Google, Microsoft, and Meta products offer the same models,
features, tools, context handling, data controls, prices, availability,
permissions, responses, or safety behavior. A reader must check the current
documentation for the product and surface they actually use.

The cards are deliberately bounded: no account access, browsing, voice,
upload, contact, purchase, publication, code execution, health, legal,
financial, employment, or educational-placement decision is requested. A
reader should not paste private records, credentials, personal identifiers, or
confidential research material into a product without first understanding the
applicable data controls and authorization.

## Evidence classes and claim boundary

| Class | Use in this record | It does not establish |
| --- | --- | --- |
| official fact | A product owner's published prompt guidance, kept within that owner's stated product scope. | Cross-product equivalence, output correctness, or educational effectiveness. |
| public user report | One dated author's reported need or difficulty. | Prevalence, a current product fact, a root cause, or a validated remedy. |
| community suggestion | No item is retained in this record. | Official guidance or effectiveness evidence. |
| local reproduction | None; `not_run`. | Behavior in any product or any user result. |
| project inference | A conservative card design that makes intent, limits, and a receipt visible. | That the card works until a suitable evaluation is run. |

`not_run` is a state, not evidence. It means this record has no observed
completion time, model behavior, quality score, learner response, language
assessment, citation check, or transfer result.

## Official guidance: separately scoped, not pooled into a product claim

The five official pages below are hosted by different organizations and remain
product-specific. Each publishes a prompt-design guide in its own documentation.
Within the page's stated scope, OpenAI discusses instructions, context,
examples, and evaluation of prompts; Anthropic asks authors to define success
criteria and an empirical test before optimizing a prompt; Google describes
clear, specific instructions and examples as prompt-design strategies;
Microsoft describes instruction, primary content, and examples as elements of
prompt engineering; and Meta publishes a Llama prompting guide.

These are five distinct official facts, not one combined benchmark. They
support the following narrow **project inference** only: a beginner's first
turn should make the task, available context, requested response, constraint,
and stopping or checking condition explicit. The sources do not establish that
these fields are necessary, sufficient, optimal, stable across products, or
effective for language learning or research.

## Two dated public signals, kept narrow

The following reports are included only to make two plausible beginner needs
visible. They are not copied into a teaching asset and are not used as product
facts.

| ID | Dated public report | Narrow signal retained | Strict boundary |
| --- | --- | --- | --- |
| U1 | OpenAI Community, [*Learn languages at the same time*][U1], posted 2024-12-03; accessed 2026-08-13 | One author wanted longer language-practice sessions and described a perceived use limit. | One person's goal and perceived constraint; not a current quota, a demand estimate, or evidence that any prompt produces learning. |
| U2 | OpenAI Community, [*Long instruction prompt on short input data*][U2], posted 2024-06-24; accessed 2026-08-13 | One author described repeatedly sending long instructions with small changing inputs and asked about a better interaction pattern. | One reported workflow concern; not evidence about first-turn prompts, all products, model memory, cost, or a recommended configuration. |

**Project inference:** a short first turn with a visible task boundary and a
small receipt is more inspectable than a broad request such as "teach me a
language" or "research this." It is not a proven solution to access limits,
instruction persistence, difficulty control, or answer quality.

## Candidate first-turn contract

The contract is original project wording. It is a checklist for composing a
request, not a command grammar or a promise about how a system will interpret
it.

| Field | What the reader supplies | Why the field is present | Do not infer |
| --- | --- | --- | --- |
| **One outcome** | One small, observable result for this session. | Separates a next action from a broad aspiration. | Mastery, fluency, expertise, or a guarantee of completion. |
| **Starting context** | A small self-authored sample, known facts, supplied sources, or `unknown`. | Shows what the response may rely on. | A valid assessment of the reader or the source material. |
| **Requested response** | A bounded response shape, length, or sequence. | Gives the reader something inspectable to save or reject. | Correctness, relevance, or compliance. |
| **Limits** | Data not to share, actions not to take, and assistance not requested. | Keeps authority and side effects explicit. | Full privacy, security, or policy compliance. |
| **Check** | A question, source condition, or revision request that exposes uncertainty. | Prevents an answer from being treated as self-validating. | Verified facts, teaching quality, or a reliable score. |
| **Stop and receipt** | A condition that ends the session and the small record to keep. | Makes incompleteness and next steps visible. | Retention, transfer, or a completed real-world task. |

## Prompt card A: five-minute Spanish practice

This is an original, low-stakes exercise pattern. It asks for a short written
exchange; it does not assess a person, assign a CEFR or other proficiency
level, use voice, browse, or make a claim about real-world communication.

### Use only if

- the topic is ordinary and non-sensitive, such as greeting someone or ordering
  a drink;
- the reader can keep the attempt to a few sentences; and
- the reader will treat corrections as suggestions to check, not as an
  authoritative language assessment.

### Original card

~~~text
I have five minutes for beginner Spanish practice.

Outcome: I want to write one polite two-sentence reply for [a simple situation].
Starting context: [words I know, a self-written attempt, or "unknown"].

Give me one short situation and wait for my reply. Do not assign a level or
claim that I have learned Spanish. After I reply, point out at most two changes
that would most affect meaning or politeness. For each change, say whether you
are uncertain. Ask me for one revision.

Do not use personal information, browse, contact anyone, or turn this into a
study plan. End by listing: my first reply, my revision, help used, one thing I
should check elsewhere, and the smallest next practice or stop condition.
~~~

### What a five-minute receipt can show

At most, the receipt can show that a reader made a short attempt, received
disclosed assistance, and revised it during one recorded session. It cannot
show Spanish acquisition, correct grammar, appropriate register, independent
performance, retention, transfer, or a language level. If a correction affects
a real message, the reader should use an appropriate human or authoritative
reference before relying on it.

## Prompt card B: five-minute research triage

This card is for making a next research step inspectable, not for producing a
finished answer or a citation-shaped response. It relies only on material the
reader supplies in the current conversation unless the reader separately grants
and verifies a product's documented research or browsing capability.

### Use only if

- the question is narrow enough to state in one sentence;
- no high-stakes conclusion will be made from the result; and
- the reader can retain the source URLs or document titles used for a later
  check.

### Original card

~~~text
I have five minutes to prepare a research check, not a final answer.

Question: [one narrow question].
Material I supplied: [URLs, titles, excerpts, or "none"].

First, restate the question and name what evidence would be needed. Then make a
three-row table with: possible claim, supplied source or "missing", and what
would need checking. Do not invent citations, state that you opened a source
you cannot access, or give a recommendation. Separate fact, report, and
inference. If the material is missing, contradictory, personal, or high stakes,
stop and tell me the smallest safe next step.

End with: sources actually supplied, unknowns, and one question I should answer
before continuing.
~~~

### What the card does not solve

The card cannot prove that a source exists, is current, is represented fairly,
or supports a claim. It cannot establish factual correctness, completeness,
scholarly quality, legal sufficiency, or a safe decision. A generated URL,
quote, summary, table, or confidence statement is not evidence on its own.

## The seven-day language-learning boundary

This record does **not** prove that a person can or cannot learn Spanish, or
any other language, in seven days. A seven-day claim would require at least a
defined learner baseline, a stated target capability, an account of practice
and assistance, an assessment task, scoring criteria, scorer independence,
retention interval, and a transfer condition. None were collected here.

Completing seven daily chats, or completing either card once, is not evidence
of fluency, a proficiency level, retention, independent communication ability,
or a causal effect from an LLM. The official prompt guides do not fill those
evidence gaps, and neither individual public report is a learning study.

## What is not established

This record does **not** establish:

- that the two cards improve language learning, research ability, or prompting;
- that any named LLM product follows the cards in the same way;
- that a response, correction, citation, or summary is correct;
- that a product can assess a learner, verify a source, or make a high-stakes
  decision;
- that U1 or U2 is common, current, caused by a product, or addressed by this
  contract;
- that a session takes five minutes for any reader or product;
- that seven days yields fluency, retention, transfer, or a proficiency level;
  or
- that this record received learner testing, independent review, security
  assessment, or production-readiness approval.

## Source, reuse, and license boundary

This is an original Prysai Lab synthesis. The two prompt cards and the contract
were written for this record; they are not copied or adapted from external
prompts, vendor examples, forum prose, assessment items, code, screenshots,
images, logos, credentials, or user data. This record links to and briefly
paraphrases external documents only. Their terms, licenses, product scopes, and
availability remain with their respective owners and may change.

The public reports are reference-only signals. Their text, author identity,
and associated content are not incorporated into reader-facing teaching
material. Product-specific adaptation requires fresh review of the target
surface's current documentation and applicable terms.

## Source ledger

| ID | Evidence class | Source and access date | Scoped use | Owner / next review | Does not prove |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI, [*Prompt engineering*][O1], accessed 2026-08-13 | Product-scoped OpenAI guidance on instructions, context, examples, and evaluating prompts. | facts-maintainer / 2026-09-13 | Behavior of another product, output correctness, or learning efficacy. |
| O2 | official fact | Anthropic, [*Prompt engineering overview*][O2], accessed 2026-08-13 | Product-scoped Anthropic guidance on defining success criteria and an empirical test before prompt optimization. | facts-maintainer / 2026-09-13 | Behavior of another product, prompt effectiveness, or learner outcomes. |
| O3 | official fact | Google AI for Developers, [*Prompt design strategies*][O3], accessed 2026-08-13 | Product-scoped Google guidance on clear, specific instructions and examples. | facts-maintainer / 2026-09-13 | Behavior of another product, source correctness, or language outcomes. |
| O4 | official fact | Microsoft Learn, [*Prompt engineering techniques*][O4], accessed 2026-08-13 | Product-scoped Microsoft guidance on prompt elements including instruction, primary content, and examples. | facts-maintainer / 2026-09-13 | Behavior of another product, model equivalence, or research quality. |
| O5 | official fact | Meta for Developers, [*Prompt engineering*][O5], accessed 2026-08-13 | Product-scoped Meta Llama prompting guidance. | facts-maintainer / 2026-09-13 | Behavior of another product, output correctness, or a beginner result. |
| U1 | public user report | OpenAI Community, [*Learn languages at the same time*][U1], posted 2024-12-03; accessed 2026-08-13 | One author's stated language-practice goal and perceived use constraint. | curriculum-maintainer / 2026-09-13 | Prevalence, current product limits, learning outcome, or a remedy. |
| U2 | public user report | OpenAI Community, [*Long instruction prompt on short input data*][U2], posted 2024-06-24; accessed 2026-08-13 | One author's reported repeated-instruction workflow concern. | curriculum-maintainer / 2026-09-13 | Prevalence, root cause, current product behavior, or an endorsed pattern. |
| P1 | project inference | This record's universal first-turn prompt contract and two cards | A bounded, product-neutral way to make a first request inspectable. | curriculum-maintainer / `not_run` pending an authorized evaluation | Product equivalence, output correctness, learning efficacy, or completion time. |
| L1 | local reproduction | None; `not_run` | No prompt, model, product, or learner run occurred. | curriculum-maintainer / `not_run` | Any behavioral, quality, or learner result. |
| C1 | community suggestion | None retained | No community recommendation was needed for the limited claim. | curriculum-maintainer / `not_run` | Demand, best practice, or effectiveness. |

## Stop record and unresolved evidence gaps

Research stopped after five separately owned official guides and two dated,
traceable public reports were checked. No account was used, no model was
queried, no personal data was collected, and no cross-product comparison was
attempted.

Unresolved evidence gaps include whether beginners understand either card,
whether they can complete it in five minutes, whether product surfaces accept
the wording consistently, whether outputs are accurate, whether corrections are
appropriate, and whether any practice persists or transfers beyond the session.
A future evaluation would need an authorized protocol, a declared task and
environment, consent and data boundaries where people participate, recorded
product conditions, and suitable independent checking before any efficacy or
quality claim is made.

[O1]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O2]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[O3]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[O4]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
[O5]: https://www.llama.com/docs/how-to-guides/prompting/
[U1]: https://community.openai.com/t/learn-languages-at-the-same-time/1040799
[U2]: https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381
