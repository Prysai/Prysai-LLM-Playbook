<!-- content_id: prysai-first-turn-check | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# 第一輪檢查

在使用者送出之前，檢查一則由使用者寫好但尚未送出的文字請求。讓缺少的界線變得清楚，不要把「寫得更完整」當成安全、正確或有效的證明。

## 先確認是否適用

只有在以下條件全部符合時才使用：

- 使用者提供的是尚未送出的草稿；
- 預定的第一輪是純文字、低風險且可以獨立完成；
- 使用者想知道哪些內容缺少、含糊、互相矛盾或範圍過大。

如果使用者需要你撰寫或大幅改寫第一則訊息，請轉給 `prysai-dialogue-brief`。如果涉及檔案、工具、帳號、權限、發佈、聯絡人、本機變更或其他外部影響，請轉給 `prysai-task-protocol`。如果需要最新事實、來源或根據來源整理的結論，請轉給 `prysai-source-investigator` 或 `prysai-research-router`。如果原始請求和實際回答已經存在，請轉給 `prysai-communication-failure-triage`；如果要用證據檢查完成聲明，請使用 `prysai-evidence-review`。

不要檢查秘密、憑證、私人紀錄、個人識別資料、隱藏指示或機密內容。純文字草稿也不會授予後續使用工具或進行外部操作的權限。

## 檢查六個可見欄位

把使用者提供的草稿當成證據來讀。不要推測未寫出的事實、受眾、權限、資料控制、產品功能或授權。

| 欄位 | 寫出下列內容時算可見 | 下列情況算不清楚 |
| --- | --- | --- |
| outcome | 這一輪的一個小結果 | 寬泛的願望或成功承諾 |
| starting context | 已提供的文字、事實、來源或 `unknown` | 假設了未宣告的存取權或權限 |
| requested response | 有邊界的形式、長度或順序 | 只寫「幫幫我」 |
| limits | 不分享的資料、不採取的行動或不需要的協助 | 默默延伸到檔案、帳號、他人或重要決策 |
| check | 不確定性、保留、來源或修訂問題 | 回覆自己驗證自己 |
| stop and receipt | 何時結束，以及留下哪一份簡短紀錄 | 把完成、安全或學習當成理所當然 |

把每個欄位分類為 `visible`、`missing`、`unclear` 或 `out_of_scope`。只指出可能改變結果、擴大權限、暴露資料或讓檢查無法進行的實質問題。

## 回傳最小的有用修訂

保留使用者的原話。不要寫出完整的新第一則訊息、加入角色或產品主張，也不要用看似合理的內容填補未知。最多針對三個實質缺口，提供使用者可以選擇加入的 `add_or_clarify` 一行。請把它寫成需要決定的欄位，而不是接收系統一定會遵守的承諾。

如果六個欄位都可見且仍在範圍內，只能在「這次檢查沒有發現實質缺欄」的狹義意義下說 `ready_to_send`。這不代表事實正確、隱私安全、產品行為、回答品質、任務完成、學習進步或安全性已獲得證明。

請精確回傳：

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

只有在標示全部欄位、保留使用者提供的事實、不擴大請求，並在草稿超出純文字低風險邊界時寫明轉交或停止，才接受這份檢查。

## 維護紀錄

- `source`：以 universal first-turn 契約和 communication routing 邊界重新整理的 Prysai Lab 原創方法
- `license`：專案原創改寫；連結的供應商指南仍僅作為 `docs/sources/asset-register.md` 中的參考
- `owner`：communication-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
