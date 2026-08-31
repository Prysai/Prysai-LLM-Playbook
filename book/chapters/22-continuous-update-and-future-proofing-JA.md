<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第22章：継続的な更新と将来への備え

> `content_status: candidate`
> `experiment_status: draft / not_run`
>
> 演習は破棄可能な copy または隔離 branch だけで行います。本番 access、実際の credential、push、release、外部の一括置換は使いません。

## この章が解決する問題

Codex の entry point、model、reasoning 設定、permission、Skill distribution、外部 service は変わります。source、scope、確認日、migration plan、rollback path がない workflow は、数か月後には誤解を招くかもしれません。継続的な保守は、新機能をすべて追いかける競争ではありません。何が安定し、何が易変で、何を再確認し、古い版をいつ維持、block、migration、retire するかを規律をもって決める方法です。

## 現実の問題から始める

FP-01（authentication flow の regression）、FP-06（Skill discovery の境界）、FP-10（validation command が止まったように見える事例）は、公開された利用者報告です。現在の一次資料やローカル再現の代わりにはなりません。ここでは impact analysis、version decision、停止、rollback を練習する入口として使います。

## 学習目標

この章を終えると、次のことができるようになります。

- stable principles、product usage、domain methods、instance facts を分ける。
- 易変な各 claim に `claim`、source、access date、scope、owner、review date、`claim_status` を記録する。
- model、tool、Skill が変わったとき、impact matrix と最低限の migration / rollback plan を作る。
- `current`、`stale`、`disputed`、`removed` と、`draft`、`candidate`、`verified`、`production-ready` を混同しない。
- evidence と maintenance responsibility を使って、維持、更新、block、migration、retirement を決める。

## 概念：寿命の違う四つの層

| Layer | 例 | 保守方法 |
|---|---|---|
| Stable principles | context は理解に影響し、tool は action space を変え、evidence は完了 claim を支える | teaching、experiment、boundary review |
| Product usage | Codex entry point、Skill invocation、permission mode、configuration | 該当する一次資料で再確認 |
| Domain methods | engineering、research、marketing、documentation、data workflow | practice task と human review |
| Instance facts | model ID、price、quota、parameter、third-party API behavior | 日付付き source に結び、必要なら migration または削除 |

「current である」と「章が verified である」は同じではありません。namespace を明示します。

- content maturity：`content_status: draft | candidate | verified | production-ready`;
- 変動する claim：`claim_status: current | stale | disputed | removed`;
- 実行観測：`planned | authorized | executed | verified | not_run`。

## 判断：更新、維持、block、retire

| Evidence の状況 | Claim status と action | Exit condition |
|---|---|---|
| 権威ある source があり、scope が一致し、関連 evaluation が通る | `current`；説明を維持または更新 | source、review date、影響先を記録 |
| source が衝突、account scope が不明、または観測が source と食い違う | `disputed`；断定的な文を停止 | unknown と review owner を記録し、firm conclusion を公開しない |
| source が利用できず、代替 evidence もない | `stale`；警告または一時停止 | 古い claim を現行として書かない |
| license または security 条件が capability を許さず、安全な代替もない | `removed`；retire | migration note と recovery 情報を残す |
| 互換する replacement があり、migration と evaluation が通る | `current`；migration note を公開 | 古い scope、replacement path、evidence、次回 review を示す |

変更を見つけたからといって、全体を書き直してよいわけではありません。まず impact を調べます。owner、evidence、rollback target のどれかがない変更は `blocked` です。

## 行動：claim record、impact matrix、update flow

易変な事実には次の固定 field を使います。

```yaml
claim: "Current claim"
source: "Official or other authoritative URL"
checked_at: "YYYY-MM-DD"
applies_to: "Product, version, region, account, or organization scope"
owner: "Maintainer or team role"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

更新の流れは次のとおりです。

```text
change を発見
    → impact と risk を分類
    → affected chapter、Skill、Lab、task set、prompt、permission を特定
    → source を読み、または限定した runtime evidence を集める
    → 最小で安全な変更を行う
    → 関連 check と evaluation を再実行
    → fresh context で review
    → release、旧版維持、migration、block、retire を選ぶ
