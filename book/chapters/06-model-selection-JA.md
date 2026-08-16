<!-- content_id: chapter-06-model-selection | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 6 章：モデル選択はモデル崇拝ではない

**状態：** `candidate`。比較プロトコルと出典境界は書かれていますが、このリポジトリは固定タスク
セットをまだ実行していません。性能、費用、待ち時間、容量、安定性、順位づけはすべて `not_run`
です。

## この章が解く問題

「いちばん良いモデルを使う」は、仕事の決め方ではありません。役に立つ問いは次です。

> このタスク、この作業面、この provider、コンテキスト、ツール、権限境界、時間、受け入れ基準で、
> 最低条件を満たす候補はどれか。試験を広げる根拠は何か。

候補が選んだ作業面で利用できない、または入力、ツール、権限、設定が異なるなら、公平な比較にはなり
ません。一度きれいな出力が出たことは、その設定が一度結果を出したというだけで、一般的な順位を
決めるものではありません。

## 学習目標

- モデルより先に、タスクと作業面を決める。
- 実際の account、workspace、provider、session で利用可能かを確かめる。
- モデル、provider、reasoning effort、コンテキスト、ツール、権限、受け入れを分けて記録する。
- 条件を変えずに三つの低リスク課題で比較する。
- 容量、provider、不明な待機の失敗も根拠として残す。
- 実験が示すこと、示さないこと、止まるべき時点を説明する。

## 公開報告：魔法の解決策ではなく症状

[Codex のフィールド調査](../../docs/research/field-problems-codex.md)には、公開 Issue と議論が
集められています。これは症状であり、公式診断やローカル再現ではありません。

| 症状 | 観測 | それだけでは証明しないこと | 安全な対応 |
|---|---|---|---|
| selector は `model` を変えるが `model_provider` が残る | 表示モデルと実際の provider の組み合わせが不正になる場合がある | selector、provider、モデル全体が壊れていること | 両方の値を読み、伏せ字にした設定 diff を残して組を直す |
| モデルが容量制限にかかる | タスクは完了前に止まり、次の試行は部分的な状態を引き継ぐことがある | モデルの品質が低いこと、再試行が最初の完了を意味すること | checkpoint、diff、log、check を保存し、続ける前に状態を分類する |
| コマンドが `Working` のままになる | UI に活動表示があっても確認可能な出力がない | formatter、Agent、モデルが正しく進んでいること | 時間制限を適用し、安全に中断して worktree を確認し、一つだけ絞った check を行う |

[モデル選択の記録](../../docs/research/codex-model-selection-official-facts-2026-08-11.md)にはリンク、日付、
境界があります。各報告について「誰かが述べたこと」「独立報告の有無」「公式確認」「本 Playbook
で再現したこと」を分けます。再現していない報告を、保証された解決策に変えてはいけません。

## 1. モデルを選ぶとは、構成を選ぶこと

### 品質より先に可用性を確かめる

~~~
公式ドキュメント → account / workspace / organization の認可
→ 目的の作業面と provider → session で見えるモデル
→ 無害な要求が通る → 必要なツールを呼び出せる
→ タスク結果を検証する
~~~

それぞれ別の主張です。公式ページ、カタログ項目、picker に見える名前は、そのモデルが必要な
ファイル、terminal、browser、connector とともにこのタスクを実行できる証拠ではありません。

候補カードを使います。

~~~
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
~~~

`not_observed` は有効な結果です。推測で欄を埋めるより安全です。

### 製品の位置づけは出発仮説にすぎない

公式ページは、複雑で開いた仕事、日常的な実務、反復可能な大量変換などのためにモデルを説明する
ことがあります。これは何を試すかを決める手掛かりであり、勝者の宣言ではありません。高い
reasoning effort は分析を増やす代わりに時間や token を使うことがあります。まずは受け入れ基準を
満たす最小の設定から始めます。reasoning や subagent を足すなら、比較しているのはモデルだけでは
なくワークフローと予算です。

### モデル、provider、作業面は一つの組である

~~~
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
~~~

主要な要素が一つでも変われば別の流れを比較していることになります。`not_comparable` と記し、
新しい契約で両方をやり直します。設定ファイルは設定を示すだけです。実効 provider と model を
読み戻し、無害な要求が通ってから有効と扱います。

## 2. 決める順序を守る

~~~
タスクとリスクを定義する → Local / Worktree / Cloud を選ぶ
→ entry と provider を選ぶ → access と可用性を確認する
→ context、tools、permissions、effort、acceptance を固定する
→ 同じセットを実行する → 比較可能な行をレビューする
→ 試験を広げる、止まる、追加根拠を集める
~~~

まずタスクを分類します。抽出、変換、計画、ツールを伴う実装、調査／レビュー、作成／設計では、
必要な根拠が異なります。抽出が得意な候補が、複数ファイルの修正や高リスクな根拠レビューに
向くとは限りません。rubric はタスクの種類に合わせます。

