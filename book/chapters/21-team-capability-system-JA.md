<!-- content_id: chapter-21-team-capability-system | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第21章: チーム能力システムを作る

**状態:** `candidate`。**実験:** `draft / not_run`。これは静的なシミュレーションであり、接続、送信、書き込み、push、公開を許可せず、本番接続の動作も証明しません。

## この章が解決する問題

一人なら経験でCodexの作業を導けます。しかしチームには、誰がルールを持つか、どのSkillを信用するか、誰が更新・撤回するかが必要です。共有した言葉、方法、証拠、責任がなければ、チームは説明できない個人の癖を配っているだけになります。

## 能力パッケージの四層

```text
共有する用語とプロジェクト規則
            ↓
再利用する方法とSkill
            ↓
実験、タスクセット、証拠の基準
            ↓
権限、レビュー、版管理、保守責任
```

方法だけでは不十分です。証拠は主張の範囲を定め、ガバナンスは利用、変更、公開、取り消しの担当を定めます。

## 判断: 権限と作業承認を分ける

| 行為 | 安全な範囲 | 承認 | 証拠と復旧 |
|---|---|---|---|
| 分析 | 匿名化した読み取り専用コピー | タスク所有者 | 入力とログ; コピーを破棄 |
| 下書き編集 | 隔離ブランチと指定ファイル | 所有者とレビュアー | hash、diff、検証; diffを戻す |
| チェック実行 | テストデータと指定コマンド | 実行担当 | logと終了コード; プロセスを止める |
| push/release | 指定リポジトリまたは下書き先 | レビュアーまたはrelease担当 | preview、受入、rollback; 版を戻す |
| 権限変更/秘密 | 最小・一時・取り消し可能 | 指名承認者 | 範囲、期限、監査; 直ちに取り消す |

ログイン済みやアクセス可能という事実は、タスク承認ではありません。範囲、対象、承認者、rollbackが不明なら `blocked` です。

## 行動: 最小パッケージ契約

```text
capability-pack/
├─ README.md                  # 目的、範囲、再現、限界
├─ manifest.yaml              # id、版、所有者、状態、次回レビュー
├─ context/project-context.md # 用語、境界、信頼できる情報
├─ protocol/task-protocol.md  # 入力、判断、行動、停止
├─ examples/                  # 成功例と失敗例
├─ eval/                      # 受入基準と証拠索引
└─ governance/                # 権限、責任、rollback
```

manifestには `id`、`version`、`owner`、`status`、出典とライセンス、次回確認日、許可範囲、rollbackを置きます。版番号は変更を追えるようにするもので、検証済みの証明ではありません。

## 学習目標

別の人が暗黙の権限拡大なしに確認、停止、再現できるよう、チーム用パッケージを境界づけられる。

## 現実の問題

green build、見慣れた Skill directory、既存 account は、承認や user acceptance を示しません。誰がどの範囲で何を行い、何を証拠にするかをチームで明示する必要があります。

## 実験: 二人で渡して再現する

### 準備

二つの破棄可能なコピー、synthetic input、version、空の permission matrix を用意します。account、upload、push、長期 secret は使いません。

### タスク

A が小さな document review を記録し、B が口頭説明なしで別コピーに再現します。許可が不明なら止め、一層だけ変更して比較を繰り返します。

### 証拠

input hash、version、読んだ file、実変更、command と exit code、diff、reviewer、未知事項、status を保存します。

## 移行タスク

同じパッケージを短い語学練習に移します。一人が目標と訂正境界を定め、もう一人が見える試行と遅延した想起を確認します。一度の流暢な会話を習得とは呼びません。

## 受け入れチェックリスト

- [ ] package の owner、version、scope、rollback を確認できる。
- [ ] 別の人が口頭補足なしで停止点を再現できる。
- [ ] 権限、実行、公開、ユーザー受入を別の証拠として扱う。

## 出典と保守の境界

チーム契約、evidence、rollback は安定した方法です。product permission、connector、surface は変わるため、現在の公式情報とローカル承認を確認します。

一時リポジトリで「release前の文書レビュー」か「新メンバーのプロジェクト案内」を固定タスクにします。入力には完了項目、未確認項目、古いコマンド、確認が要る権限を入れます。Aは実行してhashとlogを残します。Bは口頭説明なしでパッケージと同じ入力だけを別コピーで使い、読んだもの、行為、停止箇所、diff、検証、暗黙知の不足を残します。Aは一層だけ直して `0.1.1` にし、Bが再実行します。

