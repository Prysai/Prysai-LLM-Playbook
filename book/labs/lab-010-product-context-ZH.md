<!-- content_id: lab-010-product-context | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-010-product-context
title: "建立可跨两个任务复用的产品上下文"
level: L3
domain: marketing
goal: "建立一份小而可版本化的产品记录，减少重复解释，同时把事实、假设、定位决策和缺失证据明确分开"
setup: "一个虚构或已脱敏的产品、两项低风险营销任务，以及一份不连接真实营销活动的版本控制产品上下文文件"
task: "建立最小上下文，用它完成产品说明与测量计划，改变一个定位决策，并检查输出随之发生的差异"
evidence:
  - "两版产品上下文，其中包含字段来源、置信度、负责人和复查日期"
  - "引用所用字段并列出假设的产品说明与测量计划"
  - "定位决策差异、下游输出差异、指标理由和未解决的证据缺口"
failure_variant: "移除受众或目标行动，验证工作流会索取缺失上下文，而不是编造细分人群、引语或指标"
reflection: "哪些字段被复用？哪项变更改变了真实决策？哪些看似流畅的文字掩盖了薄弱证据？"
status: draft
last_verified: "not run"
transfer_task: "把同一份最小上下文协议迁移到已脱敏的工程工具、研究服务或内部内容项目"
transfer_domain: "产品工程、研究服务、内容或营销"
transfer_evidence: "保留上下文版本、来源、假设、两项任务输出、差异、指标限制和缺失字段时的行为"
transfer_limitations: "共享上下文能减少重复，但不能证明事实真实、客户措辞真实、市场反应、归因或战略批准"
---

# 实验 010：建立可跨两个任务复用的产品上下文

## 学习目标

创建一份可被两个不同任务复用的小型产品事实源。目标是在不确定性可见的前提下保持一致，而不是写一份巨大的品牌文档，也不是更顺滑地重复没有证据的定位说法。

## 准备

使用虚构产品或已脱敏的公开信息。不要放入客户名单、私密研究、内部营收、未公开战略或个人数据。本练习不得连接邮件、广告、分析、CRM、发布或真实网站系统。

创建 `product-context-v1.md`，包含这些字段：

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

每个字段都添加 `source`、`status: fact | assumption | decision | unknown`、`confidence`、`owner` 和 `next_review`。没有证据就保持空白；不要把假设改写成客户引语。

## 任务与实验

将同一份上下文用于两项任务：

1. 为指定受众写一段简洁的产品说明；
2. 为一个真实决策设计测量计划，例如读者是否已充分理解产品，从而能选择下一步。

两份输出都必须列出使用的上下文字段、作出的假设，以及仍需验证的事实。每个指标要记录目标行动、数据来源、观察窗口、决策规则和限制。提出的指标只是计划，不是测量结果。

现在修改一个定位决策，递增上下文版本，说明原因，然后重新生成两份输出。比较上下文差异和输出差异，识别哪些改动是该决策真正要求的，哪些只是文案变化。

## 要保留的证据

保留两版上下文、字段来源、变更原因、两个版本中两项任务的输出、差异、指标映射和未解决字段。更短的提示词不是充分证据；请展示哪些重复事实不再需要重述，以及第二项任务是否正确使用了它们。

## 失败案例

移除 `audience` 或 `target_action` 之一，再次请求两份输出。正确行为是指出缺失的决策、收窄输出，或提出问题。即使文案听起来可信，编造细分人群、客户引语、转化事件或市场结果也会使本实验失败。

## 验收清单

- [ ] 事实、假设、决策和未知项在页面上清楚分开。
- [ ] 每个重要字段都标明来源、负责人和复查状态。
- [ ] 两项任务复用同一版上下文，并写明使用的字段。
- [ ] 定位更新有理由，并有可检查的下游差异。
- [ ] 指标对应一项决策，且没有被表述为已观察到的结果。
- [ ] 没有发生真实发布、外联、追踪、花费或私密数据使用。

## 复盘与迁移

哪些字段确实减少了重复解释？哪个字段带来了最大的下游决策变化？把这份上下文迁移到另一个领域，移除仅适用于营销的措辞，并记录哪些内容仍有效，哪些内容需要新的负责人或证据来源。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-009-engineering-lifecycle-ZH.md" aria-label="上一个实验：实验 009 · 比较直接实施与完整工程生命周期">← 上一个<br><strong>实验 009 · 比较直接实施与完整工程生命周期</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-011-gpt-codex-boundaries-ZH.md" aria-label="下一个实验：实验 011 · 区分 GPT、Codex、工具与 Agent">下一个 →<br><strong>实验 011 · 区分 GPT、Codex、工具与 Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
