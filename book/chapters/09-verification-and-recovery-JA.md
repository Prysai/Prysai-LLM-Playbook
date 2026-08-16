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

## 実験と境界

redacted summary、diff、test output、source link、意図的に欠けた evidence を用意します。Lab 003 で claim、scope、evidence、status、next check の表を作り、output のない「all tests passed」を安全な口調でも拒否します。fact claim、execution claim、user-effect claim を一つずつ含め、一つの弱い evidence を共有できない理由を説明します。production service には接続せず、external system を変更しません。

復旧によって state が再び観測可能になっても、claim が自動で `verified` になるわけではありません。この章は `candidate`、実験は `not_run` のままです。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-JA.md">← 前の章<br><strong>第 8 章 · 定義から引き渡しまで</strong></a></td><td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-JA.md">次の章へ →<br><strong>第 10 章 · 計画と垂直スライス</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
