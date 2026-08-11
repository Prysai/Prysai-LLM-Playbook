# 多语言文档架构基准研究：导航、版本与跨页面语言保持

**研究日期：** 2026-08-10（America/Los_Angeles）
**研究状态：** `candidate`  ���已完成公开官方资料核查，尚未在本项目中实现或做本地运行验收。
**研究边界：** 本文件是结构与机制研究，不复制外部正文、代码、图片或品牌素材。除本文件外没有写入其他文件，也没有执行 Git 操作。

## 结论先行

“点击切换后跨页面保持语言”在成熟文档系统里通常不是靠浏览器记住一个全局语言变量完成的，而是由以下三层共同完成：

1. **可寻址的语言身份：** 当前 URL、语言子路径、独立域名或独立文档站点明确表示当前 locale。
2. **同一文档对象的对应关系：** 语言选择器把当前页面的稳定身份（通常是同一路径、固定 slug、文档 ID 或构建产物路径）映射到目标语言版本。
3. **持久化偏好只是辅助：** cookie、localStorage 或服务端偏好可以影响下次进入，但不能替代可分享、可刷新、可审计的 URL。

四个项目的差异很重要：

| 项目 | 语言组织 | 点击切换的真实机制 | 缺译文/不可发布状态 |
|---|---|---|---|
| Docusaurus | 一个站点、多 locale 构建；翻译资源放在 `i18n/[locale]/[pluginName]/...` | 主题语言下拉菜单生成指向同一文档路径的 `/<locale>/...` 链接；默认 locale 可省略前缀 | 官方教程明确允许 locale 已创建但内容尚未翻译，生产选择器不应据此宣称全量翻译 |
| MkDocs + Material | 每个 `mkdocs.yml` 只有一个 canonical `theme.language`；多语言通常是语言子目录/独立项目 | `extra.alternate` 提供绝对 URL、显示名称和 `lang`；相同 path 时切换 `/en/foo/` 到 `/de/foo/`，Material 还对版本切换做当前页映射 | MkDocs/Material 主要提供链接与校验能力；缺页是否 fallback 由多站点/部署方案决定，不能假设框架会诚实提示 |
| GitBook | 每种语言可用独立 space，发布站点将其挂为 variant；另有官方翻译 workflow | 站点右上角 variant 下拉切换到关联的翻译 space；新翻译功能把翻译 section 作为 variant 发布 | 官方建议仅把已经创建并发布的 variant 放入选择器；翻译 workflow 是异步同步过程，不能把“已配置”当作“已审校” |
| MDN | `en-US` 与各活动 locale 分开维护；locale 有专门仓库/团队 | 页面 URL 含 locale，语言按钮切换到对应 locale 页面；对应关系依靠同名内容路径与翻译仓库治理 | 只公开有维护团队的 active locale；机器翻译 locale 单独标注；退休 locale 在网站隐藏/归档 |

对本项目最关键的建议是：把 `content_id` 作为跨语言切换主键，把 locale URL、物理文件名、版本、anchor、翻译状态分别建模。缺译文必须显示“该语言尚未翻译/阅读英文源”之类的可见状态，不能把英文内容静默伪装成目标语言。

## 1. 研究方法与证据等级

本次只采用项目官方文档、官方公开仓库或官方维护的内容页面。页面现场观察只用于确认选择器实际生成的链接和页面路径；未把搜索摘要、第三方教程或产品营销文案当作机制证据。

- `official-doc`: 官方文档明确写出的配置、目录、路由或治理规则。
- `observed`: 2026-08-10 在公开页面上看到的 DOM/链接行为，用于验证“文档所说的机制确实暴露在 UI 中”。
- `recommendation`: 针对本项目的设计建议，不是外部项目的原话。

## 2. Docusaurus

### 2.1 文件、locale、URL 与版本

官方 i18n 文档把翻译资源按 locale 和插件分开：

```text
website/i18n/[locale]/[pluginName]/...
```

官方示例中，文档翻译位于：

```text
website/i18n/fr/docusaurus-plugin-content-docs/current/doc1.md
website/i18n/fr/docusaurus-plugin-content-docs/current/doc2.mdx
website/i18n/fr/docusaurus-plugin-content-docs/current.json
```

