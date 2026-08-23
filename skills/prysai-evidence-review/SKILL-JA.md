<!-- content_id: prysai-evidence-review | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# 証拠レビュー

Codex、Agent、調査、マーケティング、ブラウザー、デプロイ、Skill、タスク完了に
関する主張を、他の人が確認できる観測可能な証拠と照合します。見た目は整って
いても不完全な結果、`verified`、`inferred`、`blocked`、`unknown` を分ける必要が
ある場合、または次に行う最小の確認を決める場合に使います。不足している確認を
自分で実行したり、調査ワークフローの代わりに使ったりしません。

証拠の不在は失敗の証明ではありません。状態を正確に付け、次の確認を示します。

## 起動条件と引き継ぎ

完了の主張、結果、差分、テスト、出典に基づく記述、スクリーンショット、ログ、
デプロイ報告、評価が入力に含まれる場合に担当します。

次の場合は引き継ぎます。

- 明示的に `$skill` が指定され、依頼が監査である場合だけレビューする（安全は
  引き続き適用する）。
- 不足している調査を実施したい：Research Router。
- 不明確なタスクを実行したい：Task Protocol。
- 複数段階のワークフローを実行したい：Workflow Orchestrator。
- Codex 以外の教材や練習問題がほしい：Learning Coach。
- Codex の教材や練習問題がほしい：Codex Coach。

レビュー対象を黙って修正してはいけません。修正は別のタスクとして適切な経路に
渡します。

## 必須入力と不足項目の扱い

`claims`、`scope`、`evidence`、`time_or_version`、`acceptance_rule` を要求します。
共有または外部公開された結果では各主張の `owner` も記録し、`not_observed` と
`failed` を区別します。主張が欠けていれば求めます。証拠が欠けていれば
`unknown` または `blocked` と評価し、安全にできる最小の確認を示します。もっとも
らしさ、記憶、成果物自身の主張で空白を埋めません。

## レビュー方法

各主張について、範囲、証拠の種類、鮮度、出所、カバレッジ、次の確認を記録します。
情報源が古い、生成物、モック、対象違い、または範囲が狭すぎる可能性を調べます。
主張に合わせて確認を選びます。ファイル変更は diff、ビルドはコマンド出力、実行時
動作は実行観測、見た目の主張はレンダリング結果、変動する事実は日付付きの権威ある
URL、嗜好に関する主張は定義したサンプルと方法を使います。`verified` はその証拠の
範囲だけを意味し、狭い結果を広い主張へ拡張しません。

### 学習に関する証拠の見方

練習や学習の主張では `process_pass` と `learner_outcome` を分けます。固定 fixture
のリビジョン、許可された補助、保存したベースライン試行、ヒントの記録、学習者が
自分で書いた修正、条件を変えた課題、評価者と閾値、保持を主張する場合の遅延、
要求された正確な状態を求めます。結果は狭く分類します。

- 選んだプロンプトまたは計画：`template_selected`;
- 指導付きループを完了：`practised`;
- 固定課題に合格：`demonstrated_on_this_task`;
- 未知の変更課題に合格：`transferred_to_[variation]`;
- 遅延後の未知の変更課題に合格：`retained_at_[delay]`。

モデルの回答、一回のセッション内の修正、モデル自身の採点、または一つの成功した
課題だけでは、`mastered`、`fluent`、`expert`、一般的な改善を認めません。Learning
Coach のレシートがあれば入力として使い、このレビューを二つ目の指導ループに
変えません。

## リスク、副作用、確認

レビューは読み取り専用なので通常のリスクは `R0` です。ローカル確認の再実行は
`R1`、ネットワーク取得、アカウントアクセス、本番の確認、成果物の変更は `R2`
以上で、明示した範囲と確認が必要です。証拠に秘密を載せません。確認を識別できる
だけの文脈を残して伏せ字にします。

## 強制停止

主張の範囲や対象が曖昧、出所が得られない、証拠にアクセスできない、確認に未承認
アクセスが必要、未検証の結果を `verified` と表示するよう求められた場合は
`blocked` で止めます。成果物自身の完了宣言は証拠になりません。

## 固定の出力

次を返します。

1. `review_scope`
2. `claim_table`（`claim`、`scope`、`evidence`、`freshness`、`status`、`next_check`）
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## 証拠と状態の対応

主張の状態には `verified`、`partially-verified`、`inferred`、`blocked`、`unknown`
を使います。成果物は探索中なら `practice`、構造と基本確認を通過したら `candidate`、
通常・境界・失敗・転移の証拠が範囲を覆えば `verified`、安全、保守、所有権、バージョン、
ロールバック、リリースのゲートまで通過した場合だけ `production-ready` とします。

## 保守記録

- `source`: `docs/quality/skill-quality-standard.md`、`docs/book-architecture.md`、
  `docs/quality/evaluation-framework.md`
- `license`: オリジナルの書き直し。外部資料は `docs/sources/asset-register.md` に
  従い参考資料として扱います。
- `owner`: evidence-systems maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
