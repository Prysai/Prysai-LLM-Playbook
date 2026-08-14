# Hostile-but-fair external review simulation — 2026-08-13

**Status:** candidate research record and desk review. This is not an external
accreditation, market study, security assessment, ethics approval, customer
interview, or release decision.

**Snapshot:** `ac0e9a70fdfefb61767924934df0f8acde6cf505`, inspected locally on
2026-08-13 (America/Los_Angeles).

**Owner:** curriculum-maintainer
**Next review:** 2026-09-13, or immediately after a learner pilot, a scored
evaluation packet, a visibility/deployment decision, a licensing decision, or
a material change to the named status files.

## Problem

The hostile question is not whether the repository contains substantial work.
It does. The question is whether a skeptical external reviewer can see a
credible chain from a claimed user need to a safely repeatable learning result,
an adoptable operating model, and a discoverable public value proposition.

At this snapshot, that chain stops before observed use. The repository's own
files describe it as a **candidate** rather than a released or proven learning
product. This is a fair strength in claim hygiene, but it is also the central
limitation that a hostile reviewer would test first.

### Review boundary

The four lenses below are **standards-based simulations**, not voices or
feedback from real people. They do not represent, contact, interview, or claim
feedback from Microsoft, Meta, Kugou, university faculty, scientists, or their
employees. Microsoft and Meta public materials appear only as limited,
source-owner governance references. No public Kugou source was used, so this
record makes no claim about Kugou's products, staff, users, or practices.

| Simulated lens | Public authoritative basis | Fair question it asks | It cannot establish |
| --- | --- | --- | --- |
| Academic learning reviewer | National Academies, *How People Learn II* (A1) | Are outcomes, practice, feedback, transfer, and evidence of learning connected rather than merely listed? | That this curriculum causes learning without an appropriate study. |
| Research reproducibility reviewer | National Academies, *Reproducibility and Replicability in Science* (A2) | Can an independent person inspect conditions, rerun a declared task, and understand what a result supports? | That a result generalizes across models, people, products, or time. |
| Enterprise adoption and governance reviewer | NIST AI RMF / GenAI Profile (A3), plus publicly available responsible-AI materials from Microsoft (A4) and Meta (A5) | Are authority, risk ownership, evidence, lifecycle controls, and licensing sufficiently explicit for a cautious organization to assess use? | Vendor endorsement, legal compliance, security, procurement approval, or internal policy equivalence. |
| Consumer discovery and value reviewer | GitHub repository visibility/topics documentation (A6–A7) and the GOV.UK Service Standard (A8) | Can a person find the product, understand a narrow outcome, try it safely, and judge whether it helped? | Demand, satisfaction, growth, retention, conversion, or a competitive ranking. |

## Concept

### Evidence classes

| Evidence class | Used for in this record | Not used to prove |
| --- | --- | --- |
| official fact | The limited purposes of A1–A8, as stated in the source ledger. | Course efficacy, vendor endorsement, product equivalence, or legal compliance. |
| public report | None retained. This is not a synthesis of forums, reviews, stars, or customer interviews. | User demand, pain-point prevalence, or a product diagnosis. |
| local reproduction | None. No model task, learner session, deployment, security test, or external platform check was run for this record. | Runtime behavior, safety, usability, performance, or learning results. |
| project observation | Exact statements and counts from the named repository files at the stated commit. | Facts outside the named files or the behavior of a live public service. |
| project inference | The risks, priorities, and remediation gates below. | A finding made by any source owner or simulated reviewer. |

The review deliberately separates a **well-specified candidate** from a
**validated product**. Static contracts and current documentation can make a
later study possible. They do not substitute for observed learner work,
independently reviewed executions, or public discovery.

## Decision

The fair external-review decision at this snapshot is:

> **Keep the project at `candidate`; treat its strongest asset as evidence
> discipline, and its largest gap as absence of externally observed outcomes.**

The project is not weak because it lacks more chapters or more Skills. It is
weakest where an external reviewer needs proof that the existing path works for
a bounded audience, under known conditions, and with a result that another
person can inspect. Until that proof exists, public-product language such as
“popular,” “effective,” “validated,” “enterprise-ready,” “safe,” or
“production-ready” would be unsupported.

## Action

The table orders remediation by missing evidence, not by visual polish or file
count. It is a proposed plan, not an authorization to recruit people, change
repository visibility, collect data, or deploy a site.