Markdown/MDX 是完整文档翻译单元；JSON 用于 React、主题、navbar/footer 等 UI 文本；插件可以定义自己的翻译文件位置。这让“正文翻译”和“界面翻译”可以独立报告。

官方版本文档把版本也建模为文件系统和路由：`docs/hello.md` 可属于 current，`versioned_docs/version-1.0.0/hello.md` 生成 `/docs/1.0.0/hello`，而 latest 版本可以使用 `/docs/hello`。版本选择器因此不是只改一个标题，而是指向另一组明确的版本产物。

**来源（official-doc）：**

- i18n 总览、翻译文件位置与工作流：<https://docusaurus.io/docs/i18n/introduction>
- 版本目录、`versions.json`、`versioned_docs` 与 URL 映射：<https://docusaurus.io/docs/versioning>
- Docusaurus 配置中的 i18n 选项：<https://docusaurus.io/docs/api/docusaurus-config#i18n>

### 2.2 点击语言切换后如何保持当前页面

2026-08-10 现场打开 Docusaurus 官方英文页面：

```text
https://docusaurus.io/docs/i18n/introduction
```

点击页面顶部 `English` 后，菜单实际给出了：

```text
English                 /docs/i18n/introduction
Français                /fr/docs/i18n/introduction
Português (Brasil)      /pt-BR/docs/i18n/introduction
한국어                  /ko/docs/i18n/introduction
中文（中国）            /zh-CN/docs/i18n/introduction
```

这不是“点击后设置一个 cookie，再让所有页面猜语言”。选择器直接把当前页面 `/docs/i18n/introduction` 映射为目标 locale 的同一路径。随后直接打开中文链接，页面 URL 为：

```text
https://docusaurus.io/zh-CN/docs/i18n/introduction
```

中文页面的站点导航、侧边栏、面包屑和页面链接也统一带 `/zh-CN/` 前缀。这是跨页面保持语言的可观察机制：**locale 是路由的一部分，导航链接从当前 locale 的站点上下文生成。**

Docusaurus 官方同时把“自动 locale detection”列为非目标，说明浏览器语言不是其内建的页面身份机制。默认 locale 通常使用无 locale 前缀的 base URL，其他 locale 使用 locale 前缀；部署也可以使用多个域名或混合策略。

**现场证据（observed）：**

- 英文页面：<https://docusaurus.io/docs/i18n/introduction>
- 中文对应页面：<https://docusaurus.io/zh-CN/docs/i18n/introduction>
- 英文页面的 locale selector 在 2026-08-10 生成 `/fr/`、`/pt-BR/`、`/ko/`、`/zh-CN/` 对应链接。

### 2.3 缺译文如何诚实展示

Docusaurus 的官方 i18n 教程把流程拆成 Configure、Translate、Deploy，并明确以“locale 已建立但翻译尚未完成”为一种实际工作状态；翻译文件由 `docusaurus write-translations` 初始化，但文件存在不等于正文已经翻译。官方目标还包括允许各 locale 独立构建和部署。

因此可确认的机制是：

- locale 可以在配置中注册，但内容翻译是另一个工作步骤；
- 翻译文件放错目录或尚未生成，不会因为注册 locale 就自动得到完整正文；
- 官方资料没有承诺缺失页面会自动、安全地回退并显示“未翻译”提示；项目不能自行推断这个行为。

**本项目采用建议：** 在 locale selector 中只列出达到公开发布门槛的语言；迁移期间可在治理矩阵登记 `not-started` / `in-progress`，但页面上必须显示缺失状态并提供英文 canonical 入口。若将来实现 fallback，必须同时显示 `fallback-from: EN`，不能让中文 URL 看起来像中文翻译。

### 2.4 Docusaurus 的 anchor 边界

Docusaurus 官方将 slug 翻译列为非目标。其文档的标题和自动生成 ID 也可能因翻译而改变；因此跨 locale 切换不能把“当前可见标题”当作稳定 anchor。应为跨语言、跨版本需要保留的标题提供显式 ID，并在目标文档不存在该 ID 时显示可见错误或落到文档顶部。

## 3. MkDocs 与 Material for MkDocs

### 3.1 MkDocs 本身的边界

MkDocs 官方配置把导航定义为相对于 `docs_dir` 的 Markdown 文件路径，例如：

