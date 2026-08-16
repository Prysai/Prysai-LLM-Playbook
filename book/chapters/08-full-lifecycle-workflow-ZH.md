<!-- content_id: chapter-08-full-lifecycle-workflow | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 第 8 章：从定义到交付

**状态：** `candidate`。本章定义了携带证据的工作流及恢复规则，
但比较实验尚未运行。案例材料为项目自有教学材料，不是一次真实 Codex 运行、
客户委托或生产发布的记录。

## 本章要解决的问题

让 Codex“开始写”通常不难；把一件有用的工作真正收尾，是另一回事。

任务表面上看似顺利，目标却可能仍然模糊，范围正在蔓延，检查跑在错误文件上，
或上一次成功的改动无从确认。模型容量错误会中断任务，后续提示却可能继续建立在
半成品状态上；终端可能停在 `Working`，却没有命令完成的证据；浏览器
可以报告登录成功，而客户端仍会在下一步令牌交换时失败。

实用的回答是一条有明确出口的工作流：

~~~text
定义 → 计划 → 构建 → 验证 → 审查 → 交付 → 维护
~~~

每一个箭头都是决策点。阶段完成，不是因为界面向前走了，或 Agent 说“完成”；
而是因为该阶段的证据存在，并且另一个人能够检查。

![教学卡：工作流把证据从定义带到维护](../../assets/teaching/lifecycle-checkpoints.svg)

> 这是项目自有教学卡。它解释方法的结构；它不证明某个 Skill、Agent 或外部服务
> 已经执行了这条工作流。

### 看一个输出，同时看见它的边界

仓库还提供一个可丢弃、项目自有的案例，把同一纪律带到非代码交付物：
一张虚构的、以首次购房者为先的房地产概念页。在看截图前先读
[案例记录](../../docs/research/skill-case-product-context-real-estate-2026-08-11.md)。
其中标明合成输入、本地渲染命令、记录的视口，以及这张图不能支持的断言。

[![合成首次购房者指南的一次本地渲染](../../assets/cases/product-context-real-estate-thumbnail.png)](../../assets/cases/product-context-real-estate-desktop.png)

截图只是指定视口下的一次本地渲染证据。它不能证明 Product Context Skill 曾独立
运行、房源真实存在，或页面提高了信任、咨询、转化或销售。
[sandbox 源码](../../examples/skill-sandbox/product-context-real-estate/README.md)
被刻意保持得足够小，可以在无需凭据或外部请求的前提下检查和重跑。

## 学习目标

完成本章后，你应该能够：

- 在允许编辑前，写出包含范围、非目标、验收、权限和恢复目标的任务定义；
- 把大请求改写为尽早产生可检查证据的竖向切片，而不是留下多层未完成工作；
- 创建能保留最后已知成功状态的检查点，让重试有条件而不是自动发生；
- 区分构建、运行时、视觉、来源、安全和用户验收证据；以及
- 写出诚实的交接，说明发生了什么、没有发生什么、下一位审查者还必须检查什么。

## 现实问题入口：工作流可能在两个界面之间失败

项目的 [Codex 现场研究](../../docs/research/field-problems-codex.md) 记录公开用户报告。
这些报告是有用的症状，不是官方根因分析，也不是本地复现。

| 报告的症状 | 报告能够支持什么 | 它**不能**证明什么 | 第一个安全响应 |
|---|---|---|---|
| 所选模型变得不可用，任务停止 | 报告者观察到了容量错误和被中断的任务 | 队列语义、服务端原因，或所有账户和版本的行为 | 冻结后续提示；重试前检查 diff、日志和最后接受的检查点 |
| 格式化或验证任务长时间停在 `Working` | 报告者在该次运行中没有看到完成信号 | 普遍死锁、确切子进程或根因 | 设定有界等待；保存输出和进程状态；仅按任务恢复规则中断 |
| 浏览器称认证成功，客户端稍后失败 | 认证有多个可观察阶段 | 浏览器成功、网络可达或页面提示证明客户端已就绪 | 将回调、令牌交换和首次成功客户端请求分别记录 |
| 验证扩大为强制重装 | Agent 可能把“确认它能用”理解为可改动持久环境 | 报告描述所有 Agent，或重装永远错误 | 分开记录源码改动、测试、安装、重启、部署和线上验证；持久改动前询问 |

本章不是在教“永不重试”或“永不安装”。它教的是：下一步取决于证据与授权，
而不是等待了多久，或状态标签显得多自信。

