# Chapter 2 官方基线研究：低风险、可回滚、可验证的任务

**研究日期：** 2026-08-10
**内容状态：** `candidate`
**研究范围：** 只研究 OpenAI/Codex 官方文档与 Git 官方文档；主题限定为低风险可回滚任务、先检查再编辑、权限与确认点、diff 与验证证据、失败时不扩大权限。本文是项目研究记录，不是 Codex 当前账户、机器或仓库状态的运行证明。

## 1. 结论摘要

1. **先建立边界，再行动。** OpenAI 将 sandbox 定义为技术边界，将 approval policy 定义为何时暂停并请求确认的控制；二者不是同一件事。对本地任务，官方推荐的低风险方向是保留工作区边界、按需请求审批，并选择能完成任务的最窄权限。
2. **先检查再编辑是可审计的最小顺序。** Codex CLI 官方入口把工作描述为 inspect、edit、run，并建议任务前后建立 Git checkpoint 以便回退；这支持“检查目标、基线和权限 → 进行窄编辑 → 查看差异 → 验证”的工作流。官方文档没有规定所有任务必须使用这一固定顺序，因此本句是基于官方能力与安全建议形成的项目工作流推导。
3. **权限确认点应绑定具体越界动作。** 官方示例包括编辑工作区外文件、访问网络、运行需要越过 sandbox 的命令，以及带副作用的 app/MCP 调用。改变审批者不会扩大 sandbox；因此“获得批准”不能被解读为获得更大文件或网络范围。
4. **diff 是交付前证据，不是成功声明的替代品。** Git `status` 可显示 HEAD、index、工作树和未跟踪文件之间的状态；`diff` 可比较工作树、index、提交或两个文件；Git `diff --check` 可报告冲突标记和空白错误。Codex Code Review 文档还明确说明 review 可以针对未提交变更、提交或分支，并在 review 阶段不修改工作树。
5. **回滚动作要按对象和语义选择。** Git `restore` 用于将指定路径从某个 restore source 恢复到工作树或 index；Git `revert` 为已有提交创建反向提交，并要求工作树干净。它们都可能丢弃变更，故回滚前仍应先检查状态和差异。
6. **失败时应收敛，不应自动扩大权限。** OpenAI 文档要求选择最窄 profile，并说明自动 review、审批失败或解析失败不会把未获批准的动作放行；网络、认证、工具或测试失败不能自动推出“需要 full access”。正确的下一步是保留失败证据、缩小动作或请求明确且针对性的用户确认。

## 2. 官方事实卡

### OF-01：sandbox 与 approval 是两层控制

- **官方断言（改写）：** sandbox 规定 Agent 在技术上能做什么，例如可写位置和网络可达性；approval policy 规定何时必须在执行前暂停并请求批准，例如越出 sandbox、使用网络或运行不在信任集合中的命令。
- **来源：** OpenAI，*Agent approvals & security*，<https://learn.chatgpt.com/docs/agent-approvals-security.md>；OpenAI，*Permissions*，<https://learn.chatgpt.com/docs/permission-modes.md>
- **来源拥有者：** OpenAI / ChatGPT Learn
- **访问日期：** 2026-08-10
- **适用范围：** OpenAI 文档描述的 Codex CLI、IDE extension、ChatGPT desktop app；具体配置、组织策略和平台实现可能不同。
- **项目含义：** 任务卡应分别写“允许触碰的资源边界”和“必须停下来确认的动作”，不要只写一个模糊的“有权限”。
- **易变事实：** permission mode 名称、配置键、默认值、平台支持和审批流程可能变化；正文应以当前官方页面为准。

### OF-02：默认姿态与最小权限

- **官方断言（改写）：** OpenAI 文档称本地 Codex 默认关闭网络，并用 OS 强制的 sandbox 限制通常到当前工作区的访问；官方给出的低风险本地自动化组合是 `workspace-write` 加 `on-request`，并建议选择能完成任务的最窄 profile。文档同时列出 `read-only`、`workspace-write` 和 `danger-full-access` 等不同边界。
- **来源：** OpenAI，*Agent approvals & security*，<https://learn.chatgpt.com/docs/agent-approvals-security.md>；OpenAI，*Sandbox*，<https://learn.chatgpt.com/docs/sandboxing.md>
- **来源拥有者：** OpenAI / ChatGPT Learn
- **访问日期：** 2026-08-10
- **适用范围：** 本地 Codex CLI、IDE extension 和 ChatGPT desktop app；Codex cloud 使用隔离的 OpenAI 管理容器，不能直接套用本地边界。
- **项目含义：** Chapter 2 的最小任务优先使用只读检查或工作区内写入；网络、工作区外路径、敏感脚本和外部服务应成为显式确认点。
- **易变事实：** 默认权限、平台 sandbox 实现、网络配置和管理策略属于易变产品事实。

