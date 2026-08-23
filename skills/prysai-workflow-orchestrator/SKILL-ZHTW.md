<!-- content_id: prysai-workflow-orchestrator | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 工作流程編排器

協調跨越定義、任務協議、規劃、增量執行、驗證、審查、交付和維護的複雜 Codex 工作。適用於請求涉及多個步驟、檔案、工具、領域或檢查點，或要求端到端交付的情況。不要用於一項單獨的有界線行動、學習說明、獨立證據稽核或一次性的研究問題。

## 觸發界線與轉交

當工作至少包含兩個有依賴關係的階段，或需要檢查點、恢復、多個產物或跨領域協調時接手。

遇到以下情況就轉交：

- 使用者為有界線的子任務明確指定了 `$skill`：將它記錄為一個階段並保留範圍；
- 請求只是一項不清楚的行動：先交給 Task Protocol；
- 請求只是教學：交給 Codex Coach；
- 請求只是審查證據：交給 Evidence Review；
- 請求只是發現或整合來源：交給 Research Router；
- 請求只是選擇 Skill：交給 Skill Selector；
- 請求只是建立共享定位背景：交給 Product Context。

唯一允許的內部轉交循環是 `orchestrator -> task protocol -> one domain route -> evidence review -> orchestrator checkpoint`。不要從某個階段再次呼叫 orchestrator，也不要在沒有新發現或範圍變動時重新啟動已完成的階段。

## 必要輸入與缺少輸入的處理

要求提供 `outcome`、`non_goals`、`stages`、`dependencies`、`allowed_actions`、`acceptance_evidence`、`checkpoints`、`rollback` 和 `owner`。如果階段或相依關係不清楚，回傳包含 `blocked_on` 欄位的建議計畫。契約還必須寫明 `decision_owner`、確切的 `delivery_target`，以及任何 `commit` 步驟的含義：本地提交、推送、拉取請求和發佈是不同的行動，有不同的確認門檻。只詢問會改變路徑或風險的最小問題。

階段標記為 `in-progress` 前，先記錄：

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

缺少 `delivery_target`、負責人、驗收證據或回復目標屬於執行阻塞，不是可以猜測目標的許可。

## 生命週期與檢查點

1. 定義結果、使用者、非目標、風險和驗收標準。
2. 建立或驗證一次任務協議。
3. 將工作切成帶有負責人和證據、可逆的垂直階段。
4. 一次執行一個階段，保留差異、紀錄和執行 ID。
5. 使用合適的測試、執行時、瀏覽器、來源、安全、視覺或人工證據驗證每項主張。
6. 審查範圍、假設、可維護性和失敗路徑。
7. 交付已完成、未完成、推斷、阻塞和下一步項目。
8. 記錄維護、來源更新、遷移和回復說明。

交付目標是階段圖的一部分，不是事後補充。如果要求多個動作，本地提交、共享分支推送、拉取請求和公開發佈必須分別列為階段。

## 風險、副作用與確認

將每個階段分類為 `R0` 唯讀、`R1` 可逆本地、`R2` 共享或外部，或 `R3` 正式環境／不可逆／含秘密／廣泛存取。要擴大權限、存取秘密、傳送外部訊息、提交／推送／發佈、修改正式環境或執行不可逆行動時立即暫停。使用者必須確認確切階段、目標和副作用；編排不會繼承無關的舊批准。

## 硬停止與恢復

遇到負責人未確定、驗收缺失、目標不安全、指令衝突、回復失敗、證據遺失，或沒有新假設卻反覆失敗時，以 `blocked` 停止。保留失敗紀錄、縮小範圍、做一項有證據支持的變更，只重新執行相關檢查。絕不擴大權限或無限重試。

## 固定輸出

必須準確回傳：

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## 證據與狀態對照

階段狀態使用 `not-started`、`in-progress`、`blocked`、`verified` 或 `accepted`。整體探索使用 `practice`；工作流程結構完整且基本檢查通過時使用 `candidate`；所有聲明階段和界線案例都有證據時使用 `verified`；只有發佈、安全、負責人、維護和回復門檻也通過後才使用 `production-ready`。

## 維護紀錄

- `source`：`docs/book-architecture.md`；`docs/charter.md`；`docs/quality/skill-quality-standard.md`
- `license`：專案原創改寫；外部資料仍僅作參考
- `owner`：workflow-systems maintainer
- `version`：`0.2.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
