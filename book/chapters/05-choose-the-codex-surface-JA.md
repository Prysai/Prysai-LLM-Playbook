<!-- content_id: chapter-05-choose-the-codex-surface | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# 第 5 章：適切な Codex の作業面を選ぶ

**状態：** `candidate`。この章には構造化した選択法と出典に基づく製品境界がありますが、
独立した学習者による事前テストはまだ終わっていません。この章からアカウント単位の
機能、Cloud の実行、モデル比較ができたと推測してはいけません。

## この章が解決する問題

同じ目標でも、デスクトップアプリ、CLI、IDE 拡張、Web フローから始められます。実行場所
はローカル、Git worktree、Cloud 環境かもしれません。これらは別々の判断です。

人はしばしば複数の段階を一文にまとめてしまいます。

~~~
「ブラウザのログインが通り、モデルが選択欄にあり、setup も終わった。だからタスクは
準備できた。」
~~~

この文は独立したいくつもの理由で誤り得ます。対象リポジトリを読めないかもしれません。
選んだモデルがその作業面では使えないかもしれません。端末、ブラウザ、connector、
ファイルツールがないかもしれません。Cloud の setup スクリプトにはネットワークがあっても、
後の Agent フェーズにはないことがあります。worktree の表示があっても、shell や IDE は
別の checkout を指していることがあります。

次の順序で進めます。

~~~
作業面を選ぶ
→ エントリーポイントを選ぶ
→ 対象とアカウント境界を確かめる
→ モデルとツールを確かめる
→ 最小の行動をする
→ 納品前に根拠をレビューする
~~~

*作業面*は実行が起き、変更が着地する場所です。*エントリーポイント*は、人がその作業を
開始しレビューする方法です。CLI、IDE、デスクトップ、Web は Local、Worktree、Cloud の
言い換えではありません。

## 学習目標

この章を終えると、次ができるようになります。

- コンテキスト、データ境界、副作用、根拠、回復要件から `Local`、`Worktree`、`Cloud` を選ぶ。
- 作業面とデスクトップ、CLI、IDE、Web のエントリーポイントを区別する。
- 対象リソースへのアクセス、モデルの可用性、ツールの可用性を別々の主張として確かめる。
- Cloud の `setup` と `agent` の根拠、ネットワークと秘密情報の寿命を分けて記録する。
- 採用案だけでなく、却下・未観測の案も残す `surface-decision.md` を作る。
- 次の確認にタスク以上の権限が必要なら、安全に止まる。

## 現実の問題：手掛かりは段階にある

このプロジェクトのフィールド調査は GitHub Issues、Stack Exchange などの公開報告を集め
ています。これは症状の報告であって、ローカル再現、公式な原因、保証された修正ではあり
ません。人が混同しやすい主張を診断するための材料です。

| 公開報告の種類 | 報告者が観測したこと | **証明しない**こと | 最初の安全な確認 |
|---|---|---|---|
| OAuth は成功するが token exchange が失敗する | ブラウザの認可ページは完了するが、クライアントが交換を完了できない | CLI セッション、対象 host、リポジトリが使えること | 認可、callback、exchange、最初の無害なリソース読み取りを四段階で記録する |
| カスタム provider が一つのツールしか出さない | 設定は受理されるが shell、files、browser がセッションにない | モデルや provider が不足した行動をできること | 実際のツール一覧を保存し、登録と呼び出しを別々に試す |
| Worktree と checkout が食い違う | UI は Worktree と表示するが shell の `cwd`、IDE の root、patch の対象、Git メタデータが違う | 編集プロセスの隔離が成立していること | 絶対パス、`.git` の形、workspace root、`git status` を読み返し、ずれたら書かない |
| Cloud setup は成功したが秘密やネットワークを使えない | 依存関係の install や setup の印はあるが Agent がサービスへ届かない | setup と Agent のネットワークや秘密が同じ能力であること | setup log、Agent log、ネットワーク段階、秘密の寿命、diff を別々に残す |
| allowlist が GitHub などをブロックする | proxy、sandbox、企業ネットワーク方針下で要求が失敗する | 全ネットワーク開放が正しい、または承認済みであること | 狭い変更を求める前に sandbox、allowlist、DNS/TLS、firewall の仮説を分ける |

