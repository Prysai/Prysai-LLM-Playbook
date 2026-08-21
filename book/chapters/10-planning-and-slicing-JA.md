<!-- content_id: chapter-10-planning-and-slicing | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# 第 10 章：計画と垂直スライス

**状態：** `candidate`。計画（plan）と例は教材です。Agent が実行したことや、どのリポジトリでもこの分割方法が機能することを証明するものではありません。

## この章が解決する問題

詳しく見える計画でも、最後まで誰も結果を確認できないことがあります。データ、API、UIを順番にすべて終わらせる横割りの計画では、前提の誤りに気づくのが遅れます。垂直スライス（vertical slice）は、小さくても入力から証拠までつながる結果を作ります。

```text
one input → smallest change → observable action → focused check → evidence
```

これは一度に全部を変える口実ではありません。レビューとロールバックができる範囲で、最も高くつくリスクを早く見つける方法です。

![教案例：lifecycle checkpoint が大きな目標を証拠のある出口へ分ける](../../assets/teaching/lifecycle-checkpoints.svg)

> これはプロジェクトが作成した教案例です。計画方法を説明するものであり、Agent、
> Skill、command、外部サービスが実行された証拠ではありません。

## 学習目標

大きなプロジェクトを、小さく観察できるスライスへ分けます。編集前に依存関係と停止点を記録し、失敗した試行も、次の人が範囲や権限を推測せずに続けられる形で引き継ぎます。この練習は、一般的な速さ、モデルの品質、長期的な学習を測るものではありません。

## 現実の問題：詳しい計画でも確認できる結果が出ない

計画に多くのファイル、段階、ツールを並べても、誰かが確認できる最初の状態が示されていないことがあります。リスクは、長く連なった仮定の中に隠れます。存在しないファイル、不明な権限、曖昧な受け入れ条件が、確認できない作業を積み重ねた後で現れます。垂直スライスでは、次の見える一歩を止める依存関係を先に確かめます。

長い Agent 作業に関する公開報告は、容量エラーのあとに何が完了したか分からなくなること、
formatter や validation が `Working` のまま完了 signal を返さないことを示しています。
コミュニティの議論には、会話だけでなく TODO、plan、state を外に出しておく必要も現れます。
これらは universal product diagnosis ではなく、計画を観察可能にするための入力です。

| 報告された症状 | evidence が支えること | 証明しないこと | 計画上の対応 |
|---|---|---|---|
| 長い task の途中で model が使えなくなった | 中断と不確かな partial state が観測された | service-side cause、queue behavior、全 account の挙動 | 新しい指示を止め、worktree、last output、checkpoint を確認してから一つの slice だけ retry する |
| formatter または validation が `Working` のまま | その run で有用な completion signal がなかった | universal deadlock、正確な child process、root cause | no-progress threshold を決め、stdout、stderr、exit code、changed files を保存する |
| 複雑な task に見える TODO と plan が必要 | 外部 state が長い作業の追跡を助けるという user report | すべての model、task で visible plan が改善すること | decision summary、diff、check result、next action を必須にし、spinner を delivery evidence にしない |

計画は Agent が最後まで終える約束ではありません。人が pause、inspect、次の判断をできる
control surface です。

## 編集前にスライスを設計する

| 項目 | 答える問い |
|---|---|
| outcome | 最後に誰が何を観測できるか |
| input | どのファイル、データ、判断を固定するか |
| boundary | どのファイル、権限、副作用を許可するか |
| smallest change | 結果を作る最小の変更は何か |
| check | どのコマンド、検査、読み戻しで不合格にできるか |
| evidence | どの差分、出力、スクリーンショット、レビューを残すか |
| not proven | 何が範囲外に残るか |
| recovery | 最後に受け入れた状態へどう戻すか |

良いスライスは、判断できる問いに答えます。「すべてのナビゲーションを移行する」では答えになりません。「一人が日本語の目次からローカルの章を開き、練習を見つけ、記録した経路で戻れるか」なら確認できます。

### 1. 作業名より先に結果を決める

利用者、reviewer、downstream system のどれかが観測できる一文から始めます。

> 新しい contributor が一ページを読み、network なしで一つの local check を実行し、
> pass または fail を見られる。

「documentation pipeline を作る」より、これを result card に直した方が、計画が守る対象が明確です。

