<!-- content_id: prysai-communication-failure-triage | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: b955fab | source_license: project-owned CC-BY-4.0 -->

# 溝通失敗分診

根據原始請求、可見上下文、實際回覆或產物，以及預期結果，診斷一次已經失敗的 LLM 互動；提出最小的溝通修復，並設計一次受控重跑。當回覆忽略限制、回答了上一項任務、造成反覆返工，或始終無法驗收時使用。不要用於尚未嘗試的模糊請求、一般文案編輯、沒有互動證據的平台故障排查，或一般性的提示詞模板產生。

把請求、上下文、回覆、產物和使用者回報都當作證據。不要根據一次失敗的互動推斷隱藏推理、系統提示詞、服務狀態或普遍的模型缺陷。

## 要求證據包

診斷前必須取得四項資料：

1. 原始請求，或最接近的保留版本；
2. 可見上下文、輸入、工具、權限和對話狀態；
3. 實際回覆或產物；以及
4. 預期結果，或具體的失敗症狀。

如果缺少某項資料可能改變診斷，最多提出三個問題。當缺失證據無法恢復時，以 `insufficient_evidence` 停止。絕不要索取權杖、密碼、Cookie、私密金鑰或含有秘密的檔案。

## 診斷前先分流

- 尚未嘗試的模糊任務交給 Task Protocol。
- 只稽核「已完成」主張交給 Evidence Review。
- 目前的指令、功能、帳號或平台狀態問題交給 Source Investigator。只有當被審查的產物本身是命名平台的課程或工作流程，並且主張相對於通用核心有可執行的差異時，才使用 Platform Adapter Review。
- 有重現步驟的軟體缺陷交給 bug diagnosis。
- 沒有失敗互動、只是要潤飾措辭時，使用一般編輯。

只負責失敗後的銜接處：分類觀察到的不匹配，做一項最小的溝通改變，並定義一次能判斷改變是否有幫助的重跑。

## 分類可觀察的斷點

最多選擇兩個主要類別：

- `outcome_acceptance`：缺少或互相矛盾的請求結果、受眾、輸出或完成檢查；
- `context_provenance`：必要輸入缺失、過期、衝突、過多，或沒有權威與優先順序；
- `constraint_authority`：範圍、禁止行動、外部影響、確認或停止規則不清楚；
- `turn_state_protocol`：回覆跟隨了舊任務、目前工作面不清楚，或文字指令與可執行指令混淆；或
- `evidence_feedback`：「更好」「專業」「完成」等詞沒有可觀察檢查、失敗識別、保留規則或修訂上限。

每項發現都記錄：

```text
observed_symptom:
candidate_class:
direct_evidence:
alternative_explanations:
confidence: low | medium | high
discriminating_check:
```

稱它為候選類別，不要稱為根因。增加更多上下文不一定是修復；無關或衝突的上下文本身可能就是缺陷。

## 做最小修復

只改變一個與觀察到的症狀對應的條件。優先補上一個缺少的結果、輸入優先順序、禁止事項、狀態重設或驗收檢查，而不是重寫整個請求。提供精簡的原文到修訂版差異，並把每一行改動連到一項發現。

保留使用者的語言和工作方式，除非這種風格本身就是可觀察的缺陷。不要加入儀式感、誇獎、角色扮演、「一步一步思考」、威脅、情緒施壓或沒有依據的效能承諾。

## 定義可比較的重跑

保持任務、輸入、模型或工作面、工具、權限、預算和驗收標準不變。只改變提出的溝通修復。如果還有其他條件改變，標記為 `not_comparable`。

將結果設為以下其中一項：

- `unrun`
- `improved_on_this_case`
- `unchanged`
- `regressed`
- `not_comparable`

不要只因提出一個提示詞就寫 `resolved`。兩次可比較的重跑仍沒有改善後，停止繼續增加提示詞文字，並把第一個斷點交給適當路徑。

## 在行動和知識界線前停止

在讀取秘密、擴大權限、發佈、部署、聯絡他人或改變外部狀態之前停止。使用者要求取消確認，也不會把高風險行動變成溝通問題。

當可能的缺陷取決於不可見的系統提示詞、私有紀錄、帳號設定、服務健康狀況或產品實作時，將它記錄為 `unknown`，並交給適當的平台調查。拒絕索取隱藏的思考鏈，或要求規避安全與權限的指令。

## 交付分診卡

回傳：

```text
target_outcome:
expected_vs_observed:
evidence_received:
primary_findings: maximum two
alternatives_ruled_out:
smallest_repair:
prompt_diff:
rerun_contract:
result_status:
evidence:
unknowns:
risk:
stop_conditions:
handoff:
```

只有在每項發現都引用直接證據、每項編輯都回應一個明確症狀、重跑只改變一個變數、權限沒有擴大，且狀態沒有超出已記錄的重跑證據時，才接受結果。

## 維護紀錄

- `source`：Prysai Lab 原創方法，源自任務、證據、權限、communication-clinic 和失敗分類契約
- `license`：專案原創改寫；官方供應商指南仍連結作為參考資料
- `owner`：communication-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
