# Cross-platform LLM learning systems benchmark

**Accessed:** 2026-08-12 (America/Los_Angeles)  
**Status:** candidate research record  
**Purpose:** identify first-party curriculum and documentation mechanisms that can serve both first-time users and experienced practitioners without turning the Field Guide into a broad, shallow AI encyclopedia.  
**Evidence boundary:** observations below come from source-owner repositories or official product documentation. Recommendations are original project judgments. Repository presence, polished examples, stars, and green workflows do not prove learner mastery or production fitness. No external prose, code, prompts, images, configuration, or brand assets were copied.

## Executive decision

Do **not** rename the project into a generic large-language-model tutorial yet. The strongest architecture is a T-shaped learning system:

1. a **transferable core** that teaches task definition, context, communication, tool boundaries, iteration, evidence, failure recovery, and evaluation across model vendors;
2. a **Codex depth track** that remains the most complete implementation of those ideas;
3. **platform playbooks** for Claude Code, GitHub Copilot, Gemini CLI, and later products, each limited to setup, interface mapping, product-specific controls, known differences, and dated official sources;
4. **domain field cases** that demonstrate engineering, research, writing, analysis, design, and team workflows without pretending one prompt works everywhere.

This preserves the project's current expertise while widening its addressable audience. A generic title without equivalent cross-platform labs, reviews, and maintenance ownership would enlarge the promise before enlarging the evidence.

The central opportunity is not another prompt collection. The reviewed systems already provide command references, recipes, notebooks, and introductory courses. The Field Guide can differentiate by teaching a complete work loop:

```text
intent -> task contract -> context -> interaction -> action boundary
       -> evidence -> critique -> correction -> reusable practice
```

That loop should be visible at beginner depth and expert depth on the same canonical capability page.

## Research questions

This benchmark asks:

- How do first-party systems move a learner from first contact to advanced work?
- Which mechanisms let beginners act without hiding professional boundaries?
- How are practical exercises, feedback, examples, and failure handled?
- What is transferable across LLM products, and what must remain platform-specific?
- How are volatile facts, versions, contribution quality, and reuse boundaries handled?
- Which mechanisms would increase useful depth rather than merely increase page count?

The study does not compare model quality, price, market share, or course completion rates.

## Source set and reuse boundary

