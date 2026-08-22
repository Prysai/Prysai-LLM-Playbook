<!-- content_id: lab-007-action-boundaries | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# 实验 007：把一个 README 任务放进三个行动边界

---
id: lab-007-action-boundaries
title: "在三个工作面放置同一个 README 任务，练习授权、停止与证据"
level: L3
domain: general
goal: "把公开报告中的边界症状转化为低风险、可观察、可回滚的练习流程"
setup: "一份脱敏 README 任务、普通本地副本、隔离 Worktree 或模拟目录，以及代表组织工作面的第二目录；不需要真实 token"
task: "先观察，再做最小本地修改，在三个工作面记录分段状态、症状、检查和证据；不执行真实 push 或 publish"
evidence:
  - "每个情境一张状态卡，分开记录已登录、已授权、已执行和已验证"
  - "症状卡、最小排查顺序、停止条件和最终证据表"
  - "本地副本和 Worktree 的差异与回滚入口，以及第二工作面的风险说明"
  - "把同一套边界方法迁移到文档、研究或发布准备任务的记录"
failure_variant: "把浏览器成功当成 token exchange，把一个已认证 host 当成目标 host，把一个组织的访问当成另一个组织已安装，或把验证当成强制重装权限"
reflection: "哪种状态最容易被‘已经登录’掩盖？哪项检查能增加证据而不扩大权限？三个工作面如何改变回滚和审查？"
status: draft
last_verified: "未运行；真实三工作面实验待执行；本文件定义练习契约"
transfer_task: "将边界记录应用到一个不需要真实外部写入的文档、研究或发布准备任务"
transfer_domain: "工程发布准备、研究发布准备、营销内容、团队审批"
transfer_evidence: "脱敏任务卡、工作面卡、状态卡、症状与排查记录、执行记录、结果检查和回滚入口"
transfer_limitations: "本实验不证明真实账户、Enterprise host、组织安装、分支保护、connector、发布平台或远端回滚可用"
---

## 现实问题

公开报告常把登录、可访问、获准、已执行和已验证压缩成一个词。常见跳跃
包括：浏览器认证成功但后续 token exchange 失败；Enterprise CLI 已认证但
PR 入口探测 github.com；能访问一个组织却无法在第二个组织建立 installation；
以及 Agent 为了验证而强制重装持久环境。这些是用户报告，不是本地复现或官方
根因。本实验训练的反应是定位阶段、做最小检查、在需要更大权限时停止。

## 固定夹具

不要使用真实组织、remote、token、SSH key、Cookie、环境文件、生产文件或个人
数据。只创建如下脱敏输入：

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

固定任务：在 Status 下增加一行 boundary: local-only，保留其他内容，只修改
README.md，展示 diff 和检查结果。除非另有明确授权，不 commit、push、publish、
安装依赖或修改持久环境。

验收条件是只增加一行、原有标题和字段不变、差异可见、检查副作用已说明，
commit、push、publish、安装和重启均记录为 not_run。回滚是恢复临时副本或
删除这一行，不是删除远端历史。

### 固定夹具的观察点

在开始三个情境前保存同一份基线：绝对路径、文件哈希、初始 `git status`、
允许写入的路径和验收规则。每个情境都使用同一份脱敏 README；如果夹具、
模型、工作面或权限改变，必须在记录中标记为 `not_comparable`，不能把差异
归因给“行动边界”本身。

## 三个情境

### A：普通本地副本

记录绝对路径和基线 hash，读取文件，编辑一行，查看差异，运行离线检查并记录
回滚。预期只有本地文件变化，账户、远端和发布状态仍是 not_run。

### B：隔离 Worktree

使用脱敏 Git 仓库和隔离 Worktree；没有 Git 时用明确命名为 worktree-simulation
的第二目录，并说明它是模拟。记录主树、隔离路径、分支和基线 commit。只在
隔离位置编辑，检查主树未变化，默认不 commit、push 或 publish。

### C：组织工作面模拟

使用标记为 organization-like-simulation 的脱敏本地目录。不要连接真实组织、
Enterprise、connector、remote 或网络服务。重新评估可见性、协作者影响、分支
保护假设、安装范围和回滚负责人。技术上可写不等于组织授权。

## 症状卡

| 卡片 | 报告症状 | 可以记录的事实 | 不得推出 | 最小下一步 |
|---|---|---|---|---|
| S-02 | 浏览器认证成功但 token exchange 失败 | 只有浏览器阶段成功 | 已完整登录或根因已知 | 拆分阶段并记录脱敏错误，不重试真实登录 |
| S-03 | Enterprise CLI 已认证但 PR 入口探测 github.com 并返回 401 | CLI host 和应用 host 可能不同 | GitHub 全部可用或 401 必然是仓库权限 | 只读比较 host、remote 和入口 |
| S-04 | 能访问一个组织但不能为第二个组织建立 installation | 身份、组织、installation、仓库访问是不同状态 | 管理员权限自动包含 installation | 记录四个状态，不申请安装 |
| S-11 | 验证扩大为 force reinstall 或持久环境替换 | 验证与安装授权是两件事 | 技术上能执行就代表获准 | 保存 diff，改用隔离/静态检查 |

