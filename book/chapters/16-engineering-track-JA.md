<!-- content_id: chapter-16-engineering-track | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第16章：エンジニアリング・トラック――着想から信頼できるソフトウェアへ

**状態：** `candidate`。**実験：** `draft / not_run`。この章では、開発作業を進める一連の流れを扱います。以下の現場報告はローカルで再現したものでも、すべてのバージョンで根本原因を確認したものでもありません。

## この章が解決する問題

開発では、要件、設計上の選択、テスト設計、実行時の観測、ロールバック（元に戻す手順）が明確になる前にコードを書き始めがちです。パッチはビルドと単体テストを通っても、利用者の操作経路、エラー処理、依存関係のバージョン、デプロイ、安全な復旧まで正しいとは限りません。

> ビルドが通ったこと、単体テストと統合テストが通ったこと、実行時に正しく動くこと、利用者に受け入れられること、本番に出せることは、それぞれ別の主張です。

エンジニアリング Skill は、証拠を残しながら進めるための流れです。各段階に、入口条件、最小の実装単位（slice）、失敗経路、出口で残す証拠を置きます。

## 学習目標

この章を読み終えると、次のことができるようになります。

- エンジニアリング task の範囲、入口条件、出口条件、risk、停止条件を明示する。
- 公式資料の確認、段階的な実装、test、debug、runtime check、review、release、rollback を一つの流れにつなぐ。
- build 成功、unit / integration test 通過、runtime の正しさ、利用者の受け入れ、production readiness を別々の主張として扱う。
- 長時間コマンド、途中状態、未承認の環境置換、secret の露出、戻せない変更を見つけ、復旧の根拠を残す。

## 現実の報告：コードを変えたことは作業完了ではない

- **FP-09:** model capacity の error で task が中断された一方、queue に残った request が途中までの state に結び付いたという報告があります。retry の前に worktree、diff、test、完了地点を読み、未知の state に新しい指示を足しません。
- **FP-10:** Windows の CLI formatter / validation command が、明確な error を出さないまま `Working` に残ったという報告があります。コマンドには output boundary と timeout を置き、「開始した」と「validation が通った」を分けます。
- **FP-11:** source の確認が persistent environment の force reinstall に広がったという報告です。install、publish、deploy、restart、live verification は別の権限と evidence を必要とします。

これらは field research の利用者報告または分析であり、ローカル再現でも、すべての version に当てはまる根本原因の確認でもありません。実際の判断では、現在の repository と runtime の evidence を優先します。

## 開発のライフサイクル

```text
問題定義 → 仕様と受け入れ → 計画と slice
→ 段階的実装 → static check と test
→ 実行時検証 → review と単純化
→ release と rollback → 保守と regression
```

| 段階 | 入口 | 最小の出口証拠 |
|---|---|---|
| 定義 | 問題と範囲 | 他者が言い直せる問題文 |
| 仕様 | 境界、入出力、エラー | 受け入れ条件と対象外 |
| 計画 | 依存とリスク | 独立に検証できる実装単位 |
| 実装 | 現在の実装単位と基準状態 | 小さく説明できる差分 |
| テスト | 挙動と失敗を試せる | コマンド、結果、失敗の説明 |
| 実行時 | 起動可能な環境と代表データ | バージョン、ログ、応答または画面 |
| リリース | レビューとロールバックがある | 記録、監視、ロールバックのリハーサル |

## 実装前に仕様を決める

「エクスポートを追加」なら、形式、データ範囲、権限、途中までのファイルをどう扱うか、上書き方針、最終的な受け入れ条件を確認します。利用者の操作、入力制約、成功時とエラー時の出力、境界、対象外、性能・安全制約、観測できる兆候、確認方法を示します。Skill が黙って判断を置き換えることはできません。

公式資料を起点に疑いながら、段階的に進めます。API やバージョンについては公式文書、型定義、現在のコード、再現結果を使い、ブログやモデルの記憶は手掛かりにとどめます。型と単体テストだけでは証明できないネットワーク、データベース、ブラウザー、権限、並行処理、タイムゾーン、デプロイを確認します。一度に一つの説明できる実装単位だけを変え、差分とロールバック地点を残します。

