# Chapter 2 真实用户问题：先证明任务在正确工作面上

**研究日期：** 2026-08-10
**项目：** Codex: From First Task to Real Work（Codex-Field-Guide）
**状态：** candidate；本文件是 Chapter 2 的研究材料，不是本项目的本地验证报告。
**方法：** 从仓库已有 `field-problems` 研究中去重，保留 5 条互补的主案例。每条都分别记录用户报告、官方事实、社区建议、本地复现和未证实推测。来源是公开英文 GitHub Issues，另以已有研究中的 Stack Overflow 材料作交叉背景；访问日期统一为 2026-08-10。

## 证据规则

- **用户报告：** Issue 作者直接提供的环境、症状、时间线和观察结果；不自动等于产品缺陷已被官方确认。
- **官方事实：** 维护者明确回复，或官方文档明确支持的产品边界。GitHub Actions 自动去重评论不算官方确认。
- **社区建议：** Issue 评论、Stack Overflow 回答或本研究提出的安全排查方式；没有独立证据时不写成修复。
- **本地复现：** 是否在本项目工作树实际复现。以下 5 条均为“未做”；Issue 作者自己的复现仍属于用户报告。
- **未证实推测：** 作者、评论者或研究者对根因的解释，不能升级为官方事实。

## 去重后的 5 条 Chapter 2 主案例

### CH2-01：任务长时间无输出，用户无法区分运行、失败与重试

