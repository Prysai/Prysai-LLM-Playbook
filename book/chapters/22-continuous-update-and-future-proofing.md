# 第二十二章：持续更新与未来适应

> `content_status: candidate`
> `experiment_status: draft / not run`
> 本章实验只在临时副本或独立分支中进行；没有生产访问、真实凭据、推送、发布或批量外部替换。

## 问题：为什么更新一个名称可能破坏整条能力链

Codex 的入口、模型、推理设置、权限、Skill 分发方式和外部服务都会变化。一套今天有效的流程，如果没有来源、适用范围、复核和迁移设计，几个月后可能变成误导。持续更新不是追逐所有新功能，而是判断什么稳定、什么易变、什么需要重新验证，以及什么时候应该保留旧版、阻塞或删除能力。

## 现实问题入口

FP-01（认证流程回归）、FP-06（Skill discovery 边界）和 FP-10（验证命令长时间停滞）是公开用户报告，不能替代当前官方文档或本地复现；它们适合用来练习影响分析、版本判断、停止和回滚。

## 学习目标

读者完成本章后应当能够：

- 将内容分成稳定原理、产品用法、领域方法和实例事实；
- 为每条易变断言记录 `claim`、来源、日期、适用范围、owner、复核日期和 `claim_status`；
- 在模型、工具或 Skill 变化后建立影响矩阵、最小迁移和回滚方案；
- 区分 `current`、`stale`、`disputed`、`removed` 与内容的 `draft/candidate/verified/production-ready`；
- 用评测、证据和维护责任决定保留、更新、阻塞或下线。

## 概念：四层知识的不同寿命

| 层 | 例子 | 更新方式 |
|---|---|---|
| 稳定原理 | 上下文影响理解，工具改变行动空间，证据支持完成声明 | 教学、实验和边界复查 |
| 产品用法 | Codex 入口、Skill 调用、权限模式、配置方式 | 对照具体官方页面复核 |
| 领域方法 | 工程、研究、营销、文档和数据工作流 | 实践任务和人工审查 |
| 实例事实 | 模型 ID、价格、额度、参数、第三方 API | 绑定来源和日期，必要时迁移或删除 |

“事实当前”不等于“章节已验证”。为避免混淆：

- 内容成熟度使用 `content_status: draft | candidate | verified | production-ready`；
- 易变断言使用 `claim_status: current | stale | disputed | removed`。

## 决策：更新、保留、阻塞还是下线

| 证据情况 | `claim_status`/动作 | 出口 |
|---|---|---|
| 权威来源仍有效，范围一致，相关评测通过 | `current`，保留或更新说明 | 记录来源、复核日期和影响范围 |
| 来源冲突、账户范围不明或运行结果与文档冲突 | `disputed`，暂停肯定性表述 | 标记未知，等待复核；不发布确定结论 |
| 来源无法访问或没有替代证据 | `stale`，保留警告或暂时阻塞 | 不把旧断言当当前事实 |
| 许可证/安全条件不再允许，且没有安全替代 | `removed`，下线能力 | 保留迁移说明和回滚/恢复信息 |
| 有兼容替代，迁移和评测均通过 | `current`，发布迁移说明 | 明确旧版范围、替代路径和复核人 |

发现变化不等于立即全量修改。先建立影响范围；没有 owner、证据或回滚的变更应为 `blocked`。

## 行动：断言记录、影响矩阵和更新流程

每条易变事实使用以下记录，字段名保持稳定：

