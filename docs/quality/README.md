# Quality and review records

This directory contains the standards and review records used to decide what
the project can honestly claim.

## Start here

- [Skill quality standard](skill-quality-standard.md)
- [Evaluation framework](evaluation-framework.md)
- [Current-state review](current-state-review-2026-08-09.md)
- [Public-site review](review-public-site-browser-2026-08-10.md)
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

The [quality register](quality-register.md) is generated from the
[machine-readable register](../governance/quality-register.yaml). Historical
review reports remain useful evidence, but they do not close an item without a
recorded status, evidence path, and resolution scope. Active P0/P1 items block
`verified`; any active item blocks `production-ready`.
