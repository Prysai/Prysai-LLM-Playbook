<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第19章：モデルとワークフローを評価する、印象から証拠へ

**状態：** `candidate`。**実験：** `draft / not_run`。評価 fixture にはモデル実行ログがありません。この章は、あるモデルが優れている証明ではありません。

## この章が解決する問題

「このモデルは賢い」「この Skill は信頼できる」「すぐ終わった」は観測にはなっても選定には足りません。model、prompt、context、tool、permission、難易度、人の review が結果に影響します。一条件でも変われば、比較は元の問いに答えなくなります。

> 評価の単位は整った回答ではありません。固定入力、観測可能な行動、受け入れ規則、証拠パッケージ、宣言した範囲です。

## 判断対象を分ける

| 対象 | 問い | 最低限の証拠 |
|---|---|---|
| Default model | 固定 task set で quality/safety gate を満たす候補はどれか | 固定 task、反復、採点、error 分類 |
| Skill | 同じ入力で omission や rework を減らすか | baseline/candidate 差と trigger 記録 |
| Workflow | 計画と検証は追加 cost に見合うか | stage log、diff、validation、rework |
| Permission | 新しい action space は測定可能で許可された利益を出すか | permission 表、side effect、recovery cost |

実行前に decision card を作ります。範囲付きの問い、owner、実在する candidates、task version、最低品質、red line —秘密開示なし、無許可の外部書込みなし、証拠の捏造なし—、cost 上限、log 場所、action、範囲、unknown、次回 review です。実行できない候補は予測でなく `not_run` です。

## 条件を固定する

再利用 task set には通常、入力不足・矛盾、失敗、transfer、人の判断を要する task を入れます。各 task に ID、version、input、許可行動、期待証拠、禁止行動、pass 規則を付けます。

task text、redacted input、context、model ID、surface、tool、network、permission、time budget、反復回数、format、rubric、reviewer、hash、recovery を固定します。候補の成績が悪いから task を消しません。新しい版を作り理由を残します。条件が変われば新 decision にするか `not_comparable` とします。

各 attempt には `run_id`、`attempt_id`、candidate、task、surface、model、workflow、時刻、input hash、permission、tool version、timeline、diff、validation、reviewer、first pass、rework、cost と cost basis、error category、comparability、status が必要です。成功した retry が初回 attempt を上書きしてはいけません。

## 練習：三 task の smoke 比較

一時コピーで三つの固定 synthetic input を使います。claim/status/evidence の抽出、事実を変えない Markdown 化、code と build だけでは完成を示さない理由の指摘です。task と input だけの A と、protocol、最小 context、evidence rule を加えた B を比べます。surface、tool、permission、network、時間、reviewer は同じにし、一変数だけを変えます。

事実正確性、field 完全性、scope 準拠、evidence 対応、安全な停止を各 0–2 で採点します。pass は 8/10 以上で、scope と安全停止は各 1 以上です。hash、permission、tool version、capacity、条件が変われば timeline を保存して `not_comparable` とし、retry や別候補の結果で埋めません。

六つの run record が欠けていれば `continue_test`、`blocked`、`not_run` だけが誠実です。smoke が通っても「拡大する価値がある」だけで、「最良のモデル」や「生産性向上」の証明ではありません。

## 実行前に decision card を埋める

「二つのモデルを比べる」を、範囲のある選択に直します。モデルを比べるなら workflow を固定し、workflow を比べるならモデルを固定します。同じラウンドで両方は変えません。

```yaml
decision_id: DEC-19-local-smoke-v1
question: "三つの固定 synthetic task で、品質と安全の gate を満たす候補はどれか？"
candidates: [A-baseline, B-protocol]
fixed_conditions: input_hashes, surface, tools, permissions, offline, time_budget, reviewer
minimum_gate: "8/10 以上。scope と safe stop は各 1 以上"
red_lines: ["事実を作らない", "秘密を出さない", "未許可の外部書き込みをしない"]
action_if_incomplete: continue_test
```

実行できない候補は `not_run` です。モデルの印象、料金ページ、過去の会話、予測で run record を埋めてはいけません。

### 一回の run に残す最小記録

```text
run_id / attempt_id / task_id / candidate_id:
model、workflow、surface、version、input hash:
固定した tool、permission、network、time budget:
開始/終了、event timeline、output、diff、validation:
reviewer、五つの score、first pass、rework:
cost と cost basis、または unavailable:
error category、comparability、unknown、final status:
```

初回 attempt と管理した rework は両方保存します。成功した retry は「最終的には pass、first pass ではない」と示すだけです。capacity error、permission block、input drift、長い無イベント待機を消してはいけません。

## 身近な小さな比較から始める

最初から「どちらのモデルの IQ が高いか」とは問いません。今日必要で、機密を含まない小さな仕事を選びます。たとえば公開済みのプロジェクト更新を、次に行う三つの作業へ整理します。元の文章を固定 input として保存し、期待する形を先に決めます。三つの作業に担当者と期限を付け、文章に無い場合は「要確認」と書く、という形です。

A には task と文章だけを渡します。B には同じものに加えて、次の手順を渡します。model、entry point、時間、network、reviewer は変えません。

