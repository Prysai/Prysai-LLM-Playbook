<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-014-resume-reconciliation | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

---
id: lab-014-resume-reconciliation
title: "繼續之前，先核對恢復的任務"
level: L3
domain: general
goal: "繼續工作前，核對任務指標、目標、分支、權限和副作用狀態"
setup: "帶檢查點和兩個文字檔案的可丟棄本地資料夾或倉庫；不使用憑據、網路、生產檔案或不可逆命令"
task: "記錄實時狀態，與檢查點比較，分類每個欄位；只有目標、權限和副作用狀態一致時才繼續"
evidence:
  - "檢查點、實時觀察、命令、輸出、差異、分類表和繼續決策"
  - "對 matched、changed 和 not_observed 欄位的清楚記錄"
failure_variant: "讓任務名稱相同但倉庫根目錄或目標檔案不同；編輯前停止並找出第一個未核對欄位"
reflection: "哪個欄位最容易被想當然？哪條觀察改變了繼續或停止的決定？"
status: draft
last_verified: "not run"
transfer_task: "將此核對邊界用於瀏覽器或 MCP 會話，但不做遠端寫入"
transfer_domain: "瀏覽器操作、研究、工程或內容交接"
transfer_evidence: "儲存此前請求、目標、批准狀態、已觀察到的遠端狀態風險和新的檢查點"
transfer_limitations: "可丟棄夾具不能證明真實帳戶、遠端資源或已恢復的生產任務具有連續性"
---

# 實驗 014：繼續之前，先核對恢復的任務

**狀態：** `draft` · **執行狀態：** `not_run`

## 為什麼要做這個實驗

公開的現場報告顯示，Agent 會在上下文壓縮、容量中斷或恢復後回到較早的任務。新的提示詞會讓會話看起來仍在工作，但任務指標、工作樹或副作用狀態可能已經不確定。本實驗練習的是：先核對，再繼續。

## 準備

使用一份小倉庫的可丟棄副本，或一個含兩個文字檔案的資料夾。建立一個檢查點，寫明目標、目標路徑、分支、最後完成的動作、待做動作、權限狀態和證據。透過啟動第二個任務或用舊副本替換檢查點來模擬中斷。不要使用憑據、網路、生產檔案或不可逆命令。

## 任務

1. 記錄當前工作目錄、倉庫根目錄、分支、目標檔案、檔案雜湊或修改時間，以及當前差異。
2. 將這些觀察與檢查點逐項比較。
3. 將每一項分類為 `matched`、`changed` 或 `not_observed`。
4. 只有在目標、權限和副作用狀態都已核對時才繼續；否則建立新的檢查點並停止。

## 證據

儲存檢查點、命令和輸出、差異、分類表以及簡短的決策。一次成功的練習記錄只能證明你在可丟棄夾具中遵循了核對流程。

## 失敗變體

讓可見任務名稱匹配，但倉庫根目錄或目標檔案不同。正確結果是在編輯前停止，並指出第一個未核對欄位。不要僅因錯誤的檢出目錄可寫，就在其中“修復”它。

## 遷移

將同樣的邊界用於瀏覽器或 MCP 會話：確認最後一個已證實的請求、目標帳戶或資源、批准狀態，以及前一次呼叫是否可能改變遠端狀態。

## 驗收清單

- [ ] 我記錄了實際路徑、倉庫、分支、目標和差異。
- [ ] 我將實時狀態與命名檢查點進行了比較。
- [ ] 我把已改變與未觀察分開記錄。
- [ ] 當目標或副作用狀態不確定時，我停止了。
- [ ] 我沒有把一條恢復提示當作連續性的證明。

## 覆盤

寫下哪個欄位最容易被假定、哪條觀察改變了決策，以及哪些內容仍是 `not_observed`。

## 來源

- [現場問題與提示模式 — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md)，FP2-01 至 FP2-04 和 FP2-08。
- [第 10 章：規劃與垂直切片](../chapters/10-planning-and-slicing-ZHTW.md)。
- [第 12 章：Agent 迴圈、狀態與停止條件](../chapters/12-agent-loop-and-stop-ZHTW.md)。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-ZHTW.md" aria-label="上一個實驗：實驗 013 · 完成一個完整縱向切片">← 上一個<br><strong>實驗 013 · 完成一個完整縱向切片</strong></a></td>
    <td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-ZHTW.md" aria-label="下一個實驗：實驗 015 · 交付證據，而不只是一句完成宣告">下一個 →<br><strong>實驗 015 · 交付證據，而不只是一句完成宣告</strong></a></td>
  </tr></table>
</nav>
<!-- lab-navigation:end -->
