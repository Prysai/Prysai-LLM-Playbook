<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: reader-evidence-library | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | source_revision: 2026-09-09-platform-encyclopedia-evidence-v1 -->

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

<a id="platform-encyclopedia-sources"></a>

## 平台與用戶端百科的具體來源

以下記錄分別支援平台事實、時效文章和路線維護。連結會前往技術記錄全文；日期和界線不能只從產品名稱推斷。

<a id="grok-bot-field-note"></a>

### Grok Bot 現場筆記

- **來源記錄：** [Grok Bot：從聊天走向可稽核的持續工作流程](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md)
- **存取日期：** 2026-09-08；內容記錄的原始日期為 2026-09-02。
- **適用範圍：** xAI/SpaceXAI 官方頁面所描述的 Grok Bot 雲端工作面、Bot、連接器、Skill、例程、協作和核准界線，以及一項經匿名化的使用者需求訊號。
- **未驗證界線：** 不證明帳戶、方案、地區或裝置資格，不證明安裝、執行可靠性、完整稽核、效率、學習成果或生產可用性；使用者分享的經歷不是代表性研究。
- **下一次複核：** 2026-10-08；官方來源、產品 rollout、使用者報告或範圍發生變化時提前複核。

<a id="deepseek-harness-source-receipt"></a>

### DeepSeek Harness 來源回執

- **來源記錄：** [DeepSeek Harness 官方來源百科核對](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/encyclopedia-deepseek-harness-sources-2026-09-03.md)
- **存取日期：** 2026-09-03；npm registry 元資料於 2026-09-08 再次核對。
- **適用範圍：** DeepSeek 官方儲存庫、README、CLI/profile 文件、原始碼 checkout 條件、Web UI 入口和 npm registry 元資料；包括 developer preview、`dsh` 與 Windows/macOS 證據界線。
- **未驗證界線：** 沒有執行 `npx`、原始碼建置、Web UI、CLI、TUI、外掛或 API key 設定；不證明安裝成功、跨平台等價、沙箱有效、安全稽核或生產就緒。
- **下一次複核：** 2026-10-03；安裝、profile、Web UI、平台或安全文件變化時提前複核。

<a id="unified-platform-source-receipt"></a>

### 統一平台來源回執

- **來源記錄：** [平台與用戶端百科統一來源回執](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/platform-encyclopedia-sources-2026-09-05.md)
- **存取日期：** 2026-09-05；選定的官方頁面和 npm registry 元資料於 2026-09-08 再次核對。
- **適用範圍：** Grok/Grok Bot、Codex、Claude Code、Google Cloud Code、DeepSeek Harness，以及 ChatGPT/Gemini 用戶端分類的官方入口、平台和產品名稱。
- **未驗證界線：** 頁面存在、命令記錄或 registry 元資料不等於下載、安裝、登入、帳戶資格、執行時相容性、任務正確性、安全性或生產就緒。
- **下一次複核：** 2026-10-08；廠商改變用戶端、安裝方式、平台、方案或可用性時提前複核。

<a id="platform-encyclopedia-independent-review-2026-09-08"></a>

### 2026-09-08 獨立複核

- **來源記錄：** [平台與用戶端百科官方來源獨立複核報告](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/platform-encyclopedia-sources-2026-09-08-review.md)
- **存取日期：** 2026-09-08。
- **適用範圍：** 重新開啟 Grok Bot、Codex、Claude Code、Google Cloud Code、DeepSeek Harness 以及 Node.js、Git、Homebrew 官方入口，核對產品名稱、安裝路線、版本欄位和來源界線。
- **未驗證界線：** 未執行安裝程式、npm/npx 套件或外掛，未登入，未建立雲端資源，未驗證本機權限、跨平台執行、任務結果或帳戶資格。
- **下一次複核：** 2026-10-08；產品更名、入口改變、Windows/macOS 支援改變、npm latest 或安全/核准說明變化時提前複核。

<a id="google-cloud-code-source-receipt"></a>

### Google Cloud Code 來源回執

- **來源記錄：** [Google Cloud Code 官方來源回執](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/encyclopedia-cloud-code-sources-2026-09-04.md)
- **存取日期：** 2026-09-04。
- **適用範圍：** Google Cloud Code 的 VS Code、IntelliJ/JetBrains 和 Cloud Shell 路徑，以及它與 Gemini Code Assist、Claude Code、Codex Cloud 的名稱界線。
- **未驗證界線：** 未安裝 IDE 擴充功能，未登入 Google 帳戶，未選取雲端專案，未檢查憑證、配額、部署或 Cloud Shell 權限。
- **下一次複核：** 2026-10-04；Google 改變 IDE、Cloud Shell、擴充功能安裝或相關產品界線時提前複核。

<a id="timely-content-policy"></a>

### 時效內容政策

- **維護記錄：** [時效內容政策](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/governance/timely-content-policy.md)
- **適用範圍：** 規定如何把快速變化的產品、發佈或公共話題寫成有日期的候選 field note，要求記錄問題、範圍、來源、授權界線、事實狀態、語言狀態、Reader 投影和回滾路徑。
- **未驗證界線：** 這是一套專案維護規則，不是任何廠商功能、帳戶可用性、使用者成果或安全性的來源。
- **下一次複核：** 依 `update-registry.yaml` 的 timely-content 記錄執行，目前登記的下一次複核為 2026-10-08；來源變化或出現爭議時提前複核。

<a id="timely-content-template"></a>

### 時效內容範本

- **維護範本：** [時效內容記錄範本](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/templates/timely-content.md)
- **適用範圍：** 為每一篇候選時效文章收集 content ID、讀者問題、為什麼現在值得寫、來源與 claim ledger、低風險動作、失敗界線、翻譯狀態、生成投影和回滾資訊。
- **未驗證界線：** 填妥範本不等於來源已核實、功能已安裝、任務已執行或文章已達到 `verified`；新的 Reader-facing brief 預設仍是 `candidate`。
- **下一次複核：** 隨 timely-content 維護規則和對應記錄的 `next_review` 更新；目前關聯記錄為 2026-10-08。

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
