# ADR-0034: Use Prysai LLM Playbook as the reader-facing identity

## Status

Accepted; supersedes ADR-0033 for reader-facing naming.

## Date

2026-08-14

## Context

ADR-0033 correctly moved the umbrella identity away from a Codex-only product
name and made `LLM` visible. Its compact wordmark, **FIRST TASK / REAL WORK**,
still foregrounded an outcome phrase rather than the product category. A new
reader could miss that the site is an LLM learning and practice system before
reaching the hero copy or metadata.

The curriculum needs a name that is distinctive in a GitHub result, contains a
durable technical search term, and describes a practical learning product
without claiming verified coverage of every model or agent platform. Codex
remains the deepest current practice track; the name must not imply that a
Claude Code or other platform adapter has passed the project's admission gate.

## Decision

1. Use **Prysai LLM Playbook — From First Task to Reliable Work** as the full
   reader-facing title.
2. Use **LLM PLAYBOOK** as the compact wordmark, with **Prysai Lab** as the
   owner marker. The Chinese interface title is **Prysai 大模型实战手册：从第一个
   任务到可靠交付**.
3. Use the concise promise: **An evidence-led LLM playbook for turning a first
   task into bounded, checkable work.**
4. Keep **Codex Practice Track** as the flagship practice track. Named
   platforms other than Codex remain subject to ADR-0025's adapter gate.
5. Update current entry pages, metadata, Reader chrome, brand assets, source
   vocabulary, and active book entry points. Preserve older research and ADRs
   as historical decision evidence.
6. Keep the GitHub repository identifier `Prysai/Codex-Field-Guide`, remote
   URL, stable content IDs, Skill directory names, locale identities, and
   existing paths. This decision does not publish, rename the repository,
   change visibility, enable Pages, create redirects, or claim a domain or
   trademark.

## Alternatives considered

### Keep First Task, Real Work — An LLM Field Guide

Rejected. It is a clear teaching promise, but its wordmark makes the project
category secondary and does not make the LLM subject obvious at a glance.

### Use Models at Work

Rejected. It is broad and memorable, but it omits `LLM`, the precise category
term a new reader is likely to search, and needs more explanation to avoid
sounding like a generic productivity site.

### Use Prysai LLM Workbench

Rejected. `Workbench` suggests an application or development environment,
while this repository is an evidence-led learning and practice product.

### Rename the GitHub repository now

Deferred. A slug migration affects clone URLs, issue URLs, inbound links,
Pages configuration, release rollback, and contributor expectations. It still
requires explicit migration approval and evidence beyond this reader-facing
identity update.

## Consequences

- The first visual impression now communicates the owner, LLM category, and
  practical playbook format before the reader chooses a route.
- `From First Task to Reliable Work` remains a concrete learner promise rather
  than carrying the entire product identity.
- Metadata can naturally include LLM, GPT, Codex, tools, Skills, Agents,
  safety boundaries, and evidence without turning the name into a keyword list.
- The existing `codex-field-guide` repository slug deliberately remains visible
  as a compatibility artifact until a separate migration is approved.
- The project remains `candidate`. A name and visual refresh do not prove
  learner outcomes, platform equivalence, release readiness, public deployment,
  trademark availability, search ranking, or community adoption.

## Evidence boundary

This ADR records a reader-facing naming and presentation decision. It does not
prove that the proposed name is legally clear, available as a domain or social
handle, memorable to users, better for search ranking, or accepted by an
external audience. It also does not widen the curriculum's platform-coverage
claims or change its evidence status.
