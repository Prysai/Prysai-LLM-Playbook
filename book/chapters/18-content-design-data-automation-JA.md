<!-- content_id: chapter-18-content-design-data-automation | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第18章：コンテンツ、デザイン、データ、自動化トラック

**状態：** `candidate`。**実験：** `draft / not_run`。このトラックは納品物の検証方法を教えます。本番実行の記録ではありません。

## この章が解決する問題

workflow の tool が増えるほど、「source file がある」「script が走った」「API が接続した」を完成品と取り違えやすくなります。layout、empty state、accessibility、license、formula、privacy、permission、重複書き込み、回復にも失敗がありえます。

> 最初に最終形と読者を定義します。次に risk 順で capability を有効化し、render された結果、入出力、permission、回復、公開状態を検査します。

## 学習目標

この章を読み終えると、次のことができるようになります。

- tool のブランド名を集めるのではなく、納品物と risk から capability を選ぶ。
- document、website、image、presentation、spreadsheet、PDF、data flow、automation について、観測可能な受け入れ条件を書く。
- 最終形を、階層、可読性、empty / error state、responsive、accessibility、事実、license、編集性の観点から確認する。
- automation の input schema、transform、external call、retry、idempotency、log、permission、privacy boundary、output validation を記録する。

## 現実の入口：途中の工程が通っても納品は完了しない

- **FP-10:** formatting または validation command が長時間 `Working` のままになるという報告があります。「command が開始した」は output が生成・検査された証拠ではありません。timeout、exit status、最終 artifact を別々に残します。
- **FP-11:** source の確認が persistent environment の置き換えへ広がったという報告です。creation、installation、publication、deployment、restart、online verification は副作用のレベルが異なり、「verification」の一語にまとめません。

これらは field study の報告・分析であり、local reproduction ではありません。中間 artifact、最終形、permission state にはそれぞれ独立した evidence が必要です。

## ブランドでなく納品物から選ぶ

| 納品物 | 最終形の check | 典型的リスク |
|---|---|---|
| Document / PDF | pagination、目次、link、font、可読性、印刷 | reflow、font 欠落、引用・license |
| Website | browser render、responsive、interaction、empty/error、keyboard、mobile | source は正しくても UI が使えない |
| Image / video | 寸法、明瞭さ、文字、権利、caption/alt、編集性 | 事実誤り、不明 license、アクセス不能 |
| Presentation | 投影サイズ、階層、contrast、話す順、notes | overflow、低 contrast、script 不一致 |
| Spreadsheet / report | formula、filter、unit、空値、export、再計算 | 数値ずれ、denominator drift、上書き |
| Automation | schema、log、retry、idempotency、permission、rollback、出力 | 二重書込、漏えい、部分完了 |

source diff は最終形の証拠になりません。実際の形が重要なら PDF/PNG を render し、website を browser で開き、sheet を再計算し、test account で制御した flow を走らせます。階層、可読性、empty/error、accessibility、正確さ、license、編集性を確認します。

## risk 順に capability を有効化する

1. **local、read-only、低 risk:** draft、parse、static check、offline analysis。
2. **可逆な project work:** file 生成、branch の更新、公開なしの render。
3. **制御された外部接続:** test account、最小 scope、人の承認、監査可能な log。
4. **production write / public release:** 明示的 authorization、privacy / license review、preview、rollback、online verification。

上位へ進むときは、理由、新しい permission、risk、evidence、recovery plan を書きます。低い level で目的を達成できるなら、上の capability を有効にしません。

## よくある AI 利用場面を一つの納品物に結び付ける

「何でも AI にやらせる」は route になりません。ほかの人が読める、実行できる、判断できる、承認できる最終物を先に決め、最小の capability を選びます。

