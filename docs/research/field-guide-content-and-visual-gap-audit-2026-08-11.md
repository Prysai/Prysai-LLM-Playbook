# Field Guide 内容与视觉缺口审计

> 审计日期：2026-08-11
> 审计类型：独立、只读、reader-facing 内容与视觉审计
> 当前判断：`candidate`，不是 `verified` 或 `production-ready`

## 1. 结论先行

当前项目已经建立了很好的“证据意识”和“内容治理骨架”，但读者面对的产品仍更接近“内容目录 + 证据账本”，还没有完全变成一个让人立即知道下一步的学习产品。

已有优势是明确的：根 README 有视觉入口、问题入口、学习路径和真实案例入口；`site/` 有“从问题开始”“前 30 分钟”“七级学习路径”“四条章节路线”“实验”“失败”“维护”和“证据状态”；`book/` 有 22 章和 13 个实验；`docs/governance/` 有统一状态、导航、学习路径和 locale 矩阵；项目还明确区分了本地渲染证据、用户报告、官方事实和未验证结论。

最主要的读者缺口是：

1. 首页虽然提供了多个入口，但首屏还没有一个强制帮助读者回答“我属于哪类人、现在先读哪一页、需要多久、会留下什么产物”的决策组件。
2. 章节契约在 `book/README-EN.md` 中被写成原则，尚未在 22 章中以同样可扫描的 reader-facing 模块稳定出现。
3. 实验、故意失败和验收证据没有始终在章节现场形成闭环；读者常需要从章节跳到实验、再跳到研究记录，才能拼出可执行路径。
4. 教学图和截图集中在少数章节，视觉资产没有覆盖整条学习路径。
5. “真实案例”目前最完整的是一个明确标注为虚构、静态、本地渲染的 Product Context 案例；它适合教边界，不足以承担真实现场问题的全部教学作用。
6. `candidate`、`draft`、`not_run` 等状态可见，但还没有始终翻译成读者能理解的“你现在可以做什么、哪些东西不能声称”。
7. 章节的 raw Markdown 阅读体验没有一个统一、可生成的上一页/下一页、相关实验、下一步行动和同页深链契约。
8. locale 迁移、默认语言和章节文件命名对维护者清楚，对读者不够清楚；“已登记语言”容易被误读为“正文已完成翻译”。

建议的增量方向不是继续增加装饰，而是给每个阅读单元增加可观察的动作、失败信号、产物和证据边界；给首页增加一个十秒决策层；给视觉资产增加机制解释和真实状态，而不是增加泛化的 AI 主题插画。

## 2. 审计边界与方法

### 已检查

- `README.md`、`README-EN.md`、`README-ZH.md`：项目承诺、入口和默认语言。
- `site/index.html`、`site/app.js`、`site/styles.css`、`site/learning-path-data.js`：首页静态结构、运行时文案、入口、状态、响应式 CSS 和路径数据。
- `book/README-EN.md`、`book/table-of-contents-EN.md`、`book/chapters/`、`book/labs/`：章节契约、章节层级、实验和图像引用。
- `docs/governance/content-status.yaml`、`book-navigation.yaml`、`learning-path.yaml`、`locale-matrix.yaml`：当前状态、导航、学习等级和翻译登记。
- `docs/sources/asset-register.md`、`docs/research/skill-case-product-context-real-estate-2026-08-11.md`、`docs/quality/real-world-case-integration-review-2026-08-10.md`：视觉资产、案例边界和案例质量记录。
- 已有研究记录：`docs/research/book-navigation-architecture-study-2026-08-11.md`、`site-information-architecture-audit-2026-08-10.md`、`README-front-door-benchmark-2026-08-10.md`、`tutorial-architecture-benchmark-2026-08-10.md`、`multilingual-architecture-round2-2026-08-10.md`。
- Astro Starlight、GitHub Docs、MDN、Stripe、web.dev 的公开一手页面。所有外部页面在本次审计中按下文日期访问。

### 证据边界

- 本次没有修改实现代码，也没有执行发布、推送、外部账号操作或真实生产操作。
- 本轮主要以静态 HTML、CSS、JavaScript、Markdown、YAML 和已有审核记录判断信息层级。没有重新启动本地浏览器来逐项点击、截图、测试 390px 响应式布局或确认当前浏览器会话中的动态行为；因此本报告对“静态结构上存在”与“读者在运行时一定看见”保持区分。
- `content-status.yaml` 当前把项目、章节、Skills 和 public site 记为 `candidate`，把 13 个实验记为 `draft` / `not_run`，把 39 个评测任务记为 `candidate` / `not_run`。这些状态在报告中保留，不因本次审计升级。
- 仓库根目录没有 `astro.config.mjs`，也没有 Astro 的 `src/` 内容目录。因此 Starlight 只作为可观察的信息架构参照，不应被写成当前项目已经使用的框架或运行时能力。

## 3. 当前 reader-facing 结构

