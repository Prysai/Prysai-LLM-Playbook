<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# AI 安全の現場シグナル：権限・証拠・進捗を保つ

**アクセス日：**2026-08-13（America/Los_Angeles）  
**状態：**候補の調査記録。日付のある公開報告と、このプロジェクトの保守的な教材上の推論を少数まとめた。報告のローカル再現、モデル・Agent・学習者・アカウント・リポジトリ・安全制御のテストはしていない。  
**担当：**security-research-maintainer  
**次回確認：**2026-09-13。リンク先の Issue や製品面が大きく変わった場合は前倒しする。

## 調査の問い

長時間の会話、ツールを使う会話、調査会話が混乱したとき、元の承認、重要な主張の証拠、まだ終わっていない作業を保てる観察可能な習慣は何か。

これは脆弱性調査ではない。製品の順位付け、事故頻度の推定、製品の診断、チェックリストの安全効果の証明は行わない。狭い教材上の目的は、何が承認されたタスクか、各主張を支える出典は何か、何を確認したか、なぜ止めたかを示せる引き継ぎである。

## 証拠の種類と再利用の境界

| 種類 | 用途 | 証明しないこと |
| --- | --- | --- |
| `official fact` | 発行元が文書化したリスクまたは安全境界 | 読者のアカウントでの動作、設定の安全性、報告の原因 |
| `public user report` | 一人の著者による追跡可能な症状の説明 | 普遍性、根本原因、現在の再現、ベンダー確認、修正 |
| `project inference` | 限られた記録から導く保守的な教材上の行動 | その行動が十分な安全対策であること、結果が改善すること |
| `not_run` | 意図的に実行していない製品・学習者・攻撃シナリオ | 実行時、安全、学習の結果 |

以下はすべて独自の要約である。Issue 本文、投稿、プロンプト、コード、添付、スクリーンショット、ログ、workaround はコピーしていない。リンクは参照であり、実行指示ではない。

## 四つの現場シグナルと範囲を限定した対応

### S1――動的な指示層が曖昧なタスク状態を作る

OpenAI Community の一人の投稿者は、Assistant API の実行に短い `instructions` を加えた後、挙動が一貫しなかったと報告した [R1]。日付のある API 面についての一件であり、現在の製品一般の主張でも、すべての指示層が衝突する根拠でもない。

**教材上の行動：**行動する前に入力を分類する。

```text
approved task: 承認された結果と行動範囲
project rule: タスク所有者が採用したリポジトリ／チームの制約
external data: 調べるページ、ファイル、引用、Issue、ツール結果
unknown: タスクを変える可能性があるが承認されていない資料
```

承認済みタスクと指示らしい文字列が明確に一致しないなら `authority_unclear` で止める。より広い行動を求める方を選んで解決しない。第 3 章の入力区分、第 12 章の状態・停止条件、既存の四行安全カードにつながる。

### S2――引用マーカーは保持された検証可能な出典記録ではない

OpenAI Community の一人の投稿者は、調査後に引用マーカーを永続的な出典一覧と対応付けられなかったと報告した [R2]。引用が一般に利用できない、または不正確だという証明ではない。

**教材上の行動：**マーカー、URL、検索結果、モデルが作った参考文献は発見の手がかりとする。発行元、URL、アクセス日、正確な位置、範囲、実際に支える主張を記録して初めて重要な主張を台帳に入れる。位置を開き直せない、または対応付けられないなら `unverified` に下げるか削除する。第 15 章の証拠表と Card C2 の境界である。

### S3――限定と矛盾は別の調査結果である

公開された Claude Code Issue の一件は、ある検証フローが主張への限定を矛盾として扱ったと報告した [R3]。そのフローについての報告であり、Claude Code の評価でも、すべての検証器に当てはまる主張でもない。

| 結果 | 意味 | 安全な統合 |
| --- | --- | --- |
| `supports` | 調べた箇所が指定範囲で主張を支える | 主張を残し、位置を引用する |
| `qualifies` | 文脈が支持された主張の解釈を変える | 範囲と限定を付けた場合だけ残す |
| `contradicts` | 出典が事実または主張された範囲に異議を唱える | 狭める、書き直す、争いありと記録する |

`qualifies` を `contradicts` にまとめず、URL があるだけで supported と呼ばない。Lab 003、Lab 008、第 15 章の衝突ログに接続する。

### S4――もっともらしい完了報告が観察記録と食い違う

公開された Claude Code Issue の一件は、長いセッションで編集や検証、ユーザーの依頼を実施したという報告を、後から保存状態で確認できなかったと記述した [R4]。別の Codex Issue は、長い会話の後の保守依頼が、以前に示された安全境界を越えたと報告した [R5]。いずれも一件の投稿であり、製品全体の安全結論ではない。

**教材上の行動：**タスク変更、長い停止、コンテキストのリセット、新しい成果物への作用は境界の再確認を発生させる。最後に承認された対象と行動範囲を保存し、次の行動と照合する。宛先、権限、結果の用途が変わるなら再度人に確認する。最終メッセージは、説明しているファイル、コマンド、出典、その他の記録の代わりにならない。第 9 章、第 13 章、Communication Failure Triage Skill の観察不一致ルートに対応する。

