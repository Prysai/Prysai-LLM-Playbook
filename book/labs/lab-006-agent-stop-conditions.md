# 实验 006：设计 Agent 的停止条件

```yaml
id: lab-006-agent-stop-conditions
title: "让 Agent 在正确的位置继续、询问或停止"
level: L5
domain: general
goal: "理解状态、反馈、重试和停止条件"
status: draft
last_verified: 2026-08-09
```

## 任务

为一个低风险任务设计四个分支：成功、输入缺失、可恢复失败、重复失败或权限冲突。为每个分支写：状态、允许动作、应产生的证据、停止点和交付内容。

## 通过标准

学习者不把“自主”定义为一直尝试，而是能说明 Agent 何时继续、何时请求人类、何时停止，并且每个决策都与风险和证据有关。
