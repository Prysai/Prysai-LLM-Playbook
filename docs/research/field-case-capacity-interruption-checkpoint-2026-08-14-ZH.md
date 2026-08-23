<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# 现场案例：任务中断后，先暂停再重试

## 先从这里开始：不要让中断变得不可见

选定的模型不可用时，人很容易马上发下一条提示、切换设置，或假定任务已经接近完成。先停下来。在开始下一次尝试前，做一张小型检查点卡，把已知事实和希望发生的事分开：

1. 用一句话写下目标。
2. 保留实际能检查的最后一个产物，例如 diff、测试结果、笔记，或明确记下没有产物。
3. 所有缺失结果都标为 `unknown`，不要用令人安心的故事填空。
4. 只有在判断上一次任务是完成、部分完成还是未知后，才选择一个有界的下一步。

本页是离线决策练习。它不会发送提示、重试或切换模型、检查账户，也不会说明任何供应商会怎样运行。它只要求：一次中断必须先留下可审阅的回执，才可以变成下一项任务。

![中断检查点：新提示前先暂停，记录已知和未知，再选择一个有界的下一步。](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## 案例身份

- `case_id`：`FC-CAPACITY-01`
- `title`：任务中断后，先暂停再重试
- `problem`：任务因模型不可用消息而中断，学习者必须避免把未观察到的结果当成已完成任务。
- `audience`：使用模型辅助工作界面的初学者和审阅者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第 6 章；第 9 章；第 19 章
- `related_labs`：Lab 001；Lab 013
- `related_skills`：Interruption Checkpoint；Task Protocol；Evidence Review；LLM Comparison Protocol
- `related_evaluations`：`three-task-smoke-v1`，状态为 `not_run`

## 来源记录

- `source_type`：`github_issue`
- `source_url`：https://github.com/openai/codex/issues/33865
- `source_title`：关于选定模型不可用的公开报告
- `source_author_or_publisher`：公开 GitHub Issue 作者
- `accessed_at`：2026-08-14，见[模型容量现场信号](field-signal-model-capacity-budget-2026-08-14.md)
- `source_license_or_usage_boundary`：公开报告仅供参考；本案例使用原创摘要和虚构离线夹具
- `quotation_policy`：未复制 Issue 原文、评论、日志、账户细节、模型名称、机器信息、命令输出、解决方法、截图或任务载荷
- `source_scope`：该 Issue 只说明一名作者在特定日期公开报告了选定模型不可用。它不说明根因、普遍性、当前可用性、重试行为、服务政策、队列语义、修复方法，或其他界面、账户、模型、供应商中的行为。相关现场信号还记录了官方 API 限速指南；该指南只说明 API 边界，不能证明它解释了这份 Codex 报告或两个界面行为相同。

## 报告的情况

- `user_report_summary`：一名公开 Issue 作者描述，在指定环境中出现容量相关消息，无法使用选定模型。
- `observed_symptom`：来源称选定模型在作者获得完整任务结果前就不可用。
- `expected_behavior`：作者希望选定模型可用于目标任务；这不是供应商承诺。
- `official_boundary`：对于这次报告的 Codex 事件是 `unknown`。关联的 API 文档只描述 API 限速边界。
- `product_surface`：来源报告为 CLI；本项目未复现
- `product_version`：本案例未把它当作已核实事实
- `operating_system`：本案例未把它当作已核实事实
- `model_or_provider`：有意省略；本案例不是模型比较
- `network_or_auth_context`：未检查；未使用账户或权益
- `input_shape`：带明确验收检查的有界本地编辑任务
- `risk_level`：后续提示可能作用于不清楚的本地状态时为 `medium`

## 主张与证据表

| 主张 | 证据类别 | 来源或产物 | 日期 | 范围 | 局限 | 状态 |
|---|---|---|---|---|---|---|
| 一名作者公开报告了 Codex 环境中选定模型不可用。 | `reported` | [GitHub Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | 一份有日期的公开报告 | 不是复现、诊断、普遍性测量或支持承诺 | candidate |
| OpenAI API 文档说明 API 的请求速率限制和响应头。 | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits)，由[现场信号](field-signal-model-capacity-budget-2026-08-14.md)限定 | 2026-08-14 | 仅限 API 文档 | 不说明本报告根因，也不定义 Codex 行为 | candidate |
| 中断任务已经完成、部分完成或可以安全恢复。 | `not_observed` | 没有检查本地任务、重试、账户、模型或产物 | 2026-08-14 | 本仓库 | 没有证据不等于没有发生工作 | unverified |
| 后续提示前应保留明确检查点。 | `project_inference` | 本离线案例；第 6、9 章；`three-task-smoke-v1` | 2026-08-14 | 保守的学习方法 | 不能保证恢复、保留上下文或避免中断 | candidate |

## 复现状态

- `reproduction_status`：`not_run`
- `reproduction_scope`：本项目没有选择模型、发送任务、检查账户、重试请求、修改设置或获取服务遥测。
- `fixed_input_or_fixture`：下方**教学转换**中的原创虚构记录
- `logs_or_artifacts`：只有在批准独立审阅的离线运行后，才可保留学习者创建的检查点回执
- `independent_reviewer`：待定
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小安全诊断路径

| 步骤 | 只读检查或低风险行动 | 预期观察 | 停止规则 |
|---|---|---|---|
| 1 | 停止虚构任务，把目标、最后可见产物和验收检查写入本地回执。 | 目标与未观察到的结果分开。 | 目标、产物类别或验收检查未知时停止；不要发送下一条提示。 |
| 2 | 只用列出的产物，把上一个状态分类为 `complete`、`partial` 或 `unknown`。 | 缺失证据保持可见，不会被写成假定完成。 | 没有验收证据就不要标记 `complete`。 |
| 3 | 选择一个下一步：有界只读检查、携带回执的新任务，或暂停并查看当前官方帮助/状态页面。 | 下一步写明自己的证据，不继承中断任务的证明。 | 在重试、切换模型、改设置、消耗额度、上传上下文或声称恢复前停止。 |

- `allowed_actions`：阅读虚构案例、写本地检查点、分类证据、命名一个未来决定
- `forbidden_actions`：发送提示、重试、切换模型、改配置、查看账户、消耗额度、上传文件、调用 API、提交、推送、发布或使用秘密
- `minimal_safe_probe`：不含真实产品数据的五行本地检查点回执
- `stop_condition`：最后产物、验收含义或下一项外部行动的授权缺失
- `rollback_or_cleanup`：删除不需要的本地虚构回执；系统、账户和仓库都未改变

## 教学转换

- `learner_problem`：初学者正在起草一个小改动时看到模型不可用消息，想发送“从刚才继续”。
- `core_concept`：可见的中断、一个产物和成功完成任务是三件不同的事。新的尝试不会继承上一次任务的证明。
- `decision_to_teach`：要么保留回执并在新任务前做一次有界检查，要么暂停并使用当前官方帮助或状态路径。前者能澄清本地证据；后者避免在授权或证据缺失时继续增加活动。两者都不保证容量、恢复或完成。
- `smallest_experiment`：只使用下面的虚构记录：

  ```text
  goal: 在本地练习页加入一行验收清单
  last_visible_event: 出现模型不可用消息
  artifact_available: 未检查完成摘要、diff 或测试结果
  tempting_next_action: 发送“从刚才继续”
  ```

  不打开工具，创建这张检查点卡：

  ```text
  goal: 加入一行验收清单
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: diff 或文件视图，以及清单结果
  next_decision: blocked — 在任何新任务前保留这张回执
  external_actions: not_run
  ```

- `intentional_failure`：声称已经加入该行、声称重试会安全继续、武断地说模型很差，或声称事件由 API 限速造成。
- `required_artifact`：六行检查点和一句说明“为什么新提示不能证明上一个任务已完成”的话
- `acceptance`：检查点写明目标；没有产物时保留 `unknown`；区分事件与完成；不声称原因或供应商行为；记录 `external actions: not_run`。
- `transfer`：把同一检查点用于超时、浏览器会话丢失、工具缺失、交接断开或其他中断。保持不变的是：下一步需要新证据；变化的是可观察产物和安全边界。
- `forbidden_claims`：当前服务可用性、根因、队列行为、重试成功、模型质量、平台等价性、计费行为、任务完成、安全有效性、学习者能力、迁移成功或生产就绪

## 内容位置

- `primary_chapter`：[第 9 章——验证、怀疑与恢复](../../book/chapters/09-verification-and-recovery-ZH.md)
- `supporting_chapters`：[第 6 章——模型选择](../../book/chapters/06-model-selection-ZH.md)；[第 19 章——评估模型与工作流](../../book/chapters/19-evaluate-models-and-workflows-ZH.md)
- `primary_lab`：[Lab 013——可审计垂直切片](../../book/labs/lab-013-l3-vertical-slice-ZH.md)
- `supporting_labs`：[Lab 001——第一个安全任务](../../book/labs/lab-001-first-safe-task-ZH.md)
- `related_skill`：[Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md)；[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)；[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)；[LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture`：[three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md)，`not_run`
- `update_registry_entry`：公开报告变化、纳入一手 Codex 指引、提出现场运行，或读者要求产品特定恢复方案时复查

本案例把一个已有的公开信号转化为可教学的候选案例，但不提高关联章节、实验、Skill、评测或平台主张的成熟度。

## 隐私、权限与维护

- `personal_data_removed`：是；未复用来源身份、账户或环境细节
- `secrets_removed`：是；未包含凭据、令牌、计划、模型标识符、项目路径、任务载荷或日志
- `private_paths_removed`：是
- `copyrighted_material_boundary`：仅使用原创摘要和虚构夹具；未复制 Issue 原文、评论、解决方法或文档正文
- `asset_register_entry`：S103，见 `docs/sources/asset-register.md`
- `volatile_facts`：Issue 状态、来源元数据、服务可用性、API 限速细节、产品控制、帮助路径和平台行为
- `next_review`：2026-09-14，或在提出恢复、容量或产品主张之前
- `change_trigger`：来源变化、纳入一手 Codex 文档、拟议现场运行，或请求教授重试/配置流程
- `owner`：research-maintainer

## 主张边界

- `what_can_be_claimed`：一份有日期的公开报告现在被表示为有界候选案例，包含来源类别、证据类别、复现状态、离线检查点练习和停止条件。
- `what_must_not_be_claimed`：报告普遍、当前有效、可复现或由 API 限速造成；中断可以安全恢复；某供应商更好或更差；练习能够避免丢失；或已经建立学习者、运行时、发布或生产主张。
- `next_smallest_check`：独立审阅并获同意后运行虚构检查点的离线练习；不得收集账户、模型、任务、提示、项目、用量、个人或外部服务数据。
- `current_status`：`candidate`