実サービスへ接続せず、データのアップロード、送信、push、公開、長期秘密の保存をしません。各runには `run_id`、担当者、版、入力hash、実変更、コマンドと終了コード、レビュアー、未検証項目、状態が必要です。候補の合格は、二人が理解、文脈、行為境界、証拠、失敗停止の五項目で8/10以上、無許可行為なし、口頭補足なしの再現です。不足があれば `candidate` または `blocked` のままです。

## 失敗例と振り返り

`owner` と `version` を消したパッケージは拒否します。すべての外部機能を静的リストで `requested` と書いても、実際の許可ではありません。範囲、対象、承認者、期限、rollbackを求めて停止します。欠けた点を共有用語、方法、証拠、ガバナンスに分類してください。「理解した」はlogやdiff、独立再現の代わりになりません。

## 受入チェック

- [ ] 個人の経験と共有する用語、方法、証拠、ガバナンスを分けられる。
- [ ] 版、所有者、出典、権限、rollbackを含むパッケージを作れる。
- [ ] 別の人が口頭補足なしで主要手順を再現できる。
- [ ] 各runにhash、log、diff、検証、未検証項目がある。
- [ ] 広すぎる権限やreleaseを止められる。

権限、接続、製品画面は変わる事実です。現行の公式資料を確認してください。この章は `candidate` のままであり、シミュレーションは本番接続やチーム成果を証明しません。

## すばやく review できる contribution を送る

チームは、すべての提案を大きな変更にする必要はありません。review しやすい test または content の PR は、一つの明確な問題だけを扱い、source、変更、validation、不確実性を数分で見つけられる形にします。

```yaml
contribution_type: "test-case | content-correction | translation | skill-candidate"
problem: "修正または確認する一つの claim"
scope: "変更してよい files と、変更しないもの"
source_or_fixture: "公式 URL または共有可能な最小 fixture"
expected_result: "確認できる output、failure、または block 条件"
evidence: "command、log、diff、screenshot、score の場所"
license: "original、または asset register にある license record"
reviewer_questions: ["事実に source はあるか？", "permission や scope は変わるか？", "failure 時はどうするか？"]
```

secret、実際の customer data、無許可の model output、再配布できない資料は貼りません。test に account、課金、network、write、platform 固有 permission が必要なら、まず `requested` または `blocked` にします。CI や maintainer に authorization を推測させません。

### すばやく merge するための最小経路

1. 一つの PR には単独で review できる一つの変更だけを入れ、format の全体書換えと content 変更を分けます。
2. test には固定 input、expected result、failure condition、最小 reproduction command を付けます。未実行なら `not_run` と書きます。
3. content には claim、source、access date、scope、review date を付け、translation には EN source と review status も示します。
4. maintainer は link や test の前に license、data scope、permission、rollback を確認します。
5. scope が明確で、evidence をたどれ、check が通り、permission を広げない変更だけが fast merge の候補です。それ以外は clarification を求めるか `candidate` のままにします。

### そのまま使える小さな test PR

たとえば lesson が「build が通った」を「機能が完成した」と書いているとします。曖昧な反論を送ったり、十章を一度に変えたりしません。小さな PR を作り、公開できる synthetic input を一つ追加します。期待する出力では「build が通った」は build の evidence、「user acceptance」は未確認のままです。失敗すれば maintainer はどの境界が壊れたか分かり、成功してもその規則が検査され続けることしか示しません。

```text
タイトル：test: keep build success separate from user acceptance
範囲：一つの fixture と assertion。製品の事実も permission も変えない。
再現：<最小 command>
期待：build = verified; user acceptance = unverified
材料：自作の synthetic text。account、customer data、secret、制限された screenshot は含めない。
```

小さいから速く merge できるのではありません。scope、license、想定する failure、command を数分で確認できるからです。これらを出せないなら、先に discussion を開くか `blocked` とします。maintainer に仮定を補わせません。

## 自分で確かめる

- [ ] 提案を「より良くして」ではなく、一つの problem、固定 input、確認可能な result にできる。
- [ ] PR に入れられない資料を知り、緑の CI で authorization や独立 review を置き換えない。
- [ ] fast merge できる理由、または `blocked` / `candidate` にすべき理由を説明できる。

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
