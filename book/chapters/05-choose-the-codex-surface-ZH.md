<!-- content_id: chapter-05-choose-the-codex-surface | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 75ae63be087590c77a1ff3556415e272046489fc -->

# 第 5 章：选择正确的 Codex 工作面

**状态：** `candidate`。本章给出了有结构的决策方法和有来源支撑的产品边界，
但尚未通过独立学习者前测。不要从本章推断某个账户能力、Cloud 运行结果或模型比较结论。

## 本章要解决的问题

同一个目标可能从桌面应用、CLI、IDE 扩展或网页流程开始；它也可能在本机、
Git Worktree 或 Cloud 环境中执行。这些是不同的决策。

人们经常把多个阶段压缩成一句话：

~~~
“浏览器登录成功了，模型出现在选择器里，环境也初始化完成，所以任务可以开始。”
~~~

这句话可以在几个彼此独立的地方出错：目标仓库未必可读；所选模型未必在该工作面可用；
终端、浏览器、连接器或文件系统工具可能不存在；Cloud 的 setup 脚本或许能联网，
后续 agent 阶段却不能；界面虽然显示 Worktree，shell 或 IDE 却仍指向另一个检出目录。

本章采用更有用的顺序：

~~~
选择工作面
→ 选择入口
→ 核验目标和账户边界
→ 核验模型和工具
→ 执行最小行动
→ 交付前审查证据
~~~

这里的“工作面”是工作在哪里执行、改动落到哪里；“入口”是人怎样启动和审查这项工作。
CLI、IDE、桌面端和网页端不是 Local、Worktree、Cloud 的可互换别名。

## 学习目标

完成本章后，你应该能够：

- 依据上下文、数据边界、副作用、证据和恢复要求，在 `Local`、`Worktree`、`Cloud` 之间选择；
- 区分工作面与桌面端、CLI、IDE 或网页入口；
- 将目标资源访问、模型可用性和工具可用性作为彼此独立的断言测试；
- 分开记录 Cloud 的 `setup` 与 `agent` 证据，包括网络阶段和秘密信息生命周期；
- 产出一份 `surface-decision.md`，记录被拒绝和未观察到的选项，而不只记录自己偏好的选项；以及
- 当下一条证据需要的权限超过任务应得范围时，安全地停止。

## 现实入口：阶段才是线索

项目的现场研究收集了 GitHub Issues、Stack Exchange 与其他公开讨论中的用户报告。
它们是症状报告，不是本地复现、官方根因或保证可用的修复方案。它们的诊断价值在于：
显示用户经常把哪些断言混为一谈。

| 公开报告类别 | 报告者观察到什么 | 它**不能**证明什么 | 第一个安全检查 |
|---|---|---|---|
| OAuth 成功，token 交换失败 | 浏览器授权页完成，但客户端无法完成交换 | CLI 会话、目标 host 或仓库可用 | 将授权、回调、交换和第一次无害资源读取记成四个阶段 |
| 自定义 provider 只暴露一个工具 | 配置被接受，但会话中没有 shell、文件或浏览器工具 | 模型或 provider 能执行缺失的动作 | 保存实际工具清单；分开测试注册与调用 |
| Worktree 与 checkout 不一致 | UI 显示 Worktree，但 shell `cwd`、IDE 根目录、补丁目标和 Git 元数据不一致 | 实际编辑进程已经被隔离 | 读取绝对路径、`.git` 形态、工作区根目录和 `git status`；不一致就停止写入 |
| Cloud setup 看似成功，任务却不能使用秘密或网络 | 依赖安装或出现 setup 标记，随后 agent 阶段无法访问服务 | setup 网络、秘密和 agent 网络是同一种能力 | 分开记录 setup 日志、agent 日志、网络阶段、秘密生命周期和结果 diff |
| GitHub 或其他 host 被 allowlist 拦截 | 请求在代理、沙盒或企业网络策略下失败 | 开放全部网络是正确或获准的修复 | 在申请狭窄变更前，区分沙盒策略、代理 allowlist、DNS/TLS 和企业防火墙假设 |

阅读[现场问题索引](../../docs/research/field-problems-index-2026-08-10.md)、
[工作面研究](../../docs/research/field-problems-surface-2026-08-10.md)和
[论坛研究](../../docs/research/field-problems-forums-2026-08-10.md)，获取原始链接和日期。
研究记录刻意写明本项目没有复现什么。

### 现场案例：第一次写入前先核验目标

![将现场信号映射到最小安全响应](../../assets/teaching/field-signal-to-safe-degradation-red-black.svg)

