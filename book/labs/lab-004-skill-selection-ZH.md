<!-- content_id: lab-004-skill-selection | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-004-skill-selection
title: "选择最小有用能力"
level: L4
domain: general
goal: "按任务契合度、风险、许可证和验证成本选择 Skill 或工具"
setup: "一项低风险本地任务，以及固定版本的能力候选项"
task: "不安装、不认证，对比只用协议、协议加 Skill、协议加 Skill 再加工具三种方法"
evidence:
  - "三份方法记录，说明任务契合度、依赖、权限和验证成本"
  - "候选项的来源、版本、许可证、嵌套资产和回滚说明"
  - "一项仅建议采用的决定和一项被阻止的决定"
failure_variant: "选择一个许可证或回滚不清楚的可见候选项，再给简单任务叠加无关能力"
reflection: "哪一种能力真正补上了任务缺口？哪项依赖的维护成本最高？什么可以删除？"
status: draft
last_verified: "Not run"
transfer_task: "为一项低风险研究或内容任务重复这次比较"
transfer_domain: "研究、工程、营销或文档"
transfer_evidence: "保留任务缺口、比较表、采用记录和审查意见"
transfer_limitations: "仅建议采用的比较不能证明安装、运行时行为或长期维护价值"
---

# 实验 004：选择最小有用能力

## 学习目标

因为某项能力填补了一个明确的任务缺口才选择它，而不是因为它流行、数量多或容易安装。

## 设置

选择一项低风险本地任务，并比较三种方法：

1. 只使用书面任务协议；
2. 使用任务协议加一个相关 Skill；
3. 使用任务协议、Skill 再加一个外部工具或连接器。

使用固定的候选版本。记录来源、许可证、依赖、目标安装范围、权限、副作用、负责人、审查日期和回滚方式。除非后续任务明确授权，否则不要安装或认证。

## 决策记录

为每个候选项创建一份简短的采用记录：

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

本实验的默认决定是 `recommendation-only` 或 `blocked`。发现、安装、加载、调用、行为效果和验证后的结果是不同状态，必须分别记录。

## 失败案例

选择一个文件夹确实存在、但许可证、嵌套资产、固定版本或回滚步骤不清楚的候选项。正确决定是 `blocked`。能找到不等于获得许可；已经安装也不等于行为已经验证。

然后为一个简单文本任务加入多个无关能力。只要某项能力增加的权限、依赖或验证成本超过它带来的具体价值，就拒绝它。

## 验收标准与清单

- [ ] 在比较候选项之前已经写明任务缺口。
- [ ] 至少有一个候选项因明确理由被拒绝。
- [ ] 许可证和嵌套资产的不确定性可见。
- [ ] 权限和外部副作用没有超出任务需要。
- [ ] 没有把安装与行为当成同一种状态。
- [ ] 维护者不依赖聊天记录也能执行回滚说明。

## 要保留的证据

保留未修改的任务输入、三份方法记录、候选版本标识、许可证说明、决策表和审查意见。本实验不是任何外部 Skill 已安装或已验证的证据。

## 复盘与迁移

把这张比较表应用到一项研究或内容任务。哪项新依赖带来了最高维护成本？删除什么仍不会降低最终证据的质量？

本简体中文译文为可读的 `in-progress` 翻译单元，独立语言审校尚未完成；它不是已验证译文，也不表示课程已经通过学习者验证。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-003-evidence-review-ZH.md" aria-label="上一个实验：实验 003·审计一条完成声明">← 上一个实验<br><strong>实验 003·审计一条完成声明</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-005-design-a-skill-ZH.md" aria-label="下一个实验：实验 005·把重复方法沉淀为边界明确的 Skill">下一个实验 →<br><strong>实验 005·把重复方法沉淀为边界明确的 Skill</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
