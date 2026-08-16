<!-- content_id: book-labs-readme | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook：Lab 目次

<!-- language-switcher:start -->
**言語：** [English](../README-EN.md) | [简体中文](../README-ZH.md) | [Español](../README-ES.md) | [日本語](README-JA.md) | [한국어](../README-KO.md) | [Deutsch](../README-DE.md)
<!-- language-switcher:end -->

Lab は、LLM への頼み方が実際の作業をより明確に進める助けになるかを自分で確かめる場所です。
事務手続きだけを学ぶ別コースでも、Codex Cloud やプログラミングを必須にするものでもありません。
各 Lab は見える問いから始まります。回答は事実を保つか、指定の形を守るか、不明なことを示すか、
他の人が確認できる変更を残すか、を確かめます。

これは Lab カタログ全体の日本語入口です。リンクは `-JA` ファイルだけを開き、知らないうちに
英語へ移動させません。十八件のファイルがあることは、独立した言語レビューや学習者の実行を
意味しません。

## 小さな実践から始める

曖昧な依頼と確認できる依頼の違いを知りたいなら、
[Lab 001：最初の安全なタスク](lab-001-first-safe-task-JA.md)を開いてください。捨てられる
プロジェクトがない間は、作業スペースを使う部分を省略して構いません。何もインストールせずに
再利用できる方法を選びたいなら、[Lab 004：Skill の選択](lab-004-skill-selection-JA.md)へ進みます。

`draft` の Lab は、何を試し、何を保存し、いつ止まるかを示す学習契約です。各 Codex の画面で
最近実行されたことや、だれかがすでに学べたことを証明するものではありません。

## 現在の状態

カタログには 18 個の固定 ID があります。すべて `draft` で、学習者の実行状態は `not_run` です。
この日本語ルートでは Lab 001–018 の十八件を開けます。すべてのLabに日本語ファイルがあり、このページから英語へリンクしません。

## 日本語の Lab マップ

| Lab | 身につけること | レベル | 日本語ルートの状態 |
|---|---|---:|---|
| 001 | 最初の依頼を使える形にする | L1 | [Lab 001 を開く](lab-001-first-safe-task-JA.md) |
| 002 | タスク・プロトコル | L2 | [Lab 002 を開く](lab-002-task-protocol-JA.md) |
| 003 | 証拠の確認 | L3 | [Lab 003 を開く](lab-003-evidence-review-JA.md) |
| 004 | Skill の選択 | L4 | [Lab 004 を開く](lab-004-skill-selection-JA.md) |
| 005 | Skill の設計 | L4 | [Lab 005 を開く](lab-005-design-a-skill-JA.md) |
| 006 | Agent の停止条件 | L5 | [Lab 006 を開く](lab-006-agent-stop-conditions-JA.md) |
| 007 | 行動の境界 | L3 | [Lab 007 を開く](lab-007-action-boundaries-JA.md) |
| 008 | 調査の問い | L3 | [Lab 008 を開く](lab-008-research-question-JA.md) |
| 009 | エンジニアリングのライフサイクル | L3 | [Lab 009 を開く](lab-009-engineering-lifecycle-JA.md) |
| 010 | 共有するプロダクト文脈 | L3 | [Lab 010 を開く](lab-010-product-context-JA.md) |
| 011 | GPT と Codex の境界 | L0 | [Lab 011 を開く](lab-011-gpt-codex-boundaries-JA.md) |
| 012 | チーム能力の移行 | L6 | [Lab 012 を開く](lab-012-team-capability-migration-JA.md) |
| 013 | 監査可能な縦方向スライス | L3 | [Lab 013 を開く](lab-013-l3-vertical-slice-JA.md) |
| 014 | 再開時の照合 | L3 | [Lab 014 を開く](lab-014-resume-reconciliation-JA.md) |
| 015 | 証拠を添えた引き渡し | L5 | [Lab 015 を開く](lab-015-evidence-delivery-JA.md) |
| 016 | 副作用の境界 | L3 | [Lab 016 を開く](lab-016-side-effect-boundary-JA.md) |
| 017 | Skill 発見の監査 | L4 | [Lab 017 を開く](lab-017-skill-discovery-audit-JA.md) |
| 018 | 固定した練習契約での言語転移 | L2 | [Lab 018 を開く](lab-018-language-transfer-JA.md) |

番号はカタログ ID であり、次の番号が必修であることや次のレベルを意味しません。進み方は
学習パスで決まり、この目次は今日日本語で開ける資料だけを示します。

## Lab を安全に行う方法

1. 捨てられるフォルダ、固定した入力版、本物の認証情報なしで始める。
2. 行動前に、Lab の権限と副作用の境界を読む。
3. 基準状態、コマンド、出力、差分、失敗した分岐、不明点を保存する。
4. 対象、権限、出典、復元方法が確認できなければ止まる。
5. 元の実践を記録してから、転移課題を行う。

## 状態の境界

`draft` は、`candidate`、`verified`、`production-ready` と呼ぶ前にプロジェクトが定めた証拠が
まだ必要であることを意味します。`run_status: not_run` は、このリポジトリにその Lab の学習者実行
結果がないことを意味します。ファイルの存在、ページが開くこと、ローカルリンクの検査が通ることは、
学習、モデルの挙動、別環境での有効性を証明しません。

## 日本語ルートへ戻る

- [日本語の書籍入口](../README-JA.md)
- [日本語の書籍目次](../table-of-contents-JA.md)
- [初心者の練習カード](../communication-clinic-JA.md)
