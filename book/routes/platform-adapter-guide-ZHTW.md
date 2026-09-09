<!-- Traditional Chinese candidate aligned to the 2026-09-08 English source; independent language review pending. -->
<!-- content_id: platform-adapter-guide-route | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2026-09-08-platform-encyclopedia-v14 -->

# LLM 平台與用戶端實用百科：選擇、安裝並使用合適的工作介面

**狀態：** candidate。**執行狀態：** not_run。

大多數人並不是從某個平台開始，而是從眼前的工作開始：讀懂一頁內容、改寫一段說明、檢查一個檔案，或讓一項較長的工作繼續推進。同一個產品名稱，可能對應瀏覽器聊天、手機 App、桌面 App、IDE 整合、終端機 Agent，或一台託管電腦。這些工作介面不會自動共用檔案、憑證、權限或歷史紀錄。

把本頁當作實用參考，不是一張「所有工具都要安裝」的清單。它依序回答五個問題：你要做什麼工作、哪種用戶端適合、工作會在哪裡執行、如何找到廠商目前的設定入口，以及第一次嘗試什麼才比較安全。完成設定不等於驗證成功，也不等於帳戶符合資格、檔案可存取，或第一次任務已經完成。

本頁不是產品排名，也不保證每位讀者都能使用所有帳戶、作業系統、地區、方案或功能。它保留 [通用基礎路線](universal-core-foundations-ZHTW.md) 中可遷移的方法：定義任務、限制權限、檢查結果、保留證據。命令、方案、可用性和用戶端支援都會變動；來源回執記錄所查閱的官方文件及日期，但不代表某個安裝程式、帳戶或任務一定能在你的環境中運作。

> 先選工作介面，再選命令。熟悉的產品名稱，並不能告訴你檔案是在本機還是雲端，也不能告訴你用戶端能否在聊天之外採取行動。

## 先從工作開始，再選擇產品

| 眼前要做的事 | 從這裡開始 | 只有工作確實需要時才加入 |
| --- | --- | --- |
| 提問、學習、改寫或比較已提供的文字 | 網頁或行動版聊天 | 檔案、網路、擴充功能或帳戶連結 |
| 讀取或修改電腦上的檔案 | 桌面 App、IDE 整合或終端機 Agent | 真實儲存庫、寫入權限或外部工具 |
| 重複執行命令列工作或檢查專案 | 可丟棄資料夾中的終端機 Agent | 自動化、憑證、依賴變更或發佈 |
| 在 IDE 中處理 Google Cloud 資源 | 你正在使用的 IDE 對應的 Google Cloud Code | 指定的雲端專案、部署、金鑰或生產資源 |
| 筆電闔上後仍讓工作繼續 | 有明確文件說明的雲端或託管工作介面 | 真實憑證、私人資料或不可逆操作 |

接著按五步走：

1. 說清楚工作：判斷需要的是對話、本機專案、IDE、終端機還是託管電腦。
2. 選擇最小的工作介面：純文字工作先用純文字聊天，只有在工作需要時才加入檔案、擴充功能、工具或雲端存取。
3. 使用廠商目前的入口：依照具體產品和作業系統，開啟官方下載、安裝或登入頁面。
4. 先做一次無害的嘗試：先要求解釋、摘要或草稿，再考慮允許編輯或外部操作。
5. 留下回執：記錄用戶端、執行位置、可見版本、日期、權限界線和結果。安裝、登入、任務完成與接受結果，是四件不同的事。

## 先分清你讀到的是哪一種說法

本頁內容分成三類：

- **方法：** 定義結果、限制權限、檢查輸出等可長期沿用的習慣；
- **產品事實：** 廠商目前的名稱、用戶端、命令、要求或功能，並附上官方來源與存取日期；
- **執行證據：** 某台明確的電腦、帳戶、工作區或任務實際發生了什麼。

