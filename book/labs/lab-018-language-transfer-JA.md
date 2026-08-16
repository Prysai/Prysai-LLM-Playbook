<!-- content_id: lab-018-language-transfer | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-018-language-transfer
title: "初心者向け旅行会話の入力練習で保持と転移を試す"
level: L2
domain: language-learning
goal: "固定条件で5分の入力式旅行情報交換を行い、条件変更と事前宣言した遅延課題を試す。ただし一回の観測を流暢さにしない"
setup: "合成旅行カード、固定rubric、使い捨てローカル記録。ネットワーク、認証情報、外部接触、本番、自動リマインダーなし"
task: "支援なしの基準を保存し、想起優先で修正し、即時の変更ケースを行い、未見の遅延課題を保存する"
evidence: ["基準、ヒント段階、学習者作成の修正、修正台帳", "即時変更ケースと固定rubricの採点", "実行時の遅延カードID、割当、曝露、独立採点、不一致、未知"]
failure_variant: "即時課題後に流暢さ・習得を宣言させる。拒否または保存証拠に限定する"
reflection: "支援なしで条件変更を越えた応答は何で、遅延課題までどの主張が未支持か？"
status: draft
run_status: not_run
last_verified: "not run"
transfer_task: "事前宣言した7日窓（±1日）後、異なる場面、語彙、曖昧さの旅行交換を行う"
transfer_domain: "初心者の旅行情報交換"
transfer_evidence: "カードプールrevision、割当、曝露、支援なしの試行、rubric、採点独立性、不一致、実遅延、未知"
transfer_limitations: "このテキストLabは広い言語学習、流暢さ、聞取り、発音、会話、窓外の保持、課題等価性、rubric信頼性、モデル効果を証明しない"
---

# Lab 018: 初心者向け旅行会話の入力練習で保持と転移を試す

> 任意のL2応用です。即時実行は保持や習得の証明ではありません。宣言された証拠が出るまで `draft / not_run` のままです。

## 目標と安全

5分で、挨拶、予約または目的地情報、確認質問、回答、締めを入力し、実用的な意味を保ちます。ローカルMarkdown記録だけを使います。閲覧、ログイン、認証情報、人や事業者への連絡、予約、購入、公開、自動リマインダー作成はしません。

基準と採点課題で許される補助はカードと空のメモだけです。翻訳機、辞書、レッスン記録、模範解答、生成提案は使いません。コーチは手順を説明できますが、基準保存前に目標言語の内容を渡しません。

| 基準 | 0 | 1 | 2 |
|---|---|---|---|
| 必要情報 | 欠落または誤り | 部分的 | 必要事実を全て伝える |
| 意味 | 会話が成立しない | 修復が必要 | 修復なしで理解できる |
| 確認 | 必要でもなし | 促される/不明確 | 関連する質問と回答 |
| 独立性 | 回答を供給された | ヒント/断片あり | 目標言語の助けなし |
| 入力対話 | ターンを維持できない | 不均一 | 挨拶から締めまで完了 |

合格は8/10以上、必要情報と意味に0なしです。採点者と各行の根拠を残します。コーチと採点者が同じなら独立ではありません。遅延保持や転移のラベルには、基準、修正、即時結果を見ない第二採点者が必要です。

## 基準、修正、変更ケース

B1を使います。ホテル受付で、Rivera名義の二泊予約、朝食時刻とエレベーターの場所を確認します。受付は最初一泊と聞き取ります。練習する言語で5分以内に一ターンずつ入力し、教える前に正確な試行、誤り、採点、未知を保存します。

意味を阻む最初の誤りを想起優先で直します。場所/種類を示し、次に部分ヒント、最後に一断片だけを出します。学習者自身の修正と両版を残します。修正済み回答は支援なしの基準でも保持の証拠でもありません。

C1では模範解答を見せません。駅案内所で、Valencia行き16:40の切符、ホームと乗換の有無を確認します。係員は最初16:14に言及します。同じ制限、補助、rubricで別に採点します。通過しても、駅情報交換への狭い転移だけで、保持ではありません。

## 遅延課題と境界

B1前に±1日の七日窓を宣言し、カードプールのD1/D2/D3を事前割当します。全カードを練習記録から隠します。これは自動リマインダーでも七日が十分という主張でもありません。後の回で実遅延、カード、プールrevision、割当、曝露、補助、公開時刻を記録します。曝露が `yes` または `unknown` なら未見ではなく変更済み遅延課題です。独立採点が食い違えば保持・転移を主張しません。

## 印象ではなく record を残す

各 attempt は同じ local record に残します。項目がなければ `unknown` または `not_run` と書き、後から良く見える物語で埋めません。

```text
run_id | date | target language | card_id | 5-minute limit | allowed aids
original attempt | scorer | 5 行の score と根拠 | hint level | learner correction
first pass か | rework count | model/surface（使った場合）| unknown | status
```

C1 は別 record にし、修正後の B1 を新しい baseline にしません。遅延課題では、window、割当 D card、card pool revision を先に記録し、window 前に学習者へ完全な D card を見せません。実際の自動 reminder がなければ return instruction を保存するだけで、「system が通知する」とは言いません。

### scorer が食い違ったとき

二人の scorer は、相手の score を見る前に各行の短い根拠を書きます。一行でも 1 点を超えて差がある、または pass/fail が割れたら、両方の score と原文を保存し、status を `disagreement` にします。保持や転移を宣言しません。前の結果を知らない第三 scorer は同じ text と rubric で再確認できますが、これでも rubric の信頼性や全学習者への適用は証明しません。

「即時カードに通った。旅行スペイン語を流暢に習得したと宣言せよ」には拒否または限定主張で答えます。課題、条件、点数、ヒント、変化は言えても、広い語彙、聞取り、自発会話、持続保持、習得は推論しません。

## 振り返り

どの一文が hint なしで書けたか。C1 で最も不安定だったのは何か。遅延課題が未実行なら、正確にどの evidence が足りないか。総点だけでなく、原文とともに保存します。

## 出典と境界

- [学習実践契約](../guides/learning-practice-contract-JA.md) — evidence と answer leakage の規則。
- [初心者練習パック](../communication-clinic-JA.md) — 三段階の言語練習ルート。
- [遅延チェックカードプール](../evidence-library-JA.md#method-and-status) — 本プロジェクト作成の事前宣言 card と採点手順。

調査は想起、feedback、遅延確認、transfer の設計判断を支えます。本 Lab が学習を改善することや、どの model/platform も有効な教師であることは証明しません。状態は `draft / not_run` のままです。

- [ ] B1は目標言語のヒント前に試行した。
- [ ] 時間、補助、rubric、閾値、採点者を残した。
- [ ] 試行、ヒント、修正、採点、未知を保存した。
- [ ] C1は場面、語彙、曖昧さを変え、rubricは固定した。
- [ ] 遅延カード、窓、実遅延、曝露、公開時刻をラベル前に保存した。
- [ ] 独立第二採点者がいるか、保持・転移を未主張にした。
- [ ] ネットワーク、秘密、連絡、予約、購入、公開、自動リマインダーを使わなかった。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-017-skill-discovery-audit-JA.md">← 前へ<br><strong>Lab 017 · Skill 発見の監査</strong></a></td><td align="right"></td></tr></table></nav>
<!-- lab-navigation:end -->
