<!-- content_id: prysai-task-protocol | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 858b617 | source_license: project-owned CC-BY-4.0 -->

# 任务协议

把一个没有说清楚的请求整理成一份有边界的 Codex 任务协议，覆盖结果、上下文、输入、约束、允许的行动、验收证据、失败处理和交付方式。当请求模糊、返工风险高、涉及权限，或会产生外部副作用时使用。不要把它作为学习、证据审查、研究综合、产品背景、Skill 选择，或契约已经清楚之后的多阶段编排的主要路径。

## 触发边界与交接

处理“改进”“构建”“研究”“连接”等模糊动词，也处理范围、权限、验收标准或副作用不清楚的情况。

遇到以下情况交接：

- 用户明确调用了另一个 Skill；保留显式的 `$skill` 路径，只补充必要的安全问题；
- 用户已经提供了完整协议并希望执行：交给 Workflow Orchestrator 或相关领域路径；
- 用户在询问已有结果是否属实：交给 Evidence Review；
- 未解决的工作是寻找来源：交给 Research Router；
- 未解决的工作是产品定位：交给 Product Context；
- 未解决的工作是选择或安装 Skill：交给 Skill Selector。

绝不要再次调用自己。可以列出交接路径，但另一个 Skill 返回后，除非用户改变了范围，否则不要递归重建协议。

## 必需输入与缺失输入的处理

收集 `goal`、`background`、`inputs`、`constraints`、`allowed_actions`、`acceptance_evidence`、`failure_handling` 和 `delivery_format`。同时将 `risk` 分类为 `R0`、`R1`、`R2` 或 `R3`；如果任务可能改变共享或外部状态，还要记录 `owner`、`checkpoint`、`rollback` 和 `confirmation`。把未知项标记为 `missing`，不要假设它们已经存在。先检查本地、低风险的输入，再询问问题；只有会改变范围、风险、实现选择或验收标准的问题才提问。对于外部、含秘密、生产环境、不可逆或涉及所有权的缺口，返回 `blocked on <field>`，不要执行。

在宣布协议已经准备好之前，先通过这道最低风险门槛：

| 风险 | 必需契约 | 默认行动 |
|---|---|---|
| `R0` | 明确的读取范围、输入、验收检查以及不写入边界 | 只解释或只读检查 |
| `R1` | 明确的本地目标、允许的写入/命令集合、检查点、回滚目标和可逆验收检查 | 仅执行本地可逆行动 |
| `R2` | 明确的共享/外部目标、数据暴露、负责人、行动级确认、检查点、回滚和证据负责人 | 在记录指定确认前阻止执行 |
| `R3` | 包含全部 `R2` 字段，并增加明确目的、独立检查，以及在不可逆、生产、含秘密或大范围行动前立即确认 | 硬停止；不能只靠本协议执行 |

将 `read`、`edit`、`run`、`network`、`commit`、`push`、`publish`、`deploy`、`restart` 和 `secret` 作为彼此独立的行动记录，并分别标记为 `allowed`、`not_allowed` 或 `confirmation_required`。宽泛的权限、登录状态或以往批准，都不能授权未列出的行动。如果用户要求多个行动，将它们拆成多个阶段；每个阶段分别记录风险、目标、确认、检查点、回滚和验收证据。

## 构建顺序

1. 说明结果和受益者。
2. 限定文件、系统、账户、版本和时间范围。
3. 将允许读取、写入、命令、网络调用、提交、推送和发布分开；不要放进一项没有区分的权限里。
4. 指定风险等级，定义准确目标、负责人、确认点、检查点、回滚和可观察的验收证据。
5. 标记假设、未知项和下一项交接。

对每一项验收声明，写明能证明它的可观察产物或命令输出，以及它不能证明的边界。协议不是执行证据。不要因为行动被请求、计划、启动或返回了貌似合理的文字，就把它标记为完成。

## 风险、副作用与确认

将 `R0` 定义为解释/只读，`R1` 为可逆的本地改变，`R2` 为外部服务或共享仓库改变，`R3` 为生产、不可逆、含秘密或广泛权限的行动。协议可以描述副作用，但执行必须获得针对准确目标和行动范围的明确授权。“拥有全部权限”的确认不能替代窄范围的目标确认。绝不要把秘密放入协议。对 `R2`/`R3`，确认必须在目标和行动确定之后发生，而不是之前。不要把成功构建、登录或演练当作之后写入、推送、发布、部署或重启的确认。

## 硬停止

在受益者或结果缺失、所有权不清楚、无法观察验收、会暴露秘密、目标含糊、不可逆行动没有确认，或项目规则与用户请求冲突时，返回 `blocked`。保留失败条件和停止原因。只有一项明确条件改变并且新的检查已命名时才允许重试；否则返回 `blocked` 或 `unverified`，不要无限重试。不要在字段缺失会改变风险或范围时，把它转换成猜测的默认值。

## 固定输出

必须准确返回：

1. `protocol_status`（`ready_to_execute` 或 `blocked_on`）
2. `goal`
3. `background`
4. `inputs_and_unknowns`
5. `constraints`
6. `allowed_actions_and_permissions` —— 分开的行动记录，包含行动状态、目标、风险、数据暴露和确认要求
7. `acceptance_evidence`
8. `failure_handling`
9. `delivery_format`
10. `handoff`
11. `risk`
12. `owner_and_confirmation` —— 准确的决策负责人、确认点和未确认的行动
13. `checkpoint_and_rollback` —— 可观察产物、恢复目标和恢复决策
14. `content_status`

## 证据与状态映射

在所有字段齐全前，协议本身是 `draft`；契约通过本地完整性检查但尚未运行时为 `candidate`；只有观察到声明的验收证据后才是 `verified`；只有生产、回滚、维护和所有权门槛都通过后才是 `production-ready`。通过检查必需字段是否满足风险门槛、逐项比较行动与准确目标及权限状态，并把每条验收声明追溯到可观察检查来验证协议。对 `R2` 和 `R3`，分别验证确认点、检查点、回滚和数据暴露记录。不要因为协议已经准备好就标记任务完成。

## 维护记录

- `source`：`CONTEXT.md`；`docs/charter.md`；`docs/quality/skill-quality-standard.md`
- `license`：项目原创改写；外部材料仍依据 `docs/sources/asset-register.md` 仅作参考
- `owner`：task-systems maintainer
- `version`：`0.2.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