## 1. 生命周期是一组携带证据的状态

这七个阶段是组织工作的教学模型，不承诺每个 Codex 工作面都会暴露完全相同的
界面状态。

| 阶段 | 它回答的问题 | 常见允许工作 | 出口证据 | 何时停止 |
|---|---|---|---|---|
| 定义 | 想要什么结果、给谁、边界是什么？ | 阅读规则、目标、输入、风险和非目标 | 任务协议与验收说明 | 缺失输入会改变范围、风险、权限或验收 |
| 计划 | 最小且有用的工作顺序是什么？ | 映射依赖、选择切片、暴露高风险未知项 | 有序计划、切片边界与检查 | 计划只是横向分层，不能独立检查结果 |
| 构建 | 在允许范围内实际改了什么？ | 做一次有界改动并保留检查点 | diff、变更文件清单与检查点记录 | diff 超出范围，或恢复目标不清楚 |
| 验证 | 结果在关键检查下是否表现正确？ | 跑聚焦测试、构建、运行时、视觉或来源检查 | 命令、退出码、输出、环境与限制 | 命令挂起、测试目标错误，或缺少证据 |
| 审查 | 声明是否符合证据和请求结果？ | 用新鲜上下文阅读 diff，检查风险与维护成本 | 声明—证据表和开放风险清单 | 声明宽于证据，或授权有歧义 |
| 交付 | 另一个人能否使用并检查结果？ | 交接文件、日志、限制和下一步 | 交付摘要与精确产物路径 | 状态会被夸大成已提交、已发布或已上线 |
| 维护 | 什么需要观察、更新或回滚？ | 记录负责人、源版本、下次复核和回滚 | 维护记录与复核触发器 | 没有人负责更新，或回滚无法演练 |

出口条件缺失时，写 `blocked` 或 `unverified`。不要靠再加一个
阶段来填补缺口；更长的计划不能替代缺少的权限、文件或测试结果。

### 状态标签不是出口检查

| 声明 | 最低证据 |
|---|---|
| “源码改了。” | 指定路径的 diff 或文件比较 |
| “检查跑过了。” | 精确命令、工作目录、退出码和输出 |
| “应用能用。” | 在指定环境和输入下的运行时观察 |
| “页面看起来正确。” | 指定视口的渲染检查和视觉验收标准 |
| “功能已经交付。” | 仓库或部署状态、发布记录和交付后检查 |

最后一句比前四句严格得多。构建通过很有价值，但不会自动成为运行时、视觉、安全或
用户验收证据。

## 2. 先定义，再行动

定义阶段把愿望变成有边界的契约。它应短到可以在开工前读完，又具体到足以阻止
好心的 Agent 自行发明范围。

~~~text
owner: content-maintainer
target: docs/guide.md
goal: make the steps, links, and acceptance notes agree
allowed_scope: read project rules; edit docs/guide.md; run existing local checks
inputs: target file, project rules, defect list, existing link checker
non_goals: no code changes; no dependency install; no commit; no push; no publish
acceptance: the named defects are fixed and the allowed checks have recorded exits
evidence: diff, changed-file list, command output, review notes, unverified list
stop_when: scope, authority, target, or recovery source is missing
rollback: restore the pre-edit copy or return to the recorded clean checkpoint
delivery: local review packet; state whether commit and push were not performed
~~~

有两项最容易漏掉：

1. `non_goals` 防止任务意外扩张。“验证页面”并不暗含重装浏览器、
   改系统策略或发布结果。
2. `rollback` 必须指向真实的恢复来源。哈希只能说明文件变了，不能
   自己还原旧内容。

### 最小权限规则

从只读检查开始；只为已命名目标增加写权限；只有任务确实需要并且范围已授权时，
才增加网络、认证、安装、重启、部署或外部消息。

任务跨越产品边界时尤其如此。官方安全记录将 sandbox 与审批描述为两种不同控制，
也将有副作用的 Connector 或 MCP 动作置于审批边界。因此工作流既要记录技术能力，
也要记录使用它的语义许可。相关的日期化产品边界见
[官方事实刷新记录](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)
和[事实影响登记表](../../docs/governance/fact-impact-registry.yaml)。

## 3. 围绕竖向切片来计划

横向计划先完成某一层，再证明用户能得到结果：

~~~text
全部数据模型 → 全部 API → 全部 UI → 集成 → 测试
~~~

