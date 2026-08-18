<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: chapter-07-skills-plugins-and-tools | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 第 7 章：Skill、Plugin、MCP 和工具如何分工

**狀態：** `candidate`。**比較：** `not_run`。這裡的案例教授的是方法，不能證明某個外部 Skill 已成功執行。

**從這裡開始：** 先說清任務缺口，再選擇恰好填補它的最小能力。

## 本章要解決的問題

“我需要一個 Skill”並不總是正確診斷。Skill、Plugin、MCP 伺服器、聯結器、指令碼、模板和普通文件解決的是不同問題。把它們當成可互換的標籤，人們就會安裝超出任務需要的能力，讓上下文更難檢查，也會在不知不覺中擴大可能的外部副作用。

真正有用的問題不是“哪個目錄裡的 Skill 最多”，而是：

> 這項任務缺少什麼？哪一種最小能力可以填補這個缺口，同時讓許可權、許可證、依賴和證明仍然可控？

## 學習目標

完成本章後，你應該能夠：

- 解釋方法、連線、執行和分發四層之間怎樣分工；
- 從任務本身推導最小有用組合，而不是從目錄開始；
- 在採用 Skill、Plugin 或聯結器前檢查觸發條件、依賴、許可證、許可權、副作用和證據；以及
- 區分檔案存在、能力被發現、被載入、被採用和行為已驗證這些不同狀態。

## 現實問題入口：任務開始前，發現機制就可能失敗

