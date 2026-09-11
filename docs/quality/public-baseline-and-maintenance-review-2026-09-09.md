# Public baseline and maintenance review — 2026-09-09

**Review status:** `dated live observation`
**Project status:** `candidate`
**Review target:** public `Prysai/Prysai-LLM-Playbook` `main` at
`196b1a71b16e03d5171c74e93af0af8779b61d9e`
**Purpose:** establish a reproducible maintenance baseline and separate public,
local, artifact, and learner-evidence claims.

This record is a dated snapshot. It does not replace the machine-readable
status source, release-readiness record, or future live checks.

## Conclusion

The public repository has a usable engineering and publication baseline, but
the project is not thereby verified as a learning product or production-ready.
The shared local checkout is a separate, dirty development line and must not
be used as evidence for what is public.

The highest-value maintenance rule is now explicit: begin publication-affecting
work from a clean worktree based on public `main`, and report source,
engineering, artifact, and public-host evidence as separate facts.

## Facts checked

| Area | Observation | Evidence boundary |
| --- | --- | --- |
| Public source | `main` resolved to `196b1a71b16e03d5171c74e93af0af8779b61d9e`; the commit is the merged result of PR #96. | Establishes the public source baseline at the review time. It does not establish that every local branch is synchronized. |
| Quality | Quality run `34354663990` completed successfully. Its `candidate-evidence` job completed successfully, including the release-evidence step with failure propagation enabled. | Establishes the named workflow result for this commit. It is not a learner result or a production-readiness decision. |
| Security and code analysis | Security run `34354663945` and CodeQL run `34354664058` completed successfully. | Establishes the named checks for this commit only. It is not a complete security audit. |
| Localization | Multilingual coverage run `34354664063` completed successfully. | Establishes the declared coverage workflow result, not native-language quality or learning equivalence. |
| Publication workflow | Pages workflow run `34354663998` completed successfully. Its `build`, `deploy`, `sync-huggingface`, and `docs-prysai-deploy` jobs all completed successfully. | Establishes the job results recorded by Actions. Each public surface still needs its own interpretation. |
| Docs public bytes | A temporary artifact built from public `main` passed the existing route-critical comparison: `DEPLOYED_SITE_OK attempts=1 paths=30` for `https://docs.prysai.com/llm-playbook/`. A direct request returned HTTP 200. | Strong deployment-integrity evidence for the named Docs artifact and route set. It does not prove browser usability, translation quality, or learning outcomes. |
| Hugging Face | `https://huggingface.co/spaces/Prysai/Prysai-LLM-Playbook` returned HTTP 200 and exposed the project title. | Availability evidence only; an exact artifact-byte comparison was not run in this review. |
| Pages identity | The Pages API reports the workflow source as `main` but returns `http://prysai.com/` as its `html_url`. | The Pages host identity is separate from the Docs mirror and needs an owner-level URL check before a Pages-specific public claim is made. |
| Ruleset | Ruleset `20903386` is active and requires pull-request review, required status checks, signatures, CodeQL, code quality, and resolved review threads. It has no bypass actors in the returned record. | Establishes the repository ruleset observation; it does not mean every branch-level legacy protection endpoint reports the same shape. |
| Failure propagation | The public `quality.yml` records `continue-on-error: false` for the release-evidence step. | The earlier soft-failure concern is not present on the reviewed public baseline. Future workflow edits must preserve this behavior. |

The exact workflow-to-run mapping captured from the API is:

- quality: `34354663990`;
- security: `34354663945`;
- CodeQL: `34354664058`;
- multilingual coverage: `34354664063`; and
- site publication: `34354663998`.

These IDs are evidence pointers for this dated snapshot, not permanent status
labels. Re-query the workflow before making a future claim.

## Local state deliberately excluded from the baseline

The shared checkout was observed on branch
`uuzzrm/native-copy-polish-20260828` at
`52717e2002082332758d74ca5e42d41762351527`. It had uncommitted changes and
was not based directly on the current public `main`.

