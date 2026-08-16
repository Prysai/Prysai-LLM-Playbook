<!-- content_id: lab-009-engineering-lifecycle | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-009-engineering-lifecycle
title: "比较直接实施与完整工程生命周期"
level: L3
domain: engineering
goal: "在不把小型基准测试伪装成普遍结论的前提下，观察定义、规划、验证、审查和交付在哪些环节减少返工"
setup: "一个可随时丢弃的本地仓库、三个冻结的低风险任务、一个基线版本、固定工具，且不触及生产环境或外部副作用"
task: "让同一组三个任务分别走直接工作流和生命周期工作流，保留初次尝试，标记条件漂移，并比较证据质量与返工情况"
evidence:
  - "冻结任务夹具、输入哈希、基线版本、环境、模型、工具、权限和运行顺序"
  - "六次运行的原始输出、差异、检查结果、事件时间戳、首次通过状态、返工、耗时和错误类别"
  - "明确标记条件漂移为 not_comparable 的比较，以及最有价值检查点的说明"
failure_variant: "引入一次超时、权限阻断、输入变更、工具版本漂移或未知副作用，并在不重写初始记录的前提下完成核对"
reflection: "哪项定义或检查点避免了返工？哪项比较已经无效？证据是否足以支持扩大评估？"
status: draft
last_verified: "not run"
transfer_task: "把生命周期检查点迁移到另一项可逆的工程任务或数据转换任务"
transfer_domain: "软件工程、数据处理或自动化维护"
transfer_evidence: "保留基线、运行记录、差异、检查结果、审查发现、交付说明、未知项和回滚点"
transfer_limitations: "三个小任务不能建立通用的成本、质量或模型排名结论；本地检查也不能证明部署或用户验收"
---

# 实验 009：比较直接实施与完整工程生命周期

## 学习目标

检验一个很窄的问题：在同一套受控条件下，清楚的定义、规划、验证、审查和交付，是否能改进三个固定任务的结果。这是一次工程冒烟测试，不是排行榜。

## 准备

创建一个可丢弃的仓库，并提交一个基线版本。冻结三个小任务及其验收检查。两种工作流必须使用相同的环境、模型、工具、权限、网络条件和时间预算。若变更模型，就保持工作流不变；若变更工作流，就保持模型不变。

候选方案 A 只拿到冻结的目标、输入和验收规则。候选方案 B 使用书面的任务协议，并经过 `define`、`plan`、`build`、`verify`、`review` 和 `deliver` 阶段。每个任务开始前都恢复基线。预先固定运行顺序，并把顺序偏差写进限制。

## 任务与实验

使用三个无害的夹具：

1. 从一份简短的合成交付记录中提取三个指定字段；
2. 将记录渲染为 Markdown，并区分已完成工作和未验证工作；
3. 审查这句没有证据的断言：“代码存在且能构建，因此功能已经验证。”

先让 A 完成全部任务，再让 B 完成全部任务。每次运行最多允许一次受控返工。即使返工成功，也必须保留第一次结果。

至少记录：

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

不要估算缺失的时间或成本，使用 `unavailable`。返工后的通过不等于首次通过。

## 要保留的证据

保留六份初始输出、所有受控返工作为新的尝试、全部差异、命令、退出码、检查输出、审查笔记、交付摘要，以及一张 2×3 的比较表。明确说明这次冒烟测试支持 `expand`、`do_not_expand` 还是 `insufficient_evidence`。

## 失败案例

让其中一次运行遇到超时阈值、权限阻断、输入哈希变化、工具版本变化，或本地模拟的未知写入结果。重试前记录最后一个已确认事件并检查目标；保留被中断的尝试。只要冻结条件改变，就将比较标为 `not_comparable`。之后的成功不能追溯修复可比性。

## 验收清单

- [ ] 两种工作流使用了同一组冻结任务，并在每次运行前恢复基线。
- [ ] 六次初始尝试和所有返工都能被分别检查。
- [ ] 首次通过、耗时、返工、错误类别和验证均使用实际值。
- [ ] 至少一个失败分支如实记录了核对结果或 `not_comparable`。
- [ ] 构建成功没有被表述为运行时、部署或用户验证。
- [ ] 结论严格停留在三个任务的冒烟测试范围内。

## 复盘与迁移

哪个生命周期阶段最早发现了有后果的问题？哪个阶段增加了流程却没有改变结果？把真正有用的检查点迁移到另一项可逆任务，并说明那项任务为何可比或不可比。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-008-research-question-ZH.md" aria-label="上一个实验：实验 008 · 把一个大话题收窄为可回答的研究问题">← 上一个<br><strong>实验 008 · 把一个大话题收窄为可回答的研究问题</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-010-product-context-ZH.md" aria-label="下一个实验：实验 010 · 建立可跨两个任务复用的产品上下文">下一个 →<br><strong>实验 010 · 建立可跨两个任务复用的产品上下文</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