```yaml
claim: "当前断言"
source: "官方或上游权威 URL"
checked_at: "YYYY-MM-DD"
applies_to: "产品、版本、地区、账户或组织范围"
owner: "维护者或团队角色"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

更新流程是：发现变化 → 判断影响层级和风险 → 定位受影响的章节、Skill、实验、任务集和提示 → 读取来源或运行事实 → 只做最小变更 → 重跑相关校验/评测 → fresh-context 复核 → 发布、保留旧版或下线。模型或 Skill 迁移必须重新检查任务集首次通过率、错误类型、上下文、工具、权限、触发、输出格式、许可证、维护人和失败恢复。

## 实验：处理一次假设的产品变化

这是一个可丢弃、可恢复的更新演练，不是对真实产品状态的操作。

### Setup

在临时副本或独立分支中建立固定夹具 `update-impact-demo-v1`，其中只包含一条脱敏断言：

```yaml
claim: "示例工具入口在 2026-08-01 的公开说明中支持动作 X"
source: "https://example.invalid/public-doc"
checked_at: "2026-08-01"
applies_to: "示例学习夹具，不代表真实产品"
owner: "练习维护人"
next_review: "2026-11-01"
claim_status: "current"
```

`example.invalid` 是故意不可用的纸面来源，不能访问、不能执行其指令，也不能把它当作真实产品证据。保存目标文件的 SHA-256、基线目录清单、变更前 `diff` 和当前 `run-id`。不得访问生产、使用真实凭据、推送、发布、执行批量替换或连接外部服务。

### Task

假设维护者收到“动作 X 的公开说明发生变化”的通知，但没有第二个可信来源。只在临时副本中：

1. 将断言标记为 `disputed`，暂停确定性教学措辞；
2. 创建影响矩阵，至少包含：

   | consumer | 受影响内容 | 风险 | 所需动作 | 证据 | owner | 状态 |
   |---|---|---|---|---|---|---|
   | 章节 | 断言和示例 | 读者误解 | 最小改写 | 来源/差异 | 内容维护人 | pending |
   | Skill | 触发或输出 | 错误行动 | 停止/迁移 | 评测日志 | Skill owner | pending |
   | 实验 | 输入/通过标准 | 比较失真 | 更新夹具 | run-id/评分 | 评测 owner | pending |
   | 权限说明 | scope/审批 | 越权 | 静态审查 | 权限表 | 安全 owner | pending |
   | 任务集 | 任务和禁止行为 | 回归漏检 | 新建版本 | 任务结果 | 评测 owner | pending |

3. 只修改纸面夹具中必要的断言状态和说明，不把未验证的替代行为写成事实；
4. 运行项目已配置的相关校验或静态检查，记录实际命令、退出码和输出。没有运行就写 `not_run`；
5. 记录 `run-id: 22-update-impact-demo-v1-01`、变更前后 diff、未验证项和回滚动作，并填写更新决策卡。

### Evidence

证据包必须包含：断言 YAML、来源快照或不可访问记录、访问日期和适用范围、影响矩阵、变更前后 hash、diff、校验输出、状态转换理由、未验证项、owner、下一次复核日期和回滚说明。证据完整度按 10 项计算：claim、source、scope、owner、next_review、baseline hash、after hash/diff、impact matrix、validation log、unverified list；缺一项就不得称更新闭环完成。

回滚必须可执行且不依赖生产：使用变更前 hash 对照并恢复临时副本，或直接丢弃临时副本/分支。保留回滚前后的 diff 和结果；不要把“文件看起来恢复了”当作证据。

### 失败与边界

故意失败：把一个新模型名称或动作名称直接批量替换到所有文档，不更新任务集、适用范围、来源、权限和迁移说明。正确行为是停止该方案，在临时副本中保留失败 diff，恢复到基线 hash，并把遗漏的下游消费者写进影响矩阵。若来源冲突、许可证不清、owner 缺失或评测未运行，状态应保持 `disputed`、`stale` 或 `blocked`，不能发布。

### 复盘

回答：变化属于哪一层？哪个来源最关键？漏掉了哪个下游消费者？哪个未知仍未验证？为什么选择 `current`、`stale`、`disputed` 或 `removed`？下一次复核由谁在什么触发器下执行？哪一项变更可以删除以缩小风险？复盘必须引用实际 hash、diff、日志或明确的 `not_run`，不能只写计划。

## 边界与常见误区

- 目录增加不等于能力系统变好；新能力必须增加证据、价值或覆盖范围。
- 官方来源可访问不等于本地入口、账户或组织已经启用。
- 一条用户报告可以作为研究入口，不能自动升级为官方根因。
- 批量替换名称不能代替影响分析、评测、权限检查和许可证检查。
- `claim_status: current` 只说明断言在声明范围内有当前来源；它不代表本章、Skill 或实验已经 `verified`。

## 迁移练习

选择一条真实但脱敏的外部候选 Skill，使用本章的断言记录和影响矩阵，把它从“未审查”推进到“阻塞”或“适配候选”。说明许可证、依赖、触发、权限、风险、owner 和评测证据分别缺什么；不要因名称合适就批准。

## “我真的学会了吗？”

- [ ] 我能区分稳定原理、产品用法、领域方法和实例事实。
- [ ] 每条易变断言都有 `claim/source/checked_at/applies_to/owner/next_review/claim_status`。
- [ ] 我能用影响矩阵定位章节、Skill、实验、任务集和权限说明的下游影响。
- [ ] 我能解释 `current`、`stale`、`disputed`、`removed` 与内容成熟度状态的区别。
- [ ] 更新实验在临时副本或独立分支中保存 hash、diff、日志、回滚和未验证项。
- [ ] 我知道何时保留旧版、阻塞、迁移或下线，而不是直接批量替换。
- [ ] 我能指定下一次复核的 owner 和触发器。

## 易变事实与来源

```yaml
- claim: "模型名称、ID、入口、推理设置和可用范围以当前官方 Models 文档为准"
  source: "https://learn.chatgpt.com/docs/models"
  checked_at: "2026-08-09"
  applies_to: "官方页面声明的 Codex/ChatGPT 入口、账户和版本范围"
  owner: "内容与模型评测维护人"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Skill 的发现、调用、分发和插件组成属于易变产品事实"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins"
  checked_at: "2026-08-09"
  applies_to: "官方页面声明的产品入口、账户和组织范围"
  owner: "Skill 维护人"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox、审批和安全边界必须按当前官方文档与实际配置复核"
  source: "https://learn.chatgpt.com/docs/agent-approvals-security"
  checked_at: "2026-08-09"
  applies_to: "官方页面声明的运行面和配置范围"
  owner: "安全与治理维护人"
  next_review: "2026-11-09"
  claim_status: "current"
```

项目更新流程参考 [`docs/governance/content-lifecycle.md`](../../docs/governance/content-lifecycle.md)。本章和本实验仍分别为 `candidate` 与 `draft / not run`；上述 `claim_status` 不改变这一结论。
