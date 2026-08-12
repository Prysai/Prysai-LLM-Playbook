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
& $py scripts\check_local_links.py
& $py scripts\validate_localization.py
& $py scripts\build_book_navigation.py --check
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
