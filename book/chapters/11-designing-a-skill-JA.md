<!-- content_id: chapter-11-designing-a-skill | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第 11 章：役に立つ Skill を設計する

**状態：** `candidate`。**実験：** `not_run`。この章は設計方法を定義します。特定のホストが Skill を発見し、読み込み、実行したことを証明するものではありません。

## この章が解決する問題

一度うまくいったセッションだけを根拠に、プロンプトを Skill にするのは危険です。書かれていない事実に依存したり、不要な権限を求めたり、認証情報が使えることを前提にしたり、流行語だけで起動したりするからです。役に立つ Skill は、繰り返し発生する仕事の種類に対して、範囲を限定した操作と確認可能な証拠を対応づける、バージョン管理された手順パッケージです。

> Skill とは、範囲を限定した仕事の種類を、範囲を限定した操作と確認可能な証拠に結びつける、発見可能で再利用できる手順パッケージです。

Skill はモデル、ツール、権限、コネクター、人による承認の代わりではありません。

## 学習目標

繰り返し行う仕事に本当に Skill が必要かを判断し、起動条件（trigger）と対象外条件（non-trigger）を含む契約を書くことができます。また、手順・データ・実行を分け、成功例、境界例、失敗例、移行例で候補をレビューできます。`SKILL.md` が存在することや、一度実行できたことだけでは、すべてのホスト、モデル、利用者で信頼できるとは言えません。

## 現実の問題：Skill は動き始める前に失敗することがある

### discovery は独立した段階

Skill をディレクトリに置いても、その場所にファイルがあることしか分かりません。ファイルの存在、現在の画面や作業面から見えること、タスクで選ばれること、入口ファイルが読み込まれること、手順が実行されること、成果物が受け入れ条件を満たすことは、別々に記録します。観察していない段階があるなら、引き継ぎを「接続済み」と一括りにせず `unknown` と書きます。

### 「接続済み」と「呼び出せる」は別

コネクター、プラグイン、ワークスペース設定が画面に表示されても、現在のタスクで必要なファイル、ネットワーク、アカウント、公開権限が自動的に与えられるわけではありません。初めて採用するときは、機密情報を含まない成功例で、ホスト、バージョン、パス、入力、実際に選ばれた方法、出力を記録します。観察していない段階は記録（receipt）に残してください。設定画面は、実行時の証拠の代わりにはなりません。

### 起動条件と対象外条件を先に分ける

起動条件は、タスクの意図、入力が揃っていること、この方法が担当すべき仕事であること、許容できるリスクであることがすべて揃ったときだけ成立します。キーワードが一致しただけでは不十分です。近い仕事を別の方法に譲る対象外条件（`non-trigger`）も、利用者の注意と権限を守る製品設計の一部です。どの方法も、文案の全面改稿、外部サイトの確認、大量修正、権限の出所が不明な仕事を黙って引き受けてはいけません。

### 入力・権限・秘密情報の境界

入力は「提供済み」「読み取り可能」「推測」「不明」に分けます。パス、バージョン、出典、基準状態、受け入れ規則、復元先が分からないとき、モデルに補完させてはいけません。読み取り、一時書き込み、永続書き込み、ネットワーク接続、インストール、送信、公開、削除も、それぞれ別の権限です。秘密情報は `SKILL.md`、例、ログ、スクリーンショット、記録に入れず、必要な場合も指定された管理入口だけで扱います。

### リソースを増やす前に考える

`scripts/` は、同じ結果を再現でき、検査可能な反復操作に限ります。`references/` は、特定の分岐でだけ必要な詳細を置く場所です。`assets/` は、用途とライセンスを明記した静的な素材に限ります。すべてのリソースについて、入力、出力、失敗時の動き、副作用を示します。初回実行は一時ディレクトリか機密情報を含まないサンプルで行い、バージョンと生の出力を残します。スクリプトがあることは、安全、正確、実行済みの証明ではありません。

## prose より先に contract を書く

