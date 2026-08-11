# 教程价值与知识库项目基准研究

**研究日期：** 2026-08-11（America/Los_Angeles）
**研究状态：** candidate。本报告只把能由公开仓库、固定 revision 和官方文档核对的内容写成事实；结构建议和项目设计写成推断。它不是对任何外部站点学习完成率、转化率或生产稳定性的证明。
**研究目标：** 为 Codex: From First Task to Real Work 设计一套让新手快速找到答案、让熟练用户获得实际工作价值、并能长期维护的教程/知识库结构。
**研究边界：** 只读访问公开官方仓库、官方文档和用户指定的 WorkBuddyGuide。未复制外部正文、代码、图片、品牌、字体或 Skill 指令；外部项目仅用于结构与机制参考。

## 1. 结论先行

高质量教程的核心不是页面数量或视觉装饰，而是把以下四件事连成可复用闭环：

1. 读者能从真实问题进入，不必先知道产品术语。
2. 同一页面同时提供概念、操作、预期输出、失败边界和验收方法。
3. 页面有稳定的章节身份、语言身份和版本身份，因此导航、搜索、翻译和旧链接不会漂移。
4. 内容变化有来源、revision、状态、责任人和复核时间；读者能区分稳定原则、易变事实和未验证案例。

本轮研究最值得采用的不是某一个框架，而是下面这组机制：

| 机制 | 外部证据 | 对新手的价值 | 对本项目的建议 |
| --- | --- | --- | --- |
| 显式内容顺序源 | Rust Book 的 src/SUMMARY.md；WorkBuddyGuide 的 sidebar.ts | 能顺序阅读，也知道当前页前后关系 | 保留唯一章节顺序源，目录、页脚和导航由它生成 |
| 学习入口与任务入口并存 | Docusaurus 的 docs/pages 分层；WorkBuddyGuide 的蓝皮书、案例、帮助入口 | “我想学”和“我遇到问题”不必走同一路径 | 首页提供学习路径、任务索引、失败索引 |
| 统一页面身份 | Docusaurus 的 doc id/version；VitePress/Starlight 的同名 locale 页面 | 切换语言或版本后仍停留在同一主题 | 用 canonical id 连接语言文件，不用翻译标题猜映射 |
| 搜索带语言/版本上下文 | Docusaurus contextual search；VitePress 本地搜索；Starlight Pagefind | 搜到的答案更可能适用于当前页面 | 索引带 locale、revision、内容类型和状态 |
| 失败路径一等公民 | MCP Inspector、日志、协议协商；WorkBuddy Case 模板 | 知道为什么失败、下一步查什么 | 每章至少一个故障实验、停止条件和证据要求 |
| 源文件与生成物分离 | MCP schema.ts 生成 schema.json/MDX；Rust Book 的构建链 | 更新不会只改展示层 | 顺序、语言映射、事实登记、生成页脚分开管理 |
| 版本不是装饰 | Docusaurus current/latest/旧版本；MCP 日期协议目录 | 能判断答案适用的时间点 | 易变事实卡带访问日期、范围、来源和复核责任 |
| 贡献先复现再实现 | OpenAI/Codex 贡献指南；MCP SEP；WorkBuddy Case 模板 | 提交的是可检查问题和证据 | 贡献模板要求问题、复现、预期、实际、证据、风险和许可 |

**核心判断（推断）：** Codex Field Guide 的差异化不应是再做一套产品命令手册，而应把“模型、Codex、工具、Skill、Agent、权限、证据和团队维护”放进同一个可验证的能力单元。外部项目分别擅长其中一两层；本项目的价值在于把这些层接起来。

## 2. 哪些结构真正帮助新手找到答案

### 2.1 读者的搜索问题和作者的文件分类不是一回事

新手通常不会搜索“第 7 章：上下文管理”，而会搜索：

| 读者问题 | 最短入口 | 后续入口 |
| --- | --- | --- |
| 我第一次应该做什么？ | Getting Started / 第一个小任务 | 安全边界、验收、下一步 |
| 我想完成一件具体工作 | 按任务或场景的 recipe | Skill、输入、失败处理、迁移 |
| 结果看起来对，但我不确定 | 验收与证据卡 | 反例、人工复核、停止条件 |
| 工具调用失败了 | 故障诊断/FAQ | 权限、网络、路径、版本、最小复现 |
| 我想做一个 Skill | Skill anatomy / builder lab | 触发条件、输入契约、边界、测试 |
| 这个答案适用于哪个版本 | 事实卡和版本登记 | 原始来源、访问日期、替代方案 |
| 我想贡献案例 | Case 模板 | 脱敏、许可、重复检查、证据 |

**事实：** Docusaurus 将 docs、sidebar、versions 分成不同层，并允许 docs 走根路由或 docs 子路由；WorkBuddyGuide 在 VitePress 配置中把首页、开始阅读、案例集、帮助和阅读指南设为不同入口。
**推断：** 本项目不能只维护按章节排列的一棵树。章节树适合顺序学习，问题索引适合快速解决，案例索引适合判断能否迁移；三者应指向同一个 canonical 能力页，而不是复制三份正文。

### 2.2 推荐的最小信息架构

~~~text
首页
├─ 现在就解决一个问题        task index
├─ 从零开始学习              learning path
├─ 看真实案例和失败复盘       case / failure index
└─ 查版本、语言、贡献规则     reference / governance

