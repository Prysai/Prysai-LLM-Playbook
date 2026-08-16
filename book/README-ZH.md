<!-- content_id: book-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress -->

# Prysai 大模型实战手册：书稿

> 简体中文书稿入口（`ZH`）。入口、序言、目录、十章、七项实验和一条新手安全路线已有中文候选译文；这不代表整本书已经完成中文或六语言翻译。

<!-- language-switcher:start -->
**语言：** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

导航：

- [返回中文项目入口](../README-ZH.md)
- [中文序言](preface-ZH.md)
- [中文书籍目录](table-of-contents-ZH.md)
- [中文新手安全路线：第一次安全改动](routes/first-safe-change-ZH.md)

这里放 Prysai LLM Playbook 的原创主线书稿。书稿不是六个外部项目的拼接，而是按照学习者的成长顺序重新编排的内容系统。

每一章都要配套：

- 学习目标；
- 关键概念；
- 最小可运行实验；
- 故意失败的实验；
- 迁移任务；
- 验收证据；
- 当前事实与来源；
- 更新状态。

章节草稿在进入主线前必须通过[评测框架（尚未迁移为 `evaluation-framework-ZH.md`，当前原始文件）](../docs/quality/evaluation-framework.md)的最低门槛。通过静态检查或文件检查，不等于章节已经完成运行时、浏览器、模型或读者理解验证。

## 书稿文件结构

| 位置 | 内容 | 当前语言迁移状态 |
|---|---|---|
| `book/chapters/` | 22 章主线章节 | 22 章英文源文件齐全；当前第 1–10 章有简体中文候选译文，独立语言审校仍待完成 |
| `book/labs/` | 18 个实验 | 18 个英文源文件齐全；当前实验 001、002、003、004、007、011、013 有简体中文候选译文，独立语言审校仍待完成 |
| `book/table-of-contents-ZH.md` | 中文阅读目录与章节入口 | 已列出第 1–10 章与七项 Lab 的中文候选入口；其他正文仍在迁移中 |
| `book/routes/first-safe-change-ZH.md` | 中文新手安全路线 | 完整初稿，迁移状态为 `in-progress`；独立语言审校待完成 |
| `book/README-ZH.md` | 本中文书稿入口 | 迁移状态为 `in-progress` |
| `book/preface-ZH.md` | 中文序言 | 迁移状态为 `in-progress` |

“章节正文仍在迁移中”是明确的迁移状态，不是把未翻译文件伪装成中文，也不是对缺失翻译做静默回退。目录页会在每个仍使用原始章节文件的链接文字中保留这一边界。

## 当前阅读入口

如果你是第一次使用这套材料，按这一条候选路径阅读：

第 1 章：先理解 GPT，再理解 Codex（中文版本尚未提供） →
实验 011：GPT 与 Codex 边界（中文版本尚未提供） →
第 2 章：第一个安全、可验证的任务（中文版本尚未提供） →
[第一次安全改动](routes/first-safe-change-ZH.md) →
实验 001：做一次安全的 README 改动（中文版本尚未提供） →
第 3 章：任务协议（中文版本尚未提供） →
实验 002：任务协议（中文版本尚未提供） →
第 4 章：上下文、权限与 Agent 行动边界（中文版本尚未提供） →
实验 007：行动边界（中文版本尚未提供） →
第 5 章：选择正确的 Codex 工作面（中文版本尚未提供） →
第 6 章：模型选择不是模型崇拜（中文版本尚未提供） →
第 7 章：Skill、Plugin、MCP 和工具如何分工（中文版本尚未提供） →
实验 004：选择最小有用能力（中文版本尚未提供） →
第 8 章：从定义到交付（中文版本尚未提供） →
实验 013：完成一个完整的竖向切片（中文版本尚未提供） →
第 9 章：验证、怀疑与恢复（中文版本尚未提供） →
实验 003：审计一条完成声明（中文版本尚未提供） →
第 10 章：规划与竖向切片（中文版本尚未提供）。

这条路线覆盖 40 个课程单元中的 17 个，且所有翻译仍为 `in-progress`。中文目录中的其余章节会明确回退到英文源文件；那是当前状态，不是翻译完成。[`evals/task-set-v1.yaml`（机器可读文件，未做 `-ZH` 副本）](../evals/task-set-v1.yaml)已提交为固定夹具集，但没有把静态定义变成已完成评测。

当前可用的中文实验是实验 001：第一个安全任务（中文版本尚未提供）、实验 002：任务协议（中文版本尚未提供）、实验 003：审计一条完成声明（中文版本尚未提供）、实验 004：选择最小有用能力（中文版本尚未提供）、实验 007：行动边界（中文版本尚未提供）、实验 011：GPT 与 Codex 边界（中文版本尚未提供）和实验 013：完成一个完整的竖向切片（中文版本尚未提供）。它们均为 `draft / not_run`，翻译亦尚未独立审校。

相关入口：

- [学习路径契约（机器可读治理文件，未做 `-ZH` 副本）](../docs/governance/learning-path.yaml)
- [Luna 评估实验（尚未迁移为 `model-evaluation-luna-ZH.md`，当前原始文件）](../docs/model-evaluation-luna.md)
- [官方基线研究档案（尚未迁移为 `openai-codex-baseline-ZH.md`，当前原始文件）](../docs/research/openai-codex-baseline.md)
- [真实问题研究索引（尚未迁移为对应 `-ZH` 文件，当前原始文件）](../docs/research/field-problems-index-2026-08-10.md)

## 阅读和状态边界

书稿章节使用 `draft`、`candidate`、`verified`、`production-ready` 区分内容成熟度；易变事实使用 `current`、`stale`、`disputed`、`removed` 区分事实状态。翻译文件的存在、链接检查通过或文字看起来完整，都不能自动提升原章节的内容状态。

本中文入口只对已列出的中文文件负责。章节、实验、Skill、评测和研究档案仍应以各自文件中的来源、状态和验证证据为准；没有运行日志的评测不能写成已完成，没有本地复现的论坛案例不能写成已确认根因。
