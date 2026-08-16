# Scripts

`scripts/` contains repeatable checks, generators, and catalog builders. They
turn project rules into evidence that can be rerun locally and in CI.

## Common commands

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_project.py
& $py scripts\validate_project_structure.py
& $py scripts\validate_content_completeness.py
& $py scripts\validate_learning_contract.py --canonical-en
& $py scripts\build_quality_register.py --check
& $py scripts\build_release_evidence.py --check
& $py scripts\validate_gold_content_admission.py
& $py scripts\test_gold_content_admission.py
& $py scripts\validate_task_contract_conditions_candidate.py
& $py scripts\validate_learning_practice_candidate.py
& $py scripts\validate_contributed_test_material.py
& $py scripts\test_validate_contributed_test_material.py
& $py scripts\validate_evidence_review_candidate.py
& $py scripts\test_evidence_review_candidate.py
& $py scripts\validate_context_packet_builder_candidate.py
& $py scripts\test_context_packet_builder_candidate.py
& $py scripts\first_win_pilot_kit.py --check
& $py scripts\analyze_shift_handoff_pilot.py --check
& $py scripts\test_analyze_shift_handoff_pilot.py
& $py scripts\build_shift_handoff_run_packets.py --check
& $py scripts\test_build_shift_handoff_run_packets.py
& $py scripts\build_shift_handoff_blind_score_packets.py --check
& $py scripts\test_build_shift_handoff_blind_score_packets.py
& $py scripts\validate_executable_examples.py
& $py scripts\test_executable_examples.py
& $py scripts\test_lab_008_reference.py
& $py scripts\test_lab_013_reference.py
& $py scripts\test_lab_001_first_safe_change_fixture.py
& $py scripts\check_local_links.py
& $py scripts\test_check_local_links.py
& $py scripts\validate_teaching_assets.py
& $py scripts\test_validate_teaching_assets.py
& $py scripts\validate_localization.py
& $py scripts\localize_reader_evidence_links.py --check
& $py scripts\build_book_navigation.py --check
& $py scripts\test_book_navigation_titles.py
& $py scripts\build_book_title_map.py --check
& $py scripts\test_book_title_map.py
& $py scripts\build_lab_navigation.py --check
& $py scripts\validate_lab_navigation.py
& $py scripts\test_lab_navigation.py
& $py scripts\test_reader_lab_navigation.py
& $py scripts\validate_core_unit_map.py
& $py scripts\test_core_unit_map.py
& $py scripts\build_learning_path_site.py --check
& $py scripts\build_site_locale_manifest.py --check
& $py scripts\build_site_search_index.py --check
# Requires Node 20+ and Playwright from `npm ci`.
node scripts/browser_smoke.mjs
& $py scripts\build_pages_artifact.py --check
```

The First Win pilot command validates only the checked-in preparation contract.
An authorized pilot authorizer can generate a separate, ignored local package
only by following the role, privacy, retention, and two-scorer requirements in
the [First Win pilot protocol](../docs/quality/first-win-pilot-protocol-v2.md).
That preparation remains `candidate / not_run` and is not learner evidence.

`build_shift_handoff_run_packets.py --check` validates the exact fictional
baseline and Shift Handoff prompt contract. With an immutable candidate SHA,
seed, and new empty output directory it writes the 18 randomized prompt files
and a hash-bound `manifest.json`; this is input preparation only, not a model
run. `analyze_shift_handoff_pilot.py --check` validates the same offline
fixture and its zero-record template. With authorized, de-identified actual
records and that prepared packet manifest it writes an aggregate JSON, Markdown
report, and SVG in a new directory; with the checked-in template it writes
`not_run`. It rejects synthetic data, missing candidate SHA or packet-manifest
hash, packet/condition mismatches, non-UTC-aware timestamps, condition
deviations, unsafe artifact references, missing records, duplicate records, and
collapsed scorer roles. Its output is a descriptive fixture-level observation
only, never an efficiency, learning, IQ, security, or model-quality claim.

`build_shift_handoff_blind_score_packets.py --check` validates the separate
two-reviewer handoff contract. With a captured-unscored run log, the exact
byte-bound prepared manifest, and a new empty local output directory, it
creates two condition-blind reviewer folders and a maintainer-only condition
key. It verifies all 18 response artifacts and hashes, rejects incomplete or
condition-deviating records, and refuses condition labels or original packet
IDs in reviewer-visible metadata. It does not assign scores, make reviewers
independent, resolve disagreement, call a model, or calculate a benefit.

`check_local_links.py` checks repository Markdown sources and deliberately
skips ignored work roots plus the temporary Pages staging and rollback folders.
The fixture ensures a concurrent artifact build cannot make those transient
copies look like broken source links.

`validate_teaching_assets.py` checks that every project-owned teaching SVG has
an accessible title, description, and view box; is listed in the teaching-card
catalog; has a source-register path; and matches the public mobile inventory
count. It does not establish visual quality, reader comprehension, runtime
behavior, or the provenance of non-teaching assets.

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

`build_book_title_map.py` projects those roles into one generated title map.
It refreshes the compact chapter headings in both tables of contents; the
Reader manifest and generated search index refuse a stale map. The map is an
output of `book-navigation.yaml`, not a second editable title source.

The Lab navigation checks cover all 18 canonical English Lab sources, exact
identity and H1 matching, first/middle/last adjacent links, stale blocks, and
Reader manifest projection. Numerical adjacency is catalog navigation, not a
prerequisite, completion, or learning-outcome claim.

`validate_content_completeness.py` is the narrow cross-file identity gate. It
checks that the 22 canonical chapters, 18 lab records, locale matrix, chapter
order, reader entries, and generated site outputs agree. Its migration warnings
identify lab sources that are still intentionally unsuffixed; they are not
claims that those labs have been translated or run.

Use `validate_learning_contract.py --canonical-en` to inspect only the
English sources currently declared by the locale matrix. The full command
still audits legacy, English, and translated files together for migration
compatibility; neither mode proves runtime execution or reader comprehension.

`build_pages_artifact.py` is the release-boundary check for GitHub Pages. It
copies only the public showcase and declared reader-facing directories into an
isolated artifact, adds the project-root entry, and rejects local work folders,
symbolic links, and high-confidence credential signatures without treating
ordinary teaching references to tokens or keys as secrets.
It does not prove that GitHub Pages is enabled or that the deployed URL is
reachable.

`serve_pages_candidate.py` is the local preview companion. It rebuilds the
bounded `_site/` artifact, serves only that directory on `127.0.0.1`, and
disables directory listings. `--skip-build` validates the existing artifact
before serving it. It is not a deployment command. Run
`test_build_pages_artifact.py` and `test_serve_pages_candidate.py` to check the
artifact boundary, credential-signature and symlink guards, loopback binding,
artifact root, listing boundary, and path-traversal boundary.

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
contract. A full invocation requires an exact 40-character candidate SHA that
matches the checked-out `HEAD` and a clean working tree; it then runs the named
gate matrix, preserves one log per command, and writes JSON and Markdown
packets to a temporary output directory. CI uploads that directory even on
failure. The packet is evidence for one commit and runner, not a promotion of
content maturity or proof of runtime/user outcomes.

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

`validate_task_contract_conditions_candidate.py` checks the isolated,
synthetic task-contract availability and channel study before any model run. It preserves
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
treating every code fence as executable. Labs 008 and 013 are registered as
`parsed`, `executed`, and `asserted` maintainer reference runs. Lab 008 rejects
an overclaimed synthetic research brief before accepting a bounded correction;
Lab 013 preserves a failed implementation check and bounded recovery. Both keep
artifact hashes, cleanup evidence, and negative packet fixtures, and both remain
explicitly outside `human_reviewed` learner evidence.

A `completed_reference_run` registration must also carry a safe output path,
the frozen fixture-tree digest, runner command, packet-validator command, and
fixture-test command. The validator reconciles those commands with the release
evidence matrix and asks each test script for its named negative-fixture
inventory only after the suite actually passes. It then replays the runner in
a fresh `.work` directory, validates the packet, and compares a normalized
semantic attestation digest that excludes timestamps and temporary-path IDs. A
label, source directory, or prose evidence path cannot certify a run by itself.

`test_lab_001_first_safe_change_fixture.py` checks the synthetic novice fixture:
its seeded README fails first, exactly one declared README correction passes,
and a missing local URL remains visible as a failure. It does not invoke a
model, observe a learner, validate a real project command, or establish transfer.

`validate_github_templates.py` checks the public contributor entry forms and
pull-request template for parseable YAML, required fields, unique component
IDs, required confirmations, repository-local contact links, and the disclosure
headings that preserve source, safety, evidence, unknowns, and status claims.
It also checks that the Field Report form declares labels and that the local
feedback contract retains its candidate, privacy, minimization, and evidence
boundaries. Run it with `--check-remote` only in a trusted environment with a
read-capable `GITHUB_TOKEN` or `GH_TOKEN`: it compares the declared labels with
the repository's live labels without printing the token. The default check is
offline. `test_validate_github_templates.py` covers the static and mocked
remote failure paths.

`validate_contributed_test_material.py` accepts only `candidate` test-material
receipts for original fictional fixtures, deterministic validators, and safe
protocols. It requires a base commit, current-license declaration, false
privacy flags, safe material paths, and one canonical non-claim sentence. It
rejects orphaned top-level material, symbolic links, receipt-as-material,
non-UTF-8 content, and unlisted attachments. It does not run a model, collect
a learner record, execute contributor-written code, validate a result, or
promote a status. `test_validate_contributed_test_material.py` rejects a
malformed commit binding, raw-output declaration, forbidden raw-prompt field,
an IQ claim, and the added file-boundary failures.

`create_contribution_receipt.py` creates a local-only, editable scaffold for
one fictional fixture, deterministic validator, or text-only protocol. It
requires an explicit target-branch baseline SHA and refuses to overwrite a
folder. It creates a receipt plus a positive and boundary/failure skeleton;
the contributor must replace the placeholders and run the declared offline
checks. `test_create_contribution_receipt.py` covers all three scaffold kinds,
its receipt/material boundary, duplicate-folder refusal, and identifier checks.

`audit_external_urls.py` derives deduplicated authoritative URLs from the
fact-impact registry, enforces an HTTPS host allowlist before redirects, uses
bounded HEAD/GET requests, and writes categorized JSON/Markdown observations.
Its initial `report_only` policy does not turn transient third-party failures
into random PR failures. `test_external_url_audit.py` covers classification,
deduplication, claim mapping, insecure schemes, and redirect escape attempts.

`validate_evidence_review_candidate.py` and
`test_evidence_review_candidate.py` derive narrow learning-evidence statuses
from original positive, boundary, failure, transfer, and fresh-context fixtures.
They check declared policy and preserve one method-loaded blind handoff as
an editorial single-turn handoff observation; this is not an authenticated
runtime receipt, automatic-trigger evidence, or repeated-runtime proof.

`validate_context_packet_builder_candidate.py` and
`test_context_packet_builder_candidate.py` protect an unadmitted context-packet
proposal. They require fictional positive, boundary, failure, budget, transfer,
and near-neighbour routing fixtures; preserve sensitive-input, untrusted-text,
conflict, freshness, and no-authority-widening boundaries; and reject a
premature Skill or runtime claim. They do not run a model, evaluate a security
control, establish routing behavior, or add a public Skill.
