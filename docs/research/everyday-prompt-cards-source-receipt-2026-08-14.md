# Everyday prompt cards: source receipt

**Status:** research candidate

**Accessed:** 2026-08-14 (America/Los_Angeles)

**Owner:** curriculum-maintainer

**Next review:** 2026-11-14, or before either candidate becomes a lab, is
adapted to a named product, or is described as evidence of a learner or
research outcome.

## Question and scope

What durable public evidence can justify three very small, beginner-facing LLM
prompt-card candidates without claiming that an LLM teaches a language,
browses the web, validates citations, or completes research?

The candidates are deliberately limited to:

1. a four-turn fictional Spanish hotel exchange in which the learner writes
   before receiving help;
2. a fictional planning attempt in which the learner writes before receiving
   one small hint and then tries a single changed constraint; and
3. source-check preparation in which the model helps structure a question and
   the likely owners of evidence before any answer is drafted.

This is a source receipt, not a prompt pack, an evaluation, a language
assessment, or a research report. No candidate was run in this repository.
No learner, model, source audit, delayed task, or independent scorer was
observed.

## Evidence classes

| Class | Meaning in this receipt | Does not establish |
| --- | --- | --- |
| Official fact | A statement limited to guidance published by the organization that owns it. | Cross-model equivalence, output correctness, or effectiveness of either card. |
| Research finding | A result reported by the original study under its stated conditions. | Language proficiency, LLM tutoring effectiveness, or a universal study method. |
| Public user report | None retained here. Earlier public reports are not treated as evidence for this receipt. | Demand, prevalence, a product fact, or a validated remedy. |
| Project inference | An original Prysai design choice that makes an attempt, boundary, and uncertainty visible. | That the design works until it is evaluated. |
| `not_run` | An evaluation or observation has not been performed. | Any outcome that the missing observation would measure. |

## Candidate A: a short Spanish exchange

### Narrow learner need

The card should turn “help me learn Spanish” into one bounded, learner-authored
exchange: one everyday situation, a short response limit, an attempt before
examples, and a small disclosed correction or revision step. The candidate is
not a diagnostic, a placement test, or a seven-day learning plan.

### What the sources support

- **Official fact:** the U.S. Institute of Education Sciences publishes an
  evidence-based practice guide on organizing instruction and study, including
  recommendations about using practice and spacing study over time [O1]. That
  supports keeping a first attempt and a later practice opportunity distinct;
  it does not evaluate an LLM or this card.
- **Research finding:** Roediger and Karpicke reported different immediate and
  delayed recall results after retrieval practice and restudy in their reported
  prose-learning experiments [R1]. That supports the conservative design
  choice to let a learner attempt a response before showing a model answer. It
  is not a study of Spanish, conversation, or AI assistance.
- **Official facts:** OpenAI and Anthropic each publish product-specific prompt
  engineering guidance [O2][O3]. Taken separately, they support the modest
  observation that named products expose prompt-writing guidance. They do not
  prove that either card will be interpreted the same way across products.

### Candidate design boundary

This receipt supports only the following **project inference**: the Spanish
card should ask for a single, observable exchange and preserve the learner's
first response, any help supplied, and the learner's own revision. It should
not award a CEFR/ACTFL level, infer a learning style, or say that a learner is
fluent, has mastered Spanish, or will learn Spanish in any fixed number of
days. In particular, it does **not promise Spanish fluency**.

The candidate must state that model corrections are suggestions to inspect.
They are not an authoritative language assessment, a guarantee of correctness,
or evidence that the learner can perform independently in a real conversation.

## Candidate B: one observable planning attempt

### Narrow learner need

The card should turn “help me make a plan” into one harmless, learner-authored
attempt: a fictional situation, three visible constraints, a time box, a fixed
check, one limited hint, and one changed constraint. The candidate is not a
calendar, travel, health, financial, safety, or other real-world decision aid.

### What the sources support

- **Official fact and research finding:** the instructional-practice and
  retrieval-practice records already listed as [O1] and [R1] support the
  narrow design choice to preserve a learner attempt and distinguish it from a
  later revision. They do not evaluate planning, feedback quality, transfer,
  or this card.
- **Official facts:** the product-owned prompt-guidance records [O2] and [O3]
  support keeping the candidate as ordinary text, rather than claiming that a
  named product, tool, or special prompt syntax is required. They do not prove
  cross-product behavior or a successful task.

### Candidate design boundary

This receipt supports only the following **project inference**: a short,
fictional plan can make attempt, constraint, correction, and changed-case
evidence visible before a learner requests more help. The model must not
replace the first attempt, recommend a real-world course of action, infer
planning ability, or report an outcome beyond the saved interaction.

The card must name its fictional setting and leave personal, private,
consequential, or current factual inputs out. A pass on the first plan can at
most support `demonstrated_on_this_task`; a comparable unassisted changed-time
attempt can at most support `transferred_to_time_limit_variation`. Neither
state demonstrates general planning skill, judgement, retention, safety, or
independent performance.

## Candidate C: source-check preparation, not an answer

### Narrow researcher need

The card should help a beginner prepare a source check before requesting a
conclusion: reduce one question to a few atomic claims, identify a likely
source owner or source type for each claim, record the date or version that
may matter, and leave unknowns visible. It must stop before pretending that a
source was opened, that a citation was validated, or that a search was
complete.

### What the sources support

