<!-- content_id: universal-first-turn-prompt-contract-2026-08-13 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: universal-first-turn-prompt-contract-2026-08-13.md | source_revision: 2026-08-23 -->

# 汎用ファーストターン・プロンプト契約：境界を決めた初心者向け記録

**記録日：** 2026-08-13  
**資料確認日：** 2026-08-13（America/Los_Angeles）  
**状態：** candidate の調査記録。プロンプトの実行、モデル比較、学習者・出典品質・保持・転移・独立評価は行っていない。  
**担当：** curriculum-maintainer  
**次回確認：** 2026-09-13。特定製品への適用、研究利用、利用者の成果の証拠として提示する場合は、それより前に確認する。

## 範囲と問い

この記録は、初心者向けに二つの小さなオリジナルの最初のメッセージ用カードを
提案する。一つは 5 分のスペイン語練習、もう一つは 5 分の調査の切り分けである。
特定製品の文法、ツール名、アカウント設定、モデル名、隠れた指示層には依存しない。

**問い：** 複数の LLM 製品で読者が同じ項目を理解でき、かつ製品、アカウント、
ツール、出力が同等だと主張しないためには、最初のメッセージに何を含めるべきか。

ここでいう「汎用」は、製品を替えても普通の言葉で同じ項目を表せる、という意味に
限る。OpenAI、Anthropic、Google、Microsoft、Meta が同じモデル、機能、ツール、
コンテキスト処理、データ管理、価格、可用性、権限、応答、安全動作を提供する、
という意味ではない。実際に使う製品と画面の最新資料を確認する必要がある。

カードの範囲は意図的に狭い。アカウントへのアクセス、閲覧、音声、アップロード、
連絡、購入、公開、コード実行、健康・法律・金融・雇用・教育配置の判断を求めない。
適用されるデータ管理と権限を理解する前に、私的な記録、資格情報、個人識別情報、
機密研究資料を貼り付けてはならない。

## 証拠の種類と主張の境界

| 種類 | この記録での使い方 | それで証明できないこと |
| --- | --- | --- |
| `official fact` | 製品所有者が自社製品の範囲で公開したプロンプト指針 | 製品間の同等性、出力の正しさ、教育効果 |
| `public user report` | 日付のある一人の必要や困りごとの報告 | 普遍性、現在の製品事実、原因、検証済みの解決策 |
| `community suggestion` | この記録には残していない | 公式指針や効果の証拠 |
| `local reproduction` | なし。`not_run` | どの製品での挙動、利用者の結果 |
| `project inference` | 意図、制限、記録を見えるようにする保守的なカード設計 | 適切な評価なしにカードが有効だということ |

`not_run` は状態であって証拠ではない。完了時間、モデル挙動、品質スコア、学習者の
反応、言語評価、引用確認、転移結果を観察していないことを表す。

## 公式ガイド：製品ごとに分け、混ぜない

以下の 5 ページは別々の組織が管理し、それぞれの製品範囲に限られる。OpenAI は
指示・文脈・例・プロンプト評価、Anthropic は最適化前の成功条件と経験的テスト、
Google は明確で具体的な指示と例、Microsoft は指示・主要コンテンツ・例、Meta は
Llama のプロンプトガイドを扱う。

これは一つのベンチマークではなく、5 つの独立した公式事実である。そこから導ける
狭い**プロジェクト推論**は、初心者の最初の依頼でタスク、利用可能な文脈、欲しい
応答、制限、停止または確認条件を明示することだ。これらの項目が必要・十分・最適、
製品間で安定、語学や研究に有効だとは示していない。

## 日付を付けた公開シグナル

次の二つは、あり得る初心者のニーズを見えるようにするためだけに残す。教材として
転載せず、製品事実としても扱わない。

| ID | 公開報告 | 残す狭いシグナル | 厳密な境界 |
| --- | --- | --- | --- |
| U1 | OpenAI Community [*Learn languages at the same time*][U1]（2024-12-03 投稿、2026-08-13 確認） | 一人の作者が長い語学練習を望み、利用制限を感じたと述べた | 一人の目標と認識した制約だけ。現在の上限、需要、学習効果の証拠ではない |
| U2 | OpenAI Community [*Long instruction prompt on short input data*][U2]（2024-06-24 投稿、2026-08-13 確認） | 長い指示と少しだけ変わる入力を繰り返し送り、別の対話方法を尋ねた | 一つのワークフロー上の懸念だけ。全製品の記憶、費用、推奨設定の証拠ではない |

