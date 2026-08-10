# OpenAI Codex 当前事实刷新：第 4–7 章

**研究日期：** 2026-08-09
**研究范围：** 第 4 章“上下文、权限与 Agent 的行动边界”、第 5 章“选择正确的 Codex 工作面”、第 6 章“模型选择不是模型崇拜”、第 7 章“Skill、Plugin、MCP 和工具如何分工”。
**来源边界：** 仅使用已打开并核对正文的 OpenAI 官方文档，主要为 `learn.chatgpt.com` 的 Codex/ChatGPT 文档及 `developers.openai.com` 的官方文档索引；不使用博客、issue、社区帖子或二手资料。
**证据类别：** `official_fact` = 官方页面直接支持的产品事实；`unconfirmed` = 官方页面没有确认本仓库、当前账户或当前运行时的具体状态；`local_unreproduced_boundary` = 本轮没有在本地运行相应产品流程，因此不能把文档描述写成本地运行证据。
**许可证/资产边界：** 本文件只记录事实和官方链接，没有复制外部正文、代码、图片或可分发资产；不新增外部资产许可主张。

## 结论摘要

- 第 4 章可以把 sandbox 与 approval policy 教成两个互补但不同的控制层：前者限制技术行动空间，后者决定何时暂停请求批准。网络访问、连接器/MCP 副作用和工作区外写入都不能仅凭“Agent 能理解”来推断已获授权。
- 第 5 章应把 Local、Worktree、Cloud、CLI 和 IDE 当作不同工作面。官方说明了它们的运行位置和典型工作流，但没有替本仓库确认账户资格、GitHub 连接、组织策略、当前 UI 或当前模型可用性。
- 第 6 章可以引用官方对 `gpt-5.6-sol`、`gpt-5.6-terra`、`gpt-5.6-luna` 的定位和工作面列表；不能把“旗舰”“低成本”“快速”转写成 Field Guide 自己的性能、成本或性价比结论。
- 第 7 章应区分 Skill（可复用方法/资源）、Plugin（可安装的能力包）、connector/MCP（外部工具与上下文连接）和工具级审批。安装、连接、认证、工具可见和本次任务实际可用是不同状态。

## 一、官方事实

### OF-001：Sandbox 与 approval policy 是两个不同控制层

```yaml
claim: "OpenAI 官方将 Codex 的安全控制分成两层：sandbox mode 决定模型生成的命令在技术上能做什么，例如可写位置和网络可达性；approval policy 决定何时必须在执行前暂停并请求批准，例如离开沙盒、使用网络或运行不在可信集合中的命令。"
official_url: "https://learn.chatgpt.com/docs/agent-approvals-security.md"
checked_at: "2026-08-09"
applies_to: "官方 Agent approvals & security 文档描述的 Codex Cloud、ChatGPT desktop app、Codex CLI 和 Codex IDE extension；具体默认值仍受工作面、配置和组织策略影响"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章"]
```

### OF-002：本地 Codex 的默认边界不是“全机可写、默认联网”

```yaml
claim: "官方文档说明，本地 Codex 默认关闭网络访问；Codex CLI/IDE extension 的常见默认边界是由操作系统强制执行的沙盒，并把写权限限制在活动工作区。Auto 预设允许在工作目录中读取、编辑和运行常规命令，但工作区外编辑或需要网络的命令会触发批准请求；read-only 模式用于只读检查和规划。"
official_url: "https://learn.chatgpt.com/docs/agent-approvals-security.md"
checked_at: "2026-08-09"
applies_to: "官方文档所述的本地 Codex CLI、IDE extension 和 ChatGPT desktop app；不外推为本仓库当前会话的实际配置"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第5章"]
```

### OF-003：云端任务与本地任务有不同的沙盒生命周期

```yaml
claim: "官方文档说明，Codex Cloud 在隔离的 OpenAI 管理容器中运行；其运行时分为 setup 阶段和 agent 阶段，setup 可联网安装指定依赖，agent 阶段默认离线，除非为该环境启用互联网访问。为云环境配置的 secrets 只在 setup 阶段可用，并在 agent 阶段开始前移除。"
official_url: "https://learn.chatgpt.com/docs/agent-approvals-security.md"
checked_at: "2026-08-09"
applies_to: "Codex Cloud 的官方运行模型；环境配置、网络开关和组织策略可能改变可用范围"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第5章"]
```

