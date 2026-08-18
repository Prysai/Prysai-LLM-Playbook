<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-017-skill-discovery-audit | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "在採納 Skill 前審計發現過程"
level: L4
domain: general
goal: "把存在、發現、載入、行為、許可證和採納視為彼此獨立的主張"
setup: "兩個版本已固定的匿名 Skill 樣本，放在可丟棄目錄中；不安裝、不使用憑據、不向外寫入"
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

## 準備與任務

使用兩個匿名且版本固定的樣本。樣本 A 有可追溯許可證和受限輸入；樣本 B 缺少明確許可證、依賴說明或回滾目標。不要安裝它們，也不要使用任何憑據。逐項記錄：

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

任何未觀察到的內容都寫為 `not_observed`。審查版本、許可證、NOTICE、巢狀資產、依賴、網路或賬號需求、安裝範圍、備份、回滾、負責人和下次複核日期。

## 失敗、遷移與驗收

讓候選請求真實 `.env` 或上傳內容。正確結果是 `blocked`；不要為了演示“成功”而滿足請求。保留清單、決策包、只讀發現輸出，以及正例、邊界、失敗/注入和遷移的測試計劃。

- [ ] 我分開記錄了存在、發現、載入、行為和採納。
- [ ] 我固定了版本，並審查了許可證邊界。
- [ ] 我為正例、邊界、失敗/注入和遷移設計了測試。
- [ ] 我寫明瞭目標範圍、備份、回滾、負責人和審批點。
- [ ] 我沒有透過安裝或上傳來偽造成功。

遷移到 MCP 時，分別記錄可見配置、工具發現、對目標的只讀訪問、呼叫結果、外部讀回和採納。本實驗仍為 `draft / not_run`；樣本不證明真實 Skill 的安全性或完整許可證。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-ZHTW.md">← 上一個實驗<br><strong>實驗 016 · 副作用邊界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-ZHTW.md">下一個實驗 →<br><strong>實驗 018 · 旅行打字對話的保持與遷移</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
