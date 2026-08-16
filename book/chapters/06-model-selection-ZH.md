<!-- content_id: chapter-06-model-selection | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 第 6 章：模型选择不是模型崇拜

**状态：** `candidate`。下文的比较协议已经写明并有来源边界，但本仓库尚未运行固定任务集。模型性能、成本、延迟、容量、稳定性和总体排名仍为 `not_run`。

## 本章要解决的问题

谈模型选择时，人们常用一句口号替代判断：“用最好的模型。”真实工作需要问得更具体：

> 针对这项任务，在这个工作面、这个提供商、这组上下文与工具、这条权限边界、这个时间预算和验收量表下，哪个候选项能达到最低要求？我们是否已有足够证据扩大试验？

若候选模型在所选工作面不可用，或两次运行使用了不同输入、工具、权限或推理设置，就不存在干净的模型比较。漂亮演示至多说明某个配置曾产生一个结果，不能建立通用排名或总体性价比结论。

## 学习目标

完成本章后，你应该能够：

- 先选择任务和工作面，再选择模型；
- 在实际账户、工作区、提供商和会话中核验模型可用性，而不是根据目录或选择器推断；
- 将模型 ID、提供商、推理强度、上下文、工具、权限和验收标准视为不同的比较变量；
- 运行低风险的三任务冒烟比较，而不为“救回”某一个候选项而改变条件；
- 将容量不足、提供商不匹配和长时间等待失败保存为证据；以及
- 说明实验能证明什么、不能证明什么，以及何时该停止。

## 现实问题入口：模型选择会在日常情境中失败

