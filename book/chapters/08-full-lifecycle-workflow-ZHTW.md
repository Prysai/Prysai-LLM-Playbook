<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: chapter-08-full-lifecycle-workflow | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 第 8 章：從定義到交付

**狀態：** `candidate`。本章定義了攜帶證據的工作流及恢復規則，
但比較實驗尚未執行。案例材料為專案自有教學材料，不是一次真實 Codex 執行、
客戶委託或生產釋出的記錄。

## 本章要解決的問題

讓 Codex“開始寫”通常不難；把一件有用的工作真正收尾，是另一回事。

任務表面上看似順利，目標卻可能仍然模糊，範圍正在蔓延，檢查跑在錯誤檔案上，
或上一次成功的改動無從確認。模型容量錯誤會中斷任務，後續提示卻可能繼續建立在
半成品狀態上；終端可能停在 `Working`，卻沒有命令完成的證據；瀏覽器
可以報告登入成功，而客戶端仍會在下一步令牌交換時失敗。

實用的回答是一條有明確出口的工作流：

~~~text
定義 → 計劃 → 構建 → 驗證 → 審查 → 交付 → 維護
~~~

每一個箭頭都是決策點。階段完成，不是因為介面向前走了，或 Agent 說“完成”；
而是因為該階段的證據存在，並且另一個人能夠檢查。

![教學卡：工作流把證據從定義帶到維護](../../assets/teaching/lifecycle-checkpoints.svg)

> 這是專案自有教學卡。它解釋方法的結構；它不證明某個 Skill、Agent 或外部服務
> 已經執行了這條工作流。

### 看一個輸出，同時看見它的邊界

