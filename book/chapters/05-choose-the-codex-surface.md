# 第五章：选择正确的 Codex 工作面

**本章状态：** `candidate`。本章的决策卡已具备可执行结构，但尚未完成独立学习者前测；其中的账户、模型、工具和 Cloud 可用性不得写成已验证。

## 本章要解决的问题

同一个目标可以从桌面应用、CLI、IDE 扩展或 Cloud 开始。很多初学者把“我能打开哪个入口”误认为“这个任务应该在哪里运行”，又把“已登录”“模型可选”或“setup 成功”误认为整条任务链已经可用。结果可能是目标文件读不到、必要工具不能调用，或 Cloud 的环境准备成功却在 agent 阶段失败。

本章先回答运行位置，再回答入口和模型：先在 `Local / Worktree / Cloud` 中选择工作面（surface），再检查目标入口、模型、资源和工具在该工作面是否实际可用。

## 学习目标

读者完成本章后应当能够：

- 按上下文、隔离、行动、风险和证据选择 `Local / Worktree / Cloud`；
- 把运行位置与桌面应用、CLI、IDE 等入口分开判断；
- 在选定工作面后，核对模型、目标资源和必要工具的实际可用性；
- 区分 Cloud 的 setup 阶段和 agent 阶段，并分别保留证据；
- 交付一份可由第三方复核和否决的 `surface-decision.md`。

## 现实问题入口

FP-01 至 FP-05 和 FP-12 覆盖 OAuth 回调、token exchange、Enterprise host、多个组织、updater 凭据和手机验证等现实断点。它们不是产品说明书；具体版本和 workaround 需要重新核对。入口：[Codex 真实用户问题现场研究](../../docs/research/field-problems-codex.md)。

## 一、概念：工作面、入口和可用性不是一回事

### 1. 先分清运行位置与入口

工作面回答“任务在哪里运行、修改落在哪里”；入口回答“人从哪里发起和审查任务”。截至 2026-08-10，官方环境文档把 Codex chat 的运行位置分为：

| 工作面 | 任务位置与输入 | 隔离与 Git 交付 | 网络、秘密与审查重点 |
|---|---|---|---|
| `Local` | 直接使用当前项目目录和其中的实际文件 | 不额外隔离当前未提交改动；交付通常是本地文件、diff 和验证记录 | 以当前本地沙盒、网络和权限配置为准；在本地查看 diff、命令与运行结果 |
| `Worktree` | 在本机的 Git worktree 中使用仓库快照 | 通过独立 worktree 隔离变更；仍需确认起始分支、未跟踪输入和最终 Git 交付方式 | 仍属于本机运行；网络、工具与凭据不能仅凭“已隔离”推断；在对应 worktree 审查 diff 和验证记录 |
| `Cloud` | 在已配置的云环境中检出所选仓库与分支或 commit | 在隔离容器中运行；完成后审查 summary 和 diff，再决定是否跟进或打开 PR | setup 与 agent 是不同阶段；分别核对依赖、网络、秘密生命周期、任务日志和结果 diff |

桌面应用、CLI 和 IDE 是入口或交互方式，不应与上表并列成同一层选择。比如，CLI 强调本地仓库、命令和可重复工作流；IDE 强调编辑器上下文与就近 diff 审查。先选 `Local / Worktree / Cloud`，再在该工作面支持的入口中选择最便于执行和审查的一种。

### 2. 产品支持、账户授权与本次可用是三层证据

一个能力只有在当前任务链上逐段通过，才算本次可用：

```text
产品文档支持
→ 当前账户 / workspace / 组织允许
→ 目标资源可读
→ 候选模型在该工作面实际可选
→ 必要工具实际可调用
→ 具体动作完成
→ 结果得到验证
```

上游通过不能替代下游证据。登录成功只证明身份阶段的一个结果；模型出现在选择器中只证明模型选择阶段；它们都不证明目标仓库可读、终端可用或任务结果成立。

### 3. Cloud 的 setup 与 agent 是两个阶段

官方 Cloud 环境文档说明：setup 脚本可联网安装依赖；进入 agent 阶段后，网络默认关闭，除非为该环境另行启用。环境变量可贯穿任务，而 secrets 只在 setup 脚本中可用，并在 agent 阶段前移除。

因此必须分开记录：

```text
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
```

“setup 已安装依赖”不能推出“agent 已联网调用服务”；“secret 在 setup 可读”也不能推出 agent 阶段仍可读取它。

## 二、决策：先选工作面，再检查模型和入口

### 1. 用五道门排除不合适的工作面

按下面顺序判断：

