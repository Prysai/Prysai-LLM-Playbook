"""Negative fixtures for the bounded Pages artifact builder."""

from __future__ import annotations

import os
import xml.etree.ElementTree as ET
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch
from urllib.parse import parse_qs, urlparse

import build_pages_artifact
import build_site_locale_manifest
from build_pages_artifact import (
    SPACE_README_FRONTMATTER,
    artifact_secret_findings,
    forbidden_publish_paths,
    load_seo_config,
    root_index,
    pages_reader_alias,
    seo_files,
    sitemap_index_file,
    sitemap_urls,
    source_symlinks,
    space_readme,
    validate_artifact,
)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    config = load_seo_config()
    robots, sitemap = seo_files(config)
    root = ET.fromstring(sitemap)
    namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    urls = [item.text for item in root.findall(f"{namespace}url/{namespace}loc")]
    require(len(urls) > len(config["locales"]), "sitemap regressed to locale entry pages only")
    require(config["public_site_url"] in urls, "sitemap omitted the canonical English entry")
    require(any("reader.html?path=book%2Fchapters%2F" in url and "&lang=en" in url for url in urls), "sitemap omitted an English chapter Reader route")
    require(any("reader.html?path=book%2Froutes%2F" in url and "&lang=zh" in url for url in urls), "sitemap omitted an indexable translated Reader route")
    manifest = build_site_locale_manifest.build_manifest()
    records_by_route = {
        (str(record.get("path")), locale): record
        for content in manifest["contents"].values()
        for locale, record in content.get("locales", {}).items()
        if isinstance(record, dict)
    }
    reader_urls = [url for url in urls if "/site/reader.html?" in url]
    require(reader_urls, "sitemap omitted all Reader routes")
    for url in reader_urls:
        query = parse_qs(urlparse(url).query)
        path = query.get("path", [""])[0]
        locale = query.get("lang", [""])[0]
        record = records_by_route.get((path, locale))
        require(record is not None, f"sitemap contains an unregistered Reader route: {url}")
        require(record.get("content_status") in {"candidate", "verified", "production-ready"}, f"sitemap contains draft content: {url}")
        require(record.get("translation_status") in {"source", "candidate", "verified", "production-ready"}, f"sitemap contains an in-progress translation: {url}")
    require(not any("lab-018-language-transfer" in url for url in urls), "sitemap exposed a draft lab")
    require("Sitemap: " + config["public_site_url"] + "sitemap.xml" in robots, "robots.txt does not point to the canonical sitemap")
    card_readme = space_readme("# Prysai LLM Playbook\n")
    require(card_readme.startswith(SPACE_README_FRONTMATTER), "Space README metadata was not added")
    require("sdk: static" in card_readme, "Space README metadata did not select the static SDK")
    root_entry = root_index(Path(__file__).resolve().parents[1] / "site/index.html")
    require('<base href="site/index.html" />' in root_entry, "Pages root entry must use an explicit site document as its base URL")
    require('<base href="site/" />' not in root_entry, "Pages root entry must not resolve fragment links through a directory route")
    require('href="https://docs.prysai.com/llm-playbook/" target="_top"' in root_entry, "Playbook logo must return the top-level window to the canonical Docs URL from hosted wrappers")
    reader_alias = pages_reader_alias(Path(__file__).resolve().parents[1] / "site/reader.html")
    require('<base href="site/reader.html" />' in reader_alias, "root Reader alias must resolve assets through site/reader.html")
    require("window.CODEX_PAGES_ARTIFACT = true" in reader_alias, "root Reader alias must retain artifact routing mode")
    index = ET.fromstring(sitemap_index_file(config))
    index_urls = [item.text for item in index.findall(f"{namespace}sitemap/{namespace}loc")]
    require(index_urls == [config["public_site_url"] + "sitemap.xml"], "sitemap_index.xml does not point to the canonical sitemap")
    require(len(sitemap_urls(config)) == len(urls), "sitemap URL generation is not deterministic")

    with TemporaryDirectory(prefix="pages-artifact-fixtures-") as temporary:
        artifact = Path(temporary) / "artifact"
        artifact.mkdir()
        safe = artifact / "notes.md"
        safe.write_text(
            "A token is a concept. Hash abcdef0123456789 and UUID 123e4567-e89b-12d3-a456-426614174000 are not credentials.\n",
            encoding="utf-8",
        )
        require(not artifact_secret_findings(artifact), "ordinary teaching text was treated as a credential")

        redacted = artifact / "redacted.md"
        redacted.write_text("Example only: ghp_[redacted] and sk-REDACTED are not live credentials.\n", encoding="utf-8")
        require(not artifact_secret_findings(artifact), "redacted examples were treated as credentials")

        for name, value, rule in (
            ("github.md", "gh" + "p_" + "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH", "github-classic-token"),
            ("provider.md", "s" + "k-ant-" + "abcdefghijklmnopqrstuvwxyz1234567890", "anthropic-api-key"),
            ("key.txt", "-----BEGIN " + "PRIVATE KEY-----", "private-key"),
        ):
            fixture = artifact / name
            fixture.write_text(value, encoding="utf-8")
            findings = artifact_secret_findings(artifact)
            require(any(item == f"{rule}:{name}" for item in findings), f"{rule} was not detected")
            require(all(value not in item for item in findings), f"{rule} finding exposed the credential value")
            fixture.unlink()

        for index, spelling in enumerate(("release-checklist.md", "Release-Checklist.md", "release-Checklist.md"), start=1):
            source = Path(temporary) / f"source-{index}"
            internal_source = source / "DoCs" / spelling
            internal_source.parent.mkdir(parents=True)
            internal_source.write_text("maintainer-only", encoding="utf-8")
            require(
                forbidden_publish_paths(source) == [f"DoCs/{spelling}"],
                f"source boundary accepted forbidden path spelling: {spelling}",
            )

            artifact_copy = Path(temporary) / f"artifact-{index}"
            internal_artifact = artifact_copy / "dOcS" / spelling
            internal_artifact.parent.mkdir(parents=True)
            internal_artifact.write_text("maintainer-only", encoding="utf-8")
            require(
                forbidden_publish_paths(artifact_copy) == [f"dOcS/{spelling}"],
                f"artifact boundary accepted forbidden path spelling: {spelling}",
            )
            try:
                validate_artifact(artifact_copy)
            except ValueError as error:
                require(
                    str(error).startswith("forbidden internal paths leaked into Pages artifact:"),
                    f"artifact validator raised the wrong error for {spelling}: {error}",
                )
            else:
                raise AssertionError(f"validate_artifact accepted forbidden path spelling: {spelling}")

        with patch.object(build_pages_artifact, "forbidden_publish_paths", return_value=["docs/release-checklist.md"]):
            try:
                build_pages_artifact.validate_source()
            except ValueError as error:
                require(
                    str(error).startswith("forbidden internal source paths are not publishable:"),
                    f"source validator raised the wrong error: {error}",
                )
            else:
                raise AssertionError("validate_source did not enforce the forbidden-path guard")

        outside = Path(temporary) / "outside.txt"
        outside.write_text("outside", encoding="utf-8")
        link = source / "outside-link.txt"
        try:
            os.symlink(outside, link)
        except OSError:
            # Some Windows configurations restrict symlink creation. Linux CI
            # exercises the negative fixture; the checked-in source still runs
            # the production symlink scan on every platform.
            pass
        else:
            expected_link = f"{source.name}/outside-link.txt"
            require(source_symlinks([source]) == [expected_link], "published source symlink was not found")

    print(f"PAGES_ARTIFACT_TESTS_OK fixtures=13 secret-patterns=3 symlink=guarded sitemap={len(urls)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
