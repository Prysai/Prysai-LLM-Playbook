# Codex 工作面与入口真实问题研究（2026-08-10）

**状态：** `candidate`（已核对公开 GitHub 原始 Issue；未在本项目本地复现，也不是 OpenAI 官方故障清单）
**访问日期：** 2026-08-10（太平洋时间；GitHub API 返回的 Issue 时间为 UTC）
**研究旁线：** 只读；只新增本文件；未执行 Issue/评论中的命令，未读取、写入或处理秘密，未 commit，未 push。
**课程落点：** 重点服务书稿第 5 章《选择 Codex 工作面》和实验 007《行动边界》；也关联第 4、8、9、12、13、19 章。

## 研究方法与证据规则

本轮优先使用 `gh api` 读取公开的 `openai/codex` GitHub Issue 正文、标签、状态、时间和公开评论。Issue 正文是报告者对其环境与观察的原始记录；即使报告者写了“reproduced”“fully resolved”或给出详细日志，也只证明报告者声称观察到这些事实，不自动等于 OpenAI 官方确认或本项目独立复现。

证据等级按以下约定使用：

- **用户报告：** 公开用户描述的环境、症状或实验结果；本项目未复现。
- **独立复现：** 报告者声称在多个环境/配置中重复观察，但仍不是本项目复现；若没有第三方独立复现，不升级为官方确认。
- **官方确认：** Issue 中有维护者、官方文档或修复记录明确确认该具体行为/原因。下面没有把自动去重机器人评论算作官方确认。
- **本地复现：** 本项目在当前工作区或指定环境实际复现。本轮没有本地复现。
- **推测：** 报告者或研究者对根因的推断；只能作为待验证假设。

“已报告 workaround”只记录用户报告过的动作及其风险，不把它写成推荐修复。涉及代理、认证、环境文件或云端 Secret 时，本文件不复制凭据、完整认证 URL、个人路径、任务 ID 或外部帖子中的可执行命令。

## 摘要：用户真正遇到的是工作面错配

这些案例共同显示，Codex 的失败经常发生在“模型回答能力”之外：

| 工作面断言 | 不能替代的断言 | 本轮案例 |
| --- | --- | --- |
| 浏览器认证页面成功 | 客户端完成 token exchange 并能发起首个请求 | FP-S-01 |
| 配置里有 Provider/工具/目录 | 当前任务实际注册了工具、获得了写权限 | FP-S-02、FP-S-04 |
| Worktree 已创建或界面显示 worktree | Agent shell、patch、Git 和交付文件都在该 Worktree | FP-S-05、FP-S-06 |
| WSL/网络基础连通 | Desktop 管理的 Agent 进程继承了正确代理环境 | FP-S-03 |
| Cloud environment 已设置 | 自定义 setup 已执行、Secret 已注入运行时 | FP-S-07、FP-S-08 |
| 工具名称可见 | 最小只读调用能启动辅助进程 | FP-S-09 |
| 线程存在 | 当前客户端拥有可继续该线程的控制权 | FP-S-10 |

教学上最小而现实的规则是：先标出 `surface`（入口、客户端/CLI/Desktop/Cloud、OS、Provider、工作目录、认证模式），再分别验证“可见、可调用、可读、可写、可运行、可交付”。任何一个中间断言失败，都应停止扩大权限或改变环境。

## 问题记录

### FP-S-01：浏览器显示认证成功，但 Windows/WSL 的 Codex token exchange 失败

