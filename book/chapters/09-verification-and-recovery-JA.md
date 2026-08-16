<!-- content_id: chapter-09-verification-and-recovery | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 9 章：検証、疑い、復旧

**状態：** `candidate`。**実験：** `not_run`。この章は完了 claim と evidence を対応させ、不確かな workflow を復旧する方法を教えます。ローカル再現、公式診断、production evidence ではありません。

## 問題

Agent は、誤り、scope 外、未実行、誤った environment で確認した結果についても、もっともらしい完了 summary を書けます。blind trust と永久の疑いの代わりに、summary を独立した claim に分け、宣言した scope で支えられる最小の evidence を割り当てます。

| claim | 最低限の evidence | 証明しないこと |
|---|---|---|
| file が変わった | diff、path、hash | 正しい、または完全なこと |
| check が通った | command、directory、exit code、relevant output | 別環境で同じに動くこと |
| application が動く | actual start と critical path の observation | user value、security、production readiness |
| page が正しく見える | viewport を記録した render review | 完全な accessibility、backend、conversion |
| fact が公式 source にある | authority URL、access date、scope、review owner | この account の access や local configuration |

弱い一つの proof は残りすべての代わりになりません。passing build は runtime を、screenshot は demand を、公式 URL は access を証明しません。

## 最初の切れ目を見つける

```text
request → authorization → visible tool → action → result → review
```

観測できない最初の矢印を記録します。session が使えても tool が登録されているとは限らず、run の control を取り戻しても intended result が正しいとは限りません。

| state | 意味 |
|---|---|
| `verified` | 宣言した scope で evidence が claim を支える |
| `unverified` | 必要な evidence が欠ける。false とは限らない |
| `unknown` | 分類する observation が足りない |
| `partial` | 一部は支えられ、残りは支えられない |
| `not_observed` | project が observation を保存していない |
| `error` | 宣言した operation の failure evidence がある |

## 一つの安全な check で復旧する

capacity error、`Working` のままの command、missing tool、reinstall proposal に対して、先に diff、output、log、last accepted checkpoint を保存します。その後に target を inspect する、同じ command を一回だけ bound して retry する、input を尋ねる、または stop する、の一つを選びます。check は install、restart、deployment、scope 外 write の許可ではありません。

```text
claim: すべての test が通った
evidence: test output がない
status: unverified
next_check: 固定した directory と revision で承認済み command だけを実行する
```

### 緑の表示は結論ではない

緑の check は、ある時点で **一つの** check が error なしで終わったことを示すだけです。
「動く」と書く前に、次を分けます。

| 見えたこと | まだ確認すること | 小さく安全な確認 |
|---|---|---|
| command が exit code 0 で終わった | 想定した command、folder、revision だったか | command、folder、revision、必要な output を残す |
| diff がある | 依頼と boundary を守った変更か | goal と制約に照らして diff を読む |
| page が開く | 想定した input で重要な path が通るか | 無害な input と記録した viewport で一つの path を確認する |
| model が「完了」と言った | 各 claim を支える独立した observation は何か | path、output、diff、または明示的な limitation を求める |

一つの check の成功を security、user value、production への約束に変えません。
observation がなければ、その行は `unverified` のままにします。自信で埋めないでください。

### 復旧レシート：次の人が安全に続けられるようにする

workflow を止めた、または control を取り戻したら、短い receipt を残します。
闇雲に最初からやり直さず、次の人が permission を広げずに何を確認できるかを示すためです。

```text
goal と boundary: 何を行う予定で、何が許可されていなかったか
last confirmed point: 実際にある observation、path、または output
first unsupported point: evidence のない最初の claim
target state: no change / partial change / unknown
saved evidence: diff、log、output、screenshot、または特定の link
safe next check: read-only または reversible な一つの action
not yet: publish、install、deploy、または scope の拡張
```

receipt は result を修正せず、cause も証明しません。`maybe` を `done` にせず、
安全に再開できる正確な位置だけを残します。

