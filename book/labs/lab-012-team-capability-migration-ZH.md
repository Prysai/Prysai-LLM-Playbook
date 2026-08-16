<!-- content_id: lab-012-team-capability-migration | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-012-team-capability-migration
title: "把个人方法迁移为团队能力"
level: L6
domain: team
goal: "把方法打包到两人能够复现、审查、更新和回滚的程度"
setup: "一项虚构的周报任务、两个匿名角色；不使用真实组织系统"
task: "制作 v0.1，让两人用全新上下文独立复现；将一个需求改为 v0.2，并检查影响和回滚"
evidence: ["带负责人、权限和验收的两个包版本", "两份带输入哈希、输出和评分的独立运行记录", "差异、影响矩阵、回滚结果与未确认项"]
failure_variant: "删去负责人、输入来源、权限边界或验收规则；或者换受众却不改验收"
reflection: "哪些知识只存在于一个人的脑中？什么会让包无法安全传承？"
status: draft
last_verified: "not run"
transfer_task: "将包格式用于低风险的工程、研究或内容流程"
transfer_domain: "团队工程、研究或内容运营"
transfer_evidence: "保存包版本、权限矩阵、独立运行、差异、影响、回滚和审查笔记"
transfer_limitations: "静态模拟不能证明账户访问、生产集成或组织采用"
---

# 实验 012：把个人方法迁移为团队能力

## 学习目标

把私人直觉和聊天记录换成一个可版本化的约定，让另一人也能安全执行。

## 准备

使用虚构周报任务和两个匿名角色。不使用真实账户、姓名、客户数据、内部指标、共享系统或生产仓库。制作 `v0.1`：目的与非目标、负责人和复核节奏、输入输出模式、权限矩阵和禁止行动、步骤与停止条件、正例/边界/失败/迁移检查，以及回滚目标。

## 独立复现

A 与 B 获得同一份包和全新上下文，不能阅读作者的聊天记录。两人分别记录输入哈希、`run_id`、决定、输出、不确定项和评分。比较结果时不要悄悄抹平差异。把一项真实需求改为 `v0.2`，记录差异、受影响对象、迁移决定、兼容性主张和回滚检查。

每人各保存一条最小运行记录；没有实际运行就写 `not_run`，不要为了让包看起来完整而补写结果。

```yaml
run_id: "lab012-weekly-report-v1-B-01"
member: "A | B"
package_version: "0.1.0"
input_hash: "sha256:..."
read: ["README", "protocol", "permission-matrix"]
action_taken: "只在临时副本生成虚构周报草稿"
stopped_at: "明确的停止条件，或 none"
output_or_diff: "路径或 no-change"
validation: "命令、退出码和关键结果；未运行则 not_run"
unknowns: ["没有真实账户运行证据"]
status: "pass | fail | blocked | not_run"
```

若 B 需要作者口头解释、无法找到负责人、看不出允许范围，或不知道如何回滚，不能把这次交接判为通过。把缺口写入包的对应层，再从干净副本重试；不要靠聊天补充后把结果说成独立复现。

## 失败、验收与迁移

删去负责人、输入来源、权限边界或验收规则，正确结果是停止迁移并记录缺失约定。若 `v0.2` 改了目标受众却没改验收，审查必须拒绝兼容性主张或要求新证据。

- [ ] 两人能在全新上下文中复现任务。
- [ ] 输入、输出、权限和负责人清楚可见。
- [ ] 运行差异被解释，而非平均掉。
- [ ] 版本改变有影响说明与回滚。
- [ ] 没有使用真实账户、生产系统或敏感输入。

保存两个版本、哈希、权限矩阵、独立记录、评分笔记、差异、影响矩阵、回滚与未确认项。在这些证据出现前，L6 能力尚未证明。

## 复盘与迁移

把同一格式用于一个低风险的工程、研究或内容任务。问自己：哪一步原来只在一个人的记忆里？如果负责人离开、来源过期或六个月后需要回滚，哪一项会让继承变得不安全？答案必须能回到版本、记录、差异或未确认项，不能只写“大家应当更小心”。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-011-gpt-codex-boundaries-ZH.md">← 上一个实验<br><strong>实验 011 · GPT、Codex、工具与 Agent 的边界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-013-l3-vertical-slice-ZH.md">下一个实验 →<br><strong>实验 013 · 可审计的竖向切片</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
