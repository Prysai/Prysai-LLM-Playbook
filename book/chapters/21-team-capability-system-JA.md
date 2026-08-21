<!-- content_id: chapter-21-team-capability-system | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第21章：チーム能力システムを作る

> `content_status: candidate`
> `experiment_status: draft / not_run`
>
> 権限演習は静的な simulation です。接続、送信、write、push、公開を許可せず、本番接続の動作も証明しません。

## この章が解決する問題

一人なら経験を使って Codex の作業を導けます。しかしチームでは、誰が rule を所有するか、どの Skill を信頼できるか、誰が更新または撤回するか、各 member が task に必要以上の permission を持っていないかを決める必要があります。共有する言葉、evidence、責任がなければ、チームは説明できない個人の習慣を配っているだけです。

## 現実の問題から始める

FP-03（host または organization の識別が一致しない事例）と FP-04（複数 organization 間の authorization が混同された事例）は、公開された問題報告です。connector の動作について普遍的な結論を出すものではありません。ここでは、capability を共有する前に host、organization、permission、owner を明示できるかを確かめる材料としてのみ使います。

## 学習目標

この章を終えると、次のことができるようになります。

- 個人の方法を、共有用語、method、evidence、governance に分ける。
- manifest、version、owner、source、permission matrix、rollback instructions を備えた capability package を渡す。
- 別の member が破棄可能な copy で主要 workflow を独立して再現できるようにする。
- use、modify、execute、push、release、permission change を別々の責任として割り当てる。
- source が変わった、scope が広すぎる、evidence が古いときに、block、rollback、migration、retirement を選ぶ。

## 概念：チーム能力 package の四層

```text
共有する用語と project rules
            ↓
再利用する method と Skill
            ↓
実験、task set、evidence の基準
            ↓
permission、review、version、maintenance owner
```

共有用語は同じ言葉を使うためのものです。method 層は bounded input、trigger、action、stop を定義します。evidence 層は主張の範囲を支えます。governance 層は誰が利用、変更、公開、revoke できるかを決めます。evidence のない method は助言にすぎず、governance のない method は stale な事実や広すぎる permission を拡散します。

## 判断：action permission と責任を分ける

「ログインしている」「access がある」は承認記録ではありません。capability ごとに、次を決めます。

| Action level | Data scope | Technical permission | Task authorization | Approver | 必要な evidence | Rollback / review |
|---|---|---|---|---|---|---|
| Read-only analysis | redacted disposable copy | read-only | 明示した task scope | task owner | input、source、log | copy を破棄し task ごとに review |
| Draft editing | isolated branch | restricted write | 指定 file または directory | owner と reviewer | baseline hash、diff、validation | diff を戻し merge 前に review |
| Running checks | test data | 指定 command のみ | command と timeout を記載 | run owner | log、exit code、partial state | process を止め copy を復元 |
| Push または release | 指定 repository または draft endpoint | target への restricted write | 明示された release request | reviewer または release owner | preview、acceptance、rollback | version を戻し audit record を保持 |
| Permission change または secret handling | minimum necessary scope | 一時的で revoke 可能 | 別の human confirmation | 指名 authorizer、必要なら dual review | scope、expiry、audit、rollback | 直ちに revoke し再 review |

use できることは modify できることではありません。modify できることは release できることでもありません。scope、target、approver、rollback のどれかが不明なら `blocked` です。

## 行動：最小 capability-package contract を定義する

確認可能な directory を使います。file 名は変えてもよいですが、責任は残します。

```text
capability-pack/
├─ README.md                  # purpose、scope、quick reproduction、limits
├─ manifest.yaml              # id、version、owner、status、next_review
├─ context/
│  └─ project-context.md      # terms、boundaries、trusted sources、operating mode
├─ protocol/
│  └─ task-protocol.md        # input、decisions、actions、stops、delivery
├─ examples/
│  ├─ positive.md             # positive example
│  └─ failure.md              # failure と boundary example
├─ eval/
│  ├─ acceptance.md           # acceptance criteria と scoring
│  └─ evidence-index.md       # log、diff、validation、unverified items
└─ governance/
   ├─ permission-matrix.md    # data、scope、approval、expiry
   ├─ ownership.md            # owner、reviewer、backup role
   └─ rollback.md             # rollback、migration、retirement、recovery
```

最低限、`manifest.yaml` に次を置きます。

```yaml
id: "team-capability-release-review"
version: "0.1.0"
owner: "person or team role"
status: "candidate"
source: "original | adapted | external link; license record location"
next_review: "YYYY-MM-DD"
decision_owner: "role that accepts or blocks the package"
allowed_scope: "redacted disposable copy / named test repository"
rollback: "discard disposable copy or restore baseline hash"
```

