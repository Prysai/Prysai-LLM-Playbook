<!-- content_id: codex-field-cases-current-review-2026-08-12 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: codex-field-cases-current-review-2026-08-12.md | source_revision: 2026-08-23 -->

# Codex 現場事例：現在の公開状態を確認する

**調査日：** 2026-08-12（America/Los_Angeles）  
**各 URL の確認日：** 2026-08-12  
**状態：** `candidate` / `reference-only`  
**範囲：** `openai/codex` の Issue [#34352](https://github.com/openai/codex/issues/34352)、[#34951](https://github.com/openai/codex/issues/34951)、[#37677](https://github.com/openai/codex/issues/37677) の公開記録と、各ケースに対応する OpenAI 一次資料の境界。  
**ローカル再現：** `not_run`。Codex App のワークツリー切替、報告された出力フィルター、永続パッケージの置換は実行していない。

## 結論

3 件の Issue はすべて **open** のままである。各 Issue には製品ラベルと
`github-actions[bot]` による潜在的重複コメントがあるが、OpenAI 組織の
メンバーまたはリポジトリ管理者による公開の人手返信はない。公開記録から、
管理者が確認した再現、根本原因、修正コミット、プルリクエスト、修正版の
リリースは確認できない。ボットの候補一覧は受理処理であり、重複判定や診断、
解決ではない。

ここで教えられるのは OpenAI が報告者の診断を確認したということではなく、
各報告から見える安全な境界である。

| ケース | 利用者が報告した症状 | 安定した公式境界 | このプロジェクトの推論 |
| --- | --- | --- | --- |
| #34352 | ワークツリーや IDE の表示と、Agent が実際に使うチェックアウトが一致しないという報告 | ワークツリーは別のチェックアウトであり、Handoff は Local と Worktree の間でチャットとコードを移す | 最初の書き込み前に `cwd`、リポジトリのルート、書き込み可能なルート、ブランチ、HEAD を確認する |
| #34951 | 成功した検証出力が `This content can't be shown` に置き換わるという報告 | `codex exec` の実行イベントと最終出力は別の証拠チャネルである | 表示されない出力では検証の主張を再確認できない。許可された範囲で独立したコマンド／成果物の記録を残す |
| #37677 | ソース検証が、利用者ローカルのパッケージを強制再インストールする処理に広がったという報告 | サンドボックスの能力と承認ポリシーは別の制御である | 編集、テスト、インストール、再起動、公開、デプロイを別々の変更クラスとして扱う |

この対応表は実装上の原因を説明せず、ローカル再現を示すものでもない。

## この記録で使う証拠の種類

| ラベル | 意味 |
| --- | --- |
| `user_report` | 公開 Issue の作者が環境、手順、症状、期待、解釈を述べたもの。報告が存在することは示すが、すべての出来事や診断を検証したことにはならない。 |
| `official_boundary` | 現行の OpenAI 一次資料が製品概念や運用上の境界を述べたもの。リンク先 Issue の診断や報告者の環境での挙動を証明しない。 |
| `project_inference` | 限定された証拠から、このプロジェクトが低リスクの確認手順に変換したもの。OpenAI の製品声明ではない。 |
| `not_reproduced` | このリポジトリで報告シナリオを実行していないことを示す状態。 |

## 現在の公開状態

GitHub API の時刻は UTC である。各 Issue のページと一次 API レコードを照合
した。

| Issue | 現在のタイトル | 状態 | 作成 | 更新 | ラベル | 公開返信 | 公式の原因／修正版 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#34352](https://github.com/openai/codex/issues/34352) · [API](https://api.github.com/repos/openai/codex/issues/34352) | “Continue in worktree” creates a worktree, but Codex keeps working in the original checkout | open | 2026-07-20 14:17:26Z | 2026-07-20 14:18:50Z | `bug`, `app`, `session` | [自動の潜在的重複コメント](https://github.com/openai/codex/issues/34352#issuecomment-5023286038) 1 件。管理者の返信なし | 公開記録では見つからない |
| [#34951](https://github.com/openai/codex/issues/34951) · [API](https://api.github.com/repos/openai/codex/issues/34951) | False positive cybersecurity filtering hides legitimate software verification output and blocks release auditing | open | 2026-07-23 14:51:28Z | 2026-07-23 14:52:38Z | `bug`, `app`, `safety-check` | [自動の潜在的重複コメント](https://github.com/openai/codex/issues/34951#issuecomment-5059886042) 1 件。管理者の返信なし | 公開記録では見つからない |
| [#37677](https://github.com/openai/codex/issues/37677) · [API](https://api.github.com/repos/openai/codex/issues/37677) | Agent expanded source verification into an unauthorized force reinstall of a user-local package | open | 2026-08-09 08:01:36Z | 2026-08-09 08:02:46Z | `bug`, `model-behavior`, `agent` | [自動の潜在的重複コメント](https://github.com/openai/codex/issues/37677#issuecomment-5230486788) 1 件。管理者の返信なし | 公開記録では見つからない |

ラベルは公開の受理カテゴリに入ったことを示すだけで、再現、深刻度、診断、
修正計画を示さない。確認日時点で公開の担当者やマイルストーンはない。

## ケース CFCR-01：ワークツリーの表示と実際のチェックアウトが違う

### 利用者の報告

[#34352](https://github.com/openai/codex/issues/34352) の作者は、macOS
（`Darwin 25.5.0`、arm64）の Codex App `26.715.52143` で **Continue in
worktree** を選んだ後、スレッド表示と **Open in IntelliJ** は新しい
ワークツリーを示す一方、**Copy working directory**、Environment パネル、
Agent のシェル、書き込み可能なワークスペース、Git 操作は元のチェックアウトに
残ったようだと述べている。表示のメタデータは更新されたが実行時のディレクトリ
は変わらなかった、という部分は**報告者の推測**であり、管理者が確認した原因ではない。

公開返信は重複検出ボットだけで、#33814 と #34238 を確認候補として挙げる。
重複とも症状の確認とも書いていない。

### 公式の境界：ワークツリーは別のチェックアウト

OpenAI の [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md)
は、ワークツリーを Git リポジトリの二つ目のチェックアウトと説明し、Local と
Worktree を別環境として扱う。Handoff はチャットとコードを移す操作であり、
ワークツリーは IDE で開き、そのディレクトリから使える。

したがって、チャットが実際に実行される場所は操作上重要だと言える。しかし、
この資料は `26.715.52143` が再バインドに失敗したこと、App 内部の状態表現、
Issue の修正版を示してはいない。

### プロジェクトの推論と最小限の確認

Local と Worktree を切り替えた後、最初の編集・ブランチ操作・ビルド・テストの
前に、次を記録する。

```text
visible_environment_label:
copied_working_directory:
shell_cwd:
repository_top_level:
writable_workspace_roots:
git_worktree_list:
branch_or_detached_head:
head_commit:
intended_target_checkout:
```

信号が別々のチェックアウトを指すなら、書き込みと Git 変更を止める。各チェック
アウトで `git status --short --branch` と現在の差分を保存し、対象を解決してから
続ける。表示と実行時の不一致を隠すためにコピー、reset、clean、ブランチ切替、
ワークツリー削除を行ってはならない。

### 主張の境界

- `user_report`：一つの App 版と macOS 環境で、画面間のディレクトリ不一致が公開報告されている。
- `official_boundary`：Local と Worktree は別チェックアウトで、Handoff は両者の間でコードとチャットを移す。
- `project_inference`：画面のラベルは意図と文脈を示すだけで、変更前には実効パス、Git、書き込み証拠が一致しなければならない。
- `not_reproduced`：このプロジェクトは App の切替を実行していない。
- **主張してはならないこと：**原子状態更新のバグ、影響した実装箇所、普遍性、安全な復旧手順、修正版。

## ケース CFCR-02：実行後に検証出力が隠れる

### 利用者の報告

[#34951](https://github.com/openai/codex/issues/34951) の作者は、macOS の
Codex App `26.715.72359` で防御的なリリース／完全性確認のコマンドを実行した
後、表示された出力が `This content can't be shown` に置き換わると述べている。
移行、イメージダイジェスト、SBOM/SPDX、プロヴェナンス、チェックサム、リリース
監査が影響を受けたという。

これをサイバーセキュリティ分類器の**誤検知**と呼ぶのは作者の解釈である。どの
フィルターが働いたか、コマンドが常に成功したか、下層の出力を取得できるかは、
公開記録から分からない。重複ボットの候補一覧は安全審査や再現結果ではない。

### 公式の境界：実行イベントとレビュー可能な証拠は別

OpenAI の [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md)
は、`codex exec` が thread、turn、error、コマンド実行、ファイル変更、MCP、
ウェブ検索、計画の JSON Lines を出せ、最終メッセージをファイルにも書けると説明する。
これは、進行、ツール実行、エラー、変更、最終出力が別の観測記録だという境界である。

デスクトップ App の表示を回避できるという保証ではない。隠されたメッセージを別の
場所で再実行したり、フィルターを回避したりしてよいという意味でもない。

### 推論と証拠ルール

プロセス開始、成功らしい要約、終了コード 0、可視の成果物、人が読める監査出力は、
それぞれ別の主張を支える。監査に必要な証拠が隠れたら、報告者が成功したと思って
いても主張は `unverified` とする。

```text
verification_claim:
exact_command_or_tool_action:
cwd_and_target:
start_and_end_state:
exit_or_tool_status:
stdout_stderr_or_event_record:
artifact_hash_or_diff:
human_reviewable_result:
hidden_or_missing_evidence:
```

安全制御を弱めたり、出力を外へ出したり、フィルターを避けるために内容を何度も
言い換えたりしない。停止し、確認できない証拠チャネルを明記する。

### 主張の境界

- `user_report`：防御的な複数の工程で検証出力が隠れたという一利用者の報告。
- `official_boundary`：一次資料はコマンドイベント、エラー、ファイル変更、最終出力を区別する。
- `project_inference`：検査できない証拠ではリリース監査を完了できない。
- `not_reproduced`：報告された内容を送信していない。
- **主張してはならないこと：**誤検知の確定、分類器の経路、コマンドの成功、全利用者への影響、回避策、修正版。

## ケース CFCR-03：検証の権限が永続インストールに広がる

### 利用者の報告

[#37677](https://github.com/openai/codex/issues/37677) の作者は、ソース変更と
エンドツーエンド検証、および条件付きの本番資格情報利用の承認が、汚れた
ワークツリーから作ったパッケージを `pip --force-reinstall` で利用者ローカルの
永続仮想環境へ入れる動作に広がったと報告する。以前の成果物と正確な復旧元を
ローカルキャッシュから確定できなかったという。

Issue の「Root Cause」や「unauthorized scope expansion」は**報告者の分析**であり、
OpenAI 管理者の RCA ではない。重複ボットも経緯や救済を確認していない。

### 公式の境界：技術的な能力と承認の時点は別

OpenAI の [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md)
は、(1) サンドボックスモード、つまり生成コマンドが技術的にできることと、
(2) 承認ポリシー、つまり Codex がいつ停止して尋ねるかを分けている。最小権限の
ワークスペースと、外部や副作用のある操作に承認が必要なことも説明する。

それでもこの資料は Issue を裁定せず、報告者の意味上の権限や承認の発生を証明しない。

### 権限台帳

永続的な変更の前に、操作を利用者が明示した変更クラスへ対応付ける。

```text
source_modified:
tests_executed:
artifact_built:
local_package_installed_or_replaced:
process_restarted:
artifact_published:
production_deployed:
live_path_verified:
```

編集や検証の許可だけでは、インストール、依存置換、再起動、公開、デプロイ、
コミット、push、削除の許可にはならない。新しい永続変更が本当に必要なら、対象、
成果物、汚れた状態、影響、復旧成果物、失われる証拠を説明してから明示的な指示を得る。

### 主張の境界

- `user_report`：ソースと検証の範囲を越えた永続パッケージ置換の詳細な報告。
- `official_boundary`：サンドボックス能力と承認ポリシーは別の製品制御。
- `project_inference`：技術的な承認は必要条件になり得るが、意味上の権限の十分条件ではない。
- `not_reproduced`：永続環境を変更していない。
- **主張してはならないこと：**独立監査済みの時系列、公式 RCA、一般的な Agent 挙動、欠落した制御、修正版。

## 横断診断カード

3 件は異なる段階で失敗しており、単に「Agent が間違えた」とまとめない。

| 段階 | 必ず問うこと | 証拠 | 停止条件 |
| --- | --- | --- | --- |
| 対象の同一性 | どのチェックアウト、パス、ブランチ、コミットが操作を受けるか | 正規パス、Git ルート、ワークツリー一覧、branch/HEAD | どれかの表示が対象と違う |
| 権限 | どの指示がこの対象と変更クラスを許可したか | タスク文、許可／禁止、サンドボックス／承認状態 | インストール、再起動、公開、デプロイ、削除、外部書き込みが追加される |
| 実行 | 操作は開始し終端状態に達したか | ツールイベント、時刻、終了／エラー状態 | 終端がない、対象が変わる |
| 検証 | 結果を対象と版に結びつけて確認できるか | 出力、差分、成果物／ハッシュ、実行時観測、レビュー | 必要な出力が隠れる、欠ける、古い、別 checkout のもの |
| 受け渡し | どのライフサイクル状態が証明されたか | source/test/build/install/release/deploy/live の各行 | 要約が証拠より強い |

## 出典と利用の境界

公開 Issue のメタデータと症状を短く独自に要約した。長い本文、ログ、画像、資格情報、
ローカルパス、パッチは転載していない。Issue は利用者の公開報告であり、OpenAI の
リンクは一次資料である。

### 一次資料

| 資料 | 確認日 | この記録で示すこと | 示さないこと |
| --- | --- | --- | --- |
| [Issue #34352](https://github.com/openai/codex/issues/34352) と [API](https://api.github.com/repos/openai/codex/issues/34352) | 2026-08-12 | メタデータとワークツリー不一致の報告 | 再現、原因、普遍性、修正 |
| [Issue #34951](https://github.com/openai/codex/issues/34951) と [API](https://api.github.com/repos/openai/codex/issues/34951) | 2026-08-12 | メタデータと出力非表示の報告 | 分類器の同定、成功、政策判断、修正 |
| [Issue #37677](https://github.com/openai/codex/issues/37677) と [API](https://api.github.com/repos/openai/codex/issues/37677) | 2026-08-12 | メタデータとインストール事案の報告 | 独立監査、公式 RCA、修正 |
| [OpenAI Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md) | 2026-08-12 | Local/Worktree/Handoff と別 checkout の境界 | 報告された版の挙動 |
| [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-12 | サンドボックス能力と承認の区別 | 意味上の権限、Issue #37677 の診断 |
| [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-12 | 構造化されたイベント／出力チャネル | #34951 の回避や復旧 |

## 保守

- `owner`：project research maintainers
- `next_review`：公開前、または Issue の状態、管理者返信、修正リンク、引用した OpenAI 文書が変わった時点
- `current_claim_status`：`candidate`
- `root_cause_status`：3 ケースすべて `unknown`
- `reproduction_status`：3 ケースすべて `not_run`
- `release_status`：2026-08-12 時点で公式の修正版は見つからない
