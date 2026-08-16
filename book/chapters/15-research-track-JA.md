<!-- content_id: chapter-15-research-track | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第15章：調査トラック、問いから監査可能な知識へ

**状態：** `candidate`。**実験：** `draft / not_run`。この章は調査の規律を教えます。公開事例は教材であり、ローカル再現や公式の原因判断ではありません。

## この章が解決する問題

「これを調べて」は、事実収集、選択肢比較、文献レビュー、問いの設定、レポート作成、既存下書きの監査のどれを指すか不明です。最初に絞らなければ、Agent は検索断片を結論にしたり、読めない URL を読んだ扱いにしたり、外部資料内の指示に従ったりします。

> 必要なのは長い文献レビューではありません。重要な主張を、問い、情報源、位置、証拠レベル、人のレビューまで追跡できる連鎖です。

## 学習目標

範囲の狭い research question を作り、読めた source と limit を記録し、location が支える scope だけで conclusion を渡せます。

## テーマを答えられる問いにする

対象、比較または関係、範囲、時期、読者、出力目的を決めます。「ログイン問題を調べる」だけでは不十分です。良い問いは、採用・除外、優先ソース、打ち切り、事実表・比較表・意思決定メモ・引用付き下書きのいずれかも定義します。

原因より先に症状を検索します。症状、境界、環境ごとの query 群を作り、疑っている原因を唯一の query にしません。語句、日付とタイムゾーン、ソース範囲、元リンク、除外、停止条件を残します。snippet、集約サイト、自動生成の関連項目は手掛かりであって証拠ではありません。

重要主張の証拠経路ができ、逆向き query を少なくとも一つ実施し、異なる二回の探索で新しい環境・反例が増えず、cutoff に達し、範囲から一般化できず、または秘密・権限拡大・未知 script を求める資料に出会ったら停止します。

## 調査の成果物を鎖にする

```text
意図 → 問い → ソース計画 → 取得と読解
→ 抽出 → 衝突と欠落 → 統合 → 引用 → 人のレビュー → 版付き納品
```

| 段階 | 成果物 | 出口条件 |
|---|---|---|
| 絞り込み | 問い、範囲、停止条件 | 過剰な結論か判断できる |
| 計画 | 優先度、query、日付、アクセス | 重要主張に証拠経路がある |
| 抽出 | 証拠表と位置情報 | 各主張が出典に戻る |
| 統合 | 衝突、未知、証拠強度 | 一報告を普遍結論にしない |
| 納品 | 下書き、引用、レビュー、版 | 他者が再確認できる |

証拠表の一行には、原子的主張、元 URL と最終 URL、著者・組織、公開・アクセス・cutoff 日、版、platform、範囲、位置、ソース種別、支持関係、観測と仮説、衝突、引用監査、文体、reviewer、次の行動を入れます。

## 読めない資料、衝突、フォーラム

検索結果、`200`、redirect は読解の証拠ではありません。元 URL、status、最終 URL、ページ同定、日付、読解結果を残します。login wall、rate limit、timeout、error はアクセス不能です。記憶、タイトル、snippet で穴を埋めません。

公式資料が食い違う場合は、対象、時期、版、work surface、account、地域、定義を比較します。なお衝突するなら両方を残し、文を狭め、`candidate` とします。フォーラムでは「投稿者が観測」「回答者が提案」「誰かが推測」「maintainer が確認」を分けます。高評価、close、accepted answer は確認や再現の代わりになりません。

AI が整えた引用も証拠ではありません。ソースを開き、該当箇所、題、日付、版、範囲を確かめます。一部しか支えない文章は分け、重要引用を見つけられなければ `citation_unverified` として主張を弱めるか削除します。

## 練習と境界

広い話題から始め、公式資料、URL と日付のあるフィールド報告、アクセス不能または衝突する項目を用意します。最初に三つの候補質問だけを作り、一つを選んで範囲、cutoff、タイムゾーン、停止条件を定めます。症状・境界・環境 query、ソース計画、証拠表、access log、conflict log、citation audit を設計します。ログ、cookie、token、連絡先をアップロードしません。

重要証拠がなければ、既知、未知、衝突、範囲、停止理由、低リスクの次手を含む `candidate` を納品します。重要資料が開かれ、位置が確認され、独立レビューされるまで、この練習は完全な調査の証拠ではありません。

## 広い topic を監査可能な delivery に変える

