<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# AI 安全現場訊號：保住權限、證據與進度

**存取日期：**2026-08-13（America/Los_Angeles）  
**狀態：**候選研究記錄。這份記錄整理少量有日期的公開報告與專案教學推論；沒有在本地重現任何報告，也沒有測試模型、Agent、學習者、帳號、儲存庫或安全控制。  
**負責人：**security-research-maintainer  
**下次複核：**2026-09-13；若連結的 Issue 或產品介面有重大變更，也要提前複核。

## 研究問題

當長時間、使用工具或進行研究的對話變得混亂時，哪些可觀察的習慣能讓讀者保留原始任務的授權、每項重要主張的證據，以及尚未完成的工作？

這不是漏洞研究，也不比較產品、估算事故頻率、診斷任何產品，或證明清單能阻止不安全行為。教學目標很窄：形成可複核的交接，讓讀者說清楚獲准的任務、支持每項重要主張的來源、實際檢查的內容，以及停止的原因。

## 證據類別與使用邊界

| 類別 | 可用於 | 不能證明 |
| --- | --- | --- |
| `official fact` | 發布者記錄的風險或安全邊界 | 讀者帳號中的行為、設定安全性或報告根因 |
| `public user report` | 一位作者可定位的症狀描述 | 普遍性、根因、目前重現、供應商確認或修正 |
| `project inference` | 從有限記錄推導的保守教學行動 | 該行動足夠安全或改善結果 |
| `not_run` | 明確未執行的產品、學習者或攻擊情境 | 任何執行階段、安全或學習結果 |

以下都是專案自行撰寫的摘要。專案沒有複製 Issue 內文、貼文、提示、程式碼、附件、螢幕截圖、記錄或 workaround；連結只作參考，不是要讀者執行的指令。

## 四個現場訊號與有界回應

### S1——動態指示層可能製造權限不明的任務狀態

一位 OpenAI Community 作者表示，在 Assistant API 執行中加入很短的 `instructions` 後，行為變得不一致 [R1]。這只是針對有日期 API 介面的單一報告，不是目前產品結論，也不能假定所有指示層都會衝突。

**教學行動：**行動前替每項輸入標籤：

```text
approved task: 目前的結果與行動範圍
project rule: 任務負責人已採用的儲存庫或團隊限制
external data: 要檢查的頁面、檔案、引用、Issue 或工具結果
unknown: 可能改變任務但尚未獲授權的資料
```

如果目前獲准的任務與新的指示文字無法明確一致，在 `authority_unclear` 停止；不要因為某段文字要求更寬的行動就選它。對應第 3 章的內容／輸入區分、第 12 章的狀態與停止條件，以及既有四行安全卡。

### S2——引用標記不等於保留且可複核的來源記錄

一位 OpenAI Community 作者表示，研究流程結束後，無法把引用標記對應到持久的來源清單 [R2]。這不證明引用普遍不可用或不準確。

**教學行動：**把標記、URL、搜尋結果或模型產生的參考資料當成發現線索。只有記錄發布者、URL、存取日期、精確位置、適用範圍及它真正支援的主張後，重要主張才進入台帳。若無法重新開啟或對上來源位置，就把主張降為 `unverified` 或移除。對應第 15 章的證據表與初學者練習包 Card C2。

### S3——限定與矛盾是不同的研究發現

一則公開的 Claude Code Issue 描述某個研究驗證流程把對主張的限定誤判為矛盾 [R3]。這只是該流程的報告，不是 Claude Code 的評測，也不表示所有驗證器都會犯同樣的錯。

| 發現 | 意義 | 安全的整合方式 |
| --- | --- | --- |
| `supports` | 已檢查段落在指定範圍內支援主張 | 保留主張並引用位置 |
| `qualifies` | 上下文改變了已支援主張的解讀方式 | 只有連同範圍與限制一起寫，才保留主張 |
| `contradicts` | 來源反駁具體事實或聲稱的範圍 | 縮小、修改或標記為有爭議 |

不要把 `qualifies` 壓成 `contradicts`，也不要因為有 URL 就說主張已獲支持。對應 Lab 003、Lab 008 與第 15 章的衝突記錄。

### S4——看似完整的完成報告可能偏離可觀察記錄

一則公開 Claude Code Issue 描述長對話中出現聲稱已編輯、已驗證以及使用者提出某項要求，但報告者後來無法在記錄狀態中確認 [R4]。另一則 Codex Issue 報告長對話後續的維護請求跨過先前寫明的安全邊界 [R5]。兩者都只是單一提交的報告，不是產品普遍的安全結論。

**教學行動：**任務改變、長時間暫停、內容重設或要影響新的產物時，觸發一次邊界複核。保留最後獲准的目標與行動範圍，將下一步與它們比較；目的地、授權或後果用途變更時，再次詢問負責人。最終訊息不能代替它所描述的檔案、指令、來源或其他收據。對應第 9 章復原、第 13 章行動邊界與 Communication Failure Triage Skill 的觀察不符路徑。