`git rev-list --left-right --count origin/main...HEAD` returned `229 57` for
that checkout: 229 commits were reachable only from the public-main side of
the reviewed graph, and 57 were reachable only from the local side. The
checkout remains user work. This review neither resets it nor deletes its
branches or worktrees.

## Current maturity gaps

The following gaps remain explicit rather than being inferred away by green
engineering checks:

- `docs/governance/content-status.yaml` keeps the project and core route at
  `candidate`, with learner and transfer evidence still `not_run`;
- the 18 Labs remain `draft / not_run` in the current status source;
- the input-archive audit returned `INPUT_ARCHIVE_AUDIT_INCOMPLETE` with
  `archive_dir=not_configured`; no source archive was supplied for this
  review;
- the eight locale routes have structural coverage, but this record does not
  establish native-language review or learner equivalence; and
- a successful deployment job, an HTTP response, or a static browser check
  does not establish comprehension, retention, transfer, or production
  readiness.

## Maintenance rules for the next update

1. Re-fetch public `main` and record its full SHA before creating a candidate
   worktree.
2. Keep the candidate worktree clean at the point where release evidence is
   built. Do not use the shared dirty checkout as the candidate source.
3. Record the exact commands and IDs for engineering checks, then record the
   artifact and each public host separately.
4. Update canonical source files before generated projections; run the relevant
   `--check` command after regeneration.
5. Keep learner records local, de-identified, and outside public PRs. A
   protocol or blank template remains `not_run` until an authorized run exists.
6. Before deleting old branches or worktrees, produce a mapping of branch,
   worktree, commit, PR, and owner; deletion is a separate authorized action.

## Commands and results

The following read-only checks were run against the public-main checkout or its
temporary artifact. Temporary paths are omitted from this public record.

```text
git ls-remote origin refs/heads/main
→ 196b1a71b16e03d5171c74e93af0af8779b61d9e

gh api repos/Prysai/Prysai-LLM-Playbook/commits/main
→ sha=196b1a71b16e03d5171c74e93af0af8779b61d9e

gh api repos/Prysai/Prysai-LLM-Playbook/pulls/96
→ merged_at=2026-09-09T13:03:07Z, merge_commit_sha=196b1a71...

python -X utf8 scripts/build_pages_artifact.py --output <temporary-directory>
→ PAGES_ARTIFACT_OK

python -X utf8 scripts/check_deployed_site.py --artifact <temporary-directory> \
  --base-url https://docs.prysai.com/llm-playbook/ \
  --attempts 3 --delay-seconds 2 --timeout-seconds 15 \
  --cache-buster 196b1a71b16e03d5171c74e93af0af8779b61d9e
→ DEPLOYED_SITE_OK attempts=1 paths=30

python -X utf8 scripts/audit_input_archives.py
→ INPUT_ARCHIVE_AUDIT_INCOMPLETE / archive_dir=not_configured
```

The successful checks above are engineering and deployment-integrity
observations. They do not close the learner-evidence or source-archive gaps.

## Source and license boundary

This is an original Prysai maintenance record. It quotes no external prose,
uses no external image or code, and includes only links, identifiers, dates,
and observations needed to make the repository state reproducible. The
repository's existing `LICENSE`, `LICENSE-CODE`, and
`docs/sources/asset-register.md` remain the governing license records.

## Next review

| Item | Owner | Trigger | Next review |
| --- | --- | --- | --- |
| Public branch and workflow evidence | `release-maintainer` | Any merge, workflow, or ruleset change | 2026-10-09 |
| Docs/Hugging Face/Pages surface identity | `site-maintainer` | Host, workflow, or artifact change | 2026-09-23 |
| Input archive and source boundary | `source-maintainer` | Archive availability or source change | Before the next provenance claim |
| Core learner pilot | `quality-maintainer` | Protocol approval or first authorized run | Before recruitment |
