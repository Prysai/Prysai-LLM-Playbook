<!-- content_id: lab-007-action-boundaries | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# Lab 007：一つの README タスクを三つの行動境界に置く

---
id: lab-007-action-boundaries
title: "三つの作業面で認可、停止、証拠を練習する"
level: L3
domain: general
goal: "公開報告に現れる境界症状を、低リスクで観測可能な練習に変える"
setup: "編集済み README、ローカルコピー、隔離 Worktree またはシミュレーション、組織面を表す第二ディレクトリ。実際の token は不要"
task: "三つの面で同じ README を観測し、最小のローカル変更、状態、症状、確認、証拠を記録する。実際の push と公開はしない"
evidence:
  - "ログイン、認可、実行、検証を分けた各シナリオの状態カード"
  - "症状カード、最小診断順序、停止条件、証拠表"
  - "ローカルと Worktree の diff と rollback、第二面の追加リスク"
  - "文書、研究、公開準備への移行記録"
failure_variant: "ブラウザ成功を token exchange と取り違え、認証済み host を対象 host と取り違え、組織間 installation を推測し、検証のために強制再インストールする"
reflection: "「ログイン済み」で隠れる状態は何か。権限を広げずに証拠を増やす確認は何か。三面で rollback とレビューはどう変わるか"
status: draft
last_verified: "未実行。三面の実験は未実施で、このファイルは契約のみ定義する"
transfer_task: "外部書き込みを必要としない文書、研究、公開準備へカードを移す"
transfer_domain: "リリース準備、研究、コンテンツ、チーム承認"
transfer_evidence: "編集済みカード、状態、症状、ログ、確認、rollback"
transfer_limitations: "実際の account、Enterprise、installation、connector、公開基盤、遠隔 rollback を証明しない"
---

## 問題と固定 fixture

公開報告では logged in、到達可能、認可済み、実行済み、検証済みが混同されます。
ブラウザ認証の後段交換失敗、Enterprise CLI と PR 入口の host 不一致、別組織の
installation 不成立、検証を理由にした永続環境の再インストールが代表例です。
利用者報告であり、ローカル再現や公式原因ではありません。

実際の組織、remote、token、Cookie、秘密鍵、環境ファイル、本番ファイル、個人
データを使わず、次だけを用意します。

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

Status の下に boundary: local-only を一行だけ追加し、差分と確認を示します。
新しい明示的認可がない限り commit、push、公開、インストール、永続環境変更は
しません。外部行動は not_run とし、rollback はコピーを戻すか一行を削除します。

## 三つのシナリオ

### シナリオ A：通常のローカルコピー

絶対パスと baseline hash を記録し、一行編集、diff、offline
確認、rollback を保存します。遠隔と公開は not_run です。

### シナリオ B：隔離 Worktree

使い捨て Git、または worktree-simulation を使います。主ツリー、
ブランチ、基準 commit、隔離パスを記録し、主ツリーが変わらないことを確認します。
commit、push、公開はしません。

### シナリオ C：組織型の第2ディレクトリ

organization-like-simulation と明記した第二
ディレクトリを使います。組織、Enterprise、connector、remote、ネットワークに
接続しません。可視性、共同作業者、ブランチ保護、installation 範囲、rollback
責任者を見直します。技術的に書けることは組織の認可ではありません。

## 症状カード：安全な観測の質問

| カード | 症状 | 安全に記録できる事実 | 推測してはいけないこと | 最小確認 |
|---|---|---|---|---|
| S-02 | ブラウザ認証成功後に token exchange 失敗 | ブラウザ段階だけ成功 | 完全ログインや原因確定 | 段階を分けて脱識別エラーを記録 |
| S-03 | Enterprise CLI は認証済みだが PR 入口が github.com を調べ 401 | host が異なる可能性 | GitHub 全体の利用可能性 | host、remote、入口を読み取り比較 |
| S-04 | 一組織へのアクセスが別組織の installation にならない | identity、organization、installation、repo access は別状態 | 管理者なら自動的に許可済み | 状態を分け、installation 要求はしない |
| S-11 | 検証が force reinstall に拡大 | 検証とインストール認可は別 | 実行可能なら許可済み | diff を保存して隔離検査へ戻る |

各カードに、source は user report、local reproduction は not done、official
root cause は not confirmed と書きます。

## 段階状態カード

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run
identity_observed:
action_authorized:
result_verified:
external_state_changed:
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

identity を観測したことは認可ではなく、実行は検証ではなく、書けるディレクトリ
は共有または遠隔の書き込み許可ではありません。

## 振り返り

状態を `verified` と書く前に、それを支える観測、まだ不明な段階、次の確認が外部
副作用を増やさず情報だけを増やすかを記録します。

