# Codex 真实用户问题后续研究 P2（2026-08-10）

**状态：** `candidate`
**访问日期：** 2026-08-10
**研究目的：** 为第 1–5 章或实验 001–003补充 2–4 条新的、可核对的现实用户问题。
**本轮结果：** 4 条，均来自可直接访问的 `openai/codex` GitHub Issue；官方文档只用于核对概念边界，不替代用户报告，也没有把维护者未确认的推断写成根因。

## 证据规则与去重

- Issue 正文和普通用户评论记录的是报告者所见的现象、环境和排查过程；它们不自动证明普遍性、服务端状态、内部实现或修复完成。
- GitHub Actions 的重复检测评论不是官方根因确认。以下 4 个 Issue 编号在访问日前的[真实问题研究索引](field-problems-index-2026-08-10.md)及其已列研究记录中未出现：`#36962`、`#37219`、`#37729`、`#37423`。
- “官方根因”只有在维护者回复、官方文档明确说明、官方修复记录或可核对的官方代码证据支持时才可写成确认。本轮 4 条均没有这样的根因确认，因此每条都明确写为“未确认”。
- 本项目没有对这些 Issue 做本地复现；`open` 状态不等于未修复，`closed` 状态也不等于已修复。

## 新增问题总览

| 编号 | 用户看到的断点 | 主要教学落点 | 官方根因状态 |
|---|---|---|---|
| P2-01 | Codex 任务显示网络已启用，但 macOS 本地网络权限阻断 LAN 连接 | 第 4、5 章；实验 003 | 未确认；Issue 只有用户报告和自动重复提示 |
| P2-02 | Linear OAuth 显示已接受，但只读工具调用持续要求重新认证 | 第 4、5 章；实验 002、003 | 未确认；没有维护者根因回复 |
| P2-03 | 子 Agent 已完成，父任务界面仍显示 Active/Working | 第 4 章；实验 003 | 未确认；用户报告了状态查询与 UI 的不一致 |
| P2-04 | Windows 权限选择器因旧持久化布尔值而灰掉 | 第 4 章；实验 001、003 | 未确认；报告者根据本机安装包推断实现原因 |

## P2-01：网络开关已启用，但 macOS Local Network 权限仍阻断 LAN

