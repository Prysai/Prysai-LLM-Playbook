<!-- content_id: chapter-20-personal-codex-work-system | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第20章：個人用 Codex 作業システムを作る

> `content_status: candidate`
> `experiment_status: draft / not_run`
>
> この章は移植可能な方法を示します。製品の memory、auto-load、entry point の動作を恒久的な前提にはしません。

## この章が解決する問題

多くの人は Codex を開くたびに、project、goal、用語、制約、受け入れ条件を最初から説明します。その結果、context が不整合になり、決定を追えず、古い command を繰り返し使い、役立つ経験を次の task に持ち越せません。さらに危険なのは、個人の便利な記録を memory store と勘違いし、そこへ token、password、cookie、customer text、未確認の結論を入れてしまうことです。

## 現実の問題から始める

FP-10（validation や formatting command が止まったように見える事例）と FP-11（検証が、許可されていない永続的な環境変更へ広がったと報告された事例）は、公開された利用者問題の調査記録です。どちらもこのプロジェクトでの再現でも、普遍的な根本原因の確定でもありません。ここでは、個人用作業システムが古い command を露出し、停止点を記録し、許可なしの scope 拡大を防げるかを考えます。

## 学習目標

この章を終えると、次のことができるようになります。

- project rules、task context、current state、再利用可能な template、reflection record を分ける。
- 繰り返し作業のために、小さく、削除でき、追跡可能な個人用 package を作る。
- 固定 input、hash、run log、evidence completeness を使い、system-assisted path と baseline を比較する。
- task protocol を残す、Skill candidate を作る、観測を続ける、block する、の判断を分ける。
- 古い context を見つけ、秘密を保存せずに他者へ方法を移す。

## 概念：五つの asset と五つの役割

| Asset | 答える問い | Lifecycle | 入れないもの |
|---|---|---|---|
| Project rules | 常に守るべきことは何か | version 管理し、意図的に変更し、定期 review | 一時的な推測と個人の秘密 |
| Task context | 今回は何をするのか | task ごとに作り、終了後 archive | 無関係な履歴 |
| Current state | 何を読み、変え、検証し、block したか | checkpoint ごとに更新 | 結果のように見せた plan |
| Template | 似た task をどう開始し、納品するか | 繰り返し実践後に抽出 | 未検証の永久結論 |
| Reflection record | 何が働き、失敗し、次に何を変えるか | 移植可能な学びだけ残す | token、password、cookie、customer text、不必要な個人データ |

context は長いほど良いわけではありません。長さより relevance、信頼性、機微性、鮮度を優先します。

## 判断：Skill にするか、task protocol のままにするか

再利用する asset を作る前に、この decision card を埋めます。繰り返したという事実だけでは足りません。

| 観測 | 決定 | 必要な証拠 |
|---|---|---|
| 一回限り、または input と output がまだ変化中 | task protocol を維持 | 一つの task の input、制約、決定、納品記録 |
| input、判断点、output が安定し、正例と失敗例がある | Skill candidate を作る | 少なくとも三回の run、failure set、transfer task |
| 方法は有用だが trigger 境界または副作用が不明 | 観測を続けるか block | gap record、risk statement、保留中の validation 項目 |
| secret、外部 write、本番 release が関係し、許可または rollback が不明 | Block | permission matrix、人の承認点、rollback plan |

最低限、`decision_id`、繰り返す task、candidate asset、安定した input、failure type、evidence の場所、owner、`next_review`、`decision_action` を記録します。偶然の一回の成功を Skill の根拠にしてはいけません。

## 行動：最小の個人用作業 package を組み立てる

最初は project map、task protocol、state log、evidence index、reflection record の五つで十分です。開始時に rules、branch、current state、permission を確認します。実行中は必要な context だけを持ち、納品時には実際に検証したものと未完了のものを分けます。reflection では、他の人が理解して試せる規則だけを取り出します。

納品 record には次を含めます。

- 完了した項目と変更した file;
- 実際に実行した command、test、inspection と、その結果および可能なら exit code;
- 未検証、block、許可された scope 外の項目;
- risk と具体的な recovery 方法;
- 次の review または decision の owner。

製品が何を記憶するか、どの file を読み込むか、entry point がどう動くかは易変な製品事実です。現在の一次資料と、実際に許可された surface を確認し、個人の習慣を製品保証に変えないでください。

