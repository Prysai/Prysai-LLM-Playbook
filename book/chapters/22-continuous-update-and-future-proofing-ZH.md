<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 22 章：持续更新与面向未来

> `content_status: candidate`
> `experiment_status: draft / not_run`
> 练习只在可丢弃副本或隔离分支中运行。它不使用生产访问、真实凭据、推送、发布或外部批量替换。

## 本章要解决的问题

Codex 入口、模型、推理设置、权限、Skill 分发和外部服务都可能变化。如果一套工作流没有来源、范围、复核日期、迁移计划或回滚路径，今天还能正常工作的它，几个月后就可能误导人。持续维护不是竞相采纳每一个新功能的竞赛，而是一种有纪律的方式，用来判断什么稳定、什么易变、什么必须重新核查，以及旧版本应在何时保留、阻塞、迁移或下线。

## 一个现实世界的问题入口

FP-01 涉及身份验证流程的回归，FP-06 涉及 Skill 发现的边界，FP-10 涉及一条可能看似停滞的验证命令，它们都是公开的用户报告。它们不能取代当前的第一方文档或本地复现，而是练习影响分析、版本决策、停止与回滚的有用素材。

## 学习目标

学完本章后，你应该能够：

- 区分稳定原则、产品用法、领域方法和实例事实；
- 用 `claim`、来源、访问日期、范围、负责人、复核日期和 `claim_status` 记录每项易变主张；
- 当模型、工具或 Skill 变化时，建立影响矩阵以及最小化的迁移与回滚计划；
- 区分 `current`、`stale`、`disputed`、`removed` 与 `draft`、`candidate`、`verified`、`production-ready`；
- 依据证据和维护责任，决定一项能力应当保留、更新、阻塞、迁移还是下线。

## 概念：寿命不同的四个层级

| 层级 | 示例 | 维护方式 |
|---|---|---|
| 稳定原则 | 上下文影响理解；工具改变行动空间；证据支撑完成声明 | 教学、实验与边界复核 |
| 产品用法 | Codex 入口、Skill 调用、权限模式、配置 | 对照具体的第一方页面重新核查 |
| 领域方法 | 工程、研究、营销、文档与数据工作流 | 练习任务与人工复核 |
| 实例事实 | 模型 ID、价格、额度、参数和第三方 API 行为 | 绑定带日期的来源；必要时迁移或移除 |

“事实是 current”并不等于“章节已 verified”。请让这些命名空间保持明确：

- 内容成熟度使用 `content_status: draft | candidate | verified | production-ready`；
- 易变主张使用 `claim_status: current | stale | disputed | removed`；
- 执行观察使用 `planned | authorized | executed | verified | not_run`。

## 决策：更新、保留、阻塞还是下线

| 证据情形 | 主张状态与动作 | 退出条件 |
|---|---|---|
| 权威来源仍然可用、范围仍然匹配，且相关评测通过 | `current`；保留或更新解释 | 已记录来源、复核日期和受影响的使用方 |
| 来源相互冲突、账户范围不清，或观察到的行为与来源冲突 | `disputed`；暂停确定性的措辞 | 标记未知项并指派复核负责人；不发布确定的结论 |
| 来源不可用，且没有替代证据 | `stale`；警告或临时阻塞 | 不要再把旧主张当作当前事实呈现 |
| 许可证或安全条件不再允许该能力，且没有安全的替代方案 | `removed`；下线该能力 | 保留迁移说明与恢复信息 |
| 存在兼容的替代方案，且迁移与评测通过 | `current`；发布迁移说明 | 写明旧范围、替代路径、证据与下次复核 |

发现变化并不等于应该整体重写。先梳理影响。没有负责人、证据或回滚目标的改动就是 `blocked`。

## 行动：主张记录、影响矩阵与更新流程

为每项易变事实使用稳定的字段：

