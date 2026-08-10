# WorkBuddyGuide 结构研究档案（2026-08-10）

**研究对象：** [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide)  
**核对版本：** `main` / [`abd61e82188fc57ef542756312e06175fc70b8b0`](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0)  
**访问日期：** 2026-08-10  
**研究状态：** `candidate` / `reference-only`

> 本档案研究结构、内容生产和发布机制，不复制 WorkBuddyGuide 的正文、提示词、代码、截图、图标、字体、二维码、品牌表达或投稿素材。所有关于“为什么这样设计”的判断都标为推断；无法从公开仓库或在线站点确认的内容保留为未知。

## 1. 结论先行

WorkBuddyGuide 的“蓝皮书感”不是由某一个 CSS 颜色产生的，而是由一组相互配合的产品结构产生：

```text
GitHub 协作入口
→ 独立连续阅读站
→ 分篇与章节导航
→ 阅读指南和双入口首页
→ 独立社区案例
→ 案例模板与 PR 入口
→ 构建、部署和统计维护
```

Codex Field Guide 已经拥有更深的教学内核：GPT/模型心智模型、Codex 工作面、上下文、工具、Skill、Agent、实验、评测、证据和治理。可借鉴的方向是把这些已有资产组织成更像书的阅读路径，而不是把本项目改造成 WorkBuddyGuide 的复制品。

## 2. 证据等级

本档案使用三种标签：

| 标签 | 含义 |
|---|---|
| `fact` | 能在固定 commit 的仓库文件、GitHub API 或可观察站点中直接核对 |
| `inference` | 基于多个事实作出的合理判断，不等于平台后台的直接证据 |
| `unknown` | 公开材料不足以确认，不能写成项目事实 |

## 3. 仓库与站点骨架（`fact`）

截至固定 commit，公开仓库的主要职责分层如下：

| 路径/入口 | 观察到的职责 |
|---|---|
| `docs/` | VitePress 文档站点源目录 |
| `docs/bluebook/` | 四篇蓝皮书和附录，章节通常以目录中的 `index.md` 为正文入口 |
| `docs/cases/submissions/` | 独立社区案例，每个案例可带自己的 `assets/` |
| `docs/.vitepress/` | 站点配置、侧栏、SEO、Mermaid 和主题组件 |
| `.github/CASE_TEMPLATE.md` | 案例提交字段和正文约定 |
| `.github/PULL_REQUEST_TEMPLATE/case.md` | 案例贡献入口 |
| `scripts/download_feishu_wiki.py` | 从飞书 Wiki 递归导出 Markdown/XML 和素材 |
| `functions/`、`migrations/`、`workers/` | Cloudflare Pages Functions、D1 迁移和流量归档 Worker |
| `DEPLOYMENT.md`、`wrangler*.jsonc` | Cloudflare Pages/Worker 的部署说明与配置 |
| `https://workbuddy.homes/` | 独立连续阅读站 |

研究证据：

