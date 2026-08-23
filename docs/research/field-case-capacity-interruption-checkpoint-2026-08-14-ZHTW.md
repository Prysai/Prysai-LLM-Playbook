<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# 現場案例：任務中斷後，先暫停再重試

## 先從這裡開始：不要讓中斷消失

選定的模型無法使用時，很容易立刻送出下一個提示、切換設定，或假設任務已經快完成。先停下來。在開始下一次嘗試前，做一張小型檢查點卡，把已知事實與希望發生的事分開：

1. 用一句話寫下目標。
2. 保留實際能檢查的最後一項產物，例如 diff、測試結果、筆記，或明確記錄沒有產物。
3. 所有缺少的結果都標為 `unknown`，不要用令人安心的故事填補空白。
4. 確認上一次任務是完成、部分完成或未知後，才選擇一個有界的下一步。

本頁是離線決策練習。它不會送出提示、重試或切換模型、檢查帳號，也不會說明任何供應商會如何執行。它只要求：一次中斷必須先留下可審閱的紀錄，才可以變成下一項任務。

![中斷檢查點：新提示前先暫停，記錄已知與未知，再選擇一個有界的下一步。](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## 案例身分

- `case_id`：`FC-CAPACITY-01`
- `title`：任務中斷後，先暫停再重試
- `problem`：任務因模型無法使用的訊息而中斷，學習者必須避免把未觀察到的結果當成任務已完成。
- `audience`：使用模型輔助工作介面的初學者與審閱者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第 6 章；第 9 章；第 19 章
- `related_labs`：Lab 001；Lab 013
- `related_skills`：Interruption Checkpoint；Task Protocol；Evidence Review；LLM Comparison Protocol
- `related_evaluations`：`three-task-smoke-v1`，狀態為 `not_run`

## 來源紀錄

- `source_type`：`github_issue`
- `source_url`：https://github.com/openai/codex/issues/33865
- `source_title`：關於選定模型無法使用的公開報告
- `source_author_or_publisher`：公開 GitHub Issue 作者
- `accessed_at`：2026-08-14，見[模型容量現場訊號](field-signal-model-capacity-budget-2026-08-14.md)
- `source_license_or_usage_boundary`：公開報告僅供參考；本案例使用原創摘要與虛構離線夾具
- `quotation_policy`：未複製 Issue 原文、留言、紀錄、帳號細節、模型名稱、機器資訊、指令輸出、解法、螢幕擷圖或任務內容
- `source_scope`：Issue 只表示一名作者在特定日期公開報告選定模型無法使用。它不說明根因、普遍性、目前可用性、重試行為、服務政策、佇列語意、修正方法，或其他介面、帳號、模型、供應商的行為。相關現場訊號也記錄官方 API 速率限制指南；該指南只說明 API 邊界，不能證明它解釋這份 Codex 報告或兩個介面的行為相同。

## 報告情況

- `user_report_summary`：一名公開 Issue 作者描述，在指定環境中出現容量相關訊息，無法使用選定模型。
- `observed_symptom`：來源表示選定模型在作者取得完整任務結果前就無法使用。
- `expected_behavior`：作者希望選定模型能用於目標任務；這不是供應商承諾。
- `official_boundary`：對這次報告的 Codex 事件為 `unknown`。關聯 API 文件只描述 API 速率限制邊界。
- `product_surface`：來源報告為 CLI；本專案未重現
- `product_version`：本案例不將其視為已核實事實
- `operating_system`：本案例不將其視為已核實事實
- `model_or_provider`：刻意省略；本案例不是模型比較
- `network_or_auth_context`：未檢查；未使用帳號或使用權益
- `input_shape`：附有明確驗收檢查的有界本地編輯任務
- `risk_level`：後續提示可能作用於不清楚的本地狀態時為 `medium`

## 主張與證據表

| 主張 | 證據類別 | 來源或產物 | 日期 | 範圍 | 限制 | 狀態 |
|---|---|---|---|---|---|---|
| 一名作者公開報告 Codex 情境中的選定模型無法使用。 | `reported` | [GitHub Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | 一份有日期的公開報告 | 不是重現、診斷、普遍性量測或支援承諾 | candidate |
| OpenAI API 文件說明 API 的請求速率限制與回應標頭。 | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits)，由[現場訊號](field-signal-model-capacity-budget-2026-08-14.md)限定 | 2026-08-14 | 僅限 API 文件 | 不說明本報告根因，也不定義 Codex 行為 | candidate |
| 中斷的任務已完成、部分完成或可以安全恢復。 | `not_observed` | 沒有檢查本地任務、重試、帳號、模型或產物 | 2026-08-14 | 本儲存庫 | 沒有證據不等於沒有發生工作 | unverified |
| 後續提示前應保留明確檢查點。 | `project_inference` | 本離線案例；第 6、9 章；`three-task-smoke-v1` | 2026-08-14 | 保守的學習方法 | 不能保證恢復、保留內容或避免中斷 | candidate |

## 重現狀態

- `reproduction_status`：`not_run`
- `reproduction_scope`：本專案沒有選擇模型、傳送任務、檢查帳號、重試請求、修改設定或取得服務遙測。
- `fixed_input_or_fixture`：下方**教學轉換**中的原創虛構紀錄
- `logs_or_artifacts`：只有在批准獨立審閱的離線執行後，才可保留學習者建立的檢查點回執
- `independent_reviewer`：待定
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小安全診斷路徑

| 步驟 | 唯讀檢查或低風險行動 | 預期觀察 | 停止規則 |
|---|---|---|---|
| 1 | 停止虛構任務，把目標、最後可見產物與驗收檢查寫入本地回執。 | 目標與未觀察到的結果分開。 | 目標、產物類別或驗收檢查未知時停止；不要送出下一個提示。 |
| 2 | 只使用列出的產物，把上一個狀態分類為 `complete`、`partial` 或 `unknown`。 | 缺少的證據保持可見，不會被寫成假定完成。 | 沒有驗收證據就不要標記 `complete`。 |
| 3 | 選擇一個下一步：有界唯讀檢查、帶著回執的新任務，或暫停並查看目前官方說明／狀態路徑。 | 下一步寫明自己的證據，不繼承中斷任務的證明。 | 在重試、切換模型、修改設定、消耗額度、上傳內容或聲稱恢復前停止。 |

- `allowed_actions`：閱讀虛構案例、寫本地檢查點、分類證據、命名一個未來決定
- `forbidden_actions`：傳送提示、重試、切換模型、修改設定、查看帳號、消耗額度、上傳檔案、呼叫 API、提交、推送、發佈或使用秘密
- `minimal_safe_probe`：不含真實產品資料的五行本地檢查點回執
- `stop_condition`：最後產物、驗收含義或下一項外部行動的授權缺失
- `rollback_or_cleanup`：刪除不需要的本地虛構回執；系統、帳號與儲存庫都未改變

## 教學轉換

- `learner_problem`：初學者正在起草一個小修改時看到模型無法使用的訊息，想送出「從剛才繼續」。
- `core_concept`：可見的中斷、一項產物與成功完成任務是三件不同的事。新的嘗試不會繼承上一個任務的證明。
- `decision_to_teach`：要麼保留回執並在新任務前做一次有界檢查，要麼暫停並使用目前官方說明或狀態路徑。前者能釐清本地證據；後者避免在授權或證據不足時繼續增加活動。兩者都不保證容量、恢復或完成。
- `smallest_experiment`：只使用下列虛構紀錄：

  ```text
  goal: 在本地練習頁加入一行驗收清單
  last_visible_event: 出現模型無法使用的訊息
  artifact_available: 尚未檢查完成摘要、diff 或測試結果
  tempting_next_action: 傳送「從剛才繼續」
  ```

  不開啟工具，建立這張檢查點卡：

  ```text
  goal: 加入一行驗收清單
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: diff 或檔案檢視，以及清單結果
  next_decision: blocked — 任何新任務前先保留這張回執
  external_actions: not_run
  ```

- `intentional_failure`：聲稱已加入該行、聲稱重試會安全繼續、武斷地說模型很差，或聲稱事件由 API 速率限制造成。
- `required_artifact`：六行檢查點，以及一句解釋「為什麼新提示不能證明上一項任務已完成」的話
- `acceptance`：檢查點寫明目標；沒有產物時保留 `unknown`；區分事件與完成；不主張原因或供應商行為；記錄 `external actions: not_run`。
- `transfer`：把同一檢查點用於逾時、瀏覽器工作階段遺失、工具缺失、交接中斷或其他中斷。保持不變的是下一步需要新證據；變化的是可觀察產物與安全邊界。
- `forbidden_claims`：目前服務可用性、根因、佇列行為、重試成功、模型品質、平台等同性、計費行為、任務完成、安全有效性、學習者能力、遷移成功或已可供生產使用

## 內容位置

- `primary_chapter`：[第 9 章——驗證、懷疑與復原](../../book/chapters/09-verification-and-recovery-ZHTW.md)
- `supporting_chapters`：[第 6 章——模型選擇](../../book/chapters/06-model-selection-ZHTW.md)；[第 19 章——評估模型與工作流程](../../book/chapters/19-evaluate-models-and-workflows-ZHTW.md)
- `primary_lab`：[Lab 013——可審計垂直切片](../../book/labs/lab-013-l3-vertical-slice-ZHTW.md)
- `supporting_labs`：[Lab 001——第一個安全任務](../../book/labs/lab-001-first-safe-task-ZHTW.md)
- `related_skill`：[Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md)；[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)；[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)；[LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture`：[three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md)，`not_run`
- `update_registry_entry`：公開報告變化、納入一手 Codex 指引、提出現場執行，或讀者要求產品特定恢復方案時複查

本案例將一個既有公開訊號轉化為可教學的候選案例，但不提高關聯章節、實驗、Skill、評測或平台主張的成熟度。

## 隱私、權限與維護

- `personal_data_removed`：是；未重用來源身分、帳號或環境細節
- `secrets_removed`：是；未包含憑證、Token、方案、模型識別碼、專案路徑、任務內容或紀錄
- `private_paths_removed`：是
- `copyrighted_material_boundary`：僅使用原創摘要與虛構夾具；未複製 Issue 原文、留言、解法或文件正文
- `asset_register_entry`：S103，見 `docs/sources/asset-register.md`
- `volatile_facts`：Issue 狀態、來源中繼資料、服務可用性、API 速率限制細節、產品控制、說明路徑與平台行為
- `next_review`：2026-09-14，或在提出恢復、容量或產品主張之前
- `change_trigger`：來源變化、納入一手 Codex 文件、提議現場執行，或要求教授重試／設定流程
- `owner`：research-maintainer

## 主張邊界

- `what_can_be_claimed`：一份有日期的公開報告現在被呈現為有界候選案例，包含來源類別、證據類別、重現狀態、離線檢查點練習與停止條件。
- `what_must_not_be_claimed`：報告普遍、目前有效、可重現或由 API 速率限制造成；中斷可以安全恢復；某個供應商較好或較差；練習能避免遺失；或已建立學習者、執行階段、發佈或生產主張。
- `next_smallest_check`：經獨立審閱並取得同意後，執行虛構檢查點的離線練習；不得收集帳號、模型、任務、提示、專案、用量、個人或外部服務資料。
- `current_status`：`candidate`
