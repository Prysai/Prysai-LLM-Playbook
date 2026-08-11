<!-- content_id: book-table-of-contents | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: dd08a68 -->

# Codex：从第一个任务到真实工作——书籍目录 v0.2

> 简体中文目录页（`ZH`）。本迁移切片基于现有的
> `book/table-of-contents.md`，保留 22 章、13 个实验、成熟度边界和真实
> 问题研究入口；它不表示章节、实验或运行时验证已经完成六语种迁移。

## 迁移状态与链接规则

- 本页 `content_status` 为 `candidate`；源版本为 `dd08a68`。
- 目录保留 22 条章节记录和 13 个实际实验文件。
- 章节状态为 `candidate`；实验状态为 `draft`，`run_status: not_run`。
- 第 6 章的相关易变断言为 `claim_status: disputed`；第 22 章为
  `claim_status: current | disputed`。
- 已存在的中文入口使用 `-ZH` 文件。第 1 章和 lab-011 已有 `-ZH` 切片；其余
  章节和实验仍在迁移中，链接文字会明确写出这一状态。共享治理、评测和
  研究文件标为 `locale-neutral`。
- 本页不静默跳转到其他语言。凡是本地化目标尚不存在，链接文字都会保留
  迁移状态说明。

## 阅读入口

- [中文项目入口](../README-ZH.md)
- [中文书稿入口](README-ZH.md)
- [中文序言](preface-ZH.md)
- [学习路径契约——locale-neutral](../docs/governance/learning-path.yaml)
- [语言迁移矩阵——locale-neutral](../docs/governance/locale-matrix.yaml)

## 第一篇：从认识 GPT 到第一次安全使用

### 第 1 章：先理解 GPT，再理解 Codex 的工作原理

说明模型如何根据上下文生成，Codex 如何把模型接入工作环境，以及上下文、
工具、Skill、权限和可观察 Agent 闭环如何共同影响结果。**content_status：**
`candidate`

- 章节：[第 1 章·ZH 源文件](chapters/01-gpt-and-codex-ZH.md)
- 实验：[lab-011·ZH 源文件](labs/lab-011-gpt-codex-boundaries-ZH.md)

### 第 2 章：完成第一个安全、可验证的任务

选择低风险任务，写出首次任务协议，设置确认点，并留下交付证据。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/02-first-safe-task.md)
- 实验：[lab-001·迁移中·当前源文件](labs/lab-001-first-safe-task.md)

### 第 3 章：把愿望变成任务协议

明确目标、背景、输入、约束、允许行动、验收、失败处理和交付格式。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/03-task-protocol.md)
- 实验：[lab-002·迁移中·当前源文件](labs/lab-002-task-protocol.md)

### 第 4 章：上下文、权限与 Agent 的行动边界

理解上下文层级、信任边界、沙盒、审批、外部副作用和可观察行为。
**content_status：** `candidate`

- 章节：[第 4 章·ZH 源文件](chapters/04-context-permissions-and-agent-ZH.md)
- 实验：[Lab 007·ZH 源文件](labs/lab-007-action-boundaries-ZH.md)

### 第 5 章：选择正确的 Codex 工作面

学习在桌面应用、CLI、IDE、Cloud 和 Remote 等入口之间选择合适的任务面。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/05-choose-the-codex-surface.md)
- 实验：[Lab 007·ZH 源文件](labs/lab-007-action-boundaries-ZH.md)

### 第 6 章：模型选择不是模型崇拜

用任务集、成本、速度、稳定性和验证比较模型，并检验关于模型定位的假设。
**content_status：** `candidate` · 相关易变断言：`claim_status: disputed`

- 章节：[迁移中·当前源文件](chapters/06-model-selection.md)
- 研究：[OpenAI/Codex 官方基线——locale-neutral 研究](../docs/research/openai-codex-baseline.md)

## 第二篇：从使用者到工作流设计者

### 第 7 章：Skill、Plugin、MCP 和工具如何分工

理解方法层、连接层、执行层和分发层，选择最小有效能力组合。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/07-skills-plugins-and-tools.md)
- 实验：[lab-004·迁移中·当前源文件](labs/lab-004-skill-selection.md)