有边界的案例 [FC-WORKTREE-01](../../docs/research/field-case-worktree-target-mismatch-2026-08-12.md)
把 issue #34352 中带日期的公开报告变成目标身份练习。2026-08-12 的研究快照没有记录到
公开维护者对根因的确认，本项目也没有复现该报告。它的价值更窄：每次从 Local 交接到
Worktree 后，在编辑、分支操作、构建或测试前，对比预期 checkout 与 shell `cwd`、Git 顶层、
worktree 列表、branch/HEAD、可写根目录。只要有一个信号不一致，安全结果就是停止写入，
而不是猜测哪个工作面才算权威。

## 1. 人们容易混淆的三个层次

### 工作面：执行和改动发生在哪里

官方环境文档描述了三种 Codex chat 工作面：

| 工作面 | 任务在哪里运行 | 它适合什么 | 它不能证明什么 |
|---|---|---|---|
| `Local` | 用户机器上的当前项目目录 | 快速检查、小型本地改动、必须保留在当前 checkout 的工作 | 当前目录安全、干净或确实是正确目标 |
| `Worktree` | 用户机器上的独立 Git worktree | 将改动与主 checkout 隔离，并审查聚焦的 diff | 每个进程都切换到同一个 worktree，或网络/账户权限已经改变 |
| `Cloud` | 配置好的远程环境 | 适合有远程隔离运行时和仓库 checkout 的长时或并行工作 | 本次运行中账户、仓库、工具、网络、秘密或最终 diff 都可用 |

`Local` 与 `Worktree` 仍然是本地执行。Worktree 是 Git 隔离机制，不是通用安全边界；
Cloud 环境是执行边界，不证明它的 setup、agent 运行时或外部连接已经就绪。

### 入口：人怎样启动和审查

入口改变的是交互方式，并不会自动改变执行边界：

| 入口 | 优势 | 常见审查证据 |
|---|---|---|
| 桌面应用 | 可见的任务状态、环境选择和交互式审查 | 环境标签、任务事件、摘要、diff 和人工确认 |
| CLI | 明确路径、命令、脚本和可重复的本地工作 | `cwd`、命令输出、退出码、Git status、diff 和保存的日志 |
| IDE 扩展 | 就近的编辑器上下文、选中的文件和编辑器内 diff | 工作区根目录、选中上下文、补丁和聚焦 diff |
| Web / Cloud 流程 | 远程 setup、较长执行和交接式审查 | 仓库/分支、setup 证据、agent 证据、摘要和 diff |

例如，CLI 可以在 Local checkout 或 Worktree 中运行；IDE 可以连到 Worktree，同时另一个 shell
仍停在原 checkout。因此，“我用了 CLI”不足以回答“编辑到底发生在哪里”。

## 2. 能力是一条链，不是一枚登录徽章

把可用性视为一串断言：

~~~
官方产品支持
→ 当前账户 / 工作区 / 组织授权
→ 目标资源可读
→ 候选模型在此工作面可用
→ 所需工具已经注册
→ 所需工具在当前阶段可调用
→ 具体行动完成
→ 结果已验证
~~~

每一个箭头都需要独立证据。上游成功不能替代下游检查。

| 观察 | 它能支持什么 | 单独不能支持什么 |
|---|---|---|
| 浏览器授权页完成 | 授权页达到成功状态 | token 交换、目标 host 访问或仓库访问 |
| 模型出现在选择器 | 模型在选择时可见 | 它在另一工作面可用、工具访问或任务质量 |
| 目录可写 | 该路径在该时刻写入探针成功 | 仓库目标正确、远端授权或安全交付 |
| 出现工具名称 | 某项能力被宣传或注册 | 工具能运行、拥有所需凭据或可执行所需副作用 |
| Cloud setup 安装了依赖 | setup 到达了该依赖步骤 | agent 阶段网络、秘密访问、任务完成或已验证 diff |
| UI 显示 `Completed` | 产品状态被显示 | 审查、测试成功、部署、push 或用户验收 |

链条断裂时，指出断的是哪个阶段。不要把“这个任务”的断言偷偷改成“产品通常支持”，
以此让声明看起来更强。

## 3. 用五道门选择工作面

按以下顺序评估候选工作面。顺序很重要：它避免让一个方便的入口或偏好的模型驱动不安全的环境选择。

### Gate 1：上下文

该工作面能否读取任务需要的精确项目规则、目标文件、版本和验收输入？答案未知时，
不要从仓库名或一次成功登录中推断答案。

### Gate 2：数据边界与隔离

数据应留在当前机器、一次性 worktree 还是获准的远程环境？任务是否含有不能跨越边界的
秘密、客户数据、私有源码或未提交工作？远程工作面必须先证明数据转移有必要；本地工作面也必须有可恢复基线。