## 実行時の確認、停止、復旧

ビルドの証拠はコンパイルできること、テストの証拠は指定したアサーションが通ることです。実行時の証拠には、起動コマンド、バージョン、環境値、実際の入力、応答または画面、ログ、エラー経路が必要です。本番準備には、セキュリティ、性能、移行、監視、ロールバック、利用者の受け入れも加わります。

タイムアウトまで出力がない、テスト依存関係が欠けている、ワークツリーの変更が不明、実際の認証情報を求められる、永続的な変更・公開・デプロイ・再起動が必要になる、という状況は、停止して範囲を確認する合図です。緑にするために強制再インストールや権限の拡大はせず、認可がないときは隔離環境、テストダブル、静的チェックを使います。

### source-driven、doubt-driven、incremental で進める

- **source-driven:** framework、API、library、version の挙動は公式文書、型定義、現行コード、再現結果を根拠にします。blog とモデルの記憶は手掛かりです。
- **doubt-driven:** type と unit test だけでは証明できない network、database、browser、permission、concurrency、time zone、deployment の主張を別に確認します。
- **incremental:** 一度に一つの説明できる slice だけを変え、diff と rollback point を残します。原因不明の失敗に修正を積み重ねません。

## 練習と境界

ローカルのリストから重複を除き、JSON に書き出すような低リスク機能を選びます。通常の入力、空の入力、重複、無効な入力を用意します。目的だけを渡すラウンドと、問題、受け入れ条件、対象外、実装単位、テスト表を先に作るラウンドを比較します。両方で静的チェック、単体テスト、ローカル実行、空・無効入力を試し、契約、差分、コマンド、終了状態、ログ、バージョン、入力、ロールバック地点を残します。

中断を模擬したら、続ける前にワークツリー、差分、ログ、テスト状態を確認します。実際の記録と独立したレビューができるまで、状態は `candidate / not_run` のままです。明示的な認可なしにインストール、公開、デプロイ、再起動はしません。

## 要求をエンジニアリング・タスクカードにする

「エクスポートを追加」は、コーディングを始める条件ではありません。不明点はモデルに決めさせず、質問として残します。

```text
利用者の操作: <ページ/コマンド> で <明確なデータ範囲> をエクスポートする。
成功: <形式> と <項目> を作り、利用者に <観測できる結果> が見える。
失敗: 権限不足、空のデータ、無効な入力、書き込み失敗をどう返すか。
対象外: 履歴の移行、公開、権限変更、外部サービスへの接続はしない。
範囲: 読み取り・書き込みパス、許可されたコマンド、ネットワークと秘密情報の境界。
受け入れ: テスト、一回のローカル実行、人による確認が、それぞれ何を対象にするか。
復旧: 元の状態、一時的な成果物、読み戻し、停止条件。
```

他の開発者が目的と対象外を言い直せるようになってから、最初の実装単位を選びます。形式、上書き、権限が不明なら、最小の実装単位を黙った書き込みではなく読み取り専用のプレビューにできます。

| 証拠 | 言えること | 言えないこと |
|---|---|---|
| ビルド成功 | 指定した設定でコンパイル・パッケージ化できる | 利用者の経路やデプロイが正しい |
| テスト通過 | その環境でアサーションが通る | 対象外のエラー、ブラウザー、権限、実入力 |
| ローカル実行 | 指定した入力から観測できる結果が出る | 本番、すべてのアカウント、性能 |
| リモート読み戻し | 指定したリビジョンや記録がリモートにある | 利用者の受け入れ、監視、安全なロールバック |

一つの green signal は、別の green signal の代わりになりません。build は compile、test は指定した assertion、local run は一つの入力経路、remote read-back は指定した revision の存在だけを示します。

## Web コーディング：表示できる結果を実際のブラウザーまで届ける

「完全なサイトを作る」という依頼には、読者、状態、ソースファイル、実行環境、ブラウザーでの確認、
ロールバックが混在しています。まず `examples/skill-sandbox/product-context-real-estate` の README と
`index.html` を使い捨てコピーで読み、`index.html` の表示文を一つだけ変えます。フレームワーク、画像、
フォーム、API、ネットワーク接続は追加しません。Python 3 がすでに使えるなら、コピー先で
`python -m http.server 4182` を実行し、`http://127.0.0.1:4182/` を開いて、タイトル、変更した文、
保持した見出し、リンク、コンソール、幅 390px の表示を確認します。

