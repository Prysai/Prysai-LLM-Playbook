<!-- content_id: prysai-shift-handoff | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 工作交接

为持续的 LLM 协作准备一份当前工作简报，把可复用的标准、变化中的项目、权限和验收证据分开。当昨天的上下文或之前的例子可能被误当成今天的工作时使用。不要用于创建产品背景、设计完整任务协议、恢复中断任务、审计完成断言或执行行动。

## 只负责重复工作这一段

当一个重复的文本工作流已有持久标准，但其中一项发生变化时使用，例如按已批准分类法整理今天的反馈、按固定文风审查本周的简短更新，或把一条新来源记录变成固定输出形状。

遇到以下情况交接：

- 可复用的产品、受众、定位或度量背景本身需要有版本的决策：使用 Product Context；
- 本任务的结果、范围、权限或验收仍不清楚：使用 Task Protocol；
- 之前的任务在证据可见前停止：使用 Interruption Checkpoint；
- 请求、回复和预期结果已存在，需要受控修复：使用 Communication Failure Triage；
- 变化中的项目是需要来源检查的当前事实：使用 Source Investigator；
- 工作包含文件、数据集、工具、账户、网络请求、共享系统或外部行动：先交给 Task Protocol，再准备当前项目简报。

不要把一次重复聊天模式变成关于记忆、上下文窗口行为、成本、持久性、自动化或命名产品配置的断言。

## 要求一张稳定卡和一张当前卡

只收集以下可见输入。字段缺失就标为 `missing`；不要从另一次聊天或早期例子中取回或推断。

**稳定卡**——在一条明确工作流内复用：

1. `work_stream` —— 用普通语言描述的重复工作；
2. `criteria_revision` —— 规则的版本、日期或不可变引用；
3. `allowed_inputs` —— 每个项目都可以使用的材料；
4. `forbidden_assumptions` —— 不得继承的事实、来源、权限或旧输出；以及
5. `response_shape` —— 结果的必需形式。

**当前卡**——只对这一项成立：

1. `item_id` —— 不含敏感信息的本地标签；
2. `item_input` —— 提供的当前文本或最小安全摘要；
3. `item_change` —— 今天有什么新内容或不同之处；
4. `task_request` —— 现在要求的一个结果；
5. `acceptance_evidence` —— 可检查它的可见规则或产物；以及
6. `authority_and_risk` —— `R0` 纯文本准备，或 `handoff_required`。

项目包含秘密、私人记录、未授权来源文字、没有支持的事实断言或未经批准的行动时拒绝简报。不要索要不必要的历史对话。

## 写作前先比较

1. 区分哪些字段属于稳定卡，哪些字段只属于当前项目。
2. 早期例子只能作为标记过的参考；它不是当前项目的事实，也不是验收结果。
3. 当前没有再次提供的事实、权限、来源、期限、目的地或验收检查，标记为 `missing` 或 `not_authorized`。
4. 当前项目改变稳定标准时停止。不要静默修改可复用卡；把它交给负责人，或按情况交给 Product Context/Task Protocol。
5. 只有对 `R0`、用户提供的文本工作，才返回可复制简报。后续行动仍需自己的边界和证据。

## 返回一份交接收据

必须准确返回：

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

只有稳定卡、当前卡、请求、响应形式、验收证据和 `R0` 边界都可见时，才使用 `ready_for_text_only_current_item`。收据是上下文边界，不是证明模型保留规则、理解项目、生成正确答案或完成下一项任务。

## 失败检查

以下情况停止或交接：

- 请求者说“按上次规则做”，却说不出标准修订号或当前验收检查；
- 旧例子静默变成今天的来源或真相；
- 当前项目包含文件、凭据、私人材料、浏览、发布、花费、账户变更或其他外部影响；
- 当前项目改变稳定评分表、权限、目的地或输出契约；或
- 回复已经被当作完成。使用 Evidence Review，而不是把它重新标作交接。

## 维护记录

- `source`：Prysai Lab 原创方法，源自有来源边界的重复项目研究记录、Task Protocol、Product Context 和 Interruption Checkpoint 边界
- `license`：项目原创改写；官方指南和公开报告仍仅作参考
- `owner`：workflow-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-11-14`
- `content_status`：`candidate`
