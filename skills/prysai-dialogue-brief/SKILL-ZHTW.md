<!-- content_id: prysai-dialogue-brief | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# 對話簡報

把一個尚未嘗試、風險較低的請求，整理成一則簡短、可以直接複製傳送的第一則訊息。這個 Skill 負責在實質回答、工具操作、研究或學習循環開始前，把請求的範圍說清楚；它不會執行請求，也不會代替你判斷回答是否正確。

## 先確認是否適用

只有在以下條件全部符合時才使用：

- 使用者尚未送出請求，也沒有需要修復的失敗回答；
- 目標是一次純文字、低風險的首次對話；
- 不需要檔案、工具、帳號、瀏覽、私人紀錄、發佈或任何外部操作；
- 使用者只是想把一個範圍明確的請求表達清楚，而不是練習技能或研究事實。

如果學習者需要基準、回饋、修正或遷移練習，請轉給 `prysai-learning-coach`。如果請求涉及 Codex、工具、Skill 或 Agent，請轉給 `prysai-codex-coach`。如果涉及檔案、工具、帳號、權限、外部操作或實際交付目標，請轉給 `prysai-task-protocol`。需要最新事實、來源或有依據的結論時，請轉給 `prysai-source-investigator` 或 `prysai-research-router`。如果原始請求和不滿意的回答已經存在，請使用 `prysai-communication-failure-triage`；如果要確認既有主張是否有證據支持，請使用 `prysai-evidence-review`。

不要索取秘密、敏感個人資料、未公開紀錄、憑證、帳號狀態或私人提示詞。整理簡報不代表取得後續行動的授權。

## 只收集第一輪需要的資訊

盡量保留使用者原本的說法，收集以下欄位：

```text
outcome: 第一則回覆應產生的一個可觀察結果
audience: 誰會使用或閱讀結果
supplied_inputs: 這一輪安全可用的文字或事實
constraints: 必須保留的事實、限制、語氣、排除項目或協助規則
output_shape: 要求的形式與長度
acceptance_check: 使用者接受前要檢查什麼
stop_boundary: 不得發生什麼，或缺少哪個事實就必須停止
```

如果缺少的欄位會實質改變結果，請依照下方 `needs_clarification` 格式只提出一個簡單的澄清問題。不要先寫半成品、猜測受眾、用看似合理的細節填補未知，也不要為了讓簡報看起來完整而連問多個問題。如果澄清一次後仍無法說出可觀察的結果，請回傳 `blocked: outcome_not_observable`，並指出最小的待決定事項。

## 撰寫第一輪簡報

先回傳 120–180 字的簡報，再回傳一則可以直接複製的第一輪訊息。範圍只限這一輪。使用直接、一般的語言；不要加入角色扮演、情緒壓力、隱藏推理要求、效能承諾或泛泛的「請盡力」填充語。

可複製的訊息必須以自然句子包含以下標籤：

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

如果回答需要而使用者沒有提供某個事實，請要求接收訊息的模型把它標記為 `unknown`，不要自行補寫。如果需要來源，請先要求來源計畫，或在缺少來源時停止；不要在沒有證據時要求模型給出充滿把握的事實回答。

## 回傳簡短紀錄

如果缺少重要欄位，請精確回傳：

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

欄位足夠後，請精確回傳：

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

只有在保留使用者提供的事實、包含一個可觀察的驗收檢查、不擅自擴大行動或資料範圍，並且為超出第一輪的工作指出轉交路徑時，才接受輸出。`ready_to_copy` 只代表簡報已準備好；它不證明模型行為、回答品質、學習效果、事實正確性、使用者滿意度或任務完成。

## 維護紀錄

- `source`：以 communication-clinic、task、evidence 和 routing 契約重新整理的 Prysai Lab 原創方法
- `license`：專案原創改寫；外部資料仍僅作為 `docs/sources/asset-register.md` 中的參考
- `owner`：communication-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
