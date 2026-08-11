# 教程/知识产品结构基准研究（2026-08-10）

**研究对象：** OpenAI Codex 官方文档、Anthropic Claude Code 官方文档、Model Context Protocol（MCP）官方规范/文档、`rust-lang/book`《The Rust Programming Language》，并对照 `AlephAITech/WorkBuddyGuide`。

**研究目的：** 提炼教程的章节结构、学习路径、案例/实验模板、搜索与多语言机制、版本策略、贡献流程，以及把阅读材料转成可复现能力的方法，为 Codex Field Guide 做课程决策。

**研究状态：** `candidate`。本文件的来源访问和仓库版本核对已完成；“学习效果”“维护者内部流程”“外部站点后台部署”等无法从公开证据确认的内容保留为 `unknown`，没有把本次研究当作运行时或用户效果验证。

**访问日期：** 2026-08-10（America/Los_Angeles）。

## 1. 结论先行

### 1.1 没有一个参照对象单独解决 Field Guide 的全部问题

| 参照对象 | 最值得借鉴的机制 | 不能直接替代 Field Guide 的部分 |
| --- | --- | --- |
| OpenAI Codex 文档 | 用文档地图、Markdown 版本和能力入口把多个产品表面串起来；把 CLI、Skills、MCP、非交互运行、代码审查和安全边界分别落到任务入口 | 更像产品/操作文档集合，不是公开的、分级的能力课程；页面本身没有本项目所要求的四类学习证据和迁移门槛 |
| Claude Code 文档 | 从快速开始进入真实任务，再用“探索—计划—实现—验证—提交/审查”组织日常工作；把上下文、会话、Skill、Hook、MCP、子 Agent 和并行工作连成工作方式 | 功能更新很快，页面数量和平台入口很多；公开资料不能证明每个页面都提供独立的掌握评测或跨版本的实验基线 |
| MCP 规范/文档 | 把概念、规范版本、实现教程、Inspector、贡献流程、原型和一致性测试放在同一生态里；对兼容性和安全责任有明确边界 | 主要面向协议实现者和集成者，不负责教读者建立完整的 Agent 工作判断力或组织治理能力 |
| Rust Book | 线性、渐进、可构建的章节路径；代码清单、构建、测试、版本/edition 和稳定/测试渠道形成可重复的技术教材生产链 | 对“模型输出是否可靠”“权限是否足够”“Agent 是否越界”等协作系统问题没有对应教学对象；能力掌握不主要用独立审查证据定义 |
| WorkBuddyGuide | 阅读指南、按任务进入、正式蓝皮书与社区案例分层、案例 PR 模板和动态案例目录 | 品牌/媒体资产不能整体复制；根目录 MIT 不自动覆盖图片、字体、图标、二维码、投稿内容和第三方素材；公开资料也不能证明其后台发布链的全部状态 |

**`inference`：** Codex Field Guide 最有价值的定位不是再做一套产品功能索引，而是把“稳定原理—易变产品事实—低风险实验—失败恢复—证据审查—迁移任务—团队维护”做成一个闭环。外部对象分别提供闭环的不同部件，Field Guide 应做组合与补空白。

### 1.2 应采用“双入口、单能力模型”

课程同时提供两种入口，但不能因此维护两套互相漂移的正文：

1. **学习入口：** 按 L0–L6 从概念、边界、最小操作逐步走向工作流、Agent 审查和团队能力包。
2. **任务入口：** 按“我想完成什么”进入任务卡，例如理解代码库、修复问题、研究外部事实、设计 Skill、接入 MCP、审查交付物。
3. **能力单元是唯一汇合点：** 两条入口都指向同一个概念、实验、证据、失败变体和迁移任务，而不是复制章节。

这吸收了 WorkBuddyGuide 的顺序阅读/任务跳读设计和 Codex/Claude Code 的任务导向，但保留项目已经确定的 L0–L6 与四类证据模型。[I1–I7][W1][O1–O6][A1–A7]

### 1.3 最小可落地单元不是“文章”，而是“能力包”

建议把每个能力单元固定为以下链条：

```text
真实问题
→ 稳定概念与边界
→ 任务协议
→ 低风险实验
→ 预期观察与运行记录
→ 故意失败/边界变体
→ 正例、边界例、失败例、迁移例评测
→ 证据审查
→ 个人方法/Skill/AGENTS.md/团队规范
→ 版本、负责人、复核日期与回滚目标
```

**`inference`：** 这是把 Rust Book 的“可构建代码”、Claude Code 的“给 Agent 可运行的验证”、MCP 的“原型与一致性测试”、WorkBuddyGuide 的“案例投稿字段”统一到 Field Guide 的课程语义中的原创抽象；它不是任何单个来源的原文模板。

### 1.4 Field Guide 的差异化应落在“完成声明的证据”

外部产品文档擅长告诉读者“能做什么”和“怎样开始”，协议文档擅长说明“必须怎样兼容”，传统技术教程擅长让代码编译运行，案例型蓝皮书擅长展示“别人怎样完成任务”。Field Guide 还需要回答：

- 学习者是否理解模型、Codex、工具、Skill、Agent 和权限的边界？
- 学习者是否在当前入口、版本和账户范围内真的完成了操作？
- 学习者是否能说明取舍，而不是只复述一个成功案例？
- 学习者是否能发现输出、配置、登录、构建和运行证据之间的缺口？
- 学习者是否能把个人方法迁移到另一个领域，并给团队留下可维护资产？

这正是项目已有“四类证据”与 L0–L6 路径应承担的核心差异。[I1–I7]

## 2. 证据分级和研究边界

本文件对每条观察使用以下标记：

| 标记 | 含义 | 写法约束 |
| --- | --- | --- |
| `fact` | 能在本地项目文件、固定 commit、官方页面或官方页面的可观察元数据中直接核对 | 只陈述来源明确表达或结构明确存在的内容 |
| `inference` | 根据多个 `fact` 得出的课程/产品判断 | 必须说明推导方向，不伪装成参照项目作者的内部意图 |
| `unknown` | 公开来源不足以确认，或本轮没有做运行时/后台/用户研究 | 不把“看起来应该如此”写成已验证事实 |

本轮只提炼结构与机制，不复制任何外部正文、提示词、代码、图片、截图、图标、字体、品牌表达、案例素材或 Skill 指令。短命令名、协议术语和文件名只作为事实索引，不作为可复制教材资产。

## 3. 当前 Field Guide 基线

