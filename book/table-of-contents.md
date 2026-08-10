# Codex: From First Task to Real Work 书籍目录 v0.2

> 这是一本学习与实践系统，不是 Skill 目录。目录区分内容成熟度和易变事实状态：章节使用 `draft / candidate / verified / production-ready`；易变断言使用 `current / stale / disputed / removed`。

## 如何使用这份目录

等级、必读章节、主实验、支撑实验、推荐 Skill、评测夹具、证据门槛和晋级条件以[学习路径契约](../docs/governance/learning-path.yaml)为准。本目录负责阅读入口；它不再单独决定等级归属。一个实验可以被多个章节支撑，但只有契约中标为 `primary` 的关系才是该等级的主练习。

## 序：为什么要学习 Codex GPT，而不是只学提示词

说明 GPT、Codex、Skill 和完整能力系统的关系，解释本项目的学习方式、证据标准和安全边界。**content_status：`candidate`**

## 第一篇：从认识 GPT 到第一次安全使用

### 第 1 章：先理解 GPT，再理解 Codex 的工作原理

模型如何根据上下文生成，Codex 如何把模型接入工作环境，以及上下文、工具、Skill、权限和可观察 Agent 闭环如何共同影响结果。**content_status：`candidate`**

文件：[book/chapters/01-gpt-and-codex.md](chapters/01-gpt-and-codex.md) · 实验：[lab-011](labs/lab-011-gpt-codex-boundaries.md)

### 第 2 章：完成第一个安全、可验证的任务

如何选择低风险任务、写首次任务协议、设置确认点和留下交付证据。**content_status：`candidate`**

文件：[book/chapters/02-first-safe-task.md](chapters/02-first-safe-task.md) · 实验：[lab-001](labs/lab-001-first-safe-task.md)

### 第 3 章：把愿望变成任务协议

目标、背景、输入、约束、允许行动、验收、失败处理和交付格式。**content_status：`candidate`**

文件：[book/chapters/03-task-protocol.md](chapters/03-task-protocol.md) · 实验：[lab-002](labs/lab-002-task-protocol.md)

### 第 4 章：上下文、权限与 Agent 的行动边界

上下文层级、信任边界、sandbox、审批、外部副作用和可观察行为。**content_status：`candidate`**

文件：[book/chapters/04-context-permissions-and-agent.md](chapters/04-context-permissions-and-agent.md) · 实验：[lab-007](labs/lab-007-action-boundaries.md)

### 第 5 章：选择正确的 Codex 工作面

桌面应用、CLI、IDE、Cloud、Remote 等入口的任务选择方法。**content_status：`candidate`**

文件：[book/chapters/05-choose-the-codex-surface.md](chapters/05-choose-the-codex-surface.md) · 实验：[lab-007](labs/lab-007-action-boundaries.md)

### 第 6 章：模型选择不是模型崇拜

如何用任务集、成本、速度、稳定性和验证比较模型；如何验证模型定位假设。**content_status：`candidate`** · 相关易变断言：`claim_status: disputed`

文件：[book/chapters/06-model-selection.md](chapters/06-model-selection.md) · 研究：[openai-codex-baseline.md](../docs/research/openai-codex-baseline.md)

## 第二篇：从使用者到工作流设计者

### 第 7 章：Skill、Plugin、MCP 和工具如何分工

理解方法层、连接层、执行层和分发层，选择最小有效能力组合。**content_status：`candidate`**

文件：[book/chapters/07-skills-plugins-and-tools.md](chapters/07-skills-plugins-and-tools.md) · 实验：[lab-004](labs/lab-004-skill-selection.md)

### 第 8 章：从定义到交付的完整生命周期

定义、计划、构建、验证、审查、交付和维护；用竖向切片保持可验证。**content_status：`candidate`**

文件：[book/chapters/08-full-lifecycle-workflow.md](chapters/08-full-lifecycle-workflow.md) · 主实验：[lab-013](labs/lab-013-l3-vertical-slice.md) · 支撑实验：[lab-009](labs/lab-009-engineering-lifecycle.md)

### 第 9 章：验证、怀疑与恢复

把完成声明拆成断言和证据，处理不确定性、失败和恢复。**content_status：`candidate`**

文件：[book/chapters/09-verification-and-recovery.md](chapters/09-verification-and-recovery.md) · 实验：[lab-003](labs/lab-003-evidence-review.md)

### 第 10 章：规划与竖向切片

把大型目标拆成依赖清楚、每步可运行和可检查的交付切片。**content_status：`candidate`**

文件：[book/chapters/10-planning-and-slicing.md](chapters/10-planning-and-slicing.md) · 实验：[lab-002](labs/lab-002-task-protocol.md)、[lab-013](labs/lab-013-l3-vertical-slice.md)

### 第 11 章：设计一个真正有用的 Skill

触发边界、渐进披露、资源、脚本、输出、失败例、评测和版本。**content_status：`candidate`**

