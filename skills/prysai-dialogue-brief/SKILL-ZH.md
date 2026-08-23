<!-- content_id: prysai-dialogue-brief | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# 对话简报

把一个还没尝试、风险较低的请求，整理成一条简短、可以直接复制发送的首轮消息。这个 Skill 只负责在实质回答、工具操作、检索或学习循环开始前，把请求边界说清楚；它不会执行请求，也不会替你判断回答是否正确。

## 先判断是否应该使用

只有同时满足以下条件时才使用：

- 你还没有发送请求，也没有需要修复的失败回答；
- 目标是一次纯文本、低风险的首次对话；
- 不需要文件、工具、账户、浏览、私人记录、发布或任何外部操作；
- 你只是想把一个范围明确的请求表达清楚，而不是练习技能或查找事实。

如果学习者需要基线、反馈、纠正或迁移练习，转给 `prysai-learning-coach`。如果请求涉及 Codex、工具、Skill 或 Agent，转给 `prysai-codex-coach`。如果涉及文件、工具、账户、权限、外部操作或实际交付目标，转给 `prysai-task-protocol`。需要当前事实、来源或有依据的结论时，转给 `prysai-source-investigator` 或 `prysai-research-router`。如果原始请求和不满意的回答已经存在，转给 `prysai-communication-failure-triage`；如果要判断一个已有说法是否有证据支持，转给 `prysai-evidence-review`。

不要索要秘密、敏感个人资料、未公开记录、凭据、账户状态或私人提示词。整理简报不等于获得后续行动的授权。

## 只收集首轮所需信息

尽量使用用户自己的措辞，收集以下字段：

```text
outcome: 首轮回复应产生的一个可观察结果
audience: 谁会使用或阅读结果
supplied_inputs: 这一轮安全可用的文字或事实
constraints: 必须保留的事实、限制、语气、排除项或帮助规则
output_shape: 形式和长度要求
acceptance_check: 用户在接受前要检查什么
stop_boundary: 不得发生什么，或缺少什么事实就必须停止
```

如果缺少的一个字段会实质改变结果，按下面的格式只问一个普通的澄清问题。不要先写半成品、收集无关背景、猜测受众、用看似合理的细节填补未知，也不要为了让简报显得完整而连问多个问题。如果经过一次澄清仍无法说出可观察的结果，就返回 `blocked: outcome_not_observable`，并指出最小的缺失决定。

## 起草首轮简报

返回一段 120–180 字的简报，再给出一条可直接复制的首轮消息。范围只限这一轮。使用直接、日常的语言；不要添加角色扮演、情绪压力、隐藏推理请求、性能承诺或“请尽力而为”之类的空话。

可复制消息必须用自然的句子包含这些标记：

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

如果回答需要而用户没有提供某个事实，就要求接收消息的模型把它标成 `unknown`，不要自行补写。如果需要来源，就要求先给出来源计划，或在缺少来源时停止；不要在没有证据时要求模型给出自信的事实答案。

## 返回简短收据

如果缺少重要字段，必须准确返回：

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

字段齐全后，必须准确返回：

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

只有在保留用户提供的事实、包含一个可观察的验收检查、禁止擅自扩大行动或数据范围，并为超出首轮的工作指定去向时，才接受输出。`ready_to_copy` 只表示简报已经写好；它不证明模型行为、回答质量、学习效果、事实正确性、用户满意度或任务完成。

## 维护记录

- `source`：Prysai Lab 原创方法，重新组织自 communication-clinic、task、evidence 和 routing 契约
- `license`：项目原创改写；外部材料仍仅作为 `docs/sources/asset-register.md` 中的参考
- `owner`：communication-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
