# Prysai LLM Playbook 评测夹具

`task-set-v1.yaml` 是一组固定的、可重复运行的 Agent 评测任务。文件使用 YAML 1.2 兼容的 JSON 子集，因此仓库内的校验脚本只依赖 Python 标准库，不需要为评测夹具安装 PyYAML。

## 覆盖范围

v1 包含 40 项任务，覆盖以下轨道：

- 概念解释（GPT、Codex、工具、Skill、掌握与证据）
- 模糊需求转任务协议
- Skill 选择与最小组合
- 上下文筛选与不可信外部文本
- 最小权限和破坏性操作边界
- 声明与证据审查
- 研究问题收敛与来源冲突
- 工程规划、回归定位和小步交付
- 营销产品上下文与实验设计
- Markdown、表格和结构化数据转换
- 缺失输入、冲突要求、重复失败和停止行为
- 团队能力包与跨人、跨领域、跨工具迁移
- Skill 路由优先级、所有权边界和 Product Context 写入门槛
- 事实与假设区分、证据范围不足时停止、来源冲突与许可证边界
- Skill 安装确认与回滚，以及带 checkpoint 的团队工作流

每条记录都包含框架字段 `level` 和 `domain`，以及夹具运行所需的 `id`、`track`、`input`、`context`、`allowed_actions`、`expected_evidence`、`forbidden_behaviors` 和 `acceptance_criteria`。

## 校验

在仓库根目录运行：

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_eval_tasks.py
```

脚本检查文件可解析、顶层字段和轨道声明完整、任务数量至少 20、必填字段完整、ID 唯一、`track`、`level` 和 `domain` 使用受控枚举，以及所有验收标准非空。它还要求 Skill 路由与权限覆盖任务 031–038 使用规定的轨道和等级；这只是夹具结构检查，不执行模型，也不把结构校验当作模型评测通过。

## 固定运行协议

模型比较时，运行方应固定任务集版本、任务输入、上下文、模型版本、日期、工具集、权限、网络条件、输出格式和重复次数。每项任务至少重复 3 次，并记录：

- 首次通过率、返工率和停止正确率
- 目标、上下文、实现、事实、权限、验证或交付错误类型
- 平均耗时、成本和证据完整度
- 人工评分：正确性、完整性、清晰度、可维护性和安全性

输出应引用任务 ID，并区分模型输出、工具日志、测试结果、来源和人工判断。一次演示、主观印象或构建成功都不足以推出总体能力或性价比结论。

## 状态边界

夹具本身当前是 `candidate`：结构和标准库校验脚本已提供，但尚未产生模型运行日志。只有在声明的固定条件下完成正例、边界例、失败例和迁移例，并保留独立复核记录后，才能把评测结果称为 `verified`。评测套件不能单独证明任何模型是“总体最好”。

来源边界：任务设计依据仓库内的 [评测框架](../docs/quality/evaluation-framework.md)、[Luna 评测说明](../docs/model-evaluation-luna.md)、[项目术语表](../CONTEXT.md) 和 [项目规则](../AGENTS.md)；没有复制外部 Skill 仓库的内容或资产。

运行结果的建议格式见 [results/README.md](results/README.md)。

## Proposal fixtures outside the formal task set

The following candidate directories are deliberately outside `task-set-v1.yaml`
and the canonical Lab count. They prepare a narrow experiment or responsibility
boundary; a static pass does not create model, learner, or release evidence.

- [Context Packet Builder v1 proposal fixture](candidates/context-packet-builder-v1/README.md) — original fictional material for a possible future context-packet responsibility. It is `proposed / not_run`; no Skill exists, no automatic routing is claimed, and the fixture is not a security-control evaluation.
- [Shift Handoff v1 candidate fixture](candidates/shift-handoff-v1/README.md) — fixed fictional recurring-work briefs for a predeclared model-output receipt study. It is `candidate / not_run`; its packet builder freezes and randomizes 18 prompts for one SHA, and its analyzer refuses synthetic, incomplete, condition-deviating, or manifest-unbound records. It cannot produce an IQ, learning, safety, or productivity claim.
