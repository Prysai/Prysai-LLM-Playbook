# 官方事实缺口审查：第 1–7、13 章

**审查日期：** 2026-08-10
**审查范围：** `CONTEXT.md`、`docs/charter.md`、`docs/book-architecture.md`、第 1–7 章和第 13 章。
**来源范围：** OpenAI 官方 Codex/ChatGPT 文档，以及 OpenAI 官方 Codex GitHub 仓库。
**正文状态：** 本文件只记录事实缺口和建议落点；没有修改任何章节正文。
**证据状态：** 下列“官方事实”是截至访问日期从官方页面核对到的产品说明；它们不证明本仓库当前账户、workspace 或本机运行时已经具备对应能力。

## 结论摘要

当前章节的稳定方法基本成立，主要问题是若干产品事实没有被压缩成读者在选择入口、模型、Skill 或权限时必须执行的判断门。最需要补的是：把“能做什么”拆成技术边界与批准机制，把 Cloud 和本地工作面分开，把模型可用性作为选择前置条件，并把 Skill/Plugin 的调用生命周期写成可观察步骤。

## F-01：第 4 章把运行/联网写在同一个权限字段里，缺少 Sandbox 与 Approval 的双层判断

**具体位置：** `book/chapters/04-context-permissions-and-agent.md` 的决策卡（约第 96–114 行），尤其是 `允许运行/联网` 单字段；关联 `book/chapters/13-action-boundaries.md` 第 35–46 行。

**缺口及决策影响：** 当前卡片能提醒学习者声明动作，但没有要求分别记录“技术上允许做什么”和“什么时候必须先请求批准”。学习者可能把批准策略理解成扩大沙盒，也可能把工具能运行理解成任务已经获准。这样会错误地把网络、工作区外写入、连接器写操作或持久环境改变当作同一种“权限”。

**官方事实：** OpenAI 将 sandbox mode 与 approval policy 定义为不同控制层：sandbox 决定命令在技术上能触及的文件、网络和环境范围；approval policy 决定哪些动作必须在执行前停下来请求批准。官方还把 app/connector 的副作用调用纳入审批边界。

**原始来源：**

- https://learn.chatgpt.com/docs/agent-approvals-security.md
- https://learn.chatgpt.com/docs/permission-modes.md

**访问日期：** 2026-08-10。

**适用范围：** 官方文档描述的 Codex Cloud、ChatGPT desktop app、Codex CLI 和 IDE extension；实际默认值仍可能受工作面、配置和组织策略影响。

**建议落点：** 第 4 章决策卡拆成 `sandbox_mode`、`approval_policy`、`network_access`、`allowed_roots` 和 `side_effect_confirmation`；第 13 章的行动矩阵增加“技术可行性”和“事前批准”两列。保留项目自己的 R0–R3 风险分级，但明确它不是产品配置名，也不授予权限。

**状态：** `official_fact`；本仓库当前运行时状态仍为 `unconfirmed`。

## F-02：第 5 章的工作面分类过于抽象，未对齐当前 Local / Worktree / Cloud 选择

**具体位置：** `book/chapters/05-choose-the-codex-surface.md` 第 28–36 行，特别是 `Remote 或对应远程工作面`；关联第 52–54 行关于本地与云端的概括。

**缺口及决策影响：** 章节把“本地、CLI、IDE、Cloud、Remote”并列成任务选择项，但读者缺少一个当前产品可执行的首要问题：任务是在当前目录、隔离的 Git worktree，还是隔离的 Cloud 环境运行。若把 Cloud 仅理解为“更远的工作面”，就会忽略它的环境配置、GitHub 连接、隔离目录和结果审查流程；若把 Remote 当作稳定产品入口，又可能找不到对应设置或错误迁移权限判断。

**官方事实：** OpenAI 当前环境文档把 Codex chat 的运行位置分为 Local、Worktree 和 Cloud：Local 直接使用当前项目目录，Worktree 用 Git worktree 隔离变更，Cloud 在已配置的云环境中运行。官方 Codex CLI 文档另把 CLI 定位为终端中的本地仓库、命令和可重复工作流；IDE 文档强调编辑器上下文与旁边的 diff 审查。