- [README（固定 commit）](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/README.md)
- [VitePress 配置](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts)
- [动态侧栏](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts)
- [部署说明](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/DEPLOYMENT.md)
- [在线站点](https://workbuddy.homes/)

## 4. 内容组织方式（`fact`）

蓝皮书按四篇、27 章组织：

1. 使用手册：第 1–10 章；
2. 真实案例：第 11–21 章；
3. Skill、多 Agent、自动化进阶：第 22–25 章；
4. 岗位与行业落地：第 26–27 章。

首页同时提供两种入口：按学习阶段进入，或按真实任务进入。章节页提供左侧章节导航、正文、本页目录、前后页导航、更新时间和 GitHub 编辑入口；公开站点还提供搜索、深色模式、Mermaid、图片放大和移动端适配。

这些结构事实来自仓库的 `README.md`、`docs/.vitepress/config.mts`、`docs/.vitepress/sidebar.ts`、蓝皮书目录和在线站点观察。视觉细节只能说明现有站点的设计方向，不能说明其所有素材具有可再利用许可。

## 5. 内容生产链（`fact` + `inference`）

仓库代码直接支持下面这条链：

```text
Feishu Wiki
→ scripts/download_feishu_wiki.py
→ Markdown/XML/素材导出
→ 相对链接和素材路径本地化
→ docs/bluebook/**/index.md + assets/
→ VitePress build
→ docs/.vitepress/dist
→ Cloudflare Pages
```

导出脚本和 `.gitignore` 还显示出一个重要分层：原始 `source.md`、`source.xml`、`metadata.json` 和 `manifest.json` 属于中间资料，不是默认读者页面；提交到阅读站的是整理后的 `index.md` 与素材目录。

**推断：** 日常内容发布很可能是“导出/整理 → Git 提交 → 平台构建”的人工参与链，而不是每次都由仓库内 GitHub Actions 自动完成。固定版本中没有发现 `.github/workflows`，但公开仓库无法证明 Cloudflare 后台或其他外部服务不存在自动化。

**未知：** 飞书 Wiki 的真实源地址、同步人员、同步频率、Cloudflare Pages 后台绑定、最近一次生产构建、外部 Secret 和 Worker 是否已成功运行，都不能只凭公开仓库确认。

## 6. 案例层为什么重要（`fact`）

公开案例不是把正文再复制一遍，而是一个独立的可贡献内容层。模板要求作者记录：

- 场景、目标和前置条件；
- 使用的 Skill；
- 操作过程与提示词/任务指令；
- 实际效果和验收标准；
- 遇到的问题；
- 安全与限制；
- 可复用方式。

案例目录由侧栏逻辑扫描，意味着案例可以持续增加，不必先重写整本蓝皮书的静态目录。

证据：[Case 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/CASE_TEMPLATE.md)、[Case PR 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/PULL_REQUEST_TEMPLATE/case.md)。

## 7. 视觉与阅读体验（`fact`）

在线站点可观察到：深色/纸张色背景、荧光黄绿色强调、大字号标题、像素风图标、英文等宽眉标、三栏章节阅读布局，以及适配移动端的折叠导航。这些视觉选择帮助读者识别“这是一本有品牌的书”，但不应成为 Codex 项目直接复用的品牌方案。

Codex 应借鉴的是层级、节奏和入口逻辑；视觉上继续使用自己的产品身份和已存在的 Swiss editorial 方向。不得复制 WorkBuddy 的 Logo、品牌名、截图、像素图标、二维码、作者卡片、颜色组合或字体资产。

## 8. 与 Codex Field Guide 的差异和借鉴边界

| 层 | WorkBuddyGuide 提供的启发 | Codex Field Guide 的对应优势 |
|---|---|---|
| 阅读外壳 | 分篇、章节、阅读指南、搜索、侧栏和前后导航 | 已有 22 章、13 个实验、四条路线，可补连续导读 |
| 现实案例 | 独立投稿目录和案例 PR 模板 | 已有真实问题研究，可增加案例字段和复现边界 |
| 能力组织 | Skill/Agent/自动化按实战内容呈现 | 可把 Skill 触发、输入、权限、失败、输出和评测串起来 |
| 质量边界 | 案例验收和安全限制 | 四类证据、L0–L6、39 项评测夹具、状态源和事实影响注册表 |
| 发布形态 | VitePress + Cloudflare Pages | 当前静态展示页已可用，先验证阅读产品再决定是否换引擎 |

推荐的 Codex 内容主线是：

```text
GPT/模型心智模型
→ Codex 工作面与权限
→ 任务协议
→ 工具/Skill/Agent
→ 实验
→ 证据审查
→ 失败恢复
→ 领域工作流
→ 团队能力系统
```

## 9. 建议的最小纵向切片（`inference` / project decision）

不要先迁移 22 章，也不要先复制一个完整 VitePress 外壳。第一条切片应证明读者能从一个真实困惑走到一个可验证的小闭环：

```text
“我分不清 GPT、Codex、工具和 Agent”
→ 第一章
→ 实验 011
→ Codex Coach Skill
→ concept-gpt-codex-tools-001
→ 四类证据
→ L0 进阶或停留
```

实现时优先增加一个蓝皮书总览/阅读指南和一份内容映射，让现有正文保持原路径。案例先以 `candidate` 进入研究层，经过编辑、复现和验收后才进入正式章节。内容成熟度、翻译状态和运行状态必须分开。

## 10. 不可复制边界与许可证记录

WorkBuddyGuide 根目录公开 `MIT`，但该信号不自动覆盖所有图片、截图、视频、二维码、作者卡片、投稿素材、品牌和第三方图标。固定版本中可单独核对到 HackerNoon Pixel Icon Library 的 CC BY 4.0 署名要求，以及 `@fontsource/silkscreen` 的 OFL-1.1 信号；投稿内容的完整再许可范围未在公开仓库中明确。

因此本项目只记录结构研究，不把 WorkBuddyGuide 当作可整体 vendoring 的资产；任何未来需要引用的具体素材都必须单独核对来源和许可。

## 11. 来源与复核

| 来源 | 用途 | 访问/版本 |
|---|---|---|
| [GitHub 仓库](https://github.com/AlephAITech/WorkBuddyGuide) | 项目入口和协作定位 | 2026-08-10 |
| [固定 commit](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0) | 目录和文件事实 | `abd61e8` |
| [README](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/README.md) | 目标、内容分篇、运行方式 | `abd61e8` |
| [package.json](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/package.json) | 构建命令和依赖 | `abd61e8` |
| [VitePress 配置](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts) | 站点能力和构建边界 | `abd61e8` |
| [动态侧栏](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts) | 章节/案例导航 | `abd61e8` |
| [飞书导出脚本](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/scripts/download_feishu_wiki.py) | 内容同步链 | `abd61e8` |
| [Case 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/CASE_TEMPLATE.md) | 案例投稿字段 | `abd61e8` |
| [部署文档](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/DEPLOYMENT.md) | Cloudflare 发布边界 | `abd61e8` |
| [在线阅读站](https://workbuddy.homes/) | 阅读体验观察 | 2026-08-10 |

## 12. 复核任务

在 WorkBuddyGuide 出现新的发布、目录、许可证或站点结构变化时，重新核对固定 commit、案例模板、构建配置和在线站点。若本项目开始采用其中某一具体媒体或代码资产，必须先在来源台账记录单项许可和归属，不能只引用根目录 MIT。
