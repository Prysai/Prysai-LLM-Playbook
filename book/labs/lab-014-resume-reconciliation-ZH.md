<!-- content_id: lab-014-resume-reconciliation | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

---
id: lab-014-resume-reconciliation
title: "继续之前，先核对恢复的任务"
level: L3
domain: general
goal: "继续工作前，核对任务指针、目标、分支、权限和副作用状态"
setup: "带检查点和两个文本文件的可丢弃本地文件夹或仓库；不使用凭据、网络、生产文件或不可逆命令"
task: "记录实时状态，与检查点比较，分类每个字段；只有目标、权限和副作用状态一致时才继续"
evidence:
  - "检查点、实时观察、命令、输出、差异、分类表和继续决策"
  - "对 matched、changed 和 not_observed 字段的清楚记录"
failure_variant: "让任务名称相同但仓库根目录或目标文件不同；编辑前停止并找出第一个未核对字段"
reflection: "哪个字段最容易被想当然？哪条观察改变了继续或停止的决定？"
status: draft
last_verified: "not run"
transfer_task: "将此核对边界用于浏览器或 MCP 会话，但不做远程写入"
transfer_domain: "浏览器操作、研究、工程或内容交接"
transfer_evidence: "保存此前请求、目标、批准状态、已观察到的远端状态风险和新的检查点"
transfer_limitations: "可丢弃夹具不能证明真实账户、远端资源或已恢复的生产任务具有连续性"
---

# 实验 014：继续之前，先核对恢复的任务

**状态：** `draft` · **运行状态：** `not_run`

## 为什么要做这个实验

公开的现场报告显示，Agent 会在上下文压缩、容量中断或恢复后回到较早的任务。新的提示词会让会话看起来仍在工作，但任务指针、工作树或副作用状态可能已经不确定。本实验练习的是：先核对，再继续。

## 准备

使用一份小仓库的可丢弃副本，或一个含两个文本文件的文件夹。创建一个检查点，写明目标、目标路径、分支、最后完成的动作、待做动作、权限状态和证据。通过启动第二个任务或用旧副本替换检查点来模拟中断。不要使用凭据、网络、生产文件或不可逆命令。

## 任务

1. 记录当前工作目录、仓库根目录、分支、目标文件、文件哈希或修改时间，以及当前差异。
2. 将这些观察与检查点逐项比较。
3. 将每一项分类为 `matched`、`changed` 或 `not_observed`。
4. 只有在目标、权限和副作用状态都已核对时才继续；否则创建新的检查点并停止。

## 证据

保存检查点、命令和输出、差异、分类表以及简短的决策。一次成功的练习记录只能证明你在可丢弃夹具中遵循了核对流程。

## 失败变体

让可见任务名称匹配，但仓库根目录或目标文件不同。正确结果是在编辑前停止，并指出第一个未核对字段。不要仅因错误的检出目录可写，就在其中“修复”它。

## 迁移

将同样的边界用于浏览器或 MCP 会话：确认最后一个已证实的请求、目标账户或资源、批准状态，以及前一次调用是否可能改变远端状态。

## 验收清单

- [ ] 我记录了实际路径、仓库、分支、目标和差异。
- [ ] 我将实时状态与命名检查点进行了比较。
- [ ] 我把已改变与未观察分开记录。
- [ ] 当目标或副作用状态不确定时，我停止了。
- [ ] 我没有把一条恢复提示当作连续性的证明。

## 复盘

写下哪个字段最容易被假定、哪条观察改变了决策，以及哪些内容仍是 `not_observed`。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-ZH.md" aria-label="上一个实验：实验 013 · 完成一个完整纵向切片">← 上一个<br><strong>实验 013 · 完成一个完整纵向切片</strong></a></td>
    <td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-ZH.md" aria-label="下一个实验：实验 015 · 交付证据，而不只是一句完成声明">下一个 →<br><strong>实验 015 · 交付证据，而不只是一句完成声明</strong></a></td>
  </tr></table>
</nav>
<!-- lab-navigation:end -->