若界面假设错误，问题可能直到最后才暴露。竖向切片会从输入一路走到证据，
但只选择一个窄结果：

~~~text
一个输入 → 最小数据/改动 → 一个可观察行动 → 一项聚焦检查
~~~

例如，“读者能打开一章并找到实验”常常比“迁移整本书的导航”更适合作为第一个
切片。它可以只包含一个英文正文、一条目录链接、一次本地链接检查和一次状态边界
审查；虽然小，却走过了完整路径。

| 切片字段 | 示例 |
|---|---|
| 结果 | 从英文目录打开一章 |
| 输入 | 章节源、目录项、语言矩阵和链接检查器 |
| 改动 | 添加规范英文文件，只更新其英文入口 |
| 验收 | 链接能解析、状态已登记、旧路径只在治理声明为 legacy 时保留 |
| 证据 | diff、验证器输出、本地链接输出和限定文件审查 |
| 未证明 | 翻译质量、读者理解、浏览器部署或运行时 Skill 行为 |

第一个切片应尽早暴露代价最高的未知项。若工作依赖不可用凭据、提供商能力或缺失
产物，这个依赖应放在第一个切片里，而不是拖到末尾。

## 4. 带着检查点构建

检查点是可恢复的状态说明，而不只是时间戳。它应让下一次决策无需相信之前的聊天
历史。

~~~text
run_id: chapter-review-001
CP0: clean or intentionally dirty baseline; status; target hash; rollback source
CP1: definition accepted; plan and permissions fixed; no edit yet
CP2: first slice changed; diff and changed-file list saved
CP3: focused checks completed or stopped; output and unverified items saved
CP4: independent review completed; delivery state and next review recorded
~~~

每个检查点都问：

- 我们最后确认成功的是什么？
- 哪些文件、进程、服务或账户可能已改变？
- 还缺少什么证据？
- 最小且安全的下一步是什么？
- 什么条件要求暂停，而不是重试？

不要把依赖性工作排在尚未接受的检查点之后。现场研究中的用户报告描述过危险版本：
容量中断后，后续工作可能被当作前置任务已经完成。报告不能证明普遍队列语义，
但它给出了一条安全规则：对话引用不等于已验证的前提条件。

### 只有已知状态后才重试

~~~text
failed_stage: verify
failure_class: model capacity / command timeout / unknown
last_accepted_checkpoint: CP2
changes_since_checkpoint: none known; diff rechecked
retry_condition: same command, same target, one bounded attempt
fallback: stop and hand off if output remains absent or scope changes
~~~

“继续”不是恢复计划。它没有指出最后接受的状态，不能防止重复副作用，也不能解释
为什么同一动作现在值得再做一次。

## 5. 分层验证

验证是选择问题：选择能够支撑你准备声明的检查。

| 声明 | 能支撑它的检查 | 该检查的边界 |
|---|---|---|
| 预期文件改变 | 指定路径的 diff | 不证明改动正确 |
| 语法或构建有效 | 聚焦验证器或构建命令 | 不证明运行时行为 |
| 功能在一个环境表现正常 | 固定输入的运行时检查 | 不泛化到每个账户、系统或提供商 |
| 页面按意图渲染 | 指定视口的浏览器或视觉检查 | 不证明用户需求、无障碍完整性或生产部署 |
| 外部事实仍新鲜 | 有日期、范围和下次复核的权威来源 | 不证明本账户有访问权，或本会话配置正确 |
| 发布已上线 | 部署记录加交付后请求/检查 | 不证明每个缓存、路由、设备和用户路径都正确 |

工作时保留一张声明—证据表：

~~~text
claim: 第 8 章可从英文目录到达
evidence: table-of-contents-EN.md link; local link checker exit 0
scope: recorded commit 的仓库工作树
not_proven: GitHub 渲染、译文链接、读者理解

claim: 比较实验已完成
evidence: none
scope: none
status: not_run; 不得宣称完成
~~~

### 当命令持续停在 Working

把沉默当作观察，不当作成功信号。启动长命令前，先定义预期输出、合理等待时间和
中断路径。等待到期时：

1. 记录命令、工作目录、目标和已耗时间；
2. 收集当前可得到的输出和进程状态；
3. 检查 diff 与最后检查点；
4. 仅在任务允许且进程可安全停止时中断；
5. 先把结果分类为完成、部分完成、失败或未知，再决定是否重跑。

