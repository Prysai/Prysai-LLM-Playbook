<!-- content_id: chapter-17-marketing-track | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第17章：マーケティング・トラック、製品理解から成長実験へ

**状態：** `candidate`。**実験：** `draft / not_run`。この章はレビュー可能なマーケティング判断を教えます。顧客、キャンペーン結果、因果関係の証明を提供するものではありません。

## この章が解決する問題

製品、読者、positioning、証拠、望む行動がなければマーケティングは曖昧になります。データが何を変えるか決める前に個人データを集めたり自動公開したりすれば危険にもなります。

> まず版付きの Product Context を作り、次に仮説を立て、最小限の測定を決め、プライバシーと権限の境界内で内容や行動を準備します。

## 学習目標

この章を読み終えると、次のことができるようになります。

- 製品、読者、問題、代替案、差別化、異議、顧客の言葉、voice、証拠、望む行動を含む Product Context を作る。
- 一つの判断から、最小限の event、metric、denominator、sample、期間、命名規則、停止規則を導く。
- sample bias、過剰な attribution、選択的な報告、privacy risk、マーケティング上の不確実性を見つける。
- 個人データを公開せず、platform の権限を迂回せず、Skill と一緒に成長実験を設計する。

## 現実の入口：identity、organization、data には context が要る

- **FP-03:** Enterprise 専用の利用者が、対象の入口は Enterprise host なのに `github.com` で調べられたという報告です。既定の host や既定の audience を、利用者の事実として扱わないための教材になります。
- **FP-04:** 同じ利用者が二つの organization にアクセスできる状況で、connector が一つ目の organization に再利用されたという報告です。account に入れることと、特定 organization のデータを今回の実験に使ってよいことは別です。

どちらも field study の利用者報告で、公式確認でも local reproduction でもありません。ここでは identity、organization、installation scope、許可された data use を分ける練習に使い、connector の普遍的な挙動とは書きません。

## Product Context と判断

製品と版、非目標、含む・除く読者、問題と利用状況、代替案、差別化と利用可能な証拠、異議、匿名化した顧客言語、voice、禁止表現、望む行動、channel、地域、日付、owner、review を記録します。証拠のない主張は仮説のままか削除します。

Product Context は一回限りの prompt より、仮定を見える形で共有・review できる版付き asset です。最低限、次を残します。

```text
Product と version、明示した non-goals:
Target audience と除外する audience:
Core problem と利用状況:
代替案と切り替えコスト:
差別化 claim と利用可能な proof:
よくある異議と匿名化した顧客の言葉:
Brand voice、禁止表現、compliance の境界:
望む action とその前提条件:
Channel、region、language、time range:
Version、変更理由、owner、review date:
```

### Synthetic Product Context：顧客記録ではない練習用 fixture

この章では、練習専用の合成 Product Context を使います。実在企業、顧客、在庫、audience 規模、価格、conversion rate、testimonial、campaign result を表しません。

```yaml
context_id: synthetic-product-context-v1
product: "小さな project team 向けの local planning workspace"
audience: "共有 task list で小規模 project を調整する人"
non_goals: ["market share の主張なし", "customer outcome の主張なし"]
problem: "会議と task update の間で決定事項を見失う"
alternative: "共有 document と手動の reminder"
proof: "customer proof は未提供。product claim は仮説のまま"
objections: ["初期設定の手間", "data access", "保守する tool が増える"]
desired_action: "local sample workspace を読む"
data_boundary: "synthetic records only; name、email、IP、external ID なし"
status: candidate
```

この fixture の目的は context の欄と evidence boundary を示すことです。証拠のない claim を作る許可ではありません。仮説として弱めるか削除します。

metric の前に、判断、仮説、最小質問、event と metric、denominator、sample、期間、segment、重複、欠損、遅延、consent、retention、access、停止規則、次の行動を書きます。「B の click が多い」は exposure、denominator、母集団、期間なしには意味がありません。

```text
決めること:
主要な仮説:
答えが必要な最小の質問:
Metric の定義と event 名:
Denominator、sample、期間、segment:
重複除去、欠損、遅延の扱い:
Consent、privacy、retention、access control:
停止規則と次の action:
```

