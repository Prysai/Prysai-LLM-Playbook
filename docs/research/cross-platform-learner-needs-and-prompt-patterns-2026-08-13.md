# Cross-platform learner needs and prompt patterns

**Status:** candidate research record

**Accessed:** 2026-08-13 (America/Los_Angeles)
**Scope:** beginner language practice, source-backed research, and practical
tasks with a generic chat product or an agentic product such as Codex, Claude
Code, or a Grok/xAI API integration.
**Decision owner:** Prysai Lab curriculum maintainer
**Next review:** 2026-11-13, or earlier when a cited product surface changes.

## Purpose and evidence boundary

This is a public user-need study, not a product comparison, prevalence study,
or effectiveness trial. It translates a small set of traceable public reports
into low-risk teaching responses. The reports establish only that their authors
described the stated symptom on the stated date. They do not establish root
cause, frequency, current reproduction, vendor confirmation, or a universal
fix.

Evidence classes used in this record:

| Class | Role in this study | Cannot establish |
| --- | --- | --- |
| **Official fact** | Current vendor or institutional guidance | Another platform's behavior, learner outcomes, or a guarantee |
| **Public user report** | A named author's reported symptom in a traceable public thread or issue | Prevalence, root cause, current behavior, or a fix |
| **Community suggestion** | A response or practice proposed by community members | Official policy or verified effectiveness |
| **Local reproduction** | A run recorded by this project | Any result here; none was run |
| **Project inference** | A new, conservative curriculum decision derived from the above | A source-owned fact or a measured outcome |

No prompts, screenshots, code, attachments, or long quotations were copied.
Public threads and vendor pages are used as reference-only sources; visible
content is not assumed reusable teaching material. This file records source
and reuse boundaries for this narrow study because the user-authorized scope
is limited to this file.

## What transfers across surfaces

Generic chat, coding agents, and tool-enabled APIs differ in context loading,
permissions, persistence, tools, and visible receipts. A learner should not
infer those details from a product name. The durable unit is smaller: define a
checkable result, provide only relevant context, declare constraints and action
authority, retain evidence, and stop when the bounded result or a safety gap is
reached.

Official guidance supports pieces of that unit: OpenAI describes prompting as
non-deterministic and recommends tests/evaluations as prompts and models
change [O1]. Anthropic asks Claude Code users to give the agent a check it can
run and to explore before planning and coding [O2]. Its permissions guide
distinguishes read, shell, and file-modification authority [O3]. xAI documents
that tool-enabled API flows may perform tool calls and return citations [O4].
These are platform-specific, volatile facts—not proof that the same workflow
or permission model exists elsewhere.

## Need cards

### N1 — “Beginner” language material exceeds the learner's actual boundary

