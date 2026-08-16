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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-JA.md">← 前の章<br><strong>第 9 章 · 検証、疑い、復旧</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-JA.md">次の章は準備中 →<br><strong>第 11 章の提供状況を見る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
