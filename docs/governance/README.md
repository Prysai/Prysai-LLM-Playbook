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
| Propose or admit a chapter, lab, case, adapter, route, or reference unit | [`gold-content-admission.yaml`](gold-content-admission.yaml) | Hard-gate, family-contract, and admission-score validator |
| Change an artifact's maturity | [`content-status.yaml`](content-status.yaml) | Status indexes and status validator |
| Change Skill provenance, public name, maintenance owner, version, review date, or upstream URL | [`skill-registry.yaml`](skill-registry.yaml) | Generate [`docs/skill-registry.md`](../skill-registry.md) and validate every Skill maintenance projection |
| Change the beginner copy-now prompt or its progression route | [`starter-task-contract.yaml`](starter-task-contract.yaml) | README, Chapter 3, and Pages projections plus negative fixtures |
| Change Skill ownership, handoffs, precedence, or core/adapter/playbook routing | [`skill-routing-contract.yaml`](skill-routing-contract.yaml) | Deterministic policy fixtures; does not measure model routing accuracy or assert cross-platform equivalence |
| Change page identity, curriculum scope, platform applicability, source provenance, review window, or reuse boundary | [`page-trust-registry.yaml`](page-trust-registry.yaml) | Complete 22/22 canonical-English schema coverage with typed sources and negative fixtures; public projection still requires a separate reader-design and release decision |
| Change Lab execution evidence | [`content-status.yaml`](content-status.yaml) + [`executable-examples.yaml`](executable-examples.yaml) | Separate maintainer-reference, learner, and transfer projections; legacy `run_status` remains learner-only |
| Change a defect, resolution, or release blocker | [`quality-register.yaml`](quality-register.yaml) | Generated quality ledger and maturity-claim gate |
| Change release evidence dimensions, blind spots, version, or rollback metadata | [`release-evidence.yaml`](release-evidence.yaml) | Commit-bound CI evidence packet |
| Change operational release readiness | [`release-readiness.yaml`](release-readiness.yaml) | Version, changelog, tag, reviewed packet, maintenance, and rollback-rehearsal gate |
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

The gold-content admission contract rejects repetition, prompt folklore,
invented evidence, unclear source/license boundaries, platform pages without a
real platform delta, subjective acceptance, and claims without explicit
limits. Its 24/32 threshold is an editorial intake gate. Passing it does not
promote a unit beyond its separately recorded run, learner, transfer, review,
or release evidence.
