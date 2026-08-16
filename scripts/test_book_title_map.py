"""Regression fixtures for the generated chapter title projection."""

from __future__ import annotations

import copy

import build_book_title_map as title_map
import build_site_locale_manifest as locale_manifest
import build_site_search_index as search_index


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    navigation = title_map.load_json(title_map.NAVIGATION_FILE)
    expected = title_map.expected_title_map(navigation)
    title_map.records_by_id(expected)
    require(len(expected["chapters"]) == 22, "title projection must contain all 22 chapters")
    require(
        expected["chapters"][0]["canonical"]["en"] != expected["chapters"][0]["display"]["en"],
        "fixture needs distinct canonical and display title roles",
    )

    stale = copy.deepcopy(expected)
    stale["chapters"][0]["display"]["en"] = "Wrong compact title"
    try:
        title_map.assert_current_title_map(stale, navigation)
    except ValueError:
        pass
    else:
        raise AssertionError("stale generated title map was accepted")

    toc = title_map.ENGLISH_TOC.read_text(encoding="utf-8")
    broken_toc = toc.replace(
        "### Chapter 1 — Understand GPT before understanding how Codex works",
        "### Chapter 1 — Wrong compact title",
        1,
    )
    require(title_map.expected_toc(broken_toc, expected) != broken_toc, "TOC title drift was accepted")

    duplicate = copy.deepcopy(expected)
    duplicate["chapters"][1]["id"] = duplicate["chapters"][0]["id"]
    try:
        title_map.records_by_id(duplicate)
    except ValueError:
        pass
    else:
        raise AssertionError("duplicate title-map chapter ID was accepted")

    manifest = locale_manifest.build_manifest()
    search = search_index.build_index()
    search_by_id = {item["content_id"]: item for item in search["documents"]}
    for record in expected["chapters"]:
        reader_record = next(
            item for item in manifest["book_navigation"]["chapters"]
            if item["id"] == record["id"]
        )
        require(
            reader_record["title_en"] == record["display"]["en"]
            and reader_record["title_zh"] == record["display"]["zh"],
            f"Reader did not consume display titles for {record['id']}",
        )
        require(
            reader_record["canonical_title_en"] == record["canonical"]["en"]
            and reader_record["canonical_title_zh"] == record["canonical"]["zh"],
            f"Reader did not consume canonical titles for {record['id']}",
        )
        search_record = search_by_id[reader_record["content_id"]]
        require(
            search_record["locales"]["en"]["title"] == record["canonical"]["en"],
            f"Search did not consume canonical English title for {record['id']}",
        )

    print("BOOK_TITLE_MAP_TESTS_OK fixtures=5 surfaces=toc,reader,search")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
