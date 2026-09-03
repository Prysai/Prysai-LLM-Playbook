<!-- content_id: lab-015-evidence-delivery | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

---
id: lab-015-evidence-delivery
title: "交付证据，而不只是一句完成声明"
level: L5
domain: general
goal: "将完成声明拆分为有范围的证据记录，并找出最小的下一项检查"
setup: "一次可丢弃的文本改动、一个聚焦检查、一个故意缺失的检查，以及一份已脱敏的交接；不使用真实服务或用户数据"
task: "为每项来源、检查和运行时声明记录范围、命令或观察、结果、保存输出、状态和下一项检查"
evidence:
  - "主张—证据表、原始命令输出、差异和审查决策"
  - "明确区分 verified、partial、unverified、blocked 和 not_run"
failure_variant: "交接中保留命令名却移除输出文件；将该主张标为 unverified 或 not_run"
reflection: "哪项主张超出了它的证据范围？哪一项更小的检查能补上缺口？"
status: draft
last_verified: "not run"
transfer_task: "将这张表用于静态站点，区分源文件存在、构建产物、浏览器渲染、截图审查和公网可访问性"
transfer_domain: "网页发布、文档、研究或工程交付"
transfer_evidence: "每项主张保留一行：范围、命令或观察、结果、输出路径和限制"
transfer_limitations: "通过源代码检查并不能证明视觉运行时、用户接受度或公开 URL 可访问性"
---

# 实验 015：交付证据，而不只是一句完成声明

**状态：** `draft` · **运行状态：** `not_run`

## 为什么要做这个实验

命令可以运行，但输出可能被隐藏、截断、附在错误的工作目录中，或根本不足以支持正在作出的声明。本实验把一句漂亮的“已完成”转换成主张—证据记录。

## 准备

创建一次可丢弃的文本改动，准备一个聚焦检查和一个故意缺失的检查。准备一份已脱敏的交接，其中有三项主张：来源主张、检查主张，以及运行时或用户效果主张。不要使用真实服务或用户数据。

## 任务

对每项主张记录：

```text
claim:
scope:
command or observation:
working directory:
exit code / result:
saved output:
status: verified | partial | unverified | blocked | not_run
smallest next check:
```

然后请第二位审阅者，或一个全新会话，拒绝任何没有证据、超出范围，或仅从另一行推断得出的主张。

## 证据

保存主张表、原始命令输出、差异和审查决策。记录必须解释：为什么通过源检查不能证明视觉运行时或用户接受度。

## 失败变体

在交接中保留命令名，但移除输出文件。正确结果是 `unverified` 或 `not_run`，而不是“应该通过了”。

## 现场变体：三个 Windows 证据断点

将第 9 章中的三个公开报告作为参考案例；不要在本实验中尝试复现上游产品问题。改用无害的本地夹具模拟证据边界：

1. 生成超出终端视口可显示范围的文本，将同一内容保存到文件，并比较可持久保存与仅可见内容；
2. 在文本夹具中放入 BMP 与非 BMP 字符；任何工具调用前先比较预期字符串与实际接收字符串，若不同则标记为 `blocked`；
3. 仅在文件系统支持时，于可丢弃 Git 仓库中创建一个普通但很长的测试文件名。记录路径长度与 Git 结果；不得创建或删除 Codex 内部引用，也不得改变仓库配置。

为每个案例在主张表中增加一行：

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

正确结论可以是 `reference-only`、`not_run` 或 `blocked`。模拟某个边界的本地夹具不是对上游问题的复现；从公开报告复制的绕过办法也不是官方修复。

## 迁移

将同一张表用于静态网站：区分源文件存在、构建产物、浏览器渲染、截图审查和公网 URL 可访问。

## 验收清单

- [ ] 每句完成声明都被拆成带范围的主张。
- [ ] 命令包含路径、退出码和保存输出。
- [ ] 缺失证据被明确标出。
- [ ] 后来的成功检查没有改写此前未知的尝试。
- [ ] 交接写明最小下一项检查和停止条件。

## 复盘

指出哪项主张超出了证据，并写下能补上缺口的最小检查。

## 来源

- [现场问题与提示模式 — P2](../evidence-library-ZH.md#source-notes)，FP2-05、FP2-06 和 FP2-20。
- [第 9 章：验证、疑问与恢复](../chapters/09-verification-and-recovery-ZH.md)。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-ZH.md" aria-label="上一个实验：实验 014 · 继续之前，先核对恢复的任务">← 上一个<br><strong>实验 014 · 继续之前，先核对恢复的任务</strong></a></td>
    <td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-ZH.md" aria-label="下一个实验：实验 016 · 在副作用边界停下">下一个 →<br><strong>实验 016 · 在副作用边界停下</strong></a></td>
  </tr></table>
</nav>
<!-- lab-navigation:end -->
