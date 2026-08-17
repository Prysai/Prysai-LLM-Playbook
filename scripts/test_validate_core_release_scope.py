"""Negative fixtures for the LLM foundation core scope gate."""

from __future__ import annotations

import copy

import validate_core_release_scope as validator


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    inventory = validator.load_inventory()
    require(validator.validate_inventory(inventory) == [], "valid inventory was rejected")
    require(
        validator.validate_contract_text(
            contract_text=validator.CONTRACT.read_text(encoding="utf-8"),
            scope_text=validator.SCOPE.read_text(encoding="utf-8"),
        )
        == [],
        "valid contract text was rejected",
    )

    duplicate = copy.deepcopy(inventory)
    duplicate["core_units"][1]["id"] = duplicate["core_units"][0]["id"]
    require(
        any("duplicate core unit id" in error for error in validator.validate_inventory(duplicate)),
        "duplicate unit was accepted",
    )

    missing_source = copy.deepcopy(inventory)
    missing_source["core_units"][0]["source_paths"] = ["book/does-not-exist.md"]
    require(
        any("source path is missing" in error for error in validator.validate_inventory(missing_source)),
        "missing source was accepted",
    )

    missing_outcome = copy.deepcopy(inventory)
    missing_outcome["core_units"][4]["outcome"] = "mastery"
    require(
        any("five outcomes" in error for error in validator.validate_inventory(missing_outcome)),
        "unsupported outcome was accepted",
    )

    duplicate_classification = copy.deepcopy(inventory)
    duplicate_classification["advanced"][0]["source_paths"] = ["book/guides/llm-fundamentals-EN.md"]
    require(
        any("multiple primary owners" in error for error in validator.validate_inventory(duplicate_classification)),
        "a source classified as both core and advanced was accepted",
    )

    incomplete_scope = validator.SCOPE.read_text(encoding="utf-8").replace("## 停止条件", "## removed", 1)
    require(
        any("停止条件" in error for error in validator.validate_contract_text(contract_text=validator.CONTRACT.read_text(encoding="utf-8"), scope_text=incomplete_scope)),
        "incomplete scope freeze was accepted",
    )

    print("CORE_RELEASE_SCOPE_TESTS_OK fixtures=5")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