```text
Outcome: いま誰が何を実行または確認できるか
Inputs: file、data、assumption、precondition
Allowed actions: 許可された surface と mutation type
Non-goals: 今回は意図的に後回しにする作業
Evidence: diff、command output、test、screenshot、review record
Risk: secret、external call、persistence、deletion、irreversible change
```

未来のすべての feature がないと観測できないなら、さらに小さな outcome を作ります。

### 2. 依存関係を wish list ではなく事実として描く

依存関係とは「次の action が意味のある結果を出す前に、これが真でなければならない」という意味です。
各項目について、次を答えます。

1. **Depends on:** 先に存在すべき exact state または evidence は何か。
2. **Provides to:** 次の slice に渡す file、field、command result、decision は何か。
3. **Blocked by:** 安全に推測できない欠けた input は何か。
4. **Dependency check:** read-only で最も安く確認できる方法は何か。

たとえば `database → API → UI → deployment` を、次のように evidence の鎖にします。

```text
Slice A: fixed sample record を local に読める
  provides: sample data shape と passing read check
Slice B: read-only endpoint がその record を返す
  depends_on: A; provides: observable API response
Slice C: 一つの screen が endpoint response を render する
  depends_on: B; provides: user-visible path
Slice D: disposable build で path を確認する
  depends_on: C; provides: build output と reviewable diff
```

矢印は hidden Agent memory ではなく、evidence と interface を表します。未確認の dependency は
静かに true とせず、`assumed` と書きます。

### 3. 計画の形を選ぶ

| 形 | 得意なこと | よくある失敗 | 使う場面 |
|---|---|---|---|
| Horizontal | 技術層、owner、release prerequisite を一覧にする | 最初の user result が多くの層の後ろへ隠れる | capacity map や ownership review が必要なとき |
| File/order based | edit の場所と小さな diff を把握する | repository の順番が user value の順番になる | change が理解済みで本当に local なとき |
| Vertical | input から observable result までの thin path を証明する | first slice が「feature 全体」になる | early feedback、reversible experiment、handoff が必要なとき |

Vertical slice は「backend の小さな一部」ではありません。一つの outcome に必要な境界だけを
横断し、extra polish、future abstraction、production data は残します。

主な問いがまだ未知なら、probe を使います。dependency の有無を読む、sample を一つ render する、
harmless tool call が目的の surface に届くか確かめる、といった read-only または reversible な調査です。
probe の出力は continue、narrow、stop の decision であり、product work ではありません。

### 4. task の山ではなく slice card を使う

```text
slice_id: S-01
outcome: 一つの observable user/team result
depends_on: 先に必要な exact state、file、evidence
provides_to: 次の slice に渡す input または decision
inputs: named files、fixtures、versions、assumptions
allowed_actions: この slice で許可する path と action class
non_goals: change、install、publish、infer しないもの
change_budget: expected files、commands、external effects
acceptance_evidence: passed と呼ぶための exact proof
failure_signal: failed または stalled run の見え方
stop_condition: state を保存して decision を求める条件
recovery: 最小の安全な retry または rollback
handoff: status、evidence path、remaining risk、next action
```

この項目は「人が X できる」を「Agent が Y と Z を編集した」に置き換えないためにあります。
File は implementation evidence であり、自動的に delivery evidence にはなりません。

### 5. change budget と checkpoint を決める

実行前に、意図的に狭い budget を見積もります。

- 変更してよい file。
- 実行してよい command。
- retry の最大回数、または no-progress interval。
- network、credential、installation、persistent state の可否。
- irreversible action の前に必要な human confirmation。
- slice が止まったら保存する artifact。

これは token 数の予測ではなく、side effect の境界です。budget 外の file、新しい dependency、
production credential、別 repository が必要なら、そこで止めて plan を更新します。

各 checkpoint に少なくとも次を残します。

```text
goal and current slice:
completed actions and evidence:
worktree / branch / target path:
files changed and baseline comparison:
last command, output, and exit status:
permission and external-effect state:
open assumptions or blockers:
next single action:
```

Checkpoint は Agent の短期会話の外に保存します。小さな Markdown、issue note、approved task record で十分です。
secret、cookie、token、private credential は入れません。

### 6. slice が本当に小さいか判断する

