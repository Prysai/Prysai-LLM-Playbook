# Durable LLM-assisted learning and Skill candidates

**Accessed:** 2026-08-12 (America/Los_Angeles)  
**Status:** candidate research record; no Skill approved, installed, adapted, or implemented  
**Purpose:** define durable learning and efficient source-retrieval methods for an LLM-assisted curriculum, then identify a small set of original Skill directions and legally reviewable external references.  
**Evidence boundary:** learning-science sources support instructional mechanisms such as retrieval, spacing, feedback, and delayed checks. Vendor documentation supports product-use methods such as defining success, supplying context, routing to authoritative sources, and verifying work. Neither source class, alone or together, proves that an LLM tutor causes mastery. Repository popularity, a polished answer, course completion, or a permissive license is not outcome evidence.

## Executive decision

Build the curriculum around **demonstrated capability over time**, not prompt
theatre or completion streaks. The durable loop is:

```text
baseline -> attempt from memory -> targeted feedback -> corrected attempt
         -> spaced re-attempt -> unfamiliar transfer task -> calibrated claim
```

An LLM is useful inside this loop as a question generator, hint system,
feedback partner, example transformer, and evidence organizer. It is dangerous
when it supplies fluent answers before the learner retrieves, silently changes
the difficulty, grades its own output without a fixed rubric, or turns one
successful conversation into a claim of mastery.

For research, efficiency should mean **the shortest traceable route to adequate
evidence**, not the largest number of search results:

```text
decision -> atomic questions -> source-owner route -> exact passage/artifact
         -> conflict and freshness check -> bounded synthesis -> stop condition
```

Do not create six new Skill directories. The project already has overlapping
candidate Skills. The six original directions below are research candidates;
most should deepen or repair an existing Skill rather than expand the catalog.

## Questions and method

This record asks:

- Which learning mechanisms plausibly improve retention and transfer rather
  than immediate answer quality?
- How should an LLM participate without doing the learner's cognitive work?
- What makes source retrieval fast, authoritative, and auditable?
- Which original Skill boundaries are valuable and non-duplicative?
- Which public Skills are specific enough and licensed clearly enough for a
  later adaptation review?
- What evidence would be required before making a time-bounded mastery claim?

The review used source-owner product documentation, a U.S. Institute of
Education Sciences practice guide, original/review research records, and exact
Skill files at fixed Git revisions. It did not evaluate model quality, run a
learner study, install external Skills, or infer permission from repository
stars or root metadata alone.

## Source classes and what they can establish