### OF-03：审批不会扩大 sandbox

- **官方断言（改写）：** OpenAI 明确说明，改变谁来 review 请求不会扩大 sandbox；例如 `Approve for me` 与 `Ask for approval` 可以保持相同工作区边界，前者只是把越界请求交给自动 review。文档还说明，默认自动 review 的失败会 fail closed，动作不会运行。
- **来源：** OpenAI，*Permissions*，<https://learn.chatgpt.com/docs/permission-modes.md>；OpenAI，*Agent approvals & security*，<https://learn.chatgpt.com/docs/agent-approvals-security.md>；OpenAI，*Auto-review*，<https://learn.chatgpt.com/docs/sandboxing/auto-review.md>
- **来源拥有者：** OpenAI / ChatGPT Learn
- **访问日期：** 2026-08-10
- **适用范围：** OpenAI 文档说明的本地权限模式和自动 review 流程；组织托管策略可能进一步收紧边界。
- **项目含义：** “审批通过”只证明某个已提出动作获得了相应 review，不证明获得了未声明的全盘、网络、认证或生产权限。
- **易变事实：** 自动 review 的状态、策略分类、配置优先级和可用模式可能随产品更新。

### OF-04：Codex CLI 的检查、checkpoint 与 review

- **官方断言（改写）：** Codex CLI 官方文档将 CLI 描述为可 inspect files、make changes、run commands，并建议任务前后创建 Git checkpoint 以便 revert changes。官方 Code Review 文档说明可 review 未提交变更、指定提交或分支差异，并报告有优先级的发现而不修改工作树。
- **来源：** OpenAI，*Codex CLI*，<https://learn.chatgpt.com/docs/codex/cli.md>；OpenAI，*Code review*，<https://learn.chatgpt.com/docs/code-review.md>
- **来源拥有者：** OpenAI / ChatGPT Learn
- **访问日期：** 2026-08-10
- **适用范围：** Codex CLI；Code Review 页面还覆盖 ChatGPT desktop app、IDE extension 和 ChatGPT Work 的相应入口。
- **项目含义：** 推荐的 Chapter 2 操作卡可以记录：任务前基线、允许文件、最小编辑、任务后 diff、验证命令和失败处理。
- **易变事实：** CLI 安装方式、命令入口、review scope、界面名称和支持的 surface 可能变化。
- **未证实项：** 官方文档没有证明每次 Codex 任务都会自动创建 checkpoint，也没有证明 checkpoint 一定是 commit、stash 或其他具体 Git 对象；学习实验必须记录实际创建的对象和命令输出。

### OF-05：先查看变更再决定是否接受

- **官方断言（改写）：** Codex Code Review 文档说明 review pane 反映 Git 仓库当前状态，可能包含 Codex、用户和其他未提交变更；可按 unstaged、staged、commit、branch 或 last turn 选择范围，并可按文件或 hunk stage、unstage、revert。
- **来源：** OpenAI，*Code review*，<https://learn.chatgpt.com/docs/code-review.md>
- **来源拥有者：** OpenAI / ChatGPT Learn
- **访问日期：** 2026-08-10
- **适用范围：** 文档描述的 Codex review pane 与 Git 仓库；具体 UI 可用性依赖客户端和项目是否处于 Git 仓库内。
- **项目含义：** 验收不应只看 Agent 的摘要；应明确 review scope，并确认差异中没有越界文件、意外生成物或不相关用户改动。
- **易变事实：** review pane 的入口、scope 名称和多仓库支持可能变化。
- **未证实项：** Review 发现本身不是测试通过、运行成功或生产安全的证明；仍需任务适用的实际验证。

### OF-06：失败时不扩大权限

- **官方断言（改写）：** OpenAI 文档建议保持项目边界、选择最窄 approval scope，并把工作区、网络、connector、MCP、browser、computer-use 和 cloud 的控制分开看待。自动 review 只处理本来就需要审批的动作；review 或解析失败时动作不会运行。文档还警告 full access 会移除文件系统和网络边界。
- **来源：** OpenAI，*Sandbox*，<https://learn.chatgpt.com/docs/sandboxing.md>；OpenAI，*Agent approvals & security*，<https://learn.chatgpt.com/docs/agent-approvals-security.md>
- **来源拥有者：** OpenAI / ChatGPT Learn
- **访问日期：** 2026-08-10
- **适用范围：** OpenAI 本地 Codex 权限与 sandbox 文档；外部系统仍有各自的认证、授权和副作用控制。
- **项目含义：** 失败处理顺序应是：保存错误与当前状态 → 判断失败属于输入、命令、权限、网络、依赖还是验证 → 只请求解决该阻塞所需的最小范围 → 重新检查 → 再行动。
- **易变事实：** approval scope、自动 review 触发类别、full-access 选项和组织策略可能变化。
- **未证实项：** 官方文档没有保证任何具体命令失败后都能安全重试，也没有保证扩大某一权限即可修复失败；这必须由具体错误和最小复现实验证明。