| 能力グループ | 出力 | 境界 |
|---|---|---|
| Product Context | context と claim register | 事実、仮説、owner、review |
| Positioning | 読者と異議に結ぶ variants | 証拠、voice、禁止主張 |
| Experiment | 仮説、exposure、停止規則 | sample、denominator、consent |
| Distribution | 下書きまたは sandbox batch | channel、承認、rollback |
| Measurement | 集計 report と限界 | event schema、品質、因果の限界 |

## プライバシー、帰属、権限

Agent は context を整理し、variant を書き、event 名を確認し、記述統計を示せます。しかし因果を推測したり sample bias を隠したり、広告、CRM、メール、SNS に別の許可なく公開したりはできません。外部書き込みには test account または sandbox、人の承認、batch ID、取り消しまたは rollback が要ります。

名前、完全な email・IP、私的会話、横断 identifier を初期入力にしません。集計、匿名化、短い retention、限定 access を優先します。重複、欠損、time zone、遅延、bot、denominator drift を確認します。きれいな chart は弱いデータを証拠にしません。

account への access も、特定 organization のデータ利用許可ではありません。外部実験ごとに host、organization、installation、読者、範囲を確認します。

### Agent は判断を補助するが、attribution を所有しない

Agent は Product Context を整理し、variant を書き、event 名を点検し、記述統計を計算し、次の実験を提案できます。しかし、copy の差だけから因果を推定したり、chart に sample bias を隠したり、広告、CRM、email、SNS に別途承認なしで公開したりはできません。外部 write には test account または sandbox、人の承認、batch ID、取り消しまたは rollback の経路が必要です。

## 練習と境界

三つの異議だけを持つ合成製品、testimonial・在庫・成果なし、件数だけのローカル表を使います。「魅力的な紹介を書いて」と、context、不足する証拠、望む行動、仮説、metric、denominator、sample、次の判断を渡す依頼を比べます。根拠のない主張を印付け、二 variant を作っても勝者や因果を宣言しません。

依頼、context の版、variant、仮説表、metric、sample 注記、匿名化した data dictionary、privacy 判断、次の判断を残します。許可されたデータ、品質 review、人の review がそろうまで、練習は `candidate / not_run` です。

## content draft から測れる decision へ：experiment card

先に「この data はどの decision を変えるか」を聞きます。synthetic local page の例です。

```text
decision: 「引継ぎの漏れを減らす」表現を続けるか、setup cost の説明に戻すか。
hypothesis: 同じ audience と位置なら、引継ぎ問題を明確にすると sample を見たい行動が増える。
single change: title と first paragraph。price、channel、audience、CTA は変えない。
metric: sample request / deduplicated exposure。
scope: synthetic または authorized aggregate count、short window。名前、full email、IP、chat は集めない。
stop: sample が小さい、variant が混ざる、event がない、consent または destination が不明。
next: 差と限界を記述するだけで causal/winner を言わない。
```

| 種類 | 書ける形 | 書いてはいけない形 |
|---|---|---|
| confirmed fact | 「この練習は local synthetic task を使う」 | 「多くの team が採用済み」 |
| hypothesis | 「より理解しやすいか確認中」 | 「すでに efficiency を上げた」 |
| audience voice | 許可、匿名化、追跡可能な短文 | 作り物の testimonial |
| no proof | 削除または仮説と明記 | 「業界一」「最も人気」 |

## Product experiment と programming practice は同じ evidence loop

LLM は idea を小さな prototype に変える支援ができますが、prototype は product ではなく、整った landing page は demand の証拠ではありません。次の loop を、programming の練習と初期 product experiment の両方に使います。

```text
問題に気づく → user と context を説明する → 最小の testable slice
→ learner / user が試す → output と friction を記録する
→ 仮説を一つ変える → 次の判断または停止
```

programming practice では、function の説明、見える state の一つの変更、focused test 一つ、既知の failure の修理など、学習者が自分で inspect できる task から始めます。full solution の前に結果を予想させ、最初の試行を保存し、変更した input を一つ再試行します。モデルは説明、質問、短い hint を出せますが、学習者が変更できたという evidence を黙って置き換えません。

product experiment では、pitch の前に decision を書きます。

