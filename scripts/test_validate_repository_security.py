"""Focused fixtures for the repository security policy validator."""

from __future__ import annotations

import copy
import json
import os
import subprocess
import tempfile
import textwrap
from pathlib import Path

import validate_repository_security as policy


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def run_contract_fixture(
    *,
    sync_author: str = "Prysai-Lab",
    sync_committer: str = "web-flow",
    sync_parent: str = "base-sha",
    main_history: set[str] | None = None,
) -> subprocess.CompletedProcess[str]:
    workflow = policy.PULL_REQUEST_CONTRACT_WORKFLOW.read_text(encoding="utf-8")
    marker = "          python - \"$RUNNER_TEMP/pull-request.json\" \"$RUNNER_TEMP/pull-request-commits.json\" \"$RUNNER_TEMP/main-commits.json\" <<'PY'\n"
    start = workflow.index(marker) + len(marker)
    end = workflow.index("          PY\n", start)
    contract_script = textwrap.dedent(workflow[start:end])
    headings = [
        "## Tracking and summary",
        "## Implementation or editorial approach",
        "## Change class",
        "## Contribution route and review request",
        "## Contribution declaration",
        "## Source, authorship, and license",
        "## Safety and external effects",
        "## Security review",
        "## AI assistance",
        "## Validation and evidence",
        "## Unverified and out of scope",
        "## Status claim",
        "## Checklist",
    ]
    pull_request = {
        "created_at": "2026-09-01T00:00:00Z",
        "user": {"login": "uuzzrm"},
        "head": {"sha": "head-sha"},
        "base": {
            "ref": "main",
            "sha": "base-sha",
            "repo": {"full_name": "Prysai/Prysai-LLM-Playbook"},
        },
        "body": "\n".join(headings),
    }
    commits = [
        {
            "sha": "contributor-sha",
            "author": {"login": "uuzzrm"},
            "committer": {"login": "uuzzrm"},
            "commit": {
                "message": "docs: fixture\n\nSigned-off-by: uuzzrm <uuzzrm@users.noreply.github.com>",
                "verification": {"verified": True, "reason": "valid"},
            },
            "parents": [{"sha": "base-sha"}],
        },
        {
            "sha": "sync-sha",
            "author": {"login": sync_author},
            "committer": {"login": sync_committer},
            "commit": {
                "message": "Merge branch 'main' into uuzzrm/fixture",
                "verification": {"verified": True, "reason": "valid"},
            },
            "parents": [
                {"sha": "contributor-sha"},
                {"sha": sync_parent},
            ],
        },
    ]
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory)
        pull_request_path = root / "pull-request.json"
        commits_path = root / "pull-request-commits.json"
        main_commits_path = root / "main-commits.json"
        pull_request_path.write_text(json.dumps(pull_request), encoding="utf-8")
        commits_path.write_text(json.dumps([commits]), encoding="utf-8")
        main_commits_path.write_text(
            json.dumps([[{"sha": sha} for sha in (main_history or {"base-sha"})]]),
            encoding="utf-8",
        )
        environment = os.environ.copy()
        environment.update(
            {
                "EXPECTED_HEAD_SHA": "head-sha",
                "ROLLOUT_CUTOFF_AT": "2026-08-31T00:14:52Z",
                "GITHUB_REPOSITORY": "Prysai/Prysai-LLM-Playbook",
                "PR_NUMBER": "999",
            }
        )
        return subprocess.run(
            [
                os.fspath(Path(os.sys.executable)),
                "-c",
                contract_script,
                os.fspath(pull_request_path),
                os.fspath(commits_path),
                os.fspath(main_commits_path),
            ],
            cwd=policy.ROOT,
            env=environment,
            capture_output=True,
            text=True,
            check=False,
        )


