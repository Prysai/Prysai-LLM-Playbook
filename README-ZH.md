<!-- content_id: project-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress -->

# Codex: From First Task to Real Work

> 简体中文项目入口（`ZH`）。默认公开语言目标是 English（`EN`）；本文件是当前中文入口迁移的一部分。

<!-- language-switcher:start -->
**语言：** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

中文入口导航：

- [中文书稿入口](book/README-ZH.md)
- [中文序言](book/preface-ZH.md)
- [中文书籍目录](book/table-of-contents-ZH.md)

## 这是什么项目

Codex: From First Task to Real Work 不是把 skills 平铺在一起的目录，也不是只讲安装步骤的手册。它是一套书籍式、课程式、实验室式的 Codex GPT 学习与实践系统：先帮助学习者理解 GPT、模型、Codex、上下文、工具、Skill 和 Agent 的关系，再通过实验把理解变成行动，最后把个人方法沉淀成可以评估、复用和更新的团队能力。

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
| 能力包 | [`skills/`](skills/) | Codex 可执行的工作指导 | 把成熟方法变成可复用能力 |
| 评测 | [`docs/quality/`](docs/quality/)、[`evals/`](evals/) | 质量标准、任务夹具和审查记录 | 判断内容、Skill 和学习结果是否真的有效 |
| 治理 | [`docs/governance/`](docs/governance/) | 权限、来源、状态、更新和贡献规则 | 管理变化与责任边界 |
| 研究 | [`docs/research/`](docs/research/) | 官方事实与真实问题研究 | 为易变断言和现实案例保留证据边界 |
| 展示页 | [`site/`](site/) | 公开展示页及其说明 | 让读者从项目概览进入学习路径 |
| 自动检查 | [`scripts/`](scripts/) | 项目、链接、状态和学习路径验证器 | 把约定变成可重复运行的检查 |

## 这套系统如何判断“学会了”

学习者不能只提交一份看起来完成的输出。每个关键能力都需要解释证据、操作证据、判断证据和审查证据；每个 Skill 都需要触发条件、边界、失败处理、来源和 fresh-context 前测。目录数量和安装数量都不是掌握标准。

## 当前状态

当前项目处于 v0.1 的产品地基阶段：六个输入来源已完成目录级审计，22 章书籍结构、17 个实验、真实问题研究、7 个候选 Skill 和 40 项评测夹具已经建立。

书籍正文当前仍以简体中文为主；公开展示页默认 English，并提供中文切换。多语言架构的目标是让每个 reader-facing 语言文件都带有明确后缀，并让同一内容 ID 的链接保持在当前语言中；但本次只新增了三个 `-ZH` 入口文件，不能据此声称全仓库已经完成 `EN`、`ZH`、`ES`、`JA`、`KO`、`DE` 六语言迁移，也不能声称所有页面都已经实现跨页语言状态保持。

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

## 文档入口

下面的链接分为两类：已经有同语言文件的入口直接指向 `-ZH` 文件；仍未迁移的目标会在链接文字中明确说明，并指向当前原始文件。这里没有把未迁移目标偷偷替换成英文。

- [领域词汇（尚未迁移为 `CONTEXT-ZH.md`，当前原始文件）](CONTEXT.md)
- [产品章程（尚未迁移为 `charter-ZH.md`，当前原始文件）](docs/charter.md)
- [书籍架构（尚未迁移为 `book-architecture-ZH.md`，当前原始文件）](docs/book-architecture.md)
- [学习模型（尚未迁移为 `learning-model-ZH.md`，当前原始文件）](docs/learning-model.md)
- [来源与许可证台账（尚未迁移为 `asset-register-ZH.md`，当前原始文件）](docs/sources/asset-register.md)
- [内容更新与审查（尚未迁移为 `content-lifecycle-ZH.md`，当前原始文件）](docs/governance/content-lifecycle.md)
- [当前状态源（机器可读治理文件，未做 `-ZH` 副本）](docs/governance/content-status.yaml)
- [当前状态审查（尚未迁移为 `current-state-review-...-ZH.md`，当前原始文件）](docs/quality/current-state-review-2026-08-09.md)
- [Skill 质量标准（尚未迁移为 `skill-quality-standard-ZH.md`，当前原始文件）](docs/quality/skill-quality-standard.md)
- [学习与运行评测框架（尚未迁移为 `evaluation-framework-ZH.md`，当前原始文件）](docs/quality/evaluation-framework.md)
- [评测任务集 v1（机器可读评测文件，未做 `-ZH` 副本）](evals/task-set-v1.yaml)
- [真实问题研究（尚未迁移为 `field-problems-codex-ZH.md`，当前原始文件）](docs/research/field-problems-codex.md)
- [真实问题研究索引（尚未迁移为对应 `-ZH` 文件，当前原始文件）](docs/research/field-problems-index-2026-08-10.md)
- [中文书籍目录](book/table-of-contents-ZH.md)
- [Codex Coach（Skill 文档尚未迁移为 `SKILL-ZH.md`，当前原始文件）](skills/prysai-codex-coach/SKILL.md)
- [外部 Skill 候选目录（尚未迁移为 `skill-candidate-catalog-ZH.md`，当前原始文件）](docs/sources/skill-candidate-catalog.md)
- [展示页说明（尚未迁移为 `site/README-ZH.md`，当前原始文件）](site/README.md)
- [locale 后缀与迁移决策记录（ADR，治理记录未做 `-ZH` 副本）](docs/adr/0010-locale-suffixed-content.md)

## 关于这三个中文入口

本次只新增以下三个文件：

- `README-ZH.md`：项目级中文入口、目录职责、当前状态和安全边界；
- `book/README-ZH.md`：书稿中文入口、阅读方式和评测边界；
- `book/preface-ZH.md`：书稿中文序言。

它们是迁移中的 `ZH` 入口，不代表其他章节、实验、Skill、研究档案或治理文件已经完成同内容 ID 的 `-ZH` 版本。后续迁移应继续使用同一内容 ID、明确语言后缀和同语言链接，并在状态与验证证据实际存在后再提升状态。

## 名称说明

当前本地对外拟采用名称为 `Codex: From First Task to Real Work`，中文副标题为“Codex：从第一个任务到真实工作”。GitHub 仓库路径暂保持现有 slug，待名称最终确认后再处理仓库元数据和旧链接迁移；组织归属、维护责任和发行门禁记录在治理与来源文件中，不放进产品标题。
