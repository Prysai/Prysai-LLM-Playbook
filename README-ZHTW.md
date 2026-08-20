<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: project-readme | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress -->

# Prysai 大模型實戰手冊：從第一個任務到可靠交付

許可證：課程正文與教學資產採用 CC BY 4.0；指令碼與工具採用 Apache-2.0，除非檔案另有宣告。參見 [`LICENSE`](LICENSE)、[`LICENSE-CODE`](LICENSE-CODE) 與許可邊界文件。
> 繁體中文專案入口（`ZHTW`）。預設公開語言目標是 English（`EN`）；本檔案是當前繁體中文入口遷移的一部分。

<!-- language-switcher:start -->
**語言：** [English](README-EN.md) | [簡體中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md)
<!-- language-switcher:end -->

## 按教材順序開始：先理解，再動手

第一次來這裡，不必在提示詞卡、Skill 和不同產品之間做選擇。先沿同一條中文主線學習：

1. [LLM 基礎概念](book/guides/llm-fundamentals-ZHTW.md)
2. [通用 LLM 首練習](book/routes/universal-core-foundations-ZHTW.md)
3. [第一次安全改動](book/routes/first-safe-change-ZHTW.md)

英文基礎核心課是當前的規範原始檔，中文版本正在重譯和複核。在此之前，
這個入口會保持整條路線只連結中文檔案。

西班牙語、工作更新和研究核查卡是學完主線後的**可選應用練習**，不是理解大語言模型的第一課，也不保證效率、流利度或能力提升。

中文入口導航：

- [繁體中文書稿入口](book/README-ZHTW.md)
- [繁體中文序言](book/preface-ZHTW.md)
- [繁體中文書籍目錄](book/table-of-contents-ZHTW.md)
- [繁體中文新手提示卡：可選應用練習](book/communication-clinic-ZHTW.md)

## 這是什麼專案

Prysai LLM Playbook（Prysai 大模型實戰手冊）不是把 skills 平鋪在一起的目錄，也不是隻講安裝步驟的手冊。它是一套書籍式、課程式、實驗室式的 LLM 協作學習與實踐系統：先幫助學習者理解 GPT、模型、Codex、上下文、工具、Skill 和 Agent 的關係，再透過實驗把理解變成行動，最後把個人方法沉澱成可以評估、複用和更新的團隊能力。

它要帶領學習者完成一條完整成長路徑：從“我聽說過 GPT”開始，到能夠安全使用 Codex、穩定完成真實任務、理解 Agent 為什麼這樣行動、選擇和設計合適的 Skill，直到建立自己的工作系統並幫助團隊共同使用。

## 我們要解決的問題

很多人能讓 AI 生成一段看起來不錯的內容，卻不能穩定地讓它完成一個真實任務。問題通常不在於“不會寫一句提示詞”，而在於沒有形成完整的工作系統：

- 不清楚 GPT、Codex、模型、上下文、工具和 Skill 分別是什麼；
- 不知道什麼時候應該提問、什麼時候應該提供檔案、什麼時候應該讓 Codex 先檢查；
- 不知道如何把模糊目標拆成可執行任務；
- 不知道如何控制許可權、驗證結果和處理失敗；
- 安裝了很多 Skill，卻不知道它們為什麼有用、何時組合、何時不該使用；
- 個人試驗偶爾成功，卻無法變成團隊可複用、可審查、可持續更新的流程。

這套學習路徑用一條連續主線解決這些問題：

```text
認識 GPT → 認識 Codex → 安全準備 → 表達任務 → 管理上下文
       → 使用工具 → 選擇與組合 Skill → 理解 Agent 邏輯
       → 計劃/執行/驗證/交付 → 專業領域實踐 → 組織級協作
```

這條路徑有兩條同時推進的主軸：

- **理解主軸：** 認識 GPT 和模型如何工作，理解上下文、工具、Skill、Agent、許可權和驗證如何改變結果。
- **能力主軸：** 從小實驗開始，逐步練習任務表達、工作流設計、Skill 選擇、結果審查和團隊治理。

## 專案由哪些部分組成

下表列出主要目錄的職責。目錄本身是結構性入口，不代表其中的每一個 reader-facing 檔案都已經完成七語言遷移。

