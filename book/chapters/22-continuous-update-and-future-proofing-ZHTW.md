<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 22 章：持續更新與面向未來

> `content_status: candidate`
> `experiment_status: draft / not_run`
> 練習只在可丟棄副本或隔離分支中執行。它不使用生產存取權、真實憑據、推送、發佈或外部批次替換。

## 本章要解決的問題

Codex 入口、模型、推理設定、權限、Skill 分發和外部服務都可能變化。如果一套工作流程沒有來源、範圍、複核日期、遷移計畫或回滾路徑，今天還能正常工作的內容，幾個月後就可能誤導人。持續維護不是競相採納每一個新功能的競賽，而是一種有紀律的方式，用來判斷什麼穩定、什麼易變、什麼必須重新核查，以及舊版本應在何時保留、阻塞、遷移或下線。

## 真實問題入口

FP-01 涉及身分驗證流程的迴歸，FP-06 涉及 Skill 發現的邊界，FP-10 涉及一條可能看似停滯的驗證指令，它們都是公開的使用者報告。它們不能取代目前的第一方文件或本機重現，而是練習影響分析、版本決策、停止與回滾的有用素材。

## 學習目標

學完本章後，你應該能夠：

- 區分穩定原則、產品用法、領域方法和例項事實；
- 用 `claim`、來源、查閱日期、範圍、負責人、複核日期和 `claim_status` 記錄每項易變主張；
- 當模型、工具或 Skill 變化時，建立影響矩陣以及最小化的遷移與回滾計畫；
- 區分 `current`、`stale`、`disputed`、`removed` 與 `draft`、`candidate`、`verified`、`production-ready`；
- 依據證據和維護責任，決定一項能力應當保留、更新、阻塞、遷移還是下線。

## 概念：壽命不同的四個層級

| 層級 | 示例 | 維護方式 |
|---|---|---|
| 穩定原則 | 脈絡影響理解；工具改變行動空間；證據支撐完成宣告 | 教學、實驗與邊界複核 |
| 產品用法 | Codex 入口、Skill 呼叫、權限模式、設定 | 對照具體的第一方頁面重新核查 |
| 領域方法 | 工程、研究、行銷、文件與資料工作流程 | 練習任務與人工複核 |
| 例項事實 | 模型 ID、價格、額度、參數和第三方 API 行為 | 綁定帶日期的來源；必要時遷移或移除 |

「事實是 current」並不等於「章節已 verified」。請讓這些名稱空間保持明確：

- 內容成熟度使用 `content_status: draft | candidate | verified | production-ready`；
- 易變主張使用 `claim_status: current | stale | disputed | removed`；
- 執行觀察使用 `planned | authorized | executed | verified | not_run`。

## 決策：更新、保留、阻塞還是下線

| 證據情形 | 主張狀態與動作 | 退出條件 |
|---|---|---|
| 權威來源仍然可用、範圍仍然匹配，且相關評測透過 | `current`；保留或更新解釋 | 已記錄來源、複核日期和受影響的使用方 |
| 來源相互衝突、帳號範圍不清，或觀察到的行為與來源衝突 | `disputed`；暫停確定性的措辭 | 標記未知項並指派複核負責人；不發佈確定的結論 |
| 來源不可用，且沒有替代證據 | `stale`；警告或臨時阻塞 | 不要再把舊主張當作目前事實呈現 |
| 授權條款或安全條件不再允許該能力，且沒有安全的替代方案 | `removed`；下線該能力 | 保留遷移說明與復原資訊 |
| 存在相容的替代方案，且遷移與評測通過 | `current`；發佈遷移說明 | 寫明舊範圍、替代路徑、證據與下次複核 |

發現變化並不等於應該整體重寫。先梳理影響。沒有負責人、證據或回滾目標的改動就是 `blocked`。

## 行動：主張記錄、影響矩陣與更新流程

為每項易變事實使用穩定的欄位：

