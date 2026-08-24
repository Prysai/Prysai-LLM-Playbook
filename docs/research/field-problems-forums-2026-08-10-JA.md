<!-- content_id: field-problems-forums-2026-08-10 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Codex／AI コーディングエージェントの実際の作業面の問題：フォーラムと公開 Issue の調査

**調査日：**2026-08-10  
**状態：**`candidate`（出典を読み整理した。ローカル再現はなく、フォーラムの提案を公式結論にしていない）  
**範囲：**権限、Windows、VS Code、sandbox のネットワーク、ディレクトリへのアクセス。  
**実行境界：**Stack Exchange API、Stack Overflow のリンク、`openai/codex` の公開 Issue を読み取っただけで、投稿中のコマンド、秘密、commit、push は扱っていない。

## 記録の読み方

- **ユーザー報告：**作者が述べた環境、症状、再現の説明。
- **回答者の提案：**コミュニティの workaround であり、製品の約束ではない。
- **公式確認：**公式文書、メンテナーの明示的な回答、公式コードやリリースノート。一般の Issue 作者は公式確認ではない。
- **ローカル再現：**今回の調査では実行していない。
- **推測：**作者または回答者の原因判断。確実な事実として扱わない。

時刻は各出典サイトのもの。ファイルが主張するのは 2026-08-10 にアクセスできたことだけで、ローカルで検証した時系列ではない。

## 教材にできるケース

### 1. sandbox のネットワーク allowlist が GitHub を遮断