### AI 支援プログラミングの継続 kit

古い conversation は project state ではありません。再利用する rules、今回の task、実際に起きたことの evidence を別々に保ちます。小さな kit で足ります。

```text
AGENTS.md などの review 済み project-rules file：ローカル規則、command、禁止行動、受け入れ条件。
Task brief：この task の goal、対象 path、許可された action、non-goal、stop rule。
Checkpoint：現在の branch/worktree、変更 file、開始・完了した command、決定、失敗、次の安全な action。
Evidence receipt：diff、test output、browser URL または screenshot、source record、reviewer、未検証の claim。
```

これらの名前は役割であって、すべての製品にある機能名ではありません。client ごとに project instruction の発見方法が違うことがあるため、公式資料と実際に読み込まれた file を確認します。四つの record のどれにも secret、cookie、private customer material、未 review の model conclusion を入れません。

recovery の境界には version control を使います。commit や branch は code state ですが、conversation の fork、chat の archive、別 session の開始は code rollback ではありません。危険な変更の前に current commit と working-tree status を記録します。小さな slice を受け入れたら diff を確認し、観測可能な結果を表す message で commit します。並行作業では別 worktree または明示的に分離した copy を使い、parallel message が独立だと決めつけず merge を review します。

大きな変更では編集前に affected file、依存関係、failure case、test command、runtime check、rollback target を並べます。探索用 session は read-only にし、出力を task brief に明示的に移したときだけ採用します。中断、capacity exhaustion、evidence を出さない command が起きたら、次の request の前に state を凍結し checkpoint を書きます。新しい prompt だけでは、未知の partial state は直りません。

automation、browser control、mobile access、plugin、computer-use surface も同じ判断規則に従います。schedule、connection、preview、model proposal は write、publication、外部 action が起きた証拠ではありません。まず local または draft target、最小 permission、人の明示的な承認点、idempotency または rollback plan、receipt を用意します。real account や公開 release へ進むのは、その新しい権限を別途承認し、検証した後です。

## 実験：個人用作業システムを確立する

これは破棄可能な copy で行う offline 比較です。production へ接続せず、message を送らず、公開せず、real secret を読まず、外部 write をしません。

### 準備

一時 copy と `personal-system-triage-v1` という baseline を作ります。次の固定された、redacted input を使います。

```text
Items to triage:
1. “A button overflows on a narrow screen.” A screenshot exists; no fix has been made.
2. “The build passes.” There is only a command exit code; no user acceptance exists.
3. “Authentication fails.” The version, entry point, and error log are missing.
4. “The copy needs an update.” The audience and source are missing.
```

固定 task 文は次のとおりです。

> 四つの項目を「input がさらに必要」「実行できる」「人の確認が必要」に分類してください。不足している version、permission、user acceptance を推測しないでください。各項目について、次の step と必要な evidence を書いてください。

どちらの path も開始する前に input hash と clean temporary copy の hash を保存します。`project-map`、`task-protocol`、`state-log`、`evidence-index`、`reflection` という空の record を作ります。token、password、cookie、customer text、不必要な personal data は入れません。

### タスク

1. **Baseline A：** 固定 task と input だけを渡します。五つの personal work-system record は使いません。
2. **Candidate B：** 五つの record を使い、package を `personal-system-v1` と名付けます。何を読み、変え、検証し、検証できず、block したかを記録します。
3. 各 path を二回ずつ実行します。各 run の前に同じ input と temporary-copy baseline を復元します。`run-id` は `20-personal-system-triage-v1-A-01`、`A-02`、`B-01`、`B-02` を使います。
4. 接続、write、公開、secret の読み取りはしません。task がそれを必要とするなら run を `blocked` とし、simulation から usability を推測しません。

### Evidence gate

run ごとに一つの record を保存します。

```yaml
run_id: "20-personal-system-triage-v1-B-01"
task_id: "personal-system-triage-v1"
system_version: "none | personal-system-v1"
input_hash: "sha256:..."
baseline_hash: "sha256:...; restored temporary-copy baseline"
context_files: ["project-map", "task-protocol", "state-log", "evidence-index", "reflection"]
clarification_rounds: 0
actual_changes: "no-change or file/diff summary"
validation: "checks, results, and exit codes; not_run if not executed"
evidence_items: ["input", "classification", "missing-input rationale", "next step", "validation", "unverified note"]
evidence_completeness: "0/6"
rework_count: 0
log_location: "evals/results/; not_run if no run exists"
reviewer: "independent review role; not_assigned if none"
unverified_items: ["actual entry-point behavior", "account-level permissions", "runtime result"]
status: "pass | fail | not_comparable | blocked | not_run"
```

