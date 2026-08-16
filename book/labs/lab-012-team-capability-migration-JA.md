<!-- content_id: lab-012-team-capability-migration | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-012-team-capability-migration
title: "個人の方法をチーム能力に変える"
level: L6
domain: team
goal: "二人が方法を再現、レビュー、更新、rollbackできる形にする"
setup: "架空の週次レポート、匿名の二役、実組織システムなし"
task: "v0.1を作り、二つの新規文脈で再現し、v0.2で一要件を変え、影響とrollbackをレビューする"
evidence: ["所有者、権限、受入を持つ二版", "hash、出力、採点を持つ独立した二記録", "diff、影響行列、rollback結果、未検証一覧"]
failure_variant: "所有者、入力出典、権限境界、受入規則を外すか、受入を変えずに対象者を変える"
reflection: "一人の記憶だけにあった知識は何で、何があれば継承は危険になるか？"
status: draft
last_verified: "not run"
transfer_task: "低リスクの工学、調査、コンテンツ作業へ形式を適用する"
transfer_domain: "チームの工学、調査、コンテンツ運用"
transfer_evidence: "版、権限行列、独立run、diff、影響、rollback、レビュー注記を残す"
transfer_limitations: "静的シミュレーションはアカウントアクセス、本番統合、組織採用を証明しない"
---

# Lab 012: 個人の方法をチーム能力に変える

## 目的

個人の直感やチャット履歴を、別の人が安全に実行できる版管理された契約に置き換えます。

## 準備

架空の週次レポートと匿名の二役を使います。実アカウント、氏名、顧客データ、社内指標、共有システム、本番リポジトリは使いません。`v0.1` に目的と非目標、所有者とレビュー周期、入出力形式、権限行列と禁止行為、手順と停止条件、成功・境界・失敗・転移チェック、rollback先を置きます。

## 独立再現

AとBは同じパッケージを新しい文脈で受け取り、作者のチャット履歴を見ません。各自が入力hash、`run_id`、判断、出力、不確実性、採点を残します。違いを黙ってならさず比較します。一つの実要件を変えて `v0.2` を作り、diff、影響先、移行判断、互換性主張、rollback確認を記録します。

一人につき一つ、最小の run record を残します。実行していないなら `not_run` と書き、パッケージを完成したように見せるために結果を後から埋めません。

```yaml
run_id: "lab012-weekly-report-v1-B-01"
member: "A | B"
package_version: "0.1.0"
input_hash: "sha256:..."
read: ["README", "protocol", "permission-matrix"]
action_taken: "一時コピーだけで架空の週次レポート draft を作成"
stopped_at: "明示した停止条件、または none"
output_or_diff: "path または no-change"
validation: "command、exit code、主要結果。未実行なら not_run"
unknowns: ["実アカウントでの実行証拠はない"]
status: "pass | fail | blocked | not_run"
```

B が作者の口頭説明を必要とする、owner を見つけられない、許可範囲や rollback 方法が分からない場合、この引き継ぎは pass ではありません。欠けた点を該当する層に書き、clean copy からやり直します。チャットで補ってから独立再現だったとは言いません。

## 失敗、受入、転移

所有者、入力出典、権限境界、受入規則のどれかを外します。正しい結果は移行を止め、欠けた契約を記録することです。`v0.2` の対象者だけを変え受入基準を変えない場合も、レビュー担当は互換性を拒否するか新しい証拠を求めます。

- [ ] 二人が新しい文脈から再現した。
- [ ] 入出力、権限、所有者が明示されている。
- [ ] 二つのrunの違いを説明した。
- [ ] 版変更に影響とrollback記録がある。
- [ ] 実アカウント、本番、機密入力を使わなかった。

二版、hash、権限行列、独立記録、採点、diff、影響行列、rollback、未検証項目を保存します。それがなければL6能力は未証明です。次に低リスクのローカル作業へ移し、何が一人の記憶だけにあったか、六か月後に何が危険な継承になるかを書きます。

## 振り返りと移行

同じ形式を低リスクの engineering、research、content task に適用します。どの手順が元は一人の記憶だけにあったか。owner が去る、source が古くなる、六か月後に rollback が必要になるとしたら、何が安全な継承を妨げるかを考えます。答えは version、record、diff、unknown に戻せる必要があり、「もっと注意する」だけでは足りません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-011-gpt-codex-boundaries-JA.md">← 前へ<br><strong>Lab 011 · GPT、Codex、ツール、Agentを分ける</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-013-l3-vertical-slice-JA.md">次へ →<br><strong>Lab 013 · 監査可能な縦方向スライス</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
