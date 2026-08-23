<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: lab-010-product-context | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-010-product-context
title: "建立可跨兩個任務複用的產品上下文"
level: L3
domain: marketing
goal: "建立一份小而可版本化的產品記錄，減少重複解釋，同時把事實、假設、定位決策和缺失證據明確分開"
setup: "一個虛構或已脫敏的產品、兩項低風險營銷任務，以及一份不連線真實營銷活動的版本控制產品上下文檔案"
task: "建立最小上下文，用它完成產品說明與測量計劃，改變一個定位決策，並檢查輸出隨之發生的差異"
evidence:
  - "兩版產品上下文，其中包含欄位來源、置信度、負責人和複查日期"
  - "引用所用欄位並列出假設的產品說明與測量計劃"
  - "定位決策差異、下游輸出差異、指標理由和未解決的證據缺口"
failure_variant: "移除受眾或目標行動，驗證工作流會索取缺失上下文，而不是編造細分人群、引語或指標"
reflection: "哪些欄位被複用？哪項變更改變了真實決策？哪些看似流暢的文字掩蓋了薄弱證據？"
status: draft
last_verified: "not run"
transfer_task: "把同一份最小上下文協議遷移到已脫敏的工程工具、研究服務或內部內容專案"
transfer_domain: "產品工程、研究服務、內容或營銷"
transfer_evidence: "保留上下文版本、來源、假設、兩項任務輸出、差異、指標限制和缺失欄位時的行為"
transfer_limitations: "共享上下文能減少重複，但不能證明事實真實、客戶措辭真實、市場反應、歸因或戰略批准"
---

# 實驗 010：建立可跨兩個任務複用的產品上下文

## 學習目標

建立一份可被兩個不同任務複用的小型產品事實源。目標是在不確定性可見的前提下保持一致，而不是寫一份巨大的品牌文件，也不是更順滑地重複沒有證據的定位說法。

## 準備

使用虛構產品或已脫敏的公開資訊。不要放入客戶名單、私密研究、內部營收、未公開戰略或個人資料。本練習不得連線郵件、廣告、分析、CRM、釋出或真實網站系統。

建立 `product-context-v1.md`，包含這些欄位：

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

每個欄位都新增 `source`、`status: fact | assumption | decision | unknown`、`confidence`、`owner` 和 `next_review`。沒有證據就保持空白；不要把假設改寫成客戶引語。

## 任務與實驗

將同一份上下文用於兩項任務：

1. 為指定受眾寫一段簡潔的產品說明；
2. 為一個真實決策設計測量計劃，例如讀者是否已充分理解產品，從而能選擇下一步。

兩份輸出都必須列出使用的上下文欄位、作出的假設，以及仍需驗證的事實。每個指標要記錄目標行動、資料來源、觀察視窗、決策規則和限制。提出的指標只是計劃，不是測量結果。

現在修改一個定位決策，遞增上下文版本，說明原因，然後重新生成兩份輸出。比較上下文差異和輸出差異，識別哪些改動是該決策真正要求的，哪些只是文案變化。

## 要保留的證據

保留兩版上下文、欄位來源、變更原因、兩個版本中兩項任務的輸出、差異、指標對映和未解決欄位。更短的提示詞不是充分證據；請展示哪些重複事實不再需要重述，以及第二項任務是否正確使用了它們。

## 失敗案例

移除 `audience` 或 `target_action` 之一，再次請求兩份輸出。正確行為是指出缺失的決策、收窄輸出，或提出問題。即使文案聽起來可信，編造細分人群、客戶引語、轉化事件或市場結果也會使本實驗失敗。

## 驗收清單

- [ ] 事實、假設、決策和未知項在頁面上清楚分開。
- [ ] 每個重要欄位都標明來源、負責人和複查狀態。
- [ ] 兩項任務複用同一版上下文，並寫明使用的欄位。
- [ ] 定位更新有理由，並有可檢查的下游差異。
- [ ] 指標對應一項決策，且沒有被表述為已觀察到的結果。
- [ ] 沒有發生真實發佈、外聯、追蹤、花費或私密資料使用。

## 覆盤與遷移

哪些欄位確實減少了重複解釋？哪個欄位帶來了最大的下游決策變化？把這份上下文遷移到另一個領域，移除僅適用於營銷的措辭，並記錄哪些內容仍有效，哪些內容需要新的負責人或證據來源。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="實驗導航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-009-engineering-lifecycle-ZHTW.md" aria-label="上一個實驗：實驗 009 · 比較直接實施與完整工程生命週期">← 上一個<br><strong>實驗 009 · 比較直接實施與完整工程生命週期</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-011-gpt-codex-boundaries-ZHTW.md" aria-label="下一個實驗：實驗 011 · 區分 GPT、Codex、工具與 Agent">下一個 →<br><strong>實驗 011 · 區分 GPT、Codex、工具與 Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