- **source_url：** [openai/codex Issue #36962](https://github.com/openai/codex/issues/36962)
- **访问日期与页面状态：** 2026-08-10；Issue 页面可直接访问，状态为 `open`。可见评论只有 GitHub Actions 的重复检测，未见维护者确认。
- **报告环境：** Codex Desktop `26.727.51351`，bundled CLI `0.146.0-alpha.9.2`，Darwin arm64；报告者使用了 ChatGPT 桌面任务。
- **现象与用户原话：** 报告者写道，任务元数据显示网络为 `enabled`，但连接局域网主机时仍得到 `No route to host`；其摘要是“启用 sandbox 网络不等于 ChatGPT 应用已经获得 macOS 的 Local Network 权限”。报告者称，在“System Settings → Privacy & Security → Local Network”中打开 **ChatGPT** 后，同一任务能够连接目标端口并得到 HTTP `401`，从而把“网络路径可达”与“服务认证失败”区分开。
- **用户报告与官方根因的区分：**
  - **用户报告：** 任务配置/元数据显示网络已启用；关闭 ChatGPT 的 macOS Local Network 开关时，`nc`/`curl` 失败；打开开关后，同一任务恢复 LAN 连通性。报告者还提到抓包、`Info.plist` 和直接运行 `codex sandbox` 的观察。
  - **官方可确认的边界：** OpenAI 官方 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 将 sandbox mode 定义为技术行动边界，将 approval policy 定义为批准时机，并说明本地 Codex 默认关闭网络；这支持“Codex sandbox 网络状态”和其他系统权限不是同一个断言。Apple 官方 [NSLocalNetworkUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nslocalnetworkusagedescription) 只确认应用请求本地网络时需要向用户说明原因。
  - **未确认的根因：** OpenAI 或 Apple 没有在该 Issue 中确认 Codex 的父应用权限请求、`Info.plist`、macOS 网络栈或某个固定版本是根因。报告者的“本地网络权限缺失导致阻断”是有对照结果支持的用户侧诊断，不应改写成官方修复结论。
- **可加入书稿的位置：**
  - 第 4 章“上下文、权限与 Agent 行动边界”：在 sandbox、approval、操作系统隐私权限三层之间加入“同一个‘网络已开’标签不能证明每一层都通过”的案例。
  - 第 5 章“选择正确的 Codex 工作面”：比较 Desktop 任务和直接运行时的网络结果；入口成功或配置存在不能替代当前任务的可达性证据。
  - 实验 003“证据审查”：把“配置值、系统权限、TCP/HTTP 结果、服务认证结果”拆成四个独立断言。
- **解决动作与验证边界：**
  - 先记录工作面、版本、目标主机、sandbox 网络状态和操作系统 Local Network 状态；用无秘密的、经授权的测试端点做最小连通性检查。
  - 报告者的动作是打开 ChatGPT 的 Local Network 权限后重试；这是用户报告的恢复步骤，不是本项目验证过的通用修复。不要为了绕过诊断直接切换 Full Access 或扩大网络 allowlist。
  - **验证边界：** 该动作最多证明报告者在该版本、该 Mac、该目标地址上恢复了连通性；HTTP `401` 只证明请求到达服务并进入认证层，不证明 Codex 已认证、工具调用成功或所有 LAN 主机可用。本项目未复现。

## P2-02：Linear OAuth 显示已接受，但只读调用持续重新认证

- **source_url：** [openai/codex Issue #37219](https://github.com/openai/codex/issues/37219)
- **访问日期与页面状态：** 2026-08-10；Issue 页面可直接访问，状态为 `open`。可见评论来自普通用户，未见维护者给出根因或修复版本。
- **报告环境：** Codex CLI `0.146.1`，macOS arm64，ChatGPT sign-in，`gpt-5.6-sol`；报告者明确只测试了 Linear 的只读 `get_issue` 动作，没有尝试写操作。
- **现象与用户原话：** 报告者看到工具返回：“Authentication for Linear was requested and accepted. Retry this tool call now.” 但同一个只读调用重试后仍返回 `reauthentication_required`；报告者称第一次等待约 100 秒后失败，重试再次等待并得到相同错误，因而形成“已接受授权但无法持久化”的循环。
- **用户报告与官方根因的区分：**
  - **用户报告：** 浏览器/授权步骤显示完成，Codex 的认证状态仍要求 reauthentication；同一 `linear_get_issue` 重试没有取得目标 Issue。一个普通用户评论称，在 Linear 的设置中删除旧的 Codex 授权并从 OpenAI 侧重新创建后，本人恢复使用。
  - **官方可确认的边界：** OpenAI 官方 [Skills & plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) 将 Connector 描述为由 MCP server 支持的外部连接能力；官方 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 说明带副作用声明的 app/connector 工具调用可能触发审批。官方文档没有把“OAuth 页面接受”定义为“本次具体工具调用已经能读取资源”。
  - **未确认的根因：** 没有官方回复确认是 OAuth 回调、Linear 侧授权记录、Codex token 持久化、Connector/MCP 会话或版本回归。普通用户提供的删除/重建授权步骤是 workaround 报告，不是官方支持流程或普适修复。
- **可加入书稿的位置：**
  - 第 4 章：把身份认证、Connector 授权、工具注册、具体资源读取和外部副作用拆成不同的准入门。
  - 第 5 章：说明“已连接的外部服务”仍需在当前入口、当前线程和当前工具上验证，不能把浏览器授权页面当作目标资源证据。
  - 实验 002：要求任务协议写明只读动作、一次重试上限、停止点和外部授权变更是否需要用户确认。
  - 实验 003：把“授权成功”“工具返回成功”“目标 Issue 已读到”分别列为声明、证据和缺口。
- **解决动作与验证边界：**
  - 先保存版本、Connector 名称、认证方式、工具名、错误类别和一次调用的等待时间；只做一次无副作用重试，不在循环中反复授权。
  - 若仍循环，暂停外部调用；只有在账户 owner 明确同意、知道会影响哪些连接的前提下，才考虑在服务端撤销旧授权并重新建立连接。不要索要或记录 token。
  - **验证边界：** 只有当同一个只读调用在重认证后返回目标数据，并能保留工具结果/时间/版本证据时，才能说“本次读取成功”；不能据此证明写操作、其他工作面或其他 Linear 组织也可用。本项目未复现，Issue 未获得官方根因确认。

## P2-03：子 Agent 已完成，但父任务界面仍显示 Active

- **source_url：** [openai/codex Issue #37729](https://github.com/openai/codex/issues/37729)
- **访问日期与页面状态：** 2026-08-10；Issue 页面可直接访问，状态为 `open`。可见评论包括 GitHub Actions 的重复提示和一条普通用户的跨 Windows 确认，未见维护者确认。
- **报告环境：** 报告正文为 macOS `26.6.1` arm64，精确 Desktop build 未提供；报告日期为 2026-08-09。评论中的另一位用户报告 Windows Desktop `26.803.5235.0` 也看到类似现象，但仍属于社区报告。
- **现象与用户原话：** 报告者说，父任务界面看起来有 3 个 active subagents，但运行时状态查询显示所有子 Agent 都是 `completed`，只有父 Agent 是 `running`；打开每个已完成的子 Agent 后，界面的 active 指示才消失。核心问题是“未读的完成结果”被视觉上表达成“仍在执行”。
- **用户报告与官方根因的区分：**
  - **用户报告：** runtime status、UI 指示和打开结果后的 UI 变化互相不一致；报告者没有观察到子 Agent 继续执行，但担心界面会误导用户判断资源是否仍被消耗。
  - **官方可确认的边界：** OpenAI 官方 [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) 说明 Codex 可以并行启动专门的 subagents，主线程收集结果，并在应用中显示每个 subagent thread 以便检查工作和结果。这个文档支持“状态、结果和检查是不同证据”，但没有确认该 Issue 的 UI 状态机或缓存实现。
  - **未确认的根因：** 没有官方确认是 UI hydration、未读状态映射、事件丢失、线程缓存还是后台 worker 仍存活。用户评论中的 renderer/app-server 推断不应写成产品内部事实。
- **可加入书稿的位置：**
  - 第 4 章：在 Agent 的“运行中、完成、被中断、结果未审查”状态中增加终态与可见状态不一致的边界。
  - 实验 003：要求分别保存运行状态、结果内容、结果是否被审查和父任务最终状态；界面上的 Active/Working 只能作为待核对信号。
- **解决动作与验证边界：**
  - 用只读状态查询或可见事件核对子 Agent 是否真的仍在运行，再打开并保存已完成结果；不因 UI 的 Active 标签直接等待、重跑或强制终止。
  - 如果状态查询显示 `completed`，将“执行结束”和“结果已审查”分开记录；如果两者冲突，先交付 `unverified`，不要声称资源已释放或任务已完成。
  - **验证边界：** 打开结果后指示消失只验证了该用户界面的一种刷新路径，不能证明后台没有残留进程、没有额外用量，也不能外推到所有 Desktop、CLI 或 IDE 版本。本项目未复现。

## P2-04：Windows 权限选择器因旧持久化布尔值而灰掉

- **source_url：** [openai/codex Issue #37423](https://github.com/openai/codex/issues/37423)
- **访问日期与页面状态：** 2026-08-10；Issue 页面可直接访问，状态为 `open`。可见评论是 GitHub Actions 的重复提示（指向 #37220），未见维护者确认。
- **报告环境：** Codex Desktop `26.803.5235.0`，Windows 11 Pro `10.0.22631`，x64 原生 Windows。
- **现象与用户原话：** 报告者称 Permission selector “permanently disabled/greyed out”：界面标签可能在 “Ask for approval” 与 “Full access” 之间变化，但选择器无法打开或切换。报告者还说，正常重启和修改 `config.toml` 中的审批/沙盒配置都没有修复；完全退出进程后，把旧的 `composer-permission-mode-visibility: false` 替换成当前对象形状并重新启动，选择器才恢复可交互。
- **用户报告与官方根因的区分：**
  - **用户报告：** 报告者检查了本机安装包并推断旧的持久化布尔值被当前 UI 当作非空有效值，导致预期的对象字段缺失；报告者的恢复步骤是在应用完全退出后修改本地持久化状态。
  - **官方可确认的边界：** OpenAI 官方 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) 明确区分 sandbox mode（技术上能做什么）和 approval policy（何时请求批准），并提供 `/permissions`/配置层面的概念。官方文档没有公开该持久化键、迁移规则或手工修改状态文件的支持承诺。
  - **未确认的根因：** Issue 没有维护者确认“旧布尔值导致选择器灰掉”的实现根因，也没有官方修复版本。报告者的安装包分析和状态迁移成功是本机用户证据，不应写成官方内部实现或推荐操作。
- **可加入书稿的位置：**
  - 第 4 章：增加“UI 显示的权限标签、持久化配置、有效运行时策略”三者必须分别核对的案例。
  - 实验 001：在第一个低风险任务前记录当前权限模式；选择器坏掉时，不用扩大权限来绕过问题，也不把标签当成已生效证据。
  - 实验 003：用一次无副作用任务观察是否真的出现预期批准行为，再判断权限声明是否成立。
- **解决动作与验证边界：**
  - 先停止需要写入或网络的任务，完整保存工作树和配置备份；优先使用产品支持的权限 UI/状态检查。没有明确维护者指导时，不要直接编辑持久化状态文件。
  - 若用户明确授权并采用报告者的状态迁移作为诊断实验，应在应用完全退出后备份原状态，只改变该单一键，重新启动后先检查选择器，再用无副作用任务观察实际批准行为；这仍是可回滚的用户侧 workaround，不是官方修复。
  - **验证边界：** 选择器重新可点击只证明 UI 状态恢复；必须再观察一个准确动作是否按预期请求/跳过批准，才能证明有效运行时策略。不能据此证明 Full Access 安全、所有旧配置可迁移或其他 Windows 版本不受影响。本项目未复现。

## 共同的教材化排查卡

```text
case_id:
checked_at: 2026-08-10
surface_and_version:
user_observation:
official_boundary:
root_cause_status: confirmed | user_inference | unconfirmed
target_and_side_effect:
last_confirmed_checkpoint:
minimum_read_only_probe:
external_state_changed: yes | no | not_observed
safe_stop_condition:
evidence_for_completion:
unverified_scope:
status: candidate | unverified | blocked
```

这张卡的重点是把“配置存在”“界面显示”“授权被接受”“Agent 已完成”和“结果已审查”拆开。任何一项不能替代其他项；遇到状态冲突时，停止扩大权限、重复重试或触发外部写操作。

## 来源与限制

### 本轮直接核对的官方资料

1. OpenAI — [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md)：sandbox、approval、网络默认状态和 app/connector 副作用边界；访问日期 2026-08-10。
2. OpenAI — [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md)：并行 subagent、结果收集、线程检查和权限继承；访问日期 2026-08-10。
3. OpenAI — [Skills & plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md)：Plugin、Connector、MCP 的产品层关系；访问日期 2026-08-10。
4. Apple — [NSLocalNetworkUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nslocalnetworkusagedescription)：应用请求本地网络权限时的说明字段；访问日期 2026-08-10。

### 研究限制

- 本轮没有把 Stack Overflow 或无法核对的论坛内容作为新案例；优先使用了可直接打开的 GitHub Issue 和官方文档。
- GitHub 公共 API 在检索过程中触发了匿名 rate limit；随后以同一 Issue 的公开 HTML 页面直接核对正文、标题、状态和可见评论。没有使用搜索摘要替代原文。
- 没有读取附件、私有反馈、账户权限、Connector 服务端授权记录或本机秘密；没有执行 Issue 中的命令，也没有尝试重认证、修改权限状态或访问局域网目标。
- 没有本地复现、维护者根因确认、官方修复版本核对或学习者前测。因此本文件保持 `candidate`，不能升级为 `verified` 或 `production-ready`。
- 本文件只做原创中文摘要和短引语，未复制外部代码、图片、日志或 Skill 指令；本轮没有新增需要登记的外部可分发资产。

**交付边界：** 本轮只新增本研究文件；未修改章节、实验、索引或其他项目文件，未提交、未推送。
