# 多语言文档的路由与内容身份研究

**研究日期：** 2026-08-11（America/Los_Angeles）
**研究状态：** `candidate` / `reference-only`
**审计范围：** 当前仓库的多语言文件身份、公共站点语言状态、语言切换、缺译回退、目录/侧栏、上一页/下一页和可验证性。
**研究对象：** Astro Starlight、Docusaurus、VitePress、mdBook、Rust Book、Kubernetes documentation，以及当前仓库的治理文件、脚本和站点实现。
**方法：** 优先查阅项目官方文档、官方仓库和固定 revision 的源码；本报告不复制外部项目的正文、代码、图片、字体、图标或品牌表达。
**只读边界：** 本轮只审计和新增本报告文件，没有修改当前仓库的代码、内容、治理配置或导航文件。工作树中原有的并发修改不属于本报告的变更。

## 结论先行

当前仓库的 `-EN/-ZH/-ES/-JA/-KO/-DE` 后缀策略有价值，但它只是“文件身份规则”，还不是完整的多语言文档系统。要让读者从第一章切到第二章、切换语言后仍在同一语言阅读，至少要同时解决四层问题：

1. **文件身份：** 一个稳定的 `content_id` 对应同一篇内容的六种语言文件；语言是属性，不是新的内容身份。
2. **URL 身份：** 默认 English 使用根路径，其他语言使用稳定的 locale 路径，例如 `/zh/...`、`/es/...`；URL 必须可以直接打开、分享和刷新。
3. **导航身份：** 目录、侧栏、上一页/下一页都从同一个按 `content_id` 排序的导航源生成，再根据当前 locale 解析目标文件。
4. **翻译状态：** 缺少翻译时必须显示 `requested_locale` 与 `effective_locale`，并给出明确的 fallback 提示；不能把英文页面静默伪装成中文、日文或其他语言。

对本项目最容易落地、又保留现有后缀要求的方案是混合架构：

```text
仓库文件身份：book/chapters/02-first-safe-task-EN.md
                book/chapters/02-first-safe-task-ZH.md

公共路由：      /chapters/02-first-safe-task        -> EN
                /zh/chapters/02-first-safe-task     -> ZH
                /es/chapters/02-first-safe-task     -> ES
                /ja/chapters/02-first-safe-task     -> JA
                /ko/chapters/02-first-safe-task     -> KO
                /de/chapters/02-first-safe-task     -> DE
```

文件名后缀让 GitHub、下载压缩包、编辑器和代码审查者能看出语言；URL locale 让网站运行时、搜索引擎和读者能看出当前页面语言。二者由 locale matrix 关联，但不必把 `-EN` 直接暴露在公共 URL 中。

当前仓库仍然是迁移候选状态，不是六语言发布状态：矩阵的 `mode` 是 `migration`，非英文内容存在缺口；公共站点运行时只接受 `en` 和 `zh`；书籍导航生成器也只验证 `EN` 与 legacy `ZH`。因此“六种后缀已登记”不能被表述成“全站已经支持六种语言”。

## 1. 术语与判定边界

### 1.1 `content_id`：内容身份

`content_id` 表示学习对象本身，例如 `chapter-02-first-safe-task`。英文、简体中文、日文版本仍然是同一章，而不是三章。标题、正文、例子和图片说明可以因语言而变，但以下关系必须稳定：

- 学习对象的身份；
- 在课程中的顺序和所属部分；
- 英文源版本与翻译来源版本；
- 该章对应的实验、Skill、验证任务和相邻章节。

如果语言切换后 `content_id` 发生变化，读者可能看似留在同一个页面，实际却跳到了另一篇内容。这是内容关联错误，不只是链接样式问题。

### 1.2 `locale`：语言与地区标识

本项目目前登记六个 locale：

| 项目标识 | 文件后缀 | URL token | HTML `lang` | 公开名称 |
|---|---|---|---|---|
| `EN` | `-EN` | `en` | `en` | English |
| `ZH` | `-ZH` | `zh` | `zh-CN` | 简体中文 |
| `ES` | `-ES` | `es` | `es` | Español |
| `JA` | `-JA` | `ja` | `ja` | 日本語 |
| `KO` | `-KO` | `ko` | `ko` | 한국어 |
| `DE` | `-DE` | `de` | `de` | Deutsch |

这里必须把三个概念分开：

- **默认语言：** 没有显式 locale 时采用 English；
- **默认 URL：** English 是否省略 `/en/` 前缀；
- **页面实际语言：** 当前可见正文与 `<html lang>` 的语言。

三者通常相关，但不是同一个字段。缺译 fallback 时，`requested_locale` 可能是 `zh`，而 `effective_locale` 是 `en`；此时页面不能把自己标成完整的中文页面。

### 1.3 同语言链接与跨语言链接

普通正文、目录、侧栏、上一页、下一页和实验链接都应留在当前 locale：

```text
chapter-01-EN.md -> chapter-02-EN.md
chapter-01-ZH.md -> chapter-02-ZH.md
```

语言切换器是唯一允许跨 locale 的普通内部导航。切换器必须根据当前页面的 `content_id` 解析目标语言，而不是简单替换字符串或回到语言首页。

## 2. 成熟项目比较