### OF-004：连接器和 MCP 的副作用也属于审批边界

```yaml
claim: "官方文档说明，带有副作用声明的 app/connector 工具调用可能触发批准，即使它不是 shell 命令或文件变更；标记为 destructive 的 app/MCP 工具调用在工具声明该破坏性注解时始终需要批准。"
official_url: "https://learn.chatgpt.com/docs/agent-approvals-security.md"
checked_at: "2026-08-09"
applies_to: "官方 Codex 本地安全与审批模型中由 app、connector 或 MCP 暴露的工具调用"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第7章"]
```

### OF-005：原生 Windows 有 elevated 与 unelevated 两种沙盒实现

```yaml
claim: "官方 Windows 文档说明，原生 Windows Codex 支持 elevated 和 unelevated 两种沙盒；elevated 是首选，使用较低权限的专用沙盒用户、文件系统边界和防火墙规则；unelevated 是回退方案，仍提供 ACL 文件边界，但网络隔离较弱。原生 Windows 沙盒默认阻止工作文件夹之外的写入，并在没有明确批准时阻止网络访问。"
official_url: "https://learn.chatgpt.com/docs/windows/windows-sandbox.md"
checked_at: "2026-08-09"
applies_to: "原生 Windows 上的 ChatGPT desktop app、Codex CLI 和 IDE extension；WSL2 使用另一套 Linux 沙盒语义"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第5章"]
```

### OF-006：Codex 的工作面包括 Local、Worktree 和 Cloud

```yaml
claim: "官方环境文档把 Codex chat 的运行位置分为 Local、Worktree 和 Cloud：Local 直接在当前项目目录工作，Worktree 在 Git worktree 中隔离变更，Cloud 在已配置的云环境中远程运行；Local 和 Worktree 都在用户电脑上运行。"
official_url: "https://learn.chatgpt.com/docs/environments/modes.md"
checked_at: "2026-08-09"
applies_to: "ChatGPT desktop app 中的 Codex 环境选择；其他入口的具体选择器和支持范围需单独核对"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章"]
```

### OF-007：CLI 的官方定位是本地仓库、命令和可重复工作流

```yaml
claim: "官方 Codex CLI 文档将 CLI 定位为在终端中检查代码、修改文件、运行工具并自动化可重复工作；它可以针对本地仓库工作，也可以选择模型、推理强度、权限和命令，并通过 codex exec 组合脚本和 CI。"
official_url: "https://learn.chatgpt.com/docs/codex/cli.md"
checked_at: "2026-08-09"
applies_to: "官方 Codex CLI 文档描述的终端工作面；实际命令、版本、登录方式和本机安装状态需单独验证"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章"]
```

### OF-008：IDE extension 以编辑器中已有上下文和可审查 diff 为中心

```yaml
claim: "官方 IDE 文档说明，Codex IDE extension 可以使用编辑器中打开的文件、选区和最近聊天作为上下文，在编辑器旁审查摘要和聚焦 diff，并可把更长的工作交给 Codex web 后回到编辑器审查结果。"
official_url: "https://learn.chatgpt.com/docs/codex/ide.md"
checked_at: "2026-08-09"
applies_to: "官方 Codex IDE extension 文档描述的 VS Code、兼容编辑器及 Xcode/JetBrains 等各自集成；不同编辑器的入口和能力不应互相外推"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章"]
```

### OF-009：Codex Cloud 面向隔离、并行和可审查交付

```yaml
claim: "官方 Cloud 文档将 Codex Cloud 描述为在隔离云环境中并行运行较长任务；环境可以配置依赖、工具、变量和 setup 步骤，结果应通过 summary 和 diff 审查，之后再请求跟进或打开 pull request。官方入门流程要求连接 GitHub、创建仓库环境并选择该环境启动任务。"
official_url: "https://learn.chatgpt.com/docs/cloud.md"
checked_at: "2026-08-09"
applies_to: "Codex Cloud 的官方入门流程和产品定位；不表示任意账户、组织或仓库已经具备相应连接和资格"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章"]
```

