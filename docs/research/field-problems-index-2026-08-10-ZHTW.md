<!-- content_id: field-problems-index-2026-08-10 | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: field-problems-index-2026-08-10.md | source_revision: 2026-08-10 -->

# 現場問題研究索引（2026-08-10）

**狀態：** `candidate`。這是公開使用者回報的導覽與證據邊界，不是官方故障清單，也不是本專案的本機重現報告。

本索引把不同研究支線中的問題編號、原始來源、查閱日期、版本範圍與教學落點放在一起。正文只吸收原創摘要與排查方法；不複製外部貼文、程式碼、圖片、日誌、憑證或 Skill 指令。

## 研究紀錄

| 紀錄 | 涵蓋範圍 | 來源與查閱日期 | 證據邊界 | 主要落點 |
|---|---|---|---|---|
| [FP](field-problems-codex.md) | Codex CLI/App、驗證、GitHub host、connector、Skill、模型與驗證 | `openai/codex` 原始 Issues；2026-08-09 | 以使用者回報為主；未本機重現；不把維護者未確認的推測寫成根因 | 第 5、9、12、13、14、15、22 章 |
| [FP-S](field-problems-surface-2026-08-10.md) | 工作介面、Provider、WSL、目錄根、Worktree、Cloud、Computer Use、執行緒所有權 | `openai/codex` 原始 Issues；2026-08-10 | 使用者回報；Issue `closed` 不等於已修復；未本機重現 | 第 5 章、實驗 007、第 13 章、實驗 013 |
| [FUP](field-problems-follow-up-2026-08-10.md) | 子 Agent 交接、工具註冊、第二個目錄、WSL 代理、HTTP 507 | `openai/codex` 原始 Issues；2026-08-10 | 使用者回報；未本機重現；沒有官方根因確認 | 第 5、8、9、12、13、19 章、實驗 013 |
| [FUP-P2](field-problems-follow-up-2026-08-10-p2.md) | macOS Local Network 權限、Linear OAuth 迴圈、子 Agent UI 狀態錯位、Windows 權限選擇器持久化 | `openai/codex` 原始 Issues + OpenAI/Apple 官方邊界；2026-08-10 | 使用者回報；官方根因未確認；未本機重現；workaround 不等於修復 | 第 4、5、9、12 章、實驗 001、002、003 |
| [論壇](field-problems-forums-2026-08-10.md) | Stack Overflow 的 sandbox 網路、Windows、VS Code spawn、審批、編碼、私密路徑、Maven，以及可存取的 GitHub Issue 摘要 | Stack Exchange API、可定位的 Stack Overflow 頁面與 GitHub 公開 Issue；2026-08-10 | Stack Overflow 的回答是社群建議；Reddit、Discussions 和無法可靠核對的頁面不納入證據；未本機重現 | 第 5、7、9、13 章、實驗 013 |

## 正文使用的案例對照