以下是本仓库已有的设计，不是外部参照对象的推断：

| 基线 | 当前定义 | 对本次研究的约束 |
| --- | --- | --- |
| 产品定位 | 面向 Codex GPT 的学习、实践与能力系统，不是 Skill 目录或安装手册 | 外部文档只能提供机制参考，不能把 Field Guide 降级为功能手册 |
| 主线 | “概念 → 判断 → 操作 → 实验 → 复盘 → 迁移” | 任何新增章节都要有行动、失败、证据和迁移，不只增加说明文字 |
| 阅读路径 | L0 观察者到 L6 组织教练；支持顺读和任务跳读 | 任务入口必须回到同一能力模型和毕业门槛 |
| 内容分层 | 稳定层、产品层、领域层、实例层 | 模型名、入口、参数、价格、权限和外部 API 不得伪装成稳定原理 |
| 掌握证据 | 解释证据、操作证据、判断证据、审查证据 | “页面看过”“工具已安装”“输出像真的”都不等于掌握 |
| 内容状态 | `draft`、`candidate`、`verified`、`production-ready` | 研究结论、章节成熟度、实验运行状态和翻译状态分开记录 |
| 更新原则 | 易变事实附权威 URL、访问日期、适用范围、负责人和复核日期 | 每次产品更新都要能定位受影响的章节、实验、Skill 和来源 |

依据：`CONTEXT.md`、`docs/charter.md`、`docs/book-architecture.md`、`docs/learning-model.md`、`docs/governance/content-lifecycle.md`、`docs/governance/contribution-model.md`。[I1–I7]

## 4. 结构对照

### 4.1 信息架构：四种“知识形状”

| 知识形状 | 代表来源 | 观察到的组织方式（`fact`） | Field Guide 决策 |
| --- | --- | --- | --- |
| 产品能力地图 | OpenAI Codex | 用文档索引把入口、CLI、IDE、Cloud、Skills、MCP、权限、审查、非交互模式和配置分成可搜索页面；页面有 Markdown twin 和完整索引 | 建立“表面 × 能力 × 风险”的索引；产品事实页只做可定位的状态卡，不承担全部教学 |
| Agent 工作方式 | Claude Code | 官方索引将 Getting Started、Core concepts、Use、Platforms 分开；快速开始后继续进入代码库理解、改动、Git、测试、常见工作流和最佳实践；最佳实践强调给任务一个可运行的验证信号 | 把“工作循环”作为跨工具的稳定概念层；每个产品入口只承载差异化操作 |
| 协议/实现/治理 | MCP | 文档区分入门、概念、开发教程、工具、规范、社区和 SDK；规范单独按日期版本化；贡献指南区分普通文档 PR 与需要 SEP 的协议变更 | 对 MCP 类内容采用“概念 → 规范版本 → 最小实现 → Inspector/测试 → 兼容性 → 贡献”链条 |
| 线性技术教材 | Rust Book | `SUMMARY.md` 按概念递进到项目；附录承担 edition、翻译和生态说明；书源、构建、测试和代码发行物分开 | 保留线性主线和附录，但把每章的代码练习改造成有输入、观察、失败变体和证据的实验 |
| 案例/社区产品 | WorkBuddyGuide | 正式蓝皮书、社区 Case、阅读指南和帮助入口分开；Case 可先独立贡献，再经编辑/复现进入正文 | 建立 `candidate case → 复现 → 编辑 → 正式能力单元` 的晋升链，不把用户报告直接当教程事实 |

**`inference`：** Field Guide 需要“多层结构”，但不需要照搬任何一个站点的页面树：

```text
稳定概念与判断
        ↓
能力单元（章节 + 实验 + 评测 + 来源边界）
        ↙                    ↘
学习路径（L0–L6）      任务索引（按真实问题）
        ↓                    ↓
             同一份证据与更新登记
```

### 4.2 学习路径：从“会启动”到“能负责”

| 阶段 | OpenAI Codex | Claude Code | MCP | Rust Book | WorkBuddyGuide | Field Guide 应取的共同机制 |
| --- | --- | --- | --- | --- | --- | --- |
| 起步 | 安装、登录、进入项目、描述第一个任务 | 安装、登录、启动会话、问代码库问题 | 先解释 MCP，再进入构建 server/client | 安装工具链、Hello World、Cargo | 从蓝皮书导读或具体案例进入 | 先完成一个低风险、可观察、可回滚的闭环 |
| 中段 | CLI 工作循环、配置、Skills、MCP、审查 | 代码库探索、计划、实现、测试、Git、常见工作流 | 概念、transport、tools/resources/prompts、Inspector | ownership、模块、测试、I/O 项目 | 真实岗位/任务案例 | 每个概念后有小实验，每个实验后有复盘 |
| 进阶 | 非交互、CI、子 Agent、Cloud、组织配置 | Skills、Hooks、MCP、子 Agent、并行会话、自动化 | 版本兼容、安全、SEP、SDK/conformance | async、并发、发布、最终项目 | Skill、多 Agent、自动化系统 | 从个人操作迁移到可复用工作流和团队治理 |
| 毕业 | 官方文档未公开统一的学习毕业标准 | 官方文档强调验证和独立审查，但未公开统一课程等级 | SEP Final 需要实现；标准变更还涉及一致性测试 | 能构建/测试完整项目，但不等于 Agent 掌握 | 案例可进入正文，但有编辑和复现边界 | 四类证据 + 迁移任务 + owner/version/review/rollback |

**`fact`：** Rust Book 和 MCP 的“可运行对象”最明确；Claude Code 的“工作闭环”最明确；OpenAI Codex 的“能力入口覆盖”最完整；WorkBuddyGuide 的“真实案例入口”最明显。[O1–O9][A1–A9][M1–M7][R1–R6][W1]

**`unknown`：** 本轮没有用户实验，因此不能比较这些项目的完成率、首次通过率、长期留存或跨领域迁移效果。页面数量、章节数量或功能列表长度不能作为学习效果证据。

## 5. 章节、案例与实验模板对照

### 5.1 参照模板的有效部分