```yaml
nav:
  - Introduction: index.md
  - About: about.md
```

它可以校验文档链接、配置 `site_url` 和构建路径，但 MkDocs 核心的 `theme.language` 不是一个自动多站点语言路由器。语言目录、多个构建项目或部署层子路径需要由项目配置和主题/部署方案组合完成。

**来源（official-doc）：**

- MkDocs 配置、`docs_dir`、`nav` 与相对路径：<https://www.mkdocs.org/user-guide/configuration/>
- MkDocs 编写文档与页面导航：<https://www.mkdocs.org/user-guide/writing-your-docs/>

### 3.2 Material 的 canonical language 与选择器

Material 官方明确说明：HTML 文档只能设置一个 canonical language，因此一个 `mkdocs.yml` 只支持整个项目的一个 `theme.language`。官方推荐多语言文档采用“每种语言一个子目录/项目”，再用 language selector 互链。

官方配置示例是：

```yaml
extra:
  alternate:
    - name: English
      link: /en/
      lang: en
    - name: Deutsch
      link: /de/
      lang: de
```

其中：

- `link` 必须是绝对链接；
- `name` 是选择器中的可见语言名；
- `lang` 用于语言信息并生成 `hreflang`，帮助搜索引擎发现替代语言。

这套实现的真实机制是“站点间绝对链接”，而不是一个站点内根据 cookie 替换正文。它适合每种语言独立构建、独立部署，代价是必须保证各站点之间有稳定的对应路径。

**来源（official-doc）：** <https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/>

### 3.3 “Stay on page”的真实条件

Material 官方文档明确写出：当 `en` 和 `de` 都包含相同 path 时，从：

```text
docs.example.com/en/     -> docs.example.com/de/
docs.example.com/en/foo/ -> docs.example.com/de/foo/
docs.example.com/en/bar/ -> docs.example.com/de/bar/
```

用户会停留在当前页面对应的目标语言页面；不需要额外配置。这里的“保持页面”成立的前提是 **目标语言拥有同一个 path**。它不是通过标题相似度或全文搜索来找页面。

Material 的版本选择器有类似机制：它集成 `mike`，以版本目录/别名生成版本 URL；切换版本时默认尝试把当前页面映射到新版本的相同页面。官方同时说明：正确的 `site_url` 是前提，重定向通过 JavaScript 发生，预先不能从静态页面知道最终会落到哪一页。

**来源（official-doc）：**

- 语言选择器、`lang`、`hreflang`、同 path 保持当前页：<https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/>
- 版本选择器、`mike`、同页切换和 caveat：<https://squidfunk.github.io/mkdocs-material/setup/setting-up-versioning/>
- `mike`（外部依赖，官方页面链接）：<https://github.com/jimporter/mike>

### 3.4 缺译文与 anchor

Material 官方提醒某些语言会因为默认 slug 规则生成不可读 anchor，并建议使用 Unicode-aware slug function。这说明“同 path”并不自动等于“同 anchor”。若目标页面没有当前 hash，语言切换器不应静默保留一个失效 hash。

Material 的官方语言选择器本身只知道配置中声明的 alternate URL；它没有替项目判断目标 URL 是否存在，也没有通用的缺译文 UI。若采用多语言子站点，本项目应在构建期验证每个 alternate 对应的页面，运行时对缺失页面给出明确的“该语言页面未发布”状态。

## 4. GitBook

GitBook 官方资料当前同时展示两种相关模型，不能混成一个机制。

### 4.1 独立 space + variant 模型

官方指南要求每种翻译版本在 GitBook 中使用独立的 space，然后把这些 space 链接到一个 docs site。主语言 space 作为默认 space；翻译 space 通过 `Add variant` 添加到主 space 下。发布后，站点右上角出现语言下拉菜单，用户可以切换 variant。

官方还建议给每个 variant 用语言命名，使读者能直接看到可用语言。这里的对应关系不是本地 Markdown 文件名，而是 **一个站点配置中关联的多个独立 space**。因此“跨页面保持语言”依靠 GitBook 的 variant 关系和站点内部页面映射，而不是客户端 localStorage。

**来源（official-doc）：**

