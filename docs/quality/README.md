# Quality and review records

This directory contains the standards and review records used to decide what
the project can honestly claim.

## Start here

- [Skill quality standard](skill-quality-standard.md)
- [Evaluation framework](evaluation-framework.md)
- [Current-state review](current-state-review-2026-08-09.md)
- [Public-site review](review-public-site-browser-2026-08-10.md)
- [Current First Win pilot protocol](first-win-pilot-protocol-v2.md)
- [Commit-bound First Win pilot-kit contract](../governance/first-win-pilot-kit.yaml)
- [Public beta feedback contract](public-beta-feedback-contract-v1.md)
- [Context Packet Builder proposal fixture](../../evals/candidates/context-packet-builder-v1/README.md)
- [Superseded first-task pilot protocol](first-task-pilot-protocol-v1.md)
- [Red-team release and learning audit](red-team-release-and-learning-audit-2026-08-13.md)
- [Lab navigation and locale integrity review](review-lab-navigation-and-locale-integrity-2026-08-13.md)
- [Reader teaching-card placement review](review-reader-teaching-card-placement-2026-08-13.md)
- [Lab 008 deterministic reference review](lab-008-reference-run-review-2026-08-13.md)
- [Universal Seam Fixture](../../examples/universal-seam-v1/README.md)
- [Project map](../project-map-EN.md)
- [Content integrity standard](content-integrity-standard.md)
- [Current quality register](quality-register.md)

## Status boundary

`draft`, `candidate`, `verified`, and `production-ready` are evidence states,
not visual labels. A passing structural checker can establish consistency of
files and metadata; it cannot establish runtime behavior, translation quality,
reader comprehension, or customer impact. Review records must say what was
checked and what remains outside scope.

The minimum release gate also includes
`python scripts/validate_content_completeness.py`. It checks stable content
identity, canonical English paths, chapter order, reader entries, and
generated site outputs. A passing result does not prove a lab was run, a
translation was reviewed, or a public deployment is reachable.

New curriculum units also pass the machine-readable
[gold-content admission contract](../governance/gold-content-admission.yaml).
The contract rejects padding and unsupported maturity before a unit enters the
main curriculum. Its score is not a learner score: admission does not prove the
exercise ran, the advice transfers, or a reader mastered the capability.

The [quality register](quality-register.md) is generated from the
[machine-readable register](../governance/quality-register.yaml). Historical
review reports remain useful evidence, but they do not close an item without a
recorded status, evidence path, and resolution scope. Active P0/P1 items block
`verified`; any active item blocks `production-ready`.

The commit-bound release packet is generated only during a run, using
[`release-evidence.yaml`](../governance/release-evidence.yaml) as its stable
contract. It records the exact candidate SHA, named gate dimensions, logs,
current blockers, source freshness, rollback boundary, and blind spots. It is
uploaded as a workflow artifact rather than committed as a self-stale report.

Authoritative fact URLs have a separate weekly, report-only audit governed by
[`external-url-audit.yaml`](../governance/external-url-audit.yaml). It maps
network observations back to claim IDs and categorizes failures. HTTP success
does not refresh claim semantics or close Q-007; the staged rollout must first
accumulate evidence about false positives and retry behavior.
