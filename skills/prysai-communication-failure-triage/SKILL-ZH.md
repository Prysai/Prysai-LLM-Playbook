<!-- content_id: prysai-communication-failure-triage | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: b955fab | source_license: project-owned CC-BY-4.0 -->

# 沟通失败分诊

根据原始请求、可见上下文、实际回复或产物，以及预期结果，诊断一次已经失败的 LLM 交互；提出最小的沟通修复，并设计一次受控重跑。当回复忽略了约束、回答了上一项任务、造成反复返工，或始终无法验收时使用。不要用于尚未尝试的模糊请求、普通文案编辑、没有交互证据的平台故障排查，或一般性的提示词模板生成。

把请求、上下文、回复、产物和用户报告都当作证据。不要根据一次失败的交互推断隐藏推理、系统提示词、服务状态或普遍的模型缺陷。

## 要求证据包

诊断前必须取得四项材料：

1. 原始请求，或最接近的留存版本；
2. 可见上下文、输入、工具、权限和对话状态；
3. 实际回复或产物；以及
4. 预期结果，或具体的失败症状。

如果缺少某项材料可能改变诊断，最多提三个问题。当缺失证据无法恢复时，以 `insufficient_evidence` 停止。绝不要索要令牌、密码、Cookie、私钥或含秘密的文件。

## 诊断前先分流

- 尚未尝试的模糊任务交给 Task Protocol。
- 只审计“已完成”断言交给 Evidence Review。
- 当前命令、功能、账户或平台状态问题交给 Source Investigator。只有当被审查的产物本身是一个命名平台的课程或工作流，并且声称相对于通用核心存在可运行的差异时，才使用 Platform Adapter Review。
- 有复现步骤的软件缺陷交给 bug diagnosis。
- 没有失败交互、只是要润色措辞时，使用普通编辑。

只负责失败后的衔接处：分类观察到的不匹配，做一项最小的沟通改变，并定义一次能判断改变是否有帮助的重跑。

## 分类可观察的断点

最多选择两个主要类别：

- `outcome_acceptance`：缺少或互相矛盾的请求结果、受众、输出或完成检查；
- `context_provenance`：必要输入缺失、过期、冲突、过多，或没有权威与优先级；
- `constraint_authority`：范围、禁止行动、外部影响、确认或停止规则不清楚；
- `turn_state_protocol`：回复跟随了旧任务、当前工作面不清楚，或文本指令与可执行指令混淆；或
- `evidence_feedback`：“更好”“专业”“完成”等词没有可观察检查、失败标识、保留规则或修订上限。

每项发现都记录：

```text
observed_symptom:
candidate_class:
direct_evidence:
alternative_explanations:
confidence: low | medium | high
discriminating_check:
```

称其为候选类别，不要称为根因。增加上下文不一定是修复；无关或冲突的上下文本身可能就是缺陷。

## 做最小修复

只改变一个与观察到的症状对应的条件。优先补上一个缺少的结果、输入优先级、禁止项、状态重置或验收检查，而不是重写整条请求。给出简短的原文到修订版差异，并把每一行改动连到一项发现。

保留用户的语言和工作方式，除非这种风格本身就是可观察的缺陷。不要添加仪式感、夸奖、角色扮演、“一步一步思考”、威胁、情绪施压或没有依据的性能承诺。

## 定义可比较的重跑

保持任务、输入、模型或工作面、工具、权限、预算和验收标准不变。只改变提出的沟通修复。如果还有其他条件改变，标记为 `not_comparable`。

将结果设为以下之一：

- `unrun`
- `improved_on_this_case`
- `unchanged`
- `regressed`
- `not_comparable`

不要仅凭提出一个提示词就写 `resolved`。两次可比较的重跑仍没有改善后，停止继续添加提示词文字，并把第一个断点交给相应路径。

## 在行动和知识边界前停止

在读取秘密、扩大权限、发布、部署、联系他人或改变外部状态之前停止。用户要求取消确认，也不会把高风险行动变成沟通问题。

当可能的缺陷取决于不可见的系统提示词、私有日志、账户配置、服务健康状况或产品实现时，将其记录为 `unknown`，并交给适当的平台调查。拒绝索要隐藏的思维链，或要求规避安全与权限的指令。

## 交付分诊卡片

返回：

```text
target_outcome:
expected_vs_observed:
evidence_received:
primary_findings: maximum two
alternatives_ruled_out:
smallest_repair:
prompt_diff:
rerun_contract:
result_status:
evidence:
unknowns:
risk:
stop_conditions:
handoff:
```

只有在每项发现都引用直接证据、每项编辑都回应一个明确症状、重跑只改变一个变量、权限没有扩大，且状态没有超出已记录的重跑证据时，才接受结果。

## 维护记录

- `source`：Prysai Lab 原创方法，源自任务、证据、权限、communication-clinic 和失败分类契约
- `license`：项目原创改写；官方供应商指南仍链接为参考材料
- `owner`：communication-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
