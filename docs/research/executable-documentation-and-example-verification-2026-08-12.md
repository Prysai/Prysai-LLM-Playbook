# Executable documentation and example verification benchmark

**Research date:** 2026-08-12  
**Access date for all sources:** 2026-08-12 (America/Los_Angeles)  
**Status:** `candidate / reference-only`  
**Scope:** executable documentation, code-snippet testing, example verification, version and maintenance signals, and docs-as-code release evidence.  
**Evidence boundary:** only source-owner repositories and official documentation were inspected. No external project was built, no hosted example was executed, and no upstream CI result is evidence that this repository implements the same control.

## Executive finding

High-quality documentation engineering does not begin by executing every fenced
code block. It begins by declaring what each example is supposed to prove:

```text
display only -> parses -> compiles -> runs -> matches observation -> remains supported
```

The six reviewed projects distribute those responsibilities across different
artifacts:

- prose code blocks that a documentation tool can compile or doctest;
- standalone example projects that ordinary build/test tools own;
- source-controlled snippets excerpted into pages to prevent copy drift;
- generated reference/version facts with a single upstream owner;
- rendered HTML checks for links, IDs, and version projections; and
- exact workflow artifacts that preserve what was checked for one revision.

The transferable mechanism for the Field Guide is therefore a **typed example
contract**, not a universal “run all snippets” script. Every reader-facing
command, prompt, code sample, expected output, and workflow fragment should
declare its verification class, environment, source owner, expected evidence,
side-effect boundary, version scope, and last verified revision. A release
packet should report coverage and exclusions at the exact candidate SHA.

This would make the project more executable without inventing runtime evidence
for examples that require accounts, external services, nondeterministic models,
or human judgment.

## Source register

Repository links are pinned to the observed commit so later upstream changes do
not silently rewrite this record.

