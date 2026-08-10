# 双语文档与持续维护模式研究

**研究日期：** 2026-08-09（America/Los_Angeles）  
**研究状态：** `candidate`  
**研究范围：** 默认语言、语言切换、URL 与持久化选择、翻译覆盖不足的提示，以及内容更新/版本维护目录。  
**方法：** 只读查阅成熟文档系统和文档项目的一手官方文档、官方仓库与贡献指南；不复制外部文案、代码或资源。

## 结论先行

对于本项目，最稳妥的方向是：

1. 公开展示页以英文作为默认入口；中文是明确可选语言。
2. 语言是可分享的页面状态，优先使用稳定的 URL 路由或 `?lang=` 参数；`localStorage` 只能作为同一入口下的个人偏好，不应成为唯一定位方式。
3. 语言切换器应放在全局导航中，显示语言的原生名称，并同步页面的 `lang`、标题、描述、可访问名称和当前页面链接。
4. 未翻译内容要显式提示，并提供英文原文入口；不能用默认语言内容悄悄冒充完整翻译。
5. 维护结构要把“当前内容”“冻结版本”“语言来源关系”“更新记录”和“验证”分开。翻译文件应能追溯到对应英文版本或源提交。
6. 现阶段不需要为这类静态展示页引入完整文档框架；应先采用这些项目验证过的边界：结构化语言字典、可分享语言状态、明确覆盖标记、固定更新登记表。

## 1. 研究边界与判断标准

“成熟”在本报告中不是泛指页面好看，而是指其官方文档或官方仓库公开了可复用的目录、配置、贡献、版本或本地化维护规则。观察分为四类：

- **事实：** 来源明确写出的行为或目录规则。
- **实现观察：** 从官方页面或仓库结构可观察到的设计选择。
- **迁移原则：** 结合本项目约束得出的建议，不代表来源项目的原文规定。
- **限制：** 来源项目的构建框架、规模和团队条件不一定适合本项目。

所有来源均按访问日期 2026-08-09 记录。产品页面、仓库状态和工具能力可能变化，后续使用前应重新打开来源核对。

## 2. 默认语言与语言切换

### 2.1 Docusaurus：默认语言、语言前缀和全局下拉选择

**来源**

