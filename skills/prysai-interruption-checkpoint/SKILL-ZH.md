<!-- content_id: prysai-interruption-checkpoint | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 中断检查点

在 LLM 辅助任务被中断后，保存可观察的任务状态，并选择一项安全的下一步决定。当模型不可用、任务超时、会话丢失、工具缺失，或交接在验收证据出现前断开时使用。不要用于重试、诊断已保留的交互、审计已有断言或推断平台行为。

## 只处理中断这一段

当任务可能只完成了一部分，且一次可见中断让下一步不清楚时使用，例如模型不可用消息、超时、会话丢失、工具缺失或交接断开。

遇到以下情况交接：

- 已保留请求、回复和预期结果，需要沟通修复：使用 Communication Failure Triage；
- 完成、可靠性或发布断言需要证据审查：使用 Evidence Review；
- 当前的命名平台事实需要来源检查：使用 Source Investigator；
- 新任务或变更任务需要行动和权限契约：使用 Task Protocol。

不要根据一次中断诊断供应商、推断根因、比较模型、解释账户状态或创建通用恢复流程。

## 保留最小证据包

只收集请求者已经能观察到的内容：

1. `goal` —— 用一句话写出预期结果；
2. `observed_event` —— 可见的中断事件，不写原因；
3. `last_inspectable_artifact` —— 差异、测试结果、文件视图、笔记，或 `none_observed`；
4. `acceptance_evidence` —— 能建立完成的检查，或 `unknown`；以及
5. `external_actions` —— 已发送、改变、上传、花费、提交或发布的一切，或 `not_observed`。

不要用看似合理的账户情况填补缺失字段。不要索要秘密、令牌、密码、Cookie、私有日志、账户截图或无关任务上下文。

## 分类，但不要补全故事

只使用一个状态：

- 只有已经可以检查声明的验收证据时才是 `complete`；
- 有可检查产物但不能建立声明的验收检查时是 `partial`；或
- 产物、其含义或验收证据缺失时是 `unknown`。

中断消息既不是诊断，也不是任务证据。新提示词不会从之前任务继承完成证明。

## 选择一项有边界的下一步决定

默认在 `R0` 下选择 `hold`：保存收据，不采取行动。

只有请求者指定一个本地、可逆的检查目标、准确要观察的内容，并承认该检查本身不能证明之前任务已经完成时，才可以在 `R1` 提供 `inspect_local`。本 Skill 只记录这一决定，不执行检查。

对于新任务、重试、工具使用、模型切换、设置变更、账户检查、网络请求、上传、花费、提交、推送、发布或部署，停止并交给 Task Protocol。那里必须单独界定权限、检查点、回滚和验收检查。

## 停止条件

目标、最后可检查产物、验收含义或下一步外部行动的权限缺失时返回 `blocked`。绝不：

- 自动重试或发送“从中断处继续”；
- 切换模型、账户、套餐、设置或供应商；
- 把来源报告当作中断原因；
- 检查账户或外部服务；或
- 根据部分产物或令人放心的回复宣布任务完成。

## 交付检查点收据

必须准确返回：

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

只有在明确保留 `unknown`、区分中断和完成、不包含未批准的外部行动，并且最多指定一项下一步决定时才接受。它是候选方法，不是任务能够恢复、服务可用或学习者能顺利使用它的证据。

## 维护记录

- `source`：Prysai Lab 原创方法，源自有来源边界的中断检查点案例、任务协议和证据审查边界
- `license`：项目原创改写；公开容量报告和 API 文档仍根据 `docs/sources/asset-register.md` 仅作参考
- `owner`：reliability-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-14`
- `content_status`：`candidate`