| 層 | 位置 | 儲存什麼 | 作用 |
|---|---|---|---|
| 書稿 | [`book/`](book/) | 章節、序言、目錄和實驗 | 用連貫內容建立概念、方法和判斷力 |
| 實驗室 | [`book/labs/`](book/labs/) | 低風險、可觀察的練習 | 讓學習者留下可檢查的操作證據 |
| 能力包 | `skills/` | Codex 可執行的工作指導 | 把成熟方法變成可複用能力 |
| 評測 | `docs/quality/`、`evals/` | 質量標準、任務夾具和審查記錄 | 判斷內容、Skill 和學習結果是否真的有效 |
| 治理 | `docs/governance/` | 許可權、來源、狀態、更新和貢獻規則 | 管理變化與責任邊界 |
| 研究 | `docs/research/` | 官方事實與真實問題研究 | 為易變斷言和現實案例保留證據邊界 |
| 展示頁 | `site/` | 公開展示頁及其說明 | 讓讀者從專案概覽進入學習路徑 |
| 自動檢查 | [`scripts/`](scripts/) | 專案、連結、狀態和學習路徑驗證器 | 把約定變成可重複執行的檢查 |

## 這套系統如何判斷“學會了”

學習者不能只提交一份看起來完成的輸出。每個關鍵能力都需要解釋證據、操作證據、判斷證據和審查證據；每個 Skill 都需要觸發條件、邊界、失敗處理、來源和 fresh-context 前測。目錄數量和安裝數量都不是掌握標準。

## 當前狀態

當前專案處於 v0.1 的產品地基階段：22 章書籍結構、18 個實驗、真實問題研究、26 個候選 Skill（25 個原創方法和 1 個已審查的外部編輯 Skill），以及約 40 項評測夾具已經建立。目錄、結構與靜態契約檢查不等於學習者已經完成、遷移或掌握這些內容。

書籍規範源為 English（`EN`），公開展示頁預設 English，並提供語言切換。繁體中文已經具備 22 章和 18 個實驗的 `-ZHTW` 候選檔案及同語言閱讀路徑；這表示課程單元可沿繁體中文路線往返閱讀，並不等於完整繁體中文課程已經透過獨立語言審校或學習者驗證。Skill、評測、研究檔案和部分補充讀物仍在遷移中。多語言架構要求每個 reader-facing 檔案帶明確字尾，同一內容 ID 的連結保持當前語言；在獨立語言審校完成前，現有翻譯保持 `in-progress`，不能被宣傳為完整七語言支援。

### 實際課程覆蓋率（22 章 + 18 個 Lab）

| 語言 | 當前可讀課程單元 | 這代表什麼 |
|---|---:|---|
| English | 40 / 40 | 規範源語言；不等於學習效果已經驗證。 |
| 簡體中文 | 40 / 40 | 22 章和 18 個實驗均有候選譯文；獨立語言審校待完成。 |
| Español | 40 / 40 | 22 章和 18 個實驗均有候選譯文；獨立語言審校待完成。 |
| 日本語 | 40 / 40 | 22 章和 18 個實驗均有候選譯文；獨立語言審校待完成。 |
| 한국어 | 40 / 40 | 22 章和 18 個實驗均有候選譯文；獨立語言審校待完成。 |
| Deutsch | 40 / 40 | 22 章和 18 個實驗均有候選譯文；獨立語言審校待完成。 |
| 繁體中文 | 40 / 40 | 22 章和 18 個實驗均有候選譯文；獨立語言審校待完成。 |

七條語言線均已具備 40 個課程單元的檔案與路徑；這只說明結構覆蓋，**不**表示七種語言都已完成獨立審校、文化適配、學習效果驗證或正式發行。頁面中的 `available / 40` 是路徑數量，不是準確度、自然程度、學習效果或發行狀態的分數。

章節 19–22、全部候選 Skill 和模型/工作流評測仍需要 fresh-context 前測與執行日誌。外部材料不會未經來源、許可證和內容審查直接進入主線；真實問題研究記錄的是使用者報告或社群建議，不自動等同於官方根因，也不等同於本地復現。

## 重要邊界

