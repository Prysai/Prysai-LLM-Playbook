# When a simple prompt is not enough: a source-and-action escalation boundary

**Status:** research candidate / `not_run`

**Accessed:** 2026-08-14 (America/Los_Angeles)

**Owner:** curriculum-maintainer

**Next review:** 2026-11-14, or before this boundary is made into a learner
card, evaluated with learners, or used to support a named-product claim.

## Research question and scope

What is the smallest beginner-facing decision that separates an ordinary,
text-only prompt from work that needs a source-backed investigation or an
auditable task protocol?

This record is deliberately narrower than general prompt-writing guidance. It
covers only the first routing choice for a request that may mix three things:

1. transforming or discussing text the reader already supplied;
2. making a material claim about the outside world; and
3. changing a file, account, shared system, publication, or other external
   state.

It does not prescribe a universal prompt format, compare models, verify a
source, execute a task, or assess a learner. It is a routing boundary for the
general LLM collaboration core, not a named-platform adapter.

## Method and source-selection rule

Only primary guidance was retained: current OpenAI developer documentation and
a NIST publication. The OpenAI page is product-scoped and volatile; the NIST
publication is a risk-framework profile, not a prompt guide or a model test.
Both were read only. No account, API request, model exchange, learner session,
source lookup, or task execution was run.

The project inference below is intentionally conservative: use a simple prompt
only when the reader can inspect the result against supplied material and no
current external claim or external action is required. Escalate when either of
those conditions is false. This is a curriculum routing decision, not a claim
that a longer prompt is unsafe or that escalation guarantees correctness.

## Evidence map

| ID | Claim | Evidence class | Primary support and applicability | Limit |
| --- | --- | --- | --- | --- |
| O1 | OpenAI documents a simple prompt for generating a short fictional text response. | official fact | OpenAI's prompt-engineering guide includes a one-sentence bedtime-story example, showing the narrow generation surface considered here. | It does not establish that simple prompts are correct for factual, consequential, or cross-product work. |
| O2 | OpenAI says prompt behavior is non-deterministic and recommends tests and evaluation suites as applications become more complex or models change. | official fact | The same OpenAI guide's "Prompt engineering" section states both points. | It is guidance for OpenAI API work, not proof of a particular model failure, learner outcome, or universal workflow rule. |
| O3 | NIST's Generative AI Profile identifies confabulation as a GenAI risk and frames risk management as context-dependent. | official fact | NIST AI 600-1 defines and discusses confabulation in its risk profile. | The profile does not classify any particular prompt, source, or task in this repository as safe or unsafe. |
| P1 | A beginner can route a request by asking: "Will the result introduce a material external fact or change something outside this chat?" | project inference | This original routing test uses the limits in O1--O3 and the existing project contracts named below. | It has no learner, model, independent-review, or completion evidence. |
| L1 | No source verification, workflow run, or learner observation was performed for this record. | local reproduction | `not_run`; this is a source-and-contract review only. | No reliability, usability, or educational-effect claim follows. |

## The narrow beginner problem

The ordinary first request can become misleadingly broad when a reader asks a
model to both *word something* and *establish that it is true* or *make it
real*. For example:

> "Is this policy still current? Summarize it and update our public help page."

The request contains a current external claim and a publication action. A
polished answer could look useful while leaving the source, date, permission,
target, and acceptance evidence unspecified. This is a realistic request
shape, but this record contains no survey or public-user sample that measures
how often beginners make it. The problem is therefore a **project-defined
teaching scenario**, not a prevalence finding.

## Escalation map