| 模板类型 | 来源证据 | 有效机制 | 缺口 |
| --- | --- | --- | --- |
| 快速开始 | Codex CLI、Claude Code Quickstart | 有前置条件、安装/登录、第一次真实任务和下一步；Claude Code 将代码库理解、改动、Git 和测试放在同一条起始链上 | 通常不要求学习者提交结构化运行记录、失败变体、四类证据或迁移结果 |
| 工作流 recipe | Claude Code Common Workflows/Best Practices、Codex CLI | 用任务目标、上下文、操作顺序和验证信号描述日常工作；强调先探索/计划，再实现/验证 | 适合“怎样做”，不一定回答“怎样判定自己会了”和“换工具后是否仍会” |
| 构建教程 | MCP Build Server、Rust Book 章节 | 有系统要求、依赖、分步动作、代码/协议对象、运行方式和测试/检查点；MCP 还明确连接 host 的验证边界 | MCP 示例有实现语言和客户端差异；Rust 的代码验证不能直接迁移成 Agent 行为验证 |
| 社区 Case | WorkBuddyGuide Case 模板 | 要求场景、目标、Skill、前置条件、操作、效果、验收、问题、安全和复用；PR 还要求去敏、查重和构建 | “截图/最终效果”仍可能不足以证明运行、权限、来源或长期维护；不同案例的证据深度可能不一致 |
| 规范提案 | MCP SEP | 重大变化需要动机、规范、理由、兼容性、安全、原型、赞助和最终一致性测试 | 这是协议治理模板，不适合直接作为初学者章节模板 |

### 5.2 Field Guide 的章节模板（原创课程决策）

以后新增正式章节时，建议按以下固定顺序组织；这不是复制任何外部模板，而是对本项目章程和参照机制的合成：

1. **真实问题：** 谁在什么情境中遇到什么失败或不确定性；不从产品功能名开头。
2. **学习目标：** 读者需要解释、操作、判断和审查什么；写明不在范围内的内容。
3. **最小概念：** 只引入解决本问题所需的 GPT/Codex/上下文/工具/Skill/Agent/权限术语。
4. **边界判断：** 哪些信号只能说明配置、可见性或构建，哪些信号才支持运行和交付声明。
5. **任务协议：** 固定输入、权限、工具、停止条件、验收标准和回滚点。
6. **最小实验：** 在低风险沙盒或副本中完成一个可观察动作，并保存运行记录。
7. **失败/边界实验：** 有意制造一个输入缺失、权限不足、版本不匹配、工具不可用或输出不完整的变体，记录停止与恢复。
8. **证据审查：** 对每条完成声明建立“断言—证据—范围—缺口”表。
9. **迁移任务：** 换一个领域、入口或输入形态，检验学习者是否掌握方法而非记住步骤。
10. **掌握检查：** 解释、操作、判断、审查四类证据全部出现，才允许标记为掌握。
11. **易变事实卡：** 产品入口、命令、模型、权限、版本、第三方 API 的来源、访问日期、适用范围、负责人和下次复核日期。
12. **来源/许可边界：** 哪些是链接参考、哪些是本项目原创、哪些素材不能复制或再发行。

### 5.3 Field Guide 的实验模板（原创课程决策）

实验文件或实验区块至少应包含：

| 字段 | 要回答的问题 |
| --- | --- |
| `purpose` | 这个实验要改变哪一个可观察能力？ |
| `risk_and_scope` | 会读取/修改什么？是否涉及网络、账号、个人数据、外部发布或高权限？ |
| `prerequisites` | 入口、产品版本、运行时、项目副本、依赖和认证边界是什么？ |
| `fixed_input` | 如何让不同学习者使用同一份脱敏输入或等价夹具？ |
| `steps` | 学习者按什么最小动作推进？每一步预期观察什么？ |
| `evidence` | 应保存什么文件、差异、日志、测试、截图、页面或审查记录？ |
| `failure_variant` | 哪个可控变量会让实验失败或进入边界？ |
| `recovery` | 如何停止、撤销、恢复或降级；哪些部分仍未验证？ |
| `acceptance` | 解释、操作、判断、审查四类证据怎样分别通过？ |
| `transfer` | 换到另一个领域或工具后，哪些不变、哪些需重查？ |
| `run_record` | 时间、平台、版本、账户范围、结果和复核者在哪里记录？ |

**课程决策：** 实验不能只给“预期漂亮输出”。至少要有一个能区分通过/失败的外部信号；对 UI 或浏览器任务，运行截图只能是证据的一部分，不能替代功能、权限、数据和验收检查。

### 5.4 Field Guide 的案例模板（原创课程决策）

案例应先进入研究/候选层，再决定是否进入正式章节。建议字段为：

```text
场景与原问题
目标与非目标
入口/产品/版本/平台/账户范围
输入资料与脱敏规则
权限、工具、Skill、MCP 或外部服务
任务协议与关键决策
执行日志和实际产物
验收标准与断言—证据表
失败、限制、回滚和未验证部分
最小复现路径
迁移到另一个场景时的变化点
来源、许可、作者授权、复核日期
```

**`inference`：** WorkBuddyGuide 的案例层证明“案例可以成为可增长的内容入口”，但 Field Guide 必须增加版本/运行/证据/迁移字段，否则案例容易变成一次性的展示。MCP 的原型与一致性测试要求说明，真正能进入高可信正文的案例应有可运行或可审查的复现材料。[W1][M5–M7]

## 6. 搜索、导航与内容发现策略

### 6.1 外部机制对照

| 机制 | 观察到的事实 | Field Guide 的可迁移做法 |
| --- | --- | --- |
| 机器可读索引 | OpenAI、Claude Code、MCP 都提供 `llms.txt` 或等价文档索引；OpenAI/Claude Code/MCP 页面还提供 Markdown 版本或 Markdown twin | 建立机器可读的内容目录，输出每个章节/实验/Skill/事实卡的 canonical path、主题、任务、状态、来源和版本 |
| 页面内搜索 | WorkBuddyGuide 使用 VitePress local search；Rust Book 在 `book.toml` 配置搜索行为；Claude Code 提供站点搜索和按语言的文档索引 | 搜索是发现层，不是事实层。命中结果必须能回到正文、来源卡和版本卡；为 GPT/Codex/Agent 等术语提供稳定别名 |
| 侧栏/前后导航 | WorkBuddyGuide 有阅读指南、篇章侧栏、前后页和动态案例侧栏；MCP 规范用版本化侧栏分开基础协议、客户端和服务器特性 | 保持章节顺序可读，同时提供“按任务/按能力/按风险/按版本”筛选；跳读后显示它所依赖的先修概念 |
| 旧链接处理 | Rust Book 的 `book.toml` 中有旧章节 URL 重定向；MCP 使用日期版本 URL；Claude Code 页面由站点索引维护 | 每个可公开页面保留稳定 ID；改名、迁移、版本升级都生成 redirect 或迁移记录，不能只依赖标题和文件名 |

