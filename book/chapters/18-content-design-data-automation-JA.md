<!-- content_id: chapter-18-content-design-data-automation | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第18章：コンテンツ、デザイン、データ、自動化トラック

**状態：** `candidate`。**実験：** `draft / not_run`。このトラックは納品物の検証方法を教えます。本番実行の記録ではありません。

## 問題

workflow の tool が増えるほど、「source file がある」「script が走った」「API が接続した」を完成品と取り違えやすくなります。layout、empty state、accessibility、license、formula、privacy、permission、重複書き込み、回復にも失敗がありえます。

> 最初に最終形と読者を定義します。次に risk 順で capability を有効化し、render された結果、入出力、permission、回復、公開状態を検査します。

## ブランドでなく納品物から選ぶ

| 納品物 | 最終形の check | 典型的リスク |
|---|---|---|
| Document / PDF | pagination、目次、link、font、可読性、印刷 | reflow、font 欠落、引用・license |
| Website | browser render、responsive、interaction、empty/error、keyboard、mobile | source は正しくても UI が使えない |
| Image / video | 寸法、明瞭さ、文字、権利、caption/alt、編集性 | 事実誤り、不明 license、アクセス不能 |
| Presentation | 投影サイズ、階層、contrast、話す順、notes | overflow、低 contrast、script 不一致 |
| Spreadsheet / report | formula、filter、unit、空値、export、再計算 | 数値ずれ、denominator drift、上書き |
| Automation | schema、log、retry、idempotency、permission、rollback、出力 | 二重書込、漏えい、部分完了 |

source diff は最終形の証拠になりません。実際の形が重要なら PDF/PNG を render し、website を browser で開き、sheet を再計算し、test account で制御した flow を走らせます。階層、可読性、empty/error、accessibility、正確さ、license、編集性を確認します。

## 可逆で繰り返せる自動化

```text
入力 schema と sample; sensitive field と許可用途;
transform と version; 外部 call、target、最小 permission;
timeout、retry、backoff、idempotency key; log、trace ID、error 分類;
出力 schema と validation; 部分状態、compensation、rollback;
人の承認点と停止条件。
```

「API が接続した」は接続性だけを示します。field mapping、完全性、重複、permission 範囲、下流の正しさは示しません。本番書込みの前は test account、sandbox、ローカル simulation を使い、必要なら input/output hash と batch ID を残します。

## 最初の10分：曖昧な依頼を確認できる draft にする

新しい tool を選んだり account を接続したりする前に、まずここから始めます。架空の brief と捨てられる local file を使います。例は「架空のイベント申込3件について一ページの更新を書く」です。model を立派に見せることではなく、小さな依頼を確認可能な形まで具体化できるかを見る練習です。

1. **reader**、**final form**、**提供済みの事実**、**禁止する data/action**、**合格条件**を5行で書きます。
2. 次の prompt の角括弧を自分の課題に置き換えます。

   ```text
   [reader] 向けに [final form] を作成してください。使ってよいのは次の事実だけです: [facts]。
   数字、source、名前、結果を作らないでください。情報が足りないときは [missing] と表示し、質問は一つだけにします。
   draft だけを返してください。送信、公開、login、外部 service の呼び出しはしません。
   acceptance check: [観察できる確認項目を3つ]。
   ```

3. reader として draft を開き、提供した事実、各 `[missing]`、見出しの順序、書いた acceptance check を確認します。
4. brief、prompt、output と、**passed**、**failed**、**unknown** の3行メモを残します。実データ、配布、新しい permission が必要なら止まり、それを次の decision として書きます。黙って task を広げません。

一つのきれいな draft は、prompt が常に優れていること、作業が速くなったこと、production で安全なことを示しません。次の修正と比べられる小さな evidence になるだけです。

level は、低リスクのローカル読み取り、可逆な project work、承認と log を持つ制御済み外部接続、明示的許可・privacy/license review・preview・rollback・online verification を持つ本番書込み／公開の四つです。上位に移るには新しい理由、permission、risk、evidence、回復計画が必要です。

## 練習と境界

合成 product-report context、匿名化した構造 fixture、架空の読者を使います。A は document、B は document と分析、C は render した chart、D は外部分配です。空データ、欠落 column、極端値、壊れた入力を入れます。A/B/C はローカルで、D は test account または draft endpoint だけで実施し、preview、batch ID、idempotency key、log、承認を確認して公開しません。

A–D 表、最終 render、data dictionary、validation、無効入力への応答、log、permission、retry、sandbox 状態、公開がなかった証拠を残します。模擬書込み後 timeout なら trace を保存して部分状態を照会し、非冪等操作を繰り返しません。実際の最終形の証拠と独立 review までは `candidate / not_run` です。

## automation contract：action より先に data を定義する

offline の「aggregate count から一ページ report を作る」例です。synthetic JSON を read し disposable directory に write するだけで、network、login、send はしません。

```text
input: report-input.json。date、category、count。count は non-negative integer。
sensitive boundary: name、email、IP、chat、token、external ID を受け取らない。
transform: category ごとに count を集計し、input/version と script version を残す。
output: report.md。time window、denominator、missing field、empty state を含める。
validation: output を read back し total、category、hash、empty/bad input を確認。
retry: 同じ idempotency key と read-back 可能な output のときだけ。unknown write は先に query。
stop: schema 不一致、sensitive data、directory 不明、overwrite rule 未確認。
```

exit code 0 は script が自身の定義で終わったことだけを示します。field mapping、label、audience、external system は証明しません。

| deliverable | 開いた後に見るもの | 見落としやすい failure |
|---|---|---|
| document/PDF | hierarchy、page、link、empty、selectable text | export の崩れ |
| website | 390px/desktop、keyboard、empty/error、link | button または language の誤り |
| chart | unit、denominator、label、contrast、alt、rights | きれいでも誤解を招く |
| sheet | formula、filter、empty、unit、recalculate | formula の上書き |
| flow | schema、log、batch、key、read-back | timeout 後の二重 write |

## 小実験：offline report flow と二つの failure

1. normal、empty、`count` 欠落、negative、extreme の synthetic input を作る。real customer/personal/production data は使わない。
2. Markdown report を作り window、total、category、empty state を確認する。PDF/PNG を render するなら final form を確認する。
3. run ごとに input hash、transform version、output path、exit status、raw log、read-back を残す。
4. write 後 timeout を模擬する。すぐ再 write せず同じ batch で partial report を読む。unknown なら `unverified` として stop。
5. missing column/bad data では block reason を示し、zero、chart、success を作らない。

email、CRM、cloud drive、website への送信は別の external write です。test account/draft endpoint、target/audience、approval、batch、withdrawal/rollback、online read-back が必要で、この exercise は許可しません。

## 自己確認

- [ ] input field、sensitive boundary、version、output、validation、retry、stop を書いた。
- [ ] final form を開き、empty/error/accessibility を script 以外で確認する。
- [ ] timeout では batch/output を query してから write を繰り返す。
- [ ] local generated、draft、sent、published、online read-back を分ける。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="17-marketing-track-JA.md" aria-label="前の章: 第 17 章 · マーケティング・トラック、製品理解から成長実験へ">← 前へ<br><strong>第 17 章 · マーケティング・トラック、製品理解から成長実験へ</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-JA.md" aria-label="次の章: 第 19 章 · モデルとワークフローを評価する、印象から証拠へ">次へ →<br><strong>第 19 章 · モデルとワークフローを評価する、印象から証拠へ</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
