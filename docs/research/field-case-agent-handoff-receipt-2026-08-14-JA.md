<!-- content_id: field-case-agent-handoff-receipt-2026-08-14 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: field-case-agent-handoff-receipt-2026-08-14.md | source_revision: 2026-08-23 -->

# フィールドケース：サブエージェントを作成しても、タスクの受領記録にはならない

## まず、確認できていないチェックポイントを特定する

タスク一覧にサブエージェントが表示されても、作業を受け取ったとは限らない。実際のタスクを委任する前に、次のチェックポイントを分けて記録する。

1. 引き継ぎ要求を作成した。
2. 受け手のエージェントを起動または再開した。
3. 受け手が無害なタスク受領記録を提示できる。
4. 受け手が指定された作業を完了した。
5. 親が検証可能な結果を受け取った。

配達を示すのは3番目だけである。これが確認できなければ引き継ぎを `blocked` と記録し、その経路で実タスクを送るのを止め、単一エージェントまたは人間による引き継ぎに切り替える。このページはオフラインの判断補助であり、エージェントの作成、メッセージ送信、セッション確認、製品診断は行わない。

![5つの引き継ぎチェックポイント：作成、起動、受領記録、実行、結果の返却。受領記録が配達のゲートになる。](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## ケースの基本情報

- `case_id`：`FC-HANDOFF-01`
- `title`：サブエージェントを作成しても、タスクの受領記録にはならない
- `problem`：親のワークフローではサブエージェントが作成されたように見えるが、受け手側でタスク本文を確認できない可能性がある。
- `audience`：複数段階のツール対応開発環境を使う初心者とレビュー担当者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第10章、第12章
- `related_labs`：Lab 013
- `related_skills`：Task Protocol、Evidence Review
- `related_evaluations`：未割り当て

## 出典の記録

- `source_type`：`github_issue`
- `source_url`：https://github.com/openai/codex/issues/37822
- `source_title`：作成済みと表示されてもタスクの受領記録が見えなかったという公開報告
- `source_author_or_publisher`：GitHub の公開報告者
- `accessed_at`：2026-08-14
- `source_license_or_usage_boundary`：参照のみの公開報告。本ケースでは独自の要約と架空のオフライン fixture を使う。
- `quotation_policy`：Issue の文章、コマンド、ログ、スクリーンショット、添付ファイル、アカウント、プロジェクトパス、プロバイダー設定、再現資料はコピーしない。
- `source_scope`：アクセス時の Issue メタデータは、公開された Open 状態の報告であることだけを示す。特定の作者が記した環境での説明と期待は示せるが、原因、現在の製品動作、頻度、公式にサポートされた回避策、別のアカウント、バージョン、プロバイダー、ワークフロー、プラットフォームの動作は示さない。

## 報告された状況

- `user_report_summary`：親からサブエージェントへの引き継ぎで、子は起動したように見えるのに、割り当てを受けていないかのように応答したという公開報告がある。複数の指定された画面と設定で症状が記述されている。
- `observed_symptom`：子タスクは表示または稼働中だったが、子の応答は意図したタスク文を受け取ったことを示さなかった。
- `expected_behavior`：報告者は、子が親のメッセージを受け取り、その内容に従って動作することを期待していた。
- `official_boundary`：`unknown`。内部実装、現在のサポート状況、設定、修正方法は扱わない。
- `product_surface`：デスクトップと CLI が報告されたが、どちらもここでは再現していない。
- `product_version`：出典にあるバージョンと設定は独立に確認していない。
- `operating_system`：出典はプラットフォームを記しているが、本プロジェクトでは確認していない。
- `model_or_provider`：カスタムプロバイダーの文脈が報告されたが、プロバイダー間の比較は行わない。
- `network_or_auth_context`：未確認。アカウント、認証情報、プロバイダー、接続は使用していない。
- `input_shape`：固定した架空の短い受領フレーズだけを確認する。実タスク、リポジトリ、ファイル、秘密、ユーザー内容は含めない。
- `risk_level`：受領確認前に不可逆な操作や機密情報を実ワークフローで委任する場合は `medium`

## 主張と証拠の表

| 主張 | 証拠クラス | 出典または成果物 | 日付 | 範囲 | 限界 | 状態 |
|---|---|---|---|---|---|---|
| 公開 Issue #37822 は、このケースの確認時点で存在し Open だった。 | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | 公開メタデータ | Open であることは、現行の不具合、優先度、再現性、未解決の原因を証明しない。 | candidate |
| ある報告者が、子は作成または起動したが受領記録が見えなかったと説明した。 | `reported` | 同じ公開 Issue | 2026-08-14 | 一人の作者が述べた環境と観察 | 独立した再現でも一般的な動作の主張でもない。 | candidate |
| 特定の内部フィールドや復号経路が原因でメッセージが失われた。 | `not_observed` | ローカル資料、実行、独立レビューなし | 2026-08-14 | 製品内部と診断 | 報告者の機構に関する推測をプロジェクトの事実にしない。 | unverified |
| 作成、起動、受領、実行、返却は分けて記録すべき主張である。 | `project_inference` | 本ケース、第10章、第12章、Lab 013 | 2026-08-14 | 保守的な多段階ワークフローの学習 | 実装、全失敗の検出、エージェントの安全性を保証しない。 | candidate |

## 再現状況

- `reproduction_status`：`not_run`
- `reproduction_scope`：引き継ぎツールの呼び出し、サブエージェントの作成、ログやセッションの確認、プロバイダーの利用、報告環境の実行はしていない。
- `fixed_input_or_fixture`：**学習への変換**にあるオフライン受領カード。
- `logs_or_artifacts`：許可された学習者実行を後で承認する場合に限り、架空のチェックカードと限定した判断記録を残す。
- `independent_reviewer`：保留
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小限の安全な診断経路

| 手順 | 読み取り専用の確認または低リスク行動 | 期待する観察 | 停止条件 |
|---|---|---|---|
| 1 | 架空の引き継ぎカードを読み、作成、起動、受領、実行、返却の各チェックポイントを記す。 | 表示された状態をタスク受領に格上げしない。 | 実タスク、私的内容、ツール、アカウント、設定が入ったら停止する。 |
| 2 | カードが作成と一般的な子の返答しか示さない場合、受領欄を `not_observed` にする。 | 引き継ぎは `blocked` となり、結果を受け入れない。 | 不具合、権限不足、安全な再試行条件を推測しない。 |
| 3 | 単一エージェントによる限定タスク、または人間が読める引き継ぎを代替策として選ぶ。 | 次の担当者が明確で、隠れた配達前提がない。 | エージェント作成、メッセージ送信、設定変更、実際の副作用の再試行前に停止する。 |

- `allowed_actions`：架空の記録を読み、観察を分類し、ローカルの受領記録を書き、委任しない代替策を選ぶ
- `forbidden_actions`：エージェントの作成・起動、タスク送信、秘密の露出、ログやセッションの読み取り、プロバイダーや機能フラグの変更、副作用の再試行、インストール、コミット、プッシュ、公開、アカウント利用
- `minimal_safe_probe`：固定フレーズ `RECEIPT-OK` で5項目カードを完成させる
- `stop_condition`：固定フレーズを実タスクに置き換える、代替策の担当者がいない、未レビューの外部副作用を追加する
- `rollback_or_cleanup`：有用な判断記録を含まない一時記録は削除し、架空の fixture は変更しない

## 学習への変換

- `learner_problem`：ダッシュボードにはヘルパーがいるように見えるが、学習者は割り当てを受け取ったか判断できない。
- `core_concept`：ライフサイクルが見えることとメッセージが届くことは別である。実行を信頼する前に、信頼できる引き継ぎの受領境界を置く。
- `decision_to_teach`：承認済みの別タスクの前に無害な受領プローブを使うか、受領がないままなら単一エージェントまたは人間に作業を残す。前者はチェックポイントを増やし、後者は遅くなる場合がある。どちらも配達の証拠を作り出さない。
- `smallest_experiment`：次のオフラインカードだけを使う。

  ```text
  handoff_id: demo-01
  parent_request: "正確に返す：RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "割り当てを待っています。"
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  ツールを実行せず、次の限定した判断記録を完成させる。

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — 単一エージェントまたは人間による引き継ぎを使う
  external_actions: not_run
  ```

- `intentional_failure`：`created` を配達の証拠とみなす、子に足りないタスクを推測させる、受領なしで実タスクを送る、報告を確認済みの製品不具合と表現する。
- `required_artifact`：完成した受領記録、観察できなかったポイントを示す一文、担当者つきの代替策
- `acceptance`：5つのポイントを区別し、メッセージ受領を未観察と記し、原因や設定を主張せず、実タスクを送らず、代替策を明記し、`external_actions: not_run` を記録する。
- `transfer`：同じカードをキュー・ワーカー、Webhook、承認システム、ビルドパイプライン、チームチケットに適用する。不変なのは、見えるライフサイクルイベントが次の実行者への内容の到達を証明しない点である。
- `forbidden_claims`：現在の Codex 不具合、内部機構、サポートされた設定、安全な再試行、実行結果、エージェント能力の保証、学習者の能力、転移成功、安全性の有効性、または本番準備完了

## 内容の位置

- `primary_chapter`：[第10章 — 計画と分割](../../book/chapters/10-planning-and-slicing-JA.md)
- `supporting_chapters`：[第12章 — エージェントのループと停止](../../book/chapters/12-agent-loop-and-stop-JA.md)、[第9章 — 検証と復旧](../../book/chapters/09-verification-and-recovery-JA.md)
- `primary_lab`：[Lab 013 — 垂直スライス](../../book/labs/lab-013-l3-vertical-slice-JA.md)
- `supporting_labs`：[Lab 007 — アクション境界](../../book/labs/lab-007-action-boundaries-JA.md)、[Lab 016 — 副作用の境界](../../book/labs/lab-016-side-effect-boundary-JA.md)
- `related_skill`：[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)、[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`：なし
- `update_registry_entry`：出典の変更、公式な製品境界の追加、管理されたローカル再現の提案、実行可能な引き継ぎ演習の依頼があったときに見直す。

このケースは古い公開シグナルを検索可能にし、安全な学習形に整える。関連する章、Lab、Skill、評価の成熟度は変えない。

## プライバシー、権限、保守

- `personal_data_removed`：はい。架空の演習で、出典の人物を再利用しない。
- `secrets_removed`：はい。アカウント、プロバイダー、パス、タスク内容、セッション内容を使わない。
- `private_paths_removed`：はい
- `copyrighted_material_boundary`：独自の要約と架空カードのみ。Issue の文章、コマンド、ログ、添付、画像、回答はコピーしない。
- `asset_register_entry`：`docs/sources/asset-register.md` の S89
- `volatile_facts`：Issue の状態、製品サポート、引き継ぎ動作、バージョン、プロバイダー、権限、実装詳細
- `next_review`：2026-09-14、または製品、実行時、設定、公開に関する主張の前
- `change_trigger`：出典の変更、公式文書での扱い、オンライン演習の提案、実行可能な引き継ぎの追加依頼
- `owner`：research-maintainer

## 主張の境界

- `what_can_be_claimed`：古い公開報告を、出典、症状、証拠クラス、再現状態、オフライン診断、停止条件を備えた限定ケースとして表現した。
- `what_must_not_be_claimed`：報告が現在も正しく再現できる、すべての引き継ぎが影響を受ける、原因が判明している、設定で直る、子が隠れたメッセージを受け取った、カードがすべての失敗を検出する、学習者が実際の委任を完了した、とは言わない。
- `next_smallest_check`：独立レビューと同意の後、指定環境で固定プローブを実行する。無害なフレーズだけを使い、セッション、リポジトリ、秘密、アカウント、私的タスク、個人情報を収集せず、副作用の前に停止する。
- `current_status`：`candidate`
