# Governance contracts

These files are the machine-readable and operational contracts that keep the
book, site, translations, status, and maintenance records aligned.

## Start with the contract you are changing

| Change | Canonical file | Projection or check |
|---|---|---|
| Add or reorder a chapter | [`book-navigation.yaml`](book-navigation.yaml) | Chapter footers and TOCs |
| Change a locale identity or translation state | [`locale-matrix.yaml`](locale-matrix.yaml) | Localized links and migration checks |
| Change which chapters/labs can be routed by the public site | [`content-status.yaml`](content-status.yaml) | Regenerate [`site/locale-manifest.js`](../../site/locale-manifest.js) |
| Change a learning level | [`learning-path.yaml`](learning-path.yaml) | Site data and learning-path validator |
| Change an artifact's maturity | [`content-status.yaml`](content-status.yaml) | Status indexes and status validator |
| Change a defect, resolution, or release blocker | [`quality-register.yaml`](quality-register.yaml) | Generated quality ledger and maturity-claim gate |
| Change release evidence dimensions, blind spots, version, or rollback metadata | [`release-evidence.yaml`](release-evidence.yaml) | Commit-bound CI evidence packet |
| Change a volatile fact's consumers | [`fact-impact-registry.yaml`](fact-impact-registry.yaml) | Affected-content review |
| Change authoritative URL audit scope or rollout policy | [`external-url-audit.yaml`](external-url-audit.yaml) | Scheduled categorized reachability report |
| Record a recurring maintenance update | [`update-registry.yaml`](update-registry.yaml) | Update map and release review |
| Change ownership or contribution flow | [`contribution-model.md`](contribution-model.md) | Contributor-facing guidance |

The [project structure contract](project-structure.yaml) maps this directory
and identifies which files feed generated surfaces. Keep JSON-compatible YAML
valid so the repository's standard-library checks can parse it.

## Edit order

Change the canonical contract first, update its human-facing projection, run
the focused validator, then run the full project checks. A generated file is a
result, not a second source of truth.
