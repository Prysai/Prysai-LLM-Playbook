# Original Skill overlap and controlled evidence patterns

**Access date:** 2026-08-13
**Status:** research record; recommendations only
**Scope at the recorded checkpoint:** the twelve project-owned candidate
Skills, two proposed methods, controlled prompt comparison, and bounded
evidence of learning
**Decision at the recorded checkpoint:** add no new top-level Skill now

> **Later status — 2026-08-13:** this historical overlap decision predates
> `prysai-first-turn-check` (S83). That candidate owns a narrower seam not
> assessed here: it labels material gaps in an existing unsent, text-only,
> low-risk draft and does not draft, research, coach, execute, or repair a
> failed interaction. Its separate routing fixtures and candidate limits are
> the authoritative current record.

## Executive decision

At this recorded checkpoint, the project had twelve candidate Skills and no
demonstrated ownership gap requiring either proposal as a thirteenth or
fourteenth Skill. `practice evidence reviewer`
collides with Learning Coach and Evidence Review. Its useful controls belong in
a learning-evidence evaluation profile and checklist: Learning Coach owns the
live practice turn; Evidence Review audits an existing learning claim and its
packet. `prompt-to-experiment` collides with Task Protocol, Communication
Failure Triage, Research Router, and the evaluation framework. Its useful
method belongs in a versioned protocol/template, or later in a candidate runner
if executable repetition is needed.

Do not promote either proposal to a Skill unless fresh-context trigger tests
show a distinct user intent, a unique executable owner, non-recursive handoffs,
and better routing than the existing owners. This recommendation is about
interface depth, not about reducing curriculum depth.

## Local evidence inspected

- `docs/skill-registry.md` lists twelve project-owned candidates, all at
  `candidate`; structural checks are not runtime or transfer evidence.
- The twelve `skills/prysai-*/SKILL.md` files define current ownership and
  yield rules.
- Before this milestone, `docs/quality/skill-routing-matrix.md` described eleven
  Skills in its heading and prose while the repository already contained twelve,
  including Communication Failure Triage. This milestone corrects that stale
  count; the defect was maintenance debt, not evidence for another Skill.
- `evals/candidates/task-contract-availability-and-channel-v1/evaluation-plan.json` fixes the
  task and acceptance contract, uses fresh disposable sessions/workspaces,
  holds model/settings/tools/permissions/budget constant, randomizes condition
  order with a recorded seed, requires at least five repetitions, preserves
  every repetition, and calls for two condition-blind reviewers.
- That task-contract availability and channel candidate is explicitly `not_run`; the controls
  are a design, not comparative evidence.
- `evals/candidates/learning-practice-contract-v1/README.md` separates
  `process_pass` from `learner_outcome`, records aids and corrections, uses a
  changed transfer card, and says retention remains `not_run` until a learner
  returns after a stated delay for a new unaided task.

## Twelve-Skill responsibility and overlap matrix

| Existing Skill | Exclusive primary responsibility | Nearest overlap relevant here | Required boundary | Recommendation |
|---|---|---|---|---|
| Codex Coach | Teach GPT, Codex, tools, Skills, and Agent workflows | Learning Coach; Evidence Review | It may design Codex practice, but must not certify broad mastery from a coached task | Keep; route learning-claim audit to Evidence Review |
| Communication Failure Triage | Diagnose an already failed interaction and define one controlled repair rerun | Task Protocol; proposed `prompt-to-experiment` | Requires preserved request/context/output/expectation; changes one communication variable | Keep; use its rerun card as an input to a comparison protocol |
| Evidence Review | Audit an existing claim or artifact against inspectable evidence | Learning Coach; proposed `practice evidence reviewer` | Does not coach, repair, or execute missing checks | Add a learning-evidence profile/checklist, not a Skill |
| Field Signal Curator | Turn public reports into traceable demand/failure signals | Research Router; Source Investigator | Reports do not establish prevalence, cause, or fix | Keep; unrelated to controlled scoring ownership |
| Learning Coach | Run live non-Codex practice with baseline, attempt, feedback, correction, and transfer | Codex Coach; Evidence Review | Owns formative practice, not independent outcome certification | Keep; emit a complete receipt for later audit |
| Platform Adapter Review | Decide whether named-platform content adds a sourced, runnable delta | Source Investigator; Evidence Review | Does not infer cross-platform equivalence | Keep; platform facts remain outside generic eval method |
| Product Context | Maintain versioned product/audience/positioning context | Research Router; Task Protocol | Does not invent customer evidence or execute downstream work | Keep; no role in grading |
| Research Router | Scope broad research and design its source/evidence route | Source Investigator; proposed `prompt-to-experiment` | Owns research design, not settled experiment execution | Keep; use only when the comparison question is unresolved |
| Skill Selector | Select the smallest fitting Skill set and assess overlap/dependencies | Every proposed new Skill | Selection is not execution or certification | Keep; make unique ownership a hard admission gate |
| Source Investigator | Execute a bounded current-source lookup and return a claim ledger/stop receipt | Research Router; Evidence Review | Does not broaden the question or prove outcomes | Keep; use for volatile vendor facts only |
| Task Protocol | Turn an underspecified request into one bounded task contract | Communication Failure Triage; proposed `prompt-to-experiment` | Defines goal, inputs, constraints, actions, acceptance, failure, and delivery; does not run the task | Keep; express prompt comparison as a protocol profile/template |
| Workflow Orchestrator | Coordinate dependent stages and checkpoints | Task Protocol; all domain routes | Coordinates but does not absorb domain methods or grant permission | Keep; only needed when a real study spans collection, runs, review, and delivery |