コピー先、許可したファイル、URL、見えた状態、差分と、デプロイ、アクセシビリティ、他の
ブラウザー、利用者の受け入れについて未確認の項目を記録します。ソースの差分だけでは CSS、相対
パス、モバイルでの切り詰め、実行時エラーは分かりません。ローカル表示はデプロイではありません。

最初の web 課題は、意図的に小さくします。

1. **結果:** 見出し一つ、短い説明一つ、状態表示一つの静的 page。
2. **context:** 読者、与えられた copy、対象 file、local run command。framework、依存関係、image、backend を発明しない。
3. **change:** 許可した HTML または CSS の一つの edit。編集前に読む。
4. **browser check:** 実際の `http://127.0.0.1:<port>/` を開き、title、heading、status、link、console error、必要なら狭い viewport を確認する。
5. **receipt:** 正確な diff、URL、viewport、command result、screenshot または観察を残す。deploy、accessibility、cross-browser、user acceptance は未確認ならそう書く。

使える最初の依頼は次のように具体化できます。

```text
目的: static page の見える文を一つだけ変える。
先に読む: index.html と styles.css。現在の見出しと、project に書かれた local command を報告する。
許可する変更: index.html だけ。既存の構造と style は保つ。
しないこと: package install、framework の追加、image の取得、network、secret、server command の変更、commit、push、publish。
受け入れ: 新しい文が browser に一度だけ現れ、古い文が消え、title と heading が残り、diff に他の file がない。
停止: 対象 path、command、browser result のどれかが不明なら止まる。
```

browser は source diff だけでは見えない CSS loading、relative path、mobile clipping、runtime error を示します。ただし local page がこの check を通っても、deployed site だとは言えません。

### 見た目のフィードバックは仕様の代わりにならない

画面の領域を指せる tool や screenshot は、追加の context として使います。対象、変更、維持するもの、判定方法を明記します。

```text
対象: 指している正確な region、state、viewport。
変更: 観測できる差を一つ。
維持: 変えてはいけない content、behavior、layout、path。
確認: rendered page と diff で何を見るか。
```

「header をよくして」ではなく、「390px view で search control を title の下へ移し、title、link、focus order は保ち、rendered width と keyboard path と one-file diff を確認する」と書きます。これは screenshot、browser inspector、design file、plain text のいずれにも使える契約です。

### preview は runtime についての仮説

埋め込み preview と読者の環境では storage、cookie、origin、network、permission、viewport、font、asset path が違うかもしれません。control が壊れて見えたら、まず「source / client logic の defect か」「preview が target と同じ条件か」を分けます。scope 内の console と network を読み、独立した local browser で最小 interaction を再現し、origin と viewport を比べ、一条件または一 file だけ変えます。「preview で動いた」と「target runtime で動いた」は別の主張です。

### AI programming を段階的に練習する

固定日数で developer になれると約束せず、現在の task が見える evidence を残せるときだけ次へ進みます。

| Level | Practice | 次へ進む前の最小 evidence |
|---|---|---|
| 1. Read | 既存の function または page 一つを説明させる | input、output、boundary 一つを自分の言葉で言える |
| 2. Change | 破棄できる project で見える edit 一つ | 許可した file だけの diff と browser / checker の変化 |
| 3. Test | focused check 一つと failure case 一つ | check が証明することと unknown を説明できる |
| 4. Slice | contract から runtime まで一つの vertical feature | normal case と invalid / empty case を記録 |
| 5. Recover | 中断または失敗後に再開する | checkpoint を読み、失敗 evidence を保った |
| 6. Collaborate | project rule、isolated work、review、handoff | 別の人が receipt から判断を再現できる |

モデルには、編集前の inspection、scope、assumption、停止条件を求めます。説明が流暢でも、独立して diagnosis、implementation、maintenance ができる証明にはなりません。最初の一周では、task contract、自分の最初の試み、使った支援、変更 file、check output、一つの failure / boundary、次に練習する Skill を残します。

