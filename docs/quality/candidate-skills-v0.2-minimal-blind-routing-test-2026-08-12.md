# Candidate Skills 0.2.0 minimal blind routing test

**Test date:** 2026-08-12
**Scope:** one fresh prompt for each side of two routing boundaries; response
shape for the two revised 0.2.0 Skills
**Inputs read before construction:** current `docs/quality/skill-routing-matrix.md`
and the current Codex Coach, Learning Coach, Research Router, and Source
Investigator Skill files
**Excluded:** the previous forward-test conclusions, Skill edits, Git actions,
multi-turn learning outcomes, and broad source-completeness claims

## Result

The P0 single-owner routing defect is **closed for this four-prompt minimal
sample**:

| Blind prompt class | Single owner | Competing route rejected | Result |
|---|---|---|---|
| Learn a Codex workflow | Codex Coach | Learning Coach | pass |
| Practise spoken Spanish | Learning Coach | Codex Coach | pass |
| Design a broad evidence review | Research Router | Source Investigator | pass |
| Find one bounded current fact | Source Investigator | Research Router | pass |

The response-shape defect is **closed for Learning Coach and Source
Investigator**, but **not closed across the complete four-route experience**.
The revised Skills explicitly lead with an action/finding and use a compact
receipt only when needed. Their neighboring Codex Coach and Research Router
contracts still require exact nine- and ten-section outputs. Correct routing
therefore remains visibly form-driven for Codex learning and broad research.

This is a narrow behavioral result, not trigger verification across arbitrary
language. Four hand-written cases cannot establish production routing accuracy.

## BR-01 — Codex learning

### Raw prompt

```text
I keep asking Codex to fix a bug and then accepting “tests pass” without
checking what the tests covered. Teach me a small exercise that will make me
better at reviewing its evidence. Use a made-up repository example; do not edit
anything.
```

### Routing decision

**Owner: Codex Coach.** The target capability is specifically reviewing Codex
workflow evidence. Learning Coach must yield because this is GPT/Codex/Agent
workflow learning, even though the user uses the verb “teach.” No second coach
is started.

### Raw routed output

```text
goal_and_level

Goal: learn to separate “a check passed” from “the bug is covered.” Estimated
level: early practitioner—you already notice the evidence gap, but no concrete
example of your review method or desired proof was supplied.

next_concept

Coverage is a relationship between a claim, a failure mode, and a check. A
green command proves only what that command exercised in the recorded scope.

one_experiment

not_started. Text-only example: a parser fails on an empty file. Codex changes
the parser and reports `12 tests passed`. Before accepting, write the three
pieces of evidence you would request. No repository action is needed.

evidence_required

Your answer should identify: the exact changed behavior, a test that fails
before and passes after for the empty-file case, and the broader test command
with its limits. Explanation, judgment, and review evidence are required;
operation evidence is not required for this text-only exercise.

failure_and_recovery

Failure: treating the test count as coverage. Recovery: map each material claim
to the test or observation that can distinguish success from the original
failure.

reflection_question

What three evidence items would you request for the empty-file parser fix, and
which missing item would stop your acceptance?

handoff_or_none

none

risk_and_permissions

risk: R0. confirmation: none required for text-only practice. stop_conditions:
do not open, edit, or run a real repository until a separate bounded execution
task is authorized.

status

draft
```

### Assessment

- **Ownership:** unambiguous and correct.
- **Boundary:** no edit or execution permission inferred.
- **Form feel:** not improved. The exact nine headings fragment one compact
  exercise and expose internal status machinery to the learner.

## BR-02 — Spanish performance practice

### Raw prompt

```text
I can read basic Spanish, but I freeze when ordering food. Give me one short
speaking practice now. I want to order a vegetarian meal, ask whether it
contains nuts, and understand the price. Correct only mistakes that would
change the meaning.
```

### Routing decision

**Owner: Learning Coach.** The requested performance is non-Codex spoken
Spanish. Codex Coach must yield. No product fact, disputed source, or second
learning loop is needed.

### Raw routed output

```text
You are at the counter. Say this in Spanish without reading a model answer:

“Good evening. I would like a vegetarian meal. Does it contain nuts? How much
does it cost?”

Write what you would say, or record 20–30 seconds if audio is available.

I will score only three meaning checks:

- the meal is vegetarian;
- you ask about nuts rather than asserting that it has none;
- you ask for the price.

Pass threshold: all three meanings are understandable to a Spanish-speaking
reviewer. I will correct the first meaning-changing error, ask you to retry it,
then change the restaurant item for one transfer attempt. I will not interrupt
minor accent or style differences on this turn.
```

### Assessment

- **Ownership:** unambiguous and correct.
- **Method:** begins with free production, names scorer and threshold, withholds
  the answer, and limits correction scope as requested.
- **Form feel:** closed. It sounds like a coach and gives one immediate action;
  there are no empty fields, pending ledger, or candidate-status footer.
- **Remaining evidence:** correction and transfer cannot be judged until a
  learner attempt exists.

## BR-03 — broad research planning

### Raw prompt