- **原始 URL：** https://github.com/openai/codex/issues/37467
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `windows-os`、`auth`、`CLI`、`app`、`connectivity`。
- **用户环境：** Windows 11 x64；Codex Desktop 与 Windows CLI；另在 WSL/Linux 中安装 CLI；ChatGPT Plus；报告版本为 Codex 0.147.0/CLI 0.147.0。
- **症状：** 浏览器 OAuth 页面提示成功并允许关闭，但客户端随后在 token exchange 阶段失败；device auth 也失败。报告者还描述了连接到 `auth.openai.com` 时的 DNS/HTTP 观察，以及普通网络换成手机热点后仍失败。
- **证据等级：** 用户报告；报告者自述跨 Windows Desktop、Windows CLI、WSL/Linux 和两条网络路径重复观察，属于“报告者自述独立/多环境复现”，不是本项目独立复现；未见维护者确认根因。
- **已报告 workaround 与风险：** 换手机热点、尝试 device auth、在 WSL 重装 CLI 均未解决。继续反复登录或切换网络可能制造更多会话状态，不能证明认证已完成；不要索取或粘贴 token，也不要把浏览器页面成功当成客户端成功。
- **Field Guide 可教的最小排查：** 把认证拆成“授权页面完成 → 回调/客户端收到 → token exchange 完成 → 首个无副作用请求成功”四个检查点；只记录阶段、时间、错误类别和版本，不记录凭据。若第 3 或第 4 步失败，状态是 `blocked`/`unverified`，而不是“已登录”。
- **哪些不能宣称：** 不能宣称一定是 Cloudflare、网络、账号、WSL 或 OpenAI 服务端的单一根因；不能宣称 device auth 或手机热点是官方修复；不能把 ChatGPT 网页可登录外推为 Codex CLI/Desktop 可用。
- **当前状态：** Issue 在访问日仍为 `open`；本轮未发现官方修复版本或维护者确认。

### FP-S-02：自定义 Provider 会话只暴露 `image_gen`，shell/文件/浏览器工具消失

- **原始 URL：** https://github.com/openai/codex/issues/37718
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `windows-os`、`CLI`、`custom-model`、`tool-calls`。
- **用户环境：** Windows 11 x64；Codex Desktop Microsoft Store 26.803.5235.0、bundled CLI 0.147.0-alpha.6.5；另报告 npm CLI 0.147.0 和 0.148.0-alpha.5；自定义 OpenAI-compatible Provider/本地代理；模型为 gpt-5.6-sol/terra/luna。
- **症状：** 会话中模型只看到 `image_gen`；shell、filesystem、browser、web 等工具没有注册。报告者在 debug 记录中看到 `dynamic_tool_count=0`，并称最小配置、换模型、换 Provider 和新 `CODEX_HOME` 仍然出现。
- **证据等级：** 用户报告；报告者自述同机多个版本、Desktop/CLI、多个 Provider 的重复测试；未见官方确认，也未在本地复现。
- **已报告 workaround 与风险：** 报告没有给出可靠 workaround。不要通过安装不明插件、扩大 sandbox、粘贴 API key 或切换到不受信任的 Provider 来“恢复工具”；这会增加数据和权限风险，且不能证明工具集合已正确注册。
- **Field Guide 可教的最小排查：** 开始任务先记录实际工具清单和 Provider/auth/version；做一个只返回固定文本的无副作用请求，再单独验证目标工具是否“注册”和“可调用”。把“上游 API 能接收 tools”与“Codex 当前会话注册 tools”分开。
- **哪些不能宣称：** 不能宣称所有自定义 Provider 都缺工具、所有 gpt-5.6 模型都受影响、`dynamic_tool_count=0` 的内部根因已确定，或更换配置一定修复。
- **当前状态：** Issue 在访问日为 `open`；报告者提到的版本回归和内部工具注册判断没有得到官方确认。

### FP-S-03：Windows Desktop 管理的 WSL Agent 代理变量为空，导致连接失败