```yaml
skill_id: evidence-boundary-review
version: "0.1.0"
owner: named-person-or-team
review_date: "YYYY-MM-DD"
purpose: "与えられた artifact を指定された evidence boundary で review する。"
trigger:
  - "evidence boundary review が依頼されている。"
  - "artifact、goal、acceptance が与えられている。"
non_trigger:
  - "制限なしの rewrite が依頼されている。"
  - "重要な claim の source がない。"
  - "別の named method が task を所有する。"
required_inputs:
  - target path または貼り付けた artifact
  - goal、non-goal、acceptance
  - material claim の provenance
allowed_actions: "named target を read; disposable output に report を write; reversible local check を run"
forbidden_actions: "secret の読取/出力、publish、send、delete、install、無許可 network"
output: "claim → evidence → uncovered scope report"
stop_when: "input、authority、source、recovery target が欠ける"
```

trigger には task intent、required input、method ownership、acceptable risk が必要です。keyword coincidence だけでは足りません。non-trigger は近接 task を乗っ取らないためのものです。

## method、data、execution を分ける

- `SKILL.md` には常に必要な purpose、boundary、step、stop rule、evidence を置く。
- `references/` には特定 branch でのみ読む material を置く。
- `scripts/` は dependency、network、write scope、exit behavior を宣言した deterministic check だけにする。
- `assets/` は宣言した static resource だけにする。

critical safety rule を optional reference に隠しません。file exists は discovery を、discovery は load を、load は adoption を、adoption は behavior を証明しません。

## 四つの case で評価する

| case | 起きるべきこと | 起きてはいけないこと |
|---|---|---|
| positive | method が trigger し、reviewable artifact を残す | evidence なしの成功宣言 |
| boundary | 正しい method に譲るか、具体的に質問する | 類似 label だけで trigger |
| failure | unsafe write 前に stop し、最初の欠落点を残す | input、permission、result を捏造 |
| transfer | domain fact を変え、assumption を再確認する | noun を機械的に置換 |

一変数だけを変え、artifact に見える signal を残す intentional failure を加えます。rollback は target、baseline、step、read-back check を定義します。「undo」だけでは不十分です。

## 実験と境界

### 準備

少なくとも二回行った、local で non-sensitive な task を選びます。disposable input、明確な acceptance、read-only boundary を決めます。credential、install、network、license が不明な他者の Skill content は使いません。

### タスク

Markdown link review、research brief の source check、release handoff など、二回以上行った低リスク method を選びます。contract、positive case、trigger しない near miss、missing input、visible failure、rollback check を作り、artifact が何を証明し、何が unknown かを表にします。

宣言した environment でこれらの case を記録し、独立 review を受けるまで、その Skill は `candidate` です。discovery、load、execution、business impact を主張しません。

### 証拠

contract、version、non-sensitive input、expected と actual output、stop point、load した resource、host/surface の正確な observation を保存します。観察していない layer は `not_observed` とし、directory だけから execution record を作りません。

## 観察できる設計フロー

ここでは低リスクな「Markdown のローカルリンク確認」を使います。ネットワーク、アカウント、実在の利用者データは不要です。ただし、特定の host がこの Skill を自動で discover する証明にはなりません。

### task を確認可能な範囲に絞る

「ドキュメントの品質を確認する」では境界がありません。method を使う前に、その回の task protocol を書きます。

```text
goal: docs/quickstart.md 内の壊れた相対 Markdown link を見つける。
allowed: 対象を read、temporary report に候補を書く、read-only local check を run。
not allowed: 本文 edit、network、dependency install、delete、publish。
acceptance: link text、target、check result、unknown の理由を一件ずつ示す。
stop: file がない、解決基準が不明、または未許可の action が必要。
```

この protocol は今回の task のものです。Skill は繰り返し使う method だけを持ちます。混ぜると次の task に古い path、permission、結論まで持ち込んでしまいます。

### trigger と譲る条件を設計する

trigger は宣伝文句ではありません。method がこの task を担当してよいか判断できる必要があります。

| 項目 | link review Skill の例 |
|---|---|
| 適用 | named Markdown file の local link を、goal と acceptance 付きで確認してほしい |
| 非適用 | rewrite、remote site check、repository 全体の repair、対象 file 不明 |
| 先に質問 | file、repository root、site output のどれを link base にするか |
| stop | network、credential、protected write、publish change が必要なのに明示許可がない |

