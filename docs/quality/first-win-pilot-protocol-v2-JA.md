<!-- content_id: first-win-pilot-protocol-v2 | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: first-win-pilot-protocol-v2.md | source_revision: 2026-08-23 -->

# First Win パイロット・プロトコル v2

**状態：** candidate のプロトコル。募集、参加者の実行、結果は記録されていない。

## このパイロットで判断できること

初めて読む人が、モデルが書いた短いメッセージから欠落した出典事実と根拠のない
追加事実を見つけ、First Win の方法を使い、未知のメッセージでも確認を繰り返せるか。

このパイロットは課題、ルーブリック、文言、導線の順序を改善できる。しかし、教育効果、
保持、一般的な文章力、モデルの信頼性、市場需要、人気、他コースへの優越性は証明しない。

## 狭い構成概念

検討するのは次だけである。

> 短いモデル回答の出典忠実性の誤りを見つけ、根拠のない情報を足さずに最小修正を行う。

確信度、好み、丁寧さ、高度な文法、プロンプト長、モデルの好み、Codex 能力は採点しない。

## 参加者と権限

このガイドを使ったことがないが、チャットモデルを使った経験のある成人 5–8 人を募集する。
これは経験のある初心者のサンプルで、初回のチャット利用者全体の証拠ではない。第一ラウンドは
効果研究ではなく測定器具のデバッグである。同じラウンドでは一つの固定コミットまたは不変の
Pages 候補を使う。

募集前に募集経路、プライバシー担当、進行役、独立採点者、保持期間、削除日を指定する。参加は
任意とし、未成年者、直属の部下、成績に影響を受ける学生、辞退しにくい人を募集しない。

氏名、連絡先、生のチャット履歴、アカウント情報、私的ファイル、勤務先資料、健康・金融情報、
画面録画を収集しない。ランダムなセッションコード、粗い経験区分、条件、採点済み成果物、経過時間、
利用した支援、最初の離脱点、匿名化した観察メモだけを残す。

## 固定条件

開始前に次を記録する。

- プロトコルの版と候補 SHA
- 入口 URL と言語
- ブラウザ版とビューポート
- モデル、画面、表示される設定
- 進行役と独立採点者
- ルーブリック版、保持終了日、削除担当

ラウンド中はモデル、プロンプト、課題順、採点基準、公開サイトの版を固定する。変えるなら
ラウンドを止めて新しい版で始める。放棄と除外も集計に含める。

## コミットに結び付いたパイロット・パッケージ

許可されたセッションの前に [pilot-kit 契約](../governance/first-win-pilot-kit.yaml)を使い、
既存の Git コミットから参加者ワークシート、進行手順、採点キー、空の記録、集計テンプレートを
ローカル専用パッケージに生成する。生成器は不正なコミット、空でない出力先、無効な役割別名、
同じ別名の二役、期限切れの保持日、資格情報・クエリ・フラグメントを含む URL を拒否する。
進行役と独立採点者は別人であり、別名だけを記録する。生成器は募集、連絡、データ収集、承認を行わない。

権限、プライバシー、保持、独立レビューの役割を確認した後だけ、リポジトリルートで実行する。
プレースホルダーは事前承認済みで個人を特定しない値に置き換える。

```text
python scripts/first_win_pilot_kit.py \
  --candidate-sha <full-40-character-commit-sha> \
  --output-dir .work/first-win-pilot/<round-label> \
  --pilot-authorizer <role-alias> \
  --privacy-owner <role-alias> \
  --moderator <role-alias> \
  --independent-scorer <role-alias> \
  --deletion-owner <role-alias> \
  --recruitment-channel <approved-channel-alias> \
  --retention-end <YYYY-MM-DD> \
  --locale <locale> \
  --model-surface <surface-label> \
  --browser-os-viewport <environment-label>
```

最初のセッション前に `--validate-package <local-package-path>` を実行し、`manifest.json` を
選んだコミットと比較する。参加者データは入れず、空の CSV はフィールド定義だけにする。採点キーは
参加者へ渡さない。`prepared_no_recruitment_or_participant_run_recorded` は準備状態であって学習者証拠ではない。

## フェーズ 1 — 手助けなしの基準

First Win のプロンプト、例、チェック、救援プロンプトを見せない。次の架空の出典と、意図的に
欠陥のある回答を提示する。

> The volunteer briefing starts Tuesday at 3. Bring the printed checklist. If you cannot attend, message the coordinator.

> The volunteer briefing starts Tuesday at 3 in Room 204. If you cannot attend, email the coordinator.

参加者に、出典忠実性の問題をすべて印し、修正文を書くよう頼む。欠陥の数や種類は説明しない。
固定キーは次の 3 件である。

1. `Bring the printed checklist` が欠落している。
2. `Room 204` が作られている。
3. `message` が根拠のない `email` に変えられている。

## 研究画面の提示

公開の任意ウォームアップは、3 つのチェック状態が選ばれるまで受入例を隠す。研究用ワークシートは、
公開ソース、プロンプト、チェック、救援文、比較ゲート、境界文を同じコミットに結び付け、URL とダイジェストを残す。
ワークシートの結果を、手助けなしの公開トップページ利用の証拠と呼ばない。

