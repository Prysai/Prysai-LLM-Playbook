<!-- content_id: field-problems-forums-2026-08-10 | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Codex／AI 程式設計代理的真實工作面問題：論壇與公開 Issue 研究

**研究日期：**2026-08-10  
**狀態：**`candidate`（已完成來源存取與整理；沒有本地重現，也沒有把論壇建議升格成官方結論）  
**範圍：**Codex／AI 程式設計代理的權限、Windows、VS Code、沙盒網路與目錄存取。  
**執行邊界：**唯讀存取 Stack Exchange API、Stack Overflow 頁面連結與 `openai/codex` 公開 Issue；沒有執行文章中的指令、讀取秘密、提交或推送。

## 如何閱讀這些紀錄

- **使用者報告：**原作者描述的環境、症狀或重現情形。
- **回答者建議：**社群 workaround，不等於產品承諾。
- **官方確認：**官方文件、維護者明確回覆，或官方程式碼／發佈說明。本輪沒有把一般 Issue 作者當成官方確認。
- **本地重現：**本研究沒有做本地重現，因此沒有任何一項標記為本地重現。
- **推測：**原作者或回答者對根因的判斷，必須保留不確定性。

來源網站回傳的時間戳只作為來源資料；本檔案只宣告「2026-08-10 可存取」，不把來源時間戳當成本地驗證過的時間線。

## 可教學的案例

### 1. 沙盒內存取 GitHub 被網路 allowlist 封鎖

