<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# 現場案例：`FC-NETWORK-01`——請求遭封鎖，不代表可以擴大權限

## 先守住邊界

請求遭封鎖，表示目前路徑無法繼續；這不代表可以開放不受限制的網路、Proxy 或更大的權限。

動設定前，先寫下三件事：

1. 任務需要的一個外部結果，不要加入真實端點或秘密。
2. 能核准最小例外的人，或可替代外部請求的核准離線產物。
3. 最小的非敏感探測，以及獲准後要保存的證據。

其中任何一項未知，就停下來要求更小的決定。本頁是離線決策輔助，不是設定教學；它不發出網路請求、不教 Proxy 設定，也不記錄產品執行行為。

## 案例身分

- `case_id`：`FC-NETWORK-01`
- `title`：請求遭封鎖，不代表可以擴大權限
- `problem`：網路請求被封鎖，使用者必須決定要申請狹窄且可審查的例外，還是在沒有證據時擴大存取。
- `audience`：使用具工具程式設計環境的初學者與審閱者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第 4 章；第 9 章；第 13 章
- `related_labs`：Lab 001；Lab 007；Lab 016
- `related_skills`：Task Protocol；Evidence Review
- `related_evaluations`：未分配

## 來源紀錄

- `source_type`：`forum`
- `source_url`：https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`：關於沙盒 Codex CLI 工作階段出站存取的公開提問
- `source_author_or_publisher`：公開 Stack Overflow 貢獻者
- `accessed_at`：2026-08-10，見論壇研究集 `field-problems-forums-2026-08-10.md`
- `source_license_or_usage_boundary`：公開報告僅供參考；本案例只使用原創摘要與虛構離線夾具
- `quotation_policy`：未複製文章內容、設定片段、紀錄、憑證、真實環境 URL 或解法指令
- `source_scope`：問題只表示一名作者在一個環境中描述出站請求被封鎖。它不證明目前設定語法、官方產品邊界、安全解法、根因或其他環境的行為。

## 報告情況

- `user_report_summary`：一名公開提問者描述，在保留沙盒的同時需要命令存取一個公共主機，但請求在任務完成前遭封鎖。
- `observed_symptom`：作者報告類似 Proxy 或允許清單的出站阻擋。
- `expected_behavior`：作者希望狹窄範圍的網路路徑能與沙盒並存。
- `official_boundary`：本案例為 `unknown`；不教授目前設定語法或支援保證。
- `product_surface`：報告所稱的 CLI
- `product_version`：未記錄為已核實事實
- `operating_system`：未記錄為已核實事實
- `model_or_provider`：與教學決定無關
- `network_or_auth_context`：報告受限的出站路徑；未檢查帳號、Proxy 或憑證
- `input_shape`：任務需要一個公共主機，但真實主機刻意省略
- `risk_level`：若真實任務會擴大網路、暴露專案內容或加入 Proxy，則為 `high`

## 主張與證據表

| 主張 | 證據類別 | 來源或產物 | 日期 | 範圍 | 限制 | 狀態 |
|---|---|---|---|---|---|---|
| 一名作者報告在沙盒 Codex CLI 工作階段中出站請求被封鎖 | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | 一個報告環境 | 提問不是重現、診斷或支援保證 | candidate |
| 報告包含目前且安全的設定方案 | `not_observed` | 沒有複製、測試或獨立審閱設定 | 2026-08-14 | 產品設定與部署 | 有意排除在本案例之外 | unverified |
| 請求被封鎖就代表授權開放網路或修改 Proxy | `not_observed` | 沒有擁有者授權或線上任務 | 2026-08-14 | 修改網路政策的權限 | 封鎖是邊界證據，不是移除邊界的許可 | unverified |
| 請在目標、理由、最小範圍與安全探測可審查前維持封鎖 | `project_inference` | 本案例、第 13 章、Lab 007 與 Lab 016 | 2026-08-14 | 保守的外部副作用教學規則 | 不定義供應商設定，也不保證例外安全 | candidate |

## 重現狀態

- `reproduction_status`：`not_run`
- `reproduction_scope`：本專案未發出網路請求、檢查線上沙盒、修改 Proxy、加入允許清單或使用帳號。
- `fixed_input_or_fixture`：**教學轉換**中的離線紀錄
- `logs_or_artifacts`：獲准後可保留邊界卡與簡短決策紀錄
- `independent_reviewer`：待定
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小安全診斷路徑

| 步驟 | 唯讀檢查或低風險行動 | 預期觀察 | 停止規則 |
|---|---|---|---|
| 1 | 用本地夾具寫明所需結果、主機類別、允許行動、證據與停止條件。 | 外部效果和任務目標分開。 | 主機、理由、擁有者、資料類別或外部效果未知時停止。 |
| 2 | 把合成封鎖記為 `reported`，列出缺少的有效政策、目標、最小範圍與安全探測。 | 錯誤形態的紀錄仍是邊界證據，不是診斷。 | 不推斷設定變更、產品缺陷或解法成功。 |
| 3 | 為擁有者準備決策請求：為何需要主機、最小非敏感探測、要保存的證據與復原路徑。 | 審閱者可以核准、拒絕或縮小例外。 | 線上請求、Proxy 變更、政策編輯、安裝、上傳或使用憑證前停止。 |

- `allowed_actions`：閱讀虛構紀錄、分類證據、撰寫本地決策請求、找出離線替代方案
- `forbidden_actions`：發出網路請求、編輯網路政策、加入 Proxy、暴露秘密、安裝相依套件、變更權限、提交、推送、發布或使用帳號
- `minimal_safe_probe`：四行邊界卡，以及一份寫明最小主機範圍與非敏感測試的核准請求
- `stop_condition`：缺少擁有者決定、資料分類、目的地、證據計畫或復原路徑
- `rollback_or_cleanup`：不需保留時刪除本地暫存紀錄；虛構夾具不變

## 教學轉換

- `learner_problem`：任務需要外部輸入，但第一次請求遭封鎖，學習者想直接移除限制。
- `core_concept`：技術限制、任務需要和修改限制的權限是不同事實。錯誤不會自動產生新權限。
- `decision_to_teach`：暫停並申請最小且可審查的例外，或使用核准的離線產物、延後任務。兩者都比悄悄擴大存取誠實。
- `smallest_experiment`：只使用以下離線紀錄，不發出請求：

  ```text
  task: 核驗一個尚未下載的校驗碼
  local record: 需要的公共主機請求在夾具中遭封鎖
  proposed next action: 開放不受限制的網路並重試
  ```

  寫下以下紀錄：

  ```text
  observed: 夾具記錄了一次封鎖
  known need: 校驗碼任務需要指定類別的公共主機
  missing evidence: 有效政策、擁有者核准、最小探測與復原
  decision: blocked — 請求最小例外或使用核准的離線產物
  external actions: not_run
  ```

- `intentional_failure`：把封鎖當成開放網路的許可，未審查就說 Proxy 安全，或沒有可檢查產物卻聲稱校驗碼已核驗。
- `required_artifact`：完整紀錄、一句話區分任務目標與權限請求，以及一個安全離線替代方案
- `acceptance`：紀錄封鎖而不診斷；只以類別描述主機；拒絕無限制方案；寫明擁有者決定或離線替代；記錄 `external actions: not_run`。
- `transfer`：把相同邊界套用到套件下載、研究 API、Webhook 或瀏覽器提交。維持「技術需要不會創造權限」這項不變量，改變目的地與最小探測。
- `forbidden_claims`：目前 Codex 設定、官方網路政策、產品缺陷、安全 Proxy、成功請求、本地重現、學習者能力、安全有效性、遷移成功或正式發布準備完成

## 內容位置

- `primary_chapter`：[第 13 章——行動邊界](../../book/chapters/13-action-boundaries-ZHTW.md)
- `supporting_chapters`：[第 4 章——脈絡、權限與 Agent 行動邊界](../../book/chapters/04-context-permissions-and-agent-ZHTW.md)；[第 9 章——驗證、懷疑與復原](../../book/chapters/09-verification-and-recovery-ZHTW.md)
- `primary_lab`：[Lab 016——副作用邊界](../../book/labs/lab-016-side-effect-boundary-ZHTW.md)
- `supporting_labs`：[Lab 001——第一個安全任務](../../book/labs/lab-001-first-safe-task-ZHTW.md)；[Lab 007——行動邊界](../../book/labs/lab-007-action-boundaries-ZHTW.md)
- `related_skill`：[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)；[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`：未分配
- `update_registry_entry`：公開來源改變、加入權威政策、提出線上練習或增加設定範例時複查

