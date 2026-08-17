"""Boundary fixtures for the public-site inventory consistency check."""

from __future__ import annotations

import validate_site_i18n as i18n


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    current_copy = (
        "18 reusable Skills · candidate; 18 project Skills; Skills · 18; "
        "all 18 methods; 18 个项目 Skill; Skill · 18; 18 个可复用 Skill"
    )
    errors: list[str] = []
    i18n.validate_skill_count_copy(current_copy, 18, errors)
    require(not errors, "matching Skill counts were rejected")

    stale_errors: list[str] = []
    i18n.validate_skill_count_copy("16 reusable Skills · candidate", 18, stale_errors)
    require(stale_errors, "a stale Skill count was accepted")
    require(
        "content-status skills.count 18" in stale_errors[0],
        "the stale-count error did not name the current source of truth",
    )

    absent_errors: list[str] = []
    i18n.validate_skill_count_copy("no inventory phrase", 18, absent_errors)
    require(absent_errors == ["site Skill inventory copy is missing"], "missing inventory copy was accepted")

    coverage_errors: list[str] = []
    i18n.validate_localization_coverage(
        {
            "routed_status_counts": {"chapters": 22, "labs": 18},
            "localization_coverage": {
                "en": {"total_units": 40, "available_units": 40, "source_units": 40, "candidate_translation_units": 0, "reviewed_translation_units": 0},
                "zh": {"total_units": 40, "available_units": 8, "source_units": 0, "candidate_translation_units": 8, "reviewed_translation_units": 0},
                "es": {"total_units": 40, "available_units": 4, "source_units": 0, "candidate_translation_units": 4, "reviewed_translation_units": 0},
                "ja": {"total_units": 40, "available_units": 4, "source_units": 0, "candidate_translation_units": 4, "reviewed_translation_units": 0},
                "ko": {"total_units": 40, "available_units": 4, "source_units": 0, "candidate_translation_units": 4, "reviewed_translation_units": 0},
                "de": {"total_units": 40, "available_units": 4, "source_units": 0, "candidate_translation_units": 4, "reviewed_translation_units": 0},
            },
        },
        coverage_errors,
    )
    require(not coverage_errors, "valid partial locale coverage was rejected")

    incomplete_errors: list[str] = []
    i18n.validate_localization_coverage(
        {
            "routed_status_counts": {"chapters": 22, "labs": 18},
            "localization_coverage": {
                locale: {"total_units": 40, "available_units": 40 if locale == "en" else 4, "source_units": 40 if locale == "en" else 0, "candidate_translation_units": 0 if locale == "en" else 3, "reviewed_translation_units": 0}
                for locale in ("en", "zh", "es", "ja", "ko", "de")
            },
        },
        incomplete_errors,
    )
    require(any("must add up" in error for error in incomplete_errors), "inconsistent translation coverage was accepted")

    public_coverage = {
        "en": {"available_units": 40, "total_units": 40},
        "zh": {"available_units": 17, "total_units": 40},
    }
    public_copy_errors: list[str] = []
    i18n.validate_public_coverage_table(
        "| English | 40 / 40 | Source |\n| 简体中文 | 17 / 40 | Candidate |\n",
        {"English": "en", "简体中文": "zh"},
        public_coverage,
        "fixture.md",
        public_copy_errors,
    )
    require(not public_copy_errors, "matching public locale coverage was rejected")

    stale_public_copy_errors: list[str] = []
    i18n.validate_public_coverage_table(
        "| English | 40 / 40 | Source |\n| 简体中文 | 16 / 40 | Candidate |\n",
        {"English": "en", "简体中文": "zh"},
        public_coverage,
        "fixture.md",
        stale_public_copy_errors,
    )
    require(
        stale_public_copy_errors == [
            "fixture.md course coverage for 简体中文 must match locale manifest: expected 17 / 40, found 16 / 40"
        ],
        "stale public locale coverage was accepted or reported unclearly",
    )

    translated = i18n.translation_keys(
        "Object.assign(copy.es, { skillPlatformObservationName: 'Registro' });",
        "es",
        {"skillPlatformObservationName", "skillPlatformObservation"},
    )
    require(
        translated == {"skillPlatformObservationName"},
        "localized dictionary extraction hid a missing public-page key",
    )

    ordering_errors: list[str] = []
    i18n.validate_copy_initialization_order(
        "Object.assign(copy.es, { name: 'too early' });\ncopy.es = { name: 'ready' };",
        ordering_errors,
    )
    require(
        ordering_errors == [
            "de primary translation dictionary is missing",
            "es translation override appears before its primary dictionary",
            "ja primary translation dictionary is missing",
            "ko primary translation dictionary is missing",
        ],
        "an early locale override was accepted",
    )

    print("SITE_I18N_TESTS_OK fixtures=9")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
