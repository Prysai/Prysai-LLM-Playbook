<!-- content_id: book-table-of-contents | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: dd08a68 -->

# Codex: From First Task to Real Work — 書籍目次 v0.2

> 日本語の目次ページ（`JA`）です。既存の
> `book/table-of-contents.md` を基に、22 章、13 の実験、状態の境界、現実の
> 問題研究への入口を保持しています。章・実験の本文や実行時検証が六言語
> 移行済みだと示すものではありません。

## 移行状態とリンク規則

- このページの `content_status` は `candidate`、元のリビジョンは `dd08a68` です。
- 22 章の記録と 13 個の実験ファイルをすべて残しています。
- 章は `candidate`、実験は `draft` かつ `run_status: not_run` です。
- 第 6 章に関係する変動しやすい主張は `claim_status: disputed`、第 22 章は
  `claim_status: current | disputed` です。
- 既存の日本語入口は `-JA` ファイルへリンクします。第 1 章と lab-011 には
  `-JA` 版があります。その他の章と実験は移行中であり、リンク文にその状態を
  明記します。共有のガバナンス、評価、研究資料は `locale-neutral` と明記します。
- 別の言語へ暗黙にフォールバックしません。ローカライズ先がないリンクには
  その移行状態をリンク文に表示します。

## 読書の入口

- [日本語版プロジェクト入口](../README-JA.md)
- [日本語版書稿入口](README-JA.md)
- [日本語版序文](preface-JA.md)
- [学習パス契約 — locale-neutral](../docs/governance/learning-path.yaml)
- [ロケール・マトリクス — locale-neutral](../docs/governance/locale-matrix.yaml)

## 第 I 部：GPT の理解から最初の安全な利用まで

### 第 1 章：GPT を理解してから Codex の仕組みを理解する

モデルがコンテキストからどのように生成するか、Codex がモデルを作業環境に
接続する方法、コンテキスト・ツール・Skill・権限・観測可能な Agent ループが
結果に与える影響を扱います。**content_status：** `candidate`

- 章：[第 1 章・JA ソース](chapters/01-gpt-and-codex-JA.md)
- 実験：[lab-011・JA ソース](labs/lab-011-gpt-codex-boundaries-JA.md)

### 第 2 章：最初の安全で検証可能なタスクを完了する

低リスクのタスクを選び、最初のタスク・プロトコルを書き、確認点を設定し、
納品の証拠を残します。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/02-first-safe-task.md)
- 実験：[lab-001・移行中・現在のソース](labs/lab-001-first-safe-task.md)

### 第 3 章：願いをタスク・プロトコルに変える

目標、背景、入力、制約、許可された行動、受け入れ条件、失敗処理、納品形式を
定義します。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/03-task-protocol.md)
- 実験：[lab-002・移行中・現在のソース](labs/lab-002-task-protocol.md)

### 第 4 章：コンテキスト、権限、Agent の行動境界

コンテキストの層、信頼境界、sandbox、承認、外部副作用、観測可能な挙動を
扱います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/04-context-permissions-and-agent.md)
- 実験：[lab-007・移行中・現在のソース](labs/lab-007-action-boundaries.md)

### 第 5 章：適切な Codex の作業面を選ぶ

デスクトップアプリ、CLI、IDE、Cloud、Remote などの入口をタスクに応じて
選択する方法を学びます。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/05-choose-the-codex-surface.md)
- 実験：[lab-007・移行中・現在のソース](labs/lab-007-action-boundaries.md)

### 第 6 章：モデル選択はモデル崇拝ではない

タスクセット、コスト、速度、安定性、検証によってモデルを比較し、モデルの
位置づけに関する仮説を検証します。**content_status：** `candidate` · 関連する
変動しやすい主張：`claim_status: disputed`

- 章：[移行中・現在のソース](chapters/06-model-selection.md)
- 研究：[OpenAI/Codex の基準線 — locale-neutral 研究](../docs/research/openai-codex-baseline.md)

## 第 II 部：利用者からワークフロー設計者へ

### 第 7 章：Skill、Plugin、MCP、ツールの役割分担

方法、接続、実行、配布の各層を理解し、最小限で有効な能力の組み合わせを
選びます。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/07-skills-plugins-and-tools.md)
- 実験：[lab-004・移行中・現在のソース](labs/lab-004-skill-selection.md)

### 第 8 章：定義から納品までの完全なライフサイクル

定義、計画、構築、検証、レビュー、納品、保守を扱い、検証可能な垂直スライス
で進めます。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/08-full-lifecycle-workflow.md)
- 主実験：[lab-013・移行中・現在のソース](labs/lab-013-l3-vertical-slice.md)
- 支援実験：[lab-009・移行中・現在のソース](labs/lab-009-engineering-lifecycle.md)