| Priority | Simulated finding | Evidence-first remediation | Completion evidence that would change this finding | Named project owner / review trigger |
| --- | --- | --- | --- | --- |
| P0 | **Academic:** the course has intended routes and exercises, but no observed learner completion or transfer. | Run the already bounded, fixed-revision First Win instrument-debugging pilot only after its authorizer, recruitment channel, privacy/retention owner, moderator, independent scorer, deletion date, and stop rule are actually named. | De-identified first answers, timing, help, drop-off, seeded recovery, immediate and 48–72-hour unseen transfer, scorer disagreement, exclusions, and an independent review. Report descriptive instrument findings only. | `quality-maintainer`; before any recruitment or learner-effect claim. |
| P0 | **Reproducibility:** the evaluation catalogue is a specification, not a result set. | Freeze one ordinary and one safety-relevant fixture, then record a condition manifest before each execution. Reconcile fixture counts before scoring. | Immutable task-set revision and digest; model/surface/date; tools, permissions, and network condition; input/context; raw-output reference; rubric; positive, boundary, failure, and transfer cases; scoring and independent review. | `evaluation-maintainer`; before any reliability, routing, comparison, or regression claim. |
| P1 | **Enterprise adoption:** a cautious organization cannot yet determine a stable reuse and release boundary for scripts, generated files, curriculum text, and branded assets. | Make the pending code-license split and release boundary a deliberate decision before asking organizations to adopt or extend the project. | File-level or package-level license decision; attribution/notice check; intended-use statement; owner; review record; and a statement of what remains outside the grant. | `release-maintainer` and `source-maintainer`; before organizational reuse or any public release. |
| P1 | **Enterprise governance:** candidate safety content is not evidence that real users recognize risks or that controls work in a tool-connected environment. | Keep pilots synthetic and low-risk. Add observable safety choices to the first evaluation packet: untrusted instruction, sensitive-input minimization, unapproved authority escalation, and output verification. | Predeclared scoring rules; no-external-action enforcement; stop/escalation record; de-identified results; retained failures; and independent review. | `security-research-maintainer` and `evaluation-maintainer`; before tool-connected practice. |
| P1 | **Consumer discovery/value:** the project itself records a private repository and no public Pages deployment, so ordinary public discovery has not been established. | First validate one narrow “why now” outcome with target readers; only then choose a publication scope, homepage, topics, and feedback channel appropriate to the observed claim boundary. | A visibility decision by the authorized owner; immutable candidate revision; accurate public claim inventory; tested first route; source/license review; rollback route; and a privacy-safe feedback path. | `release-maintainer`; before any visibility or deployment change. |
| P1 | **Consumer usability:** a reader cannot be assumed to distinguish the recommended path from the optional warm-up, nor to finish either route. | Keep public-surface observation separate from the controlled worksheet; revise navigation or labels only from observed confusion, not assumed friction. | Recorded route-selection observation for the declared sample, completed/not-completed route states, help and drop-off notes, and explicit claim limits. | `curriculum-maintainer`; after the first pilot round. |
| P2 | **Research maintenance:** volatile product facts have a report-only audit but not a proven semantic freshness gate. | Exercise the existing freshness process until it has evidence for stable failure classifications; do not describe HTTP availability as semantic verification. | Dated source reviews with owner, scope, changed claim decision, and a demonstrated blocking condition when an authoritative source becomes stale or materially changes. | `fact-maintainer`; at the next scheduled source review. |
| P2 | **Curriculum focus:** breadth across general LLM collaboration, Codex, Skills, safety, research, engineering, and team adoption may exceed what the first route can prove. | Freeze catalogue expansion until the first route has usability evidence; then remove, defer, or connect material based on observed learner need. | A route-level review using the pilot data, changed rationale, and a clear separation between retained core, optional application routes, and unsupported platform adapters. | `curriculum-maintainer`; after P0 learner evidence is reviewed. |

## Evidence

### Project observations at the named snapshot

These are project observations, not conclusions about a deployed public
service.