- **出典：**[Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **症状：**Codex CLI、`sandbox_mode = "workspace-write"`。`curl -I https://github.com` が `blocked-by-allowlist` に似た Proxy エラーで失敗。
- **境界：**ユーザー報告、回答、推測のみ。再現や公式確認はない。
- **安全な確認：**sandbox のネットワーク禁止、Proxy allowlist、DNS/TLS、企業ファイアウォールを分け、URL、HTTP 状態、Proxy エラー、実効権限を記録する。必要なドメインだけを秘密なしで試す。
- **主張しないこと：**`workspace-write` が Internet を含むこと、ネットワークを有効にすれば全 CLI が接続できること、回答の設定が現在の公式構文であること、承認を省くために full access を使うこと。

### 2. Windows で Codex CLI のネイティブ対応が不明

- **出典：**[Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **症状：**Windows 11、PowerShell/Command Prompt、WSL2。公式資料から非対応と文書不足を区別できない。
- **境界：**WSL2 と Windows ネイティブの提案が食い違い、公式確認・再現なし。
- **安全な確認：**バージョン、インストール元、`where`/PATH、シェル、WSL ディストリビューション、プロジェクトのファイルシステムを記録し、バージョン確認と読み取り検査から始める。
- **主張しないこと：**投稿だけでネイティブ対応を断定すること、WSL2 と Windows の動作が同じだとすること。

### 3. VS Code 拡張の `spawn UNKNOWN`、CLI の手動起動は可能

- **出典：**[Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **症状：**企業管理下の Windows、安定版 VS Code、PowerShell Constrained Language Mode。CLI は動くが拡張 host が `spawn UNKNOWN`。
- **安全な確認：**VS Code、拡張、CLI のバージョン、`where.exe`、拡張 host のログ、シェルのポリシー、`.exe`/`.cmd` shim を別々に記録する。
- **主張しないこと：**PATH が正常なら拡張も使えること、原因が必ず PATH であること、企業ポリシーを回避してよいこと。

### 4. `approval_policy = "on-failure"` でもファイルごとに確認される

- **出典：**[Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **症状と境界：**VS Code、Windows/WSL、workspace trusted。ファイル変更のたびに承認を要求する。採用回答は別のバージョン・環境だった。
- **安全な確認：**「確認を求めるか」と「sandbox が許可するか」を分け、実効設定、セッション、workspace、writable roots を確認して小さく復元可能な変更を試す。
- **主張しないこと：**`never` が full access、workspace-write が全ファイルの変更許可だとすること。

### 5. Windows Terminal に文字化けした記号が出る

- **出典：**[Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **症状：**追加の記号が出るが、ウィンドウの resize で一時的に消える。
- **安全な確認：**端末、シェル、フォント、サイズ、コードページ、バージョンを記録し、新しいウィンドウ、再描画、別端末、テキスト出力を比較する。
- **主張しないこと：**`chcp 65001` が必ず直すこと、必ず UTF-8 の問題であること、resize が恒久的な workaround であること。

### 6. sandbox で private ディレクトリの読み取りを止めたい

- **出典：**[Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **症状：**Codex CLI、Linux の `~/private` 例。プロンプト遵守ではなくカーネルの読み取り境界を求める。
- **安全な確認：**OS の権限で隔離し、private data を workspace の外に置く。profile、絶対パス、cwd、writable roots、helper を非機密ファイルで確認する。
- **主張しないこと：**全プラットフォームで同じ deny 規則が使えること、全外部送信を防げること、モデルが読めないと言ったことがカーネル証拠であること。

### 7. Maven 依存関係のダウンロードに失敗

- **出典：**[Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **症状：**Java/Spring Boot、`./mvnw clean test`、`Network is unreachable`、続いて依存バージョン不足。
- **安全な確認：**ネットワーク不可と POM/バージョン問題を分け、Maven settings、Proxy、対象ドメイン、キャッシュを記録する。承認済み Proxy や準備済みキャッシュを優先する。
- **主張しないこと：**未知の公開 Proxy を勧めること、OpenAI に到達できれば Maven Central、GitHub、全ドメインにも到達できるとすること。

### 8. Windows Computer Use がウィンドウを列挙できない

- **出典：**[openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **症状と境界：**`EnumWindows failed`。公開 bug ラベルはメンテナーの確認ではない。
- **安全な確認：**通常のアプリを列挙できるか確認し、ウィンドウ API、helper のパス/インストール、権限/アクティブデスクトップを分けて記録する。
- **主張しないこと：**全 Windows Computer Use が使える／使えないこと、helper が起動するだけで制御経路が検証済みであること。

### 9. Windows Desktop の作業中にコマンド画面が一瞬出る

- **出典：**[openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **症状：**前面の console と `conhost.exe` 子プロセスが一瞬現れ、未承認の活動に見える。
- **安全な確認：**親子プロセス、パス、署名、時刻、バージョンを記録し、アイドル時と作業時を比較する。必要ならソースや秘密を含まない最小フィードバックを送る。
- **主張しないこと：**一度の点滅を外部送信やマルウェアと断定すること、alpha 版の挙動をすべての Desktop 版に広げること。

### 10. writable root と cwd の権限表示が矛盾する可能性

- **出典：**[openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **症状：**生成された説明は cwd を編集可能とするが、実際の `apply_patch` は承認を要求し、別の root だけが writable。
- **安全な確認：**実際の拒否／承認を基準に cwd、roots、実効 profile、生成プロンプト、対象を記録し、cwd 内・許可 root 内・外部の3点で試す。
- **主張しないこと：**権限説明が OS enforcement の証拠、`workspace-write` だけで cwd が書き込み可能、バージョンのコードとテストを見ずに修正済みだとすること。

## 共通の最小診断カード

1. モデルのプロンプト、承認ポリシー、sandbox enforcement、OS 権限、ネットワーク Proxy、対象ツールを分ける。
2. バージョン、プラットフォーム、インストール元、シェル/端末、cwd、実効設定、正確なエラー、プロセス木、失敗 URL を集める。
3. 秘密なしで復元可能な1ファイルまたは1ドメインのテストを行い、投稿中のインストール、Proxy、権限拡大コマンドをそのまま使わない。
4. 実効設定を確認する。編集したファイルが実行中のセッション、拡張、アプリの設定とは限らない。
5. 起動、読み取り、書き込み、ネットワーク、VS Code 統合、Computer Use 制御を別々に受け入れる。

## 出典、ライセンス、利用境界

Stack Overflow は CC BY-SA 4.0 と表示されている。本ファイルは要約とリンクだけを使い、長文、コード、回答者のコマンドをコピーしない。GitHub Issue は公開ユーザー報告であり、OpenAI の公式確認ではない。外部画像、コード、Skill の指示はコピーしていないため、新しい資産登録は不要である。

## ブロッカーと未確認事項

- 公式 Codex URL は今回リダイレクトされ、最終本文を確実に取得できなかったため、公式の意味を確認済みとは書かない。
- GitHub REST API の匿名レート制限で詳細・コメントの追加取得が止まった。利用できたページ、検索結果、Issue 要約だけを使う。
- Reddit、GitHub Discussions、信頼できる引用ができないページは含めない。
- フォーラムの問題はローカル再現していない。すべて未検証のまま残す。
- フォーラム内容、バージョン、設定構文、サポート範囲は変化する。公開前に URL、一次資料、確認日、バージョン範囲を再確認する。