| Reported problem | Evidence class | Safe first action | Fallback | Stop condition | Existing route | Explicit non-claim |
| --- | --- | --- | --- | --- | --- | --- |
| "Rewrite my supplied paragraph for a friendly audience; do not add facts." | project inference (P1) | Keep the request text-only: name the supplied text, audience, output shape, and a preservation check. | If the draft is vague, use the Dialogue Brief; if already written, use the First-Turn Check. | Stop if the requested reply needs a new external fact, source, account, file, or action. | [`prysai-dialogue-brief`](../../skills/prysai-dialogue-brief/SKILL.md) or [`prysai-first-turn-check`](../../skills/prysai-first-turn-check/SKILL.md) | A clear prompt does not prove that wording is appropriate, complete, or factually correct. |
| "Is this current policy or product fact true?" | official fact (O2--O3) plus project inference (P1) | Freeze one claim, decision, date boundary, source owner, and what would change the decision before asking for a conclusion. | If the claim cannot be bounded, reduce it to an open question; do not request an authoritative-sounding answer. | Stop as `unresolved` if no source owner can be checked, scope is unclear, or the required certainty exceeds the evidence. | [`prysai-source-investigator`](../../skills/prysai-source-investigator/SKILL.md) | A source-backed lookup does not prove a model's answer, source completeness, future validity, or a decision outcome. |
| "Compare several options and tell me what research concludes." | official fact (O2--O3) plus project inference (P1) | State the decision, candidates, comparison criteria, source classes, time boundary, and intended deliverable. | Narrow to one bounded lookup when only one decisive current fact remains. | Stop if the question, acceptable evidence, or comparison set cannot be fixed without guessing. | [`prysai-research-router`](../../skills/prysai-research-router/SKILL.md) | A research plan or citation list is not a completed literature review, independent validation, or recommendation. |
| "Use the answer to update, send, publish, buy, connect, or change something." | project inference (P1) | Separate the proposed change from any factual lookup. Specify target, allowed actions, owner, acceptance evidence, checkpoint, and rollback before execution. | Keep the result as an unsent draft or read-only plan until the task contract is complete. | Stop if authority, target, data boundary, acceptance evidence, or confirmation is missing; never turn a generated plan into execution evidence. | [`prysai-task-protocol`](../../skills/prysai-task-protocol/SKILL.md) | A complete protocol does not authorize or prove execution, safety, deployment success, or rollback readiness. |

## A compact routing test

Before making the first request, a reader can answer these two questions in
plain language:

1. **Can I judge the result only against text and facts I have supplied?**
2. **Will this request need a current external claim or change anything outside
   the conversation?**

If the answer is **yes** to the first and **no** to the second, a small,
text-only prompt may be an appropriate starting point. If a material external
claim is needed, route to source-led work. If an external action is proposed,
route to the task contract as well. If both are present, keep source discovery
and action authority as separate stages; do not let a citation-shaped answer
silently authorize a change.

This test is not a risk score. Medical, legal, financial, employment,
education, housing, immigration, insurance, personal-safety, or other
consequential questions require suitable human or domain review; this record
does not provide it.

## Failure boundary and acceptance evidence

**Failure case:** a reader asks a model to "confirm the current rule and send
the update" in one turn. The model returns a confident paragraph with a link,
but the reader cannot identify the source owner, access date, supporting
location, publication target, or permission to send.

**Smallest safe recovery:** preserve the unsent draft, split the request into a
source question and a proposed action, then stop at the relevant route's
missing-input rule. Do not ask the model to fill the missing authority or cite
an unopenable page as proof.

**Candidate acceptance check:** a route choice is inspectable when the reader
can point to the requested outcome, whether an external claim is material,
whether an external action is proposed, the selected existing route, and the
stop condition. This checks only that the routing decision was stated; it does
not verify the source, output, action, or learning result.

## Existing-material boundary

This record does not replace the existing first-turn, research, source, or task
contracts. It joins them with one deliberately small distinction:

- a simple prompt handles a supplied, text-only transformation or discussion;
- Source Investigator handles one bounded current-source question;
- Research Router handles unresolved or multi-source research design; and
- Task Protocol handles authority, side effects, acceptance evidence, and
  recovery for proposed work.

No new Skill, prompt card, chapter, lab, registry item, evaluation fixture, or
reader-facing claim is proposed here.

## Primary sources

| ID | Authoritative URL | Owner | Access date | Scope and maintenance boundary |
| --- | --- | --- | --- | --- |
| O1, O2 | [OpenAI API documentation: Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering.md) | OpenAI | 2026-08-14 | Product-scoped developer guidance. Recheck before citing a specific API surface, model, evaluation feature, or product behavior. |
| O3 | [NIST AI 600-1: Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | National Institute of Standards and Technology | 2026-08-14 | Risk-profile guidance. Recheck before making a compliance, conformance, incident, or system-specific risk claim. |

## Limitations, disclosure, and next evidence

This is original Prysai wording. The cited sources are linked as evidence; no
external prompt text, code, or teaching asset is copied. This record does not
prove that beginners recognize the boundary, that any model routes correctly,
that citations are valid, or that the stated routes improve safety or task
success.

Before this boundary becomes reader-facing curriculum, run a predeclared,
low-risk learner observation with fresh participants. Preserve the initial
request, chosen route, reason, unresolved fields, elapsed time, and whether the
participant incorrectly treats a plan or citation as execution evidence. Keep
the result `candidate` unless the observed evidence supports a narrower claim.
