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
    deep_missing: list[str]


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

# A heading/character comparison can only say that a page deserves a human
# look.  These targeted concept groups make that look reproducible for the
# units that have historically been condensed in translation.  They check
# for teaching concepts, not literal headings: localised prose may use a
# different heading while still exposing the same contract.  The audit is
# intentionally advisory unless ``--fail-on-deep-missing`` is requested.
DEEP_CONTRACTS: dict[str, tuple[ContractGroup, ...]] = {
    "lab-006-agent-stop-conditions": (
        ContractGroup("event_trace", (r"events\.yaml", r"event trace", r"trace d.?événements", r"traza de eventos", r"Ereignis.*protokoll", r"イベント.*記録", r"이벤트.*기록", r"事件.*记录", r"事件.*記錄")),
        ContractGroup("run_record", (r"run-record\.yaml", r"run record", r"registre des tentatives", r"registro de intentos", r"Versuchsprotokoll", r"試行記録", r"실행 기록", r"运行记录", r"執行記錄")),
        ContractGroup("handoff", (r"handoff", r"passation", r"Übergabe", r"引き継ぎ", r"인계", r"交接")),
        ContractGroup("bounded_branches", (r"five bounded branches", r"cinq branches", r"cinco ramas|ramas limitadas|ramas acotadas", r"fünf.*Zweig", r"五つ.*分岐", r"5つの分岐", r"5개의 분기|다섯.*분기", r"五个.*分支", r"五個.*分支")),
        ContractGroup("lost_response", (r"lost response", r"réponse perdue", r"respuesta perdida", r"verlorene Antwort", r"応答喪失", r"응답 손실", r"丢失响应", r"回應遺失|響應丟失")),
        ContractGroup("retry_reconciliation", (r"reconcil", r"réconcil", r"conciliaci", r"Abgleich", r"再調整|再調和", r"照合", r"대조|재조정|응답 유실과 조정", r"对账|對帳|核对|核對")),
        ContractGroup("evidence_review", (r"evidence review", r"revue des preuves", r"revisión de evidencia", r"Belegprüfung", r"証拠.*レビュー", r"증거 검토", r"证据审查", r"證據審查")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-007-action-boundaries": (
        ContractGroup("fixed_fixture", (r"fixed fixture|fixture fixe|fixture fijo|Problema y fixture|fixe.*Fixture|固定.*夹具|固定.*夾具|固定.*フィクスチャ|고정.*fixture")),
        ContractGroup("three_scenarios", (r"three scenarios|three surfaces|trois scénarios|trois surfaces|tres escenarios|tres superficies|drei Szenarien|drei Oberflächen|三つ.*シナリオ|三つ.*ワーク|세 가지 시나리오|세 작업면|三个情境|三个工作面|三個情境|三個工作面")),
        ContractGroup("symptom_cards", (r"symptom cards?", r"cartes? .*symptôme", r"tarjetas? .*síntoma", r"Symptomkarten", r"症状卡", r"症狀卡", r"症状.*カード", r"증상 카드")),
        ContractGroup("staged_state", (r"staged state|state card", r"carte d.?état|carte d.?état", r"tarjeta de estado", r"Zustandskarte", r"状態カード", r"상태 카드", r"状态卡", r"狀態卡")),
        ContractGroup("diagnostic_order", (r"diagnostic order|ordre de diagnostic|orden de diagnóstico|orden diagnóstico|Diagnosereihenfolge|Diagnose.*Reihenfolge|診断順序|진단 순서|최소 진단 순서|最小排查顺序|最小排查順序")),
        ContractGroup("stop_conditions", (r"stop conditions?", r"conditions? d.?arrêt", r"condiciones? de parada", r"Stoppbedingungen", r"停止条件", r"停止條件", r"停止条件", r"중지 조건")),
        ContractGroup("evidence_table", (r"evidence table", r"tableau de preuves|table de preuves", r"tabla de pruebas|tabla de evidencia", r"Beweistabelle|Evidenztabelle", r"証拠.*表", r"증거 표|증거표", r"证据表", r"證據表")),
        ContractGroup("intentional_failure", (r"intentional failure|deliberate failure", r"échec volontaire", r"fallo deliberado|fallo intencional", r"absichtliche[rn]? Fehler", r"意図的な失敗|故意の失敗", r"의도적 실패", r"故意失败", r"故意失敗")),
        ContractGroup("passing_standard", (r"passing standard", r"standard de réussite", r"standard.*pass|estándar de aprobación|se considera aprobado", r"Erfolgsstandard|Bestehensstandard", r"合格基準|合格", r"통과 기준|합격", r"通过标准|通过条件", r"透過標準|驗收標準")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-013-l3-vertical-slice": (
        ContractGroup("checkpoint_cp0", (r"CP0")),
        ContractGroup("checkpoint_cp1", (r"CP1")),
        ContractGroup("checkpoint_cp2", (r"CP2")),
        ContractGroup("checkpoint_cp3", (r"CP3")),
        ContractGroup("checkpoint_cp4", (r"CP4")),
        ContractGroup("failure_cases", (r"failure cases?|cas d.?échec|casos de fallo|tarjetas? de fallo|Fehlerfälle|失敗.*ケース|失敗カード|실패 사례|失败案例|失敗案例")),
        ContractGroup("evidence_to_keep", (r"evidence to keep|keep.*evidence|éléments? de preuve.*conserver|preuves? à conserver|evidencia.*conservar|Belege.*aufbewahren|残す証拠|보존할 증거|要保留的证据|要保留的證據")),
        ContractGroup("reference_packet", (r"maintainer reference packet|paquet de référence|dossier de référence|paquete de referencia|Referenzpaket|メンテナ.*パケット|관리자 참조 패킷|维护者参考包|維護者參考封包|維護者參考包")),
        ContractGroup("reflection_transfer", (r"reflection and transfer|réflexion et transfert|reflexión y transferencia|Reflexion und Übertragung|反省.*転移|회고.*전이|复盘.*迁移|覆盤.*轉移")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-014-resume-reconciliation": (
        ContractGroup("checkpoint_fields", (r"checkpoint|检查点|檢查點|チェックポイント|체크포인트|Kontrollpunkt")),
        ContractGroup("state_classification", (r"matched.*changed.*not_observed|changed.*not_observed|已改变|已改變|変更.*未観測|변경.*미관찰|verändert.*nicht beobachtet")),
        ContractGroup("reconciliation", (r"reconcil|核对|核對|照合|조정|Abgleich|concil")),
        ContractGroup("failure_variant", (r"failure variant|失败变体|失敗變體|失敗.*受入|失敗.*境界|Fallo|Fehler")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("reflection", (r"reflection|réflexion|复盘|覆盤|振り返り|회고|Reflexion|reflexión")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-015-evidence-delivery": (
        ContractGroup("claim_table", (r"claim.*evidence|主张.*证据|主張.*證據|主張.*証拠|주장.*증거|Anspruch.*Evidenz|afirmación.*evidencia")),
        ContractGroup("status_states", (r"verified.*partial.*unverified.*blocked.*not_run|verified.*unverified.*not_run")),
        ContractGroup("windows_breaks", (r"three Windows|三个 Windows|三個 Windows|三つ.*Windows|세 가지 Windows|drei Windows|trois ruptures")),
        ContractGroup("failure_variant", (r"failure variant|失败变体|失敗變體|失敗.*境界|Fallo|Fehler")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("reflection", (r"reflection|réflexion|复盘|覆盤|振り返り|회고|Reflexion|reflexión")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-016-side-effect-boundary": (
        ContractGroup("side_effect_matrix", (r"side.?effect|副作用|副作用|副作用|부작용|Nebenwirkung|efectos externos")),
        ContractGroup("authorization", (r"authorization|autorisation|授权|授權|権限|권한|Berechtigung|autorización")),
        ContractGroup("rollback", (r"rollback|retour arrière|回滚|回滾|ロールバック|롤백|Rollback|revers")),
        ContractGroup("failure_variant", (r"failure variant|失败变体|失敗變體|失敗.*境界|Fallo|Fehler")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("reflection", (r"reflection|réflexion|复盘|覆盤|振り返り|회고|Reflexion|reflexión")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-017-skill-discovery-audit": (
        ContractGroup("discovery_stages", (r"implicit discovery|explicit name|隐式发现|显式名称|隱式發現|顯式名稱|暗黙.*発見|明示.*名前|암시적 발견|명시적 이름|implizite Entdeckung|descubrimiento implícito")),
        ContractGroup("four_cases", (r"four.case|四类测试|四類測試|四つ.*ケース|네 가지.*사례|vier.*Fälle|cuatro casos")),
        ContractGroup("license_boundary", (r"license|licence|许可证|許可證|ライセンス|라이선스|Lizenz|licencia")),
        ContractGroup("failure_variant", (r"failure variant|失败变体|失敗變體|失敗.*境界|Fallo|Fehler")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("reflection", (r"reflection|réflexion|复盘|覆盤|振り返り|회고|Reflexion|reflexión")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "lab-018-language-transfer": (
        ContractGroup("part_1", (r"Part 1|Partie 1|第\s*1\s*部分|第1部|1부|Teil 1")),
        ContractGroup("part_2", (r"Part 2|Partie 2|第\s*2\s*部分|第2部|2부|Teil 2")),
        ContractGroup("part_3", (r"Part 3|Partie 3|第\s*3\s*部分|第3部|3부|Teil 3")),
        ContractGroup("part_4", (r"Part 4|Partie 4|第\s*4\s*部分|第4部|4부|Teil 4")),
        ContractGroup("scorer_disagreement", (r"scorer.*disagree|score disagreement|désaccord.*évalu|desacuerdo.*puntu|Bewertungs.*abweich|採点.*不一致|채점.*불일치|评分分歧|評分分歧")),
        ContractGroup("intentional_failure", (r"intentional failure|échec volontaire|fallo deliberado|absichtlichen Fehler|意図的な失敗|의도적 실패|有意失败|有意失敗")),
        ContractGroup("evidence_package", (r"evidence package|paquet de preuves|paquete de evidencia|Beweispaket|証拠パッケージ|증거 패키지|证据包|證據包")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("reflection", (r"reflection|réflexion|reflexión|Reflexion|振り返り|회고|复盘|覆盤")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "chapter-11-designing-a-skill": (
        ContractGroup("skill_contract", (r"skill_id|contract|contrat|contrato|Vertrag|契約|계약|契约")),
        ContractGroup("trigger_matrix", (r"trigger matrix|matrice de déclenchement|matriz de activación|Trigger.?Matrix|トリガー.*マトリクス|트리거 매트릭스|触发矩阵|觸發矩陣")),
        ContractGroup("progressive_disclosure", (r"progressive disclosure|chargement progressif|carga progresiva|progressive.*Laden|段階的.*開示|점진적.*공개|渐进式加载|漸進式載入")),
        ContractGroup("permission_matrix", (r"permission matrix|matrice des permissions|matriz de permisos|Berechtigungsmatrix|権限マトリクス|권한 매트릭스|权限矩阵|權限矩陣")),
        ContractGroup("four_cases", (r"four cases|quatre cas|cuatro casos|Vier Fälle|4つのケース|네 가지 사례|四个案例|四個案例")),
        ContractGroup("intentional_failure", (r"intentional failure|échec volontaire|fallo deliberado|absichtlichen Fehler|意図的な失敗|의도적 실패|故意失败|故意失敗")),
        ContractGroup("sandbox_experiment", (r"sandbox|isolated environment|environnement isolé|entorno aislado|isolierte Umgebung|隔離環境|격리 환경|隔离环境|隔離環境")),
        ContractGroup("evidence_package", (r"evidence pack|evidence package|paquet de preuves|paquete de evidencia|Beweispaket|証拠パッケージ|증거 패키지|证据包|證據包")),
        ContractGroup("adoption_decision", (r"adoption decision|décision d.?adoption|decisión de adopción|Adoptionsentscheidung|採用.*決定|도입 결정|采用决策|採用決策")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "chapter-12-agent-loop-and-stop": (
        ContractGroup("observable_loop", (r"observable loop|boucle observable|bucle observable|beobachtbare Schleife|観察可能なループ|관찰 가능한 루프|可观察循环|可觀察循環")),
        ContractGroup("state_model", (r"minimum state|state fields?|état minimal|estado mínimo|minimaler Zustand|最小.*状態|최소 상태|最小状态|最小狀態")),
        ContractGroup("budget", (r"budget|budget.*retry|budget de|presupuesto|Budget|予算|예산|预算|預算")),
        ContractGroup("retry_classification", (r"retry classification|classification.*retry|classification des reprises|clasificación.*reintento|Retry-Klassifikation|再試行.*分類|재시도 분류|重试分类|重試分類")),
        ContractGroup("idempotency", (r"idempotent|idempotence|idempotencia|Idempotenz|冪等|멱등|幂等|冪等")),
        ContractGroup("lost_response", (r"lost response|réponse perdue|respuesta perdida|verlorene Antwort|応答喪失|응답 손실|丢失响应|回應遺失")),
        ContractGroup("sandbox_runs", (r"sandbox run|sandbox.*run|exécution.*isol|ejecución.*aislad|Sandbox-Lauf|サンドボックス.*実行|sandbox 실행|沙盒运行|沙盒執行")),
        ContractGroup("recovery", (r"recovery|récupération|recuperación|Wiederherstellung|リカバリ|복구|恢复|復原")),
        ContractGroup("transfer", (r"transfer|transfert|迁移|轉移|転移|전이|Übertragung")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
    ),
    "chapter-15-research-track": (
        ContractGroup("research_question", (r"research question|question de recherche|pregunta de investigación|Forschungsfrage|研究質問|연구 질문|研究问题|研究問題")),
        ContractGroup("query_groups", (r"query groups?|groupes de requêtes|grupos de consultas|Abfragegruppen|クエリ.*グループ|쿼리 그룹|查询组|查詢組")),
        ContractGroup("evidence_table", (r"evidence table|tableau de preuves|tabla de evidencia|Evidenztabelle|証拠.*表|증거 표|证据表|證據表")),
        ContractGroup("conflict", (r"conflict|conflit|conflicto|Konflikt|矛盾|충돌|冲突|衝突")),
        ContractGroup("access_failures", (r"redirect|inaccessible|rate limit|redirection|inaccessible|limite de débit|redirección|inaccesible|Ratenlimit|リダイレクト|アクセス不可|리디렉션|접근 불가|重定向|不可访问|重新導向|無法存取")),
        ContractGroup("forum_root_cause", (r"forum|root cause|cause racine|causa raíz|Ursache|根本原因|フォーラム|원인|论坛|根因|論壇|根因")),
        ContractGroup("cutoff_scope", (r"cutoff|scope gate|date limite|périmètre|fecha de corte|alcance|Stichtag|Umfang|カットオフ|範囲|컷오프|범위|截止日期|范围|截止日期|範圍")),
        ContractGroup("citation_audit", (r"citation audit|audit de citation|auditoría de citas|Zitationsprüfung|引用監査|인용 감사|引用审计|引用稽核")),
        ContractGroup("candidate_downgrade", (r"downgrade|reclass.*candidate|reclasser.*candidate|herabstufen|candidate.*降|降级|降級|후보.*하향")),
        ContractGroup("license_boundary", (r"license|licence|licencia|Lizenz|ライセンス|라이선스|许可证|授權條款")),
        ContractGroup("experiment", (r"observable experiment|expérience observable|experimento observable|beobachtbares Experiment|観察可能な実験|관찰 가능한 실험|可观察实验|可觀察實驗")),
        ContractGroup("stop_receipt", (r"stop receipt|fiche de clôture|reçu d.?arrêt|recibo de parada|Stoppbeleg|停止.*回执|停止.*回執|停止.*レシート|중지 영수증")),
        ContractGroup("acceptance", (r"acceptance|acceptation|验收|驗收|受け入れ|수용|Abnahme|aceptación")),
        ContractGroup("sources", (r"sources|sources et|来源|來源|出典|출처|Quellen|fuentes")),
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


def instructional_body(text: str) -> str:
    """Return the authored body without metadata-only contract values.

    Deep groups describe teaching content, so frontmatter must not satisfy a
    group merely because it repeats a field name or status token. Keep fenced
    examples in the body: fixture fields and command snippets are part of the
    executable teaching contract.
    """

    _metadata, body = learning_contract.metadata_block(text)
    body = re.sub(r"<!--.*?-->", " ", body, flags=re.DOTALL)
    return body


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


def audit(matrix: dict[str, Any], *, include_deep: bool = False) -> tuple[list[Finding], list[str]]:
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
        deep_missing: list[str] = []
        if include_deep and content_id in DEEP_CONTRACTS:
            deep_body = instructional_body(text)
            deep_missing = [
                group.name
                for group in DEEP_CONTRACTS[content_id]
                if not has_group(deep_body, group)
            ]
        if locale != "EN":
            # Character ratios are especially misleading for CJK.  Keep the
            # threshold conservative and pair it with heading structure; the
            # result remains an editorial signal, never a quality score.
            if source_chars and localized_chars / source_chars < 0.30:
                compressed.append(f"reader_text_ratio={localized_chars/source_chars:.2f}")
            if source_heading_count >= 12 and localized_heading_count < max(6, int(source_heading_count * 0.55)):
                compressed.append(f"heading_ratio={localized_heading_count}/{source_heading_count}")
        if missing or compressed or deep_missing:
            findings.append(Finding(content_id, kind, locale, path_text, missing, compressed, source_heading_count, localized_heading_count, source_chars, localized_chars, deep_missing))
    return findings, errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="emit machine-readable findings")
    parser.add_argument("--fail-on-missing", action="store_true", help="return non-zero when semantic groups are missing")
    parser.add_argument(
        "--deep",
        action="store_true",
        help="check targeted concept groups for high-risk units; findings are editorial signals",
    )
    parser.add_argument(
        "--fail-on-deep-missing",
        action="store_true",
        help="return non-zero when a targeted concept group is absent",
    )
    args = parser.parse_args()
    try:
        matrix = json.loads(read(MATRIX_PATH))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"SEMANTIC_CONTRACT_AUDIT_FAILED: {exc}")
        return 1
    findings, errors = audit(matrix, include_deep=args.deep or args.fail_on_deep_missing)
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
            if finding.deep_missing:
                details.append("deep_missing=" + ",".join(finding.deep_missing))
            print(f"ATTENTION {finding.content_id}.{finding.locale}: {finding.path} | " + " | ".join(details))
        print(f"SUMMARY files_checked={len(locale_paths(matrix))-len(errors)} findings={len(findings)} missing_contract={sum(bool(f.missing) for f in findings)} compression_signals={sum(bool(f.compressed) for f in findings)} deep_missing={sum(bool(f.deep_missing) for f in findings)}")
    if errors or (args.fail_on_missing and any(f.missing for f in findings)) or (args.fail_on_deep_missing and any(f.deep_missing for f in findings)):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
