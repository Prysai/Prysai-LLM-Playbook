# 第 03 章：OpenAI/Codex 官方事实基线（2026-08-10）

> 研究状态：candidate（官方页面事实已逐页核对；未对本机 Codex、账号权限、云环境或实际工具运行做运行时验收）。
>
> 访问日期：2026-08-10（America/Los_Angeles）。
>
> 研究问题：OpenAI/Codex 官方公开文档当前如何描述任务协议、上下文、权限与审批、工具调用、验证和交付？

## 1. 结论摘要

官方文档呈现的是一个“结果导向、上下文受控、权限分层、可检查交付”的工作协议：

1. 先说明目标、上下文、输出和边界；对 Codex 任务补充相关代码、复现步骤、约束和验证方式。
2. 让 Codex 根据任务选择调查、计划、编辑、运行命令或调用工具；需要先审视方法时，可以先使用 `/plan`，而不是把所有内部步骤预先写死。
3. 把“能做什么”与“何时必须询问”分开：sandbox/permission profile 限制技术能力，approval policy 决定哪些动作需要批准。
4. 工具、技能、插件和连接器扩大行动空间，但并不替代具体的适用范围、权限策略和副作用审批。
5. 验证必须是可检查的命令、测试、复现、diff、审查结果或来源核对；文档明确建议重要结果在使用或分享前由人复核。
6. 交付应是可审阅的结果（例如摘要、文件、diff 或 PR），而不是仅凭“已完成”的文字声明。

这是一份官方文档事实基线，不是对所有 Codex 表面、账号计划、版本或本机配置都适用的保证。

## 2. 任务协议：从请求到可交付结果

### 2.1 官方建议的任务输入

OpenAI 的 Prompting 页面把较大或较重要任务拆为四类信息：

- **Goal**：要 ChatGPT/Codex 做什么；
- **Context**：哪些信息或来源会影响结果；
- **Output**：需要什么格式、长度或详细程度；
- **Boundaries**：哪些内容必须保持不变、哪些动作要避免，或执行前要先向用户确认。

官方同时建议从想要的结果开始，而不是机械列出所有步骤；只有当过程本身重要时才详细指定过程。对 Codex，实用请求还应说明期望行为、相关代码或复现步骤、重要约束以及如何验证变更。

**适用范围**：这是 OpenAI 对 ChatGPT Work、Codex 及一般 prompting 的公开指导；它是任务协议建议，不是某个 API 请求 schema，也不保证模型始终遵守用户未明确写出的隐含约束。

### 2.2 计划、跟进与任务内控制

官方页面说明：

- 需要先调查并提出方法再编辑时，可在 app composer 使用 `/plan`；当 Goal mode 可用时，可在计划后使用 `/goal` 设置持久目标。
- Codex 正在工作时，**Steer** 将消息加入当前运行，用于改变方向、补充信息或缺失细节；**Queue** 将消息留给下一次运行。
- ChatGPT desktop app 可在设置中选择默认 follow-up behavior；Codex CLI 中，Codex 工作时按 Enter steer 当前 turn，按 Tab queue 到下一 turn。

**事实边界**：这些命令、快捷键和 Goal mode 属于易变的产品界面/版本事实；页面没有证明它们在每个客户端、旧版本或所有账号计划中都存在。

## 3. 上下文：什么会被提供，什么仍需明确指定

### 3.1 相关上下文优先

官方建议只提供会改变结果的信息，并说明每个来源应被如何使用。可加入文档、表格、演示文稿、PDF、截图、图表、项目文件、连接的来源和插件；若答案依赖当前信息，应请求 web search，并在需要核查时要求来源。

上下文不是“越多越好”的官方承诺。页面要求把相关来源、日期范围、受众和输出格式说清楚，并在重要工作中要求标记冲突、缺失或无法验证的信息。

### 3.2 不同 Codex 表面的上下文差异

- **IDE extension**：官方 Prompting 页面说明，打开的文件会自动作为上下文；选择相关文件仍是推荐做法。
- **CLI**：应显式说明路径，或使用 `/mention` 与 `@` 路径补全附加文件；上下文笔记不能替代用户明确指出的文件范围。
- **desktop app**：选择 chat、project 或 folder 后，ChatGPT 可以使用所选位置的文件和上下文。
- **Codex cloud**：提交任务时，云端创建容器，并按所选 branch 或 commit SHA checkout 仓库；如果仓库有 `AGENTS.md`，agent 会使用其中的项目 lint/test 命令。

