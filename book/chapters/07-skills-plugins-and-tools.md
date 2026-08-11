# 第七章：Skill、Plugin、MCP 和工具如何分工

## 本章要解决的问题

“我要用 skill”并不总是正确答案。Skill、Plugin、MCP、connector、脚本、模板和普通文档各自解决不同问题。理解分工，才能少装无关能力、减少上下文负担并控制外部副作用。

## 学习目标

读者完成本章后应当能够：

- 用方法、连接、执行和分发四层模型解释能力分工；
- 从任务目标推导最小有效组合，而不是先安装目录；
- 为 Skill、Plugin 或 connector 检查触发、依赖、许可证、权限和证据。

## 现实问题入口

FP-06 记录了文件 symlink 影响 Skill discovery，FP-07 记录了显式调用和隐式可见列表之间的冲突。它们说明“文件存在”不等于“当前工作面能发现和调用”。入口：[Codex 真实用户问题现场研究](../../docs/research/field-problems-codex.md)。

## 1. 四层能力模型

```text
方法层：Skill —— 告诉 Codex 如何稳定完成一类任务
连接层：MCP/connector —— 把外部数据或动作接入工作流
执行层：工具 —— 读取、编辑、运行、浏览、提交或调用 API
包装层：Plugin —— 把多个能力、配置和资源打包分发
```

脚本更适合确定性、重复性和不应每次重新生成的逻辑；模板更适合固定输出结构；文档适合提供按场景读取的背景知识。

## 2. 选择顺序

1. 先判断任务是否有清晰协议；
2. 如果方法反复出现、容易漏步骤，再选择或创建 skill；
3. 如果需要外部数据或行动，确认是否真的需要 connector/MCP；
4. 如果是确定性变换，优先考虑脚本；
5. 如果多个能力需要一起分发，再考虑 plugin；
6. 最后才决定是否安装或开放额外能力。

## 3. Skill 选择先回答任务缺口

- **任务缺口：** 当前缺的是稳定方法、确定性脚本、外部连接，还是任务本身尚未澄清？
- **触发与不触发：** 哪些输入应触发，哪些相似任务必须让位？不能只看名称是否共享关键词。
- **来源与 revision：** 来源 URL、固定提交/版本或归档哈希、盘点日期是否可复核？
- **许可与依赖：** 仓库许可证是否覆盖目标文件，NOTICE、嵌套资产和运行依赖是否清楚？
- **权限与副作用：** 它需要读取什么、写到哪里、是否联网/认证，会不会发送、发布、删除或改变外部状态？
- **验证与维护：** 是否能在隔离环境覆盖正例、边界例、失败例和迁移例；谁批准、谁维护、如何备份和回滚？

外部目录的数量不是质量指标。大量自动化 skill 还会携带账号、网络和第三方服务风险，必须逐项审查。

### Plugin 的组成和支持面

官方 Plugins 文档把 Plugin 描述为可安装的能力包，可以包含 Skills、Connectors 或两者；Connector 背后可由 MCP server 提供工具、共享信息或外部系统动作。它是“分发和组合层”，不是自动授权。

截至 2026-08-09 的官方支持说明：ChatGPT 的 Chat/Work 可在 web、desktop 和 mobile 使用账户可用的 Plugins；ChatGPT desktop app 中的 Codex 支持 Plugins；Codex CLI 有 Plugin browser；IDE extension 不支持 Plugins。mobile 的 Chat/Work 使用能力不能反推 mobile 具备桌面目录浏览或安装入口。

因此把产品与连接状态写成一条可审查的链：

```text
产品支持 → 账户/组织授权 → Plugin 安装 → connector 认证
→ 新会话 → Skill/工具可见 → 具体调用 → 外部结果验证
```

每个箭头都需要自己的证据。`Sign in with ChatGPT` 共享身份资料也不自动授予 Plugin 数据访问权或批准动作；连接要求的权限仍需单独审查和批准。对应的易变断言是 `OF-015`、`OF-016`、`UF-001`、`UF-003` 和 `LB-002`。如果官方页面或当前工作面改变，先查[事实影响注册表](../../docs/governance/fact-impact-registry.yaml)，再按影响组重审章节、实验、Skill 和评测。

