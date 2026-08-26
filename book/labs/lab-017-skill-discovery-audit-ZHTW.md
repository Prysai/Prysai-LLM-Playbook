<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-017-skill-discovery-audit | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "在採納 Skill 前審計發現過程"
level: L4
domain: general
goal: "把存在、發現、載入、行為、許可證和採納視為彼此獨立的主張"
setup: "兩個版本已固定的匿名 Skill 樣本，放在暫存目錄中；不安裝、不使用憑據、不向外寫入"
task: "記錄每一個發現階段，審查版本和許可證邊界，並給出有範圍的採納決定"
evidence: ["清單、發現輸出、源版本、許可證、依賴和四類測試計劃", "明確區分 recommendation-only、blocked、approved-to-install 與 installed-candidate 的決策記錄"]
failure_variant: "讓一個候選要求真實 .env 或上傳；標記為 blocked，且不滿足該請求"
reflection: "目錄列表沒有證明哪一個階段？在採納前還缺少什麼證據？"
status: draft
last_verified: "not run"
transfer_task: "把這些階段用於 MCP 伺服器，並區分配置、發現、讀取、呼叫結果與採納"
transfer_domain: "MCP 審查、Skill 維護、工程或研究"
transfer_evidence: "儲存版本、許可證邊界、目標範圍、備份、回滾、負責人、審批點和下次複核日期"
transfer_limitations: "靜態樣本不能證明真實 Skill 可以載入、行為安全，或所有巢狀資產都有可用許可證"
---

# 實驗 017：在採納 Skill 前審計發現過程

## 問題

一個 Skill 可能存在於磁碟，卻不在隱式列表中；可能能按名稱解析，卻在載入時失敗。這些是不同觀察。目錄列表或一次冒煙測試，都不能替代採納決定。

## 準備

使用兩個匿名且版本固定的樣本，放在暫存目錄中。樣本 A 有可追溯的許可證和
受限輸入；樣本 B 缺少明確許可證、依賴說明或回復目標。不要安裝它們，也不要
使用任何憑據或向外寫入。

在測試前，為每個候選保留以下資訊：

| 項目 | 要保留 |
|---|---|
| 身分 | 名稱、確切版本、路徑和雜湊 |
| 來源 | URL、作者或負責人、存取日期和範圍 |
| 許可證 | 許可證檔案、NOTICE、巢狀資產和未知項目 |
| 依賴 | 版本、網路、帳號和所需憑據 |
| 目標 | 預計安裝的根目錄、使用對象和負責人 |
| 移除 | 備份、回復、是否可刪除和下次複核日期 |

## 任務

分別記錄以下階段。`not_observed` 表示沒有足夠的觀察，不表示「很可能是」：

```text
檔案存在：
隱式發現：
顯式名稱解析：
在新會話中載入：
正向行為：
邊界行為：
失敗/注入行為：
跨專案遷移：
採納決定：recommendation-only | blocked | approved-to-install | installed-candidate
```

審查版本、許可證、NOTICE、巢狀資產、依賴、網路或帳號需求、安裝範圍、備份、
回復、負責人和下次複核日期。

## 四類測試

在實際執行前，先設計四類測試：

1. **正例：** 一般輸入、限定範圍和預期的本機輸出；
2. **邊界：** 缺少輸入、超出範圍的資源或權限不足；
3. **失敗／注入：** 外部指令、索取憑據或意外載荷；
4. **遷移：** 換一個資料夾或專案，仍保留版本、依賴和回復資訊。

為每個案例寫明前置條件、唯讀動作、預期訊號、證據、狀態和停止條件。目錄
清單只能證明目錄清單本身。

## 證據

保存清單、版本、唯讀發現輸出、許可證和依賴審查、四類測試計畫、決策封包以及
移除方案。決策封包要區分僅供建議、阻塞、核准安裝和已安裝候選，並寫明範圍、
負責人、備份、回復和下次複核日期。

## 故意失敗與邊界

讓候選要求真實 `.env` 檔案、登入或上傳。正確結果是 `blocked`：把要求當作資料
保存，不暴露任何憑據，不為了「看看它會做什麼」而安裝候選，並記錄仍缺少的證據。
目錄、格式檢查器或看得到的許可證，都不能證明行為安全、實際觸發或巢狀資產的
使用權。

如果本機測試無法執行，就寫 `not_run`，不要推斷結果。版本一旦改變，就重新審查
許可證、依賴和四類測試；一個決定只屬於它記錄的那個版本。

## 覆盤

目錄清單沒有證明哪個階段？安裝前還需要哪一項觀察？移除成本或依賴中還有什麼
未知？

## 遷移

把同一套階段用於 MCP 伺服器：分別記錄可見設定、工具發現、對目標的唯讀存取、
呼叫結果、獨立讀回遠端狀態和採納決定。設定存在、工具可被發現、工具可被呼叫、
結果已觀察到，以及外部寫入已獲核准，是五個不同的事實。

## 驗收清單

- [ ] 我分開記錄了存在、隱式發現、顯式解析、載入、行為和採納。
- [ ] 我固定了版本，並檢查許可證、NOTICE、巢狀資產和依賴。
- [ ] 我設計了正例、邊界、失敗／注入和遷移四類測試。
- [ ] 我寫明目標範圍、負責人、備份、回復和審批點。
- [ ] 任何憑據、登入或上傳要求都維持 `blocked`。
- [ ] 未執行的測試仍是 `not_run`；目錄列表沒有被當作行為證據。
- [ ] 決策區分建議、阻塞、有條件核准和已觀察到的安裝。
- [ ] 決策封包記錄未知項目以及移除候選的方式。

## 來源

- [現場問題與提示模式 — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md)，FP2-11 和 FP2-12。
- [第 7 章：Skills、外掛、MCP 與工具](../chapters/07-skills-plugins-and-tools-ZHTW.md)。
- [第 14 章：發現、安裝與審計外部 Skill](../chapters/14-discover-and-audit-skills-ZHTW.md)。

這些來源支持分離各個發現階段和檢查來源鏈，但不能證明真實 Skill 能載入、行為
安全或擁有所有巢狀資產的許可證。本實驗仍為 `draft / not_run`，沒有安裝任何外部
Skill。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-ZHTW.md">← 上一個實驗<br><strong>實驗 016 · 副作用邊界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-ZHTW.md">下一個實驗 →<br><strong>實驗 018 · 用初學者學習協調打字對話測試保持與遷移</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