| ID | First-party source | Mechanism established | Repository-level license signal and reuse boundary |
| --- | --- | --- | --- |
| R1 | [The Rust Programming Language at `9175448`](https://github.com/rust-lang/book/tree/917544888a55e4da7109bdba8c88c893c0da70f4), especially [CI](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/.github/workflows/main.yml) | `mdbook test` over book examples, separately tested support packages, standalone listings, references, spelling, and built-link checks | GitHub metadata is `NOASSERTION`; exact root licenses and file notices must be inspected before reuse. Structure is reference-only; no prose, code, listings, scripts, or outputs are copied. |
| T1 | [Tokio Website at `55335b4`](https://github.com/tokio-rs/website/tree/55335b4efd81aa676d038bd7320f7185642d39ea), especially [CI](https://github.com/tokio-rs/website/blob/55335b4efd81aa676d038bd7320f7185642d39ea/.github/workflows/ci.yml) and [Markdown doctest builder](https://github.com/tokio-rs/website/blob/55335b4efd81aa676d038bd7320f7185642d39ea/doc-test/build.rs) | Markdown pages are programmatically included as Rust documentation so fenced examples become doctests; tutorial code is also built and tested separately | Repository reports MIT. Exact source, content, media, and dependency notices still need file-level review. Mechanism only; no implementation is copied. |
| P1 | [CPython at `ee4fe00`](https://github.com/python/cpython/tree/ee4fe00a8f72ea84a421bb626d7c78335c5c9ea1), especially [reusable docs workflow](https://github.com/python/cpython/blob/ee4fe00a8f72ea84a421bb626d7c78335c5c9ea1/.github/workflows/reusable-docs.yml) | Sphinx HTML build, regression-aware warning handling, rendered HTML ID compatibility artifact, separate doctest job, branch-aware documentation, and stable/development version signals | GitHub metadata is `NOASSERTION`; Python documentation and code have project-specific licensing. Reference-only; do not import workflow, templates, prose, or examples. |
| K1 | [Kubernetes Website at `3f8be5a`](https://github.com/kubernetes/website/tree/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9), especially [example test script](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/scripts/test_examples.sh) and [generated HTML link checker guide](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/content/en/docs/doc-contributor-tools/linkchecker/README.md) | Examples are files rather than repeated prose; changed example paths trigger a version-scoped Go test path; rendered checks explicitly disclose exclusions | Repository reports CC-BY-4.0. Exact example code and translated material can have additional provenance. Reference architecture only. |
| O1 | [OpenTelemetry Website at `8d6b626`](https://github.com/open-telemetry/opentelemetry.io/tree/8d6b626b3dd798de9065335d8c4cc0912959c484), especially [package scripts](https://github.com/open-telemetry/opentelemetry.io/blob/8d6b626b3dd798de9065335d8c4cc0912959c484/package.json), [test workflow](https://github.com/open-telemetry/opentelemetry.io/blob/8d6b626b3dd798de9065335d8c4cc0912959c484/.github/workflows/test.yml), and [version updater](https://github.com/open-telemetry/opentelemetry.io/blob/8d6b626b3dd798de9065335d8c4cc0912959c484/.github/workflows/auto-update-versions.yml) | Source excerpts can fail CI when generated documentation drifts; snippet parsers have unit tests; builds, links, text, localization drift, expiration, live checks, and scheduled version updates are separate controls | Repository reports CC-BY-4.0. Submodules, specifications, generated snippets, dependencies, logos, and translations retain their own boundaries. No external material is copied. |
| G1 | [GitHub Docs at `729fe5d`](https://github.com/github/docs/tree/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b), especially [versioning guidance](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/content/contributing/writing-for-github-docs/versioning-documentation.md), [code annotation guidance](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/content/contributing/writing-for-github-docs/annotating-code-examples.md), and [content-lint workflow](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/.github/workflows/content-lint-markdown.yml) | Structured product/version applicability, centralized feature availability, semantic content lint, and source annotations that distinguish full examples from snippets | Repository reports CC-BY-4.0. Hosted product docs, code examples, images, marks, data, and contributor content need exact-file review. Reference-only. |

Repository-level license metadata is only a screening signal. It does not
automatically cover trademarks, external dependencies, contributed examples,
embedded screenshots, generated vendor reference, or linked material.

## Observed mechanisms

### 1. Rust Book: compile the teaching surface and test its supporting world

**Observed facts**

- The pinned CI installs an explicit Rust toolchain and mdBook version, reports
  tool versions, builds the book's support crate, and invokes `mdbook test` with
  the required library path (R1).
- Support packages have their own unit/integration tests rather than relying on
  a successful book build (R1).
- Many chapter programs exist as complete listing directories with manifests,
  source, and in some cases expected-output files; the prose and the standalone
  executable artifact are not forced to be the same representation (R1).
- Lint work separately checks shell scripts, spelling, local-file references,
  reference consistency, the rendered book, and broken links (R1).

**Transferable mechanism**

Use the native test runner for examples when a language/toolchain can own their
semantics. A documentation renderer should orchestrate, not replace, the
compiler and test framework. Preserve tool versions in the evidence log.

**Boundary**

A compiled snippet does not prove the surrounding explanation, expected UI,
security property, performance, or learner understanding. A complete listing
can also diverge from a prose excerpt unless their relationship is checked.

### 2. Tokio Website: convert Markdown itself into the doctest input

**Observed facts**

- A build script enumerates Markdown under the Tokio content tree, emits Rust
  modules, and uses `include_str!` so page contents become documentation for
  generated functions (T1).
- The CI then runs `cargo test` in that doctest crate and separately runs the
  tutorial-code workspace tests (T1).
- The workflow pins an older toolchain with a comment that the next release
  changed behavior around examples containing main functions (T1).
- Dependency build steps are allowed to continue on error, while the subsequent
  actual test step remains decisive (T1).

**Transferable mechanism**

When a page format has executable semantics, make the page the test source
rather than maintaining a second hand-copied test file. Record toolchain
compatibility as a visible maintenance fact with an owner and review trigger.

**Boundary**

Doctest extraction is language-specific. It is unsafe to generalize this into
executing every shell, prompt, YAML, or JSON fence. The `continue-on-error`
prebuild also demonstrates why evidence must identify the decisive step rather
than summarize the whole job as “tests passed.”

### 3. CPython: treat rendered documentation compatibility as a release surface

**Observed facts**

- CPython's reusable documentation workflow builds Sphinx HTML in nitpicky
  mode and writes warnings to a file; a later step evaluates warning changes
  against the PR's base/head rather than treating every historical warning as
  equivalent (P1).
- The workflow collects IDs from rendered HTML, uploads them as an artifact,
  and invokes a separate workflow to detect removed IDs (P1).
- Doctests run as a separate job on the current source checkout; the workflow
  comment explains that documentation syntax may require the HEAD interpreter
  rather than the latest stable release (P1).
- The source tree maintains stable and development documentation entry points,
  while the workflow runs on both `main` and numbered maintenance branches
  (P1).

**Transferable mechanism**

Documentation compatibility includes stable URLs and anchors, not just a green
HTML build. Save the generated identity set as a commit-bound artifact and
compare it to a declared baseline. Separate baseline debt from newly introduced
regressions without hiding either.

**Boundary**

An HTML ID artifact proves a structural comparison only. It does not establish
that every inbound external link is known, that content meaning is preserved,
or that a doctest reflects all supported Python branches.

### 4. Kubernetes Website: keep runnable examples outside prose and disclose scope

**Observed facts**

- Kubernetes keeps a large set of locale-scoped example files under
  `content/<locale>/examples/`; pages can refer to concrete manifests rather
  than maintaining all examples inline (K1).
- Its pinned example script inspects changed paths, skips setup when no example
  directory changed, fetches the declared Kubernetes series, prepares generated
  dependencies, and runs Go tests for English examples (K1).
- The same script reveals maintenance coupling: it still names a `master`
  fork-point and CI-era environment variables. This is observed source state,
  not evidence that the script currently runs in every workflow (K1).
- Its documented generated-HTML link checker lists both what it checks and what
  it omits (K1).

**Transferable mechanism**

Store substantial commands/configuration as named examples with stable owners.
Let prose include or link them, and run validation at the example artifact.
Every check must publish its inclusions, locale/version scope, and blind spots.

**Boundary**

File existence and syntax validation are not deployment evidence. Path-based
skipping is safe only when the dependency graph is correct. The observed aging
script is a warning against citing an unused checker as current CI coverage.

### 5. OpenTelemetry Website: source excerpts, drift failure, and automated freshness

**Observed facts**

- The site exposes distinct commands for formatting, source excerpts, links,
  text, spelling, generated registry data, localization drift, expired content,
  build variants, parser tests, redirects, and live checks (O1).
- Its code-excerpt check runs the excerpt tool in dry-run mode and fails when an
  update would be required. The source artifact, not a copied Markdown fragment,
  remains authoritative (O1).
- Configuration-snippet parsing has direct unit tests for filenames, marker
  removal, newline normalization, highlighting indexes, and edge cases (O1).
- The test workflow explicitly states that it excludes base checks because
  other workflows own them. This makes a green job's scope legible (O1).
- A scheduled workflow runs an all-versions updater hourly and reports failure;
  separate scripts track translation drift and expired content (O1).
- Production commits to the generated public tree include the short main-branch
  hash in the commit message (O1).

**Transferable mechanism**

Use “single source + generated projection + clean-diff check” for repeated
examples and version facts. Keep generator unit tests separate from the check
that generated output is fresh. Name exclusions in workflow text and evidence
records.

**Boundary**

Fresh generation does not prove that an upstream example is correct or that a
translated explanation is reviewed. Live checks are external-state evidence
for a declared route and time, not permanent production assurance.

### 6. GitHub Docs: version applicability is structured content, not prose memory

**Observed facts**

- GitHub Docs uses structured frontmatter to declare product/version
  applicability, Liquid conditionals for local differences, and centralized
  feature records so availability changes can update multiple pages from one
  source (G1).
- Supported and closing-down enterprise releases have different reader
  exposure, while frozen snapshots remain addressable (G1).
- The versioning guide explicitly recommends avoiding unnecessary versioning
  because conditionals increase author and reviewer complexity (G1).
- Code annotations are designed for complete examples, not every snippet; the
  guide asks authors to explain why and adaptation choices and notes screen
  reader costs from repeated annotation navigation (G1).
- The changed-content workflow first prints all annotations without blocking,
  then runs an errors-only pass that can fail (G1).

**Transferable mechanism**

Make applicability machine-readable only where materially different supported
variants exist. Centralize repeated feature/version facts. Stage semantic gates
with a diagnostic pass and a narrowly defined blocking pass.

**Boundary**

Version-aware rendering and semantic lint do not execute example behavior.
Annotations improve comprehension but do not validate code. Full frozen
editions are operationally expensive and should not be introduced as a symbol
of professionalism.

## Comparative verification ladder

The projects show that “tested example” is too coarse. The Field Guide should
use explicit classes:

| Class | Claim allowed | Minimum evidence | Still not proven |
| --- | --- | --- | --- |
| `display_only` | The example is intentionally illustrative | reviewed source, language label, reason execution is inappropriate | syntax, behavior, accuracy |
| `parsed` | The artifact conforms to a declared syntax/schema | parser/schema log tied to exact bytes | runtime behavior or external compatibility |
| `compiled` | The code compiles in one recorded environment | compiler/tool version, command, exit status, input hash | execution result, performance, side effects |
| `executed` | The command/program ran in the recorded sandbox | stdout/stderr, exit status, environment, permission/network record | correctness beyond assertions |
| `asserted` | Declared observations match deterministic assertions | test cases including negative/boundary inputs | behavior outside fixture scope |
| `rendered` | Generated reader artifact has declared structure | route/anchor/resource/accessibility checks | semantic truth or human usability |
| `live_checked` | A declared external target behaved as observed at a time | target, timestamp, response/browser evidence | continued availability or broad production readiness |
| `human_reviewed` | A named reviewer accepted declared semantic criteria | rubric, reviewer, revision, disagreements | runtime facts not observed by review |

An example may need more than one class. A shell fragment could be `parsed` and
`human_reviewed` but deliberately not `executed` because it deploys or deletes.
A model interaction may be `executed` repeatedly and still need blind human
review because output is nondeterministic.

## Recommended original contract for this repository

Create a machine-readable example manifest only after a small pilot identifies
real consumers. Suggested record:

```yaml
id: stable-example-id
source_path: examples/.../input.md
projections:
  - book/chapters/...
kind: command | code | prompt | config | output | workflow | visual
verification_class: parsed | compiled | executed | asserted | rendered | live_checked | human_reviewed
environment:
  toolchain: exact or not_applicable
  platform: declared
  network: disabled | allowlisted | required
  permissions: read_only | disposable_write | external_write
version_scope: stable principle or named adapter/version
expected_evidence:
  - exact artifact or assertion
danger: none | external_side_effect | destructive | secret_required
owner: named role
last_verified:
  commit: exact SHA
  observed_at: timestamp
  evidence_path: committed or CI artifact path
known_blind_spots:
  - explicit exclusion
```

This is an original proposed schema, not copied from an upstream implementation.

### Execution policy

1. Never execute arbitrary prose fences by default.
2. Execute only registered examples in disposable directories with explicit
   tool, network, permission, timeout, and cleanup policy.
3. For destructive or external-write commands, test a safe surrogate or parser
   and require human review; do not claim the consequential action ran.
4. Store full examples as source artifacts and generate excerpts where the same
   bytes appear in multiple pages.
5. Require negative fixtures proving a malformed, stale, or contradicted
   example fails the intended gate.
6. Tie every evidence record to the candidate SHA and input hash.
7. Preserve raw logs even when a later release-decision step blocks.

## Maintenance and version signals

Mature maintenance is visible as state, not implied by recent commits.

| Signal | Source pattern | Project adoption |
| --- | --- | --- |
| Toolchain identity | Rust Book reports versions; Tokio pins a compatibility toolchain | Log interpreter/compiler/parser and dependency-lock identity per gate |
| Supported branch/edition | CPython runs docs work on main and numbered branches | Declare one maintained curriculum edition until a second is real |
| Product applicability | GitHub Docs frontmatter and centralized feature records | Keep volatile platform facts in adapter records, not duplicated prose |
| Scheduled freshness | OpenTelemetry version updater and expiration checks | Schedule fact/external audits, but keep semantic review human-owned |
| Drift | OpenTelemetry excerpt dry-run and localization drift | Fail when generated projection differs from authoritative source |
| Compatibility surface | CPython rendered HTML IDs | Compare public route/anchor identities to the prior reviewed release |
| Known exclusions | OpenTelemetry workflow comments; Kubernetes link-check scope | Put blind spots in every gate result and release packet |
| Retirement | frozen/closing-down GitHub Docs versions | Supersede examples with redirect/history rather than silently repurposing IDs |

## Docs-as-code release evidence

For a candidate commit, generate an example-evidence dimension containing:

- exact candidate SHA;
- manifest revision and example input hashes;
- counts by verification class;
- commands, tool versions, environment, duration, and log paths;
- generated-projection drift result;
- failed, skipped, `not_available`, and intentionally non-executable examples;
- changed public routes/anchors compared with the reviewed release baseline;
- overdue owners/version reviews;
- known blind spots; and
- the weakest allowed maturity claim.

The release decision must not flatten these into “examples passed.” A result
such as `parsed=24, asserted=8, live_checked=0, human_review_overdue=2` is more
honest and operationally useful.

The repository already produces commit-bound release evidence. This research
supports adding a future example-verification dimension; it does not establish
that the dimension exists or that current examples have run.

## Recommended implementation sequence

### Phase 1 — inventory without status promotion

Inventory reader-facing commands, code, prompts, configs, output transcripts,
and synthetic examples. Assign a candidate verification class and risk. Do not
change any Lab or evaluation run state.

### Phase 2 — pilot three deterministic examples

Choose one schema-parsed artifact, one locally executed low-risk example, and
one source excerpt projected into a page. Add failing fixtures for invalid
syntax, wrong expected output, and stale excerpt.

### Phase 3 — evidence packet integration

Run registered checks at the exact candidate SHA, upload raw logs, and summarize
classes and blind spots in release evidence. A check should fail closed on
missing required evidence but preserve its logs.

### Phase 4 — nondeterministic and external examples

Only after the deterministic pipeline is trusted, add repeated model-run
fixtures, blind scoring, external reachability, or browser checks. Separate
transport, runtime, semantic, and learner evidence.

### Phase 5 — reviewed release baseline

After a formal release exists, preserve public routes/anchors, example hashes,
and supported adapter scopes as the next compatibility baseline. Do not invent
a rollback target before one has been reviewed and tagged.

## What not to copy

- Do not copy Rust or Tokio's Rust-specific doctest machinery into a
  language-neutral curriculum.
- Do not treat every shell fence as executable; examples may install software,
  mutate Git, deploy, delete, or require credentials.
- Do not copy Kubernetes' large locale example tree. Multiple copies create
  drift unless translation genuinely changes an executable artifact.
- Do not reproduce CPython's branch matrix before this project supports
  multiple released curriculum editions.
- Do not import OpenTelemetry's workflow inventory or dependency stack. Adopt
  the source/excerpt/drift boundary in the project's standard-library-friendly
  conventions.
- Do not copy GitHub Docs' product/version conditional language or annotate
  every sample. Conditional complexity and accessibility cost must earn their
  place.
- Do not cite a script's presence as proof that current CI invokes it. Trace the
  actual workflow and preserve current run evidence.
- Do not use a passing parser, compiler, build, or link checker to claim the
  example is safe, useful, semantically correct, learned, or production-ready.

## Quality filter for executable content

Reject or quarantine a proposed executable example when:

- its intended verification class is unstated;
- the same bytes are hand-copied in more than one canonical source;
- it needs secrets or external writes but offers no safe surrogate and explicit
  non-execution boundary;
- success is subjective and has no review rubric;
- expected output contains unstable timestamps, IDs, pricing, or service state
  without normalization and ownership;
- toolchain/version requirements are implicit;
- failure cannot be demonstrated with a negative fixture;
- the log cannot be tied to an input hash and candidate revision; or
- a passing result would not change any release or learning decision.

## Claims supported and unsupported

This report supports adopting typed verification, authoritative example
sources, generated excerpts, negative drift fixtures, tool/version capture,
public identity comparison, and commit-bound evidence summaries. It supports
starting with a small deterministic pilot.

It does **not** prove that any current Field Guide snippet, example, Lab, Skill,
evaluation fixture, platform adapter, or hosted page has executed successfully.
It does not prove that upstream examples are correct today, that their CI is
green, or that their mechanisms fit this repository without an independent
implementation and failure tests.

## Freshness

| Source family | Volatility | Recheck trigger | Proposed owner |
| --- | --- | --- | --- |
| Fixed repository mechanisms | medium | before implementing a corresponding gate; six-month review | documentation engineering owner |
| Toolchain and workflow versions | high | workflow warnings, upstream breaking change, or dependency update | CI owner |
| Product/edition applicability | high | before publishing platform-specific content | platform adapter owner |
| License and nested asset status | high consequence | before adapting exact material or public release | release owner |
| Recommendations in this report | project judgment | after deterministic pilot evidence exists | curriculum and documentation owners |

