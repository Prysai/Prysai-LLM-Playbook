<!-- content_id: chapter-16-engineering-track | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第16章：エンジニアリング・トラック、着想から信頼できるソフトウェアへ

**状態：** `candidate`。**実験：** `draft / not_run`。この章はエンジニアリングのライフサイクルを教えます。フィールド報告はローカル再現でも、すべての版への原因確認でもありません。

## 問題

エンジニアリングでは、要件、設計上の選択、テスト設計、実行時の観測、rollback が明確になる前にコードを書き始めがちです。patch は build と unit test を通っても、利用者の経路、エラー処理、依存関係の版、デプロイ、安全な回復が正しいとは限りません。

> build 成功、unit test 成功、integration test 成功、実行時の正しさ、利用者の受け入れ、本番準備は別々の主張です。

エンジニアリング Skill は証拠を伴うライフサイクルです。各段階に入口条件、最小 slice、失敗経路、出口証拠を置きます。

## エンジニアリングのライフサイクル

```text
問題定義 → 仕様と受け入れ → 計画と slice
→ 段階的実装 → static check と test
→ 実行時検証 → review と単純化
→ release と rollback → 保守と regression
```

| 段階 | 入口 | 最小の出口証拠 |
|---|---|---|
| 定義 | 問題と範囲 | 他者が言い直せる問題文 |
| 仕様 | 境界、入出力、エラー | 受け入れ条件と非目標 |
| 計画 | 依存とリスク | 独立に検証できる slice |
| 実装 | 現在の slice と baseline | 小さく説明可能な diff |
| テスト | 挙動と失敗を試せる | command、結果、失敗の説明 |
| 実行時 | 起動可能な環境と代表データ | version、log、response または画面 |
| release | review と rollback がある | 記録、監視、rollback rehearsal |

## 実装前に仕様を書く

「export を追加」なら、形式、データ範囲、権限、部分ファイル、上書き方針、最終受け入れを確認します。利用者の操作、入力制約、成功・エラー出力、境界、非目標、性能・安全制約、観測信号、受け入れ方法を示します。Skill が黙って決定を置き換えることはできません。

source-driven、doubt-driven、incremental に進めます。API や版には公式文書、型、現在の code、再現結果を使い、blog やモデル記憶は手掛かりです。型と unit test が証明しない network、database、browser、permission、concurrency、time zone、deployment を確認します。一度に一つの説明可能な slice を変え、diff と rollback 点を残します。

## 実行、停止、回復

build の証拠は compile できること、test の証拠は指定の assertion が通ることです。実行時の証拠には start command、version、環境値、実入力、response または画面、log、error path が必要です。本番準備には security、performance、migration、monitoring、rollback、利用者受け入れも加わります。

timeout まで出力なし、欠けた test 依存、未知の worktree、実 credential 要求、永続変更、公開、deploy、restart は停止して scope を確認する信号です。緑にするために force reinstall や権限拡大をせず、認可がない時は隔離環境、test double、static check を使います。

## 練習と境界

ローカルのリストを重複除去して JSON に書くような低リスク機能を選びます。通常、空、重複、無効入力を用意します。目的だけを渡すラウンドと、問題、受け入れ、非目標、slice、test matrix を先に作るラウンドを比較します。両方で static check、unit test、ローカル実行、空・無効入力を試し、契約、diff、command、終了状態、log、version、入力、rollback 点を残します。

中断を模擬したら、続ける前に worktree、diff、log、test 状態を確認します。実記録と独立 review ができるまで `candidate / not_run` のままです。特定の認可なしに install、publish、deploy、restart はしません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="15-research-track-JA.md">← 前の章<br><strong>第15章 · 調査トラック、問いから監査可能な知識へ</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md">次の章は準備中 →<br><strong>第17章の提供状況を見る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
