<!-- content_id: chapter-07-skills-plugins-and-tools | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 第 7 章：Skill、Plugin、MCP 和工具如何分工

**状态：** `candidate`。**比较：** `not_run`。这里的案例教授的是方法，不能证明某个外部 Skill 已成功运行。

**从这里开始：** 先说清任务缺口，再选择恰好填补它的最小能力。

## 本章要解决的问题

“我需要一个 Skill”并不总是正确诊断。Skill、Plugin、MCP 服务器、连接器、脚本、模板和普通文档解决的是不同问题。把它们当成可互换的标签，人们就会安装超出任务需要的能力，让上下文更难检查，也会在不知不觉中扩大可能的外部副作用。

真正有用的问题不是“哪个目录里的 Skill 最多”，而是：

> 这项任务缺少什么？哪一种最小能力可以填补这个缺口，同时让权限、许可证、依赖和证明仍然可控？

## 学习目标

完成本章后，你应该能够：

- 解释方法、连接、执行和分发四层之间怎样分工；
- 从任务本身推导最小有用组合，而不是从目录开始；
- 在采用 Skill、Plugin 或连接器前检查触发条件、依赖、许可证、权限、副作用和证据；以及
- 区分文件存在、能力被发现、被加载、被采用和行为已验证这些不同状态。

## 现实问题入口：任务开始前，发现机制就可能失败

