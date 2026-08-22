<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: book-labs-readme | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook：實驗目錄

<!-- language-switcher:start --> **語言：** [English](README-EN.md) | [簡體中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md) <!-- language-switcher:end -->

實驗是你親自檢查“一種向 LLM 求助的方式，是否能讓實際工作更清楚”的地方。它不是另一套
文書流程，也不要求使用 Codex Cloud 或程式設計。每個實驗從一個看得見的問題開始：回答是否保留事實、
遵守要求的格式、標出未知，或留下能讓其他人審查的改動？

這是中文實驗入口。所有連結只開啟 `-ZH` 檔案，不會悄悄把你帶到英文頁面。

## 從一個小練習開始

想體驗“模糊要求”和“可檢查要求”的差別，先做
[實驗 001：第一個安全任務](lab-001-first-safe-task-ZHTW.md)。如果還沒有可丟棄的專案，
可以跳過其中的工作區部分。想在不安裝任何東西的前提下選擇可複用的方法，繼續做
[實驗 004：選擇 Skill](lab-004-skill-selection-ZHTW.md)。

標記為 `draft` 的實驗是一份教學契約：它告訴你試什麼、儲存什麼、何時停止；它不證明練習
已經在每個 Codex 介面執行過，也不證明任何學習者已經掌握該方法。

## 按你今天想得到的結果來選

不要只因為實驗 001 編號最小就從它開始。請從最貼近你眼前需要的、最小的可見結果開始。下表的
每一項都能讓你檢查到實際產物；不需要因為模型說得自信就相信它。

| 如果你今天想…… | 從這裡開始 | 停下來之前應該親眼看到什麼 |
| --- | --- | --- |
| 不寫程式碼、不開啟專案，也想感受清楚請求是否更有用 | [實驗 001 的第一部分](lab-001-first-safe-task-ZHTW.md#第一部分十分鐘提示詞對照) | 同一份無害筆記得到的兩份回答，以及一張簡短比較回執 |
| 弄懂 GPT、工作臺、工具和 Agent 分別在做什麼 | [實驗 011](lab-011-gpt-codex-boundaries-ZHTW.md) | 一張邊界圖，能把“提議動作”與“已執行且已檢查的動作”分開 |
| 把“幫我處理一下”改成別人也能檢查的請求 | [實驗 002](lab-002-task-protocol-ZHTW.md) | 一張寫有目標、材料邊界、允許動作、驗收和停止條件的任務卡 |
| 檢查一段固定來源的研究回答，又不假裝研究已經完整 | [實驗 008](lab-008-research-question-ZHTW.md) | 來源清單、一條有範圍的結論，以及明確的未知項 |
| 在本地做一次很小的檔案修改 | 先做[第一次安全改動](../routes/first-safe-change-ZHTW.md)，再做[實驗 001 的第二部分](lab-001-first-safe-task-ZHTW.md#第二部分把同樣的紀律帶進工作區) | 在可丟棄副本中看到一份審查過的 README diff 和一項針對性本地檢查 |

如果你今天只有聊天視窗，第一行就足夠了。不要為了“跟上目錄”去安裝工具、註冊賬戶或碰真實專案。
只有當你能說清可丟棄資料夾、唯一允許修改的目標和要保留的證據時，再進入工作區練習。

## 當前狀態

目錄有 18 個固定實驗 ID。它們全部仍是 `draft`，學習者執行狀態為 `not_run`。這條中文
路徑可以開啟全部 18 個實驗；每份中文譯文仍待獨立語言審校。

## 中文實驗地圖

| 實驗 | 能力 | 等級 | 中文路徑狀態 |
|---|---|---:|---|
| 001 | 讓第一次請求可執行 | L1 | [開啟實驗 001](lab-001-first-safe-task-ZHTW.md) |
| 002 | 任務協議 | L2 | [開啟實驗 002](lab-002-task-protocol-ZHTW.md) |
| 003 | 證據審查 | L3 | [開啟實驗 003](lab-003-evidence-review-ZHTW.md) |
| 004 | 選擇 Skill | L4 | [開啟實驗 004](lab-004-skill-selection-ZHTW.md) |
| 005 | 設計 Skill | L4 | [開啟實驗 005](lab-005-design-a-skill-ZHTW.md) |
| 006 | Agent 停止條件 | L5 | [開啟實驗 006](lab-006-agent-stop-conditions-ZHTW.md) |
| 007 | 行動邊界 | L3 | [開啟實驗 007](lab-007-action-boundaries-ZHTW.md) |
| 008 | 研究問題 | L3 | [開啟實驗 008](lab-008-research-question-ZHTW.md) |
| 009 | 工程生命週期 | L3 | [開啟實驗 009](lab-009-engineering-lifecycle-ZHTW.md) |
| 010 | 共享產品上下文 | L3 | [開啟實驗 010](lab-010-product-context-ZHTW.md) |
| 011 | GPT 與 Codex 的邊界 | L0 | [開啟實驗 011](lab-011-gpt-codex-boundaries-ZHTW.md) |
| 012 | 團隊能力遷移 | L6 | [開啟實驗 012](lab-012-team-capability-migration-ZHTW.md) |
| 013 | 可審計的垂直切片 | L3 | [開啟實驗 013](lab-013-l3-vertical-slice-ZHTW.md) |
| 014 | 恢復時的對賬 | L3 | [開啟實驗 014](lab-014-resume-reconciliation-ZHTW.md) |
| 015 | 帶證據的交付 | L5 | [開啟實驗 015](lab-015-evidence-delivery-ZHTW.md) |
| 016 | 副作用邊界 | L3 | [開啟實驗 016](lab-016-side-effect-boundary-ZHTW.md) |
| 017 | Skill 發現審計 | L4 | [開啟實驗 017](lab-017-skill-discovery-audit-ZHTW.md) |
| 018 | 固定練習契約下的語言遷移 | L2 | [開啟實驗 018](lab-018-language-transfer-ZHTW.md) |

編號是目錄 ID，不代表下一個編號就是前置條件或下一個學習等級。學習路徑決定進度；本頁只展示
今天能用中文開啟的材料。

## 安全地完成一個實驗

1. 使用可丟棄的資料夾、固定輸入版本，不使用真實憑據。
2. 行動前先閱讀實驗的許可權與副作用邊界。
3. 儲存基線、命令、輸出、改動、失敗分支和未知項。
4. 目標、授權、來源或恢復路徑不可觀察時停止。
5. 只有記錄完原始練習後，才做遷移任務。

## 狀態邊界

`draft` 表示在稱為 `candidate`、`verified` 或 `production-ready` 之前，仍缺少專案規定的證據。
`run_status: not_run` 表示本倉庫沒有該實驗的學習者執行結果。檔案存在、頁面能開啟或本地連結
檢查透過，都不能證明學習效果、模型行為或在其他環境中的有效性。

## 返回中文路徑

- [中文書籍入口](../README-ZHTW.md)
- [中文書籍目錄](../table-of-contents-ZHTW.md)
- [新手提示卡](../communication-clinic-ZHTW.md)
