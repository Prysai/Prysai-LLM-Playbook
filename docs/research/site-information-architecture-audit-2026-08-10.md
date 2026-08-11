# Site information architecture audit

**审查日期：** 2026-08-10
**审查状态：** `candidate`
**审查角色：** 站点视觉与信息架构审查
**写入边界：** 本次只新增本文件；没有修改 `site/` 文件，没有执行 Git 操作。

## 结论先行

当前站点已经具备可信的视觉基线和诚实的状态文案：白底、黑字、Swiss Red、细线网格、英文默认，以及 `candidate` / `draft` / `not_run` 等证据边界都能被看见。问题不在于缺少内容，而在于入口顺序仍更像“仓库说明页”，而不是“学习者现在可以完成什么”的能力目录。

建议把首页改成双入口、单能力模型：

```text
真实问题 / 现在要完成的工作
        ↓
推荐能力单元（content_id）
        ↓
学习等级与先修条件
        ↓
章节 + 实验 + Skill + 评测
        ↓
证据门槛、失败边界、下一步迁移
```

“项目索引、状态台账、六语言路线、研究边界”仍然要保留，但降为可信度层和维护层，不应成为首访者理解产品的第一任务。英文默认应是可直接学习的 source locale；六语言切换应展示真实覆盖状态，而不是把六个 locale 入口解释成六语言正文完成；所有推荐和搜索结果都应由真实内容数据驱动，并把状态、风险、表面、证据类型和来源一起暴露。

## 证据范围与限制

本审查阅读了项目约束、术语与章程、书籍架构、内容矩阵、locale matrix、学习路径数据、站点 README、`site/index.html`、`site/app.js`、`site/styles.css`、`site/content-catalog.json`，以及现有站点/网页方法、多语言、教程结构和 WorkBuddyGuide 结构研究。

运行时只做了本地、只读检查：

- `http://localhost:4173/site/` 返回 HTTP 200；英文直接打开时 `document.documentElement.lang` 为 `en`，标题和主要入口为英文。
- 在 Codex 应用内浏览器观察到英文桌面首屏；在显式 390px 视口观察到移动首屏。移动视口没有横向溢出，导航折叠为 Menu，Escape 可关闭菜单；这些是当前本地运行证据，不是生产部署或真实设备验收。
- 当前页面有 1 个 H1、12 个 H2、13 个顶层 section 和 93 个链接。页面运行时没有发现控制台 error；这不等于内容可读性、屏幕阅读器、200% 缩放、对比度、跨浏览器或真实用户验收已经完成。
- 直接访问 `/book/chapters/01-gpt-and-codex-EN.md` 和无后缀的章节链接时，静态服务器返回 `text/markdown`。这证明文件存在，不证明托管环境会把它渲染为友好的阅读页；现有质量记录也把正文呈现列为未闭合问题。

## 当前页面可见的主要问题

### 1. 首屏层级：品牌表达强，学习选择弱

首屏 H1 “Use Codex for real work.” 有明确承诺，主 CTA 是 “Start a 30-minute safe task”，次 CTA 是 “Choose a learning level”，方向正确。但首屏还同时放入页面索引、candidate 眉标、版本基线、四个项目速览和 `Problem → protocol → action → evidence`。首访者需要先理解项目治理语汇，才能判断自己该从哪条路进入。

具体影响：

- `Project index`、`Evidence ledger`、`Six-language route` 和 `Field problems` 的优先级与“开始学习”相同，形成五个并列的首屏任务。
- `Current baseline v0.1` 重要但属于信任/状态信息，应紧跟 CTA 或放入“what you will produce / what is verified”模块，而不应与主要学习选择竞争。
- 首屏四个速览项目没有说明适合谁、预计耗时、会留下什么产物，因此是目录标签，不是行动决策。

建议首屏只完成三件事：说明学习结果、让读者选择真实问题、明确第一产物。把治理索引移到首屏后的 `Evidence & maintenance` 区域，并保留一个小型状态条作为透明度信号。

### 2. 导航：链接完整，但把内容类型当成主要心智模型

桌面主导航同时列出 `Start with a problem`、`First 30 minutes`、`Learning path`、`Project index`、`Reading routes`、`Labs`、`Skills`、`Update map` 八项。它覆盖面广，但四种不同维度混在一个平面：任务入口、时间入口、等级入口、仓库层、内容类型和维护治理。

这会造成两个问题：

- “Labs”和“Skills”容易让用户从内容类型开始，而项目章程明确要求先建立判断，再增加能力；首页也写着“Do not start with a Skill”。
- 用户从 `Learning path` 或 `Reading routes` 进入后，无法在导航层立即知道该入口依赖什么、与哪个能力单元相同、下一步的实验是什么。

