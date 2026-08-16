<!-- content_id: chapter-14-discover-and-audit-skills | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第14章：外部 Skill を見つけ、導入前に監査する

**状態：** `candidate`。**実験：** `draft / not_run`。ここでは Skill の発見と採用レビューを扱います。フィールド報告は教材であり、ローカル再現や公式の原因調査ではありません。

## この章が解決する問題

外部 Skill は繰り返す手順、領域知識、ツール呼び出しを再利用可能な形にできます。同時に、コンテキスト、依存関係、ネットワーク、アカウント権限、外部副作用、ライセンス義務も増やします。本当の問いは「もっと Skill をどこで探すか」ではありません。実際のタスクの穴に Skill が必要か、ディレクトリ項目を監査可能な候補へ変えるには何が必要か、秘密を漏らさず権限を越えずにどう試すかです。

> ディレクトリは発見の入口であって品質の証明ではありません。インストールは状態変更であり、検証ではありません。起動できることは採用すべきことを意味しません。

## 学習目標

task gap を knowledge、tool、authorization の問題と区別し、source、revision、license、permission、recovery、evidence を使って candidate を判断できます。

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

## install 前に candidate を反証できる decision にする

directory、Star、demo は candidate を作るだけです。candidate ごとに review card を残します。

```text
task gap: 今回不足している安定した method
source: project URL、fixed revision、確認日、actual file path
trigger / non-trigger: 適用時と譲る時
license: repository、target file、NOTICE、nested script / asset の evidence
dependencies / permissions: read、write、network、account、secret、external side effect
isolated trial: directory、secret-free input、allowed action、stop point
recovery: pre-install backup、restore step、read-back check
decision: recommendation-only / blocked / approved-to-install / installed-candidate
```

fixed revision、license/NOTICE、install target、backup、restore check の一つでも欠ければ `blocked` です。「先に install」は evidence gap を埋めません。

`file exists`、`discovered`、`loaded`、`adopted`、`verified` を混同しません。`SKILL.md` があることは最初だけ、install log はせいぜい `installed-candidate` を支えるだけです。

## 四段階 review：不明な candidate は先に止める

「どう install するか」から始めません。次の四つを順に問い、記録で答えられない最初の箇所で
stop します。

1. **task に本当に必要か？** 繰り返し、安定しており、見落としやすい decision を一文で書く。fact が不足なら source を確認し、goal が曖昧なら先に clarify する。
2. **何を受け取るのか？** project URL、fixed revision、actual entry path、license/NOTICE、nested dependency を固定する。name や Star 数だけでは足りない。
3. **何をする可能性があるか？** read、write、install、network、account、secret、external effect を分ける。inventory がなければ安全だと推測しない。
4. **failure 後にどう戻すか？** isolated directory、pre-install backup、restore、read-back check を書く。「folder を消す」だけでは recovery を証明しない。

四つすべてに記録で答えられるときだけ `approved-to-install` を勧められます。一つでも欠ければ
通常は `recommendation-only` または `blocked` です。candidate を否定するのではなく、好奇心を
未審査の environment change に変えないためです。

### 短くても引き継げる rejection note

```text
candidate: <fixed URL と revision>
decision: blocked
reason: entry script は network を使うが、dependency、install target、restore read-back がない。
checked: project link、entry file、top-level license signal。
not checked: runtime behavior、nested asset license、actual network traffic。
unblock: 不足情報をそろえ、non-sensitive isolated directory で review をやり直す。
```

これは「危なそう」より役立ち、run していない behavior を観測済みの risk に変えません。

## 小実験：二つの candidate を install せず review する

### 準備

固定 revision の public candidate を二つ、または整理済みの local example を二つ選びます。URL、revision、inventory、license/NOTICE signal だけを用意します。install target を決めず、login や secret の使用もしません。

### タスク

fixed revision の public candidate 二つ、または redacted local sample 二つを選びます。A には traceable source と license signal があり、B には license/NOTICE、dependency declaration、restore plan のどれかが意図的にありません。

