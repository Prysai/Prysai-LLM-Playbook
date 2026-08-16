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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="16-engineering-track-JA.md">← 前の章<br><strong>第16章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ</strong></a></td><td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-JA.md">次へ →<br><strong>第18章 · コンテンツ、デザイン、データ、自動化トラック</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
