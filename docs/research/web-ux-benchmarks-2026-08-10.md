# 同类项目与展示体验研究：AI / Codex / Agent 教程与 Labs

**研究日期：** 2026-08-10
**研究状态：** candidate；本报告记录公开页面的结构观察和设计推断，不是用户测试、转化分析或品牌相似度结论。
**研究范围：** 公开 GitHub 仓库 README、目录页、单课页和项目自有学习落地页。只观察信息架构、页面层级、导航、练习/证据入口、贡献与许可提示；不复制原文、代码、图片、徽章或品牌资产。

## 先给结论

用户愿意收藏或点星高质量教程仓库，通常不是因为仓库“看起来像课程”，而是因为它在首次访问时同时给出四种可预期价值：

1. **可定位：** 读者能迅速回答“我从哪里开始”“我现在适合哪一层”“我想解决的任务在哪”。
2. **可执行：** 内容指向可运行的 notebook、code sample、lesson 或外部实验环境，而不是只有概念文章。
3. **可积累：** 目录能够从基础概念走到框架、模式、生产问题、评测或最终项目，收藏后仍有长期回访价值。
4. **可判断：** 页面暴露 prerequisites、学习目标、测试/评测、课程进度、失败边界、贡献方式或更新信号，降低“读完仍不知道是否会了”的风险。

GitHub 的 star/fork 数量只能说明公开采用或传播信号，不能证明教学质量，更不能单独证明某个界面设计导致点星。本次页面快照中，样本的可见 star 信号大致为：OpenAI Cookbook 75.2k、Microsoft AI Agents for Beginners 71.8k、Anthropic Claude Cookbooks 51.2k、GitHub Awesome Copilot 37.7k、Hugging Face Agents Course 30.9k；这些数字会变化，应视为 2026-08-10 的观察值，而不是稳定指标。

最值得本项目原创吸收的模式是：

```text
任务入口 → 能力等级 → 单元目标 → 小实验 / 实战 → 失败变体 → 证据与验收 → 下一步 / 迁移
```

这与本项目已经定义的“问题、概念、决策、行动、证据、失败、反思”一致；需要补强的是公开展示层对“全部入口、单课阅读、实验状态和证据”的直接呈现。

## 样本与可观察结构

