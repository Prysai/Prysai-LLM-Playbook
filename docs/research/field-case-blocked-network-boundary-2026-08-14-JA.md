<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# フィールドケース：`FC-NETWORK-01` — ブロックされた依頼は権限を広げない

## まず境界を保つ

ブロックされた依頼は、現在の経路では先に進めないという意味である。無制限のネットワーク、プロキシ、より広い権限が許可されたという意味ではない。

設定に触る前に、次の三つを書く。

1. タスクが必要とする一つの外部結果。実在のエンドポイントや秘密を追加しない。
2. 最小限の例外を承認できる担当者、または代わりに使える承認済みのオフライン成果物。
3. 最小限で機密性のないプローブと、例外が承認された場合に残す証拠。

どれか一つでも不明なら、より限定した判断を求めて停止する。このページはオフラインの判断補助であり、設定ガイドではない。ネットワーク要求、プロキシ設定、実際の製品動作は扱わない。

## ケースの基本情報

- `case_id`：`FC-NETWORK-01`
- `title`：ブロックされた依頼は権限を広げない
- `problem`：ネットワーク要求がブロックされ、狭く検証可能な例外を申請するか、根拠なしにアクセスを広げるかを決める必要がある。
- `audience`：ツール付き開発環境を使う初心者とレビュー担当者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第 4 章、第 9 章、第 13 章
- `related_labs`：Lab 001、Lab 007、Lab 016
- `related_skills`：Task Protocol、Evidence Review
- `related_evaluations`：未割り当て

## 出典の記録

- `source_type`：`forum`
- `source_url`：https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`：サンドボックス化された Codex CLI セッションから外向きにアクセスすることについての公開質問
- `source_author_or_publisher`：Stack Overflow の公開投稿者
- `accessed_at`：2026-08-10。`field-problems-forums-2026-08-10.md` に記録した日付
- `source_license_or_usage_boundary`：公開報告は参照用。このケースでは独自の要約と架空のオフライン fixture だけを使う
- `quotation_policy`：投稿文、設定断片、ログ、認証情報、実環境の URL、回避コマンドはコピーしない
- `source_scope`：質問が示すのは、ある人がある環境で外向きの要求がブロックされたと述べたことだけである。現在の設定構文、公式の製品境界、安全な回避策、原因、別環境の挙動は示さない。

## 報告された状況

- `user_report_summary`：投稿者はサンドボックスを保ったままコマンドを公開ホストへ届けたかったが、タスクを終える前に要求がブロックされたと説明した。
- `observed_symptom`：プロキシや許可リストのような外向きのブロックが報告された。
- `expected_behavior`：狭いネットワーク経路がサンドボックスと共存することを期待していた。
- `official_boundary`：このケースでは `unknown`。現在の設定構文やサポート保証を教えない。
- `product_surface`：報告された CLI
- `product_version`：確認済みの事実として記録していない
- `operating_system`：確認済みの事実として記録していない
- `model_or_provider`：教材上の判断には関係しない
- `network_or_auth_context`：制限された外向き経路が報告されたが、アカウント、プロキシ、認証情報は調べていない
- `input_shape`：必要な公開ホスト（実際のホスト名は意図的に省略）
- `risk_level`：実際のタスクでネットワーク、プロジェクトの文脈、プロキシを広げるなら `high`

## 主張と証拠の表

| 主張 | 証拠クラス | 出典または成果物 | 日付 | 範囲 | 限界 | 状態 |
|---|---|---|---|---|---|---|
| サンドボックスの Codex CLI セッションで外向きの要求がブロックされたという報告がある | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | 一つの報告環境 | 質問は再現、診断、サポート保証ではない | candidate |
| 報告に現在かつ安全な設定手順が含まれる | `not_observed` | 設定はコピー、実行、独立レビューしていない | 2026-08-14 | 製品設定とデプロイ | このケースの対象外 | unverified |
| ブロックは無制限ネットワークやプロキシ変更の許可である | `not_observed` | 所有者の許可も実タスクもない | 2026-08-14 | ネットワーク方針を変える権限 | ブロックは限界の証拠であって、限界を外す許可ではない | unverified |
| 目的、理由、最小範囲、安全なプローブをレビューできるまで依頼をブロックしたままにする | `project_inference` | 本ケース、第 13 章、Lab 007、Lab 016 | 2026-08-14 | 外部副作用に関する保守的な教材ルール | ベンダー設定を定義せず、安全な例外も保証しない | candidate |

## 再現状況

- `reproduction_status`：`not_run`
- `reproduction_scope`：ネットワーク要求、実際のサンドボックス確認、プロキシ変更、許可リスト追加、アカウント利用は行っていない。
- `fixed_input_or_fixture`：**教材化**にあるオフライン記録
- `logs_or_artifacts`：許可された場合に残す境界カードと短い判断記録
- `independent_reviewer`：未定
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小限の安全な診断手順

| 手順 | 読み取り専用の確認または低リスクの行動 | 期待する観察 | 停止条件 |
|---|---|---|---|
| 1 | ローカル fixture に必要な結果、ホストの種類、許可された行動、証拠、停止条件を書く。 | 外部効果とタスクの目的が分かれる。 | ホスト、理由、所有者、データ区分、外部効果が不明なら停止する。 |
| 2 | 合成のブロックを `reported` と記録し、実効ポリシー、対象、最小範囲、安全なプローブの不足を列挙する。 | エラーのような記録は限界の証拠であり、診断ではない。 | 設定変更、製品の欠陥、解決成功を推測しない。 |
| 3 | 所有者への判断依頼に、ホストが必要な理由、機密性のない最小プローブ、残す証拠、戻し方を書く。 | 例外を承認、拒否、縮小できる。 | 実ネットワーク要求、プロキシやポリシー変更、インストール、アップロード、認証情報の使用前に停止する。 |

- `allowed_actions`：架空の記録を読む、証拠を分類する、ローカルの判断依頼を書く、オフラインの代替を見つける
- `forbidden_actions`：ネットワーク要求、方針編集、プロキシ追加、秘密の露出、依存関係のインストール、権限変更、commit、push、公開、アカウント利用
- `minimal_safe_probe`：4 行の境界カードと、ホストの最小範囲・機密性のないテストを記した承認依頼
- `stop_condition`：所有者の判断、データ分類、宛先、証拠計画、戻し方のいずれかが欠けている
- `rollback_or_cleanup`：保存する価値がなければ一時記録を削除する。架空の fixture は変更しない

## 教材化

- `learner_problem`：タスクに外部入力が必要だが、最初の要求がブロックされ、学習者は制限を外したくなる。
- `core_concept`：技術的な制限、タスクの必要、制限を変える権限は別の事実である。エラーは新しい権限を生まない。
- `decision_to_teach`：最小でレビュー可能な例外を申請して一時停止するか、承認済みのオフライン成果物を使うか、タスクを延期する。無言でアクセスを広げるより正直である。
- `smallest_experiment`：要求を出さず、次のオフライン記録だけで行う。

  ```text
  task: まだダウンロードしていない checksum を確認する
  local record: 必要な公開ホストへの要求が fixture でブロックされた
  proposed next action: 無制限ネットワークを有効にして再試行する
  ```

  次の記録を書く。

  ```text
  observed: fixture にブロックが記録されている
  known need: checksum のタスクに指定カテゴリの公開ホストが必要
  missing evidence: 実効ポリシー、所有者の承認、最小プローブ、戻し方
  decision: blocked — 最小の例外または承認済みオフライン成果物を依頼する
  external actions: not_run
  ```

- `intentional_failure`：ブロックを無制限ネットワークの許可と扱う、レビューなしにプロキシが安全だと言う、確認可能な成果物なしに checksum を検証済みとする。
- `required_artifact`：完成した記録、タスクの目的と権限要求を分ける一文、安全なオフライン代替
- `acceptance`：ブロックを診断せず記録する。ホストはカテゴリだけで示す。無制限の提案を拒否する。所有者の判断またはオフライン代替を記録する。`external actions: not_run` を残す。
- `transfer`：パッケージのダウンロード、調査 API、Webhook、ブラウザー送信にも適用する。不変なのは「技術的な必要は権限を作らない」という点で、対象と最小プローブが変わる。
- `forbidden_claims`：現在の Codex 設定、公式ネットワーク方針、製品の欠陥、安全なプロキシ、要求成功、ローカル再現、学習者の能力、安全性の有効性、転移成功、プロダクション準備完了

## コンテンツの配置

- `primary_chapter`：[第 13 章 — 行動の境界](../../book/chapters/13-action-boundaries-JA.md)
- `supporting_chapters`：[第 4 章 — コンテキスト、権限、Agent の行動境界](../../book/chapters/04-context-permissions-and-agent-JA.md)、[第 9 章 — 検証、疑い、復旧](../../book/chapters/09-verification-and-recovery-JA.md)
- `primary_lab`：[Lab 016 — 副作用の境界](../../book/labs/lab-016-side-effect-boundary-JA.md)
- `supporting_labs`：[Lab 001 — 最初の安全なタスク](../../book/labs/lab-001-first-safe-task-JA.md)、[Lab 007 — 行動の境界](../../book/labs/lab-007-action-boundaries-JA.md)
- `related_skill`：[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)、[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`：未割り当て
- `update_registry_entry`：公開出典、公式ポリシー、ライブ練習の提案、設定例の追加が変わったら見直す

