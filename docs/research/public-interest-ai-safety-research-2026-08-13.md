# Public-interest AI safety research: from a model question to an accountable decision

**Accessed:** 2026-08-13 (America/Los_Angeles)

**Status:** candidate research record. This is a source-bounded learning
supplement, not an impact assessment, compliance opinion, incident finding,
security certification, deployment approval, or proof that a control works.

**Owner:** security-research-maintainer

**Next review:** 2026-11-13, and before turning a framework statement into a
product-specific, organizational, legal, or public-service claim.

## Research question

When an AI-assisted output could inform, rank, recommend, filter, route, or
otherwise affect people, what questions help an operator move from the vague
claim “the model is safe” to a reviewable decision with a named owner, bounded
data, human control, recourse, and evidence?

This question is deliberately narrower than “How do we make AI safe?” It asks
what a beginner or team can *record before acting*. It does not determine
whether a particular use is ethical, lawful, fair, secure, appropriate, or
ready to deploy.

## Why this is a public-interest question

Technical controls matter: untrusted content, overly broad data access, and
unchecked tool actions can cause concrete harm. But a technical description is
not enough when a result changes another person's options. The person affected
may not be the person operating the tool; may not know an AI-assisted step was
used; may have less time, language access, money, or power to challenge an
error; and may have no usable correction route.

The [NIST Generative AI Profile][N1] frames generative-AI risk across human-AI
configuration, information integrity, data privacy, and harmful bias or
homogenization. The [OECD AI Principles][O1] include human rights and democratic
values, transparency and explainability, robustness, security and safety, and
accountability. The [UNESCO Recommendation on the Ethics of Artificial
Intelligence][U1] addresses human oversight and determination, transparency and
explainability, fairness and non-discrimination, privacy, and responsibility
and accountability.

These are authoritative frameworks and recommendations in their stated scopes.
They do **not** certify a model, evaluate this repository, establish what a
particular organization must do, prove that a proposed use will harm someone,
or supply a complete impact-assessment method.

## Evidence classes and boundaries

| Class | Used for in this note | It does not establish |
| --- | --- | --- |
| `official fact` | What an official framework describes as an AI governance concern or principle. | A product behavior, legal outcome, safe deployment, or effectiveness result. |
| `public user report` | A traceable person's reported symptom when separately identified. | Prevalence, root cause, an incident finding, or a sufficient remedy. |
| `project inference` | A conservative inquiry question derived from the cited frameworks. | That the question is a full assessment or prevents harm. |
| `not run` | A real system, personal record, affected population, or learner cohort was intentionally not tested. | Safety, fairness, privacy, accessibility, transfer, or public value. |

This record does not add a public user report. It deliberately avoids treating
an anecdote as a social-impact measurement. The existing [AI safety field
signals and research receipts](ai-safety-field-signals-and-research-receipts-2026-08-13.md)
record is the separate place where dated public reports are kept with their
scope limits. A future social-impact report must identify its report author or
repository, URL, access date, observed symptom, and evidence boundary before it
is used as a teaching signal.

## The five-question public-interest inquiry

| Question | Why it matters | Minimum evidence to record | Do not conclude |
| --- | --- | --- | --- |
| **What decision is proposed, and who owns it?** | A model task cannot supply a legitimate purpose or decision owner by itself. | Exact decision, accountable owner, affected context, and a condition that would change the decision. | “The tool is useful, therefore use is authorized.” |
| **Who could benefit, be burdened, be excluded, or need an explanation?** | Effects may fall on people other than the operator or direct user. | A provisional affected-people list that includes plausible non-users and stated uncertainty. | “No one is harmed” or “the list is representative.” |
| **What data enters, and what must stay out?** | Data scope changes privacy, dignity, error, and misuse risk. | Necessary fields, prohibited fields, origin, sensitivity, retention/transfer owner if known. | “Redacted” or “public” means risk-free. |
| **Who reviews, corrects, or stops a consequential result?** | A nominal human step is not the same as accountable review or recourse. | Reviewer role, review moment, override authority, correction path, and escalation owner — or `unknown`. | “Human in the loop” is sufficient. |
| **What evidence supports a claim, and what remains unknown?** | A polished answer can hide an unsupported factual or social conclusion. | Source ledger, observed artifacts, assumptions, disagreement, and stop receipt. | Fairness, accessibility, privacy, or effectiveness without relevant evidence. |

The table is a **project inference** based on the cited frameworks. It is an
inquiry aid, not a governance standard. A real proposal may require expertise
from affected communities, subject-matter professionals, security and privacy
teams, legal counsel, accessibility reviewers, and accountable organizational
owners. This card cannot replace them.

## A compact decision pathway

~~~
proposed use
  -> name the decision and accountable owner
  -> name affected people and unequal burdens
  -> minimize and classify the data boundary
  -> name review, correction, and stop authority
  -> inspect evidence and unknowns
  -> proceed only under separately authorized governance

