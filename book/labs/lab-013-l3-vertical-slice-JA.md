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

## 実験と失敗

入力にある事実だけでnoteを書きます。許可パスだけが変わり、必須内容があり、根拠のない主張がないか確認します。正しいdiffは公開、理解、リモート同期を証明しません。

少なくとも一つ失敗させます。入力を外して停止する、checkを失敗させ出力を残す、CP2後にcheckpointとリポジトリ状態だけで再開する、tokenをアップロードせよという文をデータとして扱う、未承認の永続変更で停止する。再試行は診断が変わり既存の副作用を理解した後だけです。

- [ ] 目標、範囲、権限、受入、rollbackが明示されている。
- [ ] CP0–CP4を保存し、許可パスだけを変更した。
- [ ] コマンドに出力と終了状態がある。
- [ ] 失敗が安全に停止または回復した。
- [ ] 引き継ぎがローカル完了と公開・本番を分けている。

hash、checkpoint、diff、log、出力、失敗、主張・証拠表、引き継ぎを保存します。Labは `draft / not_run` のままです。保守者の決定的な参照実行は、学習者の独立性、Codex挙動、転移、本番を証明しません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-JA.md">← 前へ<br><strong>Lab 012 · チーム能力の移行</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-JA.md">次へ →<br><strong>Lab 014 · 再開時の照合</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
