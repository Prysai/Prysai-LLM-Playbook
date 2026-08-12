# 第六章：模型选择不是模型崇拜

**本章状态：** `candidate`。比较协议和 smoke 交付格式已定义，但本仓库尚未运行固定任务集；任何模型性能、成本或总体排名仍为 `not_run`。

## 本章要解决的问题

模型选择很容易被一句“这个模型最好”替代。真实工作需要回答的是：在指定工作面、任务、上下文、工具、时间和预算下，哪个候选满足最低要求，是否值得扩大评测？

如果候选模型在当前工作面不可用，或两次运行使用了不同输入、工具和权限，就不存在公平的质量比较。即使一次 demo 很漂亮，也不能据此推出总体模型排名、总体性价比或其他任务上的优势。

## 学习目标

读者完成本章后应当能够：

- 先锁定工作面并验证 `surface_available`，再比较模型；
- 用 `availability_evidence` 记录账户和工作面上的实际可用性；
- 固定三个低风险任务、上下文、工具、权限和评分标准进行 smoke 对照；
- 在容量错误、权限阻塞或条件漂移时标记 `not_comparable`；
- 把 GPT-5.6 Luna 当作待验证假设，而不是预先宣布的总体最佳模型。

## 现实问题入口

FP-08 记录了 model 与 custom provider 不一致的配置问题，FP-09 记录了容量错误和排队任务风险。它们说明模型选择还包括 provider、版本、容量和恢复策略。入口：[Codex 真实用户问题现场研究](../../docs/research/field-problems-codex.md)。

## 一、概念：可用、可比和更适合是三件事

### 1. `surface_available` 是比较前置条件

官方模型页按工作面列出模型支持情况，但产品矩阵不等于当前账户的实际可见性。候选模型必须同时通过两层检查：

```text
官方工作面支持证据
→ 当前账户 / workspace / session 的实际可用证据
```

模型卡中的字段含义如下：

- `surface_available`：`yes / no / not_observed`，表示候选模型是否在本次指定工作面实际可选；
- `availability_evidence`：工作面、入口、账户范围、检查时间和可复核结果的位置；
- `not_available_reason`：官方不支持、账户不可见、组织策略限制、容量阻塞或尚未观察；
- `not_comparable`：`true / false`，表示该运行能否进入候选间的质量、成本或延迟比较；
- `not_comparable_reason`：不可比的具体条件差异或中断证据。

`surface_available = no / not_observed` 时，不运行该候选，也不把“不可用”计作质量失败。若另一个候选运行成功，两者仍然 `not_comparable`。

### 2. 用任务类型描述需求

先把任务分类，而不是先挑模型：

- **理解与提取：** 从材料中找出结构化信息；
- **转换与生成：** 按固定格式改写、归纳或生成；
- **规划与判断：** 处理多约束、权衡和不确定性；
- **代码与工具：** 读取项目、编辑、运行和修复；
- **研究与审查：** 找来源、核对证据、暴露缺口；
- **创作与设计：** 需要风格、审美和多轮反馈。

不同任务对速度、上下文、工具调用、长程一致性、视觉能力、成本和人工复核的权重不同。一个模型在结构化提取中通过，不代表它在复杂重构、研究或高风险审查中同样适合。

### 3. 一次 demo 不是总体排名

一次运行最多说明：某候选在该次工作面、输入、配置和验收标准下产生了一个结果。它不能独立证明：

- 该模型在所有任务上更强；
- 它长期更快、更稳定或更便宜；
- 它的总体性价比最高；
- 模型差异而非工具、权限、网络或评分偏差造成了结果差异。

因此 smoke 的结论域只允许是：`值得扩展 / 暂不扩展 / 证据不足`。

## 二、决策：按固定顺序建立候选与可比性

### 1. 选择顺序

```text
定义任务与风险
→ 锁定 Local / Worktree / Cloud
→ 核对候选模型在该工作面实际可用
→ 冻结输入、工具、权限和验收
→ 运行三任务 smoke
→ 审查 comparable / not_comparable
→ 决定扩展、停止或补证据
```

