# 六语言文档产品的真实一手架构复核（Round 2）

> 研究日期：2026-08-10（America/Los_Angeles）
> 研究状态：`candidate`
> 研究范围：Docusaurus、VitePress、Astro Starlight、Material for MkDocs、Kubernetes 官方文档。
> 目的：为当前 Markdown + 静态 site 的六 locale 产品回答同页语言切换、route/anchor、缺失翻译、默认语言、文件布局、翻译状态和发布门槛问题。

## 结论先行

五个样本并不存在一个通用的“多语言开关”。它们分成三类：

1. Docusaurus 与 Starlight 把 locale、内容目录和构建产物作为框架能力；Starlight 对“同一页面、缺失翻译、可见通知”规定得最完整。
2. VitePress 提供 locale 目录和 locale-specific 配置，但没有在官方 i18n 页面上规定页面级缺译回退或翻译完整度门槛；这些必须由站点建立内容身份和 CI 规则。
3. Material for MkDocs 的官方推荐是每种语言一个 MkDocs 项目或子路径，再用绝对 alternate 链接互联；Kubernetes 则展示了更成熟的组织治理：内容镜像、源版本、维护团队、人工审校和最小发布集合。

对当前项目最重要的共同原则是：

- 同一内容应由稳定的 `content_id` / filename stem 关联，不能由翻译后的标题或自动 slug 关联。
- route 可以带 locale 前缀或查询参数，但语言切换必须保留当前内容身份、当前 path 和有效 `#anchor`；锚点不能依赖会随翻译改变的标题 slug。
- 缺译可以在迁移期 fallback，但必须在页面上明确标记并提供明确的源语言入口；不能静默把英文当成已完成翻译。
- `content_status`（内容成熟度）和 `translation_status`（翻译进度）是两个维度。注册六种语言不等于六种语言的正文已经完成。
- “能构建”不是“可发布”。至少要把迁移期门槛和公开 locale 的发布门槛分开。

以下事实均来自项目官方文档；没有复制官方正文、代码、图片或品牌素材。页面现场观测单独标注为“观察”，不能扩大解释为所有自定义站点的保证。

## 一、五个项目的架构对照

