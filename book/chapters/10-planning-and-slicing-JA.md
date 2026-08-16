<!-- content_id: chapter-10-planning-and-slicing | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 10 章：計画と垂直スライス

**状態：** `candidate`。plan と example は teaching material です。Agent が実行したことや、どの repository でも slice が働くことを証明しません。

## 問題

detail に見える plan でも、最後まで誰も結果を確認できないことがあります。すべての data、API、UI を順に終える横割りは、誤った前提を遅く発見します。vertical slice は小さくても input から evidence まで通る結果を作ります。

```text
one input → smallest change → observable action → focused check → evidence
```

これは一度に全部を変える口実ではありません。review と rollback ができる scope で、最も高価な risk を早く見つける方法です。

## edit 前に slice を設計する

| field | 答える問い |
|---|---|
| outcome | 最後に誰が何を観測できるか |
| input | どの file、data、decision が固定されるか |
| boundary | 許可される file、permission、side effect は何か |
| smallest change | outcome を作る最小の change は何か |
| check | 何の command、inspection、read-back が拒否できるか |
| evidence | どの diff、output、screenshot、review を残すか |
| not proven | 何が scope 外に残るか |
| recovery | 最後の受理 state にどう戻るか |

良い slice は decision に答えます。「すべての navigation を migrate」は答えません。「一人が日本語の目次から local chapter を開き、practice を見つけ、記録済み経路で戻る」は答えられます。

## dependency から計画する

1. tool より先に outcome と acceptance を書く。
2. input、dependency、permission、unknown fact を列挙する。
3. outcome を止め得る unknown を最初に置く。
4. failure でも evidence を残す slice を選ぶ。
5. check の順序と stop condition を固定する。
6. 各 slice の後に diff、scope、evidence、次の decision を review する。

task list を promise にしません。task を実行しても outcome が出ないことがあります。plan は assumption を見えるようにし、安全な言葉に隠しません。

## 実験と境界

disposable copy で同じ小さな change に対する horizontal plan と vertical plan を比べます。initial plan、baseline revision、command、diff、check、decision が変わった点を保存します。missing dependency または ambiguous acceptance を入れます。vertical plan は、確認不能な change を積む前に block を露出できれば通過です。

一 task から general speed や quality を測りません。観測していない time、cost、result は `unavailable`、`unknown`、`not_run` と記します。

- [ ] outcome、input、scope、acceptance が観測可能である。
- [ ] slice に check と recovery source がある。
- [ ] failure attempt も review できる evidence が残る。
- [ ] explicit authority がない external side effect は scope 外である。
- [ ] handoff が changed、verified、blocked、not proven を分ける。

## 三つの plan のワークシート：最初の evidence で選ぶ

同じ依頼に対して、editor を開く前に三つの案を書きます。三つすべてを実行する必要は
ありません。どの案が最初の役立つ result を隠すかを見るための比較です。

| 形 | よくある最初の step | 最初の役立つ evidence | 続けない signal |
|---|---|---|---|
| horizontal | 「すべての data、次にすべての UI を準備する」 | 多くの layer の後になりがち | 今日 review できる人、input、check がない |
| file order | 「この file をこの順で edit する」 | local で review できる diff | file の順序が、誰に何が見えるかを説明しない |
| vertical | 「固定 input から一つの result を見せ、check する」 | 小さな path、check、record | 最初の path に publish、install、複数 system の変更が必要 |

次の step に進む価値があるかを早く知りたいときは vertical plan を選びます。dependency、
permission、file があるかさえ不明なら、read-only の probe を選びます。probe は
「続けられるか」に答えるもので、完成した feature ではありません。

## stop と handoff のカード

interrupt があっても plan は消えません。しかし、continue の permission になるわけでも
ありません。session を閉じる前、または助けを求める前に、会話を知らない人にも読める
カードを残します。

```text
slice: 一つの observable outcome の名前
baseline: 比較した branch、revision、または copy
done with evidence: 実在する change と proof
blocker or unknown: 最初に欠けた dependency または check
target state: no change / partial / unknown
not yet: permission、install、publish、または除外した file
one next action: read-only probe または idempotent retry
```

一つの next action を名前で言えなければ、slice はまだ大きすぎます。「continue」と
頼む前に question を分けてください。

## 最初の完結した slice を作る

「course 全体を改善する」から始めません。初めての人が読む、120 語以内の local text を一つ
選びます。この slice の outcome は控えめです。**何を変えたか** と **どう確認するか** という
二つの見出しを見えるようにし、publish、install、他の file の edit はしません。

最初にモデルへ「まだ edit しない」と伝え、次のカードを渡します。

```text
outcome: 読者が変更内容と確認方法を読める
fixed input: 120 語以内の local file 一つ
allowed: text の提案。確認後はその file だけを edit
forbidden: publish、install、link 変更、他 file の変更
acceptance: 二つの見出しがあり、人が見つけられる
stop if: file がない、別 file が必要、依頼が曖昧になる
```

その後、define → 三段階の plan を頼む → edit 前に scope を確認 → 小さく edit → 前後を比較
→ 二つの見出しを読む → 正直に handoff、の順に進めます。モデルが作業を広げようとしたら
カードに戻ります。新しい decision なしに scope を広げることは「より役立つ」ことではありません。

## metric を作らずに、二つの頼み方を比べる

direct request（「分かりやすくして」）と、このカードを使う request を一度ずつ試せます。
text、model、tool、使える時間、読者の check を固定します。両方の prompt、version、読者の
質問、error を保存します。変数が変われば `not_comparable` と記録します。速く見える response や
きれいな文章一つでは、一般的な productivity や model superiority は証明しません。この練習は、
edit 前に何が欠けていたか、結果を review できるかを観測するためのものです。

## 安全な失敗と振り返り

**どう確認するか** をわざと消すか、存在しない file を指定します。最初の failure は、content が
足りないのか input が誤っているのかを示すはずです。failure を隠すために dependency や
permission を増やしません。観測したこと、まだ証明されないこと、安全な次の一 action を書きます。
この章は `candidate` のままです。この練習だけで effectiveness、speed、長期 learning は測れません。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-JA.md">← 前の章<br><strong>第 9 章 · 検証、疑い、復旧</strong></a></td><td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-JA.md">次の章へ →<br><strong>第 11 章 · 役に立つ Skill を設計する</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
