<!-- content_id: book-labs-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook：实验目录

<!-- language-switcher:start -->
**语言：** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md)
<!-- language-switcher:end -->

实验是你亲自检查“一种向 LLM 求助的方式，是否能让实际工作更清楚”的地方。它不是另一套
文书流程，也不要求使用 Codex Cloud 或编程。每个实验从一个看得见的问题开始：回答是否保留事实、
遵守要求的格式、标出未知，或留下能让其他人审查的改动？

这是中文实验入口。所有链接只打开 `-ZH` 文件，不会悄悄把你带到英文页面。

## 从一个小练习开始

想体验“模糊要求”和“可检查要求”的差别，先做
[实验 001：第一个安全任务](lab-001-first-safe-task-ZH.md)。如果还没有可丢弃的项目，
可以跳过其中的工作区部分。想在不安装任何东西的前提下选择可复用的方法，继续做
[实验 004：选择 Skill](lab-004-skill-selection-ZH.md)。

标记为 `draft` 的实验是一份教学契约：它告诉你试什么、保存什么、何时停止；它不证明练习
已经在每个 Codex 界面运行过，也不证明任何学习者已经掌握该方法。

## 按你今天想得到的结果来选

不要只因为实验 001 编号最小就从它开始。请从最贴近你眼前需要的、最小的可见结果开始。下表的
每一项都能让你检查到实际产物；不需要因为模型说得自信就相信它。

| 如果你今天想…… | 从这里开始 | 停下来之前应该亲眼看到什么 |
| --- | --- | --- |
| 不写代码、不打开项目，也想感受清楚请求是否更有用 | [实验 001 的第一部分](lab-001-first-safe-task-ZH.md#第一部分十分钟提示词对照) | 同一份无害笔记得到的两份回答，以及一张简短比较回执 |
| 弄懂 GPT、工作台、工具和 Agent 分别在做什么 | [实验 011](lab-011-gpt-codex-boundaries-ZH.md) | 一张边界图，能把“提议动作”与“已执行且已检查的动作”分开 |
| 把“帮我处理一下”改成别人也能检查的请求 | [实验 002](lab-002-task-protocol-ZH.md) | 一张写有目标、材料边界、允许动作、验收和停止条件的任务卡 |
| 检查一段固定来源的研究回答，又不假装研究已经完整 | [实验 008](lab-008-research-question-ZH.md) | 来源清单、一条有范围的结论，以及明确的未知项 |
| 在本地做一次很小的文件修改 | 先做[第一次安全改动](../routes/first-safe-change-ZH.md)，再做[实验 001 的第二部分](lab-001-first-safe-task-ZH.md#第二部分把同样的纪律带进工作区) | 在可丢弃副本中看到一份审查过的 README diff 和一项针对性本地检查 |

如果你今天只有聊天窗口，第一行就足够了。不要为了“跟上目录”去安装工具、注册账户或碰真实项目。
只有当你能说清可丢弃文件夹、唯一允许修改的目标和要保留的证据时，再进入工作区练习。

## 当前状态

目录有 18 个固定实验 ID。它们全部仍是 `draft`，学习者运行状态为 `not_run`。这条中文
路径可以打开全部 18 个实验；每份中文译文仍待独立语言审校。

## 中文实验地图

| 实验 | 能力 | 等级 | 中文路径状态 |
|---|---|---:|---|
| 001 | 让第一次请求可执行 | L1 | [打开实验 001](lab-001-first-safe-task-ZH.md) |
| 002 | 任务协议 | L2 | [打开实验 002](lab-002-task-protocol-ZH.md) |
| 003 | 证据审查 | L3 | [打开实验 003](lab-003-evidence-review-ZH.md) |
| 004 | 选择 Skill | L4 | [打开实验 004](lab-004-skill-selection-ZH.md) |
| 005 | 设计 Skill | L4 | [打开实验 005](lab-005-design-a-skill-ZH.md) |
| 006 | Agent 停止条件 | L5 | [打开实验 006](lab-006-agent-stop-conditions-ZH.md) |
| 007 | 行动边界 | L3 | [打开实验 007](lab-007-action-boundaries-ZH.md) |
| 008 | 研究问题 | L3 | [打开实验 008](lab-008-research-question-ZH.md) |
| 009 | 工程生命周期 | L3 | [打开实验 009](lab-009-engineering-lifecycle-ZH.md) |
| 010 | 共享产品上下文 | L3 | [打开实验 010](lab-010-product-context-ZH.md) |
| 011 | GPT 与 Codex 的边界 | L0 | [打开实验 011](lab-011-gpt-codex-boundaries-ZH.md) |
| 012 | 团队能力迁移 | L6 | [打开实验 012](lab-012-team-capability-migration-ZH.md) |
| 013 | 可审计的垂直切片 | L3 | [打开实验 013](lab-013-l3-vertical-slice-ZH.md) |
| 014 | 恢复时的对账 | L3 | [打开实验 014](lab-014-resume-reconciliation-ZH.md) |
| 015 | 带证据的交付 | L5 | [打开实验 015](lab-015-evidence-delivery-ZH.md) |
| 016 | 副作用边界 | L3 | [打开实验 016](lab-016-side-effect-boundary-ZH.md) |
| 017 | Skill 发现审计 | L4 | [打开实验 017](lab-017-skill-discovery-audit-ZH.md) |
| 018 | 固定练习契约下的语言迁移 | L2 | [打开实验 018](lab-018-language-transfer-ZH.md) |

编号是目录 ID，不代表下一个编号就是前置条件或下一个学习等级。学习路径决定进度；本页只展示
今天能用中文打开的材料。

## 安全地完成一个实验

1. 使用可丢弃的文件夹、固定输入版本，不使用真实凭据。
2. 行动前先阅读实验的权限与副作用边界。
3. 保存基线、命令、输出、改动、失败分支和未知项。
4. 目标、授权、来源或恢复路径不可观察时停止。
5. 只有记录完原始练习后，才做迁移任务。

## 状态边界

`draft` 表示在称为 `candidate`、`verified` 或 `production-ready` 之前，仍缺少项目规定的证据。
`run_status: not_run` 表示本仓库没有该实验的学习者运行结果。文件存在、页面能打开或本地链接
检查通过，都不能证明学习效果、模型行为或在其他环境中的有效性。

## 返回中文路径

- [中文书籍入口](../README-ZH.md)
- [中文书籍目录](../table-of-contents-ZH.md)
- [新手提示卡](../communication-clinic-ZH.md)
