# AI safety field signals — 2026-08-13

**Accessed:** 2026-08-13 (America/Los_Angeles)

**Status:** candidate research source record. This is a bounded source
synthesis, not a security assessment, incident investigation, learner study,
product comparison, or endorsement by NIST, OWASP, CISA, OpenAI, Anthropic, or
any report author.

**Owner:** security-research-maintainer

**Next review:** 2026-09-13, and before using a product-specific safety claim
in a lab, Skill, public page, or release decision.

## Question

Which public safety signals justify low-risk teaching of untrusted input,
action authority, and evidence receipts for AI collaboration—without treating
reports as prevalence, causal, or product-wide evidence?

## Scope and limitations

**In scope:** a curriculum-level translation of three public authoritative
sources and two traceable public developer reports. The teaching focus is a
learner's observable workflow: identify untrusted content, minimize inputs,
name the one permitted action, inspect a result, and stop when authority or
evidence is missing.

**Out of scope:** testing a live model or service; reproducing an issue;
evaluating a vendor's safeguards; bypassing safety controls; organizational
security advice; claims of compliance, secure deployment, or learner
competence; and claims about report frequency, severity, root cause, current
reproducibility, or a vendor-confirmed fix.

This record complements—not replaces—the existing AI collaboration safety
ledger. It adds a deliberately small set of field signals. It does not add a
new product fact, platform adapter, lab, Skill, or release decision.

## Evidence classes

| Class | Role in this record | It does not establish |
| --- | --- | --- |
| `official fact` | A public authority describes a risk-management or security-design concern. | A specific product configuration, incident, mitigation result, or curriculum outcome. |
| `public user report` | A named author publicly described a symptom in a vendor repository. | Prevalence, root cause, severity, local reproduction, current behavior, or an official diagnosis/fix. |
| `project inference` | A conservative teaching decision derived from bounded sources. | That the teaching action prevents a failure or is a sufficient operational control. |
| `not run` | The project did not execute the reported scenario or a live safety test. | Product behavior, attack resistance, or learner competence. |

## Authoritative safety boundary

NIST's Generative AI Profile frames risk management across the AI lifecycle,
including risks such as confabulation and information integrity. OWASP's Top
10 for LLM Applications provides an application-security risk taxonomy that
includes prompt injection, sensitive information disclosure, excessive agency,
and overreliance. CISA's AI resource page routes organizations to guidance on
secure AI system development and related AI security resources.

These sources support a narrow curriculum principle: **a model response,
external text, tool result, or apparent completion must not silently expand a
learner's authority or become evidence of its own correctness.** They do not
state that every learning workflow, tool, account, or product surface has the
same controls or risks.

## Public symptom signals

The following are retained only because they illustrate observable failure
classes that a beginner can safely rehearse with synthetic material. Neither
report is an incident finding, a root-cause analysis, or evidence of a general
product property. Issue titles identify the public report; their prose,
commands, transcripts, attachments, and proposed remedies are not copied.