FP-10 背后的公开报告没有确定格式化器、子进程、终端还是 Agent 循环负责。
这种不确定性正是恢复规则必须依赖证据、不能依赖猜测根因的原因。

## 6. 独立于执行来审查

产出改动的人或 Agent，往往不是判断它是否完成的最佳来源。用新鲜上下文审查产物，
同时保留原目标与证据清单。

1. diff 解决了声明的问题吗？
2. 它是否改动了允许范围外的内容？
3. 每项完成声明是否都有同等范围的证据？
4. 未来维护者需要什么才能复现、更新或回滚？

审查必须包含失败尝试，而不只是看起来成功的最终状态。失败命令也可能改变文件；
重试可能重复副作用；浏览器截图可能隐藏缺失的网络请求；绿色构建可能跳过真正重要
的测试。

## 7. 交付与维护

一份有用的交付说明应短、具体、诚实：

~~~text
status: ready_for_local_review
owner: content-maintainer
scope: docs/guide.md only
actions_done: inspected; planned; edited; ran diff and local checks
actions_not_done: commit; push; publish; browser review
evidence: CP0; CP2 diff; CP3 command output; review notes
unverified: reader usefulness; rendered appearance; facts outside the brief
blocked_on: reviewer confirmation before commit
next_check: inspect the target file and evidence paths
permission_boundary: local reversible edit and read-only checks
next_review: after the source or chapter structure changes
~~~

交付不是生命周期的终点。若输出包含易变的模型、工具、权限、命令或服务事实，
记录其权威 URL、访问日期、范围、负责人和下次复核；若输出是 Skill 或共享工作流，
记录触发条件、排除条件、依赖、测试与回滚。没有人负责这些更新，能力就还不能供团队
可靠使用。

官方 Cloud 文档也说明为什么这些阶段不能折叠：设置、Agent 工作、结果审查和后续跟进
是不同工作面，有不同证据。文档本身只是日期化的产品来源，不证明某个账户或工作区
拥有访问权。

## 8. 来自真实报告的恢复模式

### 容量中断

**观察到的症状：** 所选模型报告容量已满，任务停止。

**安全的第一个响应：** 冻结依赖提示，保存当前 diff 和日志，确定最后接受的检查点，
检查预期文件或产物是否部分完成；之后选择一次有界重试、备用工作面或交接。

**不得声明：** 排队的任务已经完成、模型是唯一原因，或反复发送“继续”已恢复缺失证据。

### 长时间运行的验证

**观察到的症状：** 格式化、测试或分析命令没有完成信号，界面却停在 `Working`。

**安全的第一个响应：** 应用预定义的超时和中断规则，保存输出和进程状态，检查 diff，
然后分类此次检查；原因未知时就保持未知。

**不得声明：** “还在运行”等于“已通过”，或没有可见错误就等于子命令已完成。

### 第一个页面显示成功的认证

**观察到的症状：** 浏览器页面称登录成功，但客户端无法交换令牌或发出第一次请求。

**安全的第一个响应：** 建立状态卡，分别写授权页、回调、客户端交换和第一次成功请求；
只测试下一个缺失状态。

**不得声明：** 浏览器成功证明客户端认证、账户权益、连接器审批或 MCP 工具可用。

### 验证请求持久改动

**观察到的症状：** Agent 提议重装、重启或改动本地环境来让检查通过。

**安全的第一个响应：** 停下并写明拟议副作用、目标、源产物、备份、回滚和授权点；
在决定明确前，优先隔离或只读检查。

**不得声明：** 源码 diff、单元测试通过和安装成功是同一种状态。

## 9. 示例：审查一个 Markdown 章节

这个案例刻意很小，用来展示任务协议、Skill、Agent 和行动边界章节的字段如何连接。
它是填好的教学示例，不是一次已记录运行。

### 定义

~~~text
owner: content-maintainer
target: docs/guide.md
goal: make steps, links, and acceptance descriptions consistent
allowed_scope: edit docs/guide.md; run existing local checks
non_goals: no code; no install; no commit; no push; no publish; no external messages
~~~

输入是目标文件、项目规则、固定缺陷清单，以及已有的链接检查器（若项目已记录）。
不要读取秘密、客户材料或无关目录。若缺陷依赖易变产品事实，先送到来源记录，再写入章节。

### 能力决策