def main() -> int:
    fixtures = 0
    try:
        current_policy, policy_load_errors = policy.load_policy()
        require(not policy_load_errors and current_policy is not None, "repository security policy could not be loaded")
        require(not policy.validate_policy(current_policy), "repository security policy failed its live-boundary contract")
        fixtures += 1
        migration_exceptions = current_policy.get("review_requirements", {}).get("migration_exceptions", [])
        require(
            any(
                "2026-08-31T00:14:52Z" in exception
                and "valid GitHub cryptographic signature" in exception
                and "DCO trailers" in exception
                for exception in migration_exceptions
            ),
            "repository security policy did not record the bounded legacy migration exception",
        )
        fixtures += 1

        missing_required_status_check = copy.deepcopy(current_policy)
        missing_required_status_check["host_ruleset"]["required_status_checks"] = ["candidate-evidence", "repository-security"]
        require(
            any("host_ruleset.required_status_checks" in error for error in policy.validate_policy(missing_required_status_check)),
            "host Ruleset without the PR contract check was accepted",
        )
        fixtures += 1

        non_strict_status_checks = copy.deepcopy(current_policy)
        non_strict_status_checks["host_ruleset"]["strict_required_status_checks"] = False
        require(
            any("strict_required_status_checks" in error for error in policy.validate_policy(non_strict_status_checks)),
            "non-strict host status checks were accepted",
        )
        fixtures += 1

        valid_workflow = """on:
  pull_request:
permissions:
  contents: read
jobs:
  check:
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
        with:
          persist-credentials: false
"""
        require(not policy.validate_workflow_text(valid_workflow, "valid.yml"), "valid pinned read-only workflow was rejected")
        fixtures += 1

        floating_action = valid_workflow.replace("@3d3c42e5aac5ba805825da76410c181273ba90b1", "@v7")
        require(
            any("full commit SHA" in error for error in policy.validate_workflow_text(floating_action, "floating.yml")),
            "floating Action tag was accepted",
        )
        fixtures += 1

        legacy_node20_action = valid_workflow.replace(
            "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
            "actions/configure-pages@983d7736d9b0ae728b81ab479565c72886d7745b",
        )
        require(
            any("legacy Node.js 20 Action pin" in error for error in policy.validate_workflow_text(legacy_node20_action, "legacy-node20.yml")),
            "legacy Node.js 20 Action pin was accepted",
        )
        fixtures += 1

        target_event = valid_workflow.replace("pull_request:", "pull_request_target:")
        require(
            any("pull_request_target" in error for error in policy.validate_workflow_text(target_event, "target.yml")),
            "pull_request_target was accepted",
        )
        fixtures += 1

        secret_context = valid_workflow + "      - run: echo ${{ secrets.EXAMPLE }}\n"
        require(
            any("secrets context" in error for error in policy.validate_workflow_text(secret_context, "secret.yml")),
            "workflow secrets context was accepted",
        )
        fixtures += 1

        protected_deploy = """on:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  deploy:
    steps:
      - run: echo ${{ secrets.DEPLOY_KEY }}
"""
        require(
            not policy.validate_workflow_text(protected_deploy, "deploy.yml"),
            "push-only deployment workflow was rejected for using its scoped secret",
        )
        fixtures += 1

        dispatch_secret = protected_deploy.replace(
            "  push:\n    branches: [main]",
            "  workflow_dispatch:\n",
        )
        require(
            any("workflow_dispatch secret use" in error for error in policy.validate_workflow_text(dispatch_secret, "dispatch.yml")),
            "workflow_dispatch secret use without a main-ref guard was accepted",
        )
        fixtures += 1

        guarded_dispatch_secret = dispatch_secret.replace(
            "    steps:",
            "    if: ${{ github.ref == 'refs/heads/main' }}\n    steps:",
        )
        require(
            not policy.validate_workflow_text(guarded_dispatch_secret, "guarded-dispatch.yml"),
            "workflow_dispatch secret use with a main-ref guard was rejected",
        )
        fixtures += 1

        unsafe_pipe = valid_workflow + "      - run: curl https://example.invalid/install | sh\n"
        require(
            any("piped directly" in error for error in policy.validate_workflow_text(unsafe_pipe, "pipe.yml")),
            "download-to-shell pipeline was accepted",
        )
        fixtures += 1

        write_permission = valid_workflow.replace("  contents: read", "  contents: write")
        require(
            any("contents: read" in error or "write-scoped permissions" in error for error in policy.validate_workflow_text(write_permission, "write.yml")),
            "write-scoped pull-request permission was accepted",
        )
        fixtures += 1

        fast_workflow = "\n".join(policy.FAST_MATERIAL_REQUIRED_FRAGMENTS) + "\nworking-directory: trusted-base\n"
        require(
            not policy.validate_fast_material_workflow(fast_workflow, "contribution-material.yml"),
            "trusted fast-material workflow was rejected",
        )
        fixtures += 1

        missing_trusted_root = fast_workflow.replace("path: trusted-base\n", "")
        require(
            any("trusted fast-material boundary" in error for error in policy.validate_fast_material_workflow(missing_trusted_root, "contribution-material.yml")),
            "fast-material workflow without trusted checkout was accepted",
        )
        fixtures += 1

        secure_docs_deploy = """  docs-prysai-deploy:
    needs: build
    permissions:
      actions: read
    steps:
      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c
        with:
          name: pages-candidate-${{ github.sha }}
          path: _site
          github-token: ${{ github.token }}
      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c
        with:
          name: docs-verifier-${{ github.sha }}
          path: docs-verifier
          github-token: ${{ github.token }}
      - run: python docs-verifier/check_deployed_site.py --artifact _site
  another-job:
    runs-on: ubuntu-latest
"""
        require(
            not policy.validate_docs_deploy_workflow(secure_docs_deploy, "pages.yml"),
            "artifact-only Docs deployment was rejected",
        )
        fixtures += 1

        candidate_artifact = "\n".join(policy.PAGES_CANDIDATE_ARTIFACT_REQUIRED) + "\n"
        require(
            not policy.validate_pages_candidate_artifact(candidate_artifact, "pages.yml"),
            "complete Pages candidate artifact was rejected",
        )
        fixtures += 1
        require(
            any("include hidden files" in error for error in policy.validate_pages_candidate_artifact(candidate_artifact.replace("include-hidden-files: true\n", ""), "pages.yml")),
            "Pages candidate artifact without hidden files was accepted",
        )
        fixtures += 1

        pages_workflow = policy.PAGES_WORKFLOW.read_text(encoding="utf-8")
        require(
            not policy.validate_pages_post_merge_orchestration(pages_workflow, "pages.yml"),
            "Pages workflow did not retain the post-merge publication boundary",
        )
        fixtures += 1
        workflow_wide_concurrency = pages_workflow.replace(
            "# Keep concurrency at the publication boundary. The Docs job is protected by\n# a required environment review and must not hold the build, Pages, or\n# Hugging Face jobs in a workflow-wide queue.\n",
            "concurrency:\n  group: pages\n  cancel-in-progress: false\n",
        )
        require(
            any("workflow-wide concurrency" in error for error in policy.validate_pages_post_merge_orchestration(workflow_wide_concurrency, "pages.yml")),
            "Pages workflow with a workflow-wide concurrency group was accepted",
        )
        fixtures += 1
        filtered_main_push = pages_workflow.replace(
            "  push:\n    branches: [main]\n",
            "  push:\n    branches: [main]\n    paths:\n      - \"site/**\"\n",
        )
        require(
            any("must not filter paths" in error for error in policy.validate_pages_post_merge_orchestration(filtered_main_push, "pages.yml")),
            "Pages workflow with a post-merge path filter was accepted",
        )
        fixtures += 1

        secure_codeql = """on:
  pull_request:
permissions:
  actions: read
  contents: read
  packages: read
  security-events: write
""" + "\n".join(policy.CODEQL_REQUIRED_FRAGMENTS) + "\npersist-credentials: false\n"
        require(
            not policy.validate_codeql_workflow(secure_codeql, ".github/workflows/codeql.yml"),
            "pinned PR CodeQL workflow with its scoped upload permission was rejected",
        )
        fixtures += 1
        require(
            not policy.validate_workflow_text(secure_codeql, ".github/workflows/codeql.yml"),
            "CodeQL PR workflow was rejected by the general workflow validator",
        )
        fixtures += 1
        ordinary_pr_upload = valid_workflow.replace(
            "  contents: read\n",
            "  contents: read\n  security-events: write\n",
        )
        require(
            any("write-scoped permissions" in error for error in policy.validate_workflow_text(ordinary_pr_upload, "security.yml")),
            "ordinary PR workflow with CodeQL upload permission was accepted",
        )
        fixtures += 1
        codeql_extra_permission = secure_codeql.replace(
            "  security-events: write\n",
            "  security-events: write\n  id-token: write\n",
        )
        require(
            any("exactly" in error for error in policy.validate_codeql_workflow(codeql_extra_permission, ".github/workflows/codeql.yml")),
            "CodeQL workflow with an extra PR write permission was accepted",
        )
        fixtures += 1
        codeql_missing_upload_permission = secure_codeql.replace("  security-events: write\n", "")
        require(
            any("security-events: write" in error for error in policy.validate_codeql_workflow(codeql_missing_upload_permission, ".github/workflows/codeql.yml")),
            "CodeQL workflow without its PR upload permission was accepted",
        )
        fixtures += 1
        require(
            any("secrets context" in error for error in policy.validate_codeql_workflow(secure_codeql + "${{ secrets.EXAMPLE }}\n", ".github/workflows/codeql.yml")),
            "CodeQL workflow with a secrets context was accepted",
        )
        fixtures += 1

        maintainer_automerge = policy.MAINTAINER_AUTOMERGE_WORKFLOW.read_text(encoding="utf-8")
        require(
            not policy.validate_maintainer_automerge_workflow(
                maintainer_automerge,
                ".github/workflows/maintainer-pr-automerge.yml",
            ),
            "constrained maintainer auto-merge workflow was rejected",
        )
        fixtures += 1
        require(
            "'uuzzrm'," in maintainer_automerge and "'Prysai-Lab'," in maintainer_automerge,
            "maintainer auto-merge workflow did not retain both explicit author allowlist entries",
        )
        fixtures += 1
        require(
            "const rolloutCutoff = Date.parse('2026-08-31T00:14:52Z');" in maintainer_automerge
            and "const legacyMigration = Date.parse(pullRequest.created_at) < rolloutCutoff;" in maintainer_automerge
            and "if (legacyMigration && !hasCurrentApproval)" in maintainer_automerge,
            "maintainer auto-merge workflow did not retain the bounded legacy migration gate",
        )
        fixtures += 1
        require(
            not policy.validate_workflow_text(maintainer_automerge, ".github/workflows/maintainer-pr-automerge.yml"),
            "constrained maintainer auto-merge workflow was rejected by the general workflow validator",
        )
        fixtures += 1

        missing_opt_in = maintainer_automerge.replace(
            "pullRequest.title?.startsWith('[maintainer-doc]')",
            "pullRequest.title?.startsWith('[missing-opt-in]')",
        )
        require(
            any("pullRequest.title?.startsWith('[maintainer-doc]')" in error for error in policy.validate_maintainer_automerge_workflow(missing_opt_in, ".github/workflows/maintainer-pr-automerge.yml")),
            "maintainer auto-merge workflow without title opt-in was accepted",
        )
        fixtures += 1

        extra_maintainer_permission = maintainer_automerge.replace(
            "  pull-requests: write\n",
            "  pull-requests: write\n  id-token: write\n",
        )
        require(
            any("exactly actions: read" in error for error in policy.validate_maintainer_automerge_workflow(extra_maintainer_permission, ".github/workflows/maintainer-pr-automerge.yml")),
            "maintainer auto-merge workflow with an extra permission was accepted",
        )
        fixtures += 1

        direct_pull_request_trigger = maintainer_automerge.replace(
            "  workflow_run:\n",
            "  pull_request:\n",
        )
        require(
            any("must use workflow_run" in error for error in policy.validate_maintainer_automerge_workflow(direct_pull_request_trigger, ".github/workflows/maintainer-pr-automerge.yml")),
            "maintainer auto-merge workflow with a direct pull_request trigger was accepted",
        )
        fixtures += 1

        unpinned_script_action = maintainer_automerge.replace(
            "actions/github-script@3a2844b7e9c422d3c10d287c895573f7108da1b3",
            "actions/github-script@v9",
        )
        require(
            any("full commit SHA" in error for error in policy.validate_workflow_text(unpinned_script_action, ".github/workflows/maintainer-pr-automerge.yml")),
            "maintainer auto-merge workflow with an unpinned GitHub Script action was accepted",
        )
        fixtures += 1

        pull_request_contract = policy.PULL_REQUEST_CONTRACT_WORKFLOW.read_text(encoding="utf-8")
        require(
            "legacy_authors = {\"uuzzrm\", \"Prysai-Lab\"}" in pull_request_contract
            and "created_time < cutoff_time" in pull_request_contract
            and "verification = (commit.get(\"commit\") or {}).get(\"verification\")" in pull_request_contract
            and "verification.get(\"verified\") is not True" in pull_request_contract
            and "verification.get(\"reason\") != \"valid\"" in pull_request_contract
            and "legacy migration requires a valid GitHub cryptographic signature" in pull_request_contract
            and "PR_CONTRACT_MIGRATION_OK" in pull_request_contract,
            "pull-request contract did not retain the bounded legacy migration gate",
        )
        fixtures += 1

        require(
            "branch_sync_authors = {\"uuzzrm\", \"Prysai-Lab\"}" in pull_request_contract
            and "branch_sync_committer = \"web-flow\"" in pull_request_contract
            and "main_history =" in pull_request_contract
            and "parents[1].get(\"sha\") in main_history" in pull_request_contract
            and "and committer.get(\"login\") == branch_sync_committer" in pull_request_contract
            and "branch_sync_headline = re.compile" in pull_request_contract
            and "branch_sync_exemptions" in pull_request_contract,
            "pull-request contract did not retain the narrow signed branch-sync DCO exception",
        )
        fixtures += 1

        branch_sync = run_contract_fixture()
        require(
            branch_sync.returncode == 0
            and "PR_CONTRACT_OK" in branch_sync.stdout
            and "branch_sync_exemptions=1" in branch_sync.stdout,
            "verified GitHub main branch-sync merge was not accepted as the narrow DCO exception",
        )
        fixtures += 1

        historical_branch_sync = run_contract_fixture(
            sync_parent="old-base-sha",
            main_history={"old-base-sha", "base-sha"},
        )
        require(
            historical_branch_sync.returncode == 0
            and "PR_CONTRACT_OK" in historical_branch_sync.stdout
            and "branch_sync_exemptions=1" in historical_branch_sync.stdout,
            "verified branch-sync merge from an older main ancestor was rejected",
        )
        fixtures += 1

        untrusted_branch_sync = run_contract_fixture(sync_committer="attacker")
        require(
            untrusted_branch_sync.returncode != 0 and "failures: sync-sha" in untrusted_branch_sync.stdout,
            "arbitrary signed branch-sync-shaped merge was accepted without a DCO trailer",
        )
        fixtures += 1

        stale_branch_sync = run_contract_fixture(sync_parent="different-base-sha")
        require(
            stale_branch_sync.returncode != 0 and "failures: sync-sha" in stale_branch_sync.stdout,
            "branch-sync merge for a different base was accepted without a DCO trailer",
        )
        fixtures += 1

        extra_docs_permission = secure_docs_deploy.replace(
            "      actions: read\n",
            "      actions: read\n      contents: write\n",
        )
        require(
            any("exactly actions: read" in error for error in policy.validate_docs_deploy_workflow(extra_docs_permission, "pages.yml")),
            "Docs deployment with an additional write permission was accepted",
        )
        fixtures += 1

        source_in_secret_job = secure_docs_deploy.replace(
            "      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c",
            "      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
        )
        require(
            any("must not execute source/build code" in error for error in policy.validate_docs_deploy_workflow(source_in_secret_job, "pages.yml")),
            "Docs deployment checkout beside secret was accepted",
        )
        fixtures += 1

        missing_artifact = secure_docs_deploy.replace("name: pages-candidate-${{ github.sha }}\n", "name: wrong-artifact\n")
        require(
            any("must retain artifact boundary" in error for error in policy.validate_docs_deploy_workflow(missing_artifact, "pages.yml")),
            "Docs deployment without the validated artifact was accepted",
        )
        fixtures += 1

        persisted_checkout = valid_workflow.replace("        with:\n          persist-credentials: false\n", "")
        require(
            any("persisted checkout credentials" in error for error in policy.validate_workflow_text(persisted_checkout, "checkout.yml")),
            "persisted checkout credential was accepted",
        )
        fixtures += 1

        require(
            not policy.validate_quality_dependency_pin(policy.REQUIRED_PYYAML_INSTALL, "quality.yml"),
            "pinned binary-only validation dependency was rejected",
        )
        fixtures += 1

        require(
            policy.validate_quality_dependency_pin("python -m pip install PyYAML", "quality.yml"),
            "unbounded validation dependency was accepted",
        )
        fixtures += 1

        quality_workflow = policy.QUALITY_WORKFLOW.read_text(encoding="utf-8")
        require(
            not policy.validate_quality_workflow(quality_workflow, "quality.yml"),
            "quality workflow did not preserve diagnostic evidence while failing closed",
        )
        fixtures += 1

        quality_without_fail_closed = quality_workflow.replace(
            "\n      - name: Enforce release evidence result\n"
            "        if: steps.release_evidence.outcome != 'success'\n"
            "        run: |\n"
            "          echo \"The commit-bound release-evidence gate failed; the uploaded packet is diagnostic only.\"\n"
            "          exit 1\n",
            "\n",
        )
        require(
            any(
                "fail-closed" in error
                for error in policy.validate_quality_workflow(
                    quality_without_fail_closed, "quality.yml"
                )
            ),
            "quality workflow without final release-evidence failure propagation was accepted",
        )
        fixtures += 1

        valid_csp = (
            '<meta http-equiv="Content-Security-Policy" '
            'content="default-src \'self\'; base-uri \'self\'; object-src \'none\'; '
            'script-src \'self\'; style-src \'self\'; img-src \'self\'; '
            'font-src \'self\'; connect-src \'self\'; form-action \'self\'; frame-src \'none\'" />'
        )
        require(not policy.validate_site_csp_text(valid_csp, "site/index.html"), "strict site CSP was rejected")
        fixtures += 1

        late_csp = '<script src="app.js"></script>' + valid_csp
        require(
            any("must precede" in error for error in policy.validate_site_csp_text(late_csp, "site/index.html")),
            "site CSP was accepted after a script resource",
        )
        fixtures += 1

        missing_object = valid_csp.replace("object-src 'none'; ", "")
        require(
            any("object-src 'none'" in error for error in policy.validate_site_csp_text(missing_object, "site/index.html")),
            "site CSP accepted a missing object-src boundary",
        )
        fixtures += 1

        unsafe_csp = valid_csp.replace("script-src 'self'", "script-src 'self' 'unsafe-inline'")
        require(
            any("unsafe-inline" in error for error in policy.validate_site_csp_text(unsafe_csp, "site/index.html")),
            "site CSP accepted unsafe inline script execution",
        )
        fixtures += 1

        synthetic_secret = "sk-" + ("a" * 24)
        require(
            any(pattern.search(synthetic_secret) for pattern in policy.SECRET_PATTERNS),
            "common API-key shape was not recognized",
        )
        fixtures += 1

        ordinary_url = "https://www.nist.gov/itl/ai-risk-management-framework/ai-rmf-playbook"
        require(not policy.sensitive_information_scan(ordinary_url), "ordinary URL path was treated as an API key")
        fixtures += 1

        ordinary_filename = "docs/research/task-contract-availability-and-channel-v1"
        require(not policy.sensitive_information_scan(ordinary_filename), "ordinary hyphenated filename was treated as an API key")
        fixtures += 1

        credential_url = "https://user:" + "not-a-real-secret-value" + "@service.example.org/api"
        require("credential-bearing-url" in policy.sensitive_information_scan(credential_url), "credential-bearing URL was accepted")
        fixtures += 1

        secret_query = "https://service.example.org/callback?token=" + "not-a-real-token-value"
        require("secret-bearing-url-query" in policy.sensitive_information_scan(secret_query), "secret-bearing URL query was accepted")
        fixtures += 1

        private_ip = "https://10." + "0.0.5/internal"
        require("private-network-location" in policy.sensitive_information_scan(private_ip), "private network location was accepted")
        fixtures += 1

        mac = "mac address: " + ":".join(("00", "11", "22", "33", "44", "55"))
        require("mac-address" in policy.sensitive_information_scan(mac), "MAC address was accepted")
        fixtures += 1

        device_id = "device" + "_id: " + "device-" + "12345678"
        require("device-identifier" in policy.sensitive_information_scan(device_id), "device identifier was accepted")
        fixtures += 1

        synthetic_path = "# synthetic fixture path " + "C:" + "\\Users\\example\\fixture.txt"
        require(not policy.sensitive_information_scan(synthetic_path), "explicit synthetic path was rejected")
        fixtures += 1

        local_path = "C:" + "\\" + "Users" + "\\alice\\private.txt"
        require("machine-local-path" in policy.sensitive_information_scan(local_path), "machine-local path was accepted")
        fixtures += 1

        file_uri = "file:" + "//" + "/C:" + "/" + "Users" + "/alice/private.txt"
        require("machine-local-path" in policy.sensitive_information_scan(file_uri), "local file URI was accepted")
        fixtures += 1

        with tempfile.TemporaryDirectory() as directory:
            large_text = Path(directory) / "large-text-fixture.txt"
            large_text.write_text("x" * (1_000_001) + "\nsk-" + ("a" * 24), encoding="utf-8")
            errors = policy.secret_scan([large_text])
        require(any("credential-shaped value" in error for error in errors), "large text file was skipped by the scan")
        fixtures += 1
    except AssertionError as exc:
        print("REPOSITORY_SECURITY_POLICY_TESTS_FAILED")
        print(f"- {exc}")
        return 1
    print(f"REPOSITORY_SECURITY_POLICY_TESTS_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