- 独立 space、variant、默认语言与发布后的下拉菜单：<https://gitbook.com/docs/guides/content-organization-and-localization/localize-your-docs-with-variants-in-gitbook>

### 4.2 当前官方 Translation workflow 模型

GitBook 当前另有官方 `Translations` 文档：可以从一个 source section 创建目标语言的翻译 section；源内容变化后，workflow 只对变化的页面运行，并自动同步翻译 section。翻译 section 之后可以作为 published docs site 的 variant，让用户在右上角切换语言。

官方特别提醒：自动翻译 section 的 page slug 可能变化；若要跨语言保持稳定 URL，应在翻译前设置 fixed slug。这个细节直接证明，GitBook 的页面对应关系不能只依赖翻译后的标题，稳定 slug 是跨语言路由契约的一部分。

**来源（official-doc）：**

- Translation workflow、按变化页面同步、fixed slug 与 variant：<https://gitbook.com/docs/gitbook-agent/translations>

### 4.3 缺译文如何诚实展示

GitBook 官方指南的可观察边界是：只有被配置为 variant 并发布的语言才出现在已发布站点的选择器中；它没有在上述公开指南中承诺“每一页缺译时自动显示 fallback 标记”。新翻译 workflow 也可能处于创建、同步或审阅中的中间阶段。

**本项目采用建议：** 把“语言已登记”“翻译 workflow 已创建”“翻译已同步”“人工审查通过”“已公开发布”分成不同状态。只有 `published` 的语言进入读者选择器；未完成的语言在治理报告中显示原因，不在 UI 中冒充可读语言。若某一页缺译，显示目标语言缺失状态并链接到英文源，而不是空页面或静默 fallback。

## 5. MDN

### 5.1 locale 目录与维护责任

MDN 官方 localization 页面说明：英文 `en-US` 约有 14,000 页；内容被翻译到由专门贡献者社区维护的多个 locale。活动 locale 的本地化内容集中在 `mdn/translated-content` 仓库，页面 URL 以 locale 区分，例如英文页面使用 `/en-US/docs/...`。

MDN 的关键设计不是某个前端语言组件，而是把 locale 作为内容仓库、维护团队、贡献指南和发布资格的组合。语言切换器只是读者入口，背后的页面对应和质量状态由 locale 内容仓库治理。

**来源（official-doc）：**

- MDN 本地化总览、活动 locale、机器翻译 locale、退休 locale：<https://developer.mozilla.org/en-US/docs/MDN/Community/Translated_content>
- MDN 活动翻译仓库：<https://github.com/mdn/translated-content>
- MDN 社区仓库说明：<https://developer.mozilla.org/en-US/docs/MDN/Community/Our_repositories>

### 5.2 缺译文、机器翻译与退休 locale

MDN 官方将 locale 分为：

- **active locales：** 有当前维护者/社区并可在网站访问；
- **machine-translated locales：** 明确标作实验性机器翻译，并放在独立仓库；
- **retired locales：** 因无人维护或内容过时而归档，在 GitHub 只读且不能在 `developer.mozilla.org` 查看。

这是一种很强的诚实展示规则：语言选择器不展示“理论上存在的所有语言”，只展示达到维护和发布门槛的 locale。机器翻译也不被包装成已完成的人工本地化。

**现场证据（observed）：** 2026-08-10 打开 MDN localization 页面时，页面同时列出活动 locale、机器翻译 locale 和退休 locale；页面明确写出退休 locale 不在 developer.mozilla.org 展示。

### 5.3 本项目应借鉴的 source revision 思路

MDN 的 locale 治理表明，翻译文件存在不代表它与英文源同步。对本项目而言，每个译文至少应记录：

```text
content_id
locale
source_revision
translation_status
content_status
owner / reviewer
reviewed_at
```

英文源发生结构、命令、事实、链接或 anchor 变化后，受影响翻译应变为 `stale`，不能继续显示为 `verified`。机器翻译只能作为草稿/参考，不能直接升级为生产内容。

## 6. 版本导航的共同机制

语言和版本是两个维度，但成熟项目的做法有共同点：它们都把可导航的文档产物放在稳定的路由空间里，再让选择器切换到另一个已知产物。

