# Codex 官方事实卡：2026-08-10

> 研究状态：`candidate`
>
> 本文件只记录截至 2026-08-10 访问到的 OpenAI 第一方文档事实及其证据边界。`candidate` 表示页面事实已核对，但没有把文档描述当作当前本地会话、账号授权、工具调用或项目运行结果的证明。

## 研究边界与使用规则

- 来源范围：只使用 OpenAI 第一方文档页面，主要是 [ChatGPT Learn](https://learn.chatgpt.com/docs)、[OpenAI Developers](https://developers.openai.com/plugins/build/plugins) 页面；没有使用博客、论坛、社区帖子或第三方教程作为事实来源。
- 访问日期：2026-08-10（America/Los_Angeles）。下列每张事实卡都给出 URL、访问日期、适用范围和建议复核日期。
- `正文候选`：可以写入正文，但应保留概念层表述，不把当前命令、默认值、模型名或 UI 文案写成永久承诺。
- `必须 volatile`：只能作为带日期的当前事实使用；版本、默认权限、支持表面、配置键、命令、模型、价格、可用性、成熟度和限制发生变化时，必须重新核对。
- `不能推出`：官方文档没有提供足够证据支持的结论。它们是本项目的证据边界，不是 OpenAI 对某次具体任务的运行结果承诺。
- 许可边界：只摘录事实和短语义改写，不复制页面长段落、代码示例、图片或品牌资产；本文件不引入外部可分发资产。

## 一、可进入正文的概念事实

### F-01：Codex 是面向软件开发任务的编码 Agent

- 事实：官方 Glossary 将 Codex 定义为 OpenAI 的 coding agent，用于 software development tasks；将 Agent 定义为能够围绕上下文进行推理、使用工具并完成任务的 Codex agent；将 Action 定义为由人、ChatGPT 或 Codex 执行的操作，例如编辑文件、运行命令或使用连接服务。
- 正文建议：可以用这组定义建立“Codex 是工作产品/工作面，Agent 是执行任务的行为单元，Action 是可观察操作”的概念区分；不要据此声称 Agent 一定拥有某项工具或权限。
- URL：[Codex Glossary](https://learn.chatgpt.com/docs/glossary)
- 访问日期：2026-08-10
- 适用范围：官方 Glossary 标注的 Desktop app、CLI、IDE extension、Web、Cloud、SDK 等 Codex 相关表面；具体可用能力仍受表面、账号和配置影响。
- 建议复核日期：2026-12-10
- 状态：`正文候选`；定义较稳定，但产品术语仍可能调整。

### F-02：Context 是 Agent 可使用的信息集合，不等于无限上下文

- 事实：官方 Glossary 将 Context 描述为 Codex 工作时可使用的信息，例如文件、此前消息、工具输出和指令；Context window 则是模型一次能够考虑的信息上限。
- 正文建议：可把“上下文”教成影响任务理解和行动的输入集合，并明确上下文有范围和容量；不要把 Agent 的隐藏推理过程当作可观察上下文或证据。
- URL：[Codex Glossary](https://learn.chatgpt.com/docs/glossary)
- 访问日期：2026-08-10
- 适用范围：Glossary 标注的 Desktop app、CLI、IDE extension、Cloud、SDK。
- 建议复核日期：2026-12-10
- 状态：`正文候选`。

### F-03：任务应围绕结果、上下文、输出和边界定义

- 事实：官方 Prompting 文档建议较大的任务至少说明 Goal、Context、Output 和 Boundaries；边界可以规定哪些内容保持不变、哪些动作要避免或先询问。文档还建议重要工作在使用或分享前进行最终检查并由用户复核。
- 正文建议：可以作为本项目任务协议的稳定抽象：问题/目标 → 必要上下文 → 交付格式 → 行动边界 → 验证方式。它是提示设计建议，不是 Codex 自动保证完成这些检查的协议。
- URL：[Prompting](https://learn.chatgpt.com/docs/prompting)
- 访问日期：2026-08-10
- 适用范围：Chat、ChatGPT Work、Codex 的 IDE、CLI 和相关工作流示例；具体输入方式由产品表面决定。
- 建议复核日期：2026-11-10
- 状态：`正文候选`。

### F-04：Skill 是可复用的工作流包，不是模型、工具或权限

- 事实：官方 Skills 文档将 Skill 描述为针对特定任务或工作流的可复用指导；它可以包含名称和描述、流程指令以及模板、示例、品牌指南、schema 或连接工具等支持资源。Skill 目录通常由 `SKILL.md` 加可选的 scripts、references 和 assets 组成。
- 正文建议：可写成“Skill 提供方法和资源，Agent 依据任务匹配来使用它”；不要把 Skill 的存在推导为工具已连接、权限已授予或脚本已经运行。
- URL：[Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)、[Build skills](https://learn.chatgpt.com/docs/build-skills)
- 访问日期：2026-08-10
- 适用范围：Skills 文档标注的 ChatGPT、Codex CLI、IDE extension，以及插件支持的 Chat/Work 表面；单个 Skill 是否启用、被发现或可用需另行核对。
- 建议复核日期：2026-11-10
- 状态：`正文候选`；目录结构和调用语法仍需标 volatile，见 V-03。

### F-05：Skill 可以隐式匹配，也可以显式调用

- 事实：官方文档说明 ChatGPT 和 Codex 可以在请求匹配 Skill 描述时选择 Skill，也可以显式选择；ChatGPT 使用 `@` 提及，Codex 使用 `$` 提及。Skill 采用 progressive disclosure：先提供名称和描述，决定使用后再读取完整 `SKILL.md`。
- 正文建议：可用于解释“发现/选择 Skill”和“执行 Skill 指令”是两个阶段；不要将被列出、被安装或被显式提及等同于该 Skill 的完整流程已经执行。
- URL：[Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)、[Build skills](https://learn.chatgpt.com/docs/build-skills)
- 访问日期：2026-08-10
- 适用范围：官方支持 Skill invocation 的 ChatGPT/Codex 表面；具体可用 Skill 由安装位置、配置和当前表面决定。
- 建议复核日期：2026-10-10
- 状态：`正文候选`；调用字符、加载预算和发现路径必须 volatile。

### F-06：Plugin、Connector、MCP server 和 Skill 是不同层次

- 事实：官方文档将 Plugin 定义为可安装的能力包，可包含 Skills、Connectors 或两者；Connector 连接 GitHub、Slack、Google Drive 等外部服务；MCP server 为 ChatGPT/Codex 提供工具或共享信息，通常是 Connector 背后的服务；Skill 主要提供可复用的流程指令与资源。
- 正文建议：可用“方法（Skill）—能力包（Plugin）—外部连接/工具（Connector/MCP）”解释组合关系；不要仅凭名称推断第三方服务的读写权、认证状态或副作用。
- URL：[Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)、[Plugins](https://learn.chatgpt.com/docs/plugins)、[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- 访问日期：2026-08-10
- 适用范围：各页面列出的 ChatGPT/Codex 支持表面；Hosted plugin tools 的能力可能不同于直接配置在 Codex host 上的 MCP server。
- 建议复核日期：2026-11-10
- 状态：`正文候选`；支持表面和配置字段必须 volatile。

### F-07：权限至少有两条独立轴：sandbox 与 approval

- 事实：官方权限文档说明 sandbox 决定 Codex 技术上能够访问哪些文件和网络资源；approvals 决定 Codex 何时在动作前暂停、请求批准或交给自动审核。改变审核者不会扩大 sandbox，例如 Approve for me 与 Ask for approval 可以保持相同工作区边界。
- 正文建议：这是最适合进入正文的安全模型：先问“技术上允许做什么”，再问“什么时候必须停下来请求审核”；不要用“Agent 能理解任务”代替这两层授权。
- URL：[Permissions](https://learn.chatgpt.com/docs/permission-modes)、[Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)、[Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review)
- 访问日期：2026-08-10
- 适用范围：Permissions 页明确覆盖 ChatGPT desktop app、Codex CLI 和 IDE；安全页还分别描述 Codex Cloud 的隔离容器；实现细节按表面和配置变化。
- 建议复核日期：2026-10-10
- 状态：`正文候选`；模式名称、默认值和配置键必须 volatile。

### F-08：外部网页、依赖说明和其他不可信内容不能自动升级为指令

- 事实：官方 Cloud Internet Access 文档警告，Agent 读取不可信网页或依赖 README 时可能遭遇 prompt injection；示例说明隐藏指令可能诱导 Agent 把代码或敏感信息发送到攻击者控制的服务器。文档建议只指向可信资源、限制域名和 HTTP 方法并复核输出与工作日志。
- 正文建议：可进入正文作为“外部内容是数据，先验证来源和副作用”的安全原则；不要把某一域名清单或某个网络开关写成永久安全保证。
- URL：[Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
- 访问日期：2026-08-10
- 适用范围：官方文档描述的 Codex Cloud agent phase；本项目可将原则推广到其他外部内容输入，但不能把 Cloud 的具体网络实现外推到所有本地表面。
- 建议复核日期：2026-10-10
- 状态：`正文候选`；网络默认值、allowlist 和 HTTP 方法必须 volatile。

### F-09：验证是独立阶段，生成答案不是验证证据

- 事实：官方 Prompting 文档在修复工作流中要求先按复现步骤重现问题，再提出修复并运行检查；在重要工作中建议请求 final check，并在使用或分享前由用户复核。官方 Cloud 文档还把 summary、diff、follow-up 和 pull request 作为结果审查流程的一部分。
- 正文建议：可以建立“执行结果、检查输出、diff、人工复核和交付”之间的证据链；“完成”不能只由 Agent 的一句总结决定。后半句是本项目根据官方验证建议形成的工作规则，而不是 OpenAI 对任何具体任务的成功承诺。
- URL：[Prompting](https://learn.chatgpt.com/docs/prompting)、[Codex cloud](https://learn.chatgpt.com/docs/cloud)、[Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- 访问日期：2026-08-10
- 适用范围：官方示例中的本地 CLI/IDE 和 Cloud 工作流；具体检查命令、测试范围和验收标准仍需由项目定义。
- 建议复核日期：2026-11-10
- 状态：`正文候选`；命令和 UI 入口必须 volatile。

## 二、必须标记为 volatile 的当前事实

### V-01：当前权限菜单和本地权限语义

- 事实：当前 Permissions 页面列出 Ask for approval、Approve for me、Full access 和 Custom（`config.toml`）等模式。页面当前将 Ask for approval 描述为可在当前 workspace 读写文件、运行常规本地命令，并在访问互联网或越过 workspace 边界前询问；可用模式取决于本地配置和组织要求。
- 为什么 volatile：模式名称、UI 入口、默认模式、权限字段和组织策略可能在产品更新中改变；Full access 的风险说明不能被简化成“安全模式”。
- URL：[Permissions](https://learn.chatgpt.com/docs/permission-modes)
- 访问日期：2026-08-10
- 适用范围：当前页面对 ChatGPT desktop app、Codex CLI、IDE 的权限说明；Cloud 使用隔离环境和独立配置，不应直接套用本地默认值。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-02：当前本地与 Cloud 的 sandbox、网络和 secret 边界

- 事实：当前安全文档写明 Agent 默认关闭网络；本地 CLI/IDE 的默认描述包括 OS-level sandbox 和工作区写权限；Cloud 使用 OpenAI 管理的隔离容器，setup 阶段可联网安装依赖，agent 阶段默认离线；Cloud secret 只在 setup scripts 可用，并在 agent phase 前移除。
- 为什么 volatile：这是当前产品的默认和实现描述，不是所有账号、组织、版本、容器或本地配置的永久行为；网络、sandbox 模式和环境设置可以被配置或管理策略改变。
- URL：[Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)、[Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)
- 访问日期：2026-08-10
- 适用范围：安全页描述的本地 Codex CLI/IDE/desktop 与 Codex Cloud；不要将 Cloud secret 生命周期外推到本地环境变量或外部 MCP。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-03：Auto-review 是审核者替换，不是权限授予

- 事实：当前 Auto-review 文档说明 Auto-review 只处理本来需要交互式批准的越界请求，由单独 reviewer agent 代替人工审核；它不扩大 writable roots、不打开网络、不削弱 protected paths。文档还记录当前开源实现中的拒绝断路器：同一 turn 连续 3 次拒绝，或最近 50 次审核中累计 10 次拒绝，会中断当前 turn。
- 为什么 volatile：触发条件、模型/组织策略、配置优先级、拒绝阈值和 `/approve` 行为都属于当前实现或产品配置；“当前开源实现”不是稳定 API 保证。
- URL：[Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review)
- 访问日期：2026-08-10
- 适用范围：官方描述的本地 Codex 交互式 approval flow；不应外推到所有 API Agent harness、企业托管配置或未来客户端。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-04：CLI 的当前命令和工作表面

- 事实：当前 Codex CLI 页面将 CLI 定位为在本地仓库中检查代码、编辑文件、运行命令和自动化重复工作，并列出 `codex exec`、`codex --search`、`codex cloud`、`codex mcp`、`/permissions` 和 `/review` 等当前入口；页面示例当前显示版本 `v0.143.0`。
- 为什么 volatile：命令、参数、快捷键、版本和支持的登录方式会变化；页面列出命令不代表当前机器已安装该版本或该命令可运行。
- URL：[Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- 访问日期：2026-08-10
- 适用范围：官方 Codex CLI 页面；不适用于把 CLI 功能表直接当作 ChatGPT desktop、IDE 或 Cloud 的等价功能表。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-05：Cloud 任务的当前生命周期与交付面

- 事实：当前 Cloud environments 页面描述的流程是：创建容器并 checkout 选定 branch 或 commit SHA；运行 setup script 和可选 maintenance script；按环境设置应用网络策略；Agent 循环运行终端命令、编辑代码、运行 checks 并尝试验证；结束时展示 answer 和 diff，可请求 follow-up 或打开 PR。页面另写明容器缓存最长可达 12 小时。
- 为什么 volatile：Cloud 的 checkout、缓存时长、setup/maintenance 阶段、环境镜像、网络设置和 PR 入口均可能改变；“tries to validate”不等于每个任务都完成了验证。
- URL：[Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)、[Codex cloud](https://learn.chatgpt.com/docs/cloud)
- 访问日期：2026-08-10
- 适用范围：Codex Cloud 环境和 Cloud chat；不证明本地仓库、当前 GitHub 账号或具体环境已经连接或执行成功。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-06：Skill 的发现路径、加载预算和显式语法

- 事实：当前 Build skills 文档写明 Codex 会从 repository、user、admin 和 system 位置发现 Skill；repo 范围包括当前目录向上直到仓库根目录的 `.agents/skills`。初始 Skill 列表最多占上下文窗口 2%，或在上下文窗口未知时最多 8,000 个字符；完整 `SKILL.md` 会在选择后读取。文档还说明 Codex 会自动检测 Skill 变化，必要时重启。
- 为什么 volatile：发现目录、配置键、预算、自动刷新、`$` 语法和插件封装方式属于当前实现；项目不能仅凭一个 Skill 文件存在就断言当前客户端已载入它。
- URL：[Build skills](https://learn.chatgpt.com/docs/build-skills)
- 访问日期：2026-08-10
- 适用范围：Codex 本地 Skills 发现和加载说明；ChatGPT、插件 Skill 与其他表面有单独支持边界。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-07：Plugin 的支持表面、认证与新会话要求

- 事实：当前 Plugins 页面写明公共插件目录由 ChatGPT 和 Codex 共用；插件可在 ChatGPT web/desktop/mobile 的 Chat/Work 和 ChatGPT desktop app 中的 Codex 使用，Codex CLI 有 plugin browser，而 IDE extension 当前不支持 Plugins。安装后，bundled skills 会在新 chat 或 CLI session 中可用；Connector/MCP 可能在安装时或首次使用时要求认证。Sign in with ChatGPT 不会自动授予插件数据访问权或自动批准动作。
- 为什么 volatile：支持表面、插件目录、认证时点、账号计划和组织控制都可能变化；“已安装”不等于“已认证”或“当前任务可用”。
- URL：[Plugins](https://learn.chatgpt.com/docs/plugins)、[Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)
- 访问日期：2026-08-10
- 适用范围：页面列出的 ChatGPT/Codex 表面；第三方服务仍受自身认证和访问控制约束。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-08：MCP 的当前传输、工具审批和超时配置

- 事实：当前 MCP 文档写明 Codex host 支持 STDIO 和 Streamable HTTP MCP server，并可使用 bearer token、OAuth 或受信任的一方 ChatGPT session authentication；desktop app、CLI 和 IDE 共享 MCP 配置。当前配置参考列出 `enabled_tools`、`disabled_tools`、`default_tools_approval_mode`（`auto`、`prompt`、`writes`、`approve`）和逐工具覆盖；示例默认 startup timeout 为 10 秒、tool timeout 为 60 秒。
- 为什么 volatile：传输支持、认证方式、配置键、审批枚举值和默认超时是实现细节；MCP server 返回的 instructions 也只是服务器级指导，不能代替 sandbox、approval 或用户边界。
- URL：[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- 访问日期：2026-08-10
- 适用范围：配置在 Codex host 上的 MCP server；Hosted plugin tools 可能具有不同能力。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-09：当前模型、表面支持与退役日期

- 事实：当前 Models 页面列出 GPT-5.6 Sol、Terra、Luna 以及 5.3 Codex Spark，并为每个模型展示 desktop、web、CLI、IDE、Cloud、ChatGPT Credits 和 API Access 等能力矩阵。页面当前写明 ChatGPT sign-in 下 GPT-5.4 和 GPT-5.4 mini 将于 2026-08-31 从 Codex 退役；当前页面还写明 Codex Cloud chat 暂不能更改默认模型。
- 为什么 volatile：模型名、可用表面、推荐定位、退役日期、账号计划和默认模型都是高度易变事实；模型页面的定位文案不是本项目的性能基准。
- URL：[Models](https://learn.chatgpt.com/docs/models)
- 访问日期：2026-08-10
- 适用范围：Models 页面描述的 ChatGPT sign-in、Codex 各表面和 API key 例外；不能推断当前账号实际看到的模型列表。
- 建议复核日期：2026-08-24（早于页面列出的 2026-08-31 退役日期）
- 状态：`必须 volatile`。

### V-10：Feature maturity 词义本身是产品状态事实

- 事实：当前 Feature Maturity 页面将 Under development 定义为不适合使用；Experimental 可能不稳定、可能被改变或移除；Beta 适合广泛测试但仍可能因反馈发生变化；Stable 表示有完整支持、文档和相对一致的行为与配置。
- 为什么 volatile：功能的 maturity 标签、支持范围和弃用流程会随发布改变；标签不是对某个任务质量、账号权限或安全性的证明。
- URL：[Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity)
- 访问日期：2026-08-10
- 适用范围：ChatGPT/Codex 发布中的功能成熟度标签。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

### V-11：Subagent workflow 的可用性、继承和成本

- 事实：当前 Subagents 页面写明当前 Codex releases 默认启用 subagent workflows；它们可以并行生成专门 Agent 并汇总结果，subagent 继承当前 sandbox policy，且因为每个 subagent 都进行自己的模型和工具工作，通常消耗比单 Agent 更多的 tokens。文档建议对读多写少的探索、测试、分诊和总结优先使用并行 Agent，对并行写代码更谨慎。
- 为什么 volatile：默认启用状态、并发上限、模型选择、继承规则和成本会改变；并行写入还受仓库冲突和协调风险影响。
- URL：[Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- 访问日期：2026-08-10
- 适用范围：ChatGPT Work、Codex desktop、CLI 和 IDE 页面描述的 subagent workflow；具体客户端和账号可能受组织配置限制。
- 建议复核日期：2026-09-10
- 状态：`必须 volatile`。

## 三、不能从官方文档推出的结论

### N-01：不能从文档页面推出本次会话的真实权限或授权状态

- 不能推出：打开权限文档、看到某个模式，或在配置示例中写出某个值，不足以证明当前本地会话已经启用该模式、当前账号被允许使用它，或当前组织没有更严格策略。
- 依据：官方 Permissions 页面明确说可用模式取决于本地配置和组织要求；Plugins 和 Cloud 页面分别要求安装、连接、认证或仓库选择。
- URL：[Permissions](https://learn.chatgpt.com/docs/permission-modes)、[Plugins](https://learn.chatgpt.com/docs/plugins)、[Codex cloud](https://learn.chatgpt.com/docs/cloud)
- 访问日期：2026-08-10
- 适用范围：本项目所有关于“当前账号/当前 workspace/当前客户端”的判断。
- 建议复核日期：2026-09-10，且每次进行实际外部动作前重新检查。
- 结论类型：`不能推出`。

### N-02：不能从已安装、已配置或已列出推出工具可用

- 不能推出：Skill 文件存在、Plugin 已安装、MCP 配置已写入、服务器出现在目录中，不能证明完整 Skill 已加载、Connector 已认证、MCP server 已启动，或当前任务能成功调用某个工具。
- 依据：官方文档把 Skill 选择、Plugin 安装、Connector/MCP 认证和新会话分成不同阶段，并提供独立的 `/mcp`、Authenticate 或重启步骤。
- URL：[Build skills](https://learn.chatgpt.com/docs/build-skills)、[Plugins](https://learn.chatgpt.com/docs/plugins)、[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- 访问日期：2026-08-10
- 适用范围：本地 Codex、ChatGPT desktop、CLI、IDE 和 Plugin/MCP 连接。
- 建议复核日期：2026-09-10，且每次工具调用前以实际连接/调用证据为准。
- 结论类型：`不能推出`。

### N-03：不能从“文档支持某命令/流程”推出本次任务已执行或成功

- 不能推出：CLI 页面列出 `codex exec`、Cloud 页面描述 Agent 会运行 checks，或 Prompting 页面建议复现和验证，都不能证明本次任务实际运行了某条命令、读到了某个文件、通过了某个测试、覆盖了所有边界，或生成的 diff 已经可交付。
- 依据：官方文档描述能力和推荐工作流；Cloud 页面使用“tries to validate”，CLI 的 `/review` 是检查入口。任务级结论仍需要实际命令输出、测试报告、diff、截图、日志或用户验收等证据。
- URL：[Codex CLI](https://learn.chatgpt.com/docs/codex/cli)、[Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)、[Prompting](https://learn.chatgpt.com/docs/prompting)
- 访问日期：2026-08-10
- 适用范围：所有本地、Cloud、CLI、IDE 和文档任务的“已执行/已验证/已完成”表述。
- 建议复核日期：2026-11-10；每个具体任务仍需即时核对证据。
- 结论类型：`不能推出`。

### N-04：不能从 summary、diff、review findings 或 Auto-review 批准推出正确性、安全性或完整性

- 不能推出：存在 summary/diff、代码审查没有发现问题、某个越界动作获准，不能证明实现正确、没有遗漏、没有安全风险、满足部署要求，或用户已经接受结果。
- 依据：官方 Auto-review 明确说它不是 deterministic security guarantee，只评估请求越过边界的动作并可能出错；官方工作流要求用户查看结果并复核。
- URL：[Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review)、[Prompting](https://learn.chatgpt.com/docs/prompting)、[Codex cloud](https://learn.chatgpt.com/docs/cloud)
- 访问日期：2026-08-10
- 适用范围：代码修改、外部工具调用、Cloud 交付、审查和安全相关任务。
- 建议复核日期：2026-10-10；具体任务按风险设置更短复核周期。
- 结论类型：`不能推出`。

### N-05：不能从 AGENTS.md 文件存在推出所有指令都会被遵守

- 不能推出：仓库存在 `AGENTS.md` 或文档说 Codex 会读取它，不足以证明本次运行加载了预期文件、全部内容进入上下文、指令没有被更近层级覆盖，或 Agent 实际遵守了每一条指令。
- 依据：官方 AGENTS.md 文档描述了发现优先级、每目录最多一个文件和默认 32 KiB 合并上限，并提供验证加载来源的命令；这些内容说明加载机制，不是行为合规证明。
- URL：[Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- 访问日期：2026-08-10
- 适用范围：Repository、user、admin 和 system instruction discovery；实际运行仍需查看当前会话的指令来源和行为证据。
- 建议复核日期：2026-09-10
- 结论类型：`不能推出`。

### N-06：不能从模型定位文案推出本项目的性能、成本或稳定性结论

- 不能推出：官方 Models 页面把模型定位为 flagship、balanced 或 fast/affordable，不等于本仓库任务中的实测质量、延迟、token 消耗、价格、通过率或性价比结论。
- 依据：模型页面给出产品定位和能力矩阵，但没有替代本项目的基准、运行记录或账号级计费核对。
- URL：[Models](https://learn.chatgpt.com/docs/models)
- 访问日期：2026-08-10
- 适用范围：任何关于模型选择、任务质量、成本、速度或“最适合本项目”的断言。
- 建议复核日期：2026-08-24；模型页变化或基准发生变化时立即复核。
- 结论类型：`不能推出`。

### N-07：不能把一个 Codex 表面的能力表外推为所有表面都相同

- 不能推出：CLI、IDE、Desktop、Web、Cloud、SDK 或 API 具有相同的命令、插件、MCP、网络、认证、模型和审批行为。
- 依据：官方 Glossary 和各产品页分别列出适用表面；Plugins 页面明确说 IDE extension 当前不支持 Plugins，Cloud 还使用独立环境生命周期，MCP 页面则说明 hosted plugin tools 可能不同于 Codex host 配置的 MCP。
- URL：[Codex Glossary](https://learn.chatgpt.com/docs/glossary)、[Plugins](https://learn.chatgpt.com/docs/plugins)、[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)、[Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)
- 访问日期：2026-08-10
- 适用范围：跨产品或跨客户端的架构、权限和功能比较。
- 建议复核日期：2026-09-10
- 结论类型：`不能推出`。

### N-08：不能从当前页面或旧 URL 的存在推出永久文档稳定性

- 不能推出：今天可访问的页面路径、命令、字段、模型名或示例在未来版本仍然有效；同样，旧文档路径失效也不能单独证明其语义从未存在或当前页面覆盖了所有历史细节。
- 依据：官方文档提供 Feature Maturity 分类，并在当前 Codex 导航中持续调整页面组织；页面事实必须以访问日期、适用范围和复核日期管理。
- URL：[Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity)、[Codex overview](https://learn.chatgpt.com/docs)
- 访问日期：2026-08-10
- 适用范围：本项目所有外部产品事实、链接、命令、配置和模型引用。
- 建议复核日期：2026-09-10；若页面标记 Experimental/Beta，则按发布变化即时复核。
- 结论类型：`不能推出`。

## 四、正文落地建议

| 内容 | 正文处理 | volatile 处理 |
|---|---|---|
| Codex、Agent、Action、Context 的关系 | 可写入概念正文 | 术语页面变化时复核 |
| Skill 与 Plugin/MCP 的分工 | 可写入概念正文 | 调用语法、目录、支持表面单列 |
| Sandbox 与 approval 的两层模型 | 可写入安全正文 | 默认模式、配置键、审核者和阈值单列 |
| Goal/Context/Output/Boundaries | 可作为任务协议正文 | 各表面的输入方式和 slash command 单列 |
| 验证与证据链 | 可写入方法正文 | `/review`、Cloud diff、测试命令和 UI 入口单列 |
| 网络、secret、Cloud setup/agent 生命周期 | 不写成跨产品永久定律 | 全部标 volatile，保留表面和日期 |
| 当前模型名、模型矩阵、退役日期 | 不作为稳定概念正文 | 只进入发布日期化事实卡，并在截止日期前复核 |
| 文档没有证明的账号授权、运行成功和部署结果 | 明确写入证据边界 | 不能用文档页面替代运行时证据 |

## 五、研究结论

最值得进入正文的稳定主线是：Codex 由 Agent 围绕上下文使用工具完成任务；Skill 提供可复用方法，Plugin/MCP 提供可安装或外部连接能力；sandbox 决定技术行动空间，approval 决定何时停下来请求审核；任务必须以目标、上下文、输出、边界和验证证据闭环。

最需要 volatile 管理的是：当前权限模式和默认值、网络与 secret 生命周期、Auto-review 实现、CLI 命令、Cloud 环境阶段、Skill 发现预算、Plugin/MCP 支持与认证、模型矩阵、退役日期和成熟度标签。

本研究不能证明当前仓库的 Codex 会话已经加载了哪些指令、拥有何种权限、连接了哪些工具、执行了哪些命令、通过了哪些测试，或已经完成任何外部交付；这些必须由对应运行时和任务级证据单独证明。
