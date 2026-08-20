<!-- Traditional Chinese candidate generated from the Simplified Chinese source; independent language review pending. -->
<!-- content_id: chapter-06-model-selection | locale: ZHTW | language: zh-TW | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 第 6 章：模型選擇不是模型崇拜

**狀態：** `candidate`。下文的比較協議已經寫明並有來源邊界，但本倉庫尚未執行固定任務集。模型效能、成本、延遲、容量、穩定性和總體排名仍為 `not_run`。

## 本章要解決的問題

談模型選擇時，人們常用一句口號替代判斷：“用最好的模型。”真實工作需要問得更具體：

> 針對這項任務，在這個工作面、這個提供商、這組上下文與工具、這條許可權邊界、這個時間預算和驗收量表下，哪個候選項能達到最低要求？我們是否已有足夠證據擴大試驗？

若候選模型在所選工作面不可用，或兩次執行使用了不同輸入、工具、許可權或推理設定，就不存在乾淨的模型比較。漂亮演示至多說明某個配置曾產生一個結果，不能建立通用排名或總體價效比結論。

## 學習目標

完成本章後，你應該能夠：

- 先選擇任務和工作面，再選擇模型；
- 在實際賬戶、工作區、提供商和會話中核驗模型可用性，而不是根據目錄或選擇器推斷；
- 將模型 ID、提供商、推理強度、上下文、工具、許可權和驗收標準視為不同的比較變數；
- 執行低風險的三任務冒煙比較，而不為“救回”某一個候選項而改變條件；
- 將容量不足、提供商不匹配和長時間等待失敗儲存為證據；以及
- 說明實驗能證明什麼、不能證明什麼，以及何時該停止。

## 現實問題入口：模型選擇會在日常情境中失敗

