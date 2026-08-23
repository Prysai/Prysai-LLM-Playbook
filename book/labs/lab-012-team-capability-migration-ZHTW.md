<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-012-team-capability-migration | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-012-team-capability-migration
title: "把個人方法遷移為團隊能力"
level: L6
domain: team
goal: "把方法打包到兩人能夠復現、審查、更新和回滾的程度"
setup: "一項虛構的週報任務、兩個匿名角色；不使用真實組織系統"
task: "製作 v0.1，讓兩人用全新上下文獨立復現；將一個需求改為 v0.2，並檢查影響和回滾"
evidence: ["帶負責人、許可權和驗收的兩個包版本", "兩份帶輸入雜湊、輸出和評分的獨立執行記錄", "差異、影響矩陣、回滾結果與未確認項"]
failure_variant: "刪去負責人、輸入來源、許可權邊界或驗收規則；或者換受眾卻不改驗收"
reflection: "哪些知識只存在於一個人的腦中？什麼會讓包無法安全傳承？"
status: draft
last_verified: "not run"
transfer_task: "將包格式用於低風險的工程、研究或內容流程"
transfer_domain: "團隊工程、研究或內容運營"
transfer_evidence: "儲存包版本、許可權矩陣、獨立執行、差異、影響、回滾和審查筆記"
transfer_limitations: "靜態模擬不能證明賬戶訪問、生產整合或組織採用"
---

# 實驗 012：把個人方法遷移為團隊能力

## 學習目標

把私人直覺和聊天記錄換成一個可版本化的約定，讓另一人也能安全執行。

## 準備

使用虛構週報任務和兩個匿名角色。不使用真實賬戶、姓名、客戶資料、內部指標、共享系統或生產倉庫。製作 `v0.1`：目的與非目標、負責人和複核節奏、輸入輸出模式、許可權矩陣和禁止行動、步驟與停止條件、正例/邊界/失敗/遷移檢查，以及回滾目標。

## 獨立復現

A 與 B 獲得同一份包和全新上下文，不能閱讀作者的聊天記錄。兩人分別記錄輸入雜湊、`run_id`、決定、輸出、不確定項和評分。比較結果時不要悄悄抹平差異。把一項真實需求改為 `v0.2`，記錄差異、受影響物件、遷移決定、相容性主張和回滾檢查。

每人各儲存一條最小執行記錄；沒有實際執行就寫 `not_run`，不要為了讓包看起來完整而補寫結果。

```yaml
run_id: "lab012-weekly-report-v1-B-01"
member: "A | B"
package_version: "0.1.0"
input_hash: "sha256:..."
read: ["README", "protocol", "permission-matrix"]
action_taken: "只在臨時副本生成虛構週報草稿"
stopped_at: "明確的停止條件，或 none"
output_or_diff: "路徑或 no-change"
validation: "命令、退出碼和關鍵結果；未執行則 not_run"
unknowns: ["沒有真實賬戶執行證據"]
status: "pass | fail | blocked | not_run"
```

若 B 需要作者口頭解釋、無法找到負責人、看不出允許範圍，或不知道如何回滾，不能把這次交接判為透過。把缺口寫入包的對應層，再從乾淨副本重試；不要靠聊天補充後把結果說成獨立復現。

## 失敗、驗收與遷移

刪去負責人、輸入來源、許可權邊界或驗收規則，正確結果是停止遷移並記錄缺失約定。若 `v0.2` 改了目標受眾卻沒改驗收，審查必須拒絕相容性主張或要求新證據。

- [ ] 兩人能在全新上下文中復現任務。
- [ ] 輸入、輸出、許可權和負責人清楚可見。
- [ ] 執行差異被解釋，而非平均掉。
- [ ] 版本改變有影響說明與回滾。
- [ ] 沒有使用真實賬戶、生產系統或敏感輸入。

儲存兩個版本、雜湊、許可權矩陣、獨立記錄、評分筆記、差異、影響矩陣、回滾與未確認項。在這些證據出現前，L6 能力尚未證明。

## 覆盤與遷移

把同一格式用於一個低風險的工程、研究或內容任務。問自己：哪一步原來只在一個人的記憶裡？如果負責人離開、來源過期或六個月後需要回滾，哪一項會讓繼承變得不安全？答案必須能回到版本、記錄、差異或未確認項，不能只寫“大家應當更小心”。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-011-gpt-codex-boundaries-ZHTW.md">← 上一個實驗<br><strong>實驗 011 · GPT、Codex、工具與 Agent 的邊界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-013-l3-vertical-slice-ZHTW.md">下一個實驗 →<br><strong>實驗 013 · 可審計的垂直切片</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