一つの title に独立した user outcome が複数ある、implementation と migration/release が混ざる、
acceptance authority が複数ある、first breakpoint がない、という場合は大きすぎます。最初の
useful evidence が最後にしか出ないなら分割します。

逆に、読めない、実行できない、review できない isolated file だけを作るなら小さすぎます。
最も近い observable slice と合わせます。ただし、refactor 自体を probe として試す場合は例外です。

> 会話にいなかった reviewer が artifact を見て「何が変わり、どう確認し、何が未証明で、次に何を安全にできるか」を答えられるか。

答えられなければ、slice により良い interface、またはより小さい outcome が必要です。

## 依存関係から計画する

1. ツールより先に、結果と受け入れ条件を書く。
2. 入力、依存関係、権限、まだ分からない事実を列挙する。
3. 結果を止める可能性がある不明点を最初に置く。
4. 失敗しても証拠が残るスライスを選ぶ。
5. 確認の順序と停止条件を固定する。
6. 各スライスの後に、差分、範囲、証拠、次の判断をレビューする。

タスクリストを約束だと思わないでください。タスクを実行しても、結果が出るとは限りません。計画では前提を見えるようにし、安心させる言葉の奥へ隠さないことが大切です。

## 小実験：一つの安全な slice で三つの plan を比べる

この実験は network、installation、credential、commit、push、deployment、production data を
使いません。人の変更が入った working tree ではなく、一時 directory を使います。

### 準備

リモート接続、秘密情報、外部アカウントを使わないローカルの使い捨てコピーを用意します。短い原文、既知の変更、固定した受け入れ確認の問いを選び、基準リビジョンを保存します。始める前に停止規則を決め、インストール、公開、送信はしません。

次のような README.md を一時 directory に作ります。

```markdown
## Slice Lab

Starting point. The page does not yet explain what changed or how to check it.
```

受け入れ条件は小さく固定します。読者が `What changed` と `How to verify` の二つの見出しを見つけられることです。
PowerShell の read-only check は次のとおりです。

```powershell
$text = Get-Content -Raw README.md
$required = '# Slice Lab', '## What changed', '## How to verify'
$missing = $required | Where-Object { $text -notmatch [regex]::Escape($_) }
if ($missing) { $missing | ForEach-Object { "MISSING: $_" }; exit 1 }
'PASS: required headings found'; exit 0
```

### タスク

三つの plan を、七項目以内で同じ goal に対して書きます。

1. writing、tooling、review、release に分ける horizontal plan。
2. file を触る順で並べる file-order plan。
3. 最小の readable/checkable page を先に作る vertical plan。

各項目に result、dependency、evidence、stop condition を付け、vertical plan の最初の項目だけを
実行します。二つの見出しと、その下の正直な一文を追加し、style、link、build system、future section は追加しません。
編集前後の target path と diff を保存し、local check を一度実行します。見知らぬ reviewer が baseline、
最初の observable result、changed files、exact command/exit status、out-of-scope を答えられる状態にします。

一つのタスクから、一般的な速さや品質を測ろうとはしません。観測していない時間、コスト、結果は `unavailable`、`unknown`、`not_run` と記録します。

### 証拠

二つの計画、固定した入力、選んだスライス、依存関係と権限に関する前提、差分、確認結果、停止点、引き継ぎカードを保存します。実行していない試行は `not_run` のままです。もっともらしい計画は、結果の代わりにはなりません。

期待する artifact は一時 directory 内の `slice-record.md`（または同等の approved note）です。

```text
baseline: edit 前の README.md
chosen_plan: vertical
changed_files: README.md only
check: 実際に実行した exact command
result: exact output と exit status
acceptance: passed / failed / not_observed
not_proven: styling、build、deployment、user acceptance
next_slice: 一つの bounded next action
```

- [ ] 結果、入力、範囲、受け入れ条件を観測できる。
- [ ] スライスに確認方法と復旧元がある。
- [ ] 失敗した試行もレビューできる証拠が残る。
- [ ] 明示的な権限がない外部への副作用は、範囲外である。
- [ ] 引き継ぎで、変更済み、確認済み、ブロック、未確認を分けている。

## 三つの計画を比べる：最初の証拠で選ぶ

