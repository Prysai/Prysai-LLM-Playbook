# 7 个 Field Guide Skill 的 fresh-context 独立质量审查

**审查日期：** 2026-08-09  
**审查范围：** `AGENTS.md`、`docs/quality/skill-quality-standard.md`、7 个 `skills/*/SKILL.md`、对应的 `agents/openai.yaml`  
**审查方式：** 新鲜上下文独立阅读、逐项内容审查、官方 `quick_validate.py`（显式 UTF-8）  
**审查状态：** candidate；不是生产发布批准，也不是运行时行为验证

## 1. 结论摘要

7 个目标 Skill 的 frontmatter 均通过官方 `quick_validate.py`。7 个 `agents/openai.yaml` 也都具备 `display_name`、`short_description`、`default_prompt` 和 `allow_implicit_invocation` 字段；但官方验证器不检查这些 YAML 字段，也不检查 Skill 的触发准确性、行为完整性、安全边界或输出质量。

内容层面，7 个 Skill 都已经超过“只有通用常识”的最低线：都有明确的方法、停止/边界语言或证据要求。不过它们仍然更像高质量方法草稿，而不是已经通过正例、边界例、失败例、迁移例和 fresh-context 行为测试的 `verified` Skill。主要共同缺口是：

1. 输入检查大多是概念性字段清单，没有“缺什么就停、什么可推断、什么必须确认”的可执行门槛。
2. 输出要求大多描述内容组成，缺少统一的最小输出 schema、失败输出格式和可判定验收条件。
3. 多个 Skill 都设置 `allow_implicit_invocation: true`，但没有在元数据或正文中定义彼此的优先级、排他边界和冲突路由。
4. 失败路径通常只有原则性提醒，缺少可复现的失败输入、状态标签、恢复动作和回归检查。
5. 渐进披露主要停留在“需要时使用资源”或项目资源列表，没有实际 `references/`、按阶段加载表或何时停止加载的规则。

建议暂时将 7 个 Skill 统一保持为 `candidate`。优先补齐 `prysai-product-context`、`prysai-workflow-orchestrator`、`prysai-task-protocol` 的输入/输出/停止契约，再处理隐式触发冲突；不要仅因为 quick_validate 通过就提升为 `verified`。

## 2. 审查标准与证据边界

本审查按项目质量标准的五项评估进行：

| 维度 | 本次检查的问题 |
|---|---|
| 触发准确性 | description 是否说明何时触发、何时不触发；是否与其他 Skill 重叠 |
| 行为完整性 | 是否覆盖正常路径、缺失输入、失败、停止和恢复 |
| 结果质量 | 是否定义输出结构、验收证据和不确定性表达 |
| 安全与边界 | 是否限制权限、秘密、外部内容和不可逆副作用 |
| 可维护性 | 是否使用版本/来源/资源边界，是否支持按需加载和可回归验证 |

本次没有执行 7 个 Skill 的真实调用、没有运行工具或外部服务、没有做 fresh-context 任务集前测，也没有验证 UI 中的实际隐式路由。因此以下“通过”只表示文本证据存在；“缺口”表示无法从 Skill 自身得到可审查的行为契约，不等于已经证明运行时一定失败。

## 3. 官方 quick_validate 结果

使用的验证器：本地 Codex skills runtime 提供的 `skill-creator/scripts/quick_validate.py`。由于 bundled Python 初始缺少 PyYAML，按 `AGENTS.md` 规则将 PyYAML 临时安装到系统临时目录，并使用 UTF-8 模式执行；没有向仓库添加依赖或修改项目文件。

| Skill | quick_validate | 结果说明 |
|---|---|---|
| `prysai-codex-coach` | 通过 | frontmatter 合法，名称和描述符合验证器规则 |
| `prysai-evidence-review` | 通过 | 同上 |
| `prysai-product-context` | 通过 | 同上 |
| `prysai-research-router` | 通过 | 同上 |
| `prysai-skill-selector` | 通过 | 同上 |
| `prysai-task-protocol` | 通过 | 同上 |
| `prysai-workflow-orchestrator` | 通过 | 同上 |

