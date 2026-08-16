<!-- content_id: project-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress -->

# Prysai 大模型实战手册：从第一个任务到可靠交付

> 简体中文项目入口（`ZH`）。默认公开语言目标是 English（`EN`）；本文件是当前中文入口迁移的一部分。

<!-- language-switcher:start -->
**语言：** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

中文入口导航：

- [中文书稿入口](book/README-ZH.md)
- [中文序言](book/preface-ZH.md)
- [中文书籍目录](book/table-of-contents-ZH.md)
- [中文新手提示卡：先把一件小事说清楚](book/communication-clinic-ZH.md)

## 这是什么项目

Prysai LLM Playbook（Prysai 大模型实战手册）不是把 skills 平铺在一起的目录，也不是只讲安装步骤的手册。它是一套书籍式、课程式、实验室式的 LLM 协作学习与实践系统：先帮助学习者理解 GPT、模型、Codex、上下文、工具、Skill 和 Agent 的关系，再通过实验把理解变成行动，最后把个人方法沉淀成可以评估、复用和更新的团队能力。

它要带领学习者完成一条完整成长路径：从“我听说过 GPT”开始，到能够安全使用 Codex、稳定完成真实任务、理解 Agent 为什么这样行动、选择和设计合适的 Skill，直到建立自己的工作系统并帮助团队共同使用。

## 我们要解决的问题

很多人能让 AI 生成一段看起来不错的内容，却不能稳定地让它完成一个真实任务。问题通常不在于“不会写一句提示词”，而在于没有形成完整的工作系统：

- 不清楚 GPT、Codex、模型、上下文、工具和 Skill 分别是什么；
- 不知道什么时候应该提问、什么时候应该提供文件、什么时候应该让 Codex 先检查；
- 不知道如何把模糊目标拆成可执行任务；
- 不知道如何控制权限、验证结果和处理失败；
- 安装了很多 Skill，却不知道它们为什么有用、何时组合、何时不该使用；
- 个人试验偶尔成功，却无法变成团队可复用、可审查、可持续更新的流程。

这套学习路径用一条连续主线解决这些问题：

```text
认识 GPT → 认识 Codex → 安全准备 → 表达任务 → 管理上下文
       → 使用工具 → 选择与组合 Skill → 理解 Agent 逻辑
       → 计划/执行/验证/交付 → 专业领域实践 → 组织级协作
```

这条路径有两条同时推进的主轴：

- **理解主轴：** 认识 GPT 和模型如何工作，理解上下文、工具、Skill、Agent、权限和验证如何改变结果。
- **能力主轴：** 从小实验开始，逐步练习任务表达、工作流设计、Skill 选择、结果审查和团队治理。

## 项目由哪些部分组成

下表列出主要目录的职责。目录本身是结构性入口，不代表其中的每一个 reader-facing 文件都已经完成六语言迁移。

| 层 | 位置 | 保存什么 | 作用 |
|---|---|---|---|
| 书稿 | [`book/`](book/) | 章节、序言、目录和实验 | 用连贯内容建立概念、方法和判断力 |
| 实验室 | [`book/labs/`](book/labs/) | 低风险、可观察的练习 | 让学习者留下可检查的操作证据 |
| 能力包 | `skills/` | Codex 可执行的工作指导 | 把成熟方法变成可复用能力 |
| 评测 | `docs/quality/`、`evals/` | 质量标准、任务夹具和审查记录 | 判断内容、Skill 和学习结果是否真的有效 |
| 治理 | `docs/governance/` | 权限、来源、状态、更新和贡献规则 | 管理变化与责任边界 |
| 研究 | `docs/research/` | 官方事实与真实问题研究 | 为易变断言和现实案例保留证据边界 |
| 展示页 | `site/` | 公开展示页及其说明 | 让读者从项目概览进入学习路径 |
| 自动检查 | [`scripts/`](scripts/) | 项目、链接、状态和学习路径验证器 | 把约定变成可重复运行的检查 |

## 这套系统如何判断“学会了”

学习者不能只提交一份看起来完成的输出。每个关键能力都需要解释证据、操作证据、判断证据和审查证据；每个 Skill 都需要触发条件、边界、失败处理、来源和 fresh-context 前测。目录数量和安装数量都不是掌握标准。

## 当前状态

当前项目处于 v0.1 的产品地基阶段：22 章书籍结构、18 个实验、真实问题研究、23 个候选 Skill 和约 40 项评测夹具已经建立。目录、结构与静态契约检查不等于学习者已经完成、迁移或掌握这些内容。

书籍规范源为 English（`EN`），公开展示页默认 English，并提供中文切换。简体中文已经具备 22 章和 18 个实验的 `-ZH` 候选文件及同语言阅读路径；这表示课程单元可沿中文路线往返阅读，并不等于完整中文课程已经通过独立语言审校或学习者验证。Skill、评测、研究档案和部分补充读物仍在迁移中。多语言架构要求每个 reader-facing 文件带明确后缀，同一内容 ID 的链接保持当前语言；在独立语言审校完成前，现有中文译文保持 `in-progress`，不能被宣传为完整六语言支持。

### 实际课程覆盖率（22 章 + 18 个 Lab）

