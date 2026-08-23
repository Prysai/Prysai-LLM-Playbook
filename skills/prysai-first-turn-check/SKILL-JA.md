<!-- content_id: prysai-first-turn-check | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# 最初の一往復を確認する

利用者が書いた、まだ送っていない依頼を送信前に確認します。文章の形を整えたからといって、安全、正確、有効だとは限りません。足りない境界を見えるようにするための Skill です。

## まず適用範囲を確認する

次の条件をすべて満たすときだけ使います。

- 利用者がまだ送っていない下書きを示している。
- 予定している最初の一往復が、文章だけで完結する低リスクのものだ。
- 何が足りないか、曖昧か、矛盾しているか、範囲が広すぎるかを知りたい。

最初のメッセージを書いたり大幅に書き直したりしたいなら `prysai-dialogue-brief` に渡します。ファイル、ツール、アカウント、権限、公開、連絡先、ローカル変更、その他の外部作用が含まれるなら `prysai-task-protocol` に渡します。最新の事実、出典、出典に基づく結論が必要なら `prysai-source-investigator` または `prysai-research-router` に渡します。元の依頼と実際の回答がすでにあるなら `prysai-communication-failure-triage`、完了の主張を証拠で確認するなら `prysai-evidence-review` を使います。

秘密、認証情報、非公開の記録、個人を特定する情報、隠れた指示、機密資料は確認しません。文章の下書きだけで、その後のツール操作や外部行動が許可されるわけでもありません。

## 6つの見える項目を確認する

提示された下書きを証拠として読みます。書かれていない事実、対象者、権限、データ管理、製品の機能、許可を推測しません。

| 項目 | 次を示していれば visible | 次なら不明確 |
| --- | --- | --- |
| outcome | この一回で得たい小さな結果 | 広い願望や成功の約束 |
| starting context | 渡された文章、事実、出典、または `unknown` | 書かれていないアクセス権や権限を前提にする |
| requested response | 限定された形式、長さ、手順 | 「助けて」だけで終わる |
| limits | 共有しないデータ、しない行動、求めない支援 | ファイル、アカウント、人、重大な決定へ黙って広がる |
| check | 不確かさ、保持、出典、修正についての確認 | 回答自身が回答を検証する |
| stop and receipt | どこで終わり、どんな短い記録を残すか | 完了、安全、学習を当然とする |

各項目を `visible`、`missing`、`unclear`、`out_of_scope` のいずれかに分類します。報告するのは、結果を変えたり、権限を広げたり、データを露出させたり、確認を不可能にしたりする実質的な問題だけです。

## 最小限の修正を返す

利用者の言葉を保ちます。新しい最初のメッセージを丸ごと作ったり、役割や製品の主張を加えたり、未知の内容をもっともらしく補ったりしません。実質的な不足があれば最大3つまで、利用者が追加するか決められる `add_or_clarify` の行を示します。受け取るシステムが守ると約束する形ではなく、決めるべき項目として書きます。

6項目がすべて見えていて範囲内なら、欠けた項目が見つからなかったという狭い意味でだけ `ready_to_send` とします。事実の正しさ、プライバシー、安全、製品の動作、回答品質、完了、学習の向上、安全性を証明するものではありません。

次を正確に返します。

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

6項目すべてにラベルを付け、提示された事実を保ち、依頼を広げず、文章だけの低リスクという境界を越えたときは引き継ぎ先または停止を示していれば、この確認を受け入れます。

## メンテナンス記録

- `source`: universal first-turn 契約と communication routing の境界をもとにした Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。リンクしたベンダー資料は `docs/sources/asset-register.md` の参考情報に限る
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