| 能力 | 决策 | 原因 |
|---|---|---|
| Task Protocol | 使用 | 固定目标、范围、确认点和交付格式 |
| Workflow Orchestrator | 作为阶段记录使用 | 跟踪依赖和检查点；不扩大权限 |
| Evidence Review | 使用 | 把“链接检查通过”和“只改一文件”映射回证据 |
| Research | 暂不使用 | 固定缺陷清单不需要新外部事实 |
| 浏览器、连接器、GitHub 写操作 | 不使用 | 对本地 Markdown 审查没有增加价值 |

选择一个 Skill 不会让任务自动完成，也不会给该 Skill 调用另一个工具或启动独立工作流
的权限。

### 阶段出口

| 阶段 | 允许动作 | 出口证据 |
|---|---|---|
| 定义 | 阅读规则、目标和缺陷清单 | 任务卡、输入列表、允许范围 |
| 计划 | 排序两三个本地编辑 | 计划、依赖顺序、假设 |
| 构建 | 只编辑 docs/guide.md | diff、检查点、变更文件清单 |
| 验证 | 跑已有本地检查 | 命令、退出码、输出、限制 |
| 审查 | 对照目标阅读 diff | 审查笔记和声明—证据表 |
| 交付 | 准备本地审查包 | 写明是否发生 commit/push 的摘要 |

任一阶段缺少出口证据时，标为 `blocked` 或 `unverified`；
不要仅因计划中存在下一阶段就继续。

### 检查点与恢复

~~~text
CP0: original copy + git status + target hash
CP1: plan accepted; no edit yet
CP2: local edit complete; git diff -- docs/guide.md saved
CP3: checks completed or interrupted; output and limits saved
~~~

若 CP2 超出允许范围，先保留 diff 再纠正，并回到 CP0 的恢复来源。若只有一个段落
错误，就修这一段并重跑相关检查；不要先确认精确目标和恢复来源就使用宽泛还原命令。

### 诚实交付

~~~text
completed: reviewed and edited docs/guide.md; saved the actual diff
verified: allowed scope; diff format; named local link check, with exit codes
unverified: browser rendering; reader usefulness; facts outside the defect list
not_done: commit; push; publication; external writes
next: human review of the evidence paths before any local commit
~~~

## 10. 实验：为同一结果比较两种计划

**实验状态：** `not_run`。

### 准备

选择低风险的功能或文档交付，使用可丢弃副本或明确隔离的分支。准备脱敏输入、固定
验收量表和起始状态记录。不要发布、推送、删除或改动生产资源。

### 任务

为同一结果写两份计划：

1. 按技术层逐层完成的横向计划；
2. 从输入走到证据、只取一个窄结果的竖向切片计划。

两种计划必须使用同一验收量表。比较最先暴露的未知项、最先可检查的产物、依赖假设
数量，以及一次刻意中断后的恢复点。

### 证据

保存两份计划、依赖草图、切片的进入与退出条件、实际 diff、验证输出和检查点笔记。
只有至少一个切片产生独立证据，并且学习者能说出仍未完成的工作，实验才算通过。

### 复盘

记录哪项未知最早出现、哪一个切片仍然太大、容量错误或命令超时时应使用哪个检查点。
下一次运行只改变一个计划条件；不要为了让比较显得更干净而重写结果。

## 刻意失败与边界案例

开始一个小改动，完成编辑后却在跑检查前写“完成”。然后模拟以下一种中断：

- 模型变得不可用；
- 验证命令在定义的等待时间内没有输出；或
- 建议的恢复需要安装、重启、网络调用，或写入原范围外的内容。

学习者通过的条件是：交接保留检查点、部分 diff、缺失证据、权限边界、恢复路径和
精确的未知说明。继续堆叠编辑，是这项实验的失败。

## 先完成一个小而完整的切片

初学者不必从网站、代码或发布开始。选一个自己能检查的短文本、一个本地 README，或一组已经允许使用的公开来源。目标不是让模型“做很多”，而是完成一次从定义到交接都能看见的闭环。

```text
结果：让一段 120 字以内的说明让新读者能找到第一步。
输入：原文、读者是谁、一个已知问题。
允许：只读原文；提出计划；确认后只编辑该文本。
不允许：联网、登录、安装、发送、发布或改动其他文件。
检查：保存修改前后文本；让另一人或你自己按“能否找到第一步”检查一次。
交接：改了什么、没有改什么、检查结果、仍未知什么。
```

把这七个阶段走一遍：先定义读者和结果；计划一处改动；保存原文作为检查点；编辑；比对前后；让新视角审查；交接给下一位或明天的自己。若需要更多资料或外部动作，先停在 `blocked`，不要为了完成流程而扩大权限。