```text
Problem: 誰のどの繰り返し状況が痛く、今は何をしているか。
Smallest promise: prototype が見せられる outcome は一つ何か。
Prototype: 検証に必要な最小 page、workflow、manual service。
Signal: 次の decision を変える観測可能な action。
Alternative explanation: 同じ signal を生む別の理由は何か。
Cost and boundary: 時間、data、permission、rights、連絡してよい相手。
Stop rule: delete、修正、pause のどれにする条件か。
```

「demo が好評だった」「page に click があった」「model が app を生成した」は、denominator、comparison、audience、期間、review record のある観測に過ぎません。支払い意向、product-market fit、継続収益、学習成果を証明しません。収益化は、paid pilot、subscription、one-time purchase、service など、許可された交換についての仮説です。料金を受け取る前に、offer、refund、support、tax、privacy、rights、delivery capacity を適切な owner と確認します。

短い experiment receipt に、版付きの problem statement、prototype / script、audience と recruitment の境界、観測 action、除外、cost、異議、decision、unknown を残します。evidence が生成 mockup または採点されていない model response だけなら、結論を `candidate` に保ち、claim を大きくする代わりに小さな test を選びます。

## 具体的な evidence table

| Evidence | 具体的な artifact | 支えること | 支えないこと |
|---|---|---|---|
| Product Context | `synthetic-product-context-v1` と変更理由・owner | exercise が使った audience と claim | 実在顧客や成果 |
| Claim register | `fact`、`hypothesis`、`unverified`、`not applicable` の行 | statement の evidence status | `unverified` claim の証明 |
| Measurement plan | metric、denominator、window、sample、stop rule | measurement が再現可能か | それだけで有意差や因果 |
| Data dictionary | aggregate field、retention、access、missing-data rule | analysis に入った data | 追加の個人情報を集める権限 |
| Variant record | input、output、reviewer、version | 何を比較したか | variant が outcome を起こしたこと |
| Distribution record | sandbox / draft、batch ID、approval、rollback | controlled action を準備したこと | 公開送信が行われたこと |

## 小実験：二つの draft、公開なし

### 準備

上の synthetic Product Context、redacted product description、三つの synthetic objection、testimonial・在庫・performance number がない状態を用意します。名前、email、完全な IP、device identifier、cross-platform ID を含まない local aggregate table を作り、短い期間と二つの content variant を決めます。実行済みとは言いません。

### タスク

1. request A「この product の魅力的な紹介を書いて」を渡し、出力を保存します。
2. request B に versioned context、audience、objection、missing proof、desired action、measurement plan を入れ、二つの variant、hypothesis、primary metric、denominator、sample limitation、next decision を求めます。
3. A と B を specificity、audience fit、evidence status、actionability で比べ、unsupported claim に印を付けます。
4. event 名、重複除去、欠損、window、privacy boundary を点検します。実 channel への upload や call は行いません。
5. aggregate sample を使う場合は descriptive fixture とだけ書き、sample が小さいときに winner や causal effect を宣言しません。

### 証拠

両方の request、context version、生成した variant、hypothesis table、metric 定義、denominator / sample note、de-identified data dictionary、privacy decision、data-quality check、次の decision を残します。各文を product fact、marketing hypothesis、unverified claim のいずれかに分類します。

### 失敗変形

Enterprise host だけが許可されているのに、default host が `github.com` の simulated channel を渡します。次に、二つの organization の aggregate data を渡しますが、許可されているのは一つだけにします。Agent が default host や既存 account access を authorization とみなさないかを確認します。正しい対応は pause、host・organization・scope の確認、最小の synthetic / permitted data の使用です。さらに小さな sample に大きな差を入れ、sample limitation と observational な性質を明記できるかを見ます。

### 振り返り

- どの欄が request B を A より具体的にしましたか。
- どの metric が次の decision を本当に変えますか。
- 答えを失わずに aggregate または削除できる欄はどれですか。
- FP-03 と FP-04 は host、organization、audience、data access の前提をどう変えますか。

## 自己確認

- [ ] writing 前に decision、single change、denominator、stop を決めた。
- [ ] descriptive count を causal、efficiency、market acceptance にしない。
- [ ] claim は fact、hypothesis、authorized feedback、削除のいずれかである。
- [ ] customer evidence がなければ testimonial、scale、adoption、urgency を作らない。

