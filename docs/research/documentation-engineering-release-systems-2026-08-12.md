# Documentation engineering and release systems

**Research date:** 2026-08-12

**Access date for every source:** 2026-08-12

**Status:** `candidate / reference-only`

**Scope:** versioned documentation governance, release-readiness gates, generated status facts, issue and quality ledgers, link checking, accessibility, contributor workflows, and documentation CI.

**Projects reviewed:** GitHub Docs, Kubernetes Website, mdBook, Docusaurus, and Astro Starlight.
**Project evidence boundary:** repository files and public first-party documentation were inspected. No external project was built locally, and no mechanism below is evidence that this repository has implemented or passed the same control.

## Executive finding

Mature documentation projects do not become reliable by accumulating pages or
CI jobs. They reduce ambiguity at four boundaries:

```text
authoritative data -> generated reader facts -> focused checks -> release decision
         |                    |                    |                    |
       owner              no hand edits       named failure       recorded gaps
```

The strongest transferable idea is a **release evidence packet generated from
the same contracts that the site uses**. This repository already has unusually
good ingredients: `content-status.yaml`, a quality register, an update registry,
generated site projections, and multiple structural validators. The missing
layer is orchestration. A maintainer still has to read several files and infer
whether a commit is releasable, which open defects block it, which checks were
actually run, and whether accessibility and external-link evidence are fresh.

The next improvement should therefore not be a framework migration or a larger
checklist. It should be a small, machine-generated release report with explicit
blocking rules and evidence references.

## Fixed source register

Repository sources use commit-pinned URLs so later upstream changes do not
silently alter this record. Product documentation URLs are canonical first-party
pages and may change; recheck them before turning a finding into a durable rule.

