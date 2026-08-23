<!-- content_id: prysai-interruption-checkpoint | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 中斷檢查點

在 LLM 輔助任務中斷後，保存可觀察的任務狀態，並選擇一項安全的下一步決定。當模型不可用、任務逾時、工作階段遺失、工具缺失，或轉交在驗收證據出現前中斷時使用。不要用於重試、診斷已保留的互動、稽核既有主張或推斷平台行為。

## 只處理中斷這一段

當任務可能只完成一部分，且一次可見中斷讓下一步不清楚時使用，例如模型不可用訊息、逾時、工作階段遺失、工具缺失或轉交中斷。

遇到以下情況就轉交：

- 已保留請求、回覆和預期結果，需要溝通修復：使用 Communication Failure Triage；
- 完成、可靠性或發佈主張需要證據稽核：使用 Evidence Review；
- 目前的命名平台事實需要來源檢查：使用 Source Investigator；
- 新任務或變更任務需要行動和權限契約：使用 Task Protocol。

不要根據一次中斷診斷供應商、推斷根因、比較模型、解釋帳號狀態或建立一般恢復流程。

## 保留最小證據包

只收集請求者已能觀察的內容：

1. `goal` —— 用一句話寫出預期結果；
2. `observed_event` —— 可見的中斷事件，不寫原因；
3. `last_inspectable_artifact` —— 差異、測試結果、檔案檢視、筆記，或 `none_observed`；
4. `acceptance_evidence` —— 可建立完成的檢查，或 `unknown`；以及
5. `external_actions` —— 已傳送、變更、上傳、花費、提交或發佈的一切，或 `not_observed`。

不要用看似合理的帳號狀況填補缺少欄位。不要索取秘密、權杖、密碼、Cookie、私人紀錄、帳號截圖或無關任務上下文。

## 分類，但不要補完故事

只使用一個狀態：

- 只有已可檢查聲明的驗收證據時才是 `complete`；
- 有可檢查產物但不能建立聲明的驗收檢查時是 `partial`；或
- 產物、它的含義或驗收證據缺失時是 `unknown`。

中斷訊息既不是診斷，也不是任務證據。新提示詞不會從之前的任務繼承完成證明。

## 選擇一項有界線的下一步決定

預設在 `R0` 下選擇 `hold`：保存紀錄，不採取行動。

只有請求者指定一個本地、可逆的檢查目標、準確要觀察的內容，並承認這項檢查本身不能證明之前任務已完成時，才可以在 `R1` 提供 `inspect_local`。本 Skill 只記錄這項決定，不執行檢查。

對於新任務、重試、工具使用、模型切換、設定變更、帳號檢查、網路請求、上傳、花費、提交、推送、發佈或部署，停止並交給 Task Protocol。那裡必須另外界定權限、檢查點、回復和驗收檢查。

## 停止條件

目標、最後可檢查產物、驗收含義或下一個外部行動的權限缺失時回傳 `blocked`。絕不：

- 自動重試或傳送「從中斷處繼續」；
- 切換模型、帳號、方案、設定或供應商；
- 把來源報告當作中斷原因；
- 檢查帳號或外部服務；或
- 根據部分產物或令人放心的回覆宣告任務完成。

## 交付檢查點紀錄

必須準確回傳：

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

只有在明確保留 `unknown`、區分中斷和完成、不包含未批准的外部行動，並且最多指定一項下一步決定時才接受。這是候選方法，不是任務能夠恢復、服務可用或學習者能順利使用它的證據。

## 維護紀錄

- `source`：Prysai Lab 原創方法，源自有來源界線的中斷檢查點案例、任務協議和證據審查界線
- `license`：專案原創改寫；公開容量報告和 API 文件仍僅作參考
- `owner`：reliability-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-14`
- `content_status`：`candidate`
