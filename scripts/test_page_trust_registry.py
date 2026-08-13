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
    unpinned["records"][2]["sources"][0]["url"] = (
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

    print("PAGE_TRUST_REGISTRY_TESTS_OK fixtures=5")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