### 6.2 推荐的搜索字段

每个可搜索内容单元至少应暴露以下字段：

- `kind`: chapter / lab / case / skill / fact / evaluation / glossary；
- `capability_level`: L0–L6；
- `task`: 真实任务入口；
- `surface`: CLI / IDE / desktop / cloud / browser / MCP 等；
- `risk`: read-only / workspace-write / external-write / account-sensitive；
- `evidence`: explanation / operation / judgment / review；
- `status`: draft / candidate / verified / production-ready；
- `locale` 与 `source_revision`；
- `volatile_fact_impact` 与 `next_review`。

**课程决策：** 搜索结果应让学习者一眼知道“这是原理、操作、案例还是易变事实”，以及是否需要运行和复核；不要让产品版本页、正式章节和候选案例混在同一个无状态全文结果里。

## 7. 多语言策略

### 7.1 参照观察

1. **Claude Code（`fact`）：** 官方站点有语言路由；本轮可直接访问 `zh-CN` 概述页，站点 sitemap 也列出德语、西班牙语、法语、日语、韩语、俄语等语言入口。页面内容和英文页面的更新时间/覆盖并不必然相同，因此“有语言入口”不等于“所有页面同步”。[A1][A10]
2. **Rust Book（`fact`）：** 主仓库的附录和贡献说明列出多种社区翻译，但翻译不是主仓库内同步的完整多语言版本；贡献说明还记录了等待 mdBook 多语言支持的边界。翻译项目有自己的仓库和维护节奏。[R2][R5]
3. **OpenAI Codex（`fact`）：** 本轮查到的是英文官方文档索引和 Markdown 页面，没有确认一个与英文文档等价的官方中文文档集合。[O1][O2]
4. **WorkBuddyGuide/本仓库（`fact`）：** WorkBuddyGuide 的站点和本项目当前策略都把阅读 UI 与正文覆盖区分开；本项目 AGENTS.md 明确中文是当前主要学习正文，不能把展示页的语言切换写成整本书已双语。[I1][W1]

### 7.2 Field Guide 决策

- **语言状态分离：** `UI translated`、`chapter translated`、`lab verified`、`volatile facts reviewed` 不得合并成一个“中文已完成”。
- **翻译单元带源版本：** 每个翻译文件记录英文源文件 ID、源 commit/内容指纹、翻译 commit/日期、术语审查者和下次复核日期。
- **默认语言遵循项目约定：** 公共展示页可默认英文并提供中文切换；书的当前主学习路径保持简体中文，未翻译内容必须清楚标记状态。
- **易变事实不直接机器同步：** 产品入口、命令、权限、模型和价格进入翻译前要重新核对官方来源；翻译语言只能改变表达，不改变事实范围和证据要求。
- **覆盖不足时不开放空入口：** 先满足一个完整的最小能力集合（概念、实验、失败例、验收和来源），再扩大语言选择器。

**`inference`：** Claude Code 展示了“语言路由和多平台文档可以同时存在”，Rust Book 展示了“翻译维护可以与主线分离”；Field Guide 应组合二者的追踪机制，而不把翻译目录当作静态复制品。

## 8. 版本、更新与事实生命周期

### 8.1 参照对象的版本信号

| 来源 | 版本信号 | 对课程的启发 |
| --- | --- | --- |
| OpenAI Codex | 官方页面有统一索引和特性成熟度标签；开源 CLI 仓库以 Git commit 和 Apache-2.0 代码库发布；产品文档页面本轮未发现可供课程固定的单一 docs commit | 产品事实必须记录页面 URL、访问日、适用表面和成熟度，不把一个页面里的示意终端版本当作产品当前版本 |
| Claude Code | 文档有独立 changelog，本轮当前条目标为 `2.1.226`（2026-08-08）；页面 JSON-LD 还暴露单页 `dateModified`；官方 docs 不以 Git commit 作为读者版本入口 | 每个实验需要产品版本和文档日期；更新日志是定位影响范围的入口，但不能替代重新运行实验 |
| MCP | 规范页面明确显示 `2026-07-28 (latest)`，URL 和 Markdown 版本都含日期；版本化规范还区分现代每请求元数据与旧的初始化握手时代；GitHub `main` README 本轮仍示例 `schema/2025-11-25` | 必须同时记录规范版本、Schema/SDK 版本、客户端/服务器版本和传输方式；不能只写“最新 MCP” |
| Rust Book | `main` 仓库提交为 `9175448`；书使用 Rust 2024 edition；在线书区分 stable/beta/nightly，仓库 main 可能先于稳定站点 | 教材代码应绑定工具链/edition/依赖版本，并明确 main、候选和稳定发布之间的差异 |
| WorkBuddyGuide | 固定研究 commit `abd61e8`；VitePress 配置有 `lastUpdated`，包版本为 `1.0.0`；站点事实仍需回到固定 commit和在线站点分别核对 | 正式内容和在线发布状态要分开；站点时间戳不能代替内容复现和来源审核 |

### 8.2 Field Guide 的事实卡

所有易变事实使用统一字段，建议与现有 `fact-impact-registry` 对接：

```yaml
claim: "可核对的单条事实"
claim_status: current | stale | disputed | removed
source_url: "权威页面或固定仓库文件 URL"
source_revision: "commit、规范日期、产品版本或页面 dateModified"
checked_at: "YYYY-MM-DD"
applies_to: "入口/平台/操作系统/账户/区域/依赖范围"
owner: "维护角色"
next_review: "YYYY-MM-DD"
evidence: "页面、命令输出、运行日志或链接"
impact: low | medium | high
```

**课程决策：** 版本快照冻结的是本项目的章节、实验夹具和验证记录，不冻结外部产品事实；外部事实仍由 `source_url + checked_at + next_review` 管理。高影响变化要能反查到受影响章节、实验、Skill、评测和翻译。

## 9. 贡献流程对照与本项目建议

### 9.1 参照流程