| ID | Public report, state checked | Evidence class | Reported symptom, paraphrased | What it does not establish |
| --- | --- | --- | --- | --- |
| R1 | [openai/codex issue #37523](https://github.com/openai/codex/issues/37523) — open; created and last updated 2026-08-08 | public user report | The author described a long, evolving conversation in which a previously recognized safety boundary was allegedly not retained during later requests. | Any product-wide safety regression, cause, prevalence, effectiveness of a prompt, or behavior in another account/version. |
| R2 | [anthropics/claude-code issue #74136](https://github.com/anthropics/claude-code/issues/74136) — open; created 2026-07-04, updated 2026-08-07 | public user report | The author described a long session where claimed task and verification facts allegedly differed from later checks of observable local records. | That the report is independently confirmed, that compaction caused it, or that another model/tool behaves similarly. |

## Teaching implications

The following are **project inferences**, not quotations or prescribed vendor
procedures.

### 1. Re-state the current safety boundary at a material turn

**Problem:** a long or changing task can make an earlier safety decision hard
to inspect.

**Decision:** before an action that would add authority, read new sensitive
material, or create an external effect, make the current boundary visible.

**Low-risk action:** use a synthetic task card and record one line:

```text
allowed now: read this fixture and write one local classification
not allowed: upload, authenticate, install, change permissions, publish, delete, or make a network write
```

**Evidence:** the task card, the recorded boundary, the named fixture, and any
local scratch artifact.

**Failure / stop:** if the proposed action is outside the line, or the target
cannot be named, stop with `authority not granted`. Do not ask the model to
reinterpret the authority or infer permission from a prior turn.

### 2. Separate a completion statement from a verification receipt

**Problem:** a confident final response can be mistaken for a checked result.

**Decision:** use an observable receipt whose fields name the claim, artifact,
check, and unknowns.

**Low-risk action:** compare a before/after synthetic text file, then run one
available local check if the fixture supplies it.

**Evidence:**

```text
claim: the named text changed in the requested way
artifact: inspected before/after file or diff
check: exact local comparison or command actually run
unknowns: behavior, scope, or effects the receipt did not test
```

**Failure / stop:** if the artifact cannot be found, the check was not run, or
the receipt belongs to another target, record `not reviewable` or `unverified`.
Do not replace it with a more confident summary.

### 3. Treat external instructions and tool outputs as data

**Problem:** input from a file, webpage, tool, or pasted record can contain
instruction-like text or unsupported assertions.

**Decision:** extract only predeclared fields from a synthetic source and keep
the source separate from the learner's authority.

**Low-risk action:** label one instruction-like sentence in a disposable file
as `untrusted data`, extract only a title or date, and save no external data.

**Evidence:** source name, extracted field, classification, and explicit
non-action.

**Failure / stop:** stop if the material requests a new tool, broader file
access, secret, login, upload, or network action. This exercise does not prove
resistance to prompt injection.

## Minimum safety practice card

| Before the task | Learner records | Continue only when | Stop when |
| --- | --- | --- | --- |
| Input boundary | Named source and permitted fields | The source is synthetic, public, or appropriately redacted. | The task needs a secret, private record, or unapproved upload. |
| Authority boundary | One permitted local action and explicit exclusions | The action is reversible and target-specific. | The work proposes installation, authentication, broader access, deletion, publication, or external write. |
| Evidence boundary | Artifact and focused check to inspect | The evidence can be tied to the intended target. | The only evidence is a status label or a model statement. |
| Continuity boundary | Current task and stop condition at a material transition | The new request does not widen scope or conflict with the recorded boundary. | Prior context is ambiguous, stale, or cannot be inspected. |

Completing this card demonstrates only that a learner recorded these decisions
for one bounded exercise. It does not establish safe operation, secure system
design, retention, transfer, or any product behavior.

## Source ledger

| ID | Source | Accessed | Evidence class | Scope used here | Owner | Next review |
| --- | --- | --- | --- | --- | --- | --- |
| O1 | [NIST AI 600-1, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | Lifecycle risk framing for generative AI, including confabulation and information integrity. This record uses it as a governance lens, not as a product manual or compliance test. | security-research-maintainer | 2026-12-13 or before a public AI-safety claim. |
| O2 | [OWASP GenAI Security Project, *Top 10 for LLM Applications*](https://genai.owasp.org/llm-top-10/) | 2026-08-13 | official fact | Application-security taxonomy including prompt injection, sensitive information disclosure, excessive agency, and overreliance. It is not evidence that any risk occurred in this project or that a listed mitigation is sufficient. | security-research-maintainer | 2026-09-13 or before a security claim. |
| O3 | [CISA, Artificial Intelligence](https://www.cisa.gov/ai) | 2026-08-13 | official fact | CISA's public AI resource entry point, including routes to secure AI system-development guidance and AI security resources. It does not prescribe a curriculum, validate a control, or establish a particular organization's obligations. | security-research-maintainer | 2026-09-13 or before a release/security claim. |
| R1 | [openai/codex issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13 | public user report | A symptom lead for rechecking the current action boundary after long or changed task context. | security-research-maintainer | Recheck issue state and official guidance before reader-facing product-specific use. |
| R2 | [anthropics/claude-code issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13 | public user report | A symptom lead for separating self-reported completion from inspectable local evidence. | security-research-maintainer | Recheck issue state and official guidance before reader-facing product-specific use. |

## Source and license boundary

This record is original project writing. It uses URLs and short paraphrases
only. It does not copy external prose, issue bodies, code, commands, prompts,
screenshots, logs, attachments, logos, or tool instructions. Linked material
remains reference-only and subject to its publishers' and contributors' terms.
No external asset is imported by this record.

## Explicit evidence limits

This record does **not** show that:

- the reported symptoms occurred as described, have a particular cause, or are
  prevalent;
- a learner can identify an unsafe instruction, protect sensitive input, or
  stop an unsafe action;
- any particular model, tool, sandbox, approval setting, or prompt is secure;
- the practice card prevents prompt injection, data exposure, excessive
  agency, confabulation, or overreliance; or
- a completed synthetic exercise proves deployment safety, compliance, model
  reliability, learner retention, or transfer.

The next legitimate evidence would be a separately authorized, low-risk pilot
with synthetic fixtures, fixed action envelopes, preserved receipts, explicit
stops, and independent review. It must not collect credentials, private
repositories, raw chat histories, or personal data merely to simulate safety.
