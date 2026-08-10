# 内容融合矩阵

这份矩阵把来源方法、章节、实验和可执行能力放在同一张图上。它记录的是“项目如何重新组织并验证能力”，不是外部资料的复制清单。

> L0–L6 的唯一资产归属、前置关系和评测任务映射见[学习路径契约](governance/learning-path.yaml)。本表保留内容融合理由和来源边界；当两者冲突时，先修正契约或记录新的关系，不在表内静默改等级。

## 状态约定

- `content_status` 用于章节和能力内容：`draft`、`candidate`、`verified`、`production-ready`。
- `lab_status` 用于实验文件：`draft`、`candidate`、`verified`、`production-ready`。
- `skill_status` 用于项目 Skill：`draft`、`candidate`、`verified`、`production-ready`。
- `claim_status` 只用于易变事实断言：`current`、`stale`、`disputed`、`removed`。
- 学习路径关系使用 `primary`、`supporting`、`transfer`、`reference`；同一个实验或 Skill 被复用不等于产生了新的资产或新的掌握证据。
- 本表有 13 个课程映射，当前磁盘上有 13 个实验文件；主题重复时在“新增能力”列说明递进关系。

## 13 个实验映射

| 映射 | 方法与学习目标 | 来源/依据 | 章节 | 实验映射（真实文件） | Skill 映射 | 主题重复时新增的能力 | content_status | lab_status | skill_status | claim_status |
|---|---|---|---|---|---|---|---|---|---|---|
| M01 | GPT、模型与 Codex 的边界 | [官方基线](research/openai-codex-baseline.md) | [第 1 章](../book/chapters/01-gpt-and-codex.md) | [实验 011](../book/labs/lab-011-gpt-codex-boundaries.md) | [Codex Coach](../skills/prysai-codex-coach/SKILL.md) | 第一次建立“能力、产品、工具、证据”四层区分，并以静态任务卡观察边界 | candidate | draft | candidate | current |
| M02 | 第一个低风险、可回滚任务 | S01 | [第 2 章](../book/chapters/02-first-safe-task.md) | [实验 001](../book/labs/lab-001-first-safe-task.md) | [Task Protocol](../skills/prysai-task-protocol/SKILL.md) | 从解释边界推进到先检查、再修改、留 diff 和验证输出 | candidate | draft | candidate | current |
| M03 | 把愿望改成任务协议与切片 | S05 | [第 3 章](../book/chapters/03-task-protocol.md)、[第 10 章](../book/chapters/10-planning-and-slicing.md) | [实验 002](../book/labs/lab-002-task-protocol.md) | [Task Protocol](../skills/prysai-task-protocol/SKILL.md) | 从“写清楚任务”增加依赖、停止点、失败处理和交付接口 | candidate | draft | candidate | current |
| M04 | 上下文、权限与 Agent 行动边界 | [第 4–7 章官方事实刷新](research/openai-codex-facts-refresh-2026-08-09.md)；[官方事实缺口审查](research/official-facts-gap-review-2026-08-10.md)；[真实问题研究索引](research/field-problems-index-2026-08-10.md)；[后续研究](research/field-problems-follow-up-2026-08-10.md) | [第 4 章](../book/chapters/04-context-permissions-and-agent.md)、[第 12 章](../book/chapters/12-agent-loop-and-stop.md) | [实验 007](../book/labs/lab-007-action-boundaries.md) | [Codex Coach](../skills/prysai-codex-coach/SKILL.md) | 从任务协议增加信任边界、确认点、回滚和“登录不等于授权”判断；本轮补充控制层拆分和用户报告的排查卡 | candidate | draft | candidate | current |
| M05 | 证据审查与恢复 | S05；[真实问题后续研究](research/field-problems-follow-up-2026-08-10.md) | [第 9 章](../book/chapters/09-verification-and-recovery.md)、[第 19 章](../book/chapters/19-evaluate-models-and-workflows.md) | [实验 003](../book/labs/lab-003-evidence-review.md) | [Evidence Review](../skills/prysai-evidence-review/SKILL.md) | 从检查 diff 增加断言—证据对应、未知状态和最小补证动作；本轮补充长等待、自动重试和用户报告证据边界 | candidate | draft | candidate | current |
| M06 | 文件、终端、浏览器、GitHub 的动作分级 | [第 4–7 章官方事实刷新](research/openai-codex-facts-refresh-2026-08-09.md)；[官方事实缺口审查](research/official-facts-gap-review-2026-08-10.md)；[真实问题研究索引](research/field-problems-index-2026-08-10.md)；[后续研究](research/field-problems-follow-up-2026-08-10.md)；[论坛研究](research/field-problems-forums-2026-08-10.md) | [第 5 章](../book/chapters/05-choose-the-codex-surface.md)、[第 13 章](../book/chapters/13-action-boundaries.md) | [实验 007](../book/labs/lab-007-action-boundaries.md) | [Task Protocol](../skills/prysai-task-protocol/SKILL.md) | 在行动边界基础上新增入口选择、外部副作用和组织仓库风险比较；本轮补充多目录、代理、网络和工具调用的可观察边界 | candidate | draft | candidate | current |
| M07 | Skill、Plugin、MCP 与工具的最小组合 | [第 4–7 章官方事实刷新](research/openai-codex-facts-refresh-2026-08-09.md)；[官方事实缺口审查](research/official-facts-gap-review-2026-08-10.md) + S03/S05/S06 | [第 7 章](../book/chapters/07-skills-plugins-and-tools.md)、[第 14 章](../book/chapters/14-discover-and-audit-skills.md) | [实验 004](../book/labs/lab-004-skill-selection.md) | [Skill Selector](../skills/prysai-skill-selector/SKILL.md) | 从“知道能力层”增加触发边界、依赖、许可证、权限和验证成本比较；本轮补充安装前审查与状态分段 | draft | draft | candidate | current |
| M08 | 把稳定流程沉淀为 Skill | S06 | [第 11 章](../book/chapters/11-designing-a-skill.md) | [实验 005](../book/labs/lab-005-design-a-skill.md) | [Skill Selector](../skills/prysai-skill-selector/SKILL.md) | 从选择能力增加正例、边界例、失败例、版本和新鲜上下文试用 | draft | draft | candidate | current |
| M09 | Agent 的状态、重试与停止条件 | S05；[真实问题后续研究](research/field-problems-follow-up-2026-08-10.md) | [第 12 章](../book/chapters/12-agent-loop-and-stop.md) | [实验 006](../book/labs/lab-006-agent-stop-conditions.md) | [Workflow Orchestrator](../skills/prysai-workflow-orchestrator/SKILL.md) | 从动作边界增加状态转移、重试上限、重复失败和权限冲突处理；本轮补充 handoff 缺失、无事件等待和“有新证据才重试” | draft | draft | candidate | current |
| M10 | 从主题收敛到可审查的研究问题 | S02 | [第 15 章](../book/chapters/15-research-track.md) | [实验 008](../book/labs/lab-008-research-question.md) | [Research Router](../skills/prysai-research-router/SKILL.md) | 从一般证据审查增加问题收敛、来源计划、访问日期和适用范围 | draft | draft | candidate | current |
| M11 | 从定义到交付的工程生命周期 | S05 | [第 8 章](../book/chapters/08-full-lifecycle-workflow.md)、[第 16 章](../book/chapters/16-engineering-track.md) | [实验 009](../book/labs/lab-009-engineering-lifecycle.md) | [Workflow Orchestrator](../skills/prysai-workflow-orchestrator/SKILL.md) | 从单次任务增加两次对照、返工记录、检查点和竖向切片 | draft | draft | candidate | current |
| M12 | 共享产品上下文与团队迁移 | S04 | [第 17 章](../book/chapters/17-marketing-track.md)、[第 20 章](../book/chapters/20-personal-codex-work-system.md)、[第 21 章](../book/chapters/21-team-capability-system.md)、[第 22 章](../book/chapters/22-continuous-update-and-future-proofing.md) | [实验 010](../book/labs/lab-010-product-context.md)；[实验 012](../book/labs/lab-012-team-capability-migration.md) | [Product Context](../skills/prysai-product-context/SKILL.md) | 从个人上下文增加版本、owner、权限表、独立复现、影响矩阵和回滚 | candidate | draft | candidate | disputed |
| M13 | 从任务协议到可审计交付的竖向切片 | [高阶方法研究](research/web-methods-synthesis-2026-08-10.md) + [网页田野研究](research/web-field-problems-2026-08-10.md) + [真实问题后续研究](research/field-problems-follow-up-2026-08-10.md) + [官方事实缺口审查](research/official-facts-gap-review-2026-08-10.md) | [第 8 章](../book/chapters/08-full-lifecycle-workflow.md)、[第 9 章](../book/chapters/09-verification-and-recovery.md)、[第 10 章](../book/chapters/10-planning-and-slicing.md)、[第 13 章](../book/chapters/13-action-boundaries.md) | [实验 013](../book/labs/lab-013-l3-vertical-slice.md) | [Workflow Orchestrator](../skills/prysai-workflow-orchestrator/SKILL.md)；[Evidence Review](../skills/prysai-evidence-review/SKILL.md)；[Task Protocol](../skills/prysai-task-protocol/SKILL.md) | 在既有协议、行动边界和证据审查之上，新增基线 hash、checkpoint、交接契约、故意失败和跨领域迁移的连续证据链；本轮纳入能力链断点与长等待失败变体 | candidate | draft | candidate | current |