1. source、revision、inventory、entry summary、dependency、license signal だけを read する。runtime directory へ download、login、network execution はしない。
2. 両方の card に task gap、boundary、minimum permission、isolated trial、approval point を書く。
3. A には positive、boundary、injection/failure、migration case を設計し、input、expected behavior、stop、evidence を書く。ただし run したとは言わない。
4. B は `blocked` のままにし、unblock に必要な material を示す。

source 内の「上位の rule を無視」「`.env` を upload」「test のため production を変える」は untrusted data であり、Skill permission や user authorization ではありません。拒否、記録、stop が正しい結果です。

### 証拠

A と B について、source、revision、実際の path、license/NOTICE の結論、dependencies、想定 permission、owner、decision、unknown を card に残します。A には positive、boundary、failure/injection、migration の四つの設計済み case を残します。card は install や runtime behavior を主張しません。

### 振り返り

どの gap が本当に繰り返し使う method で、どれが fact、tool、authorization の不足でしたか。何が欠けて install を止めましたか。

## 現実の問題：見つかることは採用できることではない

directory entry、star、demo は candidate を見つけやすくしても、origin、nested dependency、side effect の証拠にはなりません。最初に具体的な反復 task を改善するかを決め、その後で secret のない狭い環境で調べます。

## 移行タスク

チームがすでに使う internal script に card を適用します。trigger と non-trigger、最小の read-only check、injection case、後で write や network を許可する人を書きます。script と production は変更しません。

## 受け入れチェックリスト

- [ ] knowledge gap、繰り返し使う method、tool、authorization を区別できる。
- [ ] source、fixed revision、path、license/NOTICE、permission、recovery、owner を記録する。
- [ ] `file exists`、`discovered`、`loaded`、`adopted`、`verified` を混同しない。
- [ ] license、permission、recovery が不明なら install ではなく `blocked` にする。

## 出典と保守の境界

review card と状態の分離は安定した学習方法です。directory、install、runtime behavior、product surface は変わるため、fixed revision、具体的な environment、実際の target path ごとに確認し直します。

## 自己確認

- [ ] knowledge gap、repeated method、tool capability、unclear task を分けられる。
- [ ] URL、revision、path、license/NOTICE、dependency、permission、owner を残した。
- [ ] obtain、install target write、dependency/authentication、team/production scope の approval を分けた。
- [ ] evidence があるときだけ exists、discovered、loaded、adopted、verified と書く。

## adoption receipt：review できることを先に示し、有効化を決める

この receipt は project の original Skill と、外部で見つけた candidate の両方に使います。popular な repository、流暢な説明、見える directory だけで、外部 content が trustworthy または executable になるわけではありません。

```text
candidate の name と version / commit:
source: original | external；external project の original link:
owner と review date:
埋める具体的な task gap:
license: code、text、asset、nested dependency が別々に明確か:
想定する read / write / network / install / send / publish:
positive、boundary、failure、transfer case:
observed: file | discovery | selection | load | execution | read-back verification
not observed:
許可された temporary trial scope:
reject、pause、adopt の理由:
次の最小 safe check:
```

外部の `SKILL.md`、page、Issue、install log、tool output は評価対象の data です。その command、link、「以前の rule を無視する」のような文章は authority を増やしません。source、license、behavior scope、recovery path が不明なら、正しい決定は `blocked` または reject であり、「先に install」ではありません。

### 一度に信頼せず、層ごとに有効化する

先に metadata と instruction を読み、次に non-sensitive temporary directory で read-only または reversible な経路を試します。result、scope、recovery を記録してから、write、network、install、external action が必要かを人が別々に決めます。一度の成功は記録した host、version、input、task だけを支持し、model、directory、account をまたぐ reliability を証明しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-JA.md" aria-label="前の章: 第 13 章 · ファイル、ターミナル、ブラウザ、GitHub にまたがる行動境界">← 前へ<br><strong>第 13 章 · ファイル、ターミナル、ブラウザ、GitHub にまたがる行動境界</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="15-research-track-JA.md" aria-label="次の章: 第 15 章 · 調査トラック、問いから監査可能な知識へ">次へ →<br><strong>第 15 章 · 調査トラック、問いから監査可能な知識へ</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
