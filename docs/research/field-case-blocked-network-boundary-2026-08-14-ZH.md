<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# 现场案例：`FC-NETWORK-01`——请求被阻塞，不等于权限扩大

## 先从边界开始

请求被阻塞，说明当前路径无法继续；这不等于现在可以开放不受限制的网络、代理或更宽的权限。

开始改动设置前，先写下三件事：

1. 任务需要的一个外部结果，不要加入真实端点或秘密。
2. 能批准最小例外的人，或可以替代外部请求的获准离线产物。
3. 最小的非敏感探测，以及获准后要保留的证据。

其中任何一项未知，就停下来请求更窄的决定。本页是离线决策辅助，不是配置教程；它不发出网络请求、不教授代理设置，也不记录产品运行行为。

## 案例身份

- `case_id`：`FC-NETWORK-01`
- `title`：请求被阻塞，不等于权限扩大
- `problem`：网络请求被阻塞，用户需要决定是申请一个窄而可审查的例外，还是在没有证据时扩大访问。
- `audience`：使用带工具编程环境的初学者和审阅者
- `collected_at`：2026-08-14
- `owner`：research-maintainer
- `content_status`：`candidate`
- `related_chapters`：第 4 章；第 9 章；第 13 章
- `related_labs`：Lab 001；Lab 007；Lab 016
- `related_skills`：Task Protocol；Evidence Review
- `related_evaluations`：未分配

## 来源记录