验证器实际覆盖 frontmatter 起始标记、YAML 可解析性、允许字段、`name` 格式/长度和 `description` 类型/长度；它不覆盖正文契约、`openai.yaml`、触发冲突、权限或运行时结果。

## 4. 共同发现

### 4.1 隐式触发冲突需要单独的路由规则

7 个 `agents/openai.yaml` 都设置 `allow_implicit_invocation: true`。这对用户体验友好，但当前没有优先级或互斥规则。以下请求至少有两个合理候选：

- “帮我把这个模糊需求变成计划”：`prysai-task-protocol`、`prysai-workflow-orchestrator`、`prysai-codex-coach`；
- “研究一下这个主题并判断来源”：`prysai-research-router`、`prysai-evidence-review`、`prysai-task-protocol`；
- “应该用哪个 Skill”：`prysai-skill-selector`、`prysai-codex-coach`；
- “这个任务完成了吗”：`prysai-evidence-review`、`prysai-workflow-orchestrator`；
- “建立产品定位”：`prysai-product-context`、`prysai-research-router`、`prysai-task-protocol`。

建议建立一个简短路由表，至少规定：显式 `$skill` 优先于隐式路由；任务协议优先于执行型路由；证据审查只在存在完成声明/结果时接管；Skill Selector 只在选择或安装决策明确出现时接管；Product Context 只在需要建立/更新共享上下文时接管；Workflow Orchestrator 只在跨阶段执行或多文件交付时接管。没有这层规则，7 个 Skill 的单独描述都合理，但组合行为不可预测。

### 4.2 `allow_implicit_invocation` 与危险动作应分离

所有 Skill 的正文都没有直接宣称可以自行获得权限，这是优点；但 `allow_implicit_invocation: true` 仍可能让用户不知道哪个方法正在介入。建议在每个 Skill 的输出中加入“当前 Skill/阶段/是否需要其他 Skill”的短字段，并规定遇到写入、发布、提交、推送、外部调用、秘密或不可逆动作时，隐式路由只能停在协议/计划层，不能把隐式触发当成授权。

### 4.3 输入和输出需要最小 schema

当前多数正文使用自然语言清单，例如“记录任务域、风险、上下文”或“提供问题、方法、来源列表”。这适合教学，但不足以让评测器判断缺字段。建议每个 Skill 增加：

```text
最小输入：必需字段；可选字段；缺失字段的处理；禁止输入
最小输出：固定字段；每字段的空值规则；状态枚举；下一步
通过条件：至少一个可检查断言；失败时的状态和恢复动作
```

### 4.4 渐进披露尚未形成实际资源边界

除 `prysai-codex-coach` 的项目资源列表和 `prysai-research-router` 的“按当前阶段加载领域参考”外，7 个 Skill 目录都没有 `references/` 或 `scripts/`。这不违反结构标准，但说明“渐进披露”目前主要是意图，不是可观察的加载行为。若正文继续保持短小，建议至少写明：默认只读哪些文件、进入哪个阶段才加载哪类资源、发现资源冲突时如何处理、何时停止扩展上下文。

## 5. 逐个 Skill 审查

### 5.1 `prysai-codex-coach`

**文件：** `skills/prysai-codex-coach/SKILL.md:3-10, 19-116`；`skills/prysai-codex-coach/agents/openai.yaml:1-6`

**已有优点**

- description 对“学习 Codex、改善工作流、选择工具/Skill、解释 Agent 行为、练习和掌握评估”给出了较清晰的触发范围（`SKILL.md:3-10`）。
- L0–L6 路由和“不要根据自信或术语猜等级”是可执行的路由原则（`SKILL.md:19-32`）。
- 教学循环要求目标、下一动作、证据、失败恢复和反思（`SKILL.md:34-46`），具备方法而非泛泛鼓励。
- 对外部副作用、秘密、不可逆变更和隐藏推理有明确边界（`SKILL.md:57-72`）。
- UI 展示名 `Codex Coach` 与内部 `$prysai-codex-coach` 分离，默认提示可触发目标清楚（YAML:2-6）。

**缺口**