| ID | Source-owner material | Fixed or official scope inspected | Observed role | License/reuse boundary |
| --- | --- | --- | --- | --- |
| O1 | OpenAI Codex | [`openai/codex` at `902bd9e`](https://github.com/openai/codex/tree/902bd9e06b3ecb32cbf7f8e64cd23b956be3e7fe), [Codex prompting](https://learn.chatgpt.com/docs/prompting), [AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [CLI guide](https://learn.chatgpt.com/docs/codex/cli) | Product implementation, setup routing, project instructions, and current operating surface | Repository reports Apache-2.0. Hosted documentation and product marks remain reference-only unless an exact reuse grant is established. Product facts are volatile. |
| O2 | OpenAI Cookbook | [`openai/openai-cookbook` at `4a85c30`](https://github.com/openai/openai-cookbook/tree/4a85c3018d20ceef48bf7549450c567896501bf9) | Task recipes, executable notebooks, conceptual articles, and contribution boundary | Repository reports MIT. Exact notebook dependencies, included data, media, and third-party notices still require file-level review. Reference patterns; do not import examples wholesale. |
| A1 | Anthropic courses | [`anthropics/courses` at `f4dbb13`](https://github.com/anthropics/courses/tree/f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77) | Ordered API, prompting, real-world prompting, evaluation, and tool-use courses | Root license is CC BY-NC 4.0, despite GitHub API metadata returning `NOASSERTION`. Non-commercial and attribution terms make direct adaptation unsuitable for an unresolved public/commercial distribution boundary. Reference-only; independently author all teaching expression. |
| A2 | Anthropic Claude Code | [`anthropics/claude-code` at `9923819`](https://github.com/anthropics/claude-code/tree/9923819368179d7bb11b9d623fb480bf009b2e87), [official best practices](https://code.claude.com/docs/en/best-practices), [prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | Product quick start, plugins/examples, advanced operating guidance, and prompting prerequisites | Repository states all rights reserved and use is subject to Anthropic terms. Treat code, prose, examples, prompts, images, and plugins as reference-only. Product facts are volatile. |
| G1 | GitHub Skills: Copilot | [`getting-started-with-github-copilot` at `46d4968`](https://github.com/skills/getting-started-with-github-copilot/tree/46d49688c8c1a930e2eff60adfdc1e0391ae0f61b) and [`build-applications-w-copilot-agent-mode` at `88df3be`](https://github.com/skills/build-applications-w-copilot-agent-mode/tree/88df3be48147c45bbfe8e48999bd6a6580e4c651) | Short repository-native exercises with prepared environments, incremental activities, and workflow feedback | Repositories report MIT. Screenshots, product marks, Octodex assets, linked research, and external services are not assumed covered by that repository-level identifier. Recreate exercises independently. |
| G2 | GitHub Skills exercise engineering | [`skills/exercise-creator` at `0cd52d0`](https://github.com/skills/exercise-creator/tree/0cd52d0c2abc1296945258c2c662eb82a5e6b328) | First-party exercise contract, authoring flow, testing, publishing, and deprecation guidance | Repository reports MIT. Mechanisms can inform original implementation; exact workflow/code reuse needs file-level review and attribution. |
| G3 | GitHub Copilot documentation | [best practices](https://docs.github.com/en/copilot/get-started/best-practices-for-using-github-copilot), [prompt engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) | Current product guidance for task suitability, context, prompting, review, and verification | Hosted documentation is reference-only for this report. Do not copy product prose, screenshots, or marks. Facts are volatile and need dated review. |
| GG1 | Gemini CLI | [`google-gemini/gemini-cli` at `1ac3377`](https://github.com/google-gemini/gemini-cli/tree/1ac3377395868295e128b96726d605a900b5946b), especially its [documentation index](https://github.com/google-gemini/gemini-cli/blob/1ac3377395868295e128b96726d605a900b5946b/docs/index.md), plus [Gemini prompt design](https://ai.google.dev/gemini-api/docs/prompting-strategies) | Layered quickstart, tutorials, feature guides, configuration, reference, troubleshooting, release channels, and maintainer evaluation machinery | Repository reports Apache-2.0. Hosted docs, marks, screenshots, linked services, and file-level exceptions remain separately controlled. Reference architecture; independently implement. |
| M1 | Microsoft Generative AI for Beginners | [`microsoft/generative-ai-for-beginners` at `645f932`](https://github.com/microsoft/generative-ai-for-beginners/tree/645f932514e9f22f688c8feb3e49a7a7f2eb6f1b) | Broad sequenced curriculum with concepts, code paths, assignments, checks, challenges, and translations | Repository reports MIT. Images, videos, translations, partner material, and linked resources require separate inspection. Do not copy lessons, examples, solutions, or artwork. |

Repository licenses above are screening observations on the access date, not legal conclusions. No license automatically grants trademark rights or covers every linked, generated, or contributed artifact.

## Observed curriculum architectures

### 1. OpenAI: reference product plus task-oriented recipe library

**Observed facts**

- The Codex repository routes brief getting-started material to the current hosted product documentation rather than duplicating a full manual inside the source tree (O1).
- Its source tree separates product code, documentation links, repository instructions, examples, issue intake, contributor rules, and maintainer-facing skills (O1).
- The OpenAI Cookbook describes itself as examples and guides for common API tasks. Its current tree contains both conceptual articles and executable notebooks across prompting, agents, evaluation, retrieval, reliability, image workflows, and other topics (O2).
- Cookbook examples are predominantly Python while its README explicitly scopes many underlying concepts beyond one programming language (O2).
- Cookbook contribution review is described as best effort, which is a capacity boundary rather than a quality guarantee (O2).

**Interpretation for this project**

Reference documentation and experiential teaching are different products. The Field Guide should link to volatile setup/reference facts and own the durable decision method, exercise, failure case, and evidence contract. It should also separate concise platform reference from task recipes instead of forcing every reader through book order.

**Limit observed in this sample**

A large recipe library gives experts high retrieval value, but repository structure alone does not establish a coherent novice progression or equivalent verification across every recipe. The Field Guide should not imitate cookbook volume without a content contract and lifecycle owner.

### 2. Anthropic: explicit progression from fundamentals to evaluation and tools

**Observed facts**

- Anthropic's course index recommends an order: API fundamentals, interactive prompt engineering, real-world prompting, prompt evaluations, then tool use (A1).
- The prompting course declares outcomes, separates beginner/intermediate/advanced material, uses ordered chapters, provides repeated opportunities to change prompts, and includes exercises plus an answer key (A1).
- Its advanced appendices extend from prompt construction into chaining, tools, search/retrieval, and empirical evaluation (A1).
- Claude's prompt-engineering overview says prompt work should begin only after success criteria and an empirical test are available; it routes some failure classes to model choice rather than assuming wording changes solve everything (A2).
- Claude Code's official best-practices material organizes work around environment setup, codebase exploration, context, planning, verification, session management, automation, and scaling rather than a catalogue of magic phrases (A2).
- The Claude Code repository provides a small quick start and routes durable product learning to hosted documentation; its repository also includes examples and plugins for advanced users (A2).

**Interpretation for this project**

The most valuable transferable sequence is not “basic prompts, then clever prompts.” It is:

```text
basic interaction -> clear task structure -> realistic task
-> measurable success -> tools -> operational workflow
```

Communication lessons should therefore culminate in an evaluation-ready task contract, not a list of prompt tricks. Advanced readers need diagnosis: when to improve context, split the task, add a tool, change a model, or stop and verify.

**Limit observed in this sample**

The course's named models and some prompting concepts are dated product facts. More importantly, its CC BY-NC license prevents treating it as convenient source material for a project whose eventual distribution boundary remains unresolved. Structural study is appropriate; textual adaptation is not.

### 3. GitHub Skills and Copilot: one real repository, short steps, automatic transition

**Observed facts**

- The introductory Copilot exercise names its audience, learning outcomes, artifact to build, prerequisites, and estimated duration before the learner starts (G1).
- It uses a preconfigured Codespace and one continuing application, so setup and domain context do not restart for every feature (G1).
- Steps combine a small amount of theory with an immediate activity. The path moves through project understanding, code assistance, agent work, planning, review, and pull-request delivery (G1).
- GitHub Actions observe repository events, provide feedback, and release subsequent steps. The final review recaps demonstrated features and points to more specialized exercises (G1, G2).
- The exercise authoring reference recommends one new skill per exercise, five or fewer cumulative steps, an easy first step, roughly 30–60 minutes, and more explicit instructions for beginners while advanced solutions become more open-ended (G2).
- Each exercise step pairs theory, activity, grading, and transition. The authoring guidance also warns against volatile detail and against copying the main product documentation (G2).
- GitHub's official Copilot guidance treats prompts, context, task decomposition, product mode, code review, testing, and human validation as related parts of use rather than promising correctness from a well-worded request alone (G3).

**Interpretation for this project**

This is the clearest model for serving two levels without duplicating books:

- beginner route: explicit environment, bounded action, visible expected state, recovery hint;
- practitioner route: the same repository and objective, but fewer procedural hints, more design decisions, stronger tests, and an open-ended transfer challenge.

The Field Guide already has labs and evaluations, but their value will remain theoretical until workflows observe actual learner artifacts. A future “guided lab runner” can unlock steps based on evidence without claiming that workflow completion equals mastery.

**Limit observed in this sample**

GitHub Skills intentionally targets awareness and short completion. Its own authoring reference says the scope is narrow. That makes it an excellent exercise unit, not a complete model for deep professional judgment, long-running work, or organizational governance.

### 4. Gemini CLI: layered documentation for novices, operators, and maintainers

**Observed facts**

- The Gemini CLI documentation index exposes separate paths for install/getting started, user tutorials, feature concepts, configuration, deep reference, troubleshooting/resources, development, and releases (GG1).
- Its tutorial topics include files, context/memory, shell commands, sessions, planning, web tools, MCP, skills, and automation; its advanced references include sandboxing, trusted folders, policy, headless execution, hooks, model selection, and enterprise configuration (GG1).
- Stable and preview release documentation are separately named (GG1).
- The repository contains behavioral-evaluation guidance and workflows in addition to unit/integration and documentation automation, showing a maintainer surface distinct from reader documentation (GG1).
- Google's general prompt-design guide covers instructions, examples, contextual information, prompt iteration, decomposition, parameter effects, and known limitations as a design process rather than a one-line formula (GG1).

**Interpretation for this project**

One navigation tree cannot serve first-run learning, daily lookup, and governance equally well. The Field Guide needs multiple projections over the same canonical content identities:

1. progressive learning paths;
2. task/recipe lookup;
3. failure and recovery lookup;
4. platform reference;
5. maintainer and evaluation documentation.

This is not five copies of the content. It is five indexes into one governed body.

**Limit observed in this sample**

A comprehensive index can become a product inventory. Breadth is useful only when each page makes the user decision clearer. The Field Guide should not mirror every feature merely because a vendor documents it.

### 5. Microsoft: broad curriculum with a repeated lesson shell

**Observed facts**

- The Microsoft curriculum currently presents 21 numbered lessons spanning foundations, model comparison, responsible use, prompting, application patterns, security, lifecycle, retrieval, open models, agents, and fine-tuning (M1).
- Its root index distinguishes lessons that primarily teach from lessons that build an artifact, and it exposes setup before the main progression (M1).
- The curriculum advertises a repeated lesson package including written material, code samples, and further resources; inspected prompting lessons also contain assignments, solution links, knowledge checks, challenges, and onward routing (M1).
- Multiple provider and language implementations exist in parts of the code tree, while translation files are generated and exposed separately from the canonical English path (M1).
- Repository workflows include Markdown validation, code quality, security, and dependency maintenance (M1).

**Interpretation for this project**

A stable lesson shell makes a large curriculum navigable and maintainable. However, the Field Guide's shell should be stricter: every unit should include a falsifiable success condition, a deliberate failure, captured evidence, and an explicit transfer boundary. “Assignment plus solution” is insufficient when model output varies.

Provider variants are most maintainable when the transferable capability is canonical and platform code is an adapter. Duplicating whole lessons per provider invites semantic drift.

**Limit observed in this sample**

Large lesson counts and many translations are not evidence of equal freshness, execution, pedagogy, or review. Automated translation freshness is not language-quality evidence. The Field Guide should publish a smaller verified matrix before claiming broad platform or locale coverage.

## Beginner and advanced readers: one concept, two depths

The sample systems converge on progressive disclosure, but they implement different depths. The project should formalize a dual-depth page contract rather than create a “beginner book” and an “expert book” that drift apart.

| Page layer | First-time reader sees | Experienced reader gets | Required evidence |
| --- | --- | --- | --- |
| Situation | one recognizable work problem | scope, risk class, and failure cost | problem provenance or explicitly synthetic scenario |
| Outcome | one observable result | quality attributes and non-goals | acceptance criteria |
| Minimum model | plain-language mechanism | tradeoffs and competing explanations | stable-source boundary |
| Start path | prepared inputs and bounded steps | configurable inputs and alternative route | reproducible setup record |
| Communication | a compact task contract | context-budget, ambiguity, and delegation decisions | before/after task fixture |
| Action | low-risk or read-only first move | tool, permission, and rollback design | action log or artifact diff |
| Verification | one direct check | test matrix, negative case, independent review | stored output tied to revision |
| Failure | one deliberate, recoverable mistake | fault isolation and stopping policy | negative fixture that actually fails |
| Transfer | one nearby task | cross-domain and cross-platform variant | stated invariants and adapter differences |
| Maintenance | “check current product docs” | owner, source, review date, compatibility scope | governed fact record |

The beginner layer must not lie by omission. It may defer complexity, but it must state when the result is only a draft, when an account or permission changes external state, and what has not been verified.

The expert layer must not be verbose repetition. It earns its place by exposing decisions, failure economics, observability, comparative routes, and evidence quality.

## Transferable core versus platform adapters

### Transferable capabilities

The following mechanisms recur across the first-party sources and can form the project's vendor-neutral core:

- define the desired outcome and success criteria before optimizing wording;
- supply relevant context while separating instructions from untrusted data;
- split large work into inspectable stages;
- choose an interaction or execution mode appropriate to risk;
- use examples to clarify structure where they add information;
- ask for uncertainty, assumptions, and boundaries rather than hidden reasoning;
- inspect artifacts, run checks, and compare against acceptance criteria;
- iterate from observed failure instead of adding random prompt decoration;
- preserve state, scope permissions, and design rollback for consequential actions;
- turn a successful ad hoc interaction into a repeatable workflow only after evaluation.

These are transferable because they concern the work system around a model, not a vendor command name.

### Platform-specific adapters

The following facts should live in dated platform playbooks:

- installation and authentication;
- product modes and model selectors;
- project-instruction filenames and hierarchy;
- command syntax, keyboard shortcuts, and UI location;
- sandbox, approval, trusted-folder, policy, and network controls;
- session, checkpoint, worktree, or rewind behavior;
- extension, plugin, skill, MCP, and hook packaging;
- quotas, pricing, retention, telemetry, and enterprise controls;
- preview/stable feature status and supported operating systems.

Every adapter should map product terminology to the stable project vocabulary, record the official source and access date, and declare which canonical labs have actually been rerun on that platform.

## The communication curriculum the project is missing

The user goal—obtaining efficient and accurate work through simple communication—should become a progressive capability, not a promise that short prompts are always enough.

### Recommended progression

1. **State the work, not the vibe.** Name the artifact or decision and who will use it.
2. **Give the minimum decisive context.** Include the files, constraints, examples, and current state that change the answer.
3. **Define done observably.** Specify checks, outputs, acceptable uncertainty, and excluded work.
4. **Set action boundaries.** Distinguish read-only inspection, local edits, external writes, credentials, and irreversible actions.
5. **Request a work loop.** Ask the Agent to inspect, act, verify, report evidence, and stop on defined conditions.
6. **Diagnose the first miss.** Classify it as missing context, ambiguous objective, capability/tool gap, product constraint, model limitation, or verification failure.
7. **Compress only after success.** Turn a proven task contract into a short reusable command, template, Skill, or project rule.

This yields genuinely simple communication at maturity: brevity comes from shared context and established contracts, not from hiding necessary information.

### A measurable teaching experiment

Each communication lesson should use one stable task fixture and compare three inputs:

- a vague request;
- a structured request with outcome, context, constraints, and evidence;
- a shortened request after the project context has been installed.

Score them against the same observable rubric: task completion, unsupported assumptions, boundary violations, verification coverage, correction turns, elapsed time, and cost where available. Repeat runs are needed because model output is variable. A single attractive response is anecdote, not a finding.

## Hands-on system: from reading to demonstrated capability

The strongest combined model from the sources is:

```text
short theory
    -> prepared real artifact
    -> bounded action
    -> observable checkpoint
    -> negative variation
    -> automated or human feedback
    -> reflection
    -> open transfer task
```

Recommended lab tiers:

| Tier | Learner autonomy | Appropriate task | Feedback |
| --- | --- | --- | --- |
| Guided | explicit navigation and safe prepared inputs | first interaction, first context file, first verification | immediate checkpoint and recovery hint |
| Assisted | goal and constraints supplied; route partly open | multi-file edit, research synthesis, prompt revision | rubric plus artifact checks |
| Field | incomplete real-world information and real tradeoffs | scoped project contribution or domain workflow | evidence review and human judgment |
| Operational | repeated task, team rules, maintenance burden | Skill/workflow design, evaluation, release decision | regression suite, change review, rollback rehearsal |

Advancement should depend on evidence, not page completion. Reading all advanced chapters does not establish operational skill.

## Content quality filter: a gold-only admission rule

A larger project remains useful only if every proposed unit survives a gate. Reject or merge content that fails any mandatory item.

### Mandatory admission fields

1. **Named decision or capability:** what can the reader do or judge afterward?
2. **Distinct problem:** which existing unit does not already solve it?
3. **Audience and prerequisite:** beginner, practitioner, operator, or maintainer.
4. **Real or explicitly synthetic input:** no invented customer evidence presented as fact.
5. **Action and artifact:** something changes, is produced, or is decided.
6. **Success evidence:** direct, scoped, and reproducible where possible.
7. **Failure evidence:** at least one boundary or negative case.
8. **Transfer value:** stable principle separated from platform adapter.
9. **Source and license:** first-party basis, access date, and reuse decision.
10. **Maintenance owner:** trigger or date for review.
11. **Density test:** if removing the unit loses no decision, experiment, failure, or evidence, remove it.
12. **Claim discipline:** no implication of mastery, production fitness, or cross-platform support beyond observed evidence.

### Editorial rejection signals

- another list of generic prompt adjectives;
- screenshots that merely prove a UI once existed;
- a long example with no acceptance criterion;
- success-only walkthroughs;
- vendor-neutral claims derived from one product run;
- platform instructions without source date or owner;
- two chapters whose only difference is domain nouns;
- generated prose that has not been technically and pedagogically reviewed;
- a “best practice” unsupported by a source, experiment, or clearly labeled practitioner judgment;
- volume justified by SEO or completeness rather than learner decisions.

## Recommended product architecture

```text
Field Guide
├─ Start here
│  ├─ first safe task
│  ├─ how to communicate a task
│  └─ how to know the result is real
├─ Core work system                 vendor-neutral
│  ├─ task contracts
│  ├─ context and instruction boundaries
│  ├─ model/tool/Agent mental model
│  ├─ planning and staged execution
│  ├─ verification and evaluation
│  └─ recovery, delivery, and maintenance
├─ Codex in depth                   canonical implementation
├─ Platform playbooks               dated adapters
│  ├─ Claude Code
│  ├─ GitHub Copilot
│  └─ Gemini CLI
├─ Field cases                      domain transfer
├─ Labs and evaluations             demonstrated capability
├─ Failure atlas                    diagnosis entry point
└─ Team and maintainer system       governance and release
```

The title can broaden later only after at least two non-Codex adapters have:

- an official fact record;
- a complete beginner setup and safety path;
- the same core communication lab rerun with stored evidence;
- at least one field case and one failure case;
- a named maintenance owner and review cadence;
- no unresolved license boundary.

Until then, use a descriptive subtitle such as “transferable AI work methods, implemented deeply with Codex” rather than claiming a complete multi-platform handbook.

## Ranked innovations for this repository

### 1. Build a cross-platform capability matrix

Give every canonical capability a stable ID. Record whether it is conceptual only, documented, lab-ready, run, evaluated, and reviewed on each platform. Generate platform indexes from that matrix. This prevents “supports Claude Code” from meaning only that a page mentions Claude.

### 2. Add a communication clinic with comparative fixtures

Teach concise task definition through measured before/after interactions. Preserve inputs, outputs, rubric scores, environment, product version, and reviewer notes. This directly addresses the user's desired value and creates original evidence rather than recycled prompting advice.

### 3. Turn selected labs into repository-native guided exercises

Adopt the GitHub Skills mechanism independently: prepared repository, small cumulative steps, observable events, targeted feedback, recovery, and final reflection. Keep mastery assessment separate from workflow completion.

### 4. Create beginner/expert depth markers inside canonical pages

Use stable labels such as `Start`, `Decide`, `Inspect`, `Failure`, and `Operate`. Avoid hiding core safety in collapsed expert material. Generate route-specific reading lists rather than duplicate prose.

### 5. Establish an experience intake pipeline

Practical experience should enter through a case record containing context, sanitized artifact, observed behavior, competing explanation, action, evidence, failure, transfer boundary, and review status. Anecdotes remain `candidate` until independently checked; synthetic examples remain visibly synthetic.

### 6. Add content retirement and supersession

Every volatile platform page needs an owner, next review, and replacement path. Broken or outdated content should be retired without erasing why it changed. A larger project becomes professional through deletion discipline as much as addition.

## What not to copy

- Do not copy Anthropic's course prose or exercise design; its non-commercial license is incompatible with an unresolved distribution boundary, and copying would erase this project's own evidence model.
- Do not copy a vendor's prompt taxonomy as the book spine. Product guidance changes, and many named techniques collapse into clearer task, context, example, decomposition, and verification decisions.
- Do not reproduce GitHub Skills workflows verbatim. Implement only the necessary event/checkpoint model in this project's conventions.
- Do not use the OpenAI Cookbook as a page-count target. Recipes without consistent lifecycle and verification would create maintenance debt.
- Do not mirror Gemini CLI's complete feature inventory. Include a feature only when it supports a reader decision or a governed adapter.
- Do not equate Microsoft's broad translation surface with reviewed multilingual parity.
- Do not use vendor screenshots as teaching decoration. Prefer original state diagrams, redacted real artifacts, and browser evidence created by this project when visual explanation is materially better.

## Claims this research does and does not support

This research supports the architectural recommendation to retain Codex depth while introducing a transferable core and governed platform adapters. It supports dual-depth pages, short evidence-bearing labs, multiple indexes, explicit evaluation, and a strict content admission filter.

It does **not** establish that the current Field Guide already serves beginners and experts equally, that any existing lab has been run, that the curriculum transfers to Claude Code/Copilot/Gemini, that learners improve, that translations are reviewed, or that the project should be renamed now. Those claims require current project artifacts and learner/runtime evidence.

## Source freshness and next review

| Source family | Volatility | Owner for recheck | Next review trigger |
| --- | --- | --- | --- |
| Hosted Codex, Claude Code, Copilot, and Gemini product documentation | high | platform adapter maintainer | before publishing an adapter; on product release or broken link |
| Pinned repository curriculum architecture | medium | curriculum maintainer | before adopting a mechanism; six-month review |
| License and reuse status | high consequence | release owner | before adapting any exact material or public release |
| Recommendations in this report | project judgment | curriculum editor | after two cross-platform lab runs or reader research |

The access date records when the sources were inspected; it is not a guarantee that their current pages remain unchanged.