| 项目 | 默认语言与 URL | 文件命名 / 目录 | 同页切换与 anchor | 缺译提示 | 翻译状态与发布门槛 |
|---|---|---|---|---|---|
| Docusaurus | 配置 `defaultLocale: 'en'`；默认 locale 的 URL 通常省略 locale，其他 locale 默认使用 `/<locale>/`。也支持独立域名或子域名。 | `website/i18n/[locale]/[pluginName]/...`；docs、blog、pages、theme 各自有 plugin 目录。Markdown/MDX 按完整文档复制并翻译。 | `localeDropdown` 可把读者带到对应 locale URL；官方特别提醒翻译标题会改变自动 heading ID，应使用显式 heading ID。 | 新 locale 未提供翻译时，官方教程直接说明站点会“mostly untranslated”；Git 流程可用 `--messagePrefix '(fr) '` 让未翻译 UI 字符串带可见前缀。没有文档级统一缺译徽标。 | 每个 locale 是独立 SPA，可全量构建或单 locale 构建；官方把保持翻译文件与源文件同步视为站点维护者责任，没有强制正文覆盖率 gate。 |
| VitePress | `locales.root` 示例为 English；真实默认 locale 由配置决定。root 路径不自动重定向到 `/en/`，需要服务器规则。 | 示例为 `docs/foo.md`、`docs/es/foo.md`、`docs/fr/foo.md`；也允许每个 locale 独立目录和各自主题配置。 | 同名文件 / 同路径是可行的关联方式；官方没有把它提升为内容身份系统。标题自动生成 anchor，也支持 `## Heading {#stable-id}` 自定义 anchor。 | 官方 i18n 页面说明的是 UI/Markdown renderer 字符串按 locale 覆盖，以及未设置时回退 root 配置；没有规定页面正文的 fallback 或缺译通知。 | 静态构建要求 build-time 确定 page paths；没有官方翻译完整度或“语言上线”门槛，需由项目自建矩阵和 CI。 |
| Astro Starlight | 可配置 `defaultLocale: 'en'`；可将一个 locale 配为 `root`，让它使用无前缀 URL。`defaultLocale` 也决定缺译内容的 fallback 语言。 | `src/content/docs/en/foo.md`、`src/content/docs/zh-cn/foo.md`；同一页面在不同语言目录使用相同文件名。root locale 的文件直接放在 `src/content/docs/`。 | 官方明确说同文件名会关联各语言页面。观察：官方站点从 `/guides/i18n/#fallback-content` 切到 `/zh-cn/guides/i18n/#fallback-content`，保留了页面 path 和 hash。Starlight 默认提供 heading anchor，但没有承诺翻译标题生成的 ID 永远相同。 | 缺译时使用 `defaultLocale` 页面内容，并显示“此内容尚未以你的语言提供”的通知；UI 翻译还有 `i18n.untranslatedContent` 和 `t.exists()` 可检查。 | `draft: true` 的页面不进入 production build。缺译 fallback 本身允许页面被构建，但“有 fallback”不等于“翻译完成”；完整度仍应由项目 gate。 |
| Material for MkDocs | 单个 `mkdocs.yml` 只有一个 canonical `theme.language`，默认是 `en`。多语言官方推荐是每语言一个项目或子目录。 | 官方示例使用独立 `/en/`、`/de/` 项目/路径；`extra.alternate` 的 `link` 必须是绝对链接，可指向不同域名。 | 若两个语言站点存在相同 path，官方 9.7.0 的 “Stay on page” 会从 `/en/foo/` 切到 `/de/foo/`；文档没有对 hash 保留作单独保证。官方还警告某些语言的默认 slug 会产生不可读 anchor，建议 Unicode-aware slugify。 | 官方页面规定的是主题 UI 的语言 fallback（`en` 作为 theme fallback）和 alternate 链接，不是正文缺译通知。 | 每个语言项目分别构建；Material 本身不规定正文翻译完整度 gate。`lang`/`hreflang` 是 selector 和 SEO 的最低元数据要求。 |
| Kubernetes | English 是源语言；Hugo 按语言配置内容目录。语言选择只有在新 localization 满足要求后才启用。 | `content/<two-letter-code>/`，翻译页保持 English source 的 URL path；站点字符串在 `i18n/<lang>/<lang>.toml`，另有语言团队 `OWNERS` 和 `README-**.md`。 | 官方要求 translated documents 使用与 English 相同的 URL path；语言选择由 Hugo 配置的 `languageName` 等字段提供。官方 localization guide 没有承诺跨语言切换会保留任意 hash，因而 anchor 需由项目显式稳定化。 | 没有把每个缺译页静默 fallback 为英文作为主要机制；新语言先在分支上渐进翻译，满足最小内容后才在网站启用语言选择。 | 新 localization 至少需要两位贡献者、团队/OWNERS、工作流和最小必需内容；机器翻译必须经过人工审校；源文件基于指定 release/target version，源变更后要同步 localization。 |

## 二、逐项核对

### 1. Docusaurus：locale/plugin 目录 + 独立构建

Docusaurus 的官方设计把翻译拆成三类：Markdown/MDX 内容、React/theme 的 JSON 字符串和插件读取的数据文件。文件位置由 locale 与 plugin 决定，例如 docs 当前版本位于 `i18n/fr/docusaurus-plugin-content-docs/current/`。这比“在一个 Markdown 文件里根据语言渲染不同段落”更适合静态构建，也使每个语言可以独立构建和部署。

