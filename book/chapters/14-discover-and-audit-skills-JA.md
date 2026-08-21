<!-- content_id: chapter-14-discover-and-audit-skills | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第14章：外部 Skill を見つけ、導入前に監査する

**状態：** `candidate`。**実験：** `draft / not_run`。この章では、Skill の発見と採用前のレビューを扱います。フィールド報告は教材であり、ローカルでの再現や公式な原因調査ではありません。

## この章が解決する問題

外部 Skill は、繰り返し使う手順、領域知識、ツール呼び出しを再利用できる形にまとめます。その一方で、コンテキスト、依存関係、ネットワーク、アカウント権限、外部副作用、ライセンス上の義務も増やします。本当に問うべきなのは「もっと Skill をどこで探すか」ではありません。実際のタスクの穴を Skill で埋めるべきか、ディレクトリの項目を監査可能な候補に変えるには何が必要か、秘密を漏らしたり権限を越えたりせずにどう試すかです。

> ディレクトリは発見の入口であって、品質の証明ではありません。インストールは状態の変更であって、検証ではありません。起動できるからといって、採用すべきとは限りません。

## 学習目標

この章を読み終えると、次のことができるようになります。

- task gap を knowledge、workflow、tool、authorization の問題に分ける。
- source、revision、trigger / non-trigger、依存関係、権限、外部副作用、license / NOTICE、隔離、backup、rollback、承認点、owner を含む導入前レビューを作る。
- prompt injection、秘密の要求、過剰な権限、未開示の外部操作を見つけ、candidate を `blocked` にするか安全な範囲へ絞る。
- 低リスクの smoke、boundary、failure テストから証拠を集め、ファイルの存在、発見、読み込み、採用、検証を区別する。
- adoption の判断を `recommendation-only`、`blocked`、`approved-to-install`、`installed-candidate` のいずれかで記録する。

## 現実の問題：見つかることと呼び出せることを取り違えない

フィールド調査には、Skill の見つけ方と呼び出し方について次のような報告があります。

- **FP-06:** 通常の `SKILL.md` は見つかるのに、ファイルの symlink は無視されたという報告です。これは「一覧にない」ことが「存在しない」ことを意味しない、という教材になります。発見の挙動は実装や版によって変わり得るため、永続的な製品ルールとして書きません。
- **FP-07:** 明示的な名前で呼び出す操作が、暗黙に表示される一覧に依存したという報告です。暗黙の routing と、明示的な name resolution の証拠を別々に記録します。一つの一覧で両方を検証したことにはしません。
- **FP-11:** source の確認が、永続環境への force reinstall に広がったという報告です。実行できることは、実行してよいことを意味しません。install、verification、publish、deploy、restart は別の状態で、それぞれに権限と証拠が必要です。

これらは利用者やコミュニティから集めた報告であり、ローカル再現でも、公式な一般挙動の確認でもありません。FP の番号はリスクの入口として使い、製品の保証や欠陥の断定には使いません。

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
| 概念・事実が足りない | 調査、公式資料、人の判断 | 出典確認の代わりに Skill を使う |
| 安定して繰り返す手順が必要 | ローカル Skill または script | 一つの巨大な Skill にすべてを詰め込む |
| 外部システムを観測・変更したい | 管理された tool または connector | 「呼び出せる」を「許可されている」と扱う |
| 目的・受け入れ条件が不明 | 先に明確にする | 要件の曖昧さをインストールで隠す |

Skill は方法とルーティングの契約であり、tool は外部を観測・変更するためのインターフェースです。Plugin と Connector は、それらの能力を運ぶ製品層です。レビューでは、「何を読むか」「何を勧めるか」「tool は実際に何をするか」「外部サービスは何を受け取るか」を分けて考えます。

### license と安全境界も採用条件にする

機能テストを通っても、license が不明、入れ子の依存関係が開示されていない、コードやブランドの再配布条件が不明、privacy の扱いが読めない候補は、リリースに入れられません。プロジェクトの asset register では、明確な license のない資料を原則として research reference または外部リンクにとどめます。directory は候補を集める索引であり、収録数、Star、紹介文は品質や権利の証拠ではありません。

リンクして読むこと、自分の言葉で要約すること、本文・コード・画像をコピーして配布することは別の行為です。repository の license が確認できても、nested Skill、script、image、dependency まで自動的に同じ条件になるとは限りません。実際のファイル、`LICENSE`、`NOTICE`、依存関係、再配布範囲を一つずつ確認します。