```

model または Skill の migration では、first-pass behavior、error type、context、tool、permission、trigger、output format、license、maintainer、failure recovery を再確認します。source の更新は、宣言された scope 内の claim を更新するだけで、account-level access、runtime behavior、deployment、team outcome を証明しません。

## 実験：仮想の製品変更を処理する

これは破棄可能で可逆な update drill です。実際の製品を操作しません。

### 準備

一時 copy または隔離 branch に `update-impact-demo-v1` という fixture を作ります。次の redacted claim だけを入れます。

```yaml
claim: "The example tool entry was described as supporting action X on 2026-08-01"
source: "https://example.invalid/public-doc"
checked_at: "2026-08-01"
applies_to: "Example learning fixture only; not a real product claim"
owner: "exercise maintainer"
next_review: "2026-11-01"
claim_status: "disputed"
```

`example.invalid` は意図的に利用できない domain です。access、instruction の実行、実製品の evidence 扱いはしません。target file の SHA-256、baseline directory inventory、変更前 diff、run ID を保存します。production、real credential、push、release、bulk replacement、external service connection は使いません。

### タスク

maintainer が「action X の公開説明が変わった」という notice を受けたが、二つ目の信頼できる source がないと想定します。一時 copy だけで次を行います。

1. claim を `disputed` のままにし、断定的な teaching wording を停止します。
2. 次の五つ以上の consumer を持つ impact matrix を作ります。

   | Consumer | Affected content | Risk | Required action | Evidence | Owner | Status |
   |---|---|---|---|---|---|---|
   | Chapter | claim と example | reader の誤解 | 最小 rewrite | source または diff | content maintainer | pending |
   | Skill | trigger または output | 誤った action | stop または migration | evaluation log | Skill owner | pending |
   | Lab | input または pass criterion | 無効な比較 | fixture を更新 | run ID または score | evaluation owner | pending |
   | Permission note | scope または approval | 過剰な権限 | static review | permission matrix | security owner | pending |
   | Task set | task または禁止 action | regression gap | 新しい version | task result | evaluation owner | pending |

3. paper fixture 内で必要な claim status と説明 note だけを変更します。未検証の replacement behavior を事実として書きません。
4. 関連する configured check または static check だけを実行し、command、exit code、output を記録します。何も実行しなければ `not_run` と書きます。
5. `run-id: 22-update-impact-demo-v1-01`、変更前後の diff、unverified items、rollback action を残し、update decision card を完成させます。

decision card には `decision_owner`、`delivery_target`（この演習では temporary copy のみ）、`reviewer`、`rollback_target` を含めます。どれかが欠けたら `blocked` のままです。紙上の status 変更は、update loop 完了の証拠ではありません。

### 証拠ゲート

evidence package には claim YAML、source snapshot または unavailable-source record、access date と scope、impact matrix、before/after hash、diff、check output、status transition の理由、unverified-items list、owner、next review、rollback instructions を含めます。必須十項目は次のとおりです：claim、source、scope、owner、`next_review`、baseline hash、after hash/diff、impact matrix、validation log、unverified list。どれか一つ欠ければ update loop は完了していません。

rollback は production access なしに実行できなければなりません。pre-change hash から temporary copy を復元するか、copy または branch を捨てます。before/after diff と result は残します。「ファイルが元に見える」は rollback evidence ではありません。

### 失敗ケースと境界

task set、scope、source、permission、migration note を更新せず、新しい model または action 名を全 document に置き換えることで、意図的に失敗させます。方法を停止し、失敗 diff を temporary copy に残し、baseline hash を戻し、見落とした downstream consumer を impact matrix に追加します。source が衝突、license が不明、owner がいない、evaluation が未実行なら、claim は `disputed` または `stale`、work は `blocked` のままです。公開しません。

### 振り返り

どの layer が変わりましたか。どの source が最も重要でしたか。どの downstream consumer を見落としましたか。まだ検証されていない unknown は何ですか。status はなぜ `current`、`stale`、`disputed`、`removed` のどれですか。次の review owner と trigger は何ですか。risk を減らすために削除できる変更はどれですか。実際の hash、diff、log、または明示した `not_run` を引用します。plan だけでは evidence になりません。

## 境界とよくある誤り

- directory が大きくなっただけでは capability system が改善した証拠になりません。新しい capability には evidence、value、coverage のいずれかが必要です。
- accessible な公式 source は、local entry point、account、organization で feature が有効だという証拠ではありません。
- user report は research entry であり、自動的に公式 root cause にはなりません。
- 名前の一括置換は impact analysis、evaluation、permission review、license review の代わりになりません。
- `claim_status: current` は宣言された scope 内に current source があるという意味だけです。chapter、Skill、experiment、deployment、runtime が `verified` という意味ではありません。
- successful build、準備済み package、文書化された migration は、実際の evidence がない限り production behavior や team effect の証拠ではありません。

## 転移課題

実在するが redacted な外部 Skill candidate を一つ選びます。claim record と impact matrix を使い、unreviewed から `blocked` または adaptation candidate へ移します。license、dependency、trigger、permission、risk、owner、evaluation evidence の何が不足しているかを書きます。名前が適切に見えるだけで approve しません。

## 受け入れチェックリスト

- [ ] stable principles、product usage、domain methods、instance facts を区別できる。
- [ ] すべての易変 claim に `claim`、`source`、`checked_at`、`applies_to`、`owner`、`next_review`、`claim_status` がある。
- [ ] impact matrix で chapter、Skill、Lab、task set、permission note の downstream effect を探せる。
- [ ] claim status と content maturity の違いを説明できる。
- [ ] update drill の hash、diff、log、rollback、unverified items を破棄可能な copy または隔離 branch に残せる。
- [ ] 全体置換ではなく、旧版維持、block、migration、retire を選ぶべき時を判断できる。
- [ ] 次回 review owner と trigger を言える。

## 出典と保守の境界

lifecycle、impact matrix、rollback、evidence gate は project methodology です。model name、ID、entry point、reasoning setting、Skill behavior、permission boundary は易変な製品事実なので、現在の一次資料で再確認します。

```yaml
- claim: "Model names, IDs, entry points, reasoning settings, and availability are governed by the current official Models documentation"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "Codex and ChatGPT entry points, account scope, and version scope stated by the official documentation"
  owner: "content and model-evaluation maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Skill discovery, invocation, distribution, and Plugin composition are volatile product facts"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "Skill maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox, approval, and security boundaries must be checked against current documentation and actual authorized configuration"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and governance maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

