# Product Context → Real Estate Landing Page

This is a disposable, local teaching sandbox for the Field Guide's
`prysai-product-context` Skill.

It demonstrates a narrow chain:

```text
synthetic brief → context draft → static page → browser screenshot
```

The page is an implementation exercise, not a real estate listing, a client
deliverable, a market study, or a live lead-generation surface. Every property
detail is synthetic and visibly labelled as an example. There is no analytics,
lead capture, external image, web font, CDN, API, or account connection.

## Run locally

From the repository root, start a static server:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py -m http.server 4174
```

Open:

```text
http://127.0.0.1:4174/examples/skill-sandbox/product-context-real-estate/
```

## What to inspect

- [`brief.md`](brief.md) is the supplied, fictional input.
- [`context-draft.md`](context-draft.md) is the non-authoritative Product Context output.
- [`index.html`](index.html) and [`styles.css`](styles.css) are the downstream static artifact.
- [`../../../docs/research/skill-case-product-context-real-estate-2026-08-11.md`](../../../docs/research/skill-case-product-context-real-estate-2026-08-11.md) records evidence, limits, and screenshot scope.

The context draft does not authorize publication or a canonical product-context
write. It is intentionally a candidate teaching artifact.
