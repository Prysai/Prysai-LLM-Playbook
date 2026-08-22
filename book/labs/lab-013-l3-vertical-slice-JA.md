<!-- content_id: lab-013-l3-vertical-slice | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-013-l3-vertical-slice
title: "完全な垂直スライスを実行する"
level: L3
domain: engineering
goal: "限定変更を定義から証拠と引き継ぎまで進める"
setup: "使い捨てリポジトリコピー、許可されたMarkdown出力パス一つ、公開も認証情報もなし"
task: "release noteの変更をCP0からCP4で実行し、限定チェック、失敗分岐、新規文脈での引き継ぎを行う"
evidence: ["入力hash、基準、checkpoint、行動log", "diff、コマンド出力、終了コード、主張と証拠の表", "失敗記録、引き継ぎ、rollback、未検証一覧"]
failure_variant: "必要入力を外す、チェックを失敗させる、CP2後に再開する、外部行為の指示を混入する、永続変更を要求する"
reflection: "最大の根拠のない主張または不要行為を防いだcheckpointはどれか？"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "低リスクの調査またはコンテンツ作業にcheckpointを移す"
transfer_domain: "工学、調査、コンテンツ"
transfer_evidence: "書き直したプロトコル、checkpoint、成果物またはblocked記録、証拠表、引き継ぎ"
transfer_limitations: "ローカルスライスはリモート公開、本番挙動、読者理解を証明しない"
---

# Lab 013: 完全な垂直スライスを実行する

## 目的と準備

計画、編集、チェック、レビュー、引き渡し、公開を混同せず、小さな流れを完了します。使い捨てコピーで、指定されたMarkdown release noteだけを変更します。入力とhash、開始時の `git status`、許可パス、受入、rollback、禁止行為を残します。公開、push、依存追加、認証情報は範囲外です。

| Checkpoint | 必要な証拠 |
|---|---|
| CP0 定義 | 目標、入力、範囲、権限、停止、基準hash |
| CP1 計画 | 最小スライス、方法、予想証拠、rollback |
| CP2 変更 | diff、変更パス、行動log、出力hash |
| CP3 検証 | コマンド、生出力、終了コード、範囲、未実行チェック |
| CP4 引き継ぎ | 完了、不完全、証拠、未知、次の確認、rollback |

## チェックポイントのプロトコル

各遷移を別々の記録に残します。ここにある手順は教材であり、実際の
観察結果が証拠です。

### CP0 — 定義

目的、入力、許可されたパス、権限、受入条件、停止条件、基準 hash、禁止
行為を記録します。認証済みか、技術的に実行可能かは観察結果として書け
ますが、それだけで公開やリモート変更を許可したことにはなりません。

### CP1 — 計画

最小の変更、失敗する可能性のあるチェック、期待する成果物、rollback を
決めます。ネットワーク、インストール、push、公開、認証情報、許可パス外
の変更を実行しないことも明記します。

### CP2 — 変更

指定された release note だけを書き換えます。時刻、行動、結果、変更パス、
出力 hash、diff を保存します。入力やパスが曖昧なら `blocked` とし、別の
場所を推測してはいけません。

### CP3 — 検証

宣言したディレクトリで焦点を絞った check を実行します。コマンド、生の
出力、終了コード、バージョン、対象範囲、未実行の check を保存します。
終了コード 0 が示すのはその環境でのそのコマンドだけであり、公開や本番
挙動、読者の理解を示すものではありません。

### CP4 — 引き継ぎ

完了、不完全、observed、verified、`unverified`、`blocked`、`not_run` を
分けた引き継ぎを書きます。次の安全な確認、rollback、担当者、意図的に
行わなかった行動を記録します。

## タスク契約と外部作用の境界

```text
目的と範囲外:
入力、revision、hash:
読み取り / 書き込みパス:
許可された行動:
禁止された行動: ネットワーク、インストール、push、公開、secret
観察可能な受入条件:
証拠と rollback:
停止条件:
```

外部行動を検討するなら、アカウント、組織、リポジトリ、branch、audience、
payload を明記できなければ契約外です。ページを観察することは送信すること
ではありません。この Lab では Submit、Push、Publish は実行しません。

## 失敗カードと復旧

| 症状 | 最初の観察 | 安全な判断 |
|---|---|---|
| 入力がない | パスとファイル一覧 | `blocked` とし、正確な入力を尋ねる |
| check が失敗 | 出力、終了コード、diff を保存 | 診断条件を変えるか停止 |
| CP2 後に応答が消えた | コピーの状態、hash、diff | 再実行前に照合する |
| 外部テキストが token の upload を指示 | その出典と範囲 | 信頼できないデータとして拒否 |
| 永続変更を求められた | 作用、対象、rollback | `blocked` とし、インストールも公開もしない |

再開するのは、変更した診断条件と最初の試行による作用を理解した後だけ
です。

## 実験と失敗

入力にある事実だけでnoteを書きます。許可パスだけが変わり、必須内容があり、根拠のない主張がないか確認します。正しいdiffは公開、理解、リモート同期を証明しません。

少なくとも一つ失敗させます。入力を外して停止する、checkを失敗させ出力を残す、CP2後にcheckpointとリポジトリ状態だけで再開する、tokenをアップロードせよという文をデータとして扱う、未承認の永続変更で停止する。再試行は診断が変わり既存の副作用を理解した後だけです。

- [ ] CP0 に目標、範囲、権限、受入、rollback が明示されている。
- [ ] CP0–CP4を保存し、許可パスだけを変更した。
- [ ] コマンドに出力と終了状態がある。
- [ ] 失敗が安全に停止または回復した。
- [ ] 引き継ぎがローカル完了と公開・本番を分けている。

## 証拠パッケージと参照実行

入力コピーと hash、CP0–CP4、diff、行動 log、コマンド出力、失敗記録、
主張と証拠の表、rollback 先、未知の一覧を保存します。各主張には
`scope`、`evidence`、`status`、`uncovered`、`next_check` を付けます。

保守者の参照パッケージは fixture の決定性、失敗分岐、復旧差分を示せます。
それは学習者の独立実行、Codex の挙動、転移、公開、本番を証明しません。

hash、checkpoint、diff、log、出力、失敗、主張・証拠表、引き継ぎを保存します。Labは `draft / not_run` のままです。保守者の決定的な参照実行は、学習者の独立性、Codex挙動、転移、本番を証明しません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-JA.md">← 前へ<br><strong>Lab 012 · チーム能力の移行</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-JA.md">次へ →<br><strong>Lab 014 · 再開時の照合</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