建议使用四个一级入口，全部回到同一个 canonical capability unit：

1. `Start a task`：按真实问题和想完成的工作进入。
2. `Learn by level`：L0–L6，显示先修条件和毕业证据。
3. `Browse capabilities`：章节、实验、Skill、评测按能力单元聚合。
4. `Evidence & updates`：状态源、事实卡、研究边界、更新地图。

`Labs`、`Skills` 和 `Reading routes` 变为二级筛选或内容类型标签，而不是三个平行目的地。移动端可以继续使用 Menu，但菜单打开后应显示一级入口分组、当前 locale、当前内容状态和返回首页动作。

### 3. 学习路径：模型正确，纵向阅读负担过重

当前学习路径是页面最有产品价值的部分：L0–L6 tab、章节、实验、Skill、评测夹具、四类证据、`move on when` 和 `stop when` 都在同一面板。它已经把“读多少”转成“能解释、能操作、能判断、能审查”，与 `docs/learning-model.md` 和内容矩阵一致。

可见问题是一次呈现过多字段：

- 一个等级面板同时承担概念说明、章节列表、实验列表、Skill 列表、评测夹具、证据门槛、毕业条件、停止条件和下一步。
- 评测夹具以内部 ID 呈现，适合维护者，不适合第一次学习者；应有读者可理解的目标和状态，内部 ID 放入可展开的 provenance 区。
- 当前 tab 是垂直 tablist，已实现方向键、Home/End 和 `aria-selected`，但每个 tab 都指向同一个 `aria-controls="level-panel"`。这是可工作的单面板模式，却把七个等级的差异压缩成大量切换后文本，移动端尤其容易失去当前位置。
- `status`、`run_status`、`content_status`、`translation_status` 和 `claim_status` 并列出现时，学习者会把“内容 candidate”和“实验 not_run”误认为同一个成熟度。

建议把一个等级面板收敛为“等级契约”：顶部放 `Level / audience / time / prerequisite / status`；中部最多三个推荐单元，按 `primary`、`supporting`、`transfer` 分组；每个单元绑定 problem、objective、chapter、lab、Skill、evaluation、evidence、stop condition；底部提供 `Open the unit`、`Run the lab`、`See source/status` 三个动作。“全部章节 / 全部实验 / 全部 Skill”移入可筛选的能力目录。

### 4. 视觉层级：Swiss 方向成立，但元数据和正文争夺注意力

当前 `styles.css` 使用 `#f6f6f3`、`#161616`、`#e4002b`、hairline border、左对齐和编号网格；本地英文截图也呈现出清楚的 editorial grid。这是可保留的方向。

但有四个视觉层级问题：

- 首屏 H1 在默认桌面视口约 115px，远大于真实任务、状态和第一步产物；它让页面更像品牌封面，削弱学习目录的可操作感。
- 眉标、folio、编号和全大写标签很多，且 `small` 元数据在移动端约 10.7–11.5px；这些文本承载真实状态，却被当作装饰性注释处理。
- 深色 `Labs` / `Skills` 区块、白色卡片、纸色背景和红色大面积动作区的节奏丰富，但 section 之间缺少固定的“你将得到什么”句式，滚动时更像连续海报，而不是连续课程。
- sticky header 使用半透明背景和 blur；它不构成严重问题，但会引入第二种玻璃材料语言。若采用 Swiss anchor，应把层级交给规则线、留白和排版，不再叠加装饰效果。

### 5. 可访问性：基础门槛较好，阅读和状态语义仍不完整

已有优点：`Skip to main content`、可见 focus outline、语义 heading、`aria-labelledby`、移动 Menu 的 `aria-expanded`、Escape 返回焦点、学习路径键盘操作、筛选按钮的 `aria-pressed` 和 `aria-live` 状态都已存在。

需要补强：

- 语言切换目前是一个 EN/ZH 双态 button，按钮内的两个 `span` 不是可单独激活或可被清晰朗读的六语言选项。未来六语言应使用带 `lang`、显示名称和状态的 listbox/menu 或明确的导航链接；不可用语言不能只靠灰色文字表达。
- 语言切换只在运行时支持 `en` / `zh`。`locale-matrix.yaml` 登记的是 EN、ZH、ES、JA、KO、DE 的入口切片，不是六语言完整正文；UI 必须逐项显示 `UI available`、`entry slice`、`content not started`、`translation in progress`、`review pending` 等真实状态。
- `href="#status"` 在当前 HTML 中可以定位到状态区域，但在 hero 中“See the evidence boundary”与状态区的距离很远；建议改成 `#evidence` 或在首屏附近放一个真正的 evidence summary，避免用户需要滚动寻找被承诺的边界。
- 章节链接没有统一的 reader-facing HTML 阅读路由；若最终仍提供 raw Markdown，应明确标注 `Open source Markdown`，不要让“阅读章节”和“打开源码”使用同一视觉动作。
- 下一轮应验证 `prefers-reduced-motion` 之外的 200% 缩放、键盘完整路径、屏幕阅读器朗读顺序、颜色对比度、中文/日文/韩文长文本换行和真实 390px 设备。