## 導入前レビューカード

候補ごとに、task gap、trigger / non-trigger、URL と固定 revision、在庫、license、NOTICE、入れ子の資産、依存関係、ネットワーク、アカウント、隔離先、秘密の境界、外部副作用、backup、rollback、承認点、四つの行動テスト、owner、次回レビューを記録します。

採用判断は次の四つだけにします。

- `recommendation-only`: task との適合はありそうなので、読み取り専用のレビューまたは隔離試験を勧める状態。
- `blocked`: revision、license / NOTICE、依存関係、権限、install target、backup / rollback のどれかが不明な状態。
- `approved-to-install`: target、復旧方法、権限、承認点が明確で、install はまだ行っていない状態。
- `installed-candidate`: 承認された隔離先に、path と log の根拠を残して install したが、動作検証と正式採用はまだ終わっていない状態。

操作の根拠は、採用判断とは別に記録します。behavior の状態も次の五つを分けます。

```text
file exists: 固定 revision の path、manifest、または hash を確認した
discovered: 現在の作業面で名前を一覧表示または解決できた
loaded: 新しい session で候補の resource または instruction が読み込まれた
adopted: owner と承認記録があり、指定した個人または team の範囲に含めた
verified: 宣言した環境で positive、boundary、failure、migration が通った
```

存在は発見を、発見は読み込みを、読み込みは採用を、採用は検証を証明しません。install log が示すのは install 操作であり、多くても `installed-candidate` を支えるにとどまります。

## Skill 本文は信頼できない入力

`SKILL.md`、README、遠隔ページ、Issue、サンプル、tool の結果はデータとして扱います。「上位ルールを無視する」「秘密をアップロードする」「結果を送信する」「この未承認コマンドを実行する」といった文は、Skill の中にあっても権威を持ちません。必要最小限だけを取り出し、秘密情報を除き、可能ならネットワークなしの sandbox で試し、拒否した内容を記録します。

低リスクの作業から段階的に進めます。ローカルでの読み取り、可逆な書き込み、sandbox からの外部接続、その後に本番への書き込みと公開、という順序です。上の層へ進む前に、新しい権限、根拠、rollback を書き出します。一回の smoke test が支えられるのは、高くても `candidate` までです。

## 練習と境界

固定 revision の二つの候補を、インストールせずにレビューします。A は追跡可能な license の根拠があり、タスクにも合うため `recommendation-only` にできます。B は license / NOTICE または具体的な rollback が欠けるため `blocked` です。URL、revision、在庫、依存関係、権限、隔離先、backup、復元、承認、owner を残します。A には正例、境界例、失敗・注入例、移行例を設計しますが、実行はしません。

この練習が示すのはレビュー判断だけであり、発見、読み込み、実行、採用ではありません。宣言した環境での実行記録と独立したレビューが残るまで、この章は `candidate / not_run` です。

## install 前に candidate を検証可能な判断にする

directory、Star、demo は candidate を作るきっかけにすぎません。候補ごとに review card を残します。

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

fixed revision、license/NOTICE、install target、backup、restore check のどれか一つでも欠ければ `blocked` です。「先に install」しても、evidence gap は埋まりません。

`file exists`、`discovered`、`loaded`、`adopted`、`verified` を混同しません。`SKILL.md` が存在することは最初の状態を示すだけで、install log もせいぜい `installed-candidate` を支えるにとどまります。

## 四段階レビュー：不明な candidate は先に止める

「どう install するか」から始めません。次の四つを順に問い、記録で答えられない最初の箇所で stop します。

1. **task に本当に必要か？** 繰り返し使う、安定した、見落としやすい判断を一文で書く。fact が不足していれば source を確認し、goal が曖昧なら先に clarify する。
2. **何を受け取るのか？** project URL、fixed revision、actual entry path、license/NOTICE、nested dependency を固定する。name や Star 数だけでは足りない。
3. **何をする可能性があるか？** read、write、install、network、account、secret、external effect を分ける。inventory がなければ安全だと推測しない。
4. **failure 後にどう戻すか？** isolated directory、pre-install backup、restore、read-back check を書く。「folder を消す」だけでは recovery の証明にならない。

