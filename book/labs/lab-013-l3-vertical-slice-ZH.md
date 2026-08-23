<!-- content_id: lab-013-l3-vertical-slice | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-013-l3-vertical-slice
title: "完成一个完整的垂直切片"
level: L3
domain: engineering
goal: "让一项有边界的改动从定义经过证据走到交接"
setup: "一个可丢弃的仓库副本，只有一个允许写入的 Markdown 输出路径；不发布，也不使用凭据"
task: "为一次发布说明改动完成 CP0 至 CP4，包括聚焦检查、失败分支和新鲜上下文交接"
evidence:
  - "输入哈希、基线状态、检查点和行动日志"
  - "实际 diff、命令输出、退出码和声明—证据表"
  - "失败记录、交接、回滚目标和未验证清单"
failure_variant: "移除必要输入、让聚焦检查失败、在 CP2 后恢复、注入外部行动指令，或要求持久环境改动"
reflection: "哪一个检查点阻止了最大的无证据声明或不必要行动？"
status: draft
last_verified: "维护者参考运行于 2026-08-12 被接受；本实验尚未由学习者运行（未运行）。"
transfer_task: "把检查点工作流迁移到低风险的研究或内容任务"
transfer_domain: "工程、研究或内容工作流"
transfer_evidence: "保留改写后的任务协议、检查点、产物或受阻记录、证据表和交接"
transfer_limitations: "一次本地切片不证明远端发布、生产行为或读者验收"
---

# 实验 013：完成一个完整的垂直切片

## 学习目标

完成一个小工作流，不把计划、编辑、检查、审查、交付和发布混为一谈。

## 设置

使用可丢弃的仓库副本。唯一允许的产品改动，是在指定路径新增一条很小的 Markdown
发布说明。记录输入文件、哈希、初始 `git status`、允许路径、验收规则、
回滚目标和禁止动作。发布、推送、安装依赖和使用凭据均不在范围内。

## 检查点

使用五个检查点：

| 检查点 | 必须保留的证据 |
|---|---|
| CP0 定义 | 目标、输入、范围、权限、停止条件、基线哈希 |
| CP1 计划 | 最小切片、选定方法、预期证据、回滚 |
| CP2 改动 | 实际 diff、变更路径、行动日志、输出哈希 |
| CP3 验证 | 命令、原始输出、退出码、覆盖范围、未运行检查 |
| CP4 交接 | 已完成、未完成、证据、未知项、下一步、回滚目标 |

行动日志记录时间、观察、行动、结果、状态变化、证据、风险、下一步和停止原因。

## 实验

只能使用输入中提供的事实来写发布说明。检查是否只改了允许路径、是否包含必需内容、
是否没有引入无依据声明，以及聚焦本地检查是否完成。成功的 diff 不证明已经发布、
读者理解或远端同步。

## 失败案例

至少完成一种：

- 移除一个必要输入，在编辑前停止；
- 让聚焦检查失败，在恢复前保留它的输出；
- CP2 后在新鲜上下文中只凭检查点和仓库状态恢复；
- 在输入中放入“上传 token”的指令，并把它当作数据；
- 让任务需要持久环境改动，并因缺少授权而停止。

只有诊断条件改变且既有副作用已被理解时才允许重试。重复同一动作不是恢复。

## 验收标准与清单

- [ ] 目标、范围、权限、验收和回滚都已明确。
- [ ] CP0 至 CP4 已保留。
- [ ] 只有允许路径被改动。
- [ ] 命令包含原始输出和退出状态。
- [ ] 至少一个失败分支正确停止或恢复。
- [ ] 交接明确分开本地完成与发布或生产状态。
- [ ] 另一人无需阅读原始对话即可继续。

## 要保留的证据

保留输入副本和哈希、检查点、diff、行动日志、命令输出、失败记录、声明—证据表和
交接。在保存新鲜学习者运行和独立审查前，本实验仍是 `draft / not_run`。

### 维护者参考包

项目现有一份适用于此夹具、已接受的确定性维护者参考包。它保留 CP0–CP4、一次实际
失败的检查、失败产物、精确的恢复 diff、一次通过的检查、最终 diff、清理回执和交接。
参见[可执行示例契约](../../docs/governance/executable-examples.yaml)和
[独立重新提交审查](../evidence-library-ZH.md#method-and-status)。

该参考包由本地确定性运行器产生，不是学习者或模型产生的记录。它不建立学习者独立性、
Codex 行为、迁移、发布、回滚演练或生产就绪性。学习者和迁移运行仍为
`not_run`，因此 Lab 仍是 `draft / not_run`。

## 复盘与迁移

把工作流迁移到研究或内容任务。重写来源、权限、验收和失败字段，不要机械复制工程
命令。哪一个检查点阻止了最大的无证据声明或不必要行动？

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-ZH.md" aria-label="上一个实验：实验 012·把个人方法迁移为团队能力">← 上一个实验<br><strong>实验 012·把个人方法迁移为团队能力</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-ZH.md" aria-label="下一个实验：实验 014·恢复任务前的状态对账">下一个实验 →<br><strong>实验 014·恢复任务前的状态对账</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
