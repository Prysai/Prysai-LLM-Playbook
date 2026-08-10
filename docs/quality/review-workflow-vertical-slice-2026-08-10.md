# 贯穿式工作流垂直切片审查

**审查日期：** 2026-08-10
**审查状态：** `candidate`
**审查范围：** 第 2 章、第 8 章、实验 001
**审查方式：** 多智能体只读审查后的本地内容审查；本轮新增内容尚未进行真实学习者走查或 Codex runtime 运行

## 为什么做这次切片

第 7–14 章分别讲了 Skill 选择、阶段、切片、Agent 状态、行动边界和证据审查，但此前没有一份完整填写的任务把这些接口串起来。零基础审查还发现，第 1 章的只读实验进入第 2 章的安全编辑任务时，缺少工作面、基线、允许路径和停止条件的明确过渡。

## 本轮改动

| 文件 | 改动 | 仍未证明 |
|---|---|---|
| [`book/chapters/08-full-lifecycle-workflow.md`](../../book/chapters/08-full-lifecycle-workflow.md) | 增加 Markdown 章节审查的完整案例：目标、非目标、能力取舍、阶段依赖、退出证据、checkpoint、回滚、命令卡、交接、正例/失败例/边界例和诚实交付 | 学习者能否在 fresh context 中独立执行；真实链接检查和人工审查输出 |
| [`book/chapters/02-first-safe-task.md`](../../book/chapters/02-first-safe-task.md) | 增加从只读观察到安全编辑的六项过渡清单和现场恢复决策卡 | 学习者能否不依赖口头补充完成一次受限 diff |
| [`book/labs/lab-001-first-safe-task.md`](../../book/labs/lab-001-first-safe-task.md) | 将实验记录字段与贯穿案例对齐，区分已完成、未完成、证据、阻塞和下一次检查 | 实验本身仍未运行 |

## 证据边界

- 这次改动由静态内容审查推动，不是对 Codex、模型容量、Working 状态或 GitHub 行为的运行时结论。
- 真实用户问题仍以 [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md) 的原始链接、证据等级和复核日期为准；本轮没有新增外部事实。
- 第 2 章和第 8 章继续保持 `candidate`；实验继续保持 `draft` / `not_run`。结构校验通过不能升级为 `verified`。
- 本轮没有执行 commit、push、发布、外部服务写入、依赖安装或浏览器验收。

## 下一步最小检查

1. 在临时、无秘密的 Markdown 项目中按第 8 章案例运行一次，保存 `run-id`、checkpoint、实际 diff、命令输出和未验证项。
2. 让没有阅读本轮审查记录的学习者从第 1 章直接进入第 2 章，检查其能否说出目标目录、目标文件、基线、恢复方式和停止条件。
3. 后续维护改进另行建立易变事实影响注册表，用稳定 `claim_id` 连接来源、章节、实验、评测和站点；不在本轮混入该独立改动。
