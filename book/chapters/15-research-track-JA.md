<!-- content_id: chapter-15-research-track | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第15章：調査トラック、問いから監査可能な知識へ

**状態：** `candidate`。**実験：** `draft / not_run`。この章は調査の規律を教えます。公開事例は教材であり、ローカル再現や公式の原因判断ではありません。

## 問題

「これを調べて」は、事実収集、選択肢比較、文献レビュー、問いの設定、レポート作成、既存下書きの監査のどれを指すか不明です。最初に絞らなければ、Agent は検索断片を結論にしたり、読めない URL を読んだ扱いにしたり、外部資料内の指示に従ったりします。

> 必要なのは長い文献レビューではありません。重要な主張を、問い、情報源、位置、証拠レベル、人のレビューまで追跡できる連鎖です。

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

access できる official page、一つの dated user report、redirect/login/error になる link を用意します。log、cookie、token、contact、private file は upload しません。

1. candidate question を三つ書き、一つを選び scope、cutoff、time zone、include/exclude、stop を決める。
2. original/final URL、access result、organization、date、location を記録する。開けなければ `inaccessible` とし snippet で補完しない。
3. key claim ごとに reverse query を一つ行い、limit、別 environment、counterexample を探す。見つからないことは証明ではない。
4. page が conflict するときは version、surface、account、region、definition を比べる。解決しなければ両方を残し delivery を狭める。
5. known、unknown、conflict、not claimed、stop reason、next safe action を持つ一ページの `candidate` を渡す。

## 自己確認

- [ ] 「どれが最適か」を task、scope、date、source、delivery を持つ問いに変えられる。
- [ ] URL、access、location を残し、snippet を読解証拠にしない。
- [ ] limit や counterexample を探し、それが証明しないことも書く。
- [ ] official conflict、account、region、user report を universal rule に圧縮しない。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="14-discover-and-audit-skills-JA.md">← 前の章<br><strong>第14章 · 外部 Skill を見つけ、導入前に監査する</strong></a></td><td align="right"><a data-chapter-nav="next" href="16-engineering-track-JA.md">次へ →<br><strong>第16章 · エンジニアリング・トラック、着想から信頼できるソフトウェアへ</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