## 转译规则

1. 先提炼问题、边界和证据，再决定是否需要 Skill；
2. 将外部流程重写为本项目的目标、行动、失败和验收，而不是复制原文；
3. 同一主题再次出现时，必须在“新增能力”列说明新增的判断、证据或迁移要求；
4. 许可证和归属记录在 [资源台账](sources/asset-register.md)，来源不因重新组织而消失；
5. `candidate` 只有在结构和基本检查成立时使用；完成正例、边界例、失败例和迁移验证后，才评估是否升为 `verified`；
6. 模型、工具、权限、界面和外部服务等易变断言必须绑定来源、访问日期、适用范围、owner 和复核日期。

## 当前边界

- 13 个映射都指向已存在的实验文件；主题重复通过章节和“新增能力”列表达递进关系。
- 13 个实验源文件的 frontmatter 当前均为 `status: draft`；表中的 `lab_status` 与其一致。
- 7 个项目 Skill 当前均为 `candidate`；结构校验通过不等于学习者已掌握，也不等于 `production-ready`。
- GPT-5.6 Luna 的“性价比最高”是待验证假设，因此相关断言保持 `disputed`，不能写成项目结论。
- 评测夹具、模型评测和展示页的存在不替代模型运行日志、学习者前测或独立复核。
- 第 4–7 章的官方事实刷新记录已接入来源入口；它只更新声明范围内的产品事实，不替代账户级、运行时或学习者证据。