| 样本 | Repo / page URL | 访问日期 | 可观察结构 | 为什么值得收藏的可检验推断 |
|---|---|---|---|---|
| OpenAI Cookbook | [repo](https://github.com/openai/openai-cookbook)；[Cookbook 页面](https://cookbook.openai.com/) | 2026-08-10 | 仓库 README 把外部 Cookbook 页面作为主要导航；落地页按 Topics、Agents、Evals、Multimodal、Text、Guardrails、Optimization 等能力主题组织，另有 Featured、Popular、All、筛选和搜索；条目带主题标签与日期。 | 读者可以把它当“可回访的 recipe 索引”，按问题而不是按提交历史找内容；Featured/Popular 先降低选择成本，All/Filter 保留深度检索路径。页面同时把 Codex、Agents SDK 和 evals 放进同一检索层，形成跨工具的相关内容发现。 |
| Hugging Face Agents Course | [repo](https://github.com/huggingface/agents-course)；[Unit 0](https://huggingface.co/learn/agents-course/en/unit0/introduction)；[Unit 4](https://huggingface.co/learn/agents-course/en/unit4/introduction) | 2026-08-10 | README 直接列出 Unit 0–4、bonus units、框架分支、Observability/Evaluation 与 final project；外部课程页有固定侧栏、当前 unit/lesson、页内目录、语言切换、GitHub 更新入口、前后导航；Unit 0 显式介绍 syllabus、prerequisites、pace、audit/certification、challenge/leaderboard；Unit 4 将学习结果接到 benchmark/challenge。 | 起点、路线、时间投入、完成定义和最终证明在首次课程页中都可见；读者既能自学，也能选择认证/挑战路径。课程结构把“理论 → 框架 → 用例 → 评测/挑战”分成可记忆的阶段，收藏后容易继续。 |
| Microsoft AI Agents for Beginners | [repo](https://github.com/microsoft/ai-agents-for-beginners)；[Lesson 1](https://github.com/microsoft/ai-agents-for-beginners/tree/main/01-intro-to-ai-agents)；[Lesson 6](https://github.com/microsoft/ai-agents-for-beginners/tree/main/06-building-trustworthy-agents) | 2026-08-10 | 根 README 提供 18 lessons、50+ 翻译、Course Setup、社区入口和“每课包含什么”；根目录按 `00-course-setup`、`01`–`18` 递进；单课页通常组合视频缩略图、written lesson、learning goals、code_samples、extra resources、前后课链接；仓库还公开 tests、smoke-test JSON、scripts、SECURITY、SUPPORT。 | “课程是什么、如何开始、每课有什么、怎么运行、遇到问题去哪”被压缩进同一个入口；lesson 目录名本身就是能力路线。安全、生产、浏览器使用、记忆、部署等后段内容使仓库不止是入门材料，而是可持续参考。 |
| Anthropic Claude Cookbooks | [repo](https://github.com/anthropics/claude-cookbooks) | 2026-08-10 | README 用 recipe table 按 Capabilities、Tool Use and Integration、Third-Party Integrations、Multimodal Capabilities、Advanced Techniques 分类；每类链接到目录或具体 notebook；README 提供 prerequisites、课程/文档/社区的下一步、贡献入口；仓库根目录也把 `capabilities`、`claude_agent_sdk`、`coding`、`evals` 等分开。 | “我想做什么”与“我需要哪种能力”之间的映射短而明确；具体 notebook 名称让读者可以先判断相关性，再进入代码。贡献说明和重复工作检查降低了参与门槛，也让仓库保持可维护的索引感。 |
| GitHub Awesome Copilot | [repo](https://github.com/github/awesome-copilot)；[website](https://awesome-copilot.github.com/)（README 指向） | 2026-08-10 | README 将 Agents、Instructions、Skills、Plugins、Cookbook 分成资源类型，另设 Learning Hub；仓库包含 `agents`、`instructions`、`skills`、`plugins`、`cookbook`、`docs`、`website`，并提示网站提供全文搜索、过滤、Learning Hub 和机器可读 `llms.txt`；同时提醒第三方资源安装前要检查。 | 先按“资源形状”分类，再按任务检索；安装入口与阅读入口分开，降低把“看见资源”误当成“已验证可安装”的风险。机器可读索引和网站搜索也让人类读者、工具和 Agent 共享同一个目录合同。 |

### 一个失效候选：不纳入结论

`https://github.com/skills/skills` 在 2026-08-10 返回 GitHub “Page not found”，因此没有将它作为 GitHub Skills 展示样本，也没有根据名称推断其结构。能否访问、是否存在和页面是否有内容，必须以当天直接证据为准。

## 信息架构比较

### 1. 起点：从“项目说明”转成“下一步选择”

- OpenAI Cookbook 的仓库 README 很短，把用户导向更适合阅读的 Cookbook 页面；落地页再提供搜索、专题、精选和全部内容。
- Hugging Face 的 Unit 0 不是一篇普通序言，而是 onboarding：它同时解释 syllabus、工具、节奏、认证/审计和社区。
- Microsoft 的 `00-course-setup` 和根 README 将配置要求放在课程前面，减少读者进入 Lesson 1 后才发现账户、框架或运行环境不满足的情况。
- Anthropic 的 README 先声明 API key、Python/跨语言假设，再把新手导向基础课程。

**可迁移原则：** 首页首屏必须提供一个“现在就做什么”的入口，旁边同时显示前置条件和预计产物。对本项目，应把“第一个安全任务”与“先读什么/不需要什么权限”绑定，而不是只显示章节数量。

### 2. 渐进：按能力或学习阶段组织，而非只按文件类型

- Hugging Face 使用 Unit、bonus unit、框架分支、use case 和 final project 形成阶段性路线。
- Microsoft 用编号目录把基础、设计模式、工具、RAG、可信、安全、生产、部署和本地 Agent 排成路线；目录名称本身就承担导航语义。
- OpenAI 与 Anthropic 更偏能力索引：同一主题下可并列 recipe，适合任务驱动回访，不强迫读者从头读完。
- GitHub Awesome Copilot 以 Agents/Instructions/Skills/Plugins/Cookbook 先做资源类型分层，再用网站搜索和 Learning Hub 承接学习路径。

**可迁移原则：** 同时提供两条路：

1. **推荐路：** L0–L6 或“概念 → 操作 → 评测 → 团队”的递进路线。
2. **任务路：** 按“我想完成什么”查章节、实验、Skill 和证据模板。

二者必须互相链接；任务跳读不能丢失前置条件、状态和验证闭环。

### 3. 实战：把“阅读页”做成可执行单元

Microsoft 单课页显示 learning goals、代码样例、视频、额外学习资源、前后课；Anthropic 直接把具体 notebook 作为 recipe；Hugging Face 进一步把 hands-on、Spaces、assignments 和 challenge 分开；OpenAI Cookbook 页面用 recipe 卡片让读者先判断题目与标签，再进入内容。

**可迁移原则：** 每个章节/实验卡片至少暴露：目标、输入/前置、动作、可见产物、失败变体、验收方式和下一步。不要让读者仅凭“打开一个 Markdown 文件”来推断这些信息。

### 4. 失败与安全：让边界成为内容，而不是脚注

- Microsoft 直接把 Building Trustworthy AI Agents、Security、tests、smoke tests 和 SUPPORT 放入课程结构。
- Hugging Face 的 onboarding 说明 audit/certification 的不同路径，Unit 4 把最终挑战和 benchmark 作为完成环节。
- GitHub Awesome Copilot 明确提醒第三方资源安装前需要检查；它还把安装插件的操作说明与资源目录分开。
- OpenAI Cookbook 以 Evals、traces、agent improvement 等专题让“效果如何判断”进入内容导航，而不只留在代码内部。

**可迁移原则：** 失败不是一个装饰性的“Troubleshooting”区块，而应在索引卡片中作为状态和证据的一部分。对于本项目，`failure`、`evidence`、`blocked` 应与 `draft/candidate/verified/production-ready` 并列显示，但不能互相冒充。

### 5. 视觉呈现：克制的索引密度优先于装饰

本次观察到的高质量入口大多依靠这些低成本视觉信号：编号、专题标签、侧栏当前状态、页内目录、前后导航、卡片摘要、代码/视频/额外资源的固定位置、语言切换和搜索/过滤。它们的共同点是让用户预判“点击后会得到什么”，而不是依靠大图或复杂动画制造高级感。

**可迁移原则：** Prysai 的原创视觉应服务于定位和证据：使用稳定的颜色语义区分 level/status/evidence，使用少量卡片与细线建立层级，保证中文和英文在窄屏上仍可扫读；不需要复制任何样本的配色、吉祥物、插画、字体、徽章、图标或页面文案。

## 为什么用户会收藏 / 点星：行为假设与证据边界

以下是基于页面结构与公开采用信号的设计假设，不是因果证明：

| 用户动机 | 页面如何降低成本 | 对本项目的启示 |
|---|---|---|
| “我以后会回来查一个具体问题” | 能力/任务分类、搜索、过滤、recipe 名称、标签与稳定 URL | 为章节、实验、Skill、证据模板提供一致的短标题、状态和任务标签；收藏后能直接回到单元，而不是重新扫首页。 |
| “我能从零开始，而且不会被环境坑住” | Unit 0、Course Setup、prerequisites、账号/工具说明、首课入口 | 首屏给出安全的最小任务和前置条件；把需要外部服务、凭据和账户的内容标出来。 |
| “我能逐步变强，不只看一篇 Demo” | 编号 lesson、units、bonus、framework/use case/final project、L0–L6 类路线 | 将推荐路径和任务跳读并存；每一级写清能力目标与毕业证据。 |
| “我能判断代码是否真的有用” | code samples、notebooks、hands-on、benchmark、evals、tests、smoke tests | 实验卡片直接链接代码、运行记录和验收；把“页面存在”与“运行已验证”分开。 |
| “项目会持续维护，并且我可以参与” | 最近更新、贡献指南、issue/PR、社区、翻译、学习者反馈、机器可读索引 | 显示内容状态、来源日期、维护入口和更新责任；让贡献者知道应改哪个 canonical file。 |
| “我可以把它当工作参考，而不是一次性文章” | 生产、安全、观察性、评测、迁移和资源类型分层 | 把失败、证据、恢复和团队迁移作为一等内容，形成可重复使用的工作系统。 |

## 值得原创吸收的设计原则

### A. 首屏完成“选择”，而不是只完成“介绍”

建议首屏结构为：一句项目承诺 → 三个入口（第一次来 / 做真实任务 / 查证据与失败）→ 当前推荐 level → 一个可在 10–20 分钟完成的安全实验 → 前置条件和状态说明。

### B. 每个内容单元采用固定的“契约卡”

建议固定字段：

`problem` → `objective` → `level` → `prerequisites` → `action` → `artifact` → `failure` → `evidence` → `transfer` → `next`。

这样做的价值是让用户在打开正文前决定是否相关，也让站点可以用相同数据渲染章节、实验、Skill 和质量记录。

### C. 推荐路径与任务索引双向互通

推荐路径解决“我该学什么”；任务索引解决“我现在要解决什么”。卡片应显示 `primary / prerequisite / transfer / reference` 关系，点击任务后仍能返回所属 level 和前置章节。

### D. 把证据做成可扫描的视觉组件

不要只在文章底部写“已验证”。使用小型 evidence row 显示证据类别：解释、操作、判断、审查；再显示证据链接、日期和适用范围。没有运行时证据时，明确写 `candidate` 或 `not runtime-verified`。

### E. 失败路径与成功路径并排

每个实验至少有一个边界/失败变体，页面同时呈现“预期成功信号”和“停止/升级信号”。这会把项目的证据优先原则转化为可见体验，也避免把漂亮输出当成完成证明。

### F. 用更新地图支撑收藏价值

在易变事实、外部产品入口和实验依赖旁显示 checked date、scope、owner、next review 或 canonical source。收藏的价值不只是“以后还能找到”，还包括“以后回来时知道哪部分可能已经过期”。

### G. 视觉一致性服务于理解，不服务于模仿

可以原创使用：编号系统、状态芯片、细线网格、任务标签、进度轴、证据条、失败标记和中性编辑版式。应先验证对比度、中文换行、键盘焦点和 320/390px 行为，再决定是否增加动效或材质。

## 不要照搬：品牌、文字、图片与资产边界

本研究只抽象结构和行为原则，不构成对任何外部仓库内容的再许可。

- 不复制任何样本的 README 文字、课程段落、recipe 名称、代码、notebook、视频缩略图、插画、logo、吉祥物、图标、徽章、字体组合、CSS、页面截图或仓库目录的逐字命名。
- “MIT / Apache-2.0”等仓库级许可证，不自动覆盖其中引用的第三方图片、视频、外部课程、服务商品牌、模型名称、社区内容或嵌套资产；若未来要纳入任何具体素材，必须逐项检查 LICENSE/NOTICE、版权归属、商标政策、第三方条款和项目资产登记。
- OpenAI、Hugging Face、Microsoft、Anthropic、GitHub 及其产品名称/标志只能作为事实来源或外部链接使用，不应被排版成 Prysai 的背书、合作或官方认证。
- 本报告中的 star/fork、目录名称、页面层级和状态是 2026-08-10 的公开观察；它们会随仓库更新，不能直接写成长期稳定事实。
- 失效的 `github.com/skills/skills` 不应作为“GitHub Skills 官方页面”引用；不因仓库名或搜索联想补齐缺失事实。

本次没有新增外部可发行资产，也没有修改 `docs/sources/asset-register.md`；若未来从样本中引入具体文本、图像、代码或可再分发组件，必须先在资产登记中建立来源、许可证、归属、适配范围和验证状态。

## 建议改动的 site / 内容入口文件（本轮不修改）

按优先级列出建议目标；这是后续实施清单，不代表本轮已实现或已验证。

| 优先级 | 建议目标 | 建议改动 | 验收证据 |
|---|---|---|---|
| P0 | [`site/index.html`](../../site/index.html) | 将首屏入口从单一“打开章节”扩展为“第一次安全任务 / 按能力学习 / 查证据与失败”三路；把 `candidate` 边界、当前起点和前置条件放在入口附近。修正实验展示范围与实际入口的表述，避免“全部”超过可见卡片。 | 静态链接清单；首屏文字审查；320px/390px/桌面浏览器截图和键盘路径。 |
| P0 | [`site/content-catalog.json`](../../site/content-catalog.json) | 为章节、实验、Skill 增加统一的 `objective`、`level`、`prerequisites`、`artifact`、`failure`、`evidence`、`transfer`、`status` 或引用现有 canonical 字段；让站点可以渲染契约卡而不是手写摘要。 | 与 `book/chapters`、`book/labs`、`docs/skill-registry.md` 的数量和状态交叉校验。 |
| P0 | [`scripts/build_learning_path_site.py`](../../scripts/build_learning_path_site.py) | 将上面的内容契约纳入生成流程，保持 `site/learning-path-data.js` 为生成物；避免站点文案与治理文件各自维护 level、状态和入口。 | `--check`、项目验证、生成物 diff 审查。 |
| P1 | [`site/app.js`](../../site/app.js) | 增加按任务/能力/证据的筛选或分组；为卡片显示前置条件、实战产物、失败变体和下一步；保留语言切换，并让筛选状态可分享。补齐 tab 键盘模型、菜单 Escape、焦点返回和 reduced-motion 行为。 | 鼠标、键盘、屏幕阅读器语义、刷新/分享 URL、`prefers-reduced-motion` 检查。 |
| P1 | [`site/styles.css`](../../site/styles.css) | 建立状态/证据/level 的稳定视觉语义；提高中文辅助文字的字号、行高和对比度；为 evidence row、failure card、next-step card 建立克制的组件样式；补 `:focus-visible` 和窄屏布局。 | 桌面与 320/390px 截图；对比度、换行、无横向溢出、焦点可见性。 |
| P1 | [`book/table-of-contents-EN.md`](../../book/table-of-contents-EN.md) | 将推荐路线、任务跳读、实验和迁移入口写成与站点相同的索引合同；每个章节明确下一步与证据。 | 目录链接与站点卡片双向一致；随机抽取章节验证前置/下一步。 |
| P1 | [`book/labs/README-EN.md`](../../book/labs/README-EN.md) | 补全 12 个实际实验的直接索引，显示 level、领域、状态、前置章节、失败变体和迁移焦点；不要让四张精选卡片承担“全部入口”承诺。 | `lab-*.md` 文件计数、链接检查、状态和 frontmatter 对齐。 |

### 推荐的后续垂直切片

先只做一条完整路径：`site/index.html` 的“第一个安全任务” → `book/chapters/02-first-safe-task-EN.md` → `book/labs/lab-001-first-safe-task-EN.md` → 一条证据/验收记录 → 下一步章节。该切片应同时证明：起点可找、卡片可判断、正文可读、实验可执行、失败可见、证据可核查。通过后再扩展到 L0–L6 和全部实验。

## 研究边界与引用记录

- 本报告的 GitHub 仓库页、README、目录页和 GitHub 页面统计均在 2026-08-10 直接访问；页面动态内容以当时可见内容为准。
- Hugging Face 课程页是项目自有学习页面，直接观察了 Unit 0 和 Unit 4 的侧栏、页内标题、课程路线、认证/挑战、页内目录和导航；未复制其正文。
- OpenAI Cookbook 页面是仓库 README 指向的第一方落地页，直接观察了 Topics、Featured、Popular、All、Filter、搜索和条目标签；未复制 recipe 内容。
- Microsoft 单课页直接观察了 `code_samples`、`images`、lesson README、learning goals、视频/额外资源链接、前后课程链接和 smoke-test 入口；未下载或复用其素材。
- GitHub Awesome Copilot 页面直接观察了资源类型、Learning Hub、网站搜索/过滤、`llms.txt` 提示、安装说明和第三方资源检查提示；未安装任何插件或资源。
- GitHub API 在研究过程中遇到匿名 rate limit，因此没有把 API 返回作为本报告的证据来源；仓库数字和页面结构以直接可见页面为准。
- 本报告是结构研究，不声明任何样本的设计导致了 star，也不声明本项目已经实施这些建议。

## 交付状态

**candidate：** 已完成公开页面观察、样本记录、设计原则、资产边界和站点文件建议；未修改 `site/`，未提交，未推送，也未声称浏览器验收、用户测试或生产就绪。