## 観察可能な実験：直接実装とライフサイクルを比べる

### 準備

使い捨てディレクトリで `input.json` の文字列リストを読み、重複を除いて `output.json` に書く低リスク機能を選びます。通常の入力、空の入力、重複、項目欠落または無効な JSON を用意し、runtime の version、output directory、短い timeout を固定します。実際の secret、外部 write、login は使いません。

### タスク

1. **直接実装ラウンド:** 目的だけを Agent に渡します。仕様を質問したか、どの file を変えたか、どの command を実行したか、無効な入力を扱ったかを記録します。
2. **ライフサイクル・ラウンド:** 先に問題文、受け入れ条件、対象外、slice 計画、test matrix を作らせます。段階的に実装し、各段階で diff を読みます。
3. 両ラウンドで static check、unit test、実際の local run、空入力、無効入力を行い、問題がどの段階で見つかったかを記録します。
4. 中断または capacity error を模擬します。まず止まり、worktree、直近の diff、log、test state を読み、続行、rollback、checkpoint のいずれかを決めます。
5. force reinstall、production write、deploy、restart は行いません。Agent が提案したら、権限外として記録します。

### 証拠

二つの task contract、diff、test matrix、command と exit status、runtime の input / output、error log、問題が見つかった段階、rollback point、最終 acceptance を保存します。「build が成功」「test が通った」「runtime が正しい」「user / release acceptance が済んだ」を少なくとも別々の状態で記録します。どの version、どの environment、どの input がどの result を出したかが分かるようにします。

### 失敗変形

formatter を no-output のまま長時間実行するか、存在しない service に依存する test を置きます。正しい対応は、停止して process と worktree を確認し、validation を未完了と記録することです。待った後に成功と書いたり、環境を再インストールしたりしません。別の変形では、前の slice が途中で止まったまま無関係な依頼を追加します。未知の state に直接追記せず、checkpoint を作ります。

### 振り返り

- 完全なライフサイクルが、直接実装より多く保存した evidence は何ですか。どの問題を早く見つけましたか。
- unit test で置き換えられなかった runtime evidence は何ですか。
- いつ rollback し、いつ diagnosis を続けますか。
- validation に persistent install が必要なら、どの authorization、impact、rollback record が新たに必要ですか。

出力がない、依存関係がない、PATH の変更、実行環境の再インストール、ログのアップロード、デプロイ、再起動が提案されたら停止し、不足している認可と復旧方法を示します。

## エンジニアリング・タスクカード：受け入れ可能な最小の変更

このカードは、自分が所有する、または許可を得た使い捨てのプロジェクトコピー向けです。先に問題を限定し、その後で任意の LLM に読み取り、計画、編集を手伝わせます。インストール、ネットワーク接続、コミット、プッシュ、公開、本番データへのアクセスは許可しません。

```text
目的: [一つの具体的な操作] の後、利用者が見る確認できる結果は何か。
範囲: [パス] を読む。確認後は [パス] だけを編集し、[パス] は編集しない。
基準状態: 現在のブランチ / コミット、既存の変更、テスト / コマンドの元の結果。
信頼できる根拠: どの仕様、既存の挙動、テスト、インターフェース、設計がこの事実を持つか。
最小の実装単位: 今回変える観測可能な挙動は一つだけ何か。
受け入れ: ファイルの範囲、焦点を絞った確認、実行時の観測、人による読み取りが、それぞれ何を確認するか。
禁止: インストール、ネットワーク接続、削除、コミット、プッシュ、公開、外部メッセージ、秘密情報の読み取り。
停止: パス、仕様、権限、復旧方法、受け入れ規則が不明なら保留する。
納品: 差分、実際のコマンドと出力、passed / failed / not_run、不明点、最小の次の確認。
```

### 四つの green は四つの別の結論

| シグナル | 最大で言えること | まだ言えないこと |
|---|---|---|
| 小さな差分 | 比較した範囲のテキスト変更が小さい | 要件を満たした、実行時に正しい |
| 静的チェック通過 | 記録した環境でそのチェックが通った | すべてのパス、すべての利用者で動く |
| ローカル実行通過 | 明示した一つの実行シナリオを観測した | デプロイ、性能、セキュリティ、外部統合 |
| 人による受け入れ | 指定した読者が指定した規則で結果を見た | 保守、移行、広い採用 |