```text
I am planning a report for a city library board about whether generative AI
literacy should become part of adult digital-skills programming. Help me define
the research questions, stakeholder scope, evidence standards, and source
strategy. Do not start collecting sources yet.
```

### Routing decision

**Owner: Research Router.** The topic still needs decomposition, audience and
evidence design, and a multi-source deliverable plan. Source Investigator must
yield because there is no single frozen lookup question or candidate set.

### Raw routed output

```text
research_question_and_scope

Primary question: under what local needs, risks, and delivery conditions should
this library system add adult generative-AI literacy programming? Scope to be
confirmed: service population, program format, accessibility, languages,
staffing, privacy, and the board's decision horizon.

method_and_search_strategy

Split the report into four evidence questions: demonstrated local need; useful
adult-learning outcomes; safety/privacy/accessibility risks; and delivery cost
and staffing. Plan separate routes for local usage evidence, adult-learning
research, library/institutional guidance, and comparable program evaluations.
Do not retrieve until jurisdiction, date boundary, and acceptable evidence
classes are fixed.

source_list

not_started. Planned owners: the library's own service data and policies;
relevant government or library institutions; primary adult-learning research;
and named program evaluations. Vendor pages and anecdotes may identify issues
but cannot establish outcomes.

evidence_map

not_started. Required fields will be claim, source location, date,
applicability to this library population, and status.

synthesis

not_started. The deliverable should support a conditional program decision,
not a universal claim that AI literacy is beneficial.

conflicts_and_missing_data

Missing: city/jurisdiction, target adult groups, languages/access needs,
existing program baseline, decision date, report length, and whether the board
needs a pilot recommendation or a permanent-program decision.

limitations_and_disclosure

No sources were collected and no effectiveness conclusion is supported.

next_review_point

Confirm jurisdiction, target population, decision date, and whether the board
is choosing a pilot or permanent program.

risk_and_permissions

R0 planning only; no source retrieval, participant contact, personal-data use,
or external write.

content_status

draft
```

### Assessment

- **Ownership:** unambiguous and correct.
- **Research boundary:** it designs questions and source classes without
  pretending research has run.
- **Form feel:** not improved. The exact ten fields generate multiple
  `not_started` sections where a short scoping brief and four questions would
  be clearer.

## BR-04 — bounded current fact lookup

### Raw prompt

```text
For an installation note dated today, find the latest stable Python 3 source
release listed by python.org. Use only python.org, give me the version and its
release date, and stop. Do not download anything.
```

### Routing decision

**Owner: Source Investigator.** The decision, owner domain, candidate class,
deliverable, and stopping rule are already fixed. Research Router would add
unnecessary planning.

### Raw routed output

```text
Python.org currently lists Python 3.14.7 as the latest Python 3 source release.
Its release date is August 11, 2026.

Receipt — question: latest stable Python 3 source release | checked:
python.org/downloads/source/ and python.org/downloads/release/python-3147/ on
2026-08-12 | finding: Python 3.14.7, released 2026-08-11 | conflict/unknown:
none within the two first-party pages | stop: requested fact found | next check:
recheck immediately before publishing the installation note | side effects:
public read-only requests; no download | artifact status: candidate
```

### Assessment

- **Ownership:** unambiguous and correct.
- **Evidence:** bounded to the named first-party owner and access date.
- **Form feel:** closed. The answer leads with the fact and compresses the
  audit trail into one receipt rather than forcing a ten-part ledger.
- **Claim limit:** `candidate` describes this unreviewed investigation receipt;
  it does not mean Python or the installation note was independently verified.

## P0 closure decision

**Close P0 for the revised routing contract and this minimal blind sample.**
The domain split is now explicit in both directions:

```text
GPT / Codex / tools / Skills / Agent learning -> Codex Coach
other human performance practice              -> Learning Coach

broad topic, literature design, source plan   -> Research Router
bounded current lookup for a settled decision -> Source Investigator
```

No test output invoked two owners, started a recursive handoff, or used the
narrow Skill as a decorative second layer. This closes the previously observed
contract ambiguity, not all trigger accuracy. Keep the routing matrix at
`candidate` until paraphrase, mixed-intent, explicit-override, and adversarial
fixtures pass across models/surfaces.

## Response-shape decision

| Route | Natural action/finding first? | Empty/pending form avoided? | Decision |
|---|---:|---:|---|
| Learning Coach 0.2.0 | yes | yes | closed |
| Source Investigator 0.2.0 | yes | yes | closed |
| Codex Coach 0.2.0 | no | no | remains |
| Research Router 0.2.0 | no | no | remains |

The two revised Skills have escaped the fixed-form style on their intended
simple tasks. The system as a whole has not: correct routing exposes the older
fixed forms on exactly half of this boundary test. That is a P1 usability issue,
not a reason to reopen the P0 ownership decision.

## Status boundary

This report records four constructed fresh prompts and their contract-following
outputs. It does not establish learner improvement, Spanish correctness across
dialects, exhaustive research planning, Python release freshness after the
access date, routing stability across unseen prompts, or production readiness.
No Skill, routing file, project status, or Git state was modified by the test.