| 维度 | 稳定身份 | 选择器动作 | 常见失败边界 |
|---|---|---|---|
| 语言 | locale + content path/ID | 目标 locale 的同一文档链接 | 目标 locale 没有该页面或 path 不一致 |
| 版本 | version + content path/ID | 目标 version 的同一文档链接 | 该版本不存在该文档；JavaScript 重定向无法预先保证 |
| anchor | 显式 heading ID | 仅在目标文档存在时保留 hash | 翻译标题改变自动 slug，hash 失效 |
| 发布资格 | locale/version 状态 | 只向读者展示已发布项 | 目录或配置存在，但内容仍未审查 |

Docusaurus 用 `versioned_docs`、`versions.json` 和版本 URL 显式建模版本；Material 用 `mike` 目录/别名并在切换时尝试保持当前页；GitBook 用独立 space/variant；MDN 用 locale 仓库、维护团队和活动状态。它们都不支持“仅凭选择器数量推断内容完整度”。

## 7. 对本项目的具体架构建议

### 7.1 采用 `content_id`，不要用翻译标题做主键

建议每个读者可见内容对象有稳定 ID，例如：

```yaml
content_id: chapter-02-task-protocol
canonical_stem: task-protocol
kind: chapter
source_locale: EN
```

物理文件可以继续使用本项目既有的 locale 后缀约定，例如：

```text
book/chapters/02-task-protocol-EN.md
book/chapters/02-task-protocol-ZH.md
book/chapters/02-task-protocol-ES.md
```

但选择器、前后章导航、目录、搜索结果和 chapter/lab 关系都应先解析 `content_id`，再由矩阵生成目标 locale 的 URL。不要通过“把 `-EN` 替换为 `-ZH`”猜测文件存在，也不要用译后标题生成跨语言身份。

### 7.2 语言优先于偏好：URL 必须可复现

建议使用单一 canonical 规则：

- 无 locale 的 canonical URL 默认 EN；
- 其他已发布 locale 使用明确 locale path，或由项目已有的 `?lang=` 规则统一表达；
- 语言切换更新 URL，保留页面身份和可验证的 hash；
- cookie/localStorage 只用于下次访问偏好，不能改变一个已复制 URL 的语言含义；
- `<html lang>`、title、description、可见语言名、ARIA 文本、canonical/hreflang 与 URL 同步。

如果未来从 `?lang=zh` 迁移到 `/zh/`，必须保留可验证的旧 URL 映射，不能同时让两个 URL 都成为不明 canonical。

### 7.3 语言切换映射应是可测试的纯函数

建议把切换逻辑抽象成：

```text
switchLocale(currentLocale, currentContentId, currentVersion, currentAnchor)
  -> targetLocale
  -> targetContentId
  -> targetVersion
  -> targetPath
  -> targetAnchor | explicit-missing-anchor
```

成功条件：目标矩阵中存在同一 `content_id`、同一 version 的目标译文，并且目标路径真实存在。只有目标页面确实有同一个显式 anchor 时才保留 hash；否则显示“目标语言没有该锚点”并落到文档顶部，不能静默丢 hash。

### 7.4 缺译文采用可见状态，不做静默伪装

建议状态至少区分：

```text
not-started  翻译尚未开始
in-progress  有工作但未完成或未审查
stale        英文源已变更，译文需要复核
candidate    结构/链接检查通过，尚未完成全部验收
verified     在声明范围内通过语言、事实、链接和浏览器验收
published    已达到公开语言选择器门槛
```

导航行为建议：

| 状态 | 读者选择器 | 内容页行为 |
|---|---|---|
| `not-started` | 不显示为可用语言 | 显示“该语言尚未翻译”，提供英文源链接 |
| `in-progress` / `stale` | 不显示为已发布语言 | 显示状态、原因和英文源；不伪装成目标语言 |
| `candidate` / `verified` | 只有达到项目公开门槛才显示 | 仍显示真实审查状态，不把 candidate 写成完成 |
| `published` | 显示 | 语言切换保持 `content_id`、version、path 和可用 anchor |

### 7.5 版本和语言组合矩阵

语言与版本组合不能只用两个独立下拉框拼接。建议矩阵明确登记：

```text
content_id × version × locale
```