### OF-010：官方当前模型页对 Sol、Terra、Luna 的定位不同

```yaml
claim: "截至检查日，官方 Models 页面列出的推荐 Codex 模型包括 gpt-5.6-sol、gpt-5.6-terra 和 gpt-5.6-luna。页面将 Sol 描述为旗舰模型，面向复杂编码、computer use、研究和网络安全；将 Terra 描述为日常工作的均衡模型，性能与 GPT-5.5 有竞争力且成本更低；将 Luna 描述为家族中快速、可负担且成本最低的模型。"
official_url: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 Models 页面展示的产品定位；这些描述不是本项目的独立性能、成本或性价比测量"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第6章"]
```

### OF-011：模型工作面可用性在官方表格中并不完全相同

```yaml
claim: "官方 Models 页面当前的工作面表格显示，Sol 可用于 ChatGPT desktop、ChatGPT web、Codex CLI、Codex IDE extension 和 Codex Cloud；Terra 与 Luna 列在 ChatGPT desktop、ChatGPT web、Codex CLI 和 Codex IDE extension，但 Codex Cloud 栏为不可用。实际账户可见性仍取决于账户、workspace 和组织配置。"
official_url: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 Models 页面所列工作面矩阵；不外推到未列出的账户、区域、组织策略或未来版本"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章", "第6章"]
```

### OF-012：更高推理强度与 Ultra 有明确的官方使用提示

```yaml
claim: "官方 Models 页面说明，更高 reasoning effort 可能改善复杂任务的结果，但会耗时更长并使用更多 tokens；建议从默认强度开始，只有在任务需要更深规划或分析时再增加。官方还说明 Ultra 会使用 subagents 并行处理可拆分的复杂任务，多数任务不需要 Max 或 Ultra。"
official_url: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 ChatGPT/Codex 模型选择说明；不构成对本仓库任务集的实测结论"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第6章"]
```

### OF-013：本地默认模型配置与 Cloud 默认模型选择不同

```yaml
claim: "官方 Models 页面说明，ChatGPT desktop app、Codex CLI 和 IDE extension 共用 config.toml，可用 model 字段指定本地默认模型；如果不指定则使用推荐模型。官方当前同时说明，Codex Cloud chat 不能更改默认模型。"
official_url: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "官方 Models 页面描述的本地 Codex 工作面与 Codex Cloud chat；不表示本仓库的配置文件或账户已经使用某个模型"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章", "第6章"]
```

### OF-014：Skill 是可复用的任务工作流与支持资源

```yaml
claim: "官方 Skills & Plugins 文档将 Skill 定义为针对特定任务或工作流打包的指令与支持资源；Skill 可以包含名称和描述、流程指令，以及模板、示例、品牌指南、schema 或连接工具等资源。ChatGPT 和 Codex 可以在请求匹配时选择 Skill，也可以显式选择；ChatGPT 使用 @ 提及，Codex 使用 $ 提及。"
official_url: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
checked_at: "2026-08-09"
applies_to: "官方对 ChatGPT/Codex Skills 的定义与调用说明；具体 Skill 是否已启用、被发现或有权使用其依赖需单独确认"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第7章"]
```

### OF-015：Plugin 是可安装的能力包，且可包含 Skill、connector 和 MCP server

```yaml
claim: "官方 Plugins 文档将 Plugin 定义为可安装的能力 bundle，可以包含 skills、connectors 或两者；connector 由 MCP server 支撑，MCP server 可以提供工具或共享信息，也可以执行外部系统动作。官方列出的支持面包括 ChatGPT web、desktop 和 mobile 中的 Chat/Work、ChatGPT desktop app 中的 Codex，以及 Codex CLI 的 plugin browser；IDE extension 不支持 Plugins。移动端可以使用账户可用的 Chat/Work plugins，但目录浏览和安装入口不应从桌面流程外推。"
official_url: "https://learn.chatgpt.com/docs/plugins.md"
checked_at: "2026-08-09"
applies_to: "官方 Plugins 目录与支持面说明；插件目录内容、workspace 控制和具体连接能力可能随账户与组织设置变化"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第5章", "第7章"]
```

