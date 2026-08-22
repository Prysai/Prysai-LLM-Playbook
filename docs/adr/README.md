# Architecture decisions

This directory records decisions that are expensive to rediscover: content
identity, navigation, evidence boundaries, generated views, and project
structure.

## How to use it

- Read the relevant ADR before changing a contract it owns.
- Keep the reasoning, alternatives, consequences, and evidence boundary in the
  record.
- Do not delete an old decision when the direction changes; add a new ADR that
  supersedes it.
- An accepted ADR explains the chosen design. It does not prove that every
  implementation or runtime behavior is complete.

Current entry points:

- [ADR-0001: curriculum and lab](0001-atlas-as-curriculum-and-lab.md)
- [ADR-0002: stable and volatile knowledge](0002-separate-stable-and-volatile-knowledge.md)
- [ADR-0003: public repository gate](0003-public-repository-gate.md)
- [ADR-0004: public name candidate](0004-public-name-candidate.md)
- [ADR-0005: one current-state source](0005-single-current-state-source.md)
- [ADR-0006: risk and evidence gates](0006-risk-and-evidence-gates.md)
- [ADR-0007: one learning-path contract](0007-single-learning-path-contract.md)
- [ADR-0008: generated public learning-path data](0008-generated-public-learning-path-data.md)
- [ADR-0009: fact-impact registry](0009-fact-impact-registry.md)
- [ADR-0010: locale-suffixed content](0010-locale-suffixed-content.md)
- [ADR-0011: reading product and field-case layer](0011-reading-product-and-field-case-layer.md)
- [ADR-0012: visual teaching and observable cases](0012-visual-teaching-and-observable-case-layer.md)
- [ADR-0013: one chapter navigation source](0013-single-book-navigation-source.md)
- [ADR-0014: canonical project directory map](0014-canonical-project-directory-map.md)
- [ADR-0015: locale-aware site routing](0015-locale-aware-site-routing.md)
- [ADR-0016: GitHub Pages artifact boundary](0016-github-pages-artifact-boundary.md)
- [ADR-0017: Reader consumes canonical navigation](0017-reader-shell-consumes-canonical-navigation.md)
- [ADR-0018: generated search index](0018-generated-search-index.md)
- [ADR-0019: content integrity gate](0019-content-integrity-gate.md)
- [ADR-0020: machine-readable quality register](0020-machine-readable-quality-register.md)
- [ADR-0021: commit-bound release evidence](0021-commit-bound-release-evidence.md)
- [ADR-0022: staged authoritative URL audit](0022-staged-authoritative-url-audit.md)
- [ADR-0023: static accessibility and artifact integrity](0023-static-accessibility-and-artifact-integrity.md)
- [ADR-0024: Lab-use progression contract](0024-lab-use-progression-contract.md)
- [ADR-0025: universal core, Codex flagship, and platform adapters](0025-universal-core-codex-flagship-and-platform-adapters.md)
- [ADR-0026: machine-readable release readiness](0026-machine-readable-release-readiness.md)
- [ADR-0027: separate reference, learner, and transfer run status](0027-separate-reference-learner-and-transfer-run-status.md)
- [ADR-0028: Page Trust families and Reader projection](0028-page-trust-families-and-reader-projection.md)
- [ADR-0029: canonical Lab catalog navigation](0029-canonical-lab-navigation.md)
- [ADR-0030: lazy search and Chromium smoke gate](0030-lazy-search-and-browser-smoke.md)
- [ADR-0031: generated book title map](0031-generated-book-title-map.md)
- [ADR-0032: distinguish the first local path from the optional warm-up](0032-first-route-priority.md)
- [ADR-0033: reader-facing LLM Field Guide identity](0033-reader-facing-llm-field-guide-identity.md)
- [ADR-0034: Prysai LLM Playbook reader identity](0034-prysai-llm-playbook-reader-identity.md)
- [ADR-0035: rename the remote repository](0035-rename-remote-repository.md)
- [ADR-0036: repository security policy and PR gate](0036-repository-security-policy-and-pr-gate.md)
- [ADR-0037: make the first decision match the reader's actual starting point](0037-first-time-entry-scope-and-observation.md)
- [ADR-0038: prepare condition-blind model-output review packets](0038-condition-blind-model-output-review-packets.md)
- [ADR-0039: bind evaluation prompt hashes to serialized input bytes](0039-bind-evaluation-prompt-hashes-to-serialized-input-bytes.md)
- [ADR-0040: require a clean matching checkout for release evidence](0040-clean-checkout-release-evidence.md)
- [ADR-0041: separate fictional contribution checks from full release evidence](0041-fictional-contribution-fast-check.md)
- [ADR-0042: separate candidate quality from formal release gating](0042-separate-candidate-quality-from-release-gate.md)
- [ADR-0043: expand repository sensitive-information tripwires](0043-expand-repository-sensitive-information-tripwires.md)
- [ADR-0044: bind live host security controls and publishing boundaries](0044-live-host-security-controls-and-publishing-boundaries.md)
- [ADR-0045: deploy only the validated Pages artifact](0045-deploy-only-validated-pages-artifact.md)
- [ADR-0046: constrain Reader source loading and maintain CodeQL v4](0046-reader-source-boundary-and-codeql-v4.md)
- [ADR-0047: record the post-mutation host boundary receipt](0047-post-mutation-host-boundary-receipt.md)
- [ADR-0048: verify the public Docs host after artifact publication](0048-post-publish-public-artifact-check.md)
