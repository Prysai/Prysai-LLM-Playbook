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

## なぜ必要か

中断後、新しい指示によってタスクが動いているように見えても、対象、worktree、先行した副作用は不明かもしれません。続ける前に状態を照合します。再開した会話を連続性の証明と見なしてはいけません。

## 準備とタスク

二つのテキストファイルを持つ使い捨てコピーを使います。目標、対象パス、ブランチ、最後の行為、保留行為、権限、証拠を含むcheckpointを作ります。二つ目のタスクを始めるか、古いcheckpointで置き換えて中断を模擬します。認証情報、ネットワーク、本番、不可逆コマンドは使いません。

1. 現在ディレクトリ、リポジトリルート、ブランチ、対象ファイル、hashまたは更新時刻、diffを記録する。
2. checkpointと比べる。
3. 各項目を `matched`、`changed`、`not_observed` に分類する。
4. 目標、対象、権限、副作用状態が照合できた時だけ続ける。できなければ新しいcheckpointを作って止まる。

## 失敗、証拠、受入

表示タスク名だけを同じにし、リポジトリルートまたは対象ファイルを変えます。編集前に止まり、最初の不一致項目を示します。書き込み可能だからといって誤ったcheckoutを直してはいけません。checkpoint、コマンド、出力、diff、分類表、短い判断を保存します。

- [ ] 実際のパス、リポジトリ、ブランチ、対象、diffを取得した。
- [ ] 現在状態と名前付きcheckpointを比較した。
- [ ] 変更と未観測を分けた。
- [ ] 対象または副作用が不明なら停止した。
- [ ] 再開promptを連続性の証明と呼ばなかった。

リモート書き込みなしで、確認済み要求、対象アカウントまたは資源、承認、前回呼び出しが変えたかもしれないリモート状態をブラウザまたはMCPで確認します。このLabは `draft / not_run` のままで、fixtureは実際の連続性を証明しません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-JA.md">← 前へ<br><strong>Lab 013 · 監査可能な縦方向スライス</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-JA.md">次は準備中 →<br><strong>Lab 015の提供状況を見る</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
