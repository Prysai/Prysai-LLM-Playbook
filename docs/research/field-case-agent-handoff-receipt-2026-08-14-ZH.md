<!-- content_id: field-case-agent-handoff-receipt-2026-08-14 | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: field-case-agent-handoff-receipt-2026-08-14.md | source_revision: 2026-08-23 -->

# 现场案例：创建了子代理，不等于拿到了任务回执

## 先确认缺失的检查点

在任务列表中看到子代理出现，不等于知道它已经收到工作。在委派真实任务前，把下面的检查点分开记录：

1. 已创建交接请求；
2. 接收方代理已启动或被唤醒；
3. 接收方代理能出示无害的任务回执；
4. 接收方代理完成了所述行动；
5. 父流程收到了可以检查的结果。

只有第三个检查点能证明任务已经送达。如果它缺失，就把交接标记为 `blocked`，停止通过这条路径发送真实工作，改用单代理或人工交接。本页是离线决策辅助：它不会创建代理、发送消息、检查会话，也不会诊断产品。

![五个交接检查点：已创建、已启动、回执、执行和返回结果。回执是送达闸门。](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## 案例身份

- `case_id`：`FC-HANDOFF-01`
- `title`：创建了子代理，不等于拿到了任务回执
- `problem`：父流程看起来创建了子代理，但接收端可能无法观察到任务正文。
- `audience`：在多步骤、带工具的编程环境中学习的初学者和审阅者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第 10 章；第 12 章
- `related_labs`：Lab 013
- `related_skills`：Task Protocol；Evidence Review
- `related_evaluations`：未分配

## 来源记录

- `source_type`：`github_issue`
- `source_url`：https://github.com/openai/codex/issues/37822
- `source_title`：关于代理交接显示已创建、但没有可见任务回执的公开报告
- `source_author_or_publisher`：公开 GitHub 报告者
- `accessed_at`：2026-08-14
- `source_license_or_usage_boundary`：仅作参考的公开报告；本案例使用原创摘要和虚构的离线夹具
- `quotation_policy`：未复制 Issue 原文、命令、日志、截图、附件、账户、项目路径、供应商设置或复现档案
- `source_scope`：访问时，Issue 元数据显示这是一份公开且处于 Open 状态的报告。它只能说明一名作者在所述环境中的描述和预期，不能说明根因、当前产品行为、普遍性、受支持的解决方法，也不能推断其他账户、版本、供应商、工作流或平台的行为。

## 报告的情况

- `user_report_summary`：一名公开报告者描述了父流程向子代理交接的情况：子代理看起来已经启动，却像没有收到任务一样回复。报告者称，这一症状出现在不止一个指定的工作界面和设置中。
- `observed_symptom`：报告中的子任务可见或处于活动状态，但子代理的回复没有证明它收到了预期的任务文本。
- `expected_behavior`：报告者预期子代理能收到父流程提供的任务消息并据此行动。
- `official_boundary`：`unknown`。本案例不讲产品内部机制、当前能力支持、配置或修复方法。
- `product_surface`：报告涉及桌面端和 CLI；本项目没有复现任何一方。
- `product_version`：来源报告了版本和设置，但本案例没有独立核验这些事实。
- `operating_system`：来源作者报告了一个平台；本项目没有检查该平台。
- `model_or_provider`：来源涉及自定义供应商环境；本项目不比较供应商。
- `network_or_auth_context`：未检查；没有使用账户、凭据、供应商或连接。
- `input_shape`：仅使用虚构的固定短语回执检查；不包含真实任务、仓库、文件、秘密或用户内容。
- `risk_level`：如果真实工作流在确认回执前委派不可逆行动或敏感内容，则为 `medium`

## 主张与证据表

| 主张 | 证据类别 | 来源或产物 | 日期 | 范围 | 局限 | 状态 |
|---|---|---|---|---|---|---|
| 访问本案例时，公开 Issue #37822 存在且处于 Open 状态。 | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | 公开 Issue 元数据 | Open 状态不能证明存在活跃缺陷、优先级、可复现性或根因仍未解决。 | candidate |
| 一名报告者描述了子代理被创建或唤醒，却没有可见任务回执。 | `reported` | 同一公开 Issue | 2026-08-14 | 一名作者所述的环境和观察 | 该报告不是独立复现，也不是普遍行为主张。 | candidate |
| 消息因某个特定内部字段或解密路径而丢失。 | `not_observed` | 没有本地来源、运行时或独立审阅 | 2026-08-14 | 产品内部机制与诊断 | 不把报告者对机制的猜测采纳为项目事实。 | unverified |
| 创建、唤醒、回执、执行和返回是值得分别记录的断言。 | `project_inference` | 本案例；第 10 章；第 12 章；Lab 013 | 2026-08-14 | 保守的多步骤工作流教学 | 这不能保证交接实现、发现所有失败，或证明代理适合安全使用。 | candidate |

## 复现状态

- `reproduction_status`：`not_run`
- `reproduction_scope`：本项目没有调用交接工具、创建子代理、检查日志、读取会话、使用供应商或运行报告中的环境。
- `fixed_input_or_fixture`：**教学转换**中的原始离线回执卡。
- `logs_or_artifacts`：如果之后批准授权的学习者运行，可保留一张已完成的虚构检查点卡和有界决策回执
- `independent_reviewer`：待定
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小安全诊断路径

| 步骤 | 只读检查或低风险行动 | 预期观察 | 停止规则 |
|---|---|---|---|
| 1 | 阅读固定的虚构交接卡，并标出每个已观察检查点：已创建、已启动、回执、执行、返回。 | 不会把可见状态悄悄升级为任务回执。 | 如果引入真实任务、私有内容、工具调用、账户或配置，立即停止。 |
| 2 | 当卡片只有创建状态和泛化的子代理回复时，将回执字段标为 `not_observed`。 | 交接被分类为 `blocked`；不接受任何结果。 | 不要推断缺陷、权限缺失或安全的重试条件。 |
| 3 | 选择后备方案：一个有界的单代理任务，或可供人阅读的人工交接。 | 下一步有明确负责人，不依赖隐藏的送达假设。 | 在创建代理、发送消息、修改供应商设置、重试真实副作用之前停止。 |

- `allowed_actions`：阅读虚构记录、分类观察、写下本地回执，以及选择不委派的后备方案
- `forbidden_actions`：创建或唤醒代理、发送任务、暴露秘密、读取日志或会话、修改供应商或功能开关、重试副作用、安装软件、提交、推送、发布或使用账户
- `minimal_safe_probe`：使用固定短语 `RECEIPT-OK` 完成五项检查点卡
- `stop_condition`：任何用真实任务替代固定短语的尝试、后备方案没有负责人，或任何未经审阅的外部副作用
- `rollback_or_cleanup`：如果本地临时回执不含有用的决策记录，就删除它；虚构夹具保持不变

## 教学转换

- `learner_problem`：工作流面板显示存在一个助手，但学习者无法判断助手是否收到了任务。
- `core_concept`：生命周期可见性不等于消息送达。可信的交接必须在信任执行前设置回执边界。
- `decision_to_teach`：要么在另一个已批准的任务前先使用无害回执探针，要么在没有回执时把工作留给一个代理或人类交接。第一种方案增加一个检查点；第二种可能更慢。两者都不凭空制造送达证据。
- `smallest_experiment`：只使用本页的原始离线卡片：

  ```text
  handoff_id: demo-01
  parent_request: "准确返回：RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "等待分配任务。"
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  不运行工具，完成下面这张有界决策回执：

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — 使用单代理或人工交接
  external_actions: not_run
  ```

- `intentional_failure`：把 `created` 当作送达证明、要求子代理猜测缺失的任务、在缺少回执后发送真实任务，或把报告描述为已确认的产品缺陷。
- `required_artifact`：完成的回执、一句话说明哪个检查点未观察到，以及一个带负责人的后备方案
- `acceptance`：回执区分全部五个检查点；将消息回执标为未观察到；不写根因或配置；拒绝发送真实工作；写明后备方案；并记录 `external_actions: not_run`。
- `transfer`：把同一张检查点卡应用到队列工作器、Webhook、审批系统、构建流水线或团队工单。保持不变的是：可见的生命周期事件不等于预期内容已经到达下一个执行者。
- `forbidden_claims`：当前 Codex 缺陷、内部机制、受支持配置、安全重试、已复现运行结果、代理能力保证、学习者能力、迁移成功、安全有效性或生产就绪

## 内容位置

- `primary_chapter`：[第 10 章——规划与切片](../../book/chapters/10-planning-and-slicing-ZH.md)
- `supporting_chapters`：[第 12 章——Agent 循环与停止](../../book/chapters/12-agent-loop-and-stop-ZH.md)；[第 9 章——验证、怀疑与恢复](../../book/chapters/09-verification-and-recovery-ZH.md)
- `primary_lab`：[Lab 013——垂直切片](../../book/labs/lab-013-l3-vertical-slice-ZH.md)
- `supporting_labs`：[Lab 007——行动边界](../../book/labs/lab-007-action-boundaries-ZH.md)；[Lab 016——副作用边界](../../book/labs/lab-016-side-effect-boundary-ZH.md)
- `related_skill`：[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)；[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`：未分配
- `update_registry_entry`：来源变化、承认官方产品边界、提出受控的本地复现或请求可运行的交接练习时复查

本案例让一个较早的公开信号可被检索，并赋予它安全的教学形态。它不会改变关联章节、实验、Skill 或评测的成熟度。

## 隐私、权限与维护

- `personal_data_removed`：是；练习为虚构内容，不复用来源身份
- `secrets_removed`：是；没有使用凭据、账户、供应商、项目路径、任务载荷或会话内容
- `private_paths_removed`：是
- `copyrighted_material_boundary`：仅使用原创摘要和原创虚构卡片；未复制 Issue 原文、命令、日志、附件、截图或答案
- `asset_register_entry`：S89，见 `docs/sources/asset-register.md`
- `volatile_facts`：Issue 状态、产品支持、交接行为、版本、供应商、权限和实现细节
- `next_review`：2026-09-14，或在提出任何产品、运行时、配置或发布主张之前
- `change_trigger`：来源变化、官方文档承认、拟议的在线练习，或请求增加可运行的交接
- `owner`：research-maintainer

## 主张边界

- `what_can_be_claimed`：一份较早的公开报告现在被表示为一个有界案例，包含来源类型、症状、证据类别、复现状态、离线诊断路径和停止条件。
- `what_must_not_be_claimed`：报告当前仍然成立或可复现；所有交接都受影响；根因已知；某个设置能修复它；子代理收到了隐藏消息；离线卡片能发现所有失败；或学习者完成了真实委派。
- `next_smallest_check`：在独立审阅并取得同意后，于指定环境运行固定回执探针。必须使用无害短语，不收集会话、仓库、凭据、账户、私有任务或个人数据，并在任何副作用前停止。
- `current_status`：`candidate`