同じ依頼に対して、エディターを開く前に三つの案を書きます。三つすべてを実行する必要はありません。どの案が最初の役立つ結果を隠してしまうかを比べるためです。

| 形 | よくある最初の手順 | 最初の役立つ証拠 | 続けない合図 |
|---|---|---|---|
| 横割り | 「すべてのデータ、次にすべてのUIを準備する」 | 多くの層を終えた後になりがち | 今日レビューできる人、入力、確認がない |
| ファイル順 | 「このファイルをこの順で編集する」 | ローカルでレビューできる差分 | ファイルの順序が、誰に何が見えるかを説明しない |
| 垂直 | 「固定した入力から一つの結果を見せ、確認する」 | 小さな経路、確認、記録 | 最初の経路に公開、インストール、複数システムの変更が必要 |

次の手順に進む価値があるかを早く知りたいときは、垂直の計画を選びます。依存関係、権限、ファイルの存在さえ不明なら、読み取り専用の探索（probe）を選びます。探索が答えるのは「続けられるか」であり、完成した機能ではありません。

## 再利用できる planning prompt

次を出発点にして、値を自分の task に置き換えます。production task にそのまま貼り付けず、
target と境界を先に埋めてください。

```text
Goal
Deliver one vertical slice: [named user/reviewer が観測できる result]

Context and inputs
- Repository/workspace: [absolute path or approved surface]
- Relevant files and fixtures: [exact paths]
- Baseline: [branch/commit/hash/status or saved copy]
- Known assumptions: [まだ未確認の facts]

Scope contract
- Allowed actions: [exact paths と read/edit/run/check]
- Change budget: [files、commands、retry/time limit]
- Non-goals: [feature、install、network、deploy、cleanup の除外]
- Human confirmation required before: [irreversible/external action]

Slice design
- depends_on: [precondition と cheap check]
- provides_to: [next slice の exact input]
- acceptance_evidence: [diff、output、test、render、review record]
- failure_signal: [error、missing output、timeout、scope drift]

Execution rules
1. baseline と既存変更を read-only で確認してから edit する。
2. first mutation の前に slice card と checkpoint を保存する。
3. stated evidence を出す最小の action だけを行う。
4. 各 action の後に changed state を報告し、spinner や自分の summary から成功を推測しない。
5. dependency、target path、useful event、budget に問題があれば stop して checkpoint を保存する。
   install、publish、delete、permission の拡大はしない。
6. recovery では target を読み戻し、baseline と diff を比較し、変数一つで idempotent action を一回だけ retry する。

Delivery
status (passed / blocked / unverified)、changed files、exact evidence、failed attempts、
remaining unknowns、rollback/recovery、next single action を返す。acceptance evidence がなければ complete と呼ばない。
```

この prompt だけで Agent が reliable になるわけではありません。会話の依頼を、別の人が audit
できる contract に変える点に価値があります。

## 停止と引き継ぎのカード

中断されても計画は消えません。しかし、それで続行の権限が得られるわけでもありません。セッションを閉じる前、または助けを求める前に、会話を知らない人にも読めるカードを残します。

```text
slice: 一つの観測可能な結果の名前
baseline: 比較したブランチ、リビジョン、またはコピー
done with evidence: 実際に行った変更と証拠
blocker or unknown: 最初に欠けた依存関係または確認
target state: no change / partial / unknown
not yet: 権限、インストール、公開、または除外したファイル
one next action: 読み取り専用の探索、または同じ結果を壊さずに再試行できる操作
```

次に行う一つの操作を名前で言えないなら、スライスはまだ大きすぎます。「続けて」と頼む前に、問いを分けてください。

## 最初に完結するスライスを一つ作る

「コース全体を改善する」ことから始めません。初めての人が読む、120語以内のローカル文章を一つ選びます。このスライスの結果は控えめです。**何を変えたか** と **どう確認するか** の二つの見出しを見えるようにし、公開、インストール、他のファイルの編集はしません。

最初にモデルへ「まだ編集しない」と伝え、次のカードを渡します。

```text
outcome: 読者が変更内容と確認方法を読める
fixed input: 120語以内のローカルファイル一つ
allowed: 文章の提案。確認後はそのファイルだけを編集
forbidden: 公開、インストール、リンク変更、他ファイルの変更
acceptance: 二つの見出しがあり、人が見つけられる
stop if: ファイルがない、別ファイルが必要、依頼が曖昧になる
```