### OF-016：Plugin 安装、连接/认证和新会话是不同步骤

```yaml
claim: "官方 Plugins 文档给出的使用流程是：在支持的目录中查看并安装 Plugin；若需要 connector，则按提示连接，认证可能发生在安装时或首次使用时；安装后启动新的 chat 或 CLI session，再请求使用 Plugin 的能力。官方还明确说明，Sign in with ChatGPT 不会自动授予 Plugin 数据访问权，也不会自动批准动作，所请求的权限仍需单独审查和批准。"
official_url: "https://learn.chatgpt.com/docs/plugins.md"
checked_at: "2026-08-09"
applies_to: "官方 Plugins 安装、连接、认证和授权说明；不把安装成功当作本次任务可用或外部系统已授权"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第7章"]
```

### OF-017：MCP 把 Codex 连接到外部工具和上下文

```yaml
claim: "官方 MCP 文档将 Model Context Protocol 描述为连接模型与工具/上下文的协议；在 Codex 中，MCP server 可以提供第三方文档、浏览器、Figma 等外部工具或上下文。对本地 Codex host，ChatGPT desktop app、Codex CLI 和 IDE extension 支持 STDIO 与 Streamable HTTP server，并共享 Codex MCP 配置；MCP 可暴露 tools、resources 和 prompts。"
official_url: "https://learn.chatgpt.com/docs/extend/mcp.md"
checked_at: "2026-08-09"
applies_to: "官方 Codex host 的 MCP 配置与能力说明；Hosted plugin tools 可能具有不同能力，外部 server 的认证和数据边界需单独核对"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第7章"]
```

### OF-018：MCP 工具可以用 allow/deny 与审批模式进一步收窄

```yaml
claim: "官方 MCP 文档说明，Codex 可以为 MCP server 配置 enabled_tools 和 disabled_tools 工具列表，并设置 default_tools_approval_mode；支持 auto、prompt、writes 和 approve，也可以为单个工具设置 approval_mode。Plugin 提供的 MCP server 仍可由用户配置其启用状态和工具策略。"
official_url: "https://learn.chatgpt.com/docs/extend/mcp.md"
checked_at: "2026-08-09"
applies_to: "官方 Codex MCP server 配置；具体 server 的工具声明、认证、连接状态和组织策略可能改变实际行为"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "current"
evidence_class: "official_fact"
chapter_refs: ["第4章", "第7章"]
```

## 二、未能确认的事项

下面的记录不是把“没有证据”写成产品事实，而是明确官方页面和本次研究的边界。它们使用 `claim_status: disputed`，直到有账户级、组织级或运行时证据。

### UF-001：本仓库当前账户是否具备各入口和能力资格

```yaml
claim: "本次只读研究未能确认当前账户或 workspace 是否实际开放 Codex Cloud、GitHub 连接、特定模型、Plugin 目录、MCP OAuth 或 subagent 能力；官方文档的产品说明不能替代账户级可用性证据。"
official_url: "https://learn.chatgpt.com/docs/cloud.md"
checked_at: "2026-08-09"
applies_to: "本仓库当前账户、workspace、组织策略和地区；不适用于官方产品说明本身"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
evidence_class: "unconfirmed"
chapter_refs: ["第5章", "第6章", "第7章"]
```

### UF-002：官方模型定位不等于 Field Guide 的比较结论

```yaml
claim: "本次没有运行固定任务集来确认 gpt-5.6-sol、gpt-5.6-terra 或 gpt-5.6-luna 的首次通过率、耗时、成本、稳定性、返工率或总体性价比；“旗舰”“快速”“最低成本”等只应保留为官方定位，不能写成项目评测结论。"
official_url: "https://learn.chatgpt.com/docs/models.md"
checked_at: "2026-08-09"
applies_to: "Field Guide 第6章的模型选择和评测结论"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
evidence_class: "unconfirmed"
chapter_refs: ["第6章"]
```

