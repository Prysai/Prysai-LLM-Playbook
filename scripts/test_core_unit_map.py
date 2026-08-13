"""Negative fixtures for canonical transferable-core ownership."""

from __future__ import annotations

import copy

import validate_core_unit_map as core


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    document = core.load_object(core.MAP_PATH)
    require(core.validate_document(document) == [], "valid core-unit map was rejected")

    duplicate_owner = copy.deepcopy(document)
    duplicate_owner["units"][1]["owner_path"] = duplicate_owner["units"][0]["owner_path"]
    require(any("duplicate owner_path" in item for item in core.validate_document(duplicate_owner)), "duplicate owner was accepted")

    missing_anchor = copy.deepcopy(document)
    missing_anchor["units"][0]["start_anchor"] = "does-not-exist"
    require(any("ordered start and end anchor" in item for item in core.validate_document(missing_anchor)), "missing anchor was accepted")

    cycle = copy.deepcopy(document)
    cycle["units"][0]["depends_on"] = ["core-action-boundary"]
    require(any("contains a cycle" in item for item in core.validate_document(cycle)), "dependency cycle was accepted")

    invalid_consumer = copy.deepcopy(document)
    invalid_consumer["units"][0]["consumer_paths"] = ["book/chapters/does-not-exist-EN.md"]
    require(any("invalid consumer path" in item for item in core.validate_document(invalid_consumer)), "invalid consumer was accepted")

    mixed_page_promotion = copy.deepcopy(document)
    mixed_page_promotion["units"][0]["owner_path"] = "book/chapters/05-choose-the-codex-surface-EN.md"
    require(any("duplicate owner_path" in item or "owner needs" in item for item in core.validate_document(mixed_page_promotion)), "mixed page was promoted without a bounded range")

    print("CORE_UNIT_MAP_TESTS_OK fixtures=5")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
