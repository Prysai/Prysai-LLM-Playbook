<!-- content_id: lab-003-evidence-review | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-003-evidence-review
title: "完了宣言を監査する"
level: L3
domain: general
goal: "主張、直接の根拠、推論、欠けた検証を分ける"
setup: "答え合わせを学習者の文脈の外に置いた、匿名化済みの三つの納品サマリー"
task: "重要な各主張を、範囲、必要な根拠、実際の根拠、状態、最小の次の確認へ対応付ける"
evidence:
  - "三つの固定入力サマリーと答え合わせ"
  - "完成した主張―根拠表"
  - "レビューメモと未検証項目の明示的な一覧"
failure_variant: "根拠のない「全テストが通った」と、一つのブラウザだけで支える「全デバイスで動く」を挿入する"
reflection: "どの根拠が存在、正しさ、準備完了を示し、範囲を書くとどの主張が弱くなったか"
status: draft
last_verified: "Not run"
transfer_task: "小さな engineering、research、publication の納品に監査表を適用する"
transfer_domain: "engineering、research、content delivery"
transfer_evidence: "範囲を定めた主張、直接の根拠、欠けた点、レビューメモ、最終状態を残す"
transfer_limitations: "静的監査では、点検範囲の外で参照成果物が本物または完全であることを証明できない"
---

# Lab 003：完了宣言を監査する

## 学習目標

語調、自信、見た目の仕上がりを信用せず、結果が完了しているか判断します。

## 準備

匿名化済みの納品サマリーを三つ用意します。直接の根拠があるもの、部分完了なのに完了と
書かれたもの、検証記録なしで整って見えるものです。答え合わせは学習者の文脈の外に置きます。

許可するのは読み取り検査と、より狭い根拠の要求だけです。サマリーの編集、欠けた出力の
捏造、外部サービスへの連絡、本番ログの利用はしません。

## タスクと実験

重要な各主張について記録します。

| 主張 | 範囲 | 必要な根拠 | 見つかった根拠 | 状態 | 最小の次の確認 |
|---|---|---|---|---|---|
| 例 | file、environment、version、date | diff と絞った check | 正確な path または `none` | verified / partial / inferred / blocked / unknown | 一つの境界付き行動 |

次の問いを分けます。

1. 成果物は存在しますか。
2. 宣言した範囲で成果物は正しいですか。
3. 意図した読者または環境に向けて準備できていますか。

それぞれ別の根拠が要ります。diff は変更を示しても、正しさを示しません。通った unit test は
その対象行動を示しても、deploy や利用者受け入れを示しません。

## 失敗ケース

command output、test name、date、environment、exit code のない「全テストが通った」を挿入
します。正しい応答は主張を弱め、根拠を求めることです。自信のある文面から実行を推測
しません。

次に一つの browser の根拠で「すべてのデバイスで動く」と言います。主張を狭めるか、追加の
デバイス根拠を求めます。

## 受け入れチェックリスト

- [ ] 重要な各主張に明示的な範囲がある。
- [ ] 直接の根拠と推論が別の列にある。
- [ ] 根拠のない主張を `verified` にしていない。
- [ ] 次の確認はプロジェクト全体の再実行より小さい。
- [ ] 秘密、顧客データ、private log を除外した。
- [ ] 最終 handoff に未検証項目がある。

## 残す根拠

三つの入力サマリー、完成表、答え合わせとの比較、reviewer notes、最終状態を残します。
学習者実行と独立レビューが記録されるまで、この Lab は `draft / not_run` のままです。

## 振り返りと移行

小さな engineering delivery、research conclusion、publication draft にこの表を適用します。
どの根拠が存在、正しさ、準備完了を証明しますか。範囲を正確に書くと、どの主張が弱まり
ましたか。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-JA.md" aria-label="前の Lab：Lab 002 · 願いをタスク・プロトコルに変える">← 前の Lab<br><strong>Lab 002 · タスク・プロトコル</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-004-skill-selection-JA.md" aria-label="次の Lab：Lab 004 · 最小限で有効な能力を選ぶ">次へ →<br><strong>Lab 004 · 最小限で有効な能力を選ぶ</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