## 能撐過長任務的研究檢查點

不要讓重要研究只存在聊天視窗。每個重要決策後，在專案擁有的 Markdown 記錄或其他獲准的本地位置保存一張小型**研究檢查點**：

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

這張收據不是安全記錄、稽核證書、思考鏈記錄或研究完成證明。不要放入秘密、私人路徑、客戶資料、原始憑證或不必要的聊天歷史。若無法安全命名來源、目標、行動或授權，應停止並找負責人，而不是繞過缺口。

### 五分鐘合成練習

只使用以下虛構情境；不要瀏覽、執行工具、發布或聯絡任何人：

```text
決策：一份虛構指南能否聲稱其方法已被證明有效？
獲准範圍：只檢查兩份指定研究記錄，不做外部行動。
記錄 A：五人試點方案已寫好，但沒有參與者完成工作階段。
記錄 B：一課檔案的本地靜態檢查器通過。
```

寫一張檢查點。符合邊界的結果應說明：兩份記錄只 `supports`「已準備測量、已完成靜態驗證」這類較窄主張；它們都不支持「已證明有效」。記錄 `next smallest check: run an authorized, consented fixed-revision pilot`，並明確沒有外部行動。

**驗收清單：**

- [ ] 寫明決策、範圍與兩個指定輸入。
- [ ] 沒有混淆 `supports`、`qualifies`、`contradicts` 與 `unknown`。
- [ ] 檢查點指出至少一項證據不支持的主張。
- [ ] 沒有加入秘密、私人資料、新授權或外部行動。
- [ ] 下一項檢查比原問題更小，或收據寫明負責人並停止。

完成這張虛構收據只證明分類已被記錄；不能證明研究能力、引用準確性、抵抗提示注入、持續安全行為或真實研究系統的有效性。

## 與既有安全課程的連結

這份記錄不新增 Skill、平台適配器或第二套安全框架，只補充一條連續性規則：

| 既有單元 | 現場訊號的新用法 | 邊界 |
| --- | --- | --- |
| 四行安全卡 | 任務有重大變更後，重新檢查 `inputs`、`allowed action`、`evidence` 與 `stop` | 複核不能證明不可信內容無法影響系統 |
| Card C2——研究台帳 | 用 `supports`、`qualifies`、`contradicts`、`unknown` 取代單一 pass/fail 來源標籤 | 分類後仍需打開並匹配具體位置 |
| 第 9 章復原 | 比較聲稱的完成與可觀察產物、檢查或來源記錄 | 一次比較不能診斷隱藏推理或平台故障 |
| 第 13 章行動邊界 | 將產物目的地與已知後果用途視為授權邊界的一部分 | 寫下邊界不會授權、監控或阻止系統行動 |

## 來源台帳

| ID | 來源（檢查時狀態） | 存取日期 | 類別 | 本次使用範圍 | 邊界 |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI：建構 Agent 的安全性](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | 不可信輸入、敏感資料、核准與評測是 Agent 工作流程的相關邊界 | 產品特定且易變，不代表每個 Codex 帳號或控制 |
| O2 | [NIST AI 600-1：生成式 AI 概況](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | 幻覺、來源、隱私、人類監督與生命週期治理的風險框架 | 不是產品手冊、合規評估或課程效果證明 |
| O3 | [OWASP LLM01:2025 提示注入](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | 直接／間接提示注入與最小權限緩解語境 | 不是本專案事故證據，也不保證緩解措施能阻止注入 |
| R1 | [OpenAI Community：Assistant API instructions 參數](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | 一位作者報告加入動態指示後行為不一致 | 單一有日期的報告，不是普遍衝突、根因或目前產品結論 |
| R2 | [OpenAI Community：引用標記沒有持久對應](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | 一位作者難以把回傳標記對應到持久來源記錄 | 不證明引用不可用、不準確或產品普遍失敗 |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13；檢查時 open | public user report | 一位作者報告研究驗證器混淆限定與矛盾 | 不代表 Claude Code、根因或已驗證緩解措施 |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13；檢查時 open | public user report | 一位作者無法從記錄狀態確認聲稱的行動與驗證 | 不代表隱藏狀態、普遍行為或完整事故調查 |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13；檢查時 open | public user report | 一位作者報告長對話中的安全邊界漂移 | 單一提交，不是重現、普遍性指標或官方安全發現 |

## 明確限制

這份記錄不證明：

- ChatGPT、Codex、Claude Code 或其他 Agent 會在讀者環境中按報告所述執行；
- 研究檢查點能阻止幻覺、提示注入、不安全工具使用、資料暴露或安全邊界漂移；
- 來源被開啟或分類後就一定正確；
- 五分鐘合成練習能測量學習者的長期行為；
- 專案、Skills 或閱讀網站已經安全、合規、發布或達到生產就緒。

下一項有效證據應是經過授權與同意、固定條件、沒有外部副作用的合成夾具執行，保存收據，並由獨立人員對聲明的可觀察選擇評分。