### Gate 3：行动与副作用

任务是只读、本地编辑、分支变更、仓库 push、外部 API 调用还是生产动作？选择满足必需行动的最小工作面。
不要只因它让诊断更简单，就授予网络或远程写入权限。

### Gate 4：证据

另一个人能否检查与声明相对应的证据？例如路径回显、目标读取、工具清单、命令输出、diff、
测试结果、Cloud 日志或人工批准。高风险任务中，能执行行动却不能留下可审查证据的工作面不是好选择。

### Gate 5：恢复

认证失败、网络消失、依赖缺失或 Agent 产生部分改动时，你能保留状态并从已知检查点继续吗？
如果不能，拒绝该工作面，或把任务缩小为只读探针。

### 实用选择表

| 任务形态 | 可能候选 | 原因 | 行动前所需证明 |
|---|---|---|---|
| 阅读公开文档并产出本地笔记 | `Local` | 不需要远程写入或特殊隔离 | 正确 checkout、来源列表和输出路径 |
| 编辑共享仓库，同时保护当前未提交工作 | `Worktree` | 独立 Git 树有助于隔离基线和 diff | Worktree 路径、branch/commit、`.git` 形态和 Git status |
| 在已批准仓库中执行长时、并行变更 | `Cloud` | 远程隔离和交接可能适合该任务 | 已连接仓库、环境、setup/agent 阶段、日志和最终 diff |
| 向外部连接器发送客户数据 | 不自动选择 | 数据所有者、目的地、授权和保留期需要明确审查 | 精确载荷、目标账户、批准、回滚/补偿和工具证据 |
| 诊断缺失工具或不可访问的路径 | 先用当前工作面的只读检查 | 保留失败边界，避免盲目扩大权限 | 工具清单、绝对路径、配置形态和错误输出 |

这张表给的是候选项，不是自动授权。即使某个工作面通常合适，任务也可能是 `blocked`。

## 4. 行动前先写决策卡

对于不只是只读说明的任务，先创建 `surface-decision.md`。保留被拒绝的卡片：它们记录为什么
一个看似合理的选项没有被选择。

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:

model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | concrete action
setup_evidence:
agent_action: not_applicable | concrete action
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:

recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

没有运行或未收集证据时，使用 `not_observed`。不要为了填满表格而把缺失证据改写成 `yes` 或 `no`。

## 5. Cloud 分为 setup 阶段与 agent 阶段

官方 Cloud 文档将 setup 与 agent 执行视为生命周期中的不同部分。setup 可以在有网络时安装依赖；
之后的 agent 阶段通常离线，除非环境另有配置。为环境配置的秘密信息也可能只在 setup 可用，
并在 agent 阶段之前移除。

分开记录以下字段：

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

“setup 脚本安装了包”只能证明 setup，不能证明 agent 能访问该包的服务。“环境设置里存在秘密”
也不能证明任务运行时能读取它。默认安全做法是在当前阶段和数据路径得到证明前暂停外部调用。

## 6. 小型可观察实验：同一任务，三张卡

**实验状态：** `not_run`。下面是练习设计，不是本仓库已经在 Local、Worktree 或 Cloud 中运行过的记录。

### 准备

准备一个可丢弃的 Markdown 文件、一份短验收清单和一个没有 remote 的临时 Git 仓库。
不要使用秘密、私有数据、外部消息、安装、发布、push 或生产目标。

### 任务

固定任务是：

> 读取 `brief.md`，在 `draft.md` 中做一处已命名的文字修改，运行一项只读格式检查，并报告 diff。不要改动其他文件。

### 步骤

1. 在运行前填写 Local、Worktree 与 Cloud 三张卡。
2. 对每个候选项应用五道门。
3. 记录每个候选项的绝对路径、目标读取、工具清单、模型可见性和允许副作用。
4. 至多选择一个证据充分的选项执行无害修改；其余选项标为 `rejected`、`blocked` 或 `not_observed` 并说明原因。
5. 保存 diff、检查输出、run-id 和准确的工作面/入口。
6. 路径、工具、目标或阶段证据变化时，停止并保存检查点，不要扩大权限。

### 最低证据

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

合格记录不只显示文件改过；还应说明为什么选这个工作面、为什么拒绝其他工作面，以及哪些证据支持最终声明。
若 Cloud 未运行，Cloud 卡必须写 `not_observed`。

### 证据

保存决策卡、绝对路径、目标读取结果、工具清单、模型可见性、阶段状态、diff、检查输出和审查者记录。
缺失的观察保持 `not_observed`，不要用界面标签补齐。

## 7. 失败模式与安全降级