同页切换的 route 由 locale 配置和 theme 的 `localeDropdown` 连接起来。单域部署时默认 locale 的 build 目录不带 locale，法语示例则是 `build/fr`；多域部署时可用每个 locale 的 `url`/`baseUrl`，theme 会据此在切换时指向适当 URL。这里的强约束是 route 组织，不是“标题翻译后 hash 仍相同”。官方教程明确给出反例：`Hello World` 的自动 ID 会变成 `bonjour-le-monde`，因此推荐显式 heading ID，并在跨语言内容中使用稳定 ID。

Docusaurus 对缺译的公开语义较弱：新增法语 locale 但尚未翻译时，官方教程称站点“mostly untranslated”，主题的 `Next`、`Previous` 等通用标签可能仍使用默认翻译。Git 流程的 `--messagePrefix '(fr) '` 可以让未翻译字符串在开发时显眼，这是开发辅助，不是页面级发布门槛。官方还明确说 Markdown 翻译与原文同步是维护者责任，并没有为正文提供自动 stale 追踪或完整度 gate。

**对当前项目的可迁移点：**借鉴显式 heading ID、按 locale 构建和“开发期可见未翻译前缀”；不要照搬其“文件存在即能 build”的宽松发布语义。

### 2. VitePress：配置级 locale + 同名目录约定

VitePress 的 i18n 示例很小：在 `docs/` 下保留 root 内容，再用 `es/`、`fr/` 等目录放同名 Markdown，并在 `docs/.vitepress/config.ts` 的 `locales` 中声明 `label`、`lang`、locale-specific `themeConfig` 和可选的 `link`。如果每个语言都放进独立目录，VitePress 不会自动把 `/` 重定向到 `/en/`，需要 Netlify 等托管层规则；官方还给出用 cookie 保存语言偏好的做法。这说明 cookie 是偏好记忆，不应替代可分享的 URL locale。

VitePress 默认按照文件路径生成页面，并在 heading 上生成 anchor；同时支持 `{#my-anchor}` 形式的显式 anchor。对于翻译产品，应把跨语言内容配对建立在稳定 stem / `content_id` 上，再让 route resolver 产生 `/foo`、`/fr/foo`，而不是用翻译标题猜测页面身份。官方 i18n 页面只对 renderer 内置字符串说明 locale 覆盖和 root 配置 fallback；它没有规定“缺失的正文自动显示 root 内容并加通知”。因此，VitePress 适合做渲染层，但当前项目不能把内建 i18n 当成翻译工作流或发布治理。

**对当前项目的可迁移点：**借鉴简单的 locale 目录和显式 root 配置；保留 URL 级 locale；补上 VitePress 官方没有规定的 content matrix、缺译提示和发布 gate。

### 3. Astro Starlight：最完整的页面级 fallback 语义

Starlight 要求在 `src/content/docs/` 下为语言建立目录，并用相同文件名关联页面，例如 `en/about.md` 与 `fr/about.md`。这为“当前页面切换语言”提供了明确的内容身份。root locale 是一个很实用的折中：English 可服务于 `/about/`，French 服务于 `/fr/about/`，而不需要把默认语言的所有链接暴露成 `/en/`。

Starlight 的官方语义最明确：如果 `/fr/about` 没有法语文件，就用 `defaultLocale` 的 `/en/about` 内容显示，同时附带“此页面还没有翻译成当前语言”的通知。官方还提供 `i18n.untranslatedContent` UI key 和 `t.exists()`，使站点可以检查 UI 字符串是否存在。该 fallback 是显式、可观察的迁移机制，不应被误报为翻译完成。

现场观察也符合 route/anchor 目标：在 Starlight 官方站点打开 `https://starlight.astro.build/guides/i18n/#fallback-content`，选择简体中文后得到 `https://starlight.astro.build/zh-cn/guides/i18n/#fallback-content`。观察只证明该官方实例在该页面保留了 path 和 hash；自定义站点仍需测试自己的 route、slug 和 anchor 规则。