- **原始 URL：** https://github.com/openai/codex/issues/37662
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `windows-os`、`app`、`connectivity`、`app-server`。
- **用户环境：** Windows 11；Codex Desktop 26.803.5235.0；WSL2 Ubuntu 24.04；代理网络；报告者比较了 Desktop-W​​SL、原生 Windows、WSL 中手动启动 CLI、WSL `curl` 和 TUN 模式。
- **症状：** Desktop 管理的 WSL app-server 请求超时/断流；报告者观察到该进程的大小写代理变量不一致或为空，而同一 WSL 的手动 CLI 和基础 HTTP 连通性正常。
- **证据等级：** 用户报告；报告者自述有对照矩阵和本机进程环境检查，属于报告者自述独立复现；其“WSLENV 大小写处理是根因”的部分明确是推测，未见官方确认。
- **已报告 workaround 与风险：** 报告者称启用代理客户端 TUN 模式，或在用户级 `.codex/.env` 中补充大写代理变量后恢复。风险是把代理地址或认证信息持久化到环境文件、误提交或泄露凭据；TUN 也会改变整机网络范围，不能作为无条件建议。
- **Field Guide 可教的最小排查：** 分别核对 Windows 宿主、普通 WSL、Desktop 管理的 app-server 实际看到的代理变量；只记录“是否存在、协议、脱敏主机/端口”，不输出值。先做不带秘密的基础连通性检查，再做 Codex 首个请求；一次只改变一个变量。
- **哪些不能宣称：** 不能宣称所有 Windows/WSL 代理都存在大小写 bug、`.codex/.env` 是官方推荐修复、TUN 一定安全，或基础 `curl` 成功就等于 Codex Agent 已认证并可调用工具。
- **当前状态：** Issue 在访问日为 `open`；没有发现维护者对报告者的根因或 workaround 做官方确认。

### FP-S-04：项目配置了第二个目录，但新任务只获得主目录写权限

- **原始 URL：** https://github.com/openai/codex/issues/37731
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `sandbox`、`app`。
- **用户环境：** macOS 26 arm64；Codex App 26.803.41515；Pro；一个项目包含两个本地仓库；报告者退出并重启 Desktop 后创建新任务。
- **症状：** 新任务注入的 `workspace_roots` 只有主仓库；第二目录可以通过更宽的读取能力看到，但不在可写权限项中，修改时需要额外批准。这里的关键是“项目配置存在”与“新任务实际获得权限”不一致。
- **证据等级：** 用户报告；报告者给出重启前配置、新任务上下文和写入行为的对照；没有本项目复现或官方确认。
- **已报告 workaround 与风险：** Issue 没有可靠 workaround。直接批准第二目录的写入可能把一个未核对的路径加入任务权限；把所有父目录设为可写会扩大影响面。
- **Field Guide 可教的最小排查：** 任务开始前列出目标目录；分别核对当前工作目录、workspace roots、可读路径和可写路径；先做只读存在性检查，再用无敏感临时文件做最小写入探针。若需要审批，记录为“权限事实”，不自动扩大范围。
- **哪些不能宣称：** 不能宣称所有多目录项目都会丢失权限、读取能力必然来自同一种 sandbox 规则，或重启一定能同步项目配置。
- **当前状态：** Issue 在访问日为 `open`；未见维护者确认。

### FP-S-05：Windows linked Worktree 中的 `apply_patch` 被误判为项目外