不能从某个模型出发倒推工作面，也不能为了凑齐结果，在中途为一个候选更换工具、输入或权限。

### 2. 先写模型 / 工作流卡

每个候选使用一张卡：

```text
candidate_id：
model_id / provider：
surface：Local | Worktree | Cloud
entry：
account_or_workspace_scope：
surface_available：yes | no | not_observed
availability_evidence：
not_available_reason：

reasoning_effort_or_config：
task_set_version：three-task-smoke-v1
context_fingerprint：
tools_and_versions：
permission_profile：
cost_basis：actual | credits | token_only | not_observed
acceptance_rubric_version：
known_capacity_or_network_issue：

not_comparable：true | false
not_comparable_reason：
conclusion_status：not_run | candidate | disputed
```

如果模型 ID、provider、工作面、上下文指纹、工具版本、权限、任务版本或成本口径不同，先标记 `not_comparable: true`，不要用平均分掩盖条件变化。

### 3. 指标先定义再记录

- **首次通过：** 第一次运行即满足该任务的全部冻结验收条件；
- **返工次数：** 第一次失败后，为满足同一验收而进行的额外尝试数；本 smoke 最多允许一次受控返工；
- **耗时：** 使用同一计时边界；排队和执行时间若不能拆分，应明确记录；
- **成本：** 记录实际可用口径，或写 `not_observed`；不能把 token 数直接冒充货币成本；
- **错误类型：** 至少区分事实、范围、格式、工具、权限、验证、容量和中断；
- **人工评分：** 运行前冻结评分表和评分人，不能看完结果再改标准；
- **可比性：** 任一核心条件改变或运行被环境阻断，该行标记 `not_comparable`，不计入胜负或平均值。

## 三、行动：低风险实验——固定三任务 smoke 对照

**实验状态：** `not_run`。以下协议用于产生最小运行证据，不代表模型评测已经发生。

### Setup

选择两个在同一工作面上 `surface_available = yes` 的候选模型或工作流。使用合成、脱敏输入；不访问生产数据，不调用写入型外部服务，不发布、不推送。每个任务固定一次初始运行，并最多允许一次使用同一反馈格式的受控返工。

运行前冻结：

- `task_set_version = three-task-smoke-v1`；
- 同一工作面、入口、上下文指纹、工具与版本、权限和推理配置口径；
- 两张候选卡和同一验收表；
- 原始输出、日志、时间和成本记录位置；
- 停止条件：不可用、容量阻塞、权限差异、输入变化或工具版本漂移。

### 固定三任务

| ID | 固定低风险输入 | 要求输出 | 运行前冻结的通过标准 |
|---|---|---|---|
| `smoke-1-extract` | 一段包含 `owner: Lin`、`due: 2026-08-15`、`status: candidate` 和两条无关句子的合成文本 | 仅输出含 `owner`、`due`、`status` 的 JSON | JSON 可解析；三个值逐字正确；没有新增字段或解释文字 |
| `smoke-2-transform` | 三条合成 Markdown 发布说明：新增导出、修复空标题、已知限制为不支持 PDF | 转成三列表格：`类型 / 内容 / 状态` | 三条信息均保留；已知限制不被写成已修复；只输出指定表格 |
| `smoke-3-evidence` | 合成声明：“构建成功，所以功能已上线；登录成功，所以仓库可读。”附证据：构建日志和登录截图，无部署或仓库读取记录 | 输出 `声明 / 已有证据 / 缺口 / 状态` 审查表 | 两项都不得判为已验证；分别指出缺部署证据和资源读取证据；状态使用 `candidate` 或 `unconfirmed` |

不得把三项替换成更适合某候选的自选 demo。若输入必须修订，提升 `task_set_version`，两边全部重跑；不得只替换失败一侧。

### Task

