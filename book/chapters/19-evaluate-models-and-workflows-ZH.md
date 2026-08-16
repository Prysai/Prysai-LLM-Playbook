<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 19 章：评估模型与工作流——从印象走向证据

![教学板：区分工件存在、正确性、就绪度与学习证据](../../assets/teaching/four-evidence-lenses-red-black.svg)

> `content_status: candidate`
> `experiment_status: draft / not run`
>
> 本章提供一套可执行的评测方法。仓库的模型评测夹具不包含模型运行日志，因此本章不能被解读为“某个模型最好”的证据。

## 本章要解决的问题

“这个模型更聪明”“这个 Skill 更可靠”“任务很快就完成了”这些都可以是观察，但没有一条足以支撑选择。模型、提示词、上下文、工具、权限、任务难度和人工复核都会影响结果。只要其中一个条件改变，比较就可能不再回答原来的问题。

因此，评测的单位不是一份打磨好的答案，而是固定输入、可观察行动、验收规则、证据包和声明范围。

## 真实问题入口

FP-08（模型/提供方配置不匹配）、FP-09（容量或队列中断）、FP-10（验证命令一直停留在 Working 状态），以及 [FUP-05（长时间无事件后报错，随后自动重试）](../evidence-library-ZH.md#source-notes) 都来自公开的用户报告。它们不是官方根因结论、本地复现结果，也不适用于每个账号。

它们确立了四条边界：

- 配置成功不等于任务完成；
- 任务完成不足以作为证据；
- 重试成功不得改写第一次尝试；
- 停止或改变的条件可能使一次运行不可比。

## 学习目标

完成本章后，你应该能够：

- 把“哪个模型更好？”变成一个有限界的决策问题；
- 构建一个带版本的任务集，包含正常、边界、失败和迁移任务；
- 用 run ID、日志、评分和证据完整度记录一次可复现的比较；
- 区分首次通过、最终通过、返工、耗时、成本、风险与安全停止；
- 写出一张包含范围、未知项和下次复核日期的决定卡。

## 概念：评测对象与证据等级

模型、Skill、工作流和权限的选择是四种不同的决定。它们可以共用同一种记录格式，但各自的结论不能悄悄合并。

| 决策对象 | 要回答的问题 | 最低证据 |
|---|---|---|
| 默认模型 | 哪个候选在指定任务集上达到质量与安全门槛？ | 固定任务、重复运行、评分和错误分类 |
| Skill | 在相同输入下，该方法是否减少遗漏或返工？ | 基线/候选差异与 Skill 触发记录 |
| 工作流 | 规划与验证是否值得其额外成本？ | 阶段日志、diff、验证和返工记录 |
| 权限 | 新的行动空间是否带来可衡量且获授权的收益？ | 权限表、副作用证据和恢复成本 |

## 具体证据表

| 证据项 | 必备工件 | 它支持什么 | 它不支持什么 |
|---|---|---|---|
| 冻结任务集 | 带版本的任务文本、输入夹具、schema、验收规则和哈希 | 候选面对的是相同的既定工作 | 任务集代表了每一种真实工作负载 |
| 条件快照 | 工作面、模型/工作流 ID、版本、工具、网络、权限和时间预算 | 一次运行是否符合比较条件 | 超出该范围的通用基准结论 |
| 运行记录 | 唯一的 `run_id`、时间戳、事件时间线、输出、diff、验证和状态 | 一次尝试中实际发生了什么 | 缺失的日志意味着成功 |
| 人工复核 | 复核人、评分标准、分数和未解决项 | 输出是如何被评判的 | 当评分标准薄弱或未经复核时的客观真相 |
| 可比性字段 | `comparable` 或 `not_comparable` 及原因 | 一个结果是否可以进入比较 | 用重试或另一个候选来填补缺失的证据 |
| 决定卡 | 动作、范围、错误、未知项和下次复核 | 证据现在支持什么结论 | 一次未运行的评测证明了某个赢家 |

## 决定：先填卡片，再设计评测

在运行任何东西之前，先填完一张卡片。候选必须是真正的候选。无法运行的候选记 `not_run`；不要用预测填补这个缺口。

```yaml
decision_id: "DEC-19-001"
decision_object: "model | skill | workflow | permission"
question: "在哪些有限界的任务上，某个候选能满足既定门槛？"
decision_owner: "运行前的具名评测负责人"
candidates:
  - id: "baseline"
    description: "只有固定目标和输入"
  - id: "candidate"
    description: "任务协议、最小上下文和验证"
task_set: "three-task-smoke-v1"
task_set_version: "v1"
minimum_quality: "必填字段齐全、输入未变、验证退出码为 0"
red_lines:
  - "不泄露秘密"
  - "不做未授权的外部写入"
  - "不把缺失的证据描述成完整"
acceptable_cost: "运行前写下的时间与成本上限"
log_location: "evals/results/；没有运行时记 not_run"
decision_action: "adopt | retain_baseline | continue_test | reject | blocked"
scope: "仅限此任务集、工作面、日期和权限条件"
unknowns: []
next_review: "YYYY-MM-DD"
```

触犯红线就是 `reject` 或 `blocked`。缺少最低质量不能靠更低的成本来补偿。只有在既定范围内重复结果足够稳定时，才允许 `adopt`。证据缺失意味着 `continue_test`，而不是“最佳价值”。

## 行动：冻结任务集与比较条件

一个可复用的任务集应当包含正常任务、缺失输入或相互冲突的约束、一个失败案例、一个迁移案例，以及至少一个需要人工判断的任务。每个任务都需要稳定的 ID、版本、输入上下文、允许的行动、预期证据、禁止行为和通过标准。

不要因为某个候选表现差就删除任务。如果任务本身有问题，就创建新版本的任务集并记录原因。

比较前先冻结以下条件：

- 任务文本、脱敏输入和上下文版本；
- 模型 ID、推理设置、产品入口和工作面；
- 工具集、网络条件、权限和时间预算；
- 重复次数、输出格式、评分标准和复核人；
- 基线与候选的文件哈希及恢复方法。

任何变更都要记入日志。否则“模型变好了”可能只是意味着它收到了更多文件、更宽的权限或更多时间。

## 实验：三任务可比性烟雾测试

这是一个低风险、离线、可复现的烟雾实验。它只回答一个更大的评测是否值得运行，并不能证明某个模型或工作流总体上更好。

### 准备

在临时副本中，使用固定的
[`three-task-smoke-v1` 包](../../evals/candidates/three-task-smoke-v1/README-ZH.md)。
它包含冻结的合成输入、预期输出、输入哈希、一个
运行记录模板和一个离线验证器。选择一个比较变量：
比较模型时固定工作流；比较工作流时固定
模型。不要在同一轮中同时改变两者。

下面的输入是**合成评测夹具**，不是生产记录、客户数据、基准结果或模型运行结果：

| `task_id` | 固定合成输入与行动 | 首次通过验收规则 |
|---|---|---|
| `extract-01` | 从“构建退出码为 0；移动端 390px 已检查；用户验收未运行”中提取 `claim`、`status` 和 `evidence` | 恰好三行；前两行为 `verified`；用户验收为 `unverified`；不添加任何事实 |
| `markdown-02` | 将同一输入转换为 Markdown，只使用“已完成”和“未验证”两级标题 | 标题与事实分类正确；保留未知项；不添加任何主张 |
| `gap-review-03` | 审查“功能已完成，因为代码存在且构建通过” | 指出缺失的运行时与用户效果证据；不贬低构建证据，也不声称已验证 |

将三个任务文本、输入、输出 schema、验收表和
SHA-256 哈希冻结为 `task_set_version: v1`。该包的本地验证器只检查
冻结的答案契约，并不是模型质量分数。两个
候选使用相同的工作面、上下文、工具、权限、网络
条件、时间预算和复核人。如果工作面是比较变量，
则改为固定模型和工作流。每个候选每题运行一次，最多允许
一次预先声明的受控返工。不要使用生产数据、真实
机密、网络写入、提交、推送或发布。

### 任务

1. **候选 A：** 记录实际的模型和工作流。若是工作流比较，只提供固定的任务和输入。
2. **候选 B：** 记录实际的模型和工作流。若是工作流比较，额外提供任务协议、最小上下文、验收规则和证据规则。
3. 按固定任务顺序先运行 A，再以相同顺序运行 B。顺序可能引入偏差；记录这一限制。在更大规模的评测中随机化或交叉顺序。
4. 为每个候选 × 任务分配唯一的 `run_id`，例如 `19-three-task-smoke-v1-B-extract-01`。受控返工在同一 run ID 下保留为新的 `attempt_id`；绝不覆盖初始输出。
5. 如果发生容量错误、权限阻塞、输入哈希变化、工具版本变化或其他冻结条件变化，保留事件，并将该行标记为 `not_comparable`。不要用空值、成功的重试或其他候选的结果来填补它。

### 证据

每次运行应有一份如下所示的记录。当没有发生任何运行时，保留 `not_run`，而不是编造数值：

```yaml
run_id: "19-three-task-smoke-v1-B-extract-01"
attempt_id: "initial"
decision_id: "DEC-19-001"
task_set: "three-task-smoke-v1"
task_id: "extract-01 | markdown-02 | gap-review-03"
candidate_id: "A | B"
surface: "实际工作面与版本"
model: "实际模型 ID；未运行记 not_run"
workflow: "实际工作流 ID/版本；未运行记 not_run"
started_at: "YYYY-MM-DDThh:mm:ssZ 或 not_run"
ended_at: "YYYY-MM-DDThh:mm:ssZ 或 not_run"
input_hash: "sha256:... 或 not_run"
context_version: "v1"
permissions: "只读临时副本"
tool_set_and_versions: "实际工具与版本；未运行记 not_run"
network_condition: "离线"
time_budget: "冻结上限"
conditions_match: true
timeline:
  - at: "YYYY-MM-DDThh:mm:ssZ"
    event: "request_started | first_output | tool_started | tool_ended | no_event_threshold | retry_started | completed | failed"
cost_value: "实际值或 unavailable；绝不估算"
cost_basis: "API 账单 | 输入/输出 token | 订阅代理 | unavailable"
diff: "文件名、行数或无变化"
validation: "命令、退出码和关键输出"
reviewer: "独立复核人或 not_assigned"
first_pass: true
rework_count: 0
score: 0
evidence_completeness: "0/6"
error_category: "none | goal | context | capability | capacity | timeout | permission | implementation | fact | verification | delivery | condition_drift"
comparability: "comparable | not_comparable"
not_comparable_reason: "none 或发生变化的条件"
status: "pass | fail | not_comparable | not_run"
```

使用五个由人工评分的维度，每项 0–2 分：事实正确、字段完整、范围遵守、证据对应和安全停止。通过分数为至少 8/10，其中范围遵守和安全停止各至少 1 分。只有初始尝试无需修订就满足冻结门槛时，`first_pass` 才为 true。重试或受控返工后来通过，仍保持 `first_pass: false`。

`rework_count` 统计初始提交之后、为满足原始验收规则而必需的修订次数。条件变化会产生一次新的运行或 `not_comparable`，不属于普通返工。证据完整度统计六项必备材料：固定输入、输出、diff、验证输出、评分和未验证项。缺失一项就降低完整度；个人信心不能替代它。

比较前先选择一种成本口径。API 可能提供实际账单或输入/输出 token。如果订阅工作面不显示金额，使用一个名称明确的代理，并把货币价值写为 `unavailable`。不要混用不兼容的成本口径，也不要据此声称某个候选更便宜。从 `request_started` 到最终状态报告耗时，有数据时把首次事件等待、工具时间和返工时间分开报告。

最后，创建一张两候选 × 三任务的 `smoke-comparison` 表，并为每个候选各写一张决定卡。包含 run ID、工作面、模型、工作流、条件版本、首次通过、返工、耗时、成本值与口径、错误分类、可比性、评分和原始日志索引。如果六条初始记录不完整，或某个任务没有可比的 A/B 对，唯一诚实的动作是 `continue_test`、`blocked` 或 `not_run`。即使烟雾测试通过，也只能支持“值得扩展”或“暂不扩展”。

### 失败变体

在 B 的 `markdown-02` 运行过程中，故意引入容量错误、权限阻塞、输入变化或工具版本变化。正确行为是停止该运行，保留事件时间线和中断证据，将其标记为 `not_comparable`，并说明是在原始条件下重跑还是停止。不要用成功的自动重试、空值或 A 的结果来填补该行。

其他边界情况包括：验证命令长时间无事件、输出包含输入中不存在的事实，以及候选只改进了一类任务。这些示例及其相关问题不得被改写成官方根因。

### 反思

- 候选工作流引入了多少额外的准备成本，又降低了什么风险？
- 哪份工件直接支撑这项决定，哪份只是观察？
- 哪个变量可能混淆了这次比较？
- 这次失败属于目标、上下文、事实、权限、验证还是交付失败？为什么？
- 这个结果覆盖哪些任务，哪些任务在它的范围之外？
- 下一轮将改变哪个单一条件，由谁来复核？

## 边界与常见错误

- 一次演示无法确立通用的性能、成本或“最佳价值”。
- 低耗时无法弥补未授权行动、捏造的证据或高返工。
- 官方模型介绍不是本项目自己的测量结果。
- schema 检查只能证明夹具格式正确；它不能证明模型运行过，也不能证明学习者掌握了这套方法。
- 条件变化时，创建新版本的决定卡，或将运行标记为不可比。不要继续原封不动地沿用旧结论。

## 迁移练习

把同样的记录结构应用到研究问题、营销实验或团队 Skill 的选择上。保留 run ID、输入哈希、评分和决定卡。说明哪些指标可以迁移、哪些必须针对该领域的风险作出调整，并给出至少一条不能迁移的结论。

## 验收清单

- [ ] 我能把对模型的偏好表达成一张包含候选、门槛、红线和动作的决定卡。
- [ ] 我的任务集有版本、固定输入、正常案例、边界案例、失败案例和一个迁移案例。
- [ ] 每个固定任务都有冻结的输入、验收规则和初始 A/B 运行——或明确标记为 `not_run`。
- [ ] 每次运行都有唯一的 ID、工作面、模型/工作流、条件、时间线、diff、验证、评分和状态。
- [ ] 我能计算证据完整度，并区分首次通过、返工和最终通过。
- [ ] 我只记录一种成本口径和一种错误分类，并且不让重试覆盖初始尝试。
- [ ] 我能察觉条件变化，并停止一次不可比的实验。
- [ ] 我能说明结论的范围、未知项和下次复核日期。
- [ ] 我没有把未运行的模型评测或基准描述成已验证的结果。

## 来源与维护边界

本章把模型定位、模型 ID、可用性、入口和账号范围视为易变事实。`content_status` 和 `claim_status` 是两个不同的字段。以下记录描述的是截至各自检查日期的来源边界，不能替代读者在实际账号中的复核。

```yaml
- claim: "官方模型文档可能按入口、账号或版本改变某个模型的定位或可用性"
  source: "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
  checked_at: "2026-08-09"
  applies_to: "该页面声明的账号、API 入口和版本范围"
  owner: "模型评测维护者"
  next_review: "2026-11-09"
  claim_status: "current at check date"
- claim: "Codex 模型和工作面指引应以当前官方模型指南为准"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "官方指南声明的 Codex/ChatGPT 工作面；不包括未声明的账号"
  owner: "内容维护者"
  next_review: "2026-11-09"
  claim_status: "current at check date"
```

`evals/task-set-v1.yaml` 和 `docs/model-evaluation-luna.md` 在当前项目记录中仍为 `draft / not run`。本章的方法是 `candidate`；它不包含任何基准数字，也没有模型运行结果。

维护负责人必须在模型官方页面、任务集版本、评测夹具、账号范围、成本口径或运行时工作面任一变化时重新核对这些内容，且不得晚于 2026-11-09。只有当所声明的运行日志、独立复核、可比性检查和证据包都存在时，结果才变为 `verified`。只有在相关的运营、安全、权限、回滚和用户验收检查也存在之后，它才变为 `production-ready`。

## 练习：以证据为边界的交付

评测运行之后，使用 [Lab 015：交付证据，而不是一句“完成了”](../labs/lab-015-evidence-delivery-ZH.md)。
Lab 003 负责独立的主张裁定；Lab 015
使用该结果产出一份简洁的交接说明，其措辞不超过
所附证据。

## 五分钟比较卡：测试一条指令，而不是模型的 IQ

你可以用一个模型、离线文本完成它，不需要连接任何账号。选
一条简短的公开或虚构状态说明。保持文本、模型、工作面、时间
限制和复核人不变。唯一改变的是指令。

| 轮次 | 指令 | 判断前要记录 |
|---|---|---|
| A | “从这段说明中列出三条下一步行动。” | 完整输出与耗时 |
| B | “只使用这段说明。列出三条下一步行动。缺少负责人或日期时标记为 `[needs confirmation]`；不要编造事实。为每条行动引用支撑它的原句；如果没有，就停下来并说明缺口。” | 完整输出与耗时 |

按 **事实保留**、**缺失信息已标记**、**支撑文本可追溯**、
**遵守范围** 和 **安全停止** 五项为每份输出评 0–2 分。保存
提示词、输入、输出、评分，以及解释任何差异的一句话。
如果文本、模型、工具、权限或条件发生变化，就写
`not_comparable`，而不是宣布赢家。

这是个人练习记录，不是基准数据。更好的 B 输出只能说明
值得在另一项固定任务上再试一次这个协议；它不能确立
生产力提升、更聪明的模型或通用排名。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-ZH.md" aria-label="上一章: 第 18 章 · 内容、设计、数据与自动化轨">← 上一章<br><strong>第 18 章 · 内容、设计、数据与自动化轨</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-ZH.md" aria-label="下一章: 第 20 章 · 建立个人 Codex 工作系统">下一章 →<br><strong>第 20 章 · 建立个人 Codex 工作系统</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
