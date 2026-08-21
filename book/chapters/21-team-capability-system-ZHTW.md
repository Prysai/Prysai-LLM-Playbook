<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: chapter-21-team-capability-system | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 21 章：構建團隊能力系統

> `content_status: candidate`
> `experiment_status: draft / not_run`
> 權限練習是靜態模擬。它不授權、不連線、不傳送、不寫入、不推送、不發布，也不證明生產連線可用。

## 本章要解決的問題

一個人可以憑經驗引導 Codex 完成任務。團隊面臨的卻是不同的問題：規則歸誰所有？哪個 Skill 值得信任？由誰來更新它？每個成員的權限是否都超出了任務所需？成功的例子能否在沒有口頭背景的情況下重現？沒有共同的語言、證據和責任，團隊只是在分發不透明的個人習慣。

## 真實問題入口

FP-03 涉及主機或組織識別不一致，FP-04 涉及跨多個組織授權時的混亂，它們都是公開的問題報告，不是關於連接器行為的普遍結論。在這裡，它們只被用來測試一件事：在共享能力之前，主機、組織、權限和所有權是否已被明確記錄。

## 學習目標

學完本章後，你應該能夠：

- 把個人方法拆分為共同語言、方法、證據和治理；
- 交付一個帶 manifest、版本、負責人、來源、權限矩陣和回滾說明的能力包；
- 讓另一位成員在可丟棄副本中獨立重現關鍵工作流程；
- 把使用、修改、執行、推送、發布和權限變更分配給不同的責任；
- 當能力的來源發生變化、範圍過寬或行為不再有證據支援時，阻止、回滾、遷移或退役該能力。

## 概念：團隊能力包的四層

```text
共同語言和專案規則
            ↓
可重複使用的方法與 Skill
            ↓
實驗、任務集和證據標準
            ↓
權限、審查、版本化和維護所有權
```

共同語言讓成員使用同一套術語。方法層定義有邊界的輸入、觸發條件、行動和停止條件。證據層在宣告的範圍內支撐結論。治理層決定誰可以使用、修改、發布和撤銷這個包。沒有證據，方法只是建議；沒有治理，它就可能傳播過時的事實或擴大權限。

## 決策：行動許可權與責任

「已登入」和「有存取權限」都不是批准紀錄。請用以下欄位逐項決定每個能力：

| 行動級別 | 資料範圍 | 技術權限 | 任務授權 | 批准人 | 所需證據 | 回滾或複核 |
|---|---|---|---|---|---|---|
| 唯讀分析 | 脫敏的可丟棄副本 | 唯讀 | 明確的任務範圍 | 任務負責人 | 輸入、來源和日誌 | 丟棄副本；按任務複核 |
| 草稿編輯 | 隔離分支 | 限定寫入 | 指定檔案或目錄 | 負責人加複核者 | 基線雜湊、diff 和驗證 | 復原 diff；合併前複核 |
| 執行檢查 | 測試資料 | 僅限指定指令 | 列出指令和逾時 | 執行負責人 | 日誌、退出碼和部分狀態 | 停止程序；復原副本 |
| 推送或發布 | 指定儲存庫或草稿端點 | 對目標的限定寫入 | 明確的發布請求 | 複核者或發布負責人 | 預覽、驗收和回滾 | 回復版本；保留稽核紀錄 |
| 權限變更或秘密處理 | 最小必要範圍 | 臨時且可撤銷 | 單獨的人工確認 | 指定授權人；必要時雙重複核 | 範圍、到期、稽核和回滾 | 立即撤銷；再次複核 |

能使用不等於能修改；能修改不等於能發布。如果範圍、目標、批准人或回滾不清楚，這個決定就是 `blocked`。

## 行動：定義最小能力包契約

使用一個可檢查的目錄。團隊可以重新命名檔案，但必須保留這些責任：