- **Official fact:** the Association of College and Research Libraries frames
  authority as contextual, research as inquiry, and searching as strategic
  exploration [O4]. That supports recording the context and owner of a source
  rather than treating an LLM's confident answer as self-validating. It does
  not prove that a specific source is correct, complete, current, or suitable
  for every claim.
- **Official fact:** OpenAI and Anthropic each maintain prompt-engineering
  documentation for their own products [O2][O3]. That supports keeping the
  card in ordinary text fields rather than presenting vendor-specific syntax
  as a universal requirement. It does not establish that those products browse,
  inspect URLs, retrieve current information, or generate valid citations in a
  given account or session.

### Candidate design boundary

This receipt supports only the following **project inference**: a beginner can
make a future source check more inspectable by asking for a claim map, likely
source owners, dates or versions to verify, and unresolved questions *before*
asking for a synthesis. The model may propose possibilities; the reader must
inspect the underlying sources directly and record what was actually accessed.

The card must say “prepare a source check” rather than “research this for me.”
It must not claim browsing, source access, citation validation, exhaustive
search, factual correctness, a recommendation, or any research outcome. It
does **not claim browsing** and must never invent titles, URLs, quotations,
access dates, or source content.

## Current reader integration

The three cards are now projected as clearly labeled **candidate** cards at the
[site's first practical entry point](../../site/index.html). This is a static
reader integration, not a learner, model, or source-check run. The Spanish
card uses the original Route A1 fictional hotel record, the planning card uses
the original Route B learning pattern, and the research card remains a separate
preparation exercise in the
[Beginner Practice Pack](../../book/communication-clinic-EN.md).

| Card | Reader can reasonably receive | Required visible limit | Link target |
| --- | --- | --- | --- |
| Four-turn fictional Spanish hotel exchange | A bounded first attempt, disclosed help, and learner revision to inspect. | Not fluency, placement, certification, or a seven-day result. | The existing language-practice route. |
| Fictional park-visit planning attempt | A bounded first plan, one hint, learner correction, and one changed-time attempt to inspect. | Not real-world advice, general planning ability, transfer beyond the named variation, or independent performance. | The existing observable-skill route. |
| Prepare a source check | A claim-and-source-owner preparation sheet with explicit unknowns. | Not browsing, citation validation, complete research, or an answer. | The existing bounded-research / first-turn contract. |

Use original project wording for any final cards. Do not copy a third party's
prompt, assessment item, forum post, screenshot, or tutorial structure. A
future run should log the card version, product/surface used, supplied context,
model output, learner action, sources actually inspected, and failure or stop
reason. Until that work exists, all three cards remain `candidate` and `not_run`.

## Source ledger

All URLs below were checked for availability on **2026-08-14**. Product
documentation is volatile and remains scoped to its owner; recheck it before
making a product-specific reader claim.

| ID | Evidence class | Source and URL | Scoped support | Claim limit |
| --- | --- | --- | --- | --- |
| O1 | Official fact | U.S. Institute of Education Sciences / What Works Clearinghouse, [*Organizing Instruction and Study to Improve Student Learning*](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) | A published evidence-based practice guide concerning study and instruction, including practice and spacing recommendations. | No evidence about LLM tutoring, Spanish fluency, a fixed schedule, or either candidate card. |
| R1 | Research finding | Roediger & Karpicke (2006), [*Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention*](https://pubmed.ncbi.nlm.nih.gov/16507066/), DOI [10.1111/j.1467-9280.2006.01693.x](https://doi.org/10.1111/j.1467-9280.2006.01693.x) | The reported experiments compared retrieval testing and restudy for prose learning under their stated conditions. | No proof about second-language proficiency, conversation, LLM feedback, or this curriculum. |
| O2 | Official fact | OpenAI, [*Prompt engineering*](https://developers.openai.com/api/docs/guides/prompt-engineering) | OpenAI maintains a product-owner guide for prompt engineering in its developer documentation. | No cross-platform behavior, output correctness, browsing, citation validation, or learner outcome. |
| O3 | Official fact | Anthropic, [*Prompt engineering overview*](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | Anthropic maintains a product-owner overview of prompt engineering for Claude. | No statement about OpenAI, other LLMs, output correctness, browsing, citation validation, or learner outcome. |
| O4 | Official fact | Association of College and Research Libraries, [*Framework for Information Literacy for Higher Education*](https://www.ala.org/acrl/standards/ilframework) | Its published frames include “Authority Is Constructed and Contextual,” “Research as Inquiry,” and “Searching as Strategic Exploration.” | No guarantee of factual accuracy, source suitability, citation correctness, or complete discovery. |

## Reuse, claim, and stop receipt

This is an original Prysai Lab synthesis. It copies no external prompt wording,
assessment item, source text, visual, screenshot, forum post, or tutorial
structure. The cited sources remain subject to their owners' terms.

Research stopped after identifying primary owners for instructional guidance,
original retrieval-practice research, information-literacy framing, and
product-owned prompt guidance. The attempted live checks found the listed
sources available on the stated date; availability alone is not a substantive
review or a result. No public-user report was needed to justify either narrow
candidate, and no claim is made about demand or effectiveness.

**Unresolved evidence:** learner comprehension, behavior in a named product,
quality of model corrections, safety under real user data, source-audit
accuracy, delayed retention, transfer, and independent review are all
`not_run`.