### UF-003：本地文件、组织策略和连接权限不能从“登录”推断

```yaml
claim: "本次未能确认当前 Codex 工作面实际可读写的文件范围、组织强制的 permission profile、MCP server 的认证状态、Plugin connector 的数据权限或 GitHub 仓库授权；官方文档把这些配置分别放在本地沙盒/权限、插件、MCP 和 Cloud/工作区边界中。"
official_url: "https://learn.chatgpt.com/docs/extend/mcp.md"
checked_at: "2026-08-09"
applies_to: "本仓库当前本地运行时与任何可能的 Codex Cloud/workspace 连接"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
evidence_class: "unconfirmed"
chapter_refs: ["第4章", "第5章", "第7章"]
```

## 三、本地未复现边界

### LB-001：本轮没有执行 Codex 产品运行验证

```yaml
claim: "本轮只读取官方页面、项目规范和本地章节，并新增本研究文件；没有在本地 Codex CLI、ChatGPT desktop app、IDE extension 或 Codex Cloud 中运行任务，因此没有产生沙盒拒绝、审批提示、模型切换、Skill 触发、Plugin 安装、MCP 连接或 Cloud diff 的本地运行证据。"
official_url: "https://learn.chatgpt.com/docs/agent-approvals-security.md"
checked_at: "2026-08-09"
applies_to: "本次研究的证据强度和完成状态"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
evidence_class: "local_unreproduced_boundary"
chapter_refs: ["第4章", "第5章", "第6章", "第7章"]
```

### LB-002：没有进行外部账号操作或副作用动作

```yaml
claim: "本轮没有登录外部账号、连接 GitHub、安装 Plugin、认证 connector/MCP、创建 Cloud environment、上传数据、发送消息、提交表单、打开 pull request 或推送 Git；因此不能把任何外部服务状态写成已完成或已授权。"
official_url: "https://learn.chatgpt.com/docs/plugins.md"
checked_at: "2026-08-09"
applies_to: "本次研究任务的外部副作用边界"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
evidence_class: "local_unreproduced_boundary"
chapter_refs: ["第4章", "第5章", "第7章"]
```

### LB-003：当前 Windows 沙盒模式未在本轮核验

```yaml
claim: "虽然官方 Windows 文档描述了 elevated 和 unelevated 沙盒及其差异，但本轮没有读取或改变本机 Codex 配置，也没有运行官方 sandbox 检查命令；因此不能确认当前机器实际使用哪一种实现，也不能确认其网络和文件边界已经按文档生效。"
official_url: "https://learn.chatgpt.com/docs/windows/windows-sandbox.md"
checked_at: "2026-08-09"
applies_to: "当前 Windows 主机的 Codex 本地运行时"
owner: "facts-maintainer"
next_review: "2026-09-09"
claim_status: "disputed"
evidence_class: "local_unreproduced_boundary"
chapter_refs: ["第4章", "第5章"]
```

## 对第 4–7 章的使用结论

1. 第 4 章可以直接使用 OF-001 至 OF-005 解释权限、沙盒、网络、连接器副作用和 Windows 实现；用 UF-003、LB-001 和 LB-003 防止“文档描述 = 当前运行时已验证”的误读。
2. 第 5 章可以使用 OF-006 至 OF-009 讲工作面选择；用 UF-001 和 LB-002 提醒读者，Cloud/GitHub/组织资格与本地入口选择必须分别核验。
3. 第 6 章可以使用 OF-010 至 OF-013 记录截至日期的模型定位、工作面矩阵、推理强度提示和本地/Cloud 配置差异；UF-002 保留“需要固定任务集实测”的边界。
4. 第 7 章可以使用 OF-014 至 OF-018 解释 Skill、Plugin、connector、MCP 和工具审批的分工；UF-001、UF-003 和 LB-002 防止把安装、认证、可见、授权和实际调用混为一谈。

**本研究文件状态：** `candidate`。它是截至 2026-08-09 的来源刷新记录，不替代账户级验证、运行时验证、独立模型评测或生产发布审查。