**プロジェクト推論：**タスクの境界と小さな記録が見える短い最初の依頼は、「言語を
教えて」や「これを調査して」という広い依頼より確認しやすい。ただし、利用制限、
指示の持続、難易度、回答品質の検証済みの解決策ではない。

## 候補のファーストターン契約

以下は本プロジェクトのオリジナル表現で、依頼を組み立てるチェックリストである。
命令文の文法でも、システムがどう解釈するかの保証でもない。

| 項目 | 読者が用意するもの | 入れる理由 | 推測してはいけないこと |
| --- | --- | --- | --- |
| **一つの成果** | 今回の会話で観察できる小さな結果を一つ | 次の行動と大きな願望を分ける | 習熟、流暢さ、専門性、完了保証 |
| **開始時の文脈** | 自作の短い例、既知の事実、提示した資料、または `unknown` | 応答が何に依存できるかを示す | 読者や資料の有効な評価 |
| **求める応答** | 範囲を決めた形式、長さ、順序 | 保存または拒否できる対象を作る | 正しさ、関連性、遵守 |
| **制限** | 共有しないデータ、しない操作、求めない支援 | 権限と副作用を明示する | 完全なプライバシー・安全・規約遵守 |
| **確認** | 不確実性を露出する質問、出典条件、修正依頼 | 回答を自己検証済みと扱わない | 検証済みの事実、教育品質、確かな得点 |
| **停止と記録** | 終了条件と保存する小さな記録 | 未完了と次の一歩を見えるようにする | 保持、転移、現実のタスク完了 |

![境界を見えるようにする：最初の6項目を名前で書く。見える項目は安全、正しさ、完了の証明ではない。](../../assets/teaching/first-turn-contract-card.svg)

### 送信前：確認するが、認定しない

送信していない低リスクのテキスト依頼があるなら、[First-Turn Check Skill](../../skills/prysai-first-turn-check/SKILL.md)
で各項目を `visible`、`missing`、`unclear`、`out_of_scope` に分類できる。最大 3 件の
`add_or_clarify` を返すだけで、依頼全体を書き換えない。最初の文面を作るときは
[Dialogue Brief](../../skills/prysai-dialogue-brief/SKILL.md)、ファイル・ツール・アカウント・
権限・外部効果を含むときは [Task Protocol](../../skills/prysai-task-protocol/SKILL.md) を使う。

これは候補の構造的方法であり、回答、製品挙動、データ処理、安全、学習結果を検証しない。

## カード A：5 分のスペイン語練習

日常的で低リスクな短い書き取り練習である。人物を評価せず、CEFR 等のレベルを付けず、
音声や閲覧を使わず、現実の会話能力を主張しない。

### 使ってよい条件

- 挨拶や飲み物の注文のように、普通で機微でない話題である。
- 数文に収まる。
- 修正を権威ある評価ではなく、確認が必要な提案として扱う。

### オリジナルカード

~~~text
I have five minutes for beginner Spanish practice.

Outcome: I want to write one polite two-sentence reply for [a simple situation].
Starting context: [words I know, a self-written attempt, or "unknown"].

Give me one short situation and wait for my reply. Do not assign a level or
claim that I have learned Spanish. After I reply, point out at most two changes
that would most affect meaning or politeness. For each change, say whether you
are uncertain. Ask me for one revision.

Do not use personal information, browse, contact anyone, or turn this into a
study plan. End by listing: my first reply, my revision, help used, one thing I
should check elsewhere, and the smallest next practice or stop condition.
~~~

### 5 分の記録が示せること

一回の記録された会話で短い試行を行い、開示された支援を受け、修正したことまで
である。スペイン語を習得した、文法や丁寧さが適切、独力でできる、保持・転移した、
言語レベルに達したことは示さない。現実のメッセージに使う修正は、人間または権威ある
資料で確認する。

## カード B：5 分の調査トリアージ

最終回答や引用らしい文章を作るためではなく、次の調査手順を確認可能にするカードである。
読者が提示した資料だけを使い、製品の閲覧機能を別途許可して確認しない限り、外部資料を
読んだふりをしない。

### 使ってよい条件

- 質問を一文で言える。
- 結果だけで高リスクの結論を出さない。
- 後で確認できる URL または文書タイトルを保存できる。

### オリジナルカード

~~~text
I have five minutes to prepare a research check, not a final answer.

Question: [one narrow question].
Material I supplied: [URLs, titles, excerpts, or "none"].

First, restate the question and name what evidence would be needed. Then make a
three-row table with: possible claim, supplied source or "missing", and what
would need checking. Do not invent citations, state that you opened a source
you cannot access, or give a recommendation. Separate fact, report, and
inference. If the material is missing, contradictory, personal, or high stakes,
stop and tell me the smallest safe next step.