倉庫還提供一個可丟棄、專案自有的案例，把同一紀律帶到非程式碼交付物：
一張虛構的、以首次購房者為先的房地產概念頁。在看截圖前先讀
[案例記錄](../evidence-library-ZHTW.md#source-notes)。
其中標明合成輸入、本地渲染命令、記錄的視口，以及這張圖不能支援的斷言。

[![合成首次購房者指南的一次本地渲染](../../assets/cases/product-context-real-estate-thumbnail.png)](../../assets/cases/product-context-real-estate-desktop.png)

截圖只是指定視口下的一次本地渲染證據。它不能證明 Product Context Skill 曾獨立
執行、房源真實存在，或頁面提高了信任、諮詢、轉化或銷售。
[sandbox 說明](../../examples/skill-sandbox/product-context-real-estate/README-ZHTW.md)
被刻意保持得足夠小，可以在無需憑據或外部請求的前提下檢查和重跑。

## 學習目標

完成本章後，你應該能夠：

- 在允許編輯前，寫出包含範圍、非目標、驗收、許可權和恢復目標的任務定義；
- 把大請求改寫為儘早產生可檢查證據的豎向切片，而不是留下多層未完成工作；
- 建立能保留最後已知成功狀態的檢查點，讓重試有條件而不是自動發生；
- 區分構建、執行時、視覺、來源、安全和使用者驗收證據；以及
- 寫出誠實的交接，說明發生了什麼、沒有發生什麼、下一位審查者還必須檢查什麼。

## 現實問題入口：工作流可能在兩個介面之間失敗

專案的 [Codex 現場研究](../evidence-library-ZHTW.md#source-notes) 記錄公開使用者報告。
這些報告是有用的症狀，不是官方根因分析，也不是本地復現。

| 報告的症狀 | 報告能夠支援什麼 | 它**不能**證明什麼 | 第一個安全響應 |
|---|---|---|---|
| 所選模型變得不可用，任務停止 | 報告者觀察到了容量錯誤和被中斷的任務 | 佇列語義、服務端原因，或所有賬戶和版本的行為 | 凍結後續提示；重試前檢查 diff、日誌和最後接受的檢查點 |
| 格式化或驗證任務長時間停在 `Working` | 報告者在該次執行中沒有看到完成訊號 | 普遍死鎖、確切子程序或根因 | 設定有界等待；儲存輸出和程序狀態；僅按任務恢復規則中斷 |
| 瀏覽器稱認證成功，客戶端稍後失敗 | 認證有多個可觀察階段 | 瀏覽器成功、網路可達或頁面提示證明客戶端已就緒 | 將回撥、令牌交換和首次成功客戶端請求分別記錄 |
| 驗證擴大為強制重灌 | Agent 可能把“確認它能用”理解為可改動持久環境 | 報告描述所有 Agent，或重灌永遠錯誤 | 分開記錄原始碼改動、測試、安裝、重啟、部署和線上驗證；持久改動前詢問 |

本章不是在教“永不重試”或“永不安裝”。它教的是：下一步取決於證據與授權，
而不是等待了多久，或狀態標籤顯得多自信。

## 1. 生命週期是一組攜帶證據的狀態

這七個階段是組織工作的教學模型，不承諾每個 Codex 工作面都會暴露完全相同的
介面狀態。

| 階段 | 它回答的問題 | 常見允許工作 | 出口證據 | 何時停止 |
|---|---|---|---|---|
| 定義 | 想要什麼結果、給誰、邊界是什麼？ | 閱讀規則、目標、輸入、風險和非目標 | 任務協議與驗收說明 | 缺失輸入會改變範圍、風險、許可權或驗收 |
| 計劃 | 最小且有用的工作順序是什麼？ | 對映依賴、選擇切片、暴露高風險未知項 | 有序計劃、切片邊界與檢查 | 計劃只是橫向分層，不能獨立檢查結果 |
| 構建 | 在允許範圍內實際改了什麼？ | 做一次有界改動並保留檢查點 | diff、變更檔案清單與檢查點記錄 | diff 超出範圍，或恢復目標不清楚 |
| 驗證 | 結果在關鍵檢查下是否表現正確？ | 跑聚焦測試、構建、執行時、視覺或來源檢查 | 命令、退出碼、輸出、環境與限制 | 命令掛起、測試目標錯誤，或缺少證據 |
| 審查 | 宣告是否符合證據和請求結果？ | 用新鮮上下文閱讀 diff，檢查風險與維護成本 | 宣告—證據表和開放風險清單 | 宣告寬於證據，或授權有歧義 |
| 交付 | 另一個人能否使用並檢查結果？ | 交接檔案、日誌、限制和下一步 | 交付摘要與精確產物路徑 | 狀態會被誇大成已提交、已釋出或已上線 |
| 維護 | 什麼需要觀察、更新或回滾？ | 記錄負責人、源版本、下次複核和回滾 | 維護記錄與複核觸發器 | 沒有人負責更新，或回滾無法演練 |

出口條件缺失時，寫 `blocked` 或 `unverified`。不要靠再加一個
階段來填補缺口；更長的計劃不能替代缺少的許可權、檔案或測試結果。

### 狀態標籤不是出口檢查

| 宣告 | 最低證據 |
|---|---|
| “原始碼改了。” | 指定路徑的 diff 或檔案比較 |
| “檢查跑過了。” | 精確命令、工作目錄、退出碼和輸出 |
| “應用能用。” | 在指定環境和輸入下的執行時觀察 |
| “頁面看起來正確。” | 指定視口的渲染檢查和視覺驗收標準 |
| “功能已經交付。” | 倉庫或部署狀態、釋出記錄和交付後檢查 |

最後一句比前四句嚴格得多。構建透過很有價值，但不會自動成為執行時、視覺、安全或
使用者驗收證據。

## 2. 先定義，再行動

定義階段把願望變成有邊界的契約。它應短到可以在開工前讀完，又具體到足以阻止
好心的 Agent 自行發明範圍。

~~~text
owner: content-maintainer
target: docs/guide.md
goal: make the steps, links, and acceptance notes agree
allowed_scope: read project rules; edit docs/guide.md; run existing local checks
inputs: target file, project rules, defect list, existing link checker
non_goals: no code changes; no dependency install; no commit; no push; no publish
acceptance: the named defects are fixed and the allowed checks have recorded exits
evidence: diff, changed-file list, command output, review notes, unverified list
stop_when: scope, authority, target, or recovery source is missing
rollback: restore the pre-edit copy or return to the recorded clean checkpoint
delivery: local review packet; state whether commit and push were not performed
~~~

有兩項最容易漏掉：

1. `non_goals` 防止任務意外擴張。“驗證頁面”並不暗含重灌瀏覽器、
   改系統策略或釋出結果。
2. `rollback` 必須指向真實的恢復來源。雜湊只能說明檔案變了，不能
   自己還原舊內容。

### 最小許可權規則

從只讀檢查開始；只為已命名目標增加寫許可權；只有任務確實需要並且範圍已授權時，
才增加網路、認證、安裝、重啟、部署或外部訊息。

任務跨越產品邊界時尤其如此。官方安全記錄將 sandbox 與審批描述為兩種不同控制，
也將有副作用的 Connector 或 MCP 動作置於審批邊界。因此工作流既要記錄技術能力，
也要記錄使用它的語義許可。相關的日期化產品邊界見
[官方事實重新整理記錄](../evidence-library-ZHTW.md#source-notes)
和[事實影響登記表](../../docs/governance/fact-impact-registry.yaml)。

## 3. 圍繞豎向切片來計劃

橫向計劃先完成某一層，再證明使用者能得到結果：

~~~text
全部資料模型 → 全部 API → 全部 UI → 整合 → 測試
~~~

若介面假設錯誤，問題可能直到最後才暴露。豎向切片會從輸入一路走到證據，
但只選擇一個窄結果：

~~~text
一個輸入 → 最小資料/改動 → 一個可觀察行動 → 一項聚焦檢查
~~~

例如，“讀者能開啟一章並找到實驗”常常比“遷移整本書的導航”更適合作為第一個
切片。它可以只包含一個英文正文、一條目錄連結、一次本地連結檢查和一次狀態邊界
審查；雖然小，卻走過了完整路徑。

| 切片欄位 | 示例 |
|---|---|
| 結果 | 從英文目錄開啟一章 |
| 輸入 | 章節源、目錄項、語言矩陣和連結檢查器 |
| 改動 | 新增規範英文檔案，只更新其英文入口 |
| 驗收 | 連結能解析、狀態已登記、舊路徑只在治理宣告為 legacy 時保留 |
| 證據 | diff、驗證器輸出、本地連結輸出和限定檔案審查 |
| 未證明 | 翻譯質量、讀者理解、瀏覽器部署或執行時 Skill 行為 |

第一個切片應儘早暴露代價最高的未知項。若工作依賴不可用憑據、提供商能力或缺失
產物，這個依賴應放在第一個切片裡，而不是拖到末尾。

## 4. 帶著檢查點構建

檢查點是可恢復的狀態說明，而不只是時間戳。它應讓下一次決策無需相信之前的聊天
歷史。

~~~text
run_id: chapter-review-001
CP0: clean or intentionally dirty baseline; status; target hash; rollback source
CP1: definition accepted; plan and permissions fixed; no edit yet
CP2: first slice changed; diff and changed-file list saved
CP3: focused checks completed or stopped; output and unverified items saved
CP4: independent review completed; delivery state and next review recorded
~~~

每個檢查點都問：

- 我們最後確認成功的是什麼？
- 哪些檔案、程序、服務或賬戶可能已改變？
- 還缺少什麼證據？
- 最小且安全的下一步是什麼？
- 什麼條件要求暫停，而不是重試？

不要把依賴性工作排在尚未接受的檢查點之後。現場研究中的使用者報告描述過危險版本：
容量中斷後，後續工作可能被當作前置任務已經完成。報告不能證明普遍佇列語義，
但它給出了一條安全規則：對話引用不等於已驗證的前提條件。

### 只有已知狀態後才重試

~~~text
failed_stage: verify
failure_class: model capacity / command timeout / unknown
last_accepted_checkpoint: CP2
changes_since_checkpoint: none known; diff rechecked
retry_condition: same command, same target, one bounded attempt
fallback: stop and hand off if output remains absent or scope changes
~~~

“繼續”不是恢復計劃。它沒有指出最後接受的狀態，不能防止重複副作用，也不能解釋
為什麼同一動作現在值得再做一次。

## 5. 分層驗證

驗證是選擇問題：選擇能夠支撐你準備宣告的檢查。

| 宣告 | 能支撐它的檢查 | 該檢查的邊界 |
|---|---|---|
| 預期檔案改變 | 指定路徑的 diff | 不證明改動正確 |
| 語法或構建有效 | 聚焦驗證器或構建命令 | 不證明執行時行為 |
| 功能在一個環境表現正常 | 固定輸入的執行時檢查 | 不泛化到每個賬戶、系統或提供商 |
| 頁面按意圖渲染 | 指定視口的瀏覽器或視覺檢查 | 不證明使用者需求、無障礙完整性或生產部署 |
| 外部事實仍新鮮 | 有日期、範圍和下次複核的權威來源 | 不證明本賬戶有訪問權，或本會話配置正確 |
| 釋出已上線 | 部署記錄加交付後請求/檢查 | 不證明每個快取、路由、裝置和使用者路徑都正確 |

工作時保留一張宣告—證據表：

~~~text
claim: 第 8 章可從英文目錄到達
evidence: table-of-contents-ZHTW.md link; local link checker exit 0
scope: recorded commit 的倉庫工作樹
not_proven: GitHub 渲染、譯文連結、讀者理解

claim: 比較實驗已完成
evidence: none
scope: none
status: not_run; 不得宣稱完成
~~~

### 當命令持續停在 Working

把沉默當作觀察，不當作成功訊號。啟動長命令前，先定義預期輸出、合理等待時間和
中斷路徑。等待到期時：

1. 記錄命令、工作目錄、目標和已耗時間；
2. 收集當前可得到的輸出和程序狀態；
3. 檢查 diff 與最後檢查點；
4. 僅在任務允許且程序可安全停止時中斷；
5. 先把結果分類為完成、部分完成、失敗或未知，再決定是否重跑。

FP-10 背後的公開報告沒有確定格式化器、子程序、終端還是 Agent 迴圈負責。
這種不確定性正是恢復規則必須依賴證據、不能依賴猜測根因的原因。

## 6. 獨立於執行來審查

產出改動的人或 Agent，往往不是判斷它是否完成的最佳來源。用新鮮上下文審查產物，
同時保留原目標與證據清單。

1. diff 解決了宣告的問題嗎？
2. 它是否改動了允許範圍外的內容？
3. 每項完成宣告是否都有同等範圍的證據？
4. 未來維護者需要什麼才能復現、更新或回滾？

審查必須包含失敗嘗試，而不只是看起來成功的最終狀態。失敗命令也可能改變檔案；
重試可能重複副作用；瀏覽器截圖可能隱藏缺失的網路請求；綠色構建可能跳過真正重要
的測試。

## 7. 交付與維護

一份有用的交付說明應短、具體、誠實：

~~~text
status: ready_for_local_review
owner: content-maintainer
scope: docs/guide.md only
actions_done: inspected; planned; edited; ran diff and local checks
actions_not_done: commit; push; publish; browser review
evidence: CP0; CP2 diff; CP3 command output; review notes
unverified: reader usefulness; rendered appearance; facts outside the brief
blocked_on: reviewer confirmation before commit
next_check: inspect the target file and evidence paths
permission_boundary: local reversible edit and read-only checks
next_review: after the source or chapter structure changes
~~~

交付不是生命週期的終點。若輸出包含易變的模型、工具、許可權、命令或服務事實，
記錄其權威 URL、訪問日期、範圍、負責人和下次複核；若輸出是 Skill 或共享工作流，
記錄觸發條件、排除條件、依賴、測試與回滾。沒有人負責這些更新，能力就還不能供團隊
可靠使用。

官方 Cloud 文件也說明為什麼這些階段不能摺疊：設定、Agent 工作、結果審查和後續跟進
是不同工作面，有不同證據。文件本身只是日期化的產品來源，不證明某個賬戶或工作區
擁有訪問權。

## 8. 來自真實報告的恢復模式

### 容量中斷

**觀察到的症狀：** 所選模型報告容量已滿，任務停止。

**安全的第一個響應：** 凍結依賴提示，儲存當前 diff 和日誌，確定最後接受的檢查點，
檢查預期檔案或產物是否部分完成；之後選擇一次有界重試、備用工作面或交接。

**不得宣告：** 排隊的任務已經完成、模型是唯一原因，或反覆傳送“繼續”已恢復缺失證據。

### 長時間執行的驗證

**觀察到的症狀：** 格式化、測試或分析命令沒有完成訊號，介面卻停在 `Working`。

**安全的第一個響應：** 應用預定義的超時和中斷規則，儲存輸出和程序狀態，檢查 diff，
然後分類此次檢查；原因未知時就保持未知。

**不得宣告：** “還在執行”等於“已透過”，或沒有可見錯誤就等於子命令已完成。

### 第一個頁面顯示成功的認證

**觀察到的症狀：** 瀏覽器頁面稱登入成功，但客戶端無法交換令牌或發出第一次請求。

**安全的第一個響應：** 建立狀態卡，分別寫授權頁、回撥、客戶端交換和第一次成功請求；
只測試下一個缺失狀態。

**不得宣告：** 瀏覽器成功證明客戶端認證、賬戶權益、聯結器審批或 MCP 工具可用。

### 驗證請求持久改動

**觀察到的症狀：** Agent 提議重灌、重啟或改動本地環境來讓檢查透過。

**安全的第一個響應：** 停下並寫明擬議副作用、目標、源產物、備份、回滾和授權點；
在決定明確前，優先隔離或只讀檢查。

**不得宣告：** 原始碼 diff、單元測試透過和安裝成功是同一種狀態。

## 9. 示例：審查一個 Markdown 章節

這個案例刻意很小，用來展示任務協議、Skill、Agent 和行動邊界章節的欄位如何連線。
它是填好的教學示例，不是一次已記錄執行。

### 定義

~~~text
owner: content-maintainer
target: docs/guide.md
goal: make steps, links, and acceptance descriptions consistent
allowed_scope: edit docs/guide.md; run existing local checks
non_goals: no code; no install; no commit; no push; no publish; no external messages
~~~

輸入是目標檔案、專案規則、固定缺陷清單，以及已有的連結檢查器（若專案已記錄）。
不要讀取秘密、客戶材料或無關目錄。若缺陷依賴易變產品事實，先送到來源記錄，再寫入章節。

### 能力決策

| 能力 | 決策 | 原因 |
|---|---|---|
| Task Protocol | 使用 | 固定目標、範圍、確認點和交付格式 |
| Workflow Orchestrator | 作為階段記錄使用 | 跟蹤依賴和檢查點；不擴大許可權 |
| Evidence Review | 使用 | 把“連結檢查透過”和“只改一檔案”對映回證據 |
| Research | 暫不使用 | 固定缺陷清單不需要新外部事實 |
| 瀏覽器、聯結器、GitHub 寫操作 | 不使用 | 對本地 Markdown 審查沒有增加價值 |

選擇一個 Skill 不會讓任務自動完成，也不會給該 Skill 呼叫另一個工具或啟動獨立工作流
的許可權。

### 階段出口

| 階段 | 允許動作 | 出口證據 |
|---|---|---|
| 定義 | 閱讀規則、目標和缺陷清單 | 任務卡、輸入列表、允許範圍 |
| 計劃 | 排序兩三個本地編輯 | 計劃、依賴順序、假設 |
| 構建 | 只編輯 docs/guide.md | diff、檢查點、變更檔案清單 |
| 驗證 | 跑已有本地檢查 | 命令、退出碼、輸出、限制 |
| 審查 | 對照目標閱讀 diff | 審查筆記和宣告—證據表 |
| 交付 | 準備本地審查包 | 寫明是否發生 commit/push 的摘要 |

任一階段缺少出口證據時，標為 `blocked` 或 `unverified`；
不要僅因計劃中存在下一階段就繼續。

### 檢查點與恢復

~~~text
CP0: original copy + git status + target hash
CP1: plan accepted; no edit yet
CP2: local edit complete; git diff -- docs/guide.md saved
CP3: checks completed or interrupted; output and limits saved
~~~

若 CP2 超出允許範圍，先保留 diff 再糾正，並回到 CP0 的恢復來源。若只有一個段落
錯誤，就修這一段並重跑相關檢查；不要先確認精確目標和恢復來源就使用寬泛還原命令。

### 誠實交付

~~~text
completed: reviewed and edited docs/guide.md; saved the actual diff
verified: allowed scope; diff format; named local link check, with exit codes
unverified: browser rendering; reader usefulness; facts outside the defect list
not_done: commit; push; publication; external writes
next: human review of the evidence paths before any local commit
~~~

## 10. 實驗：為同一結果比較兩種計劃

**實驗狀態：** `not_run`。

### 準備

選擇低風險的功能或文件交付，使用可丟棄副本或明確隔離的分支。準備脫敏輸入、固定
驗收量表和起始狀態記錄。不要釋出、推送、刪除或改動生產資源。

### 任務

為同一結果寫兩份計劃：

1. 按技術層逐層完成的橫向計劃；
2. 從輸入走到證據、只取一個窄結果的豎向切片計劃。

兩種計劃必須使用同一驗收量表。比較最先暴露的未知項、最先可檢查的產物、依賴假設
數量，以及一次刻意中斷後的恢復點。

### 證據

儲存兩份計劃、依賴草圖、切片的進入與退出條件、實際 diff、驗證輸出和檢查點筆記。
只有至少一個切片產生獨立證據，並且學習者能說出仍未完成的工作，實驗才算透過。

### 覆盤

記錄哪項未知最早出現、哪一個切片仍然太大、容量錯誤或命令超時時應使用哪個檢查點。
下一次執行只改變一個計劃條件；不要為了讓比較顯得更乾淨而重寫結果。

## 刻意失敗與邊界案例

開始一個小改動，完成編輯後卻在跑檢查前寫“完成”。然後模擬以下一種中斷：

- 模型變得不可用；
- 驗證命令在定義的等待時間內沒有輸出；或
- 建議的恢復需要安裝、重啟、網路呼叫，或寫入原範圍外的內容。

學習者透過的條件是：交接保留檢查點、部分 diff、缺失證據、許可權邊界、恢復路徑和
精確的未知說明。繼續堆疊編輯，是這項實驗的失敗。

## 先完成一個小而完整的切片

初學者不必從網站、程式碼或釋出開始。選一個自己能檢查的短文字、一個本地 README，或一組已經允許使用的公開來源。目標不是讓模型“做很多”，而是完成一次從定義到交接都能看見的閉環。

```text
結果：讓一段 120 字以內的說明讓新讀者能找到第一步。
輸入：原文、讀者是誰、一個已知問題。
允許：只讀原文；提出計劃；確認後只編輯該文字。
不允許：聯網、登入、安裝、傳送、釋出或改動其他檔案。
檢查：儲存修改前後文字；讓另一人或你自己按“能否找到第一步”檢查一次。
交接：改了什麼、沒有改什麼、檢查結果、仍未知什麼。
```

把這七個階段走一遍：先定義讀者和結果；計劃一處改動；儲存原文作為檢查點；編輯；比對前後；讓新視角審查；交接給下一位或明天的自己。若需要更多資料或外部動作，先停在 `blocked`，不要為了完成流程而擴大許可權。

### 兩次嘗試怎樣才可比較

若你要比較“直接讓模型改”與“先寫協議再改”，必須固定原文、目標、允許動作、時間限制和檢查規則。記錄首次輸出、實際耗時、返工次數、diff、檢查結果和未知項。原文、模型、工具、許可權或環境改變時，寫 `not_comparable`；一次更快或更順眼的結果不等於普遍效率或模型更好。

## 遷移

把生命週期遷移到一個非程式碼任務，如研究簡報、營銷頁面或設計交接。對每個階段寫出
進入條件、出口證據、停止條件和副作用邊界；再指出什麼證據相當於 diff，什麼相當於
執行時檢查，什麼仍需要人工驗收。

## 來源與維護邊界

| 事實或邊界 | 來源 | 訪問日期 | 適用範圍 | 負責人 / 下次複核 |
|---|---|---:|---|---|
| Sandbox 與審批是不同控制；Connector/MCP 副作用可屬於審批邊界 | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 和[官方事實重新整理記錄](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 當日官方產品描述；不證明本倉庫的執行時策略 | `facts-maintainer` / 2026-09-09 |
| Cloud 工作有不同的設定、Agent、審查和後續邊界 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-09 | 產品說明；賬戶、組織、環境和當前 UI 仍需另行檢查 | `facts-maintainer` / 2026-09-09 |
| 容量中斷可能讓依賴任務狀態不明 | [FP-09 / issue #33865](https://github.com/openai/codex/issues/33865) 與[現場研究](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 公開使用者報告；沒有本地復現或普遍佇列結論 | `curriculum-maintainer` / 2026-09-09 |
| 長時間驗證可能讓完成狀態不明 | [FP-10 / issue #34325](https://github.com/openai/codex/issues/34325) 與[現場研究](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 公開使用者報告；根因和版本範圍未知 | `curriculum-maintainer` / 2026-09-09 |
| 認證應記錄為不同的可觀察階段 | [FP-01、FP-02](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 用於證據紀律的使用者報告；不是官方修復建議 | `curriculum-maintainer` / 2026-09-09 |
| 驗證不得靜默擴大為安裝或持久環境改動 | [FP-11 / issue #37677](https://github.com/openai/codex/issues/37677) 與[現場研究](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 公開使用者報告；不是官方策略或本地復現 | `curriculum-maintainer` / 2026-09-09 |

生命週期原則應當相對穩定；產品工作面、模型名稱、審批預設值、命令引數、認證行為和
外部服務屬於易變事實。任一項變化時，重新整理第一方記錄，然後審查本章、相關 Lab、Skill、
評測夾具和站點路徑。

## 驗收清單

- [ ] 我能寫出帶目標、範圍、非目標、驗收、許可權、證據和回滾來源的任務定義。
- [ ] 我能解釋為何面對同一結果，豎向切片比橫向分層更早產生證據。
- [ ] 我能建立一個檢查點，讓另一人無需讀取原對話也能恢復。
- [ ] 我能區分原始碼、構建、執行時、視覺、來源、安全和使用者驗收證據。
- [ ] 我能在容量中斷或長時間執行時停止任務，而不把沉默或重複重試稱為成功。
- [ ] 我能分開瀏覽器認證、客戶端交換、首次請求和外部工具可用性。
- [ ] 我能拒絕未請求的安裝、重啟、部署或外部寫入，同時保留下一步所需證據。
- [ ] 我能交付一份明確列出已完成、未驗證、受阻和未做工作的交接。
- [ ] 我能說明本章仍為 `candidate`，比較實驗仍為 `not_run`，
      直到存在執行記錄和審查證據。

本簡體中文譯文是可讀的 `in-progress` 翻譯切片，獨立語言審校尚未完成；
它不是已驗證譯文，也不表示課程已經透過獨立中文審校或學習者驗證。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章節導覽">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-ZHTW.md" aria-label="上一章: 第 7 章 · How Skills, Plugins, MCP, and tools divide the work">← 上一章<br><strong>第 7 章 · How Skills, Plugins, MCP, and tools divide the work</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-ZHTW.md" aria-label="下一章: 第 9 章 · Verification, doubt, and recovery">下一章 →<br><strong>第 9 章 · Verification, doubt, and recovery</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
