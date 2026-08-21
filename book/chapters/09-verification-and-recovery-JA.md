<!-- content_id: chapter-09-verification-and-recovery | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第 9 章：検証、疑い、復旧

**状態：** `candidate`。**実験：** `not_run`。この章では、「完了した」という主張と、その根拠（evidence）を対応づけます。手順に確信が持てないときの立て直し方も扱います。ローカルで再現した結果や、公式の診断、運用環境での証拠を示す章ではありません。

## この章が解決する問題

Agent は、誤りや範囲外の変更、実行していない処理、別の環境で得た結果についても、もっともらしい完了報告（summary）を書けます。何でも信じるのも、何も信じないのも解決策ではありません。報告を、個別に確認できる主張（claim）へ分解し、示した範囲（scope）を支える最小限の証拠を割り当てます。

弱い証拠一つで、別の種類の証拠を代用することはできません。ビルド成功は実行時の動作を、スクリーンショットは需要を、公式 URL は自分のアクセス権を証明しません。

## 学習目標

完了報告を、個別に確認できる主張へ分解し、それぞれに合う最小限の証拠を選びます。根拠が最初に途切れる地点を見つけ、安全な次の確認か、正直な引き継ぎ（handoff）を書けるようになることが目標です。この練習だけで、製品の信頼性や学習効果を証明することはできません。独立した実行記録とレビューが必要です。

## 現実の問題：もっともらしい完了報告に根拠がない

差分、テスト出力、読者の観察がなくても、返答は「完了した」「すべてのテストに通った」「読者は理解した」と言えてしまいます。これは特定のモデルを診断する話ではありません。依頼、承認、ツール、操作、結果、レビューという流れのうち、根拠が最初に欠けた段階を確認することが大切です。

## 三つの Windows 報告：signal は evidence ではない

次のケースは、2026-08-12 に確認した公開 GitHub 報告を教材として使ったものです。
ローカルでの再現、公式の診断、すべての Windows 環境に当てはまる不具合の宣言では
ありません。症状を読んだら、必ず「何を証明し、何を証明しないか」を分けます。

