<!-- content_id: chapter-08-full-lifecycle-workflow | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 8 章：定義から引き渡しまで

**状態：** `candidate`。この章は evidence を伴う workflow と復旧規則を教えます。比較実験は `not_run` のままであり、実際の Codex 実行、顧客対応、production release の記録ではありません。

## この章が解決する問題

モデルに書き始めてもらうことと、別の人が使える仕事を終えることは別です。goal が曖昧でも、scope が膨張しても、check が違う file を見ていても、画面は順調に見えることがあります。最後に受理した change が不明なまま retry すると、未完成の state に後続作業を重ねる危険もあります。

```text
define → plan → build → verify → review → deliver → maintain
```

各矢印は判断点です。Agent が「完了」と言ったからではなく、その段階を他者が確認できる evidence があるときだけ進みます。

## 学習目標

- edit 前に scope、non-goal、acceptance、authority、rollback を書く。
- 大きな request を、早く evidence を出す vertical slice に変える。
- 最後の受理済み state を残し、条件付きでだけ retry する。
- build、runtime、visual、source、security、user acceptance の evidence を区別する。
- 完了と未完了を混ぜない handoff を書く。

## 現実の問題：見える成功の間で workflow が壊れる

login、model picker、開始した check は、次に必要な state が欠けていても進行に見えます。下の公開症状は、この実行の再現でも製品診断でもありません。中断後に path と diff を読む、browser のあとに client exchange を分ける、永続的 change の前に新しい許可を求める、といった最初の安全な観察を選ぶ材料です。

## evidence を運ぶ七段階

| 段階 | 問い | exit evidence | 止まる条件 |
|---|---|---|---|
| Define | 何を誰のために、どこまで行うか | task protocol と acceptance | input 不足が scope、risk、authority を変える |
| Plan | 最小の有用な順序は何か | slice と check を含む plan | 確認可能な結果のない横割り |
| Build | 許可された scope で何が変わったか | diff、changed-file list、checkpoint | scope 外または rollback 不明 |
| Verify | 必要な check で振る舞うか | command、exit code、output、environment | hang、誤 target、evidence 不足 |
| Review | claim は evidence と合うか | claim-to-evidence 表、open risk | claim が evidence より広い |
| Deliver | 別の人が使い確認できるか | summary と artifact path | published や live を誇張する |
| Maintain | 何を更新・戻すか | owner、review、rollback record | owner も recovery もない |

exit が欠けたら `blocked` または `unverified` と書きます。段階を増やしても、不足した permission、file、test の代わりにはなりません。

## status label と evidence は違う

| claim | 最低限の evidence | 証明しないこと |
|---|---|---|
| source を変えた | 指定 path の diff | change が正しいこと |
| check を実行した | command、directory、exit code、output | application の動作 |
| application が動く | 指定 input と environment の runtime observation | 全 account や OS での動作 |
| page は正しい見た目 | viewport と criterion を残した render inspection | demand、完全な accessibility、deployment |
| feature を出荷した | repository/deployment state と delivery 後 check | 全利用者への到達 |

passing build は有用でも、runtime、visual、security、user acceptance の証明には自動でなりません。

## action の前に define する

```text
owner: content-maintainer
target: docs/guide.md
goal: step、link、acceptance note を一致させる
allowed_scope: rule を読む; target を edit; 既存 local check を実行
non_goals: dependency install; commit; push; publish; system change はしない
acceptance: 指定 defect を直し、許可された check の exit を残す
evidence: diff、changed-file list、command output、unverified list
stop_when: scope、authority、target、recovery source が欠ける
rollback: 記録済みの pre-edit copy または clean checkpoint に戻る
```

non-goal は accidental expansion を防ぎます。「page を verify」は browser reinstall、policy change、publish の許可ではありません。hash は変更を示しますが、以前の内容を戻しません。write、network、authentication、installation、restart、deployment、external message は必要で、かつ明示的に許可されたときだけ加えます。

## vertical slice と checkpoint

横割りの `all data → all API → all UI → integration → test` は、間違った前提を最後まで隠しがちです。vertical slice は `one input → smallest change → observable action → focused check` として、一つの小さな結果を input から evidence まで通します。