## Proposed method placement

### `practice evidence reviewer`

Reject as a top-level Skill. A useful evaluation profile should require:

1. **Baseline contamination gate:** save the learner's first attempt before
   target language, solution fragments, rubric answers, or corrective examples
   are disclosed. If exposed, mark the baseline `contaminated` rather than
   reconstructing it.
2. **Aid disclosure:** record allowed aids, actual hints, answer fragments,
   retries, time/turn budget, and whether the final attempt was unaided.
3. **Learner-authored correction:** preserve the learner's revised response;
   a tutor-written ideal answer is feedback, not learner performance.
4. **Immediate changed-case identity:** predeclare the target capability and
   rubric, then change surface details and at least one relevant ambiguity.
   Record the delta so a near-copy cannot silently count as transfer.
5. **Recorded delayed unseen task:** record interval, task author, reveal time,
   aid policy, attempt, and scoring. Success supports only observed performance
   on that task, not general retention or mastery.
6. **Scorer independence:** identify author, coach, scorer, and adjudicator.
   A model grading its own coached output is formative evidence, not independent
   outcome evidence. Blind condition labels and output order where feasible.
7. **Narrow status vocabulary:** use `not_attempted`, `attempted`,
   `demonstrated_on_this_task`, `repeated_in_similar_tasks`, and
   `delayed_unseen_transfer_observed`. Store independent assessment as a
   separate field. Do not silently map these states to fluency, mastery, CEFR,
   credentials, or production readiness.

### `prompt-to-experiment`

Reject as a top-level Skill now. Preserve its value as a versioned comparison
protocol with these fields:

```text
question | fixed capability | task-set revision | condition definitions
model/surface/version | context | tools | permissions | budget | seed
repetitions | stopping rule | rubric revision | scorer identities
blinding/randomization | raw-run locations | missing telemetry policy
analysis plan | decision owner | limitations
```

Use Task Protocol to freeze the task, Communication Failure Triage when an
observed failure motivates a one-variable repair, and the evaluation framework
for scoring and reporting. Use Research Router only if the comparison question
or evidence design is still broad. A future runner could own deterministic
execution, manifests, and receipts, but only after trigger and runtime tests
demonstrate that this is executable ownership rather than another planning
route.

## Controlled evidence pattern

For prompt conditions, hold the target task, input artifact, allowed context,
model/surface/version, settings, tools, permissions, time/turn budget, stopping
rule, and scoring dimensions fixed. Change only the declared communication
condition. Pre-register exclusions and missing-value handling. Randomize run
and review order, preserve all runs, repeat enough to expose variability, and
use condition-blind scorers against a rubric written before results are seen.
Calibrate automated graders against human judgments; disagreements and failed
runs remain evidence rather than being discarded.

For learning evidence, the sequence is different:

```text
uncontaminated baseline -> feedback -> learner correction
-> immediate changed case -> recorded delay -> unrevealed changed task
-> independent or explicitly non-independent scoring -> narrow claim
```

A fixed baseline makes within-task change interpretable. An immediate changed
case checks whether performance survives a controlled variation. A delayed
unseen task reduces immediate answer carryover and provides task-scoped
transfer evidence. None alone certifies a durable general capability.

## Official and primary-source claim ledger

All sources were accessed on **2026-08-13**. Vendor documentation is volatile;
the learning and testing methods are more durable but still scoped to the
studies or standards cited.

