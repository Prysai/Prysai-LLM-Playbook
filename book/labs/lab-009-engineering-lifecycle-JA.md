<!-- content_id: lab-009-engineering-lifecycle | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-009-engineering-lifecycle
title: "直接実装と完全なエンジニアリング・ライフサイクルを比べる"
level: L3
domain: engineering
goal: "小さな比較で普遍的優位を装わず、定義、計画、検証、レビュー、交付がどこで手戻りを減らすかを測る"
setup: "捨てられるローカルリポジトリ、固定した低リスク課題三つ、基準リビジョン、固定ツール、本番または外部副作用なし"
task: "同じ三課題を直接とライフサイクルの流れで実行し、初回結果、条件変化、証拠品質、手戻りを比較する"
evidence:
  - "両方の経路の baseline revision、固定 task、順序、input hash"
  - "最初の result、制御した rework、diff、check output、rework count"
failure_variant: "baseline を戻さない、または build pass を user acceptance と呼び、not comparable か unverified にする"
reflection: "どの phase が最大の未裏付け claim や rework を防いだか。どんな交絡が残るか。"
status: draft
last_verified: "not run"
transfer_task: "同じ baseline で小さな documentation または research workflow に比較を移す"
transfer_domain: "engineering、research、documentation"
transfer_evidence: "固定 input、二つの run record、diff、check、比較、限界を保存する"
transfer_limitations: "三つのローカル task は一般的な model や process の優位を証明しない"
---

# Lab 009：直接実装と完全なエンジニアリング・ライフサイクルを比べる

## 学習目標

明示的な定義、計画、検証、レビュー、交付が、同じ設定の三つの固定課題を改善するかという狭い主張を試します。これはエンジニアリングのスモークテストであり、モデル順位表ではありません。

## 準備

コミット済み基準を持つ捨てられるリポジトリを作ります。三つの小課題と受け入れチェックを固定します。両方の流れで環境、モデル、ツール、権限、ネットワーク条件、時間予算を同じにします。モデルを変えるなら流れを固定し、流れを変えるならモデルを固定します。各課題の前に基準を戻し、順序を先に決め、順序の偏りを限界として記録します。

A は固定された目標、入力、受け入れ規則だけを受けます。B は `define`、`plan`、`build`、`verify`、`review`、`deliver` のタスクプロトコルを使います。

## タスクと実験

次の無害な fixture を使います。

1. 合成した配送記録から名前付き三項目を抽出する。
2. 完了と未検証を分けた Markdown に整える。
3. 「コードがありビルドできるので機能は検証済み」という根拠のない主張をレビューする。

A を三課題すべてで実行し、次に B を三課題すべてで実行します。各実行の制御された手戻りは一回までです。手戻りが成功しても初回結果を残します。

実際の値だけを記録します。

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

不明な時間やコストは見積もらず `unavailable` にします。手戻り後の通過を初回成功にはしません。

## エンジニアでなくてもできる最小版

本物のサイトや複雑な repository から始める必要はありません。一時 file `status.md` を作り、次の synthetic text だけを入れます。

```text
build check：exit code 0
mobile check：完了
user acceptance：未実行
```

A には「この内容を完了状態として整理して」とだけ渡します。B には同じ文章に加え、**「変更できるのは `status.md` だけ。不明を残す。最初に plan を示す。最後に三行のままか確認する。user acceptance を完了と書かない」**と渡します。どちらも network を使わず、commit も他の file の変更もしません。

どちらがきれいかを比べるのではありません。「未実行」を残したか、実際の変更を説明したか、確認できる結果を残したかを比べます。B が明確でも、この synthetic text でこの protocol をさらに試す価値がある、までです。model、team、実際の project の効率を証明するものではありません。

## 証拠、失敗、受け入れ

六つの初回出力、別試行としての手戻り、差分、コマンド、終了コード、チェック出力、レビュー記録、交付概要、2×3 比較表を残します。結論は `expand`、`do_not_expand`、`insufficient_evidence` のいずれかです。

一つの実行で timeout、権限ブロック、入力ハッシュ変更、ツール版変更、またはローカル書き込み結果不明を起こします。中断した試行を保存し、再試行前に対象を確認し、固定条件が変われば `not_comparable` にします。後の成功は比較可能性を遡って直しません。

- [ ] 両方の流れが同じ固定課題と復元した基準を使った。
- [ ] 六つの初回試行と手戻りを別々に確認できる。
- [ ] 初回、時間、手戻り、失敗分類、検証は実際の値である。
- [ ] 失敗分岐の少なくとも一つを照合または `not_comparable` として残した。
- [ ] ビルド成功を実行、デプロイ、ユーザー検証とは呼ばない。
- [ ] 結論は三課題の範囲に留まる。

## 振り返りと転移

どの段階が重大な問題を最初に見つけましたか。結果を変えず儀式だけを増やした段階は何ですか。役立つ確認点だけを別の可逆的課題へ移し、比較可能かどうかを説明します。三つの小課題は一般的なコスト、品質、モデル順位を証明せず、ローカルチェックもデプロイやユーザー受容を証明しません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab ナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-008-research-question-JA.md" aria-label="前の Lab：Lab 008 · 大きなテーマを答えられる調査の問いに絞る">← 前の Lab<br><strong>Lab 008 · 大きなテーマを答えられる調査の問いに絞る</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-010-product-context-JA.md" aria-label="次の Lab：Lab 010 · 二つのタスクに使い回せる共有プロダクト文脈を作る">次へ →<br><strong>Lab 010 · 二つのタスクに使い回せる共有プロダクト文脈を作る</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
