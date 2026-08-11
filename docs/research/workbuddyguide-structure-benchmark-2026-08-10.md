# WorkBuddyGuide 结构基准研究

- 研究对象：[AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide)
- 在线站点：[workbuddy.homes](https://workbuddy.homes/)
- 访问日期：2026-08-10
- GitHub 核对版本：`main`，固定 commit [`abd61e82188fc57ef542756312e06175fc70b8b0`](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0)
- 研究状态：candidate / reference-only

本文只记录公开可观察的结构事实与原创比较，不复制 WorkBuddyGuide 的长文、图片、代码、品牌资产或提示词。

## 1. 观察边界与结论

WorkBuddyGuide 的主要产品形态是“可连续阅读的在线书 + 面向真实任务的案例集 + 社区投稿入口”。它把读者入口分成两类：一类按篇章和章节顺序阅读，另一类从当前工作问题直接跳入相应章节或案例。其结构优势不在章节数量本身，而在于把“任务完成”设计成内容增长的起点：任务可以被复盘为 Case，Case 可以继续沉淀为 Skill、自动化或多 Agent 工作系统。

对 Codex Field Guide 的可迁移价值主要是信息架构和内容生命周期，而不是视觉样式或产品品牌。适合借鉴的是双入口、案例与正文分层、投稿模板、前后导航和页面级目录；不适合直接照搬的是其蓝皮书命名、像素视觉、颜色、图像、二维码、字体、品牌文案和第三方素材。

## 2. 公开仓库结构事实

固定 commit 的仓库树可观察到以下主要层次：

| 层次 | 公开路径或文件 | 结构作用 |
| --- | --- | --- |
| 在线文档源 | `docs/` | VitePress 文档站点源目录 |
| 连续阅读主线 | `docs/bluebook/` | 4 个篇章、27 个章节及篇章导读 |
| 社区增量层 | `docs/cases/submissions/` | 7 个独立 Case 目录，每个 Case 以 `index.md` 为入口 |
| 页面与导航 | `docs/.vitepress/` | VitePress 配置、动态侧栏、主题组件、SEO、Mermaid 和样式 |
| 协作边界 | `.github/` | Case 模板、Case PR 模板、Issue 模板和通用 PR 模板 |
| 发布运维 | `DEPLOYMENT.md`、`wrangler*.jsonc`、`functions/`、`migrations/`、`workers/` | Cloudflare Pages、Pages Functions、D1 和定时 Worker 的部署说明与运行边界 |
| 内容导入 | `scripts/download_feishu_wiki.py` | 将外部 Wiki 内容导出为仓库可消费的 Markdown/XML/素材中间层 |
| 资源 | 各章节下的 `assets/`、`artifacts/design-qa/` | 章节图像、作者图像和设计检查产物 |

按固定 commit 的公开树统计：仓库共有 396 个 blob，63 个 Markdown 文件，27 个章节入口，7 个社区 Case 入口，未观察到 `.github/workflows/` 下的仓库内 GitHub Actions 工作流。该统计描述仓库树，不推断 Cloudflare 后台是否存在额外自动化。

## 3. 导航与阅读路径

在线首页公开呈现以下导航关系：

```text
首页
├─ 开始阅读 → 蓝皮书总览 → 4 篇章 → 27 章
├─ 案例集 → 社区 Case → Case 投稿指南
├─ 帮你解决 → 按工作问题进入相关内容
├─ 阅读指南 → 新手、任务实践者、团队负责人的路线
└─ GitHub / 交流群 / 搜索 / 深色模式
```

章节页面同时提供：

- 全局主导航；
- 左侧篇章/章节侧栏，并允许篇章折叠；
- 当前页目录；
- 正文中的标题锚点；
- 前一页/后一页阅读关系；
- GitHub 编辑或协作入口、更新时间等文档站点元信息。

首页还提供“按目标进入”的任务卡片，例如办公文档、文件与远程、资讯与知识、专业分析、内容生产和 AI 工作系统。这使首页既是书的封面，也是问题路由器。阅读指南进一步明确“先完成一个真实任务，再回到进阶篇沉淀为 Skill、自动化或多 Agent 系统”的顺序。

## 4. 章节、实验与资源组织

### 4.1 章节

蓝皮书按功能学习、真实案例、系统进阶、岗位与行业落地分为四篇。第一篇承担安装、界面、第一个任务、Skill、连接器、API 和自动化等上手内容；第二篇按办公、文件、远程、资讯、知识、会议、投资和内容增长等真实场景组织；第三篇转向 Skill、多 Agent 和可靠自动化；第四篇把能力映射到岗位与行业。

每章通常以目录中的独立文件夹承载，章节正文入口统一为 `index.md`，章节图片或其他媒体放在同级 `assets/`。这让内容、资源和 URL 形成稳定的局部边界，也方便从外部 Wiki 导入后再整理。

### 4.2 实验与案例

固定 commit 的路径和侧栏未显示名为 `lab`、`experiment` 或 `exercise` 的独立目录。可观察的实践单元主要是两类：

1. 正文中的真实任务章节：面向读者完成某一类任务。
2. `docs/cases/submissions/<case>/index.md`：面向社区投稿的可复现案例。

因此，WorkBuddyGuide 的“实验”更接近任务案例，而不是带统一编号、前置条件、证据字段和验收门槛的课程实验。它通过 Case 模板补足了这种实践单元的结构：场景、任务、Skills、前置条件、步骤、任务指令、效果、验收标准、问题、限制与安全、复用方式。

### 4.3 资源与内容生产

仓库把导入中间层与读者页面分开：`source.md`、`source.xml`、`metadata.json`、`manifest.json` 一类文件属于内容生产链的中间材料，整理后的章节 `index.md` 与资源目录才是站点消费面。该分层适合防止原始导出格式直接成为公开阅读接口，但公开仓库不能证明外部 Wiki 的真实地址、同步人员、同步频率或后台任务是否持续运行，这些保持未知。

## 5. 呈现方式的可观察事实

在线站点采用 VitePress 形态：文档页面有全局导航、侧栏、当前页目录、搜索、深色模式、Mermaid 渲染和图片放大能力。首页采用强标题、分段卡片、路径入口和任务导向的 CTA；章节页则将阅读密度放在正文与侧栏之间。仓库还保留桌面和 390px 移动端设计检查图，说明移动呈现被纳入公开工程产物，但这些图不等于我在本次研究中重新执行了视觉验收。

视觉层面可观察到深色背景、亮色强调色、像素风图形、等宽/展示型文字和较强的编辑化标题层级。对本项目可迁移的抽象是“统一的阅读产品外壳 + 明确的任务入口 + 稳定的侧栏节奏”，而不是具体色值、字体、图形或版式资产。

## 6. 与 Codex Field Guide 的结构比较

| 结构问题 | WorkBuddyGuide 的公开做法 | Codex Field Guide 当前结构 | 可迁移判断 |
| --- | --- | --- | --- |
| 主阅读单元 | 4 篇、27 章的连续蓝皮书 | `book/chapters/` 下 22 章，另有前言、目录、多语言文件 | 可采用篇章导读和书内连续导航，但保持本项目 GPT、Codex、工具、Skill、Agent、工作流和证据的概念顺序 |
| 实践单元 | 真实任务章节 + 社区 Case | `book/labs/` 下 13 个实验，另有 `evals/` 与质量评审 | Case 模板可借鉴，需继续保留本项目实验的低风险、可观察、可逆和证据要求 |
| 问题入口 | 首页任务卡片、`/help/`、阅读指南 | 现有学习路径、内容矩阵和章节/实验关系 | 可增加“我现在要解决什么问题”的路由层，作为学习路径的补充而不是另起一套目录 |
| 内容增量 | `docs/cases/submissions/` 动态扫描目录并进入侧栏 | 现有研究、章节、实验、Skill 与治理文件分层 | 可建立 `field-cases` 或案例层，但必须定义 candidate、复现、验收、收录和维护状态 |
| 协作输入 | Case/PR 模板要求去重、可复现、验收、安全和素材权限 | 现有 `docs/templates/`、贡献模型、来源登记和质量标准 | 这是最值得迁移的治理结构：投稿字段应直接对应审核证据，而不是只收集文章元数据 |
| 事实更新 | README、部署说明和站点内容并存，部分运行事实在外部平台 | `fact-impact-registry`、更新登记、来源资产登记和发布检查 | 本项目的事实治理更细；可吸收“页面给读者看的内容”和“导入/构建中间层”分离原则 |
| 页面呈现 | VitePress 的侧栏、页内目录、前后页和搜索 | 当前已有站点与静态展示层，书源仍是 Markdown 文件 | 可迁移阅读壳层和双入口；不应以视觉复制为目标 |
| 学习结果 | 任务 → Case → Skill/自动化 → AI 团队 | 概念 → 实验 → 证据 → 工作流/团队能力 | 两者可拼接为“概念理解 → 安全实验 → 真实案例 → 证据评审 → 能力沉淀” |

## 7. 建议的最小迁移切片

以下是结构层面的原创建议，不是对 WorkBuddyGuide 内容或实现的复制：

1. 在现有学习路径之外增加一个轻量“按问题进入”索引，索引项指向现有章节、实验、Skill 和评审材料，避免新建重复正文。
2. 为真实工作案例定义独立的 `candidate → reproduced → accepted → incorporated` 生命周期；案例在通过复现与证据检查前，不直接升级为正式章节。
3. 参考 Case 模板的字段完整性，为本项目案例要求输入、权限、外部副作用、失败边界、验收证据、来源和复用方式。
4. 在站点层提供“当前页目录、前后阅读、学习路径、问题路由”四个互补导航，而不是只展示文件树。
5. 将外部资料的原始导入、中间整理物和公开学习页面分开，并在来源登记中记录许可证、访问日期、适用范围和未解决项。

建议先以一个真实问题贯通现有章节与 `lab-013`，验证问题入口是否能导向可执行实验和证据复盘，再决定是否新增独立案例目录或改造站点导航。

## 8. 许可证与来源边界

### 已确认

- GitHub API 在 2026-08-10 返回仓库许可证为 MIT，根目录存在 [`LICENSE`](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0)，其文本授予复制、修改、发布等 MIT 范围内的权利，并要求保留版权与许可证声明。
- 仓库树中的 `CONTRIBUTING.md`、Case 模板和 PR 模板要求投稿者说明素材权限、删除密钥/个人信息，并允许维护者在保留署名和事实的前提下整理内容；这些是仓库协作规则，不等于对所有第三方素材的授权证明。
- 在线页脚明确把 Pixel icons 归因到 HackerNoon 的 Pixel Icon Library；这至少说明该类图标存在外部来源，不应仅凭仓库 MIT 将其视为项目自有资产。

### 未确认或不能由根许可证推出

- 仓库内所有图片、GIF、二维码、作者头像、截图、视频、图标、字体、品牌名称和投稿内容是否都受根目录 MIT 覆盖：未知。
- 外部 Wiki 的原始内容、第三方截图中的软件界面、二维码所指向的主体、各投稿作者对内容和素材的完整授权链：未知。
- `package.json` 依赖及字体包的逐项许可证、Cloudflare 后台绑定、D1 数据和 Analytics Secret 的生产状态：本研究未逐项审计，保持未知。

因此，本项目只迁移结构抽象和原创分析，采用 `reference-only` 边界：不复制原文、图片、代码、提示词、字体、图标、二维码、品牌资产或第三方媒体。若未来需要引用某个具体素材，必须单独核对其来源、版权/许可证、署名要求和使用范围，不能只引用 WorkBuddyGuide 根目录的 MIT。

## 9. 来源清单

1. [仓库首页](https://github.com/AlephAITech/WorkBuddyGuide)；访问日期 2026-08-10；用于仓库身份、公开协作入口和当前状态。
2. [固定 commit 的仓库树](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0)；访问日期 2026-08-10；用于目录、章节、案例和资源数量的观察。
3. [README.md](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/README.md)；访问日期 2026-08-10；用于项目定位与内容分篇说明。
4. [`docs/.vitepress/config.mts`](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts)；访问日期 2026-08-10；用于站点能力与导航配置观察。
5. [`docs/.vitepress/sidebar.ts`](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts)；访问日期 2026-08-10；用于章节/案例侧栏组织观察。
6. [`docs/bluebook/`](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0/docs/bluebook)；访问日期 2026-08-10；用于篇章、章节和资源边界观察。
7. [Case 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/CASE_TEMPLATE.md) 与 [Case PR 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/PULL_REQUEST_TEMPLATE/case.md)；访问日期 2026-08-10；用于实践单元和协作审核字段观察。
8. [`LICENSE`](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/LICENSE)；访问日期 2026-08-10；用于根许可证确认。
9. [`DEPLOYMENT.md`](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/DEPLOYMENT.md)；访问日期 2026-08-10；用于构建、部署和外部运行边界观察。
10. [在线阅读站](https://workbuddy.homes/)及一个章节页；访问日期 2026-08-10；用于可见导航、入口和呈现方式观察。

## 10. 状态

本文件是对公开结构的研究基准，不是对 WorkBuddyGuide 内容的复刻，也不是对其后台部署、全部素材权利或运行数据的完整审计。可迁移结论为原创分析；外部事实均附来源和访问日期。
