# Product Context → 初めての購入者向けガイド

この使い捨て可能なローカルサンドボックスは、`prysai-product-context` Skill の範囲を限定した連鎖を示します。

```text
合成ブリーフ → コンテキスト草案 → デザイン引き継ぎ → 静的な購入者ガイド → ブラウザ画面
```

これは不動産物件、顧客向け納品物、市場調査、助言サービス、見込み客獲得ページではありません。実在在庫、人物、顧客の引用、市場統計、分析、フォーム、外部画像、Web フォント、CDN、API、アカウント接続はありません。

初期版は、一般的な生活感の装飾と架空の物件カードを使ったため、視覚レビューで却下されました。実在の証拠や素材がなければ、雰囲気を作り出すのではなく、役立つ意思決定支援を提供するというルールです。

## ローカルで実行する

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

`http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/` を開きます。

## 確認するもの

- `brief.md`：架空の入力。
- `context-draft.md`：非権威のコンテキスト出力、引き継ぎ、却下パターン。
- `index.html` と `styles.css`：下流のガイド。
- `scripts/capture_case_screenshots.mjs`：再現可能な Edge 画面。
- `assets/cases/` とケース記録：証拠と非主張。

この草案は公開や正規のプロダクトコンテキスト書き込みを許可しません。`candidate` の教材のままです。