| 项目 | 默认语言与 URL | 内容身份/语言切换 | 缺译处理 | 目录与上一页/下一页 | 本轮记录的许可证边界 |
|---|---|---|---|---|---|
| Starlight | `defaultLocale`；可让 root locale 不带前缀 | 同 slug 的 locale 页面关联；语言选择器按当前 URL 计算目标页 | 有 fallback 内容与未翻译提示 | sidebar 是当前 locale 的导航来源 | MIT；图片、字体和第三方资产仍需单独核对 |
| Docusaurus | `defaultLocale`；默认 locale 通常不带前缀，其他 locale 使用 `/<locale>/` | locale dropdown 使用 alternate-page 关系保留当前页面 | 新 locale 可以先存在但正文未翻译；未翻译不等于已完成 | sidebar、分页和主题标签按 locale 构建 | MIT；具体内容和依赖资产需按文件核对 |
| VitePress | `locales.root` 可作为默认 English；其他语言通常以目录/路径区分 | 同文件名的 locale 目录配对；每种语言可有独立配置 | 未设置的 UI 字符串可从 root 配置回退；正文回退需部署/内容策略 | sidebar 可按路径配置；prev/next 可由 sidebar 推导 | MIT；仓库内第三方内容另行核对 |
| mdBook | 以一本书和一个 `SUMMARY.md` 为核心 | 基础模型不是完整的内置多语言路由系统 | 需要外部构建或站点方案 | `SUMMARY.md` 是顺序、层级和相邻导航的权威源 | MPL-2.0；贡献内容和第三方资产仍需按文件核对 |
| Rust Book | 采用 mdBook 构建；历史上把多语言支持视为 mdBook/外部站点问题 | 多语言不是单靠书内 Markdown 文件名解决 | 由翻译站点/构建策略负责 | `SUMMARY.md` 维护连续阅读路线 | Apache-2.0 许可证文件已核对；不能推断所有资产同一授权 |
| Kubernetes website | `defaultContentLanguage = "en"`；英文默认不带语言目录 | 语言拥有独立内容目录、字符串和维护边界 | `language_alternatives` 和最低内容集合使缺译可见 | 按语言生成页面与导航；翻译同步到英文源版本 | 文档内容 CC BY 4.0；代码、图片、字体和依赖可能另有许可证 |

上表只概括官方事实。下面分别说明哪些是来源明确写出的行为，哪些是对本仓库的迁移推断。

## 3. 官方项目的实际做法

### 3.1 Astro Starlight：同 slug 关联、fallback 和当前页面语言切换

#### 来源事实

- Starlight 的 i18n 配置有默认 locale、locale 映射和 locale 目录；默认语言可以使用 root locale，因此公共 URL 不必带 `/en/`。
- 不同语言目录中的同名页面可以被关联。关联键是路径/slug，而不是翻译后的标题。
- 当目标语言没有对应翻译时，Starlight 可以回退到默认语言内容，并显示未翻译提示；这把“页面可访问”和“页面已经翻译”区分开。
- 页面可以读取当前 locale；官方工具提供相对 locale URL 的计算能力。
- 官方 `LanguageSelect.astro` 使用当前 `Astro.url` 计算本页对应语言 URL，而不是把所有语言切换都送回首页。

#### 对本项目的推断

本项目应该借鉴它的三层分工：

1. `content_id`/稳定 slug 负责跨语言关联；
2. route manifest 负责把当前路径映射到目标 locale；
3. fallback 页面必须有可见状态，而不是依靠读者猜测。

Starlight 的 fallback 是构建系统能力。本项目当前是静态 Markdown、HTML 和脚本组合，不能因为矩阵里写了 `in-progress` 就声称已经具备同样的运行时 fallback。需要自己实现 route manifest、页面状态和验证器。

### 3.2 Docusaurus：默认 locale 不带前缀，其他 locale 带前缀

#### 来源事实

- Docusaurus 的 i18n 配置显式声明 `defaultLocale` 和支持的 `locales`。
- 多语言构建通常让默认语言使用较短的根路径；其他语言使用 `/<locale>/` 前缀。这样根 URL 仍然是默认语言，同时其他语言地址可分享、可爬取、可直接加载。
- 官方主题提供 locale dropdown。源码中的 alternate-page utility 根据当前页面寻找其他 locale 的对应页面，而不是只切换一个全局语言变量。
- 每个 locale 有自己的构建输出和主题/侧栏翻译上下文。页面主体、分页标签、侧栏标题和主题 UI 是不同的翻译面。
- 官方教程允许先建立一个没有完整正文翻译的 locale；这说明“站点能构建”与“正文已翻译”是两个状态。

#### 对本项目的推断

Docusaurus 的 URL 规则非常适合本项目的目标，但不需要复制它完整的构建复杂度：

- 根路径 `/` 作为 English canonical route；
- `/zh/`、`/es/`、`/ja/`、`/ko/`、`/de/` 作为其他语言的可分享路径；
- 语言选择器从当前 `content_id` 找对应页面；
- 侧栏和分页使用当前 locale 的标题与目标，不把站点 UI 翻译误认为正文翻译。

如果部署环境暂时只能承载现有 `?lang=`，可以先把 `?lang=zh` 当兼容别名；但最终只能保留一种 canonical URL 方案，不能让 `?lang=zh` 和 `/zh/` 长期各自被搜索引擎当作独立页面。

### 3.3 VitePress：locale 目录、独立配置和部署层重定向

#### 来源事实

- VitePress 的 i18n 文档使用 `locales.root` 描述默认 locale，并允许为不同语言分别配置 `label`、`lang`、导航和主题文本。
- 一个常见组织方式是让不同 locale 目录中使用相同的文件名；目录本身承载语言身份，文件名承载页面身份。
- VitePress 不会自动替部署环境把根路径重定向到 `/en/` 或其他语言目录。若需要重定向，必须由部署层配置。
- cookie 可以保存语言偏好，但它是偏好持久化方案，不替代可分享 URL。
- UI 字符串可以从 root locale 回退；这不等于 Markdown 正文自动获得了完整翻译。

#### 对本项目的推断

VitePress 证明了“每语言独立配置”很有用，但本项目不必马上把所有 Markdown 移入六个目录。当前用户已经选择清晰可见的 `-EN` 等文件后缀，因此更适合：

