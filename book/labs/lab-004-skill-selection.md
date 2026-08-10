# 实验 004：选择最小有效 Skill 组合

---
id: lab-004-skill-selection
title: "从任务出发选择而不是堆叠 skills"
level: L4
domain: general
goal: "理解 skill、工具、连接和验证之间的分工"
setup: "一个低风险、可复现且不需要生产权限的任务；准备任务协议、两个固定 revision 的候选 Skill 和一个外部工具或连接的说明"
task: "为同一任务比较三种最小能力组合，并为两个固定 revision 的 Skill 候选提交安装前审查包：一个推荐继续隔离试用，一个因许可证/NOTICE 或回滚不明而拒绝采用。"
evidence:
  - "三种方案的目标、触发边界、依赖、权限和验证步骤"
  - "每种方案的结果质量与验证成本记录"
  - "两份 skill-adoption-decision.md、批准点、owner、行为验证计划与五项行为状态"
failure_variant: "为简单任务堆叠无关能力，并提供一个文件存在但许可证/NOTICE 或回滚不明的候选；检查是否会拒绝安装并标记 blocked。"
reflection: "增加的能力是否解决了真实问题？何时复杂度超过收益？团队应如何维护被选方案？"
status: draft
last_verified: "未运行；待运行"
transfer_task: "对一个实际但低风险的工作任务重新比较无 Skill、单一 Skill 和带工具的最小组合，并给出保留或舍弃决定。"
transfer_domain: "研究、工程、营销、文档自动化"
transfer_evidence: "保存三种方案、两份安装前审查包、触发边界、revision、许可证/NOTICE、依赖、权限、批准点、owner、验证计划和回滚方案。"
transfer_limitations: "一次小规模对照不能证明长期收益、模型泛化或团队维护成本；外部连接的真实行为仍需单独授权和测试。"
---

## 前置条件

- 选择一个低风险、可复现的任务，例如整理本地文档或审查一份脱敏结果。
- 准备两个来源 URL 和 revision 均固定的候选；其中一个故意缺少清晰许可证/NOTICE 或回滚说明。不需要登录生产服务。
- 先写出任务目标和验收证据，再比较能力组合。

## 任务

选择一个低风险、可复现的任务。分别设计：

1. 只用任务协议；
2. 任务协议 + 一个 skill；
3. 任务协议 + 一个 skill + 一个外部工具或连接。

对每个方案写清楚：它解决的具体问题、需要增加的上下文、权限和依赖、允许的副作用、验证方式，以及失败时的停止点。

为两个候选 Skill 各建立一份 `skill-adoption-decision.md`：

```text
candidate / task_gap:
trigger_conditions / non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies / target_install_scope:
permissions / external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps / rollback_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified / unblock_conditions:
```

本实验默认只做到 `recommendation-only` 或 `blocked`；若没有明确授权，不下载、安装、启用或调用候选 Skill。即使用户允许“全部权限”，也必须保留准确来源、目标路径、范围和回滚记录。

采用决策之外，另建状态表：`文件存在 | 被发现 | 被加载 | 被采用 | 被验证`。每格只填证据索引或 `not_observed`。安装动作成功最多支持 `installed-candidate`，不能自动填满任何后一状态。

推荐候选可以使用 S05 `code-review-and-quality`：来源 `https://github.com/addyosmani/agent-skills`，固定 revision 证据为归档 SHA-256 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`。把任务限定为对固定 diff 做合并前审查，非触发条件包括生成新功能和缺少比较基线。仓库级 MIT 信号可支持继续审查，但依赖和嵌套资产未逐项核验，因此本轮结论仍是 `recommendation-only`。

拒绝候选可以使用 S06 `webapp-testing`：来源 `https://github.com/composio-community/awesome-codex-skills`，固定 revision 证据为归档 SHA-256 `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`。即使目录中存在 Skill，根目录 Apache-2.0 信号也不能覆盖所有嵌套内容；若配置备份和恢复检查也缺失，结论必须是 `blocked`。只引用项目台账元数据，不复制两个上游 Skill 的原文。

## 记录

- 每个方案解决了什么问题；
- 增加了哪些上下文、权限和依赖；
- 结果质量和验证成本如何变化；
- 哪个方案的复杂度超过了收益；
- 你会给团队保留哪个方案，为什么。
- 哪个批准点尚未通过，由谁负责补证据和下一次复核。

## 观察与记录的证据

保存三份方案表、两份安装前审查包和一次不安装候选的基线试用记录。为每种方案生成 `run-id`，保持原始任务、上下文和验收标准不变。试用时记录输入、启用的能力、输出差异、验证耗时和失败处理；如果没有真实连接，使用明确标注为模拟的说明，不要把模拟结果写成运行证据。

比较表至少包含：

```text
run-id | 方案 | 新增方法价值 | 新增上下文 | 新增权限 | 依赖/许可证 | 验证成本 | 副作用 | 状态 | 未知项
```

安装前包必须把目标路径、配置备份、回滚步骤和恢复检查写到另一位维护者可以执行的程度；“安装动作成功”与“Skill 行为通过”必须分开记录。正例、边界例、失败例和迁移例在本实验中是**待执行计划**，不得据此写“被验证”。

## 故意失败变体

给一个只需文本整理的任务配置多个无关 skill 或外部连接，观察是否出现触发范围扩大、权限增加、依赖变多或验证成本超过收益。能明确拒绝这些能力并说明原因，才算完成失败变体。

再给一个候选仓库：能访问且 Skill 文件存在，但没有清晰许可证/NOTICE、固定 revision 或回滚说明。通过标准是 `blocked`，提出原创替代或补齐材料的路径，不把可访问性、文件存在或目录可见当作可安装、已加载或可采用。

## 秘密与外部副作用边界

不得提供 API key、token、私钥或客户数据。外部工具或连接仅限只读、沙盒和明确授权范围；不允许发送消息、写入公共资源、发布、提交或推送。

## 复盘问题

- 任务目标与 skill 的触发边界是否一一对应？
- 哪个新增依赖带来的风险最大，是否有更小的替代方案？
- 团队选择方案时如何承担维护和验证责任？
- 你记录的是推荐、安装、调用还是验证？这四种状态分别需要什么证据？
- 文件存在、被发现、被加载、被采用和被验证分别缺哪条证据？

## 通过标准

学习者不以 skill 数量或目录热度作为选择理由，而是提交两个可复核的安装前审查包：一个合理停在 `recommendation-only`，一个因许可证/NOTICE 或回滚不明停在 `blocked`；来源/revision、批准点、owner、四类行为计划和五项行为状态均清楚，且没有发生安装、认证或团队启用。
