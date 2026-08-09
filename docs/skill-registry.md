# Atlas Skill 注册表

这里登记的是 Prysai Lab 维护的 Atlas skills，不是外部目录的完整复制。外部候选先进入来源台账和审查流程，只有通过触发、边界、来源、依赖和评测门槛后，才会进入本注册表。

| Skill | 作用 | 主线阶段 | 状态 | 主要验证 |
|---|---|---|---|---|
| `prysai-codex-coach` | 根据学习目标和能力等级安排学习与实践 | L0–L6 | candidate | 学习路由、解释、实验和反思 |
| `prysai-task-protocol` | 将模糊需求变成有边界的任务协议 | L2–L3 | candidate | 缺失输入、外部副作用、验收条件 |
| `prysai-evidence-review` | 审查完成声明和证据缺口 | L3–L6 | candidate | 正确、半完成、漂亮但无证据的结果 |
| `prysai-skill-selector` | 按任务选择最小有效 skill 组合 | L4–L6 | candidate | 任务分类、候选淘汰、依赖与许可 |
| `prysai-workflow-orchestrator` | 将复杂任务路由到定义、计划、构建、验证、审查和交付阶段 | L3–L6 | candidate | 阶段跳过、重复失败、风险检查点 |
| `prysai-research-router` | 将研究请求路由为问题收敛、检索、综合、引用和复核流程 | L3–L6 | candidate | 宽题目、来源不足、引用完整性 |
| `prysai-product-context` | 建立营销和产品任务共享的产品上下文 | L3–L6 | candidate | 受众、定位、决策和上下文迁移 |

## 状态定义

- `draft`：内容正在写，尚未完成运行测试；
- `candidate`：结构和基本校验通过，但尚未完成足够的新鲜上下文前测；
- `verified`：在声明范围和任务集内通过正例、边界例、失败例和迁移例；
- `production-ready`：还有安全、维护、版本、许可证和组织发布门禁全部通过。

当前所有 Atlas skills 都诚实标为 `candidate`，即使官方 frontmatter 校验已经通过。
