# AI coding agent 真实用户问题研究

**访问日期：** 2026-08-10（America/Los_Angeles）
**研究状态：** candidate。来源已公开访问并按证据层级整理；本研究没有在本机运行这些用户环境，也没有把社区 workaround 当作产品修复结论。
**范围：** Codex/Codex CLI/Codex Desktop/Computer Use、Claude Code，以及与 coding-agent 工作流直接相关的网络、依赖、审批、Windows 和敏感目录问题。

## 读取规则与方法边界

- **用户报告**只记录原作者描述的环境、症状、复现步骤和预期，不替作者补因果。
- **官方事实**只记录官方文档、官方仓库源码/文档或维护者明确回复能支持的内容。
- **社区建议**记录回答者或评论者提出的做法；即使回答被接受，也不等于官方承诺或跨版本保证。
- **是否本地复现**明确写本研究做过什么。本轮没有执行 Codex、Claude Code、Computer Use 或危险命令复现。
- **未证实推测**保留合理但尚未由维护者或独立实验确认的解释，避免把“看起来像”写成根因。
- Stack Overflow 页面直达请求在本环境返回 HTTP 403；题目、答案、得分、浏览量和 accepted 状态通过公开 Stack Exchange API 读取，原始页面 URL 仍逐条保留。GitHub issue 通过公开 GitHub REST API 和 issue 页面 URL 核对。所有 URL 的访问日均为 2026-08-10。

## 案例 1：Windows Computer Use 在枚举窗口前失败

