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


def canonical_english_chapter_paths() -> list[Path]:
    """Return the 22 English source files declared by the locale matrix."""
    try:
        import json

        matrix = json.loads(
            (ROOT / "docs/governance/locale-matrix.yaml").read_text(encoding="utf-8")
        )
    except (OSError, UnicodeError, json.JSONDecodeError):
        return sorted(CHAPTERS.glob("[0-9][0-9]-*-EN.md"))

    paths: list[Path] = []
    for item in matrix.get("content", []):
        if not isinstance(item, dict) or item.get("kind") != "chapter":
            continue
        locale = item.get("locales", {}).get("EN", {})
        path_value = locale.get("path") if isinstance(locale, dict) else None
        if isinstance(path_value, str) and path_value.endswith("-EN.md"):
            paths.append(ROOT / path_value)
    return paths


def canonical_english_lab_paths() -> list[Path]:
    """Return English lab sources where the locale matrix declares one."""
    try:
        import json

        matrix = json.loads(
            (ROOT / "docs/governance/locale-matrix.yaml").read_text(encoding="utf-8")
        )
    except (OSError, UnicodeError, json.JSONDecodeError):
        return sorted(LABS.glob("lab-*-EN.md"))

    paths: list[Path] = []
    for item in matrix.get("content", []):
        if not isinstance(item, dict) or item.get("kind") != "lab":
            continue
        locale = item.get("locales", {}).get("EN", {})
        path_value = locale.get("path") if isinstance(locale, dict) else None
        if isinstance(path_value, str) and path_value.endswith("-EN.md"):
            paths.append(ROOT / path_value)
    return paths