- 继续用后缀表达 Git 仓库中的文件身份；
- 用矩阵生成 VitePress/静态站点所需要的 route、sidebar 和 locale 配置；
- 把 `localStorage` 或 cookie 限定为偏好记忆；
- 让显式 URL locale 优先于本地偏好，避免同一个链接因浏览器旧状态而显示另一语言。

### 3.4 mdBook：`SUMMARY.md` 是阅读顺序的权威源

#### 来源事实

- mdBook 的 `SUMMARY.md` 定义书中包含哪些章节、章节顺序、层级和源文件路径。
- HTML renderer 根据这条有序书籍序列生成目录和相邻页面导航。第一章只有 next，中间章节有 previous/next，最后一章只有 previous，这不是文件名排序的偶然结果。
- mdBook 的基础模型是一次构建一本书；`SUMMARY.md` 本身不是一个完整的六语言 URL、翻译状态和跨语言 fallback 系统。

#### 对本项目的推断

本项目已有 `docs/governance/book-navigation.yaml`，它的职责方向是正确的：章节顺序应是编辑数据，而不是由 `Get-ChildItem` 或文件名枚举决定。下一步应把它从“EN + legacy ZH 的双路线生成器”升级为：

```text
canonical chapter order (content_id)
        ├─ current-locale table of contents
        ├─ current-locale sidebar
        ├─ current-locale previous/next
        └─ language switcher targets
```

每一条路线都从同一个章节序列出发，只在最后一步根据 locale 解析路径和标题。这样第一章、最后一章、跨 Part 边界和缺译页面都有一致行为。

### 3.5 Rust Book：书籍构建与多语言站点是两个问题

#### 来源事实

- Rust Book 的官方仓库以 mdBook 为构建基础，README 和 `SUMMARY.md` 将书籍内容、构建方式和章节顺序分开管理。
- 固定 revision 的 README 将多语言支持视为 mdBook/外部构建能力的限制或待解决问题，而不是仅通过在仓库里复制 Markdown 文件就自动完成。

这是一条历史事实，不能被解释成“Rust Book 今天一定没有多语言支持”。它只能说明：单书构建器的导航能力与完整多语言站点能力不是同一层。

#### 对本项目的推断

本项目要同时支持 GitHub 直接阅读和公共站点路由，不能只增加 `-ZH` 文件就期待网站自动拥有语言切换。需要一个独立的内容身份层和路由生成层；mdBook 式的章节顺序可以作为其中一部分，但不能替代 locale matrix。

### 3.6 Kubernetes：语言是独立维护边界，缺译必须有政策

#### 来源事实

- Kubernetes website 明确设定英文默认内容语言；英文是无语言前缀的默认路线。
- 各语言有独立的内容目录和本地化字符串/维护文件，翻译内容按英文源的路径结构组织。
- 官方本地化指南要求新语言达到最低内容集合、拥有独立审查责任和持续维护能力后再公开启用。
- 语言替代配置用于把未翻译内容的可用英文页面关联起来；这不是把英文内容冒充成目标语言。
- 本地化维护需要跟踪英文源版本、审核和过期状态。机器翻译本身不能作为充分的发布证据。

#### 对本项目的推断

Kubernetes 的重点不是“把所有语言一次性补齐”，而是把语言当作可维护的产品边界：

- 语言矩阵记录 source revision、coverage、reviewer 和 review date；
- 每种语言有最低公开范围；
- 未达到范围时仍可以在迁移模式登记，但不能在 release 模式宣称完成；
- 一个语言的翻译更新应能单独审查、单独回滚。

这与当前项目的 `migration`/`release` 双模式方向一致，但当前运行时和导航尚未覆盖六语言。

## 4. 当前仓库只读审计

### 4.1 矩阵已经有目标语言集合，但仍在迁移模式

证据：[`docs/governance/locale-matrix.yaml`](../governance/locale-matrix.yaml)。当前记录包括：

- `mode: migration`；
- `default_locale: EN`；
- `EN/ZH/ES/JA/KO/DE` 六个 locale、文件后缀、URL token 和 HTML `lang`；
- 17 个 reader-facing `content_id`；
- EN 有 17 个实际路径；
- ZH、ES、JA、KO、DE 各有 8 个实际路径，另有 9 个矩阵条目处于缺失或未完成状态；
- 旧的无后缀路径在 `legacy_paths` 中登记；
- `docs/`、`scripts/`、`site/`、ADR 和治理内容被视为 locale-neutral 或治理层内容，而不是六份读者正文。

这说明项目已经有“稳定身份 + 翻译状态”的设计基础。它没有证明翻译质量、浏览器运行时或六语言连续阅读已经完成。

### 4.2 后缀文件实际分布与矩阵不是同一件事

在本次 checkout 的 `book/chapters` 与 `book/labs` 中，按文件名后缀统计为：

| 文件类别 | EN | ZH | ES | JA | KO | DE | 无后缀 |
|---|---:|---:|---:|---:|---:|---:|---:|
| `book/chapters` | 9 | 2 | 2 | 2 | 2 | 2 | 23 |
| `book/labs` | 4 | 2 | 2 | 2 | 2 | 2 | 14 |
| 合计 | 13 | 4 | 4 | 4 | 4 | 4 | 37 |

这组统计与矩阵的 17 个 identity 不是同一个统计口径：矩阵可以登记缺失项，目录统计只看到当前存在的文件；无后缀文件仍然存在于迁移窗口。迁移时不能把一份旧中文文件仅因为它曾经是默认文件，就直接重命名为 `-EN`。

### 4.3 公共站点运行时仍是 EN/ZH 两语言

证据：


