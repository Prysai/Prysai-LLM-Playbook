<!-- content_id: chapter-05-choose-the-codex-surface | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# 第5章：適切なCodexの作業面を選ぶ

**状態：** `candidate`。この章には、作業面を選ぶ手順と、出典で確認できる製品上の境界があります。ただし、独立した学習者による事前テストはまだ終わっていません。この章を読んだだけで、あなたのアカウントで使える機能、Cloudでの実行、モデル比較が確認済みになるわけではありません。

## この章が解決する問題

同じ目標でも、デスクトップアプリ、CLI、IDE拡張、Webフローのどこからでも始められます。実際に処理が走る場所は、ローカル、Git worktree、Cloud環境のいずれかです。どこから操作を始めるかと、どこで変更が起きるかは、別々に選びます。

人はしばしば複数の段階を一文にまとめてしまいます。

~~~
「ブラウザのログインは通った。モデルも選択欄にある。setupも終わった。だからタスクの準備はできた。」
~~~

この文は、いくつもの理由で間違っている可能性があります。対象のリポジトリを読めないかもしれません。選んだモデルが、その作業面では使えないかもしれません。端末、ブラウザー、コネクター、ファイルツールがないこともあります。Cloudのsetupスクリプトにはネットワークがあっても、後のAgent段階にはない場合があります。Worktreeと表示されていても、shellやIDEは別のcheckoutを指しているかもしれません。

次の順序で進めます。上流の表示だけで、下流の実行や納品を推測しないことがポイントです。

~~~
作業面を選ぶ
→ エントリーポイントを選ぶ
→ 対象とアカウント境界を確かめる
→ モデルとツールを確かめる
→ 最小の行動をする
→ 納品前に根拠をレビューする
~~~

*作業面*は、処理が実行され、変更が書き込まれる場所です。*エントリーポイント*は、人がその作業を始め、結果をレビューする入口です。CLI、IDE、デスクトップ、Webは、Local、Worktree、Cloudの言い換えではありません。

## 学習目標

この章を終えると、次のことができるようになります。

- コンテキスト、データの境界、副作用、根拠、復旧要件から `Local`、`Worktree`、`Cloud` を選ぶ。
- 作業面と、デスクトップ、CLI、IDE、Webという入口を区別する。
- 対象リソースにアクセスできること、モデルを使えること、ツールを使えることを、別々の主張として確かめる。
- Cloudの `setup` と `agent` の根拠を分け、ネットワークと秘密情報がどの段階で使えるかを記録する。
- 採用した案だけでなく、却下した案と未観測の案も残す `surface-decision.md` を作る。
- 次の確認にタスク以上の権限が必要なら、そこで安全に止まる。

## 現実の問題：手掛かりは段階にある

このプロジェクトのフィールド調査では、GitHub IssuesやStack Exchangeなどの公開報告を集めています。これらは症状の報告であり、ローカルでの再現、公式な原因、保証された修正ではありません。人が混同しやすい主張を切り分けるための材料です。

| 公開報告の種類 | 報告者が観測したこと | **証明しない**こと | 最初の安全な確認 |
|---|---|---|---|
| OAuth は成功するが token exchange が失敗する | ブラウザーの認可ページは完了するが、クライアントの交換処理は完了しない | CLI セッション、対象ホスト、リポジトリが使えること | 認可、callback、exchange、最初の無害なリソース読み取りを四段階で記録する |
| カスタム provider が一つのツールしか出さない | 設定は受理されるが、shell、files、browser がセッションにない | モデルや provider が不足している操作まで実行できること | 実際のツール一覧を保存し、登録と呼び出しを別々に試す |
| Worktree と checkout が食い違う | UI は Worktree と表示するが、shell の `cwd`、IDE の root、patch の対象、Git メタデータが違う | 編集プロセスの隔離が成立していること | 絶対パス、`.git` の形、workspace root、`git status` を読み戻し、ずれていたら書き込まない |
| Cloud setup は成功したが秘密やネットワークを使えない | 依存関係の install や setup の印はあるが、Agent はサービスへ届かない | setup と Agent が同じネットワークや秘密を使えること | setup log、Agent log、ネットワーク段階、秘密の有効期間、diff を別々に残す |
| allowlist が GitHub などをブロックする | proxy、sandbox、企業ネットワーク方針の下で要求が失敗する | ネットワークを全面開放するのが正しい、または承認済みであること | 範囲を広げる前に、sandbox、allowlist、DNS/TLS、firewall について仮説を分ける |

