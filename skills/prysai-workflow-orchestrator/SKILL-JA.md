<!-- content_id: prysai-workflow-orchestrator | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# ワークフロー・オーケストレーター

定義、タスク・プロトコル、計画、段階的な実行、確認、レビュー、納品、保守にまたがる
複雑な Codex 作業を調整します。複数の手順、ファイル、ツール、分野、チェックポイント、
またはエンドツーエンドの納品が必要な依頼に使います。単一の限定された操作、学習の説明、
単独の証拠監査、一回限りの調査には使いません。

## 起動条件と引き継ぎ

少なくとも二つの依存する段階、チェックポイント、復旧、複数の成果物、分野をまたぐ調整が
ある場合に担当します。

次の場合は引き継ぎます。

- 限定されたサブタスクに `$skill` が明示された：一つの段階として記録し、範囲を守る。
- 単一の不明確な操作：先に Task Protocol。
- 教えることだけが目的：Codex Coach。
- 証拠だけをレビューする：Evidence Review。
- 出典の発見・統合だけが目的：Research Router。
- Skill の選択だけが目的：Skill Selector。
- 共有の製品ポジショニング・コンテキストだけが目的：Product Context。

許可される内部引き継ぎループは `orchestrator -> task protocol -> one domain route ->
evidence review -> orchestrator checkpoint` だけです。段階からオーケストレーターを
呼び出したり、新しい所見や範囲変更なしに完了した段階を再開したりしません。

## 必須入力と不足項目の扱い

`outcome`、`non_goals`、`stages`、`dependencies`、`allowed_actions`、
`acceptance_evidence`、`checkpoints`、`rollback`、`owner` を要求します。段階や依存関係が
不明なら、`blocked_on` を含む提案計画を返します。契約には `decision_owner`、正確な
`delivery_target`、各 `commit` がローカルコミット、プッシュ、プルリクエスト、公開の
どれを意味するかも記載します。経路やリスクが変わる最小の質問だけをします。

段階を `in-progress` にする前に、次を記録します。

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

`delivery_target`、担当者、受け入れ証拠、ロールバックのいずれかが欠ければ実行を
ブロックします。対象を推測してはいけません。

## ライフサイクルとチェックポイント

1. 結果、利用者、非目標、リスク、受け入れ条件を定義する。
2. タスク・プロトコルを一度作成または確認する。
3. 担当者と証拠を持つ、可逆な垂直段階に分割する。
4. 一度に一段階だけ実行し、差分、ログ、実行 ID を残す。
5. 宣言した各主張を、適切なテスト、実行、ブラウザー、出典、セキュリティ、視覚、
   人による証拠で確認する。
6. 範囲、仮定、保守性、失敗経路をレビューする。
7. 完了、未完了、推論、ブロック、次の手順を分けて納品する。
8. 保守、出典更新、移行、ロールバックを記録する。

納品先は段階グラフの一部です。ローカルコミット、共有ブランチへのプッシュ、プルリク、
公開が複数要求される場合は、それぞれ別の段階にします。

## リスク、副作用、確認

各段階を `R0` 読み取り専用、`R1` 可逆なローカル、`R2` 共有・外部、`R3` 本番・不可逆・
秘密・広い権限に分類します。権限拡大、秘密へのアクセス、外部メッセージ、コミット・
プッシュ・公開、本番変更、不可逆操作の直前で止めます。オーケストレーションは以前の
無関係な承認を引き継ぎません。利用者は対象、段階、影響を明示して確認します。

## 強制停止と復旧

所有者不明、受け入れ条件不足、安全でない対象、衝突する指示、ロールバック失敗、証拠の
喪失、新しい仮説なしの反復失敗では `blocked` で停止します。失敗を保存し、範囲を狭め、
証拠に基づく変更を一つだけ行い、関連する確認だけを再実行します。権限を広げたり無限に
再試行したりしません。

## 固定の出力

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## 証拠と状態の対応

段階には `not-started`、`in-progress`、`blocked`、`verified`、`accepted` を使います。
全体は探索なら `practice`、構造と基本確認を通過すれば `candidate`、宣言した全段階と
境界事例に証拠があれば `verified`、リリース、セキュリティ、所有、保守、ロールバックの
ゲートまで通過して初めて `production-ready` とします。

## 保守記録

- `source`: `docs/book-architecture.md`、`docs/charter.md`、`docs/quality/skill-quality-standard.md`
- `license`: オリジナルの書き直し。外部資料は引き続き参考資料です。
- `owner`: workflow-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