missing owner / data boundary / recourse / evidence
  -> stop and record the gap
~~~

This is a pathway for *asking* and *recording*, not an automation flow. The
last line is essential: a missing field is a result that should remain visible,
not a blank the model is invited to fill with a plausible policy.

## Fixed fictional teaching conversion

The reader-facing [public-interest safety inquiry](../../book/communication-clinic-EN.md#public-interest-safety-route)
uses an imaginary community desk that wants an LLM to draft questions for a
human housing-support conversation. The exercise permits only a classification
receipt over a supplied fictional proposal. It forbids user records, applicant
ranking, eligibility prediction, automation, uploads, browsing, contact, or an
external effect.

The correct fixed-task outcome is deliberately modest:

- preserve that a human caseworker owns the next conversation;
- list people who could be affected beyond the model operator;
- prohibit applicant data and identify data ownership/correction as `unknown`;
- state that no outcome, fairness, privacy, or accessibility result exists; and
- stop before deployment, collection, or a decision about a person.

A completed receipt could show only that the declared fictional classification
was recorded. It cannot demonstrate that the scenario is safe, that a real
service is fair or accessible, that the model respects the boundary, that a
person can successfully appeal, or that the teaching activity changes behavior.

## Three levels of action, not three claims of maturity

### Individual — do not let a model create the missing policy

Use a synthetic or approved public scenario. Record the five questions, label
unknowns, and stop before real personal data, a consequential recommendation,
or an external action. Do not ask the model to decide someone's eligibility,
consent, legal rights, or moral worth.

### Team — make control and disagreement reviewable

Before a shared prototype can influence a person, name a decision owner,
reviewer, correction path, data steward, and escalation route. Preserve a
compact evidence ledger and reviewer disagreement. A team may decide not to
continue; refusal is a valid outcome when the needed owner or evidence is
missing.

### Organization — use an appropriate, authorized process

For a real consequential system, use the organization's authorized governance,
security, privacy, accessibility, legal, procurement, and community-engagement
processes. The source frameworks can inform those processes, but this project
does not prescribe, certify, or assess them. Do not convert this course card
into a production checklist by adding more model prompts.

## Source ledger

| ID | Source | Accessed | Scoped use | Owner and next review | Boundary |
| --- | --- | --- | --- | --- | --- |
| N1 | [NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*][N1] | 2026-08-13 | Risk framing for human-AI configuration, information integrity, data privacy, and harmful bias or homogenization. | security-research-maintainer; 2026-11-13 | A risk-management profile, not product documentation, a social-impact result, or a certification. |
| O1 | [OECD, *Recommendation of the Council on Artificial Intelligence*][O1] | 2026-08-13 | Principles for human rights and democratic values, transparency/explainability, robustness/security/safety, and accountability. | security-research-maintainer; 2026-11-13 | An international policy instrument, not a legal opinion or a deployment approval for this project. |
| U1 | [UNESCO, *Recommendation on the Ethics of Artificial Intelligence*][U1] | 2026-08-13 | Human oversight, transparency, fairness, privacy, responsibility, and accountability vocabulary. | security-research-maintainer; 2026-11-13 | A normative recommendation, not evidence that a system satisfies its values. |
| T1 | [OpenAI, “Safety in building agents”](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | Complementary technical boundary: untrusted content, sensitive data, tool approval, guardrails, and evaluation. | facts-maintainer; 2026-09-13 | Agent-workflow guidance only; not a complete public-interest assessment. |

## Source and license boundary

This is an original Prysai Lab synthesis. It uses links and short paraphrases;
it imports no external text, image, logo, prompt, code, dataset, incident
record, credential, user report, or model output. Linked sources remain subject
to their own terms and notices. The reader-facing visual and fixed fictional
case are original project-owned teaching material; they are not adapted from a
framework's form or assessment instrument.

## Explicit limits and next evidence

This record does **not** establish:

- a measured need, impact, or viewpoint of any affected population;
- the fairness, accessibility, privacy, security, legality, or appropriateness
  of a particular AI system or decision;
- a real model's behavior, a product's control surface, or a tool's permission;
- that a person can exercise meaningful consent, correction, explanation, or
  appeal; or
- learner comprehension, transfer, retention, community acceptance, or
  production readiness.

The next legitimate evidence depends on the proposed use and must be separately
authorized. It could include a privacy review, an accessibility assessment,
consultation with affected communities, a scoped technical evaluation, an
independent review, or a consented learner pilot. None should begin by sending
personal data, enrolling people, or acting on another person's behalf merely to
make the exercise look realistic.

[N1]: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
[O1]: https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449
[U1]: https://www.unesco.org/en/legal-affairs/recommendation-ethics-artificial-intelligence