```yaml
claim: "目前的主張"
source: "官方或其他權威 URL"
checked_at: "YYYY-MM-DD"
applies_to: "產品、版本、地區、帳號或組織範圍"
owner: "維護者或團隊角色"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

更新流程是：

```text
發現變化
    → 判斷影響與風險
    → 定位受影響的章節、Skills、Labs、任務集、prompts 和權限
    → 閱讀來源或收集有邊界的執行期間證據
    → 做出最小化的安全改動
    → 重跑相關檢查與評測
    → 獲得全新脈絡的複核
    → 發佈、保留舊版本、遷移、阻塞或下線
```

對於模型或 Skill 遷移，要重新核查任務集的首次通過行為、錯誤類型、脈絡、工具、權限、觸發器、輸出格式、授權條款、維護者和故障復原。來源重新整理只會在其宣告範圍內更新一項主張；它不能證明帳號層級存取、執行期間行為、部署或團隊成效。

## 實驗：處理一個假設的產品變更

這是一次可丟棄、可逆轉的更新演練，不是對真實產品的操作。

### 準備

在臨時副本或隔離分支中，建立只包含下面這條脫敏主張的 fixture `update-impact-demo-v1`：

```yaml
claim: "示例工具入口在 2026-08-01 被描述為支援動作 X"
source: "https://example.invalid/public-doc"
checked_at: "2026-08-01"
applies_to: "僅用於示例學習 fixture；不是真實產品主張"
owner: "練習維護者"
next_review: "2026-11-01"
claim_status: "disputed"
```

`example.invalid` 是刻意不可用的，因此初始主張必須保持 `disputed`：不要存取它、執行它的指令，或把它當作真實的產品證據。儲存目標檔案的 SHA-256、基線目錄清單、變更前的 diff 和執行 ID。不要存取生產環境、使用真實憑據、推送、發佈、執行批次替換，或連線外部服務。

### 任務

假設一位維護者收到通知，說動作 X 的公開描述發生了變化，但這位維護者沒有第二個可信來源。只在臨時副本中：

1. 保持主張為 `disputed`，並暫停確定性的教學措辭。
2. 建立一張至少包含以下各行的影響矩陣：

   | 使用方 | 受影響的內容 | 風險 | 所需行動 | 證據 | 負責人 | 狀態 |
   |---|---|---|---|---|---|---|
   | 章節 | 主張與示例 | 讀者誤解 | 最小化改寫 | 來源或 diff | 內容維護者 | pending |
   | Skill | 觸發器或輸出 | 錯誤動作 | 停止或遷移 | 評測日誌 | Skill 負責人 | pending |
   | Lab | 輸入或透過標準 | 無效比較 | 更新 fixture | 執行 ID 或得分 | 評測負責人 | pending |
   | 權限說明 | 範圍或審批 | 越權 | 靜態複核 | 權限矩陣 | 安全負責人 | pending |
   | 任務集 | 任務或禁止動作 | 迴歸缺口 | 建立新版本 | 任務結果 | 評測負責人 | pending |

3. 只修改紙面 fixture 中必要的主張狀態和說明性註記。不要把未經證實的替代行為寫成事實。
4. 只執行相關的已配置檢查或靜態檢查，並記錄命令、退出碼和輸出。如果沒有任何檢查執行，就寫 `not_run`。
5. 記錄 `run-id: 22-update-impact-demo-v1-01`、變更前後的 diff、未證實項和回滾動作，並完成更新決策卡。

決策卡必須包含 `decision_owner`、`delivery_target`（本練習中僅限臨時副本）、`reviewer` 和 `rollback_target`。缺少任何欄位，狀態就保持 `blocked`；紙面上的狀態變更不是一次完成的更新閉環。

### 證據門

證據包必須包含主張 YAML、來源快照或來源不可用紀錄、查閱日期與範圍、影響矩陣、變更前後的雜湊、diff、檢查輸出、狀態轉換的原因、未證實項列表、負責人、下次複核日期和回滾說明。必需項一共十件：claim、source、scope、owner、`next_review`、基線雜湊、變更後雜湊／diff、影響矩陣、驗證日誌和未證實項列表。缺少任何一件，都意味著更新閉環尚未完成。

回滾必須能在不存取生產環境的情況下執行：從變更前的雜湊復原臨時副本，或者丟棄臨時副本或分支。保留變更前後的 diff 和結果。「檔案看起來已復原」不是回滾證據。

### 失敗案例與邊界

刻意製造一次失敗：把一個新的模型名或動作名替換進所有文件，卻不更新任務集、範圍、來源、權限或遷移說明。停止這種做法，在臨時副本中保留失敗的 diff，復原基線雜湊，並把被遺漏的下游使用方補進影響矩陣。如果來源相互衝突、授權不明確、負責人缺失或評測未執行，就讓主張保持 `disputed` 或 `stale`、工作保持 `blocked`；不要發佈它。

### 反思

回答：哪個層級發生了變化？哪個來源最重要？哪個下游使用方被遺漏了？哪個未知項仍未證實？為什麼正確的狀態是 `current`、`stale`、`disputed` 或 `removed`？誰負責下次複核，什麼觸發器會啟動它？哪個改動可以被刪除以降低風險？引用實際的雜湊、diff、日誌或明確的 `not_run` 狀態；僅憑計劃不是證據。

## 邊界與常見錯誤

- 更大的目錄並不能證明能力系統得到了改進；一項新能力必須增加證據、價值或涵蓋範圍。
- 可存取的官方來源並不能證明某個本機入口、帳號或組織已啟用該功能。
- 使用者報告是一條研究條目，而不是自動成立的官方根因。
- 批次名稱替換不能替代影響分析、評測、權限複核和授權條款複核。
- `claim_status: current` 只表示該項主張在其宣告範圍內有目前來源，並不表示章節、Skill、實驗、部署或執行期間是 `verified`。
- 成功的建置、準備好的包或成文的遷移都不是生產行為或團隊成效的證據，除非該證據確實存在。

## 遷移任務

選擇一個真實但脫敏的外部 Skill 候選。用主張紀錄和影響矩陣，把它從「未複核」推進到 `blocked` 或「適配候選」。說明它在授權條款、相依套件、觸發器、權限、風險、負責人和評測證據方面還缺少什麼。不要僅僅因為名字看起來合適就批准它。

## 驗收清單

- [ ] 我能區分穩定原則、產品用法、領域方法和例項事實。
- [ ] 每項易變主張都有 `claim`、`source`、`checked_at`、`applies_to`、`owner`、`next_review` 和 `claim_status`。
- [ ] 我能用影響矩陣在章節、Skills、Labs、任務集和權限說明中定位下游影響。
- [ ] 我能解釋主張狀態與內容成熟度之間的區別。
- [ ] 更新演練在可丟棄副本或隔離分支中記錄了雜湊、diff、日誌、回滾和未證實項。
- [ ] 我知道何時應保留舊版本、阻塞、遷移或下線，而不是執行批次替換。
- [ ] 我能說出下次複核的負責人和觸發器。

## 來源與維護邊界

生命週期、影響矩陣、回滾和證據門屬於本專案的方法論。模型名稱、ID、入口、推理設定、Skill 行為和權限邊界是易變的產品事實，必須對照目前的第一方來源重新核查。

```yaml
- claim: "模型名稱、ID、入口、推理設定和可用性以目前官方 Models 文件為準"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "官方文件所述 Codex 與 ChatGPT 入口、帳號範圍和版本範圍"
  owner: "內容與模型評測維護者"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Skill 的發現、呼叫、分發和 Plugin 組合是易變的產品事實"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "官方文件所述產品入口、帳號範圍和組織範圍"
  owner: "Skill 維護者"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "sandbox、審批和安全邊界必須對照目前文件與實際授權的設定進行核查"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "官方文件所述操作面與配置範圍"
  owner: "安全與治理維護者"
  next_review: "2026-11-09"
  claim_status: "current"
```

專案的更新流程在 [`docs/governance/content-lifecycle.md`](../evidence-library-ZHTW.md#method-and-status) 中有進一步說明。本章保持 `candidate`，練習保持 `draft / not_run`；上面的 `claim_status` 值不會改變這兩個結論。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章節導覽">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-ZHTW.md" aria-label="上一章：第 21 章 · 構建團隊能力系統">← 上一章<br><strong>第 21 章 · 構建團隊能力系統</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
