<!-- content_id: book-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress -->

# Codex: From First Task to Real Work 书稿

> 简体中文书稿入口（`ZH`）。这是三文件中文入口迁移切片的一部分，不代表整本书已经完成六语言翻译。

<!-- language-switcher:start -->
**语言：** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

导航：

- [返回中文项目入口](../README-ZH.md)
- [中文序言](preface-ZH.md)
- [中文书籍目录](table-of-contents-ZH.md)

这里放 Codex: From First Task to Real Work 的原创主线书稿。书稿不是六个外部项目的拼接，而是按照学习者的成长顺序重新编排的内容系统。

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
| `book/chapters/` | 22 章主线章节 | 现有文件尚未整体改为带后缀的六语言矩阵 |
| `book/labs/` | 13 个实际实验 | 现有文件尚未整体改为带后缀的六语言矩阵 |
| `book/table-of-contents-ZH.md` | 中文阅读目录与章节入口 | 本次新增，章节正文仍在迁移中 |
| `book/README-ZH.md` | 本中文书稿入口 | 本次新增，迁移状态为 `in-progress` |
| `book/preface-ZH.md` | 中文序言 | 本次新增，迁移状态为 `in-progress` |

“章节正文仍在迁移中”是明确的迁移状态，不是把未翻译文件伪装成中文，也不是对缺失翻译做静默回退。目录页会在每个仍使用原始章节文件的链接文字中保留这一边界。

## 当前阅读入口

第 19–22 章已有草稿，当前状态统一为“草稿已写，待前测”。从[中文书籍目录](table-of-contents-ZH.md)进入每章的真实问题案例、评测夹具规范和研究档案；[`evals/task-set-v1.yaml`（机器可读文件，未做 `-ZH` 副本）](../evals/task-set-v1.yaml)已提交为 39 项固定夹具、覆盖 16 个轨道，但尚无模型运行日志，不能把它误读为已完成评测。

L3 的贯穿式练习从[实验 013：可审计的竖向切片（尚未迁移为 `lab-013-l3-vertical-slice-ZH.md`，当前原始文件）](labs/lab-013-l3-vertical-slice.md)开始；它把协议、基线、checkpoint、验证、故意失败和迁移放在同一条低风险路径中。

相关入口：

- [学习路径契约（机器可读治理文件，未做 `-ZH` 副本）](../docs/governance/learning-path.yaml)
- [Luna 评估实验（尚未迁移为 `model-evaluation-luna-ZH.md`，当前原始文件）](../docs/model-evaluation-luna.md)
- [官方基线研究档案（尚未迁移为 `openai-codex-baseline-ZH.md`，当前原始文件）](../docs/research/openai-codex-baseline.md)
- [真实问题研究索引（尚未迁移为对应 `-ZH` 文件，当前原始文件）](../docs/research/field-problems-index-2026-08-10.md)

## 阅读和状态边界

书稿章节使用 `draft`、`candidate`、`verified`、`production-ready` 区分内容成熟度；易变事实使用 `current`、`stale`、`disputed`、`removed` 区分事实状态。翻译文件的存在、链接检查通过或文字看起来完整，都不能自动提升原章节的内容状态。

本中文入口只对本次新增的三份文件负责。章节、实验、Skill、评测和研究档案仍应以各自文件中的来源、状态和验证证据为准；没有运行日志的评测不能写成已完成，没有本地复现的论坛案例不能写成已确认根因。
