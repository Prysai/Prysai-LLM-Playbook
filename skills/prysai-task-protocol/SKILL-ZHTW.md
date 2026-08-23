<!-- content_id: prysai-task-protocol | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 858b617 | source_license: project-owned CC-BY-4.0 -->

# 任務協議

把沒有說清楚的請求整理成一份有界線的 Codex 任務協議，涵蓋結果、上下文、輸入、限制、允許的行動、驗收證據、失敗處理和交付方式。當請求模糊、返工風險高、涉及權限，或會產生外部副作用時使用。不要把它當作學習、證據稽核、研究整合、產品背景、Skill 選擇，或契約已經清楚後的多階段編排主要路徑。

## 觸發界線與轉交

處理「改善」「建立」「研究」「連接」等模糊動詞，也處理範圍、權限、驗收標準或副作用不清楚的情況。

遇到以下情況就轉交：

- 使用者明確呼叫另一個 Skill；保留明確的 `$skill` 路徑，只補充必要的安全問題；
- 使用者已提供完整協議並希望執行：交給 Workflow Orchestrator 或相關領域路徑；
- 使用者詢問既有結果是否屬實：交給 Evidence Review；
- 尚未解決的工作是尋找來源：交給 Research Router；
- 尚未解決的工作是產品定位：交給 Product Context；
- 尚未解決的工作是選擇或安裝 Skill：交給 Skill Selector。

絕不要再次呼叫自己。可以列出轉交路徑，但另一個 Skill 回傳後，除非使用者改變範圍，否則不要遞迴重建協議。

## 必要輸入與缺少輸入的處理

收集 `goal`、`background`、`inputs`、`constraints`、`allowed_actions`、`acceptance_evidence`、`failure_handling` 和 `delivery_format`。同時把 `risk` 分為 `R0`、`R1`、`R2` 或 `R3`；如果任務可能改變共享或外部狀態，還要記錄 `owner`、`checkpoint`、`rollback` 和 `confirmation`。把未知項目標記為 `missing`，不要假定它們已經存在。先檢查本地、低風險的輸入，再提出問題；只提出會改變範圍、風險、實作選擇或驗收標準的問題。對外部、含秘密、正式環境、不可逆或涉及所有權的缺口，回傳 `blocked on <field>`，不要執行。

在宣告協議已準備好前，先通過這道最低風險門檻：

| 風險 | 必要契約 | 預設行動 |
|---|---|---|
| `R0` | 明確的讀取範圍、輸入、驗收檢查以及不寫入界線 | 只解釋或只讀檢查 |
| `R1` | 明確的本地目標、允許的寫入／指令集合、檢查點、回復目標和可逆的驗收檢查 | 只進行本地可逆行動 |
| `R2` | 明確的共享／外部目標、資料暴露、負責人、行動層級確認、檢查點、回復和證據負責人 | 記錄指定確認前阻止執行 |
| `R3` | 包含所有 `R2` 欄位，並增加明確目的、獨立檢查，以及在不可逆、正式環境、含秘密或大範圍行動前立即確認 | 硬停止；不能只靠本協議執行 |

把 `read`、`edit`、`run`、`network`、`commit`、`push`、`publish`、`deploy`、`restart` 和 `secret` 分別記錄為獨立行動，並標記為 `allowed`、`not_allowed` 或 `confirmation_required`。廣泛的權限、登入狀態或過去的批准，都不能授權未列出的行動。如果使用者要求多項行動，就拆成多個階段；每個階段分別記錄風險、目標、確認、檢查點、回復和驗收證據。

## 建立順序

1. 說明結果和受益者。
2. 限定檔案、系統、帳號、版本和時間範圍。
3. 分開允許的讀取、寫入、指令、網路呼叫、提交、推送和發佈；不要放在一項沒有區分的權限裡。
4. 指定風險等級，定義準確目標、負責人、確認點、檢查點、回復和可觀察的驗收證據。
5. 標記假設、未知項目和下一個轉交。

針對每項驗收主張，寫明能證明它的可觀察產物或指令輸出，以及它不能證明的界線。協議不是執行證據。不要因為行動被要求、規劃、啟動或回傳看似合理的文字，就把它標記為完成。

## 風險、副作用與確認

將 `R0` 定義為解釋／只讀，`R1` 為可逆的本地變更，`R2` 為外部服務或共享儲存庫的變更，`R3` 為正式環境、不可逆、含秘密或廣泛權限的行動。協議可以描述副作用，但執行必須取得針對確切目標和行動範圍的明確授權。「所有權限」的確認不能代替窄範圍的目標確認。絕不要把秘密放進協議。對 `R2`／`R3`，確認必須在目標和行動確定後才發生，而不是之前。不要把成功的建置、登入或演練當作後續寫入、推送、發佈、部署或重啟的確認。

## 硬停止

當受益者或結果缺失、所有權不清楚、無法觀察驗收、會暴露秘密、目標含糊、不可逆行動缺少確認，或專案規則與使用者請求衝突時，回傳 `blocked`。保留失敗條件和停止原因。只有一個明確條件改變且新的檢查已命名時，才允許重試；否則回傳 `blocked` 或 `unverified`，不要無限重試。不要在欄位缺失會改變風險或範圍時，把它轉成猜測的預設值。

## 固定輸出

必須準確回傳：

1. `protocol_status`（`ready_to_execute` 或 `blocked_on`）
2. `goal`
3. `background`
4. `inputs_and_unknowns`
5. `constraints`
6. `allowed_actions_and_permissions` —— 分開的行動紀錄，包含行動狀態、目標、風險、資料暴露和確認要求
7. `acceptance_evidence`
8. `failure_handling`
9. `delivery_format`
10. `handoff`
11. `risk`
12. `owner_and_confirmation` —— 確切的決策負責人、確認點和未確認的行動
13. `checkpoint_and_rollback` —— 可觀察產物、恢復目標和恢復決策
14. `content_status`

## 證據與狀態對照

所有欄位齊全前，協議本身是 `draft`；契約通過本地完整性檢查但尚未實際執行時為 `candidate`；只有觀察到所述驗收證據後才是 `verified`；只有正式環境、回復、維護和所有權門檻也都通過後才是 `production-ready`。透過檢查必要欄位是否符合風險門檻、逐項比較每個行動和確切目標及權限狀態，並把每項驗收主張追溯到可觀察檢查來驗證協議。對 `R2` 和 `R3`，分別驗證確認點、檢查點、回復和資料暴露紀錄。不要因為協議已準備好，就把任務標記為完成。

## 維護紀錄

- `source`：`CONTEXT.md`；`docs/charter.md`；`docs/quality/skill-quality-standard.md`
- `license`：專案原創改寫；外部資料仍依 `docs/sources/asset-register.md` 僅作參考
- `owner`：task-systems maintainer
- `version`：`0.2.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
