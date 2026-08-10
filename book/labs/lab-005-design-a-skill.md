# 实验 005：把一次成功沉淀为 Skill

---
id: lab-005-design-a-skill
title: "从任务协议到可复用能力包"
level: L4
domain: general
goal: "学会判断什么时候应该创建 skill，以及如何验证它"
setup: "一个已完成两次以上的低风险流程、一个独立的练习 skill 目录和可用于校验的脱敏输入"
task: "提取稳定步骤，创建一个最小 skill；保留一次性目标，不把项目特定的偶然细节硬编码进去，并完成校验和一次新鲜上下文试用。"
evidence:
  - "触发 description、核心工作流、输入权限和秘密边界"
  - "正例、边界例、失败例、输出与验收标准"
  - "来源与许可证记录、安装前审查包、校验结果和新鲜上下文试用记录"
failure_variant: "把偶然细节硬编码进 skill，或引用许可证不明材料、覆盖配置却无回滚；检查是否能发现泛化并把采用决定标为 blocked。"
reflection: "哪些步骤稳定到值得复用？为什么不把所有细节写进 SKILL.md？如何证明 skill 减少了遗漏而没有扩大触发范围？"
status: draft
last_verified: "未运行；待运行"
transfer_task: "把一个已重复出现的脱敏流程迁移成另一个领域的最小能力包，并分别测试相关、边界和无关输入。"
transfer_domain: "研究、工程、营销或内容审核"
transfer_evidence: "保存能力包 revision、安装前审查包、触发与让位记录、四类输入结果、验证器输出、五项行为状态和来源边界。"
transfer_limitations: "结构校验或一次新鲜上下文试用不能证明生产可靠性、长期维护性或许可证已经自动获批。"
---

## 前置条件

- 选择已经完成两次以上、低风险且可观察的流程；不要从一次偶然成功推导通用能力。
- 准备一个练习目录和脱敏的正例、边界例、失败例、迁移例，不使用秘密或生产数据。
- 查清引用的外部材料来源、许可证和允许的改写范围；不复制许可证不清楚的文本、代码或指令。
- 练习目录与实际 Skill root 分开；在安装批准前，不把候选复制到可发现位置，也不修改团队配置。

## 任务

选择一个已经完成两次以上的低风险流程，提取稳定步骤，创建一个最小 skill。保留一次性目标，不要把项目特定的偶然细节硬编码进 skill。

先把它当作“自建候选”而不是“已采用能力”。在练习目录完成静态校验和脱敏测试后，为它提交 `skill-adoption-decision.md`：

```text
candidate / task_gap:
trigger_conditions / non_trigger_conditions:
source_path / revision_or_hash / inventory_date:
original_or_external_sources / license / NOTICE:
dependencies / target_install_scope:
permissions / external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps / rollback_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / version_policy / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified / unblock_conditions:
```

默认先给 `recommendation-only`。只有目标安装路径、配置备份、回滚演练、依赖、权限和批准人都明确后，才可写 `approved-to-install`；只有真实安装记录存在后，才可写 `installed-candidate`。结构校验和练习目录测试不能替代安装批准。

## 必须提交

- 触发 description；
- 核心工作流；
- 输入、权限和秘密边界；
- 正例、边界例和失败例；
- 输出和验收标准；
- 来源与许可证记录；
- 安装前审查包，包括隔离试运行、备份/回滚、批准点、owner 和下一次复核；
- 校验结果和一次新鲜上下文试用。

## 观察与记录的证据

保存 skill 文件、revision/hash、校验器输出、四类测试输入（正例、边界例、失败例、跨项目迁移例）的触发结果和新鲜上下文试用的输入/输出。分别记录“减少了哪种重复说明或遗漏”和“在哪些无关任务中不应触发”。

另建五项状态记录：

```text
文件存在：练习目录中的路径与哈希
被发现：目标工作面的发现证据或 not_observed
被加载：新会话的加载证据或 not_observed
被采用：owner/批准范围证据或 not_observed
被验证：四类行为测试证据或 not_observed
```

这些状态不能互相代替。新鲜上下文中被发现或加载，不等于团队已采用；文件被复制到 Skill root，也不等于行为已验证。

## 故意失败变体

先把一次性目标、项目特定文件名或客户细节硬编码进 skill，再用不同项目的输入试用。通过标准是发现泛化触发或不可复用，并能指出应移回任务上下文的内容。

再构造一个安装失败变体：候选引用了许可证不明的外部片段，或安装步骤会覆盖现有配置却没有备份和恢复检查。即使 `SKILL.md` 已存在且结构校验通过，采用决定也必须是 `blocked`；移除不明材料或补齐可演练回滚后重新审查，不得先安装再补记录。

## 秘密与外部副作用边界

skill 不得要求学习者提交 token、私钥、`.env` 或真实客户数据。校验和试用只使用本地、沙盒、可回滚材料；未经明确授权，不调用外部服务、不发布、不修改公共资源。

## 复盘问题

- 哪些步骤跨项目仍然稳定？
- 哪些细节只是本次任务的偶然条件？
- 触发 description 如何防止在不相关任务中泛化？
- 哪些批准点属于创建者，哪些必须由 Skill root 或团队环境的 owner 决定？
- 你观察到的是文件存在、被发现、被加载、被采用，还是完成了声明范围内的行为验证？

## 通过标准

新 skill 在练习目录的声明任务中能减少重复说明或遗漏，并且不会在不相关任务中泛化触发；安装前审查包包含全部固定字段、四类行为证据、owner 和精确回滚。推荐版本最多按证据进入 `recommendation-only`、`approved-to-install` 或 `installed-candidate`；许可或回滚不明的失败变体必须是 `blocked`。学习者能解释五项行为状态为什么不能互相推出。
