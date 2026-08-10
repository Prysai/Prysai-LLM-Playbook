# OpenAI Codex 官方事实刷新记录

**刷新日期：** 2026-08-09
**内容状态：** `candidate`
**刷新范围：** GPT/Codex 模型、Codex 工作面、Skills/Plugins、权限与沙箱、Subagents、Cloud、IDE、CLI。
**来源边界：** 仅使用 OpenAI 官方文档页面；本记录不把用户体验、组织内部配置或未运行的比较实验写成官方事实。

## 使用规则

- `claim_status` 描述事实本身：`current` 表示在检查日期由所列官方来源支持，`disputed` 表示存在冲突或尚未被官方来源确认，`stale` 表示需要重新核对，`removed` 表示不再保留。
- `content_status` 描述本记录或项目内容的成熟度。它与 `claim_status` 独立；本记录仍是 `candidate`，不表示所有学习内容已经通过学习者前测。
- `applies_to` 必须写明工作面、账户条件或范围。一个工作面上的可用性不能推导出另一个工作面或某个账户一定可用。
- `next_review` 是本项目下一次人工复核日期，不是 OpenAI 的承诺日期。

## 刷新后的事实记录

### RF-001：Codex 的模型选择与推理强度属于工作面配置

```yaml
claim: "ChatGPT 桌面应用、ChatGPT Work 网页端、Codex CLI 和 Codex IDE 扩展都提供模型与推理强度选择；不同工作面显示的名称和可用选项可能不同。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 Models 页面列出的 app、web、cli、ide 工作面"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-002：推荐模型的官方定位

```yaml
claim: "官方当前将 gpt-5.6-sol 定位为适合复杂编码、电脑使用、研究和网络安全的旗舰模型；将 gpt-5.6-terra 定位为日常工作的均衡模型；将 gpt-5.6-luna 定位为快速、低成本且适合清晰、可重复任务的模型。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "Codex 模型选择指南；具体账户、订阅、API 和工作面仍以实际可用列表为准"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-003：模型适用性不是“最佳性价比”证明

```yaml
claim: "官方模型定位可以作为选择起点，但不能证明 gpt-5.6-luna 对所有任务具有最高性价比或最高转换率；本项目必须用固定任务集、相同输入、成本、耗时、错误、返工和人工评分进行比较。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "本项目的模型比较章节与评测，不构成 OpenAI 的总体排名"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-004：Luna 的用户假设保持为待验证状态

```yaml
claim: "‘GPT-5.6 Luna 是当前性价比最高的模型’是项目团队提出的待验证假设，而不是本次官方资料刷新后得到的结论。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "项目决策记录、模型评测和对外表述"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
```

### RF-005：Ultra 使用 Subagents

```yaml
claim: "官方说明 Ultra 会使用 Subagents 处理可拆分的复杂工作；多数任务不需要 Max 或 Ultra，模型选择和推理强度仍应根据任务需要调整。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 Models 页面所列并支持 Ultra 的工作面和账户"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-006：桌面应用工作面

```yaml
claim: "ChatGPT 桌面应用面向复杂工作，可在同一桌面工作区处理项目和文件，使用浏览器、桌面应用与插件，并支持在聊天中安排任务。"
source: "https://learn.chatgpt.com/docs/app.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app；功能是否对特定账户开放仍需在应用中确认"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-007：Codex CLI 工作面

```yaml
claim: "Codex CLI 用于在终端中探索项目、编辑文件和运行本地开发工具；官方 CLI 文档还列出模型、推理强度、权限、skills、plugins、代码审查、subagents、web search、Cloud 交接和 MCP 等工作流入口。"
source: "https://learn.chatgpt.com/docs/codex/cli.md"
checked_at: "2026-08-09"
applies_to: "Codex CLI；具体命令、版本和已安装能力以当前 CLI 与配置为准"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-008：CLI 的变更安全建议

```yaml
claim: "官方 CLI 入门文档建议在任务前后创建 Git checkpoints，以便在需要时恢复；这是一条工作方法建议，不等于 Codex 自动替用户完成提交或备份。"
source: "https://learn.chatgpt.com/docs/codex/cli.md"
checked_at: "2026-08-09"
applies_to: "使用 Codex CLI 修改本地仓库的学习实验"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-009：Codex IDE 扩展工作面

```yaml
claim: "Codex IDE 扩展把编辑器中的打开文件和选区作为上下文，支持在代码旁审查变更，并可把较长的工作交给 Codex Cloud。"
source: "https://learn.chatgpt.com/docs/codex/ide.md"
checked_at: "2026-08-09"
applies_to: "Codex IDE extension；VS Code 及兼容编辑器、JetBrains/Xcode 等入口的具体集成不同"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-010：Codex Cloud 工作面