**原始来源：**

- https://learn.chatgpt.com/docs/environments/modes.md
- https://learn.chatgpt.com/docs/codex/cli.md
- https://learn.chatgpt.com/docs/codex/ide.md
- https://github.com/openai/codex/blob/main/README.md

**访问日期：** 2026-08-10。

**适用范围：** Local、Worktree、Cloud 是官方环境文档描述的 Codex chat 运行模式；CLI、IDE 和桌面应用的选择器、账户资格及当前 UI 需分别核对。OpenAI 官方仓库 README 只支持 CLI 入门和 Git checkpoint 的教学边界，不替代产品资格说明。

**建议落点：** 第 5 章先增加“运行位置”决策：`Local / Worktree / Cloud`，再把 CLI、IDE、桌面应用作为入口；将 `Remote` 改为待核实的泛称或移入易变事实表。每种模式补充输入来源、隔离方式、Git 交付、网络/秘密配置和结果审查位置。

**状态：** `official_fact`；当前账户和仓库是否已连接 Cloud 仍为 `unconfirmed`。

## F-03：第 5–6 章没有把模型的工作面可用性作为选择前置条件

**具体位置：** `book/chapters/06-model-selection.md` 第 73–90 行；关联 `book/chapters/05-choose-the-codex-surface.md` 第 28–36 行。

**缺口及决策影响：** 第 6 章允许学习者把 Luna 作为待验证模型假设，但选择流程没有先要求检查“候选模型是否在当前工作面可用”。当前官方模型页对 Cloud 与本地工作面的可用性并不一致；因此读者可能完成了模型卡，却选了当前 Cloud 不支持的候选，随后把不可用误判为模型质量、账户故障或评测失败。

**官方事实：** 官方 Models 页面当前列出 Sol、Terra 和 Luna，并按工作面列出可用性；页面显示 Sol 可用于 Cloud，而 Terra 和 Luna 的 Cloud 栏不可用。官方还说明本地 desktop、CLI 和 IDE 使用共享的 `config.toml` 默认模型设置，但 Cloud chat 不能更改默认模型。

**原始来源：**

- https://learn.chatgpt.com/docs/models.md

**访问日期：** 2026-08-10。

**适用范围：** 官方 Models 页面当前列出的产品工作面矩阵；账户、workspace、组织策略、区域和后续 rollout 可能改变实际可见性。官方“快速、低成本、旗舰”等是产品定位，不是本项目的性能或性价比测量。

**建议落点：** 第 6 章模型卡新增 `surface_available`、`availability_evidence` 和 `not_available_reason`；选择顺序改为“先锁定工作面 → 核对候选可用性 → 再比较质量/成本/延迟”。第 5 章 Cloud 选择表注明 Cloud 的默认模型限制，并要求不可用候选直接标为 `not_comparable`，不得进入质量比较。

**状态：** 工作面矩阵为 `official_fact`；本仓库尚未运行模型评测，项目性价比结论仍为 `not_run`。

## F-04：第 5 章和第 7 章没有把 Cloud 的 setup/agent 两阶段边界讲成行动规则

**具体位置：** `book/chapters/05-choose-the-codex-surface.md` 第 50–54 行；`book/chapters/07-skills-plugins-and-tools.md` 第 103–117 行的外部连接实验。

**缺口及决策影响：** 章节提醒读者核对 Cloud 的环境、网络、凭据和证据，但没有告诉读者这些条件在 Cloud 生命周期中并不同时成立。读者可能把 setup 阶段能安装依赖或使用 secrets，误认为 agent 阶段也能联网或继续读取同一 secrets；也可能把 Cloud 环境配置成功误认为任务阶段已具备外部访问。

**官方事实：** 官方安全文档描述 Cloud 使用隔离容器，并区分 setup 阶段与 agent 阶段：setup 可为指定依赖联网安装，agent 阶段默认离线，除非为该环境启用互联网访问；为 Cloud 环境配置的 secrets 只在 setup 阶段可用，进入 agent 阶段前会被移除。

