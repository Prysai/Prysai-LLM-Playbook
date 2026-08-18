<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-004-skill-selection | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-004-skill-selection
title: "選擇最小有用能力"
level: L4
domain: general
goal: "按任務契合度、風險、許可證和驗證成本選擇 Skill 或工具"
setup: "一項低風險本地任務，以及固定版本的能力候選項"
task: "不安裝、不認證，對比只用協議、協議加 Skill、協議加 Skill 再加工具三種方法"
evidence:
  - "三份方法記錄，說明任務契合度、依賴、許可權和驗證成本"
  - "候選項的來源、版本、許可證、巢狀資產和回滾說明"
  - "一項僅建議採用的決定和一項被阻止的決定"
failure_variant: "選擇一個許可證或回滾不清楚的可見候選項，再給簡單任務疊加無關能力"
reflection: "哪一種能力真正補上了任務缺口？哪項依賴的維護成本最高？什麼可以刪除？"
status: draft
last_verified: "Not run"
transfer_task: "為一項低風險研究或內容任務重複這次比較"
transfer_domain: "研究、工程、營銷或文件"
transfer_evidence: "保留任務缺口、比較表、採用記錄和審查意見"
transfer_limitations: "僅建議採用的比較不能證明安裝、執行時行為或長期維護價值"
---

# 實驗 004：選擇最小有用能力

## 學習目標

因為某項能力填補了一個明確的任務缺口才選擇它，而不是因為它流行、數量多或容易安裝。

## 設定

選擇一項低風險本地任務，並比較三種方法：

1. 只使用書面任務協議；
2. 使用任務協議加一個相關 Skill；
3. 使用任務協議、Skill 再加一個外部工具或聯結器。

使用固定的候選版本。記錄來源、許可證、依賴、目標安裝範圍、許可權、副作用、負責人、審查日期和回滾方式。除非後續任務明確授權，否則不要安裝或認證。

## 決策記錄

為每個候選項建立一份簡短的採用記錄：

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

本實驗的預設決定是 `recommendation-only` 或 `blocked`。發現、安裝、載入、呼叫、行為效果和驗證後的結果是不同狀態，必須分別記錄。

## 失敗案例

選擇一個資料夾確實存在、但許可證、巢狀資產、固定版本或回滾步驟不清楚的候選項。正確決定是 `blocked`。能找到不等於獲得許可；已經安裝也不等於行為已經驗證。

然後為一個簡單文字任務加入多個無關能力。只要某項能力增加的許可權、依賴或驗證成本超過它帶來的具體價值，就拒絕它。

## 驗收標準與清單

- [ ] 在比較候選項之前已經寫明任務缺口。
- [ ] 至少有一個候選項因明確理由被拒絕。
- [ ] 許可證和巢狀資產的不確定性可見。
- [ ] 許可權和外部副作用沒有超出任務需要。
- [ ] 沒有把安裝與行為當成同一種狀態。
- [ ] 維護者不依賴聊天記錄也能執行回滾說明。

## 要保留的證據

保留未修改的任務輸入、三份方法記錄、候選版本標識、許可證說明、決策表和審查意見。本實驗不是任何外部 Skill 已安裝或已驗證的證據。

## 覆盤與遷移

把這張比較表應用到一項研究或內容任務。哪項新依賴帶來了最高維護成本？刪除什麼仍不會降低最終證據的質量？

本簡體中文譯文為可讀的 `in-progress` 翻譯單元，獨立語言審校尚未完成；它不是已驗證譯文，也不表示課程已經透過學習者驗證。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-003-evidence-review-ZHTW.md" aria-label="上一個實驗：實驗 003·審計一條完成宣告">← 上一個實驗<br><strong>實驗 003·審計一條完成宣告</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-005-design-a-skill-ZHTW.md" aria-label="下一個實驗：實驗 005·把重複方法沉澱為邊界明確的 Skill">下一個實驗 →<br><strong>實驗 005·把重複方法沉澱為邊界明確的 Skill</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
