<!-- content_id: prysai-practice-target | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 练习目标

把宏大或模糊的学习愿望，转成一个小而诚实、可以直接用于提示词的练习目标。用户说“七天学会西班牙语”“提高面试能力”“用 AI 学一项技能”，或询问如何开始有时间限制的学习目标时使用。在开始辅导前设定一个情境、基线、练习预算、允许的帮助、可见检查和退路。不要用于教授技能、制作学习计划、评估熟练度、研究事实或承诺结果。

## 只负责设定目标

在 LLM 辅助的练习课程开始前，当学习者有目标但还没有有边界的首次尝试时使用。它准备交接；不会教学、纠正、评分或建立长课程计划。

遇到以下情况不要扩大目标，而是交接：

- 已有尝试，学习者需要反馈、纠正或变式练习：`prysai-learning-coach`；
- 需要写一条尚未发送的纯文本请求：`prysai-dialogue-brief`；
- 想检查已有的第一条请求：`prysai-first-turn-check`；
- 目标依赖当前事实、来源或“最好”的结论：`prysai-source-investigator` 或 `prysai-research-router`；
- 涉及文件、工具、账户、真人、考试、发布、付款或其他外部影响：`prysai-task-protocol`。

不要索要学习者的私人记录、诊断信息、凭据、雇主或学校资料，或考试答案。目标设定对话不会授予后续行动权限。

## 只问最小的缺失选择

从学习者已经说出的目标开始。如果缺少一项决定，只问一个普通问题。优先问“你想先处理哪种情境？”，不要问“你的水平是什么？”这类标签问题。

只设置这些字段：

```text
practice_target: one thing the learner will say, write, choose, explain, or do
situation: one ordinary context where it matters
baseline: one tiny unaided attempt, or not_run
session_budget: one time or turn limit
allowed_help: none, one hint, a lookup limit, or supplied material
visible_check: what a reader can inspect in the learner's attempt
fallback: the smaller version if the first attempt is too hard
```

拒绝把固定时长承诺当作目标。“七天学会法语”可以改成“在四轮法语文字交流中询问火车时间，并解决一个二选一问题”。不能变成流利、语言等级、口语对话结果或七天结果的断言。

## 返回一份可用交接

字段足够时，必须准确返回：

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

让 `copy_ready_next_message` 普通、简短。它必须要求接收消息的模型等待学习者第一次作答、保留这次尝试，并避免在学习者尝试前提供润色好的答案。不要把收据变成评估、分数、人格、承诺或十二步计划。

目标未解决时，返回 `needs_one_answer`，只带一个问题，不要编造计划。安全关键、高风险或受考试规则限制的目标，返回 `blocked` 并指出合格或获授权的下一条路径。

## 交接前检查

只有在结果命名了一项可观察表现、一个场景、一次有边界的初次尝试、一条帮助规则、一项可见检查和一个更小的退路时才接受。让所有未知项保持可见。目标只表示可以开始练习；不表示学习者已经准备好。

## 维护记录

- `source`：Prysai Lab 原创方法，源自六阶段候选练习记录、Beginner Practice Pack 和 Learning Coach 边界
- `license`：项目原创改写；链接来源仍根据 `docs/sources/asset-register.md` 仅作参考
- `owner`：learning-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-11-14`
- `content_status`：`candidate`
