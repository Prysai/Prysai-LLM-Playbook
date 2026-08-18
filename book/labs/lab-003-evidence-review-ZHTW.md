<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-003-evidence-review | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-003-evidence-review
title: "審計一條完成宣告"
level: L3
domain: general
goal: "區分宣告、直接證據、推斷與缺失驗證"
setup: "三份脫敏交付摘要；答案要點保留在學習者上下文之外"
task: "為每一條實質宣告對映範圍、所需證據、實際證據、狀態和最小下一項檢查"
evidence:
  - "三份固定輸入摘要和答案要點"
  - "一張完成的宣告—證據表"
  - "審查筆記和明確的未驗證清單"
failure_variant: "插入沒有支撐的“全部測試透過”宣告，以及由一次瀏覽器檢查支撐的“所有裝置”宣告"
reflection: "哪些證據證明存在、正確或就緒？寫出範圍後，哪一條宣告變弱了？"
status: draft
last_verified: "Not run"
transfer_task: "將審計表應用於一項小型工程、研究或釋出交付"
transfer_domain: "工程、研究或內容交付"
transfer_evidence: "保留有範圍的宣告、直接證據、缺口、審查筆記和最終狀態"
transfer_limitations: "靜態審計不能證明被引用產物在檢查範圍外真實或完整"
---

# 實驗 003：審計一條完成宣告

## 學習目標

不依賴語氣、自信或視覺包裝，判斷結果是否真的完成。

## 設定

準備三份脫敏交付摘要：一份有直接證據支援，一份部分完成卻描述為結束，
一份沒有驗證記錄卻經過漂亮包裝。答案要點必須保留在學習者上下文之外。

允許動作只有只讀檢查和請求更窄的證據。不要編輯摘要、編造缺失輸出、聯絡外部服務，
或使用生產日誌。

## 任務與實驗

為每一條實質宣告記錄：

| 宣告 | 範圍 | 所需證據 | 找到的證據 | 狀態 | 最小下一項檢查 |
|---|---|---|---|---|---|
| 示例 | 檔案、環境、版本、日期 | diff 和聚焦檢查 | 精確路徑或 none | verified / partial / inferred / blocked / unknown | 一項有界動作 |

分別回答：

1. 產物存在嗎？
2. 產物在宣告範圍內正確嗎？
3. 它已可供目標讀者或環境使用嗎？

三個問題需要獨立證據。diff 證明改動，不證明正確；透過的單元測試證明覆蓋到的行為，
不證明部署或使用者驗收。

## 失敗案例

插入“全部測試透過”這句話，卻沒有命令輸出、測試名稱、日期、環境或退出碼。正確響應是
降低宣告狀態並請求證據；不要從自信措辭推斷真的跑過。

再用一次瀏覽器檢查來支撐“在每臺裝置都能用”。你必須縮小宣告，或要求更多裝置證據。

## 驗收標準與清單

- [ ] 每個重要宣告都有明確範圍。
- [ ] 直接證據與推斷在不同列。
- [ ] 無證據宣告沒有被標為 verified。
- [ ] 下一項檢查小於重跑整個專案。
- [ ] 已排除秘密、客戶資料與私有日誌。
- [ ] 最終交接列出了仍未驗證的內容。

## 要保留的證據

保留三份輸入摘要、完成的審計表、答案要點比較、審查筆記和最終狀態。學習者執行和獨立
審查被記錄前，此實驗仍是 draft / not_run。

## 覆盤與遷移

把表格應用到一項小型工程交付、研究結論或釋出草稿。哪些證據證明存在、正確和就緒？
把範圍寫精確後，哪一條宣告變弱了？

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-ZHTW.md" aria-label="上一個實驗：實驗 002·把一個願望變成任務協議">← 上一個實驗<br><strong>實驗 002·任務協議</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-004-skill-selection-ZHTW.md" aria-label="下一個實驗：實驗 004·選擇最小有用能力">下一個實驗 →<br><strong>實驗 004·選擇最小有用能力</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
