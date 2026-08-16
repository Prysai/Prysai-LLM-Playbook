<!-- content_id: lab-004-skill-selection | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-004-skill-selection
title: "最小限で有効な能力を選ぶ"
level: L4
domain: general
goal: "タスク適合性、リスク、ライセンス、検証コストで Skill またはツールを選ぶ"
setup: "低リスクのローカルタスク一つと、revision を固定した能力候補"
task: "インストールや認証をせず、protocol のみ、protocol と Skill、protocol と Skill とツールを比較する"
evidence:
  - "タスク適合性、依存関係、権限、検証コストを記した三つのアプローチ記録"
  - "候補ごとの source、revision、license、nested asset、rollback のメモ"
  - "recommendation-only の決定一つと blocked の決定一つ"
failure_variant: "license または rollback が不明な候補を選び、単純なタスクに無関係な能力を重ねる"
reflection: "どの能力が本当に必要だったか。どの依存関係が最大の保守コストを作ったか。何を外せるか。"
status: draft
last_verified: "Not run"
transfer_task: "低リスクの research または content task で比較を繰り返す"
transfer_domain: "research, engineering, marketing, or documentation"
transfer_evidence: "task gap、比較表、adoption record、reviewer comment を残す"
transfer_limitations: "recommendation-only の比較は、install、runtime behavior、長期の保守価値を証明しない"
---

# Lab 004：最小限で有効な能力を選ぶ

## 学習目標

人気、数の多さ、インストールの容易さではなく、明確なタスク上の不足を埋めるから能力を選べるように
なります。

## 準備

低リスクのローカルタスクを一つ選び、次の三つを比べます。

1. 書いたタスク・プロトコルだけ。
2. プロトコルと関連する Skill 一つ。
3. プロトコル、Skill、一つの外部ツールまたは connector。

候補の revision を固定します。source、license、dependency、予定する install scope、permission、
side effect、owner、review date、rollback を記録します。後のタスクが明示して許可するまで、install
や認証をしてはいけません。

## 決定記録

候補ごとに短い adoption record を作ります。

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

この Lab の既定の決定は `recommendation-only` または `blocked` です。発見、install、load、invoke、
行動の効果、検証済み結果は別々の状態です。別々に記録してください。

## 失敗ケース

folder は存在するが license、nested asset、固定 revision、rollback 手順が不明な候補を選びます。
正しい決定は `blocked` です。見つけられることは使う許可ではありません。install 済みであることも、
その行動が検証済みという意味ではありません。

次に、単純な text task へ無関係な能力をいくつも加えます。その能力が足す permission、dependency、
verification cost がタスクに与える具体的な価値より大きければ、却下します。

## 受け入れチェックリスト

- [ ] 候補を比べる前に task gap を書いた。
- [ ] 少なくとも一つを具体的な理由で却下した。
- [ ] license と nested asset の不確実性が見える。
- [ ] permission と外部 side effect がタスクの必要を超えない。
- [ ] install と行動を同じ状態として扱わない。
- [ ] maintainer が chat history に頼らず rollback を実行できる。

## 残す根拠

変更していない task input、三つの approach record、候補 revision identifier、license note、
decision table、reviewer comment を残します。この Lab は、外部 Skill が install 済みまたは
信頼して動くことの根拠にはなりません。

## 振り返りと転移

research または content task で比較を繰り返します。新しい dependency のうち、もっとも保守
コストが高かったのはどれですか。最終根拠の質を下げずに何を外せますか。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab のナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-003-evidence-review-JA.md" aria-label="前の Lab：Lab 003 · 完了宣言を監査する">← 前の Lab<br><strong>Lab 003 · 完了宣言を監査する</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="../table-of-contents-JA.md" aria-label="日本語目次へ戻る：Lab 005 はまだ翻訳されていません">次の Lab は準備中 →<br><strong>Lab 005 の提供状況を見る</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
