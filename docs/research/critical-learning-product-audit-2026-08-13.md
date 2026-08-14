# Critical learning-product audit — 2026-08-13

**Status:** candidate audit; source-backed project judgment, not an external
accreditation, ethics approval, security assessment, or endorsement by a
professor, scientist, standards body, vendor, or source author.

**Audit snapshot:** `6173a14d6643ed65f6cd164094fcb0e7b06c5ffa` (local checkout
inspected 2026-08-13, America/Los_Angeles)

**Product assessed:** *Codex: From First Task to Real Work* / Codex Field Guide

**Audit owner:** curriculum-maintainer, with findings assigned below

**Next review:** 2026-09-13, or immediately after a recorded learner pilot,
scored evaluation run, material safety incident, public-release decision, or a
material change to the cited guidance.

## Decision

This is a carefully structured **candidate**, not yet a substantiated learning
product. The project has unusually good claim hygiene: it labels the course as
`candidate`; all 18 labs as `draft` with learner and transfer runs `not_run`;
and its 39 evaluation fixtures as `not_run / static_structure_only`. It also
has an explicit low-risk pilot protocol, source/license controls, and
least-authority teaching. Those are meaningful readiness inputs, not evidence
that learners learn, retain, transfer, safely operate agentic systems, or that
the exercises reproduce model/workflow behavior.

The release decision must remain **not ready**. The highest-value work is not
more chapters, Skills, visual polish, or new platform claims. It is one
pre-authorized, privacy-bounded measurement slice plus a reproducible execution
slice, both reported at their observed scope.

## Method and claim boundary

This audit uses three clearly labeled role lenses. They are analytical lenses,
not impersonated reviewers or claimed endorsements.

| Lens | Public authoritative basis | What this lens can test here | What it cannot establish |
| --- | --- | --- | --- |
| Instructional design / education-research | National Academies, *How People Learn II* (E1) | Whether the candidate distinguishes intended outcomes, practice, feedback, transfer, and evidence of learning. | That a particular intervention causes learning without an appropriate study. |
| Reproducibility / scientific-method | National Academies, *Reproducibility and Replicability in Science* (R1) | Whether claims have enough documented inputs, conditions, procedures, outputs, and independent review to be checked or rerun. | That a result generalizes beyond the declared task, environment, model, or sample. |
| Responsible-AI governance | NIST AI 600-1 (A1), OpenAI safety guidance (A2), OWASP LLM01:2025 (A3) | Whether teaching and piloting name foreseeable risk, authority, privacy, human review, and incident-stop boundaries. | Security, compliance, safety, or resistance to prompt injection in any deployed configuration. |

**Source classes used in this record**

- **Class A — public authoritative framework/guidance:** E1, R1, A1–A3.
- **Class B — project governance and observed repository evidence:** the
  current checkout and its controlled status, quality, evaluation, pilot, and
  safety records.
- **Class C — project inference/remediation:** the findings and proposed gates
  below. They are not claims made by any cited source.

No source text, assessment instrument, prompt, incident report, or external
Skill instruction was copied. The URLs support the limited framework claims;
all product conclusions are based on the named project evidence.

## Current-state evidence

The following observations are Class B evidence from the audit snapshot.

| Area | Observed evidence | Audit interpretation |
| --- | --- | --- |
| Product maturity | `README.md` labels the project `candidate`; `CONTEXT.md` defines `candidate` as structural/basic checks without sufficient fresh pretesting. | Status language is appropriately conservative. |
| Practice | `docs/governance/content-status.yaml` records all 18 labs as `draft`, with `learner_run_status` and `transfer_run_status` both `not_run`; Labs 008 and 013 have maintainer reference runs only. | Reference packets are not learner or transfer evidence. |
| Evaluation | The same status file marks the 39 fixtures `not_run` and `static_structure_only`; `evals/results/README.md` states there are no model-run results. | Task design and validator success are not observed model/workflow performance. |
| Learner measurement | `docs/quality/first-win-pilot-protocol-v2.md` defines a narrow construct, 5–8 experienced-beginner instrument-debugging pilot, independent scorers, immediate and 48–72-hour transfer, consent and stop rules—but records no recruitment or run. | A sensible protocol is preparation, not a study result. |
| Safety design | `docs/research/ai-collaboration-safety-boundaries-2026-08-13.md`, Labs 007/016, and Chapters 17–21 teach untrusted-input stops, minimization, approval, least authority, rollback, and explicit unknowns. | Strong candidate safeguards; their learner performance and real-surface effectiveness remain untested. |
| Release operations | `docs/governance/release-readiness.yaml` says `decision: not_ready`: no version, changelog, immutable release tag, accepted release evidence, rollback target, or rehearsal. | A passing local validator cannot be re-described as a release or deployment. |