- 專案維護者的原創內容與外部來源必須分開記錄；組織歸屬和治理資訊見來源臺賬。
- 模型名稱、價格、入口、額度和具體功能屬於易變事實，必須帶來源和複核日期。
- “GPT-5.6 Luna 價效比最高”目前是需要用可重複評測驗證的產品假設，不是永久結論。
- 任何沒有明確許可證的材料都不直接複製進發行版。
- 學會使用 Codex 的標準不是安裝了多少 Skill，而是能否在明確邊界內穩定地產出經過驗證的結果。
- 不要把構建透過、靜態檢查透過、檔案存在或模型生成的輸出誤讀成瀏覽器、執行時、認證、外部服務或翻譯質量已經驗證。
- 本專案是獨立維護的學習與實踐專案，不是 OpenAI 官方文件或官方產品頁面。
- 示例、研究和實驗不得放入 token、密碼、API key、私鑰、Cookie 或 `.env` 檔案。

## 中文資料入口

- [繁體中文書籍導讀](book/README-ZHTW.md)
- [繁體中文前言](book/preface-ZHTW.md)
- [繁體中文書籍目錄](book/table-of-contents-ZHTW.md)
- [通用 LLM 第一任務](book/routes/universal-core-foundations-ZHTW.md)
- [繁體中文新手提示卡](book/communication-clinic-ZHTW.md)

術語表、治理規則、來源臺賬、評測定義、研究檔案和 Skill 說明尚未提供中文檔案。為保證這條路線始終使用中文，本入口不再把它們連結到原始語言頁面；相應內容翻譯並審校後，才會在這裡開放。

## 中文候選學習路徑

當前中文候選路徑不是隻有語言入口。它包括：

- `README-ZHTW.md`、`book/README-ZHTW.md`、`book/preface-ZHTW.md` 與本目錄；
- [中文新手提示卡](book/communication-clinic-ZHTW.md)：七張可直接複製的低風險文字練習卡；獨立語言審校、學習效果與跨模型執行證據仍待完成；
- [第 1 章](book/chapters/01-gpt-and-codex-ZHTW.md) → [實驗 011](book/labs/lab-011-gpt-codex-boundaries-ZHTW.md) → [第 2 章](book/chapters/02-first-safe-task-ZHTW.md) → [第一次安全改動夾具](book/routes/first-safe-change-ZHTW.md) → [實驗 001](book/labs/lab-001-first-safe-task-ZHTW.md) → [第 3 章](book/chapters/03-task-protocol-ZHTW.md) → [實驗 002](book/labs/lab-002-task-protocol-ZHTW.md)；
- [第 4 章](book/chapters/04-context-permissions-and-agent-ZHTW.md) → [實驗 007](book/labs/lab-007-action-boundaries-ZHTW.md) → [第 5 章](book/chapters/05-choose-the-codex-surface-ZHTW.md) → [第 6 章](book/chapters/06-model-selection-ZHTW.md) → [第 7 章](book/chapters/07-skills-plugins-and-tools-ZHTW.md) → [實驗 004：選擇最小有用能力](book/labs/lab-004-skill-selection-ZHTW.md) → [第 8 章](book/chapters/08-full-lifecycle-workflow-ZHTW.md) → [實驗 013](book/labs/lab-013-l3-vertical-slice-ZHTW.md) → [第 9 章](book/chapters/09-verification-and-recovery-ZHTW.md) → [實驗 003](book/labs/lab-003-evidence-review-ZHTW.md) → [第 10 章](book/chapters/10-planning-and-slicing-ZHTW.md)。

它們都是遷移中的 `ZH` 候選內容。22 章與 18 個實驗之外的 Skill、研究檔案、評測和治理檔案仍不代表已完成同內容 ID 的中文版本，語言質量也尚未由獨立審校者確認。後續遷移必須繼續使用同一內容 ID、明確語言字尾和同語言連結；只有檔案、審校與對應證據都存在時才可提升狀態。

## 名稱說明

當前對外名稱為 `Prysai LLM Playbook — From First Task to Reliable Work`，中文名稱為“Prysai 大模型實戰手冊：從第一個任務到可靠交付”。GitHub 倉庫路徑暫保持現有 slug；倉庫後設資料和舊連結遷移需要單獨決定。組織歸屬、維護責任和發行門禁記錄在治理與來原始檔中，不放進產品標題。
