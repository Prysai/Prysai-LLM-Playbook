<!-- content_id: prysai-evidence-review | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 2e09a6e | source_license: project-owned CC-BY-4.0 -->

# 证据审查

根据可供他人检查的可观察证据，审计 Codex、Agent、研究、营销、浏览器、部署、Skill 或任务完成等断言。当某个结果看起来很完整却可能没有做完、需要区分 verified、inferred、blocked 或 unknown，或需要找到最小的下一项检查时使用。不要执行缺失的检查，也不要替代来源研究流程。

## 触发边界与交接

当输入包含完成断言、范围、差异、测试、来源支持的说法、截图、日志、部署报告或评估时接手。

遇到以下情况交接：

- 用户明确调用了 `$skill`；只有当显式请求本身是审计请求时才进行审查，同时仍然执行安全边界；
- 用户要执行缺失的研究：交给 Research Router；
- 用户要执行不清楚的任务：交给 Task Protocol；
- 用户要运行多阶段工作流：交给 Workflow Orchestrator；
- 用户要学习非 Codex 的课程或练习：交给 Learning Coach；
- 用户要学习 Codex 的课程或练习：交给 Codex Coach。

不要静默修复正在审查的产物。修复是另一项任务，必须另行分流。

## 必需输入与缺失输入的处理

必须取得 `claims`、`scope`、`evidence`、`time_or_version` 和 `acceptance_rule`。对每项断言还要在结果共享或公开发布时记录 `owner`，并区分 `not_observed` 与 `failed`。如果缺少断言，要求补充。如果缺少证据，返回 `unknown` 或 `blocked`，指出最小的安全检查；不要用合理性、记忆或从产物复制来的断言填空。

## 审查方法

对每项断言记录范围、证据类型、新鲜度、来源、覆盖度和下一项检查。询问来源是否过期、是否为生成物、模拟物、错误目标或范围过窄。让检查匹配断言：文件变更用差异，构建用命令输出，运行时行为用运行观察，视觉断言用渲染结果，易变事实用带日期的权威 URL，偏好断言用已定义的样本和方法。verified 只适用于证据覆盖的范围；不要把窄范围结果升级成宽泛声明。

### 学习证据档案

当断言涉及练习或学习时，将 `process_pass` 与 `learner_outcome` 分开。需要固定实验夹具版本、允许的辅助、保留的基线尝试、提示记录、学习者亲自完成的修正、变式任务、评分人和阈值、延迟时间（如果声称保留），以及明确要求的状态。将结果严格映射为：

- 一个已选择的提示词或计划：`template_selected`；
- 一次完成的带教循环：`practised`；
- 通过固定任务：`demonstrated_on_this_task`；
- 通过未见过的变式任务：`transferred_to_[variation]`；
- 通过延迟后的未见任务：`retained_at_[delay]`。

如果材料只有模型回答、同一会话中的修正、模型自评或一次成功任务，拒绝使用 `mastered`、`fluent`、`expert` 或“普遍提升”等词。如果已有 Learning Coach 收据，使用它作为输入；不要把本审查档案变成第二轮辅导。

## 风险、副作用与确认

默认风险为 `R0`，因为审查是只读的。重新运行本地检查属于 `R1`；网络获取、账户访问、生产环境检查或修改产物属于 `R2` 或更高，需要明确的范围和确认。不要在证据中暴露秘密；在保留足够识别信息的同时进行脱敏。

## 硬停止

在断言范围或目标不明确、来源不可用、证据无法访问、检查需要未授权访问，或用户要求把未经验证的结果标成 verified 时，以 `blocked` 停止。绝不要把产物自己的完成声明当作证据。

## 固定输出

必须准确返回：

1. `review_scope`
2. `claim_table`，包含 `claim`、`scope`、`evidence`、`freshness`、`status` 和 `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## 证据与状态映射

将断言状态设为 `verified`、`partially-verified`、`inferred`、`blocked` 或 `unknown`。如果产物处于探索阶段，映射为 `practice`；结构和基础检查通过时为 `candidate`；正常、边界、失败和迁移证据覆盖声明范围时才为 `verified`；只有安全、维护、负责人、版本、回滚和发布门槛也通过后才是 `production-ready`。

## 维护记录

- `source`：`docs/quality/skill-quality-standard.md`；`docs/book-architecture.md`；`docs/quality/evaluation-framework.md`
- `license`：项目原创改写；外部材料仍根据 `docs/sources/asset-register.md` 仅作参考
- `owner`：evidence-systems maintainer
- `version`：`0.3.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