- **原始 URL：** https://github.com/openai/codex/issues/37522
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `windows-os`、`sandbox`、`CLI`、`tool-calls`。
- **用户环境：** Windows 11 x64 原生执行；Codex CLI 0.147.0；PowerShell 7.6.4；Git linked worktree；报告者称 sandbox 为 workspace-write，并同时指定 worktree 工作目录和额外目录。
- **症状：** 对 linked worktree 根目录下的相对文件做 `apply_patch` 时，收到“writing outside of the project / rejected by approval settings”；外部检查显示目标文件没有创建，Git 工作树保持干净。
- **证据等级：** 用户报告；报告者提供了外部文件存在性、退出状态和 Git 状态检查，属于报告者自述的可观察复现；本项目没有在 Windows linked worktree 上复现；未见官方确认。
- **已报告 workaround 与风险：** Issue 未提供已验证 workaround。改用其他写入通道可能绕过具体工具限制，也可能绕过原本应有的路径安全检查；扩大 `--add-dir` 或批准父目录不能代替确认 canonical path。
- **Field Guide 可教的最小排查：** 先在任务状态卡记录 `pwd`、Git worktree 根、`.git` 是目录还是 pointer file、sandbox 和 approval；用只读 Git/status 检查确认目标；只对单个无敏感文件做最小写入探针。写入失败时停止，不把“权限提示”解释成文件损坏或自行扩大授权。
- **哪些不能宣称：** 不能宣称 `apply_patch` 在所有 Windows linked worktree 都失败、`--add-dir` 一定有效、项目根判断的内部实现已确定，或换写入工具是安全修复。
- **当前状态：** Issue 在访问日为 `open`；正文提到关联 Issue，但未见该具体案例的官方根因/修复确认。

### FP-S-06：界面显示已切到 Worktree，但 Agent 仍在原 checkout 工作

- **原始 URL：** https://github.com/openai/codex/issues/34352
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `app`、`session`。
- **用户环境：** macOS 26.715.52143；Pro；Codex Desktop；从普通 local checkout 选择 “Continue in worktree”。
- **症状：** 线程列表和 IDE 打开动作指向 worktree，但 `Copy working directory`、Environment 面板、Agent shell、可写 workspace root 和 Git 操作仍指向原 checkout。报告者因此担心分支、文件、测试和构建被写入原目录。
- **证据等级：** 用户报告；报告者描述了多个入口的路径对照；没有本项目复现或官方确认。Issue 页面有自动去重机器人提示，不能算维护者确认。
- **已报告 workaround 与风险：** 没有可靠 workaround。用户若按界面路径手工复制改动，可能漏文件、覆盖无关改动或造成两棵树分叉；在确认路径前不应继续写入、构建或合并。
- **Field Guide 可教的最小排查：** Worktree 切换后分别确认线程元数据、Agent shell `cwd`、workspace root、终端、IDE 路径和 `git worktree list`；先做只读路径回显和 Git 状态，再做最小写入。六者不一致时将任务标为 `blocked`，人工确认目标树。
- **哪些不能宣称：** 不能宣称 UI 上的 worktree 标记等于运行时已切换、所有入口都共享同一目录，或把改动复制回原目录视为安全合并。
- **当前状态：** Issue 在访问日为 `open`；自动评论列出潜在重复项，但未给出修复结论。

### FP-S-07：Codex Cloud 长时间停在 `Running setup scripts`

- **原始 URL：** https://github.com/openai/codex/issues/32209
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `codex-web`、`tool-calls`。
- **用户环境：** Codex Cloud/Web；ChatGPT Pro；公开仓库；自定义 Cloud environment 和 setup script；报告者比较了启用/禁用 post-setup cache、重置 cache、交互式环境终端和最小 dummy task。
- **症状：** 内置 runtime 配置结束后一直显示 `Running setup scripts...`，自定义脚本最开始的可观察 marker 从未出现；即使 dummy task 不读写仓库也无法进入第一步。报告者称手动取消，且在另一个实际容器中 setup 脚本曾成功运行。
- **证据等级：** 用户报告；报告者自述有 cache/任务类型对照，属于报告者自述独立复现；不是本项目 Cloud 本地复现，也未见官方确认。
- **已报告 workaround 与风险：** 重置或关闭 cache、打开交互式终端、使用最小任务均未解决。反复重启 Cloud task 可能造成重复安装、重复外部请求或资源消耗；不要因为日志停在 setup 就假设脚本已执行。
- **Field Guide 可教的最小排查：** 在 setup 第一行放无秘密的唯一 marker；把“内置 runtime 完成、custom setup 进程启动、第一条 marker、setup 成功、任务首个命令”分别记录。超过预设时间无新事件就停止并取消，保留状态，不无限重试。
- **哪些不能宣称：** 不能宣称是 cache、脚本内容、仓库、额度或浏览器依赖的单一根因；不能把另一个容器成功外推到当前 environment；不能把取消后的 Cloud task 写成已验证失败原因。
- **当前状态：** Issue 在访问日为 `open`；未见维护者确认或修复版本。

