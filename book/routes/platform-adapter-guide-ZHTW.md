<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: platform-adapter-guide-route | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 選擇你的 LLM 平臺：核心相同，介面卡一次加一個

**狀態：** `candidate`。**執行狀態：** `not_run`。

ChatGPT、Claude、Gemini、DeepSeek、Grok 和 Codex 都以對話的方式與你交流，
但它們並不是同一個產品。本路線保留 [Universal Core Foundations 路線](universal-core-foundations-ZHTW.md)
中可遷移的核心，然後一次只加入一個誠實的介面卡：各平臺真正不同的地方、
你今天能在每個平臺安全嘗試的內容，以及你在相信任何平臺特有說法之前
必須在官方來源中核實的內容。

Playbook 的主打練習路徑是 Codex，但方法並不繫結某一家廠商。下面列出的
每個平臺都是**候選介面卡**：通用核心仍然適用，而平臺特有的控制項必須
各自有帶日期的第一方來源，才能成為教學事實。

## 第零規則：永遠不要憑名稱推斷等價

一個模型名稱、一次登入或一個眼熟的按鈕，並不能證明兩個平臺共享工具、
許可權、記憶、賬號、價格、資料控制或 Agent 行為。在轉述任何平臺說法之前，
先問三個問題：

1. **具體是哪一個產品介面**（網頁聊天、應用、CLI、IDE、API、agent）？
2. **哪個第一方來源、在什麼時間核實過**，表明這件事今天依然成立？
3. **如果說法有誤，什麼會明顯地不一樣？**

如果三個問題你都無法回答，就把該說法標為 `unknown`，並記下下一次核查
的時間。關於這條規則背後的維護方法，請參閱
Platform Adapter Review Skill
和 Platform Fact Watch。

## 一頁平臺總覽