### 第 8 章：从定义到交付的完整生命周期

覆盖定义、计划、构建、验证、审查、交付和维护，用竖向切片保持可验证。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/08-full-lifecycle-workflow.md)
- 主实验：[lab-013·迁移中·当前源文件](labs/lab-013-l3-vertical-slice.md)
- 支撑实验：[lab-009·迁移中·当前源文件](labs/lab-009-engineering-lifecycle.md)

### 第 9 章：验证、怀疑与恢复

把完成声明拆成断言和证据，处理不确定性、失败和恢复。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/09-verification-and-recovery.md)
- 实验：[lab-003·迁移中·当前源文件](labs/lab-003-evidence-review.md)

### 第 10 章：规划与竖向切片

把大型目标拆成依赖清楚、每步可运行和可检查的交付切片。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/10-planning-and-slicing.md)
- 实验：[lab-002·迁移中·当前源文件](labs/lab-002-task-protocol.md) · [lab-013·迁移中·当前源文件](labs/lab-013-l3-vertical-slice.md)

### 第 11 章：设计一个真正有用的 Skill

处理触发边界、渐进披露、资源、脚本、输出、失败例、评测和版本。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/11-designing-a-skill.md)
- 实验：[lab-005·迁移中·当前源文件](labs/lab-005-design-a-skill.md)

### 第 12 章：Agent 的循环、状态和停止条件

学习观察、计划、行动、反馈、重试、确认和停止；解释行为但不臆测隐藏推理。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/12-agent-loop-and-stop.md)
- 实验：[lab-006·迁移中·当前源文件](labs/lab-006-agent-stop-conditions.md)

### 第 13 章：文件、终端、浏览器与 GitHub 的行动边界

覆盖只读检查、编辑、命令、浏览、提交、推送、外部消息和回滚。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/13-action-boundaries.md)
- 实验：[Lab 007·ZH 源文件](labs/lab-007-action-boundaries-ZH.md)

## 第三篇：技能、工具与专业实践

### 第 14 章：如何发现、安装和审查外部 Skill

从索引走向可信能力：检查来源、许可证、依赖、认证、触发和维护。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/14-discover-and-audit-skills.md)
- 实验：[lab-004·迁移中·当前源文件](labs/lab-004-skill-selection.md) · [lab-005·迁移中·当前源文件](labs/lab-005-design-a-skill.md)

### 第 15 章：研究轨：从问题到可审查知识

收敛研究问题，处理来源、引用、方法、复核、披露和完整性。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/15-research-track.md)
- 实验：[lab-008·迁移中·当前源文件](labs/lab-008-research-question.md)

### 第 16 章：工程轨：从想法到可靠软件

覆盖需求、规格、规划、增量实现、测试、调试、审查、发布和迁移。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/16-engineering-track.md)
- 实验：[lab-009·迁移中·当前源文件](labs/lab-009-engineering-lifecycle.md)

### 第 17 章：营销轨：从产品理解到增长实验

处理产品上下文、受众、定位、内容、转化、测量和归因。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/17-marketing-track.md)
- 实验：[lab-010·迁移中·当前源文件](labs/lab-010-product-context.md)

### 第 18 章：内容、设计、数据与自动化轨

按任务能力簇使用外部生态，而不是盲目安装全部 Skill。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/18-content-design-data-automation.md)
- 实验：[lab-004·迁移中·当前源文件](labs/lab-004-skill-selection.md)

## 第四篇：从熟练使用到组织化

### 第 19 章：评估模型和工作流

建立任务集、重复实验、人工评分和错误分类。**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/19-evaluate-models-and-workflows.md)
- 实验：[lab-003·迁移中·当前源文件](labs/lab-003-evidence-review.md) · [lab-009·迁移中·当前源文件](labs/lab-009-engineering-lifecycle.md)
- 评测框架：[locale-neutral 治理文件](../docs/quality/evaluation-framework.md)

### 第 20 章：建立个人 Codex 工作系统