### FP-S-08：Cloud environment 已配置 Secret，但 Cloud task 运行时看不到

- **原始 URL：** https://github.com/openai/codex/issues/34460
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `app`。
- **用户环境：** macOS Desktop 26.715.52143；Pro；Cloud environment 中配置了 `GROQ_API_KEY` Secret；任务运行在该 Cloud environment。
- **症状：** Secret 在配置界面列出，但任务运行时检查到对应环境变量不存在。报告者期望至少能检测“变量存在”而不显示值；Issue 没有提供 Secret 值或完整任务细节。
- **证据等级：** 用户报告；未提供本项目复现或官方确认。
- **已报告 workaround 与风险：** 没有可靠 workaround。把 Secret 明文写进 prompt、仓库、setup 输出或日志是高风险且不能用于排查；直接重建 Secret 也可能造成轮换和权限范围变化。
- **Field Guide 可教的最小排查：** 只检查变量是否存在、长度是否为非零或调用是否得到明确的“未注入”状态，不打印值；分别核对 Secret 配置层、environment 版本、task 绑定和 runtime 进程。未注入时暂停外部 API 调用，不用 dummy key 冒充真实凭据验证。
- **哪些不能宣称：** 不能宣称 Cloud Secret 普遍不会注入、某个 Provider 一定不支持，或把“配置页面可见”当成“运行时可用”。
- **当前状态：** Issue 在访问日为 `open`；未见官方确认。

### FP-S-09：Windows Computer Use 工具可见，但只读发现调用在 helper 启动前 `spawn EPERM`

- **原始 URL：** https://github.com/openai/codex/issues/37845
- **访问日期：** 2026-08-10；页面状态为 `closed`；标签包括 `windows-os`、`tool-calls`、`app`、`computer-use`。
- **用户环境：** Windows 11 x64 原生 Windows task；Codex Desktop MSIX 26.803.5235.0；Computer Use plugin 26.803.41515；CLI/Doctor 0.147.0；PowerShell 7.6.4；报告者称插件、签名 helper、缓存和 manifest 均存在。
- **症状：** `sky.list_apps()` 和 `sky.list_windows()` 这两个只读发现调用在 native helper 启动阶段立即返回 `spawn EPERM`；同一安装中的浏览器/Chrome 工作面仍可用。
- **证据等级：** 用户报告；报告者自述做了完整 runtime/plugin 文件比对、签名/ACL/事件日志检查和多次重试，属于报告者自述独立/本机复现，但不是本项目本地复现；Issue 已关闭不等于根因或修复获得官方确认。
- **已报告 workaround 与风险：** 重装插件、重启、检查 runtime、禁用 node sandbox 等尝试没有改变结果；没有可靠 workaround。直接运行 helper、修改 ACL/注册表、关闭安全软件或放宽系统策略会扩大系统风险，不应作为默认教材动作。
- **Field Guide 可教的最小排查：** 按四层验证“工具名可见 → 只读发现能启动 → 目标状态可读 → 外部输入动作成功”；先做最低风险发现调用，记录错误类别、版本和 helper 是否存在，不直接点击、截图或输入。helper 启动失败就交付为 `blocked`。
- **哪些不能宣称：** 不能宣称签名有效就一定能 spawn、`EPERM` 一定由 Defender/AppLocker 引起、浏览器可用就代表 Computer Use 可用，或 Issue 关闭就代表用户可升级到某个修复版本。
- **当前状态：** 页面在访问日为 `closed`；API 未显示可据此确认根因的官方修复说明，本项目未复现；应把“关闭状态”和“已修复”分开写。