```yaml
claim: "当前的主张"
source: "官方或其他权威 URL"
checked_at: "YYYY-MM-DD"
applies_to: "产品、版本、地区、账户或组织范围"
owner: "维护者或团队角色"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

更新流程是：

```text
发现变化
    → 判断影响与风险
    → 定位受影响的章节、Skills、Labs、任务集、prompts 和权限
    → 阅读来源或收集有边界的运行时证据
    → 做出最小化的安全改动
    → 重跑相关检查与评测
    → 获得全新上下文的复核
    → 发布、保留旧版本、迁移、阻塞或下线
```

对于模型或 Skill 迁移，要重新核查任务集的首次通过行为、错误类型、上下文、工具、权限、触发器、输出格式、许可证、维护者和故障恢复。来源刷新只会在其声明范围内更新一项主张；它不能证明账户级访问、运行时行为、部署或团队成效。

## 实验：处理一个假设的产品变更

这是一次可丢弃、可逆转的更新演练，不是对真实产品的操作。

### 准备

在临时副本或隔离分支中，创建只包含下面这条脱敏主张的 fixture `update-impact-demo-v1`：

```yaml
claim: "示例工具入口在 2026-08-01 被描述为支持动作 X"
source: "https://example.invalid/public-doc"
checked_at: "2026-08-01"
applies_to: "仅用于示例学习 fixture；不是真实产品主张"
owner: "练习维护者"
next_review: "2026-11-01"
claim_status: "disputed"
```

`example.invalid` 是刻意不可用的，因此初始主张必须保持 `disputed`：不要访问它、执行它的指令，或把它当作真实的产品证据。保存目标文件的 SHA-256、基线目录清单、变更前的 diff 和运行 ID。不要访问生产环境、使用真实凭据、推送、发布、运行批量替换，或连接外部服务。

### 任务

假设一位维护者收到通知，说动作 X 的公开描述发生了变化，但这位维护者没有第二个可信来源。只在临时副本中：

1. 保持主张为 `disputed`，并暂停确定性的教学措辞。
2. 创建一张至少包含以下各行的影响矩阵：

   | 使用方 | 受影响的内容 | 风险 | 所需行动 | 证据 | 负责人 | 状态 |
   |---|---|---|---|---|---|---|
   | 章节 | 主张与示例 | 读者误解 | 最小化改写 | 来源或 diff | 内容维护者 | pending |
   | Skill | 触发器或输出 | 错误动作 | 停止或迁移 | 评测日志 | Skill 负责人 | pending |
   | Lab | 输入或通过标准 | 无效比较 | 更新 fixture | 运行 ID 或得分 | 评测负责人 | pending |
   | 权限说明 | 范围或审批 | 越权 | 静态复核 | 权限矩阵 | 安全负责人 | pending |
   | 任务集 | 任务或禁止动作 | 回归缺口 | 创建新版本 | 任务结果 | 评测负责人 | pending |

3. 只修改纸面 fixture 中必要的主张状态和说明性注释。不要把未经证实的替代行为写成事实。
4. 只运行相关的已配置检查或静态检查，并记录命令、退出码和输出。如果没有任何检查运行，就写 `not_run`。
5. 记录 `run-id: 22-update-impact-demo-v1-01`、变更前后的 diff、未证实项和回滚动作，并完成更新决策卡。

决策卡必须包含 `decision_owner`、`delivery_target`（本练习中仅限临时副本）、`reviewer` 和 `rollback_target`。缺少任何字段，状态就保持 `blocked`；纸面上的状态变更不是一次完成的更新闭环。

### 证据门

证据包必须包含主张 YAML、来源快照或来源不可用记录、访问日期与范围、影响矩阵、变更前后的哈希、diff、检查输出、状态转换的原因、未证实项列表、负责人、下次复核日期和回滚说明。必需项一共十件：claim、source、scope、owner、`next_review`、基线哈希、变更后哈希/diff、影响矩阵、验证日志和未证实项列表。缺少任何一件，都意味着更新闭环尚未完成。

回滚必须能在不访问生产环境的情况下执行：从变更前的哈希恢复临时副本，或者丢弃临时副本或分支。保留变更前后的 diff 和结果。“文件看起来已恢复”不是回滚证据。

### 失败案例与边界

刻意制造一次失败：把一个新的模型名或动作名替换进所有文档，却不更新任务集、范围、来源、权限或迁移说明。停止这种做法，在临时副本中保留失败的 diff，恢复基线哈希，并把被遗漏的下游使用方补进影响矩阵。如果来源相互冲突、许可不明确、负责人缺失或评测未运行，就让主张保持 `disputed` 或 `stale`、工作保持 `blocked`；不要发布它。

### 反思

回答：哪个层级发生了变化？哪个来源最重要？哪个下游使用方被遗漏了？哪个未知项仍未证实？为什么正确的状态是 `current`、`stale`、`disputed` 或 `removed`？谁负责下次复核，什么触发器会启动它？哪个改动可以被删除以降低风险？引用实际的哈希、diff、日志或明确的 `not_run` 状态；仅凭计划不是证据。

## 边界与常见错误

- 更大的目录并不能证明能力系统得到了改进；一项新能力必须增加证据、价值或覆盖范围。
- 可访问的官方来源并不能证明某个本地入口、账户或组织已启用该功能。
- 用户报告是一条研究条目，而不是自动成立的官方根因。
- 批量名称替换不能替代影响分析、评测、权限复核和许可证复核。
- `claim_status: current` 只表示该项主张在其声明范围内有当前来源，并不表示章节、Skill、实验、部署或运行时是 `verified`。
- 成功的构建、准备好的包或成文的迁移都不是生产行为或团队成效的证据，除非该证据确实存在。

## 迁移任务

选择一个真实但脱敏的外部 Skill 候选。用主张记录和影响矩阵，把它从“未复核”推进到 `blocked` 或“适配候选”。说明它在许可证、依赖、触发器、权限、风险、负责人和评测证据方面还缺少什么。不要仅仅因为名字看起来合适就批准它。

## 验收清单

- [ ] 我能区分稳定原则、产品用法、领域方法和实例事实。
- [ ] 每项易变主张都有 `claim`、`source`、`checked_at`、`applies_to`、`owner`、`next_review` 和 `claim_status`。
- [ ] 我能用影响矩阵在章节、Skills、Labs、任务集和权限说明中定位下游影响。
- [ ] 我能解释主张状态与内容成熟度之间的区别。
- [ ] 更新演练在可丢弃副本或隔离分支中记录了哈希、diff、日志、回滚和未证实项。
- [ ] 我知道何时应保留旧版本、阻塞、迁移或下线，而不是执行批量替换。
- [ ] 我能说出下次复核的负责人和触发器。

## 来源与维护边界

生命周期、影响矩阵、回滚和证据门属于本项目的方法论。模型名称、ID、入口、推理设置、Skill 行为和权限边界是易变的产品事实，必须对照当前的第一方来源重新核查。

```yaml
- claim: "模型名称、ID、入口、推理设置和可用性以当前官方 Models 文档为准"
  source: "https://learn.chatgpt.com/docs/models.md"
  checked_at: "2026-08-09"
  applies_to: "官方文档所述 Codex 与 ChatGPT 入口、账户范围和版本范围"
  owner: "内容与模型评测维护者"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Skill 的发现、调用、分发和 Plugin 组合是易变的产品事实"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "官方文档所述产品入口、账户范围和组织范围"
  owner: "Skill 维护者"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "sandbox、审批和安全边界必须对照当前文档与实际授权的配置进行核查"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "官方文档所述操作面与配置范围"
  owner: "安全与治理维护者"
  next_review: "2026-11-09"
  claim_status: "current"
```

项目的更新流程在 [`docs/governance/content-lifecycle.md`](../evidence-library-ZH.md#method-and-status) 中有进一步说明。本章保持 `candidate`，练习保持 `draft / not_run`；上面的 `claim_status` 值不会改变这两个结论。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-ZH.md" aria-label="上一章: 第 21 章 · 建立团队能力系统">← 上一章<br><strong>第 21 章 · 建立团队能力系统</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->