## 3. Git 官方证据卡

### GIT-01：先检查工作树状态

- **官方断言（改写）：** Git `status` 显示 index 与 HEAD、工作树与 index 之间的差异，以及未跟踪且未被 `.gitignore` 忽略的路径；`--porcelain` 提供适合脚本解析的稳定格式。
- **来源：** Git 项目，*git-status Documentation*，<https://git-scm.com/docs/git-status>
- **来源拥有者：** Git project / git-scm.com
- **访问日期：** 2026-08-10
- **适用范围：** Git 工作树；状态结果取决于当前仓库、index、HEAD 和 ignore 配置。
- **项目含义：** 编辑前后都应运行状态检查；对于共享工作树，必须先识别已有变更，避免把它们误归因于本次任务。
- **易变事实：** 文档版本、输出细节和性能选项随 Git 版本变化；脚本应使用官方建议的稳定格式并在目标版本验证。

### GIT-02：diff 定位实际变更

- **官方断言（改写）：** Git `diff` 可比较工作树与 index、index 与 tree、两个提交、合并结果或磁盘上的两个文件；普通 `git diff` 查看相对 index 的工作树变更，`git diff --cached` 查看相对提交的已暂存变更。`--check` 可检查冲突标记和空白错误，并在发现问题时返回非零状态。
- **来源：** Git 项目，*git-diff Documentation*，<https://git-scm.com/docs/git-diff>
- **来源拥有者：** Git project / git-scm.com
- **访问日期：** 2026-08-10
- **适用范围：** Git 版本所支持的 diff 语义；选定比较对象决定证据范围。
- **项目含义：** 交付证据至少应写明比较对象和路径范围，例如工作树对 index、工作树对 HEAD 或目标分支对 merge-base；不能只贴“有改动”一句摘要。
- **易变事实：** 选项、输出格式和版本行为可能变化。
- **未证实项：** diff 只能证明文本/树对象之间的差异，不能单独证明运行时行为、测试覆盖、外部服务状态或用户验收。

### GIT-03：选择有边界的恢复动作

- **官方断言（改写）：** Git `restore` 可从指定 restore source 恢复路径到工作树、index 或二者；可用 `--patch` 交互选择 hunks，也可以从指定提交恢复。Git `revert` 会把已有提交引入的变更反向应用，并记录新的提交；它要求工作树相对 HEAD 干净。官方文档明确区分了 `restore`、`revert` 和会丢弃未提交变更的其他命令。
- **来源：** Git 项目，*git-restore Documentation*，<https://git-scm.com/docs/git-restore>；Git 项目，*git-revert Documentation*，<https://git-scm.com/docs/git-revert>
- **来源拥有者：** Git project / git-scm.com
- **访问日期：** 2026-08-10
- **适用范围：** Git 工作树和提交历史；具体恢复目标必须由执行者明确指定。
- **项目含义：** 小范围未提交误改优先考虑明确路径或 hunk 的恢复；已提交变更通常需要审查后用 `revert` 形成可追踪的反向提交。任何恢复前仍要保存并审查当前状态。
- **易变事实：** Git 命令选项和文档版本可能变化。
- **未证实项：** “哪一种恢复方式最安全”取决于是否已有用户改动、是否已提交、是否有合并冲突和是否共享工作树；官方命令定义不能替代现场判断。

## 4. Chapter 2 可采用的原创任务协议

以下是基于上述官方事实的项目转译，不是 OpenAI 或 Git 的原文规范：

```text
定义：目标、允许路径、禁止动作、外部副作用、验收标准
检查：确认工作区/仓库身份、现有状态、相关文件和当前权限
确认：遇到工作区外路径、网络、认证、生产系统或破坏性动作时暂停
编辑：只做最小范围的可解释变更
差异：检查 status、diff、文件范围、意外文件、冲突标记和空白错误
验证：运行与任务直接相关的测试/检查，记录命令、结果和范围
回滚：根据未提交/已提交和路径/hunk/提交语义选择 restore 或 revert
失败：保留证据，缩小问题，不把失败当作扩大权限的理由
交付：区分已观察、已验证、未验证和需要用户确认的事项
```

### 最小验收清单

