# Codex / Claude Code / AI coding agent 真实问题研究波次（2026-08-10）

**交付状态：** `candidate`

**研究目标：** 补充上一轮 `field-problems-*.md` 未覆盖的真实用户故障，重点观察上下文连续性、工作区与 Worktree 隔离、审批与沙箱边界、子 Agent 交接和 prompt injection。本文只写入公开可访问来源的原创中文摘要，不复制长段文字、代码、截图、日志、凭据、反馈 ID 或私密本地路径。

## 研究方法与证据边界

本波次在 2026-08-10 访问了公开的 GitHub Issues 页面/API，并核对了当前可访问的官方文档。GitHub Issue 的正文是用户报告；Issue 的 `open`/`closed` 状态只是页面状态，不代表根因已确认、问题已修复或所有用户都可用。自动去重机器人评论也不算维护者确认。

每条记录分开保存四类事实：

- **用户报告：** 报告者描述的环境、症状、预期和观察到的结果。
- **社区推测/建议：** 报告者或社区参与者提出的根因、设计方案或 workaround；除非另有证据，不视为产品事实。
- **官方事实/解释：** 官方文档或官方参与者在公开 Issue 中明确说过的范围；没有 Issue-specific 官方解释时明确写“未发现”。
- **本地复现：** 本项目本轮没有运行 Codex/Claude Code、Cloud task、外部 Provider 或公开 Issue 中的危险复现步骤，因此所有记录均为“本项目未复现”。

本轮没有把以下内容作为新增证据：已有 `field-problems-codex.md`、`field-problems-forums-2026-08-10.md`、`field-problems-surface-2026-08-10.md`、`field-problems-follow-up-2026-08-10.md` 和 `field-problems-follow-up-2026-08-10-p2.md` 中已经记录的认证、MCP OAuth、网络 allowlist、Windows linked Worktree、目录 roots、Cloud setup/Secret、Computer Use 和自定义 Provider 案例。

## 官方资料边界

截至访问日，以下官方资料可访问，但它们只定义产品文档所描述的预期能力边界，不证明本文件任何 Issue 的根因或修复状态：

