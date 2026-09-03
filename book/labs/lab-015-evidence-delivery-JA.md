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

## このLabが必要な理由

コマンドが実行されても、出力が隠れていたり、途中で切れていたり、別の
作業ディレクトリに結び付いていたり、主張を支えるには弱すぎたりします。
このLabでは、整った「完了」という文を、主張と証拠を結び付けた記録に
変えます。

## 準備

一時的なテキスト変更、焦点を絞った確認、意図的に欠けた確認を一つずつ
用意します。出典についての主張、確認についての主張、実行または利用者へ
の影響についての主張を含む匿名化した引き継ぎを作ります。実サービスや
利用者データは使いません。

## タスク

各主張について、次を記録します。

```text
主張:
範囲:
コマンドまたは観測:
作業ディレクトリ:
終了コード / 結果:
保存した出力:
状態: verified | partial | unverified | blocked | not_run
最小の次の確認:
```

二人目のレビュー担当者、または新しいセッションに、証拠がない、範囲を
超えている、別の行から推測しただけの主張を拒否してもらいます。

## 証拠

主張の表、コマンドの生の出力、diff、レビュー判断を保存します。ソースの
確認が通っただけでは、視覚的な実行結果や利用者の受け入れを証明できない
理由が、記録から分かるようにします。

## 失敗パターン

出力ファイルを削除し、引き継ぎにはコマンド名だけを残します。正しい状態は
`unverified` または `not_run` であり、「たぶん通った」ではありません。

## 現場バリエーション：Windows で起きる三つの証拠の断絶

[第9章](../chapters/09-verification-and-recovery-JA.md) の三つの公開報告を
参考ケースにします。このLabで外部製品の問題を再現しようとしてはいけま
せん。代わりに、証拠の境界をモデル化する安全なローカル fixture を作ります。

1. 端末の表示領域に収まらない量のテキストを生成し、同じ内容をファイルに
   保存して、保存された内容と画面に見えた内容を比較する。
2. テキスト fixture に BMP と非 BMP の文字を入れる。ツールを呼び出す前に
   予定した文字列と受け取った文字列を比較し、違えば `blocked` と記録する。
3. ファイルシステムが対応する場合だけ、通常のテスト用ファイル名を意図的
   に長くした一時 Git リポジトリを作る。パスの長さと Git の結果を記録し、
   Codex 内部の ref を作成・削除したり、リポジトリ設定を変えたりしない。

各ケースについて、主張の表に一行を追加します。

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

正しい結論は `reference-only`、`not_run`、または `blocked` かもしれません。
境界をモデル化したローカル fixture は外部問題の再現ではなく、公開報告から
コピーした workaround も公式の修正にはなりません。

## 転移

同じ表を静的サイトに適用します。ソースファイルの存在、生成した artifact、
ブラウザでの描画、確認済みのスクリーンショット、公開 URL への到達を分けて
記録してください。

## 受け入れチェックリスト

- [ ] すべての完了文を範囲付きの主張に分けた。
- [ ] コマンドにパス、終了コード、保存した出力がある。
- [ ] 欠けている証拠を明示した。
- [ ] 後から成功しても、前の `unknown` を書き換えていない。
- [ ] 引き継ぎに最小の次の確認と停止条件がある。

## 振り返り

証拠より広くなっていた主張を一つ選び、その差を埋める最小の確認を記します。

## 出典

- [現場の問題とプロンプトのパターン — P2](../evidence-library-JA.md#source-notes)、FP2-05、FP2-06、FP2-20。
- [第9章：検証、疑い、復旧](../chapters/09-verification-and-recovery-JA.md)。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-JA.md">← 前へ<br><strong>Lab 014 · 再開時の照合</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-JA.md">次へ →<br><strong>Lab 016 · 副作用の境界</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
