# ADR 0004：采用 Codex: From First Task to Real Work 作为对外工作名

**状态：** proposed
**日期：** 2026-08-09

## 背景

旧名称 `Codex Field Guide` 能表达实践性，但 GitHub 公开检索发现多个同名项目。`Codex Guide`、`Learn Codex`、`Codex Handbook` 和 `Codex in Practice` 也存在直接或近似冲突，且容易把项目误读成教程、书名、运行时实现或 Skill 目录。

本项目需要让陌生读者第一次看到时就知道：它帮助人从第一个 Codex 任务开始，逐步进入真实工作。`From GPT to Codex` 能表达学习起点和终点，但没有表达交付场景；`Codex: Learn, Practice, Verify` 更像一句完整口号。本轮选择一个更像项目名、同时保留成长路径和务实方向的名称。

## 决策

将以下组合作为当前本地对外拟采用名称，并先用于本地公开入口：

- 显示名：`Codex: From First Task to Real Work`
- 中文副标题：`Codex：从第一个任务到真实工作`
- 一句话定位：`学习 GPT、Codex、Tools、Skills 与 Agents，并用实验和证据把知识变成可靠工作流。`
- 远程仓库 slug 候选：`codex-from-first-task-to-real-work`

组织名不放入产品标题、Hero、章节标题或公开 Skill 展示名。现有 `prysai-*` 目录保留为内部技术命名空间，以维持调用兼容；展示名继续使用 `Codex Coach`、`Task Protocol` 等功能名。

## 未执行的外部变更

本次不修改 GitHub 远程仓库名称、description、默认分支或旧路径。工作名仍需由项目所有者确认，并在确认后单独检查组织内占用、域名、商标、包名、社交账号和 OpenAI 品牌使用边界。

## 依据

- [`project-naming-refresh-2026-08-09.md`](../research/project-naming-refresh-2026-08-09.md)：18 个同类项目的命名模式、直接冲突复核和工作名比较；
- [`github-project-naming-candidates-2026-08-09.md`](../research/github-project-naming-candidates-2026-08-09.md)：12 个公开仓库的名称和定位核验；
- 当前展示层审查报告：[`review-presentation-2026-08-09.md`](../quality/review-presentation-2026-08-09.md)。

## 后果

- 对外文案更直接，避免把产品误读为单纯的 Guide、Skill 目录或 Codex CLI 手册；
- 名称把“从零到真实工作”的成长主线放在首位，验证、原理、Skills、Agents 和团队治理由副标题与内容结构展开；
- 旧仓库路径在确认前保持不变，外部链接不会因本地文案调整而失效；
- 完成正式改名后，需要同步 README、站点、GitHub 元数据、链接迁移说明和贡献文档；
- 章节正文中的 `Field Guide` 可作为历史/内部简称逐步收敛，不在本轮为了改名进行大范围机械替换。