**来源与互动：** [openai/codex #37306](https://github.com/openai/codex/issues/37306)，open，4 条评论；另有 3 名用户在评论中报告同样错误。创建者 `wreynolds79`，创建于 2026-08-06，访问于 2026-08-10。

**用户报告：** Codex App `26.730.61639`、Pro、Windows `10.0.26200.0 x64`。`sky.list_windows()` 与 `sky.list_apps()` 都失败，错误为 `EnumWindows failed: The system cannot find the path specified. (0x80070003)`。原作者已经检查 helper 存在、进程启动、读/执行权限，并尝试重装插件、Repair、Reset、卸载重装和重启；没有给出成功 workaround。评论中的另一位用户还报告 helper、父 Node 进程、Explorer 位于同一 Windows session，并确认普通 PowerShell 能枚举窗口，但这些是评论者自己的环境。

**官方事实：** 该 issue 被官方 `openai/codex` 仓库标为 `bug`、`windows-os`、`app`、`computer-use`，但页面没有维护者对根因或修复版本的确认。官方仓库的 Windows sandbox 协议/实现文件存在，说明 Windows 是代码路径的一部分；这不等于 Computer Use 的窗口枚举链路已经通过验证。[仓库配置文档](https://github.com/openai/codex/blob/main/docs/config.md)也只把配置说明链接到当前文档站，不能用来证明此 issue 已修复。

**社区建议：** 没有可验证的修复建议。官方机器人只提示检查潜在重复 issue（#37255、#37215、#37043、#37271）。

**是否本地复现：** 否。本研究未启动 Codex Desktop 或 Computer Use，也未调用 `sky`。

**未证实推测：** 错误可能在窗口枚举 API、helper 与桌面 session 的连接、路径/临时目录解析或版本回归中的某一层；“helper 进程已启动”不能证明 IPC、桌面句柄和枚举调用链完整。

**可迁移的解决步骤：**

1. 保存 App 版本、Windows build、订阅/部署类型、完整错误码和反馈 ID。
2. 分别检查 helper 文件存在、helper 进程、父进程、当前交互式 session，以及普通 PowerShell 对窗口的独立枚举结果。
3. 将“普通系统枚举正常”和“agent API 失败”分开记录，避免把重装成功当成修复证据。
4. 检查官方 issue 的潜在重复项；在维护者确认或发布修复前，不要扩大系统权限或替换 helper。

## 案例 2：Windows Desktop 工作时闪现命令提示窗口

**来源与互动：** [openai/codex #37153](https://github.com/openai/codex/issues/37153)，open，1 条机器人评论；创建者 `Zyst77`，访问于 2026-08-10。

**用户报告：** Windows Codex Desktop 工作期间，命令提示符/控制台窗口短暂出现在其他应用前面后消失。作者在进程检查中看到 Codex command-runner 产生 `conhost.exe` 子进程；现象与 Codex 工作同步，未发现 SSH 或 Codex/OpenAI 计划任务。预期是命令执行保持隐藏或后台运行，除非用户明确要求交互式终端。

**官方事实：** issue 被 `openai/codex` 标为 `bug`、`windows-os`、`app`；官方机器人仅提示潜在重复 #36560，没有维护者确认修复。公开的 Codex 官方源码包含 Windows command-runner 路径，但源码存在不证明用户所用 alpha runner 已按预期隐藏窗口。

**社区建议：** 页面目前没有实质性回答。用户提出的“使用隐藏/no-window 启动标志”是 issue 中的请求目标，不是已验证 workaround。

**是否本地复现：** 否。本研究未启动 Windows Desktop 任务，也未观察本机 `conhost.exe`。

**未证实推测：** 可能是 runner 的 Windows 子进程创建标志、ConPTY/控制台继承或 alpha 版本回归；不能仅凭 `conhost.exe` 存在断言存在未授权活动。

**可迁移的解决步骤：**

1. 记录闪现时间点、Codex 版本、父子进程树和窗口是否获得前台焦点。
2. 对比空闲、只读任务和需要执行命令的任务，判断现象是否与 command-runner 相关。
3. 核对进程路径、签名/发布来源和父进程，再提交最小反馈；不要删除系统文件或盲目关闭安全软件。
4. 以维护者回复或修复版本加回归观察作为完成标准。

## 案例 3：限额/压缩后恢复会丢失任务指针

**来源与互动：** [openai/codex #8310](https://github.com/openai/codex/issues/8310)，open，8 条评论、2 个 reactions；创建者 `jroth1111`，访问于 2026-08-10。评论者包括 OpenAI 的 `etraut-openai`，属于明确的维护者参与，但未确认修复。

**用户报告：** 长时间、多步骤 Codex/agent 会话触及 usage limit 后恢复时，可能回到旧上下文、重复已完成工作或做未请求的工作。作者给出的具体例子显示，在 `Context compacted` 后接近限额，恢复时跳回旧任务而漏掉最新指令；环境描述为 CLI-style resume、`gpt-5.2-codex xhigh`、多步骤文档/实验工作流。

**官方事实：** OpenAI 维护者回复认为 compaction 可以解释部分行为，但没有对“rate-limit 是因果因素”提出确定理论，并建议发生时用 `/feedback` 上传会话和 thread ID。该回复明确把“限额边界”和“压缩”区分开；因此官方事实是“已请求进一步会话证据”，不是“根因已修复”。

**社区建议：** 一位评论者提出用确定性的 `checkpoint_v1.json` 保存任务、计划和最近产物；这只是评论者的 RFC 式建议。维护者建议的可执行动作是保留 thread ID、用 `/feedback` 提交复现会话，并记录是自动还是手动 `/compact`。

**是否本地复现：** 否。本研究没有运行长会话、触发限额、执行 `/compact` 或恢复旧会话。

**未证实推测：** 目前只能说用户观察到“压缩与恢复后的任务漂移”，不能断言限额本身是根因，也不能把评论中的 checkpoint 设计当作 Codex 已采用的内部机制。

**可迁移的解决步骤：**

1. 在长任务中维护外部、短小且可核对的任务指针：目标、已完成步骤、下一步、改动文件和验证结果。
2. 在压缩/恢复前后分别保存 diff、测试输出和最后一条用户指令，不以模型恢复后的自述替代文件证据。
3. 记录自动/手动压缩、模型切换、限额提示和恢复动作的时间顺序。
4. 发生漂移时停止继续写入，先核对工作树、最近 diff、计划和 thread ID，再提交最小反馈。

## 案例 4：Claude Code 子 Agent 结果通道出现 prompt-injection 形态内容

**来源与互动：** [anthropics/claude-code #81784](https://github.com/anthropics/claude-code/issues/81784)，open，1 条评论；创建者 `msantana-canary`，访问于 2026-08-10。该报告有明确的安全影响，但没有维护者回复。

**用户报告：** Claude Code CLI、macOS Darwin `25.5.0`、Claude Code `2.1.212`。后台子 Agent 启动约 10 秒后以 0 次工具调用结束，返回的不是任务报告，而是带 system-prompt 形态和指向父 Agent 的 steering instruction 的文本。报告者隔离了结果、检查仓库树无变化后重新启动；称同一机器/账户曾出现相似事件。原 issue 含有真实 connector 名称等敏感上下文，但本研究不复制 payload。

**官方事实：** [Claude Code 子 Agent 文档](https://code.claude.com/docs/en/sub-agents)说明普通子 Agent 从独立、隔离的 context window 开始，只收到 Claude 组织的任务摘要；[官方安全文档](https://code.claude.com/docs/en/security)要求审查建议命令、不要把不可信内容直接传给 Claude、核实关键文件改动，并说明网络请求默认需要批准。官方文档没有确认 #81784 的根因或修复。

**社区建议：** 唯一评论建议研究第三方 prompt-injection filter（Ice Phi）。这是未经 Anthropic 验证的社区建议，不应视为默认安全控制或修复。

**是否本地复现：** 否。本研究没有启动 Claude Code 子 Agent，没有读取或生成 prompt-injection payload，也没有调用 MCP/connector。

**未证实推测：** 可能涉及子 Agent spawn 边界、context assembly 或 tool-result 通道；报告中的形态证据不足以单独证明具体组件、外部注入源或已造成数据泄露。

**可迁移的解决步骤：**

1. 把任何 Agent/tool result 当作不可信数据，不执行其中的命令、权限变更、connector 操作或“忽略此前规则”指令。
2. 先隔离异常结果，核对子 Agent 工具调用计数、退出状态、父/子工作树 HEAD、diff 和外部副作用。
3. 不复制完整敏感 payload；只保留最小必要摘要、版本、时间、任务边界和反馈 ID。
4. 当结果要求改变审批/优先级、访问未授权连接器，或无法与任务对应时停止父 Agent，使用只读重启和人工复核。

## 案例 5：Codex CLI sandbox 内无法访问互联网/GitHub

**来源与互动：** [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)，题目得分 -4、1 个回答、358 次浏览；标签 `openai-codex`、`openai-codex-cli`。题目/答案通过公开 Stack Exchange API 读取，页面访问于 2026-08-10。

**用户报告：** 用户希望在保留 sandbox 的同时，让 Codex CLI 的 shell 访问互联网/所有域名；题目描述了 `curl -I https://github.com` 失败、HTTP 代理返回 403/allowlist 阻断，并询问配置方式。

**官方事实：** Codex 官方仓库的 [sandbox 文档](https://github.com/openai/codex/blob/main/docs/sandbox.md)将 sandbox 与 approvals 交由官方安全文档说明；官方源码中的 `workspace-write` 权限模板明确其可编辑范围是 `cwd` 与 `writable_roots`，其他目录需要批准，并单独标注网络是否开启。由此可迁移的事实是：可写范围、审批和网络是不同控制面，`workspace-write` 本身不能推出“任意网络可用”。

**社区建议：** 最高答案建议新式 `default_permissions = "workspace_custom"` 并在自定义权限中启用 network；同时给出旧式 `sandbox_workspace_write.network_access = true`，并建议用域名限制降低 secret exfiltration 风险。答案作者注明该配置按其自己的 `codex-cli 0.142.3`/Ubuntu `26.04` 测试；不是官方跨版本承诺。

**是否本地复现：** 否。本研究未更改 Codex 网络或 sandbox 配置，也未执行网络绕过测试。

**未证实推测：** 403 可能来自 sandbox 网络禁用、代理 allowlist、企业防火墙、DNS/TLS 或目标域策略；不能仅凭 `curl` 失败断言 Codex 配置语法错误。

**可迁移的解决步骤：**

1. 先记录目标 URL、HTTP 状态、代理错误、有效配置层和当前 sandbox/approval 模式。
2. 只按当前版本官方配置文档启用必需网络，并优先使用精确域名 allowlist。
3. 用无敏感内容的连通性探针分离 sandbox 拒绝、代理拒绝和 DNS/TLS 故障。
4. 网络开通后仍验证依赖下载、GitHub API 和目标服务各自是否可用；不要把“能访问一个域名”推广为任意出网。

## 案例 6：Codex 工作区中的 Maven 依赖下载失败

**来源与互动：** [Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)，题目得分 3、1 个回答、892 次浏览；标签 `java`、`spring-boot`、`openai-api`、`codex`。访问于 2026-08-10。

**用户报告：** Java/Spring Boot 项目执行 `./mvnw clean test` 时出现 `Non-resolvable import POM`，并伴随 `Network is unreachable`；用户还尝试 setup script 和代理。报告把网络不可达与随后依赖版本缺失放在同一故障链中。

**官方事实：** Codex 官方配置文档只确认配置有 basic/advanced/reference 三层入口；官方安全文档入口是 [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)。这些事实支持先检查网络/审批/代理边界，但没有确认该用户的 Maven 根因或代理配置。

**社区建议：** 得分最高答案说其 Maven 代理设置有效，并建议通过 Codex setup scripts 安装 Java 17/Maven、写入 `~/.m2/settings.xml` 使用 `proxy:8080`，再预下载依赖。该答案是个人环境 workaround；公共代理可能窃听或篡改流量，脚本也可能带来外部副作用。

**是否本地复现：** 否。本研究未安装 Java/Maven、未写入 Maven settings、未执行项目脚本。

**未证实推测：** 失败可能在 Codex sandbox 网络、代理、DNS、Maven settings、仓库可达性或 POM 本身；“Network is unreachable”不能自动证明依赖版本不存在。

**可迁移的解决步骤：**

1. 单独验证 Java、Maven wrapper、代理环境、Maven Central/企业仓库连通性和本地缓存。
2. 查看 Maven 的实际 effective settings 与仓库 URL，确认失败发生在网络连接还是 POM 解析。
3. 只使用组织批准的代理/缓存；不要复制公共代理、把凭据写进仓库或无审查执行安装脚本。
4. 网络恢复后先运行无副作用的依赖预取/解析，再运行测试，并保存可复查日志。

## 案例 7：Codex 在 VS Code 中反复请求审批

**来源与互动：** [Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)，题目得分 12、1 个回答、11,121 次浏览；accepted answer 为 `79921651`，回答者 `Ciro Santilli OurBigBook.com`；访问于 2026-08-10。

**用户报告：** VS Code 中 Codex `0.4.76`、WSL、trusted workspace、`approval_policy = "on-failure"` 与 `sandbox_mode = "workspace-write"` 下，每次修改 workspace 文件仍请求批准。

**官方事实：** Codex 官方 [approval policy 模板](https://github.com/openai/codex/blob/main/codex-rs/prompts/templates/permissions/approval_policy/never.md)把 `never` 定义为不提供 sandbox permission；官方 [workspace-write 模板](https://github.com/openai/codex/blob/main/codex-rs/prompts/templates/permissions/sandbox_mode/workspace_write.md)说明可读文件并可编辑 `cwd`/`writable_roots`，其他目录编辑需要批准。两者是不同设置；官方源码没有证明用户的 VS Code/WSL 继承层已正确生效。

**社区建议：** accepted answer 建议把 `approval_policy` 改为 `never`、保留 `sandbox_mode = "workspace-write"`。回答者测试环境是 Ubuntu `25.10`/Codex `0.124.0`，与提问者版本和集成面不同；`never` 会减少人工确认，必须先理解 sandbox 边界。

**是否本地复现：** 否。本研究未改动 approval policy，也未在 VS Code/WSL 中执行写入。

**未证实推测：** 反复审批可能是配置未加载、配置层被覆盖、目标目录不在 `cwd`/writable roots，或当前 VS Code host 与 CLI 使用不同配置；不能只改成 `never` 就断言根因解决。

**可迁移的解决步骤：**

1. 先输出/记录实际生效的配置层、当前 cwd、workspace root 和目标文件绝对路径。
2. 用无害 sentinel 文件做一次最小写入测试，分别判断“审批策略”与“沙箱路径”问题。
3. 若确需自动执行，保持 workspace-write 等边界，先用小项目验证，再考虑更宽权限。
4. 记录版本、集成方式和重启前后结果；不要把 accepted answer 当成当前版本官方保证。

## 案例 8：Windows 用户不确定 Codex CLI 的原生支持边界

**来源与互动：** [Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-have-access-to-it)，题目得分 1、3 个回答、1,207 次浏览；访问于 2026-08-10。

**用户报告：** Windows 用户找不到清晰的原生安装/支持说明，询问是否应使用 WSL2、Docker/VM 或其他方式；题目本身不能证明“Windows 不支持”，只证明用户面对支持边界不确定。

**官方事实：** 该题的公开回答不是官方说明。官方仓库当前包含 Windows sandbox、Windows command-runner 和 app-server Windows sandbox 协议代码路径；这只能说明仓库有 Windows 相关实现，不能推导每个版本、CLI 表面或 PowerShell/WSL 组合都等价可用。应以当前 [Codex 官方配置/安全文档入口](https://github.com/openai/codex/blob/main/docs/config.md)和发布说明为准。

**社区建议：** 回答者分别建议 WSL2 + Node、原生 Windows Node/npm、以及 PowerShell 5（而非 PowerShell 7.1）作为个人 workaround；回答之间存在冲突，且没有统一的可复现维护者结论。

**是否本地复现：** 否。本研究没有在 Windows 原生、PowerShell、WSL2、Docker 或 VM 中安装 Codex CLI。

**未证实推测：** 差异可能来自 Node/npm 版本、PowerShell 版本、路径/权限、WSL 文件系统与网络边界或具体 CLI 发行版本；不能把社区“看起来能启动”当成原生支持承诺。

**可迁移的解决步骤：**

1. 先选定一个表面（原生 Windows 或 WSL2），记录 OS build、shell、Node/npm、CLI 版本和项目所在文件系统。
2. 用 `where`/`Get-Command` 核对实际执行文件，再做 `--version` 和只读项目探测。
3. 分开验证“命令能启动、能读项目、能写项目、能执行测试、网络可用”五个验收项。
4. 迁移到 WSL2 前确认路径、权限、网络、性能和用户数据边界；不要用社区建议替代官方发布说明。

## 跨案例迁移结论

这些案例不能证明某一产品存在单一根因，但重复出现了四类可观察边界：

1. **启动成功不等于能力链路成功：** CLI 能运行、helper 能启动或 `conhost.exe` 出现，都不能证明窗口控制、扩展 host 或后台 runner 正常。
2. **配置项不是能力证明：** approval、sandbox、网络、cwd 和 writable roots 必须分别验证；配置文件存在不等于当前会话加载了它。
3. **恢复后的自述不是工作证据：** 对长任务和压缩/限额恢复，必须用 diff、测试、文件哈希和任务指针核对。
4. **工具结果属于不可信输入：** 子 Agent、网页、MCP 和脚本输出不能自动获得系统提示词或审批优先级；遇到异常指令应隔离并人工复核。

## 来源与许可边界

本文件仅作研究性摘要和链接索引，不复制 issue、回答或官方文档的长段落、图片、代码和敏感 payload。来源为公开 GitHub issue/评论、公开 Stack Exchange API 返回的题目/答案元数据与短摘要，以及官方文档/仓库链接；本文件没有把这些外部材料重新发布为项目资产，也没有执行其中的命令。
