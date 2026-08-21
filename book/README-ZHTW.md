<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: book-readme | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress -->

# Prysai 大模型實戰手冊：書稿

> 繁體中文書稿入口（`ZHTW`）。入口、序言、目錄、22 章、18 項實驗、兩條新手路線和一組新手提示卡均已有繁體中文候選內容；獨立語言審校與學習者執行證據仍待完成。

<!-- language-switcher:start -->
**語言：** [English](README-EN.md) | [簡體中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
<!-- language-switcher:end -->

## 先按教材主線閱讀

1. [LLM 基礎概念](guides/llm-fundamentals-ZHTW.md)
2. [通用 LLM 首練習](routes/universal-core-foundations-ZHTW.md)
3. [第一次安全改動](routes/first-safe-change-ZHTW.md)

英文 Foundation Core 是規範源，繁體中文重譯完成並透過獨立審校前不在繁體中文主線中偽裝成已驗證。
提示卡、語言練習、工作更新和研究核查是主線之後的**可選應用練習**，不替代 LLM 基礎課。

導航：

- [返回繁體中文專案入口](../README-ZHTW.md)
- [繁體中文序言](preface-ZHTW.md)
- [繁體中文書籍目錄](table-of-contents-ZHTW.md)
- [繁體中文通用 LLM 首練習：安全文字任務](routes/universal-core-foundations-ZHTW.md)
- [繁體中文新手安全路線：第一次安全改動](routes/first-safe-change-ZHTW.md)
- [繁體中文新手提示卡：可選應用練習](communication-clinic-ZHTW.md)
- [繁體中文工作更新六步練習](work-update-practice-loop-ZHTW.md)
- [繁體中文研究核查六步練習](research-check-practice-loop-ZHTW.md)

這裡放 Prysai LLM Playbook 的原創主線書稿。書稿不是外部專案的拼接，而是按照學習者的成長順序重新編排的內容系統。

每一章都要配套：

- 學習目標；
- 關鍵概念；
- 最小可執行實驗；
- 故意失敗的實驗；
- 遷移任務；
- 驗收證據；
- 當前事實與來源；
- 更新狀態。

章節在進入主線前必須透過評測框架的最低門檻。透過靜態檢查或檔案檢查，不等於章節已經完成執行時、瀏覽器、模型或讀者理解驗證。

## 書稿檔案結構

| 位置 | 內容 | 當前語言遷移狀態 |
|---|---|---|
| `book/chapters/` | 22 章主線章節 | 22 章均有繁體中文候選譯文；獨立語言審校仍待完成 |
| `book/labs/` | 18 個實驗 | 18 個實驗均有繁體中文候選譯文；獨立語言審校與學習者執行記錄仍待完成 |
| `book/table-of-contents-ZHTW.md` | 繁體中文閱讀目錄與章節入口 | 已列出 22 章與 18 項實驗的繁體中文候選入口 |
| `book/communication-clinic-ZHTW.md` | 繁體中文新手提示卡 | 七張低風險文字練習卡；是起步切片，不代表學習效果已驗證 |
| `book/routes/first-safe-change-ZHTW.md` | 中文新手安全路線 | 完整初稿，遷移狀態為 `in-progress`；獨立語言審校待完成 |
| `book/README-ZHTW.md` | 本繁體中文書稿入口 | 遷移狀態為 `in-progress` |
| `book/preface-ZHTW.md` | 繁體中文序言 | 遷移狀態為 `in-progress` |

所有繁體中文正文都保留 `in-progress` 狀態：這表示檔案和同語言路徑已經存在，但尚未完成獨立語言審校。它不是對翻譯品質、學習效果或平台行為的保證。

## 當前閱讀入口

如果你還沒有專案，也不準備讓 AI 操作檔案，先做[通用 LLM 首練習](routes/universal-core-foundations-ZHTW.md)：它只使用一則虛構通知，練習把目標、材料、檢查和停止點寫清楚。它是候選練習，不代表不同平台行為相同，也不證明學習效果。

如果你是第一次使用這套材料，按這一條候選路徑閱讀：

[第 1 章：先理解 GPT，再理解 Codex](chapters/01-gpt-and-codex-ZHTW.md) →
[實驗 011：GPT 與 Codex 邊界](labs/lab-011-gpt-codex-boundaries-ZHTW.md) →
[第 2 章：第一個安全、可驗證的任務](chapters/02-first-safe-task-ZHTW.md) →
[第一次安全改動](routes/first-safe-change-ZHTW.md) →
[實驗 001：做一次安全的 README 改動](labs/lab-001-first-safe-task-ZHTW.md) →
[第 3 章：任務協議](chapters/03-task-protocol-ZHTW.md) →
[實驗 002：任務協議](labs/lab-002-task-protocol-ZHTW.md) →
[第 4 章：上下文、許可權與 Agent 行動邊界](chapters/04-context-permissions-and-agent-ZHTW.md) →
[實驗 007：行動邊界](labs/lab-007-action-boundaries-ZHTW.md) →
[第 5 章：選擇正確的 Codex 工作面](chapters/05-choose-the-codex-surface-ZHTW.md) →
[第 6 章：模型選擇不是模型崇拜](chapters/06-model-selection-ZHTW.md) →
[第 7 章：Skill、Plugin、MCP 和工具如何分工](chapters/07-skills-plugins-and-tools-ZHTW.md) →
[實驗 004：選擇最小有用能力](labs/lab-004-skill-selection-ZHTW.md) →
[第 8 章：從定義到交付](chapters/08-full-lifecycle-workflow-ZHTW.md) →
[實驗 013：完成一個完整的豎向切片](labs/lab-013-l3-vertical-slice-ZHTW.md) →
[第 9 章：驗證、懷疑與恢復](chapters/09-verification-and-recovery-ZHTW.md) →
[實驗 003：審計一條完成宣告](labs/lab-003-evidence-review-ZHTW.md) →
[第 10 章：規劃與豎向切片](chapters/10-planning-and-slicing-ZHTW.md)。

整套中文路徑現有 40 / 40 個課程單元（22 章、18 個實驗），所有翻譯仍為 `in-progress`。中文頁面只連結中文檔案，不會靜默跳到英文正文。固定評測夾具仍沒有中文閱讀版，也沒有把靜態定義變成已完成評測。

18 箇中文實驗均為 `draft / not_run`，翻譯亦尚未獨立審校。學習路徑契約、模型評測、官方基線與真實問題研究仍以語言中立治理記錄為準；這些記錄不等於已完成學習證據。

## 閱讀和狀態邊界

書稿章節使用 `draft`、`candidate`、`verified`、`production-ready` 區分內容成熟度；易變事實使用 `current`、`stale`、`disputed`、`removed` 區分事實狀態。翻譯檔案的存在、連結檢查透過或文字看起來完整，都不能自動提升原章節的內容狀態。

本中文入口只對已列出的中文檔案負責。章節、實驗、Skill、評測和研究檔案仍應以各自檔案中的來源、狀態和驗證證據為準；沒有執行日誌的評測不能寫成已完成，沒有本地復現的論壇案例不能寫成已確認根因。