项目的 [Codex 现场研究](../evidence-library-ZH.md#source-notes) 汇集公开 GitHub Issue 和其他公开讨论。这些记录是症状，不是官方诊断或本地复现；它们的价值在于暴露模型选择出错时人们常作出的假设。

| 公开症状 | 报告者观察到什么 | 它**不能**证明什么 | 第一个安全响应 |
|---|---|---|---|
| 模型选择器更改了 `model`，却保留自定义 `model_provider` | 可见模型和实际提供商可能构成无效配对 | 选择器、提供商或模型在所有环境中都已损坏 | 同时读取实际生效的 `model` 与 `model_provider`；更正前保留脱敏后的配置 diff |
| 所选模型处于容量限制 | 任务在得到完整结果前停止，后续提示可能面对部分状态 | 模型质量低，或重试就代表第一次已经完成 | 保存检查点、diff、日志和测试；继续前先分类该状态 |
| Windows 命令持续显示 `Working` | 界面显示仍在活动，却没有可验证输出 | 格式化器、Agent 或模型仍在进行有用工作 | 采用超时/停止规则，安全中断，检查 worktree，只重跑有界检查 |

原始链接、日期、版本、证据等级和不确定性说明见[模型选择研究记录](../evidence-library-ZH.md#source-notes)。本项目没有执行这些报告中出现的命令或解决方案。

### 怎样使用真实报告，而不把它变成传说

每个症状都要分开保留四种标签：

1. **用户报告：** 某人在具名环境中所说发生的事情。
2. **独立报告：** 是否有另一位用户描述相似症状。
3. **官方确认：** 维护者回复、官方文档、发行说明或其他第一方证据。
4. **Playbook 证据：** 本项目实际复现了什么。

上面三个例子可能已有前两类标签，但项目没有本地复现，也没有官方根因确认，不能把它们升级为保证有效的修复方案。因此行动应是保存证据、缩小下一步检查，而不是承诺一个“神奇设置”。

## 1. 模型选择是一项配置决策

### 可用性先于质量

使用两个分开的关卡：

```text
官方产品文档
→ 实际账户 / 工作区 / 组织授权
→ 目标工作面和提供商
→ 模型在本会话中可见
→ 无害请求成功
→ 所需工具可调用
→ 任务结果已验证
```

每一个箭头对应不同断言。官方页面可以描述某模型，它仍可能不对某个账户开放；它也可能出现在选择器中，却在请求到达提供商时失败。一次成功的文本回复同样不能证明任务需要的文件、终端、浏览器或连接器可用。

在候选卡中使用这些字段：

```text
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
```

`not_observed` 是有效结果：它表示检查没有执行，或没有留下可用证据。它比用猜测填满表格更安全。

### 产品定位只是起始假设

在 2026-08-11 的来源检查中，官方 Codex 模型页大致这样描述推荐的 GPT-5.6 选择：

| 官方定位 | 合理的起始假设 | 仍需测试什么 |
|---|---|---|
| Sol：复杂、开放式工作，提供更多分析和打磨 | 当模糊性、判断或高价值审查占主导时尝试它 | 在你的任务集上的首轮通过率、时长、成本、稳定性和工具行为 |
| Terra：务实的日常主力 | 对需要强推理和工具使用的普通工作尝试它 | 在实际约束下是否达到你的验收阈值 |
| Luna：清晰、可重复、高吞吐工作 | 对提取、分类、转换和结构化摘要尝试它 | 加上上下文、提供商、推理强度与审查成本后，结果是否仍可接受 |

这些是产品描述，不是 Playbook 的基准测试结果。官方页面同样提醒：更高推理强度可改善复杂工作，但会花更久、使用更多 token。先用满足验收量表的最低强度；只有任务确实需要更多规划、分析或检查时才提高，并将该设置记入运行记录。

`Max` 与 `Ultra` 不是免费的质量标签。官方页面将 Max 描述为给单一任务更多推理时间，将 Ultra 描述为对可拆分复杂工作使用子代理。它们改变工作流与资源边界，因此 Ultra 运行不能与单代理运行当作纯模型比较。

### 模型、提供商和工作面构成一个元组

不要只写 `model = ...`。有用的比较身份是：

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

如果任何核心成员变化，要么是在比较不同工作流，要么应标记该次运行 `not_comparable`，并在新契约下重跑两侧。

官方文档描述本地桌面端、CLI 和 IDE 默认值共用 `config.toml` 路径，而 Cloud 对话有不同的默认模型边界。配置文件只构成配置证据：在认定元组已生效前，读回实际提供商和模型，再做一次无害请求。

## 2. 按正确顺序做决定

不要从偏爱的模型开始。使用以下顺序：

```text
定义任务和风险
→ 选择 Local / Worktree / Cloud
→ 选择入口与提供商
→ 核验目标访问和模型可用性
→ 冻结上下文、工具、权限、推理强度和验收标准
→ 运行同一任务集
→ 检查 comparable / not_comparable 行
→ 扩大、停止，或收集更多证据
```

### 先给任务分类

任务类别决定“足够好”是什么意思：

- **理解和提取：** 从材料中找到结构化值；
- **转换和生成：** 在固定 schema 下改写、摘要、分类或格式化；
- **规划和判断：** 处理约束、取舍和不确定性；
- **编码和使用工具：** 检查、编辑、运行和修复仓库；
- **研究和审查：** 查找来源、协调断言并暴露缺口；以及
- **创作和设计：** 在反馈轮次中保持一种风格。

一个候选项通过提取任务，仍可能不适合多文件修复或高风险证据审查。验收量表必须匹配任务类别。

### 锁定工作面与风险边界

选择能提供所需证据的最小环境。任务不需要远程执行时，将合成或脱敏输入保留在本地；当前未提交工作必须隔离时，使用可丢弃的 Worktree；仅在仓库、环境、网络、秘密信息和审查路径都已批准且可观察时使用 Cloud。

模型选择无法补偿缺失文件、不可用连接器、错误检出目录或未授权写入。环境错误时，应停在工作面决策，而不是在不平等条件下“测试”模型。

## 3. 运行前先写候选卡

每个候选模型或工作流使用一张卡：

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

第一次运行前，冻结：

- 精确的任务输入及其版本；
- 工作面、入口、提供商、模型和推理强度设置；
- 相关上下文与工具版本；
- 权限和允许的副作用；
- 验收量表和审查者；
- 时间边界与重试预算；以及
- 成本测量基准。

不要只为一个候选项改变提示词、增加上下文、授予工具、提高强度或放宽权限。若任务契约变化，递增版本，并在新版本下重跑两个候选项。

## 4. 实验：三任务冒烟比较

**实验状态：** `not_run`。这是练习协议，不是本仓库已经运行模型比较的证据。

### 准备

选择同一工作面上 `surface_available: yes` 的两个候选项。使用版本化、离线的 [`three-task-smoke-v1` fixture](../../evals/candidates/three-task-smoke-v1/README-ZH.md)，不要凭记忆重新造输入。它包含合成、非敏感输入和本地验证器，但不包含模型运行记录。不要使用生产数据、真实秘密信息、外部写入、发布、推送、部署或付费连接器。每个任务初始只运行一次，至多允许一次预先声明、格式相同的返工。

冻结 `task_set_version: three-task-smoke-v1`、两张候选卡、一份验收量表、原始输出位置、日志位置，以及针对不可用、容量中断、权限不匹配、输入漂移或工具版本漂移的停止条件。

### 固定任务

规范任务 ID 为 `extract-01`、`markdown-02` 和 `gap-review-03`，分别覆盖结构化提取、受约束 Markdown 转换和证据缺口审查。每个任务目录均含指令、一个冻结输入、一个预期输出和验证器；包在 `fixture.json` 中发布精确输入 SHA-256 值，供审查者发现漂移。

不要为某一候选项换成更漂亮的演示。如果输入、指令、输出 schema 或验收规则必须改变，创建新任务集版本，并重跑两侧。

### 任务步骤

1. 调用任一候选项前，完成并保存两张候选卡。
2. 在所选工作面核验可用性，并记录证据位置。
3. 按相同任务顺序、相同输入和相同验收量表运行候选项 A 与 B。
4. 在人工编辑前保存原始输出，记录事件、时长、成本基准和错误类别。
5. 运行失败时，只允许预先声明的受控返工。不要把反复盲目重试变成隐藏的成功指标。
6. 计算任何摘要前，审查每一行 `not_comparable`。
7. 结论只能是 `worth expanding`、`do not expand yet` 或 `insufficient evidence`，并记录限制与下一次运行条件。

### 证据

比较记录至少应包含：

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

另一位审查者应能重建这三个输入、条件和验收标准。不要用空单元格、估算值或另一候选项的输出填补中断运行；除非选定成本基准明确定义这种换算，token 数不是货币。

## 5. 失败变体与安全恢复

| 失败变体 | 为什么结果不可比较 | 安全处理 |
|---|---|---|
| 候选项在所选工作面不可见或不可调用 | 不存在同一工作面的对照运行 | 记录 `surface_available: no` 或 `not_observed`；停止该候选项，不将不可用性计作模型质量 |
| 模型选择器与提供商不一致 | 请求可能没有使用预期模型 | 保存脱敏后的实际配置 diff；修正元组，或把比较改为提供商/工作流测试 |
| 容量错误中断一侧运行 | 输出和时长不完整，下一次尝试可能从部分状态开始 | 保存错误与检查点；标记 `blocked` 或 `not_comparable`；只在声明的条件下重跑两侧 |
| 命令等待却没有可验证事件 | `Working` 标签不是结果 | 采用超时规则，中断，检查 diff 与进程状态，并将验证记录为缺失 |
| 一侧获得额外上下文、更高强度或新工具 | 自变量不再只有模型 | 标记 `not_comparable`，保存两条记录，并按冻结契约重跑 |
| 用一个吸引人的演示宣布总体赢家 | 样本量和结论范围不匹配 | 回到 `candidate` 或 `insufficient evidence`；扩大任务类别与重复次数后再扩大结论 |

面对容量或长等待失败，现实响应不是“不断点击直到成功”。应该保存最后已知状态，识别任务是完成、部分完成还是未知，再选择有界恢复。新对话可以作为恢复工作面，却不会继承旧对话的完成证明。

## 复盘

根据候选卡与原始证据回答，而不是根据记忆：

- 哪项任务改变了扩大/停止决定？
- 哪个差异可能来自模型，哪个可能来自工作面、提供商、上下文、工具、权限、容量或审查者？
- 在什么地方，更快或更便宜的输出仍会不满足验收量表？
- 哪些句子是官方产品定位，哪些是本次冒烟运行的观察？
- 如果只有一个漂亮演示，究竟是什么阻止你得出通用排名？

## 迁移

将同一套比较字段迁移到以下任一任务：

- 同一模型在 Local 与 Worktree 上的比较；
- 带严格输出 schema 的文档转换；
- 带引用和未知项列的研究来源协调；或
- 带只读工具边界的低风险代码检查。

冻结新的任务集版本和领域验收量表。不要把模型选择或三任务结果直接复制到新领域；说明哪些结论仍局限于该任务，哪些主张必须放弃。

## 本章证据

预期交付物是两张候选卡、冻结的任务集与量表、初始原始运行及任何受控返工、一张比较表、类型化错误记录，以及扩大/停止决定。在这些记录存在前，本章实验必须保持 `not_run`；官方定位和一次演示都不能替代评测证据。

## 来源与维护边界

| 事实或方法边界 | 来源 | 访问日期 | 适用范围 | 负责人 / 下次复核 |
|---|---|---:|---|---|
| 官方模型定位、推理指导、本地默认值、Cloud 模型边界和弃用说明 | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | 访问当日的官方文档；不是账户级可用性证明或基准测试 | `facts-maintainer` / 2026-09-11 |
| CLI 工作面与本地仓库工作流 | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | 官方 CLI 文档；不是本会话的实际配置 | `facts-maintainer` / 2026-09-11 |
| Cloud 环境、设置、日志和审查边界 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | 官方 Cloud 文档；设置不等于 Agent 阶段完成 | `facts-maintainer` / 2026-09-11 |
| 公开模型/提供商、容量和长等待症状 | [现场问题记录](../evidence-library-ZH.md#source-notes) | 2026-08-11 | 用户报告和项目指导；没有本地复现或官方根因主张 | `curriculum-maintainer` / 2026-09-11 |
| 固定任务比较方法 | [中文课程目录中的评测章节状态](../table-of-contents-ZH.md) 与[版本化 fixture（中文说明）](../../evals/candidates/three-task-smoke-v1/README-ZH.md) | 2026-08-14 | Playbook 方法和本地 fixture 验证器；固定数据仍为共享材料，且没有任何已完成模型运行 | `evaluation-maintainer` / 2026-09-11 |

模型 ID、工作面矩阵、价格、容量、配置语法、提供商支持、推理控制和弃用通知都可能变化。发生变化时，先刷新第一方来源，再更新事实影响登记、研究记录、本章、受影响评测 fixture 和状态源。将官方定位、用户症状与本地运行时证据写在不同句子中。

## 验收清单

- [ ] 我能在命名模型前定义任务、风险、工作面、提供商和验收量表。
- [ ] 我能记录实际可用性证据，而不是从模型目录、配置值或选择器标签推断访问权限。
- [ ] 我能为两个候选项填写模型、提供商、推理强度、上下文、工具、权限、成本基准和任务集版本。
- [ ] 我能在不改变任一侧条件的前提下，运行或正确阻止 `three-task-smoke-v1` 的六次初始执行。
- [ ] 我能保存提供商不匹配、容量和长等待证据，并区分恢复与验证。
- [ ] 我只能报告任务范围内的观察，并能解释为什么一次演示不能证明总体排名或性价比。
- [ ] 我能说明本章仍为 `candidate`，实验与模型评测仍为 `not_run`。

本简体中文译文是可读的 `in-progress` 翻译单元，独立语言审校尚未完成；它不是已验证译文，也不表示课程已经通过学习者验证。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-ZH.md" aria-label="上一章: 第 5 章 · 选择正确的 Codex 工作面">← 上一章<br><strong>第 5 章 · 选择正确的 Codex 工作面</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-ZH.md" aria-label="下一章: 第 7 章 · Skill、Plugin、MCP 和工具如何分工">下一章 →<br><strong>第 7 章 · Skill、Plugin、MCP 和工具如何分工</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