### Checks performed for this audit

The project-prescribed commands passed locally at the stated snapshot:

```powershell
& $py scripts\validate_project.py
& $py scripts\validate_project_structure.py
& $py scripts\validate_content_completeness.py
& $py scripts\validate_learning_contract.py --canonical-en
& $py scripts\audit_input_archives.py
```

This confirms the declared static contracts at that checkout. It does **not**
confirm learner outcomes, delayed retention, transfer, model behavior, Skill
triggering, safety in use, deployment, or production readiness.

## Serious findings and evidence-gated remediation

| ID / severity | Lens and finding | Concrete project evidence | Consequence if unresolved | Narrow remediation and completion evidence | Owner / next review |
| --- | --- | --- | --- | --- | --- |
| CLP-01 / P0 | **Instructional design:** the course’s intended learning claims do not yet have observed learner evidence. E1 treats learning as shaped by learner knowledge, context, and active learning; a static sequence cannot demonstrate learning or transfer by itself. | All labs are `draft` and learner/transfer `not_run` in `docs/governance/content-status.yaml`; Q-001 in `docs/governance/quality-register.yaml` remains open. The First Win protocol exists but has no participants or results. | The course may be described as structured, but not as effective, understandable, retained, or transferable for its target readers. | Run one fixed-revision, consented, synthetic-fixture pilot only after naming the authorizer, recruitment channel, privacy/retention owner, moderator, scorers, deletion date, and stop rule. Preserve de-identified baseline, help, drop-off, seeded recovery, immediate unseen transfer, delayed unseen transfer, and both scorer records. Publish descriptive instrument findings only. | quality-maintainer; review 2026-09-13 or when a pilot is authorized. |
| CLP-02 / P0 | **Reproducibility:** no scored execution evidence supports the model, Skill, or workflow claims. R1 distinguishes repeatable checking from generalizable evidence; fixtures without logged runs are specifications, not results. | `content-status.yaml` lists 39 fixtures as `not_run / static_structure_only`; `evals/results/README.md` says there are no model-run results; Q-002 is open. | The product cannot substantiate claims about stop behavior, routing, model comparison, workflow reliability, or regression resistance. | Select one safety-relevant and one ordinary fixed fixture. Freeze task-set revision, model/version, date, system/runtime, tools, permissions, network condition, prompt/context, repetitions, raw-output reference, scoring rubric, adjudication, and limitations. Run positive, boundary, failure, and transfer cases; keep failures and independent review. Do not compare vendors unless conditions are equivalent and the claim is predeclared. | evaluation-maintainer; review 2026-09-13 or after the first complete run packet. |
| CLP-03 / P1 | **Instructional design:** the candidate contains a coherent L0–L6 path, but activity depth, prerequisites, required artifacts, and time expectations are not consistently supported by observed use. E1 supports aligning practice and feedback with the learning goal; it does not validate uniform difficulty merely because each page contains an objective and checklist. | Q-009 says chapter size and experiment depth vary and calls for per-chapter time, prerequisite, artifact, failure, transfer, and learner review. `starter-task-contract.yaml` explicitly calls its 15-minute label an unmeasured target. | Readers can face hidden prerequisites, misleading time estimates, or a sequence that works only for the authors’ context. | Before expanding the catalogue, instrument the first recommended route only. Record actual completion/discontinuation, help, prerequisite surprises, and artifact/failure completion; revise its stated time and prerequisites from observations. Keep other route estimates marked `candidate`/unmeasured. | curriculum-maintainer; review after CLP-01’s instrument-debugging round. |
| CLP-04 / P1 | **Reproducibility:** current governance preserves source and run status, but the project has not yet demonstrated that a learning result or model result can be independently reproduced across a declared environment. R1 makes transparent methods, data, code, and analysis conditions central to checking a result. | The pilot protocol specifies a commit, browser, viewport, model/surface, settings-if-visible, and scorer records; the evaluation result directory is empty. Existing maintainer reference runs for Labs 008/013 do not establish a learner or independent rerun. | Later readers cannot tell whether a difference comes from the curriculum, model/surface drift, exposure, scorer interpretation, or a changed fixture. | For every first pilot/eval result, create a commit-bound evidence packet: immutable revision, fixture digest, condition manifest, permitted aids, raw or de-identified artifact references, scoring decision, disagreement record, exclusions, and exact claim limit. Ask a person not involved in the original run to rerun the packet or document the blocking difference. | evaluation-maintainer with quality-maintainer; review with first result packet. |
| CLP-05 / P1 | **Responsible-AI governance:** safeguards are present as curriculum content, but no evidence shows that learners recognize untrusted instructions, protect sensitive inputs, stop before unapproved action, or verify outputs under pressure. A1–A3 identify confabulation, privacy, prompt injection, least privilege, and human approval as material concerns; they do not certify these controls. | Safety research explicitly says no learner study or security claim exists. Labs 007 and 016 remain `not_run`; all skills are `candidate`, and broader fresh-context/runtime evidence is partial or pending. | A learner could mistake conceptual safety language, a passing static check, or a sandbox label for operational safety. | Add safety outcomes to the already bounded evaluation slice: one synthetic indirect-instruction fixture, one sensitive-input redaction decision, one authority-escalation refusal, and one output-verification task. Score only observable choices and receipts, never hidden reasoning. Define safety-stop escalation, data deletion, and no-external-action enforcement before execution. | security-research-maintainer and evaluation-maintainer; review before any tool-connected or public pilot. |
| CLP-06 / P1 | **Responsible-AI governance:** the feedback/pilot protocol has good minimization language but needs an executed operational readiness check before collection begins. NIST frames privacy and human oversight as lifecycle risk management, not a document-only property. | `public-beta-feedback-contract-v1.md` says no collection or recruitment is active until named authority and roles exist; the pilot protocol requires voluntary adults, deletion timing, and no raw chat histories. | Even a small pilot can collect unnecessary sensitive material or make an authority boundary ambiguous if roles and deletion are not actually enacted. | Before recruitment, complete a one-page dry-run record with names/roles (kept outside public reporting if needed), exact intake channel, consent wording, retention end, deletion procedure, safety-stop contact, data-access list, and a test deletion. If any item is absent, do not recruit. The dry run is governance readiness only, not learner evidence. | privacy-and-retention owner; review immediately before recruitment and after deletion. |
| CLP-07 / P1 | **Product credibility / governance:** the release boundary is correctly blocked, but readers could still overread polished content and static checks if a public surface is created before evidence and operations exist. A1–A3 support caution around action authority and misleading output; this is a project inference about public claims. | `release-readiness.yaml` is `not_ready`, with missing version, tag, release evidence, rollback target, and rehearsal. README and status records correctly retain candidate/not-run language. | Public availability could be misinterpreted as endorsement, product maturity, or safety/effectiveness validation. | Keep all public-facing status fields mechanically sourced from canonical status data. Before publication, require an immutable candidate revision, explicit claim inventory, release evidence packet, rollback target/rehearsal, privacy/license review, and a tested route to report a safety concern without sending secrets. Release only at the observed claim scope. | release-maintainer; review 2026-08-19 per release-readiness file, and before any visibility/deployment change. |

