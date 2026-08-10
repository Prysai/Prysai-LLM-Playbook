# OpenAI Codex 官方事实基线

**基线日期：** 2026-08-09
**内容状态：** `candidate`
**用途：** 为本项目的术语、章节和更新审查提供有日期的官方事实入口；不替代当前产品文档，也不代表某个账户已经获得对应能力。
**来源范围：** OpenAI 官方文档（`learn.chatgpt.com`）。

## 状态分离

- `content_status` 描述本文件和学习内容的成熟度：`draft`、`candidate`、`verified`、`production-ready`。
- `claim_status` 描述单条事实：`current`、`stale`、`disputed`、`removed`。
- 两种状态不能互相替代。本基线是 `candidate`，其中一条事实可以是 `current`；反之，事实当前也不等于章节已经被学习者验证。

## 官方事实记录

### 模型与推理

```yaml
claim: "官方 Models 页面当前列出 gpt-5.6-sol、gpt-5.6-terra 和 gpt-5.6-luna 三个 GPT-5.6 Codex 模型，并分别将它们定位为复杂工作、日常工作和清晰可重复工作。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "Codex 模型指南；工作面、账户和 API 的实际可用性需单独确认"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "模型和推理强度会影响速度、用量与结果；官方建议从默认强度开始，再根据任务需要增加深度。Ultra 会使用 Subagents 处理可拆分的复杂任务。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 Models 页面描述的 ChatGPT desktop、ChatGPT Work web、Codex CLI 和 IDE 工作面"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "‘GPT-5.6 Luna 性价比最高’不是官方事实；在本项目中只能作为待验证假设，必须用固定任务、相同输入、成本、耗时、错误、返工和人工评分进行评测。"
source: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "本项目的模型评测和对外表述"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "disputed"
```

### Codex 工作面

```yaml
claim: "ChatGPT 桌面应用面向复杂工作，支持在桌面工作区处理项目和文件，并使用浏览器、桌面应用、插件和计划任务。"
source: "https://learn.chatgpt.com/docs/app.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app；功能开放范围以实际应用为准"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "Codex CLI 用于在终端中探索项目、编辑文件和运行本地工具，并提供模型、推理强度、权限、skills、plugins、代码审查、Subagents、搜索、Cloud 交接和 MCP 等入口。"
source: "https://learn.chatgpt.com/docs/codex/cli.md"
checked_at: "2026-08-09"
applies_to: "Codex CLI；命令和功能以当前 CLI 版本与配置为准"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "Codex IDE 扩展以编辑器中的打开文件和选区为上下文，支持在代码旁审查变更，并可将较长工作交给 Codex Cloud。"
source: "https://learn.chatgpt.com/docs/codex/ide.md"
checked_at: "2026-08-09"
applies_to: "Codex IDE extension；不同编辑器的集成入口和能力可能不同"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "Codex Cloud 在隔离的云环境中运行编码任务，支持并行工作，并以 GitHub 连接、环境创建、任务运行和结果审查为基本入门流程。"
source: "https://learn.chatgpt.com/docs/cloud.md"
checked_at: "2026-08-09"
applies_to: "Codex Cloud；仓库连接、环境、账户资格和集成范围需在当前产品中确认"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

### Skills、Plugins 与 Connectors

```yaml
claim: "Skill 是针对特定任务或工作流的可复用指导与资源包，可以包含流程指令、模板、示例、品牌指导、schema 或连接工具。ChatGPT 和 Codex 可以匹配 Skill，也可以显式选择；ChatGPT 使用 @ 提及，Codex 使用 $ 提及。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT 与 Codex 的 Skills 文档定义；启用和可用性仍受工作面与设置影响"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "Plugin 是可安装的能力包，可以包含 Skills 和 Connectors；Connectors 由 MCP servers 支持，并可选择包含自定义 ChatGPT UI。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "官方 Skills & Plugins 文档定义的 Plugin 层"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "安装或存在某个 Skill、Plugin 或 Connector，不足以证明它对所有工作面、账户或组织可用；实际启用、认证和服务权限必须在对应环境中核验。"
source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "本项目的安装教学、权限教学和团队采用流程"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

### 权限、沙箱与安全

```yaml
claim: "Sandbox 定义 Agent 在技术上可以访问的文件和网络资源；Approvals 定义何时在动作前暂停并请求批准。改变审批者或审批方式不会扩大 Sandbox。"
source: "https://learn.chatgpt.com/docs/permission-modes.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app、Codex CLI 和 Codex IDE 的本地动作权限模型"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "官方权限文档建议大多数工作从 Ask for approval 开始；Approve for me 和 Full access 需要在 Permissions 中启用。学习实验应明确文件、网络、认证和外部副作用边界。"
source: "https://learn.chatgpt.com/docs/permission-modes.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app、Codex CLI 和 Codex IDE；菜单选项可能随配置变化"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "Cloud 有独立的隔离环境、依赖与工具配置和网络访问配置主题；本地 Codex 的文件或网络边界不能直接代表 Cloud 的边界。"
source: "https://learn.chatgpt.com/docs/cloud.md"
checked_at: "2026-08-09"
applies_to: "Codex Cloud 环境和网络访问教学"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

### Subagents

```yaml
claim: "ChatGPT Work 和 Codex 可以启动专门的 Subagents 并行处理独立部分，再收集结果；这种工作流会消耗每个 Subagent 自己的模型和工具资源，适合能清晰拆分的复杂任务。"
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT Work、ChatGPT desktop app、Codex CLI 和 Codex IDE 的官方 Subagents 说明"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "本地 Codex 的 Subagents 继承父任务的 Sandbox/权限模式；ChatGPT Work 的 Subagents 在托管环境运行，网站和 Connector 权限仍是工具特定的。"
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents.md"
checked_at: "2026-08-09"
applies_to: "官方 Subagents 页面区分的本地 Codex 与 ChatGPT Work"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

```yaml
claim: "本地 Codex 可通过自定义 Agent 配置定义 name、description 和 developer_instructions，并可配置模型、推理强度、sandbox_mode、MCP servers 或 skills.config；配置格式和支持项可能随版本变化。"
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents.md"
checked_at: "2026-08-09"
applies_to: "本地 Codex 的项目级或个人级自定义 Agent"
owner: "Codex Field Guide 事实维护者"
next_review: "2026-09-09"
claim_status: "current"
```

## 复核清单

下次刷新必须重新确认：

- 模型名称、ID、描述、工作面可用性、价格、限额、上下文长度、工具支持和弃用时间；
- 桌面、Web、CLI、IDE、Cloud、Remote 等入口的开放范围、系统支持、账户资格和 rollout 状态；
- Skill 的调用语法、自动匹配、安装和 bundled resources；
- Plugin、Connector、MCP、认证、workspace 分享和 manifest 约束；
- Sandbox、审批模式、网络访问、企业限制和 Subagent 继承规则。

本文件不记录秘密、Token、Cookie、`.env` 或账户凭据，也不把本项目尚未运行的模型比较写成验证结果。
