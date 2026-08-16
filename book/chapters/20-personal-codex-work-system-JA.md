<!-- content_id: chapter-20-personal-codex-work-system | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第20章：個人用 Codex 作業システムを作る

**状態：** `candidate`。**実験：** `draft / not_run`。この章は移植可能な方法を示します。製品の memory、auto-load、entry point が恒久的だとは仮定しません。

## 問題

多くの人は project、goal、用語、制約、acceptance を毎回説明し直します。context が不整合になり、決定が追えず、古い command が再利用され、経験が次の task に渡りません。さらに深刻なのは、個人の便利な記録に token、password、cookie、customer text、未確認の結論を入れることです。

## 五つの asset と五つの役割

| Asset | 答える問い | Lifecycle | 入れないもの |
|---|---|---|---|
| Project rules | 常に守ることは何か | 版管理し意図的に変更・review | 一時の推測と秘密 |
| Task context | 今回何をするか | task ごとに作り archive | 無関係な履歴 |
| Current state | 何を読み、変え、検証し、block したか | checkpoint ごとに更新 | 結果のように見せた plan |
| Template | 類似 task をどう開始・納品するか | 繰り返しの後に抽出 | 未検証の永久結論 |
| Reflection | 何が働き、失敗し、次に変えるか | 移植可能な学びだけ | token、cookie、customer text、不必要な個人データ |

context は多いほど良いわけではありません。relevance、信頼性、機微性、鮮度が重要です。

## Skill にするか、protocol のままにするか

| 観測 | 決定 | 必要な証拠 |
|---|---|---|
| 一回限り、または input/output が変化中 | task protocol を維持 | 一 task の input、制約、決定、納品記録 |
| input、判断点、output が安定し、正例と失敗例がある | Skill candidate を作る | 三回以上の実行、failure set、transfer task |
| 方法は有用だが trigger や副作用が不明 | 観測を続けるか block | gap、risk、未完の validation |
| 秘密、外部 write、本番 release で許可や rollback が不明 | Block | permission matrix、人の承認、rollback plan |

偶然の一回の成功は Skill の根拠ではありません。decision ID、繰り返す task、candidate asset、安定 input、failure、evidence、owner、review、action を残します。

## 最小の個人パッケージ

project map、task protocol、state log、evidence index、reflection の五記録から始めます。開始時に rules、branch、state、permission を調べ、実行中は必要な context だけを持ち、納品時には verified と未完を分け、reflection では他者が理解して試せる規則を取り出します。

納品には変更、実際に走った command、result と exit code、未検証・範囲外の項目、risk、recovery、次の owner を書きます。個人の習慣を製品保証にせず、現在の公式文書と許可された surface を確認します。

## 練習と境界

一時コピーで、修正されていない mobile overflow、user acceptance のない build success、version/entry/log のない authentication failure、audience/source のない copy update を分類します。task/input だけの A と、五記録を使う B を比較します。同じ input と baseline を復元して各二回走らせ、hash、`run_id`、clarification、実際の変更、validation、六つの evidence、rework、unverified、status を残します。

古い command と古い directory を fixture として加え、stale と記録して再利用を止めます。四つの log がそろい、秘密・外部副作用がなく、acceptance が review されて初めて実験は通ります。それでも Skill や実際の memory 動作の検証にはなりません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-JA.md">← 前の章<br><strong>第19章 · モデルとワークフローを評価する、印象から証拠へ</strong></a></td><td align="right"><a data-chapter-nav="next" href="21-team-capability-system-JA.md">次へ →<br><strong>第21章 · チーム能力システムを作る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
