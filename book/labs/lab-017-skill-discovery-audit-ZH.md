<!-- content_id: lab-017-skill-discovery-audit | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "在采纳 Skill 前审计发现过程"
level: L4
domain: general
goal: "把存在、发现、加载、行为、许可证和采纳视为彼此独立的主张"
setup: "两个版本已固定的匿名 Skill 样本，放在可丢弃目录中；不安装、不使用凭据、不向外写入"
task: "记录每一个发现阶段，审查版本和许可证边界，并给出有范围的采纳决定"
evidence: ["清单、发现输出、源版本、许可证、依赖和四类测试计划", "明确区分 recommendation-only、blocked、approved-to-install 与 installed-candidate 的决策记录"]
failure_variant: "让一个候选要求真实 .env 或上传；标记为 blocked，且不满足该请求"
reflection: "目录列表没有证明哪一个阶段？在采纳前还缺少什么证据？"
status: draft
last_verified: "not run"
transfer_task: "把这些阶段用于 MCP 服务器，并区分配置、发现、读取、调用结果与采纳"
transfer_domain: "MCP 审查、Skill 维护、工程或研究"
transfer_evidence: "保存版本、许可证边界、目标范围、备份、回滚、负责人、审批点和下次复核日期"
transfer_limitations: "静态样本不能证明真实 Skill 可以加载、行为安全，或所有嵌套资产都有可用许可证"
---

# 实验 017：在采纳 Skill 前审计发现过程

## 问题

一个 Skill 可能存在于磁盘，却不在隐式列表中；可能能按名称解析，却在加载时失败。这些是不同观察。目录列表或一次冒烟测试，都不能替代采纳决定。

## 准备与任务

使用两个匿名且版本固定的样本。样本 A 有可追溯许可证和受限输入；样本 B 缺少明确许可证、依赖说明或回滚目标。不要安装它们，也不要使用任何凭据。逐项记录：

```text
文件存在：
隐式发现：
显式名称解析：
在新会话中加载：
正向行为：
边界行为：
失败/注入行为：
跨项目迁移：
采纳决定：recommendation-only | blocked | approved-to-install | installed-candidate
```

任何未观察到的内容都写为 `not_observed`。审查版本、许可证、NOTICE、嵌套资产、依赖、网络或账号需求、安装范围、备份、回滚、负责人和下次复核日期。

## 失败、迁移与验收

让候选请求真实 `.env` 或上传内容。正确结果是 `blocked`；不要为了演示“成功”而满足请求。保留清单、决策包、只读发现输出，以及正例、边界、失败/注入和迁移的测试计划。

- [ ] 我分开记录了存在、发现、加载、行为和采纳。
- [ ] 我固定了版本，并审查了许可证边界。
- [ ] 我为正例、边界、失败/注入和迁移设计了测试。
- [ ] 我写明了目标范围、备份、回滚、负责人和审批点。
- [ ] 我没有通过安装或上传来伪造成功。

迁移到 MCP 时，分别记录可见配置、工具发现、对目标的只读访问、调用结果、外部读回和采纳。本实验仍为 `draft / not_run`；样本不证明真实 Skill 的安全性或完整许可证。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-ZH.md">← 上一个实验<br><strong>实验 016 · 副作用边界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-ZH.md">下一个实验 →<br><strong>实验 018 · 旅行打字对话的保持与迁移</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