- [`scripts/validate_content_status.py`](../../scripts/validate_content_status.py) 将 `RUNTIME_LOCALES` 定义为 `['en', 'zh']`，同时把仓库内容集合登记为六语言。
- [`site/app.js`](../../site/app.js) 从 `?lang=` 或 `localStorage` 读取语言，但白名单仍是 `en` 与 `zh`；语言按钮也只在二者之间切换。
- [`site/content-catalog.json`](../../site/content-catalog.json) 的章节名称只有 `en` 和 `zh` 字段。
- [`scripts/validate_site_i18n.py`](../../scripts/validate_site_i18n.py) 当前验证的是 HTML 字典的 English/Chinese 覆盖，并不能验证 ES/JA/KO/DE。

因此现在的准确表述应是：**公共 showcase UI 已有 EN/ZH 运行时切换，仓库正在登记六语言内容迁移；六语言公共站点路由尚未实现。**

### 4.4 书籍导航仍然只有 EN 与 legacy ZH 路线

证据：

- [`docs/governance/book-navigation.yaml`](../governance/book-navigation.yaml) 记录 `default_locale: EN` 和 `legacy_locale: ZH`。
- 章节条目有 `english_path` 与 `legacy_path`，没有六语言的统一 locale path 映射。
- [`scripts/build_book_navigation.py`](../../scripts/build_book_navigation.py) 根据 EN 或 legacy source 生成 footer；缺少英文时使用迁移中的旧源路径。
- [`scripts/validate_book_navigation.py`](../../scripts/validate_book_navigation.py) 的通过输出是 `BOOK_NAVIGATION_OK chapters=22 locales=EN,ZH`。

这个实现已经能表达“第一章只有下一章、中间章有前后章、最后章只有上一章”，但还不能保证 `ZH -> ZH`、`JA -> JA` 等六语言路线，因为后五种语言没有进入导航解析过程。

### 4.5 当前验证器能证明什么，不能证明什么

当前验证器的边界可以概括为：

| 检查 | 当前能证明 | 当前不能证明 |
|---|---|---|
| `validate_localization.py` migration | 矩阵结构、允许的后缀、登记路径、README 切换块和部分同语言链接规则 | 翻译质量、公共 URL、真实浏览器切换、六语言站点运行时 |
| `validate_localization.py --release` | 缺失文件和未完成翻译会阻止 release | 不能把强行改成 release 变成真实翻译 |
| `validate_content_status.py` | 仓库语言集合与当前站点语言状态不互相矛盾 | 不能提供 ES/JA/KO/DE 的运行时实现 |
| `validate_site_i18n.py` | HTML 中英文 UI key 的字典覆盖 | 不能验证六语言、正文语言、章节链接 locale 或 fallback |
| `validate_book_navigation.py` | 22 章 EN/legacy ZH 顺序和前后导航块 | 不能验证六语言侧栏、语言切换后 content identity 不变 |
| 浏览器/构建验证 | 需要额外执行才知道真实页面行为 | 当前审计没有把未执行的浏览器结果当作证据 |

## 5. `-EN/-ZH/-ES/-JA/-KO/-DE` 后缀策略的优点与缺口

### 5.1 已经解决的部分

后缀策略在本项目有四个现实好处：

1. **GitHub 直接可读：** 读者打开文件名就知道语言，不依赖站点 JavaScript。
2. **下载和审查可追踪：** 同一目录可以并排比较同一 stem 的不同语言版本。
3. **默认语言不再隐式：** `-EN` 能把英文源与 legacy 无后缀文件区别开。
4. **矩阵容易做静态校验：** 后缀可以检查是否为六个登记值，路径可以反查 `content_id`。

这些优点值得保留。问题不是“后缀错误”，而是后缀没有覆盖站点系统的全部职责。

### 5.2 主要缺口

| 缺口 | 现实表现 | 需要补的层 |
|---|---|---|
| 后缀不是 URL | `README-ZH.md` 的存在不会自动生成 `/zh/README` | route manifest 与站点构建/重定向 |
| 同 stem 不等于同身份 | 文件名相似但没有统一 identity，可能出现错配或重复 | 稳定 `content_id`、唯一 stem、源版本 |
| README facade 可能产生双份英文 | GitHub 需要 `README.md`，canonical source 又是 `README-EN.md` | 明确 `README.md` 是 EN facade，不是第二份正文 |
| 语言切换可能回首页 | 只改全局语言变量或只拼接后缀会丢失当前章节和锚点 | 按当前 `content_id` 计算 alternate page |
| 运行时语言集合不一致 | 矩阵六语言，site/app.js 与 catalog 只有 EN/ZH | 统一语言注册源，生成 UI、catalog、路由和搜索索引 |
| fallback 状态没有站点行为 | `in-progress` 写在矩阵里，但缺译页如何显示没有统一实现 | `requested_locale`、`effective_locale`、可见提示 |
| 导航不是 locale-aware | 当前 footer 只生成 EN/legacy ZH | 同一章节序列 + 当前 locale 解析 |
| 侧栏/目录可能跨语言 | 生成器若直接使用英文/legacy path，非 EN 语言会泄露英文 | 目标 path 必须来自当前 locale 的 matrix entry |
| release gate 只偏结构 | 结构通过不代表翻译正确，也不代表浏览器可用 | 静态验证 + 构建验证 + 浏览器 crawl + 人工语言审查 |
| legacy 无后缀路径过多 | 旧书签和外部链接不能一次性消失，但长期保留会制造第二套身份 | redirect/stub 兼容窗口与迁移截止条件 |

## 6. 推荐的目标架构

### 6.1 继续保留后缀，但让 `content_id` 成为唯一关联键

推荐的一个内容条目形状如下：

