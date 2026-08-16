# Product Context → first-time buyer guide

This disposable local sandbox demonstrates a bounded chain for the
`prysai-product-context` Skill:

```text
synthetic brief → context draft → design handoff → static buyer guide → browser screenshots
```

It is not a real-estate listing, client deliverable, market study, advice
service, or lead-generation page. It has no live inventory, people, customer
quotes, market statistics, analytics, form, external image, web font, CDN,
API, or account connection.

An early version was rejected in visual review because it used generic
lifestyle decoration and a fictional listing card. The replacement rule is
practical: without real evidence or assets, give useful decision support rather
than inventing atmosphere.

## Run locally

From the repository root:

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

Open `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`.

## Inspect

- `brief.md`: fictional input.
- `context-draft.md`: non-authoritative context output, handoff, and rejected-pattern record.
- `index.html` and `styles.css`: downstream guide.
- `scripts/capture_case_screenshots.mjs`: reproducible Edge screenshots.
- `assets/cases/` and the linked case record: evidence and non-claims.

The context draft does not authorize publication or a canonical product-context
write. This remains a `candidate` teaching artifact.
