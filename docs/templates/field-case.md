# Field Case: `<case_id>` — `<short title>`

> 这是 Codex 真实问题案例模板。它用于记录用户报告、官方边界、项目观察、复现状态和教学转换。不要把帖子正文、私人日志、凭据、Cookie、私有路径、截图或未核准的代码直接复制进案例。

## 1. 案例身份

- `case_id`：
- `title`：
- `problem`：一句话说明这个案例要解决的现实问题。
- `audience`：适合哪类学习者或团队角色。
- `collected_at`：
- `owner`：
- `content_status`：`draft` / `candidate` / `verified`
- `related_chapters`：
- `related_labs`：
- `related_skills`：
- `related_evaluations`：

## 2. 来源记录

- `source_type`：`github_issue` / `forum` / `official_docs` / `official_discussion` / `support_thread`
- `source_url`：
- `source_title`：
- `source_author_or_publisher`：
- `accessed_at`：
- `source_license_or_usage_boundary`：
- `source_and_license`：来源、许可证/使用边界和本项目的引用决定。
- `quotation_policy`：只保留必要的原创摘要，不复制长段正文、代码、图片、日志或提示词。
- `source_scope`：来源能证明什么，不能证明什么。

## 3. 报告的情境与症状

- `user_report_summary`：用自己的话总结，不把推测写成事实。
- `observed_symptom`：用户实际看到了什么。
- `official_boundary`：官方资料或维护者明确确认的能力/限制；没有就写 `unknown`。
- `expected_behavior`：报告者认为应该发生什么；这是预期，不是官方承诺。
- `environment`：
- `platform`：
- `product_surface`：CLI / Desktop / IDE / Cloud / browser / other
- `product_version`：
- `platform_and_version`：把入口、产品版本、操作系统和相关依赖合并成可复核摘要。
- `operating_system`：
- `model_or_provider`：
- `network_or_auth_context`：
- `input_shape`：不包含秘密的输入类别和规模。
- `risk_level`：`low` / `medium` / `high`

## 4. 证据分类

把每条重要断言放进明确类别，并在 `evidence` 中记录来源、日期、范围和证据等级：

- `evidence`：

- `directly_observed`：本项目或来源页面直接观察到；
- `user_reported`：报告者声称观察到；
- `official_fact`：官方文档、维护者确认、发布说明或可核对的产品边界；
- `community_hypothesis`：论坛或社区提出的可能原因；
- `project_inference`：本项目基于证据做的推断；
- `not_observed`：当前没有观察到；
- `not_locally_reproduced`：本项目没有复现，不能写成已确认。

## 5. 复现与验证状态

- `reproduction_status`：`passed` / `failed` / `not_run` / `not_available`
- `reproduction_scope`：平台、版本、入口、账户范围和已测试条件。
- `fixed_input_or_fixture`：固定输入或评测夹具路径。
- `logs_or_artifacts`：证据文件路径；不得放入凭据或私人数据。
- `independent_reviewer`：
- `last_checked_at`：
- `root_cause_status`：`officially_confirmed` / `project_observed` / `hypothesis_only` / `unknown`

`closed` Issue、一次成功、HTTP 状态码、登录界面或文件存在，都不能单独证明根因已经确认或问题已经修复。

## 6. 最小安全排查路径

| 步骤 | 只读检查或低风险动作 | 预期观察 | 失败后如何停 |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

- `minimal_safe_probe`：在不扩大权限、不上传秘密、不删除数据的前提下，最小能区分的变量。
- `allowed_actions`：明确允许的动作范围。
- `forbidden_actions`：例如 force push、删除环境、绕过组织策略、上传凭据或盲目扩大权限。
- `stop_condition`：出现什么现象必须停在 `blocked` 或 `unverified`。
- `rollback_or_cleanup`：任何可逆动作如何撤销；若没有回滚，必须说明。

## 7. 假设与边界

| 假设 | 支持证据 | 缺失证据 | 安全检查 | 状态 |
|---|---|---|---|---|
|  |  |  |  | `unknown` |

`root_cause_status`：`officially_confirmed` / `project_observed` /
`hypothesis_only` / `unknown`。

## 8. 教学转换

- `learner_problem`：学习者遇到的可理解问题。
- `core_concept`：要补的 GPT/Codex/上下文/工具/Skill/Agent/证据概念。
- `decision_to_teach`：至少两个可行方案及其取舍。
- `smallest_experiment`：低风险、可观察、可复现的实验。
- `intentional_failure`：故意设置的边界或失败变体。
- `acceptance`：解释、操作、判断和审查四类证据，以及通过标准。
- `transfer`：迁移到工程、研究、内容、营销或团队工作的练习。

## 9. 失败与恢复

- `failure_and_recovery`：失败症状、停止点、已保存的证据、可逆恢复动作和仍未验证的部分。
- `forbidden_claims`：不能从本案例推出的普遍结论、修复结论或官方支持结论。

## 10. 内容落点

- `primary_chapter`：
- `supporting_chapters`：
- `primary_lab`：
- `supporting_labs`：
- `related_skill`：
- `evaluation_fixture`：
- `update_registry_entry`：

案例只能作为映射进入这些内容；它不能覆盖章节状态、实验运行状态、Skill 状态或评测运行日志。

## 11. 可声称与不可声称

- `what_can_be_claimed`：
- `what_must_not_be_claimed`：
- `next_smallest_check`：
- `current_status`：`candidate` / `unverified` / `blocked` / `verified`

必须明确写出：本条案例是用户报告、官方确认、项目观察还是推断；是否本地复现；适用的平台、版本和账户范围是什么。

## 12. 隐私、秘密与许可证

- `personal_data_removed`：
- `secrets_removed`：token、密码、API key、私钥、Cookie、`.env` 是否已排除。
- `private_path_removed`：
- `copyrighted_material_boundary`：未复制的长段正文、代码、图片、日志和提示词。
- `asset_register_entry`：

## 13. 维护

- `volatile_facts`：
- `next_review`：
- `change_trigger`：版本、官方文档、维护者回复、关联 PR、复现结果或安全边界变化。
- `owner`：