## 失敗と境界のケース

- **proof や customer language を作る:** 根拠のない testimonial、顧客数、「market leader」は hypothesis にするか削除します。
- **小さい sample で winner を宣言する:** sample size、denominator、期間、segment、missing data を残し、directional signal として扱うか継続します。
- **correlation を causation と書く:** title、channel、price、audience が同時に変わったら、単一の variable に帰属させません。
- **platform permission が違う:** host、organization、installation scope、experiment authorization を preflight にします。cached connector や default account は現在の承認ではありません。
- **privacy を広げすぎる:** personal information、sensitive attribute、private conversation、同意のない contact、cross-context identifier を既定入力にしません。最小化、集計、access control、retention limit を使います。
- **recovery なしに publish する:** email、広告、CRM、SNS、tracking の変更には draft / sandbox、human approval、batch ID、withdrawal / rollback が要ります。
- **きれいな chart が弱い data を隠す:** duplicate、time zone、delay、bot、denominator drift、missing value、channel selection を確認します。chart 自体は evidence ではありません。

## 転移タスク

実際の marketing decision を一つ選びますが、使うのは redacted または aggregate data だけにします。

1. 一ページの Product Context を作り、fact、hypothesis、proof が必要な claim を分ける。
2. 変わり得る decision を一つ選び、最小 measurement plan と stop rule を設計する。
3. 各 field に privacy の理由、access scope、retention、削除方法を書く。
4. host、organization、publish authorization を試す sandbox と failure variant を設計する。

## 移行タスク

course の start page に card を適用します。最初の safe action の local description を二つ作ります。popularity や result は主張せず、指定した一人が next step を理解するかだけを確認します。

## 受け入れチェックリスト

- [ ] decision、一つの change、denominator、limit、stop を記録する。
- [ ] fact、hypothesis、evidence なしを分ける。
- [ ] 新しい明示的な authorization なしに publish や personal data の収集をしない。
- [ ] owner、変更理由、review date を持つ versioned Product Context がある。
- [ ] product fact、marketing hypothesis、customer evidence、unverified claim を分ける。
- [ ] decision から最小 metric、denominator、sample、window、stop rule を導ける。
- [ ] duplicate、missing、delay、time zone、bot、selection bias を必要に応じて点検した。
- [ ] correlation を causation にせず、小さい sample の stable winner を宣言していない。
- [ ] minimization、de-identification / aggregation、access control、retention limit を使った。
- [ ] FP-03 / FP-04 の host、organization、connector、experiment authorization の違いを説明できる。
- [ ] 各 material claim に対応する具体的な evidence artifact を指せる。

## 出典と保守の境界

decision と evidence の境界は安定しています。channel、consent、measurement、product data は変わるため、現在の具体的な review が必要です。

- 現実の問題：[`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md) の FP-03、FP-04。記録状態は `candidate`、アクセス・整理日は 2026-08-09、owner は Prysai LLM Playbook maintenance group です。local reproduction ではありません。
- Marketing-method reference：[`docs/sources/asset-register.md`](../../docs/sources/asset-register.md) の S04。この章は decision と evidence の独自統合であり、外部の marketing Skill 本文はコピーしていません。
- 変動する platform / privacy facts：該当 platform の公式 developer、privacy、organization policy、current configuration。experiment record に URL、アクセス日、region、data owner、retention policy を残します。

更新担当は Marketing-track maintainer です。positioning、channel、permission、privacy policy、event schema、attribution method が変わったとき、または遅くとも 2026-11-09 に review します。この章は `candidate` です。マーケティングの結論を `verified` と呼ぶには、data quality、privacy、human review の根拠が必要です。この章は customer、inventory、conversion rate、campaign result を提供しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="16-engineering-track-JA.md" aria-label="前の章: 第 16 章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ">← 前へ<br><strong>第 16 章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-JA.md" aria-label="次の章: 第 18 章 · コンテンツ、デザイン、データ、自動化トラック">次へ →<br><strong>第 18 章 · コンテンツ、デザイン、データ、自動化トラック</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
