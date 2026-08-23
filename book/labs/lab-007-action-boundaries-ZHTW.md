<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-007-action-boundaries | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 實驗 007：把一個 README 任務放進三個行動邊界

---
id: lab-007-action-boundaries
title: "在三個工作面放置同一個 README 任務，練習授權、停止與證據"
level: L3
domain: general
goal: "把公開報告中的邊界症狀轉化為低風險、可觀察、可回滾的練習流程"
setup: "一份脫敏 README 任務、普通本地副本、隔離 Worktree 或模擬目錄，以及代表組織工作面的第二目錄；不需要真實 token"
task: "先觀察，再做最小本地修改，在三個工作面記錄分段狀態、症狀、檢查和證據；不執行真實 push 或 publish"
evidence:
  - "每個情境一張狀態卡，分開記錄已登入、已授權、已執行和已驗證"
  - "症狀卡、最小排查順序、停止條件和最終證據表"
  - "本地副本和 Worktree 的差異與回滾入口，以及第二工作面的風險說明"
  - "把同一套邊界方法遷移到文件、研究或釋出準備任務的記錄"
failure_variant: "把瀏覽器成功當成 token exchange，把一個已認證 host 當成目標 host，把一個組織的訪問當成另一個組織已安裝，或把驗證當成強制重灌權限"
reflection: "哪種狀態最容易被‘已經登入’掩蓋？哪項檢查能增加證據而不擴大權限？三個工作面如何改變回滾和審查？"
status: draft
last_verified: "not run（not_run）；尚未由學習者執行；真實三工作面實驗待執行；本檔案定義練習契約"
transfer_task: "將邊界記錄應用到一個不需要真實外部寫入的文件、研究或釋出準備任務"
transfer_domain: "工程釋出準備、研究釋出準備、營銷內容、團隊審批"
transfer_evidence: "脫敏任務卡、工作面卡、狀態卡、症狀與排查記錄、執行記錄、結果檢查和回滾入口"
transfer_limitations: "本實驗不證明真實帳戶、Enterprise host、組織安裝、分支保護、connector、釋出平臺或遠端回滾可用"
---

## 現實問題

公開報告常把登入、可訪問、獲准、已執行和已驗證壓縮成一個詞。常見跳躍
包括：瀏覽器認證成功但後續 token exchange 失敗；Enterprise CLI 已認證但
PR 入口探測 github.com；能訪問一個組織卻無法在第二個組織建立 installation；
以及 Agent 為了驗證而強制重灌持久環境。這些是使用者報告，不是本地復現或官方
根因。本實驗訓練的反應是定位階段、做最小檢查、在需要更大權限時停止。

## 固定夾具

不要使用真實組織、remote、token、SSH key、Cookie、環境檔案、生產檔案或個人
資料。只建立如下脫敏輸入：

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

固定任務：在 Status 下增加一行 boundary: local-only，保留其他內容，只修改
README.md，展示 diff 和檢查結果。除非另有明確授權，不 commit、push、publish、
安裝依賴或修改持久環境。

驗收條件是隻增加一行、原有標題和欄位不變、差異可見、檢查副作用已說明，
commit、push、publish、安裝和重啟均記錄為 not_run。回滾是恢復臨時副本或
刪除這一行，不是刪除遠端歷史。

### 固定夾具的觀察點

在開始三個情境前保存同一份基線：絕對路徑、檔案雜湊、初始 `git status`、
允許寫入的路徑和驗收規則。每個情境都使用同一份脫敏 README；如果夾具、
模型、工作面或權限改變，必須在記錄中標記為 `not_comparable`，不能把差異
歸因給「行動邊界」本身。

## 三個情境

### A：普通本地副本

記錄絕對路徑和基線 hash，讀取檔案，編輯一行，檢視差異，執行離線檢查並記錄
回滾。預期只有本地檔案變化，帳戶、遠端和釋出狀態仍是 not_run。

### B：隔離 Worktree

使用脫敏 Git 倉庫和隔離 Worktree；沒有 Git 時用明確命名為 worktree-simulation
的第二目錄，並說明它是模擬。記錄主樹、隔離路徑、分支和基線 commit。只在
隔離位置編輯，檢查主樹未變化，預設不 commit、push 或 publish。

### C：組織工作面模擬

使用標記為 organization-like-simulation 的脫敏本地目錄。不要連線真實組織、
Enterprise、connector、remote 或網路服務。重新評估可見性、協作者影響、分支
保護假設、安裝範圍和回滾負責人。技術上可寫不等於組織授權。

## 症狀卡

| 卡片 | 報告症狀 | 可以記錄的事實 | 不得推出 | 最小下一步 |
|---|---|---|---|---|
| S-02 | 瀏覽器認證成功但 token exchange 失敗 | 只有瀏覽器階段成功 | 已完整登入或根因已知 | 拆分階段並記錄脫敏錯誤，不重試真實登入 |
| S-03 | Enterprise CLI 已認證但 PR 入口探測 github.com 並返回 401 | CLI host 和應用 host 可能不同 | GitHub 全部可用或 401 必然是倉庫權限 | 只讀比較 host、remote 和入口 |
| S-04 | 能訪問一個組織但不能為第二個組織建立 installation | 身份、組織、installation、倉庫訪問是不同狀態 | 管理員權限自動包含 installation | 記錄四個狀態，不申請安裝 |
| S-11 | 驗證擴大為 force reinstall 或持久環境替換 | 驗證與安裝授權是兩件事 | 技術上能執行就代表獲准 | 儲存 diff，改用隔離/靜態檢查 |

每張卡都加註：來源是使用者報告；本地復現未做；官方根因未確認。原始 URL
和日期以研究索引為準，本實驗不復制外部正文、憑據或資產。