```yaml
content_id: chapter-02-first-safe-task
kind: chapter
stem: book/chapters/02-first-safe-task
route_slug: chapters/02-first-safe-task
source_locale: EN
source_revision: <english-source-commit-or-content-revision>
locales:
  EN:
    path: book/chapters/02-first-safe-task-EN.md
    route: /chapters/02-first-safe-task
    translation_status: source
  ZH:
    path: book/chapters/02-first-safe-task-ZH.md
    route: /zh/chapters/02-first-safe-task
    translation_status: in-progress
    translated_from: EN
    source_revision: <same-english-source-revision>
```

六个 locale 都必须有显式 entry；缺文件时 entry 的状态是 `not-started` 或 `in-progress`，而不是省略。省略会让“未登记”和“翻译不存在”无法区分。

`README.md` 的特殊规则：

- 保留它作为 GitHub 默认展示的 English facade；
- 在文件内标记它对应 `content_id: project-readme`、`locale: EN`；
- 指向 [`README-EN.md`](../../README-EN.md) 作为 canonical English source；
- 不在 `README.md` 与 `README-EN.md` 维护两份独立英文正文；
- 六语言切换器仍然根据同一个 `content_id` 工作。

### 6.2 URL 采用默认英文根路径 + 其他语言前缀

目标 canonical route：

```text
/                                      -> EN landing/readme
/chapters/01-gpt-and-codex             -> EN
/zh/chapters/01-gpt-and-codex          -> ZH
/es/chapters/01-gpt-and-codex          -> ES
/ja/chapters/01-gpt-and-codex          -> JA
/ko/chapters/01-gpt-and-codex          -> KO
/de/chapters/01-gpt-and-codex          -> DE
```

规则：

- English 的 canonical URL 不带 `/en/`；若将来需要接受 `/en/...`，它只能是 redirect alias。
- 旧的 `?lang=en|zh` 可以在迁移期保留为兼容入口，最终重定向到 canonical route；不得让 query 和 prefix 两套 URL 长期同时 canonical。
- 切换语言时保留当前 `content_id`、有效 anchor、必要的 query/filter 状态；不要只跳到对应语言首页。
- URL 是可分享状态；`localStorage`/cookie 只能记住偏好。显式 URL 优先级高于本地存储，未带 locale 的新 URL 默认 EN。
- GitHub 仓库内的 Markdown 相对链接仍然指向带后缀文件；公共站点链接由 route manifest 生成。两层可以使用不同表示，但必须由同一 identity map 连接。

### 6.3 语言切换器只切换同一 `content_id`

每个读者页面都应有机器可识别的语言切换块或站点组件：

```text
English | 简体中文 | Español | 日本語 | 한국어 | Deutsch
```

点击规则：

1. 读取当前页的 `content_id`，而不是从标题或当前文件名猜测；
2. 在 matrix 中寻找目标 locale 的 path/route；
3. 保留当前页面的 anchor；
4. 只有目标 anchor 在目标页面存在时才保留它，否则报告可检测的 anchor 缺失；
5. 保留经验证可分享的 query/filter 状态；
6. 切换后更新 `<html lang>`、标题、description、导航标签、按钮可访问名称和当前语言状态；
7. 刷新页面或复制 URL 后仍然得到相同语言状态。

语言选择器允许跨 locale，普通正文链接不允许跨 locale。这个例外边界很重要，否则“语言切换器检查通过”可能掩盖正文中的语言泄漏。

### 6.4 缺译采用显式 fallback，不采用静默 fallback

建议把请求语言和实际内容语言分开记录：

```yaml
requested_locale: ZH
effective_locale: EN
content_id: chapter-05-choose-the-codex-surface
translation_status: in-progress
fallback_reason: target-locale-file-missing
```

页面行为：

- URL 可以保持 `/zh/chapters/...`，这样读者知道自己请求的是中文路线；
- 页面明显显示“当前显示 English source，中文翻译尚未完成”；
- 内容实际为英文时，正文语义的 `<html lang>` 应与实际显示语言一致；请求语言保存在页面状态和 UI 提示中；
- canonical/hreflang 只宣传真实存在且已声明的翻译，不能把 fallback 页面伪装成完整中文版本；
- 语言切换器对缺译目标显示状态或明确的英文 fallback 入口，不猜一个不存在的文件；
- release 模式要求目标语言文件和审查证据齐全，migration 模式才允许上述 fallback。

另一种可行策略是直接把缺译请求重定向到英文 canonical URL，但这会丢失请求语言信息，且读者很难理解为什么跳转。对本项目的迁移期而言，保留请求路径并显示明确 banner 更可审计；最终是否保留 fallback route，应由 SEO、缓存和部署实际验证后决定。

### 6.5 侧栏、目录、上一页/下一页共享同一个顺序源

建议把 `docs/governance/book-navigation.yaml` 的章节序列扩展为 locale-neutral 的 `content_id` 顺序：

```text
chapter-01 -> chapter-02 -> chapter-03 -> ... -> chapter-22
```

生成过程：

1. 读取 canonical chapter order；
2. 根据当前 locale 为每个 `content_id` 解析标题和 route；
3. 生成当前 locale 的 TOC、sidebar、previous/next；
4. 碰到缺译时按照 migration policy 生成 fallback item 或明确 disabled item；
5. 生成器和验证器同时检查路径、locale、content identity 和前后边界。

这样可以保证：

- 第一章只有 next；
- 中间章节有 previous 和 next；
- 最后一章只有 previous；
- 跨 Part 仍遵循 canonical 顺序；
- `ZH` 页面不会因为下一章缺译而悄悄跳到 `EN`，除非生成结果明确标为 fallback；
- 所有语言的章节顺序相同，章节标题和目标地址按语言变化。

侧栏不是另一个独立的章节顺序源。若某个特殊页面确实需要跳过或覆盖 previous/next，应在同一导航模型里显式登记，而不是靠页面作者手写第二套规则。

### 6.6 locale-neutral 文件必须有边界

