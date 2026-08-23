<!-- content_id: prysai-shift-handoff | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 工作交接

為持續的 LLM 協作準備一份目前工作簡報，把可重複使用的標準、變動中的項目、權限和驗收證據分開。當昨天的上下文或之前的例子可能被誤當成今天的工作時使用。不要用於建立產品背景、設計完整任務協議、恢復中斷任務、稽核完成主張或執行行動。

## 只負責重複工作這一段

當重複的文字工作流程已有持久標準，但其中一個項目發生變化時使用，例如按核准分類法整理今天的回饋、依固定文風審查本週簡短更新，或把一筆新來源紀錄轉成固定輸出形狀。

遇到以下情況就轉交：

- 可重複使用的產品、受眾、定位或衡量背景本身需要有版本的決策：使用 Product Context；
- 本任務的結果、範圍、權限或驗收仍不清楚：使用 Task Protocol；
- 之前的任務在證據可見前停止：使用 Interruption Checkpoint；
- 請求、回覆和預期結果已存在，需要受控修復：使用 Communication Failure Triage；
- 變動中的項目是需要來源檢查的目前事實：使用 Source Investigator；
- 工作包含檔案、資料集、工具、帳號、網路請求、共享系統或外部行動：先交給 Task Protocol，再準備目前項目的簡報。

不要把重複聊天模式變成關於記憶、上下文視窗行為、成本、持久性、自動化或命名產品設定的主張。

## 要求一張穩定卡和一張目前卡

只收集以下可見輸入。欄位缺失就標為 `missing`；不要從另一段聊天或早期例子取回或推斷。

**穩定卡**——在指定工作流程內重複使用：

1. `work_stream` —— 用一般語言描述的重複工作；
2. `criteria_revision` —— 規則的版本、日期或不可變引用；
3. `allowed_inputs` —— 每個項目都可以使用的資料；
4. `forbidden_assumptions` —— 不得繼承的事實、來源、權限或舊輸出；以及
5. `response_shape` —— 結果的必要形式。

**目前卡**——只對這一個項目成立：

1. `item_id` —— 不含敏感資料的本地標籤；
2. `item_input` —— 提供的目前文字或最小安全摘要；
3. `item_change` —— 今天有什麼新內容或不同之處；
4. `task_request` —— 現在要求的一個結果；
5. `acceptance_evidence` —— 可檢查它的可見規則或產物；以及
6. `authority_and_risk` —— `R0` 純文字準備，或 `handoff_required`。

項目含有秘密、私人紀錄、未授權來源文字、沒有支持的事實主張或未核准的行動時，拒絕簡報。不要索取不必要的歷史對話。

## 寫作前先比較

1. 區分哪些欄位屬於穩定卡，哪些欄位只屬於目前項目。
2. 早期例子只能作為已標示的參考；它不是目前項目的事實，也不是驗收結果。
3. 目前沒有重新提供的事實、權限、來源、期限、目的地或驗收檢查，標記為 `missing` 或 `not_authorized`。
4. 目前項目改變穩定標準時停止。不要靜默修改可重複使用的卡；交給其負責人，或視情況交給 Product Context／Task Protocol。
5. 只有對 `R0`、使用者提供的文字工作，才回傳可複製簡報。後續行動仍需要自己的界線和證據。

## 回傳一份交接紀錄

必須準確回傳：

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

只有穩定卡、目前卡、請求、回應形式、驗收證據和 `R0` 界線都可見時，才使用 `ready_for_text_only_current_item`。紀錄是上下文界線，不是證明模型保留規則、理解項目、產生正確回答或完成下一項任務。

## 失敗檢查

以下情況停止或轉交：

- 請求者說「照上次規則做」，卻說不出標準修訂或目前驗收檢查；
- 舊例子靜默變成今天的來源或真相；
- 目前項目包含檔案、憑證、私人資料、瀏覽、發佈、花費、帳號變更或其他外部影響；
- 目前項目改變穩定評分表、權限、目的地或輸出契約；或
- 回覆已被當作完成。使用 Evidence Review，而不是把它重新標為交接。

## 維護紀錄

- `source`：Prysai Lab 原創方法，源自有來源界線的重複項目研究紀錄、Task Protocol、Product Context 和 Interruption Checkpoint 界線
- `license`：專案原創改寫；官方指南和公開回報仍僅作參考
- `owner`：workflow-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-11-14`
- `content_status`：`candidate`