### 第 9 章：検証、疑い、復旧

完了の主張を主張と証拠に分解し、不確実性、失敗、復旧を扱います。
**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/09-verification-and-recovery.md)
- 実験：[lab-003・移行中・現在のソース](labs/lab-003-evidence-review.md)

### 第 10 章：計画と垂直スライス

大きな目標を、依存関係が明確で、実行でき、検査できる納品スライスに分割
します。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/10-planning-and-slicing.md)
- 実験：[lab-002・移行中・現在のソース](labs/lab-002-task-protocol.md) · [lab-013・移行中・現在のソース](labs/lab-013-l3-vertical-slice.md)

### 第 11 章：本当に役立つ Skill を設計する

起動境界、段階的開示、リソース、スクリプト、出力、失敗例、評価、バージョン
を扱います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/11-designing-a-skill.md)
- 実験：[lab-005・移行中・現在のソース](labs/lab-005-design-a-skill.md)

### 第 12 章：Agent のループ、状態、停止条件

観察、計画、行動、フィードバック、再試行、確認、停止を扱い、隠れた推論を
推測せずに挙動を説明します。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/12-agent-loop-and-stop.md)
- 実験：[lab-006・移行中・現在のソース](labs/lab-006-agent-stop-conditions.md)

### 第 13 章：ファイル、ターミナル、ブラウザ、GitHub の行動境界

読み取り専用の確認、編集、コマンド、ブラウズ、コミット、プッシュ、外部
メッセージ、ロールバックを扱います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/13-action-boundaries.md)
- 実験：[lab-007・移行中・現在のソース](labs/lab-007-action-boundaries.md)

## 第 III 部：Skill、ツール、専門的な実践

### 第 14 章：外部 Skill を発見し、導入し、監査する

索引から信頼できる能力へ進むために、出典、ライセンス、依存関係、認証、
起動、保守を確認します。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/14-discover-and-audit-skills.md)
- 実験：[lab-004・移行中・現在のソース](labs/lab-004-skill-selection.md) · [lab-005・移行中・現在のソース](labs/lab-005-design-a-skill.md)

### 第 15 章：研究トラック：問いから監査可能な知識へ

研究質問を絞り込み、出典、引用、方法、再確認、開示、完全性を扱います。
**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/15-research-track.md)
- 実験：[lab-008・移行中・現在のソース](labs/lab-008-research-question.md)

### 第 16 章：エンジニアリング・トラック：アイデアから信頼できるソフトウェアへ

要件、仕様、計画、段階的実装、テスト、デバッグ、レビュー、リリース、移行を
扱います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/16-engineering-track.md)
- 実験：[lab-009・移行中・現在のソース](labs/lab-009-engineering-lifecycle.md)

### 第 17 章：マーケティング・トラック：製品理解から成長実験へ

製品コンテキスト、対象者、ポジショニング、コンテンツ、コンバージョン、
計測、アトリビューションを扱います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/17-marketing-track.md)
- 実験：[lab-010・移行中・現在のソース](labs/lab-010-product-context.md)

### 第 18 章：コンテンツ、デザイン、データ、自動化のトラック

すべての Skill を盲目的に導入せず、タスクの能力クラスタごとに外部エコシステムを
使います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/18-content-design-data-automation.md)
- 実験：[lab-004・移行中・現在のソース](labs/lab-004-skill-selection.md)

## 第 IV 部：熟練した利用から組織化へ

### 第 19 章：モデルとワークフローを評価する

タスクセット、反復実験、人手によるスコアリング、エラー分類を構築します。
**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/19-evaluate-models-and-workflows.md)
- 実験：[lab-003・移行中・現在のソース](labs/lab-003-evidence-review.md) · [lab-009・移行中・現在のソース](labs/lab-009-engineering-lifecycle.md)
- 評価フレームワーク：[locale-neutral ガバナンス](../docs/quality/evaluation-framework.md)

### 第 20 章：個人の Codex ワークシステムを作る

プロジェクトのコンテキスト、メモリ、テンプレート、通常のワークフロー、振り返りを
扱います。**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/20-personal-codex-work-system.md)
- 実験：[lab-001・移行中・現在のソース](labs/lab-001-first-safe-task.md) · [lab-010・移行中・現在のソース](labs/lab-010-product-context.md)

### 第 21 章：チーム能力システムを作る

共有 Skill、`AGENTS.md`、権限、評価、レビュー、貢献、バージョン管理を扱います。
**content_status：** `candidate`

