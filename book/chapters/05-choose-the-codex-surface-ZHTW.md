<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: chapter-05-choose-the-codex-surface | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 75ae63be087590c77a1ff3556415e272046489fc -->

# 第 5 章：選擇正確的 Codex 工作面

**狀態：** `candidate`。本章給出了有結構的決策方法和有來源支撐的產品邊界，
但尚未透過獨立學習者前測。不要從本章推斷某個賬戶能力、Cloud 執行結果或模型比較結論。

## 本章要解決的問題

同一個目標可能從桌面應用、CLI、IDE 擴充套件或網頁流程開始；它也可能在本機、
Git Worktree 或 Cloud 環境中執行。這些是不同的決策。

人們經常把多個階段壓縮成一句話：

~~~
“瀏覽器登入成功了，模型出現在選擇器裡，環境也初始化完成，所以任務可以開始。”
~~~

這句話可以在幾個彼此獨立的地方出錯：目標倉庫未必可讀；所選模型未必在該工作面可用；
終端、瀏覽器、聯結器或檔案系統工具可能不存在；Cloud 的 setup 指令碼或許能聯網，
後續 agent 階段卻不能；介面雖然顯示 Worktree，shell 或 IDE 卻仍指向另一個檢出目錄。

本章採用更有用的順序：

~~~
選擇工作面
→ 選擇入口
→ 核驗目標和賬戶邊界
→ 核驗模型和工具
→ 執行最小行動
→ 交付前審查證據
~~~

這裡的“工作面”是工作在哪裡執行、改動落到哪裡；“入口”是人怎樣啟動和審查這項工作。
CLI、IDE、桌面端和網頁端不是 Local、Worktree、Cloud 的可互換別名。

## 學習目標

完成本章後，你應該能夠：

- 依據上下文、資料邊界、副作用、證據和恢復要求，在 `Local`、`Worktree`、`Cloud` 之間選擇；
- 區分工作面與桌面端、CLI、IDE 或網頁入口；
- 將目標資源訪問、模型可用性和工具可用性作為彼此獨立的斷言測試；
- 分開記錄 Cloud 的 `setup` 與 `agent` 證據，包括網路階段和秘密資訊生命週期；
- 產出一份 `surface-decision.md`，記錄被拒絕和未觀察到的選項，而不只記錄自己偏好的選項；以及
- 當下一條證據需要的許可權超過任務應得範圍時，安全地停止。

## 現實入口：階段才是線索

專案的現場研究收集了 GitHub Issues、Stack Exchange 與其他公開討論中的使用者報告。
它們是症狀報告，不是本地復現、官方根因或保證可用的修復方案。它們的診斷價值在於：
顯示使用者經常把哪些斷言混為一談。

| 公開報告類別 | 報告者觀察到什麼 | 它**不能**證明什麼 | 第一個安全檢查 |
|---|---|---|---|
| OAuth 成功，token 交換失敗 | 瀏覽器授權頁完成，但客戶端無法完成交換 | CLI 會話、目標 host 或倉庫可用 | 將授權、回撥、交換和第一次無害資源讀取記成四個階段 |
| 自定義 provider 只暴露一個工具 | 配置被接受，但會話中沒有 shell、檔案或瀏覽器工具 | 模型或 provider 能執行缺失的動作 | 儲存實際工具清單；分開測試註冊與呼叫 |
| Worktree 與 checkout 不一致 | UI 顯示 Worktree，但 shell `cwd`、IDE 根目錄、補丁目標和 Git 後設資料不一致 | 實際編輯程序已經被隔離 | 讀取絕對路徑、`.git` 形態、工作區根目錄和 `git status`；不一致就停止寫入 |
| Cloud setup 看似成功，任務卻不能使用秘密或網路 | 依賴安裝或出現 setup 標記，隨後 agent 階段無法訪問服務 | setup 網路、秘密和 agent 網路是同一種能力 | 分開記錄 setup 日誌、agent 日誌、網路階段、秘密生命週期和結果 diff |
| GitHub 或其他 host 被 allowlist 攔截 | 請求在代理、沙盒或企業網路策略下失敗 | 開放全部網路是正確或獲准的修復 | 在申請狹窄變更前，區分沙盒策略、代理 allowlist、DNS/TLS 和企業防火牆假設 |