- [OpenAI Codex permissions](https://learn.chatgpt.com/docs/permissions)：说明权限 profiles、workspace roots、文件系统/网络规则以及旧 sandbox 配置之间的配置边界；页面标注为 Beta/可能变化。
- [OpenAI Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)：说明本地 sandbox 与 approval policy 的分工、默认网络限制、Cloud 的 setup/agent 两阶段，以及 Cloud Secret 只在 setup 阶段可用的文档边界。
- [OpenAI Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)：说明原生 Windows sandbox 的 elevated/unelevated 模式和文件系统/网络边界；不说明每个 Issue 的具体失败原因。
- [OpenAI Codex CLI](https://learn.chatgpt.com/docs/codex/cli)：说明 CLI 的权限控制、resume、subagents 等入口；没有对自动压缩后任务指针、跨会话 cwd 或分支绑定作出本波次所需的逐 Issue 保证。
- [Anthropic Configure permissions](https://code.claude.com/docs/en/permissions)：说明 `deny`、`ask`、`allow` 的权限系统与顺序、`/permissions` 查看方式和 Agent 隔离参数；不证明当前 Issue 的实现始终符合文档。
- [Anthropic Security](https://code.claude.com/docs/en/security)：说明默认只读权限、工作目录边界、sandbox、网络请求审批和命令注入检测等安全设计；不等于已验证所有间接执行路径都被拦截。
- [Anthropic Create custom subagents](https://code.claude.com/docs/en/sub-agents)：说明子 Agent 有独立上下文、工具范围和权限模型，并描述部分内置 Agent 的继承关系；不说明嵌套项目 settings 的 sandbox 合并实现。

## 新增问题总览

| ID | 平台/主题 | 公开来源 | 版本/日期 | 证据状态 |
|---|---|---|---|---|
| W26-01 | Codex 自动压缩后任务指针丢失 | [openai/codex #36712](https://github.com/openai/codex/issues/36712) | CLI 0.146.0；2026-08-03 | 用户报告；未本地复现 |
| W26-02 | Codex 压缩后回复旧消息 | [openai/codex #34862](https://github.com/openai/codex/issues/34862) | CLI 0.145.0；2026-07-23 | 用户报告；未本地复现 |
| W26-03 | Codex 限流/恢复后任务意图漂移 | [openai/codex #8310](https://github.com/openai/codex/issues/8310) | 版本未提供；2025-12-19 | 用户报告；有官方参与者范围解释，未确认修复 |
| W26-04 | Codex 并发会话跨项目泄漏工作区 | [openai/codex #24224](https://github.com/openai/codex/issues/24224) | Desktop 26.519.22136；2026-05-23 | 用户报告；未本地复现 |
| W26-05 | Codex 子 Agent 共享 checkout 分支漂移 | [openai/codex #31572](https://github.com/openai/codex/issues/31572) | Desktop 版本未提供；2026-07-08 | 用户报告；未本地复现 |
| W26-06 | Codex 临时运行副本未清理 | [openai/codex #35383](https://github.com/openai/codex/issues/35383) | CLI 0.145.0 / Desktop；2026-07-25 | 用户报告；未本地复现 |
| W26-07 | Claude Code `permissions.ask` 显示但不触发 | [anthropics/claude-code #81041](https://github.com/anthropics/claude-code/issues/81041) | 2.1.219；2026-07-25 | 用户报告；未本地复现 |
| W26-08 | Claude Code `Read` 忽略活动 deny | [anthropics/claude-code #84634](https://github.com/anthropics/claude-code/issues/84634) | 2.1.223；2026-08-06 | 用户报告；未本地复现 |
| W26-09 | Claude Code 嵌套项目丢失父级 sandbox | [anthropics/claude-code #83035](https://github.com/anthropics/claude-code/issues/83035) | 2.1.220；2026-08-01 | 用户报告；未本地复现 |
| W26-10 | Claude Code sandbox 网络 allowlist 疑似 fail-open | [anthropics/claude-code #81572](https://github.com/anthropics/claude-code/issues/81572) | 2.1.212；2026-07-27 | 用户报告；未本地复现 |
| W26-11 | Claude Code 脚本间接执行绕过表面审批 | [anthropics/claude-code #85274](https://github.com/anthropics/claude-code/issues/85274) | 版本未提供；2026-08-09 | 用户报告；未本地复现 |
| W26-12 | Claude Code 子 Agent 结果通道出现注入形状输出 | [anthropics/claude-code #81784](https://github.com/anthropics/claude-code/issues/81784) | 2.1.212；2026-07-27 | 用户报告；社区建议；未本地复现 |

## A. 上下文、恢复与长任务连续性

### W26-01：自动上下文压缩后丢失当前任务

- **source_url：** https://github.com/openai/codex/issues/36712
- **title：** Automatic context compaction destroys context
- **date：** Issue 创建于 2026-08-03；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Codex CLI；Windows Terminal 中的 WSL2/Linux；报告者提交的 doctor 信息显示 Ubuntu/WSL2 环境。
- **version：** Codex CLI 0.146.0；模型为报告者所列的 gpt-5.6-sol（max）。
- **symptom：** 长任务触发自动压缩后，Agent 不再知道当前任务，回复类似重新询问“要做什么”；报告者要求它读取未压缩历史并继续也没有恢复，随后不得不开新会话重述任务。报告者称同一任务曾多次消耗时间和 token 后回到相同断点。
- **expected：** 自动压缩只改变上下文表示，不应丢失用户目标、计划进度、最近完成的动作和下一步；恢复后应继续原任务。
- **observed：** 报告者观察到任务指针回到空白或无关状态，并可能重新设计已经足够的实现；具体触发条件是大任务、Plan Mode 后执行、等待自动压缩。
- **user_report_vs_official_explanation：**
  - **用户报告：** 报告者给出了版本、WSL 平台、触发方式和结果；Issue 没有提供本项目可独立验证的会话数据。
  - **社区推测：** 当前 Issue 的唯一评论是 GitHub 自动去重机器人，没有可采纳的社区根因解释。
  - **官方事实/解释：** OpenAI CLI 文档说明 CLI 有 resume 和 context 相关入口，但没有在该 Issue 上确认自动压缩的内部实现、任务指针存储方式或修复版本。未发现维护者对该 Issue 给出根因确认。
- **reproduction：** 报告者的最小描述是：准备大型多步骤任务，使用计划模式执行，持续工作直到自动压缩；压缩后观察是否仍能准确复述当前任务并继续。本项目没有执行该流程，也没有上传或读取报告者会话。
- **safe diagnostic：** 在长任务开始前，把原始目标、验收条件、已完成文件和下一步写入用户可审阅的短检查点；压缩/恢复后先做只读状态回显，核对 Git diff、文件存在性、测试最后一次结果和当前计划，再允许写入。不要读取或复制未公开的会话历史，不在恢复失败时自动重写大范围文件。
- **stop condition：** 恢复后出现“重新询问任务”、引用旧目标、否认已完成动作、无依据地重做大量改动，或任务检查点与工作树不一致时，停止 Agent 写入和外部调用；保存当前 diff/日志，改用新会话携带人工核对过的检查点。
- **本项目本地复现：** 未复现；本轮未运行 Codex CLI，也没有等待自动压缩。

### W26-02：压缩后模型回复旧消息

- **source_url：** https://github.com/openai/codex/issues/34862
- **title：** After compacting context, model replies to old messages
- **date：** Issue 创建于 2026-07-23；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Codex CLI；Windows；`cmd` 终端。
- **version：** Codex CLI 0.145.0；报告者列出 Terra medium 模型。
- **symptom：** 上下文压缩后，模型回复旧消息，报告者推测它重新读取压缩内容时把旧任务当成当前任务。
- **expected：** 压缩后应以最近的用户消息、当前任务指针和可验证工作树为准；不应将已被新消息取代的旧请求当作当前指令。
- **observed：** 报告者只提供了现象和一个上传的线程引用，没有在公开正文中给出完整复现日志；评论中另有用户称在 macOS 也遇到类似行为，但这不改变原 Issue 的平台信息。
- **user_report_vs_official_explanation：**
  - **用户报告：** 现象、CLI 版本、Windows/cmd 平台和线程引用来自报告者。
  - **社区推测：** “重新读取压缩内容导致旧消息优先”是报告者的推测，不是实现证据；自动去重评论也不是官方确认。
  - **官方事实/解释：** OpenAI CLI 文档说明有恢复和上下文管理入口，但未说明压缩摘要的优先级，也未确认此 Issue 的根因或修复。
- **reproduction：** 报告者给出的路径是：在 CLI 中持续发送前后有明确变化的消息，等待自动压缩，然后检查模型是否回答旧请求。原线程附件未作为本项目输入复现。
- **safe diagnostic：** 只发送一个无副作用的“当前任务身份检查”请求，让 Agent 回答最近用户目标、最近完成的文件和下一步；人工将答案与外部检查点、Git 状态逐项对齐。不要让它为了证明自己正确而运行写入、安装、删除或网络命令。
- **stop condition：** 任何一项任务身份、最近消息或工作树状态答错，立即将会话标为 `unverified`/`blocked`；不继续追加提示词让模型猜测，也不接受“我大概记得”的恢复结果作为事实。
- **本项目本地复现：** 未复现；未读取 Issue 附件或运行 Windows CLI。

### W26-03：限流后恢复会话丢失任务意图并继续错误上下文

- **source_url：** https://github.com/openai/codex/issues/8310
- **title：** Bug report: Session resume after rate limit loses task intent and continues on wrong context
- **date：** Issue 创建于 2025-12-19；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Codex/Agent 的 CLI-style resume 流程；报告者没有提供完整客户端版本；移动/远程复现由后续评论补充，但不作为原环境替代。
- **version：** 原 Issue 未提供客户端版本；公开正文提到恢复后观察到 gpt-5.2-codex xhigh。版本和模型不能外推到当前所有 Codex 入口。
- **symptom：** 长任务遭遇 usage limit 后恢复，Agent 丢失最近任务意图，回到较早上下文、重复已经完成的步骤，或继续不相关工作；报告者把限流边界与自动压缩同时视为可能触发因素。
- **expected：** 恢复应保留最后一条用户指令、计划状态、已交付文件和下一步；限流只应暂停，不应改变任务语义。
- **observed：** 报告者记录了恢复后任务指针回退和重复工作。后续公开讨论指出一次案例中在限流前出现了自动压缩、模型切换和 CLI 更新，但这些因素之间的因果关系没有被独立确认。
- **user_report_vs_official_explanation：**
  - **用户报告：** 原报告和后续评论均为用户叙述，不等于服务器端诊断。
  - **社区推测：** 社区参与者提出可持久化 task/plan/recent artifacts 的 checkpoint 设计；这是工程建议，不是 Codex 已有实现或官方承诺。
  - **官方事实/解释：** 一名 OpenAI 参与者公开表示，若发生了 compaction，它可以解释观察到的行为；其后又表示没有充分理由把 rate-limit 本身视为因果，compaction 消耗 token 可能只是相关因素。这是公开范围解释，不是该 Issue 的修复确认，也没有确认 checkpoint 设计已实现。
- **reproduction：** 报告者路径是：启动多步骤会话，生成或修改文档，要求继续执行验证，触发 usage limit，稍后恢复并发送 continue，观察任务是否回到旧步骤。本项目没有触发限流、切换账号或恢复外部会话。
- **safe diagnostic：** 在恢复前后分别保存最后用户指令、模型/客户端版本、是否出现 `Context compacted`、工作树 diff、最后一次无副作用检查点；恢复后先比较这些事实，不要立即重跑可能重复发布、提交、外部 API 或迁移的步骤。一次只改变“恢复入口/模型/版本”中的一个变量。
- **stop condition：** 恢复后任务指针、最近消息或已完成制品任一项回退，或限流后线程没有明确 resume 状态时，停止继续执行；先人工确认是否已有文件、提交、外部请求或发布副作用。
- **本项目本地复现：** 未复现；仅核对了公开 Issue 和评论，没有调用真实账户或执行外部 Provider 请求。

## B. 工作区、共享 checkout 与临时副本

### W26-04：并发会话跨项目泄漏 workspace root、cwd 与工具范围

- **source_url：** https://github.com/openai/codex/issues/24224
- **title：** Concurrent Sessions Leak Workspace Root Across Projects
- **date：** Issue 创建于 2026-05-23；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Codex Desktop；macOS Darwin 24.6.0 arm64；多个项目和长任务并发。
- **version：** Desktop 26.519.22136（报告者列出的 About Codex 版本）。
- **symptom：** 在项目 A 的长任务运行时切换到项目 B，新会话可能继承项目 A 的项目根目录、cwd、仓库上下文、文件索引、AGENTS/SKILLS 和工具执行范围，导致相对路径或命令指向错误项目。
- **expected：** 每个会话应独立绑定 project root、cwd、仓库上下文、指令文件、索引和工具范围；项目 B 不应引用或修改项目 A。
- **observed：** 报告者称问题间歇出现，在多个活动聊天、快速切换和后台并行时更容易触发；报告者把潜在结果描述为错误仓库编辑、错误提交和跨项目污染。
- **user_report_vs_official_explanation：**
  - **用户报告：** 公开 Issue 给出了并发切换场景和预期/影响，但没有本项目可复核的完整事件日志。
  - **社区推测：** 报告者猜测是全局 active workspace、共享 cwd 缓存或会话外的仓库元数据；这些只是可能实现，不是根因。
  - **官方事实/解释：** OpenAI 权限文档说明 workspace roots 是权限边界的一部分；未发现官方文档或维护者对该并发会话泄漏 Issue 给出解释或修复版本。
- **reproduction：** 报告者路径是：并行打开项目 A/B，保持 A 长任务运行，快速在 B 创建新会话，观察路径、指令文件和 shell 工作目录。本项目没有打开两个真实 Codex 项目或执行跨项目写入。
- **safe diagnostic：** 新会话的第一步只读记录会话元数据中的 project root、Agent shell cwd、终端当前目录、Git 仓库根和实际加载的项目指令文件；用两个项目各自的无敏感标识文件做读取对照，不创建或修改文件。
- **stop condition：** UI 项目名、shell cwd、workspace root、Git 根目录或加载的指令文件任一不一致时，停止所有写入、测试、构建和提交；不要通过“复制改动回正确项目”来掩盖所有权未明的问题。
- **本项目本地复现：** 未复现；没有运行 Codex Desktop，也没有在两个项目间执行工具调用。

### W26-05：子 Agent 在共享 checkout 中看到错误分支并导致分支漂移

- **source_url：** https://github.com/openai/codex/issues/31572
- **title：** Codex Desktop subagents can drift across Git branches in a shared workspace
- **date：** Issue 创建于 2026-07-08；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Codex Desktop 多 Agent/subagent；普通本地 Git checkout，而不是隔离的 detached worktree；报告者描述两个任务分支共享同一 checkout。
- **version：** 报告者没有提供 Desktop 版本。
- **symptom：** 父 Agent 已确认切到目标分支，子 Agent 只读检查却看到另一分支；父 Agent 再次切换后，原子 Agent 仍看到旧分支，之后父 shell 也观察到分支再次漂移。报告者因此中止任务并清理临时分支。
- **expected：** 子 Agent 应在 dispatch 时绑定父 Agent 当前的 cwd/worktree/branch，或获得隔离 worktree；如果共享 checkout 的分支状态不稳定，应在任何写入前硬阻塞并显示冲突。
- **observed：** 报告者称 branch readback 在父子 Agent 间不一致，可能导致错误分支上的编辑、测试、清理或提交。
- **user_report_vs_official_explanation：**
  - **用户报告：** Issue 给出了 `spawn_agent`、`send_input`、`wait_agent` 等流程的摘要和只读分支检查；真实仓库名、路径和分支名已由报告者省略。
  - **社区推测：** “共享 checkout 导致分支状态不稳定”是基于观察的解释；也可能涉及 Agent cwd 绑定或并发调度，Issue 未证明内部机制。
  - **官方事实/解释：** OpenAI CLI 文档说明可使用 subagents，但未对共享 checkout 的 branch binding 或隔离保证作出本波次所需的具体承诺；未发现维护者解释或修复确认。
- **reproduction：** 报告者路径是：同一 checkout 准备两个带未提交改动的本地分支，父 Agent 切到分支 B，创建子 Agent 先执行只读 `git` 分支/状态检查，比较父子结果，再观察后续漂移。本项目没有切换或并发操作用户仓库分支。
- **safe diagnostic：** 只读核对父/子 Agent 的 `cwd`、worktree 根、当前分支、`git status --short --branch` 和 HEAD；不要让任何 Agent 在核对前执行 `git switch`、reset、clean、合并或写文件。优先使用真正隔离的 worktree，并为每个 Agent 保存分支/HEAD 检查点。
- **stop condition：** 父子 Agent 的分支、HEAD、worktree 根或工作树状态任一不一致时，立即停止子 Agent；不要自动切分支或清理文件，先由人工确认哪个 checkout 是目标。
- **本项目本地复现：** 未复现；没有对当前工作区执行分支切换或子 Agent 操作。

### W26-06：临时运行副本未清理，保留数量和注册表不一致

- **source_url：** https://github.com/openai/codex/issues/35383
- **title：** Worktree/temp-clone lifecycle broken: auto-delete and worktree-keep-count not enforced; managed-worktree list reports zero while multi-GB run copies accumulate
- **date：** Issue 创建于 2026-07-25；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Codex Desktop 与 CLI 的多会话/多 Agent 编排；macOS 26.5.1 arm64；报告者使用大型本地仓库。
- **version：** Codex CLI 0.145.0；Desktop Sparkle build 4505；配置中报告者设置了 `worktree-keep-count`。
- **symptom：** 报告者称多天运行后积累了 118 个完整仓库副本、合计约 202 GB；Codex 管理的 worktree 列表显示为零，keep-count 没有可观察效果，`git worktree list` 也看不到大多数普通目录副本，磁盘空间接近耗尽。
- **expected：** 启用自动删除后旧副本应按 keep-count 清理；UI/CLI 应准确列出实际占用磁盘的副本，并提供可审计的 prune 入口。
- **observed：** 报告者通过磁盘占用、目录计数、Codex 状态文件和 Git 列表对照，发现注册表、Git 可见 worktree 与实际临时目录不一致；随后手动清理。
- **user_report_vs_official_explanation：**
  - **用户报告：** 数量、容量、版本和配置均来自报告者的公开测量；本文件不复制其具体目录路径或 shell 输出。
  - **社区推测：** 报告者推断运行副本可能是未注册的 temp clone，生命周期管理和 UI 开关持久化存在缺口；该推断未由维护者确认。
  - **官方事实/解释：** 本轮查到的 OpenAI 文档说明了 worktree/工作区相关边界，但没有对该 Issue 的临时副本清理、keep-count 或 CLI prune 行为给出解释或修复版本。
- **reproduction：** 报告者路径是：在大型仓库中启动多次多 Agent/多会话运行，启用自动清理和 keep-count，随后比较 UI/配置、Codex 注册表、`git worktree list` 和磁盘目录。本项目没有创建大量副本，也没有执行清理。
- **safe diagnostic：** 先做只读库存：记录精确目标仓库、活跃任务、Codex 可见 worktree、Git worktree 列表和临时目录的数量/大小；设置磁盘余量阈值并停止继续派生任务。不要以宽泛 glob 或 `rm -rf` 猜测清理目标，保留 manifest、日志和 HEAD 证据后再由人按精确路径处理。
- **stop condition：** 注册表数量与磁盘目录数量不一致、磁盘余量低于预设阈值、目录归属不明或活跃任务仍引用副本时，停止创建新 Agent 和自动清理；不把“UI 显示零”当成磁盘已清空。
- **本项目本地复现：** 未复现；没有创建临时 clone/worktree，也没有删除任何目录。

## C. Claude Code 权限、沙箱与审批边界

### W26-07：`permissions.ask` 规则在界面显示但不触发审批

- **source_url：** https://github.com/anthropics/claude-code/issues/81041
- **title：** `permissions.ask` rules are loaded and displayed in `/permissions` but never enforced
- **date：** Issue 创建于 2026-07-25；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Claude Code CLI；macOS Darwin 25.5.0。
- **version：** Claude Code 2.1.219。
- **symptom：** `permissions.ask` 规则出现在 `/permissions` 的 Ask 列表中，界面文字表示匹配工具会要求确认，但匹配的 Bash 命令直接执行，不出现 prompt；报告者称同一设置中的 deny 规则和退出码为 2 的 PreToolUse hook 可以工作。
- **expected：** Ask 规则匹配时应在命令执行前暂停并要求人工确认；显示“已加载”不应等于“已执行”，更不应静默失效。
- **observed：** 报告者使用无害的合成命令探针，比较 deny、ask、hook 和 allow 冲突情况；Ask 规则仍显示存在但没有询问。
- **user_report_vs_official_explanation：**
  - **用户报告：** 报告者提供了版本、平台、配置类别、规则热加载和无害探针的对照结果；没有复制具体配置或反馈 ID。
  - **社区推测：** 未发现有实质内容的社区根因讨论；Issue 没有维护者解释。
  - **官方事实/解释：** Anthropic 权限文档定义 Ask 为需要审批的权限层，并说明 `/permissions` 可查看规则；文档没有确认该 Issue 的实现为何没有触发，也没有提供修复版本。
- **reproduction：** 报告者的安全路径是：在隔离项目配置一个只会输出固定文本的 Ask 规则，确认 `/permissions` 显示该规则，再请求执行该固定文本命令，观察是否出现 prompt。不得用删除、远程 shell、生产数据库或真实凭据测试。
- **safe diagnostic：** 只使用固定文本的无副作用探针，分别记录规则来源、permission mode、UI 显示和实际是否暂停；同时用 deny 探针确认“规则可见”和“规则生效”是两件事。不要为测试而放宽全局权限或进入 bypass 模式。
- **stop condition：** UI 显示 Ask 规则但合成命令直接执行，或 hook/权限模式状态无法解释时，停止依赖该 Ask 规则保护危险动作；改为 deny、隔离容器/虚拟机和人工复核，并将会话标为 `blocked`。
- **本项目本地复现：** 未复现；没有安装或运行 Claude Code，也没有修改任何权限配置。

### W26-08：`Read` 忽略活动 `permissions.deny`，而 Bash sandbox 阻断同一路径

- **source_url：** https://github.com/anthropics/claude-code/issues/84634
- **title：** `Read` tool ignores active `permissions.deny` rules while Bash enforces the equivalent sandbox restriction
- **date：** Issue 创建于 2026-08-06；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Claude Code CLI；Linux Fedora 系环境；项目有 `.claude/settings.json`，sandbox 允许路径被限制到项目目录。
- **version：** Claude Code 2.1.223。
- **symptom：** `/permissions` 显示活动的 `Read` deny 规则，但报告者称 Read 仍能读取匹配路径；同一路径通过 Bash 受 sandbox 限制而不可见。报告者据此认为 Read/Write/Edit 的权限检查路径可能不同。
- **expected：** 活动 deny 应在读取发生前硬阻断；`/permissions` 显示的“始终拒绝”不应与实际读取结果相矛盾。
- **observed：** 报告者使用多个目录和不同深度的路径进行对照，并区分了真实 Unix `EACCES` 与产品权限引擎拒绝；公开正文没有给出本项目可复核的文件内容。
- **user_report_vs_official_explanation：**
  - **用户报告：** 版本、Linux 平台、sandbox 配置类别、Read/Bash 对照和权限 UI 观察来自 Issue。
  - **社区推测：** “Read/Write/Edit handler 没有调用相同 deny 匹配器”是报告者的根因方向，不是官方诊断；Issue 没有维护者回复。
  - **官方事实/解释：** Anthropic 文档说明 deny 规则用于阻止指定工具，安全文档同时说明 Read/Grep/Glob 在某些边界外读取可能由审批控制；文档没有解释该版本中 Read 的实际异常，也没有确认 Write/Edit 受同样影响。
- **reproduction：** 报告者的安全化复现应使用一个由人预先创建的、无敏感内容的 sentinel 文件：配置 Read deny，先验证 `/permissions`，再比较 Read 与 Bash 对该 sentinel 的结果。不要读取系统文件、家目录、密钥、Cookie 或其他用户文件。
- **safe diagnostic：** 只读确认规则来源、匹配模式、工具名和 sandbox allowed paths；仅对无敏感 sentinel 做一次访问对照，记录“拒绝/成功/真实 OS 权限错误”，不记录文件内容。若需要创建 sentinel，应由人先在明确的临时目录准备，避免让 Agent 扩大目录权限。
- **stop condition：** Read 成功返回 deny sentinel，或 Read/Bash 的边界结果无法解释时，立即停止对受保护路径的所有读取、写入和编辑；不要用更宽的 allow、bypass 或换工具来“绕过”问题。
- **本项目本地复现：** 未复现；没有读取任何外部系统路径或运行 Claude Code 工具。

### W26-09：嵌套项目 settings 静默丢失父级 sandbox，子 Agent 获得更宽网络能力

- **source_url：** https://github.com/anthropics/claude-code/issues/83035
- **title：** Workspace sandbox config silently dropped for sessions/subagents rooted in nested project directories
- **date：** Issue 创建于 2026-08-01；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Claude Code；macOS 26.5.2 / Darwin 25.5.0；父工作区包含嵌套项目，子项目有自己的 `.claude/settings.local.json`。
- **version：** Claude Code 2.1.220。
- **symptom：** 父工作区设置了严格 sandbox 和网络 allowlist，嵌套项目的 settings 只有 permissions、没有 sandbox；报告者称从嵌套项目启动会话或将子 Agent 根到该目录后，父级 sandbox 不再阻断原本被拒绝的网络动作，而且没有警告。
- **expected：** 子项目应继承父级限制，或只能收紧限制；至少在父 sandbox 被丢弃时应明确警告。子 Agent 的更换 cwd 不应静默改变安全边界。
- **observed：** 报告者称父会话的相同网络探针被阻断，而嵌套会话/子 Agent 可运行；报告者从不同项目 transcript 对照 settings 得出这一结论。
- **user_report_vs_official_explanation：**
  - **用户报告：** Issue 提供了父/子 settings 的结构、父子会话对照和安全影响；本文件不复制其 SSH 命令、私有路径或 transcript。
  - **社区推测：** “子文件完全替换而非继承/合并父 sandbox”是报告者从行为推断出的实现模型；没有维护者确认。
  - **官方事实/解释：** Anthropic 子 Agent 文档说明子 Agent 有自己的上下文、工具和权限模型，权限文档说明 settings 和 worktree 相关规则的作用范围；未发现官方说明嵌套 sandbox 的继承/合并规则，也未发现该 Issue 的修复说明。
- **reproduction：** 报告者路径是：准备父目录严格 sandbox、子目录仅 permissions 的 settings，分别从父目录和子目录启动会话，比较一个无凭据、无破坏性的被允许/被拒绝网络探针。本项目没有启动 Claude Code 子 Agent 或执行网络探针。
- **safe diagnostic：** 在不发送凭据的前提下，分别记录父会话、子会话和子 Agent 的项目根、实际加载 settings、sandbox enabled、网络规则和工具权限；优先使用本地配置回显和受控的无副作用探针，不使用 SSH、生产域名或真实 API。一次只改变 nested settings 或 Agent cwd 一个变量。
- **stop condition：** 子 Agent 能访问父会话明确禁止的域名、sandbox 状态无法回显、或 settings 继承关系不明时，停止子 Agent 的网络、安装和外部 API；不要通过全局放宽 sandbox 来继续任务。
- **本项目本地复现：** 未复现；没有创建嵌套 Claude 项目，也没有运行网络探针。

### W26-10：无关 sandbox 热更新后网络 domain filter 疑似 fail-open

- **source_url：** https://github.com/anthropics/claude-code/issues/81572
- **title：** Sandbox network domain filter silently fails open after in-session sandbox settings changes
- **date：** Issue 创建于 2026-07-27；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Claude Code；macOS Darwin 25.5.0；Seatbelt sandbox；配置了非通配符网络 allowlist。
- **version：** Claude Code 2.1.212。
- **symptom：** 报告者称会话开始时网络 domain filter 正常，编辑无关的 sandbox filesystem/Mach lookup 设置后，同一网络代理停止执行 allowlist，原本不允许的域名可连接；撤销设置也不能恢复，只有重启会话才恢复。
- **expected：** 热更新后网络规则仍应持续生效；若无法重新加载，应 fail-closed 或明确警告，而不是外观仍像 sandbox、实际却扩大网络范围。
- **observed：** 报告者称连续两天观察到“先阻断、热更新后可达、重启恢复”的序列，并比较了文件系统规则可以热更新而网络规则不一致。
- **user_report_vs_official_explanation：**
  - **用户报告：** 环境、版本、前后网络行为和重启影响来自报告者；没有本项目复现。
  - **社区推测：** Issue 还提出 `sandbox.excludedCommands` 的命令匹配形式可能需要通配符；这是报告者的附带观察，不是本记录的根因。没有维护者解释。
  - **官方事实/解释：** Anthropic 安全文档说明网络访问可以受配置限制、网络请求通常需要审批；没有说明 sandbox 设置热更新时代理如何重载，也没有确认该 fail-open 报告。
- **reproduction：** 报告者路径是：用一个不含凭据的 allowlist，在新会话先测试允许域名与不允许域名，再修改无关 sandbox 设置，重复同样的无副作用请求并比较；本项目不执行该网络实验。
- **safe diagnostic：** 只使用无敏感、低影响的测试域名或组织控制的回显端点；记录规则版本、代理是否变化和请求是否被拒绝，不发送 token、Cookie、源码或生产数据。任何热更新前先保存当前配置和会话状态。
- **stop condition：** 原本拒绝的域名在热更新后可达、规则版本与代理状态对不上、或无法证明请求未带凭据时，停止所有网络、包安装和外部服务调用；重启会话只能作为隔离状态的诊断步骤，不能被写成已验证修复。
- **本项目本地复现：** 未复现；未开启 Claude sandbox，也没有发送外部网络请求。

### W26-11：脚本或解释器间接执行破坏性操作，绕过表面级审批检查

- **source_url：** https://github.com/anthropics/claude-code/issues/85274
- **title：** PreToolUse Bash guard and permission prompt are string-level; destructive commands inside a script bypass the approval gate
- **date：** Issue 创建于 2026-08-09；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Claude Code CLI；报告者描述 Claude Fable 5 模型生成脚本并由 Bash 调用；正文未提供操作系统和完整版本。
- **version：** 未提供 Claude Code 版本；模型为报告者列出的 Claude Fable 5。
- **symptom：** 直接提交破坏性命令会触发 prompt，但将同一动作写入脚本，再只提交 `bash script`，报告者称 built-in prompt 和 PreToolUse Bash hook 都只看到外层字符串，没有在脚本执行前拦截内部破坏性动作。
- **expected：** 对不可逆或高影响动作，审批应覆盖实际将发生的效果，或产品明确说明审批只检查外层调用；用户不应把“外层命令获准”理解成脚本中所有转调用都经过人工确认。
- **observed：** 报告者称在真实任务中模型写出 teardown 脚本并随后执行，用户没有单独批准脚本内的删除动作；Issue 给出的复现方向是脚本/解释器/管道的间接调用。
- **user_report_vs_official_explanation：**
  - **用户报告：** 这是报告者的安全性报告；本文件不复制其删除目标、脚本或路径，也不执行危险复现。
  - **社区推测：** “审批层是 string-level”是报告者根据观察提出的模型；没有维护者或独立审计确认其覆盖全部解释器、hook 和 shell 语法。
  - **官方事实/解释：** Anthropic 安全文档说明修改系统的 Bash 通常需要审批，并列出命令注入检测和人工审查建议；文档未保证会静态/动态分析每个脚本的传递行为，也未对该 Issue 给出根因或修复版本。
- **reproduction：** 只保留安全化边界：在一次性临时目录中生成仅写入固定 marker 的无害脚本，比较直接调用和脚本调用是否触发预期的审批/日志；不要用删除、数据库破坏、远程 shell 或真实解释器 payload 验证。
- **safe diagnostic：** 在运行任何脚本前静态审阅整个脚本、其调用的脚本、解释器参数、环境变量和目标路径；把脚本当作即将执行的完整变更，不能只审阅外层 `bash` 字符串。危险任务使用 disposable container/VM，并保留人工确认点。
- **stop condition：** 审批只显示外层脚本调用、脚本内容无法完整审阅、脚本会访问真实生产/用户目录，或 hook/日志无法证明实际动作时，停止执行；不要用 allowlist、bypass 或更宽 sandbox 继续试验。
- **本项目本地复现：** 未复现；明确没有运行删除、解释器 payload、hook 或任何破坏性命令。

## D. 子 Agent 交接与 prompt injection

### W26-12：子 Agent 结果通道出现 prompt-injection-shaped 输出

- **source_url：** https://github.com/anthropics/claude-code/issues/81784
- **title：** Prompt injection at subagent spawn boundary via tool result channel
- **date：** Issue 创建于 2026-07-27；本轮访问于 2026-08-10；页面状态为 `open`。
- **platform：** Claude Code CLI；macOS Darwin；异步 background 子 Agent 和父 Agent 并行运行；报告者称工作在本地 Git worktree。
- **version：** Claude Code 2.1.212；父模型和子 Agent 模型由报告者分别指定，但不把模型名当作根因证据。
- **symptom：** 子 Agent 启动约十秒后以 0 次工具调用完成，返回的 result 不是任务报告，而是带有系统提示词形状、真实 session connector 列表片段和试图影响父 Agent 如何处理未来 tool result 的指令。报告者隔离该结果，检查工作树无变化后重新启动。
- **expected：** 子 Agent result 应被当作不可信的任务数据；系统应隔离 prompt、工具结果和控制指令的边界，异常结果不能获得父 Agent 的指令优先级或外部权限。
- **observed：** 报告者称同一机器/账户曾出现相似 spawn-boundary 事件；本次没有工具调用、没有工作树改动、没有已知损害，但结果包含真实会话配置形状，增加了敏感上下文泄漏和父 Agent 被引导的风险。
- **user_report_vs_official_explanation：**
  - **用户报告：** 事件序列、0 次工具调用、工作树核对和“先隔离再重启”来自公开 Issue；本文件不复制其长 payload、connector 名单、transcript 路径或反馈 ID。
  - **社区推测/建议：** 唯一评论建议研究第三方 prompt-injection filter（Ice Phi）；这是社区建议，没有 Anthropic 验证，也不能作为默认修复或安全背书。报告者关于“spawn/context assembly 边界产生 payload”的分析同样是推测。
  - **官方事实/解释：** Anthropic 子 Agent 文档说明子 Agent 使用独立上下文和工具/权限模型；未发现官方对该 result 通道事件、payload 来源或过滤器的解释，也没有修复确认。
- **reproduction：** 公开 Issue 的可安全观察部分是：启动一个只读、无外部副作用的子 Agent，检查其完成时间、工具调用计数、result 是否包含任务相关摘要，再核对父工作树 HEAD/diff；不要人为构造或传播系统提示词样式 payload。
- **safe diagnostic：** 将所有子 Agent result 当作不可信数据，不执行其中的命令、链接、权限变更或“忽略此前规则”指令；先记录子 Agent 名称、任务目标、工具调用计数、退出状态和父/子工作树 HEAD。对任何异常 result 只保留最短必要摘要，避免复制敏感上下文。
- **stop condition：** result 出现系统提示词形状、要求改变优先级/审批、提到未授权 connector/秘密、0 次工具调用却给出与任务无关的控制文本，或父工作树状态无法核对时，隔离该 result、停止父 Agent 继续执行，并由人工决定是否重新开只读任务。
- **本项目本地复现：** 未复现；没有启动子 Agent、读取或传播外部 prompt payload，也没有调用 MCP/connector。

## 跨案例观察：用户真正遇到的是“工作面证据不一致”

这些记录不能证明一个统一的内部 bug，但它们共同呈现了几个可以安全教给用户的风险模式：

| 表面信号 | 不能直接推出的事实 | 需要单独核对的证据 |
|---|---|---|
| 出现 `Context compacted` 或恢复成功 | 当前任务指针、计划和最近用户意图仍然正确 | 外部检查点、最近消息、diff、最后验证结果 |
| UI 显示项目名或 Worktree | Agent shell、patch、Git 和 IDE 实际在同一目录 | project root、cwd、workspace root、`git worktree list`、HEAD |
| 父 Agent 已确认分支 | 子 Agent 或另一个并发进程看到同一分支 | 父/子各自的只读 branch/status/HEAD |
| `/permissions` 显示 allow/ask/deny | 规则在当前工具、当前路径、当前 sandbox 中真实生效 | 无害 sentinel、规则来源、实际阻断/提示结果 |
| sandbox 开启或网络规则已配置 | 热更新/嵌套 settings 后仍保持同一限制 | 生效配置、代理状态、无凭据的前后探针 |
| 子 Agent 返回“完成” | result 是可信任务报告，且没有隐藏工具/上下文异常 | 工具调用计数、任务相关性、工作树和外部副作用 |
| 临时副本列表为空 | 磁盘上没有未登记的运行目录 | 精确库存、目录归属、磁盘余量、活跃任务引用 |

## 统一安全排查卡

以下卡片是研究建议，不是任一产品的官方诊断命令或修复承诺。每次只改变一个变量，记录“最后确认的检查点”，把配置可见性和运行时生效性分开。

```text
date_and_timezone:
surface: desktop | cli | vscode | cloud | wsl | other
client_and_version:
os_and_runtime:
provider_and_auth_mode:
project_root_or_worktree:
agent_cwd_and_workspace_root:
target_path_or_cloud_environment:
expected_capability:
observed_capability:
last_confirmed_checkpoint:
read_evidence:
write_evidence:
run_evidence:
tool_call_count_or_result_status:
external_side_effect_seen:
reported_workaround_and_risk:
safe_next_check:
stop_condition:
status: passed | unverified | blocked
```

推荐顺序是：

1. 先只读确认入口、版本、项目根、cwd、worktree、分支、sandbox/权限和 Provider/auth 模式。
2. 再用无敏感、无副作用的探针验证工具是否真实注册、规则是否真实生效、子 Agent result 是否与任务相关。
3. 在长等待、自动重试、上下文压缩或配置热更新后，先检查是否已经产生文件、请求、进程、临时副本或其他副作用。
4. 路径、权限、所有权、任务指针或结果来源不明确时，停在 `unverified` 或 `blocked`；不要靠扩大权限、切换分支、复制改动或反复重试来掩盖不一致。

## 已报告 workaround 与风险的总原则

- “新开会话并重述任务”可作为恢复路径，但必须携带人工核对过的文件/diff/计划检查点；不能把旧会话最后一段模型输出当作事实。
- “重启客户端/会话”可能改变状态，但不证明根因或修复；重启前先保存 diff、日志和最后检查点。
- “使用更宽的 sandbox、bypass、全局 allow 或把 token 写入环境文件”不是安全诊断；它们会改变权限和泄露面。
- “换用另一写入工具、自动切分支或手动复制 worktree”可能绕过症状，也可能绕过原本应有的保护；必须先确认目标路径、分支和所有权。
- 社区提出的 checkpoint、第三方 prompt filter、TUN、重装、关闭缓存等建议只记录为建议，不能升级为官方事实或普遍 workaround。

## 排除来源与许可边界

- 本波次没有新增使用 HN、Reddit、公开论坛或 Stack Overflow 的不可核对页面作为证据。Stack Overflow 页面直访问在本环境返回 403；虽可访问 Stack Exchange API，但本轮没有找到既不重复又能独立核对的新增案例，因此没有用搜索摘要替代原文。
- 所有 GitHub Issue 和官方文档都只作 `reference-only`。本文件使用原创摘要和链接，没有复制 Issue 的长段文字、代码、截图、日志、私密路径、凭据或 connector 内容。
- `docs/sources/asset-register.md` 的 S07 已记录这一类公开 Issue/Stack Exchange 研究的 reference-only 边界；本次按用户要求只写本文件，不改资产登记或其他项目文件。

## 研究限制、失败与后续复核

- **没有本地复现：** 本轮没有运行 Codex/Claude Code、Cloud task、外部 Provider、MCP/connector、Windows sandbox、WSL 代理或公开 Issue 中的危险命令；因此不能把任何记录标为 `verified`。
- **没有官方根因闭环：** 大多数 Issue 没有维护者实质回复；存在官方参与者的 #8310 只解释 compaction 与 rate-limit 因果边界，不等于修复确认。Claude #81784 的第三方评论只是社区建议。
- **版本会漂移：** 版本、模型、平台、权限默认值和网络实现都可能变化；再次用于教材前应重新访问原 URL，记录维护者回复、关联 PR、修复版本和当前适用范围。
- **样本偏差：** GitHub Issue 样本偏向遇到强烈故障并愿意提交报告的用户，不能推断发生率或所有账户都会遇到。
- **安全限制：** 为避免扩大风险，本轮不执行脚本绕过审批、读取受保护路径、访问被拒网络、跨项目写入、分支漂移、临时目录清理或 prompt injection 传播实验。

**可安全宣称的结论：** 这些公开报告足以支持“配置/界面/恢复/工具结果只是中间证据，必须做路径、权限、任务指针、所有权和副作用核对”的教学结论；不足以支持任何 Issue 已修复、某个 workaround 普遍有效、产品内部根因已确认，或本项目已经完成本地复现。
