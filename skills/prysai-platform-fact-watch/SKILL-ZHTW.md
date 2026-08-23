<!-- content_id: prysai-platform-fact-watch | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 82c7fae | source_license: project-owned CC-BY-4.0 -->

# 平台事實監測

把「這個平台可能有變動」轉成一個小而明確的維護決策。這個 Skill 會盤點既有主張及其影響範圍；它不會瀏覽網頁、執行產品、接納新的適配器、發佈版本，也不會取代來源審查。

## 先建立主張卡片

至少需要：一個明確的平台、一個有來源支持的主張或 claim ID、目前面向讀者的位置、來源負責人和 URL、最近檢查日期、適用範圍、負責人、下次審查日期，以及這次審查的原因。缺少任何欄位都標記為 `unreviewed`，不能把它當成無害的空白。

讓主張保持窄而具體。「Claude Code 有一種權限模式」和「Grok Build 有一條 API 路由」是兩張不同的卡片。平台名稱、功能標籤或 HTTP 回應，都不能取代一個主張。

## 對變動訊號分類

在不推斷目前產品行為的前提下，選擇一個狀態：

- `review_due`：排定的審查日期已到，或來源尚未按聲明的間隔檢查；
- `source_changed`：有日期的第一方來源審查報告了與既有主張的實質差異；
- `source_unavailable`：引用的來源目前無法支持這項主張；
- `scope_changed`：主張可能已不再適用於指定的介面、帳號、地區、版本或權限界線；
- `no_change_recorded`：有日期的第一方來源審查確認，在記錄的範圍內沒有變化；
- `unreviewed`：沒有合適的第一方審查可用。

不能根據記憶、重新導向後的 URL、搜尋摘要、社群貼文或一次成功登入來選擇 `no_change_recorded`。來源檢查只能在記錄的日期和範圍內確認一項陳述。

## 對照受影響的教學面

列出每個受影響的規範單元，並標明它扮演的角色：

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

明確的權限、證據、復原和最小副作用等穩定核心原則通常仍可使用。產品指令、介面路徑、權限預設值、價格、權益、整合或模型可用性屬於適配器事實，需要來源審查。不要把來源變動解讀成整門課程都失效。

## 選擇最小的安全行動

- `no_change_recorded`：保留目前範圍內的措辭，只更新審查紀錄；不要宣稱它具有更廣泛的持久性。
- `review_due` 或 `unreviewed`：保留通用核心，把指定步驟標記為待審查，並將目前事實交給 `prysai-source-investigator`。
- `source_changed`、`source_unavailable` 或 `scope_changed`：在來源審查確定替代措辭前，暫停或移除指定的教學步驟。保留舊紀錄作為歷史證據。
- 如果變動讓適配器的來源、執行、權限或失敗紀錄受到質疑：將准入決策交給 `prysai-platform-adapter-review`。
- 如果公開主張、產生的頁面或發佈說明已經寫出了舊事實：發佈更正前，將證據包交給 `prysai-evidence-review`。

絕不能憑記憶靜默改寫產品操作步驟。不要根據新鮮度紀錄就把一個適配器說成已接納、安全、等價或可用於正式環境。

## 回傳維護紀錄

只回傳一筆紀錄，內容包括主張卡片、變動狀態、受影響單元、讀者風險、安全的暫時文字、來源審查轉交、任何適配器或主張稽核轉交、負責人、下次審查日期，以及未知項目。

最後必須附上這項限制：`This receipt manages the freshness boundary of one named platform claim. It does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence.`

## 維護紀錄

- `source`：源自 ADR-0025、內容生命週期、事實影響登錄表和有來源界線的適配器准入紀錄，由 Prysai Lab 原創的維護方法
- `license`：專案原創改寫；第一方平台文件和公開報告仍依 `docs/sources/asset-register.md` 僅作參考
- `owner`：facts-maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-14`
- `content_status`：`candidate`