本案例把較早的現場訊號轉成可搜尋的有界案例，不提升任何關聯內容的成熟度。

## 隱私、權限與維護

- `personal_data_removed`：是；練習完全虛構，不重用來源身分或真實端點
- `secrets_removed`：是；不含憑證、Proxy、帳號、專案路徑或真實 URL
- `private_paths_removed`：是
- `copyrighted_material_boundary`：只使用原創摘要與原創夾具；未複製文章內容、設定或答案
- `asset_register_entry`：`docs/sources/asset-register.md` 的 S88
- `volatile_facts`：來源狀態、產品設定、政策預設值、Proxy 行為與產品支援
- `next_review`：2026-09-14，或在設定、安全、執行期或發布主張之前
- `change_trigger`：來源或官方文件改變、提出線上練習或新增設定範例
- `owner`：research-maintainer

## 主張邊界

- `what_can_be_claimed`：一份較早的公開報告現在被整理成有來源類型、症狀、證據類別、重現狀態、低風險診斷路徑與停止條件的候選案例。
- `what_must_not_be_claimed`：報告目前或可重現；根因已知；無限制存取必要或安全；任何產品支援某項設定；夾具證明安全控制；或學習者完成決策。
- `next_smallest_check`：由獨立審閱者審查並取得同意後執行固定離線紀錄；不得產生網路流量或收集憑證、帳號、專案、Proxy 或個人資料。
- `current_status`：`candidate`
