<!-- content_id: lab-005-design-a-skill | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-005-design-a-skill
title: "把重复方法沉淀为边界明确的 Skill"
level: L4
domain: general
goal: "判断重复工作流是否值得成为 Skill，并测试该 Skill 是否收窄工作范围，而非在所有场景触发"
setup: "至少完成过两次的低风险工作流、单独的练习目录、四个已脱敏的夹具，以及官方 Skill 验证器"
task: "提取稳定决策，编写最小有用 Skill，测试正例、边界、失败和迁移场景；不安装该 Skill，只给出采用决定"
evidence:
  - "源工作流记录，以及稳定决策与偶发细节的对照表"
  - "候选 Skill、来源和许可证记录、验证器输出，以及四份行为测试记录"
  - "包含负责人、权限边界、回滚、未解决风险和建议的 skill-adoption-decision.md"
failure_variant: "硬编码项目专有细节，或加入许可证不明确的材料，并确认采用决定因此受阻"
reflection: "哪些决策稳定到可以编码？哪些仍应保留在项目上下文中？Skill 是否减少遗漏，而没有扩大触发范围？"
status: draft
last_verified: "not run"
transfer_task: "把同一提取和行为测试方法应用到另一个领域的重复工作流"
transfer_domain: "研究、工程、营销或内容审查"
transfer_evidence: "保留工作流对照、候选修订、验证器结果、四项行为测试和采用决定"
transfer_limitations: "结构验证和一次新鲜上下文试用不能证明生产可靠性、团队采纳、长期维护或许可证批准"
---

# 实验 005：把重复方法沉淀为边界明确的 Skill

## 学习目标

只有当重复工作具有稳定的决策模式时，才把它做成可复用的指令包。Skill 不是存放某一次成功答案的地方，不是项目专用清单，也不应塞进某个领域的全部事实。

## 设置

选择一项至少已经完成两次的无害工作流，并保留这两次运行记录。使用已脱敏的输入，并在可被发现的 Skill 根目录之外建立练习目录。不要使用凭据、生产数据、未公开的客户材料，或复用条款不清楚的外部来源。

创建 `extraction.md`，包含四列：

| 观察到的步骤 | 稳定决策 | 项目专有细节 | 两次运行中的证据 |
|---|---|---|---|

只有稳定决策才是 Skill 候选内容。文件名、客户细节、临时绕过方案和一次性的目标，应留在项目上下文中。

## 任务与实验

编写一个最小候选 Skill，其中包含：

- 足够精确的描述：遇到相关请求会触发，邻近但不适用的请求会让出；
- 输入、允许的动作、权限限制、秘密处理、输出和验收标准；
- 简短的核心工作流；只有在条件满足时才需要的细节，应放入引用或脚本；
- 一个正例、一个边界例和一个失败例；
- 来源、许可证、负责人、版本和下次审查信息。

运行官方验证器。随后开启一个新鲜上下文，测试四个固定夹具：正例、边界、失败和跨领域迁移。记录候选项是否被发现、加载、选择、遵循和经过行为验证。这是五种不同状态；其中任何一种都不能证明下一种。

最后完成 `skill-adoption-decision.md`：

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

本实验止于采用建议。安装会改变共享状态，必须另行获得授权。

## 要保留的证据

保留两份源工作流记录、`extraction.md`、完整候选目录、其修订或哈希、验证器输出、全部四个夹具的输入与输出、新鲜上下文笔记和采用决定。失败测试应如实保留为失败测试，不要用后来的修正运行覆盖它。

## 失败案例

先硬编码一个真实项目文件名或客户专用规则。运行迁移夹具，确认候选项要么误触发，要么给出无关指令。删除偶发细节后，使用新的尝试 ID 再次运行。

接着加入一段许可证或复用许可记录不清楚的外部内容。即使验证通过，正确的采用决定也应是 `blocked`。有效的文件结构不能解决来源问题。

## 验收清单

- [ ] 两次既有运行记录支持每一项被编码的稳定决策。
- [ ] 触发条件和不触发条件都已测试。
- [ ] 正例、边界、失败和迁移夹具都保留原始结果。
- [ ] 已记录来源和复用许可。
- [ ] 没有发生安装、秘密处理、发布或外部副作用。
- [ ] 决定明确写出尚未验证的内容及下次审查负责人。

## 复盘与迁移

把此方法应用到另一领域的工作流。哪些部分能在迁移后保留下来？哪些应留在项目上下文中？候选 Skill 是否减少了重复遗漏，还是只让说明变得更长？

本简体中文译文为可读的 `in-progress` 翻译单元，独立语言审校尚未完成；它不是已验证译文，也不表示课程已经通过学习者验证。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-004-skill-selection-ZH.md" aria-label="上一个实验：实验 004·选择最小有用能力">← 上一个实验<br><strong>实验 004·选择最小有用能力</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-006-agent-stop-conditions-ZH.md" aria-label="下一个实验：实验 006·设计 Agent 的停止条件">下一个实验 →<br><strong>实验 006·设计 Agent 的停止条件</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