截至 2026-08-10，官方 Skills/Plugins 文档还把自动匹配与显式选择作为两个入口：ChatGPT 使用 `@` 提及，Codex 使用 `$` 提及；安装后通常需要新建 chat 或 CLI session。它们属于易变的产品事实，不是 Skill 自带的权限。本地验证必须分别保存自动匹配证据与显式调用证据，并记录工作面、是否新建会话、实际调用字符串、加载资源、行为输出和结果验证；当前仓库没有这些运行证据时只能写 `not_observed`。

## 4. 安装前审查包

安装前必须产出 `skill-adoption-decision.md`，而不是只写一句“检查过许可证”。最小字段如下：

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

四个决策值的含义是：

| 状态 | 意思 | 允许说什么 | 不能说什么 |
|---|---|---|---|
| `recommendation-only` | 任务匹配初步成立，建议继续只读审查或隔离试用 | “值得继续审查” | “已批准安装/可用” |
| `blocked` | 许可证、NOTICE、revision、依赖、权限或回滚有阻塞项 | “拒绝或暂不采用，并列出解阻条件” | “先安装再补材料” |
| `approved-to-install` | 指定 revision、目标范围、备份/回滚和批准点均已通过 | “可在批准范围安装” | “已安装/已验证” |
| `installed-candidate` | 安装记录与目标路径可复核，仍待行为验证与采用决定 | “隔离安装候选存在” | “团队已采用/生产可用” |

这组值是**采用决策**，不替代项目的 `draft / candidate / verified / production-ready` 内容状态。缺少关键材料时必须是 `blocked`；GitHub 页面能打开，不等于许可证清楚，manifest 存在也不等于工具调用成功。

还要把五个容易混淆的行为状态拆开：

| 行为状态 | 最小证据 | 不能推出 |
|---|---|---|
| 文件存在 | 固定 revision 中的路径、清单或哈希 | 当前工作面已发现 |
| 被发现 | 当前工作面的可见列表或名称解析记录 | 本次会话已加载 |
| 被加载 | 新会话中的资源/指令加载证据 | 团队决定采用 |
| 被采用 | owner 与批准记录明确把它纳入声明范围 | 行为已经验证 |
| 被验证 | 声明环境中的正例、边界、失败和迁移证据 | 其他入口、账户或版本同样成立 |

安装是另一项可观察动作：目标路径出现文件且安装日志成功，只能支持 `installed-candidate`，不能跳过上述任何一项。

### 两个原创示范结论

- **推荐候选：** S05 的 `code-review-and-quality` 可作为“合并前多轴审查”任务的 `recommendation-only` 候选。来源固定为 `https://github.com/addyosmani/agent-skills` 的本地归档，revision 证据为 SHA-256 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`；仓库级 MIT 信号已记录。触发条件是已有固定 diff/基线并要求审查，不触发于生成新功能或没有比较基线的泛化请求。依赖、目标 Skill 的嵌套资产、实际权限和回滚尚未逐项审完，所以这里只推荐继续只读审查和无网络隔离试用，不批准安装。owner 为 Field Guide 维护组。
- **拒绝变体：** S06 的 `webapp-testing` 来源固定为 `https://github.com/composio-community/awesome-codex-skills` 的本地归档，revision 证据为 SHA-256 `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`。即使目录中存在 `SKILL.md`，它也应保持 `blocked`：现有台账只确认根目录 Apache-2.0 信号，不能证明嵌套 Skill、脚本和素材的许可/NOTICE 一致；若目标安装路径、配置备份与移除后恢复检查也未写清，更不能靠“文件存在”推进安装。解阻需要逐项许可结论和可演练回滚；在此之前不下载、不安装、不声称已发现或可用。

## 5. 组合而不是堆叠

合理组合通常是：

```text
任务协议 → 领域方法 → 工具连接 → 证据审查
```