閱讀[現場問題索引](../evidence-library-ZHTW.md#source-notes)、
[工作面研究](../evidence-library-ZHTW.md#source-notes)和
[論壇研究](../evidence-library-ZHTW.md#source-notes)，獲取原始連結和日期。
研究記錄刻意寫明本專案沒有復現什麼。

### 現場案例：第一次寫入前先核驗目標

![將現場訊號對映到最小安全響應](../../assets/teaching/field-signal-to-safe-degradation-red-black.svg)

有邊界的案例 [FC-WORKTREE-01](../evidence-library-ZHTW.md#source-notes)
把 issue #34352 中帶日期的公開報告變成目標身份練習。2026-08-12 的研究快照沒有記錄到
公開維護者對根因的確認，本專案也沒有復現該報告。它的價值更窄：每次從 Local 交接到
Worktree 後，在編輯、分支操作、構建或測試前，對比預期 checkout 與 shell `cwd`、Git 頂層、
worktree 列表、branch/HEAD、可寫根目錄。只要有一個訊號不一致，安全結果就是停止寫入，
而不是猜測哪個工作面才算權威。

## 1. 人們容易混淆的三個層次

### 工作面：執行和改動發生在哪裡

官方環境文件描述了三種 Codex chat 工作面：

| 工作面 | 任務在哪裡執行 | 它適合什麼 | 它不能證明什麼 |
|---|---|---|---|
| `Local` | 使用者機器上的當前專案目錄 | 快速檢查、小型本地改動、必須保留在當前 checkout 的工作 | 當前目錄安全、乾淨或確實是正確目標 |
| `Worktree` | 使用者機器上的獨立 Git worktree | 將改動與主 checkout 隔離，並審查聚焦的 diff | 每個程序都切換到同一個 worktree，或網路/賬戶許可權已經改變 |
| `Cloud` | 配置好的遠端環境 | 適合有遠端隔離執行時和倉庫 checkout 的長時或並行工作 | 本次執行中賬戶、倉庫、工具、網路、秘密或最終 diff 都可用 |

`Local` 與 `Worktree` 仍然是本地執行。Worktree 是 Git 隔離機制，不是通用安全邊界；
Cloud 環境是執行邊界，不證明它的 setup、agent 執行時或外部連線已經就緒。

### 入口：人怎樣啟動和審查

入口改變的是互動方式，並不會自動改變執行邊界：

| 入口 | 優勢 | 常見審查證據 |
|---|---|---|
| 桌面應用 | 可見的任務狀態、環境選擇和互動式審查 | 環境標籤、任務事件、摘要、diff 和人工確認 |
| CLI | 明確路徑、命令、指令碼和可重複的本地工作 | `cwd`、命令輸出、退出碼、Git status、diff 和儲存的日誌 |
| IDE 擴充套件 | 就近的編輯器上下文、選中的檔案和編輯器內 diff | 工作區根目錄、選中上下文、補丁和聚焦 diff |
| Web / Cloud 流程 | 遠端 setup、較長執行和交接式審查 | 倉庫/分支、setup 證據、agent 證據、摘要和 diff |

例如，CLI 可以在 Local checkout 或 Worktree 中執行；IDE 可以連到 Worktree，同時另一個 shell
仍停在原 checkout。因此，“我用了 CLI”不足以回答“編輯到底發生在哪裡”。

## 2. 能力是一條鏈，不是一枚登入徽章

把可用性視為一串斷言：

~~~
官方產品支援
→ 當前賬戶 / 工作區 / 組織授權
→ 目標資源可讀
→ 候選模型在此工作面可用
→ 所需工具已經註冊
→ 所需工具在當前階段可呼叫
→ 具體行動完成
→ 結果已驗證
~~~

每一個箭頭都需要獨立證據。上游成功不能替代下游檢查。

| 觀察 | 它能支援什麼 | 單獨不能支援什麼 |
|---|---|---|
| 瀏覽器授權頁完成 | 授權頁達到成功狀態 | token 交換、目標 host 訪問或倉庫訪問 |
| 模型出現在選擇器 | 模型在選擇時可見 | 它在另一工作面可用、工具訪問或任務質量 |
| 目錄可寫 | 該路徑在該時刻寫入探針成功 | 倉庫目標正確、遠端授權或安全交付 |
| 出現工具名稱 | 某項能力被宣傳或註冊 | 工具能執行、擁有所需憑據或可執行所需副作用 |
| Cloud setup 安裝了依賴 | setup 到達了該依賴步驟 | agent 階段網路、秘密訪問、任務完成或已驗證 diff |
| UI 顯示 `Completed` | 產品狀態被顯示 | 審查、測試成功、部署、push 或使用者驗收 |

鏈條斷裂時，指出斷的是哪個階段。不要把“這個任務”的斷言偷偷改成“產品通常支援”，
以此讓宣告看起來更強。

## 3. 用五道門選擇工作面

按以下順序評估候選工作面。順序很重要：它避免讓一個方便的入口或偏好的模型驅動不安全的環境選擇。

### Gate 1：上下文

該工作面能否讀取任務需要的精確專案規則、目標檔案、版本和驗收輸入？答案未知時，
不要從倉庫名或一次成功登入中推斷答案。

### Gate 2：資料邊界與隔離

資料應留在當前機器、一次性 worktree 還是獲准的遠端環境？任務是否含有不能跨越邊界的
秘密、客戶資料、私有原始碼或未提交工作？遠端工作面必須先證明資料轉移有必要；本地工作面也必須有可恢復基線。

### Gate 3：行動與副作用

任務是隻讀、本地編輯、分支變更、倉庫 push、外部 API 呼叫還是生產動作？選擇滿足必需行動的最小工作面。
不要只因它讓診斷更簡單，就授予網路或遠端寫入許可權。

### Gate 4：證據

另一個人能否檢查與宣告相對應的證據？例如路徑回顯、目標讀取、工具清單、命令輸出、diff、
測試結果、Cloud 日誌或人工批准。高風險任務中，能執行行動卻不能留下可審查證據的工作面不是好選擇。

### Gate 5：恢復

認證失敗、網路消失、依賴缺失或 Agent 產生部分改動時，你能保留狀態並從已知檢查點繼續嗎？
如果不能，拒絕該工作面，或把任務縮小為只讀探針。

### 實用選擇表

| 任務形態 | 可能候選 | 原因 | 行動前所需證明 |
|---|---|---|---|
| 閱讀公開文件併產出本地筆記 | `Local` | 不需要遠端寫入或特殊隔離 | 正確 checkout、來源列表和輸出路徑 |
| 編輯共享倉庫，同時保護當前未提交工作 | `Worktree` | 獨立 Git 樹有助於隔離基線和 diff | Worktree 路徑、branch/commit、`.git` 形態和 Git status |
| 在已批准倉庫中執行長時、並行變更 | `Cloud` | 遠端隔離和交接可能適合該任務 | 已連線倉庫、環境、setup/agent 階段、日誌和最終 diff |
| 向外部聯結器傳送客戶資料 | 不自動選擇 | 資料所有者、目的地、授權和保留期需要明確審查 | 精確載荷、目標賬戶、批准、回滾/補償和工具證據 |
| 診斷缺失工具或不可訪問的路徑 | 先用當前工作面的只讀檢查 | 保留失敗邊界，避免盲目擴大許可權 | 工具清單、絕對路徑、配置形態和錯誤輸出 |

這張表給的是候選項，不是自動授權。即使某個工作面通常合適，任務也可能是 `blocked`。

## 4. 行動前先寫決策卡

對於不只是只讀說明的任務，先建立 `surface-decision.md`。保留被拒絕的卡片：它們記錄為什麼
一個看似合理的選項沒有被選擇。

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:

model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | concrete action
setup_evidence:
agent_action: not_applicable | concrete action
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:

recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

沒有執行或未收集證據時，使用 `not_observed`。不要為了填滿表格而把缺失證據改寫成 `yes` 或 `no`。

## 5. Cloud 分為 setup 階段與 agent 階段

官方 Cloud 文件將 setup 與 agent 執行視為生命週期中的不同部分。setup 可以在有網路時安裝依賴；
之後的 agent 階段通常離線，除非環境另有配置。為環境配置的秘密資訊也可能只在 setup 可用，
並在 agent 階段之前移除。

分開記錄以下欄位：

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

“setup 指令碼安裝了包”只能證明 setup，不能證明 agent 能訪問該包的服務。“環境設定裡存在秘密”
也不能證明任務執行時能讀取它。預設安全做法是在當前階段和資料路徑得到證明前暫停外部呼叫。

## 6. 小型可觀察實驗：同一任務，三張卡

**實驗狀態：** `not_run`。下面是練習設計，不是本倉庫已經在 Local、Worktree 或 Cloud 中執行過的記錄。

### 準備

準備一個可丟棄的 Markdown 檔案、一份短驗收清單和一個沒有 remote 的臨時 Git 倉庫。
不要使用秘密、私有資料、外部訊息、安裝、釋出、push 或生產目標。

### 任務

固定任務是：

> 讀取 `brief.md`，在 `draft.md` 中做一處已命名的文字修改，執行一項只讀格式檢查，並報告 diff。不要改動其他檔案。

### 步驟

1. 在執行前填寫 Local、Worktree 與 Cloud 三張卡。
2. 對每個候選項應用五道門。
3. 記錄每個候選項的絕對路徑、目標讀取、工具清單、模型可見性和允許副作用。
4. 至多選擇一個證據充分的選項執行無害修改；其餘選項標為 `rejected`、`blocked` 或 `not_observed` 並說明原因。
5. 儲存 diff、檢查輸出、run-id 和準確的工作面/入口。
6. 路徑、工具、目標或階段證據變化時，停止並儲存檢查點，不要擴大許可權。

### 最低證據

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

合格記錄不只顯示檔案改過；還應說明為什麼選這個工作面、為什麼拒絕其他工作面，以及哪些證據支援最終宣告。
若 Cloud 未執行，Cloud 卡必須寫 `not_observed`。

### 證據

儲存決策卡、絕對路徑、目標讀取結果、工具清單、模型可見性、階段狀態、diff、檢查輸出和審查者記錄。
缺失的觀察保持 `not_observed`，不要用介面標籤補齊。

## 7. 失敗模式與安全降級

| 失敗 | 正確解釋 | 安全降級 |
|---|---|---|
| 登入成功，目標讀取失敗 | 身份與資源訪問是不同階段 | 停在目標讀取證據；任務保持 `blocked` |
| 模型可見，工具缺失 | 模型選擇與工具註冊是不同階段 | 改做文字計劃或已知支援的工作面；不盲目擴大許可權 |
| 選定 Worktree，路徑卻不一致 | 隔離後設資料與程序工作目錄不一致 | 停止寫入；回顯路徑、檢查 Git 狀態並取得人工確認 |
| Cloud setup 透過，agent 失敗 | setup 證據不覆蓋 agent 證據 | setup 記為 `passed`，agent 記為 `failed`/`not_observed`，任務記為 `blocked` |
| 網路請求被攔截 | 原因可能是沙盒、代理、DNS/TLS 或企業策略 | 縮小請求並儲存錯誤；不要為了重試直接改成不受限網路 |
| 長時間沒有新事件 | 證據不足以稱任務正在進展或已經完成 | 按工作面政策停止/取消，並保留最後檢查點 |

這些是診斷狀態，不是通用產品 bug 診斷。社群解決辦法在相關官方行為與當前執行時被核驗前，只是一個假設。

## 反思

請依據決策卡和證據，而不是記憶，回答：

- 哪一道門改變了選擇：上下文、資料邊界、行動、證據還是恢復？
- 哪個上游成功最容易讓人過度宣告？
- 選中的入口幫助的是執行、審查，還是兩者？
- 哪一項新增觀察能區分“選錯工作面”與“缺賬戶許可權或缺工具”？
- 如果任務含有私有客戶資料，資料邊界和批准記錄需要怎樣變化？

## 遷移任務

將方法遷移到一個研究任務：瀏覽器讀取公開來源、本地 shell 儲存脫敏證據、隔離環境處理敏感檔案。
重新填寫決策卡；不要把本章的工作面選擇直接複製到新任務。

## 驗收清單

滿足以下條件再進入下一階段：

- [ ] 能解釋 `Local`、`Worktree` 與 `Cloud` 的區別；
- [ ] 能解釋桌面端、CLI、IDE 和網頁是入口，而非與工作面同一類別；
- [ ] 能產出三張卡，其中包含選中項以及明確的拒絕/未觀察原因；
- [ ] 能分開記錄賬戶授權、資源可讀性、模型可見性、工具註冊、工具呼叫、行動完成和結果審查；
- [ ] 能分開記錄 Cloud setup 與 agent 證據、網路階段和秘密生命週期；以及
- [ ] 當下一項證明需要比任務協議更寬的許可權時，能夠停止或降級。

## 來源與更新邊界

決策方法是穩定的教學方法；產品工作面、模型矩陣、許可權模式、Cloud 生命週期、工具可用性和入口支援是易變事實。
提出當前產品斷言前，請查閱帶日期的來源記錄。

| 易變事實 | 一手來源 | 訪問日期 | 適用邊界 |
|---|---|---|---|
| Codex chat 工作面包括 Local、Worktree 與 Cloud | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | 官方環境說明；不證明本賬戶或本任務可使用每個工作面 |
| Cloud setup 與 agent 是不同階段 | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | 官方 Cloud 生命週期；不證明這裡執行過 Cloud 任務 |
| setup 網路、agent 網路和秘密生命週期有不同邊界 | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | 官方配置說明；組織策略和執行時證據仍可能不同 |
| Local 許可權與批准層不同 | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | 官方安全模型；不證明本會話的實際配置 |
| CLI、IDE、Cloud 與模型支援隨工作面而不同 | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | 官方產品頁；賬戶、工作區、灰度和版本會影響可用性 |

[官方事實卡](../evidence-library-ZHTW.md#source-notes)提供專案中帶日期的摘要與限制。
[現場問題研究](../evidence-library-ZHTW.md#source-notes)及相關工作面/論壇記錄提供公開使用者報告；
它們都不能替代當前賬戶級或執行時觀察。

## 本章證據邊界

本章是 `candidate` 內容工件；練習仍為 `not_run`。倉庫沒有建立 Cloud 環境、執行三卡任務、
驗證模型矩陣，也沒有復現每條公開報告。未來驗證需要儲存 run-id、環境、精確輸入、工具清單、
diff、檢查輸出與審查者，才能改變這些宣告。

本簡體中文譯文為可讀的 `in-progress` 翻譯切片，獨立語言審校尚未完成；它不是已驗證譯文，
也不表示課程已經透過獨立中文審校或學習者驗證。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章節導覽">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-ZHTW.md" aria-label="上一章: 第 4 章 · Context, permissions, and the Agent action boundary">← 上一章<br><strong>第 4 章 · Context, permissions, and the Agent action boundary</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-ZHTW.md" aria-label="下一章: 第 6 章 · Model selection is not model worship">下一章 →<br><strong>第 6 章 · Model selection is not model worship</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