1. **输入检查不够具体（P1）**：只要求找“最小具体例子”，但没有规定至少要收集目标、当前产物/上下文、允许动作、风险、期望证据和学习者可用时间。无例子时是否停、能否只讲概念不执行，没有明确状态。
2. **输出/验收没有固定 schema（P1）**：虽然列出五类学习证据（`SKILL.md:87-98`），但没有要求每轮输出固定的等级判断、下一实验、通过标准、失败变体和反思问题，难以做自动或人工一致评分。
3. **触发边界有重叠（P1）**：`which skill or tool to choose` 与 `prysai-skill-selector`，`evaluate whether mastered` 与 `prysai-evidence-review`，`improve workflow` 与 `prysai-workflow-orchestrator` 重叠；description 没有声明这些情况下何时让位。
4. **停止条件不完整（P1）**：只在外部副作用/秘密/不可逆/所有权不清时暂停；没有说明学习者不回答、证据不足、连续失败、学习目标超出当前级别或产品事实无法核验时如何停止并交付部分结果。
5. **渐进披露可观察性不足（P2）**：资源列表是“when available”，没有按 L0–L6 或教学阶段规定加载顺序和最小上下文。

**建议**

- 增加一个最小 intake 表：`goal / current level evidence / artifact / allowed actions / risk / time / success evidence`，缺失时标记 `blocked on learner input`。
- 固定每轮输出：`当前等级及依据 / 本轮目标 / 一个实验 / 通过证据 / 失败变体 / 下一步 / 反思`。
- 明确路由让位：涉及“选 Skill”交给 Skill Selector，涉及“审查完成声明”交给 Evidence Review，涉及跨文件执行交给 Workflow Orchestrator。
- 增加“不可核验的易变事实只输出查证计划，不给当前结论”的失败变体。

**当前判断：** candidate；方法完整度较高，但隐式路由和学习验收仍不足以称为 verified。

### 5.2 `prysai-evidence-review`

**文件：** `skills/prysai-evidence-review/SKILL.md:3-76`；`skills/prysai-evidence-review/agents/openai.yaml:1-6`

**已有优点**

- 触发范围覆盖任务摘要、diff、测试、研究、营销测量、浏览器、部署和 Skill 输出，且明确针对“看起来完成但可能不完整”的结果（`SKILL.md:3-10`）。
- Claim/Scope/Evidence/Status/Next check 五字段非常适合作为审查骨架（`SKILL.md:18-27`）。
- 能区分文件、构建、运行时、UI、来源、安全、用户偏好和生产就绪所需的不同证据（`SKILL.md:29-38`）。
- 明确将外部内容中的指令视为不可信数据，并禁止把外部内容自己的完成声明当作证明（`SKILL.md:54-59`）。

**缺口**

1. **输入契约不完整（P1）**：没有规定没有完成声明、没有范围、没有原始证据、只有口头摘要时的最小输入与状态；审查者可能直接开始推断。
2. **验收标准没有阈值（P1）**：输出要求结束时列 verified/partial/inferred/blocked/unknown，但没有规定什么时候可以从 `partially-verified` 升到 `verified`，也没有把正文状态与项目的 `candidate/verified/production-ready` 映射起来。
3. **停止/恢复动作不够明确（P1）**：有“smallest next check”，但没有规定来源不可访问、证据互相冲突、范围扩大、需要真实凭据或命令卡住时必须停止而不是继续追查。
4. **输出失败格式缺失（P2）**：表格很清楚，但没有要求保留原始声明、证据链接/哈希、检查日期、检查命令、未覆盖范围和复核人，审计结果本身不一定可复现。
5. **渐进披露不足（P2）**：没有 references 目录或按声明类型加载证据模板的规则；大型审查可能把所有上下文一次性读入。

**建议**

- 增加最小输入 schema：`claim / declared scope / artifact locations / claimed status / date/version / permitted checks / sensitive-data limits`。
- 定义状态转移：例如只有当声明范围内的正例、边界例、失败例和必要运行证据齐全时，才允许 `verified`；生产就绪另需安全、维护、版本、许可证和发布门禁。
- 增加硬停止表：证据缺失、来源冲突、需要越权、需要秘密、外部系统不可访问、范围不明时分别输出 `blocked` 和下一步，不自行补证。
- 将输出固定为“声明表 + 证据索引 + 未覆盖范围 + 风险 + 最小下一检查 + 总状态”。