## 実験と境界

redacted summary、diff、test output、source link、意図的に欠けた evidence を用意します。Lab 003 で claim、scope、evidence、status、next check の表を作り、output のない「all tests passed」を安全な口調でも拒否します。fact claim、execution claim、user-effect claim を一つずつ含め、一つの弱い evidence を共有できない理由を説明します。production service には接続せず、external system を変更しません。

復旧によって state が再び観測可能になっても、claim が自動で `verified` になるわけではありません。この章は `candidate`、実験は `not_run` のままです。

## ガイド付き練習：自信のある summary をそのまま受け取らない

90 語程度の案内文について、「初めての人が最初の一歩を理解できるように直して。
事実は変えず、公開もしないで」と依頼した場面を考えます。モデルが「完了しました。
分かりやすく、すべての check を通しました」と返しても、すぐに完了にしません。

1. どの file または本文が変わったか。diff か変更前後の本文を確認する。
2. どの check を実行したか。command、directory、exit code、必要な output を確認する。
3. 何をまだ確認していないか。初学者の理解、Web での見え方、公開後の反応を分ける。
4. 次の安全な check は何か。この例では二つの本文を比較し、初めて読む人に
   「最初に何をする？」と一問だけ尋ねる。

モデルを嘘つきと決める必要はありません。広い一文を claim の表に変えれば十分です。
test output がなければ「すべての check が通った」は `unverified` です。本文比較しか
していないなら、「本文の差分はあるが、読者の理解は未確認」が正確な handoff です。

## 初学者向けの復旧カード

期待どおりでないとき、指示を無計画に足しません。観測したことだけを書きます。

```text
goal: 最初の一歩を分かりやすくする。公開しない
last_confirmed: 下書きと diff はある
first_breakpoint: 初めての読者が理解した evidence がない
safe_next_check: 一問だけの読者確認を依頼する
stop_if: 公開、install、別 file の変更が必要になる
honest_handoff: 本文 review はある。読者理解は unverified
```

このカードは「動かなかった」を調べられる次の一歩に変えます。model、Skill、course の
効果を証明するものではありません。観測したこと、欠けていること、安全な次の行動だけを
分けて残します。

## claim を evidence に対応させる

summary を受け取ったら、まず claim を一行ずつ分けます。一つの artifact や green check を
複数の結論に使い回さないためです。

| claim | scope に合う evidence | evidence があっても残る限界 |
| --- | --- | --- |
| 指定 file が変わった | exact path、before/after diff、必要なら hash | 変更が依頼の意味を満たすこと |
| named command が pass した | exact command、working directory、revision、timeout、exit status、relevant output | 他の command、environment、未実行 path |
| page の一つの path が開いた | recorded viewport、input、URL、render observation | 全 browser、authenticated state、accessibility 全体 |
| source が文を支える | original URL、access date、引用した範囲、scope | current product behavior、account access、因果 |
| beginner が理解した | 誰が、何を読んだか、質問、回答、条件を残す reader observation | すべての reader、保持、transfer |

`claim → evidence → status → next check` の表を作り、evidence がない row は `unverified` のまま
にします。false と決める必要はありません。ただし、evidence がないことを success の語で隠さない
ことが重要です。

```text
claim: README の start step は初学者に分かりやすい
evidence: maintainer の本文 review と local diff
status: partial
not proven: 初見の reader が正しく行動できること
next check: 一人に「最初に何をするか」を一問だけ聞く
```

## capability chain と breakpoint card

「tool が見える」「session が開く」「control を取り戻した」は、それぞれ違う層の signal です。
次の chain の各矢印に独立した proof が必要です。

```text
request → authorization → visible tool → action started → result observed → acceptance review
```

最初に support できない layer で止まります。後ろの layer を推測して埋めません。