| 編號 | 回報者看到的症狀（以自己的話描述） | 版本／環境紀錄 | 目前狀態與證據 | 教學動作 |
|---|---|---|---|---|
| [FP-02](field-problems-codex.md#fp-02：浏览器显示认证成功，但-token-exchange-失败) | 瀏覽器頁面成功，但用戶端 token exchange 失敗 | Codex/CLI 0.147.0；Windows 11、WSL/Linux；2026-08-07 建立，2026-08-09 整理 | Issue `open`；使用者回報；本專案未重現 | 拆分授權頁面、回呼、交換與第一個無副作用要求；失敗就停在 `blocked`/`unverified` |
| [FP-03](field-problems-codex.md#fp-03：github-enterprise-only-用户被-pr-入口错误地探测到-githubcom) / [FP-04](field-problems-codex.md#fp-04：github-connector-无法为第二个组织建立-installation) | CLI／第一個組織可用，但應用程式 host 或第二個組織的 installation 不正確 | App 26.715.31251 / 26.727.40816；macOS；2026-07-22、2026-08-01 建立 | Issue `open`；使用者回報；本專案未重現 | 分開核對 hostname、帳號、組織、儲存庫與 installation；未確認前不申請權限 |
| [FP-S-05](field-problems-surface-2026-08-10.md#fp-s-05：windows-linked-worktree-中的-apply_patch-被误判为项目外) / [FP-S-06](field-problems-surface-2026-08-10.md#fp-s-06：界面显示已切到-worktree，但-agent-仍在原-checkout-工作) | Worktree 標記、shell、patch 與 Git 目錄可能不一致 | CLI 0.147.0/PowerShell 7.6.4；Windows；或 Desktop 26.715.52143/macOS；2026-08-10 整理 | Issue `open`；使用者回報；本專案未重現 | 只讀核對 `cwd`、worktree 根、workspace root、IDE 路徑與 Git 狀態；未確認就停止寫入 |
| [FUP-01](field-problems-follow-up-2026-08-10.md#fup-01：子-agent-被创建，但任务消息没有到达) / [FUP-05](field-problems-follow-up-2026-08-10.md#fup-05：长时间没有任何事件，随后-http-507-并自动重试) | 狀態存在或重試成功，但訊息是否抵達、第一次副作用與結果仍未證實 | 2026-08-10 建立／查閱；具體版本依回報而異 | Issue `open`；使用者回報；本專案未重現 | 用固定短語／檢查點證明建立、抵達、執行、返回；重試前先核對 diff 與外部狀態 |
| [論壇-1](field-problems-forums-2026-08-10.md#1-sandbox-内访问-github-被网络-allowlist-拦截) / [論壇-3](field-problems-forums-2026-08-10.md#3-vs-code-扩展-spawn-unknown，但-cli-能手动启动) | 網路 allowlist 或 VS Code host 失敗，但另一層看似正常 | Codex CLI、Windows/VS Code、企業政策等；以原始網站時間戳為準 | 使用者回報與回答者建議；無官方確認；本專案未重現 | 先區分 sandbox、代理、PATH、擴充功能 host 與目標工具；不要直接擴大網路或繞過企業政策 |
| [WF-09](web-field-problems-2026-08-10.md#wf-09：浏览器能读到弹窗，但点击证据仍未成立) | 頁面和 DOM 可讀，但點擊呼叫逾時 | Windows 瀏覽器控制；2026-08-10 查閱 | 使用者回報；本專案未重現 | 分開記錄頁面可見、元素可定位、呼叫返回與頁面變化；交付「讀取已驗證、點擊未驗證」 |
| [P2-01](field-problems-follow-up-2026-08-10-p2.md#p2-01：网络开关已启用，但-macos-local-network-权限仍阻断-lan) | 任務 metadata 顯示網路已啟用，但 macOS Local Network 權限仍阻斷 LAN；開啟系統權限後回報者得到 HTTP 401 | Desktop 26.727.51351 / bundled CLI 0.146.0-alpha.9.2；Darwin arm64；2026-08-10 | 使用者回報與官方邊界；根因未確認；HTTP 401 只證明抵達認證層；本專案未重現 | 拆分設定、系統權限、TCP/HTTP 與認證 |
| [P2-02](field-problems-follow-up-2026-08-10-p2.md#p2-02：linear-oauth-显示已接受，但只读调用持续重新认证) | Linear OAuth 顯示已接受，但同一個唯讀 `get_issue` 呼叫持續要求重新認證 | CLI 0.146.1；macOS arm64；2026-08-10 | 使用者回報與官方 connector 邊界；workaround 未獲官方確認；本專案未重現 | 第 4、5 章；實驗 002、003；一次無副作用重試後停止 |
| [P2-03](field-problems-follow-up-2026-08-10-p2.md#p2-03：子-agent-已完成，但父任务界面仍显示-active) | 狀態查詢顯示子 Agent completed，但父任務介面仍顯示 Active，開啟結果後提示才消失 | macOS 26.6.1；另有 Windows 社群回報；2026-08-10 | 使用者回報；UI 狀態機／背景程序根因未確認；本專案未重現 | 第 4、12 章；實驗 003；分開記錄執行終態、結果已讀與父任務狀態 |
| [P2-04](field-problems-follow-up-2026-08-10-p2.md#p2-04：windows-权限选择器因旧持久化布尔值而灰掉) | 權限選擇器變灰；回報者替換舊持久化值後 UI 恢復，但有效執行時政策仍需另行觀察 | Desktop 26.803.5235.0；Windows 11 Pro 22631；x64；2026-08-10 | 使用者端診斷；內部實作與修復未確認；本專案未重現；不要把手動修改狀態檔當作官方步驟 | 第 4 章；實驗 001、003；先備份、使用低風險探針、驗證批准行為 |

## 證據等級與複核規則

- `使用者回報` 只證明回報者聲稱在相應環境觀察到症狀；多環境測試仍不會自動成為官方確認。
- `回答者建議` 只記錄社群 workaround 與其風險；不會自動升格為目前版本的設定語法或支援政策。
- `官方確認` 需要維護者明確回覆、官方文件、修復紀錄或可核對的發行說明；自動去重機器人不算。
- `本機重現` 只有在本專案實際執行並保存證據後才能填寫；本索引目前沒有任何本機重現。
- 每次正文引用易變案例時，保留原始 URL、Issue 狀態、回報版本／平台、查閱日期與「本專案未重現」邊界。`closed` 只代表頁面狀態，不代表修復或所有帳號可用。

## 論壇與授權邊界

Stack Overflow 頁面標示 CC BY-SA 4.0；本專案只做事實摘要、問題結構和連結引用，不複製大段原文、程式碼或回答者命令。GitHub Issue 只作為公開使用者回報來源引用，不把作者、標籤或搜尋結果當成 OpenAI 官方確認。Reddit、GitHub Discussions 與目前環境無法可靠核對的頁面不進入正文證據。

**後續複核：** 重新造訪原始 URL，記錄維護者回覆、關聯 PR、修復版本、頁面狀態與目前適用範圍；若沒有新證據，保持 `candidate`、`unverified` 或 `blocked`，不要升格為 `verified`。
