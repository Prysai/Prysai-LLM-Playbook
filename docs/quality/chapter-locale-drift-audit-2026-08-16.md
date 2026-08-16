<!-- content_id: chapter-locale-drift-audit-2026-08-16 | kind: quality-record | status: candidate | owner: curriculum-maintainer | reviewed: 2026-08-16 -->

# Chapter-locale drift audit (2026-08-16)

**Status:** `candidate` · **Method:** per-chapter H2 (##) heading comparison between the
English source and the five localized chapter files. This audit counts section
structure only; it does not measure translation quality, sentence-level
fidelity, learner outcomes, or release readiness.

## Why this audit exists

Readers reported that localized chapters feel inconsistent: switching language
can change which sections a chapter contains, and some openers follow an older
revision of the English source. This record makes every known structural
difference visible so translation work is planned from a single list instead of
being discovered reader by reader.

## Summary

- Chapter 1 received the missing beginner `Start here` + `Where the familiar
  names fit` sections in JA / KO / ES / DE on 2026-08-16 (commits a828ed1,
  d3f4913, 565fddf, fac572b); ZH already had the equivalent opener.
- Chapters 6, 8, 9, 10, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22 still show
  structural drift and need a per-chapter realignment pass.
- Chapter 15 shows the inverse drift: ZH/ES/JA/KO/DE carry 12-14 sections
  while EN has 9; the English source was slimmed after the translations were
  produced, so localizations preserved sections the current EN no longer has.

## Per-chapter structural comparison

H2 heading counts per locale, with the difference against the English source:

### 01 · gpt-and-codex

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 16 | 0 | aligned |
| ZH | 17 | +1 | +1 extra sections |
| ES | 18 | +2 | +2 extra sections |
| JA | 18 | +2 | +2 extra sections |
| KO | 18 | +2 | +2 extra sections |
| DE | 18 | +2 | +2 extra sections |

### 02 · first-safe-task

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 14 | 0 | aligned |
| ZH | 15 | +1 | +1 extra sections |
| ES | 15 | +1 | +1 extra sections |
| JA | 15 | +1 | +1 extra sections |
| KO | 15 | +1 | +1 extra sections |
| DE | 15 | +1 | +1 extra sections |

### 03 · task-protocol

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 16 | 0 | aligned |
| ZH | 16 | 0 | aligned |
| ES | 16 | 0 | aligned |
| JA | 16 | 0 | aligned |
| KO | 16 | 0 | aligned |
| DE | 16 | 0 | aligned |

### 04 · context-permissions-and-agent

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 13 | 0 | aligned |
| ZH | 13 | 0 | aligned |
| ES | 13 | 0 | aligned |
| JA | 13 | 0 | aligned |
| KO | 13 | 0 | aligned |
| DE | 13 | 0 | aligned |

### 05 · choose-the-codex-surface

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 15 | 0 | aligned |
| ZH | 15 | 0 | aligned |
| ES | 15 | 0 | aligned |
| JA | 15 | 0 | aligned |
| KO | 15 | 0 | aligned |
| DE | 11 | -4 | -4 missing sections |

### 06 · model-selection

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 13 | 0 | aligned |
| ZH | 13 | 0 | aligned |
| ES | 9 | -4 | -4 missing sections |
| JA | 9 | -4 | -4 missing sections |
| KO | 9 | -4 | -4 missing sections |
| DE | 9 | -4 | -4 missing sections |

### 07 · skills-plugins-and-tools

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 14 | 0 | aligned |
| ZH | 14 | 0 | aligned |
| ES | 14 | 0 | aligned |
| JA | 14 | 0 | aligned |
| KO | 14 | 0 | aligned |
| DE | 13 | -1 | -1 missing sections |

### 08 · full-lifecycle-workflow

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 17 | 0 | aligned |
| ZH | 18 | +1 | +1 extra sections |
| ES | 12 | -5 | -5 missing sections |
| JA | 14 | -3 | -3 missing sections |
| KO | 12 | -5 | -5 missing sections |
| DE | 10 | -7 | -7 missing sections |

### 09 · verification-and-recovery

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 13 | 0 | aligned |
| ZH | 13 | 0 | aligned |
| ES | 7 | -6 | -6 missing sections |
| JA | 13 | 0 | aligned |
| KO | 13 | 0 | aligned |
| DE | 7 | -6 | -6 missing sections |

### 10 · planning-and-slicing

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 15 | 0 | aligned |
| ZH | 15 | 0 | aligned |
| ES | 10 | -5 | -5 missing sections |
| JA | 14 | -1 | -1 missing sections |
| KO | 14 | -1 | -1 missing sections |
| DE | 9 | -6 | -6 missing sections |

### 11 · designing-a-skill

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 19 | 0 | aligned |
| ZH | 20 | +1 | +1 extra sections |
| ES | 14 | -5 | -5 missing sections |
| JA | 15 | -4 | -4 missing sections |
| KO | 15 | -4 | -4 missing sections |
| DE | 14 | -5 | -5 missing sections |

### 12 · agent-loop-and-stop

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 24 | 0 | aligned |
| ZH | 15 | -9 | -9 missing sections |
| ES | 10 | -14 | -14 missing sections |
| JA | 17 | -7 | -7 missing sections |
| KO | 18 | -6 | -6 missing sections |
| DE | 11 | -13 | -13 missing sections |

### 13 · action-boundaries

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 16 | 0 | aligned |
| ZH | 10 | -6 | -6 missing sections |
| ES | 10 | -6 | -6 missing sections |
| JA | 10 | -6 | -6 missing sections |
| KO | 10 | -6 | -6 missing sections |
| DE | 10 | -6 | -6 missing sections |

### 14 · discover-and-audit-skills

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 11 | 0 | aligned |
| ZH | 13 | +2 | +2 extra sections |
| ES | 10 | -1 | -1 missing sections |
| JA | 10 | -1 | -1 missing sections |
| KO | 10 | -1 | -1 missing sections |
| DE | 10 | -1 | -1 missing sections |

### 15 · research-track

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 9 | 0 | aligned |
| ZH | 14 | +5 | +5 extra sections |
| ES | 12 | +3 | +3 extra sections |
| JA | 12 | +3 | +3 extra sections |
| KO | 12 | +3 | +3 extra sections |
| DE | 12 | +3 | +3 extra sections |

### 16 · engineering-track

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 9 | 0 | aligned |
| ZH | 10 | +1 | +1 extra sections |
| ES | 9 | 0 | aligned |
| JA | 9 | 0 | aligned |
| KO | 9 | 0 | aligned |
| DE | 9 | 0 | aligned |

### 17 · marketing-track

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 10 | 0 | aligned |
| ZH | 7 | -3 | -3 missing sections |
| ES | 7 | -3 | -3 missing sections |
| JA | 7 | -3 | -3 missing sections |
| KO | 7 | -3 | -3 missing sections |
| DE | 7 | -3 | -3 missing sections |

### 18 · content-design-data-automation

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 11 | 0 | aligned |
| ZH | 7 | -4 | -4 missing sections |
| ES | 8 | -3 | -3 missing sections |
| JA | 8 | -3 | -3 missing sections |
| KO | 8 | -3 | -3 missing sections |
| DE | 8 | -3 | -3 missing sections |

### 19 · evaluate-models-and-workflows

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 14 | 0 | aligned |
| ZH | 8 | -6 | -6 missing sections |
| ES | 9 | -5 | -5 missing sections |
| JA | 9 | -5 | -5 missing sections |
| KO | 9 | -5 | -5 missing sections |
| DE | 9 | -5 | -5 missing sections |

### 20 · personal-codex-work-system

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 11 | 0 | aligned |
| ZH | 7 | -4 | -4 missing sections |
| ES | 9 | -2 | -2 missing sections |
| JA | 9 | -2 | -2 missing sections |
| KO | 9 | -2 | -2 missing sections |
| DE | 9 | -2 | -2 missing sections |

### 21 · team-capability-system

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 11 | 0 | aligned |
| ZH | 5 | -6 | -6 missing sections |
| ES | 9 | -2 | -2 missing sections |
| JA | 9 | -2 | -2 missing sections |
| KO | 9 | -2 | -2 missing sections |
| DE | 9 | -2 | -2 missing sections |

### 22 · continuous-update-and-future-proofing

| Locale | H2 count | vs EN | Structural notes |
|---|---|---|---|
| EN | 11 | 0 | aligned |
| ZH | 6 | -5 | -5 missing sections |
| ES | 9 | -2 | -2 missing sections |
| JA | 9 | -2 | -2 missing sections |
| KO | 9 | -2 | -2 missing sections |
| DE | 9 | -2 | -2 missing sections |

## Repair plan (priority order)

1. **Chapter 1** — done 2026-08-16 (beginner opener aligned in all six locales).
2. **Chapter 21 (ZH)** — realigned 2026-08-16 (commit 7c03720); 11/11 H2 sections match the English source.
2. **Chapters 6, 13, 17-22** — re-translate the missing EN sections into
   ZH/ES/JA/KO/DE (these locales predate recent English expansions).
3. **Chapters 8-12** — reconcile section order; decide whether EN gained or
   the translation lost sections, then realign once from the English source.
4. **Chapter 15** — decide which extra localized sections are still wanted;
   either fold the best ones back into EN or trim the localizations.
5. Re-run this audit after every realignment; keep the table updated so the
   record always reflects the current state.

## Boundary

This audit does not claim that aligned heading counts mean aligned content:
sentence-level fidelity still needs independent language review per file. It
also does not imply that the English source is always the better text; where a
localization preserved material the current EN dropped, the decision is
recorded per chapter in step 4 above.
