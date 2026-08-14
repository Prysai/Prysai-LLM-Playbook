"""Audit the six source archives used to seed Prysai LLM Playbook.

The script is intentionally read-only. It reports archive fingerprints,
contents, SKILL.md metadata, duplicate names, and license-file signals without
extracting or modifying the source archives.
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path


ARCHIVES = {
    "S01": Path(r"D:/downloads/codex-orange-book-main.zip"),
    "S02": Path(r"D:/downloads/academic-research-skills-codex-main.zip"),
    "S03": Path(r"D:/downloads/awesome-agent-skills-main.zip"),
    "S04": Path(r"D:/downloads/marketingskills-main.zip"),
    "S05": Path(r"D:/downloads/agent-skills-main.zip"),
    "S06": Path(r"D:/downloads/awesome-codex-skills-master.zip"),
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest().upper()


def skill_metadata(archive: zipfile.ZipFile, name: str) -> dict[str, object]:
    text = archive.read(name).decode("utf-8", errors="replace")
    name_match = re.search(
        r"(?ms)^---\s*\n.*?^name:\s*[\"']?([^\n\"']+).*?\n---",
        text,
    )
    description_match = re.search(r"(?m)^description:\s*(.+?)\s*$", text)
    folder = Path(name).parent.name
    return {
        "path": name,
        "folder": folder,
        "name": name_match.group(1).strip() if name_match else "",
        "description": description_match.group(1).strip()
        if description_match
        else "",
        "lines": len(text.splitlines()),
    }


def audit(source_id: str, path: Path) -> dict[str, object]:
    if not path.is_file():
        return {"source_id": source_id, "path": str(path), "status": "missing"}

    with zipfile.ZipFile(path) as archive:
        names = [item.filename for item in archive.infolist() if not item.is_dir()]
        skill_names = [name for name in names if name.endswith("/SKILL.md") or name == "SKILL.md"]
        metadata = [skill_metadata(archive, name) for name in skill_names]
        folder_names = sorted({Path(name).parent.name for name in skill_names})
        license_files = [
            name
            for name in names
            if re.search(r"(^|/)(LICENSE|COPYING|NOTICE)(\.|$)", name, re.I)
        ]
        extensions = Counter(Path(name).suffix.lower() or "[none]" for name in names)

    skill_values = [str(item["name"]) for item in metadata if item["name"]]
    invalid_names = sorted(
        {
            value
            for value in skill_values
            if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", value)
        }
    )
    duplicate_names = sorted(
        value for value, count in Counter(skill_values).items() if count > 1
    )
    return {
        "source_id": source_id,
        "path": str(path),
        "status": "ok",
        "bytes": path.stat().st_size,
        "sha256": sha256(path),
        "files": len(names),
        "skill_files": len(skill_names),
        "skill_folders": len(folder_names),
        "license_signals": license_files,
        "extensions": dict(extensions.most_common(12)),
        "empty_descriptions": sum(not item["description"] for item in metadata),
        "invalid_skill_names": invalid_names,
        "duplicate_skill_names": duplicate_names,
        "skills": metadata,
    }


def main() -> int:
    report = {source_id: audit(source_id, path) for source_id, path in ARCHIVES.items()}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if all(item["status"] == "ok" for item in report.values()) else 1


if __name__ == "__main__":
    sys.exit(main())