專案的 [Codex 現場研究](../evidence-library-ZHTW.md#source-notes) 記錄了兩份公開報告。它們適合作為症狀，而不是官方根因分析或本地復現：

| 公開症狀 | 報告者觀察到什麼 | 它**不能**證明什麼 | 第一個安全響應 |
|---|---|---|---|
| 使用者 Skill 作為普通檔案能工作，但改成檔案符號連結後不再被發現 | 檔案表示方式改變後發現結果也改變；報告還比較了硬連結 | 每個 Skill 掃描器、作業系統或發行版本都有同一缺陷 | 儲存精確的檔案表示和工作面；在隔離測試中比較普通檔案與連結，再記錄結果 |
| 顯式使用 Skill 依賴一個隱式的可用列表 | 使用者無法把顯式請求當成獨立於當前工作面列表的行為 | 該報告描述通用路由規則或官方產品保證 | 分別儲存可見列表、精確請求、會話和已載入資源證據 |

這些報告讓一條實際邊界變得可見：倉庫裡有一條路徑，不等於當前宿主發現了這個 Skill；有一個可見名稱，不等於本會話載入了它；載入完成也不等於它的外部依賴或許可權已經工作。

## 1. 四層能力模型

在選擇包之前，用這些層來命名你缺少的能力：

```text
方法層       Skill           完成某類任務的可重複方法
連線層       MCP/聯結器      外部資料、上下文或動作
執行層       Tool            讀取、編輯、執行、瀏覽或呼叫
分發層       Plugin          分發多種能力的組合包
```

真實產品中這些層可能重疊，但它們回答的是不同的設計問題：

| 層 | 它貢獻什麼 | 它本身不會授予什麼 |
|---|---|---|
| Skill | 某種可重複任務或工作流的指令與支援資源 | 許可權、外部訪問，或該方法在此環境中有效的證明 |
| MCP 伺服器 / 聯結器 | 通往外部工具、資源、上下文或動作的橋樑 | 認證、每項動作的審批，或安全的資料邊界 |
| Tool | 讀取檔案、執行命令或呼叫 API 之類可觀察操作 | 使用它的理由、使用授權，或結果正確的證據 |
| Plugin | 可組合多種能力的分發與組合包 | 自動授權，或其中每個元件都可用的保證 |

對於應當每次都以確定方式執行的重複邏輯，指令碼通常更合適；穩定的輸出形狀更適合模板；只需在特定情形閱讀的背景知識更適合文件。方法本身會反覆出現、但仍需要依上下文判斷時，Skill 才真正有價值。

## 2. 按限制範圍的順序選擇

安裝或啟用任何能力前，按以下順序思考：

1. 判斷任務是否已有清晰協議；沒有，就先澄清任務。
2. 如果同一方法反覆出現，而且人們經常漏步驟，再考慮 Skill。
3. 如果任務需要外部資料或外部動作，再問聯結器或 MCP 伺服器是否真的必要。
4. 如果轉換是確定性的，優先使用指令碼。
5. 如果多種能力必須一起交付，再把 Plugin 當作分發層考慮。
6. 只有這之後，才決定是否安裝、認證或開放額外許可權。

這個順序故意保守。大型目錄會讓任務看似更有能力，卻讓實際的依賴和許可權圖更難看清。

## 3. 從任務缺口開始，而不是從 Skill 名字開始

採用候選項前，書面回答每一個問題：

- **任務缺口：** 缺少的是穩定方法、確定性指令碼、外部連線，還是任務本身還沒定義？
- **觸發與排除：** 哪些輸入應觸發該能力？哪些相似請求不得觸發，或必須由其他 Skill 處理？共享關鍵詞並不夠。
- **來源與版本：** 另一位審查者能否檢查 URL、固定 commit、版本或歸檔 hash 與庫存日期？
- **許可證與依賴：** 倉庫許可證是否覆蓋目標檔案？NOTICE 檔案、巢狀資產和執行時依賴是否已盤點？
- **許可權與副作用：** 它能讀取或寫入什麼？是否需要網路或賬戶？能否傳送、釋出、刪除、修改，或以其他方式改變外部系統？
- **驗證與維護：** 隔離測試能否覆蓋正例、邊界、失敗和遷移案例？誰來審批、負責、備份、更新，並演練回滾？

外部目錄條目數量不是質量指標。自動化包同樣可能帶來賬戶、網路和第三方服務風險；每個候選項都要依據自身證據審查。

### Plugin 包含什麼，以及支援到哪裡為止

官方 [Plugins 文件](https://learn.chatgpt.com/docs/plugins.md) 把 Plugin 描述為一個可安裝的能力包，其中可以包含 Skills、Connectors 或兩者。一個 Connector 可由 MCP 伺服器支援，為外部系統提供工具、共享資訊或動作。因此 Plugin 是分發和組合層，不是授權許可。

在 2026-08-09 檢查的官方支援說明中，Plugins 列為支援 ChatGPT Chat/Work 的 web、desktop 和 mobile；ChatGPT desktop 應用中的 Codex；以及 Codex CLI 的 Plugin 瀏覽器。它沒有列出 IDE 擴充套件支援 Plugins。移動端 Chat/Work 可用，不代表移動客戶端與桌面端擁有相同的目錄瀏覽或安裝工作面。

把產品與連線狀態視為一條需要分別取證的鏈：

```text
產品支援 → 賬戶或組織授權 → Plugin 安裝
→ 聯結器認證 → 新會話 → Skill/Tool 可見
→ 實際呼叫 → 外部結果驗證
```

每個箭頭都是獨立斷言。官方 Plugin 記錄還說明，“Sign in with ChatGPT”並不會自動授予 Plugin 資料訪問或批准動作；請求的許可權仍需單獨審查和批准。當前來源記錄將這些邊界關聯到 `OF-015`、`OF-016`、`UF-001`、`UF-003` 和 `LB-002`；在改變受影響章節或實驗前，先檢視[事實影響登記表](../../docs/governance/fact-impact-registry.yaml)。

2026-08-10 檢查的官方 Skills 和 Plugins 材料還將自動匹配與顯式選擇描述為不同入口：ChatGPT 使用 `@` 提及，Codex 使用 `$` 提及；它把安裝後的新 chat 或 CLI 會話列為流程的一部分。這些是易變產品事實，不是 Skill 自動附帶的許可權。一次本地檢查應記錄工作面、會話、精確呼叫字串、載入資源、行為輸出和結果驗證。本倉庫沒有收集此類執行時記錄，因此相關狀態仍是 `not_observed`。

## 4. 採用前審查包

安裝前，產出一份 `skill-adoption-decision.md` 記錄，而不是寫一句“已檢查許可證”就結束。最低應記錄：

```text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
```

下面四種決策值描述的是採用過程，不是專案內容工件的狀態：

| 決策 | 含義 | 允許你說什麼 | 不允許你說什麼 |
|---|---|---|---|
| `recommendation-only` | 任務匹配看似合理；繼續只讀審查或隔離試驗 | “值得進一步審查” | “已批准安裝”或“可以使用” |
| `blocked` | 缺少許可證、NOTICE、版本、依賴、許可權或回滾證據 | “暫不採用；以下條件可解除阻塞” | “先安裝，之後再補記錄” |
| `approved-to-install` | 版本、目標範圍、備份、回滾和審批點已經明確且獲接受 | “可在這個範圍內安裝” | “已安裝”或“已驗證” |
| `installed-candidate` | 目標路徑與安裝記錄可觀察，但行為與採用審查仍未完成 | “存在一個隔離安裝候選項” | “團隊已採用”或“生產就緒” |

專案的 `draft`、`candidate`、`verified` 和 `production-ready` 標籤仍與這些採用決策分開。GitHub 頁面可訪問，不能證明許可證清晰；manifest 存在，不能證明工具呼叫成功。

### 五種很容易混淆的狀態

| 狀態 | 最低證據 | 它不能證明什麼 |
|---|---|---|
| 檔案存在 | 固定版本中的路徑、manifest 條目、庫存或 hash | 當前工作面能夠發現它 |
| 已發現 | 當前工作面的可見列表或名稱解析記錄 | 本會話載入了它 |
| 已載入 | 新會話中的資源或指令證據 | 團隊已經採用它 |
| 已採用 | 宣告範圍中含有它的所有者與審批記錄 | 行為已驗證 |
| 已驗證 | 宣告環境中的正例、邊界、失敗和遷移證據 | 另一個賬戶、入口或版本具有同樣行為 |

安裝也是可觀察動作。目標路徑和成功安裝日誌可以支援 `installed-candidate`，卻不能跳過發現、載入、採用或行為驗證。

### 兩個採用決策示例

- **推薦項：** S05 的 `code-review-and-quality` 是合併審查任務中一個合理的 `recommendation-only` 候選。來源為 `https://github.com/addyosmani/agent-skills` 的本地歸檔，SHA-256 證據為 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`，且有倉庫級 MIT 訊號。觸發條件是固定 diff 和審查請求；它不應只因生成新功能或審查基線未定義就觸發。巢狀依賴、目標 Skill 的完整資產集、實際許可權和回滾仍未審查，因此正確下一步是隻讀審查或離線隔離試驗，不是批准安裝。所有者為 Prysai LLM Playbook 維護組。
- **阻塞變體：** S06 的 `webapp-testing` 必須保持 `blocked`。它來自 `https://github.com/composio-community/awesome-codex-skills` 的本地歸檔，SHA-256 為 `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`。庫存確認根目錄 Apache-2.0 訊號，但沒有確認每個巢狀 Skill、指令碼與資產都具有一致許可證或 NOTICE 覆蓋。如果目標安裝路徑、配置備份與恢復檢查也不清楚，存在 `SKILL.md` 還不夠。只有完成逐項許可證審查並具備可演練回滾，才能解除阻塞。在此之前不要下載、安裝，或把它描述為已發現或可用。

## 5. 組合能力，不要疊加能力

有用組合通常是：

```text
任務協議 → 領域方法 → 工具或連線 → 證據審查
```

對於低風險營銷實驗，任務協議定義目標與限制，產品上下文方法提供受眾和定位，分析工具記錄決策所需資料，Evidence Review 則檢查事件是否真的發生。開啟十個重疊 Skill，往往不如使用一種方法與一條清晰協議那樣容易理解路由和上下文。

## 6. 組合前先交接

當一種能力把工作傳給另一種能力時，使用同一組交接欄位：

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

領域 Skill 負責它的方法；Task Protocol 負責執行邊界；Evidence Review 檢查已有斷言；Workflow Orchestrator 負責階段和檢查點。一個 Skill 不會因為被呼叫就獲得另一個 Skill 的許可權，也不應遞迴啟動完整編排。

## 7. 實驗：比較三種能力組合

### 準備

選擇一個本地、低風險、可逆任務。準備任務協議、兩個固定版本的候選 Skill，以及一個會要求外部連線的模擬選項。其中一個候選項適合繼續隔離審查；另一個應因許可證、NOTICE 覆蓋或回滾不清而被拒絕。不要上傳真實資料、傳送訊息、寫入第三方服務或認證外部賬戶。為每種組合分配 `run-id`，同時保持任務文字與驗收量表不變。

### 任務

為同一任務設計三種方式：

1. 只使用清晰任務協議；
2. 任務協議加一個領域 Skill；以及
3. 任務協議、領域 Skill 加外部連線。

對每個候選 Skill，先完成採用前審查包。本實驗只做只讀審查：不要安裝、認證或啟用團隊級配置。比較輸出質量、耗時、許可權範圍、驗證成本和副作用；說明額外能力何時帶來淨收益，何時只增加複雜度。

### 證據

儲存三種方式、各自 `run-id`、兩份 `skill-adoption-decision.md`、依賴和許可權表、許可證發現、模擬或實際輸出、驗證結果，以及明確的“未執行外部動作”清單。一條透過記錄必須讓來源與版本可檢查；將許可證結論指向實際檔案；命名安裝、備份與回滾目標；識別所有者和審批點；覆蓋正例、邊界、失敗和遷移行為；並保留不需要額外連線的基線。模擬呼叫必須標為模擬，不能報告為成功執行時呼叫。

### 覆盤

記錄推薦和拒絕候選項的決策值及原因。解釋需要什麼證據，才能把候選項從 `recommendation-only` 或 `blocked` 移動到下一狀態。對每一項觀察，標明它證明的是檔案存在、發現、載入、採用還是驗證；絕不以早期狀態替代後期狀態。

## 刻意失敗與邊界案例

為任務給出三個重疊 Skill，其中一個要求外部上傳，而任務實際只需要本地整理。再加入一個候選項：其倉庫可訪問、`SKILL.md` 也存在，但許可證或回滾不清楚。

學習者透過的條件是：識別重疊性，拒絕不必要許可權，將不清楚候選項標記 `blocked`，並保留只使用任務協議或一個 Skill 的基線。

## 遷移

把四層模型應用到研究工作流和產品報告工作流。對每一個，識別哪種能力是方法、哪種是連線、哪種確定性轉換可以是指令碼。

## 來源與維護邊界

| 事實或邊界 | 來源 | 訪問日期 | 適用範圍 | 負責人 / 下次複核 |
|---|---|---:|---|---|
| 作為任務或工作流指令及支援資源的 Skills，包括顯式選擇 | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) 與[事實重新整理記錄](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 訪問當日的官方產品描述；不是某個 Skill 在此處已啟用或載入的證明 | `facts-maintainer` / 2026-09-09 |
| Plugin 的組合、支援工作面、安裝、聯結器認證和獨立審批 | [Plugins](https://learn.chatgpt.com/docs/plugins.md) 與[事實影響登記表](../../docs/governance/fact-impact-registry.yaml) | 2026-08-09 | 官方支援說明；目錄內容與賬戶或組織訪問可能變化 | `facts-maintainer` / 2026-09-09 |
| MCP 伺服器、暴露的工具/資源/提示詞，以及工具允許/拒絕或審批配置 | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | 官方 Codex 宿主配置；伺服器的認證、工具與組織策略仍須分別檢查 | `facts-maintainer` / 2026-09-09 |
| 有副作用的聯結器或 MCP 動作可屬於審批邊界 | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | 官方審批模型；不是本倉庫當前執行時配置 | `facts-maintainer` / 2026-09-09 |
| 與符號連結和顯式 Skill 呼叫有關的發現症狀 | [Codex 現場研究](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 公開使用者報告；沒有本地復現或官方根因宣告 | `curriculum-maintainer` / 2026-09-09 |
| 候選歸檔庫存與許可證訊號 | [Skill 候選目錄](../evidence-library-ZHTW.md#source-notes) 與[資產登記表](../evidence-library-ZHTW.md#source-notes) | 2026-08-09 | 專案庫存與審查邊界；不是批准安裝任何外部 Skill | `source-maintainer` / 2026-11-09 |

Skill、Plugin、聯結器、MCP、manifest、認證和呼叫細節都可能變化。官方頁面或當前工作面發生變化時，先重新整理第一方記錄，再審查事實影響登記表、本章、相關 Labs、Skills、評測 fixture 和站點路徑。將官方產品描述、社群症狀和本地執行時證據寫在不同句子中。

## 驗收清單

- [ ] 我能用自己的話區分 Skill、Plugin、MCP 伺服器、聯結器、Tool、指令碼、模板和文件。
- [ ] 我能說明候選項的任務缺口、觸發條件、排除條件、來源版本、許可證、依賴、許可權、副作用、所有者與回滾。
- [ ] 我能讓一個候選項保持 `recommendation-only`，並在許可證或回滾不清時將其標為 `blocked`，而不是先安裝。
- [ ] 我能區分檔案存在、發現、載入、採用和行為驗證。
- [ ] 我能在輸入、驗收和證據邊界固定時，比較僅協議的基線與增加能力後的組合。
- [ ] 我能說明哪些外部動作沒有執行，以及在聲稱執行時成功前需要什麼證據。
- [ ] 我能報告本章仍是 `candidate`，其比較實驗仍為 `not_run`，直到存在執行記錄和審查證據。

本繁體中文譯文為可讀的 `in-progress` 翻譯單元，獨立語言審校尚未完成；它不是已驗證譯文，也不表示課程已經透過學習者驗證。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章節導覽">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-ZHTW.md" aria-label="上一章: 第 6 章 · Model selection is not model worship">← 上一章<br><strong>第 6 章 · Model selection is not model worship</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-ZHTW.md" aria-label="下一章: 第 8 章 · The complete lifecycle from definition to delivery">下一章 →<br><strong>第 8 章 · The complete lifecycle from definition to delivery</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