專案的 [Codex 現場研究](../evidence-library-ZHTW.md#source-notes) 彙集公開 GitHub Issue 和其他公開討論。這些記錄是症狀，不是官方診斷或本地復現；它們的價值在於暴露模型選擇出錯時人們常作出的假設。

| 公開症狀 | 報告者觀察到什麼 | 它**不能**證明什麼 | 第一個安全響應 |
|---|---|---|---|
| 模型選擇器更改了 `model`，卻保留自定義 `model_provider` | 可見模型和實際提供商可能構成無效配對 | 選擇器、提供商或模型在所有環境中都已損壞 | 同時讀取實際生效的 `model` 與 `model_provider`；更正前保留脫敏後的配置 diff |
| 所選模型處於容量限制 | 任務在得到完整結果前停止，後續提示可能面對部分狀態 | 模型質量低，或重試就代表第一次已經完成 | 儲存檢查點、diff、日誌和測試；繼續前先分類該狀態 |
| Windows 命令持續顯示 `Working` | 介面顯示仍在活動，卻沒有可驗證輸出 | 格式化器、Agent 或模型仍在進行有用工作 | 採用超時/停止規則，安全中斷，檢查 worktree，只重跑有界檢查 |

原始連結、日期、版本、證據等級和不確定性說明見[模型選擇研究記錄](../evidence-library-ZHTW.md#source-notes)。本專案沒有執行這些報告中出現的命令或解決方案。

### 怎樣使用真實報告，而不把它變成傳說

每個症狀都要分開保留四種標籤：

1. **使用者報告：** 某人在具名環境中所說發生的事情。
2. **獨立報告：** 是否有另一位使用者描述相似症狀。
3. **官方確認：** 維護者回復、官方文件、發行說明或其他第一方證據。
4. **Playbook 證據：** 本專案實際復現了什麼。

上面三個例子可能已有前兩類標籤，但專案沒有本地復現，也沒有官方根因確認，不能把它們升級為保證有效的修復方案。因此行動應是儲存證據、縮小下一步檢查，而不是承諾一個“神奇設定”。

## 1. 模型選擇是一項配置決策

### 可用性先於質量

使用兩個分開的關卡：

```text
官方產品文件
→ 實際賬戶 / 工作區 / 組織授權
→ 目標工作面和提供商
→ 模型在本會話中可見
→ 無害請求成功
→ 所需工具可呼叫
→ 任務結果已驗證
```

每一個箭頭對應不同斷言。官方頁面可以描述某模型，它仍可能不對某個賬戶開放；它也可能出現在選擇器中，卻在請求到達提供商時失敗。一次成功的文字回復同樣不能證明任務需要的檔案、終端、瀏覽器或聯結器可用。

在候選卡中使用這些欄位：

```text
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
```

`not_observed` 是有效結果：它表示檢查沒有執行，或沒有留下可用證據。它比用猜測填滿表格更安全。

### 產品定位只是起始假設

在 2026-08-11 的來源檢查中，官方 Codex 模型頁大致這樣描述推薦的 GPT-5.6 選擇：

| 官方定位 | 合理的起始假設 | 仍需測試什麼 |
|---|---|---|
| Sol：複雜、開放式工作，提供更多分析和打磨 | 當模糊性、判斷或高價值審查佔主導時嘗試它 | 在你的任務集上的首輪透過率、時長、成本、穩定性和工具行為 |
| Terra：務實的日常主力 | 對需要強推理和工具使用的普通工作嘗試它 | 在實際約束下是否達到你的驗收閾值 |
| Luna：清晰、可重複、高吞吐工作 | 對提取、分類、轉換和結構化摘要嘗試它 | 加上上下文、提供商、推理強度與審查成本後，結果是否仍可接受 |

這些是產品描述，不是 Playbook 的基準測試結果。官方頁面同樣提醒：更高推理強度可改善複雜工作，但會花更久、使用更多 token。先用滿足驗收量表的最低強度；只有任務確實需要更多規劃、分析或檢查時才提高，並將該設定記入執行記錄。

`Max` 與 `Ultra` 不是免費的質量標籤。官方頁面將 Max 描述為給單一任務更多推理時間，將 Ultra 描述為對可拆分複雜工作使用子代理。它們改變工作流與資源邊界，因此 Ultra 執行不能與單代理執行當作純模型比較。

### 模型、提供商和工作面構成一個元組

不要只寫 `model = ...`。有用的比較身份是：

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

如果任何核心成員變化，要麼是在比較不同工作流，要麼應標記該次執行 `not_comparable`，並在新契約下重跑兩側。

官方文件描述本地桌面端、CLI 和 IDE 預設值共用 `config.toml` 路徑，而 Cloud 對話有不同的預設模型邊界。配置檔案只構成配置證據：在認定元組已生效前，讀回實際提供商和模型，再做一次無害請求。

## 2. 按正確順序做決定

不要從偏愛的模型開始。使用以下順序：

```text
定義任務和風險
→ 選擇 Local / Worktree / Cloud
→ 選擇入口與提供商
→ 核驗目標訪問和模型可用性
→ 凍結上下文、工具、許可權、推理強度和驗收標準
→ 執行同一任務集
→ 檢查 comparable / not_comparable 行
→ 擴大、停止，或收集更多證據
```

### 先給任務分類

任務類別決定“足夠好”是什麼意思：

- **理解和提取：** 從材料中找到結構化值；
- **轉換和生成：** 在固定 schema 下改寫、摘要、分類或格式化；
- **規劃和判斷：** 處理約束、取捨和不確定性；
- **編碼和使用工具：** 檢查、編輯、執行和修復倉庫；
- **研究和審查：** 查詢來源、協調斷言並暴露缺口；以及
- **創作和設計：** 在反饋輪次中保持一種風格。

一個候選項透過提取任務，仍可能不適合多檔案修復或高風險證據審查。驗收量表必須匹配任務類別。

### 鎖定工作面與風險邊界

選擇能提供所需證據的最小環境。任務不需要遠端執行時，將合成或脫敏輸入保留在本地；當前未提交工作必須隔離時，使用可丟棄的 Worktree；僅在倉庫、環境、網路、秘密資訊和審查路徑都已批准且可觀察時使用 Cloud。

模型選擇無法補償缺失檔案、不可用聯結器、錯誤檢出目錄或未授權寫入。環境錯誤時，應停在工作面決策，而不是在不平等條件下“測試”模型。

## 3. 執行前先寫候選卡

每個候選模型或工作流使用一張卡：

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

第一次執行前，凍結：

- 精確的任務輸入及其版本；
- 工作面、入口、提供商、模型和推理強度設定；
- 相關上下文與工具版本；
- 許可權和允許的副作用；
- 驗收量表和審查者；
- 時間邊界與重試預算；以及
- 成本測量基準。

不要只為一個候選項改變提示詞、增加上下文、授予工具、提高強度或放寬許可權。若任務契約變化，遞增版本，並在新版本下重跑兩個候選項。

## 4. 實驗：三任務冒煙比較

**實驗狀態：** `not_run`。這是練習協議，不是本倉庫已經執行模型比較的證據。

### 準備

選擇同一工作面上 `surface_available: yes` 的兩個候選項。使用版本化、離線的 [`three-task-smoke-v1` fixture](../../evals/candidates/three-task-smoke-v1/README-ZHTW.md)，不要憑記憶重新造輸入。它包含合成、非敏感輸入和本地驗證器，但不包含模型執行記錄。不要使用生產資料、真實秘密資訊、外部寫入、釋出、推送、部署或付費聯結器。每個任務初始只執行一次，至多允許一次預先宣告、格式相同的返工。

凍結 `task_set_version: three-task-smoke-v1`、兩張候選卡、一份驗收量表、原始輸出位置、日誌位置，以及針對不可用、容量中斷、許可權不匹配、輸入漂移或工具版本漂移的停止條件。

### 固定任務

規範任務 ID 為 `extract-01`、`markdown-02` 和 `gap-review-03`，分別覆蓋結構化提取、受約束 Markdown 轉換和證據缺口審查。每個任務目錄均含指令、一個凍結輸入、一個預期輸出和驗證器；包在 `fixture.json` 中釋出精確輸入 SHA-256 值，供審查者發現漂移。

不要為某一候選項換成更漂亮的演示。如果輸入、指令、輸出 schema 或驗收規則必須改變，建立新任務集版本，並重跑兩側。

### 任務步驟

1. 呼叫任一候選項前，完成並儲存兩張候選卡。
2. 在所選工作面核驗可用性，並記錄證據位置。
3. 按相同任務順序、相同輸入和相同驗收量表執行候選項 A 與 B。
4. 在人工編輯前儲存原始輸出，記錄事件、時長、成本基準和錯誤類別。
5. 執行失敗時，只允許預先宣告的受控返工。不要把反覆盲目重試變成隱藏的成功指標。
6. 計算任何摘要前，審查每一行 `not_comparable`。
7. 結論只能是 `worth expanding`、`do not expand yet` 或 `insufficient evidence`，並記錄限制與下一次執行條件。

### 證據

比較記錄至少應包含：

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

另一位審查者應能重建這三個輸入、條件和驗收標準。不要用空單元格、估算值或另一候選項的輸出填補中斷執行；除非選定成本基準明確定義這種換算，token 數不是貨幣。

## 5. 失敗變體與安全恢復

| 失敗變體 | 為什麼結果不可比較 | 安全處理 |
|---|---|---|
| 候選項在所選工作面不可見或不可呼叫 | 不存在同一工作面的對照執行 | 記錄 `surface_available: no` 或 `not_observed`；停止該候選項，不將不可用性計作模型質量 |
| 模型選擇器與提供商不一致 | 請求可能沒有使用預期模型 | 儲存脫敏後的實際配置 diff；修正元組，或把比較改為提供商/工作流測試 |
| 容量錯誤中斷一側執行 | 輸出和時長不完整，下一次嘗試可能從部分狀態開始 | 儲存錯誤與檢查點；標記 `blocked` 或 `not_comparable`；只在宣告的條件下重跑兩側 |
| 命令等待卻沒有可驗證事件 | `Working` 標籤不是結果 | 採用超時規則，中斷，檢查 diff 與程序狀態，並將驗證記錄為缺失 |
| 一側獲得額外上下文、更高強度或新工具 | 自變數不再只有模型 | 標記 `not_comparable`，儲存兩條記錄，並按凍結契約重跑 |
| 用一個吸引人的演示宣佈總體贏家 | 樣本量和結論範圍不匹配 | 回到 `candidate` 或 `insufficient evidence`；擴大任務類別與重複次數後再擴大結論 |

面對容量或長等待失敗，現實響應不是“不斷點選直到成功”。應該儲存最後已知狀態，識別任務是完成、部分完成還是未知，再選擇有界恢復。新對話可以作為恢復工作面，卻不會繼承舊對話的完成證明。

## 覆盤

根據候選卡與原始證據回答，而不是根據記憶：

- 哪項任務改變了擴大/停止決定？
- 哪個差異可能來自模型，哪個可能來自工作面、提供商、上下文、工具、許可權、容量或審查者？
- 在什麼地方，更快或更便宜的輸出仍會不滿足驗收量表？
- 哪些句子是官方產品定位，哪些是本次冒煙執行的觀察？
- 如果只有一個漂亮演示，究竟是什麼阻止你得出通用排名？

## 遷移

將同一套比較欄位遷移到以下任一任務：

- 同一模型在 Local 與 Worktree 上的比較；
- 帶嚴格輸出 schema 的文件轉換；
- 帶引用和未知項列的研究來源協調；或
- 帶只讀工具邊界的低風險程式碼檢查。

凍結新的任務集版本和領域驗收量表。不要把模型選擇或三任務結果直接複製到新領域；說明哪些結論仍侷限於該任務，哪些主張必須放棄。

## 本章證據

預期交付物是兩張候選卡、凍結的任務集與量表、初始原始執行及任何受控返工、一張比較表、型別化錯誤記錄，以及擴大/停止決定。在這些記錄存在前，本章實驗必須保持 `not_run`；官方定位和一次演示都不能替代評測證據。

## 來源與維護邊界

| 事實或方法邊界 | 來源 | 訪問日期 | 適用範圍 | 負責人 / 下次複核 |
|---|---|---:|---|---|
| 官方模型定位、推理指導、本地預設值、Cloud 模型邊界和棄用說明 | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | 訪問當日的官方文件；不是賬戶級可用性證明或基準測試 | `facts-maintainer` / 2026-09-11 |
| CLI 工作面與本地倉庫工作流 | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | 官方 CLI 文件；不是本會話的實際配置 | `facts-maintainer` / 2026-09-11 |
| Cloud 環境、設定、日誌和審查邊界 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | 官方 Cloud 文件；設定不等於 Agent 階段完成 | `facts-maintainer` / 2026-09-11 |
| 公開模型/提供商、容量和長等待症狀 | [現場問題記錄](../evidence-library-ZHTW.md#source-notes) | 2026-08-11 | 使用者報告和專案指導；沒有本地復現或官方根因主張 | `curriculum-maintainer` / 2026-09-11 |
| 固定任務比較方法 | [中文課程目錄中的評測章節狀態](../table-of-contents-ZHTW.md) 與[版本化 fixture（中文說明）](../../evals/candidates/three-task-smoke-v1/README-ZHTW.md) | 2026-08-14 | Playbook 方法和本地 fixture 驗證器；固定資料仍為共享材料，且沒有任何已完成模型執行 | `evaluation-maintainer` / 2026-09-11 |

模型 ID、工作面矩陣、價格、容量、配置語法、提供商支援、推理控制和棄用通知都可能變化。發生變化時，先重新整理第一方來源，再更新事實影響登記、研究記錄、本章、受影響評測 fixture 和狀態源。將官方定位、使用者症狀與本地執行時證據寫在不同句子中。

## 驗收清單

- [ ] 我能在命名模型前定義任務、風險、工作面、提供商和驗收量表。
- [ ] 我能記錄實際可用性證據，而不是從模型目錄、配置值或選擇器標籤推斷訪問許可權。
- [ ] 我能為兩個候選項填寫模型、提供商、推理強度、上下文、工具、許可權、成本基準和任務集版本。
- [ ] 我能在不改變任一側條件的前提下，執行或正確阻止 `three-task-smoke-v1` 的六次初始執行。
- [ ] 我能儲存提供商不匹配、容量和長等待證據，並區分恢復與驗證。
- [ ] 我只能報告任務範圍內的觀察，並能解釋為什麼一次演示不能證明總體排名或價效比。
- [ ] 我能說明本章仍為 `candidate`，實驗與模型評測仍為 `not_run`。

本繁體中文譯文是可讀的 `in-progress` 翻譯單元，獨立語言審校尚未完成；它不是已驗證譯文，也不表示課程已經透過學習者驗證。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章節導覽">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-ZHTW.md" aria-label="上一章：第 5 章 · 選擇正確的 Codex 工作面">← 上一章<br><strong>第 5 章 · 選擇正確的 Codex 工作面</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-ZHTW.md" aria-label="下一章：第 7 章 · Skill、Plugin、MCP 和工具如何分工">下一章 →<br><strong>第 7 章 · Skill、Plugin、MCP 和工具如何分工</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