Starlight 的另一个独立门槛是 frontmatter `draft: true` 的页面只在开发环境可见，不进入 production build。它解决“内容草稿不发布”，不解决“翻译是否完成”；当前项目应同时维护内容状态和翻译状态。

**对当前项目的可迁移点：**优先借鉴“同 stem 配对 + 默认语言 fallback + 可见缺译通知 + draft 不进生产”的组合，这是五个样本中最贴近当前需求的页面行为。

### 4. Material for MkDocs：多项目互联 + SEO 元数据

Material 的官方约束很清楚：一个 `mkdocs.yml` 只能为整个项目设置一个 canonical language，因为一个 HTML 文档只能有一个语言声明。多语言文档最容易维护的方式，是每种语言一个子目录/项目，再通过 `extra.alternate` 配置语言选择器。alternate 的 `link` 是绝对链接，`lang` 用于 `hreflang`，因此跨域部署也可以成立。

Material 9.7.0 的 “Stay on page” 规则会在语言站点具有相同 path 时从 English 对应页切到 German 对应页，例如 `/en/foo/` 到 `/de/foo/`，官方说明无需额外配置。这是 route 保持，不等同于 anchor 保持；官方同页文档没有把 hash 列为保证项。另一个风险是默认 slug 对部分语言会生成不可读 anchor，官方建议使用 Unicode-aware slugify。对六语言产品，最稳妥的做法仍是使用跨语言稳定的显式 ID，并对每种语言构建后的实际 HTML 做 anchor 检查。

Material 的主题翻译可以从当前语言回退到 English，但这只是 UI partial 的翻译合并逻辑；官方没有在该页面定义正文缺译通知或正文完整度 gate。采用 Material 的思路时，应把“每语言独立 build”与“是否允许该语言公开”分开。

**对当前项目的可迁移点：**借鉴绝对 alternate、`lang`/`hreflang` 和 same-path 切换；不要把 UI fallback 当作正文翻译状态。

### 5. Kubernetes：内容结构之外的真实发布治理

Kubernetes 的 localization guide 不是一个简单的主题配置说明，而是一套可运营的发布流程。语言内容放在 `content/<lang>/`，并保持与 English source 相同的 URL path；站点 UI 字符串单独放在 `i18n/<lang>/<lang>.toml`。新增语言还需要语言团队、标签、`OWNERS`、本地化 README 和维护分工。

它的发布门槛尤其有借鉴价值：新 localization 至少需要两位贡献者；必须完成 Home、Setup、指定 Tutorials、全部 heading/subheading URL、Releases 和站点字符串等 minimum required content；满足 workflow 和最小输出后，SIG Docs 才启用网站语言选择。官方还要求翻译基于指定 release/target version，机器生成翻译不能单独发布，必须人工审校；源文件的技术修复应先进入 English，再同步到 localization。

Kubernetes 官方页面没有规定缺失页面显示英文并保留 hash，因此不能把它当作 Starlight 式 fallback 样本。它展示的是另一种策略：未达到门槛的语言不作为完整公开入口，翻译团队可以在独立分支渐进完成。

**对当前项目的可迁移点：**借鉴“语言可注册”与“语言可发布”分离、source revision、人工 review、最小公开集合和 owner/reviewer 责任；这比单纯增加五个目录更能防止假完整。

## 三、适用于当前 Markdown + 静态 site 的小步改造

当前仓库已经有 locale-suffixed 内容的 ADR、`docs/governance/locale-matrix.yaml` 和 `scripts/validate_localization.py`。本研究不推翻它们，也不建议为了一次性换框架而重写源内容。建议把现有设计向五个一手样本的共同强项收敛，按以下顺序切片：

### Slice 0：先冻结身份，不改展示

