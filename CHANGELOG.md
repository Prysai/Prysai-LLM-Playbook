# Changelog

This file records curated candidate changes for reviewers and future release
work. It is not a GitHub Release, an immutable tag, or evidence that the
Playbook is ready for public production use.

## Unreleased

### Changed

- **Open licenses adopted.** Project-owned content (curriculum, diagrams,
  teaching assets, Skill instructions) moves from CC BY-NC 4.0 to **CC BY 4.0**,
  and scripts/tooling move to **Apache-2.0** (new `LICENSE-CODE`). Reuse,
  adaptation, and commercial use are now allowed with attribution; the Prysai
  name and logos stay project-owned, and third-party assets keep their own
  licenses. All historical commits are by the project owner, so no external
  relicense permission was needed.

### Added

- **Six-platform adapter guide** (book/routes/platform-adapter-guide-EN.md and
  five translations): a safe first task and a visible difference list for
  ChatGPT, Claude / Claude Code, Gemini, DeepSeek, Grok, and the Codex
  flagship track, with the universal core kept platform-neutral.
- **French practice loop** (book/french-practice-loop-EN.md and five
  translations): six copy-ready messages for a typed four-turn French café or
  hotel exchange, mirroring the Spanish loop.
- **Language Partner Skill** (prysai-language-partner): one bounded typed
  exchange in the learner's target language, learner-first turns, one
  meaning-blocking correction, and a changed case.
- **Interview Rehearsal Skill** (prysai-interview-rehearsal): one observable
  timed answer with a visible check, one material gap, and one changed
  question.
- **Six-language site UI**: complete Spanish, Japanese, Korean, and German
  interface dictionaries (506 keys each), six-language learning-path data,
  chapter/lab/part titles, and localized chapter navigation footers; no route
  uses an English UI fallback anymore.
- Request Escalation, an original candidate Skill and beginner reader card
  that separates supplied-text drafting, one bounded current fact, multi-source
  research, and a proposed external change before substantive work begins.
- An isolated, explicit mixed-request forward-test record for the new Skill.
  It checks only the fixed routing receipt; it is not learner, runtime,
  automatic-trigger, source-validity, authorization, or completion evidence.
- A source-bounded modality record and reader-facing receipt that distinguish a
  typed language rehearsal from spoken conversation, listening, pronunciation,
  or independently valid feedback.
- LLM Comparison Protocol, an original candidate Skill for planning one fair,
  fixed-condition comparison between two models, providers, or workflows. It
  uses an offline three-task smoke fixture with frozen inputs and an explicit
  `not_comparable` path; it records no model result and does not rank products.
- Platform Fact Watch, an original candidate Skill that maps a possibly stale
  named-platform claim to affected teaching surfaces and safe interim wording.
  It does not browse, run a product, prove current behavior, or admit an
  adapter.

### Changed

- The public Skill index now contains 19 original candidate Skills and gives
  an unsure beginner a first, non-executing route instead of assuming they
  already know the correct method.
- The local-only First Win pilot package now rejects a moderator/scorer alias
  collision, so a package cannot present one person as two independent scorers.
- Local-link checks now exclude only transient Pages staging and rollback
  directories, so a concurrent artifact build cannot create false link failures.
- The Spanish practice route and Lab 018 now name their text-only modality,
  so a typed success cannot be mistaken for spoken-language evidence.
- The local input-archive audit now takes an explicit directory from
  `--archive-dir` or `PRYSAI_INPUT_ARCHIVE_DIR`; its portable-resolution
  fixtures and the three-task smoke fixture are part of the release-evidence
  gate.

## 0.1.0-candidate.1 — 2026-08-14

### Added

- A book-shaped, English-canonical LLM collaboration curriculum with 22
  candidate chapters, 18 draft Labs, a static reader, and 16 original
  candidate Skills.
- Evidence, permission, source, license, recovery, and status boundaries that
  distinguish structural validation from learner, model, release, and
  community evidence.
- A commit-bound, local-only First Win pilot kit for an authorized future
  instrument-debugging round; it does not recruit participants or record a
  learner result.

### Changed

- The first public route now separates the recommended local Codex path from
  optional text-only practice, with fictional ready-to-copy prompt cards and
  visible data-minimization guidance.
- The homepage now renders the first-turn prompt contract as six localized,
  readable fields instead of a dense image preview; the contract remains a
  candidate teaching aid, not a safety or learning guarantee.
- Local source-archive audit and discovery scripts now require
  `--archive-dir` or `PRYSAI_INPUT_ARCHIVE_DIR`; source review no longer
  implies one maintainer's historical drive path when no input location is
  supplied.

### Verified for this candidate

- Repository structural and content-contract validators are available in
  `AGENTS.md`; their pass state is scoped to the recorded candidate commit and
  does not establish learning effectiveness or release readiness.

### Still not established

- No learner Lab runs, transfer evidence, or independently reviewed pilot
  results.
- No scored evaluation-fixture executions, release tag, reviewed release
  packet, rollback rehearsal, public deployment, or community adoption.
