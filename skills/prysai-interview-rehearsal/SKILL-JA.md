<!-- content_id: prysai-interview-rehearsal | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 面接リハーサル

一つの観測可能な面接回答を時間内で練習します。候補者が先に答え、コーチが部分的なヒントで
重要な不足を一つ示し、候補者が修正し、最後に変えた質問へ助けなしで答えます。「面接の準備を
したい」「自分のプロジェクトを説明する答えを練習したい」「面接で話が長くなる」と言う場合に
使います。履歴書、模範回答、予想質問、候補者の評価、採用結果の約束には使いません。

## リハーサルの瞬間を担当する

自分の経験について**話す回答**を練習したいときに使います。回答は安全な範囲に保ち、架空または
公開されたプロジェクトの事実だけにします。私的記録、雇用主の機密、認証情報は含めません。

次の場合は広げず引き継ぎます。

- 最初の連絡文やアウトリーチを作る：`prysai-dialogue-brief`;
- 一般的な練習ターゲットや基準を先に決める：`prysai-practice-target`;
- 現在の事実、給与データ、「最良」の結論が必要：`prysai-source-investigator` または `prysai-research-router`;
- ファイル、ツール、アカウント、実際の応募、外部効果：`prysai-task-protocol`。

私的記録、診断、雇用主や学校のデータ、試験答案を求めません。リハーサルは実際の応募の権限を与えません。

## 最小の不足選択を尋ねる

候補者が練習したい質問から始めます。一つ判断が足りなければ「どの質問から？」「答えは何秒？」と平易な質問を一つだけします。

```text
question: the exact interview question to answer
situation: the role or context where the question matters, or not_run
answer_time: one time limit, usually 60-120 seconds
allowed_notes: none, one keyword list, or supplied material
visible_check: what a reader can inspect in the answer (structure, one example, one number, one decision and its reason)
fallback: the smaller question if the first is too hard
```

約束を目標にしません。「面接に必ず受かる」は「90 秒で、具体例一つ、判断一つ、結果一つを含む、対立に対処した経験の回答をする」に変えます。内定、能力、質問の予測にはしません。

## リハーサルを行う

1. **回答前に確認を示す。** 質問、時間、許可されたメモ、見える確認を告げ、模範回答は見せない。
2. **候補者を待つ。** 自分の言葉で先に答えてもらう。
3. **重要な不足を一つだけ示す。** 見える確認との関係で、例、判断、結果の不足、構造の不明瞭さのうち一つを選ぶ。書き直した答えは出さず部分ヒントだけを与える。
4. **修正させる。** 同じ確認と時間で修正回答を求める。
5. **変更した質問を一つ行う。** 同じ基礎状況を使う未見の質問を、同じ確認とヒントなしで尋ねる。

## 停止条件

質問、時間、見える確認がない、私的記録・雇用主の機密・認証情報が必要、回答を書いてほしい・現実の競争相手と採点してほしい・結果を保証してほしい、履歴書・求人探し・給与助言に流れた場合は不足を伝えて停止します。

## 出力契約

```text
question: the rehearsed question
answer_time: the limit used
first_answer: preserved verbatim
gap: one named gap or none
cue: one partial cue given
revision: preserved verbatim
changed_question: the unseen variation
status: template_selected | practised | demonstrated_on_this_task | not_run | blocked
```

`practised` は回答の記録が一つあること、`demonstrated_on_this_task` は候補者自身の修正が固定確認を通過したことを意味します。どちらも就職準備、面接成功、一般的な能力を意味しません。

## 確認

質問、確認、最初の回答、示した一つの不足、候補者の変更、変更質問への助けなしの回答が読者に分かればよい実行です。欠ければ `unknown` とします。

## 保守記録

- `source`: 話す回答に適用した practice-target と learning-coach 契約から導いた Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。外部資料は `docs/sources/asset-register.md` に従い参考資料です。
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-16`
- `content_status`: `candidate`