## Sequenced decision gates

1. **Do not recruit or publish:** assign pilot authority, privacy, retention,
   deletion, moderation, scoring, and safety-stop ownership; dry-run the data
   path with synthetic material.
2. **Instrument debugging, not effectiveness:** run the existing 5–8-person
   fixed-revision First Win protocol. Report the raw descriptive results,
   exclusions, scorer disagreements, and instrument changes. Keep the course
   `candidate` and all learner/transfer claims unverified.
3. **Reproducible execution:** run and independently review a small,
   condition-manifested positive/boundary/failure/transfer evaluation packet,
   including the four safety decisions above.
4. **Only then decide the next claim:** revise the task or rubric if the
   instrument fails; expand the sample only under a separately approved
   effectiveness design; consider public release only when its distinct
   release/readiness gates have evidence. None follows automatically from the
   previous gate.

## What is currently justified

The following wording is supported at the audit snapshot:

- “A candidate curriculum with static validation, explicit evidence
  boundaries, and low-risk safety teaching.”
- “A planned, not-yet-run learner pilot and a not-yet-run evaluation fixture
  set.”
- “Safety guidance and project safeguards that require learner and runtime
  evidence before stronger claims.”

The following wording is not justified:

- “Proven course,” “effective learning product,” “validated learning,”
  “retention,” “transfer,” “safe agent training,” “reproducible model
  performance,” “public beta,” “released,” or “production-ready.”