## 長いタスクを支える調査チェックポイント

重要な調査をチャット画面だけに置かない。意味のある判断ごとに、プロジェクト所有の Markdown または承認済みのローカル場所へ短い**調査チェックポイント**を保存する。

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

この記録はセキュリティログ、監査証明、思考の連鎖、調査完了の証明ではない。秘密、私的パス、顧客資料、生の認証情報、不要なチャット履歴を入れない。出典、対象、行動、権限を安全に名付けられないときは、書き換えで隙間を埋めず担当者に確認して止める。

### 5 分の合成練習

次の架空シナリオだけを使う。閲覧、ツール実行、公開、連絡はしない。

```text
判断：架空のガイドは、その方法が実証済みだと言えるか。
承認範囲：名前のある二つの調査メモだけを確認。外部行動なし。
メモ A：5 人パイロットの手順は作成済みだが参加セッションはない。
メモ B：一つのレッスンファイルでローカル静的チェッカーが通った。
```

チェックポイントを書く。妥当な結果は、二つのメモが「測定の準備と静的検証がある」という狭い主張だけを `supports` し、「実証済みの効果」は支持しないとすること。`next smallest check: run an authorized, consented fixed-revision pilot` と外部行動なしを記録する。

**受け入れチェック：**

- [ ] 判断、範囲、二つの入力がある。
- [ ] `supports`、`qualifies`、`contradicts`、`unknown` を混同していない。
- [ ] 証拠が支えない主張を一つ明示している。
- [ ] 秘密、私的資料、新しい権限、外部行動を加えていない。
- [ ] 次の確認が元の問いより小さい、または担当者と停止が記録されている。

架空の記録が示すのは分類を保存したことだけであり、調査能力、引用の正確さ、プロンプトインジェクション耐性、持続的な安全行動、実システムの有効性は示さない。

## 既存の安全カリキュラムとの接続

この記録は新しい Skill、プラットフォームアダプター、別の安全フレームワークを追加しない。作業の変化に応じて連続性を確認する小さなルールである。

| 既存の単元 | 新しい使い方 | 境界 |
| --- | --- | --- |
| 四行安全カード | 重要なタスク変更後に `inputs`、`allowed action`、`evidence`、`stop` を再確認する | 再確認は不可信な内容が影響できないことを証明しない |
| Card C2――調査台帳 | 一つの pass/fail ではなく `supports`、`qualifies`、`contradicts`、`unknown` を使う | 分類後も開いた位置との照合が必要 |
| 第 9 章――復旧 | 完了報告を観察可能な成果物、チェック、出典記録と比較する | 一度の比較で隠れた推論やプラットフォーム障害は診断できない |
| 第 13 章――行動境界 | 成果物の宛先と既知の結果用途を権限境界の一部として扱う | 境界を書くだけでは行動を承認、監視、阻止しない |

## 出典台帳

| ID | 出典（確認時の状態） | アクセス | 種類 | 範囲 | 境界 |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI: Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | 信頼できない入力、機密データ、承認、評価を Agent 作業の境界として扱う | 製品固有で変動し、すべての Codex アカウントや制御を表さない |
| O2 | [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | もっともらしい誤り、来歴、プライバシー、人の監督、ライフサイクルのリスク枠組み | 製品マニュアル、適合評価、教材成果の証明ではない |
| O3 | [OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | 直接／間接プロンプトインジェクションと最小権限の文脈 | 本件の事故証拠でも、対策の保証でもない |
| R1 | [OpenAI Community: Assistant API instructions](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | 動的な指示を加えた後の一貫しない挙動の報告 | 一件の報告であり、一般的な衝突や原因ではない |
| R2 | [OpenAI Community: citation markers](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | マーカーと永続的な出典の対応付けの難しさ | 引用の利用不能や不正確さを証明しない |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13、確認時 open | public user report | 限定と矛盾を混同した検証器の報告 | Claude Code 一般、原因、検証済み対策を示さない |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13、確認時 open | public user report | 保存状態で確認できない行動・検証の報告 | 隠れた状態、一般挙動、完全な事故調査を示さない |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13、確認時 open | public user report | 長い会話での安全境界のずれの報告 | 一件の投稿であり、再現、頻度、公式の安全発見ではない |

## 明示的な限界

この記録は次を証明しない。

- ChatGPT、Codex、Claude Code、その他の Agent が読者の環境で報告どおりに動くこと。
- チェックポイントが幻覚、プロンプトインジェクション、安全でないツール使用、データ露出、境界のずれを防ぐこと。
- 出典を開いた、または分類しただけで正しいこと。
- 5 分の合成練習が学習者の長期的な行動を測ること。
- プロジェクト、Skill、読書サイトが安全、準拠、公開済み、production-ready であること。

次に必要な証拠は、許可と同意を得た固定条件の合成 fixture の実行、外部副作用なしの記録保存、観察可能な選択に対する独立採点である。
