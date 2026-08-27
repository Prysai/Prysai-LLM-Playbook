"""Negative fixtures for the canonical Skill registry."""

from __future__ import annotations

import copy
import re

import validate_skill_registry as registry


def require_error(value: dict, fragment: str) -> None:
    errors = registry.validate(registry.ROOT, value)
    if not any(fragment in error for error in errors):
        raise AssertionError(f"expected {fragment!r}; got {errors}")


def main() -> int:
    baseline = registry.load_object(registry.ROOT / registry.REGISTRY_PATH)
    if registry.validate(registry.ROOT, baseline):
        raise AssertionError("baseline registry is invalid")
    skill_count = len(baseline["records"])
    stale_count = skill_count - 1

    missing = copy.deepcopy(baseline)
    missing["records"].pop()
    require_error(missing, "unregistered Skill directory")
    require_error(missing, "routing matrix Skill missing from registry")

    frontdoor_documents = {
        path: (registry.ROOT / path).read_text(encoding="utf-8")
        for path in registry.FRONTDOOR_SKILL_COUNT_PATTERNS
    }
    stale_frontdoor = dict(frontdoor_documents)
    stale_frontdoor["README.md"] = re.sub(
        rf"(?m)^(\|\s*Skills\s*\|\s*){skill_count}(?=\s)",
        rf"\g<1>{stale_count}",
        stale_frontdoor["README.md"],
        count=1,
    )
    if not any(
        f"README.md: project Skill count must be {skill_count}, not {stale_count}" in error
        for error in registry.frontdoor_skill_count_errors(skill_count, stale_frontdoor)
    ):
        raise AssertionError("stale README Skill count was not rejected")

    orphan = copy.deepcopy(baseline)
    orphan["records"][0]["id"] = "prysai-orphan"
    orphan["records"][0]["path"] = "skills/prysai-orphan"
    require_error(orphan, "registered Skill directory is missing")

    duplicate = copy.deepcopy(baseline)
    duplicate["records"][1]["public_name"] = duplicate["records"][0]["public_name"]
    require_error(duplicate, "duplicate public_name")

    bad_version = copy.deepcopy(baseline)
    bad_version["records"][0]["version"] = "v1"
    require_error(bad_version, "version must be SemVer")

    bad_date = copy.deepcopy(baseline)
    bad_date["records"][0]["review_date"] = "later"
    require_error(bad_date, "review_date must be an ISO date")

    bad_source = copy.deepcopy(baseline)
    bad_source["records"][0]["asset_source_ids"] = ["S9999"]
    require_error(bad_source, "unresolved asset source id")

    bad_origin = copy.deepcopy(baseline)
    bad_origin["records"][0]["upstream_url"] = "https://example.com/copied"
    require_error(bad_origin, "original Skill must not declare upstream_url")

    bad_adapted = copy.deepcopy(baseline)
    bad_adapted["records"][0]["origin"] = "adapted"
    bad_adapted["records"][0]["upstream_url"] = None
    require_error(bad_adapted, "adapted Skill requires a canonical HTTPS upstream_url")

    bad_vendored = copy.deepcopy(baseline)
    bad_vendored["records"][0]["origin"] = "vendored"
    bad_vendored["records"][0]["upstream_url"] = "local-copy"
    require_error(bad_vendored, "vendored Skill requires a canonical HTTPS upstream_url")

    bad_license = copy.deepcopy(baseline)
    bad_license["records"][0]["license"]["expression"] = "unknown"
    require_error(bad_license, "unknown or unsupported license expression")

    bad_maintenance = copy.deepcopy(baseline)
    bad_maintenance["records"][0]["owner"] = "someone-else"
    require_error(bad_maintenance, "maintenance owner differs from registry")

    print("SKILL_REGISTRY_TESTS_OK fixtures=12")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
