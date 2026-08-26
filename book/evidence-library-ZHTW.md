<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: reader-evidence-library | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | source_revision: worktree-2026-08-16 -->

# 證據與術語導航

本頁讓學習路線保持可讀，同時保留證據邊界。課程頁會指向這裡，而不是把讀者直接送入面向維護者的英文研究或治理記錄。

它是證據導航，不是原始記錄的替代品。來源記錄只能支援其中明確寫出的範圍；它不能證明學習效果、當前產品行為、模型品質或普遍安全性。

<a id="core-terms"></a>

## 核心術語

穩定的區分是：**模型**生成輸出；**工具**能觀察或改變外部系統；**Skill** 是帶輸入、停止條件和檢查的可複用方法；**Agent** 是可觀察的多步迴圈；**證據**是他人可以檢查的材料。一個命名平臺不自動等價於另一個平臺。

完整的維護術語記錄標識為 `CONTEXT.md`。產品名稱、選單、預設值、價格、額度和權限都是易變事實，使用前需要帶日期的一手來源。

<a id="source-notes"></a>

## 來源說明

課程使用四類證據。依賴前先讀標籤：

| 標籤 | 可以支援什麼 | 不能支援什麼 |
| --- | --- | --- |
| 官方基線 | 在宣告範圍內、帶日期的產品事實 | 所有帳號或未來版本的承諾 |
| 公開現場報告 | 使用者報告的問題或做法 | 已確認根因或本地復現 |
| 固定夾具 | 狹窄的本地合同 | 模型、學習者或生產行為 |
| 專案方法 | 提議的步驟及其邊界 | 獨立效果或採用結論 |

技術來源標識包括 `openai-codex-baseline.md`、`field-problems-codex.md`、`prompt-patterns-for-real-work-2026-08-10.md` 與 `llm-mechanism-deep-dive-2026-08-10.md`。它們是證據記錄，不是額外課程章節。

<a id="method-and-status"></a>

## 方法與狀態

可長期遷移的迴圈是：定義任務 → 選擇必要上下文 → 設定行動邊界 → 做最小可逆動作 → 檢查證據 → 恢復或交接。綠色檢查只驗證該檢查自己的合同。

`draft` 表示材料或證據尚未完成；`candidate` 表示結構與基本檢查存在，但宣告範圍仍缺少足夠的新鮮證據；`verified` 與 `production-ready` 需要專案技術發行記錄所列的更強證據。

## 不迷失地使用來源

1. 寫下你要做的決定。
2. 閱讀來源標籤和日期。
3. 記錄你實際使用的事實、報告或未知項。
4. 一旦決定需要實時平臺觀察或新授權，就停止。

記錄後回到當前章節。不要把舊來源記錄直接提升為當前產品事實；先重新核對它的一手來源。
