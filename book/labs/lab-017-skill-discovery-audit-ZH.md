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

## 准备

使用两个匿名且版本固定的样本，放在临时目录中。样本 A 有可追溯的许可
证和受限输入；样本 B 缺少明确许可证、依赖说明或回滚目标。不要安装它们，
也不要使用任何凭据或向外写入。

在测试前，为每个候选保留以下信息：

| 项目 | 要保留 |
|---|---|
| 身份 | 名称、确切版本、路径和哈希 |
| 来源 | URL、作者或负责人、访问日期和范围 |
| 许可证 | 许可证文件、NOTICE、嵌套资产和未知项 |
| 依赖 | 版本、网络、账号和所需凭据 |
| 目标 | 计划安装的根目录、受众和负责人 |
| 移除 | 备份、回滚、可否删除和下次复核日期 |

## 任务

分别记录以下阶段。`not_observed` 表示没有足够的观察，不表示“很可能是”：

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

审查版本、许可证、NOTICE、嵌套资产、依赖、网络或账号需求、安装范围、备份、
回滚、负责人和下次复核日期。

## 四类测试

在实际执行前，先设计四类测试：

1. **正例：** 普通输入、限定范围和预期本地输出；
2. **边界：** 缺少输入、超出范围的资源或权限不足；
3. **失败/注入：** 外部指令、索要凭据或意外载荷；
4. **迁移：** 换一个目录或项目，仍保留版本、依赖和回滚信息。

为每个案例写明前置条件、只读动作、预期信号、证据、状态和停止条件。目录
清单只能证明目录清单本身。

## 证据

保存清单、版本、只读发现输出、许可证和依赖审查、四类测试计划、决策包以及
移除方案。决策包要区分仅供建议、阻塞、获准安装和已安装候选，并写明范围、
负责人、备份、回滚和下次复核日期。

## 故意失败与边界

让候选请求真实 `.env` 文件、认证或上传。正确结果是 `blocked`：把请求作为数据
保存，不暴露任何凭据，不为了“看看它会做什么”而安装候选，并记录仍缺少的证据。
目录、格式校验器或可见许可证，都不能证明行为安全、真实触发或嵌套资产的权利。

如果本地测试无法执行，就写 `not_run`，不要推断结果。版本一旦变化，就重新审查
许可证、依赖和四类测试；一个决定只属于它记录的那个版本。

## 复盘

目录清单没有证明哪个阶段？安装前还需要哪一条观察？移除成本或依赖中还有什么
未知？

## 迁移

把同一套阶段用于 MCP 服务器：分别记录可见配置、工具发现、对目标的只读访问、
调用结果、独立读回远端状态和采纳决定。配置存在、工具可发现、工具可调用、结果
已观察到，以及外部写入已获批准，是五个不同的事实。

## 验收清单

- [ ] 我分开记录了存在、隐式发现、显式解析、加载、行为和采纳。
- [ ] 我固定了版本，并检查了许可证、NOTICE、嵌套资产和依赖。
- [ ] 我设计了正例、边界、失败/注入和迁移四类测试。
- [ ] 我写明了目标范围、负责人、备份、回滚和审批点。
- [ ] 任何凭据、认证或上传请求都保持 `blocked`。
- [ ] 未运行的测试仍是 `not_run`；目录列表没有被当作行为证据。
- [ ] 决策区分建议、阻塞、有条件批准和已观察到的安装。
- [ ] 决策包记录未知项以及移除候选的方式。

## 来源

- [现场问题与提示模式 — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md)，FP2-11 和 FP2-12。
- [第 7 章：Skills、插件、MCP 与工具](../chapters/07-skills-plugins-and-tools-ZH.md)。
- [第 14 章：发现、安装与审计外部 Skill](../chapters/14-discover-and-audit-skills-ZH.md)。

这些来源支持分离各个发现阶段和审查来源链，但不能证明真实 Skill 能加载、行为
安全或拥有所有嵌套资产的许可证。本实验仍为 `draft / not_run`，没有安装任何外部
Skill。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-ZH.md">← 上一个实验<br><strong>实验 016 · 副作用边界</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-ZH.md">下一个实验 →<br><strong>实验 018 · 用初学者学习协调打字对话测试保持与迁移</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