| Observation | Named file evidence | Hostile-but-fair interpretation |
| --- | --- | --- |
| The repository presents itself as `candidate`, and its short README says static checks exist while learner, transfer, and repeated-evaluation evidence does not. | `README.md` | Accurate limitation language is a strength; it does not establish reader value. |
| There are 22 candidate chapters, 18 labs, and 14 candidate Skills. All 18 labs are `draft`; all learner and transfer run states are `not_run`. | `docs/governance/content-status.yaml` | The curriculum skeleton is substantial, but lab count is not completion evidence. |
| The evaluation projection is `not_run / static_structure_only`; the task-set contains 40 tasks across 16 tracks. | `docs/governance/content-status.yaml`; `evals/task-set-v1.yaml`; `evals/results/README.md` | No scored model or workflow result is available for an external reviewer to inspect. |
| Q-001 and Q-002 remain open P0 findings. Q-006, Q-007, Q-011, and Q-013 remain open or in progress P1 findings; Q-009 and Q-010 remain open or in progress P2 findings. | `docs/governance/quality-register.yaml` | The project already knows its highest-risk evidence gaps. Closing them requires the listed evidence, not another narrative. |
| The release decision is `not_ready`; version, changelog, immutable tag, accepted release evidence, rollback target, and rehearsal are missing. | `docs/governance/release-readiness.yaml` | Passing structural checks cannot fairly be translated into a released or recoverable public product. |
| The public-beta feedback contract records a private repository, no public Pages deployment, and no active recruitment or collection until a named pilot is authorized. | `docs/quality/public-beta-feedback-contract-v1.md` | The project has not established normal public discovery, feedback, demand, or support evidence. |
| The default license is CC BY-NC 4.0 for curriculum, diagrams, screenshots, teaching assets, scripts, and generated site files while the candidate code-license split remains unresolved; Prysai marks are excluded. | `docs/sources/licensing.md`; `docs/sources/asset-register.md` | A potential organizational adopter must not infer a permissive software-library grant from repository layout alone. |
| The first pilot protocol is narrow, voluntary, adult-only, and designed for 5–8 experienced beginners; it records no recruitment, participant run, or result. | `docs/quality/first-win-pilot-protocol-v2.md` | It is a credible preparation artifact, not an effectiveness, market, or public-beta result. |

### What the authoritative sources contribute

- **A1** supports using outcomes, learner context, practice, feedback, and
  transfer as an audit lens; it does not validate this course.
- **A2** supports demanding transparent methods, conditions, and independent
  checking before treating a result as reproducible; it does not make a future
  LLM result repeatable.
- **A3–A5** support treating governance, human oversight, risk awareness, and
  lifecycle controls as real organizational concerns; they do not create a
  Microsoft or Meta endorsement, a security certification, or equivalent
  controls across products.
- **A6–A8** support treating visibility, classification, user needs, simple
  routes, and published success measures as discoverability and service-design
  concerns; they do not establish demand for this repository.

## Failure

The following are **project inferences**: plausible failure modes to test, not
observed incidents or predictions.

1. **Governance outruns use.** A reader sees careful registries, validators,
   and candidate labels but cannot obtain a first successful, independently
   inspectable result. More governance then increases reading burden without
   reducing the first-task failure rate.
2. **The count drift becomes a credibility drift.** If 39 and 40 are both used
   in public-facing claims, a reviewer cannot know which denominator controls
   coverage, pass rate, or release status.
3. **“Universal” is mistaken for “equivalent.”** General collaboration
   principles may be portable, while named product permissions, data controls,
   context handling, tools, pricing, and interfaces differ. A general lesson
   must not be presented as a completed Codex, Claude, Grok, Meta, Microsoft,
   or Kugou adapter without product-specific evidence.
4. **Candidate safety becomes a trust signal rather than an evaluated skill.**
   A clear stop rule can be valuable, but a reader may still fail to identify a
   malicious instruction, redact sensitive information, or stop an unapproved
   action unless those observable choices are tested.
5. **Private construction is mistaken for public product validation.** The
   project can have a polished local Reader and passing CI while lacking
   discoverability, public support boundaries, real feedback, public traffic,
   or release recovery evidence.
6. **License ambiguity blocks the very adopters that enterprise framing seeks.**
   Non-commercial curriculum terms and an unresolved code split can be a valid
   choice, but organizations cannot safely infer commercial training,
   integration, or software reuse rights.

## Reflection

The strongest skeptical conclusion is not that the project lacks ambition or
care. It is that its **governing structure is more mature than its observed
outcomes**, and that is precisely where a serious learning product should be
most demanding of itself.