### 症狀卡的使用順序

先寫「看到了什麼」，再寫「不能推出什麼」，最後只做卡片中的最小唯讀
檢查。不要先採用論壇給出的修復命令；如果檢查需要擴大網路、目錄、帳號
或安裝權限，直接進入停止條件並保留當前證據。

## 分段狀態卡

每個情境填寫一張，後面的狀態不能覆蓋前面缺失的證據：

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run
identity_observed:
action_authorized:
result_verified:
external_state_changed:
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

必須保持三條區分：

~~~text
觀察到身份       ≠ 本次行動已獲授權
行動已經執行     ≠ 結果已經驗證
目錄技術可寫     ≠ 共享或遠端目標允許寫入
~~~

### 四個狀態的記錄規則

對每個情境分別填寫 `identity_observed`、`action_authorized`、
`action_executed` 和 `result_verified`。前一個欄位缺失時，後一個欄位不能
用「應該可以」補齊；例如瀏覽器顯示已登入，只能記錄身份介面被觀察到，不能
自動把遠端寫入標為已授權或已驗證。

## 覆盤

在把任何狀態寫成 `verified` 前，記錄支援它的觀察、仍然未知的階段，以及下一個
檢查是否能增加資訊而不增加外部副作用。

## 最小排查順序

1. 凍結準確路徑、目標、host、資料範圍和禁止動作。
2. 儲存 hash、git status、分支、Worktree 和原始任務。
3. 定位階段：入口、身份、目標、授權、執行或驗證。
4. 只讀檢查檔案、路徑形狀、配置形狀、host 字串和脫敏日誌。
5. 只在夾具中做一次可逆修改，儲存 diff、返回碼和生成物。
6. 對比三個工作面的可見性、協作者影響和回滾責任。
7. 只有驗收證據直接匹配時才寫 verified，否則寫 unverified 或 blocked。

### 最小排查記錄

```text
step | 觀察到的事實 | 使用的證據 | 沒有檢查的範圍 | 下一步或停止原因
```

每一步只改變一個條件。若同一檢查第二次失敗且沒有新的路徑、版本、權限
或輸入證據，保留兩次輸出並停止，不要用更強的命令掩蓋診斷缺口。

## 停止條件與證據表

目標或範圍不清、下一步需要 commit/push/publish/安裝/部署/重啟/刪除、出現
秘密或未脫敏個人資料、審批未說明準確物件和載荷、需要外部賬戶或持久環境、
建議 force 操作，或命令可能進行未知寫入時，停止並儲存差異、錯誤、基線和
檢查點。提交一張證據表，覆蓋任務邊界、工作面、基線、五個權限欄位、症狀定位、
最小行動、結果、分段狀態、回滾和外部動作。真實外部動作明確寫 not_run。

### 證據表的最低欄位

| 欄位 | 要記錄的內容 |
|---|---|
| 任務與工作面 | 目標、絕對路徑、host/remote（如有）和情境 ID |
| 身份與授權 | 觀察到的身份、準確目標、授權範圍、人工確認 |
| 執行與結果 | 命令/動作、回傳碼、改變的檔案或 `not_observed` |
| 驗證與回滾 | 驗收檢查、diff/hash、回滾入口和負責人 |
| 外部動作 | commit、push、publish、安裝、通知均寫 `not_run` 或給出實際證據 |

## 故意失敗與遷移

只在夾具中依次處理“瀏覽器成功所以寫遠端”“CLI 登入所以 host 一定正確”
“管理員所以第二組織已安裝”“驗證失敗先強制重灌”四種提示。每次指出缺少的
證據和更小的安全檢查。然後把方法遷移到研究來源表、釋出說明或脫敏 PR 審查，
不進行真實外部寫入。

遷移時不要複製 GitHub 或組織名稱。把同一結構改寫為「研究來源表」或「發布
說明審查」：目標、來源、允許動作、證據、停止、回滾和未知項必須重新填寫。

## 驗收標準與透過條件

- [ ] 三個工作面都保留基線、狀態卡、最小排查記錄和回滾入口。
- [ ] 每個情境都分開記錄身份、授權、執行和驗證；不能用「已登入」代替其他狀態。
- [ ] 症狀卡的最小唯讀檢查已完成，或明確標記為 `not_run`、`blocked` 或 `not_observed`。
- [ ] 只修改固定夾具允許的 README 行；沒有真實 push、publish、安裝、重啟或持久環境變更。
- [ ] 證據表能讓另一位讀者重建觀察、限制、停止原因和回滾方式。

能在三個工作面重複夾具，區分身份、授權、執行、驗證，正確處理四張症狀卡，
先儲存基線，不用 force 操作證明成功，觸發停止條件時保留證據，完整提交狀態
卡和證據表，並完成一次低風險遷移。真實 token、push、publish、installation、
部署、通知和持久替換全部保持 not_run。

## 來源與限制

Codex 問題研究提供使用者症狀和公開連結，論壇研究提供社群背景；它們不是本地
復現或官方修復。本文夾具是原創、可回滾練習輸入，不能證明真實賬戶、聯結器、
Enterprise、釋出或遠端回滾鏈路可用。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-006-agent-stop-conditions-ZHTW.md" aria-label="上一個實驗：實驗 006·設計 Agent 停止條件">← 上一個實驗<br><strong>實驗 006·設計 Agent 停止條件</strong></a></td>
<td align="right"><a data-lab-nav="next" href="lab-008-research-question-ZHTW.md" aria-label="下一個實驗：實驗 008·把主題收窄成可回答的研究問題">下一個實驗 →<br><strong>實驗 008·把主題收窄成可回答的研究問題</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