### 两次尝试怎样才可比较

若你要比较“直接让模型改”与“先写协议再改”，必须固定原文、目标、允许动作、时间限制和检查规则。记录首次输出、实际耗时、返工次数、diff、检查结果和未知项。原文、模型、工具、权限或环境改变时，写 `not_comparable`；一次更快或更顺眼的结果不等于普遍效率或模型更好。

## 迁移

把生命周期迁移到一个非代码任务，如研究简报、营销页面或设计交接。对每个阶段写出
进入条件、出口证据、停止条件和副作用边界；再指出什么证据相当于 diff，什么相当于
运行时检查，什么仍需要人工验收。

## 来源与维护边界

| 事实或边界 | 来源 | 访问日期 | 适用范围 | 负责人 / 下次复核 |
|---|---|---:|---|---|
| Sandbox 与审批是不同控制；Connector/MCP 副作用可属于审批边界 | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 和[官方事实刷新记录](../../docs/research/openai-codex-facts-refresh-2026-08-09.md) | 2026-08-09 | 当日官方产品描述；不证明本仓库的运行时策略 | `facts-maintainer` / 2026-09-09 |
| Cloud 工作有不同的设置、Agent、审查和后续边界 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-09 | 产品说明；账户、组织、环境和当前 UI 仍需另行检查 | `facts-maintainer` / 2026-09-09 |
| 容量中断可能让依赖任务状态不明 | [FP-09 / issue #33865](https://github.com/openai/codex/issues/33865) 与[现场研究](../../docs/research/field-problems-codex.md) | 2026-08-09 | 公开用户报告；没有本地复现或普遍队列结论 | `curriculum-maintainer` / 2026-09-09 |
| 长时间验证可能让完成状态不明 | [FP-10 / issue #34325](https://github.com/openai/codex/issues/34325) 与[现场研究](../../docs/research/field-problems-codex.md) | 2026-08-09 | 公开用户报告；根因和版本范围未知 | `curriculum-maintainer` / 2026-09-09 |
| 认证应记录为不同的可观察阶段 | [FP-01、FP-02](../../docs/research/field-problems-codex.md) | 2026-08-09 | 用于证据纪律的用户报告；不是官方修复建议 | `curriculum-maintainer` / 2026-09-09 |
| 验证不得静默扩大为安装或持久环境改动 | [FP-11 / issue #37677](https://github.com/openai/codex/issues/37677) 与[现场研究](../../docs/research/field-problems-codex.md) | 2026-08-09 | 公开用户报告；不是官方策略或本地复现 | `curriculum-maintainer` / 2026-09-09 |

生命周期原则应当相对稳定；产品工作面、模型名称、审批默认值、命令参数、认证行为和
外部服务属于易变事实。任一项变化时，刷新第一方记录，然后审查本章、相关 Lab、Skill、
评测夹具和站点路径。

## 验收清单

- [ ] 我能写出带目标、范围、非目标、验收、权限、证据和回滚来源的任务定义。
- [ ] 我能解释为何面对同一结果，竖向切片比横向分层更早产生证据。
- [ ] 我能创建一个检查点，让另一人无需读取原对话也能恢复。
- [ ] 我能区分源码、构建、运行时、视觉、来源、安全和用户验收证据。
- [ ] 我能在容量中断或长时间运行时停止任务，而不把沉默或重复重试称为成功。
- [ ] 我能分开浏览器认证、客户端交换、首次请求和外部工具可用性。
- [ ] 我能拒绝未请求的安装、重启、部署或外部写入，同时保留下一步所需证据。
- [ ] 我能交付一份明确列出已完成、未验证、受阻和未做工作的交接。
- [ ] 我能说明本章仍为 `candidate`，比较实验仍为 `not_run`，
      直到存在运行记录和审查证据。

本简体中文译文是可读的 `in-progress` 翻译切片，独立语言审校尚未完成；
它不是已验证译文，也不表示课程已经通过独立中文审校或学习者验证。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-ZH.md" aria-label="上一章：第 7 章·Skill、Plugin、MCP 和工具如何分工">← 上一章<br><strong>第 7 章·Skill、Plugin、MCP 和工具如何分工</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-ZH.md" aria-label="下一章：第 9 章·验证、怀疑与恢复">下一章 →<br><strong>第 9 章·验证、怀疑与恢复</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
