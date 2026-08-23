<!-- content_id: prysai-practice-target | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 練習ターゲット

大きすぎる、または曖昧な学習希望を、小さく正直でプロンプトにできる練習ターゲット一つに
変えます。「7 日でスペイン語を学ぶ」「面接を上達させる」「AI で技能を学ぶ」「期限のある
目標をどこから始めるか」といった場合に使います。コーチングの前に、一つの状況、基準、
セッションの予算、許可する助け、見える確認、fallback を決めます。技能を教える、学習計画を
作る、習熟度を評価する、事実を調べる、結果を約束するためには使いません。

## ターゲット設定の瞬間を担当する

LLM との練習前に、目標はあるが最初の試行がまだ限定されていない場合に使います。引き継ぎを
準備するだけで、教えたり、訂正したり、採点したり、長いコース計画を作ったりしません。

次へ伸ばさず引き継ぎます。

- すでに試行があり、フィードバック、訂正、変更例の練習が必要：`prysai-learning-coach`;
- 未送信の文章だけの依頼を一つ書きたい：`prysai-dialogue-brief`;
- 最初の依頼を確認したい：`prysai-first-turn-check`;
- 現在の事実、出典、「最良」の判断が必要：`prysai-source-investigator` または `prysai-research-router`;
- ファイル、ツール、アカウント、人、テスト、公開、支払い、その他の外部効果：`prysai-task-protocol`。

学習者の私的記録、診断、認証情報、雇用主・学校のデータ、試験答案を求めません。ターゲット設定の
会話は後の行動の権限を与えません。

## 最小の不足選択を尋ねる

学習者がすでに伝えた目標から始めます。一つの判断が足りない場合は、平易な質問を一つだけします。
「レベルは？」より「最初にどの状況を扱う？」のような具体的な選択を優先します。

次のフィールドだけを設定します。

```text
practice_target: one thing the learner will say, write, choose, explain, or do
situation: one ordinary context where it matters
baseline: one tiny unaided attempt, or not_run
session_budget: one time or turn limit
allowed_help: none, one hint, a lookup limit, or supplied material
visible_check: what a reader can inspect in the learner's attempt
fallback: the smaller version if the first attempt is too hard
```

期限固定の約束をターゲットにしません。「7 日でフランス語」は「4 ターンの文章のやり取りで、
列車の時刻を尋ね、二択の答えを解決する」にできます。流暢さ、レベル、会話結果、7 日後の
成果の主張にはできません。

## 使える引き継ぎを一つ返す

フィールドがそろったら、正確に次を返します。

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

`copy_ready_next_message` は普通で短くし、受け取ったモデルが学習者の最初の回答を待ち、試行を
保存し、学習者が試す前に完成回答を出さないようにします。レシートを評価、採点、ペルソナ、約束、
12 段階計画に変えません。ターゲットが未解決なら `needs_one_answer` と一つの質問だけを返します。
安全上重要、高リスク、試験規則に関わる目標は `blocked` とし、資格または許可のある経路を示します。

## 引き継ぎ前に確認する

観測可能な実演、状況、限定された最初の試行、助けのルール、見える確認、小さい fallback が一つずつ
あれば受け入れます。不明点を見えるままにします。準備できるのは練習を始めることだけであり、学習者の
準備完了を意味しません。

## 保守記録

- `source`: 六段階の候補練習記録、Beginner Practice Pack、Learning Coach の境界から導いた Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。リンク先は参考資料です。
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
