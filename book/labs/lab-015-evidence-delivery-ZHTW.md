<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-015-evidence-delivery | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

---
id: lab-015-evidence-delivery
title: "交付證據，而不只是一句完成宣告"
level: L5
domain: general
goal: "將完成宣告拆分為有範圍的證據記錄，並找出最小的下一項檢查"
setup: "一次可丟棄的文字改動、一個聚焦檢查、一個故意缺失的檢查，以及一份已脫敏的交接；不使用真實服務或使用者資料"
task: "為每項來源、檢查和執行時宣告記錄範圍、命令或觀察、結果、儲存輸出、狀態和下一項檢查"
evidence:
  - "主張—證據表、原始命令輸出、差異和審查決策"
  - "明確區分 verified、partial、unverified、blocked 和 not_run"
failure_variant: "交接中保留命令名卻移除輸出檔案；將該主張標為 unverified 或 not_run"
reflection: "哪項主張超出了它的證據範圍？哪一項更小的檢查能補上缺口？"
status: draft
last_verified: "not run"
transfer_task: "將這張表用於靜態站點，區分原始檔存在、構建產物、瀏覽器渲染、截圖審查和公網可訪問性"
transfer_domain: "網頁釋出、文件、研究或工程交付"
transfer_evidence: "每項主張保留一行：範圍、命令或觀察、結果、輸出路徑和限制"
transfer_limitations: "透過原始碼檢查並不能證明視覺執行時、使用者接受度或公開 URL 可訪問性"
---

# 實驗 015：交付證據，而不只是一句完成宣告

**狀態：** `draft` · **執行狀態：** `not_run`

## 為什麼要做這個實驗

命令可以執行，但輸出可能被隱藏、截斷、附在錯誤的工作目錄中，或根本不足以支援正在作出的宣告。本實驗把一句漂亮的“已完成”轉換成主張—證據記錄。

## 準備

建立一次可丟棄的文字改動，準備一個聚焦檢查和一個故意缺失的檢查。準備一份已脫敏的交接，其中有三項主張：來源主張、檢查主張，以及執行時或使用者效果主張。不要使用真實服務或使用者資料。

## 任務

對每項主張記錄：

```text
claim:
scope:
command or observation:
working directory:
exit code / result:
saved output:
status: verified | partial | unverified | blocked | not_run
smallest next check:
```

然後請第二位審閱者，或一個全新會話，拒絕任何沒有證據、超出範圍，或僅從另一行推斷得出的主張。

## 證據

儲存主張表、原始命令輸出、差異和審查決策。記錄必須解釋：為什麼透過源檢查不能證明視覺執行時或使用者接受度。

## 失敗變體

在交接中保留命令名，但移除輸出檔案。正確結果是 `unverified` 或 `not_run`，而不是“應該透過了”。

## 現場變體：三個 Windows 證據斷點

將第 9 章中的三個公開報告作為參考案例；不要在本實驗中嘗試復現上游產品問題。改用無害的本地夾具模擬證據邊界：

1. 生成超出終端視口可顯示範圍的文字，將同一內容儲存到檔案，並比較可持久儲存與僅可見內容；
2. 在文字夾具中放入 BMP 與非 BMP 字元；任何工具呼叫前先比較預期字串與實際接收字串，若不同則標記為 `blocked`；
3. 僅在檔案系統支援時，於可丟棄 Git 倉庫中建立一個普通但很長的測試檔名。記錄路徑長度與 Git 結果；不得建立或刪除 Codex 內部引用，也不得改變倉庫配置。

為每個案例在主張表中增加一行：

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

正確結論可以是 `reference-only`、`not_run` 或 `blocked`。模擬某個邊界的本地夾具不是對上游問題的復現；從公開報告複製的繞過辦法也不是官方修復。

## 遷移

將同一張表用於靜態網站：區分原始檔存在、構建產物、瀏覽器渲染、截圖審查和公網 URL 可訪問。

## 驗收清單

- [ ] 每句完成宣告都被拆成帶範圍的主張。
- [ ] 命令包含路徑、退出碼和儲存輸出。
- [ ] 缺失證據被明確標出。
- [ ] 後來的成功檢查沒有改寫此前未知的嘗試。
- [ ] 交接寫明最小下一項檢查和停止條件。

## 覆盤

指出哪項主張超出了證據，並寫下能補上缺口的最小檢查。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-ZHTW.md" aria-label="上一個實驗：實驗 014 · 繼續之前，先核對恢復的任務">← 上一個<br><strong>實驗 014 · 繼續之前，先核對恢復的任務</strong></a></td>
    <td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-ZHTW.md" aria-label="下一個實驗：實驗 016 · 在副作用邊界停下">下一個 →<br><strong>實驗 016 · 在副作用邊界停下</strong></a></td>
  </tr></table>
</nav>
<!-- lab-navigation:end -->
