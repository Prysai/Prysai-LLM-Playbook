# Changelog

This file records curated candidate changes for reviewers and future release
work. It is not a GitHub Release, an immutable tag, or evidence that the
Playbook is ready for public production use.

## Unreleased

### README and entry-point clarity (2026-08-27)

- Refreshed the GitHub front door with a short, dated explanation of the
  foundation-first route, the public visual evidence map, and the explicit
  eight-locale status boundary. These changes improve discovery and navigation;
  they do not establish learner outcomes, translation fluency, deployment
  readiness, or a release.

### Validation reliability (2026-08-26)

- Fixed Windows test discovery to run locale validators with UTF-8 output, and
  aligned the Spanish optional-practice boundary check with the natural plural
  wording used by the reader entries. `npm test` now completes with 49/49
  checks passing on this worktree.

### French locale candidate (2026-08-21)

- Added the eighth registered interface and course route: French (`fr`). The 22 chapters and 18 Labs now have same-locale candidate files and routes.
- French copy remains `in-progress`: independent native-language review, learner runs, transfer evidence, and production deployment are not established.

### Visual route candidate (2026-08-24)

- Mobile fallback lists now start collapsed on the Visual Guide so the
  interactive explanation remains the primary reading surface on narrow
  screens. The full ordered text remains available on demand, and the visual
  smoke test asserts both the fallback item counts and the collapsed default.

- Added a focused `npm run test:visuals` smoke check for the standalone guide.
  It verifies all eight locale routes, the 20-board inventory, interactive
  maturity navigation, 390/360px overflow boundaries, and no-JavaScript text
  fallbacks. The check passed on 2026-08-25; it is implementation evidence
  only and does not replace the broader browser smoke or learner validation.

- Added a standalone eight-locale Visual Guide with a six-stage interactive
  mind map, twenty project-authored teaching boards, localized captions and
  alternatives, and a text-first route that remains usable without JavaScript.
  The route is linked from the homepage and Reader in the selected locale;
  browser checks cover the eight language paths, image inventory, keyboard
  selection, mobile reflow, and the no-script text fallback. These checks are
  implementation evidence only, not proof of comprehension, accessibility
  conformance, learner transfer, or release readiness.

- Added the project-authored `experiment-record-anatomy-red-black.svg` board
  to Lab 003, the Lab 001/003 Reader visual sequence, and the Visual Guide.
  Its six-part record moves from question to safe fixture, actual run,
  observation, acceptance check, and explicit boundary; localized captions,
  alternatives, next questions, and evidence limits remain the reader-facing
  explanation around the source-language artwork.

- Added the whole-Playbook route map to the Reader. It connects the
  Foundation Core, first bounded task, evidence loop, and optional tracks with
  localized stage labels, route links, a text equivalent, and the original
  learning-journey board.
- The map is progressive enhancement: the ordered text route remains the
  baseline, while the interactive stage selection adds orientation. Responsive
  checks cover desktop and 390px mobile layouts across all eight Reader
  locales; this is implementation evidence, not learner, accessibility,
  translation-quality, or release evidence.

- Added selected-section detail panels to the Reader concept maps. Selecting a
  heading now exposes a localized summary, the next section, and a direct
  in-page link; the inline map and side map share the same text-first behavior.
  This is navigation and orientation evidence only, not proof that a reader
  understood or completed the section.


### Changed

- **Post-publish public consistency check.** The Docs deployment now compares
  the public discovery files, eight static locale entries, and route-critical
  Reader assets with the exact Pages artifact after publication. A bounded
  propagation window fails the deployment when the public host still serves
  stale or fallback bytes; this is deployment-integrity evidence, not proof of
  translation quality, learning outcomes, or release readiness.

- **Open licenses adopted.** Project-owned content (curriculum, diagrams,
  teaching assets, Skill instructions) moves from CC BY-NC 4.0 to **CC BY 4.0**,
  and scripts/tooling move to **Apache-2.0** (new `LICENSE-CODE`). Reuse,
  adaptation, and commercial use are now allowed with attribution; the Prysai
  name and logos stay project-owned, and third-party assets keep their own
  licenses. All historical commits are by the project owner, so no external
  relicense permission was needed.

### Added

- **LLM Foundation Core v1 (candidate).** A five-unit, platform-neutral route
  now teaches the observable sequence `explain -> initiate -> identify ->
  repair -> transfer` with fictional offline tasks, retained receipts,
  explicit stop boundaries, and no claim of learner or model performance.
- **Lesson 0: What Is a Large Language Model** (book/guides/llm-fundamentals-EN.md + seven translations): the textbook opener that explains tokens, context windows, capabilities, and limits before any product talk.
- **Textbook reading path**: the homepage hero, the compact README, and the English README now lead with one ordered path (Lesson 0 -> Chapter 1 -> Chapter 2 -> ... -> Chapter 22) instead of a menu of choices; practice cards and language loops are exercises reached after the foundation.
- **Goal wizard** (site/goal-templates.js + app.js): an eight-language interactive tool that turns a picked goal into a ready-to-copy prompt; positioned as a practice tool, not the entry point.
- **Six-platform adapter guide** (book/routes/platform-adapter-guide-EN.md and
  seven translations): a safe first task and a visible difference list for
  ChatGPT, Claude / Claude Code, Gemini, DeepSeek, Grok, and the Codex
  flagship track, with the universal core kept platform-neutral.
- **French practice loop** (book/french-practice-loop-EN.md and seven
  translations): six copy-ready messages for a typed four-turn French café or
  hotel exchange, mirroring the Spanish loop.
- **Language Partner Skill** (prysai-language-partner): one bounded typed
  exchange in the learner's target language, learner-first turns, one
  meaning-blocking correction, and a changed case.
- **Interview Rehearsal Skill** (prysai-interview-rehearsal): one observable
  timed answer with a visible check, one material gap, and one changed
  question.
- **Eight-language site UI**: complete Spanish, Japanese, Korean, German,
  Traditional Chinese, and French interface dictionaries, eight-language learning-path data,
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
- The homepage now renders the first-turn prompt contract as eight localized,
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
