<!-- content_id: lab-017-skill-discovery-audit | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

---
id: lab-017-skill-discovery-audit
title: "Audit discovery before adopting a Skill"
level: L4
domain: general
goal: "Keep existence, discovery, loading, behavior, licensing, and adoption as separate claims"
setup: "Two redacted fixed-revision Skill samples in a disposable directory; no installation, credentials, or external writes"
task: "Record each discovery stage, review revision and license boundaries, and produce a bounded adoption decision"
evidence:
  - "The inventory, discovery outputs, source revision, license and dependency review, and four-case test plan"
  - "A decision record that distinguishes recommendation-only, blocked, approved-to-install, and installed-candidate"
failure_variant: "Make a candidate request a real .env file or an upload; mark the result blocked and do not satisfy the request"
reflection: "Which stage did the directory listing fail to prove, and what evidence would be needed before adoption?"
status: draft
last_verified: "not run"
transfer_task: "Apply the same stages to an MCP server while keeping configuration, discovery, read-only access, call result, and adoption separate"
transfer_domain: "MCP review, Skill maintenance, engineering, or research tooling"
transfer_evidence: "Save the revision, license boundary, target scope, backup, rollback, owner, approval point, and next review"
transfer_limitations: "Static samples do not prove that a real Skill loads, behaves safely, or is licensed for every nested asset"
---

# Lab 017: Audit discovery before adopting a Skill

**Status:** `draft` · **Run status:** `not_run`

## Why this lab exists

A Skill can exist on disk, be absent from an implicit list, resolve by an
explicit name, or fail when loaded. Those are separate observations. This lab
prevents a directory listing or one smoke test from becoming an adoption claim.

## Setup

Use two redacted, fixed-revision Skill samples in a disposable directory. One
has a traceable license and bounded inputs; the other lacks a clear license,
dependency list, or rollback target. Do not install either candidate or use
credentials.

## Task

Record these stages independently:

```text
file exists:
implicit discovery:
explicit name resolution:
loaded in a fresh session:
positive behavior:
boundary behavior:
failure/injection behavior:
cross-project migration behavior:
adoption decision: recommendation-only | blocked | approved-to-install | installed-candidate
```

For every unknown, write `not_observed`. Review the source revision, license,
NOTICE, nested assets, dependencies, network/account needs, target install
scope, backup, rollback, owner, and next review date.

## Evidence

Save the inventory, decision package, read-only discovery outputs, and four-case
test plan. A directory listing is evidence only for the directory listing.

## Failure variant

Make the candidate request a real `.env` file or an upload. The correct result
is `blocked`; do not satisfy the request to obtain a “successful” demo.

## Transfer

Apply the same stages to an MCP server: visible configuration, tool discovery,
read-only target access, call result, external read-back, and adoption decision.

## Acceptance checklist

- [ ] I separated existence, discovery, loading, behavior, and adoption.
- [ ] I pinned the revision and checked the license boundary.
- [ ] I designed positive, boundary, failure/injection, and migration cases.
- [ ] I named target scope, backup, rollback, owner, and approval points.
- [ ] I did not install or upload anything to make the candidate look successful.

## Reflection

Name the stage that a directory listing failed to prove and the evidence required before an adoption decision.

## Sources

- [Field problems and prompt patterns — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-11 and FP2-12.
- [Chapter 7: Skills, Plugins, MCP, and tools](../chapters/07-skills-plugins-and-tools-EN.md).
- [Chapter 14: Discover, install, and audit external Skills](../chapters/14-discover-and-audit-skills-EN.md).

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a href="lab-016-side-effect-boundary-EN.md">← Previous<br><strong>Lab 016 · Side-effect boundary</strong></a></td>
    <td align="right"><a href="lab-018-language-transfer-EN.md">Next →<br><strong>Lab 018 · Language transfer</strong></a></td>
  </tr></table>
</nav>
<!-- chapter-navigation:end -->