### FP-S-10：旧客户端仍占有线程，新客户端被提示“在另一个应用中打开”

- **原始 URL：** https://github.com/openai/codex/issues/37856
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `extension`、`app-server`。
- **用户环境：** VS Code Web；Linux extension host；Windows 11 Firefox 浏览器；多个 VS Code Web 窗口连接到相同远程 Codex 状态。
- **症状：** 一个 webview reload/disconnect 后，另一个客户端继续同一线程时收到“chat is open in another application”；UI 不显示占有者，也没有 take-over/release 操作。报告者从多个 extension host/app-server 进程和日志广播观察到旧客户端可能继续存活。
- **证据等级：** 用户报告；Issue 给出事件顺序和日志类别，但没有本项目复现或官方确认。页面自动去重评论仅是机器人提示。
- **已报告 workaround 与风险：** 用户只能寻找并关闭旧客户端或手工终止进程。强行杀进程可能丢失未持久化输出、工具状态或工作树变更；在终止前应保存 diff、日志和最后检查点。
- **Field Guide 可教的最小排查：** 分开核对 thread ID、workspace、客户端窗口、app-server 进程和 Git 工作树；先确认没有第二客户端继续同一线程/目录，再关闭明确的旧客户端。所有权不明时开新任务并携带可验证摘要，不让旧对话历史代替状态证据。
- **哪些不能宣称：** 不能宣称所有多窗口都会 stale owner、手工终止进程一定安全，或线程数据存在就等于当前客户端能接管。
- **当前状态：** Issue 在访问日为 `open`；未见维护者确认或官方 take-over 修复。

### FP-S-11：普通 API-key Provider 的配置接受了多 Agent，但没有第一方 Ultra multi-agent 行为

- **原始 URL：** https://github.com/openai/codex/issues/37858
- **访问日期：** 2026-08-10；页面状态为 `open`；标签包括 `CLI`、`custom-model`、`subagent`。
- **用户环境：** Codex CLI 0.147.0；报告者另提到近期 Desktop/app-server；macOS；ChatGPT Pro 与独立 API-key/custom `model_providers`；Responses-compatible Provider；模型为 gpt-5.6-sol/terra/luna。
- **症状：** 单 Agent inference 和 reasoning effort 可以工作，但报告者称 Responses `multi_agent` 在普通 API endpoint 上被拒绝或没有产生 subagent tree；配置接受 Ultra/multi-agent 并不等于第一方 ChatGPT-auth session 的服务器端编排行为。
- **证据等级：** 用户报告；报告者引用自己的测试和相关 Issue，未见官方确认该产品边界；本项目未执行 Provider 请求，也未使用任何 API key。
- **已报告 workaround 与风险：** 报告者建议比较默认 ChatGPT-auth Provider、普通 API Provider、单 Agent 与 client-local spawn；这只是诊断对照，不是保证修复。为了“试出差异”而把秘密发给第三方 endpoint、打开不兼容的 beta 参数或扩大 Provider 权限，风险高且不可逆性不同。
- **Field Guide 可教的最小排查：** 建立能力矩阵：认证方式、Provider、模型、单 Agent、client-local delegation、server-side multi-agent、工具集合；先保存最小单 Agent 成功基线，每次只改一个变量。若目标能力不成立，明确降级为单 Agent/人工交接并记录状态。
- **哪些不能宣称：** 不能把 Issue 中“ChatGPT-backend-only”等报告者判断写成永久官方产品规则；不能宣称所有 Responses-compatible Provider 都缺少 multi-agent，也不能把配置被接受或 reasoning effort 成功写成 subagent tree 已成功。
- **当前状态：** Issue 在访问日为 `open`；有自动去重评论指向另一 Issue，但未见维护者确认或修复公告。

## 面向第 5 章与实验 007 的最小排查卡

