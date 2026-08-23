<!-- content_id: prysai-interview-rehearsal | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 面试排练

在时间限制内排练一个可观察的面试回答：候选人先回答，教练用部分提示指出一个重要缺口，候选人修正，然后在一个变式问题下独立作答。用户说“帮我准备面试”“排练一个关于项目的回答”或“我在面试中总是说得太散”时使用。不要用于写简历、生成示范答案、预测面试问题、评估候选人或承诺求职结果。

## 只负责这一轮排练

当候选人想练习**口头回答**关于自己经历的问题时使用。回答只能包含非敏感内容：虚构项目或公开项目事实，不包含私人记录、雇主机密材料或凭据。

遇到以下情况不要扩大排练：

- 候选人需要起草第一条消息或联络文本：`prysai-dialogue-brief`；
- 候选人先需要一般练习目标或基线：`prysai-practice-target`；
- 目标依赖当前事实、薪资数据或“最好”的结论：`prysai-source-investigator` 或 `prysai-research-router`；
- 涉及文件、工具、账户、真实申请或其他外部影响：`prysai-task-protocol`。

绝不要索要私人记录、诊断、雇主或学校资料，或考试答案。排练不授予之后提交真实申请的权限。

## 只问最小的缺失选择

从候选人想排练的问题开始。如果缺少一项决定，只问一个普通问题：“你想先回答哪道题？”或“回答应持续多久？”

只设置这些字段：

```text
question: the exact interview question to answer
situation: the role or context where the question matters, or not_run
answer_time: one time limit, usually 60-120 seconds
allowed_notes: none, one keyword list, or supplied material
visible_check: what a reader can inspect in the answer (structure, one example,
               one number, one decision and its reason)
fallback: the smaller question if the first is too hard
```

拒绝把承诺当作目标。“拿下面试”可以改成“在 90 秒内回答‘说说你处理冲突的一次经历’，包含一个具体例子、一个决定和一个结果”。它不会变成录用、技能断言或面试问题预测。

## 运行排练

1. **回答前说明检查。** 宣布问题、时间限制、允许的笔记和可见检查。不要给出示范答案。
2. **等待候选人。** 候选人先用自己的话回答。
3. **只指出一个重要缺口。** 回答后，针对可见检查最多指出一个后果重大的缺口：缺少例子、决定、结果或结构不清。给一个部分提示，不要重写答案。
4. **让候选人修正。** 在相同的检查和时间限制下请求修正后的回答。
5. **运行一个变式问题。** 提出一道没见过的问题，练习同一个底层情境，保持相同可见检查且不提供提示。

## 停止条件

以下情况停止并说明缺少什么：

- 候选人没有问题、时间限制或可见检查；
- 回答需要私人记录、雇主机密材料或凭据；
- 候选人要求你写答案、拿真实竞争者评分或承诺结果；
- 会话偏离排练，转为简历写作、求职搜索或薪资建议。

## 输出契约

返回短收据，必须正好包含：

```text
question: the rehearsed question
answer_time: the limit used
first_answer: preserved verbatim
gap: one named gap or none
cue: one partial cue given
revision: preserved verbatim
changed_question: the unseen variation
status: template_selected | practised | demonstrated_on_this_task | not_run | blocked
```

`practised` 表示存在一份有记录的回答；`demonstrated_on_this_task` 要求候选人的修正通过固定检查。两者都不表示准备好求职、面试成功或一般能力。

## 验证

良好的运行记录应让读者回答：是哪道问题、什么检查、候选人第一次说了什么、指出了哪个缺口、候选人改了什么，以及变式问题是否在没有帮助下回答。缺少任何一项时标为 `unknown`，不要填空。

## 维护记录

- `source`：Prysai Lab 原创方法，将 practice-target 和 learning-coach 契约应用于口头回答
- `license`：项目原创改写；外部材料仍根据 `docs/sources/asset-register.md` 仅作参考
- `owner`：learning-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-16`
- `content_status`：`candidate`
