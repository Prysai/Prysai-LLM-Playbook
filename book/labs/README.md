# Codex: From First Task to Real Work 实验室

实验的等级主归属以[学习路径契约](../../docs/governance/learning-path.yaml)为准。这里记录实验如何运行、观察和迁移；实验被章节复用时，复用关系不自动变成新的晋级证据。

实验室把章节中的概念变成低风险、可观察、尽量可回滚的学习任务。每个实验都有一个故意失败或边界条件；实验文件的 `status` 是实验内容状态，不是学习者已经掌握的证明。

## 状态约定

- `draft`：实验结构或内容仍在编写，尚未完成最低验证；
- `candidate`：结构和基本检查通过，但还没有完成声明范围内的新鲜运行、迁移或独立复核；
- `verified`：在声明范围内通过正例、边界例、失败例和迁移验证；
- `production-ready`：在 `verified` 之外，还通过安全、维护、版本、许可证和发布门禁。

实验的易变事实另用 `claim_status: current | stale | disputed | removed`，不能把它和实验成熟度混用。

## 实验索引

| ID | 实验 | level | domain | 对应章节 | status | 迁移焦点 |
|---|---|---|---|---|---|---|
| [lab-011](lab-011-gpt-codex-boundaries.md) | 分清 GPT、Codex、工具与 Agent | L0 | general | 第 1 章 | `draft` | 将静态边界表迁移到研究、工程或内容任务 |
| [lab-001](lab-001-first-safe-task.md) | 第一个安全任务 | L1 | general | 第 2、20 章 | `draft` | 将沙盒 README 任务迁移到个人可回滚文档任务 |
| [lab-002](lab-002-task-protocol.md) | 把模糊愿望改成任务协议 | L2 | general | 第 3、10 章 | `draft` | 将同一协议迁移到研究、营销或 UI 任务 |
| [lab-003](lab-003-evidence-review.md) | 发现“看起来完成但没有证据” | L3 | general | 第 9、19 章 | `draft` | 将声明—证据审查迁移到测试、研究或交付摘要 |
| [lab-004](lab-004-skill-selection.md) | 选择最小有效 Skill 组合 | L4 | general | 第 7、14、18 章 | `draft` | 将最小组合判断迁移到一个不同领域任务 |
| [lab-005](lab-005-design-a-skill.md) | 把一次成功沉淀为 Skill | L4 | general | 第 11、14 章 | `draft` | 将稳定步骤迁移为不依赖项目偶然细节的能力包 |
| [lab-006](lab-006-agent-stop-conditions.md) | 设计 Agent 的停止条件 | L5 | general | 第 12、13 章 | `draft` | 将状态表迁移到另一种可恢复失败场景 |
| [lab-007](lab-007-action-boundaries.md) | 行动边界分级 | L3 | general | 第 4、5、13 章 | `draft` | 比较个人沙盒和组织仓库的权限、回滚与证据 |
| [lab-008](lab-008-research-question.md) | 从主题收敛研究问题 | L3 | research | 第 15、22 章 | `draft` | 将来源计划迁移到另一个公开、低风险主题 |
| [lab-009](lab-009-engineering-lifecycle.md) | 工程生命周期对照 | L3 | engineering | 第 8、16、19 章 | `draft` | 将生命周期检查点迁移到一个小型非工程交付 |
| [lab-010](lab-010-product-context.md) | 建立共享产品上下文 | L3 | marketing | 第 17、20、21、22 章 | `draft` | 将上下文版本和假设/事实区分迁移到团队内容任务 |
| [lab-012](lab-012-team-capability-migration.md) | 把个人方法迁移为团队能力包 | L6 | team | 第 21、22 章 | `draft` | 将能力包迁移协议应用到工程、研究或内容流程 |

## 实验记录模板

```yaml
id: lab-000
title: "实验名称"
level: L0
domain: general
goal: "要学会什么"
setup: "需要的项目、文件、权限和工具"
task: "学习者要给 Codex 的任务"
evidence:
  - "需要提交的结果或日志"
failure_variant: "故意引入的错误或缺失输入"
transfer_task: "把能力迁移到另一个低风险领域的任务"
transfer_domain: "目标领域"
transfer_evidence: "证明迁移成功所需的证据"
transfer_limitations: "迁移结果不能支持的结论"
reflection: "学习者必须回答的问题"
status: draft
last_verified: null
```

## 使用规则

1. 先读实验的前置条件和秘密/副作用边界，再开始操作；
2. 固定输入、运行记录、差异、验证输出和复盘回答；
3. 缺少关键输入、权限或回滚方式时，停在澄清或模拟，不自行扩大范围；
4. “看起来完成”不替代证据；没有运行日志时保持 `draft` 或 `candidate`；
5. 真实文件只有上表列出的 12 个实验。内容矩阵会明确说明主题重复时新增的能力，不把重复主题写成新的方法。