checkpoint には baseline、permission、最初の diff、check output、review を分けて残します。retry 前には次を記録します。

```text
failed_stage: verify
failure_class: timeout / capacity / unknown
last_accepted_checkpoint: CP2
changes_since_checkpoint: none known; diff rechecked
retry_condition: same command, same target, one bounded attempt
fallback: output がなければ stop して handoff
```

「続けて」は recovery plan ではありません。最後に受理した state も duplicate side effect の防止も示しません。

## 実験：失敗と受け入れ

### 準備

remote、secret、顧客データのない disposable folder を作ります。原文、acceptance question、local checkpoint を保存し、待機上限と安全な中断手順を先に決めます。install、sign-in、第三者への送信はしません。

### タスク

小さな documentation task を二通り試します。一方は直接の request、もう一方は protocol、checkpoint、focused check を使います。初回 output、diff、command、exit code、実際の duration、rework を残します。ない time や cost は推定せず `unavailable` と書きます。

timeout、input hash の変更、permission block、local write result の不明を一つ起こします。中断試行を残し、retry 前に target を読み、固定条件が変われば `not_comparable` にします。後の成功は比較可能性を遡って直しません。三つの小課題は一般的な efficiency、quality、model ranking を証明せず、link check は学習、公開、adoption を証明しません。

### 証拠

各試行について、固定した input と acceptance、allowed action、checkpoint 番号、request または protocol、changed path、diff、directory と exit code を含む command、review note、欠けた観察を保存します。実行しなかった variant は `not_run` と書き、流暢な output から実行記録を作りません。

### 振り返り

- どの checkpoint で state は実際に分かり、どこから推測だったか。
- diff が支える claim と、runtime または reader が必要な claim はどれか。
- どの side effect が新しく限定した approval を必要としたか。

- [ ] edit 前に scope、non-goal、acceptance、authority、rollback を書ける。
- [ ] 大きな request を early evidence を出す vertical slice に変えられる。
- [ ] retry 前に last accepted checkpoint を言える。
- [ ] build、runtime、visual、source、security、user acceptance を分けられる。
- [ ] 求められていない install、restart、deployment、external write を止められる。
- [ ] completed、not done、blocked、unverified を分けて handoff できる。

## 実際の中断に備える recovery pattern

公開された利用者報告は有用な症状を示すことがありますが、公式の原因説明やローカル再現の
代わりにはなりません。製品内部を推測するためでなく、最初の安全な確認を選ぶために使います。

### capacity または availability の中断

**観測された症状：** 選んだ model が利用できなくなり、task が止まる。

**最初の安全な対応：** その task に依存する後続 prompt を止め、diff、output、最後に受理した
checkpoint を残します。target artifact が途中の state ではないか確認してから、一回だけの
bounded retry、許可された別 surface、handoff のいずれかを選びます。

**言ってはいけないこと：** queue 中の task が終わった、model だけが原因だった、または
「続けて」を繰り返せば欠けた evidence が戻った、とは言えません。

### check が `Working` のままになる

**観測された症状：** formatter、test、analysis が完了 signal を返さない。

**最初の安全な対応：** あらかじめ決めた待機時間と interruption rule を適用し、command、
directory、elapsed time、output、process state を残します。diff を確認してから complete、
partial、failed、unknown のどれかに分類します。

**言ってはいけないこと：** silence は pass を意味せず、画面に error がないからといって
child process が終わったとは限りません。

### browser の login は成功したが client が続かない

**観測された症状：** browser は login 成功を示すのに、client は token exchange または最初の
request で失敗する。

**最初の安全な対応：** authorization page、callback、client exchange、最初に成功した request
を別々の行に記録します。欠けている次の state だけを確認します。

**言ってはいけないこと：** browser の成功は client authentication、account entitlement、
connector approval、tool availability の証明ではありません。

### verify が永続的な change を提案する

**観測された症状：** Agent が check を通すために reinstall、restart、environment の変更を提案する。

**最初の安全な対応：** 提案された side effect、target、それを促した artifact、利用できる recovery
を明記して止まります。local edit、test、installation、restart、deployment、live verification を
分け、永続 change の前には新しい判断を求めます。