このケースは過去のフィールドシグナルを検索可能な境界付きケースに変換する。関連する内容の成熟度は変えない。

## プライバシー、権限、保守

- `personal_data_removed`：はい。練習は架空で、実在の人物やエンドポイントを使わない
- `secrets_removed`：はい。認証情報、プロキシ、アカウント、プロジェクトパス、実 URL は含めない
- `private_paths_removed`：はい
- `copyrighted_material_boundary`：独自の要約と fixture だけを使い、投稿文、設定、回答はコピーしない
- `asset_register_entry`：`docs/sources/asset-register.md` の S88
- `volatile_facts`：出典の状態、製品設定、既定値、プロキシの挙動、製品サポート
- `next_review`：2026-09-14、または設定・安全性・実行・公開に関する主張の前
- `change_trigger`：出典または公式文書の変更、ライブ練習の提案、新しい設定例
- `owner`：research-maintainer

## 主張の境界

- `what_can_be_claimed`：以前の公開報告を、出典種別、症状、証拠クラス、再現状況、低リスク診断、停止条件を備えた候補ケースとして整理した。
- `what_must_not_be_claimed`：報告が現在も再現できる、原因が分かっている、無制限アクセスが必要・安全、製品が特定設定をサポートする、fixture が安全対策を証明する、学習者が判断を完了した、とは言わない。
- `next_smallest_check`：固定したオフライン記録を、独立レビューと同意のもとで実行する。ネットワーク通信、認証情報、アカウント、プロジェクト、プロキシ、個人データを扱わない。
- `current_status`：`candidate`
