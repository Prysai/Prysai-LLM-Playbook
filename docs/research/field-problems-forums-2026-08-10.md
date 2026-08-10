# Codex / AI coding agent 真实工作面问题：论坛与公开 issue 研究

**研究日期：** 2026-08-10
**状态：** candidate（已完成来源访问与整理；未做本地复现，也未把论坛建议升级为官方结论）
**范围：** Codex/AI coding agent 的权限、Windows、VS Code、sandbox 网络和目录访问。
**执行边界：** 只读访问 Stack Exchange API、Stack Overflow 页面链接和 `openai/codex` 的公开 GitHub issue；没有执行帖子中的命令，没有读取秘密，没有提交或推送。

## 如何读这些记录

- **用户报告：** 原作者的环境、症状或复现叙述。
- **回答者建议：** 社区回答中的 workaround；不等于产品承诺。
- **官方确认：** 官方文档、维护者明确回复或官方代码/发布说明。本轮没有把普通 issue 作者当作官方确认。
- **本地复现：** 本研究没有做本地复现，因此均不标记为本地复现。
- **推测：** 原作者或回答者对根因的判断，需保留不确定性。

帖子时间戳由源站返回；本文件只声明“2026-08-10 可访问”，不把源站时间戳当作本地验证过的时间线。

## 可教的案例

### 1. sandbox 内访问 GitHub 被网络 allowlist 拦截

- **原始 URL：** [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-withi)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API 的 question/answer 响应可访问，原始页面链接可定位。
- **作者环境：** Codex CLI；`config.toml` 使用 `sandbox_mode = "workspace-write"`；希望保留 sandbox，同时让 shell 访问互联网。
- **具体症状：** `curl -I https://github.com` 失败，报告中出现 `curl: (7) CONNECT tunnel failed, response 403`、`x-proxy-error: blocked-by-allowlist`。
- **证据等级：** 用户报告；回答者建议；推测（代理模式可能要求应用遵守代理环境变量）。没有本地复现或官方确认。
- **回答中的 workaround 及风险：** 回答者建议在 Codex 配置中开启 workspace 网络，或按域名配置网络代理/allowlist；回答还声称 `curl`/`wget` 等通常会遵守 `HTTP_PROXY`/`HTTPS_PROXY`，但某些程序可能不会。风险是扩大出网范围会增加源码、环境变量或秘密外传面；公共代理配置还可能泄露流量或不可信地改写内容。
- **Field Guide 最小排查：** 先区分“sandbox 禁止网络”“代理 allowlist 拒绝”“DNS/TLS/企业防火墙拒绝”；记录实际 URL、HTTP 状态、代理错误和当前有效权限配置；只为必要域名开通，并用无秘密的连通性测试验证。
- **不能宣称：** 不能说 `workspace-write` 自带互联网；不能说开启网络后所有 CLI 都能联网；不能把回答者的配置片段当成当前版本的官方语法；不能为了省审批而直接使用 full access。

### 2. Windows 用户不知道 Codex CLI 是否原生支持