| 层 | 当前可观察事实 | 读者价值 | 主要薄弱处 |
|---|---|---|---|
| GitHub README | `README.md` 明确列出 showcase、book、治理、Project map；有“Start with a result”和视觉教学/概念案例入口。 | 能找到仓库各层，也能理解项目不是官方 Codex 文档。 | 入口仍是多个平行入口；没有把“此刻该读什么”压缩成一个首选动作。 |
| Public site | `site/index.html` 有 hero、问题卡、前 30 分钟、任务协议、七级路径、22 章四路线、实验、失败、维护和证据状态。 | 具有完整的浏览骨架，且状态透明。 | 首屏信息仍按项目结构展开；读者需要先理解项目分类，才能把自身问题映射到页面。 |
| Book | 22 章覆盖从 GPT/Codex 边界到团队能力和持续更新；`book/README-EN.md` 已写出章节最低契约。 | 深度和主题连续性足够支撑一套教材。 | 章节现场的卡片、实验、失败、验收和图解密度不稳定；1–9 章有 `-EN` 源文件，10–22 章仍主要使用无 locale 后缀文件。 |
| Labs | 13 个实验，方向覆盖安全任务、任务协议、证据审查、Skill、Agent、动作边界、研究、工程、产品上下文和团队迁移。 | 给抽象原则提供可行动的练习对象。 | 当前状态是 `draft` / `not_run`；实验入口与章节的“现在就做”关系还不够近。 |
| 状态 | 页面和治理文件公开 `candidate`、`draft`、`not_run`，并说明部分案例是用户报告或本地渲染。 | 读者不容易把文档数量误读为生产证明。 | 状态标签没有统一附带“下一步”和“不能声称什么”，容易成为维护者术语而不是学习反馈。 |
| 视觉 | 现有 `assets/readme/codex-field-guide-header.svg`、4 张教学 SVG 和 1 张房地产概念案例 PNG；英文第 8 章有 2 个图像引用，第 9 章有 1 个，其余章节基本没有嵌入图解。 | 少数机制已经能被一眼理解。 | 视觉层没有沿 22 章形成可预期的教学节奏；读者更多看到文字结构，而不是机制、状态和证据之间的关系。 |
| 案例 | Product Context 案例明确是合成 brief、静态 HTML/CSS/inline SVG 和本地截图；明确声明没有真实客户、库存、转化或独立 Skill runtime 证明。 | 这是一个诚实的边界教学案例。 | 目前缺少至少 2–3 个同样结构化的“公开现场问题 → 证据级别 → 安全检查 → 降级路径”教学卡。 |

### 当前最值得保留的基础

`site/index.html` 已经有三个很有价值的内容信号：

- “Start with a problem” 把学习入口从 Skill 名称移回读者问题。
- “The first 30 minutes” 给出了可逆改动、任务契约、先检查后编辑、看 diff 和记录未测试内容的顺序。
- “Current baseline” 和 evidence boundary 明确告诉读者项目仍是 `candidate`，实验尚未完成现场运行验证。

这些内容不应被删除；应该被重排成更强的首屏决策层，并在章节内重复为可执行卡片。

## 4. 一手公开页面的可观察模式

下面只记录页面上可以直接观察到的结构和交互信号，不复制外部正文、代码、图片或品牌资产。