| breakpoint | まず保存するもの | 次の小さな check |
| --- | --- | --- |
| authorization が不明 | task contract、requested action、approval screen/record | scope と approver を確認する。実行しない |
| visible tool がない | current surface、account/environment label、exact missing control | official/current setup を読むか human に ask |
| action start が不明 | proposal、tool trace、target baseline | named local target を read-only で確認 |
| result が不明 | diff、partial output、log、timestamp | exact artifact を read back する |
| acceptance がない | artifact と requirement | requirement を直接調べる一つの check を選ぶ |

breakpoint card は復旧を小さく保ちます。

```text
last confirmed layer:
first unsupported layer:
artifact / side-effect state:
evidence preserved:
claim downgraded to:
one safe next check:
explicitly forbidden next actions:
```

## event がない待機を扱う

長い `Working` 表示や無応答の command は、成功でも failure でもなく、まず timeline の問題です。
wait を繰り返す前に開始時刻、最後の output、process/tool state、observed diff、allowed timeout を
記録します。timeout の後は、同じ write を送る前に artifact を読むか、authorized な interrupt を
使うか、`unknown` として handoff します。

```text
started_at:
last_output_at:
no-event threshold:
process or tool state:
artifact read-back:
external side effects observed:
decision: wait once | interrupt | read back | stop
```

elapsed time は effect の proof ではありません。特に write、publish、send、payment のような
non-idempotent action は、response が失われても blind retry しません。baseline と postcondition を
照合してから、human が新しい attempt を許可するか決めます。

## completion status と recovery status を分ける

recovery で control を取り戻しても、completion claim が真になるとは限りません。二つの column を
別に残します。

| recovery state | completion state | 正確な handoff の例 |
| --- | --- | --- |
| checkpoint を保存して pause | `unverified` | 「再開可能な checkpoint はある。結果は未確認」 |
| target を read back して partial diff を確認 | `partial` | 「一部変更を確認。acceptance check は未実行」 |
| missing input を特定 | `blocked` | 「原因候補ではなく、必要 input の不在を観測」 |
| exact check が scope 内で pass | `verified` | 「この local rule は pass。scope 外は not proven」 |

これは product の status label を定義するものではありません。自分の delivery claim が、実際に
保存した evidence より強くならないための vocabulary です。

## transfer と acceptance checklist

固定 source を使う research memo または static page review に同じ method を移します。事実 claim、
execution claim、reader-effect claim を一つずつ書き、それぞれに別の evidence を要求します。意図的に
一つの citation、diff、または output を外し、claim を downgrade してから一つの safe next check を
選びます。

- [ ] build、diff、screenshot、source URL、reader feedback のどれも、別の種類の claim を自動で証明しないと説明できる。
- [ ] first unsupported layer を名付け、scope を広げずに次の check を選べる。
- [ ] no-event command の timeline を保存し、time だけから success と言わない。
- [ ] recovery state と completion state を別々に delivery する。
- [ ] `verified` は exact acceptance check の記録がある row にだけ使う。

## sources と更新境界

この章の method は project-authored の teaching framework です。product-specific behavior、command、
approval、UI status は volatile であり、current official documentation と actual environment で確認します。
public field report は symptom の teaching input であり、local reproduction、root cause、universal fix の
証拠ではありません。参照先は英語 source chapter と [evidence library](../evidence-library-JA.md#source-notes)
に記録されています。章は `candidate`、実験は `not_run` のままです。

## 意図的な失敗と振り返り

読者に尋ねていないのに「読者は理解した」と書いた handoff を一度作ります。その claim が
evidence を越える箇所を印し、正直な状態に書き換えます。次に、状態を変える最小の
evidence と、それでも scope 外に残ることを説明します。diff と一緒に保存してください。
実行記録と review がない限り、この章は `candidate`、この練習は `not_run` のままです。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-JA.md">← 前の章<br><strong>第 8 章 · 定義から引き渡しまで</strong></a></td><td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-JA.md">次の章へ →<br><strong>第 10 章 · 計画と垂直スライス</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
