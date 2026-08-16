<!-- content_id: chapter-08-full-lifecycle-workflow | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 8 章：定義から引き渡しまで

**状態：** `candidate`。この章は evidence を伴う workflow と復旧規則を教えます。比較実験は `not_run` のままであり、実際の Codex 実行、顧客対応、production release の記録ではありません。

## 問題

モデルに書き始めてもらうことと、別の人が使える仕事を終えることは別です。goal が曖昧でも、scope が膨張しても、check が違う file を見ていても、画面は順調に見えることがあります。最後に受理した change が不明なまま retry すると、未完成の state に後続作業を重ねる危険もあります。

```text
define → plan → build → verify → review → deliver → maintain
```

各矢印は判断点です。Agent が「完了」と言ったからではなく、その段階を他者が確認できる evidence があるときだけ進みます。

## 到達目標

- edit 前に scope、non-goal、acceptance、authority、rollback を書く。
- 大きな request を、早く evidence を出す vertical slice に変える。
- 最後の受理済み state を残し、条件付きでだけ retry する。
- build、runtime、visual、source、security、user acceptance の evidence を区別する。
- 完了と未完了を混ぜない handoff を書く。

## evidence を運ぶ七段階

| 段階 | 問い | exit evidence | 止まる条件 |
|---|---|---|---|
| Define | 何を誰のために、どこまで行うか | task protocol と acceptance | input 不足が scope、risk、authority を変える |
| Plan | 最小の有用な順序は何か | slice と check を含む plan | 確認可能な結果のない横割り |
| Build | 許可された scope で何が変わったか | diff、changed-file list、checkpoint | scope 外または rollback 不明 |
| Verify | 必要な check で振る舞うか | command、exit code、output、environment | hang、誤 target、evidence 不足 |
| Review | claim は evidence と合うか | claim-to-evidence 表、open risk | claim が evidence より広い |
| Deliver | 別の人が使い確認できるか | summary と artifact path | published や live を誇張する |
| Maintain | 何を更新・戻すか | owner、review、rollback record | owner も recovery もない |

exit が欠けたら `blocked` または `unverified` と書きます。段階を増やしても、不足した permission、file、test の代わりにはなりません。

## status label と evidence は違う

| claim | 最低限の evidence | 証明しないこと |
|---|---|---|
| source を変えた | 指定 path の diff | change が正しいこと |
| check を実行した | command、directory、exit code、output | application の動作 |
| application が動く | 指定 input と environment の runtime observation | 全 account や OS での動作 |
| page は正しい見た目 | viewport と criterion を残した render inspection | demand、完全な accessibility、deployment |
| feature を出荷した | repository/deployment state と delivery 後 check | 全利用者への到達 |

passing build は有用でも、runtime、visual、security、user acceptance の証明には自動でなりません。

## action の前に define する

```text
owner: content-maintainer
target: docs/guide.md
goal: step、link、acceptance note を一致させる
allowed_scope: rule を読む; target を edit; 既存 local check を実行
non_goals: dependency install; commit; push; publish; system change はしない
acceptance: 指定 defect を直し、許可された check の exit を残す
evidence: diff、changed-file list、command output、unverified list
stop_when: scope、authority、target、recovery source が欠ける
rollback: 記録済みの pre-edit copy または clean checkpoint に戻る
```

non-goal は accidental expansion を防ぎます。「page を verify」は browser reinstall、policy change、publish の許可ではありません。hash は変更を示しますが、以前の内容を戻しません。write、network、authentication、installation、restart、deployment、external message は必要で、かつ明示的に許可されたときだけ加えます。

## vertical slice と checkpoint

横割りの `all data → all API → all UI → integration → test` は、間違った前提を最後まで隠しがちです。vertical slice は `one input → smallest change → observable action → focused check` として、一つの小さな結果を input から evidence まで通します。

checkpoint には baseline、permission、最初の diff、check output、review を分けて残します。retry 前には次を記録します。

```text
failed_stage: verify
failure_class: timeout / capacity / unknown
last_accepted_checkpoint: CP2
changes_since_checkpoint: none known; diff rechecked
retry_condition: same command, same target, one bounded attempt
fallback: output がなければ stop して handoff
```

「続けて」は recovery plan ではありません。最後に受理した state も duplicate side effect の防止も示しません。

## 実験、失敗、受け入れ

disposable folder で小さな documentation task を二通り試します。一方は直接の request、もう一方は protocol、checkpoint、focused check を使います。初回 output、diff、command、exit code、実際の duration、rework を残します。ない time や cost は推定せず `unavailable` と書きます。

timeout、input hash の変更、permission block、local write result の不明を一つ起こします。中断試行を残し、retry 前に target を読み、固定条件が変われば `not_comparable` にします。後の成功は比較可能性を遡って直しません。三つの小課題は一般的な efficiency、quality、model ranking を証明せず、link check は学習、公開、adoption を証明しません。

- [ ] edit 前に scope、non-goal、acceptance、authority、rollback を書ける。
- [ ] 大きな request を early evidence を出す vertical slice に変えられる。
- [ ] retry 前に last accepted checkpoint を言える。
- [ ] build、runtime、visual、source、security、user acceptance を分けられる。
- [ ] 求められていない install、restart、deployment、external write を止められる。
- [ ] completed、not done、blocked、unverified を分けて handoff できる。

## まず小さく完結する slice を一つ終える

最初から site、code、release を扱う必要はありません。自分で確認できる短い文章、一つの local README、またはすでに使用許可のある公開 source 一式を選びます。目的は model に「たくさんさせる」ことではなく、define から handoff まで見える一周を終えることです。

```text
result: 120 字以内の説明で、新しい reader が最初の一歩を見つけられる。
input: 原文、想定 reader、分かっている問題一つ。
allowed: 原文を読む。plan を出す。確認後もその text だけを編集する。
not allowed: network、sign-in、install、送信、publish、他 file の変更。
check: before/after text を保存し、「最初の一歩を見つけられるか」を一度確認する。
handoff: 変えたこと、変えなかったこと、check の結果、まだ unknown なこと。
```

七段階を通します。reader と result を定義し、一か所を plan し、原文を checkpoint として残し、編集し、前後を比べ、別の視点で review し、次の人または明日の自分へ handoff します。追加資料や external action が必要なら `blocked` で止めます。閉じたように見せるために permission を広げません。

### 二つの試行が比較できる条件

「model にすぐ編集を頼む」と「先に protocol を書く」を比べるなら、原文、goal、allowed action、time limit、check rule を固定します。first output、実時間、rework、diff、check result、unknown を残します。text、model、tool、permission、environment が変われば `not_comparable` です。一度速い、または見栄えが良い結果は、一般的な効率や model の優劣を証明しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-JA.md" aria-label="前の章：第 7 章 · Skill、Plugin、MCP、ツールは仕事をどう分けるか">← 前の章<br><strong>第 7 章 · Skill、Plugin、MCP、ツール</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-JA.md" aria-label="次の章：第 9 章 · 検証、疑い、復旧">次の章へ →<br><strong>第 9 章 · 検証、疑い、復旧</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