### 6. 信息透明度：诚实的状态存在，但颗粒度还不够靠近行动

当前页面明确写出：项目 `candidate`、22 章 `candidate`、13 labs `draft` / `not_run`、7 Skills `candidate`、研究为用户报告且未本地复现；这比用“ready”或“mastery”更可信。

透明度的缺口是状态没有始终绑定到当前动作：

- `Open chapter 9`、`Run lab 004` 等 CTA 没有在卡片上同时显示内容状态、运行状态和风险边界。
- `current status source` 是 YAML 文件链接；维护者可以复核，但学习者需要一个人类可读的 status detail，包括 `checked_at`、`source_revision`、`applies_to`、`owner`、`next_review` 和“这条状态不能证明什么”。
- 首页显示 22、13、7 等数量，但数量不是学习效果证据；应该优先显示“推荐的 1 个能力单元”和它的四类证据状态，数量作为次级上下文。
- 现实问题研究已正确标明 `candidate`、用户报告、没有本地复现；建议把 `source type / version / safe check / local reproduction` 直接放入问题卡，而不是只在研究索引页说明。

## 推荐信息架构

### 首页的建议顺序

```text
1. Header
   Wordmark | Start a task | Learn by level | Browse capabilities | Evidence & updates | Language

2. Hero: choose a useful next step
   Promise: use Codex for real work with evidence
   Primary task picker: “What are you trying to do?”
   Secondary: “I am new to Codex” / “I need to review a completion claim”
   Compact trust strip: candidate · 22 chapters · 13 labs · 7 Skills · 6 locale target

3. Recommended first vertical slice
   Chapter 1 → Lab 011 → four evidence types → stop boundary
   Separate “read”, “do”, “review” actions

4. Choose by problem
   Four to six real task cards, each mapped to one content_id

5. Choose by level
   L0–L6 compact ladder; one selected level opens its contract

6. Browse capabilities
   Filters: kind · level · task · surface · risk · evidence · status · locale

7. Evidence and maintenance
   Status source · fact cards · research boundary · update map · next review

8. Footer
   English source locale · locale coverage · project is independent, not official OpenAI docs
```

关键决策是让“任务入口”和“等级入口”都指向同一 `content_id`，而不是各自复制一套章节/实验卡。一个能力单元可采用以下数据形状：

```text
content_id
kind: capability-unit
task
level
surface
risk
prerequisites
chapter
lab
skills
evaluation
evidence: explanation | operation | judgment | review
content_status
lab_status
translation_status
source_revision
owner
next_review
```

这直接承接 `docs/content-matrix.md`、`docs/governance/learning-path.yaml` 和 `site/learning-path-data.js` 的已有关系，避免为首页另造“展示专用事实”。`site/learning-path-data.js` 是生成物；未来首页改造应继续从治理源和内容目录生成，而不是在 `index.html` 里手写内容状态。

### 首页首个纵向切片的建议

首个可验证切片建议使用现有 M01/M02/M13 关系，而不是重新创造 demo：

| 入口 | 真实内容 | 首页呈现 | 读者产物 |
|---|---|---|---|
| I am new to Codex | Chapter 1 + Lab 011 + Codex Coach | 先分清 GPT、Codex、模型、工具、Skill、Agent | 一张静态任务卡，标出输入、行动、状态、证据 |
| I need a safe first task | Chapter 2 + Lab 001 + Task Protocol | 可回滚、可观察、先检查再编辑 | 一个具体 diff、最小检查结果、未测试边界 |
| I need to audit a result | Chapter 9 + Lab 003 + Evidence Review | 从“看起来完成”转向断言—证据对应 | 一张 claim/evidence 表和一个缺口 |
| I need a complete workflow | Chapter 8/10/13 + Lab 013 + Workflow Orchestrator | 从协议、基线、检查点到交付 | 一条包含失败和迁移的可审计纵向切片 |

每张卡只允许一个 primary action；secondary links 用于查看来源、状态或关联内容。这样首页会有真实内容数据的密度，但不要求首访者先读仓库地图。