| Field | Record |
| --- | --- |
| **Evidence class** | Public user report, bounded by official learning guidance |
| **Symptom** | An OpenAI Community author reported that requested beginner-level stories used longer sentences than intended, especially for non-English languages [R1]. |
| **User goal** | Practise one understandable language performance without receiving an answer before attempting it. |
| **Source** | [R1](#source-ledger): traceable public report. [O5](#source-ledger): IES guidance on retrieval and worked examples; it is not an LLM-tutoring study. |
| **Safe action** | Choose one situation and one observable turn. State permitted vocabulary or known forms, one measurable limit (for example, sentence count), and a maximum number of new items. Ask for one attempt before feedback; have the learner make the correction. Review a small generated sample before using it as practice material. |
| **Evidence to keep** | Target action; allowed aids; first attempt; help level; learner-authored correction; changed follow-up item; rubric or plain pass rule; unknowns. |
| **Stop condition** | Stop and shrink the item when the boundary cannot be stated, the first item exceeds the declared limit, or the model reveals the answer before the attempt. Do not label a short session as fluency, mastery, retention, or a proficiency level. |
| **Owner / review** | Learner owns the attempt; instructor or curriculum maintainer reviews the difficulty contract before reuse. Recheck learning-source interpretation by 2026-11-13. |

### N2 — Citations look credible but cannot be checked

| Field | Record |
| --- | --- |
| **Evidence class** | Public user report, bounded by information-literacy guidance |
| **Symptom** | An OpenAI Community author alleged that a web-enabled session returned fabricated titles and URLs despite a verification request [R2]. |
| **User goal** | Produce a small research answer whose material claims can be traced to sources the learner actually opened. |
| **Source** | [R2](#source-ledger): single public allegation. [O6](#source-ledger): ACRL framework on contextual authority, inquiry, and strategic searching. [O4](#source-ledger): xAI notes that tool results can include citations, but citations still require inspection. |
| **Safe action** | Start with one decision question and exclusions. For each material claim, retain the publisher/owner, URL, access date, exact supporting location, scope, and what the source does not prove. Treat generated links and citation markers as leads until opened and matched. Use source-owner material first for product behavior. |
| **Evidence to keep** | Search surfaces used; claim-to-source ledger; opened-source notes; unresolved or conflicting claims; stop receipt stating why the search ended. |
| **Stop condition** | Exclude a claim when its source cannot be opened or matched. Pause when the question needs private data, a licensed text not available for review, or an unbounded “find everything” request. Never call a finite search exhaustive. |
| **Owner / review** | Researcher owns the ledger; a reviewer checks high-impact claims. Recheck volatile product documentation before it is used for a reader-facing product claim. |

### N3 — A practical task expands from a small result into uncontrolled work

| Field | Record |
| --- | --- |
| **Evidence class** | Project inference informed by official agent guidance and an open Codex report |
| **Symptom** | A Codex issue author reported a multi-message conversation receiving a response about an earlier topic rather than the latest request [R3]. This does not diagnose why it happened. |
| **User goal** | Complete one small practical task while retaining a clear target and a check that distinguishes “looks done” from evidence. |
| **Source** | [R3](#source-ledger): public issue report. [O1](#source-ledger): OpenAI evaluation guidance. [O2](#source-ledger): Claude Code guidance to give the agent a runnable check and separate exploration from implementation. |
| **Safe action** | Make the next action self-contained: name one result, relevant inputs, allowed and prohibited actions, and one observable check. For a practical change, begin read-only or in a disposable copy; ask for a plan and proposed file list before edits. After a topic shift, restate the current target and discard stale assumptions rather than relying on conversation history. |
| **Evidence to keep** | One-sentence current target; source/input list; plan or file list; command, test, diff, screenshot, or user check; unresolved risks. |
| **Stop condition** | Stop for missing acceptance criteria, a needed permission not explicitly granted, a proposal to widen files/systems affected, or two attempts that fail in the same way without a changed hypothesis. |
| **Owner / review** | Learner/task owner authorizes actions and accepts the result; a technical reviewer checks consequential changes. Review platform-specific instructions at their vendor source before use. |

### N4 — The visible interface and the actual working target disagree

| Field | Record |
| --- | --- |
| **Evidence class** | Public user reports plus project inference |
| **Symptom** | One Codex issue author reported branch/worktree disagreement between a task terminal and an app branch control [R4]. A Claude Code issue author reported concurrent subagents appearing to share worktree/isolation state [R5]. Both remain reports, not verified cross-platform behavior. |
| **User goal** | Know which folder, branch, files, and authority boundary a practical task actually uses before changing anything. |
| **Source** | [R4](#source-ledger) and [R5](#source-ledger): traceable public issue reports. [O3](#source-ledger): Claude Code permission guidance distinguishes authority from instructions. |
| **Safe action** | Before edits, capture the working directory, repository identity, current branch, status, and intended files. Keep concurrent work isolated by task and target; do not assume a displayed label proves the active target. For a mismatch, pause and compare observable local state rather than applying a workaround from an issue thread. |
| **Evidence to keep** | Timestamped target receipt: working directory, repository root, branch/revision, status summary, intended paths, permission mode, and any mismatch. |
| **Stop condition** | Stop before a write when the target is ambiguous, a target receipt changes unexpectedly, shared state cannot be ruled out, or resolving the mismatch would require broader authority. |
| **Owner / review** | Task owner confirms the target; repository owner confirms consequential changes. Recheck issue state and official workspace/permission docs before teaching a vendor-specific procedure. |

### N5 — A documented example and the available runtime disagree

| Field | Record |
| --- | --- |
| **Evidence class** | Public user report plus project inference |
| **Symptom** | An xAI SDK issue author reported a documented Batch API example being rejected for the named model [R6]. The open issue is a discrepancy report, not confirmation of present API behavior or a workaround. |
| **User goal** | Try a practical integration without confusing a copied example, a current entitlement, and a verified local result. |
| **Source** | [R6](#source-ledger): public issue report. [O4](#source-ledger): xAI tool/API overview documents tool flow, not the reported Batch API claim. [O1](#source-ledger): prompt/model behavior should be checked with evaluation rather than assumed stable. |
| **Safe action** | Treat examples as hypotheses. Record the documentation URL, access date, account/environment boundary, exact minimal input, and observable response. Remove secrets from records. Prefer a non-destructive, low-cost smoke check; if it fails, preserve the error category and return to the current owner documentation. |
| **Evidence to keep** | Documentation revision/access date; minimal redacted request shape; environment and model identifier; response/error category; current official support statement; next decision. |
| **Stop condition** | Stop when a test needs a secret, payment, production data, or an unsupported configuration; when documentation and runtime disagree; or when an error would be hidden by swapping in an unverified substitute. |
| **Owner / review** | Integration owner owns credentials and runtime confirmation; vendor documentation owner remains authoritative for product facts. Recheck before each production-facing change. |

## Small durable prompt-pattern principles

These are **project inferences**, not vendor prompts and not guaranteed
outcomes. Use only the fields that reduce a real ambiguity; the aim is a short
task agreement, not a longer incantation.

1. **Name a performance, not a topic.** Ask for one thing the learner will say,
   check, build, or decide in one bounded situation.
2. **Set a visible boundary.** State allowed inputs, known material, time,
   files, tools, side effects, and what must not happen.
3. **Attempt before answer.** For learning, preserve an unaided attempt and
   learner correction. For work, inspect before changing.
4. **Ask for a receipt.** Specify the evidence that counts: a source mapping,
   diff, test output, screenshot, or user check—not merely a confident summary.
5. **Treat sources and tools as data.** A citation, page, tool output, or
   pasted artifact can inform the task but cannot expand authority or prove its
   own claim.
6. **Make stopping safe.** Stop on ambiguity, missing authority, unexpected
   scope growth, unsupported claims, or repeated same-kind failure. Report the
   gap and the smallest next check.

A compact formulation is enough for many beginner tasks:

```text
Result: [one observable result]
Context: [only the relevant inputs and source dates]
Boundary: [allowed actions/aids and prohibited side effects]
Check: [evidence that would show the result]
Stop: [ambiguity, missing authority, unsupported claim, or scope expansion]
```

For language work, add the allowed material and a learner attempt before
feedback. For research, add claim-to-source mapping and exclusions. For an
agentic practical task, add target receipt and explicit action authority.

## Limits and next evidence

This study did not run a learner session, reproduce a vendor issue, compare
products, inspect account-specific settings, or test a prompt. It therefore
does not support claims about language gain, retention, transfer, fluency,
seven-day mastery, research completeness, model reliability, agent safety, or
cross-platform equivalence.

Before promoting a need card into a public lab, run a low-risk pilot using
synthetic or public material. Keep the initial request, the declared boundary,
attempts/actions, receipts, help or permission events, stop reason, and a
delayed or independent check where appropriate. A pilot can strengthen a
specific workflow claim; it cannot turn the underlying reports into prevalence
evidence.

## Source ledger

| ID | Source and access date | Evidence class | Used for | Boundary and next review |
| --- | --- | --- | --- | --- |
| O1 | [OpenAI: Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering), accessed 2026-08-13 | Official fact | Prompt behavior can vary; guidance recommends tests/evaluations as models and prompts change | OpenAI API guidance only; not learner evidence or cross-platform behavior. Owner: OpenAI. Review 2026-11-13. |
| O2 | [Anthropic: Best practices for Claude Code](https://code.claude.com/docs/en/best-practices), accessed 2026-08-13 | Official fact | Runnable verification and explore-plan-implement workflow | Claude Code guidance only; does not prove an agent completed a task. Owner: Anthropic. Review 2026-11-13. |
| O3 | [Anthropic: Configure permissions](https://code.claude.com/docs/en/permissions), accessed 2026-08-13 | Official fact | Permissions distinguish reading, shell execution, and file modification | Claude Code configuration details only; not a statement about other products. Owner: Anthropic. Review 2026-11-13. |
| O4 | [xAI: Tools overview](https://docs.x.ai/developers/tools/overview), accessed 2026-08-13 | Official fact | Tool-enabled API flows and citation return surface | xAI API guidance only; citations still require source inspection. Owner: xAI. Review 2026-11-13. |
| O5 | [IES: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), accessed 2026-08-13 | Official fact | Retrieval and worked-example considerations for learning design | Not a study of LLM tutoring, a language-level assessment, or a guaranteed learning schedule. Owner: U.S. IES/WWC. Review 2027-08-13. |
| O6 | [ACRL: Framework for Information Literacy for Higher Education](https://www.ala.org/acrl/standards/ilframework), accessed 2026-08-13 | Official fact | Authority is contextual; research is inquiry; searching is strategic | Not a mechanical citation validator or guarantee that a finite search is complete. Owner: ACRL. Review 2027-08-13. |
| R1 | [OpenAI Community: Prompt for language learning with stories](https://community.openai.com/t/prompt-for-language-learning-with-stories/567389), accessed 2026-08-13 | Public user report | Reported difficulty keeping generated stories at a requested beginner level | One author's experience; no frequency, causal finding, local reproduction, or official level assessment. Review before reader-facing product claim. |
| R2 | [OpenAI Community: Hallucinated URLs and fake article titles](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893), accessed 2026-08-13 | Public user report | Reported citation/URL trust failure | Single unverified allegation; not an incident finding, current product conclusion, or prevalence estimate. Review before reader-facing product claim. |
| R3 | [openai/codex issue #8648](https://github.com/openai/codex/issues/8648), accessed 2026-08-13; open when checked | Public user report | Reported response to earlier rather than latest conversation topic | Issue report only; not a root-cause diagnosis or current reproduction. Review issue and official docs before product-specific teaching. |
| R4 | [openai/codex issue #37591](https://github.com/openai/codex/issues/37591), accessed 2026-08-13; open when checked | Public user report | Reported task-terminal and app branch/worktree mismatch | Issue report only; not a workaround or statement about all Codex tasks. Review issue and official docs before product-specific teaching. |
| R5 | [anthropics/claude-code issue #84685](https://github.com/anthropics/claude-code/issues/84685), accessed 2026-08-13; open when checked | Public user report | Reported concurrent subagent worktree/isolation interaction | One report; no local reproduction or official confirmation. Do not use linked private evidence. Review before product-specific teaching. |
| R6 | [xai-org/xai-sdk-python issue #176](https://github.com/xai-org/xai-sdk-python/issues/176), accessed 2026-08-13; open when checked | Public user report | Reported Batch API documentation/runtime mismatch for a named model | Issue report only; no present API claim, entitlement conclusion, or approved substitution. Review current owner documentation before use. |

## Acceptance checklist

- [x] Separates official facts, public reports, and project inferences.
- [x] Includes language, research, and practical-task needs without treating
  platforms as equivalent.
- [x] Gives each card a symptom, goal, source, safe action, retained evidence,
  stop condition, and owner/review.
- [x] Uses only short original pattern principles; no copied long prompts,
  screenshots, code, or unclear-license material.
- [x] Makes no claim of language mastery, seven-day outcomes, prompt
  effectiveness, issue reproduction, or cross-platform product behavior.