この project の update process は [`docs/governance/content-lifecycle.md`](../evidence-library-JA.md#method-and-status) にも記録されています。この章は `candidate`、演習は `draft / not_run` のままです。上の `claim_status` はどちらの結論も変更しません。

## 公開前の最小更新カード

新しい名前や page screenshot を見つけても、書籍全体を一括置換しません。rollback できる card で変更を狭め、なぜその範囲だけを変えるのか、まだ何を言えないのかを次の maintainer に渡します。

```yaml
update_id: update-22-example
trigger: "source にアクセスできない、または scope が現在の説明と矛盾する"
claim_status_before: disputed
affected_units: ["chapter", "lab", "skill", "permission-note", "task-set"]
safe_action: "断定を止め、temporary fixture の status と note だけを変える"
validation: "関連 static check、または not_run"
unverified: ["実際の account behavior", "production permission", "learner effect"]
rollback_target: "temporary copy の baseline hash"
release_decision: blocked
```

`release_decision: blocked` は失敗ではありません。second source、owner、evidence、rollback がないとき、推測を公開版へ入れないための決定です。未確認項目が実際の evidence で閉じて初めて状態を変えます。

## 小実験：全体置換を拒む

架空の model または tool 名を、temporary fixture の五つの consumer（chapter、Lab、Skill、permission note、task set）に置きます。名前を変える前に、各出現を stable principle、product usage、domain method、instance fact に分類します。

1. source review の対象は instance fact だけです。stable principle を製品名の変更で書き直しません。
2. 各 consumer に固有の risk と minimal action を付けます。「全文置換」は impact analysis ではありません。
3. source、license record、rollback のない consumer は `blocked` のままです。他ページの pass で補えません。
4. fixture を一つだけ変更し、diff を保存し、最後に baseline を戻すか temporary copy を捨てます。

## 自分で確かめる

- [ ] 任意の易変 claim について trigger、impact、minimal action、unknown、rollback target を書ける。
- [ ] source refresh、file の存在、green CI を runtime、learner effect、verified release に言い換えていない。
- [ ] 「更新に追いつく」ための全体置換より、release を止めるべき時を判断できる。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-JA.md" aria-label="前の章: 第 21 章 · チーム能力システムを作る">← 前へ<br><strong>第 21 章 · チーム能力システムを作る</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
