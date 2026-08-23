<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
# 通用銜接點固定練習 v1

這是配合“通用核心基礎路線”的小型離線虛構練習。只需記住一件事：看見回覆、分支標籤、像工具輸出的程式碼塊，或解析器顯示成功，**都不能單獨證明**任務、目標、動作或結構化狀態真的正確。

這裡沒有帳號、模型呼叫、網路請求、憑據、真實倉庫、檔案修改、命令執行、提交、推送、釋出或其他外部副作用。記錄是專案原創的虛構材料，不是廠商日誌。

## 你要做什麼

逐條閱讀 `cases.json`：找出準確的不一致之處，寫下最小的安全檢查，並嚴格使用給定狀態。

| 狀態 | 在本固定練習中的含義 |
| --- | --- |
| `verified_in_fixture` | 給定的本地值直接證明了所說的不一致。 |
| `blocked` | 目標或權限證據相互衝突，下一步必須停止。 |
| `not_run` | 沒有執行回執；沒有動作被展示為已經完成。 |
| `inferred` | 已發現差異，但要診斷真實協議仍需平臺介面卡。 |

在倉庫根目錄執行：

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_universal_seam_fixture.py
& $py scripts\test_universal_seam_fixture.py
```

這兩個命令只檢查固定合同及其邊界測試，不會聯絡模型或服務。

## 有邊界的記錄卡

```text
任務：給一條虛構記錄分類一個銜接點問題。
先讀：cases.json 和 expected/acceptance.json。
允許：比較固定值，並寫一份本地判斷記錄。
不要：使用網路、帳號、金鑰、真實倉庫、線上工具、命令、提交、推送或釋出目標。
驗收：寫明不一致、不能成立的推斷、最小安全檢查、停止條件和給定的窄狀態。
回執：案例 ID、觀察欄位、判斷、未驗證清單，以及是否需要未來的平臺介面卡。
停止：繼續需要真實產品行為、權限、結構定義或外部狀態時。
```

## 透過不能說明什麼

透過只說明固定的虛構記錄符合驗收合同，不能證明外部問題、平臺行為、動作已執行、學習遷移、安全性、可移植性或已準備釋出。