**言ってはいけないこと：** 「動くことを確認して」は installation、network write、publish の
許可にはなりません。

## まず小さく完結する slice を一つ終える

最初から site、code、release を扱う必要はありません。自分で確認できる短い文章、一つの local README、またはすでに使用許可のある公開 source 一式を選びます。目的は model に「たくさんさせる」ことではなく、define から handoff まで見える一周を終えることです。

```text
result: 120 字以内の説明で、新しい reader が最初の一歩を見つけられる。
input: 原文、想定 reader、分かっている問題一つ。
allowed: 原文を読む。plan を出す。確認後もその text だけを編集する。
not allowed: network、sign-in、install、送信、publish、他 file の変更。
check: before/after text を保存し、「最初の一歩を見つけられるか」を一度確認する。
handoff: 変えたこと、変えなかったこと、check の結果、まだ unknown なこと。
```

七段階を通します。reader と result を定義し、一か所を plan し、原文を checkpoint として残し、編集し、前後を比べ、別の視点で review し、次の人または明日の自分へ handoff します。追加資料や external action が必要なら `blocked` で止めます。閉じたように見せるために permission を広げません。

### 二つの試行が比較できる条件

「model にすぐ編集を頼む」と「先に protocol を書く」を比べるなら、原文、goal、allowed action、time limit、check rule を固定します。first output、実時間、rework、diff、check result、unknown を残します。text、model、tool、permission、environment が変われば `not_comparable` です。一度速い、または見栄えが良い結果は、一般的な効率や model の優劣を証明しません。

## checkpoint を持って一周する

短い task でも、途中で何が確定したかを残します。次の人が conversation を読まなくても
続けられることが基準です。

```text
CP0: original text、target path、許可 scope、rollback source
CP1: goal と acceptance を確認。まだ edit していない
CP2: 一か所だけ edit。before/after と diff を保存
CP3: named check を実行、または stop。output と limit を保存
CP4: claim と evidence を review。handoff と next action を書く
```

checkpoint ごとに、最後に確認できたこと、変わった可能性がある file、まだ足りない
evidence、次の一つの安全な action を書きます。`CP2` がなければ、model が「変更した」と
言っても change を delivery に含めません。`CP3` が timeout したら silence を pass にせず、
output、process state、diff を残して `unverified` または `blocked` にします。

## claim ごとに check を選ぶ

| claim | 必要な evidence | まだ証明しないこと |
|---|---|---|
| text を変えた | named path の before/after または diff | 読者が理解すること |
| local check が通った | command、directory、exit code、output | 別の environment での動作 |
| page が見える | recorded viewport の render review | accessibility、demand、deployment |
| external change を送った | target 側の read-back | すべての人が見られること |

一つの green check をすべての claim に使いません。特に diff は change の証拠であり、
user value や publish の証拠ではありません。evidence がなければ、文を狭めます。

## 次の人へ渡す短い handoff

```text
status: passed | partial | blocked | unverified
done: evidence がある action だけ
changed: exact paths または none
evidence: CP 番号、diff、command output、review note
not done: commit / push / publish / external write の有無
not proven: reader usefulness、runtime、visual、security など
next: 一つの安全な action
```

これは「すべて完了」より短くても強い handoff です。対象、authority、recovery source が
不明なら、次の action は edit ではなく質問または read-only check です。この章と比較実験は
run record と review ができるまで `candidate` と `not_run` のままです。

## 移行タスク

同じ workflow を、技術以外の task に移します。自分の短い文章を直す、小さな source list を確認する、または language practice を計画する task です。goal、allowed input、禁止 side effect、checkpoint、handoff は保ちます。acceptance だけを domain に合わせて替えます。たとえば reader の理解、research の source と unknown、language practice の遅延した無支援の recall です。この練習が証明しないことも書きます。

## worked case：一つの Markdown chapter を review する

production repository ではなく disposable copy で、七段階を一周する例です。目的は「文章を
よく見せる」ことではなく、reader が local start step と check の方法を区別して読めるようにする
ことです。