能力页（canonical capability）
├─ 问题和目标
├─ 最小概念模型
├─ 操作或实验
├─ 预期输出
├─ 失败边界与诊断
├─ 验收清单和证据
├─ 迁移到真实工作的练习
└─ 来源、版本、语言状态、维护信息
~~~

这比简单的“教程 / API / FAQ”三分法更适合 Codex，因为 Skill、MCP 和 Agent 的问题常常同时涉及概念、权限、外部工具和团队流程。

### 2.3 页面结构必须固定

一个合格的能力单元至少需要：

1. 真实问题：谁在什么环境遇到什么阻塞。
2. 学习目标：完成后能解释、操作、判断和复查什么。
3. 前置条件：客户端/CLI、项目路径、账号、权限、版本、输入和可逆性。
4. 核心机制：完成当前任务所需的最小模型。
5. 最小实验：低风险、可观察、可复现。
6. 预期观察：应该看到什么；没看到意味着哪一层有问题。
7. 失败实验：故意改变一个变量，展示失败或不应继续的状态。
8. 验收清单：如何证明完成，而不是“看起来完成”。
9. 迁移练习：映射到工程、研究、文档、营销或团队协作。
10. 来源与时效：稳定原则、易变事实、社区案例分别标记。

**事实：** WorkBuddyGuide 的 Case 模板包含场景、任务、Skill、前置条件、操作、指令、效果、验收、遇到的问题、安全限制和复用方式。
**推断：** 这些字段比“案例截图加一段提示词”更能形成工作价值；截图只能说明某次输出长什么样，不能证明权限、输入、版本、验收和可迁移性。

## 3. 固定版本的项目观察

下表中的 revision 是本次通过 GitHub API 读取的默认分支头部完整 commit。默认分支之后会继续变化，因此报告只对这些固定快照负责。