- 继续使用一个稳定的 `content_id` 和共享 filename stem；`EN/ZH/ES/JA/KO/DE` 只是同一内容的 locale 变体。
- matrix 每行增加或确认：`path`、`source_revision`、`content_status`、`translation_status`、`reviewed_at`、`owner`、`anchor_ids`。
- 明确 public showcase 的默认 locale 是 English；书籍当前主正文仍按项目约定以简体中文为主，不能因为有六个入口就宣称整本书已六语完成。

### Slice 1：让切换器按 content identity 找页面

- 保留当前静态 site 的 `?lang=<token>` 兼容方式，先把当前页面 path 解析为 `content_id`，再从 matrix 取目标 locale 的 path。
- 切换时保留 `pathname` 对应的内容身份和当前 `hash`；如果目标页面不存在该 anchor，显示“目标语言没有此小节”并保留到目标页面顶部或提供源语言 anchor 链接，不能静默丢 hash。
- URL 中明确写出的 locale 优先于 `localStorage`/cookie；偏好只做便利，不做 canonical identity。

### Slice 2：把缺译做成可见状态

- 页面级状态至少使用 `not-started`、`in-progress`、`candidate`、`verified`、`stale`；和 `content_status` 分开。
- 缺译页允许在 migration mode fallback 到 English，但页面顶部必须显示目标 locale、状态和 English 源链接，例如“English source shown — 简体中文翻译尚未提供”。
- 语言 selector 对 `not-started` 不生成猜测 URL；显示禁用项或明确的“尚未提供”，同时仍保留可用的 English 入口。
- 只有在当前 locale 的页面真实存在且 status 允许公开时，才把它作为语言切换器的 active link。

### Slice 3：稳定 route/anchor

- 新内容的跨语言标题使用渲染器支持的显式稳定 ID；不要依赖翻译后的标题自动 slug。
- 为每个 matrix row 登记可深链的 anchor 集合，构建后逐 locale 检查 `path#anchor` 是否存在。
- 旧的 unsuffixed Markdown 链接保留兼容映射；迁移期间用 redirect 或薄 stub 指向 canonical `-EN`/locale 文件，不维护第二份正文。

### Slice 4：增加两级发布 gate

**Migration mode（允许渐进迁移）：**

- matrix 完整登记六 locale，即使某一项是 `not-started`；
- active locale 的同语种链接、页面 route、HTML `lang` 和缺译提示检查通过；
- 所有声明的 anchor 有构建后证据；
- 不能把 fallback 内容报告为 translated/verified。

**Public locale release（允许一个 locale 对外承诺）：**

- 该 locale 的目标公开集合全部存在，且 `translation_status` 至少达到项目规定的 `candidate`；
- same-locale links、anchor、标题/description、语言 selector、`hreflang`（若使用）和静态 404 均通过；
- source revision 已记录，机器翻译经过人工审校，stale 项已处理；
- 对关键路径完成浏览器/静态产物检查；
- owner/reviewer 与回滚/下线路径明确。

这允许先发布一个有证据的 English 默认体验，再以小范围页面集合逐一公开 ZH/ES/JA/KO/DE，而不是把“六 locale 已登记”当成“六语言产品已经 production-ready”。

## 四、建议纳入验收的最小实验

选一个已有 anchor 的章节或研究页，建立六个 matrix 变体（其中若干可明确标记 `not-started`），验证以下路径：

```text
EN page + #stable-anchor
        │ switch to ZH
        ▼
ZH same content_id + #stable-anchor
        │ missing translation
        ▼
visible status notice + explicit EN source link
```

验收证据应包含：

- 每个 locale 的最终 URL、`document.documentElement.lang` 和页面标题；
- 切换前后的 `content_id`、path、hash 对照；
- 一个已存在 anchor 和一个故意缺失 anchor 的结果；
- 一个 `not-started` 页的可见提示，而不是静默英文；
- migration mode 与 release mode 各运行一次 validator；
- 静态 site reload 后只凭 URL 恢复语言，不依赖浏览器本地状态。

## 五、一手来源与访问记录

