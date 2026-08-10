# 真实问题研究索引（2026-08-10）

**状态：** `candidate`。这是公开用户报告的导航和证据边界，不是官方故障清单，也不是本项目的本地复现报告。

本索引把不同研究旁线中的问题编号、原始来源、访问日期、版本范围和教学落点放在一起。正文只吸收原创摘要和排查方法；不复制外部帖子、代码、图片、日志、凭据或 Skill 指令。

## 研究记录

| 记录 | 覆盖范围 | 来源与访问日期 | 证据边界 | 主要落点 |
|---|---|---|---|---|
| [FP](field-problems-codex.md) | Codex CLI/App、认证、GitHub host、connector、Skill、模型、验证 | `openai/codex` 原始 Issues；2026-08-09 | 用户报告为主；未本地复现；未把维护者未确认的推测写成根因 | 第 5、9、12、13、14、15、22 章 |
| [FP-S](field-problems-surface-2026-08-10.md) | 工作面、Provider、WSL、目录 roots、Worktree、Cloud、Computer Use、线程所有权 | `openai/codex` 原始 Issues；2026-08-10 | 用户报告；Issue `closed` 不等于已修复；未本地复现 | 第 5 章、实验 007、第 13 章、实验 013 |
| [FUP](field-problems-follow-up-2026-08-10.md) | 子 Agent handoff、工具注册、第二目录、WSL 代理、HTTP 507 | `openai/codex` 原始 Issues；2026-08-10 | 用户报告；未本地复现；没有官方根因确认 | 第 5、8、9、12、13、19 章、实验 013 |
| [论坛](field-problems-forums-2026-08-10.md) | Stack Overflow 的 sandbox 网络、Windows、VS Code spawn、审批、编码、私密目录、Maven，以及可访问的 GitHub Issue 摘要 | Stack Exchange API、可定位的 Stack Overflow 页面和 GitHub 公共 Issue；2026-08-10 | Stack Overflow 的回答是社区建议；Reddit、Discussions 和无法可靠访问的页面未纳入证据；未本地复现 | 第 5、7、9、13 章、实验 013 |

## 正文使用的案例映射

| 编号 | 报告者看到的症状（自己的话） | 版本/环境记录 | 当前状态与证据 | 教学动作 |
|---|---|---|---|---|
| [FP-02](field-problems-codex.md#fp-02：浏览器显示认证成功，但-token-exchange-失败) | 浏览器页面成功，但客户端 token exchange 失败 | Codex/CLI 0.147.0；Windows 11、WSL/Linux；2026-08-07 创建，2026-08-09 整理 | Issue `open`；用户报告；本项目未复现 | 拆分授权页面、回调、交换和首个无副作用请求；失败就停在 `blocked`/`unverified` |
| [FP-03](field-problems-codex.md#fp-03：github-enterprise-only-用户被-pr-入口错误地探测到-githubcom) / [FP-04](field-problems-codex.md#fp-04：github-connector-无法为第二个组织建立-installation) | CLI/第一个组织可用，但应用 host 或第二组织 installation 不对 | App 26.715.31251 / 26.727.40816；macOS；2026-07-22、2026-08-01 创建 | Issue `open`；用户报告；本项目未复现 | 分开核对 hostname、账户、组织、仓库和 installation；未确认前不申请权限 |
| [FP-S-05](field-problems-surface-2026-08-10.md#fp-s-05：windows-linked-worktree-中的-apply_patch-被误判为项目外) / [FP-S-06](field-problems-surface-2026-08-10.md#fp-s-06：界面显示已切到-worktree，但-agent-仍在原-checkout-工作) | Worktree 标记、shell、patch 和 Git 目录可能不一致 | CLI 0.147.0/PowerShell 7.6.4；Windows；或 Desktop 26.715.52143/macOS；2026-08-10 整理 | Issue `open`；用户报告；本项目未复现 | 只读核对 `cwd`、worktree 根、workspace root、IDE 路径和 Git 状态；不确认就停止写入 |
| [FUP-01](field-problems-follow-up-2026-08-10.md#fup-01：子-agent-被创建，但任务消息没有到达) / [FUP-05](field-problems-follow-up-2026-08-10.md#fup-05：长时间没有任何事件，随后-http-507-并自动重试) | 状态存在或重试成功，但消息到达、第一次副作用和结果仍未证实 | 2026-08-10 创建/访问；具体版本依报告 | Issue `open`；用户报告；本项目未复现 | 用固定短词/检查点证明创建、到达、执行、返回；重试前先核对 diff 和外部状态 |
| [论坛-1](field-problems-forums-2026-08-10.md#1-sandbox-内访问-github-被网络-allowlist-拦截) / [论坛-3](field-problems-forums-2026-08-10.md#3-vs-code-扩展-spawn-unknown，但-cli-能手动启动) | 网络 allowlist 或 VS Code host 失败，但另一层看似正常 | Codex CLI、Windows/VS Code、企业策略等；源站时间戳以页面为准 | 用户报告与回答者建议；无官方确认；本项目未复现 | 先区分 sandbox、代理、PATH、扩展 host 和目标工具；不要直接扩大网络或绕过企业策略 |
| [WF-09](web-field-problems-2026-08-10.md#wf-09：浏览器能读到弹窗，但点击证据仍未成立) | 页面和 DOM 可读，但点击调用超时 | Windows 浏览器控制；2026-08-10 访问 | 用户报告；本项目未复现 | 把页面可见、元素可定位、调用返回、页面变化分开记录；交付“读取已验证、点击未验证” |

## 证据等级与复核规则

- `用户报告` 只证明报告者声称观察到相应环境和症状；多环境测试仍不自动变成官方确认。
- `回答者建议` 只记录社区 workaround 及其风险；不自动升级为当前版本的配置语法或支持政策。
- `官方确认` 需要维护者明确回复、官方文档、修复记录或可核对的发布说明；自动去重机器人不算确认。
- `本地复现` 只有在本项目实际运行并保存证据后才能填写；本索引当前没有任何一条本地复现。
- 每次正文引用易变案例时，保留原始 URL、Issue 状态、报告版本/平台、访问日期和“本项目未复现”边界。`closed` 只代表页面状态，不代表修复或所有账户可用。

## 论坛与许可边界

Stack Overflow 页面标注 CC BY-SA 4.0；本项目只做事实摘要、问题结构和链接引用，不复制大段原文、代码或回答者命令。GitHub Issue 只作为公开用户报告来源引用，不把作者、标签或搜索结果当作 OpenAI 官方确认。Reddit、GitHub Discussions 和当前环境无法可靠核对的页面不进入正文证据。

**后续复核：** 重新访问原始 URL，记录维护者回复、关联 PR、修复版本、页面状态和当前适用范围；若没有新证据，保持 `candidate`、`unverified` 或 `blocked`，不要升格为 `verified`。
