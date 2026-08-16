<!-- content_id: chapter-11-designing-a-skill | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 11 章：役に立つ Skill を設計する

**状態：** `candidate`。**実験：** `not_run`。この章は設計方法を定義します。特定 host が Skill を discover、load、execute したことは証明しません。

## 問題

一度うまくいった session だけで prompt を Skill にするのは危険です。書かれていない事実に依存し、不要な permission を求め、credential を前提にし、流行語だけで trigger するかもしれません。役に立つ Skill は、繰り返せる task class に、限定した action と確認可能な evidence を対応させる versioned method package です。

> Skill は、限定された task class を限定された action と確認可能な evidence に対応させる、discoverable で reusable な method package です。

Skill は model、tool、permission、connector、human approval の代わりではありません。

## prose より先に contract を書く

```yaml
skill_id: evidence-boundary-review
version: "0.1.0"
owner: named-person-or-team
review_date: "YYYY-MM-DD"
purpose: "与えられた artifact を指定された evidence boundary で review する。"
trigger:
  - "evidence boundary review が依頼されている。"
  - "artifact、goal、acceptance が与えられている。"
non_trigger:
  - "制限なしの rewrite が依頼されている。"
  - "重要な claim の source がない。"
  - "別の named method が task を所有する。"
required_inputs:
  - target path または貼り付けた artifact
  - goal、non-goal、acceptance
  - material claim の provenance
allowed_actions: "named target を read; disposable output に report を write; reversible local check を run"
forbidden_actions: "secret の読取/出力、publish、send、delete、install、無許可 network"
output: "claim → evidence → uncovered scope report"
stop_when: "input、authority、source、recovery target が欠ける"
```

trigger には task intent、required input、method ownership、acceptable risk が必要です。keyword coincidence だけでは足りません。non-trigger は近接 task を乗っ取らないためのものです。

## method、data、execution を分ける

- `SKILL.md` には常に必要な purpose、boundary、step、stop rule、evidence を置く。
- `references/` には特定 branch でのみ読む material を置く。
- `scripts/` は dependency、network、write scope、exit behavior を宣言した deterministic check だけにする。
- `assets/` は宣言した static resource だけにする。

critical safety rule を optional reference に隠しません。file exists は discovery を、discovery は load を、load は adoption を、adoption は behavior を証明しません。

## 四つの case で評価する

| case | 起きるべきこと | 起きてはいけないこと |
|---|---|---|
| positive | method が trigger し、reviewable artifact を残す | evidence なしの成功宣言 |
| boundary | 正しい method に譲るか、具体的に質問する | 類似 label だけで trigger |
| failure | unsafe write 前に stop し、最初の欠落点を残す | input、permission、result を捏造 |
| transfer | domain fact を変え、assumption を再確認する | noun を機械的に置換 |

一変数だけを変え、artifact に見える signal を残す intentional failure を加えます。rollback は target、baseline、step、read-back check を定義します。「undo」だけでは不十分です。

## 実践と境界

Markdown link review、research brief の source check、release handoff など、二回以上行った低リスク method を選びます。contract、positive case、trigger しない near miss、missing input、visible failure、rollback check を作り、artifact が何を証明し、何が unknown かを表にします。

宣言した environment でこれらの case を記録し、独立 review を受けるまで、その Skill は `candidate` です。discovery、load、execution、business impact を主張しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-JA.md">← 前の章<br><strong>第 10 章 · 計画と垂直スライス</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md">次の章は準備中 →<br><strong>第 12 章の提供状況を見る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