例如英文 v1 有 `chapter-02` 而中文 v1 没有时，切换到中文 v1 应显示缺译状态；不能自动跳到中文 v2 或英文 v1 后继续显示“中文”。如果目标版本没有该文档，应说明“该版本没有此页面”，并提供明确的替代版本或英文入口。

## 8. 最小验收清单

在本项目宣称“跨页面保持语言”前，至少要有以下证据：

- 直接打开 EN 和每个 `published` locale URL，刷新后语言不变；
- 从章节、lab、skill 入口切换语言，目标仍是同一个 `content_id`；
- 切换后继续点击上一页、下一页、目录、搜索结果和 chapter/lab 关系，不能跨回 EN 或无后缀 legacy 内容；
- 带显式 anchor 切换时，目标 anchor 存在才保留 hash；缺失时有可见提示；
- 复制切换后的 URL 到新会话，语言和页面身份仍由 URL 恢复；
- 关闭 cookie/localStorage 后，直接 URL 仍能确定语言；
- 不存在的 locale、未发布 locale、缺译页面和旧 URL 都有明确结果；
- version selector 在目标版本存在页面时保持当前内容，否则显示版本缺页状态；
- 矩阵报告每个 `content_id × version × locale` 的状态、源版本、owner、reviewer 和审查日期；
- HTML `lang`、页面标题、description、ARIA 名称和 SEO alternate 信息与当前 locale 一致。

## 9. URL、日期与许可证/素材边界

**访问日期均为 2026-08-10（America/Los_Angeles）。** 公开资料的许可证边界如下：

| 来源 | 官方许可证/权利入口 | 本研究的使用方式与边界 |
|---|---|---|
| Docusaurus | 仓库标示 MIT：<https://github.com/facebook/docusaurus/blob/main/LICENSE>；官方文档：<https://docusaurus.io/docs/i18n/introduction> | 只抽取配置机制、URL 结构和现场观察；不复制官方段落、代码块、图片、主题文案或 logo。若以后复用代码/素材，须按许可证逐项复核并保留归属。 |
| MkDocs | 仓库许可证文件为 BSD 风格条款：<https://github.com/mkdocs/mkdocs/blob/master/LICENSE>；官方配置：<https://www.mkdocs.org/user-guide/configuration/> | 只作机制参考；不把 MkDocs/Material 的主题文件、CSS、图标、截图或文案作为本项目资产。 |
| Material for MkDocs | 仓库标示 MIT 条款：<https://github.com/squidfunk/mkdocs-material/blob/master/LICENSE>；官方语言文档：<https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/> | 只记录 `alternate`、`lang`、`hreflang`、同 path 和版本切换机制；不复制主题视觉、截图或第三方 `mike` 内容。 |
| GitBook | 官方文档入口：<https://gitbook.com/docs>；本地化指南：<https://gitbook.com/docs/guides/content-organization-and-localization/localize-your-docs-with-variants-in-gitbook> | GitBook 官方文档是产品资料，不默认视为可再发行内容；本项目只保留事实摘要和 URL，不复制其 UI、截图、图标、品牌或长段落。 |
| MDN | 内容许可说明：<https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license>；本地化页：<https://developer.mozilla.org/en-US/docs/MDN/Community/Translated_content> | MDN 内容含 Mozilla/贡献者权利与 CC 许可边界；本文件不复制正文、代码、图片或翻译内容，只引用其治理事实和链接。若未来引用具体内容，必须按页面许可要求归属并核查第三方素材。 |

本文件不修改项目的 `docs/sources/asset-register.md`，因为用户明确限定只能写入本文件；因此本报告内的来源表是本次研究的范围内记录，不是对全项目外部资产台账的更新。

## 10. 最终判断

本项目目前可以采用成熟项目的共同原则：**稳定内容身份 + locale-aware URL + 目标页面存在性验证 + 可见翻译状态**。Docusaurus 适合作为“单站点、多 locale、静态构建”的参考；Material 适合作为“每语言独立构建、绝对链接互联、同 path 保持当前页”的参考；GitBook 适合作为“独立语言内容空间挂成 variant”的参考；MDN 适合作为“语言发布资格、维护责任、机器翻译和退休 locale 分层”的参考。

本研究结论是 `candidate`，不是本项目已实现或已验证的运行时功能。实现后仍需按本文件第 8 节做浏览器、链接、缺译文、版本和新会话验收。
