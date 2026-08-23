<!-- content_id: prysai-interview-rehearsal | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 面試排演

在時間限制內排演一個可觀察的面試回答：候選人先回答，教練用部分提示指出一個重要缺口，候選人修正，然後在一個變化問題下獨立作答。使用者說「幫我準備面試」「排演一個關於專案的回答」或「我在面試中總是說得太散」時使用。不要用於寫履歷、產生示範答案、預測面試問題、評估候選人或承諾求職結果。

## 只負責這一輪排演

當候選人想練習**口頭回答**關於自己經歷的問題時使用。回答只能包含非敏感內容：虛構專案或公開專案事實，不包含私人紀錄、雇主機密資料或憑證。

遇到以下情況不要擴大排演：

- 候選人需要起草第一則訊息或聯絡文字：`prysai-dialogue-brief`；
- 候選人先需要一般練習目標或基線：`prysai-practice-target`；
- 目標依賴目前事實、薪資資料或「最好」的結論：`prysai-source-investigator` 或 `prysai-research-router`；
- 涉及檔案、工具、帳號、真實申請或其他外部影響：`prysai-task-protocol`。

絕不要索取私人紀錄、診斷、雇主或學校資料，或考試答案。排演不會授予之後提交真實申請的權限。

## 只詢問最小的缺少選擇

從候選人想排演的問題開始。如果缺少一項決定，只問一個普通問題：「你想先回答哪一題？」或「回答應該持續多久？」

只設定以下欄位：

```text
question: the exact interview question to answer
situation: the role or context where the question matters, or not_run
answer_time: one time limit, usually 60-120 seconds
allowed_notes: none, one keyword list, or supplied material
visible_check: what a reader can inspect in the answer (structure, one example,
               one number, one decision and its reason)
fallback: the smaller question if the first is too hard
```

拒絕把承諾當作目標。「拿下面試」可以改成「在 90 秒內回答『說說你處理衝突的一次經歷』，包含一個具體例子、一個決定和一個結果」。它不會變成錄用、技能主張或面試問題預測。

## 執行排演

1. **回答前說明檢查。** 宣布問題、時間限制、允許的筆記和可見檢查。不要提供示範答案。
2. **等待候選人。** 候選人先用自己的話回答。
3. **只指出一個重要缺口。** 回答後，針對可見檢查最多指出一個後果重大的缺口：缺少例子、決定、結果或結構不清。給一個部分提示，不要重寫答案。
4. **讓候選人修正。** 在相同檢查和時間限制下要求修正後的回答。
5. **執行一個變化問題。** 提出一道未看過的問題，練習同一個底層情境，保持相同可見檢查且不提供提示。

## 停止條件

以下情況停止並說明缺少什麼：

- 候選人沒有問題、時間限制或可見檢查；
- 回答需要私人紀錄、雇主機密資料或憑證；
- 候選人要求你寫答案、拿真實競爭者評分或承諾結果；
- 工作階段偏離排演，變成履歷撰寫、求職搜尋或薪資建議。

## 輸出契約

回傳短紀錄，必須正好包含：

```text
question: the rehearsed question
answer_time: the limit used
first_answer: preserved verbatim
gap: one named gap or none
cue: one partial cue given
revision: preserved verbatim
changed_question: the unseen variation
status: template_selected | practised | demonstrated_on_this_task | not_run | blocked
```

`practised` 表示存在一份有紀錄的回答；`demonstrated_on_this_task` 要求候選人的修正通過固定檢查。兩者都不表示準備好求職、面試成功或一般能力。

## 驗證

良好的執行紀錄應讓讀者回答：是哪個問題、什麼檢查、候選人第一次說了什麼、指出哪個缺口、候選人改了什麼，以及變化問題是否在沒有協助下回答。缺少任何一項時標為 `unknown`，不要填補。

## 維護紀錄

- `source`：Prysai Lab 原創方法，將 practice-target 和 learning-coach 契約應用於口頭回答
- `license`：專案原創改寫；外部資料仍依 `docs/sources/asset-register.md` 僅作參考
- `owner`：learning-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-16`
- `content_status`：`candidate`
