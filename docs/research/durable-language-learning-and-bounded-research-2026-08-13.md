# Durable Language Learning and Bounded Research with LLM Assistance

**Status:** research candidate

**Accessed:** 2026-08-13
**Scope:** platform-neutral learning and research methods, with volatile
product guidance separated into vendor-specific reference rows

## Problem

An LLM can produce a fluent correction, a plausible source list, or a polished
summary before the learner has demonstrated any capability. That creates three
common category errors:

1. assisted performance is reported as independent learning;
2. one immediate success is reported as retention, transfer, fluency, or
   mastery;
3. a large collection of links is reported as exhaustive or verified research.

The project needs methods that remain useful to beginners but withstand expert
review. The method must record conditions, aids, source ownership, uncertainty,
and stop rules instead of treating model confidence as evidence.

## Concept

Use the model as a coach and research assistant inside a fixed evidence
contract. For learning, separate retrieval, correction, immediate variation,
delay, and unseen transfer. For research, separate the question, source-owner
map, atomic claim ledger, synthesis, and stop receipt.

```text
learning: baseline -> retrieval -> graduated help -> learner correction
                   -> immediate variation -> delayed unseen transfer

research: bounded question -> source-owner map -> claim ledger
                           -> synthesis -> stop receipt
```

Neither path lets the model certify its own effectiveness. Saved artifacts and
declared conditions support only narrow observations.

## Decision

### Capability labels are project evidence bands

The following labels are not CEFR or ACTFL proficiency levels:

| Band | Narrow meaning | Required evidence | Does not establish |
|---|---|---|---|
| Language L1 | Bounded attempt under recorded conditions | Target, task revision, aids, attempt, rubric | General proficiency or learning |
| Language L2 | Corrected performance on an immediate changed case | L1 packet, help record, learner correction, changed case, score | Retention, fluency, real-world performance |
| Language L3 | Performance on an unseen case after a recorded delay, with aids disclosed | Delay, sealed/unseen task, attempt, aids, scorer, rubric, unknowns | A CEFR/ACTFL level, permanent retention, mastery |
| Research R1 | Bounded question and source-owner map | Scope, exclusions, likely primary owners, stop conditions | Complete discovery |
| Research R2 | Atomic claim ledger with direct support, scope, disagreement, and reuse boundary | Claim-by-claim citations and unresolved items | Source truth outside recorded scope |
| Research R3 | Bounded synthesis with stop receipt and unresolved claims | R1/R2 packet, synthesis, searched surfaces, stopping reason | Exhaustive research or universal conclusion |

Use these learning states when a single ordered vocabulary is needed:

1. `not_attempted`
2. `attempted`
3. `demonstrated_on_this_task`
4. `repeated_in_similar_tasks`
5. `delayed_unseen_transfer_observed`

Independent assessment is a separate field. None of these states silently
means mastered, fluent, expert, certified, or independently assessed.

### Language-learning contract

- Fix the target capability, inputs, allowed aids, time or turn budget, and
  scoring dimensions before the baseline.
- Ask for retrieval before revealing an answer. Escalate help from error
  location, to partial cue, to one worked fragment. Preserve the highest help
  level used.
- Require a learner-authored correction. A model rewrite is not learner
  evidence.
- An immediate variation changes surface details and one ambiguity while
  preserving the target capability and rubric.
- A delayed unseen transfer task is unrevealed until after a recorded interval.
  Passing it supports only observed transfer on that task under those aids.
- Treat seven days as a starter plan or observation window, never a guaranteed
  route to fluency, mastery, retention, or a proficiency level.

CEFR descriptors, the CEFR Companion Volume, ACTFL Proficiency Guidelines, and
NCSSFL-ACTFL Can-Do Statements can help specify observable capabilities. They
do not authorize an LLM or this project to award a proficiency level from one
exercise.

### Bounded-research contract

1. Write one answerable question, exclusions, decision owner, deadline, and
   stop rule.
2. Map each claim type to its likely primary owner: specification body,
   product vendor, repository maintainer, regulator, or original researcher.
3. Search laterally. Identify the publisher and check what independent sources
   say before relying on an unfamiliar page.
4. Maintain atomic claims. Each row records direct support, access date,
   applicable scope, disagreement, reuse boundary, and what the source does not
   prove.
5. Prefer primary sources for product behavior and original or review research
   for learning claims. Community reports can identify symptoms, not prevalence
   or root cause.
6. Stop when the defined claim set is supported, contradicted, or explicitly
   unresolved and the planned source surfaces are exhausted. Save a stop
   receipt; do not call the search exhaustive.

## Action

### Minimal learning packet

```text
target | conditions | allowed_aids | baseline_revision | baseline_attempt
hints_used | learner_correction | immediate_variation_revision
immediate_attempt | delay | unseen_task_revision | delayed_attempt
rubric | scorer | scores | unknowns | supported_status | claim_limit
```

### Minimal research packet

```text
question | exclusions | decision_owner | deadline | stop_rule
source_owner_map | searches_run | claim | direct_support | source_type
accessed | scope | disagreement | reuse_boundary | does_not_prove
unresolved_claims | stop_receipt | synthesis_revision
```

Keep both exercises low-risk. Use synthetic or public material and disposable
local records. Do not include credentials, private data, external contact,
purchases, publication, production changes, or destructive actions without a
separately authorized protocol.

## Evidence

The learning-science sources support retrieval practice, corrective guidance,
and distributed practice as useful design considerations. They do not validate
an LLM tutor, this curriculum, a seven-day promise, or a specific learner
outcome. CEFR and ACTFL materials support capability description and
self-assessment framing; they do not turn a project rubric into certification.

