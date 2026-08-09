# OpenAI Codex 官方基线

**访问日期：** 2026-08-09
**来源范围：** OpenAI 官方文档（`learn.chatgpt.com`、`developers.openai.com`）
**用途：** 为 Atlas 的产品事实、术语和更新审查提供基线，不替代当前官方文档。

## 已核实的 Codex 使用面

- **ChatGPT 桌面应用：** 提供专门的 Codex 编程体验，并可与项目、文件、插件、浏览器/电脑使用、计划任务和长时间运行的工作结合。
- **Codex CLI：** 支持终端中的项目检查、文件编辑、命令执行、自动化、skills、plugins、审查、子任务和云端交接。
- **Codex IDE 扩展：** 以编辑器上下文为中心，支持行内审查/编辑，并可将工作交给 Codex Cloud。
- **Codex Cloud：** 在隔离的云环境中运行编码任务，支持并行处理。
- **Remote：** 用于从其他设备启动、指导、批准和审查连接电脑上运行的任务。
- **ChatGPT Web / Work：** 是相关的文件、工具、skills 和 plugins 工作面，但不能简单等同于本地 Codex 运行时。

## Skills 与 plugins

- **Skill** 是可复用的工作流，通常包含指令以及模板、示例、schema 或辅助工具等资源。
- ChatGPT 和 Codex 可以自动选择匹配的 skill，也可以显式调用；Codex 采用 `$` 形式的 skill 提及。
- **Plugin** 是可安装的能力包，可以包含 skills、connectors、MCP servers、浏览器扩展、hooks、计划任务模板和可选 UI。
- 插件存在多个分发来源，包括公共目录、本地来源、仓库来源、个人 marketplace 和 workspace marketplace。
- 插件可用范围取决于具体产品面；不能因为某个插件存在，就假定它在所有入口、账户或组织中可用。
- 可分发插件需要 `.codex-plugin/plugin.json`；可选组件包括 `skills/`、`.mcp.json`、`.app.json`、`hooks/` 和 `assets/`。

## 权限与安全

- **Sandboxing** 决定 Agent 在技术上可以访问什么，包括文件系统和网络边界。
- **Approval policy** 决定 Agent 在哪些动作前必须暂停并请求批准；更换审批策略不会自动扩大 sandbox。
- 本地 Codex 的默认授权和网络行为会受到运行面与配置影响，不能只凭某次会话的行为推断所有环境的默认值。
- 完全开放访问会提高数据丢失、泄露和意外行为的风险。
- Cloud 使用隔离的 OpenAI 管理环境；setup 阶段和 Agent 阶段的网络行为可能不同。
- Plugin、connector 和外部服务分别有自己的认证、权限、条款和隐私边界；“能连接”不等于“可以无条件操作”。

## GPT-5.6 Luna 的处理方式

截至本次核查，官方 API 模型目录把 `gpt-5.6-luna` 描述为面向成本敏感工作负载优化的 GPT-5.6 模型。官方 Codex 文档将 Luna 的适用方向描述为清晰、重复性较强的工作，例如抽取、分类、转换和结构化摘要。

这条信息不应在 Atlas 中被写成永久的“最佳模型”结论。需要以固定任务集、上下文、工具、权限、时间预算、重复次数和成功标准进行比较，并记录：

- 首次通过率；
- 返工率和错误类型；
- 运行时间；
- 使用成本；
- 人工评分；
- 不同任务类别之间的稳定性。

“性价比最高”或“转换最高”只能作为待验证假设，不能由单个演示或主观感受直接推出。

## 必须定期复核的事实

- 模型名称、ID、描述、价格、限额、上下文长度、工具支持和知识截止日期；
- Codex 入口的可用范围、计划资格、操作系统支持和 rollout 状态；
- Plugin 目录、版本、认证方式、marketplace 行为和 manifest schema；
- Skill 的调用语法、自动选择行为和 bundled resources；
- Sandbox 默认值、审批策略、网络控制、企业限制和安全建议；
- 版本更新、弃用日期和迁移要求；
- 某个 skill、plugin、connector 或模型是否真的对特定账户/组织启用。

## 官方来源

以下链接均在 2026-08-09 访问：

- [Codex 文档索引](https://learn.chatgpt.com/docs)
- [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app)
- [ChatGPT Web](https://learn.chatgpt.com/docs/web)
- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Codex IDE 扩展](https://learn.chatgpt.com/docs/codex/ide)
- [Codex Cloud](https://learn.chatgpt.com/docs/cloud)
- [Codex Remote](https://learn.chatgpt.com/docs/remote)
- [Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Package your plugin](https://developers.openai.com/plugins/build/plugins)
- [Permissions](https://learn.chatgpt.com/docs/permission-modes)
- [Sandbox](https://learn.chatgpt.com/docs/sandboxing)
- [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)
- [Codex model guide](https://learn.chatgpt.com/docs/models)
- [API model catalog](https://developers.openai.com/api/docs/models)
- [GPT-5.6 Luna model page](https://developers.openai.com/api/docs/models/gpt-5.6-luna)
- [Codex updates](https://learn.chatgpt.com/docs/whats-new)

## 记录方式

本文件只保存基线和来源。具体章节应引用它需要的部分，并在内容生命周期记录中写明下一次复核日期；不要把这份基线当成脱离日期的产品承诺。