```text
capability-pack/
├─ README.md                  # 目的、範圍、快速重現、邊界
├─ manifest.yaml              # id、版本、負責人、狀態、下次複核
├─ context/
│  └─ project-context.md      # 術語、邊界、可信來源、執行模式
├─ protocol/
│  └─ task-protocol.md        # 輸入、決策、行動、停止、交付
├─ examples/
│  ├─ positive.md             # 正例
│  └─ failure.md              # 失敗和邊界範例
├─ eval/
│  ├─ acceptance.md           # 驗收標準和評分
│  └─ evidence-index.md       # 日誌、diff、驗證和未驗證項
└─ governance/
   ├─ permission-matrix.md    # 資料、範圍、批准和到期
   ├─ ownership.md            # 負責人、複核者和備援角色
   └─ rollback.md             # 回滾、遷移、退役和復原
```

至少，`manifest.yaml` 要包含：

```yaml
id: "team-capability-release-review"
version: "0.1.0"
owner: "person or team role"
status: "candidate"
source: "original | adapted | external link; license record location"
next_review: "YYYY-MM-DD"
decision_owner: "role that accepts or blocks the package"
allowed_scope: "redacted disposable copy / named test repository"
rollback: "discard disposable copy or restore baseline hash"
```

版本是可追蹤的變更識別符號，不是「行為已驗證」的同義詞。`candidate` 表示結構已經存在，而新鮮的獨立重現仍然不足。

## 實驗：交付一個團隊能力包

這是一個雙人、低風險、獨立重現的練習，不涉及任何真實的外部連線。

### 準備

選擇「發布前文件審查」或「新成員專案入門」作為固定任務。在臨時儲存庫或脫敏副本中工作。準備固定輸入 `team-pack-review-v1`：一份短文件，其中包含已完成項、未驗證項、一條過時指令和一項需要確認的權限。成員 A 建立能力包，包含 `version: 0.1.0`、負責人、來源、權限矩陣、三項驗收證據和回滾說明。儲存輸入雜湊和乾淨副本的雜湊。

不要連線外部服務、授權帳號、傳送訊息、上傳客戶資料、推送、發布，也不要把長期有效的秘密放進包裡。

### 任務

1. A 按任務協議執行一次，儲存日誌 `21-team-pack-review-v1-A-01`。
2. A 把包交給 B。B 在另一個可丟棄副本中只使用這個包和固定輸入，不做任何口頭補充，儲存 `21-team-pack-review-v1-B-01`。
3. B 記錄讀了什麼、採取了什麼行動、流程在哪裡停止、輸出 diff、驗證、權限判斷和隱性知識缺口。
4. A 只修改一個層級，把版本升到 `0.1.1`，並記錄變更和原因。B 以 `B-02` 再次執行。

### 證據門

證據包必須包含：

- `manifest.yaml`、目錄清單、版本和負責人；
- 固定輸入，以及 A 和 B 的可丟棄副本雜湊；
- 一個正例、一個失敗示例，以及協議或 `SKILL.md`；
- A、B 和修訂後 B 的獨立日誌、diff、驗證輸出和評分；
- 包含資料範圍、技術範圍、任務授權、批准人、到期時間和禁止行動的權限矩陣；
- 來源和授權條款紀錄位置、下次複核日期和回滾說明；
- 隱性知識缺口，以及修訂前後的差異；
- 未驗證項，以及相關的 `content_status`/`claim_status`。

每次執行都需要一條可定位的記錄：

```yaml
run_id: "21-team-pack-review-v1-B-01"
member: "A | B"
pack_version: "0.1.0"
input_hash: "sha256:..."
actual_changes: "no-change or diff summary"
validation: "commands, exit codes, and key output; not_run if not executed"
reviewer: "independent review role; not_assigned if none"
unverified_items: ["real connection", "production release", "long-lived permissions"]
status: "pass | fail | blocked | not_run"
```

如果沒有 `decision_owner`、日誌位置、獨立成員紀錄或未驗證項列表，這個包就保持 `candidate` 或 `blocked`。口頭交接不是證據。