不需要把治理文件、验证器、ADR、来源登记和内部脚本复制六份。它们可以保持 locale-neutral，但必须在矩阵或项目约定中标记清楚。读者看到一个链接到 `docs/governance/...` 时，不应把它误认为某种语言的正文。

建议的分类：

```text
reader-facing localized:
  book/, labs/, localized site content, README language variants

locale-neutral governance:
  CONTEXT.md, AGENTS.md, docs/adr/, docs/governance/, docs/sources/

locale-neutral implementation:
  scripts/, site source, validators, generated metadata
```

如果治理文件本身需要给读者阅读，可以另行建立明确的 `-EN`/`-ZH` reader-facing copy，并在矩阵中建立新的 `content_id`；不能只因为路径在 `docs/` 就同时把它当作翻译正文和内部治理文件。

## 7. 分阶段迁移方案

### Phase 0：冻结合同，不动内容

先确定并记录：

- 六个 locale 的唯一拼写、URL token 和 HTML `lang`；
- English 是否为默认源语言；
- `/` 与 `/en/` 哪个是 canonical；
- `content_id`、stem、route slug 的命名规则；
- 缺译是 fallback route、disabled item 还是 redirect；
- `<html lang>` 在 fallback 时跟随 effective locale 的规则；
- `README.md` facade 与 `README-EN.md` source 的关系。

没有这一步，后续每个脚本都可能自定义一套 locale 解释。

### Phase 1：扩展 locale matrix，使它成为唯一 identity map

在现有矩阵基础上增加或明确：

- `route_slug`；
- 每个 locale 的 canonical route；
- `requested/effective` fallback policy；
- `coverage`、`reviewer`、`reviewed_at`、`next_review`；
- 英文 source revision；
- 页面是否进入 sidebar/TOC/prev-next；
- legacy path 的 deterministic redirect/stub 目标。

矩阵的内容身份、导航文件和站点 catalog 不应出现互相独立的手工映射。

### Phase 2：迁移旧无后缀文件，保持事实与语言不被重写

逐个内容身份迁移，不做一次性大规模重命名：

1. 确认旧文件真实语言；
2. 如果它是中文，不得仅因新默认语言改为 EN 就把它标成 `-EN`；
3. 为英文源建立真实的 `-EN` 文件，并记录 source revision；
4. 为旧路径创建 redirect 或薄兼容 stub；
5. stub 只说明 canonical 路径和语言状态，不维护第二份完整正文；
6. 迁移每一小组后执行链接审计并保留回滚点。

旧路径的兼容规则应确定：

- 不带 locale 的旧路径默认进入 EN canonical；
- 旧路径显式请求某 locale 时，只有矩阵中有真实 entry 才进入该 locale；
- 缺译时显示登记的 fallback 状态；
- redirect 保留 anchor，失效 anchor 要报告，不能默默丢弃。

### Phase 3：先让英文路线完整可用

英文是默认门面，也是翻译的 source。先完成：

- 全部 reader-facing EN 文件；
- EN 的 TOC、sidebar、previous/next；
- README facade/source 关系；
- EN route manifest、canonical、404 和搜索索引；
- 英文页面的 browser crawl。

这一步的完成状态仍应是 `candidate` 或 `verified`，取决于实际证据；构建通过不自动等于生产就绪。

### Phase 4：让六种语言使用同一导航模型

把 site catalog、sidebar、TOC、footer 和语言切换器都改为从 identity map 解析。先支持完整的 EN/ZH，再逐步开放 ES/JA/KO/DE；但代码路径不应为每种语言复制一套分支逻辑。

在此阶段应删除或隔离：

- 只接受 `en/zh` 的运行时白名单；
- 只含 English/Chinese 的 catalog 字段；
- 只生成 EN/legacy ZH 的导航分支；
- 把缺译目标直接拼成文件名的逻辑。

### Phase 5：建立公开语言的最低内容门槛

参照 Kubernetes 的维护边界，为每个 locale 定义最低公开范围，例如：

- README/入口；
- 前言和目录；
- 第一学习路径所需的章节；
- 对应实验和必要 UI 文本；
- fallback、404、搜索和导航标签；
- 语言审查责任和术语表。

未达到门槛的语言可以在仓库矩阵中登记为 migration，但不应在站点语言选择器中显示成“已完成语言”。如果产品决定提前显示，也必须显示 `in-progress`，并把缺译范围说清楚。

### Phase 6：增加全站 locale crawl

静态验证之后，对构建产物执行真实路径检查。对每个 locale 从入口开始，抓取目录、侧栏、正文链接、上一页/下一页、语言切换器、搜索结果和 404。

每次 crawl 至少产出：

```text
locale=zh
content_id=chapter-02-first-safe-task
requested_locale=zh
effective_locale=zh
html_lang=zh-CN
internal_locale_violations=0
missing_same_locale_targets=0
fallback_pages=3
```

没有这类运行时证据时，只能说“结构检查通过”，不能说“切换后全站仍是该语言”。

### Phase 7：从 migration 切换到 release

只有当每个公开 `content_id` 的语言 entry、实际文件、同语言链接、导航、fallback 说明、语言审查和浏览器证据齐备，才切换 release gate。切换前重新执行：

- duplicate work/path 检查；
- legacy link audit；
- route/canonical/hreflang 检查；
- 全六语言 crawl；
- 关键章节人工阅读；
- 404、锚点、移动端和缓存路径检查。

## 8. 如何验证“切换后全站仍是该语言”

这句话不能靠“语言按钮变了”来验收。建议分四层验收。

### 8.1 内容身份层

- 点击切换前后，`content_id` 相同；
- 不因标题翻译、文件后缀或 URL slug 变化而跳到其他章节；
- 章节、实验、Skill、评估任务的关联仍然指向同一 identity；
- 语言切换器的目标数量与矩阵中登记的 locale 一致；
- unavailable locale 不产生猜测路径。

