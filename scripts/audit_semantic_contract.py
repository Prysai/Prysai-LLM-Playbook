"""Audit reader-facing semantic coverage across every locale.

This is a release-audit signal, not a translation score.  It checks for the
small teaching contract that every chapter and Lab must expose: an objective,
an observable exercise, a failure or boundary case, evidence, acceptance,
transfer, sources, status and same-locale navigation.  It also reports likely
compression when a localized page is substantially shorter or has fewer
teaching headings than its English source.  A compression finding requires
editorial review; it is never treated as proof that a translation is wrong.

The locale matrix is JSON-compatible YAML in this repository, so this audit
uses only the Python standard library and remains runnable without PyYAML.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import validate_learning_contract as learning_contract


ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "docs/governance/locale-matrix.yaml"
LOCALES = ("EN", "ZH", "ES", "JA", "KO", "DE", "ZHTW", "FR")

# The Reader builds catalogue pagination from the generated manifest.  Only
# these two public entry Labs need an embedded same-locale footer because they
# are linked directly from the beginner route and the action-boundary route.
# Other localized Labs may rely on Reader pagination without duplicating a
# generated block in every translation.
EMBEDDED_NAVIGATION_REQUIRED = {
    "lab-001-first-safe-task",
    "lab-007-action-boundaries",
}

ACCEPTANCE_RE = re.compile(
    r"通过标准|验收标准|acceptance|abnahme|aceptación|受け入れ|"
    r"수용|acceptation|critères|liste de contrôle|liste de vérification|"
    r"checklist|透過標準|驗收標準|完成清單",
    re.IGNORECASE,
)


@dataclass(frozen=True)
class ContractGroup:
    name: str
    patterns: tuple[str, ...]


@dataclass
class Finding:
    content_id: str
    kind: str
    locale: str
    path: str
    missing: list[str]
    compressed: list[str]
    source_headings: int
    localized_headings: int
    source_chars: int
    localized_chars: int


# These patterns describe concepts, not a required translation.  Keep them
# deliberately broad and language-specific so a natural translation may use
# its ordinary wording.  Code/status tokens remain stable across locales.
GROUPS: dict[str, tuple[ContractGroup, ...]] = {
    "chapter": (
        ContractGroup("objective", (r"learning objectives", r"objectifs d.?apprentissage", r"学习目标", r"學習目標", r"学習目標", r"학습 목표", r"lernziele", r"objetivos de aprendizaje")),
        ContractGroup("exercise", (r"experiment", r"expérience", r"实验", r"實驗", r"実験", r"실험", r"experiment", r"experimento")),
        ContractGroup("failure_or_boundary", (r"failure", r"échec", r"boundary", r"limite", r"失败", r"失敗", r"失敗", r"エラー|境界", r"실패|경계", r"fehler|grenze", r"fallo|límite")),
        ContractGroup("evidence", (r"evidence", r"preuve", r"证据", r"證據", r"証拠", r"증거", r"nachweis", r"evidencia")),
        ContractGroup("acceptance", (r"acceptance", r"acceptation", r"验收", r"驗收", r"受け入れ", r"인수", r"abnahme", r"aceptación")),
        ContractGroup("transfer", (r"transfer", r"transfert", r"迁移", r"轉移", r"転移", r"전이", r"übertragung", r"transferencia")),
        ContractGroup("sources", (r"sources", r"source[s]? et", r"来源", r"來源", r"出典", r"출처", r"quellen", r"fuentes")),
        ContractGroup("navigation", (r"chapter-navigation:start",)),
    ),
    "lab": (
        ContractGroup("objective", (r"learning objective", r"objectif d.?apprentissage", r"学习目标", r"學習目標", r"学習目標", r"학습 목표", r"lernziel", r"objetivo de aprendizaje")),
        ContractGroup("exercise", (r"task", r"tâche", r"任务", r"任務", r"タスク", r"과제", r"aufgabe", r"tarea")),
        ContractGroup("failure_or_boundary", (r"failure", r"échec", r"boundary", r"limite", r"失败", r"失敗", r"エラー|境界", r"실패|경계", r"fehler|grenze", r"fallo|límite")),
        ContractGroup("evidence", (r"evidence", r"preuve", r"证据", r"證據", r"証拠", r"증거", r"nachweis", r"evidencia")),
        ContractGroup("acceptance", (r"acceptance", r"acceptation", r"验收", r"驗收", r"受け入れ", r"인수", r"abnahme", r"aceptación")),
        ContractGroup("transfer", (r"transfer", r"transfert", r"迁移", r"轉移", r"転移", r"전이", r"übertragung", r"transferencia")),
        ContractGroup("navigation", (r"lab-navigation:start",)),
    ),
}


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def reader_text(text: str) -> str:
    text = re.sub(r"<!--.*?-->", " ", text, flags=re.DOTALL)
    text = re.sub(r"```.*?```|~~~.*?~~~", " ", text, flags=re.DOTALL)
    text = re.sub(r"`[^`]*`", " ", text)
    text = re.sub(r"\[[^\]]*\]\([^)]*\)", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def headings(text: str) -> int:
    without_code = re.sub(r"```.*?```|~~~.*?~~~", "", text, flags=re.DOTALL)
    return len(re.findall(r"^#{2,3}\s+\S", without_code, flags=re.MULTILINE))


def has_group(text: str, group: ContractGroup) -> bool:
    return any(re.search(pattern, text, flags=re.IGNORECASE) for pattern in group.patterns)


def frontmatter_missing(text: str, kind: str) -> list[str]:
    """Return only genuinely missing structured lab fields.

    ``validate_learning_contract`` already knows the two metadata spellings
    used by the repository (frontmatter and the legacy separated block).  Keep
    this audit aligned with that validator instead of maintaining a second,
    narrower YAML parser that mistakes translated values or list syntax for a
    missing field.
    """

    if kind != "lab":
        return []
    metadata, body = learning_contract.metadata_block(text)
    if metadata is None:
        return ["frontmatter"]
    values = {
        match.group(1): (match.group(2) or "").strip()
        for match in learning_contract.LAB_KEY_RE.finditer(metadata)
    }
    missing = [
        field
        for field in learning_contract.LAB_REQUIRED_KEYS
        if field not in values or (
            field not in {"evidence", "last_verified"}
            and not learning_contract.value_is_nonempty(values[field])
        )
    ]
    # A lab's objective and transfer contract are structured metadata.  The
    # body still needs an instructional section; the existing validator owns
    # the richer failure/evidence/reflection/acceptance checks.
    if not re.search(r"(?m)^##\s+", body):
        missing.append("instructional_body")
    return missing


def locale_paths(matrix: dict[str, Any]) -> list[tuple[str, str, str, dict[str, Any]]]:
    rows: list[tuple[str, str, str, dict[str, Any]]] = []
    for item in matrix.get("content", []):
        if not isinstance(item, dict) or item.get("kind") not in {"chapter", "lab"}:
            continue
        content_id = str(item.get("content_id", "unknown"))
        kind = str(item.get("kind"))
        locales = item.get("locales", {})
        if not isinstance(locales, dict):
            continue
        for locale in LOCALES:
            record = locales.get(locale, {})
            if isinstance(record, dict):
                rows.append((content_id, kind, locale, record))
    return rows


def audit(matrix: dict[str, Any]) -> tuple[list[Finding], list[str]]:
    findings: list[Finding] = []
    errors: list[str] = []
    for content_id, kind, locale, record in locale_paths(matrix):
        path_text = str(record.get("path", ""))
        path = ROOT / path_text
        if not path.is_file():
            errors.append(f"{content_id}.{locale}: missing file {path_text}")
            continue
        text = read(path)
        source_record = next(
            (r for cid, k, loc, r in locale_paths(matrix) if cid == content_id and loc == "EN" and k == kind),
            {},
        )
        source_path = ROOT / str(source_record.get("path", ""))
        source = read(source_path) if source_path.is_file() else text
        source_heading_count = headings(source)
        localized_heading_count = headings(text)
        source_chars = len(reader_text(source))
        localized_chars = len(reader_text(text))
        if kind == "chapter":
            # Use the canonical multilingual contract patterns for chapters;
            # they are maintained with the project's release validator.
            missing = [
                name
                for name, pattern in learning_contract.CHAPTER_CONTRACT.items()
                if not pattern.search(text)
            ]
        else:
            missing = frontmatter_missing(text, kind)
            # Lab metadata carries the objective, task, evidence, failure,
            # reflection and transfer fields. The body still needs a visible
            # acceptance section. Only the two public entry Labs require an
            # embedded footer; the Reader supplies pagination for the rest.
            metadata, body = learning_contract.metadata_block(text)
            values = {
                match.group(1): (match.group(2) or "").strip()
                for match in learning_contract.LAB_KEY_RE.finditer(metadata or "")
            }
            if not (ACCEPTANCE_RE.search(body) or re.search(r"(?m)^\s*- \[ \]", body)):
                missing.append("acceptance")
            if (
                content_id in EMBEDDED_NAVIGATION_REQUIRED
                and "lab-navigation:start" not in text
            ):
                missing.append("navigation")
        compressed: list[str] = []
        if locale != "EN":
            # Character ratios are especially misleading for CJK.  Keep the
            # threshold conservative and pair it with heading structure; the
            # result remains an editorial signal, never a quality score.
            if source_chars and localized_chars / source_chars < 0.30:
                compressed.append(f"reader_text_ratio={localized_chars/source_chars:.2f}")
            if source_heading_count >= 12 and localized_heading_count < max(6, int(source_heading_count * 0.55)):
                compressed.append(f"heading_ratio={localized_heading_count}/{source_heading_count}")
        if missing or compressed:
            findings.append(Finding(content_id, kind, locale, path_text, missing, compressed, source_heading_count, localized_heading_count, source_chars, localized_chars))
    return findings, errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="emit machine-readable findings")
    parser.add_argument("--fail-on-missing", action="store_true", help="return non-zero when semantic groups are missing")
    args = parser.parse_args()
    try:
        matrix = json.loads(read(MATRIX_PATH))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"SEMANTIC_CONTRACT_AUDIT_FAILED: {exc}")
        return 1
    findings, errors = audit(matrix)
    payload = {"errors": errors, "findings": [asdict(finding) for finding in findings]}
    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print("SEMANTIC_CONTRACT_AUDIT")
        print("Scope: semantic coverage and compression signals; not translation quality or learner evidence.")
        if errors:
            print("ERRORS")
            print(*(f"- {error}" for error in errors), sep="\n")
        for finding in findings:
            details = []
            if finding.missing:
                details.append("missing=" + ",".join(finding.missing))
            if finding.compressed:
                details.append("compression=" + ",".join(finding.compressed))
            print(f"ATTENTION {finding.content_id}.{finding.locale}: {finding.path} | " + " | ".join(details))
        print(f"SUMMARY files_checked={len(locale_paths(matrix))-len(errors)} findings={len(findings)} missing_contract={sum(bool(f.missing) for f in findings)} compression_signals={sum(bool(f.compressed) for f in findings)}")
    if errors or (args.fail_on_missing and any(f.missing for f in findings)):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
