<!-- content_id: visual-guide-smoke-2026-08-25 | kind: quality-record | status: candidate | owner: site-maintainer | reviewed: 2026-08-25 -->

# Visual Guide smoke record — 2026-08-25

This record captures implementation checks for the standalone visual guide at
the local candidate artifact. It does not establish translation quality,
accessibility conformance, learner comprehension, transfer, or release
readiness.

## Reproduction

```text
python -X utf8 scripts/build_pages_artifact.py --output _site
npm run test:visuals
npm run test:reader-visuals
python -X utf8 scripts/validate_project.py
python -X utf8 scripts/validate_project_structure.py
python -X utf8 scripts/validate_content_completeness.py
python -X utf8 scripts/validate_learning_contract.py --canonical-en
python -X utf8 scripts/validate_site_i18n.py
python -X utf8 scripts/run_tests.py
```

## Observed result

| Check | Result | Scope |
| --- | --- | --- |
| Candidate Pages build | passed | `_site/` generated from the current source tree |
| Focused visual smoke | passed | 8 locale routes; 22 boards; dynamic route, goal, journey, capability, maturity, concept, evidence, receipt, reading-loop, action-boundary, and triage nodes |
| Reader visual smoke | passed | 8 locale routes for Lab 001, Lab 003, Chapter 11, and Chapter 15; localized headings/theses, Skill-boundary and experiment boards, alternative text, text explanations, evidence boundaries, related visuals, and 390px overflow checks |
| Responsive visual viewer | passed | Approved board links use the project viewer with localized labels, zoom controls, raw-SVG escape hatch, and rejected-asset error state |
| Reader visual action note | passed | Localized `look first / do next / keep / do not infer` strip rendered in English, Simplified Chinese, Spanish, Japanese, Korean, German, Traditional Chinese, and French |
| Mobile overflow | passed | 390px and 360px visual guide viewports |
| Reader mobile visual render | passed | Traditional Chinese Reader at 390px; visual action note stacks without horizontal overflow |
| No-script fallback | passed | English ordered text fallbacks for every interactive visual route |
| Repository validators | passed | project, structure, content completeness, learning contract, and site i18n |
| Regression suite | passed | `script_tests=48 passed=49 failed=0` |
| Full browser smoke | historical pass; current rerun timed out | An earlier run recorded exit code 0 after the focused viewer checks. The 2026-08-25 rerun reached the 240-second guard without a new assertion stack, so this remains an open investigation rather than current pass evidence. |

The focused commands are intentionally narrower than the full browser smoke.
They are fast regression signals for the visual guide, viewer, and Lab 003
Reader route. The Reader action note and Traditional Chinese mobile render
were also checked with a local Playwright run. The full browser suite retains a
historical pass record, but its latest rerun timed out and needs a separate
performance investigation before it can be treated as current evidence. None
of these checks substitute for deployment propagation or learner checks.

## Follow-up: additive foundation bridge audit

The homepage's first-task evidence bridge uses a runtime dictionary layer in
`site/app.js`. The static site-i18n validator now audits that layer as well,
including its localized title, body, and alternative text. This closes a
false-negative validation gap without changing the runtime fallback order.

| Check | Result | Scope |
| --- | --- | --- |
| Additive dictionary regression fixtures | passed | `SITE_I18N_TESTS_OK fixtures=10` |
| Site i18n inventory after bridge audit | passed | `html_keys=674 translated_keys=674`, all 8 locales |
| Visual Guide smoke after bridge audit | passed | `VISUAL_GUIDE_SMOKE_OK locales=8 cards=22 mobile=390,360 no_script=1` |
| Reader visual smoke after bridge audit | passed | `READER_VISUAL_SMOKE_OK locales=8 lab=003 first_task_locales=8 research_locales=8 skill_locales=8 chapter=11,15 mobile=390 no_horizontal_overflow=1` |

The bridge board remains a teaching aid. These checks establish dictionary
coverage and rendered-route behavior; they do not establish native-language
quality, learner comprehension, transfer, deployment propagation, or release
readiness.