End with: sources actually supplied, unknowns, and one question I should answer
before continuing.
~~~

### 解決しないこと

出典の存在、更新性、公平な表現、主張の裏付けを証明しない。事実の正確さ、完全性、
学術品質、法的十分性、安全な意思決定も証明しない。生成された URL、引用、要約、表、
確信度は、それだけでは証拠ではない。

## 7 日間の語学学習の境界

7 日でスペイン語（その他の言語）を学べる、または学べないとは示さない。主張には、
学習者の基準、目標能力、練習と支援の記録、評価課題、採点基準、採点者の独立性、保持
期間、転移条件が必要だが、この記録では収集していない。

7 回のチャットや各カード 1 回の完了は、流暢さ、レベル、保持、独立した会話、LLM の
因果効果の証拠ではない。公式ガイドや二つの個人報告も、この不足を埋めない。

## 確立していないこと

この記録は、カードが学習、調査、プロンプト技能を高めること、各製品が同じように
従うこと、応答・修正・引用・要約が正しいこと、製品が学習者評価・出典確認・高リスク
判断を安全に行えることを確立しない。U1/U2 の普遍性、現在性、製品原因、解決も示さない。
5 分という時間、7 日での流暢さ・保持・転移、学習者テスト、独立レビュー、安全審査、
本番承認も未確立である。

## 出典、再利用、ライセンス

Prysai Lab のオリジナルな統合記録である。カードと契約はこの記録のために書いた。
外部プロンプト、ベンダー例、フォーラム文、評価問題、コード、画像、ロゴ、資格情報、
利用者データをコピーしていない。外部資料はリンクと短い言い換えだけで、条件、ライセンス、
製品範囲、可用性は所有者に属し変わり得る。公開報告は参照シグナルだけであり、特定製品に
適用する前に対象画面の最新資料と規約を再確認する。

## 出典台帳

| ID | 種類 | 出典と確認日 | 限定した用途 | 担当 / 次回 | 証明しないこと |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI [*Prompt engineering*][O1]、2026-08-13 | 指示、文脈、例、評価の製品内ガイド | facts-maintainer / 2026-09-13 | 他製品、正しさ、学習効果 |
| O2 | official fact | Anthropic [*Prompt engineering overview*][O2]、2026-08-13 | 成功条件と経験テスト | facts-maintainer / 2026-09-13 | 他製品、効果、学習結果 |
| O3 | official fact | Google [*Prompt design strategies*][O3]、2026-08-13 | 明確で具体的な指示と例 | facts-maintainer / 2026-09-13 | 他製品、出典、言語結果 |
| O4 | official fact | Microsoft Learn [*Prompt engineering techniques*][O4]、2026-08-13 | 指示、主要コンテンツ、例 | facts-maintainer / 2026-09-13 | モデル同等性、研究品質 |
| O5 | official fact | Meta [*Prompt engineering*][O5]、2026-08-13 | Llama のプロンプトガイド | facts-maintainer / 2026-09-13 | 他製品、正しさ、初心者結果 |
| U1/U2 | public user report | OpenAI Community、投稿日と確認日は上記 | 一人の目的とワークフロー懸念 | curriculum-maintainer / 2026-09-13 | 普遍性、上限、根因、救済 |
| P1 | project inference | この契約と二つのカード | 製品に依存せず依頼を確認可能にする | curriculum-maintainer / `not_run` | 同等性、正しさ、効果、時間 |
| L1 | local reproduction | なし。`not_run` | 実行していない | curriculum-maintainer / `not_run` | あらゆる結果 |
| C1 | community suggestion | 保持なし | 狭い結論に不要 | curriculum-maintainer / `not_run` | 需要、最適手法、効果 |

## 停止記録と未解決の証拠

5 件の別組織の公式ガイドと、日付と追跡可能性のある 2 件の公開報告を確認して停止した。
アカウントを使わず、モデルを呼び出さず、個人データを収集せず、製品間比較をしていない。

初心者がカードを理解するか、5 分で終えられるか、製品画面が同じように受け入れるか、
出力と修正が正確か、会話外で保持・転移するかは未解決である。将来の評価には許可済みの
プロトコル、明示したタスクと環境、同意とデータ境界、記録した製品条件、独立した確認が必要。

[O1]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O2]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[O3]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[O4]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
[O5]: https://www.llama.com/docs/how-to-guides/prompting/
[U1]: https://community.openai.com/t/learn-languages-at-the-same-time/1040799
[U2]: https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381
