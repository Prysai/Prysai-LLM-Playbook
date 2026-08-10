# Codex: From First Task to Real Work

> Codex：从第一个任务到真实工作。

Codex: From First Task to Real Work 不是一个把 skills 平铺在一起的目录，也不是一份只讲安装步骤的手册。它是一套书籍式、课程式、实验室式的 Codex GPT 学习与实践系统：先让学习者理解 GPT、模型、Codex、上下文、工具、Skill 和 Agent 的关系，再通过实验把理解变成行动，最后把个人方法沉淀成可以评估、复用和更新的团队能力。

它要带领任何人完成一条完整成长路径：从“我听说过 GPT”开始，到能够安全使用 Codex、稳定完成真实任务、理解 Agent 为什么这样行动、选择和设计合适的 Skill，直到能够建立自己的工作系统并帮助团队共同使用。

## 我们要解决的问题

很多人能让 AI 生成一段看起来不错的内容，却不能稳定地让它完成一个真实任务。问题通常不在“不会写一句提示词”，而在于没有形成完整的工作系统：

- 不知道 GPT、Codex、模型、上下文、工具和 skill 分别是什么；
- 不知道什么时候应该问、什么时候应该给文件、什么时候应该让 Codex 先检查；
- 不知道如何把模糊目标拆成可执行任务；
- 不知道如何控制权限、验证结果和处理失败；
- 安装了很多 skills，却不知道它们为什么有用、何时组合、何时不该使用；
- 在个人试验可以成功，却无法变成团队可复用、可审查、可持续更新的流程。

这套学习路径用一条连续主线解决这些问题：

```text
认识 GPT → 认识 Codex → 安全准备 → 表达任务 → 管理上下文
       → 使用工具 → 选择与组合 skills → 理解 Agent 逻辑
       → 计划/执行/验证/交付 → 专业领域实践 → 组织级协作
```

这条路径有两条同时推进的主轴：

- **理解主轴：** 认识 GPT 和模型如何工作，理解上下文、工具、Skill、Agent、权限和验证如何改变结果。
- **能力主轴：** 从小实验开始，逐步练习任务表达、工作流设计、Skill 选择、结果审查和团队治理。

## 产品形态

| 层 | 产物 | 作用 |
|---|---|---|
| 书 | `book/` | 用连贯章节建立概念、方法和判断力 |
| 课程 | 章节中的学习目标与路线 | 让学习者知道先学什么、为什么学 |
| 实验室 | `book/labs/` | 用真实任务练习并产生可检查证据 |
| 能力包 | `skills/` | 把成熟方法变成 Codex 可执行的工作指导 |
| 评测 | `docs/quality/` | 判断内容、skill 和学习结果是否真的有效 |
| 组织规范 | `docs/governance/` | 管理权限、来源、版本、更新和贡献 |

## 这套系统如何判断“学会了”

学习者不能只提交一份看起来完成的输出。每个关键能力都需要解释证据、操作证据、判断证据和审查证据；每个 Skill 都需要触发、边界、失败、来源和新鲜上下文前测。目录数量和安装数量都不是掌握标准。

## 当前状态

当前是 v0.1 的产品地基阶段：六个输入来源已完成目录级审计，22 章书籍结构、12 个实验、真实问题研究、7 个候选 Skill 和 38 项评测夹具已经建立。书籍正文当前以简体中文为主；公开展示页默认英文，可切换中文。章节 19–22、全部候选 Skill 和模型/工作流评测仍需要 fresh-context 前测与运行日志；外部材料不会未经来源、许可证和内容审查直接进入主线。

## 重要边界

- 项目维护者的原创内容与外部来源必须分开记录；组织归属和治理信息见来源台账。
- 模型名称、价格、入口、额度和具体功能属于易变事实，必须带来源和复核日期。
- “GPT-5.6 Luna 性价比最高”目前是需要用可重复评测验证的产品假设，不作为永久结论。
- 任何没有明确许可证的材料都不直接复制进发行版。
- 学会使用 Codex 的标准不是安装了多少 skills，而是能否在明确边界内稳定地产出经过验证的结果。
- 本项目是独立维护的学习与实践项目，不是 OpenAI 官方文档或官方产品页面。

## 文档入口

- [领域词汇](CONTEXT.md)
- [产品章程](docs/charter.md)
- [书籍架构](docs/book-architecture.md)
- [学习模型](docs/learning-model.md)
- [来源与许可证台账](docs/sources/asset-register.md)
- [内容更新与审查](docs/governance/content-lifecycle.md)
- [当前状态源](docs/governance/content-status.yaml)
- [当前状态审查](docs/quality/current-state-review-2026-08-09.md)
- [Skill 质量标准](docs/quality/skill-quality-standard.md)
- [学习与运行评测框架](docs/quality/evaluation-framework.md)
- [评测任务集 v1](evals/task-set-v1.yaml)
- [真实问题研究](docs/research/field-problems-codex.md)
- [书籍目录](book/table-of-contents.md)
- [Codex Coach](skills/prysai-codex-coach/SKILL.md)
- [外部 Skill 候选目录](docs/sources/skill-candidate-catalog.md)
- [展示页](site/README.md)

## 名称说明

当前本地对外拟采用名称为 `Codex: From First Task to Real Work`，中文副标题为“Codex：从第一个任务到真实工作”。GitHub 仓库路径暂保持现有 slug，待名称最终确认后再处理仓库元数据和旧链接迁移；组织归属、维护责任和发行门禁记录在治理与来源文件中，不放进产品标题。
