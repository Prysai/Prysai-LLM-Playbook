<!-- content_id: prysai-platform-fact-watch | locale: JA | language: ja | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# プラットフォーム情報の更新監視

ベンダーの文書、製品画面、権限、モデル、アカウント経路、リンクが変わった
可能性があるときに、現在のプラットフォームに関する教材の主張を保守できる
状態にします。この Skill は、Codex、Claude Code、Grok、ChatGPT、Gemini、
Copilot など、名前の付いた LLM プラットフォームについて、影響を受ける章、
Lab、Skill、ルート、読者向けの一時的な制限を洗い出すために使います。事実を
取得したり、新しいアダプターを採用したり、プラットフォームを実行したり、
モデルを比較したりするためのものではありません。

## 主張カードから始める

名前の付いたプラットフォームを一つ、出典または `claim_id` で裏付けられた
主張を一つ、その主張が現在どこに掲載されているか、情報源の管理者と URL、
最終確認日、適用範囲、担当者、次回レビュー日、レビューする理由をそろえます。
項目が一つでも欠けていれば、空欄で済ませず `unreviewed` と記録します。

主張は狭く保ちます。「Claude Code には権限モードがある」と「Grok Build
には API の経路がある」は別々のカードです。プラットフォーム名、機能名、
HTTP レスポンスだけでは主張の代わりになりません。

## 変更の兆候を分類する

現在の製品の動作を推測せず、次のうち一つだけを選びます。

- `review_due`: 予定していたレビュー日になった、または決めた間隔内に情報源を
  確認できていない。
- `source_changed`: 日付のある一次情報源のレビューで、記録済みの主張との
  重要な差が確認された。
- `source_unavailable`: 引用した情報源が、現時点では主張の根拠にならない。
- `scope_changed`: 記録した画面、アカウント、地域、バージョン、権限の範囲には
  もう適用できない可能性がある。
- `no_change_recorded`: 日付のある一次情報源のレビューで、記録した範囲内の
  主張が同じだと確認された。
- `unreviewed`: 適切な一次情報源によるレビューがまだない。

記憶、リダイレクトされた URL、検索結果の抜粋、コミュニティ投稿、ログインの
成功だけを根拠に `no_change_recorded` を選んではいけません。情報源の確認が
裏付けるのは、記録された日付と範囲における主張だけです。

## 影響を受ける教材の範囲を地図にする

影響を受ける正規の単元をすべて挙げ、それぞれの役割を示します。

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

明示的な権限、証拠、復旧、影響を最小限にすることなど、安定したコア原則は
通常そのまま使えます。製品のコマンド、画面の経路、権限の初期値、価格、利用
資格、連携、モデルの提供状況はアダプターの事実であり、情報源のレビューが
必要です。情報源の変更を理由に、コース全体が使えなくなったとは書きません。

## 最小限で安全な対応を選ぶ

- `no_change_recorded`: 範囲を限定した文言は維持し、レビューの記録だけを更新
  します。より広い期間でも有効だとは主張しません。
- `review_due` または `unreviewed`: 普遍的なコアは維持し、該当する手順に
  レビュー待ちの印を付け、現在の事実を `prysai-source-investigator` に引き継ぎ
  ます。
- `source_changed`、`source_unavailable`、`scope_changed`: 情報源レビューで
  置き換えの文言が決まるまで、該当する教材手順を一時停止するか取り除きます。
  以前の記録は履歴の証拠として残します。
- 変更によってアダプターの情報源、実行、権限、失敗記録の信頼性が揺らいだ場合は、
  採用判断を `prysai-platform-adapter-review` に引き継ぎます。
- 公開中の主張、生成ページ、リリースノートが古い事実を示している場合は、修正を
  公開する前に、その成果物一式を `prysai-evidence-review` に引き継ぎます。

記憶だけで製品の手順を黙って書き換えてはいけません。更新確認の記録だけを
根拠に、アダプターを admitted、safe、equivalent、`production-ready` と分類して
はいけません。

## 保守レシートを返す

主張カード、変更状態、影響を受ける単元、読者へのリスク、安全な暫定文、情報源
レビューへの引き継ぎ、必要ならアダプターまたは主張監査への引き継ぎ、担当者、
次回レビュー日、未確認事項を含む記録を一つだけ返します。

最後に必ず次の限界を付けます。

`This receipt manages the freshness boundary of one named platform claim. It does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence.`

## 保守記録

- `source`: ADR-0025、コンテンツ・ライフサイクル、事実影響レジストリ、出典の
  範囲を限定したアダプター採用記録から導いた、Prysai Lab オリジナルの保守方法
- `license`: オリジナルの書き直し。一次プラットフォーム文書と公開レポートは、
  `docs/sources/asset-register.md` に従い、引き続き参考資料として扱います。
- `owner`: facts-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