その後、定義 → 三段階の計画を依頼 → 編集前に範囲を確認 → 小さく編集 → 前後を比較 → 二つの見出しを読む → 正直に引き継ぐ、の順に進めます。モデルが作業を広げようとしたら、カードに戻ります。新しい判断なしに範囲を広げても、「より役に立つ」ことにはなりません。

## 指標を作らずに、二つの頼み方を比べる

直接の依頼（「分かりやすくして」）と、このカードを使う依頼を一度ずつ試せます。文章、モデル、ツール、使える時間、読者への確認方法を固定します。両方のプロンプト、バージョン、読者の質問、エラーを保存します。変数が変わったら `not_comparable` と記録します。速く見える返答や、きれいな文章一つでは、一般的な生産性やモデルの優劣は証明できません。この練習で観測するのは、編集前に何が足りなかったか、結果をレビューできるかです。

## 安全な失敗と境界

**どう確認するか** をわざと消すか、存在しないファイルを指定します。最初の失敗は、内容が足りないのか、入力が誤っているのかを示すはずです。失敗を隠すために依存関係や権限を増やしません。観測したこと、まだ証明されないこと、安全な次の操作を一つ書きます。

| signal | 分類 | 最初の recovery |
|---|---|---|
| required heading がない | content acceptance failure | 欠けた heading だけを戻し、同じ check を再実行する |
| check が間違った file を見る | test/input failure | target path を読み直し、contract が許せば check だけを直す |
| 定義した時間内に output がない | unknown execution state | 待つのを止め、command、時間、process state、diff を保存する |
| install、network、広い path が必要 | scope/authority failure | 新しい decision を求め、環境を黙って修理しない |

復旧後は、何が変わったかと、失敗が何を証明**しなかった**かを書きます。失敗した check が
証明するのは、その input に対するその check が通らなかったことだけです。repository 全体や
Agent 全体が壊れた、または大規模 rewrite が必要だとは言えません。

## 実際の作業での recovery と stop

長い task が中断されたとき、無条件に「続けて」と送りません。

1. 新しい write、external request、install、delete、deploy を止める。
2. checkpoint、`git status`、relevant diff、last command output、実際の target path を読む。
3. breakpoint を missing input、scope drift、validation、infrastructure/timeout、permission、unknown に分類する。
4. read-only probe、または最小 slice への idempotent retry を一つだけ選び、変数を一つだけ変える。
5. 新しい evidence と、次の slice がまだ有効かを checkpoint に追記する。
6. 原因不明、retry budget 消費、target 変更のいずれかなら、編集を積み上げず blocked handoff を渡す。

partial artifact が安全で役に立つなら残し、`partial` または `unverified` と明記します。rollback が
必要なら、失敗の evidence を先に保存し、既存の user change を消さない範囲だけ戻します。

> 新しい evidence、新しい authority、または安定した target がなければ、自動的に続けない。

## 期待する artifact：別の人が実行できる handoff

complete な slice は、blocked で終わっても次の成果物を残します。

1. **Slice card：** outcome、dependency、scope、evidence、budget、stop condition。
2. **Checkpoint：** last confirmed state、target identity、changed files、command result、next action。
3. **Implementation diff または no-change record：** 実際に動いたもの。
4. **Verification record：** exact command、environment、exit status、output、check scope。
5. **Failure record：** failed input、observable signal、recovery、retry が安全かどうか。
6. **Handoff note：**

```text
status: passed / partial / blocked / unverified
done: evidence が支える claim
changed: exact paths または none
evidence: artifact path または link
not_proven: runtime、external、visual、security、user claim
risks: 残った side effect または assumption
next: 一つの bounded action
owner: person または team
```

Handoff は後から付ける事務作業ではなく、slice の一部です。これがなければ、次の人は長い
transcript から state を再構成し、すでに行った action を繰り返すかもしれません。

## 振り返り

横割りの計画なら最後まで見つからなかった依存関係は何か。垂直スライスを確認可能にした証拠は何か。確認後も範囲外に残った主張は何か。

今の task で、まだ別の人へ渡せないほど大きいものを一つ書きます。どの first slice が最初の
meaningful evidence を出すか。どの action、input、decision を明確に範囲外にするか。そこで
中断されたら、推測なしに再開するためにどの record が必要かを答えます。

