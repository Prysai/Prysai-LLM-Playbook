<!-- content_id: lab-014-resume-reconciliation | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-014-resume-reconciliation
title: "再開したタスクを続ける前に照合する"
level: L3
domain: general
goal: "続行前にタスクポインタ、対象、ブランチ、権限、副作用状態を照合する"
setup: "checkpointと二つのテキストファイルを持つ使い捨てローカルフォルダまたはリポジトリ。認証情報、ネットワーク、本番、不可逆コマンドなし"
task: "現在状態を記録しcheckpointと比べ、各項目を分類し、目標、対象、権限、副作用が一致した時だけ続ける"
evidence: ["checkpoint、観測、コマンド、出力、diff、分類表、続行判断", "一致、変更、未観測の明確な記録"]
failure_variant: "タスク名だけ一致させ、リポジトリルートまたは対象ファイルを変える。編集前に停止する"
reflection: "最も仮定しやすかった項目は何で、どの観測が続行または停止判断を変えたか？"
status: draft
last_verified: "not run"
transfer_task: "リモート書き込みなしでブラウザまたはMCPセッションへ照合枠を適用する"
transfer_domain: "ブラウザ、調査、工学、コンテンツ引き継ぎ"
transfer_evidence: "前回要求、対象、承認、リモート状態リスク、新しいcheckpoint"
transfer_limitations: "使い捨てfixtureは実アカウント、リモート資源、本番再開の連続性を証明しない"
---

# Lab 014: 再開したタスクを続ける前に照合する

## このLabが必要な理由

公開された現場報告では、コンテキストの圧縮、容量の中断、または再開
の後に Agent が古いタスクへ戻ることがあります。新しいプロンプトで実行
が続いているように見えても、タスクポインタ、作業ツリー、副作用の状態が
不明なままかもしれません。このLabでは、続ける前に状態を照合します。

## 準備

小さなリポジトリの一時的なコピー、または二つのテキストファイルを含む
フォルダを使います。目標、対象パス、ブランチ、最後に完了した操作、保留
中の操作、権限の状態、証拠を記した checkpoint を作ります。二つ目のタスク
を始めるか、古い checkpoint に置き換えて中断を模擬します。認証情報、
ネットワーク、本番ファイル、不可逆なコマンドは使いません。

## タスク

1. 現在の作業ディレクトリ、リポジトリのルート、ブランチ、対象ファイル、
   ハッシュまたは更新時刻、現在の diff を記録する。
2. その観測結果を checkpoint と比較する。
3. 各項目を `matched`、`changed`、`not_observed` に分類する。
4. 目標、対象、権限、副作用の状態を照合できた場合だけ続ける。照合でき
   なければ新しい checkpoint を作って停止する。

## 証拠

checkpoint、コマンドと出力、diff、分類表、短い判断を保存します。練習の
記録が成功していても、一時的な fixture で照合手順を守ったことしか示し
ません。

## 失敗パターン

表示されるタスク名だけを一致させ、リポジトリのルートまたは対象ファイルを
変えます。正しい結果は、編集前に停止して最初に照合できなかった項目を示す
ことです。書き込み可能だからといって、間違った checkout を修正しては
いけません。

## 転移

同じ枠組みをブラウザまたは MCP のセッションに適用します。最後に確認できた
リクエスト、対象アカウントまたはリソース、承認状態、前回の呼び出しがリモート
状態を変更した可能性を確認してください。

## 受け入れチェックリスト

- [ ] 実際のパス、リポジトリ、ブランチ、対象、diff を記録した。
- [ ] 現在の状態を名前付き checkpoint と比較した。
- [ ] 変更された項目と未観測の項目を分けた。
- [ ] 対象または副作用の状態が不明なときに停止した。
- [ ] 再開したプロンプトを連続性の証明と呼ばなかった。

## 振り返り

どの項目を最も簡単に思い込みそうだったか、どの観測が判断を変えたか、
何がまだ `not_observed` なのかを書き留めます。

## 出典

- [現場の問題とプロンプトのパターン — P2](../evidence-library-JA.md#source-notes)、FP2-01〜FP2-04 と FP2-08。
- [第10章：計画と垂直スライス](../chapters/10-planning-and-slicing-JA.md)。
- [第12章：Agent のループ、状態、停止条件](../chapters/12-agent-loop-and-stop-JA.md)。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-JA.md">← 前へ<br><strong>Lab 013 · 監査可能な縦方向スライス</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-JA.md">次へ →<br><strong>Lab 015 · 証拠を添えた引き渡し</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