| ID | First-party source | What it establishes | Volatility |
|---|---|---|---|
| G1 | [GitHub Docs: PR link checking at `729fe5d`](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/.github/workflows/link-check-on-pr.yml) | Changed-file internal link checks, concurrency cancellation, PR annotations, and a staged rollout in which cross-page anchors are reported before becoming blocking | Medium |
| G2 | [GitHub Docs: Markdown content lint at `729fe5d`](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/.github/workflows/content-lint-markdown.yml) | A diagnostic annotation pass followed by an errors-only blocking pass on changed content | Medium |
| G3 | [GitHub Docs content-linter rules at `729fe5d`](https://github.com/github/docs/tree/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/src/content-linter/lib/linting-rules) | Repository-owned semantic rules for frontmatter, links, tables, image alt text, expired content, and third-party action pinning | High; rule set changes |
| G4 | [GitHub Docs contributing guide at `729fe5d`](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/.github/CONTRIBUTING.md) | One canonical contributor guide, explicit accepted/non-accepted contribution types, issue templates, self-review, and repository-specific setup | Medium |
| K1 | [Kubernetes release schedule data at `3f8be5a`](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/data/releases/schedule.yaml) | Structured release dates, maintenance transitions, patch schedules, and an identified generation tool | High; schedule data changes |
| K2 | [Kubernetes end-of-life data at `3f8be5a`](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/data/releases/eol.yaml) | Historical version status stored separately from prose | High; new EOL entries appear |
| K3 | [Kubernetes generated release pages at `3f8be5a`](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/content/en/releases/_content.gotmpl) | Reader-facing status pages generated from schedule and EOL data, including derived supported/maintenance/end-of-life states | Medium |
| K4 | [Kubernetes internal link checker guide at `3f8be5a`](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/content/en/docs/doc-contributor-tools/linkchecker/README.md) | Link checks run against generated HTML, with explicit inclusions and exclusions rather than an implied whole-site guarantee | Medium |
| K5 | [Kubernetes root OWNERS at `3f8be5a`](https://github.com/kubernetes/website/blob/3f8be5ad13f5d694564eb70a9b9dfd3e82f261b9/OWNERS) | Named reviewer/approver roles and area labeling | Medium |
| M1 | [mdBook CI at `b90df24`](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/.github/workflows/main.yml) | Platform/toolchain matrix, formatting, lint, unit, and GUI tests as separate diagnosable jobs | Medium |
| M2 | [mdBook contributing guide at `b90df24`](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/CONTRIBUTING.md) | Review-capacity-aware issue intake, label taxonomy, claim workflow, and local quality commands | Medium |
| D1 | [Docusaurus versioning guide at `3f483e8`](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docs/guides/docs/versioning.mdx) | Frozen documentation versions, current/latest distinction, and an explicit warning that versioning adds contributor and build complexity | Medium |
| D2 | [Docusaurus Lighthouse workflow at `3f483e8`](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/.github/workflows/lighthouse-report.yml) | Built-site audits on representative routes, artifact upload, and persistent PR reporting | Medium |
| D3 | [Docusaurus docs issue form at `3f483e8`](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/.github/ISSUE_TEMPLATE/documentation.yml) | Documentation-specific intake, scope guidance, triage label, and a time-bounded self-service signal | Medium |
| D4 | [Docusaurus contributing guide at `3f483e8`](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/CONTRIBUTING.md) | Issue/PR triage, one-issue-one-bug discipline, reproductions, proposal path, and public CI expectations | Medium |
| S1 | [Starlight CI at `656ffd5`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/.github/workflows/ci.yml) | Path-filtered jobs, branch concurrency cancellation, cross-platform E2E testing, and focused documentation/package checks | Medium |
| S2 | [Starlight Lunaria workflow at `656ffd5`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/.github/workflows/lunaria.yml) | Translation state is computed and reported on documentation pull requests rather than described only in prose | Medium |
| S3 | [Starlight contributor manual at `656ffd5`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/CONTRIBUTING.md) | Multiple contribution types, reproducible setup, translation workflow, and a change-record rule that excludes docs-only changes | Medium |

## Comparative findings

### 1. Generated facts are more trustworthy than repeated status prose

Kubernetes keeps release schedules and EOL history in structured data, then
derives public version pages and states from that data (K1-K3). The generated
template also exposes an important engineering property: derived status logic
is reviewable in one place. A date-based transition from `supported` to
`maintenance` is not manually repeated across every language page.

This repository already follows the same principle for learning-path data,
locale manifests, search, navigation, and content status. The gap is that the
top-level release decision is still prose in `docs/release-checklist.md` plus a
human interpretation of `docs/quality/quality-register.md`.

**Transferable rule:** a fact displayed in more than one place should have one
structured owner and generated projections. A release claim is also a fact.

**Tradeoff:** generated facts create schema and migration work. They are most
valuable for facts that are repeated, time-sensitive, or release-blocking; they
are unnecessary for one-off editorial judgments.

### 2. Release gates should be layered, scoped, and explicit about exclusions

GitHub Docs separates link checking, content lint, readability, and other
pipelines. Its content-lint workflow first prints all annotations and then runs
an errors-only pass that can block the PR (G2). Its PR link check limits the
changed-file scope and temporarily reports cross-page anchor failures without
blocking while the signal is being evaluated (G1).

Kubernetes documents what its HTML link check does **not** inspect, including
some navigation, blog, API reference, and localization surfaces (K4). mdBook
uses separate jobs for operating systems, Rust toolchains, formatting, Clippy,
and GUI behavior (M1). Starlight applies path filters so documentation and
package changes do not pay for the same irrelevant jobs (S1).

**Transferable rule:** every gate needs four fields: scope, severity, evidence,
and known blind spots. A green job must not imply a broader claim than its
coverage.

**Tradeoff:** many small jobs improve diagnosis but increase workflow and
maintenance surface. This repository is small enough that one workflow remains
appropriate, but its output should group checks into named release dimensions
rather than one undifferentiated job.

### 3. Accessibility is a content contract and a rendered-product contract

GitHub Docs implements content-level accessibility rules in its own linter,
including multiple image alt-text checks and structural integrity rules (G3).
Docusaurus builds the website and runs Lighthouse on a deliberately chosen set
of routes, preserving results as artifacts and a PR comment (D2). These cover
different failure classes: Markdown rules can reject missing or malformed text,
while rendered audits can detect document structure, color, navigation, and
runtime issues that raw-source checks cannot establish.

**Transferable rule:** use two gates:

1. deterministic source checks for alt text, heading order, language attributes,
   link names, and media metadata;
2. a small rendered route matrix for desktop/mobile keyboard and automated
   accessibility checks.

**Tradeoff:** automated accessibility scores are partial evidence. They do not
prove usable reading order, meaningful alt text, zoom behavior, or a good
screen-reader experience. Manual evidence remains necessary before a
`production-ready` claim.

### 4. A quality ledger needs ownership and closure evidence, not only severity

The reviewed projects use several mechanisms rather than one universal ledger.
GitHub Docs and Docusaurus provide documentation-specific issue forms and
automatic labels (G4, D3-D4). mdBook tells contributors which labeled issues
are likely to receive review and provides a claim protocol (M2). Kubernetes
uses hierarchical OWNERS files to distinguish review and approval roles (K5).

The current Field Guide quality register already records severity, finding,
required closure evidence, and status. It is stronger than a generic issue
list, but it lacks machine-enforced identifiers, owners, dates, affected
artifacts, and a validator that proves every open P0/P1 blocks release.

**Transferable rule:** a quality ledger row should be an executable governance
record with at least `id`, `severity`, `owner`, `status`, `affected_paths`,
`opened_at`, `next_review`, `closure_evidence`, and `superseded_by`.

**Tradeoff:** a structured ledger can become bureaucratic if every typo becomes
a record. Restrict it to release risk, recurring defects, and findings that need
evidence across more than one commit.

### 5. Contributor workflows protect maintainer capacity

GitHub Docs states what kinds of contributions it accepts and routes detailed
guidance to one canonical contributor source (G4). Docusaurus distinguishes
documentation issues from product bugs, asks for reproductions, and provides a
proposal path for non-trivial changes (D3-D4). mdBook explicitly warns that its
review backlog is constrained and directs contributors toward accepted/help-
wanted issues before they invest heavily (M2). Starlight distinguishes user-
impacting package changes that need a changeset from docs-only changes that do
not (S3).

This repository currently has governance contribution guidance but no root
`CONTRIBUTING.md`. For a public release, that absence makes the front door less
professional even though the internal rules are substantial.

**Transferable rule:** the root contributor guide should be a short router, not
a second governance manual. It should identify accepted change types, canonical
rules, issue-before-work cases, required evidence, local commands, source/license
boundaries, and the difference between docs-only and behavior-changing changes.

**Tradeoff:** an overly demanding process suppresses small corrections. Use a
light path for typo/link fixes and a proposal/evidence path for curriculum,
status, release, generated contracts, and Skill behavior.

### 6. Documentation versioning is not automatically professional

Docusaurus makes a useful negative point: frozen documentation versions can
increase build time and make contribution harder, and are best suited to
high-traffic products whose documentation changes materially between releases
(D1). Kubernetes needs explicit release-series facts because readers operate
multiple supported product versions (K1-K3). A curriculum repository does not
have the same requirement merely because it is book-like.

**Decision for this repository:** do not copy Docusaurus-style full source
snapshots yet. Version the **release contract and evidence**, not every Markdown
file. Tag releases in Git, preserve a generated release record, and keep volatile
product facts tied to checked dates. Introduce parallel frozen reader editions
only after the project supports multiple public curricula with meaningful
behavioral differences.

## Ranked mechanisms for this repository

### 1. Generate a release evidence packet — highest impact

Add one command such as:

```powershell
python scripts/build_release_evidence.py --check
```

It should read existing authoritative sources rather than introduce duplicate
status:

- `docs/governance/content-status.yaml`
- `docs/quality/quality-register` in a structured form
- `docs/governance/locale-matrix.yaml`
- `docs/governance/update-registry.yaml`
- the current commit SHA and configured release version
- machine-readable results from the project validation suite

The generated Markdown or JSON packet should contain:

| Field | Required meaning |
|---|---|
| Candidate SHA | Exact tree evaluated |
| Decision | `blocked`, `candidate`, `verified`, or `production-ready` |
| Blocking findings | Open P0/P1 IDs and closure evidence still missing |
| Gate matrix | Check, scope, result, timestamp, and evidence/log path |
| Known blind spots | External links, runtime labs, manual accessibility, user review, or other untested surfaces |
| Source freshness | Overdue volatile-fact and governance reviews |
| Rollback target | Last known releasable tag or commit |

**Innovation appropriate here:** make the report refuse a stronger status than
the weakest blocking dimension. For example, static checks passing cannot
upgrade labs whose `run_status` remains `not_run`.

### 2. Convert the quality register into a validated ledger — very high impact

Move canonical defect records to JSON-compatible YAML, retaining the current
Markdown table as a generated human view. Add a validator that enforces:

- unique stable IDs and controlled severity/status values;
- one owner and next-review date for every open finding;
- existing closure-evidence paths for resolved findings;
- no `verified` or `production-ready` project status while a P0/P1 is open;
- an explicit supersession link instead of silently deleting history.

This combines GitHub/Docusaurus issue intake with the Field Guide's stronger
evidence vocabulary. GitHub Issues can later mirror public work, but the
repository ledger should remain the release authority because it can be checked
offline and versioned with the affected content.

### 3. Split documentation CI into evidence dimensions — high impact

Keep a single workflow file if desired, but expose separate jobs or summaries:

1. **Contracts:** structure, content identity, navigation, locale, status.
2. **Generated artifacts:** learning path, locale manifest, search, Pages output.
3. **Content integrity:** local links, source/license references, stale facts.
4. **Skills and evaluations:** Skill validators and fixture contracts.
5. **Rendered product:** representative routes, mobile widths, keyboard smoke,
   and automated accessibility.
6. **Release decision:** consumes prior job results and the quality ledger; it
   does not rerun the checks.

Use path filters only after a dependency map proves which changes cannot affect
a dimension. Content contracts have broad downstream effects, so premature
filtering could hide breakage.

### 4. Add a two-tier link and accessibility program — high impact

The repository currently checks local Markdown links, which is necessary but
not sufficient. Add:

- a deterministic internal generated-HTML link/anchor check on every PR;
- an external URL reachability audit on a schedule, with retries, redirects,
  allowed failures, last-success time, and ownership;
- source accessibility rules on every PR;
- a small rendered route matrix on PRs that change `site/`, navigation, assets,
  locale routing, or generated site data;
- a recorded manual accessibility review before public production status.

Follow GitHub Docs' staged-rollout pattern: begin new noisy checks as reporting,
measure false positives, document exclusions, then make stable classes blocking.
Do not turn intermittent third-party URL failures into arbitrary release noise.

### 5. Create a short contributor front door with change classes — medium impact

Add a root `CONTRIBUTING.md` that routes to existing project contracts. Suggested
change classes:

| Class | Examples | Minimum path |
|---|---|---|
| Small correction | typo, broken local link, unambiguous wording | focused check + self-review |
| Content change | chapter, lab, case, source fact | source record + learning contract + relevant validators |
| Contract change | status schema, navigation, locale, generated data | proposal/ADR + generator + validator + migration evidence |
| Behavior change | Skill, evaluation, automation | issue/proposal + tests + fresh-context or runtime evidence |
| Release change | public status, version, license, distribution | release evidence packet + maintainer approval + rollback target |

This keeps contribution approachable while preventing a large AI-generated
rewrite, unlicensed asset import, or status inflation from masquerading as a
simple documentation edit.

## Recommended implementation order

```text
structured quality ledger
          |
          v
release evidence generator ----> release-decision CI summary
          |                                  |
          v                                  v
scheduled external links          rendered accessibility matrix
          |
          v
short contributor front door
```

The ledger comes first because release logic needs structured blockers. The
release generator follows because it makes existing checks legible. Rendered
accessibility and external links then add evidence dimensions without changing
the maturity vocabulary. The contributor front door should be written after
the commands and gates exist, so it describes a real workflow rather than an
aspirational one.

## What not to copy

- Do not reproduce GitHub Docs' large workflow inventory. Its product scale,
  internal sync process, and operational teams are not this repository's scale.
- Do not adopt Kubernetes' release-series machinery unless multiple supported
  curriculum editions actually exist.
- Do not freeze every documentation version because Docusaurus supports it;
  its own documentation warns about the complexity cost.
- Do not treat Lighthouse as an accessibility certification or a single score
  as release evidence.
- Do not add path filters before identifying all generated and semantic
  dependencies; a chapter change can affect navigation, search, locale routing,
  learning paths, and the public site.
- Do not move the release authority entirely into GitHub Issues. Issues are
  useful collaboration surfaces, but the checked-in contract must remain
  reviewable with the candidate commit.

## License and copying boundary

This report is an original comparison of public first-party sources. It copies
no external prose, source code, configuration, images, logos, templates, CSS,
or brand expression into the project. Short field names and generic mechanism
names such as `owner`, `status`, link checking, CI, or release schedule are
functional concepts, not imported implementations.

All external projects remain `reference-only`. Their repository licenses do
not automatically cover trademarks, screenshots, contributor submissions,
third-party assets, hosted documentation content, or material under different
file-level notices. GitHub's repository metadata reported CC-BY-4.0 for
`github/docs`; Kubernetes Website reported CC-BY-4.0; mdBook reported MPL-2.0;
and Docusaurus and Starlight reported MIT on the access date. Those repository-
level identifiers are a screening aid, not a substitute for inspecting the
exact file, its history, and any nested notice. Before adapting any specific
code or configuration, inspect the exact file's license and attribution
requirements and record the decision in `docs/sources/asset-register.md`. The
recommended mechanisms should be implemented independently in this
repository's existing Python and JSON-compatible YAML conventions.

## Claim boundary

This research supports design decisions, not completion claims. It does not
establish that this repository currently has external-link monitoring,
generated release decisions, validated quality-ledger semantics, rendered
accessibility CI, contributor onboarding, learner validation, or production
readiness. Each mechanism remains a candidate until its files exist, its
validator covers the stated contract, failure fixtures prove the gate can fail,
and current CI evidence is recorded.
