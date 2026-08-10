# 四个 Skill 的独立合同审查

**审查日期：** 2026-08-10
**审查方式：** 四个独立 fresh-context 静态读取；没有把代理输出当作
Skill runtime、联网、账号、工具、迁移或发布证据。
**审查范围：** `prysai-codex-coach`、`prysai-workflow-orchestrator`、
`prysai-research-router`、`prysai-product-context`，以及项目规则、术语、
质量标准、评测框架和路由矩阵。
**总状态：** `candidate`；Product Context 的缺失输入案例为 `blocked`。

## 证据边界

本记录证明的是：在独立上下文中，审查者能否从 Skill 合同识别触发、让位、
必填输入、风险、停止条件、handoff 和未知项。它没有证明：

- Skill 已被真实触发或在当前入口稳定执行；
- 工具、网络、GitHub、账号、秘密、Plugin、MCP 或生产服务可用；
- 任意章节、实验或学习者已经 `verified`；
- 任何模型、Skill 或工作流具有跨任务的最佳性价比。

## 审查结果

| Skill | 正例/边界/缺失输入判断 | 已发现的合同缺口 | 当前结论 |
|---|---|---|---|
| Codex Coach | 学习、练习和掌握判断触发；执行、研究、审计和 Skill 选择让位；缺少学习合同字段时先补问 | 缺失输入与硬停止优先级不够明确；安全任务默认环境过于抽象；停止条件没有独立字段 | `candidate`；静态审查通过，runtime 前测待做 |
| Workflow Orchestrator | 多阶段、检查点、回滚和交付请求触发；单一教学或单一审计让位；阶段输入缺失时阻塞 | `commit` 的含义、确切交付目标、decision owner 和每阶段 exit evidence 未充分固定 | `candidate`；静态审查通过，runtime 前测待做 |
| Research Router | 研究、比较和宽题目触发；已有报告审计和执行型多阶段任务让位；只有主题时返回 `question_scoping` | 模型/工作流比较缺少候选集、任务集版本、上下文、工具、预算、重复次数、评分和日志责任等冻结字段 | `candidate`；静态审查通过，runtime 前测待做 |
| Product Context | 缺少共享产品/受众/定位上下文时触发；事实检索、审计和下游执行让位 | owner、decision、canonical location、context version 和 version baseline 缺失时不能建立权威上下文 | `candidate`；缺失关键输入案例为 `blocked` |

## 本轮处理

已将可执行的合同修正写回四个 Skill：

- Coach 明确先处理学习输入门，再处理安全硬停止；无具体例子时只允许文本练习或一次性本地副本，并显式输出 `stop_conditions`。
- Workflow Orchestrator 把 `decision_owner`、`delivery_target`、`input_and_action`、`exit_evidence`、`checkpoint`、`rollback`、`risk` 和 `confirmation` 作为阶段字段；区分 local commit、push、PR 和 publication。
- Research Router 为模型、provider、Skill 和 workflow 比较增加固定任务集、候选、上下文、工具、权限、预算、成功定义、重复、评分、日志和责任人。
- Product Context 把产品上下文版本与 Skill 自身维护版本分开；缺少 owner、基线或权威位置时不创建 changelog。
- 路由矩阵和 Skill 注册表补充了这些跨 Skill 契约及证据边界。
- 第 19–22 章补充了运行记录字段；第 22 章将不可访问的 `example.invalid` 夹具从 `current` 修正为 `disputed`。

## 未完成与下一步

仍需针对四个 Skill 各运行正例、边界例、失败例和迁移例，并保存输入、输出、
环境、权限、日志、复核和未验证项。完成前，7 个 Skill 继续保持
`candidate`，实验继续保持 `draft / not_run`，评测继续保持
`candidate / not_run`。

## 来源与许可

本记录是项目原创审查记录，依据项目内的 `AGENTS.md`、`CONTEXT.md`、
`docs/charter.md`、`docs/book-architecture.md`、`docs/quality/skill-quality-standard.md`、
`docs/quality/evaluation-framework.md`、`docs/quality/skill-routing-matrix.md`
和四个 Skill 文件。没有复制外部归档中的正文、图片、代码或 Skill 指令；
外部来源边界继续由 `docs/sources/asset-register.md` 管理。
