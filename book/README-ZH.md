<!-- content_id: book-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress -->

# Prysai 大模型实战手册：书稿

> 简体中文书稿入口（`ZH`）。入口、序言、目录、22 章、18 项实验、两条新手路线和一组新手提示卡均已有中文候选内容；独立语言审校与学习者运行证据仍待完成。

<!-- language-switcher:start -->
**语言：** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
<!-- language-switcher:end -->

## 先按教材主线阅读

1. [LLM 基础概念](guides/llm-fundamentals-ZH.md)
2. [通用 LLM 首练习](routes/universal-core-foundations-ZH.md)
3. [第一次安全改动](routes/first-safe-change-ZH.md)

英文 Foundation Core 是规范源，中文重译完成并通过独立审校前不在中文主线中伪装可用。
提示卡、语言练习、工作更新和研究核查是主线之后的**可选应用练习**，不替代 LLM 基础课。

导航：

- [返回中文项目入口](../README-ZH.md)
- [中文序言](preface-ZH.md)
- [中文书籍目录](table-of-contents-ZH.md)
- [中文通用 LLM 首练习：安全文字任务](routes/universal-core-foundations-ZH.md)
- [中文新手安全路线：第一次安全改动](routes/first-safe-change-ZH.md)
- [中文新手提示卡：可选应用练习](communication-clinic-ZH.md)
- [中文工作更新六步练习](work-update-practice-loop-ZH.md)
- [中文研究核查六步练习](research-check-practice-loop-ZH.md)

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

章节在进入主线前必须通过评测框架的最低门槛。通过静态检查或文件检查，不等于章节已经完成运行时、浏览器、模型或读者理解验证。

## 书稿文件结构

| 位置 | 内容 | 当前语言迁移状态 |
|---|---|---|
| `book/chapters/` | 22 章主线章节 | 22 章均有简体中文候选译文；独立语言审校仍待完成 |
| `book/labs/` | 18 个实验 | 18 个实验均有简体中文候选译文；独立语言审校与学习者运行记录仍待完成 |
| `book/table-of-contents-ZH.md` | 中文阅读目录与章节入口 | 已列出 22 章与 18 项实验的中文候选入口 |
| `book/communication-clinic-ZH.md` | 中文新手提示卡 | 七张低风险文字练习卡；是起步切片，不代表学习效果已验证 |
| `book/routes/first-safe-change-ZH.md` | 中文新手安全路线 | 完整初稿，迁移状态为 `in-progress`；独立语言审校待完成 |
| `book/README-ZH.md` | 本中文书稿入口 | 迁移状态为 `in-progress` |
| `book/preface-ZH.md` | 中文序言 | 迁移状态为 `in-progress` |

所有中文正文都保留 `in-progress` 状态：这表示文件和同语言路径已经存在，但尚未完成独立语言审校。它不是对翻译质量、学习效果或平台行为的保证。

## 当前阅读入口

如果你还没有项目，也不准备让 AI 操作文件，先做[通用 LLM 首练习](routes/universal-core-foundations-ZH.md)：它只使用一则虚构通知，练习把目标、材料、检查和停止点写清楚。它是候选练习，不代表不同平台行为相同，也不证明学习效果。

如果你是第一次使用这套材料，按这一条候选路径阅读：

[第 1 章：先理解 GPT，再理解 Codex](chapters/01-gpt-and-codex-ZH.md) →
[实验 011：GPT 与 Codex 边界](labs/lab-011-gpt-codex-boundaries-ZH.md) →
[第 2 章：第一个安全、可验证的任务](chapters/02-first-safe-task-ZH.md) →
[第一次安全改动](routes/first-safe-change-ZH.md) →
[实验 001：做一次安全的 README 改动](labs/lab-001-first-safe-task-ZH.md) →
[第 3 章：任务协议](chapters/03-task-protocol-ZH.md) →
[实验 002：任务协议](labs/lab-002-task-protocol-ZH.md) →
[第 4 章：上下文、权限与 Agent 行动边界](chapters/04-context-permissions-and-agent-ZH.md) →
[实验 007：行动边界](labs/lab-007-action-boundaries-ZH.md) →
[第 5 章：选择正确的 Codex 工作面](chapters/05-choose-the-codex-surface-ZH.md) →
[第 6 章：模型选择不是模型崇拜](chapters/06-model-selection-ZH.md) →
[第 7 章：Skill、Plugin、MCP 和工具如何分工](chapters/07-skills-plugins-and-tools-ZH.md) →
[实验 004：选择最小有用能力](labs/lab-004-skill-selection-ZH.md) →
[第 8 章：从定义到交付](chapters/08-full-lifecycle-workflow-ZH.md) →
[实验 013：完成一个完整的垂直切片](labs/lab-013-l3-vertical-slice-ZH.md) →
[第 9 章：验证、怀疑与恢复](chapters/09-verification-and-recovery-ZH.md) →
[实验 003：审计一条完成声明](labs/lab-003-evidence-review-ZH.md) →
[第 10 章：规划与垂直切片](chapters/10-planning-and-slicing-ZH.md)。

整套中文路径现有 40 / 40 个课程单元（22 章、18 个实验），所有翻译仍为 `in-progress`。中文页面只链接中文文件，不会静默跳到英文正文。固定评测夹具仍没有中文阅读版，也没有把静态定义变成已完成评测。

18 个中文实验均为 `draft / not_run`，翻译亦尚未独立审校。学习路径契约、模型评测、官方基线与真实问题研究仍以语言中立治理记录为准；这些记录不等于已完成学习证据。

## 阅读和状态边界

书稿章节使用 `draft`、`candidate`、`verified`、`production-ready` 区分内容成熟度；易变事实使用 `current`、`stale`、`disputed`、`removed` 区分事实状态。翻译文件的存在、链接检查通过或文字看起来完整，都不能自动提升原章节的内容状态。

本中文入口只对已列出的中文文件负责。章节、实验、Skill、评测和研究档案仍应以各自文件中的来源、状态和验证证据为准；没有运行日志的评测不能写成已完成，没有本地复现的论坛案例不能写成已确认根因。