## 依存関係を見える順に並べる

計画の順序は、ファイル名やチームの担当順ではなく、最初に大きなリスクを減らせる順に決めます。各依存関係について、「これがなければ何ができないか」「読み取り専用で確かめられるか」を書きます。

| 依存関係 | 先に確認する理由 | 最小の確認 | 未確認ならどうするか |
| --- | --- | --- | --- |
| 対象ファイルの同一性 | 別のコピーを編集すると結果が無意味になる | 絶対パスと基準状態を読む | 停止して正しいルートを尋ねる |
| 受け入れ規則 | 「良くする」だけではレビューできない | 読者が見える規則を一文にする | 結果をさらに小さくする |
| 必要な入力 | 入力がなければ提案を比べられない | 名前を指定したファイル／出典のリビジョンを読む | `blocked_input` にする |
| 権限 | 書き込みや外部操作はタスクの意味を変える | 許可されたパス／操作をタスクカードと照合 | 承認を尋ねる。範囲を広げない |
| 検証の出典 | 確認方法がなければ引き渡しの主張を作れない | コマンド、手動規則、読み戻しを特定 | `unverified` のまま引き継ぐ |

依存関係の図は、完璧でなくて構いません。大切なのは、不明点を後ろへ隠さず、最初の垂直スライスで安全に表へ出すことです。

## 実例：読者の経路を一つ直す

例として、ローカルの章の冒頭120語に「何をするか」と「どう確認するか」が書かれていないとします。目標を「コース全体を改善する」から、次のように小さくします。

```text
Outcome: 初めて読む人が二つの見出しを見つけ、最初の操作を一つ言える。
Fixed input: 使い捨てコピーにある、名前を指定した章ファイル一つ。
Allowed change: そのファイルのローカル文章だけ。編集前は提案にとどめる。
Acceptance: 「What changed」と「How to check」があり、どちらも120語以内の節にある。
Evidence: 基準状態、正確な差分、手動の読み戻し、未確認事項の一覧。
Stop: 別ファイル、リンク、公開、インストール、または読者データが必要になる。
```

このスライスの価値は、コースを完成させることではありません。タスク契約が十分か、対象が正しいか、確認方法が読者に見える規則を直接調べているかを、低いコストで見つけることです。受け入れ条件を満たしても、理解、成約、定着、全般的な品質は `not proven` のままです。

## 計画レビュー：開始前と変更後に問うこと

エディターを開く前と、一つのスライスが終わった後に、同じ五つをレビューします。

1. この結果を一文で言えるか。誰が何を観測するのか。
2. 最初の確認は、作った成果物ではなく受け入れ条件を見ているか。
3. どの前提が誤っていたら、この計画はすぐに止まるか。
4. 失敗しても、次の人が基準状態と試した範囲をレビューできるか。
5. 次のスライスは新しい証拠を求めるのか、それとも同じ約束を大きくしているだけか。

はい／いいえだけで答えられないなら、その計画はまだ実行手順ではなく希望です。読み取り専用の探索、質問、またはより小さい結果へ戻します。

## 失敗を証拠に変える

| 失敗 | 安全な結果 |
| --- | --- |
| 対象ファイルがない | 対象を作らず `blocked_input` と記録 |
| 受け入れ条件が「もっと良く」のまま | 読者に見える規則を尋ね、編集しない |
| 最初のスライスが三つのシステムを変える | ローカルの成果物一つに戻す |
| 確認にインストール／ネットワークが必要 | 新しい権限を尋ねるか、`unverified` で停止 |
| 差分が許可したファイルを越える | 追加変更をレビューし、ロールバックや判断なしに続けない |

失敗は計画の失敗ではなく、最初に高くつく前提が見えた記録です。最初に根拠がなくなった主張、実際の差分、最後に受け入れた状態、安全な次の操作を一つ、引き継ぎに残します。

## 移行タスク

同じスライスを、調査、言語練習、内容レビューにも計画します。結果、固定した入力、許可する操作と禁止する操作、確認、復旧は保ちます。言語練習では、受け入れ条件に、流暢なAI支援の返答だけでなく、後で見慣れない内容を助けなしに思い出すことも入れます。その練習が証明しないことも書きます。