文件：[book/chapters/11-designing-a-skill.md](chapters/11-designing-a-skill.md) · 实验：[lab-005](labs/lab-005-design-a-skill.md)

### 第 12 章：Agent 的循环、状态和停止条件

观察、计划、行动、反馈、重试、确认和停止；解释行为但不臆测隐藏推理。**content_status：`candidate`**

文件：[book/chapters/12-agent-loop-and-stop.md](chapters/12-agent-loop-and-stop.md) · 实验：[lab-006](labs/lab-006-agent-stop-conditions.md)

### 第 13 章：文件、终端、浏览器与 GitHub 的行动边界

只读检查、编辑、命令、浏览、提交、推送、外部消息和回滚。**content_status：`candidate`**

文件：[book/chapters/13-action-boundaries.md](chapters/13-action-boundaries.md) · 实验：[lab-007](labs/lab-007-action-boundaries.md)

## 第三篇：技能、工具与专业实践

### 第 14 章：如何发现、安装和审查外部 Skill

从索引到可信能力：来源、许可证、依赖、认证、触发和维护。**content_status：`candidate`**

文件：[book/chapters/14-discover-and-audit-skills.md](chapters/14-discover-and-audit-skills.md) · 实验：[lab-004](labs/lab-004-skill-selection.md)、[lab-005](labs/lab-005-design-a-skill.md)

### 第 15 章：研究轨：从问题到可审查知识

研究问题收敛、来源、引用、方法、复核、披露和完整性。**content_status：`candidate`**

文件：[book/chapters/15-research-track.md](chapters/15-research-track.md) · 实验：[lab-008](labs/lab-008-research-question.md)

### 第 16 章：工程轨：从想法到可靠软件

需求、规格、规划、增量实现、测试、调试、审查、发布和迁移。**content_status：`candidate`**

文件：[book/chapters/16-engineering-track.md](chapters/16-engineering-track.md) · 实验：[lab-009](labs/lab-009-engineering-lifecycle.md)

### 第 17 章：营销轨：从产品理解到增长实验

产品上下文、受众、定位、内容、转化、测量和归因。**content_status：`candidate`**

文件：[book/chapters/17-marketing-track.md](chapters/17-marketing-track.md) · 实验：[lab-010](labs/lab-010-product-context.md)

### 第 18 章：内容、设计、数据与自动化轨

按任务能力簇使用外部生态，而不是盲目安装全部 Skill。**content_status：`candidate`**

文件：[book/chapters/18-content-design-data-automation.md](chapters/18-content-design-data-automation.md) · 实验：[lab-004](labs/lab-004-skill-selection.md)

## 第四篇：从熟练使用到组织化

### 第 19 章：评估模型和工作流

建立任务集、重复实验、人工评分和错误分类。**content_status：`candidate`**

文件：[book/chapters/19-evaluate-models-and-workflows.md](chapters/19-evaluate-models-and-workflows.md) · 实验：[lab-003](labs/lab-003-evidence-review.md)、[lab-009](labs/lab-009-engineering-lifecycle.md) · [评测框架](../docs/quality/evaluation-framework.md)

### 第 20 章：建立个人 Codex 工作系统

项目上下文、记忆、模板、常用流程和复盘。**content_status：`candidate`**

文件：[book/chapters/20-personal-codex-work-system.md](chapters/20-personal-codex-work-system.md) · 实验：[lab-001](labs/lab-001-first-safe-task.md)、[lab-010](labs/lab-010-product-context.md)

### 第 21 章：建立团队能力系统

共享 Skill、AGENTS.md、权限、评测、审查、贡献和版本。**content_status：`candidate`**

文件：[book/chapters/21-team-capability-system.md](chapters/21-team-capability-system.md) · 实验：[lab-012](labs/lab-012-team-capability-migration.md)

### 第 22 章：持续更新与未来适应

识别易变事实、更新来源、迁移模型、审查工具和删除过时能力。**content_status：`candidate`** · 相关易变断言：`claim_status: current | disputed`

文件：[book/chapters/22-continuous-update-and-future-proofing.md](chapters/22-continuous-update-and-future-proofing.md) · 实验：[lab-008](labs/lab-008-research-question.md)、[lab-010](labs/lab-010-product-context.md)

## 评测和状态入口

- [实验索引](labs/README.md)：13 个实际实验文件、等级、领域、迁移焦点和 `lab_status`；
- [内容融合矩阵](../docs/content-matrix.md)：13 个能力映射和主题重复时新增的能力；
- [评测框架](../docs/quality/evaluation-framework.md)：内容和能力的验收门槛；
- [Codex 真实用户问题研究](../docs/research/field-problems-codex.md)：公开问题入口，不冒充官方根因；
- [官方基线研究档案](../docs/research/openai-codex-baseline.md)：易变断言的来源边界。

L0、L3 和 L6 已分别有独立主实验文件：[lab-011](labs/lab-011-gpt-codex-boundaries.md)、[lab-013](labs/lab-013-l3-vertical-slice.md) 与 [lab-012](labs/lab-012-team-capability-migration.md)。