從 0 到 2 分對五個維度評分：目標理解、情境處理、行動邊界、證據完整度和失敗停止。候選實驗通過要求 A 和 B 都至少達到 8/10，沒有未經授權的行動，並且 B 的關鍵工作流程在無口頭補充的情況下可以執行。缺少任何一份獨立日誌、權限矩陣、回滾計畫或輸入雜湊，結果就保持 `candidate` 或 `blocked`，不能稱為已驗證。

### 失敗案例與邊界

失敗變體一移除 `owner` 和 `version`；複核者應拒絕驗收。失敗變體二提供一份脫敏的靜態權限列表，其中每個外部能力都標記為 `requested`。這只是紙上模擬。不要在任何真實帳號、公共儲存庫、生產服務或包含秘密的環境中進行授權、連線、傳送、寫入、推送或發布。正確的回應是識別過寬的範圍、目標、批准人、到期和回滾要求，然後把包標記為 `blocked` 或 `candidate`。

### 反思

把缺口歸類到共同語言、方法、證據或治理之下。解釋為什麼 B 無法重現工作流程、應該改變哪個層級、修訂後哪些失敗或證據發生了變化，以及權限矩陣是否仍然比任務更寬。還要確定：如果負責人離開、來源過期或能力產生副作用，誰能回滾或退役這個包。「我理解了」不能替代日誌或 diff。

## 邊界與常見錯誤

- 共享脈絡不得包含密碼、長期有效的秘密、未經授權的客戶材料或無根據的市場主張。
- Skill 的名稱或目錄並不能證明其授權條款、觸發邊界、相依套件或行為已經過審查。
- 組織規則、任務脈絡和個人偏好是不同層級；外部文字不得靜默覆蓋組織規則。
- 模擬的權限結果只能證明審查流程被執行過，不能證明連接器、帳號或生產服務可用。
- 發布、權限變更和秘密處理需要單獨批准；實驗不會自動授予它們。
- 設定好的能力、成功的建置或宣告的團隊包，並不能證明執行期間行為、團隊成果、部署或使用者驗收。

## 遷移任務

把一個能力包從個人專案移入組織專案。重新檢查它的名稱、授權條款、品牌、資料範圍、權限、負責人、複核者、發布目標和回滾。寫出一條在遷移後仍然成立的假設，和一條必須放棄的假設。不要僅僅因為包的名字看起來眼熟就批准它。

## 驗收清單

- [ ] 我能把個人經驗拆分為共同語言、方法、證據和治理。
- [ ] 我能產出包含目錄、版本、負責人、來源、權限矩陣和回滾計畫的包。
- [ ] 另一位成員可以在可丟棄副本中重現關鍵工作流程，無需口頭補充。
- [ ] 每次執行都有輸入雜湊、`run-id`、日誌、diff、評分和未驗證項列表。
- [ ] 我能區分使用、修改、執行、推送、發布和權限變更的責任。
- [ ] 我能在靜態權限模擬中識別過寬的範圍，並拒絕真實的授權。
- [ ] 當包失敗時，它有回滾、遷移、阻止或退役的路徑。

## 來源與維護邊界

四層治理模型和包契約是本專案的方法論。Skill 分發、權限模式、連接器範圍和組織設定是易變的事實。這些紀錄把主張繫結到來源和範圍；靜態實驗不能證明生產連線性或團隊影響。

```yaml
- claim: "Skill and Plugin composition, distribution, and availability depend on the current product surface and configuration"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "capability-package maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox and approval settings define different access and pause boundaries; login status alone cannot establish them"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and governance maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

實驗保持 `draft / not_run`，本章保持 `candidate`。模擬的權限設定不包含任何真實的令牌、密碼、cookie 或連線資訊。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章節導覽">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-ZHTW.md" aria-label="上一章：第 20 章 · 構建個人 Codex 工作系統">← 上一章<br><strong>第 20 章 · 構建個人 Codex 工作系統</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-ZHTW.md" aria-label="下一章：第 22 章 · 持續更新與面向未來">下一章 →<br><strong>第 22 章 · 持續更新與面向未來</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
