<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# フィールドケース：中断したタスクは、再試行する前にいったん止める

## まずここから：中断を見えないものにしない

選択したモデルが利用できなくなると、次のプロンプトを送ったり、設定を変えたり、タスクはほぼ終わったと考えたりしやすい。先に止まる。次の試行を始める前に小さなチェックポイントを作り、知っていることと期待していることを分ける。

1. 目標を一文で書く。
2. 実際に確認できる最後の成果物（diff、テスト結果、メモ、または成果物がないという事実）を残す。
3. 欠けている結果はすべて `unknown` とし、安心できる物語で穴を埋めない。
4. 前のタスクが完了、部分完了、未知のどれかを言えるまで、次の行動を一つだけ選ばない。

このページはオフラインの判断練習である。プロンプトの送信、モデルの再試行や変更、アカウントの確認は行わず、どのプロバイダーがどう動くかも確定しない。目的はもっと小さい。中断は、次のタスクになる前に確認できる受領記録を残す。

![中断チェックポイント：新しいプロンプトの前に止まり、既知と未知を記録してから限定した判断を選ぶ。](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## ケースの基本情報

- `case_id`：`FC-CAPACITY-01`
- `title`：中断したタスクは、再試行する前にいったん止める
- `problem`：モデルが利用できないというメッセージでタスクが中断され、観察していない結果を完了扱いしない必要がある。
- `audience`：モデル支援の作業画面を使う初心者とレビュー担当者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第6章、第9章、第19章
- `related_labs`：Lab 001、Lab 013
- `related_skills`：Interruption Checkpoint、Task Protocol、Evidence Review、LLM Comparison Protocol
- `related_evaluations`：`three-task-smoke-v1`（`not_run`）

## 出典の記録

- `source_type`：`github_issue`
- `source_url`：https://github.com/openai/codex/issues/33865
- `source_title`：選択したモデルが利用できなくなったという公開報告
- `source_author_or_publisher`：GitHub の公開 Issue 作者
- `accessed_at`：2026-08-14。[モデル容量に関するフィールドシグナル](field-signal-model-capacity-budget-2026-08-14.md)にも記録されている。
- `source_license_or_usage_boundary`：参照用の公開報告。本ケースでは独自の要約と架空のオフライン fixture を使う。
- `quotation_policy`：Issue の文章、コメント、ログ、アカウント情報、モデル名、マシン情報、コマンド出力、回避策、スクリーンショット、タスク内容はコピーしない。
- `source_scope`：Issue が示すのは、ある作者が特定日に選択モデルの利用不可を公開報告したことだけである。原因、頻度、現在の可用性、再試行動作、サービス方針、キューの意味、修正、別の画面・アカウント・モデル・プロバイダーの挙動は示さない。関連フィールドシグナルの API レート制限資料も API の境界を説明するだけで、この Codex 報告の原因を示さない。

## 報告された状況

- `user_report_summary`：公開 Issue の作者が、指定された状況で容量に関するメッセージが出て選択モデルを使えなかったと報告した。
- `observed_symptom`：完全なタスク結果を得る前に選択モデルが利用できなくなった、と出典は述べている。
- `expected_behavior`：作者は選択モデルが目的のタスクに使えると期待していた。それはプロバイダーの保証ではない。
- `official_boundary`：報告された Codex 事象については `unknown`。関連 API 文書は API 自身のレート制限だけを説明する。
- `product_surface`：出典では CLI。ここでは再現していない。
- `product_version`：検証済みの事実として確定していない。
- `operating_system`：検証済みの事実として確定していない。
- `model_or_provider`：意図的に省略。モデル比較ではない。
- `network_or_auth_context`：未確認。アカウントや権利は使っていない。
- `input_shape`：明確な受け入れ確認を持つ限定したローカル編集タスク
- `risk_level`：後続のプロンプトが不明なローカル状態に作用する可能性がある場合は `medium`

## 主張と証拠の表

| 主張 | 証拠クラス | 出典または成果物 | 日付 | 範囲 | 限界 | 状態 |
|---|---|---|---|---|---|---|
| 公開報告者が Codex の状況で選択モデルを利用できなかったと述べた。 | `reported` | [GitHub Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | 日付のある一つの公開報告 | 再現、診断、頻度測定、サポート保証ではない | candidate |
| OpenAI API 文書は API のリクエストレート制限とレスポンスヘッダーを説明する。 | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits)、[フィールドシグナル](field-signal-model-capacity-budget-2026-08-14.md)で範囲を限定 | 2026-08-14 | API 文書のみ | この報告の原因や Codex の動作を定義しない | candidate |
| 中断したタスクが完了、部分完了、または安全に再開できる。 | `not_observed` | ローカルタスク、再試行、アカウント、モデル、成果物を確認していない | 2026-08-14 | このリポジトリ | 証拠がないことは作業がなかったことを意味しない | unverified |
| 後続プロンプトの前に明示的なチェックポイントを残すべきである。 | `project_inference` | 本オフラインケース、第6章と第9章、`three-task-smoke-v1` | 2026-08-14 | 保守的な学習方法 | 復旧、文脈の保存、中断の防止を保証しない | candidate |

## 再現状況

- `reproduction_status`：`not_run`
- `reproduction_scope`：モデルの選択、タスクの送信、アカウントの確認、リクエストの再試行、設定変更、サービスのテレメトリ取得は行っていない。
- `fixed_input_or_fixture`：**学習への変換**にある架空の記録
- `logs_or_artifacts`：独立レビュー済みのオフライン実行を後で承認する場合に限り、学習者のチェックポイント記録を残す。
- `independent_reviewer`：保留
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小限の安全な診断経路

| 手順 | 読み取り専用の確認または低リスク行動 | 期待する観察 | 停止条件 |
|---|---|---|---|
| 1 | 架空のタスクを止め、目標、最後に見えた成果物、受け入れ確認をローカルの記録に写す。 | 目標と観察していない結果が分かれる。 | 目標、成果物の種類、受け入れ確認が不明なら停止し、後続プロンプトを送らない。 |
| 2 | 列挙された成果物だけを使い、前の状態を `complete`、`partial`、`unknown` に分類する。 | 欠けた証拠が見えたままになる。 | 受け入れ証拠なしに `complete` と記録しない。 |
| 3 | 限定した読み取り検査、記録を添えた新しいタスク、現在の公式ヘルプ／ステータス経路での一時停止のどれか一つを選ぶ。 | 次の行動が自分の証拠を持ち、中断前の証拠を引き継がない。 | 再試行、モデルや設定の変更、クレジット消費、コンテキストのアップロード、再開の主張の前に停止する。 |

- `allowed_actions`：架空ケースを読み、ローカルのチェックポイントを書き、証拠を分類し、将来の判断を一つ命名する
- `forbidden_actions`：プロンプト送信、再試行、モデル・設定変更、アカウント閲覧、クレジット消費、ファイル送信、API 呼び出し、コミット、プッシュ、公開、秘密の使用
- `minimal_safe_probe`：実際の製品データを含まない5行のローカルチェックポイント
- `stop_condition`：最後の成果物、その受け入れ上の意味、次の外部行動の権限が欠けている
- `rollback_or_cleanup`：不要な架空のローカル記録を削除する。システム、アカウント、リポジトリは変更されていない。

## 学習への変換

- `learner_problem`：初心者が小さな変更を書いている途中でモデル利用不可のメッセージを見て、「続きから進めて」と送ろうとする。
- `core_concept`：見える中断、成果物、タスクの成功は別のもの。新しい試行は前の証拠を受け継がない。
- `decision_to_teach`：記録を残して新しいタスクの前に限定した検査をするか、停止して現在の公式ヘルプ／ステータス経路を使う。前者はローカル証拠を明確にし、後者は権限や証拠がないとき活動を増やさない。どちらも容量、復旧、完了を保証しない。
- `smallest_experiment`：次の架空の記録だけを使う。

  ```text
  goal: ローカルの練習ページに受け入れチェックを1行追加する
  last_visible_event: モデル利用不可のメッセージが表示された
  artifact_available: 完了要約、diff、テスト結果を確認していない
  tempting_next_action: 「続きから進めて」と送る
  ```

  ツールを開かず、次のチェックポイントを作る。

  ```text
  goal: 受け入れチェックを1行追加する
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: diff またはファイル表示、およびチェック結果
  next_decision: blocked — 新しいタスクの前にこの記録を残す
  external_actions: not_run
  ```

- `intentional_failure`：行が追加された、再試行は安全に続く、モデルが悪い、API レート制限が原因だと断定する。
- `required_artifact`：6行のチェックポイントと、新しいプロンプトでは前のタスクの完了を証明できない理由を一文で説明した記録
- `acceptance`：目標を記録し、成果物がなければ `unknown` を保ち、中断と完了を分け、原因やプロバイダーを主張せず、`external actions: not_run` を記録する。
- `transfer`：タイムアウト、ブラウザーセッションの消失、ツールの欠落、切断した引き継ぎなどにも同じチェックポイントを使う。不変なのは次の行動に新しい証拠が必要なこと。変わるのは観察可能な成果物と安全な境界である。
- `forbidden_claims`：現在のサービス可用性、原因、キュー動作、再試行成功、モデル品質、プラットフォーム同等性、課金、タスク完了、安全性の効果、学習者の能力、転移成功、または本番準備完了

## 内容の位置

- `primary_chapter`：[第9章 — 検証、疑い、復旧](../../book/chapters/09-verification-and-recovery-JA.md)
- `supporting_chapters`：[第6章 — モデル選択](../../book/chapters/06-model-selection-JA.md)、[第19章 — モデルとワークフローの評価](../../book/chapters/19-evaluate-models-and-workflows-JA.md)
- `primary_lab`：[Lab 013 — 監査可能な垂直スライス](../../book/labs/lab-013-l3-vertical-slice-JA.md)
- `supporting_labs`：[Lab 001 — 最初の安全なタスク](../../book/labs/lab-001-first-safe-task-JA.md)
- `related_skill`：[Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md)、[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)、[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)、[LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture`：[three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md)、`not_run`
- `update_registry_entry`：公開報告の変更、公式 Codex ガイドの追加、実行提案、製品固有の復旧手順の要求があれば見直す。

このケースは既存の公開シグナルを学習可能な形にするが、章、Lab、Skill、評価、プラットフォームに関する主張の成熟度は上げない。

## プライバシー、権限、保守

- `personal_data_removed`：はい。出典の人物、アカウント、環境詳細を再利用しない。
- `secrets_removed`：はい。認証情報、トークン、プラン、モデル識別子、パス、タスク内容、ログを含めない。
- `private_paths_removed`：はい
- `copyrighted_material_boundary`：独自要約と架空 fixture のみ。Issue の文章、コメント、回避策、文書本文はコピーしない。
- `asset_register_entry`：`docs/sources/asset-register.md` の S103
- `volatile_facts`：Issue 状態、メタデータ、サービス可用性、API レート制限、製品制御、ヘルプ経路、プラットフォーム動作
- `next_review`：2026-09-14、または復旧・容量・製品の主張をする前
- `change_trigger`：出典変更、公式 Codex 文書の採用、実行提案、再試行や設定を教える要望
- `owner`：research-maintainer

## 主張の境界

- `what_can_be_claimed`：日付のある公開報告を、出典、証拠クラス、再現状態、オフラインチェックポイント、停止条件を備えた候補ケースとして表現した。
- `what_must_not_be_claimed`：報告が頻発する、現在も正しい、再現できる、API レート制限が原因である、中断が安全に再開できる、特定のプロバイダーが優れている、練習が損失を防ぐ、学習・実行・リリース・本番の証拠が得られた、とは言わない。
- `next_smallest_check`：同意を得て独立レビューした架空チェックポイントのオフライン実行。アカウント、モデル、タスク、プロンプト、プロジェクト、利用量、個人情報、外部サービスのデータを収集しない。
- `current_status`：`candidate`