發佈公告只能說明廠商聲稱發佈了什麼；使用者經歷可以說明某個話題為什麼值得注意。這兩者都不能證明某項功能對所有帳戶可用，也不能證明工作流程可靠。對於變動快速的產品或公共報導，請遵守[時效內容政策（locale-neutral）](../evidence-library-ZHTW.md#timely-content-policy)，並保留來源、存取日期、適用範圍和未解決問題。

## 把時效話題放進有日期的文章

百科路線負責讓讀者找到正確的產品和工作介面；有日期的現場筆記負責解釋最近發生了什麼。把兩件事分開，才能更新時效話題，而不用重寫整條學習路線。

| 話題 | 接著閱讀 | 它可以幫你判斷什麼 | 它不能證明什麼 |
| --- | --- | --- | --- |
| Grok Bot | [Grok Bot 現場筆記（locale-neutral）](../evidence-library-ZHTW.md#grok-bot-field-note) | 是否值得為你的帳戶檢查低風險、可持續的託管工作流程 | 帳戶可用、執行可靠、完整可稽核，或對一般使用者都有效 |
| DeepSeek Harness | [DeepSeek Harness 來源回執（locale-neutral）](../evidence-library-ZHTW.md#deepseek-harness-source-receipt)，再閱讀下方安裝部分 | 應檢查哪些官方入口、設定、工作區和安全界線 | 本機安裝成功、完整支援 Windows/macOS，或已達到生產環境安全要求 |
| 本頁列出的平台 | [統一平台來源回執（locale-neutral）](../evidence-library-ZHTW.md#unified-platform-source-receipt)及 [2026-09-08 獨立複核（locale-neutral）](../evidence-library-ZHTW.md#platform-encyclopedia-independent-review-2026-09-08) | 目前來源記錄支援哪個產品名稱、用戶端、執行位置和官方入口 | 安裝成功、帳戶有資格、用戶端等價或已可投入生產 |
| 新發佈或正在流傳的公共話題 | [時效內容政策（locale-neutral）](../evidence-library-ZHTW.md#timely-content-policy) | 如何記錄「為什麼現在值得講」以及讀者可以安全檢查什麼 | 永久產品事實、代表性使用者研究或已量測的成效 |

Grok Bot 現場筆記只把讀者提供的個人經歷當作需求訊號。它是有來源界線的原創參考，不是產品評測，也不是學習成果。新增時效文章前，請填寫[時效內容範本（locale-neutral）](../evidence-library-ZHTW.md#timely-content-template)，在 update-registry.yaml 的 timely-content 列登記，在 locale-matrix.yaml 記錄英文來源與各語言狀態，並重新產生 Reader 與搜尋投影。來源過時或範圍改變時，應縮小聲明或移除 Reader 連結，不要讓舊事實看起來永久有效。

## 找到適合你的路線

如果你剛開始了解 LLM，請先閱讀[通用基礎路線](universal-core-foundations-ZHTW.md)。如果已經掌握基礎，可以從下表跳到相關入口：

| 目標 | 入口 | 停下來檢查 |
| --- | --- | --- |
| 理解基本 LLM 工作流程 | [通用基礎路線](universal-core-foundations-ZHTW.md) | 能否用自己的話解釋結果 |
| 選擇網頁、行動版、桌面、IDE、終端機或雲端工作面 | [平台與用戶端地圖](#platform-and-client-map) | 工作在哪裡執行，以及它能看到什麼 |
| 理解容易混淆的產品名稱 | [容易混淆的名稱](#names-that-are-easy-to-confuse) | 名稱指的是產品、用戶端還是執行環境 |
| 安裝產品並完成安全的第一次嘗試 | [安裝並完成第一次安全嘗試](#install-and-make-a-first-safe-attempt) | 命令是否來自官方，以及會改變什麼 |
| 設定 Windows 或 macOS | [Windows 與 macOS 安裝路徑](#windows-and-macos-setup-paths) | 作業系統、架構、Shell 和 PATH |
| 判斷結果是否真的可接受 | [四種證據狀態](#evidence-states) | 是否有任務結果和人的驗收決定 |

<span id="platform-and-client-map"></span>

## 平台與用戶端地圖

先辨識工作介面，再辨識執行環境。共用品牌不代表共用檔案系統、Shell、帳戶或權限模型。

### 把四個層次分開

1. **模型：** 產生回答或提出行動建議的系統。
2. **產品：** 提供模型、帳戶和政策層的廠商體驗。
3. **用戶端：** 你開啟的瀏覽器、手機 App、桌面 App、IDE 擴充功能或終端機程式。
4. **執行環境：** 工作實際發生的地方：你的裝置、容器、託管機器或廠商服務。

一個產品可以有多個用戶端，也可以對應多種執行環境。安裝桌面 App，不能證明網頁版、CLI 和雲端 Agent 共用相同工具或權限。

### 一張真的能用的用戶端地圖

| 產品或產品家族 | 本頁涉及的用戶端 | 工作通常在哪裡執行 | 適合的第一次使用 | 要與什麼分開 |
| --- | --- | --- | --- | --- |
| [ChatGPT](https://chatgpt.com/) | 網頁、行動版和桌面 App | 廠商服務；桌面 App 也可能使用你明確選取的本機資料夾 | 不開啟額外工具，改寫或比較已提供的文字 | ChatGPT 對話不會自動變成本機編碼工作階段 |
| [Codex](https://developers.openai.com/codex/quickstart) | CLI、IDE 整合、桌面端和 Cloud/Web | 本機終端機或編輯器、桌面端選取的專案，或託管 Codex 環境 | 解釋一個檔案，再檢查提議的差異 | 本機、桌面和託管工作面不同 |
| [Claude Code](https://code.claude.com/docs/en/overview) | 終端機、IDE 整合、桌面端和瀏覽器/雲端 | 本機 Shell/編輯器，或 Anthropic 託管的工作面 | 先解釋可丟棄專案，再要求小幅變更 | 桌面端與 CLI 契約不同 |
| [Google Cloud Code](https://cloud.google.com/code/docs) | VS Code、IntelliJ/JetBrains 和 Cloud Shell | 所選 IDE 或 Google 託管的 Cloud Shell | 開啟範例，檢查專案和憑證上下文 | 不是 Claude Code、Codex Cloud 或通用終端機 Agent |
| [Gemini](https://gemini.google.com/) | 網頁、行動版、Gemini CLI 和 IDE 整合 | 廠商聊天服務、本機終端機/編輯器或 IDE 整合介面 | 先做純文字聊天；需要終端機時再用 CLI | 網頁/行動版、CLI 和 IDE 上下文不同 |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) | Web UI 及文件列出的 CLI/profile | 本機 Node 程序和選定的本機工作區 | 在可丟棄工作區啟動 Web UI | 不是 DeepSeek 聊天產品，也不是一般安全保證 |
| [Grok](https://docs.x.ai/grok/overview) | 網頁和行動版聊天 | xAI 消費者助理服務 | 提問、起草或比較已提供的文字 | Grok Bot 和 Grok Build |
| [Grok Bot](https://docs.x.ai/grok-bot/get-started) | macOS、Windows、Linux 桌面 App，以及 iOS/Android 伴侶 App | 透過用戶端存取的持久化雲端電腦 | 起草清單或摘要公共頁面 | Grok 聊天和 Grok Build |
| [Grok Build](https://docs.x.ai/build/overview) | 終端機 TUI、無頭 CLI 和 ACP | 本機終端機或編輯器整合 | 在可丟棄專案檢查內容，再要求小幅變更 | Grok Bot 的託管電腦 |

三個 Grok 列是刻意分開的。Grok Bot 雲端電腦內的終端機，是該託管環境提供的能力；它不是 Grok Build 文件中的本機 grok 命令。

使用地圖時依序做四件事：說清楚工作；選能提供所需上下文的最小用戶端；按作業系統、架構、帳戶和地區檢查官方設定頁；記錄用戶端和執行環境。如果你答不出「哪個用戶端看到了哪些檔案，以及行動在哪裡發生」，設定就還不可重現。

### 平台卡片：每種工作介面適合做什麼

#### ChatGPT

ChatGPT 是通用對話和工作介面。網頁、行動版和桌面端是不同用戶端，不能據此證明三者擁有相同檔案、工具或權限。桌面端選取專案或資料夾會改變交給應用程式的上下文；先從已提供的文字開始，只有工作需要時才加入明確選取的本機檔案。ChatGPT 不是 Codex 的另一個名稱，成功聊天也不是本機編碼執行的證據。

#### Codex

Codex 是編碼工作產品家族，官方工作面包括終端機 CLI、IDE 整合、桌面體驗以及雲端/網頁工作面。本機終端機、桌面專案和託管任務可能有不同檔案、Shell、核准流程和網路存取。從可丟棄專案與一個可檢查的結果開始，並清楚保留雲端界線。

#### Claude Code

Claude Code 是 Anthropic 命名的編碼 Agent 產品，涵蓋終端機、IDE、桌面和瀏覽器/雲端。在 Windows 上先查看官方 Shell 路徑，不要預設是 Bash；原生安裝可使用 PowerShell，需要 Bash 工具時，Git for Windows 也可能很重要。把 CLAUDE.md、專案設定、hooks 和 skills 視為需要審閱的專案上下文。

#### Google Cloud Code

Google Cloud Code 是面向雲原生開發的 IDE 擴充功能家族，官方為 VS Code、IntelliJ/JetBrains 和 Cloud Shell 提供不同路徑。不要把 Cloud Code 當成 Claude Code 或 Codex Cloud/Web 的簡稱。接受建置、部署、金鑰或資源操作前，先檢查目前的 Google Cloud 專案與憑證。

#### Gemini

Gemini 網頁與行動 App 是消費者聊天用戶端；Gemini CLI 是獨立的終端機 Agent；IDE 整合則會加入編輯器上下文。第一次使用先在網頁或行動版提供文字，不啟用擴充功能；需要 Shell 工作流程時，再選 Gemini CLI，並另外記錄驗證路徑。

#### DeepSeek Harness

DeepSeek Harness 是開發者預覽版 Agent harness，不是 DeepSeek 聊天產品，也不是 DeepSeek API。官方 Web 入口是 npx @deepseek-ai/dsh web；開啟後選取工作區並設定獲授權的模型。官方安全說明表示專案尚未經過安全稽核；第一次執行應放在沒有金鑰和不可取代檔案的可丟棄工作區。啟動命令不等於模型存取、沙箱隔離或任務安全已獲證明。

#### Grok 產品家族與 Grok Bot

Grok 是消費者助理；Grok Bot 是在持久化雲端電腦上工作的託管團隊成員介面；Grok Build 是另有文件的終端機編碼 Agent。Grok Bot 內出現的終端機不等於本機 grok 命令，安裝 Grok Build 也不會控制 Bot 的託管電腦。傳送、發佈、購買、刪除和變更設定，都應等待明確的人為核准。

Grok Bot 的組成部分應分開理解：

| 部分 | 它控制什麼 | 適合的第一次使用 |
| --- | --- | --- |
| Bot | 持久化工作角色和長期指示 | 給一個 Bot 一個可重複結果、負責人和驗收條件 |
| Skill | 某類工作的可重用方法 | 以多個無害輸入檢查後再儲存 |
| Routine | 執行時間或觸發條件 | 先測試一次並檢查來源日期 |
| Connector | 可存取的外部服務或資料來源 | 啟用前檢查帳戶、範圍和寫入權限 |
| 雲端電腦 | 遠端瀏覽器、檔案、終端機和工作上下文 | 使用可丟棄工作區並記錄檔案位置 |
| 本機執行 | 在目前電腦上行動的額外權限 | 工作確實需要本機檔案或命令前保持關閉 |
| 交接或群聊 | Bot 之間如何傳遞工作、誰能看見 | 每個階段指定一位負責人，結果交回人員 |

共用帳戶的多個 Bot 可能共用雲端檔案、工作階段或憑證。不同名稱不會自動產生不同信任區。詳見有日期的 [Grok Bot 現場筆記（locale-neutral）](../evidence-library-ZHTW.md#grok-bot-field-note)。

<span id="installation-routes-at-a-glance"></span>

## 安裝路徑一覽

網頁或行動版用戶端需要開啟，桌面 App 需要下載，IDE 整合需要加入編輯器，終端機 Agent 需要透過官方套件或安裝程式安裝，託管工作面則需要在帳戶中啟用。不要把這些路徑混為一談；從能完成下一項工作的最小用戶端開始。

| 路徑 | 例子 | 適合做什麼 | 安裝或存取方式 | 第一個檢查點 |
| --- | --- | --- | --- | --- |
| 網頁聊天 | ChatGPT、Gemini、Grok | 提問、起草、比較與學習已提供文字 | 開啟官方網頁入口 | 帳戶、地區、工具或擴充功能 |
| 行動 App | ChatGPT、Gemini、Grok Bot 伴侶 App | 閱讀、聽寫、擷取和複查 | 按官方應用程式或下載頁面操作 | 發行者及桌面專屬設定 |
| 桌面 App | ChatGPT/Codex、Grok Bot、Claude Code | 大型互動工作區、本機專案或託管電腦用戶端 | 按作業系統和 CPU 架構下載 | 選取的資料夾或託管環境 |
| IDE 整合 | Codex、Claude Code、Gemini、Google Cloud Code | 程式碼選取、編輯器上下文、行內差異和專案導覽 | 安裝相應 IDE 的官方擴充功能 | 工作區、檔案、工具和待審差異 |
| 終端機 Agent | Codex CLI、Claude Code、Gemini CLI、Grok Build | 可重複命令、腳本和版本控制變更 | 官方安裝程式或套件管理器 | 版本命令和權限模式 |
| 託管或雲端 Agent | Codex Cloud/Web、Claude 雲端、Grok Bot | 遠端機器或用戶端關閉後繼續 | 啟用文件說明的雲端工作面 | 遠端儲存庫、檔案、憑證、網路和核准 |
| DeepSeek Harness Web | @deepseek-ai/dsh Web 入口 | 受控的本機 Agent Web UI | 透過 npx 執行官方入口 | 回環位址、工作區、模型和安全界線 |

### 一分鐘選擇法

- 純文字提問、改寫、比較或學習：網頁或行動版聊天。
- 本機檔案、待審差異或專案導覽：在可丟棄工作區使用桌面、IDE 或終端機用戶端。
- 可重複腳本或命令列檢查：終端機 Agent，並保持權限模式可見。
- 需要遠端機器：雲端或託管工作面，並記錄檔案和憑證位置。
- 明確涉及 Google Cloud IDE 資源：Google Cloud Code，不要誤裝名稱相似的編碼 Agent。

## 安裝前與用戶端使用

安裝或開啟真實儲存庫前：

1. 選擇沒有憑證、生產資料或重要未提交工作的可丟棄資料夾。
2. 從官方產品名稱與下載頁面開始，避開仿冒套件和複製命令。
3. 閱讀安裝命令；下載並執行腳本會改變電腦，需要你的確認。
4. 第一次只允許讀取、起草和展示差異；傳送、發佈、購買、刪除和變更權限不是預設動作。
5. 記錄用戶端、版本、系統、日期和結果。

依用戶端類型使用：

#### 網頁或行動版聊天

適合提問、改寫、摘要和比較已提供的文字。新建一個對話，給出少量材料，先要求一個有明確格式的回答，再逐句和原文對照。純文字任務不需要上傳檔案、連網、啟用擴充功能或連結帳戶；即使用戶端主動提供這些功能，也不要把它們當成預設步驟。

#### 桌面 App

適合需要較大工作區、選取本機專案，或使用託管電腦用戶端的任務。先開新對話，確認目前選取的資料夾究竟是本機、共用位置還是雲端工作區，再要求唯讀解釋。需要修改時只提出一項小變更，逐行檢查差異後再接受。桌面端的成功結果不能代替網頁、CLI、自動化或雲端入口的執行證據。

#### IDE 整合

適合需要程式碼選取、編輯器上下文、專案導覽或行內差異的任務。只開啟一個可丟棄工作區和一個相關檔案，先檢查工作區根目錄、選取內容、擴充功能可用的工具和權限，再要求小範圍修改。看不清擴充功能實際讀取了哪些檔案時，先縮小工作區，不要直接放開整個儲存庫。

#### 終端機 Agent

適合可重複的命令、腳本和版本控制變更。進入可丟棄目錄後先記錄路徑和 `git status --short`，只做列出檔案或解釋檔案等唯讀檢查。涉及未知目錄、秘密、依賴安裝、網路、發佈或刪除時停下來，重新確認準確目標和權限；命令列介面本身不等於可以無限制執行。

#### 雲端或託管用戶端

適合確實需要遠端機器，或希望用戶端關閉後工作仍能繼續的任務。開始前記錄遠端儲存庫或工作區、執行環境、憑證範圍、網路、持久化方式和核准規則。第一次只做草稿或唯讀任務，並把傳送、發佈、購買、刪除、變更權限和生產環境變更作為獨立的人工核准點。雲端電腦不是你的本機電腦，也不會自動構成安全隔離界線。

<span id="names-that-are-easy-to-confuse"></span>

## 容易混淆的名稱

本頁先把產品、用戶端和執行環境分開，再進入安裝流程。不要只憑名稱相似，就把 Grok、Grok Bot、Grok Build，或 Codex、Claude Code、Google Cloud Code 當成同一種工具。

<span id="install-and-make-a-first-safe-attempt"></span>

## 安裝並完成第一次安全嘗試

本節命令是來源回執記錄的官方入口，不是本專案執行過的命令。執行前請閱讀來源；若套件名稱、安裝程式或權限提示不一致，就停下來。

### 先取得、檢查、驗證，再使用

下載後立即執行的命令需要特別小心。需要可檢查副本時，先下載到暫存檔、閱讀內容，並在廠商公布時核對校驗和或簽章。本專案沒有執行下列任何廠商安裝程式。

~~~sh
# macOS/Linux：只下載檢查，不要在這一步執行
curl -fL --proto '=https' --tlsv1.2 -o vendor-installer.sh '<official-installer-url>'
sed -n '1,180p' vendor-installer.sh
shasum -a 256 vendor-installer.sh
~~~

~~~powershell
# Windows PowerShell：只下載檢查，不要在這一步執行
$installerPath = Join-Path $env:TEMP 'vendor-installer.ps1'
Invoke-WebRequest -Uri '<official-installer-url>' -OutFile $installerPath
Get-Content -Path $installerPath -TotalCount 180
Get-FileHash -Path $installerPath -Algorithm SHA256
~~~

### ChatGPT：網頁、行動版和桌面端

開啟官方 [ChatGPT 網頁入口](https://chatgpt.com/)，先做純文字練習。行動端從 [ChatGPT 下載頁面](https://chatgpt.com/download/)進入，安裝前核對發行者、帳戶、地區和權限。桌面端從 [Codex 桌面應用程式指南](https://developers.openai.com/codex/app.md)進入，登入後選擇 ChatGPT 或 Codex；這不等於桌面端與網頁、Codex CLI、IDE 或 Codex Cloud 相同。加入資料夾前把它視為一次權限決定，先用可丟棄資料夾和唯讀解釋。

### Grok Bot：桌面端與伴侶行動版

Grok Bot 的工作發生在持久化雲端電腦，不是本機終端機編碼 Agent。先查看[官方入門指南](https://docs.x.ai/grok-bot/get-started)列出的帳戶、方案、儲存空間和隱私前置條件。依裝置選擇 macOS Apple silicon/Intel、Windows x64/Arm64 或 Linux 套件；開啟 App，選擇 Get started，在瀏覽器完成驗證。第一次請求只做公共頁面摘要或清單草稿，並要求來源、未知事項和明確停止點。密碼、雙重驗證碼、CAPTCHA 和付款確認應使用官方接管流程，不要把秘密放進聊天。核准與隱私界線見[官方指南](https://docs.x.ai/grok-bot/approvals-security-and-privacy)。

### Grok Build：獨立的終端機編碼 Agent

Grok Build 不是 Grok Bot 桌面用戶端。官方快捷安裝命令如下，會下載並執行遠端腳本；執行前請先閱讀目前來源：

~~~sh
# macOS、Linux 或 Git Bash
curl -fsSL https://x.ai/cli/install.sh | bash
~~~

~~~powershell
# Windows PowerShell
irm https://x.ai/cli/install.ps1 | iex
~~~

先執行 grok --version，再在可丟棄資料夾中要求列出檔案並停止。無頭唯讀入口：

~~~sh
grok -p "List the files in this disposable folder; do not edit anything or run commands." --output-format json
~~~

JSON 是待審閱紀錄，不是模型遵守界線的證明。來源見[官方 Grok Build README](https://raw.githubusercontent.com/xai-org/grok-build/main/README.md)和[無頭腳本參考](https://docs.x.ai/build/cli/headless-scripting)。

### Codex：終端機、桌面、IDE 與雲端

Codex CLI 的官方入口包括：

~~~bash
# macOS 或 Linux 獨立安裝程式
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# npm 備用路徑
npm install -g @openai/codex

# macOS Homebrew 備用路徑
brew install --cask codex
~~~

~~~powershell
# Windows PowerShell 獨立安裝程式
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
~~~

安裝後在可丟棄專案中執行 codex。唯讀、非互動檢查可使用：

~~~sh
codex exec --json "Summarize the repository structure. Do not edit files or run commands."
~~~

只有在明確需要修改時才使用 workspace-write；第一次練習不要使用 danger-full-access。桌面、CLI、IDE 和雲端工作面可能有不同檔案、Shell、核准和網路存取。Windows 原生路徑見 [Codex CLI](https://developers.openai.com/codex/cli.md)、[Windows 指南](https://developers.openai.com/codex/windows.md)和 [IDE 指南](https://developers.openai.com/codex/ide.md)。

### Claude Code：終端機、IDE 與桌面端

官方安裝入口包括：

~~~bash
# 警告：會下載並執行遠端程式碼
# macOS、Linux 或 WSL
curl -fsSL https://claude.ai/install.sh | bash

# macOS 或 Linux Homebrew
brew install --cask claude-code
~~~

~~~powershell
# 警告：會下載並執行遠端程式碼
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Windows WinGet
winget install Anthropic.ClaudeCode
~~~

Command Prompt 應使用官方 CMD 入口：

~~~cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
~~~

安裝後在可丟棄專案中執行 claude。唯讀列印模式：

~~~sh
claude -p "Explain the purpose of this disposable fixture. Do not edit files or run commands."
~~~

桌面應用程式包含 Claude Code，但不承諾與 CLI 的腳本化和自動化相同。原生 Windows 使用者先查看 Shell 與 Git for Windows 說明。來源見 [Claude Code 概覽](https://code.claude.com/docs/en/overview)、[CLI 參考](https://code.claude.com/docs/en/cli-reference)和[桌面指南](https://code.claude.com/docs/en/desktop)。

### Google Cloud Code：按實際使用的 IDE 選擇

它是雲原生開發 IDE 擴充功能，不是通用終端機 Agent。VS Code 使用[安裝指南](https://cloud.google.com/code/docs/vscode/install)，IntelliJ/JetBrains 使用[安裝指南](https://cloud.google.com/code/docs/intellij/install)，Cloud Shell Editor 已內建 Cloud Code，不需另行安裝擴充功能。第一次開啟範例或可丟棄的雲原生專案，檢查 Google Cloud 專案和憑證，在接受建置、部署、金鑰或資源操作前審閱提議。來源見 [Google Cloud Code 來源回執（locale-neutral）](../evidence-library-ZHTW.md#google-cloud-code-source-receipt)。

### Gemini：網頁、行動版、CLI 與 IDE

網頁和行動版從 [Gemini](https://gemini.google.com/)或官方 App 開始，只提供已提供文字。CLI 官方入口包括：

~~~sh
# 執行一次
npx @google/gemini-cli

# npm 全域安裝
npm install -g @google/gemini-cli

# macOS/Linux 備用
brew install gemini-cli
~~~

全域安裝後在可丟棄專案中執行 gemini；npx 啟動不代表已建立永久命令。需要 API key 或 Vertex AI 時，遵守[官方驗證指南](https://geminicli.com/docs/get-started/authentication)，不要把金鑰放進提示詞或專案。IDE 整合見[官方指南](https://geminicli.com/docs/ide-integration)。網頁、CLI 和 IDE 結果不能互相取代。

### DeepSeek Harness：開發者預覽版 Web 與 profile

DeepSeek Harness 不是 DeepSeek 聊天產品或 API，官方儲存庫也明確表示尚未經過安全稽核。官方 npm Web 入口：

~~~sh
npx @deepseek-ai/dsh web
~~~

預設網址是 127.0.0.1:3080；不自動開啟瀏覽器：

~~~sh
npx @deepseek-ai/dsh web --no-open
~~~

2026-09-08 查詢 npm registry 時，latest 指向 0.1.2-rc.1；要重現這次版本觀察，可明確使用：

~~~sh
npx @deepseek-ai/dsh@0.1.2-rc.1 web --no-open
~~~

執行前檢查 node --version、npm --version 和 npx --version。Web UI 開啟後，進入 Settings → Models 設定獲授權的 DeepSeek API key，加入並選取可丟棄工作區，再執行唯讀任務。原始碼路徑為 clone、pnpm install、pnpm run build、pnpm dsh web；原始碼的 Node/pnpm 要求不能自動改寫成 npm 套件相容性保證。web、headless、sdk、sdk-minimal 和 acp 是不同 profile；TUI 範例不證明 TUI 是預設內建入口。來源見 [DeepSeek Harness 來源回執（locale-neutral）](../evidence-library-ZHTW.md#deepseek-harness-source-receipt)與[安全說明（locale-neutral）](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md)。官方沒有提供所有 profile 和設定在 Windows/macOS 上全面支援的單一承諾。

### 安裝中途停止時

| 症狀 | 下一步檢查 | 安全解釋 |
| --- | --- | --- |
| 找不到命令 | 重新開啟 Shell，檢查 PATH，執行版本命令 | Shell 可能尚未重新載入；驗證仍未測試 |
| 下載套件與電腦不匹配 | 檢查 Windows x64/Arm64 或 macOS Intel/Apple silicon | 架構不匹配不等於產品不可用 |
| 瀏覽器登入成功但用戶端不能工作 | 檢查用戶端帳戶、提供商、工作區和權限 | 瀏覽器身分與用戶端授權是不同觀察 |
| 找不到本機資料夾或託管工作區為空 | 記錄確切執行環境和路徑 | 可能正在查看另一台電腦或另一個檢出 |
| 第一次任務要求傳送、發佈、刪除、付款或變更權限 | 停下來並要求明確核准 | 安裝和驗證不等於獲得外部操作授權 |
| Harness 啟動但工作階段不可用 | 檢查回環位址、工作區、模型設定和 profile 文件 | Web 啟動不等於模型存取、沙箱證明或任務成功 |

把原始錯誤、用戶端、版本、作業系統、工作目錄和日期寫入回執。不要把憑證或私人檔案內容放進 issue、來源記錄或故障排除範例。

<span id="chatgpt-first-task"></span>

## ChatGPT 第一次任務

在獲授權的 ChatGPT 工作面執行下方安全任務。記錄確切工作面和日期；即使出現瀏覽、記憶、上傳或分享能力，本練習也不需要。桌面端先開新聊天，不要一開始就開啟真實專案資料夾。

<span id="claude-code-first-task"></span>

## Claude Code 第一次任務

在可丟棄專案中，讓 Claude Code 解釋目錄，不編輯檔案、不執行命令。先檢查它讀了什麼、沒讀什麼以及權限提示，再要求小而可審閱的差異。

<span id="gemini-first-task"></span>

## Gemini 第一次任務

在獲授權的網頁或行動版聊天中執行安全任務，記錄帳戶與擴充功能狀態。純文字練習不要啟用擴充功能；若使用 Gemini CLI，從可丟棄資料夾啟動並獨立記錄 CLI 驗證。

<span id="deepseek-first-task"></span>

## DeepSeek 第一次任務

純文字練習只使用獲授權的聊天工作面。Harness 在 127.0.0.1:3080 啟動，只能證明本機 Web 伺服器啟動；設定模型金鑰或 Agent 任務前，先閱讀安全界線、選取工作區並檢查每個行動。

<span id="grok-first-task"></span>

## Grok 第一次任務

消費者聊天、Grok Bot 和 Grok Build 是三種不同工作面。Bot 先做草稿或唯讀任務，Build 先在可丟棄本機資料夾中檢查；目前答案或已連結帳戶，都不是傳送、發佈、付款、檔案變更或其他外部行動的授權。

## 所有平台都能使用的安全首次任務

~~~text
結果：把下面這份虛構的社團通知改寫給新會員。
材料：「社團每週二 6 點開會。請帶上筆記本。房間稍後確認。」
回覆格式：寫兩個句子。保留材料中的每一項事實。把缺少的細節放在 [方括號] 中。然後列出你保留的事實。
檢查：對照原文和改寫。不得加入新的時間、房間、費用、聯絡方式或承諾。
停止：不要連網搜尋、傳送、發佈、上傳、執行命令，也不要擅自假設未知細節。
~~~

檢查三件事：每個陳述能否在原文找到；是否遵守兩個句子並列出保留事實；是否把未知細節錯誤補成事實。用戶端若提供工具或要求額外材料，就停下來。

<span id="windows-and-macos-setup-paths"></span>

## Windows 與 macOS 安裝路徑

這只是受控的第一次使用流程，不是完整支援承諾。廠商文件仍是作業系統版本、架構、地區、帳戶資格和安裝變更的權威來源。

### 基礎依賴

| 依賴 | 官方入口 | 何時需要 |
| --- | --- | --- |
| Node.js | [Node.js 下載](https://nodejs.org/en/download/) | Gemini CLI 和其他 Node 用戶端，先看產品自己的版本要求 |
| Windows Git | [Git for Windows](https://git-scm.com/download/win) | 複製可丟棄專案或提供 Git 上下文 |
| macOS/Linux Git | [Git 安裝指南](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | 需要儲存庫或版本差異的終端機工作流程 |
| macOS Homebrew | [Homebrew](https://brew.sh/) | 官方文件列出時作為可選套件管理器 |

### Windows：PowerShell 優先

~~~powershell
$PSVersionTable.PSVersion
[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
Get-Command node,npm,git -ErrorAction SilentlyContinue
~~~

按 x64 或 Arm64 選擇官方下載。安裝程式修改 PATH 後重新開啟 PowerShell，再執行：

~~~powershell
Get-Command codex,claude,gemini,grok -ErrorAction SilentlyContinue
~~~

只在產品登入或提供商流程中驗證；用可丟棄資料夾執行安全首次任務。透過 npx 啟動的 dsh 不一定會成為永久全域命令。

### macOS：先檢查晶片

~~~sh
sw_vers
uname -m
command -v node npm git brew
~~~

按 Apple silicon 或 Intel 選擇官方下載。若命令不在 PATH 中，重新開啟 Terminal；透過用戶端驗證，不要把複製來的值放進 Shell 歷史或提示詞。從可丟棄資料夾開始並保存可複查輸出。

### 簡短對照

| 檢查 | Windows | macOS |
| --- | --- | --- |
| Shell | 原生安裝通常先使用 PowerShell | Shell 安裝程式或 Homebrew 使用 Terminal |
| 架構 | x64 或 Arm64 | Apple silicon 或 Intel |
| 工作區 | 生產檢出之外的新資料夾 | 生產檢出之外的新資料夾 |
| 安裝腳本 | 檢查來源，留意政策、權限和網路 | 檢查來源，留意套件管理器、權限和網路 |
| 回執 | 產品、用戶端、版本、Shell、日期、結果 | 產品、用戶端、版本、Shell、日期、結果 |

## 保留第一次使用紀錄

| 欄位 | 記錄什麼 |
| --- | --- |
| 用戶端和執行環境 | 產品工作面、系統、架構，以及本機或託管 |
| 範圍 | 工作目錄/工作區、權限模式、工具或擴充功能 |
| 驗證 | 帳戶或提供商路徑，不記錄秘密 |
| 任務和結果 | 請求、回答/日誌/差異、可見版本和日期 |
| 決定 | 接受、拒絕或停止了什麼，以及下一步檢查 |

桌面端記錄主動開啟後的專案或資料夾；IDE 記錄檔案、選取內容、專案根目錄和差異；終端機 Agent 在改動前記錄起始目錄和 git status --short。如果用戶端不能顯示它看到了什麼或改變了什麼，就縮小任務範圍。

<span id="evidence-states"></span>

## 四種證據狀態

| 聲明 | 最低證據 | 它不能證明什麼 |
| --- | --- | --- |
| 已安裝 | App 開啟或目標命令可解析，記錄產品和版本（如可見） | 驗證、模型存取或任務成功 |
| 已驗證 | 產品接受計畫中的帳戶或提供商流程 | 有權使用某個資料夾或執行外部操作 |
| 已執行任務 | 對聲明的用戶端和工作區有帶日期的回答、日誌或差異 | 正確性、安全性或使用者接受 |
| 已接受結果 | 使用者按要求檢查並保留輸出、差異或審查紀錄 | 長期學習、平台等價或生產就緒 |

## 完成第一次任務後，接下來走哪條路線？

- 純文字入門練習：[Beginner Practice Pack](../communication-clinic-ZHTW.md)。
- 檔案與工具的深度旗艦路線：[First Safe Change](first-safe-change-ZHTW.md)。
- 平台無關基礎：[Universal Core Foundations](universal-core-foundations-ZHTW.md)。
- 公平比較兩個平台：[LLM Comparison Protocol（locale-neutral）](../../skills/prysai-llm-comparison-protocol/SKILL.md)。
- 檢查變動中的產品聲明：[Platform Fact Watch（locale-neutral）](../../skills/prysai-platform-fact-watch/SKILL.md)。

## 證據狀態與界線

本路線仍是 candidate / not_run。它已加入 ChatGPT、Gemini、Grok Bot、Grok Build、Codex、Claude Code、Google Cloud Code 和 DeepSeek Harness 的帶日期官方來源範圍，但沒有學習者執行、跨平台安裝執行、帳戶資格檢查、獨立語言審校或生產就緒審查。繁體中文內容已同步到 2026-09-08 英文百科版本，但這不等於繁體中文母語品質和真實執行已完成驗證。

- [ ] 我辨識了產品、用戶端和執行環境，沒有只憑熟悉名稱判斷。
- [ ] 我只使用官方來源和可丟棄或獲授權的工作區。
- [ ] 我記錄了確切用戶端、作業系統、可見版本（如有）和日期。
- [ ] 我沒有貼上秘密、私訊、未發佈檔案或 API key。
- [ ] 我把工具行動視為提議，並在外部副作用發生前停下來。
- [ ] 我沒有把一個平台的行為當作另一個平台的證明。
