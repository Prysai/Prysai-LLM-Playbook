<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# AI 安全现场信号：保住权限、证据与进度

**访问日期：**2026-08-13（America/Los_Angeles）  
**状态：**候选研究记录。它整理少量有日期的公开报告和项目教学推论；没有在本地复现任何报告，也没有测试模型、Agent、学习者、账号、仓库或安全控制。  
**负责人：**security-research-maintainer  
**下次复核：**2026-09-13；如果链接的 Issue 或产品界面有重大变化，也应提前复核。

## 研究问题

当长时间、带工具或研究性质的对话变得混乱时，哪些可观察的习惯能让读者保留原始任务的授权、每条重要主张的证据，以及尚未完成的工作？

这不是漏洞研究，也不比较产品、估算事故频率、诊断任何产品，或证明清单能阻止不安全行为。狭窄的教学目标是形成可复核的交接：读者能说明获准的任务是什么、每条重要主张由什么来源支持、实际检查了什么，以及为何停止。

## 证据类别与使用边界

| 类别 | 可用于 | 不能证明 |
| --- | --- | --- |
| `official fact` | 发布者记录的风险或安全边界 | 读者账号中的行为、配置安全性或报告根因 |
| `public user report` | 一位作者可定位的症状描述 | 普遍性、根因、当前复现、厂商确认或修复 |
| `project inference` | 从有限记录推导的保守教学动作 | 该动作足够安全或改善了结果 |
| `not_run` | 明确没有执行的产品、学习者或攻击场景 | 任何运行时、安全或学习结果 |

下文都是项目自己的摘要。项目没有复制 Issue 正文、帖子、提示、代码、附件、截图、日志或 workaround；链接只作为参考资料，不是让读者执行的指令。

## 四个现场信号与有界回应

### S1——动态指令层可能制造含义不清的任务状态

一位 OpenAI Community 作者报告，在 Assistant API 运行中加入很短的 `instructions` 后出现行为不一致 [R1]。这只是针对某个有日期的 API 界面的单条报告，不能当作当前产品结论，也不能假定所有指令层都会冲突。

**教学动作：**行动前给每项输入贴标签：

```text
approved task: 当前结果与行动范围
project rule: 任务负责人已采用的仓库或团队约束
external data: 要检查的页面、文件、引用、Issue 或工具结果
unknown: 可能改变任务但尚未获授权的材料
```

如果当前获准任务与新的指令式文字不能明确一致，在 `authority_unclear` 处停止；不要因为某条文字要求更宽的行动就选择它。对应位置：第 3 章的上下文/输入区分、第 12 章的状态与停止条件，以及现有四行安全卡。

### S2——引用标记不等于保留下来、可复核的来源记录

一位 OpenAI Community 作者报告，在研究流程后无法把引用标记与持久的来源清单对应起来 [R2]。这不证明引用普遍不可用或不准确。

**教学动作：**把标记、URL、搜索结果或模型生成的参考资料当作发现线索。只有记录发布者、URL、访问日期、精确位置、适用范围和实际支持的主张后，重要主张才进入台账。打不开或无法匹配位置时，把主张降为 `unverified` 或删除。对应第 15 章证据表和初学者练习包的 Card C2。

### S3——限定与矛盾是两种不同的研究发现

一条公开 Claude Code Issue 描述某个研究验证流程把对主张的限定误判成矛盾 [R3]。这只是该流程的报告，不是对 Claude Code 的评测，也不说明所有验证器都会犯同样的错误。

| 发现 | 含义 | 安全的综合动作 |
| --- | --- | --- |
| `supports` | 已检查的段落在指定范围内支持主张 | 保留主张并引用位置 |
| `qualifies` | 上下文改变了已支持主张的解释方式 | 只有连同范围和限定一起写，才能保留 |
| `contradicts` | 来源反驳具体事实或声称的范围 | 缩小、修改或标记为有争议 |

不要把 `qualifies` 压成 `contradicts`，也不要因为有 URL 就称主张已获支持。对应 Lab 003、Lab 008 和第 15 章冲突日志。

### S4——看似完整的报告可能偏离可观察记录

一条公开 Claude Code Issue 描述长会话中出现声称已编辑、已验证以及用户提出过某项要求，但报告者后来无法在记录状态中确认 [R4]。另一条 Codex Issue 报告长对话后续的维护请求越过了先前写明的安全边界 [R5]。两者都只是单条提交的报告，不是对产品的普遍安全结论。

**教学动作：**任务改变、长时间暂停、上下文重置或改动新产物时，触发一次边界复核。保留最后获准的目标和行动范围，把下一步动作与它们比较；如果目的地、授权或后果用途变化，再次询问负责人。最终消息不能替代它所声称的文件、命令、来源或其他收据。对应第 9 章恢复、第 13 章行动边界和 Communication Failure Triage Skill 的观察不匹配路径。