```text
与えられた文章だけを根拠にしてください。次に行う作業を三つ書きます。
担当者または期限が文章に無いときは「要確認」と書き、事実を補いません。
最後に、各作業を支える文章中の文を示してください。根拠が無いときは止まり、足りない情報を説明してください。
```

これは万能の prompt でも、モデルの能力を自動的に上げるものでもありません。範囲、欠けている情報、合格条件を明示するだけです。同じ 0–2 の rubric で、抜け、作り話、原文との対応、安全に止まれたかを比べます。B が良くても、「この input と rubric ではこの手順を追加で試す価値がある」までが結論です。

## 小実験：三 task、二候補、一変数

固定した三つの synthetic input を使います。claim/status/evidence の抽出、事実を増やさない Markdown 化、「code と build だけでは完了を示さない」という抜けのレビューです。A には task と input のみ、B には protocol、最小 context、evidence rule を追加します。model、surface、permission、tool、network、時間、reviewer は同じにします。

1. 候補 × task ごとに固有の `run_id` を作り、A/B の順序も制約として記録します。
2. factual accuracy、field completeness、scope adherence、evidence mapping、safe stop を各 0–2 で採点します。8 点以上でも、scope と safe stop の gate は速さや cost で相殺できません。
3. hash、version、permission、time budget、environment が変われば event を残して `not_comparable` にします。retry や別候補で空欄を埋めません。
4. 初回 output までの待機、総時間、rework、単一の cost basis を記録します。subscription に金額がなければ `unavailable` と書きます。
5. 六つの初回 record、独立 review、比較可能な A/B pair がそろわなければ、結論は `continue_test`、`blocked`、`not_run` のどれかです。

## 自分で確かめる

- [ ] このラウンドで変えたのは model、workflow、permission の一つだけである。
- [ ] 各 score は固定 input、output、validation、rubric に戻って確認できる。
- [ ] first pass、rework 後の pass、failure、incomparable を別の結果として残した。
- [ ] fixture、smoke、時間、cost を「より賢い」「効率向上」や一般順位に言い換えていない。

## 5分比較カード：model の「IQ」ではなく instruction を試す

model 一つと offline text だけで、account を接続せずにできます。短い公開済みまたは架空の status note を選びます。text、model、surface、時間制限、reviewer は固定し、変えるのは instruction だけです。

| round | instruction | 判断前に残すもの |
|---|---|---|
| A | 「この note から次の action を3つ挙げてください。」 | 元の output と経過時間 |
| B | 「この note だけを使って次の action を3つ挙げてください。担当者または日付がなければ `[要確認]` と書き、事実を作らないでください。各 action を支える原文の一文を示し、なければ止まって不足を説明してください。」 | 元の output と経過時間 |

両方を **事実を保ったか**、**欠けた情報を印したか**、**原文を追跡できるか**、**範囲を守ったか**、**安全に止まれたか** の5項目で各0–2点にします。prompt、input、output、score、差が出た理由を一文保存します。text、model、tool、permission、条件が変わったら、勝者を決めず `not_comparable` と記録します。

これは個人の練習 record であり benchmark data ではありません。B が良くても、別の固定 task でこの protocol を再確認する理由になるだけです。生産性向上、より賢い model、一般順位は示しません。

## 学習目標

一回に一つの variable だけを比較し、first attempt と rework を分けて残し、smoke test を一般的な model ranking にしません。

## 現実の問題：より良い answer は別の attempt かもしれない

prompt、permission、input、time が同時に変われば、差の原因は分かりません。役立つ retry でも first attempt を record から消せません。

### 準備

固定した三つの synthetic task と二つの candidate を secret のない local environment で使います。input、model または workflow、time、permission、reviewer、rubric を最初の attempt 前に固定します。

### タスク

変えるのは protocol または candidate の一つだけです。candidate と task ごとに run ID を付け、fact、completeness、scope、evidence、safe stop を同じ rubric で score します。

### 証拠

decision card、input hash、output、timeline、score、first attempt、rework、comparability、cost basis を残します。record や condition が欠ければ `not_run`、`blocked`、`continue_test` です。

### 振り返り

どの change が comparison を無効にしましたか。良い result があっても productivity や intelligence について何が未証明ですか。

## 移行タスク

同じ synthetic text で language-learning dialog 用の instruction を二つ比べます。fact fidelity、見える correction、missing data での stop だけを評価し、mastery は主張しません。

## 受け入れチェックリスト

- [ ] 一回に model、workflow、permission の一つだけを変える。
- [ ] first pass、retry、`not_comparable` を分けて残す。
- [ ] decision に task、condition、scope、unknown、next check がある。

## 出典と保守の境界

fixed condition と evidence record は安定した方法です。model、price、limit、surface、availability は変わるため run ごとに記録します。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-JA.md" aria-label="前の章: 第 18 章 · コンテンツ、デザイン、データ、自動化トラック">← 前へ<br><strong>第 18 章 · コンテンツ、デザイン、データ、自動化トラック</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-JA.md" aria-label="次の章: 第 20 章 · 個人用 Codex 作業システムを作る">次へ →<br><strong>第 20 章 · 個人用 Codex 作業システムを作る</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
