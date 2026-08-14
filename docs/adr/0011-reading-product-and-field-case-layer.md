# ADR-0011: Add a reading-product and field-case layer

## Status

Accepted

## Date

2026-08-10

> **Name note (2026-08-14):** The former reader-facing name cited below is
> historical. The active reader-facing identity is defined by
> [ADR-0034](0034-prysai-llm-playbook-reader-identity.md).

## Context

`Codex: From First Task to Real Work` 已经有 22 章、13 个实验、Skill、评测、学习路径和治理文件，但读者仍需要在多个入口之间跳转。公开研究显示，WorkBuddyGuide 的“蓝皮书感”主要来自分篇、阅读指南、任务入口、独立案例层和连续阅读导航；这些是内容产品结构，不是某个品牌颜色或某个文档引擎自动带来的效果。

本项目还需要把真实用户问题引入教学。GitHub Issue、论坛和社区讨论可以帮助我们发现现实症状，但它们不自动证明根因、普遍性、修复状态或当前账户可用性。如果没有单独的案例证据边界，研究摘要很容易被误读成官方结论。

## Decision

### 1. 保留正文源文件，增加阅读产品层

现有 `book/chapters/`、`book/labs/`、`skills/`、`evals/` 和 `docs/governance/` 继续作为真实源文件。新增或逐步增强以下入口：

- 蓝皮书总览和阅读指南；
- 按学习路线和真实问题进入的导航；
- 章节、实验、Skill、评测和证据之间的映射；
- 现实案例索引和明确的复现/验证状态。

第一阶段不整体复制 WorkBuddyGuide 的正文、目录文字、视觉资产、品牌表达或 VitePress 实现，也不因为“看起来像一本书”就声称站点已经是完整蓝皮书。

### 2. 现实案例作为独立内容层

案例先进入 `docs/research/`，使用 `docs/templates/field-case.md` 的字段。案例只有在满足声明范围的编辑、来源、证据和安全检查后，才可以被章节正式引用。案例状态与章节成熟度、翻译状态和实验运行状态分开记录。

每个案例必须显式区分：

- 用户报告的现象；
- 官方文档或维护者确认的边界；
- 本项目直接观察到的证据；
- 本地复现状态；
- 社区假设或项目推断；
- 尚未观察和不能声称的内容。

### 3. 阅读路径是映射，不是第二套状态源

阅读层可以把“现实问题 → 章节 → 实验 → Skill → 评测 → 验收/停止条件”串起来，但不能取代：

- `docs/governance/content-status.yaml` 的内容状态；
- `docs/governance/learning-path.yaml` 的等级与主实验关系；
- `docs/governance/fact-impact-registry.yaml` 的易变事实消费者关系；
- `evals/task-set-v1.yaml` 的机器可读评测夹具。

任何生成的站点数据都必须能回到这些规范源，不能在页面上手工维护另一套“完成度”。

### 4. 先做最小纵向切片

第一条切片围绕“分不清 GPT、Codex、工具和 Agent”展开，连接：

```text
首页问题入口
→ 第 1 章
→ 实验 011
→ Codex Coach Skill
→ concept-gpt-codex-tools-001
→ 四类证据
→ L0 的验收或停留
```

先证明这条路径能被读者访问、理解、执行和审查，再推广到全书和更复杂的案例索引。暂不以迁移 22 章、替换站点引擎或增加案例数量作为成功标准。

## Alternatives Considered

### 直接迁移到 VitePress

拒绝作为第一步。当前主要缺口是阅读路径和内容映射的可验证性，不是缺少文档引擎。先用现有静态展示页验证结构，能减少迁移成本和双重维护。

### 复制 WorkBuddyGuide 的四篇目录、正文或视觉体系

拒绝。结构机制可以作为公开研究参考，但正文、图片、截图、图标、字体、二维码、品牌和投稿素材必须按来源和许可证单独处理；本项目需要保留自己的 GPT/Codex/证据型内核。

### 让研究文件直接成为正式章节

拒绝。用户报告和社区建议的证据等级低于官方确认或本地复现。案例需要安全排查、失败边界、验收标准和未验证声明，才能成为可教内容。

### 在站点页面手工维护案例和完成状态

拒绝。手工状态很容易脱离当前状态源、学习路径和评测夹具。阅读层只做可追溯映射，状态由治理文件和验证器负责。

## Consequences

### Positive

- 读者可以从学习路线或现实症状进入同一条可验证闭环；
- 现有正文不需要大规模移动，旧链接和翻译迁移可以继续渐进进行；
- 现实案例可以保留用户报告、官方边界、复现结果和未知范围；
- Skill、实验和评测不再只在各自目录中孤立出现；
- 未来如果引入更重的站点框架，已有映射和状态边界仍可复用。

### Costs and risks

- 需要维护案例模板、研究索引和章节落点；
- 映射文件可能与正文或治理源发生漂移，因此必须增加链接/状态校验；
- 案例数量增加不等于学习质量提高，不能把投稿数当成完成度；
- 研究案例的外部来源可能有许可证、隐私和可访问性限制；
- 目前站点仍是 `candidate`，不能把阅读层计划写成已完成的生产产品。

## Evidence and boundaries

- [WorkBuddyGuide 结构研究档案](../research/workbuddyguide-structure-study-2026-08-10.md)
- [WorkBuddyGuide 固定 commit](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0)
- [Codex 项目章程](../charter.md)
- [Codex 书籍架构](../book-architecture.md)
- [真实问题研究索引](../research/field-problems-index-2026-08-10.md)
- [内容状态源](../governance/content-status.yaml)
- [学习路径契约](../governance/learning-path.yaml)

本 ADR 记录的是架构决策，不证明蓝皮书阅读层、所有案例或站点运行时已经完成验证。

## Review triggers

重新审查本 ADR 的条件包括：

- 章节、实验、Skill 或评测的主线关系改变；
- 现实案例进入或退出正式章节；
- 状态源、评测框架或本地化架构改变；
- 站点从静态展示页迁移到新的文档引擎；
- WorkBuddyGuide 研究对象的目录、许可或发布链明显变化。
