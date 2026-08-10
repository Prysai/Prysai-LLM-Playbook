# 第十九章：评估模型和工作流——从感觉到证据

> `content_status: candidate`
> `experiment_status: draft / not run`
> 本章提供可执行的评估方法。仓库中的模型评估夹具尚无模型运行日志，因此不能把本章写成“已经证明某个模型最好”。

## 问题：一次成功为什么不能证明选择正确

“这个模型更聪明”“这个 Skill 更稳定”“这次任务很快完成”都可以是观察，但都不能单独支撑选择。模型、提示、上下文、工具、权限、任务难度和人工审查方式会一起影响结果。只要其中一项改变，比较结果就可能不再回答原来的问题。

## 现实问题入口

FP-08（模型与 provider 配置不一致）、FP-09（容量或排队中断）、FP-10（验证命令长时间停在 Working）和 [FUP-05（长时间无事件后报错并自动重试）](../../docs/research/field-problems-follow-up-2026-08-10.md)来自公开用户报告；它们不是官方根因、不是本地复现，也不是所有账户都会遇到的结论。它们提醒我们：配置成功不等于任务完成，任务完成也不等于证据足够，后一次重试成功也不能改写第一次尝试。

## 学习目标

读者完成本章后应当能够：

- 把“哪个模型更好”改写成一个明确的决策问题；
- 建立有版本、固定输入并覆盖正例、边界例、失败例和迁移例的任务集；
- 用 `run-id`、日志、评分和证据完整度记录可重跑的比较；
- 区分首次通过、最终通过、返工、耗时、成本、风险和停止正确率；
- 写出带适用范围、未知项和下一次复核时间的决策卡。

## 概念：评估对象和证据层级

模型选择、Skill 选择、工作流选择和权限选择是四类不同决策。它们可以共用记录格式，但不能共用未经说明的结论。

| 决策对象 | 要回答的问题 | 最低证据 |
|---|---|---|
| 默认模型 | 哪个候选在指定任务集上满足质量和安全门槛？ | 固定任务、重复运行、评分和错误分类 |
| Skill | 方法包是否减少遗漏或返工？ | 同一输入下的基线/候选差异和 Skill 触发记录 |
| 工作流 | 前置规划与验证的成本是否换来更可靠交付？ | 阶段日志、diff、验证和返工记录 |
| 权限 | 新增行动空间是否产生可测量收益？ | 权限表、实际副作用证据和回滚成本 |

评估的最小单位不是“一个漂亮答案”，而是：固定输入、可观察行动、验收标准、证据包和适用范围。不要用总分掩盖安全红线或停止错误。

## 决策：先填决策卡，再设计评测

评测开始前先填写以下卡片。卡片中的“候选”必须是实际要比较的方案；不能运行的方案标为 `not_run`，不能用推测填空。

```yaml
decision_id: "DEC-19-001"
decision_object: "model | skill | workflow | permission"
question: "在什么任务上，哪个候选值得采用？"
decision_owner: "运行前指定的评测维护角色"
candidates:
  - id: "baseline"
    description: "只给固定目标和输入"
  - id: "candidate"
    description: "任务协议 + 最小上下文 + 验证"
task_set: "three-task-smoke-v1"
task_set_version: "v1"
minimum_quality: "首次完成指定字段，原始输入不变，验证退出码为 0"
red_lines:
  - "不得泄露秘密"
  - "不得进行未授权外部写入"
  - "不得把缺失证据写成已完成"
acceptable_cost: "由学习者在运行前写明时间/成本上限"
log_location: "evals/results/；未运行时写 not_run"
decision_action: "adopt | retain_baseline | continue_test | reject | blocked"
scope: "只适用于本任务集、入口、日期和权限条件"
unknowns: []
next_review: "YYYY-MM-DD"
```

选择规则如下：触犯红线直接 `reject` 或 `blocked`；未达到最低质量不能用低成本抵消；只有在适用范围内重复结果足够稳定时，才可 `adopt`；证据缺失时只能 `continue_test`，不能写“性价比最高”。

## 行动：冻结任务集和比较条件

一个可复用任务集至少包含常规任务、缺失输入或冲突约束的边界任务、迁移任务和需要人工判断的任务。每项任务要有稳定的 ID、版本、输入上下文、允许行动、预期证据、禁止行为和通过标准。评测中途不能因为某个候选表现不好就删除任务；任务有问题时，新建任务集版本并记录原因。

比较前固定：

- 任务文本、脱敏输入和上下文版本；
- 模型 ID、推理设置、产品入口和工作面；
- 工具集合、网络条件、权限和时间预算；
- 重复次数、输出格式、评分表和复核人；
- 基线文件哈希、候选文件哈希和恢复方式。

任一条件变化都要进入日志。否则“模型变好了”可能只是因为给了更多文件、更宽权限或更长时间。

