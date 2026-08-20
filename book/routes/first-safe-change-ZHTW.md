<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: first-safe-change-route | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: first-safe-change-EN.md | source_revision: worktree-2026-08-14 -->

# 第一次安全改動：在實驗 001 之前，先完成一個離線練習

**內容狀態：** `candidate` 補充路線。**學習者執行：** `not_run`。
**翻譯狀態：** 繁體中文完整初稿；尚未經過獨立語言審校。

這是第 2 章與實驗 001 之間為新手準備的預設安全沙盒。它只給你一個故意不完整的 README、一次允許的本機改動和一個範圍很窄的檢查器，然後你再到自己的專案中工作。它不是第 23 章、新 Skill、Git 練習，也不是任何模型已經完成任務的證據。

如果你第一次開啟專案資料夾或第一次執行檢查器，這正是這條路線存在的原因。你不需要安裝新工具、註冊帳號，也不必拿真實專案冒險。目標刻意縮小到你能看見所有相關檔案，並自己判斷檢查是否真的回答了問題。

## 問題

實驗 001 要求你準備一個可丟棄專案、找到真實命令來源，並完成一次有邊界的 README 改動。這些約束適合面向真實專案的練習，卻可能讓第一次實踐變成迴圈：新讀者還沒有安全專案，也不知道該相信哪個命令來源。

## 概念

練習夾具把「練習方法」與「尋找合適專案」分開。它是虛構的、在本機執行、可丟棄的。唯一預期的改動是修正 README；檢查器只讀取這一個檔案並給出簡短結果。這樣，你不用帳號、網路、安裝、Git、提交、推送、發布或個人資料，也能看見驗收條件。

## 決定

如果你還沒有可丟棄的本機專案，請使用專案自帶的 [第一次安全改動夾具](../../examples/lab-001-v1/README-ZHTW.md)。把整個夾具複製到 `.work/` 或其他臨時目錄；不要修改儲存庫裡的原始夾具，否則下一位讀者看不到預先放入的錯誤。

## 操作

先做一個私人的工作副本。在檔案管理器中，將整個 `examples/lab-001-v1` 資料夾複製到可隨時刪除的位置，並命名為 `first-safe-change`。

然後在下面兩種檢查中選一種：

1. **不執行程式的檢查（預設）。** 在複製後的資料夾中開啟 `seed/README.md` 和 `expected/acceptance.json`。編輯前，README 少了兩個必要的預覽資訊。只允許改一次 README 後，檢查 README 是否清楚包含驗收檔案中 `required_readme_strings` 列出的三段字串。
2. **可選的本機檢查器。** 僅當你的電腦原本就已經能執行 Python 3 時使用。開啟複製後資料夾中的終端機並執行：

```powershell
python .\seed\verify_readme.py
```

第一次的結果應該是 `FIRST_SAFE_CHANGE_FAILED`。這是故意設計的起點，不是安裝損壞。然後依照夾具 README 中的任務卡先檢查 `seed/README.md`，提出最小改動方案；只有你自己認可方案後，才修改**這一份** README。再次使用同一個手動檢查或可選命令。通過時的可選本機結果是 `FIRST_SAFE_CHANGE_OK`。

如果沒有 Python，不要為了這條路線安裝執行環境或換用其他命令。使用不執行程式的檢查，並記錄 `check: manual required_readme_strings 3/3`。如果連可丟棄的本機副本也無法建立，請停止，改做純文字的 First Win；不要把 GitHub 網頁預覽當成本機沙盒。

## Web coding 橋接：在真實瀏覽器中觀察一次可見改動

如果下一步目標是 Web coding，不要從「建置完整網站」開始。把專案自帶的
[Product Context 沙盒](../../examples/skill-sandbox/product-context-real-estate/README-ZHTW.md)
當作可丟棄的靜態頁面。它只有虛構文案，沒有真實房源、表單、分析、API 或
外部圖片。

1. 將整個 `examples/skill-sandbox/product-context-real-estate` 資料夾複製到臨時
   位置，先閱讀其中的 README 和 `index.html`。
2. **只改 `index.html`**：為同一個虛構受眾替換一處可見句子。不要改 CSS、新增
   框架、取得圖片或新增表單。
3. 如果電腦原本已有 Python 3，在複製後的目錄執行文件裡提供的本機伺服器：

```powershell
python -m http.server 4182
```

在瀏覽器開啟 `http://127.0.0.1:4182/`。檢查標題、改動後的句子、未改動的標題、
連結目標、主控台，以及寬度為 390px 的視窗。如果命令、目標檔案或瀏覽器結果不清楚，
停止；不要為了這項練習安裝執行環境。

保留一份簡短回執：

```text
sandbox: <複製後的目錄>
allowed_change: index.html only
url: http://127.0.0.1:4182/
browser_check: 句子出現一次；標題和連結保留；已檢查主控台
diff: <已檢查的差異>
unverified: 部署、無障礙審查、其他瀏覽器、使用者驗收
```

這只能證明一個視窗寬度下的一次本機呈現狀態，不證明生產建置、其他響應式狀態、
無障礙合規、安全、效能或產品價值。完整工程生命週期見
[第 16 章](../chapters/16-engineering-track-ZHTW.md)。

## 證據

只保留這一份簡短回執：

```text
sandbox: <工作副本路徑>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <已檢查的 README 差異>
check: manual required_readme_strings 3/3 | FIRST_SAFE_CHANGE_OK
external_actions: none
unverified:
  - learner completion
  - model behavior
  - transfer
```

這個檢查器最多只能說明：某個時刻，這份固定、虛構的 README 符合夾具宣告的字串。通過並不代表 Git 操作成功、瀏覽器正常、帳號權限正確、安全審查完成或已經學會。

## 失敗與邊界情況

不要為了得到通過而修改檢查器、驗收檔案或其他路徑。如果建議的修正需要安裝、網路請求、金鑰、帳號、儲存庫操作或第二個檔案，停止。那是新的決策，不屬於這個夾具。

## 覆盤

1. 在修改前，驗收條件的哪一部分已經可以觀察？
2. 最終差異證明了什麼？一段自信的「已完成」說明又不能證明什麼？
3. 在真實專案的實驗 001 中，複用這個模式前，你還需要確認哪一項事實？

## 繼續

下一項註冊單元是[「實驗 001：完成一次安全的 README 改動」](../labs/lab-001-first-safe-task-ZHTW.md)。它會在本夾具的基礎上加入真實專案特有的命令來源、沙盒身分和恢復檢查。該實驗仍為 `draft / not_run`，繁體中文譯文尚未經過獨立語言審校。

## 狀態與限制

就學習者而言，本路線仍是 `candidate / not_run`。儲存庫中的測試只檢查夾具形狀，以及檢查器宣告的通過／失敗行為；它不會觀察學習者、不呼叫 Codex 或其他模型、不比較產品、不證明遷移能力，也不驗證真實專案的命令。
