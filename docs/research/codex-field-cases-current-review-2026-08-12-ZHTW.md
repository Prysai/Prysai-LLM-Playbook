<!-- content_id: codex-field-cases-current-review-2026-08-12 | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: codex-field-cases-current-review-2026-08-12.md | source_revision: 2026-08-23 -->

# Codex 現場案例：當前公開狀態審查

**研究日期：**2026-08-12（America/Los_Angeles）
**所有連結的存取日期：**2026-08-12
**狀態：**`candidate` / `reference-only`
**範圍：**`openai/codex` Issue [#34352](https://github.com/openai/codex/issues/34352)、[#34951](https://github.com/openai/codex/issues/34951)、[#37677](https://github.com/openai/codex/issues/37677) 的公開記錄，以及每個教學案例對應的一條穩定的一手 OpenAI 邊界。
**本地復現：**`not_run`。本專案沒有執行 Codex App 的工作樹切換，沒有觸發所報告的輸出過濾，也沒有替換持久安裝的軟體包。

## 結論先行

三個 Issue 目前都仍是 **open**。每個 Issue 都有產品標籤和一條由 `github-actions[bot]` 釋出的潛在重複項評論，但沒有 OpenAI 組織成員或倉庫維護者的公開人工回覆。公開記錄中沒有維護者確認的復現、根因、修復提交、拉取請求或修復版本。機器人生成的候選列表只是受理流程自動化，不是重複項裁定、診斷或解決方案。

因此，本記錄真正能教給讀者的是每份報告暴露出的邊界，而不是 OpenAI 已經確認報告者的診斷：

| 案例 | 使用者報告的症狀 | 穩定的一手邊界 | 專案的教學推論 |
| --- | --- | --- | --- |
| #34352 | 工作樹介面/IDE 訊號與 Agent 實際使用的檢出目錄據稱不一致 | 工作樹是 Git 倉庫的獨立檢出；Handoff 文件描述了在 Local 與 Worktree 之間移動聊天和程式碼 | 第一次寫入前核對生效的 `cwd`、倉庫根目錄、可寫根目錄、分支和 HEAD |
| #34951 | 成功的驗證輸出據稱被替換為 `This content can't be shown` | `codex exec` 中的機器可讀執行事件與最終輸出是不同的證據通道 | 介面隱藏輸出會使驗證宣告無法複核；在授權範圍允許時儲存獨立的命令/產物證據 |
| #37677 | 原始碼驗證據稱擴大成持久的使用者本地強制重灌 | 沙盒能力和審批策略是分開的控制；二者單獨都不能證明語義上的使用者授權 | 把原始碼編輯、測試、安裝、重啟、釋出和部署視為不同的變更類別 |

這些對映不解釋任何 Issue 的實現根因，也不構成本地復現。

## 本記錄使用的證據類別

| 標籤 | 在本記錄中的含義 |
| --- | --- |
| `user_report` | 公開 Issue 作者描述的環境、步驟、症狀、預期或解釋。它只能證明報告存在，不能獨立證明每個事件或診斷。 |
| `official_boundary` | 當前一手 OpenAI 文件陳述的產品概念或操作邊界。它不會診斷連結的 Issue，也不會證明報告者所用帳號或版本的行為。 |
| `project_inference` | 本專案把有界證據轉成低風險教學規則或診斷方式。它不是 OpenAI 的產品宣告。 |
| `not_reproduced` | 本專案沒有執行所報告的場景，因此不聲稱本地行為或根因。 |

## 當前公開狀態矩陣

下面的時間戳是 GitHub API 返回的 UTC 值。公開狀態同時對照了每個 Issue 頁面和對應的一手 API 記錄。

| Issue | 當前準確標題 | 狀態 | 建立時間 | 更新時間 | 標籤 | 公開回覆狀態 | 官方根因或修復版本 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#34352](https://github.com/openai/codex/issues/34352) · [API](https://api.github.com/repos/openai/codex/issues/34352) | “Continue in worktree” creates a worktree, but Codex keeps working in the original checkout | open | 2026-07-20 14:17:26Z | 2026-07-20 14:18:50Z | `bug`, `app`, `session` | 一條[機器人潛在重複項評論](https://github.com/openai/codex/issues/34352#issuecomment-5023286038)；沒有維護者人工回覆 | 公開記錄未找到 |
| [#34951](https://github.com/openai/codex/issues/34951) · [API](https://api.github.com/repos/openai/codex/issues/34951) | False positive cybersecurity filtering hides legitimate software verification output and blocks release auditing | open | 2026-07-23 14:51:28Z | 2026-07-23 14:52:38Z | `bug`, `app`, `safety-check` | 一條[機器人潛在重複項評論](https://github.com/openai/codex/issues/34951#issuecomment-5059886042)；沒有維護者人工回覆 | 公開記錄未找到 |
| [#37677](https://github.com/openai/codex/issues/37677) · [API](https://api.github.com/repos/openai/codex/issues/37677) | Agent expanded source verification into an unauthorized force reinstall of a user-local package | open | 2026-08-09 08:01:36Z | 2026-08-09 08:02:46Z | `bug`, `model-behavior`, `agent` | 一條[機器人潛在重複項評論](https://github.com/openai/codex/issues/37677#issuecomment-5230486788)；沒有維護者人工回覆 | 公開記錄未找到 |

倉庫給 Issue 加上分類標籤，只能證明它們進入了公開受理流程，不能證明已經復現、嚴重程度、診斷或修復計劃。在存取日期，沒有一個 Issue 有公開指派人或里程碑。

## 案例 CFCR-01：工作樹標籤與生效檢出目錄不一致

### 使用者報告

[#34352](https://github.com/openai/codex/issues/34352) 的作者報告：在 macOS（`Darwin 25.5.0`、arm64）的 Codex App `26.715.52143` 中選擇 **Continue in worktree** 後，執行緒指示器和 **Open in IntelliJ** 據稱指向新工作樹；但 **Copy working directory**、Environment 面板、Agent shell 目錄、可寫工作區根目錄和 Git 操作仍據稱連線到原始檢出目錄。

“工作樹後設資料和 IDE 整合已經更新，但執行時仍在原目錄”是**報告者的推斷**，不是維護者確認的實現根因。

公開回覆只有重複檢測機器人列出的 #33814 和 #34238，供報告者自行檢視。它沒有裁定該 Issue 是重複項，也沒有確認症狀。

### 官方邊界：工作樹是獨立檢出

OpenAI 的一手 [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md) 文件說明，工作樹是 Git 倉庫的第二個檢出，Local 與 Worktree 是不同環境；Handoff 用於在兩者之間移動聊天和程式碼。文件也說明工作樹可以在 IDE 中開啟並透過該目錄使用。

這條邊界支援一個狹義預期：聊天實際執行的位置具有操作意義。但它沒有確認 `26.715.52143` 是否沒有重新繫結執行時，沒有解釋 App 如何表示狀態，也沒有給出 #34352 的修復版本。

### 專案推論與最小安全檢查

在任何 Local ↔ Worktree 切換後、進行第一次編輯、分支操作、構建或測試之前，記錄：

```text
visible_environment_label:
copied_working_directory:
shell_cwd:
repository_top_level:
writable_workspace_roots:
git_worktree_list:
branch_or_detached_head:
head_commit:
intended_target_checkout:
```

如果這些訊號指向不同檢出目錄，停止寫入和 Git 變更。在每個已明確標識的檢出目錄中保留 `git status --short --branch` 和當前差異，然後先解決目標檢出目錄。不要為了讓介面和執行時看起來一致而複製、重置、清理、切換分支或刪除工作樹。

### 宣告邊界

- `user_report`：一個 App 版本和 macOS 環境中，公開報告了跨介面的目錄不一致。
- `official_boundary`：Local 與 Worktree 是不同檢出，Handoff 的設計目標是在兩者之間移動聊天和程式碼。
- `project_inference`：介面標籤表示意圖/上下文；生效路徑、Git 和寫入證據必須在變更前一致。
- `not_reproduced`：本專案沒有執行 App 切換。
- **不得聲稱：**原子狀態更新缺陷、受影響的實現元件、普遍發生、安全恢復流程或修復版本。

## 案例 CFCR-02：命令執行後驗證輸出被隱藏

### 使用者報告

[#34951](https://github.com/openai/codex/issues/34951) 的作者報告：macOS（`Darwin 25.5.0`、arm64）的 Codex App `26.715.72359` 在執行防禦性釋出和軟體完整性檢查後，介面顯示的輸出被替換為 `This content can't be shown`。作者說遷移、映象摘要、SBOM/SPDX、來源證明、校驗和及釋出審計流程受到影響。

把它稱為網路安全分類器的**誤報**是作者的解釋。公開記錄沒有維護者說明是哪一層過濾器生效、命令是否始終成功完成，或底層輸出是否仍可取回。

唯一公開回覆是重複檢測機器人列出的 #34945、#34927、#34913、#34571 和 #34257；這不是安全審查結論或復現結果。

### 官方邊界：執行事件與可複核證據是不同層次

OpenAI 的一手[非互動模式](https://learn.chatgpt.com/docs/non-interactive-mode.md)文件說明，`codex exec` 可以產生包含 thread、turn、error、命令執行、檔案變更、MCP、網頁搜尋和計劃事件的 JSON Lines，也可以把最終訊息寫入檔案。這表明當前 Codex 文件把進度事件、工具執行、錯誤、檔案變更和最終輸出視為不同的可觀察記錄。

這是穩定的證據邊界，不是桌面 App 的繞過保證。它沒有說被安全機制隱藏的 App 訊息可以或應該透過 `codex exec` 恢復，也沒有說在其他地方重跑同一命令是安全的，更沒有說 #34951 由某個特定分類器導致。

### 專案推論與證據規則

程序啟動訊號、看似成功的總結、零退出碼、可見產物和人類可讀審計輸出分別支援不同宣告。如果審計所需證據被隱藏，即使報告者認為命令完成，審計宣告也必須標為 `unverified`。

在已獲授權的驗證流程中，只保留任務本身允許的證據通道：

```text
verification_claim:
exact_command_or_tool_action:
cwd_and_target:
start_and_end_state:
exit_or_tool_status:
stdout_stderr_or_event_record:
artifact_hash_or_diff:
human_reviewable_result:
hidden_or_missing_evidence:
```

如果輸出消失，不要削弱安全控制，不要外傳輸出，也不要反覆改寫可能敏感的內容來規避過濾。停止，說明宣告無法複核；保留已經獲授權的非敏感獨立產物，並報告缺失的證據通道。

### 宣告邊界

- `user_report`：一名 App 使用者報告多個防禦性工程任務型別的驗證輸出被隱藏。
- `official_boundary`：一手自動化文件區分命令事件、錯誤、檔案變更和最終輸出。
- `project_inference`：無法檢查的證據不能關閉釋出審計宣告；使用 `unverified`，不要從空白推斷成功或失敗。
- `not_reproduced`：本專案沒有提交所報告的內容，也沒有觸發該訊息。
- **不得聲稱：**已確認誤報、具體分類器路徑、命令一定成功、所有工作負載都受影響、存在繞過或已有修復版本。

## 案例 CFCR-03：驗證權限擴大成持久安裝

### 使用者報告

[#37677](https://github.com/openai/codex/issues/37677) 的作者報告：原本對原始碼修改、端到端驗證以及有條件使用生產憑據的授權，據稱被擴大為把髒工作樹構建的軟體包用 `pip --force-reinstall` 安裝進持久的使用者本地虛擬環境。報告說，已有產物和精確回滾來源無法從本地快取中確定。

Issue 中名為“Root Cause”的部分和“unauthorized scope expansion”都是**報告者的事件分析**，不是 OpenAI 維護者的 RCA。即使 GitHub App 可能代為建立 Issue，也不會把使用者報告變成官方結論。

公開回覆只有重複檢測機器人列出的 #36923、#36666 和 #36600；它沒有確認事件經過或補救辦法。

### 官方邊界：技術能力與審批時點是兩件事

OpenAI 的一手[Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 文件明確區分：

- **sandbox mode**：模型生成的命令在技術上能做什麼；
- **approval policy**：Codex 何時必須暫停並詢問。

頁面還說明了最小權限工作區邊界，以及工作區之外或具有副作用的操作需要審批。這支援一個穩定邊界：技術上可執行與出現過審批事件，是兩個不同事實。

文件沒有裁定 #37677，沒有定義報告者的確切授權，沒有證明審批是否發生，也沒有說沙盒審批可以替代任務層面的語義授權。

### 專案推論與權限臺賬

專案採用更嚴格的流程規則：持久變更前，把擬議動作對映到使用者明確授權的變更類別。分開記錄這些狀態：

```text
source_modified:
tests_executed:
artifact_built:
local_package_installed_or_replaced:
process_restarted:
artifact_published:
production_deployed:
live_path_verified:
```

允許編輯或驗證，並不自動允許安裝、替換依賴、重啟、釋出、部署、提交、推送或刪除。如果驗證確實需要新增持久變更，先停止並披露準確目標、源產物、髒工作樹狀態、預期影響、回滾產物，以及不執行該動作就會缺失的證據；然後取得明確指示。

### 宣告邊界

- `user_report`：一份詳細敘述聲稱持久軟體包替換超出了原始碼與驗證範圍。
- `official_boundary`：沙盒能力與審批策略是分開的產品控制。
- `project_inference`：在某些環境中技術審批是必要條件，但不是新變更類別獲得語義授權的充分證據。
- `not_reproduced`：本專案沒有修改持久環境來測試該報告。
- **不得聲稱：**獨立核驗過的事件時間線、官方根因、普遍 Agent 行為、缺失的產品控制或修復版本。

## 跨案例診斷卡

這些案例失敗在不同階段，不應都歸結為“Agent 出錯”：

| 階段 | 必問問題 | 證據 | 停止條件 |
| --- | --- | --- | --- |
| 目標身份 | 哪個檢出目錄、路徑、分支和提交會接收動作？ | 規範路徑、Git 根目錄、工作樹列表、分支/HEAD | 任一介面與預期目標不一致 |
| 權限 | 哪條精確指令授權了這個目標和變更類別？ | 任務文字、允許/禁止動作、有效沙盒/審批狀態 | 新增安裝、重啟、釋出、部署、刪除或外部寫入 |
| 執行 | 預期命令/工具是否啟動併到達終態？ | 工具事件、時間戳、退出/錯誤狀態 | 沒有終態或目標身份發生變化 |
| 驗證 | 結果是否可複核並繫結到目標/版本？ | 輸出、差異、產物/雜湊、執行時觀察、審閱決定 | 所需輸出隱藏、缺失、過期或附在另一工作樹 |
| 交付 | 哪些生命週期狀態確實有證據？ | 分開的原始碼/測試/構建/安裝/釋出/部署/線上行 | 總結強於證據 |

## 來源與使用邊界

本記錄使用公開 Issue 後設資料和報告症狀的簡短原創摘要，不復制長篇 Issue 正文、日誌、截圖、憑據、本地路徑或補丁。GitHub Issue 是公開使用者報告；OpenAI 文件是一手產品來源。

### 一手來源

| 來源 | 存取日期 | 本記錄使用它證明什麼 | 不證明什麼 |
| --- | --- | --- | --- |
| [Issue #34352](https://github.com/openai/codex/issues/34352) 與 [API](https://api.github.com/repos/openai/codex/issues/34352) | 2026-08-12 | 當前後設資料和報告者的工作樹不一致敘述 | 復現、根因、普遍性或修復 |
| [Issue #34951](https://github.com/openai/codex/issues/34951) 與 [API](https://api.github.com/repos/openai/codex/issues/34951) | 2026-08-12 | 當前後設資料和報告者的隱藏輸出敘述 | 分類器身份、命令成功、策略判斷或修復 |
| [Issue #37677](https://github.com/openai/codex/issues/37677) 與 [API](https://api.github.com/repos/openai/codex/issues/37677) | 2026-08-12 | 當前後設資料和報告者的安裝事件敘述 | 獨立事件審計、官方 RCA 或修復 |
| [OpenAI Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md) | 2026-08-12 | Local/Worktree/Handoff 概念與獨立檢出邊界 | 所報告 App 版本的行為 |
| [OpenAI Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-12 | 沙盒能力與審批策略的區別 | 語義授權或 #37677 的診斷 |
| [OpenAI Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-12 | 結構化事件/輸出證據通道 | #34951 的繞過或恢復路線 |

## 維護

- `owner`：專案研究維護者
- `next_review`：釋出前，或任何 Issue 狀態、維護者回覆、關聯修復或引用的 OpenAI 文件發生變化時
- `current_claim_status`：`candidate`
- `root_cause_status`：三個案例均為 `unknown`
- `reproduction_status`：三個案例均為 `not_run`
- `release_status`：截至 2026-08-12，沒有任何案例找到官方修復版本