**原始来源：**

- https://learn.chatgpt.com/docs/agent-approvals-security.md
- https://learn.chatgpt.com/docs/cloud.md

**访问日期：** 2026-08-10。

**适用范围：** 官方描述的 Codex Cloud 环境运行模型；具体环境的依赖、网络开关、组织策略和 secrets 配置需要在当前 Cloud 环境中核验。

**建议落点：** 第 5 章 Cloud 表新增 `setup action`、`agent action`、`network phase`、`secret lifetime` 和 `result review`；第 7 章外部连接实验要求分别记录 setup 证据和 agent 运行证据，并把“setup 可安装”与“agent 已成功调用”分开。

**状态：** `official_fact`；当前项目没有 Cloud 运行日志，不能写成已验证。

## F-05：第 7 章已有安装链，但缺少当前 Skills 的显式调用语法和新会话条件

**具体位置：** `book/chapters/07-skills-plugins-and-tools.md` 第 55–62 行、第 64–75 行；关联 `book/chapters/01-gpt-and-codex.md` 第 84–96 行。

**缺口及决策影响：** 章节把 Skill 状态写成“安装 → 新会话 → 可见 → 调用”，但没有让初学者知道当前官方支持的显式入口，也没有把“自动匹配”和“显式选择”区分成两个可验证分支。读者可能只在目录中看到 Skill 就声称它已触发，或在错误工作面使用了另一套调用语法。

**官方事实：** 官方 Skills & Plugins 文档说明，ChatGPT/Codex 可以在任务匹配时选择 Skill，也可以显式选择；ChatGPT 使用 `@` 提及，Codex 使用 `$` 提及。官方 Plugins 文档还说明，安装后通常需要新建 chat 或 CLI session，connector 的认证可能发生在安装时或首次使用时。

**原始来源：**

- https://learn.chatgpt.com/docs/skills-and-plugins.md
- https://learn.chatgpt.com/docs/plugins.md

**访问日期：** 2026-08-10。

**适用范围：** 官方 Skills/Plugins 文档描述的 ChatGPT 和 Codex 调用模型；具体 Skill 是否已启用、是否被发现、是否有依赖权限，仍需在对应工作面中验证。

**建议落点：** 第 7 章将验证链拆成两条：`自动匹配证据` 与 `显式 $skill 调用证据`；在实验记录中加入工作面、会话是否新建、实际调用字符串、加载资源、行为输出和结果验证。第 1 章的 Skill 比喻补一句：调用语法和可用性属于产品事实，不属于 Skill 本身的权限。

**状态：** `official_fact`；本仓库现有 Skill 的运行时触发和加载仍为 `not_observed`。

## 最值得马上落地的两项

1. **先修第 4 章的权限卡：** 把 `sandbox_mode`、`approval_policy`、网络和外部工具副作用拆开。这一项直接减少“能执行 = 获授权”和“批准 = 扩大沙盒”两类高风险误判，并能同时服务第 13 章。

2. **再修第 5–6 章的入口/模型选择门：** 先选 `Local / Worktree / Cloud`，再核对模型在该工作面是否可用，并记录 Cloud 的 setup/agent 边界。否则学习者会在错误工作面上比较模型，或者把环境阶段的成功当成任务阶段的成功。

## 来源与证据边界

- 本记录只保留原创总结和决策建议，没有复制官方页面的段落、代码或图片。
- 官方产品页面证明的是产品文档所述的支持面和运行模型，不证明本仓库当前账户、组织、机器或 session 已具备对应能力。
- 当前项目的模型性能、性价比、Skill 触发成功、Plugin 安装成功、MCP 认证成功和 Cloud 任务完成均没有在本次审查中运行验证；这些结论应保持 `not_run`、`unconfirmed` 或项目自己的 `candidate` 状态。
- 官方事实属于易变事实，下一次复核应重新检查模型工作面矩阵、Cloud 生命周期、Skills/Plugins 调用语法、权限默认值和当前入口。