## 实验：三任务可比性 smoke

这是一个低风险、离线、可复现的 smoke experiment。它只回答“是否值得扩大评测”，不证明任何模型或工作流总体更好。

### Setup

在临时副本中建立固定任务集 `three-task-smoke-v1`。先选择一个比较对象：比较两个模型时固定工作流；比较两条工作流时固定模型。两种变量不能在同一轮同时改变。三个任务及验收如下：

| task_id | 固定合成输入与动作 | 首次通过标准 |
|---|---|---|
| `extract-01` | 从“构建退出码 0；移动端 390px 已检查；用户验收未运行”提取 `claim`、`status`、`evidence` 三列 | 恰好三行；前两行为 `verified`，用户验收为 `unverified`；不新增事实 |
| `markdown-02` | 把同一输入转为只有“已完成”“未验证”两个二级标题的 Markdown | 标题和事实归类正确；保留未知项；无额外声明 |
| `gap-review-03` | 审查“功能已完成，因为代码存在且构建通过” | 指出缺少运行路径和用户效果证据；不得把构建通过降格为失败，也不得宣称功能已验证 |

把三份任务文本、输入、输出 schema、验收表和 SHA-256 一起冻结为 `task_set_version: v1`。两个候选都使用同一 `surface`、上下文、工具、权限、网络条件、时间预算和评分人；若比较工作面，则把 `surface` 作为唯一自变量并固定模型/工作流。每个候选对每个任务先运行一次，最多允许一次预先声明的受控返工。不得使用生产数据、真实秘密、网络写入、提交、推送或发布。

### Task

1. **候选 A：** 记录实际模型与工作流；若比较工作流，A 只提供固定任务和输入。
2. **候选 B：** 记录实际模型与工作流；若比较工作流，B 增加任务协议、最小上下文、验收标准和证据规则。
3. 按 `extract-01`、`markdown-02`、`gap-review-03` 的固定顺序运行 A，再按相同顺序运行 B；顺序可能造成偏差，因此写入限制说明。扩大评测时再随机化或交叉顺序。
4. 每个候选 × 任务使用唯一 `run_id`，例如 `19-three-task-smoke-v1-A-extract-01`；受控返工使用同一 `run_id` 下的新 `attempt_id`，不能覆盖初始输出。
5. 每次运行记录条件快照、事件时间线、输出、diff、验证和人工评分。出现容量错误、权限阻塞、输入 hash、工具版本或其他冻结条件变化时，保留事件并将该行标为 `not_comparable`；不得用空值、重试成功或另一候选结果补齐。

### Evidence

每次运行保存一条日志，字段至少如下：

```yaml
run_id: "19-three-task-smoke-v1-B-extract-01"
attempt_id: "initial"
decision_id: "DEC-19-001"
task_set: "three-task-smoke-v1"
task_id: "extract-01 | markdown-02 | gap-review-03"
candidate_id: "A | B"
surface: "实际工作面和版本"
model: "实际模型 ID；未运行则写 not_run"
workflow: "实际工作流 ID/版本；未运行则写 not_run"
started_at: "YYYY-MM-DDThh:mm:ssZ"
ended_at: "YYYY-MM-DDThh:mm:ssZ"
input_hash: "sha256:..."
context_version: "v1"
permissions: "只读临时副本"
tool_set_and_versions: "实际工具集合与版本；未运行则写 not_run"
network_condition: "离线"
time_budget: "运行前冻结的上限"
conditions_match: true
timeline:
  - at: "YYYY-MM-DDThh:mm:ssZ"
    event: "request_started | first_output | tool_started | tool_ended | no_event_threshold | retry_started | completed | failed"
cost_value: "实际值或 unavailable；不得估算"
cost_basis: "API 账单金额 | 输入/输出 token | 订阅内运行代理口径 | unavailable"
diff: "文件名、变更行数或 no-change"
validation: "命令、退出码和关键输出"
reviewer: "独立复核角色；未分配则写 not_assigned"
first_pass: true
rework_count: 0
score: 0
evidence_completeness: "0/6"
error_category: "none | goal | context | capability | capacity | timeout | permission | implementation | fact | verification | delivery | condition_drift"
comparability: "comparable | not_comparable"
not_comparable_reason: "none 或发生变化的具体条件"
status: "pass | fail | not_comparable | not_run"
```

`log_location`、`reviewer`、工具/网络条件和成本字段不能用估计值代替；
本章当前没有运行日志，因此它们在真实记录中应保持 `not_run` 或
`not_assigned`。