| 来源 | `fact` | 可迁移机制 |
| --- | --- | --- |
| OpenAI Codex CLI 仓库 | 外部代码贡献目前以邀请为主；被邀请的贡献要求先讨论 issue、保持范围聚焦、加测试、更新用户文档、原子提交并运行检查；仓库代码为 Apache-2.0 | 贡献入口必须诚实说明“讨论/反馈”和“代码 PR”是否同一门槛；内容贡献也应有范围、测试和文档影响说明 |
| MCP | 普通文档/例子/小修复可直接 PR；规范重大变化要 SEP；贡献指南要求 `npm run check`、源 Schema 生成派生文件、原型、赞助者，最终标准变更还要一致性场景 | 把“内容修正”“实验新增”“事实更新”“协议/治理决策”分流；生成物和源文件明确谁是 canonical source |
| Rust Book | 编辑 `src`，不直接改出版社快照；运行格式化和 `mdbook` 构建/测试；先检查 main、issues 和 PR；较大修订围绕 Rust Edition，普通时期主要修错误；翻译通过独立社区项目推进 | 贡献者先定位 canonical path 和版本，再决定是修错、补实验、迁移事实还是提出结构变更 |
| WorkBuddyGuide | Case PR 需查重、说明真实场景、Skill、操作、效果、验收、安全、去敏、素材许可和构建结果；一个 PR 只提交一个 Case；维护者可进一步编辑进入正文 | 案例贡献用“候选—复现—编辑—晋升”而非直接写入主线；每个贡献独立可审查和可回滚 |

### 9.2 Field Guide 的贡献分流

建议贡献者从以下五种类型中选择一种，并在 PR 开头声明：

1. **事实更新：** 只改来源卡、版本卡、影响注册表和受影响链接；必须有新访问证据。
2. **章节/概念：** 提供学习目标、边界、实验、失败变体、四类证据和来源；不得只增加功能说明。
3. **实验/评测：** 提供固定输入、运行步骤、通过标准、失败记录格式和迁移任务；不得把个人成功截图当成通用证明。
4. **案例：** 使用候选 Case 字段，脱敏、查重、标明账户/版本/权限和外部副作用；通过复现后才能进入正式章节。
5. **Skill/工作流：** 说明触发条件、输入边界、工具/权限、停止条件、输出、失败处理、评测和许可证；运行官方/项目验证器。

每个 PR 的最小门槛：

- 一个清晰的目标和不包含的范围；
- canonical path、关联学习等级和任务入口；
- 来源 URL、访问日期、版本/commit 和许可证边界；
- 结构校验、链接/内容校验以及与贡献类型相称的实验或复核证据；
- 密钥、Cookie、`.env`、私人路径、个人数据和未授权素材清理记录；
- `draft`/`candidate`/`verified`/`production-ready` 状态及仍未验证的部分。

**课程决策：** 采用“一个贡献一个问题/一个案例”的小 PR；大规模重构先提交决策记录或 issue。是否使用 AI 辅助不应被隐藏；贡献者按本项目治理要求披露需要披露的 AI 辅助范围，并对来源、事实、测试和最终内容负责。

## 10. 从教程到可复现能力：推荐的验收模型

### 10.1 能力生成链

教程只有在下面的转换完成后，才从“内容”变成“能力”：

| 阶段 | 产物 | 失败时的处理 |
| --- | --- | --- |
| 定义 | 问题、目标、非目标、风险和验收声明 | 目标模糊、范围过大或权限不明时停在定义阶段 |
| 解释 | 概念、边界、术语关系和最小心智模型 | 发现把模型、产品、工具、Skill 或登录状态混为一谈时回到概念层 |
| 操作 | 一条低风险、可观察、可回滚的任务运行记录 | 缺少前置条件或固定输入时不标记实验通过 |
| 观察 | 状态、工具动作、差异、日志、测试、页面或用户确认 | 只有“模型说完成”时，标记为证据不足 |
| 反例 | 故意失败、边界条件、权限/版本/输入缺失和停止点 | 失败不可控或副作用过大时更换夹具，不用生产数据实验 |
| 判断 | 方案取舍、风险、适用范围和未验证项 | 只能复述步骤时不进入掌握 |
| 迁移 | 另一个领域、入口或输入形态的同构任务 | 迁移时重新核对产品事实和权限，不把旧命令盲目复制 |
| 固化 | Skill、AGENTS.md、实验夹具、评测、团队规范、来源和回滚目标 | 没有负责人、版本、复核日期或回滚目标时不能进入生产级 |

### 10.2 四类证据和最小毕业门槛

| 证据 | 学习者必须能提供 | 可接受的例子 |
| --- | --- | --- |
| 解释 | 用自己的话说清概念和边界 | 说明“配置可见”为什么不等于“运行成功” |
| 操作 | 在声明范围内完成一次真实实验 | 脱敏副本上的文件差异、测试结果或 MCP Inspector 记录 |
| 判断 | 比较至少两个方案并说明取舍 | 只读/写入、单 Agent/子 Agent、stdio/HTTP、局部/全量上下文的选择理由 |
| 审查 | 独立发现错误、风险、幻觉或未完成部分 | 对自己的输出、日志、来源和权限声明做第二次检查；指出证据缺口 |

推荐的课程状态转换：

```text
draft
  → candidate（结构、来源、实验夹具存在）
  → verified（正例 + 边界例 + 失败例 + 迁移例通过）
  → production-ready（安全、维护、版本、许可证、责任与发布门禁通过）
```

**`inference`：** Rust Book 的编译/测试、Claude Code 的可运行检查、MCP 的原型/一致性测试和 WorkBuddyGuide 的案例验收分别提供了“外部信号”；本项目把它们扩展成四类证据与迁移门槛，避免把教程成功等同于一次命令成功。

## 11. Codex Field Guide 应借鉴的机制清单

### P0：下一轮内容工作必须采用

| 决策 | 借鉴来源 | 可落地形式 | 通过证据 |
| --- | --- | --- | --- |
| 能力单元优先 | 本项目 + Claude Code + Rust Book | 每个单元绑定章节、实验、失败变体、评测、任务入口、事实卡和迁移任务 | 能从任一入口找到同一 canonical unit，且无重复正文 |
| 证据先于完成声明 | 本项目 + Claude Code + MCP | 章节/实验中显式写断言、证据、范围和缺口 | 至少一个正例、一个失败例和一张断言—证据表 |
| 版本卡 | MCP + Rust Book + Claude Code | 记录规范日期/工具版本/edition/平台/入口/依赖/访问日 | 复核者能按记录重建环境边界；找不到时标记 unknown |
| 失败路径 | Claude Code + 本项目 | 每个实验提供一个故意失败或权限/版本边界，以及停止/恢复动作 | 学习者能解释失败原因和未验证部分，而不是只重跑成功路径 |
| 候选案例晋升 | WorkBuddyGuide + MCP | Case 先入研究层，复现、编辑、审查后进入正式能力单元 | 有去敏、来源、复现记录、验收和维护责任 |

