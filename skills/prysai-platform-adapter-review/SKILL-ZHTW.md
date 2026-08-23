<!-- content_id: prysai-platform-adapter-review | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: skill-registry | source_license: project-owned CC-BY-4.0 -->

# 平台適配審查

判斷指定平台的教學或工作流程，是否真的提供有來源、可執行且可維護的差異。只把供應商名稱換掉的功能清單，不算適配內容。

## 凍結主張

記錄平台、工作面、帳號或方案邊界、版本／日期、讀者結果、通用核心前置條件、擬定狀態和正在審查的確切主張。如果混合了多平台主張，先拆開；除非同一個固定比較任務和評分規則真的讓它們可比較。

## 檢查適配契約

要求明確回答：

1. `surface`：聊天、桌面端、CLI、IDE、網頁、API 或其他入口；
2. `context_injection`：檔案、規則、對話狀態、檢索或使用者產物；
3. `actions`：這個工作面可以觀察或改變什麼；
4. `authority`：權限、確認、沙盒、帳號、計費和外部副作用；
5. `persistence`：哪些內容能跨越一輪、一次工作階段、一個任務或一個專案保存；
6. `control_loop`：可觀察的規劃、工具使用、回饋、重試和委派；
7. `verification_surface`：差異、紀錄、引用、預覽、測試、追蹤或外部狀態；
8. `failure_modes`：產品特有的誤解和降級路徑；
9. `volatile_facts`：權威 URL、存取日期、範圍、負責人和下次審查；
10. `transfer_lab`：固定輸入、安全行動、驗收、清理、失敗和證據界線。

只有附上理由時才標記 `not_applicable`。沒有目前來源或執行支援回答時，標記 `unknown`。

## 套用證據門檻

分開三類證據（官方事實的狀態值為 `official`）：

- 官方事實：平台擁有的最新第一方文件或來源；
- 觀察到的行為：保留平台設定和可見行動的執行紀錄；
- 現場訊號：只能建立症狀或需求的公開回報。

社群貼文不能滿足官方事實門檻。文件不能證明使用者的帳號、執行環境或結果。一次成功執行也不能證明普遍行為、可靠性、優越性或學習遷移。

拒絕沒有依據的等價說法。產品都使用 Agent、工具、記憶、專案、Skill 或搜尋等標籤，不代表語意相同。只比較使用相同輸入、驗收標準、風險邊界和審查規則的固定任務；保留設定差異，並記錄 `not_comparable`。

## 決定處置方式

回傳以下其中一個狀態：

- `admit_candidate`：所有必要差異、來源、執行、失敗、負責人、審查日期和證據界線都存在；
- `draft_source_gap`：重要的易變主張缺少第一方支援；
- `draft_run_gap`：契約有來源，但沒有有界線的執行；
- `merge_into_core`：沒有剩下有意義的平台差異；
- `quarantine`：授權、安全、隱私或出處不清楚；
- `retire`：適配內容過時、沒有負責人、重複或已無用。

不要因為登入成功、某個命令存在或文字看起來完整就提升狀態。`candidate` 適配不等於學習遷移已驗證，也不等於正式環境指引。

## 交付審查結果

先寫處置狀態和最重要的理由，再提供契約矩陣、沒有證據的主張、來源／執行／授權缺口、與通用核心的重複、下一項實驗、負責人、下次審查日期，以及即使通過仍不能證明的內容。格式應與主張數量相稱，不要為單一主張硬套儀式化標題。

## 維護紀錄

- `source`：實作 ADR-0025 和標準內容准入邊界的 Prysai Lab 原創方法
- `license`：專案原創改寫；供應商文件和社群回報除非另有授權，仍僅作為參考
- `owner`：platform-adapter maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