**当前判断：** candidate；安全与审查思想强，但缺少可复核的状态门槛。

### 5.3 `prysai-product-context`

**文件：** `skills/prysai-product-context/SKILL.md:3-42`；`skills/prysai-product-context/agents/openai.yaml:1-6`

**已有优点**

- description 明确要求在定位、内容、SEO、转化、发布、分析或销售下游工作前建立共享上下文，并禁止虚构客户证据（`SKILL.md:3-10`）。
- Capture 清单覆盖产品、受众、JTBD、反用户、替代方案、反对意见、差异化、证据、客户语言、品牌和测量决策（`SKILL.md:18-26`）。
- Workflow 要求先检查已有上下文、标记假设、聚焦提问、版本化、写变更记录并告知下游权威来源（`SKILL.md:28-35`）。

**缺口**

1. **缺少明确停止条件（P0）**：正文没有 `stop/pause/confirm/blocked` 规则。尤其没有说明当产品事实、客户证据、品牌所有权、PII 授权或 canonical location 不清时必须暂停。
2. **写入边界不足（P0）**：`Save the canonical context`（`SKILL.md:33`）可能导致自动写文件，但没有要求确认目标路径、写入权限、备份/回滚、是否允许覆盖现有决定，也没有明确禁止把秘密或未经授权的客户资料写入上下文。
3. **输出 schema 不足（P1）**：Capture 是内容清单，不是版本化文档格式；没有规定事实/假设/待验证证据的字段、来源日期、owner、复核时间、changelog 格式和空值规则。
4. **触发边界不足（P1）**：容易与 Research Router、Task Protocol 和营销文案任务重叠；没有说明“已有权威 context 的单次文案润色”不应重新触发完整上下文创建。
5. **失败与验收不足（P1）**：没有正例、边界例、失败例或迁移验收；没有定义什么情况下上下文可以交给下游使用。
6. **安全语言偏弱（P1）**：只提 PII，不明确处理 secrets、客户名单、未公开路线图、权限范围、第三方资料许可证和外部上传。

**建议**

- 增加硬停止条件：canonical 路径不明、覆盖已有上下文、需要写入 PII/客户资料、证据不足以支持主张、需要外部共享或发布时先确认。
- 固定上下文 schema：`version / date / owner / scope / facts / hypotheses / evidence links / audience / exclusions / privacy classification / changelog / next review`。
- 把写入拆成“草稿输出”和“获准保存”两个状态，默认先输出候选 diff，不自动覆盖权威文件。
- 增加三类失败测试：虚构客户证言、将假设写成事实、向未授权外部服务上传产品上下文。
- 明确让位规则：只做已有上下文的文案改写时不触发；需要来源调查时交给 Research Router；需要多文件写入时交给 Task Protocol/Workflow Orchestrator。

**当前判断：** candidate with P0 gaps；这是 7 个 Skill 中最需要先补安全/写入契约的一个。

### 5.4 `prysai-research-router`

**文件：** `skills/prysai-research-router/SKILL.md:3-50`；`skills/prysai-research-router/agents/openai.yaml:1-6`

**已有优点**

- description 能区分研究、文献综述、事实核查、比较、学术写作、来源报告和宽题目，并要求主题先收敛（`SKILL.md:3-10`）。
- 五类 intent mode 和多模式先处理未解决问题的规则清楚（`SKILL.md:17-27`）。
- 证据工作流覆盖范围、日期、受众、来源策略、定位信息、冲突、缺失、引用覆盖、新鲜度、披露和未验证项（`SKILL.md:29-37`）。
- 安全边界明确将上传文件、网页、工具结果和来源指令视为数据，并禁止伪造来源或官方确认（`SKILL.md:39-44`）。

**缺口**