- [Docusaurus Internationalization introduction](https://docusaurus.io/docs/i18n/introduction)
- [Docusaurus Internationalization tutorial](https://docusaurus.io/docs/i18n/tutorial)
- [Docusaurus configuration: i18n](https://docusaurus.io/docs/api/docusaurus-config#i18n)

**观察**

- i18n 配置显式声明 `defaultLocale` 和支持的 `locales`；locale 名称同时参与翻译文件位置和翻译站点的基础 URL。
- 构建所有语言时，默认语言的基础 URL 可以省略语言名，其他语言使用语言前缀。这使默认入口短，同时让其他语言地址可定位、可分享。
- 官方主题提供 `localeDropdown` 导航项作为语言选择入口，并使用 locale 配置推导或覆盖 HTML `lang`、标签和其他语言相关默认值。
- 官方教程明确展示了“新增一个 locale 但还没有提供翻译”的状态：页面可以运行，但内容大部分仍未翻译；通用主题标签可能有默认翻译。
- 每个 locale 是独立的单页应用，不能把“开发服务器同时预览所有 locale”当作默认行为。

**可迁移原则**

- 将默认语言、可用语言和语言代码集中登记，不把语言判断散落在页面事件处理器中。
- 语言切换器属于全局导航，不应只出现在首页或页脚。
- 默认语言可以拥有最短入口，但非默认语言必须有稳定且可复制的地址。
- “界面翻译完成”与“正文翻译完成”分开标记；系统标签有翻译不代表书籍正文已覆盖。

**限制**

本项目当前是静态 HTML，不需要复制 Docusaurus 的独立应用构建方式。这里只借鉴语言状态、目录边界和未翻译状态的诚实表达。

### 2.2 VitePress：locale 目录与 cookie 持久化的边界

**来源**

- [VitePress Internationalization](https://vitepress.dev/guide/i18n)
- [VitePress official repository i18n guide](https://github.com/vuejs/vitepress/blob/main/docs/en/guide/i18n.md)

**观察**

- 官方推荐按语言组织目录，例如根目录和 `fr/`、`es/` 等语言目录；每种语言可以拥有自己的 `lang`、标题、描述、导航和主题配置。
- VitePress 不会自动把根路径重定向到某个语言目录；如果采用每语言独立目录，服务端重定向规则需要由站点部署环境提供。
- 官方示例把 cookie 作为语言选择持久化手段，但示例场景与 Netlify 的语言重定向结合；这不是说所有站点都必须使用 cookie。
- locale 配置可以覆盖 Markdown 渲染器的界面字符串，未设置的值回退到根级配置。

**可迁移原则**

- 将“URL 决定当前页面语言”和“浏览器记住上次选择”分开：URL 负责可复现，持久化偏好负责下次访问体验。
- 如果本项目继续使用单个静态入口，`?lang=en|zh` 是比模拟多套目录更轻量的过渡；以后正文规模变大，再迁移为 `/en/` 与 `/zh/` 目录。
- URL 或参数不合法时回退到默认英文，并保留可见的语言选择器。

**限制**

VitePress 的 cookie 示例依赖部署平台的重定向能力。当前项目不应为了模仿它而添加服务端依赖，也不应把 cookie 或 `localStorage` 当成唯一语言来源。

### 2.3 Astro Starlight：fallback 与未翻译提示

**来源**

- [Starlight Internationalization guide](https://starlight.astro.build/guides/i18n/)
- [Starlight configuration reference](https://starlight.astro.build/reference/configuration/)
- [Starlight official repository](https://github.com/withastro/starlight)

**观察**

- Starlight 将多语言支持作为一组完整能力：路由、fallback 内容和 RTL 支持一起考虑。
- `defaultLocale` 同时影响 fallback 内容和 UI labels；官方建议选择最可能首先编写或已经拥有内容的语言作为默认语言。
- 不同语言的页面按相同文件名关联，例如不同语言目录中的同名页面。官方说明这会启用 fallback 内容和翻译提示。
- 官方内置 UI 字符串包含明确的“此内容暂不可用”的未翻译状态，而不是让读者误认为当前页面已经翻译。
- 可使用 root locale 让默认语言不带语言前缀，例如默认英文使用 `/about`，其他语言使用带前缀的路径。

**可迁移原则**

- 语言覆盖是一种页面级状态，至少需要 `translated`、`partial`、`fallback`、`draft` 这类可检查状态。
- 当中文正文还未完整翻译时，页面应显示中文覆盖范围说明，并给出英文原文或同一主题的英文入口。
- 页面关联应依赖稳定的内容 ID/slug，而不是依赖标题翻译；标题可以不同，关联键不能漂移。
- 默认语言选择应服从内容真实成熟度，而不是只看 UI 翻译完成度；本项目可以让展示页英文默认，同时明确书籍正文当前以中文为主。

**限制**

Starlight 的 fallback 是构建系统能力。当前项目的静态页面需要自己实现同样的可见状态，不应宣称已经具有框架级 fallback。

### 2.4 Read the Docs：从第一天为多语言保留 URL 空间

**来源**

- [Read the Docs: Localization and Internationalization](https://docs.readthedocs.com/platform/stable/localization.html)
- [Read the Docs: URL versioning schemes](https://docs.readthedocs.com/platform/stable/versioning-schemes.html)

**观察**

- Read the Docs 文档说明其默认假设项目未来可能变成多语言，因此初始英文站点通常从 `/en/latest/` 开始；语言段从第一天就存在，为第二种语言预留稳定 URL 空间。
- 对只有一种语言的项目，也要求明确项目语言，而不是让系统或读者猜测。
- 其页面把“语言”和“版本”视为两个独立的路由维度；这避免把语言切换和版本切换混成一个选择器。

**可迁移原则**

- 未来很可能扩展正文语言时，早期就应决定 URL 预留策略。若当前只做单页展示，可以用 query 参数先保持兼容，但应让参数语义与未来 `/en/`、`/zh/` 一致。
- 语言和内容版本分别记录，切换语言不应无意中切换到另一版本。
- 页面的默认语言要在 HTML、元数据和项目说明中一致表达。

**限制**

Read the Docs 的 `/en/latest/` 设计服务于文档托管、版本和多站点路由。它不意味着本项目现在必须改成同样的 URL 层级。

## 3. URL、localStorage 与可访问性

### 3.1 证据归纳

本轮一手来源中，VitePress 官方直接展示了 cookie 持久化示例；Docusaurus、VitePress、Starlight 和 Read the Docs 都把 locale 放进配置、目录或 URL 结构。它们共同支持一个更稳妥的分工：

| 层 | 责任 | 推荐实现 |
|---|---|---|
| URL | 表示当前页面语言，便于分享、刷新、爬虫和复现 | 当前静态页使用 `?lang=en` / `?lang=zh`；未来正文拆分后可使用语言目录 |
| 页面状态 | 立即切换可见文本和语义属性 | 结构化翻译字典 + 单一渲染入口 |
| `localStorage` | 记住用户在同一浏览器的下次偏好 | 仅保存 `en` 或 `zh`，且只接受白名单值 |
| 默认回退 | 处理没有参数、非法参数、隐私模式或存储不可用 | 英文默认；任何存储错误都不影响英文渲染 |
| HTML 语义 | 让浏览器、读屏器和搜索引擎知道当前语言 | 同步 `<html lang>`, title, description, aria-label 和语言按钮状态 |

**可迁移原则**

- 解析优先级应固定并写入维护文档：合法 URL 参数 > 合法已保存偏好 > 英文默认。这样同一链接不会被旧的本地偏好悄悄改写。
- `localStorage` 不是来源真相，也不能用于生成可分享的语言链接。
- 切换语言后更新 URL（保留 hash/锚点），并使用 `history.replaceState` 或明确的链接行为，避免一次点击制造大量无意义历史记录。
- 不使用浏览器自动语言作为隐式替代默认语言，除非项目同时准备好翻译覆盖和可解释的回退策略。
- 语言按钮要有明确的当前状态、可键盘操作和可读的 aria-label；切换后不应只改变视觉文字。

## 4. 翻译覆盖不足如何诚实处理

### 4.1 共同模式

- Docusaurus 官方教程直接承认新 locale 在尚未提供翻译时会“大部分未翻译”，并区分通用主题标签的默认翻译。
- Starlight 提供独立的 untranslated-content UI 字符串，并把同名文件关联到 fallback/translation notice 机制。
- Kubernetes 要求新语言达到最低内容集合才公开启用，并明确机器翻译不能单独作为发布质量保证，必须人工审校。
- MDN translated-content 只接受有活跃社区维护团队的 locale；翻译文件通过 `l10n.sourceCommit` 记录对应英文源提交，用来判断同步关系。
- Kubernetes 还建议把英文源内容问题先修正，再同步更新本地化版本；一个 PR 尽量只改一个 locale，降低审查复杂度。

### 4.2 对本项目的最低规则

每个中文页面或内容单元至少应有：

```yaml
id: stable-content-id
source_locale: en
translation_locale: zh
coverage: translated | partial | fallback | unavailable
source_revision: commit-or-content-version
review_status: draft | candidate | verified
last_reviewed: YYYY-MM-DD
next_review: YYYY-MM-DD
```

展示层应根据 `coverage` 做可见处理：

- `translated`：正常显示中文内容。
- `partial`：显示“本页部分内容已翻译”，并标出缺失区块。
- `fallback`：显示英文原文，同时说明中文版本尚未完成。
- `unavailable`：不伪造中文页面，提供英文入口和翻译待办入口。

这套状态只描述语言覆盖，不替代项目内容成熟度状态；`draft`、`candidate`、`verified` 仍按项目自己的质量定义使用。

## 5. 内容更新与版本维护目录

### 5.1 Docusaurus：冻结版本与当前版本分离

**来源**

- [Docusaurus Versioning](https://docusaurus.io/docs/versioning)
- [Docusaurus Git guide](https://docusaurus.io/docs/guides/using-git)

**观察**

- 当前内容、已冻结的 `versioned_docs/`、版本清单 `versions.json` 和版本侧边栏是分开的；每个版本目录映射到稳定 URL。
- 官方明确区分 current version 与 latest version：文件系统中的当前目录和导航默认打开的版本可以不是同一个版本。
- 官方提醒版本化会增加构建时间和代码库复杂度；文档变化不快时不应为了“看起来专业”而引入版本系统。
- 已冻结版本可以独立更新，更新一个版本目录不会改变其他版本；删除版本需要同时更新清单、文档目录和侧边栏文件。

**可迁移原则**

- 本项目先维护一个 `current` 内容主线，并用更新记录保留历史，而不是马上复制整本书。
- 只有当外部产品事实、课程结构或公开链接需要长期冻结时，才创建明确版本快照。
- “当前候选内容”与“对外稳定版本”必须有不同状态和目录，不能只靠 README 上的一句话区分。

### 5.2 Kubernetes：按语言隔离、按源版本同步、按团队维护

**来源**

- [Kubernetes: Localizing documentation](https://kubernetes.io/docs/contribute/localization/)
- [Kubernetes website repository](https://github.com/kubernetes/website)

**观察**

- 每种语言有独立的 `content/<lang>` 和 `i18n/<lang>` 目录，并可有语言专属 README、OWNERS、标签和审查团队。
- 新本地化要先完成最低内容集合，达到工作流和最低输出后才在网站启用语言选择。
- 源文件基于特定 release branch 或 `main`；本地化团队按目标版本工作，并通过分支策略、里程碑和上游差异脚本持续同步。
- 官方建议每个本地化 PR 尽量只改一个语言，维护者在 milestone 开始时比较上游变化，定位过期文件。
- 语言指南可以记录 sprint 节奏、release、PR 流程、术语表和 Markdown 规范。

**可迁移原则**

- 为本项目建立 `docs/i18n/` 或等价的语言维护目录，至少放语言政策、术语表、覆盖登记和翻译更新记录。
- 把每次中文更新绑定到英文源文件的提交、版本或内容指纹，而不是只写“已同步”。
- 语言覆盖不足时，不打开一个空的中文入口；先满足项目定义的最低可用集合，并设置明显的状态。
- 如果团队增长，语言审查责任、标签和文件边界应能独立于内容作者运作。

### 5.3 MDN：源提交追踪与活跃 locale

**来源**

- [MDN translated-content README](https://github.com/mdn/translated-content/blob/main/README.md)
- [MDN translated-content CONTRIBUTING](https://github.com/mdn/translated-content/blob/main/CONTRIBUTING.md)
- [MDN content repository](https://github.com/mdn/content)

**观察**

- MDN 只接受有活跃社区维护团队的 locale，并用 locale 标签和 issue 列表分派任务。
- 新翻译从英文源文件复制结构，但 front matter 会记录 `l10n.sourceCommit`，指向产生该翻译的英文源提交。
- 更新翻译时，维护者通过 source commit 判断英文内容是否发生变化；官方贡献指南将新翻译和现有翻译更新拆成不同流程。
- MDN 把上游英文内容和翻译内容放在可关联但独立的仓库/目录边界中，避免把翻译变成无法追踪的手工副本。

**可迁移原则**

- 每个翻译单元必须记录源版本、翻译版本、审查者和下一次复核日期。
- 内容更新应先判断“英文源变了什么”，再决定中文是同步、部分重译、标记过期还是暂缓发布。
- 语言维护入口要有明确的任务列表，而不是只在页面底部留下一个泛化反馈邮箱。

## 6. 推荐的当前项目目录与更新登记

以下是从上述项目抽象出的轻量结构，不是复制任何一个项目的目录：

```text
docs/
├─ governance/
│  ├─ content-lifecycle.md        # 定位 → 分级 → 取证 → 修改 → 验证 → 复核 → 发布 → 回滚
│  ├─ language-policy.md          # 默认英文、中文入口、覆盖状态、术语规则
│  └─ update-map.md               # “要改什么，就去哪里”的固定导航
├─ i18n/
│  ├─ README.md                   # 语言维护入口与最低发布门槛
│  ├─ glossary.md                 # GPT/Codex/Skill/Agent 等术语
│  ├─ coverage.yaml               # 每个内容单元的翻译覆盖与源版本
│  └─ updates/
│     └─ 2026-08-09.md            # 翻译同步与审查记录
├─ sources/
│  └─ volatile-facts.yaml         # 事实来源、访问日期、owner、next_review
├─ research/
│  └─ ...
└─ quality/
   ├─ review-*.md
   └─ checklists/

book/
├─ chapters/                      # current 内容主线
├─ labs/
└─ versions/                      # 仅在需要冻结对外内容时建立
   └─ v0.1/

site/
├─ index.html                     # 展示页入口与 i18n 文本键
├─ app.js                         # 语言状态、筛选和轻交互
└─ styles.css

update-registry.yaml              # 机器可读的更新区域登记
```

每个更新区域至少记录：

```yaml
area: chapters | labs | skills | evals | sources | site | release
canonical_paths: []
owner: role-or-handle
triggers: []
required_inputs: []
validation_commands: []
status_fields: []
next_review: YYYY-MM-DD
```

## 7. 适合本项目的更新流程

```text
定位变更
  → 判断它是稳定原则、易变事实、正文、实验、Skill、展示页还是发布资产
  → 找到固定 canonical path 与来源记录
  → 更新英文主线或英文 UI
  → 记录中文覆盖和 source revision
  → 运行结构、链接、内容、Skill 与页面验证
  → 独立复核翻译准确性、未翻译提示和 URL 状态
  → 标记 draft / candidate / verified / production-ready
  → 需要时生成版本快照
  → 发布并保留可回滚记录
```

关键门槛：

- 新增英文正文不自动等于中文已同步。
- 页面构建成功不自动等于语言覆盖完整。
- 语言切换可以是 `verified`，而书籍正文仍可能是 `draft` 或 `candidate`。
- 版本快照只冻结内容，不冻结外部产品事实；易变事实仍需按来源台账复核。

## 8. 对当前页面实现的具体建议

这些是研究后的设计建议，不代表本文件已经修改页面：

1. 初始 HTML 直接提供完整英文文本，保证无 JavaScript 时也有可读入口。
2. 在全局导航提供 `EN` 与 `中文`，按钮带当前状态和可访问名称。
3. 语言解析顺序固定为：合法 `?lang=` > 合法 `localStorage` 偏好 > 英文默认。
4. 切换时同步 `<html lang>`、`<title>`、description、导航、按钮、卡片、aria-label 和 URL；保留当前锚点。
5. 在展示页明确声明：界面支持英文/中文切换，但书籍正文当前中文覆盖范围有限，未翻译部分提供英文入口或状态提示。
6. 翻译字典使用稳定键，避免以中文/英文可见文本作为键；增加覆盖检查，确保每个公开键在两种语言都有值，例外项必须显式登记。
7. 将语言切换、路线筛选、等级筛选和菜单交互分开验收；一个交互通过不代表整个页面已验证。

## 9. 研究限制

- 本轮主要研究官方文档系统和官方仓库，观察的是公开规则与结构，不是对所有用户体验的统计。
- 这些项目规模大、可能有构建服务或维护团队；当前静态 HTML 只应迁移原则，不应直接照搬构建复杂度。
- 本轮没有测量浏览器 `localStorage`、cookie 或重定向在本项目中的实际行为；实现后仍需浏览器验收。
- 本轮没有把机器翻译质量视为证据；任何中文正文发布仍需要术语审查、事实核对和内容验收。
- 来源页在未来可能改版。易变观察必须保留访问日期，并在下次更新时重新核对。

## 10. 来源清单

以下均为本轮访问的一手来源，访问日期均为 **2026-08-09**：

1. Docusaurus — [Internationalization introduction](https://docusaurus.io/docs/i18n/introduction)
2. Docusaurus — [Internationalization tutorial](https://docusaurus.io/docs/i18n/tutorial)
3. Docusaurus — [Configuration: i18n](https://docusaurus.io/docs/api/docusaurus-config#i18n)
4. Docusaurus — [Versioning](https://docusaurus.io/docs/versioning)
5. Docusaurus — [Using Git](https://docusaurus.io/docs/guides/using-git)
6. VitePress — [Internationalization](https://vitepress.dev/guide/i18n)
7. VitePress — [Official repository i18n guide](https://github.com/vuejs/vitepress/blob/main/docs/en/guide/i18n.md)
8. Astro Starlight — [Internationalization guide](https://starlight.astro.build/guides/i18n/)
9. Astro Starlight — [Configuration reference](https://starlight.astro.build/reference/configuration/)
10. Read the Docs — [Localization and Internationalization](https://docs.readthedocs.com/platform/stable/localization.html)
11. Read the Docs — [URL versioning schemes](https://docs.readthedocs.com/platform/stable/versioning-schemes.html)
12. Kubernetes — [Localizing documentation](https://kubernetes.io/docs/contribute/localization/)
13. Kubernetes — [Official website repository](https://github.com/kubernetes/website)
14. MDN — [translated-content README](https://github.com/mdn/translated-content/blob/main/README.md)
15. MDN — [translated-content CONTRIBUTING](https://github.com/mdn/translated-content/blob/main/CONTRIBUTING.md)
16. MDN — [content repository](https://github.com/mdn/content)
17. GitHub Docs — [Official repository README](https://github.com/github/docs)

## 11. 研究完成检查

- [x] 只读查阅官方文档/仓库
- [x] 记录来源 URL 与访问日期
- [x] 覆盖默认语言、切换位置、URL、持久化、覆盖不足提示
- [x] 覆盖内容更新、版本目录、源版本追踪和维护责任
- [x] 未复制外部文案、代码、图片或 Skill 指令
- [x] 未修改页面实现或其他文件
- [ ] 将这些原则落地到页面与更新框架（后续独立任务）
