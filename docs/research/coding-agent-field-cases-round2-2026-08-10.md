# Coding agents 真实现场案例 Round 2

**访问日期：** 2026-08-10（America/Los_Angeles）
**研究状态：** `candidate`
**研究者：** Prysai
**范围：** Codex Desktop / Computer Use、Claude Code、MCP、headless 会话，以及 coding-agent 工作流中的卡住、无输出、审批循环、上下文漂移、权限/沙箱、验证假阳性和提示词返工。
**本地复现状态：** 本轮没有启动 Codex、Claude Code、Computer Use 或第三方 MCP，也没有执行帖子中的命令；下文所有“本地复现”均明确写为“未执行”。

本文件只保存公开、可访问的原始 URL 和对其内容的短摘要。它不是产品缺陷裁决，也不是解决方案清单。`高频`在本文中只表示同一类可观察症状在多个公开讨论中反复出现，不表示有统计意义的发生率、普遍性或单一根因。

## 证据分层

- **用户报告：** 原作者或讨论参与者描述的环境、动作、现象、日志片段和预期；不替作者补充因果。
- **社区建议：** 评论者、回答者或其他参与者提出的 workaround、操作习惯或解释；即使有人说“有效”，也不等于官方修复或跨版本保证。
- **官方事实：** 官方文档、官方仓库页面或官方人员在公开讨论中的明确表述。官方事实只说明它覆盖的范围，不自动解释某一条 issue。
- **本地复现：** 本研究在当前工作区实际执行过的操作和结果。本轮没有对这些环境做本地运行验证。
- **未证实推测：** 可能的解释以及当前不能宣称的结论。没有维护者确认、独立复现或版本回归证据时，保留为未知。

## 研究方法与限制

1. 公开 GitHub issue、Reddit、Hacker News 和官方文档按 URL 记录；未记录需要登录才能访问的私有内容。
2. Stack Overflow 本轮重新检索后，新增候选与已有 `docs/research/field-problems-coding-agents-2026-08-10.md`、`field-problems-forums-2026-08-10.md` 中的条目重合，因此不在本文件重复计数。
3. GitHub issue 的开放状态、标签和评论存在变动；issue 被标为 `bug` 不等于维护者确认根因或修复。Reddit/HN 的点赞、评论数量也不被当成发生率证据。
4. 本文件不复制长段原文、截图、代码、命令、MCP 配置或敏感 payload；只保留能支持教材动作的最小摘要。

## 案例记录

### 1. Codex Desktop：WebSocket 断流后任务仍显示 active

