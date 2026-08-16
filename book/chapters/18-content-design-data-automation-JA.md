<!-- content_id: chapter-18-content-design-data-automation | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第18章：コンテンツ、デザイン、データ、自動化トラック

**状態：** `candidate`。**実験：** `draft / not_run`。このトラックは納品物の検証方法を教えます。本番実行の記録ではありません。

## 問題

workflow の tool が増えるほど、「source file がある」「script が走った」「API が接続した」を完成品と取り違えやすくなります。layout、empty state、accessibility、license、formula、privacy、permission、重複書き込み、回復にも失敗がありえます。

> 最初に最終形と読者を定義します。次に risk 順で capability を有効化し、render された結果、入出力、permission、回復、公開状態を検査します。

## ブランドでなく納品物から選ぶ

| 納品物 | 最終形の check | 典型的リスク |
|---|---|---|
| Document / PDF | pagination、目次、link、font、可読性、印刷 | reflow、font 欠落、引用・license |
| Website | browser render、responsive、interaction、empty/error、keyboard、mobile | source は正しくても UI が使えない |
| Image / video | 寸法、明瞭さ、文字、権利、caption/alt、編集性 | 事実誤り、不明 license、アクセス不能 |
| Presentation | 投影サイズ、階層、contrast、話す順、notes | overflow、低 contrast、script 不一致 |
| Spreadsheet / report | formula、filter、unit、空値、export、再計算 | 数値ずれ、denominator drift、上書き |
| Automation | schema、log、retry、idempotency、permission、rollback、出力 | 二重書込、漏えい、部分完了 |

source diff は最終形の証拠になりません。実際の形が重要なら PDF/PNG を render し、website を browser で開き、sheet を再計算し、test account で制御した flow を走らせます。階層、可読性、empty/error、accessibility、正確さ、license、編集性を確認します。

## 可逆で繰り返せる自動化

```text
入力 schema と sample; sensitive field と許可用途;
transform と version; 外部 call、target、最小 permission;
timeout、retry、backoff、idempotency key; log、trace ID、error 分類;
出力 schema と validation; 部分状態、compensation、rollback;
人の承認点と停止条件。
```

「API が接続した」は接続性だけを示します。field mapping、完全性、重複、permission 範囲、下流の正しさは示しません。本番書込みの前は test account、sandbox、ローカル simulation を使い、必要なら input/output hash と batch ID を残します。

level は、低リスクのローカル読み取り、可逆な project work、承認と log を持つ制御済み外部接続、明示的許可・privacy/license review・preview・rollback・online verification を持つ本番書込み／公開の四つです。上位に移るには新しい理由、permission、risk、evidence、回復計画が必要です。

## 練習と境界

合成 product-report context、匿名化した構造 fixture、架空の読者を使います。A は document、B は document と分析、C は render した chart、D は外部分配です。空データ、欠落 column、極端値、壊れた入力を入れます。A/B/C はローカルで、D は test account または draft endpoint だけで実施し、preview、batch ID、idempotency key、log、承認を確認して公開しません。

A–D 表、最終 render、data dictionary、validation、無効入力への応答、log、permission、retry、sandbox 状態、公開がなかった証拠を残します。模擬書込み後 timeout なら trace を保存して部分状態を照会し、非冪等操作を繰り返しません。実際の最終形の証拠と独立 review までは `candidate / not_run` です。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="17-marketing-track-JA.md">← 前の章<br><strong>第17章 · マーケティング・トラック、製品理解から成長実験へ</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md">次の章は準備中 →<br><strong>第19章の提供状況を見る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
