<!-- content_id: prysai-interruption-checkpoint | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 中断チェックポイント

LLM 支援タスクが中断した後に観測可能な状態を保存し、安全な次の判断を一つ選びます。モデルが
利用できない、タイムアウト、セッション消失、ツール不足、受け入れ証拠が見える前の引き継ぎ
切断で使います。再試行、保存済みのやり取りの診断、既存主張の監査、プラットフォーム動作の
推測には使いません。

## 中断直後の経路だけを担当する

作業が途中かもしれず、見える中断の後に次の手順が不明な場合に使います。モデル不利用メッセージ、
タイムアウト、セッション消失、ツール不足、引き継ぎ切断などです。

次の場合は引き継ぎます。

- 保存済みの依頼、返答、期待結果の伝え方を修復：Communication Failure Triage;
- 完了、信頼性、リリース主張の証拠監査：Evidence Review;
- 名前付きプラットフォームの現在事実の確認：Source Investigator;
- 新規または変更タスクの行動・権限契約：Task Protocol。

プロバイダーの診断、根本原因の推測、モデル比較、アカウント状態の説明、一回の中断から一般復旧
手順の作成はしません。

## 最小の証拠パケットを保存する

依頼者がすでに見られるものだけを集めます。

1. `goal` — 意図した結果を一文で;
2. `observed_event` — 原因を付けず、見えた中断;
3. `last_inspectable_artifact` — diff、テスト結果、ファイル、メモ、または `none_observed`;
4. `acceptance_evidence` — 完了を示す確認、または `unknown`;
5. `external_actions` — 送信、変更、アップロード、支出、コミット、公開したものすべて、または `not_observed`。

足りない項目をもっともらしいアカウントで埋めず、秘密、トークン、パスワード、Cookie、非公開ログ、
アカウント画像、無関係な文脈を求めません。

## 物語を完成させず分類する

一つの状態だけを使います。

- `complete`: 宣言した受け入れ証拠がすでに見える;
- `partial`: 観測できる成果物はあるが、受け入れ確認を示さない;
- `unknown`: 成果物、その意味、受け入れ証拠がない。

中断メッセージは診断でもタスク証拠でもありません。新しいプロンプトが以前の完了証拠を引き継ぐ
こともありません。

## 境界のある次の判断を一つ選ぶ

既定は `R0` の `hold`：レシートを保存し、何もしません。

依頼者がローカルで可逆な一つの確認対象、求める観測、その確認だけでは以前の完了を証明できないことを
指定した場合だけ `R1` の `inspect_local` を提案します。この Skill は判断を記録し、確認を実行しません。

新しいタスク、再試行、ツール使用、モデル切り替え、設定変更、アカウント確認、ネットワーク要求、
アップロード、支出、コミット、プッシュ、公開、デプロイは Task Protocol に渡します。別途範囲を決めた
権限、チェックポイント、ロールバック、受け入れ確認が必要です。

## 停止条件

目標、最後の確認可能な成果物、受け入れの意味、次の外部操作の権限が欠ける場合は `blocked` です。
自動的に再試行せず、「途中から続けて」と送らず、モデルやアカウントを切り替えず、アカウントや外部
サービスを確認せず、部分成果物や安心させる返答で完了としません。

## チェックポイント・レシート

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

`unknown` を明示し、中断と完了を分け、未承認の外部操作を名前にせず、次の判断を一つだけ指定した
場合に受け入れます。これは候補の方法であり、タスクの復旧、サービスの利用可能性、学習者の運用を
証明しません。

## 保守記録

- `source`: 出典範囲を限定した中断ケース、Task Protocol、Evidence Review の境界から導いた Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。公開容量レポートと API 文書は参考資料です。
- `owner`: reliability-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