元のリンクと日付は[フィールド問題の索引](../evidence-library-JA.md#source-notes)、
[作業面の調査](../evidence-library-JA.md#source-notes)、
[フォーラム調査](../evidence-library-JA.md#source-notes)で確認してください。
調査記録は、このプロジェクトが再現しなかったことも意図的に明記しています。

### フィールドケース：最初の書き込み前に対象を確かめる

![フィールド信号と最小の安全な対応](../../assets/teaching/field-signal-to-safe-degradation-red-black.svg)

境界を定めた[FC-WORKTREE-01](../evidence-library-JA.md#source-notes)
は、worktree に関する日付付き公開報告を対象同一性の練習に変えます。2026-08-12 の
調査スナップショットには、公開された maintainer の根本原因確認はなく、このプロジェクト
も報告を再現していません。教訓は狭いものです。Local から Worktree へ渡した後、編集、
branch 操作、build、test の前に、意図した checkout と shell の `cwd`、Git top-level、
worktree list、branch/HEAD、書き込み可能 root を比べます。一つでも信号が違えば、安全な
結果は書き込みを止めることです。どの作業面が正しいかを推測しません。

## 1. 混同しやすい三つの層

### 作業面：実行と変更が起きる場所

公式の環境ドキュメントは、Codex chat の三つの作業面を説明しています。

| 作業面 | タスクが走る場所 | 向く用途 | それだけでは証明しないこと |
|---|---|---|---|
| `Local` | 利用者のマシンにある現在のプロジェクトディレクトリ | すばやい確認、小さなローカル編集、現在の checkout に残すべき作業 | 現在のディレクトリが安全、clean、または正しい対象であること |
| `Worktree` | 利用者のマシンにある独立した Git worktree | main checkout から変更を隔離し、絞った diff をレビューすること | 全プロセスが同じ worktree へ切り替わったこと、ネットワークやアカウント権限が変わったこと |
| `Cloud` | 構成済みのリモート環境 | リモート隔離 runtime とリポジトリ checkout が合う、長い・並列な作業 | この run でアカウント、リポジトリ、ツール、ネットワーク、秘密、最終 diff が使えること |

`Local` と `Worktree` はどちらもローカル実行です。Worktree は Git の隔離機構であり、
万能の安全境界ではありません。Cloud は実行境界であり、setup、Agent runtime、外部接続が
準備できた証拠ではありません。

### エントリーポイント：始め方とレビューの仕方

エントリーポイントは操作の仕方を変えますが、実行境界を自動的に変えるわけではありません。

| エントリーポイント | 強み | よく使うレビュー根拠 |
|---|---|---|
| デスクトップアプリ | 見えるタスク状態、環境選択、対話的レビュー | 環境ラベル、task events、summary、diff、手動確認 |
| CLI | 明示したパス、コマンド、script、繰り返せるローカル作業 | `cwd`、command output、exit code、Git status、diff、保存した log |
| IDE 拡張 | 近いエディタ文脈、選択ファイル、エディタ内 diff | workspace root、選択した文脈、patch、絞った diff |
| Web / Cloud フロー | リモート setup、長い実行、handoff 形式のレビュー | repository/branch、setup 根拠、Agent 根拠、summary、diff |

たとえば CLI は Local checkout でも Worktree でも動きます。IDE が Worktree に接続して
いても、別の shell は元の checkout に残り得ます。「CLI を使った」は「どこで編集したか」
への十分な答えではありません。

## 2. 能力はログインの印ではなく鎖である

可用性を次の主張の連鎖として扱います。

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

各矢印には別の根拠が必要です。上流の成功は下流の確認を置き換えません。

| 観測 | 支えられる主張 | 単独では支えられない主張 |
|---|---|---|
| ブラウザ認可ページが完了した | 認可ページが成功状態に到達した | token exchange、対象 host、リポジトリへのアクセス |
| モデルが picker に出る | 選択時にはモデルが見えていた | 別の作業面での可用性、ツールアクセス、タスク品質 |
| ディレクトリに書ける | そのパスと時点で write probe が通った | 正しいリポジトリ対象、リモート認可、安全な納品 |
| ツール名が現れる | 能力が広告または登録された | ツールが走ること、必要な資格情報、望む副作用の許可 |
| Cloud setup が依存関係を install した | setup がその段階まで進んだ | Agent 段階のネットワーク、秘密へのアクセス、タスク完了、検証済み diff |
| UI が `Completed` を示す | 製品状態が表示された | review、test 成功、deploy、push、利用者受け入れ |

鎖が切れたら、切れた段階を名前で記録します。「このタスク」を「製品全体が一般に対応する」
へすり替えて主張を強めないでください。

## 3. 五つのゲートで作業面を選ぶ

候補は次の順に評価します。便利な入口や好きなモデルが、危険な環境選択を先に決めるのを
防ぐ順序です。

### ゲート 1：コンテキスト

その作業面は、必要な正確なプロジェクト規則、対象ファイル、version、受け入れ入力を
読めますか。不明なら、リポジトリ名や成功したログインから推測しません。

### ゲート 2：データ境界と隔離

データは現在のマシン、破棄できる worktree、承認済みのリモート環境のどこに置くべきですか。
秘密、顧客データ、private source、未 commit の作業は境界を越えてはいけませんか。リモート
作業面はデータ転送に値する必要があります。ローカルにも回復可能な基準点が必要です。

### ゲート 3：行動と副作用

タスクは読み取り専用、ローカル編集、branch 変更、repository push、外部 API 呼び出し、
本番行動のどれですか。必要な行動を支える最小の作業面を選びます。診断を楽にするためだけに
ネットワークやリモート書き込みを与えないでください。

### ゲート 4：根拠

他の人は主張に対応する根拠を検査できますか。path echo、対象読み取り、ツール一覧、command
output、diff、test result、Cloud log、人の承認が例です。行動は可能でもレビューできる根拠を
残せない作業面は、高リスク作業に向きません。

### ゲート 5：回復

認証に失敗する、ネットワークが消える、依存関係がない、Agent が部分変更をする場合、状態を
残して既知の checkpoint から再開できますか。できなければ作業面を却下するか、タスクを
読み取り専用 probe まで落とします。

### 実用的な選択表

| タスクの形 | あり得る候補 | 理由 | 行動前に必要な証拠 |
|---|---|---|---|
| 公開ドキュメントを読みローカルノートを作る | `Local` | リモート書き込みや特別な隔離が不要 | 正しい checkout、source list、出力パス |
| 未 commit 作業を守りながら共有リポジトリを編集する | `Worktree` | 基準点と diff を分けて扱える | worktree path、branch/commit、`.git` の形、Git status |
| 承認済みリポジトリで長い並列変更を走らせる | `Cloud` | リモート隔離と handoff が合うことがある | 接続した repository、environment、setup/Agent 段階、logs、最終 diff |
| 顧客データを外部 connector に送る | 自動選択なし | data owner、宛先、認可、保持の review が要る | 正確な payload、対象 account、承認、rollback/補償、ツール根拠 |
| 欠けたツールや読めないパスを診断する | まず現在の作業面を読み取り専用で使う | 失敗境界を保てる | tool inventory、絶対パス、設定 source、error output |

この表は候補であり、自動許可ではありません。通常は適切な作業面でも、タスクは `blocked`
になり得ます。

## 4. 行動前に決定カードを書く

読み取り専用の説明を超えるタスクでは、`surface-decision.md` を作ります。却下したカードも
残してください。もっともらしい案をなぜ選ばなかったかが分かります。

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

タスクを走らせなかった、または根拠を集めなかったなら `not_observed` を使います。欄を
埋めるためだけに、観測がないものを `yes` や `no` にしないでください。

## 5. Cloud には setup と Agent の二段階がある

公式 Cloud ドキュメントは setup と Agent 実行をライフサイクルの別部分として扱います。
setup ではネットワークを使って依存関係を install できることがあります。通常、設定で
変えないかぎり Agent 段階は offline です。環境に置いた秘密は setup で使えて、Agent の前に
取り除かれることがあります。

次の欄を分けて記録します。

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

「setup script が package を install した」は setup の根拠です。Agent がそのサービスへ
到達できる証拠ではありません。「秘密が環境設定にある」も task runtime が読める根拠では
ありません。現在の段階とデータ経路を示すまで、外部呼び出しは止めるのが安全です。

## 6. 小さく観測できる実験：同じタスク、三つのカード

**実験状態：** `not_run`。以下は練習設計であり、このリポジトリが Local、Worktree、Cloud
で三枚のカード課題を実行した記録ではありません。

### 準備

破棄できる Markdown ファイル、短い受け入れチェックリスト、remote を持たない一時 Git
リポジトリを用意します。秘密、private data、外部メッセージ、install、公開、push、本番対象は
使いません。

### タスク

固定タスクです。

> `brief.md` を読み、`draft.md` の指定された一つの表現だけを変え、読み取り専用の format
> check を一つ実行して diff を報告する。他のファイルは変えない。

### 手順

1. 実行前に Local、Worktree、Cloud のカードを埋めます。
2. 各カードに五つのゲートを適用します。
3. 各候補について、絶対パス、対象読み取り、ツール一覧、モデルの見え方、許可された副作用を記録します。
4. 無害な編集に十分な根拠を持つカードを最大一つ選びます。他は理由とともに `rejected`、`blocked`、`not_observed` にします。
5. diff、check output、run-id、正確な作業面と入口を保存します。
6. path、tool、target、phase の根拠が変われば、権限を広げず止まり、checkpoint を残します。

### 最低限の根拠

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

通った記録が示すのは、変更ファイルだけではありません。なぜ一つを選び、別の候補を
なぜ却下し、最終主張をどの根拠が支えるかです。Cloud を走らせなかったカードには
`not_observed` と書きます。

### 残す証拠

決定カード、絶対パス、対象読み取り結果、ツール一覧、見えたモデル、段階状態、diff、
check output、reviewer record を保存します。UI の表示から推測して、欠けた観測を埋めません。

## 7. 失敗パターンと安全な縮退

| 失敗 | 正しい解釈 | 安全な縮退 |
|---|---|---|
| ログインは成功、対象読み取りは失敗 | identity と resource access は別段階 | 対象読み取りの根拠で止め、タスクを `blocked` にする |
| モデルは見えるがツールがない | モデル選択とツール登録は別 | text-only plan または既知の対応作業面へ。無闇に権限を広げない |
| Worktree を選んだがパスが違う | 隔離 metadata と process working directory がずれている | 書き込みを止め、パスと Git 状態を調べ、人の確認を得る |
| Cloud setup は通り、Agent が失敗 | setup 根拠は Agent 根拠を含まない | setup を `passed`、Agent を `failed`/`not_observed`、タスクを `blocked` のまま残す |
| ネットワーク要求が blocked | sandbox、proxy、DNS/TLS、企業方針が原因候補 | 要求を狭め、error を保存する。診断のために無制限ネットワークへ変えない |
| 新しい event のない長い待機 | 進行中・完了と呼ぶ根拠が足りない | 作業面の方針に従って stop/cancel し、最後の checkpoint を残す |

これは診断状態であり、普遍的な製品バグ診断ではありません。コミュニティの回避策は、
関係する公式動作と現在の runtime を確かめるまで仮説です。

## 振り返り

記憶ではなく、決定カードと根拠から答えてください。

- 選択を変えたゲートはどれでしたか。コンテキスト、データ境界、行動、根拠、回復のどれですか。
- どの上流成功をいちばん過大に解釈しそうでしたか。
- 選んだ入口は実行、レビュー、両方のどれに役立ちましたか。
- 作業面の誤りと account permission または tool の不足を、どの一つの追加観測で区別できますか。
- private customer data があれば、データ境界と承認記録はどう変わりますか。

## 移行タスク

公開 source 用に browser、伏せ字にした根拠用に local shell、敏感なファイル用に隔離環境を
使う research task へこの方法を移します。カードを埋め直し、この章の作業面選択をそのまま
コピーしないでください。

## 受け入れチェックリスト

次へ進めるのは、次ができるときです。

- `Local`、`Worktree`、`Cloud` の違いを説明できる。
- デスクトップ、CLI、IDE、Web が作業面と同じ分類ではなく入口だと説明できる。
- 選択一つと、却下または未観測の理由を明示した三枚のカードを作れる。
- account authorization、resource readability、model visibility、tool registration、tool invocation、action completion、result review を分けられる。
- Cloud の setup と Agent、network phase、secret lifetime を別々に記録できる。
- 次の確認がタスク契約より広い権限を要するとき、止まるか縮退できる。

## 出典と更新境界

決定法は安定した教材です。製品の作業面、model matrix、permission mode、Cloud lifecycle、
tool availability、entry point support は変動します。現在の製品主張をする前に、日付付きの
source record を使ってください。

| 変動する事実 | 一次情報源 | 確認日 | 適用境界 |
|---|---|---|---|
| Codex chat の作業面に Local、Worktree、Cloud がある | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | 公式環境説明。この account や task で各作業面を使える証拠ではない |
| Cloud の setup と Agent は別の段階 | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | 公式 Cloud lifecycle。この場で Cloud task を走らせた証拠ではない |
| setup/Agent のネットワークと secret lifetime は別境界 | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | 組織ポリシーと runtime 根拠も必要 |
| Local の permission と approval は別層 | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | 公式 security model。現在の session の有効設定を証明しない |
| CLI、IDE、Cloud、model support は作業面ごとに異なる | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | account、workspace、rollout、version で可用性は変わり得る |

[公式ファクトカード](../evidence-library-JA.md#source-notes)
には、このプロジェクトの日付付き要約と限界があります。
[フィールド問題の調査](../evidence-library-JA.md#source-notes)と関連する作業面・
forum record には公開報告があります。いずれも現在の account-level または runtime の
観測に代わるものではありません。

## 章の根拠境界

この章は `candidate` のコンテンツ成果物であり、実験は `not_run` です。リポジトリはこの章の
一部として Cloud environment の作成、三カード課題の実行、model matrix の検証、すべての
公開報告の再現をしていません。将来の検証では、これらの主張を変える前に run-id、environment、
正確な入力、tool inventory、diff、check output、reviewer を保存しなければなりません。

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