一つでも欠ければ、納品に `not_run`、`blocked`、`unknown` を残します。緑にするために権限を広げたり、環境を置き換えたり、仕様を書き換えたりしません。

## 失敗と境界のケース

- **green test だけを見る:** real service、build artifact、permission、browser、mobile path が動いていないかもしれません。integration、end-to-end、または人による runtime evidence を足します。
- **build は成功したのに runtime が失敗する:** startup entry point、environment variable、dependency version、static asset、route、migration、log を確認します。compile を runtime verification と呼びません。
- **command が hang する:** FP-10 に沿って timeout、output boundary、interrupt path を置きます。中断後は worktree、残った process、validation status を読み直します。
- **model capacity / session が中断する:** FP-09 に沿って diff、completion point、log、test state を確認し、clean checkpoint から再開します。queued task が現在の状態を知っていると仮定しません。
- **validation が environment replacement に広がる:** FP-11 に沿って `source modified`、`validated`、`installed`、`published`、`deployed`、`restarted`、`live verified` を分け、別々に認可します。
- **外部 dependency を読めない:** unverified と記録し、test double または sandbox を使います。「command が動いた」は外部 system の evidence ではありません。
- **rollback がない:** 復元可能な artifact、database backup、migration reverse operation、configuration snapshot がなければ、release は `candidate` で止めます。

## 移行タスク

既存の engineering task を一ページの contract（problem、scope、acceptance、non-goals、permissions、risk、slice、test matrix、runtime verification、rollback）へ書き換えます。normal、empty、invalid、timeout、insufficient-permission の check を設計し、最初の slice だけを実装して証拠を残します。最後に、同僚に `draft`、`candidate`、`verified`、`production-ready` のどれかを blind review してもらい、過剰な主張を直します。

## 受け入れチェックリスト

- [ ] 利用者の操作、成功、失敗、対象外、範囲、入口・出口条件、復旧を書いた。
- [ ] 実装を、実行可能で戻しやすい slice に分けた。
- [ ] build、test、runtime、user acceptance、production readiness を別々に説明できる。
- [ ] framework / API の重要な主張を公式資料または現行コードで確認した。
- [ ] normal、boundary、failure、permission、timeout の経路を確認した。
- [ ] diff、command、exit status、log、runtime environment、final output を残した。
- [ ] FP-09、FP-10、FP-11 に関する recovery と permission boundary を説明できる。
- [ ] authorization なしに install、force-reinstall、publish、deploy、restart をしていない。

## 出典と保守の境界

- 現実の問題：[`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md) の FP-09、FP-10、FP-11。status は `candidate`、アクセス・整理日は 2026-08-09、owner は Prysai LLM Playbook maintenance group です。
- Engineering method と外部 asset：[`docs/sources/asset-register.md`](../../docs/sources/asset-register.md) の S05。ここは外部 Skill の本文をコピーせず、独自の process rewrite として書いています。
- 変動する framework / API / version：該当 project の公式文書と [OpenAI Codex repository](https://github.com/openai/codex)。engineering record に URL、version、アクセス日、verification scope を残します。

ライフサイクルと evidence を分ける方法は比較的安定していますが、command、runtime、dependency、deployment の規則は project ごとに変わります。review owner は Engineering-track maintainer、次回確認は runtime、dependency、release process、permission policy の変更時、または遅くとも 2026-11-09 です。この章は `candidate`、実験は `draft / not_run` のままです。runtime、failure recovery、release rollback の evidence がそろうまで、delivery を `verified` や `production-ready` とは呼びません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-JA.md" aria-label="前の章: 第 15 章 · 調査トラック、問いから監査可能な知識へ">← 前へ<br><strong>第 15 章 · 調査トラック、問いから監査可能な知識へ</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-JA.md" aria-label="次の章: 第 17 章 · マーケティング・トラック、製品理解から成長実験へ">次へ →<br><strong>第 17 章 · マーケティング・トラック、製品理解から成長実験へ</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
