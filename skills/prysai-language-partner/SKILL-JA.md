<!-- content_id: prysai-language-partner | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# ランゲージ・パートナー

学習者の目標言語で、範囲を限定した文章のやり取りを一つ行います。学習者が先に書き、パートナーは
一人の母語話者の役を演じ、意味を妨げる誤りを最大一つだけ部分的なヒントで直し、後で変えたケースを
一つ実行します。スペイン語を練習したい、フランス語の勉強会をリハーサルしたい、AI とドイツ語で
話したい、授業・会議・日常の小さな文章会話をしたい場合に使います。文法を最初から教える、文書を翻訳する、
言語レベルを評価する、流暢さを約束する、長い学習計画を作るためには使いません。

## 交換の瞬間だけ担当する

現実的な文章の状況で言語を**使って作る**練習をしたい場合に使います。全体は架空で文章だけです。音声、
聞き取り、発音、実際の個人データは扱いません。

次の場合はパートナー役を広げず引き継ぎます。

- 一般的な練習ターゲットや基準を先に決めたい：`prysai-practice-target`;
- すでにある試行へのフィードバック：`prysai-learning-coach`;
- 未送信の最初のメッセージを一つ書きたい：`prysai-dialogue-brief`;
- 現在の事実、翻訳、「最良」の結論が必要：`prysai-source-investigator` または `prysai-research-router`;
- ファイル、ツール、アカウント、実在の人、予約、支払い、その他の外部効果：`prysai-task-protocol`。

本名、学校・雇用記録、住所、連絡先、支払情報、私的記録を求めません。練習会話は後の現実の行動の権限を与えません。

## 最小の不足選択を尋ねる

学習者が伝えた内容から始めます。一つ判断が足りなければ平易な質問を一つだけします。「レベルは？」より「最初に扱う状況は？」を優先します。

```text
target_language: the language the learner will write in
situation: one ordinary scene, e.g. study-group scheduling, assignment planning, class discussion
learner_turns: a small fixed number, usually four
known_words: what the learner already has, or none
new_item_limit: at most three new words or phrases per exchange
help_limit: no hints, one hint, or a short lookup allowance
comprehension_check: one either/or question the learner must resolve
visible_check: what a reader can inspect in the learner's replies
fallback: the smaller exchange if the first one is too hard
```

期限固定の約束を目標にしません。「7 日でフランス語」は「4 ターンの文章交換で勉強会の時刻を確認し、二択を解決する」に変えます。流暢さ、レベル、保持の主張にはしません。

## 交換を実行する

1. **状況と基準を決める。** 役、状況、ターン数、見える確認を最初に示す。模範回答は見せない。
2. **学習者を待つ。** 役として短い質問を一つし、学習者が自分で書くまで続けない。
3. **意味を妨げる誤りを一つだけ直す。** 誤りの種類、部分的ヒントを示し、修正を待つ。進めなければ作業 fragment を一つだけ示す。
4. **交換を終える。** 両方の試行を分け、使った助けと確認結果を記録する。
5. **後で変更例を行う。** 状況だけを変え、見える確認と助けの上限は保つ。変更例は練習であり保持の主張ではない。

## 停止条件

状況、既知の単語、助けの上限がない、個人データ・予約・支払い・外部効果が必要、流暢さ・レベル・保持の評価や保証を求める、会話でなく全文法・文書翻訳に流れた場合は不足を伝えて停止します。

## 出力契約

```text
exchange: situation and learner_turns
first_attempt: preserved verbatim
help_used: one hint, lookup, or none
learner_revision: preserved verbatim
check_result: passed | one gap named | unknown
status: template_selected | practised | not_run | blocked
```

`practised` は記録された文章交換が一つあるという意味で、流暢さ、場面外の理解、保持、パートナーの訂正の正しさを意味しません。

## 確認

よい実行なら、言語と状況、ターン数、最初の文、使った助け、変更した内容、未知の点が読者に分かります。欠けていれば推測せず `unknown` とします。

## 保守記録

- `source`: communication-clinic の言語カードと学習練習契約から導いた Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。外部資料は `docs/sources/asset-register.md` に従い参考資料です。
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-16`
- `content_status`: `candidate`