## 英文默认与六语言切换方案

### 目标状态必须拆开

六语言应在 UI 中展示，但状态必须拆成四列：

| 维度 | 当前可说的事实 | 目标行为 |
|---|---|---|
| UI locale | 当前运行时可切换 EN / ZH | 六种语言的 UI 字典、`html lang`、title、description、ARIA、错误/空状态完整覆盖 |
| Entry slice | locale matrix 已登记 EN/ZH/ES/JA/KO/DE 的项目、书籍入口、序言、目录切片 | 每个公开 locale 有同一内容身份和可分享 URL |
| Body coverage | 22 章、13 labs、7 Skills 尚未形成完整六语言正文 | 按完整能力单元迁移；缺失翻译显式显示，不静默 fallback |
| Verification | 翻译状态主要是 `in-progress`，实验为 `draft/not_run` | UI translation、content translation、lab run、volatile-fact review 分开验收 |

切换优先级采用：

```text
合法 URL locale > 白名单内的持久化偏好 > EN 默认
```

切换时保持 `content_id`、canonical route、显式稳定 anchor、允许保留的筛选状态和 hash；不要通过翻译后的标题或相对路径字符串拼接来猜测目标。此建议直接来自现有多语言研究与 ADR 边界。

### 迁移期的可见语言选择器

建议从双态按钮升级为菜单，每项显示：

```text
English        UI + entry + source       default
简体中文       UI + entry                body path primarily Chinese
Español        entry slice               body translation not started
日本語          entry slice               body translation not started
한국어          entry slice               body translation not started
Deutsch        entry slice               body translation not started
```

语言项的状态应是可读文本和可访问名称的一部分，而不是仅靠颜色。对未开放的 locale，提供“view entry status”或保持可选但落到透明的 migration status page；不要把半翻译内容伪装成完整语言。等一个 locale 拥有完整最小能力集——概念、实验、失败例、验收和来源——再把它升级为学习路径语言。

## 选择的 frontend-design anchor：Swiss

选择 `Swiss`，因为这个项目的独特价值是把复杂的 Codex 工作系统、证据边界和内容身份变成可扫描的公共索引；纯粹的白/中性底、单一红色信号、左对齐网格和编号系统能直接表达“判断、路径、证据”，不需要靠 AI 产品常见的渐变、玻璃、终端装饰或插画制造可信感。

设计系统建议保持单一 anchor：

- **Surface：** `#FFFFFF` 或当前中性 `#F6F6F3`，避免暖纸色、纹理和渐变。
- **Type：** 一套高可读的无衬线字体，显示与正文保持同一 family；优先明确的系统 fallback，避免未加载 webfont 导致宽度漂移。
- **Accent：** Swiss Red `#E4002B` 只用于行动、选中、状态信号和关键规则线。
- **Structure：** 1px hairline rules、左对齐、不对称网格、编号和 tabular numerals；用空间和线表达层级。
- **Interaction:** 一个可见的 signature move 是“evidence rail”：每个能力单元沿右侧或底部固定显示 `read / do / review / stop` 四个证据节点，节点点击只切换真实内容单元的对应证据，不新增装饰性状态。

当前视觉已经接近这个方向。改进重点是收紧 token 使用：降低首屏 H1 的封面感，提升能力单元和 CTA 的正文比重，放大承载状态的元数据到至少可舒适扫描的正文/辅助字号，保留规则线和数字，不加入第二套 frosted-glass 或 neon 语言。

## 优先级方案

### P0：先修入口和真实性

1. 把首页主 CTA 改为“按任务选择”，同时保留 `Start the first safe task` 作为推荐纵向切片；两者都指向真实 `content_id`。
2. 将首页首屏四个速览重组为 `task / level / capability / evidence` 四个入口，移除与首访者无关的仓库路径说明。
3. 给所有正文、实验和 Skill CTA 附加真实状态、风险、是否运行和“这不能证明什么”。
4. 在站点层提供 reader-facing HTML 路由，或明确把 raw Markdown 标为源码；不要把文件路径存在性当成阅读体验证据。
5. 统一 chapter/lab/Skill 链接生成器，以 `content_id` 解析同 locale 目标；迁移期缺失目标要显示状态和英文 canonical 入口。

### P1：把能力目录做成可发现系统

1. 建立能力单元卡和字段索引：`kind`、`level`、`task`、`surface`、`risk`、`evidence`、`status`、`locale`、`source_revision`、`next_review`。
2. 让任务入口、L0–L6、阅读路线、搜索和实验索引全部回到同一能力单元，不复制正文。
3. 将等级面板从“全字段长卡”改为“契约摘要 + 推荐三项 + 展开全部”。
4. 把评测 fixture 的内部 ID 转为读者可理解的验收描述，保留 ID 作为 provenance。
5. 增加稳定 route key 和显式 heading ID，保证语言切换、收藏和分享不会因翻译标题变化而断裂。

