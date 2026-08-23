<!-- content_id: prysai-workflow-orchestrator | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 工作流编排器

协调跨越定义、任务协议、规划、增量执行、验证、审查、交付和维护的复杂 Codex 工作。适用于请求涉及多个步骤、文件、工具、领域或检查点，或要求端到端交付的情况。不要用于一项单独的有边界行动、学习说明、独立证据审查或一次性的研究问题。

## 触发边界与交接

当工作至少包含两个有依赖关系的阶段，或需要检查点、恢复、多个产物或跨领域协调时接手。

遇到以下情况交接：

- 用户为有边界的子任务明确指定了 `$skill`：将其记录为一个阶段并保留范围；
- 请求只是一个不清楚的单项行动：先交给 Task Protocol；
- 请求只是教学：交给 Codex Coach；
- 请求只是审查证据：交给 Evidence Review；
- 请求只是发现或综合来源：交给 Research Router；
- 请求只是选择 Skill：交给 Skill Selector；
- 请求只是建立共享定位背景：交给 Product Context。

唯一允许的内部交接循环是 `orchestrator -> task protocol -> one domain route -> evidence review -> orchestrator checkpoint`。不要从某个阶段再次调用 orchestrator，也不要在没有新发现或范围变化时重新启动已完成的阶段。

## 必需输入与缺失输入的处理

要求提供 `outcome`、`non_goals`、`stages`、`dependencies`、`allowed_actions`、`acceptance_evidence`、`checkpoints`、`rollback` 和 `owner`。如果阶段或依赖关系不清楚，返回带有 `blocked_on` 字段的建议计划。契约还必须写明 `decision_owner`、准确的 `delivery_target`，以及任何 `commit` 步骤的含义：本地提交、推送、拉取请求和发布是不同的行动，有不同的确认门槛。只询问会改变路径或风险的最小问题。

阶段标记为 `in-progress` 前，先记录：

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

缺少 `delivery_target`、负责人、验收证据或回滚目标属于执行阻塞，不是可以猜目标的许可。

## 生命周期与检查点

1. 定义结果、用户、非目标、风险和验收标准。
2. 创建或验证一次任务协议。
3. 将工作切成带负责人和证据、可逆的垂直阶段。
4. 一次执行一个阶段，保留差异、日志和运行 ID。
5. 用合适的测试、运行时、浏览器、来源、安全、视觉或人工证据验证每项断言。
6. 审查范围、假设、可维护性和失败路径。
7. 交付已完成、未完成、推断、阻塞和下一步项目。
8. 记录维护、来源刷新、迁移和回滚说明。

交付目标是阶段图的一部分，不是事后补充。如果请求了多个动作，本地提交、共享分支推送、拉取请求和公开发布必须分别列为阶段。

## 风险、副作用与确认

将每个阶段分类为 `R0` 只读、`R1` 可逆本地、`R2` 共享或外部，或 `R3` 生产/不可逆/含秘密/广泛访问。要扩大权限、访问秘密、发送外部消息、提交/推送/发布、修改生产环境或执行不可逆行动时立即暂停。用户必须确认准确阶段、目标和副作用；编排不会继承无关的旧批准。

## 硬停止与恢复

遇到负责人未确定、验收缺失、目标不安全、指令冲突、回滚失败、证据丢失，或没有新假设却反复失败时，以 `blocked` 停止。保留失败记录，缩小范围，做一项有证据支持的改变，只重新运行相关检查。绝不扩大权限或无限重试。

## 固定输出

必须准确返回：

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## 证据与状态映射

阶段状态使用 `not-started`、`in-progress`、`blocked`、`verified` 或 `accepted`。整体探索使用 `practice`；工作流结构完整且基础检查通过时使用 `candidate`；所有声明阶段和边界案例都有证据时使用 `verified`；只有发布、安全、负责人、维护和回滚门槛也通过后才使用 `production-ready`。

## 维护记录

- `source`：`docs/book-architecture.md`；`docs/charter.md`；`docs/quality/skill-quality-standard.md`
- `license`：项目原创改写；外部材料仍根据 `docs/sources/asset-register.md` 仅作参考
- `owner`：workflow-systems maintainer
- `version`：`0.2.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
