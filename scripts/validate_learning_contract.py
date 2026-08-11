"""Validate the teaching contract for Codex learning chapters and labs.

This checker deliberately validates observable curriculum structure rather than
judging prose quality. A chapter can use different headings for its acceptance
section, but it must still provide the same learning loop: problem, objective,
real-world entry, experiment setup, task, evidence, failure/boundary, reflection,
transfer, acceptance, and source/update boundaries.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ROOT / "book/chapters"
LABS = ROOT / "book/labs"

CHAPTER_CONTRACT = {
    # Keep both headings valid: early chapters use the explicit teaching
    # heading, while later chapters use the shorter project convention.
    "problem": re.compile(
        r"(?m)^##\s+(?:本章要解决的问题|问题(?:：.*)?|The problem this chapter solves|"
        r"Das Problem, das dieses Kapitel löst|Das Problem dieses Kapitels|"
        r"El problema que resuelve este capítulo|この章が解決する問題|"
        r"이 장에서 해결하는 문제|이 장이 해결하는 문제)\s*$",
        re.IGNORECASE,
    ),
    "objective": re.compile(
        r"(?m)^##\s+(?:学习目标|Learning objectives|Lernziele|Objetivos de aprendizaje|"
        r"学習目標|학습 목표)\s*$",
        re.IGNORECASE,
    ),
    "real_problem": re.compile(
        r"现实问题入口|真实问题入口|field cases?|real[- ]world (?:problem|cases?|entry point)|"
        r"现场案例|casos de campo|problemas reales|praxisfälle|reale Probleme|"
        r"現場の事例|現実の問題|현장 사례|실제 문제",
        re.IGNORECASE,
    ),
    "experiment": re.compile(
        r"(?:^##\s+.*(?:实验|experiment|experimento|実験|실험)|"
        r"^###\s+.*(?:实验|experiment|experimento|実験|실험)|实验：)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "setup": re.compile(
        r"(?:^###\s+(?:Setup|准备|前置|实验准备|Vorbereitung|Preparación|準備|준비)\s*$|"
        r"^##\s+(?:实验准备|Preparation|Vorbereitung|Preparación|準備|준비)\s*$)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "task": re.compile(
        r"(?:^###\s+.*(?:Task|任务|操作步骤|实验步骤|Aufgabe|Tarea|タスク|작업).*$)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "evidence": re.compile(
        r"(?:^###\s+.*(?:Evidence|证据|记录|必须保存|Belege?|Evidencia|証拠|증거).*$)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "boundary": re.compile(
        r"(?:^###\s+.*(?:Failure variant|失败|边界|Failure|failure|boundary|"
        r"Fehler|Grenze|Fallo|límite|失敗|境界|실패|경계)|"
        r"失败|边界|停止|风险|不适用|failure|boundary|stop|risk|limitation|"
        r"Fehler|Grenze|Stopp|Risiko|Fallo|límite|detener|失敗|境界|停止|"
        r"リスク|실패|경계|중단|위험)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "reflection": re.compile(
        r"(?:^###\s+.*(?:Reflection|复盘|反思|Reflexion|Reflexión|振り返り|"
        r"회고|성찰).*$|复盘|反思|reflection|reflexion|reflexión|振り返り|회고|성찰)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "transfer": re.compile(
        r"(?m)^(?:##|###)\s+(?:迁移|迁移练习|Transfer|Transfer task|"
        r"Transfer exercise|Transferaufgabe|Tarea de transferencia|"
        r"Transferencia|Übertragung|迁移任务|移行|移行タスク|전환|전이 과제)\s*$",
        re.IGNORECASE,
    ),
    "acceptance": re.compile(
        r"^##\s+.*(?:本章验收|我真的学会了吗|验收清单|Acceptance checklist|"
        r"Abnahme-Checkliste|Abnahmecheckliste|Lista de aceptación|"
        r"受け入れチェックリスト|合格チェックリスト|수용 체크리스트|합격 체크리스트).*$",
        re.MULTILINE | re.IGNORECASE,
    ),
    "sources": re.compile(
        r"来源与更新提示|易变事实与来源|稳定原则|治理的连接|Sources and maintenance boundary|"
        r"Sources and review boundary|Sources and update boundary|来源与维护边界|来源与更新边界|"
        r"Quellen und Wartungsgrenze|Quellen und Aktualitätsgrenze|Fuentes y límite de mantenimiento|"
        r"Fuentes y actualización|出典と保守の境界|出典と更新境界|출처 및 유지보수 경계|출처와 갱신 경계",
        re.IGNORECASE,
    ),
}

UNRUN_STATUS_RE = re.compile(
    r"(?:\bnot\s+run\b|\bnot\s+executed\b|nicht\s+ausgeführt|"
    r"no\s+ejecutado|未実行|未运行|미실행|실행하지\s+않음)",
    re.IGNORECASE,
)

LAB_REQUIRED_KEYS = (
    "id",
    "title",
    "level",
    "domain",
    "goal",
    "setup",
    "task",
    "evidence",
    "failure_variant",
    "reflection",
    "status",
    "last_verified",
    "transfer_task",
    "transfer_domain",
    "transfer_evidence",
    "transfer_limitations",
)
LAB_TRANSFER_KEYS = (
    "transfer_task",
    "transfer_domain",
    "transfer_evidence",
    "transfer_limitations",
)
LAB_KEY_RE = re.compile(r"(?m)^([A-Za-z_][A-Za-z0-9_]*):(?:\s*(.*))?$")


def read_utf8(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def frontmatter(text: str) -> tuple[str | None, str]:
    if not text.startswith("---\n"):
        return None, text
    closing = text.find("\n---", 4)
    if closing < 0:
        return None, text
    return text[4:closing], text[closing + len("\n---") :]


def metadata_block(text: str) -> tuple[str | None, str]:
    """Read either standard frontmatter or the project's fenced YAML block."""
    metadata, body = frontmatter(text)
    if metadata is not None:
        return metadata, body

    # Existing labs may put the title first and wrap metadata in horizontal
    # rule markers. Keep this format valid while the curriculum is migrated.
    separated = re.search(r"(?ms)^---\s*\n(.*?)\n---\s*(?:\n|$)", text)
    if separated:
        return separated.group(1), text[: separated.start()] + text[separated.end() :]

    match = re.search(r"```yaml\s*\n(.*?)\n```", text, flags=re.DOTALL)
    if not match:
        return None, text
    return match.group(1), text[: match.start()] + text[match.end() :]