- `source_type`：`forum`
- `source_url`：https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`：关于沙盒 Codex CLI 会话出站访问的公开提问
- `source_author_or_publisher`：公开 Stack Overflow 贡献者
- `accessed_at`：2026-08-10，见论坛研究集 `field-problems-forums-2026-08-10.md`
- `source_license_or_usage_boundary`：公开报告仅供参考；本案例只使用原创摘要和虚构离线夹具
- `quotation_policy`：未复制帖子原文、配置片段、日志、凭据、真实环境 URL 或解决命令
- `source_scope`：该问题只说明一名作者在一个环境中描述了出站请求被阻塞。它不说明当前配置语法、官方产品边界、安全解决方法、根因或其他环境中的行为。

## 报告的情况

- `user_report_summary`：一名公开提问者描述，在保留沙盒的同时需要命令访问一个公共主机，但请求在完成任务前被阻塞。
- `observed_symptom`：作者报告了类似代理或白名单的出站阻塞。
- `expected_behavior`：作者希望窄范围的网络路径能够与沙盒共存。
- `official_boundary`：本案例为 `unknown`；不教授当前配置语法或支持保证。
- `product_surface`：据报道为 CLI
- `product_version`：未记录为已核实事实
- `operating_system`：未记录为已核实事实
- `model_or_provider`：与教学决定无关
- `network_or_auth_context`：报告了受限的出站路径；未检查账户、代理或凭据
- `input_shape`：任务需要一个公共主机，但真实主机被刻意省略
- `risk_level`：如果真实任务扩大网络、暴露项目上下文或增加代理，则为 `high`

## 主张与证据表

| 主张 | 证据类别 | 来源或产物 | 日期 | 范围 | 限制 | 状态 |
|---|---|---|---|---|---|---|
| 一名作者报告在沙盒 Codex CLI 会话中出站请求被阻塞 | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | 一个报告环境 | 问题不是复现、诊断或支持保证 | candidate |
| 报告包含当前且安全的配置方案 | `not_observed` | 没有复制、测试或独立审阅配置 | 2026-08-14 | 产品配置与部署 | 有意排除在本案例之外 | unverified |
| 请求被阻塞就授权开放网络或修改代理 | `not_observed` | 没有所有者授权或在线任务 | 2026-08-14 | 修改网络策略的权限 | 阻塞是边界证据，不是移除边界的许可 | unverified |
| 请求应在目标、理由、最小范围和安全探测可审查前保持阻塞 | `project_inference` | 本案例、第 13 章、Lab 007 和 Lab 016 | 2026-08-14 | 保守的外部副作用教学规则 | 不定义供应商配置，也不保证例外一定安全 | candidate |

## 复现状态

- `reproduction_status`：`not_run`
- `reproduction_scope`：本项目没有发出网络请求、检查在线沙盒、修改代理、增加白名单或使用账户。
- `fixed_input_or_fixture`：**教学转换**部分的离线记录
- `logs_or_artifacts`：获准后可保留边界卡和简短决策记录
- `independent_reviewer`：待定
- `last_checked_at`：2026-08-14
- `root_cause_status`：`unknown`

## 最小安全诊断路径

| 步骤 | 只读检查或低风险行动 | 预期观察 | 停止规则 |
|---|---|---|---|
| 1 | 用本地夹具写明所需结果、主机类别、允许行动、证据和停止条件。 | 外部效果与任务目标分开。 | 主机、理由、所有者、数据类别或外部效果未知时停止。 |
| 2 | 把合成阻塞记录为 `reported`，列出缺失事实：有效策略、目标、最小范围和安全探测。 | 错误形态的记录仍是边界证据，不是诊断。 | 不推断配置变化、产品缺陷或成功的解决方案。 |
| 3 | 为所有者准备决定请求：为何需要主机、最小非敏感探测、要保留的证据和回滚路径。 | 审阅者可以批准、拒绝或缩小例外。 | 在线请求、代理变更、策略编辑、安装、上传或凭据使用前停止。 |

- `allowed_actions`：阅读虚构记录、分类证据、写本地决策请求、找出离线替代方案
- `forbidden_actions`：发出网络请求、编辑网络策略、增加代理、暴露秘密、安装依赖、修改权限、提交、推送、发布或使用账户
- `minimal_safe_probe`：四行边界卡，以及一份写明最小主机范围和非敏感测试的批准请求
- `stop_condition`：缺少所有者决定、数据分类、目标、证据计划或回滚路径
- `rollback_or_cleanup`：无须保留时删除本地临时记录；虚构夹具保持不变

## 教学转换

- `learner_problem`：任务需要外部输入，但第一次请求被阻塞，学习者想直接移除限制。
- `core_concept`：技术限制、任务需要和修改限制的权限是不同事实。错误不会自动产生新权限。
- `decision_to_teach`：暂停并申请最小、可审查的例外，或使用获准的离线产物、暂缓任务。两者都比悄悄扩大访问更诚实。
- `smallest_experiment`：只使用以下离线记录，不发出请求：

  ```text
  task: 核验一个尚未下载的校验和
  local record: 所需公共主机的请求在夹具中被阻塞
  proposed next action: 开放不受限制的网络并重试
  ```

  写下以下记录：

  ```text
  observed: 夹具记录了一个阻塞
  known need: 校验和任务需要一个指定类别的公共主机
  missing evidence: 有效策略、所有者批准、最小探测和回滚
  decision: blocked — 请求最小例外或使用获准的离线产物
  external actions: not_run
  ```

- `intentional_failure`：把阻塞当作开放网络的许可，未经审查就断言代理安全，或在没有可检查产物时声称校验和已核验。
- `required_artifact`：完整记录、一句话区分任务目标与权限请求，以及一个安全的离线替代方案
- `acceptance`：记录阻塞而不诊断；只用类别说明主机；拒绝无限制方案；写明所有者决定或离线替代；记录 `external actions: not_run`。
- `transfer`：把同一边界应用到包下载、研究 API、Webhook 或浏览器提交。保持“技术需要不会产生权限”这一不变量，改变目标和最小探测。
- `forbidden_claims`：当前 Codex 配置、官方网络政策、产品缺陷、安全代理、成功请求、本地复现、学习者能力、安全有效性、迁移成功或生产就绪

## 内容位置

- `primary_chapter`：[第 13 章——行动边界](../../book/chapters/13-action-boundaries-ZH.md)
- `supporting_chapters`：[第 4 章——上下文、权限与 Agent 行动边界](../../book/chapters/04-context-permissions-and-agent-ZH.md)；[第 9 章——验证、怀疑与恢复](../../book/chapters/09-verification-and-recovery-ZH.md)
- `primary_lab`：[Lab 016——副作用边界](../../book/labs/lab-016-side-effect-boundary-ZH.md)
- `supporting_labs`：[Lab 001——第一个安全任务](../../book/labs/lab-001-first-safe-task-ZH.md)；[Lab 007——行动边界](../../book/labs/lab-007-action-boundaries-ZH.md)
- `related_skill`：[Task Protocol](../../skills/prysai-task-protocol/SKILL.md)；[Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`：未分配
- `update_registry_entry`：公开来源变化、权威政策加入、拟议在线练习或添加配置示例时复查

本案例把旧的现场信号转换为可检索的有界案例，不提高任何关联内容的成熟度。

## 隐私、权限与维护

- `personal_data_removed`：是；练习完全虚构，不复用来源身份或真实端点
- `secrets_removed`：是；不包含凭据、代理、账户、项目路径或真实 URL
- `private_paths_removed`：是
- `copyrighted_material_boundary`：仅原创摘要和原创夹具；未复制帖子文字、配置或回答
- `asset_register_entry`：`docs/sources/asset-register.md` 的 S88
- `volatile_facts`：来源状态、产品配置、策略默认值、代理行为与产品支持
- `next_review`：2026-09-14，或在配置、安全、运行时或发布声明之前
- `change_trigger`：来源或官方文档变化、拟议在线练习或添加配置示例
- `owner`：research-maintainer

## 主张边界

- `what_can_be_claimed`：一份较早的公开报告现在被表示为有来源类型、症状、证据类别、复现状态、低风险诊断路径和停止条件的候选案例。
- `what_must_not_be_claimed`：报告当前或可复现；根因已知；无限制访问必要或安全；任何产品支持某配置；夹具证明安全控制；或学习者完成了决策。
- `next_smallest_check`：独立审阅并获同意后运行固定离线记录；不得产生网络流量或收集凭据、账户、项目、代理或个人数据。
- `current_status`：`candidate`