1. 填写两张候选卡，先验证 `surface_available` 和 `availability_evidence`。
2. 逐任务按同一顺序运行候选 A 与 B；保存原始输出，不先人工修饰。
3. 按冻结标准判断首次通过；未通过时只允许一次相同规则的受控返工。
4. 记录耗时、成本口径、错误类别、人工评分和可比性。
5. 先审查所有 `not_comparable` 行，再决定是否汇总。
6. 最终只选择 `值得扩展 / 暂不扩展 / 证据不足`，并列出限制与下一轮条件。

### 最小交付物

```text
smoke-comparison.md 或 smoke-comparison.csv
├─ 两张模型 / 工作流卡
├─ three-task-smoke-v1 固定输入与验收表
├─ 六次初始运行及受控返工的原始输出 / 日志索引
├─ comparable / not_comparable 记录
├─ 错误分类与人工评分
└─ 扩展 / 停止决定及限制说明
```

## 四、证据：只比较条件相同的记录

### Evidence

比较表至少包含：

```text
run_id | candidate_id | task_id | model_id | surface
| surface_available | availability_evidence
| context_fingerprint | tools_and_versions | permission_profile
| first_pass | rework_count | duration | cost_basis | cost_observed
| error_type | reviewer_score | comparable | not_comparable_reason
| raw_evidence
```

验收标准：

- 另一位审查者能重建三项固定输入、配置与验收条件；
- 两个候选均有工作面实际可用证据，而非只有官方支持表；
- 首次通过标准在运行前冻结；
- 至少记录一项具体错误分类；若本轮出现不可比事件，必须保留至少一项 `not_comparable` 记录；
- 不用空值、估算值或另一候选的结果补齐中断运行；
- 结论没有“总体最好”“总体排名第一”或“性价比最高”。

如果六项均可比，也只能报告 `three-task-smoke-v1` 内的任务级观察。要形成更强结论，必须扩展任务类别、样本、重复次数和审查者，并重新定义结论范围。

## 五、失败：何时必须标记 `not_comparable`

| 失败变体 | 为什么不可比 | 正确处理 |
|---|---|---|
| 候选模型在当前工作面不可用 | 没有同一工作面上的运行样本 | `surface_available = no / not_observed`，`not_comparable = true`；停止该候选，不记质量失败 |
| 一次运行发生容量错误或排队中断 | 没有完整输出，耗时边界也可能不同 | 保存错误与时间证据，记录补跑条件；不以另一候选结果代填 |
| 一个候选没有必要工具或权限 | 比较的是不同工作流能力，而非纯模型差异 | 标记工具或权限差异；恢复相同条件后全部重跑，或明确改成工作流比较 |
| 某一侧输入、提示、推理配置或工具版本改变 | 验收对象已变化 | 提升任务集或配置版本，两侧重跑；旧行保留但不进入汇总 |
| 单个漂亮 demo 被用来宣布总体最佳 | 样本与结论范围不匹配 | 退回 `candidate` 或 `证据不足`；加入另外两项固定任务并限制结论域 |

故意失败时，让其中一次运行出现容量错误、权限阻塞、输入被改变或工具版本不同。正确结果是该行 `not_comparable`，保留中断证据并写明补跑条件；不能为了得出排名而删除失败行。

## 六、反思与迁移

复盘时回答：

- 哪个任务真正改变了扩展或停止决定？
- 哪项差异来自模型，哪项可能来自工作面、工具、权限、容量或评分？
- 一个更便宜或更快的结果在哪些验收条件下仍不可接受？
- 哪些句子只是官方产品定位，哪些是本次 smoke 的运行观察？
- 如果只有一次 demo，为什么总体排名必须拒绝？

迁移时可选择一种：

- 把协议迁移到同一模型的两个工作面，比较完整工作流，但保留 `surface_available` 和不可比条件；
- 把任务迁移到文档转换、研究来源审查和低风险代码检查三个领域，重新冻结领域验收，不把本章三项的优势直接外推。

## 迁移练习