基準の前に、採点しない公開画面観察を別に行う。推奨 Codex 導線と任意ウォームアップを区別できるか、
最初のローカル課題を見つけられるか、例が説明用だと分かるか、チェックへ到達するかを記録する。
この観察と課題スコアは分ける。観察が終わるまでワークシート、プロンプト、例、チェック、救援文、答えを見せない。

## フェーズ 2 — First Win の指示

コミットに結び付いたワークシートを開く。固定ソースを使ってプロンプトをコピーし、修正前の最初の回答を保存する。
各チェックを `PASS / FAIL / UNSURE` とし、判断を支える正確な語句を記録してから例を見せる。

すべて通れば `not_observable_no_failure` と記録し、回復成功には数えない。次に、次の固定欠陥回答を示し、
最初に失敗したチェックを見つけ、同じ救援文を使わせる。

> The workshop starts Friday at 10 in Studio B. Please bring your notes. If you cannot attend, email the organizer.

判断前に例が見えたら `example_exposed` と記録し、フェーズ 2 の比較スコアを除外して公開画面観察だけ続ける。
この提示ミスだけを理由に基準や後の保持記録を捨てない。参加者が、出典事実と欠落情報を区別し、`UNSURE` を許可された
状態として扱い、誘導なしに最初の失敗を見つけ、必要な部分だけを直し、練習が証明しないことを説明したかを記録する。

## フェーズ 3 — 直後の未知の転移

元のプロンプトをそのまま見せず、次の架空ソースを提示する。

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us if the time no longer works.

参加者は短い指示を書き、回答を確認して必要なら直す。指示、最初の回答、印した発見、最終回答、前後差分の 5 記録を残す。
最初の回答が正しくても確認した証拠にはならない。出典に忠実なら `no_correction_needed`、First Win を開き直す等の支援も記録する。

## フェーズ 4 — 遅延した未知の転移

48–72 時間後、別分野で次を使う。元のプロンプト、チェック、例、救援文は示さない。

> Applications close Thursday at noon. Attach one work sample. Contact the programme office if the form does not open.

同じ 5 記録を残し、戻ってきたかを記録する。欠けた遅延データを最後の得点で置き換えない。

## セッション記録

フェーズごとに 1 行とし、両方の採点者の列を残す。

```text
session_code | phase | timer_start | timer_end | completed | first_answer
participant_instruction | marked_findings | check_1 | check_2 | check_3
help_code | recovery_branch | final_answer | before_after_diff | drop_off
example_exposed | scorer_a_dimensions | scorer_b_dimensions | disagreement
```

フェーズ 2 の時間はソース表示から、3 つの判断を固定し修正を終えるか
`not_observable_no_failure` を記録するまで測る。15 分は未検証の目標であり合格基準ではない。

`help_code` は `none`、`reopen_first_win`、`copy_text`、`moderator_clarification`、`other_recorded`。
回復値は `independent`、`seeded`、`not_observable_no_failure`、`not_attempted`、`stopped`。必須欄がすべてある場合だけ完了とする。

## 採点ルーブリック

可能な場合はフェーズを隠して基準と転移の成果物を採点する。

| 次元 | 0 | 1 | 2 |
| --- | --- | --- | --- |
| 必須事実 | 2 件以上の欠落／変更 | 1 件の欠落／変更 | すべて保持 |
| 根拠のない事実 | 2 件以上の追加 | 1 件の追加 | なし |
| 求めた行動 | ない／大きく変化 | あるが曖昧 | 明確に保持 |
| 修正範囲 | 新しい欠陥を作る | 対象を直すが余計な変更 | 最小で十分 |

2 名の採点者が独立して採点し、両方の値と不一致の理由を保存する。平均で隠さず、次元別の一致と不一致を報告する。
一貫して使えないなら最初のラウンド後にルーブリックを改訂する。

## 停止と安全

私的資料を使おうとする、雇用・学業評価だと思う、苦痛を感じる、外部操作が必要になる場合は停止する。私的資料を削除し、
安全停止だけを記録する。2 名が相反する解釈をした、答えのキーが曖昧、画面が条件を保てない、2 回例が早く表示された、
同意または最小化条件が守られない場合はラウンドを停止して器具を改訂する。

## 集計報告

匿名化した集計だけを公開する。募集・除外、完了・再参加、離脱、条件差、ルーブリック不一致、基準／直後／遅延スコア、
フェーズ 2 の時間と 15 分以内の件数、独立／種付き回復、`not_observable_no_failure`、支援、重大事象、器具の変更案を含める。
5–8 人では記述的な件数と分布だけを使い、統計的有意性や「ガイドが効く」とは言わない。

## 証拠の境界

このプロトコルを書いたり検証したりしても学習者証拠は生まれない。1 ラウンドで得られるのは、この版の使いやすさと測定に関する
証拠であり、Q-001、Q-002 を閉じたり、コース、First Win、Labs、評価 fixture の状態を昇格させたりしてはならない。