## 能撑过长任务的研究检查点

不要让重要研究只存在于聊天窗口。每个重要决策后，在项目拥有的 Markdown 记录或其他获准的本地位置保存一张小型**研究检查点**：

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

这张收据不是安全日志、审计证书、思维链记录或研究完成证明。不要放入秘密、私人路径、客户材料、原始凭证或不必要的聊天历史。如果来源、目标、行动或授权无法安全命名，应停止并找负责人，而不是绕过缺口写下去。

### 五分钟合成练习

只使用下面的虚构情境；不要浏览、运行工具、发布或联系任何人：

```text
决策：一份虚构指南能否声称其方法已被证明有效？
获准范围：只检查两份指定研究记录，不做外部行动。
记录 A：五人试点方案已经写好，但没有参与者完成会话。
记录 B：一课文件的本地静态检查器通过。
```

写一张检查点。合乎边界的结果应说明：两份记录只 `supports`“已准备测量、已完成静态验证”这类较窄的主张；它们都不支持“已证明有效”。记录 `next smallest check: run an authorized, consented fixed-revision pilot`，并明确没有外部行动。

**验收清单：**

- [ ] 写明决策、范围和两个指定输入。
- [ ] 没有混淆 `supports`、`qualifies`、`contradicts` 与 `unknown`。
- [ ] 检查点指出至少一条证据不支持的主张。
- [ ] 没有加入秘密、私人材料、新授权或外部行动。
- [ ] 下一项检查比原问题更小，或收据写明负责人并停止。

完成这张虚构收据只证明分类被记录；不能证明研究能力、引用准确性、抵抗提示注入、持续安全行为或真实研究系统的有效性。

## 与现有安全课程的连接

这份记录不新增 Skill、平台适配器或第二套安全框架，只补充一条连续性规则：

| 现有单元 | 现场信号的新用法 | 边界 |
| --- | --- | --- |
| 四行安全卡 | 任务发生重大变化后，重新检查 `inputs`、`allowed action`、`evidence` 和 `stop` | 复核不能证明不可信内容无法影响系统 |
| Card C2——研究台账 | 用 `supports`、`qualifies`、`contradicts`、`unknown` 替代单一 pass/fail 标签 | 分类后仍需打开并匹配具体位置 |
| 第 9 章恢复 | 将声称的完成与可观察产物、检查或来源记录比较 | 一次比较不能诊断隐藏推理或平台故障 |
| 第 13 章行动边界 | 把产物目的地和已知后果用途视为授权边界的一部分 | 写下边界不会授权、监控或阻止系统行动 |

## 来源台账

| ID | 来源（检查时状态） | 访问日期 | 类别 | 本次使用范围 | 边界 |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI：构建 Agent 的安全性](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | 不可信输入、敏感数据、审批与评测是 Agent 工作流的相关边界 | 产品特定且会变化，不代表每个 Codex 账号或控制 |
| O2 | [NIST AI 600-1：生成式 AI 画像](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | 幻觉、来源、隐私、人类监督和生命周期治理的风险框架 | 不是产品手册、合规评估或课程效果证明 |
| O3 | [OWASP LLM01:2025 提示注入](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | 直接/间接提示注入与最小权限缓解语境 | 不是本项目事故证据，也不保证缓解措施能阻止注入 |
| R1 | [OpenAI Community：Assistant API instructions 参数](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | 一位作者报告加入动态指令后行为不一致 | 单条有日期的报告，不是普遍冲突、根因或当前产品结论 |
| R2 | [OpenAI Community：引用标记无法持久对应](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | 一位作者难以把返回标记对应到持久来源记录 | 不证明引用不可用、不准确或产品普遍失败 |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13；检查时 open | public user report | 一位作者报告研究验证器混淆限定与矛盾 | 不代表 Claude Code、根因或已验证缓解措施 |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13；检查时 open | public user report | 一位作者无法从记录状态确认声称的行动和验证 | 不代表隐藏状态、普遍行为或完整事故调查 |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13；检查时 open | public user report | 一位作者报告长对话中的安全边界漂移 | 单条提交，不是复现、普遍性指标或官方安全发现 |

## 明确限制

这份记录不证明：

- ChatGPT、Codex、Claude Code 或其他 Agent 会在读者环境中按报告所述运行；
- 研究检查点能阻止幻觉、提示注入、不安全工具使用、数据暴露或安全边界漂移；
- 来源被打开或分类后就一定正确；
- 五分钟合成练习能测量学习者的长期行为；
- 项目、Skills 或阅读站已经安全、合规、发布或达到生产就绪。

下一项有效证据应是经过授权和同意、固定条件、无外部副作用的合成夹具运行，保存收据，并由独立人员对声明的可观察选择评分。