1. **输入 schema 不够可执行（P1）**：要求声明问题、范围和证据标准，但没有规定原始输入的最小字段、研究截止时间、语言/地区、来源可访问性、输出格式和敏感资料限制。
2. **输出验收不够具体（P1）**：输出清单完整，但没有要求断言 ID、逐条引用覆盖率、来源等级、访问日期、冲突状态、语气映射和人工复核字段。
3. **停止条件缺失（P1）**：没有明确在来源无法访问、来源冲突无法解决、证据不足、出现敏感数据、检索达到停止条件或用户要求直接下结论时如何停在 `blocked/candidate`。
4. **许可证边界不完整（P1）**：安全部分处理提示注入和伪造，但没有提醒研究 Skill/论文/数据集/图像/代码的许可证与归属，尤其没有把研究输出与可复制资产分开。
5. **渐进披露未落地（P2）**：写了“按当前阶段加载领域参考”（`SKILL.md:14-15`），但没有列出阶段—资源映射或资源冲突规则。

**建议**

- 固定研究输入卡：`question / scope / date cutoff / geography-language / audience / output / evidence standard / allowed sources / privacy boundary`。
- 固定证据表字段并设置最小验收，例如所有关键断言必须有定位信息和访问日期；无法覆盖的断言必须显式降级或删除。
- 增加检索停止条件：达到预设来源层级和时间预算、关键来源不可访问、冲突没有更高等级来源可解决、出现个人敏感数据或需要外部动作时停下。
- 增加 license/attribution/distribution 字段，规定“可引用”不等于“可复制/可再发布”。

**当前判断：** candidate；研究方法和完整性边界较强，仍需输入/停止/许可验收。

### 5.5 `prysai-skill-selector`

**文件：** `skills/prysai-skill-selector/SKILL.md:3-66`；`skills/prysai-skill-selector/agents/openai.yaml:1-6`

**已有优点**

- description 直接针对选择、组合、安装、目录和外部 Skill 决策，并拒绝按热度或整目录安装（`SKILL.md:3-10`）。
- 分类字段覆盖域、生命周期、输出、上下文、风险、确定性脚本和外部行动（`SKILL.md:18-22`）。
- 候选审查覆盖触发、方法、依赖、权限、副作用、来源、版本、许可证、证据、重叠和移除（`SKILL.md:24-35`）。
- 默认组合和“新增 Skill 必须贡献独立方法/资源/安全门”的原则较好（`SKILL.md:41-51`）。
- 输出六项与 `candidate/verified/blocked` 状态清晰，并禁止承诺正确性、访问或外部成功（`SKILL.md:53-66`）。

**缺口**

1. **安装/调用授权边界仍不够硬（P1）**：虽然检查权限和副作用，但没有明确“选择建议”和“实际安装/调用”是两个状态，也没有要求安装前确认目标路径、备份、回滚、测试账号和用户授权。
2. **候选输入与证据格式不足（P1）**：没有规定候选最少必须提供 `SKILL.md`、manifest、来源 URL、提交/版本、LICENSE/NOTICE、依赖和维护信号；没有规定缺失字段时如何标记 `blocked`。
3. **触发边界与 Coach 重叠（P1）**：`which skill to use` 清楚，但 Coach 也承诺“选择 skill/tool”；没有显式优先级。
4. **输出验收仍偏叙述（P2）**：要求最小比较或 smoke test，但没有固定比较维度、通过条件、失败恢复或转移测试格式。
5. **渐进披露不足（P2）**：没有规定先读 metadata，再读正文，再读脚本/资源的顺序，也没有限制候选上下文规模。

**建议**

- 将输出分成 `recommendation-only`、`approved-to-install`、`installed-candidate`、`verified` 四个状态，默认只输出建议。
- 加入候选准入表：来源/版本/许可证/NOTICE/依赖/权限/副作用/维护/移除；任何关键字段缺失即 `blocked` 或 `reference-only`。
- 强制最小 smoke test、边界测试、失败测试和 transfer test；保存输入、输出、退出状态、权限和回滚证据。
- 明确 Coach 负责学习路由，Skill Selector 负责候选比较；当用户只问“怎么学习”时不触发选择器。

**当前判断：** candidate；决策框架较成熟，但安装授权和测试证据需要补齐。

### 5.6 `prysai-task-protocol`

**文件：** `skills/prysai-task-protocol/SKILL.md:3-66`；`skills/prysai-task-protocol/agents/openai.yaml:1-6`

**已有优点**

