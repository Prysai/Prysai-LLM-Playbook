# Lab 008 deterministic maintainer fixture

This fixture asks one bounded synthetic maintenance question: should the Orion
service use a 30-minute maintenance window for release `4.2`?

All names, records, URLs, dates, and claims are fictional. The four supplied
records deliberately have different evidence roles:

- `S-CURRENT` is the current authoritative release record.
- `S-STALE` is a superseded, scope-matched authoritative record that conflicts
  with it.
- `S-INACCESSIBLE` records a source that was unavailable; its title is not evidence.
- `S-FABRICATED` is a citation candidate with no supplied artifact and must be rejected.

The runner performs no research. It demonstrates claim calibration against a
frozen local packet only. A passing maintainer reference run is not learner,
transfer, production, or real-world Orion evidence.

The corrected packet is accepted by a fixed project rubric and then reviewed
by a maintainer. That is a reviewer-owned release decision, not an independent
learner assessment or evidence that two human reviewers agreed.
