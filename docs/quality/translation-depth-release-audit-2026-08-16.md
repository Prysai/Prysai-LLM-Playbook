# Translation-depth release audit — 2026-08-16

**Status:** structural audit; translation review not performed

## Question

Can the repository accurately describe six complete language routes as a
finished multilingual release?

## Method

Ran the tracked command below against the locale matrix and the 22 chapters
plus 18 Labs:

```powershell
& $py scripts\audit_translation_depth.py --verbose
```

The audit compares rendered-text character counts and section-heading counts
to the English source. It is an attention signal only. It does not assess
meaning, terminology, cultural suitability, accessibility, learner outcomes,
or independent language review.

## Result

- All six routes contain **40 / 40** locally addressable chapter-and-Lab
  files, and same-locale path checks pass.
- The depth audit examined 200 non-English chapter/Lab pairs and flagged
  **51** attention items using its declared short-text or missing-heading
  thresholds.
- The most severe character-ratio signals include Chapter 15 in Simplified
  Chinese (0.13), Chapter 13 in Simplified Chinese (0.18), and Chapter 11 in
  Korean (0.19). These are triage signals, not verdicts on individual
  translators or languages.

## Decision

Keep all six language routes selectable and same-locale. Change the
repository-level locale state from `release` to `migration` until each
translation has an independent language review and the attention list is
resolved, intentionally accepted with a documented scope reduction, or
replaced.

The language menu must describe non-English coverage as local route files,
not as a completed translation. File presence is useful navigation evidence;
it is not language-quality evidence.

## Repair order

1. Independently review the first reader path (Lesson 0; Chapters 1–3; Labs
   001, 002, and 011) in each of the five translated locales.
2. Repair or explicitly scope the highest-risk Chapter 11, 13, and 15 entries
   before promoting their locale status.
3. Re-run the depth audit, same-locale link audit, and a native-reader review
   after every affected source revision.
4. Do not change a locale to `verified` merely because its file count or a
   static validator passes.

## Limits

This record does not establish that any translation is wrong, that a native
reader will struggle, or that the English source is itself complete. It
records why the current evidence is insufficient to market the repository as
fully reviewed multilingual content.