def value_is_nonempty(value: str | None) -> bool:
    if value is None:
        return False
    stripped = value.strip()
    return bool(stripped) and stripped not in {"null", "~", "''", '""'}


def validate_chapters(errors: list[str]) -> None:
    chapters = sorted(CHAPTERS.glob("[0-9][0-9]-*.md"))
    expected = {f"{number:02d}" for number in range(1, 23)}
    actual = {path.name[:2] for path in chapters}
    missing = sorted(expected - actual)
    if missing:
        errors.append(f"chapters: missing numbered chapters: {', '.join(missing)}")

    for path in chapters:
        text = read_utf8(path)
        missing_sections = [
            name for name, pattern in CHAPTER_CONTRACT.items() if not pattern.search(text)
        ]
        if missing_sections:
            errors.append(
                f"{path.relative_to(ROOT)}: missing teaching contract items: "
                + ", ".join(missing_sections)
            )


def validate_labs(errors: list[str]) -> None:
    labs = sorted(LABS.glob("lab-*.md"))
    if len(labs) < 10:
        errors.append(f"labs: expected at least 10 labs, found {len(labs)}")

    for path in labs:
        text = read_utf8(path)
        metadata, body = metadata_block(text)
        label = str(path.relative_to(ROOT))
        if metadata is None:
            errors.append(f"{label}: frontmatter must start and end with ---")
            continue

        values = {match.group(1): (match.group(2) or "").strip() for match in LAB_KEY_RE.finditer(metadata)}
        missing = [key for key in LAB_REQUIRED_KEYS if key not in values]
        if missing:
            errors.append(f"{label}: missing metadata keys: {', '.join(missing)}")
            continue

        for key in LAB_REQUIRED_KEYS:
            if key not in {"evidence", "last_verified"} and not value_is_nonempty(values[key]):
                errors.append(f"{label}: {key} must be non-empty")

        for key in LAB_TRANSFER_KEYS:
            if key in values and not value_is_nonempty(values[key]):
                errors.append(f"{label}: {key} must be non-empty")

        last_verified = values.get("last_verified", "")
        if not value_is_nonempty(last_verified):
            errors.append(f"{label}: last_verified must state that the lab has not run yet")
        elif not (
            all(marker in last_verified for marker in ("未运行", "待运行"))
            or UNRUN_STATUS_RE.search(last_verified)
        ):
            errors.append(
                f"{label}: last_verified must explicitly state that the lab has not run yet"
            )

        evidence_start = re.search(r"(?m)^evidence:\s*$", metadata)
        if not evidence_start:
            errors.append(f"{label}: evidence must be a YAML list")
        else:
            evidence_tail = metadata[evidence_start.end() :]
            if not re.search(r"(?m)^\s+-\s+\S+", evidence_tail):
                errors.append(f"{label}: evidence must contain at least one item")

        if values["status"].strip("'\"").lower() != "draft":
            errors.append(f"{label}: status must remain draft until runtime evidence exists")

        if not re.search(r"(?m)^##\s+", body):
            errors.append(f"{label}: body must contain an instructional section")
        for name, pattern in {
            "task": re.compile(r"任务|输入|task|tarea|aufgabe|タスク|작업", re.IGNORECASE).search,
            "evidence": re.compile(r"证据|记录|evidence|beleg|evidencia|証拠|증거", re.IGNORECASE).search,
            "failure_variant": re.compile(
                r"失败|边界|故意|failure|boundary|intentional|fehler|grenze|"
                r"fallo|límite|intencional|失敗|境界|意図|실패|경계|의도",
                re.IGNORECASE,
            ).search,
            "reflection": re.compile(
                r"复盘|反思|思考|总结|reflection|reflexion|reflexión|summary|"
                r"zusammenfassung|resumen|要約|振り返り|회고|성찰|요약|まとめ",
                re.IGNORECASE,
            ).search,
            "acceptance": re.compile(
                r"通过标准|验收标准|acceptance|abnahme|aceptación|受け入れ|수용",
                re.IGNORECASE,
            ).search,
        }.items():
            if not pattern(body):
                errors.append(f"{label}: body is missing {name} guidance")


def main() -> int:
    errors: list[str] = []
    validate_chapters(errors)
    validate_labs(errors)
    if errors:
        print("LEARNING_CONTRACT_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("LEARNING_CONTRACT_OK")
    print(f"chapters={len(list(CHAPTERS.glob('[0-9][0-9]-*.md')))}")
    print(f"labs={len(list(LABS.glob('lab-*.md')))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