- 章：[移行中・現在のソース](chapters/21-team-capability-system.md)
- 実験：[lab-012・移行中・現在のソース](labs/lab-012-team-capability-migration.md)

### 第 22 章：継続的な更新と将来への適応

変動しやすい事実を見つけ、出典を更新し、モデルを移行し、ツールを監査し、古い
能力を削除します。**content_status：** `candidate` · 関連する変動しやすい主張：
`claim_status: current | disputed`

- 章：[移行中・現在のソース](chapters/22-continuous-update-and-future-proofing.md)
- 実験：[lab-008・移行中・現在のソース](labs/lab-008-research-question.md) · [lab-010・移行中・現在のソース](labs/lab-010-product-context.md)

## 実験インデックスと状態の境界

リポジトリには 13 個の実験ファイルがあります。すべて `draft` で、
`run_status: not_run` です。目次のリンクは読書入口であり、実験や学習成果が
検証済みである証拠ではありません。

| 実験 | 焦点 | 状態 | 入口 |
|---|---|---|---|
| lab-001 | 最初の安全なタスク | `draft` · `not_run` | [移行中・現在のソース](labs/lab-001-first-safe-task.md) |
| lab-002 | タスク・プロトコル | `draft` · `not_run` | [移行中・現在のソース](labs/lab-002-task-protocol.md) |
| lab-003 | 証拠レビュー | `draft` · `not_run` | [移行中・現在のソース](labs/lab-003-evidence-review.md) |
| lab-004 | Skill の選択 | `draft` · `not_run` | [移行中・現在のソース](labs/lab-004-skill-selection.md) |
| lab-005 | Skill の設計 | `draft` · `not_run` | [移行中・現在のソース](labs/lab-005-design-a-skill.md) |
| lab-006 | Agent の停止条件 | `draft` · `not_run` | [移行中・現在のソース](labs/lab-006-agent-stop-conditions.md) |
| lab-007 | 行動境界 | `draft` · `not_run` | [移行中・現在のソース](labs/lab-007-action-boundaries.md) |
| lab-008 | 研究質問 | `draft` · `not_run` | [移行中・現在のソース](labs/lab-008-research-question.md) |
| lab-009 | エンジニアリング・ライフサイクル | `draft` · `not_run` | [移行中・現在のソース](labs/lab-009-engineering-lifecycle.md) |
| lab-010 | 製品コンテキスト | `draft` · `not_run` | [移行中・現在のソース](labs/lab-010-product-context.md) |
| lab-011 | GPT、Codex、ツール、Agent | `draft` · `not_run` | [JA ソース](labs/lab-011-gpt-codex-boundaries-JA.md) |
| lab-012 | チーム能力の移行 | `draft` · `not_run` | [移行中・現在のソース](labs/lab-012-team-capability-migration.md) |
| lab-013 | 監査可能な L3 垂直スライス | `draft` · `not_run` | [移行中・現在のソース](labs/lab-013-l3-vertical-slice.md) |

## 評価、状態、現実の問題研究

- [実験インデックス — 移行中・現在のソース](labs/README.md)：13 個の実験、レベル、分野、移行焦点、`lab_status`。
- [コンテンツ統合マトリクス — locale-neutral ガバナンス](../docs/content-matrix.md)：能力マッピングと、テーマが重複したときに追加される能力。
- [評価フレームワーク — locale-neutral ガバナンス](../docs/quality/evaluation-framework.md)：コンテンツと能力の受け入れ基準。
- [学習パス契約 — locale-neutral ガバナンス](../docs/governance/learning-path.yaml)：レベル、主実験、支援実験、進級条件。
- [Codex の現実のユーザー問題研究 — locale-neutral 研究](../docs/research/field-problems-codex.md)：公式の根本原因を装わない公開問題の入口。
- [現実の問題研究インデックス — locale-neutral 研究](../docs/research/field-problems-index-2026-08-10.md)：FP、FP-S、FUP、フォーラムの発見と章・実験の位置を対応付けます。
- [フォーラムと公開 issue の研究 — locale-neutral 研究](../docs/research/field-problems-forums-2026-08-10.md)：信頼できる Stack Overflow API/ページと GitHub issue の要約。
- [公式基準線の研究アーカイブ — locale-neutral 研究](../docs/research/openai-codex-baseline.md)：変動しやすい主張の出典境界。

L0、L3、L6 の独立した主実験は、[lab-011・JA ソース](labs/lab-011-gpt-codex-boundaries-JA.md)、[lab-013・移行中](labs/lab-013-l3-vertical-slice.md)、[lab-012・移行中](labs/lab-012-team-capability-migration.md)です。