### 8.2 URL 与页面语义层

- 直接访问每个 locale 入口都能加载；
- URL locale、matrix locale、页面 `effective_locale` 和 `<html lang>` 一致；
- 页面 title、description、导航、按钮、aria label 和搜索 UI 使用当前有效语言；
- 切换后保留有效 anchor、query 和 hash；
- 刷新、复制链接、无 localStorage 状态打开时结果一致；
- 非法 locale 回退到 EN，并且回退行为可见或可记录；
- 404 页面也有当前 locale 的语言状态。

### 8.3 链接图与导航层

- 当前 locale 的正文内部链接不会跳到其他 locale；
- 侧栏、TOC、上一页、下一页全部由同一 locale 解析；
- 第一页/中间页/最后一页的 footer 边界正确；
- 跨 Part 的顺序正确；
- 缺译页面使用登记的 fallback，而不是裸链接到英文；
- `hreflang`、canonical 和实际存在的翻译集合一致；
- 搜索结果不会把 EN 页面伪装成 ZH 页面。

### 8.4 人工语言与真实浏览器层

自动化不能可靠判断整篇正文是否自然、术语是否正确或图片中的文字是否仍是英文。因此还需要：

- 每个公开 locale 至少抽查入口、第一章、中间章、最后一章和一个实验；
- 由能读该语言的人检查术语、按钮、错误提示和 fallback banner；
- 检查图片 alt、代码注释、表格、图注和下载文件是否泄漏英文；
- 桌面和窄屏各走一次切换、侧栏和 footer；
- 在全新浏览器上下文中复现，不依赖本地存储残留；
- 保存 URL、截图、HTML `lang`、抓取结果和失败链接作为证据。

## 9. 建议新增或扩展的机器检查

不要求一次性改完，但最终验证器应覆盖以下规则：

| 检查域 | 必须检查 |
|---|---|
| locale 注册 | default locale、六个 suffix、URL token、HTML lang 唯一且稳定 |
| content identity | 每个 content_id 的 stem、path、route 唯一；六个 locale entry 显式存在 |
| 文件 | 声明为可用的文件存在、UTF-8、非空、后缀正确 |
| 普通链接 | 当前 locale 链接当前 locale；locale-neutral 目标必须在允许列表 |
| 语言切换 | 只跨到同一 content_id；目标 locale 一次且仅一次；保留 URL 状态 |
| fallback | requested/effective、原因、可见提示、canonical/hreflang 状态齐全 |
| 导航 | TOC/sidebar/prev/next 共用顺序；第一/中间/最后边界正确 |
| translation metadata | source revision、coverage、reviewer、review date、stale 状态齐全 |
| legacy | 旧路径只映射一个 canonical，不形成循环，anchor 行为明确 |
| 运行时 | 每种公开 locale 有 route、catalog、UI 字典、搜索索引和 404 |
| 构建产物 | 真实输出路径存在，不只是源码映射存在 |

建议保留两个 gate：

- **migration：** 允许 `not-started`/`in-progress`，但每个缺口必须登记并有明确 fallback 或不可用状态；
- **release：** 要求公开范围内六语言文件、同语言链接、导航、运行时和 review 证据齐全。

## 10. 事实、推断与尚未证明的事项

| 类型 | 结论 | 依据/边界 |
|---|---|---|
| 官方事实 | Starlight 支持默认 locale、同 slug 关联、当前页语言 URL 和未翻译提示 | Starlight 官方 i18n 文档与固定 revision 源码 |
| 官方事实 | Docusaurus 默认 locale 可无前缀，其他 locale 使用前缀，并有 alternate-page locale dropdown | Docusaurus 官方 i18n 文档与主题源码 |
| 官方事实 | VitePress 允许 root locale、每语言配置和 locale 目录；根路径重定向需要部署层 | VitePress 官方 i18n 文档 |
| 官方事实 | mdBook 用 `SUMMARY.md` 定义书籍顺序和相邻导航 | mdBook 官方 guide 与 renderer 源码 |
| 官方事实 | Rust Book 的书籍构建依赖 mdBook，多语言曾被当作构建器/外部站点问题 | Rust Book 固定 revision README；这是历史快照，不是今日产品能力声明 |
| 官方事实 | Kubernetes 把本地化拆成语言目录、源版本、最低内容和审查团队，并提供未翻译内容的语言替代策略 | Kubernetes 官方本地化指南与固定 revision website |
| 当前仓库事实 | 矩阵已登记六 locale，但处于 migration；runtime 只有 EN/ZH；book navigation 只有 EN/legacy ZH | 本仓库治理文件、脚本和站点源码的只读审计 |
| 本项目推断 | 保留文件后缀、增加 locale-prefixed route 和稳定 content_id 的混合架构最适合当前 GitHub + 静态站点边界 | 结合上述事实与当前仓库兼容约束的设计建议 |
| 本项目推断 | 同一章节顺序源应生成六语言 TOC/sidebar/prev-next | mdBook/Docusaurus/VitePress/Starlight 的共同导航边界，加上当前导航文件的职责 |
| 尚未证明 | 翻译内容是否自然、事实是否正确、浏览器六语言切换是否已实现、移动端布局是否可用 | 本报告没有运行六语言公共站点浏览器验收，也没有进行语言专家审校 |

## 11. 许可证与资料使用边界

本报告只提取结构、配置概念和公开的工程事实。它不复制外部项目的正文、代码片段、图片、字体、图标、网页截图或品牌语言。官方仓库的“项目许可证”也不自动覆盖其中的第三方依赖、用户提交内容或媒体资产。

本轮固定记录的许可证边界：