- Any implication that the National Academies, NIST, OpenAI, OWASP, a
  professor, or a scientist reviewed, endorsed, accredited, or approved this
  course.

## Limitations of this audit

This is a desk audit of a local repository snapshot plus publicly accessible
sources. It did not recruit learners, execute model fixtures, inspect private
accounts, perform penetration testing, assess legal compliance, or verify a
deployed public site. It therefore retains the project’s `candidate` and
`not_run` limitations rather than resolving them.

The primary sources provide frameworks and risk descriptions, not a course
rubric or endorsement. The sample size in the existing pilot protocol is
explicitly suitable for instrument debugging and descriptive results only; it
cannot establish statistical significance, causal effectiveness, broad
population claims, or platform/model superiority.

## Source ledger

| ID / class | Public authoritative source | Accessed | Scope used here | Owner | Next review |
| --- | --- | --- | --- | --- | --- |
| E1 / A | [National Academies, *How People Learn II: Learners, Contexts, and Cultures*](https://nap.nationalacademies.org/catalog/24783/how-people-learn-ii-learners-contexts-and-cultures) | 2026-08-13 | Learning is contextual and requires more than a content sequence; used only as a lens for alignment of outcome, practice, feedback, and transfer evidence. Not an endorsement or a validated course instrument. | curriculum-maintainer | 2027-08-13 or before using it for a reader-facing evidence claim. |
| R1 / A | [National Academies, *Reproducibility and Replicability in Science*](https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science) | 2026-08-13 | Transparency and repeatability concepts for the audit’s condition-manifest and independent-review requirements. Not a claim that educational or model outcomes will replicate. | evaluation-maintainer | 2027-08-13 or before changing result-evidence policy. |
| A1 / A | [NIST AI 600-1, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | Generative-AI risk framing for confabulation, privacy, human oversight, and lifecycle governance. Not a compliance assessment or product security statement. | security-research-maintainer | 2026-12-13 or before a public AI-safety claim. |
| A2 / A | [OpenAI, “Safety in building agents”](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | Prompt injection, sensitive-data exposure, approvals, guardrails, and evaluation practices for agent workflows. Product-specific and volatile; not assumed to describe every Codex surface or account configuration. | facts-maintainer | 2026-09-13 or before a product-specific lab/release claim. |
| A3 / A | [OWASP GenAI Security Project, “LLM01:2025 Prompt Injection”](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | Direct/indirect prompt-injection risk and mitigation framing, including least privilege and human approval. Not evidence of an incident here or a guarantee that a mitigation prevents injection. | security-research-maintainer | 2026-09-13 or before a security claim. |
| B1 / B | `docs/governance/content-status.yaml`, `docs/governance/quality-register.yaml`, `evals/results/README.md` at audit snapshot | 2026-08-13 | Candidate/draft/not-run status, 18 labs, 39 fixtures, and open evidence gaps. | curriculum-maintainer | On every status or result change. |
| B2 / B | `docs/quality/first-win-pilot-protocol-v2.md`, `docs/quality/public-beta-feedback-contract-v1.md` at audit snapshot | 2026-08-13 | Existing bounded pilot, consent, minimization, scorer, retention, and stop-condition design; no recruitment or result. | quality-maintainer | Before pilot authorization or collection. |
| B3 / B | `docs/research/ai-collaboration-safety-boundaries-2026-08-13.md`, Labs 007/016, Chapters 17–21 at audit snapshot | 2026-08-13 | Existing candidate safety curriculum and its stated limitations. | security-research-maintainer | Before tool-connected practice, public release, or material safety change. |
| B4 / B | `docs/governance/release-readiness.yaml` at audit snapshot | 2026-08-13 | `not_ready` release decision and missing release/rollback evidence. | release-maintainer | 2026-08-19 and before release/deployment. |

## Source and reuse boundary

This audit is original project writing. Linked sources remain external and are
used as references only; their terms, updates, and scope limitations apply. No
external source grants endorsement, certification, permission to copy its text,
or permission to treat its guidance as evidence of this course’s learner,
security, compliance, or production outcomes.
