"""Negative and package fixtures for the local First Win pilot kit."""

from __future__ import annotations

import copy
import json
import shutil
import tempfile
from argparse import Namespace
from datetime import date, timedelta
from pathlib import Path
from unittest.mock import patch

import first_win_pilot_kit as kit


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def require_raises(callback, fragment: str, message: str) -> None:
    try:
        callback()
    except ValueError as exc:
        require(fragment in str(exc), message)
    else:
        raise AssertionError(message)


def main() -> int:
    contract = kit.load_json(kit.CONTRACT_PATH)
    require(not kit.validate_contract(contract), "checked-in pilot kit contract is invalid")

    promoted = copy.deepcopy(contract)
    promoted["status"] = "verified"
    require(any("candidate" in error for error in kit.validate_contract(promoted)), "unrun pilot kit was promoted")

    missing_scorer_file = copy.deepcopy(contract)
    missing_scorer_file["package_paths"] = [path for path in missing_scorer_file["package_paths"] if path != "moderator/scorer-key.md"]
    require(any("layout" in error for error in kit.validate_contract(missing_scorer_file)), "participant package without restricted scorer key was accepted")

    changed_help = copy.deepcopy(contract)
    changed_help["allowed_help_codes"] = ["none"]
    require(any("help" in error for error in kit.validate_contract(changed_help)), "v2 help vocabulary drift was accepted")

    require_raises(lambda: kit.safe_entry_url("https://user:secret@example.test/"), "credentials", "credential-bearing entry URL was accepted")
    require_raises(lambda: kit.safe_entry_url("https://example.test/?token=secret"), "query", "query-bearing entry URL was accepted")
    require_raises(lambda: kit.safe_entry_url("https://example.test/#private"), "fragment", "fragment-bearing entry URL was accepted")
    require_raises(lambda: kit.safe_label(None, "moderator"), "role alias", "non-string role alias was accepted")

    with patch.object(kit, "candidate_exists", return_value=True), patch.object(kit, "git_bytes", side_effect=ValueError("candidate missing does not contain docs/governance/first-win-pilot-kit.yaml")):
        require_raises(lambda: kit.validate_candidate_sources(contract, "b" * 40), "does not contain", "candidate without the pilot-kit contract was accepted")
    candidate_sources = {
        path: (kit.ROOT / path).read_bytes()
        for path in [contract["contract_path"], contract["protocol_path"], contract["starter_contract_path"], *contract["public_surface"]["source_paths"]]
    }
    synthetic_sha = "a" * 40

    with tempfile.TemporaryDirectory() as temporary:
        output = Path(temporary) / "pilot-package"
        args = Namespace(
            candidate_sha=synthetic_sha, output_dir=str(output), pilot_authorizer="pilot-authorizer",
            privacy_owner="privacy-owner", moderator="moderator", independent_scorer="independent-scorer",
            deletion_owner="deletion-owner", recruitment_channel="private-volunteers", retention_end=(date.today() + timedelta(days=30)).isoformat(),
            locale="en", model_surface="universal-chat", browser_os_viewport="windows-chromium-390",
            entry_url="",
        )
        with patch.object(kit, "candidate_exists", return_value=True), patch.object(kit, "git_bytes", side_effect=lambda sha, path: candidate_sources[path]):
            conflicting_roles = copy.copy(args)
            conflicting_roles.independent_scorer = args.moderator
            require_raises(lambda: kit.build_package(contract, conflicting_roles), "distinct role aliases", "pilot package accepted one person as both scoring roles")

            changed_contract = copy.deepcopy(contract)
            changed_contract["owner"] = "another-owner"
            require_raises(lambda: kit.validate_candidate_sources(changed_contract, synthetic_sha), "does not match", "candidate contract drift was accepted")

            kit.build_package(contract, args)
            require(not kit.validate_package(output, contract), "generated package is invalid")
            worksheet = (output / "participant/worksheet.md").read_text(encoding="utf-8")
            require("Baseline answer key" not in worksheet, "participant worksheet exposes the scoring key")

            manifest_path = output / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["source_files"][0]["sha256"] = "0" * 64
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            require(any("digests" in error for error in kit.validate_package(output, contract)), "tampered candidate source digest was accepted")

            manifest["source_files"][0]["sha256"] = kit.sha256(candidate_sources[manifest["source_files"][0]["path"]])
            manifest["conditions"]["retention_end"] = (date.today() - timedelta(days=1)).isoformat()
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            require(any("retention_end" in error for error in kit.validate_package(output, contract)), "expired package retention date was accepted")

            manifest["conditions"]["retention_end"] = args.retention_end
            manifest["entry_url"] = "https://example.test/?session=private"
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            require(any("entry_url" in error for error in kit.validate_package(output, contract)), "unsafe package entry URL was accepted")

            manifest["entry_url"] = None
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            manifest["roles"]["independent_scorer"] = manifest["roles"]["moderator"]
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            require(any("distinct role aliases" in error for error in kit.validate_package(output, contract)), "package with collapsed scoring roles was accepted")

            manifest["roles"]["independent_scorer"] = args.independent_scorer
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            (output / "notes.txt").write_text("do not store participant notes here", encoding="utf-8")
            require(any("untracked files" in error for error in kit.validate_package(output, contract)), "unexpected package file was accepted")

            (output / "notes.txt").unlink()
            manifest["roles"] = []
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            require(any("manifest.roles must be an object" in error for error in kit.validate_package(output, contract)), "malformed package role map caused no validation error")

            shutil.rmtree(output)
            output.mkdir()
            (output / "existing.txt").write_text("do not overwrite", encoding="utf-8")
            try:
                kit.build_package(contract, args)
            except ValueError as exc:
                require("must not already contain files" in str(exc), "existing output was rejected for the wrong reason")
            else:
                raise AssertionError("existing pilot output was overwritten")

    print("FIRST_WIN_PILOT_KIT_TESTS_OK fixtures=17")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