以下链接均在 2026-08-10 访问。官方页面版本或内容可能变化，下一次复核应重新打开页面并记录差异。

### Docusaurus

- [Docusaurus i18n introduction][D1]：i18n 目标、翻译文件类型、`i18n/[locale]/[pluginName]/...` 目录、默认 locale 与静态部署原则。访问：2026-08-10。
- [Docusaurus i18n tutorial][D2]：`defaultLocale`、`locales`、`localeDropdown`、`/<locale>/` URL、独立 locale SPA、未翻译站点和显式 heading ID。访问：2026-08-10。
- [Docusaurus i18n using Git][D3]：`--messagePrefix`、Git 翻译目录、构建、翻译文件同步责任和 Markdown anchor 风险。访问：2026-08-10。

### VitePress

- [VitePress Internationalization][V1]：locale 目录、`locales` 配置、root locale、locale-specific UI 字符串和独立目录部署注意事项。访问：2026-08-10。
- [VitePress Routing][V2]：文件到静态 URL 的映射、build-time page paths、静态托管与 clean URL。访问：2026-08-10。
- [VitePress Markdown extensions][V3]：自动 heading anchors、显式 `{#my-anchor}`、内部链接和目录到 URL 映射。访问：2026-08-10。

### Astro Starlight

- [Starlight Internationalization][S1]：`defaultLocale`、locale 目录、同名文件关联、root locale、页面 fallback、未翻译通知和 UI translation keys。访问：2026-08-10。
- [Starlight configuration reference][S2]：`locales`、`root`、`defaultLocale`、fallback、heading links 和 locale 路由。访问：2026-08-10。
- [Starlight frontmatter reference][S3]：`draft` 不进入 production builds 的官方定义。访问：2026-08-10。

### Material for MkDocs

- [Material for MkDocs — Changing the language][M1]：单项目 canonical language、独立语言项目、`extra.alternate`、绝对 link、`lang`/`hreflang`、same-path “Stay on page”、anchor slug 注意事项。访问：2026-08-10。

### Kubernetes

- [Kubernetes — Localizing Kubernetes documentation][K1]：`content/<lang>`、同 English URL path、`i18n/<lang>/<lang>.toml`、团队/OWNERS、minimum required content、source release、人工审校和语言上线条件。访问：2026-08-10。

### 当前仓库的约定（非外部一手来源）

- [ADR-0010：locale-suffixed content][P1]：当前项目的 `content_id`、六 locale、同语种链接、显式缺译状态和 migration/release mode 目标。
- [locale matrix][P2]：当前机器可读的 locale/content 登记。
- [project validation script][P3]：当前本地化结构检查入口。

## 研究边界与状态说明

本文件是基于官方文档的研究候选稿（`candidate`），不是对五个框架全部源码、所有版本或当前仓库运行时的生产验证。Starlight 的同页 path/hash 是对官方站点一次现场观察；Material 的 same-path 是官方文档描述，未把配置示例伪装成运行截图。当前项目仍需在实现 Slice 1–4 后，分别提供静态产物、浏览器、链接/anchor 和发布 gate 证据，才能把相应能力标记为 `verified` 或 `production-ready`。

[D1]: https://docusaurus.io/docs/i18n/introduction
[D2]: https://docusaurus.io/docs/i18n/tutorial
[D3]: https://docusaurus.io/docs/i18n/git
[V1]: https://vitepress.dev/guide/i18n
[V2]: https://vitepress.dev/guide/routing
[V3]: https://vitepress.dev/guide/markdown
[S1]: https://starlight.astro.build/guides/i18n/
[S2]: https://starlight.astro.build/reference/configuration/
[S3]: https://starlight.astro.build/reference/frontmatter/
[M1]: https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/
[K1]: https://kubernetes.io/docs/contribute/localization/
[P1]: ../adr/0010-locale-suffixed-content.md
[P2]: ../governance/locale-matrix.yaml
[P3]: ../../scripts/validate_localization.py