- [ ] 任务目标和允许路径已写明。
- [ ] 编辑前的 `git status` 或等价基线已记录；已有用户改动没有被覆盖或冒认。
- [ ] 权限边界与确认点已写明，尤其是网络、工作区外路径、认证和外部副作用。
- [ ] 变更后已检查与目标相符的 diff；已确认文件范围和未跟踪文件。
- [ ] 已运行与任务相称的验证，并记录真实输出或明确写 `未运行`。
- [ ] 失败时没有自动切换到 full access；任何新权限都有明确理由、窄范围和用户确认。
- [ ] 回滚方案能区分未提交路径/hunk 与已提交变更，并承认恢复可能丢弃内容。
- [ ] 交付摘要没有把“Agent 说完成”当成运行、来源或验收证据。

## 5. 未证实项与边界

- 本研究没有在任何 Codex 客户端、账户、组织策略或真实项目运行任务，因此没有证明当前机器的有效 sandbox、网络开关、审批配置、Git 状态或认证权限。
- OpenAI 官方页面说明了产品层边界，但不能证明某个 connector、MCP server、browser、插件或外部服务的实际授权；这些系统有独立控制面。
- Git 官方文档证明命令的语义，不证明某个 Agent 会自动调用它们，也不证明某次 `restore`、`revert` 或测试会成功。
- 本记录没有验证当前仓库 Chapter 2 章节、实验、Skill 或页面已经满足这些标准；它只提供官方基线。
- 没有把用户报告、社区帖子、第三方 Skill、项目现有经验或模型记忆当作本轮官方事实证据。

## 6. 来源、许可与复核登记

本记录仅链接并改写官方文档中的短事实，不复制长段落、代码样例、图片或 token。OpenAI/Codex 官方资料的再使用边界应以其页面条款为准；Git 文档页面由 Git project 发布，具体许可和页面版本仍应在发行前复核。本轮没有把任何外部内容作为项目资产纳入，也没有修改 `docs/sources/asset-register.md`。

| 来源 | 拥有者 | 访问日期 | 适用范围 | 易变事实 | 下次复核建议 |
|---|---|---:|---|---|---|
| <https://learn.chatgpt.com/docs/agent-approvals-security.md> | OpenAI / ChatGPT Learn | 2026-08-10 | 本地 Codex sandbox、审批、网络和自动 review 边界 | 默认值、模式、配置、平台实现、策略 | 产品权限或安全文档变化时，最迟 30 天内 |
| <https://learn.chatgpt.com/docs/permission-modes.md> | OpenAI / ChatGPT Learn | 2026-08-10 | ChatGPT desktop、Codex CLI、IDE 的权限模式 | 模式名称、入口、组织可用性 | 权限 UI 或配置变化时 |
| <https://learn.chatgpt.com/docs/sandboxing.md> | OpenAI / ChatGPT Learn | 2026-08-10 | sandbox 与 approval 的跨客户端说明 | 平台实现、默认 profile、边界 | 客户端升级或平台变化时 |
| <https://learn.chatgpt.com/docs/sandboxing/auto-review.md> | OpenAI / ChatGPT Learn | 2026-08-10 | 审批自动 review 与 fail-closed 语义 | 风险分类、审核生命周期、配置优先级 | 自动 review 行为变化时 |
| <https://learn.chatgpt.com/docs/codex/cli.md> | OpenAI / ChatGPT Learn | 2026-08-10 | Codex CLI 的 inspect/edit/run、checkpoint 和 review 入口 | CLI 命令、安装、功能范围 | CLI 发布或文档更新时 |
| <https://learn.chatgpt.com/docs/code-review.md> | OpenAI / ChatGPT Learn | 2026-08-10 | Git 变更 review、diff scope、按文件/hunk 处理 | UI、scope、客户端支持 | review 功能变化时 |
| <https://git-scm.com/docs/git-status> | Git project | 2026-08-10 | Git 状态和脚本可解析输出 | 版本、输出和性能选项 | Git 大版本或目标运行环境变化时 |
| <https://git-scm.com/docs/git-diff> | Git project | 2026-08-10 | Git 差异比较与 `--check` | 选项和输出格式 | Git 大版本或 CI 检查变化时 |
| <https://git-scm.com/docs/git-restore> | Git project | 2026-08-10 | 未提交路径/index 的恢复 | 选项和恢复语义细节 | Git 大版本或恢复流程变化时 |
| <https://git-scm.com/docs/git-revert> | Git project | 2026-08-10 | 已提交变更的反向提交 | 选项和冲突处理细节 | Git 大版本或发布流程变化时 |

**维护 owner（项目内）：** facts-maintainer（待项目正式指派）；在指派前，本文件不应被标记为 `verified` 或 `production-ready`。
**本轮研究状态：** `candidate`；来源页面已在 2026-08-10 访问，项目章节与实验的运行验证仍未完成。