CHAPTER_CONTRACT = {
    # Keep both headings valid: early chapters use the explicit teaching
    # heading, while later chapters use the shorter project convention.
    "problem": re.compile(
        r"(?m)^##\s+(?:本章要解决的问题|本章要解決的問題|问题(?:：.*)?|問題(?:：.*)?|The problem this chapter solves|"
        r"Das Problem, das dieses Kapitel löst|Das Problem dieses Kapitels|"
        r"El problema que resuelve este capítulo|この章が解決する問題|本章要解決的問題|"
        r"이 장에서 해결하는 문제|이 장이 해결하는 문제|Le problème que résout ce chapitre|"
        r"Problème de ce chapitre|Le problème)\s*$",
        re.IGNORECASE,
    ),
    "objective": re.compile(
        r"(?m)^##\s+(?:学习目标|學習目標|Learning objectives|Lernziele|Objetivos de aprendizaje|"
        r"学習目標|학습 목표|Objectifs d’apprentissage|Objectifs d'apprentissage)\s*$",
        re.IGNORECASE,
    ),
    "real_problem": re.compile(
        r"现实问题入口|現實問題入口|真实问题入口|真實問題入口|field cases?|real[- ]world (?:problem|cases?|entry point)|"
        r"现场案例|現場案例|真實問題入口|casos de campo|problemas reales|praxisfälle|reale Probleme|Praxisproblem|Problema real|"
        r"現場の事例|現実の問題|現実の入口|実際に起きる問題|実際の問題|현장 사례|실제 문제|cas réels|problèmes de terrain|"
        r"现实问题|現實問題|真实入口|真實入口|Praxisnahe Fälle|Praxisbeispiel|El problema real|"
        r"entrée du problème réel",
        re.IGNORECASE,
    ),
    "experiment": re.compile(
        r"(?:^##\s+.*(?:实验|實驗|experiment|experimento|実験|실험|expérience)|"
        r"^###\s+.*(?:实验|實驗|experiment|experimento|実験|실험|expérience)|实验：|實驗：|expérience\s*:)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "setup": re.compile(
        r"(?:^###\s+(?:Setup|准备|前置|实验准备|Vorbereitung|Preparación|準備|준비|Préparation|小実験と境界|小実験|小实验|小實驗|資格情報なしの小さな実験で契約を確認する)\s*$|"
        r"^##\s+(?:实验准备|Preparation|Vorbereitung|Preparación|準備|준비|Préparation|小実験と境界|小実験|小実驗|資格情報なしの小さな実験で契約を確認する)\s*$)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "task": re.compile(
        r"(?:^###\s+.*(?:Task|任务|任務|操作步骤|操作步驟|实验步骤|實驗步驟|Aufgabe|Tarea|タスク|작업|Tâche|Étapes|やること|練習|실험|正常系の確認|小実験：).*$)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "evidence": re.compile(
        r"(?:^###\s+.*(?:Evidence|证据|證據|记录|記錄|必须保存|必須保存|Belege?|Evidencia|証拠|증거|Preuve|Éléments à conserver|期待する成果物|証拠を残す|期待する成果物は).*$)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "boundary": re.compile(
        r"(?:^###\s+.*(?:Failure variant|失败|边界|Failure|failure|boundary|"
        r"Fehler|Grenze|Fallo|límite|失敗|境界|실패|경계)|"
        r"失败|边界|停止|风险|不适用|failure|boundary|stop|risk|limitation|"
        r"Fehler|Grenze|Stopp|Risiko|Fallo|límite|detener|失敗|境界|邊界|停止|風險|不適用|"
        r"リスク|실패|경계|중단|위험|limite|arrêt)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "reflection": re.compile(
        r"(?:^###\s+.*(?:Reflection|复盘|復盤|覆盤|反思|Reflexion|Reflexión|振り返り|"
        r"회고|성찰|Réflexion|振り返る|回顾|回顧).*$|复盘|復盤|覆盤|反思|reflection|reflexion|reflexión|振り返り|振り返る|회고|성찰|réflexion|回顾|回顧)",
        re.MULTILINE | re.IGNORECASE,
    ),
    "transfer": re.compile(
        r"(?m)^(?:##|###)\s+(?:迁移|遷移|迁移练习|遷移練習|遷移任務|Transfer|Transfer task|"
        r"Transfer exercise|Transferaufgabe|Tarea de transferencia|"
        r"Transferencia|Übertragung|迁移任务|移行|移行タスク|転移タスク|別の分野へ移す|移行と振り返り|応用課題|応用|전환|전이 과제|응용 과제|Transfert|Exercice de transfert)(?:\s+.*)?$",
        re.IGNORECASE,
    ),
    "acceptance": re.compile(
        r"^##\s+.*(?:本章验收|本章驗收|我真的学会了吗|我真的學會了嗎|验收清单|驗收清單|Acceptance checklist|"
        r"Abnahme-Checkliste|Abnahmecheckliste|Lista de aceptación|Lista de comprobación|"
        r"受け入れチェックリスト|受け入れのチェックリスト|合格チェックリスト|수용 체크리스트|수용 점검표|합격 체크리스트|验收检查清单|驗收檢查清單|Liste de contrôle d’acceptation|Liste de contrôle d'acceptation|Liste d’acceptation).*$",
        re.MULTILINE | re.IGNORECASE,
    ),
    "sources": re.compile(
        r"来源与更新提示|來源與更新提示|來源與更新邊界|易变事实与来源|易變事實與來源|来源与维护边界|來源與維護邊界|來源與維護提示|稳定原则|治理的连接|Sources and maintenance boundary|"
        r"Sources and review boundary|Sources and update boundary|来源与维护边界|来源与更新边界|"
        r"Quellen und Wartungsgrenze|Quellen und Aktualitätsgrenze|Fuentes y límite de mantenimiento|"
        r"Fuentes y actualización|出典と保守の境界|出典と更新境界|출처 및 유지보수 경계|출처와 갱신 경계|Sources et limite de maintenance|Sources et limite de mise à jour",
        re.IGNORECASE,
    ),
}

