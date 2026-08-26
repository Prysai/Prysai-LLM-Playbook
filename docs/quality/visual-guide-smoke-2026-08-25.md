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
| Focused visual smoke | passed | 8 locale routes; 20 boards; dynamic route, goal, journey, capability, maturity, concept, evidence, receipt, reading-loop, action-boundary, and triage nodes |
| Lab 003 Reader visual smoke | passed | 8 locale routes; localized heading, experiment-record board, alternative text, text explanation, evidence boundary, related visuals, and 390px overflow check |
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
