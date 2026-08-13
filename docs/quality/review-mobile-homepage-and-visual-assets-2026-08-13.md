# Mobile homepage and visual-asset review — 2026-08-13

**Status:** scoped local browser review
**Artifact status:** `candidate`
**Environment:** local static server, in-app Chromium browser
**Viewports:** 1440 × 1000 and 390 × 844

## Question

Does the public front door remain a usable route chooser on a phone, and do the
current red/black assets communicate evidence rather than generic AI polish?

## Before and after

| Observation | Before | After |
|---|---:|---:|
| 390px document height | 26,595px | 17,077px |
| Horizontal overflow | none | none |
| Open chapter groups on load | 1 | 0 |
| Lab cards expanded on mobile | 17 | 2, plus complete Lab index |
| Skill cards expanded on mobile | 12 | 4, plus complete Skill registry |
| Console warnings or errors | none observed | none observed |

The height fell by 9,518px, about 36%. The result is still long and remains a
candidate. Mobile now treats the page as a route chooser: primary examples stay
expanded, while direct source links preserve discovery of chapters, Labs,
Skills, locale records, field cases, teaching boards, update areas, and Page
Trust families. The desktop view retains all 18 Lab cards and all 12 Skill
cards.

## Reader trust check

The Learning Practice Contract was opened through the local Reader. Its trust
record rendered `draft · universal_core`, next review `2026-09-12`, and the
limitation that no learner run, delayed check, transfer result, or independent
score exists. No horizontal overflow or console error was observed.

## Visual-asset inspection

The 1200 × 630 social card and the real-estate concept case were inspected at
rendered size. They were retained rather than redrawn.

- The social card uses one grid, one accent colour, hard rules, direct type,
  and a five-step method. It contains no stock imagery, gradient, glow, false
  data, or decorative illustration.
- The concept case declares `synthetic organisation` and explicitly withholds
  listing, advice, lead, and customer-evidence claims. Its alternating white and
  near-black sections, decision table, stop rule, and evidence boundary read as
  a designed handoff rather than a fictional product advertisement.
- The full-page case capture remains evidence, not a card thumbnail. The
  existing purpose-cropped thumbnail is the correct promotional derivative.

Creating a new generated illustration would add style variance without adding
information. No image was replaced in this milestone.

## Limits

This review covers one local Chromium environment and two viewports. It does
not establish cross-browser behavior, screen-reader quality, user preference,
public deployment, crawler rendering, or that every reader will judge the
assets as non-AI. The 17,077px mobile height remains a measurable information-
architecture debt; later work should consider separate index pages or real
progressive-disclosure components rather than further hiding content.