### P2：完成发布级多语言和阅读验证

1. 先完成英文最小能力集，再逐 locale 迁移同一纵向切片；每个翻译记录 source revision、译者/审查者、术语审查和下次复核。
2. 为每个 locale 增加 UI、正文、实验、易变事实和可访问性状态，不把“按钮已翻译”升级成“语言已完成”。
3. 做 320px/390px、200% 缩放、对比度、键盘、屏幕阅读器、长文本、断链、跨浏览器和部署环境的验收。
4. 将状态页的人类可读摘要与 YAML canonical source 关联，展示 checked date、owner、next review 和 scope。

## 视觉、IA 与透明度验收清单

下一轮实现或设计评审至少应满足：

- [ ] 英文无参数 URL 是默认、可分享且稳定的 canonical 入口。
- [ ] 首屏 5 秒内能回答：这是什么、我能从哪里开始、我要留下什么产物、当前哪些部分未验证。
- [ ] 首屏主 CTA、任务卡、等级卡都指向真实内容单元，而非 demo 或数量统计。
- [ ] 同一 `content_id` 可从任务、等级、能力、搜索四个入口抵达，且没有重复正文。
- [ ] 六语言 selector 显示 EN/ZH/ES/JA/KO/DE 的真实状态；缺失翻译不静默 fallback。
- [ ] `html lang`、title、description、可见语言名、ARIA、空状态和错误状态随 locale 一致变化。
- [ ] 章节、实验、Skill、评测在卡片级别区分 `content_status`、`lab_status`、`translation_status` 和 `claim_status`。
- [ ] 阅读 CTA 与 raw Markdown/source CTA 语义和视觉上明确分开。
- [ ] Swiss token 保持单一：中性白底、单一红色、无渐变/纹理/霓虹/第二种材质语言、可见网格线。
- [ ] 元数据不低于可舒适扫描的字号；中文、日文、韩文长文本不会破坏网格、按钮或状态标签。
- [ ] 键盘用户可完成语言选择、菜单、等级切换、路线筛选和所有 CTA；焦点顺序与视觉顺序一致。
- [ ] 通过 200% 缩放、对比度、屏幕阅读器、320/390px、真实部署和至少一条完整学习路径的 fresh-context 验收后，才可把站点从 `candidate` 升级。

## 来源与许可边界

本审查只迁移本项目已有的原创研究结论和可核对的结构观察，不复制外部正文、代码、图片、字体、图标、品牌表达或案例素材。WorkBuddyGuide 研究仍按 `reference-only` 处理；任何未来要采用的具体外部资产，必须先在 `docs/sources/asset-register.md` 单项核对来源、许可证、归属和使用范围。

主要本地依据：

- `AGENTS.md`、`CONTEXT.md`、`docs/charter.md`、`docs/book-architecture.md`：术语、目标、状态语言和安全/许可边界。
- `README-EN.md`、`README.md`：英文默认、六 locale 目标和当前状态。
- `docs/content-matrix.md`、`docs/governance/learning-path.yaml`、`docs/governance/locale-matrix.yaml`、`docs/governance/content-status.yaml`：内容身份、学习路径、语言矩阵和状态源。
- `site/index.html`、`site/app.js`、`site/styles.css`、`site/learning-path-data.js`、`site/content-catalog.json`：当前页面结构、运行时字典、视觉 token、生成数据和目录关系。
- `docs/quality/site-content-and-ux-review-2026-08-10.md`、`docs/quality/review-public-site-browser-2026-08-10.md`：当前本地浏览器验收及其限制。
- `docs/research/web-ux-benchmarks-2026-08-10.md`、`docs/research/web-methods-synthesis-2026-08-10.md`、`docs/research/multilingual-content-architecture-2026-08-10.md`、`docs/research/tutorial-architecture-benchmark-2026-08-10.md`、`docs/research/workbuddyguide-structure-study-2026-08-10.md`：双入口、能力目录、证据组件、locale 身份、稳定 anchor 和 reference-only 结构启示。

**最终判断：** 当前站点是一个有可信骨架的 `candidate` 展示页；它还不是可以把六语言、完整正文覆盖、阅读渲染或学习效果称为已验证的生产级学习产品。下一次视觉工作应围绕一个真实能力纵向切片完成首页入口、内容数据、locale 状态、正文呈现和证据验收，再扩大页面规模。
