# Timely content record: `<content_id>` — `<short title>`

Use this template for a dated, reader-facing field-note about a changing
product, event, release, or public signal. Keep the prose original. Do not put
private reports, credentials, screenshots, transcripts, or copied source text
in the record.

## Identity and editorial intent

- `content_id`:
- `title`:
- `canonical_path`:
- `kind`: `field-note`
- `content_status`: `candidate` / `verified` / `removed`
- `admission_profile`: `timely-source-first`
- `owner`:
- `audience`:
- `reader_question`: what practical question does this answer now?
- `why_now`: what changed or became useful?
- `scope_in`:
- `scope_out`:
- `related_stable_route`:

The `content_id` and Markdown filename must end with the same valid
`YYYY-MM-DD` date so that a dated brief can be located and reviewed without
guessing which snapshot it represents.

## Source and claim ledger

| Claim or decision | Evidence class | Source URL and owner | Accessed | Applies to | Limitation | Fact status | Next review |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | `official_fact` / `reported_experience` / `project_inference` / `not_observed` |  |  |  |  | `current` / `stale` / `disputed` / `removed` |  |

Evidence classes describe what the record can support. An official source does
not establish account-level availability, and a reported experience does not
establish a root cause, prevalence, reliability, ROI, or general product
behavior.

## Source, authorship, and licence boundary

- `source_type`: first-party / public report / community signal / project
  record
- `source_record`:
- `source_license_or_usage_boundary`:
- `adaptation_decision`: original rewrite / reference-only / excluded
- `personal_data_removed`:
- `private_material_removed`:
- `long_quotation_or_asset_reused`: `no` / explain the permission
- `asset_register_entry`:

## Reader projection

- `locale_matrix_entry`:
- `source_locale`: `EN`
- `translation_policy`: `source-first`
- `translation_state`: list each locale; use `not-started` until review evidence exists
- `overview_target`:
- `generated_outputs`: `site/locale-manifest.js`, `site/search-index.js`
- `entry_design`: existing research area / another approved surface
- `rollback_projection`: exact matrix or generated records to remove or regenerate

Do not add a new top-level header control for a single timely item. Keep the
existing foundation route and page hierarchy primary.

## Safe reader action and limits

- `low_risk_action_or_observation`:
- `approval_or_external_effect_boundary`:
- `failure_or_contradiction_case`:
- `not_run_or_not_observed`:
- `claims_forbidden`:
- `next_smallest_check`:

## Maintenance and release

- `review_trigger`: source change / rollout change / user report / date due /
  dispute / other
- `last_reviewed`:
- `next_review`:
- `stale_action`: narrow / label stale / remove Reader projection / other
- `reviewer_role`:
- `validation_commands`:
- `runtime_or_browser_evidence`:
- `release_commit`:
- `rollback_target`:
- `unverified_boundary`:
