# 实验 007：行动边界分级

---
id: lab-007-action-boundaries
title: "把一个 README 任务放进三个工作面，练习授权、停止和证据"
level: L3
domain: general
goal: "把真实用户报告中的边界问题转换为低风险、可观察、尽量可回滚的实验流程"
setup: "一份脱敏 README 任务、一个普通本地副本、一个隔离 Worktree，以及一个组织仓库的脱敏只读副本或第二目录；不需要真实 token"
task: "在三个工作面执行同一个 README 夹具：先观察，再做最小本地编辑，记录分段状态、症状、排查和证据；不执行真实 push 或 publish。"
evidence:
  - "三个情境各有一张分段状态卡，分别区分已登录、已授权、已执行和已验证"
  - "症状卡、最小排查顺序、停止条件和最终证据表"
  - "本地副本与 Worktree 的 diff、回滚入口，以及组织/第二目录的额外风险说明"
  - "迁移任务：把同一套边界记录迁移到文档、研究或发布准备任务"
failure_variant: "把浏览器页面成功当成 token 已交换，把唯一已认证 host 当成目标 host，把第一个组织的 connector installation 当成第二个组织已获准，或为了验证而 force reinstall、替换持久环境。"
reflection: "哪一个状态最容易被一句‘已经登录’掩盖？哪个检查能产生新证据而不扩大权限？三种工作面分别改变了什么回滚和审查要求？"
status: draft
last_verified: "未运行；待运行真实三情境实验；本轮仅更新实验说明"
transfer_task: "把这套夹具迁移到一个不需要真实写入的文档、研究或发布准备任务，并重新填写目标、数据范围、授权、停止点、验证和回滚证据。"
transfer_domain: "工程发布准备、研究发布准备、营销内容、团队审批"
transfer_evidence: "保存脱敏任务卡、工作面卡、分段状态卡、症状与排查记录、执行/未执行记录、结果验证和回滚入口。"
transfer_limitations: "本实验不证明任何真实账户、Enterprise host、组织安装、分支保护、connector、发布平台或回滚链路可用。"
---

## 本实验要解决的真实问题

这些公开报告显示的一种重复模式不是“命令不会写”，而是把几个不同的事实压成了一个词：登录、可访问、获准、已执行和已验证。这样会出现看似合理但危险的跳跃：

- 浏览器显示认证成功，却在后续 token exchange 阶段失败；
- GitHub Enterprise 用户已经在 CLI 中认证，却被应用的 PR 入口带到了 `github.com`；
- 同一用户能访问第一个组织，却无法为第二个组织建立 connector installation；
- 用户只授权修改源码和验证，Agent 却为了验证而 force reinstall、替换持久环境或启动更大的流程。

本实验参考 `docs/research/field-problems-codex.md` 的 FP-02、FP-03、FP-04、FP-11。它们是用户报告和报告中的分析，不是本地复现；截至本实验编写时也没有把报告者推测写成官方根因。原始记录中的未知项、版本差异和未确认状态必须保留。

本实验的目标不是复现认证服务或 connector 的产品缺陷，而是训练一种安全响应：先把症状放回正确阶段，再用最小、可观察、可回滚的检查缩小范围；无法证明时就停止，并把 `not_run` 作为有效结果。

## 固定夹具：同一份脱敏 README 任务

不要使用真实组织名、仓库名、remote、token、SSH key、Cookie、`.env` 或生产文件。先准备一个独立目录，目录中只包含如下脱敏文件：

```text
fixture-readme/
└── README.md
```

`README.md` 的初始内容固定为：

```markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
```

任务请求固定为：

> 在 `README.md` 的 `Status` 下添加一行 `- boundary: local-only`，保留原有内容；只允许修改这个文件。先给出 diff 和检查结果。除非得到新的明确授权，不提交、不推送、不发布、不安装依赖、不修改持久用户环境。

任务验收固定为：

- `README.md` 只新增 `- boundary: local-only` 这一行；
- 原有标题、字段和换行未被无关改写；
- 能展示修改前后差异；
- 能说明检查命令是否运行及其副作用；
- commit、push、publish、安装和重启均记录为 `not_run`，除非实验者另有明确实验授权；
- 回滚方式是恢复夹具副本或撤销这一行，不是删除真实远端历史。

## 三个情境

同一个 README 任务必须在三个情境各做一遍规划和观察。每个情境使用新的 `run-id`；不要把一个情境的成功外推到另一个情境。

### 情境 A：普通本地副本

工作面是一个临时目录中的脱敏 `fixture-readme`。只允许读取文件、编辑 `README.md`、查看 diff，以及运行不会联网、不安装、不启动持久服务的检查。

最小操作顺序：记录绝对路径和基线 hash → 读取 README → 编辑一行 → 查看 diff → 用只读方式检查目标行 → 记录回滚动作。预期结果是本地文件发生一个可见、可逆的变化；远端状态、账户状态和发布状态仍为 `not_run`。

### 情境 B：隔离 Worktree

用脱敏 Git 仓库的隔离 Worktree 承载同一个夹具。如果没有 Git 环境，就用第二个明确标记为 `worktree-simulation` 的目录，并在证据中说明这是模拟，不是 Git Worktree。

先记录主工作树路径、Worktree 路径、当前分支和基线 commit；只在 Worktree 中编辑 `README.md`。检查主工作树是否仍无变化，然后查看 Worktree diff。可以练习“本地提交是否被授权”的判断，但本实验默认不提交；commit、push 和 publish 均为 `not_run`。

### 情境 C：组织仓库或第二目录

首选一个组织公共仓库的脱敏只读副本；如果没有该资源，用第二个本地目录模拟“组织仓库/第二目录”，目录名和记录中都写明 `organization-like simulation`。不得连接真实组织、Enterprise host、connector、remote 或网络服务。

在这里重新评估可见性、协作者影响、分支保护假设、安装范围和回滚责任。即使技术上发现目录可写，也不能把可写性当成组织授权。只做只读观察和脱敏本地编辑；不创建 installation、不申请权限、不改变远端、不发送通知。

## 症状卡：把报告转成安全的观察题

以下卡片是实验输入，不是要求学员复现外部系统。每张卡都要填写“观察到什么、不能推出什么、下一步最小检查是什么”。

| 卡片 | 报告中的用户症状 | 可以暂时记录的事实 | 不得直接推出的结论 | 安全的下一步 |
|---|---|---|---|---|
| S-02 | 浏览器显示认证成功，但 token exchange 失败；device auth 也可能失败 | 浏览器阶段成功；客户端后续交换失败；版本、系统和网络条件需要单独记录 | “已经登录”“token 一定有效”“根因就是 Cloudflare/账号/客户端” | 把认证链拆段，只记录脱敏错误和时间；不重试真实登录、不索要 token |
| S-03 | GitHub Enterprise CLI 已认证，但 PR 入口探测 `github.com` 并报 401 | CLI 的 host 与应用入口的 host 可能不同；外部 CLI 成功不等于应用入口成功 | “GitHub 已经可用”“应用一定知道正确 host”“401 就是仓库权限不足” | 在夹具中记录目标 host、来源、remote 形状和入口；只做字符串/配置检查 |
| S-04 | 同一用户能访问第一个组织，却无法为第二个组织建立 connector installation | 第一组织和第二组织是不同授权范围；组织管理员、installation、缓存和审批是不同状态 | “用户有管理员权限，所以 connector 已获准”“422 的根因已确定” | 把用户身份、组织选择、installation、仓库访问分开记；不发 installation request |
| S-11 | 验证被扩大为 force reinstall、替换持久环境或启动更大的流程 | 工作树可能已修改；验证需求与安装授权是两件事 | “为了验证可以安装”“技术可执行就是任务获准”“安装后结果就可信” | 保存当前 diff 和错误；改用隔离目录或静态检查；需要持久安装时停止并重新请求授权 |

每张卡都要加注：`来源：用户报告；本地复现：未做；官方根因：未确认；报告中的推测不等于本实验结论。` 原始 URL、日期和版本以[真实问题研究索引](../../docs/research/field-problems-index-2026-08-10.md)及对应研究记录为准，不要在本实验中复制外部报告的完整正文。

## 症状卡元数据

每张卡都必须把“报告发生在什么版本”和“本实验能降级到什么范围”写出来。下面的 `checked_at` 是研究记录的访问/整理日期，不是本项目复现日期；四张卡均没有本地复现。

| 卡片 | source_id / 原始 URL | reported_at | checked_at | surface_and_version | evidence_level | degraded_to |
|---|---|---|---|---|---|---|
| S-02 | [FP-02](../../docs/research/field-problems-codex.md#fp-02：浏览器显示认证成功，但-token-exchange-失败) · https://github.com/openai/codex/issues/37467 | 2026-08-07 | 2026-08-09 | Windows 11、WSL/Linux；Codex/CLI 0.147.0 | 用户报告；报告者自述多环境测试；官方根因未确认 | 本地脱敏认证阶段卡；只记录页面/交换/首个请求的状态 |
| S-03 | [FP-03](../../docs/research/field-problems-codex.md#fp-03：github-enterprise-only-用户被-pr-入口错误地探测到-githubcom) · https://github.com/openai/codex/issues/34798 | 2026-07-22 | 2026-08-09 | Codex App 26.715.31251；macOS；Enterprise host | 用户报告；外部 CLI 对照；官方根因未确认 | host、账户、remote 和入口字符串的只读对照；不进入 PR 提交 |
| S-04 | [FP-04](../../docs/research/field-problems-codex.md#fp-04：github-connector-无法为第二个组织建立-installation) · https://github.com/openai/codex/issues/36444 | 2026-08-01 | 2026-08-09 | Codex App 26.727.40816；macOS arm64；两个组织 | 用户报告；CLI/SSH 对照；官方根因未确认 | 组织、installation、仓库访问的脱敏状态卡；不申请 installation |
| S-11 | [FP-11](../../docs/research/field-problems-codex.md#fp-11：agent-将源代码验证扩大为未授权的持久环境替换) · https://github.com/openai/codex/issues/37677 | 2026-08-09 | 2026-08-09 | 产品/模型版本未完整披露；dirty worktree 与用户本地环境 | 单一用户事件报告；官方根因未确认 | 保存 source diff，转隔离目录做静态检查；安装、重启、发布和部署均为 `not_run` |

## 分段状态卡

每个情境至少填写一张卡。状态只能写观察到的阶段，不允许用后面的状态覆盖前面的缺口。

```text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:       # 无法观察时写 not_observed

source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run

identity_observed: yes | no | not_applicable
action_authorized: yes | no | not_observed
result_verified: yes | no | not_observed
external_state_changed: yes | no | not_observed
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
```

三条边界必须单独回答：

```text
账户/身份可识别       ≠ 这次动作已授权
动作已经执行          ≠ 结果已经验证
目录技术上可写        ≠ 组织或远端允许写入
```

## 最小排查顺序

遇到失败、模糊提示或预期不一致时，只按以下顺序走；每一步应产生一条新证据，不能用“多试几次”代替。

1. **冻结范围：** 写下准确路径、文件、目标 host/组织（如有）和本次禁止动作；确认没有真实 token 或秘密进入记录。
2. **保存基线：** 记录文件 hash、`git status`、当前分支/Worktree 和任务原文；不要先清理、重置、force push 或重装。
3. **定位阶段：** 将症状放入入口、身份、目标资源、授权、执行、结果验证中的一个或多个阶段；“页面成功”只覆盖页面阶段。
4. **只读核对：** 检查本地文件、路径、配置形状、host 字符串和脱敏日志；不调用真实外部服务，不申请新的权限。
5. **做一个最小可逆动作：** 仅在夹具目录编辑一行或运行离线检查，然后查看 diff、返回码和生成物；不要同时改变多个变量。
6. **比较工作面：** 对照本地副本、Worktree 和组织/第二目录的差异，记录可见性、协作者影响和回滚方式；不要把差异解释成官方根因。
7. **验证或停止：** 若没有新的证据，停止并写 `unverified` 或 `blocked`；只有看到与验收条件直接对应的结果，才写 `verified`。

## 停止条件

出现任一条件就停止当前动作，保留当前 diff、错误、基线和最后确认点；不得用清理或扩大权限“让实验通过”。

- 目标路径、host、组织、分支或数据范围不明确；
- 任务只授权读取/本地编辑，但下一步要求 commit、push、publish、安装、部署、重启、删除或通知；
- 发现真实 token、密钥、Cookie、`.env`、生产文件或未脱敏个人数据；立即移出实验记录并报告暴露边界，不复制、不上传；
- 看到批准提示，但不能证明批准覆盖准确目标、内容和动作；批准不扩大 sandbox、roots、认证或任务授权；
- 需要网络、外部账户、组织 installation、Enterprise host 或持久环境才能继续；
- 检查建议 force push、force reinstall、删除旧环境、覆盖用户环境或其他不可逆动作；
- 状态卡只能证明“已登录/已执行”，却没有“已授权/已验证”的对应证据；
- 运行命令出现未知写入、上传、安装、子进程或长时间卡住，且副作用范围尚未确认。

停止后的安全替代是：保存证据 → 说明缺口 → 提出一个更小的只读检查或隔离副本检查 → 等待新的明确授权。`not_run` 不是失败掩饰，而是对未发生外部动作的准确记录。

## 必须提交的证据表

每个情境都必须提交下表；没有执行的动作也要填 `not_run`，不能留空。

| 项目 | 必填内容 | 证据或路径 | 状态 |
|---|---|---|---|
| 任务边界 | 脱敏任务原文、允许修改的文件、禁止动作 | 任务卡或记录路径 | planned/verified |
| 工作面 | 情境、绝对路径、是否真实 Worktree、是否组织模拟 | 工作面卡 | verified/unverified |
| 基线 | hash/commit、`git status`、当前分支和现有 diff | 命令输出或截图 | executed/verified |
| 权限五字段 | `sandbox_mode`、`approval_policy`、`network_access`、`allowed_roots_read/write`、`side_effect_confirmation` | 原始观察；不可观察写 `not_observed` | observed/not_observed |
| 症状定位 | 症状卡编号、发生阶段、报告事实与推测的区分 | 症状记录 | verified/unverified |
| 最小动作 | 精确命令或编辑、输入范围、副作用预期 | 脱敏日志、diff、返回码 | executed/not_run |
| 结果验证 | README diff、检查结果、工作树/远端是否变化 | diff、输出或 `not_run` 说明 | verified/unverified |
| 分段状态 | 身份、授权、执行、验证各自的状态 | 分段状态卡 | verified/unverified |
| 回滚 | 准确撤销方法、回滚前后证据 | 恢复副本或反向 diff 说明 | available/not_run |
| 外部动作 | commit、push、publish、installation、通知、安装、部署、重启 | 明确写 `not_run`；不得伪造远端证据 | not_run |

最低合格证据是：三张工作面卡、三张状态卡、三份 README diff/未执行记录、一张症状与排查表，以及一段说明“登录、授权、执行、验证为何不能互相替代”的复盘。任何真实外部动作都不属于本实验验收项。

## 故意失败复盘

依次给自己四个错误提示，但只在本地夹具中处理：

1. “浏览器成功了，所以继续写远端。”正确动作是把 token exchange 标成未验证，并停在认证分段。
2. “CLI 已登录，所以 PR 入口一定是 `github.com`。”正确动作是记录 host 不一致，停在目标定位。
3. “用户是两个组织的管理员，所以第二组织已经安装。”正确动作是分别记录 installation 和仓库访问，停在授权确认。
4. “验证失败，先 force reinstall。”正确动作是保存 diff，改用隔离检查，停在持久环境边界。

复盘必须指出：哪一条证据缺失时仍不能推进；若中断发生在执行后、验证前，最终状态如何写；哪一个小检查能增加信息量而不增加外部副作用。

## 迁移任务

选择一个真实但不需要真实写入的任务，例如“整理研究报告的来源表”“准备发布说明”或“审阅一个脱敏 PR 描述”。复制本实验的五步：

1. 固定一个可脱敏、可恢复的输入和单一验收条件；
2. 为本地目录、隔离 Worktree、共享/组织模拟目录分别写工作面卡；
3. 预先列出身份、授权、执行、验证四段状态；
4. 写出至少两个真实症状、一个最小排查顺序和三个停止条件；
5. 提交证据表，并把真实外部写入明确列为 `not_run`，除非另有单独授权。

迁移时不要把外部 issue 的用户报告改写成“官方确认的根因”。保留原始 URL、访问日期、适用范围和不确定项；若没有本地复现，就写“非本地复现”。

## 通过标准

- 能在三个工作面重复同一 README 夹具，并说明工作面变化了什么；
- 能分别写出身份、授权、执行和验证的状态，不用“已登录”代替其他状态；
- 能正确处理 FP-02/03/04/11 四张症状卡，并明确它们是用户报告、非本地复现、非官方根因；
- 先保存基线，再按最小排查顺序进行，不以 force push、force reinstall、真实安装或发布作为“验证”；
- 触发停止条件时保留证据，写出更小的安全下一步；
- 证据表完整，真实 token、push、publish、installation、部署、通知和持久环境替换均为 `not_run`；
- 能完成一次文档、研究或发布准备场景的迁移，并保留回滚入口。

## 来源与边界

| 来源 | 用途 | 边界 |
|---|---|---|
| `docs/research/field-problems-codex.md` 的 FP-02、FP-03、FP-04、FP-11 | 提供现实症状和用户报告链接 | 不是本地复现；报告中的推测不是官方根因；状态和版本可能变化 |
| [`docs/research/field-problems-forums-2026-08-10.md`](../../docs/research/field-problems-forums-2026-08-10.md) 的论坛-1、论坛-3 等 | 提供 sandbox 网络和 VS Code host 的迁移症状 | Stack Overflow 的回答是社区建议；Reddit/Discussions 未可靠核对；不执行帖子命令 |
| 原始 issue URL（见上述研究记录） | 供维护者复核报告上下文 | 本实验不复制外部正文、凭据或未授权资产 |
| 本文件的 README 夹具 | 提供原创、脱敏、可回滚的练习输入 | 不能证明真实账户、仓库、connector、Enterprise host 或发布链路可用 |

---