- **來源：**[Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **環境與症狀：**Codex CLI、`sandbox_mode = "workspace-write"`；`curl -I https://github.com` 失敗，並出現類似 `blocked-by-allowlist` 的 Proxy 錯誤。
- **證據邊界：**使用者報告、回答者建議與推測；沒有本地重現或官方確認。
- **安全教學行動：**先區分沙盒禁止網路、Proxy allowlist、DNS/TLS 與企業防火牆；記錄 URL、HTTP 狀態、Proxy 錯誤與有效權限。只開放必要網域，以不含秘密的連線測試驗證。
- **不能主張：**`workspace-write` 自帶網際網路，或開啟網路後所有 CLI 都能連線；不能把回答中的設定視為目前官方語法，也不能為了省略核准直接使用 full access。

### 2. Windows 使用者不確定 Codex CLI 是否原生支援

- **來源：**[Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **環境與症狀：**Windows 11、PowerShell／Command Prompt、WSL2；作者在官方安裝說明中找不到清楚的 Windows 邊界。
- **證據邊界：**社群建議互相衝突（WSL2 與原生 Windows），沒有官方確認或本地重現。
- **安全教學行動：**記錄版本、安裝來源、`where`／PATH、Shell、WSL 發行版與專案所在檔案系統；先做無副作用的版本檢查與唯讀探測。
- **不能主張：**只靠這篇文章證明 Windows 原生支援或不支援，也不能宣稱 WSL2 與原生環境行為相同。

### 3. VS Code 擴充功能 `spawn UNKNOWN`，但 CLI 可手動啟動

- **來源：**[Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **環境與症狀：**Windows 企業託管環境、VS Code stable、PowerShell Constrained Language Mode；CLI 可以執行，但擴充功能 host 回報 `spawn UNKNOWN`。
- **安全教學行動：**分別記錄 VS Code、擴充功能與 CLI 版本、`where.exe` 結果、擴充功能 host 紀錄、Shell 政策與 `.exe`／`.cmd` shim；CLI 能執行與擴充功能能 spawn 是兩項驗收。
- **不能主張：**PATH 正常就等於擴充功能可用，或問題必然是 Windows PATH；不要繞過企業政策。

### 4. `approval_policy = "on-failure"` 仍逐檔詢問

- **來源：**[Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **症狀與邊界：**VS Code、Windows／WSL、workspace trusted；作者表示每次修改 workspace 檔案都要核准。accepted answer 的環境不同，`never` 不等於安全地自動核准一切。
- **安全教學行動：**分開檢查「是否詢問」與「沙盒是否允許」，確認設定實際生效位置、工作階段狀態、workspace 與 writable roots；以可復原的小檔案修改驗證。
- **不能主張：**`never` 等於 full access，或 workspace-write 允許所有檔案修改。

### 5. Windows Terminal 中出現亂碼符號

- **來源：**[Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **症狀：**Windows Terminal 內的 CMD 出現亂碼；調整視窗大小後暫時消失。
- **安全教學行動：**記錄終端機、Shell、字型、視窗大小、編碼頁與版本；比較新視窗、重繪、不同終端機與純文字輸出，分辨編碼和 TUI 重繪。
- **不能主張：**`chcp 65001` 必定修正，亂碼一定是 UTF-8，或 resize 是永久 workaround。

### 6. 嘗試用沙盒阻止讀取私密目錄

- **來源：**[Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **症狀：**Codex CLI、Linux `~/private` 範例；使用者希望用核心層級沙盒強制「不可讀」。
- **安全教學行動：**優先使用作業系統權限隔離，把私密資料移出工作區；核對有效 profile、絕對路徑、cwd、writable roots 與 helper，以非敏感檔案驗證讀取失敗。
- **不能主張：**所有平台都支援同樣的 deny 規則、沙盒能抵禦所有外傳路徑，或模型說「讀不到」就等於核心層級證據。

### 7. Maven 相依套件下載失敗

- **來源：**[Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **症狀：**Java／Spring Boot、`./mvnw clean test`；出現 `Network is unreachable`，接著發生相依版本遺失的連鎖錯誤。
- **安全教學行動：**先分辨網路不可達與 POM／版本錯誤；記錄 Maven settings、Proxy 環境、目標網域與快取命中，優先使用組織核准的 Proxy 或預載相依套件快取。
- **不能主張：**推薦未知公共 Proxy，或把「能連到 OpenAI」當成 Maven Central、GitHub 或任意網域都可連線。

### 8. Windows Computer Use 無法列舉視窗

- **來源：**[openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **症狀與邊界：**Windows、Codex App、Computer Use；`EnumWindows failed`，列舉視窗呼叫失敗。公開 bug 標籤不等於維護者確認。
- **安全教學行動：**先驗證一般應用程式能否列舉，再分開視窗 API、helper 路徑／安裝與權限／作用中桌面；保留錯誤碼與已嘗試動作。
- **不能主張：**Windows Computer Use 普遍可用或不可用，或 helper 能啟動就證明控制鏈路已驗證。

### 9. Windows Desktop 工作時短暫閃出命令提示字元

- **來源：**[openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **症狀：**Windows Desktop 工作時短暫出現前景 console 視窗與 `conhost.exe` 子行程，使用者擔心未授權活動。
- **安全教學行動：**記錄父子行程、路徑、簽章、發生時間與版本，比較閒置和執行工作時的差異；必要時提交最小回饋包，不上傳原始碼或秘密。
- **不能主張：**一次閃窗就是資料外傳或惡意軟體，也不能把 alpha 行為推論到所有 Desktop 版本。

### 10. 自訂 writable root 與 cwd 的權限提示可能矛盾

- **來源：**[openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **症狀：**CLI、macOS、tmux；說明文字表示 cwd 可編輯，但目標路徑仍需要核准。
- **安全教學行動：**以實際拒絕／核准結果為準，分別記錄 cwd、writable roots、effective profile、產生的提示與目標路徑；以 cwd 內、允許 root 內、root 外三格矩陣測試。
- **不能主張：**模型收到的權限說明等於 OS enforcement，或只憑 `workspace-write` 就說 cwd 一定可寫；未核對版本原始碼／測試前不能說已修正。

## 跨案例的最小排查卡

1. **分層：**模型提示、核准政策、沙盒 enforcement、作業系統權限、網路 Proxy 與目標工具是不同邊界。
2. **收集證據：**版本、平台、安裝來源、Shell／終端機、cwd、有效設定路徑、精確錯誤、父子行程與失敗 URL。
3. **低風險驗證：**不含秘密、可復原、單檔或單網域測試；不要直接執行文章中的安裝腳本、Proxy 設定或放寬權限指令。
4. **確認有效設定：**使用者編輯的檔案不等於目前工作階段、擴充功能或 App 使用的設定；重新啟動或切換工作區可能改變狀態。
5. **分級驗收：**命令啟動、專案讀取、檔案寫入、網路存取、VS Code 整合、Computer Use 控制分別驗收，一項結果不能代替全部結果。

## 來源、授權與使用邊界

Stack Overflow 頁面標示 CC BY-SA 4.0；本檔案只做事實摘要與連結引用，不複製大段原文、程式碼或回答者指令。GitHub Issue 只作為公開使用者報告引用，不把作者、標籤或搜尋結果當成 OpenAI 官方確認。本檔案沒有複製外部圖片、程式碼或 Skill 指令，因此不新增資產登錄項目。

## 阻塞與尚未核對項目

- OpenAI 官方 Codex 文件本輪出現重新導向，未能可靠取得最終正文；沒有把官方語意寫成已確認事實。
- GitHub REST 繼續讀取詳情／留言時觸發匿名 rate limit；已取得證據限於可存取頁面、搜尋結果與 Issue 摘要，沒有宣稱維護者確認。
- Reddit、GitHub Discussions 與目前環境無法可靠引用的頁面未納入最終紀錄。
- 本輪沒有在本機重現任何論壇問題；所有本地重現都維持未完成。
- 論壇內容、版本、設定語法與產品支援矩陣會變動；正式發布前重新存取原始 URL，補上一手來源、存取日期與目前版本範圍。
