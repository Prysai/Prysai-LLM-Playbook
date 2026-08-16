<!-- content_id: lab-017-skill-discovery-audit | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "Skill を採用する前に発見経路を監査する"
level: L4
domain: general
goal: "存在、発見、ロード、挙動、ライセンス、採用を別々の主張として保つ"
setup: "使い捨てディレクトリ内の、revision固定・匿名化した二つのSkill見本。導入、認証情報、外部書込なし"
task: "各発見段階を記録し、revisionとライセンス境界をレビューして限定的な採用判断を作る"
evidence: ["目録、発見出力、source revision、ライセンス、依存、四ケース計画", "recommendation-only、blocked、approved-to-install、installed-candidateを分ける判断記録"]
failure_variant: "候補に実際の.envまたはアップロードを要求させる。blockedにして要求を満たさない"
reflection: "ディレクトリ一覧が証明できなかった段階は何で、採用前にどの証拠が要るか？"
status: draft
last_verified: "not run"
transfer_task: "MCPサーバーへ段階を適用し、設定、発見、読取、呼出結果、採用を分ける"
transfer_domain: "MCPレビュー、Skill保守、工学、調査"
transfer_evidence: "revision、ライセンス、対象範囲、backup、rollback、所有者、承認点、次回確認"
transfer_limitations: "静的見本は実Skillのロード、安全挙動、すべてのネスト資産のライセンスを証明しない"
---

# Lab 017: Skill を採用する前に発見経路を監査する

## 問題

Skillはディスクに存在しても暗黙リストにないことがあり、明示名で解決してもロードで失敗することがあります。これらは別の観測です。ディレクトリ一覧や一回のsmoke testを採用判断にしてはいけません。

## 準備とタスク

revision固定で匿名化した二つの見本を使います。一方には追跡可能なライセンスと限定入力があり、他方には明確なライセンス、依存一覧、rollback先がありません。どちらも導入せず認証情報も使いません。次の段階を別々に記録します。

```text
ファイルがある:
暗黙発見:
明示名解決:
新しいセッションでロード:
正例の挙動:
境界の挙動:
失敗/注入の挙動:
プロジェクト間移行:
採用判断: recommendation-only | blocked | approved-to-install | installed-candidate
```

未知は `not_observed` と書きます。revision、ライセンス、NOTICE、ネスト資産、依存、ネットワーク/アカウント要件、導入範囲、backup、rollback、所有者、次回確認をレビューします。

## 失敗、転移、受入

候補に実 `.env` やアップロードを要求させます。正しい結果は `blocked` であり、成功らしく見せるために要求を満たしません。目録、判断パッケージ、読取専用発見出力、正例・境界・失敗/注入・移行の計画を保存します。

- [ ] 存在、発見、ロード、挙動、採用を分けた。
- [ ] revisionを固定しライセンス境界を確認した。
- [ ] 正例、境界、失敗/注入、移行ケースを設計した。
- [ ] 対象範囲、backup、rollback、所有者、承認点を示した。
- [ ] 成功に見せるための導入やアップロードをしなかった。

MCPでは設定の可視性、ツール発見、読取対象アクセス、呼出結果、外部read-back、採用を分けます。このLabは `draft / not_run` であり、見本は実Skillの安全性や完全なライセンスを証明しません。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Labナビゲーション"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-JA.md">← 前へ<br><strong>Lab 016 · 副作用の境界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-JA.md">次へ →<br><strong>Lab 018 · 入力型の旅行会話で保持と転移を確認する</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