处理项目上下文、记忆、模板、常用流程和复盘。**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/20-personal-codex-work-system.md)
- 实验：[lab-001·迁移中·当前源文件](labs/lab-001-first-safe-task.md) · [lab-010·迁移中·当前源文件](labs/lab-010-product-context.md)

### 第 21 章：建立团队能力系统

覆盖共享 Skill、`AGENTS.md`、权限、评测、审查、贡献和版本。
**content_status：** `candidate`

- 章节：[迁移中·当前源文件](chapters/21-team-capability-system.md)
- 实验：[lab-012·迁移中·当前源文件](labs/lab-012-team-capability-migration.md)

### 第 22 章：持续更新与未来适应

识别易变事实，更新来源，迁移模型，审查工具并删除过时能力。
**content_status：** `candidate` · 相关易变断言：`claim_status: current | disputed`

- 章节：[迁移中·当前源文件](chapters/22-continuous-update-and-future-proofing.md)
- 实验：[lab-008·迁移中·当前源文件](labs/lab-008-research-question.md) · [lab-010·迁移中·当前源文件](labs/lab-010-product-context.md)

## 实验索引与状态边界

仓库中有 13 个实际实验文件。每个实验仍为 `draft`，且
`run_status: not_run`；目录链接只是阅读入口，不是实验或学习结果已经验证
的证据。

| 实验 | 重点 | 状态 | 入口 |
|---|---|---|---|
| lab-001 | 第一个安全任务 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-001-first-safe-task.md) |
| lab-002 | 任务协议 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-002-task-protocol.md) |
| lab-003 | 证据审查 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-003-evidence-review.md) |
| lab-004 | Skill 选择 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-004-skill-selection.md) |
| lab-005 | Skill 设计 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-005-design-a-skill.md) |
| lab-006 | Agent 停止条件 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-006-agent-stop-conditions.md) |
| lab-007 | 行动边界分级 | `draft` · `not_run` | [ZH 源文件](labs/lab-007-action-boundaries-ZH.md) |
| lab-008 | 研究问题 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-008-research-question.md) |
| lab-009 | 工程生命周期 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-009-engineering-lifecycle.md) |
| lab-010 | 产品上下文 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-010-product-context.md) |
| lab-011 | GPT、Codex、工具与 Agent | `draft` · `not_run` | [ZH 源文件](labs/lab-011-gpt-codex-boundaries-ZH.md) |
| lab-012 | 团队能力迁移 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-012-team-capability-migration.md) |
| lab-013 | 可审计的 L3 竖向切片 | `draft` · `not_run` | [迁移中·当前源文件](labs/lab-013-l3-vertical-slice.md) |

## 评测、状态与真实问题研究

- [实验索引——迁移中·当前源文件](labs/README.md)：13 个实际实验文件、等级、领域、迁移焦点和 `lab_status`。
- [内容融合矩阵——locale-neutral 治理文件](../docs/content-matrix.md)：能力映射，以及主题重复时新增的能力。
- [评测框架——locale-neutral 治理文件](../docs/quality/evaluation-framework.md)：内容与能力的验收门槛。
- [学习路径契约——locale-neutral 治理文件](../docs/governance/learning-path.yaml)：等级、主实验、支撑实验和晋级条件。
- [Codex 真实用户问题研究——locale-neutral 研究](../docs/research/field-problems-codex.md)：公开问题入口，不冒充官方根因。
- [真实问题研究索引——locale-neutral 研究](../docs/research/field-problems-index-2026-08-10.md)：统一映射 FP、FP-S、FUP、论坛发现与章节/实验落点。
- [论坛与公开 issue 研究——locale-neutral 研究](../docs/research/field-problems-forums-2026-08-10.md)：可靠可访问的 Stack Overflow API/页面和 GitHub issue 摘要。
- [官方基线研究档案——locale-neutral 研究](../docs/research/openai-codex-baseline.md)：易变断言的来源边界。

L0、L3 和 L6 的独立主实验分别是：[lab-011·ZH 源文件](labs/lab-011-gpt-codex-boundaries-ZH.md)、[lab-013·迁移中](labs/lab-013-l3-vertical-slice.md) 和 [lab-012·迁移中](labs/lab-012-team-capability-migration.md)。
