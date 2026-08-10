# 实验 009：工程生命周期对照

---
id: lab-009-engineering-lifecycle
title: "比较直接实现与完整生命周期"
level: L3
domain: engineering
goal: "理解定义、计划、构建、验证、审查和交付的价值"
setup: "一个小型、低风险、可回滚的本地功能和一份能记录变更、测试与交付证据的项目副本"
task: "用直接实现与完整生命周期两条工作流完成三个固定低风险 smoke 任务，比较首次通过、返工、耗时、成本口径、错误类别和证据；条件漂移时标记 not_comparable。"
evidence:
  - "两个候选乘三个任务的 run_id、surface、模型/工作流、条件快照和事件时间线"
  - "首次通过、返工、耗时、成本口径、错误类别、comparable/not_comparable、diff 和检查输出的对照表"
  - "生命周期中最有价值检查点的理由"
failure_variant: "让一个运行发生容量错误、权限阻塞、输入变化、工具版本漂移或长时间无事件；保存中断证据并标记 not_comparable，不用自动重试结果补齐首次运行。"
reflection: "哪项前置定义减少了返工？哪个检查点最有价值？何时应停止而不是继续构建？"
status: draft
last_verified: "未运行；待运行"
transfer_task: "把定义—计划—构建—验证—审查—交付检查点迁移到一个新的可回滚工程或数据整理任务。"
transfer_domain: "软件工程、数据处理、自动化维护"
transfer_evidence: "保存两次运行的 run-id、输入、diff、测试或检查输出、返工记录、审查结论、未验证项和回滚点。"
transfer_limitations: "小功能对照不能量化所有项目的成本收益；没有真实运行、集成环境或发布证据时，不得宣称功能已验证。"
---

## 前置条件

- 选择一个不涉及生产系统、真实用户数据或外部发布的小功能。
- 建立可回滚副本，并准备同一组输入和验收标准用于两次对照。
- 先定义允许修改的文件和禁止的外部副作用；不使用秘密或生产凭据。
- 固定一个实际可用的 `surface`、模型、工具及版本、权限、网络条件、时间预算和成本口径；若要比较模型，则固定工作流；若要比较工作流，则固定模型。

## 任务

建立 `three-task-engineering-smoke-v1`，让两个候选完成同样三个任务：

```text
构建命令退出码为 0。
移动端检查在 390px 完成。
尚未进行真实用户验收。
```

1. `extract-01`：从一份三行合成验收记录中提取 `claim`、`status`、`evidence`；
2. `markdown-02`：把同一记录转换为包含“已完成”和“未验证”的 Markdown；
3. `gap-review-03`：审查“代码存在且构建通过，所以功能已验证”的证据缺口。

为每项冻结任务文本、合成输入、输入 hash、输出格式和首次通过标准。候选 A 是“只给固定目标和输入的直接实现”，候选 B 是“任务协议 + 定义—计划—构建—验证—审查—交付”；每个候选对每项做一次初始运行，最多一次预先允许的受控返工。每次运行前恢复同一基线。

第二次执行至少经过：定义、计划、构建、验证、审查和交付；每一阶段记录输入、决策、输出和停止条件。

运行顺序固定为 A 的三个任务后再运行 B 的三个任务，并把顺序偏差写入限制。这个最小 smoke 只决定“值得扩展”“暂不扩展”或“证据不足”，不能得出总体最好或性价比最高。

## 观察与记录的证据

保存六个初始运行及受控返工的原始输出、diff、命令和检查输出。每次运行至少使用以下记录；没有实际值时写 `unavailable` 或 `not_run`，不能估算：

```yaml
run_id: "lab-009-v1-A-extract-01"
attempt_id: "initial | rework-01"
task_id: "extract-01 | markdown-02 | gap-review-03"
candidate_id: "A | B"
surface: "实际工作面和版本"
model: "实际模型 ID"
workflow: "direct | lifecycle-v1"
conditions:
  input_hash: "sha256:..."
  context_version: "v1"
  tool_set_and_versions: "实际值"
  permissions: "本地临时副本"
  network: "offline"
  time_budget: "运行前填写"
timeline:
  - at: "YYYY-MM-DDThh:mm:ssZ"
    event: "request_started | first_output | tool_started | tool_ended | no_event_threshold | retry_started | completed | failed"
first_pass: true
rework_count: 0
elapsed: "实际墙钟时间"
cost_value: "实际值或 unavailable"
cost_basis: "账单金额 | token | 订阅内运行代理口径 | unavailable"
error_category: "none | goal | context | capability | capacity | timeout | permission | implementation | fact | verification | delivery | condition_drift"
comparability: "comparable | not_comparable"
not_comparable_reason: "none 或变化条件"
validation: "命令、退出码和关键输出"
status: "pass | fail | not_comparable | not_run"
```

`first_pass` 只表示初始输出未经修订即满足冻结标准；自动重试或返工后通过不能改回 `true`。`rework_count` 只统计为满足原标准而修订的轮次。两个候选必须使用同一成本口径；金额不可见时不得据代理值推断更便宜。最后生成 2 × 3 对照表并附原始日志索引。若没有运行检查，必须明确记录为未验证，不得用代码看起来合理替代证据。

## 故意失败变体

让 B 的 `markdown-02` 发生一次模拟容量错误、权限阻塞、输入 hash 改变、工具版本漂移或达到预设无事件阈值。保存请求开始、首个事件、最后事件、错误/中断和自动重试时间；先检查工作树、输出和外部副作用，再停止该运行并标记 `not_comparable`。自动重试必须使用新 `attempt_id`，不得覆盖原记录或把后续成功写成首次通过。

这些类别来自公开用户 Issue 所启发的可观察排查场景；本实验没有本地复现对应 Issue，也不能把容量、HTTP 状态、长等待或自动重试写成官方根因。

## 秘密与外部副作用边界

仅允许本地、沙盒、可回滚的构建和测试。禁止提交、推送、发布、删除生产数据、调用付费外部服务或发送外部消息；任何凭据缺失都应记录为阻塞条件。

## 复盘问题

- 哪项前置定义最能减少返工？
- 哪个检查点最早发现了最重要的问题？
- 直接实现的速度优势是否抵消了后续返工成本？
- 哪一行因条件变化而不可比较？为什么不能用重试成功补齐？
- 三任务 smoke 是否足以支持扩大评测？哪些结论仍不能外推？

## 通过标准

- 学习者能说明慢一点的前置定义如何降低后续返工；
- 对照记录覆盖两个候选和三个任务，并包含 `run_id`、`surface`、模型/工作流、条件、事件时间线、首次通过、返工、耗时、统一成本口径、错误类别和最终证据；
- 至少有一项错误分类和一项 `not_comparable` 记录，且没有被空值、重试成功或另一候选结果补齐；
- 能指出生命周期中最有价值的检查点并给出理由；
- 未把构建成功或代码存在伪称为功能已验证；结论只回答是否值得扩展，没有写成总体排名。