| 場面 | 最初の小さな納品物 | 次へ進む前の人の check |
|---|---|---|
| Writing / editing | 与えた事実だけの短い draft | 重要な claim を source と照合し、欠落を埋めずに印を付ける |
| Research / comparison | location と unknown のある claim table | source を開き、scope・日付を確認し、fact と inference を分ける |
| Web coding | local browser の見える page state 一つ | viewport、link、console、diff、failure state を見る |
| Data / spreadsheet | synthetic または許可済み fixture の再現可能な summary | schema、formula、unit、blank、denominator、recalculation を確認する |
| Image / presentation | 指定 audience 向けの rendered page / slide 一つ | hierarchy、text、contrast、事実、attribution、editability を見る |
| Document / PDF | 読む順番を持つ final-form export | render、pagination、link、selectable text、accessibility を見る |
| Browser / computer action | exact target の dry-run または draft | account、recipient、scope、side effect、human approval を確認する |
| Automation | trace / run ID のある idempotent test batch 一つ | partial、retry、permission、log、rollback を見る |
| Mobile / remote control | read-only status または draft request | device、project、account、network の範囲を確認する |

これらは application pattern であり、特定 vendor、model、Plugin、browser、mobile client が必ずその capability を持つという約束ではありません。製品の事実は日付付き adapter record にし、安定した lesson は納品物と evidence を見えるままにします。

## 場面をまたいで使える request card

```text
納品物: 最後に何が存在し、または何が決まっていればよいか。
Audience と surface: 誰が確認し、どこで動き、表示されるか。
Inputs: 許可された file、fact、source、fixture record。
Allowed capability: draft、transform、inspect、run、connect、publish のどこまでか。
Constraints: 保つ事実、除外する data、format、time、budget。
Acceptance: 他の人が再現できる三つの check。
Failure / recovery: 何を未完了とし、どう state を戻すか。
Stop: 欠けた input、permission、source、side effect のどれで止まるか。
```

まず proposal または draft を作り、不可逆な action を求めません。最初の run は local、synthetic、read-only、または reversible にします。real account、upload、send、publish、payment、delete、persistent install が必要になったら、新しい card に分けて authorization を取り直します。

## 可逆で繰り返せる自動化

```text
入力 schema と sample; sensitive field と許可用途;
transform と version; 外部 call、target、最小 permission;
timeout、retry、backoff、idempotency key; log、trace ID、error 分類;
出力 schema と validation; 部分状態、compensation、rollback;
人の承認点と停止条件。
```

「API が接続した」は接続性だけを示します。field mapping、完全性、重複、permission 範囲、下流の正しさは示しません。本番書込みの前は test account、sandbox、ローカル simulation を使い、必要なら input/output hash と batch ID を残します。

## 最初の10分：曖昧な依頼を確認できる draft にする

新しい tool を選んだり account を接続したりする前に、まずここから始めます。架空の brief と捨てられる local file を使います。例は「架空のイベント申込3件について一ページの更新を書く」です。model を立派に見せることではなく、小さな依頼を確認可能な形まで具体化できるかを見る練習です。

1. **reader**、**final form**、**提供済みの事実**、**禁止する data/action**、**合格条件**を5行で書きます。
2. 次の prompt の角括弧を自分の課題に置き換えます。

   ```text
   [reader] 向けに [final form] を作成してください。使ってよいのは次の事実だけです: [facts]。
   数字、source、名前、結果を作らないでください。情報が足りないときは [missing] と表示し、質問は一つだけにします。
   draft だけを返してください。送信、公開、login、外部 service の呼び出しはしません。
   acceptance check: [観察できる確認項目を3つ]。
   ```

3. reader として draft を開き、提供した事実、各 `[missing]`、見出しの順序、書いた acceptance check を確認します。
4. brief、prompt、output と、**passed**、**failed**、**unknown** の3行メモを残します。実データ、配布、新しい permission が必要なら止まり、それを次の decision として書きます。黙って task を広げません。

一つのきれいな draft は、prompt が常に優れていること、作業が速くなったこと、production で安全なことを示しません。次の修正と比べられる小さな evidence になるだけです。

level は、低リスクのローカル読み取り、可逆な project work、承認と log を持つ制御済み外部接続、明示的許可・privacy/license review・preview・rollback・online verification を持つ本番書込み／公開の四つです。上位に移るには新しい理由、permission、risk、evidence、回復計画が必要です。

