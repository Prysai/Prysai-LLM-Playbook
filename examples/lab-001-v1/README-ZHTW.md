<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
# Lab 001 v1：第一次安全改動夾具

這是配合[實驗 001](../../book/labs/lab-001-first-safe-task-ZHTW.md)的小型合成夾具。它沒有真實專案、Git 歷史、憑據、網路請求、安裝步驟、帳號、模型呼叫或外部副作用。

## 你會改什麼

先把**整個**目錄複製到可丟棄的位置。只在副本中檢查 `seed/README.md`，並且只修改這個檔案；不要修改 `verify_readme.py` 或 `expected/acceptance.json`。

驗收合同已經給出改正依據：預覽命令必須寫明埠 `8080`，README 必須寫明本地 URL。比較固定的本地證據，不要根據模型回答猜命令。

## 怎麼做

在副本中並排開啟 `seed/README.md` 和 `expected/acceptance.json`。

1. 發現 README 缺少埠和本地 URL。
2. 只做這一次允許的 README 修改。
3. 檢查 README 是否包含全部 `required_readme_strings`：手動結果應為 `3/3`。

如果電腦本來就有 Python 3，可選執行 `python .\seed\verify_readme.py`。修改前應為 `FIRST_SAFE_CHANGE_FAILED`，修改後應為 `FIRST_SAFE_CHANGE_OK`。不要為了得到這個額外訊號安裝 Python。

## 有邊界的任務卡

```text
目標：修正 seed/README.md 的本地預覽說明。
先讀：seed/README.md 和 expected/acceptance.json。
允許編輯：展示計劃後，只改 seed/README.md。
不要：修改驗證器或驗收檔案；安裝；聯網；讀取金鑰；提交、推送或釋出。
回執：基線、計劃、準確 diff、第二次結果和未驗證清單。
停止：副本、目標或驗收來源不可用。
```

透過只說明這個固定合成檢查器透過；不證明學習者完成、模型行為、真實專案命令或能力遷移。
