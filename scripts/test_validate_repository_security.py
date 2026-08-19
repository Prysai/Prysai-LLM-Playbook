"""Focused fixtures for the repository security policy validator."""

from __future__ import annotations

import tempfile
from pathlib import Path

import validate_repository_security as policy


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    fixtures = 0
    try:
        current_policy, policy_load_errors = policy.load_policy()
        require(not policy_load_errors and current_policy is not None, "repository security policy could not be loaded")
        require(not policy.validate_policy(current_policy), "repository security policy failed its live-boundary contract")
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