比較表には、説明の繰り返し回数、clarification rounds、不足 input の発見までの時間、rework 回数、evidence completeness、分類 error、実際の elapsed time を含めます。evidence completeness は六つの必須資料のうち確認できる割合です。baseline または input hash が違えば `not_comparable` とし、差を improvement と呼びません。

四つの log がすべてそろい、secret や外部副作用がなく、分類と停止理由が acceptance checklist を満たしたときだけ、candidate path は実験 pass の候補になります。それでも Skill が `verified` になったわけではありません。

### 失敗ケースと境界

project map に、意図的に stale な command と古い directory を一つずつ static fixture として加えます。正しい対応は current state を確認し、record を `stale` として、古い command の再利用を止め、state log に gap を書くことです。stale record のコピー、認証情報の捏造、permission の拡大、plan を verification として提示する行為は実験失敗です。失敗 log は削除しません。

### 振り返り

`reflection` record で次に答えます。

- どの context item が実際に判断を変えたか。
- どの record がすでに stale だったか。
- どの evidence がまだ足りないか。
- baseline と candidate path の差を何が説明するか。
- 次回に何を削除、保持、更新するか。
- 別の領域へ移せる lesson は何で、限界はどこか。

答えた後、decision card を更新します。「注意することを忘れない」は移植可能な規則ではありません。

## 境界とよくある誤り

- 増え続ける context は、古い事実と新しい goal を混ぜます。
- 個人 record は secret storage ではなく、permission review の代わりにもなりません。
- 「command が始まった」は validation 完了ではありません。「以前その account を使えた」ことも、現在の entry point と scope が正しい証拠ではありません。
- 一回限りの request なら、新しい Skill より task protocol の方が軽いことが多いです。
- 独立した再現、failure set、transfer evidence がなければ、Skill は `candidate` のままです。
- 設定された product feature、覚えている conversation、成功した build だけでは、現在の runtime behavior、team impact、deployment、user acceptance を証明できません。

## Transfer task

安定した個人 workflow を別の member に渡します。二人目は project map、task protocol、evidence index だけを使い、口頭補足なしで破棄可能な copy 上で作業します。input hash、run log、diff、acceptance result、missing-evidence list を保存します。書かれていなかった暗黙知を記録し、どの asset を修正するか決めます。

## 受け入れチェックリスト

- [ ] rules、task context、state、template、reflection を区別できる。
- [ ] record に token、password、cookie、customer text、不必要な personal data がない。
- [ ] 同じ input と baseline で二つの path を比較できる。
- [ ] 各 run に `run-id`、log、evidence completeness、unverified-items list がある。
- [ ] Skill を作る、protocol を残す、観測する、block する、を区別できる。
- [ ] stale な command を特定し、recovery 方法を説明できる。
- [ ] 別の人が口頭補足なしに重要な判断を再現できる。

## 出典と保守の境界

context、evidence、reflection の方法はプロジェクトの methodology です。product entry point、Skill invocation と distribution、automatic loading、permission mode、product feature は易変な事実です。以下の record は source boundary を定めるもので、すべての account や runtime の動作を証明しません。

```yaml
- claim: "Skill invocation and distribution must be checked against the current official Skills and Plugins documentation and the authorized entry point"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "curriculum maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Permission and approval boundaries depend on the operating surface, sandbox, and approval configuration; they cannot be inferred from one session"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and curriculum maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

この章は、memory feature が存在すること、特定の分類を自動保存すること、特定の account で利用できることを主張しません。後からそのような claim を加えるなら、直接の source、scope、access date、owner、review record が必要です。章の status は `candidate`、実験は `draft / not_run` のままです。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-JA.md" aria-label="前の章: 第 19 章 · モデルとワークフローを評価する">← 前へ<br><strong>第 19 章 · モデルとワークフローを評価する</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="21-team-capability-system-JA.md" aria-label="次の章: 第 21 章 · チーム能力システムを作る">次へ →<br><strong>第 21 章 · チーム能力システムを作る</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