## automation contract：action より先に data を定義する

offline の「aggregate count から一ページ report を作る」例です。synthetic JSON を読み、使い捨て directory に書くだけで、network、login、send はしません。

```text
input: report-input.json。date、category、count。count は non-negative integer。
sensitive boundary: name、email、IP、chat、token、external ID を受け取らない。
transform: category ごとに count を集計し、input/version と script version を残す。
output: report.md。time window、denominator、missing field、empty state を含める。
validation: output を read back し、total、category、hash、empty / bad input を確認する。
retry: 同じ idempotency key と read-back 可能な output のときだけ。unknown write は先に query。
stop: schema 不一致、sensitive data、directory 不明、overwrite rule 未確認。
```

exit code 0 が示すのは script が自身の定義で終了したことだけです。field mapping、label、audience、external system の状態は証明しません。

| deliverable | 開いた後に見るもの | 見落としやすい failure |
|---|---|---|
| document / PDF | hierarchy、page、link、empty、selectable text | export の崩れ |
| website | 390px / desktop、keyboard、empty / error、link | button または language の誤り |
| chart | unit、denominator、label、contrast、alt、rights | きれいでも誤解を招く |
| sheet | formula、filter、empty、unit、recalculate | formula の上書き |
| flow | schema、log、batch、key、read-back | timeout 後の二重 write |

## 練習と境界

合成 product-report context、匿名化した構造 fixture、架空の読者を使います。A は document、B は document と分析、C は render した chart、D は外部分配です。空データ、欠落 column、極端値、壊れた入力を入れます。A/B/C はローカルで、D は test account または draft endpoint だけで実施し、preview、batch ID、idempotency key、log、承認を確認して公開しません。

A–D 表、最終 render、data dictionary、validation、無効入力への応答、log、permission、retry、sandbox 状態、公開がなかった証拠を残します。模擬書込み後 timeout なら trace を保存して部分状態を照会し、非冪等操作を繰り返しません。実際の最終形の証拠と独立 review までは `candidate / not_run` です。

## 小実験：offline report flow と二つの failure

1. normal、empty、`count` 欠落、negative、extreme の synthetic input を作る。real customer/personal/production data は使わない。
2. Markdown report を作り window、total、category、empty state を確認する。PDF/PNG を render するなら final form を確認する。
3. run ごとに input hash、transform version、output path、exit status、raw log、read-back を残す。
4. write 後 timeout を模擬する。すぐ再 write せず同じ batch で partial report を読む。unknown なら `unverified` として stop。
5. missing column/bad data では block reason を示し、zero、chart、success を作らない。

email、CRM、cloud drive、website への送信は別の external write です。test account/draft endpoint、target/audience、approval、batch、withdrawal/rollback、online read-back が必要で、この exercise は許可しません。

## 自己確認

- [ ] input field、sensitive boundary、version、output、validation、retry、stop を書いた。
- [ ] final form を開き、empty/error/accessibility を script 以外で確認する。
- [ ] timeout では batch/output を query してから write を繰り返す。
- [ ] local generated、draft、sent、published、online read-back を分ける。

## 失敗と境界のケース

- **source は正しいが render が壊れる:** wrapping、overflow、font、layer、link、crop、color、print、mobile を確認します。render または live browser state が必要です。
- **美しいが事実が違う:** 数字、引用、brand claim、生成 media 内の text を source と照合します。権利不明の image、font、code、template を公開しません。
- **読めない・編集できない output:** document structure、alt text、keyboard path、contrast、caption、selectable text、editable layer、export format を確認します。
- **automation が部分成功する:** log、status query、batch ID、downstream state を確認します。idempotency key または compensation flow がある場合だけ retry し、timeout だけで failure と断定しません。
- **外部 scope が広すぎる:** scope を縮め、test account と draft endpoint を使い、公開 authorization は別に求めます。
- **validation command が止まる:** FP-10 に沿って output boundary と timeout を置き、中断後に file、process、log、final form を再確認します。
- **verification が persistent environment を変える:** FP-11 に沿って creation、installation、publication、deployment、restart、online verification を分け、各 permission と rollback を記録します。