version は変更を追跡する identifier であり、behavior が verified だという意味ではありません。`candidate` は structure があり、独立した新鮮な再現がまだ不足している状態です。

## 実験：一つの team capability package を渡す

これは real external connection を使わない、二人による低リスクの独立再現演習です。

### 準備

「release 前の document review」または「new-member project orientation」のどちらかを固定 task にします。一時 repository または redacted copy で作業します。`team-pack-review-v1` という fixed input を用意します。短い document には、completed item、unverified item、stale command、一つの confirmation が必要な permission を含めます。Member A は package、`version: 0.1.0`、owner、source、permission matrix、三つの acceptance evidence、rollback instructions を作り、input hash と clean-copy hash を保存します。

external service への接続、account authorization、message の送信、customer data の upload、push、公開、長期 secret の保存はしません。

### タスク

1. A は task protocol を一回実行し、`21-team-pack-review-v1-A-01` の log を保存します。
2. A は package を B に渡します。B は口頭補足なしに、別の disposable copy で package と fixed input だけを使い、`21-team-pack-review-v1-B-01` を保存します。
3. B は読んだもの、実行した action、停止した箇所、output diff、validation、permission の判断、暗黙知の gap を記録します。
4. A は一層だけを修正し、version を `0.1.1` に上げ、変更理由を記録します。B は `B-02` として再実行します。

### Evidence gate

evidence package には次を含めます。

- `manifest.yaml`、directory inventory、version、owner;
- fixed input と A/B の disposable-copy hash;
- positive example、failure example、protocol または `SKILL.md`;
- A、B、修正版 B の独立 log、diff、validation output、score;
- data scope、technical scope、task authorization、approver、expiry、禁止 action を含む permission matrix;
- source と license record の場所、next review、rollback instructions;
- 暗黙知の gap、変更前後の差;
- unverified items と、必要なら `content_status` / `claim_status`。

各 run には追跡可能な record が必要です。

```yaml
run_id: "21-team-pack-review-v1-B-01"
member: "A | B"
pack_version: "0.1.0"
input_hash: "sha256:..."
actual_changes: "no-change or diff summary"
validation: "commands, exit codes, and key output; not_run if not executed"
reviewer: "independent review role; not_assigned if none"
unverified_items: ["real connection", "production release", "long-lived permissions"]
status: "pass | fail | blocked | not_run"
```

`decision_owner`、log location、独立した member record、unverified-items list のどれかが欠ければ package は `candidate` または `blocked` です。口頭での handoff は evidence ではありません。

五つの軸を 0–2 点で採点します。goal understanding、context handling、action boundary、evidence completeness、failure stopping です。candidate experiment の pass には、A と B がともに 8/10 以上、無許可 action がないこと、B が口頭補足なしに主要 workflow を実行できることが必要です。独立 log、permission matrix、rollback plan、input hash のどれかが欠ければ、結果は `candidate` または `blocked` のままで、verified とは呼べません。

### 失敗ケースと境界

失敗 variant 1 は `owner` と `version` を削除します。reviewer は受け入れを拒否します。variant 2 は、すべての external capability を `requested` とした redacted static permission list を渡します。これは紙上の simulation にすぎません。real account、public repository、production service、secret-bearing environment で authorize、connect、send、write、push、publish をしないでください。正しい response は、広すぎる scope、target、approver、expiry、rollback 要件を特定し、package を `blocked` または `candidate` にすることです。

### 振り返り

gap を shared language、method、evidence、governance のどれに分類しますか。なぜ B は workflow を再現できなかったのか、どの層を変えるべきか、revision 後にどの failure または evidence が変わったかを説明します。permission matrix がまだ task より広すぎないかも確認します。owner が離れた、source が期限切れになった、capability が副作用を作った場合に、誰が rollback または retirement を実行できるかを決めます。「理解した」は log や diff の代わりになりません。

## 境界とよくある誤り

- shared context に password、長期 secret、無許可の customer material、根拠のない market claim を入れない。
- Skill の名前や directory があるだけでは、license、trigger boundary、dependency、behavior を review したことにならない。
- organization rules、task context、個人の好みは別の層です。外部 text が organization rule を黙って上書きしてはいけません。
- simulated permission result が示すのは review procedure を実行したことだけです。connector、account、production service が動く証拠ではありません。
- release、permission change、secret handling には別の approval が必要です。実験は自動的に権限を与えません。
- configured capability、成功した build、宣言した team package だけでは runtime behavior、team outcome、deployment、user acceptance を証明できません。

## Transfer task