1. **上下文门：** 目标文件、版本、项目规则和必要数据是否能在该工作面读取？
2. **隔离与数据门：** 是否需要保护当前目录中的未提交改动，或限制数据离开本机、组织和受控环境？
3. **动作门：** 任务只读、改本地、改隔离分支，还是需要外部服务？该工作面是否支持必要动作而没有扩大无关权限？
4. **证据门：** 能否取得与断言对应的 diff、命令结果、日志、页面或人工确认？
5. **恢复门：** 认证失败、网络中断、依赖缺失或部分修改后，能否保留现场并从 checkpoint 继续？

先根据这五道门选出候选工作面，然后再检查入口和模型。不要为了使用某个模型而倒推工作面，也不要为了沿用习惯入口而补开不必要的权限。

### 2. 交付 Local / Worktree / Cloud 决策卡

为同一任务分别填写三张卡，并合并为 `surface-decision.md`。即使某工作面不可用，也要保留被否决卡和证据，不能只写最终选择。

```text
task_id：
task_goal：
surface：Local | Worktree | Cloud
entry：desktop | CLI | IDE | web | other
decision：selected | rejected | blocked | not_observed

required_context：
context_readable：yes | no | not_observed
context_evidence：
data_boundary：
allowed_side_effects：
isolation_and_git_delivery：

account_authorized：yes | no | not_observed
authorization_evidence：
target_resource_readable：yes | no | not_observed
resource_read_evidence：

model_id：
surface_available：yes | no | not_observed
availability_evidence：
required_tools：
tools_available：yes | no | not_observed
tool_evidence：

setup_action：not_applicable | 具体动作
setup_evidence：
agent_action：not_applicable | 具体动作
agent_evidence：
network_phase：local_policy | setup | agent | not_observed
secret_lifetime：none | setup_only | full_task_env | not_observed
result_review：

recovery_path：
rejection_or_block_reason：
checked_at：
reviewer：
```

决策规则：

- `target_resource_readable != yes` 时，不得把登录成功写成该工作面可用；
- `surface_available != yes` 时，候选模型不得进入质量比较；
- `tools_available != yes` 时，不能用模型可选替代工具证据；
- Cloud 的 setup 与 agent 任一关键阶段缺证据时，只能声明已观察阶段，不能声明任务完成；
- 没有运行条件时使用 `not_observed`，不要猜成 `yes` 或 `no`。

## 三、行动：低风险实验——同一任务的工作面决策

**实验状态：** `not_run`。以下是可执行协议，不是本仓库已经完成的运行记录。

### Setup

准备一份脱敏的 Markdown 发布说明、约束清单和一个没有 remote 的临时 Git 仓库。目标只是在本地形成草稿和检查结果；不发布、不推送、不连接新账户、不上传数据，也不写入生产环境。

固定以下输入：

- 同一份发布说明和验收标准；
- 必须读取的两个输入文件和只允许修改的一个输出文件；
- 一个只读格式检查命令；
- 一张模拟的“浏览器登录成功但目标仓库不可读”状态卡；
- 一张模拟的“模型可选但终端工具不可用”状态卡；
- 一张模拟的“Cloud setup 安装成功但 agent 网络关闭”状态卡。

### Task

1. 不运行任务，先分别填写 `Local / Worktree / Cloud` 三张决策卡。
2. 对每张卡先检查上下文、隔离、动作、证据和恢复五道门。
3. 选出候选工作面后，再检查入口、`surface_available`、目标资源和必要工具。
4. 只在一张满足最小条件的卡上执行草稿与只读检查；其余卡明确写 `rejected`、`blocked` 或 `not_observed`。
5. 保存实际 diff 或“未执行”的原因，不补开权限来让三张卡都通过。

### 最小交付物

```text
surface-decision.md
├─ 固定任务与验收标准
├─ Local 决策卡
├─ Worktree 决策卡
├─ Cloud 决策卡
├─ 被否决工作面的原因表
├─ 认证 / 资源 / 模型 / 工具 / Cloud 阶段证据索引
└─ 最终选择、恢复路径与限制说明
```

## 四、证据：什么才算决策成立

### Evidence

证据表至少包含：

```text
run_id | surface | entry | account_authorized | target_resource_readable
| model_id | surface_available | availability_evidence
| tools_available | setup_status | agent_status | decision | evidence
```

验收时逐项检查：

- 三张卡使用相同任务、输入和验收标准；
- 目标文件读取证据与“登录成功”证据分开；
- 模型可见性与工具调用证据分开；
- Cloud 的 setup 日志、agent 日志、网络阶段和结果 diff 分开；
- 最终工作面有实际 diff 与检查输出，或有可审查的 `blocked` 证据；
- 第三方只看 `surface-decision.md` 就能解释为何选择或否决每个工作面。

证据只支持对应范围。例如，setup 日志只支持环境准备；格式检查通过只支持该检查；没有运行 Cloud 就必须保留 `not_observed`。

## 五、失败：三种必须识别的变体