## 最小診断順序

1. 正確なパス、対象、host、データ範囲、禁止行動を固定する。
2. hash、git status、ブランチ、Worktree、元タスクを保存する。
3. 入口、identity、対象、認可、実行、検証のどの段階かを決める。
4. ファイル、パス、設定形状、host、脱識別ログを読み取り専用で確認する。
5. fixture で一つだけ可逆編集し、diff と戻り値を保存する。
6. 三面の可視性と rollback 責任を比較する。
7. 受け入れ証拠と一致したときだけ verified、そうでなければ unverified または
   blocked として小さい次の確認を提案する。

## 停止条件と証拠表

対象不明、commit/push/公開/インストール、秘密、曖昧な承認、外部アカウント、
永続環境、force 操作、未知の書き込みが出たら停止します。タスク、面、baseline、
五つの権限フィールド、症状、最小行動、結果、状態、rollback、外部行動を証拠表に
し、外部行動は not_run と明記します。

## 故意の失敗レビュー

fixture 内で「ブラウザ成功だから遠隔へ書く」「CLI がログイン済みだから host は
正しい」「管理者だから installation 済み」「検証のため再インストール」を処理し、
欠けている証拠とより小さい確認を記録します。その後、研究ソース表、公開ノート、
脱識別 PR のレビューへ移します。

三面を繰り返し、四つの状態を分け、S-02/S-03/S-04/S-11 を利用者報告として扱い、
baseline を先に保存し、force を証明に使わず、カードと移行を完成すれば合格です。
token、push、公開、installation、デプロイ、通知、永続置換はすべて not_run です。

## 出典と限界

Codex 問題研究とフォーラム研究は症状とコミュニティ背景を提供しますが、ローカル
再現や公式修正ではありません。fixture は独自で可逆ですが、実際の account、
connector、Enterprise、公開、遠隔 rollback を証明しません。

## 実行記録と固定した受入条件

各作業面で新しい `run_id` を作ります。受入条件は固定です。`Status` の下に
一行だけ追加し、README の他の内容を保ち、diff を保存し、commit、push、公開は
`not_run` とします。

```text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
identity_observed: yes | no | not_observed
action_authorized: yes | no | not_observed
result_verified: yes | no | not_observed
external_state_changed: yes | no | not_observed
rollback_entry:
evidence_paths:
stop_reason_or_next_check:
```

各カードに sandbox、approval、network、読み書き root、effect confirmation の
五つを記録します。`not_observed` を推測で埋めず、`unverified` または `blocked`
として残します。

| 要件 | 最小の証拠 | 状態 |
|---|---|---|
| タスク境界 | 匿名 README、許可ファイル、禁止行動 | `planned` / `verified` |
| 作業面 | 絶対パス、シナリオ、version または `not_observed` | `verified` / `unverified` |
| baseline | hash、`git status`、branch、既存 diff | `executed` / `verified` |
| ローカル行動 | 正確な編集/command、diff、終了コード | `executed` / `not_run` |
| rollback | 復元または逆 diff とその確認 | `available` / `not_run` |
| 外部行動 | commit、push、publish、install、通知 | 個別認可がない限り `not_run` |

## 転移課題

fixture の中だけで次を扱います。「ブラウザが成功したから遠隔へ書く」
「CLI が接続済みだから host は正しい」「管理者だから installation 済み」
「検証のため再インストールする」。各文について、観測できた段階、欠けた証拠、
すでに作用していた場合の状態、外部作用を増やさず情報を増やす最小の確認を
記録します。

文書の source table、release note、または書き込みをしない PR review に転移します。
入力と受入条件は変えますが、identity、authorization、execution、verification の
区別は保ちます。

## 合格基準

次を満たすときだけ合格です。

- A、B、C を別々の `run_id` と baseline で繰り返した。
- 各カードで identity、authorization、execution、result を分けた。
- S-02、S-03、S-04、S-11 を利用者報告として扱い、公式原因やローカル再現と
  呼ばなかった。
- 結論の前に diff と rollback を保存した。
- token、push、publish、installation、deployment、通知、永続置換をすべて
  `not_run` とした。
- 転移記録を元の会話なしで別の人がレビューできる。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab のナビゲーション"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-006-agent-stop-conditions-JA.md" aria-label="前の Lab：Lab 006 · Agent の停止条件を設計する">← 前の Lab<br><strong>Lab 006 · Agent の停止条件を設計する</strong></a></td>
<td align="right"><a data-lab-nav="next" href="lab-008-research-question-JA.md" aria-label="次の Lab：Lab 008 · テーマを答えられる研究質問に絞る">次へ →<br><strong>Lab 008 · テーマを答えられる研究質問に絞る</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
