<!-- content_id: field-problems-index-2026-08-10 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: field-problems-index-2026-08-10.md | source_revision: 2026-08-10 -->

# 現場問題の調査インデックス（2026-08-10）

**状態:** `candidate`。公開ユーザー報告の案内と証拠の範囲を示す記録です。公式インシデント一覧でも、このプロジェクトによるローカル再現報告でもありません。

複数の調査記録にあるケース ID、原典、確認日、バージョン範囲、教材上の行き先をまとめています。ここで扱うのはプロジェクト独自の要約と診断方法だけで、外部の投稿、コード、画像、ログ、認証情報、Skill の指示文は転載しません。

## 調査記録

| 記録 | 対象範囲 | 出典と確認日 | 証拠の範囲 | 主な教材上の行き先 |
|---|---|---|---|---|
| [FP](field-problems-codex.md) | Codex CLI/App、認証、GitHub ホスト、コネクタ、Skill、モデル、検証 | `openai/codex` の原 Issue、2026-08-09 | 主にユーザー報告。ローカル再現なし。保守担当者が確認していない推測を原因とは扱わない | 第5、9、12、13、14、15、22章 |
| [FP-S](field-problems-surface-2026-08-10.md) | サーフェス、Provider、WSL、ディレクトリのルート、worktree、Cloud、Computer Use、スレッド所有権 | `openai/codex` の原 Issue、2026-08-10 | ユーザー報告。Issue が `closed` でも修正済みとは限らない。ローカル再現なし | 第5章、Lab 007、第13章、Lab 013 |
| [FUP](field-problems-follow-up-2026-08-10.md) | サブ Agent の引き継ぎ、ツール登録、2つ目のディレクトリ、WSL プロキシ、HTTP 507 | `openai/codex` の原 Issue、2026-08-10 | ユーザー報告。ローカル再現なし。公式な原因確認なし | 第5、8、9、12、13、19章、Lab 013 |
| [FUP-P2](field-problems-follow-up-2026-08-10-p2.md) | macOS Local Network 権限、Linear OAuth ループ、サブ Agent の古い UI 状態、Windows 権限セレクターの永続化 | `openai/codex` の Issue と OpenAI/Apple の公式境界、2026-08-10 | ユーザー報告。原因未確認。ローカル再現なし。回避策は修正を意味しない | 第4、5、9、12章、Lab 001、002、003 |
| [フォーラム](field-problems-forums-2026-08-10.md) | Stack Overflow の sandbox ネットワーク、Windows、VS Code の spawn、承認、エンコーディング、非公開パス、Maven、確認可能な GitHub Issue の要約 | Stack Exchange API、特定可能な Stack Overflow ページ、公開 GitHub Issue、2026-08-10 | Stack Overflow の回答はコミュニティの提案。Reddit、Discussions、確実に確認できないページは除外。ローカル再現なし | 第5、7、9、13章、Lab 013 |

## 本文で使うケースの対応表