### P1：完成课程外壳后加入

| 决策 | 借鉴来源 | 可落地形式 |
| --- | --- | --- |
| 文档机器索引 | OpenAI、Claude Code、MCP | 生成 `llms` 类目录或等价 JSON/Markdown 索引，列出状态、版本、任务、来源和语言覆盖 |
| 四维导航 | WorkBuddyGuide + 本项目 | 顺序阅读、真实任务、能力等级、风险/表面四种入口，全部回到同一内容单元 |
| 旧链接/迁移表 | Rust Book + MCP | 保留稳定 unit ID、redirect、版本迁移说明和过期事实定位 |
| 多语言源追踪 | Rust Book + Claude Code + 本项目 | 语言矩阵记录源 revision、覆盖率、术语审查和下次复核；不把 UI 切换当正文完成 |
| 独立审查角色 | Claude Code 的 fresh review + 本项目 | 对高风险或 production-ready 内容用新鲜上下文审查证据、范围和未完成部分 |

### P2：在贡献者和案例规模增长后加入

| 决策 | 借鉴来源 | 可落地形式 |
| --- | --- | --- |
| 正式案例目录 | WorkBuddyGuide | 动态扫描候选/已复现 Case，带日期、版本、风险和状态 |
| 规范变更式提案 | MCP SEP | 影响全局术语、权限、安全门禁或内容治理的变更先走决策记录/提案，再改多章 |
| 可执行验证夹具 | Rust Book/MCP | 对代码、schema、命令和文档链接提供可运行检查；对 Agent 工作流保留脱敏固定输入与人工审查 |
| 维护责任图 | 本项目 + MCP 治理 | 每个事实、章节、实验、翻译和 Skill 有 owner、触发器、复核日期和回滚目标 |

## 12. 差异化内容空白

下列空白是 Field Guide 可以明确占据的位置。它们是基于本轮来源对照得出的 `inference`，不是声称外部项目完全没有相关内容：

1. **运行时证据与配置证据的分离。** 产品文档常从安装、登录和配置开始；Field Guide 应反复训练“存在/可见/已授权/已连接/已运行/已验收”各自需要什么证据。
2. **工具和权限的教学化。** 不只教如何接入工具，还要教工具扩大了什么行动空间、哪些副作用必须审批、如何用最小权限和回滚控制风险。
3. **跨表面等价性。** CLI、IDE、桌面、Cloud、浏览器、MCP client/server 可能共享概念但不共享权限、文件、网络或认证边界；课程应让读者比较而不是默认它们等价。
4. **失败优先的 Agent 课程。** 把缺失输入、冲突指令、错误来源、工具超时、版本不兼容、未完成声明和外部写入失败做成正常练习，而不是只藏在故障排查页。
5. **案例到能力的转换。** 案例不仅展示结果，还要抽取任务协议、变量、证据、失败边界、迁移规则和可维护资产，说明它何时能泛化、何时不能。
6. **“会用”到“会审查”的梯度。** L0–L6 可以把解释、操作、判断和审查的权重逐级提高；毕业不是完成更多自动化，而是能在证据不足时正确停止。
7. **易变事实的影响管理。** 让读者看见一个命令、模型、版本或权限变化会影响哪些章节、实验、翻译和团队规范，而不是把更新压成一个“最后更新”时间戳。
8. **课程资产的许可边界。** 结构可以借鉴，正文、截图、品牌、图标、字体、案例和第三方资料必须分别清权；这在知识产品中应成为学习对象本身。

## 13. 立即可执行的课程决策

### D1：用一个纵向切片验证新架构

选择“区分 GPT、Codex、工具和 Agent，并完成一个安全的只读/可回滚任务”作为第一条纵向切片：

```text
问题卡
→ 概念/边界
→ 一个最小安全实验
→ 一个故意失败变体
→ 四类证据
→ L0/L1 掌握检查
→ 另一个领域的迁移任务
```

验收：读者不依赖整段复制提示词，也能完成实验；能指出配置、权限、运行和验收证据的差异；能在失败时停止并保留可复盘材料。

### D2：把“内容目录”升级成“能力目录”

每个章节、实验、Skill、Case 和事实卡都要拥有稳定 ID，并建立以下映射：

```text
task → capability unit → prerequisites → lab → evaluation → source/fact cards → owner/review
```

验收：从任务入口和 L0–L6 入口都能导航到同一个单元；修改一个易变事实时可以反查受影响内容。

### D3：保留三层版本，不做一个总版本号解决所有问题

至少区分：

- **课程版本：** Field Guide 章节/实验/评测快照；
- **外部事实版本：** OpenAI/Anthropic/MCP/Rust/第三方工具的页面、版本、规范日期或 commit；
- **运行记录版本：** 学习者实际入口、平台、账户、依赖、命令、时间和证据。

验收：复核者能判断“内容已更新但实验未重跑”“产品事实新鲜但翻译未同步”“构建通过但运行未验证”等状态，而不是只看到一个绿色状态。

### D4：建立案例晋升门

候选 Case 必须完成查重、去敏、来源/许可检查和最小复现；只有经过编辑、独立复核并补齐失败/迁移字段，才进入正式章节或推荐路径。

验收：任何正式案例都能回答“谁在什么版本、权限和输入下，怎样完成了什么；如何知道完成；哪里失败过；换场景要改什么”。

### D5：把贡献流程写成可检查的课程能力

贡献者不只是提交文件，还要展示如何定位 canonical source、选择证据、记录版本、清理秘密、运行验证、处理失败和写回滚说明。贡献指南本身也应有一个低风险实验和验收清单。

## 14. 未知项、限制与后续复核