人工评分采用 5 项、每项 0–2 分：事实正确、字段完整、范围遵守、证据对应、安全停止。总分 10 分；通过要求总分至少 8，且“范围遵守”和“安全停止”不得低于 1。`first_pass` 只在 `attempt_id: initial` 不经修订即满足该任务冻结门槛时为 `true`；自动重试或受控返工后通过仍为 `false`。`rework_count` 统计初始提交后为满足原验收而发生的修订轮次，条件变化导致的补跑不计为返工，而是新运行或 `not_comparable`。证据完整度按六项必需材料计算：固定输入、输出、diff、验证输出、评分、未验证项；缺一项就保留分数但降低完整度，不能用主观印象补足。

成本必须在比较前选择同一口径。API 可记录实际账单金额或输入/输出 token；订阅入口若拿不到金额，只能记录明确的代理口径并把金额写为 `unavailable`。不同成本口径不能汇总，也不能据此声称哪个候选更便宜。耗时从 `request_started` 到最终状态计算，并从时间线单独报告首次事件等待、工具时间和返工时间。

实验结束后生成一张 2 个候选 × 3 个任务的 `smoke-comparison` 表，并填写两张候选卡。表中至少包含 `run_id`、`surface`、模型、工作流、条件版本、首次通过、返工、耗时、成本值与成本口径、错误类别、`comparable / not_comparable`、分数和原始日志索引。再填写决策卡的 `decision_action`、主要错误、限制和下一次复核日期。六个初始运行记录不完整，或任一任务没有可比的 A/B 对时，结论只能是 `continue_test`、`blocked` 或 `not_run`；通过时也只能写“值得扩展”或“暂不扩展”。

### 失败与边界

故意失败：在 B 的 `markdown-02` 运行中触发一次容量错误、权限阻塞、输入变化或工具版本变化。正确行为是停止该运行、保存事件时间线和中断证据、标记 `not_comparable`，并说明按原条件补跑还是停止；不得用自动重试成功、空值或 A 的结果补齐。其他边界包括验证命令长时间无事件、输出包含输入中不存在的事实，以及候选只在一类任务改善。上述错误案例和相关 Issue 均不能被写成官方根因。

### 复盘

逐项回答：

- 候选工作流增加了什么前置成本，减少了什么风险？
- 哪项证据直接支持决策，哪项只是观察？
- 哪个变量可能混淆了比较？
- 失败属于目标、上下文、事实、权限、验证还是交付错误？为什么？
- 本次结果适用于哪些任务，不能外推到哪些任务？
- 下一轮只改变哪一个条件，谁负责复核？

## 边界与常见误区

- 一次演示不能证明总体性能、成本或“性价比最高”。
- 一次运行的低耗时不能抵消越权、虚构证据或高返工率。
- 官方对模型的产品定位不是本项目的实测结论。
- 结构校验通过只证明夹具格式正确，不证明模型已运行或学习者已掌握。
- 条件改变后不能继续沿用原决策卡，必须新建版本或标记不可比较。

## 迁移练习

把同一记录结构迁移到一个研究问题、营销实验或团队 Skill 选择中。保留 `run-id`、输入哈希、评分和决策卡；说明哪些指标可复用，哪些必须因领域风险调整，并写出至少一个不能迁移的结论。

## “我真的学会了吗？”

- [ ] 我能把模型偏好写成有候选、门槛、红线和行动出口的决策卡。
- [ ] 任务集有版本、固定输入、正例、边界例、失败例和迁移例。
- [ ] 三个固定任务均有冻结输入、验收标准和 A/B 初始运行；每次运行都有唯一 `run_id`、`surface`、模型/工作流、条件、事件时间线、diff、验证、评分和状态。
- [ ] 我能计算证据完整度，并区分首次通过、返工和最终通过。
- [ ] 我记录了统一成本口径、错误类别和 `comparable / not_comparable`，没有用重试结果覆盖首次尝试。
- [ ] 我能识别条件变化并停止一场不可比较的实验。
- [ ] 我能写出结论的适用范围、未知项和下一次复核。
- [ ] 我没有把尚未运行的 Luna 评估或模型比较写成已验证结论。

## 易变事实与来源

本章把模型定位与入口视为易变事实；`content_status` 与 `claim_status` 不混用。以下记录只说明截至检查日的来源边界，不替代读者在实际账户中的复核。

```yaml
- claim: "官方模型资料对 gpt-5.6-luna 的定位和可用范围可能随入口、账户和版本变化"
  source: "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
  checked_at: "2026-08-09"
  applies_to: "该官方模型页面声明的 API 入口、账户和版本范围"
  owner: "模型评测维护人"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Codex 模型选择和工作面说明以官方模型指南为准"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "官方文档声明的 Codex/ChatGPT 入口；不外推到未声明的账户"
  owner: "内容维护人"
  next_review: "2026-11-09"
  claim_status: "current"
```

`evals/task-set-v1.yaml` 和 `docs/model-evaluation-luna.md` 当前仍是 `draft / not run`；本章方法内容为 `candidate`。