| 平臺 | 常見介面 | 與核心通常不同的地方 | 本頁中可安全嘗試的第一步 |
|---|---|---|---|
| ChatGPT | 網頁聊天、應用、API | 賬號範圍、記憶設定、檔案上傳、聯網搜尋開關、分享連結 | [ChatGPT 首個任務](#chatgpt-first-task) |
| Claude / Claude Code | 網頁聊天、CLI agent、IDE | 終端 + 檔案 agent、許可權提示、CLAUDE.md 專案記憶 | [Claude Code 首個任務](#claude-code-first-task) |
| Gemini | 網頁聊天、應用、API | Google 賬號範圍、Google Workspace 整合、應用擴充套件 | [Gemini 首個任務](#gemini-first-task) |
| DeepSeek | **本路線目前的來源憑據只涵蓋 API**；網頁聊天與應用程式不在這份證據範圍內 | API 的模型清單、帳戶限制與工具呼叫控制具有產品特定性且會變動；請核對具體介面的官方來源 | [DeepSeek 首個任務](#deepseek-first-task) |
| Grok | 網頁聊天、應用 | X 賬號整合、實時帖子訪問、模型釋出節奏 | [Grok 首個任務](#grok-first-task) |
| Codex | 桌面端、CLI、IDE、雲端、API | Playbook 的主打路徑：檔案、工具、Skills、Agents、許可權 | [Codex 路徑](../routes/first-safe-change-ZHTW.md) |

這張表是定位參考，不是等價證明。每一行在被課程引用之前，都仍然需要它
自己當前的來源。介面可用性、價格和許可權預設值變化頻繁；請把它們當作
易變事實。

## 任何平臺上的首個安全任務

把下面這段請求複製到你選擇的平臺。它使用虛構材料，不涉及工具，也不需要
賬號資料——同一個任務在任何地方都能完成，這正是核心的意義所在。

```text
結果：把這份虛構的俱樂部通知改寫成面向新會員的版本。
材料："俱樂部每週二 6 點開會。請自帶筆記本。房間稍後確認。"
回覆格式：寫兩個句子。保留材料中的每一個事實。把缺失的細節放在 [方括號]
裡。最後列出你保留的事實。
檢查：對照原文與改寫。不得出現新的時間、房間、費用、聯絡方式或承諾。
停止：不要聯網搜尋、傳送、釋出，也不要擅自假設未知細節。
```

然後自己檢查三件事：

1. 改寫中的每一句話，都能在提供的通知裡找到對應的原文嗎？
2. 回覆是否遵守了兩句的限制，並說明了保留了什麼？
3. 它是否新增了一個本應保持 `[unknown]` 的細節？

如果聊天介面主動提供搜尋、傳送、釋出、使用工具，或索要超出這個小練習
所需的更多材料，請停下來。平臺或許具備這些能力；有能力做，並不等於
被要求去做。

<span id="chatgpt-first-task"></span>

## ChatGPT 首個任務

開啟任意一個 ChatGPT 介面，執行上面的首個安全任務。然後記下一個你實際
能觀察到的平臺差異：回覆是否提到了聯網搜尋、記憶或分享連結？記錄你看到
的，而不是你假設的。要對 ChatGPT 的說法做有來源支撐的核查，請使用
Source Investigator Skill，
以 OpenAI 官方幫助頁面作為產品事實的權威來源。

<span id="claude-code-first-task"></span>

## Claude Code 首個任務

Claude Code 是一個終端 agent：它可以讀取和編輯你啟動它的那個專案裡的
檔案。在執行任何東西之前，先建立一個可丟棄的資料夾，在那裡執行首個安全
任務。留意許可權提示：它在編輯檔案或執行命令之前會先詢問嗎？這個提示正是
聊天與 agent 的區別所在——也是你做出選擇的地方。在專案記憶方面，
Claude Code 會讀取 `CLAUDE.md` 檔案；把裡面寫的內容都視為模型可能遵循
的指令，所以像審閱任何專案規則一樣審閱它。在完成
[First Safe Change 路線](first-safe-change-ZHTW.md) 的練習紀律之前，不要在
含有憑據、生產資料或破壞性命令的真實倉庫裡啟動 Claude Code。

<span id="gemini-first-task"></span>

## Gemini 首個任務

在 Gemini 聊天介面執行首個安全任務。留意當前生效的是哪個賬號範圍，以及
介面上是否提供應用擴充套件（Google Workspace、YouTube、Maps）。擴充套件會產生
外部影響：它可以代表你讀取或寫入資料，因此關於擴充套件的 Gemini 課程屬於
平臺適配主題，而不是核心主題。純文字的練習任務不要啟用擴充套件。

<span id="deepseek-first-task"></span>

## DeepSeek 首個任務

本頁有來源依據的 DeepSeek 介面卡**只涵蓋 API**。它沒有核實 DeepSeek 網頁
聊天或應用程式的可用性、行為、上下文視窗、價格或帳戶權限。如果你要使用
網頁聊天或應用程式，請針對那個具體介面查閱目前的第一方資料，並另外記錄
結果；本頁的 API 憑據不能作為它們的證據。

如果要做不需要金鑰、也不涉及私密資料的首個任務，請只在你獲准使用的介面
中執行上面的通用安全任務。如果明確獲准進行 API 實驗，請先查看
[DeepSeek 官方 API 文件](https://api-docs.deepseek.com/)，
再遵守下面單獨列出的 API 邊界。記錄實際使用的模型名稱和日期；不要把 API
金鑰、私有程式碼或內部文件貼到聊天或請求中。

<span id="grok-first-task"></span>

## Grok 首個任務

在 Grok 聊天介面執行首個安全任務。如果你的賬號關聯了 X，請注意帖子和
實時內容可能進入對話範圍；這既是平臺差異，也是一項隱私決定。不要把私信
或草稿貼上到可能觸達社交關係圖的對話中。Grok 引用最新帖子的回答是對該
平臺檢索行為的一種主張——在轉述之前，請對照 X/Grok 官方幫助頁面核實。

## Codex 首個任務

Codex 是 Playbook 的主打路徑，因為它把完整的迴圈攤開在你面前：上下文、
工具、許可權、Skills、Agents 和驗證。請從一個可丟棄的專案開始，先走
[First Safe Change 路線](first-safe-change-ZHTW.md) 和
[Lab 001](../labs/lab-001-first-safe-task-ZHTW.md)。在“先檢查再編輯”的
習慣變得順手之前，不要貿然跳到雲端介面或真實倉庫。

## 完成首個任務之後：該走哪條路徑？

- 你想要純文字的入門練習：[Beginner Practice Pack](../communication-clinic-ZHTW.md)。
- 你想要涉及檔案和工具的深度主打路徑：[First Safe Change](first-safe-change-ZHTW.md)。
- 你想先打好與平臺無關的基礎：[Universal Core Foundations](universal-core-foundations-ZHTW.md)。
- 你想公平地比較兩個平臺：LLM Comparison Protocol。
- 你想知道某個平臺課程是否應該納入課程體系：
  Platform Adapter Review。

## 證據狀態與邊界

本路線為 `candidate / not_run`：結構與檢查項已經就位，但還沒有任何
學習者執行、跨平臺執行或獨立評審的記錄。上面各平臺的描述，是根據官方
文件和帶日期的研究憑據整理出的定位參考
（cross-LLM beginner prompting source receipt、
platform teaching boundary card）。
它們不是任何平臺行為一致、任務在所有平臺都會成功、或產品功能彼此等價
的證據。平臺特有的命令、許可權、價格和可用性都是易變事實：在依賴它們
之前，請核對官方來源並記錄訪問日期。

- [ ] 我只使用了虛構、公開或經授權的文字。
- [ ] 我記錄了自己執行時的確切介面、可見的模型名稱（如有）和日期。
- [ ] 我沒有把某一平臺的行為當作另一平臺的證據。
- [ ] 我沒有貼上機密、私信或未釋出檔案。
- [ ] 當介面提供工具、聯網搜尋、上傳、傳送或釋出時，我停了下來。