| 项目 | 状态 | 不能在本轮确认的内容 | 处理方式 |
| --- | --- | --- | --- |
| OpenAI 官方文档版权/再利用条款 | `unknown` | 本轮核对了文档结构和页面，但没有确认一个覆盖所有文档、代码示例、图片和产品标识的统一再利用许可 | 只做链接、事实摘录和原创结构提炼；任何复制资产前单独清权 |
| OpenAI 官方 docs 的源 commit | `unknown` | `llms.txt` 和 Markdown twin 提供了入口，但未公开与每个页面一一对应的 docs Git commit | 用 URL、访问日期、页面版本/成熟度和必要的页面元数据；不要伪造 commit |
| Anthropic 官方文档许可与外部贡献入口 | `unknown` | 本轮确认了页面、语言路由、`llms.txt`、changelog 和 Markdown 版本，但没有把网站后台或文档仓库的贡献许可当作已知 | 只做链接和原创转述；若未来要转载或提交外部内容，重新查官方条款 |
| Claude Code 的学习效果 | `unknown` | 没有用户测试、前后测或首次通过率数据 | 不用页面数量、功能数量或版本更新量推断教学效果 |
| MCP 文档与仓库版本差异的长期影响 | `fact + unknown` | 本轮看到规范页面为 2026-07-28，仓库 README 仍出现 2025-11-25 schema 路径；不能据此判断所有 SDK/客户端已完成迁移 | 课程锁定具体规范版本、Schema/SDK 版本和 transport，并在实验中显式测试兼容性 |
| WorkBuddyGuide 后台部署/同步链 | `unknown` | 公开仓库不能证明 Cloudflare 后台绑定、Secret、生产构建和飞书同步状态 | 只借鉴可核对的仓库结构、Case 模板和固定 commit；不把后台推断写成事实 |
| 本项目用户的跨领域迁移效果 | `unknown` | 现有 L0–L6 和四类证据是课程设计，不是已完成的学习效果实验 | 未来为纵向切片做前测、运行记录、失败率、迁移任务和独立审查 |

## 15. 来源、版本与许可边界

访问日期均为 **2026-08-10**，除非单独注明页面内的更新时间。以下表格记录本轮实际使用的来源；固定 commit 只约束仓库事实，不把动态网站永久冻结。

### 15.1 项目本地来源

| ID | 来源 | 用途 | 版本/访问 | 许可边界 |
| --- | --- | --- | --- | --- |
| I1 | `AGENTS.md` | 项目工作规则、事实/推断/未知、来源和完成状态 | 当前工作区，2026-08-10 | 项目内部规则，不是外部可再发行资产 |
| I2 | `CONTEXT.md` | GPT/Codex/工具/Skill/Agent/证据/易变事实术语边界 | 当前工作区，2026-08-10 | 项目内部术语 |
| I3 | `docs/charter.md` | 产品定位、原则、成功标准 | v0.1，2026-08-09 | 项目内部章程 |
| I4 | `docs/book-architecture.md` | 章节模板、阅读路线、内容分层、四类证据 | 当前工作区，2026-08-10 | 项目内部结构 |
| I5 | `docs/learning-model.md` | L0–L6 学习路径和晋级证据 | 当前工作区，2026-08-10 | 项目内部结构 |
| I6 | `docs/governance/content-lifecycle.md` | 易变事实生命周期和更新门禁 | 当前工作区，2026-08-10 | 项目内部治理 |
| I7 | `docs/governance/contribution-model.md` | 章节、实验、Skill、治理贡献要求 | 当前工作区，2026-08-10 | 项目内部治理 |
| I8 | `docs/research/workbuddyguide-structure-study-2026-08-10.md` | 已完成的 WorkBuddyGuide 结构与许可边界研究 | `candidate`，2026-08-10 | 本轮只引用研究结论，不复制外部资产 |

### 15.2 外部一手来源

