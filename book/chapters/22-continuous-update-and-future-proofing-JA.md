<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第22章: 継続的な更新と将来への備え

**状態:** `candidate`。**実験:** `draft / not_run`。使うのは一時コピーまたは隔離ブランチだけです。本番、実際の認証情報、push、release、外部の一括置換は使いません。

## この章の問題

モデル、Codexの入口、権限、Skill、外部サービスは変わります。出典、適用範囲、確認日、移行計画、rollbackがないワークフローは、数か月後に誤解を招きます。継続保守は新機能を追いかける競争ではありません。何が安定し、何を確認し、いつ維持、停止、移行、廃止するかを規律をもって決めることです。

## 四つの層と寿命

| 層 | 例 | 保守方法 |
|---|---|---|
| 安定原則 | 文脈は理解に影響し、ツールは行為空間を変え、証拠は完了主張を支える | 教示、実験、境界レビュー |
| 製品利用 | Codex入口、Skill呼び出し、権限、設定 | 該当する公式ページで再確認 |
| 領域方法 | 工学、調査、マーケティング、文書、データ | 実践課題と人のレビュー |
| 個別事実 | モデルID、価格、上限、パラメータ、外部API | 日付付き出典に結び、必要なら移行または削除 |

内容の成熟度 `draft | candidate | verified | production-ready`、変動する主張の状態 `current | stale | disputed | removed`、実行観測 `planned | authorized | executed | verified | not_run` を混同しません。出典が最新でも章が検証済みになるわけではありません。

## 判断: 維持、更新、停止、廃止

| 状況 | 行動 | 必要な出口 |
|---|---|---|
| 権威ある出典があり範囲も合う | `current`; 維持または最小更新 | 出典、確認日、影響先を記録 |
| 出典が衝突する、または観測と食い違う | `disputed`; 断定を止める | 不明点と確認担当を記録 |
| 出典が消え代替がない | `stale`; 注意または停止 | 古い記述を現行として出さない |
| ライセンスや安全条件が許さない | `removed`; 廃止 | 移行と回復情報を残す |
| 互換の代替があり移行を評価済み | `current`; 移行を案内 | 古い範囲、経路、証拠、次回確認 |

担当、証拠、rollbackのいずれかがなければ `blocked` です。

## 行動: 主張記録と影響行列

```yaml
claim: "具体的な主張"
source: "公式または権威あるURL"
checked_at: "YYYY-MM-DD"
applies_to: "製品、版、地域、アカウント範囲"
owner: "責任ロール"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

流れは、変化の発見 → 影響とリスク分類 → 章、Skill、Lab、タスク、権限の影響先特定 → 出典または限定証拠の確認 → 最小安全変更 → 関連チェック再実行 → 新しい文脈でのレビュー → 維持、移行、停止、廃止、公開です。

モデルまたはSkillの移行では、初回成功、エラー、文脈、ツール、権限、trigger、出力形式、ライセンス、担当、復旧を再確認します。出典更新はアカウントアクセス、実行、配備、チーム効果を証明しません。

## 実験: 仮想の製品変更を処理する

一時コピーに `update-impact-demo-v1` を作り、`https://example.invalid/public-doc` に関する架空で `disputed` の主張を置きます。これは意図的に使えないドメインです。アクセスも実行も、実製品の証拠扱いもしません。基準hash、目録、変更前diff、`run_id` を残します。

公開説明が変わったが二つ目の信頼できる出典がないと想定します。`disputed` を保ち、断定的な教示を止めます。章、Skill、Lab、権限注記、タスクセットに対し、利用者、リスク、最小対応、証拠、担当、状態を持つ影響行列を作ります。fixtureだけを変更し、関連チェックだけを実行して結果または `not_run`、diff、未検証項目、rollbackを記録します。`decision_owner`、一時的な `delivery_target`、`reviewer`、`rollback_target` がなければ `blocked` のままです。

証拠には主張、出典または不在記録、範囲、担当、確認日、hashまたはdiff、影響行列、log、未知の一覧を含めます。rollbackは一時hashへ戻すかコピーを捨てる手順でなければなりません。

## 失敗例、移行、受入

タスク、出典、権限、ライセンスを確認せずにモデル名を全資料で置換して失敗させます。停止し、失敗diffを一時コピーに残し、基準を復元し、見落とした利用者を行列へ足します。実在する外部Skill候補は、ライセンス、依存、trigger、権限、リスク、担当、評価を確認するまで `blocked` または適応候補にとどめます。

- [ ] 安定原則、製品利用、領域方法、個別事実を区別できる。
- [ ] 変動する主張に出典、日付、範囲、担当、確認日、状態がある。
- [ ] 影響行列が章、Skill、Lab、タスク、権限を扱う。
- [ ] 主張状態と内容成熟度を区別できる。
- [ ] 演習にhash、diff、log、rollback、未検証項目がある。

製品名、権限、挙動は変動します。最新の公式情報を確認してください。この章は `candidate` のままであり、演習は本番挙動やチーム効果を証明しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-JA.md">← 前の章<br><strong>第21章 · チーム能力システムを作る</strong></a></td><td align="right"></td></tr></table></nav>
<!-- chapter-navigation:end -->
