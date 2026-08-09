"""Build a read-only, searchable index of Skill candidates in source archives.

The index is discovery metadata only. It does not extract, install, copy, or
approve any source Skill. Every candidate remains subject to the Atlas source,
license, dependency, boundary, and evaluation gates.
"""

from __future__ import annotations

import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARCHIVES = {
    "S01": Path(r"D:/downloads/codex-orange-book-main.zip"),
    "S02": Path(r"D:/downloads/academic-research-skills-codex-main.zip"),
    "S03": Path(r"D:/downloads/awesome-agent-skills-main.zip"),
    "S04": Path(r"D:/downloads/marketingskills-main.zip"),
    "S05": Path(r"D:/downloads/agent-skills-main.zip"),
    "S06": Path(r"D:/downloads/awesome-codex-skills-master.zip"),
}

SOURCE_META = {
    "S01": {
        "upstream": "bozhouDev/codex-orange-book",
        "license": "no explicit license signal found",
        "gate": "reference-only",
    },
    "S02": {
        "upstream": "Imbad0202/academic-research-skills-codex",
        "license": "CC BY-NC 4.0; NOTICE and nested license files present",
        "gate": "license-review-required",
    },
    "S03": {
        "upstream": "VoltAgent/awesome-agent-skills",
        "license": "MIT signal recorded in source register",
        "gate": "index-only",
    },
    "S04": {
        "upstream": "coreyhaines31/marketingskills",
        "license": "MIT signal recorded in source register",
        "gate": "adaptation-candidate",
    },
    "S05": {
        "upstream": "addyosmani/agent-skills",
        "license": "MIT signal recorded in source register",
        "gate": "adaptation-candidate",
    },
    "S06": {
        "upstream": "composio-community/awesome-codex-skills",
        "license": "root Apache-2.0 signal; nested licenses require review",
        "gate": "dependency-and-license-review",
    },
}


def normalize(value: str) -> str:
    value = value.strip().strip("'\"")
    return re.sub(r"\s+", " ", value)


def parse_frontmatter(text: str, fallback: str) -> tuple[str, str]:
    if not text.startswith("---"):
        return fallback, ""
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return fallback, ""

    fields: dict[str, str] = {}
    current: str | None = None
    for line in lines[1:]:
        if line.strip() == "---":
            break
        match = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if match:
            current = match.group(1)
            fields[current] = match.group(2).strip()
            continue
        if current and line.startswith((" ", "\t")):
            fields[current] += " " + line.strip()

    name = normalize(fields.get("name", "")) or fallback
    description = normalize(fields.get("description", ""))
    if description in {">", "|"}:
        description = ""
    return name, description


def skill_files(archive: zipfile.ZipFile) -> list[str]:
    return sorted(
        name
        for name in archive.namelist()
        if not name.endswith("/") and Path(name).name.lower() == "skill.md"
    )


def candidate_record(source_id: str, archive_path: Path, archive: zipfile.ZipFile, path: str) -> dict[str, object]:
    text = archive.read(path).decode("utf-8", errors="replace")
    fallback = Path(path).parent.name
    name, description = parse_frontmatter(text, fallback)
    valid_name = bool(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name))
    flags: list[str] = []
    if not description:
        flags.append("missing-description-or-unparsed-description")
    if not valid_name:
        flags.append("non-normalized-name")
    if source_id == "S02":
        flags.append("cc-by-nc-license-review")
    if source_id == "S06":
        flags.extend(("nested-license-review", "external-dependency-review"))

    return {
        "source_id": source_id,
        "upstream": SOURCE_META[source_id]["upstream"],
        "archive": str(archive_path),
        "path": path.replace("\\", "/"),
        "name": name,
        "description": description,
        "license_signal": SOURCE_META[source_id]["license"],
        "initial_gate": SOURCE_META[source_id]["gate"],
        "status": "unreviewed-candidate",
        "flags": flags,
        "lines": len(text.splitlines()),
    }


