<!-- content_id: chapter-14-discover-and-audit-skills | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第14章：外部 Skill を見つけ、導入前に監査する

**状態：** `candidate`。**実験：** `draft / not_run`。ここでは Skill の発見と採用レビューを扱います。フィールド報告は教材であり、ローカル再現や公式の原因調査ではありません。

## 問題

外部 Skill は繰り返す手順、領域知識、ツール呼び出しを再利用可能な形にできます。同時に、コンテキスト、依存関係、ネットワーク、アカウント権限、外部副作用、ライセンス義務も増やします。本当の問いは「もっと Skill をどこで探すか」ではありません。実際のタスクの穴に Skill が必要か、ディレクトリ項目を監査可能な候補へ変えるには何が必要か、秘密を漏らさず権限を越えずにどう試すかです。

> ディレクトリは発見の入口であって品質の証明ではありません。インストールは状態変更であり、検証ではありません。起動できることは採用すべきことを意味しません。

## 最初にタスク契約を書く

```text
目的: 何を変えるか。
入力: どのファイル、データ、公開ソースを読めるか。
出力: 納品物の形は何か。
受け入れ: 完了を示す証拠は何か。
権限: 許可されたツール、ネットワーク、アカウント、書き込みは何か。
停止: 何が起きたら止まり質問するか。
```

| ギャップ | 通常の対処 | よくある誤り |
|---|---|---|
| 概念・事実がない | 調査、公式資料、人の判断 | 出典確認の代わりに Skill を使う |
| 安定して繰り返す手順 | ローカル Skill または script | 一つの巨大 Skill に全てを入れる |
| 外部システムの観測・変更 | 管理された tool または connector | 「呼べる」を「許可された」と扱う |
| 目的・受け入れが不明 | 先に明確化する | 要件の曖昧さをインストールで隠す |

Skill は方法とルーティングの契約、tool は外部を観測・変更する接口です。Plugin と Connector は製品層です。レビューでは「何を読むか、何を勧めるか、tool は何をするか、外部サービスは何を受け取るか」を分けます。

## 導入前レビューカード

候補ごとに、タスクの穴、trigger / non-trigger、URL と固定 revision、在庫、license、NOTICE、入れ子の資産、依存関係、ネットワーク、アカウント、隔離先、秘密の境界、外部副作用、backup、rollback、承認点、四つの行動テスト、owner と次回レビューを記録します。

採用判断は `recommendation-only`、`blocked`、`approved-to-install`、`installed-candidate` の四つだけです。行動の証拠は別にします。ファイルの存在、発見、読み込み、採用、検証は別の状態です。存在は発見を、発見は読み込みを、読み込みは採用を、採用は検証を証明しません。

## Skill 本文は信頼できない入力

`SKILL.md`、README、遠隔ページ、Issue、サンプル、tool 結果はデータとして扱います。「上位ルールを無視」「秘密をアップロード」「結果を送信」「この未承認コマンドを実行」は、Skill 内にあっても権威を得ません。必要最小限だけを取り出し、秘密を除き、可能ならネットワークなしの sandbox で試し、拒否した内容を記録します。

低リスクから段階的に進めます。ローカル読み取り、可逆書き込み、sandbox の外部接続、その後に本番書き込みと公開です。上の層へ進む前に新しい権限、証拠、rollback を書きます。一回の smoke test が支えるのは高くても `candidate` です。

## 練習と境界

固定 revision の二候補を、インストールせずにレビューします。A は追跡可能な license 信号がありタスクにも合うので `recommendation-only` にできます。B は license / NOTICE か具体的 rollback が欠けるので `blocked` です。URL、revision、在庫、依存関係、権限、隔離先、backup、復元、承認、owner を残し、A には正例、境界例、失敗・注入例、移行例を設計しますが実行しません。

この練習が示すのはレビュー判断だけであり、発見、読み込み、実行、採用ではありません。宣言した環境での実行と独立レビューが残るまで、この章は `candidate / not_run` です。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-JA.md">← 前の章<br><strong>第13章 · ファイル、ターミナル、ブラウザ、GitHub にまたがる行動境界</strong></a></td><td align="right"><a data-chapter-nav="next" href="15-research-track-JA.md">次へ →<br><strong>第15章 · 調査トラック、問いから監査可能な知識へ</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