UNRUN_STATUS_RE = re.compile(
    r"(?:\bnot\s+run\b|\bnot\s+executed\b|nicht\s+ausgeführt|"
    r"no\s+ejecutado|non\s+exécuté|未実行|未运行|미실행|실행하지\s+않음)",
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


def validate_chapters(errors: list[str], chapters: list[Path] | None = None) -> None:
    if chapters is None:
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


def validate_labs(errors: list[str], labs: list[Path] | None = None) -> None:
    if labs is None:
        labs = sorted(LABS.glob("lab-*.md"))
    minimum_labs = 1 if labs is not None else 10
    if len(labs) < minimum_labs:
        errors.append(f"labs: expected at least {minimum_labs} labs, found {len(labs)}")

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

        # YAML permits both a block sequence and a flow sequence. Require an
        # actual nonempty list in either spelling; accepting flow sequences
        # keeps localized frontmatter structurally equivalent to its source.
        evidence_block = re.search(r"(?m)^evidence:\s*$", metadata)
        evidence_flow = re.search(r"(?m)^evidence:\s*\[\s*\S", metadata)
        if evidence_block:
            evidence_tail = metadata[evidence_block.end() :]
            if not re.search(r"(?m)^\s+-\s+\S+", evidence_tail):
                errors.append(f"{label}: evidence must contain at least one item")
        elif not evidence_flow:
            errors.append(f"{label}: evidence must be a nonempty YAML list")

        if values["status"].strip("'\"").lower() != "draft":
            errors.append(f"{label}: status must remain draft until runtime evidence exists")

        if not re.search(r"(?m)^##\s+", body):
            errors.append(f"{label}: body must contain an instructional section")
        for name, pattern in {
            # A lab contract is carried jointly by its structured frontmatter
            # and its instructional body.  A localized body can call the
            # activity an experiment rather than repeat the English word
            # "task"; a saved-evidence list in metadata is still explicit
            # evidence guidance.  Keep a body-section requirement above, then
            # accept either a localized cue or the validated contract field.
            "task": lambda candidate: bool(
                re.search(r"任务|输入|task|tarea|aufgabe|実験|실험|experiment|tâche|entrée", candidate, re.IGNORECASE)
                or value_is_nonempty(values.get("task"))
            ),
            "evidence": lambda candidate: bool(
                re.search(r"证据|记录|evidence|beleg|evidencia|証拠|증거|preuve|conserver", candidate, re.IGNORECASE)
                or evidence_block
                or evidence_flow
            ),
            "failure_variant": re.compile(
                r"失败|边界|故意|failure|boundary|intentional|fehler|grenze|"
                r"fallo|límite|intencional|失敗|境界|意図|실패|경계|의도|échec|limite|arrêt",
                re.IGNORECASE,
            ).search,
            "reflection": lambda candidate: bool(re.compile(
                r"复盘|反思|思考|总结|reflection|reflexion|reflexión|summary|"
                r"zusammenfassung|resumen|要約|振り返り|회고|성찰|요약|まとめ|réflexion|bilan",
                re.IGNORECASE,
            ).search(candidate) or value_is_nonempty(values.get("reflection"))),
            "acceptance": lambda candidate: bool(re.compile(
                r"通过标准|验收标准|acceptance|abnahme|aceptación|受け入れ|수용|acceptation|critères",
                re.IGNORECASE,
            ).search(candidate) or re.search(r"(?m)^\s*- \[ \]", candidate)),
        }.items():
            if not pattern(body):
                errors.append(f"{label}: body is missing {name} guidance")


def main() -> int:
    canonical_only = "--canonical-en" in sys.argv[1:]
    errors: list[str] = []
    chapters = canonical_english_chapter_paths() if canonical_only else None
    labs = canonical_english_lab_paths() if canonical_only else None
    validate_chapters(errors, chapters)
    validate_labs(errors, labs)
    if errors:
        print("LEARNING_CONTRACT_FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("LEARNING_CONTRACT_OK")
    chapter_count = len(chapters) if chapters is not None else len(list(CHAPTERS.glob("[0-9][0-9]-*.md")))
    lab_count = len(labs) if labs is not None else len(list(LABS.glob("lab-*.md")))
    print(f"chapters={chapter_count}")
    print(f"labs={lab_count}")
    if canonical_only:
        print("scope=canonical-english-sources")
    return 0


if __name__ == "__main__":
    sys.exit(main())