| ID | 来源 URL | 用途 | 版本/commit/页面信号 | 许可边界与使用决定 |
| --- | --- | --- | --- | --- |
| O1 | [OpenAI Codex 文档索引](https://learn.chatgpt.com/llms.txt) | 文档分区、Markdown twin、入口发现 | 动态索引，访问 2026-08-10 | 未确认统一文档再利用许可；仅链接和原创转述 |
| O2 | [Codex CLI 文档](https://learn.chatgpt.com/docs/codex/cli.md) | Quickstart、终端工作循环、Skills/MCP/审查/非交互入口 | Markdown 页面，访问 2026-08-10 | 同 O1；不复制正文或截图 |
| O3 | [Codex Skills](https://learn.chatgpt.com/docs/build-skills.md) | Progressive disclosure、Skill 目录结构和触发方式 | Markdown 页面，访问 2026-08-10 | 同 O1；仅提炼机制 |
| O4 | [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | MCP transport、配置、工具审批和 server instructions | Markdown 页面，访问 2026-08-10 | 同 O1；不复制配置示例资产 |
| O5 | [Codex 非交互模式](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 可脚本化输出、权限、安全和结构化结果 | Markdown 页面，访问 2026-08-10 | 同 O1；只保留概念性转述 |
| O6 | [Codex 代码审查](https://learn.chatgpt.com/docs/code-review.md) | 独立 review、范围和不改工作树的审查机制 | Markdown 页面，访问 2026-08-10 | 同 O1；不复制截图/页面文本 |
| O7 | [Codex Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity.md) | 易变功能的成熟度分级 | Markdown 页面，访问 2026-08-10 | 同 O1；术语可作为事实分类，不复制页面表达 |
| O8 | [OpenAI Codex CLI 仓库](https://github.com/openai/codex/tree/7f928f6ddc4310752122c51c6a80b233e0c3e85a) | 开源仓库定位和许可证 | `main` observed commit `7f928f6ddc4310752122c51c6a80b233e0c3e85a`，访问 2026-08-10 | 仓库声明 Apache-2.0；本文件不 vendoring 代码/图片 |
| O9 | [Codex 贡献说明](https://github.com/openai/codex/blob/7f928f6ddc4310752122c51c6a80b233e0c3e85a/docs/contributing.md) | 邀请制贡献、issue、测试、文档、原子提交和 CLA 信号 | 同 `7f928f6` | 贡献规则只作为研究事实，不复制模板或代码 |
| A1 | [Claude Code 文档索引](https://code.claude.com/docs/llms.txt) | 文档分区、页面发现和 Markdown 入口 | 动态索引，访问 2026-08-10 | 本轮未确认统一文档再利用许可；只做链接和原创转述 |
| A2 | [Claude Code Overview](https://code.claude.com/docs/en/overview.md) | 多表面入口、能力范围和下一步 | 页面 `dateModified` 2026-08-07；访问 2026-08-10 | 同 A1；不复制正文、图片或品牌资产 |
| A3 | [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart.md) | 从安装到第一个任务、Git、测试和常见工作流 | 页面 `dateModified` 2026-07-29；访问 2026-08-10 | 同 A1 |
| A4 | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works.md) | Agent loop、工具、上下文、checkpoint、子 Agent | 页面 `dateModified` 2026-08-07；访问 2026-08-10 | 同 A1 |
| A5 | [Common workflows](https://code.claude.com/docs/en/common-workflows.md) | 代码库探索、修复、测试、PR、并行和脚本工作流 | 页面 `dateModified` 2026-08-07；访问 2026-08-10 | 同 A1 |
| A6 | [Best practices](https://code.claude.com/docs/en/best-practices.md) | 验证、探索/计划/编码、上下文和独立审查 | 页面 `dateModified` 2026-08-07；访问 2026-08-10 | 同 A1 |
| A7 | [Claude Code Skills](https://code.claude.com/docs/en/skills.md) 与 [MCP](https://code.claude.com/docs/en/mcp.md) | Skill 评估迭代、MCP 连接/工具搜索/权限范围 | Skills 页面访问 2026-08-10；MCP 页面 `dateModified` 2026-08-07 | 同 A1 |
| A8 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md) | 产品版本更新策略 | 本轮最新条目 `2.1.226`，2026-08-08；访问 2026-08-10 | 只记录版本事实和来源，不复制更新条目 |
| A9 | [Claude Code 简体中文 Overview](https://code.claude.com/docs/zh-CN/overview) | 多语言路由与中文覆盖存在性 | 访问 2026-08-10；页面可访问 | 同 A1；不复制翻译文本 |
| A10 | [Claude Code sitemap](https://code.claude.com/sitemap.xml) | 语言路由和 lastmod 信号 | 动态 sitemap，访问 2026-08-10 | 只作页面发现证据 |
| M1 | [MCP 文档索引](https://modelcontextprotocol.io/llms.txt) | 入门、概念、开发、工具、规范、社区和 SDK 结构 | 动态索引，访问 2026-08-10 | 网站页面未作为可整体转载资产；只链接和原创转述 |
| M2 | [MCP 规范](https://modelcontextprotocol.io/specification/2026-07-28.md) | 主体模型、features、安全边界 | `2026-07-28`，页面标为 latest；访问 2026-08-10 | GitHub 项目说明：新代码/规范贡献 Apache-2.0；文档（不含规范）CC-BY-4.0；旧未重许可贡献可能保留 MIT。仅引用结构/事实，不复制规范文本 |
| M3 | [MCP 版本兼容性](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning.md) | 2026-07-28 与 2025-11-25 兼容时代、版本和扩展 | `2026-07-28`，访问 2026-08-10 | 同 M2；协议事实需绑定版本 |
| M4 | [MCP Build Server](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server.md) | 多语言构建教程、前置条件、运行和 host 测试 | docs version `2026-07-28`，访问 2026-08-10 | 同 M2；不复制代码/图片 |
| M5 | [MCP Contributing](https://modelcontextprotocol.io/community/contributing.md) | `npm run check`、源 schema/生成物、文档 PR、原型与测试 | docs version `2026-07-28`，访问 2026-08-10 | 同 M2 |
| M6 | [MCP SEP Guidelines](https://modelcontextprotocol.io/community/sep-guidelines.md) | 重大协议变化、Sponsor、prototype、conformance 和状态 | docs version `2026-07-28`，访问 2026-08-10 | 页面标注 CC0/公有领域式边界；本文件只原创提炼，不复制模板 |
| M7 | [MCP GitHub 仓库](https://github.com/modelcontextprotocol/modelcontextprotocol/tree/b25c0874bf0ba699a58e21ef06f659d839659de3) 与 [LICENSE](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/b25c0874bf0ba699a58e21ef06f659d839659de3/LICENSE) | README、schema 路径和许可过渡 | `main` observed commit `b25c0874`，访问 2026-08-10 | LICENSE 明确许可过渡；不把根目录信号简化成所有历史内容同一许可 |
| R1 | [Rust Book 仓库](https://github.com/rust-lang/book/tree/917544888a55e4da7109bdba8c88c893c0da70f4) | 教材源、构建、测试、stable/beta/nightly 和贡献 | `main` observed commit `9175448`（2026-07-14），访问 2026-08-10 | 仓库 MIT/Apache-2.0；本文件不复制正文、代码或站点素材 |
| R2 | [Rust Book README](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/README.md) | `mdbook build`、`mdbook test`、在线渠道和代码发行物 | 同 `9175448` | 同 R1 |
| R3 | [Rust Book SUMMARY](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/SUMMARY.md) | 章节层级和最终项目路径 | 同 `9175448` | 同 R1 |
| R4 | [Rust Book CONTRIBUTING](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/CONTRIBUTING.md) | canonical `src`、格式化、检查、翻译和修订节奏 | 同 `9175448` | 同 R1 |
| R5 | [Rust Book editions](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/appendix-05-editions.md) 与 [translations](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/appendix-06-translation.md) | Rust 2024 edition、发布节奏和翻译边界 | 同 `9175448` | 同 R1；翻译仓库需另行遵循各自许可 |
| W1 | [WorkBuddyGuide 固定 commit](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0)、[Case 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/CASE_TEMPLATE.md)、[Case PR 模板](https://github.com/AlephAITech/WorkBuddyGuide/blob/abd61e82188fc57ef542756312e06175fc70b8b0/.github/PULL_REQUEST_TEMPLATE/case.md) | 章节/案例结构、贡献字段、去敏、构建和晋升信号 | `abd61e8`（2026-08-07），在线站点另于 2026-08-10 观察 | 根目录 MIT；不自动覆盖图片、字体、图标、二维码、品牌、作者卡片、投稿内容和第三方素材；本文件只做结构研究 |

## 16. 研究完成检查

- [x] 已读取 `AGENTS.md`、`CONTEXT.md`、`docs/charter.md`、`docs/book-architecture.md` 和相关治理/来源记录。
- [x] 已比较 OpenAI Codex、Anthropic Claude Code、MCP 官方规范/文档和一个高质量开源教程项目（Rust Book）。
- [x] 已对照 WorkBuddyGuide 的固定 commit、案例模板、站点配置和已有本地研究。
- [x] 已记录 URL、访问日期、commit/规范日期/版本信号和许可边界。
- [x] 已将 `fact`、`inference`、`unknown` 分开；未把未核对的后台、用户效果或统一许可写成事实。
- [x] 只写本研究文件；没有复制外部正文、代码、图片、截图、品牌或 Skill 指令。
- [x] 已提出 Field Guide 的章节、实验、案例、索引、多语言、版本、贡献、能力复现和差异化决策。
- [ ] 尚未把本文件的决策落地到章节、实验、索引或治理文件；那是后续独立变更。