「どの LLM が team に最適か」は、そのまま答えられません。task、account 条件、budget、time、acceptance がありません。次のように書き換えます。

```text
question: <date と time zone> 時点で、<名前を付けた三つの task> に対し、
<candidate product> の declared capability、limit、account/region unknown を
説明する public primary source は何か。
not answering: 「最適」の順位、未公開 price、未試行の実行性能。
delivery: claim → source → scope → unknown table。総合 ranking はしない。
stop: key page にアクセスできない、scope が不明、account/private data/payment が必要。
```

task/symptom、boundary、environment の query を用意します。勝たせたい product と `best` だけを検索しません。query、date、time zone、source scope、include/exclude を残します。snippet と model の link は lead です。

| field | 安全な書き方 |
|---|---|
| atomic claim | 「page X は access date に Y を説明した」 |
| evidence | original/final URL、title、location、access date |
| scope | surface、version、region、account。なければ unknown |
| level | official / maintainer / user report / lead |
| not implied | 自分の account で使えること、task success、best choice |

## 小実験：conflict と inaccessible source を扱う

### 準備

読める official page、日付のある user report、意図的に読めないか conflict する link を用意します。cookie、token、private log、contact は使いません。

### タスク

access できる official page、一つの dated user report、redirect/login/error になる link を用意します。log、cookie、token、contact、private file は upload しません。

1. candidate question を三つ書き、一つを選び scope、cutoff、time zone、include/exclude、stop を決める。
2. original/final URL、access result、organization、date、location を記録する。開けなければ `inaccessible` とし snippet で補完しない。
3. key claim ごとに reverse query を一つ行い、limit、別 environment、counterexample を探す。見つからないことは証明ではない。
4. page が conflict するときは version、surface、account、region、definition を比べる。解決しなければ両方を残し delivery を狭める。
5. known、unknown、conflict、not claimed、stop reason、next safe action を持つ一ページの `candidate` を渡す。

### 証拠

問い、time zone を含む cutoff、query、original/final URL、access result、読んだ location、atomic claim table を残します。location を読んでいない title や snippet は citation ではなく lead のままです。

### 振り返り

source、date、scope を分けたとき、どの claim を弱めましたか。private data や新しい permission を必要としない最小の次の check は何ですか。

## 現実の問題：確認できる source がない流暢な答え

model、学習法、tool を選ぶとき、summary は link、version、report を混ぜることがあります。大事なのは説得力ではなく、宣言した task、date、environment に対してどの claim が支えられるかです。

## 移行タスク

「来週の Spanish practice を支える resource は何か」に card を使います。task、期間、許可された source と、七日での習得や保証された fluency を主張しないことを書きます。

## 受け入れチェックリスト

- [ ] 問いに task、scope、date、stop condition がある。
- [ ] key claim に source、location、access、limit がある。
- [ ] report、hypothesis、official statement、unknown を分ける。
- [ ] conflict や inaccessible source では確信を作らず `candidate` を渡す。

## 出典と保守の境界

問い、evidence chain、conflict log は安定した方法です。page、product fact、forum、search result は変わるため、access date、scope、next check を記録します。

## 自己確認

- [ ] 「どれが最適か」を task、scope、date、source、delivery を持つ問いに変えられる。
- [ ] URL、access、location を残し、snippet を読解証拠にしない。
- [ ] limit や counterexample を探し、それが証明しないことも書く。
- [ ] official conflict、account、region、user report を universal rule に圧縮しない。

## 実際にできる低リスク research card

「どの model が最適か」から始めません。review も reject もできる問いに変えます。

```text
question: [date と time zone] 時点で、public primary source は [二つの model] について、
[non-sensitive text を明確な task に直す等の一 task] の declared capability、limit、unknown を
どう説明しているか。
not answering: general ranking、未実行の success、私の account access、非公開 price。
priority sources: official page、release note、public documentation。
delivery: claim → URL → location → access date → scope → unknown。
stop: key page が開けない、login/payment/private data が必要、説明できない conflict。
```

モデルには source 候補と query を出してもらえますが、link は lead として扱います。開いたら
title、original/final URL、読める location、access result、宣言された scope を残します。
モデルが「officially supports」と言っても本文を見つけられないなら `citation_unverified` に
下げます。もっともらしい bibliography で穴を埋めません。

## claim ごとに一つの逆向き check

