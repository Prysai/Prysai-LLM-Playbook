<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第19章：モデルとワークフローを評価する――印象から証拠へ

![成果物の存在、正しさ、準備完了、学習の証拠を分けるための図](../../assets/teaching/four-evidence-lenses-red-black.svg)

> `content_status: candidate`
> `experiment_status: draft / not_run`
>
> この章では、実行できる評価方法を扱います。リポジトリのモデル評価 fixture にはモデルの実行ログがないため、特定のモデルが最良だという証明として読まないでください。

## この章が解決する問題

「このモデルは賢い」「この Skill は信頼できる」「作業がすぐ終わった」という言葉は観察結果にはなります。しかし、それだけで採用を決めることはできません。モデル、prompt、context、tool、permission、課題の難しさ、人による review のすべてが結果に影響します。条件が一つでも変われば、その比較は元の問いに答えなくなる可能性があります。

したがって、評価の単位は整った回答ではありません。固定した入力、観測可能な行動、受け入れ規則、証拠パッケージ、そして明示した適用範囲です。

## 現実の問題から始める

FP-08（モデルと provider の設定が一致しない）、FP-09（容量不足や待ち行列による中断）、FP-10（validation コマンドが `Working` のまま残る）、および [FUP-05（長時間イベントがない後にエラーになり、自動 retry された事例）](../evidence-library-JA.md#source-notes) は、公開された利用者報告から整理したものです。公式な根本原因の認定でも、このプロジェクトでの再現でも、すべてのアカウントに当てはまる結論でもありません。

ここから、次の四つの境界を学びます。

- 設定が通ったことは、タスクが完了したことではない。
- タスクが完了したことだけでは、十分な証拠にならない。
- 成功した retry で初回の試行を上書きしてはいけない。
- 停止または変更された条件では、run を比較できないことがある。

## 学習目標

この章を終えると、次のことができるようになります。

- 「どのモデルが優れているか」を、範囲を限定した decision question に変える。
- 通常、境界、失敗、transfer、人の判断を含む versioned task set を作る。
- run ID、log、score、evidence completeness を備えた再現可能な比較記録を作る。
- first-pass success、最終的な success、rework、経過時間、cost、risk、安全に停止できたかを分けて扱う。
- scope、unknown、次回 review 日を含む decision card を書く。

## 概念：評価対象と証拠レベル

model、skill、workflow、permission の選択は別々の意思決定です。記録の形式は共有できますが、結論を黙って組み合わせてはいけません。

| 評価対象 | 問い | 最低限の証拠 |
|---|---|---|
| Default model | 指定した task set で quality と safety の gate を満たす候補はどれか | 固定 task、反復実行、採点、error 分類 |
| Skill | 同じ入力で omission や rework を減らすか | baseline と candidate の差、skill-trigger の記録 |
| Workflow | 計画と検証に増えた cost を払う価値があるか | stage log、diff、verification、rework の記録 |
| Permission | 新しい action space が、測定可能で許可された利益を生むか | permission 表、side effect の証拠、recovery cost |

## 証拠を表にする

| 証拠項目 | 必要な成果物 | 支えられる主張 | 支えられない主張 |
|---|---|---|---|
| Frozen task set | versioned な task 文、input fixture、schema、受け入れ規則、hash | 候補が同じ宣言済みの作業を受けたこと | その task set がすべての実務を代表すること |
| Condition snapshot | surface、model/workflow ID、version、tool、network、permission、time budget | run が比較条件に一致したか | この範囲を超えた一般的な benchmark 主張 |
| Run record | 固有の `run_id`、時刻、event timeline、output、diff、validation、status | 一つの attempt で何が起きたか | log がない run が成功したこと |
| Human review | reviewer、rubric、score、未解決項目 | output をどう判定したか | 弱い、または未レビューの rubric が客観的な真実になること |
| Comparability field | `comparable` または理由付きの `not_comparable` | 結果を比較に入れてよいか | retry や別候補で不足証拠を埋めること |
| Decision card | action、scope、error、unknown、次の review | 今この証拠が正当化する判断 | 未実行の評価が勝者を証明すること |

## 判断：評価を設計する前に card を埋める

実行前に card を完成させます。candidates は実際に実行できるものにします。実行できない候補は `not_run` であり、予測で空欄を埋めません。

```yaml
decision_id: "DEC-19-001"
decision_object: "model | skill | workflow | permission"
question: "For which bounded tasks does one candidate meet the stated gates?"
decision_owner: "Named evaluation owner before the run"
candidates:
  - id: "baseline"
    description: "Fixed goal and input only"
  - id: "candidate"
    description: "Task protocol, minimum context, and verification"
task_set: "three-task-smoke-v1"
task_set_version: "v1"
minimum_quality: "Required fields present, input unchanged, validation exit code 0"
red_lines:
  - "No secret disclosure"
  - "No unauthorized external write"
  - "No missing evidence described as complete"
acceptable_cost: "Time and cost ceiling written before the run"
log_location: "evals/results/; not_run when no run exists"
decision_action: "adopt | retain_baseline | continue_test | reject | blocked"
scope: "This task set, surface, date, and permission condition only"
unknowns: []
next_review: "YYYY-MM-DD"
```

red line を破った場合は `reject` または `blocked` です。最低品質を満たさない結果を、安い cost で相殺してはいけません。`adopt` は、宣言した scope 内で反復結果が十分に安定している場合だけ許可します。証拠が足りなければ `continue_test` であり、「best value」ではありません。

## 行動：task set と比較条件を固定する

再利用できる task set には、通常の作業、入力不足または条件の矛盾、失敗ケース、transfer ケース、そして少なくとも一つの人の判断を要する task を含めます。各 task に stable な ID、version、input context、許可する action、期待する evidence、禁止する行動、pass 規則を付けます。

候補の成績が悪いからといって task を削除しません。task 自体に問題があるなら、新しい task-set version を作り、理由を記録します。

比較前に次の条件を固定します。

- task 文、redacted input、context version;
- model ID、reasoning 設定、product entry point、surface;
- tool set、network 条件、permission、time budget;
- 反復回数、output format、scoring rubric、reviewer;
- baseline と candidate の file hash、recovery 方法。

条件を変えたら log に残します。そうしなければ、「モデルが改善した」のではなく、より多くの file、広い permission、長い時間を与えただけかもしれません。

## 実験：三 task の比較可能性 smoke test

これは低リスクで、offline かつ再現可能な smoke 実験です。大きな評価に進む価値があるかだけを調べます。モデルや workflow が一般に優れていることを証明するものではありません。

### 準備

固定された [`three-task-smoke-v1` package](../../evals/candidates/three-task-smoke-v1/README-JA.md) の一時コピーを使います。package には、合成 input、期待 output、input hash、run-record template、offline validator が含まれます。比較変数は一回に一つだけ選びます。model を比べるときは workflow を固定し、workflow を比べるときは model を固定します。同じ round で両方を変えません。

以下は **合成された評価 fixture** であり、本番記録、顧客データ、benchmark 結果、モデルの実行結果ではありません。

| `task_id` | 固定 input と action | 初回の受け入れ規則 |
|---|---|---|
| `extract-01` | 「build exit code 0; mobile 390px checked; user acceptance not run」から `claim`、`status`、`evidence` を抽出する | ちょうど三行。最初の二つは `verified`、user acceptance は `unverified`。事実を追加しない |
| `markdown-02` | 同じ input を、level-two heading の「Completed」と「Unverified」だけを使う Markdown に変換する | heading と事実の分類が正しい。unknown を残し、主張を追加しない |
| `gap-review-03` | 「code が存在し build が通ったので feature は complete だ」という文を review する | runtime と user-effect の証拠が足りないと指摘する。build の証拠や元の主張を不当に格下げしない |

三つの task 文、input、output schema、受け入れ表、SHA-256 hash を `task_set_version: v1` として固定します。package の local validator が確認するのは frozen answer contract だけで、model quality score ではありません。両候補で surface、context、tool、permission、network 条件、time budget、reviewer を同じにします。candidate ごとに各 task を一回実行し、事前に宣言した controlled rework は最大一回です。本番データ、実際の secret、network write、commit、push、公開は使いません。

### タスク

1. **Candidate A：** 実際の model と workflow を記録します。workflow 比較なら、固定 task と input だけを渡します。
2. **Candidate B：** 実際の model と workflow を記録します。workflow 比較なら、task protocol、minimum context、受け入れ規則、evidence 規則を追加します。
3. A を固定した task 順で実行し、B も同じ順で実行します。順序による bias があり得るため、その限界を記録します。大きな評価では順序をランダム化するか、順序を入れ替えます。
4. candidate × task ごとに固有の `run_id` を付けます。例：`19-three-task-smoke-v1-B-extract-01`。controlled rework は同じ run ID の新しい `attempt_id` として残し、初回 output を上書きしません。
5. capacity error、permission block、input hash の変更、tool version の変更、その他の固定条件の変更が起きたら、event を保存してその行を `not_comparable` にします。空欄、成功した retry、他候補の結果で埋めません。

### 証拠

run ごとに、次のような記録を残します。まだ実行していない場合は、作ったふりをせず `not_run` を残します。

```yaml
run_id: "19-three-task-smoke-v1-B-extract-01"
attempt_id: "initial"
decision_id: "DEC-19-001"
task_set: "three-task-smoke-v1"
task_id: "extract-01 | markdown-02 | gap-review-03"
candidate_id: "A | B"
surface: "Actual surface and version"
model: "Actual model ID; not_run if not run"
workflow: "Actual workflow ID/version; not_run if not run"
started_at: "YYYY-MM-DDThh:mm:ssZ or not_run"
ended_at: "YYYY-MM-DDThh:mm:ssZ or not_run"
input_hash: "sha256:... or not_run"
context_version: "v1"
permissions: "Read-only temporary copy"
tool_set_and_versions: "Actual tools and versions; not_run if not run"
network_condition: "Offline"
time_budget: "Frozen ceiling"
conditions_match: true
timeline:
  - at: "YYYY-MM-DDThh:mm:ssZ"
    event: "request_started | first_output | tool_started | tool_ended | no_event_threshold | retry_started | completed | failed"
cost_value: "Actual value or unavailable; never estimate"
cost_basis: "API bill | input/output tokens | subscription proxy | unavailable"
diff: "File names, line count, or no-change"
validation: "Command, exit code, and key output"
reviewer: "Independent reviewer or not_assigned"
first_pass: true
rework_count: 0
score: 0
evidence_completeness: "0/6"
error_category: "none | goal | context | capability | capacity | timeout | permission | implementation | fact | verification | delivery | condition_drift"
comparability: "comparable | not_comparable"
not_comparable_reason: "none or the changed condition"
status: "pass | fail | not_comparable | not_run"
```

人が採点する五つの軸は、factual correctness、field completeness、scope compliance、evidence correspondence、safe stopping です。それぞれ 0–2 点で、合格は 8/10 以上。ただし scope compliance と safe stopping は各 1 点以上必要です。`first_pass` が true になるのは、初回 attempt が revision なしで frozen gate を満たしたときだけです。retry や controlled rework の後に通っても `first_pass: false` のままです。

`rework_count` は初回提出後、元の受け入れ規則を満たすために必要だった修正回数です。条件変更は通常の rework ではなく、新しい run または `not_comparable` です。evidence completeness は、固定 input、output、diff、validation output、score、unverified items の六つの必須資料を数えます。一つ欠ければ完全性は下がり、本人の自信で置き換えることはできません。

比較前に cost basis を一つ選びます。API なら実際の請求額または input/output token を使えます。subscription surface が金額を示さないなら、名前を付けた proxy を使い、金額は `unavailable` と記録します。互換性のない cost basis を混ぜたり、その基準で候補の一方が安いと主張したりしません。経過時間は `request_started` から最終状態までで、可能なら first-event wait、tool time、rework time を分けます。

最後に、二候補 × 三 task の `smoke-comparison` 表と、候補ごとの decision card を作ります。run ID、surface、model、workflow、condition version、first pass、rework、elapsed time、cost value と basis、error category、comparability、score、raw-log index を含めます。六つの初回 record が不完全、または task に比較可能な A/B pair がなければ、正直な action は `continue_test`、`blocked`、`not_run` のいずれかです。smoke が通っても、支持されるのは「拡大する価値がある」または「まだ拡大しない」までです。

### 失敗バリエーション

B の `markdown-02` 実行中に、capacity error、permission block、input change、tool-version change のいずれかを意図的に入れます。正しい扱いは、その run を停止し、event timeline と中断の証拠を保存し、`not_comparable` と記録して、元の条件で再実行するか停止するかを明記することです。成功した自動 retry、空欄、A の結果で行を埋めません。

ほかにも、長時間 event がない validation command、input にない事実を output が含むケース、一つの task class だけで候補が改善するケースがあります。これらの例や関連 issue を、公式な根本原因のように書き換えないでください。

### 振り返り

- candidate workflow が追加した setup cost は何で、どの risk を減らしたか。
- どの成果物が decision を直接支え、どれが単なる観察か。
- どの variable が比較を混乱させた可能性があるか。
- その失敗は goal、context、fact、permission、verification、delivery のどれか。なぜそう判断したか。
- この結果がカバーする task はどれで、scope 外はどれか。
- 次の round で変える条件を一つだけ挙げ、誰が review するか。

## よくある誤りと境界

- 一つの実演だけで、一般的な性能、cost、または「best value」を示すことはできない。
- 短い経過時間で、未許可の action、捏造した evidence、高い rework を相殺できない。
- 公式 model 説明は、このプロジェクトで測った結果ではない。
- schema check は fixture が正しい形かを確認するだけで、model が実行されたことや学習者が方法を習得したことを示さない。
- 条件が変わったら新しい decision-card version を作るか、run を比較不能にする。古い結論をそのまま使い続けない。

## 転移課題

同じ記録形式を、research question、marketing experiment、team skill の選択に適用します。run ID、input hash、score、decision card を残します。どの metric が移植でき、リスクに合わせてどれを変える必要があるか、少なくとも一つの「移植できない結論」を書きます。

## 受け入れチェックリスト

- [ ] model、workflow、permission のうち、一回に一つだけを変えた選択を decision card に書ける。
- [ ] task set に version、固定 input、通常ケース、境界ケース、失敗ケース、transfer case がある。
- [ ] 固定 task ごとに frozen input、受け入れ規則、初回 A/B run がある。未実行なら明示的に `not_run` とした。
- [ ] すべての run に固有 ID、surface、model/workflow、条件、timeline、diff、validation、score、status がある。
- [ ] evidence completeness を計算し、first pass、rework、final pass を区別できる。
- [ ] 一つの cost basis と error category を記録し、retry で初回 attempt を上書きしていない。
- [ ] 条件変更を検出し、比較不能な実験を停止できる。
- [ ] 結論の scope、unknown、次回 review 日を言える。
- [ ] 未実行の model 評価や benchmark を verified result と表現していない。

## 出典と保守の境界

この章では、model の位置付け、model ID、availability、entry point、account scope を変わりやすい事実として扱います。`content_status` と `claim_status` は別の field です。以下の記録は確認日時点の source boundary を示すもので、実際の account を reader が確認する代わりにはなりません。

```yaml
- claim: "Official model documentation may change the positioning or availability of a model by entry point, account, or version"
  source: "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
  checked_at: "2026-08-09"
  applies_to: "The account, API entry point, and version range stated by that page"
  owner: "Model-evaluation maintainer"
  next_review: "2026-11-09"
  claim_status: "current at check date"
- claim: "Codex model and surface guidance should be taken from the current official model guide"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "The Codex/ChatGPT surfaces stated by the official guide; not undeclared accounts"
  owner: "Content maintainer"
  next_review: "2026-11-09"
  claim_status: "current at check date"
```

`evals/task-set-v1.yaml` と `docs/model-evaluation-luna.md` は、現在のプロジェクト記録で `draft / not run` のままです。この章の方法は `candidate` で、benchmark 数値も model-run 結果も含みません。

maintenance owner は、公式 model page、task-set version、evaluation fixture、account scope、cost basis、runtime surface を、それらのいずれかが変わったとき、遅くとも 2026-11-09 までに再確認します。指定された run log、独立 review、comparability check、evidence package がそろって初めて、結果を `verified` とします。さらに operational、security、permission、rollback、user-acceptance check がそろって初めて `production-ready` です。

## 証拠を越えない引き継ぎの練習

評価 run の後で [Lab 015：完了という一文ではなく、evidence を渡す](../labs/lab-015-evidence-delivery-JA.md) を使います。Lab 003 は独立した claim adjudication を担当し、Lab 015 はその結果を使って、添付 evidence を越えない簡潔な handoff を作ります。

## 5分比較カード：モデルの IQ ではなく、一つの指示を試す

account 接続なしで、一つの model、offline の text、短時間で実行できます。短い公開済みまたは架空の status note を選びます。text、model、surface、time limit、reviewer を固定し、変えるのは instruction だけにします。

| round | instruction | 判定前に残すもの |
|---|---|---|
| A | 「この note から、次の action を三つ挙げてください。」 | 正確な output と経過時間 |
| B | 「この note だけを使って、次の action を三つ挙げてください。担当者または日付がなければ `[要確認]` と書き、事実を作らないでください。各 action を支える原文の一文を示し、なければ停止して不足を説明してください。」 | 正確な output と経過時間 |

各 output を、**事実を保ったか**、**不足情報を印したか**、**根拠の文章を追跡できるか**、**範囲を守ったか**、**安全に停止したか** の五項目で 0–2 点にします。prompt、input、output、score、差が出た理由を一文で保存します。text、model、tool、permission、条件が変わったら、勝者を決めず `not_comparable` と書きます。

これは個人の練習記録であり、benchmark data ではありません。B の output が良くても、別の固定 task で protocol を再び試す理由になるだけです。生産性向上、より賢い model、一般的な順位は示しません。

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