**原始 URL：** [openai/codex issue #37894](https://github.com/openai/codex/issues/37894)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue；版本信息和 `Broken pipe` 报告来自 issue 正文。

**用户报告**

- 报告环境为 Codex Desktop `26.803.61601`。
- WebSocket 断开并出现 `Broken pipe` 后，用户重试；随后没有 assistant、tool、completion 或 error 事件，任务仍长时间显示为 active。
- 这是“连接断开”和“界面没有终态”同时出现的报告，不足以证明服务端、传输层、事件消费层或 UI 状态中的哪一层出了问题。

**社区建议**

- 页面没有提供可核对的维护者根因或修复版本。重试是报告中的操作，不是已验证的修复；重试后仍无事件恰好说明不能把“再次提交”当成进展证据。

**官方事实**

- [Codex Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security) 讨论 sandbox 能力边界与 approval 询问边界；它没有声明 Desktop WebSocket 断流、事件丢失或 active 状态的行为。
- 当前没有公开维护者回复把 #37894 的 `Broken pipe` 与某个根因或修复版本对应起来。

**本地复现**

- 未执行：没有启动 Codex Desktop、断开网络或构造 WebSocket 失败。

**未证实推测与不能宣称**

- 可能涉及断线重连、事件流丢失、客户端状态机或 UI 没有收到终态，但 issue 本身不能区分这些可能性。
- 不能宣称“重试已修复”、服务端已经完成任务、任务一定会继续，或该 issue 已在某个版本解决。

**可迁移动作**

1. 给每个任务记录 `started_at`、最后可见事件、最后一次工具调用、重试次数和当前 UI 状态。
2. 设定“无新事件但仍 active”的 watchdog；触发后暂停新写入，保存任务 ID、工作树 diff 和最后一条用户指令。
3. 将状态标为 `unknown`，要求重新读取文件/测试结果后才允许恢复，避免把重试请求误当成完成证据。

**适合加入：** 第 12 章“Agent 的状态、重试与停止条件”、第 9 章“证据审查与恢复”；实验 006“Agent stop conditions”、实验 003“Evidence review”。

### 2. Claude Code：浏览器自动化无可见输出，但 token 持续消耗

**原始 URL：** [anthropics/claude-code issue #80399](https://github.com/anthropics/claude-code/issues/80399)
**跨站同类讨论：** [Reddit — Claude Code got stuck printing “court”](https://www.reddit.com/r/ClaudeAI/comments/1v0vqik/claude_code_got_stuck_printing_court_burned/)
**访问状态：** 两个公开页面均在 2026-08-10 可访问。

**用户报告**

- GitHub 报告环境为 Windows / PowerShell，使用 Chrome MCP；用户看不到有意义的文本或工具进展，但 token 使用量继续上升。
- 中断后出现重复的 `court` 文本。Reddit 讨论描述了相近的重复输出和 token 消耗现象。
- 两个页面只能支持“用户观察到相似症状”，不能证明它们是同一个故障、同一版本或同一内部路径。

**社区建议**

- Reddit 参与者提出停止、重启、缩小任务或打开 `--verbose` 观察日志等建议；这些是社区经验，未在本研究中复现，也没有跨版本有效性证据。
- “重复文本说明一定是某个 MCP 工具循环”属于推测，不把它记录为社区已确认的根因。

**官方事实**

- [Claude Code Security](https://code.claude.com/docs/en/security) 和 [Permissions](https://code.claude.com/docs/en/permissions) 说明工具、网络和权限控制需要按实际配置与审批边界检查；这些文档没有确认 #80399 或 Reddit 帖子的具体原因。
- [Anthropic 的 Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) 建议给出可执行的验证、明确任务范围并主动管理上下文；这支持教学动作设计，不是该报告的修复声明。

**本地复现**

- 未执行：没有启动 Claude Code、Chrome MCP、PowerShell 任务或 token 计量实验。

**未证实推测与不能宣称**

- 可能是模型重复生成、工具调用等待、浏览器连接、输出渲染或中断后的状态恢复问题；公开报告没有把这些层分离。
- 不能宣称 `Ctrl+C`、重启、`--verbose` 或换模型已经修复，也不能仅凭 token 增长断言任务仍在产生有效工作。

**可迁移动作**

1. 同时记录可见输出、工具事件、外部副作用、token 计数和最后一次状态变化；不要只用 token 计数判断活跃。
2. 连续一段时间没有新工具结果、文件变化或可核对的中间产物时，进入 `stalled` 而非继续等待。
3. 中断后先保存原始输出和 diff，再决定重试；重复内容不应自动送入下一次提示词，避免放大返工。

**适合加入：** 第 12 章、第 19 章“评估模型与工作流”；实验 006、实验 009“工程生命周期”。

### 3. Claude Code：审批提示等待 849 秒后自动拒绝

**原始 URL：** [anthropics/claude-code issue #81357](https://github.com/anthropics/claude-code/issues/81357)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue。

**用户报告**

- 作者记录了一次审批请求长时间等待，约 849 秒后自动变为拒绝；之后的审批提示又能够正常出现。
- 作者明确说明每次写入都经过批准。因此这个案例应写成“审批可见性/等待/超时行为异常报告”，不能写成权限绕过或未经批准写入。

**社区建议**

- 页面没有提供可核对的维护者根因或修复。后续审批恢复正常是用户时间线中的观察，不是修复证据。

**官方事实**

- [Claude Code permissions](https://code.claude.com/docs/en/permissions) 描述权限规则和交互式审批的配置边界；没有规定本 issue 所述的 849 秒行为，也没有确认该等待是否为产品设计。
- 官方权限文档不允许用“最后看到了批准提示”替代“该次工具动作确实执行并返回结果”的证据。

**本地复现**

- 未执行：没有启动 Claude Code、等待审批超时或构造 unattended session。

**未证实推测与不能宣称**

- 可能涉及 UI 事件、客户端队列、网络延迟、会话状态或超时策略，但没有维护者或独立实验确认。
- 不能宣称自动拒绝代表工具一定未启动，也不能宣称之后审批恢复代表问题已经解决。

**可迁移动作**

1. 把审批拆成四个事件：`prompt surfaced`、`user decision`、`tool executed`、`result returned`，分别记录时间戳。
2. 超时或自动拒绝后默认进入 `not executed / unknown`，重新读取目标状态再决定是否重试。
3. 对有外部副作用的写入、删除、提交和发送操作设置人工确认截止时间；无人值守时不要用“稍后可能会弹窗”作为控制策略。

**适合加入：** 第 4 章“上下文、权限与 Agent 行动边界”、第 13 章“行动边界”；实验 007“Action boundaries”、实验 006。

### 4. Claude Code MCP：工具已 connected，但调用没有审批提示并永久等待

**原始 URL：** [anthropics/claude-code issue #73185](https://github.com/anthropics/claude-code/issues/73185)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue；报告包含 `obsidian-mcp` 的连接、注册和调用步骤。

**用户报告**

- `obsidian-mcp` 显示 connected，工具已经注册；实际调用等待超过四分钟，没有出现 prompt、error 或 timeout。
- 在后台模式中，用户看不到审批 prompt，工具调用直接被拒绝。报告说明“连接成功”“工具可见”“调用可完成”并不是同一个状态。

**社区建议**

- 页面没有提供可核对的通用 workaround 或维护者修复确认。不要把切换到后台模式当成修复：它改变了可见审批通道，可能只是把等待变成拒绝。

**官方事实**

- [Claude Code permissions](https://code.claude.com/docs/en/permissions) 描述工具权限与审批规则；[Claude Code security](https://code.claude.com/docs/en/security) 强调外部内容、网络和工具调用需要按信任边界审查。
- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) 说明子 Agent 有独立 context window、工具和权限配置；这不能解释本 issue，也不代表 MCP 调用天然具有可见或可用的审批通道。

**本地复现**

- 未执行：没有启动 Obsidian、MCP server 或 Claude Code tool call。

**未证实推测与不能宣称**

- 可能是 stdio/transport、工具 server 处理、权限解析、审批 UI 或后台运行模式中的任一环节；公开报告没有独立拆分。
- 不能宣称 `connected` 等于 `call-ready`，不能宣称后台拒绝就是权限配置错误，也不能把任意 MCP timeout 归为 Claude Code 的统一根因。

**可迁移动作**

1. 为 MCP 建立最小状态矩阵：进程启动、transport connected、tools listed、单个无副作用 tool call、审批出现、结果返回。
2. 每一格都保存时间戳、退出码和可观察输出；超过 timeout 时停止等待并标记未知。
3. 用本地 mock stdio server 做成功、延迟、无响应和拒绝四种边界测试，不接真实笔记库、密钥或生产数据。

**适合加入：** 第 7 章“Skill、Plugin、MCP 与工具”、第 14 章“发现、安装与审计外部 Skill”、第 12 章；实验 004、实验 006。

### 5. Claude Code Plan mode：静默 spinner，排队消息也不处理

**原始 URL：** [anthropics/claude-code issue #74342](https://github.com/anthropics/claude-code/issues/74342)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue。

**用户报告**

- 作者报告 Plan mode 中长时间只有 spinner，没有文本或工具输出；queued message 也没有被处理，`isRunning` 长时间保持 `true`。
- 作者把 Plan mode、Haiku、并发负载列为可能相关条件，但这些是报告中的未确认变量，不是根因结论。

**社区建议**

- 页面没有形成可核对的维护者修复或跨环境 workaround。换模式、换模型或重启若被尝试，也只能作为实验变量记录。

**官方事实**

- Anthropic best practices 的“先探索/规划，再实现并验证”是工作流建议；它没有承诺 Plan mode 在所有负载下都提供持续可见输出。
- 官方文档没有确认 #74342 的 `isRunning` 状态与某个模型、并发限制或 UI bug 的因果关系。

**本地复现**

- 未执行：没有运行 Plan mode、Haiku 或并发任务。

**未证实推测与不能宣称**

- spinner 可能代表仍在运行、事件没有呈现、队列阻塞或会话状态未收敛；“没有文字”不等于“没有内部计算”，也不等于“已经完成”。
- 不能宣称 Plan mode、Haiku 或并发负载是已确认根因，不能宣称退出/重启已修复。

**可迁移动作**

1. 记录 `isRunning`、最后事件、队列长度、最后工具调用和最后可写入产物，而不是只记录 spinner。
2. 给 Plan/execute 阶段分别设定 heartbeat 和最大无进展时间；达到阈值先保存状态，再停止或转人工。
3. 测试“仍在运行”和“可交付完成”两套验收条件，要求完成时有计划、变更和验证证据。

**适合加入：** 第 3 章、第 8 章“完整生命周期工作流”、第 12 章；实验 002、006、013。

### 6. Claude Code resumed headless session：stdin 管道约 90 秒没有输出

**原始 URL：** [anthropics/claude-code issue #73373](https://github.com/anthropics/claude-code/issues/73373)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue。

**用户报告**

- Linux/WSL2 场景中，恢复一个 headless session 时通过 stdin 传入内容，约 90 秒没有输出，调用方看起来像卡住。
- 作者报告改为通过 argv 传递后可以工作；这是作者自己的 workaround 观察，不是本地复现或官方修复。

**社区建议**

- 可记录的社区/作者建议是比较 stdin 与 argv 两种输入边界，并在自动化脚本中避免无限等待。它没有证明 argv 在所有版本、shell 或长输入下都可靠。

**官方事实**

- Claude Code 官方安全文档强调审查命令和外部输入；相关文档没有对该 issue 的 stdin 恢复超时、argv workaround 或 headless 兼容性作修复承诺。
- 子 Agent 文档中的独立 context window 事实不能外推为“恢复 session 的 stdin 一定被正确接收”。

**本地复现**

- 未执行：没有启动 headless Claude Code、WSL2 管道或恢复会话。

**未证实推测与不能宣称**

- 可能涉及 stdin EOF、shell 管道、恢复状态、输入解析或输出缓冲；公开报告无法单独确定哪一层。
- 不能宣称 argv 是官方推荐修复，不能宣称 session 已恢复只因为进程仍存活。

**可迁移动作**

1. 为 headless 任务规定输入协议：输入来源、EOF、session ID、最大等待时间和输出格式。
2. 将目标、已完成项、下一步和最近验证结果写入外部 checkpoint；恢复后先读取 checkpoint，再继续写代码。
3. 对 stdin、argv、文件输入各做无副作用的小输入测试，记录首个输出、退出码和是否收到完整终态。

**适合加入：** 第 3 章、第 10 章“规划与切片”、第 12 章；实验 002、006。

### 7. Codex 安全过滤：成功执行的验证输出被隐藏，疑似 false positive

**原始 URL：** [openai/codex issue #34951](https://github.com/openai/codex/issues/34951)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue。

**用户报告**

- 用户报告迁移、SBOM、镜像 digest、SLSA、checksum 等验证相关命令已经成功执行，但输出区域显示 `This content can't be shown`。
- 用户将其理解为安全过滤对合法验证材料的误判；这是用户对现象的命名，不是官方确认的分类。

**社区建议**

- 没有可核对的维护者修复、过滤规则说明或稳定 workaround。改变命令文本、关闭安全控制或把敏感输出转发到外部服务都不应作为默认建议。

**官方事实**

- [Codex Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security) 说明 approval policy 与 sandbox mode 是安全边界；它没有规定该显示文案的触发原因，也没有把“内容不可显示”定义为命令失败。
- 官方安全边界不能替代命令退出码、产物哈希、测试报告和人工核对等验证证据。

**本地复现**

- 未执行：没有在 Codex 中运行迁移、SBOM、digest、SLSA 或 checksum 命令，也没有测试内容过滤。

**未证实推测与不能宣称**

- 可能是安全分类、UI 展示、输出传输或特定字符串触发，但公开 issue 没有足够证据确认。
- 不能宣称这是已确认的 false positive，不能宣称隐藏输出代表命令失败或成功，也不能宣称改写输出格式已修复。

**可迁移动作**

1. 把“命令执行证据”和“屏幕可见证据”分开保存：退出码、生成的文件、摘要值、测试结果各自记录。
2. 对每个声明建立 `claim -> evidence -> scope` 对照；过滤后看不到证据时标为 `unverified`，不要用模型自述补齐。
3. 用无秘密、可重算的测试 fixture 验证显示层与执行层是否一致；生产验证仍需人工核对原始产物。

**适合加入：** 第 9 章、第 19 章；实验 003、实验 009。

### 8. Computer Use fallback 选错下拉项后仍然确认

**原始 URL：** [openai/codex issue #37054](https://github.com/openai/codex/issues/37054)
**访问状态：** 2026-08-10 可访问的公开 GitHub issue。

**用户报告**

- 报告描述 Accessibility 选择失败后，坐标/键盘 fallback 选中了错误的 dropdown 项，随后动作继续并直接确认。
- 用户在创建 VM 前发现了错误；报告重点是“动作执行了”与“动作后的状态正确”之间没有自动等价关系。

**社区建议**

- 页面没有提供可核对的维护者修复确认。可迁移的建议是任何 fallback 后重新读取 UI 状态，但这属于安全工作流建议，不是该 issue 已经修好的证明。

**官方事实**

- Codex approvals/security 文档支持将“是否允许某个动作”与“动作结果是否符合目标”作为不同问题；文档没有确认 Computer Use fallback 的选择或确认逻辑。
- 没有公开官方事实证明一次 approval、一次点击或一次确认自动包含目标值校验。

**本地复现**

- 未执行：没有启动 Computer Use，也没有操作下拉菜单或创建 VM。

**未证实推测与不能宣称**

- 可能涉及 Accessibility 信息缺失、坐标定位、键盘焦点、下拉菜单排序或确认前缺少状态读取；不能据此归因到单一组件。
- 不能宣称 approval 已保护了最终值，不能宣称 fallback 在其他应用或版本中同样会选错，也不能把报告写成已确认的权限绕过。

**可迁移动作**

1. 把 UI 自动化拆成“定位—动作—重新读取—匹配预期—确认”五步。
2. 若实际选中值与预期不完全匹配，立即 fail closed；不得继续确认或创建资源。
3. 对不可逆动作保留操作前后状态、目标值和人工确认点；截图或日志只保留无秘密的最小信息。

**适合加入：** 第 5 章“选择 Codex 表面”、第 13 章；实验 007、实验 003。

### 9. Reddit：离开电脑后审批提示无人处理，任务停在原地

**原始 URL：** [Reddit — Claude Code kept getting stuck when I left my computer](https://www.reddit.com/r/ClaudeAI/comments/1rryw97/claude_code_kept_getting_stuck_when_i_left_my/)
**访问状态：** 2026-08-10 可访问的公开 Reddit 讨论；它是社区经验，不是产品 issue 或官方支持记录。

**用户报告**

- 参与者描述离开电脑后，Claude Code 停在需要用户处理的审批提示，回来时任务没有继续。
- 该讨论没有足够信息证明提示没有出现、通知没有送达、终端阻塞，或确实存在产品 bug。

**社区建议**

- 讨论中出现远程查看/批准、让任务运行在可回连的终端、减少需要审批的动作等建议；也有人讨论自动批准。
- 自动批准会扩大副作用风险；远程审批是否安全取决于身份、终端和网络控制，本研究没有验证这些建议的效果。

**官方事实**

- [Claude Code permissions](https://code.claude.com/docs/en/permissions) 说明权限规则和需要批准的动作；[Claude Code security](https://code.claude.com/docs/en/security) 要求审查建议命令和关键改动。
- 官方文档没有承诺离开终端后审批会被可靠通知、转发或自动处理，也没有确认该 Reddit 现象的根因。

**本地复现**

- 未执行：没有离开本机等待审批、配置远程终端或启用 unattended 权限。

**未证实推测与不能宣称**

- 不能把“回来时没继续”直接归因于通知系统、审批队列或网络中断。
- 不能把远程批准或自动批准写成有效修复；对写入、删除、提交、发送等动作，更不能默认放宽审批。

**可迁移动作**

1. 设计无人值守任务时先列出所有可能的审批点、外部副作用和最大等待时间。
2. 每个审批请求记录目标、范围、到期时间和当前状态；没有人工决策时按 `not approved` 或 `unknown` 处理。
3. 使用只读/可回滚任务演示通知与恢复；真实凭据、生产资源和自动批准不进入实验。

**适合加入：** 第 4 章、第 5 章、第 13 章；实验 007、实验 006。

### 10. Reddit：长时间 idle 或无输出，用户无法判断是否还在工作

**原始 URL：** [Reddit — extremely long idle times when using Claude Code](https://www.reddit.com/r/ClaudeAI/comments/1sbfw4e/extremely_long_idle_times_when_using_claude_code/)
**访问状态：** 2026-08-10 可访问的公开 Reddit 讨论。

**用户报告**

- 参与者把长时间没有可见输出描述为 idle 或卡住；讨论关注等待太久后是否应停止、重启或继续等待。
- 帖子语境不足以确定模型计算、工具等待、网络延迟、渲染停滞或用户没有看到输出中的哪一种。

**社区建议**

- 社区建议包括缩小任务、分阶段执行、停止后重启和使用 verbose 日志；这些是经验性操作，未在本地验证，不能写成有效修复。

**官方事实**

- Anthropic best practices 建议分解复杂工作并提供验证；这说明如何设计更可观察的任务，不是对该 idle 讨论的诊断。
- 官方来源没有为该帖定义统一 idle 超时或保证 spinner/输出一定反映内部状态。

**本地复现**

- 未执行：没有运行长时 Claude Code 任务或收集其 heartbeat。

**未证实推测与不能宣称**

- 不能把“无输出”当成“没有计算”，也不能把“进程仍在”当成“任务正在取得有效进展”。
- 不能宣称缩小任务、重启或 verbose 已解决问题，更不能用一次成功推广到所有任务。

**可迁移动作**

1. 为每个阶段记录最后可观察事件、最后工具结果、最后文件变化和最后验证产物。
2. 用“无新证据的等待时间”定义停滞阈值，而不是只用总运行时间。
3. 到阈值后执行可回滚的诊断：保存日志和 diff、停止当前运行、重新读取状态，再决定是否切片重试。

**适合加入：** 第 8 章、第 12 章、第 19 章；实验 006、009、013。

### 11. Hacker News：复杂工程任务的质量与“思考可见性”难以对齐

**原始 URL：** [Hacker News item 47660925](https://news.ycombinator.com/item?id=47660925)
**相关讨论：** [Hacker News item 46545620](https://news.ycombinator.com/item?id=46545620)
**访问状态：** 2026-08-10 可访问的公开 HN 讨论。它们是经验和观点讨论，不是受控实验或缺陷追踪。

**用户/参与者报告**

- 参与者讨论复杂工程任务中的产出质量、计划可见性和思考过程可见性；“看起来没输出”与“内部是否仍在推理”不能仅凭 UI 判断。
- 另一讨论分享了把计划、TODO 和任务状态外部化，以减少长会话遗忘和交接困难的实践经验。

**社区建议**

- 社区经验集中在先计划、拆成小切片、把 TODO/checkpoint 写到外部文件，并让每个阶段留下可检查产物。
- 这些建议适合变成实验变量；它们不是对某产品、某模型或某次失败的因果证明。

**官方事实**

- 该讨论中有 Claude Code 团队成员说明“隐藏 thinking UI”不等于模型没有内部 thinking；这只适用于该评论语境，不能解释所有无输出、spinner 或卡住报告。
- Anthropic best practices 建议明确任务、分阶段工作并运行验证；这与外部 checkpoint 实验方向相容，但没有确认 HN 参与者的结果具有统计代表性。

**本地复现**

- 未执行：没有运行 HN 中所述的工程任务，也没有对思考可见性做模型对照实验。

**未证实推测与不能宣称**

- 不能把隐藏思考 UI 当成卡住证据，也不能反过来用“模型可能在思考”掩盖没有交付、没有事件或没有验证。
- 不能宣称外部 TODO 必然提高质量；需要通过同一任务的对照和人工评分验证。

**可迁移动作**

1. 不要求暴露不可审计的内部思考；要求可交付的计划、决策摘要、变更清单、测试结果和下一步。
2. 让每个 checkpoint 包含目标、已完成、未完成、假设、分支/提交、diff 摘要和验证结果。
3. 用相同任务比较“模糊提示”和“任务协议提示”的返工次数、漏验收项和恢复时间。

**适合加入：** 第 3 章、第 10 章、第 19 章、第 20 章；实验 002、009、013。

## 反复出现的可观察症状簇

| 症状簇 | 公开记录 | 应观察什么 | 当前不能宣称 | 教材化动作 |
|---|---|---|---|---|
| 无输出但状态仍 active / idle | #37894、#80399、#74342、Reddit idle、#73373 | 最后事件、工具结果、队列、文件变化、退出码、token 使用 | 不能由 spinner、进程存活或 token 增长推出有效进展 | watchdog + `unknown/stalled` 状态 + 保存 checkpoint |
| 审批提示不可见、延迟或无人处理 | #81357、#73185、Reddit approval | prompt surfaced、决策、执行、结果返回的四段时间线 | connected 不等于 call-ready；后续弹出不等于之前已修复 | approval state matrix + timeout + fail closed |
| 恢复/输入边界导致上下文不确定 | #73373、HN 46545620/47660925 | 输入是否 EOF、session ID、最后用户指令、外部任务指针 | 不能把 resume 成功、argv workaround 或模型自述当成交付证据 | context checkpoint + resume contract |
| 权限动作成功但结果不正确 | #37054、#34951 | 实际目标值、退出码、产物、屏幕显示、人工确认 | approval 只说明授权边界，不证明结果正确；隐藏输出不说明成功/失败 | verification evidence + UI reread + fail closed |
| 提示词/任务过宽造成返工 | HN 讨论及既有 prompt 研究 | 目标、范围、验收、停止条件、失败恢复和交付格式 | 不能把一次返工归咎于模型能力或单个提示词字段 | prompt contract 对照实验 |

## 可直接接入章节与实验的动作

### A. 第 3 章“任务协议” / 实验 002

新增一个 coding-agent 任务协议卡，强制填写：

```text
目标：
允许改变的范围：
不允许触碰的范围：
前置状态/分支：
可观察事件：
验收证据：
停止条件：
失败后保留什么：
最终交付格式：
```

故意给同一只读任务两个版本：一个只写“帮我修好”，一个写完整协议。只比较可观察指标：返工轮数、漏掉的验收项、无效等待时长和是否留下 checkpoint；不把主观“感觉更聪明”作为结论。

### B. 第 4 / 5 / 13 章“权限、表面与行动边界” / 实验 007

把每个动作拆成四张卡：

1. **能力：** 当前表面能读什么、写什么、联网什么、调用什么工具。
2. **授权：** 是否需要 approval、提示是否出现、用户是否明确决定。
3. **执行：** 工具是否真正启动、退出码是什么、结果是否返回。
4. **结果：** 目标状态是否匹配，是否产生外部副作用。

用无害 sentinel 文件、无副作用本地 UI 和三个路径（cwd 内、允许 root 内、root 外）演示：配置存在不等于生效，prompt 文案不等于 OS enforcement，approval 不等于结果正确。

### C. 第 7 / 14 章“MCP 与工具审计” / 实验 004

使用本地 mock stdio server，不连接真实 Obsidian、浏览器、云端或密钥，测试四种情形：

- server 启动但未 connected；
- connected 但 tools 未注册；
- tools 已注册但调用不返回；
- 调用返回结果但审批/结果证据缺失。

验收要求是每一格都有超时、退出码和日志；不能用 `connected` 单字段表示“工具可用”。

### D. 第 9 / 19 章“证据审查与工作流评估” / 实验 003、009

对验证任务建立最小证据包：命令/动作摘要、退出码、测试结果、生成物路径、digest/checksum、时间戳和人工核对项。若输出在 UI 中被隐藏，证据状态降为 `unverified`，不得由 Agent 的完成声明补齐。

同一任务重复两次，一次允许自动重试，一次规定“只有出现新证据才重试”；比较重复动作、无效 token、返工文件和最终证据完整度。

### E. 第 12 章“Agent loop 与 stop” / 实验 006

实现一个不依赖具体产品的纸面状态机：

```text
planned -> running -> waiting_for_approval -> executing -> evidence_received -> done
                         |                         |
                         +-> timeout/unknown <-----+
```

实验必须覆盖：无事件 spinner、审批未出现、自动拒绝、工具永等、断流重试和恢复输入无 EOF。任何 `unknown` 都不能自动进入 `done`；达到重试上限后保存状态并请求人工决策。

### F. 第 20 / 22 章“个人系统与持续更新” / 实验 013

要求长任务在每个切片后保存一个短 checkpoint，字段至少包括目标、已完成、下一步、假设、分支/提交、diff 摘要、测试结果和最后用户指令。恢复时先比对工作树与 checkpoint，再继续；更新产品或模型后重新检查来源、版本和权限矩阵。

## 结论边界

可以教的不是“某工具一定怎样”，而是一套在证据不足时仍然安全的动作：记录最后可观察事件，分离审批/执行/结果，保存外部任务指针，给工具调用设超时，在验证失败时 fail closed，并用更明确的任务协议减少返工。

本轮没有证据支持以下更强结论：

- 某一 issue 的公开报告已经证明了根因；
- 某个社区 workaround 对所有版本、平台或集成面有效；
- “无输出”一定等于模型停止、工具循环或网络故障；
- approval、sandbox、MCP connected 或进程存活任一单项可以证明任务完成；
- 安全过滤隐藏输出一定是 false positive，或一定代表命令失败；
- 提示词更长一定减少返工；
- 本轮任何案例已在本机复现或修复。

## 来源、许可与引用边界

- GitHub issue、Reddit 和 Hacker News 均只作为公开用户报告或社区讨论入口；本文只做短摘要和链接引用，不复制长段原文、截图、代码或敏感内容。
- Stack Overflow 内容由页面标注的 CC BY-SA 4.0 提供；本轮没有把已在既有研究中记录的 Stack Overflow 条目复制到本文件。
- 官方事实只链接官方文档或官方人员公开评论；官方文档用于说明一般边界，不被写成对某条 issue 的确认。
- 本轮没有引入外部图片、代码、Skill 指令、凭据或 `.env` 文件，因此不修改 `docs/sources/asset-register.md`。本文件是项目自有的研究摘要，外部页面保持 `reference-only`。

## 去重与后续复核

为避免重复计数，本文件不重录既有研究中的 Codex #37306、#37153、#8310，Claude Code #81784，以及已有的 Stack Overflow 条目和 `field-problems-follow-up-2026-08-10-p2.md` 中的 issue。发布到正式章节前，应重新访问每个原始 URL，补充当前页面状态、维护者回复、关联 PR、修复版本和适用范围；若没有新证据，继续保持 `candidate` / `unverified`，不要升格为 `verified`。