The information-literacy sources support bounded questions, authority by
context, and lateral evaluation. They do not guarantee that a finite search is
complete or that a source is true merely because it appears authoritative.

Official OpenAI, Anthropic, and Google prompting pages are volatile
product-guidance references. Their inclusion does not establish model
superiority, cross-platform equivalence, or local runtime behavior.

## Failure and boundary cases

- If the model provides the target answer before the baseline, mark the
  baseline contaminated; do not reconstruct an unaided attempt.
- If the changed task repeats lesson sentences, reject it as near-copy evidence.
- If the delayed task is visible during practice, it is not unseen.
- If the delay is missed, record `not_run`; do not infer retention from an
  immediate score.
- If the same model teaches and scores, disclose scorer dependence.
- If a source only repeats another page, cite the underlying owner where
  possible and record the repetition as secondary evidence.
- If primary sources disagree or do not answer the claim, preserve the
  disagreement or unknown instead of averaging it away.
- If the search stops because of time or access, state that reason. Do not use
  “comprehensive,” “complete,” or “exhaustive.”

## Source ledger

| Source | URL | Applicable scope | License or reuse boundary | What it does not prove |
|---|---|---|---|---|
| Council of Europe, CEFR descriptors | https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions | Observable language capability descriptions | Reference only; Council of Europe material and linked files retain their own terms | An LLM-scored exercise certifies a CEFR level |
| Council of Europe, CEFR Companion Volume | https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors | Expanded descriptors and mediation/plurilingual framing | Reference only; do not copy tables or descriptor banks without file-level permission review | Fluency, mastery, or durable learning from a short lab |
| ACTFL Proficiency Guidelines 2024 | https://www.actfl.org/educator-resources/actfl-proficiency-guidelines | Functional proficiency framework and assessment context | Reference only; ACTFL material retains its terms and marks | A project evidence band is an ACTFL rating |
| NCSSFL-ACTFL Can-Do Statements | https://www.actfl.org/educator-resources/ncssfl-actfl-can-do-statements | Goal setting and reflective self-assessment | Reference only; do not reproduce statement banks without permission review | Independent certification or automatic proficiency measurement |
| IES, Organizing Instruction and Study to Improve Student Learning | https://ies.ed.gov/ncee/wwc/PracticeGuide/1 | Retrieval, spacing, worked examples, and study organization | U.S. government practice-guide reference; check linked-file notices before adaptation | LLM tutoring effectiveness or guaranteed transfer |
| Roediger and Karpicke (2006) | https://doi.org/10.1111/j.1467-9280.2006.01693.x | Testing effect and delayed retention under studied conditions | Scholarly reference; article text is not copied | Universal effect sizes, language fluency, or this curriculum's effectiveness |
| Cepeda et al. (2006) | https://doi.org/10.1037/0033-2909.132.3.354 | Distributed-practice review and timing considerations | Scholarly reference; article text is not copied | One optimal interval for every learner or task |
| ACRL Framework for Information Literacy | https://www.ala.org/acrl/standards/ilframework | Authority as contextual, inquiry, and information creation | Reference only; ALA/ACRL text retains its terms | That a bounded search is exhaustive or every authoritative source is correct |
| Stanford History Education Group, Evaluating Information | https://purl.stanford.edu/fv751yt5934 | Lateral reading and civic online reasoning study context | Research reference; report text and instruments are not copied | Universal research competence or correctness of a particular source |
| OpenAI prompt engineering guide | https://platform.openai.com/docs/guides/prompt-engineering | Volatile OpenAI API prompting guidance | Reference only; recheck before publication, owner OpenAI, next review 2026-11-13 | Cross-platform behavior or model superiority |
| OpenAI Codex prompting | https://developers.openai.com/codex/prompting/ | Volatile Codex-specific task communication | Reference only; recheck before publication, owner OpenAI, next review 2026-11-13 | Current local permissions, runtime success, or other vendors' behavior |
| Anthropic prompt engineering overview | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Volatile Claude prompting workflow | Reference only; recheck before publication, owner Anthropic, next review 2026-11-13 | Codex/OpenAI behavior or cross-model ranking |
| Google prompting strategies | https://ai.google.dev/gemini-api/docs/prompting-strategies | Volatile Gemini prompting guidance | Reference only; recheck before publication, owner Google, next review 2026-11-13 | Other platforms' behavior or model superiority |

All rows were accessed on 2026-08-13. URLs and hosted product facts can change;
recheck them before reader-facing product claims are released.

## Reuse and provenance boundary

This report is an original synthesis. It does not copy source prose,
descriptor tables, assessment instruments, prompts, code, images, or Skill
instructions. It does not inspect, copy, paraphrase, or adapt the six prompts
mentioned in the supplied X reference. A public post, screenshot, or prompt
list is not reusable merely because it is visible.

## Reflection

Which claim depends on model assistance rather than learner or researcher
evidence? Which aid would change the interpretation of the result? Which source
owner is missing? What is the smallest delayed or independent check that could
strengthen—or falsify—the current claim?

## Acceptance checklist

- [ ] Capability labels are explicitly distinct from CEFR and ACTFL levels.
- [ ] Baseline, aids, variations, delays, rubrics, and scorers are recorded.
- [ ] Seven days is described only as a starter plan or observation window.
- [ ] Research claims have direct support, scope, disagreement, and reuse limits.
- [ ] Every source has a URL, access date, scope, reuse boundary, and non-claim.
- [ ] Volatile product facts have an owner and next-review date.
- [ ] No claim asserts fluency, mastery, certification, exhaustive research,
  LLM tutoring effectiveness, model superiority, or production readiness.