```yaml
claim: "Codex Cloud 在隔离的云环境中运行编码任务，支持并行任务；官方入门流程包含连接 GitHub、创建环境、启动任务和审查结果。"
source: "https://learn.chatgpt.com/docs/cloud.md"
checked_at: "2026-08-09"
applies_to: "Codex Cloud；环境、仓库连接、账户资格和具体集成以当前产品配置为准"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-011：Cloud 环境与网络配置

```yaml
claim: "官方 Cloud 文档把环境配置、依赖与工具设置、变量以及 Agent 网络访问作为独立配置主题；不能把本地运行时的网络或文件边界直接推断为 Cloud 的边界。"
source: "https://learn.chatgpt.com/docs/cloud.md"
checked_at: "2026-08-09"
applies_to: "Codex Cloud 环境与网络访问设置"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-012：Skill 的定义与用途

```yaml
claim: "Skill 是为特定任务或工作流提供指导和支持资源的可复用工作流；它可以包含名称与描述、流程指令，以及模板、示例、品牌指南、schema 或连接工具等资源。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT 与 Codex 的 Skills 能力；实际加载、启用和权限仍受工作面与账户设置影响"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-013：Skill 的选择与显式调用

```yaml
claim: "ChatGPT 和 Codex 可以在请求匹配时选择适用的 Skill，也可以显式选择；ChatGPT 使用 @ 提及，Codex 使用 $ 提及。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "官方 Skills 文档描述的 ChatGPT/Codex 调用方式"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-014：Plugin 的范围

```yaml
claim: "Plugin 是可安装的能力包，可以同时包含 Skills 和 Connectors；Connectors 由 MCP servers 支持，并可选择包含自定义 ChatGPT UI。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "官方 Skills & Plugins 文档定义的 Plugin 层；不能仅凭安装成功推断所有服务权限已授予"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-015：Skill 与 Plugin 的选择边界

```yaml
claim: "需要聚焦的可复用指令时使用 Skill；需要可安装、可组合并可能连接外部服务的能力包时使用 Plugin。安装、启用和分享仍受产品与 workspace 设置约束。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "本项目的 Skill 设计、路由和安装教学"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-016：沙箱与审批是两个维度

```yaml
claim: "Sandbox 定义 ChatGPT/Codex 在技术上可以访问的文件和网络资源；Approvals 决定在动作前何时暂停并请求批准。改变谁来审查请求不会扩大 Sandbox。"
source: "https://learn.chatgpt.com/docs/permission-modes.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app、Codex CLI 和 Codex IDE 的本地动作权限模型"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-017：权限模式的教学边界

```yaml
claim: "官方权限文档建议大多数工作从 Ask for approval 开始；Approve for me 和 Full access 需要在 Permissions 中启用。Full access 等更宽权限会改变风险边界，不能作为学习实验的默认前提。"
source: "https://learn.chatgpt.com/docs/permission-modes.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app 与 Codex CLI/IDE 的权限菜单；具体可见选项随配置而异"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-018：Subagent 工作流

```yaml
claim: "ChatGPT Work 和 Codex 可以启动专门的 Subagents 并行处理独立部分，再收集结果；并行工作会消耗每个 Subagent 自己的模型和工具资源，因此通常适合可拆分的复杂工作。"
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT Work、ChatGPT desktop app、Codex CLI 和 Codex IDE 中官方文档描述的 Subagent 工作流"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-019：Subagent 的权限继承

```yaml
claim: "在本地 Codex 工作面中，Subagents 继承父任务的 Sandbox/权限模式；在 ChatGPT Work 中，Subagents 在托管环境运行，网站和 Connector 权限仍是工具特定的。"
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents.md"
checked_at: "2026-08-09"
applies_to: "官方 Subagents 页面区分的本地 Codex 与 ChatGPT Work"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

### RF-020：Subagent 可见性与配置

```yaml
claim: "官方文档说明本地 Codex 可通过配置定义自定义 Agent；自定义 Agent 至少需要 name、description 和 developer_instructions，且可为单个 Agent 配置模型、推理强度、sandbox_mode、MCP servers 或 skills.config。"
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents.md"
checked_at: "2026-08-09"
applies_to: "本地 Codex 的项目级或个人级自定义 Agent 配置；格式和支持项可能随版本演进"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
```

## 本次移除或降级的表述

以下表述不再作为已核实的官方事实写入基线：

- “Luna 是所有任务中性价比最高”或“转换率最高”；保留为 `disputed` 的待验证假设。
- “某个 Skill、Plugin、Connector 对所有入口、账户或组织都可用”；官方文档没有授权这种泛化。
- “审批模式自动扩大沙箱”；官方权限文档明确区分两者。
- “本地 Codex 的默认网络行为可代表 Cloud”；Cloud 有独立环境和网络访问配置主题。
- “Codex 会自动替用户创建 Git 提交或备份”；官方只提供工作方法建议，是否执行必须有实际证据。

## 尚未由本次刷新验证的事项

- 特定账户或 Prysai workspace 是否启用了某个模型、Skill、Plugin、Connector 或 Cloud 功能。
- 当前计划、地区、订阅、限额、价格、上下文长度、速率限制和实际 rollout 状态。
- 本项目尚未完成 Luna 与其他模型的固定任务集运行，因此没有性能或成本结论。
- 本项目尚未完成所有章节、实验和 Skill 的 fresh-context 学习者前测；整体内容状态仍为 `candidate`。
