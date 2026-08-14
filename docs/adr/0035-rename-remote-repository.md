# ADR-0035: Rename the remote repository to Prysai LLM Playbook

## Status

Accepted. This supersedes the repository-rename deferral in ADR-0033 and
ADR-0034; their reader-facing naming decisions otherwise remain in force.

## Date

2026-08-14

## Context

The reader-facing identity is already **Prysai LLM Playbook — From First Task
to Reliable Work**, while the GitHub repository still displayed the older
`Codex-Field-Guide` name. That mismatch made the project look narrower than
its stated scope and left a visitor with two competing identities.

Prysai explicitly authorized a repository rename and synchronized update. The
repository is still private and remains a candidate curriculum. A rename does
not establish a public release, GitHub Pages deployment, learner outcomes,
platform parity, trademark rights, search ranking, or community adoption.

## Decision

1. Rename the canonical GitHub repository from
   `Prysai/Codex-Field-Guide` to `Prysai/Prysai-LLM-Playbook`.
2. Treat `https://github.com/Prysai/Prysai-LLM-Playbook` as the canonical
   repository URL and update the local `origin` remote accordingly.
3. Update current, reader- and contributor-facing repository links, including
   README routes, issue-template contact links, and current governance facts.
4. Preserve earlier research, audit snapshots, and superseded decisions that
   name the former repository as historical evidence. They must not be
   rewritten to imply they observed the new identifier.
5. Keep stable content IDs, directory paths, Skills, locale identifiers, and
   the private/candidate status unchanged. Existing links are expected to use
   GitHub's rename redirect where GitHub provides one, but the project does not
   claim that redirect as a permanent compatibility guarantee.

## Alternatives considered

### Keep the Codex-Field-Guide repository name

Rejected. It leaves the most visible GitHub title inconsistent with the
approved LLM-wide identity and reinforces the false impression that the
umbrella curriculum is an official or Codex-only product manual.

### Rename only after public release

Rejected. A private rename can be completed and audited without presenting a
half-migrated public identity. It does not bypass the separate release and
learner-evidence gates.

### Move the course into a new repository

Rejected. A move would add avoidable history, issue, and link migration risk.
The existing repository is the canonical source and GitHub supports a direct
rename.

## Consequences

- GitHub now displays the project title as **Prysai-LLM-Playbook**, matching
  the reader-facing identity.
- Active links and the local clone remote use the new canonical address.
- Historical records retain their original old-name scope; ADR-0035 supplies
  the link between those records and the current repository identity.
- Contributors who cloned the previous address may need to update their
  `origin` remote. No release, visibility, deployment, or course-quality
  status changes with this decision.

## Evidence boundary

The GitHub rename and a metadata check were completed on 2026-08-14. This ADR
records a repository-identity migration only; it does not make claims about
runtime behavior, learner success, external redirects, or future public
availability.
