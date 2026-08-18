<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-005-design-a-skill | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-005-design-a-skill
title: "把重複方法沉澱為邊界明確的 Skill"
level: L4
domain: general
goal: "判斷重複工作流是否值得成為 Skill，並測試該 Skill 是否收窄工作範圍，而非在所有場景觸發"
setup: "至少完成過兩次的低風險工作流、單獨的練習目錄、四個已脫敏的夾具，以及官方 Skill 驗證器"
task: "提取穩定決策，編寫最小有用 Skill，測試正例、邊界、失敗和遷移場景；不安裝該 Skill，只給出採用決定"
evidence:
  - "源工作流記錄，以及穩定決策與偶發細節的對照表"
  - "候選 Skill、來源和許可證記錄、驗證器輸出，以及四份行為測試記錄"
  - "包含負責人、許可權邊界、回滾、未解決風險和建議的 skill-adoption-decision.md"
failure_variant: "硬編碼專案專有細節，或加入許可證不明確的材料，並確認採用決定因此受阻"
reflection: "哪些決策穩定到可以編碼？哪些仍應保留在專案上下文中？Skill 是否減少遺漏，而沒有擴大觸發範圍？"
status: draft
last_verified: "not run"
transfer_task: "把同一提取和行為測試方法應用到另一個領域的重複工作流"
transfer_domain: "研究、工程、營銷或內容審查"
transfer_evidence: "保留工作流對照、候選修訂、驗證器結果、四項行為測試和採用決定"
transfer_limitations: "結構驗證和一次新鮮上下文試用不能證明生產可靠性、團隊採納、長期維護或許可證批准"
---

# 實驗 005：把重複方法沉澱為邊界明確的 Skill

## 學習目標

只有當重複工作具有穩定的決策模式時，才把它做成可複用的指令包。Skill 不是存放某一次成功答案的地方，不是專案專用清單，也不應塞進某個領域的全部事實。

## 設定

選擇一項至少已經完成兩次的無害工作流，並保留這兩次執行記錄。使用已脫敏的輸入，並在可被發現的 Skill 根目錄之外建立練習目錄。不要使用憑據、生產資料、未公開的客戶材料，或複用條款不清楚的外部來源。

建立 `extraction.md`，包含四列：

| 觀察到的步驟 | 穩定決策 | 專案專有細節 | 兩次執行中的證據 |
|---|---|---|---|

只有穩定決策才是 Skill 候選內容。檔名、客戶細節、臨時繞過方案和一次性的目標，應留在專案上下文中。

## 任務與實驗

編寫一個最小候選 Skill，其中包含：

- 足夠精確的描述：遇到相關請求會觸發，鄰近但不適用的請求會讓出；
- 輸入、允許的動作、許可權限制、秘密處理、輸出和驗收標準；
- 簡短的核心工作流；只有在條件滿足時才需要的細節，應放入引用或指令碼；
- 一個正例、一個邊界例和一個失敗例；
- 來源、許可證、負責人、版本和下次審查資訊。

執行官方驗證器。隨後開啟一個新鮮上下文，測試四個固定夾具：正例、邊界、失敗和跨領域遷移。記錄候選項是否被發現、載入、選擇、遵循和經過行為驗證。這是五種不同狀態；其中任何一種都不能證明下一種。

最後完成 `skill-adoption-decision.md`：

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

本實驗止於採用建議。安裝會改變共享狀態，必須另行獲得授權。

## 要保留的證據

保留兩份源工作流記錄、`extraction.md`、完整候選目錄、其修訂或雜湊、驗證器輸出、全部四個夾具的輸入與輸出、新鮮上下文筆記和採用決定。失敗測試應如實保留為失敗測試，不要用後來的修正執行覆蓋它。

## 失敗案例

先硬編碼一個真實專案檔名或客戶專用規則。執行遷移夾具，確認候選項要麼誤觸發，要麼給出無關指令。刪除偶發細節後，使用新的嘗試 ID 再次執行。

接著加入一段許可證或複用許可記錄不清楚的外部內容。即使驗證透過，正確的採用決定也應是 `blocked`。有效的檔案結構不能解決來源問題。

## 驗收清單

- [ ] 兩次既有執行記錄支援每一項被編碼的穩定決策。
- [ ] 觸發條件和不觸發條件都已測試。
- [ ] 正例、邊界、失敗和遷移夾具都保留原始結果。
- [ ] 已記錄來源和複用許可。
- [ ] 沒有發生安裝、秘密處理、釋出或外部副作用。
- [ ] 決定明確寫出尚未驗證的內容及下次審查負責人。

## 覆盤與遷移

把此方法應用到另一領域的工作流。哪些部分能在遷移後保留下來？哪些應留在專案上下文中？候選 Skill 是否減少了重複遺漏，還是隻讓說明變得更長？

本簡體中文譯文為可讀的 `in-progress` 翻譯單元，獨立語言審校尚未完成；它不是已驗證譯文，也不表示課程已經透過學習者驗證。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-004-skill-selection-ZHTW.md" aria-label="上一個實驗：實驗 004·選擇最小有用能力">← 上一個實驗<br><strong>實驗 004·選擇最小有用能力</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-006-agent-stop-conditions-ZHTW.md" aria-label="下一個實驗：實驗 006·設計 Agent 的停止條件">下一個實驗 →<br><strong>實驗 006·設計 Agent 的停止條件</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