| 来源 | 本轮查到的项目级边界 | 使用规则 |
|---|---|---|
| Astro Starlight | MIT | 这里只借鉴 i18n/导航结构；若以后复制代码，仍需保留相应版权和许可证文本 |
| Docusaurus | MIT | 这里只引用官方文档和源码位置；不复制主题实现或视觉资产 |
| VitePress | MIT | 这里只借鉴 locale 配置和页面关系；不复制其站点内容 |
| mdBook | MPL-2.0 | 这里只借鉴 `SUMMARY.md` 和 renderer 的架构事实；若复用代码需按 MPL-2.0 处理 |
| Rust Book | Apache-2.0 许可证文件已核对 | 本轮只记录构建/目录事实；具体文件和第三方内容仍需单独核对 |
| Kubernetes documentation | CC BY 4.0 文档内容边界 | 若以后使用文字、图片或示例，必须按具体资产要求署名并核查来源；代码和媒体不自动按 CC BY 处理 |

外部来源和许可证判断应继续登记到 [`docs/sources/asset-register.md`](../sources/asset-register.md)。`WorkBuddyGuide` 等项目可以作为信息架构参考，但其仓库级许可证不自动授权其中的图片、字体、第三方图标、案例投稿或品牌表达；本报告没有把这些资产带入项目。

## 12. 来源清单

以下来源均在 **2026-08-11** 访问或按固定 revision 核对。文档站点链接可能指向其当前页面；revision 链接用于锁定本轮源码观察的具体版本。

### Astro Starlight

- 官方指南：[Internationalization](https://starlight.astro.build/guides/i18n/)
- 固定 revision：[`656ffd54e5b27483f542c9eb8b12fd32f44372ae`](https://github.com/withastro/starlight/tree/656ffd54e5b27483f542c9eb8b12fd32f44372ae)
- 语言选择器源码：[LanguageSelect.astro](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/packages/starlight/components/LanguageSelect.astro)
- 配置参考：[Configuration reference](https://starlight.astro.build/reference/configuration/)
- 项目许可证：[LICENSE](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/LICENSE)

### Docusaurus

- 官方指南：[Internationalization introduction](https://docusaurus.io/docs/i18n/introduction)
- 官方配置：[i18n configuration](https://docusaurus.io/docs/api/docusaurus-config#i18n)
- 固定 revision：[`3f483e80e326cc646b54b83d564b3f0c4881b9a`](https://github.com/facebook/docusaurus/tree/3f483e80e326cc646b54b83d564b3f0c4881b9a)
- locale dropdown 源码：[LocaleDropdownNavbarItem](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a/packages/docusaurus-theme-classic/src/theme/NavbarItem/LocaleDropdownNavbarItem/index.tsx)
- 项目许可证：[LICENSE](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a/LICENSE)

### VitePress

- 官方指南：[Internationalization](https://vitepress.dev/guide/i18n)
- 固定 revision：[`db28226b9a092a6510672d75527d55e7fe78e879`](https://github.com/vuejs/vitepress/tree/db28226b9a092a6510672d75527d55e7fe78e879)
- 官方仓库指南：[docs/en/guide/i18n.md](https://github.com/vuejs/vitepress/blob/db28226b9a092a6510672d75527d55e7fe78e879/docs/en/guide/i18n.md)
- 项目许可证：[LICENSE](https://github.com/vuejs/vitepress/blob/db28226b9a092a6510672d75527d55e7fe78e879/LICENSE)

### mdBook

- 官方格式指南：[SUMMARY.md format](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/guide/src/format/summary.md)
- 导航实现：[HTML renderer navigation helper](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/src/renderer/html_handlebars/helpers/navigation.rs)
- 固定 revision：[`b90df240a318da0c59ec3efe6b75a58f63c6c459`](https://github.com/rust-lang/mdBook/tree/b90df240a318da0c59ec3efe6b75a58f63c6c459)
- 项目许可证：[LICENSE](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/LICENSE)

### Rust Book

- 固定 revision README：[README.md](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/README.md)
- 固定 revision 章节顺序：[src/SUMMARY.md](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/SUMMARY.md)
- 固定 revision：[`917544888a55e4da7109bdba8c88c893c0da70f4`](https://github.com/rust-lang/book/tree/917544888a55e4da7109bdba8c88c893c0da70f4)
- 许可证文件：[LICENSE-APACHE](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/LICENSE-APACHE)

### Kubernetes website

- 官方指南：[Localizing documentation](https://kubernetes.io/docs/contribute/localization/)
- 固定 website revision：[`ace240e2b0bbcb0182fc0c0b99d79ea5d75de2e0`](https://github.com/kubernetes/website/tree/ace240e2b0bbcb0182fc0c0b99d79ea5d75de2e0)
- 官方仓库内容树：[content](https://github.com/kubernetes/website/tree/ace240e2b0bbcb0182fc0c0b99d79ea5d75de2e0/content)
- 项目许可证/文档授权说明：[repository license](https://github.com/kubernetes/website/blob/ace240e2b0bbcb0182fc0c0b99d79ea5d75de2e0/LICENSE)

## 13. 本报告的完成边界

- [x] 研究默认 English、locale URL、文件身份、同语言链接和语言切换；
- [x] 研究缺译 fallback、侧栏、目录、上一页/下一页和内容顺序；
- [x] 对照当前仓库 `-EN/-ZH/-ES/-JA/-KO/-DE` 后缀策略列出缺口；
- [x] 给出保留后缀、增加稳定内容身份和 locale 路由的迁移方案；
- [x] 记录来源 URL、访问日期、revision、事实/推断边界和许可证边界；
- [x] 保持本轮代码与内容审计只读；
- [ ] 未声称当前仓库已经完成六语言运行时、翻译质量审查或浏览器全站验证。
