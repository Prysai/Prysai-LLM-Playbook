# Scripts

`scripts/` contains repeatable checks, generators, and catalog builders. They
turn project rules into evidence that can be rerun locally and in CI.

## Common commands

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_project.py
& $py scripts\validate_project_structure.py
& $py scripts\validate_content_completeness.py
& $py scripts\validate_learning_contract.py --canonical-en
& $py scripts\build_quality_register.py --check
& $py scripts\build_release_evidence.py --check
& $py scripts\validate_gold_content_admission.py
& $py scripts\test_gold_content_admission.py
& $py scripts\validate_communication_clinic_candidate.py
& $py scripts\validate_learning_practice_candidate.py
& $py scripts\validate_executable_examples.py
& $py scripts\test_executable_examples.py
& $py scripts\test_lab_013_reference.py
& $py scripts\check_local_links.py
& $py scripts\validate_localization.py
& $py scripts\build_book_navigation.py --check
& $py scripts\test_book_navigation_titles.py
& $py scripts\validate_core_unit_map.py
& $py scripts\test_core_unit_map.py
& $py scripts\build_learning_path_site.py --check
& $py scripts\build_site_locale_manifest.py --check
& $py scripts\build_site_search_index.py --check
& $py scripts\build_pages_artifact.py --check
```

## Generator rule

If a generated file is wrong, fix the contract or source record named in
[`docs/governance/project-structure.yaml`](../docs/governance/project-structure.yaml)
and regenerate it. Do not hand-edit a generated block to hide a stale source.

A green script proves only the checks that script performs. It is not by itself
runtime, browser, translation, or learning-outcome evidence.

`validate_core_unit_map.py` checks that each transferable method has one
canonical owner range, stable anchors, explicit exclusions, valid consumers,
and no named-product fact inside that range. The route is a compact projection;
passing does not prove cross-platform behavior or learner transfer.

`test_book_navigation_titles.py` protects the distinction between canonical
chapter titles and compact navigation labels. It does not prove that every
downstream title consumer has been generated or visually reviewed.

`validate_content_completeness.py` is the narrow cross-file identity gate. It
checks that the 22 canonical chapters, 17 lab records, locale matrix, chapter
order, reader entries, and generated site outputs agree. Its migration warnings
identify lab sources that are still intentionally unsuffixed; they are not
claims that those labs have been translated or run.

Use `validate_learning_contract.py --canonical-en` to inspect only the
English sources currently declared by the locale matrix. The full command
still audits legacy, English, and translated files together for migration
compatibility; neither mode proves runtime execution or reader comprehension.

`build_pages_artifact.py` is the release-boundary check for GitHub Pages. It
copies only the public showcase and declared reader-facing directories into an
isolated artifact, adds the project-root entry, and rejects local work folders.
It does not prove that GitHub Pages is enabled or that the deployed URL is
reachable.

`build_site_search_index.py` generates the dependency-free browser search index
from canonical content identities and Markdown sources. It deduplicates
language variants, records explicit fallback state, and must pass `--check`
before a Pages artifact is considered complete.

`build_quality_register.py` validates stable defect IDs, controlled severity
and status values, item owners, lifecycle/review dates, supersession links,
evidence paths, and resolution records. Its `--check` mode
also rejects a stale Markdown projection and prevents `verified` or
`production-ready` maturity from contradicting active release blockers. A
green result proves claim/register consistency, not defect resolution.

`build_release_evidence.py --check` validates the stable release-evidence
contract. A full invocation requires an exact 40-character candidate SHA, runs
the named gate matrix, preserves one log per command, and writes JSON and
Markdown packets to a temporary output directory. CI uploads that directory
even on failure. The packet is evidence for one commit and runner, not a
promotion of content maturity or proof of runtime/user outcomes.

`test_release_evidence.py` keeps the release gate honest with negative and
boundary fixtures. It proves duplicate commands are rejected, command failure
is logged and blocks the packet, overdue or invalid freshness blocks stronger
maturity, and static success does not promote a `candidate`.

`validate_gold_content_admission.py` validates the editorial intake contract
and any checked-in admission records. A proposed unit must satisfy its content
family fields, pass all eight hard gates, score at least 24/32 with no zero,
and declare what its evidence cannot prove. `test_gold_content_admission.py`
uses a valid lab record and negative fixtures for duplicate advice, subjective
acceptance, missing evidence limits, empty platform deltas, and a below-threshold
score. These checks establish admission-policy consistency, not runtime or
learning effectiveness.

`validate_communication_clinic_candidate.py` checks the isolated, synthetic
three-condition communication experiment before any model run. It preserves
the candidate as `not_run`, outside the canonical Lab and evaluation counts,
and checks fixed inputs, context-channel equality, repetition controls,
acceptance IDs, evidence IDs, telemetry nullability, and the secret/network
boundary. Passing it is plan integrity, not evidence that one request style is
better.

`validate_learning_practice_candidate.py` checks the platform-neutral learning
guide, language-transfer Lab, Learning Coach receipt fields, fixed candidate
fixture, and public route. It is a static contract gate; it does not run a
model or learner and cannot prove acquisition, retention, or transfer.

`validate_executable_examples.py` enforces typed example claims rather than
treating every code fence as executable. The first registered record is Lab
013 v1: `parsed`, `executed`, and `asserted`, with a deterministic failed check,
bounded recovery, cleanup, and four negative packet fixtures. It remains
explicitly outside `human_reviewed` learner evidence.

`validate_github_templates.py` checks the public contributor entry forms and
pull-request template for parseable YAML, required fields, unique component
IDs, required confirmations, repository-local contact links, and the disclosure
headings that preserve source, safety, evidence, unknowns, and status claims.

`audit_external_urls.py` derives deduplicated authoritative URLs from the
fact-impact registry, enforces an HTTPS host allowlist before redirects, uses
bounded HEAD/GET requests, and writes categorized JSON/Markdown observations.
Its initial `report_only` policy does not turn transient third-party failures
into random PR failures. `test_external_url_audit.py` covers classification,
deduplication, claim mapping, insecure schemes, and redirect escape attempts.