| 失败 | 正确解释 | 安全降级 |
|---|---|---|
| 登录成功，目标读取失败 | 身份与资源访问是不同阶段 | 停在目标读取证据；任务保持 `blocked` |
| 模型可见，工具缺失 | 模型选择与工具注册是不同阶段 | 改做文本计划或已知支持的工作面；不盲目扩大权限 |
| 选定 Worktree，路径却不一致 | 隔离元数据与进程工作目录不一致 | 停止写入；回显路径、检查 Git 状态并取得人工确认 |
| Cloud setup 通过，agent 失败 | setup 证据不覆盖 agent 证据 | setup 记为 `passed`，agent 记为 `failed`/`not_observed`，任务记为 `blocked` |
| 网络请求被拦截 | 原因可能是沙盒、代理、DNS/TLS 或企业策略 | 缩小请求并保存错误；不要为了重试直接改成不受限网络 |
| 长时间没有新事件 | 证据不足以称任务正在进展或已经完成 | 按工作面政策停止/取消，并保留最后检查点 |

这些是诊断状态，不是通用产品 bug 诊断。社区解决办法在相关官方行为与当前运行时被核验前，只是一个假设。

## 反思

请依据决策卡和证据，而不是记忆，回答：

- 哪一道门改变了选择：上下文、数据边界、行动、证据还是恢复？
- 哪个上游成功最容易让人过度声明？
- 选中的入口帮助的是执行、审查，还是两者？
- 哪一项新增观察能区分“选错工作面”与“缺账户权限或缺工具”？
- 如果任务含有私有客户数据，数据边界和批准记录需要怎样变化？

## 迁移任务

将方法迁移到一个研究任务：浏览器读取公开来源、本地 shell 保存脱敏证据、隔离环境处理敏感文件。
重新填写决策卡；不要把本章的工作面选择直接复制到新任务。

## 验收清单

满足以下条件再进入下一阶段：

- [ ] 能解释 `Local`、`Worktree` 与 `Cloud` 的区别；
- [ ] 能解释桌面端、CLI、IDE 和网页是入口，而非与工作面同一类别；
- [ ] 能产出三张卡，其中包含选中项以及明确的拒绝/未观察原因；
- [ ] 能分开记录账户授权、资源可读性、模型可见性、工具注册、工具调用、行动完成和结果审查；
- [ ] 能分开记录 Cloud setup 与 agent 证据、网络阶段和秘密生命周期；以及
- [ ] 当下一项证明需要比任务协议更宽的权限时，能够停止或降级。

## 来源与更新边界

决策方法是稳定的教学方法；产品工作面、模型矩阵、权限模式、Cloud 生命周期、工具可用性和入口支持是易变事实。
提出当前产品断言前，请查阅带日期的来源记录。

| 易变事实 | 一手来源 | 访问日期 | 适用边界 |
|---|---|---|---|
| Codex chat 工作面包括 Local、Worktree 与 Cloud | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | 官方环境说明；不证明本账户或本任务可使用每个工作面 |
| Cloud setup 与 agent 是不同阶段 | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | 官方 Cloud 生命周期；不证明这里运行过 Cloud 任务 |
| setup 网络、agent 网络和秘密生命周期有不同边界 | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | 官方配置说明；组织策略和运行时证据仍可能不同 |
| Local 权限与批准层不同 | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | 官方安全模型；不证明本会话的实际配置 |
| CLI、IDE、Cloud 与模型支持随工作面而不同 | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | 官方产品页；账户、工作区、灰度和版本会影响可用性 |

[官方事实卡](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)提供项目中带日期的摘要与限制。
[现场问题研究](../../docs/research/field-problems-codex.md)及相关工作面/论坛记录提供公开用户报告；
它们都不能替代当前账户级或运行时观察。

## 本章证据边界

本章是 `candidate` 内容工件；练习仍为 `not_run`。仓库没有创建 Cloud 环境、运行三卡任务、
验证模型矩阵，也没有复现每条公开报告。未来验证需要保存 run-id、环境、精确输入、工具清单、
diff、检查输出与审查者，才能改变这些声明。

本简体中文译文为可读的 `in-progress` 翻译切片，独立语言审校尚未完成；它不是已验证译文，
也不代表完整中文课程。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-ZH.md" aria-label="上一章：第 4 章·上下文、权限与 Agent 的行动边界">← 上一章<br><strong>第 4 章·上下文、权限与 Agent 的行动边界</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="../table-of-contents-ZH.md#第-6-章模型选择不是模型崇拜" aria-label="返回中文目录：第 6 章尚在迁移中">下一章待翻译 →<br><strong>返回中文目录查看英文源文件</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
