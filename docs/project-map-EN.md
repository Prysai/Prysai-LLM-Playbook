# Project map

This is the fastest way to find the right kind of file in the repository. The
project deliberately separates reader-facing material, runnable practice,
research, governance, generated presentation data, and validation code. A
directory name tells you what the file is responsible for; it is not a second
table of contents.

The machine-readable companion is
[`docs/governance/project-structure.yaml`](governance/project-structure.yaml).
This page is its human-facing projection. When the two disagree, update the
contract and then bring this page and the relevant landing page back into
alignment.

## Find something in seconds

| I need to… | Start here | What belongs there |
|---|---|---|
| Read the book | [`book/`](../book/) | Preface, chapters, book table of contents, and lab index |
| Read a chapter | [`book/chapters/`](../book/chapters/) | One file per chapter; `-EN` is the English source when it exists; unsuffixed files are the current legacy Chinese path |
| Run an exercise | [`book/labs/`](../book/labs/) | Low-risk, observable labs with setup, failure cases, evidence, and transfer tasks |
| Understand the chapter order | [`docs/governance/book-navigation.yaml`](governance/book-navigation.yaml) | The canonical 22-chapter order used by generated footers |
| Choose a project Skill | [`skills/`](../skills/) and [`docs/skill-registry.md`](skill-registry.md) | Skill contracts, supporting resources, and the registry of triggers and boundaries |
| Check a real-world problem | [`docs/research/`](research/) | First-party fact records, public user reports, field cases, and dated research notes |
| Check what is current | [`docs/governance/`](governance/) | Status, locale identity, learning path, update map, impact registry, and lifecycle rules |
| Check quality rules | [`docs/quality/`](quality/) | Chapter, lab, Skill, evaluation, site, and review standards |
| Check a source or license | [`docs/sources/`](sources/) | External source, archive, asset, attribution, and distribution boundaries |
| Inspect a decision | [`docs/adr/`](adr/) | Architecture decisions and the reasons behind them |
| See a reproducible example | [`examples/`](../examples/) and [`assets/cases/`](../assets/cases/) | Disposable local sandboxes, source inputs, rendered artifacts, and screenshots with evidence limits |
| Inspect evaluation tasks | [`evals/`](../evals/) | Fixed task fixtures and result directories; task definitions are not run results |
| Change or run a checker | [`scripts/`](../scripts/) | Validators, local-link checks, catalog builders, and generators |
| Inspect the public front door | [`site/`](../site/) | Static showcase HTML, CSS, JavaScript, content catalog, and generated learning-path data |
| Follow active work | [`tasks/`](../tasks/) | The bounded implementation plan and current checklist |

Every major directory also has a short landing page. Use it when you are
already inside the repository and need the local next step: [`book/README.md`](../book/README.md),
[`docs/README.md`](README.md), [`assets/README.md`](../assets/README.md),
[`examples/README.md`](../examples/README.md), [`scripts/README.md`](../scripts/README.md),
[`skills/README.md`](../skills/README.md), and [`tasks/README.md`](../tasks/README.md).

## The top-level shape

```text
.
├── README.md                  GitHub's default English facade
├── README-EN.md               canonical detailed English project entry
├── AGENTS.md / CONTEXT.md     working rules and stable project vocabulary
├── book/
│   ├── chapters/              chapter source files and locale variants
│   ├── labs/                  practical experiments and lab index
│   └── table-of-contents*.md  human-readable reading indexes
├── skills/                    project-owned reusable operating methods
├── docs/
│   ├── research/              sourced facts and field-problem records
│   ├── governance/            machine-readable contracts and update rules
│   ├── quality/               acceptance standards and review records
│   ├── sources/               license and asset register
│   ├── adr/                   architecture decisions
│   └── project-map-EN.md      this map
├── examples/                  disposable, reproducible case inputs and sandboxes
├── assets/                    teaching diagrams, README visuals, and case evidence
├── evals/                     fixed evaluation fixtures and run-result folders
├── scripts/                   validators, generators, and build helpers
├── site/                      public static showcase and generated data
└── tasks/                     current plan and short execution checklist
```

## One source, several views

The same chapter order should not be retyped in the README, table of contents,
site, and every chapter footer. The canonical chain is:

```text
docs/governance/book-navigation.yaml
        │
        ├── scripts/build_book_navigation.py
        │       └── chapter footer blocks in book/chapters/
        ├── scripts/validate_book_navigation.py
        └── human-facing book/table-of-contents*.md and project map
```

The navigation source controls order and page relationships. It does not
replace the learning-path contract, content status, locale matrix, or content
matrix. Those files answer different questions and remain separate on
purpose.

For the English reading path, chapters 1–9 currently have `-EN` source files.
Chapters 10–22 are linked to the existing unsuffixed source with an explicit
`migration pending` label. The generator never silently turns a missing
translation into a completed English page.

## Where a change starts

| Change | First file | Then update or check |
|---|---|---|
| Add or reorder a chapter | `docs/governance/book-navigation.yaml` | Chapter source, English/legacy table of contents, content matrix, status, then navigation generator and validator |
| Add a chapter body | `book/chapters/<id>.md` or `<id>-EN.md` | Relevant source record, locale matrix, status, local links, and chapter contract |
| Add a lab | `book/labs/<id>.md` | Lab index, learning path, status, source record, and lab checks |
| Add or change a Skill | `skills/<skill-name>/SKILL.md` | Skill registry, quality standard, official validator, and fresh-context evidence |
| Add a field case | `docs/research/` or `examples/` | Source/license register, privacy boundary, chapter/lab link, and evidence status |
| Change a volatile product fact | Dated record in `docs/research/` | Fact-impact registry, affected consumers, next review date, and relevant validators |
| Change the public page | `site/` or its canonical catalog/contract | Generated data check, local links, i18n check, and browser review |

## Generated files and files not to hand-edit

The following are generated or contract-derived:

- [`book/chapters/*` navigation blocks](../scripts/build_book_navigation.py)
  are replaced between their two HTML markers;
- [`site/learning-path-data.js`](../site/learning-path-data.js) comes from the
  learning-path and content-status contracts;
- status and locale files are machine-readable contracts, not informal notes.

The complete generated-output list and each output's owner are recorded in the
[project structure contract](governance/project-structure.yaml). That contract
also excludes local work directories such as `.work/` and `tmp/` from the
published map; those are working data, not project surfaces.

If a generated result is wrong, fix its source and rerun the generator. Do not
hide a stale result by editing the output by hand.

## The maintenance loop

```text
find the owner → read the contract → make the smallest change
→ preserve source/license boundaries → run focused checks
→ run project checks → review what remains unverified → publish
```

The [update map](governance/update-map.md) is the operational index. The
[book architecture](book-architecture.md) is the content contract. The
[asset register](sources/asset-register.md) is the external-material boundary.
