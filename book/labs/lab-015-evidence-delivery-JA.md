<!-- content_id: lab-015-evidence-delivery | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-015-evidence-delivery
title: "完了の言葉ではなく証拠を渡す"
level: L5
domain: general
goal: "完了主張を範囲付き証拠記録に分け、最小の次の確認を見つける"
setup: "使い捨てテキスト変更、一つの限定check、意図的に欠くcheck、匿名化した引き継ぎ。実サービスや利用者データなし"
task: "出典、check、実行主張ごとに範囲、コマンドまたは観測、結果、保存出力、状態、次のcheckを記録する"
evidence: ["主張・証拠表、生のコマンド出力、diff、レビュー判断", "verified、partial、unverified、blocked、not_runの明示的区別"]
failure_variant: "出力ファイルを消し、引き継ぎにコマンド名だけ残す。unverifiedまたはnot_runにする"
reflection: "証拠より広い主張はどれで、どの小さなcheckが差を閉じるか？"
status: draft
last_verified: "not run"
transfer_task: "静的サイトへ表を適用し、ソース、build、ブラウザ、スクリーンショット、公開URLを分ける"
transfer_domain: "Web公開、文書、調査、工学"
transfer_evidence: "範囲、コマンドまたは観測、結果、出力パス、限界を一主張一行で残す"
transfer_limitations: "ソースcheckは視覚runtime、利用者受入、公開URLを証明しない"
---

# Lab 015: 完了の言葉ではなく証拠を渡す

## 問題

コマンドは実行されても、出力が隠れたり、切れたり、誤った作業ディレクトリに付いたり、主張に対して弱すぎたりします。「完了」を主張・証拠記録に変えます。

## 準備とタスク

使い捨てのテキスト変更、限定check、意図的に未実行のcheckを作ります。出典主張、check主張、実行または利用者効果の主張を持つ匿名化した引き継ぎを用意します。実サービスや利用者データは使いません。各主張について次を残します。

```text
主張:
範囲:
コマンドまたは観測:
作業ディレクトリ:
終了コード / 結果:
保存出力:
状態: verified | partial | unverified | blocked | not_run
最小の次の確認:
```

二人目のレビュー担当または新しいセッションに、証拠がない、範囲を超える、別の行から推測した主張を拒否してもらいます。

## 失敗と境界練習

出力ファイルを消し、引き継ぎにコマンド名だけを残します。正しい状態は `unverified` または `not_run` であり、「おそらく通った」ではありません。ネットワークを使わず、端末表示を超える文をファイルに残す、BMPと非BMP文字列をツール前に比較する、可能なファイルシステムで長い通常のテスト名を使う、という境界もモデル化できます。ローカルfixtureは他所の問題を再現した証明ではありません。

## 受入と転移

- [ ] すべての完了文を範囲付き主張に分けた。
- [ ] コマンドにパス、出力、終了コードがある。
- [ ] 欠けた証拠を明示した。
- [ ] 後の成功が前の未知を上書きしない。
- [ ] 引き継ぎに次のcheckと停止条件がある。

静的サイトでは、ソースの存在、build、ブラウザ描画、スクリーンショット確認、公開URL到達を区別します。このLabは `draft / not_run` のままです。ソースcheckは視覚実行や利用者受入を証明しません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-JA.md">← 前へ<br><strong>Lab 014 · 再開時の照合</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-JA.md">次へ →<br><strong>Lab 016 · 副作用の境界</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