| 编号 | 项目与官方入口 | 固定 revision | 访问日期 | 许可证边界 |
| --- | --- | --- | --- | --- |
| R1 | [The Rust Programming Language](https://github.com/rust-lang/book)；[stable book](https://doc.rust-lang.org/stable/book/) | main at 917544888a55e4da7109bdba8c88c893c0da70f4 | 2026-08-11 | 仓库提供 Apache-2.0 与 MIT 文件；具体文字、代码、图像和出版物仍需逐项核对 |
| R2 | [mdBook](https://github.com/rust-lang/mdBook)；[User Guide](https://rust-lang.github.io/mdBook/) | master at b90df240a318da0c59ec3efe6b75a58f63c6c459 | 2026-08-11 | README 明确仓库代码为 MPL-2.0；不推断外部 User Guide 素材和第三方资源同样可复制 |
| R3 | [Docusaurus](https://github.com/facebook/docusaurus) | main at 3f483e80e326cc646b54b83d564b3f0c4881b9a6 | 2026-08-11 | LICENSE 为 MIT；LICENSE-docs 为 CC BY 4.0，代码与文档边界不同 |
| R4 | [VitePress](https://github.com/vuejs/vitepress) | main at db28226b9a092a6510672d75527d55e7fe78e879 | 2026-08-11 | MIT；不自动覆盖文档中的第三方图片、字体和外部资产 |
| R5 | [Astro Starlight](https://github.com/withastro/starlight) | main at 656ffd54e5b27483f542c9eb8b12fd32f44372ae | 2026-08-11 | MIT；插件、示例和外部资源仍需单独确认 |
| R6 | [Model Context Protocol](https://github.com/modelcontextprotocol/modelcontextprotocol)；[官方文档](https://modelcontextprotocol.io/) | main at b25c0874bf0ba699a58e21ef06f659d839659de3 | 2026-08-11 | LICENSE 记录 MIT 向 Apache-2.0 迁移；新代码/规范贡献为 Apache-2.0，文档（规范除外）为 CC-BY-4.0，未同意重许可的旧贡献可能仍为 MIT |
| R7 | [Claude Code repository](https://github.com/anthropics/claude-code)；[官方文档](https://code.claude.com/docs/en/overview) | main at 681a8be245e7759a405e276b16ae69ea6b75076f | 2026-08-11 | LICENSE.md 规定 Anthropic 商业条款，不是可按 MIT/Apache 复制的教程资产 |
| R8 | [OpenAI Codex repository](https://github.com/openai/codex)；[官方开发文档](https://developers.openai.com/codex) | main at b43de77679faa53b3bc39d1b72441b24d9d8f428 | 2026-08-11 | Apache-2.0；仍不能复制品牌、截图、产品文案或未单独确认许可的素材 |
| R9 | [WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide)；[公开站点](https://workbuddy.homes/) | main at abd61e82188fc57ef542756312e06175fc70b8b0 | 2026-08-11 | 根目录 MIT；图片、字体、品牌、投稿和外部素材不因根目录许可证自动获得同样许可 |

## 4. 项目逐项分析

### 4.1 Rust Book 与 mdBook：线性学习的可构建性

**事实（R1）：**

- Rust Book 的章节顺序集中在 src/SUMMARY.md，章节和子章节使用显式嵌套。
- book.toml 集中保存书名、作者、HTML 扩展、搜索、旧 URL 重定向、预处理器和 Rust edition。
- README 把构建、打开本地输出和 mdBook 测试写成可执行流程，并把 stable、beta、nightly 在线版本分开。
- 附录列出社区翻译入口，但 README 同时指出 mdBook 当时仍等待更完整的多语言支持。

**事实（R2）：**

- mdBook 将自己定义为从 Markdown 生成现代在线书籍的工具，User Guide 同时是演示。
- mdBook 仓库代码许可证为 MPL-2.0，并提供贡献指南。

**价值机制（推断）：**

- 顺序源让上一页/下一页、目录、构建结果和章节文件保持一致；作者不会因手工改链接而悄悄改变课程顺序。
- 代码列表、构建和测试把“读过”变成“运行过”，适合本项目把小实验与验收脚本绑定。
- stable/beta/nightly 说明教程版本和软件版本必须同时可见。
- 重定向表是迁移章节名称或顺序时保护搜索入口的机制。

**失败边界：**

- 线性目录不等于问题检索；权限或网络问题仍需要症状索引。
- 构建通过只证明文档构建链的一部分，不证明 Codex、Skill 或外部服务产生了正确结果。
- 社区翻译列表不等于同版本、同覆盖率的多语言站点；翻译状态必须单独登记。

**采用建议：** 保留 canonical 章节顺序和构建检查；增加任务索引、故障索引、语言矩阵和能力验收，不把线性模型当作全部信息架构。

### 4.2 Docusaurus：文档、版本、语言和搜索的组合

**事实（R3）：**

- Docusaurus 将内容、sidebar、versions 分为独立概念，支持 docs 根路由或 docs 子路由。
- 版本机制由 docs、versioned_docs、versioned_sidebars 和 versions.json 组合，并区分 current、latest 和旧版本。
- 官方警告版本化会增加贡献与构建复杂度，建议只在变化快、流量高且确实需要历史快照时使用。
- 官方建议正文使用带 .md 扩展名的文档相对链接，让构建器按版本重写 URL；同时建议使用 @site 等绝对导入，避免版本目录深度变化导致路径问题。
- i18n 将 Markdown/MDX 正文、JSON UI 文本、部署路径和 hreflang 分开；不自动决定用户语言，也不默认翻译 slug。
- Algolia contextual search 默认按当前语言和版本过滤结果，但索引更新依赖爬虫或手动重抓。

**价值机制（推断）：**

- 版本、语言和搜索过滤必须一起设计；只有语言下拉菜单而没有 locale/version 索引，会把新手送到不适用的答案。
- current 不一定等于 latest；正在编辑的内容不一定是默认用户应该看到的内容。
- 不翻译 slug 降低 URL 漂移；本项目应使用稳定能力 ID，把本地化标题当展示文本。

**失败边界：**

- 复制整个 docs 目录会产生重复修复和翻译漂移；没有明确门槛时不应复制版本。
- 正文翻译完整不代表 React/UI 标签完整；动态字符串需要额外翻译检查。
- 搜索无结果可能是索引未重建、facet 不匹配或爬虫未抓到新页面。
- 语言自动检测会制造不可预测入口；应提供明确 locale URL。

**采用建议：** 将“内容版本”和“产品事实版本”分离：章节结构变化才升级正文版本；模型名、命令、权限和外部 API 作为事实卡登记。

### 4.3 VitePress：locale、搜索和页脚导航

**事实（R4）：**

- VitePress 文档把英文放在 docs/en，同时存在 es、fa 等语言目录；locale 配置可定义 label、lang、link 和 locale-specific themeConfig。
- link 只提供语言入口，不能自动把一份正文翻译成另一种语言。
- prev/next 可从 sidebar 推断，也可由单页 frontmatter 显式覆盖、改文字、改链接或关闭。
- 本地搜索基于浏览器端全文索引，并提供多语言 UI 文案配置。
- 初次访问可以是预渲染 HTML，后续站内导航由客户端更新，兼顾 SEO 和换页体验。

**价值机制（推断）：**

- 前后页链接由顺序源推断，关键跳转可显式覆盖，比每页手工写按钮更易维护。
- locale link 是入口切换，同名页面映射才是内容切换，两者必须同时存在。
- 本地搜索适合作为开源知识库的低运维默认，外部搜索可作为扩展。

**失败边界：**

- 只有语言菜单、没有页面级对应关系时，切换后下一次点击会回到英文。
- 只翻译搜索按钮而没有中文索引，仍找不到中文答案。
- 自动 sidebar 依赖文件名或 frontmatter；改名后没有 canonical ID、重定向和链接检查会使外部链接失效。

**采用建议：** 继续由单一顺序源生成 prev/next，同时建立语言对应表；站点路由由构建脚本生成，不能靠字符串替换猜链接。

### 4.4 Astro Starlight：同名页面、fallback 和搜索索引

**事实（R5）：**

- Starlight 将 src/content/docs 作为页面源、src/content/i18n 作为 UI 翻译数据、public 作为不经处理的静态资产。
- i18n 有 locales 和 defaultLocale，并支持 root locale；同名文件用于关联不同语言页面。
- 语言页面缺失时可回退到 defaultLocale，并显示未翻译提示。
- sidebar 可自动从文件系统生成，也可手工分组；frontmatter 可控制 label、order、badge 和 hidden。
- 默认全文搜索由 Pagefind 提供；页面或页面局部可以显式排除出索引。
- 外部 DocSearch 插件的 UI 可能仍是英文，需要扩展翻译 schema。

**价值机制（推断）：**

- fallback 允许先发布默认语言，再按页面渐进翻译。
- 未翻译提示避免读者把 fallback 误认为已审校内容。
- 同名页面映射比翻译标题更稳定，适合本项目语言切换和跨语言页脚。

**失败边界：**

- fallback 可能被误读为目标语言，因此必须同时显示语言状态和原文来源。
- Pagefind 要在构建时更新，新增页面未重新构建前不会进入生产搜索。
- UI 翻译、正文翻译、搜索 UI 翻译和图片内文字是不同工作项。

**采用建议：** 借鉴“默认英文 + 逐页补齐 + 未翻译提示”，同时保留文件名语言后缀和语言状态，让 GitHub 原始文件和静态站点都可审计。

### 4.5 MCP：规范、实现、schema、Inspector 和治理

**事实（R6）：**

- MCP 仓库按日期保存文档版本，如 2024-11-05、2025-03-26、2025-06-18、2025-11-25、2026-07-28，并保留 draft。
- docs/docs.json 集中声明导航 tabs、版本、页面、SEO 和重定向；schema 目录也按日期保存 JSON、TypeScript 和示例。
- versioning 文档说明 YYYY-MM-DD 版本标识；只有不兼容变化才改变版本；初始化阶段协商，客户端和服务器要为会话选择同一版本。
- debugging 文档将 Inspector、结构化日志、独立运行、目标客户端集成测试和错误码诊断放入同一流程。
- CONTRIBUTING.md 说明部分 schema/MDX 从 schema.ts 生成，不能直接手改生成文件；加新页面要更新 docs.json、检查链接和代码样例。
- SEP 指南要求理解问题、验证需求、做原型，再写规范提案。

**价值机制（推断）：**

- 规范版本和教程版本分开，读者能区分 current、final 和 draft。
- schema、示例、Inspector 和日志让教程能观察协议边界，而不止于概念描述。
- “先原型后规范”同样适用于 Skill/Agent 工作流：先证明输入输出，再抽象成方法。

**失败边界：**

- draft、latest 和 current 混用会让读者误以为是同一协议版本。
- 直接编辑生成 schema.json 或 schema.mdx 会在下次生成时丢失。
- Inspector 能调用工具不等于目标客户端、授权、网络和生产权限都通过。
- 协议协商失败是应被识别的边界，不是不断重试的理由。

**采用建议：** Skill 页面同时提供定义文件、最小运行器、输入/输出 schema、观察日志、边界错误和目标环境差异；自动生成的索引、导航和示例标记源文件与生成命令。

### 4.6 Claude Code：产品入口与快速变化的 changelog

**事实（R7）：**

- 仓库 README 将 Claude Code 定位为理解代码库、执行例行任务和处理 Git 工作流的终端/IDE 工具，并把完整说明指向独立官方文档站。
- 仓库入口包括安装方式、plugins 目录、反馈/Issue；CHANGELOG 记录版本、功能变化和修复。
- LICENSE.md 采用 Anthropic 商业条款，不是可按 MIT/Apache 复制教程和品牌资产的开源文档仓库。

**价值机制（推断）：**

- 产品学习入口与实现仓库可以分离；研究时必须把官方文档、changelog 和源码分开记录。
- changelog 适合发现权限、Windows、上下文、MCP、插件和会话恢复等失败模式，但一条修复记录不是完整复现教程。

**失败边界：**

- README 的产品描述不是完整操作手册；官方文档站需单独核对。
- “fixed”只能证明项目记录了修复，不能证明读者环境已无问题。
- 商业条款意味着不能下载页面截图、复制品牌表达或打包产品内容。

**采用建议：** 只保留公开可引用的机制摘要和失败模式；产品事实卡标记易变并按日期复核。若未来建立 Claude Code 项目，应共享证据、案例、术语和版本登记方法，而非共享未经许可的正文。

### 4.7 OpenAI Codex：按风险面拆分文档

**事实（R8）：**

- Codex 仓库 docs 按 getting-started、install、authentication、config、sandbox、exec、execpolicy、skills、slash_commands、contributing 等风险面拆分。
- docs/skills.md 将 Skill 说明指向官方开发文档，说明仓库源代码与产品教程不是一套完整正文。
- CONTRIBUTING.md 要求先通过 Issue 讨论，再补测试、文档和原子提交；未被明确邀请的 PR 可能不接受。
- 指南强调测试失败、权限/安全边界和用户可见行为的文档更新，而不只是代码编译。

**价值机制（推断）：**

- 按风险面拆文档更符合新手提问：“怎么安装、为什么被拒绝、沙盒有什么限制”比内部模块名更可检索。
- 贡献门槛本身也是知识库内容：它教读者复现问题、提出高质量报告和避免无效 PR。

**失败边界：**

- 仓库 docs 不代表所有产品表面；CLI、IDE、Web 和官方站点可能有不同入口和版本。
- 有源码或测试不等于用户配置正确；认证、权限、网络、沙盒和外部服务需分开验证。
- “已提交”“CI 通过”“已合并”是不同状态，不能混用。

**采用建议：** 将安全、权限、沙盒、外部写入、Git 推送、浏览器、认证和模型选择作为独立可搜索主题，并明确允许动作、确认人、证据和停止条件。

### 4.8 WorkBuddyGuide：蓝皮书、案例集和帮助入口

**事实（R9）：**

- VitePress 配置包含首页、开始阅读、案例集、帮助、阅读指南和社区入口，并启用本地搜索、clean URLs、lastUpdated、SEO 和图片懒加载。
- sidebar.ts 将蓝皮书按篇、章和附录组织，并把案例、帮助和阅读指南作为独立内容域。
- CASE_TEMPLATE.md 要求场景、目标、Skill、前置条件、步骤、指令、结果、验收、问题、安全限制和复用。
- 配置使用中文站点语言；仓库有 README_en，但该 revision 的站点配置不能证明已经有完整六语言页面矩阵。

**价值机制（推断）：**

- 蓝皮书负责系统学习，案例集负责迁移检索，帮助负责按问题进入；这比所有内容塞入章节更友好。
- Case 模板把提示词降级为任务协议的一部分，要求输入、权限、验收和风险。
- 图片和本地搜索提高可读性，但真正价值来自案例字段完整、可复现和可迁移。

**失败边界：**

- 案例截图不等于运行证据；不能从一张图推断版本、权限、输入质量和维护周期。
- 根目录 MIT 不自动覆盖外部字体、图片、品牌、第三方组件和投稿内容。
- README 英文入口和站点中文默认配置是两件事；不能用 README_en 代表全站英文。

**采用建议：** 采用“学习书 + 案例库 + 故障/帮助库 + 贡献指南”分域结构；案例进入正式章节前先经过脱敏、复现、验收、许可和重复检查。

## 5. 常见教程没有讲清的核心机制

以下内容是基于多个来源的结构事实作出的项目设计推断，不是任何单个外部项目的原文规则。

### 5.1 导航源、正文源、路由源、翻译源不是同一个东西

一个页面至少有四种身份：

~~~text
canonical capability id
├─ source file: lesson-EN.md / lesson-ZH.md
├─ route: /en/lesson /zh-cn/lesson
├─ navigation position: chapter 03, previous/next
└─ evidence/version: source revision + fact review date
~~~

只用文件名，改名会破坏链接；只用标题，翻译会破坏映射；只用 URL，版本和语言切换会丢失上下文。建议在本项目导航 YAML 中为每个能力保留稳定 ID、语言文件、路由、章节位置和内容状态。

### 5.2 有翻译文件不等于语言切换完整

完整切换至少覆盖：

- 首页和导航标签；
- 当前页正文；
- 章节上一页/下一页；
- 页内相对链接；
- FAQ、案例、图片说明和 alt 文本；
- 搜索 UI 和搜索索引；
- 404、重定向、分享 URL 和 sitemap/hreflang；
- 版本选择、状态徽章和未翻译提示。

**推断：** 文件名语言后缀是有价值的审计信号，但不能单独提供运行时切换。必须增加语言映射表和本地链接校验：ZH 页面中的“书”“案例”“下一章”只能解析到 ZH 对应文件，缺失时明确显示 fallback 或 migration pending。

### 5.3 fallback 是可用性策略，不是翻译质量证明

默认英文、其他语言逐页补齐的设计很实用，但必须区分：

- translated：已翻译并经过该语言审校；
- fallback：目标语言缺失，显示默认语言正文；
- migration pending：目标语言文件尚未迁移；
- stale：目标语言存在，但落后于英文源的结构或事实版本；
- unavailable：没有可安全展示的对应页。

页面上的语言标签应与内容状态同时展示。否则“点了中文仍看到英文”会被理解为系统坏了，或误以为英文已完成中文审校。

### 5.4 搜索不是一个输入框，而是一组索引契约

可用知识库搜索结果至少应带：

~~~text
query
→ locale
→ content type: chapter / lab / case / failure / FAQ / reference
→ product surface: model / Codex / Skill / tool / Agent / MCP
→ version or fact review date
→ status: candidate / verified / stale
→ result URL
~~~

没有这些字段，搜索会返回主题相似但语言、版本或状态错误的答案。Docusaurus contextual search、VitePress locale search 和 Starlight Pagefind 排除字段共同说明：索引范围和过滤条件是内容架构的一部分。

### 5.5 失败边界要成为可导航内容类型

“常见问题”不应只是文章末尾的补充，而应是可搜索的失败卡：

| 字段 | 要回答的问题 |
| --- | --- |
| 症状 | 工具未出现、路径错误、权限被拒、输出为空？ |
| 最小复现 | 只保留一个项目、一个输入和一个命令能否重现？ |
| 可能层级 | 模型、上下文、工具、权限、网络、版本、外部服务？ |
| 观察证据 | 日志、命令输出、页面状态、版本、文件差异？ |
| 安全动作 | 是否可重试；是否会写文件、发请求或推送？ |
| 停止条件 | 何时不能继续，何时需要人工或管理员？ |
| 恢复路径 | 回滚、只读实验、缩小输入、升级或改配置？ |
| 适用范围 | 操作系统、客户端、版本、语言？ |

这是教程从“好看”变成“有用”的分水岭。

### 5.6 生成物必须可追溯到一个源

导航页脚、目录、语言切换表、搜索索引、事实卡和版本列表都可能是生成物。每个生成物应记录：

- 源文件；
- 生成命令；
- 源 revision；
- 校验器；
- 是否允许手工编辑。

MCP 的 schema 生成规则给出了典型边界：直接编辑生成文件可能暂时正确，但下一次生成会覆盖它。

## 6. 如何把内容做成真正有工作价值的干货

### 6.1 用能力包替代泛泛章节

建议把每章拆成若干可独立搜索、学习和迁移的能力包：

~~~text
能力包
├─ 真实问题
├─ 机制解释
├─ 输入契约
├─ 最小实验
├─ 正例输出
├─ 故意失败
├─ 验收和证据
├─ 真实工作迁移
├─ 安全/权限/成本边界
├─ 版本与语言状态
└─ 来源与维护责任
~~~

例如“制作一个卖房中介 Skill”不能只展示网页截图，还应说明：

- 输入是脱敏房源 brief 还是实时房产数据；
- Skill 是否能访问文件、浏览器、外部 API 或 CRM；
- 输出是文案草稿、网页静态 mockup 还是已发布页面；
- 验收是否检查事实、价格、地址、图片授权和移动端布局；
- 哪些动作必须人工批准；
- 如何迁移到招聘、课程或产品营销。

### 6.2 用四类证据定义学会

每个能力包的完成标准：

1. 解释证据：能说明机制和边界，而非复述提示词。
2. 操作证据：能在声明环境中完成实验。
3. 判断证据：能在两个方案或输出之间说明取舍。
4. 审查证据：能发现错误、幻觉、权限越界、未完成动作或过期事实。

只有截图最多是展示证据；只有构建通过最多是工具链证据；模型说“完成了”不是验收证据。

### 6.3 实战案例、实验和 FAQ 的组合

| 内容类型 | 解决的问题 | 最小交付 |
| --- | --- | --- |
| Chapter | 建立概念和顺序 | 概念、实验、失败、验收 |
| Lab | 练习一个机制 | 输入、步骤、预期观察、清理 |
| Case | 证明能迁移到工作 | 场景、产出、验收、风险 |
| Failure clinic | 处理真实阻塞 | 症状、最小复现、诊断树、恢复 |
| FAQ | 缩短查找时间 | 一句话答案 + canonical 链接 |
| Reference card | 固定边界 | 参数、版本、来源、更新时间 |
| Migration card | 换工具或版本 | 差异、兼容性、回滚 |
| Contribution guide | 让知识继续增长 | 模板、验证、许可、发布门槛 |

FAQ 不应复制整篇正文，只负责把症状送到 canonical 页面并标明适用范围。

## 7. 对本项目的结构建议

### 7.1 推荐逻辑目录

这是根据 R1–R9 的结构事实作出的设计建议，不是复制外部仓库：

~~~text
README.md                         # 英文默认门面，显示项目地图与状态
README-ZH.md / README-ZH-TW.md    # 明确语言归属的入口
README-JA.md / README-KO.md / README-ES.md

docs/
├─ project-map-<LANG>.md          # 文件用途和找答案路径
├─ research/                      # 外部基准、事实和论坛问题
├─ sources/
│  ├─ asset-register.md           # 来源/许可/资产边界
│  └─ fact-register.yaml          # 易变事实的 owner/review
├─ governance/
│  ├─ book-navigation.yaml        # 唯一章节与能力顺序源
│  ├─ locale-matrix.yaml          # 页面、语言、状态、fallback
│  ├─ version-ledger.yaml         # 产品/协议/实验版本
│  └─ content-status.yaml         # draft/candidate/verified/production-ready
├─ cases/
│  ├─ index-EN.md / index-ZH.md
│  └─ <case-id>-<LANG>.md
├─ failures/
│  ├─ index-EN.md / index-ZH.md
│  └─ <symptom-id>-<LANG>.md
└─ reference/
   ├─ faq-<LANG>.md
   ├─ glossary-<LANG>.md
   └─ migration-<LANG>.md

book/
├─ 00-foundation/
├─ 01-real-work/
├─ 02-skills-and-tools/
├─ 03-agents-and-teams/
└─ 04-governance-and-maintenance/

examples/
├─ labs/                          # 低风险、可清理的实验
├─ skill-sandbox/                # 一次性本地沙盒与截图
└─ fixtures/                     # 脱敏输入和可重复验收

scripts/
├─ build_book_navigation.py
├─ validate_book_navigation.py
├─ validate_localization.py
├─ validate_fact_impact_registry.py
├─ check_local_links.py
└─ build_learning_path_site.py
~~~

重点不是目录名称，而是每类内容只有一个归属：研究报告不混进正文，实验输入不混进生产配置，生成页脚不成为章节顺序的唯一来源。

### 7.2 六语言支持的现实方案

成熟文档站普遍采用 locale 路径或 locale 目录；本项目还要求文件名显式语言后缀，因此建议“双重显式”：

1. 文件名：lesson-EN.md、lesson-ZH.md、lesson-ZH-TW.md、lesson-JA.md、lesson-KO.md、lesson-ES.md。
2. canonical ID：所有语言共享同一个能力 ID，不从翻译标题推导。
3. 语言映射：locale-matrix.yaml 明确文件、状态、源 revision 和审校时间。
4. 页面路由：构建时生成 /en/、/zh-cn/、/zh-tw/、/ja/、/ko/、/es/。
5. 内链规则：本地链接检查器拒绝 ZH 页面指向 EN 正文，除非明确标为官方外部来源或 fallback。
6. 缺失规则：只能显示 migration pending/fallback 提示，不能静默跳回英文。
7. 搜索规则：索引含 locale；中文页搜索优先返回中文，并能显式切换英文来源。
8. 发布规则：英语先发布不代表其他语言完成；首页显示覆盖率和未翻译状态。

这比首页增加六个链接更完整，因为它解决了“切换中文后第二次点击又回英文”的路径一致性问题。

### 7.3 版本和实时内容

| 内容层 | 例子 | 更新策略 |
| --- | --- | --- |
| 稳定原则 | 上下文有边界、工具有副作用、结果需要验收 | 章节长期维护，结构变化才改版本 |
| 易变事实 | 模型名、CLI 参数、价格、权限、协议当前版 | fact card + URL + access date + scope + owner + next review |
| 实验结果 | 本地截图、构建输出、工具行为 | 记录环境、时间、fixture 和状态，不能泛化 |

不要把实时产品事实埋在长篇章节中。章节解释“如何判断”，事实卡记录“当前是什么”。

### 7.4 贡献和发布门槛

贡献模板至少包含：

- 新增能力、事实更新、案例、故障还是翻译；
- 对应 canonical ID 和语言；
- 问题、场景、最小复现；
- 预期与实际；
- 可公开证据；
- 版本、系统、工具和权限范围；
- 外部资产、第三方代码和个人数据说明；
- 验收清单和未验证事项；
- 是否需要更新导航、索引、重定向或翻译；
- 回滚或撤回方式。

发布前最小门槛：

1. 本地链接通过；
2. 章节导航生成器和校验器通过；
3. locale 目标页和跨语言链接通过；
4. 易变事实有来源和访问日期；
5. 案例已脱敏，实验能清理外部副作用；
6. 图片有来源/许可或明确是项目原创；
7. 内容状态准确，不能把 candidate 写成 verified；
8. 至少检查一个正例、一个失败例和一个迁移例。

## 8. 不要做清单

- 不要只用 README 充当完整教程；README 是门面和路由，不是全部知识库。
- 不要分别手工维护章节目录、sidebar、页脚、语言切换和搜索索引。
- 不要用翻译标题或 slug 作为跨语言主键。
- 不要用 README_en 证明全站英文，也不要用六个入口证明六语言完成。
- 不要把 fallback 当成翻译完成。
- 不要把截图当成运行、授权、事实或生产交付证据。
- 不要把构建通过当成模型输出正确。
- 不要把外部仓库根许可证扩展到图片、字体、品牌、截图、投稿和第三方依赖。
- 不要直接改自动生成文件而不更新源文件。
- 不要把官方文档、社区 workaround、个人实验和项目结论放在同一证据等级。
- 不要把工具已安装、账户已登录写成整个工作流已验证。
- 不要为了版本数量复制一套长期无法维护的旧文档。

## 9. 实施优先级

### P0：先保证找得到且不误导

- 继续使用唯一章节顺序源；
- 给每个能力建立稳定 ID；
- 建立六语言 locale matrix 和文件名审计；
- 页面显示状态、语言、版本和来源；
- 搜索、页脚、目录和语言切换从同一映射生成；
- 把失败卡和 FAQ 放入可搜索索引。

### P1：再保证读完能做

- 将每章拆成能力包；
- 每个能力包加入正例、边界例、失败例、验收和迁移；
- 为 Skill、MCP、Agent、权限和外部工具做最小可观察实验；
- 为真实工作案例提供脱敏 fixture 和一次性沙盒；
- 图片只表达机制、状态、差异或结果，不用装饰图代替证据。

### P2：最后保证团队能维护

- 建立 fact register、版本登记、重定向表和责任人；
- 为贡献、翻译、案例和故障分别提供模板；
- 为生成物提供源文件、生成命令和校验器；
- 发布前运行链接、导航、locale、事实和实验清单；
- 记录未验证项和下一次复核日期。

**最终判断：** 值得收藏和点星的 Codex 知识库，应在三种状态下都能帮助读者：第一次接触时知道从哪开始，正在工作时按症状找到解决路径，准备把方法交给团队时获得带版本、证据、权限和维护边界的可复用资产。外部项目分别证明了线性书、文档站、版本化规范、案例模板和调试工具的价值；本项目的独特任务，是把它们组成面向真实工作交付的闭环。

## 10. 来源清单与可复核定位

以下链接均为本次实际访问或通过官方 GitHub API 读取的公开来源，访问日期统一为 2026-08-11。仓库链接附固定 commit，文档链接用于定位机制。

### R1 — Rust Book

- 固定快照：[917544888a55e4da7109bdba8c88c893c0da70f4](https://github.com/rust-lang/book/tree/917544888a55e4da7109bdba8c88c893c0da70f4)
- 章节顺序：[src/SUMMARY.md](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/SUMMARY.md)
- 构建配置：[book.toml](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/book.toml)
- 构建、测试和翻译：[README.md](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/README.md)
- 翻译入口：[appendix-06-translation.md](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/appendix-06-translation.md)
- 许可：[LICENSE-APACHE](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/LICENSE-APACHE)、[LICENSE-MIT](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c893c0da70f4/LICENSE-MIT)

### R2 — mdBook

- 固定快照：[b90df240a318da0c59ec3efe6b75a58f63c6c459](https://github.com/rust-lang/mdBook/tree/b90df240a318da0c59ec3efe6b75a58f63c6c459)
- 项目说明、User Guide、许可：[README.md](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/README.md)
- 贡献与许可：[CONTRIBUTING.md](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/CONTRIBUTING.md)、[LICENSE](https://github.com/rust-lang/mdBook/blob/b90df240a318da0c59ec3efe6b75a58f63c6c459/LICENSE)

### R3 — Docusaurus

- 固定快照：[3f483e80e326cc646b54b83d564b3f0c4881b9a6](https://github.com/facebook/docusaurus/tree/3f483e80e326cc646b54b83d564b3f0c4881b9a6)
- Docs 结构：[docs-introduction.mdx](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docs/guides/docs/docs-introduction.mdx)
- 版本：[versioning.mdx](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docs/guides/docs/versioning.mdx)
- 国际化：[i18n-introduction.mdx](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docs/i18n/i18n-introduction.mdx)
- 搜索：[search.mdx](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docs/search.mdx)
- 许可：[LICENSE](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/LICENSE)、[LICENSE-docs](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/LICENSE-docs)

### R4 — VitePress

- 固定快照：[db28226b9a092a6510672d75527d55e7fe78e879](https://github.com/vuejs/vitepress/tree/db28226b9a092a6510672d75527d55e7fe78e879)
- 国际化：[i18n.md](https://github.com/vuejs/vitepress/blob/db28226b9a092a6510672d75527d55e7fe78e879/docs/en/guide/i18n.md)
- 上一页/下一页：[default-theme-prev-next-links.md](https://github.com/vuejs/vitepress/blob/db28226b9a092a6510672d75527d55e7fe78e879/docs/en/reference/default-theme-prev-next-links.md)
- 搜索：[default-theme-search.md](https://github.com/vuejs/vitepress/blob/db28226b9a092a6510672d75527d55e7fe78e879/docs/en/reference/default-theme-search.md)
- 许可：[LICENSE](https://github.com/vuejs/vitepress/blob/db28226b9a092a6510672d75527d55e7fe78e879/LICENSE)

### R5 — Astro Starlight

- 固定快照：[656ffd54e5b27483f542c9eb8b12fd32f44372ae](https://github.com/withastro/starlight/tree/656ffd54e5b27483f542c9eb8b12fd32f44372ae)
- 项目结构：[project-structure.mdx](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/docs/src/content/docs/guides/project-structure.mdx)
- 国际化与 fallback：[i18n.mdx](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/docs/src/content/docs/guides/i18n.mdx)
- sidebar：[sidebar.mdx](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/docs/src/content/docs/guides/sidebar.mdx)
- 搜索：[site-search.mdx](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/docs/src/content/docs/guides/site-search.mdx)
- 许可：[LICENSE](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/LICENSE)

### R6 — Model Context Protocol

- 固定快照：[b25c0874bf0ba699a58e21ef06f659d839659de3](https://github.com/modelcontextprotocol/modelcontextprotocol/tree/b25c0874bf0ba699a58e21ef06f659d839659de3)
- 仓库入口：[README.md](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/README.md)
- 导航与版本：[docs/docs.json](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/docs/docs.json)
- 版本规则：[versioning.mdx](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/docs/docs/2025-11-25/learn/versioning.mdx)
- 调试：[debugging.mdx](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/docs/docs/2026-07-28/tools/debugging.mdx)
- 贡献与生成物：[CONTRIBUTING.md](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/CONTRIBUTING.md)
- 许可迁移：[LICENSE](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/LICENSE)

### R7 — Claude Code

- 固定快照：[681a8be245e7759a405e276b16ae69ea6b75076f](https://github.com/anthropics/claude-code/tree/681a8be245e7759a405e276b16ae69ea6b75076f)
- 仓库入口：[README.md](https://github.com/anthropics/claude-code/blob/681a8be245e7759a405e276b16ae69ea6b75076f/README.md)
- 版本变化：[CHANGELOG.md](https://github.com/anthropics/claude-code/blob/681a8be245e7759a405e276b16ae69ea6b75076f/CHANGELOG.md)
- 官方文档入口：[code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)
- 许可：[LICENSE.md](https://github.com/anthropics/claude-code/blob/681a8be245e7759a405e276b16ae69ea6b75076f/LICENSE.md)

### R8 — OpenAI Codex

- 固定快照：[b43de77679faa53b3bc39d1b72441b24d9d8f428](https://github.com/openai/codex/tree/b43de77679faa53b3bc39d1b72441b24d9d8f428)
- docs 目录：[docs](https://github.com/openai/codex/tree/b43de77679faa53b3bc39d1b72441b24d9d8f428/docs)
- Skill 入口：[skills.md](https://github.com/openai/codex/blob/b43de77679faa53b3bc39d1b72441b24d9d8f428/docs/skills.md)
- 贡献流程：[contributing.md](https://github.com/openai/codex/blob/b43de77679faa53b3bc39d1b72441b24d9d8f428/docs/contributing.md)
- 许可：[LICENSE](https://github.com/openai/codex/blob/b43de77679faa53b3bc39d1b72441b24d9d8f428/LICENSE)

### R9 — WorkBuddyGuide

- 固定快照：[abd61e82188fc57ef542756312e06175fc70b8b0](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0)
- VitePress 配置：[config.mts](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts)
- sidebar：[sidebar.ts](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts)
- Case 模板：[CASE_TEMPLATE.md](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/CASE_TEMPLATE.md)
- 贡献与许可：[CONTRIBUTING.md](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/CONTRIBUTING.md)、[LICENSE](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/LICENSE)

## 11. 研究局限

- 本报告读取公开静态结构和官方文档，不是完整的浏览器可用性、屏幕阅读器、移动端、搜索召回率或真实新手完成率测试。
- GitHub 默认分支会继续变化；结论绑定到表中的 revision。
- “更容易找到答案”“更有工作价值”是结构推断，除非来源明确写出机制，否则不能当作用户研究结论。
- 论坛、Issue 和社区案例通常只证明报告者的环境和现象；进入正式章节前仍需要最小复现、版本、证据和许可审查。
- 外部项目许可证只说明其明确覆盖的内容；本项目没有复制外部正文、代码、图片、字体、品牌或第三方资产。