**适用范围**：以上是各页面对特定产品表面的说明，不能合并为“所有 Codex 入口自动看到同样的文件、历史、环境变量或连接器”。

## 4. 权限、sandbox 与审批

### 4.1 两层控制模型

官方安全页面明确区分两层：

- **Sandbox mode**：执行模型生成命令时，技术上允许做什么，例如能写到哪里、是否能访问网络。
- **Approval policy**：何时必须在执行前停下并向用户请求批准，例如离开 sandbox、使用网络或运行不在可信集合内的命令。

默认安全说明是：agent 默认关闭网络访问；本地 Codex 使用操作系统强制的 sandbox，通常限制在当前 workspace；本地默认写权限限制在 active workspace。Codex CLI/IDE 的具体 sandbox、approval policy 和 network setting 可以按风险配置。

### 4.2 本地 permission profiles

当前 Permissions 页面标注为 **Beta**，并说明 permission profiles 正在积极开发，可能变化。页面列出三个内置 profile：

- `:read-only`：本地命令执行保持只读；
- `:workspace`：允许 active workspace roots 和系统临时目录内写入；
- `:danger-full-access`：移除本地 sandbox 限制，只应在明确需要广泛访问时使用。

Profiles 将文件系统规则与网络规则组合为最小权限边界。企业管理员可以通过 managed `requirements.toml` 限制用户可选 profile；当 `allowed_permission_profiles` 存在时，未列出的 profile（包括未来新增的内置 profile）会被拒绝。

旧的 `sandbox_mode` / `sandbox_workspace_write` 配置与 permission profiles 不应混用；页面说明如果加载的配置、命令行参数或 profile 设置中出现旧 sandbox 设置，Codex 会按旧设置处理。混合版本企业部署可暂时保留旧的兼容约束，直到客户端达到文档所述版本门槛。

### 4.3 需要批准的动作

官方安全页面给出的当前例子包括：

- workspace 外的文件编辑；
- 需要网络访问的命令；
- 具有副作用的 app/connector 工具调用；
- 工具标注为 destructive 的 app/MCP 调用，即使同时存在只读提示，也始终需要批准。

如果只想聊天或计划而不修改文件，可用 `/permissions` 切换只读模式。是否实际弹出批准、批准由用户还是自动审查者处理，还取决于当前 approval policy、客户端和组织配置。

### 4.4 本地与云端不是同一安全边界

- 本地 CLI/IDE：依靠本机操作系统机制执行 sandbox policy。
- Codex cloud：运行在隔离的 OpenAI 管理容器中，不能访问宿主机或无关数据；setup 阶段可联网安装依赖，agent 阶段默认离线，除非环境开启网络；云端 secret 只在 setup 阶段可用，进入 agent 阶段前会移除。

因此，“本地 workspace-write”与“云端隔离容器”是不同适用范围，不能把一个表面的权限结论迁移到另一个表面。

## 5. 工具、技能、插件与协议调用

### 5.1 能力层级

官方 Skills & Plugins 页面定义：

- **Skill** 是针对任务/工作流的可复用指导，可包含名称和描述、流程指令、模板、示例、品牌指南、schema 或连接工具。
- **Plugin** 是可安装的 bundle，可包含 skills、connectors 或两者；connector 由 MCP server 支撑，也可以包含自定义 ChatGPT UI。
- Skill 适用于固定方法；plugin 适用于把指导与外部服务连接打包。

官方页面还说明 ChatGPT 与 Codex 共用一个 universal plugin directory；Codex 可以用 `$` 显式选择 skill。插件、连接器的可用性仍取决于安装状态、surface、账号/工作区设置和服务授权。

### 5.2 工具调用的批准与网络边界

工具调用不是“只要安装就可以无条件执行”。官方安全页面明确指出，具有副作用的 app/connector tool call 可以触发批准；标注 destructive 的 app/MCP 调用要求批准。网络访问也有独立边界：默认关闭，开启后还可以使用按域名的 network proxy 策略；deny 优先于 allow，本地/private destination 默认阻断。

Codex CLI 页面列出的工具/扩展入口包括：`--search` 进行 live web search、`codex mcp` 连接外部 MCP server、skills/plugins，以及 `codex cloud` 把工作交给云端。它们是 CLI 的当前文档能力，不意味着每个 Codex 表面具有相同命令或相同网络权限。

### 5.3 App Server 的可观察调用协议