```text
Reader: 初めて local copy を開いた人
Goal: named Markdown file の start section に、最初の action と check を一つずつ明記する
Fixed input: target file、project rule、一つの supplied acceptance note
Allowed: read、plan、target file だけの text edit、existing local link check
Not allowed: link rewrite、install、network、commit、push、publish、別 file の edit
Acceptance: 二つの heading と指定された local command text がある。broken local link を増やさない
Rollback: pre-edit copy と baseline diff
```

この definition が書けないなら、build を始めません。「もっと professional に」は reader、target、
acceptance、non-goal のどれも決めていないため task ではありません。

### Capability decision と plan

この case に必要なのは新しい Skill、browser automation、external source ではなく、local file を
read し一つの text edit を review する能力だけです。

1. target と acceptance note を read し、missing heading または command を report する。
2. edit 前に、changed line、expected diff、check を proposal として見せる。
3. approval 後に target だけを edit し、diff と existing local check を保存する。

plan が別 file、install、network、publish を必要としたら、同じ slice ではありません。原因を記録し、
scope を広げずに stop または別 decision に分けます。

### Stage exits と recovery

| stage | 続けるための evidence | evidence がない場合 |
| --- | --- | --- |
| Define | target、reader、acceptance、allowed scope | question を一つに絞って ask |
| Plan | proposed diff と named check | edit を許可しない |
| Build | target だけの actual diff | scope を review し rollback を決める |
| Verify | directory を含む check output、または manual read-back | `unverified` で handoff |
| Review | claim が diff/check の scope を越えない | claim を downgrade |
| Deliver | changed/not changed/not proven/next を分けた note | “complete” を使わない |
| Maintain | owner と next fact/check review | future claim をしない |

check が timeout したら、first response は retry ではありません。last output、process state、diff、
target read-back を残します。state が分からなければ `unknown` とし、potentially completed write を
blind repeat しません。

### Truthful delivery

```text
Completed: target Markdown の start section を一か所更新した。
Evidence: baseline と exact diff、<named command> の output、working directory。
Not changed: code、dependencies、external service、repository history。
Not proven: 初学者の理解、browser render、publish、他 environment の runtime。
Next: 必要なら一人の reader に最初の action を言えるか聞く。external action は新しい decision が必要。
```

## maintain は次の change を安全にする

workflow の終わりは「永久に正しい」ではありません。volatile な product fact、command、link、
permission、source は owner と次の review date を持たせます。stable method は残し、product-specific
instruction は source、access date、scope とともに更新します。古い事実を見つけたら全 corpus を
機械的に置換せず、affected reader path、acceptance、permission、license、rollback を一つずつ review
します。

- [ ] case の各 stage に、実在する exit evidence または stop record がある。
- [ ] one local check を reader outcome、security、publish の証拠にしていない。
- [ ] timeout 後に最後の accepted checkpoint を確認している。
- [ ] delivery が changed、not changed、not proven、next を分けている。
- [ ] future maintenance に owner と review trigger がある。

## 受け入れチェックリスト

- [ ] edit 前に scope、non-goal、acceptance、authority、rollback を書ける。
- [ ] 大きな request を early evidence を出す vertical slice に変えられる。
- [ ] retry 前に last accepted checkpoint を言える。
- [ ] build、runtime、visual、source、security、user acceptance を分けられる。
- [ ] 求められていない install、restart、deployment、external write を止められる。
- [ ] completed、not done、blocked、unverified を分けて handoff できる。

## 出典と保守の境界

workflow の順序、checkpoint、claim と evidence の分離は、このプロジェクトの安定した教え方です。製品の作業面、account と tool の挙動、model の可用性、community symptom は変わる事実です。現在の製品主張を採用する前に、日付付きの[公式ファクトカード](../evidence-library-JA.md#source-notes)と[フィールド問題索引](../evidence-library-JA.md#source-notes)を確認してください。どちらも local run や独立した学習観察の代わりにはなりません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-JA.md" aria-label="前の章: 第 7 章 · Skill、Plugin、MCP、ツールは仕事をどう分けるか">← 前へ<br><strong>第 7 章 · Skill、Plugin、MCP、ツールは仕事をどう分けるか</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-JA.md" aria-label="次の章: 第 9 章 · 検証、疑い、復旧">次へ →<br><strong>第 9 章 · 検証、疑い、復旧</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
