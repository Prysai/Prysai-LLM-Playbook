<!-- content_id: prysai-dialogue-brief | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# 対話ブリーフ

まだ試していない低リスクの依頼を、短く、そのままコピーして送れる最初のメッセージにまとめます。この Skill は、本格的な回答やツール操作、調査、学習サイクルが始まる前の整理を担当します。依頼を実行したり、回答の良し悪しを判定したりはしません。

## まず、使う場面かを確認する

次の条件をすべて満たすときだけ使います。

- 依頼をまだ送っておらず、直すべき失敗回答もない。
- 文章だけで完結する、低リスクの最初の会話である。
- ファイル、ツール、アカウント、ブラウジング、私的な記録、公開、外部操作を必要としない。
- 範囲を絞った依頼の言い方を整えたいのであって、技能の練習や事実調査をしたいわけではない。

学習者が基準値、フィードバック、訂正、転移練習を求めているなら `prysai-learning-coach` に渡します。Codex、ツール、Skill、Agent の話なら `prysai-codex-coach` に渡します。ファイル、権限、アカウント、外部操作、実際の納品先が関わるなら `prysai-task-protocol` に渡します。最新の事実、出典、根拠のある結論が必要なら `prysai-source-investigator` または `prysai-research-router` に渡します。元の依頼と不満のある回答がすでにあるなら `prysai-communication-failure-triage`、既存の主張に根拠があるか確かめるなら `prysai-evidence-review` を使います。

秘密、センシティブな個人情報、未公開の記録、認証情報、アカウントの状態、非公開のプロンプトは求めません。ブリーフを作ることは、その後の行動を許可することではありません。

## 最初の一往復に必要な情報だけ集める

できるだけ利用者の言葉を残し、次の項目を集めます。

```text
outcome: 最初の返答で得たい、観察可能な結果を1つ
audience: 結果を使う人、読む人
supplied_inputs: この一往復で安全に使える文章や事実
constraints: 残す事実、制限、語調、除外、支援上のルール
output_shape: 求める形式と長さ
acceptance_check: 受け入れる前に確認すること
stop_boundary: 起こしてはいけないこと、または不足すると停止する事実
```

不足している項目が結果を大きく変えるなら、下の形式の `needs_clarification` レシートと平易な確認質問を1つだけ返します。途中までのブリーフを書いたり、利用者像を作ったり、未知の事実をもっともらしく補ったり、詳しく見せるために質問を何個も重ねたりしません。1回の確認後も観察可能な結果を定められないなら、`blocked: outcome_not_observable` として、最小限必要な決定を示します。

## 最初のメッセージを作る

120〜180語のブリーフを示し、その後にコピーして送れる最初のメッセージを示します。範囲は一往復に限ります。直接的で普通の言葉を使い、役割演技、感情的な圧力、隠れた推論の要求、性能の約束、「役に立つように」などの空疎な文句は加えません。

コピー用メッセージには、次の要素を自然な文章でラベル付きにして含めます。

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

回答に必要な事実が提供されていなければ、受け取るモデルに `unknown` と明示させ、推測で埋めないよう求めます。出典が必要なら、出典の計画を求めるか停止します。根拠のない断定的な回答は求めません。

## 短いレシートを返す

重要な項目が足りない場合は、次をそのまま返します。

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

項目がそろったら、次をそのまま返します。

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

提示された事実を保ち、観察可能な確認を1つ含み、行動やデータの範囲を勝手に広げず、最初の一往復を越える作業の行き先を示している場合だけ受け入れます。`ready_to_copy` はブリーフが用意できたことだけを示し、モデルの動作、回答品質、学習成果、事実の正確さ、利用者の満足、タスク完了を証明しません。

## メンテナンス記録

- `source`: communication-clinic、task、evidence、routing の契約をもとにした Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。外部資料は `docs/sources/asset-register.md` の参考情報に限る
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