项目的 [Codex 现场研究](../evidence-library-ZH.md#source-notes) 记录了两份公开报告。它们适合作为症状，而不是官方根因分析或本地复现：

| 公开症状 | 报告者观察到什么 | 它**不能**证明什么 | 第一个安全响应 |
|---|---|---|---|
| 用户 Skill 作为普通文件能工作，但改成文件符号链接后不再被发现 | 文件表示方式改变后发现结果也改变；报告还比较了硬链接 | 每个 Skill 扫描器、操作系统或发行版本都有同一缺陷 | 保存精确的文件表示和工作面；在隔离测试中比较普通文件与链接，再记录结果 |
| 显式使用 Skill 依赖一个隐式的可用列表 | 用户无法把显式请求当成独立于当前工作面列表的行为 | 该报告描述通用路由规则或官方产品保证 | 分别保存可见列表、精确请求、会话和已加载资源证据 |

这些报告让一条实际边界变得可见：仓库里有一条路径，不等于当前宿主发现了这个 Skill；有一个可见名称，不等于本会话加载了它；加载完成也不等于它的外部依赖或权限已经工作。

## 1. 四层能力模型

在选择包之前，用这些层来命名你缺少的能力：

```text
方法层       Skill           完成某类任务的可重复方法
连接层       MCP/连接器      外部数据、上下文或动作
执行层       Tool            读取、编辑、运行、浏览或调用
分发层       Plugin          分发多种能力的组合包
```

真实产品中这些层可能重叠，但它们回答的是不同的设计问题：

| 层 | 它贡献什么 | 它本身不会授予什么 |
|---|---|---|
| Skill | 某种可重复任务或工作流的指令与支持资源 | 权限、外部访问，或该方法在此环境中有效的证明 |
| MCP 服务器 / 连接器 | 通往外部工具、资源、上下文或动作的桥梁 | 认证、每项动作的审批，或安全的数据边界 |
| Tool | 读取文件、运行命令或调用 API 之类可观察操作 | 使用它的理由、使用授权，或结果正确的证据 |
| Plugin | 可组合多种能力的分发与组合包 | 自动授权，或其中每个组件都可用的保证 |

对于应当每次都以确定方式执行的重复逻辑，脚本通常更合适；稳定的输出形状更适合模板；只需在特定情形阅读的背景知识更适合文档。方法本身会反复出现、但仍需要依上下文判断时，Skill 才真正有价值。

## 2. 按限制范围的顺序选择

安装或启用任何能力前，按以下顺序思考：

1. 判断任务是否已有清晰协议；没有，就先澄清任务。
2. 如果同一方法反复出现，而且人们经常漏步骤，再考虑 Skill。
3. 如果任务需要外部数据或外部动作，再问连接器或 MCP 服务器是否真的必要。
4. 如果转换是确定性的，优先使用脚本。
5. 如果多种能力必须一起交付，再把 Plugin 当作分发层考虑。
6. 只有这之后，才决定是否安装、认证或开放额外权限。

这个顺序故意保守。大型目录会让任务看似更有能力，却让实际的依赖和权限图更难看清。

## 3. 从任务缺口开始，而不是从 Skill 名字开始

采用候选项前，书面回答每一个问题：

- **任务缺口：** 缺少的是稳定方法、确定性脚本、外部连接，还是任务本身还没定义？
- **触发与排除：** 哪些输入应触发该能力？哪些相似请求不得触发，或必须由其他 Skill 处理？共享关键词并不够。
- **来源与版本：** 另一位审查者能否检查 URL、固定 commit、版本或归档 hash 与库存日期？
- **许可证与依赖：** 仓库许可证是否覆盖目标文件？NOTICE 文件、嵌套资产和运行时依赖是否已盘点？
- **权限与副作用：** 它能读取或写入什么？是否需要网络或账户？能否发送、发布、删除、修改，或以其他方式改变外部系统？
- **验证与维护：** 隔离测试能否覆盖正例、边界、失败和迁移案例？谁来审批、负责、备份、更新，并演练回滚？

外部目录条目数量不是质量指标。自动化包同样可能带来账户、网络和第三方服务风险；每个候选项都要依据自身证据审查。

### Plugin 包含什么，以及支持到哪里为止

官方 [Plugins 文档](https://learn.chatgpt.com/docs/plugins.md) 把 Plugin 描述为一个可安装的能力包，其中可以包含 Skills、Connectors 或两者。一个 Connector 可由 MCP 服务器支持，为外部系统提供工具、共享信息或动作。因此 Plugin 是分发和组合层，不是授权许可。

在 2026-08-09 检查的官方支持说明中，Plugins 列为支持 ChatGPT Chat/Work 的 web、desktop 和 mobile；ChatGPT desktop 应用中的 Codex；以及 Codex CLI 的 Plugin 浏览器。它没有列出 IDE 扩展支持 Plugins。移动端 Chat/Work 可用，不代表移动客户端与桌面端拥有相同的目录浏览或安装工作面。

把产品与连接状态视为一条需要分别取证的链：

```text
产品支持 → 账户或组织授权 → Plugin 安装
→ 连接器认证 → 新会话 → Skill/Tool 可见
→ 实际调用 → 外部结果验证
```

每个箭头都是独立断言。官方 Plugin 记录还说明，“Sign in with ChatGPT”并不会自动授予 Plugin 数据访问或批准动作；请求的权限仍需单独审查和批准。当前来源记录将这些边界关联到 `OF-015`、`OF-016`、`UF-001`、`UF-003` 和 `LB-002`；在改变受影响章节或实验前，先查看[事实影响登记表](../../docs/governance/fact-impact-registry.yaml)。

2026-08-10 检查的官方 Skills 和 Plugins 材料还将自动匹配与显式选择描述为不同入口：ChatGPT 使用 `@` 提及，Codex 使用 `$` 提及；它把安装后的新 chat 或 CLI 会话列为流程的一部分。这些是易变产品事实，不是 Skill 自动附带的权限。一次本地检查应记录工作面、会话、精确调用字符串、加载资源、行为输出和结果验证。本仓库没有收集此类运行时记录，因此相关状态仍是 `not_observed`。

## 4. 采用前审查包

安装前，产出一份 `skill-adoption-decision.md` 记录，而不是写一句“已检查许可证”就结束。最低应记录：

```text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
```

下面四种决策值描述的是采用过程，不是项目内容工件的状态：

| 决策 | 含义 | 允许你说什么 | 不允许你说什么 |
|---|---|---|---|
| `recommendation-only` | 任务匹配看似合理；继续只读审查或隔离试验 | “值得进一步审查” | “已批准安装”或“可以使用” |
| `blocked` | 缺少许可证、NOTICE、版本、依赖、权限或回滚证据 | “暂不采用；以下条件可解除阻塞” | “先安装，之后再补记录” |
| `approved-to-install` | 版本、目标范围、备份、回滚和审批点已经明确且获接受 | “可在这个范围内安装” | “已安装”或“已验证” |
| `installed-candidate` | 目标路径与安装记录可观察，但行为与采用审查仍未完成 | “存在一个隔离安装候选项” | “团队已采用”或“生产就绪” |

项目的 `draft`、`candidate`、`verified` 和 `production-ready` 标签仍与这些采用决策分开。GitHub 页面可访问，不能证明许可证清晰；manifest 存在，不能证明工具调用成功。

### 五种很容易混淆的状态

| 状态 | 最低证据 | 它不能证明什么 |
|---|---|---|
| 文件存在 | 固定版本中的路径、manifest 条目、库存或 hash | 当前工作面能够发现它 |
| 已发现 | 当前工作面的可见列表或名称解析记录 | 本会话加载了它 |
| 已加载 | 新会话中的资源或指令证据 | 团队已经采用它 |
| 已采用 | 声明范围中含有它的所有者与审批记录 | 行为已验证 |
| 已验证 | 声明环境中的正例、边界、失败和迁移证据 | 另一个账户、入口或版本具有同样行为 |

安装也是可观察动作。目标路径和成功安装日志可以支持 `installed-candidate`，却不能跳过发现、加载、采用或行为验证。

### 两个采用决策示例

- **推荐项：** S05 的 `code-review-and-quality` 是合并审查任务中一个合理的 `recommendation-only` 候选。来源为 `https://github.com/addyosmani/agent-skills` 的本地归档，SHA-256 证据为 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`，且有仓库级 MIT 信号。触发条件是固定 diff 和审查请求；它不应只因生成新功能或审查基线未定义就触发。嵌套依赖、目标 Skill 的完整资产集、实际权限和回滚仍未审查，因此正确下一步是只读审查或离线隔离试验，不是批准安装。所有者为 Prysai LLM Playbook 维护组。
- **阻塞变体：** S06 的 `webapp-testing` 必须保持 `blocked`。它来自 `https://github.com/composio-community/awesome-codex-skills` 的本地归档，SHA-256 为 `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`。库存确认根目录 Apache-2.0 信号，但没有确认每个嵌套 Skill、脚本与资产都具有一致许可证或 NOTICE 覆盖。如果目标安装路径、配置备份与恢复检查也不清楚，存在 `SKILL.md` 还不够。只有完成逐项许可证审查并具备可演练回滚，才能解除阻塞。在此之前不要下载、安装，或把它描述为已发现或可用。

## 5. 组合能力，不要叠加能力

有用组合通常是：

```text
任务协议 → 领域方法 → 工具或连接 → 证据审查
```

对于低风险营销实验，任务协议定义目标与限制，产品上下文方法提供受众和定位，分析工具记录决策所需数据，Evidence Review 则检查事件是否真的发生。打开十个重叠 Skill，往往不如使用一种方法与一条清晰协议那样容易理解路由和上下文。

## 6. 组合前先交接

当一种能力把工作传给另一种能力时，使用同一组交接字段：

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

领域 Skill 负责它的方法；Task Protocol 负责执行边界；Evidence Review 检查已有断言；Workflow Orchestrator 负责阶段和检查点。一个 Skill 不会因为被调用就获得另一个 Skill 的权限，也不应递归启动完整编排。

## 7. 实验：比较三种能力组合

### 准备

选择一个本地、低风险、可逆任务。准备任务协议、两个固定版本的候选 Skill，以及一个会要求外部连接的模拟选项。其中一个候选项适合继续隔离审查；另一个应因许可证、NOTICE 覆盖或回滚不清而被拒绝。不要上传真实数据、发送消息、写入第三方服务或认证外部账户。为每种组合分配 `run-id`，同时保持任务文本与验收量表不变。

### 任务

为同一任务设计三种方式：

1. 只使用清晰任务协议；
2. 任务协议加一个领域 Skill；以及
3. 任务协议、领域 Skill 加外部连接。

对每个候选 Skill，先完成采用前审查包。本实验只做只读审查：不要安装、认证或启用团队级配置。比较输出质量、耗时、权限范围、验证成本和副作用；说明额外能力何时带来净收益，何时只增加复杂度。

### 证据

保存三种方式、各自 `run-id`、两份 `skill-adoption-decision.md`、依赖和权限表、许可证发现、模拟或实际输出、验证结果，以及明确的“未执行外部动作”清单。一条通过记录必须让来源与版本可检查；将许可证结论指向实际文件；命名安装、备份与回滚目标；识别所有者和审批点；覆盖正例、边界、失败和迁移行为；并保留不需要额外连接的基线。模拟调用必须标为模拟，不能报告为成功运行时调用。

### 复盘

记录推荐和拒绝候选项的决策值及原因。解释需要什么证据，才能把候选项从 `recommendation-only` 或 `blocked` 移动到下一状态。对每一项观察，标明它证明的是文件存在、发现、加载、采用还是验证；绝不以早期状态替代后期状态。

## 刻意失败与边界案例

为任务给出三个重叠 Skill，其中一个要求外部上传，而任务实际只需要本地整理。再加入一个候选项：其仓库可访问、`SKILL.md` 也存在，但许可证或回滚不清楚。

学习者通过的条件是：识别重叠性，拒绝不必要权限，将不清楚候选项标记 `blocked`，并保留只使用任务协议或一个 Skill 的基线。

## 迁移

把四层模型应用到研究工作流和产品报告工作流。对每一个，识别哪种能力是方法、哪种是连接、哪种确定性转换可以是脚本。

## 来源与维护边界

| 事实或边界 | 来源 | 访问日期 | 适用范围 | 负责人 / 下次复核 |
|---|---|---:|---|---|
| 作为任务或工作流指令及支持资源的 Skills，包括显式选择 | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) 与[事实刷新记录](../evidence-library-ZH.md#source-notes) | 2026-08-09 | 访问当日的官方产品描述；不是某个 Skill 在此处已启用或加载的证明 | `facts-maintainer` / 2026-09-09 |
| Plugin 的组合、支持工作面、安装、连接器认证和独立审批 | [Plugins](https://learn.chatgpt.com/docs/plugins.md) 与[事实影响登记表](../../docs/governance/fact-impact-registry.yaml) | 2026-08-09 | 官方支持说明；目录内容与账户或组织访问可能变化 | `facts-maintainer` / 2026-09-09 |
| MCP 服务器、暴露的工具/资源/提示词，以及工具允许/拒绝或审批配置 | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | 官方 Codex 宿主配置；服务器的认证、工具与组织策略仍须分别检查 | `facts-maintainer` / 2026-09-09 |
| 有副作用的连接器或 MCP 动作可属于审批边界 | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | 官方审批模型；不是本仓库当前运行时配置 | `facts-maintainer` / 2026-09-09 |
| 与符号链接和显式 Skill 调用有关的发现症状 | [Codex 现场研究](../evidence-library-ZH.md#source-notes) | 2026-08-09 | 公开用户报告；没有本地复现或官方根因声明 | `curriculum-maintainer` / 2026-09-09 |
| 候选归档库存与许可证信号 | [Skill 候选目录](../evidence-library-ZH.md#source-notes) 与[资产登记表](../evidence-library-ZH.md#source-notes) | 2026-08-09 | 项目库存与审查边界；不是批准安装任何外部 Skill | `source-maintainer` / 2026-11-09 |

Skill、Plugin、连接器、MCP、manifest、认证和调用细节都可能变化。官方页面或当前工作面发生变化时，先刷新第一方记录，再审查事实影响登记表、本章、相关 Labs、Skills、评测 fixture 和站点路径。将官方产品描述、社区症状和本地运行时证据写在不同句子中。

## 验收清单

- [ ] 我能用自己的话区分 Skill、Plugin、MCP 服务器、连接器、Tool、脚本、模板和文档。
- [ ] 我能说明候选项的任务缺口、触发条件、排除条件、来源版本、许可证、依赖、权限、副作用、所有者与回滚。
- [ ] 我能让一个候选项保持 `recommendation-only`，并在许可证或回滚不清时将其标为 `blocked`，而不是先安装。
- [ ] 我能区分文件存在、发现、加载、采用和行为验证。
- [ ] 我能在输入、验收和证据边界固定时，比较仅协议的基线与增加能力后的组合。
- [ ] 我能说明哪些外部动作没有执行，以及在声称运行时成功前需要什么证据。
- [ ] 我能报告本章仍是 `candidate`，其比较实验仍为 `not_run`，直到存在运行记录和审查证据。

本简体中文译文为可读的 `in-progress` 翻译单元，独立语言审校尚未完成；它不是已验证译文，也不表示课程已经通过学习者验证。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-ZH.md" aria-label="上一章: 第 6 章 · 模型选择不是模型崇拜">← 上一章<br><strong>第 6 章 · 模型选择不是模型崇拜</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-ZH.md" aria-label="下一章: 第 8 章 · 从定义到交付的完整生命周期">下一章 →<br><strong>第 8 章 · 从定义到交付的完整生命周期</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
