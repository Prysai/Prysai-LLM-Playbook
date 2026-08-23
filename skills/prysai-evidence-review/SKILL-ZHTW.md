<!-- content_id: prysai-evidence-review | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2e09a6e | source_license: project-owned CC-BY-4.0 -->

# 證據審查

根據其他人可以檢查的可觀察證據，稽核 Codex、Agent、研究、行銷、瀏覽器、部署、Skill 或任務完成等主張。當結果看起來完整卻可能尚未完成、需要區分 verified、inferred、blocked 或 unknown，或需要找出最小的下一項檢查時使用。不要執行缺少的檢查，也不要取代來源研究流程。

## 觸發界線與轉交

當輸入包含完成主張、範圍、差異、測試、來源支持的說法、截圖、紀錄、部署報告或評估時接手。

遇到以下情況就轉交：

- 使用者明確呼叫了 `$skill`；只有在明確請求本身是稽核請求時才進行審查，同時仍遵守安全界線；
- 使用者要執行缺少的研究：交給 Research Router；
- 使用者要執行不清楚的任務：交給 Task Protocol；
- 使用者要執行多階段工作流程：交給 Workflow Orchestrator；
- 使用者要學習非 Codex 的課程或練習：交給 Learning Coach；
- 使用者要學習 Codex 的課程或練習：交給 Codex Coach。

不要靜默修復正在審查的產物。修復是另一個任務，必須另外分流。

## 必要輸入與缺少輸入的處理

必須取得 `claims`、`scope`、`evidence`、`time_or_version` 和 `acceptance_rule`。對每項主張，如果結果會共享或公開發佈，還要記錄 `owner`，並區分 `not_observed` 和 `failed`。如果缺少主張，要求補充。如果缺少證據，回傳 `unknown` 或 `blocked`，指出最小的安全檢查；不要用合理性、記憶或從產物複製的主張來填補缺口。

## 審查方法

對每項主張記錄範圍、證據類型、新鮮度、來源、覆蓋度和下一項檢查。確認來源是否過期、是否為產生物、模擬物、錯誤目標或範圍過窄。讓檢查符合主張：檔案變更用差異，建置用指令輸出，執行時行為用執行觀察，視覺主張用渲染結果，易變事實用附日期的權威 URL，偏好主張用已定義的樣本和方法。verified 只適用於證據涵蓋的範圍；不要把窄範圍結果升級成廣泛陳述。

### 學習證據檔案

當主張涉及練習或學習時，將 `process_pass` 與 `learner_outcome` 分開。需要固定測試夾具版本、允許的協助、保留的基線嘗試、提示紀錄、學習者親自完成的修正、改變過的任務、評分者和門檻、延遲時間（如果主張保留），以及明確要求的狀態。將結果精確對應為：

- 已選擇一個提示詞或計畫：`template_selected`；
- 完成一次帶教循環：`practised`；
- 通過固定任務：`demonstrated_on_this_task`；
- 通過未看過的變化任務：`transferred_to_[variation]`；
- 通過延遲後的未看過任務：`retained_at_[delay]`。

如果資料只有模型回覆、同一工作階段內的修正、模型自評或一次成功任務，拒絕使用 `mastered`、`fluent`、`expert` 或「普遍改善」等詞。如果已有 Learning Coach 紀錄，使用它作為輸入；不要把本審查檔案變成第二輪教學循環。

## 風險、副作用與確認

預設風險是 `R0`，因為審查是唯讀的。重新執行本地檢查屬於 `R1`；網路取得、帳號存取、正式環境檢查或修改產物屬於 `R2` 或更高，需要明確的範圍和確認。不要在證據中暴露秘密；在保留足夠識別資訊的同時先遮蔽秘密。

## 硬停止

當主張範圍或目標不明確、來源不可用、證據無法存取、檢查需要未授權存取，或使用者要求把未驗證的結果標成 verified 時，以 `blocked` 停止。絕不要把產物自己的完成宣告當作證據。

## 固定輸出

必須準確回傳：

1. `review_scope`
2. `claim_table`，包含 `claim`、`scope`、`evidence`、`freshness`、`status` 和 `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## 證據與狀態對照

將主張狀態設為 `verified`、`partially-verified`、`inferred`、`blocked` 或 `unknown`。如果產物處於探索階段，對應為 `practice`；結構和基本檢查通過時為 `candidate`；正常、界線、失敗和遷移證據涵蓋所述範圍時才為 `verified`；只有安全、維護、負責人、版本、回復和發佈門檻也通過後才是 `production-ready`。

## 維護紀錄

- `source`：`docs/quality/skill-quality-standard.md`；`docs/book-architecture.md`；`docs/quality/evaluation-framework.md`
- `license`：專案原創改寫；外部資料仍依 `docs/sources/asset-register.md` 僅作參考
- `owner`：evidence-systems maintainer
- `version`：`0.3.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