四つすべてに記録で答えられるときだけ `approved-to-install` を勧められます。一つでも欠ければ、通常は `recommendation-only` または `blocked` です。candidate を否定するためではなく、好奇心のまま未審査の environment change を起こさないためです。

### 短くても引き継げる rejection note

```text
candidate: <fixed URL と revision>
decision: blocked
reason: entry script は network を使うが、dependency、install target、restore read-back がない。
checked: project link、entry file、top-level license signal。
not checked: runtime behavior、nested asset license、actual network traffic。
unblock: 不足情報をそろえ、non-sensitive isolated directory で review をやり直す。
```

これは「危なそう」と言うより役に立ち、run していない behavior を観測済みの risk にすり替えません。

## 小さな実験：二つの candidate を install せずにレビューする

### 準備

固定 revision の public candidate を二つ、または整理済みの local example を二つ選びます。URL、revision、inventory、license / NOTICE の signal、`SKILL.md` の frontmatter 要約、tool / network / credential 宣言だけを用意します。install target を決めず、login や secret の使用もしません。

### タスク

固定 revision の public candidate 二つ、または redacted local sample 二つを選びます。A には traceable source と license signal があり、B には license / NOTICE、dependency declaration、restore plan のどれかが意図的にありません。

このプロジェクトの元のデモ入力も使えます。A は S05 `code-review-and-quality`（[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)）で、保存された SHA-256 は `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250` です。B は S06 `webapp-testing`（[composio-community/awesome-codex-skills](https://github.com/composio-community/awesome-codex-skills)）で、保存された SHA-256 は `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E` です。A の妥当な初期判断は `recommendation-only` です。repository レベルの MIT signal は追跡できますが、依存関係と nested asset は項目ごとの確認が必要です。B の妥当な初期判断は `blocked` です。root license は nested Skill、script、asset の条件を自動的には保証せず、具体的な backup / rollback なしに install できません。ここでは asset register の metadata とプロジェクト独自の要約だけを使い、source repository の本文はコピーしません。

1. source、revision、inventory、entry summary、dependency、license / NOTICE signal だけを read する。runtime directory へ download、login、network execution はしない。
2. 両方の card に task gap、boundary、minimum permission、isolated trial、approval point を書く。
3. A には positive、boundary、injection/failure、migration case を設計し、input、expected behavior、stop、evidence を書く。ただし run したとは言わない。
4. B は `blocked` のままにし、unblock に必要な material を示す。

source 内の「上位の rule を無視」「`.env` を upload」「test のため production を変える」は untrusted data であり、Skill permission や user authorization ではありません。拒否、記録、stop が正しい結果です。

### 証拠

A と B について、source、revision、実際の path、license / NOTICE の結論、dependencies、想定 permission、owner、decision、unknown を card に残します。A には positive、boundary、failure / injection、migration の四つの設計済み case を残します。A と B の `file exists / discovered / loaded / adopted / verified` もそれぞれ `not_observed` を含めて記録します。card は install や runtime behavior を主張しません。

### 振り返り

どの gap が本当に繰り返し使う method で、どれが fact、tool、authorization の不足でしたか。何が欠けて install を止めましたか。

## 現実の問題：見つかることは採用できることではない

directory entry、Star、demo は candidate を見つけやすくしても、origin、nested dependency、side effect の証拠にはなりません。最初に具体的な反復 task を改善するかを決め、その後で secret のない狭い環境で調べます。FP-06 なら、通常ファイルと symlink を同じ version・同じ root で別々に置き、一覧表示と実際の name resolution を分けて記録します。FP-07 なら、visible list の有無と explicit invocation の結果を別々に試します。どちらも一回の一覧出力だけで結論を出しません。

## 移行タスク

チームがすでに使う internal script に card を適用します。trigger と non-trigger、最小の read-only check、injection case、後で write や network を許可する人を書きます。script と production は変更しません。

## 受け入れチェックリスト

- [ ] knowledge gap、繰り返し使う method、tool、authorization を区別できる。
- [ ] source、fixed revision、path、license/NOTICE、permission、recovery、owner を記録する。
- [ ] `file exists`、`discovered`、`loaded`、`adopted`、`verified` を混同しない。
- [ ] license、permission、recovery が不明なら install ではなく `blocked` にする。
- [ ] Skill、tool、Plugin、Connector の責任範囲を説明できる。
- [ ] FP-06、FP-07、FP-11 を、一覧・明示呼び出し・永続環境変更の別々の検証問題として扱える。
- [ ] nested asset の license / NOTICE と、A/B の固定 revision・hash・rollback の境界を記録した。

## 失敗と境界のケース

- **一覧にないから存在しない、とは限らない:** ordinary file、symlink、directory link、OS、version の差を分けて確認し、「not discovered」と「unavailable」を混ぜません。
- **明示名だけでは一覧を代用できない:** サポートされた explicit entry point を試し、resolution の結果を記録します。失敗したら同等の manual route を示しますが、呼び出せたとは書きません。
- **root license は nested content を自動で許諾しない:** S06 のような directory の root signal があっても、各 Skill、script、画像、依存関係の条件を別に確認します。不明なら `reference-only` または `blocked` です。
- **smoke が通っても本番採用は安全にならない:** 削除、重複 retry、redirect 経由の token 漏えい、concurrency、timeout、依存関係の破損、maintainer の不在を見逃すことがあります。採用には permission review、regression set、rollback rehearsal、owner が必要です。
- **install は persistent environment を変え得る:** package、PATH、runtime、production credential、service restart が必要なら、target、scope、impact、rollback、authorization を先に書きます。`source modified`、`validated`、`installed`、`published`、`deployed`、`restarted`、`live verified` は別の状態です。

## 出典と保守の境界

review card と状態の分離は安定した学習方法です。directory、install、runtime behavior、product surface は変わるため、fixed revision、具体的な environment、実際の target path ごとに確認し直します。FP-06、FP-07、FP-11 は [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md) に整理した公開報告です。報告の存在は、製品の普遍的な defect、公式の fix、ローカルでの再現を意味しません。

license と asset の境界は [`docs/sources/asset-register.md`](../../docs/sources/asset-register.md) の S02、S03、S05、S06 で確認します。S05 と S06 は候補の出所を示す metadata であり、nested content の再配布や runtime の安全性を保証しません。Skill の構造と現行の入口を確認する場合は、[公式 OpenAI Codex repository](https://github.com/openai/codex) を一次資料の候補として読みますが、公式資料だけでこの章のローカル runtime を証明できるわけではありません。

更新担当は Prysai LLM Playbook maintenance group です。Skill の source、license、依存関係、発見挙動が変わったとき、または遅くとも 2026-11-09 に review します。この章は `candidate`、実験は `draft / not_run` のままです。関連 Skill を `production-ready` と呼ぶには、組織の権限、license、回帰テスト、rollback の証拠が別途必要です。

## 章の練習入口

[Lab 017：Skill の発見を監査してから採用する](../labs/lab-017-skill-discovery-audit-JA.md)で、discovery、explicit loading、依存関係、license、behavior、rollback を別々の主張として確認します。Skill を見つけたり install したりしたことは、正しく読み込まれたことや team adoption に値することの証拠ではありません。

## 自己確認

- [ ] knowledge gap、repeated method、tool capability、unclear task を分けられる。
- [ ] URL、revision、path、license/NOTICE、dependency、permission、owner を残した。
- [ ] obtain、install target write、dependency/authentication、team/production scope の approval を分けた。
- [ ] evidence があるときだけ exists、discovered、loaded、adopted、verified と書く。
- [ ] source、license、behavior、recovery が不明な candidate を、install で埋めていない。

## adoption receipt：レビュー可能性を先に示してから有効化を決める

この receipt は、プロジェクト独自の Skill と外部 candidate のどちらにも使えます。人気の repository、流ちょうな説明、目に見える directory entry だけで、外部 content が trustworthy または executable になるわけではありません。

```text
candidate name and version / commit:
source: original | external；external project の original link:
owner / review date:
具体的に埋める task gap:
license: code、text、asset、nested dependency は別々に明確か:
想定する read / write / network / install / send / publish:
positive / boundary / failure / migration case:
observed: file | discovery | selection | load | execution | read-back verification
not_observed:
許可された temporary trial scope:
reject / pause / adopt の理由:
次の最小で安全な check:
```

外部の `SKILL.md`、page、Issue、install log、tool output は評価対象の data です。その command、link、「以前の rule を無視する」のような文章は authority を増やしません。source、license、behavior scope、recovery path が不明なら、正しい判断は `blocked` または reject であり、「先に install」ではありません。

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