分野ごとに三〜七枚の slice card を作ります。

- **Engineering：** 固定 fixture を返す read-only endpoint と、それを表示する一つの画面。auth、analytics、deployment は最初の slice から外す。
- **Research：** source table、uncertainty 列、範囲を限定した結論を持つ一つの質問。source を確認するまで検索結果を fact と呼ばない。
- **Marketing：** approved product context から audience-specific draft と reviewable experiment を一つ。publication と live audience data は外す。
- **Skill design：** trigger、input schema、allowed actions、output、failure path、review date を一つ。未レビューの外部 Skill は install/invoke しない。

別の人、または fresh Agent context に口頭説明なしで card を読ませ、隠れた assumption 一つと
不足した acceptance signal 一つを見つけてもらいます。直すのは reviewer の記憶ではなく card です。

## 受け入れチェックリスト

- [ ] 結果、入力、範囲、受け入れ条件を観測できる。
- [ ] スライスに確認方法、停止規則、復旧元がある。
- [ ] 失敗した試行もレビューできる証拠を残す。
- [ ] 明示的な権限がない外部への副作用は、範囲外である。
- [ ] 引き継ぎで、変更済み、確認済み、ブロック、未確認を分ける。

## 出典と保守の境界

垂直スライス、依存関係の順序、停止点は、このプロジェクトの安定した教え方です。製品機能、権限、モデルの利用可能性、コミュニティで報告された症状は変わります。現在の主張は、[公式ファクトカード](../evidence-library-JA.md#source-notes)と[フィールド問題索引](../evidence-library-JA.md#source-notes)で確認してください。これらは、ローカルでの実行や独立した学習者の観察に代わるものではありません。

| topic | source | Accessed | evidence boundary | Owner / next review |
|---|---|---:|---|---|
| task protocol に goal、context、constraints、acceptance、stop、recovery、delivery を含める | [Prompt patterns for real work](../../docs/research/prompt-patterns-for-real-work-2026-08-10.md) | 2026-08-11 | project research synthesis。vendor が定めた prompt format ではない | `curriculum-maintainer` / 2026-09-11 |
| capacity interruption と long-running verification で state が不明になることがある | [Field problems and prompt patterns P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md)、[field-problems deep dive](../../docs/research/field-problems-deep-dive-2026-08-11.md) | 2026-08-11 | public user reports。universal cause、repair、local reproduction は主張しない | `curriculum-maintainer` / 2026-09-11 |
| external checkpoint、vertical slice、complete handoff を curriculum に加える | [Content value upgrade plan P2](../../docs/research/content-value-upgrade-plan-p2-2026-08-11.md) | 2026-08-11 | project planning recommendation。experiment は `not_run` | `curriculum-maintainer` / 2026-09-11 |
| current Codex entry points、permission、model、command flag、UI state | [OpenAI Codex baseline](../../docs/research/openai-codex-baseline.md)、[official Codex documentation](https://developers.openai.com/codex/) | 2026-08-11 | volatile product facts。command や label は first-party source で再確認する | `curriculum-maintainer` / 2026-09-11 |

同じテンプレートを、調査メモ、マーケティング文、デザインレビューにも使えます。ただし、受け入れ条件は分野に合わせて変えます。調査なら出典の範囲と引用、文案なら提供された事実と読者条件、デザインレビューならビューポートと観察が必要です。プラットフォーム固有のコマンド、モデルの動作、速さ、コストは、現在の出典と実際の実行がない限り主張しません。

- [ ] 結果が小さく、観察する人に分かる。
- [ ] 最初に大きなリスクを持つ依存関係に、読み取り専用の確認または停止規則がある。
- [ ] 一つのスライスが、一つのレビュー可能な成果物と証拠を残す。
- [ ] 失敗と不明点を引き渡しから消していない。
- [ ] 次のスライスが、範囲の拡大ではなく新しい判断になっている。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-JA.md" aria-label="前の章: 第 9 章 · 検証、疑い、復旧">← 前へ<br><strong>第 9 章 · 検証、疑い、復旧</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-JA.md" aria-label="次の章: 第 11 章 · 役に立つ Skill を設計する">次へ →<br><strong>第 11 章 · 役に立つ Skill を設計する</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