- description 明确面向模糊请求、高重工风险、权限和外部副作用，并规定协议清楚前不执行（`SKILL.md:3-10`）。
- 八项协议字段覆盖目标、背景、输入、约束、允许动作、验收证据、失败处理和交付格式（`SKILL.md:18-29`）。
- 对只改变范围/风险/实现选择/验收的问题才提问，且允许低风险缺口先本地检查（`SKILL.md:31-37`）。
- 明确分离项目规则、Skill 方法、工具权限和外部不可信内容（`SKILL.md:39-48`）。
- 输出有 `ready to execute`/`blocked on`，质量检查也覆盖输入、写入范围、成功证据、失败和交付状态（`SKILL.md:50-66`）。

**缺口**

1. **触发面仍偏宽（P1）**：`make it better/build/research/optimize` 几乎覆盖大量任务，容易与 Coach、Research Router、Workflow Orchestrator 和 Product Context 同时触发；需要排他规则。
2. **“清楚”的判定缺少阈值（P1）**：没有定义哪些字段可留空、哪些必须确认，也没有针对 commit/push/publish、生产系统、秘密和不可逆动作的独立确认模板。
3. **输出验收没有示例（P2）**：协议字段完整，但没有一个最小有效协议样例、空字段行为、风险分级和可检查的 acceptance criteria 模板。
4. **失败恢复较抽象（P2）**：列出 stop/ask/retry/revert/escalate，但没有规定何时允许 retry、retry 必须改变什么、如何保留原错误和恢复点。
5. **渐进披露不足（P2）**：没有按低风险只读、文件修改、外部调用、发布等层级加载相应规则资源。

**建议**

- 建立必需字段矩阵：低风险只读任务至少需 goal/input/acceptance；写文件需 constraints/allowed actions/rollback；外部或不可逆动作还需 owner/confirmation/secret boundary。
- 对 commit、push、publish、deploy、restart、真实凭据建立独立确认字段，不能仅用 `allowed actions` 一行带过。
- 固定协议输出并增加 `assumptions / unresolved questions / checkpoint / rollback` 字段。
- 规定 retry 只能在错误分类、输入或环境条件改变且有新证据时执行。

**当前判断：** candidate；是核心基础 Skill，但必须进一步收紧宽触发和高风险确认。

### 5.7 `prysai-workflow-orchestrator`

**文件：** `skills/prysai-workflow-orchestrator/SKILL.md:3-55`；`skills/prysai-workflow-orchestrator/agents/openai.yaml:1-6`

**已有优点**

- description 指向跨步骤、跨文件、跨工具、端到端交付和检查点需求，并明确不可跳过定义/验证（`SKILL.md:3-10`）。
- 八阶段生命周期从定义到维护完整，包含验证、审查、交付和更新（`SKILL.md:17-30`）。
- 检查点覆盖不可逆动作、外部消息、生产变更、权限扩张、秘密和未解决冲突（`SKILL.md:33-37`）。
- 恢复规则要求保留错误/状态、分类、缩小范围、一次证据驱动变更后重跑，避免无限重试和扩大权限（`SKILL.md:40-44`）。
- Delivery contract 明确要求报告完成、不完整、推断、阻塞、下一步、验证和状态（`SKILL.md:46-55`）。

**缺口**

1. **路由层级冲突（P1）**：它可以在几乎所有复杂任务中调用 Task Protocol、规划、验证和审查，容易与这些 Skill 互相隐式触发；没有说明什么时候只编排而不再次调用其他 Skill。
2. **输入 schema 不完整（P1）**：定义阶段列出 outcome/users/non-goals/risks/acceptance，但没有规定现有工作树、依赖、权限、预算、时间、环境和用户授权是否为必填。
3. **检查点验收不足（P1）**：有“after two or three slices reassess”，但没有要求每个 checkpoint 产生固定 artifact，也没有定义失败后是继续、回滚、暂停还是请求用户输入。
4. **维护阶段缺少具体退出条件（P2）**：要求更新来源、上下文、限制和回滚，但没有版本、owner、review date、迁移/删除条件的最小格式。
5. **渐进披露不足（P2）**：没有按定义/计划/执行/验证阶段控制上下文和工具资源；完整任务可能过早加载所有规则。

