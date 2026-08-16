<!-- content_id: lab-005-design-a-skill | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-005-design-a-skill
title: "繰り返す方法を境界のある Skill にする"
level: L4
domain: general
goal: "繰り返す流れが Skill に値するか決め、どこでも発火するのでなく作業を絞ることを確かめる"
setup: "少なくとも二回終えた低リスクの流れ、別の練習ディレクトリ、機微情報を除いた四つのケース、公式 Skill バリデーター"
task: "安定した判断を取り出し、最小の有用な Skill を書き、正例・境界・失敗・転移を試し、インストールせず採用判断を残す"
status: draft
last_verified: "not run"
---

# Lab 005：繰り返す方法を境界のある Skill にする

## 学習目標

繰り返す作業に安定した判断パターンがあるときだけ、再利用できる指示パッケージを作ります。
Skill は一度うまくいった回答の保管場所でも、特定プロジェクトのチェックリストでも、分野の
事実を全部置く場所でもありません。

## 準備

少なくとも二回終えた無害な作業フローを選び、二つの実行記録を残します。機微情報を除いた入力と、
Skill を検出するルートの外にある練習ディレクトリを使います。認証情報、本番データ、未公開の
顧客資料、再利用条件が不明な外部資料は使いません。

`extraction.md` を作り、次の四列を書きます。

| 観察した手順 | 安定した判断 | プロジェクト固有の詳細 | 二つの実行記録の根拠 |
|---|---|---|---|

Skill の候補になるのは安定した判断だけです。ファイル名、顧客の詳細、一時しのぎ、単発の対象は
プロジェクト文脈に残します。

## タスクと実験

次を含む最小の候補を書きます。

- 関連する依頼には発火し、似た依頼には譲る説明。
- 入力、許される行動、権限の限界、秘密の扱い、出力、受け入れ条件。
- 短い中核フロー。詳細な参照やスクリプトは必要なときだけ分ける。
- 正例、境界例、失敗例を一つずつ。
- 出典、ライセンス、担当者、版、次回確認日。

公式バリデーターを実行します。次に新しい文脈で、正例、境界、失敗、別分野への転移という四つの
固定ケースを試します。候補が見つかったか、読み込まれたか、選ばれたか、従われたか、動作が
検証されたかを別々に記録します。一つの状態は次の状態を証明しません。

最後に `skill-adoption-decision.md` を作ります。

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

この Lab は採用の推薦で終わります。インストールは共有状態を変えるため、別の承認が必要です。

## 残す証拠

元の二つの作業記録、`extraction.md`、候補ディレクトリ全体、版またはハッシュ、バリデーター出力、
四つのケースの入力と出力、新しい文脈の記録、採用判断を残します。失敗した試行は失敗として
保存し、後の修正済み実行で上書きしません。

## 失敗ケース

まず実在するプロジェクトのファイル名や顧客固有の規則を Skill に固定します。転移ケースを実行し、
候補が誤って発火するか無関係な指示を出すことを確かめます。偶然の詳細を外し、新しい試行 ID で
やり直します。

次に、ライセンスまたは許可の記録が明確でない外部断片を加えます。バリデーターが通っても正しい
判断は `blocked` です。有効なファイル構造だけでは出所は解決しません。

## 受け入れチェックリスト

- [ ] 二回の事前実行が、書き込んだ安定判断をすべて支えている。
- [ ] 発火条件と非発火条件の両方を試した。
- [ ] 正例、境界、失敗、転移の生の結果を残した。
- [ ] 出典と再利用許可を記録した。
- [ ] インストール、秘密の使用、公開、外部副作用は起きなかった。
- [ ] 判断に未検証項目と次回確認の担当者を書いた。

## 振り返りと転移

別分野の流れに同じ方法を適用します。移動後も残った部分は何ですか。どこまでがプロジェクト文脈
でしたか。候補は繰り返す抜けを減らしたのか、指示を長くしただけなのかを確かめます。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab のナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-004-skill-selection-JA.md" aria-label="前の Lab：Lab 004 · 最小の有用な能力を選ぶ">← 前の Lab<br><strong>Lab 004 · 最小の有用な能力を選ぶ</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-006-agent-stop-conditions-JA.md" aria-label="次の Lab：Lab 006 · Agent の停止条件を設計する">次へ →<br><strong>Lab 006 · Agent の停止条件を設計する</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