必要な根拠を残せる最小の作業面を選びます。リモート実行が不要なら synthetic または伏せ字の
入力を Local に保ちます。commit しない作業を隔離するなら破棄できる Worktree を使います。
Cloud は、repository、environment、network、secrets、review の経路が承認され観測できるときだけ
使います。モデルが、欠けたファイル、使えない connector、誤った checkout、許可されない書き込みを
補うことはありません。

## 3. 実行前のカード

~~~
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
~~~

最初の実行前に、入力と版、作業面、entry、provider、model、effort、context、tool version、
permissions、rubric、reviewer、時間制限、再試行、費用の基準を固定します。一方だけ prompt、
context、tool、effort、permission を良くしてはいけません。契約が変わるなら版を上げ、両方を
繰り返します。

## 4. 実験：三つのタスクを比べる

**実験状態：** `not_run`。これは練習のプロトコルであり、このリポジトリがモデルを比較した証拠では
ありません。

同じ作業面で `surface_available: yes` の候補を二つ選びます。synthetic input とローカル validator
だけで構成された版管理済み fixture [`three-task-smoke-v1`](../../evals/candidates/three-task-smoke-v1/README.md)
を使います。そこにはモデル実行は含まれません。production data、secret、外部書き込み、公開、push、
deploy、有料 connector を使わないでください。各タスクは一度だけ実行し、事前に定めた同形式の
制御された再試行だけを最大一回許します。

固定タスクは `extract-01`、`markdown-02`、`gap-review-03` です。順に構造化抽出、制約下の
Markdown 変換、根拠の穴のレビューを扱います。片方の候補だけ目立つ demo に差し替えてはいけません。
入力、instruction、schema、acceptance が変わるなら、新版を作り両方を繰り返します。

1. 候補を呼び出す前に二枚のカードを完成させる。
2. 可用性を確かめ、根拠の場所を記録する。
3. A と B を同じ順序、入力、rubric で実行する。
4. 編集前の raw output、event、duration、cost、error を保存する。
5. 失敗時は制御された再試行だけを使う。盲目的な再試行を成功率にしない。
6. 要約の前に `not_comparable` の全行を確認する。
7. 結論は `worth expanding`、`do not expand yet`、`insufficient evidence` のいずれかに限定し、
   境界も記録する。

~~~
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence | reasoning_effort_or_config
context_fingerprint | tools_and_versions | permission_profile | first_pass
rework_count | duration | cost_basis | cost_observed | error_type
reviewer_score | comparable | not_comparable_reason | raw_evidence
~~~

## 5. 失敗、復旧、転移

| 失敗 | 対応 |
|---|---|
| 候補が見えない、呼び出せない | `no` または `not_observed` と記録し、可用性を品質として採点しない |
| selector と provider が一致しない | 伏せ字にした diff を残し、組を直すか provider／workflow の試験として宣言する |
| 容量制限で実行が止まる | error と checkpoint を保存し、`blocked` または `not_comparable` とする。再試行は宣言した条件で両方に行う |
| 確認可能な event のない待機 | 時間制限を適用し、中断して diff／state を調べ、欠けた検証を記録する |
| 片方だけが追加 context、effort、tool を得る | `not_comparable` とし、固定した契約でやり直す |
| demo が万能の勝者を宣言する | `candidate` または `insufficient evidence` に戻す |

同じ項目を Local と Worktree の比較、厳密な schema の文書変換、引用と unknown 列を持つ source
reconciliation、read-only tool を使うコード調査にも移せます。新しいセットと rubric なしに、別の
領域へ結果をコピーしてはいけません。

## 根拠の境界と出典

予定する納品物は、二枚の候補カード、固定したセットと rubric、raw run、表、型づけた error、
拡大／停止の判断です。それが存在するまで、すべて `not_run` のままです。公式の位置づけや一回の
demo は評価の代わりになりません。

| 変動する境界 | 一次情報源 | 確認日 |
|---|---|---|
| モデルの位置づけ、reasoning、制限 | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 |
| CLI とローカル repository の流れ | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 |
| Cloud の環境とレビュー | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 |
| model/provider/capacity の公開症状 | [フィールド記録](../../docs/research/codex-model-selection-official-facts-2026-08-11.md) | 2026-08-11 |

モデル ID、価格、容量、provider support、構文、control は変わり得ます。まず一次情報源を更新し、
公式の位置づけ、ユーザー報告、ローカル根拠を別々の文で残してください。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-JA.md" aria-label="前の章：第 5 章 · 適切な Codex の作業面を選ぶ">← 前の章<br><strong>第 5 章 · 適切な Codex の作業面を選ぶ</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md" aria-label="日本語目次へ戻る：第 7 章はまだ翻訳されていません">次の章は準備中 →<br><strong>第 7 章の提供状況を見る</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