元のリンクと日付は、[フィールド問題の索引](../evidence-library-JA.md#source-notes)、[作業面の調査](../evidence-library-JA.md#source-notes)、[フォーラム調査](../evidence-library-JA.md#source-notes)で確認できます。調査記録には、このプロジェクトが再現していないことも明記しています。報告を読んだだけで、同じ環境で同じ原因が起きると決めつけないでください。

### フィールドケース：最初の書き込み前に対象を確かめる

![フィールド信号と最小の安全な対応](../../assets/teaching/field-signal-to-safe-degradation-red-black.svg)

境界を定めた[FC-WORKTREE-01](../evidence-library-JA.md#source-notes)は、Worktreeに関する日付付きの公開報告を、「本当に同じ対象を見ているか」を確かめる練習に変えます。2026-08-12の調査スナップショットには、公開された保守担当者による根本原因の確認はありません。このプロジェクトも報告を再現していません。ここから言える教訓は限定的です。LocalからWorktreeへ移った後、編集、ブランチ操作、ビルド、テストの前に、意図したcheckoutとshellの `cwd`、Gitのトップレベル、worktreeの一覧、ブランチ／HEAD、書き込み可能なルートを照合します。一つでも違えば、書き込みを止めます。どの作業面が正しいかを推測しません。

## 1. 混同しやすい三つの層

### 作業面：実行と変更が起きる場所

公式の環境ドキュメントは、Codex chatに三つの作業面があると説明しています。

| 作業面 | タスクが走る場所 | 向く用途 | それだけでは証明しないこと |
|---|---|---|---|
| `Local` | 利用者のマシンにある現在のプロジェクトディレクトリ | すばやい確認、小さなローカル編集、現在の checkout に残す作業 | 現在のディレクトリが安全、clean、または正しい対象であること |
| `Worktree` | 利用者のマシンにある独立した Git worktree | main checkout から変更を隔離し、絞った差分をレビューすること | すべてのプロセスが同じ worktree に切り替わったこと、ネットワークやアカウント権限が変わったこと |
| `Cloud` | 構成済みのリモート環境 | リモートの隔離環境とリポジトリ checkout が合う、長い・並列な作業 | この実行でアカウント、リポジトリ、ツール、ネットワーク、秘密、最終差分を使えること |

`Local` と `Worktree` はどちらもローカル実行です。WorktreeはGitの隔離機構であって、万能の安全境界ではありません。Cloudは実行境界であり、setup、Agentの実行環境、外部接続が準備できた証拠ではありません。

### エントリーポイント：始め方とレビューの仕方

エントリーポイントは操作の仕方を変えますが、実行境界まで自動的に変えるわけではありません。入口を変えたからといって、読み書きできる場所やネットワークが増えるとは限りません。

| エントリーポイント | 強み | よく使うレビュー根拠 |
|---|---|---|
| デスクトップアプリ | 見えるタスク状態、環境選択、対話的なレビュー | 環境ラベル、task events、summary、差分、手動確認 |
| CLI | 明示したパス、コマンド、スクリプト、繰り返せるローカル作業 | `cwd`、コマンド出力、終了コード、Git status、差分、保存したログ |
| IDE 拡張 | エディターに近い文脈、選択ファイル、エディター内の差分 | workspace root、選択した文脈、patch、絞った差分 |
| Web / Cloud フロー | リモートの setup、長い実行、引き継ぎ形式のレビュー | repository／branch、setup の根拠、Agent の根拠、summary、差分 |

たとえばCLIはLocal checkoutでもWorktreeでも動きます。IDEがWorktreeに接続していても、別のshellは元のcheckoutに残ることがあります。「CLIを使った」だけでは、「どこで編集したか」への十分な答えになりません。必ず絶対パスとGitの状態を読み戻してください。

## 2. 能力はログインの印ではなく、連鎖で確かめる

利用できるかどうかを、次の主張の連鎖として扱います。上流の確認が通っても、下流の確認を省略しません。

~~~
公式製品のサポート
→ 現在の account / workspace / organization の認可
→ 対象リソースを読める
→ 候補モデルがこの作業面で使える
→ 必要なツールが登録されている
→ 必要なツールをこの段階で呼び出せる
→ 具体的な行動が完了する
→ 結果が検証される
~~~

それぞれの矢印に、別の根拠が必要です。上流で成功しても、下流の確認にはなりません。どこかで止まったら、止まった段階を名前で記録します。

| 観測 | 支えられる主張 | 単独では支えられない主張 |
|---|---|---|
| ブラウザーの認可ページが完了した | 認可ページが成功状態に到達した | token exchange、対象ホスト、リポジトリへのアクセス |
| モデルが picker に出る | 選択時にはモデルが見えていた | 別の作業面での利用可能性、ツールへのアクセス、タスク品質 |
| ディレクトリに書ける | そのパスと時点で書き込み確認が通った | 正しいリポジトリ対象、リモートの認可、安全な納品 |
| ツール名が現れる | 能力が表示または登録された | ツールが実行できること、必要な資格情報、望む副作用の許可 |
| Cloud setup が依存関係を install した | setup がその段階まで進んだ | Agent 段階のネットワーク、秘密へのアクセス、タスク完了、検証済み差分 |
| UI が `Completed` を示す | 製品の状態が表示された | レビュー、テスト成功、デプロイ、push、利用者の受け入れ |

連鎖が切れたら、切れた段階を名前で記録します。「このタスクで確認した」を「製品全体が一般に対応する」へすり替え、主張を強めないでください。

## 3. 五つのゲートで作業面を選ぶ

候補は次の順で評価します。便利な入口や好きなモデルから始めて、危険な環境を先に決めてしまうのを防ぐ順序です。

### ゲート 1：コンテキスト

その作業面で、必要なプロジェクト規則、対象ファイル、バージョン、受け入れ入力を正確に読めますか。不明な点を、リポジトリ名やログイン成功から推測しません。まず読み取り専用で確認します。

### ゲート 2：データ境界と隔離

データは、現在のマシン、破棄できるworktree、承認済みのリモート環境のどこに置くべきですか。秘密、顧客データ、private source、未commitの作業を境界の外へ出してはいけませんか。リモートの作業面へデータを移す価値があるかを考えます。ローカルにも、復旧できる基準点が必要です。

### ゲート 3：行動と副作用

タスクは、読み取り専用、ローカル編集、ブランチ変更、リポジトリへのpush、外部API呼び出し、本番操作のどれですか。必要な操作を支える最小の作業面を選びます。診断を楽にするためだけに、ネットワークやリモートへの書き込みを与えないでください。

### ゲート 4：根拠

他の人が、主張に対応する根拠を調べられますか。パスの読み上げ、対象の読み取り、ツール一覧、コマンド出力、差分、テスト結果、Cloudのログ、人の承認などが根拠になります。操作はできても、レビューできる根拠を残せない作業面は、高リスクの仕事には向きません。

### ゲート 5：回復

認証に失敗した、ネットワークが切れた、依存関係がない、Agentが一部だけ変更した、という場合に、状態を残して既知のチェックポイントから再開できますか。できなければ作業面を却下するか、タスクを読み取り専用の探索まで小さくします。復旧方法がないまま、同じ操作を繰り返さないでください。

### 実用的な選択表

| タスクの形 | あり得る候補 | 理由 | 行動前に必要な証拠 |
|---|---|---|---|
| 公開ドキュメントを読み、ローカルノートを作る | `Local` | リモートへの書き込みや特別な隔離が不要 | 正しい checkout、出典一覧、出力パス |
| 未 commit の作業を守りながら共有リポジトリを編集する | `Worktree` | 基準点と差分を分けて扱える | worktree のパス、branch／commit、`.git` の形、Git status |
| 承認済みリポジトリで長い並列変更を走らせる | `Cloud` | リモート隔離と引き継ぎが合うことがある | 接続した repository、環境、setup／Agent の段階、ログ、最終差分 |
| 顧客データを外部コネクターへ送る | 自動選択なし | データ所有者、宛先、認可、保持のレビューが必要 | 正確な payload、対象アカウント、承認、ロールバック／補償、ツールの根拠 |
| 欠けたツールや読めないパスを診断する | まず現在の作業面を読み取り専用で使う | 失敗した境界を保てる | ツール一覧、絶対パス、設定の出典、エラー出力 |

この表は候補であり、自動的な許可ではありません。普段なら適切な作業面でも、タスクは `blocked` になり得ます。

## 4. 行動前に決定カードを書く

読み取り専用の説明を超えるタスクでは、`surface-decision.md` を作ります。却下したカードも残してください。もっともらしい案をなぜ選ばなかったのかが、後から分かります。欄を埋めるためだけに、観測していないことを `yes` や `no` と書かないでください。

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:

model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | concrete action
setup_evidence:
agent_action: not_applicable | concrete action
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:

recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

タスクを実行しなかった、または根拠を集めなかったなら `not_observed` を使います。`not_observed` は失敗ではなく、まだ確認していないという正確な状態です。

## 5. Cloud には setup と Agent の二段階がある

公式のCloudドキュメントは、setupとAgentの実行をライフサイクルの別の段階として扱います。setupではネットワークを使って依存関係をinstallできる場合があります。通常、設定を変えない限り、Agent段階はofflineです。環境に置いた秘密はsetupでは使えても、Agentの前に取り除かれることがあります。製品の現在の仕様は、必ず日付付きの一次情報で再確認してください。

次の欄を分けて記録します。

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

「setup scriptがpackageをinstallした」は、setupの根拠です。Agentがそのサービスへ到達できる証拠ではありません。「秘密が環境設定にある」ことも、タスクの実行環境が読める証拠ではありません。現在の段階とデータ経路を示せるまで、外部呼び出しは止めるのが安全です。

## 6. 小さく観測できる実験：同じタスク、三つのカード

**実験状態：** `not_run`。以下は練習の設計です。このリポジトリがLocal、Worktree、Cloudで三枚のカード課題を実行した記録ではありません。これを読んだだけで三つの作業面を比較したことにもなりません。

### 準備

破棄できるMarkdownファイル、短い受け入れチェックリスト、remoteを持たない一時Gitリポジトリを用意します。秘密、private data、外部メッセージ、インストール、公開、push、本番対象は使いません。

### タスク

固定タスクです。

> `brief.md` を読み、`draft.md` の指定された一つの表現だけを変え、読み取り専用の format check を一つ実行して差分を報告する。他のファイルは変えない。

### 手順

1. 実行前にLocal、Worktree、Cloudのカードを埋めます。
2. 各カードに五つのゲートを適用します。
3. 各候補について、絶対パス、対象の読み取り、ツール一覧、見えているモデル、許可された副作用を記録します。
4. 無害な編集に十分な根拠があるカードを最大一つ選びます。他は理由とともに `rejected`、`blocked`、`not_observed` にします。三つすべてに書き込む必要はありません。
5. 差分、確認結果、`run-id`、正確な作業面と入口を保存します。
6. パス、ツール、対象、段階の根拠が変わったら、権限を広げず停止して、チェックポイントを残します。

### 最低限の根拠

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

通った記録が示すのは、変更したファイルだけではありません。なぜ一つを選び、別の候補をなぜ却下し、最終的な主張をどの根拠が支えるかも示します。Cloudを実行しなかったカードには `not_observed` と書きます。実行しなかったものを成功扱いしないことが、この実験の合格条件です。

### 残す証拠

決定カード、絶対パス、対象の読み取り結果、ツール一覧、見えていたモデル、段階の状態、差分、確認結果、レビュー担当者の記録を保存します。UIの表示から推測して、欠けた観測を埋めません。

## 7. 失敗パターンと安全な縮退

| 失敗 | 正しい解釈 | 安全な縮退 |
|---|---|---|
| ログインは成功、対象の読み取りは失敗 | identity と resource access は別の段階 | 対象を読めた根拠で止め、タスクを `blocked` にする |
| モデルは見えるがツールがない | モデルの選択とツールの登録は別 | テキストだけの計画、または既知の対応作業面へ。むやみに権限を広げない |
| Worktree を選んだがパスが違う | 隔離メタデータとプロセスの作業ディレクトリがずれている | 書き込みを止め、パスと Git の状態を調べ、人の確認を得る |
| Cloud setup は通り、Agent が失敗 | setup の根拠は Agent の根拠を含まない | setup を `passed`、Agent を `failed`／`not_observed` とし、タスクを `blocked` のまま残す |
| ネットワーク要求が blocked | sandbox、proxy、DNS/TLS、企業方針が原因候補 | 要求を狭め、エラーを保存する。診断のためにネットワークを無制限に開放しない |
| 新しいイベントのない長い待機 | 進行中、または完了と呼ぶ根拠が足りない | 作業面の方針に従って停止／キャンセルし、最後のチェックポイントを残す |

これは診断時の状態であり、製品の普遍的なバグ診断ではありません。コミュニティの回避策も、関係する公式の動作と現在の実行環境を確認するまでは仮説です。

## 振り返り

記憶ではなく、決定カードと根拠を見ながら答えてください。

- 選択を変えたゲートはどれでしたか。コンテキスト、データの境界、行動、根拠、復旧のどれですか。
- どの上流の成功を、最も過大に解釈しそうでしたか。
- 選んだ入口は、実行、レビュー、その両方のどれに役立ちましたか。
- 作業面の誤りと、アカウント権限またはツールの不足を、どの追加観測一つで区別できますか。
- private customer dataがある場合、データの境界と承認記録はどう変わりますか。

## 移行タスク

公開出典にはブラウザー、伏せ字にした根拠にはローカルshell、機密ファイルには隔離環境を使う調査タスクへ、この方法を移します。カードを埋め直し、この章の作業面の選び方をそのままコピーしないでください。データの所有者と、最終的に誰が確認するかを追加します。

## 受け入れチェックリスト

次へ進むのは、次のことができるようになってからです。

- `Local`、`Worktree`、`Cloud` の違いを説明できる。
- デスクトップ、CLI、IDE、Web は作業面と同じ分類ではなく、入口だと説明できる。
- 一つを選び、却下または未観測の理由を明示した三枚のカードを作れる。
- account authorization、resource readability、model visibility、tool registration、tool invocation、action completion、result reviewを分けられる。
- CloudのsetupとAgent、network phase、secret lifetimeを別々に記録できる。
- 次の確認にタスク契約より広い権限が必要なとき、停止するか、より小さな確認へ縮退できる。

## 出典と更新境界

決め方は、安定した教材です。一方、製品の作業面、モデルの組み合わせ、権限モード、Cloud のライフサイクル、ツールの利用可能性、入口の対応範囲は変わります。現在の製品について主張する前に、日付付きの出典記録を使ってください。

| 変動する事実 | 一次情報源 | 確認日 | 適用境界 |
|---|---|---|---|
| Codex chat の作業面に Local、Worktree、Cloud がある | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | 公式環境説明。この account や task で各作業面を使える証拠ではない |
| Cloud の setup と Agent は別の段階 | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | 公式 Cloud lifecycle。この場で Cloud task を走らせた証拠ではない |
| setup/Agent のネットワークと secret lifetime は別境界 | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | 組織ポリシーと runtime 根拠も必要 |
| Local の permission と approval は別層 | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | 公式 security model。現在の session の有効設定を証明しない |
| CLI、IDE、Cloud、model support は作業面ごとに異なる | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | account、workspace、rollout、version で可用性は変わり得る |

[公式ファクトカード](../evidence-library-JA.md#source-notes)
には、このプロジェクトの日付付き要約と限界があります。[フィールド問題の調査](../evidence-library-JA.md#source-notes)と、関連する作業面・forum record には公開報告があります。いずれも現在のアカウント単位、または実行時の観測に代わるものではありません。

## 章の根拠境界

この章は `candidate` のコンテンツ成果物で、実験は `not_run` です。リポジトリはこの章のために Cloud environment を作成したり、三枚のカード課題を実行したり、モデルの組み合わせを検証したり、すべての公開報告を再現したりしていません。将来これらを検証する場合は、主張を変える前に run-id、環境、正確な入力、ツール一覧、差分、確認結果、レビュー担当者を保存しなければなりません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-JA.md" aria-label="前の章: 第 4 章 · コンテキスト、権限、Agent の行動境界">← 前へ<br><strong>第 4 章 · コンテキスト、権限、Agent の行動境界</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-JA.md" aria-label="次の章: 第 6 章 · モデル選択はモデル崇拝ではない">次へ →<br><strong>第 6 章 · モデル選択はモデル崇拝ではない</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