- **原始 URL：** [Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API question/answers 可访问。
- **作者环境：** Windows 11；PowerShell / Command Prompt；WSL2 已安装；询问原生支持、WSL2/Docker/VM workaround 及限制。
- **具体症状：** 作者在官方文档和 release 页面没有找到明确的 Windows 安装说明，因此无法判断“未支持”还是“缺少文档”。
- **证据等级：** 用户报告；回答者建议；推测。该题没有可据此得出的官方确认，回答之间也存在冲突：一个回答建议 WSL2，另一个回答声称可在原生 Windows 安装。
- **回答中的 workaround 及风险：** 社区建议包括 WSL2、原生 Node/npm 安装、PowerShell 5 与 PowerShell 7.1 的差异。风险是把未经官方确认的社区步骤误当成支持矩阵；WSL2 还会引入 Windows/ Linux 文件路径、权限、网络和性能边界。
- **Field Guide 最小排查：** 先记录 Codex 版本、安装来源、`where`/PATH 解析到的实际可执行文件、shell 版本、WSL 发行版和项目所在文件系统；再做一个无副作用的版本检查和只读项目探测。
- **不能宣称：** 不能仅凭这条帖子宣称 Windows 原生支持或不支持；不能宣称 WSL2 与原生环境行为等价；不能把“命令能启动”当成 sandbox、VS Code 集成和文件写入都已验证。

### 3. VS Code 扩展 `spawn UNKNOWN`，但 CLI 能手动启动

- **原始 URL：** [Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API question 可访问；无回答。
- **作者环境：** Windows；企业托管环境；禁止使用 WSL；VS Code 最新 stable；PowerShell Constrained Language Mode；Codex CLI `0.118.0`。
- **具体症状：** 扩展启动立即失败：`Failed to start Codex process: spawn UNKNOWN`。`where.exe codex`、`codex --version`、手动 `codex app-server` 和 VS Code integrated terminal 均正常。
- **证据等级：** 用户报告；推测（作者认为可能是扩展 host / native Windows spawn，而不是 PATH）。没有回答、官方确认或本地复现。
- **回答中的 workaround 及风险：** 本题没有可靠 workaround。可教的是保留日志、对比扩展 host 与交互式终端的环境，不要盲目反复重装。企业策略、Constrained Language Mode、`.cmd` shim 与 Node child-process 启动方式都可能改变结果；绕过企业控制或切换到未批准运行环境有安全与合规风险。
- **Field Guide 最小排查：** 分别记录 VS Code 版本、扩展版本、CLI 版本、`where.exe` 所有结果、扩展 host 日志、终端 shell/策略和是否为 `.exe`/`.cmd` shim；先证明“CLI 可运行”与“扩展可 spawn”是两个独立验收项。
- **不能宣称：** 不能把 PATH 正常等同于扩展可用；不能把问题归因于单一的 Windows PATH；不能建议用户绕过企业策略。

### 4. `approval_policy = "on-failure"` 仍然逐文件询问

- **原始 URL：** [Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API question 和 accepted answer 可访问。
- **作者环境：** VS Code；Codex `0.4.76`；Windows Subsystem for Linux 开关已启用；workspace trusted；配置为 `approval_policy = "on-failure"`、`sandbox_mode = "workspace-write"`。
- **具体症状：** 每次修改 workspace 中的文件都要求批准。
- **证据等级：** 用户报告；回答者建议（accepted answer）；推测。回答者的测试环境是 Ubuntu 25.10 / Codex `0.124.0`，不是作者环境。
- **回答中的 workaround 及风险：** accepted answer 建议 `approval_policy = "never"` 与 `sandbox_mode = "workspace-write"`。风险是 `never` 可能阻止需要批准的动作而不是“安全地自动批准一切”；回答者还引用了另一版本的 Landlock workaround，但明确无法担保安全影响。配置语义必须按当前版本官方文档核对。
- **Field Guide 最小排查：** 把“是否询问”与“沙箱是否允许”分开检查；确认配置实际生效位置、当前 session 是否继承旧状态、目标路径是否在 workspace 和 writable roots 内；用一个可恢复的小文件变更验证。
- **不能宣称：** 不能说 `never` 等于 full access；不能说 workspace-write 会允许所有文件改动；不能把 Linux 测试结果迁移成 Windows/VS Code 结论。

### 5. Windows Terminal 中 Codex 界面出现乱码符号

- **原始 URL：** [Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API question 可访问；无回答。
- **作者环境：** Windows CMD inside Windows Terminal；尝试过 `chcp 65001`。
- **具体症状：** Codex UI 出现额外/乱码符号；调整窗口大小后符号消失，作者据此怀疑完整重绘触发了暂时修复。
- **证据等级：** 用户报告；推测（终端重绘/渲染问题）；没有回答、官方确认或本地复现。
- **回答中的 workaround 及风险：** 仅有作者自己的观察：resize window 可清除乱码。风险很低但不稳定，不能当成根因修复；盲目改编码可能影响其他程序的输入输出。
- **Field Guide 最小排查：** 记录终端类型、shell、字体、窗口大小、编码页、Codex 版本；对比新窗口、重绘、不同终端和纯文本输出，区分编码问题与 TUI 重绘问题。
- **不能宣称：** 不能说 `chcp 65001` 必然修复；不能把截图中的乱码直接归因于 UTF-8；不能把 resize 当成永久 workaround。

### 6. 试图用 sandbox 阻止 Codex 读取私密目录

- **原始 URL：** [Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API question/answer 可访问。
- **作者环境：** Codex CLI；Linux 路径示例 `~/private`；目标是用内核级 sandbox 阻止读取并降低数据外传风险。
- **具体症状：** 用户不知道如何把“不可读”作为 sandbox 强制边界，而不是依赖模型遵守提示。
- **证据等级：** 用户报告；回答者建议；推测。回答者声称在 Ubuntu 25.10 / Codex `0.139.0` 用自定义权限配置观察到拒绝，但没有本研究的独立复现。
- **回答中的 workaround 及风险：** 回答给出自定义 profile 和路径 deny 规则，并推测由 bwrap/内核机制强制。风险是版本、平台和配置语法变化；若从私密目录本身启动 Codex，可能改变 cwd 与访问边界；不能把“模型说读不了”当成内核级证据。
- **Field Guide 最小排查：** 先把私密数据移出项目/工作区或使用操作系统权限隔离；核对有效 profile、绝对路径、cwd、writable roots 和 sandbox helper；用无敏感测试文件验证“读失败”，同时检查日志/退出状态。
- **不能宣称：** 不能保证任意平台都支持同样的 deny 规则；不能保证 sandbox 能抵御所有外传路径；不能把配置片段直接复制到生产环境。

### 7. Codex 工作区中的 Maven 依赖下载失败

- **原始 URL：** [Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **访问日期 / 可访问来源：** 2026-08-10；Stack Exchange API question/answer 可访问。
- **作者环境：** Java/Spring Boot；使用 `./mvnw clean test`；需要访问 Maven Central；尝试了 setup script 和代理。
- **具体症状：** `Non-resolvable import POM`，并明确出现 `Network is unreachable`；随后依赖版本缺失是连锁错误。
- **证据等级：** 用户报告；回答者建议。回答者说自己的 Maven 代理配置工作，但不是官方确认，也没有本地复现。
- **回答中的 workaround 及风险：** 回答建议用 Codex proxy 配置并预下载依赖。原问题还展示了公共 IP 代理配置。风险很高：公共代理可能窃听/篡改流量，setup script 可能执行外部安装步骤；不要照抄帖子命令或把代理凭据写入仓库。
- **Field Guide 最小排查：** 先确认是网络不可达而非 POM/版本错误；记录 Maven 实际使用的 settings、代理环境、目标域名和缓存命中情况；优先使用组织批准的代理或预置依赖缓存，并以无秘密请求验证。
- **不能宣称：** 不能把依赖解析失败归咎于 Maven 配置本身；不能推荐未知公共代理；不能说“能访问 OpenAI”就代表 Maven Central、GitHub 或任意域名可访问。

### 8. Windows Computer Use 无法枚举窗口

- **原始 URL：** [openai/codex issue #37306](https://github.com/openai/codex/issues/37306)
- **访问日期 / 可访问来源：** 2026-08-10；GitHub issue 页面成功返回 HTTP 200；GitHub REST 搜索结果可访问。后续 REST 详情请求受匿名 API rate limit 限制。
- **作者环境：** Codex App `26.730.61639`；Pro；Windows `10.0.26200.0 x64`；Windows Computer Use。
- **具体症状：** `EnumWindows failed: The system cannot find the path specified. (0x80070003)`；`sky.list_windows()` 和 `sky.list_apps()` 都失败。作者报告已检查 helper 存在、进程启动、读/执行权限、插件重装、Repair、Reset、卸载重装和重启。
- **证据等级：** 用户报告；GitHub issue 的公开 bug 标记；没有可访问的维护者确认；无本地复现。
- **回答中的 workaround 及风险：** issue 未提供可靠 workaround。可教的是不要因重装成功就宣称 Computer Use 已修复；继续收集 app/build、Windows build、helper 路径、活动会话状态和反馈 ID。不要擅自替换 helper 或放宽系统权限。
- **Field Guide 最小排查：** 先验证普通应用是否能被枚举，再区分“窗口枚举 API 错误”“helper 路径/安装错误”“权限/活动桌面错误”；保留完整错误码和已尝试动作，避免重复无效重装。
- **不能宣称：** 不能说 Windows Computer Use 已普遍可用或普遍不可用；不能把该 issue 外推到 Codex CLI 的文件 sandbox；不能把“helper 进程能启动”当成窗口控制链路已验证。

### 9. Windows Desktop 工作时短暂闪出命令提示符窗口

- **原始 URL：** [openai/codex issue #37153](https://github.com/openai/codex/issues/37153)
- **访问日期 / 可访问来源：** 2026-08-10；GitHub REST 搜索结果可访问，issue 页面可定位；本轮未取得完整评论核验。
- **作者环境：** Windows；Codex Desktop；观察到的 runner `0.146.0-alpha.3.1`。
- **具体症状：** Codex 工作时短暂出现前台 command-prompt/console 窗口；进程检查看到 `conhost.exe` 子进程。用户认为这看起来像未授权活动。
- **证据等级：** 用户报告；GitHub issue bug 标记；推测（命令执行窗口没有保持隐藏）；无本地复现、无维护者确认。
- **回答中的 workaround 及风险：** 没有可靠 workaround。可教的是先记录进程树、时间点和 Codex 版本，再判断是渲染/启动器行为还是异常子进程；不要因为窗口闪现就断言存在恶意进程，也不要删除系统文件或禁用安全软件。
- **Field Guide 最小排查：** 用任务管理器/事件记录确认父子进程、路径、签名和发生时机；对比空闲与执行任务时的差异；必要时提交最小反馈包，避免上传源码和秘密。
- **不能宣称：** 不能把一次闪窗直接定性为数据外传或恶意软件；不能说隐藏窗口问题等于权限边界失效；不能把 alpha 版本行为外推到所有 Desktop 版本。

### 10. 自定义 writable root 与 cwd 的权限提示可能矛盾

- **原始 URL：** [openai/codex issue #37655](https://github.com/openai/codex/issues/37655)
- **访问日期 / 可访问来源：** 2026-08-10；GitHub REST 搜索结果可访问；issue 页面可定位；后续匿名 API 详情请求受 rate limit 限制。
- **作者环境：** Codex CLI `0.146.1`；Homebrew；macOS 25.6 arm64；tmux；Pro Lite；作者声称按源码和配置确定性复现。
- **具体症状：** profile 只允许 `/Users/me/shared` 写入，而 cwd 是 `/Users/me/project`；生成给模型的说明却声称 cwd 可编辑，实际对 cwd 的 `apply_patch` 仍要求批准。
- **证据等级：** 用户报告；作者提供源码/测试位置；推测（prompt 分类与实际 enforcement 不一致）；没有本地复核或维护者确认。
- **回答中的 workaround 及风险：** issue 建议修正文案/分类，保留实际 enforcement。临时 workaround 是明确把真正需要写入的目录列为 writable root，并检查实际审批；风险是为了让提示“看起来正确”而扩大 writable roots，可能超过任务需要。
- **Field Guide 最小排查：** 以实际拒绝/批准结果为准，分别记录 cwd、writable roots、effective profile、生成提示和目标路径；用最小路径矩阵测试 cwd 内、允许 root 内、root 外三个目标。
- **不能宣称：** 不能把模型收到的权限说明当成 OS enforcement 证明；不能仅凭 `workspace-write` 标签断言 cwd 一定可写；不能在未核对版本源码/测试的情况下宣称已修复。

## 跨案例的最小排查卡片

1. **先分层：** 模型提示、审批策略、sandbox enforcement、操作系统权限、网络代理和目标工具各自是不同边界。
2. **先收集证据：** 版本、平台、安装来源、shell/终端、cwd、有效配置路径、精确错误文本、父子进程和失败 URL。
3. **先做低风险验证：** 无秘密、可恢复、单文件或单域名测试；不要直接运行帖子中的安装脚本、代理配置、权限放宽命令。
4. **先确认实际生效配置：** 用户编辑的配置文件不等于当前 session/extension/app 使用的配置；重启或切换工作区可能改变状态。
5. **交付时分级：** “命令能启动”“项目能读”“文件能写”“网络能访问”“VS Code 能集成”“Computer Use 能控制”分别验收，不能用一个结果替代全部结果。

## 来源、许可与使用边界

- Stack Overflow 内容由页面标注的 CC BY-SA 4.0 提供；本文件只做事实摘要和链接引用，不复制大段原文或帖子中的命令作为可执行教程。
- GitHub issue 内容作为公开用户报告引用；不把 issue 作者、标签或搜索结果当成 OpenAI 官方确认。
- 本文件新增研究记录，不引入外部图片、代码或 skill 指令；未修改 `docs/sources/asset-register.md`，因为本轮没有复制外部资产。

## 阻塞与未核对项

- OpenAI 官方 Codex 文档 URL（如 `https://developers.openai.com/codex/permissions`、`/sandbox`、`/windows`、`/cli`）本轮请求均返回 `308 Permanent Redirect`，未能在当前只读请求中可靠取得最终正文。因此没有把官方文档语义写成已确认事实，需后续用能跟随重定向的官方访问方式复核。
- GitHub REST API 在继续读取 issue 详情/评论时触发匿名 rate limit；已核对的 GitHub 证据限于成功访问的页面/搜索结果和已取得的 issue 摘要，未宣称维护者确认。
- Reddit、GitHub Discussions 和官方社区没有纳入本轮最终记录，因为在用户要求收尾前未取得同等可靠、可引用的具体错误证据。
- 本轮没有在本机重现任何论坛问题；所有“本地复现”均为未完成，不能写成已验证修复。
- 论坛内容、版本号、配置语法和产品支持矩阵会变化；发布到正式教材前应重新访问原始 URL，并补官方来源、访问日期和当前版本范围。