| 失败变体 | 已通过 | 未通过 | 正确状态与处理 |
|---|---|---|---|
| 登录成功但资源不可读 | 身份验证 | 目标 host、组织或仓库读取 | `blocked`；保留登录与读取失败两段证据，不能继续声称该工作面可用 |
| 模型可选但工具不可用 | `surface_available = yes` | 终端、文件、浏览器或目标 connector 调用 | `rejected` 或 `blocked`；记录 `tool_evidence`，不要把失败归为模型质量 |
| Cloud setup 成功但 agent 阶段失败 | 依赖安装或 setup 网络 | agent 网络、秘密读取、任务动作或结果验证 | setup 标 `passed`，agent 标 `failed / not_observed`；任务状态仍是 `blocked`，不得写“Cloud 任务完成” |

认证链路仍应逐段记录：

```text
入口打开 → 身份验证 → 凭据 / 会话交换 → 目标 host / 组织
→ 目标资源读取 → 模型可用 → 工具可用 → 具体动作 → 结果验证
```

每段使用 `passed / failed / not_observed`，并附时间、入口、目标和证据位置。若连续失败，停止扩权，先判断是工作面不合适、账户边界不满足，还是运行条件尚未建立。

## 六、反思与迁移

复盘时回答：

- 哪一道门真正改变了最终选择？
- 哪个“上游成功”最容易被误写成整条链路成功？
- 被否决的工作面缺的是产品支持、账户授权、资源、模型、工具，还是阶段证据？
- 下一次只改变哪个条件，才能判断阻塞原因而不扩大权限？

迁移到一个需要浏览器查官方来源、终端生成本地证据、远程环境隔离客户数据的研究任务。重新填写三张工作面卡，改写数据边界与最小证据；不要复制本次工程任务的入口结论。

## 迁移练习

把本章决策卡迁移到一个“浏览器核对官方事实、终端生成本地证据、隔离环境处理脱敏数据”的研究任务。保持 `surface`、入口、模型和工具字段分开，重新定义数据边界、阶段证据和恢复路径；不要把本章工程任务的入口结论直接复制过去。

## 本章证据

交付 `surface-decision.md`、三张工作面卡、被否决原因表、认证/资源/模型/工具/Cloud 阶段证据索引，以及最终 diff 或明确的 `blocked` 记录。没有运行 Cloud 时，Cloud 卡必须保留 `not_observed`，不能用官方文档代替运行日志。

## 易变事实与官方来源

| 事实 | 官方来源 | 访问日期 | 适用范围 | 负责人 / 下次复核 |
|---|---|---|---|---|
| Codex chat 的运行位置包括 Local、Worktree 和 Cloud；Local 与 Worktree 在本机运行 | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-10 | 官方环境选择；具体账户、入口和 UI 需当前核验 | `facts-maintainer` / 2026-09-10 |
| Cloud 任务包含 setup 与 agent 阶段，最终通过 summary 和 diff 审查 | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-10 | 官方 Cloud 环境生命周期；不证明本仓库已创建环境或运行任务 | `facts-maintainer` / 2026-09-10 |
| setup 可联网；agent 网络默认关闭但可配置；secrets 在 agent 阶段前移除 | https://learn.chatgpt.com/docs/environments/cloud-environment.md 和 https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-10 | 官方 Cloud 配置；实际网络、allowlist、组织策略和 secrets 需逐环境核验 | `facts-maintainer` / 2026-09-10 |
| 模型工作面支持不同，Cloud chat 当前不能更改默认模型 | https://learn.chatgpt.com/docs/models.md | 2026-08-10 | 官方模型页当前矩阵；实际可见性受账户、workspace、组织和 rollout 影响 | `facts-maintainer` / 2026-09-10 |

本章同时使用[官方事实缺口审查](../../docs/research/official-facts-gap-review-2026-08-10.md)和[本轮事实刷新记录](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)保持来源边界。官方产品说明不等于当前账户或本仓库的运行证据。

## 来源与更新提示

工作面分类、模型可用性、Cloud 生命周期和入口支持范围都是易变事实。更新时先复核官方来源，再同步[事实影响注册表](../../docs/governance/fact-impact-registry.yaml)、本章、实验和页面；用户报告只能作为排查案例，不能替代官方事实或本地运行证据。

## 本章验收

- [ ] 能先选 `Local / Worktree / Cloud`，再选择入口和模型；
- [ ] 能交付包含三张卡和否决理由的 `surface-decision.md`；
- [ ] 能用独立证据填写资源可读、`surface_available` 和工具可用状态；
- [ ] 能区分 Cloud setup 与 agent 阶段，并说明秘密和网络的阶段边界；
- [ ] 面对三种失败变体时会标记 `blocked / rejected / not_observed`，而不是扩大完成声明；
- [ ] 能说明本章仍是 `candidate`，实验仍是 `not_run`，没有把官方文档写成本仓库实测。
