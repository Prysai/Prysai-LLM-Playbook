<!-- content_id: prysai-shift-handoff | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# シフト・ハンドオフ

再利用する基準、変化する項目、権限、受け入れ証拠を分けて、継続する LLM 協働の今回の仕事を
短く引き継ぎます。昨日の文脈や以前の例が今日の仕事、権限、結果にも適用すると誤解される場合に
使います。製品コンテキスト、完全なタスク・プロトコル、途中で中断したタスクの復旧、完了主張の
監査、行動の実行には使いません。

## 継続作業の境界だけを担当する

承認された分類で今日のフィードバックメモを分ける、固定された文体で今週の短い更新を確認する、
新しい出典記録を定形の出力へ変えるなど、反復する文章作業に持続する基準があり、項目だけが変わる
場合に使います。

次の場合は引き継ぎます。

- 製品、対象者、ポジショニング、測定の再利用可能なコンテキスト自体を版付きで決める：Product Context;
- 結果、範囲、権限、受け入れが不明：Task Protocol;
- 以前のタスクが証拠の前に停止：Interruption Checkpoint;
- 依頼、返答、期待結果があり、制御した修復が必要：Communication Failure Triage;
- 変わる項目が現在事実：Source Investigator;
- ファイル、データセット、ツール、アカウント、ネットワーク、共有システム、外部効果：現在の項目カードを作る前に Task Protocol。

繰り返しのチャットパターンを、記憶、コンテキストウィンドウ、費用、永続性、自動化、製品設定の主張に変えません。

## 安定カードと現在カードをそろえる

見える入力だけを集め、ないものは `missing` とします。別のターンや以前の例から復元・推測しません。

**安定カード**（名前付き作業の流れで再利用）：

1. `work_stream` — 繰り返す仕事を平易に;
2. `criteria_revision` — 規則の版、日付、不変な参照;
3. `allowed_inputs` — どの項目にも使える資料;
4. `forbidden_assumptions` — 引き継いではいけない事実、出典、権限、過去の出力;
5. `response_shape` — 必要な返答の形。

**現在カード**（今回の項目にのみ真）：

1. `item_id` — 非機密のローカルラベル;
2. `item_input` — 提供された現在の文章または安全な最小要約;
3. `item_change` — 今日の新しい点;
4. `task_request` — 今回求める結果一つ;
5. `acceptance_evidence` — 確認する見える規則または成果物;
6. `authority_and_risk` — `R0` の文章準備または `handoff_required`。

秘密、私的記録、許可のない出典文、未裏付け主張、未承認の行動が項目にあれば拒否します。
不要な過去の会話履歴を求めません。

## 書く前に比較する

1. 安定カードの各項目と、現在項目だけの各項目を分ける。
2. 以前の例はラベル付き参考としてだけ保持し、現在の事実や受け入れ結果にはしない。
3. 再度提供されていない現在の事実、権限、出典、期限、宛先、受け入れ確認を `missing` または `not_authorized` とする。
4. 現在項目が安定基準を変えるなら停止し、所有者または Product Context／Task Protocol に渡す。
5. 提供された文章だけの `R0` の作業でのみコピー可能な brief を返す。後の行動には固有の境界と証拠が必要。

## 引き継ぎレシートを一つ返す

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

安定カード、現在カード、依頼、返答形式、受け入れ証拠、`R0` 境界がすべて見える場合だけ
`ready_for_text_only_current_item` とします。レシートは文脈の境界であり、モデルが規則を保持、
理解、正答、次のタスクを完了した証拠ではありません。

## 失敗確認

- 「前回と同じ規則」が基準の版または現在の確認を示さない;
- 古い例が今日の出典や真実になる;
- 現在項目がファイル、認証情報、私的資料、ブラウズ、公開、支出、アカウント変更、外部効果を含む;
- 現在項目が安定ルーブリック、権限、宛先、出力契約を変える;
- 返答が完了扱いされている（Evidence Review を使う）。

## 保守記録

- `source`: 出典範囲のある反復項目の研究記録、Task Protocol、Product Context、Interruption Checkpoint から導いた Prysai Lab オリジナルの方法
- `license`: オリジナルの書き直し。公式ガイドと公開レポートは参考資料です。
- `owner`: workflow-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