| Stability | Source and exact URL | Applicable claim | License/use decision | Does not establish |
|---|---|---|---|---|
| Volatile vendor guidance | OpenAI, **Evaluation best practices**, https://platform.openai.com/docs/guides/evaluation-best-practices | Define an eval objective, dataset, and metrics; include typical, edge, and adversarial cases; prefer constrained judging such as pairwise/pass-fail or criteria scoring; calibrate automated scores with human feedback; randomized blinded human review is an available pattern | `reference-only`; cite short factual synthesis and URL. Hosted terms may change; do not copy prose, examples, rubrics, or UI assets | That an LLM judge is correct, that one score generalizes, or that this project's candidate was run |
| Volatile vendor guidance | OpenAI, **Working with evals**, https://platform.openai.com/docs/guides/evals | Evals can define test data and graders and compare runs; useful as current product implementation guidance | `reference-only`; no API code or examples copied; recheck before implementation | Product permanence, cross-provider equivalence, or learner outcomes |
| Volatile software | OpenAI, **openai/evals**, https://github.com/openai/evals | First-party repository describes a framework and benchmark registry for evaluating LLM systems | Repository is MIT at access time; still `reference-only` here because no code is needed. Inspect exact files/dependencies/notices before adaptation | Suitability of its benchmarks for this curriculum or permission to treat hosted data as project-owned |
| Volatile vendor guidance | Anthropic, **Define success criteria and build evaluations**, https://docs.anthropic.com/en/docs/test-and-evaluate/define-success | Start from measurable, task-relevant, multidimensional success criteria; use detailed rubrics and choose code, human, or model grading according to the criterion | `reference-only`; hosted documentation rights/terms not treated as adaptation permission; no prose, examples, or grader prompts copied | Claude superiority, grader independence, or proof that generated test cases represent production |
| Volatile vendor guidance | Google AI for Developers, **Prompt design strategies**, https://ai.google.dev/gemini-api/docs/prompting-strategies | Prompt design is iterative; clear instructions, examples, context, and controlled iteration are product guidance useful for defining conditions | Google developer documentation is generally offered under CC BY 4.0 unless noted, with code samples under Apache 2.0; this report uses only a short attributed factual synthesis and copies neither | That any listed prompt tactic improves every model/task, or that iteration without a fixed eval is causal evidence |
| Volatile vendor guidance | Google Cloud, **Gen AI evaluation service overview**, https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-overview | Evaluate on task-specific data and criteria; static rubrics apply the same criteria across prompts, while adaptive rubrics create prompt-specific tests; head-to-head comparisons can establish a use-case baseline | Google documentation default CC BY 4.0 unless noted; `reference-only` because service behavior and terms are volatile and no content/code is adapted | That adaptive rubrics are unbiased, that public leaderboards predict local performance, or cross-model superiority outside the fixed task |
| Durable education guidance | U.S. Institute of Education Sciences, **Organizing Instruction and Study to Improve Student Learning**, https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/20072004.pdf | Supports spacing learning over time, retrieval/quizzing, and connecting abstract and concrete representations as evidence-based instructional practices within its stated evidence ratings | U.S. government publication; `reference-only` factual synthesis. Preserve attribution and inspect embedded third-party material before reuse | That an LLM tutor implements the practices correctly, a universal optimal delay, or mastery in seven days |
| Durable original research | Roediger & Karpicke (2006), **Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention**, https://doi.org/10.1111/j.1467-9280.2006.01693.x | In the reported prose-learning experiments, retrieval testing improved delayed retention relative to repeated study despite different immediate results; supports separating immediate from delayed checks | Publisher article; `reference-only`, no prose, table, figure, instrument, or data copied | General skill mastery, transfer to unlike tasks, or effectiveness of AI coaching |
| Durable review/meta-analysis | Cepeda et al. (2006), **Distributed practice in verbal recall tasks: A review and quantitative synthesis**, https://doi.org/10.1037/0033-2909.132.3.354 | Distributed practice effects vary with retention interval and spacing; supports recording the interval rather than treating “delayed” as a magic fixed duration | Publisher article; `reference-only`, no prose, figures, tables, or datasets copied | One universally best spacing schedule, transfer, or a credential-level outcome |
| Durable testing standard | AERA, APA, and NCME, **Standards for Educational and Psychological Testing — Open Access Files**, https://www.testingstandards.net/open-access-files.html | Valid interpretation depends on intended score use and supporting evidence; scoring procedures, consistency, fairness, and documentation matter when claims exceed formative feedback | Copyrighted standards made available for access; `reference-only`. Do not reproduce standards text, tables, or instruments | That this project's rubric is validated, that blind review alone removes bias, or that a task score is a certification |

## What this report supports

It supports keeping the Skill surface at twelve candidates, adding a
learning-evidence profile to Evidence Review, strengthening the receipt emitted
by Learning Coach, and representing prompt comparison as a controlled protocol
or later runner rather than a new router. This milestone also corrects the
stale eleven-Skill wording in the routing document under the user's continuing
authorization to strengthen the project and synchronize coherent changes.

It does **not** prove that any prompt condition performs better, that any
learner retained or transferred a skill, that the current graders agree, that
the two proposed methods will route correctly, or that any candidate is
`verified` or `production-ready`. The local candidates remain `not_run` where
their records say so.

## Stop receipt

The search stopped after the requested OpenAI, Anthropic, Google, learning
science, and testing-standard roles had at least one primary or official source
and the local twelve-Skill ownership could be decided. Inaccessible or
publisher-controlled full texts were not bypassed. No external prompt, rubric,
Skill instruction, code, image, table, or assessment instrument was copied or
adapted.
