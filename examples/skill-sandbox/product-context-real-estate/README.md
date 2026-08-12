# Product Context → first-time buyer guide

This disposable local sandbox demonstrates a bounded chain for the Field
Guide's `prysai-product-context` Skill:

```text
synthetic brief → context draft → design handoff → static buyer guide → browser screenshots
```

The artifact is not a real-estate listing, client deliverable, market study,
advice service, or lead-generation surface. It contains no live inventory,
person, customer quote, market statistic, analytics, form, external image, web
font, CDN, API, or account connection.

The first implementation was rejected during visual review because it used a
lifestyle slogan, oversized editorial serif type, earth tones, a decorative
house illustration, and a fictional listing card. Those choices made the page
look like a generic AI-generated concept. The remediation changed both the
Skill contract and the artifact: when real evidence and assets are absent, the
downstream output must provide useful decision support instead of invented
atmosphere.

## Run locally

From the repository root:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py -m http.server 4182
```

Open:

```text
http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/
```

## What to inspect

- [`brief.md`](brief.md) is the supplied fictional input.
- [`context-draft.md`](context-draft.md) is the non-authoritative Product Context
  output, including the design handoff and rejected-pattern record.
- [`index.html`](index.html) and [`styles.css`](styles.css) form the downstream guide.
- [`scripts/capture_case_screenshots.mjs`](../../../scripts/capture_case_screenshots.mjs)
  reproduces the Edge screenshots using the bundled workspace runtime.
- Desktop and mobile captures are listed in
  [`assets/cases/`](../../../assets/cases/README.md).
- The [case record](../../../docs/research/skill-case-product-context-real-estate-2026-08-11.md)
  states the evidence and non-claims.

The context draft does not authorize publication or a canonical product-context
write. This remains a `candidate` teaching artifact.
