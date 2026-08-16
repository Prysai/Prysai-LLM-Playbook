<!-- content_id: chapter-12-agent-loop-and-stop | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第12章：Agent のループ、状態、停止条件

**状態：** `candidate`。**実験：** `not_run`。ここでは観測可能なループを説明します。特定のホスト、モデル、ツールの動作を証明するものではありません。

## この章の問題

「Agent に任せる」は一つの操作に聞こえます。しかし実際には、モデルの提案、ホストの判断、ツールの実行または拒否、観測、状態更新、検証、継続または停止の判断があります。自信のある結論文は、これらの出来事の代わりにはなりません。

> モデル出力は提案です。ツール結果は観測です。検証済みの納品には、対象環境の証拠が必要です。

## 観測可能なループ

```text
タスク契約 → 状態を読む → モデルの提案 → ホストの許可
→ ツール実行 → 観測 → 状態更新 → 受け入れ確認
                                      ↓
                       納品 / 質問 / 回復 / 停止
```

| 層 | 証明できること | 単独では証明できないこと |
|---|---|---|
| 提案 | モデルが次の手を出した | 許可・実行・正しさ |
| ホスト判断 | 許可、拒否、保留があった | 意図した結果が生じたこと |
| ツール効果 | 開始、終了、エラー、差分 | 変更が利用者の意味を満たすこと |
| 検証 | 特定の規則を check した | check 範囲外の主張 |

「ファイルを更新してテストを実行する」と「完了」の間に、許可、コマンド、終了状態、差分、テスト範囲がなければ分類は `unverified` です。曖昧に「幻覚」と呼ぶ前に、最初の裏付けのない遷移を記録します。

## 状態を書く

短い checkpoint が中断からの安全な再開を可能にします。

```yaml
task: "使い捨て入力ファイルの空でない行を並べ替える"
scope:
  read: ["sandbox/input.txt"]
  write: ["sandbox/output.txt", "sandbox/evidence/"]
completed: ["パス確認済み", "タスク契約を読んだ"]
state: blocked_input
last_observation: "sandbox/input.txt がない"
verification: not_run
retry: {used: 0, allowed: 1}
next_safe_action: "入力ファイルを依頼する"
```

使える状態名は `ready`、`proposed`、`awaiting_approval`、`running`、`feedback_received`、`blocked_input`、`paused`、`unknown`、`verified`、`stopped` です。最終回答があっても不明な状態が `verified` になるわけではありません。

意図ではなくイベントを残します。提案、承認、実行開始・終了、効果、検証、納品です。観測していない値は `not_observed` と書き、モデルの意図で補いません。

## 再試行は上限付きの判断

再試行の前に、失敗を分類します。入力不足、範囲・権限の衝突、解釈の誤り、ツール・環境エラー、あいまいな検証、条件変化です。同じ条件で同じ操作を繰り返しても、通常は診断になりません。

試行回数、時間、変更可能な範囲、外部副作用、費用、不確実性の予算を定めます。応答が失われた後は、書き込みを再送する前に対象を読み、事後条件を比較します。書き込み自体は成功していたかもしれません。

| 操作の種類 | 不確実な結果の後に最初にすること |
|---|---|
| 読み取り専用 | 許可された読み取り範囲内で再確認 |
| 冪等 | 状態と事後条件を読む |
| 補償可能 | 効果を確認し、限定した補償を準備 |
| 非冪等 | 停止して照合してから再試行 |

## 練習と境界

使い捨てディレクトリで、元文書を編集せず、存在しないファイルを指すリンクを報告するよう Agent に依頼します。読み書きルート、欠落リンクの定義、check、読み取り専用の再試行二回、誤ったルートなどの意図的失敗を決めます。提案、レポート、check を別々に確認してください。

各遷移を説明でき、証拠付きで `verified`、`partial`、`blocked`、または `unverified` を納品できれば練習は成功です。独立した実行記録が残るまで、この章は `candidate / not_run` のままです。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="11-designing-a-skill-JA.md">← 前へ<br><strong>第11章 · 役に立つ Skill を設計する</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md">次の章は準備中 →<br><strong>第13章の公開状況を見る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