| ID | 報告者の言葉による症状 | バージョン／環境の記録 | 現在の状態と証拠 | 教材上の対応 |
|---|---|---|---|---|
| [FP-02](field-problems-codex.md#fp-02：浏览器显示认证成功，但-token-exchange-失败) | ブラウザのページは成功するが、クライアントの token exchange が失敗する | Codex/CLI 0.147.0、Windows 11、WSL/Linux。2026-08-07 作成、2026-08-09 整理 | Issue `open`、ユーザー報告、このプロジェクトでは未再現 | 認証ページ、callback、交換、最初の副作用なしリクエストを分け、失敗したら `blocked`/`unverified` で止める |
| [FP-03](field-problems-codex.md#fp-03：github-enterprise-only-用户被-pr-入口错误地探测到-githubcom) / [FP-04](field-problems-codex.md#fp-04：github-connector-无法为第二个组织建立-installation) | CLI や最初の組織は動くが、アプリの host や2つ目の組織の installation が合わない | App 26.715.31251 / 26.727.40816、macOS。2026-07-22、2026-08-01 作成 | Issue `open`、ユーザー報告、未再現 | hostname、アカウント、組織、リポジトリ、installation を分けて確認し、未確認のまま権限を要求しない |
| [FP-S-05](field-problems-surface-2026-08-10.md#fp-s-05：windows-linked-worktree-中的-apply_patch-被误判为项目外) / [FP-S-06](field-problems-surface-2026-08-10.md#fp-s-06：界面显示已切到-worktree，但-agent-仍在原-checkout-工作) | worktree の表示、shell、patch、Git ディレクトリが一致しないことがある | CLI 0.147.0/PowerShell 7.6.4 の Windows、または Desktop 26.715.52143 の macOS。2026-08-10 整理 | Issue `open`、ユーザー報告、未再現 | `cwd`、worktree root、workspace root、IDE パス、Git 状態を読み取り専用で確認し、一致するまで書き込みを止める |
| [FUP-01](field-problems-follow-up-2026-08-10.md#fup-01：子-agent-被创建，但任务消息没有到达) / [FUP-05](field-problems-follow-up-2026-08-10.md#fup-05：长时间没有任何事件，随后-http-507-并自动重试) | 状態や再試行は成功に見えるが、メッセージ到着、最初の副作用、結果が確認できない | 2026-08-10 作成／確認。正確なバージョンは報告による | Issue `open`、ユーザー報告、未再現 | 固定した短い語とチェックポイントで作成、到着、実行、返却を証明し、再試行前に diff と外部状態を読む |
| [フォーラム-1](field-problems-forums-2026-08-10.md#1-sandbox-内访问-github-被网络-allowlist-拦截) / [フォーラム-3](field-problems-forums-2026-08-10.md#3-vs-code-扩展-spawn-unknown，但-cli-能手动启动) | ネットワーク allowlist や VS Code host が失敗しても、別の層は正常に見える | Codex CLI、Windows/VS Code、企業ポリシーなど。原典のタイムスタンプを使用 | ユーザー報告と回答者の提案。公式確認なし。未再現 | sandbox、proxy、PATH、拡張 host、対象ツールを分け、ネットワークを広げたりポリシーを迂回したりしない |
| [WF-09](web-field-problems-2026-08-10.md#wf-09：浏览器能读到弹窗，但点击证据仍未成立) | ページと DOM は読めるが、クリック呼び出しがタイムアウトする | Windows のブラウザ操作、2026-08-10 確認 | ユーザー報告、未再現 | ページ表示、要素特定、呼び出しの返却、ページ変化を別々に記録し、「読み取りは確認済み、クリックは未確認」と引き継ぐ |
| [P2-01](field-problems-follow-up-2026-08-10-p2.md#p2-01：网络开关已启用，但-macos-local-network-权限仍阻断-lan) | タスク metadata はネットワーク有効を示すが、macOS Local Network 権限が LAN を止める。権限を開けた後も HTTP 401 だった | Desktop 26.727.51351 / bundled CLI 0.146.0-alpha.9.2、Darwin arm64、2026-08-10 | ユーザー報告と公式境界。原因未確認。HTTP 401 は認証層に到達したことだけを示す。未再現 | 設定、システム権限、TCP/HTTP、認証を分ける |
| [P2-02](field-problems-follow-up-2026-08-10-p2.md#p2-02：linear-oauth-显示已接受，但只读调用持续重新认证) | Linear OAuth は受け入れ済みでも、同じ read-only `get_issue` が認証を繰り返し求める | CLI 0.146.1、macOS arm64、2026-08-10 | ユーザー報告と公式コネクタ境界。回避策は公式確認なし。未再現 | 第4、5章、Lab 002、003。一度だけ副作用なしで再試行して止める |
| [P2-03](field-problems-follow-up-2026-08-10-p2.md#p2-03：子-agent-已完成，但父任务界面仍显示-active) | 状態照会は sub-Agent 完了を示すが、結果を開くまで親タスクが Active のまま | macOS 26.6.1。Windows のコミュニティ報告もある。2026-08-10 | ユーザー報告。UI 状態機械やバックグラウンド処理の原因未確認。未再現 | 実行終端、結果の read-back、親タスク状態を分けて記録 |
| [P2-04](field-problems-follow-up-2026-08-10-p2.md#p2-04：windows-权限选择器因旧持久化布尔值而灰掉) | 権限セレクターが灰色になり、古い永続値を置き換えると UI は戻ったが、実効ポリシーは別途観察が必要 | Desktop 26.803.5235.0、Windows 11 Pro 22631、x64、2026-08-10 | ユーザー側の診断。内部実装と修正は未確認。未再現。状態ファイルの手編集を公式手順にしない | 第4章、Lab 001、003。先にバックアップし、低リスク probe と承認動作を確認 |

## 証拠レベルと再確認のルール

- `ユーザー報告` は、その人が指定した環境で症状を見たと述べたことだけを示します。複数環境での報告でも自動的に公式確認にはなりません。
- `回答者の提案` はコミュニティの回避策とリスクの記録です。現行の設定構文やサポート方針に自動昇格させません。
- `公式確認` には保守担当者の明示的な返信、公式文書、修正記録、確認可能なリリースノートが必要です。自動重複排除 bot は含めません。
- `ローカル再現` は、このプロジェクトで実行し証拠を保存して初めて記入できます。この索引にローカル再現はありません。
- 変化しやすいケースを本文で引用するときは、元 URL、Issue 状態、報告時のバージョン／プラットフォーム、確認日、「このプロジェクトでは未再現」という境界を残します。`closed` はページ状態であり、修正や全アカウントでの利用可能性を意味しません。

## フォーラムとライセンスの境界

Stack Overflow ページには CC BY-SA 4.0 が示されています。本プロジェクトは事実の要約、問題構造、リンクだけを使い、長い原文、コード、回答者のコマンドを転載しません。GitHub Issue は公開ユーザー報告の出典として引用するだけで、作者、ラベル、検索結果を OpenAI の公式確認とは扱いません。Reddit、GitHub Discussions、現在の環境で確実に確認できないページは本文の証拠に含めません。

**次回の確認:** 元 URL を再訪し、保守担当者の返信、関連 PR、修正バージョン、ページ状態、現在の適用範囲を記録します。新しい証拠がなければ `candidate`、`unverified`、`blocked` のままにし、`verified` へ昇格させません。
