<!-- content_id: chapter-06-model-selection | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 6 章：モデル選択はモデル崇拝ではない

**状態：** `candidate`。以下の比較プロトコルは書かれており、出典に基づいて範囲が
定められていますが、このリポジトリは固定タスクセットをまだ実行していません。モデルの性能、費用、
待ち時間、容量、安定性、総合順位はすべて `not_run` のままです。

## この章が解決する問題

モデル選択はしばしば「いちばん良いモデルを使う」というスローガンに置き換えられます。実際の仕事
には、もっと絞り込んだ問いが必要です。

> このタスク、この作業面、この provider、コンテキスト、ツールセット、
> 権限境界、時間予算、受け入れ基準のもとで、最低条件を満たす候補はどれか。そして
> 試験を広げるのに十分な根拠はあるか。

選んだ作業面で候補が利用できない場合、あるいは二回の実行が異なる入力、ツール、権限、reasoning
設定を使っている場合、きれいなモデル比較は成立しません。美しい demo は、ある設定が一つの結果を
生んだことを示せます。しかし、普遍的な順位や総合的な価値を確立することはできません。

## 学習目標

この章を終えると、次のことができるようになります。

- モデルを選ぶ前に、タスクと作業面を選ぶこと。
- カタログや picker から推測するのではなく、実際の account、workspace、provider、
  session でモデルの可用性を確かめること。
- モデル ID、provider、reasoning effort、コンテキスト、ツール、権限、
  受け入れ条件を、互いに異なる比較変数として区別すること。
- 一方の候補を助けるために条件を変えずに、低リスクの三タスクのスモーク比較を実行すること。
- 容量、provider 不一致、長時間の待機による失敗を根拠として保存すること。
- 実験が何を証明し、何を証明しないか、いつ止めるかを説明すること。

## 現実の問題：モデル選択はありふれた形で失敗する