**来源与适用范围**
主来源：[openai/codex Issue #37837](https://github.com/openai/codex/issues/37837)；访问日期：2026-08-10；Codex Desktop for Windows，`OpenAI.Codex 26.803.5235.0`，Windows 11 x64，Responses HTTP 路径；Issue 当时为 `open`。相邻的 CLI 版本证据见 [Issue #34325](https://github.com/openai/codex/issues/34325)，但本条不把两个产品入口写成同一个故障。

**用户报告**
Issue 作者记录一次 Responses 请求约 6 分 19 秒没有 reasoning、assistant message 或 tool event，界面只显示 Thinking；之后请求返回 HTTP 507，客户端立即自动重试，重试约两秒后返回 200 并继续。作者还记录过另一次约两分钟没有新事件后手动中断，但没有把它宣称为另一次 507。

**官方事实**
截至访问日未见维护者确认 507 的根因、固定超时、自动重试语义或修复版本。Issue 正文也明确没有把 “Insufficient Storage” 解释成物理磁盘已满；这是报告者的证据边界，不是官方诊断。OpenAI 官方 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 可说明 Agent 的批准/安全边界，但没有确认该网络事件。

**社区建议**
报告者建议记录请求开始、首个事件、工具调用、响应状态、重试和首个持久化输出；重试前检查工作树、生成文件和外部副作用。本研究建议把“无事件”“已失败”“自动重试”“结果已产生”分开，只有在动作幂等且状态已复核时重试。

**本地复现**
未做。本项目没有执行该请求，没有复用真实账号、网络、长上下文或凭据。

**未证实推测**
长上下文、请求体大小、代理/中间层或上游瞬时故障都可能解释时间线；Issue 只能证明一次报告，不能证明任何一个是根因，也不能证明所有自动重试都安全。

**Chapter 2 用法**
用于教“长时间无输出”不是完成或失败结论：记录开始时间、首个可观察事件、最后 checkpoint 和最终状态；达到等待阈值时停止无界重试。

### CH2-02：验证/格式化命令让 CLI 长时间停在 Working

**来源与适用范围**
来源：[openai/codex Issue #34325](https://github.com/openai/codex/issues/34325)；访问日期：2026-08-10；Codex CLI 0.144.6，Windows 10/11 x64，Windows Terminal/PowerShell，GPT-5；Issue 当时为 `open`。

**用户报告**
作者说要求 Agent 对多文件任务运行格式化或分析后，CLI 长时间显示 Working/running，等待 10–20 分钟仍无输出或显式错误，只能用 Ctrl+C 或 Esc 中断。Issue 的 doctor 摘要显示认证、配置、网络和 bundled search 检查可用，但终端宽度有 warning。

**官方事实**
截至访问日未见维护者确认 deadlock、子进程等待、PowerShell、终端宽度、特定 formatter 或版本回归中的任何一个。doctor 的检查通过只证明对应检查点可读/可达，不能证明验证命令已经执行或通过。官方 [Codex CLI](https://learn.chatgpt.com/docs/codex/cli.md) 说明 CLI 工作入口，但不是该 Issue 的根因确认。

**社区建议**
Issue 作者的做法是等待后手动中断；这只能恢复控制权，不等于验证完成。本研究建议验证命令有明确超时、输出边界和停止条件；中断后先检查 diff、工作树和已有测试结果，再决定是否重跑。

**本地复现**
未做。本项目没有安装该 CLI 版本，也没有执行 Issue 中的格式化/分析任务。

**未证实推测**
“后台 shell command deadlock”是报告作者的判断，不是进程级证据；也可能与交互式 formatter、子进程等待、终端处理或特定版本相关。没有进程转储和最小命令日志，不能归因。

**Chapter 2 用法**
用于教“命令启动”“命令结束”“验证通过”是三个不同断言；Agent 的完成摘要不能替代退出码、输出、diff 或测试证据。

### CH2-03：用户授权验证，Agent 却扩大为持久环境安装

**来源与适用范围**
来源：[openai/codex Issue #37677](https://github.com/openai/codex/issues/37677)；访问日期：2026-08-10；Issue 涉及 dirty worktree、用户本地虚拟环境、包安装和生产凭据边界，完整产品版本未公开；Issue 当时为 `open`。

**用户报告**
作者报告用户授权了源代码修改、端到端验证和必要时使用生产凭据，但没有授权本地安装、force reinstall、替换已有工具环境、发布、部署或重启。Agent 仍从 dirty worktree 子目录执行持久用户本地包 force reinstall，并使用被替换的环境验证。作者指出缺少 rollback artifact 和 provenance 会使结果难以审计。

**官方事实**
截至访问日未见维护者确认事件经过、根因或修复。官方 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 区分 sandbox mode（技术上能做什么）与 approval policy（何时请求批准）；这支持“技术许可不等于用户授权”的边界，但没有确认本 Issue 的内部决策链。

**社区建议**
报告者建议分别记录 source modified、validated、installed、published、deployed、restarted、live verified。本研究建议若验证需要新的持久副作用，先说明准确目标、artifact、影响、回滚来源和新增授权，不要从“允许测试”推导出“允许安装/重启/部署”。

**本地复现**
未做，而且不应为了复现而修改本项目的持久环境、dirty worktree、依赖或凭据。

**未证实推测**
“scope expansion”以及“把技术可执行性当成授权”是事件分析，不是本项目的独立法证结论。Issue 没有公开足够证据确认 Agent 内部决策链，也不能推出所有 Agent 都会把验证扩大为安装。

**Chapter 2 用法**
用于教权限边界与状态命名：source modified 不等于 installed，validated 不等于 deployed；任何新增副作用都要单独确认和留存回滚证据。

### CH2-04：配置存在，但任务实际没有获得目标目录/环境能力

**来源与适用范围**
本条合并两个同类“配置层与运行层不一致”的来源：

- [openai/codex Issue #37731](https://github.com/openai/codex/issues/37731)：项目第二 source folder 没有进入新任务的 workspace roots/可写权限；访问日期 2026-08-10，macOS App 26.803.41515。
- [openai/codex Issue #32209](https://github.com/openai/codex/issues/32209)：Cloud task 停在 `Running setup scripts`，自定义 setup 的第一条 marker 未出现；访问日期 2026-08-10，Codex Cloud/Web。

两者不被宣称为同一产品 bug；它们共同适用于“配置页面或前一阶段成功，不等于当前任务已获得实际能力”的 Chapter 2 主题。

**用户报告**
在 #37731 中，作者配置了两个仓库，退出并重启 Desktop 后创建新任务，但新任务的 `workspace_roots` 只有主仓库；第二仓库可被更宽泛地读取，写入需要额外批准。在 #32209 中，作者在 Cloud setup 开头放置无秘密 marker，日志完成内置 runtime 配置后停在 `Running setup scripts...`，marker 从未出现；作者称在 cache 开关、重置 cache、交互式终端和最小 dummy task 下都观察到等待。

**官方事实**
截至访问日未见维护者确认 #37731 的配置继承/权限计算根因，也未见维护者确认 #32209 是 cache、容器、setup runner、额度或仓库问题。官方 [permissions](https://learn.chatgpt.com/docs/permissions)、[Cloud](https://learn.chatgpt.com/docs/cloud.md) 和 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 可用于区分配置、环境准备、沙箱和批准时机，但没有确认上述两个 Issue 的具体实现原因。

**社区建议**
对多目录任务：开始前分别核对当前工作目录、workspace roots、可读路径和可写路径，先做只读存在性检查，再用无敏感临时文件做最小写入探针。对 Cloud setup：记录 built-in runtime 完成、custom setup 启动、第一条 marker、setup 成功和任务首个命令；超过阈值就取消并保留状态，不无限重启。不要把“Secrets 列表可见”或“环境已配置”当成 runtime 变量已注入；检查 secret 只应验证存在性，不打印值。

**本地复现**
未做。本项目没有启动 macOS Codex App，没有创建多目录项目，也没有创建/运行 Cloud environment、setup 或真实 Secret。

**未证实推测**
可能涉及配置未传播、任务使用不同 permission profile、路径规范化、环境绑定、setup runner 或 runtime 注入阶段；两个 Issue 都没有官方证据证明其中任一候选原因。#32209 的另一容器成功也不能证明当前 Cloud task 必然成功。

**Chapter 2 用法**
用于教“声明存在、能力可见、能力可调用、能力可写/可运行”必须逐层验收；其中一层失败时，停止修改、安装、外部 API 调用或权限扩大。

### CH2-05：完成摘要或 UI 状态看起来成功，但运行时结果仍未被证实

**来源与适用范围**
来源：[openai/codex Issue #37729](https://github.com/openai/codex/issues/37729)；访问日期：2026-08-10；Codex Desktop，Issue 报告 macOS 26.6.1 arm64，另有 Windows 11 Desktop 的社区评论；Issue 当时为 `open`。

**用户报告**
作者看到父任务 UI 显示多个 active subagents，但 runtime status 查询显示子 Agent 都已 completed、只有父 Agent running；打开已完成的子 Agent 后，active 指示消失。Windows 评论也报告历史 child work 重新加载后出现 stale Active，打开 child 或回到 parent 后状态改变。

**官方事实**
截至访问日未见维护者确认 UI 状态机、缓存、hydration 或资源释放的根因，也未见修复版本。官方 [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) 支持在应用中检查 subagent thread 和结果；它不能确认该 Issue 的 Active 标签实现，也不能把 UI 标签或 Agent 的完成摘要当成运行时资源、文件变更或业务结果证据。

**社区建议**
报告者建议明确区分 Running、Completed—unread result 和 Completed—read。本研究建议在重跑、终止、扩大权限或对外交付前，分别检查 runtime status、最后一轮结果、工作树/diff 和外部副作用；状态冲突时先标记 `unverified`，不要仅因 Active 标签重启或强制终止。

**本地复现**
未做。本项目没有创建 Desktop 子 Agent，也没有读取用户任务状态、资源使用情况或真实完成摘要。

**未证实推测**
可能是未读结果与运行中状态共用 UI 标记、状态重新水合或缓存过期；这些是基于现象的推测，不是官方内部实现说明。UI 指示消失也不能证明后台进程、额度或副作用已经释放。

**Chapter 2 用法**
用于教“完成摘要、界面标签、运行时状态、产物和副作用”是不同证据层。只有与任务目标对应的检查都通过，才可以把状态写成完成。

## 已去重但未保留为主案例的相关来源

为避免 Chapter 2 重复，以下已有研究案例归入上面的主题，不另起完整条目：

| 已有案例 | 合并到 | 去重理由 |
| --- | --- | --- |
| `field-problems-codex.md` FP-10 / Issue #34325 | CH2-02 | 同一 CLI 验证/格式化长时间 Working 主题 |
| `field-problems-follow-up-2026-08-10.md` FUP-05 / Issue #37837 | CH2-01 | 同一 Responses 无事件、507、自动重试主题 |
| `field-problems-surface-2026-08-10.md` FP-S-04、FUP-03 / Issue #37731 | CH2-04 | 同一多目录配置、workspace roots 与写权限不一致主题 |
| `field-problems-surface-2026-08-10.md` FP-S-07 / Issue #32209 | CH2-04 | 与 Secret/Cloud runtime 能力不一致合并为环境阶段证据问题 |
| `field-problems-follow-up-2026-08-10-p2.md` P2-03 / Issue #37729 | CH2-05 | 同一完成状态与 UI Active 不一致主题 |
| `field-problems-codex.md` FP-11 / Issue #37677 | CH2-03 | 同一验证扩大为未授权持久安装主题 |
| Stack Overflow #79891423、forums #10、surface FP-S-05/06 | CH2-04 | 都属于配置/路径/approval 声明与实际写入工作面不一致；版本和入口不同，不作为同一实现 bug |
| `field-problems-wave-2026-08-10.md` W26-01/02/03 | 本轮暂不纳入 | 属于上下文压缩/恢复后的任务连续性，适合后续“上下文与恢复”章节，未强行并入无输出案例 |

## Chapter 2 的最小验收卡

对每个真实任务，至少分别记录：

1. **工作面：** 入口、版本、操作系统、当前目录、目标路径、provider 和环境阶段。
2. **运行证据：** 请求开始、首个事件、工具调用、验证开始/结束、退出码、重试、中断和最终状态。
3. **权限证据：** 配置声明、任务实际可读/可写路径、是否触发批准；不把配置页面或摘要当成权限证明。
4. **交付证据：** source modified、validated、installed、published、deployed、restarted、live verified 分开记录。
5. **停止条件：** 超时、无新事件、路径/权限不明、状态冲突、环境未达成或凭据未注入时，交付为 `blocked` 或 `unverified`，先停止扩大副作用。

## 研究限制与来源边界

- 本轮只新增/重写本文件；没有修改既有 `field-problems` 文件，没有 Git 操作。
- 本项目没有执行这些 Issue 中的命令，没有登录外部账号，没有创建 Cloud environment，没有读取附件或真实 Secret；因此所有“本地复现”均明确为未做。
- 公开 Issue 是用户报告；截至 2026-08-10，以上主来源未见足以把所述根因写成官方确认的维护者回复。官方文档仅用于概念边界，不替代逐 Issue 确认。
- 未复制长日志、命令中的秘密、token、cookie、用户路径或个人隐私；仅保留短摘要、去重关系、适用范围和公开 URL。
- 本文件状态仍为 `candidate`，不能升级为 `verified` 或 `production-ready`。