| 语言 | 当前可读课程单元 | 这代表什么 |
|---|---:|---|
| English | 40 / 40 | 规范源语言；不等于学习效果已经验证。 |
| 简体中文 | 40 / 40 | 22 章和 18 个实验均有候选译文；独立语言审校待完成。 |
| Español | 40 / 40 | 22 章和 18 个实验均有候选译文；独立语言审校待完成。 |
| 日本語 | 40 / 40 | 22 章和 18 个实验均有候选译文；独立语言审校待完成。 |
| 한국어 | 40 / 40 | 22 章和 18 个实验均有候选译文；独立语言审校待完成。 |
| Deutsch | 40 / 40 | 22 章和 18 个实验均有候选译文；独立语言审校待完成。 |

六条语言线均已具备 40 个课程单元的文件与路径；这只说明结构覆盖，**不**表示六种语言都已完成独立审校、文化适配、学习效果验证或正式发行。页面中的 `available / 40` 是路径数量，不是准确度、自然程度、学习效果或发行状态的分数。

章节 19–22、全部候选 Skill 和模型/工作流评测仍需要 fresh-context 前测与运行日志。外部材料不会未经来源、许可证和内容审查直接进入主线；真实问题研究记录的是用户报告或社区建议，不自动等同于官方根因，也不等同于本地复现。

## 重要边界

- 项目维护者的原创内容与外部来源必须分开记录；组织归属和治理信息见来源台账。
- 模型名称、价格、入口、额度和具体功能属于易变事实，必须带来源和复核日期。
- “GPT-5.6 Luna 性价比最高”目前是需要用可重复评测验证的产品假设，不是永久结论。
- 任何没有明确许可证的材料都不直接复制进发行版。
- 学会使用 Codex 的标准不是安装了多少 Skill，而是能否在明确边界内稳定地产出经过验证的结果。
- 不要把构建通过、静态检查通过、文件存在或模型生成的输出误读成浏览器、运行时、认证、外部服务或翻译质量已经验证。
- 本项目是独立维护的学习与实践项目，不是 OpenAI 官方文档或官方产品页面。
- 示例、研究和实验不得放入 token、密码、API key、私钥、Cookie 或 `.env` 文件。

## 中文资料入口

- [中文书籍导读](book/README-ZH.md)
- [中文前言](book/preface-ZH.md)
- [中文书籍目录](book/table-of-contents-ZH.md)
- [通用 LLM 第一任务](book/routes/universal-core-foundations-ZH.md)
- [中文新手提示卡](book/communication-clinic-ZH.md)

术语表、治理规则、来源台账、评测定义、研究档案和 Skill 说明尚未提供中文文件。为保证这条路线始终使用中文，本入口不再把它们链接到原始语言页面；相应内容翻译并审校后，才会在这里开放。

## 中文候选学习路径

当前中文候选路径不是只有语言入口。它包括：

- `README-ZH.md`、`book/README-ZH.md`、`book/preface-ZH.md` 与本目录；
- [中文新手提示卡](book/communication-clinic-ZH.md)：七张可直接复制的低风险文字练习卡；它是中文起步切片，不是完整中文译本，也没有效果或跨模型运行证据；
- [第 1 章](book/chapters/01-gpt-and-codex-ZH.md) → [实验 011](book/labs/lab-011-gpt-codex-boundaries-ZH.md) → [第 2 章](book/chapters/02-first-safe-task-ZH.md) → [第一次安全改动夹具](book/routes/first-safe-change-ZH.md) → [实验 001](book/labs/lab-001-first-safe-task-ZH.md) → [第 3 章](book/chapters/03-task-protocol-ZH.md) → [实验 002](book/labs/lab-002-task-protocol-ZH.md)；
- [第 4 章](book/chapters/04-context-permissions-and-agent-ZH.md) → [实验 007](book/labs/lab-007-action-boundaries-ZH.md) → [第 5 章](book/chapters/05-choose-the-codex-surface-ZH.md) → [第 6 章](book/chapters/06-model-selection-ZH.md) → [第 7 章](book/chapters/07-skills-plugins-and-tools-ZH.md) → [实验 004：选择最小有用能力](book/labs/lab-004-skill-selection-ZH.md) → [第 8 章](book/chapters/08-full-lifecycle-workflow-ZH.md) → [实验 013](book/labs/lab-013-l3-vertical-slice-ZH.md) → [第 9 章](book/chapters/09-verification-and-recovery-ZH.md) → [实验 003](book/labs/lab-003-evidence-review-ZH.md) → [第 10 章](book/chapters/10-planning-and-slicing-ZH.md)。

它们都是迁移中的 `ZH` 候选内容。22 章与 18 个实验之外的 Skill、研究档案、评测和治理文件仍不代表已完成同内容 ID 的中文版本，语言质量也尚未由独立审校者确认。后续迁移必须继续使用同一内容 ID、明确语言后缀和同语言链接；只有文件、审校与对应证据都存在时才可提升状态。

## 名称说明

当前对外名称为 `Prysai LLM Playbook — From First Task to Reliable Work`，中文名称为“Prysai 大模型实战手册：从第一个任务到可靠交付”。GitHub 仓库路径暂保持现有 slug；仓库元数据和旧链接迁移需要单独决定。组织归属、维护责任和发行门禁记录在治理与来源文件中，不放进产品标题。