このプロジェクトの [Codex フィールド調査](../evidence-library-JA.md#source-notes) は、
公開されている GitHub Issues やその他の公開議論を収集しています。これらの報告は症状であり、
公式の診断やローカルでの再現ではありません。モデル選択がうまくいかないときに人々が抱く前提を
明らかにしてくれるため、貴重な情報源です。

| 公開症状 | 報告者が観測したこと | それだけでは**証明しない**こと | 最初の安全な対応 |
|---|---|---|---|
| モデル picker が `model` を変えるが、カスタムの `model_provider` が残る | 表示上のモデルと実効 provider が不正な組になることがある | picker、provider、モデル全体が壊れていること | 実効の `model` と `model_provider` を一緒に読み、修正する前に伏せ字にした設定 diff を保存する |
| 選んだモデルが容量制限にかかっている | タスクが完全な結果の前に止まり、その後の prompt が部分的な状態に遭遇することがある | モデルの品質が低いこと、あるいは再試行すれば最初の試行が完了していたこと | checkpoint、diff、logs、tests を保存し、続ける前に状態を分類する |
| Windows のコマンドが `Working` のまま残る | UI は活動を示すが、検証可能な出力が届かない | formatter、Agent、モデルがまだ有益な進捗を生んでいること | タイムアウト／停止ルールを適用し、安全に中断し、worktree を調べ、絞り込んだ check だけを再実行する |

元のリンク、日付、バージョン、根拠のレベル、不確実性に関する注記は、
[モデル選択の調査記録](../evidence-library-JA.md#source-notes) に
あります。このプロジェクトは、それらの報告に含まれるコマンドや回避策を実行していません。

### 実報告を「伝説」にせずに使う方法

症状ごとに、四つのラベルを分けておきます。

1. **ユーザー報告：** ある人が、名前の付いた環境で起きたこととして述べる内容。
2. **独立した報告：** 別のユーザーが同様の症状を説明しているかどうか。
3. **公式確認：** メンテナーの回答、公式ドキュメント、リリースノート、その他の一次情報源に
   よる証拠。
4. **Playbook の根拠：** このプロジェクトが実際に再現したこと。

上の三つの例では、最初の二つのラベルは存在するかもしれません。しかし、このプロジェクトには
ローカルでの再現がなく、それらを保証された修正へと格上げできる公式の根本原因確認もありません。
それが行動を変えます。魔法のような設定を約束するのではなく、根拠を保存し、次の check を
絞り込みます。

## 1. モデル選択は構成上の決定である

### 品質より先に可用性を確かめる

二つの別々のゲートを使います。

```text
公式の製品ドキュメント
→ 実際の account / workspace / organization の認可
→ 対象の作業面と provider
→ この session で見えるモデル
→ 無害な要求が成功する
→ 必要なツールが呼び出せる
→ タスクの結果が検証される
```

それぞれの矢印は異なる主張を持ちます。モデルは公式ページで説明されていても、account からは
利用できないことがあります。picker に表示されていても、provider が要求を受け取った時点で
失敗することがあります。テキストの応答が成功しても、タスクに必要なファイル、terminal、browser、
connector が利用可能であることを証明できるとは限りません。

候補カードでは次のフィールドを使います。

```text
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
```

`not_observed` は有効な結果です。check が実行されなかったか、利用可能な根拠を残さなかった
ことを意味します。推測でフォームを埋めるより安全です。

### 製品の位置づけは出発仮説にすぎない

2026-08-11 の出典確認時点で、公式の Codex models ページは推奨される GPT-5.6 の選択肢を
おおむね次のように説明しています。

| 公式の位置づけ | 合理的な出発仮説 | まだ試すべきこと |
|---|---|---|
| Sol：追加の分析と磨き込みを伴う、複雑で開かれた仕事 | あいまいさ、判断、価値の高いレビューが中心になるときに試す | 自分のタスクセットでの初回成功率、所要時間、費用、安定性、ツールの挙動 |
| Terra：実用的な日常の主力 | 強い reasoning とツール利用を必要とする普段の仕事で試す | 実際の制約の下で受け入れ基準を満たすかどうか |
| Luna：明確で反復可能な、量の多い仕事 | 抽出、分類、変換、構造化された要約で試す | コンテキスト、provider、effort、レビューの費用を含めても結果が許容範囲かどうか |

これらは製品の説明であり、Playbook のベンチマーク結果ではありません。公式ページはまた、
reasoning effort を上げると複雑な仕事が改善される一方で、時間がかかり、より多くの token を
使うと警告しています。受け入れ基準を満たす最小の effort から始め、タスクがより多くの計画、
分析、確認を必要とするときだけ上げてください。その設定を実行の一部として記録します。

`Max` と `Ultra` は無料の品質ラベルではありません。公式ページは、Max を「一つのタスクに
より多くの reasoning 時間を与えるもの」、Ultra を「分割可能な複雑な仕事に subagent を使うもの」
と説明しています。これらはワークフローとリソースの枠組みを変えるため、Ultra の実行は
シングルエージェントの実行とのモデルだけの比較にはなりません。

### モデル、provider、作業面は一つの組である

候補を `model = ...` だけで書いてはいけません。有用な比較の単位は次のとおりです。

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

中核となる要素が一つでも変わったら、別のワークフローを比較するか、実行を `not_comparable` と
記して、新しい契約の下で両方をやり直します。

公式ドキュメントは、ローカルの desktop、CLI、IDE のデフォルトに共有の `config.toml` ルートを
説明していますが、Cloud のチャットには別のデフォルトモデル境界があります。設定ファイルは設定に
関する根拠にすぎません。実効の provider と model を読み戻し、無害な要求を送ってから、その組を
有効として扱います。

## 2. 決める順序を守る

お気に入りのモデルから始めてはいけません。次の順序を使います。

```text
タスクとリスクを定義する
→ Local / Worktree / Cloud を選ぶ
→ 入口と provider を選ぶ
→ 対象のアクセスとモデルの可用性を確認する
→ context、tools、permissions、effort、acceptance を固定する
→ 同じタスクセットを実行する
→ comparable / not_comparable の行を調べる
→ 広げる、止める、または追加の根拠を集める
```

### まずタスクを分類する

タスクの分類は「十分良い」の意味を決めます。

- **理解と抽出：** 材料の中から構造化された値を見つける。
- **変換と生成：** 固定された schema の下で書き直し、要約、分類、整形を行う。
- **計画と判断：** 制約、トレードオフ、不確実性を扱う。
- **コードとツール利用：** repository を調べ、編集し、実行し、修復する。
- **調査とレビュー：** 出典を見つけ、主張を突き合わせ、穴を明らかにする。
- **作成と設計：** フィードバックの往復を経てもスタイルを保つ。

抽出に合格する候補でも、複数ファイルの修復や高リスクの根拠レビューには間違った選択であることが
あります。受け入れ基準はタスクの分類に合わせなければなりません。

### 作業面とリスク境界を固定する

必要な根拠を提供できる最小の環境を選びます。タスクがリモート実行を必要としないなら、
synthetic または伏せ字の入力をローカルに保ちます。現在の未 commit の作業を隔離する必要が
あるなら、使い捨ての Worktree を使います。repository、環境、ネットワーク、secrets、レビューの
経路が承認され、観測可能なときだけ Cloud を使います。

モデル選択は、欠けたファイル、利用できない connector、誤った checkout、許可されていない書き込みを
補うことはできません。環境が間違っているなら、不公平な条件でモデルを「試す」のではなく、
作業面の決定の段階で止まります。

## 3. 実行前に候補カードを書く

候補またはワークフローごとに一枚のカードを使います。

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

最初の実行の前に、次を固定します。

- 正確なタスク入力とそのバージョン。
- 作業面、入口、provider、モデル、effort の設定。
- 関連するコンテキストとツールのバージョン。
- 権限と許可された副作用。
- 受け入れ基準とレビュー担当者。
- 時間境界と再試行予算。
- 費用の測定基準。

一方の候補のためだけに、prompt を変えたり、コンテキストを足したり、ツールを許可したり、
effort を上げたり、権限を広げたりしてはいけません。タスク契約が変わったら、バージョンを上げて
両方の候補をやり直します。

## 4. 実験：三タスクのスモーク比較

**実験状態：** `not_run`。これは練習用のプロトコルであり、このリポジトリがモデル比較を
実行したという証拠ではありません。

### 準備

同じ作業面で `surface_available: yes` を持つ候補を二つ選びます。入力を記憶から作り直すのでは
なく、バージョン管理されたオフラインの
[`three-task-smoke-v1` fixture](../../evals/candidates/three-task-smoke-v1/README-JA.md) を
使います。そこには synthetic で機密を含まない入力とローカルの validator が含まれます。モデルの
実行は含まれません。production データ、本物の secrets、外部への書き込み、公開、push、deployment、
有料の connector を使ってはいけません。各タスクは最初に一度だけ実行し、事前に宣言した同じ形式の
再作業を最大一回だけ許します。

`task_set_version: three-task-smoke-v1`、両方の候補カード、一つの受け入れ基準、raw 出力の
保存場所、log の保存場所、そして利用不能、容量による中断、権限の不一致、入力のずれ、
ツールバージョンのずれに対する停止条件を固定します。

### 固定タスク

正規のタスク ID は `extract-01`、`markdown-02`、`gap-review-03` です。それぞれ構造化抽出、
制約付き Markdown 変換、根拠の穴のレビューを扱います。各タスクのディレクトリには、指示、凍結した
入力一つ、期待される出力一つ、validator が含まれます。パッケージは正確な入力の SHA-256 値を
`fixture.json` に公開しているため、レビュー担当者はずれを検出できます。

片方の候補のためだけに、タスクを見栄えの良い demo に置き換えてはいけません。入力、指示、出力
schema、受け入れルールを変える必要があるなら、新しいタスクセットのバージョンを作り、両方を
やり直します。

### 手順

1. どちらの候補を呼び出す前にも、両方の候補カードを完成させて保存する。
2. 選んだ作業面で可用性を確かめ、根拠の保存場所を記録する。
3. 候補 A と B を同じタスク順、同じ入力、同じ受け入れ基準で実行する。
4. 人が編集する前に raw 出力を保存する。イベント、所要時間、費用基準、error の分類を記録する。
5. 実行が失敗したら、事前に宣言した制御された再作業だけを許す。繰り返す盲目的な再試行を隠れた
   成功指標にしてはいけない。
6. 要約を計算する前に、すべての `not_comparable` 行を確認する。
7. 結論は `worth expanding`、`do not expand yet`、`insufficient evidence` のいずれかだけに
   し、境界と次回実行の条件も添える。

### 証拠

比較記録には少なくとも次のものを含めます。

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

別のレビュー担当者が三つの入力、条件、受け入れ条件を再構築できなければなりません。中断した実行を
埋めるために、空のセル、見積もり、もう一方の候補の出力を使ってはいけません。選んだ費用基準が
その換算を明示的に定義しない限り、token 数は通貨ではありません。

## 5. 失敗のバリエーションと安全な復旧

| 失敗のバリエーション | 結果が比較可能でない理由 | 安全な対応 |
|---|---|---|
| 選んだ作業面で候補が見えない、または呼び出せない | 比較する同じ作業面の実行がない | `surface_available: no` または `not_observed` と記録し、その候補を止め、利用不能をモデル品質として採点しない |
| モデル picker と provider が一致しない | 要求が意図したモデルを使っていない可能性がある | 伏せ字にした実効設定の diff を保存し、組を直すか、比較を provider／ワークフローのテストに変える |
| 容量エラーが一方の実行を中断する | 出力と所要時間が不完全で、次の試行が部分的な状態から始まる可能性がある | error と checkpoint を保存し、`blocked` または `not_comparable` と分類し、宣言した条件の下でのみ両方を再実行する |
| コマンドが検証可能なイベントなしに待機する | `Working` という表示は結果ではない | タイムアウトのルールを適用し、中断し、diff とプロセスの状態を調べ、検証が欠けていると記録する |
| 片方が追加のコンテキスト、より高い effort、新しいツールを得る | 独立変数がもはやモデルだけではない | `not_comparable` と記し、両方の記録を保存し、凍結した契約でやり直す |
| 一つの魅力的な demo で総合優勝を宣言する | サンプル数と結論の範囲が一致しない | `candidate` または `insufficient evidence` に戻り、主張を広げる前にタスクの分類と反復回数を増やす |

容量や長時間の待機による失敗への現実的な対応は「動くまでクリックし続ける」ことではありません。
最後に確認できた状態を保存し、タスクが完了していたのか、部分的だったのか、不明だったのかを
判断し、それから範囲を限定した復旧を選びます。新しい会話は復旧の作業面になり得ますが、古い
会話から証明を受け継ぐわけではありません。

## 振り返り

カードと raw 根拠から答えましょう。記憶からではありません。

- 拡大／停止の判断を変えたのはどのタスクか。
- どの違いがモデルに由来し、どの違いが作業面、provider、コンテキスト、ツール、権限、容量、
  レビュー担当者に由来する可能性があるか。
- より速い、またはより安い出力でも受け入れ基準に失敗するのはどこか。
- どの文が公式の製品位置づけで、どの文がこのスモーク実行からの観測か。
- 魅力的な demo が一つしかないとき、一般的な順位を妨げるのは正確には何か。

## 移行タスク

同じ比較フィールドを、次のタスクのいずれかに移します。

- 同じモデルを Local と Worktree で。
- 厳密な出力 schema を持つ文書変換。
- 引用と「不明」列を持つ調査出典の突き合わせ。
- read-only のツール境界を使う低リスクのコード調査。

新しいタスクセットのバージョンと、領域固有の受け入れ基準を固定します。モデルの選択や三タスクの
結果を新しい領域にコピーしてはいけません。どの結論がタスク単位のままか、どの主張を捨てなければ
ならないかを明示します。

## 章の根拠

意図された納品物は、二枚の候補カード、凍結したタスクセットと基準、最初の raw 実行と制御された
再作業があればそれ、比較表、型づけされた error 記録、拡大／停止の判断です。それらの記録が
存在するまで、この章は `not_run` を維持しなければなりません。公式の位置づけと単一の demo は、
評価の根拠の代わりにはなりません。

## 出典と保守の境界

| 事実または方法の境界 | 出典 | 確認日 | 適用範囲 | 担当者／次回レビュー |
|---|---|---:|---|---|
| 公式のモデル位置づけ、reasoning ガイダンス、ローカルのデフォルト、Cloud のモデル境界、廃止通知 | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | 確認日時点の公式ドキュメント。account レベルの証明やベンチマークではない | `facts-maintainer` / 2026-09-11 |
| CLI の作業面とローカル repository のワークフロー | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | 公式の CLI ドキュメント。この session の実効設定ではない | `facts-maintainer` / 2026-09-11 |
| Cloud の環境、セットアップ、logs、レビューの境界 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | 公式の Cloud ドキュメント。セットアップは Agent ステージの完了ではない | `facts-maintainer` / 2026-09-11 |
| 公開されている model／provider、容量、長時間待機の症状 | [フィールド問題の記録](../evidence-library-JA.md#source-notes) | 2026-08-11 | ユーザー報告とプロジェクトの指針。ローカルでの再現や公式の根本原因の主張はない | `curriculum-maintainer` / 2026-09-11 |
| 固定タスクの比較方法 | [評価の章](19-evaluate-models-and-workflows-JA.md) と[バージョン管理された fixture](../../evals/candidates/three-task-smoke-v1/README-JA.md) | 2026-08-14 | Playbook の方法とローカルの fixture validator。完了したモデル実行はまだない | `evaluation-maintainer` / 2026-09-11 |

モデル ID、作業面マトリクス、価格、容量、設定構文、provider サポート、effort 制御、廃止通知は
変わり得ます。変わったら、まず一次情報源を更新し、それから事実影響レジストリ、調査記録、この章、
影響を受ける評価 fixture、ステータスの出典を更新します。公式の位置づけ、ユーザーの症状、ローカルの
実行時根拠を別々の文に保ちます。

## 受け入れチェックリスト

- [ ] モデルの名前を挙げる前に、タスク、リスク、作業面、provider、受け入れ基準を定義できる。
- [ ] モデルカタログ、設定値、picker の表示からアクセスを推測するのではなく、実際の可用性の
      根拠を記録できる。
- [ ] モデル、provider、effort、コンテキスト、ツール、権限、費用基準、タスクセットのバージョンを
      二枚の候補カードに記入できる。
- [ ] 一方の条件を変えずに、`three-task-smoke-v1` の六回の初期実行を実行するか、正しく
      ブロックできる。
- [ ] provider 不一致、容量、長時間待機の根拠を保存し、復旧と検証を区別できる。
- [ ] タスクの範囲内の観測だけを報告し、一つの demo が総合順位や費用対効果の主張を証明できない
      理由を説明できる。
- [ ] この章がまだ `candidate` であり、その実験とモデル評価がまだ `not_run` であると
      述べられる。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-JA.md" aria-label="前の章: 第 5 章 · 適切な Codex の作業面を選ぶ">← 前へ<br><strong>第 5 章 · 適切な Codex の作業面を選ぶ</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-JA.md" aria-label="次の章: 第 7 章 · Skill、Plugin、MCP、ツールは仕事をどう分けるか">次へ →<br><strong>第 7 章 · Skill、Plugin、MCP、ツールは仕事をどう分けるか</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