重要な conclusion ごとに、それを狭め得る問いを一つ追加します。「page が X を説明した」の後に、
limit、account/region difference、version prerequisite、public counterexample を探します。見つから
ないことは universal rule の証明ではなく、宣言した scope で見つからなかったという記録です。

| claim | direct source | reverse check | 支えられること | unknown のままのこと |
|---|---|---|---|---|
| page はその日に X を説明した | URL と location | limit/region/version query | 当時の public wording | 自分の account、実 task success、best choice |

known、unknown、conflict、not claimed、stop reason、低リスクの next action を一枚の `candidate` に
します。これは benchmark、user study、purchase advice ではありません。chapter と experiment は
`candidate` と `not_run` のままです。

## 十分の research receipt：結論より先に記録する

始めたばかりで完全な report を装う必要はありません。一つの狭い question を選び、十分で
この receipt を埋めます。目的は「best model」や「唯一の cause」を即断することではなく、
次の review 可能な action を残すことです。

```text
question: <一 task、一 date、一 scope>
does not answer: <ranking、effectiveness、account access、その他 evidence のないこと>
source candidate: <original URL。search snippet は本文ではない>
actual access: <success / redirect / login / timeout / not read>
locatable content: <title、date、paragraph、Issue。なければ none>
this source supports: <一つの atomic fact>
this source does not support: <cause、generality、自分の account、real task result>
reverse check: <結論を狭める query または source>
current status: official / user_report / lead / inaccessible / citation_unverified
next safe action: <一 source を読む、scope を比べる、または stop>
```

「page X は access date に Y を説明した」と「自分の team が今 Y を使える」は別の claim です。
前者には public page があっても、後者には account、organization、region、actual surface の
evidence が必要です。一つの link で二つを証明しません。

### 文を downgrade する場面

| 最初の文 | 足りないもの | より正直な文 |
|---|---|---|
| 「model A は research に最適だ」 | task、sample、comparison、score | 「public page は A の capability を説明する。この task への適合は未評価。」 |
| 「X がこの problem の cause だ」 | reproduction または maintainer confirmation | 「ある user が symptom を報告し、X を possible cause とした。」 |
| 「officially supported だ」 | locate できる official text と scope | 「access date に official page が宣言 scope 内で機能を説明した。」 |

downgrade は research を弱くするのでなく、source があることを結論の証明と取り違えないためです。

## research decision card：問いから stop receipt へ

「これを調べて」と言われたら、具体的な decision を変えうる問いから始めます。この card は自分で開いて確認できる public または authorized material 用です。page の真実、web 全体の検索、health、law、employment、money のような高影響な decision は証明・代行しません。

### decision と問いを固定する
```text
decision: [date] までに [person/group] のために何を決めるか。
question: どの答えられる問いがこの decision を変えるか。
scope: 含めるもの、除くもの、date / time / place の境界。
stop: どの source、authority、definition が欠けたら pause するか。
```
### claim ごとに source owner を置く

| claim | 想定する source owner | direct support | conflict / unknown | 次に許可された check |
|---|---|---|---|---|
| [確認可能な一文] | official page / primary research / law or policy / first-party data / named institution | quote または passage | 支持されない点・別 version | 小さな check 一つ |

forum の experience は symptom や質問を見つける助けになりますが、root cause や全利用者の経験を自動的に証明しません。AI が出した link、title、date、citation も original material に戻って確認します。

### 結論の前に逆向き check をする

予定している一文ごとに、material が直接述べたのか、自分が inference したのかを分けます。より新しい version、exception、conflicting source はないか、access date は decision の時間範囲にあるか、別の reader が ledger から同じ support を見つけられるかを確認します。一つでも答えられなければ文を狭めるか `unknown` にし、自信のある言い方で穴を埋めません。

### 十分の stop receipt
```text
decision と question:
開いて確認した material:
direct support:
interpretation / inference:
conflict と unknown:
access date と scope:
次の最小 check:
stop reason:
status: research_plan | scope_checked_for_supplied_list | blocked | not_run
```

receipt は記録した scope 内の出来事だけを示します。「調査完了」、最新事実、model の正しい retrieval、行動の許可を意味しません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="14-discover-and-audit-skills-JA.md" aria-label="前の章: 第 14 章 · 外部 Skill を見つけ、導入前に監査する">← 前へ<br><strong>第 14 章 · 外部 Skill を見つけ、導入前に監査する</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="16-engineering-track-JA.md" aria-label="次の章: 第 16 章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ">次へ →<br><strong>第 16 章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
