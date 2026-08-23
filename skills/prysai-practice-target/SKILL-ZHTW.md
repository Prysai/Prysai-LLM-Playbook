<!-- content_id: prysai-practice-target | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 練習目標

把宏大或模糊的學習願望，轉成一個小而誠實、可直接用於提示詞的練習目標。當使用者說「七天學會西班牙文」「提高面試能力」「用 AI 學一項技能」，或詢問如何開始有時間限制的學習目標時使用。在開始教練循環前設定一個情境、基線、練習預算、允許的協助、可見檢查和退路。不要用於教授技能、製作學習計畫、評估熟練度、研究事實或承諾結果。

## 只負責設定目標

在 LLM 輔助的練習工作階段開始前，當學習者有目標但還沒有有界線的首次嘗試時使用。它準備交接；不會教學、修正、評分或建立長期課程計畫。

遇到以下情況不要擴大目標，而要轉交：

- 已有嘗試，學習者需要回饋、修正或變化案例練習：`prysai-learning-coach`；
- 需要寫一則尚未傳送的純文字請求：`prysai-dialogue-brief`；
- 想檢查既有的第一則請求：`prysai-first-turn-check`；
- 目標依賴目前事實、來源或「最好」的結論：`prysai-source-investigator` 或 `prysai-research-router`；
- 涉及檔案、工具、帳號、真人、考試、發佈、付款或其他外部影響：`prysai-task-protocol`。

不要索取學習者的私人紀錄、診斷資訊、憑證、雇主或學校資料，或考試答案。目標設定對話不會授予後續行動權限。

## 只詢問最小的缺少選擇

從學習者已經說出的目標開始。如果缺少一項決定，只問一個普通問題。優先問「你想先處理哪一種情境？」，不要問「你的程度是多少？」這類標籤問題。

只設定以下欄位：

```text
practice_target: one thing the learner will say, write, choose, explain, or do
situation: one ordinary context where it matters
baseline: one tiny unaided attempt, or not_run
session_budget: one time or turn limit
allowed_help: none, one hint, a lookup limit, or supplied material
visible_check: what a reader can inspect in the learner's attempt
fallback: the smaller version if the first attempt is too hard
```

拒絕把固定期限承諾當作目標。「七天學會法文」可以改成「在四輪法文文字交流中詢問火車時間，並解決一個二選一問題」。不能變成流利度、語言程度、口語對話結果或七天結果的主張。

## 回傳一份可用的轉交

欄位足夠時，必須準確回傳：

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

讓 `copy_ready_next_message` 保持日常、簡短。它必須要求接收訊息的模型等待學習者第一次作答、保留這次嘗試，並避免在學習者嘗試前提供潤飾好的答案。不要把紀錄變成評估、分數、角色、承諾或十二步計畫。

目標尚未解決時，回傳 `needs_one_answer`，只附一個問題，不要捏造計畫。安全關鍵、高風險或受考試規則限制的目標，回傳 `blocked` 並指出合格或獲授權的下一個路徑。

## 轉交前檢查

只有在結果命名一項可觀察表現、一個情境、一次有界線的首次嘗試、一條協助規則、一項可見檢查和一個較小的退路時才接受。讓所有未知項目保持可見。目標只表示可以開始練習；不表示學習者已經準備好。

## 維護紀錄

- `source`：Prysai Lab 原創方法，源自六階段候選練習紀錄、Beginner Practice Pack 和 Learning Coach 界線
- `license`：專案原創改寫；連結來源仍依 `docs/sources/asset-register.md` 僅作參考
- `owner`：learning-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-11-14`
- `content_status`：`candidate`
