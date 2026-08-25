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
| Focused visual smoke | passed | 8 locale routes; 19 boards; dynamic route, goal, journey, capability, maturity, concept, evidence, receipt, reading-loop, action-boundary, and triage nodes |
| Responsive visual viewer | passed | Approved board links use the project viewer with localized labels, zoom controls, raw-SVG escape hatch, and rejected-asset error state |
| Reader visual action note | passed | Localized `look first / do next / keep / do not infer` strip rendered in English, Simplified Chinese, Spanish, Japanese, Korean, German, Traditional Chinese, and French |
| Mobile overflow | passed | 390px and 360px visual guide viewports |
| Reader mobile visual render | passed | Traditional Chinese Reader at 390px; visual action note stacks without horizontal overflow |
| No-script fallback | passed | English ordered text fallbacks for every interactive visual route |
| Repository validators | passed | project, structure, content completeness, learning contract, and site i18n |
| Regression suite | passed | `script_tests=48 passed=49 failed=0` |
| Full browser smoke | not established | the broader `scripts/browser_smoke.mjs` exceeded its 240-second guard during this run; no pass claim is made |

The focused command is intentionally narrower than the full browser smoke. It
is a fast regression signal for the visual guide and viewer. The Reader action
note and Traditional Chinese mobile render were also checked with a local
Playwright run. These checks are not a substitute for the broader Reader,
homepage, deployment, or learner checks.