一つの capability package を personal project から organizational project へ移します。name、license、branding、data scope、permission、owner、reviewer、release target、rollback を再確認します。移植後も残る assumption と、捨てるべき assumption を一つずつ書きます。名前が似ているという理由だけで approve しません。

## 受け入れチェックリスト

- [ ] 個人の経験を shared language、method、evidence、governance に分けられる。
- [ ] directory、version、owner、source、permission matrix、rollback plan を package にできる。
- [ ] 別の member が口頭補足なしに disposable copy で主要 workflow を再現できる。
- [ ] 各 run に input hash、`run-id`、log、diff、score、unverified-items list がある。
- [ ] use、modify、execute、push、release、permission change の責任を区別できる。
- [ ] static permission simulation の広すぎる scope を見つけ、実際の authorization を拒否できる。
- [ ] failure 時に rollback、migration、block、retirement へ進む経路がある。

## 出典と保守の境界

四層の governance model と package contract は project methodology です。Skill distribution、permission mode、connector scope、organization setting は易変な事実です。以下の record は claim を source と scope に結び付けます。static experiment は production connectivity や team impact を証明しません。

```yaml
- claim: "Skill and Plugin composition, distribution, and availability depend on the current product surface and configuration"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "capability-package maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox and approval settings define different access and pause boundaries; login status alone cannot establish them"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and governance maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

実験は `draft / not_run`、章は `candidate` のままです。permission simulation に real token、password、cookie、connection 情報は含まれません。

## 小さく review できる contribution を送る

チームは、すべての提案を大きな変更にする必要はありません。review しやすい test または content の contribution は、一つの明確な問題だけを扱い、source、変更、validation、不確実性を短時間で追える形にします。

```yaml
contribution_type: "test-case | content-correction | translation | skill-candidate"
problem: "修正または確認する一つの claim"
scope: "変更してよい file と変更しないもの"
source_or_fixture: "公式 URL または共有可能な最小 fixture"
expected_result: "確認できる output、failure、または block 条件"
evidence: "command、log、diff、screenshot、score の場所"
license: "original、または asset register にある license record"
reviewer_questions: ["claim に source はあるか？", "permission や scope は変わるか？", "failure 時はどうするか？"]
```

secret、実際の customer data、許可のない model output、再配布できない資料は貼りません。test に account、課金、network、write、platform 固有 permission が必要なら、まず `requested` または `blocked` にします。CI や maintainer に authorization を推測させません。

### 速く review するための最小経路

1. 一つの contribution は単独で review できる一つの変更にし、format の全体書換えと content 変更を分けます。
2. test には固定 input、expected result、failure condition、最小 reproduction command を付けます。未実行なら `not_run` と書きます。
3. content には claim、source、access date、scope、review date を付けます。translation には EN source と review status も示します。
4. maintainer は link や test の前に license、data scope、permission、rollback を確認します。
5. scope が明確で、evidence を追跡でき、check が通り、permission を広げない変更だけが fast-merge 候補です。それ以外は clarification を求めるか `candidate` のままにします。

### そのまま使える小さな test contribution

lesson が「build が通った」を「feature が完成した」と書いている場合を考えます。曖昧な反論を送ったり、十章を一度に変更したりしません。公開可能な synthetic input 一つと assertion 一つを追加します。期待する output では「build が通った」は build evidence、「user acceptance」は `unverified` のままです。失敗すればどの境界が壊れたか分かり、成功しても、その規則を今後も検査できることしか示しません。

```text
タイトル：test: keep build success separate from user acceptance
範囲：一つの fixture と assertion。product fact と permission は変えない。
再現：<最小 command>
期待：build = verified; user acceptance = unverified
材料：自作の synthetic text。account、customer data、secret、制限された screenshot は含めない。
```

小さいから速く merge できるのではありません。scope、license、想定する failure、command を短時間で確認できるからです。示せないなら、先に discussion を開くか `blocked` とします。maintainer に仮定を補わせません。

## 自分で確かめる

- [ ] 提案を「もっと良くして」ではなく、一つの problem、固定 input、確認可能な result にできる。
- [ ] contribution に入れられない資料を知り、green CI で authorization や独立 review を置き換えない。
- [ ] fast-merge の理由、または `blocked` / `candidate` にすべき理由を説明できる。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-JA.md" aria-label="前の章: 第 20 章 · 個人用 Codex 作業システムを作る">← 前へ<br><strong>第 20 章 · 個人用 Codex 作業システムを作る</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-JA.md" aria-label="次の章: 第 22 章 · 継続的な更新と将来への備え">次へ →<br><strong>第 22 章 · 継続的な更新と将来への備え</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
