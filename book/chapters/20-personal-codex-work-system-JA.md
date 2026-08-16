<!-- content_id: chapter-20-personal-codex-work-system | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第20章：個人用 Codex 作業システムを作る

**状態：** `candidate`。**実験：** `draft / not_run`。この章は移植可能な方法を示します。製品の memory、auto-load、entry point が恒久的だとは仮定しません。

## 問題

多くの人は project、goal、用語、制約、acceptance を毎回説明し直します。context が不整合になり、決定が追えず、古い command が再利用され、経験が次の task に渡りません。さらに深刻なのは、個人の便利な記録に token、password、cookie、customer text、未確認の結論を入れることです。

## 五つの asset と五つの役割

| Asset | 答える問い | Lifecycle | 入れないもの |
|---|---|---|---|
| Project rules | 常に守ることは何か | 版管理し意図的に変更・review | 一時の推測と秘密 |
| Task context | 今回何をするか | task ごとに作り archive | 無関係な履歴 |
| Current state | 何を読み、変え、検証し、block したか | checkpoint ごとに更新 | 結果のように見せた plan |
| Template | 類似 task をどう開始・納品するか | 繰り返しの後に抽出 | 未検証の永久結論 |
| Reflection | 何が働き、失敗し、次に変えるか | 移植可能な学びだけ | token、cookie、customer text、不必要な個人データ |

context は多いほど良いわけではありません。relevance、信頼性、機微性、鮮度が重要です。

## Skill にするか、protocol のままにするか

| 観測 | 決定 | 必要な証拠 |
|---|---|---|
| 一回限り、または input/output が変化中 | task protocol を維持 | 一 task の input、制約、決定、納品記録 |
| input、判断点、output が安定し、正例と失敗例がある | Skill candidate を作る | 三回以上の実行、failure set、transfer task |
| 方法は有用だが trigger や副作用が不明 | 観測を続けるか block | gap、risk、未完の validation |
| 秘密、外部 write、本番 release で許可や rollback が不明 | Block | permission matrix、人の承認、rollback plan |

偶然の一回の成功は Skill の根拠ではありません。decision ID、繰り返す task、candidate asset、安定 input、failure、evidence、owner、review、action を残します。

## 最小の個人パッケージ

project map、task protocol、state log、evidence index、reflection の五記録から始めます。開始時に rules、branch、state、permission を調べ、実行中は必要な context だけを持ち、納品時には verified と未完を分け、reflection では他者が理解して試せる規則を取り出します。

納品には変更、実際に走った command、result と exit code、未検証・範囲外の項目、risk、recovery、次の owner を書きます。個人の習慣を製品保証にせず、現在の公式文書と許可された surface を確認します。

## 練習と境界

一時コピーで、修正されていない mobile overflow、user acceptance のない build success、version/entry/log のない authentication failure、audience/source のない copy update を分類します。task/input だけの A と、五記録を使う B を比較します。同じ input と baseline を復元して各二回走らせ、hash、`run_id`、clarification、実際の変更、validation、六つの evidence、rework、unverified、status を残します。

古い command と古い directory を fixture として加え、stale と記録して再利用を止めます。四つの log がそろい、秘密・外部副作用がなく、acceptance が review されて初めて実験は通ります。それでも Skill や実際の memory 動作の検証にはなりません。

## 個人の習慣を確認できる引き継ぎにする

個人用システムは、すべてを書き留める場所ではありません。次の task の開始時に、短時間で三つに答えるためのものです。何を deliver するのか。何が実際に確認済みか。どこで人に聞くため止まるべきか。記録がこの三つに役立たないなら、積み上げずに減らします。

```yaml
handoff_id: personal-system-20-example
goal: "四つの問題報告を安全に次段階へ進められるか判断する"
read: ["project rules", "task input", "current state"]
changed: []
verified: ["input hash", "current branch", "external write がない"]
not_verified: ["実際の sign-in entry", "build に対する user acceptance"]
blocked_by: ["version、entry、error log がない"]
next_owner_action: "不足 input を補い、再分類する"
recovery: "temporary record を削除し、clean copy を復元する"
```

`verified` には実際に確認したことだけを書きます。plan、予測、「以前は動いた」は `not_verified` または `blocked_by` に置きます。これで次の人が handoff を完了報告と取り違えません。

## 十分で始める：次の task に残す一枚のカード

最初から複雑な「第二の脳」を作る必要はありません。モデルに文書の修正、資料の整理、code の確認を頼む前に三分でこのカードを書き、終わった後に二分で補います。長い chat 履歴より、見直しや引き継ぎがずっと簡単です。

```text
目的：どの具体的な結果が必要か。
input：どの file、文章、link を使ってよいか。
境界：何を変えてはいけないか。何は先に人へ確認するか。
受け入れ：どの file、test、page、record で確かめるか。
結果：実際に何を変え、どの command を実行し、何の証拠が不足したか。
次：誰が、どの条件で続けるか。
```

「README を改善する」はまだ引き継げる task ではありません。「`README.md` の最初の三段落だけを書き直す。license、link、事実の主張は変えない。local link を確認し、未確認の製品情報は保留と書く」に変えます。すると、model に何ができて何ができないか、最後に何を残すかが分かります。model の提案はまず「確認待ち」に置き、「結果」へ直接入れません。

## 小実験の追加：古い情報を先に見つける

A/B 実行の前に、実行せず `project-map` に古い command と存在しない directory を一つ置きます。source、最後の確認日、現在の状態、安全な確認方法を書かせます。正しい対応は「もう一度実行」ではありません。許可された範囲で current state を読み、`stale` と記録し、不確実性を残します。

1. 現在の状態を確認できなければ `blocked` とし、command が有効だと推測しません。
2. directory があっても目的が不明なら観察だけを記録し、write target にしません。
3. account、network、external write が必要なら止まり、明確な authorization を求めます。
4. reflection には「開始時に source と日付を確認する」のような移植可能な規則だけを残し、古い command を恒久 template にしません。

## 自分で確かめる

- [ ] 初めて読む人でも口頭補足なしに goal、evidence、block を見つけられる。
- [ ] 一つの record が `stale` である理由と、現在の事実に戻る最小の行動を説明できる。
- [ ] 個人メモを秘密保管、製品 memory の保証、verified Skill として扱っていない。
- [ ] input 不足、実行可能、人の確認が必要な状態を分けている。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-JA.md">← 前の章<br><strong>第19章 · モデルとワークフローを評価する、印象から証拠へ</strong></a></td><td align="right"><a data-chapter-nav="next" href="21-team-capability-system-JA.md">次へ →<br><strong>第21章 · チーム能力システムを作る</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