The next credible milestone is deliberately unglamorous: one authorized,
privacy-bounded learner instrument-debugging round and one independently
reviewable execution packet, each with failures retained and claims limited to
what was observed. If those fail, the project gains useful evidence about what
to simplify. If they succeed, the project earns a narrower but stronger basis
for a public candidate release. Neither result proves popularity, adoption,
learning effectiveness, enterprise readiness, or durable cross-platform value
without additional evidence.

## Non-claims

This record does **not** claim that:

- university faculty, scientists, Microsoft, Meta, Kugou, GitHub, GOV.UK,
  NIST, or the National Academies reviewed, approved, endorsed, contacted, or
  adopted this project;
- the project is public, released, popular, discoverable, effective, safe,
  compliant, enterprise-ready, or production-ready;
- static checks, local rendering, a documented protocol, or a candidate Skill
  prove model behavior, automatic triggering, learner completion, retention,
  transfer, usability, security, accessibility, or a valid market need;
- the 5–8-person pilot design can establish statistical significance, broad
  demand, causal learning effects, or platform superiority; or
- any public source grants permission to copy prose, assessment instruments,
  prompts, code, branding, images, or vendor-specific instructions into this
  repository.

## Source ledger

All linked public sources were accessed on **2026-08-13**. They are used as
reference-only sources; no external prose, prompts, code, images, logos,
datasets, assessment instruments, credentials, or internal material was copied
into this record. Their terms and future revisions remain their owners' scope.

| ID | Evidence class | Public authoritative source | Accessed | Limited use here | Does not prove |
| --- | --- | --- | --- | --- | --- |
| A1 | official fact | National Academies, [*How People Learn II: Learners, Contexts, and Cultures*](https://nap.nationalacademies.org/catalog/24783/how-people-learn-ii-learners-contexts-and-cultures) | 2026-08-13 | Learning-design lens for outcomes, context, practice, feedback, and transfer. | Course effectiveness, a study design approval, or a learner result. |
| A2 | official fact | National Academies, [*Reproducibility and Replicability in Science*](https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science) | 2026-08-13 | Transparency, conditions, independent checking, and claim-scope lens. | Reproducibility or generality of a future project result. |
| A3 | official fact | NIST, [AI Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | Lifecycle risk, oversight, and governance lens for candidate teaching and pilots. | Compliance, certification, security, or risk-control effectiveness. |
| A4 | official fact | Microsoft, [Responsible AI: ethical policies and practices](https://www.microsoft.com/en-us/ai/responsible-ai) | 2026-08-13 | Public company material showing responsible-AI governance as a relevant organizational review area. | Any Microsoft employee view, endorsement, policy applicability, or product behavior. |
| A5 | official fact | Meta, [Responsible AI](https://ai.meta.com/responsible-ai/) | 2026-08-13 | Public company material showing responsible-AI framing is relevant to organizational product review. | Any Meta employee view, endorsement, product equivalence, or policy applicability. |
| A6 | official fact | GitHub Docs, [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) | 2026-08-13 | Visibility changes are a distinct administrative/publication decision with consequences. | This repository's live settings beyond the named project files, discoverability, or adoption. |
| A7 | official fact | GitHub Docs, [Classifying your repository with topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) | 2026-08-13 | Topics can help people find and contribute to public projects; private content does not receive suggested topics. | Traffic, Stars, user value, or future discovery. |
| A8 | official fact | GOV.UK, [Service Standard](https://www.gov.uk/service-manual/service-standard) | 2026-08-13 | User needs, simplicity, iteration, privacy, and published success measures as a consumer/service lens. | Product-market fit, commercial success, or suitability as a course rubric. |
| P1 | project observation | Named repository files in the evidence table at snapshot `ac0e9a7` | 2026-08-13 | Current local status, counts, and declared gates. | Remote metadata, live product behavior, or external adoption. |
| P2 | project inference | This record's findings, failure hypotheses, and remediation table | 2026-08-13 | Conservative prioritization for a future review. | A conclusion made by an outside institution or person. |
| L1 | local reproduction | None; `not_run` for this record | 2026-08-13 | Explicitly records no execution or user study. | Any runtime, learner, security, or market result. |
| R1 | public report | None retained | 2026-08-13 | Explicitly records that no forum/review report was used as evidence. | User prevalence, demand, or a diagnosis. |

## Stop receipt

Research stopped after checking the named project files and eight public
authoritative sources. The material is sufficient for a hostile-but-fair
candidate review and evidence-first remediation order. It is not sufficient to
declare an external review, user study, market validation, release, or
organization-level adoption.
