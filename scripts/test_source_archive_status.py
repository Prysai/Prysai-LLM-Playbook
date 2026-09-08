"""Prevent historical source-archive snapshots from posing as current audits."""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DECISIONS_PATH = ROOT / "docs/sources/skill-integration-decisions.md"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    text = DECISIONS_PATH.read_text(encoding="utf-8")
    require(
        "历史归档状态（2026-08-09 快照）" in text,
        "archive table does not identify its historical date",
    )
    require(
        "当前审计边界（2026-09-05）" in text,
        "current audit boundary is missing",
    )
    require(
        "not_configured" in text and "INPUT_ARCHIVE_AUDIT_INCOMPLETE" in text,
        "unconfigured archive result is not recorded",
    )
    require(
        "--archive-dir <directory>" in text,
        "portable archive audit instruction is missing",
    )
    require(
        "当前输入归档审计结果如下" not in text,
        "historical archive table is still described as current",
    )
    require(
        "六个归档均为 `ok`" not in text,
        "historical success wording is still presented without a boundary",
    )
    print("SOURCE_ARCHIVE_STATUS_TESTS_OK cases=6")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
