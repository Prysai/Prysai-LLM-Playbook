<!-- content_id: prysai-product-context | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 產品背景

在定位、內容、SEO、轉換、發佈、分析或銷售工作前，建立或更新一份有版本的產品和行銷背景。當共享的產品理解缺失，或使用者要求受眾、定位、品牌語氣或產品背景時使用。不要捏造客戶證據、取代研究或執行下游行銷變更。

## 觸發界線與轉交

當缺少共享的產品、受眾、定位、訊息、品牌、轉換或衡量背景時接手。

遇到以下情況就轉交：

- 使用者明確指定 `$skill`：遵循它；只有使用者要求時才補充背景；
- 需要尋找外部事實：Research Router；
- 需要稽核既有背景的主張：Evidence Review；
- 要執行內容或發佈變更：Task Protocol 或 Workflow Orchestrator；
- 只是學習定位方法：Codex Coach。

不要變成行銷執行器、分析系統或客戶研究替代品。除非發現實質背景缺口，否則不要為了下游交付再次呼叫 Product Context。

## 必要輸入與缺少輸入的處理

要求提供 `product_or_project`、`current_goal`、`known_audience`、`available_sources`、`decision_to_support` 和 `canonical_location`。還要提供 `decision_owner`、`context_version` 和 `version_baseline`；本 Skill 的維護版本不是產品背景版本。提出變更前，檢查既有背景、目前版本或雜湊及其變更紀錄。沒有客戶證據、指標、推薦語、競爭事實或偏好時，標為 `hypothesis` 或 `unknown`；對高影響缺口提出聚焦問題。

預設產生非權威草稿或建議差異。解釋、審查或潤飾既有背景，不等於取得重建或寫入規範檔案的授權。寫入規範背景前，必須有確切目標路徑、目前版本／雜湊、變更欄位範圍、隱私分類和 PII 決定、負責人、可逆備份或回復目標，以及寫入前立即確認。確認必須點名目標和行動；登入、權杖、過去批准或「所有權限」都不夠。缺少任何欄位時回傳包含 `blocked_on` 的 `blocked`，不要寫入或建立變更紀錄。目標、基線或寫入範圍無法對應時，絕不要覆蓋既有背景。

## 收集並管理版本

記錄一句話說明、類別、類型、目標、目標使用者和決策人、待完成工作、反使用者畫像、問題、替代方案、異議、差異化、證據點、客戶語言、應使用／避免的詞、術語表、語氣、限制、轉換行動和衡量決策。每次實質變更遞增版本，並新增有日期的變更紀錄。告訴下游哪個位置和版本是權威來源。

變更紀錄必須標出舊版本、新版本、改變的主張、使用的證據、決策負責人、受影響的下游產物、目標路徑和回復目標。草稿背景在負責人接受該紀錄前不是權威版本。將提案、已確認寫入和已發佈變更保持為不同狀態；完成其中一項不代表其他項目完成。

## 下游設計轉交

Product Context 約束下游設計，但不會憑偏好選擇視覺風格、產生完成的介面或驗證視覺品質。當下游產物是網頁、應用程式、簡報、報告或其他視覺交付物時，提供 `design_handoff`，說明：

- 真實使用者任務，以及產物必須支持的決策；
- 必要的資訊層級和最低有用資訊密度；
- 使用者無需解釋就能辨認的熟悉業界模式；
- 必要的信任訊號、來源、揭露、所有權和聯絡方式；
- 實際存在的攝影、庫存、資料、客戶語言、推薦語和核准品牌資產；
- 會製造證據或暗示無依據權威的禁止視覺／文案模式；
- 目標視窗、無障礙條件、審查負責人和渲染產物的驗收檢查。

如果沒有真實照片、庫存、客戶語言、推薦語或核准品牌系統，不要用生活方式文案、合成列表、裝飾性房產插畫、過大的編輯風襯線字體、柔和漸層色塊、漂浮卡片或過度圓角填補。優先使用買家指南、服務說明、清單、比較或決策工具，讓價值不依賴虛構證據。視覺上精緻的產物在依聲明條件渲染並審查前仍未驗證。

## 風險、副作用與確認

根據使用者提供的來源起草屬於 `R0` 或 `R1`。只有在記錄確切本地目標、基線、備份、隱私決定、回復目標、負責人和立即確認時，寫入規範檔案才屬於 `R1`。發佈、改變線上網站、收集個人資料、傳送訊息或變更分析系統屬於 `R2` 或更高風險，必須交給 Task Protocol 或 Workflow Orchestrator，並提供確切目標、範圍、負責人和確認。除非必要且獲得授權，不保留個人識別資料；不要因使用者提供原始客戶紀錄就把它複製進背景。

## 硬停止

產品身分、決策負責人、規範位置、證據來源、隱私界線、版本基線、目前目標狀態、備份、回復目標或寫入確認不清楚時回傳 `blocked`。提案會覆蓋未審查決策、暴露 PII 或超出請求的欄位範圍時也停止。絕不要把假設變成證明、把草稿變成客戶主張，或把背景更新變成發佈權限。

## 固定輸出

必須準確回傳：

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `design_handoff`
11. `risk_and_permissions` —— 包含 `risk`、`action_state`（`draft_only`、`write_blocked`、`write_confirmed` 或 `handoff_required`）、確切目標、隱私決定、負責人、確認、備份／回復和停止條件
12. `content_status`

## 證據與狀態對照

將每項陳述標為 `observed`、`attributed`、`hypothesis`、`decision` 或 `unknown`。透過以引用來源檢查每項重要主張、將建議欄位與目前基線比較、檢查隱私分類和變更範圍，並確認驗收負責人可以檢查差異來驗證提案。這只能驗證提案，不能驗證客戶影響或下游執行。來源和負責人尚未審查前是 `draft`；有版本背景但缺少新鮮利害關係人或來源檢查時是 `candidate`；聲明證據和負責人審查通過後是 `verified`；只有隱私、發佈、維護和回復門檻都通過後才是 `production-ready`。背景驗證不能驗證下游主張。

## 維護紀錄

- `source`：`docs/charter.md`；`CONTEXT.md`；`docs/quality/skill-quality-standard.md`
- `license`：專案原創改寫；提供的客戶或外部資料仍受其來源授權約束
- `owner`：product-context maintainer
- `version`：`0.3.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