## 転移タスク

既存の document、website、spreadsheet、image、または automation を一つ選びます。

1. reader、final format、成功 action、empty / error state、accessibility requirement を書く。
2. 一回の final-form review を行い、screenshot、export、browser / spreadsheet artifact を残す。
3. schema、sensitive field、idempotency、log、retry、validation、rollback を含む automation contract を完成させる。
4. test account または local simulation で failure input を一つ再生し、結果を `draft`、`candidate`、`verified`、`production-ready` のいずれかに分類する。

## 学習目標

final delivery と risk から capability を選び、rendered form を確認し、script の成功を complete または published delivery の証拠にしません。

## 現実の問題：source file は reader の結果ではない

Markdown、image、script が正しくても、PDF、browser、export では読めない、label が誤る、accessibility がないことがあります。開いた人が何を見て使うかを確認します。

### 準備

normal、empty、missing column、extreme の synthetic count を disposable directory に用意します。account、network、production data、external send は使いません。

### タスク

offline report を作り、sum、category、empty state、missing column error を確認します。final form を開いて check を残し、write 後 timeout なら先に partial state を read-back します。

### 証拠

input hash、transformation version、output path、log、exit status、read-back、`not sent` status を残します。artifact の生成は send、publish、audience effect の証拠ではありません。

### 振り返り

final form で初めて見えた failure は何ですか。timeout 後に安全に繰り返せない action は何ですか。

## 移行タスク

local course graphic に contract を使います。audience、fact、alt text、license boundary、visual check を定義し、external upload はしません。

## 受け入れチェックリスト

- [ ] schema、sensitive boundary、output、retry、read-back、stop を定義する。
- [ ] empty/error state を含む final form を確認する。
- [ ] local generated、draft、sent、published、online confirmed を分ける。
- [ ] capability を brand ではなく納品物と risk から選んだ。
- [ ] reader、final format、成功 action、empty state、error state を定義した。
- [ ] source / command だけでなく、rendered または running form を確認した。
- [ ] facts、license、accessibility、readability、editability を確認した。
- [ ] input schema、transform、external call、retry、idempotency、log、output validation を記録した。
- [ ] synthetic / test data、test account / sandbox、permission、batch、rollback evidence を使った。
- [ ] FP-10 / FP-11 に応じた hang、partial success、persistent change の扱いを説明できる。
- [ ] draft、connection、started command を public release や online verification と書いていない。
- [ ] final form、data check、permission、recovery boundary の具体的な artifact を示せる。

## 出典と保守の境界

final-form review と idempotency は安定した方法です。format、API、renderer、access rule は environment ごとに変わります。

- Field reports：[`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md) の FP-10、FP-11。記録は `candidate`、アクセス・整理日は 2026-08-09、local reproduction ではありません。
- External asset / license boundary：[`docs/sources/asset-register.md`](../../docs/sources/asset-register.md) の S01、S03、S06。画像、code、template、nested asset の license が不明なら reference-only とし、release にコピーしません。
- Volatile tool facts：実際に使う document、PDF、spreadsheet、browser、renderer、external-service の公式文書。work record に URL、アクセス日、version、scope を残します。

更新担当は Content and automation track maintainer です。renderer、format、browser、API、license、permission model が変わったとき、または遅くとも 2026-11-09 に review します。この章は `candidate` です。final-form、data quality、privacy、license、rollback、online evidence がそろうまで、納品を `verified` や `production-ready` とは呼びません。本章は production run を報告しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="17-marketing-track-JA.md" aria-label="前の章: 第 17 章 · マーケティング・トラック、製品理解から成長実験へ">← 前へ<br><strong>第 17 章 · マーケティング・トラック、製品理解から成長実験へ</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-JA.md" aria-label="次の章: 第 19 章 · モデルとワークフローを評価する、印象から証拠へ">次へ →<br><strong>第 19 章 · モデルとワークフローを評価する、印象から証拠へ</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