学习者不需要一开始采集完整诊断包，只需把以下卡片填完整；任何空白都应影响下一步授权和状态判断：

```text
date_and_timezone:
surface: desktop | cli | vscode | cloud | wsl | other
client_and_version:
os_and_runtime:
provider_and_auth_mode:
workspace_or_worktree:
target_path_or_cloud_environment:
expected_capability:
observed_capability:
last_confirmed_checkpoint:
read_evidence:
write_evidence:
run_evidence:
external_side_effect_seen:
reported_workaround_and_risk:
safe_next_check:
stop_condition:
status: passed | unverified | blocked
```

推荐的检查顺序是：

1. 识别入口和实际执行位置：Desktop、CLI、VS Code、WSL、Cloud、Worktree 不能只看名称判断。
2. 识别认证阶段：页面、回调、token exchange、首个请求分别记录。
3. 识别当前权限：项目配置、workspace root、可读、可写、可执行是不同事实。
4. 识别实际工具：工具可见、工具注册、只读调用成功、写入/点击成功分开记录。
5. 识别工作树：`cwd`、Worktree、Git 状态、IDE 打开的目录和交付目录必须对齐。
6. 为长等待和自动重试设停止点：重试前检查是否已经产生文件、请求或其他副作用。
7. 只有在证据对齐后才进入写入、安装、外部 API、提交、推送或发布。

## 对教材可安全宣称的结论

- 可以教：界面状态、配置存在、登录页面成功、工具名称可见、Worktree 标记和 Cloud setup 日志都只是中间证据。
- 可以教：遇到工作面不一致时，最小排查是读事实、保存检查点、做无副作用探针、一次只改变一个变量，并在权限/路径/所有权不明时停止。
- 可以教：用户报告中的 workaround 需要记录风险和适用条件，不能直接转写成官方支持矩阵。
- 可以教：Windows、WSL、Cloud、Worktree、Provider 和客户端版本会共同决定行为；不能从一次成功外推到另一个入口。

## 不能从本轮研究宣称的内容

- 不能宣称上述任一 Issue 的根因已经由 OpenAI 官方确认。
- 不能宣称任何 Issue 的 `closed` 状态等于已修复、已发布或所有用户可用。
- 不能宣称本项目完成了 Windows、WSL、Cloud、Worktree、OAuth、Computer Use 或自定义 Provider 的本地复现；本轮没有执行帖子命令，也没有调用外部 Provider/Cloud。
- 不能宣称用户报告中的配置文件、TUN、重启、换网络、重装插件或切换入口对其他账户、地区、版本安全有效。
- 不能把公开 Issue 的诊断推测写成产品内部实现、服务端状态、官方支持政策或固定兼容性规则。

## 未能核对的地方

- 本轮没有把 Reddit、Stack Overflow 或需要登录的论坛作为证据来源；没有把搜索摘要、转载或无法打开的页面替代原文。
- 没有对上述案例做第三方独立复现或本项目本地复现，因此没有任何一条标为“本地复现”。
- 没有发现维护者对本轮选取案例给出足以确认根因和修复版本的公开回复；自动去重机器人评论不算官方确认。
- 没有核对用户报告中未公开的附件、私有 Cloud task、日志原件、账户状态或实际秘密注入内容。
- 没有执行任何 Issue 正文或评论中的命令，也没有验证报告者声称的 workaround 是否仍然有效。

## 来源与资产边界

本文件只对公开 Issue 的问题结构做原创中文摘要，并链接回原始页面；没有复制外部代码、图片、日志附件、凭据或 Skill 指令。当前不新增可发行外部资产，因此没有改动 `docs/sources/asset-register.md`。正式把这些案例写入章节前，应重新访问原 URL，记录维护者回复、关联 PR、修复版本和当日状态。

**研究交付状态：** `candidate`。目标研究文件已完成；章节正文和实验 007 未在本旁线中修改。