把 `three-task-smoke-v1` 的字段迁移到同一模型的两个工作面，或迁移到文档转换、研究来源审查和低风险代码检查三个领域。重新冻结输入、验收标准、`surface_available` 和 `not_comparable` 条件，并明确哪些结论只能留在任务级，不能外推为总体排名。

## 本章证据

交付两张候选卡、冻结任务与验收表、六次初始运行及受控返工的原始日志索引、`smoke-comparison` 表和扩展/停止决定。尚未运行时必须保留 `not_run`，不能用官方模型定位或一次演示补齐评测证据。

## GPT-5.6 Luna 的学习边界

截至 2026-08-10，官方模型页把 GPT-5.6 Luna 定位为快速、可负担、适合清晰和可重复任务的候选。团队“性价比高、适合扩大使用”的说法仍是假设。

验证该假设必须经过本章的工作面可用性门和固定任务评测。官方定位不是本项目的首次通过率、稳定性、耗时、成本或性价比证据；一次 Luna demo 也不能推出总体排名。

## 易变事实与官方来源

| 事实 | 官方来源 | 访问日期 | 适用范围 | 负责人 / 下次复核 |
|---|---|---|---|---|
| 官方模型页按工作面列出模型支持，并给出 Sol、Terra、Luna 的产品定位 | https://learn.chatgpt.com/docs/models.md | 2026-08-10 | 官方当前产品矩阵和定位；不是本项目的独立性能或性价比测量 | `facts-maintainer` / 2026-09-10 |
| 当前官方表中 Sol 支持 Cloud，Terra 与 Luna 的 Cloud 栏不可用；实际账户可见性仍需核验 | https://learn.chatgpt.com/docs/models.md | 2026-08-10 | 官方列出的工作面；账户、workspace、组织、区域和 rollout 可能改变实际可用性 | `facts-maintainer` / 2026-09-10 |
| 本地 desktop、CLI、IDE 使用共享配置选择默认模型；Cloud chat 当前不能更改默认模型 | https://learn.chatgpt.com/docs/models.md | 2026-08-10 | 官方模型配置说明；不证明本仓库当前配置或 session 使用某模型 | `facts-maintainer` / 2026-09-10 |

本章同时使用[官方事实缺口审查](../../docs/research/official-facts-gap-review-2026-08-10.md)、[课程含金量审查](../../docs/quality/curriculum-depth-review-2026-08-10.md)和[本轮事实刷新记录](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)。可执行任务集仍可参考[评测夹具](../../evals/task-set-v1.yaml)，但本章的 `three-task-smoke-v1` 不声称已在该夹具中注册或运行。

## 来源与更新提示

模型 ID、工作面矩阵、价格、容量、配置和入口支持范围会变化。更新时先复核官方模型资料，再同步[事实影响注册表](../../docs/governance/fact-impact-registry.yaml)、本章、相关评测夹具和状态源；模型性能、成本和稳定性必须另有运行日志，不能从产品定位推断。

## 本章验收

- [ ] 能先锁定工作面并填写 `surface_available` 与 `availability_evidence`；
- [ ] 能为两个候选填写模型 / 工作流卡，并识别 `not_comparable` 条件；
- [ ] 能按 `three-task-smoke-v1` 完成或正确阻塞六次初始运行；
- [ ] 能交付原始证据、可比性记录和 `值得扩展 / 暂不扩展 / 证据不足` 结论；
- [ ] 能明确说明为什么一次 demo 不能推出总体模型排名或总体性价比；
- [ ] 能说明本章仍是 `candidate`，实验与模型评测仍是 `not_run`。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface.md" aria-label="上一章：第 5 章 · 选择正确的 Codex 工作面">← 上一章<br><strong>第 5 章 · 选择正确的 Codex 工作面</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools.md" aria-label="下一章：第 7 章 · Skill、Plugin、MCP 和工具如何分工">下一章 →<br><strong>第 7 章 · Skill、Plugin、MCP 和工具如何分工</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
