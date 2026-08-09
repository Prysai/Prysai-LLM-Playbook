# Atlas 实验室

实验室用来证明学习者是否真的掌握了方法。每个实验应尽量低风险、可回滚、可观察，并包含一个故意失败或边界条件。

## 实验记录模板

```yaml
id: lab-000
title: "实验名称"
level: L0
domain: general
goal: "要学会什么"
setup: "需要的项目、文件、权限和工具"
task: "学习者要给 Codex 的任务"
evidence:
  - "需要提交的结果或日志"
failure_variant: "故意引入的错误或缺失输入"
reflection: "学习者必须回答的问题"
status: draft
last_verified: null
```

## 首批实验方向

1. 解释 GPT 与 Codex 的差别；
2. 在沙盒项目中让 Codex 先检查再修改；
3. 把一段模糊需求改写成任务协议；
4. 使用项目上下文和 AGENTS.md 解决同一任务；
5. 选择一个 skill，说明触发理由并比较启用前后结果；
6. 给 Agent 一个缺失输入，观察它是否停下来澄清；
7. 发现一个“看起来完成但没有证据”的结果；
8. 为团队写一个最小可复用 skill 并通过评测。
