<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
# 三任務冒煙比較 v1

**狀態：** `candidate` 固定任務包 · **執行證據：** `not_run`

這是服務於第 6、19 章的共享離線任務包。讓兩個候選模型或工作流完成同樣的三個小任務，再決定是否值得投入更大的評測。

本地驗證器透過，只說明一份提交符合這個固定包的結構和驗收規則；**不說明**模型質量、價格、安全性、通用價值、學習效果，或哪一個模型“總體更強”。

## 必須保持一致的條件

- `fixture.json` 中的任務 ID、說明、合成輸入、期望輸出和雜湊；
- 每輪只變一個比較變數：模型、工作流或工作面；
- 兩邊使用相同的上下文、工具、許可權、網路條件、時間預算和審閱者；
- 初次嘗試後，最多一次預先宣告的受控返工。

教學輸入均為專案原創合成材料，不含客戶資料、憑據、生產記錄或外部原文。

## 執行一個任務

1. 不改動地把任務說明和輸入交給每個候選項；人工修改前先儲存原始輸出。
2. 按要求的檔名把答案儲存在本地。
3. 本地驗證；驗證器不會聯網，也不會呼叫模型。

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py evals\candidates\three-task-smoke-v1\validate_submission.py `
  --task extract-01 `
  --submission C:\temp\candidate-a-extract-01.json
```

| 任務 | 提交 | 檢查內容 |
| --- | --- | --- |
| `extract-01` | JSON 陣列 | 結構化提取且不虛構事實 |
| `markdown-02` | Markdown 檔案 | 受限轉換且保留未知項 |
| `gap-review-03` | JSON 物件 | 識別證據缺口且不貶低已有證據 |

兩位候選項共保留六份獨立提交，並在 `run-record-template.yaml` 記錄條件和驗證結果。其中 `not_run` 是佔位符，不是結果。

## 如實停止

若一方受到中斷、許可權阻斷、輸入雜湊變化、工具版本變化或其他凍結條件變化影響，使用 `not_comparable`。不要用一次成功重試替換中斷答案。即使有六份可比答案，也只能支援任務範圍內的決定，不能推出通用模型排名。