| 一手页面 | 可核对事实 | 对本项目的结构启示 |
|---|---|---|
| [Astro Starlight Sidebar Navigation](https://starlight.astro.build/guides/sidebar/) | Starlight 的 sidebar 可以由单链接、链接组和按目录自动生成的条目组成；自动生成可以以 docs 目录为输入，页面标题默认可以成为导航标签；sidebar 也支持 badge、折叠组和标签翻译。 | 把“章节顺序、学习路线、状态 badge、locale 标签”视为同一导航契约的不同视图；不要靠每个 HTML 页面手工维护一份不同顺序。 |
| [Starlight Configuration Reference](https://starlight.astro.build/reference/configuration/#sidebar) | 配置参考明确把 sidebar 定义为链接、分组和 `autogenerate` 条目的数组；分页是独立配置项。 | 项目可以继续以 `docs/governance/book-navigation.yaml` 作为 canonical source，生成 README/site/book 的同一顺序，而不是为了换框架重写内容。 |
| [Starlight Frontmatter Reference](https://starlight.astro.build/reference/frontmatter/) | 页面可用 `prev` 和 `next` frontmatter 隐藏、替换链接文本或覆盖链接目标；`pagination` 全局开关默认开启；`draft: true` 的页面不进入 production build。 | 每章应有显式 previous/next、related lab、next action 和 draft/runtime 边界；“页面存在”与“页面可发布”必须继续分开。 |
| [Starlight Internationalization](https://starlight.astro.build/guides/i18n/) | 通过 `locales` 和 `defaultLocale` 配置语言；内容按 locale 目录组织，例如 `src/content/docs/en/` 与 `src/content/docs/zh-cn/`；同一页面在各目录使用相同文件名关联；默认语言可作为缺译内容 fallback；还可以使用 root locale 省略默认语言 URL 前缀。 | 当前项目的 `content_id`、共享 filename stem、locale matrix 是正确方向。应把缺译状态和源语言提示呈现在 reader-facing 页面上，不能把 fallback 当翻译完成。 |
| [GitHub Docs — Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world) | 页面同时提供简介、学习目标式的“你将完成什么”、Prerequisites、分步骤标题、页面内目录、Conclusion、Next steps 和 Further reading。 | 每章开头应让读者立即看到前置条件、目标产物、步骤数量和下一步；页面末尾不能只停在正文结束。 |
| [MDN — Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax) | 页面把 Overview、Prerequisites、Learning outcomes、In this article、互动练习和 Next 串在同一阅读流中；读者先知道为什么读、需要什么、读完能做什么。 | 把学习目标从章节目录中的抽象说明变成章节顶部的可检查结果，并为每个结果链接到实验或验收表。 |
| [Stripe — API keys](https://docs.stripe.com/keys) | 页面把 test mode 与 live mode 明确区分，紧邻放置安全提醒、key 类型和进入下一步的文档链接。 | 本项目的“安全边界”应紧邻动作步骤，而不是只放在章末；每个实验都应明确 sandbox/live、可逆性和停止条件。 |
| [web.dev — Learn Accessibility](https://web.dev/learn/accessibility/) | 课程首页以模块/lesson 组织学习，并可见结论与下一步、可选 glossary 和 quiz 等不同学习动作。 | 章节、实验、词汇、复盘和评测应有不同类型的入口；“读完”不应是唯一完成形态。 |

### 对 Starlight 的准确使用边界

Starlight 的 sidebar、pagination/prev-next 和 locale 目录模式适合借鉴其内容身份、生成式导航和缺译可见性。它不能直接证明本项目需要迁移到 Astro，也不能证明当前 `site/` 已有 Starlight 的运行时路由、页面级 fallback、production build 或分页组件。若未来采用 Starlight，应先做一个独立的迁移切片并提供构建、链接、locale、anchor 和浏览器证据；本次审计不提出立即迁移。

## 5. 首页：让用户在 10 秒内找到“我现在该读什么”

### 建议的首屏信息顺序

把当前 hero 的主 CTA 和项目索引之间插入一个“现在从哪开始”决策带。它应该出现在首屏可见区域或 hero 紧接的第一屏，而不是要求读者先滚过项目地图。

```text
你现在要解决什么？
  ├─ 我刚开始，不知道 GPT / Codex / Skill 的区别
  │    现在读：Chapter 1       用时：15 分钟
  │    先留下：一张边界卡        下一步：Lab 011
  ├─ 我想完成第一个安全任务
  │    现在读：Chapter 2       用时：30 分钟
  │    先留下：一个可逆 diff     下一步：Lab 001
  └─ 我遇到错误、错误文件或无法验证的“完成”
       现在读：Chapter 9       用时：20 分钟
       先留下：claim → evidence 表 下一步：Lab 003
```

每张卡必须同时显示五个字段：

1. 症状或目标，使用读者会说的话，不使用内部路线编号作为标题。
2. 第一页和第一项动作，例如“先读 Chapter 2 的任务契约，再创建 sandbox 文件”。
3. 预计时间，使用范围而不是精确承诺，例如 `15–20 min`。
4. 会留下的可检查产物，例如 diff、任务卡、claim-to-evidence 表或失败记录。
5. 下一步链接和停止条件，例如“如果没有可逆 sandbox，先停在 Chapter 2 的边界卡”。

### 具体改法

- `site/index.html`：在 hero CTA 之后增加 `reader-now` 组件；保留现有“Current baseline”状态，不让决策卡遮住项目仍为 `candidate` 的事实。
- `site/app.js`：为三张卡增加 EN/ZH 文案和可访问名称；保留 URL 可分享的 hash，例如 `#now-first-task`，不要只依赖 `localStorage` 记忆选择。
- `site/styles.css`：三卡在桌面横排、窄屏单列；卡片只使用当前纸张/墨色层级，避免再引入发光、机器人或模型宇宙装饰。
- `site/learning-path-data.js`：给入口数据增加 `reader_problem`、`time_estimate`、`first_action`、`artifact`、`next_link`、`stop_condition` 字段；由数据生成文案，避免 HTML、JS 和治理 YAML 出现三个不同的首选路径。
- `README.md` / `README-EN.md`：把同三条路径放到当前 “Start with a result” 表的最前面，并将“Visual teaching”降为支持入口，而不是第一决策入口。

### 十秒验收

找未参与本次设计的读者，在没有解释的情况下打开首页，记录：

- 10 秒内能否说出自己应点击哪张卡；
- 是否能说出预计时间；
- 是否能说出第一项动作和会留下的证据；
- 是否能分辨 `candidate` 是项目状态而不是个人学习失败；
- 390px、768px、1440px 下第一屏是否仍能看见问题、第一步和链接。

在这项测试真正执行前，只能称为“首屏方案候选”，不能称为“十秒内已验证”。

## 6. 每章统一增量：六张卡 + 一条导航链

`book/README-EN.md` 已经提出章节应包含学习目标、概念、最小实验、故意失败、迁移任务和可检查证据。下一步应把它变成每章都能扫到的固定模板。建议新增 `docs/templates/chapter-reader-contract.md` 作为模板，并同步更新 `book/README-EN.md`、`book/README-ZH.md` 和 22 个 canonical chapter 文件。

### A. 机制卡（Mechanism card）

固定写法：

```text
输入 → 动作 → 状态变化 → 可见证据 → 边界
```

卡片还必须有一句“这不等于什么”。例如“工具可用”不等于“动作已授权”，“build 通过”不等于“运行时已验证”，“Skill 被触发”不等于“输出正确”。这张卡解决读者只记名词、不理解因果边界的问题。

### B. 真实问题卡（Field problem card）

每个案例入口至少显示：`case_id`、症状、原始 URL、创建日期、访问日期、平台/版本、报告者/来源类型、证据等级、观察到的事实、假设、最小排查、停止条件、`safe_degradation`、当前状态和“本项目没有证明什么”。

不能把用户报告的根因放进标题；标题写症状，根因放在假设字段。`reported_workaround` 和项目自己的 `safe_degradation` 分开。这样读者不会把社区建议、官方确认、本地复现和项目推测混成一个结论。

### C. 最小实验（Minimum experiment）

每章只要求一个首选实验，字段为：前置条件、预计时间、低风险输入、允许动作、不可使用的秘密/生产资源、步骤、预期产物、可逆方式、成功证据、未验证项和下一步。实验必须能在临时副本或 sandbox 完成；需要真实账号或外部系统时，先提供静态替代实验。

### D. 故意失败（Intentional failure）

只改变一个条件，并给出：预期失败信号、读者应在哪里停止、如何保留失败证据、如何恢复或降级、这个失败教会了什么。故意失败不能只是“不要这样做”的警告；它应产出一个可检查的错误状态或缺失证据。

### E. 验收表（Acceptance table）

每章末尾使用同一组四列，避免把“解释得像真的”当作完成：

| 维度 | 读者要提交的证据 | 状态 |
|---|---|---|
| 解释 | 能用自己的话解释机制和边界 | `passed` / `failed` / `not_run` |
| 操作 | 实验产物、diff、命令输出或静态检查 | `passed` / `failed` / `not_run` |
| 判断 | 能在正例、边界、失败和迁移例中做取舍 | `passed` / `failed` / `not_run` |
| 审查 | 能指出“这份证据不能证明什么” | `passed` / `failed` / `not_run` |

状态必须与 `content_status`、`experiment_status` 分开。章节达到 `candidate` 不代表实验已经运行；实验 `not_run` 不能用推测填成 `passed`。

### F. 截图/图解

每章至少一张机制图或流程图；需要证明真实界面、响应式布局或运行时状态时才增加截图。每个视觉资产都登记：alt text、来源/许可证、创建日期、viewport（如适用）、能证明什么、不能证明什么。真实运行截图要带平台/版本/访问日期；合成案例要显式写 `concept`、`synthetic` 或 `no live data`。

### G. 页面底部导航链

每章固定出现：上一章、下一章、相关实验、相关真实问题、下一步动作、当前内容状态、当前实验状态和 locale 状态。若某个链接不存在，要显示“尚未提供”，不要生成猜测 URL。这个契约借鉴 Starlight 的 `prev` / `next` 语义，但在当前 raw Markdown 仓库中由 `book-navigation.yaml` 生成或检查。

## 7. 22 章的内容与视觉增量矩阵

下面是建议的第一轮切片。每一行仍需落入上一节的六张卡模板；表中只列本章独有的机制、问题、实验和视觉重点。

| 章 | 机制卡与图解 | 真实问题卡与故意失败 | 最小实验和验收产物 |
|---|---|---|---|
| 01 `book/chapters/01-gpt-and-codex-EN.md` | GPT、Codex、模型、工具、Skill、Agent 的边界图。 | “模型名称等于已获得访问权限”的误读；故意给出不存在的工具，观察权限与能力不能互推。 | 用 Lab 011 完成静态任务卡；产出“能观察/不能推断”表。 |
| 02 `book/chapters/02-first-safe-task-EN.md` | 安全任务协议：目标、范围、授权、验收、停止。 | 错误文件、未授权修改或不可逆动作；失败时保留基线并拒绝继续。 | sandbox 中做一个可逆 diff；提交 diff、focused check 和未测试列表。 |
| 03 `book/chapters/03-task-protocol-EN.md` | 愿望 → 输入/约束/验收/停止条件的转换图。 | 缺失输入与冲突约束；只补一个低风险假设，其他情况停下来询问。 | Lab 002 把一句模糊请求写成任务契约；验收字段全部可定位。 |
| 04 `book/chapters/04-context-permissions-and-agent-EN.md` | 上下文分层与最小权限图。 | 不可信文本伪装成项目规则；故意把外部指令放进输入，验证它不自动获得权限。 | 构造脱敏 context 包，标注 trusted/untrusted、允许动作和退出条件。 |
| 05 `book/chapters/05-choose-the-codex-surface-EN.md` | 任务 × 工作面 × 权限 × 证据矩阵。 | 浏览器、终端、桌面表面不匹配；失败后降级到只读检查或静态任务。 | 对同一任务做 surface 选择卡；提交选择理由和不选择其他表面的原因。 |
| 06 `book/chapters/06-model-selection-EN.md` | 模型—任务—约束—风险比较卡。 | 一次成功被误读为模型排名；故意只跑一次并拒绝做普遍排名。 | 固定输入、固定版本、正例/边界/失败/迁移四类 smoke test；生成 `not_run` 或可追溯结果。 |
| 07 `book/chapters/07-skills-plugins-and-tools-EN.md` | Skill、Plugin、MCP、Tool 的分层和调用边界图。 | 依赖缺失、触发不匹配或把工具存在当作输出保证；失败时回到手工只读步骤。 | 画出一次调用的输入、触发、工具、输出和证据链；链接 Skill registry。 |
| 08 `book/chapters/08-full-lifecycle-workflow-EN.md` | 需求、计划、实现、检查、运行、发布的生命周期与 CP0–CP4 图。 | 跳过检查点直接交付；故意移除一个 exit evidence，验收表必须失败。 | 用现有 `assets/teaching/lifecycle-checkpoints.svg` 做纵向切片；提交 checkpoint 记录。 |
| 09 `book/chapters/09-verification-and-recovery-EN.md` | 声明强度 → 证据 → 缺口 → 恢复/停止阶梯。 | “看起来完成”、改错文件、build 通过但 runtime 未验证；截图同时标注证明边界。 | Lab 003 审一份伪完成结果；产出 claim-to-evidence 表和恢复动作。 |
| 10 `book/chapters/10-planning-and-slicing.md` | 大计划 → 依赖 → 竖向切片 → 可交付状态图。 | 大计划掩盖依赖或一次改太多；故意缩小范围并记录剩余工作。 | Lab 013 或独立 sandbox 做一个 L3 slice；验收看运行产物而非计划长度。 |
| 11 `book/chapters/11-designing-a-skill.md` | Skill 的触发、输入、方法、输出、排除和测试契约卡。 | 触发条件过宽、输出不可检查或依赖未声明；故意用不匹配任务拒绝触发。 | Lab 005 写一份最小 Skill contract；提交正例、边界例、失败例。 |
| 12 `book/chapters/12-agent-loop-and-stop.md` | Agent 状态机：observe → plan → act → feedback → retry → stop。 | 无限重试、重复失败或权限冲突；同一失败只改变一个诊断条件，超过预算停止。 | Lab 006 生成停止条件表；提交 retry budget、stop signal 和 recovery。 |
| 13 `book/chapters/13-action-boundaries.md` | 文件、终端、浏览器、Git、GitHub 的动作级边界图。 | commit/push/publish 权限滑移、外部内容注入和 handoff 断链。 | Lab 007 做只读动作边界模拟；逐项写 evidence、审批和回滚。 |
| 14 `book/chapters/14-discover-and-audit-skills.md` | 外部 Skill 来源 → 许可证 → 依赖 → 权限 → 验证 → 维护流程。 | 许可证不明、秘密泄露、依赖含糊；失败时不安装、不运行，记录阻塞原因。 | 产出一张 provenance/audit card，并链接 `asset-register.md`。 |
| 15 `book/chapters/15-research-track.md` | 问题 → 一手来源 → 声明 → 引用 → 复核时间线。 | 来源冲突或二手建议伪装成事实；故意只保留一条来源并标注不足。 | Lab 008 交付 source matrix；验收逐条对应 URL、日期和证据边界。 |
| 16 `book/chapters/16-engineering-track.md` | 基线 → 改动 → 静态检查 → build → runtime → 发布证据图。 | build 绿但运行时坏、依赖/环境不一致；故意将 build evidence 与 runtime evidence 分开。 | Lab 009 记录命令、环境、diff、运行结果和未验证项。 |
| 17 `book/chapters/17-marketing-track.md` | Product Context → 消息 → 页面 → 实验 → 指标图。 | 虚构客户、库存、偏好或转化；保留现有房地产概念案例的 synthetic boundary。 | Lab 010 产出 facts/hypotheses/unknowns 表和本地截图，不得声称业务结果。 |
| 18 `book/chapters/18-content-design-data-automation.md` | 来源数据 → schema → 转换 → 内容/设计产物 → 校验链。 | 脏输入、过时数据、格式化成功但内容错误；故意引入一个坏字段。 | sandbox 转换并保留输入 schema、日志、输出和复算方式。 |
| 19 `book/chapters/19-evaluate-models-and-workflows.md` | 固定任务 → run-id → 评分 → 错误分类 → 人工审查卡。 | 指标游戏、只报最好的运行或把 `not_run` 写成结论；失败时保留原始结果。 | 用 `evals/task-set-v1.yaml` 做一组小样本；只有真实运行记录才能升级结果状态。 |
| 20 `book/chapters/20-personal-codex-work-system.md` | 项目规则、任务上下文、当前状态、模板、复盘记录的循环图。 | 过时上下文、秘密进入模板、旧命令无限复用；故意加入 stale record 并触发复核。 | 建立不含秘密的个人工作包；提交迁移清单和过期判断。 |
| 21 `book/chapters/21-team-capability-system.md` | 个人方法 → Skill → 共享契约 → owner/权限/评估/回滚图。 | handoff 缺少 owner、版本、独立复现或撤销路径；故意让第二位读者接手失败。 | Lab 012 交付 team capability contract；验收由另一人按临时副本复查。 |
| 22 `book/chapters/22-continuous-update-and-future-proofing.md` | 易变事实 → 来源复核 → 影响矩阵 → 迁移/保留/下线时间线。 | 来源失效、产品行为变更或翻译过时；故意标记一条 stale claim 并走 update record。 | 使用 `fact-impact-registry` 和更新模板；产出受影响文件、owner、复核日期。 |

## 8. 当前最薄弱的 8 个 reader-facing 缺口

| 优先级 | 缺口与读者后果 | 具体文件与改法 | 验证方式 |
|---|---|---|---|
| P0-1 | **首页没有单一的“现在读什么”决策层。** 当前有 hero、问题卡、路径和章节路线，但读者仍需自己把症状映射到 Chapter/Lab。 | `site/index.html` 增加三张 `reader-now` 卡；`site/app.js` 增加 EN/ZH 文案和 URL hash；`site/learning-path-data.js` 增加时间、第一步、产物、下一步和停止条件；README 同步相同三条路径。 | 10 秒陌生读者测试；390/768/1440px 首屏截图；检查每张卡只指向一个第一动作。 |
| P0-2 | **章节最低契约没有以稳定的 reader-facing 视觉/语义模块出现。** 目录能看见主题，不能快速看见本章产物、失败和验收。 | 新增 `docs/templates/chapter-reader-contract.md`；更新 `book/README-EN.md`、`book/README-ZH.md`；对 22 个 canonical chapter 增加机制卡、问题卡、最小实验、故意失败、验收表和下一步。 | 脚本扫描每章固定标题/字段；人工抽查 02、09、17、22；验证每个模块都有链接和状态。 |
| P0-3 | **实验与章节现场断开，且全部实验仍是 `draft/not_run`。** 读者看见“可练习”但不能在章节内马上知道如何开始和如何判断结果。 | `book/labs/README.md` 和 13 个实验增加 `linked_chapters`、`time_estimate`、`first_action`、`expected_artifact`、`failure_variant`；每章只突出一个首选实验；不要因补文案而把状态升为已运行。 | 运行 link checker；随机抽 5 章从正文到实验、再回到验收表；只在实际 sandbox 运行后更新 `run_status`。 |
| P0-4 | **故意失败不总是产生可见失败信号。** 没有错误状态、预期输出或停止点时，读者只会记住“要小心”，不会学会何时停止。 | 各章增加 `Intentional failure` 小节；`evals/task-set-v1.yaml` 增加与章节对应的 failure fixture；`docs/quality/evaluation-framework.md` 规定失败证据和恢复证据。 | 每个失败只改一个条件；验收必须能观察 `failed` 或 `not_run`；保留失败输出，不以漂亮总结替代。 |
| P1-5 | **机制图覆盖不足。** 现有教学 SVG 有价值，但章节图片引用集中于 08、09，前 7 章和 10–22 章的机制仍主要靠长段落。 | 复用现有纸张/墨色视觉语言，在 `assets/teaching/` 增加每章一张轻量机制图或流程图；章节内放图解而不是只在 README 汇总；每个资产写入 `docs/sources/asset-register.md`。 | SVG/PNG 的 alt、来源、许可证、创建日期和证明边界检查；1440/390px 检查文字可读性；禁止图解替代关键文字。 |
| P1-6 | **真实案例层过薄。** 现有房地产案例是合成且诚实的概念案例，但不能覆盖真实现场问题的故障、版本和证据级别。 | `docs/templates/field-case.md` 统一 `case_id/symptom/source_url/version/evidence/triage/stop/degraded_to`；在 `docs/research/field-problems-index-2026-08-10.md` 注册 2–3 个案例；在 Chapter 05、09、13、22 显示短卡；保留 Product Context 案例为 synthetic 轨。 | 每卡可追溯到原始 URL、访问日期和来源类型；不能把用户报告写成官方根因；案例晋升前必须有独立复核或明确保持 `candidate`。 |
| P1-7 | **上一页/下一页、相关实验和下一步不一致。** 当前有 canonical navigation YAML 和目录，但 raw Markdown 读者不一定在每章末尾看到连续阅读链。 | `docs/governance/book-navigation.yaml` 增加/确认 `prev`、`next`、`related_lab`、`next_action`、`content_id`；`scripts/build_book_navigation.py` 生成或检查章节底部导航；同步 `book/table-of-contents-EN.md` 和 locale 版本。 | 验证 01→02、09→10、22→回顾入口的双向/终点行为；检查不存在的 locale 或链接不会生成猜测路径；构建后检查 anchor。 |
| P1-8 | **locale、内容成熟度和运行证据混在读者视野里。** 六种 repository locale 已登记，public site 目前只切 EN/ZH；10–22 的英文迁移和多语言正文仍未同等完成。 | `docs/governance/locale-matrix.yaml` 保持 `content_status`、`translation_status`、`run_status` 分列；`site/index.html/app.js` 在语言入口显示“可用/迁移中/尚未提供”和 English source；章节顶部显示内容、实验、翻译三种状态。未来若用 Starlight，采用同 stem 文件关联和明确缺译提示，不隐藏 fallback。 | 运行 `scripts/validate_localization.py`；检查当前 URL、HTML `lang`、同语种链接、缺译提示和不可用 locale 行为；不要因文件存在或 build 通过就宣称翻译完成。 |

## 9. 真实案例与可见状态的增量规则

### 案例分成两条轨，不混成一种“真实”

**现场问题轨**应保留公开用户报告或官方事件的原始 URL、日期、版本/平台、观察事实和证据等级。它可以教症状识别、最小排查、停止和降级，但不能自动教根因或修复。

**合成产品轨**可以像现有房地产 Product Context 案例一样，用虚构 brief 教上下文、假设、页面结构和本地渲染。但页面必须明确 `CONCEPT`、`NO LIVE DATA` 或等价边界；截图只能证明记录的本地 viewport 和 DOM/render 状态。

两条轨都应在卡片首行显示：

```text
案例类型 / 证据等级 / 报告或创建日期 / 当前状态 / 不能声称什么
```

### 状态标签要回答读者问题

不要只显示 `candidate`。建议显示双行：

```text
内容：candidate     实验：draft / not_run
翻译：source / in-progress     证据：本地静态 / 用户报告 / 已运行
```

旁边加一句动作性说明：

- `draft`：可以阅读和修改，尚不作为已验证步骤使用。
- `candidate`：结构和基础检查通过，仍需声明范围内的新鲜证据。
- `not_run`：实验设计存在，但没有运行记录；不要把预期结果写成结果。
- `verified`：只表示声明范围内的正例、边界、失败和迁移证据齐全。
- `production-ready`：还需要安全、维护、版本、许可证和发布门槛。

这样可以保留项目现有的证据纪律，同时让状态真正帮助学习者决定是否跟随步骤。

## 10. 不要制造的 AI 痕迹

这些是本项目最容易因追求“看起来像 AI 产品”而损失可信度的地方：

- 不要添加机器人头部、神经网络连线、发光渐变、星空网格、随机粒子或“未来控制台”作为没有教学含义的主视觉。
- 不要用生成式插画替代机制图；箭头必须对应输入、动作、状态、证据或边界，不能靠氛围暗示因果。
- 不要制造客户 logo、用户头像、见证语、增长曲线、转化数字、模型排名或“节省 80% 时间”等没有来源的证据。
- 不要放经过摆拍的终端/浏览器截图、虚构命令输出、伪造成功状态或看似真实的 issue 卡；如果是静态示例，明确写 `example`、`synthetic` 或 `not_run`。
- 不要把 `candidate`、页面渲染成功、代码构建成功或 Skill 文件存在升级成 `verified`、“自动完成”或“生产可用”。
- 不要用“AI 说”“模型理解了”作为机制解释；改为描述可观察输入、动作、工具权限、状态和证据。
- 不要让机器翻译或 locale 文件的存在伪装成语言已发布；缺译要可见，当前页面要保留可分享的源语言入口。
- 不要为了模仿成熟知识库而复制其正文、截图、代码、品牌、图标、字体或页面文案；只吸收结构，资产继续登记来源和许可证。
- 不要用过度圆润的卡片、无意义的 badge 和密集渐变把“状态账本”做成游戏化积分；本项目的视觉应继续服务于判断和复核。

## 11. 执行顺序与验证门槛

### Slice 1：先修读者选择

目标文件：`site/index.html`、`site/app.js`、`site/styles.css`、`site/learning-path-data.js`、`README.md`、`README-EN.md`。

交付：三条首屏问题路径、时间、第一动作、产物、下一步和停止条件；EN/ZH 同步；不改变当前状态。

门槛：十秒陌生读者测试、390/768/1440px 视觉检查、键盘焦点和屏幕阅读器名称检查、每张卡的链接和文案一致。

### Slice 2：用 02、09、17、22 做章节纵向切片

目标文件：4 个章节、`book/labs/lab-001-first-safe-task-EN.md`、`lab-003-evidence-review.md`、`lab-010-product-context.md`、`lab-013-l3-vertical-slice.md`、新章节模板、`asset-register.md`。

交付：每章六张卡、底部导航、一张机制图或一张边界明确的截图、一个故意失败和验收表。

门槛：读者从章节顶部能找到目标和前置条件；从正文能到实验；从实验能回到验收；失败能保留证据；所有状态仍如实标注。

### Slice 3：扩展真实问题和案例元数据

目标文件：`docs/templates/field-case.md`、`docs/research/field-problems-index-2026-08-10.md`、`docs/research/field-problems-surface-2026-08-10.md`、Chapter 05/09/13/22。

交付：至少 2 个现场问题卡和 1 个合成产品卡；每个案例都有 URL、日期、版本/平台、证据级别、最小排查、停止和降级字段。

门槛：独立复核者可以区分用户报告、官方事实、本地复现、项目推测和合成演示；不能只看标题推断根因。

### Slice 4：导航、locale 和发布状态

目标文件：`docs/governance/book-navigation.yaml`、`docs/governance/locale-matrix.yaml`、`scripts/build_book_navigation.py`、`scripts/validate_localization.py`、所有 canonical chapter 的底部导航。

交付：同一 `content_id` 的上一页/下一页、实验、问题卡和 locale 入口；未翻译页面显示可见 fallback/尚未提供状态；不生成猜测 URL。

门槛：运行项目既有 validator；逐 locale 检查 path、anchor、HTML lang、同语种链接和状态；只有当前 locale 的公开集合与证据门槛都满足时才开放语言选择。

### 状态晋升原则

本报告建议的新增卡片、图解和模板在第一次落地后仍应保持 `candidate`；实验实际运行前保持 `not_run`；真实案例没有独立复核时保持 `candidate`；浏览器只读检查与构建检查不能代替 runtime、用户接受或生产验证。

## 12. 未验证项

| 项目 | 当前状态 | 下一次应如何验证 |
|---|---|---|
| 本次审计后的首页十秒理解率 | 未验证 | 用陌生读者测试并记录选择、时间、误读和下一步。 |
| 当前 `site/` 在 390px/768px/1440px 的实际渲染和交互 | 本轮未重新执行浏览器检查；仓库状态文件另有历史 browser review 记录 | 本地启动静态服务，逐 viewport 截图并检查菜单、语言切换、tab、hash 和溢出。 |
| 13 个实验的真实执行结果 | `draft` / `not_run` | 在临时副本或 sandbox 中按实验记录运行，保存命令、产物、失败和未验证项。 |
| 39 个评测夹具的结果 | `candidate` / `not_run` / static structure only | 按固定输入执行并保存 run-id、原始输出、评分、错误分类和人工复核。 |
| 7 个 Skill 的完整 runtime 行为 | 部分 basic pretest，部分 static contract review；具体状态以 `content-status.yaml` 为准 | 用新鲜上下文逐个执行最小安全 pretest，保留依赖和权限边界。 |
| Product Context 案例是否代表真实客户结果 | 明确不是；是合成 brief 和本地渲染 | 若要加入真实案例，必须获得可引用来源、去敏、版本、证据和授权；否则继续保持 synthetic。 |
| 六种 locale 是否具备同等读者体验 | 未完成；public site 当前主要提供 EN/ZH，repository locale 处于 migration | 逐页面比较内容、链接、anchor、状态和翻译审校，不以文件数量或 build 通过替代覆盖率。 |
| 当前外部官方页面未来是否保持相同结构 | 未验证且会变化 | 每次内容发布重新访问一手 URL，记录页面变化、适用范围和下一次复核日期。 |
| Astro Starlight 是否适合本项目迁移 | 未评估为实施决定 | 先做不影响主仓库的最小原型，测导航、locale、fallback、anchor、静态 build 和内容迁移成本。 |

## 13. 来源与访问记录

### 外部一手来源

以下页面均在 **2026-08-11** 访问；页面内容可能变化，后续发布应重新核对。

1. [Astro Starlight — Sidebar Navigation](https://starlight.astro.build/guides/sidebar/)：sidebar 的手工链接、分组、目录自动生成、badge 和翻译标签。
2. [Astro Starlight — Configuration Reference](https://starlight.astro.build/reference/configuration/)：`sidebar`、`pagination`、`locales`、`defaultLocale` 等配置语义；分页章节可由 [configuration#pagination](https://starlight.astro.build/reference/configuration/#pagination) 直接定位。
3. [Astro Starlight — Frontmatter Reference](https://starlight.astro.build/reference/frontmatter/)：页面级 `prev`、`next`、`draft` 和其他 reader-facing frontmatter；可直接定位 [#prev](https://starlight.astro.build/reference/frontmatter/#prev) 与 [#next](https://starlight.astro.build/reference/frontmatter/#next)。
4. [Astro Starlight — Internationalization](https://starlight.astro.build/guides/i18n/)：locale 目录、`defaultLocale`、root locale、同名文件关联、fallback 和未翻译提示。
5. [GitHub Docs — Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world)：Prerequisites、步骤、页面内目录、Conclusion、Next steps 和 Further reading。
6. [MDN — Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)：Overview、Prerequisites、Learning outcomes、互动练习和 Next。
7. [Stripe Documentation — API keys](https://docs.stripe.com/keys)：test/live mode 的可见区分、安全提醒、key 类型和下一步链接。
8. [web.dev — Learn Accessibility](https://web.dev/learn/accessibility/)：课程模块、lesson、可选 glossary、quiz、结论和下一步。

### 本地一手项目记录

- [README.md](../../README.md)、[README-EN.md](../../README-EN.md)：公开承诺、入口、视觉资产和案例边界。
- [site/index.html](../../site/index.html)、[site/app.js](../../site/app.js)、[site/styles.css](../../site/styles.css)：首页的信息层级、可见状态、路径和静态视觉入口。
- [book/README-EN.md](../../book/README-EN.md)、[book/table-of-contents-EN.md](../../book/table-of-contents-EN.md)：章节契约和 22 章路线。
- [docs/governance/content-status.yaml](../governance/content-status.yaml)：项目、章节、实验、Skills、评测和 public site 的当前状态。
- [docs/governance/book-navigation.yaml](../governance/book-navigation.yaml)、[docs/governance/learning-path.yaml](../governance/learning-path.yaml)、[docs/governance/locale-matrix.yaml](../governance/locale-matrix.yaml)：canonical navigation、学习路径和 locale 登记。
- [docs/research/skill-case-product-context-real-estate-2026-08-11.md](skill-case-product-context-real-estate-2026-08-11.md)：合成 Product Context 案例、本地截图证据和非声明边界。
- [docs/sources/asset-register.md](../sources/asset-register.md)：视觉资产来源、许可证和使用边界。
- [docs/research/book-navigation-architecture-study-2026-08-11.md](book-navigation-architecture-study-2026-08-11.md)、[docs/research/multilingual-architecture-round2-2026-08-10.md](multilingual-architecture-round2-2026-08-10.md)：既有导航、分页、locale 和 Starlight 结构研究。

## 14. 审计结论

项目不缺主题，也不缺治理文件；最需要补的是读者在每一步看到的“现在做什么、会发生什么、失败时停在哪里、留下什么证据、下一页是什么”。优先完成首页三条决策路径，再用 Chapter 02、09、17、22 做六张卡的纵向切片，最后扩展到 22 章和 locale。只要保持合成案例、用户报告、官方事实、运行结果和生产声明之间的边界，视觉增量会增强可信度，而不会制造虚假的 AI 完成感。
