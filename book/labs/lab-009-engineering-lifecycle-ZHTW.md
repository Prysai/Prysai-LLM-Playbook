<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-009-engineering-lifecycle | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-009-engineering-lifecycle
title: "比較直接實施與完整工程生命週期"
level: L3
domain: engineering
goal: "在不把小型基準測試偽裝成普遍結論的前提下，觀察定義、規劃、驗證、審查和交付在哪些環節減少返工"
setup: "一個可隨時丟棄的本地倉庫、三個凍結的低風險任務、一個基線版本、固定工具，且不觸及生產環境或外部副作用"
task: "讓同一組三個任務分別走直接工作流和生命週期工作流，保留初次嘗試，標記條件漂移，並比較證據品質與返工情況"
evidence:
  - "凍結任務夾具、輸入雜湊、基線版本、環境、模型、工具、權限和執行順序"
  - "六次執行的原始輸出、差異、檢查結果、事件時間戳、首次透過狀態、返工、耗時和錯誤類別"
  - "明確標記條件漂移為 not_comparable 的比較，以及最有價值檢查點的說明"
failure_variant: "引入一次超時、權限阻斷、輸入變更、工具版本漂移或未知副作用，並在不重寫初始記錄的前提下完成核對"
reflection: "哪項定義或檢查點避免了返工？哪項比較已經無效？證據是否足以支援擴大評估？"
status: draft
last_verified: "not run"
transfer_task: "把生命週期檢查點遷移到另一項可逆的工程任務或資料轉換任務"
transfer_domain: "軟體工程、資料處理或自動化維護"
transfer_evidence: "保留基線、執行記錄、差異、檢查結果、審查發現、交付說明、未知項和回滾點"
transfer_limitations: "三個小任務不能建立通用的成本、品質或模型排名結論；本地檢查也不能證明部署或使用者驗收"
---

# 實驗 009：比較直接實施與完整工程生命週期

## 學習目標

檢驗一個很窄的問題：在同一套受控條件下，清楚的定義、規劃、驗證、審查和交付，是否能改進三個固定任務的結果。這是一次工程冒煙測試，不是排行榜。

## 準備

建立一個可丟棄的倉庫，並提交一個基線版本。凍結三個小任務及其驗收檢查。兩種工作流必須使用相同的環境、模型、工具、權限、網路條件和時間預算。若變更模型，就保持工作流不變；若變更工作流，就保持模型不變。

候選方案 A 只拿到凍結的目標、輸入和驗收規則。候選方案 B 使用書面的任務協議，並經過 `define`、`plan`、`build`、`verify`、`review` 和 `deliver` 階段。每個任務開始前都恢復基線。預先固定執行順序，並把順序偏差寫進限制。

## 任務與實驗

使用三個無害的夾具：

1. 從一份簡短的合成交付記錄中提取三個指定欄位；
2. 將記錄渲染為 Markdown，並區分已完成工作和未驗證工作；
3. 審查這句沒有證據的斷言：“程式碼存在且能構建，因此功能已經驗證。”

先讓 A 完成全部任務，再讓 B 完成全部任務。每次執行最多允許一次受控返工。即使返工成功，也必須保留第一次結果。

至少記錄：

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

不要估算缺失的時間或成本，使用 `unavailable`。返工後的透過不等於首次透過。

## 沒有工程背景也能做的最小版本

不必從一個真正的網站或複雜程式碼庫開始。新建一個臨時檔案 `status.md`，只放下面三行合成文字：

```text
構建檢查：退出碼 0
移動端檢查：已完成
使用者驗收：尚未執行
```

讓 A 只收到“把這段內容整理成完成狀態”。讓 B 收到同一內容，再加上：**“只能修改 `status.md`；保留未知項；先列出計劃；完成後檢查是否仍有三行；不要把使用者驗收寫成已完成。”** 兩者都不聯網、不提交、不改其他檔案。

比較的不是誰寫得漂亮，而是：有沒有保留“尚未執行”、有沒有說明實際修改、有沒有給出可檢查的結果。若 B 更清楚，也只能說明這一個協議在這一份合成文字上值得繼續試；它不證明任何模型、團隊或真實工程專案因此更高效。

## 要保留的證據

保留六份初始輸出、所有受控返工作為新的嘗試、全部差異、命令、退出碼、檢查輸出、審查筆記、交付摘要，以及一張 2×3 的比較表。明確說明這次冒煙測試支援 `expand`、`do_not_expand` 還是 `insufficient_evidence`。

## 失敗案例

讓其中一次執行遇到超時閾值、權限阻斷、輸入雜湊變化、工具版本變化，或本地模擬的未知寫入結果。重試前記錄最後一個已確認事件並檢查目標；保留被中斷的嘗試。只要凍結條件改變，就將比較標為 `not_comparable`。之後的成功不能追溯修復可比性。

## 驗收標準

- [ ] 兩種工作流使用了同一組凍結任務，並在每次執行前恢復基線。
- [ ] 六次初始嘗試和所有返工都能被分別檢查。
- [ ] 首次透過、耗時、返工、錯誤類別和驗證均使用實際值。
- [ ] 至少一個失敗分支如實記錄了核對結果或 `not_comparable`。
- [ ] 構建成功沒有被表述為執行時、部署或使用者驗證。
- [ ] 結論嚴格停留在三個任務的冒煙測試範圍內。

## 覆盤與遷移

哪個生命週期階段最早發現了有後果的問題？哪個階段增加了流程卻沒有改變結果？把真正有用的檢查點遷移到另一項可逆任務，並說明那項任務為何可比或不可比。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-008-research-question-ZHTW.md" aria-label="上一個實驗：實驗 008 · 把一個大話題收窄為可回答的研究問題">← 上一個<br><strong>實驗 008 · 把一個大話題收窄為可回答的研究問題</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-010-product-context-ZHTW.md" aria-label="下一個實驗：實驗 010 · 建立可跨兩個任務複用的產品上下文">下一個 →<br><strong>實驗 010 · 建立可跨兩個任務複用的產品上下文</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
