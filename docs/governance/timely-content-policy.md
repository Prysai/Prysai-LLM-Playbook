# Timely content policy

Time-sensitive content gives readers a useful answer while a product, event,
release, or public discussion is still changing. It is a maintained field-note
layer, not a shortcut around the project's stable LLM foundation or evidence
gates.

## Purpose and boundary

Use this layer when the reader's question is time-bound, such as:

- What changed in a newly announced product or release?
- What can a reader responsibly try today?
- Which part of a public report is a useful signal, and which part remains
  unverified?

Keep durable concepts in the book and routes. Keep a current product fact in a
dated research record. Keep a time-sensitive reader brief in `docs/research/`
with `kind: field-note` when it has passed the editorial intake below. A brief
must not create a new chapter, Lab, Skill, or platform-equivalence claim merely
because a topic is receiving attention.

## Admission contract

Before a brief is linked from the Reader, record all of the following in the
content record or the linked source record:

1. `content_id`, canonical path, owner, audience, and `candidate` status;
2. the reader question and the reason the item is timely;
3. the exact scope: product surface, plan or account boundary, region, date,
   and what the item does not cover;
4. each material claim's source URL, source owner, access date, next review,
   evidence class, and limitation;
5. the source and licence boundary, including whether material is original,
   adapted, or reference-only;
6. the intended Reader kind, locale state, generated projections, and rollback
   path; and
7. the claims that remain `not_run`, `not_observed`, `unknown`, or otherwise
   unverified.

The matrix uses an explicit `admission_profile` so historical research records
and new time-sensitive briefs cannot silently share the same review contract:

- `research-record` preserves the lighter, pre-existing admission boundary for
  dated research records. It still requires a title, content identity, a
  `candidate` status, and the source record's existing evidence limits.
- `timely-source-first` is the stricter contract for a new Reader-facing brief.
  It requires the full identity, scope, claim ledger, reader action, failure
  boundary, source/licence boundary, maintenance fields, and generated
  projection details described above.

`translation_policy: source-first` is only a localization strategy: it allows
an English source to be projected deliberately while other locale files remain
explicitly `not-started`. It is not an evidence waiver, a review shortcut, or
an admission profile. A record must declare its profile separately, and every
new timely brief is admitted as `candidate` only. This profile has no automatic
promotion path: `verified` requires a separate evidence contract and review.
`removed` is a removal action, not an active Reader-matrix state; remove the
matrix record and regenerate projections when a brief is withdrawn. The
claim-level `fact_status` vocabulary remains separate from the artifact-level
content status.

Official documentation or a first-party announcement is the default source for
product capability. A public user story, friend report, or community post can
show a demand signal or symptom, but it does not establish a product promise,
root cause, reliability, return on investment, or learning outcome. Rewrite
such material in original language and remove names, account details, private
paths, screenshots, transcripts, and long quotations unless a separate rights
and privacy review explicitly permits them.

When a claim ledger contains more than official facts, label the section and
each row by evidence class. Do not use an official-only heading for a table that
also contains reported experience, project inference, or not-observed claims.

## Writing rules

Write a brief in this order:

1. the practical question;
2. the smallest concept needed to understand it;
3. the decision a reader can make now;
4. a low-risk, reversible action or observation;
5. the evidence and source limits;
6. a failure, contradiction, or unavailable-surface case; and
7. what should be reviewed next and when.

Separate three kinds of language:

- `official fact`: the named source says it, within its stated scope;
- `reported experience`: a person or community reports it, without a verified
  cause or generality; and
- `project inference`: Prysai's bounded teaching implication, which must not
  be presented as a vendor guarantee or a measured learner result.

Do not turn a launch post, marketing example, successful login, visible button,
or fluent answer into proof of availability, performance, security, quality,
reliability, or production readiness. Disclose contradictory first-party
surfaces instead of silently choosing the more convenient one.

## Freshness and stale handling

Every volatile claim has its own review date. Use a shorter window for a beta,
rollout, plan entitlement, platform list, limit, or security control than for a
stable concept. The record's `next_review` is a maintenance obligation, not a
promise that the source will still exist.

At admission, the record-level `last_reviewed` date must be on or after every
claim's `accessed` date, and the record-level `next_review` must be on or before
every claim's `next review` date. This keeps the document-level maintenance
promise from hiding a newer source observation or a claim that needs attention
sooner.

At review time:

- `current`: the source still supports the claim in the recorded scope;
- `stale`: the claim needs a fresh check before being presented as current;
- `disputed`: credible sources conflict or the scope cannot be reconciled; and
- `removed`: the item no longer belongs in the Reader, or its source/licence
  boundary is no longer acceptable.

The timely-content validator runs this freshness check against the current
date by default. Pass `--as-of YYYY-MM-DD` to replay the same decision for a
recorded date. On the `next_review` date and every date after it, a claim whose
fact status is still `current` fails closed; refresh the source or mark the
claim `stale`, `disputed`, or `removed` before presenting it as current.

For claim-ledger rows, also use `unverified` when a supplied report or
observation has not been independently checked, and `candidate` when the row
records a project inference rather than an established fact. These labels do
not promote the item to a verified product, learning, or production result.

When a claim is stale or disputed, narrow the wording or show the limitation
before publishing another projection. When it is removed, remove its Reader
matrix entry and regenerate derived manifests and indexes; preserve the dated
research record when it is useful for audit history. Do not leave an old
generated entry pointing at a withdrawn source.

## Reader and locale rules

The first reader-facing source is English. A `timely-source-first` field-note
may be registered in the locale matrix with a same-locale English source and
explicit `not-started` translation states. Mark this deliberate exception with
`translation_policy: source-first`; undeclared missing translations remain a
blocking Reader-coverage failure. File/path parity is not translation review.
Do not label the project fully bilingual or imply that an untranslated brief
is localized. A Reader entry must remain low-competition: one existing
research area, one clear label, and no new top-level header control for each
item.

After changing the canonical record, regenerate the locale manifest and search
index with their builders. Never hand-edit generated projections. If the
projection makes the home page noisier or obscures the foundation route, roll
back the projection while retaining the source record for later review.

## Review, release, and rollback

Use the `timely-content` row in `update-registry.yaml`, fill in
[`docs/templates/timely-content.md`](../templates/timely-content.md), and keep
the PR limited to one logical content or governance change. Run the focused
checks listed in the registry, then run the broader project checks required by
the affected Reader surface.

For a historical or reproducible check, include the explicit replay date, for
example `scripts/validate_timely_content.py --as-of 2026-09-03`. The date is
inclusive: a claim due on that date is already awaiting review.

The minimum review asks:

- Is every volatile claim source-backed and dated?
- Is every personal or supplied report anonymized and rewritten?
- Are unsupported API, offline, reliability, ROI, safety, learner, and
  production claims explicitly excluded?
- Is the item still `candidate` unless runtime, independent review, or learner
  evidence actually exists?
- Can the source record, matrix entry, generated projections, and Reader link
  be reverted together?

The rollback target is the last clean commit whose Reader projection and
generated files passed their checks. Removing a brief from the Reader does not
erase its research history, and a successful check does not prove that a
time-sensitive product fact remains true after the recorded access date.