| 公開された症状 | ここから学べること | 最初の限定的な確認 | その前に止めること |
|---|---|---|---|
| Codex CLI の長い出力を terminal の scrollback から戻せないという報告（[#35335](https://github.com/openai/codex/issues/35335)） | viewport は表示であり、永続的な evidence ではない | response を名前付き file に保存するか、同じ範囲を再生成して CLI、terminal、prompt scope を記録する | 表示がないことから Agent や repository data の消失を断定する |
| TUI composer に貼った non-BMP 文字が消えるという報告（[#37578](https://github.com/openai/codex/issues/37578)） | composer の見た目は入力の完全性ではない | 無害な fixture で意図した文字列と受信した文字列を比較してから、重要な依頼を送る | 入力が保存されていないまま edit、commit、送信を行う |
| 長い checkpoint ref で Windows Git が `bad ref` や `Filename too long` を返すという報告（[#37559](https://github.com/openai/codex/issues/37559)） | Agent 内部の状態と通常の project state は同じではない | 許可された診断範囲で `git status`、`git show-ref`、`git fsck --full`、`git worktree list`、正確な ref path を記録する | backup と authority なしに `.git` を削除、設定変更、fetch、ref 修復を行う |

プロジェクトの [Windows input and evidence field problems](../../docs/research/field-problems-input-and-evidence-p3-2026-08-11.md)
には、報告の version、evidence boundary、転用できる表があります。実務上のルールは、
**retry の前に最小の durable artifact を保存する**ことです。output file、受信入力の比較、
diff、hash、command log、redacted handoff のどれでも構いません。community workaround は
triage の手がかりにはなりますが、公式の修正や永続的な環境変更を許可するものではありません。

### 現場ケース：command が終わっても claim を review できない

[FC-EVIDENCE-01](../../docs/research/field-case-hidden-verification-output-2026-08-12.md) は、
実行したことと監査できる evidence を分けるための bounded case です。参照している issue
（#34951）は open のままで、公開された maintainer diagnosis はなく、このプロジェクトでも
再現していません。必要な output が隠れている、または残っていないなら、すでに許可された
exit、event、diff、artifact、hash、read-back だけを保存します。監査 claim は
`unverified` とし、欠けている channel を書きます。表示を取り戻すために consequential action
を再実行したり、安全制御を弱めたり、success-shaped state から結果を推測したりしません。

<a id="core-evidence-recovery"></a>

## 1. claim と evidence を対応させる

まず言おうとしている一文を書き、その scope の主張を別の人が受け入れるには何を見ればよいかを考えます。

| Claim | その scope を支える最低限の evidence | Claim の外に残ること |
|---|---|---|
| file が変わった | diff、named path、hash | change が正しい、または完全であること |
| check が通った | 正確な command、working directory、exit code、relevant output | 別の environment が同じように動くこと |
| application が動く | 実際の start と named critical-path observation | visual quality、security、user value、production readiness |
| page の見た目が正しい | 記録した viewport の browser または screenshot review | accessibility、全 breakpoint、backend、conversion |
| fact は公式 source に基づく | authoritative URL、access date、scope、review owner | 現在の account や runtime が同じ capability を持つこと |
| secret を公開していない | scoped scan、environment check、boundary statement | 未知の外部 system に届いていないこと |
| result が user に役立つ | defined sample、task、user-acceptance record | 市場での成功や将来の効果 |
| production-ready である | quality、security、maintenance、release、rollback の各 gate | 未テストの environment や owner のない将来変更 |

### Lab 013 の前に：claim-to-evidence 表を作る

[Lab 013: auditable vertical slice](../labs/lab-013-l3-vertical-slice-JA.md) を始める前に、
「done」を確認可能な行に分けます。各行は、宣言した scope に含まれる evidence だけで支えます。

```text
assertion: 何を正確に主張するか
scope: file、command、run、version、environment のどこまでか
evidence: path、command output、log、screenshot、source、review record
status: verified / partial / unverified / blocked / not_run
gap_or_next_check: 何が足りず、最小の追加確認は何か
```

一つの diff で test pass を証明したり、signed-in page で token exchange や外部 action の成功を
証明したりしません。evidence がなければ `unverified`、`blocked`、`not_run` のどれかを付け、
欠けた部分を保存して recovery flow へ進みます。

## 2. 疑いを次の check を選ぶ材料にする

重要な判断では、短い claim を一つ書き、自分の推論からいったん切り離してみます。

- どの前提に evidence がないか。
- どの boundary condition をまだ試していないか。
- mock、cache、stale file、誤った environment から同じ結果が出ないか。
- claim が false なら、最初にどこで見えるか。
- 判断を変え得る、最小の追加 check は何か。

疑い続けることが目的ではありません。コストの大きい誤りを、delivery 前に早く見つけるためです。
良い check は関係する条件を一つだけ変え、観測可能な結果と stop rule を持ちます。

### status label は完了の証拠ではない

| 言えること | 最低限の証拠 |
|---|---|
| 「source が変わった」 | named path の diff または file comparison |
| 「check を実行した」 | 正確な command、working directory、exit code、output |
| 「application が動く」 | named environment と input の runtime observation |
| 「page の見た目が正しい」 | 記録した viewport と visual criteria を含む render review |
| 「feature を出荷した」 | repository/deployment state、release record、delivery 後の check |

最後の主張は前の四つより強いものです。passing build を runtime、visual、security、
user acceptance の証拠に置き換えません。

### 最初の切れ目を見つける

```text
request → authorization → visible tool → action → result → review
```

観測できない最初の矢印を記録します。セッションが使えても、必要なツールが登録されているとは限りません。作業を再び操作できるようになっても、目的の結果が正しいとは限りません。

| 状態 | 意味 |
|---|---|
| `verified` | 宣言した範囲で、証拠が主張を支えている |
| `unverified` | 必要な証拠が欠けている。誤りだと決まったわけではない |
| `unknown` | 判定に必要な観察が足りない |
| `partial` | 一部だけ支えられ、残りは支えられない |
| `not_observed` | プロジェクトが観察結果を保存していない |
| `error` | 宣言した操作が失敗した証拠がある |

## 3. 範囲を広げずに recovery する順番

何かが失敗した、または状態が分からなくなったら、次の順番を使います。

1. エラーと現在の状態を保存する。
2. input、understanding、environment、implementation、capability、permission、verification のどこが境界かを分類する。
3. scope を狭め、最小の観測可能な破綻を再現する。
4. 一つの小さな修正、または一つの targeted check だけを行う。
5. 影響した path を再確認し、新しい evidence を記録する。
6. まだ不明なら、正確な blocking note を残して止まる。
7. evidence が支える場合だけ、permission、scope、retry budget を広げる。

「もう一度実行する」「もっと権限を与える」「モデルにもっと考えさせる」は、診断の代わりになりません。

### capability chain：成功した各段階に別の proof が必要

公開報告では、tool name は見える、page は読める、provider は configuration を受け付けるのに、
discovery call、click、上位 capability が失敗するという sequence が繰り返し出てきます。見える名前が
証明するのは名前が見えることだけです。registration、discoverability、execution、side effect の成功は別に確認します。

```text
tool または Skill が見える
  → read-only discovery call が動く
  → target state を読める
  → target action が success を返す
  → 期待した外部 state change を read-back で確認する
```

各段階に独自の evidence が必要です。DOM を読んだことは click 成功を、parsed configuration は
backend capability を、初回 launch 成功は別の window、version、account での同じ capability を証明しません。

### breakpoint card：最初に支えられない層で止まる

root cause を先に推測せず、最後に通った assertion と、最初に失敗または観測できなかった assertion を記録します。

```yaml
run_id: "unique run identifier"
surface: "実際の work surface と version"
expected_capability: "この run に必要な最小 capability"
chain:
  - stage: "entry/session available"
    observation: "observable event または error"
    status: "passed | failed | not_observed"
  - stage: "tool registered and discoverable"
    observation: "tool list または read-only discovery result"
    status: "passed | failed | not_observed"
  - stage: "target state readable"
    observation: "read-only の target、account、path、window の evidence"
    status: "passed | failed | not_observed"
  - stage: "target action returned"
    observation: "result、exit code、error category"
    status: "passed | failed | not_observed"
  - stage: "expected side effect confirmed"
    observation: "target state、diff、read-back result"
    status: "passed | failed | not_observed"
last_confirmed_stage: "最後に通った stage"
first_breakpoint: "最初に failed または not_observed の stage"
safe_next_check: "condition を一つだけ変える最小の check"
stop_condition: "authority や side effect を広げずに止まる条件"
```

tool name は見えるのに read-only discovery が失敗したなら、breakpoint はその discovery 層です。
action が success を返しても target state が変わらなければ、breakpoint は side-effect confirmation 層です。
breakpoint を越えて高リスクの action を始めたり、後から得た lucky success で前の proof を埋めたりしません。

### 何も起きない長い待機：先に時系列を残す

「UI がまだ `Working` と表示する」は、一つの観測であって root cause ではありません。長い request では少なくとも次を残します。

```text
request_started_at
first_event_at
each tool or network event
last_event_at
interrupt or error time
automatic retry start time
final state
```

あらかじめ決めた no-event threshold に達したら、`no_event_observed` と記録します。許可された手段で control を取り戻し、
process、worktree、target state、last checkpoint を確認してください。最初の request が side effect を起こした
可能性があるなら `unverified` または `blocked` のままです。操作が idempotent で、state を再確認し、retry rule が前もって
定義されている場合に限り、限定した retry を一回だけ許可します。自動 retry は別の event として保存し、二回目の成功で
一回目の no-event を pass に書き換えません。

## 安全な確認を一つだけ行って立て直す

容量エラー、`Working` のまま終わらないコマンド、見つからないツール、再インストールの提案に遭遇したら、まず差分、出力、ログ、最後に受け入れたチェックポイントを保存します。そのうえで、対象を読み取る、同じコマンドを条件付きで一度だけ再試行する、入力を尋ねる、停止する、のいずれか一つを選びます。確認を始めたからといって、インストール、再起動、デプロイ、範囲外への書き込みが許可されたわけではありません。

```text
claim: すべてのテストに通った
evidence: テスト出力がない
status: unverified
next_check: 固定した作業ディレクトリとリビジョンで、承認済みのコマンドだけを実行する
```

### 緑の表示は結論ではない

緑色のチェックが示すのは、ある時点で**一つの**確認がエラーなく終わったことだけです。
「動く」と書く前に、次の点を分けて確認します。

| 見えたこと | まだ確認すること | 小さく安全な確認 |
|---|---|---|
| コマンドが終了コード 0 で終わった | 想定したコマンド、フォルダー、リビジョンだったか | コマンド、フォルダー、リビジョン、必要な出力を残す |
| 差分がある | 依頼と境界を守った変更か | 目的と制約に照らして差分を読む |
| ページが開く | 想定した入力で重要な経路が通るか | 無害な入力と記録済みのビューポートで一つの経路を確認する |
| モデルが「完了」と言った | 各主張を支える独立した観察は何か | パス、出力、差分、または明示的な制限を求める |

一つのチェックの成功を、安全性、利用者への価値、運用投入への約束にすり替えません。
観察がなければ、その行は `unverified` のままにします。自信で空白を埋めないでください。

### 復旧レシート：次の人が安全に続けるために

作業手順を止めたとき、または操作を取り戻したときは、短いレシート（receipt）を残します。
最初から闇雲にやり直すのではなく、次の人が権限を広げずに何を確認できるかを示すためです。

```text
goal と boundary: 何をする予定で、何が許可されていなかったか
last confirmed point: 実際に確認できた観察、パス、または出力
first unsupported point: 根拠がない最初の主張
target state: no change / partial change / unknown
saved evidence: 差分、ログ、出力、スクリーンショット、または特定のリンク
safe next check: 読み取り専用、または元に戻せる一つの操作
not yet: 公開、インストール、デプロイ、または範囲の拡張
```

レシートは結果を修正せず、原因も証明しません。`maybe` を `done` に変えず、
安全に再開できる正確な地点だけを残します。

## 実験と境界

### 準備

ローカルの一時フォルダーに、完了報告、差分、テスト出力、出典リンク、そして意図的に欠けさせた証拠を一つ置きます。秘密情報、本番環境、インストール、サインイン、外部への変更は使いません。

### タスク

伏せ字にした完了報告、差分、テスト出力、出典リンク、意図的に欠けさせた証拠を用意します。Lab 003 で、主張・範囲・証拠・状態・次の確認を表にします。出力がない「すべてのテストに通った」という文は、丁寧に書かれていても受け入れません。事実に関する主張、実行に関する主張、利用者への効果に関する主張を一つずつ含め、弱い証拠一つで三つを支えられない理由を説明します。本番サービスには接続せず、外部システムも変更しません。

復旧して状態を再び観測できるようになっても、主張が自動的に `verified` になるわけではありません。この章は `candidate`、実験は `not_run` のままです。

### 証拠

主張と証拠の表、名前を付けたパスと出力、各行の状態、最初に根拠が切れた地点、安全な次の確認を保存します。実行していなければ `not_run` と書き、自信のある語調からテスト出力を作りません。

## ガイド付き練習：自信のある完了報告をそのまま受け取らない

90語ほどの案内文について、「初めての人が最初の一歩を理解できるように直して。事実は変えず、公開もしないで」と依頼した場面を考えます。モデルが「完了しました。分かりやすく、すべてのチェックに通りました」と返しても、すぐに完了とはしません。

1. どのファイル、または本文が変わったか。差分か、変更前後の本文を確認する。
2. どのチェックを実行したか。コマンド、作業ディレクトリ、終了コード、必要な出力を確認する。
3. まだ何を確認していないか。初学者の理解、Web 上の見え方、公開後の反応を分ける。
4. 次の安全な確認は何か。この例では二つの本文を比べ、初めて読む人に「最初に何をする？」と一問だけ尋ねる。

モデルを嘘つきと決めつける必要はありません。広すぎる一文を、主張の表に変えれば十分です。
テスト出力がなければ、「すべてのチェックに通った」は `unverified` です。本文を比べただけなら、「本文の差分は確認したが、読者の理解は未確認」と引き継ぐのが正確です。

## 初学者向けの復旧カード

期待どおりにならないとき、思いつきで指示を追加しません。観測したことだけを書きます。

```text
goal: 最初の一歩を分かりやすくする。公開しない
last_confirmed: 下書きと差分がある
first_breakpoint: 初めての読者が理解した証拠がない
safe_next_check: 一問だけの読者確認を依頼する
stop_if: 公開、インストール、別ファイルの変更が必要になる
honest_handoff: 本文のレビューはある。読者の理解は unverified
```

このカードは、「動かなかった」を調べられる次の一歩に変えます。モデル、Skill、コースの効果を証明するものではありません。観測したこと、欠けていること、安全な次の行動だけを分けて残します。

## 実践：claim-to-evidence 表を一度作る

完了報告を受け取ったら、先ほどの表を使って主張を一行ずつに分けます。一つの成果物や
緑色のチェックを複数の結論に使い回さないためです。たとえば次のように、読者の理解を
まだ確認していないことを残します。

```text
claim: README の開始手順は初学者に分かりやすい
evidence: 保守担当者による本文レビューとローカル差分
status: partial
not proven: 初めて読む人が正しく行動できること
next check: 一人に「最初に何をするか」を一問だけ尋ねる
```

## 実践カード：最初の切れ目と待機の記録

詳細な capability chain と長時間待機の記録形式は、上の recovery 節にまとめています。
ここでは、実際の handoff に使う最小カードだけを残します。

```text
last confirmed layer:
first unsupported layer:
artifact / side-effect state:
evidence preserved:
claim downgraded to:
one safe next check:
explicitly forbidden next actions:
```

## 完了状態と復旧状態を分ける

復旧して操作を取り戻しても、完了の主張が真になるとは限りません。二つの列を分けて残します。

| 復旧状態 | 完了状態 | 正確な引き継ぎの例 |
| --- | --- | --- |
| チェックポイントを保存して一時停止 | `unverified` | 「再開できるチェックポイントはある。結果は未確認」 |
| 対象を読み戻し、一部の差分を確認 | `partial` | 「一部の変更を確認。受け入れ確認は未実行」 |
| 不足している入力を特定 | `blocked` | 「原因の推測ではなく、必要な入力がないことを観測」 |
| 範囲内の正確なチェックに通った | `verified` | 「このローカル規則は通った。範囲外は未確認」 |

これは製品の状態ラベルを定義するものではありません。自分の引き渡しの主張が、実際に保存した証拠より強くならないようにするための用語です。

## 応用課題

固定した出典を使う調査メモや静的ページのレビューにも、同じ方法を移してみます。言語練習では、AIの助けを受けた返答と、後で見慣れない内容を助けなしに思い出せるかを分けます。事実の主張、実行の主張、読者への効果の主張を一つずつ書き、それぞれに別の証拠を求めます。引用、差分、出力のどれか一つを意図的に外し、主張を狭めてから安全な次の確認を一つ選びます。

- [ ] ビルド、差分、スクリーンショット、出典 URL、読者の反応のどれも、別種類の主張を自動的には証明しないと説明できる。
- [ ] 最初に根拠が切れた層を名指しし、範囲を広げずに次の確認を選べる。
- [ ] 何も起きなかったコマンドの時系列を保存し、時間だけを根拠に成功と言わない。
- [ ] 復旧状態と完了状態を別々に引き継ぐ。
- [ ] `verified` は、正確な受け入れ確認の記録がある行にだけ使う。

## 受け入れチェックリスト

- [ ] 完了の各主張に、範囲と証拠、または `unverified` がある。
- [ ] 差分、テスト出力、実行時の観察、表示確認、利用者の観察を分けられる。
- [ ] 最初に根拠がない段階を見つけ、安全な次の確認を一つだけ選んだ。
- [ ] 引き継ぎに、変更、証拠、不明点、未実行の副作用を書いた。

## 出典と更新境界

この章の方法は、プロジェクトが作成した教材上の枠組みです。製品固有の動作、コマンド、承認、画面の状態は変わるため、現在の公式ドキュメントと実際の環境で確認します。公開された利用者報告は、症状を学ぶための材料であり、ローカルでの再現、根本原因、万能な修正方法の証拠ではありません。参照先は英語の原文と [evidence library](../evidence-library-JA.md#source-notes) に記録しています。章は `candidate`、実験は `not_run` のままです。

## 意図的な失敗と振り返り

読者に尋ねていないのに「読者は理解した」と書いた引き継ぎを一度作ります。その主張が証拠を越えている箇所に印を付け、正直な状態へ書き換えます。次に、状態を変える最小の証拠と、それでも範囲外に残ることを説明します。差分と一緒に保存してください。実行記録とレビューがない限り、この章は `candidate`、この練習は `not_run` のままです。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-JA.md" aria-label="前の章: 第 8 章 · 定義から引き渡しまで">← 前へ<br><strong>第 8 章 · 定義から引き渡しまで</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-JA.md" aria-label="次の章: 第 10 章 · 計画と垂直スライス">次へ →<br><strong>第 10 章 · 計画と垂直スライス</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