**建议**

- 增加编排输入卡和范围门：`outcome / non-goals / files/systems / current state / dependencies / authorization / risk / budget / acceptance / rollback`。
- 明确委派规则：Orchestrator 只负责阶段状态和检查点；Task Protocol 负责协议字段；Evidence Review 负责声明审查；不要在没有独立缺口时重复调用。
- 固定每个 checkpoint 输出：`completed slice / diff or artifact / checks / failures / state / decision / next owner`。
- 为失败建立状态转移：`diagnose → retry once with changed condition`、`rollback`、`blocked on user`、`abandon with evidence`，避免只写“继续或缩小范围”。

**当前判断：** candidate；生命周期设计完整，但需要避免成为无边界的总路由器。

## 6. `agents/openai.yaml` 独立审查

7 个 YAML 均包含：

- `interface.display_name`：可见名称使用功能名，没有把 `prysai-` 技术前缀暴露给用户；
- `interface.short_description`：中文短描述与 Skill 主题基本一致；
- `interface.default_prompt`：都显式包含对应 `$prysai-*` 名称，便于直接调用；
- `policy.allow_implicit_invocation: true`：全部允许隐式调用。

逐项建议：

1. 为所有 YAML 增加或在项目级记录触发优先级/冲突矩阵；目前单看 YAML 无法知道为什么某个泛化请求会选择某个 Skill。
2. 对 `prysai-product-context`、`prysai-task-protocol` 和 `prysai-workflow-orchestrator` 评估是否需要在高风险上下文中默认只允许显式调用，或让隐式调用只能生成协议/草稿而不能写入/执行。
3. 保持 `display_name` 不带 `Prysai`、`prysai-`；当前展示层命名是正确的，技术命名空间只留在路径和显式调用中。
4. 在回归夹具中测试 default prompt 与 description 的同义改写、中文/英文请求、显式/隐式调用和冲突请求，而不是只检查 YAML 能否解析。

## 7. 仓库卫生旁注：额外拼写目录

`skills/pyrsai-codex-coach/` 目录存在，但没有 `SKILL.md`，也没有 `agents/openai.yaml`。它不在本次用户指定的 7 个目标 Skill 中，故不纳入质量评分；但它可能让目录扫描、人工发现或后续贡献者误以为存在第 8 个 Skill。

建议另开一次小范围清理任务，先确认它是误拼写、残留目录还是用户未提交资产，再决定删除、补齐或加入忽略规则。本次没有修改它，也没有删除任何既有内容。

## 8. 建议的后续验证顺序

1. **先补路由合同**：建立 7 个 Skill 的触发互斥/优先级矩阵，覆盖显式调用、隐式调用和冲突请求。
2. **再补三个基础 Skill**：优先 `prysai-task-protocol`、`prysai-workflow-orchestrator`、`prysai-product-context` 的输入、输出、停止和写入授权。
3. **建立 fresh-context 任务集**：每个 Skill 至少包含正例、相邻不触发例、缺失输入例、失败/提示注入例、迁移例；记录是否触发正确、是否停在正确位置、输出字段是否齐全。
4. **执行最小回归**：对每个 Skill 做显式调用和隐式调用各一轮；对冲突请求做路由测试；对高风险请求确认没有发生写入、发布、秘密访问或权限扩张。
5. **再考虑状态提升**：只有在正例、边界例、失败例、迁移例和新鲜上下文日志齐全后，才从 `candidate` 评估为 `verified`；生产使用还需来源、许可证、维护、版本和发布门禁。

## 9. 最终状态

- **结构验证：** 7/7 通过官方 quick_validate（UTF-8）。
- **UI 元数据：** 7/7 具有基本展示和显式调用字段；未被官方 quick_validate 覆盖。
- **内容质量：** 7/7 可作为 candidate 方法包；尚无本报告范围内足够证据称为 verified。
- **最高优先级缺口：** `prysai-product-context` 的写入/停止/隐私边界；全体 Skill 的隐式触发冲突；Task Protocol/Workflow 的高风险动作确认。
- **本次没有做：** Skill 修改、外部服务调用、真实运行时验证、提交、回滚或清理额外拼写目录。
