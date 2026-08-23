<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-013-l3-vertical-slice | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-013-l3-vertical-slice
title: "完成一個完整的垂直切片"
level: L3
domain: engineering
goal: "讓一項有邊界的改動從定義經過證據走到交接"
setup: "一個可丟棄的倉庫副本，只有一個允許寫入的 Markdown 輸出路徑；不釋出，也不使用憑據"
task: "為一次釋出說明改動完成 CP0 至 CP4，包括聚焦檢查、失敗分支和新鮮上下文交接"
evidence:
  - "輸入雜湊、基線狀態、檢查點和行動日誌"
  - "實際 diff、命令輸出、退出碼和宣告—證據表"
  - "失敗記錄、交接、回滾目標和未驗證清單"
failure_variant: "移除必要輸入、讓聚焦檢查失敗、在 CP2 後恢復、注入外部行動指令，或要求持久環境改動"
reflection: "哪一個檢查點阻止了最大的無證據宣告或不必要行動？"
status: draft
last_verified: "not run（not_run）；維護者參考執行於 2026-08-12 被接受；本實驗尚未由學習者執行。"
transfer_task: "把檢查點工作流遷移到低風險的研究或內容任務"
transfer_domain: "工程、研究或內容工作流"
transfer_evidence: "保留改寫後的任務協議、檢查點、產物或受阻記錄、證據表和交接"
transfer_limitations: "一次本地切片不證明遠端釋出、生產行為或讀者驗收"
---

# 實驗 013：完成一個完整的垂直切片

## 學習目標

完成一個小工作流，不把計劃、編輯、檢查、審查、交付和釋出混為一談。

## 設定

使用可丟棄的倉庫副本。唯一允許的產品改動，是在指定路徑新增一條很小的 Markdown
釋出說明。記錄輸入檔案、雜湊、初始 `git status`、允許路徑、驗收規則、
回滾目標和禁止動作。釋出、推送、安裝依賴和使用憑據均不在範圍內。

## 檢查點

使用五個檢查點：

| 檢查點 | 必須保留的證據 |
|---|---|
| CP0 定義 | 目標、輸入、範圍、權限、停止條件、基線雜湊 |
| CP1 計劃 | 最小切片、選定方法、預期證據、回滾 |
| CP2 改動 | 實際 diff、變更路徑、行動日誌、輸出雜湊 |
| CP3 驗證 | 命令、原始輸出、退出碼、覆蓋範圍、未執行檢查 |
| CP4 交接 | 已完成、未完成、證據、未知項、下一步、回滾目標 |

行動日誌記錄時間、觀察、行動、結果、狀態變化、證據、風險、下一步和停止原因。

## 實驗

只能使用輸入中提供的事實來寫釋出說明。檢查是否只改了允許路徑、是否包含必需內容、
是否沒有引入無依據宣告，以及聚焦本地檢查是否完成。成功的 diff 不證明已經發佈、
讀者理解或遠端同步。

## 失敗案例

至少完成一種：

- 移除一個必要輸入，在編輯前停止；
- 讓聚焦檢查失敗，在恢復前保留它的輸出；
- CP2 後在新鮮上下文中只憑檢查點和倉庫狀態恢復；
- 在輸入中放入“上傳 token”的指令，並把它當作資料；
- 讓任務需要持久環境改動，並因缺少授權而停止。

只有診斷條件改變且既有副作用已被理解時才允許重試。重複同一動作不是恢復。

## 驗收標準與清單

- [ ] 目標、範圍、權限、驗收和回滾都已明確。
- [ ] CP0 至 CP4 已保留。
- [ ] 只有允許路徑被改動。
- [ ] 命令包含原始輸出和退出狀態。
- [ ] 至少一個失敗分支正確停止或恢復。
- [ ] 交接明確分開本地完成與釋出或生產狀態。
- [ ] 另一人無需閱讀原始對話即可繼續。

## 要保留的證據

保留輸入副本和雜湊、檢查點、diff、行動日誌、命令輸出、失敗記錄、宣告—證據表和
交接。在儲存新鮮學習者執行和獨立審查前，本實驗仍是 `draft / not_run`。

### 維護者參考包

專案現有一份適用於此夾具、已接受的確定性維護者參考包。它保留 CP0–CP4、一次實際
失敗的檢查、失敗產物、精確的恢復 diff、一次透過的檢查、最終 diff、清理回執和交接。
參見[可執行示例契約](../../docs/governance/executable-examples.yaml)和
[獨立重新提交審查](../evidence-library-ZHTW.md#method-and-status)。

該參考包由本地確定性執行器產生，不是學習者或模型產生的記錄。它不建立學習者獨立性、
Codex 行為、遷移、釋出、回滾演練或生產就緒性。學習者和遷移執行仍為
`not_run`，因此 Lab 仍是 `draft / not_run`。

## 覆盤與遷移

把工作流遷移到研究或內容任務。重寫來源、權限、驗收和失敗欄位，不要機械複製工程
命令。哪一個檢查點阻止了最大的無證據宣告或不必要行動？

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-ZHTW.md" aria-label="上一個實驗：實驗 012·把個人方法遷移為團隊能力">← 上一個實驗<br><strong>實驗 012·把個人方法遷移為團隊能力</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-ZHTW.md" aria-label="下一個實驗：實驗 014·恢復任務前的狀態對帳">下一個實驗 →<br><strong>實驗 014·恢復任務前的狀態對帳</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