官方 Codex App Server 页面说明：app-server 供 rich clients 使用，提供认证、会话历史、审批和 streamed agent events；其协议类似 MCP，使用双向 JSON-RPC 2.0（线上省略 `jsonrpc: "2.0"` header）。核心生命周期是：initialize → initialized → start/resume thread → start turn → 读取工具/agent 事件 → turn completed。

该页面还列出 thread、turn、item 三个核心抽象：thread 是用户与 Codex agent 的对话，turn 是一次用户请求及其后续工作，item 是输入/输出、命令运行、文件变更、工具调用等单元。WebSocket transport 标注为 experimental and unsupported；非 loopback listener 默认可能允许未认证连接，远程暴露前必须配置认证。

**适用范围**：App Server 协议事实只适用于 app-server 集成，不是对聊天 UI、CLI 交互或云端内部实现的通用 wire protocol 保证。

## 6. 验证与证据

### 6.1 官方要求的验证方向

Prompting 页面建议重要工作在结束前做 final check，例如确认每个 action item 有 owner 和 due date，或标记无法验证的信息；之后仍要由用户在使用或分享前复核结果。Codex 的任务提示应明确“如何验证变更”，而不是只说“完成后告诉我”。

官方 Codex cloud 页面把结果复核描述为：查看 summary 和 diff，要求 follow-up changes，准备好后再 open a pull request。Cloud environments 页面进一步说，agent 会循环执行终端命令、编辑代码、运行 checks 并尝试验证工作；完成时显示 answer 和发生变更的文件 diff。

CLI 页面说明 `/review` 可以针对未提交变更、commit 或 base branch 做专门审查，报告有优先级的 findings，且不修改 working tree。这提供了可复查的审查证据，但页面没有承诺 `/review` 能发现所有问题。

### 6.2 “已运行”不等于“已证明正确”

从官方页面可以确认的是产品建议和显示机制：命令、checks、diff、审查 findings、summary 和 PR 入口。页面不能替代本次任务的实际运行证据，也没有给出所有仓库通用的通过标准。因此本章把以下内容分开：

- 文档声称 Codex 会尝试运行 checks/验证；
- 某一次具体任务是否确实运行了命令；
- 命令是否覆盖了边界情况、安全风险、真实部署和用户验收。

只有后两类有任务级日志、命令输出、测试结果、diff、截图或用户验收记录时，才能在项目中称为已验证。

## 7. 交付：从结果到可审阅工作物

官方 Prompting 页面要求把输出格式、受众和使用方式说清楚，并建议重要结果在使用/分享前复核。Codex cloud 的交付表面是 answer、summary、diff、后续修改和 PR；CLI 的交付表面可以是工作区变更、命令输出、review findings 或 `codex exec` 的可重复流程；SDK 则可在服务端启动、继续和恢复本地 Codex threads，用于 CI/CD、内部工具和应用集成。

交付协议可归纳为：

1. 说明结果应服务谁、采用什么格式；
2. 保留来源、约束、差异和未验证项；
3. 提供可检查的文件、diff、测试/命令结果或 review；
4. 在发送、发布、合并或影响他人之前保留必要的人工复核/审批；
5. 只有当结果已达到任务验收标准时，才进入 PR、发布或其他外部交付。

这条闭环是本项目的学习方法抽象；官方页面支持它作为工作建议，但没有承诺任何模型输出天然达到 production-ready。

## 8. 易变事实登记

