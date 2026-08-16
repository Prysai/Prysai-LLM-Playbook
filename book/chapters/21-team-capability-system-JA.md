<!-- content_id: chapter-21-team-capability-system | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第21章: チーム能力システムを作る

**状態:** `candidate`。**実験:** `draft / not_run`。これは静的なシミュレーションであり、接続、送信、書き込み、push、公開を許可せず、本番接続の動作も証明しません。

## この章の問題

一人なら経験でCodexの作業を導けます。しかしチームには、誰がルールを持つか、どのSkillを信用するか、誰が更新・撤回するかが必要です。共有した言葉、方法、証拠、責任がなければ、チームは説明できない個人の癖を配っているだけになります。

## 能力パッケージの四層

```text
共有する用語とプロジェクト規則
            ↓
再利用する方法とSkill
            ↓
実験、タスクセット、証拠の基準
            ↓
権限、レビュー、版管理、保守責任
```

方法だけでは不十分です。証拠は主張の範囲を定め、ガバナンスは利用、変更、公開、取り消しの担当を定めます。

## 判断: 権限と作業承認を分ける

| 行為 | 安全な範囲 | 承認 | 証拠と復旧 |
|---|---|---|---|
| 分析 | 匿名化した読み取り専用コピー | タスク所有者 | 入力とログ; コピーを破棄 |
| 下書き編集 | 隔離ブランチと指定ファイル | 所有者とレビュアー | hash、diff、検証; diffを戻す |
| チェック実行 | テストデータと指定コマンド | 実行担当 | logと終了コード; プロセスを止める |
| push/release | 指定リポジトリまたは下書き先 | レビュアーまたはrelease担当 | preview、受入、rollback; 版を戻す |
| 権限変更/秘密 | 最小・一時・取り消し可能 | 指名承認者 | 範囲、期限、監査; 直ちに取り消す |

ログイン済みやアクセス可能という事実は、タスク承認ではありません。範囲、対象、承認者、rollbackが不明なら `blocked` です。

## 行動: 最小パッケージ契約

```text
capability-pack/
├─ README.md                  # 目的、範囲、再現、限界
├─ manifest.yaml              # id、版、所有者、状態、次回レビュー
├─ context/project-context.md # 用語、境界、信頼できる情報
├─ protocol/task-protocol.md  # 入力、判断、行動、停止
├─ examples/                  # 成功例と失敗例
├─ eval/                      # 受入基準と証拠索引
└─ governance/                # 権限、責任、rollback
```

manifestには `id`、`version`、`owner`、`status`、出典とライセンス、次回確認日、許可範囲、rollbackを置きます。版番号は変更を追えるようにするもので、検証済みの証明ではありません。

## 実験: 二人で渡して再現する

一時リポジトリで「release前の文書レビュー」か「新メンバーのプロジェクト案内」を固定タスクにします。入力には完了項目、未確認項目、古いコマンド、確認が要る権限を入れます。Aは実行してhashとlogを残します。Bは口頭説明なしでパッケージと同じ入力だけを別コピーで使い、読んだもの、行為、停止箇所、diff、検証、暗黙知の不足を残します。Aは一層だけ直して `0.1.1` にし、Bが再実行します。

実サービスへ接続せず、データのアップロード、送信、push、公開、長期秘密の保存をしません。各runには `run_id`、担当者、版、入力hash、実変更、コマンドと終了コード、レビュアー、未検証項目、状態が必要です。候補の合格は、二人が理解、文脈、行為境界、証拠、失敗停止の五項目で8/10以上、無許可行為なし、口頭補足なしの再現です。不足があれば `candidate` または `blocked` のままです。

## 失敗例と振り返り

`owner` と `version` を消したパッケージは拒否します。すべての外部機能を静的リストで `requested` と書いても、実際の許可ではありません。範囲、対象、承認者、期限、rollbackを求めて停止します。欠けた点を共有用語、方法、証拠、ガバナンスに分類してください。「理解した」はlogやdiff、独立再現の代わりになりません。

## 受入チェック

- [ ] 個人の経験と共有する用語、方法、証拠、ガバナンスを分けられる。
- [ ] 版、所有者、出典、権限、rollbackを含むパッケージを作れる。
- [ ] 別の人が口頭補足なしで主要手順を再現できる。
- [ ] 各runにhash、log、diff、検証、未検証項目がある。
- [ ] 広すぎる権限やreleaseを止められる。

権限、接続、製品画面は変わる事実です。現行の公式資料を確認してください。この章は `candidate` のままであり、シミュレーションは本番接続やチーム成果を証明しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-JA.md">← 前の章<br><strong>第20章 · Codexで使う個人の作業システムを作る</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md">次の章は準備中 →<br><strong>第22章の提供状況を見る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
