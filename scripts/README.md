# Scripts

`scripts/` contains repeatable checks, generators, and catalog builders. They
turn project rules into evidence that can be rerun locally and in CI.

## Common commands

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_project.py
& $py scripts\validate_project_structure.py
& $py scripts\check_local_links.py
& $py scripts\validate_localization.py
& $py scripts\build_book_navigation.py --check
& $py scripts\build_learning_path_site.py --check
& $py scripts\build_site_locale_manifest.py --check
& $py scripts\build_pages_artifact.py --check
```

## Generator rule

If a generated file is wrong, fix the contract or source record named in
[`docs/governance/project-structure.yaml`](../docs/governance/project-structure.yaml)
and regenerate it. Do not hand-edit a generated block to hide a stale source.

A green script proves only the checks that script performs. It is not by itself
runtime, browser, translation, or learning-outcome evidence.

`build_pages_artifact.py` is the release-boundary check for GitHub Pages. It
copies only the public showcase and declared reader-facing directories into an
isolated artifact, adds the project-root entry, and rejects local work folders.
It does not prove that GitHub Pages is enabled or that the deployed URL is
reachable.