例如做一次低风险营销实验：任务协议定义目标与边界，产品上下文提供受众和定位，分析工具记录决策需要的数据，证据审查检查事件是否真的触发。把十几个彼此重叠的 skill 同时打开，可能让路由和上下文都变得不清楚。

## 6. 先交接，再组合

默认组合的交接字段保持统一：

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

领域 Skill 只负责自己的方法；Task Protocol 负责执行边界；Evidence Review 负责审查已有声明；Workflow Orchestrator 负责阶段和 checkpoint。一个 Skill 不能因为被调用就获得另一个 Skill 的权限，也不能递归启动完整编排。

## 7. 实验：三方案对照

### Setup

选择一个本地、低风险、可回滚的任务，准备任务协议、两个固定 revision 的候选 Skill，以及一个需要外部连接的模拟方案。两个候选中必须有一个可推荐继续隔离试用，另一个因许可证/NOTICE 或回滚不明而拒绝采用。外部连接只做静态审查或测试账号演练，不上传真实数据、不发送消息、不写入第三方服务。为三种能力组合分别生成 `run-id`，保持任务文本和验收标准不变。

### Task

为同一个任务设计三种方案：

1. 只用清晰任务协议；
2. 任务协议 + 一个领域 skill；
3. 任务协议 + 领域 skill + 外部连接。

先为两个 Skill 各写一份安装前审查包，本轮只读审查，不安装、不认证、不启用团队环境。再比较结果质量、执行时间、权限范围、验证成本和副作用，写出在什么条件下额外能力是净收益，什么条件下只是复杂度。

### Evidence

保存三份方案、`run-id`、两份 `skill-adoption-decision.md`、Skill/工具/连接依赖、许可证和权限表、实际或模拟输出、验证结果和未执行的外部动作清单。通过条件是：来源与 revision 可复核；许可证结论指向实际文件；安装/备份/回滚目标具体；批准点与 owner 明确；行为计划覆盖正例、边界例、失败例和迁移例；能解释每项能力为何存在，并保留不依赖额外连接的基线。模拟调用必须标记为模拟，不能写成运行成功。

### Reflection

记录推荐候选和被拒候选各自的决策值与原因，说明未来从 `recommendation-only` 或 `blocked` 前进时需要补什么证据。逐项标注你观察到的是文件存在、被发现、被加载、被采用还是被验证，不允许用前一状态代替后一状态。

## 故意失败/边界实验

给任务同时启用三个重叠的 Skill，其中一个要求外部上传但任务只需要本地整理；再提供一个“仓库可访问、Skill 文件存在，但许可证或回滚不明”的候选。通过标准是学习者能指出冗余、拒绝不必要权限，把不明候选标为 `blocked`，并保留一个只用任务协议或单个 Skill 的基线。

## 迁移练习

把四层模型迁移到一个研究流程和一个产品报告流程，分别说明哪些能力是方法、哪些是连接、哪些可以用确定性脚本替代。

## 来源与更新提示

Skill、Plugin、connector 和 MCP 的可用范围、manifest 和调用方式属于易变事实。以[官方 Codex 基线](../../docs/research/openai-codex-baseline.md)、[本轮事实刷新记录](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)和[Skill 候选台账](../../docs/sources/skill-candidate-catalog.md)复核，不把目录宣传语、安装成功或登录状态当成验证证据。

## 本章验收

学习者能用自己的话区分 Skill、Plugin、MCP、connector、工具、脚本和模板；能提交包含全部固定字段的安装前审查包；能让一个候选保持 `recommendation-only`、让许可或回滚不明的候选正确 `blocked`；能区分文件存在、被发现、被加载、被采用和被验证，并为最小组合安排批准、行为验证、owner 与回滚。

<!-- chapter-navigation:start -->
<hr>
<nav aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection.md" aria-label="上一章：第 6 章 · 模型选择不是模型崇拜">← 上一章<br><strong>第 6 章 · 模型选择不是模型崇拜</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow.md" aria-label="下一章：第 8 章 · 从定义到交付的完整生命周期">下一章 →<br><strong>第 8 章 · 从定义到交付的完整生命周期</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
