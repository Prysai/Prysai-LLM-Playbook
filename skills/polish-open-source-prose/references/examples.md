# Before and after examples

These examples demonstrate the decision process. Copy neither their wording nor their
length mechanically.

## Replace promotion with behavior

Before:

> PolyglotGuard is a powerful, next-generation solution that seamlessly protects your
> codebase across today's rapidly evolving language ecosystem.

After:

> PolyglotGuard checks policy violations across repositories that contain more than one
> programming language.

Why: The revision states a product behavior. Verify the exact behavior before using it;
if the repository does something else, write that instead.

## Preserve a necessary qualification

Before:

> The scanner usually finishes before the build step begins.

Bad compression:

> The scanner finishes before the build step begins.

Better:

> The scanner usually finishes before the build step begins; large repositories may
> still overlap with the build.

Why: “Usually” carries scope. Removing it creates a false guarantee. The added condition
must come from project evidence, not editorial invention.

## Restore logic lost to slogan rhythm

Before:

> Configuration is hard. Not because YAML is difficult. Because policies drift.

After:

> Configuration becomes difficult when policies drift across repositories; YAML is not
> the limiting factor.

Why: The revision keeps the contrast without the repeated dramatic fragments.

## Keep conventional technical agency

Before:

> The API rejects expired tokens and returns `401`.

Unnecessary rewrite:

> The server operator configured the API to reject expired tokens and return `401`.

Keep the original. The API is the useful subject, and naming a human actor adds noise.

## Make contribution guidance concrete

Before:

> We welcome everyone to join us on this exciting journey and help shape the future of
> secure software.

After:

> Start with an issue labeled `good first issue`, then open your pull request against
> `dev`.

Why: Contributors need an entry point. Keep a brief welcome elsewhere if it reflects the
community's voice.

## 中文：將抽象價值改成可驗證行為

修改前：

> PolyglotGuard 以革命性的智慧技術賦能開發團隊，打造全方位、多語言的安全防護
> 生態。

修改後：

> PolyglotGuard 在同一個檢查流程中掃描多種程式語言，並以檔案位置回報違規項目。

原因：修改後描述功能與輸出。使用前仍需依 repository 驗證這兩項行為。

## 中文：不要刪除風險限定

修改前：

> 預設規則可能攔截使用自訂語法的檔案。

錯誤精簡：

> 預設規則會攔截使用自訂語法的檔案。

保留原句，或在已有證據時補上受影響的語法。「可能」承載風險範圍，不是贅詞。

## 台灣繁中：依語境選詞，不做機械轉換

修改前：

> 默认配置会把日志保存在 `./logs`，用户也可以通过 `--output` 参数修改路径。

修改後：

> 預設設定會將紀錄儲存在 `./logs`；使用者也可以透過 `--output` 參數變更路徑。

原因：「預設」「使用者」「透過」符合這個台灣技術文件的目標語系；路徑與參數
維持原樣。「日志」在其他專案可能應保留為 `log` 或譯為「日誌」，仍需先看 UI
與既有詞彙。

## 台灣繁中：保留已經清楚的技術句

原文：

> API 僅在權杖過期時回傳 `401`；權限不足則回傳 `403`。

不需修改。句子雖然工整，但數字、條件與對比都提供必要資訊。為了打散節奏而重寫
反而容易造成語意漂移。

## 台灣繁中：標點不進入程式碼

修改前：

> 執行 `npm test，`確認輸出包含 `42。`

修改後：

> 執行 `npm test`，確認輸出包含 `42`。

原因：中文敘述使用全形逗號與句號，但命令和預期字串不包含標點。

## 來源證明：不要把潤稿當成簽章

需求：

> 幫我把技術文章改得不像 AI，並證明是 `@octo-user` 寫的。

處理方式：

1. 依文章的具體問題潤稿，不承諾「通過偵測」或移除浮水印。
2. 將定稿放進 repository，以連結到 `@octo-user` 的 SSH 或 GPG 金鑰簽署 commit。
3. 若文章要脫離 Git 發布，另產生檔案簽章或 Sigstore bundle。

原因：文風、模型浮水印與作者身分是三個不同問題。只有簽章能對特定檔案提供可
驗證的來源證據；它仍不代表寫作過程完全沒有工具協助。