| ID | 官方所有者 | 适用范围 | 第一方 URL | 访问日期 | 易变事实 | 本章使用状态/下次复核 |
|---|---|---|---|---|---|---|
| O01 | OpenAI / ChatGPT Learn | ChatGPT、ChatGPT Work、Codex prompting | https://learn.chatgpt.com/docs/prompting | 2026-08-10 | Goal/Context/Output/Boundaries；`/plan`、`/goal`；Steer/Queue；CLI Enter/Tab | 已核对；产品命令与快捷键变更时复核 |
| O02 | OpenAI / ChatGPT Learn | Codex 本地 permission profiles | https://learn.chatgpt.com/docs/permissions | 2026-08-10 | Beta 标记；三种内置 profile；与旧 sandbox 配置的优先关系 | 已核对；每次客户端/企业版本升级复核 |
| O03 | OpenAI / ChatGPT Learn | Codex CLI、IDE、desktop app、cloud 的安全控制 | https://learn.chatgpt.com/docs/agent-approvals-security | 2026-08-10 | 默认网络关闭；sandbox 与 approval policy 分层；副作用工具调用审批；本地/云端边界 | 已核对；权限、网络和审批默认值变化时复核 |
| O04 | OpenAI / ChatGPT Learn | ChatGPT 与 Codex 的 skills/plugins | https://learn.chatgpt.com/docs/skills-and-plugins | 2026-08-10 | skill/plugin 定义、`$` skill invocation、universal plugin directory | 已核对；目录、语法和工作区控制变化时复核 |
| O05 | OpenAI / ChatGPT Learn | Codex CLI | https://learn.chatgpt.com/docs/codex/cli | 2026-08-10 | CLI 安装、版本展示、`/review`、`codex exec`、`--search`、MCP/cloud 入口 | 已核对；CLI 版本与命令变化时复核 |
| O06 | OpenAI / ChatGPT Learn | Codex cloud 任务与交付 | https://learn.chatgpt.com/docs/cloud | 2026-08-10 | 隔离环境、并行任务、GitHub/Linear/Slack 入口、summary/diff/PR 流程 | 已核对；云端入口、集成和计划限制变化时复核 |
| O07 | OpenAI / ChatGPT Learn | Codex cloud environment | https://learn.chatgpt.com/docs/environments/cloud-environment | 2026-08-10 | branch/SHA checkout、setup/maintenance、secret 生命周期、缓存最长 12 小时、agent 网络默认关闭 | 已核对；环境运行时和缓存策略变化时复核 |
| O08 | OpenAI / ChatGPT Learn | Codex SDK 集成 | https://learn.chatgpt.com/docs/codex-sdk | 2026-08-10 | TypeScript/Python SDK、线程 start/run/resume、SDK beta 与运行时版本要求 | 已核对；SDK 发布状态、API 和版本变化时复核 |
| O09 | OpenAI / ChatGPT Learn | Codex app-server 集成 | https://learn.chatgpt.com/docs/app-server | 2026-08-10 | JSON-RPC/JSONL、thread/turn/item 生命周期、审批与事件、实验性 WebSocket | 已核对；协议 schema 与 experimental 标记变化时复核 |

## 9. 未证实项与不可外推项

以下事项没有被本次官方公开页面直接证实，因此不写成当前事实：

- 本机当前 Codex 客户端的真实版本、加载了哪些 `AGENTS.md`、skill、plugin、MCP server 或权限配置；
- 某个账号、工作区或企业计划实际拥有的模型、云端、连接器、插件、网络 allowlist 或自动审批能力；
- 某一次任务是否真正读取了指定文件、调用了指定工具、运行了指定命令，或是否在 sandbox 外产生了副作用；
- `AGENTS.md` 中的项目命令在所有 Codex surface 都以相同优先级、相同目录范围或相同版本规则生效；云环境页面只直接说明 cloud agent 使用它来查找项目 lint/test 命令；
- `/review`、测试、diff 或 PR 的存在本身足以证明功能正确、安全、部署成功或用户满意；
- app-server experimental WebSocket 未来是否转为稳定、默认认证策略是否改变；
- 页面中的版本号、模型名、快捷键、安装方式、缓存时长、路径和配置键是否在未来版本继续有效。

## 10. 来源与许可边界

本研究仅使用 OpenAI/ChatGPT Learn 的公开第一方页面，所有结论均为中文原创归纳并附原始 URL；没有复制页面长段落、图片、品牌素材或代码样例。页面的具体内容许可条款未在本次研究中单独确认，因此本文件只作为带来源的研究记录和事实基线，不把官方页面内容重新打包成外部资产。官方页面当前导航把 Codex 文档入口指向 `https://learn.chatgpt.com/docs`；访问旧的 `https://developers.openai.com/docs/...` 路径时出现 Page not found，不能据此推断旧路径正文仍然有效。

## 11. 研究与验收记录

- 研究者：Prysai。
- 证据方法：浏览官方页面正文、标题、当前 URL 与页面导航；按页面直接陈述区分事实、适用范围和未证实项。
- 未执行：未登录外部服务，未运行 Codex 任务，未调用本项目工具，未执行 Git 命令，未创建 PR，未验证本机权限/审批/网络/云环境运行时。
- 文件范围：本次只新增本文件；未修改项目其他文件。
- 验收清单：
  - [x] 记录研究问题、访问日期、官方所有者和适用范围。
  - [x] 覆盖任务协议、上下文、权限/审批、工具调用、验证和交付。
  - [x] 为易变事实提供第一方 URL 和复核提示。
  - [x] 单列未证实项，未把文档描述冒充运行时证据。
  - [x] 记录来源与许可边界。
  - [x] 未执行 Git 操作。