「link」と「review」が出ただけでは足りません。intent、input、method ownership、許容 risk を合わせて決めます。

### action と evidence を対にする

| 段階 | 許可する action | 残す evidence | まだ証明しないこと |
|---|---|---|---|
| input check | file と protocol を read | path、baseline、missing input | link が壊れていること |
| scan | relative link を抽出 | candidate table と parse rule | target が存在すること |
| check | path を read-only で解決 | exists / missing / unknown | remote URL が使えること |
| delivery | disposable report を write | report、command、exit status | 問題を修正したこと |
| review | high-risk / unknown を人が読む | decision と uncovered scope | すべての repo で有効なこと |

exit status が 0 でも、その check が自身の定義で終わっただけです。無視した format、build 時の書き換え、remote target まで正しいとは言えません。

## 最小とは、短くして大事な判断を落とすことではない

入口の `SKILL.md` は短くできますが、毎回必要な boundary は残します。

```markdown
---
name: local-link-review
description: Named Markdown file の local link を、goal、acceptance、
read-only scope が与えられたときに review する。rewrite、network、bulk repair には使わない。
---

1. target、link base、allowed scope、acceptance を確認する。
2. 一つでも欠けたら stop して質問する。
3. local relative link だけを抽出し、元の text を保存する。
4. 宣言済み read-only check を run し、version と exit status を記録する。
5. candidate、confirmed、unknown を分けて返す。
6. 新しい approval なしに edit、publish、install、network をしない。
```

方言別の解析は `references/`、決定的な checker は `scripts/` に置けます。しかし「target がなければ stop」「network と write はしない」は optional file に隠してはいけません。

## 意図的な failure で stop を試す

temporary sample を作り、一つだけ変えます。link を存在しない path に向けます。期待するのは曖昧な賢さではなく、見える signal です。

```text
BROKEN: [インストール手順] (guides/install.md)
resolved: docs/guides/install.md
check: path does not exist
scope: local relative path only; remote availability not checked
```

次に `https://` link を含む boundary case を試します。network へ出ず、out of scope / unknown と残すべきです。link base がない場合も、正しい答えは構造を推測することではなく、質問または stop です。

## 小さな実験と境界

1. 安全に read できる Markdown file を選ぶ。secret や private material は model に渡さない。
2. goal、scope、acceptance を protocol に記入する。
3. read-only check を一度 run し、environment、date、input、raw output を残す。
4. temporary broken link を入れて再実行し、repair ではなく failure signal が残るか確かめる。
5. sample を捨てるか行を戻し、original file と report を read back して未許可の change がないか確認する。
6. protocol と report だけを別の reader に渡し、result、scope、unknown を説明できるか聞く。

この観察は記録した environment に限られます。他の host、version、model で同じ discovery、selection、load、execution が起きる証明ではありません。

## よくある誤り

- description を保証にする。「安全な publish を自動保証する」は boundary も acceptance もない。
- script と Skill を混同する。script は決まった check、Skill は使用時、停止時、解釈を決める。
- discovery を reliability と混同する。metadata、selection、load、action、evidence を別々に確認する。
- unknown を隠す。「remote link は未確認」は失敗ではなく report の重要な結果である。

## adoption receipt：file があるだけでは依存できない

Skill を実際の task に渡す前に、adoption receipt を残します。これは「folder に見える」を
「使ってよい」と取り違えないためであり、次の reviewer がどの layer から確認すべきかを
示します。

```text
Skill name と version:
task gap: 「AI を強くする」ではなく、補う具体的な decision
source と license: original / reviewed source、license と review date
この試行の host と surface: 実際に使った product、version、path
observed: file / discovery / selection / load / action / output
not observed: run、read-back、independent review がないすべての layer
allowed scope: read、temporary write、network、install、publish を別々に記す
next safe check: 未観測の layer を一つだけ確認する
stop: input、authority、recovery target、evidence が欠けるとき
```

repository に `SKILL.md` があることは、file の存在だけを支えます。host の discovery や
method の execution は支えません。一度 report が出ても、それは記録した task と environment
だけの observation です。すべての model、folder、user に同じ結果が出る証明ではありません。