| ID | Source | What it supports here | What it does not support |
| --- | --- | --- | --- |
| L1 | [IES practice guide: *Organizing Instruction and Study to Improve Student Learning*](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) | Spacing learning over time, alternating worked examples with problem solving, active-retrieval quizzing, delayed judgments of learning, and delayed review are legitimate instructional design mechanisms. | It is not an LLM study and does not validate a particular tutor, prompt, seven-day schedule, language course, or Skill. |
| L2 | Roediger and Karpicke (2006), [*Test-Enhanced Learning*](https://doi.org/10.1111/j.1467-9280.2006.01693.x) | Retrieval practice can be studied as a learning event rather than merely an assessment event; delayed retention is materially different from immediate performance. | One study does not define a complete curriculum or prove transfer to every subject, learner, or LLM workflow. |
| L3 | Dunlosky et al. (2013), [*Improving Students' Learning With Effective Learning Techniques*](https://doi.org/10.1177/1529100612453266) | Study techniques must be judged by evidence and boundary conditions; practice testing and distributed practice warrant serious curriculum attention. | A general review does not prove that generated quizzes are valid, feedback is correct, or a learner has mastered a capability. |
| V1 | OpenAI, [Codex prompting](https://learn.chatgpt.com/docs/prompting) | Current product guidance can inform how a user states tasks, context, constraints, and verification requests. | Prompt guidance is volatile product documentation and is not learning-outcome evidence. |
| V2 | Anthropic, [prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) and [Claude Code best practices](https://code.claude.com/docs/en/best-practices) | Define success criteria and empirical checks before optimizing prompts; manage environment, context, planning, verification, and sessions as a work system. | These hosted pages do not establish vendor-neutral superiority, educational retention, or a right to copy their expression. |
| S1-S5 | Exact external Skill files in the candidate table below | Concrete workflow mechanisms, trigger boundaries, and dependencies that can be reviewed at a fixed revision. | License compatibility does not establish quality, safety, maintenance, non-duplication, or permission to omit attribution/NOTICE duties. |

The IES guide is the strongest source here for a curriculum decision because it
connects several mechanisms in one instructional practice record. L2 and L3
provide scholarly anchors, but this report deliberately avoids converting
their findings into universal effect-size promises.

## Durable learning contract

### 1. Define capability at observable resolution

Do not use `understand`, `know`, `learn`, or `master` as acceptance criteria.
Name the action, conditions, aids, quality threshold, and evidence. Language
learning, for example, contains separable capabilities:

- recognize meaning;
- recall with a cue;
- retrieve without a cue;
- generate a novel response;
- sustain an interaction under realistic time and ambiguity;
- transfer to unseen vocabulary, speakers, tasks, or contexts;
- retain the capability after a delay.

A learner may demonstrate one and fail another. The status label must follow
the weakest material claim, not the most flattering performance.

### 2. Capture a baseline before coaching

Use a fixed or sampled task before giving explanations, examples, answer
choices, or generated hints. Record the task revision, allowed aids, time,
scoring rule, and result. Without a baseline, an improvement claim can be only
an impression.

### 3. Require retrieval before revealing

The default teaching turn should ask the learner to attempt the answer or plan
from memory. Then provide the smallest useful intervention:

1. ask for a self-explanation;
2. identify the location or kind of error without giving the answer;
3. give a partial cue;
4. show a worked fragment;
5. reveal and explain only when the prior levels are insufficient.

The original attempt and the post-feedback correction should both remain in
the record. If the model produces the target artifact first, the session may
teach recognition while creating a false impression of generation ability.

### 4. Space and vary practice

Do not repeat the same item until its surface becomes familiar. Schedule a
later attempt and vary examples, order, context, and distractors while holding
the capability constant. Interleave only where the learner must choose among
relevant strategies; random topic switching is not automatically useful
interleaving.

### 5. Separate feedback from evidence

Feedback explains how to improve. Evidence supports a status claim. A model's
encouragement, explanation, or self-score is not independent evidence. Use a
fixed rubric, deterministic checks where possible, retained artifacts, and a
human or blinded second review for consequential judgments.

### 6. Test retention and transfer

An immediate corrected attempt supports `corrected now`. A delayed attempt on
the same structure can support `retained under these conditions`. An unseen
task can support `transferred to this stated variation`. None alone supports
unbounded mastery.

### 7. Record failure, not only success

Preserve unsuccessful attempts, hints used, scorer disagreements, ambiguous
items, environmental changes, and dropped sessions. Failure data reveals
whether the intervention taught the capability or only optimized the test.

## Efficient, source-routed retrieval

### Retrieval protocol

1. **Name the decision.** Research must enable a decision, correction, or
   artifact. A topic without a decision invites unbounded browsing.
2. **Split atomic questions.** Separate definitions, current product facts,
   implementation behavior, legal/reuse status, user reports, and project
   judgment. They require different evidence.
3. **Route to the owner.** Prefer specifications, official documentation,
   source repositories, source-owner APIs, and original studies. Community
   reports may reveal failure modes but do not establish official behavior.
4. **Fetch the exact artifact.** Read the relevant section or file, not only a
   search snippet, generated summary, repository description, or license badge.
5. **Pin volatile artifacts.** Record URL, revision where available, access
   date, scope, and next review trigger. Current UI, model, pricing, quota, and
   feature facts require rechecking.
6. **Check conflict and absence.** State when sources disagree, when a claim is
   undocumented, and when a source is outside its competence.
7. **Synthesize by claim.** Attach a source to each material fact and keep
   source observation separate from project inference.
8. **Stop deliberately.** Stop when the decision's material claims have an
   adequate owner source, conflicts are bounded, and further retrieval is
   unlikely to change the decision. More links are not automatically more
   confidence.

### Common retrieval failures

| Failure | Why it is weak | Required correction |
| --- | --- | --- |
| Search-result accumulation | Snippets lose scope and freshness. | Open and inspect the exact source-owner artifact. |
| Vendor guide used as learning proof | Product operation and learning outcomes are different questions. | Add learning evidence or narrow the claim to product guidance. |
| Root license treated as file permission | Nested files, assets, contributions, and notices can differ. | Inspect the exact Skill directory, license, dependencies, and NOTICE obligations. |
| Model memory used for current product facts | It can be stale and untraceable. | Route to current official documentation and disclose unresolved gaps. |
| Generated citations | Plausible bibliographic text is not evidence. | Resolve the DOI, repository revision, official URL, or source record. |
| Endless research | Volume hides the decision and consumes review capacity. | Define material claims and a stopping rule before retrieval. |

## Critical audit: “learn a language in seven days”

### Verdict

As an unqualified promise, **reject it**. “Seven days” can honestly describe a
schedule or measurement window. It cannot by itself define or prove language
mastery, fluency, durable retention, or transfer.

### Why the claim fails

- `Language` is not one capability; the claim hides recognition, recall,
  generation, interaction, transfer, and retention behind one verb.
- Seven completed sessions measure participation, not learning.
- Reading, chat count, word exposure, streaks, satisfaction, and one immediate
  high score are proxy measures vulnerable to cueing and test familiarity.
- If the same model teaches, generates the test, exposes the answers, and
  scores the response, the evidence is not independent.
- Without a baseline, improvement cannot be estimated.
- Without a delayed check, immediate accessibility is confused with durable
  retention.
- Without unseen material and a changed context, rehearsal is confused with
  transfer.
- “Anyone”, “guaranteed”, “scientifically proven”, and “permanent” add claims
  that the cited sources do not support.

### Minimum evidence for a narrow seven-day result

| Evidence | Minimum content |
| --- | --- |
| Capability contract | Exact task, population, language level, conditions, allowed aids, and threshold |
| Baseline | Same capability measured before instruction with retained artifact |
| Practice log | Item provenance, timing, hints, feedback, retries, model/product version, and failures |
| Immediate check | Fixed rubric and task not previously answered verbatim |
| Independent scoring | Deterministic scoring where valid or blinded qualified review with disagreement handling |
| Delayed retention | Recheck after a stated delay without rehearsal immediately beforehand |
| Transfer | Unseen items and at least one changed context material to the capability |
| Claim boundary | Attrition, sample size, uncertainty, exclusions, and conditions under which the result does not generalize |

Even this package supports only a narrow measured result for the observed
participants and tasks. It does not justify “learn a language in seven days.”

### Honest alternatives

Acceptable when literally true:

- “a seven-day starter plan”;
- “complete seven guided practice sessions”;
- “demonstrate accurate recall of the defined item set on the immediate check”;
- “retain the defined capability at the stated delayed check under these
  conditions.”

Reject unless extraordinary matching evidence exists:

- “learn”, “master”, or “become fluent in a language in seven days”;
- “works for anyone”;
- “scientifically guaranteed”;
- “remember permanently.”

If delayed retention and transfer are absent, use `introduced` or `practised`.
If a fixed check passes, use `demonstrated on this check`. Reserve `retained`
and `transferred` for their respective evidence. Do not use `mastered` as a
convenient synonym for course completion.

## Original Skill directions: at most six

All six entries are **research candidates only**. They are not approved Skill
specifications, and their names are placeholders. The default disposition is
to deepen an existing project Skill where the boundary already exists.

| Candidate | Problem and trigger | Required output and behavior | Failure boundary and overlap decision |
| --- | --- | --- | --- |
| `learning-contract-designer` | A learning wish or mastery claim lacks capability, baseline, conditions, or evidence. | Produce a capability contract with aids, time budget, baseline, practice plan, immediate check, delayed check, transfer task, scorer, and bounded status vocabulary. Never convert session count into mastery. | Does not teach or score. **Merge into/repair `prysai-learning-coach` or deepen `prysai-codex-coach`; do not add a third general coach.** |
| `retrieval-practice-coach` | A learner wants practice and the main risk is answer leakage. | Capture an unaided attempt, give progressive hints, request self-explanation, provide corrective feedback, and retain attempt history. | Cannot certify learning, and must stop when the domain requires a qualified human. **A focused mode inside the learning coach, not automatically a standalone Skill.** |
| `evidence-first-study-planner` | A learner needs a schedule that supports retention rather than a streak. | Create spaced retrieval and varied-practice sessions with a delayed check, transfer task, missed-session rule, and evidence fields. Treat days as schedule, not outcome. | Scheduling cannot promise effect size or mastery. **Merge with the learning contract; split only if evaluations show trigger confusion.** |
| `source-routed-research` | A question requires fast, authoritative retrieval with citations and a stop rule. | Produce atomic questions, source routes, exact artifacts, freshness/license fields, conflicts, bounded synthesis, and a stopping receipt. | Does not turn absence into fact or broaden to arbitrary web search. **Deepen `prysai-research-router`; repair or remove the TODO-only `prysai-source-investigator` rather than create another router.** |
| `claim-calibration-auditor` | Copy or a report uses `learned`, `mastered`, `best`, `guaranteed`, or similar claims beyond its evidence. | Map each claim to required evidence, label current support, propose the narrowest truthful rewrite, and identify the smallest next check. | Does not execute missing tests or make legal conclusions. **Add a learning-claim profile to `prysai-evidence-review`.** |
| `transfer-and-retention-reviewer` | Immediate task success is being treated as durable or general capability. | Design or audit delayed and unseen-task checks; distinguish `practised`, `demonstrated`, `retained`, and `transferred`; preserve negative results. | One delayed test or near-copy item is insufficient for broad mastery. **Likely an evaluation profile of `prysai-evidence-review`, not a separate top-level Skill.** |

### Admission tests before any implementation

An original candidate must not be implemented until it has:

1. a trigger that does not collide materially with the existing nine project
   Skill candidates;
2. a fixed input/output contract and refusal/handoff cases;
3. positive, negative, overlap, and answer-leakage fixtures;
4. an evaluation that detects both overclaiming and over-refusal;
5. a maintenance owner and evidence/freshness boundary;
6. a reason it cannot be a profile, reference, or test set inside an existing
   Skill.

## External Skill candidates: at most five

These are **adaptation-review candidates**, not recommendations to copy,
install, bundle, or publish. The exact files and licenses were inspected at the
fixed revisions below. No external prose, code, prompt, template, reference,
example, configuration, or asset was copied into this project.

| ID | Repository and exact file | Exact license checked | Useful mechanism | Blocking boundary before adoption |
| --- | --- | --- | --- | --- |
| S1 | OpenAI `openai/skills` [`define-goal/SKILL.md` at `49f948f`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/define-goal/SKILL.md) | [`define-goal/LICENSE.txt`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/define-goal/LICENSE.txt), Apache-2.0 | Turns vague intent into a measurable outcome, evidence, scope, and stop condition. | Goal definition is not a learning plan or execution result. Review attribution/NOTICE, dependencies, overlap with `prysai-task-protocol`, and current frontmatter before any adaptation. |
| S2 | OpenAI `openai/skills` [`openai-docs/SKILL.md` at `49f948f`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/openai-docs/SKILL.md) | [`openai-docs/LICENSE.txt`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/openai-docs/LICENSE.txt), Apache-2.0 | Narrow official-source routing, source priority, cached manual use, gap escalation, and bounded uncertainty. | It is OpenAI/Codex-specific, depends on product tooling, and contains volatile routes. Do not relabel it as generic research. Review scripts, references, NOTICE, network behavior, and maintenance burden. |
| S3 | OpenAI `openai/skills` [`notion-research-documentation/SKILL.md` at `49f948f`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-research-documentation/SKILL.md) | [`notion-research-documentation/LICENSE.txt`](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-research-documentation/LICENSE.txt), MIT, copyright Notion Labs, Inc. | Search, fetch, trace sources, choose a report form, synthesize, cite, and publish/update. | It requires Notion MCP and OAuth and is scoped to Notion, including external writes. Review all referenced templates/examples, permissions, attribution, and whether only the source-tracking mechanism is needed. |
| S4 | GitHub `skills/exercise-creator` [`create-exercise-outline/SKILL.md` at `0cd52d0`](https://github.com/skills/exercise-creator/blob/0cd52d0c2abc1296945258c2c662eb82a5e6b328/.github/skills/create-exercise-outline/SKILL.md) | [repository `LICENSE`](https://github.com/skills/exercise-creator/blob/0cd52d0c2abc1296945258c2c662eb82a5e6b328/LICENSE), MIT, copyright GitHub | Aligns learning objective, ordered knowledge, activity, and workflow trigger before exercise implementation. | It targets GitHub Skills paths and workflows. Inspect linked template/instructions and asset licenses; independently express this project's lab contract. |
| S5 | GitHub `skills/exercise-creator` [`review-exercise/SKILL.md` at `0cd52d0`](https://github.com/skills/exercise-creator/blob/0cd52d0c2abc1296945258c2c662eb82a5e6b328/.github/skills/review-exercise/SKILL.md) | [repository `LICENSE`](https://github.com/skills/exercise-creator/blob/0cd52d0c2abc1296945258c2c662eb82a5e6b328/LICENSE), MIT, copyright GitHub | Reviews clarity, learner flow, links/assets, workflow consistency, and likely abandonment points from a learner perspective. | It is a format/flow review, not retention or transfer evidence. Evaluate S4 and S5 together to avoid duplicate installation and inspect all workflow dependencies. |

### Explicitly not shortlisted

- Anthropic's public Skill repository has mixed file-level license conditions;
  a repository root with no single license is not permission. No exact
  Anthropic Skill enters this shortlist without a specific, compatible license.
- GitHub `awesome-copilot` is useful discovery material, but root MIT status,
  community contribution, and catalog presence do not establish source quality
  or relevance to durable learning.
- GitHub's `agentic-workflows` Skill is product/workflow specific and would
  dynamically route into a larger GitHub Agentic Workflows surface. It does not
  solve the learning-retention question directly.
- A permissive license never replaces quality, behavior, dependency, security,
  maintenance, trademark, attribution, and duplication review.

## Recommended project decisions

1. Repair the TODO-only `prysai-learning-coach` and
   `prysai-source-investigator` before adding another Skill name.
2. Add a learning-evidence profile to `prysai-evidence-review` with the four
   statuses `practised`, `demonstrated`, `retained`, and `transferred`.
3. Make every learning path declare its baseline, answer-leakage policy,
   delayed check, transfer task, and scorer independence.
4. Ban unqualified time-to-mastery language in reader-facing content and
   evaluation fixtures.
5. Use external Skills only as file-specific references until a separate
   adaptation review covers full trees, dependencies, notices, behavior,
   duplication, maintenance, and tests.
6. Pilot the durable loop on one narrow existing capability before scaling.
   Compare immediate performance, delayed retention, hint dependence, and
   transfer; publish negative results.

## Claims this record supports and does not support

This record supports a candidate architecture for retrieval-first learning,
spaced and varied practice, delayed/transfer checks, calibrated claims, and
source-routed research. It supports further review of five exact external Skill
files under the recorded licenses.

It does **not** prove that the current curriculum improves learning, that any
model is an effective tutor, that seven days is enough for a defined
capability, that the six original candidates deserve standalone directories,
or that the five external candidates are safe and suitable to install. Those
claims require implementation-specific evaluation, learner/runtime evidence,
and a complete reuse review.

## Freshness and next review

| Material | Volatility | Owner | Review trigger |
| --- | --- | --- | --- |
| IES guide and cited research records | low to medium | curriculum research owner | before making a quantitative or population-wide learning claim |
| Hosted OpenAI and Anthropic guidance | high | platform adapter owner | before publication and on material product/documentation change |
| Fixed external Skill files and licenses | medium, high consequence | Skill/release owner | immediately before adaptation, installation, or public release |
| Candidate Skill boundaries | high project drift | Skill maintainer | after existing TODO Skills are repaired and overlap evals run |
| Seven-day claim policy | low principle, context-sensitive evidence | editorial/evaluation owner | when a time-bound learning claim is proposed |

The access date records inspection, not continuing freshness.
