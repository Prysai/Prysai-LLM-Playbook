<!-- content_id: chapter-17-marketing-track | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第17章：マーケティング・トラック、製品理解から成長実験へ

**状態：** `candidate`。**実験：** `draft / not_run`。この章はレビュー可能なマーケティング判断を教えます。顧客、キャンペーン結果、因果関係の証明を提供するものではありません。

## 問題

製品、読者、positioning、証拠、望む行動がなければマーケティングは曖昧になります。データが何を変えるか決める前に個人データを集めたり自動公開したりすれば危険にもなります。

> まず版付きの Product Context を作り、次に仮説を立て、最小限の測定を決め、プライバシーと権限の境界内で内容や行動を準備します。

## Product Context と判断

製品と版、非目標、含む・除く読者、問題と利用状況、代替案、差別化と利用可能な証拠、異議、匿名化した顧客言語、voice、禁止表現、望む行動、channel、地域、日付、owner、review を記録します。証拠のない主張は仮説のままか削除します。

metric の前に、判断、仮説、最小質問、event と metric、denominator、sample、期間、segment、重複、欠損、遅延、consent、retention、access、停止規則、次の行動を書きます。「B の click が多い」は exposure、denominator、母集団、期間なしには意味がありません。

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

## 小実験：二つの draft、公開なし

1. synthetic context から二つの introduction を書き、audience、problem、action、missing proof を示す。
2. anonymous label と、denominator、deduplication、window、retention を持つ local aggregate count dictionary を作る。
3. 各文を fact、hypothesis、no proof に分け、最後を削除する。
4. test reader に local sample で理解した action と unknown を尋ねる。authorized feedback だけを残し market result とは言わない。
5. real channel は host、organization、account、audience、consent、batch、human approval、withdrawal を再確認する新しい action です。

## 自己確認

- [ ] writing 前に decision、single change、denominator、stop を決めた。
- [ ] descriptive count を causal、efficiency、market acceptance にしない。
- [ ] claim は fact、hypothesis、authorized feedback、削除のいずれかである。
- [ ] customer evidence がなければ testimonial、scale、adoption、urgency を作らない。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="16-engineering-track-JA.md">← 前の章<br><strong>第16章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ</strong></a></td><td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-JA.md">次へ →<br><strong>第18章 · コンテンツ、デザイン、データ、自動化トラック</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
