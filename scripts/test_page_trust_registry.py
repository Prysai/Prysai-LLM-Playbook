"""Negative and boundary fixtures for the page trust registry."""

from __future__ import annotations

import copy

import validate_page_trust_registry as trust


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def errors_for(registry: dict, status: dict) -> list[str]:
    return trust.validate_document(registry, status)


def main() -> int:
    registry = trust.load_object(trust.REGISTRY)
    status = trust.load_object(trust.CONTENT_STATUS)
    require(errors_for(registry, status) == [], "valid registry was rejected")

    missing_sources = copy.deepcopy(registry)
    missing_sources["records"][0]["sources"] = []
    require(
        any("sources must be a non-empty list" in item for item in errors_for(missing_sources, status)),
        "missing sources were accepted",
    )

    inflated = copy.deepcopy(registry)
    inflated["records"][0]["content_status"] = "verified"
    require(
        any("does not match content-status.yaml" in item for item in errors_for(inflated, status)),
        "status inflation was accepted",
    )

    expired = copy.deepcopy(registry)
    expired["records"][0]["next_review"] = expired["generated_at"]
    require(
        any("next_review must be after" in item for item in errors_for(expired, status)),
        "expired review was accepted",
    )

    unpinned = copy.deepcopy(registry)
    unpinned["records"][0]["sources"][1]["url"] = (
        "https://github.com/facebook/docusaurus/blob/main/website/docs/guides/docs/versioning.mdx"
    )
    require(
        any("must pin a 40-character commit" in item for item in errors_for(unpinned, status)),
        "unpinned GitHub source was accepted",
    )

    wrong_identity = copy.deepcopy(registry)
    wrong_identity["records"][0]["content_id"] = "chapter-01-wrong"
    require(
        any("does not match the source identity" in item for item in errors_for(wrong_identity, status)),
        "mismatched content identity was accepted",
    )

    missing_chapter = copy.deepcopy(registry)
    missing_chapter["records"].pop()
    missing_chapter["coverage"]["registered_pages"] = 21
    require(
        any("registered_pages must equal" in item or "missing canonical chapters" in item for item in errors_for(missing_chapter, status)),
        "incomplete canonical coverage was accepted",
    )

    replacement_path = copy.deepcopy(registry)
    replacement_path["records"][-1]["canonical_path"] = "book/chapters/01-gpt-and-codex-EN.md"
    require(
        any("duplicate canonical_path" in item or "missing canonical chapters" in item for item in errors_for(replacement_path, status)),
        "duplicate replacement path was accepted as complete coverage",
    )

    missing_project_record = copy.deepcopy(registry)
    missing_project_record["records"][2]["sources"][0]["path"] = "docs/does-not-exist.md"
    require(
        any("project record does not exist" in item for item in errors_for(missing_project_record, status)),
        "missing local provenance was accepted",
    )

    community_only = copy.deepcopy(registry)
    community_only["records"][8]["sources"] = [community_only["records"][8]["sources"][1]]
    require(
        any("require an authoritative_platform" in item for item in errors_for(community_only, status)),
        "community report satisfied authoritative product support",
    )

    missing_community_boundary = copy.deepcopy(registry)
    del missing_community_boundary["records"][8]["sources"][1]["root_cause_status"]
    require(
        any("requires controlled root_cause_status" in item for item in errors_for(missing_community_boundary, status)),
        "community report without a root-cause boundary was accepted",
    )

    inflated_registry = copy.deepcopy(registry)
    inflated_registry["status"] = "production-ready"
    require(
        any("status must remain candidate" in item for item in errors_for(inflated_registry, status)),
        "registry maturity inflation was accepted",
    )

    false_universal = copy.deepcopy(registry)
    false_universal["records"][2]["platforms"] = ["universal", "codex"]
    require(
        any("universal_core must use only" in item for item in errors_for(false_universal, status)),
        "universal-core platform inflation was accepted",
    )

    unsupported_named_platform = copy.deepcopy(registry)
    unsupported_named_platform["records"][10]["sources"] = [
        source for source in unsupported_named_platform["records"][10]["sources"]
        if "claude-code" not in source.get("platforms", [])
    ]
    require(
        any("every concrete platform needs" in item for item in errors_for(unsupported_named_platform, status)),
        "a named platform without matching first-party support was accepted",
    )

    print("PAGE_TRUST_REGISTRY_TESTS_OK fixtures=13")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
