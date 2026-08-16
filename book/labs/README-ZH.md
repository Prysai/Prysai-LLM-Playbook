<!-- content_id: book-labs-readme | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook：实验目录

<!-- language-switcher:start -->
**语言：** [English](../README-EN.md) | [简体中文](README-ZH.md) | [Español](../README-ES.md) | [日本語](../README-JA.md) | [한국어](../README-KO.md) | [Deutsch](../README-DE.md)
<!-- language-switcher:end -->

实验是你亲自检查“一种向 LLM 求助的方式，是否能让实际工作更清楚”的地方。它不是另一套
文书流程，也不要求使用 Codex Cloud 或编程。每个实验从一个看得见的问题开始：回答是否保留事实、
遵守要求的格式、标出未知，或留下能让其他人审查的改动？

这是中文实验入口，不表示所有实验已经有中文版本。链接只打开 `-ZH` 文件；某项尚未翻译时，
页面会直接说明，而不会悄悄把你带到英文页面。

## 从一个小练习开始

想体验“模糊要求”和“可检查要求”的差别，先做
[实验 001：第一个安全任务](lab-001-first-safe-task-ZH.md)。如果还没有可丢弃的项目，
可以跳过其中的工作区部分。想在不安装任何东西的前提下选择可复用的方法，继续做
[实验 004：选择 Skill](lab-004-skill-selection-ZH.md)。

标记为 `draft` 的实验是一份教学契约：它告诉你试什么、保存什么、何时停止；它不证明练习
已经在每个 Codex 界面运行过，也不证明任何学习者已经掌握该方法。

## 当前状态

目录有 18 个固定实验 ID。它们全部仍是 `draft`，学习者运行状态为 `not_run`。这条中文
路径目前可以打开 001–011 以及 013–016 共 15 个实验；其余实验会在拥有自己的中文文件和翻译状态
记录后再出现在链接中，不会由本页直接跳去英文。

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
| 012 | 团队能力迁移 | L6 | 尚未提供中文版本 |
| 013 | 可审计的垂直切片 | L3 | [打开实验 013](lab-013-l3-vertical-slice-ZH.md) |
| 014 | 恢复时的对账 | L3 | [打开实验 014](lab-014-resume-reconciliation-ZH.md) |
| 015 | 带证据的交付 | L5 | [打开实验 015](lab-015-evidence-delivery-ZH.md) |
| 016 | 副作用边界 | L3 | [打开实验 016](lab-016-side-effect-boundary-ZH.md) |
| 017 | Skill 发现审计 | L4 | 尚未提供中文版本 |
| 018 | 固定练习契约下的语言迁移 | L2 | 尚未提供中文版本 |

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
