<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第19章：モデルとワークフローを評価する、印象から証拠へ

**状態：** `candidate`。**実験：** `draft / not_run`。評価 fixture にはモデル実行ログがありません。この章は、あるモデルが優れている証明ではありません。

## 問題

「このモデルは賢い」「この Skill は信頼できる」「すぐ終わった」は観測にはなっても選定には足りません。model、prompt、context、tool、permission、難易度、人の review が結果に影響します。一条件でも変われば、比較は元の問いに答えなくなります。

> 評価の単位は整った回答ではありません。固定入力、観測可能な行動、受け入れ規則、証拠パッケージ、宣言した範囲です。

## 判断対象を分ける

| 対象 | 問い | 最低限の証拠 |
|---|---|---|
| Default model | 固定 task set で quality/safety gate を満たす候補はどれか | 固定 task、反復、採点、error 分類 |
| Skill | 同じ入力で omission や rework を減らすか | baseline/candidate 差と trigger 記録 |
| Workflow | 計画と検証は追加 cost に見合うか | stage log、diff、validation、rework |
| Permission | 新しい action space は測定可能で許可された利益を出すか | permission 表、side effect、recovery cost |

実行前に decision card を作ります。範囲付きの問い、owner、実在する candidates、task version、最低品質、red line —秘密開示なし、無許可の外部書込みなし、証拠の捏造なし—、cost 上限、log 場所、action、範囲、unknown、次回 review です。実行できない候補は予測でなく `not_run` です。

## 条件を固定する

再利用 task set には通常、入力不足・矛盾、失敗、transfer、人の判断を要する task を入れます。各 task に ID、version、input、許可行動、期待証拠、禁止行動、pass 規則を付けます。

task text、redacted input、context、model ID、surface、tool、network、permission、time budget、反復回数、format、rubric、reviewer、hash、recovery を固定します。候補の成績が悪いから task を消しません。新しい版を作り理由を残します。条件が変われば新 decision にするか `not_comparable` とします。

各 attempt には `run_id`、`attempt_id`、candidate、task、surface、model、workflow、時刻、input hash、permission、tool version、timeline、diff、validation、reviewer、first pass、rework、cost と cost basis、error category、comparability、status が必要です。成功した retry が初回 attempt を上書きしてはいけません。

## 練習：三 task の smoke 比較

一時コピーで三つの固定 synthetic input を使います。claim/status/evidence の抽出、事実を変えない Markdown 化、code と build だけでは完成を示さない理由の指摘です。task と input だけの A と、protocol、最小 context、evidence rule を加えた B を比べます。surface、tool、permission、network、時間、reviewer は同じにし、一変数だけを変えます。

事実正確性、field 完全性、scope 準拠、evidence 対応、安全な停止を各 0–2 で採点します。pass は 8/10 以上で、scope と安全停止は各 1 以上です。hash、permission、tool version、capacity、条件が変われば timeline を保存して `not_comparable` とし、retry や別候補の結果で埋めません。

六つの run record が欠けていれば `continue_test`、`blocked`、`not_run` だけが誠実です。smoke が通っても「拡大する価値がある」だけで、「最良のモデル」や「生産性向上」の証明ではありません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-JA.md">← 前の章<br><strong>第18章 · コンテンツ、デザイン、データ、自動化トラック</strong></a></td><td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-JA.md">次へ →<br><strong>第20章 · Codexで使う個人の作業システムを作る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