def build() -> dict[str, object]:
    sources: list[dict[str, object]] = []
    candidates: list[dict[str, object]] = []
    for source_id, path in ARCHIVES.items():
        if not path.is_file():
            sources.append({
                "source_id": source_id,
                "archive": str(path),
                "status": "missing",
                "skill_count": 0,
            })
            continue
        with zipfile.ZipFile(path) as archive:
            paths = skill_files(archive)
            entries = [candidate_record(source_id, path, archive, item) for item in paths]
            candidates.extend(entries)
            sources.append({
                "source_id": source_id,
                "upstream": SOURCE_META[source_id]["upstream"],
                "archive": str(path),
                "status": "ok",
                "skill_count": len(paths),
                "gate": SOURCE_META[source_id]["gate"],
            })

    name_counts = Counter(str(item["name"]) for item in candidates)
    for item in candidates:
        if name_counts[str(item["name"])] > 1:
            item["flags"].append("duplicate-name-in-input-set")

    return {
        "generated_date": "2026-08-09",
        "mode": "read-only archive metadata scan",
        "purpose": "Discovery index only; not an approval or installation list.",
        "source_register": "docs/sources/asset-register.md",
        "sources": sources,
        "summary": {
            "source_archives": len(ARCHIVES),
            "candidate_skill_files": len(candidates),
            "by_source": dict(Counter(str(item["source_id"]) for item in candidates)),
            "with_flags": sum(bool(item["flags"]) for item in candidates),
        },
        "candidates": candidates,
    }


def markdown(report: dict[str, object]) -> str:
    lines = [
        "# 外部 Skill 候选目录",
        "",
        "> 这是由六个输入压缩包生成的只读检索索引，不是安装清单、质量排名或发行批准清单。每个条目仍需通过来源、许可证、依赖、触发边界、失败路径和新鲜上下文评测。",
        "",
        f"**生成日期：** {report['generated_date']}",
        f"**候选 Skill 文件：** {report['summary']['candidate_skill_files']}",
        "**数据来源：** `docs/sources/asset-register.md` 与本地压缩包指纹记录",
        "",
        "## 来源概览",
        "",
        "| 来源 | 上游 | Skill 文件数 | 初始门禁 | 说明 |",
        "|---|---|---:|---|---|",
    ]
    for source in report["sources"]:
        meta = SOURCE_META[source["source_id"]]
        lines.append(
            f"| {source['source_id']} | {meta['upstream']} | {source['skill_count']} | {meta['gate']} | {meta['license']} |"
        )

    lines.extend(
        [
            "",
            "## 使用方法",
            "",
            "1. 先按任务目标、生命周期阶段和风险筛选，不按目录数量或热度筛选。",
            "2. 回到来源压缩包和上游项目核对完整内容、许可证、依赖和认证要求。",
            "3. 将候选内容改写为 Atlas 的任务协议、实验、证据标准和失败案例。",
            "4. 通过正例、边界例、失败例、迁移例和新鲜上下文前测后，才可进入 `docs/skill-registry.md`。",
            "",
            "## 条目索引",
            "",
            "| 来源 | 名称 | 描述摘要 | 压缩包路径 | 初始状态 |",
            "|---|---|---|---|---|",
        ]
    )
    for item in report["candidates"]:
        description = str(item["description"]).replace("|", "\\|")
        if len(description) > 180:
            description = description[:177] + "..."
        lines.append(
            f"| {item['source_id']} | `{item['name']}` | {description or '（未解析到描述，需人工检查）'} | `{item['path']}` | {item['status']} |"
        )
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    report = build()
    json_path = ROOT / "docs/sources/skill-candidate-catalog-2026-08-09.json"
    markdown_path = ROOT / "docs/sources/skill-candidate-catalog.md"
    json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    markdown_path.write_text(markdown(report), encoding="utf-8")
    print(f"SKILL_CATALOG_OK candidates={report['summary']['candidate_skill_files']}")
    print(f"json={json_path}")
    print(f"markdown={markdown_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