## external method は source を review してから採用する

external Skill の instruction、script、example は review 対象の material として扱います。
repository が popular、説明が流暢、名前が似ているという理由だけで course に copy したり、
real data で run したりしません。少なくとも次を確認します。

1. original link、specific revision、owner、review date;
2. top-level license が必要な code、script、asset、nested dependency を覆うか;
3. read、write、install、network、send の何を行う可能性があるか;
4. より小さな original method ではなく、その task gap に本当に必要か; そして
5. non-sensitive temporary fixture で何を check し、何をまだ run していないか。

答えが欠けるなら、link と research record だけを残します。本 project の Skill として copy
せず、adopted capability とも書きません。

## ガイド付き練習：繰り返せる check を Skill にする

少なくとも二回行った小さな task を選びます。たとえば Markdown file の local link review、
report に source と date があるかの確認、diff と test command を含む handoff の準備です。
「もっと良くする」は選びません。ほかの人が同じ decision を繰り返せないからです。

まず Skill なしで一度行い、goal、input file、allowed action、result、evidence、stop point
だけを残します。次の task でも必要な判断に下線を引きます。file name や見栄えのよい
response ではなく、その判断が Skill にする候補です。

```text
いつ使うか: 指定 Markdown file の local link review を頼まれたとき
使わない: rewrite、web link、publish、bulk repair
必要な入力: file、link base、read-only scope、acceptance
返すもの: confirmed、candidate、unknown を分けた report
停止: file/base がない。network、install、write が必要になる
```

`SKILL.md` を書く前に、モデルへこの contract を批判させます。何を勝手に補うか、どの似た
request を別の method に譲るか、reviewer は何で result を確認できるかを尋ねます。
「すべてを自動化する」は受け取りません。役立つ rule には decision、boundary、reviewable
signal が必要です。

## 振り返り

Skill の中で再利用できる decision と、この file または host だけに属するものは何か。Skill が明示的に引き受けてはいけない request は何か。permission や scope を広げずに、次の未観察 layer を確かめる evidence は何か。

## 移行タスク

contract を learning または research の task に移します。learning Skill は practice cycle と後の recall task を組織できますが、fluency や mastery を主張しません。research Skill は source と uncertainty を整理できますが、見つけた link を確認済みの fact にしません。trigger、non-trigger、stop rule、evidence boundary は保ちます。

## 受け入れチェックリスト

- [ ] candidate は「AI を強くする」ではなく、名前のある繰り返す decision を解く。
- [ ] trigger、non-trigger、input、allowed action、stop、reviewable output がある。
- [ ] method、project-specific data、deterministic execution を分けている。
- [ ] positive、boundary、failure、transfer に expected result または正直な `not_run` がある。
- [ ] external material は source、license、side effect を review してからだけ採用する。

## 出典と保守の境界

Skill の decision method は project-authored です。host behavior、discovery、Plugin、MCP、permission、external candidate は変わります。現在の claim は[公式ファクトカード](../evidence-library-JA.md#source-notes)、[Skill candidate record](../evidence-library-JA.md#source-notes)、具体的な license source で確認します。どれも記録した host での run の代わりにはなりません。

## 採用前の四つの case

credential と network を使わない最小セットを用意します。

| case | input | 正しい結果 |
|---|---|---|
| positive | file と base が明確 | local link report と read-back evidence |
| boundary | text を整えるだけの依頼 | trigger せず、link review ではないと説明 |
| failure | file または base がない | 質問または `blocked`。path を推測しない |
| transfer | 構造の異なる別の local report | method は保ち、base と acceptance を再決定 |

Skill version、非機密 input、load した resource、output、最初の stop point を保存します。
directory に file があることは、host での discovery、loading、execution の証明ではありません。
記録ができるまで、この章は `candidate`、experiment は `not_run` のままです。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-JA.md" aria-label="前の章: 第 10 章 · 計画と垂直スライス">← 前へ<br><strong>第 10 章 · 計画と垂直スライス</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="12-agent-loop-and-stop-JA.md" aria-label="次の章: 第 12 章 · Agent のループ、状態、停止条件">次へ →<br><strong>第 12 章 · Agent のループ、状態、停止条件</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
