# ADR-0014: Keep a canonical project directory map and landing pages

## Status

Accepted

## Date

2026-08-11

## Context

The repository has grown into several cooperating layers: a book, labs,
project Skills, field research, governance contracts, evaluation fixtures,
visual assets, a public showcase, and repeatable checks. The files are useful,
but a new reader or contributor currently has to reconstruct the ownership
boundaries by reading several documents and browsing directory listings.

The structure research for mdBook, Docusaurus, VitePress, Starlight, and
WorkBuddyGuide points to the same durable principle: a learning route and a
repository map are different projections of the same product. A table of
contents helps a reader move through lessons; a directory guide tells a
contributor where a change starts and which file owns the decision. Neither
should be replaced by a second, hand-maintained copy of the other.

## Decision

### 1. Keep one machine-readable directory contract

`docs/governance/project-structure.yaml` is the canonical map for the
repository's top-level directories, important subdirectories, root entry
files, and generated surfaces. It records:

- what each directory is responsible for;
- the first file a reader or contributor should open;
- the contract or source record that owns its decisions; and
- which file or marked region is generated and must not be edited by hand.

The file uses the repository's existing JSON-compatible YAML convention so the
standard-library validator can run without adding a dependency.

### 2. Give important directories a short landing page

The landing pages under `book/`, `docs/`, `assets/`, `examples/`, `scripts/`,
`skills/`, and `tasks/` are orientation pages. They answer “what belongs here,
where do I start, and what must I not edit directly?” They do not duplicate a
chapter, Skill contract, research report, or machine-readable status source.

### 3. Keep the reading route separate from the repository map

`docs/governance/book-navigation.yaml` remains the sole ordered source for the
22-chapter reading route and generated chapter footers. The project structure
contract does not become a second table of contents. `docs/project-map-EN.md`
is the human-readable projection for people who want to find a file quickly;
it links to the contract and to the landing pages.

### 4. Enforce the map in quality checks

`scripts/validate_project_structure.py` checks that mapped directories and
landing pages exist, every non-excluded top-level directory is represented,
source records for generated files exist, and generated-surface rules name an
owner, the exact generated surface, and an edit boundary. CI runs this check
with the other structural validators.

## Alternatives considered

### Put all orientation material in the root README

Rejected. The root README is the public front door and should help a reader
choose a useful first route. Making it the only directory map would make it
longer, harder to scan, and fragile when internal ownership changes.

### Rely on directory names and GitHub listings

Rejected. A name such as `docs/` does not tell a contributor which file is the
source of truth, whether an output is generated, or where a change should
start. GitHub listings also do not explain the distinction between source,
status, research, and rendered evidence.

### Generate every README from the manifest

Rejected for this slice. Fully generated prose would make small orientation
pages difficult to edit and would add a second content-generation surface.
The manifest is authoritative for structure; the landing pages remain concise
human documentation checked for existence and linked from the project map.

### Adopt a documentation framework immediately

Rejected for the same reason as ADR-0013. The repository can later adapt the
contract to mdBook, Docusaurus, VitePress, or Starlight, but a framework change
would expand deployment and localization scope before the content identity is
complete.

## Consequences

- A new contributor can enter from the root, a directory landing page, or the
  project map and reach the correct source of truth in one or two clicks.
- Moving or adding a top-level directory now requires a small contract update,
  which the validator makes visible.
- The repository has a modest amount of orientation prose to maintain, but it
  avoids duplicating the curriculum and status registries.
- A passing structure check proves file and contract consistency only. It does
  not prove that a chapter, Skill, lab, translation, screenshot, or runtime
  behavior is verified.

## Evidence boundary

This decision uses the structure comparison recorded in
[`book-navigation-architecture-study-2026-08-11.md`](../research/book-navigation-architecture-study-2026-08-11.md)
and the earlier front-door and WorkBuddyGuide studies. Those records contain
source URLs and the reference-only/license boundary. They do not copy external
prose, code, screenshots, brands, or templates.