每张卡都加注：来源是用户报告；本地复现未做；官方根因未确认。原始 URL
和日期以研究索引为准，本实验不复制外部正文、凭据或资产。

### 症状卡的使用顺序

先写“看到了什么”，再写“不能推出什么”，最后只做卡片中的最小只读
检查。不要先采用论坛给出的修复命令；如果检查需要扩大网络、目录、账号
或安装权限，直接进入停止条件并保留当前证据。

## 分段状态卡

每个情境填写一张，后面的状态不能覆盖前面缺失的证据：

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run
identity_observed:
action_authorized:
result_verified:
external_state_changed:
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

必须保持三条区分：

~~~text
观察到身份       ≠ 本次行动已获授权
行动已经执行     ≠ 结果已经验证
目录技术可写     ≠ 共享或远端目标允许写入
~~~

### 四个状态的记录规则

对每个情境分别填写 `identity_observed`、`action_authorized`、
`action_executed` 和 `result_verified`。前一个字段缺失时，后一个字段不能
用“应该可以”补齐；例如浏览器显示已登录，只能记录身份界面被观察到，不能
自动把远端写入标为已授权或已验证。

## 复盘

在把任何状态写成 `verified` 前，记录支持它的观察、仍然未知的阶段，以及下一个
检查是否能增加信息而不增加外部副作用。

## 最小排查顺序

1. 冻结准确路径、目标、host、数据范围和禁止动作。
2. 保存 hash、git status、分支、Worktree 和原始任务。
3. 定位阶段：入口、身份、目标、授权、执行或验证。
4. 只读检查文件、路径形状、配置形状、host 字符串和脱敏日志。
5. 只在夹具中做一次可逆修改，保存 diff、返回码和生成物。
6. 对比三个工作面的可见性、协作者影响和回滚责任。
7. 只有验收证据直接匹配时才写 verified，否则写 unverified 或 blocked。

### 最小排查记录

```text
step | 观察到的事实 | 使用的证据 | 没有检查的范围 | 下一步或停止原因
```

每一步只改变一个条件。若同一检查第二次失败且没有新的路径、版本、权限或
输入证据，保留两次输出并停止，不要用更强的命令掩盖诊断缺口。

## 停止条件与证据表

目标或范围不清、下一步需要 commit/push/publish/安装/部署/重启/删除、出现
秘密或未脱敏个人数据、审批未说明准确对象和载荷、需要外部账户或持久环境、
建议 force 操作，或命令可能进行未知写入时，停止并保存差异、错误、基线和
检查点。提交一张证据表，覆盖任务边界、工作面、基线、五个权限字段、症状定位、
最小行动、结果、分段状态、回滚和外部动作。真实外部动作明确写 not_run。

### 证据表的最低字段

| 字段 | 要记录的内容 |
|---|---|
| 任务与工作面 | 目标、绝对路径、host/remote（如有）和情境 ID |
| 身份与授权 | 观察到的身份、准确目标、授权范围、人工确认 |
| 执行与结果 | 命令/动作、返回码、改变的文件或 `not_observed` |
| 验证与回滚 | 验收检查、diff/hash、回滚入口和责任人 |
| 外部动作 | commit、push、publish、安装、通知均写 `not_run` 或给出实际证据 |

## 故意失败与迁移

只在夹具中依次处理“浏览器成功所以写远端”“CLI 登录所以 host 一定正确”
“管理员所以第二组织已安装”“验证失败先强制重装”四种提示。每次指出缺少的
证据和更小的安全检查。然后把方法迁移到研究来源表、发布说明或脱敏 PR 审查，
不进行真实外部写入。

迁移时不要复制 GitHub 或组织名称。把同一结构改写为“研究来源表”或“发布
说明审查”：目标、来源、允许动作、证据、停止、回滚和未知项必须重新填写。

## 通过标准

能在三个工作面重复夹具，区分身份、授权、执行、验证，正确处理四张症状卡，
先保存基线，不用 force 操作证明成功，触发停止条件时保留证据，完整提交状态
卡和证据表，并完成一次低风险迁移。真实 token、push、publish、installation、
部署、通知和持久替换全部保持 not_run。

## 来源与限制

Codex 问题研究提供用户症状和公开链接，论坛研究提供社区背景；它们不是本地
复现或官方修复。本文夹具是原创、可回滚练习输入，不能证明真实账户、连接器、
Enterprise、发布或远端回滚链路可用。

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-006-agent-stop-conditions-ZH.md" aria-label="上一个实验：实验 006·设计 Agent 停止条件">← 上一个实验<br><strong>实验 006·设计 Agent 停止条件</strong></a></td>
<td align="right"><a data-lab-nav="next" href="lab-008-research-question-ZH.md" aria-label="下一个实验：实验 008·把主题收窄成可回答的研究问题">下一个实验 →<br><strong>实验 008·把主题收窄成可回答的研究问题</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
