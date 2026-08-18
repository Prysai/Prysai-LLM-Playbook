<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
# 產品上下文 → 首次置業者指南

這個可丟棄的本地沙盒演示 `prysai-product-context` Skill 的受限鏈路：

```text
合成簡報 → 上下文草案 → 設計交接 → 靜態置業者指南 → 瀏覽器截圖
```

它不是房源、客戶交付物、市場研究、諮詢服務或獲客頁面。它沒有真實庫存、人物、客戶引語、市場統計、分析工具、表單、外部圖片、網路字型、CDN、API 或賬號連線。

早期版本在視覺審查中被拒絕：它使用了泛化的生活方式裝飾和虛構房源卡片。替代原則很實際：缺少真實證據或素材時，應提供有用的決策支援，而不是編造氛圍。

## 本地執行

在倉庫根目錄執行：

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

開啟 `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`。

## 檢視這些檔案

- `brief.md`：虛構輸入。
- `context-draft.md`：非權威上下文輸出、交接記錄和被拒絕模式。
- `index.html`、`styles.css`：下游指南。
- `scripts/capture_case_screenshots.mjs`：可復現的 Edge 截圖。
- `assets/cases/` 與連結案例記錄：證據及非宣告邊界。

上下文草案不授權釋出，也不構成規範的產品上下文寫入；它仍是 `candidate` 教學材料。
